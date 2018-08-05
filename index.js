const { graphql, buildSchema } = require('graphql');

// define Schema, which defines Query/ Mutation, which define types and fields

// goal: when query 'foo', return 'bar'

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

// make a client query to call foo
const query = `
{
  videos {
    id,
    duration,
    watched
  }
}
`;

graphql(schema, query, resolver)
  .then(response => console.log('foo:', JSON.stringify(response)))
  .catch(error => console.log(error));
