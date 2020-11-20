(this["webpackJsonpreservierungssystem-tennis"]=this["webpackJsonpreservierungssystem-tennis"]||[]).push([[11],{266:function(e,t,r){"use strict";r.d(t,"a",(function(){return p}));var n=r(34),a=r(2),c=r(542),i=r(288),s=r(528),l=r(365),o=r(175),d=r(299),u=r(333),j=r(0),b=r(57),h=r(124),v=r(48),O=r(78),m=r(267),f=r.n(m),x=r(79);function p(){var e=Object(j.useContext)(v.b),t=e.autoLoginState,r=e.setUser,m=e.setRememberLogin,p=Object(x.a)(O.j,r),g=Object(n.a)(p,2),_=g[0],k=g[1],y=_.loading||t.loading,C=_.error?"error":void 0,N=Object(j.useCallback)((function(e){var t=e.mail,r=e.password,n=e.rememberLogin;m(n),k(null,{type:"plain",mail:t,password:r})}),[k,m]);return Object(a.jsxs)(c.a,{layout:"vertical",onFinish:N,children:[_.error&&Object(a.jsx)(c.a.Item,{children:Object(a.jsx)(i.a,{type:"error",message:"Login fehlgeschlagen."})}),Object(a.jsx)(c.a.Item,{name:"mail",rules:[{required:!0,message:"E-Mail Adresse ist erforderlich"}],validateStatus:C,children:Object(a.jsx)(s.a,{autoComplete:"email",prefix:Object(a.jsx)(d.a,{style:{color:"#aaa"}}),placeholder:"E-Mail",disabled:y})}),Object(a.jsx)(c.a.Item,{name:"password",rules:[{required:!0,message:"Passwort ist erforderlich"}],validateStatus:C,children:Object(a.jsx)(s.a.Password,{autoComplete:"current-password",prefix:Object(a.jsx)(u.a,{style:{color:"#aaa"}}),placeholder:"Passwort",disabled:y})}),Object(a.jsxs)(c.a.Item,{children:[Object(a.jsx)(c.a.Item,{name:"rememberLogin",valuePropName:"checked",noStyle:!0,children:Object(a.jsx)(l.a,{disabled:y,children:"Angemeldet bleiben"})}),Object(a.jsx)("a",{className:f.a.forgotLink,href:"",children:"Password vergessen"})]}),Object(a.jsx)(c.a.Item,{children:Object(a.jsx)(o.a,{type:"primary",htmlType:"submit",className:f.a.loginButton,disabled:y,children:Object(a.jsx)(h.a,{loading:y,text:y?"Anmeldung...":"Anmelden"})})}),Object(a.jsxs)(c.a.Item,{className:f.a.registerItem,children:[Object(a.jsx)("span",{children:"oder "}),Object(a.jsx)(b.b,{to:"/register",children:"Kostenlos Registrieren"})]})]})}},267:function(e,t,r){e.exports={loginButton:"LoginForm_loginButton__ECun6",forgotLink:"LoginForm_forgotLink__3TG3V",registerItem:"LoginForm_registerItem__32Qy-"}},269:function(e,t,r){"use strict";r.d(t,"a",(function(){return a})),r.d(t,"b",(function(){return c}));var n=r(275);function a(e,t,r){if(!e)return null;var a,c=Object(n.a)(e);try{for(c.s();!(a=c.n()).done;){var i=a.value;if(t.isSame(i.date,"hour")&&r===i.courtId)return i}}catch(s){c.e(s)}finally{c.f()}return null}function c(e){for(var t={},r=("?"===e[0]?e.substr(1):e).split("&"),n=0;n<r.length;n++){var a=r[n].split("=");t[decodeURIComponent(a[0])]=decodeURIComponent(a[1]||"")}return t}},274:function(e,t,r){"use strict";r.d(t,"a",(function(){return O}));var n=r(80),a=r(2),c=r(255),i=r(368),s=r(369),l=r(259),o=r(370),d=r(0),u=r(37),j=r.n(u),b=r(282),h=r.n(b),v="dd[\xa0]L";function O(e){var t=e.courtName,r=e.date,u=e.groupDates,b=e.name,O=e.repeat,m=e.showAllDates,f=void 0!==m&&m,x=e.showDateRange,p=void 0!==x&&x,g=e.showFollowUpDate,_=void 0!==g&&g,k=r.format(v);p&&u&&(k=u.length?u[0].format(v):"-",u.length>1&&(k+=" bis ".concat(u[u.length-1].format(v))));var y=Object(d.useMemo)((function(){var e=j()();return null===u||void 0===u?void 0:u.reduce((function(t,r){return r.isBefore(e,"day")?t+1:t}),0)}),[u]),C=Object(d.useMemo)((function(){var e=j()();return null===u||void 0===u?void 0:u.filter((function(t){return!t.isBefore(e,"day")}))}),[u]),N=Object(d.useMemo)((function(){var e=Object(n.a)(u);return e.sort((function(e,t){return e-t})),null===e||void 0===e?void 0:e.find((function(e){return e.isAfter(r,"day")}))}),[u,r]);return Object(a.jsxs)("div",{className:h.a.wrapper,children:[Object(a.jsxs)("div",{className:h.a.item,children:[Object(a.jsx)("div",{children:Object(a.jsx)(c.a,{})}),Object(a.jsx)("div",{children:k})]}),Object(a.jsxs)("div",{className:h.a.item,children:[Object(a.jsx)("div",{children:Object(a.jsx)(i.a,{})}),Object(a.jsx)("div",{children:"".concat(r.format("H")," bis ").concat(r.add(1,"h").format("H")," Uhr")})]}),Object(a.jsxs)("div",{className:h.a.item,children:[Object(a.jsx)("div",{children:Object(a.jsx)(s.a,{})}),Object(a.jsx)("div",{children:t})]}),b&&Object(a.jsxs)("div",{className:h.a.item,children:[Object(a.jsx)("div",{children:Object(a.jsx)(l.a,{})}),Object(a.jsx)("div",{children:b})]}),O&&Object(a.jsxs)("div",{className:h.a.item,children:[Object(a.jsx)("div",{children:Object(a.jsx)(o.a,{})}),Object(a.jsx)("div",{children:O})]}),f&&(null===u||void 0===u?void 0:u.length)&&Object(a.jsxs)("div",{className:h.a.item,children:[Object(a.jsx)("div",{children:Object(a.jsx)(o.a,{})}),Object(a.jsxs)("div",{className:h.a.allDates,children:[Object(a.jsx)("span",{children:"Wiederkehrender Termin"}),Object(a.jsxs)("div",{className:h.a.dateList,children:[1===y&&Object(a.jsx)("span",{children:"Ein vergangener Termin"}),y>1&&Object(a.jsxs)("span",{children:[y," vergangene Termine"]}),null===C||void 0===C?void 0:C.map((function(e){return Object(a.jsx)("span",{children:e.format(v)},e)}))]})]})]}),_&&N&&Object(a.jsxs)("div",{className:h.a.item,children:[Object(a.jsx)("div",{children:Object(a.jsx)(o.a,{})}),Object(a.jsxs)("div",{className:h.a.allDates,children:[Object(a.jsx)("span",{children:"Folgetermin"}),Object(a.jsx)("div",{className:h.a.dateList,children:Object(a.jsx)("span",{children:N.format(v)})})]})]})]})}},281:function(e,t,r){e.exports={wrapper:"GroupDatesForm_wrapper__1y-OM",repeatTypes:"GroupDatesForm_repeatTypes__1Gm6y",dates:"GroupDatesForm_dates__3x0zy",extra:"GroupDatesForm_extra__1E_ct",danger:"GroupDatesForm_danger__3ndEw",date:"GroupDatesForm_date__2ixOV",unchecked:"GroupDatesForm_unchecked__uXvUe",buttons:"GroupDatesForm_buttons__2ffBH"}},282:function(e,t,r){e.exports={wrapper:"ReservationDetails_wrapper__3oaB0",item:"ReservationDetails_item__3c9da",allDates:"ReservationDetails_allDates__19arH",dateList:"ReservationDetails_dateList__2q866"}},283:function(e,t,r){e.exports={wrapper:"ReservationModalInner_wrapper__3v8b-",nameInput:"ReservationModalInner_nameInput__1X-ne",footer:"ReservationModalInner_footer__3lctT",heading:"ReservationModalInner_heading__-GhuQ",changeReasonHint:"ReservationModalInner_changeReasonHint__2rx3T"}},284:function(e,t,r){e.exports={buttons:"VerifyMailModal_buttons__2ZzQz"}},285:function(e,t,r){"use strict";r.d(t,"a",(function(){return s}));var n=r(34),a=r(0),c=r(37),i=r.n(c);function s(e){var t=Object(a.useState)((function(){return i()()})),r=Object(n.a)(t,2),c=r[0],s=r[1];return Object(a.useEffect)((function(){var t=setInterval((function(){var t=i()();c.isSame(t,e)||s(t)}),6e4);return function(){return clearInterval(t)}}),[c,e]),c}},287:function(e,t,r){"use strict";r.d(t,"a",(function(){return z}));var n=r(18),a=r(2),c=r(0),i=r(266),s=r(544);function l(e){var t=e.onClose;return Object(a.jsx)(s.a,{title:"Anmeldung erforderlich",visible:!0,width:400,centered:!0,onCancel:t,onOk:t,footer:null,children:Object(a.jsx)(i.a,{})})}var o=r(34),d=r(174),u=r(175),j=r(528),b=r(365),h=r(78),v=r(125),O=r(552),m=r(80),f=r(286),x=r(366),p=r(367),g=r(55),_=r(48),k=r(95),y=r.n(k),C=r(281),N=r.n(C),I=y.a.bind(N.a),S={1:"T\xe4glich",7:"W\xf6chentlich",14:"2-W\xf6chentlich"};function w(e){var t=e.courtId,r=e.currentGroupDates,n=e.date,i=e.defaultAddCount,s=void 0===i?2:i,l=e.disabled,d=void 0!==l&&l,j=e.onGroupDatesChange,h=e.repeatValuesMap,v=void 0===h?S:h,O=e.today,k=e.unavailableDates,y=Object(c.useContext)(_.b).user,C=Object(c.useContext)(g.b),w=C.courts,T=C.config.reservationDaysInAdvance,D=Object(c.useState)(0),R=Object(o.a)(D,2),A=R[0],M=R[1],F=Object(c.useState)([]),E=Object(o.a)(F,2),L=E[0],B=E[1],H=Object(c.useState)([]),G=Object(o.a)(H,2),z=G[0],P=G[1],W=Object(c.useMemo)((function(){var e;return null===(e=w.find((function(e){return e.courtId===t})))||void 0===e?void 0:e.disabledFromTil}),[w,t]),q=Object(c.useCallback)((function(e){return e.isAfter(O.add(T,"day"),"day")}),[O,T]),K=Object(c.useCallback)((function(e){return W&&e.isBetween(W[0],W[1],"day","[]")||k&&k.some((function(t){return e.isSame(t,"day")}))}),[W,k]),U=Object(c.useMemo)((function(){return L.map((function(e){return{date:e,checked:-1!==z.findIndex((function(t){return t.isSame(e,"day")})),reserved:-1!==(null===r||void 0===r?void 0:r.findIndex((function(t){return t.isSame(e,"day")}))),past:e.isBefore(O,"day"),notAvailable:K(e),tooFarAhead:q(e)}}))}),[K,z,r,L,O,q]),Q=Object(c.useCallback)((function(e){P((function(t){var r=e;return"function"===typeof e&&(r=e(t)),r.filter((function(e){return!K(e)}))}))}),[K]);Object(c.useEffect)((function(){j(z)}),[z,j]),Object(c.useEffect)((function(){return Q((function(e){return e}))}),[Q]),Object(c.useEffect)((function(){var e=[n],t=[n];if((null===r||void 0===r?void 0:r.length)>1){(e=Object(m.a)(r)).sort((function(e,t){return e.valueOf()-t.valueOf()}));var a=Number.MAX_SAFE_INTEGER;if(e.length>1)for(var c=1;c<e.length;++c){var i=e[c-1].diff(e[c],"day");a=Math.min(a,Math.abs(i))}a=a.toString();var s=Object.keys(v);s.includes(a)||(a=s[0]),M(a);var l=e[0],o=e[e.length-1],d=Math.abs(l.diff(o,"day")/a);t=[];for(var u=0;u<=d;++u)t.push(l.add(u*a,"day"))}B(t),P(e)}),[r,n,v]);var Z=Object(c.useCallback)((function(){B((function(e){var t=e[e.length-1].add(A,"day");return q(t)||Q((function(e){return[].concat(Object(m.a)(e),[t])})),[].concat(Object(m.a)(e),[t])}))}),[A,Q,q]),V=Object(c.useCallback)((function(){B((function(e){var t=e[e.length-1],n=-1!==(null===r||void 0===r?void 0:r.findIndex((function(e){return e.isSame(t,"day")})));return e.length<=1||n?e:(Q((function(e){return e.filter((function(e){return!e.isSame(t,"day")}))})),e.slice(0,-1))}))}),[r,Q]),J=Object(c.useCallback)((function(e){var t=e.target.value;M(t);var r=[n];if(t>0)for(var a=1;a<=s;++a)r.push(n.add(a*t,"day"));B(r),Q(r.filter((function(e){return!q(e)})))}),[n,s,Q,q]),X=Object(c.useCallback)((function(e){var t=e.target.value,r=e.target.checked,n=L[t];Q((function(e){var t=e.filter((function(e){return!e.isSame(n,"day")}));return r&&t.push(n),t.sort((function(e,t){return e.valueOf()-t.valueOf()})),t}))}),[L,Q]);return Object(a.jsxs)("div",{className:N.a.wrapper,children:[Object(a.jsx)("div",{children:Object(a.jsxs)(f.a.Group,{className:N.a.repeatTypes,value:A,onChange:J,disabled:(null===r||void 0===r?void 0:r.length)>1||d,buttonStyle:"solid",size:"small",children:[Object(a.jsx)(f.a.Button,{value:0,children:"Einzeltermin"},0),Object.keys(v).map((function(e){return Object(a.jsx)(f.a.Button,{value:e,children:v[e]},e)}))]})}),A>0&&Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)("div",{className:N.a.dates,children:U.map((function(e,t){var r=e.date,n=e.checked,c=e.reserved,i=e.past,s=e.notAvailable,l=e.tooFarAhead;return Object(a.jsxs)(b.a,{className:I({unchecked:!n,danger:c&&!n||s}),value:t,disabled:!(null===y||void 0===y?void 0:y.admin)&&(i||l)||s||d,checked:n,onChange:X,children:[Object(a.jsx)("span",{className:N.a.date,children:r.format("dd L")}),!i&&c&&n&&Object(a.jsx)("span",{className:N.a.extra,children:" Aktuell reserviert"}),!i&&c&&!n&&Object(a.jsx)("span",{className:N.a.extra,children:" Wird storniert"}),!s&&i&&Object(a.jsx)("span",{className:N.a.extra,children:" Bereits vergangen"}),!s&&l&&Object(a.jsx)("span",{className:N.a.extra,children:" Zu weit in der Zukunft"}),s&&Object(a.jsx)("span",{className:N.a.extra,children:" Nicht verf\xfcgbar"})]},r)}))}),Object(a.jsxs)("div",{className:N.a.buttons,children:[Object(a.jsx)(u.a,{disabled:d,icon:Object(a.jsx)(x.a,{}),onClick:Z}),Object(a.jsx)(u.a,{disabled:d,icon:Object(a.jsx)(p.a,{}),onClick:V})]})]})]})}var T=r(274),D=r(124),R=r(283),A=r.n(R),M=r(79);function F(e){var t,r,n,i=e.date,l=e.courtId,m=e.reservation,f=e.today,x=e.onFinish,p=e.setReservations,k=Object(c.useContext)(g.b),y=k.courts,C=k.templates,N=C.reservationPrice,I=C.reservationTos,S=Object(c.useContext)(_.b).user,R=null===(t=y.find((function(e){return e.courtId===l})))||void 0===t?void 0:t.name,F=Object(c.useState)(""),E=Object(o.a)(F,2),L=E[0],B=E[1],H=Object(c.useState)(!1),G=Object(o.a)(H,2),z=G[0],P=G[1],W=Object(c.useState)(null),q=Object(o.a)(W,2),K=q[0],U=q[1],Q=Object(c.useState)(null),Z=Object(o.a)(Q,2),V=Z[0],J=Z[1],X=Object(c.useState)(!1),Y=Object(o.a)(X,2),$=Y[0],ee=Y[1],te=Object(c.useRef)({}),re=Object(c.useState)([]),ne=Object(o.a)(re,2),ae=ne[0],ce=ne[1],ie=Object(M.a)(h.e,ce),se=Object(o.a)(ie,2),le=se[0],oe=se[1],de=Object(M.a)(h.m,p),ue=Object(o.a)(de,2),je=ue[0],be=ue[1],he=Object(M.a)(h.a,p),ve=Object(o.a)(he,2),Oe=ve[0],me=ve[1],fe=Object(M.a)(h.h,p),xe=Object(o.a)(fe,2),pe=xe[0],ge=xe[1],_e=le.loading||je.loading||pe.loading||Oe.loading,ke=m&&S.admin&&(null===m||void 0===m?void 0:m.userId)!==S.userId,ye=S.admin||!m||m.userId===S.userId,Ce=Object(c.useMemo)((function(){return ae.map((function(e){return e.date}))}),[ae]),Ne=Object(c.useMemo)((function(){return null===V||void 0===V?void 0:V.filter((function(e){return!Ce.some((function(t){return t.isSame(e,"hour")}))}))}),[V,Ce]),Ie=Object(c.useMemo)((function(){return V&&Ce.filter((function(e){return!V.some((function(t){return e.isSame(t,"hour")}))}))}),[V,Ce]),Se=!(!Ce||!K);Object(c.useEffect)((function(){(null===m||void 0===m?void 0:m.groupId)&&oe({query:{"group-id":null===m||void 0===m?void 0:m.groupId}})}),[m,oe]);var we=Object(c.useCallback)((function(e){J(e)}),[]),Te=Object(c.useCallback)((function(e){P(e.target.checked)}),[]),De=Object(c.useCallback)((function(){ee(!0)}),[]),Re=Object(c.useCallback)((function(){ee(!1),U(null)}),[]),Ae=Object(c.useCallback)((function(e){U(e.target.value)}),[]),Me=Object(c.useCallback)((function(e){B(e.target.value)}),[]),Fe=Object(c.useCallback)((function(){be(null,{courtId:l,dates:Ne,userId:S.userId,customName:K},(function(){d.b.success("Reservierung erfolgreich"),x()}))}),[l,K,Ne,x,be,S]),Ee=Object(c.useCallback)((function(){s.a.confirm({title:"Wirklich speichern?",icon:Object(a.jsx)(O.a,{}),centered:!0,content:Object(a.jsxs)("div",{className:A.a.wrapper,children:[Ne.length>0&&Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)("div",{className:A.a.heading,children:"Neue Termine"}),Object(a.jsx)("ul",{children:Ne.map((function(e){return Object(a.jsx)("li",{children:e.format("dd L")},e)}))})]}),Ie.length>0&&Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)("div",{className:A.a.heading,children:"Zu Stornieren"}),Object(a.jsx)("ul",{children:Ie.map((function(e){return Object(a.jsx)("li",{children:e.format("dd L")},e)}))})]}),Se&&Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)("div",{className:A.a.heading,children:"\xc4nderungen"}),Object(a.jsx)("ul",{children:Object(a.jsxs)("li",{children:["Name: ",Object(a.jsx)("strong",{children:K})]})})]})]}),okText:"Best\xe4tigen",okType:"danger",cancelText:"Abbrechen",onOk:function(){ge({path:{groupId:m.groupId}},{groupId:m.groupId,dates:V,customName:K,reason:ke?L:void 0},(function(){d.b.success("Speichern erfolgreich"),x()}))}})}),[ke,Ie,Se,L,K,Ne,V,x,ge,m]),Le=Object(c.useCallback)((function(){var e=function(){var e={path:{groupId:m.groupId}},t=function(){d.b.success("Stornierung erfolgreich"),x()};ke?ge(e,{groupId:m.groupId,dates:[],reason:L},t):me(e,null,t)};Ce.length<=1?e():s.a.confirm({title:"Wirklich alle stornieren?",icon:Object(a.jsx)(O.a,{}),centered:!0,content:Object(a.jsx)("ul",{children:Ce.map((function(e){return Object(a.jsx)("li",{children:e.format("dd L")},e)}))}),okText:"Best\xe4tigen",okType:"danger",cancelText:"Abbrechen",onOk:e})}),[ke,L,me,Ce,x,ge,m]);return Object(c.useEffect)((function(){var e,t,r,n;if(te.current.post!==je.error||te.current.patch!==pe.error){te.current.post=je.error,te.current.patch=pe.error;var c=(null===(e=je.error)||void 0===e?void 0:e.unavailableDates)||(null===(t=pe.error)||void 0===t?void 0:t.unavailableDates),i=(null===(r=je.error)||void 0===r?void 0:r.message)||(null===(n=pe.error)||void 0===n?void 0:n.message);if(c)s.a.error({centered:!0,title:"Reservierung fehlgeschlagen",content:Object(a.jsxs)("div",{children:[Object(a.jsx)("div",{children:"Folgende Termine sind nicht verf\xfcgbar:"}),Object(a.jsx)("ul",{children:c.map((function(e){return Object(a.jsx)("li",{children:e.format("dd L")},e)}))})]})});else if("too many active reservations"===i){var l,o,d,u,j=(null===(l=je.error)||void 0===l?void 0:l.value)||(null===(o=pe.error)||void 0===o?void 0:o.value),b=(null===(d=je.error)||void 0===d?void 0:d.max)||(null===(u=pe.error)||void 0===u?void 0:u.max),h=Math.abs(j-b);s.a.error({centered:!0,title:"Reservierungslimit erreicht",content:Object(a.jsxs)("div",{children:[(null===V||void 0===V?void 0:V.length)>h?Object(a.jsxs)("p",{children:["Bitte entfernen Sie mindestens ",Object(a.jsx)("strong",{children:h})," Termine."]}):Object(a.jsx)("p",{children:"Sie k\xf6nnen aktuell keine weiteren Termine reservieren."}),Object(a.jsxs)("p",{children:["Es k\xf6nnen maximal ",b," Reservierungen im voraus get\xe4tigt werden. Bereits vergangene Termine werden dabei nicht angerechnet."]})]})})}}}),[null===V||void 0===V?void 0:V.length,je.error,pe.error]),le.error||je.error&&!je.error.unavailableDates&&"too many active reservations"!==je.error.message||pe.error&&!pe.error.unavailableDates&&"too many active reservations"!==pe.error.message||Oe.error?Object(a.jsx)(s.a,{title:"Reservierung",visible:!0,width:600,centered:!0,onCancel:x,onOk:x,footer:Object(a.jsx)("div",{className:A.a.footer,children:Object(a.jsx)(u.a,{onClick:x,children:"Abbrechen"})}),children:Object(a.jsx)("div",{className:A.a.wrapper,children:Object(a.jsx)(v.a,{})})}):Object(a.jsx)(s.a,{title:"Reservierung",visible:!0,width:600,centered:!0,onCancel:x,onOk:x,footer:_e?Object(a.jsx)(D.a,{loading:!0,text:"Bitte warten..."}):Object(a.jsxs)("div",{className:A.a.footer,children:[Object(a.jsx)(u.a,{onClick:x,children:ye?"Abbrechen":"Schlie\xdfen"}),ye&&(m?Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(u.a,{type:"danger",onClick:Le,disabled:ke&&!L,children:Ce.length>1?"Alle stornieren":"Stornieren"}),Object(a.jsx)(u.a,{type:"primary",onClick:Ee,disabled:!((null===Ne||void 0===Ne?void 0:Ne.length)||(null===Ie||void 0===Ie?void 0:Ie.length)||Se)||ke&&!L,children:"Speichern"})]}):Object(a.jsx)(u.a,{disabled:I.body&&!z||!(null===Ne||void 0===Ne?void 0:Ne.length),type:"primary",onClick:Fe,children:"Reservieren"}))]}),children:Object(a.jsxs)("div",{className:A.a.wrapper,children:[Object(a.jsx)("div",{children:Object(a.jsx)(T.a,{courtName:R,date:i,groupDates:V||Ce,name:$?Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(j.a,{className:A.a.nameInput,disabled:_e,onChange:Ae,placeholder:"z.B. Training, ...",size:"small",value:K}),Object(a.jsx)(u.a,{disabled:_e,onClick:Re,size:"small",type:"link",children:"abbrechen"})]}):Object(a.jsxs)(a.Fragment,{children:[(null===m||void 0===m?void 0:m.customName)||(null===m||void 0===m?void 0:m.name)||S.name,S.admin&&Object(a.jsx)(u.a,{disabled:_e,onClick:De,size:"small",type:"link",children:"\xe4ndern"})]}),showAllDates:!ye,showDateRange:ye,repeat:ye&&Object(a.jsx)(w,{courtId:l,currentGroupDates:Ce,date:i,disabled:_e,onGroupDatesChange:we,today:f,unavailableDates:(null===(r=je.error)||void 0===r?void 0:r.unavailableDates)||(null===(n=pe.error)||void 0===n?void 0:n.unavailableDates)})})}),!m&&Object(a.jsxs)(a.Fragment,{children:[N.body&&Object(a.jsxs)("div",{children:[Object(a.jsx)("h1",{children:"Preis"}),Object(a.jsx)("div",{dangerouslySetInnerHTML:{__html:N.body}})]}),I.body&&Object(a.jsxs)("div",{children:[Object(a.jsx)("h1",{children:"Nutzungsordnung"}),Object(a.jsx)("div",{dangerouslySetInnerHTML:{__html:I.body}}),Object(a.jsx)(b.a,{checked:z,onChange:Te,disabled:_e,children:"Ich akzeptiere die Nutzungsordnung."})]})]}),ke&&Object(a.jsxs)("div",{className:A.a.changeReason,children:[Object(a.jsx)(j.a.TextArea,{autoSize:!0,disabled:_e,onChange:Me,placeholder:"Grund der \xc4nderung",required:!0,value:L}),Object(a.jsx)("div",{className:A.a.changeReasonHint,children:"*Erforderlich. Der Inhaber der Reservierung wird \xfcber die \xc4nderungen sowie dessen Grund per E-Mail informiert."})]})]})})}var E=r(247),L=r(284),B=r.n(L),H=r(28);function G(e){var t=e.onClose,r=Object(c.useContext)(_.b).user,n=Object(H.g)(),i=Object(c.useCallback)((function(){n.push("/profile")}),[n]),l=Object(c.useCallback)((function(){n.push("/verify-mail/send")}),[n]);return Object(a.jsx)(s.a,{title:"E-Mail nicht verifiziert",visible:!0,centered:!0,width:580,onCancel:t,onOk:t,footer:null,children:Object(a.jsx)(E.a,{status:"warning",title:"Bitte best\xe4tigen Sie Ihre E-Mail Adresse",extra:Object(a.jsxs)("div",{children:[Object(a.jsxs)("div",{children:["Klicken Sie auf den Best\xe4tigungslink, den Sie bei Ihrer Registrierung an ",Object(a.jsx)("strong",{children:null===r||void 0===r?void 0:r.mail})," erhalten haben."]}),Object(a.jsxs)("div",{className:B.a.buttons,children:[Object(a.jsx)(u.a,{type:"primary",onClick:l,children:"Best\xe4tigungslink erneut senden"}),Object(a.jsx)(u.a,{type:"link",onClick:i,children:"E-Mail Adresse \xe4ndern"})]})]})})})}function z(e){var t=Object(c.useContext)(_.b).user,r=e.onFinish;return t?t.verified?Object(a.jsx)(F,Object(n.a)({},e)):Object(a.jsx)(G,{onClose:r}):Object(a.jsx)(l,{onClose:r})}},300:function(e,t,r){e.exports={cell:"SlotCell_cell__10BAl",enabled:"SlotCell_enabled__3WkTf",slot:"SlotCell_slot__2KRoY",reserved:"SlotCell_reserved__1oREX",disabled:"SlotCell_disabled__24bPq",disabledText:"SlotCell_disabledText__34Sit",loading:"SlotCell_loading__19J7J",load:"SlotCell_load__YLQlz"}},301:function(e,t,r){e.exports={wrapper:"DayTable_wrapper__1Hl5M",date:"DayTable_date__3HnYm",today:"DayTable_today__3s1dj",court:"DayTable_court__3mDRl"}},302:function(e,t,r){e.exports={hoursTableWrapper:"HoursTable_hoursTableWrapper__2oqN9",hoursTable:"HoursTable_hoursTable__1GyQk",hour:"HoursTable_hour__2iAsO",til:"HoursTable_til__27vFO",highlight:"HoursTable_highlight__16BlN"}},316:function(e,t,r){e.exports={tableWrapper:"ReservationCalendar_tableWrapper__Zzm8d",tableScroller:"ReservationCalendar_tableScroller__1fVFR"}},331:function(e,t,r){"use strict";r.d(t,"a",(function(){return T}));var n=r(34),a=r(2),c=r(0),i=r(95),s=r.n(i),l=r(300),o=r.n(l),d=s.a.bind(o.a);function u(e){var t,r=e.courtId,n=e.courtName,i=e.disabled,s=void 0!==i&&i,l=e.disabledText,o=e.hour,u=e.loading,j=void 0!==u&&u,b=e.onClick,h=e.reservation,v=Object(c.useCallback)((function(){s||b({courtId:r,hour:o,reservation:h})}),[r,s,o,b,h]);return Object(a.jsx)("td",{className:d({cell:!0,enabled:!s}),onClick:v,children:Object(a.jsxs)("div",{className:d({slot:!0,loading:j,reserved:h,disabled:s,disabledText:l}),"data-free-text":"Frei","data-free-text-hover":"".concat(o," Uhr, ").concat(n),children:[!(s&&l)&&h&&(null!==(t=h.customName)&&void 0!==t?t:h.name),s&&l]})})}var j=r(48),b=r(269),h=r(301),v=r.n(h);function O(e){var t=e.courts,r=e.date,n=e.hours,i=e.loading,s=e.onSlotClick,l=e.reservationDaysInAdvance,o=e.reservations,d=e.today,h=Object(c.useContext)(j.b).user,O=Object(c.useMemo)((function(){return d.isSame(r,"day")}),[r,d]),m=Object(c.useMemo)((function(){return r.isBefore(d,"day")}),[r,d]),f=Object(c.useMemo)((function(){return r.isAfter(d.add(l,"day"),"day")}),[r,l,d]),x=Object(c.useMemo)((function(){return t.map((function(e){var t=e.courtId,n=e.name,a=e.disabled,c=e.disabledFromTil,i=a&&r.isBetween(c[0],c[1],"day","[]");return{courtId:t,name:n,disabled:i||!(null===h||void 0===h?void 0:h.admin)&&(m||f),disabledText:i?"Gesperrt":null}}))}),[null===h||void 0===h?void 0:h.admin,t,r,m,f]),p=Object(c.useCallback)((function(e){var t=e.courtId,n=e.hour,a=e.reservation;s({courtId:t,date:r.hour(n),reservation:a})}),[r,s]);return Object(a.jsx)("div",{className:v.a.wrapper,children:Object(a.jsxs)("table",{children:[Object(a.jsxs)("thead",{children:[Object(a.jsx)("tr",{children:Object(a.jsxs)("th",{className:v.a.date,colSpan:x.length,children:[O&&Object(a.jsx)("span",{className:v.a.today,children:"Heute"}),r.format("dd l")]})}),Object(a.jsx)("tr",{children:x.map((function(e){var t=e.courtId,r=e.name;return Object(a.jsx)("td",{children:Object(a.jsx)("div",{className:v.a.court,children:r})},t)}))})]}),Object(a.jsx)("tbody",{children:n.map((function(e){return Object(a.jsx)("tr",{children:x.map((function(t){var n=t.courtId,c=t.name,s=t.disabled,l=t.disabledText;return Object(a.jsx)(u,{courtId:n,courtName:c,disabled:s,disabledText:l,hour:e,loading:i,onClick:p,reservation:Object(b.a)(o,r.hour(e),n)},n)}))},e)}))})]})})}var m=r(125),f=r(302),x=r.n(f),p=s.a.bind(x.a);function g(e){var t=e.hours,r=e.highlightHour;return Object(a.jsx)("div",{className:x.a.hoursTableWrapper,children:Object(a.jsx)("table",{className:x.a.hoursTable,children:Object(a.jsx)("tbody",{children:t.map((function(e){return Object(a.jsx)("tr",{className:p({highlight:r===e}),children:Object(a.jsx)("th",{children:Object(a.jsxs)("div",{className:x.a.hour,children:[e," Uhr",Object(a.jsx)("br",{}),Object(a.jsxs)("span",{className:x.a.til,children:["bis ",e+1," Uhr"]})]})})},e)}))})})})}var _=r(287),k=r(133),y=r(55),C=r(78),N=r(316),I=r.n(N),S=r(79),w=r(135);function T(e){var t=e.highlightHour,r=e.kiosk,i=void 0!==r&&r,s=e.selectedDate,l=e.today,o=Object(c.useContext)(y.b),d=o.courts,u=o.config,j=u.visibleHours,b=u.reservationDaysInAdvance,h=Object(c.useState)(),v=Object(n.a)(h,2),f=v[0],x=v[1],p=Object(c.useRef)(!1),N=Object(c.useRef)(),T=Object(c.useState)(null),D=Object(n.a)(T,2),R=D[0],A=D[1],M=Object(S.a)(C.e,A),F=Object(n.a)(M,2),E=F[0],L=F[1],B=Object(c.useCallback)((function(){return L({query:{start:s.startOf("week").toISOString(),end:s.endOf("week").toISOString()}})}),[s,L]);Object(w.a)(B,k.a.RESERVATIONS),Object(c.useEffect)((function(){A(null),B()}),[B]);var H=Object(c.useMemo)((function(){for(var e=[],t=parseInt(j[0]);t<parseInt(j[1]);++t)e.push(t);return e}),[j]),G=Object(c.useMemo)((function(){return Array.from(Array(7)).map((function(e,t){return s.startOf("week").add(t,"day")}))}),[s]);Object(c.useEffect)((function(){if(!p.current&&N.current&&s.isSame(l,"week")){p.current=!0;var e=Math.abs(l.startOf("week").diff(l,"day"));requestAnimationFrame((function(){N.current.scrollLeft=N.current.scrollWidth/7*e}))}}),[s,l,R]);var z=Object(c.useCallback)((function(e){i||x(e)}),[i]),P=Object(c.useCallback)((function(){x(null)}),[]);return E.error?Object(a.jsx)("div",{className:I.a.tableWrapper,children:Object(a.jsx)(m.a,{})}):Object(a.jsxs)(a.Fragment,{children:[Object(a.jsxs)("div",{className:I.a.tableWrapper,children:[Object(a.jsx)(g,{hours:H,highlightHour:t}),Object(a.jsx)("div",{className:I.a.tableScroller,ref:N,children:G.map((function(e){return Object(a.jsx)(O,{courts:d,date:e,hours:H,loading:!R,onSlotClick:z,reservationDaysInAdvance:b,reservations:R,today:l},e)}))})]}),f&&Object(a.jsx)(_.a,{date:null===f||void 0===f?void 0:f.date,courtId:null===f||void 0===f?void 0:f.courtId,reservation:null===f||void 0===f?void 0:f.reservation,today:l,onFinish:P,setReservations:A})]})}},373:function(e,t,r){e.exports={wrapper:"DateClock_wrapper__2wdCe",time:"DateClock_time__1UaS1",date:"DateClock_date__2fu_M",clockDots:"DateClock_clockDots__1qZO2",blink:"DateClock_blink__dDypK"}},448:function(e,t,r){e.exports={wrapper:"SystemLinkQr_wrapper__2CJMn",qr:"SystemLinkQr_qr__ASBOr",plain:"SystemLinkQr_plain__1yRC6"}},449:function(e,t,r){e.exports={wrapper:"KioskPage_wrapper__2lwpn",top:"KioskPage_top__1rY1B",title:"KioskPage_title__uTtKZ",linkQr:"KioskPage_linkQr__6q4Tf",orgName:"KioskPage_orgName__26BvU",subTitle:"KioskPage_subTitle__1tHUZ",alert:"KioskPage_alert__1zypA"}},547:function(e,t,r){"use strict";r.r(t),r.d(t,"KioskPage",(function(){return C}));var n=r(2),a=r(0),c=r(133),i=r(288),s=r(34),l=r(37),o=r.n(l),d=r(373),u=r.n(d);function j(){var e=Object(a.useState)((function(){return o()()})),t=Object(s.a)(e,2),r=t[0],c=t[1];return Object(a.useEffect)((function(){var e=setInterval((function(){c(o()())}),5e3);return function(){return clearInterval(e)}}),[]),Object(n.jsxs)("div",{className:u.a.wrapper,children:[Object(n.jsxs)("div",{className:u.a.time,children:[r.format("HH"),Object(n.jsx)("span",{className:u.a.clockDots,children:":"}),r.format("mm")," Uhr"]}),Object(n.jsx)("div",{className:u.a.date,children:r.format("dddd LL")})]})}var b=r(331),h=r(442),v=r.n(h),O=r(55),m=r(448),f=r.n(m);function x(e){var t=e.bgColor,r=Object(a.useContext)(O.b).config.url;return Object(n.jsxs)("div",{className:f.a.wrapper,children:[Object(n.jsx)("div",{className:f.a.qr,children:Object(n.jsx)(v.a,{value:r,size:150,bgColor:t})}),Object(n.jsx)("div",{className:f.a.plain,children:r.replace(/(http|https):\/\//,"")})]})}var p=r(269),g=r(449),_=r.n(g),k=r(28),y=r(285);function C(){var e=Object(a.useContext)(O.b),t=e.config,r=t.announcement,s=t.orgName,l=e.courts,o=Object(y.a)("hour"),d=Object(k.h)().search;return Object(a.useEffect)((function(){var e=Object(p.b)(d),t=60;try{e.update&&(t=parseInt(e.update))}catch(r){console.error(r)}return c.a.RESERVATIONS=t,c.a.BASE_DATA=10*t,c.b}),[d]),Object(n.jsxs)("div",{className:_.a.wrapper,children:[Object(n.jsxs)("div",{className:_.a.top,children:[Object(n.jsxs)("div",{className:_.a.title,children:[Object(n.jsx)("div",{className:_.a.orgName,children:s}),Object(n.jsx)("div",{className:_.a.subTitle,children:"Reservierungssystem"})]}),Object(n.jsx)(j,{}),Object(n.jsx)("div",{className:_.a.linkQr,children:Object(n.jsx)(x,{bgColor:"#f0f2f5"})})]}),r&&Object(n.jsx)("div",{className:_.a.alert,children:Object(n.jsx)(i.a,{message:r,type:"info",showIcon:!0})}),l.map((function(e){var t=e.courtId,r=e.name,a=e.disabled,c=e.disabledFromTil,s=e.disabledReason;return a&&Object(n.jsx)("div",{className:_.a.alert,children:Object(n.jsx)(i.a,{message:"".concat(r," ist gesperrt ab ").concat(c[0].format("dd L")).concat(c[1]?c[1].format("[ bis] dd L"):"").concat(s?": ".concat(s):""),type:"warning",showIcon:!0})},t)})),Object(n.jsx)(b.a,{highlightHour:o.hour(),kiosk:!0,selectedDate:o,today:o})]})}}}]);
//# sourceMappingURL=11.d93281ed.chunk.js.map