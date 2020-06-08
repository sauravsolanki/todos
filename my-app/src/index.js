import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import TodoApp from "./TodoApp"
import TodoApp from "./AddInputForm"
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from "apollo-cache-inmemory";

import UserProvider from "./providers/UserProvider";


import { gql } from "apollo-boost";
const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});
  // client
  //   .query({
  //     query: gql`
  //     {
  //       taskList{
  //          title
  //          duedate
  //          label
  //          status
  //        }
  //     }
  //     `
  //   })
  //   .then(result => console.log(result));

ReactDOM.render(
  <React.StrictMode>
     <UserProvider>
     <ApolloProvider client={client}>  
     <TodoApp/>
     </ApolloProvider>
     </UserProvider>
   </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
