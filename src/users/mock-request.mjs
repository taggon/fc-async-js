let fakerMod;

if (typeof process !== 'undefined') {
  fakerMod = await import('@faker-js/faker');
} else {
  fakerMod = await import('https://cdn.skypack.dev/@faker-js/faker');
}

const { faker } = fakerMod;
const seed = (new Date().getTime() / 1000 / 3600 / 24)|0; // daily
faker.seed(seed);

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function request(url) {
  const shouldFail = Math.random() < 0.1;
  const data = {
    userId: faker.datatype.uuid(),
    username: faker.name.fullName(),
    age: +faker.random.numeric(2),
    job: faker.name.jobTitle(),
    registeredAt: faker.date.past(),
    requestedUrl: url,
  };

  if (shouldFail) {
    throw new Error('Something went wrong on the server!');
  }

  await sleep((Math.random() * 1000)|0);

  return data;
}
