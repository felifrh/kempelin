/* 스크립트가 실행 중에 넣는 모든 문구 (한국어). 구조는 strings.en.js와 같습니다. */

var HINT={open:'번호를 선택해 복사하세요',tap:'탭하면 번호가 보입니다',hover:'마우스를 올리거나 탭하면 번호가 보입니다'};

var SVC_AMAZON={items:[{n:'제품 원가',v:6.50,c:'#EDE9AF'},{n:'Amazon 판매 수수료',v:4.31,c:'#ABB9BA'},{n:'FBA·배송비',v:6.20,c:'#FFFFFF'},{n:'광고비',v:5.17,c:'#8E9A7A'},{n:'반품',v:1.20,c:'#5F6A55'},{n:'남는 금액',v:6.53,c:'#DAE666'}]};
var SVC_FUNDING={complete:'완료',missing:'누락'};

var AMAZON_SIM={cost:'제품 원가',referral:'Amazon 판매 수수료',shipping:'FBA·Amazon 입고 배송비',ads:'광고비',returns:'반품',keep:'남는 금액',lose:'손실',
  price:'판매가 {price}',
  keepOn:'{price}짜리 상품 한 개를 팔 때마다 남는 금액: {profit}',loseOn:'{price}짜리 상품 한 개를 팔 때마다 생기는 손실: {profit}',
  detailKept:'마진율 {margin}%. 월 {units}개를 판매하면 한 달 이익은 {amount}입니다.',detailLost:'마진율 {margin}%. 월 {units}개를 판매하면 한 달 손실은 {amount}입니다.',
  breakeven:'이 비용 기준 손익분기 판매가: {price}',nobreak:'수수료와 광고비가 매출보다 큽니다. 어떤 판매가에서도 손익분기에 도달하지 못합니다.'};
var UI={pause:'일시정지',play:'재생',locale:'ko-KR'};

var FUNDING={
labels:{best:'가장 적합',runBy:'운영 기관',covers:'지원 내용',who:'지원 대상',path:'신청까지의 과정',subLang:'en'},
programmes:{
    kso:{n:'글로벌 소상공인 (K-소상공인) 육성사업',k:'Global Small Business Programme',by:'소상공인시장진흥공단 (SEMAS)',cov:'해외 이커머스 플랫폼 입점과 온·오프라인 해외 박람회 참가를 지원합니다.',who:'수출 잠재력이 있는 소상공인.',sizes:['small']},
    vou:{n:'수출바우처',k:'Export Voucher',by:'중소벤처기업부 (중소벤처기업진흥공단 운영). 산업통상자원부 소관의 별도 바우처는 KOTRA가 운영합니다.',cov:'플랫폼 입점, 콘텐츠, 마케팅, 인증 등 메뉴판에서 필요한 서비스를 골라 바우처로 결제합니다. 사업과 회차에 따라 최대 약 1억 원까지 지원됩니다.',who:'중소기업과 중견기업. 대기업 계열사는 보통 제외됩니다.',sizes:['small','sme','mid']},
    log:{n:'해외공동물류센터',k:'Overseas Joint Logistics Centres',by:'KOTRA',cov:'KOTRA가 해외에서 운영하는 협력 센터를 통해 풀필먼트를 이용합니다. 국제 운송비와 관세는 지원 대상이 아닙니다.',who:'중소기업과 중견기업.',sizes:['small','sme','mid']},
    bra:{n:'해외지사화사업',k:'Overseas Branch Office Programme',by:'KOTRA, 중소벤처기업진흥공단 또는 한인무역협회(OKTA)',cov:'현지 팀이 해외 지사 역할을 맡아 바이어 발굴, 시장 정보, 후속 관리를 도와줍니다.',who:'현지 지사가 없는 중소기업과 중견기업.',sizes:['small','sme','mid']}
},
rule:{amz:['kso','vou'],ful:['log','vou'],rep:['bra','vou']},
steps:[['최신 공고 확인',''],['신청 자격 확인',''],['서류 준비','Kempelin과 함께'],['온라인 신청','Kempelin과 함께'],['선정 및 협약',''],['지원금 사용과 정산','Kempelin과 함께']]
};

export var STR={HINT:HINT,SVC_AMAZON:SVC_AMAZON,SVC_FUNDING:SVC_FUNDING,AMAZON_SIM:AMAZON_SIM,UI:UI,FUNDING:FUNDING};
