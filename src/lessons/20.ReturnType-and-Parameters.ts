function checkLength(a: string) {
  return a.length;
}

// do you still remember this in the previous lesson?
type ReturnOfCheckLength<T extends (...args: any[]) => any> = T extends (
  ...args: any[]
) => infer R
  ? R
  : never;

type Result = ReturnOfCheckLength<typeof checkLength>; // number

// Actually there is already a built-in type in typescript to handle this
// it's called ReturnType
type CheckLengthReturnType = ReturnType<typeof checkLength>; // number

function sum(a: number, b: number) {
  return a + b;
}
// parameter is actually a conditional type with infer
// type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
type SumReturnType = Parameters<typeof sum>; // [number, number]
// it actually returns an array of the parameters
// so we can use it like this
type FirstParameter = Parameters<typeof sum>[0]; // number
type SecondParameter = Parameters<typeof sum>[1]; // number
