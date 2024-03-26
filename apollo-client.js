import { ApolloClient, InMemoryCache } from "@apollo/client";

// http://localhost:5001/api/eloping-marmot

const client = new ApolloClient({
  uri: `https://portogrande.stepzen.net/api/prodding-giraffe/__graphql`,
  headers: {
    Authorization: `Apikey ${process.env.NEXT_PUBLIC_STEPZEN_KEY}`,
  },
  cache: new InMemoryCache(),
});

export default client;
