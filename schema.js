const axios = require("axios");

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
} = require("graphql");

// Root Type
const RootType = new GraphQLObjectType({
  name: "Root",
  fields: () => ({
    data: { type: new GraphQLList(DataType) },
    pagination: { type: PaginationType },
  }),
});

// Data Type
const DataType = new GraphQLObjectType({
  name: "Data",
  fields: () => ({
    author: { type: GraphQLString },
    category: { type: GraphQLString },
    country: { type: GraphQLString },
    description: { type: GraphQLString },
    image: { type: GraphQLString },
    language: { type: GraphQLString },
    published_at: { type: GraphQLString },
    source: { type: GraphQLString },
    title: { type: GraphQLString },
    url: { type: GraphQLString },
  }),
});

// Pagination Type
const PaginationType = new GraphQLObjectType({
  name: "Pagination",
  fields: () => ({
    count: { type: GraphQLInt },
    limit: { type: GraphQLInt },
    offset: { type: GraphQLInt },
    total: { type: GraphQLInt },
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    response: {
      type: RootType,
      resolve(parent, args) {
        return axios
          .get(
            "http://api.mediastack.com/v1/news?access_key=5b8acc5cad5fb26b1e65fe3dcb191565"
          )
          .then((res) => res.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
