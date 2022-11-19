import { usePaginationFragment } from "react-relay/hooks";
import graphql from "babel-plugin-relay/macro";
import { useCallback } from "react";
import IssueListItem from "./IssueListItem";
import { Issue_repository$key } from "./__generated__/Issue_repository.graphql";
import { Link } from "react-router-dom";

type Props = {
  repository: Issue_repository$key;
};

const Issue = (props: Props) => {
  const { data, loadNext, isLoadingNext } = usePaginationFragment(
    graphql`
      fragment Issue_repository on Repository
      @argumentDefinitions(
        cursor: { type: "String" }
        count: { type: "Int", defaultValue: 100 }
        states: { type: "[IssueState!]", defaultValue: [OPEN] }
      )
      @refetchable(queryName: "IssuesPaginationQuery") {
        __typename
        issues(after: $cursor, first: $count, states: $states)
          @connection(key: "Issue_issues") {
          edges {
            __id
            node {
              ...IssueListItem_issue
            }
          }
        }
      }
    `,
    props.repository
  );

  const loadMore = useCallback(() => {
    if (isLoadingNext) {
      return;
    }
    loadNext(10);
  }, [isLoadingNext, loadNext]);

  return (
    <div className="issues">
      <Link to="/new-issue" className="new-issue">
        New Issue
      </Link>
      {data?.issues.edges?.map((edge) => {
        if (edge == null || edge.node == null) return null;

        return (
          <div className="issue-issue" key={edge.__id}>
            <IssueListItem issue={edge.node} />
          </div>
        );
      })}
      <button type="button" className="issues-load-more" onClick={loadMore}>
        {isLoadingNext ? "Loading..." : "Load More"}
      </button>
    </div>
  );
};

export default Issue;
