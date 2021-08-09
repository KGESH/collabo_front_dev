import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const GET_USER = gql`
  query {
    authUser {
      id
      name
      email
    }
  }
`;

const Home = () => {
  const { data } = useQuery(GET_USER);
  /**
   * 로그인 성공하면 로그인에 대한 상태 설정필요
   */

  if (data?.authUser) {
    console.log(`id: ${data.authUser.id}`);
    console.log(`name: ${data.authUser.name}`);
    console.log(`email: ${data.authUser.email}`);
  }

  return (
    <>
      <div className='home'>
        <h1 className='home__title'>This is Home</h1>
      </div>
    </>
  );
};
export default Home;
