// netlify/functions/members-lookup.js
import { createClient } from '@supabase/supabase-js';
export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode:405, body:'Method Not Allowed' };
  const { from, metro_key, member_id, otp, step } = JSON.parse(event.body||'{}');
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE);

  // 1) ANI + metro quick allow
  if (from && metro_key) {
    const { data, error } = await supabase.from('udl_members')
      .select('member_id,status,phone_mobile,phone_secondary,metro_key')
      .eq('status','active').eq('metro_key', metro_key).or(`phone_mobile.eq.${from},phone_secondary.eq.${from}`);
    if (!error && data && data.length>0) return ok({ allow:true, member_id:data[0].member_id });
  }

  // 2) If user provided member_id, start/confirm OTP
  if (step==='start' && member_id) {
    const { data, error } = await supabase.from('udl_members').select('id,phone_mobile,status').eq('member_id', member_id).single();
    if (error || !data || data.status!=='active') return ok({ allow:false, reason:'not_active' });
    const code = (Math.floor(100000 + Math.random()*900000)).toString();
    await supabase.from('udl_otp').insert([{ member_id, code, expires_at: new Date(Date.now()+5*60*1000).toISOString() }]);
    // send SMS via Twilio Messaging (webhook/Studio SendMessage can do it); here we just return the code for Studio to send
    return ok({ allow:false, action:'send_code', code });
  }
  if (step==='verify' && member_id && otp) {
    const { data, error } = await supabase.from('udl_otp').select('*').eq('member_id', member_id).eq('code', otp).order('id',{ascending:false}).limit(1).single();
    if (error || !data || new Date(data.expires_at) < new Date()) return ok({ allow:false, reason:'bad_code' });
    // mark verified and (optionally) bind this ANI as secondary via Studio Function call
    return ok({ allow:true, member_id });
  }

  return ok({ allow:false, reason:'need_member_id' });
};
function ok(obj){ return { statusCode:200, headers:{'Content-Type':'application/json'}, body: JSON.stringify(obj) }; }
