export const usersQuery = /* GraphQL */ `
  query getUsers {
    users {
      id
      name
      email
      roles {
        id
        name
        description
        enable
      }
    }
  }
`;
