import { gql } from 'apollo-boost';

export const GET_CAFES = gql`
  query {
    getAllCafe {
      cafe_info {
        name
        beans
        position
        phone
      }
    }
  }
`;
