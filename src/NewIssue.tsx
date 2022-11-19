import graphql from "babel-plugin-relay/macro";
import React, { useCallback, useState } from "react";
import {
  GraphQLTaggedNode,
  loadQuery,
  PreloadedQuery,
  useMutation,
  usePreloadedQuery,
} from "react-relay/hooks";
import { LoaderFunction, useLoaderData, useNavigate } from "react-router";
import { ConnectionHandler, PayloadError } from "relay-runtime";
import RelayEnvironment from "./RelayEnvironment";
import { NewIssueCreateIssueMutation } from "./__generated__/NewIssueCreateIssueMutation.graphql";
import { NewIssueRepositoryQuery } from "./__generated__/NewIssueRepositoryQuery.graphql";

const respositoryQuery = graphql`
  query NewIssueRepositoryQuery($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      id
      name
      owner {
        login
      }
    }
  }
`;

export const loader: LoaderFunction = async () => {
  return {
    repositoryQuery: loadQuery(RelayEnvironment, respositoryQuery, {
      owner: "azukiazusa1",
      name: "relay-issue-tracker-example",
    }),
  };
};

type LoaderData = {
  rootQuery(respositoryQuery: GraphQLTaggedNode, rootQuery: any): unknown;
  repositoryQuery: PreloadedQuery<NewIssueRepositoryQuery>;
};

const CreateIssueMutation = graphql`
  mutation NewIssueCreateIssueMutation($input: CreateIssueInput!) {
    createIssue(input: $input) {
      issue {
        id
        title
      }
    }
  }
`;

const NewIssue = () => {
  const loaderData = useLoaderData() as LoaderData;
  const data = usePreloadedQuery(respositoryQuery, loaderData.repositoryQuery);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState<PayloadError[] | null>(null);

  const [createIssue, isCreateIssuePending] =
    useMutation<NewIssueCreateIssueMutation>(CreateIssueMutation);
  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      createIssue({
        variables: {
          input: {
            title,
            body,
            repositoryId: data.repository?.id!,
          },
        },
        onCompleted: (_, e) => {
          if (e) {
            setError(e);
          } else {
            navigate("/");
          }
        },
        updater: (store) => {
          const payload = store.getRootField("createIssue");
          const newIssue = payload.getLinkedRecord("issue");
          const repository = store.getRoot();
          console.log(repository, "repository");
          const connection = ConnectionHandler.getConnection(
            repository!,
            "Issue_issues"
          );
          console.log(newIssue);
          console.log(connection);
          if (connection) {
            ConnectionHandler.insertEdgeBefore(connection, newIssue);
          }
        },
      });
    },
    [createIssue, title, body, data.repository?.id, navigate]
  );

  return (
    <form onSubmit={onSubmit}>
      <h2>Create Issue for {data.repository?.name}</h2>
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="body">Body</label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <button type="submit" disabled={isCreateIssuePending}>
        Create Issue
      </button>
      {error && error.map((e) => <div key={e.message}>{e.message}</div>)}
    </form>
  );
};

export default NewIssue;
