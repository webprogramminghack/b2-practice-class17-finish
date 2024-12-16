// How does conditional types work?
// T extends U ? X : Y
// If T is a subtype of U, then the result is X.

type IsString<T> = T extends string ? true : false;

function checkIfString<T>(value: T) {
  return (typeof value === 'string') as IsString<T>;
}

const result1 = checkIfString('Hello'); // Type is true
const result2 = checkIfString(123); // Type is false
// there is a better way to do this, which whill be discussed soon

function isArray<T>(value: T) {
  return Array.isArray(value) as T extends any[] ? true : false;
}

const result3 = isArray([1, 2, 3]); // Type is true
const result4 = isArray('Hello'); // Type is false

type IsFunction<T> = T extends (...args: any[]) => any ? true : false;

function checkIfFunction<T>(value: T) {
  // Runtime check using typeof to determine if the value is a function
  return (typeof value === 'function') as IsFunction<T>;
}

const result5 = checkIfFunction(() => {}); // Type is true
const result6 = checkIfFunction('Hello'); // Type is false
