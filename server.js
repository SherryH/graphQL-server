const express = require('express');
const graphqlHTTP = require('express-graphql');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt
} = require('graphql');

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
      resolve: () =>
        new Promise(resolve =>
          resolve({
            id: 'a',
            title: 'server video',
            duration: '60',
            watched: true
          })
        )
    }
  }
});

const schema = new GraphQLSchema({
  query: queryType
});

const videoA = {
  id: 'a',
  title: 'server video',
  duration: '60',
  watched: true
};

const videoB = {
  id: 'b',
  title: 'client video',
  duration: '30',
  watched: false
};
const videos = [videoA, videoB];
const resolver = {
  video: () => ({
    id: () => '1qaz',
    title: () => 'bar',
    duration: () => 120,
    watched: () => true
  }),
  videos
};

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000);
