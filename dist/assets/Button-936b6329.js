import{r as d,j as x,f as m}from"./index-8b0ddf05.js";import{u as j}from"./ThemeProvider-f4185178.js";const B=["as","disabled"];function P(t,o){if(t==null)return{};var n={},s=Object.keys(t),r,e;for(e=0;e<s.length;e++)r=s[e],!(o.indexOf(r)>=0)&&(n[r]=t[r]);return n}function $(t){return!t||t.trim()==="#"}function b({tagName:t,disabled:o,href:n,target:s,rel:r,role:e,onClick:i,tabIndex:f=0,type:c}){t||(n!=null||s!=null||r!=null?t="a":t="button");const a={tagName:t};if(t==="button")return[{type:c||"button",disabled:o},a];const l=u=>{if((o||t==="a"&&$(n))&&u.preventDefault(),o){u.stopPropagation();return}i==null||i(u)},p=u=>{u.key===" "&&(u.preventDefault(),l(u))};return t==="a"&&(n||(n="#"),o&&(n=void 0)),[{role:e??"button",disabled:void 0,tabIndex:o?void 0:f,href:n,target:t==="a"?s:void 0,"aria-disabled":o||void 0,rel:t==="a"?r:void 0,onClick:l,onKeyDown:p},a]}const k=d.forwardRef((t,o)=>{let{as:n,disabled:s}=t,r=P(t,B);const[e,{tagName:i}]=b(Object.assign({tagName:n,disabled:s},r));return x.jsx(i,Object.assign({},r,e,{ref:o}))});k.displayName="Button";const y=d.forwardRef(({as:t,bsPrefix:o,variant:n="primary",size:s,active:r=!1,disabled:e=!1,className:i,...f},c)=>{const a=j(o,"btn"),[l,{tagName:p}]=b({tagName:t,disabled:e,...f}),u=p;return x.jsx(u,{...l,...f,ref:c,disabled:e,className:m(i,a,r&&"active",n&&`${a}-${n}`,s&&`${a}-${s}`,f.href&&e&&"disabled")})});y.displayName="Button";const O=y;export{O as B,k as a,b as u};