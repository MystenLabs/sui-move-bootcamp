import { isMainThread as e, parentPort as r, Worker as n, SHARE_ENV as a } from "node:worker_threads";

var t = r;

if (!e && !t) {
  throw new ReferenceError("Failed to receive parent message port");
}

var s = function(e) {
  e.Start = "START";
  e.Close = "CLOSE";
  e.Pull = "PULL";
  return e;
}(s || {});

var i = function(e) {
  e.Next = "NEXT";
  e.Throw = "THROW";
  e.Return = "RETURN";
  return e;
}(i || {});

var o = {
  env: a,
  stderr: !1,
  stdout: !1,
  stdin: !1
};

var getMessageData = e => {
  var r = e.data;
  if (e.kind === i.Throw) {
    return "object" == typeof r && r && null != e.extra ? Object.assign(r, e.extra) : r;
  } else {
    return r;
  }
};

var asyncIteratorSymbol = () => "function" == typeof Symbol && Symbol.asyncIterator || "@@asyncIterator";

function expose(r) {
  if (e) {
    var a = function captureStack() {
      var e = new Error;
      var r = Error.prepareStackTrace;
      try {
        var n;
        Error.prepareStackTrace = (e, r) => n = r;
        Error.captureStackTrace(e);
        if (!e.stack) {
          throw e;
        }
        return n && n.slice(2) || [];
      } finally {
        Error.prepareStackTrace = r;
      }
    }()[0];
    var u = a && a.getFileName();
    if (!u) {
      throw new ReferenceError("Captured stack trace is empty");
    }
    return function main(e) {
      var r;
      var a = 0;
      return (...t) => {
        if (!r) {
          (r = new n(e, o)).unref();
        }
        var u = 0 | ++a;
        var d = [];
        var c = !1;
        var l = !1;
        var v = !1;
        var f;
        var p;
        function cleanup() {
          l = !0;
          f = void 0;
          p = void 0;
          r.removeListener("message", receiveMessage);
          r.removeListener("error", receiveError);
        }
        function sendMessage(e) {
          r.postMessage({
            id: u,
            kind: e
          });
        }
        function receiveError(e) {
          cleanup();
          d.length = 1;
          d[0] = {
            id: u,
            kind: i.Throw,
            data: e
          };
        }
        function receiveMessage(e) {
          var r = e && "object" == typeof e && "kind" in e ? e : null;
          if (!r) {
            return;
          } else if (p && r.kind === i.Throw) {
            p(getMessageData(r));
            cleanup();
          } else if (f && r.kind === i.Return) {
            f({
              done: !0,
              value: getMessageData(r)
            });
            cleanup();
          } else if (f && r.kind === i.Next) {
            v = !1;
            f({
              done: !1,
              value: getMessageData(r)
            });
          } else if (r.kind === i.Throw || r.kind === i.Return) {
            d.push(r);
            cleanup();
          } else if (r.kind === i.Next) {
            d.push(r);
            v = !1;
          }
        }
        return {
          async next() {
            if (!c) {
              c = !0;
              r.addListener("message", receiveMessage);
              r.addListener("error", receiveError);
              r.postMessage({
                id: u,
                kind: s.Start,
                data: t
              });
            }
            if (l && !d.length) {
              return {
                done: !0
              };
            } else if (!l && !v && d.length <= 1) {
              v = !0;
              sendMessage(s.Pull);
            }
            var e = d.shift();
            if (e && e.kind === i.Throw) {
              cleanup();
              throw getMessageData(e);
            } else if (e && e.kind === i.Return) {
              cleanup();
              return {
                value: getMessageData(e),
                done: !0
              };
            } else if (e && e.kind === i.Next) {
              return {
                value: getMessageData(e),
                done: !1
              };
            } else {
              return new Promise(((e, r) => {
                f = r => {
                  f = void 0;
                  p = void 0;
                  e(r);
                };
                p = e => {
                  f = void 0;
                  p = void 0;
                  r(e);
                };
              }));
            }
          },
          async return() {
            if (!l) {
              cleanup();
              sendMessage(s.Close);
            }
            return {
              done: !0
            };
          },
          [asyncIteratorSymbol()]() {
            return this;
          }
        };
      };
    }(u.startsWith("file://") ? new URL(u) : u);
  } else {
    t.addListener("message", (e => {
      var n = e && "object" == typeof e && "kind" in e ? e : null;
      if (n) {
        !function thread(e, r) {
          if (e.kind !== s.Start) {
            return;
          }
          var n = e.id;
          var a = r(...e.data);
          var o = !1;
          var u = !1;
          var d = !1;
          function cleanup() {
            o = !0;
            t.removeListener("message", receiveMessage);
          }
          async function sendMessage(e, r) {
            try {
              var s = {
                id: n,
                kind: e,
                data: r
              };
              if (e === i.Throw && "object" == typeof r && null != r) {
                s.extra = {
                  ...r
                };
              }
              t.postMessage(s);
            } catch (e) {
              cleanup();
              if (a.throw) {
                var o = await a.throw();
                if (!1 === o.done && a.return) {
                  o = await a.return();
                  sendMessage(i.Return, o.value);
                } else {
                  sendMessage(i.Return, o.value);
                }
              } else {
                sendMessage(i.Return);
              }
            }
          }
          async function receiveMessage(e) {
            var r = e && "object" == typeof e && "kind" in e ? e : null;
            var n;
            if (!r) {
              return;
            } else if (r.kind === s.Close) {
              cleanup();
              if (a.return) {
                a.return();
              }
            } else if (r.kind === s.Pull && d) {
              u = !0;
            } else if (r.kind === s.Pull) {
              for (u = d = !0; u && !o; ) {
                try {
                  if ((n = await a.next()).done) {
                    cleanup();
                    if (a.return) {
                      n = await a.return();
                    }
                    sendMessage(i.Return, n.value);
                  } else {
                    u = !1;
                    sendMessage(i.Next, n.value);
                  }
                } catch (e) {
                  cleanup();
                  sendMessage(i.Throw, e);
                }
              }
              d = !1;
            }
          }
          t.addListener("message", receiveMessage);
        }(n, r);
      }
    }));
    return r;
  }
}

export { expose as e };
//# sourceMappingURL=index-chunk2.mjs.map
