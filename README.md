## Instructions

Storefront ordering system.
In order to create a Store front in will need to provide few arguments

For example : {
address: "any address"
coupons: [10, 20, 30]
image: "https://picsum.photos/200/300"
name: "any name"
zip: [222, 333, 444]
menu: [
{ mealName: "Sushi", price: 70 }
{ mealName: "Nigiri", price: 40 }
{ mealName: "Soup", price: 30 }
{ mealName: "Noodels", price: 60 }
]
}

For creating an order {
customerName: "any name"
customerAddress: "any address"
lineItems: [
{
id: "ID from the DB in order to create a relation between the menu item and to order"
mealName: "Sushi"
price: 70
}
]
coupons: [10,20]
}

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
