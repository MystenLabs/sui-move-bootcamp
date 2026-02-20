import { Kind, OperationTypeNode, DocumentNode, DefinitionNode } from '@0no-co/graphql.web';

/** Returns `T` if it matches `Constraint` without being equal to it. Failing this evaluates to `Fallback` otherwise. */
type matchOr<Constraint, T, Fallback> = Constraint extends T
  ? Fallback
  : T extends Constraint
    ? T
    : Fallback;
/** Flattens a given object type.
 *
 * @remarks
 * This is typically used to make a TypeScript type appear as a flat object,
 * both in terms of type checking and for type hints and the tsserver output.
 */
type obj<T> = T extends {
  [key: string | number]: any;
}
  ? {
      [K in keyof T]: T[K];
    }
  : never;
/** Turns a given union to an intersection type. */
type overload<T> = (T extends any ? (x: T) => void : never) extends (x: infer U) => void
  ? U & T
  : never;
/** Annotations for GraphQL’s `DocumentNode` with attached generics for its result data and variables types.
 *
 * @remarks
 * A GraphQL {@link DocumentNode} defines both the variables it accepts on request and the `data`
 * shape it delivers on a response in the GraphQL query language.
 *
 * To bridge the gap to TypeScript, tools may be used to generate TypeScript types that define the shape
 * of `data` and `variables` ahead of time. These types are then attached to GraphQL documents using this
 * `TypedDocumentNode` type.
 *
 * Using a `DocumentNode` that is typed like this will cause any `urql` API to type its input `variables`
 * and resulting `data` using the types provided.
 *
 * @privateRemarks
 * For compatibility reasons this type has been copied and internalized from:
 * https://github.com/dotansimha/graphql-typed-document-node/blob/3711b12/packages/core/src/index.ts#L3-L10
 *
 * @see {@link https://github.com/dotansimha/graphql-typed-document-node} for more information.
 */
interface DocumentDecoration<Result = any, Variables = any> {
  /** Type to support `@graphql-typed-document-node/core`
   * @internal
   */
  __apiType?: (variables: Variables) => Result;
  /** Type to support `TypedQueryDocumentNode` from `graphql`
   * @internal
   */
  __ensureTypesOfVariablesAndResultMatching?: (variables: Variables) => Result;
}

/** Format of introspection data queryied from your schema.
 *
 * @remarks
 * You must provide your introspected schema in the standard introspection
 * format (as represented by this type) to `setupSchema` to configure this
 * library to use your types.
 *
 * @see {@link setupSchema} for where to use this data.
 */
interface IntrospectionQuery {
  /** This identifies the schema in a "multi-schema" configuration */
  readonly name?: string;
  readonly __schema: IntrospectionSchema;
}
interface IntrospectionSchema {
  readonly queryType: IntrospectionNamedTypeRef;
  readonly mutationType?: IntrospectionNamedTypeRef | null;
  readonly subscriptionType?: IntrospectionNamedTypeRef | null;
  readonly types: readonly any[];
}
interface IntrospectionObjectType {
  readonly kind: 'OBJECT';
  readonly name: string;
  readonly fields: readonly any[];
}
interface IntrospectionInterfaceType {
  readonly kind: 'INTERFACE';
  readonly name: string;
  readonly fields: readonly any[];
  readonly possibleTypes: readonly any[];
}
interface IntrospectionUnionType {
  readonly kind: 'UNION';
  readonly name: string;
  readonly possibleTypes: readonly any[];
}
interface IntrospectionEnumType {
  readonly kind: 'ENUM';
  readonly name: string;
  readonly enumValues: readonly any[];
}
interface IntrospectionInputObjectType {
  readonly kind: 'INPUT_OBJECT';
  readonly name: string;
  readonly isOneOf?: boolean;
  readonly inputFields: readonly any[];
}
interface IntrospectionListTypeRef {
  readonly kind: 'LIST';
  readonly ofType: IntrospectionTypeRef;
}
interface IntrospectionNonNullTypeRef {
  readonly kind: 'NON_NULL';
  readonly ofType: IntrospectionTypeRef;
}
type IntrospectionTypeRef =
  | IntrospectionNamedTypeRef
  | IntrospectionListTypeRef
  | IntrospectionNonNullTypeRef;
interface IntrospectionNamedTypeRef {
  readonly name: string;
}
interface IntrospectionField {
  readonly name: string;
  readonly type: IntrospectionTypeRef;
}
interface DefaultScalars {
  readonly ID: string;
  readonly Boolean: boolean;
  readonly String: string;
  readonly Float: number;
  readonly Int: number;
}
type mapEnum<T extends IntrospectionEnumType> = {
  name: T['name'];
  enumValues: T['enumValues'][number]['name'];
};
type mapField<T> = T extends IntrospectionField
  ? {
      name: T['name'];
      type: T['type'];
    }
  : never;
type mapObject<T extends IntrospectionObjectType> = {
  kind: 'OBJECT';
  name: T['name'];
  fields: obj<{
    [P in T['fields'][number]['name']]: T['fields'][number] extends infer Field
      ? Field extends {
          readonly name: P;
        }
        ? mapField<Field>
        : never
      : never;
  }>;
};
type mapInputObject<T extends IntrospectionInputObjectType> = {
  kind: 'INPUT_OBJECT';
  name: T['name'];
  isOneOf: T['isOneOf'] extends boolean ? T['isOneOf'] : false;
  inputFields: [...T['inputFields']];
};
type mapInterface<T extends IntrospectionInterfaceType> = {
  kind: 'INTERFACE';
  name: T['name'];
  possibleTypes: T['possibleTypes'][number]['name'];
  fields: obj<{
    [P in T['fields'][number]['name']]: T['fields'][number] extends infer Field
      ? Field extends {
          readonly name: P;
        }
        ? mapField<Field>
        : never
      : never;
  }>;
};
type mapUnion<T extends IntrospectionUnionType> = {
  kind: 'UNION';
  name: T['name'];
  fields: {};
  possibleTypes: T['possibleTypes'][number]['name'];
};
/** @internal */
type mapType<Type> = Type extends IntrospectionEnumType
  ? mapEnum<Type>
  : Type extends IntrospectionObjectType
    ? mapObject<Type>
    : Type extends IntrospectionInterfaceType
      ? mapInterface<Type>
      : Type extends IntrospectionUnionType
        ? mapUnion<Type>
        : Type extends IntrospectionInputObjectType
          ? mapInputObject<Type>
          : unknown;
/** @internal */
type mapIntrospectionTypes<Query extends IntrospectionQuery> = obj<{
  [P in Query['__schema']['types'][number]['name']]: Query['__schema']['types'][number] extends infer Type
    ? Type extends {
        readonly name: P;
      }
      ? mapType<Type>
      : never
    : never;
}>;
/** @internal */
type mapIntrospectionScalarTypes<Scalars extends ScalarsLike = DefaultScalars> = obj<{
  [P in keyof Scalars | keyof DefaultScalars]: {
    name: P;
    type: P extends keyof Scalars
      ? Scalars[P]
      : P extends keyof DefaultScalars
        ? DefaultScalars[P]
        : never;
  };
}>;
/** @internal */
type mapIntrospection<Query extends IntrospectionLikeInput> = Query extends IntrospectionQuery
  ? {
      name: Query['name'];
      query: Query['__schema']['queryType']['name'];
      mutation: Query['__schema']['mutationType'] extends {
        name: string;
      }
        ? Query['__schema']['mutationType']['name']
        : never;
      subscription: Query['__schema']['subscriptionType'] extends {
        name: string;
      }
        ? Query['__schema']['subscriptionType']['name']
        : never;
      types: mapIntrospectionTypes<Query>;
    }
  : Query;
type addIntrospectionScalars<
  Schema extends SchemaLike,
  Scalars extends ScalarsLike = DefaultScalars,
> = {
  name: Schema['name'];
  query: Schema['query'];
  mutation: Schema['mutation'];
  subscription: Schema['subscription'];
  types: mapIntrospectionScalarTypes<Scalars> & Schema['types'];
};
/** Either a format of introspection data or an already preprocessed schema.
 * @see {@link IntrospectionQuery} */
type IntrospectionLikeInput = SchemaLike | IntrospectionQuery;
type ScalarsLike = {
  readonly [name: string]: any;
};
type SchemaLike = {
  name?: any;
  query: string;
  mutation?: any;
  subscription?: any;
  types: {
    [name: string]: any;
  };
};

declare const enum Token {
  Name = 0,
  Var = 1,
  Directive = 2,
  Spread = 3,
  Exclam = 4,
  Equal = 5,
  Colon = 6,
  BraceOpen = 7,
  BraceClose = 8,
  ParenOpen = 9,
  ParenClose = 10,
  BracketOpen = 11,
  BracketClose = 12,
  BlockString = 13,
  String = 14,
  Integer = 15,
  Float = 16,
}
interface _match$1<Out extends string, In extends string> {
  out: Out;
  in: In;
}
type ignored = ' ' | '\n' | '\t' | '\r' | ',' | '\ufeff';
type digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
type letter =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z'
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z';
type skipIgnored<In> = In extends `#${infer _}\n${infer In}`
  ? skipIgnored<In>
  : In extends `#${infer _}`
    ? ''
    : In extends `${ignored}${infer In}`
      ? skipIgnored<In>
      : In;
type skipDigits<In> = In extends `${digit}${infer In}` ? skipDigits<In> : In;
type skipFloat<In> = In extends `${'.'}${infer In}`
  ? skipDigits<In> extends `${'e' | 'E'}${infer In}`
    ? skipDigits<In extends `${'+' | '-'}${infer In}` ? In : In>
    : skipDigits<In>
  : skipDigits<In> extends `${'e' | 'E'}${infer In}`
    ? skipDigits<In extends `${'+' | '-'}${infer In}` ? In : In>
    : void;
type skipBlockString<In> = In extends `${infer Hd}${'"""'}${infer In}`
  ? Hd extends `${string}${'\\'}`
    ? skipBlockString<In>
    : In
  : In;
type skipString<In> = In extends `${infer Hd}${'"'}${infer In}`
  ? Hd extends `${string}${'\\'}`
    ? skipString<In>
    : In
  : In;
type takeNameLiteralRec<
  PrevMatch extends string,
  In extends string,
> = In extends `${infer Match}${infer Out}`
  ? Match extends letter | digit | '_'
    ? takeNameLiteralRec<`${PrevMatch}${Match}`, Out>
    : _match$1<PrevMatch, In>
  : _match$1<PrevMatch, In>;
interface VarTokenNode<Name extends string = string> {
  kind: Token.Var;
  name: Name;
}
interface NameTokenNode<Name extends string = string> {
  kind: Token.Name;
  name: Name;
}
interface DirectiveTokenNode<Name extends string = string> {
  kind: Token.Directive;
  name: Name;
}
type TokenNode = Token | NameTokenNode | VarTokenNode | DirectiveTokenNode;
interface _state<In extends string, Out extends TokenNode[]> {
  out: Out;
  in: In;
}
type tokenizeRec<State> =
  State extends _state<'', any>
    ? State['out']
    : State extends _state<infer In, infer Out>
      ? tokenizeRec<
          In extends `#${string}`
            ? _state<skipIgnored<In>, Out>
            : In extends `${ignored}${string}`
              ? _state<skipIgnored<In>, Out>
              : In extends `...${infer In}`
                ? _state<In, [...Out, Token.Spread]>
                : In extends `!${infer In}`
                  ? _state<In, [...Out, Token.Exclam]>
                  : In extends `=${infer In}`
                    ? _state<In, [...Out, Token.Equal]>
                    : In extends `:${infer In}`
                      ? _state<In, [...Out, Token.Colon]>
                      : In extends `{${infer In}`
                        ? _state<In, [...Out, Token.BraceOpen]>
                        : In extends `}${infer In}`
                          ? _state<In, [...Out, Token.BraceClose]>
                          : In extends `(${infer In}`
                            ? _state<In, [...Out, Token.ParenOpen]>
                            : In extends `)${infer In}`
                              ? _state<In, [...Out, Token.ParenClose]>
                              : In extends `[${infer In}`
                                ? _state<In, [...Out, Token.BracketOpen]>
                                : In extends `]${infer In}`
                                  ? _state<In, [...Out, Token.BracketClose]>
                                  : In extends `"""${infer In}`
                                    ? _state<skipBlockString<In>, [...Out, Token.BlockString]>
                                    : In extends `"${infer In}`
                                      ? _state<skipString<In>, [...Out, Token.String]>
                                      : In extends `-${digit}${infer In}`
                                        ? skipFloat<skipDigits<In>> extends `${infer In}`
                                          ? _state<In, [...Out, Token.Float]>
                                          : _state<skipDigits<In>, [...Out, Token.Integer]>
                                        : In extends `${digit}${infer In}`
                                          ? skipFloat<skipDigits<In>> extends `${infer In}`
                                            ? _state<In, [...Out, Token.Float]>
                                            : _state<skipDigits<In>, [...Out, Token.Integer]>
                                          : In extends `$${infer In}`
                                            ? takeNameLiteralRec<'', In> extends _match$1<
                                                infer Match,
                                                infer In
                                              >
                                              ? _state<In, [...Out, VarTokenNode<Match>]>
                                              : void
                                            : In extends `@${infer In}`
                                              ? takeNameLiteralRec<'', In> extends _match$1<
                                                  infer Match,
                                                  infer In
                                                >
                                                ? _state<In, [...Out, DirectiveTokenNode<Match>]>
                                                : void
                                              : In extends `${letter | '_'}${string}`
                                                ? takeNameLiteralRec<'', In> extends _match$1<
                                                    infer Match,
                                                    infer In
                                                  >
                                                  ? _state<In, [...Out, NameTokenNode<Match>]>
                                                  : void
                                                : void
        >
      : [];
type tokenize<In extends string> = tokenizeRec<_state<In, []>>;

interface _match<Out, In extends any[]> {
  out: Out;
  in: In;
}
interface _match2<Out1, Out2, In extends any[]> {
  out1: Out1;
  out2: Out2;
  in: In;
}
type takeOptionalName<In extends any[]> = In extends [
  {
    kind: Token.Name;
    name: infer Name;
  },
  ...infer In,
]
  ? _match<
      {
        kind: Kind.NAME;
        value: Name;
      },
      In
    >
  : _match<undefined, In>;
type takeValue<In extends any[], Const extends boolean> = In extends [Token.Float, ...infer In]
  ? _match<
      {
        kind: Kind.FLOAT;
        value: string;
      },
      In
    >
  : In extends [Token.Integer, ...infer In]
    ? _match<
        {
          kind: Kind.INT;
          value: string;
        },
        In
      >
    : In extends [Token.String, ...infer In]
      ? _match<
          {
            kind: Kind.STRING;
            value: string;
            block: false;
          },
          In
        >
      : In extends [Token.BlockString, ...infer In]
        ? _match<
            {
              kind: Kind.STRING;
              value: string;
              block: true;
            },
            In
          >
        : In extends [
              {
                kind: Token.Name;
                name: 'null';
              },
              ...infer In,
            ]
          ? _match<
              {
                kind: Kind.NULL;
              },
              In
            >
          : In extends [
                {
                  kind: Token.Name;
                  name: 'true' | 'false';
                },
                ...infer In,
              ]
            ? _match<
                {
                  kind: Kind.BOOLEAN;
                  value: boolean;
                },
                In
              >
            : In extends [
                  {
                    kind: Token.Name;
                    name: infer Name;
                  },
                  ...infer In,
                ]
              ? _match<
                  {
                    kind: Kind.ENUM;
                    value: Name;
                  },
                  In
                >
              : In extends [Token.BracketOpen, ...infer In]
                ? takeListRec<[], In, Const>
                : In extends [Token.BraceOpen, ...infer In]
                  ? takeObjectRec<[], In, Const>
                  : Const extends false
                    ? In extends [
                        {
                          kind: Token.Var;
                          name: infer Name;
                        },
                        ...infer In,
                      ]
                      ? _match<
                          {
                            kind: Kind.VARIABLE;
                            name: {
                              kind: Kind.NAME;
                              value: Name;
                            };
                          },
                          In
                        >
                      : void
                    : void;
type takeString<In extends any[]> = In extends [Token.String, ...infer In]
  ? _match<
      {
        kind: Kind.STRING;
        value: string;
        block: false;
      },
      In
    >
  : In extends [Token.BlockString, ...infer In]
    ? _match<
        {
          kind: Kind.STRING;
          value: string;
          block: true;
        },
        In
      >
    : void;
type takeListRec<Nodes extends any[], In extends any[], Const extends boolean> = In extends [
  Token.BracketClose,
  ...infer In,
]
  ? _match<
      {
        kind: Kind.LIST;
        values: Nodes;
      },
      In
    >
  : takeValue<In, Const> extends _match<infer Node, infer In>
    ? takeListRec<[...Nodes, Node], In, Const>
    : void;
type takeObjectField<In extends any[], Const extends boolean> = In extends [
  {
    kind: Token.Name;
    name: infer FieldName;
  },
  Token.Colon,
  ...infer In,
]
  ? takeValue<In, Const> extends _match<infer Value, infer In>
    ? _match<
        {
          kind: Kind.OBJECT_FIELD;
          name: {
            kind: Kind.NAME;
            value: FieldName;
          };
          value: Value;
        },
        In
      >
    : void
  : void;
type takeObjectRec<Fields extends any[], In extends any[], Const extends boolean> = In extends [
  Token.BraceClose,
  ...infer In,
]
  ? _match<
      {
        kind: Kind.OBJECT;
        fields: Fields;
      },
      In
    >
  : takeObjectField<In, Const> extends _match<infer Field, infer In>
    ? takeObjectRec<[...Fields, Field], In, Const>
    : void;
type takeArgument<In extends any[], Const extends boolean> = In extends [
  {
    kind: Token.Name;
    name: infer ArgName;
  },
  Token.Colon,
  ...infer In,
]
  ? takeValue<In, Const> extends _match<infer Value, infer In>
    ? _match<
        {
          kind: Kind.ARGUMENT;
          name: {
            kind: Kind.NAME;
            value: ArgName;
          };
          value: Value;
        },
        In
      >
    : void
  : void;
type _takeArgumentsRec<
  Arguments extends any[],
  In extends any[],
  Const extends boolean,
> = In extends [Token.ParenClose, ...infer In]
  ? _match<Arguments, In>
  : takeArgument<In, Const> extends _match<infer Argument, infer In>
    ? _takeArgumentsRec<[...Arguments, Argument], In, Const>
    : void;
type takeArguments<In extends any[], Const extends boolean> = In extends [
  Token.ParenOpen,
  ...infer In,
]
  ? _takeArgumentsRec<[], In, Const>
  : _match<[], In>;
type takeDirective<In extends any[], Const extends boolean> = In extends [
  {
    kind: Token.Directive;
    name: infer DirectiveName;
  },
  ...infer In,
]
  ? takeArguments<In, Const> extends _match<infer Arguments, infer In>
    ? _match<
        {
          kind: Kind.DIRECTIVE;
          name: {
            kind: Kind.NAME;
            value: DirectiveName;
          };
          arguments: Arguments;
        },
        In
      >
    : void
  : void;
type takeDirectives<In extends any[], Const extends boolean, Directives extends any[] = []> =
  takeDirective<In, Const> extends _match<infer Directive, infer In>
    ? takeDirectives<In, Const, [...Directives, Directive]>
    : _match<Directives, In>;
type _takeFieldName<In extends any[]> = In extends [
  {
    kind: Token.Name;
    name: infer MaybeAlias;
  },
  ...infer In,
]
  ? In extends [
      Token.Colon,
      {
        kind: Token.Name;
        name: infer Name;
      },
      ...infer In,
    ]
    ? _match2<
        {
          kind: Kind.NAME;
          value: MaybeAlias;
        },
        {
          kind: Kind.NAME;
          value: Name;
        },
        In
      >
    : _match2<
        undefined,
        {
          kind: Kind.NAME;
          value: MaybeAlias;
        },
        In
      >
  : void;
type _takeField<In extends any[]> =
  _takeFieldName<In> extends _match2<infer Alias, infer Name, infer In>
    ? takeArguments<In, false> extends _match<infer Arguments, infer In>
      ? takeDirectives<In, false> extends _match<infer Directives, infer In>
        ? takeSelectionSet<In> extends _match<infer SelectionSet, infer In>
          ? _match<
              {
                kind: Kind.FIELD;
                alias: Alias;
                name: Name;
                arguments: Arguments;
                directives: Directives;
                selectionSet: SelectionSet;
              },
              In
            >
          : _match<
              {
                kind: Kind.FIELD;
                alias: Alias;
                name: Name;
                arguments: Arguments;
                directives: Directives;
                selectionSet: undefined;
              },
              In
            >
        : void
      : void
    : void;
type takeType<In extends any[]> = In extends [Token.BracketOpen, ...infer In]
  ? takeType<In> extends _match<infer Subtype, infer In>
    ? In extends [Token.BracketClose, ...infer In]
      ? In extends [Token.Exclam, ...infer In]
        ? _match<
            {
              kind: Kind.NON_NULL_TYPE;
              type: {
                kind: Kind.LIST_TYPE;
                type: Subtype;
              };
            },
            In
          >
        : _match<
            {
              kind: Kind.LIST_TYPE;
              type: Subtype;
            },
            In
          >
      : void
    : void
  : In extends [
        {
          kind: Token.Name;
          name: infer Name;
        },
        ...infer In,
      ]
    ? In extends [Token.Exclam, ...infer In]
      ? _match<
          {
            kind: Kind.NON_NULL_TYPE;
            type: {
              kind: Kind.NAMED_TYPE;
              name: {
                kind: Kind.NAME;
                value: Name;
              };
            };
          },
          In
        >
      : _match<
          {
            kind: Kind.NAMED_TYPE;
            name: {
              kind: Kind.NAME;
              value: Name;
            };
          },
          In
        >
    : void;
type _takeFragmentSpread<In extends any[]> = In extends [
  Token.Spread,
  {
    kind: Token.Name;
    name: 'on';
  },
  {
    kind: Token.Name;
    name: infer Type;
  },
  ...infer In,
]
  ? takeDirectives<In, false> extends _match<infer Directives, infer In>
    ? takeSelectionSet<In> extends _match<infer SelectionSet, infer In>
      ? _match<
          {
            kind: Kind.INLINE_FRAGMENT;
            typeCondition: {
              kind: Kind.NAMED_TYPE;
              name: {
                kind: Kind.NAME;
                value: Type;
              };
            };
            directives: Directives;
            selectionSet: SelectionSet;
          },
          In
        >
      : void
    : void
  : In extends [
        Token.Spread,
        {
          kind: Token.Name;
          name: infer Name;
        },
        ...infer In,
      ]
    ? takeDirectives<In, false> extends _match<infer Directives, infer In>
      ? _match<
          {
            kind: Kind.FRAGMENT_SPREAD;
            name: {
              kind: Kind.NAME;
              value: Name;
            };
            directives: Directives;
          },
          In
        >
      : void
    : In extends [Token.Spread, ...infer In]
      ? takeDirectives<In, false> extends _match<infer Directives, infer In>
        ? takeSelectionSet<In> extends _match<infer SelectionSet, infer In>
          ? _match<
              {
                kind: Kind.INLINE_FRAGMENT;
                typeCondition: undefined;
                directives: Directives;
                selectionSet: SelectionSet;
              },
              In
            >
          : void
        : void
      : void;
type _takeSelectionRec<Selections extends any[], In extends any[]> =
  _takeField<In> extends _match<infer Selection, infer In>
    ? _takeSelectionRec<[...Selections, Selection], In>
    : _takeFragmentSpread<In> extends _match<infer Selection, infer In>
      ? _takeSelectionRec<[...Selections, Selection], In>
      : In extends [Token.BraceClose, ...infer In]
        ? _match<
            {
              kind: Kind.SELECTION_SET;
              selections: Selections;
            },
            In
          >
        : void;
type takeSelectionSet<In extends any[]> = In extends [Token.BraceOpen, ...infer In]
  ? _takeSelectionRec<[], In>
  : void;
type takeVarDefinition<In extends any[]> = In extends [
  {
    kind: Token.Var;
    name: infer VarName;
  },
  Token.Colon,
  ...infer In,
]
  ? takeType<In> extends _match<infer Type, infer In>
    ? In extends [Token.Equal, ...infer In]
      ? takeValue<In, true> extends _match<infer DefaultValue, infer In>
        ? takeDirectives<In, true> extends _match<infer Directives, infer In>
          ? _match<
              {
                kind: Kind.VARIABLE_DEFINITION;
                variable: {
                  kind: Kind.VARIABLE;
                  name: {
                    kind: Kind.NAME;
                    value: VarName;
                  };
                };
                type: Type;
                defaultValue: DefaultValue;
                directives: Directives;
              },
              In
            >
          : void
        : void
      : takeDirectives<In, true> extends _match<infer Directives, infer In>
        ? _match<
            {
              kind: Kind.VARIABLE_DEFINITION;
              variable: {
                kind: Kind.VARIABLE;
                name: {
                  kind: Kind.NAME;
                  value: VarName;
                };
              };
              type: Type;
              defaultValue: undefined;
              directives: Directives;
            },
            In
          >
        : void
    : void
  : void;
type _takeVarDefinitionRec<Definitions extends any[], In extends any[]> = In extends [
  Token.ParenClose,
  ...infer In,
]
  ? _match<Definitions, In>
  : takeVarDefinition<In> extends _match<infer Definition, infer In>
    ? _takeVarDefinitionRec<[...Definitions, Definition], In>
    : takeString<In> extends _match<infer _, infer In>
      ? _takeVarDefinitionRec<[...Definitions], In>
      : _match<Definitions, In>;
type takeVarDefinitions<In extends any[]> = In extends [Token.ParenOpen, ...infer In]
  ? _takeVarDefinitionRec<[], In>
  : _match<[], In>;
type takeFragmentDefinition<In extends any[]> = In extends [
  {
    kind: Token.Name;
    name: 'fragment';
  },
  {
    kind: Token.Name;
    name: infer Name;
  },
  {
    kind: Token.Name;
    name: 'on';
  },
  {
    kind: Token.Name;
    name: infer Type;
  },
  ...infer In,
]
  ? takeDirectives<In, true> extends _match<infer Directives, infer In>
    ? takeSelectionSet<In> extends _match<infer SelectionSet, infer In>
      ? _match<
          {
            kind: Kind.FRAGMENT_DEFINITION;
            name: {
              kind: Kind.NAME;
              value: Name;
            };
            typeCondition: {
              kind: Kind.NAMED_TYPE;
              name: {
                kind: Kind.NAME;
                value: Type;
              };
            };
            directives: Directives;
            selectionSet: SelectionSet;
          },
          In
        >
      : void
    : void
  : void;
type takeOperation<In extends any[]> = In extends [
  {
    kind: Token.Name;
    name: 'query';
  },
  ...infer In,
]
  ? _match<OperationTypeNode.QUERY, In>
  : In extends [
        {
          kind: Token.Name;
          name: 'mutation';
        },
        ...infer In,
      ]
    ? _match<OperationTypeNode.MUTATION, In>
    : In extends [
          {
            kind: Token.Name;
            name: 'subscription';
          },
          ...infer In,
        ]
      ? _match<OperationTypeNode.SUBSCRIPTION, In>
      : void;
type takeOperationDefinition<In extends any[]> =
  takeOperation<In> extends _match<infer Operation, infer In>
    ? takeOptionalName<In> extends _match<infer Name, infer In>
      ? takeVarDefinitions<In> extends _match<infer VarDefinitions, infer In>
        ? takeDirectives<In, false> extends _match<infer Directives, infer In>
          ? takeSelectionSet<In> extends _match<infer SelectionSet, infer In>
            ? _match<
                {
                  kind: Kind.OPERATION_DEFINITION;
                  operation: Operation;
                  name: Name;
                  variableDefinitions: VarDefinitions;
                  directives: Directives;
                  selectionSet: SelectionSet;
                },
                In
              >
            : void
          : void
        : void
      : void
    : takeSelectionSet<In> extends _match<infer SelectionSet, infer In>
      ? _match<
          {
            kind: Kind.OPERATION_DEFINITION;
            operation: OperationTypeNode.QUERY;
            name: undefined;
            variableDefinitions: [];
            directives: [];
            selectionSet: SelectionSet;
          },
          In
        >
      : void;
type _takeDocumentRec<Definitions extends any[], In extends any[]> =
  takeFragmentDefinition<In> extends _match<infer Definition, infer In>
    ? _takeDocumentRec<[...Definitions, Definition], In>
    : takeOperationDefinition<In> extends _match<infer Definition, infer In>
      ? _takeDocumentRec<[...Definitions, Definition], In>
      : takeString<In> extends _match<infer _, infer In>
        ? _takeDocumentRec<[...Definitions], In>
        : _match<Definitions, In>;
type parseDocument<In extends string> =
  _takeDocumentRec<[], tokenize<In>> extends _match<[...infer Definitions], any>
    ? Definitions extends []
      ? never
      : {
          kind: Kind.DOCUMENT;
          definitions: Definitions;
        }
    : never;
type DocumentNodeLike = {
  kind: Kind.DOCUMENT;
  definitions: readonly any[];
};

/** Private namespace holding our symbols for markers.
 * @internal
 *
 * @remarks
 * Markers are used to indicate, for example, which fragments a given GraphQL document
 * is referring to or which fragments a document exposes. This ties into “fragment masking”,
 * a process by which the type of a fragment is hidden away until it’s unwrapped, to enforce
 * isolation and code-reuse.
 */
declare namespace $tada {
  const fragmentRefs: unique symbol;
  type fragmentRefs = typeof fragmentRefs;
  const definition: unique symbol;
  type definition = typeof definition;
  const ref: unique symbol;
  type ref = typeof ref;
}
interface FragmentDefDecorationLike {
  fragment: any;
  on: any;
  masked: any;
}
type isMaskedRec<Directives extends readonly unknown[] | undefined> = Directives extends readonly [
  infer Directive,
  ...infer Rest,
]
  ? Directive extends {
      kind: Kind.DIRECTIVE;
      name: any;
    }
    ? Directive['name']['value'] extends '_unmask'
      ? false
      : isMaskedRec<Rest>
    : isMaskedRec<Rest>
  : true;
type decorateFragmentDef<
  Document extends DocumentNodeLike,
  isMaskingDisabled = false,
> = Document['definitions'][0] extends {
  kind: Kind.FRAGMENT_DEFINITION;
  name: any;
}
  ? {
      fragment: Document['definitions'][0]['name']['value'];
      on: Document['definitions'][0]['typeCondition']['name']['value'];
      masked: isMaskingDisabled extends true
        ? false
        : isMaskedRec<Document['definitions'][0]['directives']>;
    }
  : void;
type getFragmentsOfDocuments<Documents extends readonly FragmentShape[]> = overload<
  Documents[number] extends infer Document
    ? Document extends FragmentShape<infer Definition>
      ? {
          [P in Definition['fragment']]: {
            kind: Kind.FRAGMENT_DEFINITION;
            name: {
              kind: Kind.NAME;
              value: Definition['fragment'];
            };
            typeCondition: {
              kind: Kind.NAMED_TYPE;
              name: {
                kind: Kind.NAME;
                value: Definition['on'];
              };
            };
            [$tada.ref]: makeFragmentRef<Document>;
          };
        }
      : never
    : never
>;
type makeFragmentRef<Document> =
  Document extends FragmentShape<infer Definition, infer Result>
    ? Definition['masked'] extends false
      ? Result
      : {
          [$tada.fragmentRefs]: {
            [Name in Definition['fragment']]: Definition['on'];
          };
        }
    : never;
type omitFragmentRefsRec<Data> = Data extends readonly (infer Value)[]
  ? readonly omitFragmentRefsRec<Value>[]
  : Data extends null
    ? null
    : Data extends undefined
      ? undefined
      : Data extends {}
        ? {
            [Key in Exclude<keyof Data, $tada.fragmentRefs>]: omitFragmentRefsRec<Data[Key]>;
          }
        : Data;
interface makeUndefinedFragmentRef<FragmentName extends string> {
  [$tada.fragmentRefs]: {
    [Name in FragmentName]: 'Undefined Fragment';
  };
}
interface DefinitionDecoration<Definition = FragmentDefDecorationLike> {
  [$tada.definition]?: Definition;
}
interface FragmentShape<
  Definition extends FragmentDefDecorationLike = FragmentDefDecorationLike,
  Result = unknown,
> extends DocumentDecoration<Result>,
    DefinitionDecoration<Definition> {}

type ObjectLikeType = {
  kind: 'OBJECT' | 'INTERFACE' | 'UNION';
  name: string;
  fields: {
    [key: string]: any;
  };
};
type narrowTypename<T, Typename> = '__typename' extends keyof T
  ? T extends {
      __typename?: Typename;
    }
    ? T
    : never
  : T;
type unwrapTypeRec$1<
  Type,
  SelectionSet,
  Introspection extends SchemaLike,
  Fragments extends {
    [name: string]: any;
  },
  IsOptional,
> = Type extends {
  readonly kind: 'NON_NULL';
  readonly ofType: any;
}
  ? unwrapTypeRec$1<
      Type['ofType'],
      SelectionSet,
      Introspection,
      Fragments,
      IsOptional extends void ? false : IsOptional
    >
  : Type extends {
        readonly kind: 'LIST';
        readonly ofType: any;
      }
    ? IsOptional extends false
      ? Array<unwrapTypeRec$1<Type['ofType'], SelectionSet, Introspection, Fragments, void>>
      : null | Array<unwrapTypeRec$1<Type['ofType'], SelectionSet, Introspection, Fragments, void>>
    : Type extends {
          readonly name: string;
        }
      ? Introspection['types'][Type['name']] extends ObjectLikeType
        ? SelectionSet extends {
            kind: Kind.SELECTION_SET;
            selections: any;
          }
          ? IsOptional extends false
            ? getSelection<
                SelectionSet['selections'],
                Introspection['types'][Type['name']],
                Introspection,
                Fragments
              >
            : null | getSelection<
                SelectionSet['selections'],
                Introspection['types'][Type['name']],
                Introspection,
                Fragments
              >
          : unknown
        : Introspection['types'][Type['name']] extends {
              type: any;
            }
          ? IsOptional extends false
            ? Introspection['types'][Type['name']]['type']
            : Introspection['types'][Type['name']]['type'] | null
          : IsOptional extends false
            ? Introspection['types'][Type['name']]['enumValues']
            : Introspection['types'][Type['name']]['enumValues'] | null
      : unknown;
type getTypeDirective<Node> = Node extends {
  directives: any[];
}
  ? Node['directives'][number]['name']['value'] & ('required' | '_required') extends never
    ? Node['directives'][number]['name']['value'] & ('optional' | '_optional') extends never
      ? void
      : true
    : false
  : void;
type isOptional<Node> = Node extends {
  directives: any[];
}
  ? Node['directives'][number]['name']['value'] & ('include' | 'skip' | 'defer') extends never
    ? false
    : true
  : false;
type getFieldAlias<Node> = Node extends {
  alias: undefined;
  name: any;
}
  ? Node['name']['value']
  : Node extends {
        alias: any;
      }
    ? Node['alias']['value']
    : never;
type getFragmentSelection<
  Node,
  PossibleType extends string,
  Type extends ObjectLikeType,
  Introspection extends SchemaLike,
  Fragments extends {
    [name: string]: any;
  },
> = Node extends {
  kind: Kind.INLINE_FRAGMENT;
  selectionSet: any;
}
  ? getPossibleTypeSelectionRec<
      Node['selectionSet']['selections'],
      PossibleType,
      Type,
      Introspection,
      Fragments
    >
  : Node extends {
        kind: Kind.FRAGMENT_SPREAD;
        name: any;
      }
    ? Node['name']['value'] extends keyof Fragments
      ? Fragments[Node['name']['value']] extends {
          [$tada.ref]: any;
        }
        ? Type extends {
            kind: 'INTERFACE';
            name: any;
          }
          ? narrowTypename<Fragments[Node['name']['value']][$tada.ref], PossibleType>
          : Fragments[Node['name']['value']][$tada.ref]
        : getPossibleTypeSelectionRec<
            Fragments[Node['name']['value']]['selectionSet']['selections'],
            PossibleType,
            Type,
            Introspection,
            Fragments
          >
      : never
    : never;
type getSpreadSubtype<
  Node,
  BaseType extends ObjectLikeType,
  Introspection extends SchemaLike,
  Fragments extends {
    [name: string]: any;
  },
> = Node extends {
  kind: Kind.INLINE_FRAGMENT;
  typeCondition?: any;
}
  ? Node['typeCondition'] extends {
      kind: Kind.NAMED_TYPE;
      name: any;
    }
    ? Introspection['types'][Node['typeCondition']['name']['value']]
    : BaseType
  : Node extends {
        kind: Kind.FRAGMENT_SPREAD;
        name: any;
      }
    ? Node['name']['value'] extends keyof Fragments
      ? Introspection['types'][Fragments[Node['name']['value']]['typeCondition']['name']['value']]
      : void
    : void;
type getTypenameOfType<Type> =
  | (Type extends {
      name: any;
    }
      ? Type['name']
      : never)
  | (Type extends {
      possibleTypes: any;
    }
      ? Type['possibleTypes']
      : never);
type getSelection<
  Selections,
  Type extends ObjectLikeType,
  Introspection extends SchemaLike,
  Fragments extends {
    [name: string]: any;
  },
> = Type extends {
  kind: 'UNION' | 'INTERFACE';
  possibleTypes: any;
}
  ? {
      [PossibleType in Type['possibleTypes']]: getPossibleTypeSelectionRec<
        Selections,
        PossibleType,
        Type,
        Introspection,
        Fragments,
        typeSelectionResult<{
          __typename?: PossibleType;
        }>
      >;
    }[Type['possibleTypes']]
  : Type extends {
        kind: 'OBJECT';
        name: any;
      }
    ? getPossibleTypeSelectionRec<Selections, Type['name'], Type, Introspection, Fragments>
    : {};
interface typeSelectionResult<Fields extends {} = {}, Rest = unknown> {
  fields: Fields;
  rest: Rest;
}
type getPossibleTypeSelectionRec<
  Selections,
  PossibleType extends string,
  Type extends ObjectLikeType,
  Introspection extends SchemaLike,
  Fragments extends {
    [name: string]: any;
  },
  SelectionAcc extends typeSelectionResult = typeSelectionResult,
> = Selections extends [infer Node, ...infer Rest]
  ? getPossibleTypeSelectionRec<
      Rest,
      PossibleType,
      Type,
      Introspection,
      Fragments,
      Node extends {
        kind: Kind.FRAGMENT_SPREAD | Kind.INLINE_FRAGMENT;
      }
        ? getSpreadSubtype<Node, Type, Introspection, Fragments> extends infer Subtype extends
            ObjectLikeType
          ? PossibleType extends getTypenameOfType<Subtype>
            ? isOptional<Node> extends true
              ? typeSelectionResult<
                  SelectionAcc['fields'],
                  SelectionAcc['rest'] &
                    (
                      | {}
                      | getFragmentSelection<Node, PossibleType, Subtype, Introspection, Fragments>
                    )
                >
              : typeSelectionResult<
                  SelectionAcc['fields'] &
                    getFragmentSelection<Node, PossibleType, Subtype, Introspection, Fragments>,
                  SelectionAcc['rest']
                >
            : SelectionAcc
          : Node extends {
                kind: Kind.FRAGMENT_SPREAD;
                name: any;
              }
            ? typeSelectionResult<
                SelectionAcc['fields'] & makeUndefinedFragmentRef<Node['name']['value']>,
                SelectionAcc['rest']
              >
            : SelectionAcc
        : Node extends {
              kind: Kind.FIELD;
              name: any;
              selectionSet: any;
            }
          ? isOptional<Node> extends true
            ? typeSelectionResult<
                SelectionAcc['fields'] & {
                  [Prop in getFieldAlias<Node>]?: Node['name']['value'] extends '__typename'
                    ? PossibleType
                    : unwrapTypeRec$1<
                        Type['fields'][Node['name']['value']]['type'],
                        Node['selectionSet'],
                        Introspection,
                        Fragments,
                        getTypeDirective<Node>
                      >;
                },
                SelectionAcc['rest']
              >
            : typeSelectionResult<
                SelectionAcc['fields'] & {
                  [Prop in getFieldAlias<Node>]: Node['name']['value'] extends '__typename'
                    ? PossibleType
                    : unwrapTypeRec$1<
                        Type['fields'][Node['name']['value']]['type'],
                        Node['selectionSet'],
                        Introspection,
                        Fragments,
                        getTypeDirective<Node>
                      >;
                },
                SelectionAcc['rest']
              >
          : SelectionAcc
    >
  : SelectionAcc['rest'] extends infer T
    ? obj<SelectionAcc['fields'] & T>
    : never;
type getOperationSelectionType<
  Definition,
  Introspection extends SchemaLike,
  Fragments extends {
    [name: string]: any;
  },
> = Definition extends {
  kind: Kind.OPERATION_DEFINITION;
  selectionSet: any;
  operation: any;
}
  ? Introspection['types'][Introspection[Definition['operation']]] extends infer Type extends
      ObjectLikeType
    ? getSelection<Definition['selectionSet']['selections'], Type, Introspection, Fragments>
    : {}
  : never;
type getFragmentSelectionType<
  Definition,
  Introspection extends SchemaLike,
  Fragments extends {
    [name: string]: any;
  },
> = Definition extends {
  kind: Kind.FRAGMENT_DEFINITION;
  selectionSet: any;
  typeCondition: any;
}
  ? Introspection['types'][Definition['typeCondition']['name']['value']] extends infer Type extends
      ObjectLikeType
    ? getSelection<Definition['selectionSet']['selections'], Type, Introspection, Fragments>
    : never
  : never;
type getDocumentType<
  Document extends DocumentNodeLike,
  Introspection extends SchemaLike,
  Fragments extends {
    [name: string]: any;
  } = {},
> = Document['definitions'] extends readonly [infer Definition, ...infer Rest]
  ? Definition extends {
      kind: Kind.OPERATION_DEFINITION;
    }
    ? getOperationSelectionType<Definition, Introspection, getFragmentMapRec<Rest> & Fragments>
    : Definition extends {
          kind: Kind.FRAGMENT_DEFINITION;
        }
      ? getFragmentSelectionType<Definition, Introspection, getFragmentMapRec<Rest> & Fragments>
      : never
  : never;
type getFragmentMapRec<Definitions, FragmentMap = {}> = Definitions extends readonly [
  infer Definition,
  ...infer Rest,
]
  ? getFragmentMapRec<
      Rest,
      Definition extends {
        kind: Kind.FRAGMENT_DEFINITION;
        name: any;
      }
        ? {
            [Name in Definition['name']['value']]: Definition;
          } & FragmentMap
        : FragmentMap
    >
  : FragmentMap;

type getInputObjectTypeRec<
  InputFields,
  Introspection extends SchemaLike,
  InputObject = {},
> = InputFields extends [infer InputField, ...infer Rest]
  ? getInputObjectTypeRec<
      Rest,
      Introspection,
      (InputField extends {
        name: any;
        type: any;
      }
        ? InputField extends {
            defaultValue?: undefined | null;
            type: {
              kind: 'NON_NULL';
            };
          }
          ? {
              [Name in InputField['name']]: unwrapTypeRec<InputField['type'], Introspection, true>;
            }
          : {
              [Name in InputField['name']]?: unwrapTypeRec<
                InputField['type'],
                Introspection,
                true
              > | null;
            }
        : {}) &
        InputObject
    >
  : obj<InputObject>;
type getInputObjectTypeOneOfRec<
  InputFields,
  Introspection extends SchemaLike,
  InputObject = never,
> = InputFields extends [infer InputField, ...infer Rest]
  ? getInputObjectTypeOneOfRec<
      Rest,
      Introspection,
      | (InputField extends {
          name: any;
          type: any;
        }
          ? {
              [Name in InputField['name']]: unwrapTypeRec<InputField['type'], Introspection, false>;
            }
          : never)
      | InputObject
    >
  : InputObject;
type unwrapTypeRec<TypeRef, Introspection extends SchemaLike, IsOptional> = TypeRef extends {
  kind: 'NON_NULL';
  ofType: any;
}
  ? unwrapTypeRec<TypeRef['ofType'], Introspection, false>
  : TypeRef extends {
        kind: 'LIST';
        ofType: any;
      }
    ? IsOptional extends false
      ? Array<unwrapTypeRec<TypeRef['ofType'], Introspection, true>>
      : null | Array<unwrapTypeRec<TypeRef['ofType'], Introspection, true>>
    : TypeRef extends {
          name: any;
        }
      ? IsOptional extends false
        ? getScalarType<TypeRef['name'], Introspection>
        : null | getScalarType<TypeRef['name'], Introspection>
      : unknown;
type unwrapTypeRefRec<Type, Introspection extends SchemaLike, IsOptional> = Type extends {
  kind: Kind.NON_NULL_TYPE;
  type: any;
}
  ? unwrapTypeRefRec<Type['type'], Introspection, false>
  : Type extends {
        kind: Kind.LIST_TYPE;
        type: any;
      }
    ? IsOptional extends false
      ? Array<unwrapTypeRefRec<Type['type'], Introspection, true>>
      : null | Array<unwrapTypeRefRec<Type['type'], Introspection, true>>
    : Type extends {
          kind: Kind.NAMED_TYPE;
          name: any;
        }
      ? IsOptional extends false
        ? getScalarType<Type['name']['value'], Introspection>
        : null | getScalarType<Type['name']['value'], Introspection>
      : unknown;
type _getVariablesRec<
  Variables,
  Introspection extends SchemaLike,
  VariablesObject = {},
> = Variables extends [infer Variable, ...infer Rest]
  ? _getVariablesRec<
      Rest,
      Introspection,
      (Variable extends {
        kind: Kind.VARIABLE_DEFINITION;
        variable: any;
        type: any;
      }
        ? Variable extends {
            defaultValue: undefined;
            type: {
              kind: Kind.NON_NULL_TYPE;
            };
          }
          ? {
              [Name in Variable['variable']['name']['value']]: unwrapTypeRefRec<
                Variable['type'],
                Introspection,
                true
              >;
            }
          : {
              [Name in Variable['variable']['name']['value']]?: unwrapTypeRefRec<
                Variable['type'],
                Introspection,
                true
              >;
            }
        : {}) &
        VariablesObject
    >
  : obj<VariablesObject>;
type getVariablesType<
  Document extends DocumentNodeLike,
  Introspection extends SchemaLike,
> = _getVariablesRec<Document['definitions'][0]['variableDefinitions'], Introspection>;
type getScalarType<
  TypeName,
  Introspection extends SchemaLike,
> = TypeName extends keyof Introspection['types']
  ? Introspection['types'][TypeName] extends {
      kind: 'INPUT_OBJECT';
      inputFields: any;
      isOneOf?: any;
    }
    ? Introspection['types'][TypeName]['isOneOf'] extends true
      ? getInputObjectTypeOneOfRec<Introspection['types'][TypeName]['inputFields'], Introspection>
      : getInputObjectTypeRec<Introspection['types'][TypeName]['inputFields'], Introspection>
    : Introspection['types'][TypeName] extends {
          type: any;
        }
      ? Introspection['types'][TypeName]['type']
      : Introspection['types'][TypeName]['enumValues']
  : never;

/** Abstract configuration type input for your schema and scalars.
 *
 * @remarks
 * This is used either via {@link setupSchema} or {@link initGraphQLTada} to set
 * up your schema and scalars.
 *
 * The `scalars` option is optional and can be used to set up more scalars, apart
 * from the default ones (like: Int, Float, String, Boolean).
 * It must be an object map of scalar names to their desired TypeScript types.
 *
 * @param introspection - Introspection of your schema matching {@link IntrospectionQuery}.
 * @param scalars - An object type with scalar names as keys and the corresponding scalar types as values.
 */
interface AbstractSetupSchema {
  introspection: IntrospectionLikeInput;
  scalars?: ScalarsLike;
  disableMasking?: boolean;
}
/** Abstract type for internal configuration
 * @internal
 */
interface AbstractConfig {
  isMaskingDisabled: boolean;
}
/** This is used to configure gql.tada with your introspection data and scalars.
 *
 * @remarks
 * You may extend this interface via declaration merging with your {@link IntrospectionQuery}
 * data and optionally your scalars to get proper type inference.
 * This is done by declaring a declaration for it as per the following example.
 *
 * Configuring scalars is optional and by default the standard scalrs are already
 * defined.
 *
 * This will configure the {@link graphql} export to infer types from your schema.
 * Alternatively, you may call {@link initGraphQLTada} instead.
 *
 * @param introspection - Introspection of your schema matching {@link IntrospectionQuery}.
 * @param scalars - An object type with scalar names as keys and the corresponding scalar types as values.
 *
 * @example
 * ```
 * import type { myIntrospection } from './myIntrospection';
 *
 * declare module 'gql.tada' {
 *   interface setupSchema {
 *     introspection: typeof myIntrospection;
 *     scalars: {
 *       DateTime: string;
 *       Json: any;
 *     };
 *   }
 * }
 * ```
 */
interface setupSchema extends AbstractSetupSchema {}
interface AbstractSetupCache {
  readonly __cacheDisabled: unknown;
  [key: string]: unknown;
}
interface setupCache extends AbstractSetupCache {}
interface GraphQLTadaAPI<Schema extends SchemaLike, Config extends AbstractConfig> {
  /** In "multi-schema" mode this identifies the schema.
   * @internal */
  readonly __name: Schema['name'];
  /** Function to create and compose GraphQL documents with result and variable types.
   *
   * @param input - A string of a GraphQL document.
   * @param fragments - An optional list of other GraphQL fragments created with this function.
   * @returns A {@link DocumentNode} with result and variables types.
   *
   * @remarks
   * This function creates a {@link DocumentNode} with result and variables types.
   * It is used with your schema in {@link setupSchema} to create a result type
   * of your queries, fragments, and variables.
   *
   * You can compose fragments into this function by passing them and a fragment
   * mask will be created for them.
   * When creating queries, the returned document of queries can be passed into GraphQL clients
   * which will then automatically infer the result and variables types.
   *
   * @example
   * ```
   * import { graphql } from 'gql.tada';
   *
   * const bookFragment = graphql(`
   *   fragment BookComponent on Book {
   *     id
   *     title
   *   }
   * `);
   *
   * const bookQuery = graphql(`
   *   query Book ($id: ID!) {
   *     book(id: $id) {
   *       id
   *       ...BookComponent
   *     }
   *   }
   * `, [bookFragment]);
   * ```
   *
   * @see {@link readFragment} for how to read from fragment masks.
   */
  <const In extends string, const Fragments extends readonly FragmentShape[]>(
    input: In,
    fragments?: Fragments
  ): setupCache[In] extends DocumentNodeLike
    ? unknown extends setupCache['__cacheDisabled']
      ? setupCache[In]
      : getDocumentNode<
          parseDocument<In>,
          Schema,
          getFragmentsOfDocuments<Fragments>,
          Config['isMaskingDisabled']
        >
    : getDocumentNode<
        parseDocument<In>,
        Schema,
        getFragmentsOfDocuments<Fragments>,
        Config['isMaskingDisabled']
      >;
  /** Function to validate the type of a given scalar or enum value.
   *
   * @param name - The name of a scalar or enum type.
   * @param value - An optional scalar value of the given type.
   * @returns A {@link DocumentNode} with result and variables types.
   *
   * @remarks
   * This function validates that a value matches an enum or scalar type
   * as a type check.
   *
   * You can use it to retrieve the type of a given scalar or enum type
   * for use in a utility function or separate component that only
   * accepts a primitive scalar or enum value.
   *
   * Note that this function does not perform runtime checks of your
   * scalar value!
   *
   * @example
   * ```
   * import { graphql } from 'gql.tada';
   *
   * type myEnum = ReturnType<graphql.scalar<'myEnum'>>;
   *
   * const myEnumValue = graphql.scalar('myEnum', 'value');
   * ```
   */
  scalar<const Name extends string, Value>(
    name: Name,
    value: getScalarType<Name, Schema> extends Value
      ? Value & getScalarType<Name, Schema>
      : getScalarType<Name, Schema>
  ): Value;
  scalar<const Name extends string, Value>(
    name: Name,
    value: getScalarType<Name, Schema> extends Value
      ? never extends Value
        ? never
        : (Value & getScalarType<Name, Schema>) | null
      : getScalarType<Name, Schema> | null
  ): Value | null;
  scalar<const Name extends string, Value>(
    name: Name,
    value: getScalarType<Name, Schema> extends Value
      ? never extends Value
        ? never
        : (Value & getScalarType<Name, Schema>) | undefined
      : getScalarType<Name, Schema> | undefined
  ): Value | undefined;
  scalar<const Name extends string, Value>(
    name: Name,
    value: getScalarType<Name, Schema> extends Value
      ? never extends Value
        ? never
        : (Value & getScalarType<Name, Schema>) | null | undefined
      : getScalarType<Name, Schema> | null | undefined
  ): Value | null | undefined;
  scalar<const Name extends string>(
    name: Name,
    value: getScalarType<Name, Schema> | undefined
  ): getScalarType<Name, Schema>;
  /** Function to replace a GraphQL document with a persisted document.
   *
   * @typeParam Document - The document type of {@link TadaDocumentNode}.
   * @param id - A document ID that replaces the document for the API.
   * @returns A {@link TadaPersistedDocumentNode}.
   *
   * @remarks
   * This function may be used to replace a GraphQL document with a
   * stand-in, persisted document.
   *
   * The returned document’s value won’t contain any of the document’s
   * definitions, but its type will be equivalent to the `Document` that’s
   * been passed as a generic.
   *
   * As long as the query (type parameter of `Document`) is only referenced
   * as a type in your code, it will be omitted from your output build by
   * your bundler and the resulting GraphQL document’s ID will replace your
   * document entirely.
   *
   * @example
   * ```
   * import { graphql } from 'gql.tada';
   *
   * const query = graphql(`query MyQuery { __typename }`);
   * const persisted = graphql.persisted<typeof query>('MyQuery');
   * ```
   */
  persisted<Document extends DocumentNodeLike = never>(
    documentId: string,
    document?: Document
  ): Document extends DocumentDecoration<infer Result, infer Variables>
    ? TadaPersistedDocumentNode<Result, Variables>
    : never;
}
type schemaOfSetup<Setup extends AbstractSetupSchema> = addIntrospectionScalars<
  mapIntrospection<matchOr<IntrospectionLikeInput, Setup['introspection'], never>>,
  matchOr<ScalarsLike, Setup['scalars'], {}>
>;
type configOfSetup<Setup extends AbstractSetupSchema> = {
  isMaskingDisabled: Setup['disableMasking'] extends true ? true : false;
};
/** Utility to type-instantiate a `graphql` document function with.
 *
 * @remarks
 * The `initGraphQLTada` type may be used to manually instantiate a type
 * as returned by `initGraphQLTada<>()` with the same input type.
 *
 * @example
 * ```
 * import { initGraphQLTada } from 'gql.tada';
 * import type { myIntrospection } from './myIntrospection';
 *
 * export const graphql: initGraphQLTada<{
 *   introspection: typeof myIntrospection;
 *   scalars: {
 *     DateTime: string;
 *     Json: any;
 *   };
 * }> = initGraphQLTada();
 *
 * const query = graphql(`{ __typename }`);
 * ```
 */
type initGraphQLTada<Setup extends AbstractSetupSchema> = GraphQLTadaAPI<
  schemaOfSetup<Setup>,
  configOfSetup<Setup>
>;
/** Setup function to create a typed `graphql` document function with.
 *
 * @remarks
 * `initGraphQLTada` accepts an {@link AbstractSetupSchema} configuration object as a generic
 * and returns a `graphql` function that may be used to create documents typed using your
 * GraphQL schema.
 *
 * You should use and re-export the resulting function named as `graphql` or `gql` for your
 * editor and the TypeScript language server to recognize your GraphQL documents correctly.
 *
 * @example
 * ```
 * import { initGraphQLTada } from 'gql.tada';
 * import type { myIntrospection } from './myIntrospection';
 *
 * export const graphql = initGraphQLTada<{
 *   introspection: typeof myIntrospection;
 *   scalars: {
 *     DateTime: string;
 *     Json: any;
 *   };
 * }>();
 *
 * const query = graphql(`{ __typename }`);
 * ```
 */
declare function initGraphQLTada<const Setup extends AbstractSetupSchema>(): initGraphQLTada<Setup>;
/** Alias to a GraphQL parse function returning an exact document type.
 *
 * @param input - A string of a GraphQL document
 * @returns A parsed {@link DocumentNode}.
 *
 * @remarks
 * This function accepts a GraphQL document string and parses it, just like
 * GraphQL’s `parse` function. However, its return type will be the exact
 * structure of the AST parsed in types.
 */
declare function parse<const In extends string>(input: In): parseDocument<In>;
type getDocumentNode<
  Document extends DocumentNodeLike,
  Introspection extends SchemaLike,
  Fragments extends {
    [name: string]: any;
  } = {},
  isMaskingDisabled = false,
> =
  getDocumentType<Document, Introspection, Fragments> extends never
    ? never
    : TadaDocumentNode<
        getDocumentType<Document, Introspection, Fragments>,
        getVariablesType<Document, Introspection>,
        decorateFragmentDef<Document, isMaskingDisabled>
      >;
/** A GraphQL `DocumentNode` with attached types for results and variables.
 *
 * @remarks
 * This is a GraphQL {@link DocumentNode} with attached types for results and variables.
 * This is used by GraphQL clients to infer the types of results and variables and provide
 * type-safety in GraphQL documents.
 *
 * You can create typed GraphQL documents using the {@link graphql} function.
 *
 * `Result` is the type of GraphQL results, as returned by GraphQL APIs for a given query.
 * `Variables` is the type of variables, as accepted by GraphQL APIs for a given query.
 *
 * @see {@link https://github.com/dotansimha/graphql-typed-document-node} for more information.
 */
interface TadaDocumentNode<
  Result = {
    [key: string]: any;
  },
  Variables = {
    [key: string]: any;
  },
  Decoration = void,
> extends DocumentNode,
    DocumentDecoration<Result, Variables>,
    DefinitionDecoration<Decoration> {}
/** A GraphQL persisted document with attached types for results and variables.
 *
 * @remarks
 * This type still matches a GraphQL {@link DocumentNode}, but doesn’t contain
 * any definitions. At runtime, this means that this document is empty.
 *
 * Instead of its definitions, it carries an `id` property that is typically
 * used to uniquely identify the document to your GraphQL API, without disclosing
 * the shape of the query or schema transparently.
 */
interface TadaPersistedDocumentNode<
  Result = {
    [key: string]: any;
  },
  Variables = {
    [key: string]: any;
  },
> extends DocumentNode,
    DocumentDecoration<Result, Variables> {
  definitions: readonly DefinitionNode[];
  documentId: string;
}
/** A utility type returning the `Result` type of typed GraphQL documents.
 *
 * @remarks
 * This accepts a {@link TadaDocumentNode} and returns the attached `Result` type
 * of GraphQL documents.
 */
type ResultOf<Document> = Document extends DocumentDecoration<infer Result, any> ? Result : never;
/** A utility type returning the `Variables` type of typed GraphQL documents.
 *
 * @remarks
 * This accepts a {@link TadaDocumentNode} and returns the attached `Variables` type
 * of GraphQL documents.
 */
type VariablesOf<Document> =
  Document extends DocumentDecoration<any, infer Variables> ? Variables : never;
/** Creates a fragment mask for a given fragment document.
 *
 * @remarks
 * When {@link graphql} is used to create a fragment and is spread into another
 * fragment or query, their result types will only contain a “reference” to the
 * fragment. This encourages isolation and is known as “fragment masking.”
 *
 * While {@link readFragment} is used to unmask these fragment masks, this utility
 * creates a fragment mask, so you can accept the masked data in the part of your
 * codebase that defines a fragment.
 *
 * @example
 * ```
 * import { FragmentOf, graphql, readFragment } from 'gql.tada';
 *
 * const bookFragment = graphql(`
 *   fragment BookComponent on Book {
 *     id
 *     title
 *   }
 * `);
 *
 * // May be called with any GraphQL data that contains a spread of `bookFragment`
 * const getBook = (data: FragmentOf<typeof bookFragment>) => {
 *   // Unmasks the fragment and casts to the result type of `bookFragment`
 *   const book = readFragment(bookFragment, data);
 * };
 * ```
 *
 * @see {@link readFragment} for how to read from fragment masks.
 */
type FragmentOf<Document extends FragmentShape> = makeFragmentRef<Document>;
type resultOrFragmentOf<Document extends FragmentShape> = FragmentOf<Document> | ResultOf<Document>;
type resultOfT<Document extends FragmentShape, T = unknown> =
  Document extends DocumentDecoration<infer Result, any>
    ? '__typename' extends keyof T
      ? Result extends {
          __typename?: T['__typename'];
        }
        ? Result
        : never
      : Result
    : never;
type resultOfFragmentsRec<
  Fragments extends readonly any[],
  Result = {},
> = Fragments extends readonly [infer Fragment, ...infer Rest]
  ? resultOfFragmentsRec<Rest, ResultOf<Fragment> & Result>
  : Result;
type fragmentRefsOfFragmentsRec<
  Fragments extends readonly any[],
  FragmentRefs = {},
> = Fragments extends readonly [infer Fragment, ...infer Rest]
  ? fragmentRefsOfFragmentsRec<Rest, makeFragmentRef<Fragment> & FragmentRefs>
  : obj<FragmentRefs>;
/** Unmasks a fragment mask for a given fragment document and data.
 *
 * @param _document - A GraphQL document of a fragment, created using {@link graphql}.
 * @param fragment - A mask of the fragment, which can be wrapped in arrays, or nullable.
 * @returns The unmasked data of the fragment.
 *
 * @remarks
 * When {@link graphql} is used to create a fragment and is spread into another
 * fragment or query, their result types will only contain a “reference” to the
 * fragment. This encourages isolation and is known as “fragment masking.”
 *
 * This means that you must use {@link readFragment} to unmask these fragment masks
 * and get to the data. This encourages isolation and only using the data you define
 * a part of your codebase to require.
 *
 * @example
 * ```
 * import { FragmentOf, graphql, readFragment } from 'gql.tada';
 *
 * const bookFragment = graphql(`
 *   fragment BookComponent on Book {
 *     id
 *     title
 *   }
 * `);
 *
 * const getBook = (data: FragmentOf<typeof bookFragment> | null) => {
 *   // Unmasks the fragment and casts to the result type of `bookFragment`
 *   // This is intersected with `| null` in this case, due to the input type.
 *   const book = readFragment(bookFragment, data);
 * };
 *
 * const bookQuery = graphql(`
 *   query Book ($id: ID!) {
 *     book(id: $id) {
 *       id
 *       ...BookComponent
 *     }
 *   }
 * `, [bookFragment]);
 *
 * const getQuery = (data: ResultOf<typeof bookQuery>) => {
 *   getBook(data?.book);
 * };
 * ```
 *
 * @see {@link readFragment} for how to read from fragment masks.
 */
declare function readFragment<const Document extends FragmentShape = never>(
  _document: Document,
  fragment: never
): resultOfT<Document>;
declare function readFragment<
  const Document extends FragmentShape,
  const T extends resultOrFragmentOf<Document> | null | undefined | {},
>(
  _document: Document,
  fragments: readonly T[]
): readonly (T extends resultOrFragmentOf<Document> ? resultOfT<Document, T> : T)[];
declare function readFragment<
  const Document extends FragmentShape,
  const T extends resultOrFragmentOf<Document> | null | undefined | {},
>(
  _document: Document,
  fragment: T
): T extends resultOrFragmentOf<Document> ? resultOfT<Document, T> : T;
declare function readFragment<const Document extends FragmentShape>(
  fragment: readonly resultOrFragmentOf<Document>[]
): readonly ResultOf<Document>[];
declare function readFragment<const Document extends FragmentShape>(
  fragment: readonly (resultOrFragmentOf<Document> | null)[]
): readonly (ResultOf<Document> | null)[];
declare function readFragment<const Document extends FragmentShape>(
  fragment: readonly (resultOrFragmentOf<Document> | undefined)[]
): readonly (ResultOf<Document> | undefined)[];
declare function readFragment<const Document extends FragmentShape>(
  fragment: readonly (resultOrFragmentOf<Document> | null | undefined)[]
): readonly (ResultOf<Document> | null | undefined)[];
declare function readFragment<const Document extends FragmentShape>(
  fragment: readonly (resultOrFragmentOf<Document> | {})[]
): readonly (ResultOf<Document> | {})[];
declare function readFragment<const Document extends FragmentShape>(
  fragment: readonly (resultOrFragmentOf<Document> | null | {})[]
): readonly (ResultOf<Document> | null | {})[];
declare function readFragment<const Document extends FragmentShape>(
  fragment: readonly (resultOrFragmentOf<Document> | undefined | {})[]
): readonly (ResultOf<Document> | undefined | {})[];
declare function readFragment<const Document extends FragmentShape>(
  fragment: readonly (resultOrFragmentOf<Document> | null | undefined | {})[]
): readonly (ResultOf<Document> | null | undefined | {})[];
declare function readFragment<const Document extends FragmentShape>(
  fragment: resultOrFragmentOf<Document>
): ResultOf<Document>;
declare function readFragment<const Document extends FragmentShape>(
  fragment: resultOrFragmentOf<Document> | null
): ResultOf<Document> | null;
declare function readFragment<const Document extends FragmentShape>(
  fragment: resultOrFragmentOf<Document> | undefined
): ResultOf<Document> | undefined;
declare function readFragment<const Document extends FragmentShape>(
  fragment: resultOrFragmentOf<Document> | null | undefined
): ResultOf<Document> | null | undefined;
declare function readFragment<const Document extends FragmentShape>(
  fragment: resultOrFragmentOf<Document> | {}
): ResultOf<Document> | {};
declare function readFragment<const Document extends FragmentShape>(
  fragment: resultOrFragmentOf<Document> | null | {}
): ResultOf<Document> | null | {};
declare function readFragment<const Document extends FragmentShape>(
  fragment: resultOrFragmentOf<Document> | undefined | {}
): ResultOf<Document> | undefined | {};
declare function readFragment<const Document extends FragmentShape>(
  fragment: resultOrFragmentOf<Document> | null | undefined | {}
): ResultOf<Document> | null | undefined | {};
/** For testing, masks fragment data for given data and fragments.
 *
 * @param _fragments - A list of GraphQL documents of fragments, created using {@link graphql}.
 * @param data - The combined result data of the fragments, which can be wrapped in arrays.
 * @returns The masked data of the fragments.
 *
 * @remarks
 * When creating test data, you may define data for fragments that’s unmasked, making it
 * unusable in parent fragments or queries that require masked data.
 *
 * This means that you may have to use {@link maskFragments} to mask your data first
 * for TypeScript to not report an error.
 *
 * @example
 * ```
 * import { FragmentOf, ResultOf, graphql, maskFragments } from 'gql.tada';
 *
 * const bookFragment = graphql(`
 *   fragment BookComponent on Book {
 *     id
 *     title
 *   }
 * `);
 *
 * const data = maskFragments([bookFragment], { id: 'id', title: 'book' });
 * ```
 *
 * @see {@link readFragment} for how to read from fragment masks (i.e. the reverse)
 */
declare function maskFragments<const Fragments extends readonly FragmentShape[]>(
  _fragments: Fragments,
  fragment: resultOfFragmentsRec<Fragments>
): fragmentRefsOfFragmentsRec<Fragments>;
declare function maskFragments<const Fragments extends readonly FragmentShape[]>(
  _fragments: Fragments,
  fragment: resultOfFragmentsRec<Fragments> | null
): fragmentRefsOfFragmentsRec<Fragments> | null;
declare function maskFragments<const Fragments extends readonly FragmentShape[]>(
  _fragments: Fragments,
  fragment: resultOfFragmentsRec<Fragments> | undefined
): fragmentRefsOfFragmentsRec<Fragments> | undefined;
declare function maskFragments<const Fragments extends readonly FragmentShape[]>(
  _fragments: Fragments,
  fragment: resultOfFragmentsRec<Fragments> | null | undefined
): fragmentRefsOfFragmentsRec<Fragments> | null | undefined;
declare function maskFragments<const Fragments extends readonly FragmentShape[]>(
  _fragments: Fragments,
  fragment: readonly resultOfFragmentsRec<Fragments>[]
): readonly fragmentRefsOfFragmentsRec<Fragments>[];
declare function maskFragments<const Fragments extends readonly FragmentShape[]>(
  _fragments: Fragments,
  fragment: readonly (resultOfFragmentsRec<Fragments> | null)[]
): readonly (fragmentRefsOfFragmentsRec<Fragments> | null)[];
declare function maskFragments<const Fragments extends readonly FragmentShape[]>(
  _fragments: Fragments,
  fragment: readonly (resultOfFragmentsRec<Fragments> | undefined)[]
): readonly (fragmentRefsOfFragmentsRec<Fragments> | undefined)[];
declare function maskFragments<const Fragments extends readonly FragmentShape[]>(
  _fragments: Fragments,
  fragment: readonly (resultOfFragmentsRec<Fragments> | null | undefined)[]
): readonly (fragmentRefsOfFragmentsRec<Fragments> | null | undefined)[];
/** For testing, converts document data without fragment refs to their result type.
 *
 * @param _document - A GraphQL document, created using {@link graphql}.
 * @param data - The result data of the GraphQL document with optional fragment refs.
 * @returns The masked result data of the document.
 *
 * @remarks
 * When creating test data, you may define data for documents that’s unmasked, but
 * need to cast the data to match the result type of your document.
 *
 * This means that you may have to use {@link unsafe_readResult} to cast
 * them to the result type, instead of doing `as any as ResultOf<typeof document>`.
 *
 * This function is inherently unsafe, since it doesn't check that your document
 * actually contains the masked fragment data!
 *
 * @example
 * ```
 * import { FragmentOf, ResultOf, graphql, unsafe_readResult } from 'gql.tada';
 *
 * const bookFragment = graphql(`
 *   fragment BookComponent on Book {
 *     id
 *     title
 *   }
 * `);
 *
 * const query = graphql(`
 *   query {
 *     book {
 *       ...BookComponent
 *     }
 *   }
 * `, [bookFragment]);
 *
 * const data = unsafe_readResult(query, { book: { id: 'id', title: 'book' } });
 * ```
 *
 * @see {@link readFragment} for how to read from fragment masks (i.e. the reverse)
 */
declare function unsafe_readResult<
  const Document extends DocumentDecoration<any, any>,
  const Data extends omitFragmentRefsRec<ResultOf<Document>>,
>(_document: Document, data: Data): ResultOf<Document>;
declare const graphql: initGraphQLTada<setupSchema>;

export {
  $tada,
  type AbstractSetupCache,
  type AbstractSetupSchema,
  type DocumentDecoration,
  type FragmentOf,
  type GraphQLTadaAPI,
  type ResultOf,
  type TadaDocumentNode,
  type TadaPersistedDocumentNode,
  type VariablesOf,
  type mapType as __mapType,
  graphql,
  initGraphQLTada,
  maskFragments,
  parse,
  type parseDocument,
  readFragment,
  type setupCache,
  type setupSchema,
  unsafe_readResult,
};
