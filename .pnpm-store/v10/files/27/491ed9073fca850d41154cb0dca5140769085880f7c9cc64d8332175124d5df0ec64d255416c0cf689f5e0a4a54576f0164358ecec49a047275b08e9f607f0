import { Kind as e, specifiedRules as t, NoUnusedFragmentsRule as i, ExecutableDefinitionsRule as r, KnownFragmentNamesRule as a, validate as n, LoneSchemaDefinitionRule as s, UniqueOperationTypesRule as o, UniqueTypeNamesRule as l, UniqueEnumValueNamesRule as u, UniqueFieldDefinitionNamesRule as h, UniqueDirectiveNamesRule as f, KnownTypeNamesRule as c, KnownDirectivesRule as p, UniqueDirectivesPerLocationRule as v, PossibleTypeExtensionsRule as d, UniqueArgumentNamesRule as g, UniqueInputFieldNamesRule as m, print as S, parse as y, GraphQLError as x, NoDeprecatedCustomRule as T, visit as E } from "graphql";

import { createHash as A } from "crypto";

var b;

function init(e) {
  b = e.typescript;
}

class CharacterStream {
  constructor(e) {
    this._start = 0;
    this._pos = 0;
    this.getStartOfToken = () => this._start;
    this.getCurrentPosition = () => this._pos;
    this.eol = () => this._sourceText.length === this._pos;
    this.sol = () => 0 === this._pos;
    this.peek = () => this._sourceText.charAt(this._pos) || null;
    this.next = () => {
      var e = this._sourceText.charAt(this._pos);
      this._pos++;
      return e;
    };
    this.eat = e => {
      if (this._testNextCharacter(e)) {
        this._start = this._pos;
        this._pos++;
        return this._sourceText.charAt(this._pos - 1);
      }
      return;
    };
    this.eatWhile = e => {
      var t = this._testNextCharacter(e);
      var i = !1;
      if (t) {
        i = t;
        this._start = this._pos;
      }
      while (t) {
        this._pos++;
        t = this._testNextCharacter(e);
        i = !0;
      }
      return i;
    };
    this.eatSpace = () => this.eatWhile(/[\s\u00a0]/);
    this.skipToEnd = () => {
      this._pos = this._sourceText.length;
    };
    this.skipTo = e => {
      this._pos = e;
    };
    this.match = (e, t = !0, i = !1) => {
      var r = null;
      var a = null;
      if ("string" == typeof e) {
        a = new RegExp(e, i ? "i" : "g").test(this._sourceText.slice(this._pos, this._pos + e.length));
        r = e;
      } else if (e instanceof RegExp) {
        r = null == (a = this._sourceText.slice(this._pos).match(e)) ? void 0 : a[0];
      }
      if (null != a && ("string" == typeof e || a instanceof Array && this._sourceText.startsWith(a[0], this._pos))) {
        if (t) {
          this._start = this._pos;
          if (r && r.length) {
            this._pos += r.length;
          }
        }
        return a;
      }
      return !1;
    };
    this.backUp = e => {
      this._pos -= e;
    };
    this.column = () => this._pos;
    this.indentation = () => {
      var e = this._sourceText.match(/\s*/);
      var t = 0;
      if (e && 0 !== e.length) {
        var i = e[0];
        var r = 0;
        while (i.length > r) {
          if (9 === i.charCodeAt(r)) {
            t += 2;
          } else {
            t++;
          }
          r++;
        }
      }
      return t;
    };
    this.current = () => this._sourceText.slice(this._start, this._pos);
    this._sourceText = e;
  }
  _testNextCharacter(e) {
    var t = this._sourceText.charAt(this._pos);
    var i = !1;
    if ("string" == typeof e) {
      i = t === e;
    } else {
      i = e instanceof RegExp ? e.test(t) : e(t);
    }
    return i;
  }
}

function opt(e) {
  return {
    ofRule: e
  };
}

function list(e, t) {
  return {
    ofRule: e,
    isList: !0,
    separator: t
  };
}

function t$1(e, t) {
  return {
    style: t,
    match: t => t.kind === e
  };
}

function p$1(e, t) {
  return {
    style: t || "punctuation",
    match: t => "Punctuation" === t.kind && t.value === e
  };
}

var isIgnored = e => " " === e || "\t" === e || "," === e || "\n" === e || "\r" === e || "\ufeff" === e || " " === e;

var w = {
  Name: /^[_A-Za-z][_0-9A-Za-z]*/,
  Punctuation: /^(?:!|\$|\(|\)|\.\.\.|:|=|&|@|\[|]|\{|\||\})/,
  Number: /^-?(?:0|(?:[1-9][0-9]*))(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?/,
  String: /^(?:"""(?:\\"""|[^"]|"[^"]|""[^"])*(?:""")?|"(?:[^"\\]|\\(?:"|\/|\\|b|f|n|r|t|u[0-9a-fA-F]{4}))*"?)/,
  Comment: /^#.*/
};

var k = {
  Document: [ list("Definition") ],
  Definition(t) {
    switch (t.value) {
     case "{":
      return "ShortQuery";

     case "query":
      return "Query";

     case "mutation":
      return "Mutation";

     case "subscription":
      return "Subscription";

     case "fragment":
      return e.FRAGMENT_DEFINITION;

     case "schema":
      return "SchemaDef";

     case "scalar":
      return "ScalarDef";

     case "type":
      return "ObjectTypeDef";

     case "interface":
      return "InterfaceDef";

     case "union":
      return "UnionDef";

     case "enum":
      return "EnumDef";

     case "input":
      return "InputDef";

     case "extend":
      return "ExtendDef";

     case "directive":
      return "DirectiveDef";
    }
  },
  ShortQuery: [ "SelectionSet" ],
  Query: [ word("query"), opt(name$1("def")), opt("VariableDefinitions"), list("Directive"), "SelectionSet" ],
  Mutation: [ word("mutation"), opt(name$1("def")), opt("VariableDefinitions"), list("Directive"), "SelectionSet" ],
  Subscription: [ word("subscription"), opt(name$1("def")), opt("VariableDefinitions"), list("Directive"), "SelectionSet" ],
  VariableDefinitions: [ p$1("("), list("VariableDefinition"), p$1(")") ],
  VariableDefinition: [ "Variable", p$1(":"), "Type", opt("DefaultValue") ],
  Variable: [ p$1("$", "variable"), name$1("variable") ],
  DefaultValue: [ p$1("="), "Value" ],
  SelectionSet: [ p$1("{"), list("Selection"), p$1("}") ],
  Selection: (e, t) => "..." === e.value ? t.match(/[\s\u00a0,]*(on\b|@|{)/, !1) ? "InlineFragment" : "FragmentSpread" : t.match(/[\s\u00a0,]*:/, !1) ? "AliasedField" : "Field",
  AliasedField: [ name$1("property"), p$1(":"), name$1("qualifier"), opt("Arguments"), list("Directive"), opt("SelectionSet") ],
  Field: [ name$1("property"), opt("Arguments"), list("Directive"), opt("SelectionSet") ],
  Arguments: [ p$1("("), list("Argument"), p$1(")") ],
  Argument: [ name$1("attribute"), p$1(":"), "Value" ],
  FragmentSpread: [ p$1("..."), name$1("def"), list("Directive") ],
  InlineFragment: [ p$1("..."), opt("TypeCondition"), list("Directive"), "SelectionSet" ],
  FragmentDefinition: [ word("fragment"), opt(function butNot(e, t) {
    var i = e.match;
    e.match = e => {
      var r = !1;
      if (i) {
        r = i(e);
      }
      return r && t.every((t => t.match && !t.match(e)));
    };
    return e;
  }(name$1("def"), [ word("on") ])), "TypeCondition", list("Directive"), "SelectionSet" ],
  TypeCondition: [ word("on"), "NamedType" ],
  Value(e) {
    switch (e.kind) {
     case "Number":
      return "NumberValue";

     case "String":
      return "StringValue";

     case "Punctuation":
      switch (e.value) {
       case "[":
        return "ListValue";

       case "{":
        return "ObjectValue";

       case "$":
        return "Variable";

       case "&":
        return "NamedType";
      }
      return null;

     case "Name":
      switch (e.value) {
       case "true":
       case "false":
        return "BooleanValue";
      }
      if ("null" === e.value) {
        return "NullValue";
      }
      return "EnumValue";
    }
  },
  NumberValue: [ t$1("Number", "number") ],
  StringValue: [ {
    style: "string",
    match: e => "String" === e.kind,
    update(e, t) {
      if (t.value.startsWith('"""')) {
        e.inBlockstring = !t.value.slice(3).endsWith('"""');
      }
    }
  } ],
  BooleanValue: [ t$1("Name", "builtin") ],
  NullValue: [ t$1("Name", "keyword") ],
  EnumValue: [ name$1("string-2") ],
  ListValue: [ p$1("["), list("Value"), p$1("]") ],
  ObjectValue: [ p$1("{"), list("ObjectField"), p$1("}") ],
  ObjectField: [ name$1("attribute"), p$1(":"), "Value" ],
  Type: e => "[" === e.value ? "ListType" : "NonNullType",
  ListType: [ p$1("["), "Type", p$1("]"), opt(p$1("!")) ],
  NonNullType: [ "NamedType", opt(p$1("!")) ],
  NamedType: [ function type$1(e) {
    return {
      style: e,
      match: e => "Name" === e.kind,
      update(e, t) {
        var i;
        if (null === (i = e.prevState) || void 0 === i ? void 0 : i.prevState) {
          e.name = t.value;
          e.prevState.prevState.type = t.value;
        }
      }
    };
  }("atom") ],
  Directive: [ p$1("@", "meta"), name$1("meta"), opt("Arguments") ],
  DirectiveDef: [ word("directive"), p$1("@", "meta"), name$1("meta"), opt("ArgumentsDef"), word("on"), list("DirectiveLocation", p$1("|")) ],
  InterfaceDef: [ word("interface"), name$1("atom"), opt("Implements"), list("Directive"), p$1("{"), list("FieldDef"), p$1("}") ],
  Implements: [ word("implements"), list("NamedType", p$1("&")) ],
  DirectiveLocation: [ name$1("string-2") ],
  SchemaDef: [ word("schema"), list("Directive"), p$1("{"), list("OperationTypeDef"), p$1("}") ],
  OperationTypeDef: [ name$1("keyword"), p$1(":"), name$1("atom") ],
  ScalarDef: [ word("scalar"), name$1("atom"), list("Directive") ],
  ObjectTypeDef: [ word("type"), name$1("atom"), opt("Implements"), list("Directive"), p$1("{"), list("FieldDef"), p$1("}") ],
  FieldDef: [ name$1("property"), opt("ArgumentsDef"), p$1(":"), "Type", list("Directive") ],
  ArgumentsDef: [ p$1("("), list("InputValueDef"), p$1(")") ],
  InputValueDef: [ name$1("attribute"), p$1(":"), "Type", opt("DefaultValue"), list("Directive") ],
  UnionDef: [ word("union"), name$1("atom"), list("Directive"), p$1("="), list("UnionMember", p$1("|")) ],
  UnionMember: [ "NamedType" ],
  EnumDef: [ word("enum"), name$1("atom"), list("Directive"), p$1("{"), list("EnumValueDef"), p$1("}") ],
  EnumValueDef: [ name$1("string-2"), list("Directive") ],
  InputDef: [ word("input"), name$1("atom"), list("Directive"), p$1("{"), list("InputValueDef"), p$1("}") ],
  ExtendDef: [ word("extend"), "ExtensionDefinition" ],
  ExtensionDefinition(t) {
    switch (t.value) {
     case "schema":
      return e.SCHEMA_EXTENSION;

     case "scalar":
      return e.SCALAR_TYPE_EXTENSION;

     case "type":
      return e.OBJECT_TYPE_EXTENSION;

     case "interface":
      return e.INTERFACE_TYPE_EXTENSION;

     case "union":
      return e.UNION_TYPE_EXTENSION;

     case "enum":
      return e.ENUM_TYPE_EXTENSION;

     case "input":
      return e.INPUT_OBJECT_TYPE_EXTENSION;
    }
  },
  [e.SCHEMA_EXTENSION]: [ "SchemaDef" ],
  [e.SCALAR_TYPE_EXTENSION]: [ "ScalarDef" ],
  [e.OBJECT_TYPE_EXTENSION]: [ "ObjectTypeDef" ],
  [e.INTERFACE_TYPE_EXTENSION]: [ "InterfaceDef" ],
  [e.UNION_TYPE_EXTENSION]: [ "UnionDef" ],
  [e.ENUM_TYPE_EXTENSION]: [ "EnumDef" ],
  [e.INPUT_OBJECT_TYPE_EXTENSION]: [ "InputDef" ]
};

function word(e) {
  return {
    style: "keyword",
    match: t => "Name" === t.kind && t.value === e
  };
}

function name$1(e) {
  return {
    style: e,
    match: e => "Name" === e.kind,
    update(e, t) {
      e.name = t.value;
    }
  };
}

function onlineParser(t = {
  eatWhitespace: e => e.eatWhile(isIgnored),
  lexRules: w,
  parseRules: k,
  editorConfig: {}
}) {
  return {
    startState() {
      var i = {
        level: 0,
        step: 0,
        name: null,
        kind: null,
        type: null,
        rule: null,
        needsSeparator: !1,
        prevState: null
      };
      pushRule(t.parseRules, i, e.DOCUMENT);
      return i;
    },
    token: (e, i) => function getToken(e, t, i) {
      var r;
      if (t.inBlockstring) {
        if (e.match(/.*"""/)) {
          t.inBlockstring = !1;
          return "string";
        }
        e.skipToEnd();
        return "string";
      }
      var {lexRules: a, parseRules: n, eatWhitespace: s, editorConfig: o} = i;
      if (t.rule && 0 === t.rule.length) {
        popRule(t);
      } else if (t.needsAdvance) {
        t.needsAdvance = !1;
        advanceRule(t, !0);
      }
      if (e.sol()) {
        var l = (null == o ? void 0 : o.tabSize) || 2;
        t.indentLevel = Math.floor(e.indentation() / l);
      }
      if (s(e)) {
        return "ws";
      }
      var u = function lex(e, t) {
        var i = Object.keys(e);
        for (var r = 0; r < i.length; r++) {
          var a = t.match(e[i[r]]);
          if (a && a instanceof Array) {
            return {
              kind: i[r],
              value: a[0]
            };
          }
        }
      }(a, e);
      if (!u) {
        if (!e.match(/\S+/)) {
          e.match(/\s/);
        }
        pushRule(D, t, "Invalid");
        return "invalidchar";
      }
      if ("Comment" === u.kind) {
        pushRule(D, t, "Comment");
        return "comment";
      }
      var h = assign({}, t);
      if ("Punctuation" === u.kind) {
        if (/^[{([]/.test(u.value)) {
          if (void 0 !== t.indentLevel) {
            t.levels = (t.levels || []).concat(t.indentLevel + 1);
          }
        } else if (/^[})\]]/.test(u.value)) {
          var f = t.levels = (t.levels || []).slice(0, -1);
          if (t.indentLevel && f.length > 0 && f.at(-1) < t.indentLevel) {
            t.indentLevel = f.at(-1);
          }
        }
      }
      while (t.rule) {
        var c = "function" == typeof t.rule ? 0 === t.step ? t.rule(u, e) : null : t.rule[t.step];
        if (t.needsSeparator) {
          c = null == c ? void 0 : c.separator;
        }
        if (c) {
          if (c.ofRule) {
            c = c.ofRule;
          }
          if ("string" == typeof c) {
            pushRule(n, t, c);
            continue;
          }
          if (null === (r = c.match) || void 0 === r ? void 0 : r.call(c, u)) {
            if (c.update) {
              c.update(t, u);
            }
            if ("Punctuation" === u.kind) {
              advanceRule(t, !0);
            } else {
              t.needsAdvance = !0;
            }
            return c.style;
          }
        }
        unsuccessful(t);
      }
      assign(t, h);
      pushRule(D, t, "Invalid");
      return "invalidchar";
    }(e, i, t)
  };
}

function assign(e, t) {
  var i = Object.keys(t);
  for (var r = 0; r < i.length; r++) {
    e[i[r]] = t[i[r]];
  }
  return e;
}

var D = {
  Invalid: [],
  Comment: []
};

function pushRule(e, t, i) {
  if (!e[i]) {
    throw new TypeError("Unknown rule: " + i);
  }
  t.prevState = Object.assign({}, t);
  t.kind = i;
  t.name = null;
  t.type = null;
  t.rule = e[i];
  t.step = 0;
  t.needsSeparator = !1;
}

function popRule(e) {
  if (!e.prevState) {
    return;
  }
  e.kind = e.prevState.kind;
  e.name = e.prevState.name;
  e.type = e.prevState.type;
  e.rule = e.prevState.rule;
  e.step = e.prevState.step;
  e.needsSeparator = e.prevState.needsSeparator;
  e.prevState = e.prevState.prevState;
}

function advanceRule(e, t) {
  var i;
  if (isList(e) && e.rule) {
    var r = e.rule[e.step];
    if (r.separator) {
      var {separator: a} = r;
      e.needsSeparator = !e.needsSeparator;
      if (!e.needsSeparator && a.ofRule) {
        return;
      }
    }
    if (t) {
      return;
    }
  }
  e.needsSeparator = !1;
  e.step++;
  while (e.rule && !(Array.isArray(e.rule) && e.step < e.rule.length)) {
    popRule(e);
    if (e.rule) {
      if (isList(e)) {
        if (null === (i = e.rule) || void 0 === i ? void 0 : i[e.step].separator) {
          e.needsSeparator = !e.needsSeparator;
        }
      } else {
        e.needsSeparator = !1;
        e.step++;
      }
    }
  }
}

function isList(e) {
  var t = Array.isArray(e.rule) && "string" != typeof e.rule[e.step] && e.rule[e.step];
  return t && t.isList;
}

function unsuccessful(e) {
  while (e.rule && (!Array.isArray(e.rule) || !e.rule[e.step].ofRule)) {
    popRule(e);
  }
  if (e.rule) {
    advanceRule(e, !1);
  }
}

function getDefaultExportFromCjs(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}

class Range {
  constructor(e, t) {
    this.containsPosition = e => {
      if (this.start.line === e.line) {
        return this.start.character <= e.character;
      }
      if (this.end.line === e.line) {
        return this.end.character >= e.character;
      }
      return this.start.line <= e.line && this.end.line >= e.line;
    };
    this.start = e;
    this.end = t;
  }
  setStart(e, t) {
    this.start = new Position(e, t);
  }
  setEnd(e, t) {
    this.end = new Position(e, t);
  }
}

class Position {
  constructor(e, t) {
    this.lessThanOrEqualTo = e => this.line < e.line || this.line === e.line && this.character <= e.character;
    this.line = e;
    this.character = t;
  }
  setLine(e) {
    this.line = e;
  }
  setCharacter(e) {
    this.character = e;
  }
}

var L = [ s, o, l, u, h, f, c, p, v, d, g, m ];

var _ = {
  ["Error"]: 1,
  ["Warning"]: 2,
  ["Information"]: 3,
  ["Hint"]: 4
};

var invariant = (e, t) => {
  if (!e) {
    throw new Error(t);
  }
};

function getDiagnostics(s, o = null, l, u, h) {
  var f, c;
  var p = null;
  var v = "";
  if (h) {
    v = "string" == typeof h ? h : h.reduce(((e, t) => e + S(t) + "\n\n"), "");
  }
  var d = v ? `${s}\n\n${v}` : s;
  try {
    p = y(d);
  } catch (e) {
    if (e instanceof x) {
      var g = function getRange(e, t) {
        var i = onlineParser();
        var r = i.startState();
        var a = t.split("\n");
        invariant(a.length >= e.line, "Query text must have more lines than where the error happened");
        var n = null;
        for (var s = 0; s < e.line; s++) {
          n = new CharacterStream(a[s]);
          while (!n.eol()) {
            if ("invalidchar" === i.token(n, r)) {
              break;
            }
          }
        }
        invariant(n, "Expected Parser stream to be available.");
        var o = e.line - 1;
        var l = n.getStartOfToken();
        var u = n.getCurrentPosition();
        return new Range(new Position(o, l), new Position(o, u));
      }(null !== (c = null === (f = e.locations) || void 0 === f ? void 0 : f[0]) && void 0 !== c ? c : {
        line: 0,
        column: 0
      }, d);
      return [ {
        severity: _.Error,
        message: e.message,
        source: "GraphQL: Syntax",
        range: g
      } ];
    }
    throw e;
  }
  return function validateQuery(s, o = null, l, u) {
    if (!o) {
      return [];
    }
    var h = function validateWithCustomRules(s, o, l, u, h) {
      var f = t.filter((e => {
        if (e === i || e === r) {
          return !1;
        }
        if (u && e === a) {
          return !1;
        }
        return !0;
      }));
      if (l) {
        Array.prototype.push.apply(f, l);
      }
      if (h) {
        Array.prototype.push.apply(f, L);
      }
      return n(s, o, f).filter((t => {
        if (t.message.includes("Unknown directive") && t.nodes) {
          var i = t.nodes[0];
          if (i && i.kind === e.DIRECTIVE) {
            var r = i.name.value;
            if ("arguments" === r || "argumentDefinitions" === r) {
              return !1;
            }
          }
        }
        return !0;
      }));
    }(o, s, l, u).flatMap((e => annotations(e, _.Error, "Validation")));
    var f = n(o, s, [ T ]).flatMap((e => annotations(e, _.Warning, "Deprecation")));
    return h.concat(f);
  }(p, o, l, u);
}

function annotations(e, t, i) {
  if (!e.nodes) {
    return [];
  }
  var r = [];
  for (var [a, n] of e.nodes.entries()) {
    var s = "Variable" !== n.kind && "name" in n && void 0 !== n.name ? n.name : "variable" in n && void 0 !== n.variable ? n.variable : n;
    if (s) {
      invariant(e.locations, "GraphQL validation error requires locations.");
      var o = e.locations[a];
      var l = getLocation(s);
      var u = o.column + (l.end - l.start);
      r.push({
        source: `GraphQL: ${i}`,
        message: e.message,
        severity: t,
        range: new Range(new Position(o.line - 1, o.column - 1), new Position(o.line - 1, u))
      });
    }
  }
  return r;
}

function getLocation(e) {
  var t = e.loc;
  invariant(t, "Expected ASTNode to have a location.");
  return t;
}

var C = "FragmentDefinition";

class GraphQLError extends Error {
  constructor(e, t, i, r, a, n, s) {
    super(e);
    this.name = "GraphQLError";
    this.message = e;
    if (a) {
      this.path = a;
    }
    if (t) {
      this.nodes = Array.isArray(t) ? t : [ t ];
    }
    if (i) {
      this.source = i;
    }
    if (r) {
      this.positions = r;
    }
    if (n) {
      this.originalError = n;
    }
    var o = s;
    if (!o && n) {
      var l = n.extensions;
      if (l && "object" == typeof l) {
        o = l;
      }
    }
    this.extensions = o || {};
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

var F;

var N;

function error(e) {
  return new GraphQLError(`Syntax Error: Unexpected token at ${N} in ${e}`);
}

function advance(e) {
  e.lastIndex = N;
  if (e.test(F)) {
    return F.slice(N, N = e.lastIndex);
  }
}

var z = / +(?=[^\s])/y;

function blockString(e) {
  var t = e.split("\n");
  var i = "";
  var r = 0;
  var a = 0;
  var n = t.length - 1;
  for (var s = 0; s < t.length; s++) {
    z.lastIndex = 0;
    if (z.test(t[s])) {
      if (s && (!r || z.lastIndex < r)) {
        r = z.lastIndex;
      }
      a = a || s;
      n = s;
    }
  }
  for (var o = a; o <= n; o++) {
    if (o !== a) {
      i += "\n";
    }
    i += t[o].slice(r).replace(/\\"""/g, '"""');
  }
  return i;
}

function ignored() {
  for (var e = 0 | F.charCodeAt(N++); 9 === e || 10 === e || 13 === e || 32 === e || 35 === e || 44 === e || 65279 === e; e = 0 | F.charCodeAt(N++)) {
    if (35 === e) {
      while (10 !== (e = F.charCodeAt(N++)) && 13 !== e) {}
    }
  }
  N--;
}

var O = /[_A-Za-z]\w*/y;

function name() {
  var e;
  if (e = advance(O)) {
    return {
      kind: "Name",
      value: e
    };
  }
}

var I = /(?:null|true|false)/y;

var $ = /\$[_A-Za-z]\w*/y;

var P = /-?\d+/y;

var R = /(?:\.\d+)?[eE][+-]?\d+|\.\d+/y;

var V = /\\/g;

var j = /"""(?:"""|(?:[\s\S]*?[^\\])""")/y;

var W = /"(?:"|[^\r\n]*?[^\\]")/y;

function value(e) {
  var t;
  var i;
  if (i = advance(I)) {
    t = "null" === i ? {
      kind: "NullValue"
    } : {
      kind: "BooleanValue",
      value: "true" === i
    };
  } else if (!e && (i = advance($))) {
    t = {
      kind: "Variable",
      name: {
        kind: "Name",
        value: i.slice(1)
      }
    };
  } else if (i = advance(P)) {
    var r = i;
    if (i = advance(R)) {
      t = {
        kind: "FloatValue",
        value: r + i
      };
    } else {
      t = {
        kind: "IntValue",
        value: r
      };
    }
  } else if (i = advance(O)) {
    t = {
      kind: "EnumValue",
      value: i
    };
  } else if (i = advance(j)) {
    t = {
      kind: "StringValue",
      value: blockString(i.slice(3, -3)),
      block: !0
    };
  } else if (i = advance(W)) {
    t = {
      kind: "StringValue",
      value: V.test(i) ? JSON.parse(i) : i.slice(1, -1),
      block: !1
    };
  } else if (t = function list(e) {
    var t;
    if (91 === F.charCodeAt(N)) {
      N++;
      ignored();
      var i = [];
      while (t = value(e)) {
        i.push(t);
      }
      if (93 !== F.charCodeAt(N++)) {
        throw error("ListValue");
      }
      ignored();
      return {
        kind: "ListValue",
        values: i
      };
    }
  }(e) || function object(e) {
    if (123 === F.charCodeAt(N)) {
      N++;
      ignored();
      var t = [];
      var i;
      while (i = name()) {
        ignored();
        if (58 !== F.charCodeAt(N++)) {
          throw error("ObjectField");
        }
        ignored();
        var r = value(e);
        if (!r) {
          throw error("ObjectField");
        }
        t.push({
          kind: "ObjectField",
          name: i,
          value: r
        });
      }
      if (125 !== F.charCodeAt(N++)) {
        throw error("ObjectValue");
      }
      ignored();
      return {
        kind: "ObjectValue",
        fields: t
      };
    }
  }(e)) {
    return t;
  }
  ignored();
  return t;
}

function arguments_(e) {
  var t = [];
  ignored();
  if (40 === F.charCodeAt(N)) {
    N++;
    ignored();
    var i;
    while (i = name()) {
      ignored();
      if (58 !== F.charCodeAt(N++)) {
        throw error("Argument");
      }
      ignored();
      var r = value(e);
      if (!r) {
        throw error("Argument");
      }
      t.push({
        kind: "Argument",
        name: i,
        value: r
      });
    }
    if (!t.length || 41 !== F.charCodeAt(N++)) {
      throw error("Argument");
    }
    ignored();
  }
  return t;
}

function directives(e) {
  var t = [];
  ignored();
  while (64 === F.charCodeAt(N)) {
    N++;
    var i = name();
    if (!i) {
      throw error("Directive");
    }
    ignored();
    t.push({
      kind: "Directive",
      name: i,
      arguments: arguments_(e)
    });
  }
  return t;
}

function field() {
  var e = name();
  if (e) {
    ignored();
    var t;
    if (58 === F.charCodeAt(N)) {
      N++;
      ignored();
      t = e;
      if (!(e = name())) {
        throw error("Field");
      }
      ignored();
    }
    return {
      kind: "Field",
      alias: t,
      name: e,
      arguments: arguments_(!1),
      directives: directives(!1),
      selectionSet: selectionSet()
    };
  }
}

function type() {
  var e;
  ignored();
  if (91 === F.charCodeAt(N)) {
    N++;
    ignored();
    var t = type();
    if (!t || 93 !== F.charCodeAt(N++)) {
      throw error("ListType");
    }
    e = {
      kind: "ListType",
      type: t
    };
  } else if (e = name()) {
    e = {
      kind: "NamedType",
      name: e
    };
  } else {
    throw error("NamedType");
  }
  ignored();
  if (33 === F.charCodeAt(N)) {
    N++;
    ignored();
    return {
      kind: "NonNullType",
      type: e
    };
  } else {
    return e;
  }
}

var M = /on/y;

function typeCondition() {
  if (advance(M)) {
    ignored();
    var e = name();
    if (!e) {
      throw error("NamedType");
    }
    ignored();
    return {
      kind: "NamedType",
      name: e
    };
  }
}

var B = /\.\.\./y;

function fragmentSpread() {
  if (advance(B)) {
    ignored();
    var e = N;
    var t;
    if ((t = name()) && "on" !== t.value) {
      return {
        kind: "FragmentSpread",
        name: t,
        directives: directives(!1)
      };
    } else {
      N = e;
      var i = typeCondition();
      var r = directives(!1);
      var a = selectionSet();
      if (!a) {
        throw error("InlineFragment");
      }
      return {
        kind: "InlineFragment",
        typeCondition: i,
        directives: r,
        selectionSet: a
      };
    }
  }
}

function selectionSet() {
  var e;
  ignored();
  if (123 === F.charCodeAt(N)) {
    N++;
    ignored();
    var t = [];
    while (e = fragmentSpread() || field()) {
      t.push(e);
    }
    if (!t.length || 125 !== F.charCodeAt(N++)) {
      throw error("SelectionSet");
    }
    ignored();
    return {
      kind: "SelectionSet",
      selections: t
    };
  }
}

var U = /fragment/y;

function fragmentDefinition() {
  if (advance(U)) {
    ignored();
    var e = name();
    if (!e) {
      throw error("FragmentDefinition");
    }
    ignored();
    var t = typeCondition();
    if (!t) {
      throw error("FragmentDefinition");
    }
    var i = directives(!1);
    var r = selectionSet();
    if (!r) {
      throw error("FragmentDefinition");
    }
    return {
      kind: "FragmentDefinition",
      name: e,
      typeCondition: t,
      directives: i,
      selectionSet: r
    };
  }
}

var G = /(?:query|mutation|subscription)/y;

function operationDefinition() {
  var e;
  var t;
  var i = [];
  var r = [];
  if (e = advance(G)) {
    ignored();
    t = name();
    i = function variableDefinitions() {
      var e;
      var t = [];
      ignored();
      if (40 === F.charCodeAt(N)) {
        N++;
        ignored();
        while (e = advance($)) {
          ignored();
          if (58 !== F.charCodeAt(N++)) {
            throw error("VariableDefinition");
          }
          var i = type();
          var r = void 0;
          if (61 === F.charCodeAt(N)) {
            N++;
            ignored();
            if (!(r = value(!0))) {
              throw error("VariableDefinition");
            }
          }
          ignored();
          t.push({
            kind: "VariableDefinition",
            variable: {
              kind: "Variable",
              name: {
                kind: "Name",
                value: e.slice(1)
              }
            },
            type: i,
            defaultValue: r,
            directives: directives(!0)
          });
        }
        if (41 !== F.charCodeAt(N++)) {
          throw error("VariableDefinition");
        }
        ignored();
      }
      return t;
    }();
    r = directives(!1);
  }
  var a = selectionSet();
  if (a) {
    return {
      kind: "OperationDefinition",
      operation: e || "query",
      name: t,
      variableDefinitions: i,
      directives: r,
      selectionSet: a
    };
  }
}

function parse(e, t) {
  F = "string" == typeof e.body ? e.body : e;
  N = 0;
  return function document() {
    var e;
    ignored();
    var t = [];
    while (e = fragmentDefinition() || operationDefinition()) {
      t.push(e);
    }
    return {
      kind: "Document",
      definitions: t
    };
  }();
}

var Q = {};

function visit(e, t) {
  var i = [];
  var r = [];
  try {
    var a = function traverse(e, a, n) {
      var s = !1;
      var o = t[e.kind] && t[e.kind].enter || t[e.kind] || t.enter;
      var l = o && o.call(t, e, a, n, r, i);
      if (!1 === l) {
        return e;
      } else if (null === l) {
        return null;
      } else if (l === Q) {
        throw Q;
      } else if (l && "string" == typeof l.kind) {
        s = l !== e;
        e = l;
      }
      if (n) {
        i.push(n);
      }
      var u;
      var h = {
        ...e
      };
      for (var f in e) {
        r.push(f);
        var c = e[f];
        if (Array.isArray(c)) {
          var p = [];
          for (var v = 0; v < c.length; v++) {
            if (null != c[v] && "string" == typeof c[v].kind) {
              i.push(e);
              r.push(v);
              u = traverse(c[v], v, c);
              r.pop();
              i.pop();
              if (null == u) {
                s = !0;
              } else {
                s = s || u !== c[v];
                p.push(u);
              }
            }
          }
          c = p;
        } else if (null != c && "string" == typeof c.kind) {
          if (void 0 !== (u = traverse(c, f, e))) {
            s = s || c !== u;
            c = u;
          }
        }
        r.pop();
        if (s) {
          h[f] = c;
        }
      }
      if (n) {
        i.pop();
      }
      var d = t[e.kind] && t[e.kind].leave || t.leave;
      var g = d && d.call(t, e, a, n, r, i);
      if (g === Q) {
        throw Q;
      } else if (void 0 !== g) {
        return g;
      } else if (void 0 !== l) {
        return s ? h : l;
      } else {
        return s ? h : e;
      }
    }(e);
    return void 0 !== a && !1 !== a ? a : e;
  } catch (t) {
    if (t !== Q) {
      throw t;
    }
    return e;
  }
}

var hasItems = e => !(!e || !e.length);

var q = {
  OperationDefinition(e) {
    if ("query" === e.operation && !e.name && !hasItems(e.variableDefinitions) && !hasItems(e.directives)) {
      return q.SelectionSet(e.selectionSet);
    }
    var t = e.operation;
    if (e.name) {
      t += " " + e.name.value;
    }
    if (hasItems(e.variableDefinitions)) {
      if (!e.name) {
        t += " ";
      }
      t += "(" + e.variableDefinitions.map(q.VariableDefinition).join(", ") + ")";
    }
    if (hasItems(e.directives)) {
      t += " " + e.directives.map(q.Directive).join(" ");
    }
    return t + " " + q.SelectionSet(e.selectionSet);
  },
  VariableDefinition(e) {
    var t = q.Variable(e.variable) + ": " + print(e.type);
    if (e.defaultValue) {
      t += " = " + print(e.defaultValue);
    }
    if (hasItems(e.directives)) {
      t += " " + e.directives.map(q.Directive).join(" ");
    }
    return t;
  },
  Field(e) {
    var t = (e.alias ? e.alias.value + ": " : "") + e.name.value;
    if (hasItems(e.arguments)) {
      var i = e.arguments.map(q.Argument);
      var r = t + "(" + i.join(", ") + ")";
      t = r.length > 80 ? t + "(\n  " + i.join("\n").replace(/\n/g, "\n  ") + "\n)" : r;
    }
    if (hasItems(e.directives)) {
      t += " " + e.directives.map(q.Directive).join(" ");
    }
    return e.selectionSet ? t + " " + q.SelectionSet(e.selectionSet) : t;
  },
  StringValue: e => e.block ? function printBlockString(e) {
    return '"""\n' + e.replace(/"""/g, '\\"""') + '\n"""';
  }(e.value) : function printString(e) {
    return JSON.stringify(e);
  }(e.value),
  BooleanValue: e => "" + e.value,
  NullValue: e => "null",
  IntValue: e => e.value,
  FloatValue: e => e.value,
  EnumValue: e => e.value,
  Name: e => e.value,
  Variable: e => "$" + e.name.value,
  ListValue: e => "[" + e.values.map(print).join(", ") + "]",
  ObjectValue: e => "{" + e.fields.map(q.ObjectField).join(", ") + "}",
  ObjectField: e => e.name.value + ": " + print(e.value),
  Document: e => hasItems(e.definitions) ? e.definitions.map(print).join("\n\n") : "",
  SelectionSet: e => "{\n  " + e.selections.map(print).join("\n").replace(/\n/g, "\n  ") + "\n}",
  Argument: e => e.name.value + ": " + print(e.value),
  FragmentSpread(e) {
    var t = "..." + e.name.value;
    if (hasItems(e.directives)) {
      t += " " + e.directives.map(q.Directive).join(" ");
    }
    return t;
  },
  InlineFragment(e) {
    var t = "...";
    if (e.typeCondition) {
      t += " on " + e.typeCondition.name.value;
    }
    if (hasItems(e.directives)) {
      t += " " + e.directives.map(q.Directive).join(" ");
    }
    return t + " " + print(e.selectionSet);
  },
  FragmentDefinition(e) {
    var t = "fragment " + e.name.value;
    t += " on " + e.typeCondition.name.value;
    if (hasItems(e.directives)) {
      t += " " + e.directives.map(q.Directive).join(" ");
    }
    return t + " " + print(e.selectionSet);
  },
  Directive(e) {
    var t = "@" + e.name.value;
    if (hasItems(e.arguments)) {
      t += "(" + e.arguments.map(q.Argument).join(", ") + ")";
    }
    return t;
  },
  NamedType: e => e.name.value,
  ListType: e => "[" + print(e.type) + "]",
  NonNullType: e => print(e.type) + "!"
};

function print(e) {
  return q[e.kind] ? q[e.kind](e) : "";
}

var H = new Set([ "gql", "graphql" ]);

var isIIFE = e => b.isCallExpression(e) && 0 === e.arguments.length && (b.isFunctionExpression(e.expression) || b.isArrowFunction(e.expression)) && !e.expression.asteriskToken && !e.expression.modifiers?.length;

var isGraphQLFunctionIdentifier = e => b.isIdentifier(e) && H.has(e.escapedText);

var isTadaGraphQLFunction = (e, t) => {
  if (!b.isLeftHandSideExpression(e)) {
    return !1;
  }
  var i = t?.getTypeAtLocation(e);
  return null != i && null != i.getProperty("scalar") && null != i.getProperty("persisted");
};

var isTadaGraphQLCall = (e, t) => {
  if (!b.isCallExpression(e)) {
    return !1;
  } else if (e.arguments.length < 1 || e.arguments.length > 2) {
    return !1;
  } else if (!b.isStringLiteralLike(e.arguments[0])) {
    return !1;
  }
  return t ? isTadaGraphQLFunction(e.expression, t) : !1;
};

var isTadaPersistedCall = (e, t) => {
  if (!e) {
    return !1;
  } else if (!b.isCallExpression(e)) {
    return !1;
  } else if (!b.isPropertyAccessExpression(e.expression)) {
    return !1;
  } else if (!b.isIdentifier(e.expression.name) || "persisted" !== e.expression.name.escapedText) {
    return !1;
  } else if (isGraphQLFunctionIdentifier(e.expression.expression)) {
    return !0;
  } else {
    return isTadaGraphQLFunction(e.expression.expression, t);
  }
};

var isGraphQLCall = (e, t) => b.isCallExpression(e) && e.arguments.length >= 1 && e.arguments.length <= 2 && (isGraphQLFunctionIdentifier(e.expression) || isTadaGraphQLCall(e, t));

var isGraphQLTag = e => b.isTaggedTemplateExpression(e) && isGraphQLFunctionIdentifier(e.tag);

var getSchemaName = (e, t, i = !1) => {
  if (!t) {
    return null;
  }
  var r = t.getTypeAtLocation(i ? e.getChildAt(0).getChildAt(0) : e.expression);
  if (r) {
    var a = r.getProperty("__name");
    if (a) {
      var n = t.getTypeOfSymbol(a);
      if (n.isUnionOrIntersection()) {
        var s = n.types.find((e => e.isStringLiteral()));
        return s && s.isStringLiteral() ? s.value : null;
      } else if (n.isStringLiteral()) {
        return n.value;
      }
    }
  }
  return null;
};

function resolveTemplate(e, t, i) {
  if (b.isStringLiteralLike(e)) {
    return {
      combinedText: e.getText().slice(1, -1),
      resolvedSpans: []
    };
  }
  var r = e.template.getText().slice(1, -1);
  if (b.isNoSubstitutionTemplateLiteral(e.template) || 0 === e.template.templateSpans.length) {
    return {
      combinedText: r,
      resolvedSpans: []
    };
  }
  var a = 0;
  var n = e.template.templateSpans.map((e => {
    if (b.isIdentifier(e.expression)) {
      var n = i.languageService.getDefinitionAtPosition(t, e.expression.getStart());
      var s = n && n[0];
      if (!s) {
        return;
      }
      var o = getSource(i, s.fileName);
      if (!o) {
        return;
      }
      var l = findNode(o, s.textSpan.start);
      if (!l || !l.parent) {
        return;
      }
      var u = l.parent;
      if (b.isVariableDeclaration(u)) {
        var h = e.expression.escapedText;
        var f = e.expression.getStart() - 2;
        var c = {
          start: f,
          length: e.expression.end - f + 1
        };
        if (u.initializer && b.isTaggedTemplateExpression(u.initializer)) {
          var p = resolveTemplate(u.initializer, s.fileName, i);
          r = r.replace("${" + e.expression.escapedText + "}", p.combinedText);
          var v = {
            lines: p.combinedText.split("\n").length,
            identifier: h,
            original: c,
            new: {
              start: c.start + a,
              length: p.combinedText.length
            }
          };
          a += p.combinedText.length - c.length;
          return v;
        } else if (u.initializer && b.isAsExpression(u.initializer) && b.isTaggedTemplateExpression(u.initializer.expression)) {
          var d = resolveTemplate(u.initializer.expression, s.fileName, i);
          r = r.replace("${" + e.expression.escapedText + "}", d.combinedText);
          var g = {
            lines: d.combinedText.split("\n").length,
            identifier: h,
            original: c,
            new: {
              start: c.start + a,
              length: d.combinedText.length
            }
          };
          a += d.combinedText.length - c.length;
          return g;
        } else if (u.initializer && b.isAsExpression(u.initializer) && b.isAsExpression(u.initializer.expression) && b.isObjectLiteralExpression(u.initializer.expression.expression)) {
          var m = print(JSON.parse(u.initializer.expression.expression.getText()));
          r = r.replace("${" + e.expression.escapedText + "}", m);
          var S = {
            lines: m.split("\n").length,
            identifier: h,
            original: c,
            new: {
              start: c.start + a,
              length: m.length
            }
          };
          a += m.length - c.length;
          return S;
        }
        return;
      }
    }
    return;
  })).filter(Boolean);
  return {
    combinedText: r,
    resolvedSpans: n
  };
}

var resolveTadaFragmentArray = e => {
  if (!e) {
    return;
  }
  while (b.isAsExpression(e)) {
    e = e.expression;
  }
  if (!b.isArrayLiteralExpression(e)) {
    return;
  }
  if (e.elements.every(b.isIdentifier)) {
    return e.elements;
  }
  var t = [];
  for (var i of e.elements) {
    while (b.isPropertyAccessExpression(i)) {
      i = i.name;
    }
    if (b.isIdentifier(i)) {
      t.push(i);
    }
  }
  return t;
};

function getSource(e, t) {
  var i = e.languageService.getProgram();
  if (!i) {
    return;
  }
  var r = i.getSourceFile(t);
  if (!r) {
    return;
  }
  return r;
}

function findNode(e, t) {
  return function find(e) {
    if (t >= e.getStart() && t < e.getEnd()) {
      return b.forEachChild(e, find) || e;
    }
  }(e);
}

function unrollFragment(e, t, i) {
  var r = [];
  var a = [ e ];
  var n = new WeakSet;
  var _unrollElement = e => {
    if (n.has(e)) {
      return;
    }
    n.add(e);
    var s = function resolveIdentifierToGraphQLCall(e, t, i) {
      var r;
      var a = e;
      while (b.isIdentifier(a) && a !== r) {
        r = a;
        var n = t.languageService.getDefinitionAtPosition(a.getSourceFile().fileName, a.getStart());
        var s = n && n[0];
        var o = s && getSource(t, s.fileName);
        if (!s || !o) {
          return null;
        }
        if (!(a = findNode(o, s.textSpan.start))) {
          return null;
        }
        while (b.isPropertyAccessExpression(a.parent)) {
          a = a.parent;
        }
        if (b.isVariableDeclaration(a.parent) && a.parent.initializer && b.isCallExpression(a.parent.initializer)) {
          a = a.parent.initializer;
        } else if (b.isPropertyAssignment(a.parent)) {
          a = a.parent.initializer;
        } else if (b.isBinaryExpression(a.parent)) {
          a = b.isPropertyAccessExpression(a.parent.right) ? a.parent.right.name : a.parent.right;
        }
      }
      return isGraphQLCall(a, i) ? a : null;
    }(e, t, i);
    if (!s) {
      return;
    }
    var o = resolveTadaFragmentArray(s.arguments[1]);
    if (o) {
      a.push(...o);
    }
    try {
      y(s.arguments[0].getText().slice(1, -1), {
        noLocation: !0
      }).definitions.forEach((e => {
        if ("FragmentDefinition" === e.kind) {
          r.push(e);
        }
      }));
    } catch (e) {}
  };
  var s;
  while (void 0 !== (s = a.shift())) {
    _unrollElement(s);
  }
  return r;
}

function unrollTadaFragments(e, t, i) {
  var r = i.languageService.getProgram()?.getTypeChecker();
  e.elements.forEach((e => {
    if (b.isIdentifier(e)) {
      t.push(...unrollFragment(e, i, r));
    } else if (b.isPropertyAccessExpression(e)) {
      var a = e;
      while (b.isPropertyAccessExpression(a.expression)) {
        a = a.expression;
      }
      if (b.isIdentifier(a.name)) {
        t.push(...unrollFragment(a.name, i, r));
      }
    }
  }));
  return t;
}

function findAllCallExpressions(e, t, i = !0) {
  var r = t.languageService.getProgram()?.getTypeChecker();
  var a = [];
  var n = [];
  var s = i ? !1 : !0;
  !function find(i) {
    if (!b.isCallExpression(i) || isIIFE(i)) {
      return b.forEachChild(i, find);
    }
    if (!isGraphQLCall(i, r)) {
      return b.forEachChild(i, find);
    }
    var o = getSchemaName(i, r);
    var l = i.arguments[0];
    var u = resolveTadaFragmentArray(i.arguments[1]);
    if (!s && !u) {
      s = !0;
      n.push(...getAllFragments(e.fileName, i, t));
    } else if (u) {
      for (var h of u) {
        n.push(...unrollFragment(h, t, r));
      }
    }
    if (l && b.isStringLiteralLike(l)) {
      a.push({
        node: l,
        schema: o
      });
    }
  }(e);
  return {
    nodes: a,
    fragments: n
  };
}

function findAllPersistedCallExpressions(e, t) {
  var i = [];
  var r = t?.languageService.getProgram()?.getTypeChecker();
  !function find(e) {
    if (!b.isCallExpression(e) || isIIFE(e)) {
      return b.forEachChild(e, find);
    }
    if (!isTadaPersistedCall(e, r)) {
      return;
    } else if (t) {
      var a = getSchemaName(e, r, !0);
      i.push({
        node: e,
        schema: a
      });
    } else {
      i.push(e);
    }
  }(e);
  return i;
}

function getAllFragments(e, t, i) {
  var r = [];
  var a = i.languageService.getProgram()?.getTypeChecker();
  if (!b.isCallExpression(t)) {
    return r;
  }
  var n = resolveTadaFragmentArray(t.arguments[1]);
  if (n) {
    var s = i.languageService.getProgram()?.getTypeChecker();
    for (var o of n) {
      r.push(...unrollFragment(o, i, s));
    }
    return r;
  } else if (isTadaGraphQLCall(t, a)) {
    return r;
  }
  var l = i.languageService.getDefinitionAtPosition(e, t.expression.getStart());
  if (!l || !l.length) {
    return r;
  }
  var u = l[0];
  if (!u) {
    return r;
  }
  var h = getSource(i, u.fileName);
  if (!h) {
    return r;
  }
  b.forEachChild(h, (e => {
    if (b.isVariableStatement(e) && e.declarationList && e.declarationList.declarations[0] && "documents" === e.declarationList.declarations[0].name.getText()) {
      var [t] = e.declarationList.declarations;
      if (t.initializer && b.isObjectLiteralExpression(t.initializer)) {
        t.initializer.properties.forEach((e => {
          if (b.isPropertyAssignment(e) && b.isStringLiteral(e.name)) {
            try {
              var t = JSON.parse(`${e.name.getText().replace(/'/g, '"')}`);
              if (t.includes("fragment ") && t.includes(" on ")) {
                y(t, {
                  noLocation: !0
                }).definitions.forEach((e => {
                  if ("FragmentDefinition" === e.kind) {
                    r.push(e);
                  }
                }));
              }
            } catch (e) {}
          }
        }));
      }
    }
  }));
  return r;
}

function bubbleUpTemplate(e) {
  while (b.isNoSubstitutionTemplateLiteral(e) || b.isToken(e) || b.isTemplateExpression(e) || b.isTemplateSpan(e)) {
    e = e.parent;
  }
  return e;
}

function bubbleUpCallExpression(e) {
  while (b.isStringLiteralLike(e) || b.isToken(e) || b.isTemplateExpression(e) || b.isTemplateSpan(e)) {
    e = e.parent;
  }
  return e;
}

var X = "object" == typeof performance && performance && "function" == typeof performance.now ? performance : Date;

var Y = new Set;

var J = "object" == typeof process && process ? process : {};

var emitWarning = (e, t, i, r) => {
  "function" == typeof J.emitWarning ? J.emitWarning(e, t, i, r) : console.error(`[${i}] ${t}: ${e}`);
};

var Z = globalThis.AbortController;

var K = globalThis.AbortSignal;

if (void 0 === Z) {
  K = class AbortSignal {
    _onabort=[];
    aborted=!1;
    addEventListener(e, t) {
      this._onabort.push(t);
    }
  };
  Z = class AbortController {
    constructor() {
      warnACPolyfill();
    }
    signal=new K;
    abort(e) {
      if (this.signal.aborted) {
        return;
      }
      this.signal.reason = e;
      this.signal.aborted = !0;
      for (var t of this.signal._onabort) {
        t(e);
      }
      this.signal.onabort?.(e);
    }
  };
  var ee = "1" !== J.env?.LRU_CACHE_IGNORE_AC_WARNING;
  var warnACPolyfill = () => {
    if (!ee) {
      return;
    }
    ee = !1;
    emitWarning("AbortController is not defined. If using lru-cache in node 14, load an AbortController polyfill from the `node-abort-controller` package. A minimal polyfill is provided for use by LRUCache.fetch(), but it should not be relied upon in other contexts (eg, passing it to other APIs that use AbortController/AbortSignal might have undesirable effects). You may disable this with LRU_CACHE_IGNORE_AC_WARNING=1 in the env.", "NO_ABORT_CONTROLLER", "ENOTSUP", warnACPolyfill);
  };
}

var isPosInt = e => e && e === Math.floor(e) && e > 0 && isFinite(e);

var getUintArray = e => !isPosInt(e) ? null : e <= Math.pow(2, 8) ? Uint8Array : e <= Math.pow(2, 16) ? Uint16Array : e <= Math.pow(2, 32) ? Uint32Array : e <= Number.MAX_SAFE_INTEGER ? ZeroArray : null;

class ZeroArray extends Array {
  constructor(e) {
    super(e);
    this.fill(0);
  }
}

class Stack {
  static #e=!1;
  static create(e) {
    var t = getUintArray(e);
    if (!t) {
      return [];
    }
    Stack.#e = !0;
    var i = new Stack(e, t);
    Stack.#e = !1;
    return i;
  }
  constructor(e, t) {
    if (!Stack.#e) {
      throw new TypeError("instantiate Stack using Stack.create(n)");
    }
    this.heap = new t(e);
    this.length = 0;
  }
  push(e) {
    this.heap[this.length++] = e;
  }
  pop() {
    return this.heap[--this.length];
  }
}

class LRUCache {
  #t;
  #i;
  #r;
  #a;
  #n;
  #s;
  #o;
  #l;
  #u;
  #h;
  #f;
  #c;
  #p;
  #v;
  #d;
  #g;
  #m;
  #S;
  #y;
  #x;
  #T;
  #E;
  static unsafeExposeInternals(e) {
    return {
      starts: e.#S,
      ttls: e.#y,
      sizes: e.#m,
      keyMap: e.#l,
      keyList: e.#u,
      valList: e.#h,
      next: e.#f,
      prev: e.#c,
      get head() {
        return e.#p;
      },
      get tail() {
        return e.#v;
      },
      free: e.#d,
      isBackgroundFetch: t => e.#A(t),
      backgroundFetch: (t, i, r, a) => e.#b(t, i, r, a),
      moveToTail: t => e.#w(t),
      indexes: t => e.#k(t),
      rindexes: t => e.#D(t),
      isStale: t => e.#L(t)
    };
  }
  get max() {
    return this.#t;
  }
  get maxSize() {
    return this.#i;
  }
  get calculatedSize() {
    return this.#o;
  }
  get size() {
    return this.#s;
  }
  get fetchMethod() {
    return this.#n;
  }
  get dispose() {
    return this.#r;
  }
  get disposeAfter() {
    return this.#a;
  }
  constructor(e) {
    var {max: t = 0, ttl: i, ttlResolution: r = 1, ttlAutopurge: a, updateAgeOnGet: n, updateAgeOnHas: s, allowStale: o, dispose: l, disposeAfter: u, noDisposeOnSet: h, noUpdateTTL: f, maxSize: c = 0, maxEntrySize: p = 0, sizeCalculation: v, fetchMethod: d, noDeleteOnFetchRejection: g, noDeleteOnStaleGet: m, allowStaleOnFetchRejection: S, allowStaleOnFetchAbort: y, ignoreFetchAbort: x} = e;
    if (0 !== t && !isPosInt(t)) {
      throw new TypeError("max option must be a nonnegative integer");
    }
    var T = t ? getUintArray(t) : Array;
    if (!T) {
      throw new Error("invalid max value: " + t);
    }
    this.#t = t;
    this.#i = c;
    this.maxEntrySize = p || this.#i;
    this.sizeCalculation = v;
    if (this.sizeCalculation) {
      if (!this.#i && !this.maxEntrySize) {
        throw new TypeError("cannot set sizeCalculation without setting maxSize or maxEntrySize");
      }
      if ("function" != typeof this.sizeCalculation) {
        throw new TypeError("sizeCalculation set to non-function");
      }
    }
    if (void 0 !== d && "function" != typeof d) {
      throw new TypeError("fetchMethod must be a function if specified");
    }
    this.#n = d;
    this.#T = !!d;
    this.#l = new Map;
    this.#u = new Array(t).fill(void 0);
    this.#h = new Array(t).fill(void 0);
    this.#f = new T(t);
    this.#c = new T(t);
    this.#p = 0;
    this.#v = 0;
    this.#d = Stack.create(t);
    this.#s = 0;
    this.#o = 0;
    if ("function" == typeof l) {
      this.#r = l;
    }
    if ("function" == typeof u) {
      this.#a = u;
      this.#g = [];
    } else {
      this.#a = void 0;
      this.#g = void 0;
    }
    this.#x = !!this.#r;
    this.#E = !!this.#a;
    this.noDisposeOnSet = !!h;
    this.noUpdateTTL = !!f;
    this.noDeleteOnFetchRejection = !!g;
    this.allowStaleOnFetchRejection = !!S;
    this.allowStaleOnFetchAbort = !!y;
    this.ignoreFetchAbort = !!x;
    if (0 !== this.maxEntrySize) {
      if (0 !== this.#i) {
        if (!isPosInt(this.#i)) {
          throw new TypeError("maxSize must be a positive integer if specified");
        }
      }
      if (!isPosInt(this.maxEntrySize)) {
        throw new TypeError("maxEntrySize must be a positive integer if specified");
      }
      this.#_();
    }
    this.allowStale = !!o;
    this.noDeleteOnStaleGet = !!m;
    this.updateAgeOnGet = !!n;
    this.updateAgeOnHas = !!s;
    this.ttlResolution = isPosInt(r) || 0 === r ? r : 1;
    this.ttlAutopurge = !!a;
    this.ttl = i || 0;
    if (this.ttl) {
      if (!isPosInt(this.ttl)) {
        throw new TypeError("ttl must be a positive integer if specified");
      }
      this.#C();
    }
    if (0 === this.#t && 0 === this.ttl && 0 === this.#i) {
      throw new TypeError("At least one of max, maxSize, or ttl is required");
    }
    if (!this.ttlAutopurge && !this.#t && !this.#i) {
      var E = "LRU_CACHE_UNBOUNDED";
      if ((e => !Y.has(e))(E)) {
        Y.add(E);
        emitWarning("TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.", "UnboundedCacheWarning", E, LRUCache);
      }
    }
  }
  getRemainingTTL(e) {
    return this.#l.has(e) ? 1 / 0 : 0;
  }
  #C() {
    var e = new ZeroArray(this.#t);
    var t = new ZeroArray(this.#t);
    this.#y = e;
    this.#S = t;
    this.#F = (i, r, a = X.now()) => {
      t[i] = 0 !== r ? a : 0;
      e[i] = r;
      if (0 !== r && this.ttlAutopurge) {
        var n = setTimeout((() => {
          if (this.#L(i)) {
            this.delete(this.#u[i]);
          }
        }), r + 1);
        if (n.unref) {
          n.unref();
        }
      }
    };
    this.#N = i => {
      t[i] = 0 !== e[i] ? X.now() : 0;
    };
    this.#z = (r, a) => {
      if (e[a]) {
        var n = e[a];
        var s = t[a];
        r.ttl = n;
        r.start = s;
        r.now = i || getNow();
        r.remainingTTL = n - (r.now - s);
      }
    };
    var i = 0;
    var getNow = () => {
      var e = X.now();
      if (this.ttlResolution > 0) {
        i = e;
        var t = setTimeout((() => i = 0), this.ttlResolution);
        if (t.unref) {
          t.unref();
        }
      }
      return e;
    };
    this.getRemainingTTL = r => {
      var a = this.#l.get(r);
      if (void 0 === a) {
        return 0;
      }
      var n = e[a];
      var s = t[a];
      if (0 === n || 0 === s) {
        return 1 / 0;
      }
      return n - ((i || getNow()) - s);
    };
    this.#L = r => 0 !== e[r] && 0 !== t[r] && (i || getNow()) - t[r] > e[r];
  }
  #N=() => {};
  #z=() => {};
  #F=() => {};
  #L=() => !1;
  #_() {
    var e = new ZeroArray(this.#t);
    this.#o = 0;
    this.#m = e;
    this.#O = t => {
      this.#o -= e[t];
      e[t] = 0;
    };
    this.#I = (e, t, i, r) => {
      if (this.#A(t)) {
        return 0;
      }
      if (!isPosInt(i)) {
        if (r) {
          if ("function" != typeof r) {
            throw new TypeError("sizeCalculation must be a function");
          }
          i = r(t, e);
          if (!isPosInt(i)) {
            throw new TypeError("sizeCalculation return invalid (expect positive integer)");
          }
        } else {
          throw new TypeError("invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set.");
        }
      }
      return i;
    };
    this.#$ = (t, i, r) => {
      e[t] = i;
      if (this.#i) {
        var a = this.#i - e[t];
        while (this.#o > a) {
          this.#P(!0);
        }
      }
      this.#o += e[t];
      if (r) {
        r.entrySize = i;
        r.totalCalculatedSize = this.#o;
      }
    };
  }
  #O=e => {};
  #$=(e, t, i) => {};
  #I=(e, t, i, r) => {
    if (i || r) {
      throw new TypeError("cannot set size without setting maxSize or maxEntrySize on cache");
    }
    return 0;
  };
  * #k({allowStale: e = this.allowStale} = {}) {
    if (this.#s) {
      for (var t = this.#v; 1; ) {
        if (!this.#R(t)) {
          break;
        }
        if (e || !this.#L(t)) {
          yield t;
        }
        if (t === this.#p) {
          break;
        } else {
          t = this.#c[t];
        }
      }
    }
  }
  * #D({allowStale: e = this.allowStale} = {}) {
    if (this.#s) {
      for (var t = this.#p; 1; ) {
        if (!this.#R(t)) {
          break;
        }
        if (e || !this.#L(t)) {
          yield t;
        }
        if (t === this.#v) {
          break;
        } else {
          t = this.#f[t];
        }
      }
    }
  }
  #R(e) {
    return void 0 !== e && this.#l.get(this.#u[e]) === e;
  }
  * entries() {
    for (var e of this.#k()) {
      if (void 0 !== this.#h[e] && void 0 !== this.#u[e] && !this.#A(this.#h[e])) {
        yield [ this.#u[e], this.#h[e] ];
      }
    }
  }
  * rentries() {
    for (var e of this.#D()) {
      if (void 0 !== this.#h[e] && void 0 !== this.#u[e] && !this.#A(this.#h[e])) {
        yield [ this.#u[e], this.#h[e] ];
      }
    }
  }
  * keys() {
    for (var e of this.#k()) {
      var t = this.#u[e];
      if (void 0 !== t && !this.#A(this.#h[e])) {
        yield t;
      }
    }
  }
  * rkeys() {
    for (var e of this.#D()) {
      var t = this.#u[e];
      if (void 0 !== t && !this.#A(this.#h[e])) {
        yield t;
      }
    }
  }
  * values() {
    for (var e of this.#k()) {
      if (void 0 !== this.#h[e] && !this.#A(this.#h[e])) {
        yield this.#h[e];
      }
    }
  }
  * rvalues() {
    for (var e of this.#D()) {
      if (void 0 !== this.#h[e] && !this.#A(this.#h[e])) {
        yield this.#h[e];
      }
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  find(e, t = {}) {
    for (var i of this.#k()) {
      var r = this.#h[i];
      var a = this.#A(r) ? r.__staleWhileFetching : r;
      if (void 0 === a) {
        continue;
      }
      if (e(a, this.#u[i], this)) {
        return this.get(this.#u[i], t);
      }
    }
  }
  forEach(e, t = this) {
    for (var i of this.#k()) {
      var r = this.#h[i];
      var a = this.#A(r) ? r.__staleWhileFetching : r;
      if (void 0 === a) {
        continue;
      }
      e.call(t, a, this.#u[i], this);
    }
  }
  rforEach(e, t = this) {
    for (var i of this.#D()) {
      var r = this.#h[i];
      var a = this.#A(r) ? r.__staleWhileFetching : r;
      if (void 0 === a) {
        continue;
      }
      e.call(t, a, this.#u[i], this);
    }
  }
  purgeStale() {
    var e = !1;
    for (var t of this.#D({
      allowStale: !0
    })) {
      if (this.#L(t)) {
        this.delete(this.#u[t]);
        e = !0;
      }
    }
    return e;
  }
  dump() {
    var e = [];
    for (var t of this.#k({
      allowStale: !0
    })) {
      var i = this.#u[t];
      var r = this.#h[t];
      var a = this.#A(r) ? r.__staleWhileFetching : r;
      if (void 0 === a || void 0 === i) {
        continue;
      }
      var n = {
        value: a
      };
      if (this.#y && this.#S) {
        n.ttl = this.#y[t];
        var s = X.now() - this.#S[t];
        n.start = Math.floor(Date.now() - s);
      }
      if (this.#m) {
        n.size = this.#m[t];
      }
      e.unshift([ i, n ]);
    }
    return e;
  }
  load(e) {
    this.clear();
    for (var [t, i] of e) {
      if (i.start) {
        var r = Date.now() - i.start;
        i.start = X.now() - r;
      }
      this.set(t, i.value, i);
    }
  }
  set(e, t, i = {}) {
    if (void 0 === t) {
      this.delete(e);
      return this;
    }
    var {ttl: r = this.ttl, start: a, noDisposeOnSet: n = this.noDisposeOnSet, sizeCalculation: s = this.sizeCalculation, status: o} = i;
    var {noUpdateTTL: l = this.noUpdateTTL} = i;
    var u = this.#I(e, t, i.size || 0, s);
    if (this.maxEntrySize && u > this.maxEntrySize) {
      if (o) {
        o.set = "miss";
        o.maxEntrySizeExceeded = !0;
      }
      this.delete(e);
      return this;
    }
    var h = 0 === this.#s ? void 0 : this.#l.get(e);
    if (void 0 === h) {
      h = 0 === this.#s ? this.#v : 0 !== this.#d.length ? this.#d.pop() : this.#s === this.#t ? this.#P(!1) : this.#s;
      this.#u[h] = e;
      this.#h[h] = t;
      this.#l.set(e, h);
      this.#f[this.#v] = h;
      this.#c[h] = this.#v;
      this.#v = h;
      this.#s++;
      this.#$(h, u, o);
      if (o) {
        o.set = "add";
      }
      l = !1;
    } else {
      this.#w(h);
      var f = this.#h[h];
      if (t !== f) {
        if (this.#T && this.#A(f)) {
          f.__abortController.abort(new Error("replaced"));
          var {__staleWhileFetching: c} = f;
          if (void 0 !== c && !n) {
            if (this.#x) {
              this.#r?.(c, e, "set");
            }
            if (this.#E) {
              this.#g?.push([ c, e, "set" ]);
            }
          }
        } else if (!n) {
          if (this.#x) {
            this.#r?.(f, e, "set");
          }
          if (this.#E) {
            this.#g?.push([ f, e, "set" ]);
          }
        }
        this.#O(h);
        this.#$(h, u, o);
        this.#h[h] = t;
        if (o) {
          o.set = "replace";
          var p = f && this.#A(f) ? f.__staleWhileFetching : f;
          if (void 0 !== p) {
            o.oldValue = p;
          }
        }
      } else if (o) {
        o.set = "update";
      }
    }
    if (0 !== r && !this.#y) {
      this.#C();
    }
    if (this.#y) {
      if (!l) {
        this.#F(h, r, a);
      }
      if (o) {
        this.#z(o, h);
      }
    }
    if (!n && this.#E && this.#g) {
      var v = this.#g;
      var d;
      while (d = v?.shift()) {
        this.#a?.(...d);
      }
    }
    return this;
  }
  pop() {
    try {
      while (this.#s) {
        var e = this.#h[this.#p];
        this.#P(!0);
        if (this.#A(e)) {
          if (e.__staleWhileFetching) {
            return e.__staleWhileFetching;
          }
        } else if (void 0 !== e) {
          return e;
        }
      }
    } finally {
      if (this.#E && this.#g) {
        var t = this.#g;
        var i;
        while (i = t?.shift()) {
          this.#a?.(...i);
        }
      }
    }
  }
  #P(e) {
    var t = this.#p;
    var i = this.#u[t];
    var r = this.#h[t];
    if (this.#T && this.#A(r)) {
      r.__abortController.abort(new Error("evicted"));
    } else if (this.#x || this.#E) {
      if (this.#x) {
        this.#r?.(r, i, "evict");
      }
      if (this.#E) {
        this.#g?.push([ r, i, "evict" ]);
      }
    }
    this.#O(t);
    if (e) {
      this.#u[t] = void 0;
      this.#h[t] = void 0;
      this.#d.push(t);
    }
    if (1 === this.#s) {
      this.#p = this.#v = 0;
      this.#d.length = 0;
    } else {
      this.#p = this.#f[t];
    }
    this.#l.delete(i);
    this.#s--;
    return t;
  }
  has(e, t = {}) {
    var {updateAgeOnHas: i = this.updateAgeOnHas, status: r} = t;
    var a = this.#l.get(e);
    if (void 0 !== a) {
      var n = this.#h[a];
      if (this.#A(n) && void 0 === n.__staleWhileFetching) {
        return !1;
      }
      if (!this.#L(a)) {
        if (i) {
          this.#N(a);
        }
        if (r) {
          r.has = "hit";
          this.#z(r, a);
        }
        return !0;
      } else if (r) {
        r.has = "stale";
        this.#z(r, a);
      }
    } else if (r) {
      r.has = "miss";
    }
    return !1;
  }
  peek(e, t = {}) {
    var {allowStale: i = this.allowStale} = t;
    var r = this.#l.get(e);
    if (void 0 !== r && (i || !this.#L(r))) {
      var a = this.#h[r];
      return this.#A(a) ? a.__staleWhileFetching : a;
    }
  }
  #b(e, t, i, r) {
    var a = void 0 === t ? void 0 : this.#h[t];
    if (this.#A(a)) {
      return a;
    }
    var n = new Z;
    var {signal: s} = i;
    s?.addEventListener("abort", (() => n.abort(s.reason)), {
      signal: n.signal
    });
    var o = {
      signal: n.signal,
      options: i,
      context: r
    };
    var cb = (r, a = !1) => {
      var {aborted: s} = n.signal;
      var u = i.ignoreFetchAbort && void 0 !== r;
      if (i.status) {
        if (s && !a) {
          i.status.fetchAborted = !0;
          i.status.fetchError = n.signal.reason;
          if (u) {
            i.status.fetchAbortIgnored = !0;
          }
        } else {
          i.status.fetchResolved = !0;
        }
      }
      if (s && !u && !a) {
        return fetchFail(n.signal.reason);
      }
      if (this.#h[t] === l) {
        if (void 0 === r) {
          if (l.__staleWhileFetching) {
            this.#h[t] = l.__staleWhileFetching;
          } else {
            this.delete(e);
          }
        } else {
          if (i.status) {
            i.status.fetchUpdated = !0;
          }
          this.set(e, r, o.options);
        }
      }
      return r;
    };
    var fetchFail = r => {
      var {aborted: a} = n.signal;
      var s = a && i.allowStaleOnFetchAbort;
      var o = s || i.allowStaleOnFetchRejection;
      var u = l;
      if (this.#h[t] === l) {
        if (!(o || i.noDeleteOnFetchRejection) || void 0 === u.__staleWhileFetching) {
          this.delete(e);
        } else if (!s) {
          this.#h[t] = u.__staleWhileFetching;
        }
      }
      if (o) {
        if (i.status && void 0 !== u.__staleWhileFetching) {
          i.status.returnedStale = !0;
        }
        return u.__staleWhileFetching;
      } else if (u.__returned === u) {
        throw r;
      }
    };
    if (i.status) {
      i.status.fetchDispatched = !0;
    }
    var l = new Promise(((t, r) => {
      var s = this.#n?.(e, a, o);
      if (s && s instanceof Promise) {
        s.then((e => t(void 0 === e ? void 0 : e)), r);
      }
      n.signal.addEventListener("abort", (() => {
        if (!i.ignoreFetchAbort || i.allowStaleOnFetchAbort) {
          t(void 0);
          if (i.allowStaleOnFetchAbort) {
            t = e => cb(e, !0);
          }
        }
      }));
    })).then(cb, (e => {
      if (i.status) {
        i.status.fetchRejected = !0;
        i.status.fetchError = e;
      }
      return fetchFail(e);
    }));
    var u = Object.assign(l, {
      __abortController: n,
      __staleWhileFetching: a,
      __returned: void 0
    });
    if (void 0 === t) {
      this.set(e, u, {
        ...o.options,
        status: void 0
      });
      t = this.#l.get(e);
    } else {
      this.#h[t] = u;
    }
    return u;
  }
  #A(e) {
    if (!this.#T) {
      return !1;
    }
    var t = e;
    return !!t && t instanceof Promise && t.hasOwnProperty("__staleWhileFetching") && t.__abortController instanceof Z;
  }
  async fetch(e, t = {}) {
    var {allowStale: i = this.allowStale, updateAgeOnGet: r = this.updateAgeOnGet, noDeleteOnStaleGet: a = this.noDeleteOnStaleGet, ttl: n = this.ttl, noDisposeOnSet: s = this.noDisposeOnSet, size: o = 0, sizeCalculation: l = this.sizeCalculation, noUpdateTTL: u = this.noUpdateTTL, noDeleteOnFetchRejection: h = this.noDeleteOnFetchRejection, allowStaleOnFetchRejection: f = this.allowStaleOnFetchRejection, ignoreFetchAbort: c = this.ignoreFetchAbort, allowStaleOnFetchAbort: p = this.allowStaleOnFetchAbort, context: v, forceRefresh: d = !1, status: g, signal: m} = t;
    if (!this.#T) {
      if (g) {
        g.fetch = "get";
      }
      return this.get(e, {
        allowStale: i,
        updateAgeOnGet: r,
        noDeleteOnStaleGet: a,
        status: g
      });
    }
    var S = {
      allowStale: i,
      updateAgeOnGet: r,
      noDeleteOnStaleGet: a,
      ttl: n,
      noDisposeOnSet: s,
      size: o,
      sizeCalculation: l,
      noUpdateTTL: u,
      noDeleteOnFetchRejection: h,
      allowStaleOnFetchRejection: f,
      allowStaleOnFetchAbort: p,
      ignoreFetchAbort: c,
      status: g,
      signal: m
    };
    var y = this.#l.get(e);
    if (void 0 === y) {
      if (g) {
        g.fetch = "miss";
      }
      var x = this.#b(e, y, S, v);
      return x.__returned = x;
    } else {
      var T = this.#h[y];
      if (this.#A(T)) {
        var E = i && void 0 !== T.__staleWhileFetching;
        if (g) {
          g.fetch = "inflight";
          if (E) {
            g.returnedStale = !0;
          }
        }
        return E ? T.__staleWhileFetching : T.__returned = T;
      }
      var A = this.#L(y);
      if (!d && !A) {
        if (g) {
          g.fetch = "hit";
        }
        this.#w(y);
        if (r) {
          this.#N(y);
        }
        if (g) {
          this.#z(g, y);
        }
        return T;
      }
      var b = this.#b(e, y, S, v);
      var w = void 0 !== b.__staleWhileFetching && i;
      if (g) {
        g.fetch = A ? "stale" : "refresh";
        if (w && A) {
          g.returnedStale = !0;
        }
      }
      return w ? b.__staleWhileFetching : b.__returned = b;
    }
  }
  get(e, t = {}) {
    var {allowStale: i = this.allowStale, updateAgeOnGet: r = this.updateAgeOnGet, noDeleteOnStaleGet: a = this.noDeleteOnStaleGet, status: n} = t;
    var s = this.#l.get(e);
    if (void 0 !== s) {
      var o = this.#h[s];
      var l = this.#A(o);
      if (n) {
        this.#z(n, s);
      }
      if (this.#L(s)) {
        if (n) {
          n.get = "stale";
        }
        if (!l) {
          if (!a) {
            this.delete(e);
          }
          if (n && i) {
            n.returnedStale = !0;
          }
          return i ? o : void 0;
        } else {
          if (n && i && void 0 !== o.__staleWhileFetching) {
            n.returnedStale = !0;
          }
          return i ? o.__staleWhileFetching : void 0;
        }
      } else {
        if (n) {
          n.get = "hit";
        }
        if (l) {
          return o.__staleWhileFetching;
        }
        this.#w(s);
        if (r) {
          this.#N(s);
        }
        return o;
      }
    } else if (n) {
      n.get = "miss";
    }
  }
  #V(e, t) {
    this.#c[t] = e;
    this.#f[e] = t;
  }
  #w(e) {
    if (e !== this.#v) {
      if (e === this.#p) {
        this.#p = this.#f[e];
      } else {
        this.#V(this.#c[e], this.#f[e]);
      }
      this.#V(this.#v, e);
      this.#v = e;
    }
  }
  delete(e) {
    var t = !1;
    if (0 !== this.#s) {
      var i = this.#l.get(e);
      if (void 0 !== i) {
        t = !0;
        if (1 === this.#s) {
          this.clear();
        } else {
          this.#O(i);
          var r = this.#h[i];
          if (this.#A(r)) {
            r.__abortController.abort(new Error("deleted"));
          } else if (this.#x || this.#E) {
            if (this.#x) {
              this.#r?.(r, e, "delete");
            }
            if (this.#E) {
              this.#g?.push([ r, e, "delete" ]);
            }
          }
          this.#l.delete(e);
          this.#u[i] = void 0;
          this.#h[i] = void 0;
          if (i === this.#v) {
            this.#v = this.#c[i];
          } else if (i === this.#p) {
            this.#p = this.#f[i];
          } else {
            this.#f[this.#c[i]] = this.#f[i];
            this.#c[this.#f[i]] = this.#c[i];
          }
          this.#s--;
          this.#d.push(i);
        }
      }
    }
    if (this.#E && this.#g?.length) {
      var a = this.#g;
      var n;
      while (n = a?.shift()) {
        this.#a?.(...n);
      }
    }
    return t;
  }
  clear() {
    for (var e of this.#D({
      allowStale: !0
    })) {
      var t = this.#h[e];
      if (this.#A(t)) {
        t.__abortController.abort(new Error("deleted"));
      } else {
        var i = this.#u[e];
        if (this.#x) {
          this.#r?.(t, i, "delete");
        }
        if (this.#E) {
          this.#g?.push([ t, i, "delete" ]);
        }
      }
    }
    this.#l.clear();
    this.#h.fill(void 0);
    this.#u.fill(void 0);
    if (this.#y && this.#S) {
      this.#y.fill(0);
      this.#S.fill(0);
    }
    if (this.#m) {
      this.#m.fill(0);
    }
    this.#p = 0;
    this.#v = 0;
    this.#d.length = 0;
    this.#o = 0;
    this.#s = 0;
    if (this.#E && this.#g) {
      var r = this.#g;
      var a;
      while (a = r?.shift()) {
        this.#a?.(...a);
      }
    }
  }
}

var te = {
  exports: {}
};

var ie = {
  32: 16777619n,
  64: 1099511628211n,
  128: 309485009821345068724781371n,
  256: 374144419156711147060143317175368453031918731002211n,
  512: 35835915874844867368919076489095108449946327955754392558399825615420669938882575126094039892345713852759n,
  1024: 5016456510113118655434598811035278955030765345404790744303017523831112055108147451509157692220295382716162651878526895249385292291816524375083746691371804094271873160484737966720260389217684476157468082573n
};

var re = {
  32: 2166136261n,
  64: 14695981039346656037n,
  128: 144066263297769815596495629667062367629n,
  256: 100029257958052580907070968620625704837092796014241193945225284501741471925557n,
  512: 9659303129496669498009435400716310466090418745672637896108374329434462657994582932197716438449813051892206539805784495328239340083876191928701583869517785n,
  1024: 14197795064947621068722070641403218320880622795441933960878474914617582723252296732303717722150864096521202355549365628174669108571814760471015076148029755969804077320157692458563003215304957150157403644460363550505412711285966361610267868082893823963790439336411086884584107735010676915n
};

te.exports = function fnv1a(e) {
  var t = Number(re[32]);
  var i = !1;
  for (var r = 0; r < e.length; r++) {
    var a = e.charCodeAt(r);
    if (a > 127 && !i) {
      a = (e = unescape(encodeURIComponent(e))).charCodeAt(r);
      i = !0;
    }
    t ^= a;
    t += (t << 1) + (t << 4) + (t << 7) + (t << 8) + (t << 24);
  }
  return t >>> 0;
};

te.exports.bigInt = function bigInt(e, {size: t = 32} = {}) {
  if (!ie[t]) {
    throw new Error("The `size` option must be one of 32, 64, 128, 256, 512, or 1024");
  }
  var i = re[t];
  var r = ie[t];
  var a = !1;
  for (var n = 0; n < e.length; n++) {
    var s = e.charCodeAt(n);
    if (s > 127 && !a) {
      s = (e = unescape(encodeURIComponent(e))).charCodeAt(n);
      a = !0;
    }
    i ^= BigInt(s);
    i = BigInt.asUintN(t, i * r);
  }
  return i;
};

var ae = getDefaultExportFromCjs(te.exports);

var ne = 52005;

var unwrapAbstractType = e => e.isUnionOrIntersection() ? e.types.find((e => e.flags & b.TypeFlags.Object)) || e : e;

var getVariableDeclaration = e => {
  var t = e;
  var i = new Set;
  while (t.parent && !i.has(t)) {
    i.add(t);
    if (b.isBlock(t)) {
      return;
    } else if (b.isVariableDeclaration(t = t.parent)) {
      return t;
    }
  }
};

var traverseArrayDestructuring = (e, t, i, r, a) => e.elements.flatMap((e => {
  if (b.isOmittedExpression(e)) {
    return [];
  }
  var n = [ ...t ];
  return b.isIdentifier(e.name) ? crawlScope(e.name, n, i, r, a, !1) : b.isObjectBindingPattern(e.name) ? traverseDestructuring(e.name, n, i, r, a) : traverseArrayDestructuring(e.name, n, i, r, a);
}));

var traverseDestructuring = (e, t, i, r, a) => {
  var n = [];
  var _loop = function() {
    if (b.isObjectBindingPattern(s.name)) {
      var e = [ ...t ];
      if (s.propertyName && !t.includes(s.propertyName.getText())) {
        var o = [ ...e, s.propertyName.getText() ].join(".");
        if (i.find((e => e.startsWith(o)))) {
          e.push(s.propertyName.getText());
        }
      }
      var l = traverseDestructuring(s.name, e, i, r, a);
      n.push(...l);
    } else if (b.isIdentifier(s.name)) {
      var u = [ ...t ];
      if (s.propertyName && !t.includes(s.propertyName.getText())) {
        var h = [ ...u, s.propertyName.getText() ].join(".");
        if (i.find((e => e.startsWith(h)))) {
          u.push(s.propertyName.getText());
        }
      } else {
        var f = [ ...u, s.name.getText() ].join(".");
        if (i.find((e => e.startsWith(f)))) {
          u.push(s.name.getText());
        }
      }
      var c = crawlScope(s.name, u, i, r, a, !1);
      n.push(...c);
    }
  };
  for (var s of e.elements) {
    _loop();
  }
  return n;
};

var se = new Set([ "map", "filter", "forEach", "reduce", "every", "some", "find", "flatMap", "sort" ]);

var crawlChainedExpressions = (e, t, i, r, a) => {
  var n = b.isPropertyAccessExpression(e.expression) && se.has(e.expression.name.text);
  console.log("[GRAPHQLSP]: ", n, e.getFullText());
  if (n) {
    var s = "reduce" === e.expression.name.text;
    var o = e.arguments[0];
    var l = [];
    if (b.isCallExpression(e.parent.parent)) {
      var u = crawlChainedExpressions(e.parent.parent, t, i, r, a);
      if (u.length) {
        l.push(...u);
      }
    }
    if (o && b.isIdentifier(o)) {
      var h = a.languageService.getProgram().getTypeChecker();
      var f = h.getSymbolAtLocation(o)?.valueDeclaration;
      if (f && b.isFunctionDeclaration(f)) {
        o = f;
      } else if (f && b.isVariableDeclaration(f) && f.initializer) {
        o = f.initializer;
      }
    }
    if (o && (b.isFunctionDeclaration(o) || b.isFunctionExpression(o) || b.isArrowFunction(o))) {
      var c = o.parameters[s ? 1 : 0];
      if (c) {
        var p = crawlScope(c.name, t, i, r, a, !0);
        if (p.length) {
          l.push(...p);
        }
      }
    }
    return l;
  }
  return [];
};

var crawlScope = (e, t, i, r, a, n) => {
  if (b.isObjectBindingPattern(e)) {
    return traverseDestructuring(e, t, i, r, a);
  } else if (b.isArrayBindingPattern(e)) {
    return traverseArrayDestructuring(e, t, i, r, a);
  }
  var s = [];
  var o = a.languageService.getReferencesAtPosition(r.fileName, e.getStart());
  if (!o) {
    return s;
  }
  return s = o.flatMap((s => {
    if (s.fileName !== r.fileName) {
      return [];
    }
    if (e.getStart() <= s.textSpan.start && e.getEnd() >= s.textSpan.start + s.textSpan.length) {
      return [];
    }
    var o = findNode(r, s.textSpan.start);
    if (!o) {
      return [];
    }
    var l = [ ...t ];
    console.log("[GRAPHQLSP]: ", o.getFullText());
    var u, _loop2 = function() {
      if (!n && (b.isReturnStatement(o) || b.isArrowFunction(o))) {
        var e = l.join(".");
        return {
          v: i.filter((t => t.startsWith(e + ".")))
        };
      } else if (b.isVariableDeclaration(o)) {
        return {
          v: crawlScope(o.name, l, i, r, a, !1)
        };
      } else if (b.isIdentifier(o) && !l.includes(o.text)) {
        var t = [ ...l, o.text ].join(".");
        if (i.find((e => e.startsWith(t + ".")))) {
          l.push(o.text);
        }
      } else if (b.isPropertyAccessExpression(o) && "at" === o.name.text && b.isCallExpression(o.parent)) {
        o = o.parent;
      } else if (b.isPropertyAccessExpression(o) && se.has(o.name.text) && b.isCallExpression(o.parent)) {
        var s = o.parent;
        var u = [];
        var h = "some" === o.name.text || "every" === o.name.text;
        console.log("[GRAPHQLSP]: ", o.name.text);
        var f = crawlChainedExpressions(s, l, i, r, a);
        console.log("[GRAPHQLSP]: ", f.length);
        if (f.length) {
          u.push(...f);
        }
        if (b.isVariableDeclaration(s.parent) && !h) {
          var c = crawlScope(s.parent.name, l, i, r, a, !0);
          u.push(...c);
        }
        return {
          v: u
        };
      } else if (b.isPropertyAccessExpression(o) && !l.includes(o.name.text)) {
        var p = [ ...l, o.name.text ].join(".");
        if (i.find((e => e.startsWith(p)))) {
          l.push(o.name.text);
        }
      } else if (b.isElementAccessExpression(o) && b.isStringLiteral(o.argumentExpression) && !l.includes(o.argumentExpression.text)) {
        var v = [ ...l, o.argumentExpression.text ].join(".");
        if (i.find((e => e.startsWith(v)))) {
          l.push(o.argumentExpression.text);
        }
      }
      if (b.isNonNullExpression(o.parent)) {
        o = o.parent.parent;
      } else {
        o = o.parent;
      }
    };
    while (b.isIdentifier(o) || b.isPropertyAccessExpression(o) || b.isElementAccessExpression(o) || b.isVariableDeclaration(o) || b.isBinaryExpression(o) || b.isReturnStatement(o) || b.isArrowFunction(o)) {
      if (u = _loop2()) {
        return u.v;
      }
    }
    return l.join(".");
  }));
};

var getColocatedFragmentNames = (e, t) => {
  var i = function findAllImports(e) {
    return e.statements.filter(b.isImportDeclaration);
  }(e);
  var r = t.languageService.getProgram()?.getTypeChecker();
  var a = {};
  if (!r) {
    return a;
  }
  if (i.length) {
    i.forEach((i => {
      if (!i.importClause) {
        return;
      }
      if (i.importClause.name) {
        var n = t.languageService.getDefinitionAtPosition(e.fileName, i.importClause.name.getStart());
        var s = n && n[0];
        if (s) {
          if (s.fileName.includes("node_modules")) {
            return;
          }
          var o = getSource(t, s.fileName);
          if (!o) {
            return;
          }
          var l = getFragmentsInSource(o, r, t).map((e => e.name.value));
          var u = i.moduleSpecifier.getText();
          var h = a[u];
          if (l.length && h) {
            h.fragments = h.fragments.concat(l);
          } else if (l.length && !h) {
            a[u] = h = {
              start: i.moduleSpecifier.getStart(),
              length: i.moduleSpecifier.getText().length,
              fragments: l
            };
          }
        }
      }
      if (i.importClause.namedBindings && b.isNamespaceImport(i.importClause.namedBindings)) {
        var f = t.languageService.getDefinitionAtPosition(e.fileName, i.importClause.namedBindings.getStart());
        var c = f && f[0];
        if (c) {
          if (c.fileName.includes("node_modules")) {
            return;
          }
          var p = getSource(t, c.fileName);
          if (!p) {
            return;
          }
          var v = getFragmentsInSource(p, r, t).map((e => e.name.value));
          var d = i.moduleSpecifier.getText();
          var g = a[d];
          if (v.length && g) {
            g.fragments = g.fragments.concat(v);
          } else if (v.length && !g) {
            a[d] = g = {
              start: i.moduleSpecifier.getStart(),
              length: i.moduleSpecifier.getText().length,
              fragments: v
            };
          }
        }
      } else if (i.importClause.namedBindings && b.isNamedImportBindings(i.importClause.namedBindings)) {
        i.importClause.namedBindings.elements.forEach((n => {
          var s = t.languageService.getDefinitionAtPosition(e.fileName, n.getStart());
          var o = s && s[0];
          if (o) {
            if (o.fileName.includes("node_modules")) {
              return;
            }
            var l = getSource(t, o.fileName);
            if (!l) {
              return;
            }
            var u = getFragmentsInSource(l, r, t).map((e => e.name.value));
            var h = i.moduleSpecifier.getText();
            var f = a[h];
            if (u.length && f) {
              f.fragments = f.fragments.concat(u);
            } else if (u.length && !f) {
              a[h] = f = {
                start: i.moduleSpecifier.getStart(),
                length: i.moduleSpecifier.getText().length,
                fragments: u
              };
            }
          }
        }));
      }
    }));
  }
  return a;
};

function getFragmentsInSource(t, i, r) {
  var a = [];
  var n = findAllCallExpressions(t, r, !1);
  var s = i.getSymbolAtLocation(t);
  if (!s) {
    return [];
  }
  var o = i.getExportsOfModule(s).map((e => e.name));
  n.nodes.filter((e => {
    var t = e.node.parent;
    while (t && !b.isSourceFile(t) && !b.isVariableDeclaration(t)) {
      t = t.parent;
    }
    if (b.isVariableDeclaration(t)) {
      return o.includes(t.name.getText());
    } else {
      return !1;
    }
  })).forEach((i => {
    var n = resolveTemplate(i.node, t.fileName, r).combinedText;
    try {
      var s = y(n, {
        noLocation: !0
      });
      if (s.definitions.every((t => t.kind === e.FRAGMENT_DEFINITION))) {
        a = a.concat(s.definitions);
      }
    } catch (e) {
      return;
    }
  }));
  return a;
}

function getPersistedCodeFixAtPosition(e, t, i) {
  var r = i.config.templateIsCallExpression ?? !0;
  var a = i.languageService.getProgram()?.getTypeChecker();
  if (!r) {
    return;
  }
  var n = getSource(i, e);
  if (!n) {
    return;
  }
  var s = findNode(n, t);
  if (!s) {
    return;
  }
  var o = s;
  if (b.isVariableStatement(o)) {
    o = o.declarationList.declarations.find((e => b.isVariableDeclaration(e) && e.initializer && b.isCallExpression(e.initializer))) || s;
  } else if (b.isVariableDeclarationList(o)) {
    o = o.declarations.find((e => b.isVariableDeclaration(e) && e.initializer && b.isCallExpression(e.initializer))) || s;
  } else if (b.isVariableDeclaration(o) && o.initializer && b.isCallExpression(o.initializer)) {
    o = o.initializer;
  } else {
    while (o && !b.isCallExpression(o)) {
      o = o.parent;
    }
  }
  if (!isTadaPersistedCall(o, a)) {
    return;
  }
  var l, u = e;
  if (o.typeArguments) {
    var [h] = o.typeArguments;
    if (!h || !b.isTypeQueryNode(h)) {
      return;
    }
    var {node: f, filename: c} = getDocumentReferenceFromTypeQuery(h, e, i);
    l = f;
    u = c;
  } else if (o.arguments[1]) {
    if (!b.isIdentifier(o.arguments[1]) && !b.isCallExpression(o.arguments[1])) {
      return;
    }
    var {node: p, filename: v} = getDocumentReferenceFromDocumentNode(o.arguments[1], e, i);
    l = p;
    u = v;
  }
  if (!l) {
    return;
  }
  var d = l;
  if (!(d && b.isCallExpression(d) && d.arguments[0] && b.isStringLiteralLike(d.arguments[0]))) {
    return;
  }
  var g = generateHashForDocument(i, d.arguments[0], u, d.arguments[1] && b.isArrayLiteralExpression(d.arguments[1]) ? d.arguments[1] : void 0);
  var m = o.arguments[0];
  if (!m) {
    return {
      span: {
        start: o.arguments.pos,
        length: 1
      },
      replacement: `"sha256:${g}")`
    };
  } else if (b.isStringLiteral(m) && m.getText() !== `"sha256:${g}"`) {
    return {
      span: {
        start: m.getStart(),
        length: m.end - m.getStart()
      },
      replacement: `"sha256:${g}"`
    };
  } else if (b.isIdentifier(m)) {
    return {
      span: {
        start: m.getStart(),
        length: m.end - m.getStart()
      },
      replacement: `"sha256:${g}"`
    };
  } else {
    return;
  }
}

var generateHashForDocument = (e, t, i, r) => {
  if (r) {
    var a = [];
    unrollTadaFragments(r, a, e);
    var n = resolveTemplate(t, i, e).combinedText;
    var s = parse(n);
    var o = new Set;
    for (var l of s.definitions) {
      if (l.kind === C && !o.has(l)) {
        stripUnmaskDirectivesFromDefinition(l);
      }
    }
    a.map((e => {
      stripUnmaskDirectivesFromDefinition(e);
      return print(e);
    })).filter(((e, t, i) => i.indexOf(e) === t)).forEach((e => {
      n = `${n}\n\n${e}`;
    }));
    var u = print(parse(n));
    return A("sha256").update(u).digest("hex");
  } else {
    var h = getSource(e, i);
    var {fragments: f} = findAllCallExpressions(h, e);
    var c = resolveTemplate(t, i, e).combinedText;
    var p = parse(c);
    var v = new Set;
    for (var d of p.definitions) {
      if (d.kind === C && !v.has(d)) {
        stripUnmaskDirectivesFromDefinition(d);
      }
    }
    var g = new Set;
    visit(p, {
      FragmentDefinition: e => {
        f.push(e);
      },
      FragmentSpread: e => {
        g.add(e.name.value);
      }
    });
    var m = c;
    var S = new Set;
    var y = [ ...g ];
    var x;
    while (x = y.shift()) {
      S.add(x);
      var T = f.find((e => e.name.value === x));
      if (!T) {
        e.project.projectService.logger.info(`[GraphQLSP] could not find fragment for spread ${x}!`);
        return;
      }
      stripUnmaskDirectivesFromDefinition(T);
      visit(T, {
        FragmentSpread: e => {
          if (!S.has(e.name.value)) {
            y.push(e.name.value);
          }
        }
      });
      m = `${m}\n\n${print(T)}`;
    }
    return A("sha256").update(print(parse(m))).digest("hex");
  }
};

var getDocumentReferenceFromTypeQuery = (e, t, i) => {
  var r = i.languageService.getReferencesAtPosition(t, e.exprName.getStart());
  if (!r) {
    return {
      node: null,
      filename: t
    };
  }
  var a = i.languageService.getProgram()?.getTypeChecker();
  var n = null;
  var s = t;
  r.forEach((e => {
    if (n) {
      return;
    }
    var t = getSource(i, e.fileName);
    if (!t) {
      return;
    }
    var r = findNode(t, e.textSpan.start);
    if (!r) {
      return;
    }
    if (b.isVariableDeclaration(r.parent) && r.parent.initializer && isGraphQLCall(r.parent.initializer, a)) {
      n = r.parent.initializer;
      s = e.fileName;
    }
  }));
  return {
    node: n,
    filename: s
  };
};

var getDocumentReferenceFromDocumentNode = (e, t, i) => {
  if (b.isIdentifier(e)) {
    var r = i.languageService.getReferencesAtPosition(t, e.getStart());
    if (!r) {
      return {
        node: null,
        filename: t
      };
    }
    var a = i.languageService.getProgram()?.getTypeChecker();
    var n = null;
    var s = t;
    r.forEach((e => {
      if (n) {
        return;
      }
      var t = getSource(i, e.fileName);
      if (!t) {
        return;
      }
      var r = findNode(t, e.textSpan.start);
      if (!r) {
        return;
      }
      if (b.isVariableDeclaration(r.parent) && r.parent.initializer && isGraphQLCall(r.parent.initializer, a)) {
        n = r.parent.initializer;
        s = e.fileName;
      }
    }));
    return {
      node: n,
      filename: s
    };
  } else {
    return {
      node: e,
      filename: t
    };
  }
};

var stripUnmaskDirectivesFromDefinition = e => {
  e.directives = e.directives?.filter((e => "_unmask" !== e.name.value));
};

var oe = new Set([ "populate", "client", "_unmask", "_optional", "_relayPagination", "_simplePagination", "_required", "optional", "required", "arguments", "argumentDefinitions", "connection", "refetchable", "relay", "required", "inline" ]);

var le = 520100;

var ue = 520101;

var he = 520102;

var fe = 520103;

var ce = [ 52001, 52002, 52004, 52003, ne, le, ue, he, fe ];

var pe = new LRUCache({
  ttl: 9e5,
  max: 5e3
});

function getGraphQLDiagnostics(e, t, i) {
  var r = i.config.templateIsCallExpression ?? !0;
  var a = getSource(i, e);
  if (!a) {
    return;
  }
  var n, s = [];
  if (r) {
    var o = findAllCallExpressions(a, i);
    s = o.fragments;
    n = o.nodes;
  } else {
    n = function findAllTaggedTemplateNodes(e) {
      var t = [];
      !function find(e) {
        if (isGraphQLTag(e) || b.isNoSubstitutionTemplateLiteral(e) && isGraphQLTag(e.parent)) {
          t.push(e);
          return;
        } else {
          b.forEachChild(e, find);
        }
      }(e);
      return t;
    }(a).map((e => ({
      node: e,
      schema: null
    })));
  }
  var l = n.map((({node: t}) => {
    if ((b.isNoSubstitutionTemplateLiteral(t) || b.isTemplateExpression(t)) && !r) {
      if (b.isTaggedTemplateExpression(t.parent)) {
        t = t.parent;
      } else {
        return;
      }
    }
    return resolveTemplate(t, e, i).combinedText;
  }));
  var u = ae(r ? a.getText() + s.map((e => print(e))).join("-") + t.version : l.join("-") + t.version);
  var h;
  if (pe.has(u)) {
    h = pe.get(u);
  } else {
    h = runDiagnostics(a, {
      nodes: n,
      fragments: s
    }, t, i);
    pe.set(u, h);
  }
  var f = i.config.shouldCheckForColocatedFragments ?? !0;
  var c = [];
  if (r) {
    var p = findAllPersistedCallExpressions(a, i).map((t => {
      var {node: r} = t;
      if (!r.typeArguments && !r.arguments[1]) {
        return {
          category: b.DiagnosticCategory.Warning,
          code: le,
          file: a,
          messageText: "Missing generic pointing at the GraphQL document.",
          start: r.getStart(),
          length: r.getEnd() - r.getStart()
        };
      }
      var n, s, o, l, u = e;
      var h = r.typeArguments && r.typeArguments[0];
      if (h) {
        o = h.getStart();
        l = h.getEnd() - h.getStart();
        if (!b.isTypeQueryNode(h)) {
          return {
            category: b.DiagnosticCategory.Warning,
            code: le,
            file: a,
            messageText: "Provided generic should be a typeQueryNode in the shape of graphql.persisted<typeof document>.",
            start: o,
            length: l
          };
        }
        var {node: f, filename: c} = getDocumentReferenceFromTypeQuery(h, e, i);
        n = f;
        u = c;
        s = h.getText();
      } else if (r.arguments[1]) {
        o = r.arguments[1].getStart();
        l = r.arguments[1].getEnd() - r.arguments[1].getStart();
        if (!b.isIdentifier(r.arguments[1]) && !b.isCallExpression(r.arguments[1])) {
          return {
            category: b.DiagnosticCategory.Warning,
            code: le,
            file: a,
            messageText: 'Provided argument should be an identifier or invocation of "graphql" in the shape of graphql.persisted(hash, document).',
            start: o,
            length: l
          };
        }
        var {node: p, filename: v} = getDocumentReferenceFromDocumentNode(r.arguments[1], e, i);
        n = p;
        u = v;
        s = r.arguments[1].getText();
      }
      if (!n) {
        return {
          category: b.DiagnosticCategory.Warning,
          code: he,
          file: a,
          messageText: `Can't find reference to "${s}".`,
          start: o,
          length: l
        };
      }
      var d = n;
      if (!(d && b.isCallExpression(d) && d.arguments[0] && b.isStringLiteralLike(d.arguments[0]))) {
        return {
          category: b.DiagnosticCategory.Warning,
          code: he,
          file: a,
          messageText: `Referenced type "${s}" is not a GraphQL document.`,
          start: o,
          length: l
        };
      }
      if (!r.arguments[0]) {
        return {
          category: b.DiagnosticCategory.Warning,
          code: ue,
          file: a,
          messageText: "The call-expression is missing a hash for the persisted argument.",
          start: r.arguments.pos,
          length: r.arguments.end - r.arguments.pos
        };
      }
      var g = r.arguments[0].getText().slice(1, -1);
      if (g.startsWith("sha256:")) {
        var m = generateHashForDocument(i, d.arguments[0], u, d.arguments[1] && b.isArrayLiteralExpression(d.arguments[1]) ? d.arguments[1] : void 0);
        if (!m) {
          return null;
        }
        if (`sha256:${m}` !== g) {
          return {
            category: b.DiagnosticCategory.Warning,
            code: fe,
            file: a,
            messageText: "The persisted document's hash is outdated",
            start: r.arguments.pos,
            length: r.arguments.end - r.arguments.pos
          };
        }
      }
      return null;
    })).filter(Boolean);
    h.push(...p);
  }
  if (r && f) {
    var v = getColocatedFragmentNames(a, i);
    var d = new Set;
    n.forEach((({node: e}) => {
      try {
        var t = y(e.getText().slice(1, -1), {
          noLocation: !0
        });
        E(t, {
          FragmentSpread: e => {
            d.add(e.name.value);
          }
        });
      } catch (e) {}
    }));
    Object.keys(v).forEach((e => {
      var {fragments: t, start: i, length: r} = v[e];
      var n = Array.from(new Set(t.filter((e => !d.has(e)))));
      if (n.length) {
        c.push({
          file: a,
          length: r,
          start: i,
          category: b.DiagnosticCategory.Warning,
          code: 52003,
          messageText: `Unused co-located fragment definition(s) "${n.join(", ")}" in ${e}`
        });
      }
    }));
    return [ ...h, ...c ];
  } else {
    return h;
  }
}

var runDiagnostics = (t, {nodes: i, fragments: r}, a, n) => {
  var s = t.fileName;
  var o = n.config.templateIsCallExpression ?? !0;
  var l = i.map((t => {
    var i = t.node;
    if (!o && (b.isNoSubstitutionTemplateLiteral(i) || b.isTemplateExpression(i))) {
      if (b.isTaggedTemplateExpression(i.parent)) {
        i = i.parent;
      } else {
        return;
      }
    }
    var {combinedText: l, resolvedSpans: u} = resolveTemplate(i, s, n);
    var h = l.split("\n");
    var f = !1;
    if (b.isAsExpression(i.parent)) {
      if (b.isExpressionStatement(i.parent.parent)) {
        f = !0;
      }
    } else if (b.isExpressionStatement(i.parent)) {
      f = !0;
    }
    var c = i.getStart() + (o ? 0 : i.tag.getText().length + (f ? 2 : 0));
    var p = c + i.getText().length;
    var v = [ ...r ];
    if (o) {
      try {
        var d = y(l, {
          noLocation: !0
        }).definitions.filter((t => t.kind === e.FRAGMENT_DEFINITION));
        v = v.filter((t => !d.some((i => i.kind === e.FRAGMENT_DEFINITION && i.name.value === t.name.value))));
      } catch (e) {}
    }
    var g = t.schema && a.multi[t.schema] ? a.multi[t.schema]?.schema : a.current?.schema;
    if (!g) {
      return;
    }
    var m = getDiagnostics(l, g, void 0, void 0, v).filter((e => {
      if (!e.message.includes("Unknown directive")) {
        return !0;
      }
      var [t] = e.message.split("(");
      var i = t && /Unknown directive "@([^)]+)"/g.exec(t);
      if (!i) {
        return !0;
      }
      var r = i[1];
      return r && !oe.has(r);
    })).map((e => {
      var {start: t, end: i} = e.range;
      var r = c + t.line;
      for (var a = 0; a <= t.line && a < h.length; a++) {
        if (a === t.line) {
          r += t.character;
        } else if (h[a]) {
          r += h[a].length;
        }
      }
      var n = c + i.line;
      for (var s = 0; s <= i.line && s < h.length; s++) {
        if (s === i.line) {
          n += i.character;
        } else if (h[s]) {
          n += h[s].length;
        }
      }
      var o = u.find((e => r >= e.new.start && n <= e.new.start + e.new.length));
      if (o) {
        return {
          ...e,
          start: o.original.start,
          length: o.original.length
        };
      } else if (r > p) {
        var l = u.filter((e => e.new.start + e.new.length < r)).reduce(((e, t) => e + (t.new.length - t.original.length)), 0);
        r -= l;
        n -= l;
        return {
          ...e,
          start: r + 1,
          length: n - r
        };
      } else {
        return {
          ...e,
          start: r + 1,
          length: n - r
        };
      }
    })).filter((e => e.start + e.length <= p));
    try {
      var S = y(l, {
        noLocation: !0
      });
      if (S.definitions.some((t => t.kind === e.OPERATION_DEFINITION))) {
        if (!S.definitions.find((t => t.kind === e.OPERATION_DEFINITION)).name) {
          m.push({
            message: "Operation should contain a name.",
            start: i.getStart(),
            code: 52002,
            length: t.node.getText().length,
            range: {},
            severity: 2
          });
        }
      }
    } catch (e) {}
    return m;
  })).flat().filter(Boolean);
  var u = l.map((e => ({
    file: t,
    length: e.length,
    start: e.start,
    category: 2 === e.severity ? b.DiagnosticCategory.Warning : b.DiagnosticCategory.Error,
    code: "number" == typeof e.code ? e.code : 2 === e.severity ? 52004 : 52001,
    messageText: e.message.split("\n")[0]
  })));
  if (o) {
    var h = ((e, t, i) => {
      var r = [];
      if (!(i.config.trackFieldUsage ?? 1)) {
        return r;
      }
      var a = new Set([ "id", "_id", "__typename", ...i.config.reservedKeys ?? [] ]);
      var n = i.languageService.getProgram()?.getTypeChecker();
      if (!n) {
        return;
      }
      try {
        t.forEach((t => {
          var s = t.getText();
          if (s.includes("mutation") || s.includes("subscription")) {
            return;
          }
          var o = getVariableDeclaration(t);
          if (!o) {
            return;
          }
          var l;
          var u = n.getTypeAtLocation(t.parent);
          if ("target" in u) {
            var h = u.resolvedTypeArguments;
            l = h && h.length > 1 ? h[0] : void 0;
          }
          if (!l) {
            var f = u.getProperty("__apiType");
            if (f) {
              var c = n.getTypeOfSymbol(f);
              var p = u.getCallSignatures()[0];
              if (c.isUnionOrIntersection()) {
                for (var v of c.types) {
                  if (p = v.getCallSignatures()[0]) {
                    l = p.getReturnType();
                    break;
                  }
                }
              }
              l = p && p.getReturnType();
            }
          }
          var d = i.languageService.getReferencesAtPosition(e.fileName, o.name.getStart());
          if (!d) {
            return;
          }
          var g = [];
          var m = [];
          var S = [];
          var x = new Map;
          E(y(t.getText().slice(1, -1)), {
            Field: {
              enter(e) {
                var t = e.alias ? e.alias.value : e.name.value;
                var i = m.length ? `${m.join(".")}.${t}` : t;
                if (!e.selectionSet && !a.has(e.name.value)) {
                  S.push(i);
                  x.set(i, {
                    start: e.name.loc.start,
                    length: e.name.loc.end - e.name.loc.start
                  });
                } else if (e.selectionSet) {
                  m.push(t);
                  x.set(i, {
                    start: e.name.loc.start,
                    length: e.name.loc.end - e.name.loc.start
                  });
                }
              },
              leave(e) {
                if (e.selectionSet) {
                  m.pop();
                }
              }
            }
          });
          d.forEach((t => {
            if (t.fileName !== e.fileName) {
              return;
            }
            var r = findNode(e, t.textSpan.start);
            if (!r) {
              return;
            }
            if (r.parent === o) {
              return;
            }
            var a = n.getSymbolsInScope(r, b.SymbolFlags.BlockScopedVariable);
            var s;
            for (var u of a) {
              if (!u.valueDeclaration) {
                continue;
              }
              var h = unwrapAbstractType(n.getTypeOfSymbol(u));
              if (l === h) {
                s = u;
                break;
              }
              if (h.flags & b.TypeFlags.Object) {
                var f = h.getProperty("0");
                if (f) {
                  h = n.getTypeOfSymbol(f);
                  if (l === h) {
                    s = u;
                    break;
                  }
                }
                var c = h.getProperty("data");
                if (c) {
                  h = unwrapAbstractType(n.getTypeOfSymbol(c));
                  if (l === h) {
                    s = u;
                    break;
                  }
                }
              }
            }
            var p = s?.valueDeclaration;
            var v;
            if (p && "name" in p && p.name && (b.isIdentifier(p.name) || b.isBindingName(p.name))) {
              v = p.name;
            } else {
              var d = getVariableDeclaration(r);
              if (d) {
                v = d.name;
              }
            }
            if (v) {
              var m = crawlScope(v, [], S, e, i, !1);
              g.push(...m);
            }
          }));
          if (!g.length) {
            return;
          }
          var T = S.filter((e => !g.includes(e)));
          var A = new Set;
          var w = {};
          var k = new Set;
          T.forEach((e => {
            var t = e.split(".");
            t.pop();
            var i = t.join(".");
            if (x.get(i)) {
              A.add(i);
              if (w[i]) {
                w[i].add(e);
              } else {
                w[i] = new Set([ e ]);
              }
            } else {
              k.add(e);
            }
          }));
          A.forEach((i => {
            var a = x.get(i);
            var n = w[i];
            r.push({
              file: e,
              length: a.length,
              start: t.getStart() + a.start + 1,
              category: b.DiagnosticCategory.Warning,
              code: ne,
              messageText: `Field(s) ${[ ...n ].map((e => `'${e}'`)).join(", ")} are not used.`
            });
          }));
          k.forEach((i => {
            var a = x.get(i);
            r.push({
              file: e,
              length: a.length,
              start: t.getStart() + a.start + 1,
              category: b.DiagnosticCategory.Warning,
              code: ne,
              messageText: `Field ${i} is not used.`
            });
          }));
        }));
      } catch (e) {
        console.error("[GraphQLSP]: ", e.message, e.stack);
      }
      return r;
    })(t, i.map((e => e.node)), n) || [];
    if (!h) {
      return u;
    }
    return [ ...u, ...h ];
  } else {
    return u;
  }
};

export { ce as A, CharacterStream as C, bubbleUpTemplate as a, bubbleUpCallExpression as b, getSchemaName as c, getAllFragments as d, isGraphQLTag as e, findNode as f, getSource as g, init as h, isGraphQLCall as i, H as j, getGraphQLDiagnostics as k, getPersistedCodeFixAtPosition as l, findAllPersistedCallExpressions as m, findAllCallExpressions as n, onlineParser as o, print as p, getDocumentReferenceFromTypeQuery as q, resolveTemplate as r, getDocumentReferenceFromDocumentNode as s, b as t, unrollTadaFragments as u };
//# sourceMappingURL=api-chunk.mjs.map
