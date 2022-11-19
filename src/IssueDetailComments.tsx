import { usePaginationFragment } from "react-relay/hooks";
import graphql from "babel-plugin-relay/macro";
import { IssueDetailComments_issue$key } from "./__generated__/IssueDetailComments_issue.graphql";
import { useCallback } from "react";
import ReactMarkdown from "react-markdown";

type Props = {
  issue: IssueDetailComments_issue$key;
};

const IssueDetail = (props: Props) => {
  const { data, hasNext, loadNext, isLoadingNext } = usePaginationFragment(
    graphql`
      fragment IssueDetailComments_issue on Issue
      @argumentDefinitions(
        cursor: { type: "String" }
        count: { type: "Int", defaultValue: 10 }
      )
      @refetchable(queryName: "IssueDetailCommentsQuery") {
        comments(after: $cursor, first: $count)
          @connection(key: "IssueDetailComments_comments") {
          edges {
            __id
            node {
              id
              body
              author {
                login
                avatarUrl
              }
            }
          }
        }
      }
    `,
    props.issue
  );

  const loadMore = useCallback(() => {
    if (isLoadingNext) {
      return;
    }
    loadNext(10);
  }, [isLoadingNext, loadNext]);

  const comments = data?.comments.edges;
  if (comments == null || comments.length === 0) {
    return <div className="issue-no-comments">No comments</div>;
  }

  return (
    <>
      {comments.map((edge) => {
        if (edge == null || edge.node == null) return null;
        const { node: comment } = edge;
        return (
          <div className="issue-comment" key={edge.__id}>
            <img
              className="issue-comment-author-image"
              src={comment.author?.avatarUrl}
              alt={comment.author?.login}
            />
            <div className="issue-comment-author-name">
              {comment.author?.login}
            </div>
            <div className="issue-comment-body">
              <ReactMarkdown>{comment.body}</ReactMarkdown>
            </div>
          </div>
        );
      })}
      {hasNext ? (
        <button
          type="button"
          className="issue-comments-load-more"
          onClick={loadMore}
        >
          {isLoadingNext ? "Loading..." : "Load More"}
        </button>
      ) : null}
    </>
  );
};

export default IssueDetail;
