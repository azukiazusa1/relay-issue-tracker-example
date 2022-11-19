import { useFragment } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { Link } from "react-router-dom";
import { IssueListItem_issue$key } from "./__generated__/IssueListItem_issue.graphql";

type Props = {
  issue: IssueListItem_issue$key;
};

const IssueListItem = (props: Props) => {
  const issue = useFragment(
    graphql`
      fragment IssueListItem_issue on Issue {
        id
        title
      }
    `,
    props.issue
  );
  return (
    <Link to={`/issue/${issue.id}`} className="issue-list-item">
      {issue.title}
    </Link>
  );
};

export default IssueListItem;
