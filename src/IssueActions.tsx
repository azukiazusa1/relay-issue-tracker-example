import graphql from "babel-plugin-relay/macro";
import React, { useCallback, useState } from "react";
import { ConnectionHandler, useFragment, useMutation } from "react-relay/hooks";
import { IssueActionsAddCommentMutation } from "./__generated__/IssueActionsAddCommentMutation.graphql";
import { IssueActionsCloseIssueMutation } from "./__generated__/IssueActionsCloseIssueMutation.graphql";
import { IssueActionsReopenIssueMutation } from "./__generated__/IssueActionsReopenIssueMutation.graphql";
import { IssueActions_issue$key } from "./__generated__/IssueActions_issue.graphql";

const AddCommentMutation = graphql`
  mutation IssueActionsAddCommentMutation($input: AddCommentInput!) {
    addComment(input: $input) {
      subject {
        id
      }
      commentEdge {
        __id
        node {
          id
          author {
            login
            avatarUrl
          }
          body
        }
      }
    }
  }
`;

const CloseIssueMutation = graphql`
  mutation IssueActionsCloseIssueMutation($input: CloseIssueInput!) {
    closeIssue(input: $input) {
      issue {
        closed
      }
    }
  }
`;

const ReopenIssueMutation = graphql`
  mutation IssueActionsReopenIssueMutation($input: ReopenIssueInput!) {
    reopenIssue(input: $input) {
      issue {
        closed
      }
    }
  }
`;

type Props = {
  issue: IssueActions_issue$key;
};

const IssueActions = (props: Props) => {
  const [comment, setComments] = useState("");

  const [addComment, isAddCommentPending] =
    useMutation<IssueActionsAddCommentMutation>(AddCommentMutation);

  const [closeIssue, isCloseIssuePending] =
    useMutation<IssueActionsCloseIssueMutation>(CloseIssueMutation);

  const [reopenIssue, isReopenIssuePending] =
    useMutation<IssueActionsReopenIssueMutation>(ReopenIssueMutation);

  const isPending =
    isAddCommentPending || isCloseIssuePending || isReopenIssuePending;

  const data = useFragment(
    graphql`
      fragment IssueActions_issue on Issue {
        id
        closed
      }
    `,
    props.issue
  );

  const issueId = data.id;

  const onChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComments(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      addComment({
        variables: {
          input: {
            subjectId: issueId,
            body: comment,
          },
        },
        onCompleted: () => {
          setComments("");
        },
        updater: (store) => {
          const issue = store.get(issueId);
          if (issue == null) return;

          const comments = ConnectionHandler.getConnection(
            issue,
            "IssueDetailComments_comments"
          );
          if (comments == null) return;

          ConnectionHandler.insertEdgeAfter(
            comments,
            store.getRootField("addComment")?.getLinkedRecord("commentEdge")!,
            null
          );
        },
      });
    },
    [addComment, comment, issueId]
  );

  const onToggleOpen = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      const config = {
        variables: {
          input: {
            issueId,
          },
        },
      };
      if (data.closed) {
        reopenIssue(config);
      } else {
        closeIssue(config);
      }
    },
    [closeIssue, data.closed, issueId, reopenIssue]
  );

  return (
    <form className="issue-actions" onSubmit={onSubmit}>
      <textarea
        className="issue-actions-text"
        onChange={onChange}
        value={comment}
        placeholder="Leave a comment"
      />
      <button
        className="issue-actions-button"
        type="submit"
        disabled={isPending || comment.trim() === ""}
      >
        Comment
      </button>
      <button
        className="issue-actions-button"
        type="button"
        onClick={onToggleOpen}
      >
        {data.closed ? "Reopen" : "Close"}
      </button>
    </form>
  );
};

export default IssueActions;
