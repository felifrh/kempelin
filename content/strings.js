/* Picks the strings for the page language (<html lang>). */
import {STR as EN} from './strings.en.js';
import {STR as KO} from './strings.ko.js';

export var LANG=document.documentElement.lang==='ko'?'ko':'en';
var S=LANG==='ko'?KO:EN;
export var HINT=S.HINT, SVC_AMAZON=S.SVC_AMAZON, SVC_FUNDING=S.SVC_FUNDING, AMAZON_SIM=S.AMAZON_SIM, UI=S.UI, FUNDING=S.FUNDING;
export function fill(t,v){ return t.replace(/\{(\w+)\}/g,function(m,k){ return v[k] }); }
