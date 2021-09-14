import { gql } from '@apollo/client';

export const GET_HASHTAGS = gql`
  query {
    getAllHashTag {
      id
      name
      count
    }
  }
`;
