var e = require("typescript");

var r = require("node:path");

var a = require("@gql.tada/internal");

var t = require("@0no-co/graphqlsp/api");

var i = require("./index-chunk2.js");

var o = require("./index-chunk.js");

function _interopNamespaceDefault(e) {
  var r = Object.create(null);
  if (e) {
    Object.keys(e).forEach((function(a) {
      if ("default" !== a) {
        var t = Object.getOwnPropertyDescriptor(e, a);
        Object.defineProperty(r, a, t.get ? t : {
          enumerable: !0,
          get: function() {
            return e[a];
          }
        });
      }
    }));
  }
  r.default = e;
  return r;
}

var n = _interopNamespaceDefault(r);

function traceCallToImportSource(r, a, t) {
  var i = t.getTypeChecker();
  var o = r.expression;
  var n;
  if (e.isIdentifier(o)) {
    n = o;
  } else if (e.isPropertyAccessExpression(o) && e.isIdentifier(o.expression)) {
    n = o.expression;
  }
  if (!n) {
    return;
  }
  var s = i.getSymbolAtLocation(n);
  if (!s || !s.declarations) {
    return;
  }
  for (var l of s.declarations) {
    var u = findImportDeclaration(l);
    if (u && e.isStringLiteral(u.moduleSpecifier)) {
      return resolveModulePath(u.moduleSpecifier.text, a, t);
    }
  }
  return;
}

function findImportDeclaration(r) {
  var a = r;
  while (a) {
    if (e.isImportDeclaration(a)) {
      return a;
    }
    a = a.parent;
  }
  return;
}

function resolveModulePath(r, a, t) {
  var i = t.getCompilerOptions();
  var o = e.createCompilerHost(i);
  var n = e.resolveModuleName(r, a.fileName, i, o);
  if (n.resolvedModule) {
    return n.resolvedModule.resolvedFileName;
  }
  return;
}

function collectImportsFromSourceFile(r, a, t, i, o) {
  var s = [];
  var l = function getTadaOutputPaths(e) {
    var r = [];
    if ("schema" in e && e.tadaOutputLocation) {
      r.push(e.tadaOutputLocation);
    }
    return r;
  }(a);
  !function visit(a) {
    if (e.isImportDeclaration(a) && e.isStringLiteral(a.moduleSpecifier)) {
      var u = a.moduleSpecifier.text;
      if (!function isTadaImport(e, r, a) {
        if (e.startsWith(".")) {
          var t = n.dirname(r);
          var i = n.resolve(t, e);
          return a.some((e => {
            var r = n.resolve(e);
            return i === r || i.startsWith(r + n.sep);
          }));
        }
        return a.some((r => e === r || e.startsWith(r + "/")));
      }(u, r.fileName, l)) {
        var c = a.getFullText().trim();
        if (i) {
          var p = t(u, r.fileName, i);
          if (o) {
            if (p.endsWith(".ts") || p.endsWith(".tsx")) {
              p = p.replace(/\.ts$/, ".js").replace(/\.tsx$/, ".js");
            }
          } else {
            p = p.replace(/\.ts$/, "").replace(/\.tsx$/, "");
          }
          if (p && !p.includes("gql.tada")) {
            s.push({
              specifier: p,
              importClause: c.replace(u, p)
            });
          }
        } else {
          s.push({
            specifier: u,
            importClause: c
          });
        }
      }
    }
    e.forEachChild(a, visit);
  }(r);
  return s;
}

var s = i.expose((async function* _runTurbo(r) {
  var i = a.getSchemaNamesFromConfig(r.pluginConfig);
  var n = o.programFactory(r);
  n.addSourceFile({
    fileId: "__gql-tada-override__.d.ts",
    sourceText: u,
    scriptKind: e.ScriptKind.TS
  });
  var s = n.createExternalFiles();
  if (s.length) {
    yield {
      kind: "EXTERNAL_WARNING"
    };
    await n.addVirtualFiles(s);
  }
  var c = n.build();
  var p = c.buildPluginInfo(r.pluginConfig);
  var f = c.getSourceFiles();
  yield {
    kind: "FILE_COUNT",
    fileCount: f.length
  };
  var d = c.program.getTypeChecker();
  var m = new Map;
  for (var v of f) {
    var g = v.fileName;
    var h = [];
    var y = [];
    var T = t.findAllCallExpressions(v, p, !1).nodes;
    var _loop = async function*(a) {
      var t = a.node.parent;
      if (!e.isCallExpression(t)) {
        return 0;
      }
      var o = c.getSourcePosition(v, t.getStart());
      g = o.fileName;
      if (!i.has(a.schema)) {
        y.push({
          message: a.schema ? `The '${a.schema}' schema is not in the configuration but was referenced by document.` : i.size > 1 ? "The document is not for a known schema. Have you re-generated the output file?" : "Multiple schemas are configured, but the document is not for a specific schema.",
          file: o.fileName,
          line: o.line,
          col: o.col
        });
        return 0;
      }
      var s = traceCallToImportSource(t, v, c.program);
      if (s && !m.has(s)) {
        var u = c.program.getSourceFile(s);
        if (u) {
          var p = Array.isArray(r.turboOutputPath) ? r.turboOutputPath.find((e => e.schemaName === a.schema))?.path : r.turboOutputPath;
          var f = collectImportsFromSourceFile(u, r.pluginConfig, n.resolveModuleName.bind(n), p, !!n.wasOriginallyNodeNext);
          m.set(s, {
            absolutePath: s,
            imports: f
          });
        }
      }
      var T = d.getTypeAtLocation(t);
      var F = d.getTypeAtLocation(a.node);
      if (!T.symbol || "TadaDocumentNode" !== T.symbol.getEscapedName()) {
        y.push({
          message: 'The discovered document is not of type "TadaDocumentNode".\nIf this is unexpected, please file an issue describing your case.',
          file: o.fileName,
          line: o.line,
          col: o.col
        });
        return 0;
      }
      var S = "value" in F && "string" == typeof F.value && !(F.flags & e.TypeFlags.StringLiteral) ? JSON.stringify(F.value) : d.typeToString(F, t, l);
      var N = d.typeToString(T, t, l);
      h.push({
        schemaName: a.schema,
        argumentKey: S,
        documentType: N
      });
    };
    for (var F of T) {
      if (0 === (yield* _loop(F))) {
        continue;
      }
    }
    yield {
      kind: "FILE_TURBO",
      filePath: g,
      documents: h,
      warnings: y
    };
  }
  if (m.size > 0) {
    yield {
      kind: "GRAPHQL_SOURCES",
      sources: Array.from(m.values())
    };
  }
}));

var l = e.TypeFormatFlags.NoTruncation | e.TypeFormatFlags.NoTypeReduction | e.TypeFormatFlags.InTypeAlias | e.TypeFormatFlags.UseFullyQualifiedType | e.TypeFormatFlags.GenerateNamesForShadowedTypeParams | e.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope | e.TypeFormatFlags.AllowUniqueESSymbolType | e.TypeFormatFlags.WriteTypeArgumentsOfSignature;

var u = "\nimport * as _gqlTada from 'gql.tada';\ndeclare module 'gql.tada' {\n  interface setupCache {\n    readonly __cacheDisabled: true;\n  }\n}\n".trim();

exports.runTurbo = s;
//# sourceMappingURL=thread-chunk2.js.map
