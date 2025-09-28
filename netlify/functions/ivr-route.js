// /netlify/functions/ivr-route.js
import fs from "fs";
import path from "path";

export const config = { path: "/api/ivr/route" };

const PANELS_PATH = path.join(process.cwd(), "assets", "data", "panels.json");

// Set this to your Aircall queue/number for human fallback
const AIRCALL_FALLBACK = process.env.AIRCALL_FALLBACK || "+1XXXYYYZZZZ";

export default async (req, res) => {
  try {
    const body = await readJson(req);
    const { toNumberE164, zip, practice } = body; // Studio will send these

    const panels = JSON.parse(fs.readFileSync(PANELS_PATH, "utf8"));
    const city = panels[toNumberE164];

    if (!city) {
      return json(res, 200, { targets: [AIRCALL_FALLBACK], reason: "no_city_mapping" });
    }

    // You can filter by practice area here if you keep per-practice targets.
    const ordered = city.targets
      .sort((a, b) => (a.priority || 1) - (b.priority || 1))
      .map(t => t.value);

    // Always return at least one target; last target can be Aircall fallback.
    const targets = ordered.length ? ordered : [AIRCALL_FALLBACK];

    return json(res, 200, { city: city.city, targets, timezone: city.timezone });
  } catch (e) {
    return json(res, 200, { targets: [AIRCALL_FALLBACK], reason: "error_fallback" });
  }
};

async function readJson(req) {
  const chunks = [];
  for await (const c of req) chunks.push(c);
  try { return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}"); }
  catch { return {}; }
}

function json(res, code, obj) {
  res.statusCode = code;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(obj));
}
