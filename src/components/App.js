import React from "react";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { useQuery } from "@apollo/react-hooks";

import { DAI_QUERY, ETH_PRICE_QUERY } from "../utils/graphql";
import uniswapLogo from "../images/uniswap-logo.png";
import daiLogo from "../images/dai-logo.png";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2"
  }),
  fetchOptions: {
    mode: "no-cors"
  },
  cache: new InMemoryCache()
});

const App = () => {
  const { loading: ethLoading, error: ethError, data: ethPriceData } = useQuery(
    ETH_PRICE_QUERY
  );
  const { loading: daiLoading, error: daiError, data: daiData } = useQuery(
    DAI_QUERY,
    {
      variables: {
        tokenAddress: "0x6b175474e89094c44da98b954eedeac495271d0f"
      }
    }
  );

  const daiPriceInEth = daiData && daiData.tokens[0].derivedETH;
  const daiTotalLiquidity = daiData && daiData.tokens[0].totalLiquidity;
  const ethPriceInUSD = ethPriceData && ethPriceData.bundle.ethPrice;

  return (
    <div>
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="https://uniswap.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={uniswapLogo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt=""
          />
          &nbsp; Uniswap Explorer
        </a>
      </nav>
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex text-center">
            <div className="content mr-auto ml-auto">
              <div>
                <img
                  src={daiLogo}
                  width="150"
                  height="150"
                  className="mb-4"
                  alt=""
                />
                <h2>
                  Dai price:{" "}
                  {ethError || daiError
                    ? "GraphQL Error"
                    : [
                        ethLoading || daiLoading
                          ? "Loading token data..."
                          : [
                              "$" +
                                // parse responses as floats and fix to 2 decimals
                                (
                                  parseFloat(daiPriceInEth) *
                                  parseFloat(ethPriceInUSD)
                                ).toFixed(2)
                            ]
                      ]}
                </h2>
                <h2>
                  Dai total liquidity:{" "}
                  {daiError
                    ? "GraphQL Error"
                    : [
                        daiLoading
                          ? "Loading token data..."
                          : // display the total amount of DAI spread across all pools
                            parseFloat(daiTotalLiquidity).toFixed(0)
                      ]}
                </h2>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
