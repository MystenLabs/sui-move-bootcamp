import e from "typescript";

import * as r from "node:path";

import { getSchemaNamesFromConfig as a } from "@gql.tada/internal";

import { findAllCallExpressions as t } from "@0no-co/graphqlsp/api";

import { e as i } from "./index-chunk2.mjs";

import { p as o } from "./index-chunk.mjs";

function traceCallToImportSource(r, a, t) {
  var i = t.getTypeChecker();
  var o = r.expression;
  var s;
  if (e.isIdentifier(o)) {
    s = o;
  } else if (e.isPropertyAccessExpression(o) && e.isIdentifier(o.expression)) {
    s = o.expression;
  }
  if (!s) {
    return;
  }
  var n = i.getSymbolAtLocation(s);
  if (!n || !n.declarations) {
    return;
  }
  for (var l of n.declarations) {
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
  var s = e.resolveModuleName(r, a.fileName, i, o);
  if (s.resolvedModule) {
    return s.resolvedModule.resolvedFileName;
  }
  return;
}

function collectImportsFromSourceFile(a, t, i, o, s) {
  var n = [];
  var l = function getTadaOutputPaths(e) {
    var r = [];
    if ("schema" in e && e.tadaOutputLocation) {
      r.push(e.tadaOutputLocation);
    }
    return r;
  }(t);
  !function visit(t) {
    if (e.isImportDeclaration(t) && e.isStringLiteral(t.moduleSpecifier)) {
      var u = t.moduleSpecifier.text;
      if (!function isTadaImport(e, a, t) {
        if (e.startsWith(".")) {
          var i = r.dirname(a);
          var o = r.resolve(i, e);
          return t.some((e => {
            var a = r.resolve(e);
            return o === a || o.startsWith(a + r.sep);
          }));
        }
        return t.some((r => e === r || e.startsWith(r + "/")));
      }(u, a.fileName, l)) {
        var c = t.getFullText().trim();
        if (o) {
          var p = i(u, a.fileName, o);
          if (s) {
            if (p.endsWith(".ts") || p.endsWith(".tsx")) {
              p = p.replace(/\.ts$/, ".js").replace(/\.tsx$/, ".js");
            }
          } else {
            p = p.replace(/\.ts$/, "").replace(/\.tsx$/, "");
          }
          if (p && !p.includes("gql.tada")) {
            n.push({
              specifier: p,
              importClause: c.replace(u, p)
            });
          }
        } else {
          n.push({
            specifier: u,
            importClause: c
          });
        }
      }
    }
    e.forEachChild(t, visit);
  }(a);
  return n;
}

var s = i((async function* _runTurbo(r) {
  var i = a(r.pluginConfig);
  var s = o(r);
  s.addSourceFile({
    fileId: "__gql-tada-override__.d.ts",
    sourceText: l,
    scriptKind: e.ScriptKind.TS
  });
  var u = s.createExternalFiles();
  if (u.length) {
    yield {
      kind: "EXTERNAL_WARNING"
    };
    await s.addVirtualFiles(u);
  }
  var c = s.build();
  var p = c.buildPluginInfo(r.pluginConfig);
  var m = c.getSourceFiles();
  yield {
    kind: "FILE_COUNT",
    fileCount: m.length
  };
  var d = c.program.getTypeChecker();
  var f = new Map;
  for (var v of m) {
    var g = v.fileName;
    var h = [];
    var y = [];
    var T = t(v, p, !1).nodes;
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
      var l = traceCallToImportSource(t, v, c.program);
      if (l && !f.has(l)) {
        var u = c.program.getSourceFile(l);
        if (u) {
          var p = Array.isArray(r.turboOutputPath) ? r.turboOutputPath.find((e => e.schemaName === a.schema))?.path : r.turboOutputPath;
          var m = collectImportsFromSourceFile(u, r.pluginConfig, s.resolveModuleName.bind(s), p, !!s.wasOriginallyNodeNext);
          f.set(l, {
            absolutePath: l,
            imports: m
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
      var S = "value" in F && "string" == typeof F.value && !(F.flags & e.TypeFlags.StringLiteral) ? JSON.stringify(F.value) : d.typeToString(F, t, n);
      var N = d.typeToString(T, t, n);
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
  if (f.size > 0) {
    yield {
      kind: "GRAPHQL_SOURCES",
      sources: Array.from(f.values())
    };
  }
}));

var n = e.TypeFormatFlags.NoTruncation | e.TypeFormatFlags.NoTypeReduction | e.TypeFormatFlags.InTypeAlias | e.TypeFormatFlags.UseFullyQualifiedType | e.TypeFormatFlags.GenerateNamesForShadowedTypeParams | e.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope | e.TypeFormatFlags.AllowUniqueESSymbolType | e.TypeFormatFlags.WriteTypeArgumentsOfSignature;

var l = "\nimport * as _gqlTada from 'gql.tada';\ndeclare module 'gql.tada' {\n  interface setupCache {\n    readonly __cacheDisabled: true;\n  }\n}\n".trim();

export { s as runTurbo };
//# sourceMappingURL=thread-chunk2.mjs.map
