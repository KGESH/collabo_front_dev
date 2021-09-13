import { InMemoryCache } from '@apollo/client';
import { currentUserVar } from 'services/apollo-client/LocalState';

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        me: {
          read() {
            return currentUserVar();
          },
        },
      },
    },
  },
});
