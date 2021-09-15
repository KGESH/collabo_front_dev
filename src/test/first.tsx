import React from 'react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';

/**
 * Apollo Client
 * Unit Test Example
 */
export const PING_QUERY = gql`
  query ping {
    ping
  }
`;

export const PingPong = () => {
  const { loading, data, error } = useQuery(PING_QUERY);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error!!@</h1>;
  }

  return (
    <div>
      <h1>Hello, Test!</h1>
      <h2>{data?.ping}</h2>
    </div>
  );
};
