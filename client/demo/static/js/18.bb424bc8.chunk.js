(this["webpackJsonpreservierungssystem-tennis"]=this["webpackJsonpreservierungssystem-tennis"]||[]).push([[18],{264:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var r=n(2),a=n(295),s=n(296),i=n(175),c=n(124);function o(e){var t=e.apiState,n=t.success,a=t.loading,s=t.error;return a?Object(r.jsx)(c.a,{loading:!0,text:"Speichern..."}):s?Object(r.jsx)(c.a,{error:!0,text:"Konnte nicht gespeichert werden"}):n?Object(r.jsx)(c.a,{success:!0,text:"Gespeichert"}):null}function l(e){var t=e.apiState,n=void 0===t?{}:t,c=e.disableReset,l=e.onSave,u=e.onReset;return Object(r.jsxs)(a.a,{gutter:[16,16],align:"middle",children:[Object(r.jsx)(s.a,{children:Object(r.jsx)(i.a,{disabled:n.loading,onClick:l,type:"primary",htmlType:"submit",children:"Speichern"})}),Object(r.jsx)(s.a,{children:Object(r.jsx)(i.a,{disabled:n.loading||c,onClick:u,htmlType:"reset",children:"Zur\xfccksetzen"})}),Object(r.jsx)(s.a,{children:Object(r.jsx)(o,{apiState:n})})]})}},288:function(e,t,n){"use strict";var r=n(3),a=n.n(r),s=n(4),i=n.n(s),c=n(47),o=n.n(c),l=n(0),u=n(94),d=n.n(u),m=n(126),b=n.n(m),j=n(129),p=n.n(j),f=n(127),h=n.n(f),g=n(128),v=n.n(g),O=n(96),x=n.n(O),y=n(97),w=n.n(y),C=n(130),E=n.n(C),P=n(64),N=n.n(P),k=n(49),S=n(5),_=n.n(S),I=n(45);var R=n(11),M=n.n(R),z=n(13),F=n.n(z),Z=n(14),A=n.n(Z),L=n(15),T=n.n(L),q=function(e){A()(n,e);var t=T()(n);function n(){var e;return M()(this,n),(e=t.apply(this,arguments)).state={error:void 0,info:{componentStack:""}},e}return F()(n,[{key:"componentDidCatch",value:function(e,t){this.setState({error:e,info:t})}},{key:"render",value:function(){var e=this.props,t=e.message,n=e.description,r=e.children,a=this.state,s=a.error,i=a.info,c=i&&i.componentStack?i.componentStack:null,o="undefined"===typeof t?(s||"").toString():t,u="undefined"===typeof n?c:n;return s?l.createElement(G,{type:"error",message:o,description:l.createElement("pre",null,u)}):r}}]),n}(l.Component),B=n(36),V=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n},H={success:x.a,info:E.a,error:N.a,warning:w.a},D={success:b.a,info:h.a,error:v.a,warning:p.a},J=function(e){var t,n=e.description,r=e.prefixCls,s=e.message,c=e.banner,u=e.className,m=void 0===u?"":u,b=e.style,j=e.onMouseEnter,p=e.onMouseLeave,f=e.onClick,h=e.afterClose,g=e.showIcon,v=e.closable,O=e.closeText,x=V(e,["description","prefixCls","message","banner","className","style","onMouseEnter","onMouseLeave","onClick","afterClose","showIcon","closable","closeText"]),y=l.useState(!1),w=o()(y,2),C=w[0],E=w[1],P=l.useRef(),N=l.useContext(I.b),S=N.getPrefixCls,R=N.direction,M=S("alert",r),z=function(e){var t;E(!0),null===(t=x.onClose)||void 0===t||t.call(x,e)},F=!!O||v,Z=function(){var e=x.type;return void 0!==e?e:c?"warning":"info"}(),A=!(!c||void 0!==g)||g,L=_()(M,"".concat(M,"-").concat(Z),(t={},i()(t,"".concat(M,"-with-description"),!!n),i()(t,"".concat(M,"-no-icon"),!A),i()(t,"".concat(M,"-banner"),!!c),i()(t,"".concat(M,"-closable"),F),i()(t,"".concat(M,"-rtl"),"rtl"===R),t),m),T=function(e){return Object.keys(e).reduce((function(t,n){return"data-"!==n.substr(0,5)&&"aria-"!==n.substr(0,5)&&"role"!==n||"data-__"===n.substr(0,7)||(t[n]=e[n]),t}),{})}(x);return l.createElement(k.b,{visible:!C,motionName:"".concat(M,"-motion"),motionAppear:!1,motionEnter:!1,onLeaveStart:function(e){return{maxHeight:e.offsetHeight}},onLeaveEnd:h},(function(e){var t=e.className,r=e.style;return l.createElement("div",a()({ref:P,"data-show":!C,className:_()(L,t),style:a()(a()({},b),r),onMouseEnter:j,onMouseLeave:p,onClick:f,role:"alert"},T),A?function(){var e=x.icon,t=(n?D:H)[Z]||null;return e?Object(B.c)(e,l.createElement("span",{className:"".concat(M,"-icon")},e),(function(){return{className:_()("".concat(M,"-icon"),i()({},e.props.className,e.props.className))}})):l.createElement(t,{className:"".concat(M,"-icon")})}():null,l.createElement("span",{className:"".concat(M,"-message")},s),l.createElement("span",{className:"".concat(M,"-description")},n),F?l.createElement("button",{type:"button",onClick:z,className:"".concat(M,"-close-icon"),tabIndex:0},O?l.createElement("span",{className:"".concat(M,"-close-text")},O):l.createElement(d.a,null)):null)}))};J.ErrorBoundary=q;var G=t.a=J},295:function(e,t,n){"use strict";var r=n(345);t.a=r.a},296:function(e,t,n){"use strict";var r=n(306);t.a=r.a},320:function(e,t,n){"use strict";n.d(t,"a",(function(){return f}));var r=n(34),a=n(2),s=n(542),i=n(288),c=n(528),o=n(365),l=n(175),u=n(0),d=n(124),m=n(264),b=n(55),j=n(321),p=n.n(j);function f(e){var t=e.apiState,n=void 0===t?{}:t,j=e.onFinish,f=e.user,h=Object(u.useContext)(b.b).templates.systemTos,g=s.a.useForm(),v=Object(r.a)(g,1)[0],O=Object(u.useState)(!0),x=Object(r.a)(O,2),y=x[0],w=x[1],C=n.loading,E=Object(u.useRef)(null),P=Object(u.useCallback)((function(){v.resetFields(),w(!0)}),[v]);Object(u.useEffect)((function(){P()}),[P,f]),Object(u.useEffect)((function(){n.success&&P(),n.error&&(E.current=v.getFieldValue("mail"),v.validateFields())}),[v,n,P]);var N=Object(u.useCallback)((function(){y&&w(!1)}),[y]);return Object(a.jsxs)(s.a,{form:v,className:p.a.form,layout:"vertical",onFinish:j,onFieldsChange:N,children:[n.error&&Object(a.jsx)(s.a.Item,{children:Object(a.jsx)(i.a,{type:"error",message:"Registrierung fehlgeschlagen."})}),Object(a.jsx)(s.a.Item,{label:"Anzeigename",name:"name",initialValue:null===f||void 0===f?void 0:f.name,rules:[{required:!0,message:"Der Anzeigename darf nicht leer sein"},{pattern:/^[\u00c0-\u017eA-Za-z0-9.]{1}[\u00c0-\u017eA-Za-z0-9\s.]{3,18}[\u00c0-\u017eA-Za-z0-9.]{1}$/,message:"Zwischen 5 und 20 Zeichen bestehend aus: Buchstaben, Zahlen, Punkten sowie Leerzeichen (au\xdfer am Anfang / Ende)"}],children:Object(a.jsx)(c.a,{autoComplete:"name",disabled:C})}),Object(a.jsx)(s.a.Item,{name:"mail",label:"E-Mail",initialValue:null===f||void 0===f?void 0:f.mail,rules:[{type:"email",message:"Beispiel: mustermann@web.de"},{required:!0,message:"E-Mail Adresse ist erforderlich"},{required:!0,validator:function(e,t){var r;return 400===n.status&&"mail already registered"===(null===(r=n.error)||void 0===r?void 0:r.message)&&t===E.current?Promise.reject("E-Mail ist bereits registriert"):Promise.resolve()}}],children:Object(a.jsx)(c.a,{autoComplete:"email",disabled:C})}),Object(a.jsx)(s.a.Item,{label:f?"Neues Passwort":"Passwort",name:"password",rules:[{required:!0,validator:function(e,t){return(null===t||void 0===t?void 0:t.length)>0&&(null===t||void 0===t?void 0:t.length)<8||!f&&!t?Promise.reject("Mindestens 8 Zeichen erforderlich"):Promise.resolve()}}],children:Object(a.jsx)(c.a.Password,{autoComplete:"new-password",placeholder:f?"Nicht \xe4ndern":"Mind. 8 Zeichen",disabled:C})}),Object(a.jsx)(s.a.Item,{label:"Passwort best\xe4tigen",name:"password-confirm",dependencies:["password"],rules:[function(e){var t=e.getFieldValue;return{required:!0,validator:function(e,n){var r=t("password");return r===n||!r&&!n?Promise.resolve():Promise.reject("Passw\xf6rter stimmen nicht \xfcberein!")}}}],children:Object(a.jsx)(c.a.Password,{autoComplete:"new-password",placeholder:f?"Nicht \xe4ndern":"Mind. 8 Zeichen",disabled:C})}),!f&&Object(a.jsxs)(a.Fragment,{children:[Object(a.jsxs)("div",{children:[Object(a.jsx)("h1",{children:"Nutzungsbedingungen"}),Object(a.jsx)("div",{dangerouslySetInnerHTML:{__html:h.body}})]}),Object(a.jsx)(s.a.Item,{name:"tos-accept",valuePropName:"checked",rules:[{validator:function(e,t){return t?Promise.resolve():Promise.reject("Erforderlich")}}],children:Object(a.jsx)(o.a,{disabled:C,children:"Ich akzeptiere die Nutzungsbedingungen"})})]}),Object(a.jsx)(s.a.Item,{children:f?Object(a.jsx)(m.a,{apiState:n,disableReset:y,onReset:P}):Object(a.jsx)(l.a,{type:"primary",htmlType:"submit",disabled:C,children:Object(a.jsx)(d.a,{loading:C,text:C?"Registrierung...":"Registrieren"})})})]})}},321:function(e,t,n){e.exports={form:"RegisterForm_form__34nyc"}},476:function(e,t,n){e.exports={cta:"RegisterPage_cta__1Q2zL",wrapper:"RegisterPage_wrapper__1jLwT",loginItem:"RegisterPage_loginItem__3bhw_"}},537:function(e,t,n){"use strict";n.r(t),n.d(t,"RegisterPage",(function(){return j}));var r=n(34),a=n(2),s=n(28),i=n(57),c=n(0),o=n(320),l=n(48),u=n(78),d=n(476),m=n.n(d),b=n(79);function j(){var e=Object(c.useContext)(l.b).setUser,t=Object(b.a)(u.l,e),n=Object(r.a)(t,2),d=n[0],j=n[1],p=Object(s.g)(),f=Object(c.useCallback)((function(e){var t=e.name,n=e.mail,r=e.password;j(null,{name:t,mail:n,password:r},(function(){p.push("/verify-mail/send")}))}),[j,p]);return Object(a.jsxs)("div",{className:m.a.wrapper,children:[Object(a.jsxs)("h1",{children:["Registrieren",Object(a.jsxs)("div",{className:m.a.loginItem,children:[Object(a.jsx)("span",{children:"Bereits registriert? "}),Object(a.jsx)(i.b,{to:"/login",children:"Anmelden"})]})]}),Object(a.jsx)(o.a,{apiState:d,onFinish:f})]})}}}]);
//# sourceMappingURL=18.bb424bc8.chunk.js.map