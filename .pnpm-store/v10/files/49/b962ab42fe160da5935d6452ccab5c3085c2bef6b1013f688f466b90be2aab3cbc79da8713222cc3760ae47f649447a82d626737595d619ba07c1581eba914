var e = require("typescript");

var i = require("@gql.tada/internal");

var r = require("@0no-co/graphqlsp/api");

var n = require("./index-chunk2.js");

var a = require("./index-chunk.js");

var t = "FragmentDefinition";

class GraphQLError extends Error {
  constructor(e, i, r, n, a, t, o) {
    super(e);
    this.name = "GraphQLError";
    this.message = e;
    if (a) {
      this.path = a;
    }
    if (i) {
      this.nodes = Array.isArray(i) ? i : [ i ];
    }
    if (r) {
      this.source = r;
    }
    if (n) {
      this.positions = n;
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

var o;

var l;

function error(e) {
  return new GraphQLError(`Syntax Error: Unexpected token at ${l} in ${e}`);
}

function advance(e) {
  e.lastIndex = l;
  if (e.test(o)) {
    return o.slice(l, l = e.lastIndex);
  }
}

var s = / +(?=[^\s])/y;

function blockString(e) {
  var i = e.split("\n");
  var r = "";
  var n = 0;
  var a = 0;
  var t = i.length - 1;
  for (var o = 0; o < i.length; o++) {
    s.lastIndex = 0;
    if (s.test(i[o])) {
      if (o && (!n || s.lastIndex < n)) {
        n = s.lastIndex;
      }
      a = a || o;
      t = o;
    }
  }
  for (var l = a; l <= t; l++) {
    if (l !== a) {
      r += "\n";
    }
    r += i[l].slice(n).replace(/\\"""/g, '"""');
  }
  return r;
}

function ignored() {
  for (var e = 0 | o.charCodeAt(l++); 9 === e || 10 === e || 13 === e || 32 === e || 35 === e || 44 === e || 65279 === e; e = 0 | o.charCodeAt(l++)) {
    if (35 === e) {
      while (10 !== (e = o.charCodeAt(l++)) && 13 !== e) {}
    }
  }
  l--;
}

var u = /[_A-Za-z]\w*/y;

var d = new RegExp("(?:(null|true|false)|\\$(" + u.source + ')|(-?\\d+)((?:\\.\\d+)?[eE][+-]?\\d+|\\.\\d+)?|("""(?:"""|(?:[\\s\\S]*?[^\\\\])"""))|("(?:"|[^\\r\\n]*?[^\\\\]"))|(' + u.source + "))", "y");

var c = function(e) {
  e[e.Const = 1] = "Const";
  e[e.Var = 2] = "Var";
  e[e.Int = 3] = "Int";
  e[e.Float = 4] = "Float";
  e[e.BlockString = 5] = "BlockString";
  e[e.String = 6] = "String";
  e[e.Enum = 7] = "Enum";
  return e;
}(c || {});

var v = /\\/g;

function value(e) {
  var i;
  var r;
  d.lastIndex = l;
  if (91 === o.charCodeAt(l)) {
    l++;
    ignored();
    var n = [];
    while (93 !== o.charCodeAt(l)) {
      n.push(value(e));
    }
    l++;
    ignored();
    return {
      kind: "ListValue",
      values: n
    };
  } else if (123 === o.charCodeAt(l)) {
    l++;
    ignored();
    var a = [];
    while (125 !== o.charCodeAt(l)) {
      if (null == (i = advance(u))) {
        throw error("ObjectField");
      }
      ignored();
      if (58 !== o.charCodeAt(l++)) {
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
    l++;
    ignored();
    return {
      kind: "ObjectValue",
      fields: a
    };
  } else if (null != (r = d.exec(o))) {
    l = d.lastIndex;
    ignored();
    if (null != (i = r[c.Const])) {
      return "null" === i ? {
        kind: "NullValue"
      } : {
        kind: "BooleanValue",
        value: "true" === i
      };
    } else if (null != (i = r[c.Var])) {
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
    } else if (null != (i = r[c.Int])) {
      var t;
      if (null != (t = r[c.Float])) {
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
    } else if (null != (i = r[c.BlockString])) {
      return {
        kind: "StringValue",
        value: blockString(i.slice(3, -3)),
        block: !0
      };
    } else if (null != (i = r[c.String])) {
      return {
        kind: "StringValue",
        value: v.test(i) ? JSON.parse(i) : i.slice(1, -1),
        block: !1
      };
    } else if (null != (i = r[c.Enum])) {
      return {
        kind: "EnumValue",
        value: i
      };
    }
  }
  throw error("Value");
}

function arguments_(e) {
  if (40 === o.charCodeAt(l)) {
    var i = [];
    l++;
    ignored();
    var r;
    do {
      if (null == (r = advance(u))) {
        throw error("Argument");
      }
      ignored();
      if (58 !== o.charCodeAt(l++)) {
        throw error("Argument");
      }
      ignored();
      i.push({
        kind: "Argument",
        name: {
          kind: "Name",
          value: r
        },
        value: value(e)
      });
    } while (41 !== o.charCodeAt(l));
    l++;
    ignored();
    return i;
  }
}

function directives(e) {
  if (64 === o.charCodeAt(l)) {
    var i = [];
    var r;
    do {
      l++;
      if (null == (r = advance(u))) {
        throw error("Directive");
      }
      ignored();
      i.push({
        kind: "Directive",
        name: {
          kind: "Name",
          value: r
        },
        arguments: arguments_(e)
      });
    } while (64 === o.charCodeAt(l));
    return i;
  }
}

function type() {
  var e;
  var i = 0;
  while (91 === o.charCodeAt(l)) {
    i++;
    l++;
    ignored();
  }
  if (null == (e = advance(u))) {
    throw error("NamedType");
  }
  ignored();
  var r = {
    kind: "NamedType",
    name: {
      kind: "Name",
      value: e
    }
  };
  do {
    if (33 === o.charCodeAt(l)) {
      l++;
      ignored();
      r = {
        kind: "NonNullType",
        type: r
      };
    }
    if (i) {
      if (93 !== o.charCodeAt(l++)) {
        throw error("NamedType");
      }
      ignored();
      r = {
        kind: "ListType",
        type: r
      };
    }
  } while (i--);
  return r;
}

var f = new RegExp("(?:(\\.{3})|(" + u.source + "))", "y");

var g = function(e) {
  e[e.Spread = 1] = "Spread";
  e[e.Name = 2] = "Name";
  return e;
}(g || {});

function selectionSet() {
  var e = [];
  var i;
  var r;
  do {
    f.lastIndex = l;
    if (null != (r = f.exec(o))) {
      l = f.lastIndex;
      if (null != r[g.Spread]) {
        ignored();
        var n = advance(u);
        if (null != n && "on" !== n) {
          ignored();
          e.push({
            kind: "FragmentSpread",
            name: {
              kind: "Name",
              value: n
            },
            directives: directives(!1)
          });
        } else {
          ignored();
          if ("on" === n) {
            if (null == (n = advance(u))) {
              throw error("NamedType");
            }
            ignored();
          }
          var a = directives(!1);
          if (123 !== o.charCodeAt(l++)) {
            throw error("InlineFragment");
          }
          ignored();
          e.push({
            kind: "InlineFragment",
            typeCondition: n ? {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: n
              }
            } : void 0,
            directives: a,
            selectionSet: selectionSet()
          });
        }
      } else if (null != (i = r[g.Name])) {
        var t = void 0;
        ignored();
        if (58 === o.charCodeAt(l)) {
          l++;
          ignored();
          t = i;
          if (null == (i = advance(u))) {
            throw error("Field");
          }
          ignored();
        }
        var s = arguments_(!1);
        ignored();
        var d = directives(!1);
        var c = void 0;
        if (123 === o.charCodeAt(l)) {
          l++;
          ignored();
          c = selectionSet();
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
          arguments: s,
          directives: d,
          selectionSet: c
        });
      }
    } else {
      throw error("SelectionSet");
    }
  } while (125 !== o.charCodeAt(l));
  l++;
  ignored();
  return {
    kind: "SelectionSet",
    selections: e
  };
}

function fragmentDefinition() {
  var e;
  var i;
  if (null == (e = advance(u))) {
    throw error("FragmentDefinition");
  }
  ignored();
  if ("on" !== advance(u)) {
    throw error("FragmentDefinition");
  }
  ignored();
  if (null == (i = advance(u))) {
    throw error("FragmentDefinition");
  }
  ignored();
  var r = directives(!1);
  if (123 !== o.charCodeAt(l++)) {
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
    directives: r,
    selectionSet: selectionSet()
  };
}

var m = /(?:query|mutation|subscription|fragment)/y;

function operationDefinition(e) {
  var i;
  var r;
  var n;
  if (e) {
    ignored();
    i = advance(u);
    r = function variableDefinitions() {
      ignored();
      if (40 === o.charCodeAt(l)) {
        var e = [];
        l++;
        ignored();
        var i;
        do {
          if (36 !== o.charCodeAt(l++)) {
            throw error("Variable");
          }
          if (null == (i = advance(u))) {
            throw error("Variable");
          }
          ignored();
          if (58 !== o.charCodeAt(l++)) {
            throw error("VariableDefinition");
          }
          ignored();
          var r = type();
          var n = void 0;
          if (61 === o.charCodeAt(l)) {
            l++;
            ignored();
            n = value(!0);
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
            type: r,
            defaultValue: n,
            directives: directives(!0)
          });
        } while (41 !== o.charCodeAt(l));
        l++;
        ignored();
        return e;
      }
    }();
    n = directives(!1);
  }
  if (123 === o.charCodeAt(l)) {
    l++;
    ignored();
    return {
      kind: "OperationDefinition",
      operation: e || "query",
      name: i ? {
        kind: "Name",
        value: i
      } : void 0,
      variableDefinitions: r,
      directives: n,
      selectionSet: selectionSet()
    };
  }
}

function parse(e, i) {
  o = "string" == typeof e.body ? e.body : e;
  l = 0;
  return function document() {
    var e;
    var i;
    ignored();
    var r = [];
    do {
      if ("fragment" === (e = advance(m))) {
        ignored();
        r.push(fragmentDefinition());
      } else if (null != (i = operationDefinition(e))) {
        r.push(i);
      } else {
        throw error("Document");
      }
    } while (l < o.length);
    return {
      kind: "Document",
      definitions: r
    };
  }();
}

function mapJoin(e, i, r) {
  var n = "";
  for (var a = 0; a < e.length; a++) {
    if (a) {
      n += i;
    }
    n += r(e[a]);
  }
  return n;
}

var h = "\n";

var p = {
  OperationDefinition(e) {
    var i = e.operation;
    if (e.name) {
      i += " " + e.name.value;
    }
    if (e.variableDefinitions && e.variableDefinitions.length) {
      if (!e.name) {
        i += " ";
      }
      i += "(" + mapJoin(e.variableDefinitions, ", ", p.VariableDefinition) + ")";
    }
    if (e.directives && e.directives.length) {
      i += " " + mapJoin(e.directives, " ", p.Directive);
    }
    return "query" !== i ? i + " " + p.SelectionSet(e.selectionSet) : p.SelectionSet(e.selectionSet);
  },
  VariableDefinition(e) {
    var i = p.Variable(e.variable) + ": " + _print(e.type);
    if (e.defaultValue) {
      i += " = " + _print(e.defaultValue);
    }
    if (e.directives && e.directives.length) {
      i += " " + mapJoin(e.directives, " ", p.Directive);
    }
    return i;
  },
  Field(e) {
    var i = e.alias ? e.alias.value + ": " + e.name.value : e.name.value;
    if (e.arguments && e.arguments.length) {
      var r = mapJoin(e.arguments, ", ", p.Argument);
      if (i.length + r.length + 2 > 80) {
        i += "(" + (h += "  ") + mapJoin(e.arguments, h, p.Argument) + (h = h.slice(0, -2)) + ")";
      } else {
        i += "(" + r + ")";
      }
    }
    if (e.directives && e.directives.length) {
      i += " " + mapJoin(e.directives, " ", p.Directive);
    }
    if (e.selectionSet) {
      i += " " + p.SelectionSet(e.selectionSet);
    }
    return i;
  },
  StringValue(e) {
    if (e.block) {
      return function printBlockString(e) {
        return '"""\n' + e.replace(/"""/g, '\\"""') + '\n"""';
      }(e.value).replace(/\n/g, h);
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
  ObjectValue: e => "{" + mapJoin(e.fields, ", ", p.ObjectField) + "}",
  ObjectField: e => e.name.value + ": " + _print(e.value),
  Document(e) {
    if (!e.definitions || !e.definitions.length) {
      return "";
    }
    return mapJoin(e.definitions, "\n\n", _print);
  },
  SelectionSet: e => "{" + (h += "  ") + mapJoin(e.selections, h, _print) + (h = h.slice(0, -2)) + "}",
  Argument: e => e.name.value + ": " + _print(e.value),
  FragmentSpread(e) {
    var i = "..." + e.name.value;
    if (e.directives && e.directives.length) {
      i += " " + mapJoin(e.directives, " ", p.Directive);
    }
    return i;
  },
  InlineFragment(e) {
    var i = "...";
    if (e.typeCondition) {
      i += " on " + e.typeCondition.name.value;
    }
    if (e.directives && e.directives.length) {
      i += " " + mapJoin(e.directives, " ", p.Directive);
    }
    return i + " " + p.SelectionSet(e.selectionSet);
  },
  FragmentDefinition(e) {
    var i = "fragment " + e.name.value;
    i += " on " + e.typeCondition.name.value;
    if (e.directives && e.directives.length) {
      i += " " + mapJoin(e.directives, " ", p.Directive);
    }
    return i + " " + p.SelectionSet(e.selectionSet);
  },
  Directive(e) {
    var i = "@" + e.name.value;
    if (e.arguments && e.arguments.length) {
      i += "(" + mapJoin(e.arguments, ", ", p.Argument) + ")";
    }
    return i;
  },
  NamedType: e => e.name.value,
  ListType: e => "[" + _print(e.type) + "]",
  NonNullType: e => _print(e.type) + "!"
};

var _print = e => p[e.kind](e);

function print(e) {
  h = "\n";
  return p[e.kind] ? p[e.kind](e) : "";
}

var S = n.expose((async function* _runPersisted(n) {
  var o = i.getSchemaNamesFromConfig(n.pluginConfig);
  var l = a.programFactory(n);
  var s = l.createExternalFiles();
  if (s.length) {
    yield {
      kind: "EXTERNAL_WARNING"
    };
    await l.addVirtualFiles(s);
  }
  var u = l.build();
  var d = u.buildPluginInfo(n.pluginConfig);
  var c = u.getSourceFiles();
  yield {
    kind: "FILE_COUNT",
    fileCount: c.length
  };
  for (var v of c) {
    var f = v.fileName;
    var g = [];
    var m = [];
    var h = r.findAllPersistedCallExpressions(v, d);
    for (var p of h) {
      var S = u.getSourcePosition(v, p.node.getStart());
      f = S.fileName;
      if (!o.has(p.schema)) {
        m.push({
          message: p.schema ? `The '${p.schema}' schema is not in the configuration but was referenced by "graphql.persisted".` : o.size > 1 ? "The document is not for a known schema. Have you re-generated the output file?" : "Multiple schemas are configured, but the document is not for a specific schema.",
          file: S.fileName,
          line: S.line,
          col: S.col
        });
        continue;
      }
      var k = p.node.arguments[0];
      var y = p.node.arguments[1];
      var N = p.node.typeArguments && p.node.typeArguments[0];
      if (!k || !e.isStringLiteral(k)) {
        m.push({
          message: '"graphql.persisted" must be called with a string literal as the first argument.',
          file: S.fileName,
          line: S.line,
          col: S.col
        });
        continue;
      } else if (!y && !N) {
        m.push({
          message: '"graphql.persisted" is missing a document.\nThis may be passed as a generic such as `graphql.persisted<typeof document>` or as the second argument.',
          file: S.fileName,
          line: S.line,
          col: S.col
        });
        continue;
      }
      var b = null;
      var C = p.node;
      if (y && (e.isCallExpression(y) || e.isIdentifier(y))) {
        b = r.getDocumentReferenceFromDocumentNode(y, v.fileName, d).node;
        C = y;
      } else if (N && e.isTypeQueryNode(N)) {
        b = r.getDocumentReferenceFromTypeQuery(N, v.fileName, d).node;
        C = N;
      }
      if (!b) {
        m.push({
          message: `Could not find reference for "${C.getText()}".\nIf this is unexpected, please file an issue describing your case.`,
          file: S.fileName,
          line: S.line,
          col: S.col
        });
        continue;
      }
      if (!b || !e.isCallExpression(b) || !e.isNoSubstitutionTemplateLiteral(b.arguments[0]) && !e.isStringLiteral(b.arguments[0])) {
        m.push({
          message: `The referenced document of "${C.getText()}" contains no document string literal.\nIf this is unexpected, please file an issue describing your case.`,
          file: S.fileName,
          line: S.line,
          col: S.col
        });
        continue;
      }
      var A = [];
      var w = b.arguments[0].getText().slice(1, -1);
      if (b.arguments[1] && e.isArrayLiteralExpression(b.arguments[1])) {
        r.unrollTadaFragments(b.arguments[1], A, u.buildPluginInfo(n.pluginConfig));
      }
      var D = new Set;
      var V = void 0;
      if (n.disableNormalization) {
        V = w;
      } else {
        try {
          var F = parse(w);
          var x = new Set;
          for (var T of F.definitions) {
            if (T.kind === t && !x.has(T)) {
              stripUnmaskDirectivesFromDefinition(T);
            }
          }
          V = print(F);
        } catch (e) {
          m.push({
            message: `The referenced document of "${C.getText()}" could not be parsed.\nRun \`check\` to see specific validation errors.`,
            file: S.fileName,
            line: S.line,
            col: S.col
          });
          continue;
        }
      }
      for (var E of A) {
        stripUnmaskDirectivesFromDefinition(E);
        var I = print(E);
        if (!D.has(I)) {
          V += "\n\n" + print(E);
          D.add(I);
        }
      }
      g.push({
        schemaName: p.schema,
        hashKey: k.getText().slice(1, -1),
        document: V
      });
    }
    yield {
      kind: "FILE_PERSISTED",
      filePath: f,
      documents: g,
      warnings: m
    };
  }
}));

var stripUnmaskDirectivesFromDefinition = e => {
  e.directives = e.directives?.filter((e => "_unmask" !== e.name.value));
};

exports.runPersisted = S;
//# sourceMappingURL=thread-chunk.js.map
