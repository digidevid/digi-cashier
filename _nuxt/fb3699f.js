(window.webpackJsonp=window.webpackJsonp||[]).push([[8,6],{229:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));n(28),n(67),n(16),n(101);var o=function(e){return e||0==e?"Rp".concat(e.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1.")):void 0}},230:function(e,t,n){var content=n(237);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(100).default)("65aa564e",content,!0,{sourceMap:!1})},236:function(e,t,n){"use strict";n(230)},237:function(e,t,n){var o=n(99)((function(i){return i[1]}));o.push([e.i,".modal-popup{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);max-height:95%;max-width:95%;min-width:20rem}.scroll-bar::-webkit-scrollbar{display:none}.scroll-bar{-ms-overflow-style:none;scrollbar-width:none}",""]),o.locals={},e.exports=o},262:function(e,t,n){"use strict";n.r(t);var o={props:{isShow:{type:Boolean,default:!1}},data:function(){return{newExpense:{name:"",desc:"",totalPrice:null}}},methods:{onClose:function(){this.$emit("onClose")},submitData:function(){this.newExpense.desc=this.newExpense.desc?this.newExpense.desc:"-",this.$emit("submitData",this.newExpense),this.newExpense={}}}},l=(n(236),n(27)),component=Object(l.a)(o,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.isShow?n("div",{staticClass:"z-40 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed",attrs:{tabindex:"0"}},[n("div",{staticClass:"z-50 relative mx-auto my-0 w-full"},[n("div",{staticClass:"modal-popup w-full md:w-3/4 lg:w-1/2 xl:w-1/3 flex flex-col overflow-hidden rounded-3xl px-4 pt-8 pb-6 bg-white"},[n("button",{staticClass:"fill-current h-6 w-6 absolute right-3 top-3 font-3xl font-bold primary focus:outline-none",on:{click:e.onClose}},[n("svg",{staticClass:"w-6 h-6 primary",attrs:{fill:"currentColor",viewBox:"0 0 20 20"}},[n("path",{attrs:{"fill-rule":"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z","clip-rule":"evenodd"}})])]),e._v(" "),n("div",{staticClass:"scroll-bar !overflow-y-auto !overscroll-auto md:px-2"},[n("div",[n("h3",{staticClass:"text-2xl font-bold text-center mb-6"},[e._v("Tambah Belanja")]),e._v(" "),n("div",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.newExpense.name,expression:"newExpense.name"}],staticClass:"border border-gray-300 w-full py-3 px-4 rounded-md",attrs:{type:"text",placeholder:"Nama item.."},domProps:{value:e.newExpense.name},on:{input:function(t){t.target.composing||e.$set(e.newExpense,"name",t.target.value)}}})]),e._v(" "),n("div",[n("textarea",{directives:[{name:"model",rawName:"v-model",value:e.newExpense.desc,expression:"newExpense.desc"}],staticClass:"border border-gray-300 w-full py-3 px-4 rounded-md mt-3",attrs:{rows:"3",placeholder:"Keterangan.."},domProps:{value:e.newExpense.desc},on:{input:function(t){t.target.composing||e.$set(e.newExpense,"desc",t.target.value)}}})]),e._v(" "),n("div",{staticClass:"flex space-x-3 items-center mt-2"},[n("p",{staticClass:"text-xl font-semibold"},[e._v("Rp")]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.newExpense.totalPrice,expression:"newExpense.totalPrice"}],staticClass:"border border-gray-300 w-full py-3 px-4 rounded-md",attrs:{type:"text",placeholder:"0"},domProps:{value:e.newExpense.totalPrice},on:{input:function(t){t.target.composing||e.$set(e.newExpense,"totalPrice",t.target.value)}}})]),e._v(" "),n("div",{staticClass:"mt-4"},[n("button",{staticClass:"bg-blue-500 w-full py-3 text-lg font-semibold text-white rounded-md disabled:opacity-50",attrs:{disabled:!e.newExpense.name||!e.newExpense.totalPrice},on:{click:e.submitData}},[e._v("\n              Tambah\n            ")])])])])])]),e._v(" "),n("div",{staticClass:"z-40 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed bg-black opacity-50",on:{click:e.onClose}})]):e._e()}),[],!1,null,null,null);t.default=component.exports},287:function(e,t,n){"use strict";n.r(t);n(179),n(16),n(45),n(37),n(104),n(43),n(38),n(39);var o=n(262),l=n(229),c={components:{ModalExpense:o.default},data:function(){return{expenseList:[],total:0,isShowModalExpense:!1,isLoading:!1,picList:[{name:"Ihsan",value:"Ihsan"},{name:"Bembeng",value:"Bembeng"},{name:"Ibnu",value:"Ibnu"},{name:"Faishal",value:"Faishal"}],pic:"Ihsan"}},methods:{onCloseModalExpense:function(){this.isShowModalExpense=!1},minus:function(e){this.expenseList.splice(e,1),this.calculate()},plus:function(){this.isShowModalExpense=!0},reset:function(){this.expenseList=[],this.total=0},calculate:function(){this.total=this.expenseList.map((function(e){return parseInt(e.totalPrice)})).reduce((function(e,t){return e+t}),0)},addExpense:function(data){this.expenseList.push(data),this.calculate(),this.isShowModalExpense=!1},submitData:function(){var e=this;this.isLoading=!0,this.expenseList.forEach((function(t){t.pic=e.pic}));var t=[];this.expenseList.forEach((function(e){var n=new FormData,o=new Date,l=o.getDate(),c=o.getMonth()+1,r=o.getFullYear(),d="".concat(l,"/").concat(c,"/").concat(r),m=o.getHours(),f=o.getMinutes(),time="".concat(m,":").concat(f);n.append("Tanggal",d),n.append("Jam",time),n.append("Nama",e.name),n.append("Keterangan",e.desc),n.append("Total",e.totalPrice),n.append("PIC",e.pic),t.push(fetch("https://script.google.com/macros/s/AKfycbzQ4VQPIvRMv5sYz1QPkjabkzvr6zPgoaYpq4QG0tHuuWSoNzc3zGO46IG4CyJ-8TiR/exec",{method:"POST",body:n,changeOrigin:!0}).catch((function(e){console.error("Error!",e.message),alert(e.message),!1})))})),Promise.all(t).then((function(t){e.isLoading=!1,e.reset()}))},toRupiah:l.a}},r=n(27),component=Object(r.a)(c,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"bg-blue-100 min-h-screen pt-14 pb-48"},[n("div",{staticClass:"p-4 pt-8"},[n("h3",{staticClass:"text-center text-3xl font-bold mb-4"},[e._v("Belanja DigiCafe")]),e._v(" "),n("div",{staticClass:"flex justify-between items-center my-2"},e._l(e.picList,(function(t,o){return n("div",{key:o,staticClass:"flex items-center space-x-1"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.pic,expression:"pic"}],staticClass:"w-4 h-4",attrs:{type:"radio"},domProps:{value:t.value,checked:e._q(e.pic,t.value)},on:{change:function(n){e.pic=t.value}}}),e._v(" "),n("label",{staticClass:"text-md font-semibold"},[e._v(e._s(t.name))])])})),0),e._v(" "),e._l(e.expenseList,(function(t,o){return n("div",{key:o,staticClass:"flex justify-between items-center border-b-2 border-gray-600 border-dashed pb-2 space-y-1 mt-2"},[n("div",[n("p",[e._v(e._s(t.name))]),e._v(" "),n("p",{staticClass:"text-sm"},[e._v(e._s(t.desc))])]),e._v(" "),n("div",{staticClass:"flex items-center space-x-3"},[n("p",{staticClass:"text-lg"},[e._v(e._s(e.toRupiah(t.totalPrice)))]),e._v(" "),n("button",{on:{click:function(t){return e.minus(o)}}},[n("font-awesome-icon",{staticClass:"text-red-400 w-6 h-6",attrs:{icon:["fa","circle-minus"]}})],1)])])}))],2),e._v(" "),n("div",{staticClass:"fixed bottom-0 max-w-lg mx-auto bg-white rounded-t-2xl w-full px-2 pb-2"},[n("div",{staticClass:"flex justify-between items-center my-3 text-xl font-bold px-4"},[n("p",[e._v("TOTAL")]),e._v(" "),n("p",[e._v(e._s(e.toRupiah(e.total)))])]),e._v(" "),n("div",[n("button",{staticClass:"bg-blue-500 w-full py-3 text-lg font-semibold text-white rounded-md disabled:opacity-50",attrs:{disabled:e.isLoading||0===e.expenseList.length||!e.pic},on:{click:e.submitData}},[e.isLoading?n("div",[n("i",{staticClass:"fa fa-circle-o-notch fa-spin"}),e._v("\n          Loading...\n        ")]):n("div",[e._v("Submit")])])]),e._v(" "),n("div",{staticClass:"w-full flex justify-between space-x-3 items-center mt-2"},[n("button",{staticClass:"bg-red-500 w-full py-3 text-lg font-semibold text-white rounded-md disabled:opacity-50",on:{click:e.reset}},[e._v("\n        Reset\n      ")]),e._v(" "),n("button",{staticClass:"mt-1",on:{click:e.plus}},[n("font-awesome-icon",{staticClass:"text-green-400 w-12 h-12",attrs:{icon:["fa","circle-plus"]}})],1)])]),e._v(" "),n("ModalExpense",{attrs:{"is-show":e.isShowModalExpense},on:{onClose:e.onCloseModalExpense,submitData:e.addExpense}})],1)}),[],!1,null,null,null);t.default=component.exports}}]);