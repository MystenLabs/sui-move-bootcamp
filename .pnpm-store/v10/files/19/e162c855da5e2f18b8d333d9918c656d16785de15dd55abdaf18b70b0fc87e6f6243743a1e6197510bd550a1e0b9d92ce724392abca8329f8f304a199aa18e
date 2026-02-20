var e = require("typescript");

var r = require("node:path");

var a = require("@gql.tada/internal");

var i = require("@0no-co/graphqlsp/api");

var t = require("./index-chunk2.js");

var n = require("./index-chunk.js");

function _interopNamespaceDefault(e) {
  var r = Object.create(null);
  if (e) {
    Object.keys(e).forEach((function(a) {
      if ("default" !== a) {
        var i = Object.getOwnPropertyDescriptor(e, a);
        Object.defineProperty(r, a, i.get ? i : {
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

var o = _interopNamespaceDefault(r);

var l = t.expose((async function* _runDiagnostics(r) {
  var t = o.dirname(r.configPath);
  var l = n.programFactory(r);
  var s = l.createExternalFiles();
  if (s.length) {
    yield {
      kind: "EXTERNAL_WARNING"
    };
    await l.addVirtualFiles(s);
  }
  var g = await a.loadRef(r.pluginConfig).load({
    rootPath: t
  });
  var c = l.build();
  var f = c.buildPluginInfo(r.pluginConfig);
  var u = c.getSourceFiles();
  yield {
    kind: "FILE_COUNT",
    fileCount: u.length
  };
  for (var d of u) {
    var v = d.fileName.endsWith(".vue.ts") || d.fileName.endsWith(".svelte.ts");
    var h = d.fileName;
    f.config = {
      ...f.config,
      shouldCheckForColocatedFragments: v ? !1 : f.config.shouldCheckForColocatedFragments ?? !1,
      trackFieldUsage: v ? !1 : f.config.trackFieldUsage ?? !1
    };
    var p = i.getGraphQLDiagnostics(h, g, f);
    var m = [];
    if (p && p.length) {
      for (var y of p) {
        if (!("messageText" in y) || "string" != typeof y.messageText || !y.file) {
          continue;
        }
        var C = "info";
        if (y.category === e.DiagnosticCategory.Error) {
          C = "error";
        } else if (y.category === e.DiagnosticCategory.Warning) {
          C = "warn";
        }
        var F = c.getSourcePosition(d, {
          start: y.start || 1,
          length: y.length || 1
        });
        h = F.fileName;
        m.push({
          severity: C,
          message: y.messageText,
          file: F.fileName,
          line: F.line,
          col: F.col,
          endLine: F.endLine,
          endColumn: F.endColumn
        });
      }
    }
    yield {
      kind: "FILE_DIAGNOSTICS",
      filePath: h,
      messages: m
    };
  }
}));

exports.runDiagnostics = l;
//# sourceMappingURL=thread-chunk3.js.map
