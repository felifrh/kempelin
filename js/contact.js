import {$} from './util.js';
import {PHONE,MAIL} from '../content/contact.js';

/* Phone number for the reveal button and tel: link; email as mailto: link in footer and privacy notice. */
export var TEL='tel:'+PHONE.join('');
var num=$('#phoneNum'); if(num) num.textContent=PHONE.join(' ');
['#mail','#mailPriv'].forEach(function(sel){
  var el=$(sel); if(!el) return;
  var addr=MAIL[0]+'@'+MAIL[1], a=document.createElement('a');
  a.href='mailto:'+addr; a.textContent=addr; el.appendChild(a);
});
