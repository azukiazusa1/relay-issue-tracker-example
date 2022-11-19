/**
 * @generated SignedSource<<45eb72c8799307e3a1d093cf111a0620>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type IssueListItem_issue$data = {
  readonly id: string;
  readonly title: string;
  readonly " $fragmentType": "IssueListItem_issue";
};
export type IssueListItem_issue$key = {
  readonly " $data"?: IssueListItem_issue$data;
  readonly " $fragmentSpreads": FragmentRefs<"IssueListItem_issue">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "IssueListItem_issue",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    }
  ],
  "type": "Issue",
  "abstractKey": null
};

(node as any).hash = "3d4a1f32013aca926236a60256c1f43e";

export default node;
