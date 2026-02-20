interface OutputOptions {
  /** Whether to output the `.ts` format when the CLI's standard output is piped to an output file.
   * @defaultValue `false` */
  forceTSFormat?: boolean;
  /** Whether to disable the optimized output format for `.d.ts` files.
   * @defaultValue `false` */
  disablePreprocessing?: boolean;
  /** The filename to write the cache file to.
   * @defaultValue The `tadaTurboLocation` configuration option */
  output: string | undefined;
  /** The `tsconfig.json` to use for configurations and the TypeScript program.
   * @defaultValue A `tsconfig.json` in the current or any parent directory. */
  tsconfig: string | undefined;
}

/** Outputs the `gql.tada` output file manually.
 *
 * @remarks
 * Loads the schema from the specified `schema` configuration option and writes the output file
 * to the specified output location.
 *
 * @see {@link https://gql-tada.0no.co/reference/gql-tada-cli#generateoutput}
 */
declare function generateOutput(opts: OutputOptions): Promise<void>;

interface PersistedOptions {
  /** Whether to disable normalization of GraphQL documents in the output.
   * @defaultValue `false`
   * @remarks
   * Normalizing a GraphQL document means to parse then print them, which
   * removes comments and normalizes formatting.
   */
  disableNormalization?: boolean;
  /** The `tsconfig.json` to use for configurations and the TypeScript program.
   * @defaultValue A `tsconfig.json` in the current or any parent directory. */
  tsconfig: string | undefined;
  /** The filename to write the persisted JSON manifest to.
   * @defaultValue The `schema` configuration option */
  output: string | undefined;
  /** Whether to fail instead of just logging a warning. */
  failOnWarn: boolean;
}

/** Generates a JSON manifest file of all `graphql.persisted()` documents.
 *
 * @remarks
 * Scans your code for `graphql.persisted()` calls and generates a JSON
 * manifest file containing a mapping of document IDs to the GraphQL document strings.
 *
 * @see {@link https://gql-tada.0no.co/reference/gql-tada-cli#generatepersisted}
 */
declare function generatePersisted(opts: PersistedOptions): Promise<void>;

interface SchemaOptions {
  /** The filename to a `.graphql` SDL file, introspection JSON, or URL to a GraphQL API to introspect. */
  input: string;
  /** Object of headers to send when introspection a GraphQL API. */
  headers: Record<string, string> | undefined;
  /** The filename to write the GraphQL SDL file to.
   * @defaultValue The `schema` configuration option */
  output: string | undefined;
  /** The `tsconfig.json` to use for configurations and the TypeScript program.
   * @defaultValue A `tsconfig.json` in the current or any parent directory. */
  tsconfig: string | undefined;
}

/** Generates a GraphQL SDL file from a given GraphQL API URL or schema file.
 *
 * @remarks
 * Introspects a targeted GraphQL API by URL, a `.graphql` SDL or introspection
 * JSON file, and outputs a `.graphql` SDL file.
 *
 * @see {@link https://gql-tada.0no.co/reference/gql-tada-cli#generateschema}
 */
declare function generateSchema(opts: SchemaOptions): Promise<void>;

interface TurboOptions {
  /** Whether to fail instead of just logging a warning. */
  failOnWarn: boolean;
  /** The `tsconfig.json` to use for configurations and the TypeScript program.
   * @defaultValue A `tsconfig.json` in the current or any parent directory. */
  tsconfig: string | undefined;
  /** The filename to write the cache file to.
   * @defaultValue The `tadaTurboLocation` configuration option */
  output: string | undefined;
}

/** Generates a cache typings file for all GraphQL document types ahead of time.
 *
 * @remarks
 * The `generateTurbo()` function generates a cache for all GraphQL document types ahead of time.
 * This cache speeds up type evaluation and is especially useful when it's checked into the
 * repository after making changes to GraphQL documents, which speeds up all further type
 * checks and evaluation.
 *
 * @see {@link https://gql-tada.0no.co/reference/gql-tada-cli#generateturbo}
 */
declare function generateTurbo(opts: TurboOptions): Promise<void>;

declare const api_generateOutput: typeof generateOutput;
declare const api_generatePersisted: typeof generatePersisted;
declare const api_generateSchema: typeof generateSchema;
declare const api_generateTurbo: typeof generateTurbo;
declare namespace api {
  export {
    api_generateOutput as generateOutput,
    api_generatePersisted as generatePersisted,
    api_generateSchema as generateSchema,
    api_generateTurbo as generateTurbo,
  };
}

declare function _main(): Promise<void>;
type MainFn = typeof _main & typeof api;
declare const main: MainFn;

export { main as default, generateOutput, generatePersisted, generateSchema, generateTurbo };
