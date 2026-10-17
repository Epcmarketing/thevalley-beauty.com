// Only platform labels and numeric advertising IDs belong in these fields.
// Never use customer phone numbers, names, messages or treatment names as IDs.
export function safeCampaign(search: string): Record<string, string> {
  const params = new URLSearchParams(search);
  const result: Record<string, string> = {};
  const sources = new Set(["facebook", "instagram", "meta", "fb", "ig", "msg", "an", "th", "google", "bing"]);
  const media = new Set(["paid_social", "cpc", "ppc", "organic", "social", "referral"]);
  const fields: Record<string, string> = {
    utm_source: "campaign_source", utm_medium: "campaign_medium",
    utm_id: "campaign_id", utm_campaign: "campaign_name",
    utm_content: "campaign_content", utm_term: "campaign_term",
  };
  for (const [key, field] of Object.entries(fields)) {
    const values = params.getAll(key);
    if (values.length !== 1) continue;
    const value = values[0];
    const valid = key === "utm_source" ? sources.has(value)
      : key === "utm_medium" ? media.has(value) : /^\d{1,25}$/.test(value);
    if (valid) result[field] = value;
  }
  return result;
}
