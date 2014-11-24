// Zepto 1.1.4 (generated with Zepto Builder) - zepto event ie - zeptojs.com/license
var Zepto=function(){function t(t){return null==t?t+"":J[U.call(t)]||"object"}function n(n){return"function"==t(n)}function e(t){return null!=t&&t==t.window}function r(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function i(n){return"object"==t(n)}function o(t){return i(t)&&!e(t)&&Object.getPrototypeOf(t)==Object.prototype}function s(t){return"number"==typeof t.length}function u(t){return A.call(t,function(t){return null!=t})}function a(t){return t.length>0?N.fn.concat.apply([],t):t}function c(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function f(t){return t in $?$[t]:$[t]=RegExp("(^|\\s)"+t+"(\\s|$)")}function l(t,n){return"number"!=typeof n||L[c(t)]?n:n+"px"}function h(t){var n,e;return Z[t]||(n=_.createElement(t),_.body.appendChild(n),e=getComputedStyle(n,"").getPropertyValue("display"),n.parentNode.removeChild(n),"none"==e&&(e="block"),Z[t]=e),Z[t]}function p(t){return"children"in t?T.call(t.children):N.map(t.childNodes,function(t){return 1==t.nodeType?t:w})}function d(t,n,e){for(x in n)e&&(o(n[x])||G(n[x]))?(o(n[x])&&!o(t[x])&&(t[x]={}),G(n[x])&&!G(t[x])&&(t[x]=[]),d(t[x],n[x],e)):n[x]!==w&&(t[x]=n[x])}function m(t,n){return null==n?N(t):N(t).filter(n)}function g(t,e,r,i){return n(e)?e.call(t,r,i):e}function v(t,n,e){null==e?t.removeAttribute(n):t.setAttribute(n,e)}function y(t,n){var e=t.className||"",r=e&&e.baseVal!==w;return n===w?r?e.baseVal:e:(r?e.baseVal=n:t.className=n,w)}function b(t){var n;try{return t?"true"==t||("false"==t?!1:"null"==t?null:/^0/.test(t)||isNaN(n=Number(t))?/^[\[\{]/.test(t)?N.parseJSON(t):t:n):t}catch(e){return t}}function E(t,n){n(t);for(var e=0,r=t.childNodes.length;r>e;e++)E(t.childNodes[e],n)}var w,x,N,C,O,P,S=[],T=S.slice,A=S.filter,_=window.document,Z={},$={},L={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},j=/^\s*<(\w+|!)[^>]*>/,k=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,z=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,M=/^(?:body|html)$/i,D=/([A-Z])/g,V=["val","css","html","text","data","width","height","offset"],q=["after","prepend","before","append"],F=_.createElement("table"),R=_.createElement("tr"),B={tr:_.createElement("tbody"),tbody:F,thead:F,tfoot:F,td:R,th:R,"*":_.createElement("div")},I=/complete|loaded|interactive/,H=/^[\w-]*$/,J={},U=J.toString,X={},Y=_.createElement("div"),W={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},G=Array.isArray||function(t){return t instanceof Array};return X.matches=function(t,n){if(!n||!t||1!==t.nodeType)return!1;var e=t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(e)return e.call(t,n);var r,i=t.parentNode,o=!i;return o&&(i=Y).appendChild(t),r=~X.qsa(i,n).indexOf(t),o&&Y.removeChild(t),r},O=function(t){return t.replace(/-+(.)?/g,function(t,n){return n?n.toUpperCase():""})},P=function(t){return A.call(t,function(n,e){return t.indexOf(n)==e})},X.fragment=function(t,n,e){var r,i,s;return k.test(t)&&(r=N(_.createElement(RegExp.$1))),r||(t.replace&&(t=t.replace(z,"<$1></$2>")),n===w&&(n=j.test(t)&&RegExp.$1),n in B||(n="*"),s=B[n],s.innerHTML=""+t,r=N.each(T.call(s.childNodes),function(){s.removeChild(this)})),o(e)&&(i=N(r),N.each(e,function(t,n){V.indexOf(t)>-1?i[t](n):i.attr(t,n)})),r},X.Z=function(t,n){return t=t||[],t.__proto__=N.fn,t.selector=n||"",t},X.isZ=function(t){return t instanceof X.Z},X.init=function(t,e){var r;if(!t)return X.Z();if("string"==typeof t)if(t=t.trim(),"<"==t[0]&&j.test(t))r=X.fragment(t,RegExp.$1,e),t=null;else{if(e!==w)return N(e).find(t);r=X.qsa(_,t)}else{if(n(t))return N(_).ready(t);if(X.isZ(t))return t;if(G(t))r=u(t);else if(i(t))r=[t],t=null;else if(j.test(t))r=X.fragment(t.trim(),RegExp.$1,e),t=null;else{if(e!==w)return N(e).find(t);r=X.qsa(_,t)}}return X.Z(r,t)},N=function(t,n){return X.init(t,n)},N.extend=function(t){var n,e=T.call(arguments,1);return"boolean"==typeof t&&(n=t,t=e.shift()),e.forEach(function(e){d(t,e,n)}),t},X.qsa=function(t,n){var e,i="#"==n[0],o=!i&&"."==n[0],s=i||o?n.slice(1):n,u=H.test(s);return r(t)&&u&&i?(e=t.getElementById(s))?[e]:[]:1!==t.nodeType&&9!==t.nodeType?[]:T.call(u&&!i?o?t.getElementsByClassName(s):t.getElementsByTagName(n):t.querySelectorAll(n))},N.contains=_.documentElement.contains?function(t,n){return t!==n&&t.contains(n)}:function(t,n){for(;n&&(n=n.parentNode);)if(n===t)return!0;return!1},N.type=t,N.isFunction=n,N.isWindow=e,N.isArray=G,N.isPlainObject=o,N.isEmptyObject=function(t){var n;for(n in t)return!1;return!0},N.inArray=function(t,n,e){return S.indexOf.call(n,t,e)},N.camelCase=O,N.trim=function(t){return null==t?"":String.prototype.trim.call(t)},N.uuid=0,N.support={},N.expr={},N.map=function(t,n){var e,r,i,o=[];if(s(t))for(r=0;t.length>r;r++)e=n(t[r],r),null!=e&&o.push(e);else for(i in t)e=n(t[i],i),null!=e&&o.push(e);return a(o)},N.each=function(t,n){var e,r;if(s(t)){for(e=0;t.length>e;e++)if(n.call(t[e],e,t[e])===!1)return t}else for(r in t)if(n.call(t[r],r,t[r])===!1)return t;return t},N.grep=function(t,n){return A.call(t,n)},window.JSON&&(N.parseJSON=JSON.parse),N.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,n){J["[object "+n+"]"]=n.toLowerCase()}),N.fn={forEach:S.forEach,reduce:S.reduce,push:S.push,sort:S.sort,indexOf:S.indexOf,concat:S.concat,map:function(t){return N(N.map(this,function(n,e){return t.call(n,e,n)}))},slice:function(){return N(T.apply(this,arguments))},ready:function(t){return I.test(_.readyState)&&_.body?t(N):_.addEventListener("DOMContentLoaded",function(){t(N)},!1),this},get:function(t){return t===w?T.call(this):this[t>=0?t:t+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(t){return S.every.call(this,function(n,e){return t.call(n,e,n)!==!1}),this},filter:function(t){return n(t)?this.not(this.not(t)):N(A.call(this,function(n){return X.matches(n,t)}))},add:function(t,n){return N(P(this.concat(N(t,n))))},is:function(t){return this.length>0&&X.matches(this[0],t)},not:function(t){var e=[];if(n(t)&&t.call!==w)this.each(function(n){t.call(this,n)||e.push(this)});else{var r="string"==typeof t?this.filter(t):s(t)&&n(t.item)?T.call(t):N(t);this.forEach(function(t){0>r.indexOf(t)&&e.push(t)})}return N(e)},has:function(t){return this.filter(function(){return i(t)?N.contains(this,t):N(this).find(t).size()})},eq:function(t){return-1===t?this.slice(t):this.slice(t,+t+1)},first:function(){var t=this[0];return t&&!i(t)?t:N(t)},last:function(){var t=this[this.length-1];return t&&!i(t)?t:N(t)},find:function(t){var n,e=this;return n=t?"object"==typeof t?N(t).filter(function(){var t=this;return S.some.call(e,function(n){return N.contains(n,t)})}):1==this.length?N(X.qsa(this[0],t)):this.map(function(){return X.qsa(this,t)}):[]},closest:function(t,n){var e=this[0],i=!1;for("object"==typeof t&&(i=N(t));e&&!(i?i.indexOf(e)>=0:X.matches(e,t));)e=e!==n&&!r(e)&&e.parentNode;return N(e)},parents:function(t){for(var n=[],e=this;e.length>0;)e=N.map(e,function(t){return(t=t.parentNode)&&!r(t)&&0>n.indexOf(t)?(n.push(t),t):w});return m(n,t)},parent:function(t){return m(P(this.pluck("parentNode")),t)},children:function(t){return m(this.map(function(){return p(this)}),t)},contents:function(){return this.map(function(){return T.call(this.childNodes)})},siblings:function(t){return m(this.map(function(t,n){return A.call(p(n.parentNode),function(t){return t!==n})}),t)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(t){return N.map(this,function(n){return n[t]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=h(this.nodeName))})},replaceWith:function(t){return this.before(t).remove()},wrap:function(t){var e=n(t);if(this[0]&&!e)var r=N(t).get(0),i=r.parentNode||this.length>1;return this.each(function(n){N(this).wrapAll(e?t.call(this,n):i?r.cloneNode(!0):r)})},wrapAll:function(t){if(this[0]){N(this[0]).before(t=N(t));for(var n;(n=t.children()).length;)t=n.first();N(t).append(this)}return this},wrapInner:function(t){var e=n(t);return this.each(function(n){var r=N(this),i=r.contents(),o=e?t.call(this,n):t;i.length?i.wrapAll(o):r.append(o)})},unwrap:function(){return this.parent().each(function(){N(this).replaceWith(N(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(t){return this.each(function(){var n=N(this);(t===w?"none"==n.css("display"):t)?n.show():n.hide()})},prev:function(t){return N(this.pluck("previousElementSibling")).filter(t||"*")},next:function(t){return N(this.pluck("nextElementSibling")).filter(t||"*")},html:function(t){return 0 in arguments?this.each(function(n){var e=this.innerHTML;N(this).empty().append(g(this,t,n,e))}):0 in this?this[0].innerHTML:null},text:function(t){return 0 in arguments?this.each(function(n){var e=g(this,t,n,this.textContent);this.textContent=null==e?"":""+e}):0 in this?this[0].textContent:null},attr:function(t,n){var e;return"string"!=typeof t||1 in arguments?this.each(function(e){if(1===this.nodeType)if(i(t))for(x in t)v(this,x,t[x]);else v(this,t,g(this,n,e,this.getAttribute(t)))}):this.length&&1===this[0].nodeType?!(e=this[0].getAttribute(t))&&t in this[0]?this[0][t]:e:w},removeAttr:function(t){return this.each(function(){1===this.nodeType&&v(this,t)})},prop:function(t,n){return t=W[t]||t,1 in arguments?this.each(function(e){this[t]=g(this,n,e,this[t])}):this[0]&&this[0][t]},data:function(t,n){var e="data-"+t.replace(D,"-$1").toLowerCase(),r=1 in arguments?this.attr(e,n):this.attr(e);return null!==r?b(r):w},val:function(t){return 0 in arguments?this.each(function(n){this.value=g(this,t,n,this.value)}):this[0]&&(this[0].multiple?N(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value)},offset:function(t){if(t)return this.each(function(n){var e=N(this),r=g(this,t,n,e.offset()),i=e.offsetParent().offset(),o={top:r.top-i.top,left:r.left-i.left};"static"==e.css("position")&&(o.position="relative"),e.css(o)});if(!this.length)return null;var n=this[0].getBoundingClientRect();return{left:n.left+window.pageXOffset,top:n.top+window.pageYOffset,width:Math.round(n.width),height:Math.round(n.height)}},css:function(n,e){if(2>arguments.length){var r=this[0],i=getComputedStyle(r,"");if(!r)return;if("string"==typeof n)return r.style[O(n)]||i.getPropertyValue(n);if(G(n)){var o={};return N.each(n,function(t,n){o[n]=r.style[O(n)]||i.getPropertyValue(n)}),o}}var s="";if("string"==t(n))e||0===e?s=c(n)+":"+l(n,e):this.each(function(){this.style.removeProperty(c(n))});else for(x in n)n[x]||0===n[x]?s+=c(x)+":"+l(x,n[x])+";":this.each(function(){this.style.removeProperty(c(x))});return this.each(function(){this.style.cssText+=";"+s})},index:function(t){return t?this.indexOf(N(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function(t){return t?S.some.call(this,function(t){return this.test(y(t))},f(t)):!1},addClass:function(t){return t?this.each(function(n){if("className"in this){C=[];var e=y(this),r=g(this,t,n,e);r.split(/\s+/g).forEach(function(t){N(this).hasClass(t)||C.push(t)},this),C.length&&y(this,e+(e?" ":"")+C.join(" "))}}):this},removeClass:function(t){return this.each(function(n){if("className"in this){if(t===w)return y(this,"");C=y(this),g(this,t,n,C).split(/\s+/g).forEach(function(t){C=C.replace(f(t)," ")}),y(this,C.trim())}})},toggleClass:function(t,n){return t?this.each(function(e){var r=N(this),i=g(this,t,e,y(this));i.split(/\s+/g).forEach(function(t){(n===w?!r.hasClass(t):n)?r.addClass(t):r.removeClass(t)})}):this},scrollTop:function(t){if(this.length){var n="scrollTop"in this[0];return t===w?n?this[0].scrollTop:this[0].pageYOffset:this.each(n?function(){this.scrollTop=t}:function(){this.scrollTo(this.scrollX,t)})}},scrollLeft:function(t){if(this.length){var n="scrollLeft"in this[0];return t===w?n?this[0].scrollLeft:this[0].pageXOffset:this.each(n?function(){this.scrollLeft=t}:function(){this.scrollTo(t,this.scrollY)})}},position:function(){if(this.length){var t=this[0],n=this.offsetParent(),e=this.offset(),r=M.test(n[0].nodeName)?{top:0,left:0}:n.offset();return e.top-=parseFloat(N(t).css("margin-top"))||0,e.left-=parseFloat(N(t).css("margin-left"))||0,r.top+=parseFloat(N(n[0]).css("border-top-width"))||0,r.left+=parseFloat(N(n[0]).css("border-left-width"))||0,{top:e.top-r.top,left:e.left-r.left}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||_.body;t&&!M.test(t.nodeName)&&"static"==N(t).css("position");)t=t.offsetParent;return t})}},N.fn.detach=N.fn.remove,["width","height"].forEach(function(t){var n=t.replace(/./,function(t){return t[0].toUpperCase()});N.fn[t]=function(i){var o,s=this[0];return i===w?e(s)?s["inner"+n]:r(s)?s.documentElement["scroll"+n]:(o=this.offset())&&o[t]:this.each(function(n){s=N(this),s.css(t,g(this,i,n,s[t]()))})}}),q.forEach(function(n,e){var r=e%2;N.fn[n]=function(){var n,i,o=N.map(arguments,function(e){return n=t(e),"object"==n||"array"==n||null==e?e:X.fragment(e)}),s=this.length>1;return 1>o.length?this:this.each(function(t,n){i=r?n:n.parentNode,n=0==e?n.nextSibling:1==e?n.firstChild:2==e?n:null;var u=N.contains(_.documentElement,i);o.forEach(function(t){if(s)t=t.cloneNode(!0);else if(!i)return N(t).remove();i.insertBefore(t,n),u&&E(t,function(t){null==t.nodeName||"SCRIPT"!==t.nodeName.toUpperCase()||t.type&&"text/javascript"!==t.type||t.src||window.eval.call(window,t.innerHTML)})})})},N.fn[r?n+"To":"insert"+(e?"Before":"After")]=function(t){return N(t)[n](this),this}}),X.Z.prototype=N.fn,X.uniq=P,X.deserializeValue=b,N.zepto=X,N}();window.Zepto=Zepto,void 0===window.$&&(window.$=Zepto),function(t){function n(t){return t._zid||(t._zid=h++)}function e(t,e,o,s){if(e=r(e),e.ns)var u=i(e.ns);return(g[n(t)]||[]).filter(function(t){return!(!t||e.e&&t.e!=e.e||e.ns&&!u.test(t.ns)||o&&n(t.fn)!==n(o)||s&&t.sel!=s)})}function r(t){var n=(""+t).split(".");return{e:n[0],ns:n.slice(1).sort().join(" ")}}function i(t){return RegExp("(?:^| )"+t.replace(" "," .* ?")+"(?: |$)")}function o(t,n){return t.del&&!y&&t.e in b||!!n}function s(t){return E[t]||y&&b[t]||t}function u(e,i,u,a,f,h,p){var d=n(e),m=g[d]||(g[d]=[]);i.split(/\s/).forEach(function(n){if("ready"==n)return t(document).ready(u);var i=r(n);i.fn=u,i.sel=f,i.e in E&&(u=function(n){var e=n.relatedTarget;return!e||e!==this&&!t.contains(this,e)?i.fn.apply(this,arguments):l}),i.del=h;var d=h||u;i.proxy=function(t){if(t=c(t),!t.isImmediatePropagationStopped()){t.data=a;var n=d.apply(e,t._args==l?[t]:[t].concat(t._args));return n===!1&&(t.preventDefault(),t.stopPropagation()),n}},i.i=m.length,m.push(i),"addEventListener"in e&&e.addEventListener(s(i.e),i.proxy,o(i,p))})}function a(t,r,i,u,a){var c=n(t);(r||"").split(/\s/).forEach(function(n){e(t,n,i,u).forEach(function(n){delete g[c][n.i],"removeEventListener"in t&&t.removeEventListener(s(n.e),n.proxy,o(n,a))})})}function c(n,e){return(e||!n.isDefaultPrevented)&&(e||(e=n),t.each(C,function(t,r){var i=e[t];n[t]=function(){return this[r]=w,i&&i.apply(e,arguments)},n[r]=x}),(e.defaultPrevented!==l?e.defaultPrevented:"returnValue"in e?e.returnValue===!1:e.getPreventDefault&&e.getPreventDefault())&&(n.isDefaultPrevented=w)),n}function f(t){var n,e={originalEvent:t};for(n in t)N.test(n)||t[n]===l||(e[n]=t[n]);return c(e,t)}var l,h=1,p=Array.prototype.slice,d=t.isFunction,m=function(t){return"string"==typeof t},g={},v={},y="onfocusin"in window,b={focus:"focusin",blur:"focusout"},E={mouseenter:"mouseover",mouseleave:"mouseout"};v.click=v.mousedown=v.mouseup=v.mousemove="MouseEvents",t.event={add:u,remove:a},t.proxy=function(e,r){var i=2 in arguments&&p.call(arguments,2);if(d(e)){var o=function(){return e.apply(r,i?i.concat(p.call(arguments)):arguments)};return o._zid=n(e),o}if(m(r))return i?(i.unshift(e[r],e),t.proxy.apply(null,i)):t.proxy(e[r],e);throw new TypeError("expected function")},t.fn.bind=function(t,n,e){return this.on(t,n,e)},t.fn.unbind=function(t,n){return this.off(t,n)},t.fn.one=function(t,n,e,r){return this.on(t,n,e,r,1)};var w=function(){return!0},x=function(){return!1},N=/^([A-Z]|returnValue$|layer[XY]$)/,C={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};t.fn.delegate=function(t,n,e){return this.on(n,t,e)},t.fn.undelegate=function(t,n,e){return this.off(n,t,e)},t.fn.live=function(n,e){return t(document.body).delegate(this.selector,n,e),this},t.fn.die=function(n,e){return t(document.body).undelegate(this.selector,n,e),this},t.fn.on=function(n,e,r,i,o){var s,c,h=this;return n&&!m(n)?(t.each(n,function(t,n){h.on(t,e,r,n,o)}),h):(m(e)||d(i)||i===!1||(i=r,r=e,e=l),(d(r)||r===!1)&&(i=r,r=l),i===!1&&(i=x),h.each(function(h,d){o&&(s=function(t){return a(d,t.type,i),i.apply(this,arguments)}),e&&(c=function(n){var r,o=t(n.target).closest(e,d).get(0);return o&&o!==d?(r=t.extend(f(n),{currentTarget:o,liveFired:d}),(s||i).apply(o,[r].concat(p.call(arguments,1)))):l}),u(d,n,i,r,e,c||s)}))},t.fn.off=function(n,e,r){var i=this;return n&&!m(n)?(t.each(n,function(t,n){i.off(t,e,n)}),i):(m(e)||d(r)||r===!1||(r=e,e=l),r===!1&&(r=x),i.each(function(){a(this,n,r,e)}))},t.fn.trigger=function(n,e){return n=m(n)||t.isPlainObject(n)?t.Event(n):c(n),n._args=e,this.each(function(){"dispatchEvent"in this?this.dispatchEvent(n):t(this).triggerHandler(n,e)})},t.fn.triggerHandler=function(n,r){var i,o;return this.each(function(s,u){i=f(m(n)?t.Event(n):n),i._args=r,i.target=u,t.each(e(u,n.type||n),function(t,n){return o=n.proxy(i),i.isImmediatePropagationStopped()?!1:l})}),o},"focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(n){t.fn[n]=function(t){return t?this.bind(n,t):this.trigger(n)}}),["focus","blur"].forEach(function(n){t.fn[n]=function(t){return t?this.bind(n,t):this.each(function(){try{this[n]()}catch(t){}}),this}}),t.Event=function(t,n){m(t)||(n=t,t=n.type);var e=document.createEvent(v[t]||"Events"),r=!0;if(n)for(var i in n)"bubbles"==i?r=!!n[i]:e[i]=n[i];return e.initEvent(t,r,!0),c(e)}}(Zepto),function(t){"__proto__"in{}||t.extend(t.zepto,{Z:function(n,e){return n=n||[],t.extend(n,t.fn),n.selector=e||"",n.__Z=!0,n},isZ:function(n){return"array"===t.type(n)&&"__Z"in n}});try{getComputedStyle(void 0)}catch(n){var e=getComputedStyle;window.getComputedStyle=function(t){try{return e(t)}catch(n){return null}}}}(Zepto);
