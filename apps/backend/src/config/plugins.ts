export default () => ({
  plugins: [
    {
      enabled: true,
      path: './src/users',
      resolve: 'UserResolver',
    },
    {
      enabled: true,
      path: './src/roles',
      resolve: 'RolesResolver',
    },
    {
      enabled: true,
      path: './src/screens',
      resolve: 'ScreensResolver',
    },
    {
      enable: true,
      path: './src/content-type-builder',
      resolve: 'ContentTypeBuilderResolver',
    },
  ],
});
