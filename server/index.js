const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/schema/index');
const resolvers = require('./graphql/resolver/index');
const { GraphQLServer } = require('graphql-yoga');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var database = "mongodb+srv://saurav:solanki@cluster0-kakbw.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(database,{ useNewUrlParser: true })
    .then(() => {
        console.log('Connection to DB successful');
    })
    .catch(err => {
        console.log('Db connection error ====> ', err);
    });

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => {
    console.log('GraphQL Listening on Cloud');
});