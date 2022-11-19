import graphql from "babel-plugin-relay/macro";
import {
  loadQuery,
  PreloadedQuery,
  usePreloadedQuery,
} from "react-relay/hooks";
import { LoaderFunction, useLoaderData } from "react-router";
import RelayEnvironment from "./RelayEnvironment";
import ReactMarkdown from "react-markdown";
import { IssueDetailRootQuery } from "./__generated__/IssueDetailRootQuery.graphql";
import IssueDetailComments from "./IssueDetailComments";
import IssueActions from "./IssueActions";

const issueDetailRootQuery = graphql`
  query IssueDetailRootQuery($id: ID!) {
    node(id: $id) {
      ... on Issue {
        title
        number
        author {
          login
          avatarUrl
        }
        body
        closed
        url
        ...IssueDetailComments_issue
        ...IssueActions_issue
      }
    }
  }
`;

export const loader: LoaderFunction = async ({ params }) => {
  return {
    issueDetailRootQuery: loadQuery(RelayEnvironment, issueDetailRootQuery, {
      id: params.issueId,
    }),
  };
};

type LoaderData = {
  issueDetailRootQuery: PreloadedQuery<IssueDetailRootQuery>;
};

const IssueDetail = () => {
  const loaderData = useLoaderData() as LoaderData;
  const { node: issue } = usePreloadedQuery(
    issueDetailRootQuery,
    loaderData.issueDetailRootQuery
  );

  if (!issue) {
    return <div>Issue not found</div>;
  }

  return (
    <div className="issue">
      <div className="issue-title">
        #{issue.number} {issue.title} - {issue.closed ? "Closed" : "Open"}
        <a href={issue.url as string} className="issue-title-github-link">
          View on GitHub
        </a>
      </div>
      <div className="issue-comment">
        <img
          className="issue-comment-author-image"
          src={issue.author?.avatarUrl as string}
          alt={issue.author?.login as string}
        />
        <div className="issue-comment-author-name">{issue.author?.login}</div>
        <div className="issue-comment-body">
          <ReactMarkdown>{issue?.body ?? ""}</ReactMarkdown>
        </div>
        <IssueDetailComments issue={issue} />
        <IssueActions issue={issue} />
      </div>
    </div>
  );
};

export default IssueDetail;
