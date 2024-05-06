export const walletRenzoQuery = /* GraphQL */ `
  query getWallet($wallet: String!) {
    walletRenzo(wallet: $wallet) {
      walletHash
      renzoPoints
      eigenLayerPoints
    }
  }
`;

export const walletZircuitQuery = /* GraphQL */ `
  query getWalletZircuit($wallet: String!) {
    walletZircuit(wallet: $wallet) {
      walletHash
      zircuitPoints
    }
  }
`;

export const walletSwellPointsQuery = /* GraphQL */ `
  query walletSwellPoints($wallet: String!) {
    walletSwellPoints(wallet: $wallet) {
      walletHash
      Points
      EigenPoints
    }
  }
`;

export const walletKarakPointsQuery = /* GraphQL */ `
  query walletKarakPoints($wallet: String!) {
    walletKarak(wallet: $wallet) {
      walletHash
      points
    }
  }
`;

export const walletEtherFiPointsQuery = /* GraphQL */ `
  query walletEtherFiPoints($wallet: String!) {
    walletEtherFi(wallet: $wallet) {
      walletHash
      loyaltyPoints
      eigenlayerPoints
      liquidLoyaltyPoints
      liquidEigenlayerPoints
    }
  }
`;
