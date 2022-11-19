import {
  CacheConfig,
  Environment,
  Network,
  RecordSource,
  RequestParameters,
  Store,
  Variables,
} from "relay-runtime";
import fetchGraphQL from "./fetchGraphQL";

async function fetchRelqy(
  params: RequestParameters,
  variables: Variables,
  _cacheConfig: CacheConfig
) {
  console.log(
    `fetching query ${params.name} with ${JSON.stringify(variables)}`
  );
  if (!params.text) {
    throw new Error("fetchRelay: params.text is empty");
  }

  return fetchGraphQL(params.text, variables);
}

export default new Environment({
  network: Network.create(fetchRelqy),
  store: new Store(new RecordSource()),
});
