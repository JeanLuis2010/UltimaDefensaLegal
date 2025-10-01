// netlify/functions/paypal-webhook.js
import { createClient } from '@supabase/supabase-js';
export const handler = async (event) => {
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE);

  // You can wire real PayPal webhook validation here.
  // For launch, we accept either actual webhook JSON or manual=1 call from front-end with token.
  const body = JSON.parse(event.body||'{}');
  const manual = (event.queryStringParameters||{}).manual === '1';

  if (manual) {
    const { token, member_id, paypal_sub_id } = body;
    if (!token || !member_id) return { statusCode:400, body:'Missing' };
    const { data: row, error } = await supabase.from('udl_members').select('id, token_hash').eq('member_id', member_id).single();
    if (error || !row) return { statusCode:400, body:'No member' };
    if (hash(token)!==row.token_hash) return { statusCode:403, body:'Bad token' };
    await supabase.from('udl_members').update({ status:'active', paypal_sub_id }).eq('id', row.id);
    return { statusCode:200, body:'ok' };
  }

  // TODO: Real webhook parsing & validation
  return { statusCode:200, body:'noop' };
};
function hash(s){ const enc=new TextEncoder().encode(s); let h=0; for(const b of enc){ h=(h*31 + b)>>>0 } return h.toString(16); }
