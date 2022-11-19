import { Suspense } from "react";
import { usePreloadedQuery } from "react-relay";
import { Link, LoaderFunction, Outlet, useLoaderData } from "react-router-dom";
import graphql from "babel-plugin-relay/macro";
import { loadQuery, PreloadedQuery } from "react-relay/hooks";
import RelayEnvironment from "./RelayEnvironment";
import { RootQuery } from "./__generated__/RootQuery.graphql";

const rootQuery = graphql`
  query RootQuery($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      owner {
        login
      }
      name
    }
  }
`;

export const loader: LoaderFunction = async () => {
  return {
    rootQuery: loadQuery(RelayEnvironment, rootQuery, {
      owner: "azukiazusa1",
      name: "relay-issue-tracker-example",
    }),
  };
};

type LoaderData = {
  rootQuery: PreloadedQuery<RootQuery>;
};

const Root = () => {
  const loaderData = useLoaderData() as LoaderData;
  const data = usePreloadedQuery(rootQuery, loaderData.rootQuery);

  return (
    <div className="root">
      <header className="header">
        <Link to="/" style={{ color: "white" }}>
          {data.repository?.owner?.login} / {data.repository?.name}
        </Link>
      </header>
      <main className="content">
        <Suspense fallback="loading...">
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default Root;
