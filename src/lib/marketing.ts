export function track(event:string, details:Record<string,string|number>={}) {
 if(typeof window === 'undefined' || !document.cookie.includes('mb_consent=accepted')) return;
 const w=window as Window & {dataLayer?: unknown[]};
 w.dataLayer=w.dataLayer ?? []; w.dataLayer.push({event,...details});
}
export function getAttribution(){
 const p=new URLSearchParams(window.location.search);
 return Object.fromEntries(['utm_source','utm_medium','utm_campaign','utm_content','utm_term','gclid','fbclid','page_variant'].map(k=>[k,(p.get(k)??'').slice(0,200)]));
}
