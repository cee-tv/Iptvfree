(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4259],{24259:function(e,t,a){"use strict";a.r(t);var s=a(85893),r=a(67294),n=a(75227),i=a(72548),l=a(30240),o=a(44210),c=a(6790),d=a(45929),m=a(98456),g=a(45445);a(76012);var u=a(30127),h=a(81354),v=a(82379),C=a(30120),y=a(11163),f=a(77781),p=a(14691),S=a(44510),x=a(25675),j=a.n(x),w=a(40762),_=a(22143),N=a(2737),F=a(89831),H=a(89355),b=a(45610);t.default=()=>{let e=(0,y.useRouter)(),t=(0,r.useRef)(null),{makeRequest:a}=(0,i.Z)(),{view:x}=(0,y.useRouter)().query,{user:M,alert:Z,streamData:k,currentPlayer:L}=(0,r.useContext)(o.I),{liveTv:T}=k,[E,A]=(0,r.useState)([]),[D,P]=(0,r.useState)([]),[z,B]=(0,r.useState)([]),[R,O]=(0,r.useState)(!1),[I,U]=(0,r.useState)(null),[K,Y]=(0,r.useState)([]),[q,G]=(0,r.useState)([]),[J,W]=(0,r.useState)(null),[Q,V]=(0,r.useState)([]),[X,$]=(0,r.useState)(0),[ee,et]=(0,r.useState)(null),[ea,es]=(0,r.useState)(null),[er,en]=(0,r.useState)(!1),[ei,el]=(0,r.useState)([]),[eo,ec]=(0,r.useState)([]),[ed,em]=(0,r.useState)(!1),[eg,eu]=(0,r.useState)({favourite:!0,channelHistory:!0}),[eh,ev]=(0,r.useState)(!1),[eC,ey]=(0,r.useState)(!1),[ef,ep]=(0,r.useState)(!1),[eS,ex]=(0,r.useState)(!1),[ej,ew]=(0,r.useState)(!1),[e_,eN]=(0,r.useState)(!1),eF=(0,p.A)("currentUser"),[eH,eb]=(0,r.useState)(""),[eM,eZ]=(0,r.useState)(null),[ek,eL]=(0,r.useState)(null),eT=(0,H.N8)(b.l);(0,r.useEffect)(()=>{M&&(eP(l.FP.getLiveCategories,A,"categories"),eP(l.FP.getLiveStreams,B,"streams"),(0,H.jM)((0,H.iH)(eT,"".concat(M.dbAddress,"/Fav/LiveTv")),e=>{eI()}),(0,H.jM)((0,H.iH)(eT,"".concat(M.dbAddress,"/Recent/LiveTv")),e=>{eU()}))},[M]),(0,r.useEffect)(()=>{},[]),(0,r.useEffect)(()=>{M&&T.streams&&I&&(Y([]),eI(),eU(),eO())},[M,T.streams,I]),(0,r.useEffect)(()=>{if(T.streamCategories&&T.streams){if(x){let e=T.streams.filter(e=>String(e.stream_id)===String(x))[0].category_id?T.streams.filter(e=>String(e.stream_id)===String(x))[0].category_id:T.streams.filter(e=>String(e.stream_id)===String(x))[0].categories[0],t=T.streamCategories.filter(t=>String(t.category_id)===String(e))[0];U(t),et(x)}else U(E[0]),et(T.streams[0].stream_id)}},[E,T.streams]),(0,r.useEffect)(()=>{Y([]),I&&T.streams&&t.current&&(eO(),eU(),eI(),t.current.scrollTo(0,0))},[I,T.streams,t]),(0,r.useEffect)(()=>{q.length>0&&(eq(),en(!0))},[q]),(0,r.useEffect)(()=>{x?ev(!0):ev(!1)},[x]),(0,r.useEffect)(()=>{if(ee&&er&&q.length>0){let e=new Date().getTime(),t="number"==typeof q[0].end?C.ou.fromSeconds(q[0].end,{zone:eE}).toFormat("yyyy-MM-dd HH:mm:ss"):q[0].end,a=C.ou.fromFormat(t,"yyyy-MM-dd HH:mm:ss",{zone:eE}).setZone("Asia/Kolkata"),s=new Date(a).getTime()+1e5,r=s-e;if(r>0){let e=setTimeout(()=>{eK(K.filter(e=>String(e.stream_id)===String(ee))[0])},r);return()=>clearTimeout(e)}}},[ee,er,q]);let eE=M?JSON.parse(h.AES.decrypt(M.serverInfo,"thisisserverinfo").toString(h.enc.Utf8)).timezone:"America/NewYork";function eA(e){if(e instanceof Date||(e=new Date(e)),isNaN(e.getTime()))return null;let t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0"),r=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0"),i=String(e.getSeconds()).padStart(2,"0");return"".concat(t,"-").concat(a,"-").concat(s," ").concat(r,":").concat(n,":").concat(i)}let eD=e=>{let t=new Date(e).getTime();if("NaN"!==t.toString()){if("one-stream-panel"===M.loginType){let e=eA(t),a=C.ou.fromFormat(e,"yyyy-MM-dd HH:mm:ss").toFormat("hh:mm a");return a}{let e=eA(t),a=C.ou.fromFormat(e,"yyyy-MM-dd HH:mm:ss",{zone:eE}),s=Intl.DateTimeFormat().resolvedOptions().timeZone,r=a.setZone(s).toFormat("hh:mm a");return r}}return null},eP=async(e,t,s)=>{O(!0);try{let r=await a().get(e),n=r.data.message;"Something went wrong!"===n||0===n.length?(ew(!0),t([])):(ew(!1),t(n),"streams"===s&&T.toggle(n,"streams"),"categories"===s&&T.toggle(n,"categories"))}catch(e){B(null),console.log("Error",e)}O(!1)},ez=["adult","xxx","porn","sex","adults","ADULTS","+18","18+","18"],eB=e=>T.streams.filter(t=>String(null==t?void 0:t.stream_id)===String(e))[0].links.m3u8,eR=async(e,t)=>{var s,r,n,i;let o=(null===(s=T.streams.filter(t=>String(null==t?void 0:t.stream_id)===String(e))[0])||void 0===s?void 0:s.category_id)?null===(r=T.streams.filter(t=>String(null==t?void 0:t.stream_id)===String(e))[0])||void 0===r?void 0:r.category_id:null===(n=T.streams.filter(t=>String(null==t?void 0:t.stream_id)===String(e))[0])||void 0===n?void 0:n.categories[0],c=null===(i=T.streamCategories.filter(e=>String(null==e?void 0:e.category_id)===String(o))[0])||void 0===i?void 0:i.category_name;G([]),W(null);let d=ez.filter(e=>c.toLowerCase().includes(e.toLowerCase())).length>0;if(eS)try{let t=await a().get(l.FP.getEpg+"?stream_id=".concat(e)),{epg_listings:s,streamUrl:r}=t.data.message,{loginType:n}=M;G(s||[]),W("one-stream-panel"===n?eB(e):r)}catch(e){console.log(e)}else if(eF){if(ep(d),d){if(d&&t){try{let t=await a().get(l.FP.getEpg+"?stream_id=".concat(e)),{epg_listings:s,streamUrl:r}=t.data.message,{loginType:n}=M;G(s||[]),W("one-stream-panel"===n?eB(e):r)}catch(e){console.log(e)}ep(!1),ex(!1)}}else{try{let t=await a().get(l.FP.getEpg+"?stream_id=".concat(e)),{epg_listings:s,streamUrl:r}=t.data.message,{loginType:n}=M;G(s||[]),W("one-stream-panel"===n?eB(e):r)}catch(e){console.log(e)}ex(!1)}}else try{let t=await a().get(l.FP.getEpg+"?stream_id=".concat(e)),{epg_listings:s,streamUrl:r}=t.data.message,{loginType:n}=M;G(s||[]),W("one-stream-panel"===n?eB(e):r)}catch(e){console.log(e)}},eO=e=>{if("Favourites"!==I.category_name&&"Channel History"!==I.category_name){let a=T.streams.filter(e=>{var t;return String(null==e?void 0:e.category_id)===String(null==I?void 0:I.category_id)||(null==e?void 0:null===(t=e.categories)||void 0===t?void 0:t.filter(e=>String(e)===String(I.category_id)).length)>0});if(Y(a),x||(et(a[0].stream_id),e_||(eK(a[0]),es(a[0]),eN(!0))),!e_){var t;"fav"!==e&&eR(x||(null===(t=a[0])||void 0===t?void 0:t.stream_id),!!x||eS),eN(!0)}}},eI=async()=>{try{let e=await (0,v.on)("LiveTv",M.dbAddress),t=e.val()?Object.keys(e.val()):[],a=e.val()?Object.values(e.val()):[];V(t);let s=[];(()=>{let e=[];return t.forEach((t,s)=>e.push({id:t,timestamp:a[s]})),e})().map(e=>{let t=T.streams.filter(t=>String(t.stream_id)===String(e.id))[0];t&&s.push({...t,timestamp:e.timestamp})});let r=s.sort((e,t)=>t.timestamp-e.timestamp);el(r)}catch(e){el([])}},eU=async()=>{try{let e=await (0,v.B4)("LiveTv",M.dbAddress),t=e.val()?Object.keys(e.val()):[],a=e.val()?Object.values(e.val()):[],s=[];(()=>{let e=[];return t.forEach((t,s)=>e.push({id:t,timestamp:a[s]})),e})().map(e=>{let t=T.streams.filter(t=>String(t.stream_id)===String(e.id));t.length>0&&s.push({...t[0],timestamp:e.timestamp})});let r=s.sort((e,t)=>t.timestamp-e.timestamp);ec(r)}catch(e){ec([])}},eK=e=>{let{stream_id:t}=e;W(null),eR(String(t),eS),et(String(t))},eY=async(e,t)=>{t?await (0,v.h2)(e,"LiveTv",M.dbAddress):await (0,v.zg)(e,"LiveTv",M.dbAddress),eI(),Z.toggle({title:"".concat(t?"Removed from Favourites":"Added To Favourites"),show:!0,type:"success"})},eq=()=>{let{start:e,end:t}=q[0],a="number"==typeof e?C.ou.fromSeconds(e,{zone:eE}).toFormat("yyyy-MM-dd HH:mm:ss"):e,s="number"==typeof t?C.ou.fromSeconds(t,{zone:eE}).toFormat("yyyy-MM-dd HH:mm:ss"):t,r=C.ou.fromFormat(a,"yyyy-MM-dd HH:mm:ss",{zone:eE}).setZone("Asia/Kolkata"),n=C.ou.fromFormat(s,"yyyy-MM-dd HH:mm:ss",{zone:eE}).setZone("Asia/Kolkata"),i=new Date(r).getTime(),l=new Date(n).getTime(),o=new Date().getTime(),c=Number((100*((o-i)/1e3)/((l-i)/1e3)).toFixed(2));$(c)},eG=async()=>{ev(!1);try{await v.Gg.liveTv(ee,M.dbAddress)}catch(e){console.log(e)}},eJ=(e,t)=>{es(t);let a=e.target.tagName;"svg"===a||"path"===a||eK(t)},eW=e=>{ex(!1);let t=ez.filter(t=>e.category_name.toLowerCase().includes(t.toLowerCase())).length>0;eF?(ep(t),eL(e),t?t&&eS&&(U(e),ep(!1),ex(!1)):(U(e),ex(!1))):(U(e),ex(!1))},eQ=async e=>{try{await (0,v.C3)(e,"LiveTv",M.dbAddress,null),eU()}catch(e){console.log(e)}};return r.useRef(null),R?(0,s.jsx)(c.Z,{}):(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.default,{currentAction:"live"}),ej?(0,s.jsxs)("div",{className:"no-data-found-container",children:[(0,s.jsx)(j(),{src:w.Z,alt:"live-stream"}),(0,s.jsx)("h2",{className:"no-data-found",children:"No Live Streams found"})]}):(0,s.jsxs)("section",{className:"liveTv",children:[(0,s.jsxs)("div",{className:"panel tvCategory",children:[(0,s.jsx)("div",{className:"pHead",children:(0,s.jsxs)("div",{className:"controls",children:[eH.length>0?(0,s.jsx)(S.Z,{sx:{zIndex:9,":hover":{cursor:"pointer"}},onClick:()=>{eb(""),em(!1),eu({favourite:!0,channelHistory:!0})}}):(0,s.jsxs)("svg",{width:"34",height:"34",viewBox:"0 0 34 34",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[" ",(0,s.jsx)("path",{d:"M24.1175 26.1783C17.3706 31.352 8.08155 29.4127 3.57637 23.2248C-0.68313 17.3743 0.0222769 9.14911 5.26344 4.18996C10.6336 -0.891038 18.8046 -1.19482 24.501 3.47881C30.3196 8.25287 31.6682 16.9694 26.8365 23.4239C26.9409 23.5359 27.0477 23.6578 27.162 23.7719C29.1119 25.7217 31.0609 27.6722 33.0147 29.6185C33.5862 30.1878 33.854 30.8417 33.6315 31.6459C33.2639 32.9734 31.6879 33.5093 30.5881 32.6788C30.431 32.5601 30.2915 32.4168 30.1513 32.277C28.2428 30.3722 26.335 28.4663 24.4296 26.5579C24.3115 26.4402 24.2163 26.3001 24.1175 26.1783ZM15.2969 25.2385C21.1588 25.229 25.8636 20.5245 25.8675 14.668C25.8717 8.79405 21.1448 4.07337 15.2667 4.08145C9.40626 4.08917 4.70179 8.79476 4.69757 14.6522C4.6937 20.528 9.41961 25.248 15.2969 25.2385Z",fill:"#748BC8"})," "]}),(0,s.jsx)("input",{onChange:e=>{let{value:t}=e.target;if(eb(t),P(T.streamCategories.filter(e=>e.category_name.toLowerCase().includes(t.toLowerCase()))),0===t.length)em(!1),eu({favourite:!0,channelHistory:!0});else{let e="favourite".includes(t),a="channel history".includes(t);eu({favourite:e,channelHistory:a}),em(!0)}},value:eH,placeholder:"Search by Category or Channel name"})]})}),(0,s.jsxs)("div",{className:"pBody",children:[eg.favourite&&(0,s.jsx)("a",{onClick:()=>eW({category_name:"Favourites"}),href:"javascript:void(0)",children:"Favourite"}),eg.channelHistory&&(0,s.jsx)("a",{onClick:()=>eW({category_name:"Channel History"}),href:"javascript:void(0)",children:"Channel History"}),(ed?D:E).map(e=>{let{category_name:t}=e,a=ez.filter(e=>t.toLowerCase().includes(e)).length>0;return(0,s.jsxs)("a",{style:{display:"flex",justifyContent:"space-between"},className:t===(null==I?void 0:I.category_name)?"active":"",onClick:()=>eW(e),href:"javascript:void(0)",children:[t,(0,s.jsx)("svg",{display:a&&eF?"block":"none",width:"20",height:"26",viewBox:"0 0 20 26",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,s.jsx)("path",{d:"M9.35342 0.978516C9.71046 0.978516 10.0675 0.978516 10.4246 0.978516C10.6069 1.0108 10.7891 1.04529 10.972 1.07454C13.6371 1.50415 15.8459 3.8255 16.0656 6.51604C16.1583 7.65313 16.1075 8.80208 16.1216 9.94578C16.1229 10.0653 16.1218 10.1847 16.1218 10.3277C16.3536 10.3277 16.5625 10.3274 16.7714 10.3277C18.2385 10.3296 19.2373 11.3213 19.2379 12.7826C19.2392 16.337 19.239 19.8918 19.2379 23.4462C19.2373 24.9108 18.2409 25.908 16.7791 25.9094C15.3184 25.9108 13.8576 25.9097 12.3969 25.9097C9.24001 25.9097 6.08316 25.9124 2.92631 25.9083C1.60326 25.9066 0.549224 24.9067 0.545085 23.6167C0.533772 19.9486 0.535152 16.2805 0.545085 12.6123C0.54812 11.4981 1.37617 10.547 2.47545 10.3743C2.8554 10.3147 3.24694 10.3277 3.65641 10.3061C3.65641 10.2176 3.65641 10.1301 3.65641 10.0429C3.65696 9.06089 3.64813 8.07888 3.65972 7.09714C3.69007 4.49186 5.41763 2.12443 7.89129 1.3179C8.36506 1.16338 8.86531 1.08944 9.35342 0.978516ZM14.04 10.321C14.04 9.49768 14.0469 8.69612 14.0372 7.89484C14.0314 7.42549 14.0414 6.95007 13.9718 6.48817C13.6457 4.31968 11.4524 2.74195 9.29354 3.10037C7.17969 3.45107 5.74929 5.12373 5.73853 7.26407C5.73384 8.20498 5.73743 9.14615 5.73798 10.0871C5.73798 10.1638 5.7446 10.2405 5.74819 10.321C8.51957 10.321 11.2598 10.321 14.04 10.321ZM9.88457 14.4809C8.99416 14.4842 8.19481 15.0664 7.91475 15.9154C7.63634 16.7589 7.92192 17.6764 8.65147 18.2081C8.81095 18.3242 8.86062 18.4412 8.85786 18.628C8.8482 19.293 8.85206 19.958 8.85593 20.623C8.85675 20.7515 8.86282 20.8848 8.89732 21.0073C9.03279 21.4883 9.51318 21.8086 9.9897 21.749C10.5222 21.6822 10.9071 21.2879 10.9174 20.7609C10.9312 20.0557 10.9295 19.3498 10.9187 18.6443C10.9157 18.4478 10.967 18.3253 11.1326 18.2036C11.8607 17.6681 12.1408 16.7523 11.8583 15.908C11.5735 15.0553 10.7742 14.4776 9.88457 14.4809Z",fill:"white"})})]})}),ed&&0===D.length&&!eg.channelHistory&&!eg.favourite&&(0,s.jsx)("h1",{className:"no-category-found",children:"No Categories Found !"})]})]}),(0,s.jsxs)("div",{className:"panel tvList",children:[(0,s.jsx)("div",{className:"pHead",children:(0,s.jsx)("span",{className:"h5",children:null==I?void 0:I.category_name})}),(0,s.jsxs)("div",{className:"pBody",ref:t,children:[((null==I?void 0:I.category_name)==="Favourites"?ei:(null==I?void 0:I.category_name)==="Channel History"?eo:K).map((e,t)=>{var a;let{stream_id:r}=e,n=Q.filter(e=>String(e)===String(r)).length>0,i=String(r)===String(ee),l=null===(a=T.streamCategories.filter(t=>String(t.category_id)===String(e.category_id?e.category_id:e.categories[0]))[0])||void 0===a?void 0:a.category_name,o=ez.filter(e=>l.toLowerCase().includes(e.toLowerCase())).length>0;return(0,s.jsxs)("div",{onClick:t=>eJ(t,e),style:{background:i&&"rgb(255,255,255,0.1)"},className:"list",children:[(0,s.jsxs)("div",{className:"channelList",children:[(0,s.jsx)("a",{href:"javascript:void(0)",className:"thumb",children:eM===t?(0,s.jsx)(j(),{alt:"placeholder",src:_.Z}):o&&(0,p.A)("currentUser")&&("Favourites"===I.category_name||"Channel History"===I.category_name)?(0,s.jsx)(j(),{alt:"placeholder",style:{objectFit:"contain",padding:"15px"},src:N.Z}):e.stream_icon?(0,s.jsx)("img",{src:e.stream_icon,onError:()=>eZ(t)}):(0,s.jsx)(j(),{alt:"placeholder",src:_.Z})}),(0,s.jsxs)("span",{className:"info",children:[(0,s.jsxs)("a",{href:"javascript:void(0)",children:[(0,s.jsx)("strong",{children:e.name}),"Program info Entertainment "]}),i&&(0,s.jsx)(d.ZP,{className:"live-stream-slider",value:i?X:0,size:"small",sx:{width:"90%",color:"#615DFC !important"},disabled:!0})]})]}),(0,s.jsxs)("div",{className:"fav-and-delete",style:{display:"flex",position:"absolute",top:0,right:0,gap:10,padding:5},children:[(0,s.jsxs)("svg",{stroke:"white",strokeWidth:1,onClick:()=>eY(e.stream_id,n),width:"25",height:"23",viewBox:"0 0 25 23",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[" ",(0,s.jsx)("path",{d:"M24.7976 7.2086C24.7976 7.54497 24.7976 7.88134 24.7976 8.21745C24.785 8.2871 24.7666 8.35624 24.7611 8.42614C24.6679 9.60254 24.2942 10.6901 23.7202 11.7141C22.9972 13.0041 22.0421 14.1134 20.9974 15.1449C18.4649 17.6453 15.6791 19.8596 13.0023 22.197C12.6849 22.4744 12.3046 22.4572 11.9748 22.1827C11.698 21.9523 11.4259 21.7161 11.1547 21.4789C9.00273 19.5982 6.83161 17.7395 4.70792 15.8278C3.39096 14.6423 2.1868 13.3382 1.31572 11.7747C-0.14759 9.14833 -0.226068 6.48212 1.24456 3.83987C2.05937 2.37555 3.31753 1.39294 4.94058 0.933683C6.67188 0.443893 8.33151 0.62053 9.87507 1.58901C10.8574 2.20547 11.6059 3.05081 12.2188 4.02484C12.3094 4.16867 12.3977 4.31377 12.4631 4.41924C12.9281 3.81943 13.3354 3.18783 13.8459 2.65514C15.6448 0.778747 17.8308 0.205432 20.2936 1.01695C22.6116 1.78079 23.9556 3.49467 24.5549 5.81947C24.6717 6.27318 24.7184 6.74505 24.7976 7.2086Z",fill:n?"#FF0000":"none"})]}),(null==I?void 0:I.category_name)==="Channel History"&&(0,s.jsxs)("svg",{onClick:()=>eQ(e.stream_id),width:"17",height:"24",viewBox:"0 0 30 37",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,s.jsx)("path",{d:"M2.70855 11.3789C11.0812 11.3789 19.3939 11.3789 27.7294 11.3789C27.7446 11.4827 27.7696 11.5774 27.7704 11.6722C27.7802 15.5732 27.8673 19.4765 27.7704 23.3744C27.6984 26.2888 27.4331 29.201 27.1725 32.1063C26.9504 34.5827 24.8378 36.5468 22.3538 36.5695C17.6124 36.6135 12.871 36.615 8.12965 36.5695C5.54262 36.5445 3.4451 34.4356 3.27006 31.8585C3.09577 29.2881 2.90178 26.7193 2.7184 24.1489C2.70703 23.9928 2.70779 23.8359 2.70779 23.6791C2.70703 19.7637 2.70703 15.8475 2.70703 11.9321C2.70855 11.7646 2.70855 11.5964 2.70855 11.3789Z",fill:"white"}),(0,s.jsx)("path",{d:"M15.2806 8.74084C10.9954 8.74084 6.70943 8.74615 2.42423 8.73099C2.08399 8.72948 1.70511 8.6537 1.41261 8.49078C0.801085 8.14978 0.545716 7.47612 0.715457 6.89415C0.9049 6.24323 1.54219 5.75825 2.25222 5.75371C3.63288 5.74537 5.0143 5.74007 6.39496 5.75901C6.72004 5.76356 6.90797 5.66505 7.07999 5.38846C7.69454 4.39805 8.32955 3.41977 8.96987 2.44603C9.88298 1.05855 11.1871 0.261373 12.833 0.185595C14.5516 0.106029 16.2809 0.0984515 17.9995 0.185595C19.9076 0.28259 21.2427 1.3662 22.1665 2.98481C22.5893 3.72591 22.9932 4.47913 23.3653 5.246C23.5494 5.62564 23.7654 5.77492 24.2056 5.76356C25.5575 5.72794 26.9109 5.73931 28.2628 5.75446C29.3282 5.76659 29.9981 6.60544 29.7722 7.60722C29.6374 8.20813 29.1372 8.65976 28.5212 8.72266C28.3234 8.74312 28.1233 8.73933 27.924 8.73933C23.7093 8.74084 19.4953 8.74084 15.2806 8.74084ZM20.4471 5.72491C20.125 5.20432 19.784 4.75951 19.5559 4.26317C19.1339 3.34323 18.4223 2.9545 17.4531 2.95146C15.9732 2.94768 14.4933 2.9454 13.0133 2.95222C12.3556 2.95525 11.7524 3.1697 11.3531 3.69105C10.8742 4.31621 10.4763 5.00427 10.0042 5.72415C13.5188 5.72491 16.9409 5.72491 20.4471 5.72491Z",fill:"white"})]})]})]})}),(null==I?void 0:I.category_name)==="Favourites"&&0===ei.length?(0,s.jsx)("h1",{className:"no-category-found",children:"No Favourite Streams found !"}):(null==I?void 0:I.category_name)==="Channel History"&&0===eo.length?(0,s.jsx)("h1",{className:"no-category-found",children:"No Channel History found !"}):0===K.length&&(null==I?void 0:I.category_name)!=="Favourites"&&(null==I?void 0:I.category_name)!=="Channel History"?(0,s.jsx)("h1",{className:"no-category-found",children:"No Live streams found !"}):null]})]}),(0,s.jsx)("div",{style:{position:"relative"},className:"steamDetail panel",children:0!==q.length||J?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("div",{className:"videoPlay",children:"videojs"===L.player?(0,s.jsx)(F.Z,{opened:eh,src:J,favourites:Q,currentStreams:K,currentStream:ee,getFavouriteChannels:eI,onPlayerReady:eG,restart:e=>eK(K[e]),onPreviousChannel:e=>{eC&&ev(!0),eK(K[e-1])},onNextChannel:e=>{eC&&ev(!0),eK(K[e+1])},onfullscreen:e=>ey(e),onclose:()=>{ev(!1),ey(!1),e.push("/dashboard/live",void 0,{shallow:!0})}}):(0,s.jsx)(u.default,{opened:eh,src:J,favourites:Q,currentStreams:K,currentStream:ee,getFavouriteChannels:eI,onPlayerReady:eG,restart:e=>eK(K[e]),onPreviousChannel:e=>{eC&&ev(!0),eK(K[e-1])},onNextChannel:e=>{eC&&ev(!0),eK(K[e+1])},onfullscreen:e=>ey(e),onclose:()=>{ev(!1),ey(!1),e.push("/dashboard/live",void 0,{shallow:!0})}})}),q.length>0?(0,s.jsxs)("div",{className:"panel",children:[(0,s.jsx)("div",{className:"pHead",children:(0,s.jsx)("span",{className:"h5",children:null==ea?void 0:ea.name})}),(0,s.jsx)("div",{className:"pBody",children:q.map((e,t)=>{let a=eD(e.start?e.start:e.start_timestamp),r=eD(e.stop?e.stop:e.end?e.end:e.timestamp),n=atob(e.title);return a&&r?(0,s.jsxs)("span",{className:0===t?"active":"",children:[(0,s.jsx)("b",{children:a}),"-",(0,s.jsx)("b",{children:r})," ",n]}):null})})]}):(0,s.jsx)("div",{className:"no-epg-found",children:(0,s.jsx)("p",{children:"No Epgs found related to this channel !"})})]}):(0,s.jsx)(m.Z,{className:"loader-icon"})})]}),(0,s.jsx)(f.Z,{action:"verify",close:()=>ep(!1),open:ef,completed:()=>{ex(!0),ep(!1),("Favourites"===I.category_name||"Channel History"===I.category_name)&&eR(ee,!0),U(ek)}}),eh&&(0,s.jsx)(g.Z,{sx:{background:"black",position:"fixed",top:0,zIndex:9999,left:0,width:"100%",height:"100%"},open:!0,children:(0,s.jsx)(m.Z,{sx:{color:"white"}})})]})}},76012:function(){}}]);