// infer is built specifically for conditional types
// you can't use infer in other types
const sumFunc = (a: number, b: number) => a + b;
const someObj = {
  name: 'John',
  age: 30,
};

type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
type Result = GetReturnType<typeof sumFunc>; // number

// However we have a problem
// we can add anything into it since it doesn't have extends
type Result2 = GetReturnType<typeof someObj>;

// so we can add constraint
type GetReturnType2<T extends (...args: any[]) => any> = T extends (
  ...args: any[]
) => infer R
  ? R
  : never;

// now we can't add anything
type Result3 = GetReturnType2<typeof someObj>; // error
type Result4 = GetReturnType2<typeof sumFunc>; // number

// we can also use infer to transform the values of properties
type ObjectType = {
  [P in any]: any;
};

type TransformValues<T extends ObjectType> = {
  [K in keyof T]: T[K] extends (...args: any[]) => infer R ? R : T[K];
};

type MyObject = {
  name: string;
  getAge: () => number;
};

type Transformed = TransformValues<MyObject>;
// Result: { name: string; getAge: number; }

// we can also use infer to get the return type of a promise
type ReturnTypeOfPromise<T extends Promise<any>> = T extends Promise<infer U>
  ? U
  : never;

async function fetchData() {
  // Simulating an API call
  return { name: 'Alice', age: 123 };
}

type DataType = ReturnTypeOfPromise<ReturnType<typeof fetchData>>; // Infers { name: string; age: number }

type Person = {
  'key-id': string;
  'key-name': string;
  'key-age': number;
};

// using infer to remove prefix
type RemovePrefix<Obj extends { [K in any]: any }, Key extends string> = {
  [P in keyof Obj as P extends `${Key}${infer U}` ? U : P]: Obj[P];
};

type NewPerson = RemovePrefix<Person, 'key-'>;
