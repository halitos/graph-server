const axios = require("axios");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
} = require("graphql");

// Hard-coded Data

// const customers = [
//   { id: "1", name: "Bob", email: "bobbo.com", age: 54 },
//   { id: "2", name: "Mike", email: "mikke.com", age: 45 },
//   { id: "3", name: "Sarah", email: "sarra.com", age: 23 },
//   { id: "4", name: "Reiss", email: "reisss.com", age: 32 },
// ];

// Cust Type
const CustomerType = new GraphQLObjectType({
  name: "Customer",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        // return customers.find((cust) => cust.id === args.id);
        return axios
          .get("http://localhost:3000/customers/" + args.id)
          .then((res) => res.data);
      },
    },
    customers: {
      type: GraphQLList(CustomerType),
      resolve(parentValue, args) {
        return axios
          .get("http://localhost:3000/customers")
          .then((res) => res.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
