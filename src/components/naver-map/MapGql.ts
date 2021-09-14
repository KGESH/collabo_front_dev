import { gql } from 'apollo-boost';

export const GET_CAFES = gql`
  query {
    getAllCafe {
      cafe_id
      cafe_info {
        cafe_name
        beans
        position
        address
        phone
      }
    }
  }
`;
