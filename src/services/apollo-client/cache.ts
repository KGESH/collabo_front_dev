import { makeVar, gql, InMemoryCache } from '@apollo/client';
import { User } from 'types/User';

export const currentUserVar = makeVar<User | null>(null);

export const GET_CURRENT_USER = gql`
  query {
    me @client
  }
`;
export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        me() {
          return currentUserVar();
        },
      },
    },
  },
});
