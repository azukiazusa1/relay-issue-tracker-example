/**
 * @generated SignedSource<<2480dd3cc4d88a63b0392a6edf1e3a19>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateIssueInput = {
  assigneeIds?: ReadonlyArray<string> | null;
  body?: string | null;
  clientMutationId?: string | null;
  labelIds?: ReadonlyArray<string> | null;
  milestoneId?: string | null;
  projectIds?: ReadonlyArray<string> | null;
  repositoryId: string;
  title: string;
};
export type NewIssueCreateIssueMutation$variables = {
  input: CreateIssueInput;
};
export type NewIssueCreateIssueMutation$data = {
  readonly createIssue: {
    readonly issue: {
      readonly id: string;
      readonly title: string;
    } | null;
  } | null;
};
export type NewIssueCreateIssueMutation = {
  response: NewIssueCreateIssueMutation$data;
  variables: NewIssueCreateIssueMutation$variables;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "CreateIssuePayload",
    "kind": "LinkedField",
    "name": "createIssue",
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
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "NewIssueCreateIssueMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "NewIssueCreateIssueMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "9f52d1faed68f46e7cc0fc094668bf3c",
    "id": null,
    "metadata": {},
    "name": "NewIssueCreateIssueMutation",
    "operationKind": "mutation",
    "text": "mutation NewIssueCreateIssueMutation(\n  $input: CreateIssueInput!\n) {\n  createIssue(input: $input) {\n    issue {\n      id\n      title\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "2ffe22fd476a4908408edc827e20bb07";

export default node;
