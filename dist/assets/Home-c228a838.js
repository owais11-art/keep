import{T as l}from"./Taskbar-e68f2f14.js";import{N as a}from"./Note-c52a4662.js";import{_ as u,u as m,o as e,c as o,a as p,b as n,d as r,e as _,F as c,r as d,f as i}from"./index-bfccbb96.js";const h={class:"home"},N={key:0},f={class:"pinned-notes"},k={key:1},v={class:"notes"},y={__name:"Home",setup(g){const t=m();return(x,B)=>(e(),o("div",h,[p(l),n(t).pinnedNotes.length?(e(),o("h5",N,"Pinned")):r("",!0),_("div",f,[(e(!0),o(c,null,d(n(t).pinnedNotes,s=>(e(),i(a,{key:s.id,note:s},null,8,["note"]))),128))]),n(t).pinnedNotes.length&&n(t).notes.length?(e(),o("h5",k,"Others")):r("",!0),_("div",v,[(e(!0),o(c,null,d(n(t).notes,s=>(e(),i(a,{key:s.id,note:s},null,8,["note"]))),128))])]))}},F=u(y,[["__scopeId","data-v-c787d17a"]]);export{F as default};