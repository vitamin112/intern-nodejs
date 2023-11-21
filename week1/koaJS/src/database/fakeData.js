import { faker } from "@faker-js/faker";

export function createRandomUser() {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price({ min: 100, max: 500 }),
    description: faker.commerce.productDescription(),
    product: faker.commerce.product(),
    color: faker.color.human(),
    createdAt: faker.date.between({
      from: "2020-01-01T00:00:00.000Z",
      to: "2023-01-01T00:00:00.000Z",
    }),
    image: faker.image.avatar(),
  };
}

export const USERS = faker.helpers.multiple(createRandomUser, {
  count: 1000,
});
