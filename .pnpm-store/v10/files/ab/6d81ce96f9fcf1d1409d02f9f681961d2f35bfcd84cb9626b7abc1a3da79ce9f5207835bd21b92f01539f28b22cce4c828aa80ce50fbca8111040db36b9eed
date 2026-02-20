import * as e from "node:path";

import r from "node:path";

import a from "typescript";

import { GraphQLSchema as n, GraphQLObjectType as t, GraphQLID as i, executeSync as o, buildClientSchema as s, buildSchema as u } from "graphql";

import { Kind as l, GraphQLError as c, parse as d, print as f, OperationTypeNode as p } from "@0no-co/graphql.web";

import * as m from "node:fs/promises";

import v from "node:fs/promises";

import { createRequire as y } from "node:module";

var teardownPlaceholder = () => {};

var h = teardownPlaceholder;

function start(e) {
  return {
    tag: 0,
    0: e
  };
}

function push(e) {
  return {
    tag: 1,
    0: e
  };
}

var asyncIteratorSymbol = () => "function" == typeof Symbol && Symbol.asyncIterator || "@@asyncIterator";

var identity = e => e;

function filter(e) {
  return r => a => {
    var n = h;
    r((r => {
      if (0 === r) {
        a(0);
      } else if (0 === r.tag) {
        n = r[0];
        a(r);
      } else if (!e(r[0])) {
        n(0);
      } else {
        a(r);
      }
    }));
  };
}

function map(e) {
  return r => a => r((r => {
    if (0 === r || 0 === r.tag) {
      a(r);
    } else {
      a(push(e(r[0])));
    }
  }));
}

function mergeMap(e) {
  return r => a => {
    var n = [];
    var t = h;
    var i = !1;
    var o = !1;
    r((r => {
      if (o) {} else if (0 === r) {
        o = !0;
        if (!n.length) {
          a(0);
        }
      } else if (0 === r.tag) {
        t = r[0];
      } else {
        i = !1;
        !function applyInnerSource(e) {
          var r = h;
          e((e => {
            if (0 === e) {
              if (n.length) {
                var s = n.indexOf(r);
                if (s > -1) {
                  (n = n.slice()).splice(s, 1);
                }
                if (!n.length) {
                  if (o) {
                    a(0);
                  } else if (!i) {
                    i = !0;
                    t(0);
                  }
                }
              }
            } else if (0 === e.tag) {
              n.push(r = e[0]);
              r(0);
            } else if (n.length) {
              a(e);
              r(0);
            }
          }));
        }(e(r[0]));
        if (!i) {
          i = !0;
          t(0);
        }
      }
    }));
    a(start((e => {
      if (1 === e) {
        if (!o) {
          o = !0;
          t(1);
        }
        for (var r = 0, a = n, s = n.length; r < s; r++) {
          a[r](1);
        }
        n.length = 0;
      } else {
        if (!o && !i) {
          i = !0;
          t(0);
        } else {
          i = !1;
        }
        for (var u = 0, l = n, c = n.length; u < c; u++) {
          l[u](0);
        }
      }
    })));
  };
}

function merge(e) {
  return function mergeAll(e) {
    return mergeMap(identity)(e);
  }(E(e));
}

function onEnd(e) {
  return r => a => {
    var n = !1;
    r((r => {
      if (n) {} else if (0 === r) {
        n = !0;
        a(0);
        e();
      } else if (0 === r.tag) {
        var t = r[0];
        a(start((r => {
          if (1 === r) {
            n = !0;
            t(1);
            e();
          } else {
            t(r);
          }
        })));
      } else {
        a(r);
      }
    }));
  };
}

function onPush(e) {
  return r => a => {
    var n = !1;
    r((r => {
      if (n) {} else if (0 === r) {
        n = !0;
        a(0);
      } else if (0 === r.tag) {
        var t = r[0];
        a(start((e => {
          if (1 === e) {
            n = !0;
          }
          t(e);
        })));
      } else {
        e(r[0]);
        a(r);
      }
    }));
  };
}

function onStart(e) {
  return r => a => r((r => {
    if (0 === r) {
      a(0);
    } else if (0 === r.tag) {
      a(r);
      e();
    } else {
      a(r);
    }
  }));
}

function share(e) {
  var r = [];
  var a = h;
  var n = !1;
  return t => {
    r.push(t);
    if (1 === r.length) {
      e((e => {
        if (0 === e) {
          for (var t = 0, i = r, o = r.length; t < o; t++) {
            i[t](0);
          }
          r.length = 0;
        } else if (0 === e.tag) {
          a = e[0];
        } else {
          n = !1;
          for (var s = 0, u = r, l = r.length; s < l; s++) {
            u[s](e);
          }
        }
      }));
    }
    t(start((e => {
      if (1 === e) {
        var i = r.indexOf(t);
        if (i > -1) {
          (r = r.slice()).splice(i, 1);
        }
        if (!r.length) {
          a(1);
        }
      } else if (!n) {
        n = !0;
        a(0);
      }
    })));
  };
}

function switchMap(e) {
  return r => a => {
    var n = h;
    var t = h;
    var i = !1;
    var o = !1;
    var s = !1;
    var u = !1;
    r((r => {
      if (u) {} else if (0 === r) {
        u = !0;
        if (!s) {
          a(0);
        }
      } else if (0 === r.tag) {
        n = r[0];
      } else {
        if (s) {
          t(1);
          t = h;
        }
        if (!i) {
          i = !0;
          n(0);
        } else {
          i = !1;
        }
        !function applyInnerSource(e) {
          s = !0;
          e((e => {
            if (!s) {} else if (0 === e) {
              s = !1;
              if (u) {
                a(0);
              } else if (!i) {
                i = !0;
                n(0);
              }
            } else if (0 === e.tag) {
              o = !1;
              (t = e[0])(0);
            } else {
              a(e);
              if (!o) {
                t(0);
              } else {
                o = !1;
              }
            }
          }));
        }(e(r[0]));
      }
    }));
    a(start((e => {
      if (1 === e) {
        if (!u) {
          u = !0;
          n(1);
        }
        if (s) {
          s = !1;
          t(1);
        }
      } else {
        if (!u && !i) {
          i = !0;
          n(0);
        }
        if (s && !o) {
          o = !0;
          t(0);
        }
      }
    })));
  };
}

function take(e) {
  return r => a => {
    var n = h;
    var t = !1;
    var i = 0;
    r((r => {
      if (t) {} else if (0 === r) {
        t = !0;
        a(0);
      } else if (0 === r.tag) {
        n = r[0];
      } else if (i++ < e) {
        a(r);
        if (!t && i >= e) {
          t = !0;
          a(0);
          n(1);
        }
      } else {
        a(r);
      }
    }));
    a(start((r => {
      if (1 === r && !t) {
        t = !0;
        n(1);
      } else if (0 === r && !t && i < e) {
        n(0);
      }
    })));
  };
}

function takeUntil(e) {
  return r => a => {
    var n = h;
    var t = h;
    var i = !1;
    r((r => {
      if (i) {} else if (0 === r) {
        i = !0;
        t(1);
        a(0);
      } else if (0 === r.tag) {
        n = r[0];
        e((e => {
          if (0 === e) {} else if (0 === e.tag) {
            (t = e[0])(0);
          } else {
            i = !0;
            t(1);
            n(1);
            a(0);
          }
        }));
      } else {
        a(r);
      }
    }));
    a(start((e => {
      if (1 === e && !i) {
        i = !0;
        n(1);
        t(1);
      } else if (!i) {
        n(0);
      }
    })));
  };
}

function takeWhile(e, r) {
  return r => a => {
    var n = h;
    var t = !1;
    r((r => {
      if (t) {} else if (0 === r) {
        t = !0;
        a(0);
      } else if (0 === r.tag) {
        n = r[0];
        a(r);
      } else if (!e(r[0])) {
        t = !0;
        a(r);
        a(0);
        n(1);
      } else {
        a(r);
      }
    }));
  };
}

function fromAsyncIterable(e) {
  return r => {
    var a = e[asyncIteratorSymbol()] && e[asyncIteratorSymbol()]() || e;
    var n = !1;
    var t = !1;
    var i = !1;
    var o;
    r(start((async e => {
      if (1 === e) {
        n = !0;
        if (a.return) {
          a.return();
        }
      } else if (t) {
        i = !0;
      } else {
        for (i = t = !0; i && !n; ) {
          if ((o = await a.next()).done) {
            n = !0;
            if (a.return) {
              await a.return();
            }
            r(0);
          } else {
            try {
              i = !1;
              r(push(o.value));
            } catch (e) {
              if (a.throw) {
                if (n = !!(await a.throw(e)).done) {
                  r(0);
                }
              } else {
                throw e;
              }
            }
          }
        }
        t = !1;
      }
    })));
  };
}

var E = function fromIterable(e) {
  if (e[Symbol.asyncIterator]) {
    return fromAsyncIterable(e);
  }
  return r => {
    var a = e[Symbol.iterator]();
    var n = !1;
    var t = !1;
    var i = !1;
    var o;
    r(start((e => {
      if (1 === e) {
        n = !0;
        if (a.return) {
          a.return();
        }
      } else if (t) {
        i = !0;
      } else {
        for (i = t = !0; i && !n; ) {
          if ((o = a.next()).done) {
            n = !0;
            if (a.return) {
              a.return();
            }
            r(0);
          } else {
            try {
              i = !1;
              r(push(o.value));
            } catch (e) {
              if (a.throw) {
                if (n = !!a.throw(e).done) {
                  r(0);
                }
              } else {
                throw e;
              }
            }
          }
        }
        t = !1;
      }
    })));
  };
};

function fromValue(e) {
  return r => {
    var a = !1;
    r(start((n => {
      if (1 === n) {
        a = !0;
      } else if (!a) {
        a = !0;
        r(push(e));
        r(0);
      }
    })));
  };
}

function make(e) {
  return r => {
    var a = !1;
    var n = e({
      next(e) {
        if (!a) {
          r(push(e));
        }
      },
      complete() {
        if (!a) {
          a = !0;
          r(0);
        }
      }
    });
    r(start((e => {
      if (1 === e && !a) {
        a = !0;
        n();
      }
    })));
  };
}

function makeSubject() {
  var e;
  var r;
  return {
    source: share(make((a => {
      e = a.next;
      r = a.complete;
      return teardownPlaceholder;
    }))),
    next(r) {
      if (e) {
        e(r);
      }
    },
    complete() {
      if (r) {
        r();
      }
    }
  };
}

function subscribe(e) {
  return r => {
    var a = h;
    var n = !1;
    r((r => {
      if (0 === r) {
        n = !0;
      } else if (0 === r.tag) {
        (a = r[0])(0);
      } else if (!n) {
        e(r[0]);
        a(0);
      }
    }));
    return {
      unsubscribe() {
        if (!n) {
          n = !0;
          a(1);
        }
      }
    };
  };
}

function toPromise(e) {
  return new Promise((r => {
    var a = h;
    var n;
    e((e => {
      if (0 === e) {
        Promise.resolve(n).then(r);
      } else if (0 === e.tag) {
        (a = e[0])(0);
      } else {
        n = e[0];
        a(0);
      }
    }));
  }));
}

var rehydrateGraphQlError = e => {
  if (e && "string" == typeof e.message && (e.extensions || "GraphQLError" === e.name)) {
    return e;
  } else if ("object" == typeof e && "string" == typeof e.message) {
    return new c(e.message, e.nodes, e.source, e.positions, e.path, e, e.extensions || {});
  } else {
    return new c(e);
  }
};

class CombinedError extends Error {
  constructor(e) {
    var r = (e.graphQLErrors || []).map(rehydrateGraphQlError);
    var a = ((e, r) => {
      var a = "";
      if (e) {
        return `[Network] ${e.message}`;
      }
      if (r) {
        for (var n of r) {
          if (a) {
            a += "\n";
          }
          a += `[GraphQL] ${n.message}`;
        }
      }
      return a;
    })(e.networkError, r);
    super(a);
    this.name = "CombinedError";
    this.message = a;
    this.graphQLErrors = r;
    this.networkError = e.networkError;
    this.response = e.response;
  }
  toString() {
    return this.message;
  }
}

var phash = (e, r) => {
  var a = 0 | (r || 5381);
  for (var n = 0, t = 0 | e.length; n < t; n++) {
    a = (a << 5) + a + e.charCodeAt(n);
  }
  return a;
};

var k = new Set;

var g = new WeakMap;

var stringify = (e, r) => {
  if (null === e || k.has(e)) {
    return "null";
  } else if ("object" != typeof e) {
    return JSON.stringify(e) || "";
  } else if (e.toJSON) {
    return stringify(e.toJSON(), r);
  } else if (Array.isArray(e)) {
    var a = "[";
    for (var n of e) {
      if (a.length > 1) {
        a += ",";
      }
      a += stringify(n, r) || "null";
    }
    return a + "]";
  } else if (!r && (N !== NoopConstructor && e instanceof N || T !== NoopConstructor && e instanceof T)) {
    return "null";
  }
  var t = Object.keys(e).sort();
  if (!t.length && e.constructor && Object.getPrototypeOf(e).constructor !== Object.prototype.constructor) {
    var i = g.get(e) || Math.random().toString(36).slice(2);
    g.set(e, i);
    return stringify({
      __key: i
    }, r);
  }
  k.add(e);
  var o = "{";
  for (var s of t) {
    var u = stringify(e[s], r);
    if (u) {
      if (o.length > 1) {
        o += ",";
      }
      o += stringify(s, r) + ":" + u;
    }
  }
  k.delete(e);
  return o + "}";
};

var extract = (e, r, a) => {
  if (null == a || "object" != typeof a || a.toJSON || k.has(a)) {} else if (Array.isArray(a)) {
    for (var n = 0, t = a.length; n < t; n++) {
      extract(e, `${r}.${n}`, a[n]);
    }
  } else if (a instanceof N || a instanceof T) {
    e.set(r, a);
  } else {
    k.add(a);
    for (var i of Object.keys(a)) {
      extract(e, `${r}.${i}`, a[i]);
    }
  }
};

var stringifyVariables = (e, r) => {
  k.clear();
  return stringify(e, r || !1);
};

class NoopConstructor {}

var N = "undefined" != typeof File ? File : NoopConstructor;

var T = "undefined" != typeof Blob ? Blob : NoopConstructor;

var w = /("{3}[\s\S]*"{3}|"(?:\\.|[^"])*")/g;

var O = /(?:#[^\n\r]+)?(?:[\r\n]+|$)/g;

var replaceOutsideStrings = (e, r) => r % 2 == 0 ? e.replace(O, "\n") : e;

var sanitizeDocument = e => e.split(w).map(replaceOutsideStrings).join("").trim();

var I = new Map;

var A = new Map;

var stringifyDocument = e => {
  var r;
  if ("string" == typeof e) {
    r = sanitizeDocument(e);
  } else if (e.loc && A.get(e.__key) === e) {
    r = e.loc.source.body;
  } else {
    r = I.get(e) || sanitizeDocument(f(e));
    I.set(e, r);
  }
  if ("string" != typeof e && !e.loc) {
    e.loc = {
      start: 0,
      end: r.length,
      source: {
        body: r,
        name: "gql",
        locationOffset: {
          line: 1,
          column: 1
        }
      }
    };
  }
  return r;
};

var hashDocument = e => {
  var r;
  if (e.documentId) {
    r = phash(e.documentId);
  } else {
    r = phash(stringifyDocument(e));
    if (e.definitions) {
      var a = getOperationName(e);
      if (a) {
        r = phash(`\n# ${a}`, r);
      }
    }
  }
  return r;
};

var createRequest = (e, r, a) => {
  var n = r || {};
  var t = (e => {
    var r;
    var a;
    if ("string" == typeof e) {
      r = hashDocument(e);
      a = A.get(r) || d(e, {
        noLocation: !0
      });
    } else {
      r = e.__key || hashDocument(e);
      a = A.get(r) || e;
    }
    if (!a.loc) {
      stringifyDocument(a);
    }
    a.__key = r;
    A.set(r, a);
    return a;
  })(e);
  var i = stringifyVariables(n, !0);
  var o = t.__key;
  if ("{}" !== i) {
    o = phash(i, o);
  }
  return {
    key: o,
    query: t,
    variables: n,
    extensions: a
  };
};

var getOperationName = e => {
  for (var r of e.definitions) {
    if (r.kind === l.OPERATION_DEFINITION) {
      return r.name ? r.name.value : void 0;
    }
  }
};

var makeResult = (e, r, a) => {
  if (!("data" in r || "errors" in r && Array.isArray(r.errors))) {
    throw new Error("No Content");
  }
  var n = "subscription" === e.kind;
  return {
    operation: e,
    data: r.data,
    error: Array.isArray(r.errors) ? new CombinedError({
      graphQLErrors: r.errors,
      response: a
    }) : void 0,
    extensions: r.extensions ? {
      ...r.extensions
    } : void 0,
    hasNext: null == r.hasNext ? n : r.hasNext,
    stale: !1
  };
};

var deepMerge = (e, r) => {
  if ("object" == typeof e && null != e) {
    if (!e.constructor || e.constructor === Object || Array.isArray(e)) {
      e = Array.isArray(e) ? [ ...e ] : {
        ...e
      };
      for (var a of Object.keys(r)) {
        e[a] = deepMerge(e[a], r[a]);
      }
      return e;
    }
  }
  return r;
};

var mergeResultPatch = (e, r, a, n) => {
  var t = e.error ? e.error.graphQLErrors : [];
  var i = !!e.extensions || !!(r.payload || r).extensions;
  var o = {
    ...e.extensions,
    ...(r.payload || r).extensions
  };
  var s = r.incremental;
  if ("path" in r) {
    s = [ r ];
  }
  var u = {
    data: e.data
  };
  if (s) {
    var _loop = function(e) {
      if (Array.isArray(e.errors)) {
        t.push(...e.errors);
      }
      if (e.extensions) {
        Object.assign(o, e.extensions);
        i = !0;
      }
      var r = "data";
      var a = u;
      var s = [];
      if (e.path) {
        s = e.path;
      } else if (n) {
        var l = n.find((r => r.id === e.id));
        if (e.subPath) {
          s = [ ...l.path, ...e.subPath ];
        } else {
          s = l.path;
        }
      }
      for (var c = 0, d = s.length; c < d; r = s[c++]) {
        a = a[r] = Array.isArray(a[r]) ? [ ...a[r] ] : {
          ...a[r]
        };
      }
      if (e.items) {
        var f = +r >= 0 ? r : 0;
        for (var p = 0, m = e.items.length; p < m; p++) {
          a[f + p] = deepMerge(a[f + p], e.items[p]);
        }
      } else if (void 0 !== e.data) {
        a[r] = deepMerge(a[r], e.data);
      }
    };
    for (var l of s) {
      _loop(l);
    }
  } else {
    u.data = (r.payload || r).data || e.data;
    t = r.errors || r.payload && r.payload.errors || t;
  }
  return {
    operation: e.operation,
    data: u.data,
    error: t.length ? new CombinedError({
      graphQLErrors: t,
      response: a
    }) : void 0,
    extensions: i ? o : void 0,
    hasNext: null != r.hasNext ? r.hasNext : e.hasNext,
    stale: !1
  };
};

var makeErrorResult = (e, r, a) => ({
  operation: e,
  data: void 0,
  error: new CombinedError({
    networkError: r,
    response: a
  }),
  extensions: void 0,
  hasNext: !1,
  stale: !1
});

var splitOutSearchParams = e => {
  var r = e.indexOf("?");
  return r > -1 ? [ e.slice(0, r), new URLSearchParams(e.slice(r + 1)) ] : [ e, new URLSearchParams ];
};

var makeFetchOptions = (e, r) => {
  var a = {
    accept: "subscription" === e.kind ? "text/event-stream, multipart/mixed" : "application/graphql-response+json, application/graphql+json, application/json, text/event-stream, multipart/mixed"
  };
  var n = ("function" == typeof e.context.fetchOptions ? e.context.fetchOptions() : e.context.fetchOptions) || {};
  if (n.headers) {
    if ((e => "has" in e && !Object.keys(e).length)(n.headers)) {
      n.headers.forEach(((e, r) => {
        a[r] = e;
      }));
    } else if (Array.isArray(n.headers)) {
      n.headers.forEach(((e, r) => {
        if (Array.isArray(e)) {
          if (a[e[0]]) {
            a[e[0]] = `${a[e[0]]},${e[1]}`;
          } else {
            a[e[0]] = e[1];
          }
        } else {
          a[r] = e;
        }
      }));
    } else {
      for (var t in n.headers) {
        a[t.toLowerCase()] = n.headers[t];
      }
    }
  }
  var i = ((e, r) => {
    if (r && ("query" !== e.kind || !e.context.preferGetMethod)) {
      var a = stringifyVariables(r);
      var n = (e => {
        var r = new Map;
        if (N !== NoopConstructor || T !== NoopConstructor) {
          k.clear();
          extract(r, "variables", e);
        }
        return r;
      })(r.variables);
      if (n.size) {
        var t = new FormData;
        t.append("operations", a);
        t.append("map", stringifyVariables({
          ...[ ...n.keys() ].map((e => [ e ]))
        }));
        var i = 0;
        for (var o of n.values()) {
          t.append("" + i++, o);
        }
        return t;
      }
      return a;
    }
  })(e, r);
  if ("string" == typeof i && !a["content-type"]) {
    a["content-type"] = "application/json";
  }
  return {
    ...n,
    method: i ? "POST" : "GET",
    body: i,
    headers: a
  };
};

var b = "undefined" != typeof TextDecoder ? new TextDecoder : null;

var L = /boundary="?([^=";]+)"?/i;

var S = /data: ?([^\n]+)/;

var toString = e => "Buffer" === e.constructor.name ? e.toString() : b.decode(e);

async function* streamBody(e) {
  if (e.body[Symbol.asyncIterator]) {
    for await (var r of e.body) {
      yield toString(r);
    }
  } else {
    var a = e.body.getReader();
    var n;
    try {
      while (!(n = await a.read()).done) {
        yield toString(n.value);
      }
    } finally {
      a.cancel();
    }
  }
}

async function* split(e, r) {
  var a = "";
  var n;
  for await (var t of e) {
    a += t;
    while ((n = a.indexOf(r)) > -1) {
      yield a.slice(0, n);
      a = a.slice(n + r.length);
    }
  }
}

function makeFetchSource(e, r, a) {
  var n;
  if ("undefined" != typeof AbortController) {
    a.signal = (n = new AbortController).signal;
  }
  return onEnd((() => {
    if (n) {
      n.abort();
    }
  }))(filter((e => !!e))(fromAsyncIterable(async function* fetchOperation(e, r, a) {
    var n = !0;
    var t = null;
    var i;
    try {
      yield await Promise.resolve();
      var o = (i = await (e.context.fetch || fetch)(r, a)).headers.get("Content-Type") || "";
      var s;
      if (/multipart\/mixed/i.test(o)) {
        s = async function* parseMultipartMixed(e, r) {
          var a = e.match(L);
          var n = "--" + (a ? a[1] : "-");
          var t = !0;
          var i;
          for await (var o of split(streamBody(r), "\r\n" + n)) {
            if (t) {
              t = !1;
              var s = o.indexOf(n);
              if (s > -1) {
                o = o.slice(s + n.length);
              } else {
                continue;
              }
            }
            try {
              yield i = JSON.parse(o.slice(o.indexOf("\r\n\r\n") + 4));
            } catch (e) {
              if (!i) {
                throw e;
              }
            }
            if (i && !1 === i.hasNext) {
              break;
            }
          }
          if (i && !1 !== i.hasNext) {
            yield {
              hasNext: !1
            };
          }
        }(o, i);
      } else if (/text\/event-stream/i.test(o)) {
        s = async function* parseEventStream(e) {
          var r;
          for await (var a of split(streamBody(e), "\n\n")) {
            var n = a.match(S);
            if (n) {
              var t = n[1];
              try {
                yield r = JSON.parse(t);
              } catch (e) {
                if (!r) {
                  throw e;
                }
              }
              if (r && !1 === r.hasNext) {
                break;
              }
            }
          }
          if (r && !1 !== r.hasNext) {
            yield {
              hasNext: !1
            };
          }
        }(i);
      } else if (!/text\//i.test(o)) {
        s = async function* parseJSON(e) {
          yield JSON.parse(await e.text());
        }(i);
      } else {
        s = async function* parseMaybeJSON(e) {
          var r = await e.text();
          try {
            var a = JSON.parse(r);
            if ("production" !== process.env.NODE_ENV) {
              console.warn('Found response with content-type "text/plain" but it had a valid "application/json" response.');
            }
            yield a;
          } catch (e) {
            throw new Error(r);
          }
        }(i);
      }
      var u;
      for await (var l of s) {
        if (l.pending && !t) {
          u = l.pending;
        } else if (l.pending) {
          u = [ ...u, ...l.pending ];
        }
        t = t ? mergeResultPatch(t, l, i, u) : makeResult(e, l, i);
        n = !1;
        yield t;
        n = !0;
      }
      if (!t) {
        yield t = makeResult(e, {}, i);
      }
    } catch (r) {
      if (!n) {
        throw r;
      }
      yield makeErrorResult(e, i && (i.status < 200 || i.status >= 300) && i.statusText ? new Error(i.statusText) : r, i);
    }
  }(e, r, a))));
}

function withPromise(e) {
  var source$ = r => e(r);
  source$.toPromise = () => toPromise(take(1)(filter((e => !e.stale && !e.hasNext))(source$)));
  source$.then = (e, r) => source$.toPromise().then(e, r);
  source$.subscribe = e => subscribe(e)(source$);
  return source$;
}

function makeOperation(e, r, a) {
  return {
    ...r,
    kind: e,
    context: r.context ? {
      ...r.context,
      ...a
    } : a || r.context
  };
}

var noop = () => {};

var fetchExchange = ({forward: e, dispatchDebug: r}) => a => {
  var n = mergeMap((e => {
    var n = function makeFetchBody(e) {
      var r = {
        query: void 0,
        documentId: void 0,
        operationName: getOperationName(e.query),
        variables: e.variables || void 0,
        extensions: e.extensions
      };
      if ("documentId" in e.query && e.query.documentId && (!e.query.definitions || !e.query.definitions.length)) {
        r.documentId = e.query.documentId;
      } else if (!e.extensions || !e.extensions.persistedQuery || e.extensions.persistedQuery.miss) {
        r.query = stringifyDocument(e.query);
      }
      return r;
    }(e);
    var t = ((e, r) => {
      var a = "query" === e.kind && e.context.preferGetMethod;
      if (!a || !r) {
        return e.context.url;
      }
      var n = splitOutSearchParams(e.context.url);
      for (var t in r) {
        var i = r[t];
        if (i) {
          n[1].set(t, "object" == typeof i ? stringifyVariables(i) : i);
        }
      }
      var o = n.join("?");
      if (o.length > 2047 && "force" !== a) {
        e.context.preferGetMethod = !1;
        return e.context.url;
      }
      return o;
    })(e, n);
    var i = makeFetchOptions(e, n);
    "production" !== process.env.NODE_ENV && r({
      type: "fetchRequest",
      message: "A fetch request is being executed.",
      operation: e,
      data: {
        url: t,
        fetchOptions: i
      },
      source: "fetchExchange"
    });
    var o = takeUntil(filter((r => "teardown" === r.kind && r.key === e.key))(a))(makeFetchSource(e, t, i));
    if ("production" !== process.env.NODE_ENV) {
      return onPush((a => {
        var n = !a.data ? a.error : void 0;
        "production" !== process.env.NODE_ENV && r({
          type: n ? "fetchError" : "fetchSuccess",
          message: `A ${n ? "failed" : "successful"} fetch response has been returned.`,
          operation: e,
          data: {
            url: t,
            fetchOptions: i,
            value: n || a
          },
          source: "fetchExchange"
        });
      }))(o);
    }
    return o;
  }))(filter((e => "teardown" !== e.kind && ("subscription" !== e.kind || !!e.context.fetchSubscriptions)))(a));
  return merge([ n, e(filter((e => "teardown" === e.kind || "subscription" === e.kind && !e.context.fetchSubscriptions))(a)) ]);
};

var fallbackExchange = ({dispatchDebug: e}) => r => {
  if ("production" !== process.env.NODE_ENV) {
    r = onPush((r => {
      if ("teardown" !== r.kind && "production" !== process.env.NODE_ENV) {
        var a = `No exchange has handled operations of kind "${r.kind}". Check whether you've added an exchange responsible for these operations.`;
        "production" !== process.env.NODE_ENV && e({
          type: "fallbackCatch",
          message: a,
          operation: r,
          source: "fallbackExchange"
        });
        console.warn(a);
      }
    }))(r);
  }
  return filter((e => !1))(r);
};

var x = function Client(e) {
  if ("production" !== process.env.NODE_ENV && !e.url) {
    throw new Error("You are creating an urql-client without a url.");
  }
  var r = 0;
  var a = new Map;
  var n = new Map;
  var t = new Set;
  var i = [];
  var o = {
    url: e.url,
    fetchSubscriptions: e.fetchSubscriptions,
    fetchOptions: e.fetchOptions,
    fetch: e.fetch,
    preferGetMethod: e.preferGetMethod,
    requestPolicy: e.requestPolicy || "cache-first"
  };
  var s = makeSubject();
  function nextOperation(e) {
    if ("mutation" === e.kind || "teardown" === e.kind || !t.has(e.key)) {
      if ("teardown" === e.kind) {
        t.delete(e.key);
      } else if ("mutation" !== e.kind) {
        t.add(e.key);
      }
      s.next(e);
    }
  }
  var u = !1;
  function dispatchOperation(e) {
    if (e) {
      nextOperation(e);
    }
    if (!u) {
      u = !0;
      while (u && (e = i.shift())) {
        nextOperation(e);
      }
      u = !1;
    }
  }
  var makeResultSource = e => {
    var r = takeUntil(filter((r => "teardown" === r.kind && r.key === e.key))(s.source))(filter((r => r.operation.kind === e.kind && r.operation.key === e.key && (!r.operation.context._instance || r.operation.context._instance === e.context._instance)))(y));
    if ("query" !== e.kind) {
      r = takeWhile((e => !!e.hasNext))(r);
    } else {
      r = switchMap((r => {
        var a = fromValue(r);
        return r.stale || r.hasNext ? a : merge([ a, map((() => {
          r.stale = !0;
          return r;
        }))(take(1)(filter((r => r.key === e.key))(s.source))) ]);
      }))(r);
    }
    if ("mutation" !== e.kind) {
      r = onEnd((() => {
        t.delete(e.key);
        a.delete(e.key);
        n.delete(e.key);
        u = !1;
        for (var r = i.length - 1; r >= 0; r--) {
          if (i[r].key === e.key) {
            i.splice(r, 1);
          }
        }
        nextOperation(makeOperation("teardown", e, e.context));
      }))(onPush((r => {
        if (r.stale) {
          if (!r.hasNext) {
            t.delete(e.key);
          } else {
            for (var n of i) {
              if (n.key === r.operation.key) {
                t.delete(n.key);
                break;
              }
            }
          }
        } else if (!r.hasNext) {
          t.delete(e.key);
        }
        a.set(e.key, r);
      }))(r));
    } else {
      r = onStart((() => {
        nextOperation(e);
      }))(r);
    }
    return share(r);
  };
  var c = this instanceof Client ? this : Object.create(Client.prototype);
  var d = Object.assign(c, {
    suspense: !!e.suspense,
    operations$: s.source,
    reexecuteOperation(e) {
      if ("teardown" === e.kind) {
        dispatchOperation(e);
      } else if ("mutation" === e.kind) {
        i.push(e);
        Promise.resolve().then(dispatchOperation);
      } else if (n.has(e.key)) {
        var r = !1;
        for (var a = 0; a < i.length; a++) {
          if (i[a].key === e.key) {
            i[a] = e;
            r = !0;
          }
        }
        if (!(r || t.has(e.key) && "network-only" !== e.context.requestPolicy)) {
          i.push(e);
          Promise.resolve().then(dispatchOperation);
        } else {
          t.delete(e.key);
          Promise.resolve().then(dispatchOperation);
        }
      }
    },
    createRequestOperation(e, a, n) {
      if (!n) {
        n = {};
      }
      var t;
      if ("production" !== process.env.NODE_ENV && "teardown" !== e && (t = (e => {
        for (var r of e.definitions) {
          if (r.kind === l.OPERATION_DEFINITION) {
            return r.operation;
          }
        }
      })(a.query)) !== e) {
        throw new Error(`Expected operation of type "${e}" but found "${t}"`);
      }
      return makeOperation(e, a, {
        _instance: "mutation" === e ? r = r + 1 | 0 : void 0,
        ...o,
        ...n,
        requestPolicy: n.requestPolicy || o.requestPolicy,
        suspense: n.suspense || !1 !== n.suspense && d.suspense
      });
    },
    executeRequestOperation(e) {
      if ("mutation" === e.kind) {
        return withPromise(makeResultSource(e));
      }
      return withPromise(function lazy(e) {
        return r => e()(r);
      }((() => {
        var r = n.get(e.key);
        if (!r) {
          n.set(e.key, r = makeResultSource(e));
        }
        r = onStart((() => {
          dispatchOperation(e);
        }))(r);
        var t = a.get(e.key);
        if ("query" === e.kind && t && (t.stale || t.hasNext)) {
          return switchMap(fromValue)(merge([ r, filter((r => r === a.get(e.key)))(fromValue(t)) ]));
        } else {
          return r;
        }
      })));
    },
    executeQuery(e, r) {
      var a = d.createRequestOperation("query", e, r);
      return d.executeRequestOperation(a);
    },
    executeSubscription(e, r) {
      var a = d.createRequestOperation("subscription", e, r);
      return d.executeRequestOperation(a);
    },
    executeMutation(e, r) {
      var a = d.createRequestOperation("mutation", e, r);
      return d.executeRequestOperation(a);
    },
    readQuery(e, r, a) {
      var n = null;
      subscribe((e => {
        n = e;
      }))(d.query(e, r, a)).unsubscribe();
      return n;
    },
    query: (e, r, a) => d.executeQuery(createRequest(e, r), a),
    subscription: (e, r, a) => d.executeSubscription(createRequest(e, r), a),
    mutation: (e, r, a) => d.executeMutation(createRequest(e, r), a)
  });
  var f = noop;
  if ("production" !== process.env.NODE_ENV) {
    var {next: p, source: m} = makeSubject();
    d.subscribeToDebugTarget = e => subscribe(e)(m);
    f = p;
  }
  var v = (e => ({client: r, forward: a, dispatchDebug: n}) => e.reduceRight(((e, a) => {
    var t = !1;
    return a({
      client: r,
      forward(r) {
        if ("production" !== process.env.NODE_ENV) {
          if (t) {
            throw new Error("forward() must only be called once in each Exchange.");
          }
          t = !0;
        }
        return share(e(share(r)));
      },
      dispatchDebug(e) {
        "production" !== process.env.NODE_ENV && n({
          timestamp: Date.now(),
          source: a.name,
          ...e
        });
      }
    });
  }), a))(e.exchanges);
  var y = share(v({
    client: d,
    dispatchDebug: f,
    forward: fallbackExchange({
      dispatchDebug: f
    })
  })(s.source));
  !function publish(e) {
    subscribe((e => {}))(e);
  }(y);
  return d;
};

var _hasField = (e, r) => !!e && !!e.fields && e.fields.some((e => e.name === r));

var _supportsDeprecatedArgumentsArg = e => {
  var r = e && e.fields && e.fields.find((e => "args" === e.name));
  return !!(r && r.args && r.args.find((e => "includeDeprecated" === e.name)));
};

var _ = {
  directiveIsRepeatable: !1,
  specifiedByURL: !1,
  inputValueDeprecation: !1,
  directiveArgumentsIsDeprecated: !1,
  fieldArgumentsIsDeprecated: !1,
  inputOneOf: !1
};

var toSupportedFeatures = e => ({
  directiveIsRepeatable: _hasField(e.directive, "isRepeatable"),
  specifiedByURL: _hasField(e.type, "specifiedByURL"),
  inputOneOf: _hasField(e.type, "isOneOf"),
  inputValueDeprecation: _hasField(e.inputValue, "isDeprecated"),
  directiveArgumentsIsDeprecated: _supportsDeprecatedArgumentsArg(e.directive),
  fieldArgumentsIsDeprecated: _supportsDeprecatedArgumentsArg(e.field)
});

var introspectionToSupportedFeatures = e => {
  var r = e.__schema.types.find((e => "__Directive" === e.name));
  var a = e.__schema.types.find((e => "__Type" === e.name));
  var n = e.__schema.types.find((e => "__InputValue" === e.name));
  var t = e.__schema.types.find((e => "__Field" === e.name));
  if (r && a && n && t) {
    return {
      directiveIsRepeatable: _hasField(r, "isRepeatable"),
      specifiedByURL: _hasField(a, "specifiedByURL"),
      inputOneOf: _hasField(a, "isOneOf"),
      inputValueDeprecation: _hasField(n, "isDeprecated"),
      directiveArgumentsIsDeprecated: _supportsDeprecatedArgumentsArg(r),
      fieldArgumentsIsDeprecated: _supportsDeprecatedArgumentsArg(t)
    };
  } else {
    return _;
  }
};

var D;

var getPeerSupportedFeatures = () => {
  if (!D) {
    var e = new n({
      query: new t({
        name: "Query",
        fields: {
          _noop: {
            type: i
          }
        }
      })
    });
    var r = o({
      schema: e,
      document: makeIntrospectSupportQuery()
    });
    return D = r.data ? toSupportedFeatures(r.data) : _;
  }
  return D;
};

var M;

var F;

var makeIntrospectionQuery = e => {
  if (M && F === e) {
    return M;
  } else {
    return M = _makeIntrospectionQuery(F = e);
  }
};

var _makeIntrospectionQuery = e => ({
  kind: l.DOCUMENT,
  definitions: [ {
    kind: l.OPERATION_DEFINITION,
    name: {
      kind: l.NAME,
      value: "IntrospectionQuery"
    },
    operation: p.QUERY,
    selectionSet: {
      kind: l.SELECTION_SET,
      selections: [ {
        kind: l.FIELD,
        name: {
          kind: l.NAME,
          value: "__schema"
        },
        selectionSet: _makeSchemaSelection(e)
      } ]
    }
  }, _makeSchemaFullTypeFragment(e), _makeSchemaInputValueFragment(e), _makeTypeRefFragment() ]
});

var makeIntrospectSupportQuery = () => ({
  kind: l.DOCUMENT,
  definitions: [ {
    kind: l.OPERATION_DEFINITION,
    name: {
      kind: l.NAME,
      value: "IntrospectSupportQuery"
    },
    operation: p.QUERY,
    selectionSet: {
      kind: l.SELECTION_SET,
      selections: [ {
        kind: l.FIELD,
        alias: {
          kind: l.NAME,
          value: "directive"
        },
        name: {
          kind: l.NAME,
          value: "__type"
        },
        arguments: [ {
          kind: l.ARGUMENT,
          name: {
            kind: l.NAME,
            value: "name"
          },
          value: {
            kind: l.STRING,
            value: "__Directive"
          }
        } ],
        selectionSet: _makeFieldNamesSelection({
          includeArgs: !0
        })
      }, {
        kind: l.FIELD,
        alias: {
          kind: l.NAME,
          value: "field"
        },
        name: {
          kind: l.NAME,
          value: "__type"
        },
        arguments: [ {
          kind: l.ARGUMENT,
          name: {
            kind: l.NAME,
            value: "name"
          },
          value: {
            kind: l.STRING,
            value: "__Field"
          }
        } ],
        selectionSet: _makeFieldNamesSelection({
          includeArgs: !0
        })
      }, {
        kind: l.FIELD,
        alias: {
          kind: l.NAME,
          value: "type"
        },
        name: {
          kind: l.NAME,
          value: "__type"
        },
        arguments: [ {
          kind: l.ARGUMENT,
          name: {
            kind: l.NAME,
            value: "name"
          },
          value: {
            kind: l.STRING,
            value: "__Type"
          }
        } ],
        selectionSet: _makeFieldNamesSelection({
          includeArgs: !1
        })
      }, {
        kind: l.FIELD,
        alias: {
          kind: l.NAME,
          value: "inputValue"
        },
        name: {
          kind: l.NAME,
          value: "__type"
        },
        arguments: [ {
          kind: l.ARGUMENT,
          name: {
            kind: l.NAME,
            value: "name"
          },
          value: {
            kind: l.STRING,
            value: "__InputValue"
          }
        } ],
        selectionSet: _makeFieldNamesSelection({
          includeArgs: !1
        })
      } ]
    }
  } ]
});

var _makeFieldNamesSelection = e => ({
  kind: l.SELECTION_SET,
  selections: [ {
    kind: l.FIELD,
    name: {
      kind: l.NAME,
      value: "fields"
    },
    selectionSet: {
      kind: l.SELECTION_SET,
      selections: [ {
        kind: l.FIELD,
        name: {
          kind: l.NAME,
          value: "name"
        }
      }, ...e.includeArgs ? [ {
        kind: l.FIELD,
        name: {
          kind: l.NAME,
          value: "args"
        },
        selectionSet: {
          kind: l.SELECTION_SET,
          selections: [ {
            kind: l.FIELD,
            name: {
              kind: l.NAME,
              value: "name"
            }
          } ]
        }
      } ] : [] ]
    }
  } ]
});

var _makeSchemaSelection = e => ({
  kind: l.SELECTION_SET,
  selections: [ {
    kind: l.FIELD,
    name: {
      kind: l.NAME,
      value: "queryType"
    },
    selectionSet: {
      kind: l.SELECTION_SET,
      selections: [ {
        kind: l.FIELD,
        name: {
          kind: l.NAME,
          value: "name"
        }
      } ]
    }
  }, {
    kind: l.FIELD,
    name: {
      kind: l.NAME,
      value: "mutationType"
    },
    selectionSet: {
      kind: l.SELECTION_SET,
      selections: [ {
        kind: l.FIELD,
        name: {
          kind: l.NAME,
          value: "name"
        }
      } ]
    }
  }, {
    kind: l.FIELD,
    name: {
      kind: l.NAME,
      value: "subscriptionType"
    },
    selectionSet: {
      kind: l.SELECTION_SET,
      selections: [ {
        kind: l.FIELD,
        name: {
          kind: l.NAME,
          value: "name"
        }
      } ]
    }
  }, {
    kind: l.FIELD,
    name: {
      kind: l.NAME,
      value: "types"
    },
    selectionSet: {
      kind: l.SELECTION_SET,
      selections: [ {
        kind: l.FRAGMENT_SPREAD,
        name: {
          kind: l.NAME,
          value: "FullType"
        }
      } ]
    }
  }, {
    kind: l.FIELD,
    name: {
      kind: l.NAME,
      value: "directives"
    },
    selectionSet: {
      kind: l.SELECTION_SET,
      selections: [ {
        kind: l.FIELD,
        name: {
          kind: l.NAME,
          value: "name"
        }
      }, {
        kind: l.FIELD,
        name: {
          kind: l.NAME,
          value: "description"
        }
      }, {
        kind: l.FIELD,
        name: {
          kind: l.NAME,
          value: "locations"
        }
      }, _makeSchemaArgsField(e.directiveArgumentsIsDeprecated), ...e.directiveIsRepeatable ? [ {
        kind: l.FIELD,
        name: {
          kind: l.NAME,
          value: "isRepeatable"
        }
      } ] : [] ]
    }
  } ]
});

var _makeSchemaFullTypeFragment = e => ({
  kind: l.FRAGMENT_DEFINITION,
  name: {
    kind: l.NAME,
    value: "FullType"
  },
  typeCondition: {
    kind: l.NAMED_TYPE,
    name: {
      kind: l.NAME,
      value: "__Type"
    }
  },
  selectionSet: {
    kind: l.SELECTION_SET,
    selections: [ {
      kind: l.FIELD,
      name: {
        kind: l.NAME,
        value: "kind"
      }
    }, {
      kind: l.FIELD,
      name: {
        kind: l.NAME,
        value: "name"
      }
    }, {
      kind: l.FIELD,
      name: {
        kind: l.NAME,
        value: "description"
      }
    }, ...e.inputOneOf ? [ {
      kind: l.FIELD,
      name: {
        kind: l.NAME,
        value: "isOneOf"
      }
    } ] : [], ...e.specifiedByURL ? [ {
      kind: l.FIELD,
      name: {
        kind: l.NAME,
        value: "specifiedByURL"
      }
    } ] : [], {
      kind: l.FIELD,
      name: {
        kind: l.NAME,
        value: "fields"
      },
      arguments: [ {
        kind: l.ARGUMENT,
        name: {
          kind: l.NAME,
          value: "includeDeprecated"
        },
        value: {
          kind: l.BOOLEAN,
          value: !0
        }
      } ],
      selectionSet: {
        kind: l.SELECTION_SET,
        selections: [ {
          kind: l.FIELD,
          name: {
            kind: l.NAME,
            value: "name"
          }
        }, {
          kind: l.FIELD,
          name: {
            kind: l.NAME,
            value: "description"
          }
        }, {
          kind: l.FIELD,
          name: {
            kind: l.NAME,
            value: "isDeprecated"
          }
        }, {
          kind: l.FIELD,
          name: {
            kind: l.NAME,
            value: "deprecationReason"
          }
        }, _makeSchemaArgsField(e.fieldArgumentsIsDeprecated), {
          kind: l.FIELD,
          name: {
            kind: l.NAME,
            value: "type"
          },
          selectionSet: {
            kind: l.SELECTION_SET,
            selections: [ {
              kind: l.FRAGMENT_SPREAD,
              name: {
                kind: l.NAME,
                value: "TypeRef"
              }
            } ]
          }
        } ]
      }
    }, {
      kind: l.FIELD,
      name: {
        kind: l.NAME,
        value: "interfaces"
      },
      selectionSet: {
        kind: l.SELECTION_SET,
        selections: [ {
          kind: l.FRAGMENT_SPREAD,
          name: {
            kind: l.NAME,
            value: "TypeRef"
          }
        } ]
      }
    }, {
      kind: l.FIELD,
      name: {
        kind: l.NAME,
        value: "possibleTypes"
      },
      selectionSet: {
        kind: l.SELECTION_SET,
        selections: [ {
          kind: l.FRAGMENT_SPREAD,
          name: {
            kind: l.NAME,
            value: "TypeRef"
          }
        } ]
      }
    }, {
      kind: l.FIELD,
      name: {
        kind: l.NAME,
        value: "inputFields"
      },
      arguments: e.inputValueDeprecation ? [ {
        kind: l.ARGUMENT,
        name: {
          kind: l.NAME,
          value: "includeDeprecated"
        },
        value: {
          kind: l.BOOLEAN,
          value: !0
        }
      } ] : [],
      selectionSet: {
        kind: l.SELECTION_SET,
        selections: [ {
          kind: l.FRAGMENT_SPREAD,
          name: {
            kind: l.NAME,
            value: "InputValue"
          }
        } ]
      }
    }, {
      kind: l.FIELD,
      name: {
        kind: l.NAME,
        value: "enumValues"
      },
      arguments: [ {
        kind: l.ARGUMENT,
        name: {
          kind: l.NAME,
          value: "includeDeprecated"
        },
        value: {
          kind: l.BOOLEAN,
          value: !0
        }
      } ],
      selectionSet: {
        kind: l.SELECTION_SET,
        selections: [ {
          kind: l.FIELD,
          name: {
            kind: l.NAME,
            value: "name"
          }
        }, {
          kind: l.FIELD,
          name: {
            kind: l.NAME,
            value: "description"
          }
        }, {
          kind: l.FIELD,
          name: {
            kind: l.NAME,
            value: "isDeprecated"
          }
        }, {
          kind: l.FIELD,
          name: {
            kind: l.NAME,
            value: "deprecationReason"
          }
        } ]
      }
    } ]
  }
});

var _makeSchemaArgsField = e => ({
  kind: l.FIELD,
  name: {
    kind: l.NAME,
    value: "args"
  },
  arguments: e ? [ {
    kind: l.ARGUMENT,
    name: {
      kind: l.NAME,
      value: "includeDeprecated"
    },
    value: {
      kind: l.BOOLEAN,
      value: !0
    }
  } ] : [],
  selectionSet: {
    kind: l.SELECTION_SET,
    selections: [ {
      kind: l.FRAGMENT_SPREAD,
      name: {
        kind: l.NAME,
        value: "InputValue"
      }
    } ]
  }
});

var _makeSchemaInputValueFragment = e => ({
  kind: l.FRAGMENT_DEFINITION,
  name: {
    kind: l.NAME,
    value: "InputValue"
  },
  typeCondition: {
    kind: l.NAMED_TYPE,
    name: {
      kind: l.NAME,
      value: "__InputValue"
    }
  },
  selectionSet: {
    kind: l.SELECTION_SET,
    selections: [ {
      kind: l.FIELD,
      name: {
        kind: l.NAME,
        value: "name"
      }
    }, {
      kind: l.FIELD,
      name: {
        kind: l.NAME,
        value: "description"
      }
    }, {
      kind: l.FIELD,
      name: {
        kind: l.NAME,
        value: "defaultValue"
      }
    }, {
      kind: l.FIELD,
      name: {
        kind: l.NAME,
        value: "type"
      },
      selectionSet: {
        kind: l.SELECTION_SET,
        selections: [ {
          kind: l.FRAGMENT_SPREAD,
          name: {
            kind: l.NAME,
            value: "TypeRef"
          }
        } ]
      }
    }, ...e.inputValueDeprecation ? [ {
      kind: l.FIELD,
      name: {
        kind: l.NAME,
        value: "isDeprecated"
      }
    }, {
      kind: l.FIELD,
      name: {
        kind: l.NAME,
        value: "deprecationReason"
      }
    } ] : [] ]
  }
});

var _makeTypeRefFragment = () => ({
  kind: l.FRAGMENT_DEFINITION,
  name: {
    kind: l.NAME,
    value: "TypeRef"
  },
  typeCondition: {
    kind: l.NAMED_TYPE,
    name: {
      kind: l.NAME,
      value: "__Type"
    }
  },
  selectionSet: _makeTypeRefSelection(0)
});

var _makeTypeRefSelection = e => ({
  kind: l.SELECTION_SET,
  selections: e < 9 ? [ {
    kind: l.FIELD,
    name: {
      kind: l.NAME,
      value: "kind"
    }
  }, {
    kind: l.FIELD,
    name: {
      kind: l.NAME,
      value: "name"
    }
  }, {
    kind: l.FIELD,
    name: {
      kind: l.NAME,
      value: "ofType"
    },
    selectionSet: _makeTypeRefSelection(e + 1)
  } ] : [ {
    kind: l.FIELD,
    name: {
      kind: l.NAME,
      value: "kind"
    }
  }, {
    kind: l.FIELD,
    name: {
      kind: l.NAME,
      value: "name"
    }
  } ]
});

function loadFromSDL(e) {
  var n = new Set;
  var t = null;
  var i = null;
  var load = async () => {
    var a = r.extname(e.file);
    var n = await v.readFile(e.file, {
      encoding: "utf8"
    });
    if (".json" === a) {
      var t = JSON.parse(n);
      if (!t || !t.__schema) {
        throw new Error("Parsing JSON introspection data failed.\nThe JSON payload did not evaluate to an introspection schema.");
      }
      return {
        introspection: {
          ...t,
          name: e.name
        },
        schema: s(t, {
          assumeValid: !!e.assumeValid
        })
      };
    } else {
      var i = u(n, {
        assumeValidSDL: !!e.assumeValid
      });
      var l = makeIntrospectionQuery(getPeerSupportedFeatures());
      var c = o({
        schema: i,
        document: l
      });
      if (c.errors) {
        throw new CombinedError({
          graphQLErrors: c.errors
        });
      } else if (c.data) {
        return {
          introspection: {
            ...c.data,
            name: e.name
          },
          schema: i
        };
      } else {
        throw new Error("Executing introspection against SDL schema failed.\n`graphql` failed to return any schema data or error.");
      }
    }
  };
  return {
    get name() {
      return e.name;
    },
    load: async e => e || !i ? i = await load() : i,
    notifyOnUpdate(r) {
      if (!n.size) {
        (async () => {
          if (a.sys.watchFile) {
            var r = a.sys.watchFile(e.file, (async () => {
              try {
                if (i = await load()) {
                  for (var e of n) {
                    e(i);
                  }
                }
              } catch (e) {}
            }), 250, {
              watchFile: a.WatchFileKind.UseFsEventsOnParentDirectory,
              fallbackPolling: a.PollingWatchKind.PriorityInterval
            });
            t = () => r.close();
          } else {
            var o = new AbortController;
            t = () => o.abort();
            var s = v.watch(e.file, {
              signal: o.signal,
              persistent: !1
            });
            try {
              for await (var u of s) {
                if (i = await load()) {
                  for (var l of n) {
                    l(i);
                  }
                }
              }
            } catch (e) {
              if ("AbortError" !== e.name) {
                throw e;
              }
            } finally {
              t = null;
            }
          }
        })();
      }
      n.add(r);
      return () => {
        n.delete(r);
        if (!n.size && t) {
          t();
        }
      };
    },
    async loadIntrospection() {
      var e = await this.load();
      return e && e.introspection;
    },
    async loadSchema() {
      var e = await this.load();
      return e && e.schema;
    }
  };
}

var retryExchange = e => {
  var {retryIf: r, retryWith: a} = e;
  var n = e.initialDelayMs || 1e3;
  var t = e.maxDelayMs || 15e3;
  var i = e.maxNumberAttempts || 2;
  var o = null != e.randomDelay ? !!e.randomDelay : !0;
  return ({forward: e, dispatchDebug: s}) => u => {
    var {source: l, next: c} = makeSubject();
    var d = mergeMap((e => {
      var r = e.context.retry || {
        count: 0,
        delay: null
      };
      var a = ++r.count;
      var l = r.delay || n;
      var c = Math.random() + 1.5;
      if (o) {
        if (l * c < t) {
          l *= c;
        } else {
          l = t;
        }
      } else {
        l = Math.min(a * n, t);
      }
      r.delay = l;
      var d = filter((r => ("query" === r.kind || "teardown" === r.kind) && r.key === e.key))(u);
      "production" !== process.env.NODE_ENV && s({
        type: "retryAttempt",
        message: `The operation has failed and a retry has been triggered (${a} / ${i})`,
        operation: e,
        data: {
          retryCount: a,
          delayAmount: l
        },
        source: "retryExchange"
      });
      return takeUntil(d)(function debounce(e) {
        return r => a => {
          var n;
          var t = !1;
          var i = !1;
          r((r => {
            if (i) {} else if (0 === r) {
              i = !0;
              if (n) {
                t = !0;
              } else {
                a(0);
              }
            } else if (0 === r.tag) {
              var o = r[0];
              a(start((e => {
                if (1 === e && !i) {
                  i = !0;
                  t = !1;
                  if (n) {
                    clearTimeout(n);
                  }
                  o(1);
                } else if (!i) {
                  o(0);
                }
              })));
            } else {
              if (n) {
                clearTimeout(n);
              }
              n = setTimeout((() => {
                n = void 0;
                a(r);
                if (t) {
                  a(0);
                }
              }), e(r[0]));
            }
          }));
        };
      }((() => l))(fromValue(makeOperation(e.kind, e, {
        ...e.context,
        retry: r
      }))));
    }))(l);
    return filter((e => {
      var n = e.operation.context.retry;
      if (!e.error || !(r ? r(e.error, e.operation) : a || e.error.networkError)) {
        if (n) {
          n.count = 0;
          n.delay = null;
        }
        return !0;
      }
      if (!((n && n.count || 0) >= i - 1)) {
        var t = a ? a(e.error, e.operation) : e.operation;
        if (!t) {
          return !0;
        }
        c(t);
        return !1;
      }
      "production" !== process.env.NODE_ENV && s({
        type: "retryExhausted",
        message: "Maximum number of retries has been reached. No further retries will be performed.",
        operation: e.operation,
        source: "retryExchange"
      });
      return !0;
    }))(e(merge([ u, d ])));
  };
};

function loadFromURL(e) {
  var r = e.interval || 6e4;
  var a = new Set;
  var n = null;
  var t = null;
  var i = null;
  var o = new x({
    url: `${e.url}`,
    fetchOptions: {
      headers: e.headers
    },
    exchanges: [ retryExchange({
      initialDelayMs: 200,
      maxDelayMs: 1500,
      maxNumberAttempts: 3,
      retryWith(e, r) {
        if (e.networkError) {
          process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        }
        return r;
      }
    }), fetchExchange ]
  });
  var introspect = async t => {
    var u = makeIntrospectionQuery(t);
    var l = await o.query(u, {});
    try {
      if (l.error) {
        throw l.error;
      } else if (l.data) {
        var c = l.data;
        return {
          introspection: {
            ...c,
            name: e.name
          },
          schema: s(c, {
            assumeValid: !0
          })
        };
      } else {
        throw new Error("Executing introspection against API failed.\nThe API failed to return any schema data or error.");
      }
    } finally {
      (() => {
        if (a.size && !n) {
          n = setTimeout((async () => {
            n = null;
            try {
              i = await load();
            } catch (e) {
              i = null;
            }
            if (i) {
              for (var e of a) {
                e(i);
              }
            }
          }), r);
        }
      })();
    }
  };
  var load = async () => {
    if (!t) {
      var e = makeIntrospectSupportQuery();
      var r = await o.query(e, {});
      if (r.error && r.error.graphQLErrors.length > 0) {
        try {
          var {introspection: a} = await introspect(_);
          t = introspectionToSupportedFeatures(a);
        } catch (e) {
          t = _;
        }
      } else if (r.data && !r.error) {
        t = toSupportedFeatures(r.data);
      } else if (r.error) {
        t = null;
        throw r.error;
      } else {
        t = _;
      }
    }
    return introspect(t);
  };
  return {
    get name() {
      return e.name;
    },
    load: async e => e || !i ? i = await load() : i,
    notifyOnUpdate(e) {
      a.add(e);
      return () => {
        a.delete(e);
        if (!a.size && n) {
          clearTimeout(n);
          n = null;
        }
      };
    },
    async loadIntrospection() {
      var e = await this.load();
      return e && e.introspection;
    },
    async loadSchema() {
      var e = await this.load();
      return e && e.schema;
    }
  };
}

var getURLConfig = e => {
  try {
    return e ? {
      url: new URL("object" == typeof e ? e.url : e),
      headers: "object" == typeof e ? e.headers : void 0
    } : null;
  } catch (e) {
    return null;
  }
};

function load(e) {
  var a = getURLConfig(e.origin);
  if (a) {
    return loadFromURL({
      ...a,
      interval: e.fetchInterval,
      name: e.name
    });
  } else if ("string" == typeof e.origin) {
    return loadFromSDL({
      file: e.rootPath ? r.resolve(e.rootPath, e.origin) : e.origin,
      assumeValid: null != e.assumeValid ? e.assumeValid : !0,
      name: e.name
    });
  } else {
    throw new Error('Configuration contains an invalid "schema" option');
  }
}

function loadRef(e) {
  var r = [];
  var a;
  var getLoaders = r => {
    if (!a) {
      a = ("schemas" in e && e.schemas || []).map((e => ({
        input: e,
        loader: load({
          ...r,
          origin: e.schema,
          name: e.name
        })
      })));
      if ("schema" in e && e.schema) {
        a.push({
          input: {
            ...e,
            name: void 0
          },
          loader: load({
            ...r,
            origin: e.schema
          })
        });
      }
    }
    return a;
  };
  var n = {
    version: 0,
    current: null,
    multi: ("schemas" in e && e.schemas || []).reduce(((e, {name: r}) => {
      if (r) {
        e[r] = null;
      }
      return e;
    }), {}),
    autoupdate(e, a) {
      var t = getLoaders(e);
      r.push(...t.map((({input: e, loader: r}) => {
        r.load().then((r => {
          n.version++;
          if (e.name) {
            n.multi[e.name] = {
              ...e,
              ...r
            };
          } else {
            n.current = {
              ...e,
              ...r
            };
          }
        })).catch((e => {}));
        return r.notifyOnUpdate((r => {
          n.version++;
          if (e.name) {
            n.multi[e.name] = {
              ...e,
              ...r
            };
          } else {
            n.current = {
              ...e,
              ...r
            };
          }
          a(n, e);
        }));
      })));
      return () => {
        var e;
        while (null != (e = r.pop())) {
          e();
        }
      };
    },
    async load(e) {
      var r = getLoaders(e);
      await Promise.all(r.map((async ({input: e, loader: r}) => {
        var a = await r.load();
        n.version++;
        if (e.name) {
          n.multi[e.name] = {
            ...e,
            ...a
          };
        } else {
          n.current = {
            ...e,
            ...a
          };
        }
      })));
      return n;
    }
  };
  return n;
}

var C = process.cwd();

var maybeRelative = r => {
  var a = e.relative(C, r);
  return !a.startsWith("..") ? a : r;
};

class TSError extends Error {
  constructor(e) {
    var r = "string" != typeof e.messageText ? e.messageText.messageText : e.messageText;
    if (e.file) {
      r += ` (${maybeRelative(e.file.fileName)})`;
    }
    super(r);
    this.name = "TSError";
    this.diagnostic = e;
  }
}

class TadaError extends Error {
  constructor(e) {
    super(e);
    this.name = "TadaError";
  }
}

var R = [ "name", "tadaOutputLocation", "tadaTurboLocation", "tadaPersistedLocation" ];

var parseSchemaConfig = (r, a) => {
  var resolveConfigDir = r => {
    if (!r) {
      return r;
    }
    return e.normalize(r.replace(/\${([^}]+)}/, ((e, r) => {
      if ("configDir" === r) {
        return a;
      } else {
        throw new TadaError(`Substitution "\${${r}}" is not recognized (did you mean 'configDir'?)`);
      }
    })));
  };
  if (null == r || "object" != typeof r) {
    throw new TadaError(`Schema is not configured properly (Received: ${r})`);
  }
  if ("schema" in r && r.schema && "object" == typeof r.schema) {
    var {schema: n} = r;
    if (!("url" in n)) {
      throw new TadaError("Configuration contains a `schema` object, but no `url` property");
    }
    if ("headers" in n && n.headers && "object" == typeof n.headers) {
      for (var t in n.headers) {
        if (n.headers[t] && "string" != typeof n.headers[t]) {
          throw new TadaError("Headers at `schema.headers` contain a non-string value at key: " + t);
        }
      }
    } else if ("headers" in n) {
      throw new TadaError("Configuration contains a `schema.headers` property, but it's not an object");
    }
  } else if (!("schema" in r) || "string" != typeof r.schema) {
    throw new TadaError("Configuration is missing a `schema` property");
  }
  if ("tadaOutputLocation" in r && r.tadaOutputLocation && "string" != typeof r.tadaOutputLocation) {
    throw new TadaError("Configuration contains a `tadaOutputLocation` property, but it's not a file path");
  }
  if ("tadaTurboLocation" in r && r.tadaTurboLocation && "string" != typeof r.tadaTurboLocation) {
    throw new TadaError("Configuration contains a `tadaTurboLocation` property, but it's not a file path");
  }
  if ("tadaPersistedLocation" in r && r.tadaPersistedLocation && "string" != typeof r.tadaPersistedLocation) {
    throw new TadaError("Configuration contains a `tadaPersistedLocation` property, but it's not a file path");
  }
  var i = r;
  var o = i.schema;
  if ("string" == typeof o) {
    if (!getURLConfig(o)) {
      o = resolveConfigDir(o) || o;
    }
  }
  return {
    ...i,
    schema: o,
    tadaOutputLocation: resolveConfigDir(i.tadaOutputLocation),
    tadaTurboLocation: resolveConfigDir(i.tadaTurboLocation),
    tadaPersistedLocation: resolveConfigDir(i.tadaPersistedLocation)
  };
};

var parseConfig = (e, r = process.cwd()) => {
  if (null == e || "object" != typeof e) {
    throw new TadaError(`Configuration is of an invalid type (Received: ${e})`);
  } else if ("template" in e && e.template && "string" != typeof e.template) {
    throw new TadaError("Configuration contains a `template` property, but it's not a string");
  } else if ("name" in e && e.name && "string" != typeof e.name) {
    throw new TadaError("Configuration contains a `name` property, but it's not a string");
  }
  if ("schemas" in e) {
    if (!Array.isArray(e.schemas)) {
      throw new TadaError("Configuration contains a `schema` property, but it's not an array");
    }
    if ("schema" in e) {
      throw new TadaError("If configuration contains a `schemas` property, it cannot contain a `schema` configuration.");
    } else if ("tadaOutputLocation" in e) {
      throw new TadaError("If configuration contains a `schemas` property, it cannot contain a 'tadaOutputLocation` configuration.");
    } else if ("tadaTurboLocation" in e) {
      throw new TadaError("If configuration contains a `schemas` property, it cannot contain a 'tadaTurboLocation` configuration.");
    } else if ("tadaPersistedLocation" in e) {
      throw new TadaError("If configuration contains a `schemas` property, it cannot contain a 'tadaPersistedLocation` configuration.");
    }
    var a = e.schemas.map((e => {
      if (!("name" in e) || !e.name || "string" != typeof e.name) {
        throw new TadaError("All `schemas` configurations must contain a `name` label.");
      }
      if (!("tadaOutputLocation" in e) || !e.tadaOutputLocation || "string" != typeof e.tadaOutputLocation) {
        throw new TadaError("All `schemas` configurations must contain a `tadaOutputLocation` path.");
      }
      return {
        ...parseSchemaConfig(e, r),
        name: e.name
      };
    }));
    var _loop = function(e) {
      var r = a.map((r => r[e])).filter(Boolean);
      var n = new Set(r);
      if (r.length !== n.size) {
        throw new TadaError(`All '${e}' values in \`schemas[]\` must be unique.`);
      }
    };
    for (var n of R) {
      _loop(n);
    }
    return {
      ...e,
      schemas: a
    };
  } else {
    return {
      ...e,
      ...parseSchemaConfig(e, r)
    };
  }
};

var getSchemaNamesFromConfig = e => new Set([ ..."schema" in e ? [ null ] : [], ..."schemas" in e ? e.schemas.map((e => e.name)) : [] ]);

var getSchemaConfigForName = (e, r) => {
  if (r && "name" in e && e.name === r) {
    return e;
  } else if (!r && !("schemas" in e)) {
    return e;
  } else if (r && "schemas" in e) {
    for (var a = 0; a < e.schemas.length; a++) {
      if (e.schemas[a].name === r) {
        return e.schemas[a];
      }
    }
    return null;
  } else {
    return null;
  }
};

var isFile = e => e.isFile();

var isDir = e => e.isDirectory();

var stat = (e, r = isFile) => m.stat(e).then(r).catch((() => !1));

var P = "undefined" != typeof require ? require.resolve.bind(require) : y(import.meta.url).resolve;

var resolveExtend = async (e, r) => {
  try {
    return toTSConfigPath(P(e, {
      paths: [ r ]
    }));
  } catch (e) {
    return null;
  }
};

var toTSConfigPath = r => ".json" !== e.extname(r) ? e.resolve(C, r, "tsconfig.json") : e.resolve(C, r);

var readTSConfigFile = async e => {
  var r = toTSConfigPath(e);
  var n = await m.readFile(r, "utf8");
  var t = a.parseConfigFileTextToJson(r, n);
  if (t.error) {
    throw new TSError(t.error);
  }
  return t.config || {};
};

var findTSConfigFile = async r => {
  var a = toTSConfigPath(r || C);
  var n = toTSConfigPath(e.resolve(a, "/"));
  while (a !== n) {
    if (await stat(a)) {
      return a;
    }
    var t = e.resolve(a, "..", ".git");
    if (await stat(t, isDir)) {
      return null;
    }
    var i = toTSConfigPath(e.resolve(a, "..", ".."));
    if (i === a) {
      break;
    }
    a = i;
  }
  return null;
};

var loadConfig = async r => {
  var a = await findTSConfigFile(r);
  if (!a) {
    throw new TadaError(r ? `No tsconfig.json found at or above: ${maybeRelative(r)}` : "No tsconfig.json found at or above current working directory");
  }
  var load = async r => {
    var n = await readTSConfigFile(r);
    var t = (e => e && e.compilerOptions && e.compilerOptions.plugins && e.compilerOptions.plugins.find((e => "@0no-co/graphqlsp" === e.name || "gql.tada/lsp" === e.name || "gql.tada/ts-plugin" === e.name)) || null)(n);
    if (t) {
      return {
        pluginConfig: t,
        configPath: r,
        rootPath: e.dirname(a)
      };
    }
    if (Array.isArray(n.extends)) {
      for (var i of n.extends) {
        if (".json" !== e.extname(i)) {
          i += ".json";
        }
        try {
          var o = await resolveExtend(i, e.dirname(a));
          if (o) {
            return await load(o);
          }
        } catch (e) {}
      }
    } else if (n.extends) {
      try {
        var s = await resolveExtend(n.extends, e.dirname(a));
        if (s) {
          return await load(s);
        }
      } catch (e) {}
    }
    throw new TadaError(`Could not find a valid GraphQLSP plugin entry in: ${maybeRelative(a)}`);
  };
  return await load(a);
};

var resolveTypeScriptRootDir = async r => {
  try {
    var a = await loadConfig(r);
    return e.dirname(a.configPath);
  } catch (e) {
    return;
  }
};

function nameCompare(e, r) {
  return e.name < r.name ? -1 : e.name > r.name ? 1 : 0;
}

function mapTypeRef(e) {
  switch (e.kind) {
   case "NON_NULL":
   case "LIST":
    return {
      kind: e.kind,
      ofType: mapTypeRef(e.ofType)
    };

   case "INPUT_OBJECT":
   case "ENUM":
   case "SCALAR":
   case "OBJECT":
   case "INTERFACE":
   case "UNION":
    return {
      kind: e.kind,
      name: e.name
    };
  }
}

function mapEnumValue(e) {
  return {
    name: e.name,
    isDeprecated: !!e.isDeprecated,
    deprecationReason: void 0
  };
}

function mapInputField(e) {
  return {
    name: e.name,
    type: mapTypeRef(e.type),
    defaultValue: e.defaultValue || void 0
  };
}

function mapField(e) {
  return {
    name: e.name,
    type: mapTypeRef(e.type),
    args: e.args ? e.args.map(mapInputField).sort(nameCompare) : [],
    isDeprecated: !!e.isDeprecated,
    deprecationReason: void 0
  };
}

function mapPossibleType(e) {
  return {
    kind: e.kind,
    name: e.name
  };
}

function minifyIntrospectionType(e) {
  switch (e.kind) {
   case "SCALAR":
    return {
      kind: "SCALAR",
      name: e.name
    };

   case "ENUM":
    return {
      kind: "ENUM",
      name: e.name,
      enumValues: e.enumValues.map(mapEnumValue)
    };

   case "INPUT_OBJECT":
    return {
      kind: "INPUT_OBJECT",
      name: e.name,
      inputFields: e.inputFields.map(mapInputField),
      isOneOf: e.isOneOf || !1
    };

   case "OBJECT":
    return {
      kind: "OBJECT",
      name: e.name,
      fields: e.fields ? e.fields.map(mapField).sort(nameCompare) : [],
      interfaces: e.interfaces ? e.interfaces.map(mapPossibleType).sort(nameCompare) : []
    };

   case "INTERFACE":
    return {
      kind: "INTERFACE",
      name: e.name,
      fields: e.fields ? e.fields.map(mapField).sort(nameCompare) : [],
      interfaces: e.interfaces ? e.interfaces.map(mapPossibleType).sort(nameCompare) : [],
      possibleTypes: e.possibleTypes ? e.possibleTypes.map(mapPossibleType).sort(nameCompare) : []
    };

   case "UNION":
    return {
      kind: "UNION",
      name: e.name,
      possibleTypes: e.possibleTypes ? e.possibleTypes.map(mapPossibleType).sort(nameCompare) : []
    };
  }
}

var minifyIntrospectionQuery = e => {
  if (!e || !("__schema" in e)) {
    throw new TypeError("Expected to receive an IntrospectionQuery.");
  }
  var {__schema: {queryType: r, mutationType: a, subscriptionType: n, types: t}} = e;
  var i = t.filter((e => {
    switch (e.name) {
     case "__Directive":
     case "__DirectiveLocation":
     case "__EnumValue":
     case "__InputValue":
     case "__Field":
     case "__Type":
     case "__TypeKind":
     case "__Schema":
      return !1;

     default:
      return "SCALAR" === e.kind || "ENUM" === e.kind || "INPUT_OBJECT" === e.kind || "OBJECT" === e.kind || "INTERFACE" === e.kind || "UNION" === e.kind;
    }
  })).map(minifyIntrospectionType).sort(nameCompare);
  return {
    name: "name" in e ? e.name : void 0,
    __schema: {
      queryType: {
        kind: r.kind,
        name: r.name
      },
      mutationType: a ? {
        kind: a.kind,
        name: a.name
      } : null,
      subscriptionType: n ? {
        kind: n.kind,
        name: n.name
      } : null,
      types: i,
      directives: []
    }
  };
};

var printName = e => e ? `'${e}'` : "never";

var printTypeRef = e => {
  if ("NON_NULL" === e.kind) {
    return `{ kind: 'NON_NULL'; name: never; ofType: ${printTypeRef(e.ofType)}; }`;
  } else if ("LIST" === e.kind) {
    return `{ kind: 'LIST'; name: never; ofType: ${printTypeRef(e.ofType)}; }`;
  } else {
    return `{ kind: ${printName(e.kind)}; name: ${printName(e.name)}; ofType: null; }`;
  }
};

var printNamedTypes = e => {
  if (!e.length) {
    return "never";
  }
  var r = "";
  for (var a of e) {
    if (r) {
      r += " | ";
    }
    r += printName(a.name);
  }
  return r;
};

var printFields = e => {
  var r = "";
  for (var a of e) {
    var n = printName(a.name);
    var t = printTypeRef(a.type);
    r += `${printName(a.name)}: { name: ${n}; type: ${t} }; `;
  }
  return `{ ${r}}`;
};

var printIntrospectionType = e => {
  if ("ENUM" === e.kind) {
    var r = printNamedTypes(e.enumValues);
    return `{ name: ${printName(e.name)}; enumValues: ${r}; }`;
  } else if ("INPUT_OBJECT" === e.kind) {
    var a = (e => {
      var r = "";
      for (var a of e) {
        if (r) {
          r += ", ";
        }
        r += `{ name: ${printName(a.name)}; type: ${printTypeRef(a.type)}; defaultValue: ${a.defaultValue ? JSON.stringify(a.defaultValue) : "null"} }`;
      }
      return `[${r}]`;
    })(e.inputFields);
    return `{ kind: 'INPUT_OBJECT'; name: ${printName(e.name)}; isOneOf: ${e.isOneOf || !1}; inputFields: ${a}; }`;
  } else if ("OBJECT" === e.kind) {
    var n = printFields(e.fields);
    return `{ kind: 'OBJECT'; name: ${printName(e.name)}; fields: ${n}; }`;
  } else if ("INTERFACE" === e.kind) {
    return `{ kind: 'INTERFACE'; name: ${printName(e.name)}; fields: ${printFields(e.fields)}; possibleTypes: ${printNamedTypes(e.possibleTypes)}; }`;
  } else if ("UNION" === e.kind) {
    return `{ kind: 'UNION'; name: ${printName(e.name)}; fields: {}; possibleTypes: ${printNamedTypes(e.possibleTypes)}; }`;
  } else {
    return "unknown";
  }
};

function preprocessIntrospectionTypes(e) {
  var r = "";
  for (var a of e.__schema.types) {
    var n = printIntrospectionType(a);
    if (r) {
      r += "\n";
    }
    r += `    ${printName(a.name)}: ${n};`;
  }
  return `{\n${r}\n}`;
}

function preprocessIntrospection(e, r = preprocessIntrospectionTypes(e)) {
  var {__schema: a} = e;
  var n = "name" in e ? e.name : void 0;
  var t = printName(a.queryType.name);
  var i = printName(a.mutationType && a.mutationType.name);
  var o = printName(a.subscriptionType && a.subscriptionType.name);
  return `{\n  name: ${printName(n)};\n  query: ${t};\n  mutation: ${i};\n  subscription: ${o};\n  types: ${r};\n}`;
}

var $ = [ "/* eslint-disable */", "/* prettier-ignore */" ].join("\n") + "\n";

var q = [ "/** An IntrospectionQuery representation of your schema.", " *", " * @remarks", " * This is an introspection of your schema saved as a file by GraphQLSP.", " * It will automatically be used by `gql.tada` to infer the types of your GraphQL documents.", " * If you need to reuse this data or update your `scalars`, update `tadaOutputLocation` to", " * instead save to a .ts instead of a .d.ts file.", " */" ].join("\n");

var U = [ "/** An IntrospectionQuery representation of your schema.", " *", " * @remarks", " * This is an introspection of your schema saved as a file by GraphQLSP.", " * You may import it to create a `graphql()` tag function with `gql.tada`", " * by importing it and passing it to `initGraphQLTada<>()`.", " *", " * @example", " * ```", " * import { initGraphQLTada } from 'gql.tada';", " * import type { introspection } from './introspection';", " *", " * export const graphql = initGraphQLTada<{", " *   introspection: typeof introspection;", " *   scalars: {", " *     DateTime: string;", " *     Json: any;", " *   };", " * }>();", " * ```", " */" ].join("\n");

var V = "introspection_types";

var stringifyJson = e => "string" == typeof e ? e : JSON.stringify(e, null, 2);

function outputIntrospectionFile(e, r) {
  if (/\.d\.ts$/.test(r.fileType)) {
    var a = [ $ ];
    if ("string" != typeof e && r.shouldPreprocess) {
      a.push(`export type ${V} = ${preprocessIntrospectionTypes(e)};\n`, q, `export type introspection = ${preprocessIntrospection(e, V)};\n`, "import * as gqlTada from 'gql.tada';\n");
    } else {
      a.push(q, `export type introspection = ${stringifyJson(e)};\n`, "import * as gqlTada from 'gql.tada';\n");
    }
    if (!("name" in e) || !e.name) {
      a.push("declare module 'gql.tada' {", "  interface setupSchema {", "    introspection: introspection", "  }", "}");
    }
    return a.join("\n");
  } else if (/\.ts$/.test(r.fileType)) {
    var n = stringifyJson(e);
    return [ $, U, `const introspection = ${n} as const;\n`, "export { introspection };" ].join("\n");
  }
  throw new TadaError(`No available introspection format for "${r.fileType}" (expected ".ts" or ".d.ts")`);
}

export { TSError, TadaError, findTSConfigFile, getSchemaConfigForName, getSchemaNamesFromConfig, getURLConfig, load, loadConfig, loadFromSDL, loadFromURL, loadRef, minifyIntrospectionQuery as minifyIntrospection, outputIntrospectionFile, parseConfig, preprocessIntrospection, readTSConfigFile, resolveTypeScriptRootDir };
//# sourceMappingURL=gql-tada-internal.mjs.map
