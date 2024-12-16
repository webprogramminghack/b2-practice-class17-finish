type Todo = {
  id: string;
  name: string;
  completed: boolean;
  // what happens if the Todo Model has more properties such as status?
  status: 'Complete' | 'Incomplete';
};

// notice that NewTodo is the same as Todo but without the id property
// let's say that it doesn't have an id until it's saved to the database
type NewTodo = {
  name: string;
  completed: boolean;
  // you need to copy the status property from Todo to NewTodo
  status: 'Complete' | 'Incomplete';
};

type NewTodo2 = Omit<Todo, 'id'>;
type NewTodo3 = Pick<Todo, 'name' | 'completed' | 'status'>;

function saveTodo(todo: NewTodo): Todo {
  // save to database
  return { ...todo, id: crypto.randomUUID() };
}
