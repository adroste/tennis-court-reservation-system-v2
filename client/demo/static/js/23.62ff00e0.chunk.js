(this["webpackJsonpreservierungssystem-tennis"]=this["webpackJsonpreservierungssystem-tennis"]||[]).push([[23],{509:function(e,t,n){e.exports={wrapper:"UserManagementPage_wrapper__LewMU",spacer:"UserManagementPage_spacer__3pBNT"}},539:function(e,t,n){"use strict";n.r(t),n.d(t,"UserManagementPage",(function(){return p}));var i=n(18),r=n(34),a=n(2),c=n(82),s=n(175),d=n(544),o=n(248),u=n(540),l=n(529),j=n(552),b=n(299),m=n(371),h=n(0),O=n(78),f=n(125),x=n(48),v=n(509),g=n.n(v),k=n(79);function p(){var e=Object(h.useContext)(x.b).user.userId,t=Object(h.useState)([]),n=Object(r.a)(t,2),v=n[0],p=n[1],I=Object(k.a)(O.f,p,!0),w=Object(r.a)(I,1)[0],y=Object(k.a)(O.b,p),A=Object(r.a)(y,2),C=A[0],z=A[1],R=Object(k.a)(O.i,p),N=Object(r.a)(R,2),M=N[0],T=N[1],_=Object(h.useMemo)((function(){return v.map((function(e){return Object(i.a)(Object(i.a)({},e),{},{key:e.userId})}))}),[v]),U=Object(h.useCallback)((function(e){z({path:{userId:e}},{userId:e})}),[z]),L=Object(h.useCallback)((function(e,t){T({path:{userId:e}},{userId:e,admin:t})}),[T]),E=[{title:"UserId",dataIndex:"userId",key:"userId",width:"5%",sorter:function(e,t){return e.userId<t.userId?-1:1}},{title:"Admin",dataIndex:"admin",key:"admin",width:"10%",sorter:function(e,t){return e.admin===t.admin?0:e.admin?-1:1},render:function(t,n){return Object(a.jsxs)("div",{children:[n.admin?"Ja":"Nein",Object(a.jsx)(c.a,{title:"Adminstatus \xe4ndern",children:Object(a.jsx)(s.a,{disabled:n.userId===e,type:"link",icon:Object(a.jsx)(l.a,{}),onClick:function(){d.a.confirm({title:n.admin?"Adminrechte entziehen?":"Adminrechte vergeben?",icon:Object(a.jsx)(j.a,{}),content:Object(a.jsxs)("div",{children:["Der Nutzer",Object(a.jsx)("br",{}),Object(a.jsxs)("strong",{children:[n.name," (",n.mail,")"]}),Object(a.jsx)("br",{}),"wird durch diese Aktion ",n.admin?"zu einem normalen Nutzer herabgestuft.":"zum Admin bef\xf6rdert."]}),okText:n.admin?"Rechte entziehen":"Zum Admin machen",okType:"danger",cancelText:"Abbrechen",onOk:function(){L(n.userId,!n.admin)}})}})})]})}},{title:"Name",dataIndex:"name",key:"name",width:"20%",sorter:function(e,t){return e.name.localeCompare(t.name)}},{title:"E-Mail",dataIndex:"mail",key:"mail",width:"25%",sorter:function(e,t){return e.mail.localeCompare(t.mail)}},{title:"Verifiziert",dataIndex:"verified",key:"verified",width:"5%",sorter:function(e,t){return e.verified===t.verified?0:e.verified?-1:1},render:function(e,t){return t.verified?"Ja":"Nein"}},{title:"Letzte Aktivit\xe4t",dataIndex:"lastActivity",key:"lastActivity",width:"20%",sorter:function(e,t){return e.lastActivity-t.lastActivity},render:function(e,t){var n;return null===(n=t.lastActivity)||void 0===n?void 0:n.format("L LT")}},{title:"Reservierungen (offen)",dataIndex:"upcomingReservationCount",key:"upcomingReservationCount",width:"5%",sorter:function(e,t){return e.upcomingReservationCount-t.upcomingReservationCount}},{title:"Reservierungen (gesamt)",dataIndex:"totalReservationCount",key:"totalReservationCount",width:"5%",sorter:function(e,t){return e.totalReservationCount-t.totalReservationCount}},{title:"Aktionen",key:"action",render:function(t,n){return Object(a.jsxs)(o.b,{children:[Object(a.jsx)(c.a,{title:"E-Mail senden",children:Object(a.jsx)(s.a,{type:"link",icon:Object(a.jsx)(b.a,{}),disabled:n.userId===e,onClick:function(){window.location.href="mailto:".concat(n.mail)}})}),Object(a.jsx)(c.a,{title:"Nutzer l\xf6schen",children:Object(a.jsx)(s.a,{type:"link",danger:!0,icon:Object(a.jsx)(m.a,{}),disabled:n.userId===e,onClick:function(){d.a.confirm({title:"Nutzer l\xf6schen?",icon:Object(a.jsx)(j.a,{}),content:Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)("div",{children:"Diese Aktion kann nicht r\xfcckg\xe4ngig gemacht werden."}),Object(a.jsx)("div",{children:"Es werden alle Daten sowie Reservierungen unwiderruflich gel\xf6scht."}),Object(a.jsx)("br",{}),Object(a.jsx)("div",{children:Object(a.jsxs)("strong",{children:["Nutzer: ",n.name,Object(a.jsx)("br",{}),"E-Mail: ",n.mail]})})]}),okText:"Unwiderruflich L\xf6schen",okType:"danger",cancelText:"Abbrechen",onOk:function(){U(n.userId)}})}})})]},n._id)}}];return w.error||C.error||M.error?Object(a.jsx)(f.a,{}):Object(a.jsxs)("div",{className:g.a.wrapper,children:[Object(a.jsx)("h1",{children:"Nutzerverwaltung"}),Object(a.jsx)(u.a,{columns:E,dataSource:_,loading:w.loading||C.loading||M.loading,scroll:{x:1300}})]})}}}]);
//# sourceMappingURL=23.62ff00e0.chunk.js.map