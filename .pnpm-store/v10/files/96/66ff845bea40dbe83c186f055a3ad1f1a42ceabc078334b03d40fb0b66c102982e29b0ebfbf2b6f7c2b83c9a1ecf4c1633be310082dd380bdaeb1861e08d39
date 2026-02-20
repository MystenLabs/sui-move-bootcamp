import ts from 'typescript/lib/tsserverlibrary';
import { SchemaRef as SchemaRef$1, SchemaLoaderResult } from '@gql.tada/internal';
/*!@ts-ignore*/
import { FragmentDefinitionNode } from 'graphql';

declare function init(modules: { typescript: typeof ts }): void;

type SchemaRef = SchemaRef$1<SchemaLoaderResult | null>;

declare function getGraphQLDiagnostics(
  filename: string,
  schema: SchemaRef,
  info: ts.server.PluginCreateInfo
): ts.Diagnostic[] | undefined;

declare function unrollTadaFragments(
  fragmentsArray: ts.ArrayLiteralExpression,
  wip: FragmentDefinitionNode[],
  info: ts.server.PluginCreateInfo
): FragmentDefinitionNode[];
declare function findAllCallExpressions(
  sourceFile: ts.SourceFile,
  info: ts.server.PluginCreateInfo,
  shouldSearchFragments?: boolean
): {
  nodes: Array<{
    node: ts.StringLiteralLike;
    schema: string | null;
  }>;
  fragments: Array<FragmentDefinitionNode>;
};
declare function findAllPersistedCallExpressions(
  sourceFile: ts.SourceFile
): Array<ts.CallExpression>;
declare function findAllPersistedCallExpressions(
  sourceFile: ts.SourceFile,
  info: ts.server.PluginCreateInfo
): Array<{
  node: ts.CallExpression;
  schema: string | null;
}>;

declare const getDocumentReferenceFromTypeQuery: (
  typeQuery: ts.TypeQueryNode,
  filename: string,
  info: ts.server.PluginCreateInfo
) => {
  node: ts.CallExpression | null;
  filename: string;
};
declare const getDocumentReferenceFromDocumentNode: (
  documentNodeArgument: ts.Identifier | ts.CallExpression,
  filename: string,
  info: ts.server.PluginCreateInfo
) => {
  node: ts.CallExpression | null;
  filename: string;
};

export {
  findAllCallExpressions,
  findAllPersistedCallExpressions,
  getDocumentReferenceFromDocumentNode,
  getDocumentReferenceFromTypeQuery,
  getGraphQLDiagnostics,
  init,
  unrollTadaFragments,
};
