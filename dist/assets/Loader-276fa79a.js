import{r as c,j as r,f as R}from"./index-8b0ddf05.js";import{R as I}from"./react-svg.esm-8b2b7316.js";import{u as $}from"./ThemeProvider-f4185178.js";const B=c.forwardRef(({bsPrefix:o,variant:t,animation:n="border",size:l,as:u="div",className:h,...i},d)=>{o=$(o,"spinner");const x=`${o}-${n}`;return r.jsx(u,{ref:d,...i,className:R(h,x,l&&`${x}-${l}`,t&&`text-${t}`)})});B.displayName="Spinner";const m=B,y="_selectBox_5s0qd_1",F="_dropdownArrow_5s0qd_15",V="_isOpen_5s0qd_18",A="_popup_5s0qd_21",T="_searchInputContainer_5s0qd_49",D="_multiSelectField_5s0qd_66",M="_checkbox_5s0qd_71",P="_radioButton_5s0qd_78",G="_active_5s0qd_84",a={selectBox:y,dropdownArrow:F,isOpen:V,popup:A,searchInputContainer:T,multiSelectField:D,checkbox:M,radioButton:P,active:G},J=(o,t=500)=>{const[n,l]=c.useState(o),u=c.useRef(null);return[n,i=>{clearTimeout(u.current),u.current=setTimeout(()=>{l(i)},t)}]},L="/outletdistribution/assets/downArrow-858f5328.svg",z="/outletdistribution/assets/search-2cef15ce.svg";function X(o){const{options:t=[],value:n=[],onOpen:l,onChange:u,name:h,isMultiSelect:i=!1,onClose:d,zIndex:x="10001"}=o,p=c.useRef(),j=c.useRef(),[_,v]=c.useState(t),[C,g]=c.useState(!1),[S,w]=J(null,300);function E(e){p.current&&p.current.contains(e.target)||g(s=>(s?(d(),w(null)):setTimeout(()=>{l()},100),!s))}c.useEffect(()=>{v(t)},[JSON.stringify(t)]),c.useEffect(()=>{var e;S&&((e=String(S))!=null&&e.trim())?v(t==null?void 0:t.filter(s=>{var f,N,k;return(k=(f=String(s.label))==null?void 0:f.toLowerCase())==null?void 0:k.includes((N=String(S))==null?void 0:N.toLowerCase())})):v(t)},[S]);function q(e){w(e.target.value)}const b=e=>{let s=[...n];i?n!=null&&n.includes(e==null?void 0:e.value)?s=s.filter(f=>f!=(e==null?void 0:e.value)):s.push(e==null?void 0:e.value):s=[e==null?void 0:e.value],u({field:h,value:s,item:e}),i||(g(!1),v(t))};return c.useEffect(()=>{const e=s=>{p.current&&!p.current.contains(s.target)&&(!j.current||!j.current.contains(s.target))&&(g(!1),typeof d=="function"&&(d(),w(null)))};return document.addEventListener("click",e),()=>{document.removeEventListener("click",e)}},[]),r.jsxs("div",{className:R(a.selectBox,{[a.isOpen]:C}),tabIndex:"0",ref:j,onClick:E,children:[n!=null&&n.length?r.jsx("div",{className:a.placeholder,children:n==null?void 0:n.map((e,s)=>s==0?e:`, ${e}`)}):r.jsx("div",{children:"Please Select..."}),r.jsx(I,{className:a.dropdownArrow,src:L}),C?r.jsxs("div",{className:a.popup,style:{zIndex:x},ref:p,children:[r.jsxs("div",{className:a.searchInputContainer,children:[r.jsx(I,{src:z}),r.jsx("input",{placeholder:"Search",onChange:q})]}),_!=null&&_.length?_.map((e,s)=>r.jsxs("div",{className:a.multiSelectField,children:[r.jsx("input",{type:"checkbox",onChange:f=>b(e),checked:n==null?void 0:n.includes(e==null?void 0:e.value),className:a.checkbox}),r.jsx("div",{onClick:()=>b(e),children:e.label})]},`FILTERED_OPTION_ITEM_${s}`)):r.jsx("div",{children:"No match"})]}):""]})}const H="_parent_1u6pv_1",K="_spinner_1u6pv_4",O={parent:H,spinner:K};function Y(o){const{show:t=!1,children:n}=o;return r.jsxs("div",{className:O.parent,children:[t?r.jsx("div",{className:O.spinner,children:r.jsx(m,{animation:"border",role:"status",variant:"secondary",children:r.jsx("span",{className:"visually-hidden",children:"Loading..."})})}):"",n]})}export{Y as L,X as S};
