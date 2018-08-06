const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

const schema = buildSchema(`
  type Video {
    id: ID,
    title: String,
    duration: Int,
    watched: Boolean
  }
  type Query {
    video: Video
    videos: [Video]
  }
  type Schema {
      query: Query
    }
`);

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
    graphiql: true,
    rootValue: resolver
  })
);

app.listen(4000);
