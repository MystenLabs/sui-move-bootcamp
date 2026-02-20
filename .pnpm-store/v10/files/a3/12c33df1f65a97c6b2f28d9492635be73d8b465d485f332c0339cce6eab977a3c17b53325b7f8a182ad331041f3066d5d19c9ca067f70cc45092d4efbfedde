import e from "typescript";

import * as i from "node:path";

import { loadRef as a } from "@gql.tada/internal";

import { getGraphQLDiagnostics as r } from "@0no-co/graphqlsp/api";

import { e as o } from "./index-chunk2.mjs";

import { p as n } from "./index-chunk.mjs";

var t = o((async function* _runDiagnostics(o) {
  var t = i.dirname(o.configPath);
  var l = n(o);
  var s = l.createExternalFiles();
  if (s.length) {
    yield {
      kind: "EXTERNAL_WARNING"
    };
    await l.addVirtualFiles(s);
  }
  var g = await a(o.pluginConfig).load({
    rootPath: t
  });
  var f = l.build();
  var m = f.buildPluginInfo(o.pluginConfig);
  var c = f.getSourceFiles();
  yield {
    kind: "FILE_COUNT",
    fileCount: c.length
  };
  for (var d of c) {
    var u = d.fileName.endsWith(".vue.ts") || d.fileName.endsWith(".svelte.ts");
    var h = d.fileName;
    m.config = {
      ...m.config,
      shouldCheckForColocatedFragments: u ? !1 : m.config.shouldCheckForColocatedFragments ?? !1,
      trackFieldUsage: u ? !1 : m.config.trackFieldUsage ?? !1
    };
    var v = r(h, g, m);
    var p = [];
    if (v && v.length) {
      for (var C of v) {
        if (!("messageText" in C) || "string" != typeof C.messageText || !C.file) {
          continue;
        }
        var y = "info";
        if (C.category === e.DiagnosticCategory.Error) {
          y = "error";
        } else if (C.category === e.DiagnosticCategory.Warning) {
          y = "warn";
        }
        var F = f.getSourcePosition(d, {
          start: C.start || 1,
          length: C.length || 1
        });
        h = F.fileName;
        p.push({
          severity: y,
          message: C.messageText,
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
      messages: p
    };
  }
}));

export { t as runDiagnostics };
//# sourceMappingURL=thread-chunk3.mjs.map
