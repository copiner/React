var oldArr=['wdaonngg'];

var arr=[[1,2,3],[4,5,6],[7,8,9],[10,11,12]];

var newArr=oldArr.concat(arr);

console.log(newArr);
console.log(oldArr);

//apply方法改变this指向
console.log(Array.prototype.concat.apply(Array,arr));

console.log(Array.prototype.concat.apply(Number,arr));

console.log(Array.prototype.concat.apply(String,arr));

console.log(Array.prototype.concat.apply(RegExp,arr));

console.log(Array.prototype.concat.apply([],arr));//or

console.log([].concat(arr));

console.log([].concat.apply([],arr));

console.log(['w'].concat.apply(['wdaonngg'],arr));

console.log([].concat({a:2,b:3,c:3}));

console.log([].concat("123"));


var arr1 = new Array("1","2","3");

var arr2 = new Array("4","5","6",'7');

let tArr = [];
var temp = Array.prototype.push.apply(tArr,arr2);
console.log(temp);
console.log(arr2);
console.log(tArr);
//console.log(Array.prototype.push.apply(arr1,arr2));

var mArr = ["4","5","6"];
console.log(Math.max.apply(null,mArr));
console.log(Math.min.apply(null,mArr));
