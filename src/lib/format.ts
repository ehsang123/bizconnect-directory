/** Format an ISO UTC kickoff string into a readable label, e.g. "Mon, Sep 21 · 7:00 PM UTC". */
export function formatKickoff(iso: string): string {
  const d = new Date(iso);
  const date = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(d);
  const time = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  }).format(d);
  return `${date} · ${time} UTC`;
}

/** Shorter label for compact cards, e.g. "Sep 21 · 19:00". */
export function formatKickoffShort(iso: string): string {
  const d = new Date(iso);
  const date = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(d);
  const time = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(d);
  return `${date} · ${time} UTC`;
}
