const { graphql, buildSchema } = require('graphql');

// define Schema, which defines Query/ Mutation, which define types and fields

// goal: when query 'foo', return 'bar'

const schema = buildSchema(`
  type Query {
    id: ID,
    title: String,
    duration: Int,
    watched: Boolean
  }
  type Schema {
      query: Query
    }
`);

const resolver = {
  id: () => '1qaz',
  title: () => 'bar',
  duration: () => 120,
  watched: () => true
};

// make a client query to call foo
const query = `
{id, title, duration, watched}
`;

graphql(schema, query, resolver)
  .then(response => console.log('foo:', response))
  .catch(error => console.log(error));
