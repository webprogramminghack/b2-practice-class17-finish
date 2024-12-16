type Todo = {
  title: string;
  completed: boolean;
};

type FinalTodo = Readonly<Todo>;

const todo: FinalTodo = {
  title: 'Learn TypeScript',
  completed: false,
};

// all the properties of todo2 are readonly
const todo2 = {
  title: 'Learn TypeScript',
  completed: false,
} as const;

// actually you can also use Object.freeze
Object.freeze(todo2);
// it's what inside:
// freeze<T extends { [idx: string]: U | null | undefined | object; }, U extends string | bigint | number | boolean | symbol>(o: T): Readonly<T>;

// just use Readonly to make it easier
