/* All visible copy that scripts insert at runtime. One file per language (Korean: strings.ko.js).
   Static page copy stays in index.html as real HTML text (search engines, no-JS visitors). */

export var HINT={open:'Select the number to copy it',tap:'Tap to show the number',hover:'Hover or tap to show the number'};

export var SVC_AMAZON={items:[{n:'Product cost',v:6.50,c:'#EDE9AF'},{n:'Amazon referral fee',v:4.31,c:'#ABB9BA'},{n:'FBA and shipping',v:6.20,c:'#FFFFFF'},{n:'Advertising',v:5.17,c:'#8E9A7A'},{n:'Returns',v:1.20,c:'#5F6A55'},{n:'You keep',v:6.53,c:'#DAE666'}]};
export var SVC_FUNDING={complete:'Complete',missing:'Missing'};

export var AMAZON_SIM={cost:'Product cost',referral:'Amazon referral fee',shipping:'FBA and shipping to Amazon',ads:'Advertising',returns:'Returns',keep:'You keep',lose:'You lose'};

export var FUNDING={
programmes:{
    kso:{n:'Global Small Business Programme',k:'글로벌 소상공인 (K-소상공인) 육성사업',by:'Small Enterprise and Market Service (SEMAS)',cov:'Support to list products on international e-commerce platforms and to join trade fairs, online and offline.',who:'Small businesses with export potential.',sizes:['small']},
    vou:{n:'Export Voucher',k:'수출바우처',by:'Ministry of SMEs and Startups (via KOSME). A second voucher runs under the Ministry of Trade, Industry and Energy (via KOTRA).',cov:'You choose services from a menu, for example platform listing, content, marketing and certification. Costs are settled through the voucher, up to about KRW 100 million depending on programme and round.',who:'SMEs and mid-sized companies. Affiliates of large conglomerates are usually excluded.',sizes:['small','sme','mid']},
    log:{n:'Overseas Joint Logistics Centres',k:'해외공동물류센터',by:'KOTRA',cov:'Fulfilment through KOTRA’s partner centres abroad. International freight and duties are not covered.',who:'SMEs and mid-sized companies.',sizes:['small','sme','mid']},
    bra:{n:'Overseas Branch Office Programme',k:'해외지사화사업',by:'KOTRA, KOSME or OKTA',cov:'A local team acts as your branch office abroad: buyers, market information, follow-up.',who:'SMEs and mid-sized companies without a local branch.',sizes:['small','sme','mid']}
},
rule:{amz:['kso','vou'],ful:['log','vou'],rep:['bra','vou']},
steps:[['Find the current notice',''],['Check who can apply',''],['Prepare the documents','with Kempelin'],['Apply online','with Kempelin'],['Selection and agreement',''],['Use the funding and settle','with Kempelin']]
};
