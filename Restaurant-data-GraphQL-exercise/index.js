var { graphqlHTTP } = require("express-graphql");
var { buildSchema, assertInputType } = require("graphql");
var express = require("express");

// Construct a schema, using GraphQL schema language
var restaurants = [
  {
    id: 1,
    name: "WoodsHill ",
    description:
      "American cuisine, farm to table, with fresh produce every day",
    dishes: [
      {
        name: "Swordfish grill",
        price: 27,
      },
      {
        name: "Roasted Broccily ",
        price: 11,
      },
    ],
  },
  {
    id: 2,
    name: "Fiorellas",
    description:
      "Italian-American home cooked food with fresh pasta and sauces",
    dishes: [
      {
        name: "Flatbread",
        price: 14,
      },
      {
        name: "Carbonara",
        price: 18,
      },
      {
        name: "Spaghetti",
        price: 19,
      },
    ],
  },
  {
    id: 3,
    name: "Karma",
    description:
      "Malaysian-Chinese-Japanese fusion, with great bar and bartenders",
    dishes: [
      {
        name: "Dragon Roll",
        price: 12,
      },
      {
        name: "Pancake roll ",
        price: 11,
      },
      {
        name: "Cod cakes",
        price: 13,
      },
    ],
  },
];
var schema = buildSchema(`
type Query{
  restaurant(id: Int): restaurant
  restaurants: [restaurant]
},
type restaurant {
  id: Int
  name: String
  description: String
  dishes:[Dish]
}
type Dish{
  name: String
  price: Int
}
input restaurantInput{
  name: String
  description: String
}
type DeleteResponse{
  ok: Boolean!
}
type Mutation{
  setrestaurant(input: restaurantInput): restaurant
  deleterestaurant(id: Int!): DeleteResponse
  editrestaurant(id: Int!, name: String!): restaurant
}
`);
// The root provides a resolver function for each API endpoint

var root = {
  restaurant: (arg) => {
    console.log(`Find a restaurant`);
    console.log(`Search argument:`);
    console.log(JSON.stringify(arg));
    console.log(`Search id: ${arg.id}`);

    let result = restaurants.find( item => item.id === arg.id);

    console.log(`Restaurant found:`);
    console.log(JSON.stringify(result));
    return result;    
  },

  restaurants: () => restaurants,

  setrestaurant: ({ input }) => {
    console.log(`setrestaurant`);
    console.log(`Restaurant to be added:`);
    console.log(JSON.stringify(input));

    let maxID = restaurants.reduce( ( previousId, item ) => {
      let result = Math.max(previousId, item.id);
      return result;
    }, 0);

    console.log(`Current max ID: ${maxID}`);
    maxID++;
    console.log(`New ID: ${maxID}`);

    restaurants.push({id:maxID, name:input.name, description:input.description});

    return {id:maxID, name:input.name, description:input.description};    
  },

  deleterestaurant: ({ id }) => {
    let restaurant = restaurants.find( item => item.id === id);
    let ok = Boolean(restaurant);
    restaurants = restaurants.filter(item => item.id !== id);

    console.log(`Restaurant to be deleted:`);
    console.log(JSON.stringify(restaurant)); 

    return {ok}    
  },

  editrestaurant: ({ id, name }) => {
    let restaurant = restaurants.find( item => {
      if (item.id === id) {
        item.name = name;
        return item;
      }
    });

    if(!restaurant) {
        throw new Error("Restaurant ID doesn't exist")
    }

    return restaurant;    
  }

};
var app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

var port = 5502;

app.listen(port, () => console.log(`Running Graphql on http://localhost:${port}/graphql`));

// export default root;
