import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { parse } from "https://deno.land/std@0.224.0/csv/parse.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

interface CsvRow {
  [key: string]: string | undefined;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const csv: string | undefined = body?.csv;

    if (!csv || typeof csv !== "string") {
      return new Response(JSON.stringify({ error: "Missing csv string in body" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Normalize multiline fields by grouping lines until quotes are balanced
    const lines = csv.split(/\r?\n/);
    const fixedLines: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      if (!line) continue;

      // Start building a logical row
      let current = line;
      let quoteCount = (current.match(/"/g) ?? []).length;

      // If quotes are unbalanced, keep appending following lines
      while (quoteCount % 2 !== 0 && i + 1 < lines.length) {
        i++;
        current += "\n" + lines[i];
        quoteCount = (current.match(/"/g) ?? []).length;
      }

      fixedLines.push(current);
    }

    const normalizedCsv = fixedLines.join("\n");

    const rows = (await parse(normalizedCsv, {
      skipFirstRow: false,
    })) as string[][];

    if (!rows.length) {
      return new Response(JSON.stringify({ inserted: 0, skipped: 0 }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const header = rows[0];
    const dataRows = rows.slice(1);

    const indexOf = (name: string) => header.indexOf(name);

    const idxName = indexOf("Company Name for Emails");
    const idxEmployees = indexOf("# Employees");
    const idxIndustry = indexOf("Industry");
    const idxWebsite = indexOf("Website");
    const idxLinkedin = indexOf("Company Linkedin Url");
    const idxFacebook = indexOf("Facebook Url");
    const idxTwitter = indexOf("Twitter Url");
    const idxStreet = indexOf("Company Street");
    const idxCity = indexOf("Company City");
    const idxState = indexOf("Company State");
    const idxCountry = indexOf("Company Country");
    const idxPostal = indexOf("Company Postal Code");
    const idxAddress = indexOf("Company Address");
    const idxKeywords = indexOf("Keywords");
    const idxPhone = indexOf("Company Phone");
    const idxTech = indexOf("Technologies");
    const idxSic = indexOf("SIC Codes");
    const idxNaics = indexOf("NAICS Codes");
    const idxDescription = indexOf("Short Description");
    const idxFounded = indexOf("Founded Year");
    const idxLogo = indexOf("Logo Url");

    const { data: existing, error: existingError } = await supabase
      .from("companies")
      .select("company_name, website");

    if (existingError) {
      console.error("Error fetching existing companies", existingError);
      return new Response(JSON.stringify({ error: "Failed to load existing companies" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const existingNames = new Set(
      (existing ?? [])
        .map((c: any) => (c.company_name as string | null)?.toLowerCase())
        .filter(Boolean) as string[]
    );

    const existingWebsites = new Set(
      (existing ?? [])
        .map((c: any) => (c.website as string | null)?.toLowerCase())
        .filter(Boolean) as string[]
    );

    const rowsToInsert: any[] = [];
    let skipped = 0;

    for (const row of dataRows) {
      const get = (idx: number) => (idx >= 0 && idx < row.length ? row[idx] ?? "" : "");

      const companyName = get(idxName).trim();
      const websiteRaw = get(idxWebsite);
      const website = websiteRaw ? websiteRaw.replace(/\\\./g, ".").trim() : "";

      if (!companyName) {
        skipped++;
        continue;
      }

      const lowerName = companyName.toLowerCase();
      const lowerWebsite = website ? website.toLowerCase() : undefined;

      if (existingNames.has(lowerName) || (lowerWebsite && existingWebsites.has(lowerWebsite))) {
        skipped++;
        continue;
      }

      existingNames.add(lowerName);
      if (lowerWebsite) existingWebsites.add(lowerWebsite);

      rowsToInsert.push({
        company_name: companyName,
        num_employees: get(idxEmployees) || null,
        industry: get(idxIndustry) || null,
        website: website || null,
        linkedin_url: get(idxLinkedin) || null,
        facebook_url: get(idxFacebook) || null,
        twitter_url: get(idxTwitter) || null,
        street: get(idxStreet) || null,
        city: get(idxCity) || null,
        state: get(idxState) || null,
        country: get(idxCountry) || null,
        postal_code: get(idxPostal) || null,
        full_address: get(idxAddress) || null,
        keywords: get(idxKeywords) || null,
        phone: get(idxPhone) || null,
        technologies: get(idxTech) || null,
        sic_codes: get(idxSic) || null,
        naics_codes: get(idxNaics) || null,
        short_description: get(idxDescription) || null,
        founded_year: get(idxFounded) || null,
        logo_url: (get(idxLogo) || "").replace(/\\\./g, ".") || null,
        status: "approved",
      });
    }

    let inserted = 0;

    if (rowsToInsert.length) {
      const { error: insertError, count } = await supabase
        .from("companies")
        .insert(rowsToInsert, { count: "exact" });

      if (insertError) {
        console.error("Error inserting companies", insertError);
        return new Response(JSON.stringify({ error: "Failed to insert companies" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      inserted = count ?? rowsToInsert.length;
    }

    return new Response(JSON.stringify({ inserted, skipped }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Unhandled error in import-companies", error);
    return new Response(JSON.stringify({ error: "Unexpected error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
