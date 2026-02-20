var e = require("graphql");

var t = require("crypto");

exports.ts = void 0;

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
      var s = null;
      if ("string" == typeof e) {
        s = new RegExp(e, i ? "i" : "g").test(this._sourceText.slice(this._pos, this._pos + e.length));
        r = e;
      } else if (e instanceof RegExp) {
        r = null == (s = this._sourceText.slice(this._pos).match(e)) ? void 0 : s[0];
      }
      if (null != s && ("string" == typeof e || s instanceof Array && this._sourceText.startsWith(s[0], this._pos))) {
        if (t) {
          this._start = this._pos;
          if (r && r.length) {
            this._pos += r.length;
          }
        }
        return s;
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

var i = {
  Name: /^[_A-Za-z][_0-9A-Za-z]*/,
  Punctuation: /^(?:!|\$|\(|\)|\.\.\.|:|=|&|@|\[|]|\{|\||\})/,
  Number: /^-?(?:0|(?:[1-9][0-9]*))(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?/,
  String: /^(?:"""(?:\\"""|[^"]|"[^"]|""[^"])*(?:""")?|"(?:[^"\\]|\\(?:"|\/|\\|b|f|n|r|t|u[0-9a-fA-F]{4}))*"?)/,
  Comment: /^#.*/
};

var r = {
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
      return e.Kind.FRAGMENT_DEFINITION;

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
      return e.Kind.SCHEMA_EXTENSION;

     case "scalar":
      return e.Kind.SCALAR_TYPE_EXTENSION;

     case "type":
      return e.Kind.OBJECT_TYPE_EXTENSION;

     case "interface":
      return e.Kind.INTERFACE_TYPE_EXTENSION;

     case "union":
      return e.Kind.UNION_TYPE_EXTENSION;

     case "enum":
      return e.Kind.ENUM_TYPE_EXTENSION;

     case "input":
      return e.Kind.INPUT_OBJECT_TYPE_EXTENSION;
    }
  },
  [e.Kind.SCHEMA_EXTENSION]: [ "SchemaDef" ],
  [e.Kind.SCALAR_TYPE_EXTENSION]: [ "ScalarDef" ],
  [e.Kind.OBJECT_TYPE_EXTENSION]: [ "ObjectTypeDef" ],
  [e.Kind.INTERFACE_TYPE_EXTENSION]: [ "InterfaceDef" ],
  [e.Kind.UNION_TYPE_EXTENSION]: [ "UnionDef" ],
  [e.Kind.ENUM_TYPE_EXTENSION]: [ "EnumDef" ],
  [e.Kind.INPUT_OBJECT_TYPE_EXTENSION]: [ "InputDef" ]
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
  lexRules: i,
  parseRules: r,
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
      pushRule(t.parseRules, i, e.Kind.DOCUMENT);
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
      var {lexRules: a, parseRules: n, eatWhitespace: o, editorConfig: l} = i;
      if (t.rule && 0 === t.rule.length) {
        popRule(t);
      } else if (t.needsAdvance) {
        t.needsAdvance = !1;
        advanceRule(t, !0);
      }
      if (e.sol()) {
        var u = (null == l ? void 0 : l.tabSize) || 2;
        t.indentLevel = Math.floor(e.indentation() / u);
      }
      if (o(e)) {
        return "ws";
      }
      var p = function lex(e, t) {
        var i = Object.keys(e);
        for (var r = 0; r < i.length; r++) {
          var s = t.match(e[i[r]]);
          if (s && s instanceof Array) {
            return {
              kind: i[r],
              value: s[0]
            };
          }
        }
      }(a, e);
      if (!p) {
        if (!e.match(/\S+/)) {
          e.match(/\s/);
        }
        pushRule(s, t, "Invalid");
        return "invalidchar";
      }
      if ("Comment" === p.kind) {
        pushRule(s, t, "Comment");
        return "comment";
      }
      var h = assign({}, t);
      if ("Punctuation" === p.kind) {
        if (/^[{([]/.test(p.value)) {
          if (void 0 !== t.indentLevel) {
            t.levels = (t.levels || []).concat(t.indentLevel + 1);
          }
        } else if (/^[})\]]/.test(p.value)) {
          var f = t.levels = (t.levels || []).slice(0, -1);
          if (t.indentLevel && f.length > 0 && f.at(-1) < t.indentLevel) {
            t.indentLevel = f.at(-1);
          }
        }
      }
      while (t.rule) {
        var c = "function" == typeof t.rule ? 0 === t.step ? t.rule(p, e) : null : t.rule[t.step];
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
          if (null === (r = c.match) || void 0 === r ? void 0 : r.call(c, p)) {
            if (c.update) {
              c.update(t, p);
            }
            if ("Punctuation" === p.kind) {
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
      pushRule(s, t, "Invalid");
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

var s = {
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
      var {separator: s} = r;
      e.needsSeparator = !e.needsSeparator;
      if (!e.needsSeparator && s.ofRule) {
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

var a = [ e.LoneSchemaDefinitionRule, e.UniqueOperationTypesRule, e.UniqueTypeNamesRule, e.UniqueEnumValueNamesRule, e.UniqueFieldDefinitionNamesRule, e.UniqueDirectiveNamesRule, e.KnownTypeNamesRule, e.KnownDirectivesRule, e.UniqueDirectivesPerLocationRule, e.PossibleTypeExtensionsRule, e.UniqueArgumentNamesRule, e.UniqueInputFieldNamesRule ];

var n = {
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

function getDiagnostics(t, i = null, r, s, o) {
  var l, u;
  var p = null;
  var h = "";
  if (o) {
    h = "string" == typeof o ? o : o.reduce(((t, i) => t + e.print(i) + "\n\n"), "");
  }
  var f = h ? `${t}\n\n${h}` : t;
  try {
    p = e.parse(f);
  } catch (t) {
    if (t instanceof e.GraphQLError) {
      var c = function getRange(e, t) {
        var i = onlineParser();
        var r = i.startState();
        var s = t.split("\n");
        invariant(s.length >= e.line, "Query text must have more lines than where the error happened");
        var a = null;
        for (var n = 0; n < e.line; n++) {
          a = new CharacterStream(s[n]);
          while (!a.eol()) {
            if ("invalidchar" === i.token(a, r)) {
              break;
            }
          }
        }
        invariant(a, "Expected Parser stream to be available.");
        var o = e.line - 1;
        var l = a.getStartOfToken();
        var u = a.getCurrentPosition();
        return new Range(new Position(o, l), new Position(o, u));
      }(null !== (u = null === (l = t.locations) || void 0 === l ? void 0 : l[0]) && void 0 !== u ? u : {
        line: 0,
        column: 0
      }, f);
      return [ {
        severity: n.Error,
        message: t.message,
        source: "GraphQL: Syntax",
        range: c
      } ];
    }
    throw t;
  }
  return function validateQuery(t, i = null, r, s) {
    if (!i) {
      return [];
    }
    var o = function validateWithCustomRules(t, i, r, s, n) {
      var o = e.specifiedRules.filter((t => {
        if (t === e.NoUnusedFragmentsRule || t === e.ExecutableDefinitionsRule) {
          return !1;
        }
        if (s && t === e.KnownFragmentNamesRule) {
          return !1;
        }
        return !0;
      }));
      if (r) {
        Array.prototype.push.apply(o, r);
      }
      if (n) {
        Array.prototype.push.apply(o, a);
      }
      return e.validate(t, i, o).filter((t => {
        if (t.message.includes("Unknown directive") && t.nodes) {
          var i = t.nodes[0];
          if (i && i.kind === e.Kind.DIRECTIVE) {
            var r = i.name.value;
            if ("arguments" === r || "argumentDefinitions" === r) {
              return !1;
            }
          }
        }
        return !0;
      }));
    }(i, t, r, s).flatMap((e => annotations(e, n.Error, "Validation")));
    var l = e.validate(i, t, [ e.NoDeprecatedCustomRule ]).flatMap((e => annotations(e, n.Warning, "Deprecation")));
    return o.concat(l);
  }(p, i, r, s);
}

function annotations(e, t, i) {
  if (!e.nodes) {
    return [];
  }
  var r = [];
  for (var [s, a] of e.nodes.entries()) {
    var n = "Variable" !== a.kind && "name" in a && void 0 !== a.name ? a.name : "variable" in a && void 0 !== a.variable ? a.variable : a;
    if (n) {
      invariant(e.locations, "GraphQL validation error requires locations.");
      var o = e.locations[s];
      var l = getLocation(n);
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

var o = "FragmentDefinition";

class GraphQLError extends Error {
  constructor(e, t, i, r, s, a, n) {
    super(e);
    this.name = "GraphQLError";
    this.message = e;
    if (s) {
      this.path = s;
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
    if (a) {
      this.originalError = a;
    }
    var o = n;
    if (!o && a) {
      var l = a.extensions;
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

var l;

var u;

function error(e) {
  return new GraphQLError(`Syntax Error: Unexpected token at ${u} in ${e}`);
}

function advance(e) {
  e.lastIndex = u;
  if (e.test(l)) {
    return l.slice(u, u = e.lastIndex);
  }
}

var p = / +(?=[^\s])/y;

function blockString(e) {
  var t = e.split("\n");
  var i = "";
  var r = 0;
  var s = 0;
  var a = t.length - 1;
  for (var n = 0; n < t.length; n++) {
    p.lastIndex = 0;
    if (p.test(t[n])) {
      if (n && (!r || p.lastIndex < r)) {
        r = p.lastIndex;
      }
      s = s || n;
      a = n;
    }
  }
  for (var o = s; o <= a; o++) {
    if (o !== s) {
      i += "\n";
    }
    i += t[o].slice(r).replace(/\\"""/g, '"""');
  }
  return i;
}

function ignored() {
  for (var e = 0 | l.charCodeAt(u++); 9 === e || 10 === e || 13 === e || 32 === e || 35 === e || 44 === e || 65279 === e; e = 0 | l.charCodeAt(u++)) {
    if (35 === e) {
      while (10 !== (e = l.charCodeAt(u++)) && 13 !== e) {}
    }
  }
  u--;
}

var h = /[_A-Za-z]\w*/y;

function name() {
  var e;
  if (e = advance(h)) {
    return {
      kind: "Name",
      value: e
    };
  }
}

var f = /(?:null|true|false)/y;

var c = /\$[_A-Za-z]\w*/y;

var d = /-?\d+/y;

var v = /(?:\.\d+)?[eE][+-]?\d+|\.\d+/y;

var g = /\\/g;

var m = /"""(?:"""|(?:[\s\S]*?[^\\])""")/y;

var x = /"(?:"|[^\r\n]*?[^\\]")/y;

function value(e) {
  var t;
  var i;
  if (i = advance(f)) {
    t = "null" === i ? {
      kind: "NullValue"
    } : {
      kind: "BooleanValue",
      value: "true" === i
    };
  } else if (!e && (i = advance(c))) {
    t = {
      kind: "Variable",
      name: {
        kind: "Name",
        value: i.slice(1)
      }
    };
  } else if (i = advance(d)) {
    var r = i;
    if (i = advance(v)) {
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
  } else if (i = advance(h)) {
    t = {
      kind: "EnumValue",
      value: i
    };
  } else if (i = advance(m)) {
    t = {
      kind: "StringValue",
      value: blockString(i.slice(3, -3)),
      block: !0
    };
  } else if (i = advance(x)) {
    t = {
      kind: "StringValue",
      value: g.test(i) ? JSON.parse(i) : i.slice(1, -1),
      block: !1
    };
  } else if (t = function list(e) {
    var t;
    if (91 === l.charCodeAt(u)) {
      u++;
      ignored();
      var i = [];
      while (t = value(e)) {
        i.push(t);
      }
      if (93 !== l.charCodeAt(u++)) {
        throw error("ListValue");
      }
      ignored();
      return {
        kind: "ListValue",
        values: i
      };
    }
  }(e) || function object(e) {
    if (123 === l.charCodeAt(u)) {
      u++;
      ignored();
      var t = [];
      var i;
      while (i = name()) {
        ignored();
        if (58 !== l.charCodeAt(u++)) {
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
      if (125 !== l.charCodeAt(u++)) {
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
  if (40 === l.charCodeAt(u)) {
    u++;
    ignored();
    var i;
    while (i = name()) {
      ignored();
      if (58 !== l.charCodeAt(u++)) {
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
    if (!t.length || 41 !== l.charCodeAt(u++)) {
      throw error("Argument");
    }
    ignored();
  }
  return t;
}

function directives(e) {
  var t = [];
  ignored();
  while (64 === l.charCodeAt(u)) {
    u++;
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
    if (58 === l.charCodeAt(u)) {
      u++;
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
  if (91 === l.charCodeAt(u)) {
    u++;
    ignored();
    var t = type();
    if (!t || 93 !== l.charCodeAt(u++)) {
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
  if (33 === l.charCodeAt(u)) {
    u++;
    ignored();
    return {
      kind: "NonNullType",
      type: e
    };
  } else {
    return e;
  }
}

var S = /on/y;

function typeCondition() {
  if (advance(S)) {
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

var y = /\.\.\./y;

function fragmentSpread() {
  if (advance(y)) {
    ignored();
    var e = u;
    var t;
    if ((t = name()) && "on" !== t.value) {
      return {
        kind: "FragmentSpread",
        name: t,
        directives: directives(!1)
      };
    } else {
      u = e;
      var i = typeCondition();
      var r = directives(!1);
      var s = selectionSet();
      if (!s) {
        throw error("InlineFragment");
      }
      return {
        kind: "InlineFragment",
        typeCondition: i,
        directives: r,
        selectionSet: s
      };
    }
  }
}

function selectionSet() {
  var e;
  ignored();
  if (123 === l.charCodeAt(u)) {
    u++;
    ignored();
    var t = [];
    while (e = fragmentSpread() || field()) {
      t.push(e);
    }
    if (!t.length || 125 !== l.charCodeAt(u++)) {
      throw error("SelectionSet");
    }
    ignored();
    return {
      kind: "SelectionSet",
      selections: t
    };
  }
}

var T = /fragment/y;

function fragmentDefinition() {
  if (advance(T)) {
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

var E = /(?:query|mutation|subscription)/y;

function operationDefinition() {
  var e;
  var t;
  var i = [];
  var r = [];
  if (e = advance(E)) {
    ignored();
    t = name();
    i = function variableDefinitions() {
      var e;
      var t = [];
      ignored();
      if (40 === l.charCodeAt(u)) {
        u++;
        ignored();
        while (e = advance(c)) {
          ignored();
          if (58 !== l.charCodeAt(u++)) {
            throw error("VariableDefinition");
          }
          var i = type();
          var r = void 0;
          if (61 === l.charCodeAt(u)) {
            u++;
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
        if (41 !== l.charCodeAt(u++)) {
          throw error("VariableDefinition");
        }
        ignored();
      }
      return t;
    }();
    r = directives(!1);
  }
  var s = selectionSet();
  if (s) {
    return {
      kind: "OperationDefinition",
      operation: e || "query",
      name: t,
      variableDefinitions: i,
      directives: r,
      selectionSet: s
    };
  }
}

function parse(e, t) {
  l = "string" == typeof e.body ? e.body : e;
  u = 0;
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

var A = {};

function visit(e, t) {
  var i = [];
  var r = [];
  try {
    var s = function traverse(e, s, a) {
      var n = !1;
      var o = t[e.kind] && t[e.kind].enter || t[e.kind] || t.enter;
      var l = o && o.call(t, e, s, a, r, i);
      if (!1 === l) {
        return e;
      } else if (null === l) {
        return null;
      } else if (l === A) {
        throw A;
      } else if (l && "string" == typeof l.kind) {
        n = l !== e;
        e = l;
      }
      if (a) {
        i.push(a);
      }
      var u;
      var p = {
        ...e
      };
      for (var h in e) {
        r.push(h);
        var f = e[h];
        if (Array.isArray(f)) {
          var c = [];
          for (var d = 0; d < f.length; d++) {
            if (null != f[d] && "string" == typeof f[d].kind) {
              i.push(e);
              r.push(d);
              u = traverse(f[d], d, f);
              r.pop();
              i.pop();
              if (null == u) {
                n = !0;
              } else {
                n = n || u !== f[d];
                c.push(u);
              }
            }
          }
          f = c;
        } else if (null != f && "string" == typeof f.kind) {
          if (void 0 !== (u = traverse(f, h, e))) {
            n = n || f !== u;
            f = u;
          }
        }
        r.pop();
        if (n) {
          p[h] = f;
        }
      }
      if (a) {
        i.pop();
      }
      var v = t[e.kind] && t[e.kind].leave || t.leave;
      var g = v && v.call(t, e, s, a, r, i);
      if (g === A) {
        throw A;
      } else if (void 0 !== g) {
        return g;
      } else if (void 0 !== l) {
        return n ? p : l;
      } else {
        return n ? p : e;
      }
    }(e);
    return void 0 !== s && !1 !== s ? s : e;
  } catch (t) {
    if (t !== A) {
      throw t;
    }
    return e;
  }
}

var hasItems = e => !(!e || !e.length);

var b = {
  OperationDefinition(e) {
    if ("query" === e.operation && !e.name && !hasItems(e.variableDefinitions) && !hasItems(e.directives)) {
      return b.SelectionSet(e.selectionSet);
    }
    var t = e.operation;
    if (e.name) {
      t += " " + e.name.value;
    }
    if (hasItems(e.variableDefinitions)) {
      if (!e.name) {
        t += " ";
      }
      t += "(" + e.variableDefinitions.map(b.VariableDefinition).join(", ") + ")";
    }
    if (hasItems(e.directives)) {
      t += " " + e.directives.map(b.Directive).join(" ");
    }
    return t + " " + b.SelectionSet(e.selectionSet);
  },
  VariableDefinition(e) {
    var t = b.Variable(e.variable) + ": " + print(e.type);
    if (e.defaultValue) {
      t += " = " + print(e.defaultValue);
    }
    if (hasItems(e.directives)) {
      t += " " + e.directives.map(b.Directive).join(" ");
    }
    return t;
  },
  Field(e) {
    var t = (e.alias ? e.alias.value + ": " : "") + e.name.value;
    if (hasItems(e.arguments)) {
      var i = e.arguments.map(b.Argument);
      var r = t + "(" + i.join(", ") + ")";
      t = r.length > 80 ? t + "(\n  " + i.join("\n").replace(/\n/g, "\n  ") + "\n)" : r;
    }
    if (hasItems(e.directives)) {
      t += " " + e.directives.map(b.Directive).join(" ");
    }
    return e.selectionSet ? t + " " + b.SelectionSet(e.selectionSet) : t;
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
  ObjectValue: e => "{" + e.fields.map(b.ObjectField).join(", ") + "}",
  ObjectField: e => e.name.value + ": " + print(e.value),
  Document: e => hasItems(e.definitions) ? e.definitions.map(print).join("\n\n") : "",
  SelectionSet: e => "{\n  " + e.selections.map(print).join("\n").replace(/\n/g, "\n  ") + "\n}",
  Argument: e => e.name.value + ": " + print(e.value),
  FragmentSpread(e) {
    var t = "..." + e.name.value;
    if (hasItems(e.directives)) {
      t += " " + e.directives.map(b.Directive).join(" ");
    }
    return t;
  },
  InlineFragment(e) {
    var t = "...";
    if (e.typeCondition) {
      t += " on " + e.typeCondition.name.value;
    }
    if (hasItems(e.directives)) {
      t += " " + e.directives.map(b.Directive).join(" ");
    }
    return t + " " + print(e.selectionSet);
  },
  FragmentDefinition(e) {
    var t = "fragment " + e.name.value;
    t += " on " + e.typeCondition.name.value;
    if (hasItems(e.directives)) {
      t += " " + e.directives.map(b.Directive).join(" ");
    }
    return t + " " + print(e.selectionSet);
  },
  Directive(e) {
    var t = "@" + e.name.value;
    if (hasItems(e.arguments)) {
      t += "(" + e.arguments.map(b.Argument).join(", ") + ")";
    }
    return t;
  },
  NamedType: e => e.name.value,
  ListType: e => "[" + print(e.type) + "]",
  NonNullType: e => print(e.type) + "!"
};

function print(e) {
  return b[e.kind] ? b[e.kind](e) : "";
}

var w = new Set([ "gql", "graphql" ]);

var isIIFE = e => exports.ts.isCallExpression(e) && 0 === e.arguments.length && (exports.ts.isFunctionExpression(e.expression) || exports.ts.isArrowFunction(e.expression)) && !e.expression.asteriskToken && !e.expression.modifiers?.length;

var isGraphQLFunctionIdentifier = e => exports.ts.isIdentifier(e) && w.has(e.escapedText);

var isTadaGraphQLFunction = (e, t) => {
  if (!exports.ts.isLeftHandSideExpression(e)) {
    return !1;
  }
  var i = t?.getTypeAtLocation(e);
  return null != i && null != i.getProperty("scalar") && null != i.getProperty("persisted");
};

var isTadaGraphQLCall = (e, t) => {
  if (!exports.ts.isCallExpression(e)) {
    return !1;
  } else if (e.arguments.length < 1 || e.arguments.length > 2) {
    return !1;
  } else if (!exports.ts.isStringLiteralLike(e.arguments[0])) {
    return !1;
  }
  return t ? isTadaGraphQLFunction(e.expression, t) : !1;
};

var isTadaPersistedCall = (e, t) => {
  if (!e) {
    return !1;
  } else if (!exports.ts.isCallExpression(e)) {
    return !1;
  } else if (!exports.ts.isPropertyAccessExpression(e.expression)) {
    return !1;
  } else if (!exports.ts.isIdentifier(e.expression.name) || "persisted" !== e.expression.name.escapedText) {
    return !1;
  } else if (isGraphQLFunctionIdentifier(e.expression.expression)) {
    return !0;
  } else {
    return isTadaGraphQLFunction(e.expression.expression, t);
  }
};

var isGraphQLCall = (e, t) => exports.ts.isCallExpression(e) && e.arguments.length >= 1 && e.arguments.length <= 2 && (isGraphQLFunctionIdentifier(e.expression) || isTadaGraphQLCall(e, t));

var isGraphQLTag = e => exports.ts.isTaggedTemplateExpression(e) && isGraphQLFunctionIdentifier(e.tag);

var getSchemaName = (e, t, i = !1) => {
  if (!t) {
    return null;
  }
  var r = t.getTypeAtLocation(i ? e.getChildAt(0).getChildAt(0) : e.expression);
  if (r) {
    var s = r.getProperty("__name");
    if (s) {
      var a = t.getTypeOfSymbol(s);
      if (a.isUnionOrIntersection()) {
        var n = a.types.find((e => e.isStringLiteral()));
        return n && n.isStringLiteral() ? n.value : null;
      } else if (a.isStringLiteral()) {
        return a.value;
      }
    }
  }
  return null;
};

function resolveTemplate(e, t, i) {
  if (exports.ts.isStringLiteralLike(e)) {
    return {
      combinedText: e.getText().slice(1, -1),
      resolvedSpans: []
    };
  }
  var r = e.template.getText().slice(1, -1);
  if (exports.ts.isNoSubstitutionTemplateLiteral(e.template) || 0 === e.template.templateSpans.length) {
    return {
      combinedText: r,
      resolvedSpans: []
    };
  }
  var s = 0;
  var a = e.template.templateSpans.map((e => {
    if (exports.ts.isIdentifier(e.expression)) {
      var a = i.languageService.getDefinitionAtPosition(t, e.expression.getStart());
      var n = a && a[0];
      if (!n) {
        return;
      }
      var o = getSource(i, n.fileName);
      if (!o) {
        return;
      }
      var l = findNode(o, n.textSpan.start);
      if (!l || !l.parent) {
        return;
      }
      var u = l.parent;
      if (exports.ts.isVariableDeclaration(u)) {
        var p = e.expression.escapedText;
        var h = e.expression.getStart() - 2;
        var f = {
          start: h,
          length: e.expression.end - h + 1
        };
        if (u.initializer && exports.ts.isTaggedTemplateExpression(u.initializer)) {
          var c = resolveTemplate(u.initializer, n.fileName, i);
          r = r.replace("${" + e.expression.escapedText + "}", c.combinedText);
          var d = {
            lines: c.combinedText.split("\n").length,
            identifier: p,
            original: f,
            new: {
              start: f.start + s,
              length: c.combinedText.length
            }
          };
          s += c.combinedText.length - f.length;
          return d;
        } else if (u.initializer && exports.ts.isAsExpression(u.initializer) && exports.ts.isTaggedTemplateExpression(u.initializer.expression)) {
          var v = resolveTemplate(u.initializer.expression, n.fileName, i);
          r = r.replace("${" + e.expression.escapedText + "}", v.combinedText);
          var g = {
            lines: v.combinedText.split("\n").length,
            identifier: p,
            original: f,
            new: {
              start: f.start + s,
              length: v.combinedText.length
            }
          };
          s += v.combinedText.length - f.length;
          return g;
        } else if (u.initializer && exports.ts.isAsExpression(u.initializer) && exports.ts.isAsExpression(u.initializer.expression) && exports.ts.isObjectLiteralExpression(u.initializer.expression.expression)) {
          var m = print(JSON.parse(u.initializer.expression.expression.getText()));
          r = r.replace("${" + e.expression.escapedText + "}", m);
          var x = {
            lines: m.split("\n").length,
            identifier: p,
            original: f,
            new: {
              start: f.start + s,
              length: m.length
            }
          };
          s += m.length - f.length;
          return x;
        }
        return;
      }
    }
    return;
  })).filter(Boolean);
  return {
    combinedText: r,
    resolvedSpans: a
  };
}

var resolveTadaFragmentArray = e => {
  if (!e) {
    return;
  }
  while (exports.ts.isAsExpression(e)) {
    e = e.expression;
  }
  if (!exports.ts.isArrayLiteralExpression(e)) {
    return;
  }
  if (e.elements.every(exports.ts.isIdentifier)) {
    return e.elements;
  }
  var t = [];
  for (var i of e.elements) {
    while (exports.ts.isPropertyAccessExpression(i)) {
      i = i.name;
    }
    if (exports.ts.isIdentifier(i)) {
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
      return exports.ts.forEachChild(e, find) || e;
    }
  }(e);
}

function unrollFragment(t, i, r) {
  var s = [];
  var a = [ t ];
  var n = new WeakSet;
  var _unrollElement = t => {
    if (n.has(t)) {
      return;
    }
    n.add(t);
    var o = function resolveIdentifierToGraphQLCall(e, t, i) {
      var r;
      var s = e;
      while (exports.ts.isIdentifier(s) && s !== r) {
        r = s;
        var a = t.languageService.getDefinitionAtPosition(s.getSourceFile().fileName, s.getStart());
        var n = a && a[0];
        var o = n && getSource(t, n.fileName);
        if (!n || !o) {
          return null;
        }
        if (!(s = findNode(o, n.textSpan.start))) {
          return null;
        }
        while (exports.ts.isPropertyAccessExpression(s.parent)) {
          s = s.parent;
        }
        if (exports.ts.isVariableDeclaration(s.parent) && s.parent.initializer && exports.ts.isCallExpression(s.parent.initializer)) {
          s = s.parent.initializer;
        } else if (exports.ts.isPropertyAssignment(s.parent)) {
          s = s.parent.initializer;
        } else if (exports.ts.isBinaryExpression(s.parent)) {
          s = exports.ts.isPropertyAccessExpression(s.parent.right) ? s.parent.right.name : s.parent.right;
        }
      }
      return isGraphQLCall(s, i) ? s : null;
    }(t, i, r);
    if (!o) {
      return;
    }
    var l = resolveTadaFragmentArray(o.arguments[1]);
    if (l) {
      a.push(...l);
    }
    try {
      e.parse(o.arguments[0].getText().slice(1, -1), {
        noLocation: !0
      }).definitions.forEach((e => {
        if ("FragmentDefinition" === e.kind) {
          s.push(e);
        }
      }));
    } catch (e) {}
  };
  var o;
  while (void 0 !== (o = a.shift())) {
    _unrollElement(o);
  }
  return s;
}

function unrollTadaFragments(e, t, i) {
  var r = i.languageService.getProgram()?.getTypeChecker();
  e.elements.forEach((e => {
    if (exports.ts.isIdentifier(e)) {
      t.push(...unrollFragment(e, i, r));
    } else if (exports.ts.isPropertyAccessExpression(e)) {
      var s = e;
      while (exports.ts.isPropertyAccessExpression(s.expression)) {
        s = s.expression;
      }
      if (exports.ts.isIdentifier(s.name)) {
        t.push(...unrollFragment(s.name, i, r));
      }
    }
  }));
  return t;
}

function findAllCallExpressions(e, t, i = !0) {
  var r = t.languageService.getProgram()?.getTypeChecker();
  var s = [];
  var a = [];
  var n = i ? !1 : !0;
  !function find(i) {
    if (!exports.ts.isCallExpression(i) || isIIFE(i)) {
      return exports.ts.forEachChild(i, find);
    }
    if (!isGraphQLCall(i, r)) {
      return exports.ts.forEachChild(i, find);
    }
    var o = getSchemaName(i, r);
    var l = i.arguments[0];
    var u = resolveTadaFragmentArray(i.arguments[1]);
    if (!n && !u) {
      n = !0;
      a.push(...getAllFragments(e.fileName, i, t));
    } else if (u) {
      for (var p of u) {
        a.push(...unrollFragment(p, t, r));
      }
    }
    if (l && exports.ts.isStringLiteralLike(l)) {
      s.push({
        node: l,
        schema: o
      });
    }
  }(e);
  return {
    nodes: s,
    fragments: a
  };
}

function findAllPersistedCallExpressions(e, t) {
  var i = [];
  var r = t?.languageService.getProgram()?.getTypeChecker();
  !function find(e) {
    if (!exports.ts.isCallExpression(e) || isIIFE(e)) {
      return exports.ts.forEachChild(e, find);
    }
    if (!isTadaPersistedCall(e, r)) {
      return;
    } else if (t) {
      var s = getSchemaName(e, r, !0);
      i.push({
        node: e,
        schema: s
      });
    } else {
      i.push(e);
    }
  }(e);
  return i;
}

function getAllFragments(t, i, r) {
  var s = [];
  var a = r.languageService.getProgram()?.getTypeChecker();
  if (!exports.ts.isCallExpression(i)) {
    return s;
  }
  var n = resolveTadaFragmentArray(i.arguments[1]);
  if (n) {
    var o = r.languageService.getProgram()?.getTypeChecker();
    for (var l of n) {
      s.push(...unrollFragment(l, r, o));
    }
    return s;
  } else if (isTadaGraphQLCall(i, a)) {
    return s;
  }
  var u = r.languageService.getDefinitionAtPosition(t, i.expression.getStart());
  if (!u || !u.length) {
    return s;
  }
  var p = u[0];
  if (!p) {
    return s;
  }
  var h = getSource(r, p.fileName);
  if (!h) {
    return s;
  }
  exports.ts.forEachChild(h, (t => {
    if (exports.ts.isVariableStatement(t) && t.declarationList && t.declarationList.declarations[0] && "documents" === t.declarationList.declarations[0].name.getText()) {
      var [i] = t.declarationList.declarations;
      if (i.initializer && exports.ts.isObjectLiteralExpression(i.initializer)) {
        i.initializer.properties.forEach((t => {
          if (exports.ts.isPropertyAssignment(t) && exports.ts.isStringLiteral(t.name)) {
            try {
              var i = JSON.parse(`${t.name.getText().replace(/'/g, '"')}`);
              if (i.includes("fragment ") && i.includes(" on ")) {
                e.parse(i, {
                  noLocation: !0
                }).definitions.forEach((e => {
                  if ("FragmentDefinition" === e.kind) {
                    s.push(e);
                  }
                }));
              }
            } catch (e) {}
          }
        }));
      }
    }
  }));
  return s;
}

var D = "object" == typeof performance && performance && "function" == typeof performance.now ? performance : Date;

var k = new Set;

var L = "object" == typeof process && process ? process : {};

var emitWarning = (e, t, i, r) => {
  "function" == typeof L.emitWarning ? L.emitWarning(e, t, i, r) : console.error(`[${i}] ${t}: ${e}`);
};

var C = globalThis.AbortController;

var N = globalThis.AbortSignal;

if (void 0 === C) {
  N = class AbortSignal {
    _onabort=[];
    aborted=!1;
    addEventListener(e, t) {
      this._onabort.push(t);
    }
  };
  C = class AbortController {
    constructor() {
      warnACPolyfill();
    }
    signal=new N;
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
  var _ = "1" !== L.env?.LRU_CACHE_IGNORE_AC_WARNING;
  var warnACPolyfill = () => {
    if (!_) {
      return;
    }
    _ = !1;
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
  #s;
  #a;
  #n;
  #o;
  #l;
  #u;
  #p;
  #h;
  #f;
  #c;
  #d;
  #v;
  #g;
  #m;
  #x;
  #S;
  #y;
  #T;
  #E;
  static unsafeExposeInternals(e) {
    return {
      starts: e.#x,
      ttls: e.#S,
      sizes: e.#m,
      keyMap: e.#l,
      keyList: e.#u,
      valList: e.#p,
      next: e.#h,
      prev: e.#f,
      get head() {
        return e.#c;
      },
      get tail() {
        return e.#d;
      },
      free: e.#v,
      isBackgroundFetch: t => e.#A(t),
      backgroundFetch: (t, i, r, s) => e.#b(t, i, r, s),
      moveToTail: t => e.#w(t),
      indexes: t => e.#D(t),
      rindexes: t => e.#k(t),
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
    return this.#n;
  }
  get fetchMethod() {
    return this.#a;
  }
  get dispose() {
    return this.#r;
  }
  get disposeAfter() {
    return this.#s;
  }
  constructor(e) {
    var {max: t = 0, ttl: i, ttlResolution: r = 1, ttlAutopurge: s, updateAgeOnGet: a, updateAgeOnHas: n, allowStale: o, dispose: l, disposeAfter: u, noDisposeOnSet: p, noUpdateTTL: h, maxSize: f = 0, maxEntrySize: c = 0, sizeCalculation: d, fetchMethod: v, noDeleteOnFetchRejection: g, noDeleteOnStaleGet: m, allowStaleOnFetchRejection: x, allowStaleOnFetchAbort: S, ignoreFetchAbort: y} = e;
    if (0 !== t && !isPosInt(t)) {
      throw new TypeError("max option must be a nonnegative integer");
    }
    var T = t ? getUintArray(t) : Array;
    if (!T) {
      throw new Error("invalid max value: " + t);
    }
    this.#t = t;
    this.#i = f;
    this.maxEntrySize = c || this.#i;
    this.sizeCalculation = d;
    if (this.sizeCalculation) {
      if (!this.#i && !this.maxEntrySize) {
        throw new TypeError("cannot set sizeCalculation without setting maxSize or maxEntrySize");
      }
      if ("function" != typeof this.sizeCalculation) {
        throw new TypeError("sizeCalculation set to non-function");
      }
    }
    if (void 0 !== v && "function" != typeof v) {
      throw new TypeError("fetchMethod must be a function if specified");
    }
    this.#a = v;
    this.#T = !!v;
    this.#l = new Map;
    this.#u = new Array(t).fill(void 0);
    this.#p = new Array(t).fill(void 0);
    this.#h = new T(t);
    this.#f = new T(t);
    this.#c = 0;
    this.#d = 0;
    this.#v = Stack.create(t);
    this.#n = 0;
    this.#o = 0;
    if ("function" == typeof l) {
      this.#r = l;
    }
    if ("function" == typeof u) {
      this.#s = u;
      this.#g = [];
    } else {
      this.#s = void 0;
      this.#g = void 0;
    }
    this.#y = !!this.#r;
    this.#E = !!this.#s;
    this.noDisposeOnSet = !!p;
    this.noUpdateTTL = !!h;
    this.noDeleteOnFetchRejection = !!g;
    this.allowStaleOnFetchRejection = !!x;
    this.allowStaleOnFetchAbort = !!S;
    this.ignoreFetchAbort = !!y;
    if (0 !== this.maxEntrySize) {
      if (0 !== this.#i) {
        if (!isPosInt(this.#i)) {
          throw new TypeError("maxSize must be a positive integer if specified");
        }
      }
      if (!isPosInt(this.maxEntrySize)) {
        throw new TypeError("maxEntrySize must be a positive integer if specified");
      }
      this.#C();
    }
    this.allowStale = !!o;
    this.noDeleteOnStaleGet = !!m;
    this.updateAgeOnGet = !!a;
    this.updateAgeOnHas = !!n;
    this.ttlResolution = isPosInt(r) || 0 === r ? r : 1;
    this.ttlAutopurge = !!s;
    this.ttl = i || 0;
    if (this.ttl) {
      if (!isPosInt(this.ttl)) {
        throw new TypeError("ttl must be a positive integer if specified");
      }
      this.#N();
    }
    if (0 === this.#t && 0 === this.ttl && 0 === this.#i) {
      throw new TypeError("At least one of max, maxSize, or ttl is required");
    }
    if (!this.ttlAutopurge && !this.#t && !this.#i) {
      var E = "LRU_CACHE_UNBOUNDED";
      if ((e => !k.has(e))(E)) {
        k.add(E);
        emitWarning("TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.", "UnboundedCacheWarning", E, LRUCache);
      }
    }
  }
  getRemainingTTL(e) {
    return this.#l.has(e) ? 1 / 0 : 0;
  }
  #N() {
    var e = new ZeroArray(this.#t);
    var t = new ZeroArray(this.#t);
    this.#S = e;
    this.#x = t;
    this.#_ = (i, r, s = D.now()) => {
      t[i] = 0 !== r ? s : 0;
      e[i] = r;
      if (0 !== r && this.ttlAutopurge) {
        var a = setTimeout((() => {
          if (this.#L(i)) {
            this.delete(this.#u[i]);
          }
        }), r + 1);
        if (a.unref) {
          a.unref();
        }
      }
    };
    this.#F = i => {
      t[i] = 0 !== e[i] ? D.now() : 0;
    };
    this.#z = (r, s) => {
      if (e[s]) {
        var a = e[s];
        var n = t[s];
        r.ttl = a;
        r.start = n;
        r.now = i || getNow();
        r.remainingTTL = a - (r.now - n);
      }
    };
    var i = 0;
    var getNow = () => {
      var e = D.now();
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
      var s = this.#l.get(r);
      if (void 0 === s) {
        return 0;
      }
      var a = e[s];
      var n = t[s];
      if (0 === a || 0 === n) {
        return 1 / 0;
      }
      return a - ((i || getNow()) - n);
    };
    this.#L = r => 0 !== e[r] && 0 !== t[r] && (i || getNow()) - t[r] > e[r];
  }
  #F=() => {};
  #z=() => {};
  #_=() => {};
  #L=() => !1;
  #C() {
    var e = new ZeroArray(this.#t);
    this.#o = 0;
    this.#m = e;
    this.#I = t => {
      this.#o -= e[t];
      e[t] = 0;
    };
    this.#O = (e, t, i, r) => {
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
    this.#R = (t, i, r) => {
      e[t] = i;
      if (this.#i) {
        var s = this.#i - e[t];
        while (this.#o > s) {
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
  #I=e => {};
  #R=(e, t, i) => {};
  #O=(e, t, i, r) => {
    if (i || r) {
      throw new TypeError("cannot set size without setting maxSize or maxEntrySize on cache");
    }
    return 0;
  };
  * #D({allowStale: e = this.allowStale} = {}) {
    if (this.#n) {
      for (var t = this.#d; 1; ) {
        if (!this.#$(t)) {
          break;
        }
        if (e || !this.#L(t)) {
          yield t;
        }
        if (t === this.#c) {
          break;
        } else {
          t = this.#f[t];
        }
      }
    }
  }
  * #k({allowStale: e = this.allowStale} = {}) {
    if (this.#n) {
      for (var t = this.#c; 1; ) {
        if (!this.#$(t)) {
          break;
        }
        if (e || !this.#L(t)) {
          yield t;
        }
        if (t === this.#d) {
          break;
        } else {
          t = this.#h[t];
        }
      }
    }
  }
  #$(e) {
    return void 0 !== e && this.#l.get(this.#u[e]) === e;
  }
  * entries() {
    for (var e of this.#D()) {
      if (void 0 !== this.#p[e] && void 0 !== this.#u[e] && !this.#A(this.#p[e])) {
        yield [ this.#u[e], this.#p[e] ];
      }
    }
  }
  * rentries() {
    for (var e of this.#k()) {
      if (void 0 !== this.#p[e] && void 0 !== this.#u[e] && !this.#A(this.#p[e])) {
        yield [ this.#u[e], this.#p[e] ];
      }
    }
  }
  * keys() {
    for (var e of this.#D()) {
      var t = this.#u[e];
      if (void 0 !== t && !this.#A(this.#p[e])) {
        yield t;
      }
    }
  }
  * rkeys() {
    for (var e of this.#k()) {
      var t = this.#u[e];
      if (void 0 !== t && !this.#A(this.#p[e])) {
        yield t;
      }
    }
  }
  * values() {
    for (var e of this.#D()) {
      if (void 0 !== this.#p[e] && !this.#A(this.#p[e])) {
        yield this.#p[e];
      }
    }
  }
  * rvalues() {
    for (var e of this.#k()) {
      if (void 0 !== this.#p[e] && !this.#A(this.#p[e])) {
        yield this.#p[e];
      }
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  find(e, t = {}) {
    for (var i of this.#D()) {
      var r = this.#p[i];
      var s = this.#A(r) ? r.__staleWhileFetching : r;
      if (void 0 === s) {
        continue;
      }
      if (e(s, this.#u[i], this)) {
        return this.get(this.#u[i], t);
      }
    }
  }
  forEach(e, t = this) {
    for (var i of this.#D()) {
      var r = this.#p[i];
      var s = this.#A(r) ? r.__staleWhileFetching : r;
      if (void 0 === s) {
        continue;
      }
      e.call(t, s, this.#u[i], this);
    }
  }
  rforEach(e, t = this) {
    for (var i of this.#k()) {
      var r = this.#p[i];
      var s = this.#A(r) ? r.__staleWhileFetching : r;
      if (void 0 === s) {
        continue;
      }
      e.call(t, s, this.#u[i], this);
    }
  }
  purgeStale() {
    var e = !1;
    for (var t of this.#k({
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
    for (var t of this.#D({
      allowStale: !0
    })) {
      var i = this.#u[t];
      var r = this.#p[t];
      var s = this.#A(r) ? r.__staleWhileFetching : r;
      if (void 0 === s || void 0 === i) {
        continue;
      }
      var a = {
        value: s
      };
      if (this.#S && this.#x) {
        a.ttl = this.#S[t];
        var n = D.now() - this.#x[t];
        a.start = Math.floor(Date.now() - n);
      }
      if (this.#m) {
        a.size = this.#m[t];
      }
      e.unshift([ i, a ]);
    }
    return e;
  }
  load(e) {
    this.clear();
    for (var [t, i] of e) {
      if (i.start) {
        var r = Date.now() - i.start;
        i.start = D.now() - r;
      }
      this.set(t, i.value, i);
    }
  }
  set(e, t, i = {}) {
    if (void 0 === t) {
      this.delete(e);
      return this;
    }
    var {ttl: r = this.ttl, start: s, noDisposeOnSet: a = this.noDisposeOnSet, sizeCalculation: n = this.sizeCalculation, status: o} = i;
    var {noUpdateTTL: l = this.noUpdateTTL} = i;
    var u = this.#O(e, t, i.size || 0, n);
    if (this.maxEntrySize && u > this.maxEntrySize) {
      if (o) {
        o.set = "miss";
        o.maxEntrySizeExceeded = !0;
      }
      this.delete(e);
      return this;
    }
    var p = 0 === this.#n ? void 0 : this.#l.get(e);
    if (void 0 === p) {
      p = 0 === this.#n ? this.#d : 0 !== this.#v.length ? this.#v.pop() : this.#n === this.#t ? this.#P(!1) : this.#n;
      this.#u[p] = e;
      this.#p[p] = t;
      this.#l.set(e, p);
      this.#h[this.#d] = p;
      this.#f[p] = this.#d;
      this.#d = p;
      this.#n++;
      this.#R(p, u, o);
      if (o) {
        o.set = "add";
      }
      l = !1;
    } else {
      this.#w(p);
      var h = this.#p[p];
      if (t !== h) {
        if (this.#T && this.#A(h)) {
          h.__abortController.abort(new Error("replaced"));
          var {__staleWhileFetching: f} = h;
          if (void 0 !== f && !a) {
            if (this.#y) {
              this.#r?.(f, e, "set");
            }
            if (this.#E) {
              this.#g?.push([ f, e, "set" ]);
            }
          }
        } else if (!a) {
          if (this.#y) {
            this.#r?.(h, e, "set");
          }
          if (this.#E) {
            this.#g?.push([ h, e, "set" ]);
          }
        }
        this.#I(p);
        this.#R(p, u, o);
        this.#p[p] = t;
        if (o) {
          o.set = "replace";
          var c = h && this.#A(h) ? h.__staleWhileFetching : h;
          if (void 0 !== c) {
            o.oldValue = c;
          }
        }
      } else if (o) {
        o.set = "update";
      }
    }
    if (0 !== r && !this.#S) {
      this.#N();
    }
    if (this.#S) {
      if (!l) {
        this.#_(p, r, s);
      }
      if (o) {
        this.#z(o, p);
      }
    }
    if (!a && this.#E && this.#g) {
      var d = this.#g;
      var v;
      while (v = d?.shift()) {
        this.#s?.(...v);
      }
    }
    return this;
  }
  pop() {
    try {
      while (this.#n) {
        var e = this.#p[this.#c];
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
          this.#s?.(...i);
        }
      }
    }
  }
  #P(e) {
    var t = this.#c;
    var i = this.#u[t];
    var r = this.#p[t];
    if (this.#T && this.#A(r)) {
      r.__abortController.abort(new Error("evicted"));
    } else if (this.#y || this.#E) {
      if (this.#y) {
        this.#r?.(r, i, "evict");
      }
      if (this.#E) {
        this.#g?.push([ r, i, "evict" ]);
      }
    }
    this.#I(t);
    if (e) {
      this.#u[t] = void 0;
      this.#p[t] = void 0;
      this.#v.push(t);
    }
    if (1 === this.#n) {
      this.#c = this.#d = 0;
      this.#v.length = 0;
    } else {
      this.#c = this.#h[t];
    }
    this.#l.delete(i);
    this.#n--;
    return t;
  }
  has(e, t = {}) {
    var {updateAgeOnHas: i = this.updateAgeOnHas, status: r} = t;
    var s = this.#l.get(e);
    if (void 0 !== s) {
      var a = this.#p[s];
      if (this.#A(a) && void 0 === a.__staleWhileFetching) {
        return !1;
      }
      if (!this.#L(s)) {
        if (i) {
          this.#F(s);
        }
        if (r) {
          r.has = "hit";
          this.#z(r, s);
        }
        return !0;
      } else if (r) {
        r.has = "stale";
        this.#z(r, s);
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
      var s = this.#p[r];
      return this.#A(s) ? s.__staleWhileFetching : s;
    }
  }
  #b(e, t, i, r) {
    var s = void 0 === t ? void 0 : this.#p[t];
    if (this.#A(s)) {
      return s;
    }
    var a = new C;
    var {signal: n} = i;
    n?.addEventListener("abort", (() => a.abort(n.reason)), {
      signal: a.signal
    });
    var o = {
      signal: a.signal,
      options: i,
      context: r
    };
    var cb = (r, s = !1) => {
      var {aborted: n} = a.signal;
      var u = i.ignoreFetchAbort && void 0 !== r;
      if (i.status) {
        if (n && !s) {
          i.status.fetchAborted = !0;
          i.status.fetchError = a.signal.reason;
          if (u) {
            i.status.fetchAbortIgnored = !0;
          }
        } else {
          i.status.fetchResolved = !0;
        }
      }
      if (n && !u && !s) {
        return fetchFail(a.signal.reason);
      }
      if (this.#p[t] === l) {
        if (void 0 === r) {
          if (l.__staleWhileFetching) {
            this.#p[t] = l.__staleWhileFetching;
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
      var {aborted: s} = a.signal;
      var n = s && i.allowStaleOnFetchAbort;
      var o = n || i.allowStaleOnFetchRejection;
      var u = l;
      if (this.#p[t] === l) {
        if (!(o || i.noDeleteOnFetchRejection) || void 0 === u.__staleWhileFetching) {
          this.delete(e);
        } else if (!n) {
          this.#p[t] = u.__staleWhileFetching;
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
      var n = this.#a?.(e, s, o);
      if (n && n instanceof Promise) {
        n.then((e => t(void 0 === e ? void 0 : e)), r);
      }
      a.signal.addEventListener("abort", (() => {
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
      __abortController: a,
      __staleWhileFetching: s,
      __returned: void 0
    });
    if (void 0 === t) {
      this.set(e, u, {
        ...o.options,
        status: void 0
      });
      t = this.#l.get(e);
    } else {
      this.#p[t] = u;
    }
    return u;
  }
  #A(e) {
    if (!this.#T) {
      return !1;
    }
    var t = e;
    return !!t && t instanceof Promise && t.hasOwnProperty("__staleWhileFetching") && t.__abortController instanceof C;
  }
  async fetch(e, t = {}) {
    var {allowStale: i = this.allowStale, updateAgeOnGet: r = this.updateAgeOnGet, noDeleteOnStaleGet: s = this.noDeleteOnStaleGet, ttl: a = this.ttl, noDisposeOnSet: n = this.noDisposeOnSet, size: o = 0, sizeCalculation: l = this.sizeCalculation, noUpdateTTL: u = this.noUpdateTTL, noDeleteOnFetchRejection: p = this.noDeleteOnFetchRejection, allowStaleOnFetchRejection: h = this.allowStaleOnFetchRejection, ignoreFetchAbort: f = this.ignoreFetchAbort, allowStaleOnFetchAbort: c = this.allowStaleOnFetchAbort, context: d, forceRefresh: v = !1, status: g, signal: m} = t;
    if (!this.#T) {
      if (g) {
        g.fetch = "get";
      }
      return this.get(e, {
        allowStale: i,
        updateAgeOnGet: r,
        noDeleteOnStaleGet: s,
        status: g
      });
    }
    var x = {
      allowStale: i,
      updateAgeOnGet: r,
      noDeleteOnStaleGet: s,
      ttl: a,
      noDisposeOnSet: n,
      size: o,
      sizeCalculation: l,
      noUpdateTTL: u,
      noDeleteOnFetchRejection: p,
      allowStaleOnFetchRejection: h,
      allowStaleOnFetchAbort: c,
      ignoreFetchAbort: f,
      status: g,
      signal: m
    };
    var S = this.#l.get(e);
    if (void 0 === S) {
      if (g) {
        g.fetch = "miss";
      }
      var y = this.#b(e, S, x, d);
      return y.__returned = y;
    } else {
      var T = this.#p[S];
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
      var A = this.#L(S);
      if (!v && !A) {
        if (g) {
          g.fetch = "hit";
        }
        this.#w(S);
        if (r) {
          this.#F(S);
        }
        if (g) {
          this.#z(g, S);
        }
        return T;
      }
      var b = this.#b(e, S, x, d);
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
    var {allowStale: i = this.allowStale, updateAgeOnGet: r = this.updateAgeOnGet, noDeleteOnStaleGet: s = this.noDeleteOnStaleGet, status: a} = t;
    var n = this.#l.get(e);
    if (void 0 !== n) {
      var o = this.#p[n];
      var l = this.#A(o);
      if (a) {
        this.#z(a, n);
      }
      if (this.#L(n)) {
        if (a) {
          a.get = "stale";
        }
        if (!l) {
          if (!s) {
            this.delete(e);
          }
          if (a && i) {
            a.returnedStale = !0;
          }
          return i ? o : void 0;
        } else {
          if (a && i && void 0 !== o.__staleWhileFetching) {
            a.returnedStale = !0;
          }
          return i ? o.__staleWhileFetching : void 0;
        }
      } else {
        if (a) {
          a.get = "hit";
        }
        if (l) {
          return o.__staleWhileFetching;
        }
        this.#w(n);
        if (r) {
          this.#F(n);
        }
        return o;
      }
    } else if (a) {
      a.get = "miss";
    }
  }
  #V(e, t) {
    this.#f[t] = e;
    this.#h[e] = t;
  }
  #w(e) {
    if (e !== this.#d) {
      if (e === this.#c) {
        this.#c = this.#h[e];
      } else {
        this.#V(this.#f[e], this.#h[e]);
      }
      this.#V(this.#d, e);
      this.#d = e;
    }
  }
  delete(e) {
    var t = !1;
    if (0 !== this.#n) {
      var i = this.#l.get(e);
      if (void 0 !== i) {
        t = !0;
        if (1 === this.#n) {
          this.clear();
        } else {
          this.#I(i);
          var r = this.#p[i];
          if (this.#A(r)) {
            r.__abortController.abort(new Error("deleted"));
          } else if (this.#y || this.#E) {
            if (this.#y) {
              this.#r?.(r, e, "delete");
            }
            if (this.#E) {
              this.#g?.push([ r, e, "delete" ]);
            }
          }
          this.#l.delete(e);
          this.#u[i] = void 0;
          this.#p[i] = void 0;
          if (i === this.#d) {
            this.#d = this.#f[i];
          } else if (i === this.#c) {
            this.#c = this.#h[i];
          } else {
            this.#h[this.#f[i]] = this.#h[i];
            this.#f[this.#h[i]] = this.#f[i];
          }
          this.#n--;
          this.#v.push(i);
        }
      }
    }
    if (this.#E && this.#g?.length) {
      var s = this.#g;
      var a;
      while (a = s?.shift()) {
        this.#s?.(...a);
      }
    }
    return t;
  }
  clear() {
    for (var e of this.#k({
      allowStale: !0
    })) {
      var t = this.#p[e];
      if (this.#A(t)) {
        t.__abortController.abort(new Error("deleted"));
      } else {
        var i = this.#u[e];
        if (this.#y) {
          this.#r?.(t, i, "delete");
        }
        if (this.#E) {
          this.#g?.push([ t, i, "delete" ]);
        }
      }
    }
    this.#l.clear();
    this.#p.fill(void 0);
    this.#u.fill(void 0);
    if (this.#S && this.#x) {
      this.#S.fill(0);
      this.#x.fill(0);
    }
    if (this.#m) {
      this.#m.fill(0);
    }
    this.#c = 0;
    this.#d = 0;
    this.#v.length = 0;
    this.#o = 0;
    this.#n = 0;
    if (this.#E && this.#g) {
      var r = this.#g;
      var s;
      while (s = r?.shift()) {
        this.#s?.(...s);
      }
    }
  }
}

var F = {
  exports: {}
};

var z = {
  32: 16777619n,
  64: 1099511628211n,
  128: 309485009821345068724781371n,
  256: 374144419156711147060143317175368453031918731002211n,
  512: 35835915874844867368919076489095108449946327955754392558399825615420669938882575126094039892345713852759n,
  1024: 5016456510113118655434598811035278955030765345404790744303017523831112055108147451509157692220295382716162651878526895249385292291816524375083746691371804094271873160484737966720260389217684476157468082573n
};

var I = {
  32: 2166136261n,
  64: 14695981039346656037n,
  128: 144066263297769815596495629667062367629n,
  256: 100029257958052580907070968620625704837092796014241193945225284501741471925557n,
  512: 9659303129496669498009435400716310466090418745672637896108374329434462657994582932197716438449813051892206539805784495328239340083876191928701583869517785n,
  1024: 14197795064947621068722070641403218320880622795441933960878474914617582723252296732303717722150864096521202355549365628174669108571814760471015076148029755969804077320157692458563003215304957150157403644460363550505412711285966361610267868082893823963790439336411086884584107735010676915n
};

F.exports = function fnv1a(e) {
  var t = Number(I[32]);
  var i = !1;
  for (var r = 0; r < e.length; r++) {
    var s = e.charCodeAt(r);
    if (s > 127 && !i) {
      s = (e = unescape(encodeURIComponent(e))).charCodeAt(r);
      i = !0;
    }
    t ^= s;
    t += (t << 1) + (t << 4) + (t << 7) + (t << 8) + (t << 24);
  }
  return t >>> 0;
};

F.exports.bigInt = function bigInt(e, {size: t = 32} = {}) {
  if (!z[t]) {
    throw new Error("The `size` option must be one of 32, 64, 128, 256, 512, or 1024");
  }
  var i = I[t];
  var r = z[t];
  var s = !1;
  for (var a = 0; a < e.length; a++) {
    var n = e.charCodeAt(a);
    if (n > 127 && !s) {
      n = (e = unescape(encodeURIComponent(e))).charCodeAt(a);
      s = !0;
    }
    i ^= BigInt(n);
    i = BigInt.asUintN(t, i * r);
  }
  return i;
};

var O = getDefaultExportFromCjs(F.exports);

var R = 52005;

var unwrapAbstractType = e => e.isUnionOrIntersection() ? e.types.find((e => e.flags & exports.ts.TypeFlags.Object)) || e : e;

var getVariableDeclaration = e => {
  var t = e;
  var i = new Set;
  while (t.parent && !i.has(t)) {
    i.add(t);
    if (exports.ts.isBlock(t)) {
      return;
    } else if (exports.ts.isVariableDeclaration(t = t.parent)) {
      return t;
    }
  }
};

var traverseArrayDestructuring = (e, t, i, r, s) => e.elements.flatMap((e => {
  if (exports.ts.isOmittedExpression(e)) {
    return [];
  }
  var a = [ ...t ];
  return exports.ts.isIdentifier(e.name) ? crawlScope(e.name, a, i, r, s, !1) : exports.ts.isObjectBindingPattern(e.name) ? traverseDestructuring(e.name, a, i, r, s) : traverseArrayDestructuring(e.name, a, i, r, s);
}));

var traverseDestructuring = (e, t, i, r, s) => {
  var a = [];
  var _loop = function() {
    if (exports.ts.isObjectBindingPattern(n.name)) {
      var e = [ ...t ];
      if (n.propertyName && !t.includes(n.propertyName.getText())) {
        var o = [ ...e, n.propertyName.getText() ].join(".");
        if (i.find((e => e.startsWith(o)))) {
          e.push(n.propertyName.getText());
        }
      }
      var l = traverseDestructuring(n.name, e, i, r, s);
      a.push(...l);
    } else if (exports.ts.isIdentifier(n.name)) {
      var u = [ ...t ];
      if (n.propertyName && !t.includes(n.propertyName.getText())) {
        var p = [ ...u, n.propertyName.getText() ].join(".");
        if (i.find((e => e.startsWith(p)))) {
          u.push(n.propertyName.getText());
        }
      } else {
        var h = [ ...u, n.name.getText() ].join(".");
        if (i.find((e => e.startsWith(h)))) {
          u.push(n.name.getText());
        }
      }
      var f = crawlScope(n.name, u, i, r, s, !1);
      a.push(...f);
    }
  };
  for (var n of e.elements) {
    _loop();
  }
  return a;
};

var P = new Set([ "map", "filter", "forEach", "reduce", "every", "some", "find", "flatMap", "sort" ]);

var crawlChainedExpressions = (e, t, i, r, s) => {
  var a = exports.ts.isPropertyAccessExpression(e.expression) && P.has(e.expression.name.text);
  console.log("[GRAPHQLSP]: ", a, e.getFullText());
  if (a) {
    var n = "reduce" === e.expression.name.text;
    var o = e.arguments[0];
    var l = [];
    if (exports.ts.isCallExpression(e.parent.parent)) {
      var u = crawlChainedExpressions(e.parent.parent, t, i, r, s);
      if (u.length) {
        l.push(...u);
      }
    }
    if (o && exports.ts.isIdentifier(o)) {
      var p = s.languageService.getProgram().getTypeChecker();
      var h = p.getSymbolAtLocation(o)?.valueDeclaration;
      if (h && exports.ts.isFunctionDeclaration(h)) {
        o = h;
      } else if (h && exports.ts.isVariableDeclaration(h) && h.initializer) {
        o = h.initializer;
      }
    }
    if (o && (exports.ts.isFunctionDeclaration(o) || exports.ts.isFunctionExpression(o) || exports.ts.isArrowFunction(o))) {
      var f = o.parameters[n ? 1 : 0];
      if (f) {
        var c = crawlScope(f.name, t, i, r, s, !0);
        if (c.length) {
          l.push(...c);
        }
      }
    }
    return l;
  }
  return [];
};

var crawlScope = (e, t, i, r, s, a) => {
  if (exports.ts.isObjectBindingPattern(e)) {
    return traverseDestructuring(e, t, i, r, s);
  } else if (exports.ts.isArrayBindingPattern(e)) {
    return traverseArrayDestructuring(e, t, i, r, s);
  }
  var n = [];
  var o = s.languageService.getReferencesAtPosition(r.fileName, e.getStart());
  if (!o) {
    return n;
  }
  return n = o.flatMap((n => {
    if (n.fileName !== r.fileName) {
      return [];
    }
    if (e.getStart() <= n.textSpan.start && e.getEnd() >= n.textSpan.start + n.textSpan.length) {
      return [];
    }
    var o = findNode(r, n.textSpan.start);
    if (!o) {
      return [];
    }
    var l = [ ...t ];
    console.log("[GRAPHQLSP]: ", o.getFullText());
    var u, _loop2 = function() {
      if (!a && (exports.ts.isReturnStatement(o) || exports.ts.isArrowFunction(o))) {
        var e = l.join(".");
        return {
          v: i.filter((t => t.startsWith(e + ".")))
        };
      } else if (exports.ts.isVariableDeclaration(o)) {
        return {
          v: crawlScope(o.name, l, i, r, s, !1)
        };
      } else if (exports.ts.isIdentifier(o) && !l.includes(o.text)) {
        var t = [ ...l, o.text ].join(".");
        if (i.find((e => e.startsWith(t + ".")))) {
          l.push(o.text);
        }
      } else if (exports.ts.isPropertyAccessExpression(o) && "at" === o.name.text && exports.ts.isCallExpression(o.parent)) {
        o = o.parent;
      } else if (exports.ts.isPropertyAccessExpression(o) && P.has(o.name.text) && exports.ts.isCallExpression(o.parent)) {
        var n = o.parent;
        var u = [];
        var p = "some" === o.name.text || "every" === o.name.text;
        console.log("[GRAPHQLSP]: ", o.name.text);
        var h = crawlChainedExpressions(n, l, i, r, s);
        console.log("[GRAPHQLSP]: ", h.length);
        if (h.length) {
          u.push(...h);
        }
        if (exports.ts.isVariableDeclaration(n.parent) && !p) {
          var f = crawlScope(n.parent.name, l, i, r, s, !0);
          u.push(...f);
        }
        return {
          v: u
        };
      } else if (exports.ts.isPropertyAccessExpression(o) && !l.includes(o.name.text)) {
        var c = [ ...l, o.name.text ].join(".");
        if (i.find((e => e.startsWith(c)))) {
          l.push(o.name.text);
        }
      } else if (exports.ts.isElementAccessExpression(o) && exports.ts.isStringLiteral(o.argumentExpression) && !l.includes(o.argumentExpression.text)) {
        var d = [ ...l, o.argumentExpression.text ].join(".");
        if (i.find((e => e.startsWith(d)))) {
          l.push(o.argumentExpression.text);
        }
      }
      if (exports.ts.isNonNullExpression(o.parent)) {
        o = o.parent.parent;
      } else {
        o = o.parent;
      }
    };
    while (exports.ts.isIdentifier(o) || exports.ts.isPropertyAccessExpression(o) || exports.ts.isElementAccessExpression(o) || exports.ts.isVariableDeclaration(o) || exports.ts.isBinaryExpression(o) || exports.ts.isReturnStatement(o) || exports.ts.isArrowFunction(o)) {
      if (u = _loop2()) {
        return u.v;
      }
    }
    return l.join(".");
  }));
};

var getColocatedFragmentNames = (e, t) => {
  var i = function findAllImports(e) {
    return e.statements.filter(exports.ts.isImportDeclaration);
  }(e);
  var r = t.languageService.getProgram()?.getTypeChecker();
  var s = {};
  if (!r) {
    return s;
  }
  if (i.length) {
    i.forEach((i => {
      if (!i.importClause) {
        return;
      }
      if (i.importClause.name) {
        var a = t.languageService.getDefinitionAtPosition(e.fileName, i.importClause.name.getStart());
        var n = a && a[0];
        if (n) {
          if (n.fileName.includes("node_modules")) {
            return;
          }
          var o = getSource(t, n.fileName);
          if (!o) {
            return;
          }
          var l = getFragmentsInSource(o, r, t).map((e => e.name.value));
          var u = i.moduleSpecifier.getText();
          var p = s[u];
          if (l.length && p) {
            p.fragments = p.fragments.concat(l);
          } else if (l.length && !p) {
            s[u] = p = {
              start: i.moduleSpecifier.getStart(),
              length: i.moduleSpecifier.getText().length,
              fragments: l
            };
          }
        }
      }
      if (i.importClause.namedBindings && exports.ts.isNamespaceImport(i.importClause.namedBindings)) {
        var h = t.languageService.getDefinitionAtPosition(e.fileName, i.importClause.namedBindings.getStart());
        var f = h && h[0];
        if (f) {
          if (f.fileName.includes("node_modules")) {
            return;
          }
          var c = getSource(t, f.fileName);
          if (!c) {
            return;
          }
          var d = getFragmentsInSource(c, r, t).map((e => e.name.value));
          var v = i.moduleSpecifier.getText();
          var g = s[v];
          if (d.length && g) {
            g.fragments = g.fragments.concat(d);
          } else if (d.length && !g) {
            s[v] = g = {
              start: i.moduleSpecifier.getStart(),
              length: i.moduleSpecifier.getText().length,
              fragments: d
            };
          }
        }
      } else if (i.importClause.namedBindings && exports.ts.isNamedImportBindings(i.importClause.namedBindings)) {
        i.importClause.namedBindings.elements.forEach((a => {
          var n = t.languageService.getDefinitionAtPosition(e.fileName, a.getStart());
          var o = n && n[0];
          if (o) {
            if (o.fileName.includes("node_modules")) {
              return;
            }
            var l = getSource(t, o.fileName);
            if (!l) {
              return;
            }
            var u = getFragmentsInSource(l, r, t).map((e => e.name.value));
            var p = i.moduleSpecifier.getText();
            var h = s[p];
            if (u.length && h) {
              h.fragments = h.fragments.concat(u);
            } else if (u.length && !h) {
              s[p] = h = {
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
  return s;
};

function getFragmentsInSource(t, i, r) {
  var s = [];
  var a = findAllCallExpressions(t, r, !1);
  var n = i.getSymbolAtLocation(t);
  if (!n) {
    return [];
  }
  var o = i.getExportsOfModule(n).map((e => e.name));
  a.nodes.filter((e => {
    var t = e.node.parent;
    while (t && !exports.ts.isSourceFile(t) && !exports.ts.isVariableDeclaration(t)) {
      t = t.parent;
    }
    if (exports.ts.isVariableDeclaration(t)) {
      return o.includes(t.name.getText());
    } else {
      return !1;
    }
  })).forEach((i => {
    var a = resolveTemplate(i.node, t.fileName, r).combinedText;
    try {
      var n = e.parse(a, {
        noLocation: !0
      });
      if (n.definitions.every((t => t.kind === e.Kind.FRAGMENT_DEFINITION))) {
        s = s.concat(n.definitions);
      }
    } catch (e) {
      return;
    }
  }));
  return s;
}

var generateHashForDocument = (e, i, r, s) => {
  if (s) {
    var a = [];
    unrollTadaFragments(s, a, e);
    var n = resolveTemplate(i, r, e).combinedText;
    var l = parse(n);
    var u = new Set;
    for (var p of l.definitions) {
      if (p.kind === o && !u.has(p)) {
        stripUnmaskDirectivesFromDefinition(p);
      }
    }
    a.map((e => {
      stripUnmaskDirectivesFromDefinition(e);
      return print(e);
    })).filter(((e, t, i) => i.indexOf(e) === t)).forEach((e => {
      n = `${n}\n\n${e}`;
    }));
    var h = print(parse(n));
    return t.createHash("sha256").update(h).digest("hex");
  } else {
    var f = getSource(e, r);
    var {fragments: c} = findAllCallExpressions(f, e);
    var d = resolveTemplate(i, r, e).combinedText;
    var v = parse(d);
    var g = new Set;
    for (var m of v.definitions) {
      if (m.kind === o && !g.has(m)) {
        stripUnmaskDirectivesFromDefinition(m);
      }
    }
    var x = new Set;
    visit(v, {
      FragmentDefinition: e => {
        c.push(e);
      },
      FragmentSpread: e => {
        x.add(e.name.value);
      }
    });
    var S = d;
    var y = new Set;
    var T = [ ...x ];
    var E;
    while (E = T.shift()) {
      y.add(E);
      var A = c.find((e => e.name.value === E));
      if (!A) {
        e.project.projectService.logger.info(`[GraphQLSP] could not find fragment for spread ${E}!`);
        return;
      }
      stripUnmaskDirectivesFromDefinition(A);
      visit(A, {
        FragmentSpread: e => {
          if (!y.has(e.name.value)) {
            T.push(e.name.value);
          }
        }
      });
      S = `${S}\n\n${print(A)}`;
    }
    return t.createHash("sha256").update(print(parse(S))).digest("hex");
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
  var s = i.languageService.getProgram()?.getTypeChecker();
  var a = null;
  var n = t;
  r.forEach((e => {
    if (a) {
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
    if (exports.ts.isVariableDeclaration(r.parent) && r.parent.initializer && isGraphQLCall(r.parent.initializer, s)) {
      a = r.parent.initializer;
      n = e.fileName;
    }
  }));
  return {
    node: a,
    filename: n
  };
};

var getDocumentReferenceFromDocumentNode = (e, t, i) => {
  if (exports.ts.isIdentifier(e)) {
    var r = i.languageService.getReferencesAtPosition(t, e.getStart());
    if (!r) {
      return {
        node: null,
        filename: t
      };
    }
    var s = i.languageService.getProgram()?.getTypeChecker();
    var a = null;
    var n = t;
    r.forEach((e => {
      if (a) {
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
      if (exports.ts.isVariableDeclaration(r.parent) && r.parent.initializer && isGraphQLCall(r.parent.initializer, s)) {
        a = r.parent.initializer;
        n = e.fileName;
      }
    }));
    return {
      node: a,
      filename: n
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

var $ = new Set([ "populate", "client", "_unmask", "_optional", "_relayPagination", "_simplePagination", "_required", "optional", "required", "arguments", "argumentDefinitions", "connection", "refetchable", "relay", "required", "inline" ]);

var V = 520100;

var j = 520101;

var W = 520102;

var M = 520103;

var U = [ 52001, 52002, 52004, 52003, R, V, j, W, M ];

var B = new LRUCache({
  ttl: 9e5,
  max: 5e3
});

var runDiagnostics = (t, {nodes: i, fragments: r}, s, a) => {
  var n = t.fileName;
  var o = a.config.templateIsCallExpression ?? !0;
  var l = i.map((t => {
    var i = t.node;
    if (!o && (exports.ts.isNoSubstitutionTemplateLiteral(i) || exports.ts.isTemplateExpression(i))) {
      if (exports.ts.isTaggedTemplateExpression(i.parent)) {
        i = i.parent;
      } else {
        return;
      }
    }
    var {combinedText: l, resolvedSpans: u} = resolveTemplate(i, n, a);
    var p = l.split("\n");
    var h = !1;
    if (exports.ts.isAsExpression(i.parent)) {
      if (exports.ts.isExpressionStatement(i.parent.parent)) {
        h = !0;
      }
    } else if (exports.ts.isExpressionStatement(i.parent)) {
      h = !0;
    }
    var f = i.getStart() + (o ? 0 : i.tag.getText().length + (h ? 2 : 0));
    var c = f + i.getText().length;
    var d = [ ...r ];
    if (o) {
      try {
        var v = e.parse(l, {
          noLocation: !0
        }).definitions.filter((t => t.kind === e.Kind.FRAGMENT_DEFINITION));
        d = d.filter((t => !v.some((i => i.kind === e.Kind.FRAGMENT_DEFINITION && i.name.value === t.name.value))));
      } catch (e) {}
    }
    var g = t.schema && s.multi[t.schema] ? s.multi[t.schema]?.schema : s.current?.schema;
    if (!g) {
      return;
    }
    var m = getDiagnostics(l, g, void 0, void 0, d).filter((e => {
      if (!e.message.includes("Unknown directive")) {
        return !0;
      }
      var [t] = e.message.split("(");
      var i = t && /Unknown directive "@([^)]+)"/g.exec(t);
      if (!i) {
        return !0;
      }
      var r = i[1];
      return r && !$.has(r);
    })).map((e => {
      var {start: t, end: i} = e.range;
      var r = f + t.line;
      for (var s = 0; s <= t.line && s < p.length; s++) {
        if (s === t.line) {
          r += t.character;
        } else if (p[s]) {
          r += p[s].length;
        }
      }
      var a = f + i.line;
      for (var n = 0; n <= i.line && n < p.length; n++) {
        if (n === i.line) {
          a += i.character;
        } else if (p[n]) {
          a += p[n].length;
        }
      }
      var o = u.find((e => r >= e.new.start && a <= e.new.start + e.new.length));
      if (o) {
        return {
          ...e,
          start: o.original.start,
          length: o.original.length
        };
      } else if (r > c) {
        var l = u.filter((e => e.new.start + e.new.length < r)).reduce(((e, t) => e + (t.new.length - t.original.length)), 0);
        r -= l;
        a -= l;
        return {
          ...e,
          start: r + 1,
          length: a - r
        };
      } else {
        return {
          ...e,
          start: r + 1,
          length: a - r
        };
      }
    })).filter((e => e.start + e.length <= c));
    try {
      var x = e.parse(l, {
        noLocation: !0
      });
      if (x.definitions.some((t => t.kind === e.Kind.OPERATION_DEFINITION))) {
        if (!x.definitions.find((t => t.kind === e.Kind.OPERATION_DEFINITION)).name) {
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
    category: 2 === e.severity ? exports.ts.DiagnosticCategory.Warning : exports.ts.DiagnosticCategory.Error,
    code: "number" == typeof e.code ? e.code : 2 === e.severity ? 52004 : 52001,
    messageText: e.message.split("\n")[0]
  })));
  if (o) {
    var p = ((t, i, r) => {
      var s = [];
      if (!(r.config.trackFieldUsage ?? 1)) {
        return s;
      }
      var a = new Set([ "id", "_id", "__typename", ...r.config.reservedKeys ?? [] ]);
      var n = r.languageService.getProgram()?.getTypeChecker();
      if (!n) {
        return;
      }
      try {
        i.forEach((i => {
          var o = i.getText();
          if (o.includes("mutation") || o.includes("subscription")) {
            return;
          }
          var l = getVariableDeclaration(i);
          if (!l) {
            return;
          }
          var u;
          var p = n.getTypeAtLocation(i.parent);
          if ("target" in p) {
            var h = p.resolvedTypeArguments;
            u = h && h.length > 1 ? h[0] : void 0;
          }
          if (!u) {
            var f = p.getProperty("__apiType");
            if (f) {
              var c = n.getTypeOfSymbol(f);
              var d = p.getCallSignatures()[0];
              if (c.isUnionOrIntersection()) {
                for (var v of c.types) {
                  if (d = v.getCallSignatures()[0]) {
                    u = d.getReturnType();
                    break;
                  }
                }
              }
              u = d && d.getReturnType();
            }
          }
          var g = r.languageService.getReferencesAtPosition(t.fileName, l.name.getStart());
          if (!g) {
            return;
          }
          var m = [];
          var x = [];
          var S = [];
          var y = new Map;
          e.visit(e.parse(i.getText().slice(1, -1)), {
            Field: {
              enter(e) {
                var t = e.alias ? e.alias.value : e.name.value;
                var i = x.length ? `${x.join(".")}.${t}` : t;
                if (!e.selectionSet && !a.has(e.name.value)) {
                  S.push(i);
                  y.set(i, {
                    start: e.name.loc.start,
                    length: e.name.loc.end - e.name.loc.start
                  });
                } else if (e.selectionSet) {
                  x.push(t);
                  y.set(i, {
                    start: e.name.loc.start,
                    length: e.name.loc.end - e.name.loc.start
                  });
                }
              },
              leave(e) {
                if (e.selectionSet) {
                  x.pop();
                }
              }
            }
          });
          g.forEach((e => {
            if (e.fileName !== t.fileName) {
              return;
            }
            var i = findNode(t, e.textSpan.start);
            if (!i) {
              return;
            }
            if (i.parent === l) {
              return;
            }
            var s = n.getSymbolsInScope(i, exports.ts.SymbolFlags.BlockScopedVariable);
            var a;
            for (var o of s) {
              if (!o.valueDeclaration) {
                continue;
              }
              var p = unwrapAbstractType(n.getTypeOfSymbol(o));
              if (u === p) {
                a = o;
                break;
              }
              if (p.flags & exports.ts.TypeFlags.Object) {
                var h = p.getProperty("0");
                if (h) {
                  p = n.getTypeOfSymbol(h);
                  if (u === p) {
                    a = o;
                    break;
                  }
                }
                var f = p.getProperty("data");
                if (f) {
                  p = unwrapAbstractType(n.getTypeOfSymbol(f));
                  if (u === p) {
                    a = o;
                    break;
                  }
                }
              }
            }
            var c = a?.valueDeclaration;
            var d;
            if (c && "name" in c && c.name && (exports.ts.isIdentifier(c.name) || exports.ts.isBindingName(c.name))) {
              d = c.name;
            } else {
              var v = getVariableDeclaration(i);
              if (v) {
                d = v.name;
              }
            }
            if (d) {
              var g = crawlScope(d, [], S, t, r, !1);
              m.push(...g);
            }
          }));
          if (!m.length) {
            return;
          }
          var T = S.filter((e => !m.includes(e)));
          var E = new Set;
          var A = {};
          var b = new Set;
          T.forEach((e => {
            var t = e.split(".");
            t.pop();
            var i = t.join(".");
            if (y.get(i)) {
              E.add(i);
              if (A[i]) {
                A[i].add(e);
              } else {
                A[i] = new Set([ e ]);
              }
            } else {
              b.add(e);
            }
          }));
          E.forEach((e => {
            var r = y.get(e);
            var a = A[e];
            s.push({
              file: t,
              length: r.length,
              start: i.getStart() + r.start + 1,
              category: exports.ts.DiagnosticCategory.Warning,
              code: R,
              messageText: `Field(s) ${[ ...a ].map((e => `'${e}'`)).join(", ")} are not used.`
            });
          }));
          b.forEach((e => {
            var r = y.get(e);
            s.push({
              file: t,
              length: r.length,
              start: i.getStart() + r.start + 1,
              category: exports.ts.DiagnosticCategory.Warning,
              code: R,
              messageText: `Field ${e} is not used.`
            });
          }));
        }));
      } catch (e) {
        console.error("[GraphQLSP]: ", e.message, e.stack);
      }
      return s;
    })(t, i.map((e => e.node)), a) || [];
    if (!p) {
      return u;
    }
    return [ ...u, ...p ];
  } else {
    return u;
  }
};

exports.ALL_DIAGNOSTICS = U;

exports.CharacterStream = CharacterStream;

exports.bubbleUpCallExpression = function bubbleUpCallExpression(e) {
  while (exports.ts.isStringLiteralLike(e) || exports.ts.isToken(e) || exports.ts.isTemplateExpression(e) || exports.ts.isTemplateSpan(e)) {
    e = e.parent;
  }
  return e;
};

exports.bubbleUpTemplate = function bubbleUpTemplate(e) {
  while (exports.ts.isNoSubstitutionTemplateLiteral(e) || exports.ts.isToken(e) || exports.ts.isTemplateExpression(e) || exports.ts.isTemplateSpan(e)) {
    e = e.parent;
  }
  return e;
};

exports.findAllCallExpressions = findAllCallExpressions;

exports.findAllPersistedCallExpressions = findAllPersistedCallExpressions;

exports.findNode = findNode;

exports.getAllFragments = getAllFragments;

exports.getDocumentReferenceFromDocumentNode = getDocumentReferenceFromDocumentNode;

exports.getDocumentReferenceFromTypeQuery = getDocumentReferenceFromTypeQuery;

exports.getGraphQLDiagnostics = function getGraphQLDiagnostics(t, i, r) {
  var s = r.config.templateIsCallExpression ?? !0;
  var a = getSource(r, t);
  if (!a) {
    return;
  }
  var n, o = [];
  if (s) {
    var l = findAllCallExpressions(a, r);
    o = l.fragments;
    n = l.nodes;
  } else {
    n = function findAllTaggedTemplateNodes(e) {
      var t = [];
      !function find(e) {
        if (isGraphQLTag(e) || exports.ts.isNoSubstitutionTemplateLiteral(e) && isGraphQLTag(e.parent)) {
          t.push(e);
          return;
        } else {
          exports.ts.forEachChild(e, find);
        }
      }(e);
      return t;
    }(a).map((e => ({
      node: e,
      schema: null
    })));
  }
  var u = n.map((({node: e}) => {
    if ((exports.ts.isNoSubstitutionTemplateLiteral(e) || exports.ts.isTemplateExpression(e)) && !s) {
      if (exports.ts.isTaggedTemplateExpression(e.parent)) {
        e = e.parent;
      } else {
        return;
      }
    }
    return resolveTemplate(e, t, r).combinedText;
  }));
  var p = O(s ? a.getText() + o.map((e => print(e))).join("-") + i.version : u.join("-") + i.version);
  var h;
  if (B.has(p)) {
    h = B.get(p);
  } else {
    h = runDiagnostics(a, {
      nodes: n,
      fragments: o
    }, i, r);
    B.set(p, h);
  }
  var f = r.config.shouldCheckForColocatedFragments ?? !0;
  var c = [];
  if (s) {
    var d = findAllPersistedCallExpressions(a, r).map((e => {
      var {node: i} = e;
      if (!i.typeArguments && !i.arguments[1]) {
        return {
          category: exports.ts.DiagnosticCategory.Warning,
          code: V,
          file: a,
          messageText: "Missing generic pointing at the GraphQL document.",
          start: i.getStart(),
          length: i.getEnd() - i.getStart()
        };
      }
      var s, n, o, l, u = t;
      var p = i.typeArguments && i.typeArguments[0];
      if (p) {
        o = p.getStart();
        l = p.getEnd() - p.getStart();
        if (!exports.ts.isTypeQueryNode(p)) {
          return {
            category: exports.ts.DiagnosticCategory.Warning,
            code: V,
            file: a,
            messageText: "Provided generic should be a typeQueryNode in the shape of graphql.persisted<typeof document>.",
            start: o,
            length: l
          };
        }
        var {node: h, filename: f} = getDocumentReferenceFromTypeQuery(p, t, r);
        s = h;
        u = f;
        n = p.getText();
      } else if (i.arguments[1]) {
        o = i.arguments[1].getStart();
        l = i.arguments[1].getEnd() - i.arguments[1].getStart();
        if (!exports.ts.isIdentifier(i.arguments[1]) && !exports.ts.isCallExpression(i.arguments[1])) {
          return {
            category: exports.ts.DiagnosticCategory.Warning,
            code: V,
            file: a,
            messageText: 'Provided argument should be an identifier or invocation of "graphql" in the shape of graphql.persisted(hash, document).',
            start: o,
            length: l
          };
        }
        var {node: c, filename: d} = getDocumentReferenceFromDocumentNode(i.arguments[1], t, r);
        s = c;
        u = d;
        n = i.arguments[1].getText();
      }
      if (!s) {
        return {
          category: exports.ts.DiagnosticCategory.Warning,
          code: W,
          file: a,
          messageText: `Can't find reference to "${n}".`,
          start: o,
          length: l
        };
      }
      var v = s;
      if (!(v && exports.ts.isCallExpression(v) && v.arguments[0] && exports.ts.isStringLiteralLike(v.arguments[0]))) {
        return {
          category: exports.ts.DiagnosticCategory.Warning,
          code: W,
          file: a,
          messageText: `Referenced type "${n}" is not a GraphQL document.`,
          start: o,
          length: l
        };
      }
      if (!i.arguments[0]) {
        return {
          category: exports.ts.DiagnosticCategory.Warning,
          code: j,
          file: a,
          messageText: "The call-expression is missing a hash for the persisted argument.",
          start: i.arguments.pos,
          length: i.arguments.end - i.arguments.pos
        };
      }
      var g = i.arguments[0].getText().slice(1, -1);
      if (g.startsWith("sha256:")) {
        var m = generateHashForDocument(r, v.arguments[0], u, v.arguments[1] && exports.ts.isArrayLiteralExpression(v.arguments[1]) ? v.arguments[1] : void 0);
        if (!m) {
          return null;
        }
        if (`sha256:${m}` !== g) {
          return {
            category: exports.ts.DiagnosticCategory.Warning,
            code: M,
            file: a,
            messageText: "The persisted document's hash is outdated",
            start: i.arguments.pos,
            length: i.arguments.end - i.arguments.pos
          };
        }
      }
      return null;
    })).filter(Boolean);
    h.push(...d);
  }
  if (s && f) {
    var v = getColocatedFragmentNames(a, r);
    var g = new Set;
    n.forEach((({node: t}) => {
      try {
        var i = e.parse(t.getText().slice(1, -1), {
          noLocation: !0
        });
        e.visit(i, {
          FragmentSpread: e => {
            g.add(e.name.value);
          }
        });
      } catch (e) {}
    }));
    Object.keys(v).forEach((e => {
      var {fragments: t, start: i, length: r} = v[e];
      var s = Array.from(new Set(t.filter((e => !g.has(e)))));
      if (s.length) {
        c.push({
          file: a,
          length: r,
          start: i,
          category: exports.ts.DiagnosticCategory.Warning,
          code: 52003,
          messageText: `Unused co-located fragment definition(s) "${s.join(", ")}" in ${e}`
        });
      }
    }));
    return [ ...h, ...c ];
  } else {
    return h;
  }
};

exports.getPersistedCodeFixAtPosition = function getPersistedCodeFixAtPosition(e, t, i) {
  var r = i.config.templateIsCallExpression ?? !0;
  var s = i.languageService.getProgram()?.getTypeChecker();
  if (!r) {
    return;
  }
  var a = getSource(i, e);
  if (!a) {
    return;
  }
  var n = findNode(a, t);
  if (!n) {
    return;
  }
  var o = n;
  if (exports.ts.isVariableStatement(o)) {
    o = o.declarationList.declarations.find((e => exports.ts.isVariableDeclaration(e) && e.initializer && exports.ts.isCallExpression(e.initializer))) || n;
  } else if (exports.ts.isVariableDeclarationList(o)) {
    o = o.declarations.find((e => exports.ts.isVariableDeclaration(e) && e.initializer && exports.ts.isCallExpression(e.initializer))) || n;
  } else if (exports.ts.isVariableDeclaration(o) && o.initializer && exports.ts.isCallExpression(o.initializer)) {
    o = o.initializer;
  } else {
    while (o && !exports.ts.isCallExpression(o)) {
      o = o.parent;
    }
  }
  if (!isTadaPersistedCall(o, s)) {
    return;
  }
  var l, u = e;
  if (o.typeArguments) {
    var [p] = o.typeArguments;
    if (!p || !exports.ts.isTypeQueryNode(p)) {
      return;
    }
    var {node: h, filename: f} = getDocumentReferenceFromTypeQuery(p, e, i);
    l = h;
    u = f;
  } else if (o.arguments[1]) {
    if (!exports.ts.isIdentifier(o.arguments[1]) && !exports.ts.isCallExpression(o.arguments[1])) {
      return;
    }
    var {node: c, filename: d} = getDocumentReferenceFromDocumentNode(o.arguments[1], e, i);
    l = c;
    u = d;
  }
  if (!l) {
    return;
  }
  var v = l;
  if (!(v && exports.ts.isCallExpression(v) && v.arguments[0] && exports.ts.isStringLiteralLike(v.arguments[0]))) {
    return;
  }
  var g = generateHashForDocument(i, v.arguments[0], u, v.arguments[1] && exports.ts.isArrayLiteralExpression(v.arguments[1]) ? v.arguments[1] : void 0);
  var m = o.arguments[0];
  if (!m) {
    return {
      span: {
        start: o.arguments.pos,
        length: 1
      },
      replacement: `"sha256:${g}")`
    };
  } else if (exports.ts.isStringLiteral(m) && m.getText() !== `"sha256:${g}"`) {
    return {
      span: {
        start: m.getStart(),
        length: m.end - m.getStart()
      },
      replacement: `"sha256:${g}"`
    };
  } else if (exports.ts.isIdentifier(m)) {
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
};

exports.getSchemaName = getSchemaName;

exports.getSource = getSource;

exports.init = function init(e) {
  exports.ts = e.typescript;
};

exports.isGraphQLCall = isGraphQLCall;

exports.isGraphQLTag = isGraphQLTag;

exports.onlineParser = onlineParser;

exports.print = print;

exports.resolveTemplate = resolveTemplate;

exports.templates = w;

exports.unrollTadaFragments = unrollTadaFragments;
//# sourceMappingURL=api-chunk.js.map
