(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{50:function(e,n,t){"use strict";t.r(n);var r=t(2),o=t(19),c=t.n(o),a=t(4),i=t(0),u=function(e){var n=e.changeHandler;return Object(i.jsxs)("div",{children:["Filter shown with ",Object(i.jsx)("input",{onChange:n})]})},d=function(e){var n=e.name,t=e.nameHandler,r=e.number,o=e.numberHandler,c=e.submitHandler;return Object(i.jsxs)("form",{children:[Object(i.jsxs)("div",{children:[Object(i.jsxs)("p",{children:["Name: ",Object(i.jsx)("input",{value:n,onChange:t})]}),Object(i.jsxs)("p",{children:["Number: ",Object(i.jsx)("input",{value:r,onChange:o})]})]}),Object(i.jsx)("div",{children:Object(i.jsx)("button",{type:"submit",onClick:c,children:"ADD"})})]})},l=function(e){var n=e.persons,t=e.clickHandler;return n.map((function(e){return Object(i.jsxs)("div",{children:["  name = ",e.name," number = ",e.number," ",Object(i.jsx)("button",{value:e.id,onClick:function(){return t(e.id)},children:" delete "})]},e.id)}))},s=t(5),b=t.n(s),f="/api/persons",j={getAll:function(){return b.a.get(f).then((function(e){return e.data}))},add:function(e){return b.a.post(f,e).then((function(e){return e.data}))},del:function(e){return b.a.delete("".concat(f,"/").concat(e)).then()},update:function(e){return console.log("update"),b.a.put("".concat(f,"/").concat(e.id),e).then((function(e){return e.data}))}},m=function(e){var n=e.message;return null===n?null:n.includes("ERROR:")?Object(i.jsx)("div",{style:{color:"red",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10},children:n}):Object(i.jsx)("div",{style:{color:"green",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10},children:n})},h=function(){Object(r.useEffect)((function(){j.getAll().then((function(e){console.log("Got the persons data"),o(e),y(e)}))}),[]);var e=Object(r.useState)([]),n=Object(a.a)(e,2),t=n[0],o=n[1],c=Object(r.useState)(""),s=Object(a.a)(c,2),b=s[0],f=s[1],h=Object(r.useState)(""),O=Object(a.a)(h,2),p=O[0],g=O[1],v=Object(r.useState)([]),x=Object(a.a)(v,2),w=x[0],y=x[1],k=Object(r.useState)(null),H=Object(a.a)(k,2),R=H[0],S=H[1];return Object(i.jsxs)("div",{children:[Object(i.jsx)("h2",{children:"Phonebook"}),Object(i.jsx)(m,{message:R}),Object(i.jsx)(u,{changeHandler:function(e){y(t.filter((function(n){return n.name.toLowerCase().includes(e.target.value.toLowerCase())}))),""===e.target.value&&y(t)}}),Object(i.jsx)(d,{name:b,nameHandler:function(e){return f(e.target.value)},number:p,numberHandler:function(e){return g(e.target.value)},submitHandler:function(e){if(e.preventDefault(),void 0!==t.find((function(e){return e.name===b}))){var n=t.find((function(e){return e.name===b}));return n.number=p,void(window.confirm("".concat(n.name," is already added on the phonebook, replace the old number with the new one?"))&&j.update(n).then((function(e){S("Person ".concat(e.name," was correctly updated")),o(t.map((function(n){return n.id!==e.id?n:e}))),y(t.map((function(n){return n.id!==e.id?n:e}))),f(""),g(""),setTimeout((function(){S(null)}),5e3)})).catch((function(e){S("ERROR: Information of ".concat(n.name," has already been removed from server")),o(t.filter((function(e){return e.id!==n.id}))),y(t.filter((function(e){return e.id!==n.id}))),f(""),g(""),setTimeout((function(){S(null)}),5e3)})))}var r={name:b,number:p,id:t.length+1};j.add(r).then((function(e){S("Added the person ".concat(e.name," correctly")),o(t.concat(e)),y(t.concat(e)),f(""),g(""),setTimeout((function(){S(null)}),5e3)}))}}),Object(i.jsx)("h3",{children:"Numbers"}),Object(i.jsx)(l,{persons:w,clickHandler:function(e){window.confirm("Are you sure you want to delete this number?")&&j.del(e).then((function(){var n=t.filter((function(n){return n.id!==e}));o(n),y(n),console.log("La persona con el id:".concat(e," a sido eliminada de la base de datos"))}))}})]})};c.a.createRoot(document.getElementById("root")).render(Object(i.jsx)(h,{}))}},[[50,1,2]]]);
//# sourceMappingURL=main.8c34e64b.chunk.js.map