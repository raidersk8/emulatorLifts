(function(){"use strict";var t={7139:function(t,o,e){var i=e(9242),n=e(3396);function r(t,o,e,i,r,l){const a=(0,n.up)("emulator-lifts");return(0,n.wg)(),(0,n.j4)(a,{"count-lifts":5,"count-floor":7})}const l={class:"emulator-lifts"};function a(t,o,e,i,r,a){const s=(0,n.up)("lift-shaft"),f=(0,n.up)("floor-buttons");return(0,n.wg)(),(0,n.iD)("div",l,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(t.lifts,((o,e)=>((0,n.wg)(),(0,n.j4)(s,{key:e,"count-floor":t.countFloor,floor:o.floor,"onUpdate:floor":t=>o.floor=t,"move-floor":o.moveFloor,"onUpdate:move-floor":t=>o.moveFloor=t,state:o.state,"onUpdate:moveFloor":o=>t.handleUpdateMoveFloor(o,e),onChangeState:o=>t.handleChangeStateLift(o,e)},null,8,["count-floor","floor","onUpdate:floor","move-floor","onUpdate:move-floor","state","onUpdate:moveFloor","onChangeState"])))),128)),(0,n.Wm)(f,{"count-floor":t.countFloor,"wait-floors":t.waitFloors,onChange:t.handleChangeFloor},null,8,["count-floor","wait-floors","onChange"])])}var s=e(2268);const f={class:"lift-shaft",ref:"liftShaft"};function u(t,o,e,i,r,l){const a=(0,n.up)("lift-cabin");return(0,n.wg)(),(0,n.iD)("div",f,[(0,n.Wm)(a,{class:"lift-shaft__lift-cabin",style:(0,s.j5)({bottom:t.liftCabinButton,"transition-duration":t.liftCabinDuration,height:t.liftCabinHeight}),state:t.state,floor:t.moveFloor,direction:t.direction},null,8,["style","state","floor","direction"])],512)}function c(t,o,e,i,r,l){return(0,n.wg)(),(0,n.iD)("div",{class:(0,s.C_)(["lift-cabin",t.classes])},(0,s.zw)(t.floor),3)}var h,d;(function(t){t[t["ready"]=0]="ready",t[t["move"]=1]="move",t[t["wait"]=2]="wait"})(h||(h={})),function(t){t[t["up"]=0]="up",t[t["down"]=1]="down",t[t["wait"]=2]="wait"}(d||(d={}));var v=(0,n.aZ)({props:{floor:Number,state:{type:Number,default:h.ready},direction:{type:Number,default:d.wait}},computed:{isWait(){return this.state===h.wait},classes(){return{"lift-cabin--wait":this.isWait,"lift-cabin--up":this.direction===d.up&&this.state===h.move,"lift-cabin--down":this.direction===d.down&&this.state===h.move}}}}),p=e(89);const m=(0,p.Z)(v,[["render",c]]);var F=m,g=(0,n.aZ)({props:{moveFloor:{type:Number,default:1},floor:{type:Number,default:1},countFloor:{type:Number,default:1},state:{type:Number,default:h.ready}},data(){return{oldFloor:this.floor,finishFloor:this.floor,liftCabinDuration:"0s",waitingTime:2e3,direction:d.wait,height:0,isSkipLiftCycle:!1}},emits:["changeState","update:floor","update:moveFloor"],components:{LiftCabin:F},watch:{floor(){this.changeFloor()}},mounted(){this.$refs.liftShaft&&this.$refs.liftShaft instanceof HTMLDivElement&&(this.height=this.$refs.liftShaft.clientHeight),this.state===h.wait&&this.delay(this.waitingTime).then((()=>{this.changeState(h.ready)})),this.state===h.move&&(this.isSkipLiftCycle=!0,this.updateFloor(this.moveFloor),this.oldFloor=this.moveFloor,this.$nextTick((()=>{this.isSkipLiftCycle=!1,setTimeout((()=>{this.updateFloor(this.finishFloor)}),100)})))},computed:{liftCabinButton(){return this.height/this.countFloor*(this.floor-1)+"px"},liftCabinHeight(){return this.height/this.countFloor+"px"}},methods:{changeState(t){this.$emit("changeState",t)},async liftCycleFromMoveToReady(t){this.changeState(h.move);let o=this.intervalMoveFloor();await this.delay(1e3*t),clearTimeout(o),this.updateMoveFloor(this.floor),this.changeState(h.wait),await this.delay(this.waitingTime),this.changeState(h.ready)},intervalMoveFloor(){return setInterval((()=>{this.moveFloor<this.floor?this.updateMoveFloor(Math.min(this.moveFloor+1,this.floor)):this.updateMoveFloor(Math.max(this.moveFloor-1,this.floor))}),1e3)},delay(t){return new Promise((o=>{setTimeout(o,t)}))},updateMoveFloor(t){this.$emit("update:moveFloor",t)},updateFloor(t){this.$emit("update:floor",t)},changeFloor(){const t=Math.abs(this.oldFloor-this.floor);this.liftCabinDuration=t+"s",this.floor>this.oldFloor?this.direction=d.up:this.floor<this.oldFloor&&(this.direction=d.down),this.updateMoveFloor(this.oldFloor),this.oldFloor=this.floor,this.isSkipLiftCycle||this.liftCycleFromMoveToReady(t)}}});const w=(0,p.Z)(g,[["render",u]]);var b=w;const y={class:"floor-buttons"},C=["onClick"];function S(t,o,e,i,r,l){return(0,n.wg)(),(0,n.iD)("div",y,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(t.countFloor,(o=>((0,n.wg)(),(0,n.iD)("div",{class:"floor-buttons__wrap-button",key:o},[(0,n._)("button",{type:"button",class:(0,s.C_)({"floor-buttons__button--wait":t.waitFloors.includes(o)}),onClick:e=>t.handleClickFloor(o)},(0,s.zw)(o),11,C)])))),128))])}var M=(0,n.aZ)({props:{countFloor:Number,waitFloors:Array},emits:["change"],methods:{handleClickFloor(t){this.$emit("change",t)}}});const k=(0,p.Z)(M,[["render",S]]);var L=k,O=(e(7658),e(4870));let _;const N=(0,O.iH)([]);function T(t){return x(t),B(),(0,n.bv)((()=>{U()})),{lifts:_,setState:D,liftCall:Z,waitFloors:(0,n.Fl)(E),setMoveFloor:I}}function x(t){_=(0,O.iH)([]);for(let o=0;o<t;o++)_.value[o]={floor:1,state:h.ready,moveFloor:1}}function D(t,o){_.value[t].state=o,U()}function Z(t){j(t)||(H(t),U())}function j(t){return _.value.some((o=>o.floor===t))}function H(t){N.value.includes(t)||N.value.push(t)}function U(){const t=_.value.filter((t=>t.state===h.ready));while(N.value.length>0&&t.length>0){const o=N.value.pop();if("number"===typeof o){const e=$(t,o);t[e].floor=o,t.splice(e,1)}}W()}function $(t,o){let e={index:0,differenceFloor:Math.abs(t[0].floor-o)};return t.forEach(((t,i)=>{const n=Math.abs(t.floor-o);(!e||e.differenceFloor>n)&&(e={index:i,differenceFloor:n})})),e.index}function E(){const t=_.value.filter((t=>!N.value.includes(t.floor)&&t.state===h.move)),o=t.map((t=>t.floor));return[...o,...N.value]}function W(){sessionStorage.setItem("emulatorLifts",JSON.stringify({lifts:_.value,callStack:N.value}))}function B(){const t=sessionStorage.getItem("emulatorLifts");if("string"===typeof t){const o=JSON.parse(t);_.value=o.lifts,N.value=o.callStack}}function I(t,o){_.value[t].moveFloor=o,W()}var P=(0,n.aZ)({components:{LiftShaft:b,FloorButtons:L},props:{countLifts:{type:Number,default:1},countFloor:{type:Number,default:5}},setup(t){let{lifts:o,setState:e,liftCall:i,waitFloors:n,setMoveFloor:r}=T(t.countLifts);return{lifts:o,setState:e,liftCall:i,waitFloors:n,setMoveFloor:r}},methods:{handleChangeFloor(t){this.liftCall(t)},handleChangeStateLift(t,o){this.setState(o,t)},handleUpdateMoveFloor(t,o){this.setMoveFloor(o,t)}}});const z=(0,p.Z)(P,[["render",a]]);var A=z,J=(0,n.aZ)({name:"App",components:{EmulatorLifts:A}});const K=(0,p.Z)(J,[["render",r]]);var R=K;(0,i.ri)(R).mount("#app")}},o={};function e(i){var n=o[i];if(void 0!==n)return n.exports;var r=o[i]={exports:{}};return t[i](r,r.exports,e),r.exports}e.m=t,function(){var t=[];e.O=function(o,i,n,r){if(!i){var l=1/0;for(u=0;u<t.length;u++){i=t[u][0],n=t[u][1],r=t[u][2];for(var a=!0,s=0;s<i.length;s++)(!1&r||l>=r)&&Object.keys(e.O).every((function(t){return e.O[t](i[s])}))?i.splice(s--,1):(a=!1,r<l&&(l=r));if(a){t.splice(u--,1);var f=n();void 0!==f&&(o=f)}}return o}r=r||0;for(var u=t.length;u>0&&t[u-1][2]>r;u--)t[u]=t[u-1];t[u]=[i,n,r]}}(),function(){e.n=function(t){var o=t&&t.__esModule?function(){return t["default"]}:function(){return t};return e.d(o,{a:o}),o}}(),function(){e.d=function(t,o){for(var i in o)e.o(o,i)&&!e.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:o[i]})}}(),function(){e.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){e.o=function(t,o){return Object.prototype.hasOwnProperty.call(t,o)}}(),function(){var t={143:0};e.O.j=function(o){return 0===t[o]};var o=function(o,i){var n,r,l=i[0],a=i[1],s=i[2],f=0;if(l.some((function(o){return 0!==t[o]}))){for(n in a)e.o(a,n)&&(e.m[n]=a[n]);if(s)var u=s(e)}for(o&&o(i);f<l.length;f++)r=l[f],e.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return e.O(u)},i=self["webpackChunkemulator_lifts"]=self["webpackChunkemulator_lifts"]||[];i.forEach(o.bind(null,0)),i.push=o.bind(null,i.push.bind(i))}();var i=e.O(void 0,[998],(function(){return e(7139)}));i=e.O(i)})();
//# sourceMappingURL=app.f7a1a512.js.map