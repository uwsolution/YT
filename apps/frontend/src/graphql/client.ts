import {
  ApolloClient,
  ApolloLink,
  DefaultOptions,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  concat,
} from "@apollo/client";

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({});
  return forward(operation);
});

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const httpLink = new HttpLink({ uri: process.env.GRAPHQL_ADDRESS });

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});

export default client;
