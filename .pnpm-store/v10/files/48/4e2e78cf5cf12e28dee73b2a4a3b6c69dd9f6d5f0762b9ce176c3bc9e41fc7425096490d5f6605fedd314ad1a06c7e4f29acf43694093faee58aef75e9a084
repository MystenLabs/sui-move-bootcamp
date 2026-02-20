Object.defineProperty(exports, "__esModule", {
  value: !0
});

var e = require("node:path");

var n = require("typescript");

var r = require("graphql");

var a = require("@0no-co/graphql.web");

var t = require("node:fs/promises");

var i = require("node:module");

var o = "undefined" != typeof document ? document.currentScript : null;

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach((function(r) {
      if ("default" !== r) {
        var a = Object.getOwnPropertyDescriptor(e, r);
        Object.defineProperty(n, r, a.get ? a : {
          enumerable: !0,
          get: function() {
            return e[r];
          }
        });
      }
    }));
  }
  n.default = e;
  return n;
}

var s = _interopNamespaceDefault(e);

var d = _interopNamespaceDefault(t);

var teardownPlaceholder = () => {};

var u = teardownPlaceholder;

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
  return n => r => {
    var a = u;
    n((n => {
      if (0 === n) {
        r(0);
      } else if (0 === n.tag) {
        a = n[0];
        r(n);
      } else if (!e(n[0])) {
        a(0);
      } else {
        r(n);
      }
    }));
  };
}

function map(e) {
  return n => r => n((n => {
    if (0 === n || 0 === n.tag) {
      r(n);
    } else {
      r(push(e(n[0])));
    }
  }));
}

function mergeMap(e) {
  return n => r => {
    var a = [];
    var t = u;
    var i = !1;
    var o = !1;
    n((n => {
      if (o) {} else if (0 === n) {
        o = !0;
        if (!a.length) {
          r(0);
        }
      } else if (0 === n.tag) {
        t = n[0];
      } else {
        i = !1;
        !function applyInnerSource(e) {
          var n = u;
          e((e => {
            if (0 === e) {
              if (a.length) {
                var s = a.indexOf(n);
                if (s > -1) {
                  (a = a.slice()).splice(s, 1);
                }
                if (!a.length) {
                  if (o) {
                    r(0);
                  } else if (!i) {
                    i = !0;
                    t(0);
                  }
                }
              }
            } else if (0 === e.tag) {
              a.push(n = e[0]);
              n(0);
            } else if (a.length) {
              r(e);
              n(0);
            }
          }));
        }(e(n[0]));
        if (!i) {
          i = !0;
          t(0);
        }
      }
    }));
    r(start((e => {
      if (1 === e) {
        if (!o) {
          o = !0;
          t(1);
        }
        for (var n = 0, r = a, s = a.length; n < s; n++) {
          r[n](1);
        }
        a.length = 0;
      } else {
        if (!o && !i) {
          i = !0;
          t(0);
        } else {
          i = !1;
        }
        for (var d = 0, u = a, l = a.length; d < l; d++) {
          u[d](0);
        }
      }
    })));
  };
}

function merge(e) {
  return function mergeAll(e) {
    return mergeMap(identity)(e);
  }(l(e));
}

function onEnd(e) {
  return n => r => {
    var a = !1;
    n((n => {
      if (a) {} else if (0 === n) {
        a = !0;
        r(0);
        e();
      } else if (0 === n.tag) {
        var t = n[0];
        r(start((n => {
          if (1 === n) {
            a = !0;
            t(1);
            e();
          } else {
            t(n);
          }
        })));
      } else {
        r(n);
      }
    }));
  };
}

function onPush(e) {
  return n => r => {
    var a = !1;
    n((n => {
      if (a) {} else if (0 === n) {
        a = !0;
        r(0);
      } else if (0 === n.tag) {
        var t = n[0];
        r(start((e => {
          if (1 === e) {
            a = !0;
          }
          t(e);
        })));
      } else {
        e(n[0]);
        r(n);
      }
    }));
  };
}

function onStart(e) {
  return n => r => n((n => {
    if (0 === n) {
      r(0);
    } else if (0 === n.tag) {
      r(n);
      e();
    } else {
      r(n);
    }
  }));
}

function share(e) {
  var n = [];
  var r = u;
  var a = !1;
  return t => {
    n.push(t);
    if (1 === n.length) {
      e((e => {
        if (0 === e) {
          for (var t = 0, i = n, o = n.length; t < o; t++) {
            i[t](0);
          }
          n.length = 0;
        } else if (0 === e.tag) {
          r = e[0];
        } else {
          a = !1;
          for (var s = 0, d = n, u = n.length; s < u; s++) {
            d[s](e);
          }
        }
      }));
    }
    t(start((e => {
      if (1 === e) {
        var i = n.indexOf(t);
        if (i > -1) {
          (n = n.slice()).splice(i, 1);
        }
        if (!n.length) {
          r(1);
        }
      } else if (!a) {
        a = !0;
        r(0);
      }
    })));
  };
}

function switchMap(e) {
  return n => r => {
    var a = u;
    var t = u;
    var i = !1;
    var o = !1;
    var s = !1;
    var d = !1;
    n((n => {
      if (d) {} else if (0 === n) {
        d = !0;
        if (!s) {
          r(0);
        }
      } else if (0 === n.tag) {
        a = n[0];
      } else {
        if (s) {
          t(1);
          t = u;
        }
        if (!i) {
          i = !0;
          a(0);
        } else {
          i = !1;
        }
        !function applyInnerSource(e) {
          s = !0;
          e((e => {
            if (!s) {} else if (0 === e) {
              s = !1;
              if (d) {
                r(0);
              } else if (!i) {
                i = !0;
                a(0);
              }
            } else if (0 === e.tag) {
              o = !1;
              (t = e[0])(0);
            } else {
              r(e);
              if (!o) {
                t(0);
              } else {
                o = !1;
              }
            }
          }));
        }(e(n[0]));
      }
    }));
    r(start((e => {
      if (1 === e) {
        if (!d) {
          d = !0;
          a(1);
        }
        if (s) {
          s = !1;
          t(1);
        }
      } else {
        if (!d && !i) {
          i = !0;
          a(0);
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
  return n => r => {
    var a = u;
    var t = !1;
    var i = 0;
    n((n => {
      if (t) {} else if (0 === n) {
        t = !0;
        r(0);
      } else if (0 === n.tag) {
        a = n[0];
      } else if (i++ < e) {
        r(n);
        if (!t && i >= e) {
          t = !0;
          r(0);
          a(1);
        }
      } else {
        r(n);
      }
    }));
    r(start((n => {
      if (1 === n && !t) {
        t = !0;
        a(1);
      } else if (0 === n && !t && i < e) {
        a(0);
      }
    })));
  };
}

function takeUntil(e) {
  return n => r => {
    var a = u;
    var t = u;
    var i = !1;
    n((n => {
      if (i) {} else if (0 === n) {
        i = !0;
        t(1);
        r(0);
      } else if (0 === n.tag) {
        a = n[0];
        e((e => {
          if (0 === e) {} else if (0 === e.tag) {
            (t = e[0])(0);
          } else {
            i = !0;
            t(1);
            a(1);
            r(0);
          }
        }));
      } else {
        r(n);
      }
    }));
    r(start((e => {
      if (1 === e && !i) {
        i = !0;
        a(1);
        t(1);
      } else if (!i) {
        a(0);
      }
    })));
  };
}

function takeWhile(e, n) {
  return n => r => {
    var a = u;
    var t = !1;
    n((n => {
      if (t) {} else if (0 === n) {
        t = !0;
        r(0);
      } else if (0 === n.tag) {
        a = n[0];
        r(n);
      } else if (!e(n[0])) {
        t = !0;
        r(n);
        r(0);
        a(1);
      } else {
        r(n);
      }
    }));
  };
}

function fromAsyncIterable(e) {
  return n => {
    var r = e[asyncIteratorSymbol()] && e[asyncIteratorSymbol()]() || e;
    var a = !1;
    var t = !1;
    var i = !1;
    var o;
    n(start((async e => {
      if (1 === e) {
        a = !0;
        if (r.return) {
          r.return();
        }
      } else if (t) {
        i = !0;
      } else {
        for (i = t = !0; i && !a; ) {
          if ((o = await r.next()).done) {
            a = !0;
            if (r.return) {
              await r.return();
            }
            n(0);
          } else {
            try {
              i = !1;
              n(push(o.value));
            } catch (e) {
              if (r.throw) {
                if (a = !!(await r.throw(e)).done) {
                  n(0);
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

var l = function fromIterable(e) {
  if (e[Symbol.asyncIterator]) {
    return fromAsyncIterable(e);
  }
  return n => {
    var r = e[Symbol.iterator]();
    var a = !1;
    var t = !1;
    var i = !1;
    var o;
    n(start((e => {
      if (1 === e) {
        a = !0;
        if (r.return) {
          r.return();
        }
      } else if (t) {
        i = !0;
      } else {
        for (i = t = !0; i && !a; ) {
          if ((o = r.next()).done) {
            a = !0;
            if (r.return) {
              r.return();
            }
            n(0);
          } else {
            try {
              i = !1;
              n(push(o.value));
            } catch (e) {
              if (r.throw) {
                if (a = !!r.throw(e).done) {
                  n(0);
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
  return n => {
    var r = !1;
    n(start((a => {
      if (1 === a) {
        r = !0;
      } else if (!r) {
        r = !0;
        n(push(e));
        n(0);
      }
    })));
  };
}

function make(e) {
  return n => {
    var r = !1;
    var a = e({
      next(e) {
        if (!r) {
          n(push(e));
        }
      },
      complete() {
        if (!r) {
          r = !0;
          n(0);
        }
      }
    });
    n(start((e => {
      if (1 === e && !r) {
        r = !0;
        a();
      }
    })));
  };
}

function makeSubject() {
  var e;
  var n;
  return {
    source: share(make((r => {
      e = r.next;
      n = r.complete;
      return teardownPlaceholder;
    }))),
    next(n) {
      if (e) {
        e(n);
      }
    },
    complete() {
      if (n) {
        n();
      }
    }
  };
}

function subscribe(e) {
  return n => {
    var r = u;
    var a = !1;
    n((n => {
      if (0 === n) {
        a = !0;
      } else if (0 === n.tag) {
        (r = n[0])(0);
      } else if (!a) {
        e(n[0]);
        r(0);
      }
    }));
    return {
      unsubscribe() {
        if (!a) {
          a = !0;
          r(1);
        }
      }
    };
  };
}

function toPromise(e) {
  return new Promise((n => {
    var r = u;
    var a;
    e((e => {
      if (0 === e) {
        Promise.resolve(a).then(n);
      } else if (0 === e.tag) {
        (r = e[0])(0);
      } else {
        a = e[0];
        r(0);
      }
    }));
  }));
}

var rehydrateGraphQlError = e => {
  if (e && "string" == typeof e.message && (e.extensions || "GraphQLError" === e.name)) {
    return e;
  } else if ("object" == typeof e && "string" == typeof e.message) {
    return new a.GraphQLError(e.message, e.nodes, e.source, e.positions, e.path, e, e.extensions || {});
  } else {
    return new a.GraphQLError(e);
  }
};

class CombinedError extends Error {
  constructor(e) {
    var n = (e.graphQLErrors || []).map(rehydrateGraphQlError);
    var r = ((e, n) => {
      var r = "";
      if (e) {
        return `[Network] ${e.message}`;
      }
      if (n) {
        for (var a of n) {
          if (r) {
            r += "\n";
          }
          r += `[GraphQL] ${a.message}`;
        }
      }
      return r;
    })(e.networkError, n);
    super(r);
    this.name = "CombinedError";
    this.message = r;
    this.graphQLErrors = n;
    this.networkError = e.networkError;
    this.response = e.response;
  }
  toString() {
    return this.message;
  }
}

var phash = (e, n) => {
  var r = 0 | (n || 5381);
  for (var a = 0, t = 0 | e.length; a < t; a++) {
    r = (r << 5) + r + e.charCodeAt(a);
  }
  return r;
};

var c = new Set;

var p = new WeakMap;

var stringify = (e, n) => {
  if (null === e || c.has(e)) {
    return "null";
  } else if ("object" != typeof e) {
    return JSON.stringify(e) || "";
  } else if (e.toJSON) {
    return stringify(e.toJSON(), n);
  } else if (Array.isArray(e)) {
    var r = "[";
    for (var a of e) {
      if (r.length > 1) {
        r += ",";
      }
      r += stringify(a, n) || "null";
    }
    return r + "]";
  } else if (!n && (f !== NoopConstructor && e instanceof f || m !== NoopConstructor && e instanceof m)) {
    return "null";
  }
  var t = Object.keys(e).sort();
  if (!t.length && e.constructor && Object.getPrototypeOf(e).constructor !== Object.prototype.constructor) {
    var i = p.get(e) || Math.random().toString(36).slice(2);
    p.set(e, i);
    return stringify({
      __key: i
    }, n);
  }
  c.add(e);
  var o = "{";
  for (var s of t) {
    var d = stringify(e[s], n);
    if (d) {
      if (o.length > 1) {
        o += ",";
      }
      o += stringify(s, n) + ":" + d;
    }
  }
  c.delete(e);
  return o + "}";
};

var extract = (e, n, r) => {
  if (null == r || "object" != typeof r || r.toJSON || c.has(r)) {} else if (Array.isArray(r)) {
    for (var a = 0, t = r.length; a < t; a++) {
      extract(e, `${n}.${a}`, r[a]);
    }
  } else if (r instanceof f || r instanceof m) {
    e.set(n, r);
  } else {
    c.add(r);
    for (var i of Object.keys(r)) {
      extract(e, `${n}.${i}`, r[i]);
    }
  }
};

var stringifyVariables = (e, n) => {
  c.clear();
  return stringify(e, n || !1);
};

class NoopConstructor {}

var f = "undefined" != typeof File ? File : NoopConstructor;

var m = "undefined" != typeof Blob ? Blob : NoopConstructor;

var v = /("{3}[\s\S]*"{3}|"(?:\\.|[^"])*")/g;

var y = /(?:#[^\n\r]+)?(?:[\r\n]+|$)/g;

var replaceOutsideStrings = (e, n) => n % 2 == 0 ? e.replace(y, "\n") : e;

var sanitizeDocument = e => e.split(v).map(replaceOutsideStrings).join("").trim();

var h = new Map;

var E = new Map;

var stringifyDocument = e => {
  var n;
  if ("string" == typeof e) {
    n = sanitizeDocument(e);
  } else if (e.loc && E.get(e.__key) === e) {
    n = e.loc.source.body;
  } else {
    n = h.get(e) || sanitizeDocument(a.print(e));
    h.set(e, n);
  }
  if ("string" != typeof e && !e.loc) {
    e.loc = {
      start: 0,
      end: n.length,
      source: {
        body: n,
        name: "gql",
        locationOffset: {
          line: 1,
          column: 1
        }
      }
    };
  }
  return n;
};

var hashDocument = e => {
  var n;
  if (e.documentId) {
    n = phash(e.documentId);
  } else {
    n = phash(stringifyDocument(e));
    if (e.definitions) {
      var r = getOperationName(e);
      if (r) {
        n = phash(`\n# ${r}`, n);
      }
    }
  }
  return n;
};

var createRequest = (e, n, r) => {
  var t = n || {};
  var i = (e => {
    var n;
    var r;
    if ("string" == typeof e) {
      n = hashDocument(e);
      r = E.get(n) || a.parse(e, {
        noLocation: !0
      });
    } else {
      n = e.__key || hashDocument(e);
      r = E.get(n) || e;
    }
    if (!r.loc) {
      stringifyDocument(r);
    }
    r.__key = n;
    E.set(n, r);
    return r;
  })(e);
  var o = stringifyVariables(t, !0);
  var s = i.__key;
  if ("{}" !== o) {
    s = phash(o, s);
  }
  return {
    key: s,
    query: i,
    variables: t,
    extensions: r
  };
};

var getOperationName = e => {
  for (var n of e.definitions) {
    if (n.kind === a.Kind.OPERATION_DEFINITION) {
      return n.name ? n.name.value : void 0;
    }
  }
};

var makeResult = (e, n, r) => {
  if (!("data" in n || "errors" in n && Array.isArray(n.errors))) {
    throw new Error("No Content");
  }
  var a = "subscription" === e.kind;
  return {
    operation: e,
    data: n.data,
    error: Array.isArray(n.errors) ? new CombinedError({
      graphQLErrors: n.errors,
      response: r
    }) : void 0,
    extensions: n.extensions ? {
      ...n.extensions
    } : void 0,
    hasNext: null == n.hasNext ? a : n.hasNext,
    stale: !1
  };
};

var deepMerge = (e, n) => {
  if ("object" == typeof e && null != e) {
    if (!e.constructor || e.constructor === Object || Array.isArray(e)) {
      e = Array.isArray(e) ? [ ...e ] : {
        ...e
      };
      for (var r of Object.keys(n)) {
        e[r] = deepMerge(e[r], n[r]);
      }
      return e;
    }
  }
  return n;
};

var mergeResultPatch = (e, n, r, a) => {
  var t = e.error ? e.error.graphQLErrors : [];
  var i = !!e.extensions || !!(n.payload || n).extensions;
  var o = {
    ...e.extensions,
    ...(n.payload || n).extensions
  };
  var s = n.incremental;
  if ("path" in n) {
    s = [ n ];
  }
  var d = {
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
      var n = "data";
      var r = d;
      var s = [];
      if (e.path) {
        s = e.path;
      } else if (a) {
        var u = a.find((n => n.id === e.id));
        if (e.subPath) {
          s = [ ...u.path, ...e.subPath ];
        } else {
          s = u.path;
        }
      }
      for (var l = 0, c = s.length; l < c; n = s[l++]) {
        r = r[n] = Array.isArray(r[n]) ? [ ...r[n] ] : {
          ...r[n]
        };
      }
      if (e.items) {
        var p = +n >= 0 ? n : 0;
        for (var f = 0, m = e.items.length; f < m; f++) {
          r[p + f] = deepMerge(r[p + f], e.items[f]);
        }
      } else if (void 0 !== e.data) {
        r[n] = deepMerge(r[n], e.data);
      }
    };
    for (var u of s) {
      _loop(u);
    }
  } else {
    d.data = (n.payload || n).data || e.data;
    t = n.errors || n.payload && n.payload.errors || t;
  }
  return {
    operation: e.operation,
    data: d.data,
    error: t.length ? new CombinedError({
      graphQLErrors: t,
      response: r
    }) : void 0,
    extensions: i ? o : void 0,
    hasNext: null != n.hasNext ? n.hasNext : e.hasNext,
    stale: !1
  };
};

var makeErrorResult = (e, n, r) => ({
  operation: e,
  data: void 0,
  error: new CombinedError({
    networkError: n,
    response: r
  }),
  extensions: void 0,
  hasNext: !1,
  stale: !1
});

var splitOutSearchParams = e => {
  var n = e.indexOf("?");
  return n > -1 ? [ e.slice(0, n), new URLSearchParams(e.slice(n + 1)) ] : [ e, new URLSearchParams ];
};

var makeFetchOptions = (e, n) => {
  var r = {
    accept: "subscription" === e.kind ? "text/event-stream, multipart/mixed" : "application/graphql-response+json, application/graphql+json, application/json, text/event-stream, multipart/mixed"
  };
  var a = ("function" == typeof e.context.fetchOptions ? e.context.fetchOptions() : e.context.fetchOptions) || {};
  if (a.headers) {
    if ((e => "has" in e && !Object.keys(e).length)(a.headers)) {
      a.headers.forEach(((e, n) => {
        r[n] = e;
      }));
    } else if (Array.isArray(a.headers)) {
      a.headers.forEach(((e, n) => {
        if (Array.isArray(e)) {
          if (r[e[0]]) {
            r[e[0]] = `${r[e[0]]},${e[1]}`;
          } else {
            r[e[0]] = e[1];
          }
        } else {
          r[n] = e;
        }
      }));
    } else {
      for (var t in a.headers) {
        r[t.toLowerCase()] = a.headers[t];
      }
    }
  }
  var i = ((e, n) => {
    if (n && ("query" !== e.kind || !e.context.preferGetMethod)) {
      var r = stringifyVariables(n);
      var a = (e => {
        var n = new Map;
        if (f !== NoopConstructor || m !== NoopConstructor) {
          c.clear();
          extract(n, "variables", e);
        }
        return n;
      })(n.variables);
      if (a.size) {
        var t = new FormData;
        t.append("operations", r);
        t.append("map", stringifyVariables({
          ...[ ...a.keys() ].map((e => [ e ]))
        }));
        var i = 0;
        for (var o of a.values()) {
          t.append("" + i++, o);
        }
        return t;
      }
      return r;
    }
  })(e, n);
  if ("string" == typeof i && !r["content-type"]) {
    r["content-type"] = "application/json";
  }
  return {
    ...a,
    method: i ? "POST" : "GET",
    body: i,
    headers: r
  };
};

var k = "undefined" != typeof TextDecoder ? new TextDecoder : null;

var g = /boundary="?([^=";]+)"?/i;

var N = /data: ?([^\n]+)/;

var toString = e => "Buffer" === e.constructor.name ? e.toString() : k.decode(e);

async function* streamBody(e) {
  if (e.body[Symbol.asyncIterator]) {
    for await (var n of e.body) {
      yield toString(n);
    }
  } else {
    var r = e.body.getReader();
    var a;
    try {
      while (!(a = await r.read()).done) {
        yield toString(a.value);
      }
    } finally {
      r.cancel();
    }
  }
}

async function* split(e, n) {
  var r = "";
  var a;
  for await (var t of e) {
    r += t;
    while ((a = r.indexOf(n)) > -1) {
      yield r.slice(0, a);
      r = r.slice(a + n.length);
    }
  }
}

function makeFetchSource(e, n, r) {
  var a;
  if ("undefined" != typeof AbortController) {
    r.signal = (a = new AbortController).signal;
  }
  return onEnd((() => {
    if (a) {
      a.abort();
    }
  }))(filter((e => !!e))(fromAsyncIterable(async function* fetchOperation(e, n, r) {
    var a = !0;
    var t = null;
    var i;
    try {
      yield await Promise.resolve();
      var o = (i = await (e.context.fetch || fetch)(n, r)).headers.get("Content-Type") || "";
      var s;
      if (/multipart\/mixed/i.test(o)) {
        s = async function* parseMultipartMixed(e, n) {
          var r = e.match(g);
          var a = "--" + (r ? r[1] : "-");
          var t = !0;
          var i;
          for await (var o of split(streamBody(n), "\r\n" + a)) {
            if (t) {
              t = !1;
              var s = o.indexOf(a);
              if (s > -1) {
                o = o.slice(s + a.length);
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
          var n;
          for await (var r of split(streamBody(e), "\n\n")) {
            var a = r.match(N);
            if (a) {
              var t = a[1];
              try {
                yield n = JSON.parse(t);
              } catch (e) {
                if (!n) {
                  throw e;
                }
              }
              if (n && !1 === n.hasNext) {
                break;
              }
            }
          }
          if (n && !1 !== n.hasNext) {
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
          var n = await e.text();
          try {
            var r = JSON.parse(n);
            if ("production" !== process.env.NODE_ENV) {
              console.warn('Found response with content-type "text/plain" but it had a valid "application/json" response.');
            }
            yield r;
          } catch (e) {
            throw new Error(n);
          }
        }(i);
      }
      var d;
      for await (var u of s) {
        if (u.pending && !t) {
          d = u.pending;
        } else if (u.pending) {
          d = [ ...d, ...u.pending ];
        }
        t = t ? mergeResultPatch(t, u, i, d) : makeResult(e, u, i);
        a = !1;
        yield t;
        a = !0;
      }
      if (!t) {
        yield t = makeResult(e, {}, i);
      }
    } catch (n) {
      if (!a) {
        throw n;
      }
      yield makeErrorResult(e, i && (i.status < 200 || i.status >= 300) && i.statusText ? new Error(i.statusText) : n, i);
    }
  }(e, n, r))));
}

function withPromise(e) {
  var source$ = n => e(n);
  source$.toPromise = () => toPromise(take(1)(filter((e => !e.stale && !e.hasNext))(source$)));
  source$.then = (e, n) => source$.toPromise().then(e, n);
  source$.subscribe = e => subscribe(e)(source$);
  return source$;
}

function makeOperation(e, n, r) {
  return {
    ...n,
    kind: e,
    context: n.context ? {
      ...n.context,
      ...r
    } : r || n.context
  };
}

var noop = () => {};

var fetchExchange = ({forward: e, dispatchDebug: n}) => r => {
  var a = mergeMap((e => {
    var a = function makeFetchBody(e) {
      var n = {
        query: void 0,
        documentId: void 0,
        operationName: getOperationName(e.query),
        variables: e.variables || void 0,
        extensions: e.extensions
      };
      if ("documentId" in e.query && e.query.documentId && (!e.query.definitions || !e.query.definitions.length)) {
        n.documentId = e.query.documentId;
      } else if (!e.extensions || !e.extensions.persistedQuery || e.extensions.persistedQuery.miss) {
        n.query = stringifyDocument(e.query);
      }
      return n;
    }(e);
    var t = ((e, n) => {
      var r = "query" === e.kind && e.context.preferGetMethod;
      if (!r || !n) {
        return e.context.url;
      }
      var a = splitOutSearchParams(e.context.url);
      for (var t in n) {
        var i = n[t];
        if (i) {
          a[1].set(t, "object" == typeof i ? stringifyVariables(i) : i);
        }
      }
      var o = a.join("?");
      if (o.length > 2047 && "force" !== r) {
        e.context.preferGetMethod = !1;
        return e.context.url;
      }
      return o;
    })(e, a);
    var i = makeFetchOptions(e, a);
    "production" !== process.env.NODE_ENV && n({
      type: "fetchRequest",
      message: "A fetch request is being executed.",
      operation: e,
      data: {
        url: t,
        fetchOptions: i
      },
      source: "fetchExchange"
    });
    var o = takeUntil(filter((n => "teardown" === n.kind && n.key === e.key))(r))(makeFetchSource(e, t, i));
    if ("production" !== process.env.NODE_ENV) {
      return onPush((r => {
        var a = !r.data ? r.error : void 0;
        "production" !== process.env.NODE_ENV && n({
          type: a ? "fetchError" : "fetchSuccess",
          message: `A ${a ? "failed" : "successful"} fetch response has been returned.`,
          operation: e,
          data: {
            url: t,
            fetchOptions: i,
            value: a || r
          },
          source: "fetchExchange"
        });
      }))(o);
    }
    return o;
  }))(filter((e => "teardown" !== e.kind && ("subscription" !== e.kind || !!e.context.fetchSubscriptions)))(r));
  return merge([ a, e(filter((e => "teardown" === e.kind || "subscription" === e.kind && !e.context.fetchSubscriptions))(r)) ]);
};

var fallbackExchange = ({dispatchDebug: e}) => n => {
  if ("production" !== process.env.NODE_ENV) {
    n = onPush((n => {
      if ("teardown" !== n.kind && "production" !== process.env.NODE_ENV) {
        var r = `No exchange has handled operations of kind "${n.kind}". Check whether you've added an exchange responsible for these operations.`;
        "production" !== process.env.NODE_ENV && e({
          type: "fallbackCatch",
          message: r,
          operation: n,
          source: "fallbackExchange"
        });
        console.warn(r);
      }
    }))(n);
  }
  return filter((e => !1))(n);
};

var T = function Client(e) {
  if ("production" !== process.env.NODE_ENV && !e.url) {
    throw new Error("You are creating an urql-client without a url.");
  }
  var n = 0;
  var r = new Map;
  var t = new Map;
  var i = new Set;
  var o = [];
  var s = {
    url: e.url,
    fetchSubscriptions: e.fetchSubscriptions,
    fetchOptions: e.fetchOptions,
    fetch: e.fetch,
    preferGetMethod: e.preferGetMethod,
    requestPolicy: e.requestPolicy || "cache-first"
  };
  var d = makeSubject();
  function nextOperation(e) {
    if ("mutation" === e.kind || "teardown" === e.kind || !i.has(e.key)) {
      if ("teardown" === e.kind) {
        i.delete(e.key);
      } else if ("mutation" !== e.kind) {
        i.add(e.key);
      }
      d.next(e);
    }
  }
  var u = !1;
  function dispatchOperation(e) {
    if (e) {
      nextOperation(e);
    }
    if (!u) {
      u = !0;
      while (u && (e = o.shift())) {
        nextOperation(e);
      }
      u = !1;
    }
  }
  var makeResultSource = e => {
    var n = takeUntil(filter((n => "teardown" === n.kind && n.key === e.key))(d.source))(filter((n => n.operation.kind === e.kind && n.operation.key === e.key && (!n.operation.context._instance || n.operation.context._instance === e.context._instance)))(y));
    if ("query" !== e.kind) {
      n = takeWhile((e => !!e.hasNext))(n);
    } else {
      n = switchMap((n => {
        var r = fromValue(n);
        return n.stale || n.hasNext ? r : merge([ r, map((() => {
          n.stale = !0;
          return n;
        }))(take(1)(filter((n => n.key === e.key))(d.source))) ]);
      }))(n);
    }
    if ("mutation" !== e.kind) {
      n = onEnd((() => {
        i.delete(e.key);
        r.delete(e.key);
        t.delete(e.key);
        u = !1;
        for (var n = o.length - 1; n >= 0; n--) {
          if (o[n].key === e.key) {
            o.splice(n, 1);
          }
        }
        nextOperation(makeOperation("teardown", e, e.context));
      }))(onPush((n => {
        if (n.stale) {
          if (!n.hasNext) {
            i.delete(e.key);
          } else {
            for (var a of o) {
              if (a.key === n.operation.key) {
                i.delete(a.key);
                break;
              }
            }
          }
        } else if (!n.hasNext) {
          i.delete(e.key);
        }
        r.set(e.key, n);
      }))(n));
    } else {
      n = onStart((() => {
        nextOperation(e);
      }))(n);
    }
    return share(n);
  };
  var l = this instanceof Client ? this : Object.create(Client.prototype);
  var c = Object.assign(l, {
    suspense: !!e.suspense,
    operations$: d.source,
    reexecuteOperation(e) {
      if ("teardown" === e.kind) {
        dispatchOperation(e);
      } else if ("mutation" === e.kind) {
        o.push(e);
        Promise.resolve().then(dispatchOperation);
      } else if (t.has(e.key)) {
        var n = !1;
        for (var r = 0; r < o.length; r++) {
          if (o[r].key === e.key) {
            o[r] = e;
            n = !0;
          }
        }
        if (!(n || i.has(e.key) && "network-only" !== e.context.requestPolicy)) {
          o.push(e);
          Promise.resolve().then(dispatchOperation);
        } else {
          i.delete(e.key);
          Promise.resolve().then(dispatchOperation);
        }
      }
    },
    createRequestOperation(e, r, t) {
      if (!t) {
        t = {};
      }
      var i;
      if ("production" !== process.env.NODE_ENV && "teardown" !== e && (i = (e => {
        for (var n of e.definitions) {
          if (n.kind === a.Kind.OPERATION_DEFINITION) {
            return n.operation;
          }
        }
      })(r.query)) !== e) {
        throw new Error(`Expected operation of type "${e}" but found "${i}"`);
      }
      return makeOperation(e, r, {
        _instance: "mutation" === e ? n = n + 1 | 0 : void 0,
        ...s,
        ...t,
        requestPolicy: t.requestPolicy || s.requestPolicy,
        suspense: t.suspense || !1 !== t.suspense && c.suspense
      });
    },
    executeRequestOperation(e) {
      if ("mutation" === e.kind) {
        return withPromise(makeResultSource(e));
      }
      return withPromise(function lazy(e) {
        return n => e()(n);
      }((() => {
        var n = t.get(e.key);
        if (!n) {
          t.set(e.key, n = makeResultSource(e));
        }
        n = onStart((() => {
          dispatchOperation(e);
        }))(n);
        var a = r.get(e.key);
        if ("query" === e.kind && a && (a.stale || a.hasNext)) {
          return switchMap(fromValue)(merge([ n, filter((n => n === r.get(e.key)))(fromValue(a)) ]));
        } else {
          return n;
        }
      })));
    },
    executeQuery(e, n) {
      var r = c.createRequestOperation("query", e, n);
      return c.executeRequestOperation(r);
    },
    executeSubscription(e, n) {
      var r = c.createRequestOperation("subscription", e, n);
      return c.executeRequestOperation(r);
    },
    executeMutation(e, n) {
      var r = c.createRequestOperation("mutation", e, n);
      return c.executeRequestOperation(r);
    },
    readQuery(e, n, r) {
      var a = null;
      subscribe((e => {
        a = e;
      }))(c.query(e, n, r)).unsubscribe();
      return a;
    },
    query: (e, n, r) => c.executeQuery(createRequest(e, n), r),
    subscription: (e, n, r) => c.executeSubscription(createRequest(e, n), r),
    mutation: (e, n, r) => c.executeMutation(createRequest(e, n), r)
  });
  var p = noop;
  if ("production" !== process.env.NODE_ENV) {
    var {next: f, source: m} = makeSubject();
    c.subscribeToDebugTarget = e => subscribe(e)(m);
    p = f;
  }
  var v = (e => ({client: n, forward: r, dispatchDebug: a}) => e.reduceRight(((e, r) => {
    var t = !1;
    return r({
      client: n,
      forward(n) {
        if ("production" !== process.env.NODE_ENV) {
          if (t) {
            throw new Error("forward() must only be called once in each Exchange.");
          }
          t = !0;
        }
        return share(e(share(n)));
      },
      dispatchDebug(e) {
        "production" !== process.env.NODE_ENV && a({
          timestamp: Date.now(),
          source: r.name,
          ...e
        });
      }
    });
  }), r))(e.exchanges);
  var y = share(v({
    client: c,
    dispatchDebug: p,
    forward: fallbackExchange({
      dispatchDebug: p
    })
  })(d.source));
  !function publish(e) {
    subscribe((e => {}))(e);
  }(y);
  return c;
};

var _hasField = (e, n) => !!e && !!e.fields && e.fields.some((e => e.name === n));

var _supportsDeprecatedArgumentsArg = e => {
  var n = e && e.fields && e.fields.find((e => "args" === e.name));
  return !!(n && n.args && n.args.find((e => "includeDeprecated" === e.name)));
};

var w = {
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
  var n = e.__schema.types.find((e => "__Directive" === e.name));
  var r = e.__schema.types.find((e => "__Type" === e.name));
  var a = e.__schema.types.find((e => "__InputValue" === e.name));
  var t = e.__schema.types.find((e => "__Field" === e.name));
  if (n && r && a && t) {
    return {
      directiveIsRepeatable: _hasField(n, "isRepeatable"),
      specifiedByURL: _hasField(r, "specifiedByURL"),
      inputOneOf: _hasField(r, "isOneOf"),
      inputValueDeprecation: _hasField(a, "isDeprecated"),
      directiveArgumentsIsDeprecated: _supportsDeprecatedArgumentsArg(n),
      fieldArgumentsIsDeprecated: _supportsDeprecatedArgumentsArg(t)
    };
  } else {
    return w;
  }
};

var O;

var getPeerSupportedFeatures = () => {
  if (!O) {
    var e = new r.GraphQLSchema({
      query: new r.GraphQLObjectType({
        name: "Query",
        fields: {
          _noop: {
            type: r.GraphQLID
          }
        }
      })
    });
    var n = r.executeSync({
      schema: e,
      document: makeIntrospectSupportQuery()
    });
    return O = n.data ? toSupportedFeatures(n.data) : w;
  }
  return O;
};

var I;

var b;

var makeIntrospectionQuery = e => {
  if (I && b === e) {
    return I;
  } else {
    return I = _makeIntrospectionQuery(b = e);
  }
};

var _makeIntrospectionQuery = e => ({
  kind: a.Kind.DOCUMENT,
  definitions: [ {
    kind: a.Kind.OPERATION_DEFINITION,
    name: {
      kind: a.Kind.NAME,
      value: "IntrospectionQuery"
    },
    operation: a.OperationTypeNode.QUERY,
    selectionSet: {
      kind: a.Kind.SELECTION_SET,
      selections: [ {
        kind: a.Kind.FIELD,
        name: {
          kind: a.Kind.NAME,
          value: "__schema"
        },
        selectionSet: _makeSchemaSelection(e)
      } ]
    }
  }, _makeSchemaFullTypeFragment(e), _makeSchemaInputValueFragment(e), _makeTypeRefFragment() ]
});

var makeIntrospectSupportQuery = () => ({
  kind: a.Kind.DOCUMENT,
  definitions: [ {
    kind: a.Kind.OPERATION_DEFINITION,
    name: {
      kind: a.Kind.NAME,
      value: "IntrospectSupportQuery"
    },
    operation: a.OperationTypeNode.QUERY,
    selectionSet: {
      kind: a.Kind.SELECTION_SET,
      selections: [ {
        kind: a.Kind.FIELD,
        alias: {
          kind: a.Kind.NAME,
          value: "directive"
        },
        name: {
          kind: a.Kind.NAME,
          value: "__type"
        },
        arguments: [ {
          kind: a.Kind.ARGUMENT,
          name: {
            kind: a.Kind.NAME,
            value: "name"
          },
          value: {
            kind: a.Kind.STRING,
            value: "__Directive"
          }
        } ],
        selectionSet: _makeFieldNamesSelection({
          includeArgs: !0
        })
      }, {
        kind: a.Kind.FIELD,
        alias: {
          kind: a.Kind.NAME,
          value: "field"
        },
        name: {
          kind: a.Kind.NAME,
          value: "__type"
        },
        arguments: [ {
          kind: a.Kind.ARGUMENT,
          name: {
            kind: a.Kind.NAME,
            value: "name"
          },
          value: {
            kind: a.Kind.STRING,
            value: "__Field"
          }
        } ],
        selectionSet: _makeFieldNamesSelection({
          includeArgs: !0
        })
      }, {
        kind: a.Kind.FIELD,
        alias: {
          kind: a.Kind.NAME,
          value: "type"
        },
        name: {
          kind: a.Kind.NAME,
          value: "__type"
        },
        arguments: [ {
          kind: a.Kind.ARGUMENT,
          name: {
            kind: a.Kind.NAME,
            value: "name"
          },
          value: {
            kind: a.Kind.STRING,
            value: "__Type"
          }
        } ],
        selectionSet: _makeFieldNamesSelection({
          includeArgs: !1
        })
      }, {
        kind: a.Kind.FIELD,
        alias: {
          kind: a.Kind.NAME,
          value: "inputValue"
        },
        name: {
          kind: a.Kind.NAME,
          value: "__type"
        },
        arguments: [ {
          kind: a.Kind.ARGUMENT,
          name: {
            kind: a.Kind.NAME,
            value: "name"
          },
          value: {
            kind: a.Kind.STRING,
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
  kind: a.Kind.SELECTION_SET,
  selections: [ {
    kind: a.Kind.FIELD,
    name: {
      kind: a.Kind.NAME,
      value: "fields"
    },
    selectionSet: {
      kind: a.Kind.SELECTION_SET,
      selections: [ {
        kind: a.Kind.FIELD,
        name: {
          kind: a.Kind.NAME,
          value: "name"
        }
      }, ...e.includeArgs ? [ {
        kind: a.Kind.FIELD,
        name: {
          kind: a.Kind.NAME,
          value: "args"
        },
        selectionSet: {
          kind: a.Kind.SELECTION_SET,
          selections: [ {
            kind: a.Kind.FIELD,
            name: {
              kind: a.Kind.NAME,
              value: "name"
            }
          } ]
        }
      } ] : [] ]
    }
  } ]
});

var _makeSchemaSelection = e => ({
  kind: a.Kind.SELECTION_SET,
  selections: [ {
    kind: a.Kind.FIELD,
    name: {
      kind: a.Kind.NAME,
      value: "queryType"
    },
    selectionSet: {
      kind: a.Kind.SELECTION_SET,
      selections: [ {
        kind: a.Kind.FIELD,
        name: {
          kind: a.Kind.NAME,
          value: "name"
        }
      } ]
    }
  }, {
    kind: a.Kind.FIELD,
    name: {
      kind: a.Kind.NAME,
      value: "mutationType"
    },
    selectionSet: {
      kind: a.Kind.SELECTION_SET,
      selections: [ {
        kind: a.Kind.FIELD,
        name: {
          kind: a.Kind.NAME,
          value: "name"
        }
      } ]
    }
  }, {
    kind: a.Kind.FIELD,
    name: {
      kind: a.Kind.NAME,
      value: "subscriptionType"
    },
    selectionSet: {
      kind: a.Kind.SELECTION_SET,
      selections: [ {
        kind: a.Kind.FIELD,
        name: {
          kind: a.Kind.NAME,
          value: "name"
        }
      } ]
    }
  }, {
    kind: a.Kind.FIELD,
    name: {
      kind: a.Kind.NAME,
      value: "types"
    },
    selectionSet: {
      kind: a.Kind.SELECTION_SET,
      selections: [ {
        kind: a.Kind.FRAGMENT_SPREAD,
        name: {
          kind: a.Kind.NAME,
          value: "FullType"
        }
      } ]
    }
  }, {
    kind: a.Kind.FIELD,
    name: {
      kind: a.Kind.NAME,
      value: "directives"
    },
    selectionSet: {
      kind: a.Kind.SELECTION_SET,
      selections: [ {
        kind: a.Kind.FIELD,
        name: {
          kind: a.Kind.NAME,
          value: "name"
        }
      }, {
        kind: a.Kind.FIELD,
        name: {
          kind: a.Kind.NAME,
          value: "description"
        }
      }, {
        kind: a.Kind.FIELD,
        name: {
          kind: a.Kind.NAME,
          value: "locations"
        }
      }, _makeSchemaArgsField(e.directiveArgumentsIsDeprecated), ...e.directiveIsRepeatable ? [ {
        kind: a.Kind.FIELD,
        name: {
          kind: a.Kind.NAME,
          value: "isRepeatable"
        }
      } ] : [] ]
    }
  } ]
});

var _makeSchemaFullTypeFragment = e => ({
  kind: a.Kind.FRAGMENT_DEFINITION,
  name: {
    kind: a.Kind.NAME,
    value: "FullType"
  },
  typeCondition: {
    kind: a.Kind.NAMED_TYPE,
    name: {
      kind: a.Kind.NAME,
      value: "__Type"
    }
  },
  selectionSet: {
    kind: a.Kind.SELECTION_SET,
    selections: [ {
      kind: a.Kind.FIELD,
      name: {
        kind: a.Kind.NAME,
        value: "kind"
      }
    }, {
      kind: a.Kind.FIELD,
      name: {
        kind: a.Kind.NAME,
        value: "name"
      }
    }, {
      kind: a.Kind.FIELD,
      name: {
        kind: a.Kind.NAME,
        value: "description"
      }
    }, ...e.inputOneOf ? [ {
      kind: a.Kind.FIELD,
      name: {
        kind: a.Kind.NAME,
        value: "isOneOf"
      }
    } ] : [], ...e.specifiedByURL ? [ {
      kind: a.Kind.FIELD,
      name: {
        kind: a.Kind.NAME,
        value: "specifiedByURL"
      }
    } ] : [], {
      kind: a.Kind.FIELD,
      name: {
        kind: a.Kind.NAME,
        value: "fields"
      },
      arguments: [ {
        kind: a.Kind.ARGUMENT,
        name: {
          kind: a.Kind.NAME,
          value: "includeDeprecated"
        },
        value: {
          kind: a.Kind.BOOLEAN,
          value: !0
        }
      } ],
      selectionSet: {
        kind: a.Kind.SELECTION_SET,
        selections: [ {
          kind: a.Kind.FIELD,
          name: {
            kind: a.Kind.NAME,
            value: "name"
          }
        }, {
          kind: a.Kind.FIELD,
          name: {
            kind: a.Kind.NAME,
            value: "description"
          }
        }, {
          kind: a.Kind.FIELD,
          name: {
            kind: a.Kind.NAME,
            value: "isDeprecated"
          }
        }, {
          kind: a.Kind.FIELD,
          name: {
            kind: a.Kind.NAME,
            value: "deprecationReason"
          }
        }, _makeSchemaArgsField(e.fieldArgumentsIsDeprecated), {
          kind: a.Kind.FIELD,
          name: {
            kind: a.Kind.NAME,
            value: "type"
          },
          selectionSet: {
            kind: a.Kind.SELECTION_SET,
            selections: [ {
              kind: a.Kind.FRAGMENT_SPREAD,
              name: {
                kind: a.Kind.NAME,
                value: "TypeRef"
              }
            } ]
          }
        } ]
      }
    }, {
      kind: a.Kind.FIELD,
      name: {
        kind: a.Kind.NAME,
        value: "interfaces"
      },
      selectionSet: {
        kind: a.Kind.SELECTION_SET,
        selections: [ {
          kind: a.Kind.FRAGMENT_SPREAD,
          name: {
            kind: a.Kind.NAME,
            value: "TypeRef"
          }
        } ]
      }
    }, {
      kind: a.Kind.FIELD,
      name: {
        kind: a.Kind.NAME,
        value: "possibleTypes"
      },
      selectionSet: {
        kind: a.Kind.SELECTION_SET,
        selections: [ {
          kind: a.Kind.FRAGMENT_SPREAD,
          name: {
            kind: a.Kind.NAME,
            value: "TypeRef"
          }
        } ]
      }
    }, {
      kind: a.Kind.FIELD,
      name: {
        kind: a.Kind.NAME,
        value: "inputFields"
      },
      arguments: e.inputValueDeprecation ? [ {
        kind: a.Kind.ARGUMENT,
        name: {
          kind: a.Kind.NAME,
          value: "includeDeprecated"
        },
        value: {
          kind: a.Kind.BOOLEAN,
          value: !0
        }
      } ] : [],
      selectionSet: {
        kind: a.Kind.SELECTION_SET,
        selections: [ {
          kind: a.Kind.FRAGMENT_SPREAD,
          name: {
            kind: a.Kind.NAME,
            value: "InputValue"
          }
        } ]
      }
    }, {
      kind: a.Kind.FIELD,
      name: {
        kind: a.Kind.NAME,
        value: "enumValues"
      },
      arguments: [ {
        kind: a.Kind.ARGUMENT,
        name: {
          kind: a.Kind.NAME,
          value: "includeDeprecated"
        },
        value: {
          kind: a.Kind.BOOLEAN,
          value: !0
        }
      } ],
      selectionSet: {
        kind: a.Kind.SELECTION_SET,
        selections: [ {
          kind: a.Kind.FIELD,
          name: {
            kind: a.Kind.NAME,
            value: "name"
          }
        }, {
          kind: a.Kind.FIELD,
          name: {
            kind: a.Kind.NAME,
            value: "description"
          }
        }, {
          kind: a.Kind.FIELD,
          name: {
            kind: a.Kind.NAME,
            value: "isDeprecated"
          }
        }, {
          kind: a.Kind.FIELD,
          name: {
            kind: a.Kind.NAME,
            value: "deprecationReason"
          }
        } ]
      }
    } ]
  }
});

var _makeSchemaArgsField = e => ({
  kind: a.Kind.FIELD,
  name: {
    kind: a.Kind.NAME,
    value: "args"
  },
  arguments: e ? [ {
    kind: a.Kind.ARGUMENT,
    name: {
      kind: a.Kind.NAME,
      value: "includeDeprecated"
    },
    value: {
      kind: a.Kind.BOOLEAN,
      value: !0
    }
  } ] : [],
  selectionSet: {
    kind: a.Kind.SELECTION_SET,
    selections: [ {
      kind: a.Kind.FRAGMENT_SPREAD,
      name: {
        kind: a.Kind.NAME,
        value: "InputValue"
      }
    } ]
  }
});

var _makeSchemaInputValueFragment = e => ({
  kind: a.Kind.FRAGMENT_DEFINITION,
  name: {
    kind: a.Kind.NAME,
    value: "InputValue"
  },
  typeCondition: {
    kind: a.Kind.NAMED_TYPE,
    name: {
      kind: a.Kind.NAME,
      value: "__InputValue"
    }
  },
  selectionSet: {
    kind: a.Kind.SELECTION_SET,
    selections: [ {
      kind: a.Kind.FIELD,
      name: {
        kind: a.Kind.NAME,
        value: "name"
      }
    }, {
      kind: a.Kind.FIELD,
      name: {
        kind: a.Kind.NAME,
        value: "description"
      }
    }, {
      kind: a.Kind.FIELD,
      name: {
        kind: a.Kind.NAME,
        value: "defaultValue"
      }
    }, {
      kind: a.Kind.FIELD,
      name: {
        kind: a.Kind.NAME,
        value: "type"
      },
      selectionSet: {
        kind: a.Kind.SELECTION_SET,
        selections: [ {
          kind: a.Kind.FRAGMENT_SPREAD,
          name: {
            kind: a.Kind.NAME,
            value: "TypeRef"
          }
        } ]
      }
    }, ...e.inputValueDeprecation ? [ {
      kind: a.Kind.FIELD,
      name: {
        kind: a.Kind.NAME,
        value: "isDeprecated"
      }
    }, {
      kind: a.Kind.FIELD,
      name: {
        kind: a.Kind.NAME,
        value: "deprecationReason"
      }
    } ] : [] ]
  }
});

var _makeTypeRefFragment = () => ({
  kind: a.Kind.FRAGMENT_DEFINITION,
  name: {
    kind: a.Kind.NAME,
    value: "TypeRef"
  },
  typeCondition: {
    kind: a.Kind.NAMED_TYPE,
    name: {
      kind: a.Kind.NAME,
      value: "__Type"
    }
  },
  selectionSet: _makeTypeRefSelection(0)
});

var _makeTypeRefSelection = e => ({
  kind: a.Kind.SELECTION_SET,
  selections: e < 9 ? [ {
    kind: a.Kind.FIELD,
    name: {
      kind: a.Kind.NAME,
      value: "kind"
    }
  }, {
    kind: a.Kind.FIELD,
    name: {
      kind: a.Kind.NAME,
      value: "name"
    }
  }, {
    kind: a.Kind.FIELD,
    name: {
      kind: a.Kind.NAME,
      value: "ofType"
    },
    selectionSet: _makeTypeRefSelection(e + 1)
  } ] : [ {
    kind: a.Kind.FIELD,
    name: {
      kind: a.Kind.NAME,
      value: "kind"
    }
  }, {
    kind: a.Kind.FIELD,
    name: {
      kind: a.Kind.NAME,
      value: "name"
    }
  } ]
});

function loadFromSDL(a) {
  var i = new Set;
  var o = null;
  var s = null;
  var load = async () => {
    var n = e.extname(a.file);
    var i = await t.readFile(a.file, {
      encoding: "utf8"
    });
    if (".json" === n) {
      var o = JSON.parse(i);
      if (!o || !o.__schema) {
        throw new Error("Parsing JSON introspection data failed.\nThe JSON payload did not evaluate to an introspection schema.");
      }
      return {
        introspection: {
          ...o,
          name: a.name
        },
        schema: r.buildClientSchema(o, {
          assumeValid: !!a.assumeValid
        })
      };
    } else {
      var s = r.buildSchema(i, {
        assumeValidSDL: !!a.assumeValid
      });
      var d = makeIntrospectionQuery(getPeerSupportedFeatures());
      var u = r.executeSync({
        schema: s,
        document: d
      });
      if (u.errors) {
        throw new CombinedError({
          graphQLErrors: u.errors
        });
      } else if (u.data) {
        return {
          introspection: {
            ...u.data,
            name: a.name
          },
          schema: s
        };
      } else {
        throw new Error("Executing introspection against SDL schema failed.\n`graphql` failed to return any schema data or error.");
      }
    }
  };
  return {
    get name() {
      return a.name;
    },
    load: async e => e || !s ? s = await load() : s,
    notifyOnUpdate(e) {
      if (!i.size) {
        (async () => {
          if (n.sys.watchFile) {
            var e = n.sys.watchFile(a.file, (async () => {
              try {
                if (s = await load()) {
                  for (var e of i) {
                    e(s);
                  }
                }
              } catch (e) {}
            }), 250, {
              watchFile: n.WatchFileKind.UseFsEventsOnParentDirectory,
              fallbackPolling: n.PollingWatchKind.PriorityInterval
            });
            o = () => e.close();
          } else {
            var r = new AbortController;
            o = () => r.abort();
            var d = t.watch(a.file, {
              signal: r.signal,
              persistent: !1
            });
            try {
              for await (var u of d) {
                if (s = await load()) {
                  for (var l of i) {
                    l(s);
                  }
                }
              }
            } catch (e) {
              if ("AbortError" !== e.name) {
                throw e;
              }
            } finally {
              o = null;
            }
          }
        })();
      }
      i.add(e);
      return () => {
        i.delete(e);
        if (!i.size && o) {
          o();
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
  var {retryIf: n, retryWith: r} = e;
  var a = e.initialDelayMs || 1e3;
  var t = e.maxDelayMs || 15e3;
  var i = e.maxNumberAttempts || 2;
  var o = null != e.randomDelay ? !!e.randomDelay : !0;
  return ({forward: e, dispatchDebug: s}) => d => {
    var {source: u, next: l} = makeSubject();
    var c = mergeMap((e => {
      var n = e.context.retry || {
        count: 0,
        delay: null
      };
      var r = ++n.count;
      var u = n.delay || a;
      var l = Math.random() + 1.5;
      if (o) {
        if (u * l < t) {
          u *= l;
        } else {
          u = t;
        }
      } else {
        u = Math.min(r * a, t);
      }
      n.delay = u;
      var c = filter((n => ("query" === n.kind || "teardown" === n.kind) && n.key === e.key))(d);
      "production" !== process.env.NODE_ENV && s({
        type: "retryAttempt",
        message: `The operation has failed and a retry has been triggered (${r} / ${i})`,
        operation: e,
        data: {
          retryCount: r,
          delayAmount: u
        },
        source: "retryExchange"
      });
      return takeUntil(c)(function debounce(e) {
        return n => r => {
          var a;
          var t = !1;
          var i = !1;
          n((n => {
            if (i) {} else if (0 === n) {
              i = !0;
              if (a) {
                t = !0;
              } else {
                r(0);
              }
            } else if (0 === n.tag) {
              var o = n[0];
              r(start((e => {
                if (1 === e && !i) {
                  i = !0;
                  t = !1;
                  if (a) {
                    clearTimeout(a);
                  }
                  o(1);
                } else if (!i) {
                  o(0);
                }
              })));
            } else {
              if (a) {
                clearTimeout(a);
              }
              a = setTimeout((() => {
                a = void 0;
                r(n);
                if (t) {
                  r(0);
                }
              }), e(n[0]));
            }
          }));
        };
      }((() => u))(fromValue(makeOperation(e.kind, e, {
        ...e.context,
        retry: n
      }))));
    }))(u);
    return filter((e => {
      var a = e.operation.context.retry;
      if (!e.error || !(n ? n(e.error, e.operation) : r || e.error.networkError)) {
        if (a) {
          a.count = 0;
          a.delay = null;
        }
        return !0;
      }
      if (!((a && a.count || 0) >= i - 1)) {
        var t = r ? r(e.error, e.operation) : e.operation;
        if (!t) {
          return !0;
        }
        l(t);
        return !1;
      }
      "production" !== process.env.NODE_ENV && s({
        type: "retryExhausted",
        message: "Maximum number of retries has been reached. No further retries will be performed.",
        operation: e.operation,
        source: "retryExchange"
      });
      return !0;
    }))(e(merge([ d, c ])));
  };
};

function loadFromURL(e) {
  var n = e.interval || 6e4;
  var a = new Set;
  var t = null;
  var i = null;
  var o = null;
  var s = new T({
    url: `${e.url}`,
    fetchOptions: {
      headers: e.headers
    },
    exchanges: [ retryExchange({
      initialDelayMs: 200,
      maxDelayMs: 1500,
      maxNumberAttempts: 3,
      retryWith(e, n) {
        if (e.networkError) {
          process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        }
        return n;
      }
    }), fetchExchange ]
  });
  var introspect = async i => {
    var d = makeIntrospectionQuery(i);
    var u = await s.query(d, {});
    try {
      if (u.error) {
        throw u.error;
      } else if (u.data) {
        var l = u.data;
        return {
          introspection: {
            ...l,
            name: e.name
          },
          schema: r.buildClientSchema(l, {
            assumeValid: !0
          })
        };
      } else {
        throw new Error("Executing introspection against API failed.\nThe API failed to return any schema data or error.");
      }
    } finally {
      (() => {
        if (a.size && !t) {
          t = setTimeout((async () => {
            t = null;
            try {
              o = await load();
            } catch (e) {
              o = null;
            }
            if (o) {
              for (var e of a) {
                e(o);
              }
            }
          }), n);
        }
      })();
    }
  };
  var load = async () => {
    if (!i) {
      var e = makeIntrospectSupportQuery();
      var n = await s.query(e, {});
      if (n.error && n.error.graphQLErrors.length > 0) {
        try {
          var {introspection: r} = await introspect(w);
          i = introspectionToSupportedFeatures(r);
        } catch (e) {
          i = w;
        }
      } else if (n.data && !n.error) {
        i = toSupportedFeatures(n.data);
      } else if (n.error) {
        i = null;
        throw n.error;
      } else {
        i = w;
      }
    }
    return introspect(i);
  };
  return {
    get name() {
      return e.name;
    },
    load: async e => e || !o ? o = await load() : o,
    notifyOnUpdate(e) {
      a.add(e);
      return () => {
        a.delete(e);
        if (!a.size && t) {
          clearTimeout(t);
          t = null;
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

function load(n) {
  var r = getURLConfig(n.origin);
  if (r) {
    return loadFromURL({
      ...r,
      interval: n.fetchInterval,
      name: n.name
    });
  } else if ("string" == typeof n.origin) {
    return loadFromSDL({
      file: n.rootPath ? e.resolve(n.rootPath, n.origin) : n.origin,
      assumeValid: null != n.assumeValid ? n.assumeValid : !0,
      name: n.name
    });
  } else {
    throw new Error('Configuration contains an invalid "schema" option');
  }
}

var K = process.cwd();

var maybeRelative = e => {
  var n = s.relative(K, e);
  return !n.startsWith("..") ? n : e;
};

class TSError extends Error {
  constructor(e) {
    var n = "string" != typeof e.messageText ? e.messageText.messageText : e.messageText;
    if (e.file) {
      n += ` (${maybeRelative(e.file.fileName)})`;
    }
    super(n);
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

var A = [ "name", "tadaOutputLocation", "tadaTurboLocation", "tadaPersistedLocation" ];

var parseSchemaConfig = (e, n) => {
  var resolveConfigDir = e => {
    if (!e) {
      return e;
    }
    return s.normalize(e.replace(/\${([^}]+)}/, ((e, r) => {
      if ("configDir" === r) {
        return n;
      } else {
        throw new TadaError(`Substitution "\${${r}}" is not recognized (did you mean 'configDir'?)`);
      }
    })));
  };
  if (null == e || "object" != typeof e) {
    throw new TadaError(`Schema is not configured properly (Received: ${e})`);
  }
  if ("schema" in e && e.schema && "object" == typeof e.schema) {
    var {schema: r} = e;
    if (!("url" in r)) {
      throw new TadaError("Configuration contains a `schema` object, but no `url` property");
    }
    if ("headers" in r && r.headers && "object" == typeof r.headers) {
      for (var a in r.headers) {
        if (r.headers[a] && "string" != typeof r.headers[a]) {
          throw new TadaError("Headers at `schema.headers` contain a non-string value at key: " + a);
        }
      }
    } else if ("headers" in r) {
      throw new TadaError("Configuration contains a `schema.headers` property, but it's not an object");
    }
  } else if (!("schema" in e) || "string" != typeof e.schema) {
    throw new TadaError("Configuration is missing a `schema` property");
  }
  if ("tadaOutputLocation" in e && e.tadaOutputLocation && "string" != typeof e.tadaOutputLocation) {
    throw new TadaError("Configuration contains a `tadaOutputLocation` property, but it's not a file path");
  }
  if ("tadaTurboLocation" in e && e.tadaTurboLocation && "string" != typeof e.tadaTurboLocation) {
    throw new TadaError("Configuration contains a `tadaTurboLocation` property, but it's not a file path");
  }
  if ("tadaPersistedLocation" in e && e.tadaPersistedLocation && "string" != typeof e.tadaPersistedLocation) {
    throw new TadaError("Configuration contains a `tadaPersistedLocation` property, but it's not a file path");
  }
  var t = e;
  var i = t.schema;
  if ("string" == typeof i) {
    if (!getURLConfig(i)) {
      i = resolveConfigDir(i) || i;
    }
  }
  return {
    ...t,
    schema: i,
    tadaOutputLocation: resolveConfigDir(t.tadaOutputLocation),
    tadaTurboLocation: resolveConfigDir(t.tadaTurboLocation),
    tadaPersistedLocation: resolveConfigDir(t.tadaPersistedLocation)
  };
};

var isFile = e => e.isFile();

var isDir = e => e.isDirectory();

var stat = (e, n = isFile) => d.stat(e).then(n).catch((() => !1));

var S = "undefined" != typeof require ? require.resolve.bind(require) : i.createRequire("undefined" == typeof document ? require("url").pathToFileURL(__filename).href : o && o.src || new URL("dist/gql-tada-internal.js", document.baseURI).href).resolve;

var resolveExtend = async (e, n) => {
  try {
    return toTSConfigPath(S(e, {
      paths: [ n ]
    }));
  } catch (e) {
    return null;
  }
};

var toTSConfigPath = e => ".json" !== s.extname(e) ? s.resolve(K, e, "tsconfig.json") : s.resolve(K, e);

var readTSConfigFile = async e => {
  var r = toTSConfigPath(e);
  var a = await d.readFile(r, "utf8");
  var t = n.parseConfigFileTextToJson(r, a);
  if (t.error) {
    throw new TSError(t.error);
  }
  return t.config || {};
};

var findTSConfigFile = async e => {
  var n = toTSConfigPath(e || K);
  var r = toTSConfigPath(s.resolve(n, "/"));
  while (n !== r) {
    if (await stat(n)) {
      return n;
    }
    var a = s.resolve(n, "..", ".git");
    if (await stat(a, isDir)) {
      return null;
    }
    var t = toTSConfigPath(s.resolve(n, "..", ".."));
    if (t === n) {
      break;
    }
    n = t;
  }
  return null;
};

var loadConfig = async e => {
  var n = await findTSConfigFile(e);
  if (!n) {
    throw new TadaError(e ? `No tsconfig.json found at or above: ${maybeRelative(e)}` : "No tsconfig.json found at or above current working directory");
  }
  var load = async e => {
    var r = await readTSConfigFile(e);
    var a = (e => e && e.compilerOptions && e.compilerOptions.plugins && e.compilerOptions.plugins.find((e => "@0no-co/graphqlsp" === e.name || "gql.tada/lsp" === e.name || "gql.tada/ts-plugin" === e.name)) || null)(r);
    if (a) {
      return {
        pluginConfig: a,
        configPath: e,
        rootPath: s.dirname(n)
      };
    }
    if (Array.isArray(r.extends)) {
      for (var t of r.extends) {
        if (".json" !== s.extname(t)) {
          t += ".json";
        }
        try {
          var i = await resolveExtend(t, s.dirname(n));
          if (i) {
            return await load(i);
          }
        } catch (e) {}
      }
    } else if (r.extends) {
      try {
        var o = await resolveExtend(r.extends, s.dirname(n));
        if (o) {
          return await load(o);
        }
      } catch (e) {}
    }
    throw new TadaError(`Could not find a valid GraphQLSP plugin entry in: ${maybeRelative(n)}`);
  };
  return await load(n);
};

function nameCompare(e, n) {
  return e.name < n.name ? -1 : e.name > n.name ? 1 : 0;
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
  var n = "";
  for (var r of e) {
    if (n) {
      n += " | ";
    }
    n += printName(r.name);
  }
  return n;
};

var printFields = e => {
  var n = "";
  for (var r of e) {
    var a = printName(r.name);
    var t = printTypeRef(r.type);
    n += `${printName(r.name)}: { name: ${a}; type: ${t} }; `;
  }
  return `{ ${n}}`;
};

var printIntrospectionType = e => {
  if ("ENUM" === e.kind) {
    var n = printNamedTypes(e.enumValues);
    return `{ name: ${printName(e.name)}; enumValues: ${n}; }`;
  } else if ("INPUT_OBJECT" === e.kind) {
    var r = (e => {
      var n = "";
      for (var r of e) {
        if (n) {
          n += ", ";
        }
        n += `{ name: ${printName(r.name)}; type: ${printTypeRef(r.type)}; defaultValue: ${r.defaultValue ? JSON.stringify(r.defaultValue) : "null"} }`;
      }
      return `[${n}]`;
    })(e.inputFields);
    return `{ kind: 'INPUT_OBJECT'; name: ${printName(e.name)}; isOneOf: ${e.isOneOf || !1}; inputFields: ${r}; }`;
  } else if ("OBJECT" === e.kind) {
    var a = printFields(e.fields);
    return `{ kind: 'OBJECT'; name: ${printName(e.name)}; fields: ${a}; }`;
  } else if ("INTERFACE" === e.kind) {
    return `{ kind: 'INTERFACE'; name: ${printName(e.name)}; fields: ${printFields(e.fields)}; possibleTypes: ${printNamedTypes(e.possibleTypes)}; }`;
  } else if ("UNION" === e.kind) {
    return `{ kind: 'UNION'; name: ${printName(e.name)}; fields: {}; possibleTypes: ${printNamedTypes(e.possibleTypes)}; }`;
  } else {
    return "unknown";
  }
};

function preprocessIntrospectionTypes(e) {
  var n = "";
  for (var r of e.__schema.types) {
    var a = printIntrospectionType(r);
    if (n) {
      n += "\n";
    }
    n += `    ${printName(r.name)}: ${a};`;
  }
  return `{\n${n}\n}`;
}

function preprocessIntrospection(e, n = preprocessIntrospectionTypes(e)) {
  var {__schema: r} = e;
  var a = "name" in e ? e.name : void 0;
  var t = printName(r.queryType.name);
  var i = printName(r.mutationType && r.mutationType.name);
  var o = printName(r.subscriptionType && r.subscriptionType.name);
  return `{\n  name: ${printName(a)};\n  query: ${t};\n  mutation: ${i};\n  subscription: ${o};\n  types: ${n};\n}`;
}

var x = [ "/* eslint-disable */", "/* prettier-ignore */" ].join("\n") + "\n";

var L = [ "/** An IntrospectionQuery representation of your schema.", " *", " * @remarks", " * This is an introspection of your schema saved as a file by GraphQLSP.", " * It will automatically be used by `gql.tada` to infer the types of your GraphQL documents.", " * If you need to reuse this data or update your `scalars`, update `tadaOutputLocation` to", " * instead save to a .ts instead of a .d.ts file.", " */" ].join("\n");

var _ = [ "/** An IntrospectionQuery representation of your schema.", " *", " * @remarks", " * This is an introspection of your schema saved as a file by GraphQLSP.", " * You may import it to create a `graphql()` tag function with `gql.tada`", " * by importing it and passing it to `initGraphQLTada<>()`.", " *", " * @example", " * ```", " * import { initGraphQLTada } from 'gql.tada';", " * import type { introspection } from './introspection';", " *", " * export const graphql = initGraphQLTada<{", " *   introspection: typeof introspection;", " *   scalars: {", " *     DateTime: string;", " *     Json: any;", " *   };", " * }>();", " * ```", " */" ].join("\n");

var D = "introspection_types";

var stringifyJson = e => "string" == typeof e ? e : JSON.stringify(e, null, 2);

exports.TSError = TSError;

exports.TadaError = TadaError;

exports.findTSConfigFile = findTSConfigFile;

exports.getSchemaConfigForName = (e, n) => {
  if (n && "name" in e && e.name === n) {
    return e;
  } else if (!n && !("schemas" in e)) {
    return e;
  } else if (n && "schemas" in e) {
    for (var r = 0; r < e.schemas.length; r++) {
      if (e.schemas[r].name === n) {
        return e.schemas[r];
      }
    }
    return null;
  } else {
    return null;
  }
};

exports.getSchemaNamesFromConfig = e => new Set([ ..."schema" in e ? [ null ] : [], ..."schemas" in e ? e.schemas.map((e => e.name)) : [] ]);

exports.getURLConfig = getURLConfig;

exports.load = load;

exports.loadConfig = loadConfig;

exports.loadFromSDL = loadFromSDL;

exports.loadFromURL = loadFromURL;

exports.loadRef = function loadRef(e) {
  var n = [];
  var r;
  var getLoaders = n => {
    if (!r) {
      r = ("schemas" in e && e.schemas || []).map((e => ({
        input: e,
        loader: load({
          ...n,
          origin: e.schema,
          name: e.name
        })
      })));
      if ("schema" in e && e.schema) {
        r.push({
          input: {
            ...e,
            name: void 0
          },
          loader: load({
            ...n,
            origin: e.schema
          })
        });
      }
    }
    return r;
  };
  var a = {
    version: 0,
    current: null,
    multi: ("schemas" in e && e.schemas || []).reduce(((e, {name: n}) => {
      if (n) {
        e[n] = null;
      }
      return e;
    }), {}),
    autoupdate(e, r) {
      var t = getLoaders(e);
      n.push(...t.map((({input: e, loader: n}) => {
        n.load().then((n => {
          a.version++;
          if (e.name) {
            a.multi[e.name] = {
              ...e,
              ...n
            };
          } else {
            a.current = {
              ...e,
              ...n
            };
          }
        })).catch((e => {}));
        return n.notifyOnUpdate((n => {
          a.version++;
          if (e.name) {
            a.multi[e.name] = {
              ...e,
              ...n
            };
          } else {
            a.current = {
              ...e,
              ...n
            };
          }
          r(a, e);
        }));
      })));
      return () => {
        var e;
        while (null != (e = n.pop())) {
          e();
        }
      };
    },
    async load(e) {
      var n = getLoaders(e);
      await Promise.all(n.map((async ({input: e, loader: n}) => {
        var r = await n.load();
        a.version++;
        if (e.name) {
          a.multi[e.name] = {
            ...e,
            ...r
          };
        } else {
          a.current = {
            ...e,
            ...r
          };
        }
      })));
      return a;
    }
  };
  return a;
};

exports.minifyIntrospection = e => {
  if (!e || !("__schema" in e)) {
    throw new TypeError("Expected to receive an IntrospectionQuery.");
  }
  var {__schema: {queryType: n, mutationType: r, subscriptionType: a, types: t}} = e;
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
        kind: n.kind,
        name: n.name
      },
      mutationType: r ? {
        kind: r.kind,
        name: r.name
      } : null,
      subscriptionType: a ? {
        kind: a.kind,
        name: a.name
      } : null,
      types: i,
      directives: []
    }
  };
};

exports.outputIntrospectionFile = function outputIntrospectionFile(e, n) {
  if (/\.d\.ts$/.test(n.fileType)) {
    var r = [ x ];
    if ("string" != typeof e && n.shouldPreprocess) {
      r.push(`export type ${D} = ${preprocessIntrospectionTypes(e)};\n`, L, `export type introspection = ${preprocessIntrospection(e, D)};\n`, "import * as gqlTada from 'gql.tada';\n");
    } else {
      r.push(L, `export type introspection = ${stringifyJson(e)};\n`, "import * as gqlTada from 'gql.tada';\n");
    }
    if (!("name" in e) || !e.name) {
      r.push("declare module 'gql.tada' {", "  interface setupSchema {", "    introspection: introspection", "  }", "}");
    }
    return r.join("\n");
  } else if (/\.ts$/.test(n.fileType)) {
    var a = stringifyJson(e);
    return [ x, _, `const introspection = ${a} as const;\n`, "export { introspection };" ].join("\n");
  }
  throw new TadaError(`No available introspection format for "${n.fileType}" (expected ".ts" or ".d.ts")`);
};

exports.parseConfig = (e, n = process.cwd()) => {
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
    var r = e.schemas.map((e => {
      if (!("name" in e) || !e.name || "string" != typeof e.name) {
        throw new TadaError("All `schemas` configurations must contain a `name` label.");
      }
      if (!("tadaOutputLocation" in e) || !e.tadaOutputLocation || "string" != typeof e.tadaOutputLocation) {
        throw new TadaError("All `schemas` configurations must contain a `tadaOutputLocation` path.");
      }
      return {
        ...parseSchemaConfig(e, n),
        name: e.name
      };
    }));
    var _loop = function(e) {
      var n = r.map((n => n[e])).filter(Boolean);
      var a = new Set(n);
      if (n.length !== a.size) {
        throw new TadaError(`All '${e}' values in \`schemas[]\` must be unique.`);
      }
    };
    for (var a of A) {
      _loop(a);
    }
    return {
      ...e,
      schemas: r
    };
  } else {
    return {
      ...e,
      ...parseSchemaConfig(e, n)
    };
  }
};

exports.preprocessIntrospection = preprocessIntrospection;

exports.readTSConfigFile = readTSConfigFile;

exports.resolveTypeScriptRootDir = async e => {
  try {
    var n = await loadConfig(e);
    return s.dirname(n.configPath);
  } catch (e) {
    return;
  }
};
//# sourceMappingURL=gql-tada-internal.js.map
