import { gql } from '@apollo/client';

export const GET_CAFES = gql`
  query {
    getAllCafe {
      cafe_id
      cafe_info {
        cafe_name
        beans
        location
        address
        phone
      }
    }
  }
`;
