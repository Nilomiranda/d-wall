import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import {ApolloProvider} from "@apollo/client";
import {client} from "./config/apolloClient";
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
