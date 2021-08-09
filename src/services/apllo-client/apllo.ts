import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const GRAPHQL_SERVER_URL = `http://localhost:4011`;
const httpLink = createHttpLink({
  uri: `${GRAPHQL_SERVER_URL}/graphql`,
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('jwt');
  console.log(`auth link token : ${token}`);

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : undefined,
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
