/**
 * @generated SignedSource<<056317c6e6310e6fac73d4a724dbbdf3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CloseIssueInput = {
  clientMutationId?: string | null;
  issueId: string;
};
export type IssueActionsCloseIssueMutation$variables = {
  input: CloseIssueInput;
};
export type IssueActionsCloseIssueMutation$data = {
  readonly closeIssue: {
    readonly issue: {
      readonly closed: boolean;
    } | null;
  } | null;
};
export type IssueActionsCloseIssueMutation = {
  response: IssueActionsCloseIssueMutation$data;
  variables: IssueActionsCloseIssueMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "closed",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "IssueActionsCloseIssueMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CloseIssuePayload",
        "kind": "LinkedField",
        "name": "closeIssue",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Issue",
            "kind": "LinkedField",
            "name": "issue",
            "plural": false,
            "selections": [
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "IssueActionsCloseIssueMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CloseIssuePayload",
        "kind": "LinkedField",
        "name": "closeIssue",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Issue",
            "kind": "LinkedField",
            "name": "issue",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f9a79bf09d01cf694389761b6824ebd0",
    "id": null,
    "metadata": {},
    "name": "IssueActionsCloseIssueMutation",
    "operationKind": "mutation",
    "text": "mutation IssueActionsCloseIssueMutation(\n  $input: CloseIssueInput!\n) {\n  closeIssue(input: $input) {\n    issue {\n      closed\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "51e445c25b3f4b3c48c3d6ca6c5f2f5a";

export default node;
