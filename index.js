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
  }
  type Schema {
      query: Query
    }
`);

const resolver = {
  video: () => ({
    id: () => '1qaz',
    title: () => 'bar',
    duration: () => 120,
    watched: () => true
  })
};

// make a client query to call foo
const query = `
{
  video {
    id,
    duration,
    watched
  }
}
`;

graphql(schema, query, resolver)
  .then(response => console.log('foo:', response))
  .catch(error => console.log(error));
