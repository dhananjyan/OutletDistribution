import{_ as J,v as me,r as k,w as f}from"./index-dff33365.js";function F(i,e){return F=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,t){return r.__proto__=t,r},F(i,e)}function Ee(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,F(i,e)}function Z(i,e,o){if(o||arguments.length===2)for(var r=0,t=e.length,n;r<t;r++)(n||!(r in e))&&(n||(n=Array.prototype.slice.call(e,0,r)),n[r]=e[r]);return i.concat(n||Array.prototype.slice.call(e))}/*!
 * content-type
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */var K=/; *([!#$%&'*+.^_`|~0-9A-Za-z-]+) *= *("(?:[\u000b\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u000b\u0020-\u00ff])*"|[!#$%&'*+.^_`|~0-9A-Za-z-]+) */g,we=/\\([\u000b\u0020-\u00ff])/g,ye=/^[!#$%&'*+.^_`|~0-9A-Za-z-]+\/[!#$%&'*+.^_`|~0-9A-Za-z-]+$/,Se=ge;function ge(i){if(!i)throw new TypeError("argument string is required");var e=typeof i=="object"?be(i):i;if(typeof e!="string")throw new TypeError("argument string is required to be a string");var o=e.indexOf(";"),r=o!==-1?e.slice(0,o).trim():e.trim();if(!ye.test(r))throw new TypeError("invalid media type");var t=new Ae(r.toLowerCase());if(o!==-1){var n,a,s;for(K.lastIndex=o;a=K.exec(e);){if(a.index!==o)throw new TypeError("invalid parameter format");o+=a[0].length,n=a[1].toLowerCase(),s=a[2],s.charCodeAt(0)===34&&(s=s.slice(1,-1),s.indexOf("\\")!==-1&&(s=s.replace(we,"$1"))),t.parameters[n]=s}if(o!==e.length)throw new TypeError("invalid parameter format")}return t}function be(i){var e;if(typeof i.getHeader=="function"?e=i.getHeader("content-type"):typeof i.headers=="object"&&(e=i.headers&&i.headers["content-type"]),typeof e!="string")throw new TypeError("content-type header is missing from object");return e}function Ae(i){this.parameters=Object.create(null),this.type=i}var L=new Map,oe=function(e){return e.cloneNode(!0)},ee=function(){return window.location.protocol==="file:"},ae=function(e,o,r){var t=new XMLHttpRequest;t.onreadystatechange=function(){try{if(!/\.svg/i.test(e)&&t.readyState===2){var n=t.getResponseHeader("Content-Type");if(!n)throw new Error("Content type not found");var a=Se(n).type;if(!(a==="image/svg+xml"||a==="text/plain"))throw new Error("Invalid content type: ".concat(a))}if(t.readyState===4){if(t.status===404||t.responseXML===null)throw new Error(ee()?"Note: SVG injection ajax calls do not work locally without adjusting security settings in your browser. Or consider using a local webserver.":"Unable to load SVG file: "+e);if(t.status===200||ee()&&t.status===0)r(null,t);else throw new Error("There was a problem injecting the SVG: "+t.status+" "+t.statusText)}}catch(s){if(t.abort(),s instanceof Error)r(s,t);else throw s}},t.open("GET",e),t.withCredentials=o,t.overrideMimeType&&t.overrideMimeType("text/xml"),t.send()},x={},te=function(e,o){x[e]=x[e]||[],x[e].push(o)},xe=function(e){for(var o=function(a,s){setTimeout(function(){if(Array.isArray(x[e])){var l=L.get(e),d=x[e][a];l instanceof SVGSVGElement&&d(null,oe(l)),l instanceof Error&&d(l),a===x[e].length-1&&delete x[e]}},0)},r=0,t=x[e].length;r<t;r++)o(r)},je=function(e,o,r){if(L.has(e)){var t=L.get(e);if(t===void 0){te(e,r);return}if(t instanceof SVGSVGElement){r(null,oe(t));return}}L.set(e,void 0),te(e,r),ae(e,o,function(n,a){var s;n?L.set(e,n):((s=a.responseXML)===null||s===void 0?void 0:s.documentElement)instanceof SVGSVGElement&&L.set(e,a.responseXML.documentElement),xe(e)})},qe=function(e,o,r){ae(e,o,function(t,n){var a;t?r(t):((a=n.responseXML)===null||a===void 0?void 0:a.documentElement)instanceof SVGSVGElement&&r(null,n.responseXML.documentElement)})},Re=0,Ce=function(){return++Re},S=[],re={},Ie="http://www.w3.org/2000/svg",$="http://www.w3.org/1999/xlink",ne=function(e,o,r,t,n,a,s){var l=e.getAttribute("data-src")||e.getAttribute("src");if(!l){s(new Error("Invalid data-src or src attribute"));return}if(S.indexOf(e)!==-1){S.splice(S.indexOf(e),1),e=null;return}S.push(e),e.setAttribute("src","");var d=t?je:qe;d(l,n,function(G,u){if(!u){S.splice(S.indexOf(e),1),e=null,s(G);return}var j=e.getAttribute("id");j&&u.setAttribute("id",j);var A=e.getAttribute("title");A&&u.setAttribute("title",A);var q=e.getAttribute("width");q&&u.setAttribute("width",q);var R=e.getAttribute("height");R&&u.setAttribute("height",R);var m=Array.from(new Set(Z(Z(Z([],(u.getAttribute("class")||"").split(" "),!0),["injected-svg"],!1),(e.getAttribute("class")||"").split(" "),!0))).join(" ").trim();u.setAttribute("class",m);var p=e.getAttribute("style");p&&u.setAttribute("style",p),u.setAttribute("data-src",l);var E=[].filter.call(e.attributes,function(h){return/^data-\w[\w-]*$/.test(h.name)});if(Array.prototype.forEach.call(E,function(h){h.name&&h.value&&u.setAttribute(h.name,h.value)}),r){var w={clipPath:["clip-path"],"color-profile":["color-profile"],cursor:["cursor"],filter:["filter"],linearGradient:["fill","stroke"],marker:["marker","marker-start","marker-mid","marker-end"],mask:["mask"],path:[],pattern:["fill","stroke"],radialGradient:["fill","stroke"]},W,v,g,c,b;Object.keys(w).forEach(function(h){W=h,g=w[h],v=u.querySelectorAll(W+"[id]");for(var le=function(U,Me){c=v[U].id,b=c+"-"+Ce();var M;Array.prototype.forEach.call(g,function(Q){M=u.querySelectorAll("["+Q+'*="'+c+'"]');for(var V=0,he=M.length;V<he;V++){var B=M[V].getAttribute(Q);B&&!B.match(new RegExp('url\\("?#'+c+'"?\\)'))||M[V].setAttribute(Q,"url(#"+b+")")}});for(var H=u.querySelectorAll("[*|href]"),D=[],T=0,de=H.length;T<de;T++){var Y=H[T].getAttributeNS($,"href");Y&&Y.toString()==="#"+v[U].id&&D.push(H[T])}for(var z=0,ve=D.length;z<ve;z++)D[z].setAttributeNS($,"href","#"+b);v[U].id=b},X=0,pe=v.length;X<pe;X++)le(X)})}u.removeAttribute("xmlns:a");for(var y=u.querySelectorAll("script"),C=[],_,I,O=0,ue=y.length;O<ue;O++)I=y[O].getAttribute("type"),(!I||I==="application/ecmascript"||I==="application/javascript"||I==="text/javascript")&&(_=y[O].innerText||y[O].textContent,_&&C.push(_),u.removeChild(y[O]));if(C.length>0&&(o==="always"||o==="once"&&!re[l])){for(var P=0,ce=C.length;P<ce;P++)new Function(C[P])(window);re[l]=!0}var fe=u.querySelectorAll("style");if(Array.prototype.forEach.call(fe,function(h){h.textContent+=""}),u.setAttribute("xmlns",Ie),u.setAttribute("xmlns:xlink",$),a(u),!e.parentNode){S.splice(S.indexOf(e),1),e=null,s(new Error("Parent node is null"));return}e.parentNode.replaceChild(u,e),S.splice(S.indexOf(e),1),e=null,s(null,u)})},Ge=function(e,o){var r=o===void 0?{}:o,t=r.afterAll,n=t===void 0?function(){}:t,a=r.afterEach,s=a===void 0?function(){}:a,l=r.beforeEach,d=l===void 0?function(){}:l,G=r.cacheRequests,u=G===void 0?!0:G,j=r.evalScripts,A=j===void 0?"never":j,q=r.httpRequestWithCredentials,R=q===void 0?!1:q,m=r.renumerateIRIElements,p=m===void 0?!0:m;if(e&&"length"in e)for(var E=0,w=0,W=e.length;w<W;w++)ne(e[w],A,p,u,R,d,function(v,g){s(v,g),e&&"length"in e&&e.length===++E&&n(E)});else e?ne(e,A,p,u,R,d,function(v,g){s(v,g),n(1),e=null}):n(0)},We=function(e){var o=(e==null?void 0:e.ownerDocument)||document;return o.defaultView||window},_e=function(e,o){for(var r in e)if(!(r in o))return!0;for(var t in o)if(e[t]!==o[t])return!0;return!1},Oe=["afterInjection","beforeInjection","desc","evalScripts","fallback","httpRequestWithCredentials","loading","renumerateIRIElements","src","title","useRequestCache","wrapper"],N="http://www.w3.org/2000/svg",ie="http://www.w3.org/1999/xlink",se=function(i){Ee(e,i);function e(){for(var r,t=arguments.length,n=new Array(t),a=0;a<t;a++)n[a]=arguments[a];return r=i.call.apply(i,[this].concat(n))||this,r.initialState={hasError:!1,isLoading:!0},r.state=r.initialState,r._isMounted=!1,r.reactWrapper=void 0,r.nonReactWrapper=void 0,r.refCallback=function(s){r.reactWrapper=s},r}var o=e.prototype;return o.renderSVG=function(){var t=this;if(this.reactWrapper instanceof We(this.reactWrapper).Node){var n=this.props,a=n.desc,s=n.evalScripts,l=n.httpRequestWithCredentials,d=n.renumerateIRIElements,G=n.src,u=n.title,j=n.useRequestCache,A=this.props.onError,q=this.props.beforeInjection,R=this.props.afterInjection,m=this.props.wrapper,p,E;m==="svg"?(p=document.createElementNS(N,m),p.setAttribute("xmlns",N),p.setAttribute("xmlns:xlink",ie),E=document.createElementNS(N,m)):(p=document.createElement(m),E=document.createElement(m)),p.appendChild(E),E.dataset.src=G,this.nonReactWrapper=this.reactWrapper.appendChild(p);var w=function(c){if(t.removeSVG(),!t._isMounted){A(c);return}t.setState(function(){return{hasError:!0,isLoading:!1}},function(){A(c)})},W=function(c,b){if(c){w(c);return}t._isMounted&&t.setState(function(){return{isLoading:!1}},function(){try{R(b)}catch(y){w(y)}})},v=function(c){if(c.setAttribute("role","img"),a){var b=c.querySelector(":scope > desc");b&&c.removeChild(b);var y=document.createElement("desc");y.innerHTML=a,c.prepend(y)}if(u){var C=c.querySelector(":scope > title");C&&c.removeChild(C);var _=document.createElement("title");_.innerHTML=u,c.prepend(_)}try{q(c)}catch(I){w(I)}};Ge(E,{afterEach:W,beforeEach:v,cacheRequests:j,evalScripts:s,httpRequestWithCredentials:l,renumerateIRIElements:d})}},o.removeSVG=function(){var t;(t=this.nonReactWrapper)!=null&&t.parentNode&&(this.nonReactWrapper.parentNode.removeChild(this.nonReactWrapper),this.nonReactWrapper=null)},o.componentDidMount=function(){this._isMounted=!0,this.renderSVG()},o.componentDidUpdate=function(t){var n=this;_e(J({},t),this.props)&&this.setState(function(){return n.initialState},function(){n.removeSVG(),n.renderSVG()})},o.componentWillUnmount=function(){this._isMounted=!1,this.removeSVG()},o.render=function(){var t=this.props;t.afterInjection,t.beforeInjection,t.desc,t.evalScripts;var n=t.fallback;t.httpRequestWithCredentials;var a=t.loading;t.renumerateIRIElements,t.src,t.title,t.useRequestCache;var s=t.wrapper,l=me(t,Oe),d=s;return k.createElement(d,J({},l,{ref:this.refCallback},s==="svg"?{xmlns:N,xmlnsXlink:ie}:{}),this.state.isLoading&&a&&k.createElement(a,null),this.state.hasError&&n&&k.createElement(n,null))},e}(k.Component);se.defaultProps={afterInjection:function(){},beforeInjection:function(){},desc:"",evalScripts:"never",fallback:null,httpRequestWithCredentials:!1,loading:null,onError:function(){},renumerateIRIElements:!0,title:"",useRequestCache:!0,wrapper:"div"};se.propTypes={afterInjection:f.func,beforeInjection:f.func,desc:f.string,evalScripts:f.oneOf(["always","once","never"]),fallback:f.oneOfType([f.func,f.object,f.string]),httpRequestWithCredentials:f.bool,loading:f.oneOfType([f.func,f.object,f.string]),onError:f.func,renumerateIRIElements:f.bool,src:f.string.isRequired,title:f.string,useRequestCache:f.bool,wrapper:f.oneOf(["div","span","svg"])};export{se as R};
