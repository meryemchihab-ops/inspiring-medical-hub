import { createServerFn } from '@tanstack/react-start';
import { getRequest } from '@tanstack/react-start/server';
import { z } from 'zod';
const requestSchema=z.object({first_name:z.string().trim().min(2).max(80),phone:z.string().regex(/^\+[0-9\s()-]{7,22}$/),treatment:z.string().min(2).max(400),preferred_month:z.string().max(20),language:z.enum(['fr','en']),consent:z.literal(true),attribution:z.record(z.string().max(200)),website:z.string().max(200).default(''),file:z.object({name:z.string().max(150),type:z.enum(['image/jpeg','image/png','application/pdf']),base64:z.string().max(7000000)}).optional()});
export const submitConsultation=createServerFn({method:'POST'}).inputValidator((data:unknown)=>requestSchema.parse(data)).handler(async({data})=>{
 if(data.website) throw new Error('Invalid request');
 const {supabaseAdmin}=await import('@/integrations/supabase/client.server');
 const request=getRequest();
 const ip=request.headers.get('cf-connecting-ip') ?? request.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
 const bytes=new TextEncoder().encode(ip);
 const hash=await crypto.subtle.digest('SHA-256',bytes);
 const key=Array.from(new Uint8Array(hash)).map(b=>b.toString(16).padStart(2,'0')).join('');
 const {data:allowed,error:limitError}=await supabaseAdmin.rpc('check_consultation_rate',{p_key:key});
 if(limitError || !allowed) throw new Error('Please try again later');
 const {count}=await supabaseAdmin.from('consultation_requests').select('id',{count:'exact',head:true}).eq('phone',data.phone).gte('created_at',new Date(Date.now()-3600000).toISOString());
 if((count??0)>=3) throw new Error('Please try again later');
 let attachment_path:string|null=null;
 if(data.file){
 const raw=Uint8Array.from(atob(data.file.base64),c=>c.charCodeAt(0));
 const jpeg=raw[0]===255&&raw[1]===216&&raw[2]===255;
 const png=raw[0]===137&&raw[1]===80&&raw[2]===78&&raw[3]===71;
 const pdf=String.fromCharCode(...raw.slice(0,5))==='%PDF-';
 if(raw.length>5*1024*1024 || !(data.file.type==='image/jpeg'&&jpeg || data.file.type==='image/png'&&png || data.file.type==='application/pdf'&&pdf)) throw new Error('Invalid file');
 const ext=data.file.type==='application/pdf'?'pdf':data.file.type==='image/png'?'png':'jpg';
 attachment_path=`${crypto.randomUUID()}.${ext}`;
 const {error}=await supabaseAdmin.storage.from('consultation-files').upload(attachment_path,raw,{contentType:data.file.type});
 if(error) throw new Error('Upload failed');
 }
 const {data:row,error}=await supabaseAdmin.from('consultation_requests').insert({first_name:data.first_name,phone:data.phone,treatment:data.treatment,preferred_month:data.preferred_month,language:data.language,consent:true,attribution:data.attribution,attachment_path}).select('id').single();
 if(error || !row){if(attachment_path) await supabaseAdmin.storage.from('consultation-files').remove([attachment_path]);throw new Error('Request could not be saved');}
 try{const {notifyNewConsultation}=await import('@/lib/mailer.server');await notifyNewConsultation({id:row.id,first_name:data.first_name,phone:data.phone,treatment:data.treatment,preferred_month:data.preferred_month,language:data.language});}catch(e){console.error('Consultation email failed',e instanceof Error?e.message:e);}
 return {id:row.id};
});
