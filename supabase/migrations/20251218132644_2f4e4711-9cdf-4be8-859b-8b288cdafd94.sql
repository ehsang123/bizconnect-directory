-- Add service_type column to classify companies by service category (MSP, MSSP, VAR, CSP, ISV, AWS, Systems Integrators)
ALTER TABLE public.companies
ADD COLUMN IF NOT EXISTS service_type text;