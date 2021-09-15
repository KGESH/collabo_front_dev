import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { render, waitFor } from '@testing-library/react';
import { PingPong, PING_QUERY } from './first';
import '@testing-library/jest-dom/extend-expect';

/** first.tsx의
 * 로딩 중일 때의 테스트 코드
 * getByText('Loading...')에서 받고있는 스트링이
 * first.tsx의 <h1>Loading...</h1>의 값과 일치해야 테스트 통과
 * 즉, 해당 페이지에 Loading... 스트링이 렌더링 되어야 통과
 */
test('PingPong renders loading while fetching data...', () => {
  const { getByText } = render(
    <MockedProvider>
      <PingPong />
    </MockedProvider>,
  );

  expect(getByText('Loading...')).toBeInTheDocument();
});

/**
 * first.tsx의
 * 에러일 때의 테스트 코드
 * getByText('Error!!@')에서 받고있는 스트링이
 * <h1>Error!!@</h1>의 값과 일치해야 테스트 통과
 * 즉, 해당 페이지에 Error!!@ 스트링이 렌더링 되어야 통과
 */
test('PingPong renders error when error is responded', async () => {
  const { getByText } = render(
    <MockedProvider>
      <PingPong />
    </MockedProvider>,
  );
  await waitFor(() => expect(getByText('Error!!@')).toBeInTheDocument());
});

test('PingPong renders data when data is responded', async () => {
  const mocks = [
    {
      request: {
        query: PING_QUERY,
      },
      result: {
        data: { ping: 'pong' },
      },
    },
  ];

  /**
   * first.tsx의
   * 쿼리로 데이터 받아왔을 때의 테스트 코드
   * getByText('pong')에서 받고있는 스트링이 페이지에 렌더링 되어야 테스트 통과
   */
  const { getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <PingPong />
    </MockedProvider>,
  );
  await waitFor(() => expect(getByText('pong')).toBeInTheDocument());
});
