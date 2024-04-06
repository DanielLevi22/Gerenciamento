import { faker } from '@faker-js/faker'


export const attends = Array.from({length: 200}).map(() => {
  return {
    id: faker.number.int({min:1000, max:2000}),
    name: faker.person.fullName(),
    email: faker.internet.email().toLocaleLowerCase(),
    createdAt: faker.date.recent({days: 30}),
    checkedIntAt:faker.date.recent({days: 7}),
  }
})