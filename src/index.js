import 'bootstrap/dist/css/bootstrap.css'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from './components/App'

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
