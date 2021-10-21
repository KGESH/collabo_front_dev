import { ApolloClient } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';
import { cache } from 'services/apollo-client/Cache';

/** hack!  */
//export const GCP_IP = `34.64.157.141`;
//const GRAPHQL_SERVER_URL = `http://${GCP_IP}:4010`;
console.log(`server url from dot env: ${process.env.SERVER_URL}`);
const GRAPHQL_SERVER_URL = process.env.SERVER_URL || `https://api-server-rstrcjinfq-du.a.run.app`;
const uploadLink = createUploadLink({
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
  link: authLink.concat(uploadLink),
  cache,
});
