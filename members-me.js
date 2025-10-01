// netlify/functions/members-me.js
import { createClient } from '@supabase/supabase-js';
export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode:405, body:'Method Not Allowed' };
  const { token, member_id } = JSON.parse(event.body||'{}');
  if (!token || !member_id) return { statusCode:400, body:'Missing' };
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE);

  const { data: m, error } = await supabase.from('udl_members')
    .select('member_id, status, phone_mobile, city, state, metro_key, metro_name')
    .eq('member_id', member_id).single();
  if (error || !m) return { statusCode:404, body:'No member' };

  const { data: trow } = await supabase.from('udl_members').select('token_hash').eq('member_id', member_id).single();
  if (!trow || hash(token)!==trow.token_hash) return { statusCode:403, body:'Bad token' };
  if (m.status!=='active') return { statusCode:402, body:'Inactive' };

  const { data: metro } = await supabase.from('udl_metros').select('metro_number, display_number').eq('metro_key', m.metro_key).single();
  return {
    statusCode:200, headers:{'Content-Type':'application/json'},
    body: JSON.stringify({
      member_id: m.member_id,
      city: m.city, state: m.state, metro_key: m.metro_key, metro_name: m.metro_name,
      metro_number: metro.metro_number, display_number: metro.display_number,
      phone_mobile_masked: mask(m.phone_mobile)
    })
  };
};
function mask(s){ return s? s.replace(/(\+?\d{0,2})\d{3}(\d{2})\d{2}$/, '$1***$2**') : ''; }
function hash(s){ const enc=new TextEncoder().encode(s); let h=0; for(const b of enc){ h=(h*31 + b)>>>0 } return h.toString(16); }
