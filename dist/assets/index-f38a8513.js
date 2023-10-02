import{d as h,o as l,c as p,a as r,t as b,u as s,p as W,b as X,_ as M,e as T,r as n,f as B,F as k,g as u,w as o,h as e,i as v,j as g,k as $,l as Y,T as Z,n as R,m as E,q as ee,v as te,s as D,x as oe,y as N,z as F}from"./index-511768d2.js";import{u as L}from"./setting-671950c7.js";const ne="/assets/logo-ba2a3dcc.png",le={title:"甄选管理平台",logo:"/public/logo.png"},ae=i=>(W("data-v-58816a81"),i=i(),X(),i),se={class:"logo"},ce=ae(()=>r("img",{src:ne,alt:""},null,-1)),_e={name:"Logo"},re=h({..._e,setup(i){return(a,c)=>(l(),p("div",se,[ce,r("p",null,b(s(le).title),1)]))}});const ie=M(re,[["__scopeId","data-v-58816a81"]]),de={name:"Menu"},ue=h({...de,props:["menuList"],setup(i){let a=T(),c=m=>{a.push(m.index)};return(m,x)=>{const _=n("el-icon"),d=n("el-menu-item"),f=n("Menu"),y=n("el-sub-menu");return l(!0),p(k,null,B(i.menuList,t=>(l(),p(k,{key:t.path},[t.children?g("",!0):(l(),p(k,{key:0},[t.meta.hidden?g("",!0):(l(),u(d,{key:0,index:t.path,onClick:s(c)},{title:o(()=>[r("span",null,b(t.meta.title),1)]),default:o(()=>[e(_,null,{default:o(()=>[(l(),u(v(t.meta.icon)))]),_:2},1024)]),_:2},1032,["index","onClick"]))],64)),t.meta.hidden?g("",!0):(l(),p(k,{key:1},[t.children&&t.children.length==1?(l(),u(d,{key:0,index:t.path,onClick:s(c)},{title:o(()=>[r("span",null,b(t.children[0].meta.title),1)]),default:o(()=>[e(_,null,{default:o(()=>[(l(),u(v(t.meta.icon)))]),_:2},1024)]),_:2},1032,["index","onClick"])):g("",!0)],64)),t.children&&t.children.length>1?(l(),u(y,{key:2,index:t.path},{title:o(()=>[e(_,null,{default:o(()=>[(l(),u(v(t.meta.icon)))]),_:2},1024),r("span",null,b(t.meta.title),1)]),default:o(()=>[e(f,{menuList:t.children},null,8,["menuList"])]),_:2},1032,["index"])):g("",!0)],64))),128)}}}),pe={name:"Main"},me=h({...pe,setup(i){let a=$(!0),c=L();return Y(()=>c.refresh,()=>{a.value=!1,R(()=>{a.value=!0})}),(m,x)=>{const _=n("router-view");return l(),u(_,null,{default:o(({Component:d})=>[e(Z,{name:"fade"},{default:o(()=>[s(a)?(l(),u(v(d),{key:0})):g("",!0)]),_:2},1024)]),_:1})}}});const fe={class:"tabber_left"},he={class:"tabber_left_Breadcrumb"},ge=h({__name:"index",setup(i){let a=L(),c=E(),m=()=>{a.fold=!a.fold};return(x,_)=>{const d=n("el-icon"),f=n("el-breadcrumb-item"),y=n("el-breadcrumb");return l(),p("div",fe,[e(d,{onClick:s(m)},{default:o(()=>[(l(),u(v(s(a).fold?"Expand":"Fold")))]),_:1},8,["onClick"]),r("div",he,[e(y,{"separator-icon":"ArrowRight"},{default:o(()=>[(l(!0),p(k,null,B(s(c).matched,t=>ee((l(),u(f,{to:t.path},{default:o(()=>[e(d,{style:{margin:"0 5px"}},{default:o(()=>[(l(),u(v(t.meta.icon)))]),_:2},1024),r("span",null,b(t.meta.title),1)]),_:2},1032,["to"])),[[te,!t.meta.isHidden]])),256))]),_:1})])])}}}),be={class:"tabber_right"},ve=["src"],xe={class:"el-dropdown-link"},ye=h({__name:"index",setup(i){let a=L(),c=D(),m=T(),x=E(),_=$(!1),d=()=>{a.refresh=!a.refresh},f=()=>{document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()},y=async()=>{await c.logout(),m.push({path:"/login",query:{redirect:x.path}})};const t=$("rgba(255, 69, 0, 0.68)"),q=$(["#ff4500","#ff8c00","#ffd700","#90ee90","#00ced1","#1e90ff","#c71585","rgba(255, 69, 0, 0.68)","rgb(255, 120, 0)","hsv(51, 100, 98)","hsva(120, 40, 94, 0.5)","hsl(181, 100%, 37%)","hsla(209, 100%, 56%, 0.73)","#c7158577"]),U=()=>{let w=document.documentElement;w.className=_.value?"dark":""},z=()=>{document.documentElement.style.setProperty("--el-color-primary",t.value)};return(w,C)=>{const V=n("el-button"),j=n("el-color-picker"),I=n("el-form-item"),A=n("el-switch"),H=n("el-form"),P=n("el-popover"),G=n("arrow-down"),J=n("el-icon"),K=n("el-dropdown-item"),O=n("el-dropdown-menu"),Q=n("el-dropdown");return l(),p("div",be,[e(V,{icon:"Refresh",circle:"",onClick:s(d)},null,8,["onClick"]),e(V,{icon:"FullScreen",circle:"",onClick:s(f)},null,8,["onClick"]),e(P,{placement:"bottom",title:"主题设置",width:"300px",trigger:"hover"},{reference:o(()=>[e(V,{icon:"Setting",circle:""})]),default:o(()=>[e(H,null,{default:o(()=>[e(I,{label:"主题颜色"},{default:o(()=>[e(j,{onChange:z,modelValue:t.value,"onUpdate:modelValue":C[0]||(C[0]=S=>t.value=S),"show-alpha":"",predefine:q.value},null,8,["modelValue","predefine"])]),_:1}),e(I,{label:"暗黑模式"},{default:o(()=>[e(A,{modelValue:s(_),"onUpdate:modelValue":C[1]||(C[1]=S=>oe(_)?_.value=S:_=S),class:"mt-2","inline-prompt":"",style:{"margin-left":"24px"},"active-icon":"MoonNight","inactive-icon":"Sunny",onChange:U},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),r("img",{src:s(c).avatar,style:{height:"30px",width:"30px",margin:"0 10px"}},null,8,ve),e(Q,null,{dropdown:o(()=>[e(O,null,{default:o(()=>[e(K,{onClick:s(y)},{default:o(()=>[N("退出登录")]),_:1},8,["onClick"])]),_:1})]),default:o(()=>[r("span",xe,[N(b(s(c).username)+" ",1),e(J,{class:"el-icon--right"},{default:o(()=>[e(G)]),_:1})])]),_:1})])}}}),ke={class:"tabber"},we={name:"Tabber"},Ce=h({...we,setup(i){return(a,c)=>(l(),p("div",ke,[e(ge),e(ye)]))}});const Se=M(Ce,[["__scopeId","data-v-d28cfb85"]]),$e={class:"layout_container"},Le={name:"Layout"},Ve=h({...Le,setup(i){let a=L(),c=D().menuRoutes,m=E();return(x,_)=>{const d=n("el-scrollbar"),f=n("el-menu");return l(),p("div",$e,[r("div",{class:F(["layout_slide",s(a).fold?"fold":""])},[e(ie),e(f,{"background-color":"$base-menu-bgc","text-color":"white","default-active":s(m).path,collapse:s(a).fold},{default:o(()=>[e(d,{class:"scrollbar"},{default:o(()=>[e(ue,{menuList:s(c)},null,8,["menuList"])]),_:1})]),_:1},8,["default-active","collapse"])],2),r("div",{class:F(["layout_tabbar",s(a).fold?"fold":""])},[e(Se)],2),r("div",{class:F(["layout_main",s(a).fold?"fold":""])},[e(me)],2)])}}});const Ee=M(Ve,[["__scopeId","data-v-ba84a612"]]);export{Ee as default};
