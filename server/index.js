const express = require('express');
const colors = require('colors')
const cors = require('cors')
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000;

const app = express();

// Connect to db
connectDB()

const corsOptions = {
    origin: 'http://localhost:3000/*', // Reemplaza con el origen de tu cliente
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Habilita las cookies y cabeceras de autorización (si las usas)
};
app.use(cors(corsOptions));

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}))

app.listen(port, console.log(`server running on port ${port}`))
