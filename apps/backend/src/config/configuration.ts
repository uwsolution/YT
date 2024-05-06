export default () => ({
  frontend: {
    url: process.env.FRONTEND_URL,
  },
  graphql: {
    path: process.env.GRAPHQL_PATH,
    autoSchemaFile: process.env.GRAPHQL_SCEMA_FILE,
  },
});
