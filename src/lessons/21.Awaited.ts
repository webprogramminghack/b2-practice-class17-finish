type Async = Promise<string>;
type Value = Awaited<Async>;

async function fetchingData(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Data fetched from API');
    }, 2000); // Simulate an API delay of 2 seconds
  });
}

type FetchingDataValueType = Awaited<ReturnType<typeof fetchingData>>;

async function produceNumber<T> {
  return 3;
}

type DoSomethingType = Awaited<ReturnType<typeof produceNumber>>;