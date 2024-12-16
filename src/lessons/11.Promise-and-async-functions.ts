function wait(duration: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve('hello'), duration);
  });
}

// this will result in an error since value is of unknown type
wait(1000).then((value) => {
  // toUpperCase method doesn't exist on unknown type
  console.log(value.toUpperCase());
});

// the solution
function defer(duration: number) {
  return new Promise<string>((resolve) => {
    setTimeout(() => resolve('hello'), duration);
  });
}

defer(1000).then((value) => {
  console.log(value.toUpperCase()); // now it works
});

// the return type of fetchData is Promise<any>
async function fetchData() {
  const response = await fetch('https://api.example.com/data');
  return await response.json();
}

// the solution is to specify return type
type Data = {
  id: number;
  name: string;
};

async function fetchData2(): Promise<Data> {
  const response = await fetch('https://api.example.com/data');
  return await response.json();
}

fetchData2().then((data) => {
  // the auto complete works correctly
  console.log(data.id);
});
