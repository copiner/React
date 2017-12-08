export default function isNumber(item) {
  return !!item.match(/[0-9]+/);
}

//var o={flag:true};  var test=!!o.flag;

// 强制转换为Boolean 用 !!
//var bool = !!"c";
//console.log(typeof bool); // boolean

// 强制转换为Number 用 +
//var num = +"1234";
//console.log(typeof num); // number

// 强制转换为String 用 ""+
//var str = ""+ 1234;
//console.log(typeof str); // string
