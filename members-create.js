// netlify/functions/members-create.js
import { createClient } from '@supabase/supabase-js';
export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  const { first_name, last_name, phone_mobile, email, zip, lang='en', need, ref } = JSON.parse(event.body||'{}')||{};
  if (!first_name||!last_name||!phone_mobile||!email||!zip) return { statusCode:400, body:'Missing fields' };

  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE);
  // Lookup metro by ZIP
  const { data: metroRow, error: metroErr } = await supabase.from('udl_zip_metro').select('*').eq('zip', zip).single();
  if (metroErr || !metroRow) return { statusCode:400, body:'ZIP not supported yet' };

  // Create member
  const ts = new Date();
  const yymm = String(ts.getFullYear()).slice(2)+String(ts.getMonth()+1).padStart(2,'0');
  const rand = Math.random().toString(36).slice(2,6).toUpperCase();
  const base = `UDL-${yymm}-${rand}`;
  const checksum = ((base.split('').reduce((a,c)=>a+c.charCodeAt(0),0))%11).toString(36).toUpperCase();
  const member_id = `${base}-${checksum}`;

  // lightweight token
  const token = cryptoRandom();

  const { data, error } = await supabase.from('udl_members').insert([{
    member_id, token_hash: hash(token), status:'pending_payment',
    first_name, last_name, phone_mobile, email, zip,
    city: metroRow.city, state: metroRow.state, metro_key: metroRow.metro_key, metro_name: metroRow.metro_name,
    lang, need, ref
  }]).select().single();

  if (error) return { statusCode:500, body:'DB error' };
  return { statusCode:200, headers:{'Content-Type':'application/json'}, body: JSON.stringify({ member_id, token }) };
};

function cryptoRandom(){ return [...crypto.getRandomValues(new Uint8Array(16))].map(b=>b.toString(16).padStart(2,'0')).join(''); }
function hash(s){ const enc=new TextEncoder().encode(s); let h=0; for(const b of enc){ h=(h*31 + b)>>>0 } return h.toString(16); }
