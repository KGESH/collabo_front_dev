import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link } from 'react-router-dom';
import { client } from 'services/apollo-client/apollo';
import { ApolloProvider } from '@apollo/client';
import App from './App';
import './index.css';
import GetCurrentLocation from 'components/get-current-location/GetCurrentLocation';
import GetHashTag from 'components/get-hash-tag/GetHashTag';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
        <GetCurrentLocation />
        <GetHashTag />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
