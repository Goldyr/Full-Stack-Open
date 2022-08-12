(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{54:function(e,t,n){"use strict";n.r(t);var r=n(1),a=n(22),c=n.n(a),o=n(5),i=n(4),s=n(2),u=n.n(s),l=n(11),d=n(0),b=Object(r.forwardRef)((function(e,t){var n=Object(r.useState)(!1),a=Object(i.a)(n,2),c=a[0],o=a[1],s={display:c?"none":""},u={display:c?"":"none"},l=function(){o(!c)};return Object(r.useImperativeHandle)(t,(function(){return{toggleVisibility:l}})),Object(d.jsxs)("div",{children:[Object(d.jsx)("div",{style:s,children:Object(d.jsx)("button",{style:{backgroundColor:"#EC994B",width:"6rem",height:"2rem",margin:5},onClick:l,id:e.buttonId,children:e.buttonLabel})}),Object(d.jsxs)("div",{style:u,children:[e.children,Object(d.jsx)("button",{onClick:l,id:e.buttonId,style:{backgroundColor:"#FF0000",width:"6rem",height:"2rem",margin:5},children:"cancel"})]})]})}));b.displayName="Togglable";var p=b,j=function(e){var t=e.blog,n=e.user,a=e.likeButtonHandler,c=e.deleteButtonHandler,o=Object(r.useState)(t),s=Object(i.a)(o,2),u=s[0],b=s[1];return Object(d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gridTemplateRows:"1fr",placeItems:"center",borderStyle:"solid",borderWidth:"2px",padding:"10px",margin:"3px"},className:"Blog",children:[Object(d.jsxs)("div",{style:{},children:[t.title," by ",t.author]}),Object(d.jsx)("div",{style:{},children:Object(d.jsxs)(p,{buttonLabel:"info",children:[Object(d.jsxs)("em",{children:[Object(d.jsxs)("span",{children:["Likes ",u.likes]})," ",Object(d.jsx)("input",{type:"button",value:"Like",onClick:function(e){e.preventDefault();var t=Object(l.a)(Object(l.a)({},u),{},{likes:u.likes+1});a(t),b(t)}})]}),Object(d.jsx)("br",{}),Object(d.jsx)("em",{children:t.url}),Object(d.jsx)("br",{}),Object(d.jsx)("em",{children:t.author}),Object(d.jsx)("br",{}),n.username===t.user.username?Object(d.jsx)("input",{type:"button",value:"Remove",onClick:function(e){e.preventDefault(),c(t)},style:{backgroundColor:"red"},id:"deleteButton"}):Object(d.jsx)("input",{type:"button",value:"Remove",disabled:!0,id:"deleteButton"}),Object(d.jsx)("br",{})]})})]})},f=function(e){var t=e.handleLogin,n=Object(r.useState)(""),a=Object(i.a)(n,2),c=a[0],s=a[1],l=Object(r.useState)(""),b=Object(i.a)(l,2),p=b[0],j=b[1],f=function(){var e=Object(o.a)(u.a.mark((function e(n){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.preventDefault(),t(c,p),s(""),j("");case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(d.jsxs)("form",{onSubmit:f,id:"loginForm",style:{display:"flex",flexDirection:"column",alignSelf:"center",alignItems:"center",justifyContent:"center",height:"90vh",width:"90vw",padding:10,margin:20,border:"black solid 1px"},children:[Object(d.jsxs)("div",{style:{margin:2,fontSize:"2rem"},children:["username :",Object(d.jsx)("input",{style:{fontSize:"1.5rem",margin:1,height:"2rem",width:"15rem"},type:"text",value:c,name:"Username",onChange:function(e){var t=e.target;return s(t.value)},id:"username"})]}),Object(d.jsxs)("div",{style:{margin:2,fontSize:"2rem"},children:["password :",Object(d.jsx)("input",{style:{fontSize:"1.5rem",margin:1,height:"2rem",width:"15rem"},type:"password",value:p,name:"Password",onChange:function(e){var t=e.target;return j(t.value)},id:"password"})]}),Object(d.jsx)("button",{type:"submit",style:{margin:2,fontSize:"1.5rem"},children:"LOGIN"})]})},g=function(e){var t=e.createBlog,n=Object(r.useState)(""),a=Object(i.a)(n,2),c=a[0],o=a[1],s=Object(r.useState)(""),u=Object(i.a)(s,2),l=u[0],b=u[1],p=Object(r.useState)(""),j=Object(i.a)(p,2),f=j[0],g=j[1];return Object(d.jsxs)("form",{onSubmit:function(e){e.preventDefault(),t({title:c,author:l,url:f}),o(""),b(""),g("")},style:{display:"flex",padding:5},children:[Object(d.jsxs)("div",{style:{alignSelf:"center",margin:2},children:["Title:",Object(d.jsx)("input",{type:"text",value:c,onChange:function(e){var t=e.target;o(t.value)},placeholder:"title",id:"input-title"})]}),Object(d.jsxs)("div",{style:{margin:2},children:["Author:",Object(d.jsx)("input",{type:"text",value:l,onChange:function(e){var t=e.target;b(t.value)},placeholder:"author",id:"input-author"})]}),Object(d.jsxs)("div",{style:{margin:2},children:["Url:",Object(d.jsx)("input",{type:"text",value:f,onChange:function(e){var t=e.target;g(t.value)},placeholder:"url",id:"input-url"})]}),Object(d.jsx)("input",{style:{backgroundColor:"#EEF3D2",width:"6rem"},type:"submit",value:"create",id:"add-blog"})]})},h=function(e){var t=e.message;return null!==t?t.includes("ERROR:")?Object(d.jsx)("div",{className:"error-not",style:{color:"red",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10},children:t}):Object(d.jsx)("div",{style:{color:"green",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10},children:t}):null},m=n(6),v=n.n(m),O="/api/blogs",x=null,y=function(){var e=Object(o.a)(u.a.mark((function e(t){var n,r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{Authorization:x}},e.next=3,v.a.post(O,t,n);case 3:return r=e.sent,e.abrupt("return",r.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),k=function(){var e=Object(o.a)(u.a.mark((function e(t){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.a.put(O+"/".concat(t.id),t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),w=function(){var e=Object(o.a)(u.a.mark((function e(t){var n,r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{Authorization:x}},e.next=3,v.a.delete(O+"/".concat(t),n);case 3:return r=e.sent,e.abrupt("return",r.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),S={getAll:function(){return v.a.get(O).then((function(e){return e.data}))},setToken:function(e){x="bearer ".concat(e)},create:y,update:k,deleteBlog:w},R=function(){var e=Object(o.a)(u.a.mark((function e(t){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.a.post("api/login",t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),C={login:R},B=function(){var e=Object(r.useState)([]),t=Object(i.a)(e,2),n=t[0],a=t[1],c=Object(r.useState)(null),s=Object(i.a)(c,2),l=s[0],b=s[1],m=Object(r.useState)(null),v=Object(i.a)(m,2),O=v[0],x=v[1];Object(r.useEffect)((function(){S.getAll().then((function(e){return a(e)}))}),[]),Object(r.useEffect)((function(){var e=window.localStorage.getItem("LoggedUser");if(e){var t=JSON.parse(e);b(t),S.setToken(t.token)}}),[]);var y=function(){var e=Object(o.a)(u.a.mark((function e(t,n){var r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,C.login({username:t,password:n});case 3:r=e.sent,window.localStorage.setItem("LoggedUser",JSON.stringify(r)),S.setToken(r.token),b(r),x("Logged user ".concat(r.name," correctly!")),setTimeout((function(){x(null)}),5e3),e.next=16;break;case 11:e.prev=11,e.t0=e.catch(0),console.log(e.t0.response.data),x("ERROR:  ".concat(e.t0.response.data.error)),setTimeout((function(){x(null)}),5e3);case 16:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(t,n){return e.apply(this,arguments)}}(),k=function(e){e.preventDefault(),window.localStorage.removeItem("LoggedUser"),b(null),x("Logged out!"),setTimeout((function(){x(null)}),5e3)},w=function(){var e=Object(o.a)(u.a.mark((function e(t){var r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,R.current.toggleVisibility(),e.next=4,S.create(t);case 4:r=e.sent,console.log(r),a(n.concat(r)),x("New blog ".concat(r.title," by ").concat(r.author," added")),setTimeout((function(){x(null)}),5e3),e.next=16;break;case 11:e.prev=11,e.t0=e.catch(0),console.log(e.t0.response.data),x("ERROR:  ".concat(e.t0.response.data.error)),setTimeout((function(){x(null)}),5e3);case 16:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(t){return e.apply(this,arguments)}}(),R=Object(r.useRef)(),B=function(){var e=Object(o.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,S.update(t);case 3:x("Liked!"),setTimeout((function(){x(null)}),5e3),e.next=12;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0.response.data),x("ERROR:  ".concat(e.t0.response.data.error)),setTimeout((function(){x(null)}),5e3);case 12:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}(),T=function(){var e=Object(o.a)(u.a.mark((function e(t){var r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!window.confirm("Remove blog ".concat(t.title," by ").concat(t.author))){e.next=15;break}return e.prev=1,e.next=4,S.deleteBlog(t.id);case 4:r=n.filter((function(e){return e.id!==t.id})),a(r),x("Blog deleted"),setTimeout((function(){x(null)}),5e3),e.next=15;break;case 10:e.prev=10,e.t0=e.catch(1),console.log(e.t0.response.data),x("ERROR:  ".concat(e.t0.response.data.error)),setTimeout((function(){x(null)}),5e3);case 15:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(t){return e.apply(this,arguments)}}();return Object(d.jsxs)("div",{children:[Object(d.jsx)(h,{message:O}),Object(d.jsx)("div",{children:null===l?Object(d.jsx)(f,{handleLogin:y}):Object(d.jsxs)("div",{style:{display:"flex",flexDirection:"column"},children:[Object(d.jsx)("h2",{style:{alignSelf:"center",fontSize:"2rem"},children:"blogs"}),Object(d.jsxs)("div",{style:{alignSelf:"center",fontStyle:"italic",margin:5},children:["User ",l.name," logged in",Object(d.jsx)("input",{style:{margin:10},type:"button",onClick:k,value:"Log Out",id:"logout-button"})]}),Object(d.jsx)(p,{buttonLabel:"create blog",ref:R,buttonId:"create-button",children:Object(d.jsx)(g,{createBlog:w})}),n.sort((function(e,t){return e.likes>t.likes?-1:1})).map((function(e){return Object(d.jsx)("div",{children:Object(d.jsx)(j,{blog:e,likeButtonHandler:B,deleteButtonHandler:T,user:l})},e.id)}))]})})]})};c.a.createRoot(document.getElementById("root")).render(Object(d.jsx)(B,{}))}},[[54,1,2]]]);
//# sourceMappingURL=main.f29322ed.chunk.js.map