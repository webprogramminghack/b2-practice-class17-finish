// You can make Typescript evaluates the condition multiple times for each member
// There are requirements for this looping behavior:
// 1. Must be a conditional type
// 2. Input must be a union type (something that extends)
// 3. Type before the extends keyword must come from the type parameter, it can't be a hand-written type
// If you satisfy these requirements, the distributive nature of conditional types will kick in

// before we start learning about conditional looping, you should know about the characteristics of never type in union types
type ResultWithoutNever = '1' | '2' | never | '3'; // Typescript has a rule that is type never is ignored in union types

// now let's learn about conditional looping
type ExcludeFromUnion<T, U> = T extends U ? never : T;

type Result = ExcludeFromUnion<'a' | 'b' | 'c' | 'd', 'a'>; // Result: 'b' | 'c' | 'd'
// Distributive:
// ('a' extends 'a' ? never : 'a') |
// ('b' extends 'a' ? never : 'b') |
// ('c' extends 'a' ? never : 'c') |
// ('d' extends 'a' ? never : 'd')
// Result: 'b' | 'c' | 'd'

// Do you understand?
// So, for example, if T is A | B, then:
// T extends U ? X : Y
// is effectively treated as:
// (A extends U ? X : Y) | (B extends U ? X : Y)

// No Distributive Conditional Behavior Here
// This is not a distributive conditional type
// because the conditional is not directly inside a type alias that uses a generic parameter.
type Check = 'a' | 'b' | 'c' | 'd' extends 'a' ? 'yes' : 'no';

// Distributive Conditional Behavior Here
// This is a distributive conditional type
// because the conditional is directly inside a type alias that uses a generic parameter.
type Check2<T> = T extends 'a' ? 'yes' : 'no';
type Result2 = Check2<'a' | 'b' | 'c' | 'd'>; // Result: 'yes' | 'no' | 'no' | 'no' -> 'yes' | 'no'

// The distributive behavior in TypeScript conditional types happens only to the type before the extends keyword
type Result3 = ExcludeFromUnion<'a' | 'b' | 'c' | 'd', 'a' | 'b'>;
// 'a' extends 'a' | 'b' ? never : 'a' → never
// 'b' extends 'a' | 'b' ? never : 'b' → never
// 'c' extends 'a' | 'b' ? never : 'c' → 'c'
// 'd' extends 'a' | 'b' ? never : 'd' → 'd'
// Result: 'c' | 'd'

// let's create a custom choose properties
type ChooseProperties<T, K extends keyof T> = {
  [P in K]: T[P];
};

type Person = {
  name: string;
  age: number;
  country: string;
  hobby: string;
  friends: string[];
};

type PersonName = ChooseProperties<Person, 'name' | 'age' | 'hobby'>; // { name: string; }

type RemoveProperties<T, K extends keyof T> = {
  [P in ExcludeFromUnion<keyof T, K>]: T[P];
};

type PersonWithoutFriends = RemoveProperties<Person, 'friends'>;
