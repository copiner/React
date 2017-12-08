import Big from 'big.js';

export default function operate(numberOne, numberTwo, operation) {
  console.log(typeof numberOne);
  const one = Big(numberOne);
  const two = Big(numberTwo);
  if (operation === '+') {
    return one.plus(two).toString();
  }
  if (operation === '-') {
    return one.minus(two).toString();
  }
  if (operation === 'x') {
    return one.times(two).toString();
  }
  if (operation === '÷') {
    return one.div(two).toString();
  }
  if (operation === '%') {
    return one.mod(two).toString();
  }
  throw Error(`Unknown operation '${operation}'`);
}
// console.log(10/3);
// console.log(Big(10).div(Big(3)));
// console.log(1-0.8);
// console.log(Big(1).minus(Big(0.8)));
// console.log(Big(2).minus(Big(0.8)));
