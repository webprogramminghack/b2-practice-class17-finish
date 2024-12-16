// you don't need to create it, there is already a built-in type in typescript to handle this
type ObjectType<K extends keyof any, T> = {
  [P in K]: T;
};

type Person = {
  name: string;
  age: number;
};

// for example you want to create this:
type PeopleGroupedByName = {
  [index: string]: Person[];
};

type PeopleGroupByName = Record<string, Person[]>;

// or maybe you want to create this:
type Person2 = {
  firstName: string;
  lastName: string;
};
// instead of doing this:
type Person3 = {
  [P in 'firstName' | 'lastName']: string;
};
// you can do this:
type Person4 = Record<'firstName' | 'lastName', string>;

// for example you want to constraint fisrt type parameter to be an object type that the keys are string and the values are any

// so instead of doing this:
type AddPrefix2<O extends { [key: string]: any }, K extends string> = {
  [P in keyof O as P extends string ? `${K}${P}` : P]: O[P];
};

// we do this instead (using Record):
type AddPrefix<O extends Record<string, any>, K extends string> = {
  [P in keyof O as P extends string ? `${K}${P}` : P]: O[P];
};

type User = {
  firstName: string;
  lastName: string;
};

type UserWithPrefix = AddPrefix<User, 'user_'>;

// Using Record is more concise and easier to understand. It's better to use Record instead of creating a custom mapped type for this kind of scenario.

// However, you can't depend on Record everytime.
// For data model, you might want to use custom object type using type or interface instead of Record.
// For example, you want to create a data model for a user with a specific structure.
type User2 = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
};

// You can't use Record for this, you have to use type or interface, it's easier to understand, and the age property is of type number, not string or any. This is way better.

// Another example:

const User3: Record<string, any> = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
};

// The type of User3 is:
{
  id: any;
  firstName: any;
  lastName: any;
  age: any;
}
// all the data type of the property values are any, which is not what we want.

// So sometimes you want to use index signatures for this kind of scenario.
type User4 = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  [key: string]: any;
};

// in the following example, all of the properties have the correct data type, but only hobby property has any data type.
const user4: User4 = {
  id: 1, // number
  firstName: 'John', // string
  lastName: 'Doe', // string
  age: 30, // number
  hobby: 'fishing', // any
};

// The conclusion is, don't use Record for data model, use type or interface instead. Use Record for mapping keys and values.
