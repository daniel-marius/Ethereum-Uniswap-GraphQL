import gql from "graphql-tag";

export const DAI_QUERY = gql`
  query tokens($tokenAddress: Bytes!) {
    tokens(where: { id: $tokenAddress }) {
      derivedETH
      totalLiquidity
    }
  }
`;

export const ETH_PRICE_QUERY = gql`
  query ethPrice {
    bundle(id: "1") {
      ethPrice
    }
  }
`;
