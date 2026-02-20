import { C as e, o as t, t as n, g as r, f as i, b as a, a as o, i as s, c as u, d as c, p as l, e as d, r as f, h as v, j as p, A as g, k as m, l as E } from "./chunks/api-chunk.mjs";

import h from "node:fs/promises";

import T from "path";

import { loadRef as y, resolveTypeScriptRootDir as I, minifyIntrospection as b, outputIntrospectionFile as S } from "@gql.tada/internal";

import { SchemaMetaFieldDef as _, TypeMetaFieldDef as D, TypeNameMetaFieldDef as N, isCompositeType as A, Kind as k, isScalarType as F, isObjectType as C, isInterfaceType as L, isUnionType as O, isEnumType as x, isInputObjectType as M, getNamedType as P, isOutputType as w, isInputType as R, GraphQLEnumType as j, GraphQLBoolean as U, isAbstractType as V, assertAbstractType as Y, doTypesOverlap as $, DirectiveLocation as B, visit as G, parse as Q, BREAK as X, isListType as W, isNonNullType as J, GraphQLInterfaceType as K, GraphQLObjectType as z, GraphQLInputObjectType as H, getNullableType as q, GraphQLList as Z, GraphQLNonNull as ee } from "graphql";

var statFile = (e, t) => h.stat(e).then(t).catch((() => !1));

var swapWrite = async (e, t) => {
  if (!await statFile(e, (e => e.isFile()))) {
    await h.writeFile(e, t);
  } else {
    var n = e + ".tmp";
    await h.writeFile(n, t);
    try {
      await h.rename(n, e);
    } catch (e) {
      await h.unlink(n);
      throw e;
    } finally {
      await (async e => {
        try {
          var t = new Date;
          await h.utimes(e, t, t);
        } catch (e) {}
      })(e);
    }
  }
};

async function saveTadaIntrospection(e, t, n, r) {
  var i = b(e);
  var a = S(i, {
    fileType: t,
    shouldPreprocess: !n
  });
  var o = t;
  if (await statFile(o, (e => e.isDirectory()))) {
    o = T.join(o, "introspection.d.ts");
  } else if (!await statFile(T.dirname(o), (e => e.isDirectory()))) {
    r(`Output file is not inside a directory @ ${o}`);
    return;
  }
  try {
    await swapWrite(o, a);
    r(`Introspection saved to path @ ${o}`);
  } catch (e) {
    r(`Failed to write introspection @ ${e}`);
  }
}

function getDefinitionState(e) {
  var t;
  forEachState(e, (e => {
    switch (e.kind) {
     case "Query":
     case "ShortQuery":
     case "Mutation":
     case "Subscription":
     case "FragmentDefinition":
      t = e;
    }
  }));
  return t;
}

function getFieldDef(e, t, n) {
  if (n === _.name && e.getQueryType() === t) {
    return _;
  }
  if (n === D.name && e.getQueryType() === t) {
    return D;
  }
  if (n === N.name && A(t)) {
    return N;
  }
  if ("getFields" in t) {
    return t.getFields()[n];
  }
  return null;
}

function forEachState(e, t) {
  var n = [];
  var r = e;
  while (null == r ? void 0 : r.kind) {
    n.push(r);
    r = r.prevState;
  }
  for (var i = n.length - 1; i >= 0; i--) {
    t(n[i]);
  }
}

function objectValues(e) {
  var t = Object.keys(e);
  var n = t.length;
  var r = new Array(n);
  for (var i = 0; i < n; ++i) {
    r[i] = e[t[i]];
  }
  return r;
}

function hintList$1(e, t) {
  return function filterAndSortList$1(e, t) {
    if (!t) {
      return filterNonEmpty$1(e, (e => !e.isDeprecated));
    }
    var n = e.map((e => ({
      proximity: getProximity$1(normalizeText$1(e.label), t),
      entry: e
    })));
    return filterNonEmpty$1(filterNonEmpty$1(n, (e => e.proximity <= 2)), (e => !e.entry.isDeprecated)).sort(((e, t) => (e.entry.isDeprecated ? 1 : 0) - (t.entry.isDeprecated ? 1 : 0) || e.proximity - t.proximity || e.entry.label.length - t.entry.label.length)).map((e => e.entry));
  }(t, normalizeText$1(e.string));
}

function filterNonEmpty$1(e, t) {
  var n = e.filter(t);
  return 0 === n.length ? e : n;
}

function normalizeText$1(e) {
  return e.toLowerCase().replaceAll(/\W/g, "");
}

function getProximity$1(e, t) {
  var n = function lexicalDistance$1(e, t) {
    var n;
    var r;
    var i = [];
    var a = e.length;
    var o = t.length;
    for (n = 0; n <= a; n++) {
      i[n] = [ n ];
    }
    for (r = 1; r <= o; r++) {
      i[0][r] = r;
    }
    for (n = 1; n <= a; n++) {
      for (r = 1; r <= o; r++) {
        var s = e[n - 1] === t[r - 1] ? 0 : 1;
        i[n][r] = Math.min(i[n - 1][r] + 1, i[n][r - 1] + 1, i[n - 1][r - 1] + s);
        if (n > 1 && r > 1 && e[n - 1] === t[r - 2] && e[n - 2] === t[r - 1]) {
          i[n][r] = Math.min(i[n][r], i[n - 2][r - 2] + s);
        }
      }
    }
    return i[a][o];
  }(t, e);
  if (e.length > t.length) {
    n -= e.length - t.length - 1;
    n += 0 === e.indexOf(t) ? 0 : .5;
  }
  return n;
}

var te;

!function(e) {
  e.is = function is(e) {
    return "string" == typeof e;
  };
}(te || (te = {}));

var ne;

!function(e) {
  e.is = function is(e) {
    return "string" == typeof e;
  };
}(ne || (ne = {}));

var re;

!function(e) {
  e.MIN_VALUE = -2147483648;
  e.MAX_VALUE = 2147483647;
  e.is = function is(t) {
    return "number" == typeof t && e.MIN_VALUE <= t && t <= e.MAX_VALUE;
  };
}(re || (re = {}));

var ie;

!function(e) {
  e.MIN_VALUE = 0;
  e.MAX_VALUE = 2147483647;
  e.is = function is(t) {
    return "number" == typeof t && e.MIN_VALUE <= t && t <= e.MAX_VALUE;
  };
}(ie || (ie = {}));

var ae;

!function(e) {
  e.create = function create(e, t) {
    if (e === Number.MAX_VALUE) {
      e = ie.MAX_VALUE;
    }
    if (t === Number.MAX_VALUE) {
      t = ie.MAX_VALUE;
    }
    return {
      line: e,
      character: t
    };
  };
  e.is = function is(e) {
    var t = e;
    return St.objectLiteral(t) && St.uinteger(t.line) && St.uinteger(t.character);
  };
}(ae || (ae = {}));

var oe;

!function(e) {
  e.create = function create(e, t, n, r) {
    if (St.uinteger(e) && St.uinteger(t) && St.uinteger(n) && St.uinteger(r)) {
      return {
        start: ae.create(e, t),
        end: ae.create(n, r)
      };
    } else if (ae.is(e) && ae.is(t)) {
      return {
        start: e,
        end: t
      };
    } else {
      throw new Error("Range#create called with invalid arguments[".concat(e, ", ").concat(t, ", ").concat(n, ", ").concat(r, "]"));
    }
  };
  e.is = function is(e) {
    var t = e;
    return St.objectLiteral(t) && ae.is(t.start) && ae.is(t.end);
  };
}(oe || (oe = {}));

var se;

!function(e) {
  e.create = function create(e, t) {
    return {
      uri: e,
      range: t
    };
  };
  e.is = function is(e) {
    var t = e;
    return St.objectLiteral(t) && oe.is(t.range) && (St.string(t.uri) || St.undefined(t.uri));
  };
}(se || (se = {}));

var ue;

!function(e) {
  e.create = function create(e, t, n, r) {
    return {
      targetUri: e,
      targetRange: t,
      targetSelectionRange: n,
      originSelectionRange: r
    };
  };
  e.is = function is(e) {
    var t = e;
    return St.objectLiteral(t) && oe.is(t.targetRange) && St.string(t.targetUri) && oe.is(t.targetSelectionRange) && (oe.is(t.originSelectionRange) || St.undefined(t.originSelectionRange));
  };
}(ue || (ue = {}));

var ce;

!function(e) {
  e.create = function create(e, t, n, r) {
    return {
      red: e,
      green: t,
      blue: n,
      alpha: r
    };
  };
  e.is = function is(e) {
    var t = e;
    return St.objectLiteral(t) && St.numberRange(t.red, 0, 1) && St.numberRange(t.green, 0, 1) && St.numberRange(t.blue, 0, 1) && St.numberRange(t.alpha, 0, 1);
  };
}(ce || (ce = {}));

var le;

!function(e) {
  e.create = function create(e, t) {
    return {
      range: e,
      color: t
    };
  };
  e.is = function is(e) {
    var t = e;
    return St.objectLiteral(t) && oe.is(t.range) && ce.is(t.color);
  };
}(le || (le = {}));

var de;

!function(e) {
  e.create = function create(e, t, n) {
    return {
      label: e,
      textEdit: t,
      additionalTextEdits: n
    };
  };
  e.is = function is(e) {
    var t = e;
    return St.objectLiteral(t) && St.string(t.label) && (St.undefined(t.textEdit) || ye.is(t)) && (St.undefined(t.additionalTextEdits) || St.typedArray(t.additionalTextEdits, ye.is));
  };
}(de || (de = {}));

var fe;

!function(e) {
  e.Comment = "comment";
  e.Imports = "imports";
  e.Region = "region";
}(fe || (fe = {}));

var ve;

!function(e) {
  e.create = function create(e, t, n, r, i, a) {
    var o = {
      startLine: e,
      endLine: t
    };
    if (St.defined(n)) {
      o.startCharacter = n;
    }
    if (St.defined(r)) {
      o.endCharacter = r;
    }
    if (St.defined(i)) {
      o.kind = i;
    }
    if (St.defined(a)) {
      o.collapsedText = a;
    }
    return o;
  };
  e.is = function is(e) {
    var t = e;
    return St.objectLiteral(t) && St.uinteger(t.startLine) && St.uinteger(t.startLine) && (St.undefined(t.startCharacter) || St.uinteger(t.startCharacter)) && (St.undefined(t.endCharacter) || St.uinteger(t.endCharacter)) && (St.undefined(t.kind) || St.string(t.kind));
  };
}(ve || (ve = {}));

var pe;

!function(e) {
  e.create = function create(e, t) {
    return {
      location: e,
      message: t
    };
  };
  e.is = function is(e) {
    var t = e;
    return St.defined(t) && se.is(t.location) && St.string(t.message);
  };
}(pe || (pe = {}));

var ge;

!function(e) {
  e.Error = 1;
  e.Warning = 2;
  e.Information = 3;
  e.Hint = 4;
}(ge || (ge = {}));

var me;

!function(e) {
  e.Unnecessary = 1;
  e.Deprecated = 2;
}(me || (me = {}));

var Ee;

!function(e) {
  e.is = function is(e) {
    var t = e;
    return St.objectLiteral(t) && St.string(t.href);
  };
}(Ee || (Ee = {}));

var he;

!function(e) {
  e.create = function create(e, t, n, r, i, a) {
    var o = {
      range: e,
      message: t
    };
    if (St.defined(n)) {
      o.severity = n;
    }
    if (St.defined(r)) {
      o.code = r;
    }
    if (St.defined(i)) {
      o.source = i;
    }
    if (St.defined(a)) {
      o.relatedInformation = a;
    }
    return o;
  };
  e.is = function is(e) {
    var t;
    var n = e;
    return St.defined(n) && oe.is(n.range) && St.string(n.message) && (St.number(n.severity) || St.undefined(n.severity)) && (St.integer(n.code) || St.string(n.code) || St.undefined(n.code)) && (St.undefined(n.codeDescription) || St.string(null === (t = n.codeDescription) || void 0 === t ? void 0 : t.href)) && (St.string(n.source) || St.undefined(n.source)) && (St.undefined(n.relatedInformation) || St.typedArray(n.relatedInformation, pe.is));
  };
}(he || (he = {}));

var Te;

!function(e) {
  e.create = function create(e, t) {
    var n = [];
    for (var r = 2; r < arguments.length; r++) {
      n[r - 2] = arguments[r];
    }
    var i = {
      title: e,
      command: t
    };
    if (St.defined(n) && n.length > 0) {
      i.arguments = n;
    }
    return i;
  };
  e.is = function is(e) {
    var t = e;
    return St.defined(t) && St.string(t.title) && St.string(t.command);
  };
}(Te || (Te = {}));

var ye;

!function(e) {
  e.replace = function replace(e, t) {
    return {
      range: e,
      newText: t
    };
  };
  e.insert = function insert(e, t) {
    return {
      range: {
        start: e,
        end: e
      },
      newText: t
    };
  };
  e.del = function del(e) {
    return {
      range: e,
      newText: ""
    };
  };
  e.is = function is(e) {
    var t = e;
    return St.objectLiteral(t) && St.string(t.newText) && oe.is(t.range);
  };
}(ye || (ye = {}));

var Ie;

!function(e) {
  e.create = function create(e, t, n) {
    var r = {
      label: e
    };
    if (void 0 !== t) {
      r.needsConfirmation = t;
    }
    if (void 0 !== n) {
      r.description = n;
    }
    return r;
  };
  e.is = function is(e) {
    var t = e;
    return St.objectLiteral(t) && St.string(t.label) && (St.boolean(t.needsConfirmation) || void 0 === t.needsConfirmation) && (St.string(t.description) || void 0 === t.description);
  };
}(Ie || (Ie = {}));

var be;

!function(e) {
  e.is = function is(e) {
    return St.string(e);
  };
}(be || (be = {}));

var Se;

!function(e) {
  e.replace = function replace(e, t, n) {
    return {
      range: e,
      newText: t,
      annotationId: n
    };
  };
  e.insert = function insert(e, t, n) {
    return {
      range: {
        start: e,
        end: e
      },
      newText: t,
      annotationId: n
    };
  };
  e.del = function del(e, t) {
    return {
      range: e,
      newText: "",
      annotationId: t
    };
  };
  e.is = function is(e) {
    var t = e;
    return ye.is(t) && (Ie.is(t.annotationId) || be.is(t.annotationId));
  };
}(Se || (Se = {}));

var _e;

!function(e) {
  e.create = function create(e, t) {
    return {
      textDocument: e,
      edits: t
    };
  };
  e.is = function is(e) {
    var t = e;
    return St.defined(t) && xe.is(t.textDocument) && Array.isArray(t.edits);
  };
}(_e || (_e = {}));

var De;

!function(e) {
  e.create = function create(e, t, n) {
    var r = {
      kind: "create",
      uri: e
    };
    if (void 0 !== t && (void 0 !== t.overwrite || void 0 !== t.ignoreIfExists)) {
      r.options = t;
    }
    if (void 0 !== n) {
      r.annotationId = n;
    }
    return r;
  };
  e.is = function is(e) {
    var t = e;
    return t && "create" === t.kind && St.string(t.uri) && (void 0 === t.options || (void 0 === t.options.overwrite || St.boolean(t.options.overwrite)) && (void 0 === t.options.ignoreIfExists || St.boolean(t.options.ignoreIfExists))) && (void 0 === t.annotationId || be.is(t.annotationId));
  };
}(De || (De = {}));

var Ne;

!function(e) {
  e.create = function create(e, t, n, r) {
    var i = {
      kind: "rename",
      oldUri: e,
      newUri: t
    };
    if (void 0 !== n && (void 0 !== n.overwrite || void 0 !== n.ignoreIfExists)) {
      i.options = n;
    }
    if (void 0 !== r) {
      i.annotationId = r;
    }
    return i;
  };
  e.is = function is(e) {
    var t = e;
    return t && "rename" === t.kind && St.string(t.oldUri) && St.string(t.newUri) && (void 0 === t.options || (void 0 === t.options.overwrite || St.boolean(t.options.overwrite)) && (void 0 === t.options.ignoreIfExists || St.boolean(t.options.ignoreIfExists))) && (void 0 === t.annotationId || be.is(t.annotationId));
  };
}(Ne || (Ne = {}));

var Ae;

!function(e) {
  e.create = function create(e, t, n) {
    var r = {
      kind: "delete",
      uri: e
    };
    if (void 0 !== t && (void 0 !== t.recursive || void 0 !== t.ignoreIfNotExists)) {
      r.options = t;
    }
    if (void 0 !== n) {
      r.annotationId = n;
    }
    return r;
  };
  e.is = function is(e) {
    var t = e;
    return t && "delete" === t.kind && St.string(t.uri) && (void 0 === t.options || (void 0 === t.options.recursive || St.boolean(t.options.recursive)) && (void 0 === t.options.ignoreIfNotExists || St.boolean(t.options.ignoreIfNotExists))) && (void 0 === t.annotationId || be.is(t.annotationId));
  };
}(Ae || (Ae = {}));

var ke;

!function(e) {
  e.is = function is(e) {
    return e && (void 0 !== e.changes || void 0 !== e.documentChanges) && (void 0 === e.documentChanges || e.documentChanges.every((function(e) {
      if (St.string(e.kind)) {
        return De.is(e) || Ne.is(e) || Ae.is(e);
      } else {
        return _e.is(e);
      }
    })));
  };
}(ke || (ke = {}));

var Fe = function() {
  function TextEditChangeImpl(e, t) {
    this.edits = e;
    this.changeAnnotations = t;
  }
  TextEditChangeImpl.prototype.insert = function(e, t, n) {
    var r;
    var i;
    if (void 0 === n) {
      r = ye.insert(e, t);
    } else if (be.is(n)) {
      i = n;
      r = Se.insert(e, t, n);
    } else {
      this.assertChangeAnnotations(this.changeAnnotations);
      i = this.changeAnnotations.manage(n);
      r = Se.insert(e, t, i);
    }
    this.edits.push(r);
    if (void 0 !== i) {
      return i;
    }
  };
  TextEditChangeImpl.prototype.replace = function(e, t, n) {
    var r;
    var i;
    if (void 0 === n) {
      r = ye.replace(e, t);
    } else if (be.is(n)) {
      i = n;
      r = Se.replace(e, t, n);
    } else {
      this.assertChangeAnnotations(this.changeAnnotations);
      i = this.changeAnnotations.manage(n);
      r = Se.replace(e, t, i);
    }
    this.edits.push(r);
    if (void 0 !== i) {
      return i;
    }
  };
  TextEditChangeImpl.prototype.delete = function(e, t) {
    var n;
    var r;
    if (void 0 === t) {
      n = ye.del(e);
    } else if (be.is(t)) {
      r = t;
      n = Se.del(e, t);
    } else {
      this.assertChangeAnnotations(this.changeAnnotations);
      r = this.changeAnnotations.manage(t);
      n = Se.del(e, r);
    }
    this.edits.push(n);
    if (void 0 !== r) {
      return r;
    }
  };
  TextEditChangeImpl.prototype.add = function(e) {
    this.edits.push(e);
  };
  TextEditChangeImpl.prototype.all = function() {
    return this.edits;
  };
  TextEditChangeImpl.prototype.clear = function() {
    this.edits.splice(0, this.edits.length);
  };
  TextEditChangeImpl.prototype.assertChangeAnnotations = function(e) {
    if (void 0 === e) {
      throw new Error("Text edit change is not configured to manage change annotations.");
    }
  };
  return TextEditChangeImpl;
}();

var Ce = function() {
  function ChangeAnnotations(e) {
    this._annotations = void 0 === e ? Object.create(null) : e;
    this._counter = 0;
    this._size = 0;
  }
  ChangeAnnotations.prototype.all = function() {
    return this._annotations;
  };
  Object.defineProperty(ChangeAnnotations.prototype, "size", {
    get: function() {
      return this._size;
    },
    enumerable: !1,
    configurable: !0
  });
  ChangeAnnotations.prototype.manage = function(e, t) {
    var n;
    if (be.is(e)) {
      n = e;
    } else {
      n = this.nextId();
      t = e;
    }
    if (void 0 !== this._annotations[n]) {
      throw new Error("Id ".concat(n, " is already in use."));
    }
    if (void 0 === t) {
      throw new Error("No annotation provided for id ".concat(n));
    }
    this._annotations[n] = t;
    this._size++;
    return n;
  };
  ChangeAnnotations.prototype.nextId = function() {
    this._counter++;
    return this._counter.toString();
  };
  return ChangeAnnotations;
}();

!function() {
  function WorkspaceChange(e) {
    var t = this;
    this._textEditChanges = Object.create(null);
    if (void 0 !== e) {
      this._workspaceEdit = e;
      if (e.documentChanges) {
        this._changeAnnotations = new Ce(e.changeAnnotations);
        e.changeAnnotations = this._changeAnnotations.all();
        e.documentChanges.forEach((function(e) {
          if (_e.is(e)) {
            var n = new Fe(e.edits, t._changeAnnotations);
            t._textEditChanges[e.textDocument.uri] = n;
          }
        }));
      } else if (e.changes) {
        Object.keys(e.changes).forEach((function(n) {
          var r = new Fe(e.changes[n]);
          t._textEditChanges[n] = r;
        }));
      }
    } else {
      this._workspaceEdit = {};
    }
  }
  Object.defineProperty(WorkspaceChange.prototype, "edit", {
    get: function() {
      this.initDocumentChanges();
      if (void 0 !== this._changeAnnotations) {
        if (0 === this._changeAnnotations.size) {
          this._workspaceEdit.changeAnnotations = void 0;
        } else {
          this._workspaceEdit.changeAnnotations = this._changeAnnotations.all();
        }
      }
      return this._workspaceEdit;
    },
    enumerable: !1,
    configurable: !0
  });
  WorkspaceChange.prototype.getTextEditChange = function(e) {
    if (xe.is(e)) {
      this.initDocumentChanges();
      if (void 0 === this._workspaceEdit.documentChanges) {
        throw new Error("Workspace edit is not configured for document changes.");
      }
      var t = {
        uri: e.uri,
        version: e.version
      };
      if (!(n = this._textEditChanges[t.uri])) {
        this._workspaceEdit.documentChanges.push({
          textDocument: t,
          edits: r = []
        });
        n = new Fe(r, this._changeAnnotations);
        this._textEditChanges[t.uri] = n;
      }
      return n;
    } else {
      this.initChanges();
      if (void 0 === this._workspaceEdit.changes) {
        throw new Error("Workspace edit is not configured for normal text edit changes.");
      }
      var n;
      if (!(n = this._textEditChanges[e])) {
        var r;
        this._workspaceEdit.changes[e] = r = [];
        n = new Fe(r);
        this._textEditChanges[e] = n;
      }
      return n;
    }
  };
  WorkspaceChange.prototype.initDocumentChanges = function() {
    if (void 0 === this._workspaceEdit.documentChanges && void 0 === this._workspaceEdit.changes) {
      this._changeAnnotations = new Ce;
      this._workspaceEdit.documentChanges = [];
      this._workspaceEdit.changeAnnotations = this._changeAnnotations.all();
    }
  };
  WorkspaceChange.prototype.initChanges = function() {
    if (void 0 === this._workspaceEdit.documentChanges && void 0 === this._workspaceEdit.changes) {
      this._workspaceEdit.changes = Object.create(null);
    }
  };
  WorkspaceChange.prototype.createFile = function(e, t, n) {
    this.initDocumentChanges();
    if (void 0 === this._workspaceEdit.documentChanges) {
      throw new Error("Workspace edit is not configured for document changes.");
    }
    var r;
    if (Ie.is(t) || be.is(t)) {
      r = t;
    } else {
      n = t;
    }
    var i;
    var a;
    if (void 0 === r) {
      i = De.create(e, n);
    } else {
      a = be.is(r) ? r : this._changeAnnotations.manage(r);
      i = De.create(e, n, a);
    }
    this._workspaceEdit.documentChanges.push(i);
    if (void 0 !== a) {
      return a;
    }
  };
  WorkspaceChange.prototype.renameFile = function(e, t, n, r) {
    this.initDocumentChanges();
    if (void 0 === this._workspaceEdit.documentChanges) {
      throw new Error("Workspace edit is not configured for document changes.");
    }
    var i;
    if (Ie.is(n) || be.is(n)) {
      i = n;
    } else {
      r = n;
    }
    var a;
    var o;
    if (void 0 === i) {
      a = Ne.create(e, t, r);
    } else {
      o = be.is(i) ? i : this._changeAnnotations.manage(i);
      a = Ne.create(e, t, r, o);
    }
    this._workspaceEdit.documentChanges.push(a);
    if (void 0 !== o) {
      return o;
    }
  };
  WorkspaceChange.prototype.deleteFile = function(e, t, n) {
    this.initDocumentChanges();
    if (void 0 === this._workspaceEdit.documentChanges) {
      throw new Error("Workspace edit is not configured for document changes.");
    }
    var r;
    if (Ie.is(t) || be.is(t)) {
      r = t;
    } else {
      n = t;
    }
    var i;
    var a;
    if (void 0 === r) {
      i = Ae.create(e, n);
    } else {
      a = be.is(r) ? r : this._changeAnnotations.manage(r);
      i = Ae.create(e, n, a);
    }
    this._workspaceEdit.documentChanges.push(i);
    if (void 0 !== a) {
      return a;
    }
  };
}();

var Le;

!function(e) {
  e.create = function create(e) {
    return {
      uri: e
    };
  };
  e.is = function is(e) {
    var t = e;
    return St.defined(t) && St.string(t.uri);
  };
}(Le || (Le = {}));

var Oe;

!function(e) {
  e.create = function create(e, t) {
    return {
      uri: e,
      version: t
    };
  };
  e.is = function is(e) {
    var t = e;
    return St.defined(t) && St.string(t.uri) && St.integer(t.version);
  };
}(Oe || (Oe = {}));

var xe;

!function(e) {
  e.create = function create(e, t) {
    return {
      uri: e,
      version: t
    };
  };
  e.is = function is(e) {
    var t = e;
    return St.defined(t) && St.string(t.uri) && (null === t.version || St.integer(t.version));
  };
}(xe || (xe = {}));

var Me;

!function(e) {
  e.create = function create(e, t, n, r) {
    return {
      uri: e,
      languageId: t,
      version: n,
      text: r
    };
  };
  e.is = function is(e) {
    var t = e;
    return St.defined(t) && St.string(t.uri) && St.string(t.languageId) && St.integer(t.version) && St.string(t.text);
  };
}(Me || (Me = {}));

var Pe;

!function(e) {
  e.PlainText = "plaintext";
  e.Markdown = "markdown";
  e.is = function is(t) {
    return t === e.PlainText || t === e.Markdown;
  };
}(Pe || (Pe = {}));

var we;

!function(e) {
  e.is = function is(e) {
    var t = e;
    return St.objectLiteral(e) && Pe.is(t.kind) && St.string(t.value);
  };
}(we || (we = {}));

var Re;

!function(e) {
  e.Text = 1;
  e.Method = 2;
  e.Function = 3;
  e.Constructor = 4;
  e.Field = 5;
  e.Variable = 6;
  e.Class = 7;
  e.Interface = 8;
  e.Module = 9;
  e.Property = 10;
  e.Unit = 11;
  e.Value = 12;
  e.Enum = 13;
  e.Keyword = 14;
  e.Snippet = 15;
  e.Color = 16;
  e.File = 17;
  e.Reference = 18;
  e.Folder = 19;
  e.EnumMember = 20;
  e.Constant = 21;
  e.Struct = 22;
  e.Event = 23;
  e.Operator = 24;
  e.TypeParameter = 25;
}(Re || (Re = {}));

var je;

!function(e) {
  e.PlainText = 1;
  e.Snippet = 2;
}(je || (je = {}));

var Ue;

!function(e) {
  e.Deprecated = 1;
}(Ue || (Ue = {}));

var Ve;

!function(e) {
  e.create = function create(e, t, n) {
    return {
      newText: e,
      insert: t,
      replace: n
    };
  };
  e.is = function is(e) {
    var t = e;
    return t && St.string(t.newText) && oe.is(t.insert) && oe.is(t.replace);
  };
}(Ve || (Ve = {}));

var Ye;

!function(e) {
  e.asIs = 1;
  e.adjustIndentation = 2;
}(Ye || (Ye = {}));

var $e;

!function(e) {
  e.is = function is(e) {
    var t = e;
    return t && (St.string(t.detail) || void 0 === t.detail) && (St.string(t.description) || void 0 === t.description);
  };
}($e || ($e = {}));

var Be;

!function(e) {
  e.create = function create(e) {
    return {
      label: e
    };
  };
}(Be || (Be = {}));

var Ge;

!function(e) {
  e.create = function create(e, t) {
    return {
      items: e ? e : [],
      isIncomplete: !!t
    };
  };
}(Ge || (Ge = {}));

var Qe;

!function(e) {
  e.fromPlainText = function fromPlainText(e) {
    return e.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
  };
  e.is = function is(e) {
    var t = e;
    return St.string(t) || St.objectLiteral(t) && St.string(t.language) && St.string(t.value);
  };
}(Qe || (Qe = {}));

var Xe;

!function(e) {
  e.is = function is(e) {
    var t = e;
    return !!t && St.objectLiteral(t) && (we.is(t.contents) || Qe.is(t.contents) || St.typedArray(t.contents, Qe.is)) && (void 0 === e.range || oe.is(e.range));
  };
}(Xe || (Xe = {}));

var We;

!function(e) {
  e.create = function create(e, t) {
    return t ? {
      label: e,
      documentation: t
    } : {
      label: e
    };
  };
}(We || (We = {}));

var Je;

!function(e) {
  e.create = function create(e, t) {
    var n = [];
    for (var r = 2; r < arguments.length; r++) {
      n[r - 2] = arguments[r];
    }
    var i = {
      label: e
    };
    if (St.defined(t)) {
      i.documentation = t;
    }
    if (St.defined(n)) {
      i.parameters = n;
    } else {
      i.parameters = [];
    }
    return i;
  };
}(Je || (Je = {}));

var Ke;

!function(e) {
  e.Text = 1;
  e.Read = 2;
  e.Write = 3;
}(Ke || (Ke = {}));

var ze;

!function(e) {
  e.create = function create(e, t) {
    var n = {
      range: e
    };
    if (St.number(t)) {
      n.kind = t;
    }
    return n;
  };
}(ze || (ze = {}));

var He;

!function(e) {
  e.File = 1;
  e.Module = 2;
  e.Namespace = 3;
  e.Package = 4;
  e.Class = 5;
  e.Method = 6;
  e.Property = 7;
  e.Field = 8;
  e.Constructor = 9;
  e.Enum = 10;
  e.Interface = 11;
  e.Function = 12;
  e.Variable = 13;
  e.Constant = 14;
  e.String = 15;
  e.Number = 16;
  e.Boolean = 17;
  e.Array = 18;
  e.Object = 19;
  e.Key = 20;
  e.Null = 21;
  e.EnumMember = 22;
  e.Struct = 23;
  e.Event = 24;
  e.Operator = 25;
  e.TypeParameter = 26;
}(He || (He = {}));

var qe;

!function(e) {
  e.Deprecated = 1;
}(qe || (qe = {}));

var Ze;

!function(e) {
  e.create = function create(e, t, n, r, i) {
    var a = {
      name: e,
      kind: t,
      location: {
        uri: r,
        range: n
      }
    };
    if (i) {
      a.containerName = i;
    }
    return a;
  };
}(Ze || (Ze = {}));

var et;

!function(e) {
  e.create = function create(e, t, n, r) {
    return void 0 !== r ? {
      name: e,
      kind: t,
      location: {
        uri: n,
        range: r
      }
    } : {
      name: e,
      kind: t,
      location: {
        uri: n
      }
    };
  };
}(et || (et = {}));

var tt;

!function(e) {
  e.create = function create(e, t, n, r, i, a) {
    var o = {
      name: e,
      detail: t,
      kind: n,
      range: r,
      selectionRange: i
    };
    if (void 0 !== a) {
      o.children = a;
    }
    return o;
  };
  e.is = function is(e) {
    var t = e;
    return t && St.string(t.name) && St.number(t.kind) && oe.is(t.range) && oe.is(t.selectionRange) && (void 0 === t.detail || St.string(t.detail)) && (void 0 === t.deprecated || St.boolean(t.deprecated)) && (void 0 === t.children || Array.isArray(t.children)) && (void 0 === t.tags || Array.isArray(t.tags));
  };
}(tt || (tt = {}));

var nt;

!function(e) {
  e.Empty = "";
  e.QuickFix = "quickfix";
  e.Refactor = "refactor";
  e.RefactorExtract = "refactor.extract";
  e.RefactorInline = "refactor.inline";
  e.RefactorRewrite = "refactor.rewrite";
  e.Source = "source";
  e.SourceOrganizeImports = "source.organizeImports";
  e.SourceFixAll = "source.fixAll";
}(nt || (nt = {}));

var rt;

!function(e) {
  e.Invoked = 1;
  e.Automatic = 2;
}(rt || (rt = {}));

var it;

!function(e) {
  e.create = function create(e, t, n) {
    var r = {
      diagnostics: e
    };
    if (null != t) {
      r.only = t;
    }
    if (null != n) {
      r.triggerKind = n;
    }
    return r;
  };
  e.is = function is(e) {
    var t = e;
    return St.defined(t) && St.typedArray(t.diagnostics, he.is) && (void 0 === t.only || St.typedArray(t.only, St.string)) && (void 0 === t.triggerKind || t.triggerKind === rt.Invoked || t.triggerKind === rt.Automatic);
  };
}(it || (it = {}));

var at;

!function(e) {
  e.create = function create(e, t, n) {
    var r = {
      title: e
    };
    var i = !0;
    if ("string" == typeof t) {
      i = !1;
      r.kind = t;
    } else if (Te.is(t)) {
      r.command = t;
    } else {
      r.edit = t;
    }
    if (i && void 0 !== n) {
      r.kind = n;
    }
    return r;
  };
  e.is = function is(e) {
    var t = e;
    return t && St.string(t.title) && (void 0 === t.diagnostics || St.typedArray(t.diagnostics, he.is)) && (void 0 === t.kind || St.string(t.kind)) && (void 0 !== t.edit || void 0 !== t.command) && (void 0 === t.command || Te.is(t.command)) && (void 0 === t.isPreferred || St.boolean(t.isPreferred)) && (void 0 === t.edit || ke.is(t.edit));
  };
}(at || (at = {}));

var ot;

!function(e) {
  e.create = function create(e, t) {
    var n = {
      range: e
    };
    if (St.defined(t)) {
      n.data = t;
    }
    return n;
  };
  e.is = function is(e) {
    var t = e;
    return St.defined(t) && oe.is(t.range) && (St.undefined(t.command) || Te.is(t.command));
  };
}(ot || (ot = {}));

var st;

!function(e) {
  e.create = function create(e, t) {
    return {
      tabSize: e,
      insertSpaces: t
    };
  };
  e.is = function is(e) {
    var t = e;
    return St.defined(t) && St.uinteger(t.tabSize) && St.boolean(t.insertSpaces);
  };
}(st || (st = {}));

var ut;

!function(e) {
  e.create = function create(e, t, n) {
    return {
      range: e,
      target: t,
      data: n
    };
  };
  e.is = function is(e) {
    var t = e;
    return St.defined(t) && oe.is(t.range) && (St.undefined(t.target) || St.string(t.target));
  };
}(ut || (ut = {}));

var ct;

!function(e) {
  e.create = function create(e, t) {
    return {
      range: e,
      parent: t
    };
  };
  e.is = function is(t) {
    var n = t;
    return St.objectLiteral(n) && oe.is(n.range) && (void 0 === n.parent || e.is(n.parent));
  };
}(ct || (ct = {}));

var lt;

!function(e) {
  e.namespace = "namespace";
  e.type = "type";
  e.class = "class";
  e.enum = "enum";
  e.interface = "interface";
  e.struct = "struct";
  e.typeParameter = "typeParameter";
  e.parameter = "parameter";
  e.variable = "variable";
  e.property = "property";
  e.enumMember = "enumMember";
  e.event = "event";
  e.function = "function";
  e.method = "method";
  e.macro = "macro";
  e.keyword = "keyword";
  e.modifier = "modifier";
  e.comment = "comment";
  e.string = "string";
  e.number = "number";
  e.regexp = "regexp";
  e.operator = "operator";
  e.decorator = "decorator";
}(lt || (lt = {}));

var dt;

!function(e) {
  e.declaration = "declaration";
  e.definition = "definition";
  e.readonly = "readonly";
  e.static = "static";
  e.deprecated = "deprecated";
  e.abstract = "abstract";
  e.async = "async";
  e.modification = "modification";
  e.documentation = "documentation";
  e.defaultLibrary = "defaultLibrary";
}(dt || (dt = {}));

var ft;

!function(e) {
  e.is = function is(e) {
    var t = e;
    return St.objectLiteral(t) && (void 0 === t.resultId || "string" == typeof t.resultId) && Array.isArray(t.data) && (0 === t.data.length || "number" == typeof t.data[0]);
  };
}(ft || (ft = {}));

var vt;

!function(e) {
  e.create = function create(e, t) {
    return {
      range: e,
      text: t
    };
  };
  e.is = function is(e) {
    var t = e;
    return null != t && oe.is(t.range) && St.string(t.text);
  };
}(vt || (vt = {}));

var pt;

!function(e) {
  e.create = function create(e, t, n) {
    return {
      range: e,
      variableName: t,
      caseSensitiveLookup: n
    };
  };
  e.is = function is(e) {
    var t = e;
    return null != t && oe.is(t.range) && St.boolean(t.caseSensitiveLookup) && (St.string(t.variableName) || void 0 === t.variableName);
  };
}(pt || (pt = {}));

var gt;

!function(e) {
  e.create = function create(e, t) {
    return {
      range: e,
      expression: t
    };
  };
  e.is = function is(e) {
    var t = e;
    return null != t && oe.is(t.range) && (St.string(t.expression) || void 0 === t.expression);
  };
}(gt || (gt = {}));

var mt;

!function(e) {
  e.create = function create(e, t) {
    return {
      frameId: e,
      stoppedLocation: t
    };
  };
  e.is = function is(e) {
    return St.defined(e) && oe.is(e.stoppedLocation);
  };
}(mt || (mt = {}));

var Et;

!function(e) {
  e.Type = 1;
  e.Parameter = 2;
  e.is = function is(e) {
    return 1 === e || 2 === e;
  };
}(Et || (Et = {}));

var ht;

!function(e) {
  e.create = function create(e) {
    return {
      value: e
    };
  };
  e.is = function is(e) {
    var t = e;
    return St.objectLiteral(t) && (void 0 === t.tooltip || St.string(t.tooltip) || we.is(t.tooltip)) && (void 0 === t.location || se.is(t.location)) && (void 0 === t.command || Te.is(t.command));
  };
}(ht || (ht = {}));

var Tt;

!function(e) {
  e.create = function create(e, t, n) {
    var r = {
      position: e,
      label: t
    };
    if (void 0 !== n) {
      r.kind = n;
    }
    return r;
  };
  e.is = function is(e) {
    var t = e;
    return St.objectLiteral(t) && ae.is(t.position) && (St.string(t.label) || St.typedArray(t.label, ht.is)) && (void 0 === t.kind || Et.is(t.kind)) && void 0 === t.textEdits || St.typedArray(t.textEdits, ye.is) && (void 0 === t.tooltip || St.string(t.tooltip) || we.is(t.tooltip)) && (void 0 === t.paddingLeft || St.boolean(t.paddingLeft)) && (void 0 === t.paddingRight || St.boolean(t.paddingRight));
  };
}(Tt || (Tt = {}));

var yt;

!function(e) {
  e.is = function is(e) {
    var t = e;
    return St.objectLiteral(t) && ne.is(t.uri) && St.string(t.name);
  };
}(yt || (yt = {}));

var It;

!function(e) {
  e.create = function create(e, t, n, r) {
    return new bt(e, t, n, r);
  };
  e.is = function is(e) {
    var t = e;
    return St.defined(t) && St.string(t.uri) && (St.undefined(t.languageId) || St.string(t.languageId)) && St.uinteger(t.lineCount) && St.func(t.getText) && St.func(t.positionAt) && St.func(t.offsetAt) ? !0 : !1;
  };
  e.applyEdits = function applyEdits(e, t) {
    var n = e.getText();
    var r = mergeSort(t, (function(e, t) {
      var n = e.range.start.line - t.range.start.line;
      if (0 === n) {
        return e.range.start.character - t.range.start.character;
      }
      return n;
    }));
    var i = n.length;
    for (var a = r.length - 1; a >= 0; a--) {
      var o = r[a];
      var s = e.offsetAt(o.range.start);
      var u = e.offsetAt(o.range.end);
      if (u <= i) {
        n = n.substring(0, s) + o.newText + n.substring(u, n.length);
      } else {
        throw new Error("Overlapping edit");
      }
      i = s;
    }
    return n;
  };
  function mergeSort(e, t) {
    if (e.length <= 1) {
      return e;
    }
    var n = e.length / 2 | 0;
    var r = e.slice(0, n);
    var i = e.slice(n);
    mergeSort(r, t);
    mergeSort(i, t);
    var a = 0;
    var o = 0;
    var s = 0;
    while (a < r.length && o < i.length) {
      if (t(r[a], i[o]) <= 0) {
        e[s++] = r[a++];
      } else {
        e[s++] = i[o++];
      }
    }
    while (a < r.length) {
      e[s++] = r[a++];
    }
    while (o < i.length) {
      e[s++] = i[o++];
    }
    return e;
  }
}(It || (It = {}));

var bt = function() {
  function FullTextDocument(e, t, n, r) {
    this._uri = e;
    this._languageId = t;
    this._version = n;
    this._content = r;
    this._lineOffsets = void 0;
  }
  Object.defineProperty(FullTextDocument.prototype, "uri", {
    get: function() {
      return this._uri;
    },
    enumerable: !1,
    configurable: !0
  });
  Object.defineProperty(FullTextDocument.prototype, "languageId", {
    get: function() {
      return this._languageId;
    },
    enumerable: !1,
    configurable: !0
  });
  Object.defineProperty(FullTextDocument.prototype, "version", {
    get: function() {
      return this._version;
    },
    enumerable: !1,
    configurable: !0
  });
  FullTextDocument.prototype.getText = function(e) {
    if (e) {
      var t = this.offsetAt(e.start);
      var n = this.offsetAt(e.end);
      return this._content.substring(t, n);
    }
    return this._content;
  };
  FullTextDocument.prototype.update = function(e, t) {
    this._content = e.text;
    this._version = t;
    this._lineOffsets = void 0;
  };
  FullTextDocument.prototype.getLineOffsets = function() {
    if (void 0 === this._lineOffsets) {
      var e = [];
      var t = this._content;
      var n = !0;
      for (var r = 0; r < t.length; r++) {
        if (n) {
          e.push(r);
          n = !1;
        }
        var i = t.charAt(r);
        n = "\r" === i || "\n" === i;
        if ("\r" === i && r + 1 < t.length && "\n" === t.charAt(r + 1)) {
          r++;
        }
      }
      if (n && t.length > 0) {
        e.push(t.length);
      }
      this._lineOffsets = e;
    }
    return this._lineOffsets;
  };
  FullTextDocument.prototype.positionAt = function(e) {
    e = Math.max(Math.min(e, this._content.length), 0);
    var t = this.getLineOffsets();
    var n = 0, r = t.length;
    if (0 === r) {
      return ae.create(0, e);
    }
    while (n < r) {
      var i = Math.floor((n + r) / 2);
      if (t[i] > e) {
        r = i;
      } else {
        n = i + 1;
      }
    }
    var a = n - 1;
    return ae.create(a, e - t[a]);
  };
  FullTextDocument.prototype.offsetAt = function(e) {
    var t = this.getLineOffsets();
    if (e.line >= t.length) {
      return this._content.length;
    } else if (e.line < 0) {
      return 0;
    }
    var n = t[e.line];
    return Math.max(Math.min(n + e.character, e.line + 1 < t.length ? t[e.line + 1] : this._content.length), n);
  };
  Object.defineProperty(FullTextDocument.prototype, "lineCount", {
    get: function() {
      return this.getLineOffsets().length;
    },
    enumerable: !1,
    configurable: !0
  });
  return FullTextDocument;
}();

var St;

!function(e) {
  var t = Object.prototype.toString;
  e.defined = function defined(e) {
    return void 0 !== e;
  };
  e.undefined = function undefined$1(e) {
    return void 0 === e;
  };
  e.boolean = function boolean(e) {
    return !0 === e || !1 === e;
  };
  e.string = function string(e) {
    return "[object String]" === t.call(e);
  };
  e.number = function number(e) {
    return "[object Number]" === t.call(e);
  };
  e.numberRange = function numberRange(e, n, r) {
    return "[object Number]" === t.call(e) && n <= e && e <= r;
  };
  e.integer = function integer(e) {
    return "[object Number]" === t.call(e) && -2147483648 <= e && e <= 2147483647;
  };
  e.uinteger = function uinteger(e) {
    return "[object Number]" === t.call(e) && 0 <= e && e <= 2147483647;
  };
  e.func = function func(e) {
    return "[object Function]" === t.call(e);
  };
  e.objectLiteral = function objectLiteral(e) {
    return null !== e && "object" == typeof e;
  };
  e.typedArray = function typedArray(e, t) {
    return Array.isArray(e) && e.every(t);
  };
}(St || (St = {}));

var _t;

!function(e) {
  e.Text = 1;
  e.Method = 2;
  e.Function = 3;
  e.Constructor = 4;
  e.Field = 5;
  e.Variable = 6;
  e.Class = 7;
  e.Interface = 8;
  e.Module = 9;
  e.Property = 10;
  e.Unit = 11;
  e.Value = 12;
  e.Enum = 13;
  e.Keyword = 14;
  e.Snippet = 15;
  e.Color = 16;
  e.File = 17;
  e.Reference = 18;
  e.Folder = 19;
  e.EnumMember = 20;
  e.Constant = 21;
  e.Struct = 22;
  e.Event = 23;
  e.Operator = 24;
  e.TypeParameter = 25;
}(_t || (_t = {}));

var Dt = Object.assign(Object.assign({}, k), {
  ALIASED_FIELD: "AliasedField",
  ARGUMENTS: "Arguments",
  SHORT_QUERY: "ShortQuery",
  QUERY: "Query",
  MUTATION: "Mutation",
  SUBSCRIPTION: "Subscription",
  TYPE_CONDITION: "TypeCondition",
  INVALID: "Invalid",
  COMMENT: "Comment",
  SCHEMA_DEF: "SchemaDef",
  SCALAR_DEF: "ScalarDef",
  OBJECT_TYPE_DEF: "ObjectTypeDef",
  OBJECT_VALUE: "ObjectValue",
  LIST_VALUE: "ListValue",
  INTERFACE_DEF: "InterfaceDef",
  UNION_DEF: "UnionDef",
  ENUM_DEF: "EnumDef",
  ENUM_VALUE: "EnumValue",
  FIELD_DEF: "FieldDef",
  INPUT_DEF: "InputDef",
  INPUT_VALUE_DEF: "InputValueDef",
  ARGUMENTS_DEF: "ArgumentsDef",
  EXTEND_DEF: "ExtendDef",
  EXTENSION_DEFINITION: "ExtensionDefinition",
  DIRECTIVE_DEF: "DirectiveDef",
  IMPLEMENTS: "Implements",
  VARIABLE_DEFINITIONS: "VariableDefinitions",
  TYPE: "Type"
});

var Nt = {
  command: "editor.action.triggerSuggest",
  title: "Suggestions"
};

var collectFragmentDefs = e => {
  var t = [];
  if (e) {
    try {
      G(Q(e), {
        FragmentDefinition(e) {
          t.push(e);
        }
      });
    } catch (e) {
      return [];
    }
  }
  return t;
};

var At = [ k.SCHEMA_DEFINITION, k.OPERATION_TYPE_DEFINITION, k.SCALAR_TYPE_DEFINITION, k.OBJECT_TYPE_DEFINITION, k.INTERFACE_TYPE_DEFINITION, k.UNION_TYPE_DEFINITION, k.ENUM_TYPE_DEFINITION, k.INPUT_OBJECT_TYPE_DEFINITION, k.DIRECTIVE_DEFINITION, k.SCHEMA_EXTENSION, k.SCALAR_TYPE_EXTENSION, k.OBJECT_TYPE_EXTENSION, k.INTERFACE_TYPE_EXTENSION, k.UNION_TYPE_EXTENSION, k.ENUM_TYPE_EXTENSION, k.INPUT_OBJECT_TYPE_EXTENSION ];

var hasTypeSystemDefinitions = e => {
  var t = !1;
  if (e) {
    try {
      G(Q(e), {
        enter(e) {
          if ("Document" === e.kind) {
            return;
          }
          if (At.includes(e.kind)) {
            t = !0;
            return X;
          }
          return !1;
        }
      });
    } catch (e) {
      return t;
    }
  }
  return t;
};

function getAutocompleteSuggestions(e, t, n, r, i, a) {
  var o;
  var s = Object.assign(Object.assign({}, a), {
    schema: e
  });
  var u = r || getTokenAtPosition(t, n, 1);
  var c = "Invalid" === u.state.kind ? u.state.prevState : u.state;
  var l = (null == a ? void 0 : a.mode) || function getDocumentMode(e, t) {
    if (null == t ? void 0 : t.endsWith(".graphqls")) {
      return Ft.TYPE_SYSTEM;
    }
    return hasTypeSystemDefinitions(e) ? Ft.TYPE_SYSTEM : Ft.EXECUTABLE;
  }(t, null == a ? void 0 : a.uri);
  if (!c) {
    return [];
  }
  var {kind: d, step: f, prevState: v} = c;
  var p = getTypeInfo(e, u.state);
  if (d === Dt.DOCUMENT) {
    if (l === Ft.TYPE_SYSTEM) {
      return function getSuggestionsForTypeSystemDefinitions(e) {
        return hintList$1(e, [ {
          label: "extend",
          kind: _t.Function
        }, {
          label: "type",
          kind: _t.Function
        }, {
          label: "interface",
          kind: _t.Function
        }, {
          label: "union",
          kind: _t.Function
        }, {
          label: "input",
          kind: _t.Function
        }, {
          label: "scalar",
          kind: _t.Function
        }, {
          label: "schema",
          kind: _t.Function
        } ]);
      }(u);
    }
    return function getSuggestionsForExecutableDefinitions(e) {
      return hintList$1(e, [ {
        label: "query",
        kind: _t.Function
      }, {
        label: "mutation",
        kind: _t.Function
      }, {
        label: "subscription",
        kind: _t.Function
      }, {
        label: "fragment",
        kind: _t.Function
      }, {
        label: "{",
        kind: _t.Constructor
      } ]);
    }(u);
  }
  if (d === Dt.EXTEND_DEF) {
    return function getSuggestionsForExtensionDefinitions(e) {
      return hintList$1(e, [ {
        label: "type",
        kind: _t.Function
      }, {
        label: "interface",
        kind: _t.Function
      }, {
        label: "union",
        kind: _t.Function
      }, {
        label: "input",
        kind: _t.Function
      }, {
        label: "scalar",
        kind: _t.Function
      }, {
        label: "schema",
        kind: _t.Function
      } ]);
    }(u);
  }
  if ((null === (o = null == v ? void 0 : v.prevState) || void 0 === o ? void 0 : o.kind) === Dt.EXTENSION_DEFINITION && c.name) {
    return hintList$1(u, []);
  }
  if ((null == v ? void 0 : v.kind) === k.SCALAR_TYPE_EXTENSION) {
    return hintList$1(u, Object.values(e.getTypeMap()).filter(F).map((e => ({
      label: e.name,
      kind: _t.Function
    }))));
  }
  if ((null == v ? void 0 : v.kind) === k.OBJECT_TYPE_EXTENSION) {
    return hintList$1(u, Object.values(e.getTypeMap()).filter((e => C(e) && !e.name.startsWith("__"))).map((e => ({
      label: e.name,
      kind: _t.Function
    }))));
  }
  if ((null == v ? void 0 : v.kind) === k.INTERFACE_TYPE_EXTENSION) {
    return hintList$1(u, Object.values(e.getTypeMap()).filter(L).map((e => ({
      label: e.name,
      kind: _t.Function
    }))));
  }
  if ((null == v ? void 0 : v.kind) === k.UNION_TYPE_EXTENSION) {
    return hintList$1(u, Object.values(e.getTypeMap()).filter(O).map((e => ({
      label: e.name,
      kind: _t.Function
    }))));
  }
  if ((null == v ? void 0 : v.kind) === k.ENUM_TYPE_EXTENSION) {
    return hintList$1(u, Object.values(e.getTypeMap()).filter((e => x(e) && !e.name.startsWith("__"))).map((e => ({
      label: e.name,
      kind: _t.Function
    }))));
  }
  if ((null == v ? void 0 : v.kind) === k.INPUT_OBJECT_TYPE_EXTENSION) {
    return hintList$1(u, Object.values(e.getTypeMap()).filter(M).map((e => ({
      label: e.name,
      kind: _t.Function
    }))));
  }
  if (d === Dt.IMPLEMENTS || d === Dt.NAMED_TYPE && (null == v ? void 0 : v.kind) === Dt.IMPLEMENTS) {
    return function getSuggestionsForImplements(e, t, n, r, i) {
      if (t.needsSeparator) {
        return [];
      }
      var a = n.getTypeMap();
      var o = objectValues(a).filter(L);
      var s = o.map((({name: e}) => e));
      var u = new Set;
      runOnlineParser$1(r, ((e, t) => {
        var r, a, o, c, l;
        if (t.name) {
          if (t.kind === Dt.INTERFACE_DEF && !s.includes(t.name)) {
            u.add(t.name);
          }
          if (t.kind === Dt.NAMED_TYPE && (null === (r = t.prevState) || void 0 === r ? void 0 : r.kind) === Dt.IMPLEMENTS) {
            if (i.interfaceDef) {
              if (null === (a = i.interfaceDef) || void 0 === a ? void 0 : a.getInterfaces().find((({name: e}) => e === t.name))) {
                return;
              }
              var d = n.getType(t.name);
              var f = null === (o = i.interfaceDef) || void 0 === o ? void 0 : o.toConfig();
              i.interfaceDef = new K(Object.assign(Object.assign({}, f), {
                interfaces: [ ...f.interfaces, d || new K({
                  name: t.name,
                  fields: {}
                }) ]
              }));
            } else if (i.objectTypeDef) {
              if (null === (c = i.objectTypeDef) || void 0 === c ? void 0 : c.getInterfaces().find((({name: e}) => e === t.name))) {
                return;
              }
              var v = n.getType(t.name);
              var p = null === (l = i.objectTypeDef) || void 0 === l ? void 0 : l.toConfig();
              i.objectTypeDef = new z(Object.assign(Object.assign({}, p), {
                interfaces: [ ...p.interfaces, v || new K({
                  name: t.name,
                  fields: {}
                }) ]
              }));
            }
          }
        }
      }));
      var c = i.interfaceDef || i.objectTypeDef;
      var l = ((null == c ? void 0 : c.getInterfaces()) || []).map((({name: e}) => e));
      var d = o.concat([ ...u ].map((e => ({
        name: e
      })))).filter((({name: e}) => e !== (null == c ? void 0 : c.name) && !l.includes(e)));
      return hintList$1(e, d.map((e => {
        var t = {
          label: e.name,
          kind: _t.Interface,
          type: e
        };
        if (null == e ? void 0 : e.description) {
          t.documentation = e.description;
        }
        return t;
      })));
    }(u, c, e, t, p);
  }
  if (d === Dt.SELECTION_SET || d === Dt.FIELD || d === Dt.ALIASED_FIELD) {
    return function getSuggestionsForFieldNames(e, t, n) {
      var r;
      if (t.parentType) {
        var {parentType: i} = t;
        var a = [];
        if ("getFields" in i) {
          a = objectValues(i.getFields());
        }
        if (A(i)) {
          a.push(N);
        }
        if (i === (null === (r = null == n ? void 0 : n.schema) || void 0 === r ? void 0 : r.getQueryType())) {
          a.push(_, D);
        }
        return hintList$1(e, a.map(((e, t) => {
          var r;
          var i = {
            sortText: String(t) + e.name,
            label: e.name,
            detail: String(e.type),
            documentation: null !== (r = e.description) && void 0 !== r ? r : void 0,
            deprecated: Boolean(e.deprecationReason),
            isDeprecated: Boolean(e.deprecationReason),
            deprecationReason: e.deprecationReason,
            kind: _t.Field,
            type: e.type
          };
          if (null == n ? void 0 : n.fillLeafsOnComplete) {
            var a = getInsertText(e);
            if (a) {
              i.insertText = e.name + a;
              i.insertTextFormat = je.Snippet;
              i.command = Nt;
            }
          }
          return i;
        })));
      }
      return [];
    }(u, p, s);
  }
  if (d === Dt.ARGUMENTS || d === Dt.ARGUMENT && 0 === f) {
    var {argDefs: g} = p;
    if (g) {
      return hintList$1(u, g.map((e => {
        var t;
        return {
          label: e.name,
          insertText: e.name + ": ",
          command: Nt,
          detail: String(e.type),
          documentation: null !== (t = e.description) && void 0 !== t ? t : void 0,
          kind: _t.Variable,
          type: e.type
        };
      })));
    }
  }
  if ((d === Dt.OBJECT_VALUE || d === Dt.OBJECT_FIELD && 0 === f) && p.objectFieldDefs) {
    var m = objectValues(p.objectFieldDefs);
    var E = d === Dt.OBJECT_VALUE ? _t.Value : _t.Field;
    return hintList$1(u, m.map((e => {
      var t;
      return {
        label: e.name,
        detail: String(e.type),
        documentation: null !== (t = e.description) && void 0 !== t ? t : void 0,
        kind: E,
        type: e.type
      };
    })));
  }
  if (d === Dt.ENUM_VALUE || d === Dt.LIST_VALUE && 1 === f || d === Dt.OBJECT_FIELD && 2 === f || d === Dt.ARGUMENT && 2 === f) {
    return function getSuggestionsForInputValues(e, t, n, r) {
      var i = P(t.inputType);
      var a = getVariableCompletions(n, r, e).filter((e => e.detail === i.name));
      if (i instanceof j) {
        return hintList$1(e, i.getValues().map((e => {
          var t;
          return {
            label: e.name,
            detail: String(i),
            documentation: null !== (t = e.description) && void 0 !== t ? t : void 0,
            deprecated: Boolean(e.deprecationReason),
            isDeprecated: Boolean(e.deprecationReason),
            deprecationReason: e.deprecationReason,
            kind: _t.EnumMember,
            type: i
          };
        })).concat(a));
      }
      if (i === U) {
        return hintList$1(e, a.concat([ {
          label: "true",
          detail: String(U),
          documentation: "Not false.",
          kind: _t.Variable,
          type: U
        }, {
          label: "false",
          detail: String(U),
          documentation: "Not true.",
          kind: _t.Variable,
          type: U
        } ]));
      }
      return a;
    }(u, p, t, e);
  }
  if (d === Dt.VARIABLE && 1 === f) {
    var h = P(p.inputType);
    return hintList$1(u, getVariableCompletions(t, e, u).filter((e => e.detail === (null == h ? void 0 : h.name))));
  }
  if (d === Dt.TYPE_CONDITION && 1 === f || d === Dt.NAMED_TYPE && null != v && v.kind === Dt.TYPE_CONDITION) {
    return function getSuggestionsForFragmentTypeConditions(e, t, n, r) {
      var i;
      if (t.parentType) {
        if (V(t.parentType)) {
          var a = Y(t.parentType);
          var o = n.getPossibleTypes(a);
          var s = Object.create(null);
          for (var u of o) {
            for (var c of u.getInterfaces()) {
              s[c.name] = c;
            }
          }
          i = o.concat(objectValues(s));
        } else {
          i = [ t.parentType ];
        }
      } else {
        i = objectValues(n.getTypeMap()).filter((e => A(e) && !e.name.startsWith("__")));
      }
      return hintList$1(e, i.map((e => {
        var t = P(e);
        return {
          label: String(e),
          documentation: (null == t ? void 0 : t.description) || "",
          kind: _t.Field
        };
      })));
    }(u, p, e);
  }
  if (d === Dt.FRAGMENT_SPREAD && 1 === f) {
    return function getSuggestionsForFragmentSpread$1(e, t, n, r, i) {
      if (!r) {
        return [];
      }
      var a = n.getTypeMap();
      var o = getDefinitionState(e.state);
      var s = function getFragmentDefinitions(e) {
        var t = [];
        runOnlineParser$1(e, ((e, n) => {
          if (n.kind === Dt.FRAGMENT_DEFINITION && n.name && n.type) {
            t.push({
              kind: Dt.FRAGMENT_DEFINITION,
              name: {
                kind: k.NAME,
                value: n.name
              },
              selectionSet: {
                kind: Dt.SELECTION_SET,
                selections: []
              },
              typeCondition: {
                kind: Dt.NAMED_TYPE,
                name: {
                  kind: k.NAME,
                  value: n.type
                }
              }
            });
          }
        }));
        return t;
      }(r);
      if (i && i.length > 0) {
        s.push(...i);
      }
      var u = s.filter((e => a[e.typeCondition.name.value] && !(o && o.kind === Dt.FRAGMENT_DEFINITION && o.name === e.name.value) && A(t.parentType) && A(a[e.typeCondition.name.value]) && $(n, t.parentType, a[e.typeCondition.name.value])));
      return hintList$1(e, u.map((e => ({
        label: e.name.value,
        detail: String(a[e.typeCondition.name.value]),
        documentation: `fragment ${e.name.value} on ${e.typeCondition.name.value}`,
        kind: _t.Field,
        type: a[e.typeCondition.name.value]
      }))));
    }(u, p, e, t, Array.isArray(i) ? i : collectFragmentDefs(i));
  }
  var T = unwrapType(c);
  if (l === Ft.TYPE_SYSTEM && !T.needsAdvance && d === Dt.NAMED_TYPE || d === Dt.LIST_TYPE) {
    if (T.kind === Dt.FIELD_DEF) {
      return hintList$1(u, Object.values(e.getTypeMap()).filter((e => w(e) && !e.name.startsWith("__"))).map((e => ({
        label: e.name,
        kind: _t.Function
      }))));
    }
    if (T.kind === Dt.INPUT_VALUE_DEF) {
      return hintList$1(u, Object.values(e.getTypeMap()).filter((e => R(e) && !e.name.startsWith("__"))).map((e => ({
        label: e.name,
        kind: _t.Function
      }))));
    }
  }
  if (d === Dt.VARIABLE_DEFINITION && 2 === f || d === Dt.LIST_TYPE && 1 === f || d === Dt.NAMED_TYPE && v && (v.kind === Dt.VARIABLE_DEFINITION || v.kind === Dt.LIST_TYPE || v.kind === Dt.NON_NULL_TYPE)) {
    return function getSuggestionsForVariableDefinition(e, t, n) {
      var r = t.getTypeMap();
      var i = objectValues(r).filter(R);
      return hintList$1(e, i.map((e => ({
        label: e.name,
        documentation: e.description,
        kind: _t.Variable
      }))));
    }(u, e);
  }
  if (d === Dt.DIRECTIVE) {
    return function getSuggestionsForDirective(e, t, n, r) {
      var i;
      if (null === (i = t.prevState) || void 0 === i ? void 0 : i.kind) {
        var a = n.getDirectives().filter((e => function canUseDirective(e, t) {
          if (!(null == e ? void 0 : e.kind)) {
            return !1;
          }
          var {kind: n, prevState: r} = e;
          var {locations: i} = t;
          switch (n) {
           case Dt.QUERY:
            return i.includes(B.QUERY);

           case Dt.MUTATION:
            return i.includes(B.MUTATION);

           case Dt.SUBSCRIPTION:
            return i.includes(B.SUBSCRIPTION);

           case Dt.FIELD:
           case Dt.ALIASED_FIELD:
            return i.includes(B.FIELD);

           case Dt.FRAGMENT_DEFINITION:
            return i.includes(B.FRAGMENT_DEFINITION);

           case Dt.FRAGMENT_SPREAD:
            return i.includes(B.FRAGMENT_SPREAD);

           case Dt.INLINE_FRAGMENT:
            return i.includes(B.INLINE_FRAGMENT);

           case Dt.SCHEMA_DEF:
            return i.includes(B.SCHEMA);

           case Dt.SCALAR_DEF:
            return i.includes(B.SCALAR);

           case Dt.OBJECT_TYPE_DEF:
            return i.includes(B.OBJECT);

           case Dt.FIELD_DEF:
            return i.includes(B.FIELD_DEFINITION);

           case Dt.INTERFACE_DEF:
            return i.includes(B.INTERFACE);

           case Dt.UNION_DEF:
            return i.includes(B.UNION);

           case Dt.ENUM_DEF:
            return i.includes(B.ENUM);

           case Dt.ENUM_VALUE:
            return i.includes(B.ENUM_VALUE);

           case Dt.INPUT_DEF:
            return i.includes(B.INPUT_OBJECT);

           case Dt.INPUT_VALUE_DEF:
            switch (null == r ? void 0 : r.kind) {
             case Dt.ARGUMENTS_DEF:
              return i.includes(B.ARGUMENT_DEFINITION);

             case Dt.INPUT_DEF:
              return i.includes(B.INPUT_FIELD_DEFINITION);
            }
          }
          return !1;
        }(t.prevState, e)));
        return hintList$1(e, a.map((e => ({
          label: e.name,
          documentation: e.description || "",
          kind: _t.Function
        }))));
      }
      return [];
    }(u, c, e);
  }
  return [];
}

var kt = " {\n  $1\n}";

var getInsertText = e => {
  var {type: t} = e;
  if (A(t)) {
    return kt;
  }
  if (W(t) && A(t.ofType)) {
    return kt;
  }
  if (J(t)) {
    if (A(t.ofType)) {
      return kt;
    }
    if (W(t.ofType) && A(t.ofType.ofType)) {
      return kt;
    }
  }
  return null;
};

var getParentDefinition$1 = (e, t) => {
  var n, r, i, a, o, s, u, c, l, d;
  if ((null === (n = e.prevState) || void 0 === n ? void 0 : n.kind) === t) {
    return e.prevState;
  }
  if ((null === (i = null === (r = e.prevState) || void 0 === r ? void 0 : r.prevState) || void 0 === i ? void 0 : i.kind) === t) {
    return e.prevState.prevState;
  }
  if ((null === (s = null === (o = null === (a = e.prevState) || void 0 === a ? void 0 : a.prevState) || void 0 === o ? void 0 : o.prevState) || void 0 === s ? void 0 : s.kind) === t) {
    return e.prevState.prevState.prevState;
  }
  if ((null === (d = null === (l = null === (c = null === (u = e.prevState) || void 0 === u ? void 0 : u.prevState) || void 0 === c ? void 0 : c.prevState) || void 0 === l ? void 0 : l.prevState) || void 0 === d ? void 0 : d.kind) === t) {
    return e.prevState.prevState.prevState.prevState;
  }
};

function getVariableCompletions(e, t, n) {
  var r = null;
  var i;
  var a = Object.create({});
  runOnlineParser$1(e, ((e, o) => {
    if ((null == o ? void 0 : o.kind) === Dt.VARIABLE && o.name) {
      r = o.name;
    }
    if ((null == o ? void 0 : o.kind) === Dt.NAMED_TYPE && r) {
      var s = getParentDefinition$1(o, Dt.TYPE);
      if (null == s ? void 0 : s.type) {
        i = t.getType(null == s ? void 0 : s.type);
      }
    }
    if (r && i && !a[r]) {
      a[r] = {
        detail: i.toString(),
        insertText: "$" === n.string ? r : "$" + r,
        label: r,
        type: i,
        kind: _t.Variable
      };
      r = null;
      i = null;
    }
  }));
  return objectValues(a);
}

function getTokenAtPosition(e, t, n = 0) {
  var r = null;
  var i = null;
  var a = null;
  var o = runOnlineParser$1(e, ((e, o, s, u) => {
    if (u !== t.line || e.getCurrentPosition() + n < t.character + 1) {
      return;
    }
    r = s;
    i = Object.assign({}, o);
    a = e.current();
    return "BREAK";
  }));
  return {
    start: o.start,
    end: o.end,
    string: a || o.string,
    state: i || o.state,
    style: r || o.style
  };
}

function runOnlineParser$1(n, r) {
  var i = n.split("\n");
  var a = t();
  var o = a.startState();
  var s = "";
  var u = new e("");
  for (var c = 0; c < i.length; c++) {
    u = new e(i[c]);
    while (!u.eol()) {
      if ("BREAK" === r(u, o, s = a.token(u, o), c)) {
        break;
      }
    }
    r(u, o, s, c);
    if (!o.kind) {
      o = a.startState();
    }
  }
  return {
    start: u.getStartOfToken(),
    end: u.getCurrentPosition(),
    string: u.current(),
    state: o,
    style: s
  };
}

function getTypeInfo(e, t) {
  var n;
  var r;
  var i;
  var a;
  var o;
  var s;
  var u;
  var c;
  var l;
  var d;
  var f;
  forEachState(t, (t => {
    var v;
    switch (t.kind) {
     case Dt.QUERY:
     case "ShortQuery":
      d = e.getQueryType();
      break;

     case Dt.MUTATION:
      d = e.getMutationType();
      break;

     case Dt.SUBSCRIPTION:
      d = e.getSubscriptionType();
      break;

     case Dt.INLINE_FRAGMENT:
     case Dt.FRAGMENT_DEFINITION:
      if (t.type) {
        d = e.getType(t.type);
      }
      break;

     case Dt.FIELD:
     case Dt.ALIASED_FIELD:
      if (!d || !t.name) {
        o = null;
      } else {
        o = l ? getFieldDef(e, l, t.name) : null;
        d = o ? o.type : null;
      }
      break;

     case Dt.SELECTION_SET:
      l = P(d);
      break;

     case Dt.DIRECTIVE:
      i = t.name ? e.getDirective(t.name) : null;
      break;

     case Dt.INTERFACE_DEF:
      if (t.name) {
        u = null;
        f = new K({
          name: t.name,
          interfaces: [],
          fields: {}
        });
      }
      break;

     case Dt.OBJECT_TYPE_DEF:
      if (t.name) {
        f = null;
        u = new z({
          name: t.name,
          interfaces: [],
          fields: {}
        });
      }
      break;

     case Dt.ARGUMENTS:
      if (t.prevState) {
        switch (t.prevState.kind) {
         case Dt.FIELD:
          r = o && o.args;
          break;

         case Dt.DIRECTIVE:
          r = i && i.args;
          break;

         case Dt.ALIASED_FIELD:
          var p = null === (v = t.prevState) || void 0 === v ? void 0 : v.name;
          if (!p) {
            r = null;
            break;
          }
          var g = l ? getFieldDef(e, l, p) : null;
          if (!g) {
            r = null;
            break;
          }
          r = g.args;
          break;

         default:
          r = null;
        }
      } else {
        r = null;
      }
      break;

     case Dt.ARGUMENT:
      if (r) {
        for (var m = 0; m < r.length; m++) {
          if (r[m].name === t.name) {
            n = r[m];
            break;
          }
        }
      }
      s = null == n ? void 0 : n.type;
      break;

     case Dt.ENUM_VALUE:
      var E = P(s);
      a = E instanceof j ? E.getValues().find((e => e.value === t.name)) : null;
      break;

     case Dt.LIST_VALUE:
      var h = q(s);
      s = h instanceof Z ? h.ofType : null;
      break;

     case Dt.OBJECT_VALUE:
      var T = P(s);
      c = T instanceof H ? T.getFields() : null;
      break;

     case Dt.OBJECT_FIELD:
      var y = t.name && c ? c[t.name] : null;
      s = null == y ? void 0 : y.type;
      break;

     case Dt.NAMED_TYPE:
      if (t.name) {
        d = e.getType(t.name);
      }
    }
  }));
  return {
    argDef: n,
    argDefs: r,
    directiveDef: i,
    enumValue: a,
    fieldDef: o,
    inputType: s,
    objectFieldDefs: c,
    parentType: l,
    type: d,
    interfaceDef: f,
    objectTypeDef: u
  };
}

var Ft;

!function(e) {
  e.TYPE_SYSTEM = "TYPE_SYSTEM";
  e.EXECUTABLE = "EXECUTABLE";
}(Ft || (Ft = {}));

function unwrapType(e) {
  if (e.prevState && e.kind && [ Dt.NAMED_TYPE, Dt.LIST_TYPE, Dt.TYPE, Dt.NON_NULL_TYPE ].includes(e.kind)) {
    return unwrapType(e.prevState);
  }
  return e;
}

function getHoverInformation(e, t, n, r, i) {
  var a = r || getTokenAtPosition(t, n);
  if (!e || !a || !a.state) {
    return "";
  }
  var {kind: o, step: s} = a.state;
  var u = getTypeInfo(e, a.state);
  var c = Object.assign(Object.assign({}, i), {
    schema: e
  });
  if ("Field" === o && 0 === s && u.fieldDef || "AliasedField" === o && 2 === s && u.fieldDef) {
    var l = [];
    renderMdCodeStart(l, c);
    !function renderField(e, t, n) {
      renderQualifiedField(e, t, n);
      renderTypeAnnotation(e, t, n, t.type);
    }(l, u, c);
    renderMdCodeEnd(l, c);
    renderDescription(l, c, u.fieldDef);
    return l.join("").trim();
  }
  if ("Directive" === o && 1 === s && u.directiveDef) {
    var d = [];
    renderMdCodeStart(d, c);
    renderDirective(d, u);
    renderMdCodeEnd(d, c);
    renderDescription(d, c, u.directiveDef);
    return d.join("").trim();
  }
  if ("Argument" === o && 0 === s && u.argDef) {
    var f = [];
    renderMdCodeStart(f, c);
    !function renderArg(e, t, n) {
      if (t.directiveDef) {
        renderDirective(e, t);
      } else if (t.fieldDef) {
        renderQualifiedField(e, t, n);
      }
      if (!t.argDef) {
        return;
      }
      var {name: r} = t.argDef;
      text(e, "(");
      text(e, r);
      renderTypeAnnotation(e, t, n, t.inputType);
      text(e, ")");
    }(f, u, c);
    renderMdCodeEnd(f, c);
    renderDescription(f, c, u.argDef);
    return f.join("").trim();
  }
  if ("EnumValue" === o && u.enumValue && "description" in u.enumValue) {
    var v = [];
    renderMdCodeStart(v, c);
    !function renderEnumValue(e, t, n) {
      if (!t.enumValue) {
        return;
      }
      var {name: r} = t.enumValue;
      renderType(e, t, n, t.inputType);
      text(e, ".");
      text(e, r);
    }(v, u, c);
    renderMdCodeEnd(v, c);
    renderDescription(v, c, u.enumValue);
    return v.join("").trim();
  }
  if ("NamedType" === o && u.type && "description" in u.type) {
    var p = [];
    renderMdCodeStart(p, c);
    renderType(p, u, c, u.type);
    renderMdCodeEnd(p, c);
    renderDescription(p, c, u.type);
    return p.join("").trim();
  }
  return "";
}

function renderMdCodeStart(e, t) {
  if (t.useMarkdown) {
    text(e, "```graphql\n");
  }
}

function renderMdCodeEnd(e, t) {
  if (t.useMarkdown) {
    text(e, "\n```");
  }
}

function renderQualifiedField(e, t, n) {
  if (!t.fieldDef) {
    return;
  }
  var r = t.fieldDef.name;
  if ("__" !== r.slice(0, 2)) {
    renderType(e, t, n, t.parentType);
    text(e, ".");
  }
  text(e, r);
}

function renderDirective(e, t, n) {
  if (!t.directiveDef) {
    return;
  }
  text(e, "@" + t.directiveDef.name);
}

function renderTypeAnnotation(e, t, n, r) {
  text(e, ": ");
  renderType(e, t, n, r);
}

function renderType(e, t, n, r) {
  if (!r) {
    return;
  }
  if (r instanceof ee) {
    renderType(e, t, n, r.ofType);
    text(e, "!");
  } else if (r instanceof Z) {
    text(e, "[");
    renderType(e, t, n, r.ofType);
    text(e, "]");
  } else {
    text(e, r.name);
  }
}

function renderDescription(e, t, n) {
  if (!n) {
    return;
  }
  var r = "string" == typeof n.description ? n.description : null;
  if (r) {
    text(e, "\n\n");
    text(e, r);
  }
  !function renderDeprecation(e, t, n) {
    if (!n) {
      return;
    }
    var r = n.deprecationReason || null;
    if (!r) {
      return;
    }
    text(e, "\n\n");
    text(e, "Deprecated: ");
    text(e, r);
  }(e, 0, n);
}

function text(e, t) {
  e.push(t);
}

class Cursor {
  constructor(e, t) {
    this.line = e;
    this.character = t;
  }
  setLine(e) {
    this.line = e;
  }
  setCharacter(e) {
    this.character = e;
  }
  lessThanOrEqualTo(e) {
    return this.line < e.line || this.line === e.line && this.character <= e.character;
  }
}

var getToken = (r, i) => {
  if (!n.isTemplateLiteral(r) && !n.isStringLiteralLike(r)) {
    return;
  }
  var a = r.getText().slice(1, -1).split("\n");
  var o = t();
  var s = o.startState();
  var u = r.getStart() + 1;
  var c = void 0;
  var l = void 0;
  for (var d = 0; d < a.length; d++) {
    if (c) {
      continue;
    }
    var f = u - 1;
    var v = new e(a[d] + "\n");
    while (!v.eol()) {
      var p = o.token(v, s);
      var g = v.current();
      if (f + v.getStartOfToken() + 1 <= i && f + v.getCurrentPosition() >= i) {
        c = l ? l : {
          line: d,
          start: v.getStartOfToken() + 1,
          end: v.getCurrentPosition(),
          string: g,
          state: s,
          tokenKind: p
        };
        break;
      } else if ("on" === g) {
        l = {
          line: d,
          start: v.getStartOfToken() + 1,
          end: v.getCurrentPosition(),
          string: g,
          state: s,
          tokenKind: p
        };
      } else if ("." === g || ".." === g) {
        l = {
          line: d,
          start: v.getStartOfToken() + 1,
          end: v.getCurrentPosition(),
          string: g,
          state: s,
          tokenKind: p
        };
      } else {
        l = void 0;
      }
    }
    u += a[d].length + 1;
  }
  return c;
};

function hintList(e, t) {
  return function filterAndSortList(e, t) {
    if (!t) {
      return filterNonEmpty(e, (e => !e.isDeprecated));
    }
    var n = e.map((e => ({
      proximity: getProximity(normalizeText(e.label), t),
      entry: e
    })));
    return filterNonEmpty(filterNonEmpty(n, (e => e.proximity <= 2)), (e => !e.entry.isDeprecated)).sort(((e, t) => (e.entry.isDeprecated ? 1 : 0) - (t.entry.isDeprecated ? 1 : 0) || e.proximity - t.proximity || e.entry.label.length - t.entry.label.length)).map((e => e.entry));
  }(t, normalizeText(e.string));
}

function filterNonEmpty(e, t) {
  var n = e.filter(t);
  return 0 === n.length ? e : n;
}

function normalizeText(e) {
  return e.toLowerCase().replace(/\W/g, "");
}

function getProximity(e, t) {
  var n = function lexicalDistance(e, t) {
    var n;
    var r;
    var i = [];
    var a = e.length;
    var o = t.length;
    for (n = 0; n <= a; n++) {
      i[n] = [ n ];
    }
    for (r = 1; r <= o; r++) {
      i[0][r] = r;
    }
    for (n = 1; n <= a; n++) {
      for (r = 1; r <= o; r++) {
        var s = e[n - 1] === t[r - 1] ? 0 : 1;
        i[n][r] = Math.min(i[n - 1][r] + 1, i[n][r - 1] + 1, i[n - 1][r - 1] + s);
        if (n > 1 && r > 1 && e[n - 1] === t[r - 2] && e[n - 2] === t[r - 1]) {
          i[n][r] = Math.min(i[n][r], i[n - 2][r - 2] + s);
        }
      }
    }
    return i[a][o];
  }(t, e);
  if (e.length > t.length) {
    n -= e.length - t.length - 1;
    n += 0 === e.indexOf(t) ? 0 : .5;
  }
  return n;
}

function getGraphQLCompletions(e, t, v, p) {
  var g = p.config.templateIsCallExpression ?? !0;
  var m = p.languageService.getProgram()?.getTypeChecker();
  var E = r(p, e);
  if (!E) {
    return;
  }
  var h = i(E, t);
  if (!h) {
    return;
  }
  h = g ? a(h) : o(h);
  var T, y, I;
  if (g && s(h, m)) {
    var b = u(h, m);
    I = b && v.multi[b] ? v.multi[b]?.schema : v.current?.schema;
    var S = getToken(h.arguments[0], t);
    if (!I || !S || "." === S.string || ".." === S.string) {
      return;
    }
    T = `${h.arguments[0].getText().slice(1, -1)}\n${c(e, h, p).map((e => l(e))).join("\n")}`;
    y = new Cursor(S.line, S.start - 1);
  } else if (!g && d(h)) {
    var _ = getToken(h.template, t);
    if (!_ || !v.current || "." === _.string || ".." === _.string) {
      return;
    }
    var {combinedText: D, resolvedSpans: N} = f(h, e, p);
    var F = N.filter((e => e.original.start < t && e.original.start + e.original.length < t)).reduce(((e, t) => e + (t.lines - 1)), 0);
    _.line = _.line + F;
    T = D;
    y = new Cursor(_.line, _.start - 1);
    I = v.current.schema;
  } else {
    return;
  }
  var [C, L] = function getSuggestionsInternal(e, t, n) {
    var r = getTokenAtPosition(t, n);
    var i = [];
    try {
      i = Q(t, {
        noLocation: !0
      }).definitions.filter((e => e.kind === k.FRAGMENT_DEFINITION));
    } catch (e) {}
    var a = "on" === r.string && "TypeCondition" === r.state.kind;
    var o = getAutocompleteSuggestions(e, t, n, a ? {
      ...r,
      state: {
        ...r.state,
        step: 1
      },
      type: null
    } : void 0);
    var s = !a ? function getSuggestionsForFragmentSpread(e, t, n, r, i) {
      if (!r) {
        return [];
      }
      var a = n.getTypeMap();
      var o = getDefinitionState(e.state);
      return hintList(e, i.filter((e => a[e.typeCondition.name.value] && !(o && o.kind === Dt.FRAGMENT_DEFINITION && o.name === e.name.value) && A(t.parentType) && A(a[e.typeCondition.name.value]) && $(n, t.parentType, a[e.typeCondition.name.value]))).map((e => ({
        label: e.name.value,
        detail: String(a[e.typeCondition.name.value]),
        documentation: `fragment ${e.name.value} on ${e.typeCondition.name.value}`,
        kind: _t.Field,
        type: a[e.typeCondition.name.value]
      }))));
    }(r, getTypeInfo(e, r.state), e, t, i) : [];
    var u = "Invalid" === r.state.kind ? r.state.prevState : r.state;
    var c = getParentDefinition(r.state, Dt.FIELD)?.name;
    if (u && c) {
      var {kind: l} = u;
      if (l === Dt.ARGUMENTS || l === Dt.ARGUMENT) {
        var d = new Set;
        runOnlineParser(t, ((e, t) => {
          if (t.kind === Dt.ARGUMENT) {
            var n = getParentDefinition(t, Dt.FIELD);
            if (c && t.name && n?.name === c) {
              d.add(t.name);
            }
          }
        }));
        o = o.filter((e => !d.has(e.label)));
      }
      if (l === Dt.SELECTION_SET || l === Dt.FIELD || l === Dt.ALIASED_FIELD) {
        var f = new Set;
        var v = getUsedFragments(t, c);
        runOnlineParser(t, ((e, t) => {
          if (t.kind === Dt.FIELD || t.kind === Dt.ALIASED_FIELD) {
            var n = getParentDefinition(t, Dt.FIELD);
            if (n && n.name === c && t.name) {
              f.add(t.name);
            }
          }
        }));
        o = o.filter((e => !f.has(e.label)));
        s = s.filter((e => !v.has(e.label)));
      }
      if (l === Dt.FRAGMENT_SPREAD) {
        var p = getUsedFragments(t, c);
        o = o.filter((e => !p.has(e.label)));
        s = s.filter((e => !p.has(e.label)));
      }
    }
    return [ o, s ];
  }(I, T, y);
  return {
    isGlobalCompletion: !1,
    isMemberCompletion: !1,
    isNewIdentifierLocation: !1,
    entries: [ ...C.map((e => ({
      ...e,
      kind: n.ScriptElementKind.variableElement,
      name: e.label,
      kindModifiers: "declare",
      sortText: e.sortText || "0",
      labelDetails: {
        detail: e.type ? " " + e.type?.toString() : void 0,
        description: e.documentation
      }
    }))), ...L.map((e => ({
      ...e,
      kind: n.ScriptElementKind.variableElement,
      name: e.label,
      insertText: "..." + e.label,
      kindModifiers: "declare",
      sortText: "0",
      labelDetails: {
        description: e.documentation
      }
    }))) ]
  };
}

function getUsedFragments(e, t) {
  var n = new Set;
  runOnlineParser(e, ((e, r) => {
    if (r.kind === Dt.FRAGMENT_SPREAD && r.name) {
      var i = getParentDefinition(r, Dt.FIELD);
      if (t && i?.name === t) {
        n.add(r.name);
      }
    }
  }));
  return n;
}

function getParentDefinition(e, t) {
  if (e.prevState?.kind === t) {
    return e.prevState;
  }
  if (e.prevState?.prevState?.kind === t) {
    return e.prevState.prevState;
  }
  if (e.prevState?.prevState?.prevState?.kind === t) {
    return e.prevState.prevState.prevState;
  }
  if (e.prevState?.prevState?.prevState?.prevState?.kind === t) {
    return e.prevState.prevState.prevState.prevState;
  }
}

function runOnlineParser(n, r) {
  var i = n.split("\n");
  var a = t();
  var o = a.startState();
  var s = "";
  var u = new e("");
  for (var c = 0; c < i.length; c++) {
    u = new e(i[c]);
    while (!u.eol()) {
      if ("BREAK" === r(u, o, s = a.token(u, o), c)) {
        break;
      }
    }
    r(u, o, s, c);
    if (!o.kind) {
      o = a.startState();
    }
  }
  return {
    start: u.getStartOfToken(),
    end: u.getCurrentPosition(),
    string: u.current(),
    state: o,
    style: s
  };
}

function create(e) {
  var logger = t => e.project.projectService.logger.info(`[GraphQLSP] ${t}`);
  var t = e.config;
  logger("config: " + JSON.stringify(t));
  if (!t.schema && !t.schemas) {
    logger('Missing "schema" option in configuration.');
    throw new Error("Please provide a GraphQL Schema!");
  }
  logger("Setting up the GraphQL Plugin");
  if (t.template) {
    p.add(t.template);
  }
  var c = function createBasicDecorator(e) {
    var t = Object.create(null);
    var _loop = function() {
      var r = e.languageService[n];
      t[n] = (...t) => r.apply(e.languageService, t);
    };
    for (var n of Object.keys(e.languageService)) {
      _loop();
    }
    return t;
  }(e);
  var l = ((e, t, n) => {
    var r = y(t);
    (async () => {
      var i = await I(e.project.getProjectName()) || T.dirname(e.project.getProjectName());
      var a = e.config.tadaDisablePreprocessing ?? !1;
      var o = e.config.tadaOutputLocation && T.resolve(i, e.config.tadaOutputLocation);
      n("Got root-directory to resolve schema from: " + i);
      n('Resolving schema from "schema" config: ' + JSON.stringify(t));
      try {
        n("Loading schema...");
        await r.load({
          rootPath: i
        });
      } catch (e) {
        n(`Failed to load schema: ${e}`);
      }
      if (r.current) {
        if (r.current && void 0 !== r.current.tadaOutputLocation) {
          saveTadaIntrospection(r.current.introspection, o, a, n);
        }
      } else if (r.multi) {
        Object.values(r.multi).forEach((e => {
          if (!e) {
            return;
          }
          if (e.tadaOutputLocation) {
            saveTadaIntrospection(e.introspection, T.resolve(i, e.tadaOutputLocation), a, n);
          }
        }));
      }
      r.autoupdate({
        rootPath: i
      }, ((e, t) => {
        if (!t) {
          return;
        }
        if (t.tadaOutputLocation) {
          var r = e.multi ? e.multi[t.name] : e.current;
          if (!r) {
            return;
          }
          saveTadaIntrospection(r.introspection, T.resolve(i, t.tadaOutputLocation), a, n);
        }
      }));
    })();
    return r;
  })(e, t, logger);
  c.getSemanticDiagnostics = t => {
    var n = e.languageService.getSemanticDiagnostics(t);
    if (n.some((e => g.includes(e.code)))) {
      return n;
    }
    var r = m(t, l, e);
    return r ? [ ...r, ...n ] : n;
  };
  c.getCompletionsAtPosition = (t, n, r) => {
    var i = getGraphQLCompletions(t, n, l, e);
    if (i && i.entries.length) {
      return i;
    } else {
      return e.languageService.getCompletionsAtPosition(t, n, r) || {
        isGlobalCompletion: !1,
        isMemberCompletion: !1,
        isNewIdentifierLocation: !1,
        entries: []
      };
    }
  };
  c.getEditsForRefactor = (t, n, r, i, a, o, s) => {
    var u = e.languageService.getEditsForRefactor(t, n, r, i, a, o, s);
    var c = E(t, "number" == typeof r ? r : r.pos, e);
    if (!c) {
      return u;
    }
    return {
      edits: [ {
        fileName: t,
        textChanges: [ {
          newText: c.replacement,
          span: c.span
        } ]
      } ]
    };
  };
  c.getApplicableRefactors = (t, n, r, i, a, o) => {
    var s = e.languageService.getApplicableRefactors(t, n, r, i, a, o);
    if (E(t, "number" == typeof n ? n : n.pos, e)) {
      return [ {
        name: "GraphQL",
        description: "Operations specific to gql.tada!",
        actions: [ {
          name: "Insert document-id",
          description: "Generate a document-id for your persisted-operation, by default a SHA256 hash."
        } ],
        inlineable: !0
      }, ...s ];
    } else {
      return s;
    }
  };
  c.getQuickInfoAtPosition = (t, c) => {
    var v = function getGraphQLQuickInfo(e, t, c, l) {
      var v = l.config.templateIsCallExpression ?? !0;
      var p = l.languageService.getProgram()?.getTypeChecker();
      var g = r(l, e);
      if (!g) {
        return;
      }
      var m = i(g, t);
      if (!m) {
        return;
      }
      m = v ? a(m) : o(m);
      var E, h, T;
      if (v && s(m, p)) {
        var y = l.languageService.getProgram()?.getTypeChecker();
        var I = u(m, y);
        T = I && c.multi[I] ? c.multi[I]?.schema : c.current?.schema;
        var b = getToken(m.arguments[0], t);
        if (!T || !b) {
          return;
        }
        h = m.arguments[0].getText();
        E = new Cursor(b.line, b.start - 1);
      } else if (!v && d(m)) {
        var S = getToken(m.template, t);
        if (!S || !c.current) {
          return;
        }
        var {combinedText: _, resolvedSpans: D} = f(m, e, l);
        var N = D.filter((e => e.original.start < t && e.original.start + e.original.length < t)).reduce(((e, t) => e + (t.lines - 1)), 0);
        S.line = S.line + N;
        h = _;
        E = new Cursor(S.line, S.start - 1);
        T = c.current.schema;
      } else {
        return;
      }
      var A = getHoverInformation(T, h, E);
      return {
        kind: n.ScriptElementKind.label,
        textSpan: {
          start: t,
          length: 1
        },
        kindModifiers: "text",
        documentation: Array.isArray(A) ? A.map((e => ({
          kind: "text",
          text: e
        }))) : [ {
          kind: "text",
          text: A
        } ]
      };
    }(t, c, l, e);
    if (v) {
      return v;
    }
    return e.languageService.getQuickInfoAtPosition(t, c);
  };
  logger("proxy: " + JSON.stringify(c));
  return c;
}

var init = e => {
  v(e);
  return {
    create
  };
};

export { init as default };
//# sourceMappingURL=graphqlsp.mjs.map
