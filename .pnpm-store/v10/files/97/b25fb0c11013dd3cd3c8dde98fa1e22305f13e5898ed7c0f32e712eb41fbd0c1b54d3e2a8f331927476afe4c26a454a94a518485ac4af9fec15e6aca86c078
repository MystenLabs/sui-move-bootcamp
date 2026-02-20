import { IntrospectionQuery, GraphQLSchema } from 'graphql';
import ts from 'typescript';
import { TsConfigJson } from 'type-fest';

interface IntrospectionResult extends IntrospectionQuery {
  name: string | undefined;
}
interface SchemaLoaderResult {
  introspection: IntrospectionResult;
  schema: GraphQLSchema;
  tadaOutputLocation?: string;
  tadaTurboLocation?: string;
  tadaPersistedLocation?: string;
}
type OnSchemaUpdate = (result: SchemaLoaderResult) => void;
interface SchemaLoader {
  readonly name: string | undefined;
  load(reload?: boolean): Promise<SchemaLoaderResult>;
  notifyOnUpdate(onUpdate: OnSchemaUpdate): () => void;
  /** @internal */
  loadIntrospection(): Promise<IntrospectionResult | null>;
  /** @internal */
  loadSchema(): Promise<GraphQLSchema | null>;
}
interface BaseLoadConfig {
  rootPath?: string;
  fetchInterval?: number;
  assumeValid?: boolean;
}
type SingleSchemaInput = {
  name?: string;
  schema: SchemaOrigin;
  tadaOutputLocation?: string;
  tadaTurboLocation?: string;
  tadaPersistedLocation?: string;
};
type MultiSchemaInput = {
  schemas?: SingleSchemaInput[];
};
interface SchemaRef<Result = SchemaLoaderResult | null> {
  /** Starts automatically updating the ref */
  autoupdate(
    config: BaseLoadConfig,
    onUpdate: (ref: SchemaRef<Result>, input: SingleSchemaInput) => void
  ): () => void;
  /** Loads the initial result for the schema */
  load(config: BaseLoadConfig): Promise<SchemaRef<SchemaLoaderResult>>;
  current: Result;
  multi: {
    [name: string]: Result;
  };
  version: number;
}
type SchemaOrigin =
  | string
  | {
      url: string;
      headers?: HeadersInit;
    };

interface LoadFromSDLConfig {
  name?: string;
  assumeValid?: boolean;
  file: string;
}
declare function loadFromSDL(config: LoadFromSDLConfig): SchemaLoader;

interface LoadFromURLConfig {
  name?: string;
  url: URL | string;
  headers?: HeadersInit;
  interval?: number;
}
declare function loadFromURL(config: LoadFromURLConfig): SchemaLoader;

declare const getURLConfig: (origin: SchemaOrigin | null) => {
  url: URL;
  headers: HeadersInit | undefined;
} | null;
interface LoadConfig extends BaseLoadConfig {
  name?: string;
  origin: SchemaOrigin;
}
declare function load(config: LoadConfig): SchemaLoader;
declare function loadRef(
  input: SingleSchemaInput | MultiSchemaInput | (SingleSchemaInput & MultiSchemaInput)
): SchemaRef;

declare class TSError extends Error {
  readonly name: 'TSError';
  readonly diagnostic: ts.Diagnostic;
  constructor(diagnostic: ts.Diagnostic);
}
declare class TadaError extends Error {
  readonly name: 'TadaError';
  constructor(message: string);
}

interface BaseConfig {
  template?: string;
  trackFieldUsage?: boolean;
  shouldCheckForColocatedFragments?: boolean;
}
interface SchemaConfig {
  name?: string;
  schema: SchemaOrigin;
  tadaOutputLocation?: string;
  tadaTurboLocation?: string;
  tadaPersistedLocation?: string;
}
interface MultiSchemaConfig extends SchemaConfig {
  name: string;
}
type GraphQLSPConfig = BaseConfig &
  (
    | SchemaConfig
    | {
        schemas: MultiSchemaConfig[];
      }
  );
declare const parseConfig: (input: unknown, rootPath?: string) => GraphQLSPConfig;
declare const getSchemaNamesFromConfig: (config: GraphQLSPConfig) => Set<null | string>;
declare const getSchemaConfigForName: (
  config: GraphQLSPConfig,
  name: string | undefined
) => SchemaConfig | null;

declare const readTSConfigFile: (filePath: string) => Promise<TsConfigJson>;
declare const findTSConfigFile: (targetPath?: string) => Promise<string | null>;
interface LoadConfigResult {
  pluginConfig: Record<string, unknown>;
  configPath: string;
  rootPath: string;
}
declare const loadConfig: (targetPath?: string) => Promise<LoadConfigResult>;
/** @deprecated Use {@link loadConfig} instead */
declare const resolveTypeScriptRootDir: (tsconfigPath: string) => Promise<string | undefined>;

/** Minifies an {@link IntrospectionQuery} for use with Graphcache or the `populateExchange`.
 *
 * @param schema - An {@link IntrospectionQuery} object to be minified.
 * @param opts - An optional {@link MinifySchemaOptions} configuration object.
 * @returns the minified {@link IntrospectionQuery} object.
 *
 * @remarks
 * `minifyIntrospectionQuery` reduces the size of an {@link IntrospectionQuery} by
 * removing data and information that a client-side consumer, like Graphcache or the
 * `populateExchange`, may not require.
 *
 * At the very least, it will remove system types, descriptions, depreactions,
 * and source locations. Unless disabled via the options passed, it will also
 * by default remove all scalars, enums, inputs, and directives.
 *
 * @throws
 * If `schema` receives an object that isn’t an {@link IntrospectionQuery}, a
 * {@link TypeError} will be thrown.
 */
declare const minifyIntrospectionQuery: (
  schema: IntrospectionQuery | IntrospectionResult
) => IntrospectionResult;

declare function preprocessIntrospection(
  introspection: IntrospectionResult | IntrospectionQuery,
  typesStr?: string
): string;

interface OutputIntrospectionFileOptions {
  fileType: '.ts' | '.d.ts' | string;
  shouldPreprocess?: boolean;
}
declare function outputIntrospectionFile(
  introspection: IntrospectionQuery | IntrospectionResult,
  opts: OutputIntrospectionFileOptions
): string;

export {
  type BaseConfig,
  type BaseLoadConfig,
  type GraphQLSPConfig,
  type IntrospectionResult,
  type LoadConfig,
  type LoadConfigResult,
  type MultiSchemaInput,
  type OnSchemaUpdate,
  type SchemaConfig,
  type SchemaLoader,
  type SchemaLoaderResult,
  type SchemaOrigin,
  type SchemaRef,
  type SingleSchemaInput,
  TSError,
  TadaError,
  findTSConfigFile,
  getSchemaConfigForName,
  getSchemaNamesFromConfig,
  getURLConfig,
  load,
  loadConfig,
  loadFromSDL,
  loadFromURL,
  loadRef,
  minifyIntrospectionQuery as minifyIntrospection,
  outputIntrospectionFile,
  parseConfig,
  preprocessIntrospection,
  readTSConfigFile,
  resolveTypeScriptRootDir,
};
