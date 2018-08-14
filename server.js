const express = require('express');
const graphqlHTTP = require('express-graphql');
const {
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLList,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt
} = require('graphql');
const { getVideoById, getVideos } = require('./data');

const app = express();

const videoType = new GraphQLObjectType({
  name: 'TheVideoQuery',
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    duration: { type: GraphQLInt },
    watched: { type: GraphQLBoolean }
  }
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: {
    video: {
      type: videoType,
      description: 'Video Query',
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve: (_, args) => getVideoById(args.id)
    },
    videos: {
      type: new GraphQLList(videoType),
      resolve: getVideos
    }
  }
});

const schema = new GraphQLSchema({
  query: queryType
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000);
