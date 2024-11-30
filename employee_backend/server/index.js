const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("../schema/schema");
const connectDB = require("../config/db");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);

connectDB();

//PORT NUMBER TO CONNECT
const port = 4000;

app.listen(port, console.log(`App is running on port ${port}`));
