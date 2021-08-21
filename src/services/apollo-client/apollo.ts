import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { cache } from 'services/apollo-client/Cache';

const GRAPHQL_SERVER_URL = `http://localhost:4010`;
const httpLink = createHttpLink({
  uri: `${GRAPHQL_SERVER_URL}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('jwt');
  console.log(`call auth link`);

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : undefined,
    },
  };
});

export const client: any = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});
