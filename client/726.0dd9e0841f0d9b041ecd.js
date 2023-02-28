"use strict";(self.webpackChunkproj_42=self.webpackChunkproj_42||[]).push([[726],{478:(n,t,e)=>{e.d(t,{b:()=>s});var o,c="https://guiseppe-production.up.railway.app/api/",r="https://guiseppe-production.up.railway.app/post/";!function(n){n.COFFEE="coffee/",n.REGISTER="register/",n.USER="user/",n.LOGIN="login/",n.LOGOUT="logout/",n.SET_PICTURE="setpicture/",n.RESTORE="restore/",n.POST_NEW="newpost/",n.POST_ALL="all/",n.COFFEE_STATS="coffeestat/",n.QUIZ_STATS="quiz/"}(o||(o={}));var s={getUser:function(){return fetch("".concat(c).concat(o.USER),{method:"GET",credentials:"include",mode:"cors",headers:{}}).then((function(n){return n.json()})).catch((function(n){return console.log(n)}))},createUser:function(n){return fetch("".concat(c).concat(o.REGISTER),{method:"POST",credentials:"include",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}).then((function(n){return n.json()})).catch((function(n){return console.log(n)}))},loginUser:function(n){return fetch("".concat(c).concat(o.LOGIN),{method:"POST",credentials:"include",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}).then((function(n){return n.json()})).catch((function(n){return console.log(n)}))},logoutUser:function(){return fetch("".concat(c).concat(o.LOGOUT),{method:"POST",credentials:"include",mode:"cors",headers:{"Content-Type":"application/json"}}).then((function(n){return n.json()})).catch((function(n){return console.log(n)}))},updateAvatar:function(n){return fetch("".concat(c).concat(o.SET_PICTURE),{method:"PUT",credentials:"same-origin",mode:"cors",headers:{},body:n}).then((function(n){return n.json()})).catch((function(n){return console.log(n)}))},restoreUser:function(n){return fetch("".concat(c).concat(o.RESTORE),{method:"POST",credentials:"include",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}).then((function(n){return n.json()})).catch((function(n){return console.log(n)}))},getAllPosts:function(){return fetch("".concat(r).concat(o.POST_ALL),{method:"GET",credentials:"same-origin",mode:"cors",headers:{"Content-Type":"application/json"}}).then((function(n){return n.json()})).catch((function(n){return console.log(n)}))},createNewPost:function(n){return fetch("".concat(r).concat(o.POST_NEW),{method:"POST",credentials:"include",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}).then((function(n){return n.json()})).catch((function(n){return console.log(n)}))},updateCoffeeStatus:function(n){return fetch("".concat(c).concat(o.COFFEE_STATS),{method:"PUT",credentials:"same-origin",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}).then((function(n){return n.json()})).catch((function(n){return console.log(n)}))},updateQuizStatus:function(n){return fetch("".concat(c).concat(o.QUIZ_STATS),{method:"PUT",credentials:"same-origin",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}).then((function(n){return n.json()})).catch((function(n){return console.log(n)}))}}},1726:(n,t,e)=>{e.r(t),e.d(t,{default:()=>u});var o=e(5893),c=e(7294),r=e(4160),s=e(478),a=e(2327),i=function(){return i=Object.assign||function(n){for(var t,e=1,o=arguments.length;e<o;e++)for(var c in t=arguments[e])Object.prototype.hasOwnProperty.call(t,c)&&(n[c]=t[c]);return n},i.apply(this,arguments)};const u=function(){var n=(0,c.useState)(),t=n[0],e=n[1],u=(0,c.useState)([]),l=u[0],h=u[1],d=(0,c.useState)(""),f=d[0],p=d[1],m=(0,a.$)().t;return(0,c.useEffect)((function(){s.b.getUser().then((function(n){return e(n&&n.name?n.name:m("anonymous"))})),s.b.getAllPosts().then((function(n){h(n||[])}))}),[]),(0,o.jsx)("div",i({className:"comments-page"},{children:(0,o.jsxs)("div",i({className:(0,r.A)("comments-box")},{children:[(0,o.jsxs)("div",i({className:"comment-wrapper"},{children:[(0,o.jsx)("h2",i({className:"comment-user"},{children:t})),(0,o.jsx)("textarea",{className:"comment__input",placeholder:m("Add a comment"),value:f,onChange:function(n){p(n.target.value)}}),(0,o.jsx)("button",i({className:"comment__btn",onClick:function(){var n=f.trim();0!==n.length&&s.b.createNewPost({authorName:t,postText:n}).then((function(){s.b.getAllPosts().then((function(n){h(n||[])}))}))}},{children:m("sent")}))]})),l.map((function(n,t){return(0,o.jsxs)("div",i({className:"comment-wrapper"},{children:[(0,o.jsx)("h2",i({className:"comment-user"},{children:n.authorName})),(0,o.jsx)("p",i({className:"comment-text"},{children:n.postText}))]}),t)}))]}))}))}}}]);