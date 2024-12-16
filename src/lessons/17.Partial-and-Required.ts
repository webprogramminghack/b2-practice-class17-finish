type Todo = {
  title: string;
  completed: boolean;
};

type PartialTodo = Partial<Todo>;
type RequiredTodo = Required<PartialTodo>;

type Person = {
  id?: string;
  name: string;
  hobby?: string;
  address?: {
    street?: string;
  };
};

// Required only makes the top level properties required
// So in this case, the address property is still optional
type RequiredPerson = Required<Person>;

// for example we want to make the copy of Person but the id property is required
type NewPerson = Required<Pick<Person, 'id'>> & Omit<Person, 'id'>;
// we can make a generic type for this
type RequiredByKeys<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;
type NewPerson2 = RequiredByKeys<Person, 'id'>;

// if the code above is too complex for you, you can do it like this
type RequiredByKey<T, K extends keyof T> = {
  [P in keyof T as P extends K ? P : never]-?: T[P]; // Make only the key(s) in K required
} & {
  [P in Exclude<keyof T, K>]: T[P]; // Keep the rest unchanged
};

// in TypeScript, when a key becomes never in a mapped type, it effectively gets removed from the resulting type. This is a powerful way to conditionally exclude keys or transform types based on specific conditions.
type RequiredPersonById = RequiredByKey<Person, 'id'>;

// be careful though, if we use it like this, it won't be omitted, so the hobby property is still required but you can't assign it
type MyObject = {
  id: string;
  name: string;
  hobby: never;
  age: string;
};

// you can see that it still requires the never property
const myObject: MyObject = {
  id: '1',
  name: 'John',
  age: '30',
};

// this is the correct way
// for example let's make a CustomOmit
type CustomOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};

type Car = {
  id: string;
  name: string;
  price: number;
};

type CarWithoutId = CustomOmit<Car, 'id'>;

const car: CarWithoutId = {
  name: 'Toyota',
  price: 10000,
};

// using recursive mapped types
type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object // Check if T[P] is an object
    ? DeepRequired<T[P]> // Recursively apply DeepRequired to nested objects
    : Required<T[P]>; // Keep other types as they are
};

type DeepRequiredPerson = DeepRequired<Person>;

const newPerson: DeepRequiredPerson = {
  id: '1',
  name: 'John',
  hobby: 'Coding',
  address: {
    street: '123 Main St',
  },
};
