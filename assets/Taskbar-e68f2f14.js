import{_ as b,u as m,h as i,i as T,o as u,c as p,j as c,e as l,k as v,v as f}from"./index-bfccbb96.js";const y={class:"title"},C={class:"note"},B={__name:"Taskbar",props:["label"],setup(_){const r=_,k=m(),o=i(!0),s=i(""),t=i(""),x=()=>{const a={id:Math.random()*1e11,title:s.value,content:t.value,isPinned:!1,isArchived:!1,movedToBin:!1,labels:r.label?[r.label]:[],background:"transparent"};k.addNote(a),t.value="",s.value=""},n=(a=null)=>{if(a==="collapse")o.value=!1;else{if(a==="expand")return;o.value=!0}t.value&&x()};return T(()=>document.addEventListener("click",n)),(a,e)=>o.value?(u(),p("div",{key:0,class:"collapsed-textbar",onClick:e[0]||(e[0]=c(()=>n("collapse"),["stop"]))}," Take a note... ")):(u(),p("div",{key:1,class:"expanded-textbar",onClick:e[3]||(e[3]=c(()=>n("expand"),["stop"]))},[l("div",y,[v(l("input",{type:"text",placeholder:"Title","onUpdate:modelValue":e[1]||(e[1]=d=>s.value=d)},null,512),[[f,s.value]])]),l("div",C,[v(l("textarea",{placeholder:"Take a note...","onUpdate:modelValue":e[2]||(e[2]=d=>t.value=d)},null,512),[[f,t.value]])])]))}},N=b(B,[["__scopeId","data-v-14fcfd96"]]);export{N as T};
