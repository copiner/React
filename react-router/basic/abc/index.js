const PEEPS = [
  { id: 0, name: 'Michelle', friends: [ 1, 2, 3 ] },
  { id: 1, name: 'Sean', friends: [ 0, 3 ] },
  { id: 2, name: 'Kim', friends: [ 0, 1, 3 ], },
  { id: 3, name: 'David', friends: [ 1, 2 ] }
]

//The find() method returns the value of the first element in the array that satisfies the provided testing function.
//Otherwise undefined is returned.

//See also the findIndex() method, which returns the index of a found element in the array instead of its value.

//If you need to find the position of an element or whether an element exists in an array,
//use Array.prototype.indexOf() or Array.prototype.includes().
const found = (id) => PEEPS.find(p => p.id == id)
const person = found(1);
console.log(person);


// var inventory = [
//     {name: 'apples', quantity: 2},
//     {name: 'bananas', quantity: 0},
//     {name: 'cherries', quantity: 5}
// ];
//
// function isCherries(fruit) {
//     return fruit.name === 'cherries';
// }
//
// console.log(inventory.find(isCherries));
// { name: 'cherries', quantity: 5 }
