import graphql from "babel-plugin-relay/macro";
import {
  loadQuery,
  PreloadedQuery,
  usePreloadedQuery,
} from "react-relay/hooks";
import { LoaderFunction, useLoaderData } from "react-router";
import Issue from "./Issue";
import RelayEnvironment from "./RelayEnvironment";
import { HomeRootIssuesQuery } from "./__generated__/HomeRootIssuesQuery.graphql";

const homeRootIssuesQuery = graphql`
  query HomeRootIssuesQuery($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      id
      ...Issue_repository
    }
  }
`;

export const loader: LoaderFunction = async () => {
  return {
    homeRootIssuesQuery: loadQuery(RelayEnvironment, homeRootIssuesQuery, {
      owner: "azukiazusa1",
      name: "relay-issue-tracker-example",
    }),
  };
};

type LoaderData = {
  homeRootIssuesQuery: PreloadedQuery<HomeRootIssuesQuery>;
};

const Home = () => {
  const loaderData = useLoaderData() as LoaderData;

  const data = usePreloadedQuery(
    homeRootIssuesQuery,
    loaderData.homeRootIssuesQuery
  );

  return <Issue repository={data.repository!} />;
};

export default Home;
