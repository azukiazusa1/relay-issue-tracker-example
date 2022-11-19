import { createBrowserRouter } from "react-router-dom";
import Home, { loader as HomeLoader } from "../Home";
import IssueDetail, { loader as IssueDetailLoader } from "../IssueDetail";
import NewIssue, { loader as newIssueLoader } from "../NewIssue";
import Root, { loader as RootLoader } from "../Root";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: HomeLoader,
      },
      {
        path: "new-issue",
        element: <NewIssue />,
        loader: newIssueLoader,
      },
      {
        path: "/issue/:issueId",
        element: <IssueDetail />,
        loader: IssueDetailLoader,
      },
    ],
  },
]);
