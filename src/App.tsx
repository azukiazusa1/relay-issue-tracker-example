import React from "react";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import { RouterProvider } from "react-router";
import { RecoilRoot } from "recoil";
import RelayEnvironment from "./RelayEnvironment";
import { router } from "./routing/routes";

function AppRoot() {
  return (
    <RecoilRoot>
      <RelayEnvironmentProvider environment={RelayEnvironment}>
        <RouterProvider router={router} />
      </RelayEnvironmentProvider>
    </RecoilRoot>
  );
}

export default AppRoot;
