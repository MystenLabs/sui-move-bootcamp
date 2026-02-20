import e from "typescript";

import { getSchemaNamesFromConfig as i } from "@gql.tada/internal";

import { findAllPersistedCallExpressions as n, getDocumentReferenceFromDocumentNode as r, getDocumentReferenceFromTypeQuery as a, unrollTadaFragments as t } from "@0no-co/graphqlsp/api";

import { e as o } from "./index-chunk2.mjs";

import { p as l } from "./index-chunk.mjs";

var s = "FragmentDefinition";

class GraphQLError extends Error {
  constructor(e, i, n, r, a, t, o) {
    super(e);
    this.name = "GraphQLError";
    this.message = e;
    if (a) {
      this.path = a;
    }
    if (i) {
      this.nodes = Array.isArray(i) ? i : [ i ];
    }
    if (n) {
      this.source = n;
    }
    if (r) {
      this.positions = r;
    }
    if (t) {
      this.originalError = t;
    }
    var l = o;
    if (!l && t) {
      var s = t.extensions;
      if (s && "object" == typeof s) {
        l = s;
      }
    }
    this.extensions = l || {};
  }
  toJSON() {
    return {
      ...this,
      message: this.message
    };
  }
  toString() {
    return this.message;
  }
  get [Symbol.toStringTag]() {
    return "GraphQLError";
  }
}

var u;

var d;

function error(e) {
  return new GraphQLError(`Syntax Error: Unexpected token at ${d} in ${e}`);
}

function advance(e) {
  e.lastIndex = d;
  if (e.test(u)) {
    return u.slice(d, d = e.lastIndex);
  }
}

var c = / +(?=[^\s])/y;

function blockString(e) {
  var i = e.split("\n");
  var n = "";
  var r = 0;
  var a = 0;
  var t = i.length - 1;
  for (var o = 0; o < i.length; o++) {
    c.lastIndex = 0;
    if (c.test(i[o])) {
      if (o && (!r || c.lastIndex < r)) {
        r = c.lastIndex;
      }
      a = a || o;
      t = o;
    }
  }
  for (var l = a; l <= t; l++) {
    if (l !== a) {
      n += "\n";
    }
    n += i[l].slice(r).replace(/\\"""/g, '"""');
  }
  return n;
}

function ignored() {
  for (var e = 0 | u.charCodeAt(d++); 9 === e || 10 === e || 13 === e || 32 === e || 35 === e || 44 === e || 65279 === e; e = 0 | u.charCodeAt(d++)) {
    if (35 === e) {
      while (10 !== (e = u.charCodeAt(d++)) && 13 !== e) {}
    }
  }
  d--;
}

var v = /[_A-Za-z]\w*/y;

var f = new RegExp("(?:(null|true|false)|\\$(" + v.source + ')|(-?\\d+)((?:\\.\\d+)?[eE][+-]?\\d+|\\.\\d+)?|("""(?:"""|(?:[\\s\\S]*?[^\\\\])"""))|("(?:"|[^\\r\\n]*?[^\\\\]"))|(' + v.source + "))", "y");

var m = function(e) {
  e[e.Const = 1] = "Const";
  e[e.Var = 2] = "Var";
  e[e.Int = 3] = "Int";
  e[e.Float = 4] = "Float";
  e[e.BlockString = 5] = "BlockString";
  e[e.String = 6] = "String";
  e[e.Enum = 7] = "Enum";
  return e;
}(m || {});

var g = /\\/g;

function value(e) {
  var i;
  var n;
  f.lastIndex = d;
  if (91 === u.charCodeAt(d)) {
    d++;
    ignored();
    var r = [];
    while (93 !== u.charCodeAt(d)) {
      r.push(value(e));
    }
    d++;
    ignored();
    return {
      kind: "ListValue",
      values: r
    };
  } else if (123 === u.charCodeAt(d)) {
    d++;
    ignored();
    var a = [];
    while (125 !== u.charCodeAt(d)) {
      if (null == (i = advance(v))) {
        throw error("ObjectField");
      }
      ignored();
      if (58 !== u.charCodeAt(d++)) {
        throw error("ObjectField");
      }
      ignored();
      a.push({
        kind: "ObjectField",
        name: {
          kind: "Name",
          value: i
        },
        value: value(e)
      });
    }
    d++;
    ignored();
    return {
      kind: "ObjectValue",
      fields: a
    };
  } else if (null != (n = f.exec(u))) {
    d = f.lastIndex;
    ignored();
    if (null != (i = n[m.Const])) {
      return "null" === i ? {
        kind: "NullValue"
      } : {
        kind: "BooleanValue",
        value: "true" === i
      };
    } else if (null != (i = n[m.Var])) {
      if (e) {
        throw error("Variable");
      } else {
        return {
          kind: "Variable",
          name: {
            kind: "Name",
            value: i
          }
        };
      }
    } else if (null != (i = n[m.Int])) {
      var t;
      if (null != (t = n[m.Float])) {
        return {
          kind: "FloatValue",
          value: i + t
        };
      } else {
        return {
          kind: "IntValue",
          value: i
        };
      }
    } else if (null != (i = n[m.BlockString])) {
      return {
        kind: "StringValue",
        value: blockString(i.slice(3, -3)),
        block: !0
      };
    } else if (null != (i = n[m.String])) {
      return {
        kind: "StringValue",
        value: g.test(i) ? JSON.parse(i) : i.slice(1, -1),
        block: !1
      };
    } else if (null != (i = n[m.Enum])) {
      return {
        kind: "EnumValue",
        value: i
      };
    }
  }
  throw error("Value");
}

function arguments_(e) {
  if (40 === u.charCodeAt(d)) {
    var i = [];
    d++;
    ignored();
    var n;
    do {
      if (null == (n = advance(v))) {
        throw error("Argument");
      }
      ignored();
      if (58 !== u.charCodeAt(d++)) {
        throw error("Argument");
      }
      ignored();
      i.push({
        kind: "Argument",
        name: {
          kind: "Name",
          value: n
        },
        value: value(e)
      });
    } while (41 !== u.charCodeAt(d));
    d++;
    ignored();
    return i;
  }
}

function directives(e) {
  if (64 === u.charCodeAt(d)) {
    var i = [];
    var n;
    do {
      d++;
      if (null == (n = advance(v))) {
        throw error("Directive");
      }
      ignored();
      i.push({
        kind: "Directive",
        name: {
          kind: "Name",
          value: n
        },
        arguments: arguments_(e)
      });
    } while (64 === u.charCodeAt(d));
    return i;
  }
}

function type() {
  var e;
  var i = 0;
  while (91 === u.charCodeAt(d)) {
    i++;
    d++;
    ignored();
  }
  if (null == (e = advance(v))) {
    throw error("NamedType");
  }
  ignored();
  var n = {
    kind: "NamedType",
    name: {
      kind: "Name",
      value: e
    }
  };
  do {
    if (33 === u.charCodeAt(d)) {
      d++;
      ignored();
      n = {
        kind: "NonNullType",
        type: n
      };
    }
    if (i) {
      if (93 !== u.charCodeAt(d++)) {
        throw error("NamedType");
      }
      ignored();
      n = {
        kind: "ListType",
        type: n
      };
    }
  } while (i--);
  return n;
}

var h = new RegExp("(?:(\\.{3})|(" + v.source + "))", "y");

var p = function(e) {
  e[e.Spread = 1] = "Spread";
  e[e.Name = 2] = "Name";
  return e;
}(p || {});

function selectionSet() {
  var e = [];
  var i;
  var n;
  do {
    h.lastIndex = d;
    if (null != (n = h.exec(u))) {
      d = h.lastIndex;
      if (null != n[p.Spread]) {
        ignored();
        var r = advance(v);
        if (null != r && "on" !== r) {
          ignored();
          e.push({
            kind: "FragmentSpread",
            name: {
              kind: "Name",
              value: r
            },
            directives: directives(!1)
          });
        } else {
          ignored();
          if ("on" === r) {
            if (null == (r = advance(v))) {
              throw error("NamedType");
            }
            ignored();
          }
          var a = directives(!1);
          if (123 !== u.charCodeAt(d++)) {
            throw error("InlineFragment");
          }
          ignored();
          e.push({
            kind: "InlineFragment",
            typeCondition: r ? {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: r
              }
            } : void 0,
            directives: a,
            selectionSet: selectionSet()
          });
        }
      } else if (null != (i = n[p.Name])) {
        var t = void 0;
        ignored();
        if (58 === u.charCodeAt(d)) {
          d++;
          ignored();
          t = i;
          if (null == (i = advance(v))) {
            throw error("Field");
          }
          ignored();
        }
        var o = arguments_(!1);
        ignored();
        var l = directives(!1);
        var s = void 0;
        if (123 === u.charCodeAt(d)) {
          d++;
          ignored();
          s = selectionSet();
        }
        e.push({
          kind: "Field",
          alias: t ? {
            kind: "Name",
            value: t
          } : void 0,
          name: {
            kind: "Name",
            value: i
          },
          arguments: o,
          directives: l,
          selectionSet: s
        });
      }
    } else {
      throw error("SelectionSet");
    }
  } while (125 !== u.charCodeAt(d));
  d++;
  ignored();
  return {
    kind: "SelectionSet",
    selections: e
  };
}

function fragmentDefinition() {
  var e;
  var i;
  if (null == (e = advance(v))) {
    throw error("FragmentDefinition");
  }
  ignored();
  if ("on" !== advance(v)) {
    throw error("FragmentDefinition");
  }
  ignored();
  if (null == (i = advance(v))) {
    throw error("FragmentDefinition");
  }
  ignored();
  var n = directives(!1);
  if (123 !== u.charCodeAt(d++)) {
    throw error("FragmentDefinition");
  }
  ignored();
  return {
    kind: "FragmentDefinition",
    name: {
      kind: "Name",
      value: e
    },
    typeCondition: {
      kind: "NamedType",
      name: {
        kind: "Name",
        value: i
      }
    },
    directives: n,
    selectionSet: selectionSet()
  };
}

var S = /(?:query|mutation|subscription|fragment)/y;

function operationDefinition(e) {
  var i;
  var n;
  var r;
  if (e) {
    ignored();
    i = advance(v);
    n = function variableDefinitions() {
      ignored();
      if (40 === u.charCodeAt(d)) {
        var e = [];
        d++;
        ignored();
        var i;
        do {
          if (36 !== u.charCodeAt(d++)) {
            throw error("Variable");
          }
          if (null == (i = advance(v))) {
            throw error("Variable");
          }
          ignored();
          if (58 !== u.charCodeAt(d++)) {
            throw error("VariableDefinition");
          }
          ignored();
          var n = type();
          var r = void 0;
          if (61 === u.charCodeAt(d)) {
            d++;
            ignored();
            r = value(!0);
          }
          ignored();
          e.push({
            kind: "VariableDefinition",
            variable: {
              kind: "Variable",
              name: {
                kind: "Name",
                value: i
              }
            },
            type: n,
            defaultValue: r,
            directives: directives(!0)
          });
        } while (41 !== u.charCodeAt(d));
        d++;
        ignored();
        return e;
      }
    }();
    r = directives(!1);
  }
  if (123 === u.charCodeAt(d)) {
    d++;
    ignored();
    return {
      kind: "OperationDefinition",
      operation: e || "query",
      name: i ? {
        kind: "Name",
        value: i
      } : void 0,
      variableDefinitions: n,
      directives: r,
      selectionSet: selectionSet()
    };
  }
}

function parse(e, i) {
  u = "string" == typeof e.body ? e.body : e;
  d = 0;
  return function document() {
    var e;
    var i;
    ignored();
    var n = [];
    do {
      if ("fragment" === (e = advance(S))) {
        ignored();
        n.push(fragmentDefinition());
      } else if (null != (i = operationDefinition(e))) {
        n.push(i);
      } else {
        throw error("Document");
      }
    } while (d < u.length);
    return {
      kind: "Document",
      definitions: n
    };
  }();
}

function mapJoin(e, i, n) {
  var r = "";
  for (var a = 0; a < e.length; a++) {
    if (a) {
      r += i;
    }
    r += n(e[a]);
  }
  return r;
}

var k = "\n";

var y = {
  OperationDefinition(e) {
    var i = e.operation;
    if (e.name) {
      i += " " + e.name.value;
    }
    if (e.variableDefinitions && e.variableDefinitions.length) {
      if (!e.name) {
        i += " ";
      }
      i += "(" + mapJoin(e.variableDefinitions, ", ", y.VariableDefinition) + ")";
    }
    if (e.directives && e.directives.length) {
      i += " " + mapJoin(e.directives, " ", y.Directive);
    }
    return "query" !== i ? i + " " + y.SelectionSet(e.selectionSet) : y.SelectionSet(e.selectionSet);
  },
  VariableDefinition(e) {
    var i = y.Variable(e.variable) + ": " + _print(e.type);
    if (e.defaultValue) {
      i += " = " + _print(e.defaultValue);
    }
    if (e.directives && e.directives.length) {
      i += " " + mapJoin(e.directives, " ", y.Directive);
    }
    return i;
  },
  Field(e) {
    var i = e.alias ? e.alias.value + ": " + e.name.value : e.name.value;
    if (e.arguments && e.arguments.length) {
      var n = mapJoin(e.arguments, ", ", y.Argument);
      if (i.length + n.length + 2 > 80) {
        i += "(" + (k += "  ") + mapJoin(e.arguments, k, y.Argument) + (k = k.slice(0, -2)) + ")";
      } else {
        i += "(" + n + ")";
      }
    }
    if (e.directives && e.directives.length) {
      i += " " + mapJoin(e.directives, " ", y.Directive);
    }
    if (e.selectionSet) {
      i += " " + y.SelectionSet(e.selectionSet);
    }
    return i;
  },
  StringValue(e) {
    if (e.block) {
      return function printBlockString(e) {
        return '"""\n' + e.replace(/"""/g, '\\"""') + '\n"""';
      }(e.value).replace(/\n/g, k);
    } else {
      return function printString(e) {
        return JSON.stringify(e);
      }(e.value);
    }
  },
  BooleanValue: e => "" + e.value,
  NullValue: e => "null",
  IntValue: e => e.value,
  FloatValue: e => e.value,
  EnumValue: e => e.value,
  Name: e => e.value,
  Variable: e => "$" + e.name.value,
  ListValue: e => "[" + mapJoin(e.values, ", ", _print) + "]",
  ObjectValue: e => "{" + mapJoin(e.fields, ", ", y.ObjectField) + "}",
  ObjectField: e => e.name.value + ": " + _print(e.value),
  Document(e) {
    if (!e.definitions || !e.definitions.length) {
      return "";
    }
    return mapJoin(e.definitions, "\n\n", _print);
  },
  SelectionSet: e => "{" + (k += "  ") + mapJoin(e.selections, k, _print) + (k = k.slice(0, -2)) + "}",
  Argument: e => e.name.value + ": " + _print(e.value),
  FragmentSpread(e) {
    var i = "..." + e.name.value;
    if (e.directives && e.directives.length) {
      i += " " + mapJoin(e.directives, " ", y.Directive);
    }
    return i;
  },
  InlineFragment(e) {
    var i = "...";
    if (e.typeCondition) {
      i += " on " + e.typeCondition.name.value;
    }
    if (e.directives && e.directives.length) {
      i += " " + mapJoin(e.directives, " ", y.Directive);
    }
    return i + " " + y.SelectionSet(e.selectionSet);
  },
  FragmentDefinition(e) {
    var i = "fragment " + e.name.value;
    i += " on " + e.typeCondition.name.value;
    if (e.directives && e.directives.length) {
      i += " " + mapJoin(e.directives, " ", y.Directive);
    }
    return i + " " + y.SelectionSet(e.selectionSet);
  },
  Directive(e) {
    var i = "@" + e.name.value;
    if (e.arguments && e.arguments.length) {
      i += "(" + mapJoin(e.arguments, ", ", y.Argument) + ")";
    }
    return i;
  },
  NamedType: e => e.name.value,
  ListType: e => "[" + _print(e.type) + "]",
  NonNullType: e => _print(e.type) + "!"
};

var _print = e => y[e.kind](e);

function print(e) {
  k = "\n";
  return y[e.kind] ? y[e.kind](e) : "";
}

var N = o((async function* _runPersisted(o) {
  var u = i(o.pluginConfig);
  var d = l(o);
  var c = d.createExternalFiles();
  if (c.length) {
    yield {
      kind: "EXTERNAL_WARNING"
    };
    await d.addVirtualFiles(c);
  }
  var v = d.build();
  var f = v.buildPluginInfo(o.pluginConfig);
  var m = v.getSourceFiles();
  yield {
    kind: "FILE_COUNT",
    fileCount: m.length
  };
  for (var g of m) {
    var h = g.fileName;
    var p = [];
    var S = [];
    var k = n(g, f);
    for (var y of k) {
      var N = v.getSourcePosition(g, y.node.getStart());
      h = N.fileName;
      if (!u.has(y.schema)) {
        S.push({
          message: y.schema ? `The '${y.schema}' schema is not in the configuration but was referenced by "graphql.persisted".` : u.size > 1 ? "The document is not for a known schema. Have you re-generated the output file?" : "Multiple schemas are configured, but the document is not for a specific schema.",
          file: N.fileName,
          line: N.line,
          col: N.col
        });
        continue;
      }
      var b = y.node.arguments[0];
      var C = y.node.arguments[1];
      var w = y.node.typeArguments && y.node.typeArguments[0];
      if (!b || !e.isStringLiteral(b)) {
        S.push({
          message: '"graphql.persisted" must be called with a string literal as the first argument.',
          file: N.fileName,
          line: N.line,
          col: N.col
        });
        continue;
      } else if (!C && !w) {
        S.push({
          message: '"graphql.persisted" is missing a document.\nThis may be passed as a generic such as `graphql.persisted<typeof document>` or as the second argument.',
          file: N.fileName,
          line: N.line,
          col: N.col
        });
        continue;
      }
      var A = null;
      var V = y.node;
      if (C && (e.isCallExpression(C) || e.isIdentifier(C))) {
        A = r(C, g.fileName, f).node;
        V = C;
      } else if (w && e.isTypeQueryNode(w)) {
        A = a(w, g.fileName, f).node;
        V = w;
      }
      if (!A) {
        S.push({
          message: `Could not find reference for "${V.getText()}".\nIf this is unexpected, please file an issue describing your case.`,
          file: N.fileName,
          line: N.line,
          col: N.col
        });
        continue;
      }
      if (!A || !e.isCallExpression(A) || !e.isNoSubstitutionTemplateLiteral(A.arguments[0]) && !e.isStringLiteral(A.arguments[0])) {
        S.push({
          message: `The referenced document of "${V.getText()}" contains no document string literal.\nIf this is unexpected, please file an issue describing your case.`,
          file: N.fileName,
          line: N.line,
          col: N.col
        });
        continue;
      }
      var D = [];
      var x = A.arguments[0].getText().slice(1, -1);
      if (A.arguments[1] && e.isArrayLiteralExpression(A.arguments[1])) {
        t(A.arguments[1], D, v.buildPluginInfo(o.pluginConfig));
      }
      var F = new Set;
      var T = void 0;
      if (o.disableNormalization) {
        T = x;
      } else {
        try {
          var I = parse(x);
          var E = new Set;
          for (var J of I.definitions) {
            if (J.kind === s && !E.has(J)) {
              stripUnmaskDirectivesFromDefinition(J);
            }
          }
          T = print(I);
        } catch (e) {
          S.push({
            message: `The referenced document of "${V.getText()}" could not be parsed.\nRun \`check\` to see specific validation errors.`,
            file: N.fileName,
            line: N.line,
            col: N.col
          });
          continue;
        }
      }
      for (var L of D) {
        stripUnmaskDirectivesFromDefinition(L);
        var O = print(L);
        if (!F.has(O)) {
          T += "\n\n" + print(L);
          F.add(O);
        }
      }
      p.push({
        schemaName: y.schema,
        hashKey: b.getText().slice(1, -1),
        document: T
      });
    }
    yield {
      kind: "FILE_PERSISTED",
      filePath: h,
      documents: p,
      warnings: S
    };
  }
}));

var stripUnmaskDirectivesFromDefinition = e => {
  e.directives = e.directives?.filter((e => "_unmask" !== e.name.value));
};

export { N as runPersisted };
//# sourceMappingURL=thread-chunk.mjs.map
