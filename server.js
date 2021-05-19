const express = require("express");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const schema = require("./schema.js");
const app = express();

app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

const PORT = 4040;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
