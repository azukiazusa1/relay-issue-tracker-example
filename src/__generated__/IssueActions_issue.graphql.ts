/**
 * @generated SignedSource<<060fba91e70fffb83466462d68ecc2ae>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type IssueActions_issue$data = {
  readonly closed: boolean;
  readonly id: string;
  readonly " $fragmentType": "IssueActions_issue";
};
export type IssueActions_issue$key = {
  readonly " $data"?: IssueActions_issue$data;
  readonly " $fragmentSpreads": FragmentRefs<"IssueActions_issue">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "IssueActions_issue",
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
      "name": "closed",
      "storageKey": null
    }
  ],
  "type": "Issue",
  "abstractKey": null
};

(node as any).hash = "12c79d27df99eb9656621cead33c9d08";

export default node;
