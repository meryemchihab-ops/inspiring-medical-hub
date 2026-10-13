export type Language = 'fr' | 'en';
export interface Copy {
 language: Language; meta: {title:string;description:string}; nav:string[]; quote:string; whatsapp:string; noCommitment:string; skip:string;
 hero:{label:string;lines:string[];accent:string;description:string;cta:string;response:string;scroll:string;location:string};
 trust:{title:string;detail:string}[];
 treatments:{label:string;title:string;accent:string;intro:string;popular:string;items:{name:string;tagline:string;description:string}[];cta:string;caption:string;note:string};
 prices:{label:string;title:string;accent:string;intro:string;upTo:string;saving:string;cta:string;europe:string;morocco:string;footnote:string;source:string;rows:{name:string;eu:string;ma:string;ratio:number}[]};
 smile:{label:string;title:string;accent:string;description:string;tabs:string[];details:string[];cta:string;disclaimer:string};
 steps:{label:string;title:string;accent:string;intro:string;cta:string;items:{title:string;description:string;deliverable:string}[]};
 stay:{label:string;title:string;accent:string;intro:string;cta:string;caption:string;note:string;included:string[]};
 packs:{label:string;title:string;accent:string;intro:string;price:string;badge:string;cta:string;features:string[];items:{name:string;description:string}[];compare:string;condition:string};
 assurance:{quote:string;byline:string;cta:string};
 faq:{label:string;title:string;accent:string;intro:string;cta:string;items:{q:string;a:string}[]};
 booking:{label:string;title:string;accent:string;intro:string;coordinator:string;next:string[];formTitle:string;formIntro:string;name:string;phone:string;treatment:string;select:string;treatmentError:string;month:string;consent:string;submit:string;submitting:string;secure:string;success:string;successDetail:string;error:string};
 footer:{slogan:string;contact:string;address:string;explore:string;legal:string[];copyright:string;updated:string;illustrations:string};
 consent:{text:string;accept:string;reject:string}; offer:{title:string;text:string;cta:string;close:string};
 legal:{title:string;sections:{title:string;text:string}[]};
}
