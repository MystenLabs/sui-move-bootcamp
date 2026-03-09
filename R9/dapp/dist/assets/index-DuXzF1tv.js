function F1(e, t) {
  for (var n = 0; n < t.length; n++) {
    const i = t[n];
    if (typeof i != "string" && !Array.isArray(i)) {
      for (const o in i)
        if (o !== "default" && !(o in e)) {
          const l = Object.getOwnPropertyDescriptor(i, o);
          l &&
            Object.defineProperty(
              e,
              o,
              l.get ? l : { enumerable: !0, get: () => i[o] },
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
  );
}
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) i(o);
  new MutationObserver((o) => {
    for (const l of o)
      if (l.type === "childList")
        for (const u of l.addedNodes)
          u.tagName === "LINK" && u.rel === "modulepreload" && i(u);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(o) {
    const l = {};
    return (
      o.integrity && (l.integrity = o.integrity),
      o.referrerPolicy && (l.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === "use-credentials"
        ? (l.credentials = "include")
        : o.crossOrigin === "anonymous"
          ? (l.credentials = "omit")
          : (l.credentials = "same-origin"),
      l
    );
  }
  function i(o) {
    if (o.ep) return;
    o.ep = !0;
    const l = n(o);
    fetch(o.href, l);
  }
})();
function Ko(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var Ad = { exports: {} },
  vo = {},
  jd = { exports: {} },
  xe = {};
var Hg;
function U1() {
  if (Hg) return xe;
  Hg = 1;
  var e = Symbol.for("react.element"),
    t = Symbol.for("react.portal"),
    n = Symbol.for("react.fragment"),
    i = Symbol.for("react.strict_mode"),
    o = Symbol.for("react.profiler"),
    l = Symbol.for("react.provider"),
    u = Symbol.for("react.context"),
    d = Symbol.for("react.forward_ref"),
    f = Symbol.for("react.suspense"),
    m = Symbol.for("react.memo"),
    g = Symbol.for("react.lazy"),
    y = Symbol.iterator;
  function v(N) {
    return N === null || typeof N != "object"
      ? null
      : ((N = (y && N[y]) || N["@@iterator"]),
        typeof N == "function" ? N : null);
  }
  var C = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    E = Object.assign,
    S = {};
  function k(N, K, he) {
    ((this.props = N),
      (this.context = K),
      (this.refs = S),
      (this.updater = he || C));
  }
  ((k.prototype.isReactComponent = {}),
    (k.prototype.setState = function (N, K) {
      if (typeof N != "object" && typeof N != "function" && N != null)
        throw Error(
          "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, N, K, "setState");
    }),
    (k.prototype.forceUpdate = function (N) {
      this.updater.enqueueForceUpdate(this, N, "forceUpdate");
    }));
  function x() {}
  x.prototype = k.prototype;
  function M(N, K, he) {
    ((this.props = N),
      (this.context = K),
      (this.refs = S),
      (this.updater = he || C));
  }
  var A = (M.prototype = new x());
  ((A.constructor = M), E(A, k.prototype), (A.isPureReactComponent = !0));
  var R = Array.isArray,
    P = Object.prototype.hasOwnProperty,
    V = { current: null },
    U = { key: !0, ref: !0, __self: !0, __source: !0 };
  function z(N, K, he) {
    var be,
      Ce = {},
      Se = null,
      ve = null;
    if (K != null)
      for (be in (K.ref !== void 0 && (ve = K.ref),
      K.key !== void 0 && (Se = "" + K.key),
      K))
        P.call(K, be) && !U.hasOwnProperty(be) && (Ce[be] = K[be]);
    var Oe = arguments.length - 2;
    if (Oe === 1) Ce.children = he;
    else if (1 < Oe) {
      for (var Re = Array(Oe), Ct = 0; Ct < Oe; Ct++)
        Re[Ct] = arguments[Ct + 2];
      Ce.children = Re;
    }
    if (N && N.defaultProps)
      for (be in ((Oe = N.defaultProps), Oe))
        Ce[be] === void 0 && (Ce[be] = Oe[be]);
    return {
      $$typeof: e,
      type: N,
      key: Se,
      ref: ve,
      props: Ce,
      _owner: V.current,
    };
  }
  function B(N, K) {
    return {
      $$typeof: e,
      type: N.type,
      key: K,
      ref: N.ref,
      props: N.props,
      _owner: N._owner,
    };
  }
  function H(N) {
    return typeof N == "object" && N !== null && N.$$typeof === e;
  }
  function ee(N) {
    var K = { "=": "=0", ":": "=2" };
    return (
      "$" +
      N.replace(/[=:]/g, function (he) {
        return K[he];
      })
    );
  }
  var Q = /\/+/g;
  function J(N, K) {
    return typeof N == "object" && N !== null && N.key != null
      ? ee("" + N.key)
      : K.toString(36);
  }
  function ae(N, K, he, be, Ce) {
    var Se = typeof N;
    (Se === "undefined" || Se === "boolean") && (N = null);
    var ve = !1;
    if (N === null) ve = !0;
    else
      switch (Se) {
        case "string":
        case "number":
          ve = !0;
          break;
        case "object":
          switch (N.$$typeof) {
            case e:
            case t:
              ve = !0;
          }
      }
    if (ve)
      return (
        (ve = N),
        (Ce = Ce(ve)),
        (N = be === "" ? "." + J(ve, 0) : be),
        R(Ce)
          ? ((he = ""),
            N != null && (he = N.replace(Q, "$&/") + "/"),
            ae(Ce, K, he, "", function (Ct) {
              return Ct;
            }))
          : Ce != null &&
            (H(Ce) &&
              (Ce = B(
                Ce,
                he +
                  (!Ce.key || (ve && ve.key === Ce.key)
                    ? ""
                    : ("" + Ce.key).replace(Q, "$&/") + "/") +
                  N,
              )),
            K.push(Ce)),
        1
      );
    if (((ve = 0), (be = be === "" ? "." : be + ":"), R(N)))
      for (var Oe = 0; Oe < N.length; Oe++) {
        Se = N[Oe];
        var Re = be + J(Se, Oe);
        ve += ae(Se, K, he, Re, Ce);
      }
    else if (((Re = v(N)), typeof Re == "function"))
      for (N = Re.call(N), Oe = 0; !(Se = N.next()).done; )
        ((Se = Se.value),
          (Re = be + J(Se, Oe++)),
          (ve += ae(Se, K, he, Re, Ce)));
    else if (Se === "object")
      throw (
        (K = String(N)),
        Error(
          "Objects are not valid as a React child (found: " +
            (K === "[object Object]"
              ? "object with keys {" + Object.keys(N).join(", ") + "}"
              : K) +
            "). If you meant to render a collection of children, use an array instead.",
        )
      );
    return ve;
  }
  function ye(N, K, he) {
    if (N == null) return N;
    var be = [],
      Ce = 0;
    return (
      ae(N, be, "", "", function (Se) {
        return K.call(he, Se, Ce++);
      }),
      be
    );
  }
  function ue(N) {
    if (N._status === -1) {
      var K = N._result;
      ((K = K()),
        K.then(
          function (he) {
            (N._status === 0 || N._status === -1) &&
              ((N._status = 1), (N._result = he));
          },
          function (he) {
            (N._status === 0 || N._status === -1) &&
              ((N._status = 2), (N._result = he));
          },
        ),
        N._status === -1 && ((N._status = 0), (N._result = K)));
    }
    if (N._status === 1) return N._result.default;
    throw N._result;
  }
  var ce = { current: null },
    F = { transition: null },
    W = {
      ReactCurrentDispatcher: ce,
      ReactCurrentBatchConfig: F,
      ReactCurrentOwner: V,
    };
  function Z() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return (
    (xe.Children = {
      map: ye,
      forEach: function (N, K, he) {
        ye(
          N,
          function () {
            K.apply(this, arguments);
          },
          he,
        );
      },
      count: function (N) {
        var K = 0;
        return (
          ye(N, function () {
            K++;
          }),
          K
        );
      },
      toArray: function (N) {
        return (
          ye(N, function (K) {
            return K;
          }) || []
        );
      },
      only: function (N) {
        if (!H(N))
          throw Error(
            "React.Children.only expected to receive a single React element child.",
          );
        return N;
      },
    }),
    (xe.Component = k),
    (xe.Fragment = n),
    (xe.Profiler = o),
    (xe.PureComponent = M),
    (xe.StrictMode = i),
    (xe.Suspense = f),
    (xe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W),
    (xe.act = Z),
    (xe.cloneElement = function (N, K, he) {
      if (N == null)
        throw Error(
          "React.cloneElement(...): The argument must be a React element, but you passed " +
            N +
            ".",
        );
      var be = E({}, N.props),
        Ce = N.key,
        Se = N.ref,
        ve = N._owner;
      if (K != null) {
        if (
          (K.ref !== void 0 && ((Se = K.ref), (ve = V.current)),
          K.key !== void 0 && (Ce = "" + K.key),
          N.type && N.type.defaultProps)
        )
          var Oe = N.type.defaultProps;
        for (Re in K)
          P.call(K, Re) &&
            !U.hasOwnProperty(Re) &&
            (be[Re] = K[Re] === void 0 && Oe !== void 0 ? Oe[Re] : K[Re]);
      }
      var Re = arguments.length - 2;
      if (Re === 1) be.children = he;
      else if (1 < Re) {
        Oe = Array(Re);
        for (var Ct = 0; Ct < Re; Ct++) Oe[Ct] = arguments[Ct + 2];
        be.children = Oe;
      }
      return {
        $$typeof: e,
        type: N.type,
        key: Ce,
        ref: Se,
        props: be,
        _owner: ve,
      };
    }),
    (xe.createContext = function (N) {
      return (
        (N = {
          $$typeof: u,
          _currentValue: N,
          _currentValue2: N,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
          _defaultValue: null,
          _globalName: null,
        }),
        (N.Provider = { $$typeof: l, _context: N }),
        (N.Consumer = N)
      );
    }),
    (xe.createElement = z),
    (xe.createFactory = function (N) {
      var K = z.bind(null, N);
      return ((K.type = N), K);
    }),
    (xe.createRef = function () {
      return { current: null };
    }),
    (xe.forwardRef = function (N) {
      return { $$typeof: d, render: N };
    }),
    (xe.isValidElement = H),
    (xe.lazy = function (N) {
      return { $$typeof: g, _payload: { _status: -1, _result: N }, _init: ue };
    }),
    (xe.memo = function (N, K) {
      return { $$typeof: m, type: N, compare: K === void 0 ? null : K };
    }),
    (xe.startTransition = function (N) {
      var K = F.transition;
      F.transition = {};
      try {
        N();
      } finally {
        F.transition = K;
      }
    }),
    (xe.unstable_act = Z),
    (xe.useCallback = function (N, K) {
      return ce.current.useCallback(N, K);
    }),
    (xe.useContext = function (N) {
      return ce.current.useContext(N);
    }),
    (xe.useDebugValue = function () {}),
    (xe.useDeferredValue = function (N) {
      return ce.current.useDeferredValue(N);
    }),
    (xe.useEffect = function (N, K) {
      return ce.current.useEffect(N, K);
    }),
    (xe.useId = function () {
      return ce.current.useId();
    }),
    (xe.useImperativeHandle = function (N, K, he) {
      return ce.current.useImperativeHandle(N, K, he);
    }),
    (xe.useInsertionEffect = function (N, K) {
      return ce.current.useInsertionEffect(N, K);
    }),
    (xe.useLayoutEffect = function (N, K) {
      return ce.current.useLayoutEffect(N, K);
    }),
    (xe.useMemo = function (N, K) {
      return ce.current.useMemo(N, K);
    }),
    (xe.useReducer = function (N, K, he) {
      return ce.current.useReducer(N, K, he);
    }),
    (xe.useRef = function (N) {
      return ce.current.useRef(N);
    }),
    (xe.useState = function (N) {
      return ce.current.useState(N);
    }),
    (xe.useSyncExternalStore = function (N, K, he) {
      return ce.current.useSyncExternalStore(N, K, he);
    }),
    (xe.useTransition = function () {
      return ce.current.useTransition();
    }),
    (xe.version = "18.3.1"),
    xe
  );
}
var Kg;
function Hf() {
  return (Kg || ((Kg = 1), (jd.exports = U1())), jd.exports);
}
var Gg;
function V1() {
  if (Gg) return vo;
  Gg = 1;
  var e = Hf(),
    t = Symbol.for("react.element"),
    n = Symbol.for("react.fragment"),
    i = Object.prototype.hasOwnProperty,
    o = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    l = { key: !0, ref: !0, __self: !0, __source: !0 };
  function u(d, f, m) {
    var g,
      y = {},
      v = null,
      C = null;
    (m !== void 0 && (v = "" + m),
      f.key !== void 0 && (v = "" + f.key),
      f.ref !== void 0 && (C = f.ref));
    for (g in f) i.call(f, g) && !l.hasOwnProperty(g) && (y[g] = f[g]);
    if (d && d.defaultProps)
      for (g in ((f = d.defaultProps), f)) y[g] === void 0 && (y[g] = f[g]);
    return {
      $$typeof: t,
      type: d,
      key: v,
      ref: C,
      props: y,
      _owner: o.current,
    };
  }
  return ((vo.Fragment = n), (vo.jsx = u), (vo.jsxs = u), vo);
}
var qg;
function W1() {
  return (qg || ((qg = 1), (Ad.exports = V1())), Ad.exports);
}
var O = W1(),
  w = Hf();
const Gt = Ko(w),
  Kf = F1({ __proto__: null, default: Gt }, [w]);
var hl = {},
  Rd = { exports: {} },
  Dt = {},
  _d = { exports: {} },
  Nd = {};
var Qg;
function H1() {
  return (
    Qg ||
      ((Qg = 1),
      (function (e) {
        function t(F, W) {
          var Z = F.length;
          F.push(W);
          e: for (; 0 < Z; ) {
            var N = (Z - 1) >>> 1,
              K = F[N];
            if (0 < o(K, W)) ((F[N] = W), (F[Z] = K), (Z = N));
            else break e;
          }
        }
        function n(F) {
          return F.length === 0 ? null : F[0];
        }
        function i(F) {
          if (F.length === 0) return null;
          var W = F[0],
            Z = F.pop();
          if (Z !== W) {
            F[0] = Z;
            e: for (var N = 0, K = F.length, he = K >>> 1; N < he; ) {
              var be = 2 * (N + 1) - 1,
                Ce = F[be],
                Se = be + 1,
                ve = F[Se];
              if (0 > o(Ce, Z))
                Se < K && 0 > o(ve, Ce)
                  ? ((F[N] = ve), (F[Se] = Z), (N = Se))
                  : ((F[N] = Ce), (F[be] = Z), (N = be));
              else if (Se < K && 0 > o(ve, Z))
                ((F[N] = ve), (F[Se] = Z), (N = Se));
              else break e;
            }
          }
          return W;
        }
        function o(F, W) {
          var Z = F.sortIndex - W.sortIndex;
          return Z !== 0 ? Z : F.id - W.id;
        }
        if (
          typeof performance == "object" &&
          typeof performance.now == "function"
        ) {
          var l = performance;
          e.unstable_now = function () {
            return l.now();
          };
        } else {
          var u = Date,
            d = u.now();
          e.unstable_now = function () {
            return u.now() - d;
          };
        }
        var f = [],
          m = [],
          g = 1,
          y = null,
          v = 3,
          C = !1,
          E = !1,
          S = !1,
          k = typeof setTimeout == "function" ? setTimeout : null,
          x = typeof clearTimeout == "function" ? clearTimeout : null,
          M = typeof setImmediate < "u" ? setImmediate : null;
        typeof navigator < "u" &&
          navigator.scheduling !== void 0 &&
          navigator.scheduling.isInputPending !== void 0 &&
          navigator.scheduling.isInputPending.bind(navigator.scheduling);
        function A(F) {
          for (var W = n(m); W !== null; ) {
            if (W.callback === null) i(m);
            else if (W.startTime <= F)
              (i(m), (W.sortIndex = W.expirationTime), t(f, W));
            else break;
            W = n(m);
          }
        }
        function R(F) {
          if (((S = !1), A(F), !E))
            if (n(f) !== null) ((E = !0), ue(P));
            else {
              var W = n(m);
              W !== null && ce(R, W.startTime - F);
            }
        }
        function P(F, W) {
          ((E = !1), S && ((S = !1), x(z), (z = -1)), (C = !0));
          var Z = v;
          try {
            for (
              A(W), y = n(f);
              y !== null && (!(y.expirationTime > W) || (F && !ee()));
            ) {
              var N = y.callback;
              if (typeof N == "function") {
                ((y.callback = null), (v = y.priorityLevel));
                var K = N(y.expirationTime <= W);
                ((W = e.unstable_now()),
                  typeof K == "function"
                    ? (y.callback = K)
                    : y === n(f) && i(f),
                  A(W));
              } else i(f);
              y = n(f);
            }
            if (y !== null) var he = !0;
            else {
              var be = n(m);
              (be !== null && ce(R, be.startTime - W), (he = !1));
            }
            return he;
          } finally {
            ((y = null), (v = Z), (C = !1));
          }
        }
        var V = !1,
          U = null,
          z = -1,
          B = 5,
          H = -1;
        function ee() {
          return !(e.unstable_now() - H < B);
        }
        function Q() {
          if (U !== null) {
            var F = e.unstable_now();
            H = F;
            var W = !0;
            try {
              W = U(!0, F);
            } finally {
              W ? J() : ((V = !1), (U = null));
            }
          } else V = !1;
        }
        var J;
        if (typeof M == "function")
          J = function () {
            M(Q);
          };
        else if (typeof MessageChannel < "u") {
          var ae = new MessageChannel(),
            ye = ae.port2;
          ((ae.port1.onmessage = Q),
            (J = function () {
              ye.postMessage(null);
            }));
        } else
          J = function () {
            k(Q, 0);
          };
        function ue(F) {
          ((U = F), V || ((V = !0), J()));
        }
        function ce(F, W) {
          z = k(function () {
            F(e.unstable_now());
          }, W);
        }
        ((e.unstable_IdlePriority = 5),
          (e.unstable_ImmediatePriority = 1),
          (e.unstable_LowPriority = 4),
          (e.unstable_NormalPriority = 3),
          (e.unstable_Profiling = null),
          (e.unstable_UserBlockingPriority = 2),
          (e.unstable_cancelCallback = function (F) {
            F.callback = null;
          }),
          (e.unstable_continueExecution = function () {
            E || C || ((E = !0), ue(P));
          }),
          (e.unstable_forceFrameRate = function (F) {
            0 > F || 125 < F
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                )
              : (B = 0 < F ? Math.floor(1e3 / F) : 5);
          }),
          (e.unstable_getCurrentPriorityLevel = function () {
            return v;
          }),
          (e.unstable_getFirstCallbackNode = function () {
            return n(f);
          }),
          (e.unstable_next = function (F) {
            switch (v) {
              case 1:
              case 2:
              case 3:
                var W = 3;
                break;
              default:
                W = v;
            }
            var Z = v;
            v = W;
            try {
              return F();
            } finally {
              v = Z;
            }
          }),
          (e.unstable_pauseExecution = function () {}),
          (e.unstable_requestPaint = function () {}),
          (e.unstable_runWithPriority = function (F, W) {
            switch (F) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                F = 3;
            }
            var Z = v;
            v = F;
            try {
              return W();
            } finally {
              v = Z;
            }
          }),
          (e.unstable_scheduleCallback = function (F, W, Z) {
            var N = e.unstable_now();
            switch (
              (typeof Z == "object" && Z !== null
                ? ((Z = Z.delay),
                  (Z = typeof Z == "number" && 0 < Z ? N + Z : N))
                : (Z = N),
              F)
            ) {
              case 1:
                var K = -1;
                break;
              case 2:
                K = 250;
                break;
              case 5:
                K = 1073741823;
                break;
              case 4:
                K = 1e4;
                break;
              default:
                K = 5e3;
            }
            return (
              (K = Z + K),
              (F = {
                id: g++,
                callback: W,
                priorityLevel: F,
                startTime: Z,
                expirationTime: K,
                sortIndex: -1,
              }),
              Z > N
                ? ((F.sortIndex = Z),
                  t(m, F),
                  n(f) === null &&
                    F === n(m) &&
                    (S ? (x(z), (z = -1)) : (S = !0), ce(R, Z - N)))
                : ((F.sortIndex = K), t(f, F), E || C || ((E = !0), ue(P))),
              F
            );
          }),
          (e.unstable_shouldYield = ee),
          (e.unstable_wrapCallback = function (F) {
            var W = v;
            return function () {
              var Z = v;
              v = W;
              try {
                return F.apply(this, arguments);
              } finally {
                v = Z;
              }
            };
          }));
      })(Nd)),
    Nd
  );
}
var Yg;
function K1() {
  return (Yg || ((Yg = 1), (_d.exports = H1())), _d.exports);
}
var Xg;
function G1() {
  if (Xg) return Dt;
  Xg = 1;
  var e = Hf(),
    t = K1();
  function n(r) {
    for (
      var s = "https://reactjs.org/docs/error-decoder.html?invariant=" + r,
        a = 1;
      a < arguments.length;
      a++
    )
      s += "&args[]=" + encodeURIComponent(arguments[a]);
    return (
      "Minified React error #" +
      r +
      "; visit " +
      s +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  var i = new Set(),
    o = {};
  function l(r, s) {
    (u(r, s), u(r + "Capture", s));
  }
  function u(r, s) {
    for (o[r] = s, r = 0; r < s.length; r++) i.add(s[r]);
  }
  var d = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    f = Object.prototype.hasOwnProperty,
    m =
      /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    g = {},
    y = {};
  function v(r) {
    return f.call(y, r)
      ? !0
      : f.call(g, r)
        ? !1
        : m.test(r)
          ? (y[r] = !0)
          : ((g[r] = !0), !1);
  }
  function C(r, s, a, c) {
    if (a !== null && a.type === 0) return !1;
    switch (typeof s) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return c
          ? !1
          : a !== null
            ? !a.acceptsBooleans
            : ((r = r.toLowerCase().slice(0, 5)),
              r !== "data-" && r !== "aria-");
      default:
        return !1;
    }
  }
  function E(r, s, a, c) {
    if (s === null || typeof s > "u" || C(r, s, a, c)) return !0;
    if (c) return !1;
    if (a !== null)
      switch (a.type) {
        case 3:
          return !s;
        case 4:
          return s === !1;
        case 5:
          return isNaN(s);
        case 6:
          return isNaN(s) || 1 > s;
      }
    return !1;
  }
  function S(r, s, a, c, h, p, b) {
    ((this.acceptsBooleans = s === 2 || s === 3 || s === 4),
      (this.attributeName = c),
      (this.attributeNamespace = h),
      (this.mustUseProperty = a),
      (this.propertyName = r),
      (this.type = s),
      (this.sanitizeURL = p),
      (this.removeEmptyString = b));
  }
  var k = {};
  ("children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
    .split(" ")
    .forEach(function (r) {
      k[r] = new S(r, 0, !1, r, null, !1, !1);
    }),
    [
      ["acceptCharset", "accept-charset"],
      ["className", "class"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
    ].forEach(function (r) {
      var s = r[0];
      k[s] = new S(s, 1, !1, r[1], null, !1, !1);
    }),
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(
      function (r) {
        k[r] = new S(r, 2, !1, r.toLowerCase(), null, !1, !1);
      },
    ),
    [
      "autoReverse",
      "externalResourcesRequired",
      "focusable",
      "preserveAlpha",
    ].forEach(function (r) {
      k[r] = new S(r, 2, !1, r, null, !1, !1);
    }),
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
      .split(" ")
      .forEach(function (r) {
        k[r] = new S(r, 3, !1, r.toLowerCase(), null, !1, !1);
      }),
    ["checked", "multiple", "muted", "selected"].forEach(function (r) {
      k[r] = new S(r, 3, !0, r, null, !1, !1);
    }),
    ["capture", "download"].forEach(function (r) {
      k[r] = new S(r, 4, !1, r, null, !1, !1);
    }),
    ["cols", "rows", "size", "span"].forEach(function (r) {
      k[r] = new S(r, 6, !1, r, null, !1, !1);
    }),
    ["rowSpan", "start"].forEach(function (r) {
      k[r] = new S(r, 5, !1, r.toLowerCase(), null, !1, !1);
    }));
  var x = /[\-:]([a-z])/g;
  function M(r) {
    return r[1].toUpperCase();
  }
  ("accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
    .split(" ")
    .forEach(function (r) {
      var s = r.replace(x, M);
      k[s] = new S(s, 1, !1, r, null, !1, !1);
    }),
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
      .split(" ")
      .forEach(function (r) {
        var s = r.replace(x, M);
        k[s] = new S(s, 1, !1, r, "http://www.w3.org/1999/xlink", !1, !1);
      }),
    ["xml:base", "xml:lang", "xml:space"].forEach(function (r) {
      var s = r.replace(x, M);
      k[s] = new S(s, 1, !1, r, "http://www.w3.org/XML/1998/namespace", !1, !1);
    }),
    ["tabIndex", "crossOrigin"].forEach(function (r) {
      k[r] = new S(r, 1, !1, r.toLowerCase(), null, !1, !1);
    }),
    (k.xlinkHref = new S(
      "xlinkHref",
      1,
      !1,
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      !1,
    )),
    ["src", "href", "action", "formAction"].forEach(function (r) {
      k[r] = new S(r, 1, !1, r.toLowerCase(), null, !0, !0);
    }));
  function A(r, s, a, c) {
    var h = k.hasOwnProperty(s) ? k[s] : null;
    (h !== null
      ? h.type !== 0
      : c ||
        !(2 < s.length) ||
        (s[0] !== "o" && s[0] !== "O") ||
        (s[1] !== "n" && s[1] !== "N")) &&
      (E(s, a, h, c) && (a = null),
      c || h === null
        ? v(s) &&
          (a === null ? r.removeAttribute(s) : r.setAttribute(s, "" + a))
        : h.mustUseProperty
          ? (r[h.propertyName] = a === null ? (h.type === 3 ? !1 : "") : a)
          : ((s = h.attributeName),
            (c = h.attributeNamespace),
            a === null
              ? r.removeAttribute(s)
              : ((h = h.type),
                (a = h === 3 || (h === 4 && a === !0) ? "" : "" + a),
                c ? r.setAttributeNS(c, s, a) : r.setAttribute(s, a))));
  }
  var R = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    P = Symbol.for("react.element"),
    V = Symbol.for("react.portal"),
    U = Symbol.for("react.fragment"),
    z = Symbol.for("react.strict_mode"),
    B = Symbol.for("react.profiler"),
    H = Symbol.for("react.provider"),
    ee = Symbol.for("react.context"),
    Q = Symbol.for("react.forward_ref"),
    J = Symbol.for("react.suspense"),
    ae = Symbol.for("react.suspense_list"),
    ye = Symbol.for("react.memo"),
    ue = Symbol.for("react.lazy"),
    ce = Symbol.for("react.offscreen"),
    F = Symbol.iterator;
  function W(r) {
    return r === null || typeof r != "object"
      ? null
      : ((r = (F && r[F]) || r["@@iterator"]),
        typeof r == "function" ? r : null);
  }
  var Z = Object.assign,
    N;
  function K(r) {
    if (N === void 0)
      try {
        throw Error();
      } catch (a) {
        var s = a.stack.trim().match(/\n( *(at )?)/);
        N = (s && s[1]) || "";
      }
    return (
      `
` +
      N +
      r
    );
  }
  var he = !1;
  function be(r, s) {
    if (!r || he) return "";
    he = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (s)
        if (
          ((s = function () {
            throw Error();
          }),
          Object.defineProperty(s.prototype, "props", {
            set: function () {
              throw Error();
            },
          }),
          typeof Reflect == "object" && Reflect.construct)
        ) {
          try {
            Reflect.construct(s, []);
          } catch ($) {
            var c = $;
          }
          Reflect.construct(r, [], s);
        } else {
          try {
            s.call();
          } catch ($) {
            c = $;
          }
          r.call(s.prototype);
        }
      else {
        try {
          throw Error();
        } catch ($) {
          c = $;
        }
        r();
      }
    } catch ($) {
      if ($ && c && typeof $.stack == "string") {
        for (
          var h = $.stack.split(`
`),
            p = c.stack.split(`
`),
            b = h.length - 1,
            I = p.length - 1;
          1 <= b && 0 <= I && h[b] !== p[I];
        )
          I--;
        for (; 1 <= b && 0 <= I; b--, I--)
          if (h[b] !== p[I]) {
            if (b !== 1 || I !== 1)
              do
                if ((b--, I--, 0 > I || h[b] !== p[I])) {
                  var j =
                    `
` + h[b].replace(" at new ", " at ");
                  return (
                    r.displayName &&
                      j.includes("<anonymous>") &&
                      (j = j.replace("<anonymous>", r.displayName)),
                    j
                  );
                }
              while (1 <= b && 0 <= I);
            break;
          }
      }
    } finally {
      ((he = !1), (Error.prepareStackTrace = a));
    }
    return (r = r ? r.displayName || r.name : "") ? K(r) : "";
  }
  function Ce(r) {
    switch (r.tag) {
      case 5:
        return K(r.type);
      case 16:
        return K("Lazy");
      case 13:
        return K("Suspense");
      case 19:
        return K("SuspenseList");
      case 0:
      case 2:
      case 15:
        return ((r = be(r.type, !1)), r);
      case 11:
        return ((r = be(r.type.render, !1)), r);
      case 1:
        return ((r = be(r.type, !0)), r);
      default:
        return "";
    }
  }
  function Se(r) {
    if (r == null) return null;
    if (typeof r == "function") return r.displayName || r.name || null;
    if (typeof r == "string") return r;
    switch (r) {
      case U:
        return "Fragment";
      case V:
        return "Portal";
      case B:
        return "Profiler";
      case z:
        return "StrictMode";
      case J:
        return "Suspense";
      case ae:
        return "SuspenseList";
    }
    if (typeof r == "object")
      switch (r.$$typeof) {
        case ee:
          return (r.displayName || "Context") + ".Consumer";
        case H:
          return (r._context.displayName || "Context") + ".Provider";
        case Q:
          var s = r.render;
          return (
            (r = r.displayName),
            r ||
              ((r = s.displayName || s.name || ""),
              (r = r !== "" ? "ForwardRef(" + r + ")" : "ForwardRef")),
            r
          );
        case ye:
          return (
            (s = r.displayName || null),
            s !== null ? s : Se(r.type) || "Memo"
          );
        case ue:
          ((s = r._payload), (r = r._init));
          try {
            return Se(r(s));
          } catch {}
      }
    return null;
  }
  function ve(r) {
    var s = r.type;
    switch (r.tag) {
      case 24:
        return "Cache";
      case 9:
        return (s.displayName || "Context") + ".Consumer";
      case 10:
        return (s._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return (
          (r = s.render),
          (r = r.displayName || r.name || ""),
          s.displayName || (r !== "" ? "ForwardRef(" + r + ")" : "ForwardRef")
        );
      case 7:
        return "Fragment";
      case 5:
        return s;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return Se(s);
      case 8:
        return s === z ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof s == "function") return s.displayName || s.name || null;
        if (typeof s == "string") return s;
    }
    return null;
  }
  function Oe(r) {
    switch (typeof r) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return r;
      case "object":
        return r;
      default:
        return "";
    }
  }
  function Re(r) {
    var s = r.type;
    return (
      (r = r.nodeName) &&
      r.toLowerCase() === "input" &&
      (s === "checkbox" || s === "radio")
    );
  }
  function Ct(r) {
    var s = Re(r) ? "checked" : "value",
      a = Object.getOwnPropertyDescriptor(r.constructor.prototype, s),
      c = "" + r[s];
    if (
      !r.hasOwnProperty(s) &&
      typeof a < "u" &&
      typeof a.get == "function" &&
      typeof a.set == "function"
    ) {
      var h = a.get,
        p = a.set;
      return (
        Object.defineProperty(r, s, {
          configurable: !0,
          get: function () {
            return h.call(this);
          },
          set: function (b) {
            ((c = "" + b), p.call(this, b));
          },
        }),
        Object.defineProperty(r, s, { enumerable: a.enumerable }),
        {
          getValue: function () {
            return c;
          },
          setValue: function (b) {
            c = "" + b;
          },
          stopTracking: function () {
            ((r._valueTracker = null), delete r[s]);
          },
        }
      );
    }
  }
  function Ms(r) {
    r._valueTracker || (r._valueTracker = Ct(r));
  }
  function sa(r) {
    if (!r) return !1;
    var s = r._valueTracker;
    if (!s) return !0;
    var a = s.getValue(),
      c = "";
    return (
      r && (c = Re(r) ? (r.checked ? "true" : "false") : r.value),
      (r = c),
      r !== a ? (s.setValue(r), !0) : !1
    );
  }
  function Fn(r) {
    if (
      ((r = r || (typeof document < "u" ? document : void 0)), typeof r > "u")
    )
      return null;
    try {
      return r.activeElement || r.body;
    } catch {
      return r.body;
    }
  }
  function Lu(r, s) {
    var a = s.checked;
    return Z({}, s, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: a ?? r._wrapperState.initialChecked,
    });
  }
  function Zh(r, s) {
    var a = s.defaultValue == null ? "" : s.defaultValue,
      c = s.checked != null ? s.checked : s.defaultChecked;
    ((a = Oe(s.value != null ? s.value : a)),
      (r._wrapperState = {
        initialChecked: c,
        initialValue: a,
        controlled:
          s.type === "checkbox" || s.type === "radio"
            ? s.checked != null
            : s.value != null,
      }));
  }
  function Jh(r, s) {
    ((s = s.checked), s != null && A(r, "checked", s, !1));
  }
  function Bu(r, s) {
    Jh(r, s);
    var a = Oe(s.value),
      c = s.type;
    if (a != null)
      c === "number"
        ? ((a === 0 && r.value === "") || r.value != a) && (r.value = "" + a)
        : r.value !== "" + a && (r.value = "" + a);
    else if (c === "submit" || c === "reset") {
      r.removeAttribute("value");
      return;
    }
    (s.hasOwnProperty("value")
      ? $u(r, s.type, a)
      : s.hasOwnProperty("defaultValue") && $u(r, s.type, Oe(s.defaultValue)),
      s.checked == null &&
        s.defaultChecked != null &&
        (r.defaultChecked = !!s.defaultChecked));
  }
  function ep(r, s, a) {
    if (s.hasOwnProperty("value") || s.hasOwnProperty("defaultValue")) {
      var c = s.type;
      if (
        !(
          (c !== "submit" && c !== "reset") ||
          (s.value !== void 0 && s.value !== null)
        )
      )
        return;
      ((s = "" + r._wrapperState.initialValue),
        a || s === r.value || (r.value = s),
        (r.defaultValue = s));
    }
    ((a = r.name),
      a !== "" && (r.name = ""),
      (r.defaultChecked = !!r._wrapperState.initialChecked),
      a !== "" && (r.name = a));
  }
  function $u(r, s, a) {
    (s !== "number" || Fn(r.ownerDocument) !== r) &&
      (a == null
        ? (r.defaultValue = "" + r._wrapperState.initialValue)
        : r.defaultValue !== "" + a && (r.defaultValue = "" + a));
  }
  var Ri = Array.isArray;
  function As(r, s, a, c) {
    if (((r = r.options), s)) {
      s = {};
      for (var h = 0; h < a.length; h++) s["$" + a[h]] = !0;
      for (a = 0; a < r.length; a++)
        ((h = s.hasOwnProperty("$" + r[a].value)),
          r[a].selected !== h && (r[a].selected = h),
          h && c && (r[a].defaultSelected = !0));
    } else {
      for (a = "" + Oe(a), s = null, h = 0; h < r.length; h++) {
        if (r[h].value === a) {
          ((r[h].selected = !0), c && (r[h].defaultSelected = !0));
          return;
        }
        s !== null || r[h].disabled || (s = r[h]);
      }
      s !== null && (s.selected = !0);
    }
  }
  function zu(r, s) {
    if (s.dangerouslySetInnerHTML != null) throw Error(n(91));
    return Z({}, s, {
      value: void 0,
      defaultValue: void 0,
      children: "" + r._wrapperState.initialValue,
    });
  }
  function tp(r, s) {
    var a = s.value;
    if (a == null) {
      if (((a = s.children), (s = s.defaultValue), a != null)) {
        if (s != null) throw Error(n(92));
        if (Ri(a)) {
          if (1 < a.length) throw Error(n(93));
          a = a[0];
        }
        s = a;
      }
      (s == null && (s = ""), (a = s));
    }
    r._wrapperState = { initialValue: Oe(a) };
  }
  function np(r, s) {
    var a = Oe(s.value),
      c = Oe(s.defaultValue);
    (a != null &&
      ((a = "" + a),
      a !== r.value && (r.value = a),
      s.defaultValue == null && r.defaultValue !== a && (r.defaultValue = a)),
      c != null && (r.defaultValue = "" + c));
  }
  function rp(r) {
    var s = r.textContent;
    s === r._wrapperState.initialValue &&
      s !== "" &&
      s !== null &&
      (r.value = s);
  }
  function sp(r) {
    switch (r) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function Fu(r, s) {
    return r == null || r === "http://www.w3.org/1999/xhtml"
      ? sp(s)
      : r === "http://www.w3.org/2000/svg" && s === "foreignObject"
        ? "http://www.w3.org/1999/xhtml"
        : r;
  }
  var ia,
    ip = (function (r) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
        ? function (s, a, c, h) {
            MSApp.execUnsafeLocalFunction(function () {
              return r(s, a, c, h);
            });
          }
        : r;
    })(function (r, s) {
      if (r.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in r)
        r.innerHTML = s;
      else {
        for (
          ia = ia || document.createElement("div"),
            ia.innerHTML = "<svg>" + s.valueOf().toString() + "</svg>",
            s = ia.firstChild;
          r.firstChild;
        )
          r.removeChild(r.firstChild);
        for (; s.firstChild; ) r.appendChild(s.firstChild);
      }
    });
  function _i(r, s) {
    if (s) {
      var a = r.firstChild;
      if (a && a === r.lastChild && a.nodeType === 3) {
        a.nodeValue = s;
        return;
      }
    }
    r.textContent = s;
  }
  var Ni = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0,
    },
    HE = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Ni).forEach(function (r) {
    HE.forEach(function (s) {
      ((s = s + r.charAt(0).toUpperCase() + r.substring(1)), (Ni[s] = Ni[r]));
    });
  });
  function op(r, s, a) {
    return s == null || typeof s == "boolean" || s === ""
      ? ""
      : a || typeof s != "number" || s === 0 || (Ni.hasOwnProperty(r) && Ni[r])
        ? ("" + s).trim()
        : s + "px";
  }
  function ap(r, s) {
    r = r.style;
    for (var a in s)
      if (s.hasOwnProperty(a)) {
        var c = a.indexOf("--") === 0,
          h = op(a, s[a], c);
        (a === "float" && (a = "cssFloat"),
          c ? r.setProperty(a, h) : (r[a] = h));
      }
  }
  var KE = Z(
    { menuitem: !0 },
    {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0,
    },
  );
  function Uu(r, s) {
    if (s) {
      if (KE[r] && (s.children != null || s.dangerouslySetInnerHTML != null))
        throw Error(n(137, r));
      if (s.dangerouslySetInnerHTML != null) {
        if (s.children != null) throw Error(n(60));
        if (
          typeof s.dangerouslySetInnerHTML != "object" ||
          !("__html" in s.dangerouslySetInnerHTML)
        )
          throw Error(n(61));
      }
      if (s.style != null && typeof s.style != "object") throw Error(n(62));
    }
  }
  function Vu(r, s) {
    if (r.indexOf("-") === -1) return typeof s.is == "string";
    switch (r) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Wu = null;
  function Hu(r) {
    return (
      (r = r.target || r.srcElement || window),
      r.correspondingUseElement && (r = r.correspondingUseElement),
      r.nodeType === 3 ? r.parentNode : r
    );
  }
  var Ku = null,
    js = null,
    Rs = null;
  function lp(r) {
    if ((r = no(r))) {
      if (typeof Ku != "function") throw Error(n(280));
      var s = r.stateNode;
      s && ((s = Ia(s)), Ku(r.stateNode, r.type, s));
    }
  }
  function up(r) {
    js ? (Rs ? Rs.push(r) : (Rs = [r])) : (js = r);
  }
  function cp() {
    if (js) {
      var r = js,
        s = Rs;
      if (((Rs = js = null), lp(r), s)) for (r = 0; r < s.length; r++) lp(s[r]);
    }
  }
  function dp(r, s) {
    return r(s);
  }
  function fp() {}
  var Gu = !1;
  function hp(r, s, a) {
    if (Gu) return r(s, a);
    Gu = !0;
    try {
      return dp(r, s, a);
    } finally {
      ((Gu = !1), (js !== null || Rs !== null) && (fp(), cp()));
    }
  }
  function Pi(r, s) {
    var a = r.stateNode;
    if (a === null) return null;
    var c = Ia(a);
    if (c === null) return null;
    a = c[s];
    e: switch (s) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        ((c = !c.disabled) ||
          ((r = r.type),
          (c = !(
            r === "button" ||
            r === "input" ||
            r === "select" ||
            r === "textarea"
          ))),
          (r = !c));
        break e;
      default:
        r = !1;
    }
    if (r) return null;
    if (a && typeof a != "function") throw Error(n(231, s, typeof a));
    return a;
  }
  var qu = !1;
  if (d)
    try {
      var Di = {};
      (Object.defineProperty(Di, "passive", {
        get: function () {
          qu = !0;
        },
      }),
        window.addEventListener("test", Di, Di),
        window.removeEventListener("test", Di, Di));
    } catch {
      qu = !1;
    }
  function GE(r, s, a, c, h, p, b, I, j) {
    var $ = Array.prototype.slice.call(arguments, 3);
    try {
      s.apply(a, $);
    } catch (q) {
      this.onError(q);
    }
  }
  var Li = !1,
    oa = null,
    aa = !1,
    Qu = null,
    qE = {
      onError: function (r) {
        ((Li = !0), (oa = r));
      },
    };
  function QE(r, s, a, c, h, p, b, I, j) {
    ((Li = !1), (oa = null), GE.apply(qE, arguments));
  }
  function YE(r, s, a, c, h, p, b, I, j) {
    if ((QE.apply(this, arguments), Li)) {
      if (Li) {
        var $ = oa;
        ((Li = !1), (oa = null));
      } else throw Error(n(198));
      aa || ((aa = !0), (Qu = $));
    }
  }
  function Kr(r) {
    var s = r,
      a = r;
    if (r.alternate) for (; s.return; ) s = s.return;
    else {
      r = s;
      do ((s = r), (s.flags & 4098) !== 0 && (a = s.return), (r = s.return));
      while (r);
    }
    return s.tag === 3 ? a : null;
  }
  function pp(r) {
    if (r.tag === 13) {
      var s = r.memoizedState;
      if (
        (s === null && ((r = r.alternate), r !== null && (s = r.memoizedState)),
        s !== null)
      )
        return s.dehydrated;
    }
    return null;
  }
  function mp(r) {
    if (Kr(r) !== r) throw Error(n(188));
  }
  function XE(r) {
    var s = r.alternate;
    if (!s) {
      if (((s = Kr(r)), s === null)) throw Error(n(188));
      return s !== r ? null : r;
    }
    for (var a = r, c = s; ; ) {
      var h = a.return;
      if (h === null) break;
      var p = h.alternate;
      if (p === null) {
        if (((c = h.return), c !== null)) {
          a = c;
          continue;
        }
        break;
      }
      if (h.child === p.child) {
        for (p = h.child; p; ) {
          if (p === a) return (mp(h), r);
          if (p === c) return (mp(h), s);
          p = p.sibling;
        }
        throw Error(n(188));
      }
      if (a.return !== c.return) ((a = h), (c = p));
      else {
        for (var b = !1, I = h.child; I; ) {
          if (I === a) {
            ((b = !0), (a = h), (c = p));
            break;
          }
          if (I === c) {
            ((b = !0), (c = h), (a = p));
            break;
          }
          I = I.sibling;
        }
        if (!b) {
          for (I = p.child; I; ) {
            if (I === a) {
              ((b = !0), (a = p), (c = h));
              break;
            }
            if (I === c) {
              ((b = !0), (c = p), (a = h));
              break;
            }
            I = I.sibling;
          }
          if (!b) throw Error(n(189));
        }
      }
      if (a.alternate !== c) throw Error(n(190));
    }
    if (a.tag !== 3) throw Error(n(188));
    return a.stateNode.current === a ? r : s;
  }
  function gp(r) {
    return ((r = XE(r)), r !== null ? yp(r) : null);
  }
  function yp(r) {
    if (r.tag === 5 || r.tag === 6) return r;
    for (r = r.child; r !== null; ) {
      var s = yp(r);
      if (s !== null) return s;
      r = r.sibling;
    }
    return null;
  }
  var vp = t.unstable_scheduleCallback,
    wp = t.unstable_cancelCallback,
    ZE = t.unstable_shouldYield,
    JE = t.unstable_requestPaint,
    qe = t.unstable_now,
    ex = t.unstable_getCurrentPriorityLevel,
    Yu = t.unstable_ImmediatePriority,
    bp = t.unstable_UserBlockingPriority,
    la = t.unstable_NormalPriority,
    tx = t.unstable_LowPriority,
    Sp = t.unstable_IdlePriority,
    ua = null,
    Tn = null;
  function nx(r) {
    if (Tn && typeof Tn.onCommitFiberRoot == "function")
      try {
        Tn.onCommitFiberRoot(ua, r, void 0, (r.current.flags & 128) === 128);
      } catch {}
  }
  var dn = Math.clz32 ? Math.clz32 : ix,
    rx = Math.log,
    sx = Math.LN2;
  function ix(r) {
    return ((r >>>= 0), r === 0 ? 32 : (31 - ((rx(r) / sx) | 0)) | 0);
  }
  var ca = 64,
    da = 4194304;
  function Bi(r) {
    switch (r & -r) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return r & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return r & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return r;
    }
  }
  function fa(r, s) {
    var a = r.pendingLanes;
    if (a === 0) return 0;
    var c = 0,
      h = r.suspendedLanes,
      p = r.pingedLanes,
      b = a & 268435455;
    if (b !== 0) {
      var I = b & ~h;
      I !== 0 ? (c = Bi(I)) : ((p &= b), p !== 0 && (c = Bi(p)));
    } else ((b = a & ~h), b !== 0 ? (c = Bi(b)) : p !== 0 && (c = Bi(p)));
    if (c === 0) return 0;
    if (
      s !== 0 &&
      s !== c &&
      (s & h) === 0 &&
      ((h = c & -c), (p = s & -s), h >= p || (h === 16 && (p & 4194240) !== 0))
    )
      return s;
    if (((c & 4) !== 0 && (c |= a & 16), (s = r.entangledLanes), s !== 0))
      for (r = r.entanglements, s &= c; 0 < s; )
        ((a = 31 - dn(s)), (h = 1 << a), (c |= r[a]), (s &= ~h));
    return c;
  }
  function ox(r, s) {
    switch (r) {
      case 1:
      case 2:
      case 4:
        return s + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return s + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function ax(r, s) {
    for (
      var a = r.suspendedLanes,
        c = r.pingedLanes,
        h = r.expirationTimes,
        p = r.pendingLanes;
      0 < p;
    ) {
      var b = 31 - dn(p),
        I = 1 << b,
        j = h[b];
      (j === -1
        ? ((I & a) === 0 || (I & c) !== 0) && (h[b] = ox(I, s))
        : j <= s && (r.expiredLanes |= I),
        (p &= ~I));
    }
  }
  function Xu(r) {
    return (
      (r = r.pendingLanes & -1073741825),
      r !== 0 ? r : r & 1073741824 ? 1073741824 : 0
    );
  }
  function Ep() {
    var r = ca;
    return ((ca <<= 1), (ca & 4194240) === 0 && (ca = 64), r);
  }
  function Zu(r) {
    for (var s = [], a = 0; 31 > a; a++) s.push(r);
    return s;
  }
  function $i(r, s, a) {
    ((r.pendingLanes |= s),
      s !== 536870912 && ((r.suspendedLanes = 0), (r.pingedLanes = 0)),
      (r = r.eventTimes),
      (s = 31 - dn(s)),
      (r[s] = a));
  }
  function lx(r, s) {
    var a = r.pendingLanes & ~s;
    ((r.pendingLanes = s),
      (r.suspendedLanes = 0),
      (r.pingedLanes = 0),
      (r.expiredLanes &= s),
      (r.mutableReadLanes &= s),
      (r.entangledLanes &= s),
      (s = r.entanglements));
    var c = r.eventTimes;
    for (r = r.expirationTimes; 0 < a; ) {
      var h = 31 - dn(a),
        p = 1 << h;
      ((s[h] = 0), (c[h] = -1), (r[h] = -1), (a &= ~p));
    }
  }
  function Ju(r, s) {
    var a = (r.entangledLanes |= s);
    for (r = r.entanglements; a; ) {
      var c = 31 - dn(a),
        h = 1 << c;
      ((h & s) | (r[c] & s) && (r[c] |= s), (a &= ~h));
    }
  }
  var je = 0;
  function xp(r) {
    return (
      (r &= -r),
      1 < r ? (4 < r ? ((r & 268435455) !== 0 ? 16 : 536870912) : 4) : 1
    );
  }
  var Cp,
    ec,
    kp,
    Op,
    Tp,
    tc = !1,
    ha = [],
    lr = null,
    ur = null,
    cr = null,
    zi = new Map(),
    Fi = new Map(),
    dr = [],
    ux =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
        " ",
      );
  function Ip(r, s) {
    switch (r) {
      case "focusin":
      case "focusout":
        lr = null;
        break;
      case "dragenter":
      case "dragleave":
        ur = null;
        break;
      case "mouseover":
      case "mouseout":
        cr = null;
        break;
      case "pointerover":
      case "pointerout":
        zi.delete(s.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Fi.delete(s.pointerId);
    }
  }
  function Ui(r, s, a, c, h, p) {
    return r === null || r.nativeEvent !== p
      ? ((r = {
          blockedOn: s,
          domEventName: a,
          eventSystemFlags: c,
          nativeEvent: p,
          targetContainers: [h],
        }),
        s !== null && ((s = no(s)), s !== null && ec(s)),
        r)
      : ((r.eventSystemFlags |= c),
        (s = r.targetContainers),
        h !== null && s.indexOf(h) === -1 && s.push(h),
        r);
  }
  function cx(r, s, a, c, h) {
    switch (s) {
      case "focusin":
        return ((lr = Ui(lr, r, s, a, c, h)), !0);
      case "dragenter":
        return ((ur = Ui(ur, r, s, a, c, h)), !0);
      case "mouseover":
        return ((cr = Ui(cr, r, s, a, c, h)), !0);
      case "pointerover":
        var p = h.pointerId;
        return (zi.set(p, Ui(zi.get(p) || null, r, s, a, c, h)), !0);
      case "gotpointercapture":
        return (
          (p = h.pointerId),
          Fi.set(p, Ui(Fi.get(p) || null, r, s, a, c, h)),
          !0
        );
    }
    return !1;
  }
  function Mp(r) {
    var s = Gr(r.target);
    if (s !== null) {
      var a = Kr(s);
      if (a !== null) {
        if (((s = a.tag), s === 13)) {
          if (((s = pp(a)), s !== null)) {
            ((r.blockedOn = s),
              Tp(r.priority, function () {
                kp(a);
              }));
            return;
          }
        } else if (s === 3 && a.stateNode.current.memoizedState.isDehydrated) {
          r.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
          return;
        }
      }
    }
    r.blockedOn = null;
  }
  function pa(r) {
    if (r.blockedOn !== null) return !1;
    for (var s = r.targetContainers; 0 < s.length; ) {
      var a = rc(r.domEventName, r.eventSystemFlags, s[0], r.nativeEvent);
      if (a === null) {
        a = r.nativeEvent;
        var c = new a.constructor(a.type, a);
        ((Wu = c), a.target.dispatchEvent(c), (Wu = null));
      } else return ((s = no(a)), s !== null && ec(s), (r.blockedOn = a), !1);
      s.shift();
    }
    return !0;
  }
  function Ap(r, s, a) {
    pa(r) && a.delete(s);
  }
  function dx() {
    ((tc = !1),
      lr !== null && pa(lr) && (lr = null),
      ur !== null && pa(ur) && (ur = null),
      cr !== null && pa(cr) && (cr = null),
      zi.forEach(Ap),
      Fi.forEach(Ap));
  }
  function Vi(r, s) {
    r.blockedOn === s &&
      ((r.blockedOn = null),
      tc ||
        ((tc = !0),
        t.unstable_scheduleCallback(t.unstable_NormalPriority, dx)));
  }
  function Wi(r) {
    function s(h) {
      return Vi(h, r);
    }
    if (0 < ha.length) {
      Vi(ha[0], r);
      for (var a = 1; a < ha.length; a++) {
        var c = ha[a];
        c.blockedOn === r && (c.blockedOn = null);
      }
    }
    for (
      lr !== null && Vi(lr, r),
        ur !== null && Vi(ur, r),
        cr !== null && Vi(cr, r),
        zi.forEach(s),
        Fi.forEach(s),
        a = 0;
      a < dr.length;
      a++
    )
      ((c = dr[a]), c.blockedOn === r && (c.blockedOn = null));
    for (; 0 < dr.length && ((a = dr[0]), a.blockedOn === null); )
      (Mp(a), a.blockedOn === null && dr.shift());
  }
  var _s = R.ReactCurrentBatchConfig,
    ma = !0;
  function fx(r, s, a, c) {
    var h = je,
      p = _s.transition;
    _s.transition = null;
    try {
      ((je = 1), nc(r, s, a, c));
    } finally {
      ((je = h), (_s.transition = p));
    }
  }
  function hx(r, s, a, c) {
    var h = je,
      p = _s.transition;
    _s.transition = null;
    try {
      ((je = 4), nc(r, s, a, c));
    } finally {
      ((je = h), (_s.transition = p));
    }
  }
  function nc(r, s, a, c) {
    if (ma) {
      var h = rc(r, s, a, c);
      if (h === null) (bc(r, s, c, ga, a), Ip(r, c));
      else if (cx(h, r, s, a, c)) c.stopPropagation();
      else if ((Ip(r, c), s & 4 && -1 < ux.indexOf(r))) {
        for (; h !== null; ) {
          var p = no(h);
          if (
            (p !== null && Cp(p),
            (p = rc(r, s, a, c)),
            p === null && bc(r, s, c, ga, a),
            p === h)
          )
            break;
          h = p;
        }
        h !== null && c.stopPropagation();
      } else bc(r, s, c, null, a);
    }
  }
  var ga = null;
  function rc(r, s, a, c) {
    if (((ga = null), (r = Hu(c)), (r = Gr(r)), r !== null))
      if (((s = Kr(r)), s === null)) r = null;
      else if (((a = s.tag), a === 13)) {
        if (((r = pp(s)), r !== null)) return r;
        r = null;
      } else if (a === 3) {
        if (s.stateNode.current.memoizedState.isDehydrated)
          return s.tag === 3 ? s.stateNode.containerInfo : null;
        r = null;
      } else s !== r && (r = null);
    return ((ga = r), null);
  }
  function jp(r) {
    switch (r) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (ex()) {
          case Yu:
            return 1;
          case bp:
            return 4;
          case la:
          case tx:
            return 16;
          case Sp:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var fr = null,
    sc = null,
    ya = null;
  function Rp() {
    if (ya) return ya;
    var r,
      s = sc,
      a = s.length,
      c,
      h = "value" in fr ? fr.value : fr.textContent,
      p = h.length;
    for (r = 0; r < a && s[r] === h[r]; r++);
    var b = a - r;
    for (c = 1; c <= b && s[a - c] === h[p - c]; c++);
    return (ya = h.slice(r, 1 < c ? 1 - c : void 0));
  }
  function va(r) {
    var s = r.keyCode;
    return (
      "charCode" in r
        ? ((r = r.charCode), r === 0 && s === 13 && (r = 13))
        : (r = s),
      r === 10 && (r = 13),
      32 <= r || r === 13 ? r : 0
    );
  }
  function wa() {
    return !0;
  }
  function _p() {
    return !1;
  }
  function Vt(r) {
    function s(a, c, h, p, b) {
      ((this._reactName = a),
        (this._targetInst = h),
        (this.type = c),
        (this.nativeEvent = p),
        (this.target = b),
        (this.currentTarget = null));
      for (var I in r)
        r.hasOwnProperty(I) && ((a = r[I]), (this[I] = a ? a(p) : p[I]));
      return (
        (this.isDefaultPrevented = (
          p.defaultPrevented != null ? p.defaultPrevented : p.returnValue === !1
        )
          ? wa
          : _p),
        (this.isPropagationStopped = _p),
        this
      );
    }
    return (
      Z(s.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a &&
            (a.preventDefault
              ? a.preventDefault()
              : typeof a.returnValue != "unknown" && (a.returnValue = !1),
            (this.isDefaultPrevented = wa));
        },
        stopPropagation: function () {
          var a = this.nativeEvent;
          a &&
            (a.stopPropagation
              ? a.stopPropagation()
              : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0),
            (this.isPropagationStopped = wa));
        },
        persist: function () {},
        isPersistent: wa,
      }),
      s
    );
  }
  var Ns = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (r) {
        return r.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    ic = Vt(Ns),
    Hi = Z({}, Ns, { view: 0, detail: 0 }),
    px = Vt(Hi),
    oc,
    ac,
    Ki,
    ba = Z({}, Hi, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: uc,
      button: 0,
      buttons: 0,
      relatedTarget: function (r) {
        return r.relatedTarget === void 0
          ? r.fromElement === r.srcElement
            ? r.toElement
            : r.fromElement
          : r.relatedTarget;
      },
      movementX: function (r) {
        return "movementX" in r
          ? r.movementX
          : (r !== Ki &&
              (Ki && r.type === "mousemove"
                ? ((oc = r.screenX - Ki.screenX), (ac = r.screenY - Ki.screenY))
                : (ac = oc = 0),
              (Ki = r)),
            oc);
      },
      movementY: function (r) {
        return "movementY" in r ? r.movementY : ac;
      },
    }),
    Np = Vt(ba),
    mx = Z({}, ba, { dataTransfer: 0 }),
    gx = Vt(mx),
    yx = Z({}, Hi, { relatedTarget: 0 }),
    lc = Vt(yx),
    vx = Z({}, Ns, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    wx = Vt(vx),
    bx = Z({}, Ns, {
      clipboardData: function (r) {
        return "clipboardData" in r ? r.clipboardData : window.clipboardData;
      },
    }),
    Sx = Vt(bx),
    Ex = Z({}, Ns, { data: 0 }),
    Pp = Vt(Ex),
    xx = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    Cx = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    kx = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function Ox(r) {
    var s = this.nativeEvent;
    return s.getModifierState
      ? s.getModifierState(r)
      : (r = kx[r])
        ? !!s[r]
        : !1;
  }
  function uc() {
    return Ox;
  }
  var Tx = Z({}, Hi, {
      key: function (r) {
        if (r.key) {
          var s = xx[r.key] || r.key;
          if (s !== "Unidentified") return s;
        }
        return r.type === "keypress"
          ? ((r = va(r)), r === 13 ? "Enter" : String.fromCharCode(r))
          : r.type === "keydown" || r.type === "keyup"
            ? Cx[r.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: uc,
      charCode: function (r) {
        return r.type === "keypress" ? va(r) : 0;
      },
      keyCode: function (r) {
        return r.type === "keydown" || r.type === "keyup" ? r.keyCode : 0;
      },
      which: function (r) {
        return r.type === "keypress"
          ? va(r)
          : r.type === "keydown" || r.type === "keyup"
            ? r.keyCode
            : 0;
      },
    }),
    Ix = Vt(Tx),
    Mx = Z({}, ba, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    Dp = Vt(Mx),
    Ax = Z({}, Hi, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: uc,
    }),
    jx = Vt(Ax),
    Rx = Z({}, Ns, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    _x = Vt(Rx),
    Nx = Z({}, ba, {
      deltaX: function (r) {
        return "deltaX" in r
          ? r.deltaX
          : "wheelDeltaX" in r
            ? -r.wheelDeltaX
            : 0;
      },
      deltaY: function (r) {
        return "deltaY" in r
          ? r.deltaY
          : "wheelDeltaY" in r
            ? -r.wheelDeltaY
            : "wheelDelta" in r
              ? -r.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    Px = Vt(Nx),
    Dx = [9, 13, 27, 32],
    cc = d && "CompositionEvent" in window,
    Gi = null;
  d && "documentMode" in document && (Gi = document.documentMode);
  var Lx = d && "TextEvent" in window && !Gi,
    Lp = d && (!cc || (Gi && 8 < Gi && 11 >= Gi)),
    Bp = " ",
    $p = !1;
  function zp(r, s) {
    switch (r) {
      case "keyup":
        return Dx.indexOf(s.keyCode) !== -1;
      case "keydown":
        return s.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Fp(r) {
    return (
      (r = r.detail),
      typeof r == "object" && "data" in r ? r.data : null
    );
  }
  var Ps = !1;
  function Bx(r, s) {
    switch (r) {
      case "compositionend":
        return Fp(s);
      case "keypress":
        return s.which !== 32 ? null : (($p = !0), Bp);
      case "textInput":
        return ((r = s.data), r === Bp && $p ? null : r);
      default:
        return null;
    }
  }
  function $x(r, s) {
    if (Ps)
      return r === "compositionend" || (!cc && zp(r, s))
        ? ((r = Rp()), (ya = sc = fr = null), (Ps = !1), r)
        : null;
    switch (r) {
      case "paste":
        return null;
      case "keypress":
        if (!(s.ctrlKey || s.altKey || s.metaKey) || (s.ctrlKey && s.altKey)) {
          if (s.char && 1 < s.char.length) return s.char;
          if (s.which) return String.fromCharCode(s.which);
        }
        return null;
      case "compositionend":
        return Lp && s.locale !== "ko" ? null : s.data;
      default:
        return null;
    }
  }
  var zx = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function Up(r) {
    var s = r && r.nodeName && r.nodeName.toLowerCase();
    return s === "input" ? !!zx[r.type] : s === "textarea";
  }
  function Vp(r, s, a, c) {
    (up(c),
      (s = ka(s, "onChange")),
      0 < s.length &&
        ((a = new ic("onChange", "change", null, a, c)),
        r.push({ event: a, listeners: s })));
  }
  var qi = null,
    Qi = null;
  function Fx(r) {
    am(r, 0);
  }
  function Sa(r) {
    var s = zs(r);
    if (sa(s)) return r;
  }
  function Ux(r, s) {
    if (r === "change") return s;
  }
  var Wp = !1;
  if (d) {
    var dc;
    if (d) {
      var fc = "oninput" in document;
      if (!fc) {
        var Hp = document.createElement("div");
        (Hp.setAttribute("oninput", "return;"),
          (fc = typeof Hp.oninput == "function"));
      }
      dc = fc;
    } else dc = !1;
    Wp = dc && (!document.documentMode || 9 < document.documentMode);
  }
  function Kp() {
    qi && (qi.detachEvent("onpropertychange", Gp), (Qi = qi = null));
  }
  function Gp(r) {
    if (r.propertyName === "value" && Sa(Qi)) {
      var s = [];
      (Vp(s, Qi, r, Hu(r)), hp(Fx, s));
    }
  }
  function Vx(r, s, a) {
    r === "focusin"
      ? (Kp(), (qi = s), (Qi = a), qi.attachEvent("onpropertychange", Gp))
      : r === "focusout" && Kp();
  }
  function Wx(r) {
    if (r === "selectionchange" || r === "keyup" || r === "keydown")
      return Sa(Qi);
  }
  function Hx(r, s) {
    if (r === "click") return Sa(s);
  }
  function Kx(r, s) {
    if (r === "input" || r === "change") return Sa(s);
  }
  function Gx(r, s) {
    return (r === s && (r !== 0 || 1 / r === 1 / s)) || (r !== r && s !== s);
  }
  var fn = typeof Object.is == "function" ? Object.is : Gx;
  function Yi(r, s) {
    if (fn(r, s)) return !0;
    if (
      typeof r != "object" ||
      r === null ||
      typeof s != "object" ||
      s === null
    )
      return !1;
    var a = Object.keys(r),
      c = Object.keys(s);
    if (a.length !== c.length) return !1;
    for (c = 0; c < a.length; c++) {
      var h = a[c];
      if (!f.call(s, h) || !fn(r[h], s[h])) return !1;
    }
    return !0;
  }
  function qp(r) {
    for (; r && r.firstChild; ) r = r.firstChild;
    return r;
  }
  function Qp(r, s) {
    var a = qp(r);
    r = 0;
    for (var c; a; ) {
      if (a.nodeType === 3) {
        if (((c = r + a.textContent.length), r <= s && c >= s))
          return { node: a, offset: s - r };
        r = c;
      }
      e: {
        for (; a; ) {
          if (a.nextSibling) {
            a = a.nextSibling;
            break e;
          }
          a = a.parentNode;
        }
        a = void 0;
      }
      a = qp(a);
    }
  }
  function Yp(r, s) {
    return r && s
      ? r === s
        ? !0
        : r && r.nodeType === 3
          ? !1
          : s && s.nodeType === 3
            ? Yp(r, s.parentNode)
            : "contains" in r
              ? r.contains(s)
              : r.compareDocumentPosition
                ? !!(r.compareDocumentPosition(s) & 16)
                : !1
      : !1;
  }
  function Xp() {
    for (var r = window, s = Fn(); s instanceof r.HTMLIFrameElement; ) {
      try {
        var a = typeof s.contentWindow.location.href == "string";
      } catch {
        a = !1;
      }
      if (a) r = s.contentWindow;
      else break;
      s = Fn(r.document);
    }
    return s;
  }
  function hc(r) {
    var s = r && r.nodeName && r.nodeName.toLowerCase();
    return (
      s &&
      ((s === "input" &&
        (r.type === "text" ||
          r.type === "search" ||
          r.type === "tel" ||
          r.type === "url" ||
          r.type === "password")) ||
        s === "textarea" ||
        r.contentEditable === "true")
    );
  }
  function qx(r) {
    var s = Xp(),
      a = r.focusedElem,
      c = r.selectionRange;
    if (
      s !== a &&
      a &&
      a.ownerDocument &&
      Yp(a.ownerDocument.documentElement, a)
    ) {
      if (c !== null && hc(a)) {
        if (
          ((s = c.start),
          (r = c.end),
          r === void 0 && (r = s),
          "selectionStart" in a)
        )
          ((a.selectionStart = s),
            (a.selectionEnd = Math.min(r, a.value.length)));
        else if (
          ((r = ((s = a.ownerDocument || document) && s.defaultView) || window),
          r.getSelection)
        ) {
          r = r.getSelection();
          var h = a.textContent.length,
            p = Math.min(c.start, h);
          ((c = c.end === void 0 ? p : Math.min(c.end, h)),
            !r.extend && p > c && ((h = c), (c = p), (p = h)),
            (h = Qp(a, p)));
          var b = Qp(a, c);
          h &&
            b &&
            (r.rangeCount !== 1 ||
              r.anchorNode !== h.node ||
              r.anchorOffset !== h.offset ||
              r.focusNode !== b.node ||
              r.focusOffset !== b.offset) &&
            ((s = s.createRange()),
            s.setStart(h.node, h.offset),
            r.removeAllRanges(),
            p > c
              ? (r.addRange(s), r.extend(b.node, b.offset))
              : (s.setEnd(b.node, b.offset), r.addRange(s)));
        }
      }
      for (s = [], r = a; (r = r.parentNode); )
        r.nodeType === 1 &&
          s.push({ element: r, left: r.scrollLeft, top: r.scrollTop });
      for (typeof a.focus == "function" && a.focus(), a = 0; a < s.length; a++)
        ((r = s[a]),
          (r.element.scrollLeft = r.left),
          (r.element.scrollTop = r.top));
    }
  }
  var Qx = d && "documentMode" in document && 11 >= document.documentMode,
    Ds = null,
    pc = null,
    Xi = null,
    mc = !1;
  function Zp(r, s, a) {
    var c =
      a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    mc ||
      Ds == null ||
      Ds !== Fn(c) ||
      ((c = Ds),
      "selectionStart" in c && hc(c)
        ? (c = { start: c.selectionStart, end: c.selectionEnd })
        : ((c = (
            (c.ownerDocument && c.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (c = {
            anchorNode: c.anchorNode,
            anchorOffset: c.anchorOffset,
            focusNode: c.focusNode,
            focusOffset: c.focusOffset,
          })),
      (Xi && Yi(Xi, c)) ||
        ((Xi = c),
        (c = ka(pc, "onSelect")),
        0 < c.length &&
          ((s = new ic("onSelect", "select", null, s, a)),
          r.push({ event: s, listeners: c }),
          (s.target = Ds))));
  }
  function Ea(r, s) {
    var a = {};
    return (
      (a[r.toLowerCase()] = s.toLowerCase()),
      (a["Webkit" + r] = "webkit" + s),
      (a["Moz" + r] = "moz" + s),
      a
    );
  }
  var Ls = {
      animationend: Ea("Animation", "AnimationEnd"),
      animationiteration: Ea("Animation", "AnimationIteration"),
      animationstart: Ea("Animation", "AnimationStart"),
      transitionend: Ea("Transition", "TransitionEnd"),
    },
    gc = {},
    Jp = {};
  d &&
    ((Jp = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete Ls.animationend.animation,
      delete Ls.animationiteration.animation,
      delete Ls.animationstart.animation),
    "TransitionEvent" in window || delete Ls.transitionend.transition);
  function xa(r) {
    if (gc[r]) return gc[r];
    if (!Ls[r]) return r;
    var s = Ls[r],
      a;
    for (a in s) if (s.hasOwnProperty(a) && a in Jp) return (gc[r] = s[a]);
    return r;
  }
  var em = xa("animationend"),
    tm = xa("animationiteration"),
    nm = xa("animationstart"),
    rm = xa("transitionend"),
    sm = new Map(),
    im =
      "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " ",
      );
  function hr(r, s) {
    (sm.set(r, s), l(s, [r]));
  }
  for (var yc = 0; yc < im.length; yc++) {
    var vc = im[yc],
      Yx = vc.toLowerCase(),
      Xx = vc[0].toUpperCase() + vc.slice(1);
    hr(Yx, "on" + Xx);
  }
  (hr(em, "onAnimationEnd"),
    hr(tm, "onAnimationIteration"),
    hr(nm, "onAnimationStart"),
    hr("dblclick", "onDoubleClick"),
    hr("focusin", "onFocus"),
    hr("focusout", "onBlur"),
    hr(rm, "onTransitionEnd"),
    u("onMouseEnter", ["mouseout", "mouseover"]),
    u("onMouseLeave", ["mouseout", "mouseover"]),
    u("onPointerEnter", ["pointerout", "pointerover"]),
    u("onPointerLeave", ["pointerout", "pointerover"]),
    l(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " ",
      ),
    ),
    l(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " ",
      ),
    ),
    l("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    l(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" "),
    ),
    l(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" "),
    ),
    l(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
    ));
  var Zi =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " ",
      ),
    Zx = new Set(
      "cancel close invalid load scroll toggle".split(" ").concat(Zi),
    );
  function om(r, s, a) {
    var c = r.type || "unknown-event";
    ((r.currentTarget = a), YE(c, s, void 0, r), (r.currentTarget = null));
  }
  function am(r, s) {
    s = (s & 4) !== 0;
    for (var a = 0; a < r.length; a++) {
      var c = r[a],
        h = c.event;
      c = c.listeners;
      e: {
        var p = void 0;
        if (s)
          for (var b = c.length - 1; 0 <= b; b--) {
            var I = c[b],
              j = I.instance,
              $ = I.currentTarget;
            if (((I = I.listener), j !== p && h.isPropagationStopped()))
              break e;
            (om(h, I, $), (p = j));
          }
        else
          for (b = 0; b < c.length; b++) {
            if (
              ((I = c[b]),
              (j = I.instance),
              ($ = I.currentTarget),
              (I = I.listener),
              j !== p && h.isPropagationStopped())
            )
              break e;
            (om(h, I, $), (p = j));
          }
      }
    }
    if (aa) throw ((r = Qu), (aa = !1), (Qu = null), r);
  }
  function Le(r, s) {
    var a = s[Oc];
    a === void 0 && (a = s[Oc] = new Set());
    var c = r + "__bubble";
    a.has(c) || (lm(s, r, 2, !1), a.add(c));
  }
  function wc(r, s, a) {
    var c = 0;
    (s && (c |= 4), lm(a, r, c, s));
  }
  var Ca = "_reactListening" + Math.random().toString(36).slice(2);
  function Ji(r) {
    if (!r[Ca]) {
      ((r[Ca] = !0),
        i.forEach(function (a) {
          a !== "selectionchange" && (Zx.has(a) || wc(a, !1, r), wc(a, !0, r));
        }));
      var s = r.nodeType === 9 ? r : r.ownerDocument;
      s === null || s[Ca] || ((s[Ca] = !0), wc("selectionchange", !1, s));
    }
  }
  function lm(r, s, a, c) {
    switch (jp(s)) {
      case 1:
        var h = fx;
        break;
      case 4:
        h = hx;
        break;
      default:
        h = nc;
    }
    ((a = h.bind(null, s, a, r)),
      (h = void 0),
      !qu ||
        (s !== "touchstart" && s !== "touchmove" && s !== "wheel") ||
        (h = !0),
      c
        ? h !== void 0
          ? r.addEventListener(s, a, { capture: !0, passive: h })
          : r.addEventListener(s, a, !0)
        : h !== void 0
          ? r.addEventListener(s, a, { passive: h })
          : r.addEventListener(s, a, !1));
  }
  function bc(r, s, a, c, h) {
    var p = c;
    if ((s & 1) === 0 && (s & 2) === 0 && c !== null)
      e: for (;;) {
        if (c === null) return;
        var b = c.tag;
        if (b === 3 || b === 4) {
          var I = c.stateNode.containerInfo;
          if (I === h || (I.nodeType === 8 && I.parentNode === h)) break;
          if (b === 4)
            for (b = c.return; b !== null; ) {
              var j = b.tag;
              if (
                (j === 3 || j === 4) &&
                ((j = b.stateNode.containerInfo),
                j === h || (j.nodeType === 8 && j.parentNode === h))
              )
                return;
              b = b.return;
            }
          for (; I !== null; ) {
            if (((b = Gr(I)), b === null)) return;
            if (((j = b.tag), j === 5 || j === 6)) {
              c = p = b;
              continue e;
            }
            I = I.parentNode;
          }
        }
        c = c.return;
      }
    hp(function () {
      var $ = p,
        q = Hu(a),
        Y = [];
      e: {
        var G = sm.get(r);
        if (G !== void 0) {
          var ne = ic,
            ie = r;
          switch (r) {
            case "keypress":
              if (va(a) === 0) break e;
            case "keydown":
            case "keyup":
              ne = Ix;
              break;
            case "focusin":
              ((ie = "focus"), (ne = lc));
              break;
            case "focusout":
              ((ie = "blur"), (ne = lc));
              break;
            case "beforeblur":
            case "afterblur":
              ne = lc;
              break;
            case "click":
              if (a.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              ne = Np;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              ne = gx;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              ne = jx;
              break;
            case em:
            case tm:
            case nm:
              ne = wx;
              break;
            case rm:
              ne = _x;
              break;
            case "scroll":
              ne = px;
              break;
            case "wheel":
              ne = Px;
              break;
            case "copy":
            case "cut":
            case "paste":
              ne = Sx;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              ne = Dp;
          }
          var oe = (s & 4) !== 0,
            Qe = !oe && r === "scroll",
            D = oe ? (G !== null ? G + "Capture" : null) : G;
          oe = [];
          for (var _ = $, L; _ !== null; ) {
            L = _;
            var X = L.stateNode;
            if (
              (L.tag === 5 &&
                X !== null &&
                ((L = X),
                D !== null &&
                  ((X = Pi(_, D)), X != null && oe.push(eo(_, X, L)))),
              Qe)
            )
              break;
            _ = _.return;
          }
          0 < oe.length &&
            ((G = new ne(G, ie, null, a, q)),
            Y.push({ event: G, listeners: oe }));
        }
      }
      if ((s & 7) === 0) {
        e: {
          if (
            ((G = r === "mouseover" || r === "pointerover"),
            (ne = r === "mouseout" || r === "pointerout"),
            G &&
              a !== Wu &&
              (ie = a.relatedTarget || a.fromElement) &&
              (Gr(ie) || ie[Un]))
          )
            break e;
          if (
            (ne || G) &&
            ((G =
              q.window === q
                ? q
                : (G = q.ownerDocument)
                  ? G.defaultView || G.parentWindow
                  : window),
            ne
              ? ((ie = a.relatedTarget || a.toElement),
                (ne = $),
                (ie = ie ? Gr(ie) : null),
                ie !== null &&
                  ((Qe = Kr(ie)),
                  ie !== Qe || (ie.tag !== 5 && ie.tag !== 6)) &&
                  (ie = null))
              : ((ne = null), (ie = $)),
            ne !== ie)
          ) {
            if (
              ((oe = Np),
              (X = "onMouseLeave"),
              (D = "onMouseEnter"),
              (_ = "mouse"),
              (r === "pointerout" || r === "pointerover") &&
                ((oe = Dp),
                (X = "onPointerLeave"),
                (D = "onPointerEnter"),
                (_ = "pointer")),
              (Qe = ne == null ? G : zs(ne)),
              (L = ie == null ? G : zs(ie)),
              (G = new oe(X, _ + "leave", ne, a, q)),
              (G.target = Qe),
              (G.relatedTarget = L),
              (X = null),
              Gr(q) === $ &&
                ((oe = new oe(D, _ + "enter", ie, a, q)),
                (oe.target = L),
                (oe.relatedTarget = Qe),
                (X = oe)),
              (Qe = X),
              ne && ie)
            )
              t: {
                for (oe = ne, D = ie, _ = 0, L = oe; L; L = Bs(L)) _++;
                for (L = 0, X = D; X; X = Bs(X)) L++;
                for (; 0 < _ - L; ) ((oe = Bs(oe)), _--);
                for (; 0 < L - _; ) ((D = Bs(D)), L--);
                for (; _--; ) {
                  if (oe === D || (D !== null && oe === D.alternate)) break t;
                  ((oe = Bs(oe)), (D = Bs(D)));
                }
                oe = null;
              }
            else oe = null;
            (ne !== null && um(Y, G, ne, oe, !1),
              ie !== null && Qe !== null && um(Y, Qe, ie, oe, !0));
          }
        }
        e: {
          if (
            ((G = $ ? zs($) : window),
            (ne = G.nodeName && G.nodeName.toLowerCase()),
            ne === "select" || (ne === "input" && G.type === "file"))
          )
            var le = Ux;
          else if (Up(G))
            if (Wp) le = Kx;
            else {
              le = Wx;
              var de = Vx;
            }
          else
            (ne = G.nodeName) &&
              ne.toLowerCase() === "input" &&
              (G.type === "checkbox" || G.type === "radio") &&
              (le = Hx);
          if (le && (le = le(r, $))) {
            Vp(Y, le, a, q);
            break e;
          }
          (de && de(r, G, $),
            r === "focusout" &&
              (de = G._wrapperState) &&
              de.controlled &&
              G.type === "number" &&
              $u(G, "number", G.value));
        }
        switch (((de = $ ? zs($) : window), r)) {
          case "focusin":
            (Up(de) || de.contentEditable === "true") &&
              ((Ds = de), (pc = $), (Xi = null));
            break;
          case "focusout":
            Xi = pc = Ds = null;
            break;
          case "mousedown":
            mc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((mc = !1), Zp(Y, a, q));
            break;
          case "selectionchange":
            if (Qx) break;
          case "keydown":
          case "keyup":
            Zp(Y, a, q);
        }
        var fe;
        if (cc)
          e: {
            switch (r) {
              case "compositionstart":
                var me = "onCompositionStart";
                break e;
              case "compositionend":
                me = "onCompositionEnd";
                break e;
              case "compositionupdate":
                me = "onCompositionUpdate";
                break e;
            }
            me = void 0;
          }
        else
          Ps
            ? zp(r, a) && (me = "onCompositionEnd")
            : r === "keydown" &&
              a.keyCode === 229 &&
              (me = "onCompositionStart");
        (me &&
          (Lp &&
            a.locale !== "ko" &&
            (Ps || me !== "onCompositionStart"
              ? me === "onCompositionEnd" && Ps && (fe = Rp())
              : ((fr = q),
                (sc = "value" in fr ? fr.value : fr.textContent),
                (Ps = !0))),
          (de = ka($, me)),
          0 < de.length &&
            ((me = new Pp(me, r, null, a, q)),
            Y.push({ event: me, listeners: de }),
            fe
              ? (me.data = fe)
              : ((fe = Fp(a)), fe !== null && (me.data = fe)))),
          (fe = Lx ? Bx(r, a) : $x(r, a)) &&
            (($ = ka($, "onBeforeInput")),
            0 < $.length &&
              ((q = new Pp("onBeforeInput", "beforeinput", null, a, q)),
              Y.push({ event: q, listeners: $ }),
              (q.data = fe))));
      }
      am(Y, s);
    });
  }
  function eo(r, s, a) {
    return { instance: r, listener: s, currentTarget: a };
  }
  function ka(r, s) {
    for (var a = s + "Capture", c = []; r !== null; ) {
      var h = r,
        p = h.stateNode;
      (h.tag === 5 &&
        p !== null &&
        ((h = p),
        (p = Pi(r, a)),
        p != null && c.unshift(eo(r, p, h)),
        (p = Pi(r, s)),
        p != null && c.push(eo(r, p, h))),
        (r = r.return));
    }
    return c;
  }
  function Bs(r) {
    if (r === null) return null;
    do r = r.return;
    while (r && r.tag !== 5);
    return r || null;
  }
  function um(r, s, a, c, h) {
    for (var p = s._reactName, b = []; a !== null && a !== c; ) {
      var I = a,
        j = I.alternate,
        $ = I.stateNode;
      if (j !== null && j === c) break;
      (I.tag === 5 &&
        $ !== null &&
        ((I = $),
        h
          ? ((j = Pi(a, p)), j != null && b.unshift(eo(a, j, I)))
          : h || ((j = Pi(a, p)), j != null && b.push(eo(a, j, I)))),
        (a = a.return));
    }
    b.length !== 0 && r.push({ event: s, listeners: b });
  }
  var Jx = /\r\n?/g,
    e1 = /\u0000|\uFFFD/g;
  function cm(r) {
    return (typeof r == "string" ? r : "" + r)
      .replace(
        Jx,
        `
`,
      )
      .replace(e1, "");
  }
  function Oa(r, s, a) {
    if (((s = cm(s)), cm(r) !== s && a)) throw Error(n(425));
  }
  function Ta() {}
  var Sc = null,
    Ec = null;
  function xc(r, s) {
    return (
      r === "textarea" ||
      r === "noscript" ||
      typeof s.children == "string" ||
      typeof s.children == "number" ||
      (typeof s.dangerouslySetInnerHTML == "object" &&
        s.dangerouslySetInnerHTML !== null &&
        s.dangerouslySetInnerHTML.__html != null)
    );
  }
  var Cc = typeof setTimeout == "function" ? setTimeout : void 0,
    t1 = typeof clearTimeout == "function" ? clearTimeout : void 0,
    dm = typeof Promise == "function" ? Promise : void 0,
    n1 =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof dm < "u"
          ? function (r) {
              return dm.resolve(null).then(r).catch(r1);
            }
          : Cc;
  function r1(r) {
    setTimeout(function () {
      throw r;
    });
  }
  function kc(r, s) {
    var a = s,
      c = 0;
    do {
      var h = a.nextSibling;
      if ((r.removeChild(a), h && h.nodeType === 8))
        if (((a = h.data), a === "/$")) {
          if (c === 0) {
            (r.removeChild(h), Wi(s));
            return;
          }
          c--;
        } else (a !== "$" && a !== "$?" && a !== "$!") || c++;
      a = h;
    } while (a);
    Wi(s);
  }
  function pr(r) {
    for (; r != null; r = r.nextSibling) {
      var s = r.nodeType;
      if (s === 1 || s === 3) break;
      if (s === 8) {
        if (((s = r.data), s === "$" || s === "$!" || s === "$?")) break;
        if (s === "/$") return null;
      }
    }
    return r;
  }
  function fm(r) {
    r = r.previousSibling;
    for (var s = 0; r; ) {
      if (r.nodeType === 8) {
        var a = r.data;
        if (a === "$" || a === "$!" || a === "$?") {
          if (s === 0) return r;
          s--;
        } else a === "/$" && s++;
      }
      r = r.previousSibling;
    }
    return null;
  }
  var $s = Math.random().toString(36).slice(2),
    In = "__reactFiber$" + $s,
    to = "__reactProps$" + $s,
    Un = "__reactContainer$" + $s,
    Oc = "__reactEvents$" + $s,
    s1 = "__reactListeners$" + $s,
    i1 = "__reactHandles$" + $s;
  function Gr(r) {
    var s = r[In];
    if (s) return s;
    for (var a = r.parentNode; a; ) {
      if ((s = a[Un] || a[In])) {
        if (
          ((a = s.alternate),
          s.child !== null || (a !== null && a.child !== null))
        )
          for (r = fm(r); r !== null; ) {
            if ((a = r[In])) return a;
            r = fm(r);
          }
        return s;
      }
      ((r = a), (a = r.parentNode));
    }
    return null;
  }
  function no(r) {
    return (
      (r = r[In] || r[Un]),
      !r || (r.tag !== 5 && r.tag !== 6 && r.tag !== 13 && r.tag !== 3)
        ? null
        : r
    );
  }
  function zs(r) {
    if (r.tag === 5 || r.tag === 6) return r.stateNode;
    throw Error(n(33));
  }
  function Ia(r) {
    return r[to] || null;
  }
  var Tc = [],
    Fs = -1;
  function mr(r) {
    return { current: r };
  }
  function Be(r) {
    0 > Fs || ((r.current = Tc[Fs]), (Tc[Fs] = null), Fs--);
  }
  function _e(r, s) {
    (Fs++, (Tc[Fs] = r.current), (r.current = s));
  }
  var gr = {},
    gt = mr(gr),
    jt = mr(!1),
    qr = gr;
  function Us(r, s) {
    var a = r.type.contextTypes;
    if (!a) return gr;
    var c = r.stateNode;
    if (c && c.__reactInternalMemoizedUnmaskedChildContext === s)
      return c.__reactInternalMemoizedMaskedChildContext;
    var h = {},
      p;
    for (p in a) h[p] = s[p];
    return (
      c &&
        ((r = r.stateNode),
        (r.__reactInternalMemoizedUnmaskedChildContext = s),
        (r.__reactInternalMemoizedMaskedChildContext = h)),
      h
    );
  }
  function Rt(r) {
    return ((r = r.childContextTypes), r != null);
  }
  function Ma() {
    (Be(jt), Be(gt));
  }
  function hm(r, s, a) {
    if (gt.current !== gr) throw Error(n(168));
    (_e(gt, s), _e(jt, a));
  }
  function pm(r, s, a) {
    var c = r.stateNode;
    if (((s = s.childContextTypes), typeof c.getChildContext != "function"))
      return a;
    c = c.getChildContext();
    for (var h in c) if (!(h in s)) throw Error(n(108, ve(r) || "Unknown", h));
    return Z({}, a, c);
  }
  function Aa(r) {
    return (
      (r =
        ((r = r.stateNode) && r.__reactInternalMemoizedMergedChildContext) ||
        gr),
      (qr = gt.current),
      _e(gt, r),
      _e(jt, jt.current),
      !0
    );
  }
  function mm(r, s, a) {
    var c = r.stateNode;
    if (!c) throw Error(n(169));
    (a
      ? ((r = pm(r, s, qr)),
        (c.__reactInternalMemoizedMergedChildContext = r),
        Be(jt),
        Be(gt),
        _e(gt, r))
      : Be(jt),
      _e(jt, a));
  }
  var Vn = null,
    ja = !1,
    Ic = !1;
  function gm(r) {
    Vn === null ? (Vn = [r]) : Vn.push(r);
  }
  function o1(r) {
    ((ja = !0), gm(r));
  }
  function yr() {
    if (!Ic && Vn !== null) {
      Ic = !0;
      var r = 0,
        s = je;
      try {
        var a = Vn;
        for (je = 1; r < a.length; r++) {
          var c = a[r];
          do c = c(!0);
          while (c !== null);
        }
        ((Vn = null), (ja = !1));
      } catch (h) {
        throw (Vn !== null && (Vn = Vn.slice(r + 1)), vp(Yu, yr), h);
      } finally {
        ((je = s), (Ic = !1));
      }
    }
    return null;
  }
  var Vs = [],
    Ws = 0,
    Ra = null,
    _a = 0,
    Jt = [],
    en = 0,
    Qr = null,
    Wn = 1,
    Hn = "";
  function Yr(r, s) {
    ((Vs[Ws++] = _a), (Vs[Ws++] = Ra), (Ra = r), (_a = s));
  }
  function ym(r, s, a) {
    ((Jt[en++] = Wn), (Jt[en++] = Hn), (Jt[en++] = Qr), (Qr = r));
    var c = Wn;
    r = Hn;
    var h = 32 - dn(c) - 1;
    ((c &= ~(1 << h)), (a += 1));
    var p = 32 - dn(s) + h;
    if (30 < p) {
      var b = h - (h % 5);
      ((p = (c & ((1 << b) - 1)).toString(32)),
        (c >>= b),
        (h -= b),
        (Wn = (1 << (32 - dn(s) + h)) | (a << h) | c),
        (Hn = p + r));
    } else ((Wn = (1 << p) | (a << h) | c), (Hn = r));
  }
  function Mc(r) {
    r.return !== null && (Yr(r, 1), ym(r, 1, 0));
  }
  function Ac(r) {
    for (; r === Ra; )
      ((Ra = Vs[--Ws]), (Vs[Ws] = null), (_a = Vs[--Ws]), (Vs[Ws] = null));
    for (; r === Qr; )
      ((Qr = Jt[--en]),
        (Jt[en] = null),
        (Hn = Jt[--en]),
        (Jt[en] = null),
        (Wn = Jt[--en]),
        (Jt[en] = null));
  }
  var Wt = null,
    Ht = null,
    Fe = !1,
    hn = null;
  function vm(r, s) {
    var a = sn(5, null, null, 0);
    ((a.elementType = "DELETED"),
      (a.stateNode = s),
      (a.return = r),
      (s = r.deletions),
      s === null ? ((r.deletions = [a]), (r.flags |= 16)) : s.push(a));
  }
  function wm(r, s) {
    switch (r.tag) {
      case 5:
        var a = r.type;
        return (
          (s =
            s.nodeType !== 1 || a.toLowerCase() !== s.nodeName.toLowerCase()
              ? null
              : s),
          s !== null
            ? ((r.stateNode = s), (Wt = r), (Ht = pr(s.firstChild)), !0)
            : !1
        );
      case 6:
        return (
          (s = r.pendingProps === "" || s.nodeType !== 3 ? null : s),
          s !== null ? ((r.stateNode = s), (Wt = r), (Ht = null), !0) : !1
        );
      case 13:
        return (
          (s = s.nodeType !== 8 ? null : s),
          s !== null
            ? ((a = Qr !== null ? { id: Wn, overflow: Hn } : null),
              (r.memoizedState = {
                dehydrated: s,
                treeContext: a,
                retryLane: 1073741824,
              }),
              (a = sn(18, null, null, 0)),
              (a.stateNode = s),
              (a.return = r),
              (r.child = a),
              (Wt = r),
              (Ht = null),
              !0)
            : !1
        );
      default:
        return !1;
    }
  }
  function jc(r) {
    return (r.mode & 1) !== 0 && (r.flags & 128) === 0;
  }
  function Rc(r) {
    if (Fe) {
      var s = Ht;
      if (s) {
        var a = s;
        if (!wm(r, s)) {
          if (jc(r)) throw Error(n(418));
          s = pr(a.nextSibling);
          var c = Wt;
          s && wm(r, s)
            ? vm(c, a)
            : ((r.flags = (r.flags & -4097) | 2), (Fe = !1), (Wt = r));
        }
      } else {
        if (jc(r)) throw Error(n(418));
        ((r.flags = (r.flags & -4097) | 2), (Fe = !1), (Wt = r));
      }
    }
  }
  function bm(r) {
    for (
      r = r.return;
      r !== null && r.tag !== 5 && r.tag !== 3 && r.tag !== 13;
    )
      r = r.return;
    Wt = r;
  }
  function Na(r) {
    if (r !== Wt) return !1;
    if (!Fe) return (bm(r), (Fe = !0), !1);
    var s;
    if (
      ((s = r.tag !== 3) &&
        !(s = r.tag !== 5) &&
        ((s = r.type),
        (s = s !== "head" && s !== "body" && !xc(r.type, r.memoizedProps))),
      s && (s = Ht))
    ) {
      if (jc(r)) throw (Sm(), Error(n(418)));
      for (; s; ) (vm(r, s), (s = pr(s.nextSibling)));
    }
    if ((bm(r), r.tag === 13)) {
      if (((r = r.memoizedState), (r = r !== null ? r.dehydrated : null), !r))
        throw Error(n(317));
      e: {
        for (r = r.nextSibling, s = 0; r; ) {
          if (r.nodeType === 8) {
            var a = r.data;
            if (a === "/$") {
              if (s === 0) {
                Ht = pr(r.nextSibling);
                break e;
              }
              s--;
            } else (a !== "$" && a !== "$!" && a !== "$?") || s++;
          }
          r = r.nextSibling;
        }
        Ht = null;
      }
    } else Ht = Wt ? pr(r.stateNode.nextSibling) : null;
    return !0;
  }
  function Sm() {
    for (var r = Ht; r; ) r = pr(r.nextSibling);
  }
  function Hs() {
    ((Ht = Wt = null), (Fe = !1));
  }
  function _c(r) {
    hn === null ? (hn = [r]) : hn.push(r);
  }
  var a1 = R.ReactCurrentBatchConfig;
  function ro(r, s, a) {
    if (
      ((r = a.ref),
      r !== null && typeof r != "function" && typeof r != "object")
    ) {
      if (a._owner) {
        if (((a = a._owner), a)) {
          if (a.tag !== 1) throw Error(n(309));
          var c = a.stateNode;
        }
        if (!c) throw Error(n(147, r));
        var h = c,
          p = "" + r;
        return s !== null &&
          s.ref !== null &&
          typeof s.ref == "function" &&
          s.ref._stringRef === p
          ? s.ref
          : ((s = function (b) {
              var I = h.refs;
              b === null ? delete I[p] : (I[p] = b);
            }),
            (s._stringRef = p),
            s);
      }
      if (typeof r != "string") throw Error(n(284));
      if (!a._owner) throw Error(n(290, r));
    }
    return r;
  }
  function Pa(r, s) {
    throw (
      (r = Object.prototype.toString.call(s)),
      Error(
        n(
          31,
          r === "[object Object]"
            ? "object with keys {" + Object.keys(s).join(", ") + "}"
            : r,
        ),
      )
    );
  }
  function Em(r) {
    var s = r._init;
    return s(r._payload);
  }
  function xm(r) {
    function s(D, _) {
      if (r) {
        var L = D.deletions;
        L === null ? ((D.deletions = [_]), (D.flags |= 16)) : L.push(_);
      }
    }
    function a(D, _) {
      if (!r) return null;
      for (; _ !== null; ) (s(D, _), (_ = _.sibling));
      return null;
    }
    function c(D, _) {
      for (D = new Map(); _ !== null; )
        (_.key !== null ? D.set(_.key, _) : D.set(_.index, _), (_ = _.sibling));
      return D;
    }
    function h(D, _) {
      return ((D = kr(D, _)), (D.index = 0), (D.sibling = null), D);
    }
    function p(D, _, L) {
      return (
        (D.index = L),
        r
          ? ((L = D.alternate),
            L !== null
              ? ((L = L.index), L < _ ? ((D.flags |= 2), _) : L)
              : ((D.flags |= 2), _))
          : ((D.flags |= 1048576), _)
      );
    }
    function b(D) {
      return (r && D.alternate === null && (D.flags |= 2), D);
    }
    function I(D, _, L, X) {
      return _ === null || _.tag !== 6
        ? ((_ = Cd(L, D.mode, X)), (_.return = D), _)
        : ((_ = h(_, L)), (_.return = D), _);
    }
    function j(D, _, L, X) {
      var le = L.type;
      return le === U
        ? q(D, _, L.props.children, X, L.key)
        : _ !== null &&
            (_.elementType === le ||
              (typeof le == "object" &&
                le !== null &&
                le.$$typeof === ue &&
                Em(le) === _.type))
          ? ((X = h(_, L.props)), (X.ref = ro(D, _, L)), (X.return = D), X)
          : ((X = il(L.type, L.key, L.props, null, D.mode, X)),
            (X.ref = ro(D, _, L)),
            (X.return = D),
            X);
    }
    function $(D, _, L, X) {
      return _ === null ||
        _.tag !== 4 ||
        _.stateNode.containerInfo !== L.containerInfo ||
        _.stateNode.implementation !== L.implementation
        ? ((_ = kd(L, D.mode, X)), (_.return = D), _)
        : ((_ = h(_, L.children || [])), (_.return = D), _);
    }
    function q(D, _, L, X, le) {
      return _ === null || _.tag !== 7
        ? ((_ = ss(L, D.mode, X, le)), (_.return = D), _)
        : ((_ = h(_, L)), (_.return = D), _);
    }
    function Y(D, _, L) {
      if ((typeof _ == "string" && _ !== "") || typeof _ == "number")
        return ((_ = Cd("" + _, D.mode, L)), (_.return = D), _);
      if (typeof _ == "object" && _ !== null) {
        switch (_.$$typeof) {
          case P:
            return (
              (L = il(_.type, _.key, _.props, null, D.mode, L)),
              (L.ref = ro(D, null, _)),
              (L.return = D),
              L
            );
          case V:
            return ((_ = kd(_, D.mode, L)), (_.return = D), _);
          case ue:
            var X = _._init;
            return Y(D, X(_._payload), L);
        }
        if (Ri(_) || W(_))
          return ((_ = ss(_, D.mode, L, null)), (_.return = D), _);
        Pa(D, _);
      }
      return null;
    }
    function G(D, _, L, X) {
      var le = _ !== null ? _.key : null;
      if ((typeof L == "string" && L !== "") || typeof L == "number")
        return le !== null ? null : I(D, _, "" + L, X);
      if (typeof L == "object" && L !== null) {
        switch (L.$$typeof) {
          case P:
            return L.key === le ? j(D, _, L, X) : null;
          case V:
            return L.key === le ? $(D, _, L, X) : null;
          case ue:
            return ((le = L._init), G(D, _, le(L._payload), X));
        }
        if (Ri(L) || W(L)) return le !== null ? null : q(D, _, L, X, null);
        Pa(D, L);
      }
      return null;
    }
    function ne(D, _, L, X, le) {
      if ((typeof X == "string" && X !== "") || typeof X == "number")
        return ((D = D.get(L) || null), I(_, D, "" + X, le));
      if (typeof X == "object" && X !== null) {
        switch (X.$$typeof) {
          case P:
            return (
              (D = D.get(X.key === null ? L : X.key) || null),
              j(_, D, X, le)
            );
          case V:
            return (
              (D = D.get(X.key === null ? L : X.key) || null),
              $(_, D, X, le)
            );
          case ue:
            var de = X._init;
            return ne(D, _, L, de(X._payload), le);
        }
        if (Ri(X) || W(X))
          return ((D = D.get(L) || null), q(_, D, X, le, null));
        Pa(_, X);
      }
      return null;
    }
    function ie(D, _, L, X) {
      for (
        var le = null, de = null, fe = _, me = (_ = 0), at = null;
        fe !== null && me < L.length;
        me++
      ) {
        fe.index > me ? ((at = fe), (fe = null)) : (at = fe.sibling);
        var Me = G(D, fe, L[me], X);
        if (Me === null) {
          fe === null && (fe = at);
          break;
        }
        (r && fe && Me.alternate === null && s(D, fe),
          (_ = p(Me, _, me)),
          de === null ? (le = Me) : (de.sibling = Me),
          (de = Me),
          (fe = at));
      }
      if (me === L.length) return (a(D, fe), Fe && Yr(D, me), le);
      if (fe === null) {
        for (; me < L.length; me++)
          ((fe = Y(D, L[me], X)),
            fe !== null &&
              ((_ = p(fe, _, me)),
              de === null ? (le = fe) : (de.sibling = fe),
              (de = fe)));
        return (Fe && Yr(D, me), le);
      }
      for (fe = c(D, fe); me < L.length; me++)
        ((at = ne(fe, D, me, L[me], X)),
          at !== null &&
            (r &&
              at.alternate !== null &&
              fe.delete(at.key === null ? me : at.key),
            (_ = p(at, _, me)),
            de === null ? (le = at) : (de.sibling = at),
            (de = at)));
      return (
        r &&
          fe.forEach(function (Or) {
            return s(D, Or);
          }),
        Fe && Yr(D, me),
        le
      );
    }
    function oe(D, _, L, X) {
      var le = W(L);
      if (typeof le != "function") throw Error(n(150));
      if (((L = le.call(L)), L == null)) throw Error(n(151));
      for (
        var de = (le = null), fe = _, me = (_ = 0), at = null, Me = L.next();
        fe !== null && !Me.done;
        me++, Me = L.next()
      ) {
        fe.index > me ? ((at = fe), (fe = null)) : (at = fe.sibling);
        var Or = G(D, fe, Me.value, X);
        if (Or === null) {
          fe === null && (fe = at);
          break;
        }
        (r && fe && Or.alternate === null && s(D, fe),
          (_ = p(Or, _, me)),
          de === null ? (le = Or) : (de.sibling = Or),
          (de = Or),
          (fe = at));
      }
      if (Me.done) return (a(D, fe), Fe && Yr(D, me), le);
      if (fe === null) {
        for (; !Me.done; me++, Me = L.next())
          ((Me = Y(D, Me.value, X)),
            Me !== null &&
              ((_ = p(Me, _, me)),
              de === null ? (le = Me) : (de.sibling = Me),
              (de = Me)));
        return (Fe && Yr(D, me), le);
      }
      for (fe = c(D, fe); !Me.done; me++, Me = L.next())
        ((Me = ne(fe, D, me, Me.value, X)),
          Me !== null &&
            (r &&
              Me.alternate !== null &&
              fe.delete(Me.key === null ? me : Me.key),
            (_ = p(Me, _, me)),
            de === null ? (le = Me) : (de.sibling = Me),
            (de = Me)));
      return (
        r &&
          fe.forEach(function (z1) {
            return s(D, z1);
          }),
        Fe && Yr(D, me),
        le
      );
    }
    function Qe(D, _, L, X) {
      if (
        (typeof L == "object" &&
          L !== null &&
          L.type === U &&
          L.key === null &&
          (L = L.props.children),
        typeof L == "object" && L !== null)
      ) {
        switch (L.$$typeof) {
          case P:
            e: {
              for (var le = L.key, de = _; de !== null; ) {
                if (de.key === le) {
                  if (((le = L.type), le === U)) {
                    if (de.tag === 7) {
                      (a(D, de.sibling),
                        (_ = h(de, L.props.children)),
                        (_.return = D),
                        (D = _));
                      break e;
                    }
                  } else if (
                    de.elementType === le ||
                    (typeof le == "object" &&
                      le !== null &&
                      le.$$typeof === ue &&
                      Em(le) === de.type)
                  ) {
                    (a(D, de.sibling),
                      (_ = h(de, L.props)),
                      (_.ref = ro(D, de, L)),
                      (_.return = D),
                      (D = _));
                    break e;
                  }
                  a(D, de);
                  break;
                } else s(D, de);
                de = de.sibling;
              }
              L.type === U
                ? ((_ = ss(L.props.children, D.mode, X, L.key)),
                  (_.return = D),
                  (D = _))
                : ((X = il(L.type, L.key, L.props, null, D.mode, X)),
                  (X.ref = ro(D, _, L)),
                  (X.return = D),
                  (D = X));
            }
            return b(D);
          case V:
            e: {
              for (de = L.key; _ !== null; ) {
                if (_.key === de)
                  if (
                    _.tag === 4 &&
                    _.stateNode.containerInfo === L.containerInfo &&
                    _.stateNode.implementation === L.implementation
                  ) {
                    (a(D, _.sibling),
                      (_ = h(_, L.children || [])),
                      (_.return = D),
                      (D = _));
                    break e;
                  } else {
                    a(D, _);
                    break;
                  }
                else s(D, _);
                _ = _.sibling;
              }
              ((_ = kd(L, D.mode, X)), (_.return = D), (D = _));
            }
            return b(D);
          case ue:
            return ((de = L._init), Qe(D, _, de(L._payload), X));
        }
        if (Ri(L)) return ie(D, _, L, X);
        if (W(L)) return oe(D, _, L, X);
        Pa(D, L);
      }
      return (typeof L == "string" && L !== "") || typeof L == "number"
        ? ((L = "" + L),
          _ !== null && _.tag === 6
            ? (a(D, _.sibling), (_ = h(_, L)), (_.return = D), (D = _))
            : (a(D, _), (_ = Cd(L, D.mode, X)), (_.return = D), (D = _)),
          b(D))
        : a(D, _);
    }
    return Qe;
  }
  var Ks = xm(!0),
    Cm = xm(!1),
    Da = mr(null),
    La = null,
    Gs = null,
    Nc = null;
  function Pc() {
    Nc = Gs = La = null;
  }
  function Dc(r) {
    var s = Da.current;
    (Be(Da), (r._currentValue = s));
  }
  function Lc(r, s, a) {
    for (; r !== null; ) {
      var c = r.alternate;
      if (
        ((r.childLanes & s) !== s
          ? ((r.childLanes |= s), c !== null && (c.childLanes |= s))
          : c !== null && (c.childLanes & s) !== s && (c.childLanes |= s),
        r === a)
      )
        break;
      r = r.return;
    }
  }
  function qs(r, s) {
    ((La = r),
      (Nc = Gs = null),
      (r = r.dependencies),
      r !== null &&
        r.firstContext !== null &&
        ((r.lanes & s) !== 0 && (_t = !0), (r.firstContext = null)));
  }
  function tn(r) {
    var s = r._currentValue;
    if (Nc !== r)
      if (((r = { context: r, memoizedValue: s, next: null }), Gs === null)) {
        if (La === null) throw Error(n(308));
        ((Gs = r), (La.dependencies = { lanes: 0, firstContext: r }));
      } else Gs = Gs.next = r;
    return s;
  }
  var Xr = null;
  function Bc(r) {
    Xr === null ? (Xr = [r]) : Xr.push(r);
  }
  function km(r, s, a, c) {
    var h = s.interleaved;
    return (
      h === null ? ((a.next = a), Bc(s)) : ((a.next = h.next), (h.next = a)),
      (s.interleaved = a),
      Kn(r, c)
    );
  }
  function Kn(r, s) {
    r.lanes |= s;
    var a = r.alternate;
    for (a !== null && (a.lanes |= s), a = r, r = r.return; r !== null; )
      ((r.childLanes |= s),
        (a = r.alternate),
        a !== null && (a.childLanes |= s),
        (a = r),
        (r = r.return));
    return a.tag === 3 ? a.stateNode : null;
  }
  var vr = !1;
  function $c(r) {
    r.updateQueue = {
      baseState: r.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, interleaved: null, lanes: 0 },
      effects: null,
    };
  }
  function Om(r, s) {
    ((r = r.updateQueue),
      s.updateQueue === r &&
        (s.updateQueue = {
          baseState: r.baseState,
          firstBaseUpdate: r.firstBaseUpdate,
          lastBaseUpdate: r.lastBaseUpdate,
          shared: r.shared,
          effects: r.effects,
        }));
  }
  function Gn(r, s) {
    return {
      eventTime: r,
      lane: s,
      tag: 0,
      payload: null,
      callback: null,
      next: null,
    };
  }
  function wr(r, s, a) {
    var c = r.updateQueue;
    if (c === null) return null;
    if (((c = c.shared), (Te & 2) !== 0)) {
      var h = c.pending;
      return (
        h === null ? (s.next = s) : ((s.next = h.next), (h.next = s)),
        (c.pending = s),
        Kn(r, a)
      );
    }
    return (
      (h = c.interleaved),
      h === null ? ((s.next = s), Bc(c)) : ((s.next = h.next), (h.next = s)),
      (c.interleaved = s),
      Kn(r, a)
    );
  }
  function Ba(r, s, a) {
    if (
      ((s = s.updateQueue), s !== null && ((s = s.shared), (a & 4194240) !== 0))
    ) {
      var c = s.lanes;
      ((c &= r.pendingLanes), (a |= c), (s.lanes = a), Ju(r, a));
    }
  }
  function Tm(r, s) {
    var a = r.updateQueue,
      c = r.alternate;
    if (c !== null && ((c = c.updateQueue), a === c)) {
      var h = null,
        p = null;
      if (((a = a.firstBaseUpdate), a !== null)) {
        do {
          var b = {
            eventTime: a.eventTime,
            lane: a.lane,
            tag: a.tag,
            payload: a.payload,
            callback: a.callback,
            next: null,
          };
          (p === null ? (h = p = b) : (p = p.next = b), (a = a.next));
        } while (a !== null);
        p === null ? (h = p = s) : (p = p.next = s);
      } else h = p = s;
      ((a = {
        baseState: c.baseState,
        firstBaseUpdate: h,
        lastBaseUpdate: p,
        shared: c.shared,
        effects: c.effects,
      }),
        (r.updateQueue = a));
      return;
    }
    ((r = a.lastBaseUpdate),
      r === null ? (a.firstBaseUpdate = s) : (r.next = s),
      (a.lastBaseUpdate = s));
  }
  function $a(r, s, a, c) {
    var h = r.updateQueue;
    vr = !1;
    var p = h.firstBaseUpdate,
      b = h.lastBaseUpdate,
      I = h.shared.pending;
    if (I !== null) {
      h.shared.pending = null;
      var j = I,
        $ = j.next;
      ((j.next = null), b === null ? (p = $) : (b.next = $), (b = j));
      var q = r.alternate;
      q !== null &&
        ((q = q.updateQueue),
        (I = q.lastBaseUpdate),
        I !== b &&
          (I === null ? (q.firstBaseUpdate = $) : (I.next = $),
          (q.lastBaseUpdate = j)));
    }
    if (p !== null) {
      var Y = h.baseState;
      ((b = 0), (q = $ = j = null), (I = p));
      do {
        var G = I.lane,
          ne = I.eventTime;
        if ((c & G) === G) {
          q !== null &&
            (q = q.next =
              {
                eventTime: ne,
                lane: 0,
                tag: I.tag,
                payload: I.payload,
                callback: I.callback,
                next: null,
              });
          e: {
            var ie = r,
              oe = I;
            switch (((G = s), (ne = a), oe.tag)) {
              case 1:
                if (((ie = oe.payload), typeof ie == "function")) {
                  Y = ie.call(ne, Y, G);
                  break e;
                }
                Y = ie;
                break e;
              case 3:
                ie.flags = (ie.flags & -65537) | 128;
              case 0:
                if (
                  ((ie = oe.payload),
                  (G = typeof ie == "function" ? ie.call(ne, Y, G) : ie),
                  G == null)
                )
                  break e;
                Y = Z({}, Y, G);
                break e;
              case 2:
                vr = !0;
            }
          }
          I.callback !== null &&
            I.lane !== 0 &&
            ((r.flags |= 64),
            (G = h.effects),
            G === null ? (h.effects = [I]) : G.push(I));
        } else
          ((ne = {
            eventTime: ne,
            lane: G,
            tag: I.tag,
            payload: I.payload,
            callback: I.callback,
            next: null,
          }),
            q === null ? (($ = q = ne), (j = Y)) : (q = q.next = ne),
            (b |= G));
        if (((I = I.next), I === null)) {
          if (((I = h.shared.pending), I === null)) break;
          ((G = I),
            (I = G.next),
            (G.next = null),
            (h.lastBaseUpdate = G),
            (h.shared.pending = null));
        }
      } while (!0);
      if (
        (q === null && (j = Y),
        (h.baseState = j),
        (h.firstBaseUpdate = $),
        (h.lastBaseUpdate = q),
        (s = h.shared.interleaved),
        s !== null)
      ) {
        h = s;
        do ((b |= h.lane), (h = h.next));
        while (h !== s);
      } else p === null && (h.shared.lanes = 0);
      ((es |= b), (r.lanes = b), (r.memoizedState = Y));
    }
  }
  function Im(r, s, a) {
    if (((r = s.effects), (s.effects = null), r !== null))
      for (s = 0; s < r.length; s++) {
        var c = r[s],
          h = c.callback;
        if (h !== null) {
          if (((c.callback = null), (c = a), typeof h != "function"))
            throw Error(n(191, h));
          h.call(c);
        }
      }
  }
  var so = {},
    Mn = mr(so),
    io = mr(so),
    oo = mr(so);
  function Zr(r) {
    if (r === so) throw Error(n(174));
    return r;
  }
  function zc(r, s) {
    switch ((_e(oo, s), _e(io, r), _e(Mn, so), (r = s.nodeType), r)) {
      case 9:
      case 11:
        s = (s = s.documentElement) ? s.namespaceURI : Fu(null, "");
        break;
      default:
        ((r = r === 8 ? s.parentNode : s),
          (s = r.namespaceURI || null),
          (r = r.tagName),
          (s = Fu(s, r)));
    }
    (Be(Mn), _e(Mn, s));
  }
  function Qs() {
    (Be(Mn), Be(io), Be(oo));
  }
  function Mm(r) {
    Zr(oo.current);
    var s = Zr(Mn.current),
      a = Fu(s, r.type);
    s !== a && (_e(io, r), _e(Mn, a));
  }
  function Fc(r) {
    io.current === r && (Be(Mn), Be(io));
  }
  var Ue = mr(0);
  function za(r) {
    for (var s = r; s !== null; ) {
      if (s.tag === 13) {
        var a = s.memoizedState;
        if (
          a !== null &&
          ((a = a.dehydrated), a === null || a.data === "$?" || a.data === "$!")
        )
          return s;
      } else if (s.tag === 19 && s.memoizedProps.revealOrder !== void 0) {
        if ((s.flags & 128) !== 0) return s;
      } else if (s.child !== null) {
        ((s.child.return = s), (s = s.child));
        continue;
      }
      if (s === r) break;
      for (; s.sibling === null; ) {
        if (s.return === null || s.return === r) return null;
        s = s.return;
      }
      ((s.sibling.return = s.return), (s = s.sibling));
    }
    return null;
  }
  var Uc = [];
  function Vc() {
    for (var r = 0; r < Uc.length; r++)
      Uc[r]._workInProgressVersionPrimary = null;
    Uc.length = 0;
  }
  var Fa = R.ReactCurrentDispatcher,
    Wc = R.ReactCurrentBatchConfig,
    Jr = 0,
    Ve = null,
    Xe = null,
    it = null,
    Ua = !1,
    ao = !1,
    lo = 0,
    l1 = 0;
  function yt() {
    throw Error(n(321));
  }
  function Hc(r, s) {
    if (s === null) return !1;
    for (var a = 0; a < s.length && a < r.length; a++)
      if (!fn(r[a], s[a])) return !1;
    return !0;
  }
  function Kc(r, s, a, c, h, p) {
    if (
      ((Jr = p),
      (Ve = s),
      (s.memoizedState = null),
      (s.updateQueue = null),
      (s.lanes = 0),
      (Fa.current = r === null || r.memoizedState === null ? f1 : h1),
      (r = a(c, h)),
      ao)
    ) {
      p = 0;
      do {
        if (((ao = !1), (lo = 0), 25 <= p)) throw Error(n(301));
        ((p += 1),
          (it = Xe = null),
          (s.updateQueue = null),
          (Fa.current = p1),
          (r = a(c, h)));
      } while (ao);
    }
    if (
      ((Fa.current = Ha),
      (s = Xe !== null && Xe.next !== null),
      (Jr = 0),
      (it = Xe = Ve = null),
      (Ua = !1),
      s)
    )
      throw Error(n(300));
    return r;
  }
  function Gc() {
    var r = lo !== 0;
    return ((lo = 0), r);
  }
  function An() {
    var r = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return (it === null ? (Ve.memoizedState = it = r) : (it = it.next = r), it);
  }
  function nn() {
    if (Xe === null) {
      var r = Ve.alternate;
      r = r !== null ? r.memoizedState : null;
    } else r = Xe.next;
    var s = it === null ? Ve.memoizedState : it.next;
    if (s !== null) ((it = s), (Xe = r));
    else {
      if (r === null) throw Error(n(310));
      ((Xe = r),
        (r = {
          memoizedState: Xe.memoizedState,
          baseState: Xe.baseState,
          baseQueue: Xe.baseQueue,
          queue: Xe.queue,
          next: null,
        }),
        it === null ? (Ve.memoizedState = it = r) : (it = it.next = r));
    }
    return it;
  }
  function uo(r, s) {
    return typeof s == "function" ? s(r) : s;
  }
  function qc(r) {
    var s = nn(),
      a = s.queue;
    if (a === null) throw Error(n(311));
    a.lastRenderedReducer = r;
    var c = Xe,
      h = c.baseQueue,
      p = a.pending;
    if (p !== null) {
      if (h !== null) {
        var b = h.next;
        ((h.next = p.next), (p.next = b));
      }
      ((c.baseQueue = h = p), (a.pending = null));
    }
    if (h !== null) {
      ((p = h.next), (c = c.baseState));
      var I = (b = null),
        j = null,
        $ = p;
      do {
        var q = $.lane;
        if ((Jr & q) === q)
          (j !== null &&
            (j = j.next =
              {
                lane: 0,
                action: $.action,
                hasEagerState: $.hasEagerState,
                eagerState: $.eagerState,
                next: null,
              }),
            (c = $.hasEagerState ? $.eagerState : r(c, $.action)));
        else {
          var Y = {
            lane: q,
            action: $.action,
            hasEagerState: $.hasEagerState,
            eagerState: $.eagerState,
            next: null,
          };
          (j === null ? ((I = j = Y), (b = c)) : (j = j.next = Y),
            (Ve.lanes |= q),
            (es |= q));
        }
        $ = $.next;
      } while ($ !== null && $ !== p);
      (j === null ? (b = c) : (j.next = I),
        fn(c, s.memoizedState) || (_t = !0),
        (s.memoizedState = c),
        (s.baseState = b),
        (s.baseQueue = j),
        (a.lastRenderedState = c));
    }
    if (((r = a.interleaved), r !== null)) {
      h = r;
      do ((p = h.lane), (Ve.lanes |= p), (es |= p), (h = h.next));
      while (h !== r);
    } else h === null && (a.lanes = 0);
    return [s.memoizedState, a.dispatch];
  }
  function Qc(r) {
    var s = nn(),
      a = s.queue;
    if (a === null) throw Error(n(311));
    a.lastRenderedReducer = r;
    var c = a.dispatch,
      h = a.pending,
      p = s.memoizedState;
    if (h !== null) {
      a.pending = null;
      var b = (h = h.next);
      do ((p = r(p, b.action)), (b = b.next));
      while (b !== h);
      (fn(p, s.memoizedState) || (_t = !0),
        (s.memoizedState = p),
        s.baseQueue === null && (s.baseState = p),
        (a.lastRenderedState = p));
    }
    return [p, c];
  }
  function Am() {}
  function jm(r, s) {
    var a = Ve,
      c = nn(),
      h = s(),
      p = !fn(c.memoizedState, h);
    if (
      (p && ((c.memoizedState = h), (_t = !0)),
      (c = c.queue),
      Yc(Nm.bind(null, a, c, r), [r]),
      c.getSnapshot !== s || p || (it !== null && it.memoizedState.tag & 1))
    ) {
      if (
        ((a.flags |= 2048),
        co(9, _m.bind(null, a, c, h, s), void 0, null),
        ot === null)
      )
        throw Error(n(349));
      (Jr & 30) !== 0 || Rm(a, s, h);
    }
    return h;
  }
  function Rm(r, s, a) {
    ((r.flags |= 16384),
      (r = { getSnapshot: s, value: a }),
      (s = Ve.updateQueue),
      s === null
        ? ((s = { lastEffect: null, stores: null }),
          (Ve.updateQueue = s),
          (s.stores = [r]))
        : ((a = s.stores), a === null ? (s.stores = [r]) : a.push(r)));
  }
  function _m(r, s, a, c) {
    ((s.value = a), (s.getSnapshot = c), Pm(s) && Dm(r));
  }
  function Nm(r, s, a) {
    return a(function () {
      Pm(s) && Dm(r);
    });
  }
  function Pm(r) {
    var s = r.getSnapshot;
    r = r.value;
    try {
      var a = s();
      return !fn(r, a);
    } catch {
      return !0;
    }
  }
  function Dm(r) {
    var s = Kn(r, 1);
    s !== null && yn(s, r, 1, -1);
  }
  function Lm(r) {
    var s = An();
    return (
      typeof r == "function" && (r = r()),
      (s.memoizedState = s.baseState = r),
      (r = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: uo,
        lastRenderedState: r,
      }),
      (s.queue = r),
      (r = r.dispatch = d1.bind(null, Ve, r)),
      [s.memoizedState, r]
    );
  }
  function co(r, s, a, c) {
    return (
      (r = { tag: r, create: s, destroy: a, deps: c, next: null }),
      (s = Ve.updateQueue),
      s === null
        ? ((s = { lastEffect: null, stores: null }),
          (Ve.updateQueue = s),
          (s.lastEffect = r.next = r))
        : ((a = s.lastEffect),
          a === null
            ? (s.lastEffect = r.next = r)
            : ((c = a.next), (a.next = r), (r.next = c), (s.lastEffect = r))),
      r
    );
  }
  function Bm() {
    return nn().memoizedState;
  }
  function Va(r, s, a, c) {
    var h = An();
    ((Ve.flags |= r),
      (h.memoizedState = co(1 | s, a, void 0, c === void 0 ? null : c)));
  }
  function Wa(r, s, a, c) {
    var h = nn();
    c = c === void 0 ? null : c;
    var p = void 0;
    if (Xe !== null) {
      var b = Xe.memoizedState;
      if (((p = b.destroy), c !== null && Hc(c, b.deps))) {
        h.memoizedState = co(s, a, p, c);
        return;
      }
    }
    ((Ve.flags |= r), (h.memoizedState = co(1 | s, a, p, c)));
  }
  function $m(r, s) {
    return Va(8390656, 8, r, s);
  }
  function Yc(r, s) {
    return Wa(2048, 8, r, s);
  }
  function zm(r, s) {
    return Wa(4, 2, r, s);
  }
  function Fm(r, s) {
    return Wa(4, 4, r, s);
  }
  function Um(r, s) {
    if (typeof s == "function")
      return (
        (r = r()),
        s(r),
        function () {
          s(null);
        }
      );
    if (s != null)
      return (
        (r = r()),
        (s.current = r),
        function () {
          s.current = null;
        }
      );
  }
  function Vm(r, s, a) {
    return (
      (a = a != null ? a.concat([r]) : null),
      Wa(4, 4, Um.bind(null, s, r), a)
    );
  }
  function Xc() {}
  function Wm(r, s) {
    var a = nn();
    s = s === void 0 ? null : s;
    var c = a.memoizedState;
    return c !== null && s !== null && Hc(s, c[1])
      ? c[0]
      : ((a.memoizedState = [r, s]), r);
  }
  function Hm(r, s) {
    var a = nn();
    s = s === void 0 ? null : s;
    var c = a.memoizedState;
    return c !== null && s !== null && Hc(s, c[1])
      ? c[0]
      : ((r = r()), (a.memoizedState = [r, s]), r);
  }
  function Km(r, s, a) {
    return (Jr & 21) === 0
      ? (r.baseState && ((r.baseState = !1), (_t = !0)), (r.memoizedState = a))
      : (fn(a, s) ||
          ((a = Ep()), (Ve.lanes |= a), (es |= a), (r.baseState = !0)),
        s);
  }
  function u1(r, s) {
    var a = je;
    ((je = a !== 0 && 4 > a ? a : 4), r(!0));
    var c = Wc.transition;
    Wc.transition = {};
    try {
      (r(!1), s());
    } finally {
      ((je = a), (Wc.transition = c));
    }
  }
  function Gm() {
    return nn().memoizedState;
  }
  function c1(r, s, a) {
    var c = xr(r);
    if (
      ((a = {
        lane: c,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      qm(r))
    )
      Qm(s, a);
    else if (((a = km(r, s, a, c)), a !== null)) {
      var h = Ot();
      (yn(a, r, c, h), Ym(a, s, c));
    }
  }
  function d1(r, s, a) {
    var c = xr(r),
      h = {
        lane: c,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      };
    if (qm(r)) Qm(s, h);
    else {
      var p = r.alternate;
      if (
        r.lanes === 0 &&
        (p === null || p.lanes === 0) &&
        ((p = s.lastRenderedReducer), p !== null)
      )
        try {
          var b = s.lastRenderedState,
            I = p(b, a);
          if (((h.hasEagerState = !0), (h.eagerState = I), fn(I, b))) {
            var j = s.interleaved;
            (j === null
              ? ((h.next = h), Bc(s))
              : ((h.next = j.next), (j.next = h)),
              (s.interleaved = h));
            return;
          }
        } catch {}
      ((a = km(r, s, h, c)),
        a !== null && ((h = Ot()), yn(a, r, c, h), Ym(a, s, c)));
    }
  }
  function qm(r) {
    var s = r.alternate;
    return r === Ve || (s !== null && s === Ve);
  }
  function Qm(r, s) {
    ao = Ua = !0;
    var a = r.pending;
    (a === null ? (s.next = s) : ((s.next = a.next), (a.next = s)),
      (r.pending = s));
  }
  function Ym(r, s, a) {
    if ((a & 4194240) !== 0) {
      var c = s.lanes;
      ((c &= r.pendingLanes), (a |= c), (s.lanes = a), Ju(r, a));
    }
  }
  var Ha = {
      readContext: tn,
      useCallback: yt,
      useContext: yt,
      useEffect: yt,
      useImperativeHandle: yt,
      useInsertionEffect: yt,
      useLayoutEffect: yt,
      useMemo: yt,
      useReducer: yt,
      useRef: yt,
      useState: yt,
      useDebugValue: yt,
      useDeferredValue: yt,
      useTransition: yt,
      useMutableSource: yt,
      useSyncExternalStore: yt,
      useId: yt,
      unstable_isNewReconciler: !1,
    },
    f1 = {
      readContext: tn,
      useCallback: function (r, s) {
        return ((An().memoizedState = [r, s === void 0 ? null : s]), r);
      },
      useContext: tn,
      useEffect: $m,
      useImperativeHandle: function (r, s, a) {
        return (
          (a = a != null ? a.concat([r]) : null),
          Va(4194308, 4, Um.bind(null, s, r), a)
        );
      },
      useLayoutEffect: function (r, s) {
        return Va(4194308, 4, r, s);
      },
      useInsertionEffect: function (r, s) {
        return Va(4, 2, r, s);
      },
      useMemo: function (r, s) {
        var a = An();
        return (
          (s = s === void 0 ? null : s),
          (r = r()),
          (a.memoizedState = [r, s]),
          r
        );
      },
      useReducer: function (r, s, a) {
        var c = An();
        return (
          (s = a !== void 0 ? a(s) : s),
          (c.memoizedState = c.baseState = s),
          (r = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: r,
            lastRenderedState: s,
          }),
          (c.queue = r),
          (r = r.dispatch = c1.bind(null, Ve, r)),
          [c.memoizedState, r]
        );
      },
      useRef: function (r) {
        var s = An();
        return ((r = { current: r }), (s.memoizedState = r));
      },
      useState: Lm,
      useDebugValue: Xc,
      useDeferredValue: function (r) {
        return (An().memoizedState = r);
      },
      useTransition: function () {
        var r = Lm(!1),
          s = r[0];
        return ((r = u1.bind(null, r[1])), (An().memoizedState = r), [s, r]);
      },
      useMutableSource: function () {},
      useSyncExternalStore: function (r, s, a) {
        var c = Ve,
          h = An();
        if (Fe) {
          if (a === void 0) throw Error(n(407));
          a = a();
        } else {
          if (((a = s()), ot === null)) throw Error(n(349));
          (Jr & 30) !== 0 || Rm(c, s, a);
        }
        h.memoizedState = a;
        var p = { value: a, getSnapshot: s };
        return (
          (h.queue = p),
          $m(Nm.bind(null, c, p, r), [r]),
          (c.flags |= 2048),
          co(9, _m.bind(null, c, p, a, s), void 0, null),
          a
        );
      },
      useId: function () {
        var r = An(),
          s = ot.identifierPrefix;
        if (Fe) {
          var a = Hn,
            c = Wn;
          ((a = (c & ~(1 << (32 - dn(c) - 1))).toString(32) + a),
            (s = ":" + s + "R" + a),
            (a = lo++),
            0 < a && (s += "H" + a.toString(32)),
            (s += ":"));
        } else ((a = l1++), (s = ":" + s + "r" + a.toString(32) + ":"));
        return (r.memoizedState = s);
      },
      unstable_isNewReconciler: !1,
    },
    h1 = {
      readContext: tn,
      useCallback: Wm,
      useContext: tn,
      useEffect: Yc,
      useImperativeHandle: Vm,
      useInsertionEffect: zm,
      useLayoutEffect: Fm,
      useMemo: Hm,
      useReducer: qc,
      useRef: Bm,
      useState: function () {
        return qc(uo);
      },
      useDebugValue: Xc,
      useDeferredValue: function (r) {
        var s = nn();
        return Km(s, Xe.memoizedState, r);
      },
      useTransition: function () {
        var r = qc(uo)[0],
          s = nn().memoizedState;
        return [r, s];
      },
      useMutableSource: Am,
      useSyncExternalStore: jm,
      useId: Gm,
      unstable_isNewReconciler: !1,
    },
    p1 = {
      readContext: tn,
      useCallback: Wm,
      useContext: tn,
      useEffect: Yc,
      useImperativeHandle: Vm,
      useInsertionEffect: zm,
      useLayoutEffect: Fm,
      useMemo: Hm,
      useReducer: Qc,
      useRef: Bm,
      useState: function () {
        return Qc(uo);
      },
      useDebugValue: Xc,
      useDeferredValue: function (r) {
        var s = nn();
        return Xe === null ? (s.memoizedState = r) : Km(s, Xe.memoizedState, r);
      },
      useTransition: function () {
        var r = Qc(uo)[0],
          s = nn().memoizedState;
        return [r, s];
      },
      useMutableSource: Am,
      useSyncExternalStore: jm,
      useId: Gm,
      unstable_isNewReconciler: !1,
    };
  function pn(r, s) {
    if (r && r.defaultProps) {
      ((s = Z({}, s)), (r = r.defaultProps));
      for (var a in r) s[a] === void 0 && (s[a] = r[a]);
      return s;
    }
    return s;
  }
  function Zc(r, s, a, c) {
    ((s = r.memoizedState),
      (a = a(c, s)),
      (a = a == null ? s : Z({}, s, a)),
      (r.memoizedState = a),
      r.lanes === 0 && (r.updateQueue.baseState = a));
  }
  var Ka = {
    isMounted: function (r) {
      return (r = r._reactInternals) ? Kr(r) === r : !1;
    },
    enqueueSetState: function (r, s, a) {
      r = r._reactInternals;
      var c = Ot(),
        h = xr(r),
        p = Gn(c, h);
      ((p.payload = s),
        a != null && (p.callback = a),
        (s = wr(r, p, h)),
        s !== null && (yn(s, r, h, c), Ba(s, r, h)));
    },
    enqueueReplaceState: function (r, s, a) {
      r = r._reactInternals;
      var c = Ot(),
        h = xr(r),
        p = Gn(c, h);
      ((p.tag = 1),
        (p.payload = s),
        a != null && (p.callback = a),
        (s = wr(r, p, h)),
        s !== null && (yn(s, r, h, c), Ba(s, r, h)));
    },
    enqueueForceUpdate: function (r, s) {
      r = r._reactInternals;
      var a = Ot(),
        c = xr(r),
        h = Gn(a, c);
      ((h.tag = 2),
        s != null && (h.callback = s),
        (s = wr(r, h, c)),
        s !== null && (yn(s, r, c, a), Ba(s, r, c)));
    },
  };
  function Xm(r, s, a, c, h, p, b) {
    return (
      (r = r.stateNode),
      typeof r.shouldComponentUpdate == "function"
        ? r.shouldComponentUpdate(c, p, b)
        : s.prototype && s.prototype.isPureReactComponent
          ? !Yi(a, c) || !Yi(h, p)
          : !0
    );
  }
  function Zm(r, s, a) {
    var c = !1,
      h = gr,
      p = s.contextType;
    return (
      typeof p == "object" && p !== null
        ? (p = tn(p))
        : ((h = Rt(s) ? qr : gt.current),
          (c = s.contextTypes),
          (p = (c = c != null) ? Us(r, h) : gr)),
      (s = new s(a, p)),
      (r.memoizedState =
        s.state !== null && s.state !== void 0 ? s.state : null),
      (s.updater = Ka),
      (r.stateNode = s),
      (s._reactInternals = r),
      c &&
        ((r = r.stateNode),
        (r.__reactInternalMemoizedUnmaskedChildContext = h),
        (r.__reactInternalMemoizedMaskedChildContext = p)),
      s
    );
  }
  function Jm(r, s, a, c) {
    ((r = s.state),
      typeof s.componentWillReceiveProps == "function" &&
        s.componentWillReceiveProps(a, c),
      typeof s.UNSAFE_componentWillReceiveProps == "function" &&
        s.UNSAFE_componentWillReceiveProps(a, c),
      s.state !== r && Ka.enqueueReplaceState(s, s.state, null));
  }
  function Jc(r, s, a, c) {
    var h = r.stateNode;
    ((h.props = a), (h.state = r.memoizedState), (h.refs = {}), $c(r));
    var p = s.contextType;
    (typeof p == "object" && p !== null
      ? (h.context = tn(p))
      : ((p = Rt(s) ? qr : gt.current), (h.context = Us(r, p))),
      (h.state = r.memoizedState),
      (p = s.getDerivedStateFromProps),
      typeof p == "function" && (Zc(r, s, p, a), (h.state = r.memoizedState)),
      typeof s.getDerivedStateFromProps == "function" ||
        typeof h.getSnapshotBeforeUpdate == "function" ||
        (typeof h.UNSAFE_componentWillMount != "function" &&
          typeof h.componentWillMount != "function") ||
        ((s = h.state),
        typeof h.componentWillMount == "function" && h.componentWillMount(),
        typeof h.UNSAFE_componentWillMount == "function" &&
          h.UNSAFE_componentWillMount(),
        s !== h.state && Ka.enqueueReplaceState(h, h.state, null),
        $a(r, a, h, c),
        (h.state = r.memoizedState)),
      typeof h.componentDidMount == "function" && (r.flags |= 4194308));
  }
  function Ys(r, s) {
    try {
      var a = "",
        c = s;
      do ((a += Ce(c)), (c = c.return));
      while (c);
      var h = a;
    } catch (p) {
      h =
        `
Error generating stack: ` +
        p.message +
        `
` +
        p.stack;
    }
    return { value: r, source: s, stack: h, digest: null };
  }
  function ed(r, s, a) {
    return { value: r, source: null, stack: a ?? null, digest: s ?? null };
  }
  function td(r, s) {
    try {
      console.error(s.value);
    } catch (a) {
      setTimeout(function () {
        throw a;
      });
    }
  }
  var m1 = typeof WeakMap == "function" ? WeakMap : Map;
  function eg(r, s, a) {
    ((a = Gn(-1, a)), (a.tag = 3), (a.payload = { element: null }));
    var c = s.value;
    return (
      (a.callback = function () {
        (Ja || ((Ja = !0), (gd = c)), td(r, s));
      }),
      a
    );
  }
  function tg(r, s, a) {
    ((a = Gn(-1, a)), (a.tag = 3));
    var c = r.type.getDerivedStateFromError;
    if (typeof c == "function") {
      var h = s.value;
      ((a.payload = function () {
        return c(h);
      }),
        (a.callback = function () {
          td(r, s);
        }));
    }
    var p = r.stateNode;
    return (
      p !== null &&
        typeof p.componentDidCatch == "function" &&
        (a.callback = function () {
          (td(r, s),
            typeof c != "function" &&
              (Sr === null ? (Sr = new Set([this])) : Sr.add(this)));
          var b = s.stack;
          this.componentDidCatch(s.value, {
            componentStack: b !== null ? b : "",
          });
        }),
      a
    );
  }
  function ng(r, s, a) {
    var c = r.pingCache;
    if (c === null) {
      c = r.pingCache = new m1();
      var h = new Set();
      c.set(s, h);
    } else ((h = c.get(s)), h === void 0 && ((h = new Set()), c.set(s, h)));
    h.has(a) || (h.add(a), (r = M1.bind(null, r, s, a)), s.then(r, r));
  }
  function rg(r) {
    do {
      var s;
      if (
        ((s = r.tag === 13) &&
          ((s = r.memoizedState),
          (s = s !== null ? s.dehydrated !== null : !0)),
        s)
      )
        return r;
      r = r.return;
    } while (r !== null);
    return null;
  }
  function sg(r, s, a, c, h) {
    return (r.mode & 1) === 0
      ? (r === s
          ? (r.flags |= 65536)
          : ((r.flags |= 128),
            (a.flags |= 131072),
            (a.flags &= -52805),
            a.tag === 1 &&
              (a.alternate === null
                ? (a.tag = 17)
                : ((s = Gn(-1, 1)), (s.tag = 2), wr(a, s, 1))),
            (a.lanes |= 1)),
        r)
      : ((r.flags |= 65536), (r.lanes = h), r);
  }
  var g1 = R.ReactCurrentOwner,
    _t = !1;
  function kt(r, s, a, c) {
    s.child = r === null ? Cm(s, null, a, c) : Ks(s, r.child, a, c);
  }
  function ig(r, s, a, c, h) {
    a = a.render;
    var p = s.ref;
    return (
      qs(s, h),
      (c = Kc(r, s, a, c, p, h)),
      (a = Gc()),
      r !== null && !_t
        ? ((s.updateQueue = r.updateQueue),
          (s.flags &= -2053),
          (r.lanes &= ~h),
          qn(r, s, h))
        : (Fe && a && Mc(s), (s.flags |= 1), kt(r, s, c, h), s.child)
    );
  }
  function og(r, s, a, c, h) {
    if (r === null) {
      var p = a.type;
      return typeof p == "function" &&
        !xd(p) &&
        p.defaultProps === void 0 &&
        a.compare === null &&
        a.defaultProps === void 0
        ? ((s.tag = 15), (s.type = p), ag(r, s, p, c, h))
        : ((r = il(a.type, null, c, s, s.mode, h)),
          (r.ref = s.ref),
          (r.return = s),
          (s.child = r));
    }
    if (((p = r.child), (r.lanes & h) === 0)) {
      var b = p.memoizedProps;
      if (
        ((a = a.compare), (a = a !== null ? a : Yi), a(b, c) && r.ref === s.ref)
      )
        return qn(r, s, h);
    }
    return (
      (s.flags |= 1),
      (r = kr(p, c)),
      (r.ref = s.ref),
      (r.return = s),
      (s.child = r)
    );
  }
  function ag(r, s, a, c, h) {
    if (r !== null) {
      var p = r.memoizedProps;
      if (Yi(p, c) && r.ref === s.ref)
        if (((_t = !1), (s.pendingProps = c = p), (r.lanes & h) !== 0))
          (r.flags & 131072) !== 0 && (_t = !0);
        else return ((s.lanes = r.lanes), qn(r, s, h));
    }
    return nd(r, s, a, c, h);
  }
  function lg(r, s, a) {
    var c = s.pendingProps,
      h = c.children,
      p = r !== null ? r.memoizedState : null;
    if (c.mode === "hidden")
      if ((s.mode & 1) === 0)
        ((s.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null,
        }),
          _e(Zs, Kt),
          (Kt |= a));
      else {
        if ((a & 1073741824) === 0)
          return (
            (r = p !== null ? p.baseLanes | a : a),
            (s.lanes = s.childLanes = 1073741824),
            (s.memoizedState = {
              baseLanes: r,
              cachePool: null,
              transitions: null,
            }),
            (s.updateQueue = null),
            _e(Zs, Kt),
            (Kt |= r),
            null
          );
        ((s.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null,
        }),
          (c = p !== null ? p.baseLanes : a),
          _e(Zs, Kt),
          (Kt |= c));
      }
    else
      (p !== null ? ((c = p.baseLanes | a), (s.memoizedState = null)) : (c = a),
        _e(Zs, Kt),
        (Kt |= c));
    return (kt(r, s, h, a), s.child);
  }
  function ug(r, s) {
    var a = s.ref;
    ((r === null && a !== null) || (r !== null && r.ref !== a)) &&
      ((s.flags |= 512), (s.flags |= 2097152));
  }
  function nd(r, s, a, c, h) {
    var p = Rt(a) ? qr : gt.current;
    return (
      (p = Us(s, p)),
      qs(s, h),
      (a = Kc(r, s, a, c, p, h)),
      (c = Gc()),
      r !== null && !_t
        ? ((s.updateQueue = r.updateQueue),
          (s.flags &= -2053),
          (r.lanes &= ~h),
          qn(r, s, h))
        : (Fe && c && Mc(s), (s.flags |= 1), kt(r, s, a, h), s.child)
    );
  }
  function cg(r, s, a, c, h) {
    if (Rt(a)) {
      var p = !0;
      Aa(s);
    } else p = !1;
    if ((qs(s, h), s.stateNode === null))
      (qa(r, s), Zm(s, a, c), Jc(s, a, c, h), (c = !0));
    else if (r === null) {
      var b = s.stateNode,
        I = s.memoizedProps;
      b.props = I;
      var j = b.context,
        $ = a.contextType;
      typeof $ == "object" && $ !== null
        ? ($ = tn($))
        : (($ = Rt(a) ? qr : gt.current), ($ = Us(s, $)));
      var q = a.getDerivedStateFromProps,
        Y =
          typeof q == "function" ||
          typeof b.getSnapshotBeforeUpdate == "function";
      (Y ||
        (typeof b.UNSAFE_componentWillReceiveProps != "function" &&
          typeof b.componentWillReceiveProps != "function") ||
        ((I !== c || j !== $) && Jm(s, b, c, $)),
        (vr = !1));
      var G = s.memoizedState;
      ((b.state = G),
        $a(s, c, b, h),
        (j = s.memoizedState),
        I !== c || G !== j || jt.current || vr
          ? (typeof q == "function" && (Zc(s, a, q, c), (j = s.memoizedState)),
            (I = vr || Xm(s, a, I, c, G, j, $))
              ? (Y ||
                  (typeof b.UNSAFE_componentWillMount != "function" &&
                    typeof b.componentWillMount != "function") ||
                  (typeof b.componentWillMount == "function" &&
                    b.componentWillMount(),
                  typeof b.UNSAFE_componentWillMount == "function" &&
                    b.UNSAFE_componentWillMount()),
                typeof b.componentDidMount == "function" &&
                  (s.flags |= 4194308))
              : (typeof b.componentDidMount == "function" &&
                  (s.flags |= 4194308),
                (s.memoizedProps = c),
                (s.memoizedState = j)),
            (b.props = c),
            (b.state = j),
            (b.context = $),
            (c = I))
          : (typeof b.componentDidMount == "function" && (s.flags |= 4194308),
            (c = !1)));
    } else {
      ((b = s.stateNode),
        Om(r, s),
        (I = s.memoizedProps),
        ($ = s.type === s.elementType ? I : pn(s.type, I)),
        (b.props = $),
        (Y = s.pendingProps),
        (G = b.context),
        (j = a.contextType),
        typeof j == "object" && j !== null
          ? (j = tn(j))
          : ((j = Rt(a) ? qr : gt.current), (j = Us(s, j))));
      var ne = a.getDerivedStateFromProps;
      ((q =
        typeof ne == "function" ||
        typeof b.getSnapshotBeforeUpdate == "function") ||
        (typeof b.UNSAFE_componentWillReceiveProps != "function" &&
          typeof b.componentWillReceiveProps != "function") ||
        ((I !== Y || G !== j) && Jm(s, b, c, j)),
        (vr = !1),
        (G = s.memoizedState),
        (b.state = G),
        $a(s, c, b, h));
      var ie = s.memoizedState;
      I !== Y || G !== ie || jt.current || vr
        ? (typeof ne == "function" && (Zc(s, a, ne, c), (ie = s.memoizedState)),
          ($ = vr || Xm(s, a, $, c, G, ie, j) || !1)
            ? (q ||
                (typeof b.UNSAFE_componentWillUpdate != "function" &&
                  typeof b.componentWillUpdate != "function") ||
                (typeof b.componentWillUpdate == "function" &&
                  b.componentWillUpdate(c, ie, j),
                typeof b.UNSAFE_componentWillUpdate == "function" &&
                  b.UNSAFE_componentWillUpdate(c, ie, j)),
              typeof b.componentDidUpdate == "function" && (s.flags |= 4),
              typeof b.getSnapshotBeforeUpdate == "function" &&
                (s.flags |= 1024))
            : (typeof b.componentDidUpdate != "function" ||
                (I === r.memoizedProps && G === r.memoizedState) ||
                (s.flags |= 4),
              typeof b.getSnapshotBeforeUpdate != "function" ||
                (I === r.memoizedProps && G === r.memoizedState) ||
                (s.flags |= 1024),
              (s.memoizedProps = c),
              (s.memoizedState = ie)),
          (b.props = c),
          (b.state = ie),
          (b.context = j),
          (c = $))
        : (typeof b.componentDidUpdate != "function" ||
            (I === r.memoizedProps && G === r.memoizedState) ||
            (s.flags |= 4),
          typeof b.getSnapshotBeforeUpdate != "function" ||
            (I === r.memoizedProps && G === r.memoizedState) ||
            (s.flags |= 1024),
          (c = !1));
    }
    return rd(r, s, a, c, p, h);
  }
  function rd(r, s, a, c, h, p) {
    ug(r, s);
    var b = (s.flags & 128) !== 0;
    if (!c && !b) return (h && mm(s, a, !1), qn(r, s, p));
    ((c = s.stateNode), (g1.current = s));
    var I =
      b && typeof a.getDerivedStateFromError != "function" ? null : c.render();
    return (
      (s.flags |= 1),
      r !== null && b
        ? ((s.child = Ks(s, r.child, null, p)), (s.child = Ks(s, null, I, p)))
        : kt(r, s, I, p),
      (s.memoizedState = c.state),
      h && mm(s, a, !0),
      s.child
    );
  }
  function dg(r) {
    var s = r.stateNode;
    (s.pendingContext
      ? hm(r, s.pendingContext, s.pendingContext !== s.context)
      : s.context && hm(r, s.context, !1),
      zc(r, s.containerInfo));
  }
  function fg(r, s, a, c, h) {
    return (Hs(), _c(h), (s.flags |= 256), kt(r, s, a, c), s.child);
  }
  var sd = { dehydrated: null, treeContext: null, retryLane: 0 };
  function id(r) {
    return { baseLanes: r, cachePool: null, transitions: null };
  }
  function hg(r, s, a) {
    var c = s.pendingProps,
      h = Ue.current,
      p = !1,
      b = (s.flags & 128) !== 0,
      I;
    if (
      ((I = b) ||
        (I = r !== null && r.memoizedState === null ? !1 : (h & 2) !== 0),
      I
        ? ((p = !0), (s.flags &= -129))
        : (r === null || r.memoizedState !== null) && (h |= 1),
      _e(Ue, h & 1),
      r === null)
    )
      return (
        Rc(s),
        (r = s.memoizedState),
        r !== null && ((r = r.dehydrated), r !== null)
          ? ((s.mode & 1) === 0
              ? (s.lanes = 1)
              : r.data === "$!"
                ? (s.lanes = 8)
                : (s.lanes = 1073741824),
            null)
          : ((b = c.children),
            (r = c.fallback),
            p
              ? ((c = s.mode),
                (p = s.child),
                (b = { mode: "hidden", children: b }),
                (c & 1) === 0 && p !== null
                  ? ((p.childLanes = 0), (p.pendingProps = b))
                  : (p = ol(b, c, 0, null)),
                (r = ss(r, c, a, null)),
                (p.return = s),
                (r.return = s),
                (p.sibling = r),
                (s.child = p),
                (s.child.memoizedState = id(a)),
                (s.memoizedState = sd),
                r)
              : od(s, b))
      );
    if (((h = r.memoizedState), h !== null && ((I = h.dehydrated), I !== null)))
      return y1(r, s, b, c, I, h, a);
    if (p) {
      ((p = c.fallback), (b = s.mode), (h = r.child), (I = h.sibling));
      var j = { mode: "hidden", children: c.children };
      return (
        (b & 1) === 0 && s.child !== h
          ? ((c = s.child),
            (c.childLanes = 0),
            (c.pendingProps = j),
            (s.deletions = null))
          : ((c = kr(h, j)), (c.subtreeFlags = h.subtreeFlags & 14680064)),
        I !== null ? (p = kr(I, p)) : ((p = ss(p, b, a, null)), (p.flags |= 2)),
        (p.return = s),
        (c.return = s),
        (c.sibling = p),
        (s.child = c),
        (c = p),
        (p = s.child),
        (b = r.child.memoizedState),
        (b =
          b === null
            ? id(a)
            : {
                baseLanes: b.baseLanes | a,
                cachePool: null,
                transitions: b.transitions,
              }),
        (p.memoizedState = b),
        (p.childLanes = r.childLanes & ~a),
        (s.memoizedState = sd),
        c
      );
    }
    return (
      (p = r.child),
      (r = p.sibling),
      (c = kr(p, { mode: "visible", children: c.children })),
      (s.mode & 1) === 0 && (c.lanes = a),
      (c.return = s),
      (c.sibling = null),
      r !== null &&
        ((a = s.deletions),
        a === null ? ((s.deletions = [r]), (s.flags |= 16)) : a.push(r)),
      (s.child = c),
      (s.memoizedState = null),
      c
    );
  }
  function od(r, s) {
    return (
      (s = ol({ mode: "visible", children: s }, r.mode, 0, null)),
      (s.return = r),
      (r.child = s)
    );
  }
  function Ga(r, s, a, c) {
    return (
      c !== null && _c(c),
      Ks(s, r.child, null, a),
      (r = od(s, s.pendingProps.children)),
      (r.flags |= 2),
      (s.memoizedState = null),
      r
    );
  }
  function y1(r, s, a, c, h, p, b) {
    if (a)
      return s.flags & 256
        ? ((s.flags &= -257), (c = ed(Error(n(422)))), Ga(r, s, b, c))
        : s.memoizedState !== null
          ? ((s.child = r.child), (s.flags |= 128), null)
          : ((p = c.fallback),
            (h = s.mode),
            (c = ol({ mode: "visible", children: c.children }, h, 0, null)),
            (p = ss(p, h, b, null)),
            (p.flags |= 2),
            (c.return = s),
            (p.return = s),
            (c.sibling = p),
            (s.child = c),
            (s.mode & 1) !== 0 && Ks(s, r.child, null, b),
            (s.child.memoizedState = id(b)),
            (s.memoizedState = sd),
            p);
    if ((s.mode & 1) === 0) return Ga(r, s, b, null);
    if (h.data === "$!") {
      if (((c = h.nextSibling && h.nextSibling.dataset), c)) var I = c.dgst;
      return (
        (c = I),
        (p = Error(n(419))),
        (c = ed(p, c, void 0)),
        Ga(r, s, b, c)
      );
    }
    if (((I = (b & r.childLanes) !== 0), _t || I)) {
      if (((c = ot), c !== null)) {
        switch (b & -b) {
          case 4:
            h = 2;
            break;
          case 16:
            h = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            h = 32;
            break;
          case 536870912:
            h = 268435456;
            break;
          default:
            h = 0;
        }
        ((h = (h & (c.suspendedLanes | b)) !== 0 ? 0 : h),
          h !== 0 &&
            h !== p.retryLane &&
            ((p.retryLane = h), Kn(r, h), yn(c, r, h, -1)));
      }
      return (Ed(), (c = ed(Error(n(421)))), Ga(r, s, b, c));
    }
    return h.data === "$?"
      ? ((s.flags |= 128),
        (s.child = r.child),
        (s = A1.bind(null, r)),
        (h._reactRetry = s),
        null)
      : ((r = p.treeContext),
        (Ht = pr(h.nextSibling)),
        (Wt = s),
        (Fe = !0),
        (hn = null),
        r !== null &&
          ((Jt[en++] = Wn),
          (Jt[en++] = Hn),
          (Jt[en++] = Qr),
          (Wn = r.id),
          (Hn = r.overflow),
          (Qr = s)),
        (s = od(s, c.children)),
        (s.flags |= 4096),
        s);
  }
  function pg(r, s, a) {
    r.lanes |= s;
    var c = r.alternate;
    (c !== null && (c.lanes |= s), Lc(r.return, s, a));
  }
  function ad(r, s, a, c, h) {
    var p = r.memoizedState;
    p === null
      ? (r.memoizedState = {
          isBackwards: s,
          rendering: null,
          renderingStartTime: 0,
          last: c,
          tail: a,
          tailMode: h,
        })
      : ((p.isBackwards = s),
        (p.rendering = null),
        (p.renderingStartTime = 0),
        (p.last = c),
        (p.tail = a),
        (p.tailMode = h));
  }
  function mg(r, s, a) {
    var c = s.pendingProps,
      h = c.revealOrder,
      p = c.tail;
    if ((kt(r, s, c.children, a), (c = Ue.current), (c & 2) !== 0))
      ((c = (c & 1) | 2), (s.flags |= 128));
    else {
      if (r !== null && (r.flags & 128) !== 0)
        e: for (r = s.child; r !== null; ) {
          if (r.tag === 13) r.memoizedState !== null && pg(r, a, s);
          else if (r.tag === 19) pg(r, a, s);
          else if (r.child !== null) {
            ((r.child.return = r), (r = r.child));
            continue;
          }
          if (r === s) break e;
          for (; r.sibling === null; ) {
            if (r.return === null || r.return === s) break e;
            r = r.return;
          }
          ((r.sibling.return = r.return), (r = r.sibling));
        }
      c &= 1;
    }
    if ((_e(Ue, c), (s.mode & 1) === 0)) s.memoizedState = null;
    else
      switch (h) {
        case "forwards":
          for (a = s.child, h = null; a !== null; )
            ((r = a.alternate),
              r !== null && za(r) === null && (h = a),
              (a = a.sibling));
          ((a = h),
            a === null
              ? ((h = s.child), (s.child = null))
              : ((h = a.sibling), (a.sibling = null)),
            ad(s, !1, h, a, p));
          break;
        case "backwards":
          for (a = null, h = s.child, s.child = null; h !== null; ) {
            if (((r = h.alternate), r !== null && za(r) === null)) {
              s.child = h;
              break;
            }
            ((r = h.sibling), (h.sibling = a), (a = h), (h = r));
          }
          ad(s, !0, a, null, p);
          break;
        case "together":
          ad(s, !1, null, null, void 0);
          break;
        default:
          s.memoizedState = null;
      }
    return s.child;
  }
  function qa(r, s) {
    (s.mode & 1) === 0 &&
      r !== null &&
      ((r.alternate = null), (s.alternate = null), (s.flags |= 2));
  }
  function qn(r, s, a) {
    if (
      (r !== null && (s.dependencies = r.dependencies),
      (es |= s.lanes),
      (a & s.childLanes) === 0)
    )
      return null;
    if (r !== null && s.child !== r.child) throw Error(n(153));
    if (s.child !== null) {
      for (
        r = s.child, a = kr(r, r.pendingProps), s.child = a, a.return = s;
        r.sibling !== null;
      )
        ((r = r.sibling),
          (a = a.sibling = kr(r, r.pendingProps)),
          (a.return = s));
      a.sibling = null;
    }
    return s.child;
  }
  function v1(r, s, a) {
    switch (s.tag) {
      case 3:
        (dg(s), Hs());
        break;
      case 5:
        Mm(s);
        break;
      case 1:
        Rt(s.type) && Aa(s);
        break;
      case 4:
        zc(s, s.stateNode.containerInfo);
        break;
      case 10:
        var c = s.type._context,
          h = s.memoizedProps.value;
        (_e(Da, c._currentValue), (c._currentValue = h));
        break;
      case 13:
        if (((c = s.memoizedState), c !== null))
          return c.dehydrated !== null
            ? (_e(Ue, Ue.current & 1), (s.flags |= 128), null)
            : (a & s.child.childLanes) !== 0
              ? hg(r, s, a)
              : (_e(Ue, Ue.current & 1),
                (r = qn(r, s, a)),
                r !== null ? r.sibling : null);
        _e(Ue, Ue.current & 1);
        break;
      case 19:
        if (((c = (a & s.childLanes) !== 0), (r.flags & 128) !== 0)) {
          if (c) return mg(r, s, a);
          s.flags |= 128;
        }
        if (
          ((h = s.memoizedState),
          h !== null &&
            ((h.rendering = null), (h.tail = null), (h.lastEffect = null)),
          _e(Ue, Ue.current),
          c)
        )
          break;
        return null;
      case 22:
      case 23:
        return ((s.lanes = 0), lg(r, s, a));
    }
    return qn(r, s, a);
  }
  var gg, ld, yg, vg;
  ((gg = function (r, s) {
    for (var a = s.child; a !== null; ) {
      if (a.tag === 5 || a.tag === 6) r.appendChild(a.stateNode);
      else if (a.tag !== 4 && a.child !== null) {
        ((a.child.return = a), (a = a.child));
        continue;
      }
      if (a === s) break;
      for (; a.sibling === null; ) {
        if (a.return === null || a.return === s) return;
        a = a.return;
      }
      ((a.sibling.return = a.return), (a = a.sibling));
    }
  }),
    (ld = function () {}),
    (yg = function (r, s, a, c) {
      var h = r.memoizedProps;
      if (h !== c) {
        ((r = s.stateNode), Zr(Mn.current));
        var p = null;
        switch (a) {
          case "input":
            ((h = Lu(r, h)), (c = Lu(r, c)), (p = []));
            break;
          case "select":
            ((h = Z({}, h, { value: void 0 })),
              (c = Z({}, c, { value: void 0 })),
              (p = []));
            break;
          case "textarea":
            ((h = zu(r, h)), (c = zu(r, c)), (p = []));
            break;
          default:
            typeof h.onClick != "function" &&
              typeof c.onClick == "function" &&
              (r.onclick = Ta);
        }
        Uu(a, c);
        var b;
        a = null;
        for ($ in h)
          if (!c.hasOwnProperty($) && h.hasOwnProperty($) && h[$] != null)
            if ($ === "style") {
              var I = h[$];
              for (b in I) I.hasOwnProperty(b) && (a || (a = {}), (a[b] = ""));
            } else
              $ !== "dangerouslySetInnerHTML" &&
                $ !== "children" &&
                $ !== "suppressContentEditableWarning" &&
                $ !== "suppressHydrationWarning" &&
                $ !== "autoFocus" &&
                (o.hasOwnProperty($)
                  ? p || (p = [])
                  : (p = p || []).push($, null));
        for ($ in c) {
          var j = c[$];
          if (
            ((I = h?.[$]),
            c.hasOwnProperty($) && j !== I && (j != null || I != null))
          )
            if ($ === "style")
              if (I) {
                for (b in I)
                  !I.hasOwnProperty(b) ||
                    (j && j.hasOwnProperty(b)) ||
                    (a || (a = {}), (a[b] = ""));
                for (b in j)
                  j.hasOwnProperty(b) &&
                    I[b] !== j[b] &&
                    (a || (a = {}), (a[b] = j[b]));
              } else (a || (p || (p = []), p.push($, a)), (a = j));
            else
              $ === "dangerouslySetInnerHTML"
                ? ((j = j ? j.__html : void 0),
                  (I = I ? I.__html : void 0),
                  j != null && I !== j && (p = p || []).push($, j))
                : $ === "children"
                  ? (typeof j != "string" && typeof j != "number") ||
                    (p = p || []).push($, "" + j)
                  : $ !== "suppressContentEditableWarning" &&
                    $ !== "suppressHydrationWarning" &&
                    (o.hasOwnProperty($)
                      ? (j != null && $ === "onScroll" && Le("scroll", r),
                        p || I === j || (p = []))
                      : (p = p || []).push($, j));
        }
        a && (p = p || []).push("style", a);
        var $ = p;
        (s.updateQueue = $) && (s.flags |= 4);
      }
    }),
    (vg = function (r, s, a, c) {
      a !== c && (s.flags |= 4);
    }));
  function fo(r, s) {
    if (!Fe)
      switch (r.tailMode) {
        case "hidden":
          s = r.tail;
          for (var a = null; s !== null; )
            (s.alternate !== null && (a = s), (s = s.sibling));
          a === null ? (r.tail = null) : (a.sibling = null);
          break;
        case "collapsed":
          a = r.tail;
          for (var c = null; a !== null; )
            (a.alternate !== null && (c = a), (a = a.sibling));
          c === null
            ? s || r.tail === null
              ? (r.tail = null)
              : (r.tail.sibling = null)
            : (c.sibling = null);
      }
  }
  function vt(r) {
    var s = r.alternate !== null && r.alternate.child === r.child,
      a = 0,
      c = 0;
    if (s)
      for (var h = r.child; h !== null; )
        ((a |= h.lanes | h.childLanes),
          (c |= h.subtreeFlags & 14680064),
          (c |= h.flags & 14680064),
          (h.return = r),
          (h = h.sibling));
    else
      for (h = r.child; h !== null; )
        ((a |= h.lanes | h.childLanes),
          (c |= h.subtreeFlags),
          (c |= h.flags),
          (h.return = r),
          (h = h.sibling));
    return ((r.subtreeFlags |= c), (r.childLanes = a), s);
  }
  function w1(r, s, a) {
    var c = s.pendingProps;
    switch ((Ac(s), s.tag)) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (vt(s), null);
      case 1:
        return (Rt(s.type) && Ma(), vt(s), null);
      case 3:
        return (
          (c = s.stateNode),
          Qs(),
          Be(jt),
          Be(gt),
          Vc(),
          c.pendingContext &&
            ((c.context = c.pendingContext), (c.pendingContext = null)),
          (r === null || r.child === null) &&
            (Na(s)
              ? (s.flags |= 4)
              : r === null ||
                (r.memoizedState.isDehydrated && (s.flags & 256) === 0) ||
                ((s.flags |= 1024), hn !== null && (wd(hn), (hn = null)))),
          ld(r, s),
          vt(s),
          null
        );
      case 5:
        Fc(s);
        var h = Zr(oo.current);
        if (((a = s.type), r !== null && s.stateNode != null))
          (yg(r, s, a, c, h),
            r.ref !== s.ref && ((s.flags |= 512), (s.flags |= 2097152)));
        else {
          if (!c) {
            if (s.stateNode === null) throw Error(n(166));
            return (vt(s), null);
          }
          if (((r = Zr(Mn.current)), Na(s))) {
            ((c = s.stateNode), (a = s.type));
            var p = s.memoizedProps;
            switch (((c[In] = s), (c[to] = p), (r = (s.mode & 1) !== 0), a)) {
              case "dialog":
                (Le("cancel", c), Le("close", c));
                break;
              case "iframe":
              case "object":
              case "embed":
                Le("load", c);
                break;
              case "video":
              case "audio":
                for (h = 0; h < Zi.length; h++) Le(Zi[h], c);
                break;
              case "source":
                Le("error", c);
                break;
              case "img":
              case "image":
              case "link":
                (Le("error", c), Le("load", c));
                break;
              case "details":
                Le("toggle", c);
                break;
              case "input":
                (Zh(c, p), Le("invalid", c));
                break;
              case "select":
                ((c._wrapperState = { wasMultiple: !!p.multiple }),
                  Le("invalid", c));
                break;
              case "textarea":
                (tp(c, p), Le("invalid", c));
            }
            (Uu(a, p), (h = null));
            for (var b in p)
              if (p.hasOwnProperty(b)) {
                var I = p[b];
                b === "children"
                  ? typeof I == "string"
                    ? c.textContent !== I &&
                      (p.suppressHydrationWarning !== !0 &&
                        Oa(c.textContent, I, r),
                      (h = ["children", I]))
                    : typeof I == "number" &&
                      c.textContent !== "" + I &&
                      (p.suppressHydrationWarning !== !0 &&
                        Oa(c.textContent, I, r),
                      (h = ["children", "" + I]))
                  : o.hasOwnProperty(b) &&
                    I != null &&
                    b === "onScroll" &&
                    Le("scroll", c);
              }
            switch (a) {
              case "input":
                (Ms(c), ep(c, p, !0));
                break;
              case "textarea":
                (Ms(c), rp(c));
                break;
              case "select":
              case "option":
                break;
              default:
                typeof p.onClick == "function" && (c.onclick = Ta);
            }
            ((c = h), (s.updateQueue = c), c !== null && (s.flags |= 4));
          } else {
            ((b = h.nodeType === 9 ? h : h.ownerDocument),
              r === "http://www.w3.org/1999/xhtml" && (r = sp(a)),
              r === "http://www.w3.org/1999/xhtml"
                ? a === "script"
                  ? ((r = b.createElement("div")),
                    (r.innerHTML = "<script><\/script>"),
                    (r = r.removeChild(r.firstChild)))
                  : typeof c.is == "string"
                    ? (r = b.createElement(a, { is: c.is }))
                    : ((r = b.createElement(a)),
                      a === "select" &&
                        ((b = r),
                        c.multiple
                          ? (b.multiple = !0)
                          : c.size && (b.size = c.size)))
                : (r = b.createElementNS(r, a)),
              (r[In] = s),
              (r[to] = c),
              gg(r, s, !1, !1),
              (s.stateNode = r));
            e: {
              switch (((b = Vu(a, c)), a)) {
                case "dialog":
                  (Le("cancel", r), Le("close", r), (h = c));
                  break;
                case "iframe":
                case "object":
                case "embed":
                  (Le("load", r), (h = c));
                  break;
                case "video":
                case "audio":
                  for (h = 0; h < Zi.length; h++) Le(Zi[h], r);
                  h = c;
                  break;
                case "source":
                  (Le("error", r), (h = c));
                  break;
                case "img":
                case "image":
                case "link":
                  (Le("error", r), Le("load", r), (h = c));
                  break;
                case "details":
                  (Le("toggle", r), (h = c));
                  break;
                case "input":
                  (Zh(r, c), (h = Lu(r, c)), Le("invalid", r));
                  break;
                case "option":
                  h = c;
                  break;
                case "select":
                  ((r._wrapperState = { wasMultiple: !!c.multiple }),
                    (h = Z({}, c, { value: void 0 })),
                    Le("invalid", r));
                  break;
                case "textarea":
                  (tp(r, c), (h = zu(r, c)), Le("invalid", r));
                  break;
                default:
                  h = c;
              }
              (Uu(a, h), (I = h));
              for (p in I)
                if (I.hasOwnProperty(p)) {
                  var j = I[p];
                  p === "style"
                    ? ap(r, j)
                    : p === "dangerouslySetInnerHTML"
                      ? ((j = j ? j.__html : void 0), j != null && ip(r, j))
                      : p === "children"
                        ? typeof j == "string"
                          ? (a !== "textarea" || j !== "") && _i(r, j)
                          : typeof j == "number" && _i(r, "" + j)
                        : p !== "suppressContentEditableWarning" &&
                          p !== "suppressHydrationWarning" &&
                          p !== "autoFocus" &&
                          (o.hasOwnProperty(p)
                            ? j != null && p === "onScroll" && Le("scroll", r)
                            : j != null && A(r, p, j, b));
                }
              switch (a) {
                case "input":
                  (Ms(r), ep(r, c, !1));
                  break;
                case "textarea":
                  (Ms(r), rp(r));
                  break;
                case "option":
                  c.value != null && r.setAttribute("value", "" + Oe(c.value));
                  break;
                case "select":
                  ((r.multiple = !!c.multiple),
                    (p = c.value),
                    p != null
                      ? As(r, !!c.multiple, p, !1)
                      : c.defaultValue != null &&
                        As(r, !!c.multiple, c.defaultValue, !0));
                  break;
                default:
                  typeof h.onClick == "function" && (r.onclick = Ta);
              }
              switch (a) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  c = !!c.autoFocus;
                  break e;
                case "img":
                  c = !0;
                  break e;
                default:
                  c = !1;
              }
            }
            c && (s.flags |= 4);
          }
          s.ref !== null && ((s.flags |= 512), (s.flags |= 2097152));
        }
        return (vt(s), null);
      case 6:
        if (r && s.stateNode != null) vg(r, s, r.memoizedProps, c);
        else {
          if (typeof c != "string" && s.stateNode === null) throw Error(n(166));
          if (((a = Zr(oo.current)), Zr(Mn.current), Na(s))) {
            if (
              ((c = s.stateNode),
              (a = s.memoizedProps),
              (c[In] = s),
              (p = c.nodeValue !== a) && ((r = Wt), r !== null))
            )
              switch (r.tag) {
                case 3:
                  Oa(c.nodeValue, a, (r.mode & 1) !== 0);
                  break;
                case 5:
                  r.memoizedProps.suppressHydrationWarning !== !0 &&
                    Oa(c.nodeValue, a, (r.mode & 1) !== 0);
              }
            p && (s.flags |= 4);
          } else
            ((c = (a.nodeType === 9 ? a : a.ownerDocument).createTextNode(c)),
              (c[In] = s),
              (s.stateNode = c));
        }
        return (vt(s), null);
      case 13:
        if (
          (Be(Ue),
          (c = s.memoizedState),
          r === null ||
            (r.memoizedState !== null && r.memoizedState.dehydrated !== null))
        ) {
          if (Fe && Ht !== null && (s.mode & 1) !== 0 && (s.flags & 128) === 0)
            (Sm(), Hs(), (s.flags |= 98560), (p = !1));
          else if (((p = Na(s)), c !== null && c.dehydrated !== null)) {
            if (r === null) {
              if (!p) throw Error(n(318));
              if (
                ((p = s.memoizedState),
                (p = p !== null ? p.dehydrated : null),
                !p)
              )
                throw Error(n(317));
              p[In] = s;
            } else
              (Hs(),
                (s.flags & 128) === 0 && (s.memoizedState = null),
                (s.flags |= 4));
            (vt(s), (p = !1));
          } else (hn !== null && (wd(hn), (hn = null)), (p = !0));
          if (!p) return s.flags & 65536 ? s : null;
        }
        return (s.flags & 128) !== 0
          ? ((s.lanes = a), s)
          : ((c = c !== null),
            c !== (r !== null && r.memoizedState !== null) &&
              c &&
              ((s.child.flags |= 8192),
              (s.mode & 1) !== 0 &&
                (r === null || (Ue.current & 1) !== 0
                  ? Ze === 0 && (Ze = 3)
                  : Ed())),
            s.updateQueue !== null && (s.flags |= 4),
            vt(s),
            null);
      case 4:
        return (
          Qs(),
          ld(r, s),
          r === null && Ji(s.stateNode.containerInfo),
          vt(s),
          null
        );
      case 10:
        return (Dc(s.type._context), vt(s), null);
      case 17:
        return (Rt(s.type) && Ma(), vt(s), null);
      case 19:
        if ((Be(Ue), (p = s.memoizedState), p === null)) return (vt(s), null);
        if (((c = (s.flags & 128) !== 0), (b = p.rendering), b === null))
          if (c) fo(p, !1);
          else {
            if (Ze !== 0 || (r !== null && (r.flags & 128) !== 0))
              for (r = s.child; r !== null; ) {
                if (((b = za(r)), b !== null)) {
                  for (
                    s.flags |= 128,
                      fo(p, !1),
                      c = b.updateQueue,
                      c !== null && ((s.updateQueue = c), (s.flags |= 4)),
                      s.subtreeFlags = 0,
                      c = a,
                      a = s.child;
                    a !== null;
                  )
                    ((p = a),
                      (r = c),
                      (p.flags &= 14680066),
                      (b = p.alternate),
                      b === null
                        ? ((p.childLanes = 0),
                          (p.lanes = r),
                          (p.child = null),
                          (p.subtreeFlags = 0),
                          (p.memoizedProps = null),
                          (p.memoizedState = null),
                          (p.updateQueue = null),
                          (p.dependencies = null),
                          (p.stateNode = null))
                        : ((p.childLanes = b.childLanes),
                          (p.lanes = b.lanes),
                          (p.child = b.child),
                          (p.subtreeFlags = 0),
                          (p.deletions = null),
                          (p.memoizedProps = b.memoizedProps),
                          (p.memoizedState = b.memoizedState),
                          (p.updateQueue = b.updateQueue),
                          (p.type = b.type),
                          (r = b.dependencies),
                          (p.dependencies =
                            r === null
                              ? null
                              : {
                                  lanes: r.lanes,
                                  firstContext: r.firstContext,
                                })),
                      (a = a.sibling));
                  return (_e(Ue, (Ue.current & 1) | 2), s.child);
                }
                r = r.sibling;
              }
            p.tail !== null &&
              qe() > Js &&
              ((s.flags |= 128), (c = !0), fo(p, !1), (s.lanes = 4194304));
          }
        else {
          if (!c)
            if (((r = za(b)), r !== null)) {
              if (
                ((s.flags |= 128),
                (c = !0),
                (a = r.updateQueue),
                a !== null && ((s.updateQueue = a), (s.flags |= 4)),
                fo(p, !0),
                p.tail === null &&
                  p.tailMode === "hidden" &&
                  !b.alternate &&
                  !Fe)
              )
                return (vt(s), null);
            } else
              2 * qe() - p.renderingStartTime > Js &&
                a !== 1073741824 &&
                ((s.flags |= 128), (c = !0), fo(p, !1), (s.lanes = 4194304));
          p.isBackwards
            ? ((b.sibling = s.child), (s.child = b))
            : ((a = p.last),
              a !== null ? (a.sibling = b) : (s.child = b),
              (p.last = b));
        }
        return p.tail !== null
          ? ((s = p.tail),
            (p.rendering = s),
            (p.tail = s.sibling),
            (p.renderingStartTime = qe()),
            (s.sibling = null),
            (a = Ue.current),
            _e(Ue, c ? (a & 1) | 2 : a & 1),
            s)
          : (vt(s), null);
      case 22:
      case 23:
        return (
          Sd(),
          (c = s.memoizedState !== null),
          r !== null && (r.memoizedState !== null) !== c && (s.flags |= 8192),
          c && (s.mode & 1) !== 0
            ? (Kt & 1073741824) !== 0 &&
              (vt(s), s.subtreeFlags & 6 && (s.flags |= 8192))
            : vt(s),
          null
        );
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(n(156, s.tag));
  }
  function b1(r, s) {
    switch ((Ac(s), s.tag)) {
      case 1:
        return (
          Rt(s.type) && Ma(),
          (r = s.flags),
          r & 65536 ? ((s.flags = (r & -65537) | 128), s) : null
        );
      case 3:
        return (
          Qs(),
          Be(jt),
          Be(gt),
          Vc(),
          (r = s.flags),
          (r & 65536) !== 0 && (r & 128) === 0
            ? ((s.flags = (r & -65537) | 128), s)
            : null
        );
      case 5:
        return (Fc(s), null);
      case 13:
        if (
          (Be(Ue), (r = s.memoizedState), r !== null && r.dehydrated !== null)
        ) {
          if (s.alternate === null) throw Error(n(340));
          Hs();
        }
        return (
          (r = s.flags),
          r & 65536 ? ((s.flags = (r & -65537) | 128), s) : null
        );
      case 19:
        return (Be(Ue), null);
      case 4:
        return (Qs(), null);
      case 10:
        return (Dc(s.type._context), null);
      case 22:
      case 23:
        return (Sd(), null);
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Qa = !1,
    wt = !1,
    S1 = typeof WeakSet == "function" ? WeakSet : Set,
    se = null;
  function Xs(r, s) {
    var a = r.ref;
    if (a !== null)
      if (typeof a == "function")
        try {
          a(null);
        } catch (c) {
          He(r, s, c);
        }
      else a.current = null;
  }
  function ud(r, s, a) {
    try {
      a();
    } catch (c) {
      He(r, s, c);
    }
  }
  var wg = !1;
  function E1(r, s) {
    if (((Sc = ma), (r = Xp()), hc(r))) {
      if ("selectionStart" in r)
        var a = { start: r.selectionStart, end: r.selectionEnd };
      else
        e: {
          a = ((a = r.ownerDocument) && a.defaultView) || window;
          var c = a.getSelection && a.getSelection();
          if (c && c.rangeCount !== 0) {
            a = c.anchorNode;
            var h = c.anchorOffset,
              p = c.focusNode;
            c = c.focusOffset;
            try {
              (a.nodeType, p.nodeType);
            } catch {
              a = null;
              break e;
            }
            var b = 0,
              I = -1,
              j = -1,
              $ = 0,
              q = 0,
              Y = r,
              G = null;
            t: for (;;) {
              for (
                var ne;
                Y !== a || (h !== 0 && Y.nodeType !== 3) || (I = b + h),
                  Y !== p || (c !== 0 && Y.nodeType !== 3) || (j = b + c),
                  Y.nodeType === 3 && (b += Y.nodeValue.length),
                  (ne = Y.firstChild) !== null;
              )
                ((G = Y), (Y = ne));
              for (;;) {
                if (Y === r) break t;
                if (
                  (G === a && ++$ === h && (I = b),
                  G === p && ++q === c && (j = b),
                  (ne = Y.nextSibling) !== null)
                )
                  break;
                ((Y = G), (G = Y.parentNode));
              }
              Y = ne;
            }
            a = I === -1 || j === -1 ? null : { start: I, end: j };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (
      Ec = { focusedElem: r, selectionRange: a }, ma = !1, se = s;
      se !== null;
    )
      if (
        ((s = se), (r = s.child), (s.subtreeFlags & 1028) !== 0 && r !== null)
      )
        ((r.return = s), (se = r));
      else
        for (; se !== null; ) {
          s = se;
          try {
            var ie = s.alternate;
            if ((s.flags & 1024) !== 0)
              switch (s.tag) {
                case 0:
                case 11:
                case 15:
                  break;
                case 1:
                  if (ie !== null) {
                    var oe = ie.memoizedProps,
                      Qe = ie.memoizedState,
                      D = s.stateNode,
                      _ = D.getSnapshotBeforeUpdate(
                        s.elementType === s.type ? oe : pn(s.type, oe),
                        Qe,
                      );
                    D.__reactInternalSnapshotBeforeUpdate = _;
                  }
                  break;
                case 3:
                  var L = s.stateNode.containerInfo;
                  L.nodeType === 1
                    ? (L.textContent = "")
                    : L.nodeType === 9 &&
                      L.documentElement &&
                      L.removeChild(L.documentElement);
                  break;
                case 5:
                case 6:
                case 4:
                case 17:
                  break;
                default:
                  throw Error(n(163));
              }
          } catch (X) {
            He(s, s.return, X);
          }
          if (((r = s.sibling), r !== null)) {
            ((r.return = s.return), (se = r));
            break;
          }
          se = s.return;
        }
    return ((ie = wg), (wg = !1), ie);
  }
  function ho(r, s, a) {
    var c = s.updateQueue;
    if (((c = c !== null ? c.lastEffect : null), c !== null)) {
      var h = (c = c.next);
      do {
        if ((h.tag & r) === r) {
          var p = h.destroy;
          ((h.destroy = void 0), p !== void 0 && ud(s, a, p));
        }
        h = h.next;
      } while (h !== c);
    }
  }
  function Ya(r, s) {
    if (
      ((s = s.updateQueue), (s = s !== null ? s.lastEffect : null), s !== null)
    ) {
      var a = (s = s.next);
      do {
        if ((a.tag & r) === r) {
          var c = a.create;
          a.destroy = c();
        }
        a = a.next;
      } while (a !== s);
    }
  }
  function cd(r) {
    var s = r.ref;
    if (s !== null) {
      var a = r.stateNode;
      (r.tag, (r = a), typeof s == "function" ? s(r) : (s.current = r));
    }
  }
  function bg(r) {
    var s = r.alternate;
    (s !== null && ((r.alternate = null), bg(s)),
      (r.child = null),
      (r.deletions = null),
      (r.sibling = null),
      r.tag === 5 &&
        ((s = r.stateNode),
        s !== null &&
          (delete s[In],
          delete s[to],
          delete s[Oc],
          delete s[s1],
          delete s[i1])),
      (r.stateNode = null),
      (r.return = null),
      (r.dependencies = null),
      (r.memoizedProps = null),
      (r.memoizedState = null),
      (r.pendingProps = null),
      (r.stateNode = null),
      (r.updateQueue = null));
  }
  function Sg(r) {
    return r.tag === 5 || r.tag === 3 || r.tag === 4;
  }
  function Eg(r) {
    e: for (;;) {
      for (; r.sibling === null; ) {
        if (r.return === null || Sg(r.return)) return null;
        r = r.return;
      }
      for (
        r.sibling.return = r.return, r = r.sibling;
        r.tag !== 5 && r.tag !== 6 && r.tag !== 18;
      ) {
        if (r.flags & 2 || r.child === null || r.tag === 4) continue e;
        ((r.child.return = r), (r = r.child));
      }
      if (!(r.flags & 2)) return r.stateNode;
    }
  }
  function dd(r, s, a) {
    var c = r.tag;
    if (c === 5 || c === 6)
      ((r = r.stateNode),
        s
          ? a.nodeType === 8
            ? a.parentNode.insertBefore(r, s)
            : a.insertBefore(r, s)
          : (a.nodeType === 8
              ? ((s = a.parentNode), s.insertBefore(r, a))
              : ((s = a), s.appendChild(r)),
            (a = a._reactRootContainer),
            a != null || s.onclick !== null || (s.onclick = Ta)));
    else if (c !== 4 && ((r = r.child), r !== null))
      for (dd(r, s, a), r = r.sibling; r !== null; )
        (dd(r, s, a), (r = r.sibling));
  }
  function fd(r, s, a) {
    var c = r.tag;
    if (c === 5 || c === 6)
      ((r = r.stateNode), s ? a.insertBefore(r, s) : a.appendChild(r));
    else if (c !== 4 && ((r = r.child), r !== null))
      for (fd(r, s, a), r = r.sibling; r !== null; )
        (fd(r, s, a), (r = r.sibling));
  }
  var dt = null,
    mn = !1;
  function br(r, s, a) {
    for (a = a.child; a !== null; ) (xg(r, s, a), (a = a.sibling));
  }
  function xg(r, s, a) {
    if (Tn && typeof Tn.onCommitFiberUnmount == "function")
      try {
        Tn.onCommitFiberUnmount(ua, a);
      } catch {}
    switch (a.tag) {
      case 5:
        wt || Xs(a, s);
      case 6:
        var c = dt,
          h = mn;
        ((dt = null),
          br(r, s, a),
          (dt = c),
          (mn = h),
          dt !== null &&
            (mn
              ? ((r = dt),
                (a = a.stateNode),
                r.nodeType === 8
                  ? r.parentNode.removeChild(a)
                  : r.removeChild(a))
              : dt.removeChild(a.stateNode)));
        break;
      case 18:
        dt !== null &&
          (mn
            ? ((r = dt),
              (a = a.stateNode),
              r.nodeType === 8
                ? kc(r.parentNode, a)
                : r.nodeType === 1 && kc(r, a),
              Wi(r))
            : kc(dt, a.stateNode));
        break;
      case 4:
        ((c = dt),
          (h = mn),
          (dt = a.stateNode.containerInfo),
          (mn = !0),
          br(r, s, a),
          (dt = c),
          (mn = h));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (
          !wt &&
          ((c = a.updateQueue), c !== null && ((c = c.lastEffect), c !== null))
        ) {
          h = c = c.next;
          do {
            var p = h,
              b = p.destroy;
            ((p = p.tag),
              b !== void 0 && ((p & 2) !== 0 || (p & 4) !== 0) && ud(a, s, b),
              (h = h.next));
          } while (h !== c);
        }
        br(r, s, a);
        break;
      case 1:
        if (
          !wt &&
          (Xs(a, s),
          (c = a.stateNode),
          typeof c.componentWillUnmount == "function")
        )
          try {
            ((c.props = a.memoizedProps),
              (c.state = a.memoizedState),
              c.componentWillUnmount());
          } catch (I) {
            He(a, s, I);
          }
        br(r, s, a);
        break;
      case 21:
        br(r, s, a);
        break;
      case 22:
        a.mode & 1
          ? ((wt = (c = wt) || a.memoizedState !== null), br(r, s, a), (wt = c))
          : br(r, s, a);
        break;
      default:
        br(r, s, a);
    }
  }
  function Cg(r) {
    var s = r.updateQueue;
    if (s !== null) {
      r.updateQueue = null;
      var a = r.stateNode;
      (a === null && (a = r.stateNode = new S1()),
        s.forEach(function (c) {
          var h = j1.bind(null, r, c);
          a.has(c) || (a.add(c), c.then(h, h));
        }));
    }
  }
  function gn(r, s) {
    var a = s.deletions;
    if (a !== null)
      for (var c = 0; c < a.length; c++) {
        var h = a[c];
        try {
          var p = r,
            b = s,
            I = b;
          e: for (; I !== null; ) {
            switch (I.tag) {
              case 5:
                ((dt = I.stateNode), (mn = !1));
                break e;
              case 3:
                ((dt = I.stateNode.containerInfo), (mn = !0));
                break e;
              case 4:
                ((dt = I.stateNode.containerInfo), (mn = !0));
                break e;
            }
            I = I.return;
          }
          if (dt === null) throw Error(n(160));
          (xg(p, b, h), (dt = null), (mn = !1));
          var j = h.alternate;
          (j !== null && (j.return = null), (h.return = null));
        } catch ($) {
          He(h, s, $);
        }
      }
    if (s.subtreeFlags & 12854)
      for (s = s.child; s !== null; ) (kg(s, r), (s = s.sibling));
  }
  function kg(r, s) {
    var a = r.alternate,
      c = r.flags;
    switch (r.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if ((gn(s, r), jn(r), c & 4)) {
          try {
            (ho(3, r, r.return), Ya(3, r));
          } catch (oe) {
            He(r, r.return, oe);
          }
          try {
            ho(5, r, r.return);
          } catch (oe) {
            He(r, r.return, oe);
          }
        }
        break;
      case 1:
        (gn(s, r), jn(r), c & 512 && a !== null && Xs(a, a.return));
        break;
      case 5:
        if (
          (gn(s, r),
          jn(r),
          c & 512 && a !== null && Xs(a, a.return),
          r.flags & 32)
        ) {
          var h = r.stateNode;
          try {
            _i(h, "");
          } catch (oe) {
            He(r, r.return, oe);
          }
        }
        if (c & 4 && ((h = r.stateNode), h != null)) {
          var p = r.memoizedProps,
            b = a !== null ? a.memoizedProps : p,
            I = r.type,
            j = r.updateQueue;
          if (((r.updateQueue = null), j !== null))
            try {
              (I === "input" &&
                p.type === "radio" &&
                p.name != null &&
                Jh(h, p),
                Vu(I, b));
              var $ = Vu(I, p);
              for (b = 0; b < j.length; b += 2) {
                var q = j[b],
                  Y = j[b + 1];
                q === "style"
                  ? ap(h, Y)
                  : q === "dangerouslySetInnerHTML"
                    ? ip(h, Y)
                    : q === "children"
                      ? _i(h, Y)
                      : A(h, q, Y, $);
              }
              switch (I) {
                case "input":
                  Bu(h, p);
                  break;
                case "textarea":
                  np(h, p);
                  break;
                case "select":
                  var G = h._wrapperState.wasMultiple;
                  h._wrapperState.wasMultiple = !!p.multiple;
                  var ne = p.value;
                  ne != null
                    ? As(h, !!p.multiple, ne, !1)
                    : G !== !!p.multiple &&
                      (p.defaultValue != null
                        ? As(h, !!p.multiple, p.defaultValue, !0)
                        : As(h, !!p.multiple, p.multiple ? [] : "", !1));
              }
              h[to] = p;
            } catch (oe) {
              He(r, r.return, oe);
            }
        }
        break;
      case 6:
        if ((gn(s, r), jn(r), c & 4)) {
          if (r.stateNode === null) throw Error(n(162));
          ((h = r.stateNode), (p = r.memoizedProps));
          try {
            h.nodeValue = p;
          } catch (oe) {
            He(r, r.return, oe);
          }
        }
        break;
      case 3:
        if (
          (gn(s, r), jn(r), c & 4 && a !== null && a.memoizedState.isDehydrated)
        )
          try {
            Wi(s.containerInfo);
          } catch (oe) {
            He(r, r.return, oe);
          }
        break;
      case 4:
        (gn(s, r), jn(r));
        break;
      case 13:
        (gn(s, r),
          jn(r),
          (h = r.child),
          h.flags & 8192 &&
            ((p = h.memoizedState !== null),
            (h.stateNode.isHidden = p),
            !p ||
              (h.alternate !== null && h.alternate.memoizedState !== null) ||
              (md = qe())),
          c & 4 && Cg(r));
        break;
      case 22:
        if (
          ((q = a !== null && a.memoizedState !== null),
          r.mode & 1 ? ((wt = ($ = wt) || q), gn(s, r), (wt = $)) : gn(s, r),
          jn(r),
          c & 8192)
        ) {
          if (
            (($ = r.memoizedState !== null),
            (r.stateNode.isHidden = $) && !q && (r.mode & 1) !== 0)
          )
            for (se = r, q = r.child; q !== null; ) {
              for (Y = se = q; se !== null; ) {
                switch (((G = se), (ne = G.child), G.tag)) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    ho(4, G, G.return);
                    break;
                  case 1:
                    Xs(G, G.return);
                    var ie = G.stateNode;
                    if (typeof ie.componentWillUnmount == "function") {
                      ((c = G), (a = G.return));
                      try {
                        ((s = c),
                          (ie.props = s.memoizedProps),
                          (ie.state = s.memoizedState),
                          ie.componentWillUnmount());
                      } catch (oe) {
                        He(c, a, oe);
                      }
                    }
                    break;
                  case 5:
                    Xs(G, G.return);
                    break;
                  case 22:
                    if (G.memoizedState !== null) {
                      Ig(Y);
                      continue;
                    }
                }
                ne !== null ? ((ne.return = G), (se = ne)) : Ig(Y);
              }
              q = q.sibling;
            }
          e: for (q = null, Y = r; ; ) {
            if (Y.tag === 5) {
              if (q === null) {
                q = Y;
                try {
                  ((h = Y.stateNode),
                    $
                      ? ((p = h.style),
                        typeof p.setProperty == "function"
                          ? p.setProperty("display", "none", "important")
                          : (p.display = "none"))
                      : ((I = Y.stateNode),
                        (j = Y.memoizedProps.style),
                        (b =
                          j != null && j.hasOwnProperty("display")
                            ? j.display
                            : null),
                        (I.style.display = op("display", b))));
                } catch (oe) {
                  He(r, r.return, oe);
                }
              }
            } else if (Y.tag === 6) {
              if (q === null)
                try {
                  Y.stateNode.nodeValue = $ ? "" : Y.memoizedProps;
                } catch (oe) {
                  He(r, r.return, oe);
                }
            } else if (
              ((Y.tag !== 22 && Y.tag !== 23) ||
                Y.memoizedState === null ||
                Y === r) &&
              Y.child !== null
            ) {
              ((Y.child.return = Y), (Y = Y.child));
              continue;
            }
            if (Y === r) break e;
            for (; Y.sibling === null; ) {
              if (Y.return === null || Y.return === r) break e;
              (q === Y && (q = null), (Y = Y.return));
            }
            (q === Y && (q = null),
              (Y.sibling.return = Y.return),
              (Y = Y.sibling));
          }
        }
        break;
      case 19:
        (gn(s, r), jn(r), c & 4 && Cg(r));
        break;
      case 21:
        break;
      default:
        (gn(s, r), jn(r));
    }
  }
  function jn(r) {
    var s = r.flags;
    if (s & 2) {
      try {
        e: {
          for (var a = r.return; a !== null; ) {
            if (Sg(a)) {
              var c = a;
              break e;
            }
            a = a.return;
          }
          throw Error(n(160));
        }
        switch (c.tag) {
          case 5:
            var h = c.stateNode;
            c.flags & 32 && (_i(h, ""), (c.flags &= -33));
            var p = Eg(r);
            fd(r, p, h);
            break;
          case 3:
          case 4:
            var b = c.stateNode.containerInfo,
              I = Eg(r);
            dd(r, I, b);
            break;
          default:
            throw Error(n(161));
        }
      } catch (j) {
        He(r, r.return, j);
      }
      r.flags &= -3;
    }
    s & 4096 && (r.flags &= -4097);
  }
  function x1(r, s, a) {
    ((se = r), Og(r));
  }
  function Og(r, s, a) {
    for (var c = (r.mode & 1) !== 0; se !== null; ) {
      var h = se,
        p = h.child;
      if (h.tag === 22 && c) {
        var b = h.memoizedState !== null || Qa;
        if (!b) {
          var I = h.alternate,
            j = (I !== null && I.memoizedState !== null) || wt;
          I = Qa;
          var $ = wt;
          if (((Qa = b), (wt = j) && !$))
            for (se = h; se !== null; )
              ((b = se),
                (j = b.child),
                b.tag === 22 && b.memoizedState !== null
                  ? Mg(h)
                  : j !== null
                    ? ((j.return = b), (se = j))
                    : Mg(h));
          for (; p !== null; ) ((se = p), Og(p), (p = p.sibling));
          ((se = h), (Qa = I), (wt = $));
        }
        Tg(r);
      } else
        (h.subtreeFlags & 8772) !== 0 && p !== null
          ? ((p.return = h), (se = p))
          : Tg(r);
    }
  }
  function Tg(r) {
    for (; se !== null; ) {
      var s = se;
      if ((s.flags & 8772) !== 0) {
        var a = s.alternate;
        try {
          if ((s.flags & 8772) !== 0)
            switch (s.tag) {
              case 0:
              case 11:
              case 15:
                wt || Ya(5, s);
                break;
              case 1:
                var c = s.stateNode;
                if (s.flags & 4 && !wt)
                  if (a === null) c.componentDidMount();
                  else {
                    var h =
                      s.elementType === s.type
                        ? a.memoizedProps
                        : pn(s.type, a.memoizedProps);
                    c.componentDidUpdate(
                      h,
                      a.memoizedState,
                      c.__reactInternalSnapshotBeforeUpdate,
                    );
                  }
                var p = s.updateQueue;
                p !== null && Im(s, p, c);
                break;
              case 3:
                var b = s.updateQueue;
                if (b !== null) {
                  if (((a = null), s.child !== null))
                    switch (s.child.tag) {
                      case 5:
                        a = s.child.stateNode;
                        break;
                      case 1:
                        a = s.child.stateNode;
                    }
                  Im(s, b, a);
                }
                break;
              case 5:
                var I = s.stateNode;
                if (a === null && s.flags & 4) {
                  a = I;
                  var j = s.memoizedProps;
                  switch (s.type) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      j.autoFocus && a.focus();
                      break;
                    case "img":
                      j.src && (a.src = j.src);
                  }
                }
                break;
              case 6:
                break;
              case 4:
                break;
              case 12:
                break;
              case 13:
                if (s.memoizedState === null) {
                  var $ = s.alternate;
                  if ($ !== null) {
                    var q = $.memoizedState;
                    if (q !== null) {
                      var Y = q.dehydrated;
                      Y !== null && Wi(Y);
                    }
                  }
                }
                break;
              case 19:
              case 17:
              case 21:
              case 22:
              case 23:
              case 25:
                break;
              default:
                throw Error(n(163));
            }
          wt || (s.flags & 512 && cd(s));
        } catch (G) {
          He(s, s.return, G);
        }
      }
      if (s === r) {
        se = null;
        break;
      }
      if (((a = s.sibling), a !== null)) {
        ((a.return = s.return), (se = a));
        break;
      }
      se = s.return;
    }
  }
  function Ig(r) {
    for (; se !== null; ) {
      var s = se;
      if (s === r) {
        se = null;
        break;
      }
      var a = s.sibling;
      if (a !== null) {
        ((a.return = s.return), (se = a));
        break;
      }
      se = s.return;
    }
  }
  function Mg(r) {
    for (; se !== null; ) {
      var s = se;
      try {
        switch (s.tag) {
          case 0:
          case 11:
          case 15:
            var a = s.return;
            try {
              Ya(4, s);
            } catch (j) {
              He(s, a, j);
            }
            break;
          case 1:
            var c = s.stateNode;
            if (typeof c.componentDidMount == "function") {
              var h = s.return;
              try {
                c.componentDidMount();
              } catch (j) {
                He(s, h, j);
              }
            }
            var p = s.return;
            try {
              cd(s);
            } catch (j) {
              He(s, p, j);
            }
            break;
          case 5:
            var b = s.return;
            try {
              cd(s);
            } catch (j) {
              He(s, b, j);
            }
        }
      } catch (j) {
        He(s, s.return, j);
      }
      if (s === r) {
        se = null;
        break;
      }
      var I = s.sibling;
      if (I !== null) {
        ((I.return = s.return), (se = I));
        break;
      }
      se = s.return;
    }
  }
  var C1 = Math.ceil,
    Xa = R.ReactCurrentDispatcher,
    hd = R.ReactCurrentOwner,
    rn = R.ReactCurrentBatchConfig,
    Te = 0,
    ot = null,
    Ye = null,
    ft = 0,
    Kt = 0,
    Zs = mr(0),
    Ze = 0,
    po = null,
    es = 0,
    Za = 0,
    pd = 0,
    mo = null,
    Nt = null,
    md = 0,
    Js = 1 / 0,
    Qn = null,
    Ja = !1,
    gd = null,
    Sr = null,
    el = !1,
    Er = null,
    tl = 0,
    go = 0,
    yd = null,
    nl = -1,
    rl = 0;
  function Ot() {
    return (Te & 6) !== 0 ? qe() : nl !== -1 ? nl : (nl = qe());
  }
  function xr(r) {
    return (r.mode & 1) === 0
      ? 1
      : (Te & 2) !== 0 && ft !== 0
        ? ft & -ft
        : a1.transition !== null
          ? (rl === 0 && (rl = Ep()), rl)
          : ((r = je),
            r !== 0 ||
              ((r = window.event), (r = r === void 0 ? 16 : jp(r.type))),
            r);
  }
  function yn(r, s, a, c) {
    if (50 < go) throw ((go = 0), (yd = null), Error(n(185)));
    ($i(r, a, c),
      ((Te & 2) === 0 || r !== ot) &&
        (r === ot && ((Te & 2) === 0 && (Za |= a), Ze === 4 && Cr(r, ft)),
        Pt(r, c),
        a === 1 &&
          Te === 0 &&
          (s.mode & 1) === 0 &&
          ((Js = qe() + 500), ja && yr())));
  }
  function Pt(r, s) {
    var a = r.callbackNode;
    ax(r, s);
    var c = fa(r, r === ot ? ft : 0);
    if (c === 0)
      (a !== null && wp(a), (r.callbackNode = null), (r.callbackPriority = 0));
    else if (((s = c & -c), r.callbackPriority !== s)) {
      if ((a != null && wp(a), s === 1))
        (r.tag === 0 ? o1(jg.bind(null, r)) : gm(jg.bind(null, r)),
          n1(function () {
            (Te & 6) === 0 && yr();
          }),
          (a = null));
      else {
        switch (xp(c)) {
          case 1:
            a = Yu;
            break;
          case 4:
            a = bp;
            break;
          case 16:
            a = la;
            break;
          case 536870912:
            a = Sp;
            break;
          default:
            a = la;
        }
        a = $g(a, Ag.bind(null, r));
      }
      ((r.callbackPriority = s), (r.callbackNode = a));
    }
  }
  function Ag(r, s) {
    if (((nl = -1), (rl = 0), (Te & 6) !== 0)) throw Error(n(327));
    var a = r.callbackNode;
    if (ei() && r.callbackNode !== a) return null;
    var c = fa(r, r === ot ? ft : 0);
    if (c === 0) return null;
    if ((c & 30) !== 0 || (c & r.expiredLanes) !== 0 || s) s = sl(r, c);
    else {
      s = c;
      var h = Te;
      Te |= 2;
      var p = _g();
      (ot !== r || ft !== s) && ((Qn = null), (Js = qe() + 500), ns(r, s));
      do
        try {
          T1();
          break;
        } catch (I) {
          Rg(r, I);
        }
      while (!0);
      (Pc(),
        (Xa.current = p),
        (Te = h),
        Ye !== null ? (s = 0) : ((ot = null), (ft = 0), (s = Ze)));
    }
    if (s !== 0) {
      if (
        (s === 2 && ((h = Xu(r)), h !== 0 && ((c = h), (s = vd(r, h)))),
        s === 1)
      )
        throw ((a = po), ns(r, 0), Cr(r, c), Pt(r, qe()), a);
      if (s === 6) Cr(r, c);
      else {
        if (
          ((h = r.current.alternate),
          (c & 30) === 0 &&
            !k1(h) &&
            ((s = sl(r, c)),
            s === 2 && ((p = Xu(r)), p !== 0 && ((c = p), (s = vd(r, p)))),
            s === 1))
        )
          throw ((a = po), ns(r, 0), Cr(r, c), Pt(r, qe()), a);
        switch (((r.finishedWork = h), (r.finishedLanes = c), s)) {
          case 0:
          case 1:
            throw Error(n(345));
          case 2:
            rs(r, Nt, Qn);
            break;
          case 3:
            if (
              (Cr(r, c),
              (c & 130023424) === c && ((s = md + 500 - qe()), 10 < s))
            ) {
              if (fa(r, 0) !== 0) break;
              if (((h = r.suspendedLanes), (h & c) !== c)) {
                (Ot(), (r.pingedLanes |= r.suspendedLanes & h));
                break;
              }
              r.timeoutHandle = Cc(rs.bind(null, r, Nt, Qn), s);
              break;
            }
            rs(r, Nt, Qn);
            break;
          case 4:
            if ((Cr(r, c), (c & 4194240) === c)) break;
            for (s = r.eventTimes, h = -1; 0 < c; ) {
              var b = 31 - dn(c);
              ((p = 1 << b), (b = s[b]), b > h && (h = b), (c &= ~p));
            }
            if (
              ((c = h),
              (c = qe() - c),
              (c =
                (120 > c
                  ? 120
                  : 480 > c
                    ? 480
                    : 1080 > c
                      ? 1080
                      : 1920 > c
                        ? 1920
                        : 3e3 > c
                          ? 3e3
                          : 4320 > c
                            ? 4320
                            : 1960 * C1(c / 1960)) - c),
              10 < c)
            ) {
              r.timeoutHandle = Cc(rs.bind(null, r, Nt, Qn), c);
              break;
            }
            rs(r, Nt, Qn);
            break;
          case 5:
            rs(r, Nt, Qn);
            break;
          default:
            throw Error(n(329));
        }
      }
    }
    return (Pt(r, qe()), r.callbackNode === a ? Ag.bind(null, r) : null);
  }
  function vd(r, s) {
    var a = mo;
    return (
      r.current.memoizedState.isDehydrated && (ns(r, s).flags |= 256),
      (r = sl(r, s)),
      r !== 2 && ((s = Nt), (Nt = a), s !== null && wd(s)),
      r
    );
  }
  function wd(r) {
    Nt === null ? (Nt = r) : Nt.push.apply(Nt, r);
  }
  function k1(r) {
    for (var s = r; ; ) {
      if (s.flags & 16384) {
        var a = s.updateQueue;
        if (a !== null && ((a = a.stores), a !== null))
          for (var c = 0; c < a.length; c++) {
            var h = a[c],
              p = h.getSnapshot;
            h = h.value;
            try {
              if (!fn(p(), h)) return !1;
            } catch {
              return !1;
            }
          }
      }
      if (((a = s.child), s.subtreeFlags & 16384 && a !== null))
        ((a.return = s), (s = a));
      else {
        if (s === r) break;
        for (; s.sibling === null; ) {
          if (s.return === null || s.return === r) return !0;
          s = s.return;
        }
        ((s.sibling.return = s.return), (s = s.sibling));
      }
    }
    return !0;
  }
  function Cr(r, s) {
    for (
      s &= ~pd,
        s &= ~Za,
        r.suspendedLanes |= s,
        r.pingedLanes &= ~s,
        r = r.expirationTimes;
      0 < s;
    ) {
      var a = 31 - dn(s),
        c = 1 << a;
      ((r[a] = -1), (s &= ~c));
    }
  }
  function jg(r) {
    if ((Te & 6) !== 0) throw Error(n(327));
    ei();
    var s = fa(r, 0);
    if ((s & 1) === 0) return (Pt(r, qe()), null);
    var a = sl(r, s);
    if (r.tag !== 0 && a === 2) {
      var c = Xu(r);
      c !== 0 && ((s = c), (a = vd(r, c)));
    }
    if (a === 1) throw ((a = po), ns(r, 0), Cr(r, s), Pt(r, qe()), a);
    if (a === 6) throw Error(n(345));
    return (
      (r.finishedWork = r.current.alternate),
      (r.finishedLanes = s),
      rs(r, Nt, Qn),
      Pt(r, qe()),
      null
    );
  }
  function bd(r, s) {
    var a = Te;
    Te |= 1;
    try {
      return r(s);
    } finally {
      ((Te = a), Te === 0 && ((Js = qe() + 500), ja && yr()));
    }
  }
  function ts(r) {
    Er !== null && Er.tag === 0 && (Te & 6) === 0 && ei();
    var s = Te;
    Te |= 1;
    var a = rn.transition,
      c = je;
    try {
      if (((rn.transition = null), (je = 1), r)) return r();
    } finally {
      ((je = c), (rn.transition = a), (Te = s), (Te & 6) === 0 && yr());
    }
  }
  function Sd() {
    ((Kt = Zs.current), Be(Zs));
  }
  function ns(r, s) {
    ((r.finishedWork = null), (r.finishedLanes = 0));
    var a = r.timeoutHandle;
    if ((a !== -1 && ((r.timeoutHandle = -1), t1(a)), Ye !== null))
      for (a = Ye.return; a !== null; ) {
        var c = a;
        switch ((Ac(c), c.tag)) {
          case 1:
            ((c = c.type.childContextTypes), c != null && Ma());
            break;
          case 3:
            (Qs(), Be(jt), Be(gt), Vc());
            break;
          case 5:
            Fc(c);
            break;
          case 4:
            Qs();
            break;
          case 13:
            Be(Ue);
            break;
          case 19:
            Be(Ue);
            break;
          case 10:
            Dc(c.type._context);
            break;
          case 22:
          case 23:
            Sd();
        }
        a = a.return;
      }
    if (
      ((ot = r),
      (Ye = r = kr(r.current, null)),
      (ft = Kt = s),
      (Ze = 0),
      (po = null),
      (pd = Za = es = 0),
      (Nt = mo = null),
      Xr !== null)
    ) {
      for (s = 0; s < Xr.length; s++)
        if (((a = Xr[s]), (c = a.interleaved), c !== null)) {
          a.interleaved = null;
          var h = c.next,
            p = a.pending;
          if (p !== null) {
            var b = p.next;
            ((p.next = h), (c.next = b));
          }
          a.pending = c;
        }
      Xr = null;
    }
    return r;
  }
  function Rg(r, s) {
    do {
      var a = Ye;
      try {
        if ((Pc(), (Fa.current = Ha), Ua)) {
          for (var c = Ve.memoizedState; c !== null; ) {
            var h = c.queue;
            (h !== null && (h.pending = null), (c = c.next));
          }
          Ua = !1;
        }
        if (
          ((Jr = 0),
          (it = Xe = Ve = null),
          (ao = !1),
          (lo = 0),
          (hd.current = null),
          a === null || a.return === null)
        ) {
          ((Ze = 1), (po = s), (Ye = null));
          break;
        }
        e: {
          var p = r,
            b = a.return,
            I = a,
            j = s;
          if (
            ((s = ft),
            (I.flags |= 32768),
            j !== null && typeof j == "object" && typeof j.then == "function")
          ) {
            var $ = j,
              q = I,
              Y = q.tag;
            if ((q.mode & 1) === 0 && (Y === 0 || Y === 11 || Y === 15)) {
              var G = q.alternate;
              G
                ? ((q.updateQueue = G.updateQueue),
                  (q.memoizedState = G.memoizedState),
                  (q.lanes = G.lanes))
                : ((q.updateQueue = null), (q.memoizedState = null));
            }
            var ne = rg(b);
            if (ne !== null) {
              ((ne.flags &= -257),
                sg(ne, b, I, p, s),
                ne.mode & 1 && ng(p, $, s),
                (s = ne),
                (j = $));
              var ie = s.updateQueue;
              if (ie === null) {
                var oe = new Set();
                (oe.add(j), (s.updateQueue = oe));
              } else ie.add(j);
              break e;
            } else {
              if ((s & 1) === 0) {
                (ng(p, $, s), Ed());
                break e;
              }
              j = Error(n(426));
            }
          } else if (Fe && I.mode & 1) {
            var Qe = rg(b);
            if (Qe !== null) {
              ((Qe.flags & 65536) === 0 && (Qe.flags |= 256),
                sg(Qe, b, I, p, s),
                _c(Ys(j, I)));
              break e;
            }
          }
          ((p = j = Ys(j, I)),
            Ze !== 4 && (Ze = 2),
            mo === null ? (mo = [p]) : mo.push(p),
            (p = b));
          do {
            switch (p.tag) {
              case 3:
                ((p.flags |= 65536), (s &= -s), (p.lanes |= s));
                var D = eg(p, j, s);
                Tm(p, D);
                break e;
              case 1:
                I = j;
                var _ = p.type,
                  L = p.stateNode;
                if (
                  (p.flags & 128) === 0 &&
                  (typeof _.getDerivedStateFromError == "function" ||
                    (L !== null &&
                      typeof L.componentDidCatch == "function" &&
                      (Sr === null || !Sr.has(L))))
                ) {
                  ((p.flags |= 65536), (s &= -s), (p.lanes |= s));
                  var X = tg(p, I, s);
                  Tm(p, X);
                  break e;
                }
            }
            p = p.return;
          } while (p !== null);
        }
        Pg(a);
      } catch (le) {
        ((s = le), Ye === a && a !== null && (Ye = a = a.return));
        continue;
      }
      break;
    } while (!0);
  }
  function _g() {
    var r = Xa.current;
    return ((Xa.current = Ha), r === null ? Ha : r);
  }
  function Ed() {
    ((Ze === 0 || Ze === 3 || Ze === 2) && (Ze = 4),
      ot === null ||
        ((es & 268435455) === 0 && (Za & 268435455) === 0) ||
        Cr(ot, ft));
  }
  function sl(r, s) {
    var a = Te;
    Te |= 2;
    var c = _g();
    (ot !== r || ft !== s) && ((Qn = null), ns(r, s));
    do
      try {
        O1();
        break;
      } catch (h) {
        Rg(r, h);
      }
    while (!0);
    if ((Pc(), (Te = a), (Xa.current = c), Ye !== null)) throw Error(n(261));
    return ((ot = null), (ft = 0), Ze);
  }
  function O1() {
    for (; Ye !== null; ) Ng(Ye);
  }
  function T1() {
    for (; Ye !== null && !ZE(); ) Ng(Ye);
  }
  function Ng(r) {
    var s = Bg(r.alternate, r, Kt);
    ((r.memoizedProps = r.pendingProps),
      s === null ? Pg(r) : (Ye = s),
      (hd.current = null));
  }
  function Pg(r) {
    var s = r;
    do {
      var a = s.alternate;
      if (((r = s.return), (s.flags & 32768) === 0)) {
        if (((a = w1(a, s, Kt)), a !== null)) {
          Ye = a;
          return;
        }
      } else {
        if (((a = b1(a, s)), a !== null)) {
          ((a.flags &= 32767), (Ye = a));
          return;
        }
        if (r !== null)
          ((r.flags |= 32768), (r.subtreeFlags = 0), (r.deletions = null));
        else {
          ((Ze = 6), (Ye = null));
          return;
        }
      }
      if (((s = s.sibling), s !== null)) {
        Ye = s;
        return;
      }
      Ye = s = r;
    } while (s !== null);
    Ze === 0 && (Ze = 5);
  }
  function rs(r, s, a) {
    var c = je,
      h = rn.transition;
    try {
      ((rn.transition = null), (je = 1), I1(r, s, a, c));
    } finally {
      ((rn.transition = h), (je = c));
    }
    return null;
  }
  function I1(r, s, a, c) {
    do ei();
    while (Er !== null);
    if ((Te & 6) !== 0) throw Error(n(327));
    a = r.finishedWork;
    var h = r.finishedLanes;
    if (a === null) return null;
    if (((r.finishedWork = null), (r.finishedLanes = 0), a === r.current))
      throw Error(n(177));
    ((r.callbackNode = null), (r.callbackPriority = 0));
    var p = a.lanes | a.childLanes;
    if (
      (lx(r, p),
      r === ot && ((Ye = ot = null), (ft = 0)),
      ((a.subtreeFlags & 2064) === 0 && (a.flags & 2064) === 0) ||
        el ||
        ((el = !0),
        $g(la, function () {
          return (ei(), null);
        })),
      (p = (a.flags & 15990) !== 0),
      (a.subtreeFlags & 15990) !== 0 || p)
    ) {
      ((p = rn.transition), (rn.transition = null));
      var b = je;
      je = 1;
      var I = Te;
      ((Te |= 4),
        (hd.current = null),
        E1(r, a),
        kg(a, r),
        qx(Ec),
        (ma = !!Sc),
        (Ec = Sc = null),
        (r.current = a),
        x1(a),
        JE(),
        (Te = I),
        (je = b),
        (rn.transition = p));
    } else r.current = a;
    if (
      (el && ((el = !1), (Er = r), (tl = h)),
      (p = r.pendingLanes),
      p === 0 && (Sr = null),
      nx(a.stateNode),
      Pt(r, qe()),
      s !== null)
    )
      for (c = r.onRecoverableError, a = 0; a < s.length; a++)
        ((h = s[a]), c(h.value, { componentStack: h.stack, digest: h.digest }));
    if (Ja) throw ((Ja = !1), (r = gd), (gd = null), r);
    return (
      (tl & 1) !== 0 && r.tag !== 0 && ei(),
      (p = r.pendingLanes),
      (p & 1) !== 0 ? (r === yd ? go++ : ((go = 0), (yd = r))) : (go = 0),
      yr(),
      null
    );
  }
  function ei() {
    if (Er !== null) {
      var r = xp(tl),
        s = rn.transition,
        a = je;
      try {
        if (((rn.transition = null), (je = 16 > r ? 16 : r), Er === null))
          var c = !1;
        else {
          if (((r = Er), (Er = null), (tl = 0), (Te & 6) !== 0))
            throw Error(n(331));
          var h = Te;
          for (Te |= 4, se = r.current; se !== null; ) {
            var p = se,
              b = p.child;
            if ((se.flags & 16) !== 0) {
              var I = p.deletions;
              if (I !== null) {
                for (var j = 0; j < I.length; j++) {
                  var $ = I[j];
                  for (se = $; se !== null; ) {
                    var q = se;
                    switch (q.tag) {
                      case 0:
                      case 11:
                      case 15:
                        ho(8, q, p);
                    }
                    var Y = q.child;
                    if (Y !== null) ((Y.return = q), (se = Y));
                    else
                      for (; se !== null; ) {
                        q = se;
                        var G = q.sibling,
                          ne = q.return;
                        if ((bg(q), q === $)) {
                          se = null;
                          break;
                        }
                        if (G !== null) {
                          ((G.return = ne), (se = G));
                          break;
                        }
                        se = ne;
                      }
                  }
                }
                var ie = p.alternate;
                if (ie !== null) {
                  var oe = ie.child;
                  if (oe !== null) {
                    ie.child = null;
                    do {
                      var Qe = oe.sibling;
                      ((oe.sibling = null), (oe = Qe));
                    } while (oe !== null);
                  }
                }
                se = p;
              }
            }
            if ((p.subtreeFlags & 2064) !== 0 && b !== null)
              ((b.return = p), (se = b));
            else
              e: for (; se !== null; ) {
                if (((p = se), (p.flags & 2048) !== 0))
                  switch (p.tag) {
                    case 0:
                    case 11:
                    case 15:
                      ho(9, p, p.return);
                  }
                var D = p.sibling;
                if (D !== null) {
                  ((D.return = p.return), (se = D));
                  break e;
                }
                se = p.return;
              }
          }
          var _ = r.current;
          for (se = _; se !== null; ) {
            b = se;
            var L = b.child;
            if ((b.subtreeFlags & 2064) !== 0 && L !== null)
              ((L.return = b), (se = L));
            else
              e: for (b = _; se !== null; ) {
                if (((I = se), (I.flags & 2048) !== 0))
                  try {
                    switch (I.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Ya(9, I);
                    }
                  } catch (le) {
                    He(I, I.return, le);
                  }
                if (I === b) {
                  se = null;
                  break e;
                }
                var X = I.sibling;
                if (X !== null) {
                  ((X.return = I.return), (se = X));
                  break e;
                }
                se = I.return;
              }
          }
          if (
            ((Te = h),
            yr(),
            Tn && typeof Tn.onPostCommitFiberRoot == "function")
          )
            try {
              Tn.onPostCommitFiberRoot(ua, r);
            } catch {}
          c = !0;
        }
        return c;
      } finally {
        ((je = a), (rn.transition = s));
      }
    }
    return !1;
  }
  function Dg(r, s, a) {
    ((s = Ys(a, s)),
      (s = eg(r, s, 1)),
      (r = wr(r, s, 1)),
      (s = Ot()),
      r !== null && ($i(r, 1, s), Pt(r, s)));
  }
  function He(r, s, a) {
    if (r.tag === 3) Dg(r, r, a);
    else
      for (; s !== null; ) {
        if (s.tag === 3) {
          Dg(s, r, a);
          break;
        } else if (s.tag === 1) {
          var c = s.stateNode;
          if (
            typeof s.type.getDerivedStateFromError == "function" ||
            (typeof c.componentDidCatch == "function" &&
              (Sr === null || !Sr.has(c)))
          ) {
            ((r = Ys(a, r)),
              (r = tg(s, r, 1)),
              (s = wr(s, r, 1)),
              (r = Ot()),
              s !== null && ($i(s, 1, r), Pt(s, r)));
            break;
          }
        }
        s = s.return;
      }
  }
  function M1(r, s, a) {
    var c = r.pingCache;
    (c !== null && c.delete(s),
      (s = Ot()),
      (r.pingedLanes |= r.suspendedLanes & a),
      ot === r &&
        (ft & a) === a &&
        (Ze === 4 || (Ze === 3 && (ft & 130023424) === ft && 500 > qe() - md)
          ? ns(r, 0)
          : (pd |= a)),
      Pt(r, s));
  }
  function Lg(r, s) {
    s === 0 &&
      ((r.mode & 1) === 0
        ? (s = 1)
        : ((s = da), (da <<= 1), (da & 130023424) === 0 && (da = 4194304)));
    var a = Ot();
    ((r = Kn(r, s)), r !== null && ($i(r, s, a), Pt(r, a)));
  }
  function A1(r) {
    var s = r.memoizedState,
      a = 0;
    (s !== null && (a = s.retryLane), Lg(r, a));
  }
  function j1(r, s) {
    var a = 0;
    switch (r.tag) {
      case 13:
        var c = r.stateNode,
          h = r.memoizedState;
        h !== null && (a = h.retryLane);
        break;
      case 19:
        c = r.stateNode;
        break;
      default:
        throw Error(n(314));
    }
    (c !== null && c.delete(s), Lg(r, a));
  }
  var Bg;
  Bg = function (r, s, a) {
    if (r !== null)
      if (r.memoizedProps !== s.pendingProps || jt.current) _t = !0;
      else {
        if ((r.lanes & a) === 0 && (s.flags & 128) === 0)
          return ((_t = !1), v1(r, s, a));
        _t = (r.flags & 131072) !== 0;
      }
    else ((_t = !1), Fe && (s.flags & 1048576) !== 0 && ym(s, _a, s.index));
    switch (((s.lanes = 0), s.tag)) {
      case 2:
        var c = s.type;
        (qa(r, s), (r = s.pendingProps));
        var h = Us(s, gt.current);
        (qs(s, a), (h = Kc(null, s, c, r, h, a)));
        var p = Gc();
        return (
          (s.flags |= 1),
          typeof h == "object" &&
          h !== null &&
          typeof h.render == "function" &&
          h.$$typeof === void 0
            ? ((s.tag = 1),
              (s.memoizedState = null),
              (s.updateQueue = null),
              Rt(c) ? ((p = !0), Aa(s)) : (p = !1),
              (s.memoizedState =
                h.state !== null && h.state !== void 0 ? h.state : null),
              $c(s),
              (h.updater = Ka),
              (s.stateNode = h),
              (h._reactInternals = s),
              Jc(s, c, r, a),
              (s = rd(null, s, c, !0, p, a)))
            : ((s.tag = 0), Fe && p && Mc(s), kt(null, s, h, a), (s = s.child)),
          s
        );
      case 16:
        c = s.elementType;
        e: {
          switch (
            (qa(r, s),
            (r = s.pendingProps),
            (h = c._init),
            (c = h(c._payload)),
            (s.type = c),
            (h = s.tag = _1(c)),
            (r = pn(c, r)),
            h)
          ) {
            case 0:
              s = nd(null, s, c, r, a);
              break e;
            case 1:
              s = cg(null, s, c, r, a);
              break e;
            case 11:
              s = ig(null, s, c, r, a);
              break e;
            case 14:
              s = og(null, s, c, pn(c.type, r), a);
              break e;
          }
          throw Error(n(306, c, ""));
        }
        return s;
      case 0:
        return (
          (c = s.type),
          (h = s.pendingProps),
          (h = s.elementType === c ? h : pn(c, h)),
          nd(r, s, c, h, a)
        );
      case 1:
        return (
          (c = s.type),
          (h = s.pendingProps),
          (h = s.elementType === c ? h : pn(c, h)),
          cg(r, s, c, h, a)
        );
      case 3:
        e: {
          if ((dg(s), r === null)) throw Error(n(387));
          ((c = s.pendingProps),
            (p = s.memoizedState),
            (h = p.element),
            Om(r, s),
            $a(s, c, null, a));
          var b = s.memoizedState;
          if (((c = b.element), p.isDehydrated))
            if (
              ((p = {
                element: c,
                isDehydrated: !1,
                cache: b.cache,
                pendingSuspenseBoundaries: b.pendingSuspenseBoundaries,
                transitions: b.transitions,
              }),
              (s.updateQueue.baseState = p),
              (s.memoizedState = p),
              s.flags & 256)
            ) {
              ((h = Ys(Error(n(423)), s)), (s = fg(r, s, c, a, h)));
              break e;
            } else if (c !== h) {
              ((h = Ys(Error(n(424)), s)), (s = fg(r, s, c, a, h)));
              break e;
            } else
              for (
                Ht = pr(s.stateNode.containerInfo.firstChild),
                  Wt = s,
                  Fe = !0,
                  hn = null,
                  a = Cm(s, null, c, a),
                  s.child = a;
                a;
              )
                ((a.flags = (a.flags & -3) | 4096), (a = a.sibling));
          else {
            if ((Hs(), c === h)) {
              s = qn(r, s, a);
              break e;
            }
            kt(r, s, c, a);
          }
          s = s.child;
        }
        return s;
      case 5:
        return (
          Mm(s),
          r === null && Rc(s),
          (c = s.type),
          (h = s.pendingProps),
          (p = r !== null ? r.memoizedProps : null),
          (b = h.children),
          xc(c, h) ? (b = null) : p !== null && xc(c, p) && (s.flags |= 32),
          ug(r, s),
          kt(r, s, b, a),
          s.child
        );
      case 6:
        return (r === null && Rc(s), null);
      case 13:
        return hg(r, s, a);
      case 4:
        return (
          zc(s, s.stateNode.containerInfo),
          (c = s.pendingProps),
          r === null ? (s.child = Ks(s, null, c, a)) : kt(r, s, c, a),
          s.child
        );
      case 11:
        return (
          (c = s.type),
          (h = s.pendingProps),
          (h = s.elementType === c ? h : pn(c, h)),
          ig(r, s, c, h, a)
        );
      case 7:
        return (kt(r, s, s.pendingProps, a), s.child);
      case 8:
        return (kt(r, s, s.pendingProps.children, a), s.child);
      case 12:
        return (kt(r, s, s.pendingProps.children, a), s.child);
      case 10:
        e: {
          if (
            ((c = s.type._context),
            (h = s.pendingProps),
            (p = s.memoizedProps),
            (b = h.value),
            _e(Da, c._currentValue),
            (c._currentValue = b),
            p !== null)
          )
            if (fn(p.value, b)) {
              if (p.children === h.children && !jt.current) {
                s = qn(r, s, a);
                break e;
              }
            } else
              for (p = s.child, p !== null && (p.return = s); p !== null; ) {
                var I = p.dependencies;
                if (I !== null) {
                  b = p.child;
                  for (var j = I.firstContext; j !== null; ) {
                    if (j.context === c) {
                      if (p.tag === 1) {
                        ((j = Gn(-1, a & -a)), (j.tag = 2));
                        var $ = p.updateQueue;
                        if ($ !== null) {
                          $ = $.shared;
                          var q = $.pending;
                          (q === null
                            ? (j.next = j)
                            : ((j.next = q.next), (q.next = j)),
                            ($.pending = j));
                        }
                      }
                      ((p.lanes |= a),
                        (j = p.alternate),
                        j !== null && (j.lanes |= a),
                        Lc(p.return, a, s),
                        (I.lanes |= a));
                      break;
                    }
                    j = j.next;
                  }
                } else if (p.tag === 10) b = p.type === s.type ? null : p.child;
                else if (p.tag === 18) {
                  if (((b = p.return), b === null)) throw Error(n(341));
                  ((b.lanes |= a),
                    (I = b.alternate),
                    I !== null && (I.lanes |= a),
                    Lc(b, a, s),
                    (b = p.sibling));
                } else b = p.child;
                if (b !== null) b.return = p;
                else
                  for (b = p; b !== null; ) {
                    if (b === s) {
                      b = null;
                      break;
                    }
                    if (((p = b.sibling), p !== null)) {
                      ((p.return = b.return), (b = p));
                      break;
                    }
                    b = b.return;
                  }
                p = b;
              }
          (kt(r, s, h.children, a), (s = s.child));
        }
        return s;
      case 9:
        return (
          (h = s.type),
          (c = s.pendingProps.children),
          qs(s, a),
          (h = tn(h)),
          (c = c(h)),
          (s.flags |= 1),
          kt(r, s, c, a),
          s.child
        );
      case 14:
        return (
          (c = s.type),
          (h = pn(c, s.pendingProps)),
          (h = pn(c.type, h)),
          og(r, s, c, h, a)
        );
      case 15:
        return ag(r, s, s.type, s.pendingProps, a);
      case 17:
        return (
          (c = s.type),
          (h = s.pendingProps),
          (h = s.elementType === c ? h : pn(c, h)),
          qa(r, s),
          (s.tag = 1),
          Rt(c) ? ((r = !0), Aa(s)) : (r = !1),
          qs(s, a),
          Zm(s, c, h),
          Jc(s, c, h, a),
          rd(null, s, c, !0, r, a)
        );
      case 19:
        return mg(r, s, a);
      case 22:
        return lg(r, s, a);
    }
    throw Error(n(156, s.tag));
  };
  function $g(r, s) {
    return vp(r, s);
  }
  function R1(r, s, a, c) {
    ((this.tag = r),
      (this.key = a),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.ref = null),
      (this.pendingProps = s),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = c),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function sn(r, s, a, c) {
    return new R1(r, s, a, c);
  }
  function xd(r) {
    return ((r = r.prototype), !(!r || !r.isReactComponent));
  }
  function _1(r) {
    if (typeof r == "function") return xd(r) ? 1 : 0;
    if (r != null) {
      if (((r = r.$$typeof), r === Q)) return 11;
      if (r === ye) return 14;
    }
    return 2;
  }
  function kr(r, s) {
    var a = r.alternate;
    return (
      a === null
        ? ((a = sn(r.tag, s, r.key, r.mode)),
          (a.elementType = r.elementType),
          (a.type = r.type),
          (a.stateNode = r.stateNode),
          (a.alternate = r),
          (r.alternate = a))
        : ((a.pendingProps = s),
          (a.type = r.type),
          (a.flags = 0),
          (a.subtreeFlags = 0),
          (a.deletions = null)),
      (a.flags = r.flags & 14680064),
      (a.childLanes = r.childLanes),
      (a.lanes = r.lanes),
      (a.child = r.child),
      (a.memoizedProps = r.memoizedProps),
      (a.memoizedState = r.memoizedState),
      (a.updateQueue = r.updateQueue),
      (s = r.dependencies),
      (a.dependencies =
        s === null ? null : { lanes: s.lanes, firstContext: s.firstContext }),
      (a.sibling = r.sibling),
      (a.index = r.index),
      (a.ref = r.ref),
      a
    );
  }
  function il(r, s, a, c, h, p) {
    var b = 2;
    if (((c = r), typeof r == "function")) xd(r) && (b = 1);
    else if (typeof r == "string") b = 5;
    else
      e: switch (r) {
        case U:
          return ss(a.children, h, p, s);
        case z:
          ((b = 8), (h |= 8));
          break;
        case B:
          return (
            (r = sn(12, a, s, h | 2)),
            (r.elementType = B),
            (r.lanes = p),
            r
          );
        case J:
          return ((r = sn(13, a, s, h)), (r.elementType = J), (r.lanes = p), r);
        case ae:
          return (
            (r = sn(19, a, s, h)),
            (r.elementType = ae),
            (r.lanes = p),
            r
          );
        case ce:
          return ol(a, h, p, s);
        default:
          if (typeof r == "object" && r !== null)
            switch (r.$$typeof) {
              case H:
                b = 10;
                break e;
              case ee:
                b = 9;
                break e;
              case Q:
                b = 11;
                break e;
              case ye:
                b = 14;
                break e;
              case ue:
                ((b = 16), (c = null));
                break e;
            }
          throw Error(n(130, r == null ? r : typeof r, ""));
      }
    return (
      (s = sn(b, a, s, h)),
      (s.elementType = r),
      (s.type = c),
      (s.lanes = p),
      s
    );
  }
  function ss(r, s, a, c) {
    return ((r = sn(7, r, c, s)), (r.lanes = a), r);
  }
  function ol(r, s, a, c) {
    return (
      (r = sn(22, r, c, s)),
      (r.elementType = ce),
      (r.lanes = a),
      (r.stateNode = { isHidden: !1 }),
      r
    );
  }
  function Cd(r, s, a) {
    return ((r = sn(6, r, null, s)), (r.lanes = a), r);
  }
  function kd(r, s, a) {
    return (
      (s = sn(4, r.children !== null ? r.children : [], r.key, s)),
      (s.lanes = a),
      (s.stateNode = {
        containerInfo: r.containerInfo,
        pendingChildren: null,
        implementation: r.implementation,
      }),
      s
    );
  }
  function N1(r, s, a, c, h) {
    ((this.tag = s),
      (this.containerInfo = r),
      (this.finishedWork =
        this.pingCache =
        this.current =
        this.pendingChildren =
          null),
      (this.timeoutHandle = -1),
      (this.callbackNode = this.pendingContext = this.context = null),
      (this.callbackPriority = 0),
      (this.eventTimes = Zu(0)),
      (this.expirationTimes = Zu(-1)),
      (this.entangledLanes =
        this.finishedLanes =
        this.mutableReadLanes =
        this.expiredLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Zu(0)),
      (this.identifierPrefix = c),
      (this.onRecoverableError = h),
      (this.mutableSourceEagerHydrationData = null));
  }
  function Od(r, s, a, c, h, p, b, I, j) {
    return (
      (r = new N1(r, s, a, I, j)),
      s === 1 ? ((s = 1), p === !0 && (s |= 8)) : (s = 0),
      (p = sn(3, null, null, s)),
      (r.current = p),
      (p.stateNode = r),
      (p.memoizedState = {
        element: c,
        isDehydrated: a,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null,
      }),
      $c(p),
      r
    );
  }
  function P1(r, s, a) {
    var c =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: V,
      key: c == null ? null : "" + c,
      children: r,
      containerInfo: s,
      implementation: a,
    };
  }
  function zg(r) {
    if (!r) return gr;
    r = r._reactInternals;
    e: {
      if (Kr(r) !== r || r.tag !== 1) throw Error(n(170));
      var s = r;
      do {
        switch (s.tag) {
          case 3:
            s = s.stateNode.context;
            break e;
          case 1:
            if (Rt(s.type)) {
              s = s.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        s = s.return;
      } while (s !== null);
      throw Error(n(171));
    }
    if (r.tag === 1) {
      var a = r.type;
      if (Rt(a)) return pm(r, a, s);
    }
    return s;
  }
  function Fg(r, s, a, c, h, p, b, I, j) {
    return (
      (r = Od(a, c, !0, r, h, p, b, I, j)),
      (r.context = zg(null)),
      (a = r.current),
      (c = Ot()),
      (h = xr(a)),
      (p = Gn(c, h)),
      (p.callback = s ?? null),
      wr(a, p, h),
      (r.current.lanes = h),
      $i(r, h, c),
      Pt(r, c),
      r
    );
  }
  function al(r, s, a, c) {
    var h = s.current,
      p = Ot(),
      b = xr(h);
    return (
      (a = zg(a)),
      s.context === null ? (s.context = a) : (s.pendingContext = a),
      (s = Gn(p, b)),
      (s.payload = { element: r }),
      (c = c === void 0 ? null : c),
      c !== null && (s.callback = c),
      (r = wr(h, s, b)),
      r !== null && (yn(r, h, b, p), Ba(r, h, b)),
      b
    );
  }
  function ll(r) {
    return (
      (r = r.current),
      r.child ? (r.child.tag === 5, r.child.stateNode) : null
    );
  }
  function Ug(r, s) {
    if (((r = r.memoizedState), r !== null && r.dehydrated !== null)) {
      var a = r.retryLane;
      r.retryLane = a !== 0 && a < s ? a : s;
    }
  }
  function Td(r, s) {
    (Ug(r, s), (r = r.alternate) && Ug(r, s));
  }
  function D1() {
    return null;
  }
  var Vg =
    typeof reportError == "function"
      ? reportError
      : function (r) {
          console.error(r);
        };
  function Id(r) {
    this._internalRoot = r;
  }
  ((ul.prototype.render = Id.prototype.render =
    function (r) {
      var s = this._internalRoot;
      if (s === null) throw Error(n(409));
      al(r, s, null, null);
    }),
    (ul.prototype.unmount = Id.prototype.unmount =
      function () {
        var r = this._internalRoot;
        if (r !== null) {
          this._internalRoot = null;
          var s = r.containerInfo;
          (ts(function () {
            al(null, r, null, null);
          }),
            (s[Un] = null));
        }
      }));
  function ul(r) {
    this._internalRoot = r;
  }
  ul.prototype.unstable_scheduleHydration = function (r) {
    if (r) {
      var s = Op();
      r = { blockedOn: null, target: r, priority: s };
      for (var a = 0; a < dr.length && s !== 0 && s < dr[a].priority; a++);
      (dr.splice(a, 0, r), a === 0 && Mp(r));
    }
  };
  function Md(r) {
    return !(!r || (r.nodeType !== 1 && r.nodeType !== 9 && r.nodeType !== 11));
  }
  function cl(r) {
    return !(
      !r ||
      (r.nodeType !== 1 &&
        r.nodeType !== 9 &&
        r.nodeType !== 11 &&
        (r.nodeType !== 8 || r.nodeValue !== " react-mount-point-unstable "))
    );
  }
  function Wg() {}
  function L1(r, s, a, c, h) {
    if (h) {
      if (typeof c == "function") {
        var p = c;
        c = function () {
          var $ = ll(b);
          p.call($);
        };
      }
      var b = Fg(s, c, r, 0, null, !1, !1, "", Wg);
      return (
        (r._reactRootContainer = b),
        (r[Un] = b.current),
        Ji(r.nodeType === 8 ? r.parentNode : r),
        ts(),
        b
      );
    }
    for (; (h = r.lastChild); ) r.removeChild(h);
    if (typeof c == "function") {
      var I = c;
      c = function () {
        var $ = ll(j);
        I.call($);
      };
    }
    var j = Od(r, 0, !1, null, null, !1, !1, "", Wg);
    return (
      (r._reactRootContainer = j),
      (r[Un] = j.current),
      Ji(r.nodeType === 8 ? r.parentNode : r),
      ts(function () {
        al(s, j, a, c);
      }),
      j
    );
  }
  function dl(r, s, a, c, h) {
    var p = a._reactRootContainer;
    if (p) {
      var b = p;
      if (typeof h == "function") {
        var I = h;
        h = function () {
          var j = ll(b);
          I.call(j);
        };
      }
      al(s, b, r, h);
    } else b = L1(a, s, r, h, c);
    return ll(b);
  }
  ((Cp = function (r) {
    switch (r.tag) {
      case 3:
        var s = r.stateNode;
        if (s.current.memoizedState.isDehydrated) {
          var a = Bi(s.pendingLanes);
          a !== 0 &&
            (Ju(s, a | 1),
            Pt(s, qe()),
            (Te & 6) === 0 && ((Js = qe() + 500), yr()));
        }
        break;
      case 13:
        (ts(function () {
          var c = Kn(r, 1);
          if (c !== null) {
            var h = Ot();
            yn(c, r, 1, h);
          }
        }),
          Td(r, 1));
    }
  }),
    (ec = function (r) {
      if (r.tag === 13) {
        var s = Kn(r, 134217728);
        if (s !== null) {
          var a = Ot();
          yn(s, r, 134217728, a);
        }
        Td(r, 134217728);
      }
    }),
    (kp = function (r) {
      if (r.tag === 13) {
        var s = xr(r),
          a = Kn(r, s);
        if (a !== null) {
          var c = Ot();
          yn(a, r, s, c);
        }
        Td(r, s);
      }
    }),
    (Op = function () {
      return je;
    }),
    (Tp = function (r, s) {
      var a = je;
      try {
        return ((je = r), s());
      } finally {
        je = a;
      }
    }),
    (Ku = function (r, s, a) {
      switch (s) {
        case "input":
          if ((Bu(r, a), (s = a.name), a.type === "radio" && s != null)) {
            for (a = r; a.parentNode; ) a = a.parentNode;
            for (
              a = a.querySelectorAll(
                "input[name=" + JSON.stringify("" + s) + '][type="radio"]',
              ),
                s = 0;
              s < a.length;
              s++
            ) {
              var c = a[s];
              if (c !== r && c.form === r.form) {
                var h = Ia(c);
                if (!h) throw Error(n(90));
                (sa(c), Bu(c, h));
              }
            }
          }
          break;
        case "textarea":
          np(r, a);
          break;
        case "select":
          ((s = a.value), s != null && As(r, !!a.multiple, s, !1));
      }
    }),
    (dp = bd),
    (fp = ts));
  var B1 = { usingClientEntryPoint: !1, Events: [no, zs, Ia, up, cp, bd] },
    yo = {
      findFiberByHostInstance: Gr,
      bundleType: 0,
      version: "18.3.1",
      rendererPackageName: "react-dom",
    },
    $1 = {
      bundleType: yo.bundleType,
      version: yo.version,
      rendererPackageName: yo.rendererPackageName,
      rendererConfig: yo.rendererConfig,
      overrideHookState: null,
      overrideHookStateDeletePath: null,
      overrideHookStateRenamePath: null,
      overrideProps: null,
      overridePropsDeletePath: null,
      overridePropsRenamePath: null,
      setErrorHandler: null,
      setSuspenseHandler: null,
      scheduleUpdate: null,
      currentDispatcherRef: R.ReactCurrentDispatcher,
      findHostInstanceByFiber: function (r) {
        return ((r = gp(r)), r === null ? null : r.stateNode);
      },
      findFiberByHostInstance: yo.findFiberByHostInstance || D1,
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null,
      reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
    };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var fl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!fl.isDisabled && fl.supportsFiber)
      try {
        ((ua = fl.inject($1)), (Tn = fl));
      } catch {}
  }
  return (
    (Dt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = B1),
    (Dt.createPortal = function (r, s) {
      var a =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!Md(s)) throw Error(n(200));
      return P1(r, s, null, a);
    }),
    (Dt.createRoot = function (r, s) {
      if (!Md(r)) throw Error(n(299));
      var a = !1,
        c = "",
        h = Vg;
      return (
        s != null &&
          (s.unstable_strictMode === !0 && (a = !0),
          s.identifierPrefix !== void 0 && (c = s.identifierPrefix),
          s.onRecoverableError !== void 0 && (h = s.onRecoverableError)),
        (s = Od(r, 1, !1, null, null, a, !1, c, h)),
        (r[Un] = s.current),
        Ji(r.nodeType === 8 ? r.parentNode : r),
        new Id(s)
      );
    }),
    (Dt.findDOMNode = function (r) {
      if (r == null) return null;
      if (r.nodeType === 1) return r;
      var s = r._reactInternals;
      if (s === void 0)
        throw typeof r.render == "function"
          ? Error(n(188))
          : ((r = Object.keys(r).join(",")), Error(n(268, r)));
      return ((r = gp(s)), (r = r === null ? null : r.stateNode), r);
    }),
    (Dt.flushSync = function (r) {
      return ts(r);
    }),
    (Dt.hydrate = function (r, s, a) {
      if (!cl(s)) throw Error(n(200));
      return dl(null, r, s, !0, a);
    }),
    (Dt.hydrateRoot = function (r, s, a) {
      if (!Md(r)) throw Error(n(405));
      var c = (a != null && a.hydratedSources) || null,
        h = !1,
        p = "",
        b = Vg;
      if (
        (a != null &&
          (a.unstable_strictMode === !0 && (h = !0),
          a.identifierPrefix !== void 0 && (p = a.identifierPrefix),
          a.onRecoverableError !== void 0 && (b = a.onRecoverableError)),
        (s = Fg(s, null, r, 1, a ?? null, h, !1, p, b)),
        (r[Un] = s.current),
        Ji(r),
        c)
      )
        for (r = 0; r < c.length; r++)
          ((a = c[r]),
            (h = a._getVersion),
            (h = h(a._source)),
            s.mutableSourceEagerHydrationData == null
              ? (s.mutableSourceEagerHydrationData = [a, h])
              : s.mutableSourceEagerHydrationData.push(a, h));
      return new ul(s);
    }),
    (Dt.render = function (r, s, a) {
      if (!cl(s)) throw Error(n(200));
      return dl(null, r, s, !1, a);
    }),
    (Dt.unmountComponentAtNode = function (r) {
      if (!cl(r)) throw Error(n(40));
      return r._reactRootContainer
        ? (ts(function () {
            dl(null, null, r, !1, function () {
              ((r._reactRootContainer = null), (r[Un] = null));
            });
          }),
          !0)
        : !1;
    }),
    (Dt.unstable_batchedUpdates = bd),
    (Dt.unstable_renderSubtreeIntoContainer = function (r, s, a, c) {
      if (!cl(a)) throw Error(n(200));
      if (r == null || r._reactInternals === void 0) throw Error(n(38));
      return dl(r, s, a, !1, c);
    }),
    (Dt.version = "18.3.1-next-f1338f8080-20240426"),
    Dt
  );
}
var Zg;
function Xv() {
  if (Zg) return Rd.exports;
  Zg = 1;
  function e() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (t) {
        console.error(t);
      }
  }
  return (e(), (Rd.exports = G1()), Rd.exports);
}
var Jg;
function q1() {
  if (Jg) return hl;
  Jg = 1;
  var e = Xv();
  return ((hl.createRoot = e.createRoot), (hl.hydrateRoot = e.hydrateRoot), hl);
}
var Q1 = q1();
const Y1 = Ko(Q1);
function we(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function (o) {
    if ((e?.(o), n === !1 || !o.defaultPrevented)) return t?.(o);
  };
}
function ey(e, t) {
  if (typeof e == "function") return e(t);
  e != null && (e.current = t);
}
function Go(...e) {
  return (t) => {
    let n = !1;
    const i = e.map((o) => {
      const l = ey(o, t);
      return (!n && typeof l == "function" && (n = !0), l);
    });
    if (n)
      return () => {
        for (let o = 0; o < i.length; o++) {
          const l = i[o];
          typeof l == "function" ? l() : ey(e[o], null);
        }
      };
  };
}
function st(...e) {
  return w.useCallback(Go(...e), e);
}
function X1(e, t) {
  const n = w.createContext(t),
    i = (l) => {
      const { children: u, ...d } = l,
        f = w.useMemo(() => d, Object.values(d));
      return O.jsx(n.Provider, { value: f, children: u });
    };
  i.displayName = e + "Provider";
  function o(l) {
    const u = w.useContext(n);
    if (u) return u;
    if (t !== void 0) return t;
    throw new Error(`\`${l}\` must be used within \`${e}\``);
  }
  return [i, o];
}
function ks(e, t = []) {
  let n = [];
  function i(l, u) {
    const d = w.createContext(u),
      f = n.length;
    n = [...n, u];
    const m = (y) => {
      const { scope: v, children: C, ...E } = y,
        S = v?.[e]?.[f] || d,
        k = w.useMemo(() => E, Object.values(E));
      return O.jsx(S.Provider, { value: k, children: C });
    };
    m.displayName = l + "Provider";
    function g(y, v) {
      const C = v?.[e]?.[f] || d,
        E = w.useContext(C);
      if (E) return E;
      if (u !== void 0) return u;
      throw new Error(`\`${y}\` must be used within \`${l}\``);
    }
    return [m, g];
  }
  const o = () => {
    const l = n.map((u) => w.createContext(u));
    return function (d) {
      const f = d?.[e] || l;
      return w.useMemo(() => ({ [`__scope${e}`]: { ...d, [e]: f } }), [d, f]);
    };
  };
  return ((o.scopeName = e), [i, Z1(o, ...t)]);
}
function Z1(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const i = e.map((o) => ({ useScope: o(), scopeName: o.scopeName }));
    return function (l) {
      const u = i.reduce((d, { useScope: f, scopeName: m }) => {
        const y = f(l)[`__scope${m}`];
        return { ...d, ...y };
      }, {});
      return w.useMemo(() => ({ [`__scope${t.scopeName}`]: u }), [u]);
    };
  };
  return ((n.scopeName = t.scopeName), n);
}
var Br = globalThis?.document ? w.useLayoutEffect : () => {},
  J1 = Kf[" useId ".trim().toString()] || (() => {}),
  eC = 0;
function gi(e) {
  const [t, n] = w.useState(J1());
  return (
    Br(() => {
      n((i) => i ?? String(eC++));
    }, [e]),
    e || (t ? `radix-${t}` : "")
  );
}
var tC = Kf[" useInsertionEffect ".trim().toString()] || Br;
function Gf({ prop: e, defaultProp: t, onChange: n = () => {}, caller: i }) {
  const [o, l, u] = nC({ defaultProp: t, onChange: n }),
    d = e !== void 0,
    f = d ? e : o;
  {
    const g = w.useRef(e !== void 0);
    w.useEffect(() => {
      const y = g.current;
      (y !== d &&
        console.warn(
          `${i} is changing from ${y ? "controlled" : "uncontrolled"} to ${d ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`,
        ),
        (g.current = d));
    }, [d, i]);
  }
  const m = w.useCallback(
    (g) => {
      if (d) {
        const y = rC(g) ? g(e) : g;
        y !== e && u.current?.(y);
      } else l(g);
    },
    [d, e, l, u],
  );
  return [f, m];
}
function nC({ defaultProp: e, onChange: t }) {
  const [n, i] = w.useState(e),
    o = w.useRef(n),
    l = w.useRef(t);
  return (
    tC(() => {
      l.current = t;
    }, [t]),
    w.useEffect(() => {
      o.current !== n && (l.current?.(n), (o.current = n));
    }, [n, o]),
    [n, i, l]
  );
}
function rC(e) {
  return typeof e == "function";
}
var qf = Xv();
const sC = Ko(qf);
function Si(e) {
  const t = iC(e),
    n = w.forwardRef((i, o) => {
      const { children: l, ...u } = i,
        d = w.Children.toArray(l),
        f = d.find(aC);
      if (f) {
        const m = f.props.children,
          g = d.map((y) =>
            y === f
              ? w.Children.count(m) > 1
                ? w.Children.only(null)
                : w.isValidElement(m)
                  ? m.props.children
                  : null
              : y,
          );
        return O.jsx(t, {
          ...u,
          ref: o,
          children: w.isValidElement(m) ? w.cloneElement(m, void 0, g) : null,
        });
      }
      return O.jsx(t, { ...u, ref: o, children: l });
    });
  return ((n.displayName = `${e}.Slot`), n);
}
var Hr = Si("Slot");
function iC(e) {
  const t = w.forwardRef((n, i) => {
    const { children: o, ...l } = n;
    if (w.isValidElement(o)) {
      const u = uC(o),
        d = lC(l, o.props);
      return (
        o.type !== w.Fragment && (d.ref = i ? Go(i, u) : u),
        w.cloneElement(o, d)
      );
    }
    return w.Children.count(o) > 1 ? w.Children.only(null) : null;
  });
  return ((t.displayName = `${e}.SlotClone`), t);
}
var Zv = Symbol("radix.slottable");
function oC(e) {
  const t = ({ children: n }) => O.jsx(O.Fragment, { children: n });
  return ((t.displayName = `${e}.Slottable`), (t.__radixId = Zv), t);
}
function aC(e) {
  return (
    w.isValidElement(e) &&
    typeof e.type == "function" &&
    "__radixId" in e.type &&
    e.type.__radixId === Zv
  );
}
function lC(e, t) {
  const n = { ...t };
  for (const i in t) {
    const o = e[i],
      l = t[i];
    /^on[A-Z]/.test(i)
      ? o && l
        ? (n[i] = (...d) => {
            const f = l(...d);
            return (o(...d), f);
          })
        : o && (n[i] = o)
      : i === "style"
        ? (n[i] = { ...o, ...l })
        : i === "className" && (n[i] = [o, l].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function uC(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get,
    n = t && "isReactWarning" in t && t.isReactWarning;
  return n
    ? e.ref
    : ((t = Object.getOwnPropertyDescriptor(e, "ref")?.get),
      (n = t && "isReactWarning" in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref);
}
var cC = [
    "a",
    "button",
    "div",
    "form",
    "h2",
    "h3",
    "img",
    "input",
    "label",
    "li",
    "nav",
    "ol",
    "p",
    "select",
    "span",
    "svg",
    "ul",
  ],
  Ge = cC.reduce((e, t) => {
    const n = Si(`Primitive.${t}`),
      i = w.forwardRef((o, l) => {
        const { asChild: u, ...d } = o,
          f = u ? n : t;
        return (
          typeof window < "u" && (window[Symbol.for("radix-ui")] = !0),
          O.jsx(f, { ...d, ref: l })
        );
      });
    return ((i.displayName = `Primitive.${t}`), { ...e, [t]: i });
  }, {});
function Jv(e, t) {
  e && qf.flushSync(() => e.dispatchEvent(t));
}
function tr(e) {
  const t = w.useRef(e);
  return (
    w.useEffect(() => {
      t.current = e;
    }),
    w.useMemo(
      () =>
        (...n) =>
          t.current?.(...n),
      [],
    )
  );
}
function dC(e, t = globalThis?.document) {
  const n = tr(e);
  w.useEffect(() => {
    const i = (o) => {
      o.key === "Escape" && n(o);
    };
    return (
      t.addEventListener("keydown", i, { capture: !0 }),
      () => t.removeEventListener("keydown", i, { capture: !0 })
    );
  }, [n, t]);
}
var fC = "DismissableLayer",
  ff = "dismissableLayer.update",
  hC = "dismissableLayer.pointerDownOutside",
  pC = "dismissableLayer.focusOutside",
  ty,
  ew = w.createContext({
    layers: new Set(),
    layersWithOutsidePointerEventsDisabled: new Set(),
    branches: new Set(),
  }),
  uu = w.forwardRef((e, t) => {
    const {
        disableOutsidePointerEvents: n = !1,
        onEscapeKeyDown: i,
        onPointerDownOutside: o,
        onFocusOutside: l,
        onInteractOutside: u,
        onDismiss: d,
        ...f
      } = e,
      m = w.useContext(ew),
      [g, y] = w.useState(null),
      v = g?.ownerDocument ?? globalThis?.document,
      [, C] = w.useState({}),
      E = st(t, (U) => y(U)),
      S = Array.from(m.layers),
      [k] = [...m.layersWithOutsidePointerEventsDisabled].slice(-1),
      x = S.indexOf(k),
      M = g ? S.indexOf(g) : -1,
      A = m.layersWithOutsidePointerEventsDisabled.size > 0,
      R = M >= x,
      P = yC((U) => {
        const z = U.target,
          B = [...m.branches].some((H) => H.contains(z));
        !R || B || (o?.(U), u?.(U), U.defaultPrevented || d?.());
      }, v),
      V = vC((U) => {
        const z = U.target;
        [...m.branches].some((H) => H.contains(z)) ||
          (l?.(U), u?.(U), U.defaultPrevented || d?.());
      }, v);
    return (
      dC((U) => {
        M === m.layers.size - 1 &&
          (i?.(U), !U.defaultPrevented && d && (U.preventDefault(), d()));
      }, v),
      w.useEffect(() => {
        if (g)
          return (
            n &&
              (m.layersWithOutsidePointerEventsDisabled.size === 0 &&
                ((ty = v.body.style.pointerEvents),
                (v.body.style.pointerEvents = "none")),
              m.layersWithOutsidePointerEventsDisabled.add(g)),
            m.layers.add(g),
            ny(),
            () => {
              n &&
                m.layersWithOutsidePointerEventsDisabled.size === 1 &&
                (v.body.style.pointerEvents = ty);
            }
          );
      }, [g, v, n, m]),
      w.useEffect(
        () => () => {
          g &&
            (m.layers.delete(g),
            m.layersWithOutsidePointerEventsDisabled.delete(g),
            ny());
        },
        [g, m],
      ),
      w.useEffect(() => {
        const U = () => C({});
        return (
          document.addEventListener(ff, U),
          () => document.removeEventListener(ff, U)
        );
      }, []),
      O.jsx(Ge.div, {
        ...f,
        ref: E,
        style: {
          pointerEvents: A ? (R ? "auto" : "none") : void 0,
          ...e.style,
        },
        onFocusCapture: we(e.onFocusCapture, V.onFocusCapture),
        onBlurCapture: we(e.onBlurCapture, V.onBlurCapture),
        onPointerDownCapture: we(
          e.onPointerDownCapture,
          P.onPointerDownCapture,
        ),
      })
    );
  });
uu.displayName = fC;
var mC = "DismissableLayerBranch",
  gC = w.forwardRef((e, t) => {
    const n = w.useContext(ew),
      i = w.useRef(null),
      o = st(t, i);
    return (
      w.useEffect(() => {
        const l = i.current;
        if (l)
          return (
            n.branches.add(l),
            () => {
              n.branches.delete(l);
            }
          );
      }, [n.branches]),
      O.jsx(Ge.div, { ...e, ref: o })
    );
  });
gC.displayName = mC;
function yC(e, t = globalThis?.document) {
  const n = tr(e),
    i = w.useRef(!1),
    o = w.useRef(() => {});
  return (
    w.useEffect(() => {
      const l = (d) => {
          if (d.target && !i.current) {
            let f = function () {
              tw(hC, n, m, { discrete: !0 });
            };
            const m = { originalEvent: d };
            d.pointerType === "touch"
              ? (t.removeEventListener("click", o.current),
                (o.current = f),
                t.addEventListener("click", o.current, { once: !0 }))
              : f();
          } else t.removeEventListener("click", o.current);
          i.current = !1;
        },
        u = window.setTimeout(() => {
          t.addEventListener("pointerdown", l);
        }, 0);
      return () => {
        (window.clearTimeout(u),
          t.removeEventListener("pointerdown", l),
          t.removeEventListener("click", o.current));
      };
    }, [t, n]),
    { onPointerDownCapture: () => (i.current = !0) }
  );
}
function vC(e, t = globalThis?.document) {
  const n = tr(e),
    i = w.useRef(!1);
  return (
    w.useEffect(() => {
      const o = (l) => {
        l.target &&
          !i.current &&
          tw(pC, n, { originalEvent: l }, { discrete: !1 });
      };
      return (
        t.addEventListener("focusin", o),
        () => t.removeEventListener("focusin", o)
      );
    }, [t, n]),
    {
      onFocusCapture: () => (i.current = !0),
      onBlurCapture: () => (i.current = !1),
    }
  );
}
function ny() {
  const e = new CustomEvent(ff);
  document.dispatchEvent(e);
}
function tw(e, t, n, { discrete: i }) {
  const o = n.originalEvent.target,
    l = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  (t && o.addEventListener(e, t, { once: !0 }),
    i ? Jv(o, l) : o.dispatchEvent(l));
}
var Pd = "focusScope.autoFocusOnMount",
  Dd = "focusScope.autoFocusOnUnmount",
  ry = { bubbles: !1, cancelable: !0 },
  wC = "FocusScope",
  Qf = w.forwardRef((e, t) => {
    const {
        loop: n = !1,
        trapped: i = !1,
        onMountAutoFocus: o,
        onUnmountAutoFocus: l,
        ...u
      } = e,
      [d, f] = w.useState(null),
      m = tr(o),
      g = tr(l),
      y = w.useRef(null),
      v = st(t, (S) => f(S)),
      C = w.useRef({
        paused: !1,
        pause() {
          this.paused = !0;
        },
        resume() {
          this.paused = !1;
        },
      }).current;
    (w.useEffect(() => {
      if (i) {
        let S = function (A) {
            if (C.paused || !d) return;
            const R = A.target;
            d.contains(R) ? (y.current = R) : Rr(y.current, { select: !0 });
          },
          k = function (A) {
            if (C.paused || !d) return;
            const R = A.relatedTarget;
            R !== null && (d.contains(R) || Rr(y.current, { select: !0 }));
          },
          x = function (A) {
            if (document.activeElement === document.body)
              for (const P of A) P.removedNodes.length > 0 && Rr(d);
          };
        (document.addEventListener("focusin", S),
          document.addEventListener("focusout", k));
        const M = new MutationObserver(x);
        return (
          d && M.observe(d, { childList: !0, subtree: !0 }),
          () => {
            (document.removeEventListener("focusin", S),
              document.removeEventListener("focusout", k),
              M.disconnect());
          }
        );
      }
    }, [i, d, C.paused]),
      w.useEffect(() => {
        if (d) {
          iy.add(C);
          const S = document.activeElement;
          if (!d.contains(S)) {
            const x = new CustomEvent(Pd, ry);
            (d.addEventListener(Pd, m),
              d.dispatchEvent(x),
              x.defaultPrevented ||
                (bC(kC(nw(d)), { select: !0 }),
                document.activeElement === S && Rr(d)));
          }
          return () => {
            (d.removeEventListener(Pd, m),
              setTimeout(() => {
                const x = new CustomEvent(Dd, ry);
                (d.addEventListener(Dd, g),
                  d.dispatchEvent(x),
                  x.defaultPrevented || Rr(S ?? document.body, { select: !0 }),
                  d.removeEventListener(Dd, g),
                  iy.remove(C));
              }, 0));
          };
        }
      }, [d, m, g, C]));
    const E = w.useCallback(
      (S) => {
        if ((!n && !i) || C.paused) return;
        const k = S.key === "Tab" && !S.altKey && !S.ctrlKey && !S.metaKey,
          x = document.activeElement;
        if (k && x) {
          const M = S.currentTarget,
            [A, R] = SC(M);
          A && R
            ? !S.shiftKey && x === R
              ? (S.preventDefault(), n && Rr(A, { select: !0 }))
              : S.shiftKey &&
                x === A &&
                (S.preventDefault(), n && Rr(R, { select: !0 }))
            : x === M && S.preventDefault();
        }
      },
      [n, i, C.paused],
    );
    return O.jsx(Ge.div, { tabIndex: -1, ...u, ref: v, onKeyDown: E });
  });
Qf.displayName = wC;
function bC(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const i of e)
    if ((Rr(i, { select: t }), document.activeElement !== n)) return;
}
function SC(e) {
  const t = nw(e),
    n = sy(t, e),
    i = sy(t.reverse(), e);
  return [n, i];
}
function nw(e) {
  const t = [],
    n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (i) => {
        const o = i.tagName === "INPUT" && i.type === "hidden";
        return i.disabled || i.hidden || o
          ? NodeFilter.FILTER_SKIP
          : i.tabIndex >= 0
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
      },
    });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function sy(e, t) {
  for (const n of e) if (!EC(n, { upTo: t })) return n;
}
function EC(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function xC(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function Rr(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    (e.focus({ preventScroll: !0 }), e !== n && xC(e) && t && e.select());
  }
}
var iy = CC();
function CC() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      (t !== n && n?.pause(), (e = oy(e, t)), e.unshift(t));
    },
    remove(t) {
      ((e = oy(e, t)), e[0]?.resume());
    },
  };
}
function oy(e, t) {
  const n = [...e],
    i = n.indexOf(t);
  return (i !== -1 && n.splice(i, 1), n);
}
function kC(e) {
  return e.filter((t) => t.tagName !== "A");
}
var OC = "Portal",
  Yf = w.forwardRef((e, t) => {
    const { container: n, ...i } = e,
      [o, l] = w.useState(!1);
    Br(() => l(!0), []);
    const u = n || (o && globalThis?.document?.body);
    return u ? sC.createPortal(O.jsx(Ge.div, { ...i, ref: t }), u) : null;
  });
Yf.displayName = OC;
function TC(e, t) {
  return w.useReducer((n, i) => t[n][i] ?? n, e);
}
var ir = (e) => {
  const { present: t, children: n } = e,
    i = IC(t),
    o =
      typeof n == "function" ? n({ present: i.isPresent }) : w.Children.only(n),
    l = st(i.ref, MC(o));
  return typeof n == "function" || i.isPresent
    ? w.cloneElement(o, { ref: l })
    : null;
};
ir.displayName = "Presence";
function IC(e) {
  const [t, n] = w.useState(),
    i = w.useRef(null),
    o = w.useRef(e),
    l = w.useRef("none"),
    u = e ? "mounted" : "unmounted",
    [d, f] = TC(u, {
      mounted: { UNMOUNT: "unmounted", ANIMATION_OUT: "unmountSuspended" },
      unmountSuspended: { MOUNT: "mounted", ANIMATION_END: "unmounted" },
      unmounted: { MOUNT: "mounted" },
    });
  return (
    w.useEffect(() => {
      const m = pl(i.current);
      l.current = d === "mounted" ? m : "none";
    }, [d]),
    Br(() => {
      const m = i.current,
        g = o.current;
      if (g !== e) {
        const v = l.current,
          C = pl(m);
        (e
          ? f("MOUNT")
          : C === "none" || m?.display === "none"
            ? f("UNMOUNT")
            : f(g && v !== C ? "ANIMATION_OUT" : "UNMOUNT"),
          (o.current = e));
      }
    }, [e, f]),
    Br(() => {
      if (t) {
        let m;
        const g = t.ownerDocument.defaultView ?? window,
          y = (C) => {
            const S = pl(i.current).includes(CSS.escape(C.animationName));
            if (C.target === t && S && (f("ANIMATION_END"), !o.current)) {
              const k = t.style.animationFillMode;
              ((t.style.animationFillMode = "forwards"),
                (m = g.setTimeout(() => {
                  t.style.animationFillMode === "forwards" &&
                    (t.style.animationFillMode = k);
                })));
            }
          },
          v = (C) => {
            C.target === t && (l.current = pl(i.current));
          };
        return (
          t.addEventListener("animationstart", v),
          t.addEventListener("animationcancel", y),
          t.addEventListener("animationend", y),
          () => {
            (g.clearTimeout(m),
              t.removeEventListener("animationstart", v),
              t.removeEventListener("animationcancel", y),
              t.removeEventListener("animationend", y));
          }
        );
      } else f("ANIMATION_END");
    }, [t, f]),
    {
      isPresent: ["mounted", "unmountSuspended"].includes(d),
      ref: w.useCallback((m) => {
        ((i.current = m ? getComputedStyle(m) : null), n(m));
      }, []),
    }
  );
}
function pl(e) {
  return e?.animationName || "none";
}
function MC(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get,
    n = t && "isReactWarning" in t && t.isReactWarning;
  return n
    ? e.ref
    : ((t = Object.getOwnPropertyDescriptor(e, "ref")?.get),
      (n = t && "isReactWarning" in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref);
}
var Ld = 0;
function rw() {
  w.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return (
      document.body.insertAdjacentElement("afterbegin", e[0] ?? ay()),
      document.body.insertAdjacentElement("beforeend", e[1] ?? ay()),
      Ld++,
      () => {
        (Ld === 1 &&
          document
            .querySelectorAll("[data-radix-focus-guard]")
            .forEach((t) => t.remove()),
          Ld--);
      }
    );
  }, []);
}
function ay() {
  const e = document.createElement("span");
  return (
    e.setAttribute("data-radix-focus-guard", ""),
    (e.tabIndex = 0),
    (e.style.outline = "none"),
    (e.style.opacity = "0"),
    (e.style.position = "fixed"),
    (e.style.pointerEvents = "none"),
    e
  );
}
var Pn = function () {
  return (
    (Pn =
      Object.assign ||
      function (t) {
        for (var n, i = 1, o = arguments.length; i < o; i++) {
          n = arguments[i];
          for (var l in n)
            Object.prototype.hasOwnProperty.call(n, l) && (t[l] = n[l]);
        }
        return t;
      }),
    Pn.apply(this, arguments)
  );
};
function sw(e, t) {
  var n = {};
  for (var i in e)
    Object.prototype.hasOwnProperty.call(e, i) &&
      t.indexOf(i) < 0 &&
      (n[i] = e[i]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, i = Object.getOwnPropertySymbols(e); o < i.length; o++)
      t.indexOf(i[o]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, i[o]) &&
        (n[i[o]] = e[i[o]]);
  return n;
}
function AC(e, t, n) {
  if (n || arguments.length === 2)
    for (var i = 0, o = t.length, l; i < o; i++)
      (l || !(i in t)) &&
        (l || (l = Array.prototype.slice.call(t, 0, i)), (l[i] = t[i]));
  return e.concat(l || Array.prototype.slice.call(t));
}
var xl = "right-scroll-bar-position",
  Cl = "width-before-scroll-bar",
  jC = "with-scroll-bars-hidden",
  RC = "--removed-body-scroll-bar-size";
function Bd(e, t) {
  return (typeof e == "function" ? e(t) : e && (e.current = t), e);
}
function _C(e, t) {
  var n = w.useState(function () {
    return {
      value: e,
      callback: t,
      facade: {
        get current() {
          return n.value;
        },
        set current(i) {
          var o = n.value;
          o !== i && ((n.value = i), n.callback(i, o));
        },
      },
    };
  })[0];
  return ((n.callback = t), n.facade);
}
var NC = typeof window < "u" ? w.useLayoutEffect : w.useEffect,
  ly = new WeakMap();
function PC(e, t) {
  var n = _C(null, function (i) {
    return e.forEach(function (o) {
      return Bd(o, i);
    });
  });
  return (
    NC(
      function () {
        var i = ly.get(n);
        if (i) {
          var o = new Set(i),
            l = new Set(e),
            u = n.current;
          (o.forEach(function (d) {
            l.has(d) || Bd(d, null);
          }),
            l.forEach(function (d) {
              o.has(d) || Bd(d, u);
            }));
        }
        ly.set(n, e);
      },
      [e],
    ),
    n
  );
}
function DC(e) {
  return e;
}
function LC(e, t) {
  t === void 0 && (t = DC);
  var n = [],
    i = !1,
    o = {
      read: function () {
        if (i)
          throw new Error(
            "Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.",
          );
        return n.length ? n[n.length - 1] : e;
      },
      useMedium: function (l) {
        var u = t(l, i);
        return (
          n.push(u),
          function () {
            n = n.filter(function (d) {
              return d !== u;
            });
          }
        );
      },
      assignSyncMedium: function (l) {
        for (i = !0; n.length; ) {
          var u = n;
          ((n = []), u.forEach(l));
        }
        n = {
          push: function (d) {
            return l(d);
          },
          filter: function () {
            return n;
          },
        };
      },
      assignMedium: function (l) {
        i = !0;
        var u = [];
        if (n.length) {
          var d = n;
          ((n = []), d.forEach(l), (u = n));
        }
        var f = function () {
            var g = u;
            ((u = []), g.forEach(l));
          },
          m = function () {
            return Promise.resolve().then(f);
          };
        (m(),
          (n = {
            push: function (g) {
              (u.push(g), m());
            },
            filter: function (g) {
              return ((u = u.filter(g)), n);
            },
          }));
      },
    };
  return o;
}
function BC(e) {
  e === void 0 && (e = {});
  var t = LC(null);
  return ((t.options = Pn({ async: !0, ssr: !1 }, e)), t);
}
var iw = function (e) {
  var t = e.sideCar,
    n = sw(e, ["sideCar"]);
  if (!t)
    throw new Error(
      "Sidecar: please provide `sideCar` property to import the right car",
    );
  var i = t.read();
  if (!i) throw new Error("Sidecar medium not found");
  return w.createElement(i, Pn({}, n));
};
iw.isSideCarExport = !0;
function $C(e, t) {
  return (e.useMedium(t), iw);
}
var ow = BC(),
  $d = function () {},
  cu = w.forwardRef(function (e, t) {
    var n = w.useRef(null),
      i = w.useState({
        onScrollCapture: $d,
        onWheelCapture: $d,
        onTouchMoveCapture: $d,
      }),
      o = i[0],
      l = i[1],
      u = e.forwardProps,
      d = e.children,
      f = e.className,
      m = e.removeScrollBar,
      g = e.enabled,
      y = e.shards,
      v = e.sideCar,
      C = e.noRelative,
      E = e.noIsolation,
      S = e.inert,
      k = e.allowPinchZoom,
      x = e.as,
      M = x === void 0 ? "div" : x,
      A = e.gapMode,
      R = sw(e, [
        "forwardProps",
        "children",
        "className",
        "removeScrollBar",
        "enabled",
        "shards",
        "sideCar",
        "noRelative",
        "noIsolation",
        "inert",
        "allowPinchZoom",
        "as",
        "gapMode",
      ]),
      P = v,
      V = PC([n, t]),
      U = Pn(Pn({}, R), o);
    return w.createElement(
      w.Fragment,
      null,
      g &&
        w.createElement(P, {
          sideCar: ow,
          removeScrollBar: m,
          shards: y,
          noRelative: C,
          noIsolation: E,
          inert: S,
          setCallbacks: l,
          allowPinchZoom: !!k,
          lockRef: n,
          gapMode: A,
        }),
      u
        ? w.cloneElement(w.Children.only(d), Pn(Pn({}, U), { ref: V }))
        : w.createElement(M, Pn({}, U, { className: f, ref: V }), d),
    );
  });
cu.defaultProps = { enabled: !0, removeScrollBar: !0, inert: !1 };
cu.classNames = { fullWidth: Cl, zeroRight: xl };
var zC = function () {
  if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
};
function FC() {
  if (!document) return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = zC();
  return (t && e.setAttribute("nonce", t), e);
}
function UC(e, t) {
  e.styleSheet
    ? (e.styleSheet.cssText = t)
    : e.appendChild(document.createTextNode(t));
}
function VC(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var WC = function () {
    var e = 0,
      t = null;
    return {
      add: function (n) {
        (e == 0 && (t = FC()) && (UC(t, n), VC(t)), e++);
      },
      remove: function () {
        (e--,
          !e && t && (t.parentNode && t.parentNode.removeChild(t), (t = null)));
      },
    };
  },
  HC = function () {
    var e = WC();
    return function (t, n) {
      w.useEffect(
        function () {
          return (
            e.add(t),
            function () {
              e.remove();
            }
          );
        },
        [t && n],
      );
    };
  },
  aw = function () {
    var e = HC(),
      t = function (n) {
        var i = n.styles,
          o = n.dynamic;
        return (e(i, o), null);
      };
    return t;
  },
  KC = { left: 0, top: 0, right: 0, gap: 0 },
  zd = function (e) {
    return parseInt(e || "", 10) || 0;
  },
  GC = function (e) {
    var t = window.getComputedStyle(document.body),
      n = t[e === "padding" ? "paddingLeft" : "marginLeft"],
      i = t[e === "padding" ? "paddingTop" : "marginTop"],
      o = t[e === "padding" ? "paddingRight" : "marginRight"];
    return [zd(n), zd(i), zd(o)];
  },
  qC = function (e) {
    if ((e === void 0 && (e = "margin"), typeof window > "u")) return KC;
    var t = GC(e),
      n = document.documentElement.clientWidth,
      i = window.innerWidth;
    return {
      left: t[0],
      top: t[1],
      right: t[2],
      gap: Math.max(0, i - n + t[2] - t[0]),
    };
  },
  QC = aw(),
  yi = "data-scroll-locked",
  YC = function (e, t, n, i) {
    var o = e.left,
      l = e.top,
      u = e.right,
      d = e.gap;
    return (
      n === void 0 && (n = "margin"),
      `
  .`
        .concat(
          jC,
          ` {
   overflow: hidden `,
        )
        .concat(
          i,
          `;
   padding-right: `,
        )
        .concat(d, "px ")
        .concat(
          i,
          `;
  }
  body[`,
        )
        .concat(
          yi,
          `] {
    overflow: hidden `,
        )
        .concat(
          i,
          `;
    overscroll-behavior: contain;
    `,
        )
        .concat(
          [
            t && "position: relative ".concat(i, ";"),
            n === "margin" &&
              `
    padding-left: `
                .concat(
                  o,
                  `px;
    padding-top: `,
                )
                .concat(
                  l,
                  `px;
    padding-right: `,
                )
                .concat(
                  u,
                  `px;
    margin-left:0;
    margin-top:0;
    margin-right: `,
                )
                .concat(d, "px ")
                .concat(
                  i,
                  `;
    `,
                ),
            n === "padding" &&
              "padding-right: ".concat(d, "px ").concat(i, ";"),
          ]
            .filter(Boolean)
            .join(""),
          `
  }
  
  .`,
        )
        .concat(
          xl,
          ` {
    right: `,
        )
        .concat(d, "px ")
        .concat(
          i,
          `;
  }
  
  .`,
        )
        .concat(
          Cl,
          ` {
    margin-right: `,
        )
        .concat(d, "px ")
        .concat(
          i,
          `;
  }
  
  .`,
        )
        .concat(xl, " .")
        .concat(
          xl,
          ` {
    right: 0 `,
        )
        .concat(
          i,
          `;
  }
  
  .`,
        )
        .concat(Cl, " .")
        .concat(
          Cl,
          ` {
    margin-right: 0 `,
        )
        .concat(
          i,
          `;
  }
  
  body[`,
        )
        .concat(
          yi,
          `] {
    `,
        )
        .concat(RC, ": ")
        .concat(
          d,
          `px;
  }
`,
        )
    );
  },
  uy = function () {
    var e = parseInt(document.body.getAttribute(yi) || "0", 10);
    return isFinite(e) ? e : 0;
  },
  XC = function () {
    w.useEffect(function () {
      return (
        document.body.setAttribute(yi, (uy() + 1).toString()),
        function () {
          var e = uy() - 1;
          e <= 0
            ? document.body.removeAttribute(yi)
            : document.body.setAttribute(yi, e.toString());
        }
      );
    }, []);
  },
  ZC = function (e) {
    var t = e.noRelative,
      n = e.noImportant,
      i = e.gapMode,
      o = i === void 0 ? "margin" : i;
    XC();
    var l = w.useMemo(
      function () {
        return qC(o);
      },
      [o],
    );
    return w.createElement(QC, { styles: YC(l, !t, o, n ? "" : "!important") });
  },
  hf = !1;
if (typeof window < "u")
  try {
    var ml = Object.defineProperty({}, "passive", {
      get: function () {
        return ((hf = !0), !0);
      },
    });
    (window.addEventListener("test", ml, ml),
      window.removeEventListener("test", ml, ml));
  } catch {
    hf = !1;
  }
var ti = hf ? { passive: !1 } : !1,
  JC = function (e) {
    return e.tagName === "TEXTAREA";
  },
  lw = function (e, t) {
    if (!(e instanceof Element)) return !1;
    var n = window.getComputedStyle(e);
    return (
      n[t] !== "hidden" &&
      !(n.overflowY === n.overflowX && !JC(e) && n[t] === "visible")
    );
  },
  ek = function (e) {
    return lw(e, "overflowY");
  },
  tk = function (e) {
    return lw(e, "overflowX");
  },
  cy = function (e, t) {
    var n = t.ownerDocument,
      i = t;
    do {
      typeof ShadowRoot < "u" && i instanceof ShadowRoot && (i = i.host);
      var o = uw(e, i);
      if (o) {
        var l = cw(e, i),
          u = l[1],
          d = l[2];
        if (u > d) return !0;
      }
      i = i.parentNode;
    } while (i && i !== n.body);
    return !1;
  },
  nk = function (e) {
    var t = e.scrollTop,
      n = e.scrollHeight,
      i = e.clientHeight;
    return [t, n, i];
  },
  rk = function (e) {
    var t = e.scrollLeft,
      n = e.scrollWidth,
      i = e.clientWidth;
    return [t, n, i];
  },
  uw = function (e, t) {
    return e === "v" ? ek(t) : tk(t);
  },
  cw = function (e, t) {
    return e === "v" ? nk(t) : rk(t);
  },
  sk = function (e, t) {
    return e === "h" && t === "rtl" ? -1 : 1;
  },
  ik = function (e, t, n, i, o) {
    var l = sk(e, window.getComputedStyle(t).direction),
      u = l * i,
      d = n.target,
      f = t.contains(d),
      m = !1,
      g = u > 0,
      y = 0,
      v = 0;
    do {
      if (!d) break;
      var C = cw(e, d),
        E = C[0],
        S = C[1],
        k = C[2],
        x = S - k - l * E;
      (E || x) && uw(e, d) && ((y += x), (v += E));
      var M = d.parentNode;
      d = M && M.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? M.host : M;
    } while ((!f && d !== document.body) || (f && (t.contains(d) || t === d)));
    return (((g && Math.abs(y) < 1) || (!g && Math.abs(v) < 1)) && (m = !0), m);
  },
  gl = function (e) {
    return "changedTouches" in e
      ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
      : [0, 0];
  },
  dy = function (e) {
    return [e.deltaX, e.deltaY];
  },
  fy = function (e) {
    return e && "current" in e ? e.current : e;
  },
  ok = function (e, t) {
    return e[0] === t[0] && e[1] === t[1];
  },
  ak = function (e) {
    return `
  .block-interactivity-`
      .concat(
        e,
        ` {pointer-events: none;}
  .allow-interactivity-`,
      )
      .concat(
        e,
        ` {pointer-events: all;}
`,
      );
  },
  lk = 0,
  ni = [];
function uk(e) {
  var t = w.useRef([]),
    n = w.useRef([0, 0]),
    i = w.useRef(),
    o = w.useState(lk++)[0],
    l = w.useState(aw)[0],
    u = w.useRef(e);
  (w.useEffect(
    function () {
      u.current = e;
    },
    [e],
  ),
    w.useEffect(
      function () {
        if (e.inert) {
          document.body.classList.add("block-interactivity-".concat(o));
          var S = AC([e.lockRef.current], (e.shards || []).map(fy), !0).filter(
            Boolean,
          );
          return (
            S.forEach(function (k) {
              return k.classList.add("allow-interactivity-".concat(o));
            }),
            function () {
              (document.body.classList.remove("block-interactivity-".concat(o)),
                S.forEach(function (k) {
                  return k.classList.remove("allow-interactivity-".concat(o));
                }));
            }
          );
        }
      },
      [e.inert, e.lockRef.current, e.shards],
    ));
  var d = w.useCallback(function (S, k) {
      if (
        ("touches" in S && S.touches.length === 2) ||
        (S.type === "wheel" && S.ctrlKey)
      )
        return !u.current.allowPinchZoom;
      var x = gl(S),
        M = n.current,
        A = "deltaX" in S ? S.deltaX : M[0] - x[0],
        R = "deltaY" in S ? S.deltaY : M[1] - x[1],
        P,
        V = S.target,
        U = Math.abs(A) > Math.abs(R) ? "h" : "v";
      if ("touches" in S && U === "h" && V.type === "range") return !1;
      var z = window.getSelection(),
        B = z && z.anchorNode,
        H = B ? B === V || B.contains(V) : !1;
      if (H) return !1;
      var ee = cy(U, V);
      if (!ee) return !0;
      if ((ee ? (P = U) : ((P = U === "v" ? "h" : "v"), (ee = cy(U, V))), !ee))
        return !1;
      if (
        (!i.current && "changedTouches" in S && (A || R) && (i.current = P), !P)
      )
        return !0;
      var Q = i.current || P;
      return ik(Q, k, S, Q === "h" ? A : R);
    }, []),
    f = w.useCallback(function (S) {
      var k = S;
      if (!(!ni.length || ni[ni.length - 1] !== l)) {
        var x = "deltaY" in k ? dy(k) : gl(k),
          M = t.current.filter(function (P) {
            return (
              P.name === k.type &&
              (P.target === k.target || k.target === P.shadowParent) &&
              ok(P.delta, x)
            );
          })[0];
        if (M && M.should) {
          k.cancelable && k.preventDefault();
          return;
        }
        if (!M) {
          var A = (u.current.shards || [])
              .map(fy)
              .filter(Boolean)
              .filter(function (P) {
                return P.contains(k.target);
              }),
            R = A.length > 0 ? d(k, A[0]) : !u.current.noIsolation;
          R && k.cancelable && k.preventDefault();
        }
      }
    }, []),
    m = w.useCallback(function (S, k, x, M) {
      var A = { name: S, delta: k, target: x, should: M, shadowParent: ck(x) };
      (t.current.push(A),
        setTimeout(function () {
          t.current = t.current.filter(function (R) {
            return R !== A;
          });
        }, 1));
    }, []),
    g = w.useCallback(function (S) {
      ((n.current = gl(S)), (i.current = void 0));
    }, []),
    y = w.useCallback(function (S) {
      m(S.type, dy(S), S.target, d(S, e.lockRef.current));
    }, []),
    v = w.useCallback(function (S) {
      m(S.type, gl(S), S.target, d(S, e.lockRef.current));
    }, []);
  w.useEffect(function () {
    return (
      ni.push(l),
      e.setCallbacks({
        onScrollCapture: y,
        onWheelCapture: y,
        onTouchMoveCapture: v,
      }),
      document.addEventListener("wheel", f, ti),
      document.addEventListener("touchmove", f, ti),
      document.addEventListener("touchstart", g, ti),
      function () {
        ((ni = ni.filter(function (S) {
          return S !== l;
        })),
          document.removeEventListener("wheel", f, ti),
          document.removeEventListener("touchmove", f, ti),
          document.removeEventListener("touchstart", g, ti));
      }
    );
  }, []);
  var C = e.removeScrollBar,
    E = e.inert;
  return w.createElement(
    w.Fragment,
    null,
    E ? w.createElement(l, { styles: ak(o) }) : null,
    C
      ? w.createElement(ZC, { noRelative: e.noRelative, gapMode: e.gapMode })
      : null,
  );
}
function ck(e) {
  for (var t = null; e !== null; )
    (e instanceof ShadowRoot && ((t = e.host), (e = e.host)),
      (e = e.parentNode));
  return t;
}
const dk = $C(ow, uk);
var Xf = w.forwardRef(function (e, t) {
  return w.createElement(cu, Pn({}, e, { ref: t, sideCar: dk }));
});
Xf.classNames = cu.classNames;
var fk = function (e) {
    if (typeof document > "u") return null;
    var t = Array.isArray(e) ? e[0] : e;
    return t.ownerDocument.body;
  },
  ri = new WeakMap(),
  yl = new WeakMap(),
  vl = {},
  Fd = 0,
  dw = function (e) {
    return e && (e.host || dw(e.parentNode));
  },
  hk = function (e, t) {
    return t
      .map(function (n) {
        if (e.contains(n)) return n;
        var i = dw(n);
        return i && e.contains(i)
          ? i
          : (console.error(
              "aria-hidden",
              n,
              "in not contained inside",
              e,
              ". Doing nothing",
            ),
            null);
      })
      .filter(function (n) {
        return !!n;
      });
  },
  pk = function (e, t, n, i) {
    var o = hk(t, Array.isArray(e) ? e : [e]);
    vl[n] || (vl[n] = new WeakMap());
    var l = vl[n],
      u = [],
      d = new Set(),
      f = new Set(o),
      m = function (y) {
        !y || d.has(y) || (d.add(y), m(y.parentNode));
      };
    o.forEach(m);
    var g = function (y) {
      !y ||
        f.has(y) ||
        Array.prototype.forEach.call(y.children, function (v) {
          if (d.has(v)) g(v);
          else
            try {
              var C = v.getAttribute(i),
                E = C !== null && C !== "false",
                S = (ri.get(v) || 0) + 1,
                k = (l.get(v) || 0) + 1;
              (ri.set(v, S),
                l.set(v, k),
                u.push(v),
                S === 1 && E && yl.set(v, !0),
                k === 1 && v.setAttribute(n, "true"),
                E || v.setAttribute(i, "true"));
            } catch (x) {
              console.error("aria-hidden: cannot operate on ", v, x);
            }
        });
    };
    return (
      g(t),
      d.clear(),
      Fd++,
      function () {
        (u.forEach(function (y) {
          var v = ri.get(y) - 1,
            C = l.get(y) - 1;
          (ri.set(y, v),
            l.set(y, C),
            v || (yl.has(y) || y.removeAttribute(i), yl.delete(y)),
            C || y.removeAttribute(n));
        }),
          Fd--,
          Fd ||
            ((ri = new WeakMap()),
            (ri = new WeakMap()),
            (yl = new WeakMap()),
            (vl = {})));
      }
    );
  },
  fw = function (e, t, n) {
    n === void 0 && (n = "data-aria-hidden");
    var i = Array.from(Array.isArray(e) ? e : [e]),
      o = fk(e);
    return o
      ? (i.push.apply(i, Array.from(o.querySelectorAll("[aria-live], script"))),
        pk(i, o, n, "aria-hidden"))
      : function () {
          return null;
        };
  },
  du = "Dialog",
  [hw] = ks(du),
  [mk, Cn] = hw(du),
  pw = (e) => {
    const {
        __scopeDialog: t,
        children: n,
        open: i,
        defaultOpen: o,
        onOpenChange: l,
        modal: u = !0,
      } = e,
      d = w.useRef(null),
      f = w.useRef(null),
      [m, g] = Gf({ prop: i, defaultProp: o ?? !1, onChange: l, caller: du });
    return O.jsx(mk, {
      scope: t,
      triggerRef: d,
      contentRef: f,
      contentId: gi(),
      titleId: gi(),
      descriptionId: gi(),
      open: m,
      onOpenChange: g,
      onOpenToggle: w.useCallback(() => g((y) => !y), [g]),
      modal: u,
      children: n,
    });
  };
pw.displayName = du;
var mw = "DialogTrigger",
  gw = w.forwardRef((e, t) => {
    const { __scopeDialog: n, ...i } = e,
      o = Cn(mw, n),
      l = st(t, o.triggerRef);
    return O.jsx(Ge.button, {
      type: "button",
      "aria-haspopup": "dialog",
      "aria-expanded": o.open,
      "aria-controls": o.contentId,
      "data-state": eh(o.open),
      ...i,
      ref: l,
      onClick: we(e.onClick, o.onOpenToggle),
    });
  });
gw.displayName = mw;
var Zf = "DialogPortal",
  [gk, yw] = hw(Zf, { forceMount: void 0 }),
  vw = (e) => {
    const { __scopeDialog: t, forceMount: n, children: i, container: o } = e,
      l = Cn(Zf, t);
    return O.jsx(gk, {
      scope: t,
      forceMount: n,
      children: w.Children.map(i, (u) =>
        O.jsx(ir, {
          present: n || l.open,
          children: O.jsx(Yf, { asChild: !0, container: o, children: u }),
        }),
      ),
    });
  };
vw.displayName = Zf;
var Ul = "DialogOverlay",
  ww = w.forwardRef((e, t) => {
    const n = yw(Ul, e.__scopeDialog),
      { forceMount: i = n.forceMount, ...o } = e,
      l = Cn(Ul, e.__scopeDialog);
    return l.modal
      ? O.jsx(ir, {
          present: i || l.open,
          children: O.jsx(vk, { ...o, ref: t }),
        })
      : null;
  });
ww.displayName = Ul;
var yk = Si("DialogOverlay.RemoveScroll"),
  vk = w.forwardRef((e, t) => {
    const { __scopeDialog: n, ...i } = e,
      o = Cn(Ul, n);
    return O.jsx(Xf, {
      as: yk,
      allowPinchZoom: !0,
      shards: [o.contentRef],
      children: O.jsx(Ge.div, {
        "data-state": eh(o.open),
        ...i,
        ref: t,
        style: { pointerEvents: "auto", ...i.style },
      }),
    });
  }),
  vs = "DialogContent",
  bw = w.forwardRef((e, t) => {
    const n = yw(vs, e.__scopeDialog),
      { forceMount: i = n.forceMount, ...o } = e,
      l = Cn(vs, e.__scopeDialog);
    return O.jsx(ir, {
      present: i || l.open,
      children: l.modal
        ? O.jsx(wk, { ...o, ref: t })
        : O.jsx(bk, { ...o, ref: t }),
    });
  });
bw.displayName = vs;
var wk = w.forwardRef((e, t) => {
    const n = Cn(vs, e.__scopeDialog),
      i = w.useRef(null),
      o = st(t, n.contentRef, i);
    return (
      w.useEffect(() => {
        const l = i.current;
        if (l) return fw(l);
      }, []),
      O.jsx(Sw, {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: we(e.onCloseAutoFocus, (l) => {
          (l.preventDefault(), n.triggerRef.current?.focus());
        }),
        onPointerDownOutside: we(e.onPointerDownOutside, (l) => {
          const u = l.detail.originalEvent,
            d = u.button === 0 && u.ctrlKey === !0;
          (u.button === 2 || d) && l.preventDefault();
        }),
        onFocusOutside: we(e.onFocusOutside, (l) => l.preventDefault()),
      })
    );
  }),
  bk = w.forwardRef((e, t) => {
    const n = Cn(vs, e.__scopeDialog),
      i = w.useRef(!1),
      o = w.useRef(!1);
    return O.jsx(Sw, {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      onCloseAutoFocus: (l) => {
        (e.onCloseAutoFocus?.(l),
          l.defaultPrevented ||
            (i.current || n.triggerRef.current?.focus(), l.preventDefault()),
          (i.current = !1),
          (o.current = !1));
      },
      onInteractOutside: (l) => {
        (e.onInteractOutside?.(l),
          l.defaultPrevented ||
            ((i.current = !0),
            l.detail.originalEvent.type === "pointerdown" && (o.current = !0)));
        const u = l.target;
        (n.triggerRef.current?.contains(u) && l.preventDefault(),
          l.detail.originalEvent.type === "focusin" &&
            o.current &&
            l.preventDefault());
      },
    });
  }),
  Sw = w.forwardRef((e, t) => {
    const {
        __scopeDialog: n,
        trapFocus: i,
        onOpenAutoFocus: o,
        onCloseAutoFocus: l,
        ...u
      } = e,
      d = Cn(vs, n),
      f = w.useRef(null),
      m = st(t, f);
    return (
      rw(),
      O.jsxs(O.Fragment, {
        children: [
          O.jsx(Qf, {
            asChild: !0,
            loop: !0,
            trapped: i,
            onMountAutoFocus: o,
            onUnmountAutoFocus: l,
            children: O.jsx(uu, {
              role: "dialog",
              id: d.contentId,
              "aria-describedby": d.descriptionId,
              "aria-labelledby": d.titleId,
              "data-state": eh(d.open),
              ...u,
              ref: m,
              onDismiss: () => d.onOpenChange(!1),
            }),
          }),
          O.jsxs(O.Fragment, {
            children: [
              O.jsx(Ek, { titleId: d.titleId }),
              O.jsx(Ck, { contentRef: f, descriptionId: d.descriptionId }),
            ],
          }),
        ],
      })
    );
  }),
  Jf = "DialogTitle",
  Ew = w.forwardRef((e, t) => {
    const { __scopeDialog: n, ...i } = e,
      o = Cn(Jf, n);
    return O.jsx(Ge.h2, { id: o.titleId, ...i, ref: t });
  });
Ew.displayName = Jf;
var xw = "DialogDescription",
  Sk = w.forwardRef((e, t) => {
    const { __scopeDialog: n, ...i } = e,
      o = Cn(xw, n);
    return O.jsx(Ge.p, { id: o.descriptionId, ...i, ref: t });
  });
Sk.displayName = xw;
var Cw = "DialogClose",
  kw = w.forwardRef((e, t) => {
    const { __scopeDialog: n, ...i } = e,
      o = Cn(Cw, n);
    return O.jsx(Ge.button, {
      type: "button",
      ...i,
      ref: t,
      onClick: we(e.onClick, () => o.onOpenChange(!1)),
    });
  });
kw.displayName = Cw;
function eh(e) {
  return e ? "open" : "closed";
}
var Ow = "DialogTitleWarning",
  [E3, Tw] = X1(Ow, { contentName: vs, titleName: Jf, docsSlug: "dialog" }),
  Ek = ({ titleId: e }) => {
    const t = Tw(Ow),
      n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
    return (
      w.useEffect(() => {
        e && (document.getElementById(e) || console.error(n));
      }, [n, e]),
      null
    );
  },
  xk = "DialogDescriptionWarning",
  Ck = ({ contentRef: e, descriptionId: t }) => {
    const i = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${Tw(xk).contentName}}.`;
    return (
      w.useEffect(() => {
        const o = e.current?.getAttribute("aria-describedby");
        t && o && (document.getElementById(t) || console.warn(i));
      }, [i, e, t]),
      null
    );
  },
  kk = pw,
  Ok = gw,
  Tk = vw,
  Ik = ww,
  Mk = bw,
  Ak = Ew,
  jk = kw;
function Iw(e) {
  var t,
    n,
    i = "";
  if (typeof e == "string" || typeof e == "number") i += e;
  else if (typeof e == "object")
    if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++)
        e[t] && (n = Iw(e[t])) && (i && (i += " "), (i += n));
    } else for (n in e) e[n] && (i && (i += " "), (i += n));
  return i;
}
function nr() {
  for (var e, t, n = 0, i = "", o = arguments.length; n < o; n++)
    (e = arguments[n]) && (t = Iw(e)) && (i && (i += " "), (i += t));
  return i;
}
const Mw =
    /^(?!.*(^(?!@)|[-.@])($|[-.@]))(?:[a-z0-9-]{0,63}(?:\.[a-z0-9-]{0,63})*)?@[a-z0-9-]{0,63}$/i,
  Aw = /^(?!.*(^|[-.])($|[-.]))(?:[a-z0-9-]{0,63}\.)+sui$/i,
  Rk = 235;
function _k(e) {
  return e.length > Rk ? !1 : e.includes("@") ? Mw.test(e) : Aw.test(e);
}
function Nk(e, t = "at") {
  const n = e.toLowerCase();
  let i;
  if (n.includes("@")) {
    if (!Mw.test(n)) throw new Error(`Invalid SuiNS name ${e}`);
    const [o, l] = n.split("@");
    i = [...(o ? o.split(".") : []), l];
  } else {
    if (!Aw.test(n)) throw new Error(`Invalid SuiNS name ${e}`);
    i = n.split(".").slice(0, -1);
  }
  return t === "dot"
    ? `${i.join(".")}.sui`
    : `${i.slice(0, -1).join(".")}@${i[i.length - 1]}`;
}
function Vl(e) {
  let t = BigInt(e);
  const n = [];
  let i = 0;
  if (t === 0n) return [0];
  for (; t > 0; )
    ((n[i] = Number(t & 127n)), (t >>= 7n), t > 0n && (n[i] |= 128), (i += 1));
  return n;
}
function Pk(e) {
  let t = 0n,
    n = 0n,
    i = 0;
  for (;;) {
    if (i >= e.length) throw new Error("ULEB decode error: buffer overflow");
    const o = e[i];
    if (((i += 1), (t += BigInt(o & 127) << n), (o & 128) === 0)) break;
    n += 7n;
  }
  if (t > BigInt(Number.MAX_SAFE_INTEGER))
    throw new Error("ULEB decode error: value exceeds MAX_SAFE_INTEGER");
  return { value: Number(t), length: i };
}
var Dk = class {
  constructor(e) {
    ((this.bytePosition = 0),
      (this.dataView = new DataView(e.buffer, e.byteOffset, e.byteLength)));
  }
  shift(e) {
    return ((this.bytePosition += e), this);
  }
  read8() {
    const e = this.dataView.getUint8(this.bytePosition);
    return (this.shift(1), e);
  }
  read16() {
    const e = this.dataView.getUint16(this.bytePosition, !0);
    return (this.shift(2), e);
  }
  read32() {
    const e = this.dataView.getUint32(this.bytePosition, !0);
    return (this.shift(4), e);
  }
  read64() {
    const e = this.read32(),
      t = this.read32().toString(16) + e.toString(16).padStart(8, "0");
    return BigInt("0x" + t).toString(10);
  }
  read128() {
    const e = BigInt(this.read64()),
      t = BigInt(this.read64()).toString(16) + e.toString(16).padStart(16, "0");
    return BigInt("0x" + t).toString(10);
  }
  read256() {
    const e = BigInt(this.read128()),
      t =
        BigInt(this.read128()).toString(16) + e.toString(16).padStart(32, "0");
    return BigInt("0x" + t).toString(10);
  }
  readBytes(e) {
    const t = this.bytePosition + this.dataView.byteOffset,
      n = new Uint8Array(this.dataView.buffer, t, e);
    return (this.shift(e), n);
  }
  readULEB() {
    const e = this.bytePosition + this.dataView.byteOffset,
      { value: t, length: n } = Pk(new Uint8Array(this.dataView.buffer, e));
    return (this.shift(n), t);
  }
  readVec(e) {
    const t = this.readULEB(),
      n = [];
    for (let i = 0; i < t; i++) n.push(e(this, i, t));
    return n;
  }
};
function th(e) {
  return (
    e instanceof Uint8Array ||
    (ArrayBuffer.isView(e) && e.constructor.name === "Uint8Array")
  );
}
function jw(e, t) {
  return Array.isArray(t)
    ? t.length === 0
      ? !0
      : e
        ? t.every((n) => typeof n == "string")
        : t.every((n) => Number.isSafeInteger(n))
    : !1;
}
function Lk(e) {
  if (typeof e != "function") throw new Error("function expected");
  return !0;
}
function Po(e, t) {
  if (typeof t != "string") throw new Error(`${e}: string expected`);
  return !0;
}
function fu(e) {
  if (!Number.isSafeInteger(e)) throw new Error(`invalid integer: ${e}`);
}
function Wl(e) {
  if (!Array.isArray(e)) throw new Error("array expected");
}
function Rw(e, t) {
  if (!jw(!0, t)) throw new Error(`${e}: array of strings expected`);
}
function nh(e, t) {
  if (!jw(!1, t)) throw new Error(`${e}: array of numbers expected`);
}
function _w(...e) {
  const t = (l) => l,
    n = (l, u) => (d) => l(u(d)),
    i = e.map((l) => l.encode).reduceRight(n, t),
    o = e.map((l) => l.decode).reduce(n, t);
  return { encode: i, decode: o };
}
function Nw(e) {
  const t = typeof e == "string" ? e.split("") : e,
    n = t.length;
  Rw("alphabet", t);
  const i = new Map(t.map((o, l) => [o, l]));
  return {
    encode: (o) => (
      Wl(o),
      o.map((l) => {
        if (!Number.isSafeInteger(l) || l < 0 || l >= n)
          throw new Error(
            `alphabet.encode: digit index outside alphabet "${l}". Allowed: ${e}`,
          );
        return t[l];
      })
    ),
    decode: (o) => (
      Wl(o),
      o.map((l) => {
        Po("alphabet.decode", l);
        const u = i.get(l);
        if (u === void 0)
          throw new Error(`Unknown letter: "${l}". Allowed: ${e}`);
        return u;
      })
    ),
  };
}
function Pw(e = "") {
  return (
    Po("join", e),
    {
      encode: (t) => (Rw("join.decode", t), t.join(e)),
      decode: (t) => (Po("join.decode", t), t.split(e)),
    }
  );
}
function hy(e, t, n) {
  if (t < 2)
    throw new Error(
      `convertRadix: invalid from=${t}, base cannot be less than 2`,
    );
  if (n < 2)
    throw new Error(
      `convertRadix: invalid to=${n}, base cannot be less than 2`,
    );
  if ((Wl(e), !e.length)) return [];
  let i = 0;
  const o = [],
    l = Array.from(e, (d) => {
      if ((fu(d), d < 0 || d >= t)) throw new Error(`invalid integer: ${d}`);
      return d;
    }),
    u = l.length;
  for (;;) {
    let d = 0,
      f = !0;
    for (let m = i; m < u; m++) {
      const g = l[m],
        y = t * d,
        v = y + g;
      if (!Number.isSafeInteger(v) || y / t !== d || v - g !== y)
        throw new Error("convertRadix: carry overflow");
      const C = v / n;
      d = v % n;
      const E = Math.floor(C);
      if (((l[m] = E), !Number.isSafeInteger(E) || E * n + d !== v))
        throw new Error("convertRadix: carry overflow");
      if (f) E ? (f = !1) : (i = m);
      else continue;
    }
    if ((o.push(d), f)) break;
  }
  for (let d = 0; d < e.length - 1 && e[d] === 0; d++) o.push(0);
  return o.reverse();
}
const Dw = (e, t) => (t === 0 ? e : Dw(t, e % t)),
  Hl = (e, t) => e + (t - Dw(e, t)),
  kl = (() => {
    let e = [];
    for (let t = 0; t < 40; t++) e.push(2 ** t);
    return e;
  })();
function pf(e, t, n, i) {
  if ((Wl(e), t <= 0 || t > 32))
    throw new Error(`convertRadix2: wrong from=${t}`);
  if (n <= 0 || n > 32) throw new Error(`convertRadix2: wrong to=${n}`);
  if (Hl(t, n) > 32)
    throw new Error(
      `convertRadix2: carry overflow from=${t} to=${n} carryBits=${Hl(t, n)}`,
    );
  let o = 0,
    l = 0;
  const u = kl[t],
    d = kl[n] - 1,
    f = [];
  for (const m of e) {
    if ((fu(m), m >= u))
      throw new Error(`convertRadix2: invalid data word=${m} from=${t}`);
    if (((o = (o << t) | m), l + t > 32))
      throw new Error(`convertRadix2: carry overflow pos=${l} from=${t}`);
    for (l += t; l >= n; l -= n) f.push(((o >> (l - n)) & d) >>> 0);
    const g = kl[l];
    if (g === void 0) throw new Error("invalid carry");
    o &= g - 1;
  }
  if (((o = (o << (n - l)) & d), !i && l >= t))
    throw new Error("Excess padding");
  if (!i && o > 0) throw new Error(`Non-zero padding: ${o}`);
  return (i && l > 0 && f.push(o >>> 0), f);
}
function Bk(e) {
  fu(e);
  const t = 2 ** 8;
  return {
    encode: (n) => {
      if (!th(n)) throw new Error("radix.encode input should be Uint8Array");
      return hy(Array.from(n), t, e);
    },
    decode: (n) => (nh("radix.decode", n), Uint8Array.from(hy(n, e, t))),
  };
}
function $k(e, t = !1) {
  if ((fu(e), e <= 0 || e > 32))
    throw new Error("radix2: bits should be in (0..32]");
  if (Hl(8, e) > 32 || Hl(e, 8) > 32) throw new Error("radix2: carry overflow");
  return {
    encode: (n) => {
      if (!th(n)) throw new Error("radix2.encode input should be Uint8Array");
      return pf(Array.from(n), 8, e, !t);
    },
    decode: (n) => (nh("radix2.decode", n), Uint8Array.from(pf(n, e, 8, t))),
  };
}
function py(e) {
  return (
    Lk(e),
    function (...t) {
      try {
        return e.apply(null, t);
      } catch {}
    }
  );
}
const zk = (e) => _w(Bk(58), Nw(e), Pw("")),
  Lw = zk("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"),
  mf = _w(Nw("qpzry9x8gf2tvdw0s3jn54khce6mua7l"), Pw("")),
  my = [996825010, 642813549, 513874426, 1027748829, 705979059];
function wo(e) {
  const t = e >> 25;
  let n = (e & 33554431) << 5;
  for (let i = 0; i < my.length; i++) ((t >> i) & 1) === 1 && (n ^= my[i]);
  return n;
}
function gy(e, t, n = 1) {
  const i = e.length;
  let o = 1;
  for (let l = 0; l < i; l++) {
    const u = e.charCodeAt(l);
    if (u < 33 || u > 126) throw new Error(`Invalid prefix (${e})`);
    o = wo(o) ^ (u >> 5);
  }
  o = wo(o);
  for (let l = 0; l < i; l++) o = wo(o) ^ (e.charCodeAt(l) & 31);
  for (let l of t) o = wo(o) ^ l;
  for (let l = 0; l < 6; l++) o = wo(o);
  return ((o ^= n), mf.encode(pf([o % kl[30]], 30, 5, !1)));
}
function Fk(e) {
  const t = e === "bech32" ? 1 : 734539939,
    n = $k(5),
    i = n.decode,
    o = n.encode,
    l = py(i);
  function u(y, v, C = 90) {
    (Po("bech32.encode prefix", y),
      th(v) && (v = Array.from(v)),
      nh("bech32.encode", v));
    const E = y.length;
    if (E === 0) throw new TypeError(`Invalid prefix length ${E}`);
    const S = E + 7 + v.length;
    if (C !== !1 && S > C)
      throw new TypeError(`Length ${S} exceeds limit ${C}`);
    const k = y.toLowerCase(),
      x = gy(k, v, t);
    return `${k}1${mf.encode(v)}${x}`;
  }
  function d(y, v = 90) {
    Po("bech32.decode input", y);
    const C = y.length;
    if (C < 8 || (v !== !1 && C > v))
      throw new TypeError(
        `invalid string length: ${C} (${y}). Expected (8..${v})`,
      );
    const E = y.toLowerCase();
    if (y !== E && y !== y.toUpperCase())
      throw new Error("String must be lowercase or uppercase");
    const S = E.lastIndexOf("1");
    if (S === 0 || S === -1)
      throw new Error(
        'Letter "1" must be present between prefix and data only',
      );
    const k = E.slice(0, S),
      x = E.slice(S + 1);
    if (x.length < 6)
      throw new Error("Data must be at least 6 characters long");
    const M = mf.decode(x).slice(0, -6),
      A = gy(k, M, t);
    if (!x.endsWith(A))
      throw new Error(`Invalid checksum in ${y}: expected "${A}"`);
    return { prefix: k, words: M };
  }
  const f = py(d);
  function m(y) {
    const { prefix: v, words: C } = d(y, !1);
    return { prefix: v, words: C, bytes: i(C) };
  }
  function g(y, v) {
    return u(y, o(v));
  }
  return {
    encode: u,
    decode: d,
    encodeFromBytes: g,
    decodeToBytes: m,
    decodeUnsafe: f,
    fromWords: i,
    fromWordsUnsafe: l,
    toWords: o,
  };
}
const Kl = Fk("bech32"),
  hu = (e) => Lw.encode(e),
  Ei = (e) => Lw.decode(e);
function rt(e) {
  return Uint8Array.from(atob(e), (t) => t.charCodeAt(0));
}
const Ud = 8192;
function ze(e) {
  if (e.length < Ud) return btoa(String.fromCharCode(...e));
  let t = "";
  for (var n = 0; n < e.length; n += Ud) {
    const i = e.slice(n, n + Ud);
    t += String.fromCharCode(...i);
  }
  return btoa(t);
}
function rh(e) {
  const t = e.startsWith("0x") ? e.slice(2) : e,
    n = t.length % 2 === 0 ? t : `0${t}`,
    i = n.match(/[0-9a-fA-F]{2}/g)?.map((o) => parseInt(o, 16)) ?? [];
  if (i.length !== n.length / 2) throw new Error(`Invalid hex string ${e}`);
  return Uint8Array.from(i);
}
function $r(e) {
  return e.reduce((t, n) => t + n.toString(16).padStart(2, "0"), "");
}
function Gl(e, t) {
  return Array.from({ length: Math.ceil(e.length / t) }, (n, i) =>
    e.slice(i * t, (i + 1) * t),
  );
}
function Uk() {
  let e, t;
  return {
    promise: new Promise((n, i) => {
      ((e = n), (t = i));
    }),
    resolve: e,
    reject: t,
  };
}
var yy = class {
  constructor(e, t) {
    if (typeof e != "function")
      throw new TypeError(
        `DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>, but got: ${e}.`,
      );
    ((this._batchLoadFn = e),
      (this._maxBatchSize = Kk(t)),
      (this._batchScheduleFn = Gk(t)),
      (this._cacheKeyFn = qk(t)),
      (this._cacheMap = Qk(t)),
      (this._batch = null),
      (this.name = Yk(t)));
  }
  load(e) {
    if (e == null)
      throw new TypeError(
        `The loader.load() function must be called with a value, but got: ${String(e)}.`,
      );
    const t = Wk(this),
      n = this._cacheMap;
    let i;
    if (n) {
      i = this._cacheKeyFn(e);
      const l = n.get(i);
      if (l) {
        const u = t.cacheHits || (t.cacheHits = []);
        return new Promise((d) => {
          u.push(() => {
            d(l);
          });
        });
      }
    }
    t.keys.push(e);
    const o = new Promise((l, u) => {
      t.callbacks.push({ resolve: l, reject: u });
    });
    return (n && n.set(i, o), o);
  }
  loadMany(e) {
    if (!Bw(e))
      throw new TypeError(
        `The loader.loadMany() function must be called with Array<key>, but got: ${e}.`,
      );
    const t = [];
    for (let n = 0; n < e.length; n++) t.push(this.load(e[n]).catch((i) => i));
    return Promise.all(t);
  }
  clear(e) {
    const t = this._cacheMap;
    if (t) {
      const n = this._cacheKeyFn(e);
      t.delete(n);
    }
    return this;
  }
  clearAll() {
    const e = this._cacheMap;
    return (e && e.clear(), this);
  }
  prime(e, t) {
    const n = this._cacheMap;
    if (n) {
      const i = this._cacheKeyFn(e);
      if (n.get(i) === void 0) {
        let o;
        (t instanceof Error
          ? ((o = Promise.reject(t)), o.catch(() => {}))
          : (o = Promise.resolve(t)),
          n.set(i, o));
      }
    }
    return this;
  }
};
const Vk =
  typeof process == "object" && typeof process.nextTick == "function"
    ? function (e) {
        (Vd || (Vd = Promise.resolve()),
          Vd.then(() => {
            process.nextTick(e);
          }));
      }
    : typeof setImmediate == "function"
      ? function (e) {
          setImmediate(e);
        }
      : function (e) {
          setTimeout(e);
        };
let Vd;
function Wk(e) {
  const t = e._batch;
  if (t !== null && !t.hasDispatched && t.keys.length < e._maxBatchSize)
    return t;
  const n = { hasDispatched: !1, keys: [], callbacks: [] };
  return (
    (e._batch = n),
    e._batchScheduleFn(() => {
      Hk(e, n);
    }),
    n
  );
}
function Hk(e, t) {
  if (((t.hasDispatched = !0), t.keys.length === 0)) {
    gf(t);
    return;
  }
  let n;
  try {
    n = e._batchLoadFn(t.keys);
  } catch (i) {
    return Wd(
      e,
      t,
      new TypeError(
        `DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>, but the function errored synchronously: ${String(i)}.`,
      ),
    );
  }
  if (!n || typeof n.then != "function")
    return Wd(
      e,
      t,
      new TypeError(
        `DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>, but the function did not return a Promise: ${String(n)}.`,
      ),
    );
  Promise.resolve(n)
    .then((i) => {
      if (!Bw(i))
        throw new TypeError(
          `DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>, but the function did not return a Promise of an Array: ${String(i)}.`,
        );
      if (i.length !== t.keys.length)
        throw new TypeError(`DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>, but the function did not return a Promise of an Array of the same length as the Array of keys.

Keys:
${String(t.keys)}

Values:
${String(i)}`);
      gf(t);
      for (let o = 0; o < t.callbacks.length; o++) {
        const l = i[o];
        l instanceof Error
          ? t.callbacks[o].reject(l)
          : t.callbacks[o].resolve(l);
      }
    })
    .catch((i) => {
      Wd(e, t, i);
    });
}
function Wd(e, t, n) {
  gf(t);
  for (let i = 0; i < t.keys.length; i++)
    (e.clear(t.keys[i]), t.callbacks[i].reject(n));
}
function gf(e) {
  if (e.cacheHits)
    for (let t = 0; t < e.cacheHits.length; t++) e.cacheHits[t]();
}
function Kk(e) {
  if (!(!e || e.batch !== !1)) return 1;
  const t = e && e.maxBatchSize;
  if (t === void 0) return 1 / 0;
  if (typeof t != "number" || t < 1)
    throw new TypeError(`maxBatchSize must be a positive number: ${t}`);
  return t;
}
function Gk(e) {
  const t = e && e.batchScheduleFn;
  if (t === void 0) return Vk;
  if (typeof t != "function")
    throw new TypeError(`batchScheduleFn must be a function: ${t}`);
  return t;
}
function qk(e) {
  const t = e && e.cacheKeyFn;
  if (t === void 0) return (n) => n;
  if (typeof t != "function")
    throw new TypeError(`cacheKeyFn must be a function: ${t}`);
  return t;
}
function Qk(e) {
  if (!(!e || e.cache !== !1)) return null;
  const t = e && e.cacheMap;
  if (t === void 0) return new Map();
  if (t !== null) {
    const n = ["get", "set", "delete", "clear"].filter(
      (i) => t && typeof t[i] != "function",
    );
    if (n.length !== 0)
      throw new TypeError("Custom cacheMap missing methods: " + n.join(", "));
  }
  return t;
}
function Yk(e) {
  return e && e.name ? e.name : null;
}
function Bw(e) {
  return (
    typeof e == "object" &&
    e !== null &&
    "length" in e &&
    typeof e.length == "number" &&
    (e.length === 0 ||
      (e.length > 0 && Object.prototype.hasOwnProperty.call(e, e.length - 1)))
  );
}
function Xk(e) {
  return (
    (e = e || new Map()),
    {
      all: e,
      on(t, n) {
        const i = e.get(t);
        i ? i.push(n) : e.set(t, [n]);
      },
      off(t, n) {
        const i = e.get(t);
        i && (n ? i.splice(i.indexOf(n) >>> 0, 1) : e.set(t, []));
      },
      emit(t, n) {
        let i = e.get(t);
        (i &&
          i.slice().map((o) => {
            o(n);
          }),
          (i = e.get("*")),
          i &&
            i.slice().map((o) => {
              o(t, n);
            }));
      },
    }
  );
}
function Zk(e, t) {
  switch (t) {
    case "base58":
      return hu(e);
    case "base64":
      return ze(e);
    case "hex":
      return $r(e);
    default:
      throw new Error(
        "Unsupported encoding, supported values are: base64, hex",
      );
  }
}
function $w(e, t = ["<", ">"]) {
  const [n, i] = t,
    o = [];
  let l = "",
    u = 0;
  for (let d = 0; d < e.length; d++) {
    const f = e[d];
    if ((f === n && u++, f === i && u--, u === 0 && f === ",")) {
      (o.push(l.trim()), (l = ""));
      continue;
    }
    l += f;
  }
  return (o.push(l.trim()), o);
}
var Jk = class {
  constructor({
    initialSize: e = 1024,
    maxSize: t = 1 / 0,
    allocateSize: n = 1024,
  } = {}) {
    ((this.bytePosition = 0),
      (this.size = e),
      (this.maxSize = t),
      (this.allocateSize = n),
      (this.dataView = new DataView(new ArrayBuffer(e))));
  }
  ensureSizeOrGrow(e) {
    const t = this.bytePosition + e;
    if (t > this.size) {
      const n = Math.min(
        this.maxSize,
        Math.max(this.size + t, this.size + this.allocateSize),
      );
      if (t > n)
        throw new Error(
          `Attempting to serialize to BCS, but buffer does not have enough size. Allocated size: ${this.size}, Max size: ${this.maxSize}, Required size: ${t}`,
        );
      this.size = n;
      const i = new ArrayBuffer(this.size);
      (new Uint8Array(i).set(new Uint8Array(this.dataView.buffer)),
        (this.dataView = new DataView(i)));
    }
  }
  shift(e) {
    return ((this.bytePosition += e), this);
  }
  write8(e) {
    return (
      this.ensureSizeOrGrow(1),
      this.dataView.setUint8(this.bytePosition, Number(e)),
      this.shift(1)
    );
  }
  writeBytes(e) {
    this.ensureSizeOrGrow(e.length);
    for (let t = 0; t < e.length; t++)
      this.dataView.setUint8(this.bytePosition + t, e[t]);
    return this.shift(e.length);
  }
  write16(e) {
    return (
      this.ensureSizeOrGrow(2),
      this.dataView.setUint16(this.bytePosition, Number(e), !0),
      this.shift(2)
    );
  }
  write32(e) {
    return (
      this.ensureSizeOrGrow(4),
      this.dataView.setUint32(this.bytePosition, Number(e), !0),
      this.shift(4)
    );
  }
  write64(e) {
    return (Hd(BigInt(e), 8).forEach((t) => this.write8(t)), this);
  }
  write128(e) {
    return (Hd(BigInt(e), 16).forEach((t) => this.write8(t)), this);
  }
  write256(e) {
    return (Hd(BigInt(e), 32).forEach((t) => this.write8(t)), this);
  }
  writeULEB(e) {
    return (Vl(e).forEach((t) => this.write8(t)), this);
  }
  writeVec(e, t) {
    return (
      this.writeULEB(e.length),
      Array.from(e).forEach((n, i) => t(this, n, i, e.length)),
      this
    );
  }
  *[Symbol.iterator]() {
    for (let e = 0; e < this.bytePosition; e++) yield this.dataView.getUint8(e);
    return this.toBytes();
  }
  toBytes() {
    return new Uint8Array(this.dataView.buffer.slice(0, this.bytePosition));
  }
  toString(e) {
    return Zk(this.toBytes(), e);
  }
};
function Hd(e, t) {
  const n = new Uint8Array(t);
  let i = 0;
  for (; e > 0; )
    ((n[i] = Number(e % BigInt(256))), (e = e / BigInt(256)), (i += 1));
  return n;
}
var kn = class zw {
  #e;
  #t;
  constructor(t) {
    ((this.name = t.name),
      (this.read = t.read),
      (this.serializedSize = t.serializedSize ?? (() => null)),
      (this.#e = t.write),
      (this.#t =
        t.serialize ??
        ((n, i) => {
          const o = new Jk({
            initialSize: this.serializedSize(n) ?? void 0,
            ...i,
          });
          return (this.#e(n, o), o.toBytes());
        })),
      (this.validate = t.validate ?? (() => {})));
  }
  write(t, n) {
    (this.validate(t), this.#e(t, n));
  }
  serialize(t, n) {
    return (this.validate(t), new eO(this, this.#t(t, n)));
  }
  parse(t) {
    const n = new Dk(t);
    return this.read(n);
  }
  fromHex(t) {
    return this.parse(rh(t));
  }
  fromBase58(t) {
    return this.parse(Ei(t));
  }
  fromBase64(t) {
    return this.parse(rt(t));
  }
  transform({ name: t, input: n, output: i, validate: o }) {
    return new zw({
      name: t ?? this.name,
      read: (l) => (i ? i(this.read(l)) : this.read(l)),
      write: (l, u) => this.#e(n ? n(l) : l, u),
      serializedSize: (l) => this.serializedSize(n ? n(l) : l),
      serialize: (l, u) => this.#t(n ? n(l) : l, u),
      validate: (l) => {
        (o?.(l), this.validate(n ? n(l) : l));
      },
    });
  }
};
const Fw = Symbol.for("@mysten/serialized-bcs");
function yf(e) {
  return !!e && typeof e == "object" && e[Fw] === !0;
}
var eO = class {
  #e;
  #t;
  get [Fw]() {
    return !0;
  }
  constructor(e, t) {
    ((this.#e = e), (this.#t = t));
  }
  toBytes() {
    return this.#t;
  }
  toHex() {
    return $r(this.#t);
  }
  toBase64() {
    return ze(this.#t);
  }
  toBase58() {
    return hu(this.#t);
  }
  parse() {
    return this.#e.parse(this.#t);
  }
};
function ql({ size: e, ...t }) {
  return new kn({ ...t, serializedSize: () => e });
}
function Kd({ readMethod: e, writeMethod: t, ...n }) {
  return ql({
    ...n,
    read: (i) => i[e](),
    write: (i, o) => o[t](i),
    validate: (i) => {
      if (i < 0 || i > n.maxValue)
        throw new TypeError(
          `Invalid ${n.name} value: ${i}. Expected value in range 0-${n.maxValue}`,
        );
      n.validate?.(i);
    },
  });
}
function Gd({ readMethod: e, writeMethod: t, ...n }) {
  return ql({
    ...n,
    read: (i) => i[e](),
    write: (i, o) => o[t](BigInt(i)),
    validate: (i) => {
      const o = BigInt(i);
      if (o < 0 || o > n.maxValue)
        throw new TypeError(
          `Invalid ${n.name} value: ${o}. Expected value in range 0-${n.maxValue}`,
        );
      n.validate?.(o);
    },
  });
}
function tO({ serialize: e, ...t }) {
  const n = new kn({
    ...t,
    serialize: e,
    write: (i, o) => {
      for (const l of n.serialize(i).toBytes()) o.write8(l);
    },
  });
  return n;
}
function nO({ toBytes: e, fromBytes: t, ...n }) {
  return new kn({
    ...n,
    read: (i) => {
      const o = i.readULEB();
      return t(i.readBytes(o));
    },
    write: (i, o) => {
      const l = e(i);
      o.writeULEB(l.length);
      for (let u = 0; u < l.length; u++) o.write8(l[u]);
    },
    serialize: (i) => {
      const o = e(i),
        l = Vl(o.length),
        u = new Uint8Array(l.length + o.length);
      return (u.set(l, 0), u.set(o, l.length), u);
    },
    validate: (i) => {
      if (typeof i != "string")
        throw new TypeError(`Invalid ${n.name} value: ${i}. Expected string`);
      n.validate?.(i);
    },
  });
}
function rO(e) {
  let t = null;
  function n() {
    return (t || (t = e()), t);
  }
  return new kn({
    name: "lazy",
    read: (i) => n().read(i),
    serializedSize: (i) => n().serializedSize(i),
    write: (i, o) => n().write(i, o),
    serialize: (i, o) => n().serialize(i, o).toBytes(),
  });
}
var sO = class extends kn {
    constructor({ name: e, fields: t, ...n }) {
      const i = Object.entries(t);
      super({
        name: e,
        serializedSize: (o) => {
          let l = 0;
          for (const [u, d] of i) {
            const f = d.serializedSize(o[u]);
            if (f == null) return null;
            l += f;
          }
          return l;
        },
        read: (o) => {
          const l = {};
          for (const [u, d] of i) l[u] = d.read(o);
          return l;
        },
        write: (o, l) => {
          for (const [u, d] of i) d.write(o[u], l);
        },
        ...n,
        validate: (o) => {
          if ((n?.validate?.(o), typeof o != "object" || o == null))
            throw new TypeError(`Expected object, found ${typeof o}`);
        },
      });
    }
  },
  iO = class extends kn {
    constructor({ fields: e, ...t }) {
      const n = Object.entries(e);
      super({
        read: (i) => {
          const o = i.readULEB(),
            l = n[o];
          if (!l) throw new TypeError(`Unknown value ${o} for enum ${t.name}`);
          const [u, d] = l;
          return { [u]: d?.read(i) ?? !0, $kind: u };
        },
        write: (i, o) => {
          const [l, u] = Object.entries(i).filter(([d]) =>
            Object.hasOwn(e, d),
          )[0];
          for (let d = 0; d < n.length; d++) {
            const [f, m] = n[d];
            if (f === l) {
              (o.writeULEB(d), m?.write(u, o));
              return;
            }
          }
        },
        ...t,
        validate: (i) => {
          if ((t?.validate?.(i), typeof i != "object" || i == null))
            throw new TypeError(`Expected object, found ${typeof i}`);
          const o = Object.keys(i).filter(
            (u) => i[u] !== void 0 && Object.hasOwn(e, u),
          );
          if (o.length !== 1)
            throw new TypeError(
              `Expected object with one key, but found ${o.length} for type ${t.name}}`,
            );
          const [l] = o;
          if (!Object.hasOwn(e, l))
            throw new TypeError(`Invalid enum variant ${l}`);
        },
      });
    }
  },
  oO = class extends kn {
    constructor({ fields: e, name: t, ...n }) {
      super({
        name: t ?? `(${e.map((i) => i.name).join(", ")})`,
        serializedSize: (i) => {
          let o = 0;
          for (let l = 0; l < e.length; l++) {
            const u = e[l].serializedSize(i[l]);
            if (u == null) return null;
            o += u;
          }
          return o;
        },
        read: (i) => {
          const o = [];
          for (const l of e) o.push(l.read(i));
          return o;
        },
        write: (i, o) => {
          for (let l = 0; l < e.length; l++) e[l].write(i[l], o);
        },
        ...n,
        validate: (i) => {
          if ((n?.validate?.(i), !Array.isArray(i)))
            throw new TypeError(`Expected array, found ${typeof i}`);
          if (i.length !== e.length)
            throw new TypeError(
              `Expected array of length ${e.length}, found ${i.length}`,
            );
        },
      });
    }
  };
function aO(e, t, n) {
  return new kn({
    read: (i) => {
      const o = new Array(e);
      for (let l = 0; l < e; l++) o[l] = t.read(i);
      return o;
    },
    write: (i, o) => {
      for (const l of i) t.write(l, o);
    },
    ...n,
    name: n?.name ?? `${t.name}[${e}]`,
    validate: (i) => {
      if ((n?.validate?.(i), !i || typeof i != "object" || !("length" in i)))
        throw new TypeError(`Expected array, found ${typeof i}`);
      if (i.length !== e)
        throw new TypeError(`Expected array of length ${e}, found ${i.length}`);
    },
  });
}
function lO(e) {
  return T.enum(`Option<${e.name}>`, { None: null, Some: e }).transform({
    input: (t) => (t == null ? { None: !0 } : { Some: t }),
    output: (t) => (t.$kind === "Some" ? t.Some : null),
  });
}
function uO(e, t) {
  return new kn({
    read: (n) => {
      const i = n.readULEB(),
        o = new Array(i);
      for (let l = 0; l < i; l++) o[l] = e.read(n);
      return o;
    },
    write: (n, i) => {
      i.writeULEB(n.length);
      for (const o of n) e.write(o, i);
    },
    ...t,
    name: t?.name ?? `vector<${e.name}>`,
    validate: (n) => {
      if ((t?.validate?.(n), !n || typeof n != "object" || !("length" in n)))
        throw new TypeError(`Expected array, found ${typeof n}`);
    },
  });
}
function cO(e, t) {
  for (let n = 0; n < Math.min(e.length, t.length); n++)
    if (e[n] !== t[n]) return e[n] - t[n];
  return e.length - t.length;
}
function dO(e, t) {
  return new kn({
    name: `Map<${e.name}, ${t.name}>`,
    read: (n) => {
      const i = n.readULEB(),
        o = new Map();
      for (let l = 0; l < i; l++) o.set(e.read(n), t.read(n));
      return o;
    },
    write: (n, i) => {
      const o = [...n.entries()].map(([l, u]) => [e.serialize(l).toBytes(), u]);
      (o.sort(([l], [u]) => cO(l, u)), i.writeULEB(o.length));
      for (const [l, u] of o) (i.writeBytes(l), t.write(u, i));
    },
  });
}
const T = {
    u8(e) {
      return Kd({
        readMethod: "read8",
        writeMethod: "write8",
        size: 1,
        maxValue: 2 ** 8 - 1,
        ...e,
        name: e?.name ?? "u8",
      });
    },
    u16(e) {
      return Kd({
        readMethod: "read16",
        writeMethod: "write16",
        size: 2,
        maxValue: 2 ** 16 - 1,
        ...e,
        name: e?.name ?? "u16",
      });
    },
    u32(e) {
      return Kd({
        readMethod: "read32",
        writeMethod: "write32",
        size: 4,
        maxValue: 2 ** 32 - 1,
        ...e,
        name: e?.name ?? "u32",
      });
    },
    u64(e) {
      return Gd({
        readMethod: "read64",
        writeMethod: "write64",
        size: 8,
        maxValue: 2n ** 64n - 1n,
        ...e,
        name: e?.name ?? "u64",
      });
    },
    u128(e) {
      return Gd({
        readMethod: "read128",
        writeMethod: "write128",
        size: 16,
        maxValue: 2n ** 128n - 1n,
        ...e,
        name: e?.name ?? "u128",
      });
    },
    u256(e) {
      return Gd({
        readMethod: "read256",
        writeMethod: "write256",
        size: 32,
        maxValue: 2n ** 256n - 1n,
        ...e,
        name: e?.name ?? "u256",
      });
    },
    bool(e) {
      return ql({
        size: 1,
        read: (t) => t.read8() === 1,
        write: (t, n) => n.write8(t ? 1 : 0),
        ...e,
        name: e?.name ?? "bool",
        validate: (t) => {
          if ((e?.validate?.(t), typeof t != "boolean"))
            throw new TypeError(`Expected boolean, found ${typeof t}`);
        },
      });
    },
    uleb128(e) {
      return tO({
        read: (t) => t.readULEB(),
        serialize: (t) => Uint8Array.from(Vl(t)),
        ...e,
        name: e?.name ?? "uleb128",
      });
    },
    bytes(e, t) {
      return ql({
        size: e,
        read: (n) => n.readBytes(e),
        write: (n, i) => {
          i.writeBytes(new Uint8Array(n));
        },
        ...t,
        name: t?.name ?? `bytes[${e}]`,
        validate: (n) => {
          if (
            (t?.validate?.(n), !n || typeof n != "object" || !("length" in n))
          )
            throw new TypeError(`Expected array, found ${typeof n}`);
          if (n.length !== e)
            throw new TypeError(
              `Expected array of length ${e}, found ${n.length}`,
            );
        },
      });
    },
    byteVector(e) {
      return new kn({
        read: (t) => {
          const n = t.readULEB();
          return t.readBytes(n);
        },
        write: (t, n) => {
          const i = new Uint8Array(t);
          (n.writeULEB(i.length), n.writeBytes(i));
        },
        ...e,
        name: e?.name ?? "vector<u8>",
        serializedSize: (t) => {
          const n = "length" in t ? t.length : null;
          return n == null ? null : Vl(n).length + n;
        },
        validate: (t) => {
          if (
            (e?.validate?.(t), !t || typeof t != "object" || !("length" in t))
          )
            throw new TypeError(`Expected array, found ${typeof t}`);
        },
      });
    },
    string(e) {
      return nO({
        toBytes: (t) => new TextEncoder().encode(t),
        fromBytes: (t) => new TextDecoder().decode(t),
        ...e,
        name: e?.name ?? "string",
      });
    },
    fixedArray: aO,
    option: lO,
    vector: uO,
    tuple(e, t) {
      return new oO({ fields: e, ...t });
    },
    struct(e, t, n) {
      return new sO({ name: e, fields: t, ...n });
    },
    enum(e, t, n) {
      return new iO({ name: e, fields: t, ...n });
    },
    map: dO,
    lazy(e) {
      return rO(e);
    },
  },
  fO = 32;
function vy(e) {
  try {
    return Ei(e).length === fO;
  } catch {
    return !1;
  }
}
const qo = 32;
function ln(e) {
  return gO(e) && yO(e) === qo;
}
function wl(e) {
  return ln(e);
}
const hO = /^[a-zA-Z][a-zA-Z0-9_]*$/;
function wy(e) {
  return hO.test(e);
}
const pO = [
    "bool",
    "u8",
    "u16",
    "u32",
    "u64",
    "u128",
    "u256",
    "address",
    "signer",
  ],
  mO = /^vector<(.+)>$/;
function Uw(e) {
  if (pO.includes(e)) return !0;
  const t = e.match(mO);
  return t ? Uw(t[1]) : e.includes("::") ? Ww(e) : !1;
}
function Vw(e) {
  return (!ln(e.address) && !Bt(e.address)) || !wy(e.module) || !wy(e.name)
    ? !1
    : e.typeParams.every((t) => (typeof t == "string" ? Uw(t) : Vw(t)));
}
function Ww(e) {
  try {
    return Vw(zr(e));
  } catch {
    return !1;
  }
}
function Hw(e) {
  if (e.startsWith("vector<")) {
    if (!e.endsWith(">")) throw new Error(`Invalid type tag: ${e}`);
    const t = e.slice(7, -1);
    if (!t) throw new Error(`Invalid type tag: ${e}`);
    const n = Hw(t);
    return typeof n == "string" ? `vector<${n}>` : `vector<${Ke(n)}>`;
  }
  return e.includes("::") ? zr(e) : e;
}
function zr(e) {
  const t = e.split("::");
  if (t.length < 3) throw new Error(`Invalid struct tag: ${e}`);
  const [n, i] = t,
    o = Bt(n),
    l = e.slice(n.length + i.length + 4),
    u = l.includes("<") ? l.slice(0, l.indexOf("<")) : l,
    d = l.includes("<")
      ? $w(l.slice(l.indexOf("<") + 1, l.lastIndexOf(">"))).map((f) =>
          Hw(f.trim()),
        )
      : [];
  return { address: o ? n : Ee(n), module: i, name: u, typeParams: d };
}
function Ke(e) {
  const {
    address: t,
    module: n,
    name: i,
    typeParams: o,
  } = typeof e == "string" ? zr(e) : e;
  return `${t}::${n}::${i}${o?.length > 0 ? `<${o.map((l) => (typeof l == "string" ? l : Ke(l))).join(",")}>` : ""}`;
}
function Ee(e, t = !1) {
  let n = e.toLowerCase();
  return (
    !t && n.startsWith("0x") && (n = n.slice(2)),
    `0x${n.padStart(qo * 2, "0")}`
  );
}
function ps(e, t = !1) {
  return Ee(e, t);
}
function gO(e) {
  return /^(0x|0X)?[a-fA-F0-9]+$/.test(e) && e.length % 2 === 0;
}
function yO(e) {
  return /^(0x|0X)/.test(e) ? (e.length - 2) / 2 : e.length / 2;
}
const vO = /^([a-z0-9]+(?:-[a-z0-9]+)*)$/,
  wO = /^\d+$/,
  bO = 64,
  Kw = "/",
  Bt = (e) => {
    const t = e.split(Kw);
    if (t.length < 2 || t.length > 3) return !1;
    const [n, i, o] = t;
    return (o !== void 0 && !wO.test(o)) || !_k(n)
      ? !1
      : vO.test(i) && i.length < bO;
  },
  SO = (e) => {
    const t = e.split(/::|<|>|,/);
    for (const n of t) if (n.includes(Kw) && !Bt(n)) return !1;
    return Ww(e);
  },
  EO = /^vector<(.+)>$/,
  xO = /^([^:]+)::([^:]+)::([^<]+)(<(.+)>)?/;
var ws = class ui {
  static parseFromStr(t, n = !1) {
    if (t === "address") return { address: null };
    if (t === "bool") return { bool: null };
    if (t === "u8") return { u8: null };
    if (t === "u16") return { u16: null };
    if (t === "u32") return { u32: null };
    if (t === "u64") return { u64: null };
    if (t === "u128") return { u128: null };
    if (t === "u256") return { u256: null };
    if (t === "signer") return { signer: null };
    const i = t.match(EO);
    if (i) return { vector: ui.parseFromStr(i[1], n) };
    const o = t.match(xO);
    if (o)
      return {
        struct: {
          address: n ? Ee(o[1]) : o[1],
          module: o[2],
          name: o[3],
          typeParams: o[5] === void 0 ? [] : ui.parseStructTypeArgs(o[5], n),
        },
      };
    throw new Error(
      `Encountered unexpected token when parsing type args for ${t}`,
    );
  }
  static parseStructTypeArgs(t, n = !1) {
    return $w(t).map((i) => ui.parseFromStr(i, n));
  }
  static tagToString(t) {
    if ("bool" in t) return "bool";
    if ("u8" in t) return "u8";
    if ("u16" in t) return "u16";
    if ("u32" in t) return "u32";
    if ("u64" in t) return "u64";
    if ("u128" in t) return "u128";
    if ("u256" in t) return "u256";
    if ("address" in t) return "address";
    if ("signer" in t) return "signer";
    if ("vector" in t) return `vector<${ui.tagToString(t.vector)}>`;
    if ("struct" in t) {
      const n = t.struct,
        i = n.typeParams.map(ui.tagToString).join(", ");
      return `${n.address}::${n.module}::${n.name}${i ? `<${i}>` : ""}`;
    }
    throw new Error("Invalid TypeTag");
  }
};
function CO(e) {
  return T.u64({ name: "unsafe_u64", ...e }).transform({
    input: (t) => t,
    output: (t) => Number(t),
  });
}
function kO(e) {
  return T.enum("Option", { None: null, Some: e });
}
const Ae = T.bytes(qo).transform({
    validate: (e) => {
      const t = typeof e == "string" ? e : $r(e);
      if (!t || !ln(Ee(t))) throw new Error(`Invalid Sui address ${t}`);
    },
    input: (e) => (typeof e == "string" ? rh(Ee(e)) : e),
    output: (e) => Ee($r(e)),
  }),
  $t = T.byteVector().transform({
    name: "ObjectDigest",
    input: (e) => Ei(e),
    output: (e) => hu(new Uint8Array(e)),
    validate: (e) => {
      if (Ei(e).length !== 32) throw new Error("ObjectDigest must be 32 bytes");
    },
  }),
  on = T.struct("SuiObjectRef", { objectId: Ae, version: T.u64(), digest: $t }),
  Gw = T.struct("SharedObjectRef", {
    objectId: Ae,
    initialSharedVersion: T.u64(),
    mutable: T.bool(),
  }),
  qw = T.enum("ObjectArg", {
    ImmOrOwnedObject: on,
    SharedObject: Gw,
    Receiving: on,
  }),
  Dr = T.enum("Owner", {
    AddressOwner: Ae,
    ObjectOwner: Ae,
    Shared: T.struct("Shared", { initialSharedVersion: T.u64() }),
    Immutable: null,
    ConsensusAddressOwner: T.struct("ConsensusAddressOwner", {
      startVersion: T.u64(),
      owner: Ae,
    }),
  }),
  OO = T.enum("Reservation", { MaxAmountU64: T.u64() }),
  TO = T.enum("WithdrawalType", { Balance: T.lazy(() => Ti) }),
  IO = T.enum("WithdrawFrom", { Sender: null, Sponsor: null }),
  MO = T.struct("FundsWithdrawal", {
    reservation: OO,
    typeArg: TO,
    withdrawFrom: IO,
  }),
  Qw = T.enum("CallArg", {
    Pure: T.struct("Pure", {
      bytes: T.byteVector().transform({
        input: (e) => (typeof e == "string" ? rt(e) : e),
        output: (e) => ze(new Uint8Array(e)),
      }),
    }),
    Object: qw,
    FundsWithdrawal: MO,
  }),
  sh = T.enum("TypeTag", {
    bool: null,
    u8: null,
    u64: null,
    u128: null,
    address: null,
    signer: null,
    vector: T.lazy(() => sh),
    struct: T.lazy(() => ih),
    u16: null,
    u32: null,
    u256: null,
  }),
  Ti = sh.transform({
    input: (e) => (typeof e == "string" ? ws.parseFromStr(e, !0) : e),
    output: (e) => ws.tagToString(e),
  }),
  Nn = T.enum("Argument", {
    GasCoin: null,
    Input: T.u16(),
    Result: T.u16(),
    NestedResult: T.tuple([T.u16(), T.u16()]),
  }),
  Yw = T.struct("ProgrammableMoveCall", {
    package: Ae,
    module: T.string(),
    function: T.string(),
    typeArguments: T.vector(Ti),
    arguments: T.vector(Nn),
  }),
  Xw = T.enum("Command", {
    MoveCall: Yw,
    TransferObjects: T.struct("TransferObjects", {
      objects: T.vector(Nn),
      address: Nn,
    }),
    SplitCoins: T.struct("SplitCoins", { coin: Nn, amounts: T.vector(Nn) }),
    MergeCoins: T.struct("MergeCoins", {
      destination: Nn,
      sources: T.vector(Nn),
    }),
    Publish: T.struct("Publish", {
      modules: T.vector(
        T.byteVector().transform({
          input: (e) => (typeof e == "string" ? rt(e) : e),
          output: (e) => ze(new Uint8Array(e)),
        }),
      ),
      dependencies: T.vector(Ae),
    }),
    MakeMoveVec: T.struct("MakeMoveVec", {
      type: kO(Ti).transform({
        input: (e) => (e === null ? { None: !0 } : { Some: e }),
        output: (e) => e.Some ?? null,
      }),
      elements: T.vector(Nn),
    }),
    Upgrade: T.struct("Upgrade", {
      modules: T.vector(
        T.byteVector().transform({
          input: (e) => (typeof e == "string" ? rt(e) : e),
          output: (e) => ze(new Uint8Array(e)),
        }),
      ),
      dependencies: T.vector(Ae),
      package: Ae,
      ticket: Nn,
    }),
  }),
  Zw = T.struct("ProgrammableTransaction", {
    inputs: T.vector(Qw),
    commands: T.vector(Xw),
  }),
  Jw = T.enum("TransactionKind", {
    ProgrammableTransaction: Zw,
    ChangeEpoch: null,
    Genesis: null,
    ConsensusCommitPrologue: null,
  }),
  AO = T.struct("ValidDuring", {
    minEpoch: T.option(T.u64()),
    maxEpoch: T.option(T.u64()),
    minTimestamp: T.option(T.u64()),
    maxTimestamp: T.option(T.u64()),
    chain: $t,
    nonce: T.u32(),
  }),
  e0 = T.enum("TransactionExpiration", {
    None: null,
    Epoch: CO(),
    ValidDuring: AO,
  }),
  ih = T.struct("StructTag", {
    address: Ae,
    module: T.string(),
    name: T.string(),
    typeParams: T.vector(sh),
  }),
  t0 = T.struct("GasData", {
    payment: T.vector(on),
    owner: Ae,
    price: T.u64(),
    budget: T.u64(),
  }),
  n0 = T.struct("TransactionDataV1", {
    kind: Jw,
    sender: Ae,
    gasData: t0,
    expiration: e0,
  }),
  r0 = T.enum("TransactionData", { V1: n0 }),
  s0 = T.enum("IntentScope", {
    TransactionData: null,
    TransactionEffects: null,
    CheckpointSummary: null,
    PersonalMessage: null,
  }),
  i0 = T.enum("IntentVersion", { V0: null }),
  o0 = T.enum("AppId", { Sui: null }),
  a0 = T.struct("Intent", { scope: s0, version: i0, appId: o0 });
function l0(e) {
  return T.struct(`IntentMessage<${e.name}>`, { intent: a0, value: e });
}
const u0 = T.enum("CompressedSignature", {
    ED25519: T.bytes(64),
    Secp256k1: T.bytes(64),
    Secp256r1: T.bytes(64),
    ZkLogin: T.byteVector(),
    Passkey: T.byteVector(),
  }),
  c0 = T.enum("PublicKey", {
    ED25519: T.bytes(32),
    Secp256k1: T.bytes(33),
    Secp256r1: T.bytes(33),
    ZkLogin: T.byteVector(),
    Passkey: T.bytes(33),
  }),
  d0 = T.struct("MultiSigPkMap", { pubKey: c0, weight: T.u8() }),
  f0 = T.struct("MultiSigPublicKey", {
    pk_map: T.vector(d0),
    threshold: T.u16(),
  }),
  jO = T.struct("MultiSig", {
    sigs: T.vector(u0),
    bitmap: T.u16(),
    multisig_pk: f0,
  }),
  RO = T.byteVector().transform({
    input: (e) => (typeof e == "string" ? rt(e) : e),
    output: (e) => ze(new Uint8Array(e)),
  }),
  h0 = T.struct("SenderSignedTransaction", {
    intentMessage: l0(r0),
    txSignatures: T.vector(RO),
  }),
  _O = T.vector(h0, { name: "SenderSignedData" }),
  NO = T.struct("PasskeyAuthenticator", {
    authenticatorData: T.byteVector(),
    clientDataJson: T.string(),
    userSignature: T.byteVector(),
  }),
  p0 = T.enum("MoveObjectType", {
    Other: ih,
    GasCoin: null,
    StakedSui: null,
    Coin: Ti,
    AccumulatorBalanceWrapper: null,
  }),
  m0 = T.struct("TypeOrigin", {
    moduleName: T.string(),
    datatypeName: T.string(),
    package: Ae,
  }),
  g0 = T.struct("UpgradeInfo", { upgradedId: Ae, upgradedVersion: T.u64() }),
  y0 = T.struct("MovePackage", {
    id: Ae,
    version: T.u64(),
    moduleMap: T.map(T.string(), T.byteVector()),
    typeOriginTable: T.vector(m0),
    linkageTable: T.map(Ae, g0),
  }),
  v0 = T.struct("MoveObject", {
    type: p0,
    hasPublicTransfer: T.bool(),
    version: T.u64(),
    contents: T.byteVector(),
  }),
  w0 = T.enum("Data", { Move: v0, Package: y0 }),
  PO = T.struct("ObjectInner", {
    data: w0,
    owner: Dr,
    previousTransaction: $t,
    storageRebate: T.u64(),
  }),
  DO = T.enum("PackageUpgradeError", {
    UnableToFetchPackage: T.struct("UnableToFetchPackage", { packageId: Ae }),
    NotAPackage: T.struct("NotAPackage", { objectId: Ae }),
    IncompatibleUpgrade: null,
    DigestDoesNotMatch: T.struct("DigestDoesNotMatch", {
      digest: T.byteVector(),
    }),
    UnknownUpgradePolicy: T.struct("UnknownUpgradePolicy", { policy: T.u8() }),
    PackageIDDoesNotMatch: T.struct("PackageIDDoesNotMatch", {
      packageId: Ae,
      ticketId: Ae,
    }),
  }),
  LO = T.struct("ModuleId", { address: Ae, name: T.string() }),
  by = T.struct("MoveLocation", {
    module: LO,
    function: T.u16(),
    instruction: T.u16(),
    functionName: T.option(T.string()),
  }),
  BO = T.enum("CommandArgumentError", {
    TypeMismatch: null,
    InvalidBCSBytes: null,
    InvalidUsageOfPureArg: null,
    InvalidArgumentToPrivateEntryFunction: null,
    IndexOutOfBounds: T.struct("IndexOutOfBounds", { idx: T.u16() }),
    SecondaryIndexOutOfBounds: T.struct("SecondaryIndexOutOfBounds", {
      resultIdx: T.u16(),
      secondaryIdx: T.u16(),
    }),
    InvalidResultArity: T.struct("InvalidResultArity", { resultIdx: T.u16() }),
    InvalidGasCoinUsage: null,
    InvalidValueUsage: null,
    InvalidObjectByValue: null,
    InvalidObjectByMutRef: null,
    SharedObjectOperationNotAllowed: null,
    InvalidArgumentArity: null,
    InvalidTransferObject: null,
    InvalidMakeMoveVecNonObjectArgument: null,
    ArgumentWithoutValue: null,
    CannotMoveBorrowedValue: null,
    CannotWriteToExtendedReference: null,
    InvalidReferenceArgument: null,
  }),
  $O = T.enum("TypeArgumentError", {
    TypeNotFound: null,
    ConstraintNotSatisfied: null,
  }),
  zO = T.enum("ExecutionFailureStatus", {
    InsufficientGas: null,
    InvalidGasObject: null,
    InvariantViolation: null,
    FeatureNotYetSupported: null,
    MoveObjectTooBig: T.struct("MoveObjectTooBig", {
      objectSize: T.u64(),
      maxObjectSize: T.u64(),
    }),
    MovePackageTooBig: T.struct("MovePackageTooBig", {
      objectSize: T.u64(),
      maxObjectSize: T.u64(),
    }),
    CircularObjectOwnership: T.struct("CircularObjectOwnership", {
      object: Ae,
    }),
    InsufficientCoinBalance: null,
    CoinBalanceOverflow: null,
    PublishErrorNonZeroAddress: null,
    SuiMoveVerificationError: null,
    MovePrimitiveRuntimeError: T.option(by),
    MoveAbort: T.tuple([by, T.u64()]),
    VMVerificationOrDeserializationError: null,
    VMInvariantViolation: null,
    FunctionNotFound: null,
    ArityMismatch: null,
    TypeArityMismatch: null,
    NonEntryFunctionInvoked: null,
    CommandArgumentError: T.struct("CommandArgumentError", {
      argIdx: T.u16(),
      kind: BO,
    }),
    TypeArgumentError: T.struct("TypeArgumentError", {
      argumentIdx: T.u16(),
      kind: $O,
    }),
    UnusedValueWithoutDrop: T.struct("UnusedValueWithoutDrop", {
      resultIdx: T.u16(),
      secondaryIdx: T.u16(),
    }),
    InvalidPublicFunctionReturnType: T.struct(
      "InvalidPublicFunctionReturnType",
      { idx: T.u16() },
    ),
    InvalidTransferObject: null,
    EffectsTooLarge: T.struct("EffectsTooLarge", {
      currentSize: T.u64(),
      maxSize: T.u64(),
    }),
    PublishUpgradeMissingDependency: null,
    PublishUpgradeDependencyDowngrade: null,
    PackageUpgradeError: T.struct("PackageUpgradeError", { upgradeError: DO }),
    WrittenObjectsTooLarge: T.struct("WrittenObjectsTooLarge", {
      currentSize: T.u64(),
      maxSize: T.u64(),
    }),
    CertificateDenied: null,
    SuiMoveVerificationTimedout: null,
    SharedObjectOperationNotAllowed: null,
    InputObjectDeleted: null,
    ExecutionCancelledDueToSharedObjectCongestion: T.struct(
      "ExecutionCancelledDueToSharedObjectCongestion",
      { congested_objects: T.vector(Ae) },
    ),
    AddressDeniedForCoin: T.struct("AddressDeniedForCoin", {
      address: Ae,
      coinType: T.string(),
    }),
    CoinTypeGlobalPause: T.struct("CoinTypeGlobalPause", {
      coinType: T.string(),
    }),
    ExecutionCancelledDueToRandomnessUnavailable: null,
    MoveVectorElemTooBig: T.struct("MoveVectorElemTooBig", {
      valueSize: T.u64(),
      maxScaledSize: T.u64(),
    }),
    MoveRawValueTooBig: T.struct("MoveRawValueTooBig", {
      valueSize: T.u64(),
      maxScaledSize: T.u64(),
    }),
    InvalidLinkage: null,
    InsufficientBalanceForWithdraw: null,
    NonExclusiveWriteInputObjectModified: T.struct(
      "NonExclusiveWriteInputObjectModified",
      { id: Ae },
    ),
  }),
  oh = T.enum("ExecutionStatus", {
    Success: null,
    Failure: T.struct("Failure", { error: zO, command: T.option(T.u64()) }),
  }),
  b0 = T.struct("GasCostSummary", {
    computationCost: T.u64(),
    storageCost: T.u64(),
    storageRebate: T.u64(),
    nonRefundableStorageFee: T.u64(),
  }),
  FO = T.struct("TransactionEffectsV1", {
    status: oh,
    executedEpoch: T.u64(),
    gasUsed: b0,
    modifiedAtVersions: T.vector(T.tuple([Ae, T.u64()])),
    sharedObjects: T.vector(on),
    transactionDigest: $t,
    created: T.vector(T.tuple([on, Dr])),
    mutated: T.vector(T.tuple([on, Dr])),
    unwrapped: T.vector(T.tuple([on, Dr])),
    deleted: T.vector(on),
    unwrappedThenDeleted: T.vector(on),
    wrapped: T.vector(on),
    gasObject: T.tuple([on, Dr]),
    eventsDigest: T.option($t),
    dependencies: T.vector($t),
  }),
  ah = T.tuple([T.u64(), $t]),
  UO = T.enum("ObjectIn", { NotExist: null, Exist: T.tuple([ah, Dr]) }),
  VO = T.struct("AccumulatorAddress", { address: Ae, ty: Ti }),
  WO = T.enum("AccumulatorOperation", { Merge: null, Split: null }),
  HO = T.enum("AccumulatorValue", {
    Integer: T.u64(),
    IntegerTuple: T.tuple([T.u64(), T.u64()]),
    EventDigest: T.vector(T.tuple([T.u64(), $t])),
  }),
  KO = T.struct("AccumulatorWriteV1", {
    address: VO,
    operation: WO,
    value: HO,
  }),
  GO = T.enum("ObjectOut", {
    NotExist: null,
    ObjectWrite: T.tuple([$t, Dr]),
    PackageWrite: ah,
    AccumulatorWriteV1: KO,
  }),
  qO = T.enum("IDOperation", { None: null, Created: null, Deleted: null }),
  QO = T.struct("EffectsObjectChange", {
    inputState: UO,
    outputState: GO,
    idOperation: qO,
  }),
  YO = T.enum("UnchangedConsensusKind", {
    ReadOnlyRoot: ah,
    MutateConsensusStreamEnded: T.u64(),
    ReadConsensusStreamEnded: T.u64(),
    Cancelled: T.u64(),
    PerEpochConfig: null,
  }),
  XO = T.struct("TransactionEffectsV2", {
    status: oh,
    executedEpoch: T.u64(),
    gasUsed: b0,
    transactionDigest: $t,
    gasObjectIndex: T.option(T.u32()),
    eventsDigest: T.option($t),
    dependencies: T.vector($t),
    lamportVersion: T.u64(),
    changedObjects: T.vector(T.tuple([Ae, QO])),
    unchangedConsensusObjects: T.vector(T.tuple([Ae, YO])),
    auxDataDigest: T.option($t),
  }),
  ZO = T.enum("TransactionEffects", { V1: FO, V2: XO });
function Mo(e) {
  switch (e) {
    case "u8":
      return T.u8();
    case "u16":
      return T.u16();
    case "u32":
      return T.u32();
    case "u64":
      return T.u64();
    case "u128":
      return T.u128();
    case "u256":
      return T.u256();
    case "bool":
      return T.bool();
    case "string":
      return T.string();
    case "id":
    case "address":
      return Ae;
  }
  const t = e.match(/^(vector|option)<(.+)>$/);
  if (t) {
    const [n, i] = t.slice(1);
    return n === "vector" ? T.vector(Mo(i)) : T.option(Mo(i));
  }
  throw new Error(`Invalid Pure type name: ${e}`);
}
const pe = {
  ...T,
  U8: T.u8(),
  U16: T.u16(),
  U32: T.u32(),
  U64: T.u64(),
  U128: T.u128(),
  U256: T.u256(),
  ULEB128: T.uleb128(),
  Bool: T.bool(),
  String: T.string(),
  Address: Ae,
  AppId: o0,
  Argument: Nn,
  CallArg: Qw,
  Command: Xw,
  CompressedSignature: u0,
  Data: w0,
  GasData: t0,
  Intent: a0,
  IntentMessage: l0,
  IntentScope: s0,
  IntentVersion: i0,
  MoveObject: v0,
  MoveObjectType: p0,
  MovePackage: y0,
  MultiSig: jO,
  MultiSigPkMap: d0,
  MultiSigPublicKey: f0,
  Object: PO,
  ObjectArg: qw,
  ObjectDigest: $t,
  Owner: Dr,
  PasskeyAuthenticator: NO,
  ProgrammableMoveCall: Yw,
  ProgrammableTransaction: Zw,
  PublicKey: c0,
  SenderSignedData: _O,
  SenderSignedTransaction: h0,
  SharedObjectRef: Gw,
  StructTag: ih,
  SuiObjectRef: on,
  TransactionData: r0,
  TransactionDataV1: n0,
  TransactionEffects: ZO,
  TransactionExpiration: e0,
  TransactionKind: Jw,
  TypeOrigin: m0,
  TypeTag: Ti,
  UpgradeInfo: g0,
};
function S0(e) {
  return (
    e instanceof Uint8Array ||
    (ArrayBuffer.isView(e) && e.constructor.name === "Uint8Array")
  );
}
function bn(e, t = "") {
  if (!Number.isSafeInteger(e) || e < 0) {
    const n = t && `"${t}" `;
    throw new Error(`${n}expected integer >= 0, got ${e}`);
  }
}
function Ne(e, t, n = "") {
  const i = S0(e),
    o = e?.length,
    l = t !== void 0;
  if (!i || (l && o !== t)) {
    const u = n && `"${n}" `,
      d = l ? ` of length ${t}` : "",
      f = i ? `length=${o}` : `type=${typeof e}`;
    throw new Error(u + "expected Uint8Array" + d + ", got " + f);
  }
  return e;
}
function E0(e) {
  if (typeof e != "function" || typeof e.create != "function")
    throw new Error("Hash must wrapped by utils.createHasher");
  (bn(e.outputLen), bn(e.blockLen));
}
function xi(e, t = !0) {
  if (e.destroyed) throw new Error("Hash instance has been destroyed");
  if (t && e.finished) throw new Error("Hash#digest() has already been called");
}
function x0(e, t) {
  Ne(e, void 0, "digestInto() output");
  const n = t.outputLen;
  if (e.length < n)
    throw new Error('"digestInto() output" expected to be of length >=' + n);
}
function Ql(e) {
  return new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4));
}
function Fr(...e) {
  for (let t = 0; t < e.length; t++) e[t].fill(0);
}
function Ol(e) {
  return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
const C0 = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
function k0(e) {
  return (
    ((e << 24) & 4278190080) |
    ((e << 8) & 16711680) |
    ((e >>> 8) & 65280) |
    ((e >>> 24) & 255)
  );
}
const Jn = C0 ? (e) => e : (e) => k0(e);
function JO(e) {
  for (let t = 0; t < e.length; t++) e[t] = k0(e[t]);
  return e;
}
const si = C0 ? (e) => e : JO,
  O0 =
    typeof Uint8Array.from([]).toHex == "function" &&
    typeof Uint8Array.fromHex == "function",
  eT = Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function pu(e) {
  if ((Ne(e), O0)) return e.toHex();
  let t = "";
  for (let n = 0; n < e.length; n++) t += eT[e[n]];
  return t;
}
const Yn = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function Sy(e) {
  if (e >= Yn._0 && e <= Yn._9) return e - Yn._0;
  if (e >= Yn.A && e <= Yn.F) return e - (Yn.A - 10);
  if (e >= Yn.a && e <= Yn.f) return e - (Yn.a - 10);
}
function T0(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  if (O0) return Uint8Array.fromHex(e);
  const t = e.length,
    n = t / 2;
  if (t % 2)
    throw new Error("hex string expected, got unpadded hex of length " + t);
  const i = new Uint8Array(n);
  for (let o = 0, l = 0; o < n; o++, l += 2) {
    const u = Sy(e.charCodeAt(l)),
      d = Sy(e.charCodeAt(l + 1));
    if (u === void 0 || d === void 0) {
      const f = e[l] + e[l + 1];
      throw new Error(
        'hex string expected, got non-hex character "' + f + '" at index ' + l,
      );
    }
    i[o] = u * 16 + d;
  }
  return i;
}
function tT(e) {
  if (typeof e != "string") throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(e));
}
function Ey(e, t = "") {
  return typeof e == "string" ? tT(e) : Ne(e, void 0, t);
}
function xy(...e) {
  let t = 0;
  for (let i = 0; i < e.length; i++) {
    const o = e[i];
    (Ne(o), (t += o.length));
  }
  const n = new Uint8Array(t);
  for (let i = 0, o = 0; i < e.length; i++) {
    const l = e[i];
    (n.set(l, o), (o += l.length));
  }
  return n;
}
function nT(e, t) {
  if (t !== void 0 && {}.toString.call(t) !== "[object Object]")
    throw new Error("options must be object or undefined");
  return Object.assign(e, t);
}
function I0(e, t = {}) {
  const n = (o, l) => e(l).update(o).digest(),
    i = e(void 0);
  return (
    (n.outputLen = i.outputLen),
    (n.blockLen = i.blockLen),
    (n.create = (o) => e(o)),
    Object.assign(n, t),
    Object.freeze(n)
  );
}
function rT(e = 32) {
  const t = typeof globalThis == "object" ? globalThis.crypto : null;
  if (typeof t?.getRandomValues != "function")
    throw new Error("crypto.getRandomValues must be defined");
  return t.getRandomValues(new Uint8Array(e));
}
const sT = (e) => ({
    oid: Uint8Array.from([6, 9, 96, 134, 72, 1, 101, 3, 4, 2, e]),
  }),
  iT = Uint8Array.from([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 10, 4, 8, 9, 15,
    13, 6, 1, 12, 0, 2, 11, 7, 5, 3, 11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6,
    7, 1, 9, 4, 7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8, 9, 0, 5,
    7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13, 2, 12, 6, 10, 0, 11, 8, 3, 4,
    13, 7, 5, 15, 14, 1, 9, 12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8,
    11, 13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10, 6, 15, 14, 9, 11,
    3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5, 10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14,
    3, 12, 13, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 10,
    4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3, 11, 8, 12, 0, 5, 2, 15, 13,
    10, 14, 3, 6, 7, 1, 9, 4, 7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15,
    8, 9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13, 2, 12, 6, 10, 0,
    11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9,
  ]);
class oT {
  blockLen;
  outputLen;
  padOffset;
  isLE;
  buffer;
  view;
  finished = !1;
  length = 0;
  pos = 0;
  destroyed = !1;
  constructor(t, n, i, o) {
    ((this.blockLen = t),
      (this.outputLen = n),
      (this.padOffset = i),
      (this.isLE = o),
      (this.buffer = new Uint8Array(t)),
      (this.view = Ol(this.buffer)));
  }
  update(t) {
    (xi(this), Ne(t));
    const { view: n, buffer: i, blockLen: o } = this,
      l = t.length;
    for (let u = 0; u < l; ) {
      const d = Math.min(o - this.pos, l - u);
      if (d === o) {
        const f = Ol(t);
        for (; o <= l - u; u += o) this.process(f, u);
        continue;
      }
      (i.set(t.subarray(u, u + d), this.pos),
        (this.pos += d),
        (u += d),
        this.pos === o && (this.process(n, 0), (this.pos = 0)));
    }
    return ((this.length += t.length), this.roundClean(), this);
  }
  digestInto(t) {
    (xi(this), x0(t, this), (this.finished = !0));
    const { buffer: n, view: i, blockLen: o, isLE: l } = this;
    let { pos: u } = this;
    ((n[u++] = 128),
      Fr(this.buffer.subarray(u)),
      this.padOffset > o - u && (this.process(i, 0), (u = 0)));
    for (let y = u; y < o; y++) n[y] = 0;
    (i.setBigUint64(o - 8, BigInt(this.length * 8), l), this.process(i, 0));
    const d = Ol(t),
      f = this.outputLen;
    if (f % 4) throw new Error("_sha2: outputLen must be aligned to 32bit");
    const m = f / 4,
      g = this.get();
    if (m > g.length) throw new Error("_sha2: outputLen bigger than state");
    for (let y = 0; y < m; y++) d.setUint32(4 * y, g[y], l);
  }
  digest() {
    const { buffer: t, outputLen: n } = this;
    this.digestInto(t);
    const i = t.slice(0, n);
    return (this.destroy(), i);
  }
  _cloneInto(t) {
    ((t ||= new this.constructor()), t.set(...this.get()));
    const {
      blockLen: n,
      buffer: i,
      length: o,
      finished: l,
      destroyed: u,
      pos: d,
    } = this;
    return (
      (t.destroyed = u),
      (t.finished = l),
      (t.length = o),
      (t.pos = d),
      o % n && t.buffer.set(i),
      t
    );
  }
  clone() {
    return this._cloneInto();
  }
}
const bt = Uint32Array.from([
    1779033703, 4089235720, 3144134277, 2227873595, 1013904242, 4271175723,
    2773480762, 1595750129, 1359893119, 2917565137, 2600822924, 725511199,
    528734635, 4215389547, 1541459225, 327033209,
  ]),
  bl = BigInt(2 ** 32 - 1),
  Cy = BigInt(32);
function M0(e, t = !1) {
  return t
    ? { h: Number(e & bl), l: Number((e >> Cy) & bl) }
    : { h: Number((e >> Cy) & bl) | 0, l: Number(e & bl) | 0 };
}
function aT(e, t = !1) {
  const n = e.length;
  let i = new Uint32Array(n),
    o = new Uint32Array(n);
  for (let l = 0; l < n; l++) {
    const { h: u, l: d } = M0(e[l], t);
    [i[l], o[l]] = [u, d];
  }
  return [i, o];
}
const ky = (e, t, n) => e >>> n,
  Oy = (e, t, n) => (e << (32 - n)) | (t >>> n),
  Nr = (e, t, n) => (e >>> n) | (t << (32 - n)),
  Pr = (e, t, n) => (e << (32 - n)) | (t >>> n),
  Co = (e, t, n) => (e << (64 - n)) | (t >>> (n - 32)),
  ko = (e, t, n) => (e >>> (n - 32)) | (t << (64 - n)),
  lT = (e, t) => t,
  uT = (e, t) => e;
function vn(e, t, n, i) {
  const o = (t >>> 0) + (i >>> 0);
  return { h: (e + n + ((o / 2 ** 32) | 0)) | 0, l: o | 0 };
}
const lh = (e, t, n) => (e >>> 0) + (t >>> 0) + (n >>> 0),
  uh = (e, t, n, i) => (t + n + i + ((e / 2 ** 32) | 0)) | 0,
  cT = (e, t, n, i) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (i >>> 0),
  dT = (e, t, n, i, o) => (t + n + i + o + ((e / 2 ** 32) | 0)) | 0,
  fT = (e, t, n, i, o) =>
    (e >>> 0) + (t >>> 0) + (n >>> 0) + (i >>> 0) + (o >>> 0),
  hT = (e, t, n, i, o, l) => (t + n + i + o + l + ((e / 2 ** 32) | 0)) | 0,
  Je = Uint32Array.from([
    4089235720, 1779033703, 2227873595, 3144134277, 4271175723, 1013904242,
    1595750129, 2773480762, 2917565137, 1359893119, 725511199, 2600822924,
    4215389547, 528734635, 327033209, 1541459225,
  ]),
  te = new Uint32Array(32);
function Tr(e, t, n, i, o, l) {
  const u = o[l],
    d = o[l + 1];
  let f = te[2 * e],
    m = te[2 * e + 1],
    g = te[2 * t],
    y = te[2 * t + 1],
    v = te[2 * n],
    C = te[2 * n + 1],
    E = te[2 * i],
    S = te[2 * i + 1],
    k = lh(f, g, u);
  ((m = uh(k, m, y, d)),
    (f = k | 0),
    ({ Dh: S, Dl: E } = { Dh: S ^ m, Dl: E ^ f }),
    ({ Dh: S, Dl: E } = { Dh: lT(S, E), Dl: uT(S) }),
    ({ h: C, l: v } = vn(C, v, S, E)),
    ({ Bh: y, Bl: g } = { Bh: y ^ C, Bl: g ^ v }),
    ({ Bh: y, Bl: g } = { Bh: Nr(y, g, 24), Bl: Pr(y, g, 24) }),
    (te[2 * e] = f),
    (te[2 * e + 1] = m),
    (te[2 * t] = g),
    (te[2 * t + 1] = y),
    (te[2 * n] = v),
    (te[2 * n + 1] = C),
    (te[2 * i] = E),
    (te[2 * i + 1] = S));
}
function Ir(e, t, n, i, o, l) {
  const u = o[l],
    d = o[l + 1];
  let f = te[2 * e],
    m = te[2 * e + 1],
    g = te[2 * t],
    y = te[2 * t + 1],
    v = te[2 * n],
    C = te[2 * n + 1],
    E = te[2 * i],
    S = te[2 * i + 1],
    k = lh(f, g, u);
  ((m = uh(k, m, y, d)),
    (f = k | 0),
    ({ Dh: S, Dl: E } = { Dh: S ^ m, Dl: E ^ f }),
    ({ Dh: S, Dl: E } = { Dh: Nr(S, E, 16), Dl: Pr(S, E, 16) }),
    ({ h: C, l: v } = vn(C, v, S, E)),
    ({ Bh: y, Bl: g } = { Bh: y ^ C, Bl: g ^ v }),
    ({ Bh: y, Bl: g } = { Bh: Co(y, g, 63), Bl: ko(y, g, 63) }),
    (te[2 * e] = f),
    (te[2 * e + 1] = m),
    (te[2 * t] = g),
    (te[2 * t + 1] = y),
    (te[2 * n] = v),
    (te[2 * n + 1] = C),
    (te[2 * i] = E),
    (te[2 * i + 1] = S));
}
function pT(e, t = {}, n, i, o) {
  if ((bn(n), e < 0 || e > n)) throw new Error("outputLen bigger than keyLen");
  const { key: l, salt: u, personalization: d } = t;
  if (l !== void 0 && (l.length < 1 || l.length > n))
    throw new Error('"key" expected to be undefined or of length=1..' + n);
  (u !== void 0 && Ne(u, i, "salt"),
    d !== void 0 && Ne(d, o, "personalization"));
}
class mT {
  buffer;
  buffer32;
  finished = !1;
  destroyed = !1;
  length = 0;
  pos = 0;
  blockLen;
  outputLen;
  constructor(t, n) {
    (bn(t),
      bn(n),
      (this.blockLen = t),
      (this.outputLen = n),
      (this.buffer = new Uint8Array(t)),
      (this.buffer32 = Ql(this.buffer)));
  }
  update(t) {
    (xi(this), Ne(t));
    const { blockLen: n, buffer: i, buffer32: o } = this,
      l = t.length,
      u = t.byteOffset,
      d = t.buffer;
    for (let f = 0; f < l; ) {
      this.pos === n && (si(o), this.compress(o, 0, !1), si(o), (this.pos = 0));
      const m = Math.min(n - this.pos, l - f),
        g = u + f;
      if (m === n && !(g % 4) && f + m < l) {
        const y = new Uint32Array(d, g, Math.floor((l - f) / 4));
        si(y);
        for (let v = 0; f + n < l; v += o.length, f += n)
          ((this.length += n), this.compress(y, v, !1));
        si(y);
        continue;
      }
      (i.set(t.subarray(f, f + m), this.pos),
        (this.pos += m),
        (this.length += m),
        (f += m));
    }
    return this;
  }
  digestInto(t) {
    (xi(this), x0(t, this));
    const { pos: n, buffer32: i } = this;
    ((this.finished = !0),
      Fr(this.buffer.subarray(n)),
      si(i),
      this.compress(i, 0, !0),
      si(i));
    const o = Ql(t);
    this.get().forEach((l, u) => (o[u] = Jn(l)));
  }
  digest() {
    const { buffer: t, outputLen: n } = this;
    this.digestInto(t);
    const i = t.slice(0, n);
    return (this.destroy(), i);
  }
  _cloneInto(t) {
    const {
      buffer: n,
      length: i,
      finished: o,
      destroyed: l,
      outputLen: u,
      pos: d,
    } = this;
    return (
      (t ||= new this.constructor({ dkLen: u })),
      t.set(...this.get()),
      t.buffer.set(n),
      (t.destroyed = l),
      (t.finished = o),
      (t.length = i),
      (t.pos = d),
      (t.outputLen = u),
      t
    );
  }
  clone() {
    return this._cloneInto();
  }
}
class gT extends mT {
  v0l = Je[0] | 0;
  v0h = Je[1] | 0;
  v1l = Je[2] | 0;
  v1h = Je[3] | 0;
  v2l = Je[4] | 0;
  v2h = Je[5] | 0;
  v3l = Je[6] | 0;
  v3h = Je[7] | 0;
  v4l = Je[8] | 0;
  v4h = Je[9] | 0;
  v5l = Je[10] | 0;
  v5h = Je[11] | 0;
  v6l = Je[12] | 0;
  v6h = Je[13] | 0;
  v7l = Je[14] | 0;
  v7h = Je[15] | 0;
  constructor(t = {}) {
    const n = t.dkLen === void 0 ? 64 : t.dkLen;
    (super(128, n), pT(n, t, 64, 16, 16));
    let { key: i, personalization: o, salt: l } = t,
      u = 0;
    if (
      (i !== void 0 && (Ne(i, void 0, "key"), (u = i.length)),
      (this.v0l ^= this.outputLen | (u << 8) | 65536 | (1 << 24)),
      l !== void 0)
    ) {
      Ne(l, void 0, "salt");
      const d = Ql(l);
      ((this.v4l ^= Jn(d[0])),
        (this.v4h ^= Jn(d[1])),
        (this.v5l ^= Jn(d[2])),
        (this.v5h ^= Jn(d[3])));
    }
    if (o !== void 0) {
      Ne(o, void 0, "personalization");
      const d = Ql(o);
      ((this.v6l ^= Jn(d[0])),
        (this.v6h ^= Jn(d[1])),
        (this.v7l ^= Jn(d[2])),
        (this.v7h ^= Jn(d[3])));
    }
    if (i !== void 0) {
      const d = new Uint8Array(this.blockLen);
      (d.set(i), this.update(d));
    }
  }
  get() {
    let {
      v0l: t,
      v0h: n,
      v1l: i,
      v1h: o,
      v2l: l,
      v2h: u,
      v3l: d,
      v3h: f,
      v4l: m,
      v4h: g,
      v5l: y,
      v5h: v,
      v6l: C,
      v6h: E,
      v7l: S,
      v7h: k,
    } = this;
    return [t, n, i, o, l, u, d, f, m, g, y, v, C, E, S, k];
  }
  set(t, n, i, o, l, u, d, f, m, g, y, v, C, E, S, k) {
    ((this.v0l = t | 0),
      (this.v0h = n | 0),
      (this.v1l = i | 0),
      (this.v1h = o | 0),
      (this.v2l = l | 0),
      (this.v2h = u | 0),
      (this.v3l = d | 0),
      (this.v3h = f | 0),
      (this.v4l = m | 0),
      (this.v4h = g | 0),
      (this.v5l = y | 0),
      (this.v5h = v | 0),
      (this.v6l = C | 0),
      (this.v6h = E | 0),
      (this.v7l = S | 0),
      (this.v7h = k | 0));
  }
  compress(t, n, i) {
    (this.get().forEach((f, m) => (te[m] = f)), te.set(Je, 16));
    let { h: o, l } = M0(BigInt(this.length));
    ((te[24] = Je[8] ^ l),
      (te[25] = Je[9] ^ o),
      i && ((te[28] = ~te[28]), (te[29] = ~te[29])));
    let u = 0;
    const d = iT;
    for (let f = 0; f < 12; f++)
      (Tr(0, 4, 8, 12, t, n + 2 * d[u++]),
        Ir(0, 4, 8, 12, t, n + 2 * d[u++]),
        Tr(1, 5, 9, 13, t, n + 2 * d[u++]),
        Ir(1, 5, 9, 13, t, n + 2 * d[u++]),
        Tr(2, 6, 10, 14, t, n + 2 * d[u++]),
        Ir(2, 6, 10, 14, t, n + 2 * d[u++]),
        Tr(3, 7, 11, 15, t, n + 2 * d[u++]),
        Ir(3, 7, 11, 15, t, n + 2 * d[u++]),
        Tr(0, 5, 10, 15, t, n + 2 * d[u++]),
        Ir(0, 5, 10, 15, t, n + 2 * d[u++]),
        Tr(1, 6, 11, 12, t, n + 2 * d[u++]),
        Ir(1, 6, 11, 12, t, n + 2 * d[u++]),
        Tr(2, 7, 8, 13, t, n + 2 * d[u++]),
        Ir(2, 7, 8, 13, t, n + 2 * d[u++]),
        Tr(3, 4, 9, 14, t, n + 2 * d[u++]),
        Ir(3, 4, 9, 14, t, n + 2 * d[u++]));
    ((this.v0l ^= te[0] ^ te[16]),
      (this.v0h ^= te[1] ^ te[17]),
      (this.v1l ^= te[2] ^ te[18]),
      (this.v1h ^= te[3] ^ te[19]),
      (this.v2l ^= te[4] ^ te[20]),
      (this.v2h ^= te[5] ^ te[21]),
      (this.v3l ^= te[6] ^ te[22]),
      (this.v3h ^= te[7] ^ te[23]),
      (this.v4l ^= te[8] ^ te[24]),
      (this.v4h ^= te[9] ^ te[25]),
      (this.v5l ^= te[10] ^ te[26]),
      (this.v5h ^= te[11] ^ te[27]),
      (this.v6l ^= te[12] ^ te[28]),
      (this.v6h ^= te[13] ^ te[29]),
      (this.v7l ^= te[14] ^ te[30]),
      (this.v7h ^= te[15] ^ te[31]),
      Fr(te));
  }
  destroy() {
    ((this.destroyed = !0),
      Fr(this.buffer32),
      this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
  }
}
const Do = I0((e) => new gT(e));
function A0(e, t, n) {
  const i = pe.Address.serialize(e).toBytes(),
    o = pe.TypeTag.serialize(t).toBytes(),
    l = pe.u64().serialize(n.length).toBytes(),
    u = Do.create({ dkLen: 32 });
  return (
    u.update(new Uint8Array([240])),
    u.update(i),
    u.update(l),
    u.update(n),
    u.update(o),
    `0x${$r(u.digest().slice(0, 32))}`
  );
}
BigInt(1e9);
const j0 = "0x0000000000000000000000000000000000000000000000000000000000000001",
  vi = "0x0000000000000000000000000000000000000000000000000000000000000002",
  yT = "0x0000000000000000000000000000000000000000000000000000000000000003",
  R0 = "0x0000000000000000000000000000000000000000000000000000000000000006",
  vT = `${vi}::sui::SUI`,
  Ty = "0x0000000000000000000000000000000000000000000000000000000000000005",
  wT = "0x0000000000000000000000000000000000000000000000000000000000000008",
  bT = "0x0000000000000000000000000000000000000000000000000000000000000403",
  ST = "…";
function _0(e) {
  if (e.length <= 6) return e;
  const t = e.startsWith("0x") ? 2 : 0;
  return `0x${e.slice(t, t + 4)}${ST}${e.slice(-4)}`;
}
let qd;
function ch(e) {
  return {
    lang: e?.lang ?? qd?.lang,
    message: e?.message,
    abortEarly: e?.abortEarly ?? qd?.abortEarly,
    abortPipeEarly: e?.abortPipeEarly ?? qd?.abortPipeEarly,
  };
}
let ET;
function xT(e) {
  return ET?.get(e);
}
let CT;
function kT(e) {
  return CT?.get(e);
}
let OT;
function TT(e, t) {
  return OT?.get(e)?.get(t);
}
function N0(e) {
  const t = typeof e;
  return t === "string"
    ? `"${e}"`
    : t === "number" || t === "bigint" || t === "boolean"
      ? `${e}`
      : t === "object" || t === "function"
        ? ((e && Object.getPrototypeOf(e)?.constructor?.name) ?? "null")
        : t;
}
function pt(e, t, n, i, o) {
  const l = o && "input" in o ? o.input : n.value,
    u = o?.expected ?? e.expects ?? null,
    d = o?.received ?? N0(l),
    f = {
      kind: e.kind,
      type: e.type,
      input: l,
      expected: u,
      received: d,
      message: `Invalid ${t}: ${u ? `Expected ${u} but r` : "R"}eceived ${d}`,
      requirement: e.requirement,
      path: o?.path,
      issues: o?.issues,
      lang: i.lang,
      abortEarly: i.abortEarly,
      abortPipeEarly: i.abortPipeEarly,
    },
    m = e.kind === "schema",
    g =
      o?.message ??
      e.message ??
      TT(e.reference, f.lang) ??
      (m ? kT(f.lang) : null) ??
      i.message ??
      xT(f.lang);
  (g !== void 0 && (f.message = typeof g == "function" ? g(f) : g),
    m && (n.typed = !1),
    n.issues ? n.issues.push(f) : (n.issues = [f]));
}
function mt(e) {
  return {
    version: 1,
    vendor: "valibot",
    validate(t) {
      return e["~run"]({ value: t }, ch());
    },
  };
}
function IT(e, t) {
  return (
    Object.hasOwn(e, t) &&
    t !== "__proto__" &&
    t !== "prototype" &&
    t !== "constructor"
  );
}
function P0(e, t) {
  const n = [...new Set(e)];
  return n.length > 1 ? `(${n.join(` ${t} `)})` : (n[0] ?? "never");
}
var MT = class extends Error {
  constructor(e) {
    (super(e[0].message), (this.name = "ValiError"), (this.issues = e));
  }
};
const AT = /^[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}$/iu;
function mu(e, t) {
  return {
    kind: "validation",
    type: "check",
    reference: mu,
    async: !1,
    expects: null,
    requirement: e,
    message: t,
    "~run"(n, i) {
      return (
        n.typed && !this.requirement(n.value) && pt(this, "input", n, i),
        n
      );
    },
  };
}
function zt(e) {
  return {
    kind: "validation",
    type: "integer",
    reference: zt,
    async: !1,
    expects: null,
    requirement: Number.isInteger,
    message: e,
    "~run"(t, n) {
      return (
        t.typed && !this.requirement(t.value) && pt(this, "integer", t, n),
        t
      );
    },
  };
}
function dh(e) {
  return {
    kind: "transformation",
    type: "transform",
    reference: dh,
    async: !1,
    operation: e,
    "~run"(t) {
      return ((t.value = this.operation(t.value)), t);
    },
  };
}
function D0(e) {
  return {
    kind: "validation",
    type: "uuid",
    reference: D0,
    async: !1,
    expects: null,
    requirement: AT,
    message: e,
    "~run"(t, n) {
      return (
        t.typed && !this.requirement.test(t.value) && pt(this, "UUID", t, n),
        t
      );
    },
  };
}
function jT(e, t, n) {
  return typeof e.fallback == "function" ? e.fallback(t, n) : e.fallback;
}
function gu(e, t, n) {
  return typeof e.default == "function" ? e.default(t, n) : e.default;
}
function vf(e, t) {
  return !e["~run"]({ value: t }, { abortEarly: !0 }).issues;
}
function Ie(e, t) {
  return {
    kind: "schema",
    type: "array",
    reference: Ie,
    expects: "Array",
    async: !1,
    item: e,
    message: t,
    get "~standard"() {
      return mt(this);
    },
    "~run"(n, i) {
      const o = n.value;
      if (Array.isArray(o)) {
        ((n.typed = !0), (n.value = []));
        for (let l = 0; l < o.length; l++) {
          const u = o[l],
            d = this.item["~run"]({ value: u }, i);
          if (d.issues) {
            const f = {
              type: "array",
              origin: "value",
              input: o,
              key: l,
              value: u,
            };
            for (const m of d.issues)
              (m.path ? m.path.unshift(f) : (m.path = [f]), n.issues?.push(m));
            if ((n.issues || (n.issues = d.issues), i.abortEarly)) {
              n.typed = !1;
              break;
            }
          }
          (d.typed || (n.typed = !1), n.value.push(d.value));
        }
      } else pt(this, "type", n, i);
      return n;
    },
  };
}
function fh(e) {
  return {
    kind: "schema",
    type: "bigint",
    reference: fh,
    expects: "bigint",
    async: !1,
    message: e,
    get "~standard"() {
      return mt(this);
    },
    "~run"(t, n) {
      return (
        typeof t.value == "bigint" ? (t.typed = !0) : pt(this, "type", t, n),
        t
      );
    },
  };
}
function bs(e) {
  return {
    kind: "schema",
    type: "boolean",
    reference: bs,
    expects: "boolean",
    async: !1,
    message: e,
    get "~standard"() {
      return mt(this);
    },
    "~run"(t, n) {
      return (
        typeof t.value == "boolean" ? (t.typed = !0) : pt(this, "type", t, n),
        t
      );
    },
  };
}
function wf(e) {
  return {
    kind: "schema",
    type: "lazy",
    reference: wf,
    expects: "unknown",
    async: !1,
    getter: e,
    get "~standard"() {
      return mt(this);
    },
    "~run"(t, n) {
      return this.getter(t.value)["~run"](t, n);
    },
  };
}
function ke(e, t) {
  return {
    kind: "schema",
    type: "literal",
    reference: ke,
    expects: N0(e),
    async: !1,
    literal: e,
    message: t,
    get "~standard"() {
      return mt(this);
    },
    "~run"(n, i) {
      return (
        n.value === this.literal ? (n.typed = !0) : pt(this, "type", n, i),
        n
      );
    },
  };
}
function De(e, t) {
  return {
    kind: "schema",
    type: "nullable",
    reference: De,
    expects: `(${e.expects} | null)`,
    async: !1,
    wrapped: e,
    default: t,
    get "~standard"() {
      return mt(this);
    },
    "~run"(n, i) {
      return n.value === null &&
        (this.default !== void 0 && (n.value = gu(this, n, i)),
        n.value === null)
        ? ((n.typed = !0), n)
        : this.wrapped["~run"](n, i);
    },
  };
}
function Lo(e, t) {
  return {
    kind: "schema",
    type: "nullish",
    reference: Lo,
    expects: `(${e.expects} | null | undefined)`,
    async: !1,
    wrapped: e,
    default: t,
    get "~standard"() {
      return mt(this);
    },
    "~run"(n, i) {
      return (n.value === null || n.value === void 0) &&
        (this.default !== void 0 && (n.value = gu(this, n, i)),
        n.value === null || n.value === void 0)
        ? ((n.typed = !0), n)
        : this.wrapped["~run"](n, i);
    },
  };
}
function Et(e) {
  return {
    kind: "schema",
    type: "number",
    reference: Et,
    expects: "number",
    async: !1,
    message: e,
    get "~standard"() {
      return mt(this);
    },
    "~run"(t, n) {
      return (
        typeof t.value == "number" && !isNaN(t.value)
          ? (t.typed = !0)
          : pt(this, "type", t, n),
        t
      );
    },
  };
}
function re(e, t) {
  return {
    kind: "schema",
    type: "object",
    reference: re,
    expects: "Object",
    async: !1,
    entries: e,
    message: t,
    get "~standard"() {
      return mt(this);
    },
    "~run"(n, i) {
      const o = n.value;
      if (o && typeof o == "object") {
        ((n.typed = !0), (n.value = {}));
        for (const l in this.entries) {
          const u = this.entries[l];
          if (
            l in o ||
            ((u.type === "exact_optional" ||
              u.type === "optional" ||
              u.type === "nullish") &&
              u.default !== void 0)
          ) {
            const d = l in o ? o[l] : gu(u),
              f = u["~run"]({ value: d }, i);
            if (f.issues) {
              const m = {
                type: "object",
                origin: "value",
                input: o,
                key: l,
                value: d,
              };
              for (const g of f.issues)
                (g.path ? g.path.unshift(m) : (g.path = [m]),
                  n.issues?.push(g));
              if ((n.issues || (n.issues = f.issues), i.abortEarly)) {
                n.typed = !1;
                break;
              }
            }
            (f.typed || (n.typed = !1), (n.value[l] = f.value));
          } else if (u.fallback !== void 0) n.value[l] = jT(u);
          else if (
            u.type !== "exact_optional" &&
            u.type !== "optional" &&
            u.type !== "nullish" &&
            (pt(this, "key", n, i, {
              input: void 0,
              expected: `"${l}"`,
              path: [
                {
                  type: "object",
                  origin: "key",
                  input: o,
                  key: l,
                  value: o[l],
                },
              ],
            }),
            i.abortEarly)
          )
            break;
        }
      } else pt(this, "type", n, i);
      return n;
    },
  };
}
function Ft(e, t) {
  return {
    kind: "schema",
    type: "optional",
    reference: Ft,
    expects: `(${e.expects} | undefined)`,
    async: !1,
    wrapped: e,
    default: t,
    get "~standard"() {
      return mt(this);
    },
    "~run"(n, i) {
      return n.value === void 0 &&
        (this.default !== void 0 && (n.value = gu(this, n, i)),
        n.value === void 0)
        ? ((n.typed = !0), n)
        : this.wrapped["~run"](n, i);
    },
  };
}
function Bo(e, t, n) {
  return {
    kind: "schema",
    type: "record",
    reference: Bo,
    expects: "Object",
    async: !1,
    key: e,
    value: t,
    message: n,
    get "~standard"() {
      return mt(this);
    },
    "~run"(i, o) {
      const l = i.value;
      if (l && typeof l == "object") {
        ((i.typed = !0), (i.value = {}));
        for (const u in l)
          if (IT(l, u)) {
            const d = l[u],
              f = this.key["~run"]({ value: u }, o);
            if (f.issues) {
              const g = {
                type: "object",
                origin: "key",
                input: l,
                key: u,
                value: d,
              };
              for (const y of f.issues) ((y.path = [g]), i.issues?.push(y));
              if ((i.issues || (i.issues = f.issues), o.abortEarly)) {
                i.typed = !1;
                break;
              }
            }
            const m = this.value["~run"]({ value: d }, o);
            if (m.issues) {
              const g = {
                type: "object",
                origin: "value",
                input: l,
                key: u,
                value: d,
              };
              for (const y of m.issues)
                (y.path ? y.path.unshift(g) : (y.path = [g]),
                  i.issues?.push(y));
              if ((i.issues || (i.issues = m.issues), o.abortEarly)) {
                i.typed = !1;
                break;
              }
            }
            ((!f.typed || !m.typed) && (i.typed = !1),
              f.typed && (i.value[f.value] = m.value));
          }
      } else pt(this, "type", i, o);
      return i;
    },
  };
}
function ge(e) {
  return {
    kind: "schema",
    type: "string",
    reference: ge,
    expects: "string",
    async: !1,
    message: e,
    get "~standard"() {
      return mt(this);
    },
    "~run"(t, n) {
      return (
        typeof t.value == "string" ? (t.typed = !0) : pt(this, "type", t, n),
        t
      );
    },
  };
}
function hh(e, t) {
  return {
    kind: "schema",
    type: "tuple",
    reference: hh,
    expects: "Array",
    async: !1,
    items: e,
    message: t,
    get "~standard"() {
      return mt(this);
    },
    "~run"(n, i) {
      const o = n.value;
      if (Array.isArray(o)) {
        ((n.typed = !0), (n.value = []));
        for (let l = 0; l < this.items.length; l++) {
          const u = o[l],
            d = this.items[l]["~run"]({ value: u }, i);
          if (d.issues) {
            const f = {
              type: "array",
              origin: "value",
              input: o,
              key: l,
              value: u,
            };
            for (const m of d.issues)
              (m.path ? m.path.unshift(f) : (m.path = [f]), n.issues?.push(m));
            if ((n.issues || (n.issues = d.issues), i.abortEarly)) {
              n.typed = !1;
              break;
            }
          }
          (d.typed || (n.typed = !1), n.value.push(d.value));
        }
      } else pt(this, "type", n, i);
      return n;
    },
  };
}
function Iy(e) {
  let t;
  if (e) for (const n of e) t ? t.push(...n.issues) : (t = n.issues);
  return t;
}
function Sn(e, t) {
  return {
    kind: "schema",
    type: "union",
    reference: Sn,
    expects: P0(
      e.map((n) => n.expects),
      "|",
    ),
    async: !1,
    options: e,
    message: t,
    get "~standard"() {
      return mt(this);
    },
    "~run"(n, i) {
      let o, l, u;
      for (const d of this.options) {
        const f = d["~run"]({ value: n.value }, i);
        if (f.typed)
          if (f.issues) l ? l.push(f) : (l = [f]);
          else {
            o = f;
            break;
          }
        else u ? u.push(f) : (u = [f]);
      }
      if (o) return o;
      if (l) {
        if (l.length === 1) return l[0];
        (pt(this, "type", n, i, { issues: Iy(l) }), (n.typed = !0));
      } else {
        if (u?.length === 1) return u[0];
        pt(this, "type", n, i, { issues: Iy(u) });
      }
      return n;
    },
  };
}
function Qo() {
  return {
    kind: "schema",
    type: "unknown",
    reference: Qo,
    expects: "unknown",
    async: !1,
    get "~standard"() {
      return mt(this);
    },
    "~run"(e) {
      return ((e.typed = !0), e);
    },
  };
}
function ph(e, t, n) {
  return {
    kind: "schema",
    type: "variant",
    reference: ph,
    expects: "Object",
    async: !1,
    key: e,
    options: t,
    message: n,
    get "~standard"() {
      return mt(this);
    },
    "~run"(i, o) {
      const l = i.value;
      if (l && typeof l == "object") {
        let u,
          d = 0,
          f = this.key,
          m = [];
        const g = (y, v) => {
          for (const C of y.options) {
            if (C.type === "variant") g(C, new Set(v).add(C.key));
            else {
              let E = !0,
                S = 0;
              for (const k of v) {
                const x = C.entries[k];
                if (
                  k in l
                    ? x["~run"]({ typed: !1, value: l[k] }, { abortEarly: !0 })
                        .issues
                    : x.type !== "exact_optional" &&
                      x.type !== "optional" &&
                      x.type !== "nullish"
                ) {
                  ((E = !1),
                    f !== k &&
                      (d < S || (d === S && k in l && !(f in l))) &&
                      ((d = S), (f = k), (m = [])),
                    f === k && m.push(C.entries[k].expects));
                  break;
                }
                S++;
              }
              if (E) {
                const k = C["~run"]({ value: l }, o);
                (!u || (!u.typed && k.typed)) && (u = k);
              }
            }
            if (u && !u.issues) break;
          }
        };
        if ((g(this, new Set([this.key])), u)) return u;
        pt(this, "type", i, o, {
          input: l[f],
          expected: P0(m, "|"),
          path: [
            { type: "object", origin: "value", input: l, key: f, value: l[f] },
          ],
        });
      } else pt(this, "type", i, o);
      return i;
    },
  };
}
function Pe(e, t, n) {
  const i = e["~run"]({ value: t }, ch(n));
  if (i.issues) throw new MT(i.issues);
  return i.value;
}
function ht(...e) {
  return {
    ...e[0],
    pipe: e,
    get "~standard"() {
      return mt(this);
    },
    "~run"(t, n) {
      for (const i of e)
        if (i.kind !== "metadata") {
          if (
            t.issues &&
            (i.kind === "schema" || i.kind === "transformation")
          ) {
            t.typed = !1;
            break;
          }
          (!t.issues || (!n.abortEarly && !n.abortPipeEarly)) &&
            (t = i["~run"](t, n));
        }
      return t;
    },
  };
}
function RT(e, t, n) {
  const i = e["~run"]({ value: t }, ch(n));
  return {
    typed: i.typed,
    success: !i.issues,
    output: i.value,
    issues: i.issues,
  };
}
function $n(e) {
  return Sn(Object.keys(e).map((t) => Oo(t, re({ [t]: e[t] }))));
}
function Oo(e, t) {
  return ht(
    re({ ...t.entries, $kind: Ft(ke(e)) }),
    dh((n) => ({ ...n, $kind: e })),
  );
}
const Ii = ht(
    ge(),
    dh((e) => Ee(e)),
    mu(ln),
  ),
  Xt = Ii,
  Ss = ge(),
  nt = ht(
    Sn([ge(), ht(Et(), zt())]),
    mu((e) => {
      try {
        return (
          BigInt(e),
          BigInt(e) >= 0 && BigInt(e) <= 18446744073709551615n
        );
      } catch {
        return !1;
      }
    }, "Invalid u64"),
  ),
  _T = ht(
    Et(),
    zt(),
    mu((e) => e >= 0 && e < 2 ** 32, "Invalid u32"),
  ),
  Ur = re({ objectId: Ii, version: nt, digest: ge() }),
  $e = Sn([
    Oo("GasCoin", re({ GasCoin: ke(!0) })),
    Oo(
      "Input",
      re({
        Input: ht(Et(), zt()),
        type: Ft(Sn([ke("pure"), ke("object"), ke("withdrawal")])),
      }),
    ),
    Oo("Result", re({ Result: ht(Et(), zt()) })),
    Oo(
      "NestedResult",
      re({ NestedResult: hh([ht(Et(), zt()), ht(Et(), zt())]) }),
    ),
  ]),
  NT = re({
    budget: De(nt),
    price: De(nt),
    owner: De(Ii),
    payment: De(Ie(Ur)),
  }),
  bf = Sn([
    re({ $kind: ke("address") }),
    re({ $kind: ke("bool") }),
    re({ $kind: ke("u8") }),
    re({ $kind: ke("u16") }),
    re({ $kind: ke("u32") }),
    re({ $kind: ke("u64") }),
    re({ $kind: ke("u128") }),
    re({ $kind: ke("u256") }),
    re({ $kind: ke("unknown") }),
    re({ $kind: ke("vector"), vector: wf(() => bf) }),
    re({
      $kind: ke("datatype"),
      datatype: re({ typeName: ge(), typeParameters: Ie(wf(() => bf)) }),
    }),
    re({ $kind: ke("typeParameter"), index: ht(Et(), zt()) }),
  ]),
  PT = re({
    reference: De(Sn([ke("mutable"), ke("immutable"), ke("unknown")])),
    body: bf,
  }),
  DT = re({
    package: Xt,
    module: ge(),
    function: ge(),
    typeArguments: Ie(ge()),
    arguments: Ie($e),
    _argumentTypes: Ft(De(Ie(PT))),
  }),
  LT = re({
    name: ge(),
    inputs: Bo(ge(), Sn([$e, Ie($e)])),
    data: Bo(ge(), Qo()),
  }),
  BT = $n({
    MoveCall: DT,
    TransferObjects: re({ objects: Ie($e), address: $e }),
    SplitCoins: re({ coin: $e, amounts: Ie($e) }),
    MergeCoins: re({ destination: $e, sources: Ie($e) }),
    Publish: re({ modules: Ie(Ss), dependencies: Ie(Xt) }),
    MakeMoveVec: re({ type: De(ge()), elements: Ie($e) }),
    Upgrade: re({
      modules: Ie(Ss),
      dependencies: Ie(Xt),
      package: Xt,
      ticket: $e,
    }),
    $Intent: LT,
  }),
  L0 = $n({
    ImmOrOwnedObject: Ur,
    SharedObject: re({ objectId: Xt, initialSharedVersion: nt, mutable: bs() }),
    Receiving: Ur,
  }),
  $T = $n({ MaxAmountU64: nt }),
  zT = $n({ Balance: ge() }),
  FT = $n({ Sender: ke(!0), Sponsor: ke(!0) }),
  B0 = re({ reservation: $T, typeArg: zT, withdrawFrom: FT }),
  UT = $n({
    Object: L0,
    Pure: re({ bytes: Ss }),
    UnresolvedPure: re({ value: Qo() }),
    UnresolvedObject: re({
      objectId: Xt,
      version: Ft(De(nt)),
      digest: Ft(De(ge())),
      initialSharedVersion: Ft(De(nt)),
      mutable: Ft(De(bs())),
    }),
    FundsWithdrawal: B0,
  }),
  My = $n({ Object: L0, Pure: re({ bytes: Ss }) }),
  $0 = re({
    minEpoch: De(nt),
    maxEpoch: De(nt),
    minTimestamp: De(nt),
    maxTimestamp: De(nt),
    chain: ge(),
    nonce: _T,
  }),
  z0 = $n({ None: ke(!0), Epoch: nt, ValidDuring: $0 }),
  Tl = re({
    version: ke(2),
    sender: Lo(Ii),
    expiration: Lo(z0),
    gasData: NT,
    inputs: Ie(UT),
    commands: Ie(BT),
  });
function Yl(e) {
  if (typeof e == "string") return Ee(e);
  if (e.Object)
    return e.Object.ImmOrOwnedObject
      ? Ee(e.Object.ImmOrOwnedObject.objectId)
      : e.Object.Receiving
        ? Ee(e.Object.Receiving.objectId)
        : Ee(e.Object.SharedObject.objectId);
  if (e.UnresolvedObject) return Ee(e.UnresolvedObject.objectId);
}
function VT(e, t, n) {
  const i = (o) => {
    switch (o.$kind) {
      case "Input": {
        const l = t.get(o.Input);
        if (l === void 0)
          throw new Error(`Input ${o.Input} not found in input mapping`);
        return { ...o, Input: l };
      }
      case "Result": {
        const l = n.get(o.Result);
        return l !== void 0 ? { ...o, Result: l } : o;
      }
      case "NestedResult": {
        const l = n.get(o.NestedResult[0]);
        return l !== void 0
          ? { ...o, NestedResult: [l, o.NestedResult[1]] }
          : o;
      }
      default:
        return o;
    }
  };
  switch (e.$kind) {
    case "MoveCall":
      e.MoveCall.arguments = e.MoveCall.arguments.map(i);
      break;
    case "TransferObjects":
      ((e.TransferObjects.objects = e.TransferObjects.objects.map(i)),
        (e.TransferObjects.address = i(e.TransferObjects.address)));
      break;
    case "SplitCoins":
      ((e.SplitCoins.coin = i(e.SplitCoins.coin)),
        (e.SplitCoins.amounts = e.SplitCoins.amounts.map(i)));
      break;
    case "MergeCoins":
      ((e.MergeCoins.destination = i(e.MergeCoins.destination)),
        (e.MergeCoins.sources = e.MergeCoins.sources.map(i)));
      break;
    case "MakeMoveVec":
      e.MakeMoveVec.elements = e.MakeMoveVec.elements.map(i);
      break;
    case "Upgrade":
      e.Upgrade.ticket = i(e.Upgrade.ticket);
      break;
    case "$Intent": {
      const o = e.$Intent.inputs;
      e.$Intent.inputs = {};
      for (const [l, u] of Object.entries(o))
        e.$Intent.inputs[l] = Array.isArray(u) ? u.map(i) : i(u);
      break;
    }
  }
}
const Ay = re({
    digest: ge(),
    objectId: ge(),
    version: Sn([ht(Et(), zt()), ge(), fh()]),
  }),
  WT = $n({
    ImmOrOwned: Ay,
    Shared: re({ objectId: Xt, initialSharedVersion: nt, mutable: bs() }),
    Receiving: Ay,
  }),
  jy = $n({ Object: WT, Pure: Ie(ht(Et(), zt())) });
function HT(e) {
  const t = e.inputs.map((n, i) => {
    if (n.Object)
      return {
        kind: "Input",
        index: i,
        value: {
          Object: n.Object.ImmOrOwnedObject
            ? { ImmOrOwned: n.Object.ImmOrOwnedObject }
            : n.Object.Receiving
              ? {
                  Receiving: {
                    digest: n.Object.Receiving.digest,
                    version: n.Object.Receiving.version,
                    objectId: n.Object.Receiving.objectId,
                  },
                }
              : {
                  Shared: {
                    mutable: n.Object.SharedObject.mutable,
                    initialSharedVersion:
                      n.Object.SharedObject.initialSharedVersion,
                    objectId: n.Object.SharedObject.objectId,
                  },
                },
        },
        type: "object",
      };
    if (n.Pure)
      return {
        kind: "Input",
        index: i,
        value: { Pure: Array.from(rt(n.Pure.bytes)) },
        type: "pure",
      };
    if (n.UnresolvedPure)
      return {
        kind: "Input",
        type: "pure",
        index: i,
        value: n.UnresolvedPure.value,
      };
    if (n.UnresolvedObject)
      return {
        kind: "Input",
        type: "object",
        index: i,
        value: n.UnresolvedObject.objectId,
      };
    throw new Error("Invalid input");
  });
  return {
    version: 1,
    sender: e.sender ?? void 0,
    expiration:
      e.expiration?.$kind === "Epoch"
        ? { Epoch: Number(e.expiration.Epoch) }
        : e.expiration
          ? { None: !0 }
          : null,
    gasConfig: {
      owner: e.gasData.owner ?? void 0,
      budget: e.gasData.budget ?? void 0,
      price: e.gasData.price ?? void 0,
      payment: e.gasData.payment ?? void 0,
    },
    inputs: t,
    transactions: e.commands.map((n) => {
      if (n.MakeMoveVec)
        return {
          kind: "MakeMoveVec",
          type:
            n.MakeMoveVec.type === null
              ? { None: !0 }
              : { Some: ws.parseFromStr(n.MakeMoveVec.type) },
          objects: n.MakeMoveVec.elements.map((i) => Xn(i, t)),
        };
      if (n.MergeCoins)
        return {
          kind: "MergeCoins",
          destination: Xn(n.MergeCoins.destination, t),
          sources: n.MergeCoins.sources.map((i) => Xn(i, t)),
        };
      if (n.MoveCall)
        return {
          kind: "MoveCall",
          target: `${n.MoveCall.package}::${n.MoveCall.module}::${n.MoveCall.function}`,
          typeArguments: n.MoveCall.typeArguments,
          arguments: n.MoveCall.arguments.map((i) => Xn(i, t)),
        };
      if (n.Publish)
        return {
          kind: "Publish",
          modules: n.Publish.modules.map((i) => Array.from(rt(i))),
          dependencies: n.Publish.dependencies,
        };
      if (n.SplitCoins)
        return {
          kind: "SplitCoins",
          coin: Xn(n.SplitCoins.coin, t),
          amounts: n.SplitCoins.amounts.map((i) => Xn(i, t)),
        };
      if (n.TransferObjects)
        return {
          kind: "TransferObjects",
          objects: n.TransferObjects.objects.map((i) => Xn(i, t)),
          address: Xn(n.TransferObjects.address, t),
        };
      if (n.Upgrade)
        return {
          kind: "Upgrade",
          modules: n.Upgrade.modules.map((i) => Array.from(rt(i))),
          dependencies: n.Upgrade.dependencies,
          packageId: n.Upgrade.package,
          ticket: Xn(n.Upgrade.ticket, t),
        };
      throw new Error(`Unknown transaction ${Object.keys(n)}`);
    }),
  };
}
function Xn(e, t) {
  if (e.$kind === "GasCoin") return { kind: "GasCoin" };
  if (e.$kind === "Result") return { kind: "Result", index: e.Result };
  if (e.$kind === "NestedResult")
    return {
      kind: "NestedResult",
      index: e.NestedResult[0],
      resultIndex: e.NestedResult[1],
    };
  if (e.$kind === "Input") return t[e.Input];
  throw new Error(`Invalid argument ${Object.keys(e)}`);
}
function KT(e) {
  return Pe(Tl, {
    version: 2,
    sender: e.sender ?? null,
    expiration: e.expiration
      ? "Epoch" in e.expiration
        ? { Epoch: e.expiration.Epoch }
        : { None: !0 }
      : null,
    gasData: {
      owner: e.gasConfig.owner ?? null,
      budget: e.gasConfig.budget?.toString() ?? null,
      price: e.gasConfig.price?.toString() ?? null,
      payment:
        e.gasConfig.payment?.map((t) => ({
          digest: t.digest,
          objectId: t.objectId,
          version: t.version.toString(),
        })) ?? null,
    },
    inputs: e.inputs.map((t) => {
      if (t.kind === "Input") {
        if (vf(jy, t.value)) {
          const n = Pe(jy, t.value);
          if (n.Object) {
            if (n.Object.ImmOrOwned)
              return {
                Object: {
                  ImmOrOwnedObject: {
                    objectId: n.Object.ImmOrOwned.objectId,
                    version: String(n.Object.ImmOrOwned.version),
                    digest: n.Object.ImmOrOwned.digest,
                  },
                },
              };
            if (n.Object.Shared)
              return {
                Object: {
                  SharedObject: {
                    mutable: n.Object.Shared.mutable ?? null,
                    initialSharedVersion: n.Object.Shared.initialSharedVersion,
                    objectId: n.Object.Shared.objectId,
                  },
                },
              };
            if (n.Object.Receiving)
              return {
                Object: {
                  Receiving: {
                    digest: n.Object.Receiving.digest,
                    version: String(n.Object.Receiving.version),
                    objectId: n.Object.Receiving.objectId,
                  },
                },
              };
            throw new Error("Invalid object input");
          }
          return { Pure: { bytes: ze(new Uint8Array(n.Pure)) } };
        }
        return t.type === "object"
          ? { UnresolvedObject: { objectId: t.value } }
          : { UnresolvedPure: { value: t.value } };
      }
      throw new Error("Invalid input");
    }),
    commands: e.transactions.map((t) => {
      switch (t.kind) {
        case "MakeMoveVec":
          return {
            MakeMoveVec: {
              type: "Some" in t.type ? ws.tagToString(t.type.Some) : null,
              elements: t.objects.map((n) => Zn(n)),
            },
          };
        case "MergeCoins":
          return {
            MergeCoins: {
              destination: Zn(t.destination),
              sources: t.sources.map((n) => Zn(n)),
            },
          };
        case "MoveCall": {
          const [n, i, o] = t.target.split("::");
          return {
            MoveCall: {
              package: n,
              module: i,
              function: o,
              typeArguments: t.typeArguments,
              arguments: t.arguments.map((l) => Zn(l)),
            },
          };
        }
        case "Publish":
          return {
            Publish: {
              modules: t.modules.map((n) => ze(Uint8Array.from(n))),
              dependencies: t.dependencies,
            },
          };
        case "SplitCoins":
          return {
            SplitCoins: {
              coin: Zn(t.coin),
              amounts: t.amounts.map((n) => Zn(n)),
            },
          };
        case "TransferObjects":
          return {
            TransferObjects: {
              objects: t.objects.map((n) => Zn(n)),
              address: Zn(t.address),
            },
          };
        case "Upgrade":
          return {
            Upgrade: {
              modules: t.modules.map((n) => ze(Uint8Array.from(n))),
              dependencies: t.dependencies,
              package: t.packageId,
              ticket: Zn(t.ticket),
            },
          };
      }
      throw new Error(`Unknown transaction ${Object.keys(t)}`);
    }),
  });
}
function Zn(e) {
  switch (e.kind) {
    case "GasCoin":
      return { GasCoin: !0 };
    case "Result":
      return { Result: e.index };
    case "NestedResult":
      return { NestedResult: [e.index, e.resultIndex] };
    case "Input":
      return { Input: e.index };
  }
}
function GT(e, t) {
  const n = Array.from(`${e}::`).map((o) => o.charCodeAt(0)),
    i = new Uint8Array(n.length + t.length);
  return (i.set(n), i.set(t, n.length), Do(i, { dkLen: 32 }));
}
function Ry(e) {
  return Ee(e).replace("0x", "");
}
var Dn = class fs {
  static fromKindBytes(t) {
    const n = pe.TransactionKind.parse(t).ProgrammableTransaction;
    if (!n) throw new Error("Unable to deserialize from bytes.");
    return fs.restore({
      version: 2,
      sender: null,
      expiration: null,
      gasData: { budget: null, owner: null, payment: null, price: null },
      inputs: n.inputs,
      commands: n.commands,
    });
  }
  static fromBytes(t) {
    const n = pe.TransactionData.parse(t)?.V1,
      i = n.kind.ProgrammableTransaction;
    if (!n || !i) throw new Error("Unable to deserialize from bytes.");
    return fs.restore({
      version: 2,
      sender: n.sender,
      expiration: n.expiration,
      gasData: n.gasData,
      inputs: i.inputs,
      commands: i.commands,
    });
  }
  static restore(t) {
    return t.version === 2 ? new fs(Pe(Tl, t)) : new fs(Pe(Tl, KT(t)));
  }
  static getDigestFromBytes(t) {
    return hu(GT("TransactionData", t));
  }
  constructor(t) {
    ((this.version = 2),
      (this.sender = t?.sender ?? null),
      (this.expiration = t?.expiration ?? null),
      (this.inputs = t?.inputs ?? []),
      (this.commands = t?.commands ?? []),
      (this.gasData = t?.gasData ?? {
        budget: null,
        price: null,
        owner: null,
        payment: null,
      }));
  }
  build({
    maxSizeBytes: t = 1 / 0,
    overrides: n,
    onlyTransactionKind: i,
  } = {}) {
    const o = this.inputs,
      l = this.commands,
      u = { ProgrammableTransaction: { inputs: o, commands: l } };
    if (i) return pe.TransactionKind.serialize(u, { maxSize: t }).toBytes();
    const d = n?.expiration ?? this.expiration,
      f = n?.sender ?? this.sender,
      m = { ...this.gasData, ...n?.gasData };
    if (!f) throw new Error("Missing transaction sender");
    if (!m.budget) throw new Error("Missing gas budget");
    if (!m.payment) throw new Error("Missing gas payment");
    if (!m.price) throw new Error("Missing gas price");
    const g = {
      sender: Ry(f),
      expiration: d || { None: !0 },
      gasData: {
        payment: m.payment,
        owner: Ry(this.gasData.owner ?? f),
        price: BigInt(m.price),
        budget: BigInt(m.budget),
      },
      kind: { ProgrammableTransaction: { inputs: o, commands: l } },
    };
    return pe.TransactionData.serialize({ V1: g }, { maxSize: t }).toBytes();
  }
  addInput(t, n) {
    const i = this.inputs.length;
    return (this.inputs.push(n), { Input: i, type: t, $kind: "Input" });
  }
  getInputUses(t, n) {
    this.mapArguments(
      (i, o) => (i.$kind === "Input" && i.Input === t && n(i, o), i),
    );
  }
  mapCommandArguments(t, n) {
    const i = this.commands[t];
    switch (i.$kind) {
      case "MoveCall":
        i.MoveCall.arguments = i.MoveCall.arguments.map((l) => n(l, i, t));
        break;
      case "TransferObjects":
        ((i.TransferObjects.objects = i.TransferObjects.objects.map((l) =>
          n(l, i, t),
        )),
          (i.TransferObjects.address = n(i.TransferObjects.address, i, t)));
        break;
      case "SplitCoins":
        ((i.SplitCoins.coin = n(i.SplitCoins.coin, i, t)),
          (i.SplitCoins.amounts = i.SplitCoins.amounts.map((l) => n(l, i, t))));
        break;
      case "MergeCoins":
        ((i.MergeCoins.destination = n(i.MergeCoins.destination, i, t)),
          (i.MergeCoins.sources = i.MergeCoins.sources.map((l) => n(l, i, t))));
        break;
      case "MakeMoveVec":
        i.MakeMoveVec.elements = i.MakeMoveVec.elements.map((l) => n(l, i, t));
        break;
      case "Upgrade":
        i.Upgrade.ticket = n(i.Upgrade.ticket, i, t);
        break;
      case "$Intent":
        const o = i.$Intent.inputs;
        i.$Intent.inputs = {};
        for (const [l, u] of Object.entries(o))
          i.$Intent.inputs[l] = Array.isArray(u)
            ? u.map((d) => n(d, i, t))
            : n(u, i, t);
        break;
      case "Publish":
        break;
      default:
        throw new Error(`Unexpected transaction kind: ${i.$kind}`);
    }
  }
  mapArguments(t) {
    for (const n of this.commands.keys()) this.mapCommandArguments(n, t);
  }
  replaceCommand(t, n, i = t) {
    if (!Array.isArray(n)) {
      this.commands[t] = n;
      return;
    }
    const o = n.length - 1;
    (this.commands.splice(t, 1, ...structuredClone(n)),
      this.mapArguments((l, u, d) => {
        if (d < t + n.length) return l;
        if (
          typeof i != "number" &&
          ((l.$kind === "Result" && l.Result === t) ||
            (l.$kind === "NestedResult" && l.NestedResult[0] === t))
        ) {
          if (!("NestedResult" in l) || l.NestedResult[1] === 0)
            return Pe($e, structuredClone(i));
          throw new Error(
            `Cannot replace command ${t} with a specific result type: NestedResult[${t}, ${l.NestedResult[1]}] references a nested element that cannot be mapped to the replacement result`,
          );
        }
        switch (l.$kind) {
          case "Result":
            (l.Result === t && typeof i == "number" && (l.Result = i),
              l.Result > t && (l.Result += o));
            break;
          case "NestedResult":
            if (l.NestedResult[0] === t && typeof i == "number")
              return {
                $kind: "NestedResult",
                NestedResult: [i, l.NestedResult[1]],
              };
            l.NestedResult[0] > t && (l.NestedResult[0] += o);
            break;
        }
        return l;
      }));
  }
  replaceCommandWithTransaction(t, n, i) {
    if (i.$kind !== "Result" && i.$kind !== "NestedResult")
      throw new Error("Result must be of kind Result or NestedResult");
    (this.insertTransaction(t, n),
      this.replaceCommand(
        t + n.commands.length,
        [],
        "Result" in i
          ? { NestedResult: [i.Result + t, 0] }
          : { NestedResult: [i.NestedResult[0] + t, i.NestedResult[1]] },
      ));
  }
  insertTransaction(t, n) {
    const i = new Map(),
      o = new Map();
    for (let d = 0; d < n.inputs.length; d++) {
      const f = n.inputs[d],
        m = Yl(f);
      let g = -1;
      if (
        (m !== void 0 &&
          ((g = this.inputs.findIndex((y) => Yl(y) === m)),
          g !== -1 &&
            this.inputs[g].Object?.SharedObject &&
            f.Object?.SharedObject &&
            (this.inputs[g].Object.SharedObject.mutable =
              this.inputs[g].Object.SharedObject.mutable ||
              f.Object.SharedObject.mutable)),
        g !== -1)
      )
        i.set(d, g);
      else {
        const y = this.inputs.length;
        (this.inputs.push(f), i.set(d, y));
      }
    }
    for (let d = 0; d < n.commands.length; d++) o.set(d, t + d);
    const l = [];
    for (let d = 0; d < n.commands.length; d++) {
      const f = structuredClone(n.commands[d]);
      (VT(f, i, o), l.push(f));
    }
    this.commands.splice(t, 0, ...l);
    const u = l.length;
    u > 0 &&
      this.mapArguments((d, f, m) => {
        if (m >= t && m < t + l.length) return d;
        switch (d.$kind) {
          case "Result":
            d.Result >= t && (d.Result += u);
            break;
          case "NestedResult":
            d.NestedResult[0] >= t && (d.NestedResult[0] += u);
            break;
        }
        return d;
      });
  }
  getDigest() {
    const t = this.build({ onlyTransactionKind: !1 });
    return fs.getDigestFromBytes(t);
  }
  snapshot() {
    return Pe(Tl, this);
  }
  shallowClone() {
    return new fs({
      version: this.version,
      sender: this.sender,
      expiration: this.expiration,
      gasData: { ...this.gasData },
      inputs: [...this.inputs],
      commands: [...this.commands],
    });
  }
  applyResolvedData(t) {
    (this.sender || (this.sender = t.sender ?? null),
      this.expiration || (this.expiration = t.expiration ?? null),
      this.gasData.budget || (this.gasData.budget = t.gasData.budget),
      this.gasData.owner || (this.gasData.owner = t.gasData.owner ?? null),
      this.gasData.payment || (this.gasData.payment = t.gasData.payment),
      this.gasData.price || (this.gasData.price = t.gasData.price));
    for (let n = 0; n < this.inputs.length; n++) {
      const i = this.inputs[n],
        o = t.inputs[n];
      switch (i.$kind) {
        case "UnresolvedPure":
          if (o.$kind !== "Pure")
            throw new Error(
              `Expected input at index ${n} to resolve to a Pure argument, but got ${JSON.stringify(o)}`,
            );
          this.inputs[n] = o;
          break;
        case "UnresolvedObject":
          if (o.$kind !== "Object")
            throw new Error(
              `Expected input at index ${n} to resolve to an Object argument, but got ${JSON.stringify(o)}`,
            );
          if (
            o.Object.$kind === "ImmOrOwnedObject" ||
            o.Object.$kind === "Receiving"
          ) {
            const l = i.UnresolvedObject,
              u = o.Object.ImmOrOwnedObject ?? o.Object.Receiving;
            if (
              Ee(l.objectId) !== Ee(u.objectId) ||
              (l.version != null && l.version !== u.version) ||
              (l.digest != null && l.digest !== u.digest) ||
              l.mutable != null ||
              l.initialSharedVersion != null
            )
              throw new Error(
                `Input at index ${n} did not match unresolved object. ${JSON.stringify(l)} is not compatible with ${JSON.stringify(u)}`,
              );
          } else if (o.Object.$kind === "SharedObject") {
            const l = i.UnresolvedObject,
              u = o.Object.SharedObject;
            if (
              Ee(l.objectId) !== Ee(u.objectId) ||
              (l.initialSharedVersion != null &&
                l.initialSharedVersion !== u.initialSharedVersion) ||
              (l.mutable != null && l.mutable !== u.mutable) ||
              l.version != null ||
              l.digest != null
            )
              throw new Error(
                `Input at index ${n} did not match unresolved object. ${JSON.stringify(l)} is not compatible with ${JSON.stringify(u)}`,
              );
          } else
            throw new Error(
              `Input at index ${n} resolved to an unexpected Object kind: ${JSON.stringify(o.Object)}`,
            );
          this.inputs[n] = o;
          break;
      }
    }
  }
};
const qt = {
  MoveCall(e) {
    const [t, n = "", i = ""] =
      "target" in e ? e.target.split("::") : [e.package, e.module, e.function];
    return {
      $kind: "MoveCall",
      MoveCall: {
        package: t,
        module: n,
        function: i,
        typeArguments: e.typeArguments ?? [],
        arguments: e.arguments ?? [],
      },
    };
  },
  TransferObjects(e, t) {
    return {
      $kind: "TransferObjects",
      TransferObjects: { objects: e.map((n) => Pe($e, n)), address: Pe($e, t) },
    };
  },
  SplitCoins(e, t) {
    return {
      $kind: "SplitCoins",
      SplitCoins: { coin: Pe($e, e), amounts: t.map((n) => Pe($e, n)) },
    };
  },
  MergeCoins(e, t) {
    return {
      $kind: "MergeCoins",
      MergeCoins: { destination: Pe($e, e), sources: t.map((n) => Pe($e, n)) },
    };
  },
  Publish({ modules: e, dependencies: t }) {
    return {
      $kind: "Publish",
      Publish: {
        modules: e.map((n) =>
          typeof n == "string" ? n : ze(new Uint8Array(n)),
        ),
        dependencies: t.map((n) => ps(n)),
      },
    };
  },
  Upgrade({ modules: e, dependencies: t, package: n, ticket: i }) {
    return {
      $kind: "Upgrade",
      Upgrade: {
        modules: e.map((o) =>
          typeof o == "string" ? o : ze(new Uint8Array(o)),
        ),
        dependencies: t.map((o) => ps(o)),
        package: n,
        ticket: Pe($e, i),
      },
    };
  },
  MakeMoveVec({ type: e, elements: t }) {
    return {
      $kind: "MakeMoveVec",
      MakeMoveVec: { type: e ?? null, elements: t.map((n) => Pe($e, n)) },
    };
  },
  Intent({ name: e, inputs: t = {}, data: n = {} }) {
    return {
      $kind: "$Intent",
      $Intent: {
        name: e,
        inputs: Object.fromEntries(
          Object.entries(t).map(([i, o]) => [
            i,
            Array.isArray(o) ? o.map((l) => Pe($e, l)) : Pe($e, o),
          ]),
        ),
        data: n,
      },
    };
  },
};
function qT(e) {
  return {
    $kind: "Pure",
    Pure: { bytes: e instanceof Uint8Array ? ze(e) : e.toBase64() },
  };
}
const It = {
  Pure: qT,
  ObjectRef({ objectId: e, digest: t, version: n }) {
    return {
      $kind: "Object",
      Object: {
        $kind: "ImmOrOwnedObject",
        ImmOrOwnedObject: { digest: t, version: n, objectId: Ee(e) },
      },
    };
  },
  SharedObjectRef({ objectId: e, mutable: t, initialSharedVersion: n }) {
    return {
      $kind: "Object",
      Object: {
        $kind: "SharedObject",
        SharedObject: { mutable: t, initialSharedVersion: n, objectId: Ee(e) },
      },
    };
  },
  ReceivingRef({ objectId: e, digest: t, version: n }) {
    return {
      $kind: "Object",
      Object: {
        $kind: "Receiving",
        Receiving: { digest: t, version: n, objectId: Ee(e) },
      },
    };
  },
  FundsWithdrawal({ reservation: e, typeArg: t, withdrawFrom: n }) {
    return {
      $kind: "FundsWithdrawal",
      FundsWithdrawal: { reservation: e, typeArg: t, withdrawFrom: n },
    };
  },
};
function F0(e) {
  const t = e.split("::");
  if (t.length !== 3) throw new Error(`Invalid type name format: ${e}`);
  return { package: t[0], module: t[1], name: t[2] };
}
function QT(e) {
  if (e.body.$kind !== "datatype") return !1;
  const { package: t, module: n, name: i } = F0(e.body.datatype.typeName);
  return Ee(t) === vi && n === "tx_context" && i === "TxContext";
}
function Sf(e) {
  switch (e.$kind) {
    case "address":
      return pe.Address;
    case "bool":
      return pe.Bool;
    case "u8":
      return pe.U8;
    case "u16":
      return pe.U16;
    case "u32":
      return pe.U32;
    case "u64":
      return pe.U64;
    case "u128":
      return pe.U128;
    case "u256":
      return pe.U256;
    case "vector": {
      if (e.vector.$kind === "u8")
        return pe
          .byteVector()
          .transform({
            input: (n) =>
              typeof n == "string" ? new TextEncoder().encode(n) : n,
            output: (n) => n,
          });
      const t = Sf(e.vector);
      return t ? pe.vector(t) : null;
    }
    case "datatype": {
      const { package: t, module: n, name: i } = F0(e.datatype.typeName),
        o = Ee(t);
      if (o === j0) {
        if (
          (n === "ascii" && i === "String") ||
          (n === "string" && i === "String")
        )
          return pe.String;
        if (n === "option" && i === "Option") {
          const l = Sf(e.datatype.typeParameters[0]);
          return l ? pe.vector(l) : null;
        }
      }
      return o === vi && n === "object" && i === "ID" ? pe.Address : null;
    }
    case "typeParameter":
    case "unknown":
      return null;
  }
}
const Ao = "CoinWithBalance",
  bo = Ke("0x2::sui::SUI"),
  YT = re({ type: ge(), balance: fh() });
async function XT(e, t, n) {
  const i = new Set(),
    o = new Map();
  if (!e.sender)
    throw new Error("Sender must be set to resolve CoinWithBalance");
  for (const g of e.commands)
    if (g.$kind === "$Intent" && g.$Intent.name === Ao) {
      const { type: y, balance: v } = Pe(YT, g.$Intent.data);
      (y !== "gas" && v > 0n && i.add(y), o.set(y, (o.get(y) ?? 0n) + v));
    }
  const l = new Set();
  for (const g of e.inputs)
    (g.Object?.ImmOrOwnedObject && l.add(g.Object.ImmOrOwnedObject.objectId),
      g.UnresolvedObject?.objectId && l.add(g.UnresolvedObject.objectId));
  const u = new Map(),
    d = new Map(),
    f = t.client;
  if (!f)
    throw new Error(
      "Client must be provided to build or serialize transactions with CoinWithBalance intents",
    );
  await Promise.all([
    ...[...i].map(async (g) => {
      const { coins: y, addressBalance: v } = await ZT({
        coinType: g,
        balance: o.get(g),
        client: f,
        owner: e.sender,
        usedIds: l,
      });
      (u.set(g, y), d.set(g, v));
    }),
    o.has("gas")
      ? await f.core
          .getBalance({ owner: e.sender, coinType: bo })
          .then(({ balance: g }) => {
            d.set("gas", BigInt(g.addressBalance));
          })
      : null,
  ]);
  const m = new Map();
  for (const [g, y] of e.commands.entries()) {
    if (y.$kind !== "$Intent" || y.$Intent.name !== Ao) continue;
    const { type: v, balance: C } = y.$Intent.data;
    if (C === 0n) {
      e.replaceCommand(
        g,
        qt.MoveCall({
          target: "0x2::coin::zero",
          typeArguments: [v === "gas" ? bo : v],
        }),
      );
      continue;
    }
    const E = [];
    if (d.get(v) >= o.get(v))
      E.push(
        qt.MoveCall({
          target: "0x2::coin::redeem_funds",
          typeArguments: [v === "gas" ? bo : v],
          arguments: [
            e.addInput(
              "withdrawal",
              It.FundsWithdrawal({
                reservation: { $kind: "MaxAmountU64", MaxAmountU64: String(C) },
                typeArg: { $kind: "Balance", Balance: v === "gas" ? bo : v },
                withdrawFrom: { $kind: "Sender", Sender: !0 },
              }),
            ),
          ],
        }),
      );
    else {
      if (!m.has(v)) {
        const S = d.get(v) ?? 0n,
          k = v === "gas" ? bo : v;
        let x, M;
        (v === "gas"
          ? ((x = { $kind: "GasCoin", GasCoin: !0 }), (M = []))
          : ([x, ...M] = u
              .get(v)
              .map((A) =>
                e.addInput(
                  "object",
                  It.ObjectRef({
                    objectId: A.objectId,
                    digest: A.digest,
                    version: A.version,
                  }),
                ),
              )),
          S > 0n
            ? (E.push(
                qt.MoveCall({
                  target: "0x2::coin::redeem_funds",
                  typeArguments: [k],
                  arguments: [
                    e.addInput(
                      "withdrawal",
                      It.FundsWithdrawal({
                        reservation: {
                          $kind: "MaxAmountU64",
                          MaxAmountU64: String(S),
                        },
                        typeArg: { $kind: "Balance", Balance: k },
                        withdrawFrom: { $kind: "Sender", Sender: !0 },
                      }),
                    ),
                  ],
                }),
              ),
              E.push(
                qt.MergeCoins(x, [
                  { $kind: "Result", Result: g + E.length - 1 },
                  ...M,
                ]),
              ))
            : M.length > 0 && E.push(qt.MergeCoins(x, M)),
          m.set(v, x));
      }
      E.push(
        qt.SplitCoins(m.get(v), [
          e.addInput("pure", It.Pure(pe.u64().serialize(C))),
        ]),
      );
    }
    (e.replaceCommand(g, E),
      e.mapArguments((S, k, x) =>
        x >= g && x < g + E.length
          ? S
          : S.$kind === "Result" && S.Result === g
            ? { $kind: "NestedResult", NestedResult: [g + E.length - 1, 0] }
            : S,
      ));
  }
  return n();
}
async function ZT({
  coinType: e,
  balance: t,
  client: n,
  owner: i,
  usedIds: o,
}) {
  let l = t;
  const u = [],
    d = n.core
      .getBalance({ owner: i, coinType: e })
      .then(({ balance: y }) => ((l -= BigInt(y.addressBalance)), y)),
    [f, m] = await Promise.all([g(), d]);
  if (BigInt(m.balance) < t)
    throw new Error(
      `Insufficient balance of ${e} for owner ${i}. Required: ${t}, Available: ${t - l}`,
    );
  return {
    coins: f,
    balance: BigInt(m.coinBalance),
    addressBalance: BigInt(m.addressBalance),
    coinBalance: BigInt(m.coinBalance),
  };
  async function g(y = null) {
    const {
      objects: v,
      hasNextPage: C,
      cursor: E,
    } = await n.core.listCoins({ owner: i, coinType: e, cursor: y });
    if ((await d, l > 0n)) {
      for (const S of v) {
        if (o.has(S.objectId)) continue;
        const k = BigInt(S.balance);
        if ((u.push(S), (l -= k), l <= 0)) break;
      }
      if (C) return g(E);
    }
    return u;
  }
}
function $o(e) {
  return Sn(Object.entries(e).map(([t, n]) => re({ [t]: n })));
}
const wn = $o({
    GasCoin: ke(!0),
    Input: ht(Et(), zt()),
    Result: ht(Et(), zt()),
    NestedResult: hh([ht(Et(), zt()), ht(Et(), zt())]),
  }),
  JT = re({
    budget: De(nt),
    price: De(nt),
    owner: De(Ii),
    payment: De(Ie(Ur)),
  }),
  eI = re({
    package: Xt,
    module: ge(),
    function: ge(),
    typeArguments: Ie(ge()),
    arguments: Ie(wn),
  }),
  tI = re({
    name: ge(),
    inputs: Bo(ge(), Sn([wn, Ie(wn)])),
    data: Bo(ge(), Qo()),
  }),
  nI = $o({
    MoveCall: eI,
    TransferObjects: re({ objects: Ie(wn), address: wn }),
    SplitCoins: re({ coin: wn, amounts: Ie(wn) }),
    MergeCoins: re({ destination: wn, sources: Ie(wn) }),
    Publish: re({ modules: Ie(Ss), dependencies: Ie(Xt) }),
    MakeMoveVec: re({ type: De(ge()), elements: Ie(wn) }),
    Upgrade: re({
      modules: Ie(Ss),
      dependencies: Ie(Xt),
      package: Xt,
      ticket: wn,
    }),
    $Intent: tI,
  }),
  rI = $o({
    Object: $o({
      ImmOrOwnedObject: Ur,
      SharedObject: re({
        objectId: Xt,
        initialSharedVersion: nt,
        mutable: bs(),
      }),
      Receiving: Ur,
    }),
    Pure: re({ bytes: Ss }),
    UnresolvedPure: re({ value: Qo() }),
    UnresolvedObject: re({
      objectId: Xt,
      version: Ft(De(nt)),
      digest: Ft(De(ge())),
      initialSharedVersion: Ft(De(nt)),
      mutable: Ft(De(bs())),
    }),
    FundsWithdrawal: B0,
  }),
  sI = $o({ None: ke(!0), Epoch: nt, ValidDuring: $0 }),
  iI = re({
    version: ke(2),
    sender: Lo(Ii),
    expiration: Lo(sI),
    gasData: JT,
    inputs: Ie(rI),
    commands: Ie(nI),
    digest: Ft(De(ge())),
  });
var U0 = class extends Error {},
  oI = class extends U0 {
    constructor(e, t) {
      (super(e, { cause: t?.cause }),
        (this.executionError = t?.executionError));
    }
  },
  _y = class ci extends U0 {
    constructor(t, n) {
      (super(n), (this.code = t));
    }
    static fromResponse(t, n) {
      switch (t.code) {
        case "notExists":
          return new ci(t.code, `Object ${t.object_id} does not exist`);
        case "dynamicFieldNotFound":
          return new ci(
            t.code,
            `Dynamic field not found for object ${t.parent_object_id}`,
          );
        case "deleted":
          return new ci(t.code, `Object ${t.object_id} has been deleted`);
        case "displayError":
          return new ci(t.code, `Display error: ${t.error}`);
        default:
          return new ci(
            t.code,
            `Unknown error while loading object${n ? ` ${n}` : ""}`,
          );
      }
    }
  };
const aI = 50,
  lI = 1000n,
  uI = 5e10;
function cI(e) {
  if (!e.client)
    throw new Error(
      "No sui client passed to Transaction#build, but transaction data was not sufficient to build offline.",
    );
  return e.client;
}
async function V0(e, t, n) {
  const i = cI(t);
  return (
    await gI(e, i),
    await mI(e, i),
    t.onlyTransactionKind || (await dI(e, i)),
    await n()
  );
}
async function dI(e, t) {
  let n = null;
  (e.gasData.price ||
    ((n = (await t.core.getCurrentSystemState()).systemState),
    (e.gasData.price = n.referenceGasPrice)),
    await fI(e, t),
    await hI(e, t),
    e.expiration || (await pI(e, t, n)));
}
async function fI(e, t) {
  if (e.gasData.budget) return;
  const n = await t.core.simulateTransaction({
    transaction: e.build({
      overrides: { gasData: { budget: String(uI), payment: [] } },
    }),
    include: { effects: !0 },
  });
  if (n.$kind === "FailedTransaction") {
    const d = n.FailedTransaction.status.error ?? void 0;
    throw new oI(
      `Transaction resolution failed: ${d?.message ?? "Unknown error"}`,
      { cause: n, executionError: d },
    );
  }
  const i = n.Transaction.effects.gasUsed,
    o = lI * BigInt(e.gasData.price || 1n),
    l = BigInt(i.computationCost) + o,
    u = l + BigInt(i.storageCost) - BigInt(i.storageRebate);
  e.gasData.budget = String(u > l ? u : l);
}
async function hI(e, t) {
  if (!e.gasData.payment) {
    const n = e.gasData.owner ?? e.sender;
    if (!n)
      throw new Error(
        "Either a gas owner or sender must be set to determine gas payment.",
      );
    const i = Ee(n);
    let o = !1,
      l = 0n;
    e.mapArguments((m) => {
      if (m.$kind === "GasCoin") o = !0;
      else if (m.$kind === "Input") {
        const g = e.inputs[m.Input];
        if (g.$kind === "FundsWithdrawal") {
          const y = g.FundsWithdrawal.withdrawFrom.Sender ? e.sender : n;
          y &&
            Ee(y) === i &&
            g.FundsWithdrawal.reservation.$kind === "MaxAmountU64" &&
            (l += BigInt(g.FundsWithdrawal.reservation.MaxAmountU64));
        }
      }
      return m;
    });
    const [u, d] = await Promise.all([
      o ? null : t.core.getBalance({ owner: n }),
      t.core.listCoins({ owner: n, coinType: vT }),
    ]);
    if (
      u?.balance.addressBalance &&
      BigInt(u.balance.addressBalance) >= BigInt(e.gasData.budget || "0") + l
    ) {
      e.gasData.payment = [];
      return;
    }
    const f = d.objects
      .filter(
        (m) =>
          !e.inputs.find((g) =>
            g.Object?.ImmOrOwnedObject
              ? m.objectId === g.Object.ImmOrOwnedObject.objectId
              : !1,
          ),
      )
      .map((m) =>
        Pe(Ur, { objectId: m.objectId, digest: m.digest, version: m.version }),
      );
    if (!f.length)
      throw new Error("No valid gas coins found for the transaction.");
    e.gasData.payment = f;
  }
}
async function pI(e, t, n) {
  const [i, { chainIdentifier: o }] = await Promise.all([
      n ?? t.core.getCurrentSystemState().then((u) => u.systemState),
      t.core.getChainIdentifier(),
    ]),
    l = BigInt(i.epoch);
  e.expiration = {
    $kind: "ValidDuring",
    ValidDuring: {
      minEpoch: String(l),
      maxEpoch: String(l + 1n),
      minTimestamp: null,
      maxTimestamp: null,
      chain: o,
      nonce: (Math.random() * 4294967296) >>> 0,
    },
  };
}
async function mI(e, t) {
  const n = e.inputs.filter(
      (g) =>
        g.UnresolvedObject &&
        !(
          g.UnresolvedObject.version || g.UnresolvedObject?.initialSharedVersion
        ),
    ),
    i = [...new Set(n.map((g) => ps(g.UnresolvedObject.objectId)))],
    o = i.length ? Gl(i, aI) : [],
    l = (
      await Promise.all(o.map((g) => t.core.getObjects({ objectIds: g })))
    ).flatMap((g) => g.objects),
    u = new Map(i.map((g, y) => [g, l[y]])),
    d = Array.from(u)
      .filter(([g, y]) => y instanceof Error)
      .map(([g, y]) => y.message);
  if (d.length)
    throw new Error(`The following input objects are invalid: ${d.join(", ")}`);
  const f = l.map((g) => {
      if (g instanceof Error)
        throw new Error(`Failed to fetch object: ${g.message}`);
      const y = g.owner,
        v =
          y && typeof y == "object"
            ? y.$kind === "Shared"
              ? y.Shared.initialSharedVersion
              : y.$kind === "ConsensusAddressOwner"
                ? y.ConsensusAddressOwner.startVersion
                : null
            : null;
      return {
        objectId: g.objectId,
        digest: g.digest,
        version: g.version,
        initialSharedVersion: v,
      };
    }),
    m = new Map(i.map((g, y) => [g, f[y]]));
  for (const [g, y] of e.inputs.entries()) {
    if (!y.UnresolvedObject) continue;
    let v;
    const C = Ee(y.UnresolvedObject.objectId),
      E = m.get(C);
    ((y.UnresolvedObject.initialSharedVersion ?? E?.initialSharedVersion)
      ? (v = It.SharedObjectRef({
          objectId: C,
          initialSharedVersion:
            y.UnresolvedObject.initialSharedVersion || E?.initialSharedVersion,
          mutable: y.UnresolvedObject.mutable || yI(e, g),
        }))
      : vI(e, g) &&
        (v = It.ReceivingRef({
          objectId: C,
          digest: y.UnresolvedObject.digest ?? E?.digest,
          version: y.UnresolvedObject.version ?? E?.version,
        })),
      (e.inputs[e.inputs.indexOf(y)] =
        v ??
        It.ObjectRef({
          objectId: C,
          digest: y.UnresolvedObject.digest ?? E?.digest,
          version: y.UnresolvedObject.version ?? E?.version,
        })));
  }
}
async function gI(e, t) {
  const { inputs: n, commands: i } = e,
    o = [],
    l = new Set();
  i.forEach((d) => {
    if (d.MoveCall) {
      if (d.MoveCall._argumentTypes) return;
      if (
        d.MoveCall.arguments
          .map((f) => (f.$kind === "Input" ? e.inputs[f.Input] : null))
          .some(
            (f) =>
              f?.UnresolvedPure ||
              (f?.UnresolvedObject &&
                typeof f?.UnresolvedObject.mutable != "boolean"),
          )
      ) {
        const f = `${d.MoveCall.package}::${d.MoveCall.module}::${d.MoveCall.function}`;
        (l.add(f), o.push(d.MoveCall));
      }
    }
  });
  const u = new Map();
  (l.size > 0 &&
    (await Promise.all(
      [...l].map(async (d) => {
        const [f, m, g] = d.split("::"),
          { function: y } = await t.core.getMoveFunction({
            packageId: f,
            moduleName: m,
            name: g,
          });
        u.set(d, y.parameters);
      }),
    )),
    o.length &&
      (await Promise.all(
        o.map(async (d) => {
          const f = u.get(`${d.package}::${d.module}::${d.function}`);
          f &&
            (d._argumentTypes =
              f.length > 0 && QT(f.at(-1)) ? f.slice(0, f.length - 1) : f);
        }),
      )),
    i.forEach((d) => {
      if (!d.MoveCall) return;
      const f = d.MoveCall,
        m = `${f.package}::${f.module}::${f.function}`,
        g = f._argumentTypes;
      if (g) {
        if (g.length !== d.MoveCall.arguments.length)
          throw new Error(`Incorrect number of arguments for ${m}`);
        g.forEach((y, v) => {
          const C = f.arguments[v];
          if (C.$kind !== "Input") return;
          const E = n[C.Input];
          if (!E.UnresolvedPure && !E.UnresolvedObject) return;
          const S = E.UnresolvedPure?.value ?? E.UnresolvedObject?.objectId,
            k = Sf(y.body);
          if (k) {
            ((C.type = "pure"), (n[n.indexOf(E)] = It.Pure(k.serialize(S))));
            return;
          }
          if (typeof S != "string")
            throw new Error(
              `Expect the argument to be an object id string, got ${JSON.stringify(S, null, 2)}`,
            );
          C.type = "object";
          const x = E.UnresolvedPure
            ? { $kind: "UnresolvedObject", UnresolvedObject: { objectId: S } }
            : E;
          n[C.Input] = x;
        });
      }
    }));
}
function yI(e, t) {
  let n = !1;
  return (
    e.getInputUses(t, (i, o) => {
      if (o.MoveCall && o.MoveCall._argumentTypes) {
        const l = o.MoveCall.arguments.indexOf(i);
        n = o.MoveCall._argumentTypes[l].reference !== "immutable" || n;
      }
      (o.$kind === "MakeMoveVec" ||
        o.$kind === "MergeCoins" ||
        o.$kind === "SplitCoins" ||
        o.$kind === "TransferObjects") &&
        (n = !0);
    }),
    n
  );
}
function vI(e, t) {
  let n = !1;
  return (
    e.getInputUses(t, (i, o) => {
      if (o.MoveCall && o.MoveCall._argumentTypes) {
        const l = o.MoveCall.arguments.indexOf(i);
        n = bI(o.MoveCall._argumentTypes[l]) || n;
      }
    }),
    n
  );
}
const wI =
  "0x0000000000000000000000000000000000000000000000000000000000000002::transfer::Receiving";
function bI(e) {
  return e.body.$kind !== "datatype" ? !1 : e.body.datatype.typeName === wI;
}
function W0(e, t) {
  return !!(
    e.inputs.some((n) => n.UnresolvedObject || n.UnresolvedPure) ||
    (!t.onlyTransactionKind &&
      (!e.gasData.price ||
        !e.gasData.budget ||
        !e.gasData.payment ||
        (e.gasData.payment.length === 0 && !e.expiration)))
  );
}
async function SI(e, t, n) {
  return (
    xI(e),
    W0(e, t)
      ? (EI(t).core?.resolveTransactionPlugin() ?? V0)(e, t, async () => {
          (await Ny(e), await n());
        })
      : (await Ny(e), n())
  );
}
function Ny(e) {
  e.inputs.forEach((t, n) => {
    if (
      t.$kind !== "Object" &&
      t.$kind !== "Pure" &&
      t.$kind !== "FundsWithdrawal"
    )
      throw new Error(
        `Input at index ${n} has not been resolved.  Expected a Pure, Object, or FundsWithdrawal input, but found ${JSON.stringify(t)}`,
      );
  });
}
function EI(e) {
  if (!e.client)
    throw new Error(
      "No sui client passed to Transaction#build, but transaction data was not sufficient to build offline.",
    );
  return e.client;
}
function xI(e) {
  for (const t of e.commands)
    switch (t.$kind) {
      case "SplitCoins":
        t.SplitCoins.amounts.forEach((n) => {
          Py(n, pe.U64, e);
        });
        break;
      case "TransferObjects":
        Py(t.TransferObjects.address, pe.Address, e);
        break;
    }
}
function Py(e, t, n) {
  if (e.$kind !== "Input") return;
  const i = n.inputs[e.Input];
  i.$kind === "UnresolvedPure" &&
    (n.inputs[e.Input] = It.Pure(t.serialize(i.UnresolvedPure.value)));
}
function CI(e) {
  function t(n) {
    return e(n);
  }
  return (
    (t.system = (n) => {
      const i = n?.mutable;
      return t(
        i !== void 0
          ? It.SharedObjectRef({
              objectId: Ty,
              initialSharedVersion: 1,
              mutable: i,
            })
          : {
              $kind: "UnresolvedObject",
              UnresolvedObject: { objectId: Ty, initialSharedVersion: 1 },
            },
      );
    }),
    (t.clock = () =>
      t(
        It.SharedObjectRef({
          objectId: R0,
          initialSharedVersion: 1,
          mutable: !1,
        }),
      )),
    (t.random = () =>
      t({
        $kind: "UnresolvedObject",
        UnresolvedObject: { objectId: wT, mutable: !1 },
      })),
    (t.denyList = (n) =>
      t({
        $kind: "UnresolvedObject",
        UnresolvedObject: { objectId: bT, mutable: n?.mutable },
      })),
    (t.option =
      ({ type: n, value: i }) =>
      (o) =>
        o.moveCall({
          typeArguments: [n],
          target: `${j0}::option::${i === null ? "none" : "some"}`,
          arguments: i === null ? [] : [o.object(i)],
        })),
    t
  );
}
function kI(e) {
  function t(n, i) {
    if (typeof n == "string") return e(Mo(n).serialize(i));
    if (n instanceof Uint8Array || yf(n)) return e(n);
    throw new Error(
      "tx.pure must be called either a bcs type name, or a serialized bcs value",
    );
  }
  return (
    (t.u8 = (n) => e(pe.U8.serialize(n))),
    (t.u16 = (n) => e(pe.U16.serialize(n))),
    (t.u32 = (n) => e(pe.U32.serialize(n))),
    (t.u64 = (n) => e(pe.U64.serialize(n))),
    (t.u128 = (n) => e(pe.U128.serialize(n))),
    (t.u256 = (n) => e(pe.U256.serialize(n))),
    (t.bool = (n) => e(pe.Bool.serialize(n))),
    (t.string = (n) => e(pe.String.serialize(n))),
    (t.address = (n) => e(pe.Address.serialize(n))),
    (t.id = t.address),
    (t.vector = (n, i) => e(pe.vector(Mo(n)).serialize(i))),
    (t.option = (n, i) => e(pe.option(Mo(n)).serialize(i))),
    t
  );
}
const H0 = "2.6.0",
  OI = "1.68.0",
  TI = "/",
  II = { "Mvr-Source": `@mysten/sui@${H0}` };
var MI = class {
  #e;
  #t;
  #n;
  #s;
  constructor({ cache: e, url: t, pageSize: n = 50, overrides: i }) {
    ((this.#e = e),
      (this.#t = t),
      (this.#n = n),
      (this.#s = { packages: i?.packages, types: i?.types }),
      AI(this.#s));
  }
  get #i() {
    return this.#e.readSync(["#mvrPackageDataLoader", this.#t ?? ""], () => {
      const e = new yy(async (n) => {
          if (!this.#t)
            throw new Error(
              `MVR Api URL is not set for the current client (resolving ${n.join(", ")})`,
            );
          const i = await this.#a(n);
          return n.map(
            (o) => i[o] ?? new Error(`Failed to resolve package: ${o}`),
          );
        }),
        t = this.#s?.packages;
      if (t) for (const [n, i] of Object.entries(t)) e.prime(n, i);
      return e;
    });
  }
  get #l() {
    return this.#e.readSync(["#mvrTypeDataLoader", this.#t ?? ""], () => {
      const e = new yy(async (n) => {
          if (!this.#t)
            throw new Error(
              `MVR Api URL is not set for the current client (resolving ${n.join(", ")})`,
            );
          const i = await this.#u(n);
          return n.map(
            (o) => i[o] ?? new Error(`Failed to resolve type: ${o}`),
          );
        }),
        t = this.#s?.types;
      if (t) for (const [n, i] of Object.entries(t)) e.prime(n, i);
      return e;
    });
  }
  async #a(e) {
    if (e.length === 0) return {};
    const t = Gl(e, this.#n),
      n = {};
    return (
      await Promise.all(
        t.map(async (i) => {
          const o = await this.#r("/v1/resolution/bulk", { names: i });
          if (o?.resolution)
            for (const l of Object.keys(o?.resolution)) {
              const u = o.resolution[l]?.package_id;
              u && (n[l] = u);
            }
        }),
      ),
      n
    );
  }
  async #u(e) {
    if (e.length === 0) return {};
    const t = Gl(e, this.#n),
      n = {};
    return (
      await Promise.all(
        t.map(async (i) => {
          const o = await this.#r("/v1/struct-definition/bulk", { types: i });
          if (o?.resolution)
            for (const l of Object.keys(o?.resolution)) {
              const u = o.resolution[l]?.type_tag;
              u && (n[l] = u);
            }
        }),
      ),
      n
    );
  }
  async #r(e, t) {
    if (!this.#t)
      throw new Error("MVR Api URL is not set for the current client");
    const n = await fetch(`${this.#t}${e}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...II },
      body: JSON.stringify(t),
    });
    if (!n.ok) {
      const i = await n.json().catch(() => ({}));
      throw new Error(`Failed to resolve types: ${i?.message}`);
    }
    return n.json();
  }
  async resolvePackage({ package: e }) {
    return St(e) ? { package: await this.#i.load(e) } : { package: e };
  }
  async resolveType({ type: e }) {
    if (!St(e)) return { type: e };
    const t = [...Ef(e)],
      n = await this.#l.loadMany(t),
      i = {};
    for (let o = 0; o < t.length; o++) {
      const l = n[o];
      if (l instanceof Error) throw l;
      i[t[o]] = l;
    }
    return { type: xf(e, i) };
  }
  async resolve({ types: e = [], packages: t = [] }) {
    const n = new Set();
    for (const m of e ?? []) Ef(m, n);
    const i = [...n],
      [o, l] = await Promise.all([
        i.length > 0 ? this.#l.loadMany(i) : [],
        t.length > 0 ? this.#i.loadMany(t) : [],
      ]),
      u = { ...this.#s?.types };
    for (const [m, g] of i.entries()) {
      const y = o[m];
      if (y instanceof Error) throw y;
      u[g] = y;
    }
    const d = {};
    for (const m of e ?? []) d[m] = { type: xf(m, u) };
    const f = {};
    for (const [m, g] of (t ?? []).entries()) {
      const y = this.#s?.packages?.[g] ?? l[m];
      if (y instanceof Error) throw y;
      f[g] = { package: y };
    }
    return { types: d, packages: f };
  }
};
function AI(e) {
  if (e?.packages)
    for (const [t, n] of Object.entries(e.packages)) {
      if (!Bt(t)) throw new Error(`Invalid package name: ${t}`);
      if (!ln(Ee(n))) throw new Error(`Invalid package ID: ${n}`);
    }
  if (e?.types)
    for (const [t, n] of Object.entries(e.types)) {
      if (zr(t).typeParams.length > 0)
        throw new Error(
          "Type overrides must be first-level only. If you want to supply generic types, just pass each type individually.",
        );
      if (!ln(zr(n).address)) throw new Error(`Invalid type: ${n}`);
    }
}
function Ef(e, t = new Set()) {
  if (typeof e == "string" && !St(e)) return t;
  const n = K0(e) ? e : zr(e);
  St(n.address) && t.add(`${n.address}::${n.module}::${n.name}`);
  for (const i of n.typeParams) Ef(i, t);
  return t;
}
function xf(e, t) {
  const n = K0(e) ? e : zr(e),
    i = t[`${n.address}::${n.module}::${n.name}`];
  return Ke({
    ...n,
    address: i ? i.split("::")[0] : n.address,
    typeParams: n.typeParams.map((o) => xf(o, t)),
  });
}
function St(e) {
  return e.includes(TI) || e.includes("@") || e.includes(".sui");
}
function K0(e) {
  return (
    typeof e == "object" &&
    "address" in e &&
    "module" in e &&
    "name" in e &&
    "typeParams" in e
  );
}
function jI(e) {
  const t = new Set(),
    n = new Set();
  for (const i of e.commands)
    switch (i.$kind) {
      case "MakeMoveVec":
        i.MakeMoveVec.type &&
          Dy([i.MakeMoveVec.type]).forEach((u) => {
            n.add(u);
          });
        break;
      case "MoveCall":
        const o = i.MoveCall,
          l = o.package.split("::")[0];
        if (St(l)) {
          if (!Bt(l)) throw new Error(`Invalid package name: ${l}`);
          t.add(l);
        }
        Dy(o.typeArguments ?? []).forEach((u) => {
          n.add(u);
        });
        break;
    }
  return { packages: [...t], types: [...n] };
}
function RI(e, t) {
  for (const n of e.commands) {
    if (n.MakeMoveVec?.type) {
      if (!St(n.MakeMoveVec.type)) continue;
      if (!t.types[n.MakeMoveVec.type])
        throw new Error(`No resolution found for type: ${n.MakeMoveVec.type}`);
      n.MakeMoveVec.type = t.types[n.MakeMoveVec.type].type;
    }
    const i = n.MoveCall;
    if (!i) continue;
    const o = i.package.split("::"),
      l = o[0];
    if (St(l) && !t.packages[l])
      throw new Error(`No address found for package: ${l}`);
    St(l) && ((o[0] = t.packages[l].package), (i.package = o.join("::")));
    const u = i.typeArguments;
    if (u) {
      for (let d = 0; d < u.length; d++)
        if (St(u[d])) {
          if (!t.types[u[d]])
            throw new Error(`No resolution found for type: ${u[d]}`);
          u[d] = t.types[u[d]].type;
        }
      i.typeArguments = u;
    }
  }
}
function Dy(e) {
  const t = new Set();
  for (const n of e)
    if (St(n)) {
      if (!SO(n)) throw new Error(`Invalid type with names: ${n}`);
      t.add(n);
    }
  return t;
}
function _I() {
  return async (e, t, n) => {
    const i = jI(e);
    if (i.types.length === 0 && i.packages.length === 0) return n();
    if (!t.client)
      throw new Error(
        "Transaction contains MVR names but no client was provided to resolve them. Please pass a client to Transaction#build()",
      );
    (RI(
      e,
      await t.client.core.mvr.resolve({ types: i.types, packages: i.packages }),
    ),
      await n());
  };
}
function Qd(e, t = 1 / 0) {
  const n = {
      $kind: "Result",
      get Result() {
        return typeof e == "function" ? e() : e;
      },
    },
    i = [],
    o = (l) =>
      (i[l] ??= {
        $kind: "NestedResult",
        get NestedResult() {
          return [typeof e == "function" ? e() : e, l];
        },
      });
  return new Proxy(n, {
    set() {
      throw new Error(
        "The transaction result is a proxy, and does not support setting properties directly",
      );
    },
    get(l, u) {
      if (u in l) return Reflect.get(l, u);
      if (u === Symbol.iterator)
        return function* () {
          let f = 0;
          for (; f < t; ) (yield o(f), f++);
        };
      if (typeof u == "symbol") return;
      const d = parseInt(u, 10);
      if (!(Number.isNaN(d) || d < 0)) return o(d);
    },
  });
}
const G0 = Symbol.for("@mysten/transaction");
function q0(e) {
  return !!e && typeof e == "object" && e[G0] === !0;
}
var zo = class Il {
  #e;
  #t;
  #n = new Map();
  #s = [];
  #i = [];
  #l = new Set();
  #a = new Set();
  #u = new Map();
  static fromKind(t) {
    const n = new Il();
    return (
      (n.#r = Dn.fromKindBytes(typeof t == "string" ? rt(t) : t)),
      (n.#s = n.#r.inputs.slice()),
      (n.#i = n.#r.commands.slice()),
      (n.#l = new Set(n.#i.map((i, o) => o))),
      n
    );
  }
  static from(t) {
    const n = new Il();
    if (
      (q0(t)
        ? (n.#r = Dn.restore(t.getData()))
        : typeof t != "string" || !t.startsWith("{")
          ? (n.#r = Dn.fromBytes(typeof t == "string" ? rt(t) : t))
          : (n.#r = Dn.restore(JSON.parse(t))),
      (n.#s = n.#r.inputs.slice()),
      (n.#i = n.#r.commands.slice()),
      (n.#l = new Set(n.#i.map((i, o) => o))),
      !n.isPreparedForSerialization({ supportedIntents: [Ao] }))
    )
      throw new Error(
        "Transaction has unresolved intents or async thunks. Call `prepareForSerialization` before copying.",
      );
    return (
      n.#r.commands.some((i) => i.$Intent?.name === Ao) &&
        n.addIntentResolver(Ao, XT),
      n
    );
  }
  addSerializationPlugin(t) {
    this.#e.push(t);
  }
  addBuildPlugin(t) {
    this.#t.push(t);
  }
  addIntentResolver(t, n) {
    if (this.#n.has(t) && this.#n.get(t) !== n)
      throw new Error(`Intent resolver for ${t} already exists`);
    this.#n.set(t, n);
  }
  setSender(t) {
    this.#r.sender = t;
  }
  setSenderIfNotSet(t) {
    this.#r.sender || (this.#r.sender = t);
  }
  setExpiration(t) {
    this.#r.expiration = t ? Pe(z0, t) : null;
  }
  setGasPrice(t) {
    this.#r.gasData.price = String(t);
  }
  setGasBudget(t) {
    this.#r.gasData.budget = String(t);
  }
  setGasBudgetIfNotSet(t) {
    this.#r.gasData.budget == null && (this.#r.gasData.budget = String(t));
  }
  setGasOwner(t) {
    this.#r.gasData.owner = t;
  }
  setGasPayment(t) {
    this.#r.gasData.payment = t.map((n) => Pe(Ur, n));
  }
  #r;
  getData() {
    return this.#r.snapshot();
  }
  get [G0]() {
    return !0;
  }
  get pure() {
    return (
      Object.defineProperty(this, "pure", {
        enumerable: !1,
        value: kI((t) =>
          yf(t)
            ? this.#f("pure", { $kind: "Pure", Pure: { bytes: t.toBase64() } })
            : this.#f(
                "pure",
                vf(My, t)
                  ? Pe(My, t)
                  : t instanceof Uint8Array
                    ? It.Pure(t)
                    : { $kind: "UnresolvedPure", UnresolvedPure: { value: t } },
              ),
        ),
      }),
      this.pure
    );
  }
  constructor() {
    ((this.object = CI((t) => {
      if (typeof t == "function") return this.object(this.add(t));
      if (typeof t == "object" && vf($e, t)) return t;
      const n = Yl(t),
        i = this.#r.inputs.find((o) => n === Yl(o));
      return (
        i?.Object?.SharedObject &&
          typeof t == "object" &&
          t.Object?.SharedObject &&
          (i.Object.SharedObject.mutable =
            i.Object.SharedObject.mutable || t.Object.SharedObject.mutable),
        i
          ? { $kind: "Input", Input: this.#r.inputs.indexOf(i), type: "object" }
          : this.#f(
              "object",
              typeof t == "string"
                ? {
                    $kind: "UnresolvedObject",
                    UnresolvedObject: { objectId: Ee(t) },
                  }
                : t,
            )
      );
    })),
      (this.#r = new Dn()),
      (this.#t = []),
      (this.#e = []));
  }
  get gas() {
    return { $kind: "GasCoin", GasCoin: !0 };
  }
  objectRef(...t) {
    return this.object(It.ObjectRef(...t));
  }
  receivingRef(...t) {
    return this.object(It.ReceivingRef(...t));
  }
  sharedObjectRef(...t) {
    return this.object(It.SharedObjectRef(...t));
  }
  #c() {
    const t = new Il();
    return (
      (t.#r = this.#r),
      (t.#e = this.#e),
      (t.#t = this.#t),
      (t.#n = this.#n),
      (t.#a = this.#a),
      (t.#l = new Set(this.#l)),
      (t.#u = this.#u),
      this.#s.push(t.#s),
      this.#i.push(t.#i),
      t
    );
  }
  add(t) {
    if (typeof t == "function") {
      if (this.#u.has(t)) return this.#u.get(t);
      const n = this.#c(),
        i = t(n);
      if (!(i && typeof i == "object" && "then" in i))
        return ((this.#l = n.#l), this.#u.set(t, i), i);
      const o = this.#o({
        $kind: "$Intent",
        $Intent: {
          name: "AsyncTransactionThunk",
          inputs: {},
          data: { resultIndex: this.#r.commands.length, result: null },
        },
      });
      this.#a.add(
        Promise.resolve(i).then((u) => {
          o.$Intent.data.result = u;
        }),
      );
      const l = Qd(() => o.$Intent.data.resultIndex);
      return (this.#u.set(t, l), l);
    } else this.#o(t);
    return Qd(this.#r.commands.length - 1);
  }
  #o(t) {
    const n = this.#r.commands.length;
    return (
      this.#i.push(t),
      this.#l.add(n),
      this.#r.commands.push(t),
      this.#r.mapCommandArguments(n, (i) => {
        if (i.$kind === "Result" && !this.#l.has(i.Result))
          throw new Error(
            `Result { Result: ${i.Result} } is not available to use in the current transaction`,
          );
        if (i.$kind === "NestedResult" && !this.#l.has(i.NestedResult[0]))
          throw new Error(
            `Result { NestedResult: [${i.NestedResult[0]}, ${i.NestedResult[1]}] } is not available to use in the current transaction`,
          );
        if (i.$kind === "Input" && i.Input >= this.#r.inputs.length)
          throw new Error(
            `Input { Input: ${i.Input} } references an input that does not exist in the current transaction`,
          );
        return i;
      }),
      t
    );
  }
  #f(t, n) {
    return (this.#s.push(n), this.#r.addInput(t, n));
  }
  #p(t) {
    return yf(t) ? this.pure(t) : this.#d(t);
  }
  #d(t) {
    if (typeof t == "function") {
      const n = this.add(t);
      return typeof n == "function" ? this.#d(n) : Pe($e, n);
    }
    return Pe($e, t);
  }
  splitCoins(t, n) {
    const i = qt.SplitCoins(
      typeof t == "string" ? this.object(t) : this.#d(t),
      n.map((o) =>
        typeof o == "number" || typeof o == "bigint" || typeof o == "string"
          ? this.pure.u64(o)
          : this.#p(o),
      ),
    );
    return (this.#o(i), Qd(this.#r.commands.length - 1, n.length));
  }
  mergeCoins(t, n) {
    return this.add(
      qt.MergeCoins(
        this.object(t),
        n.map((i) => this.object(i)),
      ),
    );
  }
  publish({ modules: t, dependencies: n }) {
    return this.add(qt.Publish({ modules: t, dependencies: n }));
  }
  upgrade({ modules: t, dependencies: n, package: i, ticket: o }) {
    return this.add(
      qt.Upgrade({
        modules: t,
        dependencies: n,
        package: i,
        ticket: this.object(o),
      }),
    );
  }
  moveCall({ arguments: t, ...n }) {
    return this.add(
      qt.MoveCall({ ...n, arguments: t?.map((i) => this.#p(i)) }),
    );
  }
  transferObjects(t, n) {
    return this.add(
      qt.TransferObjects(
        t.map((i) => this.object(i)),
        typeof n == "string" ? this.pure.address(n) : this.#p(n),
      ),
    );
  }
  makeMoveVec({ type: t, elements: n }) {
    return this.add(
      qt.MakeMoveVec({ type: t, elements: n.map((i) => this.object(i)) }),
    );
  }
  withdrawal({ amount: t, type: n }) {
    const i = {
      $kind: "FundsWithdrawal",
      FundsWithdrawal: {
        reservation: { $kind: "MaxAmountU64", MaxAmountU64: String(t) },
        typeArg: { $kind: "Balance", Balance: n ?? "0x2::sui::SUI" },
        withdrawFrom: { $kind: "Sender", Sender: !0 },
      },
    };
    return this.#f("object", i);
  }
  serialize() {
    return JSON.stringify(HT(this.#r.snapshot()));
  }
  async toJSON(t = {}) {
    await this.prepareForSerialization(t);
    const n = this.isFullyResolved();
    return JSON.stringify(
      Pe(
        iI,
        n
          ? { ...this.#r.snapshot(), digest: this.#r.getDigest() }
          : this.#r.snapshot(),
      ),
      (i, o) => (typeof o == "bigint" ? o.toString() : o),
      2,
    );
  }
  async sign(t) {
    const { signer: n, ...i } = t,
      o = await this.build(i);
    return n.signTransaction(o);
  }
  isPreparedForSerialization(t = {}) {
    return !(
      this.#a.size > 0 ||
      this.#r.commands.some(
        (n) => n.$Intent && !t.supportedIntents?.includes(n.$Intent.name),
      )
    );
  }
  isFullyResolved() {
    return !(
      !this.isPreparedForSerialization() ||
      !this.#r.sender ||
      W0(this.#r, {})
    );
  }
  async build(t = {}) {
    return (
      await this.prepareForSerialization(t),
      await this.#m(t),
      this.#r.build({ onlyTransactionKind: t.onlyTransactionKind })
    );
  }
  async getDigest(t = {}) {
    return (
      await this.prepareForSerialization(t),
      await this.#m(t),
      this.#r.getDigest()
    );
  }
  async #m(t) {
    if (!t.onlyTransactionKind && !this.#r.sender)
      throw new Error("Missing transaction sender");
    await this.#y([...this.#t, SI], t);
  }
  async #y(t, n) {
    try {
      const i = (o) => {
        if (o >= t.length) return () => {};
        const l = t[o];
        return async () => {
          const u = i(o + 1);
          let d = !1,
            f = !1;
          if (
            (await l(this.#r, n, async () => {
              if (d)
                throw new Error(
                  `next() was call multiple times in TransactionPlugin ${o}`,
                );
              ((d = !0), await u(), (f = !0));
            }),
            !d)
          )
            throw new Error(`next() was not called in TransactionPlugin ${o}`);
          if (!f)
            throw new Error(`next() was not awaited in TransactionPlugin ${o}`);
        };
      };
      await i(0)();
    } finally {
      ((this.#s = this.#r.inputs.slice()),
        (this.#i = this.#r.commands.slice()),
        (this.#l = new Set(this.#i.map((i, o) => o))));
    }
  }
  async #h() {
    for (; this.#a.size > 0; ) {
      const t = Promise.all(this.#a);
      (this.#a.clear(), this.#a.add(t), await t, this.#a.delete(t));
    }
  }
  #w() {
    const t = this.#r.commands,
      n = this.#r.inputs,
      i = this.#i.flat(1 / 0),
      o = this.#s.flat(1 / 0);
    if (i.length !== t.length)
      throw new Error(
        "Unexpected number of commands found in transaction data",
      );
    if (o.length !== n.length)
      throw new Error("Unexpected number of inputs found in transaction data");
    const l = i.filter((d) => d.$Intent?.name !== "AsyncTransactionThunk");
    ((this.#r.commands = l),
      (this.#r.inputs = o),
      (this.#i = l),
      (this.#s = o),
      (this.#l = new Set(l.map((d, f) => f))));
    function u(d) {
      const f = t[d];
      if (f.$Intent?.name === "AsyncTransactionThunk") {
        const g = f.$Intent.data.result;
        if (g == null)
          throw new Error("AsyncTransactionThunk has not been resolved");
        return u(g.Result);
      }
      const m = l.indexOf(f);
      if (m === -1)
        throw new Error("Unable to find original index for command");
      return m;
    }
    this.#r.mapArguments((d) => {
      if (d.$kind === "Input") {
        const f = o.indexOf(n[d.Input]);
        if (f === -1) throw new Error("Input has not been resolved");
        return { ...d, Input: f };
      } else if (d.$kind === "Result") {
        const f = u(d.Result);
        return { ...d, Result: f };
      } else if (d.$kind === "NestedResult") {
        const f = u(d.NestedResult[0]);
        return { ...d, NestedResult: [f, d.NestedResult[1]] };
      }
      return d;
    });
    for (const [d, f] of t.entries())
      if (f.$Intent?.name === "AsyncTransactionThunk")
        try {
          f.$Intent.data.resultIndex = u(d);
        } catch {}
  }
  async prepareForSerialization(t) {
    (await this.#h(), this.#w());
    const n = new Set();
    for (const o of this.#r.commands) o.$Intent && n.add(o.$Intent.name);
    const i = [...this.#e];
    for (const o of n)
      if (!t.supportedIntents?.includes(o)) {
        if (!this.#n.has(o))
          throw new Error(`Missing intent resolver for ${o}`);
        i.push(this.#n.get(o));
      }
    (i.push(_I()), await this.#y(i, t));
  }
};
async function NI(e, t) {
  if (e.features["sui:signTransaction"])
    return e.features["sui:signTransaction"].signTransaction(t);
  if (!e.features["sui:signTransactionBlock"])
    throw new Error(
      `Provided wallet (${e.name}) does not support the signTransaction feature.`,
    );
  const { signTransactionBlock: n } = e.features["sui:signTransactionBlock"],
    { transactionBlockBytes: i, signature: o } = await n({
      transactionBlock: zo.from(await t.transaction.toJSON()),
      account: t.account,
      chain: t.chain,
    });
  return { bytes: i, signature: o };
}
var PI = function (e, t, n, i) {
    if (n === "a" && !i)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof t == "function" ? e !== t || !i : !t.has(e))
      throw new TypeError(
        "Cannot read private member from an object whose class did not declare it",
      );
    return n === "m" ? i : n === "a" ? i.call(e) : i ? i.value : t.get(e);
  },
  DI = function (e, t, n, i, o) {
    if (i === "m") throw new TypeError("Private method is not writable");
    if (i === "a" && !o)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof t == "function" ? e !== t || !o : !t.has(e))
      throw new TypeError(
        "Cannot write private member to an object whose class did not declare it",
      );
    return (i === "a" ? o.call(e, n) : o ? (o.value = n) : t.set(e, n), n);
  },
  Ml;
let So;
const yu = new Set();
function LI(e) {
  ((jo = void 0), yu.add(e));
}
function BI(e) {
  ((jo = void 0), yu.delete(e));
}
const hi = {};
function vu() {
  if (
    So ||
    ((So = Object.freeze({ register: Ly, get: $I, on: zI })),
    typeof window > "u")
  )
    return So;
  const e = Object.freeze({ register: Ly });
  try {
    window.addEventListener(
      "wallet-standard:register-wallet",
      ({ detail: t }) => t(e),
    );
  } catch (t) {
    console.error(
      `wallet-standard:register-wallet event listener could not be added
`,
      t,
    );
  }
  try {
    window.dispatchEvent(new FI(e));
  } catch (t) {
    console.error(
      `wallet-standard:app-ready event could not be dispatched
`,
      t,
    );
  }
  return So;
}
function Ly(...e) {
  return (
    (e = e.filter((t) => !yu.has(t))),
    e.length
      ? (e.forEach((t) => LI(t)),
        hi.register?.forEach((t) => By(() => t(...e))),
        function () {
          (e.forEach((n) => BI(n)),
            hi.unregister?.forEach((n) => By(() => n(...e))));
        })
      : () => {}
  );
}
let jo;
function $I() {
  return (jo || (jo = [...yu]), jo);
}
function zI(e, t) {
  return (
    hi[e]?.push(t) || (hi[e] = [t]),
    function () {
      hi[e] = hi[e]?.filter((i) => t !== i);
    }
  );
}
function By(e) {
  try {
    e();
  } catch (t) {
    console.error(t);
  }
}
class FI extends Event {
  get detail() {
    return PI(this, Ml, "f");
  }
  get type() {
    return "wallet-standard:app-ready";
  }
  constructor(t) {
    (super("wallet-standard:app-ready", {
      bubbles: !1,
      cancelable: !1,
      composed: !1,
    }),
      Ml.set(this, void 0),
      DI(this, Ml, t, "f"));
  }
  preventDefault() {
    throw new Error("preventDefault cannot be called");
  }
  stopImmediatePropagation() {
    throw new Error("stopImmediatePropagation cannot be called");
  }
  stopPropagation() {
    throw new Error("stopPropagation cannot be called");
  }
}
Ml = new WeakMap();
const UI = "standard:connect",
  VI = "standard:events";
var ii = function (e, t, n, i) {
    if (n === "a" && !i)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof t == "function" ? e !== t || !i : !t.has(e))
      throw new TypeError(
        "Cannot read private member from an object whose class did not declare it",
      );
    return n === "m" ? i : n === "a" ? i.call(e) : i ? i.value : t.get(e);
  },
  oi = function (e, t, n, i, o) {
    if (i === "m") throw new TypeError("Private method is not writable");
    if (i === "a" && !o)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof t == "function" ? e !== t || !o : !t.has(e))
      throw new TypeError(
        "Cannot write private member to an object whose class did not declare it",
      );
    return (i === "a" ? o.call(e, n) : o ? (o.value = n) : t.set(e, n), n);
  },
  Al,
  jl,
  Rl,
  _l,
  Nl,
  Pl;
class wu {
  get address() {
    return ii(this, Al, "f");
  }
  get publicKey() {
    return ii(this, jl, "f").slice();
  }
  get chains() {
    return ii(this, Rl, "f").slice();
  }
  get features() {
    return ii(this, _l, "f").slice();
  }
  get label() {
    return ii(this, Nl, "f");
  }
  get icon() {
    return ii(this, Pl, "f");
  }
  constructor(t) {
    (Al.set(this, void 0),
      jl.set(this, void 0),
      Rl.set(this, void 0),
      _l.set(this, void 0),
      Nl.set(this, void 0),
      Pl.set(this, void 0),
      new.target === wu && Object.freeze(this),
      oi(this, Al, t.address, "f"),
      oi(this, jl, t.publicKey.slice(), "f"),
      oi(this, Rl, t.chains.slice(), "f"),
      oi(this, _l, t.features.slice(), "f"),
      oi(this, Nl, t.label, "f"),
      oi(this, Pl, t.icon, "f"));
  }
}
((Al = new WeakMap()),
  (jl = new WeakMap()),
  (Rl = new WeakMap()),
  (_l = new WeakMap()),
  (Nl = new WeakMap()),
  (Pl = new WeakMap()));
const WI = [UI, VI];
function HI(e, t = []) {
  return [...WI, ...t].every((n) => n in e.features);
}
const KI = "sui:devnet",
  GI = "sui:testnet",
  qI = "sui:localnet",
  QI = "sui:mainnet",
  mh = [KI, GI, qI, QI];
new TextEncoder();
const Cf = new TextDecoder();
function YI(e) {
  if (Uint8Array.fromBase64) return Uint8Array.fromBase64(e);
  const t = atob(e),
    n = new Uint8Array(t.length);
  for (let i = 0; i < t.length; i++) n[i] = t.charCodeAt(i);
  return n;
}
function XI(e) {
  if (Uint8Array.fromBase64)
    return Uint8Array.fromBase64(typeof e == "string" ? e : Cf.decode(e), {
      alphabet: "base64url",
    });
  let t = e;
  (t instanceof Uint8Array && (t = Cf.decode(t)),
    (t = t.replace(/-/g, "+").replace(/_/g, "/")));
  try {
    return YI(t);
  } catch {
    throw new TypeError("The input to be decoded is not correctly encoded.");
  }
}
class ZI extends Error {
  static code = "ERR_JOSE_GENERIC";
  code = "ERR_JOSE_GENERIC";
  constructor(t, n) {
    (super(t, n),
      (this.name = this.constructor.name),
      Error.captureStackTrace?.(this, this.constructor));
  }
}
class is extends ZI {
  static code = "ERR_JWT_INVALID";
  code = "ERR_JWT_INVALID";
}
const JI = (e) => typeof e == "object" && e !== null;
function eM(e) {
  if (!JI(e) || Object.prototype.toString.call(e) !== "[object Object]")
    return !1;
  if (Object.getPrototypeOf(e) === null) return !0;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; ) t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t;
}
function tM(e) {
  if (typeof e != "string")
    throw new is(
      "JWTs must use Compact JWS serialization, JWT must be a string",
    );
  const { 1: t, length: n } = e.split(".");
  if (n === 5)
    throw new is("Only JWTs using Compact JWS serialization can be decoded");
  if (n !== 3) throw new is("Invalid JWT");
  if (!t) throw new is("JWTs must contain a payload");
  let i;
  try {
    i = XI(t);
  } catch {
    throw new is("Failed to base64url decode the payload");
  }
  let o;
  try {
    o = JSON.parse(Cf.decode(i));
  } catch {
    throw new is("Failed to parse the decoded payload as JSON");
  }
  if (!eM(o)) throw new is("Invalid JWT Claims Set");
  return o;
}
const nM = re({ address: ge(), publicKey: ge() }),
  rM = re({
    exp: Et(),
    iat: Et(),
    iss: ge(),
    aud: ge(),
    payload: re({ accounts: Ie(nM) }),
  });
function sM(e) {
  const t = tM(e);
  return Pe(rM, t);
}
const iM = ph("type", [
    re({ type: ke("connect"), session: ge("`session` is required") }),
    re({ type: ke("sign-transaction"), bytes: ge(), signature: ge() }),
    re({
      type: ke("sign-and-execute-transaction"),
      bytes: ge(),
      signature: ge(),
      digest: ge(),
      effects: ge(),
    }),
    re({ type: ke("sign-personal-message"), bytes: ge(), signature: ge() }),
  ]),
  oM = ph("type", [
    re({ type: ke("reject"), reason: Ft(ge("`reason` must be a string")) }),
    re({ type: ke("resolve"), data: iM }),
  ]),
  aM = re({
    id: ht(ge(), D0()),
    source: ke("web-wallet-channel"),
    payload: oM,
    version: ke("1"),
  });
function lM() {
  return {
    version: "1",
    originUrl: window.location.href,
    userAgent: navigator.userAgent,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    language: navigator.language,
    platform: navigator.platform,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timestamp: Date.now(),
  };
}
var uM = class {
  #e;
  #t = "1";
  #n;
  #s;
  #i;
  #l;
  #a;
  #u;
  #r;
  #c;
  #o = null;
  #f = !1;
  constructor({
    appName: e,
    hostOrigin: t,
    hostPathname: n = "dapp-request",
    extraRequestOptions: i,
    popupWindow: o,
  }) {
    const l = o ?? window.open("about:blank", "_blank");
    if (!l) throw new Error("Failed to open new window");
    ((this.#n = crypto.randomUUID()),
      (this.#e = l),
      (this.#s = t),
      (this.#i = n),
      (this.#l = e));
    const { promise: u, resolve: d, reject: f } = Uk();
    ((this.#u = u),
      (this.#r = d),
      (this.#c = f),
      (this.#a = i),
      (this.#o = setInterval(() => {
        try {
          this.#e.closed &&
            (this.#d(), f(new Error("User closed the wallet window")));
        } catch {}
      }, 1e3)));
  }
  send({ type: e, ...t }) {
    if (this.#e.closed) throw new Error("User closed the wallet window");
    if (this.#f) throw new Error("send() can only be called once");
    ((this.#f = !0), window.addEventListener("message", this.#p));
    const n = {
        version: this.#t,
        requestId: this.#n,
        appUrl: window.location.href.split("#")[0],
        appName: this.#l,
        payload: { type: e, ...t },
        metadata: lM(),
        extraRequestOptions: this.#a,
      },
      i = encodeURIComponent(btoa(JSON.stringify(n)));
    return (this.#e.location.assign(`${this.#s}/${this.#i}#${i}`), this.#u);
  }
  close() {
    (this.#d(), this.#e.close());
  }
  #p = (e) => {
    if (e.origin !== this.#s) return;
    const { success: t, output: n } = RT(aM, e.data);
    !t ||
      n.id !== this.#n ||
      (this.#d(),
      n.payload.type === "reject"
        ? this.#c(new Error("User rejected the request"))
        : n.payload.type === "resolve" && this.#r(n.payload.data));
  };
  #d() {
    (this.#o && (clearInterval(this.#o), (this.#o = null)),
      window.removeEventListener("message", this.#p));
  }
};
const cM = "https://my.slush.app",
  gh = "slush:session",
  Q0 = "Slush",
  Y0 =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAgMjRDMCAxMC43NDUyIDEwLjc0NTIgMCAyNCAwQzM3LjI1NDggMCA0OCAxMC43NDUyIDQ4IDI0QzQ4IDM3LjI1NDggMzcuMjU0OCA0OCAyNCA0OEMxMC43NDUyIDQ4IDAgMzcuMjU0OCAwIDI0WiIgZmlsbD0iIzBDMEExRiIvPgo8cGF0aCBkPSJNMTMuMTM1OCAzMi4xMDg1QzE0LjE3MDEgMzUuOTY4MyAxOC4wMzMxIDM5LjQ2MjQgMjYuMDI1NSAzNy4zMjA4QzMzLjY1MTUgMzUuMjc3NCAzOC40MzA5IDI5LjAwNCAzNy4xOTE2IDI0LjM3ODlDMzYuNzYzNiAyMi43ODE3IDM1LjQ3NDYgMjEuNzAwNiAzMy40ODcyIDIxLjg3NjVMMTUuNzE2NSAyMy4zNTcyQzE0LjU5NzMgMjMuNDQzIDE0LjA4NDIgMjMuMjU5NiAxMy43ODgxIDIyLjU1NDNDMTMuNTAxIDIxLjg4MjMgMTMuNjY0NiAyMS4xNjA5IDE1LjAxNjMgMjAuNDc3N0wyOC41NDAxIDEzLjUzNzRDMjkuNTc2NyAxMy4wMSAzMC4yNjcxIDEyLjc4OTMgMzAuODk4IDEzLjAxMjZDMzEuMjkzNCAxMy4xNTYzIDMxLjU1MzggMTMuNzI4NCAzMS4zMTQ3IDE0LjQzNDRMMzAuNDM3OCAxNy4wMjMyQzI5LjM2MTcgMjAuMjAwMiAzMS42NjUzIDIwLjkzODIgMzIuOTY0MSAyMC41OTAyQzM0LjkyODkgMjAuMDYzNyAzNS4zOTExIDE4LjE5MjMgMzQuNzU4MSAxNS44Mjk5QzMzLjE1MzMgOS44NDA1NCAyNi43OTkgOC45MDQxMSAyMS4wMzc4IDEwLjQ0NzhDMTUuMTc2NyAxMi4wMTgzIDEwLjA5NiAxNi43Njc2IDExLjY0NzQgMjIuNTU3M0MxMi4wMTI5IDIzLjkyMTYgMTMuMjY4NyAyNS4wMTE2IDE0LjcyMzIgMjQuOTc4NUwxNi45NDM4IDI0Ljk3MzFDMTcuNDAwNCAyNC45NjI1IDE3LjIzNiAyNSAxOC4xMTcgMjQuOTI3MUMxOC45OTggMjQuODU0MSAyMS4zNTA5IDI0LjU2NDYgMjEuMzUwOSAyNC41NjQ2TDMyLjg5NjIgMjMuMjU4TDMzLjE5MzcgMjMuMjE0OEMzMy44Njg5IDIzLjA5OTcgMzQuMzc5MiAyMy4yNzUgMzQuODEwNiAyNC4wMTgzQzM1LjQ1NjMgMjUuMTMwNCAzNC40NzEyIDI1Ljk2OTEgMzMuMjkyIDI2Ljk3MzFDMzMuMjYwNSAyNyAzMy4yMjg4IDI3LjAyNyAzMy4xOTcgMjcuMDU0MUwyMy4wNDgyIDM1LjgwMDVDMjEuMzA4NyAzNy4zMDA4IDIwLjA4NjcgMzYuNzM2NyAxOS42NTg4IDM1LjEzOTVMMTguMTQzMSAyOS40ODI5QzE3Ljc2ODcgMjguMDg1NCAxNi40MDQxIDI2Ljk4ODkgMTQuODA1NiAyNy40MTcyQzEyLjgwNzUgMjcuOTUyNiAxMi42NDU1IDMwLjI3ODQgMTMuMTM1OCAzMi4xMDg1WiIgZmlsbD0iI0ZCRkFGRiIvPgo8L3N2Zz4K",
  $y = "com.mystenlabs.suiwallet",
  dM = "https://api.slush.app/api/wallet/metadata",
  fM = {
    id: "com.mystenlabs.suiwallet.web",
    walletName: "Slush",
    description: "Trade and earn on Sui.",
    icon: Y0,
    enabled: !0,
  },
  hM = re({
    id: ge("Wallet ID is required"),
    walletName: ge("Wallet name is required"),
    icon: ge("Icon must be a valid wallet icon format"),
    enabled: bs("Enabled is required"),
  });
function pM(e) {
  localStorage.setItem(gh, e);
}
function Eo() {
  const e = localStorage.getItem(gh);
  if (!e) throw new Error("No session found");
  return e;
}
const mM = [
  "sui:signTransaction",
  "sui:signAndExecuteTransaction",
  "sui:signPersonalMessage",
  "sui:signTransactionBlock",
  "sui:signAndExecuteTransactionBlock",
];
function zy(e) {
  const { payload: t } = sM(e);
  return t.accounts.map(
    (n) =>
      new wu({
        address: n.address,
        chains: mh,
        features: mM,
        publicKey: rt(n.publicKey),
      }),
  );
}
var gM = class {
  #e;
  #t;
  #n;
  #s;
  #i;
  #l;
  #a;
  get name() {
    return this.#i;
  }
  get id() {
    return this.#e;
  }
  get icon() {
    return this.#l;
  }
  get version() {
    return "1.0.0";
  }
  get chains() {
    return mh;
  }
  get accounts() {
    return this.#n;
  }
  get features() {
    return {
      "standard:connect": { version: "1.0.0", connect: this.#d },
      "standard:disconnect": { version: "1.0.0", disconnect: this.#y },
      "standard:events": { version: "1.0.0", on: this.#f },
      "sui:signTransactionBlock": {
        version: "1.0.0",
        signTransactionBlock: this.#u,
      },
      "sui:signTransaction": { version: "2.0.0", signTransaction: this.#r },
      "sui:signPersonalMessage": {
        version: "1.1.0",
        signPersonalMessage: this.#o,
      },
      "sui:signAndExecuteTransaction": {
        version: "2.0.0",
        signAndExecuteTransaction: this.#c,
      },
    };
  }
  constructor({ name: e, origin: t, metadata: n }) {
    ((this.#e = n.id),
      (this.#n = this.#m()),
      (this.#t = Xk()),
      (this.#s = t || cM),
      (this.#a = e),
      (this.#i = n.walletName),
      (this.#l = n.icon));
  }
  #u = async ({ transactionBlock: e, account: t, chain: n }) => {
    const i = await e.toJSON(),
      o = await this.#h().send({
        type: "sign-transaction",
        transaction: i,
        address: t.address,
        chain: n,
        session: Eo(),
      });
    return { transactionBlockBytes: o.bytes, signature: o.signature };
  };
  #r = async ({ transaction: e, account: t, chain: n }) => {
    const i = this.#h(),
      o = await e.toJSON(),
      l = await i.send({
        type: "sign-transaction",
        transaction: o,
        address: t.address,
        chain: n,
        session: Eo(),
      });
    return { bytes: l.bytes, signature: l.signature };
  };
  #c = async ({ transaction: e, account: t, chain: n }) => {
    const i = this.#h(),
      o = await e.toJSON(),
      l = await i.send({
        type: "sign-and-execute-transaction",
        transaction: o,
        address: t.address,
        chain: n,
        session: Eo(),
      });
    return {
      bytes: l.bytes,
      signature: l.signature,
      digest: l.digest,
      effects: l.effects,
    };
  };
  #o = async ({ message: e, account: t, chain: n }) => {
    const i = await this.#h().send({
      type: "sign-personal-message",
      message: ze(e),
      address: t.address,
      chain: n ?? t.chains[0],
      session: Eo(),
    });
    return { bytes: i.bytes, signature: i.signature };
  };
  #f = (e, t) => (this.#t.on(e, t), () => this.#t.off(e, t));
  #p(e) {
    ((this.#n = e), this.#t.emit("change", { accounts: this.accounts }));
  }
  #d = async (e) => {
    if (e?.silent) return { accounts: this.accounts };
    const t = await this.#h().send({ type: "connect" });
    return (pM(t.session), this.#p(zy(t.session)), { accounts: this.accounts });
  };
  #m() {
    try {
      return zy(Eo());
    } catch {
      return [];
    }
  }
  #y = async () => {
    (localStorage.removeItem(gh), this.#p([]));
  };
  #h() {
    return new uM({ appName: this.#a, hostOrigin: this.#s });
  }
  updateMetadata(e) {
    ((this.#e = e.id), (this.#i = e.walletName), (this.#l = e.icon));
  }
};
async function yM(e) {
  const t = await fetch(e);
  if (!t.ok) throw new Error("Failed to fetch wallet metadata");
  return Pe(hM, await t.json());
}
function vM(e, { origin: t, metadataApiUrl: n = dM } = {}) {
  const i = vu();
  let o = null;
  if (
    (i.on("register", (u) => {
      u.id === $y && o?.();
    }),
    i.get().find((u) => u.id === $y))
  )
    return;
  const l = new gM({ name: e, origin: t, metadata: fM });
  return (
    (o = i.register(l)),
    yM(n)
      .then((u) => {
        if (!u.enabled) {
          (console.log("Slush wallet is not currently enabled."), o?.());
          return;
        }
        l.updateMetadata(u);
      })
      .catch((u) => {
        console.error("Error fetching metadata", u);
      }),
    { wallet: l, unregister: o }
  );
}
var Mi = class {
    constructor() {
      ((this.listeners = new Set()),
        (this.subscribe = this.subscribe.bind(this)));
    }
    subscribe(e) {
      return (
        this.listeners.add(e),
        this.onSubscribe(),
        () => {
          (this.listeners.delete(e), this.onUnsubscribe());
        }
      );
    }
    hasListeners() {
      return this.listeners.size > 0;
    }
    onSubscribe() {}
    onUnsubscribe() {}
  },
  wM = {
    setTimeout: (e, t) => setTimeout(e, t),
    clearTimeout: (e) => clearTimeout(e),
    setInterval: (e, t) => setInterval(e, t),
    clearInterval: (e) => clearInterval(e),
  },
  bM = class {
    #e = wM;
    #t = !1;
    setTimeoutProvider(e) {
      this.#e = e;
    }
    setTimeout(e, t) {
      return this.#e.setTimeout(e, t);
    }
    clearTimeout(e) {
      this.#e.clearTimeout(e);
    }
    setInterval(e, t) {
      return this.#e.setInterval(e, t);
    }
    clearInterval(e) {
      this.#e.clearInterval(e);
    }
  },
  ms = new bM();
function SM(e) {
  setTimeout(e, 0);
}
var Es = typeof window > "u" || "Deno" in globalThis;
function Tt() {}
function EM(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function kf(e) {
  return typeof e == "number" && e >= 0 && e !== 1 / 0;
}
function X0(e, t) {
  return Math.max(e + (t || 0) - Date.now(), 0);
}
function Lr(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function an(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Fy(e, t) {
  const {
    type: n = "all",
    exact: i,
    fetchStatus: o,
    predicate: l,
    queryKey: u,
    stale: d,
  } = e;
  if (u) {
    if (i) {
      if (t.queryHash !== yh(u, t.options)) return !1;
    } else if (!Fo(t.queryKey, u)) return !1;
  }
  if (n !== "all") {
    const f = t.isActive();
    if ((n === "active" && !f) || (n === "inactive" && f)) return !1;
  }
  return !(
    (typeof d == "boolean" && t.isStale() !== d) ||
    (o && o !== t.state.fetchStatus) ||
    (l && !l(t))
  );
}
function Uy(e, t) {
  const { exact: n, status: i, predicate: o, mutationKey: l } = e;
  if (l) {
    if (!t.options.mutationKey) return !1;
    if (n) {
      if (xs(t.options.mutationKey) !== xs(l)) return !1;
    } else if (!Fo(t.options.mutationKey, l)) return !1;
  }
  return !((i && t.state.status !== i) || (o && !o(t)));
}
function yh(e, t) {
  return (t?.queryKeyHashFn || xs)(e);
}
function xs(e) {
  return JSON.stringify(e, (t, n) =>
    Of(n)
      ? Object.keys(n)
          .sort()
          .reduce((i, o) => ((i[o] = n[o]), i), {})
      : n,
  );
}
function Fo(e, t) {
  return e === t
    ? !0
    : typeof e != typeof t
      ? !1
      : e && t && typeof e == "object" && typeof t == "object"
        ? Object.keys(t).every((n) => Fo(e[n], t[n]))
        : !1;
}
var xM = Object.prototype.hasOwnProperty;
function Z0(e, t, n = 0) {
  if (e === t) return e;
  if (n > 500) return t;
  const i = Vy(e) && Vy(t);
  if (!i && !(Of(e) && Of(t))) return t;
  const l = (i ? e : Object.keys(e)).length,
    u = i ? t : Object.keys(t),
    d = u.length,
    f = i ? new Array(d) : {};
  let m = 0;
  for (let g = 0; g < d; g++) {
    const y = i ? g : u[g],
      v = e[y],
      C = t[y];
    if (v === C) {
      ((f[y] = v), (i ? g < l : xM.call(e, y)) && m++);
      continue;
    }
    if (
      v === null ||
      C === null ||
      typeof v != "object" ||
      typeof C != "object"
    ) {
      f[y] = C;
      continue;
    }
    const E = Z0(v, C, n + 1);
    ((f[y] = E), E === v && m++);
  }
  return l === d && m === l ? e : f;
}
function Xl(e, t) {
  if (!t || Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e) if (e[n] !== t[n]) return !1;
  return !0;
}
function Vy(e) {
  return Array.isArray(e) && e.length === Object.keys(e).length;
}
function Of(e) {
  if (!Wy(e)) return !1;
  const t = e.constructor;
  if (t === void 0) return !0;
  const n = t.prototype;
  return !(
    !Wy(n) ||
    !n.hasOwnProperty("isPrototypeOf") ||
    Object.getPrototypeOf(e) !== Object.prototype
  );
}
function Wy(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function CM(e) {
  return new Promise((t) => {
    ms.setTimeout(t, e);
  });
}
function Tf(e, t, n) {
  return typeof n.structuralSharing == "function"
    ? n.structuralSharing(e, t)
    : n.structuralSharing !== !1
      ? Z0(e, t)
      : t;
}
function kM(e, t, n = 0) {
  const i = [...e, t];
  return n && i.length > n ? i.slice(1) : i;
}
function OM(e, t, n = 0) {
  const i = [t, ...e];
  return n && i.length > n ? i.slice(0, -1) : i;
}
var vh = Symbol();
function J0(e, t) {
  return !e.queryFn && t?.initialPromise
    ? () => t.initialPromise
    : !e.queryFn || e.queryFn === vh
      ? () => Promise.reject(new Error(`Missing queryFn: '${e.queryHash}'`))
      : e.queryFn;
}
function wh(e, t) {
  return typeof e == "function" ? e(...t) : !!e;
}
function TM(e, t, n) {
  let i = !1,
    o;
  return (
    Object.defineProperty(e, "signal", {
      enumerable: !0,
      get: () => (
        (o ??= t()),
        i ||
          ((i = !0),
          o.aborted ? n() : o.addEventListener("abort", n, { once: !0 })),
        o
      ),
    }),
    e
  );
}
var IM = class extends Mi {
    #e;
    #t;
    #n;
    constructor() {
      (super(),
        (this.#n = (e) => {
          if (!Es && window.addEventListener) {
            const t = () => e();
            return (
              window.addEventListener("visibilitychange", t, !1),
              () => {
                window.removeEventListener("visibilitychange", t);
              }
            );
          }
        }));
    }
    onSubscribe() {
      this.#t || this.setEventListener(this.#n);
    }
    onUnsubscribe() {
      this.hasListeners() || (this.#t?.(), (this.#t = void 0));
    }
    setEventListener(e) {
      ((this.#n = e),
        this.#t?.(),
        (this.#t = e((t) => {
          typeof t == "boolean" ? this.setFocused(t) : this.onFocus();
        })));
    }
    setFocused(e) {
      this.#e !== e && ((this.#e = e), this.onFocus());
    }
    onFocus() {
      const e = this.isFocused();
      this.listeners.forEach((t) => {
        t(e);
      });
    }
    isFocused() {
      return typeof this.#e == "boolean"
        ? this.#e
        : globalThis.document?.visibilityState !== "hidden";
    }
  },
  bh = new IM();
function If() {
  let e, t;
  const n = new Promise((o, l) => {
    ((e = o), (t = l));
  });
  ((n.status = "pending"), n.catch(() => {}));
  function i(o) {
    (Object.assign(n, o), delete n.resolve, delete n.reject);
  }
  return (
    (n.resolve = (o) => {
      (i({ status: "fulfilled", value: o }), e(o));
    }),
    (n.reject = (o) => {
      (i({ status: "rejected", reason: o }), t(o));
    }),
    n
  );
}
var MM = SM;
function AM() {
  let e = [],
    t = 0,
    n = (d) => {
      d();
    },
    i = (d) => {
      d();
    },
    o = MM;
  const l = (d) => {
      t
        ? e.push(d)
        : o(() => {
            n(d);
          });
    },
    u = () => {
      const d = e;
      ((e = []),
        d.length &&
          o(() => {
            i(() => {
              d.forEach((f) => {
                n(f);
              });
            });
          }));
    };
  return {
    batch: (d) => {
      let f;
      t++;
      try {
        f = d();
      } finally {
        (t--, t || u());
      }
      return f;
    },
    batchCalls:
      (d) =>
      (...f) => {
        l(() => {
          d(...f);
        });
      },
    schedule: l,
    setNotifyFunction: (d) => {
      n = d;
    },
    setBatchNotifyFunction: (d) => {
      i = d;
    },
    setScheduler: (d) => {
      o = d;
    },
  };
}
var tt = AM(),
  jM = class extends Mi {
    #e = !0;
    #t;
    #n;
    constructor() {
      (super(),
        (this.#n = (e) => {
          if (!Es && window.addEventListener) {
            const t = () => e(!0),
              n = () => e(!1);
            return (
              window.addEventListener("online", t, !1),
              window.addEventListener("offline", n, !1),
              () => {
                (window.removeEventListener("online", t),
                  window.removeEventListener("offline", n));
              }
            );
          }
        }));
    }
    onSubscribe() {
      this.#t || this.setEventListener(this.#n);
    }
    onUnsubscribe() {
      this.hasListeners() || (this.#t?.(), (this.#t = void 0));
    }
    setEventListener(e) {
      ((this.#n = e), this.#t?.(), (this.#t = e(this.setOnline.bind(this))));
    }
    setOnline(e) {
      this.#e !== e &&
        ((this.#e = e),
        this.listeners.forEach((n) => {
          n(e);
        }));
    }
    isOnline() {
      return this.#e;
    }
  },
  Zl = new jM();
function RM(e) {
  return Math.min(1e3 * 2 ** e, 3e4);
}
function eb(e) {
  return (e ?? "online") === "online" ? Zl.isOnline() : !0;
}
var Mf = class extends Error {
  constructor(e) {
    (super("CancelledError"),
      (this.revert = e?.revert),
      (this.silent = e?.silent));
  }
};
function tb(e) {
  let t = !1,
    n = 0,
    i;
  const o = If(),
    l = () => o.status !== "pending",
    u = (S) => {
      if (!l()) {
        const k = new Mf(S);
        (v(k), e.onCancel?.(k));
      }
    },
    d = () => {
      t = !0;
    },
    f = () => {
      t = !1;
    },
    m = () =>
      bh.isFocused() &&
      (e.networkMode === "always" || Zl.isOnline()) &&
      e.canRun(),
    g = () => eb(e.networkMode) && e.canRun(),
    y = (S) => {
      l() || (i?.(), o.resolve(S));
    },
    v = (S) => {
      l() || (i?.(), o.reject(S));
    },
    C = () =>
      new Promise((S) => {
        ((i = (k) => {
          (l() || m()) && S(k);
        }),
          e.onPause?.());
      }).then(() => {
        ((i = void 0), l() || e.onContinue?.());
      }),
    E = () => {
      if (l()) return;
      let S;
      const k = n === 0 ? e.initialPromise : void 0;
      try {
        S = k ?? e.fn();
      } catch (x) {
        S = Promise.reject(x);
      }
      Promise.resolve(S)
        .then(y)
        .catch((x) => {
          if (l()) return;
          const M = e.retry ?? (Es ? 0 : 3),
            A = e.retryDelay ?? RM,
            R = typeof A == "function" ? A(n, x) : A,
            P =
              M === !0 ||
              (typeof M == "number" && n < M) ||
              (typeof M == "function" && M(n, x));
          if (t || !P) {
            v(x);
            return;
          }
          (n++,
            e.onFail?.(n, x),
            CM(R)
              .then(() => (m() ? void 0 : C()))
              .then(() => {
                t ? v(x) : E();
              }));
        });
    };
  return {
    promise: o,
    status: () => o.status,
    cancel: u,
    continue: () => (i?.(), o),
    cancelRetry: d,
    continueRetry: f,
    canStart: g,
    start: () => (g() ? E() : C().then(E), o),
  };
}
var nb = class {
    #e;
    destroy() {
      this.clearGcTimeout();
    }
    scheduleGc() {
      (this.clearGcTimeout(),
        kf(this.gcTime) &&
          (this.#e = ms.setTimeout(() => {
            this.optionalRemove();
          }, this.gcTime)));
    }
    updateGcTime(e) {
      this.gcTime = Math.max(this.gcTime || 0, e ?? (Es ? 1 / 0 : 300 * 1e3));
    }
    clearGcTimeout() {
      this.#e && (ms.clearTimeout(this.#e), (this.#e = void 0));
    }
  },
  _M = class extends nb {
    #e;
    #t;
    #n;
    #s;
    #i;
    #l;
    #a;
    constructor(e) {
      (super(),
        (this.#a = !1),
        (this.#l = e.defaultOptions),
        this.setOptions(e.options),
        (this.observers = []),
        (this.#s = e.client),
        (this.#n = this.#s.getQueryCache()),
        (this.queryKey = e.queryKey),
        (this.queryHash = e.queryHash),
        (this.#e = Ky(this.options)),
        (this.state = e.state ?? this.#e),
        this.scheduleGc());
    }
    get meta() {
      return this.options.meta;
    }
    get promise() {
      return this.#i?.promise;
    }
    setOptions(e) {
      if (
        ((this.options = { ...this.#l, ...e }),
        this.updateGcTime(this.options.gcTime),
        this.state && this.state.data === void 0)
      ) {
        const t = Ky(this.options);
        t.data !== void 0 &&
          (this.setState(Hy(t.data, t.dataUpdatedAt)), (this.#e = t));
      }
    }
    optionalRemove() {
      !this.observers.length &&
        this.state.fetchStatus === "idle" &&
        this.#n.remove(this);
    }
    setData(e, t) {
      const n = Tf(this.state.data, e, this.options);
      return (
        this.#u({
          data: n,
          type: "success",
          dataUpdatedAt: t?.updatedAt,
          manual: t?.manual,
        }),
        n
      );
    }
    setState(e, t) {
      this.#u({ type: "setState", state: e, setStateOptions: t });
    }
    cancel(e) {
      const t = this.#i?.promise;
      return (this.#i?.cancel(e), t ? t.then(Tt).catch(Tt) : Promise.resolve());
    }
    destroy() {
      (super.destroy(), this.cancel({ silent: !0 }));
    }
    reset() {
      (this.destroy(), this.setState(this.#e));
    }
    isActive() {
      return this.observers.some((e) => an(e.options.enabled, this) !== !1);
    }
    isDisabled() {
      return this.getObserversCount() > 0
        ? !this.isActive()
        : this.options.queryFn === vh ||
            this.state.dataUpdateCount + this.state.errorUpdateCount === 0;
    }
    isStatic() {
      return this.getObserversCount() > 0
        ? this.observers.some((e) => Lr(e.options.staleTime, this) === "static")
        : !1;
    }
    isStale() {
      return this.getObserversCount() > 0
        ? this.observers.some((e) => e.getCurrentResult().isStale)
        : this.state.data === void 0 || this.state.isInvalidated;
    }
    isStaleByTime(e = 0) {
      return this.state.data === void 0
        ? !0
        : e === "static"
          ? !1
          : this.state.isInvalidated
            ? !0
            : !X0(this.state.dataUpdatedAt, e);
    }
    onFocus() {
      (this.observers
        .find((t) => t.shouldFetchOnWindowFocus())
        ?.refetch({ cancelRefetch: !1 }),
        this.#i?.continue());
    }
    onOnline() {
      (this.observers
        .find((t) => t.shouldFetchOnReconnect())
        ?.refetch({ cancelRefetch: !1 }),
        this.#i?.continue());
    }
    addObserver(e) {
      this.observers.includes(e) ||
        (this.observers.push(e),
        this.clearGcTimeout(),
        this.#n.notify({ type: "observerAdded", query: this, observer: e }));
    }
    removeObserver(e) {
      this.observers.includes(e) &&
        ((this.observers = this.observers.filter((t) => t !== e)),
        this.observers.length ||
          (this.#i &&
            (this.#a ? this.#i.cancel({ revert: !0 }) : this.#i.cancelRetry()),
          this.scheduleGc()),
        this.#n.notify({ type: "observerRemoved", query: this, observer: e }));
    }
    getObserversCount() {
      return this.observers.length;
    }
    invalidate() {
      this.state.isInvalidated || this.#u({ type: "invalidate" });
    }
    async fetch(e, t) {
      if (
        this.state.fetchStatus !== "idle" &&
        this.#i?.status() !== "rejected"
      ) {
        if (this.state.data !== void 0 && t?.cancelRefetch)
          this.cancel({ silent: !0 });
        else if (this.#i) return (this.#i.continueRetry(), this.#i.promise);
      }
      if ((e && this.setOptions(e), !this.options.queryFn)) {
        const d = this.observers.find((f) => f.options.queryFn);
        d && this.setOptions(d.options);
      }
      const n = new AbortController(),
        i = (d) => {
          Object.defineProperty(d, "signal", {
            enumerable: !0,
            get: () => ((this.#a = !0), n.signal),
          });
        },
        o = () => {
          const d = J0(this.options, t),
            m = (() => {
              const g = {
                client: this.#s,
                queryKey: this.queryKey,
                meta: this.meta,
              };
              return (i(g), g);
            })();
          return (
            (this.#a = !1),
            this.options.persister ? this.options.persister(d, m, this) : d(m)
          );
        },
        u = (() => {
          const d = {
            fetchOptions: t,
            options: this.options,
            queryKey: this.queryKey,
            client: this.#s,
            state: this.state,
            fetchFn: o,
          };
          return (i(d), d);
        })();
      (this.options.behavior?.onFetch(u, this),
        (this.#t = this.state),
        (this.state.fetchStatus === "idle" ||
          this.state.fetchMeta !== u.fetchOptions?.meta) &&
          this.#u({ type: "fetch", meta: u.fetchOptions?.meta }),
        (this.#i = tb({
          initialPromise: t?.initialPromise,
          fn: u.fetchFn,
          onCancel: (d) => {
            (d instanceof Mf &&
              d.revert &&
              this.setState({ ...this.#t, fetchStatus: "idle" }),
              n.abort());
          },
          onFail: (d, f) => {
            this.#u({ type: "failed", failureCount: d, error: f });
          },
          onPause: () => {
            this.#u({ type: "pause" });
          },
          onContinue: () => {
            this.#u({ type: "continue" });
          },
          retry: u.options.retry,
          retryDelay: u.options.retryDelay,
          networkMode: u.options.networkMode,
          canRun: () => !0,
        })));
      try {
        const d = await this.#i.start();
        if (d === void 0)
          throw new Error(`${this.queryHash} data is undefined`);
        return (
          this.setData(d),
          this.#n.config.onSuccess?.(d, this),
          this.#n.config.onSettled?.(d, this.state.error, this),
          d
        );
      } catch (d) {
        if (d instanceof Mf) {
          if (d.silent) return this.#i.promise;
          if (d.revert) {
            if (this.state.data === void 0) throw d;
            return this.state.data;
          }
        }
        throw (
          this.#u({ type: "error", error: d }),
          this.#n.config.onError?.(d, this),
          this.#n.config.onSettled?.(this.state.data, d, this),
          d
        );
      } finally {
        this.scheduleGc();
      }
    }
    #u(e) {
      const t = (n) => {
        switch (e.type) {
          case "failed":
            return {
              ...n,
              fetchFailureCount: e.failureCount,
              fetchFailureReason: e.error,
            };
          case "pause":
            return { ...n, fetchStatus: "paused" };
          case "continue":
            return { ...n, fetchStatus: "fetching" };
          case "fetch":
            return {
              ...n,
              ...rb(n.data, this.options),
              fetchMeta: e.meta ?? null,
            };
          case "success":
            const i = {
              ...n,
              ...Hy(e.data, e.dataUpdatedAt),
              dataUpdateCount: n.dataUpdateCount + 1,
              ...(!e.manual && {
                fetchStatus: "idle",
                fetchFailureCount: 0,
                fetchFailureReason: null,
              }),
            };
            return ((this.#t = e.manual ? i : void 0), i);
          case "error":
            const o = e.error;
            return {
              ...n,
              error: o,
              errorUpdateCount: n.errorUpdateCount + 1,
              errorUpdatedAt: Date.now(),
              fetchFailureCount: n.fetchFailureCount + 1,
              fetchFailureReason: o,
              fetchStatus: "idle",
              status: "error",
              isInvalidated: !0,
            };
          case "invalidate":
            return { ...n, isInvalidated: !0 };
          case "setState":
            return { ...n, ...e.state };
        }
      };
      ((this.state = t(this.state)),
        tt.batch(() => {
          (this.observers.forEach((n) => {
            n.onQueryUpdate();
          }),
            this.#n.notify({ query: this, type: "updated", action: e }));
        }));
    }
  };
function rb(e, t) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: eb(t.networkMode) ? "fetching" : "paused",
    ...(e === void 0 && { error: null, status: "pending" }),
  };
}
function Hy(e, t) {
  return {
    data: e,
    dataUpdatedAt: t ?? Date.now(),
    error: null,
    isInvalidated: !1,
    status: "success",
  };
}
function Ky(e) {
  const t =
      typeof e.initialData == "function" ? e.initialData() : e.initialData,
    n = t !== void 0,
    i = n
      ? typeof e.initialDataUpdatedAt == "function"
        ? e.initialDataUpdatedAt()
        : e.initialDataUpdatedAt
      : 0;
  return {
    data: t,
    dataUpdateCount: 0,
    dataUpdatedAt: n ? (i ?? Date.now()) : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: !1,
    status: n ? "success" : "pending",
    fetchStatus: "idle",
  };
}
var NM = class extends Mi {
  constructor(e, t) {
    (super(),
      (this.options = t),
      (this.#e = e),
      (this.#u = null),
      (this.#a = If()),
      this.bindMethods(),
      this.setOptions(t));
  }
  #e;
  #t = void 0;
  #n = void 0;
  #s = void 0;
  #i;
  #l;
  #a;
  #u;
  #r;
  #c;
  #o;
  #f;
  #p;
  #d;
  #m = new Set();
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    this.listeners.size === 1 &&
      (this.#t.addObserver(this),
      Gy(this.#t, this.options) ? this.#y() : this.updateResult(),
      this.#b());
  }
  onUnsubscribe() {
    this.hasListeners() || this.destroy();
  }
  shouldFetchOnReconnect() {
    return Af(this.#t, this.options, this.options.refetchOnReconnect);
  }
  shouldFetchOnWindowFocus() {
    return Af(this.#t, this.options, this.options.refetchOnWindowFocus);
  }
  destroy() {
    ((this.listeners = new Set()),
      this.#E(),
      this.#C(),
      this.#t.removeObserver(this));
  }
  setOptions(e) {
    const t = this.options,
      n = this.#t;
    if (
      ((this.options = this.#e.defaultQueryOptions(e)),
      this.options.enabled !== void 0 &&
        typeof this.options.enabled != "boolean" &&
        typeof this.options.enabled != "function" &&
        typeof an(this.options.enabled, this.#t) != "boolean")
    )
      throw new Error(
        "Expected enabled to be a boolean or a callback that returns a boolean",
      );
    (this.#v(),
      this.#t.setOptions(this.options),
      t._defaulted &&
        !Xl(this.options, t) &&
        this.#e
          .getQueryCache()
          .notify({
            type: "observerOptionsUpdated",
            query: this.#t,
            observer: this,
          }));
    const i = this.hasListeners();
    (i && qy(this.#t, n, this.options, t) && this.#y(),
      this.updateResult(),
      i &&
        (this.#t !== n ||
          an(this.options.enabled, this.#t) !== an(t.enabled, this.#t) ||
          Lr(this.options.staleTime, this.#t) !== Lr(t.staleTime, this.#t)) &&
        this.#h());
    const o = this.#w();
    i &&
      (this.#t !== n ||
        an(this.options.enabled, this.#t) !== an(t.enabled, this.#t) ||
        o !== this.#d) &&
      this.#S(o);
  }
  getOptimisticResult(e) {
    const t = this.#e.getQueryCache().build(this.#e, e),
      n = this.createResult(t, e);
    return (
      DM(this, n) &&
        ((this.#s = n), (this.#l = this.options), (this.#i = this.#t.state)),
      n
    );
  }
  getCurrentResult() {
    return this.#s;
  }
  trackResult(e, t) {
    return new Proxy(e, {
      get: (n, i) => (
        this.trackProp(i),
        t?.(i),
        i === "promise" &&
          (this.trackProp("data"),
          !this.options.experimental_prefetchInRender &&
            this.#a.status === "pending" &&
            this.#a.reject(
              new Error(
                "experimental_prefetchInRender feature flag is not enabled",
              ),
            )),
        Reflect.get(n, i)
      ),
    });
  }
  trackProp(e) {
    this.#m.add(e);
  }
  getCurrentQuery() {
    return this.#t;
  }
  refetch({ ...e } = {}) {
    return this.fetch({ ...e });
  }
  fetchOptimistic(e) {
    const t = this.#e.defaultQueryOptions(e),
      n = this.#e.getQueryCache().build(this.#e, t);
    return n.fetch().then(() => this.createResult(n, t));
  }
  fetch(e) {
    return this.#y({ ...e, cancelRefetch: e.cancelRefetch ?? !0 }).then(
      () => (this.updateResult(), this.#s),
    );
  }
  #y(e) {
    this.#v();
    let t = this.#t.fetch(this.options, e);
    return (e?.throwOnError || (t = t.catch(Tt)), t);
  }
  #h() {
    this.#E();
    const e = Lr(this.options.staleTime, this.#t);
    if (Es || this.#s.isStale || !kf(e)) return;
    const n = X0(this.#s.dataUpdatedAt, e) + 1;
    this.#f = ms.setTimeout(() => {
      this.#s.isStale || this.updateResult();
    }, n);
  }
  #w() {
    return (
      (typeof this.options.refetchInterval == "function"
        ? this.options.refetchInterval(this.#t)
        : this.options.refetchInterval) ?? !1
    );
  }
  #S(e) {
    (this.#C(),
      (this.#d = e),
      !(
        Es ||
        an(this.options.enabled, this.#t) === !1 ||
        !kf(this.#d) ||
        this.#d === 0
      ) &&
        (this.#p = ms.setInterval(() => {
          (this.options.refetchIntervalInBackground || bh.isFocused()) &&
            this.#y();
        }, this.#d)));
  }
  #b() {
    (this.#h(), this.#S(this.#w()));
  }
  #E() {
    this.#f && (ms.clearTimeout(this.#f), (this.#f = void 0));
  }
  #C() {
    this.#p && (ms.clearInterval(this.#p), (this.#p = void 0));
  }
  createResult(e, t) {
    const n = this.#t,
      i = this.options,
      o = this.#s,
      l = this.#i,
      u = this.#l,
      f = e !== n ? e.state : this.#n,
      { state: m } = e;
    let g = { ...m },
      y = !1,
      v;
    if (t._optimisticResults) {
      const z = this.hasListeners(),
        B = !z && Gy(e, t),
        H = z && qy(e, n, t, i);
      ((B || H) && (g = { ...g, ...rb(m.data, e.options) }),
        t._optimisticResults === "isRestoring" && (g.fetchStatus = "idle"));
    }
    let { error: C, errorUpdatedAt: E, status: S } = g;
    v = g.data;
    let k = !1;
    if (t.placeholderData !== void 0 && v === void 0 && S === "pending") {
      let z;
      (o?.isPlaceholderData && t.placeholderData === u?.placeholderData
        ? ((z = o.data), (k = !0))
        : (z =
            typeof t.placeholderData == "function"
              ? t.placeholderData(this.#o?.state.data, this.#o)
              : t.placeholderData),
        z !== void 0 && ((S = "success"), (v = Tf(o?.data, z, t)), (y = !0)));
    }
    if (t.select && v !== void 0 && !k)
      if (o && v === l?.data && t.select === this.#r) v = this.#c;
      else
        try {
          ((this.#r = t.select),
            (v = t.select(v)),
            (v = Tf(o?.data, v, t)),
            (this.#c = v),
            (this.#u = null));
        } catch (z) {
          this.#u = z;
        }
    this.#u && ((C = this.#u), (v = this.#c), (E = Date.now()), (S = "error"));
    const x = g.fetchStatus === "fetching",
      M = S === "pending",
      A = S === "error",
      R = M && x,
      P = v !== void 0,
      U = {
        status: S,
        fetchStatus: g.fetchStatus,
        isPending: M,
        isSuccess: S === "success",
        isError: A,
        isInitialLoading: R,
        isLoading: R,
        data: v,
        dataUpdatedAt: g.dataUpdatedAt,
        error: C,
        errorUpdatedAt: E,
        failureCount: g.fetchFailureCount,
        failureReason: g.fetchFailureReason,
        errorUpdateCount: g.errorUpdateCount,
        isFetched: g.dataUpdateCount > 0 || g.errorUpdateCount > 0,
        isFetchedAfterMount:
          g.dataUpdateCount > f.dataUpdateCount ||
          g.errorUpdateCount > f.errorUpdateCount,
        isFetching: x,
        isRefetching: x && !M,
        isLoadingError: A && !P,
        isPaused: g.fetchStatus === "paused",
        isPlaceholderData: y,
        isRefetchError: A && P,
        isStale: Sh(e, t),
        refetch: this.refetch,
        promise: this.#a,
        isEnabled: an(t.enabled, e) !== !1,
      };
    if (this.options.experimental_prefetchInRender) {
      const z = U.data !== void 0,
        B = U.status === "error" && !z,
        H = (J) => {
          B ? J.reject(U.error) : z && J.resolve(U.data);
        },
        ee = () => {
          const J = (this.#a = U.promise = If());
          H(J);
        },
        Q = this.#a;
      switch (Q.status) {
        case "pending":
          e.queryHash === n.queryHash && H(Q);
          break;
        case "fulfilled":
          (B || U.data !== Q.value) && ee();
          break;
        case "rejected":
          (!B || U.error !== Q.reason) && ee();
          break;
      }
    }
    return U;
  }
  updateResult() {
    const e = this.#s,
      t = this.createResult(this.#t, this.options);
    if (
      ((this.#i = this.#t.state),
      (this.#l = this.options),
      this.#i.data !== void 0 && (this.#o = this.#t),
      Xl(t, e))
    )
      return;
    this.#s = t;
    const n = () => {
      if (!e) return !0;
      const { notifyOnChangeProps: i } = this.options,
        o = typeof i == "function" ? i() : i;
      if (o === "all" || (!o && !this.#m.size)) return !0;
      const l = new Set(o ?? this.#m);
      return (
        this.options.throwOnError && l.add("error"),
        Object.keys(this.#s).some((u) => {
          const d = u;
          return this.#s[d] !== e[d] && l.has(d);
        })
      );
    };
    this.#M({ listeners: n() });
  }
  #v() {
    const e = this.#e.getQueryCache().build(this.#e, this.options);
    if (e === this.#t) return;
    const t = this.#t;
    ((this.#t = e),
      (this.#n = e.state),
      this.hasListeners() && (t?.removeObserver(this), e.addObserver(this)));
  }
  onQueryUpdate() {
    (this.updateResult(), this.hasListeners() && this.#b());
  }
  #M(e) {
    tt.batch(() => {
      (e.listeners &&
        this.listeners.forEach((t) => {
          t(this.#s);
        }),
        this.#e
          .getQueryCache()
          .notify({ query: this.#t, type: "observerResultsUpdated" }));
    });
  }
};
function PM(e, t) {
  return (
    an(t.enabled, e) !== !1 &&
    e.state.data === void 0 &&
    !(e.state.status === "error" && t.retryOnMount === !1)
  );
}
function Gy(e, t) {
  return PM(e, t) || (e.state.data !== void 0 && Af(e, t, t.refetchOnMount));
}
function Af(e, t, n) {
  if (an(t.enabled, e) !== !1 && Lr(t.staleTime, e) !== "static") {
    const i = typeof n == "function" ? n(e) : n;
    return i === "always" || (i !== !1 && Sh(e, t));
  }
  return !1;
}
function qy(e, t, n, i) {
  return (
    (e !== t || an(i.enabled, e) === !1) &&
    (!n.suspense || e.state.status !== "error") &&
    Sh(e, n)
  );
}
function Sh(e, t) {
  return an(t.enabled, e) !== !1 && e.isStaleByTime(Lr(t.staleTime, e));
}
function DM(e, t) {
  return !Xl(e.getCurrentResult(), t);
}
function Qy(e) {
  return {
    onFetch: (t, n) => {
      const i = t.options,
        o = t.fetchOptions?.meta?.fetchMore?.direction,
        l = t.state.data?.pages || [],
        u = t.state.data?.pageParams || [];
      let d = { pages: [], pageParams: [] },
        f = 0;
      const m = async () => {
        let g = !1;
        const y = (E) => {
            TM(
              E,
              () => t.signal,
              () => (g = !0),
            );
          },
          v = J0(t.options, t.fetchOptions),
          C = async (E, S, k) => {
            if (g) return Promise.reject();
            if (S == null && E.pages.length) return Promise.resolve(E);
            const M = (() => {
                const V = {
                  client: t.client,
                  queryKey: t.queryKey,
                  pageParam: S,
                  direction: k ? "backward" : "forward",
                  meta: t.options.meta,
                };
                return (y(V), V);
              })(),
              A = await v(M),
              { maxPages: R } = t.options,
              P = k ? OM : kM;
            return {
              pages: P(E.pages, A, R),
              pageParams: P(E.pageParams, S, R),
            };
          };
        if (o && l.length) {
          const E = o === "backward",
            S = E ? LM : Yy,
            k = { pages: l, pageParams: u },
            x = S(i, k);
          d = await C(k, x, E);
        } else {
          const E = e ?? l.length;
          do {
            const S = f === 0 ? (u[0] ?? i.initialPageParam) : Yy(i, d);
            if (f > 0 && S == null) break;
            ((d = await C(d, S)), f++);
          } while (f < E);
        }
        return d;
      };
      t.options.persister
        ? (t.fetchFn = () =>
            t.options.persister?.(
              m,
              {
                client: t.client,
                queryKey: t.queryKey,
                meta: t.options.meta,
                signal: t.signal,
              },
              n,
            ))
        : (t.fetchFn = m);
    },
  };
}
function Yy(e, { pages: t, pageParams: n }) {
  const i = t.length - 1;
  return t.length > 0 ? e.getNextPageParam(t[i], t, n[i], n) : void 0;
}
function LM(e, { pages: t, pageParams: n }) {
  return t.length > 0 ? e.getPreviousPageParam?.(t[0], t, n[0], n) : void 0;
}
var BM = class extends nb {
  #e;
  #t;
  #n;
  #s;
  constructor(e) {
    (super(),
      (this.#e = e.client),
      (this.mutationId = e.mutationId),
      (this.#n = e.mutationCache),
      (this.#t = []),
      (this.state = e.state || sb()),
      this.setOptions(e.options),
      this.scheduleGc());
  }
  setOptions(e) {
    ((this.options = e), this.updateGcTime(this.options.gcTime));
  }
  get meta() {
    return this.options.meta;
  }
  addObserver(e) {
    this.#t.includes(e) ||
      (this.#t.push(e),
      this.clearGcTimeout(),
      this.#n.notify({ type: "observerAdded", mutation: this, observer: e }));
  }
  removeObserver(e) {
    ((this.#t = this.#t.filter((t) => t !== e)),
      this.scheduleGc(),
      this.#n.notify({ type: "observerRemoved", mutation: this, observer: e }));
  }
  optionalRemove() {
    this.#t.length ||
      (this.state.status === "pending"
        ? this.scheduleGc()
        : this.#n.remove(this));
  }
  continue() {
    return this.#s?.continue() ?? this.execute(this.state.variables);
  }
  async execute(e) {
    const t = () => {
        this.#i({ type: "continue" });
      },
      n = {
        client: this.#e,
        meta: this.options.meta,
        mutationKey: this.options.mutationKey,
      };
    this.#s = tb({
      fn: () =>
        this.options.mutationFn
          ? this.options.mutationFn(e, n)
          : Promise.reject(new Error("No mutationFn found")),
      onFail: (l, u) => {
        this.#i({ type: "failed", failureCount: l, error: u });
      },
      onPause: () => {
        this.#i({ type: "pause" });
      },
      onContinue: t,
      retry: this.options.retry ?? 0,
      retryDelay: this.options.retryDelay,
      networkMode: this.options.networkMode,
      canRun: () => this.#n.canRun(this),
    });
    const i = this.state.status === "pending",
      o = !this.#s.canStart();
    try {
      if (i) t();
      else {
        (this.#i({ type: "pending", variables: e, isPaused: o }),
          this.#n.config.onMutate &&
            (await this.#n.config.onMutate(e, this, n)));
        const u = await this.options.onMutate?.(e, n);
        u !== this.state.context &&
          this.#i({ type: "pending", context: u, variables: e, isPaused: o });
      }
      const l = await this.#s.start();
      return (
        await this.#n.config.onSuccess?.(l, e, this.state.context, this, n),
        await this.options.onSuccess?.(l, e, this.state.context, n),
        await this.#n.config.onSettled?.(
          l,
          null,
          this.state.variables,
          this.state.context,
          this,
          n,
        ),
        await this.options.onSettled?.(l, null, e, this.state.context, n),
        this.#i({ type: "success", data: l }),
        l
      );
    } catch (l) {
      try {
        await this.#n.config.onError?.(l, e, this.state.context, this, n);
      } catch (u) {
        Promise.reject(u);
      }
      try {
        await this.options.onError?.(l, e, this.state.context, n);
      } catch (u) {
        Promise.reject(u);
      }
      try {
        await this.#n.config.onSettled?.(
          void 0,
          l,
          this.state.variables,
          this.state.context,
          this,
          n,
        );
      } catch (u) {
        Promise.reject(u);
      }
      try {
        await this.options.onSettled?.(void 0, l, e, this.state.context, n);
      } catch (u) {
        Promise.reject(u);
      }
      throw (this.#i({ type: "error", error: l }), l);
    } finally {
      this.#n.runNext(this);
    }
  }
  #i(e) {
    const t = (n) => {
      switch (e.type) {
        case "failed":
          return { ...n, failureCount: e.failureCount, failureReason: e.error };
        case "pause":
          return { ...n, isPaused: !0 };
        case "continue":
          return { ...n, isPaused: !1 };
        case "pending":
          return {
            ...n,
            context: e.context,
            data: void 0,
            failureCount: 0,
            failureReason: null,
            error: null,
            isPaused: e.isPaused,
            status: "pending",
            variables: e.variables,
            submittedAt: Date.now(),
          };
        case "success":
          return {
            ...n,
            data: e.data,
            failureCount: 0,
            failureReason: null,
            error: null,
            status: "success",
            isPaused: !1,
          };
        case "error":
          return {
            ...n,
            data: void 0,
            error: e.error,
            failureCount: n.failureCount + 1,
            failureReason: e.error,
            isPaused: !1,
            status: "error",
          };
      }
    };
    ((this.state = t(this.state)),
      tt.batch(() => {
        (this.#t.forEach((n) => {
          n.onMutationUpdate(e);
        }),
          this.#n.notify({ mutation: this, type: "updated", action: e }));
      }));
  }
};
function sb() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: !1,
    status: "idle",
    variables: void 0,
    submittedAt: 0,
  };
}
var $M = class extends Mi {
  constructor(e = {}) {
    (super(),
      (this.config = e),
      (this.#e = new Set()),
      (this.#t = new Map()),
      (this.#n = 0));
  }
  #e;
  #t;
  #n;
  build(e, t, n) {
    const i = new BM({
      client: e,
      mutationCache: this,
      mutationId: ++this.#n,
      options: e.defaultMutationOptions(t),
      state: n,
    });
    return (this.add(i), i);
  }
  add(e) {
    this.#e.add(e);
    const t = Sl(e);
    if (typeof t == "string") {
      const n = this.#t.get(t);
      n ? n.push(e) : this.#t.set(t, [e]);
    }
    this.notify({ type: "added", mutation: e });
  }
  remove(e) {
    if (this.#e.delete(e)) {
      const t = Sl(e);
      if (typeof t == "string") {
        const n = this.#t.get(t);
        if (n)
          if (n.length > 1) {
            const i = n.indexOf(e);
            i !== -1 && n.splice(i, 1);
          } else n[0] === e && this.#t.delete(t);
      }
    }
    this.notify({ type: "removed", mutation: e });
  }
  canRun(e) {
    const t = Sl(e);
    if (typeof t == "string") {
      const i = this.#t.get(t)?.find((o) => o.state.status === "pending");
      return !i || i === e;
    } else return !0;
  }
  runNext(e) {
    const t = Sl(e);
    return typeof t == "string"
      ? (this.#t
          .get(t)
          ?.find((i) => i !== e && i.state.isPaused)
          ?.continue() ?? Promise.resolve())
      : Promise.resolve();
  }
  clear() {
    tt.batch(() => {
      (this.#e.forEach((e) => {
        this.notify({ type: "removed", mutation: e });
      }),
        this.#e.clear(),
        this.#t.clear());
    });
  }
  getAll() {
    return Array.from(this.#e);
  }
  find(e) {
    const t = { exact: !0, ...e };
    return this.getAll().find((n) => Uy(t, n));
  }
  findAll(e = {}) {
    return this.getAll().filter((t) => Uy(e, t));
  }
  notify(e) {
    tt.batch(() => {
      this.listeners.forEach((t) => {
        t(e);
      });
    });
  }
  resumePausedMutations() {
    const e = this.getAll().filter((t) => t.state.isPaused);
    return tt.batch(() => Promise.all(e.map((t) => t.continue().catch(Tt))));
  }
};
function Sl(e) {
  return e.options.scope?.id;
}
var zM = class extends Mi {
    #e;
    #t = void 0;
    #n;
    #s;
    constructor(t, n) {
      (super(),
        (this.#e = t),
        this.setOptions(n),
        this.bindMethods(),
        this.#i());
    }
    bindMethods() {
      ((this.mutate = this.mutate.bind(this)),
        (this.reset = this.reset.bind(this)));
    }
    setOptions(t) {
      const n = this.options;
      ((this.options = this.#e.defaultMutationOptions(t)),
        Xl(this.options, n) ||
          this.#e
            .getMutationCache()
            .notify({
              type: "observerOptionsUpdated",
              mutation: this.#n,
              observer: this,
            }),
        n?.mutationKey &&
        this.options.mutationKey &&
        xs(n.mutationKey) !== xs(this.options.mutationKey)
          ? this.reset()
          : this.#n?.state.status === "pending" &&
            this.#n.setOptions(this.options));
    }
    onUnsubscribe() {
      this.hasListeners() || this.#n?.removeObserver(this);
    }
    onMutationUpdate(t) {
      (this.#i(), this.#l(t));
    }
    getCurrentResult() {
      return this.#t;
    }
    reset() {
      (this.#n?.removeObserver(this), (this.#n = void 0), this.#i(), this.#l());
    }
    mutate(t, n) {
      return (
        (this.#s = n),
        this.#n?.removeObserver(this),
        (this.#n = this.#e.getMutationCache().build(this.#e, this.options)),
        this.#n.addObserver(this),
        this.#n.execute(t)
      );
    }
    #i() {
      const t = this.#n?.state ?? sb();
      this.#t = {
        ...t,
        isPending: t.status === "pending",
        isSuccess: t.status === "success",
        isError: t.status === "error",
        isIdle: t.status === "idle",
        mutate: this.mutate,
        reset: this.reset,
      };
    }
    #l(t) {
      tt.batch(() => {
        if (this.#s && this.hasListeners()) {
          const n = this.#t.variables,
            i = this.#t.context,
            o = {
              client: this.#e,
              meta: this.options.meta,
              mutationKey: this.options.mutationKey,
            };
          if (t?.type === "success") {
            try {
              this.#s.onSuccess?.(t.data, n, i, o);
            } catch (l) {
              Promise.reject(l);
            }
            try {
              this.#s.onSettled?.(t.data, null, n, i, o);
            } catch (l) {
              Promise.reject(l);
            }
          } else if (t?.type === "error") {
            try {
              this.#s.onError?.(t.error, n, i, o);
            } catch (l) {
              Promise.reject(l);
            }
            try {
              this.#s.onSettled?.(void 0, t.error, n, i, o);
            } catch (l) {
              Promise.reject(l);
            }
          }
        }
        this.listeners.forEach((n) => {
          n(this.#t);
        });
      });
    }
  },
  FM = class extends Mi {
    constructor(e = {}) {
      (super(), (this.config = e), (this.#e = new Map()));
    }
    #e;
    build(e, t, n) {
      const i = t.queryKey,
        o = t.queryHash ?? yh(i, t);
      let l = this.get(o);
      return (
        l ||
          ((l = new _M({
            client: e,
            queryKey: i,
            queryHash: o,
            options: e.defaultQueryOptions(t),
            state: n,
            defaultOptions: e.getQueryDefaults(i),
          })),
          this.add(l)),
        l
      );
    }
    add(e) {
      this.#e.has(e.queryHash) ||
        (this.#e.set(e.queryHash, e), this.notify({ type: "added", query: e }));
    }
    remove(e) {
      const t = this.#e.get(e.queryHash);
      t &&
        (e.destroy(),
        t === e && this.#e.delete(e.queryHash),
        this.notify({ type: "removed", query: e }));
    }
    clear() {
      tt.batch(() => {
        this.getAll().forEach((e) => {
          this.remove(e);
        });
      });
    }
    get(e) {
      return this.#e.get(e);
    }
    getAll() {
      return [...this.#e.values()];
    }
    find(e) {
      const t = { exact: !0, ...e };
      return this.getAll().find((n) => Fy(t, n));
    }
    findAll(e = {}) {
      const t = this.getAll();
      return Object.keys(e).length > 0 ? t.filter((n) => Fy(e, n)) : t;
    }
    notify(e) {
      tt.batch(() => {
        this.listeners.forEach((t) => {
          t(e);
        });
      });
    }
    onFocus() {
      tt.batch(() => {
        this.getAll().forEach((e) => {
          e.onFocus();
        });
      });
    }
    onOnline() {
      tt.batch(() => {
        this.getAll().forEach((e) => {
          e.onOnline();
        });
      });
    }
  },
  UM = class {
    #e;
    #t;
    #n;
    #s;
    #i;
    #l;
    #a;
    #u;
    constructor(e = {}) {
      ((this.#e = e.queryCache || new FM()),
        (this.#t = e.mutationCache || new $M()),
        (this.#n = e.defaultOptions || {}),
        (this.#s = new Map()),
        (this.#i = new Map()),
        (this.#l = 0));
    }
    mount() {
      (this.#l++,
        this.#l === 1 &&
          ((this.#a = bh.subscribe(async (e) => {
            e && (await this.resumePausedMutations(), this.#e.onFocus());
          })),
          (this.#u = Zl.subscribe(async (e) => {
            e && (await this.resumePausedMutations(), this.#e.onOnline());
          }))));
    }
    unmount() {
      (this.#l--,
        this.#l === 0 &&
          (this.#a?.(), (this.#a = void 0), this.#u?.(), (this.#u = void 0)));
    }
    isFetching(e) {
      return this.#e.findAll({ ...e, fetchStatus: "fetching" }).length;
    }
    isMutating(e) {
      return this.#t.findAll({ ...e, status: "pending" }).length;
    }
    getQueryData(e) {
      const t = this.defaultQueryOptions({ queryKey: e });
      return this.#e.get(t.queryHash)?.state.data;
    }
    ensureQueryData(e) {
      const t = this.defaultQueryOptions(e),
        n = this.#e.build(this, t),
        i = n.state.data;
      return i === void 0
        ? this.fetchQuery(e)
        : (e.revalidateIfStale &&
            n.isStaleByTime(Lr(t.staleTime, n)) &&
            this.prefetchQuery(t),
          Promise.resolve(i));
    }
    getQueriesData(e) {
      return this.#e.findAll(e).map(({ queryKey: t, state: n }) => {
        const i = n.data;
        return [t, i];
      });
    }
    setQueryData(e, t, n) {
      const i = this.defaultQueryOptions({ queryKey: e }),
        l = this.#e.get(i.queryHash)?.state.data,
        u = EM(t, l);
      if (u !== void 0)
        return this.#e.build(this, i).setData(u, { ...n, manual: !0 });
    }
    setQueriesData(e, t, n) {
      return tt.batch(() =>
        this.#e
          .findAll(e)
          .map(({ queryKey: i }) => [i, this.setQueryData(i, t, n)]),
      );
    }
    getQueryState(e) {
      const t = this.defaultQueryOptions({ queryKey: e });
      return this.#e.get(t.queryHash)?.state;
    }
    removeQueries(e) {
      const t = this.#e;
      tt.batch(() => {
        t.findAll(e).forEach((n) => {
          t.remove(n);
        });
      });
    }
    resetQueries(e, t) {
      const n = this.#e;
      return tt.batch(
        () => (
          n.findAll(e).forEach((i) => {
            i.reset();
          }),
          this.refetchQueries({ type: "active", ...e }, t)
        ),
      );
    }
    cancelQueries(e, t = {}) {
      const n = { revert: !0, ...t },
        i = tt.batch(() => this.#e.findAll(e).map((o) => o.cancel(n)));
      return Promise.all(i).then(Tt).catch(Tt);
    }
    invalidateQueries(e, t = {}) {
      return tt.batch(
        () => (
          this.#e.findAll(e).forEach((n) => {
            n.invalidate();
          }),
          e?.refetchType === "none"
            ? Promise.resolve()
            : this.refetchQueries(
                { ...e, type: e?.refetchType ?? e?.type ?? "active" },
                t,
              )
        ),
      );
    }
    refetchQueries(e, t = {}) {
      const n = { ...t, cancelRefetch: t.cancelRefetch ?? !0 },
        i = tt.batch(() =>
          this.#e
            .findAll(e)
            .filter((o) => !o.isDisabled() && !o.isStatic())
            .map((o) => {
              let l = o.fetch(void 0, n);
              return (
                n.throwOnError || (l = l.catch(Tt)),
                o.state.fetchStatus === "paused" ? Promise.resolve() : l
              );
            }),
        );
      return Promise.all(i).then(Tt);
    }
    fetchQuery(e) {
      const t = this.defaultQueryOptions(e);
      t.retry === void 0 && (t.retry = !1);
      const n = this.#e.build(this, t);
      return n.isStaleByTime(Lr(t.staleTime, n))
        ? n.fetch(t)
        : Promise.resolve(n.state.data);
    }
    prefetchQuery(e) {
      return this.fetchQuery(e).then(Tt).catch(Tt);
    }
    fetchInfiniteQuery(e) {
      return ((e.behavior = Qy(e.pages)), this.fetchQuery(e));
    }
    prefetchInfiniteQuery(e) {
      return this.fetchInfiniteQuery(e).then(Tt).catch(Tt);
    }
    ensureInfiniteQueryData(e) {
      return ((e.behavior = Qy(e.pages)), this.ensureQueryData(e));
    }
    resumePausedMutations() {
      return Zl.isOnline()
        ? this.#t.resumePausedMutations()
        : Promise.resolve();
    }
    getQueryCache() {
      return this.#e;
    }
    getMutationCache() {
      return this.#t;
    }
    getDefaultOptions() {
      return this.#n;
    }
    setDefaultOptions(e) {
      this.#n = e;
    }
    setQueryDefaults(e, t) {
      this.#s.set(xs(e), { queryKey: e, defaultOptions: t });
    }
    getQueryDefaults(e) {
      const t = [...this.#s.values()],
        n = {};
      return (
        t.forEach((i) => {
          Fo(e, i.queryKey) && Object.assign(n, i.defaultOptions);
        }),
        n
      );
    }
    setMutationDefaults(e, t) {
      this.#i.set(xs(e), { mutationKey: e, defaultOptions: t });
    }
    getMutationDefaults(e) {
      const t = [...this.#i.values()],
        n = {};
      return (
        t.forEach((i) => {
          Fo(e, i.mutationKey) && Object.assign(n, i.defaultOptions);
        }),
        n
      );
    }
    defaultQueryOptions(e) {
      if (e._defaulted) return e;
      const t = {
        ...this.#n.queries,
        ...this.getQueryDefaults(e.queryKey),
        ...e,
        _defaulted: !0,
      };
      return (
        t.queryHash || (t.queryHash = yh(t.queryKey, t)),
        t.refetchOnReconnect === void 0 &&
          (t.refetchOnReconnect = t.networkMode !== "always"),
        t.throwOnError === void 0 && (t.throwOnError = !!t.suspense),
        !t.networkMode && t.persister && (t.networkMode = "offlineFirst"),
        t.queryFn === vh && (t.enabled = !1),
        t
      );
    }
    defaultMutationOptions(e) {
      return e?._defaulted
        ? e
        : {
            ...this.#n.mutations,
            ...(e?.mutationKey && this.getMutationDefaults(e.mutationKey)),
            ...e,
            _defaulted: !0,
          };
    }
    clear() {
      (this.#e.clear(), this.#t.clear());
    }
  },
  ib = w.createContext(void 0),
  ob = (e) => {
    const t = w.useContext(ib);
    if (!t)
      throw new Error("No QueryClient set, use QueryClientProvider to set one");
    return t;
  },
  VM = ({ client: e, children: t }) => (
    w.useEffect(
      () => (
        e.mount(),
        () => {
          e.unmount();
        }
      ),
      [e],
    ),
    O.jsx(ib.Provider, { value: e, children: t })
  ),
  ab = w.createContext(!1),
  WM = () => w.useContext(ab);
ab.Provider;
function HM() {
  let e = !1;
  return {
    clearReset: () => {
      e = !1;
    },
    reset: () => {
      e = !0;
    },
    isReset: () => e,
  };
}
var KM = w.createContext(HM()),
  GM = () => w.useContext(KM),
  qM = (e, t, n) => {
    const i =
      n?.state.error && typeof e.throwOnError == "function"
        ? wh(e.throwOnError, [n.state.error, n])
        : e.throwOnError;
    (e.suspense || e.experimental_prefetchInRender || i) &&
      (t.isReset() || (e.retryOnMount = !1));
  },
  QM = (e) => {
    w.useEffect(() => {
      e.clearReset();
    }, [e]);
  },
  YM = ({
    result: e,
    errorResetBoundary: t,
    throwOnError: n,
    query: i,
    suspense: o,
  }) =>
    e.isError &&
    !t.isReset() &&
    !e.isFetching &&
    i &&
    ((o && e.data === void 0) || wh(n, [e.error, i])),
  XM = (e) => {
    if (e.suspense) {
      const n = (o) => (o === "static" ? o : Math.max(o ?? 1e3, 1e3)),
        i = e.staleTime;
      ((e.staleTime = typeof i == "function" ? (...o) => n(i(...o)) : n(i)),
        typeof e.gcTime == "number" && (e.gcTime = Math.max(e.gcTime, 1e3)));
    }
  },
  ZM = (e, t) => e.isLoading && e.isFetching && !t,
  JM = (e, t) => e?.suspense && t.isPending,
  Xy = (e, t, n) =>
    t.fetchOptimistic(e).catch(() => {
      n.clearReset();
    });
function eA(e, t, n) {
  const i = WM(),
    o = GM(),
    l = ob(),
    u = l.defaultQueryOptions(e);
  l.getDefaultOptions().queries?._experimental_beforeQuery?.(u);
  const d = l.getQueryCache().get(u.queryHash);
  ((u._optimisticResults = i ? "isRestoring" : "optimistic"),
    XM(u),
    qM(u, o, d),
    QM(o));
  const f = !l.getQueryCache().get(u.queryHash),
    [m] = w.useState(() => new t(l, u)),
    g = m.getOptimisticResult(u),
    y = !i && e.subscribed !== !1;
  if (
    (w.useSyncExternalStore(
      w.useCallback(
        (v) => {
          const C = y ? m.subscribe(tt.batchCalls(v)) : Tt;
          return (m.updateResult(), C);
        },
        [m, y],
      ),
      () => m.getCurrentResult(),
      () => m.getCurrentResult(),
    ),
    w.useEffect(() => {
      m.setOptions(u);
    }, [u, m]),
    JM(u, g))
  )
    throw Xy(u, m, o);
  if (
    YM({
      result: g,
      errorResetBoundary: o,
      throwOnError: u.throwOnError,
      query: d,
      suspense: u.suspense,
    })
  )
    throw g.error;
  return (
    l.getDefaultOptions().queries?._experimental_afterQuery?.(u, g),
    u.experimental_prefetchInRender &&
      !Es &&
      ZM(g, i) &&
      (f ? Xy(u, m, o) : d?.promise)?.catch(Tt).finally(() => {
        m.updateResult();
      }),
    u.notifyOnChangeProps ? g : m.trackResult(g)
  );
}
function lb(e, t) {
  return eA(e, NM);
}
function bu(e, t) {
  const n = ob(),
    [i] = w.useState(() => new zM(n, e));
  w.useEffect(() => {
    i.setOptions(e);
  }, [i, e]);
  const o = w.useSyncExternalStore(
      w.useCallback((u) => i.subscribe(tt.batchCalls(u)), [i]),
      () => i.getCurrentResult(),
      () => i.getCurrentResult(),
    ),
    l = w.useCallback(
      (u, d) => {
        i.mutate(u, d).catch(Tt);
      },
      [i],
    );
  if (o.error && wh(i.options.throwOnError, [o.error])) throw o.error;
  return { ...o, mutate: l, mutateAsync: o.mutate };
}
const Zy = (e) => {
    let t;
    const n = new Set(),
      i = (m, g) => {
        const y = typeof m == "function" ? m(t) : m;
        if (!Object.is(y, t)) {
          const v = t;
          ((t =
            (g ?? (typeof y != "object" || y === null))
              ? y
              : Object.assign({}, t, y)),
            n.forEach((C) => C(t, v)));
        }
      },
      o = () => t,
      d = {
        setState: i,
        getState: o,
        getInitialState: () => f,
        subscribe: (m) => (n.add(m), () => n.delete(m)),
      },
      f = (t = e(i, o, d));
    return d;
  },
  tA = (e) => (e ? Zy(e) : Zy),
  nA = (e) => e;
function rA(e, t = nA) {
  const n = Gt.useSyncExternalStore(
    e.subscribe,
    Gt.useCallback(() => t(e.getState()), [e, t]),
    Gt.useCallback(() => t(e.getInitialState()), [e, t]),
  );
  return (Gt.useDebugValue(n), n);
}
var sA = Symbol.for("react.lazy"),
  Jl = Kf[" use ".trim().toString()];
function iA(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
function ub(e) {
  return (
    e != null &&
    typeof e == "object" &&
    "$$typeof" in e &&
    e.$$typeof === sA &&
    "_payload" in e &&
    iA(e._payload)
  );
}
function oA(e) {
  const t = aA(e),
    n = w.forwardRef((i, o) => {
      let { children: l, ...u } = i;
      ub(l) && typeof Jl == "function" && (l = Jl(l._payload));
      const d = w.Children.toArray(l),
        f = d.find(uA);
      if (f) {
        const m = f.props.children,
          g = d.map((y) =>
            y === f
              ? w.Children.count(m) > 1
                ? w.Children.only(null)
                : w.isValidElement(m)
                  ? m.props.children
                  : null
              : y,
          );
        return O.jsx(t, {
          ...u,
          ref: o,
          children: w.isValidElement(m) ? w.cloneElement(m, void 0, g) : null,
        });
      }
      return O.jsx(t, { ...u, ref: o, children: l });
    });
  return ((n.displayName = `${e}.Slot`), n);
}
var Yo = oA("Slot");
function aA(e) {
  const t = w.forwardRef((n, i) => {
    let { children: o, ...l } = n;
    if (
      (ub(o) && typeof Jl == "function" && (o = Jl(o._payload)),
      w.isValidElement(o))
    ) {
      const u = dA(o),
        d = cA(l, o.props);
      return (
        o.type !== w.Fragment && (d.ref = i ? Go(i, u) : u),
        w.cloneElement(o, d)
      );
    }
    return w.Children.count(o) > 1 ? w.Children.only(null) : null;
  });
  return ((t.displayName = `${e}.SlotClone`), t);
}
var lA = Symbol("radix.slottable");
function uA(e) {
  return (
    w.isValidElement(e) &&
    typeof e.type == "function" &&
    "__radixId" in e.type &&
    e.type.__radixId === lA
  );
}
function cA(e, t) {
  const n = { ...t };
  for (const i in t) {
    const o = e[i],
      l = t[i];
    /^on[A-Z]/.test(i)
      ? o && l
        ? (n[i] = (...d) => {
            const f = l(...d);
            return (o(...d), f);
          })
        : o && (n[i] = o)
      : i === "style"
        ? (n[i] = { ...o, ...l })
        : i === "className" && (n[i] = [o, l].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function dA(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get,
    n = t && "isReactWarning" in t && t.isReactWarning;
  return n
    ? e.ref
    : ((t = Object.getOwnPropertyDescriptor(e, "ref")?.get),
      (n = t && "isReactWarning" in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref);
}
function fA(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var i = n.call(e, t);
    if (typeof i != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function hA(e) {
  var t = fA(e, "string");
  return typeof t == "symbol" ? t : String(t);
}
function pA(e, t, n) {
  return (
    (t = hA(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function Jy(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    (t &&
      (i = i.filter(function (o) {
        return Object.getOwnPropertyDescriptor(e, o).enumerable;
      })),
      n.push.apply(n, i));
  }
  return n;
}
function ev(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Jy(Object(n), !0).forEach(function (i) {
          pA(e, i, n[i]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Jy(Object(n)).forEach(function (i) {
            Object.defineProperty(e, i, Object.getOwnPropertyDescriptor(n, i));
          });
  }
  return e;
}
function tv(e, t) {
  var n = {};
  for (var i in e) n[i] = t(e[i], i);
  return n;
}
var mA = (e, t, n) => {
    for (var i of Object.keys(e)) {
      var o;
      if (e[i] !== ((o = t[i]) !== null && o !== void 0 ? o : n[i])) return !1;
    }
    return !0;
  },
  Eh = (e) => {
    var t = (n) => {
      var i = e.defaultClassName,
        o = ev(ev({}, e.defaultVariants), n);
      for (var l in o) {
        var u,
          d = (u = o[l]) !== null && u !== void 0 ? u : e.defaultVariants[l];
        if (d != null) {
          var f = d;
          typeof f == "boolean" && (f = f === !0 ? "true" : "false");
          var m = e.variantClassNames[l][f];
          m && (i += " " + m);
        }
      }
      for (var [g, y] of e.compoundVariants)
        mA(g, o, e.defaultVariants) && (i += " " + y);
      return i;
    };
    return (
      (t.variants = () => Object.keys(e.variantClassNames)),
      (t.classNames = {
        get base() {
          return e.defaultClassName.split(" ")[0];
        },
        get variants() {
          return tv(e.variantClassNames, (n) => tv(n, (i) => i.split(" ")[0]));
        },
      }),
      t
    );
  };
function cb(e) {
  const t = e + "CollectionProvider",
    [n, i] = ks(t),
    [o, l] = n(t, { collectionRef: { current: null }, itemMap: new Map() }),
    u = (S) => {
      const { scope: k, children: x } = S,
        M = Gt.useRef(null),
        A = Gt.useRef(new Map()).current;
      return O.jsx(o, { scope: k, itemMap: A, collectionRef: M, children: x });
    };
  u.displayName = t;
  const d = e + "CollectionSlot",
    f = Si(d),
    m = Gt.forwardRef((S, k) => {
      const { scope: x, children: M } = S,
        A = l(d, x),
        R = st(k, A.collectionRef);
      return O.jsx(f, { ref: R, children: M });
    });
  m.displayName = d;
  const g = e + "CollectionItemSlot",
    y = "data-radix-collection-item",
    v = Si(g),
    C = Gt.forwardRef((S, k) => {
      const { scope: x, children: M, ...A } = S,
        R = Gt.useRef(null),
        P = st(k, R),
        V = l(g, x);
      return (
        Gt.useEffect(
          () => (
            V.itemMap.set(R, { ref: R, ...A }),
            () => {
              V.itemMap.delete(R);
            }
          ),
        ),
        O.jsx(v, { [y]: "", ref: P, children: M })
      );
    });
  C.displayName = g;
  function E(S) {
    const k = l(e + "CollectionConsumer", S);
    return Gt.useCallback(() => {
      const M = k.collectionRef.current;
      if (!M) return [];
      const A = Array.from(M.querySelectorAll(`[${y}]`));
      return Array.from(k.itemMap.values()).sort(
        (V, U) => A.indexOf(V.ref.current) - A.indexOf(U.ref.current),
      );
    }, [k.collectionRef, k.itemMap]);
  }
  return [{ Provider: u, Slot: m, ItemSlot: C }, E, i];
}
var db = w.createContext(void 0),
  gA = (e) => {
    const { dir: t, children: n } = e;
    return O.jsx(db.Provider, { value: t, children: n });
  };
function fb(e) {
  const t = w.useContext(db);
  return e || t || "ltr";
}
var yA = gA;
const vA = ["top", "right", "bottom", "left"],
  Vr = Math.min,
  Yt = Math.max,
  eu = Math.round,
  El = Math.floor,
  Bn = (e) => ({ x: e, y: e }),
  wA = { left: "right", right: "left", bottom: "top", top: "bottom" };
function jf(e, t, n) {
  return Yt(e, Vr(t, n));
}
function rr(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function sr(e) {
  return e.split("-")[0];
}
function Ai(e) {
  return e.split("-")[1];
}
function xh(e) {
  return e === "x" ? "y" : "x";
}
function Ch(e) {
  return e === "y" ? "height" : "width";
}
function Ln(e) {
  const t = e[0];
  return t === "t" || t === "b" ? "y" : "x";
}
function kh(e) {
  return xh(Ln(e));
}
function bA(e, t, n) {
  n === void 0 && (n = !1);
  const i = Ai(e),
    o = kh(e),
    l = Ch(o);
  let u =
    o === "x"
      ? i === (n ? "end" : "start")
        ? "right"
        : "left"
      : i === "start"
        ? "bottom"
        : "top";
  return (t.reference[l] > t.floating[l] && (u = tu(u)), [u, tu(u)]);
}
function SA(e) {
  const t = tu(e);
  return [Rf(e), t, Rf(t)];
}
function Rf(e) {
  return e.includes("start")
    ? e.replace("start", "end")
    : e.replace("end", "start");
}
const nv = ["left", "right"],
  rv = ["right", "left"],
  EA = ["top", "bottom"],
  xA = ["bottom", "top"];
function CA(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? (t ? rv : nv) : t ? nv : rv;
    case "left":
    case "right":
      return t ? EA : xA;
    default:
      return [];
  }
}
function kA(e, t, n, i) {
  const o = Ai(e);
  let l = CA(sr(e), n === "start", i);
  return (
    o && ((l = l.map((u) => u + "-" + o)), t && (l = l.concat(l.map(Rf)))),
    l
  );
}
function tu(e) {
  const t = sr(e);
  return wA[t] + e.slice(t.length);
}
function OA(e) {
  return { top: 0, right: 0, bottom: 0, left: 0, ...e };
}
function hb(e) {
  return typeof e != "number"
    ? OA(e)
    : { top: e, right: e, bottom: e, left: e };
}
function nu(e) {
  const { x: t, y: n, width: i, height: o } = e;
  return {
    width: i,
    height: o,
    top: n,
    left: t,
    right: t + i,
    bottom: n + o,
    x: t,
    y: n,
  };
}
function sv(e, t, n) {
  let { reference: i, floating: o } = e;
  const l = Ln(t),
    u = kh(t),
    d = Ch(u),
    f = sr(t),
    m = l === "y",
    g = i.x + i.width / 2 - o.width / 2,
    y = i.y + i.height / 2 - o.height / 2,
    v = i[d] / 2 - o[d] / 2;
  let C;
  switch (f) {
    case "top":
      C = { x: g, y: i.y - o.height };
      break;
    case "bottom":
      C = { x: g, y: i.y + i.height };
      break;
    case "right":
      C = { x: i.x + i.width, y };
      break;
    case "left":
      C = { x: i.x - o.width, y };
      break;
    default:
      C = { x: i.x, y: i.y };
  }
  switch (Ai(t)) {
    case "start":
      C[u] -= v * (n && m ? -1 : 1);
      break;
    case "end":
      C[u] += v * (n && m ? -1 : 1);
      break;
  }
  return C;
}
async function TA(e, t) {
  var n;
  t === void 0 && (t = {});
  const { x: i, y: o, platform: l, rects: u, elements: d, strategy: f } = e,
    {
      boundary: m = "clippingAncestors",
      rootBoundary: g = "viewport",
      elementContext: y = "floating",
      altBoundary: v = !1,
      padding: C = 0,
    } = rr(t, e),
    E = hb(C),
    k = d[v ? (y === "floating" ? "reference" : "floating") : y],
    x = nu(
      await l.getClippingRect({
        element:
          (n = await (l.isElement == null ? void 0 : l.isElement(k))) == null ||
          n
            ? k
            : k.contextElement ||
              (await (l.getDocumentElement == null
                ? void 0
                : l.getDocumentElement(d.floating))),
        boundary: m,
        rootBoundary: g,
        strategy: f,
      }),
    ),
    M =
      y === "floating"
        ? { x: i, y: o, width: u.floating.width, height: u.floating.height }
        : u.reference,
    A = await (l.getOffsetParent == null
      ? void 0
      : l.getOffsetParent(d.floating)),
    R = (await (l.isElement == null ? void 0 : l.isElement(A)))
      ? (await (l.getScale == null ? void 0 : l.getScale(A))) || { x: 1, y: 1 }
      : { x: 1, y: 1 },
    P = nu(
      l.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await l.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: d,
            rect: M,
            offsetParent: A,
            strategy: f,
          })
        : M,
    );
  return {
    top: (x.top - P.top + E.top) / R.y,
    bottom: (P.bottom - x.bottom + E.bottom) / R.y,
    left: (x.left - P.left + E.left) / R.x,
    right: (P.right - x.right + E.right) / R.x,
  };
}
const IA = 50,
  MA = async (e, t, n) => {
    const {
        placement: i = "bottom",
        strategy: o = "absolute",
        middleware: l = [],
        platform: u,
      } = n,
      d = u.detectOverflow ? u : { ...u, detectOverflow: TA },
      f = await (u.isRTL == null ? void 0 : u.isRTL(t));
    let m = await u.getElementRects({ reference: e, floating: t, strategy: o }),
      { x: g, y } = sv(m, i, f),
      v = i,
      C = 0;
    const E = {};
    for (let S = 0; S < l.length; S++) {
      const k = l[S];
      if (!k) continue;
      const { name: x, fn: M } = k,
        {
          x: A,
          y: R,
          data: P,
          reset: V,
        } = await M({
          x: g,
          y,
          initialPlacement: i,
          placement: v,
          strategy: o,
          middlewareData: E,
          rects: m,
          platform: d,
          elements: { reference: e, floating: t },
        });
      ((g = A ?? g),
        (y = R ?? y),
        (E[x] = { ...E[x], ...P }),
        V &&
          C < IA &&
          (C++,
          typeof V == "object" &&
            (V.placement && (v = V.placement),
            V.rects &&
              (m =
                V.rects === !0
                  ? await u.getElementRects({
                      reference: e,
                      floating: t,
                      strategy: o,
                    })
                  : V.rects),
            ({ x: g, y } = sv(m, v, f))),
          (S = -1)));
    }
    return { x: g, y, placement: v, strategy: o, middlewareData: E };
  },
  AA = (e) => ({
    name: "arrow",
    options: e,
    async fn(t) {
      const {
          x: n,
          y: i,
          placement: o,
          rects: l,
          platform: u,
          elements: d,
          middlewareData: f,
        } = t,
        { element: m, padding: g = 0 } = rr(e, t) || {};
      if (m == null) return {};
      const y = hb(g),
        v = { x: n, y: i },
        C = kh(o),
        E = Ch(C),
        S = await u.getDimensions(m),
        k = C === "y",
        x = k ? "top" : "left",
        M = k ? "bottom" : "right",
        A = k ? "clientHeight" : "clientWidth",
        R = l.reference[E] + l.reference[C] - v[C] - l.floating[E],
        P = v[C] - l.reference[C],
        V = await (u.getOffsetParent == null ? void 0 : u.getOffsetParent(m));
      let U = V ? V[A] : 0;
      (!U || !(await (u.isElement == null ? void 0 : u.isElement(V)))) &&
        (U = d.floating[A] || l.floating[E]);
      const z = R / 2 - P / 2,
        B = U / 2 - S[E] / 2 - 1,
        H = Vr(y[x], B),
        ee = Vr(y[M], B),
        Q = H,
        J = U - S[E] - ee,
        ae = U / 2 - S[E] / 2 + z,
        ye = jf(Q, ae, J),
        ue =
          !f.arrow &&
          Ai(o) != null &&
          ae !== ye &&
          l.reference[E] / 2 - (ae < Q ? H : ee) - S[E] / 2 < 0,
        ce = ue ? (ae < Q ? ae - Q : ae - J) : 0;
      return {
        [C]: v[C] + ce,
        data: {
          [C]: ye,
          centerOffset: ae - ye - ce,
          ...(ue && { alignmentOffset: ce }),
        },
        reset: ue,
      };
    },
  }),
  jA = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "flip",
        options: e,
        async fn(t) {
          var n, i;
          const {
              placement: o,
              middlewareData: l,
              rects: u,
              initialPlacement: d,
              platform: f,
              elements: m,
            } = t,
            {
              mainAxis: g = !0,
              crossAxis: y = !0,
              fallbackPlacements: v,
              fallbackStrategy: C = "bestFit",
              fallbackAxisSideDirection: E = "none",
              flipAlignment: S = !0,
              ...k
            } = rr(e, t);
          if ((n = l.arrow) != null && n.alignmentOffset) return {};
          const x = sr(o),
            M = Ln(d),
            A = sr(d) === d,
            R = await (f.isRTL == null ? void 0 : f.isRTL(m.floating)),
            P = v || (A || !S ? [tu(d)] : SA(d)),
            V = E !== "none";
          !v && V && P.push(...kA(d, S, E, R));
          const U = [d, ...P],
            z = await f.detectOverflow(t, k),
            B = [];
          let H = ((i = l.flip) == null ? void 0 : i.overflows) || [];
          if ((g && B.push(z[x]), y)) {
            const ae = bA(o, u, R);
            B.push(z[ae[0]], z[ae[1]]);
          }
          if (
            ((H = [...H, { placement: o, overflows: B }]),
            !B.every((ae) => ae <= 0))
          ) {
            var ee, Q;
            const ae = (((ee = l.flip) == null ? void 0 : ee.index) || 0) + 1,
              ye = U[ae];
            if (
              ye &&
              (!(y === "alignment" ? M !== Ln(ye) : !1) ||
                H.every((F) =>
                  Ln(F.placement) === M ? F.overflows[0] > 0 : !0,
                ))
            )
              return {
                data: { index: ae, overflows: H },
                reset: { placement: ye },
              };
            let ue =
              (Q = H.filter((ce) => ce.overflows[0] <= 0).sort(
                (ce, F) => ce.overflows[1] - F.overflows[1],
              )[0]) == null
                ? void 0
                : Q.placement;
            if (!ue)
              switch (C) {
                case "bestFit": {
                  var J;
                  const ce =
                    (J = H.filter((F) => {
                      if (V) {
                        const W = Ln(F.placement);
                        return W === M || W === "y";
                      }
                      return !0;
                    })
                      .map((F) => [
                        F.placement,
                        F.overflows
                          .filter((W) => W > 0)
                          .reduce((W, Z) => W + Z, 0),
                      ])
                      .sort((F, W) => F[1] - W[1])[0]) == null
                      ? void 0
                      : J[0];
                  ce && (ue = ce);
                  break;
                }
                case "initialPlacement":
                  ue = d;
                  break;
              }
            if (o !== ue) return { reset: { placement: ue } };
          }
          return {};
        },
      }
    );
  };
function iv(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width,
  };
}
function ov(e) {
  return vA.some((t) => e[t] >= 0);
}
const RA = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "hide",
        options: e,
        async fn(t) {
          const { rects: n, platform: i } = t,
            { strategy: o = "referenceHidden", ...l } = rr(e, t);
          switch (o) {
            case "referenceHidden": {
              const u = await i.detectOverflow(t, {
                  ...l,
                  elementContext: "reference",
                }),
                d = iv(u, n.reference);
              return {
                data: { referenceHiddenOffsets: d, referenceHidden: ov(d) },
              };
            }
            case "escaped": {
              const u = await i.detectOverflow(t, { ...l, altBoundary: !0 }),
                d = iv(u, n.floating);
              return { data: { escapedOffsets: d, escaped: ov(d) } };
            }
            default:
              return {};
          }
        },
      }
    );
  },
  pb = new Set(["left", "top"]);
async function _A(e, t) {
  const { placement: n, platform: i, elements: o } = e,
    l = await (i.isRTL == null ? void 0 : i.isRTL(o.floating)),
    u = sr(n),
    d = Ai(n),
    f = Ln(n) === "y",
    m = pb.has(u) ? -1 : 1,
    g = l && f ? -1 : 1,
    y = rr(t, e);
  let {
    mainAxis: v,
    crossAxis: C,
    alignmentAxis: E,
  } = typeof y == "number"
    ? { mainAxis: y, crossAxis: 0, alignmentAxis: null }
    : {
        mainAxis: y.mainAxis || 0,
        crossAxis: y.crossAxis || 0,
        alignmentAxis: y.alignmentAxis,
      };
  return (
    d && typeof E == "number" && (C = d === "end" ? E * -1 : E),
    f ? { x: C * g, y: v * m } : { x: v * m, y: C * g }
  );
}
const NA = function (e) {
    return (
      e === void 0 && (e = 0),
      {
        name: "offset",
        options: e,
        async fn(t) {
          var n, i;
          const { x: o, y: l, placement: u, middlewareData: d } = t,
            f = await _A(t, e);
          return u === ((n = d.offset) == null ? void 0 : n.placement) &&
            (i = d.arrow) != null &&
            i.alignmentOffset
            ? {}
            : { x: o + f.x, y: l + f.y, data: { ...f, placement: u } };
        },
      }
    );
  },
  PA = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "shift",
        options: e,
        async fn(t) {
          const { x: n, y: i, placement: o, platform: l } = t,
            {
              mainAxis: u = !0,
              crossAxis: d = !1,
              limiter: f = {
                fn: (x) => {
                  let { x: M, y: A } = x;
                  return { x: M, y: A };
                },
              },
              ...m
            } = rr(e, t),
            g = { x: n, y: i },
            y = await l.detectOverflow(t, m),
            v = Ln(sr(o)),
            C = xh(v);
          let E = g[C],
            S = g[v];
          if (u) {
            const x = C === "y" ? "top" : "left",
              M = C === "y" ? "bottom" : "right",
              A = E + y[x],
              R = E - y[M];
            E = jf(A, E, R);
          }
          if (d) {
            const x = v === "y" ? "top" : "left",
              M = v === "y" ? "bottom" : "right",
              A = S + y[x],
              R = S - y[M];
            S = jf(A, S, R);
          }
          const k = f.fn({ ...t, [C]: E, [v]: S });
          return {
            ...k,
            data: { x: k.x - n, y: k.y - i, enabled: { [C]: u, [v]: d } },
          };
        },
      }
    );
  },
  DA = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        options: e,
        fn(t) {
          const { x: n, y: i, placement: o, rects: l, middlewareData: u } = t,
            { offset: d = 0, mainAxis: f = !0, crossAxis: m = !0 } = rr(e, t),
            g = { x: n, y: i },
            y = Ln(o),
            v = xh(y);
          let C = g[v],
            E = g[y];
          const S = rr(d, t),
            k =
              typeof S == "number"
                ? { mainAxis: S, crossAxis: 0 }
                : { mainAxis: 0, crossAxis: 0, ...S };
          if (f) {
            const A = v === "y" ? "height" : "width",
              R = l.reference[v] - l.floating[A] + k.mainAxis,
              P = l.reference[v] + l.reference[A] - k.mainAxis;
            C < R ? (C = R) : C > P && (C = P);
          }
          if (m) {
            var x, M;
            const A = v === "y" ? "width" : "height",
              R = pb.has(sr(o)),
              P =
                l.reference[y] -
                l.floating[A] +
                ((R && ((x = u.offset) == null ? void 0 : x[y])) || 0) +
                (R ? 0 : k.crossAxis),
              V =
                l.reference[y] +
                l.reference[A] +
                (R ? 0 : ((M = u.offset) == null ? void 0 : M[y]) || 0) -
                (R ? k.crossAxis : 0);
            E < P ? (E = P) : E > V && (E = V);
          }
          return { [v]: C, [y]: E };
        },
      }
    );
  },
  LA = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "size",
        options: e,
        async fn(t) {
          var n, i;
          const { placement: o, rects: l, platform: u, elements: d } = t,
            { apply: f = () => {}, ...m } = rr(e, t),
            g = await u.detectOverflow(t, m),
            y = sr(o),
            v = Ai(o),
            C = Ln(o) === "y",
            { width: E, height: S } = l.floating;
          let k, x;
          y === "top" || y === "bottom"
            ? ((k = y),
              (x =
                v ===
                ((await (u.isRTL == null ? void 0 : u.isRTL(d.floating)))
                  ? "start"
                  : "end")
                  ? "left"
                  : "right"))
            : ((x = y), (k = v === "end" ? "top" : "bottom"));
          const M = S - g.top - g.bottom,
            A = E - g.left - g.right,
            R = Vr(S - g[k], M),
            P = Vr(E - g[x], A),
            V = !t.middlewareData.shift;
          let U = R,
            z = P;
          if (
            ((n = t.middlewareData.shift) != null && n.enabled.x && (z = A),
            (i = t.middlewareData.shift) != null && i.enabled.y && (U = M),
            V && !v)
          ) {
            const H = Yt(g.left, 0),
              ee = Yt(g.right, 0),
              Q = Yt(g.top, 0),
              J = Yt(g.bottom, 0);
            C
              ? (z =
                  E - 2 * (H !== 0 || ee !== 0 ? H + ee : Yt(g.left, g.right)))
              : (U =
                  S - 2 * (Q !== 0 || J !== 0 ? Q + J : Yt(g.top, g.bottom)));
          }
          await f({ ...t, availableWidth: z, availableHeight: U });
          const B = await u.getDimensions(d.floating);
          return E !== B.width || S !== B.height
            ? { reset: { rects: !0 } }
            : {};
        },
      }
    );
  };
function Su() {
  return typeof window < "u";
}
function ji(e) {
  return mb(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Zt(e) {
  var t;
  return (
    (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) ||
    window
  );
}
function zn(e) {
  var t;
  return (t = (mb(e) ? e.ownerDocument : e.document) || window.document) == null
    ? void 0
    : t.documentElement;
}
function mb(e) {
  return Su() ? e instanceof Node || e instanceof Zt(e).Node : !1;
}
function En(e) {
  return Su() ? e instanceof Element || e instanceof Zt(e).Element : !1;
}
function or(e) {
  return Su() ? e instanceof HTMLElement || e instanceof Zt(e).HTMLElement : !1;
}
function av(e) {
  return !Su() || typeof ShadowRoot > "u"
    ? !1
    : e instanceof ShadowRoot || e instanceof Zt(e).ShadowRoot;
}
function Xo(e) {
  const { overflow: t, overflowX: n, overflowY: i, display: o } = xn(e);
  return (
    /auto|scroll|overlay|hidden|clip/.test(t + i + n) &&
    o !== "inline" &&
    o !== "contents"
  );
}
function BA(e) {
  return /^(table|td|th)$/.test(ji(e));
}
function Eu(e) {
  try {
    if (e.matches(":popover-open")) return !0;
  } catch {}
  try {
    return e.matches(":modal");
  } catch {
    return !1;
  }
}
const $A = /transform|translate|scale|rotate|perspective|filter/,
  zA = /paint|layout|strict|content/,
  os = (e) => !!e && e !== "none";
let Yd;
function Oh(e) {
  const t = En(e) ? xn(e) : e;
  return (
    os(t.transform) ||
    os(t.translate) ||
    os(t.scale) ||
    os(t.rotate) ||
    os(t.perspective) ||
    (!Th() && (os(t.backdropFilter) || os(t.filter))) ||
    $A.test(t.willChange || "") ||
    zA.test(t.contain || "")
  );
}
function FA(e) {
  let t = Wr(e);
  for (; or(t) && !Ci(t); ) {
    if (Oh(t)) return t;
    if (Eu(t)) return null;
    t = Wr(t);
  }
  return null;
}
function Th() {
  return (
    Yd == null &&
      (Yd =
        typeof CSS < "u" &&
        CSS.supports &&
        CSS.supports("-webkit-backdrop-filter", "none")),
    Yd
  );
}
function Ci(e) {
  return /^(html|body|#document)$/.test(ji(e));
}
function xn(e) {
  return Zt(e).getComputedStyle(e);
}
function xu(e) {
  return En(e)
    ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
    : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function Wr(e) {
  if (ji(e) === "html") return e;
  const t = e.assignedSlot || e.parentNode || (av(e) && e.host) || zn(e);
  return av(t) ? t.host : t;
}
function gb(e) {
  const t = Wr(e);
  return Ci(t)
    ? e.ownerDocument
      ? e.ownerDocument.body
      : e.body
    : or(t) && Xo(t)
      ? t
      : gb(t);
}
function Uo(e, t, n) {
  var i;
  (t === void 0 && (t = []), n === void 0 && (n = !0));
  const o = gb(e),
    l = o === ((i = e.ownerDocument) == null ? void 0 : i.body),
    u = Zt(o);
  if (l) {
    const d = _f(u);
    return t.concat(
      u,
      u.visualViewport || [],
      Xo(o) ? o : [],
      d && n ? Uo(d) : [],
    );
  } else return t.concat(o, Uo(o, [], n));
}
function _f(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function yb(e) {
  const t = xn(e);
  let n = parseFloat(t.width) || 0,
    i = parseFloat(t.height) || 0;
  const o = or(e),
    l = o ? e.offsetWidth : n,
    u = o ? e.offsetHeight : i,
    d = eu(n) !== l || eu(i) !== u;
  return (d && ((n = l), (i = u)), { width: n, height: i, $: d });
}
function Ih(e) {
  return En(e) ? e : e.contextElement;
}
function wi(e) {
  const t = Ih(e);
  if (!or(t)) return Bn(1);
  const n = t.getBoundingClientRect(),
    { width: i, height: o, $: l } = yb(t);
  let u = (l ? eu(n.width) : n.width) / i,
    d = (l ? eu(n.height) : n.height) / o;
  return (
    (!u || !Number.isFinite(u)) && (u = 1),
    (!d || !Number.isFinite(d)) && (d = 1),
    { x: u, y: d }
  );
}
const UA = Bn(0);
function vb(e) {
  const t = Zt(e);
  return !Th() || !t.visualViewport
    ? UA
    : { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop };
}
function VA(e, t, n) {
  return (t === void 0 && (t = !1), !n || (t && n !== Zt(e)) ? !1 : t);
}
function Cs(e, t, n, i) {
  (t === void 0 && (t = !1), n === void 0 && (n = !1));
  const o = e.getBoundingClientRect(),
    l = Ih(e);
  let u = Bn(1);
  t && (i ? En(i) && (u = wi(i)) : (u = wi(e)));
  const d = VA(l, n, i) ? vb(l) : Bn(0);
  let f = (o.left + d.x) / u.x,
    m = (o.top + d.y) / u.y,
    g = o.width / u.x,
    y = o.height / u.y;
  if (l) {
    const v = Zt(l),
      C = i && En(i) ? Zt(i) : i;
    let E = v,
      S = _f(E);
    for (; S && i && C !== E; ) {
      const k = wi(S),
        x = S.getBoundingClientRect(),
        M = xn(S),
        A = x.left + (S.clientLeft + parseFloat(M.paddingLeft)) * k.x,
        R = x.top + (S.clientTop + parseFloat(M.paddingTop)) * k.y;
      ((f *= k.x),
        (m *= k.y),
        (g *= k.x),
        (y *= k.y),
        (f += A),
        (m += R),
        (E = Zt(S)),
        (S = _f(E)));
    }
  }
  return nu({ width: g, height: y, x: f, y: m });
}
function Cu(e, t) {
  const n = xu(e).scrollLeft;
  return t ? t.left + n : Cs(zn(e)).left + n;
}
function wb(e, t) {
  const n = e.getBoundingClientRect(),
    i = n.left + t.scrollLeft - Cu(e, n),
    o = n.top + t.scrollTop;
  return { x: i, y: o };
}
function WA(e) {
  let { elements: t, rect: n, offsetParent: i, strategy: o } = e;
  const l = o === "fixed",
    u = zn(i),
    d = t ? Eu(t.floating) : !1;
  if (i === u || (d && l)) return n;
  let f = { scrollLeft: 0, scrollTop: 0 },
    m = Bn(1);
  const g = Bn(0),
    y = or(i);
  if ((y || (!y && !l)) && ((ji(i) !== "body" || Xo(u)) && (f = xu(i)), y)) {
    const C = Cs(i);
    ((m = wi(i)), (g.x = C.x + i.clientLeft), (g.y = C.y + i.clientTop));
  }
  const v = u && !y && !l ? wb(u, f) : Bn(0);
  return {
    width: n.width * m.x,
    height: n.height * m.y,
    x: n.x * m.x - f.scrollLeft * m.x + g.x + v.x,
    y: n.y * m.y - f.scrollTop * m.y + g.y + v.y,
  };
}
function HA(e) {
  return Array.from(e.getClientRects());
}
function KA(e) {
  const t = zn(e),
    n = xu(e),
    i = e.ownerDocument.body,
    o = Yt(t.scrollWidth, t.clientWidth, i.scrollWidth, i.clientWidth),
    l = Yt(t.scrollHeight, t.clientHeight, i.scrollHeight, i.clientHeight);
  let u = -n.scrollLeft + Cu(e);
  const d = -n.scrollTop;
  return (
    xn(i).direction === "rtl" && (u += Yt(t.clientWidth, i.clientWidth) - o),
    { width: o, height: l, x: u, y: d }
  );
}
const lv = 25;
function GA(e, t) {
  const n = Zt(e),
    i = zn(e),
    o = n.visualViewport;
  let l = i.clientWidth,
    u = i.clientHeight,
    d = 0,
    f = 0;
  if (o) {
    ((l = o.width), (u = o.height));
    const g = Th();
    (!g || (g && t === "fixed")) && ((d = o.offsetLeft), (f = o.offsetTop));
  }
  const m = Cu(i);
  if (m <= 0) {
    const g = i.ownerDocument,
      y = g.body,
      v = getComputedStyle(y),
      C =
        (g.compatMode === "CSS1Compat" &&
          parseFloat(v.marginLeft) + parseFloat(v.marginRight)) ||
        0,
      E = Math.abs(i.clientWidth - y.clientWidth - C);
    E <= lv && (l -= E);
  } else m <= lv && (l += m);
  return { width: l, height: u, x: d, y: f };
}
function qA(e, t) {
  const n = Cs(e, !0, t === "fixed"),
    i = n.top + e.clientTop,
    o = n.left + e.clientLeft,
    l = or(e) ? wi(e) : Bn(1),
    u = e.clientWidth * l.x,
    d = e.clientHeight * l.y,
    f = o * l.x,
    m = i * l.y;
  return { width: u, height: d, x: f, y: m };
}
function uv(e, t, n) {
  let i;
  if (t === "viewport") i = GA(e, n);
  else if (t === "document") i = KA(zn(e));
  else if (En(t)) i = qA(t, n);
  else {
    const o = vb(e);
    i = { x: t.x - o.x, y: t.y - o.y, width: t.width, height: t.height };
  }
  return nu(i);
}
function bb(e, t) {
  const n = Wr(e);
  return n === t || !En(n) || Ci(n)
    ? !1
    : xn(n).position === "fixed" || bb(n, t);
}
function QA(e, t) {
  const n = t.get(e);
  if (n) return n;
  let i = Uo(e, [], !1).filter((d) => En(d) && ji(d) !== "body"),
    o = null;
  const l = xn(e).position === "fixed";
  let u = l ? Wr(e) : e;
  for (; En(u) && !Ci(u); ) {
    const d = xn(u),
      f = Oh(u);
    (!f && d.position === "fixed" && (o = null),
      (
        l
          ? !f && !o
          : (!f &&
              d.position === "static" &&
              !!o &&
              (o.position === "absolute" || o.position === "fixed")) ||
            (Xo(u) && !f && bb(e, u))
      )
        ? (i = i.filter((g) => g !== u))
        : (o = d),
      (u = Wr(u)));
  }
  return (t.set(e, i), i);
}
function YA(e) {
  let { element: t, boundary: n, rootBoundary: i, strategy: o } = e;
  const u = [
      ...(n === "clippingAncestors"
        ? Eu(t)
          ? []
          : QA(t, this._c)
        : [].concat(n)),
      i,
    ],
    d = uv(t, u[0], o);
  let f = d.top,
    m = d.right,
    g = d.bottom,
    y = d.left;
  for (let v = 1; v < u.length; v++) {
    const C = uv(t, u[v], o);
    ((f = Yt(C.top, f)),
      (m = Vr(C.right, m)),
      (g = Vr(C.bottom, g)),
      (y = Yt(C.left, y)));
  }
  return { width: m - y, height: g - f, x: y, y: f };
}
function XA(e) {
  const { width: t, height: n } = yb(e);
  return { width: t, height: n };
}
function ZA(e, t, n) {
  const i = or(t),
    o = zn(t),
    l = n === "fixed",
    u = Cs(e, !0, l, t);
  let d = { scrollLeft: 0, scrollTop: 0 };
  const f = Bn(0);
  function m() {
    f.x = Cu(o);
  }
  if (i || (!i && !l))
    if (((ji(t) !== "body" || Xo(o)) && (d = xu(t)), i)) {
      const C = Cs(t, !0, l, t);
      ((f.x = C.x + t.clientLeft), (f.y = C.y + t.clientTop));
    } else o && m();
  l && !i && o && m();
  const g = o && !i && !l ? wb(o, d) : Bn(0),
    y = u.left + d.scrollLeft - f.x - g.x,
    v = u.top + d.scrollTop - f.y - g.y;
  return { x: y, y: v, width: u.width, height: u.height };
}
function Xd(e) {
  return xn(e).position === "static";
}
function cv(e, t) {
  if (!or(e) || xn(e).position === "fixed") return null;
  if (t) return t(e);
  let n = e.offsetParent;
  return (zn(e) === n && (n = n.ownerDocument.body), n);
}
function Sb(e, t) {
  const n = Zt(e);
  if (Eu(e)) return n;
  if (!or(e)) {
    let o = Wr(e);
    for (; o && !Ci(o); ) {
      if (En(o) && !Xd(o)) return o;
      o = Wr(o);
    }
    return n;
  }
  let i = cv(e, t);
  for (; i && BA(i) && Xd(i); ) i = cv(i, t);
  return i && Ci(i) && Xd(i) && !Oh(i) ? n : i || FA(e) || n;
}
const JA = async function (e) {
  const t = this.getOffsetParent || Sb,
    n = this.getDimensions,
    i = await n(e.floating);
  return {
    reference: ZA(e.reference, await t(e.floating), e.strategy),
    floating: { x: 0, y: 0, width: i.width, height: i.height },
  };
};
function ej(e) {
  return xn(e).direction === "rtl";
}
const tj = {
  convertOffsetParentRelativeRectToViewportRelativeRect: WA,
  getDocumentElement: zn,
  getClippingRect: YA,
  getOffsetParent: Sb,
  getElementRects: JA,
  getClientRects: HA,
  getDimensions: XA,
  getScale: wi,
  isElement: En,
  isRTL: ej,
};
function Eb(e, t) {
  return (
    e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height
  );
}
function nj(e, t) {
  let n = null,
    i;
  const o = zn(e);
  function l() {
    var d;
    (clearTimeout(i), (d = n) == null || d.disconnect(), (n = null));
  }
  function u(d, f) {
    (d === void 0 && (d = !1), f === void 0 && (f = 1), l());
    const m = e.getBoundingClientRect(),
      { left: g, top: y, width: v, height: C } = m;
    if ((d || t(), !v || !C)) return;
    const E = El(y),
      S = El(o.clientWidth - (g + v)),
      k = El(o.clientHeight - (y + C)),
      x = El(g),
      A = {
        rootMargin: -E + "px " + -S + "px " + -k + "px " + -x + "px",
        threshold: Yt(0, Vr(1, f)) || 1,
      };
    let R = !0;
    function P(V) {
      const U = V[0].intersectionRatio;
      if (U !== f) {
        if (!R) return u();
        U
          ? u(!1, U)
          : (i = setTimeout(() => {
              u(!1, 1e-7);
            }, 1e3));
      }
      (U === 1 && !Eb(m, e.getBoundingClientRect()) && u(), (R = !1));
    }
    try {
      n = new IntersectionObserver(P, { ...A, root: o.ownerDocument });
    } catch {
      n = new IntersectionObserver(P, A);
    }
    n.observe(e);
  }
  return (u(!0), l);
}
function rj(e, t, n, i) {
  i === void 0 && (i = {});
  const {
      ancestorScroll: o = !0,
      ancestorResize: l = !0,
      elementResize: u = typeof ResizeObserver == "function",
      layoutShift: d = typeof IntersectionObserver == "function",
      animationFrame: f = !1,
    } = i,
    m = Ih(e),
    g = o || l ? [...(m ? Uo(m) : []), ...(t ? Uo(t) : [])] : [];
  g.forEach((x) => {
    (o && x.addEventListener("scroll", n, { passive: !0 }),
      l && x.addEventListener("resize", n));
  });
  const y = m && d ? nj(m, n) : null;
  let v = -1,
    C = null;
  u &&
    ((C = new ResizeObserver((x) => {
      let [M] = x;
      (M &&
        M.target === m &&
        C &&
        t &&
        (C.unobserve(t),
        cancelAnimationFrame(v),
        (v = requestAnimationFrame(() => {
          var A;
          (A = C) == null || A.observe(t);
        }))),
        n());
    })),
    m && !f && C.observe(m),
    t && C.observe(t));
  let E,
    S = f ? Cs(e) : null;
  f && k();
  function k() {
    const x = Cs(e);
    (S && !Eb(S, x) && n(), (S = x), (E = requestAnimationFrame(k)));
  }
  return (
    n(),
    () => {
      var x;
      (g.forEach((M) => {
        (o && M.removeEventListener("scroll", n),
          l && M.removeEventListener("resize", n));
      }),
        y?.(),
        (x = C) == null || x.disconnect(),
        (C = null),
        f && cancelAnimationFrame(E));
    }
  );
}
const sj = NA,
  ij = PA,
  oj = jA,
  aj = LA,
  lj = RA,
  dv = AA,
  uj = DA,
  cj = (e, t, n) => {
    const i = new Map(),
      o = { platform: tj, ...n },
      l = { ...o.platform, _c: i };
    return MA(e, t, { ...o, platform: l });
  };
var dj = typeof document < "u",
  fj = function () {},
  Dl = dj ? w.useLayoutEffect : fj;
function ru(e, t) {
  if (e === t) return !0;
  if (typeof e != typeof t) return !1;
  if (typeof e == "function" && e.toString() === t.toString()) return !0;
  let n, i, o;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (((n = e.length), n !== t.length)) return !1;
      for (i = n; i-- !== 0; ) if (!ru(e[i], t[i])) return !1;
      return !0;
    }
    if (((o = Object.keys(e)), (n = o.length), n !== Object.keys(t).length))
      return !1;
    for (i = n; i-- !== 0; ) if (!{}.hasOwnProperty.call(t, o[i])) return !1;
    for (i = n; i-- !== 0; ) {
      const l = o[i];
      if (!(l === "_owner" && e.$$typeof) && !ru(e[l], t[l])) return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function xb(e) {
  return typeof window > "u"
    ? 1
    : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function fv(e, t) {
  const n = xb(e);
  return Math.round(t * n) / n;
}
function Zd(e) {
  const t = w.useRef(e);
  return (
    Dl(() => {
      t.current = e;
    }),
    t
  );
}
function hj(e) {
  e === void 0 && (e = {});
  const {
      placement: t = "bottom",
      strategy: n = "absolute",
      middleware: i = [],
      platform: o,
      elements: { reference: l, floating: u } = {},
      transform: d = !0,
      whileElementsMounted: f,
      open: m,
    } = e,
    [g, y] = w.useState({
      x: 0,
      y: 0,
      strategy: n,
      placement: t,
      middlewareData: {},
      isPositioned: !1,
    }),
    [v, C] = w.useState(i);
  ru(v, i) || C(i);
  const [E, S] = w.useState(null),
    [k, x] = w.useState(null),
    M = w.useCallback((F) => {
      F !== V.current && ((V.current = F), S(F));
    }, []),
    A = w.useCallback((F) => {
      F !== U.current && ((U.current = F), x(F));
    }, []),
    R = l || E,
    P = u || k,
    V = w.useRef(null),
    U = w.useRef(null),
    z = w.useRef(g),
    B = f != null,
    H = Zd(f),
    ee = Zd(o),
    Q = Zd(m),
    J = w.useCallback(() => {
      if (!V.current || !U.current) return;
      const F = { placement: t, strategy: n, middleware: v };
      (ee.current && (F.platform = ee.current),
        cj(V.current, U.current, F).then((W) => {
          const Z = { ...W, isPositioned: Q.current !== !1 };
          ae.current &&
            !ru(z.current, Z) &&
            ((z.current = Z),
            qf.flushSync(() => {
              y(Z);
            }));
        }));
    }, [v, t, n, ee, Q]);
  Dl(() => {
    m === !1 &&
      z.current.isPositioned &&
      ((z.current.isPositioned = !1), y((F) => ({ ...F, isPositioned: !1 })));
  }, [m]);
  const ae = w.useRef(!1);
  (Dl(
    () => (
      (ae.current = !0),
      () => {
        ae.current = !1;
      }
    ),
    [],
  ),
    Dl(() => {
      if ((R && (V.current = R), P && (U.current = P), R && P)) {
        if (H.current) return H.current(R, P, J);
        J();
      }
    }, [R, P, J, H, B]));
  const ye = w.useMemo(
      () => ({ reference: V, floating: U, setReference: M, setFloating: A }),
      [M, A],
    ),
    ue = w.useMemo(() => ({ reference: R, floating: P }), [R, P]),
    ce = w.useMemo(() => {
      const F = { position: n, left: 0, top: 0 };
      if (!ue.floating) return F;
      const W = fv(ue.floating, g.x),
        Z = fv(ue.floating, g.y);
      return d
        ? {
            ...F,
            transform: "translate(" + W + "px, " + Z + "px)",
            ...(xb(ue.floating) >= 1.5 && { willChange: "transform" }),
          }
        : { position: n, left: W, top: Z };
    }, [n, d, ue.floating, g.x, g.y]);
  return w.useMemo(
    () => ({ ...g, update: J, refs: ye, elements: ue, floatingStyles: ce }),
    [g, J, ye, ue, ce],
  );
}
const pj = (e) => {
    function t(n) {
      return {}.hasOwnProperty.call(n, "current");
    }
    return {
      name: "arrow",
      options: e,
      fn(n) {
        const { element: i, padding: o } = typeof e == "function" ? e(n) : e;
        return i && t(i)
          ? i.current != null
            ? dv({ element: i.current, padding: o }).fn(n)
            : {}
          : i
            ? dv({ element: i, padding: o }).fn(n)
            : {};
      },
    };
  },
  mj = (e, t) => {
    const n = sj(e);
    return { name: n.name, fn: n.fn, options: [e, t] };
  },
  gj = (e, t) => {
    const n = ij(e);
    return { name: n.name, fn: n.fn, options: [e, t] };
  },
  yj = (e, t) => ({ fn: uj(e).fn, options: [e, t] }),
  vj = (e, t) => {
    const n = oj(e);
    return { name: n.name, fn: n.fn, options: [e, t] };
  },
  wj = (e, t) => {
    const n = aj(e);
    return { name: n.name, fn: n.fn, options: [e, t] };
  },
  bj = (e, t) => {
    const n = lj(e);
    return { name: n.name, fn: n.fn, options: [e, t] };
  },
  Sj = (e, t) => {
    const n = pj(e);
    return { name: n.name, fn: n.fn, options: [e, t] };
  };
var Ej = "Arrow",
  Cb = w.forwardRef((e, t) => {
    const { children: n, width: i = 10, height: o = 5, ...l } = e;
    return O.jsx(Ge.svg, {
      ...l,
      ref: t,
      width: i,
      height: o,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : O.jsx("polygon", { points: "0,0 30,0 15,10" }),
    });
  });
Cb.displayName = Ej;
var xj = Cb;
function Cj(e) {
  const [t, n] = w.useState(void 0);
  return (
    Br(() => {
      if (e) {
        n({ width: e.offsetWidth, height: e.offsetHeight });
        const i = new ResizeObserver((o) => {
          if (!Array.isArray(o) || !o.length) return;
          const l = o[0];
          let u, d;
          if ("borderBoxSize" in l) {
            const f = l.borderBoxSize,
              m = Array.isArray(f) ? f[0] : f;
            ((u = m.inlineSize), (d = m.blockSize));
          } else ((u = e.offsetWidth), (d = e.offsetHeight));
          n({ width: u, height: d });
        });
        return (i.observe(e, { box: "border-box" }), () => i.unobserve(e));
      } else n(void 0);
    }, [e]),
    t
  );
}
var Mh = "Popper",
  [kb, ku] = ks(Mh),
  [kj, Ob] = kb(Mh),
  Tb = (e) => {
    const { __scopePopper: t, children: n } = e,
      [i, o] = w.useState(null);
    return O.jsx(kj, { scope: t, anchor: i, onAnchorChange: o, children: n });
  };
Tb.displayName = Mh;
var Ib = "PopperAnchor",
  Mb = w.forwardRef((e, t) => {
    const { __scopePopper: n, virtualRef: i, ...o } = e,
      l = Ob(Ib, n),
      u = w.useRef(null),
      d = st(t, u),
      f = w.useRef(null);
    return (
      w.useEffect(() => {
        const m = f.current;
        ((f.current = i?.current || u.current),
          m !== f.current && l.onAnchorChange(f.current));
      }),
      i ? null : O.jsx(Ge.div, { ...o, ref: d })
    );
  });
Mb.displayName = Ib;
var Ah = "PopperContent",
  [Oj, Tj] = kb(Ah),
  Ab = w.forwardRef((e, t) => {
    const {
        __scopePopper: n,
        side: i = "bottom",
        sideOffset: o = 0,
        align: l = "center",
        alignOffset: u = 0,
        arrowPadding: d = 0,
        avoidCollisions: f = !0,
        collisionBoundary: m = [],
        collisionPadding: g = 0,
        sticky: y = "partial",
        hideWhenDetached: v = !1,
        updatePositionStrategy: C = "optimized",
        onPlaced: E,
        ...S
      } = e,
      k = Ob(Ah, n),
      [x, M] = w.useState(null),
      A = st(t, (ve) => M(ve)),
      [R, P] = w.useState(null),
      V = Cj(R),
      U = V?.width ?? 0,
      z = V?.height ?? 0,
      B = i + (l !== "center" ? "-" + l : ""),
      H =
        typeof g == "number"
          ? g
          : { top: 0, right: 0, bottom: 0, left: 0, ...g },
      ee = Array.isArray(m) ? m : [m],
      Q = ee.length > 0,
      J = { padding: H, boundary: ee.filter(Mj), altBoundary: Q },
      {
        refs: ae,
        floatingStyles: ye,
        placement: ue,
        isPositioned: ce,
        middlewareData: F,
      } = hj({
        strategy: "fixed",
        placement: B,
        whileElementsMounted: (...ve) =>
          rj(...ve, { animationFrame: C === "always" }),
        elements: { reference: k.anchor },
        middleware: [
          mj({ mainAxis: o + z, alignmentAxis: u }),
          f &&
            gj({
              mainAxis: !0,
              crossAxis: !1,
              limiter: y === "partial" ? yj() : void 0,
              ...J,
            }),
          f && vj({ ...J }),
          wj({
            ...J,
            apply: ({
              elements: ve,
              rects: Oe,
              availableWidth: Re,
              availableHeight: Ct,
            }) => {
              const { width: Ms, height: sa } = Oe.reference,
                Fn = ve.floating.style;
              (Fn.setProperty("--radix-popper-available-width", `${Re}px`),
                Fn.setProperty("--radix-popper-available-height", `${Ct}px`),
                Fn.setProperty("--radix-popper-anchor-width", `${Ms}px`),
                Fn.setProperty("--radix-popper-anchor-height", `${sa}px`));
            },
          }),
          R && Sj({ element: R, padding: d }),
          Aj({ arrowWidth: U, arrowHeight: z }),
          v && bj({ strategy: "referenceHidden", ...J }),
        ],
      }),
      [W, Z] = _b(ue),
      N = tr(E);
    Br(() => {
      ce && N?.();
    }, [ce, N]);
    const K = F.arrow?.x,
      he = F.arrow?.y,
      be = F.arrow?.centerOffset !== 0,
      [Ce, Se] = w.useState();
    return (
      Br(() => {
        x && Se(window.getComputedStyle(x).zIndex);
      }, [x]),
      O.jsx("div", {
        ref: ae.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...ye,
          transform: ce ? ye.transform : "translate(0, -200%)",
          minWidth: "max-content",
          zIndex: Ce,
          "--radix-popper-transform-origin": [
            F.transformOrigin?.x,
            F.transformOrigin?.y,
          ].join(" "),
          ...(F.hide?.referenceHidden && {
            visibility: "hidden",
            pointerEvents: "none",
          }),
        },
        dir: e.dir,
        children: O.jsx(Oj, {
          scope: n,
          placedSide: W,
          onArrowChange: P,
          arrowX: K,
          arrowY: he,
          shouldHideArrow: be,
          children: O.jsx(Ge.div, {
            "data-side": W,
            "data-align": Z,
            ...S,
            ref: A,
            style: { ...S.style, animation: ce ? void 0 : "none" },
          }),
        }),
      })
    );
  });
Ab.displayName = Ah;
var jb = "PopperArrow",
  Ij = { top: "bottom", right: "left", bottom: "top", left: "right" },
  Rb = w.forwardRef(function (t, n) {
    const { __scopePopper: i, ...o } = t,
      l = Tj(jb, i),
      u = Ij[l.placedSide];
    return O.jsx("span", {
      ref: l.onArrowChange,
      style: {
        position: "absolute",
        left: l.arrowX,
        top: l.arrowY,
        [u]: 0,
        transformOrigin: {
          top: "",
          right: "0 0",
          bottom: "center 0",
          left: "100% 0",
        }[l.placedSide],
        transform: {
          top: "translateY(100%)",
          right: "translateY(50%) rotate(90deg) translateX(-50%)",
          bottom: "rotate(180deg)",
          left: "translateY(50%) rotate(-90deg) translateX(50%)",
        }[l.placedSide],
        visibility: l.shouldHideArrow ? "hidden" : void 0,
      },
      children: O.jsx(xj, {
        ...o,
        ref: n,
        style: { ...o.style, display: "block" },
      }),
    });
  });
Rb.displayName = jb;
function Mj(e) {
  return e !== null;
}
var Aj = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    const { placement: n, rects: i, middlewareData: o } = t,
      u = o.arrow?.centerOffset !== 0,
      d = u ? 0 : e.arrowWidth,
      f = u ? 0 : e.arrowHeight,
      [m, g] = _b(n),
      y = { start: "0%", center: "50%", end: "100%" }[g],
      v = (o.arrow?.x ?? 0) + d / 2,
      C = (o.arrow?.y ?? 0) + f / 2;
    let E = "",
      S = "";
    return (
      m === "bottom"
        ? ((E = u ? y : `${v}px`), (S = `${-f}px`))
        : m === "top"
          ? ((E = u ? y : `${v}px`), (S = `${i.floating.height + f}px`))
          : m === "right"
            ? ((E = `${-f}px`), (S = u ? y : `${C}px`))
            : m === "left" &&
              ((E = `${i.floating.width + f}px`), (S = u ? y : `${C}px`)),
      { data: { x: E, y: S } }
    );
  },
});
function _b(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var jj = Tb,
  Nb = Mb,
  Pb = Ab,
  Db = Rb,
  Jd = "rovingFocusGroup.onEntryFocus",
  Rj = { bubbles: !1, cancelable: !0 },
  Zo = "RovingFocusGroup",
  [Nf, Lb, _j] = cb(Zo),
  [Nj, Bb] = ks(Zo, [_j]),
  [Pj, Dj] = Nj(Zo),
  $b = w.forwardRef((e, t) =>
    O.jsx(Nf.Provider, {
      scope: e.__scopeRovingFocusGroup,
      children: O.jsx(Nf.Slot, {
        scope: e.__scopeRovingFocusGroup,
        children: O.jsx(Lj, { ...e, ref: t }),
      }),
    }),
  );
$b.displayName = Zo;
var Lj = w.forwardRef((e, t) => {
    const {
        __scopeRovingFocusGroup: n,
        orientation: i,
        loop: o = !1,
        dir: l,
        currentTabStopId: u,
        defaultCurrentTabStopId: d,
        onCurrentTabStopIdChange: f,
        onEntryFocus: m,
        preventScrollOnEntryFocus: g = !1,
        ...y
      } = e,
      v = w.useRef(null),
      C = st(t, v),
      E = fb(l),
      [S, k] = Gf({ prop: u, defaultProp: d ?? null, onChange: f, caller: Zo }),
      [x, M] = w.useState(!1),
      A = tr(m),
      R = Lb(n),
      P = w.useRef(!1),
      [V, U] = w.useState(0);
    return (
      w.useEffect(() => {
        const z = v.current;
        if (z)
          return (
            z.addEventListener(Jd, A),
            () => z.removeEventListener(Jd, A)
          );
      }, [A]),
      O.jsx(Pj, {
        scope: n,
        orientation: i,
        dir: E,
        loop: o,
        currentTabStopId: S,
        onItemFocus: w.useCallback((z) => k(z), [k]),
        onItemShiftTab: w.useCallback(() => M(!0), []),
        onFocusableItemAdd: w.useCallback(() => U((z) => z + 1), []),
        onFocusableItemRemove: w.useCallback(() => U((z) => z - 1), []),
        children: O.jsx(Ge.div, {
          tabIndex: x || V === 0 ? -1 : 0,
          "data-orientation": i,
          ...y,
          ref: C,
          style: { outline: "none", ...e.style },
          onMouseDown: we(e.onMouseDown, () => {
            P.current = !0;
          }),
          onFocus: we(e.onFocus, (z) => {
            const B = !P.current;
            if (z.target === z.currentTarget && B && !x) {
              const H = new CustomEvent(Jd, Rj);
              if ((z.currentTarget.dispatchEvent(H), !H.defaultPrevented)) {
                const ee = R().filter((ue) => ue.focusable),
                  Q = ee.find((ue) => ue.active),
                  J = ee.find((ue) => ue.id === S),
                  ye = [Q, J, ...ee]
                    .filter(Boolean)
                    .map((ue) => ue.ref.current);
                Ub(ye, g);
              }
            }
            P.current = !1;
          }),
          onBlur: we(e.onBlur, () => M(!1)),
        }),
      })
    );
  }),
  zb = "RovingFocusGroupItem",
  Fb = w.forwardRef((e, t) => {
    const {
        __scopeRovingFocusGroup: n,
        focusable: i = !0,
        active: o = !1,
        tabStopId: l,
        children: u,
        ...d
      } = e,
      f = gi(),
      m = l || f,
      g = Dj(zb, n),
      y = g.currentTabStopId === m,
      v = Lb(n),
      {
        onFocusableItemAdd: C,
        onFocusableItemRemove: E,
        currentTabStopId: S,
      } = g;
    return (
      w.useEffect(() => {
        if (i) return (C(), () => E());
      }, [i, C, E]),
      O.jsx(Nf.ItemSlot, {
        scope: n,
        id: m,
        focusable: i,
        active: o,
        children: O.jsx(Ge.span, {
          tabIndex: y ? 0 : -1,
          "data-orientation": g.orientation,
          ...d,
          ref: t,
          onMouseDown: we(e.onMouseDown, (k) => {
            i ? g.onItemFocus(m) : k.preventDefault();
          }),
          onFocus: we(e.onFocus, () => g.onItemFocus(m)),
          onKeyDown: we(e.onKeyDown, (k) => {
            if (k.key === "Tab" && k.shiftKey) {
              g.onItemShiftTab();
              return;
            }
            if (k.target !== k.currentTarget) return;
            const x = zj(k, g.orientation, g.dir);
            if (x !== void 0) {
              if (k.metaKey || k.ctrlKey || k.altKey || k.shiftKey) return;
              k.preventDefault();
              let A = v()
                .filter((R) => R.focusable)
                .map((R) => R.ref.current);
              if (x === "last") A.reverse();
              else if (x === "prev" || x === "next") {
                x === "prev" && A.reverse();
                const R = A.indexOf(k.currentTarget);
                A = g.loop ? Fj(A, R + 1) : A.slice(R + 1);
              }
              setTimeout(() => Ub(A));
            }
          }),
          children:
            typeof u == "function"
              ? u({ isCurrentTabStop: y, hasTabStop: S != null })
              : u,
        }),
      })
    );
  });
Fb.displayName = zb;
var Bj = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last",
};
function $j(e, t) {
  return t !== "rtl"
    ? e
    : e === "ArrowLeft"
      ? "ArrowRight"
      : e === "ArrowRight"
        ? "ArrowLeft"
        : e;
}
function zj(e, t, n) {
  const i = $j(e.key, n);
  if (
    !(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(i)) &&
    !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(i))
  )
    return Bj[i];
}
function Ub(e, t = !1) {
  const n = document.activeElement;
  for (const i of e)
    if (
      i === n ||
      (i.focus({ preventScroll: t }), document.activeElement !== n)
    )
      return;
}
function Fj(e, t) {
  return e.map((n, i) => e[(t + i) % e.length]);
}
var Uj = $b,
  Vj = Fb,
  Pf = ["Enter", " "],
  Wj = ["ArrowDown", "PageUp", "Home"],
  Vb = ["ArrowUp", "PageDown", "End"],
  Hj = [...Wj, ...Vb],
  Kj = { ltr: [...Pf, "ArrowRight"], rtl: [...Pf, "ArrowLeft"] },
  Gj = { ltr: ["ArrowLeft"], rtl: ["ArrowRight"] },
  Jo = "Menu",
  [Vo, qj, Qj] = cb(Jo),
  [Os, Wb] = ks(Jo, [Qj, ku, Bb]),
  Ou = ku(),
  Hb = Bb(),
  [Yj, Ts] = Os(Jo),
  [Xj, ea] = Os(Jo),
  Kb = (e) => {
    const {
        __scopeMenu: t,
        open: n = !1,
        children: i,
        dir: o,
        onOpenChange: l,
        modal: u = !0,
      } = e,
      d = Ou(t),
      [f, m] = w.useState(null),
      g = w.useRef(!1),
      y = tr(l),
      v = fb(o);
    return (
      w.useEffect(() => {
        const C = () => {
            ((g.current = !0),
              document.addEventListener("pointerdown", E, {
                capture: !0,
                once: !0,
              }),
              document.addEventListener("pointermove", E, {
                capture: !0,
                once: !0,
              }));
          },
          E = () => (g.current = !1);
        return (
          document.addEventListener("keydown", C, { capture: !0 }),
          () => {
            (document.removeEventListener("keydown", C, { capture: !0 }),
              document.removeEventListener("pointerdown", E, { capture: !0 }),
              document.removeEventListener("pointermove", E, { capture: !0 }));
          }
        );
      }, []),
      O.jsx(jj, {
        ...d,
        children: O.jsx(Yj, {
          scope: t,
          open: n,
          onOpenChange: y,
          content: f,
          onContentChange: m,
          children: O.jsx(Xj, {
            scope: t,
            onClose: w.useCallback(() => y(!1), [y]),
            isUsingKeyboardRef: g,
            dir: v,
            modal: u,
            children: i,
          }),
        }),
      })
    );
  };
Kb.displayName = Jo;
var Zj = "MenuAnchor",
  jh = w.forwardRef((e, t) => {
    const { __scopeMenu: n, ...i } = e,
      o = Ou(n);
    return O.jsx(Nb, { ...o, ...i, ref: t });
  });
jh.displayName = Zj;
var Rh = "MenuPortal",
  [Jj, Gb] = Os(Rh, { forceMount: void 0 }),
  qb = (e) => {
    const { __scopeMenu: t, forceMount: n, children: i, container: o } = e,
      l = Ts(Rh, t);
    return O.jsx(Jj, {
      scope: t,
      forceMount: n,
      children: O.jsx(ir, {
        present: n || l.open,
        children: O.jsx(Yf, { asChild: !0, container: o, children: i }),
      }),
    });
  };
qb.displayName = Rh;
var un = "MenuContent",
  [e2, _h] = Os(un),
  Qb = w.forwardRef((e, t) => {
    const n = Gb(un, e.__scopeMenu),
      { forceMount: i = n.forceMount, ...o } = e,
      l = Ts(un, e.__scopeMenu),
      u = ea(un, e.__scopeMenu);
    return O.jsx(Vo.Provider, {
      scope: e.__scopeMenu,
      children: O.jsx(ir, {
        present: i || l.open,
        children: O.jsx(Vo.Slot, {
          scope: e.__scopeMenu,
          children: u.modal
            ? O.jsx(t2, { ...o, ref: t })
            : O.jsx(n2, { ...o, ref: t }),
        }),
      }),
    });
  }),
  t2 = w.forwardRef((e, t) => {
    const n = Ts(un, e.__scopeMenu),
      i = w.useRef(null),
      o = st(t, i);
    return (
      w.useEffect(() => {
        const l = i.current;
        if (l) return fw(l);
      }, []),
      O.jsx(Nh, {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: n.open,
        disableOutsideScroll: !0,
        onFocusOutside: we(e.onFocusOutside, (l) => l.preventDefault(), {
          checkForDefaultPrevented: !1,
        }),
        onDismiss: () => n.onOpenChange(!1),
      })
    );
  }),
  n2 = w.forwardRef((e, t) => {
    const n = Ts(un, e.__scopeMenu);
    return O.jsx(Nh, {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => n.onOpenChange(!1),
    });
  }),
  r2 = Si("MenuContent.ScrollLock"),
  Nh = w.forwardRef((e, t) => {
    const {
        __scopeMenu: n,
        loop: i = !1,
        trapFocus: o,
        onOpenAutoFocus: l,
        onCloseAutoFocus: u,
        disableOutsidePointerEvents: d,
        onEntryFocus: f,
        onEscapeKeyDown: m,
        onPointerDownOutside: g,
        onFocusOutside: y,
        onInteractOutside: v,
        onDismiss: C,
        disableOutsideScroll: E,
        ...S
      } = e,
      k = Ts(un, n),
      x = ea(un, n),
      M = Ou(n),
      A = Hb(n),
      R = qj(n),
      [P, V] = w.useState(null),
      U = w.useRef(null),
      z = st(t, U, k.onContentChange),
      B = w.useRef(0),
      H = w.useRef(""),
      ee = w.useRef(0),
      Q = w.useRef(null),
      J = w.useRef("right"),
      ae = w.useRef(0),
      ye = E ? Xf : w.Fragment,
      ue = E ? { as: r2, allowPinchZoom: !0 } : void 0,
      ce = (W) => {
        const Z = H.current + W,
          N = R().filter((ve) => !ve.disabled),
          K = document.activeElement,
          he = N.find((ve) => ve.ref.current === K)?.textValue,
          be = N.map((ve) => ve.textValue),
          Ce = m2(be, Z, he),
          Se = N.find((ve) => ve.textValue === Ce)?.ref.current;
        ((function ve(Oe) {
          ((H.current = Oe),
            window.clearTimeout(B.current),
            Oe !== "" && (B.current = window.setTimeout(() => ve(""), 1e3)));
        })(Z),
          Se && setTimeout(() => Se.focus()));
      };
    (w.useEffect(() => () => window.clearTimeout(B.current), []), rw());
    const F = w.useCallback(
      (W) => J.current === Q.current?.side && y2(W, Q.current?.area),
      [],
    );
    return O.jsx(e2, {
      scope: n,
      searchRef: H,
      onItemEnter: w.useCallback(
        (W) => {
          F(W) && W.preventDefault();
        },
        [F],
      ),
      onItemLeave: w.useCallback(
        (W) => {
          F(W) || (U.current?.focus(), V(null));
        },
        [F],
      ),
      onTriggerLeave: w.useCallback(
        (W) => {
          F(W) && W.preventDefault();
        },
        [F],
      ),
      pointerGraceTimerRef: ee,
      onPointerGraceIntentChange: w.useCallback((W) => {
        Q.current = W;
      }, []),
      children: O.jsx(ye, {
        ...ue,
        children: O.jsx(Qf, {
          asChild: !0,
          trapped: o,
          onMountAutoFocus: we(l, (W) => {
            (W.preventDefault(), U.current?.focus({ preventScroll: !0 }));
          }),
          onUnmountAutoFocus: u,
          children: O.jsx(uu, {
            asChild: !0,
            disableOutsidePointerEvents: d,
            onEscapeKeyDown: m,
            onPointerDownOutside: g,
            onFocusOutside: y,
            onInteractOutside: v,
            onDismiss: C,
            children: O.jsx(Uj, {
              asChild: !0,
              ...A,
              dir: x.dir,
              orientation: "vertical",
              loop: i,
              currentTabStopId: P,
              onCurrentTabStopIdChange: V,
              onEntryFocus: we(f, (W) => {
                x.isUsingKeyboardRef.current || W.preventDefault();
              }),
              preventScrollOnEntryFocus: !0,
              children: O.jsx(Pb, {
                role: "menu",
                "aria-orientation": "vertical",
                "data-state": dS(k.open),
                "data-radix-menu-content": "",
                dir: x.dir,
                ...M,
                ...S,
                ref: z,
                style: { outline: "none", ...S.style },
                onKeyDown: we(S.onKeyDown, (W) => {
                  const N =
                      W.target.closest("[data-radix-menu-content]") ===
                      W.currentTarget,
                    K = W.ctrlKey || W.altKey || W.metaKey,
                    he = W.key.length === 1;
                  N &&
                    (W.key === "Tab" && W.preventDefault(),
                    !K && he && ce(W.key));
                  const be = U.current;
                  if (W.target !== be || !Hj.includes(W.key)) return;
                  W.preventDefault();
                  const Se = R()
                    .filter((ve) => !ve.disabled)
                    .map((ve) => ve.ref.current);
                  (Vb.includes(W.key) && Se.reverse(), h2(Se));
                }),
                onBlur: we(e.onBlur, (W) => {
                  W.currentTarget.contains(W.target) ||
                    (window.clearTimeout(B.current), (H.current = ""));
                }),
                onPointerMove: we(
                  e.onPointerMove,
                  Wo((W) => {
                    const Z = W.target,
                      N = ae.current !== W.clientX;
                    if (W.currentTarget.contains(Z) && N) {
                      const K = W.clientX > ae.current ? "right" : "left";
                      ((J.current = K), (ae.current = W.clientX));
                    }
                  }),
                ),
              }),
            }),
          }),
        }),
      }),
    });
  });
Qb.displayName = un;
var s2 = "MenuGroup",
  Ph = w.forwardRef((e, t) => {
    const { __scopeMenu: n, ...i } = e;
    return O.jsx(Ge.div, { role: "group", ...i, ref: t });
  });
Ph.displayName = s2;
var i2 = "MenuLabel",
  Yb = w.forwardRef((e, t) => {
    const { __scopeMenu: n, ...i } = e;
    return O.jsx(Ge.div, { ...i, ref: t });
  });
Yb.displayName = i2;
var su = "MenuItem",
  hv = "menu.itemSelect",
  Tu = w.forwardRef((e, t) => {
    const { disabled: n = !1, onSelect: i, ...o } = e,
      l = w.useRef(null),
      u = ea(su, e.__scopeMenu),
      d = _h(su, e.__scopeMenu),
      f = st(t, l),
      m = w.useRef(!1),
      g = () => {
        const y = l.current;
        if (!n && y) {
          const v = new CustomEvent(hv, { bubbles: !0, cancelable: !0 });
          (y.addEventListener(hv, (C) => i?.(C), { once: !0 }),
            Jv(y, v),
            v.defaultPrevented ? (m.current = !1) : u.onClose());
        }
      };
    return O.jsx(Xb, {
      ...o,
      ref: f,
      disabled: n,
      onClick: we(e.onClick, g),
      onPointerDown: (y) => {
        (e.onPointerDown?.(y), (m.current = !0));
      },
      onPointerUp: we(e.onPointerUp, (y) => {
        m.current || y.currentTarget?.click();
      }),
      onKeyDown: we(e.onKeyDown, (y) => {
        const v = d.searchRef.current !== "";
        n ||
          (v && y.key === " ") ||
          (Pf.includes(y.key) && (y.currentTarget.click(), y.preventDefault()));
      }),
    });
  });
Tu.displayName = su;
var Xb = w.forwardRef((e, t) => {
    const { __scopeMenu: n, disabled: i = !1, textValue: o, ...l } = e,
      u = _h(su, n),
      d = Hb(n),
      f = w.useRef(null),
      m = st(t, f),
      [g, y] = w.useState(!1),
      [v, C] = w.useState("");
    return (
      w.useEffect(() => {
        const E = f.current;
        E && C((E.textContent ?? "").trim());
      }, [l.children]),
      O.jsx(Vo.ItemSlot, {
        scope: n,
        disabled: i,
        textValue: o ?? v,
        children: O.jsx(Vj, {
          asChild: !0,
          ...d,
          focusable: !i,
          children: O.jsx(Ge.div, {
            role: "menuitem",
            "data-highlighted": g ? "" : void 0,
            "aria-disabled": i || void 0,
            "data-disabled": i ? "" : void 0,
            ...l,
            ref: m,
            onPointerMove: we(
              e.onPointerMove,
              Wo((E) => {
                i
                  ? u.onItemLeave(E)
                  : (u.onItemEnter(E),
                    E.defaultPrevented ||
                      E.currentTarget.focus({ preventScroll: !0 }));
              }),
            ),
            onPointerLeave: we(
              e.onPointerLeave,
              Wo((E) => u.onItemLeave(E)),
            ),
            onFocus: we(e.onFocus, () => y(!0)),
            onBlur: we(e.onBlur, () => y(!1)),
          }),
        }),
      })
    );
  }),
  o2 = "MenuCheckboxItem",
  Zb = w.forwardRef((e, t) => {
    const { checked: n = !1, onCheckedChange: i, ...o } = e;
    return O.jsx(rS, {
      scope: e.__scopeMenu,
      checked: n,
      children: O.jsx(Tu, {
        role: "menuitemcheckbox",
        "aria-checked": iu(n) ? "mixed" : n,
        ...o,
        ref: t,
        "data-state": Lh(n),
        onSelect: we(o.onSelect, () => i?.(iu(n) ? !0 : !n), {
          checkForDefaultPrevented: !1,
        }),
      }),
    });
  });
Zb.displayName = o2;
var Jb = "MenuRadioGroup",
  [a2, l2] = Os(Jb, { value: void 0, onValueChange: () => {} }),
  eS = w.forwardRef((e, t) => {
    const { value: n, onValueChange: i, ...o } = e,
      l = tr(i);
    return O.jsx(a2, {
      scope: e.__scopeMenu,
      value: n,
      onValueChange: l,
      children: O.jsx(Ph, { ...o, ref: t }),
    });
  });
eS.displayName = Jb;
var tS = "MenuRadioItem",
  nS = w.forwardRef((e, t) => {
    const { value: n, ...i } = e,
      o = l2(tS, e.__scopeMenu),
      l = n === o.value;
    return O.jsx(rS, {
      scope: e.__scopeMenu,
      checked: l,
      children: O.jsx(Tu, {
        role: "menuitemradio",
        "aria-checked": l,
        ...i,
        ref: t,
        "data-state": Lh(l),
        onSelect: we(i.onSelect, () => o.onValueChange?.(n), {
          checkForDefaultPrevented: !1,
        }),
      }),
    });
  });
nS.displayName = tS;
var Dh = "MenuItemIndicator",
  [rS, u2] = Os(Dh, { checked: !1 }),
  sS = w.forwardRef((e, t) => {
    const { __scopeMenu: n, forceMount: i, ...o } = e,
      l = u2(Dh, n);
    return O.jsx(ir, {
      present: i || iu(l.checked) || l.checked === !0,
      children: O.jsx(Ge.span, { ...o, ref: t, "data-state": Lh(l.checked) }),
    });
  });
sS.displayName = Dh;
var c2 = "MenuSeparator",
  iS = w.forwardRef((e, t) => {
    const { __scopeMenu: n, ...i } = e;
    return O.jsx(Ge.div, {
      role: "separator",
      "aria-orientation": "horizontal",
      ...i,
      ref: t,
    });
  });
iS.displayName = c2;
var d2 = "MenuArrow",
  oS = w.forwardRef((e, t) => {
    const { __scopeMenu: n, ...i } = e,
      o = Ou(n);
    return O.jsx(Db, { ...o, ...i, ref: t });
  });
oS.displayName = d2;
var f2 = "MenuSub",
  [C3, aS] = Os(f2),
  To = "MenuSubTrigger",
  lS = w.forwardRef((e, t) => {
    const n = Ts(To, e.__scopeMenu),
      i = ea(To, e.__scopeMenu),
      o = aS(To, e.__scopeMenu),
      l = _h(To, e.__scopeMenu),
      u = w.useRef(null),
      { pointerGraceTimerRef: d, onPointerGraceIntentChange: f } = l,
      m = { __scopeMenu: e.__scopeMenu },
      g = w.useCallback(() => {
        (u.current && window.clearTimeout(u.current), (u.current = null));
      }, []);
    return (
      w.useEffect(() => g, [g]),
      w.useEffect(() => {
        const y = d.current;
        return () => {
          (window.clearTimeout(y), f(null));
        };
      }, [d, f]),
      O.jsx(jh, {
        asChild: !0,
        ...m,
        children: O.jsx(Xb, {
          id: o.triggerId,
          "aria-haspopup": "menu",
          "aria-expanded": n.open,
          "aria-controls": o.contentId,
          "data-state": dS(n.open),
          ...e,
          ref: Go(t, o.onTriggerChange),
          onClick: (y) => {
            (e.onClick?.(y),
              !(e.disabled || y.defaultPrevented) &&
                (y.currentTarget.focus(), n.open || n.onOpenChange(!0)));
          },
          onPointerMove: we(
            e.onPointerMove,
            Wo((y) => {
              (l.onItemEnter(y),
                !y.defaultPrevented &&
                  !e.disabled &&
                  !n.open &&
                  !u.current &&
                  (l.onPointerGraceIntentChange(null),
                  (u.current = window.setTimeout(() => {
                    (n.onOpenChange(!0), g());
                  }, 100))));
            }),
          ),
          onPointerLeave: we(
            e.onPointerLeave,
            Wo((y) => {
              g();
              const v = n.content?.getBoundingClientRect();
              if (v) {
                const C = n.content?.dataset.side,
                  E = C === "right",
                  S = E ? -5 : 5,
                  k = v[E ? "left" : "right"],
                  x = v[E ? "right" : "left"];
                (l.onPointerGraceIntentChange({
                  area: [
                    { x: y.clientX + S, y: y.clientY },
                    { x: k, y: v.top },
                    { x, y: v.top },
                    { x, y: v.bottom },
                    { x: k, y: v.bottom },
                  ],
                  side: C,
                }),
                  window.clearTimeout(d.current),
                  (d.current = window.setTimeout(
                    () => l.onPointerGraceIntentChange(null),
                    300,
                  )));
              } else {
                if ((l.onTriggerLeave(y), y.defaultPrevented)) return;
                l.onPointerGraceIntentChange(null);
              }
            }),
          ),
          onKeyDown: we(e.onKeyDown, (y) => {
            const v = l.searchRef.current !== "";
            e.disabled ||
              (v && y.key === " ") ||
              (Kj[i.dir].includes(y.key) &&
                (n.onOpenChange(!0), n.content?.focus(), y.preventDefault()));
          }),
        }),
      })
    );
  });
lS.displayName = To;
var uS = "MenuSubContent",
  cS = w.forwardRef((e, t) => {
    const n = Gb(un, e.__scopeMenu),
      { forceMount: i = n.forceMount, ...o } = e,
      l = Ts(un, e.__scopeMenu),
      u = ea(un, e.__scopeMenu),
      d = aS(uS, e.__scopeMenu),
      f = w.useRef(null),
      m = st(t, f);
    return O.jsx(Vo.Provider, {
      scope: e.__scopeMenu,
      children: O.jsx(ir, {
        present: i || l.open,
        children: O.jsx(Vo.Slot, {
          scope: e.__scopeMenu,
          children: O.jsx(Nh, {
            id: d.contentId,
            "aria-labelledby": d.triggerId,
            ...o,
            ref: m,
            align: "start",
            side: u.dir === "rtl" ? "left" : "right",
            disableOutsidePointerEvents: !1,
            disableOutsideScroll: !1,
            trapFocus: !1,
            onOpenAutoFocus: (g) => {
              (u.isUsingKeyboardRef.current && f.current?.focus(),
                g.preventDefault());
            },
            onCloseAutoFocus: (g) => g.preventDefault(),
            onFocusOutside: we(e.onFocusOutside, (g) => {
              g.target !== d.trigger && l.onOpenChange(!1);
            }),
            onEscapeKeyDown: we(e.onEscapeKeyDown, (g) => {
              (u.onClose(), g.preventDefault());
            }),
            onKeyDown: we(e.onKeyDown, (g) => {
              const y = g.currentTarget.contains(g.target),
                v = Gj[u.dir].includes(g.key);
              y &&
                v &&
                (l.onOpenChange(!1), d.trigger?.focus(), g.preventDefault());
            }),
          }),
        }),
      }),
    });
  });
cS.displayName = uS;
function dS(e) {
  return e ? "open" : "closed";
}
function iu(e) {
  return e === "indeterminate";
}
function Lh(e) {
  return iu(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function h2(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function p2(e, t) {
  return e.map((n, i) => e[(t + i) % e.length]);
}
function m2(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((m) => m === t[0]) ? t[0] : t,
    l = n ? e.indexOf(n) : -1;
  let u = p2(e, Math.max(l, 0));
  o.length === 1 && (u = u.filter((m) => m !== n));
  const f = u.find((m) => m.toLowerCase().startsWith(o.toLowerCase()));
  return f !== n ? f : void 0;
}
function g2(e, t) {
  const { x: n, y: i } = e;
  let o = !1;
  for (let l = 0, u = t.length - 1; l < t.length; u = l++) {
    const d = t[l],
      f = t[u],
      m = d.x,
      g = d.y,
      y = f.x,
      v = f.y;
    g > i != v > i && n < ((y - m) * (i - g)) / (v - g) + m && (o = !o);
  }
  return o;
}
function y2(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return g2(n, t);
}
function Wo(e) {
  return (t) => (t.pointerType === "mouse" ? e(t) : void 0);
}
var v2 = Kb,
  w2 = jh,
  b2 = qb,
  S2 = Qb,
  E2 = Ph,
  x2 = Yb,
  C2 = Tu,
  k2 = Zb,
  O2 = eS,
  T2 = nS,
  I2 = sS,
  M2 = iS,
  A2 = oS,
  j2 = lS,
  R2 = cS,
  Iu = "DropdownMenu",
  [_2] = ks(Iu, [Wb]),
  At = Wb(),
  [N2, fS] = _2(Iu),
  hS = (e) => {
    const {
        __scopeDropdownMenu: t,
        children: n,
        dir: i,
        open: o,
        defaultOpen: l,
        onOpenChange: u,
        modal: d = !0,
      } = e,
      f = At(t),
      m = w.useRef(null),
      [g, y] = Gf({ prop: o, defaultProp: l ?? !1, onChange: u, caller: Iu });
    return O.jsx(N2, {
      scope: t,
      triggerId: gi(),
      triggerRef: m,
      contentId: gi(),
      open: g,
      onOpenChange: y,
      onOpenToggle: w.useCallback(() => y((v) => !v), [y]),
      modal: d,
      children: O.jsx(v2, {
        ...f,
        open: g,
        onOpenChange: y,
        dir: i,
        modal: d,
        children: n,
      }),
    });
  };
hS.displayName = Iu;
var pS = "DropdownMenuTrigger",
  mS = w.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, disabled: i = !1, ...o } = e,
      l = fS(pS, n),
      u = At(n);
    return O.jsx(w2, {
      asChild: !0,
      ...u,
      children: O.jsx(Ge.button, {
        type: "button",
        id: l.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": l.open,
        "aria-controls": l.open ? l.contentId : void 0,
        "data-state": l.open ? "open" : "closed",
        "data-disabled": i ? "" : void 0,
        disabled: i,
        ...o,
        ref: Go(t, l.triggerRef),
        onPointerDown: we(e.onPointerDown, (d) => {
          !i &&
            d.button === 0 &&
            d.ctrlKey === !1 &&
            (l.onOpenToggle(), l.open || d.preventDefault());
        }),
        onKeyDown: we(e.onKeyDown, (d) => {
          i ||
            (["Enter", " "].includes(d.key) && l.onOpenToggle(),
            d.key === "ArrowDown" && l.onOpenChange(!0),
            ["Enter", " ", "ArrowDown"].includes(d.key) && d.preventDefault());
        }),
      }),
    });
  });
mS.displayName = pS;
var P2 = "DropdownMenuPortal",
  gS = (e) => {
    const { __scopeDropdownMenu: t, ...n } = e,
      i = At(t);
    return O.jsx(b2, { ...i, ...n });
  };
gS.displayName = P2;
var yS = "DropdownMenuContent",
  vS = w.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...i } = e,
      o = fS(yS, n),
      l = At(n),
      u = w.useRef(!1);
    return O.jsx(S2, {
      id: o.contentId,
      "aria-labelledby": o.triggerId,
      ...l,
      ...i,
      ref: t,
      onCloseAutoFocus: we(e.onCloseAutoFocus, (d) => {
        (u.current || o.triggerRef.current?.focus(),
          (u.current = !1),
          d.preventDefault());
      }),
      onInteractOutside: we(e.onInteractOutside, (d) => {
        const f = d.detail.originalEvent,
          m = f.button === 0 && f.ctrlKey === !0,
          g = f.button === 2 || m;
        (!o.modal || g) && (u.current = !0);
      }),
      style: {
        ...e.style,
        "--radix-dropdown-menu-content-transform-origin":
          "var(--radix-popper-transform-origin)",
        "--radix-dropdown-menu-content-available-width":
          "var(--radix-popper-available-width)",
        "--radix-dropdown-menu-content-available-height":
          "var(--radix-popper-available-height)",
        "--radix-dropdown-menu-trigger-width":
          "var(--radix-popper-anchor-width)",
        "--radix-dropdown-menu-trigger-height":
          "var(--radix-popper-anchor-height)",
      },
    });
  });
vS.displayName = yS;
var D2 = "DropdownMenuGroup",
  L2 = w.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...i } = e,
      o = At(n);
    return O.jsx(E2, { ...o, ...i, ref: t });
  });
L2.displayName = D2;
var B2 = "DropdownMenuLabel",
  $2 = w.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...i } = e,
      o = At(n);
    return O.jsx(x2, { ...o, ...i, ref: t });
  });
$2.displayName = B2;
var z2 = "DropdownMenuItem",
  wS = w.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...i } = e,
      o = At(n);
    return O.jsx(C2, { ...o, ...i, ref: t });
  });
wS.displayName = z2;
var F2 = "DropdownMenuCheckboxItem",
  U2 = w.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...i } = e,
      o = At(n);
    return O.jsx(k2, { ...o, ...i, ref: t });
  });
U2.displayName = F2;
var V2 = "DropdownMenuRadioGroup",
  W2 = w.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...i } = e,
      o = At(n);
    return O.jsx(O2, { ...o, ...i, ref: t });
  });
W2.displayName = V2;
var H2 = "DropdownMenuRadioItem",
  K2 = w.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...i } = e,
      o = At(n);
    return O.jsx(T2, { ...o, ...i, ref: t });
  });
K2.displayName = H2;
var G2 = "DropdownMenuItemIndicator",
  q2 = w.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...i } = e,
      o = At(n);
    return O.jsx(I2, { ...o, ...i, ref: t });
  });
q2.displayName = G2;
var Q2 = "DropdownMenuSeparator",
  bS = w.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...i } = e,
      o = At(n);
    return O.jsx(M2, { ...o, ...i, ref: t });
  });
bS.displayName = Q2;
var Y2 = "DropdownMenuArrow",
  X2 = w.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...i } = e,
      o = At(n);
    return O.jsx(A2, { ...o, ...i, ref: t });
  });
X2.displayName = Y2;
var Z2 = "DropdownMenuSubTrigger",
  J2 = w.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...i } = e,
      o = At(n);
    return O.jsx(j2, { ...o, ...i, ref: t });
  });
J2.displayName = Z2;
var eR = "DropdownMenuSubContent",
  tR = w.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...i } = e,
      o = At(n);
    return O.jsx(R2, {
      ...o,
      ...i,
      ref: t,
      style: {
        ...e.style,
        "--radix-dropdown-menu-content-transform-origin":
          "var(--radix-popper-transform-origin)",
        "--radix-dropdown-menu-content-available-width":
          "var(--radix-popper-available-width)",
        "--radix-dropdown-menu-content-available-height":
          "var(--radix-popper-available-height)",
        "--radix-dropdown-menu-trigger-width":
          "var(--radix-popper-anchor-width)",
        "--radix-dropdown-menu-trigger-height":
          "var(--radix-popper-anchor-height)",
      },
    });
  });
tR.displayName = eR;
var nR = hS,
  rR = mS,
  sR = gS,
  iR = vS,
  SS = wS,
  oR = bS;
const aR = {
  "-32700": "ParseError",
  "-32701": "OversizedRequest",
  "-32702": "OversizedResponse",
  "-32600": "InvalidRequest",
  "-32601": "MethodNotFound",
  "-32602": "InvalidParams",
  "-32603": "InternalError",
  "-32604": "ServerBusy",
  "-32000": "CallExecutionFailed",
  "-32001": "UnknownError",
  "-32003": "SubscriptionClosed",
  "-32004": "SubscriptionClosedWithError",
  "-32005": "BatchesNotSupported",
  "-32006": "TooManySubscriptions",
  "-32050": "TransientError",
  "-32002": "TransactionExecutionClientError",
};
var ES = class extends Error {},
  xS = class extends ES {
    constructor(e, t) {
      (super(e), (this.code = t), (this.type = aR[t] ?? "ServerError"));
    }
  },
  lR = class extends ES {
    constructor(e, t, n) {
      (super(e), (this.status = t), (this.statusText = n));
    }
  };
function uR(e) {
  const t = new URL(e);
  return ((t.protocol = t.protocol.replace("http", "ws")), t.toString());
}
const cR = {
  WebSocketConstructor: typeof WebSocket < "u" ? WebSocket : void 0,
  callTimeout: 3e4,
  reconnectTimeout: 3e3,
  maxReconnects: 5,
};
var dR = class {
    #e = 0;
    #t = 0;
    #n = null;
    #s = null;
    #i = new Set();
    #l = new Map();
    constructor(e, t = {}) {
      if (
        ((this.endpoint = e),
        (this.options = { ...cR, ...t }),
        !this.options.WebSocketConstructor)
      )
        throw new Error("Missing WebSocket constructor");
      this.endpoint.startsWith("http") && (this.endpoint = uR(this.endpoint));
    }
    async makeRequest(e, t, n) {
      const i = await this.#a();
      return new Promise((o, l) => {
        ((this.#e += 1),
          this.#l.set(this.#e, {
            resolve: o,
            reject: l,
            timeout: setTimeout(() => {
              (this.#l.delete(this.#e), l(new Error(`Request timeout: ${e}`)));
            }, this.options.callTimeout),
          }),
          n?.addEventListener("abort", () => {
            (this.#l.delete(this.#e), l(n.reason));
          }),
          i.send(
            JSON.stringify({
              jsonrpc: "2.0",
              id: this.#e,
              method: e,
              params: t,
            }),
          ));
      }).then(({ error: o, result: l }) => {
        if (o) throw new xS(o.message, o.code);
        return l;
      });
    }
    #a() {
      return this.#s
        ? this.#s
        : ((this.#s = new Promise((e) => {
            (this.#n?.close(),
              (this.#n = new this.options.WebSocketConstructor(this.endpoint)),
              this.#n.addEventListener("open", () => {
                ((this.#t = 0), e(this.#n));
              }),
              this.#n.addEventListener("close", () => {
                (this.#t++,
                  this.#t <= this.options.maxReconnects &&
                    setTimeout(() => {
                      this.#u();
                    }, this.options.reconnectTimeout));
              }),
              this.#n.addEventListener("message", ({ data: t }) => {
                let n;
                try {
                  n = JSON.parse(t);
                } catch (i) {
                  console.error(
                    new Error(`Failed to parse RPC message: ${t}`, {
                      cause: i,
                    }),
                  );
                  return;
                }
                if ("id" in n && n.id != null && this.#l.has(n.id)) {
                  const { resolve: i, timeout: o } = this.#l.get(n.id);
                  (clearTimeout(o), i(n));
                } else if ("params" in n) {
                  const { params: i } = n;
                  this.#i.forEach((o) => {
                    o.subscriptionId === i.subscription &&
                      i.subscription === o.subscriptionId &&
                      o.onMessage(i.result);
                  });
                }
              }));
          })),
          this.#s);
    }
    async #u() {
      return (
        this.#n?.close(),
        (this.#s = null),
        Promise.allSettled([...this.#i].map((e) => e.subscribe(this)))
      );
    }
    async subscribe(e) {
      const t = new fR(e);
      return (
        this.#i.add(t),
        await t.subscribe(this),
        () => t.unsubscribe(this)
      );
    }
  },
  fR = class {
    constructor(e) {
      ((this.subscriptionId = null), (this.subscribed = !1), (this.input = e));
    }
    onMessage(e) {
      this.subscribed && this.input.onMessage(e);
    }
    async unsubscribe(e) {
      const { subscriptionId: t } = this;
      return (
        (this.subscribed = !1),
        t == null
          ? !1
          : ((this.subscriptionId = null),
            e.makeRequest(this.input.unsubscribe, [t]))
      );
    }
    async subscribe(e) {
      ((this.subscriptionId = null), (this.subscribed = !0));
      const t = await e.makeRequest(
        this.input.method,
        this.input.params,
        this.input.signal,
      );
      this.subscribed && (this.subscriptionId = t);
    }
  },
  hR = class {
    #e = 0;
    #t;
    #n;
    constructor(e) {
      this.#t = e;
    }
    fetch(e, t) {
      const n = this.#t.fetch ?? fetch;
      if (!n)
        throw new Error(
          "The current environment does not support fetch, you can provide a fetch implementation in the options for SuiHTTPTransport.",
        );
      return n(e, t);
    }
    #s() {
      if (!this.#n) {
        const e = this.#t.WebSocketConstructor ?? WebSocket;
        if (!e)
          throw new Error(
            "The current environment does not support WebSocket, you can provide a WebSocketConstructor in the options for SuiHTTPTransport.",
          );
        this.#n = new dR(this.#t.websocket?.url ?? this.#t.url, {
          WebSocketConstructor: e,
          ...this.#t.websocket,
        });
      }
      return this.#n;
    }
    async request(e) {
      this.#e += 1;
      const t = await this.fetch(this.#t.rpc?.url ?? this.#t.url, {
        method: "POST",
        signal: e.signal,
        headers: {
          "Content-Type": "application/json",
          "Client-Sdk-Type": "typescript",
          "Client-Sdk-Version": H0,
          "Client-Target-Api-Version": OI,
          "Client-Request-Method": e.method,
          ...this.#t.rpc?.headers,
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: this.#e,
          method: e.method,
          params: e.params,
        }),
      });
      if (!t.ok)
        throw new lR(
          `Unexpected status code: ${t.status}`,
          t.status,
          t.statusText,
        );
      const n = await t.json();
      if ("error" in n && n.error != null)
        throw new xS(n.error.message, n.error.code);
      return n.result;
    }
    async subscribe(e) {
      const t = await this.#s().subscribe(e);
      return (
        e.signal &&
          (e.signal.throwIfAborted(),
          e.signal.addEventListener("abort", () => {
            t();
          })),
        async () => !!(await t())
      );
    }
  },
  pR = class CS {
    #e;
    #t;
    constructor({ prefix: t, cache: n } = {}) {
      ((this.#e = t ?? []), (this.#t = n ?? new Map()));
    }
    read(t, n) {
      const i = [this.#e, ...t].join(":");
      if (this.#t.has(i)) return this.#t.get(i);
      const o = n();
      return (
        this.#t.set(i, o),
        typeof o == "object" && o !== null && "then" in o
          ? Promise.resolve(o)
              .then((l) => (this.#t.set(i, l), l))
              .catch((l) => {
                throw (this.#t.delete(i), l);
              })
          : o
      );
    }
    readSync(t, n) {
      const i = [this.#e, ...t].join(":");
      if (this.#t.has(i)) return this.#t.get(i);
      const o = n();
      return (this.#t.set(i, o), o);
    }
    clear(t) {
      const n = [...this.#e, ...(t ?? [])].join(":");
      if (!n) {
        this.#t.clear();
        return;
      }
      for (const i of this.#t.keys()) i.startsWith(n) && this.#t.delete(i);
    }
    scope(t) {
      return new CS({
        prefix: [...this.#e, ...(Array.isArray(t) ? t : [t])],
        cache: this.#t,
      });
    }
  },
  kS = class {
    constructor({ network: e, base: t, cache: n = t?.cache ?? new pR() }) {
      ((this.network = e), (this.base = t ?? this), (this.cache = n));
    }
    $extend(...e) {
      const t = Object.fromEntries(e.map((i) => [i.name, i.register(this)])),
        n = new Map();
      return new Proxy(this, {
        get(i, o, l) {
          if (typeof o == "string" && o in t) return t[o];
          const u = Reflect.get(i, o, l);
          return typeof u == "function"
            ? o === "$extend"
              ? u.bind(l)
              : (n.has(o) || n.set(o, u.bind(i)), n.get(o))
            : u;
        },
      });
    }
  };
const mR = {
  mainnet: "https://mainnet.mvr.mystenlabs.com",
  testnet: "https://testnet.mvr.mystenlabs.com",
};
var gR = class extends kS {
  constructor(e) {
    (super(e),
      (this.core = this),
      (this.mvr = new MI({
        cache: this.cache.scope("core.mvr"),
        url: e.mvr?.url ?? mR[this.network],
        pageSize: e.mvr?.pageSize,
        overrides: e.mvr?.overrides,
      })));
  }
  async getObject(e) {
    const { objectId: t } = e,
      {
        objects: [n],
      } = await this.getObjects({
        objectIds: [t],
        signal: e.signal,
        include: e.include,
      });
    if (n instanceof Error) throw n;
    return { object: n };
  }
  async getDynamicField(e) {
    const t = ws.parseFromStr(
        (await this.core.mvr.resolveType({ type: e.name.type })).type,
      ),
      n = A0(e.parentId, t, e.name.bcs),
      {
        objects: [i],
      } = await this.getObjects({
        objectIds: [n],
        signal: e.signal,
        include: { previousTransaction: !0, content: !0 },
      });
    if (i instanceof Error) throw i;
    const o = zr(i.type),
      l = await i.content,
      u = o.typeParams[0],
      d =
        typeof u != "string" &&
        u.module === "dynamic_object_field" &&
        u.name === "Wrapper",
      f = l.slice(qo + e.name.bcs.length),
      m =
        typeof o.typeParams[1] == "string"
          ? o.typeParams[1]
          : Ke(o.typeParams[1]);
    return {
      dynamicField: {
        $kind: d ? "DynamicObject" : "DynamicField",
        fieldId: i.objectId,
        digest: i.digest,
        version: i.version,
        type: i.type,
        previousTransaction: i.previousTransaction,
        name: { type: typeof u == "string" ? u : Ke(u), bcs: e.name.bcs },
        value: { type: m, bcs: f },
        childId: d ? pe.Address.parse(f) : void 0,
      },
    };
  }
  async getDynamicObjectField(e) {
    const t = `0x2::dynamic_object_field::Wrapper<${(await this.core.mvr.resolveType({ type: e.name.type })).type}>`,
      { dynamicField: n } = await this.getDynamicField({
        parentId: e.parentId,
        name: { type: t, bcs: e.name.bcs },
        signal: e.signal,
      }),
      { object: i } = await this.getObject({
        objectId: n.childId,
        signal: e.signal,
        include: e.include,
      });
    return { object: i };
  }
  async waitForTransaction(e) {
    const { signal: t, timeout: n = 60 * 1e3, include: i } = e,
      o =
        "result" in e && e.result
          ? (e.result.Transaction ?? e.result.FailedTransaction).digest
          : e.digest,
      l = t
        ? AbortSignal.any([AbortSignal.timeout(n), t])
        : AbortSignal.timeout(n),
      u = new Promise((d, f) => {
        l.addEventListener("abort", () => f(l.reason));
      });
    for (u.catch(() => {}); ; ) {
      l.throwIfAborted();
      try {
        return await this.getTransaction({ digest: o, include: i, signal: l });
      } catch {
        await Promise.race([new Promise((d) => setTimeout(d, 2e3)), u]);
      }
    }
  }
  async signAndExecuteTransaction({
    transaction: e,
    signer: t,
    additionalSignatures: n = [],
    ...i
  }) {
    let o;
    e instanceof Uint8Array
      ? (o = e)
      : (e.setSenderIfNotSet(t.toSuiAddress()),
        (o = await e.build({ client: this })));
    const { signature: l } = await t.signTransaction(o);
    return this.executeTransaction({
      transaction: o,
      signatures: [l, ...n],
      ...i,
    });
  }
};
const yR = new Intl.PluralRules("en-US", { type: "ordinal" }),
  vR = new Map([
    ["one", "st"],
    ["two", "nd"],
    ["few", "rd"],
    ["other", "th"],
  ]);
function wR(e) {
  return `${e}${vR.get(yR.select(e))}`;
}
function OS(e) {
  const { command: t, location: n, abortCode: i, cleverError: o } = e,
    l = [];
  if (
    (t != null
      ? l.push(`MoveAbort in ${wR(t + 1)} command`)
      : l.push("MoveAbort"),
    o?.constantName)
  ) {
    const u = o.value
      ? `'${o.constantName}': ${o.value}`
      : `'${o.constantName}'`;
    l.push(u);
  } else l.push(`abort code: ${i}`);
  if (n?.package && n?.module) {
    const u = [
      `in '${[n.package.startsWith("0x") ? n.package : `0x${n.package}`, n.module, n.functionName].filter(Boolean).join("::")}'`,
    ];
    (o?.lineNumber != null
      ? u.push(`(line ${o.lineNumber})`)
      : n.instruction != null && u.push(`(instruction ${n.instruction})`),
      l.push(u.join(" ")));
  }
  return l.join(", ");
}
const pv = pe.struct("MinimalEffectsWithError", { status: oh });
pe.enum("MinimalTransactionEffectsWithError", { V1: pv, V2: pv });
const bR = pe.enum("MinimalExecutionStatusNoError", {
    Success: null,
    Failed: null,
  }),
  mv = pe.struct("MinimalEffectsNoError", { status: bR });
pe.enum("MinimalTransactionEffectsNoError", { V1: mv, V2: mv });
function Lt(e, t) {
  return t != null && typeof t != "boolean"
    ? `${e}(${JSON.stringify(t, (n, i) => (typeof i == "bigint" ? i.toString() : i))})`
    : e;
}
function SR(e) {
  const t = e.error,
    n = e.command != null ? Number(e.command) : void 0;
  switch (t.$kind) {
    case "MoveAbort": {
      const [i, o] = t.MoveAbort,
        l = {
          package: i.module.address,
          module: i.module.name,
          function: i.function,
          functionName: i.functionName ?? void 0,
          instruction: i.instruction,
        };
      return {
        $kind: "MoveAbort",
        message: OS({ command: n, location: l, abortCode: String(o) }),
        command: n,
        MoveAbort: { abortCode: String(o), location: l },
      };
    }
    case "MoveObjectTooBig":
      return {
        $kind: "SizeError",
        message: Lt("MoveObjectTooBig", t.MoveObjectTooBig),
        command: n,
        SizeError: {
          name: "ObjectTooBig",
          size: Number(t.MoveObjectTooBig.objectSize),
          maxSize: Number(t.MoveObjectTooBig.maxObjectSize),
        },
      };
    case "MovePackageTooBig":
      return {
        $kind: "SizeError",
        message: Lt("MovePackageTooBig", t.MovePackageTooBig),
        command: n,
        SizeError: {
          name: "PackageTooBig",
          size: Number(t.MovePackageTooBig.objectSize),
          maxSize: Number(t.MovePackageTooBig.maxObjectSize),
        },
      };
    case "EffectsTooLarge":
      return {
        $kind: "SizeError",
        message: Lt("EffectsTooLarge", t.EffectsTooLarge),
        command: n,
        SizeError: {
          name: "EffectsTooLarge",
          size: Number(t.EffectsTooLarge.currentSize),
          maxSize: Number(t.EffectsTooLarge.maxSize),
        },
      };
    case "WrittenObjectsTooLarge":
      return {
        $kind: "SizeError",
        message: Lt("WrittenObjectsTooLarge", t.WrittenObjectsTooLarge),
        command: n,
        SizeError: {
          name: "WrittenObjectsTooLarge",
          size: Number(t.WrittenObjectsTooLarge.currentSize),
          maxSize: Number(t.WrittenObjectsTooLarge.maxSize),
        },
      };
    case "MoveVectorElemTooBig":
      return {
        $kind: "SizeError",
        message: Lt("MoveVectorElemTooBig", t.MoveVectorElemTooBig),
        command: n,
        SizeError: {
          name: "MoveVectorElemTooBig",
          size: Number(t.MoveVectorElemTooBig.valueSize),
          maxSize: Number(t.MoveVectorElemTooBig.maxScaledSize),
        },
      };
    case "MoveRawValueTooBig":
      return {
        $kind: "SizeError",
        message: Lt("MoveRawValueTooBig", t.MoveRawValueTooBig),
        command: n,
        SizeError: {
          name: "MoveRawValueTooBig",
          size: Number(t.MoveRawValueTooBig.valueSize),
          maxSize: Number(t.MoveRawValueTooBig.maxScaledSize),
        },
      };
    case "CommandArgumentError":
      return {
        $kind: "CommandArgumentError",
        message: Lt("CommandArgumentError", t.CommandArgumentError),
        command: n,
        CommandArgumentError: {
          argument: t.CommandArgumentError.argIdx,
          name: t.CommandArgumentError.kind.$kind,
        },
      };
    case "TypeArgumentError":
      return {
        $kind: "TypeArgumentError",
        message: Lt("TypeArgumentError", t.TypeArgumentError),
        command: n,
        TypeArgumentError: {
          typeArgument: t.TypeArgumentError.argumentIdx,
          name: t.TypeArgumentError.kind.$kind,
        },
      };
    case "PackageUpgradeError": {
      const i = t.PackageUpgradeError.upgradeError;
      return {
        $kind: "PackageUpgradeError",
        message: Lt("PackageUpgradeError", t.PackageUpgradeError),
        command: n,
        PackageUpgradeError: {
          name: i.$kind,
          packageId:
            i.$kind === "UnableToFetchPackage"
              ? i.UnableToFetchPackage.packageId
              : void 0,
          digest:
            i.$kind === "DigestDoesNotMatch"
              ? ze(i.DigestDoesNotMatch.digest)
              : void 0,
        },
      };
    }
    case "ExecutionCancelledDueToSharedObjectCongestion":
      return {
        $kind: "CongestedObjects",
        message: Lt(
          "ExecutionCancelledDueToSharedObjectCongestion",
          t.ExecutionCancelledDueToSharedObjectCongestion,
        ),
        command: n,
        CongestedObjects: {
          name: "ExecutionCanceledDueToConsensusObjectCongestion",
          objects:
            t.ExecutionCancelledDueToSharedObjectCongestion.congested_objects,
        },
      };
    case "AddressDeniedForCoin":
      return {
        $kind: "CoinDenyListError",
        message: Lt("AddressDeniedForCoin", t.AddressDeniedForCoin),
        command: n,
        CoinDenyListError: {
          name: "AddressDeniedForCoin",
          address: t.AddressDeniedForCoin.address,
          coinType: t.AddressDeniedForCoin.coinType,
        },
      };
    case "CoinTypeGlobalPause":
      return {
        $kind: "CoinDenyListError",
        message: Lt("CoinTypeGlobalPause", t.CoinTypeGlobalPause),
        command: n,
        CoinDenyListError: {
          name: "CoinTypeGlobalPause",
          coinType: t.CoinTypeGlobalPause.coinType,
        },
      };
    case "CircularObjectOwnership":
      return {
        $kind: "ObjectIdError",
        message: Lt("CircularObjectOwnership", t.CircularObjectOwnership),
        command: n,
        ObjectIdError: {
          name: "CircularObjectOwnership",
          objectId: t.CircularObjectOwnership.object,
        },
      };
    case "InvalidGasObject":
      return {
        $kind: "ObjectIdError",
        message: "InvalidGasObject",
        command: n,
        ObjectIdError: { name: "InvalidGasObject", objectId: "" },
      };
    case "InputObjectDeleted":
      return {
        $kind: "ObjectIdError",
        message: "InputObjectDeleted",
        command: n,
        ObjectIdError: { name: "InputObjectDeleted", objectId: "" },
      };
    case "InvalidTransferObject":
      return {
        $kind: "ObjectIdError",
        message: "InvalidTransferObject",
        command: n,
        ObjectIdError: { name: "InvalidTransferObject", objectId: "" },
      };
    case "NonExclusiveWriteInputObjectModified":
      return {
        $kind: "Unknown",
        message: Lt(
          "NonExclusiveWriteInputObjectModified",
          t.NonExclusiveWriteInputObjectModified,
        ),
        command: n,
        Unknown: null,
      };
    case "InsufficientGas":
    case "InvariantViolation":
    case "FeatureNotYetSupported":
    case "InsufficientCoinBalance":
    case "CoinBalanceOverflow":
    case "PublishErrorNonZeroAddress":
    case "SuiMoveVerificationError":
    case "MovePrimitiveRuntimeError":
    case "VMVerificationOrDeserializationError":
    case "VMInvariantViolation":
    case "FunctionNotFound":
    case "ArityMismatch":
    case "TypeArityMismatch":
    case "NonEntryFunctionInvoked":
    case "UnusedValueWithoutDrop":
    case "InvalidPublicFunctionReturnType":
    case "PublishUpgradeMissingDependency":
    case "PublishUpgradeDependencyDowngrade":
    case "CertificateDenied":
    case "SuiMoveVerificationTimedout":
    case "SharedObjectOperationNotAllowed":
    case "ExecutionCancelledDueToRandomnessUnavailable":
    case "InvalidLinkage":
    case "InsufficientBalanceForWithdraw":
      return { $kind: "Unknown", message: t.$kind, command: n, Unknown: null };
    default:
      return {
        $kind: "Unknown",
        message: "Unknown error",
        command: n,
        Unknown: null,
      };
  }
}
function ER(e, t = !1) {
  return (t ? Dn.fromKindBytes(e) : Dn.fromBytes(e)).snapshot();
}
function xR(e) {
  const t = pe.TransactionEffects.parse(e);
  switch (t.$kind) {
    case "V1":
      return CR({ effects: t.V1 });
    case "V2":
      return kR({ bytes: e, effects: t.V2 });
    default:
      throw new Error(`Unknown transaction effects version: ${t.$kind}`);
  }
}
function CR(e) {
  throw new Error("V1 effects are not supported yet");
}
function kR({ bytes: e, effects: t }) {
  const n = t.changedObjects.map(([i, o]) => ({
    objectId: i,
    inputState: o.inputState.$kind === "Exist" ? "Exists" : "DoesNotExist",
    inputVersion: o.inputState.Exist?.[0][0] ?? null,
    inputDigest: o.inputState.Exist?.[0][1] ?? null,
    inputOwner: o.inputState.Exist?.[1] ?? null,
    outputState:
      o.outputState.$kind === "NotExist" ? "DoesNotExist" : o.outputState.$kind,
    outputVersion:
      o.outputState.$kind === "PackageWrite"
        ? o.outputState.PackageWrite?.[0]
        : o.outputState.$kind === "ObjectWrite"
          ? t.lamportVersion
          : null,
    outputDigest:
      o.outputState.$kind === "PackageWrite"
        ? o.outputState.PackageWrite?.[1]
        : o.outputState.$kind === "ObjectWrite"
          ? (o.outputState.ObjectWrite?.[0] ?? null)
          : null,
    outputOwner:
      o.outputState.$kind === "ObjectWrite"
        ? o.outputState.ObjectWrite[1]
        : null,
    idOperation: o.idOperation.$kind,
  }));
  return {
    bcs: e,
    version: 2,
    status:
      t.status.$kind === "Success"
        ? { success: !0, error: null }
        : { success: !1, error: SR(t.status.Failure) },
    gasUsed: t.gasUsed,
    transactionDigest: t.transactionDigest,
    gasObject: t.gasObjectIndex === null ? null : (n[t.gasObjectIndex] ?? null),
    eventsDigest: t.eventsDigest,
    dependencies: t.dependencies,
    lamportVersion: t.lamportVersion,
    changedObjects: n,
    unchangedConsensusObjects: t.unchangedConsensusObjects.map(([i, o]) => ({
      kind: o.$kind,
      objectId: i,
      version: o.$kind === "ReadOnlyRoot" ? o.ReadOnlyRoot[0] : o[o.$kind],
      digest: o.$kind === "ReadOnlyRoot" ? o.ReadOnlyRoot[1] : null,
    })),
    auxiliaryDataDigest: t.auxDataDigest,
  };
}
const OR = 5e10;
function TS(e, t) {
  if (e.status === "success") return { success: !0, error: null };
  const n = e.error ?? "Unknown";
  if (t) {
    const i = n.match(/in command (\d+)/),
      o = i ? parseInt(i[1], 10) : void 0,
      l = n.match(/instruction:\s*(\d+)/),
      u = l ? parseInt(l[1], 10) : void 0,
      d = t.module_id?.split("::") ?? [],
      f = d[0] ? Ee(d[0]) : void 0,
      m = d[1];
    return {
      success: !1,
      error: {
        $kind: "MoveAbort",
        message: OS({
          command: o,
          location:
            f && m
              ? {
                  package: f,
                  module: m,
                  functionName: t.function ?? void 0,
                  instruction: u,
                }
              : void 0,
          abortCode: String(t.error_code ?? 0),
          cleverError: t.line != null ? { lineNumber: t.line } : void 0,
        }),
        command: o,
        MoveAbort: {
          abortCode: String(t.error_code ?? 0),
          location: t.module_id
            ? {
                package: Ee(t.module_id.split("::")[0] ?? ""),
                module: t.module_id.split("::")[1] ?? "",
                functionName: t.function ?? void 0,
                instruction: u,
              }
            : void 0,
        },
      },
    };
  }
  return {
    success: !1,
    error: { $kind: "Unknown", message: n, Unknown: null },
  };
}
var TR = class extends gR {
  #e;
  constructor({ jsonRpcClient: e, mvr: t }) {
    (super({ network: e.network, base: e, mvr: t }), (this.#e = e));
  }
  async getObjects(e) {
    const t = Gl(e.objectIds, 50),
      n = [];
    for (const i of t) {
      const o = await this.#e.multiGetObjects({
        ids: i,
        options: {
          showOwner: !0,
          showType: !0,
          showBcs: !!(e.include?.content || e.include?.objectBcs),
          showPreviousTransaction: !!(
            e.include?.previousTransaction || e.include?.objectBcs
          ),
          showStorageRebate: e.include?.objectBcs ?? !1,
          showContent: e.include?.json ?? !1,
        },
        signal: e.signal,
      });
      for (const [l, u] of o.entries())
        u.error
          ? n.push(_y.fromResponse(u.error, i[l]))
          : n.push(gv(u.data, e.include));
    }
    return { objects: n };
  }
  async listOwnedObjects(e) {
    let t = null;
    if (e.type) {
      const i = e.type.split("::");
      i.length === 1
        ? (t = { Package: e.type })
        : i.length === 2
          ? (t = { MoveModule: { package: i[0], module: i[1] } })
          : (t = { StructType: e.type });
    }
    const n = await this.#e.getOwnedObjects({
      owner: e.owner,
      limit: e.limit,
      cursor: e.cursor,
      options: {
        showOwner: !0,
        showType: !0,
        showBcs: !!(e.include?.content || e.include?.objectBcs),
        showPreviousTransaction: !!(
          e.include?.previousTransaction || e.include?.objectBcs
        ),
        showStorageRebate: e.include?.objectBcs ?? !1,
        showContent: e.include?.json ?? !1,
      },
      filter: t,
      signal: e.signal,
    });
    return {
      objects: n.data.map((i) => {
        if (i.error) throw _y.fromResponse(i.error);
        return gv(i.data, e.include);
      }),
      hasNextPage: n.hasNextPage,
      cursor: n.nextCursor ?? null,
    };
  }
  async listCoins(e) {
    const t = await this.#e.getCoins({
      owner: e.owner,
      coinType: e.coinType,
      limit: e.limit,
      cursor: e.cursor,
      signal: e.signal,
    });
    return {
      objects: t.data.map((n) => ({
        objectId: n.coinObjectId,
        version: n.version,
        digest: n.digest,
        balance: n.balance,
        type: Ke(`0x2::coin::Coin<${n.coinType}>`),
        owner: { $kind: "AddressOwner", AddressOwner: e.owner },
      })),
      hasNextPage: t.hasNextPage,
      cursor: t.nextCursor ?? null,
    };
  }
  async getBalance(e) {
    const t = await this.#e.getBalance({
        owner: e.owner,
        coinType: e.coinType,
        signal: e.signal,
      }),
      n = t.fundsInAddressBalance ?? "0",
      i = String(BigInt(t.totalBalance) - BigInt(n));
    return {
      balance: {
        coinType: Ke(t.coinType),
        balance: t.totalBalance,
        coinBalance: i,
        addressBalance: n,
      },
    };
  }
  async getCoinMetadata(e) {
    const t = (await this.mvr.resolveType({ type: e.coinType })).type,
      n = await this.#e.getCoinMetadata({ coinType: t, signal: e.signal });
    return n
      ? {
          coinMetadata: {
            id: n.id ?? null,
            decimals: n.decimals,
            name: n.name,
            symbol: n.symbol,
            description: n.description,
            iconUrl: n.iconUrl ?? null,
          },
        }
      : { coinMetadata: null };
  }
  async listBalances(e) {
    return {
      balances: (
        await this.#e.getAllBalances({ owner: e.owner, signal: e.signal })
      ).map((t) => {
        const n = t.fundsInAddressBalance ?? "0",
          i = String(BigInt(t.totalBalance) - BigInt(n));
        return {
          coinType: Ke(t.coinType),
          balance: t.totalBalance,
          coinBalance: i,
          addressBalance: n,
        };
      }),
      hasNextPage: !1,
      cursor: null,
    };
  }
  async getTransaction(e) {
    return yv(
      await this.#e.getTransactionBlock({
        digest: e.digest,
        options: {
          showRawInput: !0,
          showEffects: !0,
          showObjectChanges: e.include?.objectTypes ?? !1,
          showRawEffects: e.include?.effects ?? !1,
          showEvents: e.include?.events ?? !1,
          showBalanceChanges: e.include?.balanceChanges ?? !1,
        },
        signal: e.signal,
      }),
      e.include,
    );
  }
  async executeTransaction(e) {
    return yv(
      await this.#e.executeTransactionBlock({
        transactionBlock: e.transaction,
        signature: e.signatures,
        options: {
          showRawInput: !0,
          showEffects: !0,
          showRawEffects: e.include?.effects ?? !1,
          showEvents: e.include?.events ?? !1,
          showObjectChanges: e.include?.objectTypes ?? !1,
          showBalanceChanges: e.include?.balanceChanges ?? !1,
        },
        signal: e.signal,
      }),
      e.include,
    );
  }
  async simulateTransaction(e) {
    e.transaction instanceof Uint8Array ||
      (await e.transaction.prepareForSerialization({ client: this }));
    const t = zo.from(e.transaction),
      n =
        e.transaction instanceof Uint8Array
          ? null
          : Dn.restore(e.transaction.getData()),
      i = n
        ? n.build({
            overrides: {
              gasData: {
                budget: n.gasData.budget ?? String(OR),
                price:
                  n.gasData.price ??
                  String(await this.#e.getReferenceGasPrice()),
                payment: n.gasData.payment ?? [],
              },
            },
          })
        : e.transaction,
      o = await this.#e.dryRunTransactionBlock({
        transactionBlock: i,
        signal: e.signal,
      }),
      { effects: l, objectTypes: u } = AR({
        effects: o.effects,
        objectChanges: o.objectChanges,
      }),
      d = {
        digest: Dn.getDigestFromBytes(i),
        epoch: null,
        status: l.status,
        effects: e.include?.effects ? l : void 0,
        objectTypes: e.include?.objectTypes ? u : void 0,
        signatures: [],
        transaction: e.include?.transaction
          ? ER(
              e.transaction instanceof Uint8Array
                ? e.transaction
                : await e.transaction.build({ client: this }).catch(() => null),
            )
          : void 0,
        bcs: e.include?.bcs ? i : void 0,
        balanceChanges: e.include?.balanceChanges
          ? o.balanceChanges.map((m) => ({
              coinType: Ke(m.coinType),
              address: IS(m.owner),
              amount: m.amount,
            }))
          : void 0,
        events: e.include?.events
          ? (o.events?.map((m) => ({
              packageId: m.packageId,
              module: m.transactionModule,
              sender: m.sender,
              eventType: m.type,
              bcs: "bcs" in m ? rt(m.bcs) : new Uint8Array(),
              json: m.parsedJson ?? null,
            })) ?? [])
          : void 0,
      };
    let f;
    if (e.include?.commandResults)
      try {
        const m = t.getData().sender ?? Ee("0x0"),
          g = await this.#e.devInspectTransactionBlock({
            sender: m,
            transactionBlock: t,
            signal: e.signal,
          });
        g.results &&
          (f = g.results.map((y) => ({
            returnValues: (y.returnValues ?? []).map(([v]) => ({
              bcs: new Uint8Array(v),
            })),
            mutatedReferences: (y.mutableReferenceOutputs ?? []).map(
              ([, v]) => ({ bcs: new Uint8Array(v) }),
            ),
          })));
      } catch {}
    return l.status.success
      ? { $kind: "Transaction", Transaction: d, commandResults: f }
      : { $kind: "FailedTransaction", FailedTransaction: d, commandResults: f };
  }
  async getReferenceGasPrice(e) {
    const t = await this.#e.getReferenceGasPrice({ signal: e?.signal });
    return { referenceGasPrice: String(t) };
  }
  async getCurrentSystemState(e) {
    const t = await this.#e.getLatestSuiSystemState({ signal: e?.signal });
    return {
      systemState: {
        systemStateVersion: t.systemStateVersion,
        epoch: t.epoch,
        protocolVersion: t.protocolVersion,
        referenceGasPrice: t.referenceGasPrice?.toString() ?? null,
        epochStartTimestampMs: t.epochStartTimestampMs,
        safeMode: t.safeMode,
        safeModeStorageRewards: t.safeModeStorageRewards,
        safeModeComputationRewards: t.safeModeComputationRewards,
        safeModeStorageRebates: t.safeModeStorageRebates,
        safeModeNonRefundableStorageFee: t.safeModeNonRefundableStorageFee,
        parameters: {
          epochDurationMs: t.epochDurationMs,
          stakeSubsidyStartEpoch: t.stakeSubsidyStartEpoch,
          maxValidatorCount: t.maxValidatorCount,
          minValidatorJoiningStake: t.minValidatorJoiningStake,
          validatorLowStakeThreshold: t.validatorLowStakeThreshold,
          validatorLowStakeGracePeriod: t.validatorLowStakeGracePeriod,
        },
        storageFund: {
          totalObjectStorageRebates: t.storageFundTotalObjectStorageRebates,
          nonRefundableBalance: t.storageFundNonRefundableBalance,
        },
        stakeSubsidy: {
          balance: t.stakeSubsidyBalance,
          distributionCounter: t.stakeSubsidyDistributionCounter,
          currentDistributionAmount: t.stakeSubsidyCurrentDistributionAmount,
          stakeSubsidyPeriodLength: t.stakeSubsidyPeriodLength,
          stakeSubsidyDecreaseRate: t.stakeSubsidyDecreaseRate,
        },
      },
    };
  }
  async listDynamicFields(e) {
    const t = await this.#e.getDynamicFields({
      parentId: e.parentId,
      limit: e.limit,
      cursor: e.cursor,
    });
    return {
      dynamicFields: t.data.map((n) => {
        const i = n.type === "DynamicObject",
          o = i
            ? `0x2::dynamic_field::Field<0x2::dynamic_object_field::Wrapper<${n.name.type}>, 0x2::object::ID>`
            : `0x2::dynamic_field::Field<${n.name.type}, ${n.objectType}>`,
          l = rt(n.bcsName),
          u = i
            ? `0x2::dynamic_object_field::Wrapper<${n.name.type}>`
            : n.name.type;
        return {
          $kind: i ? "DynamicObject" : "DynamicField",
          fieldId: A0(e.parentId, u, l),
          type: Ke(o),
          name: { type: n.name.type, bcs: l },
          valueType: n.objectType,
          childId: i ? n.objectId : void 0,
        };
      }),
      hasNextPage: t.hasNextPage,
      cursor: t.nextCursor,
    };
  }
  async verifyZkLoginSignature(e) {
    const t = await this.#e.verifyZkLoginSignature({
      bytes: e.bytes,
      signature: e.signature,
      intentScope: e.intentScope,
      author: e.address,
    });
    return { success: t.success, errors: t.errors };
  }
  async defaultNameServiceName(e) {
    return {
      data: { name: (await this.#e.resolveNameServiceNames(e)).data[0] },
    };
  }
  resolveTransactionPlugin() {
    return V0;
  }
  async getMoveFunction(e) {
    const t = (await this.mvr.resolvePackage({ package: e.packageId })).package,
      n = await this.#e.getNormalizedMoveFunction({
        package: t,
        module: e.moduleName,
        function: e.name,
      });
    return {
      function: {
        packageId: Ee(t),
        moduleName: e.moduleName,
        name: e.name,
        visibility: RR(n.visibility),
        isEntry: n.isEntry,
        typeParameters: n.typeParameters.map((i) => ({
          isPhantom: !1,
          constraints: jR(i),
        })),
        parameters: n.parameters.map((i) => vv(i)),
        returns: n.return.map((i) => vv(i)),
      },
    };
  }
  async getChainIdentifier(e) {
    return this.cache.read(["chainIdentifier"], async () => ({
      chainIdentifier: (await this.#e.getCheckpoint({ id: "0" })).digest,
    }));
  }
};
function IR(e) {
  if (e.bcs?.dataType === "moveObject")
    try {
      const t = Ke(e.bcs.type);
      let n;
      const i = Ee(vi),
        o = Ke(`${vi}::coin::Coin<${vi}::sui::SUI>`),
        l = Ke(`${yT}::staking_pool::StakedSui`),
        u = `${i}::coin::Coin<`;
      if (t === o) n = { GasCoin: null };
      else if (t === l) n = { StakedSui: null };
      else if (t.startsWith(u)) {
        const m = t.match(
          new RegExp(
            `${i.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}::coin::Coin<(.+)>$`,
          ),
        );
        if (m) n = { Coin: ws.parseFromStr(m[1], !0) };
        else throw new Error("Failed to parse Coin type");
      } else {
        const m = ws.parseFromStr(t, !0);
        if (typeof m != "object" || !("struct" in m))
          throw new Error("Expected struct type tag");
        n = { Other: m.struct };
      }
      const d = rt(e.bcs.bcsBytes),
        f = MR(e.owner);
      return pe.Object.serialize({
        data: {
          Move: {
            type: n,
            hasPublicTransfer: e.bcs.hasPublicTransfer,
            version: e.bcs.version,
            contents: d,
          },
        },
        owner: f,
        previousTransaction: e.previousTransaction,
        storageRebate: e.storageRebate,
      }).toBytes();
    } catch {
      return;
    }
}
function gv(e, t) {
  const n = e.bcs?.dataType === "moveObject" ? rt(e.bcs.bcsBytes) : void 0,
    i = t?.objectBcs ? IR(e) : void 0,
    o = e.type && e.type.includes("::") ? Ke(e.type) : (e.type ?? ""),
    l =
      t?.json && e.content?.dataType === "moveObject"
        ? e.content.fields
        : t?.json
          ? null
          : void 0;
  return {
    objectId: e.objectId,
    version: e.version,
    digest: e.digest,
    type: o,
    content: t?.content ? n : void 0,
    owner: di(e.owner),
    previousTransaction: t?.previousTransaction
      ? (e.previousTransaction ?? void 0)
      : void 0,
    objectBcs: i,
    json: l,
  };
}
function di(e) {
  if (e === "Immutable") return { $kind: "Immutable", Immutable: !0 };
  if ("ConsensusAddressOwner" in e)
    return {
      $kind: "ConsensusAddressOwner",
      ConsensusAddressOwner: {
        owner: e.ConsensusAddressOwner.owner,
        startVersion: e.ConsensusAddressOwner.start_version,
      },
    };
  if ("AddressOwner" in e)
    return { $kind: "AddressOwner", AddressOwner: e.AddressOwner };
  if ("ObjectOwner" in e)
    return { $kind: "ObjectOwner", ObjectOwner: e.ObjectOwner };
  if ("Shared" in e)
    return {
      $kind: "Shared",
      Shared: { initialSharedVersion: e.Shared.initial_shared_version },
    };
  throw new Error(`Unknown owner type: ${JSON.stringify(e)}`);
}
function MR(e) {
  if (e === "Immutable") return { Immutable: null };
  if ("AddressOwner" in e) return { AddressOwner: e.AddressOwner };
  if ("ObjectOwner" in e) return { ObjectOwner: e.ObjectOwner };
  if ("Shared" in e)
    return {
      Shared: { initialSharedVersion: e.Shared.initial_shared_version },
    };
  if (typeof e == "object" && e !== null && "ConsensusAddressOwner" in e)
    return {
      ConsensusAddressOwner: {
        startVersion: e.ConsensusAddressOwner.start_version,
        owner: e.ConsensusAddressOwner.owner,
      },
    };
  throw new Error(`Unknown owner type: ${JSON.stringify(e)}`);
}
function IS(e) {
  if (e === "Immutable") return null;
  if ("ConsensusAddressOwner" in e) return e.ConsensusAddressOwner.owner;
  if ("AddressOwner" in e) return e.AddressOwner;
  if ("ObjectOwner" in e) return e.ObjectOwner;
  if ("Shared" in e) return null;
  throw new Error(`Unknown owner type: ${JSON.stringify(e)}`);
}
function yv(e, t) {
  const n = {};
  t?.objectTypes &&
    e.objectChanges?.forEach((m) => {
      m.type !== "published" && (n[m.objectId] = Ke(m.objectType));
    });
  let i,
    o = [],
    l;
  if (e.rawTransaction) {
    const m = pe.SenderSignedData.parse(rt(e.rawTransaction))[0];
    if (((o = m.txSignatures), t?.transaction || t?.bcs)) {
      const g = pe.TransactionData.serialize(m.intentMessage.value).toBytes();
      (t?.bcs && (l = g),
        t?.transaction &&
          (i = {
            ...Dn.restore({
              version: 2,
              sender: m.intentMessage.value.V1.sender,
              expiration: m.intentMessage.value.V1.expiration,
              gasData: m.intentMessage.value.V1.gasData,
              inputs:
                m.intentMessage.value.V1.kind.ProgrammableTransaction.inputs,
              commands:
                m.intentMessage.value.V1.kind.ProgrammableTransaction.commands,
            }),
          }));
    }
  }
  const u = e.effects?.status
      ? TS(e.effects.status, e.effects.abortError)
      : {
          success: !1,
          error: { $kind: "Unknown", message: "Unknown", Unknown: null },
        },
    d = e.rawEffects ? new Uint8Array(e.rawEffects) : null,
    f = {
      digest: e.digest,
      epoch: e.effects?.executedEpoch ?? null,
      status: u,
      effects: t?.effects && d ? xR(d) : void 0,
      objectTypes: t?.objectTypes ? n : void 0,
      transaction: i,
      bcs: l,
      signatures: o,
      balanceChanges: t?.balanceChanges
        ? (e.balanceChanges?.map((m) => ({
            coinType: Ke(m.coinType),
            address: IS(m.owner),
            amount: m.amount,
          })) ?? [])
        : void 0,
      events: t?.events
        ? (e.events?.map((m) => ({
            packageId: m.packageId,
            module: m.transactionModule,
            sender: m.sender,
            eventType: m.type,
            bcs: "bcs" in m ? rt(m.bcs) : new Uint8Array(),
            json: m.parsedJson ?? null,
          })) ?? [])
        : void 0,
    };
  return u.success
    ? { $kind: "Transaction", Transaction: f }
    : { $kind: "FailedTransaction", FailedTransaction: f };
}
function AR({ bytes: e, effects: t, objectChanges: n }) {
  const i = [],
    o = [],
    l = {};
  return (
    n?.forEach((u) => {
      switch (u.type) {
        case "published":
          i.push({
            objectId: u.packageId,
            inputState: "DoesNotExist",
            inputVersion: null,
            inputDigest: null,
            inputOwner: null,
            outputState: "PackageWrite",
            outputVersion: u.version,
            outputDigest: u.digest,
            outputOwner: null,
            idOperation: "Created",
          });
          break;
        case "transferred":
          (i.push({
            objectId: u.objectId,
            inputState: "Exists",
            inputVersion: u.version,
            inputDigest: u.digest,
            inputOwner: { $kind: "AddressOwner", AddressOwner: u.sender },
            outputState: "ObjectWrite",
            outputVersion: u.version,
            outputDigest: u.digest,
            outputOwner: di(u.recipient),
            idOperation: "None",
          }),
            (l[u.objectId] = Ke(u.objectType)));
          break;
        case "mutated":
          (i.push({
            objectId: u.objectId,
            inputState: "Exists",
            inputVersion: u.previousVersion,
            inputDigest: null,
            inputOwner: di(u.owner),
            outputState: "ObjectWrite",
            outputVersion: u.version,
            outputDigest: u.digest,
            outputOwner: di(u.owner),
            idOperation: "None",
          }),
            (l[u.objectId] = Ke(u.objectType)));
          break;
        case "deleted":
          (i.push({
            objectId: u.objectId,
            inputState: "Exists",
            inputVersion: u.version,
            inputDigest:
              t.deleted?.find((d) => d.objectId === u.objectId)?.digest ?? null,
            inputOwner: null,
            outputState: "DoesNotExist",
            outputVersion: null,
            outputDigest: null,
            outputOwner: null,
            idOperation: "Deleted",
          }),
            (l[u.objectId] = Ke(u.objectType)));
          break;
        case "wrapped":
          (i.push({
            objectId: u.objectId,
            inputState: "Exists",
            inputVersion: u.version,
            inputDigest: null,
            inputOwner: { $kind: "AddressOwner", AddressOwner: u.sender },
            outputState: "ObjectWrite",
            outputVersion: u.version,
            outputDigest:
              t.wrapped?.find((d) => d.objectId === u.objectId)?.digest ?? null,
            outputOwner: { $kind: "ObjectOwner", ObjectOwner: u.sender },
            idOperation: "None",
          }),
            (l[u.objectId] = Ke(u.objectType)));
          break;
        case "created":
          (i.push({
            objectId: u.objectId,
            inputState: "DoesNotExist",
            inputVersion: null,
            inputDigest: null,
            inputOwner: null,
            outputState: "ObjectWrite",
            outputVersion: u.version,
            outputDigest: u.digest,
            outputOwner: di(u.owner),
            idOperation: "Created",
          }),
            (l[u.objectId] = Ke(u.objectType)));
          break;
      }
    }),
    {
      objectTypes: l,
      effects: {
        bcs: e ?? null,
        version: 2,
        status: TS(t.status, t.abortError),
        gasUsed: t.gasUsed,
        transactionDigest: t.transactionDigest,
        gasObject: {
          objectId: t.gasObject?.reference.objectId,
          inputState: "Exists",
          inputVersion: null,
          inputDigest: null,
          inputOwner: null,
          outputState: "ObjectWrite",
          outputVersion: t.gasObject.reference.version,
          outputDigest: t.gasObject.reference.digest,
          outputOwner: di(t.gasObject.owner),
          idOperation: "None",
        },
        eventsDigest: t.eventsDigest ?? null,
        dependencies: t.dependencies ?? [],
        lamportVersion: t.gasObject.reference.version,
        changedObjects: i,
        unchangedConsensusObjects: o,
        auxiliaryDataDigest: null,
      },
    }
  );
}
function vv(e) {
  if (typeof e != "string") {
    if ("Reference" in e)
      return { reference: "immutable", body: Ro(e.Reference) };
    if ("MutableReference" in e)
      return { reference: "mutable", body: Ro(e.MutableReference) };
  }
  return { reference: null, body: Ro(e) };
}
function Ro(e) {
  switch (e) {
    case "Address":
      return { $kind: "address" };
    case "Bool":
      return { $kind: "bool" };
    case "U8":
      return { $kind: "u8" };
    case "U16":
      return { $kind: "u16" };
    case "U32":
      return { $kind: "u32" };
    case "U64":
      return { $kind: "u64" };
    case "U128":
      return { $kind: "u128" };
    case "U256":
      return { $kind: "u256" };
  }
  if (typeof e == "string") throw new Error(`Unknown type: ${e}`);
  if ("Vector" in e) return { $kind: "vector", vector: Ro(e.Vector) };
  if ("Struct" in e)
    return {
      $kind: "datatype",
      datatype: {
        typeName: `${Ee(e.Struct.address)}::${e.Struct.module}::${e.Struct.name}`,
        typeParameters: e.Struct.typeArguments.map((t) => Ro(t)),
      },
    };
  if ("TypeParameter" in e)
    return { $kind: "typeParameter", index: e.TypeParameter };
  throw new Error(`Unknown type: ${JSON.stringify(e)}`);
}
function jR(e) {
  return e.abilities.map((t) => {
    switch (t) {
      case "Copy":
        return "copy";
      case "Drop":
        return "drop";
      case "Store":
        return "store";
      case "Key":
        return "key";
      default:
        return "unknown";
    }
  });
}
function RR(e) {
  switch (e) {
    case "Public":
      return "public";
    case "Private":
      return "private";
    case "Friend":
      return "friend";
    default:
      return "unknown";
  }
}
const MS = Symbol.for("@mysten/SuiJsonRpcClient"),
  _R = new Uint8Array([
    172, 172, 172, 172, 172, 172, 172, 172, 172, 172, 172, 172, 172, 172, 172,
    172, 172, 172, 172, 172,
  ]);
function wv(e) {
  return Ei(e)
    .slice(12, 32)
    .every((t, n) => t === _R[n]);
}
function NR(e) {
  return typeof e == "object" && e !== null && e[MS] === !0;
}
var AS = class extends kS {
  get [MS]() {
    return !0;
  }
  constructor(e) {
    (super({ network: e.network }),
      (this.jsonRpc = this),
      (this.transport = e.transport ?? new hR({ url: e.url })),
      (this.core = new TR({ jsonRpcClient: this, mvr: e.mvr })));
  }
  async getRpcApiVersion({ signal: e } = {}) {
    return (
      await this.transport.request({
        method: "rpc.discover",
        params: [],
        signal: e,
      })
    ).info.version;
  }
  async getCoins({ coinType: e, owner: t, cursor: n, limit: i, signal: o }) {
    if (!t || !ln(Ee(t))) throw new Error("Invalid Sui address");
    e && St(e) && (e = (await this.core.mvr.resolveType({ type: e })).type);
    const l = await this.transport.request({
      method: "suix_getCoins",
      params: [t, e, n, i],
      signal: o,
    });
    return { ...l, data: l.data.filter((u) => !wv(u.digest)) };
  }
  async getAllCoins(e) {
    if (!e.owner || !ln(Ee(e.owner))) throw new Error("Invalid Sui address");
    const t = await this.transport.request({
      method: "suix_getAllCoins",
      params: [e.owner, e.cursor, e.limit],
      signal: e.signal,
    });
    return { ...t, data: t.data.filter((n) => !wv(n.digest)) };
  }
  async getBalance({ owner: e, coinType: t, signal: n }) {
    if (!e || !ln(Ee(e))) throw new Error("Invalid Sui address");
    return (
      t && St(t) && (t = (await this.core.mvr.resolveType({ type: t })).type),
      await this.transport.request({
        method: "suix_getBalance",
        params: [e, t],
        signal: n,
      })
    );
  }
  async getAllBalances(e) {
    if (!e.owner || !ln(Ee(e.owner))) throw new Error("Invalid Sui address");
    return await this.transport.request({
      method: "suix_getAllBalances",
      params: [e.owner],
      signal: e.signal,
    });
  }
  async getCoinMetadata({ coinType: e, signal: t }) {
    return (
      e && St(e) && (e = (await this.core.mvr.resolveType({ type: e })).type),
      await this.transport.request({
        method: "suix_getCoinMetadata",
        params: [e],
        signal: t,
      })
    );
  }
  async getTotalSupply({ coinType: e, signal: t }) {
    return (
      e && St(e) && (e = (await this.core.mvr.resolveType({ type: e })).type),
      await this.transport.request({
        method: "suix_getTotalSupply",
        params: [e],
        signal: t,
      })
    );
  }
  async call(e, t, { signal: n } = {}) {
    return await this.transport.request({ method: e, params: t, signal: n });
  }
  async getMoveFunctionArgTypes({
    package: e,
    module: t,
    function: n,
    signal: i,
  }) {
    return (
      e &&
        Bt(e) &&
        (e = (await this.core.mvr.resolvePackage({ package: e })).package),
      await this.transport.request({
        method: "sui_getMoveFunctionArgTypes",
        params: [e, t, n],
        signal: i,
      })
    );
  }
  async getNormalizedMoveModulesByPackage({ package: e, signal: t }) {
    return (
      e &&
        Bt(e) &&
        (e = (await this.core.mvr.resolvePackage({ package: e })).package),
      await this.transport.request({
        method: "sui_getNormalizedMoveModulesByPackage",
        params: [e],
        signal: t,
      })
    );
  }
  async getNormalizedMoveModule({ package: e, module: t, signal: n }) {
    return (
      e &&
        Bt(e) &&
        (e = (await this.core.mvr.resolvePackage({ package: e })).package),
      await this.transport.request({
        method: "sui_getNormalizedMoveModule",
        params: [e, t],
        signal: n,
      })
    );
  }
  async getNormalizedMoveFunction({
    package: e,
    module: t,
    function: n,
    signal: i,
  }) {
    return (
      e &&
        Bt(e) &&
        (e = (await this.core.mvr.resolvePackage({ package: e })).package),
      await this.transport.request({
        method: "sui_getNormalizedMoveFunction",
        params: [e, t, n],
        signal: i,
      })
    );
  }
  async getNormalizedMoveStruct({
    package: e,
    module: t,
    struct: n,
    signal: i,
  }) {
    return (
      e &&
        Bt(e) &&
        (e = (await this.core.mvr.resolvePackage({ package: e })).package),
      await this.transport.request({
        method: "sui_getNormalizedMoveStruct",
        params: [e, t, n],
        signal: i,
      })
    );
  }
  async getOwnedObjects(e) {
    if (!e.owner || !ln(Ee(e.owner))) throw new Error("Invalid Sui address");
    const t = e.filter ? { ...e.filter } : void 0;
    return (
      t && "MoveModule" in t && Bt(t.MoveModule.package)
        ? (t.MoveModule = {
            module: t.MoveModule.module,
            package: (
              await this.core.mvr.resolvePackage({
                package: t.MoveModule.package,
              })
            ).package,
          })
        : t &&
          "StructType" in t &&
          St(t.StructType) &&
          (t.StructType = (
            await this.core.mvr.resolveType({ type: t.StructType })
          ).type),
      await this.transport.request({
        method: "suix_getOwnedObjects",
        params: [e.owner, { filter: t, options: e.options }, e.cursor, e.limit],
        signal: e.signal,
      })
    );
  }
  async getObject(e) {
    if (!e.id || !wl(ps(e.id))) throw new Error("Invalid Sui Object id");
    return await this.transport.request({
      method: "sui_getObject",
      params: [e.id, e.options],
      signal: e.signal,
    });
  }
  async tryGetPastObject(e) {
    return await this.transport.request({
      method: "sui_tryGetPastObject",
      params: [e.id, e.version, e.options],
      signal: e.signal,
    });
  }
  async multiGetObjects(e) {
    if (
      (e.ids.forEach((t) => {
        if (!t || !wl(ps(t))) throw new Error(`Invalid Sui Object id ${t}`);
      }),
      e.ids.length !== new Set(e.ids).size)
    )
      throw new Error(`Duplicate object ids in batch call ${e.ids}`);
    return await this.transport.request({
      method: "sui_multiGetObjects",
      params: [e.ids, e.options],
      signal: e.signal,
    });
  }
  async queryTransactionBlocks({
    filter: e,
    options: t,
    cursor: n,
    limit: i,
    order: o,
    signal: l,
  }) {
    return (
      e &&
        "MoveFunction" in e &&
        Bt(e.MoveFunction.package) &&
        (e = {
          ...e,
          MoveFunction: {
            package: (
              await this.core.mvr.resolvePackage({
                package: e.MoveFunction.package,
              })
            ).package,
          },
        }),
      await this.transport.request({
        method: "suix_queryTransactionBlocks",
        params: [
          { filter: e, options: t },
          n,
          i,
          (o || "descending") === "descending",
        ],
        signal: l,
      })
    );
  }
  async getTransactionBlock(e) {
    if (!vy(e.digest)) throw new Error("Invalid Transaction digest");
    return await this.transport.request({
      method: "sui_getTransactionBlock",
      params: [e.digest, e.options],
      signal: e.signal,
    });
  }
  async multiGetTransactionBlocks(e) {
    if (
      (e.digests.forEach((t) => {
        if (!vy(t)) throw new Error(`Invalid Transaction digest ${t}`);
      }),
      e.digests.length !== new Set(e.digests).size)
    )
      throw new Error(`Duplicate digests in batch call ${e.digests}`);
    return await this.transport.request({
      method: "sui_multiGetTransactionBlocks",
      params: [e.digests, e.options],
      signal: e.signal,
    });
  }
  async executeTransactionBlock({
    transactionBlock: e,
    signature: t,
    options: n,
    signal: i,
  }) {
    return await this.transport.request({
      method: "sui_executeTransactionBlock",
      params: [typeof e == "string" ? e : ze(e), Array.isArray(t) ? t : [t], n],
      signal: i,
    });
  }
  async signAndExecuteTransaction({ transaction: e, signer: t, ...n }) {
    let i;
    e instanceof Uint8Array
      ? (i = e)
      : (e.setSenderIfNotSet(t.toSuiAddress()),
        (i = await e.build({ client: this })));
    const { signature: o, bytes: l } = await t.signTransaction(i);
    return this.executeTransactionBlock({
      transactionBlock: l,
      signature: o,
      ...n,
    });
  }
  async getTotalTransactionBlocks({ signal: e } = {}) {
    const t = await this.transport.request({
      method: "sui_getTotalTransactionBlocks",
      params: [],
      signal: e,
    });
    return BigInt(t);
  }
  async getReferenceGasPrice({ signal: e } = {}) {
    const t = await this.transport.request({
      method: "suix_getReferenceGasPrice",
      params: [],
      signal: e,
    });
    return BigInt(t);
  }
  async getStakes(e) {
    if (!e.owner || !ln(Ee(e.owner))) throw new Error("Invalid Sui address");
    return await this.transport.request({
      method: "suix_getStakes",
      params: [e.owner],
      signal: e.signal,
    });
  }
  async getStakesByIds(e) {
    return (
      e.stakedSuiIds.forEach((t) => {
        if (!t || !wl(ps(t))) throw new Error(`Invalid Sui Stake id ${t}`);
      }),
      await this.transport.request({
        method: "suix_getStakesByIds",
        params: [e.stakedSuiIds],
        signal: e.signal,
      })
    );
  }
  async getLatestSuiSystemState({ signal: e } = {}) {
    return await this.transport.request({
      method: "suix_getLatestSuiSystemState",
      params: [],
      signal: e,
    });
  }
  async queryEvents({ query: e, cursor: t, limit: n, order: i, signal: o }) {
    return (
      e &&
        "MoveEventType" in e &&
        St(e.MoveEventType) &&
        (e = {
          ...e,
          MoveEventType: (
            await this.core.mvr.resolveType({ type: e.MoveEventType })
          ).type,
        }),
      e &&
        "MoveEventModule" in e &&
        Bt(e.MoveEventModule.package) &&
        (e = {
          ...e,
          MoveEventModule: {
            module: e.MoveEventModule.module,
            package: (
              await this.core.mvr.resolvePackage({
                package: e.MoveEventModule.package,
              })
            ).package,
          },
        }),
      "MoveModule" in e &&
        Bt(e.MoveModule.package) &&
        (e = {
          ...e,
          MoveModule: {
            module: e.MoveModule.module,
            package: (
              await this.core.mvr.resolvePackage({
                package: e.MoveModule.package,
              })
            ).package,
          },
        }),
      await this.transport.request({
        method: "suix_queryEvents",
        params: [e, t, n, (i || "descending") === "descending"],
        signal: o,
      })
    );
  }
  async devInspectTransactionBlock(e) {
    let t;
    if (q0(e.transactionBlock))
      (e.transactionBlock.setSenderIfNotSet(e.sender),
        (t = ze(
          await e.transactionBlock.build({
            client: this,
            onlyTransactionKind: !0,
          }),
        )));
    else if (typeof e.transactionBlock == "string") t = e.transactionBlock;
    else if (e.transactionBlock instanceof Uint8Array)
      t = ze(e.transactionBlock);
    else throw new Error("Unknown transaction block format.");
    return (
      e.signal?.throwIfAborted(),
      await this.transport.request({
        method: "sui_devInspectTransactionBlock",
        params: [e.sender, t, e.gasPrice?.toString(), e.epoch],
        signal: e.signal,
      })
    );
  }
  async dryRunTransactionBlock(e) {
    return await this.transport.request({
      method: "sui_dryRunTransactionBlock",
      params: [
        typeof e.transactionBlock == "string"
          ? e.transactionBlock
          : ze(e.transactionBlock),
      ],
    });
  }
  async getDynamicFields(e) {
    if (!e.parentId || !wl(ps(e.parentId)))
      throw new Error("Invalid Sui Object id");
    return await this.transport.request({
      method: "suix_getDynamicFields",
      params: [e.parentId, e.cursor, e.limit],
      signal: e.signal,
    });
  }
  async getDynamicFieldObject(e) {
    return await this.transport.request({
      method: "suix_getDynamicFieldObject",
      params: [e.parentId, e.name],
      signal: e.signal,
    });
  }
  async getLatestCheckpointSequenceNumber({ signal: e } = {}) {
    const t = await this.transport.request({
      method: "sui_getLatestCheckpointSequenceNumber",
      params: [],
      signal: e,
    });
    return String(t);
  }
  async getCheckpoint(e) {
    return await this.transport.request({
      method: "sui_getCheckpoint",
      params: [e.id],
      signal: e.signal,
    });
  }
  async getCheckpoints(e) {
    return await this.transport.request({
      method: "sui_getCheckpoints",
      params: [e.cursor, e?.limit, e.descendingOrder],
      signal: e.signal,
    });
  }
  async getCommitteeInfo(e) {
    return await this.transport.request({
      method: "suix_getCommitteeInfo",
      params: [e?.epoch],
      signal: e?.signal,
    });
  }
  async getNetworkMetrics({ signal: e } = {}) {
    return await this.transport.request({
      method: "suix_getNetworkMetrics",
      params: [],
      signal: e,
    });
  }
  async getAddressMetrics({ signal: e } = {}) {
    return await this.transport.request({
      method: "suix_getLatestAddressMetrics",
      params: [],
      signal: e,
    });
  }
  async getEpochMetrics(e) {
    return await this.transport.request({
      method: "suix_getEpochMetrics",
      params: [e?.cursor, e?.limit, e?.descendingOrder],
      signal: e?.signal,
    });
  }
  async getAllEpochAddressMetrics(e) {
    return await this.transport.request({
      method: "suix_getAllEpochAddressMetrics",
      params: [e?.descendingOrder],
      signal: e?.signal,
    });
  }
  async getEpochs(e) {
    return await this.transport.request({
      method: "suix_getEpochs",
      params: [e?.cursor, e?.limit, e?.descendingOrder],
      signal: e?.signal,
    });
  }
  async getMoveCallMetrics({ signal: e } = {}) {
    return await this.transport.request({
      method: "suix_getMoveCallMetrics",
      params: [],
      signal: e,
    });
  }
  async getCurrentEpoch({ signal: e } = {}) {
    return await this.transport.request({
      method: "suix_getCurrentEpoch",
      params: [],
      signal: e,
    });
  }
  async getValidatorsApy({ signal: e } = {}) {
    return await this.transport.request({
      method: "suix_getValidatorsApy",
      params: [],
      signal: e,
    });
  }
  async getChainIdentifier({ signal: e } = {}) {
    return $r(
      Ei((await this.getCheckpoint({ id: "0", signal: e })).digest).slice(0, 4),
    );
  }
  async resolveNameServiceAddress(e) {
    return await this.transport.request({
      method: "suix_resolveNameServiceAddress",
      params: [e.name],
      signal: e.signal,
    });
  }
  async resolveNameServiceNames({ format: e = "dot", ...t }) {
    const {
      nextCursor: n,
      hasNextPage: i,
      data: o,
    } = await this.transport.request({
      method: "suix_resolveNameServiceNames",
      params: [t.address, t.cursor, t.limit],
      signal: t.signal,
    });
    return { hasNextPage: i, nextCursor: n, data: o.map((l) => Nk(l, e)) };
  }
  async getProtocolConfig(e) {
    return await this.transport.request({
      method: "sui_getProtocolConfig",
      params: [e?.version],
      signal: e?.signal,
    });
  }
  async verifyZkLoginSignature(e) {
    return await this.transport.request({
      method: "sui_verifyZkLoginSignature",
      params: [e.bytes, e.signature, e.intentScope, e.author],
      signal: e.signal,
    });
  }
  async waitForTransaction({
    signal: e,
    timeout: t = 60 * 1e3,
    pollInterval: n = 2 * 1e3,
    ...i
  }) {
    const o = AbortSignal.timeout(t),
      l = new Promise((u, d) => {
        o.addEventListener("abort", () => d(o.reason));
      });
    for (l.catch(() => {}); !o.aborted; ) {
      e?.throwIfAborted();
      try {
        return await this.getTransactionBlock(i);
      } catch {
        await Promise.race([new Promise((u) => setTimeout(u, n)), l]);
      }
    }
    throw (
      o.throwIfAborted(),
      new Error("Unexpected error while waiting for transaction block.")
    );
  }
};
function Ll(e) {
  switch (e) {
    case "mainnet":
      return "https://fullnode.mainnet.sui.io:443";
    case "testnet":
      return "https://fullnode.testnet.sui.io:443";
    case "devnet":
      return "https://fullnode.devnet.sui.io:443";
    case "localnet":
      return "http://127.0.0.1:9000";
    default:
      throw new Error(`Unknown network: ${e}`);
  }
}
const Bh = {
    ED25519: 0,
    Secp256k1: 1,
    Secp256r1: 2,
    MultiSig: 3,
    ZkLogin: 5,
    Passkey: 6,
  },
  PR = { ED25519: 32, Secp256k1: 33, Secp256r1: 33, Passkey: 33 },
  jS = {
    0: "ED25519",
    1: "Secp256k1",
    2: "Secp256r1",
    3: "MultiSig",
    5: "ZkLogin",
    6: "Passkey",
  };
function RS(e, t) {
  return pe
    .IntentMessage(pe.bytes(t.length))
    .serialize({
      intent: { scope: { [e]: !0 }, version: { V0: !0 }, appId: { Sui: !0 } },
      value: t,
    })
    .toBytes();
}
function _S(e, t) {
  if (e === t) return !0;
  if (e.length !== t.length) return !1;
  for (let n = 0; n < e.length; n++) if (e[n] !== t[n]) return !1;
  return !0;
}
var DR = class {
  equals(e) {
    return _S(this.toRawBytes(), e.toRawBytes());
  }
  toBase64() {
    return ze(this.toRawBytes());
  }
  toString() {
    throw new Error(
      "`toString` is not implemented on public keys. Use `toBase64()` or `toRawBytes()` instead.",
    );
  }
  toSuiPublicKey() {
    return ze(this.toSuiBytes());
  }
  verifyWithIntent(e, t, n) {
    const i = Do(RS(n, e), { dkLen: 32 });
    return this.verify(i, t);
  }
  verifyPersonalMessage(e, t) {
    return this.verifyWithIntent(
      pe.byteVector().serialize(e).toBytes(),
      t,
      "PersonalMessage",
    );
  }
  verifyTransaction(e, t) {
    return this.verifyWithIntent(e, t, "TransactionData");
  }
  verifyAddress(e) {
    return this.toSuiAddress() === e;
  }
  toSuiBytes() {
    const e = this.toRawBytes(),
      t = new Uint8Array(e.length + 1);
    return (t.set([this.flag()]), t.set(e, 1), t);
  }
  toSuiAddress() {
    return Ee(pu(Do(this.toSuiBytes(), { dkLen: 32 })).slice(0, qo * 2));
  }
};
function LR(e) {
  const t = rt(e),
    n = jS[t[0]];
  switch (n) {
    case "ED25519":
    case "Secp256k1":
    case "Secp256r1":
      const i = PR[n],
        o = t.slice(1, t.length - i);
      return {
        serializedSignature: e,
        signatureScheme: n,
        signature: o,
        publicKey: t.slice(1 + o.length),
        bytes: t,
      };
    default:
      throw new Error("Unsupported signature scheme");
  }
}
const NS = aT(
    [
      "0x428a2f98d728ae22",
      "0x7137449123ef65cd",
      "0xb5c0fbcfec4d3b2f",
      "0xe9b5dba58189dbbc",
      "0x3956c25bf348b538",
      "0x59f111f1b605d019",
      "0x923f82a4af194f9b",
      "0xab1c5ed5da6d8118",
      "0xd807aa98a3030242",
      "0x12835b0145706fbe",
      "0x243185be4ee4b28c",
      "0x550c7dc3d5ffb4e2",
      "0x72be5d74f27b896f",
      "0x80deb1fe3b1696b1",
      "0x9bdc06a725c71235",
      "0xc19bf174cf692694",
      "0xe49b69c19ef14ad2",
      "0xefbe4786384f25e3",
      "0x0fc19dc68b8cd5b5",
      "0x240ca1cc77ac9c65",
      "0x2de92c6f592b0275",
      "0x4a7484aa6ea6e483",
      "0x5cb0a9dcbd41fbd4",
      "0x76f988da831153b5",
      "0x983e5152ee66dfab",
      "0xa831c66d2db43210",
      "0xb00327c898fb213f",
      "0xbf597fc7beef0ee4",
      "0xc6e00bf33da88fc2",
      "0xd5a79147930aa725",
      "0x06ca6351e003826f",
      "0x142929670a0e6e70",
      "0x27b70a8546d22ffc",
      "0x2e1b21385c26c926",
      "0x4d2c6dfc5ac42aed",
      "0x53380d139d95b3df",
      "0x650a73548baf63de",
      "0x766a0abb3c77b2a8",
      "0x81c2c92e47edaee6",
      "0x92722c851482353b",
      "0xa2bfe8a14cf10364",
      "0xa81a664bbc423001",
      "0xc24b8b70d0f89791",
      "0xc76c51a30654be30",
      "0xd192e819d6ef5218",
      "0xd69906245565a910",
      "0xf40e35855771202a",
      "0x106aa07032bbd1b8",
      "0x19a4c116b8d2d0c8",
      "0x1e376c085141ab53",
      "0x2748774cdf8eeb99",
      "0x34b0bcb5e19b48a8",
      "0x391c0cb3c5c95a63",
      "0x4ed8aa4ae3418acb",
      "0x5b9cca4f7763e373",
      "0x682e6ff3d6b2b8a3",
      "0x748f82ee5defb2fc",
      "0x78a5636f43172f60",
      "0x84c87814a1f0ab72",
      "0x8cc702081a6439ec",
      "0x90befffa23631e28",
      "0xa4506cebde82bde9",
      "0xbef9a3f7b2c67915",
      "0xc67178f2e372532b",
      "0xca273eceea26619c",
      "0xd186b8c721c0c207",
      "0xeada7dd6cde0eb1e",
      "0xf57d4f7fee6ed178",
      "0x06f067aa72176fba",
      "0x0a637dc5a2c898a6",
      "0x113f9804bef90dae",
      "0x1b710b35131c471b",
      "0x28db77f523047d84",
      "0x32caab7b40c72493",
      "0x3c9ebe0a15c9bebc",
      "0x431d67c49c100d4c",
      "0x4cc5d4becb3e42b6",
      "0x597f299cfc657e2a",
      "0x5fcb6fab3ad6faec",
      "0x6c44198c4a475817",
    ].map((e) => BigInt(e)),
  ),
  BR = NS[0],
  $R = NS[1],
  Mr = new Uint32Array(80),
  Ar = new Uint32Array(80);
class zR extends oT {
  constructor(t) {
    super(128, t, 16, !1);
  }
  get() {
    const {
      Ah: t,
      Al: n,
      Bh: i,
      Bl: o,
      Ch: l,
      Cl: u,
      Dh: d,
      Dl: f,
      Eh: m,
      El: g,
      Fh: y,
      Fl: v,
      Gh: C,
      Gl: E,
      Hh: S,
      Hl: k,
    } = this;
    return [t, n, i, o, l, u, d, f, m, g, y, v, C, E, S, k];
  }
  set(t, n, i, o, l, u, d, f, m, g, y, v, C, E, S, k) {
    ((this.Ah = t | 0),
      (this.Al = n | 0),
      (this.Bh = i | 0),
      (this.Bl = o | 0),
      (this.Ch = l | 0),
      (this.Cl = u | 0),
      (this.Dh = d | 0),
      (this.Dl = f | 0),
      (this.Eh = m | 0),
      (this.El = g | 0),
      (this.Fh = y | 0),
      (this.Fl = v | 0),
      (this.Gh = C | 0),
      (this.Gl = E | 0),
      (this.Hh = S | 0),
      (this.Hl = k | 0));
  }
  process(t, n) {
    for (let A = 0; A < 16; A++, n += 4)
      ((Mr[A] = t.getUint32(n)), (Ar[A] = t.getUint32((n += 4))));
    for (let A = 16; A < 80; A++) {
      const R = Mr[A - 15] | 0,
        P = Ar[A - 15] | 0,
        V = Nr(R, P, 1) ^ Nr(R, P, 8) ^ ky(R, P, 7),
        U = Pr(R, P, 1) ^ Pr(R, P, 8) ^ Oy(R, P, 7),
        z = Mr[A - 2] | 0,
        B = Ar[A - 2] | 0,
        H = Nr(z, B, 19) ^ Co(z, B, 61) ^ ky(z, B, 6),
        ee = Pr(z, B, 19) ^ ko(z, B, 61) ^ Oy(z, B, 6),
        Q = cT(U, ee, Ar[A - 7], Ar[A - 16]),
        J = dT(Q, V, H, Mr[A - 7], Mr[A - 16]);
      ((Mr[A] = J | 0), (Ar[A] = Q | 0));
    }
    let {
      Ah: i,
      Al: o,
      Bh: l,
      Bl: u,
      Ch: d,
      Cl: f,
      Dh: m,
      Dl: g,
      Eh: y,
      El: v,
      Fh: C,
      Fl: E,
      Gh: S,
      Gl: k,
      Hh: x,
      Hl: M,
    } = this;
    for (let A = 0; A < 80; A++) {
      const R = Nr(y, v, 14) ^ Nr(y, v, 18) ^ Co(y, v, 41),
        P = Pr(y, v, 14) ^ Pr(y, v, 18) ^ ko(y, v, 41),
        V = (y & C) ^ (~y & S),
        U = (v & E) ^ (~v & k),
        z = fT(M, P, U, $R[A], Ar[A]),
        B = hT(z, x, R, V, BR[A], Mr[A]),
        H = z | 0,
        ee = Nr(i, o, 28) ^ Co(i, o, 34) ^ Co(i, o, 39),
        Q = Pr(i, o, 28) ^ ko(i, o, 34) ^ ko(i, o, 39),
        J = (i & l) ^ (i & d) ^ (l & d),
        ae = (o & u) ^ (o & f) ^ (u & f);
      ((x = S | 0),
        (M = k | 0),
        (S = C | 0),
        (k = E | 0),
        (C = y | 0),
        (E = v | 0),
        ({ h: y, l: v } = vn(m | 0, g | 0, B | 0, H | 0)),
        (m = d | 0),
        (g = f | 0),
        (d = l | 0),
        (f = u | 0),
        (l = i | 0),
        (u = o | 0));
      const ye = lh(H, Q, ae);
      ((i = uh(ye, B, ee, J)), (o = ye | 0));
    }
    (({ h: i, l: o } = vn(this.Ah | 0, this.Al | 0, i | 0, o | 0)),
      ({ h: l, l: u } = vn(this.Bh | 0, this.Bl | 0, l | 0, u | 0)),
      ({ h: d, l: f } = vn(this.Ch | 0, this.Cl | 0, d | 0, f | 0)),
      ({ h: m, l: g } = vn(this.Dh | 0, this.Dl | 0, m | 0, g | 0)),
      ({ h: y, l: v } = vn(this.Eh | 0, this.El | 0, y | 0, v | 0)),
      ({ h: C, l: E } = vn(this.Fh | 0, this.Fl | 0, C | 0, E | 0)),
      ({ h: S, l: k } = vn(this.Gh | 0, this.Gl | 0, S | 0, k | 0)),
      ({ h: x, l: M } = vn(this.Hh | 0, this.Hl | 0, x | 0, M | 0)),
      this.set(i, o, l, u, d, f, m, g, y, v, C, E, S, k, x, M));
  }
  roundClean() {
    Fr(Mr, Ar);
  }
  destroy() {
    (Fr(this.buffer), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
  }
}
class FR extends zR {
  Ah = bt[0] | 0;
  Al = bt[1] | 0;
  Bh = bt[2] | 0;
  Bl = bt[3] | 0;
  Ch = bt[4] | 0;
  Cl = bt[5] | 0;
  Dh = bt[6] | 0;
  Dl = bt[7] | 0;
  Eh = bt[8] | 0;
  El = bt[9] | 0;
  Fh = bt[10] | 0;
  Fl = bt[11] | 0;
  Gh = bt[12] | 0;
  Gl = bt[13] | 0;
  Hh = bt[14] | 0;
  Hl = bt[15] | 0;
  constructor() {
    super(64);
  }
}
const Mu = I0(() => new FR(), sT(3));
const PS = BigInt(0),
  bv = BigInt(1);
function Df(e, t = "") {
  if (typeof e != "boolean") {
    const n = t && `"${t}" `;
    throw new Error(n + "expected boolean, got type=" + typeof e);
  }
  return e;
}
function UR(e) {
  if (typeof e == "bigint") {
    if (!Bl(e)) throw new Error("positive bigint expected, got " + e);
  } else bn(e);
  return e;
}
function DS(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  return e === "" ? PS : BigInt("0x" + e);
}
function VR(e) {
  return DS(pu(e));
}
function ou(e) {
  return DS(pu(Lf(Ne(e)).reverse()));
}
function LS(e, t) {
  (bn(t), (e = UR(e)));
  const n = T0(e.toString(16).padStart(t * 2, "0"));
  if (n.length !== t) throw new Error("number too large");
  return n;
}
function WR(e, t) {
  return LS(e, t).reverse();
}
function Lf(e) {
  return Uint8Array.from(e);
}
const Bl = (e) => typeof e == "bigint" && PS <= e;
function HR(e, t, n) {
  return Bl(e) && Bl(t) && Bl(n) && t <= e && e < n;
}
function Sv(e, t, n, i) {
  if (!HR(t, n, i))
    throw new Error(
      "expected valid " + e + ": " + n + " <= n < " + i + ", got " + t,
    );
}
const KR = (e) => (bv << BigInt(e)) - bv;
function $h(e, t = {}, n = {}) {
  if (!e || typeof e != "object")
    throw new Error("expected valid options object");
  function i(l, u, d) {
    const f = e[l];
    if (d && f === void 0) return;
    const m = typeof f;
    if (m !== u || f === null)
      throw new Error(`param "${l}" is invalid: expected ${u}, got ${m}`);
  }
  const o = (l, u) => Object.entries(l).forEach(([d, f]) => i(d, f, u));
  (o(t, !1), o(n, !0));
}
function Ev(e) {
  const t = new WeakMap();
  return (n, ...i) => {
    const o = t.get(n);
    if (o !== void 0) return o;
    const l = e(n, ...i);
    return (t.set(n, l), l);
  };
}
const Ut = BigInt(0),
  Mt = BigInt(1),
  gs = BigInt(2),
  BS = BigInt(3),
  $S = BigInt(4),
  zS = BigInt(5),
  GR = BigInt(7),
  FS = BigInt(8),
  qR = BigInt(9),
  US = BigInt(16);
function et(e, t) {
  const n = e % t;
  return n >= Ut ? n : t + n;
}
function Rn(e, t, n) {
  let i = e;
  for (; t-- > Ut; ) ((i *= i), (i %= n));
  return i;
}
function xv(e, t) {
  if (e === Ut) throw new Error("invert: expected non-zero number");
  if (t <= Ut) throw new Error("invert: expected positive modulus, got " + t);
  let n = et(e, t),
    i = t,
    o = Ut,
    l = Mt;
  for (; n !== Ut; ) {
    const d = i / n,
      f = i % n,
      m = o - l * d;
    ((i = n), (n = f), (o = l), (l = m));
  }
  if (i !== Mt) throw new Error("invert: does not exist");
  return et(o, t);
}
function zh(e, t, n) {
  if (!e.eql(e.sqr(t), n)) throw new Error("Cannot find square root");
}
function VS(e, t) {
  const n = (e.ORDER + Mt) / $S,
    i = e.pow(t, n);
  return (zh(e, i, t), i);
}
function QR(e, t) {
  const n = (e.ORDER - zS) / FS,
    i = e.mul(t, gs),
    o = e.pow(i, n),
    l = e.mul(t, o),
    u = e.mul(e.mul(l, gs), o),
    d = e.mul(l, e.sub(u, e.ONE));
  return (zh(e, d, t), d);
}
function YR(e) {
  const t = Fh(e),
    n = WS(e),
    i = n(t, t.neg(t.ONE)),
    o = n(t, i),
    l = n(t, t.neg(i)),
    u = (e + GR) / US;
  return (d, f) => {
    let m = d.pow(f, u),
      g = d.mul(m, i);
    const y = d.mul(m, o),
      v = d.mul(m, l),
      C = d.eql(d.sqr(g), f),
      E = d.eql(d.sqr(y), f);
    ((m = d.cmov(m, g, C)), (g = d.cmov(v, y, E)));
    const S = d.eql(d.sqr(g), f),
      k = d.cmov(m, g, S);
    return (zh(d, k, f), k);
  };
}
function WS(e) {
  if (e < BS) throw new Error("sqrt is not defined for small field");
  let t = e - Mt,
    n = 0;
  for (; t % gs === Ut; ) ((t /= gs), n++);
  let i = gs;
  const o = Fh(e);
  for (; Cv(o, i) === 1; )
    if (i++ > 1e3)
      throw new Error("Cannot find square root: probably non-prime P");
  if (n === 1) return VS;
  let l = o.pow(i, t);
  const u = (t + Mt) / gs;
  return function (f, m) {
    if (f.is0(m)) return m;
    if (Cv(f, m) !== 1) throw new Error("Cannot find square root");
    let g = n,
      y = f.mul(f.ONE, l),
      v = f.pow(m, t),
      C = f.pow(m, u);
    for (; !f.eql(v, f.ONE); ) {
      if (f.is0(v)) return f.ZERO;
      let E = 1,
        S = f.sqr(v);
      for (; !f.eql(S, f.ONE); )
        if ((E++, (S = f.sqr(S)), E === g))
          throw new Error("Cannot find square root");
      const k = Mt << BigInt(g - E - 1),
        x = f.pow(y, k);
      ((g = E), (y = f.sqr(x)), (v = f.mul(v, y)), (C = f.mul(C, x)));
    }
    return C;
  };
}
function XR(e) {
  return e % $S === BS
    ? VS
    : e % FS === zS
      ? QR
      : e % US === qR
        ? YR(e)
        : WS(e);
}
const ZR = (e, t) => (et(e, t) & Mt) === Mt,
  JR = [
    "create",
    "isValid",
    "is0",
    "neg",
    "inv",
    "sqrt",
    "sqr",
    "eql",
    "add",
    "sub",
    "mul",
    "pow",
    "div",
    "addN",
    "subN",
    "mulN",
    "sqrN",
  ];
function e_(e) {
  const t = { ORDER: "bigint", BYTES: "number", BITS: "number" },
    n = JR.reduce((i, o) => ((i[o] = "function"), i), t);
  return ($h(e, n), e);
}
function t_(e, t, n) {
  if (n < Ut) throw new Error("invalid exponent, negatives unsupported");
  if (n === Ut) return e.ONE;
  if (n === Mt) return t;
  let i = e.ONE,
    o = t;
  for (; n > Ut; ) (n & Mt && (i = e.mul(i, o)), (o = e.sqr(o)), (n >>= Mt));
  return i;
}
function HS(e, t, n = !1) {
  const i = new Array(t.length).fill(n ? e.ZERO : void 0),
    o = t.reduce(
      (u, d, f) => (e.is0(d) ? u : ((i[f] = u), e.mul(u, d))),
      e.ONE,
    ),
    l = e.inv(o);
  return (
    t.reduceRight(
      (u, d, f) => (e.is0(d) ? u : ((i[f] = e.mul(u, i[f])), e.mul(u, d))),
      l,
    ),
    i
  );
}
function Cv(e, t) {
  const n = (e.ORDER - Mt) / gs,
    i = e.pow(t, n),
    o = e.eql(i, e.ONE),
    l = e.eql(i, e.ZERO),
    u = e.eql(i, e.neg(e.ONE));
  if (!o && !l && !u) throw new Error("invalid Legendre symbol result");
  return o ? 1 : l ? 0 : -1;
}
function n_(e, t) {
  t !== void 0 && bn(t);
  const n = t !== void 0 ? t : e.toString(2).length,
    i = Math.ceil(n / 8);
  return { nBitLength: n, nByteLength: i };
}
class r_ {
  ORDER;
  BITS;
  BYTES;
  isLE;
  ZERO = Ut;
  ONE = Mt;
  _lengths;
  _sqrt;
  _mod;
  constructor(t, n = {}) {
    if (t <= Ut) throw new Error("invalid field: expected ORDER > 0, got " + t);
    let i;
    ((this.isLE = !1),
      n != null &&
        typeof n == "object" &&
        (typeof n.BITS == "number" && (i = n.BITS),
        typeof n.sqrt == "function" && (this.sqrt = n.sqrt),
        typeof n.isLE == "boolean" && (this.isLE = n.isLE),
        n.allowedLengths && (this._lengths = n.allowedLengths?.slice()),
        typeof n.modFromBytes == "boolean" && (this._mod = n.modFromBytes)));
    const { nBitLength: o, nByteLength: l } = n_(t, i);
    if (l > 2048)
      throw new Error("invalid field: expected ORDER of <= 2048 bytes");
    ((this.ORDER = t),
      (this.BITS = o),
      (this.BYTES = l),
      (this._sqrt = void 0),
      Object.preventExtensions(this));
  }
  create(t) {
    return et(t, this.ORDER);
  }
  isValid(t) {
    if (typeof t != "bigint")
      throw new Error(
        "invalid field element: expected bigint, got " + typeof t,
      );
    return Ut <= t && t < this.ORDER;
  }
  is0(t) {
    return t === Ut;
  }
  isValidNot0(t) {
    return !this.is0(t) && this.isValid(t);
  }
  isOdd(t) {
    return (t & Mt) === Mt;
  }
  neg(t) {
    return et(-t, this.ORDER);
  }
  eql(t, n) {
    return t === n;
  }
  sqr(t) {
    return et(t * t, this.ORDER);
  }
  add(t, n) {
    return et(t + n, this.ORDER);
  }
  sub(t, n) {
    return et(t - n, this.ORDER);
  }
  mul(t, n) {
    return et(t * n, this.ORDER);
  }
  pow(t, n) {
    return t_(this, t, n);
  }
  div(t, n) {
    return et(t * xv(n, this.ORDER), this.ORDER);
  }
  sqrN(t) {
    return t * t;
  }
  addN(t, n) {
    return t + n;
  }
  subN(t, n) {
    return t - n;
  }
  mulN(t, n) {
    return t * n;
  }
  inv(t) {
    return xv(t, this.ORDER);
  }
  sqrt(t) {
    return (this._sqrt || (this._sqrt = XR(this.ORDER)), this._sqrt(this, t));
  }
  toBytes(t) {
    return this.isLE ? WR(t, this.BYTES) : LS(t, this.BYTES);
  }
  fromBytes(t, n = !1) {
    Ne(t);
    const { _lengths: i, BYTES: o, isLE: l, ORDER: u, _mod: d } = this;
    if (i) {
      if (!i.includes(t.length) || t.length > o)
        throw new Error(
          "Field.fromBytes: expected " + i + " bytes, got " + t.length,
        );
      const m = new Uint8Array(o);
      (m.set(t, l ? 0 : m.length - t.length), (t = m));
    }
    if (t.length !== o)
      throw new Error(
        "Field.fromBytes: expected " + o + " bytes, got " + t.length,
      );
    let f = l ? ou(t) : VR(t);
    if ((d && (f = et(f, u)), !n && !this.isValid(f)))
      throw new Error("invalid field element: outside of range 0..ORDER");
    return f;
  }
  invertBatch(t) {
    return HS(this, t);
  }
  cmov(t, n, i) {
    return i ? n : t;
  }
}
function Fh(e, t = {}) {
  return new r_(e, t);
}
const au = BigInt(0),
  Bf = BigInt(1);
function kv(e, t) {
  const n = t.negate();
  return e ? n : t;
}
function ef(e, t) {
  const n = HS(
    e.Fp,
    t.map((i) => i.Z),
  );
  return t.map((i, o) => e.fromAffine(i.toAffine(n[o])));
}
function KS(e, t) {
  if (!Number.isSafeInteger(e) || e <= 0 || e > t)
    throw new Error("invalid window size, expected [1.." + t + "], got W=" + e);
}
function tf(e, t) {
  KS(e, t);
  const n = Math.ceil(t / e) + 1,
    i = 2 ** (e - 1),
    o = 2 ** e,
    l = KR(e),
    u = BigInt(e);
  return { windows: n, windowSize: i, mask: l, maxNumber: o, shiftBy: u };
}
function Ov(e, t, n) {
  const { windowSize: i, mask: o, maxNumber: l, shiftBy: u } = n;
  let d = Number(e & o),
    f = e >> u;
  d > i && ((d -= l), (f += Bf));
  const m = t * i,
    g = m + Math.abs(d) - 1,
    y = d === 0,
    v = d < 0,
    C = t % 2 !== 0;
  return { nextN: f, offset: g, isZero: y, isNeg: v, isNegF: C, offsetF: m };
}
const nf = new WeakMap(),
  GS = new WeakMap();
function rf(e) {
  return GS.get(e) || 1;
}
function Tv(e) {
  if (e !== au) throw new Error("invalid wNAF");
}
class s_ {
  BASE;
  ZERO;
  Fn;
  bits;
  constructor(t, n) {
    ((this.BASE = t.BASE),
      (this.ZERO = t.ZERO),
      (this.Fn = t.Fn),
      (this.bits = n));
  }
  _unsafeLadder(t, n, i = this.ZERO) {
    let o = t;
    for (; n > au; ) (n & Bf && (i = i.add(o)), (o = o.double()), (n >>= Bf));
    return i;
  }
  precomputeWindow(t, n) {
    const { windows: i, windowSize: o } = tf(n, this.bits),
      l = [];
    let u = t,
      d = u;
    for (let f = 0; f < i; f++) {
      ((d = u), l.push(d));
      for (let m = 1; m < o; m++) ((d = d.add(u)), l.push(d));
      u = d.double();
    }
    return l;
  }
  wNAF(t, n, i) {
    if (!this.Fn.isValid(i)) throw new Error("invalid scalar");
    let o = this.ZERO,
      l = this.BASE;
    const u = tf(t, this.bits);
    for (let d = 0; d < u.windows; d++) {
      const {
        nextN: f,
        offset: m,
        isZero: g,
        isNeg: y,
        isNegF: v,
        offsetF: C,
      } = Ov(i, d, u);
      ((i = f), g ? (l = l.add(kv(v, n[C]))) : (o = o.add(kv(y, n[m]))));
    }
    return (Tv(i), { p: o, f: l });
  }
  wNAFUnsafe(t, n, i, o = this.ZERO) {
    const l = tf(t, this.bits);
    for (let u = 0; u < l.windows && i !== au; u++) {
      const { nextN: d, offset: f, isZero: m, isNeg: g } = Ov(i, u, l);
      if (((i = d), !m)) {
        const y = n[f];
        o = o.add(g ? y.negate() : y);
      }
    }
    return (Tv(i), o);
  }
  getPrecomputes(t, n, i) {
    let o = nf.get(n);
    return (
      o ||
        ((o = this.precomputeWindow(n, t)),
        t !== 1 && (typeof i == "function" && (o = i(o)), nf.set(n, o))),
      o
    );
  }
  cached(t, n, i) {
    const o = rf(t);
    return this.wNAF(o, this.getPrecomputes(o, t, i), n);
  }
  unsafe(t, n, i, o) {
    const l = rf(t);
    return l === 1
      ? this._unsafeLadder(t, n, o)
      : this.wNAFUnsafe(l, this.getPrecomputes(l, t, i), n, o);
  }
  createCache(t, n) {
    (KS(n, this.bits), GS.set(t, n), nf.delete(t));
  }
  hasCache(t) {
    return rf(t) !== 1;
  }
}
function Iv(e, t, n) {
  if (t) {
    if (t.ORDER !== e)
      throw new Error("Field.ORDER must match order: Fp == p, Fn == n");
    return (e_(t), t);
  } else return Fh(e, { isLE: n });
}
function i_(e, t, n = {}, i) {
  if ((i === void 0 && (i = e === "edwards"), !t || typeof t != "object"))
    throw new Error(`expected valid ${e} CURVE object`);
  for (const f of ["p", "n", "h"]) {
    const m = t[f];
    if (!(typeof m == "bigint" && m > au))
      throw new Error(`CURVE.${f} must be positive bigint`);
  }
  const o = Iv(t.p, n.Fp, i),
    l = Iv(t.n, n.Fn, i),
    d = ["Gx", "Gy", "a", "d"];
  for (const f of d)
    if (!o.isValid(t[f]))
      throw new Error(`CURVE.${f} must be valid field element of CURVE.Fp`);
  return (
    (t = Object.freeze(Object.assign({}, t))),
    { CURVE: t, Fp: o, Fn: l }
  );
}
function o_(e, t) {
  return function (i) {
    const o = e(i);
    return { secretKey: o, publicKey: t(o) };
  };
}
const jr = BigInt(0),
  lt = BigInt(1),
  sf = BigInt(2),
  a_ = BigInt(8);
function l_(e, t, n, i) {
  const o = e.sqr(n),
    l = e.sqr(i),
    u = e.add(e.mul(t.a, o), l),
    d = e.add(e.ONE, e.mul(t.d, e.mul(o, l)));
  return e.eql(u, d);
}
function u_(e, t = {}) {
  const n = i_("edwards", e, t, t.FpFnLE),
    { Fp: i, Fn: o } = n;
  let l = n.CURVE;
  const { h: u } = l;
  $h(t, {}, { uvRatio: "function" });
  const d = sf << (BigInt(o.BYTES * 8) - lt),
    f = (k) => i.create(k),
    m =
      t.uvRatio ||
      ((k, x) => {
        try {
          return { isValid: !0, value: i.sqrt(i.div(k, x)) };
        } catch {
          return { isValid: !1, value: jr };
        }
      });
  if (!l_(i, l, l.Gx, l.Gy))
    throw new Error("bad curve params: generator point");
  function g(k, x, M = !1) {
    const A = M ? lt : jr;
    return (Sv("coordinate " + k, x, A, d), x);
  }
  function y(k) {
    if (!(k instanceof E)) throw new Error("EdwardsPoint expected");
  }
  const v = Ev((k, x) => {
      const { X: M, Y: A, Z: R } = k,
        P = k.is0();
      x == null && (x = P ? a_ : i.inv(R));
      const V = f(M * x),
        U = f(A * x),
        z = i.mul(R, x);
      if (P) return { x: jr, y: lt };
      if (z !== lt) throw new Error("invZ was invalid");
      return { x: V, y: U };
    }),
    C = Ev((k) => {
      const { a: x, d: M } = l;
      if (k.is0()) throw new Error("bad point: ZERO");
      const { X: A, Y: R, Z: P, T: V } = k,
        U = f(A * A),
        z = f(R * R),
        B = f(P * P),
        H = f(B * B),
        ee = f(U * x),
        Q = f(B * f(ee + z)),
        J = f(H + f(M * f(U * z)));
      if (Q !== J) throw new Error("bad point: equation left != right (1)");
      const ae = f(A * R),
        ye = f(P * V);
      if (ae !== ye) throw new Error("bad point: equation left != right (2)");
      return !0;
    });
  class E {
    static BASE = new E(l.Gx, l.Gy, lt, f(l.Gx * l.Gy));
    static ZERO = new E(jr, lt, lt, jr);
    static Fp = i;
    static Fn = o;
    X;
    Y;
    Z;
    T;
    constructor(x, M, A, R) {
      ((this.X = g("x", x)),
        (this.Y = g("y", M)),
        (this.Z = g("z", A, !0)),
        (this.T = g("t", R)),
        Object.freeze(this));
    }
    static CURVE() {
      return l;
    }
    static fromAffine(x) {
      if (x instanceof E) throw new Error("extended point not allowed");
      const { x: M, y: A } = x || {};
      return (g("x", M), g("y", A), new E(M, A, lt, f(M * A)));
    }
    static fromBytes(x, M = !1) {
      const A = i.BYTES,
        { a: R, d: P } = l;
      ((x = Lf(Ne(x, A, "point"))), Df(M, "zip215"));
      const V = Lf(x),
        U = x[A - 1];
      V[A - 1] = U & -129;
      const z = ou(V),
        B = M ? d : i.ORDER;
      Sv("point.y", z, jr, B);
      const H = f(z * z),
        ee = f(H - lt),
        Q = f(P * H - R);
      let { isValid: J, value: ae } = m(ee, Q);
      if (!J) throw new Error("bad point: invalid y coordinate");
      const ye = (ae & lt) === lt,
        ue = (U & 128) !== 0;
      if (!M && ae === jr && ue) throw new Error("bad point: x=0 and x_0=1");
      return (ue !== ye && (ae = f(-ae)), E.fromAffine({ x: ae, y: z }));
    }
    static fromHex(x, M = !1) {
      return E.fromBytes(T0(x), M);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    precompute(x = 8, M = !0) {
      return (S.createCache(this, x), M || this.multiply(sf), this);
    }
    assertValidity() {
      C(this);
    }
    equals(x) {
      y(x);
      const { X: M, Y: A, Z: R } = this,
        { X: P, Y: V, Z: U } = x,
        z = f(M * U),
        B = f(P * R),
        H = f(A * U),
        ee = f(V * R);
      return z === B && H === ee;
    }
    is0() {
      return this.equals(E.ZERO);
    }
    negate() {
      return new E(f(-this.X), this.Y, this.Z, f(-this.T));
    }
    double() {
      const { a: x } = l,
        { X: M, Y: A, Z: R } = this,
        P = f(M * M),
        V = f(A * A),
        U = f(sf * f(R * R)),
        z = f(x * P),
        B = M + A,
        H = f(f(B * B) - P - V),
        ee = z + V,
        Q = ee - U,
        J = z - V,
        ae = f(H * Q),
        ye = f(ee * J),
        ue = f(H * J),
        ce = f(Q * ee);
      return new E(ae, ye, ce, ue);
    }
    add(x) {
      y(x);
      const { a: M, d: A } = l,
        { X: R, Y: P, Z: V, T: U } = this,
        { X: z, Y: B, Z: H, T: ee } = x,
        Q = f(R * z),
        J = f(P * B),
        ae = f(U * A * ee),
        ye = f(V * H),
        ue = f((R + P) * (z + B) - Q - J),
        ce = ye - ae,
        F = ye + ae,
        W = f(J - M * Q),
        Z = f(ue * ce),
        N = f(F * W),
        K = f(ue * W),
        he = f(ce * F);
      return new E(Z, N, he, K);
    }
    subtract(x) {
      return this.add(x.negate());
    }
    multiply(x) {
      if (!o.isValidNot0(x))
        throw new Error("invalid scalar: expected 1 <= sc < curve.n");
      const { p: M, f: A } = S.cached(this, x, (R) => ef(E, R));
      return ef(E, [M, A])[0];
    }
    multiplyUnsafe(x, M = E.ZERO) {
      if (!o.isValid(x))
        throw new Error("invalid scalar: expected 0 <= sc < curve.n");
      return x === jr
        ? E.ZERO
        : this.is0() || x === lt
          ? this
          : S.unsafe(this, x, (A) => ef(E, A), M);
    }
    isSmallOrder() {
      return this.multiplyUnsafe(u).is0();
    }
    isTorsionFree() {
      return S.unsafe(this, l.n).is0();
    }
    toAffine(x) {
      return v(this, x);
    }
    clearCofactor() {
      return u === lt ? this : this.multiplyUnsafe(u);
    }
    toBytes() {
      const { x, y: M } = this.toAffine(),
        A = i.toBytes(M);
      return ((A[A.length - 1] |= x & lt ? 128 : 0), A);
    }
    toHex() {
      return pu(this.toBytes());
    }
    toString() {
      return `<Point ${this.is0() ? "ZERO" : this.toHex()}>`;
    }
  }
  const S = new s_(E, o.BITS);
  return (E.BASE.precompute(8), E);
}
function c_(e, t, n = {}) {
  if (typeof t != "function")
    throw new Error('"hash" function param is required');
  $h(
    n,
    {},
    {
      adjustScalarBytes: "function",
      randomBytes: "function",
      domain: "function",
      prehash: "function",
      mapToCurve: "function",
    },
  );
  const { prehash: i } = n,
    { BASE: o, Fp: l, Fn: u } = e,
    d = n.randomBytes || rT,
    f = n.adjustScalarBytes || ((z) => z),
    m =
      n.domain ||
      ((z, B, H) => {
        if ((Df(H, "phflag"), B.length || H))
          throw new Error("Contexts/pre-hash are not supported");
        return z;
      });
  function g(z) {
    return u.create(ou(z));
  }
  function y(z) {
    const B = A.secretKey;
    Ne(z, A.secretKey, "secretKey");
    const H = Ne(t(z), 2 * B, "hashedSecretKey"),
      ee = f(H.slice(0, B)),
      Q = H.slice(B, 2 * B),
      J = g(ee);
    return { head: ee, prefix: Q, scalar: J };
  }
  function v(z) {
    const { head: B, prefix: H, scalar: ee } = y(z),
      Q = o.multiply(ee),
      J = Q.toBytes();
    return { head: B, prefix: H, scalar: ee, point: Q, pointBytes: J };
  }
  function C(z) {
    return v(z).pointBytes;
  }
  function E(z = Uint8Array.of(), ...B) {
    const H = xy(...B);
    return g(t(m(H, Ne(z, void 0, "context"), !!i)));
  }
  function S(z, B, H = {}) {
    ((z = Ne(z, void 0, "message")), i && (z = i(z)));
    const { prefix: ee, scalar: Q, pointBytes: J } = v(B),
      ae = E(H.context, ee, z),
      ye = o.multiply(ae).toBytes(),
      ue = E(H.context, ye, J, z),
      ce = u.create(ae + ue * Q);
    if (!u.isValid(ce)) throw new Error("sign failed: invalid s");
    const F = xy(ye, u.toBytes(ce));
    return Ne(F, A.signature, "result");
  }
  const k = { zip215: !0 };
  function x(z, B, H, ee = k) {
    const { context: Q, zip215: J } = ee,
      ae = A.signature;
    ((z = Ne(z, ae, "signature")),
      (B = Ne(B, void 0, "message")),
      (H = Ne(H, A.publicKey, "publicKey")),
      J !== void 0 && Df(J, "zip215"),
      i && (B = i(B)));
    const ye = ae / 2,
      ue = z.subarray(0, ye),
      ce = ou(z.subarray(ye, ae));
    let F, W, Z;
    try {
      ((F = e.fromBytes(H, J)),
        (W = e.fromBytes(ue, J)),
        (Z = o.multiplyUnsafe(ce)));
    } catch {
      return !1;
    }
    if (!J && F.isSmallOrder()) return !1;
    const N = E(Q, W.toBytes(), F.toBytes(), B);
    return W.add(F.multiplyUnsafe(N)).subtract(Z).clearCofactor().is0();
  }
  const M = l.BYTES,
    A = { secretKey: M, publicKey: M, signature: 2 * M, seed: M };
  function R(z = d(A.seed)) {
    return Ne(z, A.seed, "seed");
  }
  function P(z) {
    return S0(z) && z.length === u.BYTES;
  }
  function V(z, B) {
    try {
      return !!e.fromBytes(z, B);
    } catch {
      return !1;
    }
  }
  const U = {
    getExtendedPublicKey: v,
    randomSecretKey: R,
    isValidSecretKey: P,
    isValidPublicKey: V,
    toMontgomery(z) {
      const { y: B } = e.fromBytes(z),
        H = A.publicKey,
        ee = H === 32;
      if (!ee && H !== 57) throw new Error("only defined for 25519 and 448");
      const Q = ee ? l.div(lt + B, lt - B) : l.div(B - lt, B + lt);
      return l.toBytes(Q);
    },
    toMontgomerySecret(z) {
      const B = A.secretKey;
      Ne(z, B);
      const H = t(z.subarray(0, B));
      return f(H).subarray(0, B);
    },
  };
  return Object.freeze({
    keygen: o_(R, C),
    getPublicKey: C,
    sign: S,
    verify: x,
    utils: U,
    Point: e,
    lengths: A,
  });
}
const d_ = BigInt(1),
  Mv = BigInt(2),
  f_ = BigInt(5),
  h_ = BigInt(8),
  Uh = BigInt(
    "0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed",
  ),
  p_ = {
    p: Uh,
    n: BigInt(
      "0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3ed",
    ),
    h: h_,
    a: BigInt(
      "0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffec",
    ),
    d: BigInt(
      "0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3",
    ),
    Gx: BigInt(
      "0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a",
    ),
    Gy: BigInt(
      "0x6666666666666666666666666666666666666666666666666666666666666658",
    ),
  };
function m_(e) {
  const t = BigInt(10),
    n = BigInt(20),
    i = BigInt(40),
    o = BigInt(80),
    l = Uh,
    d = (((e * e) % l) * e) % l,
    f = (Rn(d, Mv, l) * d) % l,
    m = (Rn(f, d_, l) * e) % l,
    g = (Rn(m, f_, l) * m) % l,
    y = (Rn(g, t, l) * g) % l,
    v = (Rn(y, n, l) * y) % l,
    C = (Rn(v, i, l) * v) % l,
    E = (Rn(C, o, l) * C) % l,
    S = (Rn(E, o, l) * C) % l,
    k = (Rn(S, t, l) * g) % l;
  return { pow_p_5_8: (Rn(k, Mv, l) * e) % l, b2: d };
}
function g_(e) {
  return ((e[0] &= 248), (e[31] &= 127), (e[31] |= 64), e);
}
const Av = BigInt(
  "19681161376707505956807079304988542015446066515923890162744021073123829784752",
);
function y_(e, t) {
  const n = Uh,
    i = et(t * t * t, n),
    o = et(i * i * t, n),
    l = m_(e * o).pow_p_5_8;
  let u = et(e * i * l, n);
  const d = et(t * u * u, n),
    f = u,
    m = et(u * Av, n),
    g = d === e,
    y = d === et(-e, n),
    v = d === et(-e * Av, n);
  return (
    g && (u = f),
    (y || v) && (u = m),
    ZR(u, n) && (u = et(-u, n)),
    { isValid: g || y, value: u }
  );
}
const v_ = u_(p_, { uvRatio: y_ });
function w_(e) {
  return c_(v_, Mu, Object.assign({ adjustScalarBytes: g_ }, e));
}
const er = w_({}),
  of = 32;
var bi,
  b_ =
    ((bi = class extends DR {
      constructor(t) {
        if (
          (super(),
          typeof t == "string"
            ? (this.data = rt(t))
            : t instanceof Uint8Array
              ? (this.data = t)
              : (this.data = Uint8Array.from(t)),
          this.data.length !== of)
        )
          throw new Error(
            `Invalid public key input. Expected ${of} bytes, got ${this.data.length}`,
          );
      }
      equals(t) {
        return super.equals(t);
      }
      toRawBytes() {
        return this.data;
      }
      flag() {
        return Bh.ED25519;
      }
      async verify(t, n) {
        let i;
        if (typeof n == "string") {
          const o = LR(n);
          if (o.signatureScheme !== "ED25519")
            throw new Error("Invalid signature scheme");
          if (!_S(this.toRawBytes(), o.publicKey))
            throw new Error("Signature does not match public key");
          i = o.signature;
        } else i = n;
        return er.verify(i, t, this.toRawBytes());
      }
    }),
    (bi.SIZE = of),
    bi);
class qS {
  oHash;
  iHash;
  blockLen;
  outputLen;
  finished = !1;
  destroyed = !1;
  constructor(t, n) {
    if (
      (E0(t),
      Ne(n, void 0, "key"),
      (this.iHash = t.create()),
      typeof this.iHash.update != "function")
    )
      throw new Error("Expected instance of class which extends utils.Hash");
    ((this.blockLen = this.iHash.blockLen),
      (this.outputLen = this.iHash.outputLen));
    const i = this.blockLen,
      o = new Uint8Array(i);
    o.set(n.length > i ? t.create().update(n).digest() : n);
    for (let l = 0; l < o.length; l++) o[l] ^= 54;
    (this.iHash.update(o), (this.oHash = t.create()));
    for (let l = 0; l < o.length; l++) o[l] ^= 106;
    (this.oHash.update(o), Fr(o));
  }
  update(t) {
    return (xi(this), this.iHash.update(t), this);
  }
  digestInto(t) {
    (xi(this),
      Ne(t, this.outputLen, "output"),
      (this.finished = !0),
      this.iHash.digestInto(t),
      this.oHash.update(t),
      this.oHash.digestInto(t),
      this.destroy());
  }
  digest() {
    const t = new Uint8Array(this.oHash.outputLen);
    return (this.digestInto(t), t);
  }
  _cloneInto(t) {
    t ||= Object.create(Object.getPrototypeOf(this), {});
    const {
      oHash: n,
      iHash: i,
      finished: o,
      destroyed: l,
      blockLen: u,
      outputLen: d,
    } = this;
    return (
      (t = t),
      (t.finished = o),
      (t.destroyed = l),
      (t.blockLen = u),
      (t.outputLen = d),
      (t.oHash = n._cloneInto(t.oHash)),
      (t.iHash = i._cloneInto(t.iHash)),
      t
    );
  }
  clone() {
    return this._cloneInto();
  }
  destroy() {
    ((this.destroyed = !0), this.oHash.destroy(), this.iHash.destroy());
  }
}
const Au = (e, t, n) => new qS(e, t).update(n).digest();
Au.create = (e, t) => new qS(e, t);
function S_(e, t, n, i) {
  E0(e);
  const o = nT({ dkLen: 32, asyncTick: 10 }, i),
    { c: l, dkLen: u, asyncTick: d } = o;
  if ((bn(l, "c"), bn(u, "dkLen"), bn(d, "asyncTick"), l < 1))
    throw new Error("iterations (c) must be >= 1");
  const f = Ey(t, "password"),
    m = Ey(n, "salt"),
    g = new Uint8Array(u),
    y = Au.create(e, f),
    v = y._cloneInto().update(m);
  return { c: l, dkLen: u, asyncTick: d, DK: g, PRF: y, PRFSalt: v };
}
function E_(e, t, n, i, o) {
  return (e.destroy(), t.destroy(), i && i.destroy(), Fr(o), n);
}
function x_(e, t, n, i) {
  const { c: o, dkLen: l, DK: u, PRF: d, PRFSalt: f } = S_(e, t, n, i);
  let m;
  const g = new Uint8Array(4),
    y = Ol(g),
    v = new Uint8Array(d.outputLen);
  for (let C = 1, E = 0; E < l; C++, E += d.outputLen) {
    const S = u.subarray(E, E + d.outputLen);
    (y.setInt32(0, C, !1),
      (m = f._cloneInto(m)).update(g).digestInto(v),
      S.set(v.subarray(0, S.length)));
    for (let k = 1; k < o; k++) {
      d._cloneInto(m).update(v).digestInto(v);
      for (let x = 0; x < S.length; x++) S[x] ^= v[x];
    }
  }
  return E_(d, f, u, m, v);
}
function QS(e) {
  if (typeof e != "string")
    throw new TypeError("invalid mnemonic type: " + typeof e);
  return e.normalize("NFKD");
}
function C_(e) {
  const t = QS(e),
    n = t.split(" ");
  if (![12, 15, 18, 21, 24].includes(n.length))
    throw new Error("Invalid mnemonic");
  return { nfkd: t, words: n };
}
const k_ = (e) => QS("mnemonic" + e);
function O_(e, t = "") {
  return x_(Mu, C_(e).nfkd, k_(t), { c: 2048, dkLen: 64 });
}
function jv(e) {
  return !!new RegExp("^m\\/44'\\/784'\\/[0-9]+'\\/[0-9]+'\\/[0-9]+'+$").test(
    e,
  );
}
function T_(e) {
  return O_(e, "");
}
function I_(e) {
  return $r(T_(e));
}
function M_({ signature: e, signatureScheme: t, publicKey: n }) {
  if (!n) throw new Error("`publicKey` is required");
  const i = n.toRawBytes(),
    o = new Uint8Array(1 + e.length + i.length);
  return (o.set([Bh[t]]), o.set(e, 1), o.set(i, 1 + e.length), ze(o));
}
const $l = 32,
  YS = "suiprivkey";
var A_ = class {
    async signWithIntent(e, t) {
      const n = Do(RS(t, e), { dkLen: 32 });
      return {
        signature: M_({
          signature: await this.sign(n),
          signatureScheme: this.getKeyScheme(),
          publicKey: this.getPublicKey(),
        }),
        bytes: ze(e),
      };
    }
    async signTransaction(e) {
      return this.signWithIntent(e, "TransactionData");
    }
    async signPersonalMessage(e) {
      const { signature: t } = await this.signWithIntent(
        T.byteVector().serialize(e).toBytes(),
        "PersonalMessage",
      );
      return { bytes: ze(e), signature: t };
    }
    async signAndExecuteTransaction({ transaction: e, client: t }) {
      e.setSenderIfNotSet(this.toSuiAddress());
      const n = await e.build({ client: t }),
        { signature: i } = await this.signTransaction(n);
      return t.core.executeTransaction({
        transaction: n,
        signatures: [i],
        include: { transaction: !0, effects: !0 },
      });
    }
    toSuiAddress() {
      return this.getPublicKey().toSuiAddress();
    }
  },
  j_ = class extends A_ {};
function R_(e) {
  const { prefix: t, words: n } = Kl.decode(e);
  if (t !== YS) throw new Error("invalid private key prefix");
  const i = new Uint8Array(Kl.fromWords(n)),
    o = i.slice(1);
  return { scheme: jS[i[0]], secretKey: o };
}
function __(e, t) {
  if (e.length !== $l) throw new Error("Invalid bytes length");
  const n = Bh[t],
    i = new Uint8Array(e.length + 1);
  return (i.set([n]), i.set(e, 1), Kl.encode(YS, Kl.toWords(i)));
}
const N_ = "ed25519 seed",
  P_ = 2147483648,
  D_ = new RegExp("^m(\\/[0-9]+')+$"),
  XS = (e) => e.replace("'", ""),
  L_ = (e) => {
    const t = Au.create(Mu, new TextEncoder().encode(N_))
      .update(rh(e))
      .digest();
    return { key: t.slice(0, 32), chainCode: t.slice(32) };
  },
  B_ = ({ key: e, chainCode: t }, n) => {
    const i = new ArrayBuffer(4);
    new DataView(i).setUint32(0, n);
    const o = new Uint8Array(1 + e.length + i.byteLength);
    (o.set(new Uint8Array(1).fill(0)),
      o.set(e, 1),
      o.set(new Uint8Array(i, 0, i.byteLength), e.length + 1));
    const l = Au.create(Mu, t).update(o).digest();
    return { key: l.slice(0, 32), chainCode: l.slice(32) };
  },
  $_ = (e) => (D_.test(e) ? !e.split("/").slice(1).map(XS).some(isNaN) : !1),
  Rv = (e, t, n = P_) => {
    if (!$_(e)) throw new Error("Invalid derivation path");
    const { key: i, chainCode: o } = L_(t);
    return e
      .split("/")
      .slice(1)
      .map(XS)
      .map((l) => parseInt(l, 10))
      .reduce((l, u) => B_(l, u + n), { key: i, chainCode: o });
  },
  _v = "m/44'/784'/0'/0'/0'";
var z_ = class Io extends j_ {
  constructor(t) {
    if ((super(), t))
      this.keypair = {
        publicKey: t.publicKey,
        secretKey: t.secretKey.slice(0, 32),
      };
    else {
      const n = er.utils.randomSecretKey();
      this.keypair = { publicKey: er.getPublicKey(n), secretKey: n };
    }
  }
  getKeyScheme() {
    return "ED25519";
  }
  static generate() {
    const t = er.utils.randomSecretKey();
    return new Io({ publicKey: er.getPublicKey(t), secretKey: t });
  }
  static fromSecretKey(t, n) {
    if (typeof t == "string") {
      const l = R_(t);
      if (l.scheme !== "ED25519")
        throw new Error(`Expected a ED25519 keypair, got ${l.scheme}`);
      return this.fromSecretKey(l.secretKey, n);
    }
    const i = t.length;
    if (i !== $l)
      throw new Error(`Wrong secretKey size. Expected ${$l} bytes, got ${i}.`);
    const o = { publicKey: er.getPublicKey(t), secretKey: t };
    if (!n || !n.skipValidation) {
      const l = new TextEncoder().encode("sui validation"),
        u = er.sign(l, t);
      if (!er.verify(u, l, o.publicKey))
        throw new Error("provided secretKey is invalid");
    }
    return new Io(o);
  }
  getPublicKey() {
    return new b_(this.keypair.publicKey);
  }
  getSecretKey() {
    return __(this.keypair.secretKey.slice(0, $l), this.getKeyScheme());
  }
  async sign(t) {
    return er.sign(t, this.keypair.secretKey);
  }
  static deriveKeypair(t, n) {
    if ((n == null && (n = _v), !jv(n)))
      throw new Error("Invalid derivation path");
    const { key: i } = Rv(n, I_(t));
    return Io.fromSecretKey(i);
  }
  static deriveKeypairFromSeed(t, n) {
    if ((n == null && (n = _v), !jv(n)))
      throw new Error("Invalid derivation path");
    const i = typeof t == "string" ? t : $r(t),
      { key: o } = Rv(n, i);
    return Io.fromSecretKey(o);
  }
};
function ZS(e, t) {
  let n;
  try {
    n = e();
  } catch {
    return;
  }
  return {
    getItem: (o) => {
      var l;
      const u = (f) => (f === null ? null : JSON.parse(f, void 0)),
        d = (l = n.getItem(o)) != null ? l : null;
      return d instanceof Promise ? d.then(u) : u(d);
    },
    setItem: (o, l) => n.setItem(o, JSON.stringify(l, void 0)),
    removeItem: (o) => n.removeItem(o),
  };
}
const $f = (e) => (t) => {
    try {
      const n = e(t);
      return n instanceof Promise
        ? n
        : {
            then(i) {
              return $f(i)(n);
            },
            catch(i) {
              return this;
            },
          };
    } catch (n) {
      return {
        then(i) {
          return this;
        },
        catch(i) {
          return $f(i)(n);
        },
      };
    }
  },
  F_ = (e, t) => (n, i, o) => {
    let l = {
        storage: ZS(() => window.localStorage),
        partialize: (k) => k,
        version: 0,
        merge: (k, x) => ({ ...x, ...k }),
        ...t,
      },
      u = !1,
      d = 0;
    const f = new Set(),
      m = new Set();
    let g = l.storage;
    if (!g)
      return e(
        (...k) => {
          (console.warn(
            `[zustand persist middleware] Unable to update item '${l.name}', the given storage is currently unavailable.`,
          ),
            n(...k));
        },
        i,
        o,
      );
    const y = () => {
        const k = l.partialize({ ...i() });
        return g.setItem(l.name, { state: k, version: l.version });
      },
      v = o.setState;
    o.setState = (k, x) => (v(k, x), y());
    const C = e((...k) => (n(...k), y()), i, o);
    o.getInitialState = () => C;
    let E;
    const S = () => {
      var k, x;
      if (!g) return;
      const M = ++d;
      ((u = !1),
        f.forEach((R) => {
          var P;
          return R((P = i()) != null ? P : C);
        }));
      const A =
        ((x = l.onRehydrateStorage) == null
          ? void 0
          : x.call(l, (k = i()) != null ? k : C)) || void 0;
      return $f(g.getItem.bind(g))(l.name)
        .then((R) => {
          if (R)
            if (typeof R.version == "number" && R.version !== l.version) {
              if (l.migrate) {
                const P = l.migrate(R.state, R.version);
                return P instanceof Promise ? P.then((V) => [!0, V]) : [!0, P];
              }
              console.error(
                "State loaded from storage couldn't be migrated since no migrate function was provided",
              );
            } else return [!1, R.state];
          return [!1, void 0];
        })
        .then((R) => {
          var P;
          if (M !== d) return;
          const [V, U] = R;
          if (((E = l.merge(U, (P = i()) != null ? P : C)), n(E, !0), V))
            return y();
        })
        .then(() => {
          M === d &&
            (A?.(E, void 0), (E = i()), (u = !0), m.forEach((R) => R(E)));
        })
        .catch((R) => {
          M === d && A?.(void 0, R);
        });
    };
    return (
      (o.persist = {
        setOptions: (k) => {
          ((l = { ...l, ...k }), k.storage && (g = k.storage));
        },
        clearStorage: () => {
          g?.removeItem(l.name);
        },
        getOptions: () => l,
        rehydrate: () => S(),
        hasHydrated: () => u,
        onHydrate: (k) => (
          f.add(k),
          () => {
            f.delete(k);
          }
        ),
        onFinishHydration: (k) => (
          m.add(k),
          () => {
            m.delete(k);
          }
        ),
      }),
      l.skipHydration || S(),
      E || C
    );
  },
  U_ = F_;
function Nv(e) {
  var t = e.match(/^var\((.*)\)$/);
  return t ? t[1] : e;
}
function V_(e, t) {
  var n = e;
  for (var i of t) {
    if (!(i in n))
      throw new Error(
        "Path ".concat(t.join(" -> "), " does not exist in object"),
      );
    n = n[i];
  }
  return n;
}
function Vh(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [],
    i = {};
  for (var o in e) {
    var l = e[o],
      u = [...n, o];
    typeof l == "string" || typeof l == "number" || l == null
      ? (i[o] = t(l, u))
      : typeof l == "object" && !Array.isArray(l)
        ? (i[o] = Vh(l, t, u))
        : console.warn(
            'Skipping invalid key "'
              .concat(
                u.join("."),
                '". Should be a string, number, null or object. Received: "',
              )
              .concat(Array.isArray(l) ? "Array" : typeof l, '"'),
          );
  }
  return i;
}
function W_(e, t) {
  var n = {};
  if (typeof t == "object") {
    var i = e;
    Vh(t, (d, f) => {
      if (d != null) {
        var m = V_(i, f);
        n[Nv(m)] = String(d);
      }
    });
  } else {
    var o = e;
    for (var l in o) {
      var u = o[l];
      u != null && (n[Nv(l)] = u);
    }
  }
  return (
    Object.defineProperty(n, "toString", {
      value: function () {
        return Object.keys(this)
          .map((f) => "".concat(f, ":").concat(this[f]))
          .join(";");
      },
      writable: !1,
    }),
    n
  );
}
var af, Pv;
function H_() {
  if (Pv) return af;
  Pv = 1;
  var e = {},
    t = e.hasOwnProperty,
    n = function (f, m) {
      if (!f) return m;
      var g = {};
      for (var y in m) g[y] = t.call(f, y) ? f[y] : m[y];
      return g;
    },
    i = /[ -,\.\/:-@\[-\^`\{-~]/,
    o = /[ -,\.\/:-@\[\]\^`\{-~]/,
    l = /(^|\\+)?(\\[A-F0-9]{1,6})\x20(?![a-fA-F0-9\x20])/g,
    u = function d(f, m) {
      ((m = n(m, d.options)),
        m.quotes != "single" && m.quotes != "double" && (m.quotes = "single"));
      for (
        var g = m.quotes == "double" ? '"' : "'",
          y = m.isIdentifier,
          v = f.charAt(0),
          C = "",
          E = 0,
          S = f.length;
        E < S;
      ) {
        var k = f.charAt(E++),
          x = k.charCodeAt(),
          M = void 0;
        if (x < 32 || x > 126) {
          if (x >= 55296 && x <= 56319 && E < S) {
            var A = f.charCodeAt(E++);
            (A & 64512) == 56320
              ? (x = ((x & 1023) << 10) + (A & 1023) + 65536)
              : E--;
          }
          M = "\\" + x.toString(16).toUpperCase() + " ";
        } else
          m.escapeEverything
            ? i.test(k)
              ? (M = "\\" + k)
              : (M = "\\" + x.toString(16).toUpperCase() + " ")
            : /[\t\n\f\r\x0B]/.test(k)
              ? (M = "\\" + x.toString(16).toUpperCase() + " ")
              : k == "\\" ||
                  (!y && ((k == '"' && g == k) || (k == "'" && g == k))) ||
                  (y && o.test(k))
                ? (M = "\\" + k)
                : (M = k);
        C += M;
      }
      return (
        y &&
          (/^-[-\d]/.test(C)
            ? (C = "\\-" + C.slice(1))
            : /\d/.test(v) && (C = "\\3" + v + " " + C.slice(1))),
        (C = C.replace(l, function (R, P, V) {
          return P && P.length % 2 ? R : (P || "") + V;
        })),
        !y && m.wrap ? g + C + g : C
      );
    };
  return (
    (u.options = {
      escapeEverything: !1,
      isIdentifier: !1,
      quotes: "single",
      wrap: !1,
    }),
    (u.version = "3.0.0"),
    (af = u),
    af
  );
}
var K_ = H_();
const G_ = Ko(K_);
var JS = !1,
  q_ = (e) => {
    JS || Q_(e);
  },
  Q_ = (e) => {
    if (!e) throw new Error('No adapter provided when calling "setAdapter"');
    JS = !0;
  };
function Dv(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    (t &&
      (i = i.filter(function (o) {
        return Object.getOwnPropertyDescriptor(e, o).enumerable;
      })),
      n.push.apply(n, i));
  }
  return n;
}
function Lv(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Dv(Object(n), !0).forEach(function (i) {
          Y_(e, i, n[i]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Dv(Object(n)).forEach(function (i) {
            Object.defineProperty(e, i, Object.getOwnPropertyDescriptor(n, i));
          });
  }
  return e;
}
function Y_(e, t, n) {
  return (
    (t = X_(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function X_(e) {
  var t = Z_(e, "string");
  return typeof t == "symbol" ? t : String(t);
}
function Z_(e, t) {
  if (typeof e != "object" || e === null) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var i = n.call(e, t);
    if (typeof i != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
eE({});
function eE(e) {
  return ((t.withOptions = (n) => eE(Lv(Lv({}, e), n))), t);
  function t(n, ...i) {
    const o = typeof n == "string" ? [n] : n.raw,
      {
        alignValues: l = !1,
        escapeSpecialCharacters: u = Array.isArray(n),
        trimWhitespace: d = !0,
      } = e;
    let f = "";
    for (let y = 0; y < o.length; y++) {
      let v = o[y];
      if (
        (u &&
          (v = v
            .replace(/\\\n[ \t]*/g, "")
            .replace(/\\`/g, "`")
            .replace(/\\\$/g, "$")
            .replace(/\\\{/g, "{")),
        (f += v),
        y < i.length)
      ) {
        const C = l ? J_(i[y], f) : i[y];
        f += C;
      }
    }
    const m = f.split(`
`);
    let g = null;
    for (const y of m) {
      const v = y.match(/^(\s+)\S+/);
      if (v) {
        const C = v[1].length;
        g ? (g = Math.min(g, C)) : (g = C);
      }
    }
    if (g !== null) {
      const y = g;
      f = m.map((v) => (v[0] === " " || v[0] === "	" ? v.slice(y) : v)).join(`
`);
    }
    return (
      d && (f = f.trim()),
      u &&
        (f = f
          .replace(
            /\\n/g,
            `
`,
          )
          .replace(/\\t/g, "	")
          .replace(/\\r/g, "\r")
          .replace(/\\v/g, "\v")
          .replace(/\\b/g, "\b")
          .replace(/\\f/g, "\f")
          .replace(/\\0/g, "\0")
          .replace(/\\x([\da-fA-F]{2})/g, (y, v) =>
            String.fromCharCode(parseInt(v, 16)),
          )
          .replace(/\\u\{([\da-fA-F]{1,6})\}/g, (y, v) =>
            String.fromCodePoint(parseInt(v, 16)),
          )
          .replace(/\\u([\da-fA-F]{4})/g, (y, v) =>
            String.fromCharCode(parseInt(v, 16)),
          )),
      typeof Bun < "u" &&
        (f = f.replace(
          /\\u(?:\{([\da-fA-F]{1,6})\}|([\da-fA-F]{4}))/g,
          (y, v, C) => {
            var E;
            const S = (E = v ?? C) !== null && E !== void 0 ? E : "";
            return String.fromCodePoint(parseInt(S, 16));
          },
        )),
      f
    );
  }
}
function J_(e, t) {
  if (
    typeof e != "string" ||
    !e.includes(`
`)
  )
    return e;
  const i = t
    .slice(
      t.lastIndexOf(`
`) + 1,
    )
    .match(/^(\s+)/);
  if (i) {
    const o = i[1];
    return e.replace(
      /\n/g,
      `
${o}`,
    );
  }
  return e;
}
var eN = {
    ":-moz-any-link": !0,
    ":-moz-full-screen": !0,
    ":-moz-placeholder": !0,
    ":-moz-read-only": !0,
    ":-moz-read-write": !0,
    ":-ms-fullscreen": !0,
    ":-ms-input-placeholder": !0,
    ":-webkit-any-link": !0,
    ":-webkit-full-screen": !0,
    "::-moz-color-swatch": !0,
    "::-moz-list-bullet": !0,
    "::-moz-list-number": !0,
    "::-moz-page-sequence": !0,
    "::-moz-page": !0,
    "::-moz-placeholder": !0,
    "::-moz-progress-bar": !0,
    "::-moz-range-progress": !0,
    "::-moz-range-thumb": !0,
    "::-moz-range-track": !0,
    "::-moz-scrolled-page-sequence": !0,
    "::-moz-selection": !0,
    "::-ms-backdrop": !0,
    "::-ms-browse": !0,
    "::-ms-check": !0,
    "::-ms-clear": !0,
    "::-ms-fill-lower": !0,
    "::-ms-fill-upper": !0,
    "::-ms-fill": !0,
    "::-ms-reveal": !0,
    "::-ms-thumb": !0,
    "::-ms-ticks-after": !0,
    "::-ms-ticks-before": !0,
    "::-ms-tooltip": !0,
    "::-ms-track": !0,
    "::-ms-value": !0,
    "::-webkit-backdrop": !0,
    "::-webkit-calendar-picker-indicator": !0,
    "::-webkit-inner-spin-button": !0,
    "::-webkit-input-placeholder": !0,
    "::-webkit-meter-bar": !0,
    "::-webkit-meter-even-less-good-value": !0,
    "::-webkit-meter-inner-element": !0,
    "::-webkit-meter-optimum-value": !0,
    "::-webkit-meter-suboptimum-value": !0,
    "::-webkit-outer-spin-button": !0,
    "::-webkit-progress-bar": !0,
    "::-webkit-progress-inner-element": !0,
    "::-webkit-progress-inner-value": !0,
    "::-webkit-progress-value": !0,
    "::-webkit-resizer": !0,
    "::-webkit-scrollbar-button": !0,
    "::-webkit-scrollbar-corner": !0,
    "::-webkit-scrollbar-thumb": !0,
    "::-webkit-scrollbar-track-piece": !0,
    "::-webkit-scrollbar-track": !0,
    "::-webkit-scrollbar": !0,
    "::-webkit-search-cancel-button": !0,
    "::-webkit-search-results-button": !0,
    "::-webkit-slider-runnable-track": !0,
    "::-webkit-slider-thumb": !0,
    "::after": !0,
    "::backdrop": !0,
    "::before": !0,
    "::cue": !0,
    "::file-selector-button": !0,
    "::first-letter": !0,
    "::first-line": !0,
    "::grammar-error": !0,
    "::marker": !0,
    "::placeholder": !0,
    "::selection": !0,
    "::spelling-error": !0,
    "::target-text": !0,
    "::view-transition-group": !0,
    "::view-transition-image-pair": !0,
    "::view-transition-new": !0,
    "::view-transition-old": !0,
    "::view-transition": !0,
    ":active": !0,
    ":after": !0,
    ":any-link": !0,
    ":before": !0,
    ":blank": !0,
    ":checked": !0,
    ":default": !0,
    ":defined": !0,
    ":disabled": !0,
    ":empty": !0,
    ":enabled": !0,
    ":first-child": !0,
    ":first-letter": !0,
    ":first-line": !0,
    ":first-of-type": !0,
    ":first": !0,
    ":focus-visible": !0,
    ":focus-within": !0,
    ":focus": !0,
    ":fullscreen": !0,
    ":hover": !0,
    ":in-range": !0,
    ":indeterminate": !0,
    ":invalid": !0,
    ":last-child": !0,
    ":last-of-type": !0,
    ":left": !0,
    ":link": !0,
    ":only-child": !0,
    ":only-of-type": !0,
    ":optional": !0,
    ":out-of-range": !0,
    ":placeholder-shown": !0,
    ":read-only": !0,
    ":read-write": !0,
    ":required": !0,
    ":right": !0,
    ":root": !0,
    ":scope": !0,
    ":target": !0,
    ":valid": !0,
    ":visited": !0,
  },
  tN = Object.keys(eN);
[...tN];
const ai =
    typeof performance == "object" &&
    performance &&
    typeof performance.now == "function"
      ? performance
      : Date,
  tE = new Set(),
  zf = typeof process == "object" && process ? process : {},
  nE = (e, t, n, i) => {
    typeof zf.emitWarning == "function"
      ? zf.emitWarning(e, t, n, i)
      : console.error(`[${n}] ${t}: ${e}`);
  };
let lu = globalThis.AbortController,
  Bv = globalThis.AbortSignal;
if (typeof lu > "u") {
  ((Bv = class {
    onabort;
    _onabort = [];
    reason;
    aborted = !1;
    addEventListener(i, o) {
      this._onabort.push(o);
    }
  }),
    (lu = class {
      constructor() {
        t();
      }
      signal = new Bv();
      abort(i) {
        if (!this.signal.aborted) {
          ((this.signal.reason = i), (this.signal.aborted = !0));
          for (const o of this.signal._onabort) o(i);
          this.signal.onabort?.(i);
        }
      }
    }));
  let e = zf.env?.LRU_CACHE_IGNORE_AC_WARNING !== "1";
  const t = () => {
    e &&
      ((e = !1),
      nE(
        "AbortController is not defined. If using lru-cache in node 14, load an AbortController polyfill from the `node-abort-controller` package. A minimal polyfill is provided for use by LRUCache.fetch(), but it should not be relied upon in other contexts (eg, passing it to other APIs that use AbortController/AbortSignal might have undesirable effects). You may disable this with LRU_CACHE_IGNORE_AC_WARNING=1 in the env.",
        "NO_ABORT_CONTROLLER",
        "ENOTSUP",
        t,
      ));
  };
}
const nN = (e) => !tE.has(e),
  _r = (e) => e && e === Math.floor(e) && e > 0 && isFinite(e),
  rE = (e) =>
    _r(e)
      ? e <= Math.pow(2, 8)
        ? Uint8Array
        : e <= Math.pow(2, 16)
          ? Uint16Array
          : e <= Math.pow(2, 32)
            ? Uint32Array
            : e <= Number.MAX_SAFE_INTEGER
              ? zl
              : null
      : null;
class zl extends Array {
  constructor(t) {
    (super(t), this.fill(0));
  }
}
class pi {
  heap;
  length;
  static #e = !1;
  static create(t) {
    const n = rE(t);
    if (!n) return [];
    pi.#e = !0;
    const i = new pi(t, n);
    return ((pi.#e = !1), i);
  }
  constructor(t, n) {
    if (!pi.#e) throw new TypeError("instantiate Stack using Stack.create(n)");
    ((this.heap = new n(t)), (this.length = 0));
  }
  push(t) {
    this.heap[this.length++] = t;
  }
  pop() {
    return this.heap[--this.length];
  }
}
class Wh {
  #e;
  #t;
  #n;
  #s;
  #i;
  #l;
  ttl;
  ttlResolution;
  ttlAutopurge;
  updateAgeOnGet;
  updateAgeOnHas;
  allowStale;
  noDisposeOnSet;
  noUpdateTTL;
  maxEntrySize;
  sizeCalculation;
  noDeleteOnFetchRejection;
  noDeleteOnStaleGet;
  allowStaleOnFetchAbort;
  allowStaleOnFetchRejection;
  ignoreFetchAbort;
  #a;
  #u;
  #r;
  #c;
  #o;
  #f;
  #p;
  #d;
  #m;
  #y;
  #h;
  #w;
  #S;
  #b;
  #E;
  #C;
  #v;
  static unsafeExposeInternals(t) {
    return {
      starts: t.#S,
      ttls: t.#b,
      sizes: t.#w,
      keyMap: t.#r,
      keyList: t.#c,
      valList: t.#o,
      next: t.#f,
      prev: t.#p,
      get head() {
        return t.#d;
      },
      get tail() {
        return t.#m;
      },
      free: t.#y,
      isBackgroundFetch: (n) => t.#g(n),
      backgroundFetch: (n, i, o, l) => t.#P(n, i, o, l),
      moveToTail: (n) => t.#R(n),
      indexes: (n) => t.#k(n),
      rindexes: (n) => t.#O(n),
      isStale: (n) => t.#x(n),
    };
  }
  get max() {
    return this.#e;
  }
  get maxSize() {
    return this.#t;
  }
  get calculatedSize() {
    return this.#u;
  }
  get size() {
    return this.#a;
  }
  get fetchMethod() {
    return this.#i;
  }
  get memoMethod() {
    return this.#l;
  }
  get dispose() {
    return this.#n;
  }
  get disposeAfter() {
    return this.#s;
  }
  constructor(t) {
    const {
      max: n = 0,
      ttl: i,
      ttlResolution: o = 1,
      ttlAutopurge: l,
      updateAgeOnGet: u,
      updateAgeOnHas: d,
      allowStale: f,
      dispose: m,
      disposeAfter: g,
      noDisposeOnSet: y,
      noUpdateTTL: v,
      maxSize: C = 0,
      maxEntrySize: E = 0,
      sizeCalculation: S,
      fetchMethod: k,
      memoMethod: x,
      noDeleteOnFetchRejection: M,
      noDeleteOnStaleGet: A,
      allowStaleOnFetchRejection: R,
      allowStaleOnFetchAbort: P,
      ignoreFetchAbort: V,
    } = t;
    if (n !== 0 && !_r(n))
      throw new TypeError("max option must be a nonnegative integer");
    const U = n ? rE(n) : Array;
    if (!U) throw new Error("invalid max value: " + n);
    if (
      ((this.#e = n),
      (this.#t = C),
      (this.maxEntrySize = E || this.#t),
      (this.sizeCalculation = S),
      this.sizeCalculation)
    ) {
      if (!this.#t && !this.maxEntrySize)
        throw new TypeError(
          "cannot set sizeCalculation without setting maxSize or maxEntrySize",
        );
      if (typeof this.sizeCalculation != "function")
        throw new TypeError("sizeCalculation set to non-function");
    }
    if (x !== void 0 && typeof x != "function")
      throw new TypeError("memoMethod must be a function if defined");
    if (((this.#l = x), k !== void 0 && typeof k != "function"))
      throw new TypeError("fetchMethod must be a function if specified");
    if (
      ((this.#i = k),
      (this.#C = !!k),
      (this.#r = new Map()),
      (this.#c = new Array(n).fill(void 0)),
      (this.#o = new Array(n).fill(void 0)),
      (this.#f = new U(n)),
      (this.#p = new U(n)),
      (this.#d = 0),
      (this.#m = 0),
      (this.#y = pi.create(n)),
      (this.#a = 0),
      (this.#u = 0),
      typeof m == "function" && (this.#n = m),
      typeof g == "function"
        ? ((this.#s = g), (this.#h = []))
        : ((this.#s = void 0), (this.#h = void 0)),
      (this.#E = !!this.#n),
      (this.#v = !!this.#s),
      (this.noDisposeOnSet = !!y),
      (this.noUpdateTTL = !!v),
      (this.noDeleteOnFetchRejection = !!M),
      (this.allowStaleOnFetchRejection = !!R),
      (this.allowStaleOnFetchAbort = !!P),
      (this.ignoreFetchAbort = !!V),
      this.maxEntrySize !== 0)
    ) {
      if (this.#t !== 0 && !_r(this.#t))
        throw new TypeError("maxSize must be a positive integer if specified");
      if (!_r(this.maxEntrySize))
        throw new TypeError(
          "maxEntrySize must be a positive integer if specified",
        );
      this.#F();
    }
    if (
      ((this.allowStale = !!f),
      (this.noDeleteOnStaleGet = !!A),
      (this.updateAgeOnGet = !!u),
      (this.updateAgeOnHas = !!d),
      (this.ttlResolution = _r(o) || o === 0 ? o : 1),
      (this.ttlAutopurge = !!l),
      (this.ttl = i || 0),
      this.ttl)
    ) {
      if (!_r(this.ttl))
        throw new TypeError("ttl must be a positive integer if specified");
      this.#M();
    }
    if (this.#e === 0 && this.ttl === 0 && this.#t === 0)
      throw new TypeError("At least one of max, maxSize, or ttl is required");
    if (!this.ttlAutopurge && !this.#e && !this.#t) {
      const z = "LRU_CACHE_UNBOUNDED";
      nN(z) &&
        (tE.add(z),
        nE(
          "TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.",
          "UnboundedCacheWarning",
          z,
          Wh,
        ));
    }
  }
  getRemainingTTL(t) {
    return this.#r.has(t) ? 1 / 0 : 0;
  }
  #M() {
    const t = new zl(this.#e),
      n = new zl(this.#e);
    ((this.#b = t),
      (this.#S = n),
      (this.#D = (l, u, d = ai.now()) => {
        if (
          ((n[l] = u !== 0 ? d : 0), (t[l] = u), u !== 0 && this.ttlAutopurge)
        ) {
          const f = setTimeout(() => {
            this.#x(l) && this.#T(this.#c[l], "expire");
          }, u + 1);
          f.unref && f.unref();
        }
      }),
      (this.#A = (l) => {
        n[l] = t[l] !== 0 ? ai.now() : 0;
      }),
      (this.#I = (l, u) => {
        if (t[u]) {
          const d = t[u],
            f = n[u];
          if (!d || !f) return;
          ((l.ttl = d), (l.start = f), (l.now = i || o()));
          const m = l.now - f;
          l.remainingTTL = d - m;
        }
      }));
    let i = 0;
    const o = () => {
      const l = ai.now();
      if (this.ttlResolution > 0) {
        i = l;
        const u = setTimeout(() => (i = 0), this.ttlResolution);
        u.unref && u.unref();
      }
      return l;
    };
    ((this.getRemainingTTL = (l) => {
      const u = this.#r.get(l);
      if (u === void 0) return 0;
      const d = t[u],
        f = n[u];
      if (!d || !f) return 1 / 0;
      const m = (i || o()) - f;
      return d - m;
    }),
      (this.#x = (l) => {
        const u = n[l],
          d = t[l];
        return !!d && !!u && (i || o()) - u > d;
      }));
  }
  #A = () => {};
  #I = () => {};
  #D = () => {};
  #x = () => !1;
  #F() {
    const t = new zl(this.#e);
    ((this.#u = 0),
      (this.#w = t),
      (this.#j = (n) => {
        ((this.#u -= t[n]), (t[n] = 0));
      }),
      (this.#L = (n, i, o, l) => {
        if (this.#g(i)) return 0;
        if (!_r(o))
          if (l) {
            if (typeof l != "function")
              throw new TypeError("sizeCalculation must be a function");
            if (((o = l(i, n)), !_r(o)))
              throw new TypeError(
                "sizeCalculation return invalid (expect positive integer)",
              );
          } else
            throw new TypeError(
              "invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set.",
            );
        return o;
      }),
      (this.#_ = (n, i, o) => {
        if (((t[n] = i), this.#t)) {
          const l = this.#t - t[n];
          for (; this.#u > l; ) this.#N(!0);
        }
        ((this.#u += t[n]),
          o && ((o.entrySize = i), (o.totalCalculatedSize = this.#u)));
      }));
  }
  #j = (t) => {};
  #_ = (t, n, i) => {};
  #L = (t, n, i, o) => {
    if (i || o)
      throw new TypeError(
        "cannot set size without setting maxSize or maxEntrySize on cache",
      );
    return 0;
  };
  *#k({ allowStale: t = this.allowStale } = {}) {
    if (this.#a)
      for (
        let n = this.#m;
        !(!this.#B(n) || ((t || !this.#x(n)) && (yield n), n === this.#d));
      )
        n = this.#p[n];
  }
  *#O({ allowStale: t = this.allowStale } = {}) {
    if (this.#a)
      for (
        let n = this.#d;
        !(!this.#B(n) || ((t || !this.#x(n)) && (yield n), n === this.#m));
      )
        n = this.#f[n];
  }
  #B(t) {
    return t !== void 0 && this.#r.get(this.#c[t]) === t;
  }
  *entries() {
    for (const t of this.#k())
      this.#o[t] !== void 0 &&
        this.#c[t] !== void 0 &&
        !this.#g(this.#o[t]) &&
        (yield [this.#c[t], this.#o[t]]);
  }
  *rentries() {
    for (const t of this.#O())
      this.#o[t] !== void 0 &&
        this.#c[t] !== void 0 &&
        !this.#g(this.#o[t]) &&
        (yield [this.#c[t], this.#o[t]]);
  }
  *keys() {
    for (const t of this.#k()) {
      const n = this.#c[t];
      n !== void 0 && !this.#g(this.#o[t]) && (yield n);
    }
  }
  *rkeys() {
    for (const t of this.#O()) {
      const n = this.#c[t];
      n !== void 0 && !this.#g(this.#o[t]) && (yield n);
    }
  }
  *values() {
    for (const t of this.#k())
      this.#o[t] !== void 0 && !this.#g(this.#o[t]) && (yield this.#o[t]);
  }
  *rvalues() {
    for (const t of this.#O())
      this.#o[t] !== void 0 && !this.#g(this.#o[t]) && (yield this.#o[t]);
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  [Symbol.toStringTag] = "LRUCache";
  find(t, n = {}) {
    for (const i of this.#k()) {
      const o = this.#o[i],
        l = this.#g(o) ? o.__staleWhileFetching : o;
      if (l !== void 0 && t(l, this.#c[i], this))
        return this.get(this.#c[i], n);
    }
  }
  forEach(t, n = this) {
    for (const i of this.#k()) {
      const o = this.#o[i],
        l = this.#g(o) ? o.__staleWhileFetching : o;
      l !== void 0 && t.call(n, l, this.#c[i], this);
    }
  }
  rforEach(t, n = this) {
    for (const i of this.#O()) {
      const o = this.#o[i],
        l = this.#g(o) ? o.__staleWhileFetching : o;
      l !== void 0 && t.call(n, l, this.#c[i], this);
    }
  }
  purgeStale() {
    let t = !1;
    for (const n of this.#O({ allowStale: !0 }))
      this.#x(n) && (this.#T(this.#c[n], "expire"), (t = !0));
    return t;
  }
  info(t) {
    const n = this.#r.get(t);
    if (n === void 0) return;
    const i = this.#o[n],
      o = this.#g(i) ? i.__staleWhileFetching : i;
    if (o === void 0) return;
    const l = { value: o };
    if (this.#b && this.#S) {
      const u = this.#b[n],
        d = this.#S[n];
      if (u && d) {
        const f = u - (ai.now() - d);
        ((l.ttl = f), (l.start = Date.now()));
      }
    }
    return (this.#w && (l.size = this.#w[n]), l);
  }
  dump() {
    const t = [];
    for (const n of this.#k({ allowStale: !0 })) {
      const i = this.#c[n],
        o = this.#o[n],
        l = this.#g(o) ? o.__staleWhileFetching : o;
      if (l === void 0 || i === void 0) continue;
      const u = { value: l };
      if (this.#b && this.#S) {
        u.ttl = this.#b[n];
        const d = ai.now() - this.#S[n];
        u.start = Math.floor(Date.now() - d);
      }
      (this.#w && (u.size = this.#w[n]), t.unshift([i, u]));
    }
    return t;
  }
  load(t) {
    this.clear();
    for (const [n, i] of t) {
      if (i.start) {
        const o = Date.now() - i.start;
        i.start = ai.now() - o;
      }
      this.set(n, i.value, i);
    }
  }
  set(t, n, i = {}) {
    if (n === void 0) return (this.delete(t), this);
    const {
      ttl: o = this.ttl,
      start: l,
      noDisposeOnSet: u = this.noDisposeOnSet,
      sizeCalculation: d = this.sizeCalculation,
      status: f,
    } = i;
    let { noUpdateTTL: m = this.noUpdateTTL } = i;
    const g = this.#L(t, n, i.size || 0, d);
    if (this.maxEntrySize && g > this.maxEntrySize)
      return (
        f && ((f.set = "miss"), (f.maxEntrySizeExceeded = !0)),
        this.#T(t, "set"),
        this
      );
    let y = this.#a === 0 ? void 0 : this.#r.get(t);
    if (y === void 0)
      ((y =
        this.#a === 0
          ? this.#m
          : this.#y.length !== 0
            ? this.#y.pop()
            : this.#a === this.#e
              ? this.#N(!1)
              : this.#a),
        (this.#c[y] = t),
        (this.#o[y] = n),
        this.#r.set(t, y),
        (this.#f[this.#m] = y),
        (this.#p[y] = this.#m),
        (this.#m = y),
        this.#a++,
        this.#_(y, g, f),
        f && (f.set = "add"),
        (m = !1));
    else {
      this.#R(y);
      const v = this.#o[y];
      if (n !== v) {
        if (this.#C && this.#g(v)) {
          v.__abortController.abort(new Error("replaced"));
          const { __staleWhileFetching: C } = v;
          C !== void 0 &&
            !u &&
            (this.#E && this.#n?.(C, t, "set"),
            this.#v && this.#h?.push([C, t, "set"]));
        } else
          u ||
            (this.#E && this.#n?.(v, t, "set"),
            this.#v && this.#h?.push([v, t, "set"]));
        if ((this.#j(y), this.#_(y, g, f), (this.#o[y] = n), f)) {
          f.set = "replace";
          const C = v && this.#g(v) ? v.__staleWhileFetching : v;
          C !== void 0 && (f.oldValue = C);
        }
      } else f && (f.set = "update");
    }
    if (
      (o !== 0 && !this.#b && this.#M(),
      this.#b && (m || this.#D(y, o, l), f && this.#I(f, y)),
      !u && this.#v && this.#h)
    ) {
      const v = this.#h;
      let C;
      for (; (C = v?.shift()); ) this.#s?.(...C);
    }
    return this;
  }
  pop() {
    try {
      for (; this.#a; ) {
        const t = this.#o[this.#d];
        if ((this.#N(!0), this.#g(t))) {
          if (t.__staleWhileFetching) return t.__staleWhileFetching;
        } else if (t !== void 0) return t;
      }
    } finally {
      if (this.#v && this.#h) {
        const t = this.#h;
        let n;
        for (; (n = t?.shift()); ) this.#s?.(...n);
      }
    }
  }
  #N(t) {
    const n = this.#d,
      i = this.#c[n],
      o = this.#o[n];
    return (
      this.#C && this.#g(o)
        ? o.__abortController.abort(new Error("evicted"))
        : (this.#E || this.#v) &&
          (this.#E && this.#n?.(o, i, "evict"),
          this.#v && this.#h?.push([o, i, "evict"])),
      this.#j(n),
      t && ((this.#c[n] = void 0), (this.#o[n] = void 0), this.#y.push(n)),
      this.#a === 1
        ? ((this.#d = this.#m = 0), (this.#y.length = 0))
        : (this.#d = this.#f[n]),
      this.#r.delete(i),
      this.#a--,
      n
    );
  }
  has(t, n = {}) {
    const { updateAgeOnHas: i = this.updateAgeOnHas, status: o } = n,
      l = this.#r.get(t);
    if (l !== void 0) {
      const u = this.#o[l];
      if (this.#g(u) && u.__staleWhileFetching === void 0) return !1;
      if (this.#x(l)) o && ((o.has = "stale"), this.#I(o, l));
      else return (i && this.#A(l), o && ((o.has = "hit"), this.#I(o, l)), !0);
    } else o && (o.has = "miss");
    return !1;
  }
  peek(t, n = {}) {
    const { allowStale: i = this.allowStale } = n,
      o = this.#r.get(t);
    if (o === void 0 || (!i && this.#x(o))) return;
    const l = this.#o[o];
    return this.#g(l) ? l.__staleWhileFetching : l;
  }
  #P(t, n, i, o) {
    const l = n === void 0 ? void 0 : this.#o[n];
    if (this.#g(l)) return l;
    const u = new lu(),
      { signal: d } = i;
    d?.addEventListener("abort", () => u.abort(d.reason), { signal: u.signal });
    const f = { signal: u.signal, options: i, context: o },
      m = (S, k = !1) => {
        const { aborted: x } = u.signal,
          M = i.ignoreFetchAbort && S !== void 0;
        if (
          (i.status &&
            (x && !k
              ? ((i.status.fetchAborted = !0),
                (i.status.fetchError = u.signal.reason),
                M && (i.status.fetchAbortIgnored = !0))
              : (i.status.fetchResolved = !0)),
          x && !M && !k)
        )
          return y(u.signal.reason);
        const A = C;
        return (
          this.#o[n] === C &&
            (S === void 0
              ? A.__staleWhileFetching
                ? (this.#o[n] = A.__staleWhileFetching)
                : this.#T(t, "fetch")
              : (i.status && (i.status.fetchUpdated = !0),
                this.set(t, S, f.options))),
          S
        );
      },
      g = (S) => (
        i.status && ((i.status.fetchRejected = !0), (i.status.fetchError = S)),
        y(S)
      ),
      y = (S) => {
        const { aborted: k } = u.signal,
          x = k && i.allowStaleOnFetchAbort,
          M = x || i.allowStaleOnFetchRejection,
          A = M || i.noDeleteOnFetchRejection,
          R = C;
        if (
          (this.#o[n] === C &&
            (!A || R.__staleWhileFetching === void 0
              ? this.#T(t, "fetch")
              : x || (this.#o[n] = R.__staleWhileFetching)),
          M)
        )
          return (
            i.status &&
              R.__staleWhileFetching !== void 0 &&
              (i.status.returnedStale = !0),
            R.__staleWhileFetching
          );
        if (R.__returned === R) throw S;
      },
      v = (S, k) => {
        const x = this.#i?.(t, l, f);
        (x &&
          x instanceof Promise &&
          x.then((M) => S(M === void 0 ? void 0 : M), k),
          u.signal.addEventListener("abort", () => {
            (!i.ignoreFetchAbort || i.allowStaleOnFetchAbort) &&
              (S(void 0), i.allowStaleOnFetchAbort && (S = (M) => m(M, !0)));
          }));
      };
    i.status && (i.status.fetchDispatched = !0);
    const C = new Promise(v).then(m, g),
      E = Object.assign(C, {
        __abortController: u,
        __staleWhileFetching: l,
        __returned: void 0,
      });
    return (
      n === void 0
        ? (this.set(t, E, { ...f.options, status: void 0 }),
          (n = this.#r.get(t)))
        : (this.#o[n] = E),
      E
    );
  }
  #g(t) {
    if (!this.#C) return !1;
    const n = t;
    return (
      !!n &&
      n instanceof Promise &&
      n.hasOwnProperty("__staleWhileFetching") &&
      n.__abortController instanceof lu
    );
  }
  async fetch(t, n = {}) {
    const {
      allowStale: i = this.allowStale,
      updateAgeOnGet: o = this.updateAgeOnGet,
      noDeleteOnStaleGet: l = this.noDeleteOnStaleGet,
      ttl: u = this.ttl,
      noDisposeOnSet: d = this.noDisposeOnSet,
      size: f = 0,
      sizeCalculation: m = this.sizeCalculation,
      noUpdateTTL: g = this.noUpdateTTL,
      noDeleteOnFetchRejection: y = this.noDeleteOnFetchRejection,
      allowStaleOnFetchRejection: v = this.allowStaleOnFetchRejection,
      ignoreFetchAbort: C = this.ignoreFetchAbort,
      allowStaleOnFetchAbort: E = this.allowStaleOnFetchAbort,
      context: S,
      forceRefresh: k = !1,
      status: x,
      signal: M,
    } = n;
    if (!this.#C)
      return (
        x && (x.fetch = "get"),
        this.get(t, {
          allowStale: i,
          updateAgeOnGet: o,
          noDeleteOnStaleGet: l,
          status: x,
        })
      );
    const A = {
      allowStale: i,
      updateAgeOnGet: o,
      noDeleteOnStaleGet: l,
      ttl: u,
      noDisposeOnSet: d,
      size: f,
      sizeCalculation: m,
      noUpdateTTL: g,
      noDeleteOnFetchRejection: y,
      allowStaleOnFetchRejection: v,
      allowStaleOnFetchAbort: E,
      ignoreFetchAbort: C,
      status: x,
      signal: M,
    };
    let R = this.#r.get(t);
    if (R === void 0) {
      x && (x.fetch = "miss");
      const P = this.#P(t, R, A, S);
      return (P.__returned = P);
    } else {
      const P = this.#o[R];
      if (this.#g(P)) {
        const H = i && P.__staleWhileFetching !== void 0;
        return (
          x && ((x.fetch = "inflight"), H && (x.returnedStale = !0)),
          H ? P.__staleWhileFetching : (P.__returned = P)
        );
      }
      const V = this.#x(R);
      if (!k && !V)
        return (
          x && (x.fetch = "hit"),
          this.#R(R),
          o && this.#A(R),
          x && this.#I(x, R),
          P
        );
      const U = this.#P(t, R, A, S),
        B = U.__staleWhileFetching !== void 0 && i;
      return (
        x &&
          ((x.fetch = V ? "stale" : "refresh"),
          B && V && (x.returnedStale = !0)),
        B ? U.__staleWhileFetching : (U.__returned = U)
      );
    }
  }
  async forceFetch(t, n = {}) {
    const i = await this.fetch(t, n);
    if (i === void 0) throw new Error("fetch() returned undefined");
    return i;
  }
  memo(t, n = {}) {
    const i = this.#l;
    if (!i) throw new Error("no memoMethod provided to constructor");
    const { context: o, forceRefresh: l, ...u } = n,
      d = this.get(t, u);
    if (!l && d !== void 0) return d;
    const f = i(t, d, { options: u, context: o });
    return (this.set(t, f, u), f);
  }
  get(t, n = {}) {
    const {
        allowStale: i = this.allowStale,
        updateAgeOnGet: o = this.updateAgeOnGet,
        noDeleteOnStaleGet: l = this.noDeleteOnStaleGet,
        status: u,
      } = n,
      d = this.#r.get(t);
    if (d !== void 0) {
      const f = this.#o[d],
        m = this.#g(f);
      return (
        u && this.#I(u, d),
        this.#x(d)
          ? (u && (u.get = "stale"),
            m
              ? (u &&
                  i &&
                  f.__staleWhileFetching !== void 0 &&
                  (u.returnedStale = !0),
                i ? f.__staleWhileFetching : void 0)
              : (l || this.#T(t, "expire"),
                u && i && (u.returnedStale = !0),
                i ? f : void 0))
          : (u && (u.get = "hit"),
            m ? f.__staleWhileFetching : (this.#R(d), o && this.#A(d), f))
      );
    } else u && (u.get = "miss");
  }
  #$(t, n) {
    ((this.#p[n] = t), (this.#f[t] = n));
  }
  #R(t) {
    t !== this.#m &&
      (t === this.#d ? (this.#d = this.#f[t]) : this.#$(this.#p[t], this.#f[t]),
      this.#$(this.#m, t),
      (this.#m = t));
  }
  delete(t) {
    return this.#T(t, "delete");
  }
  #T(t, n) {
    let i = !1;
    if (this.#a !== 0) {
      const o = this.#r.get(t);
      if (o !== void 0)
        if (((i = !0), this.#a === 1)) this.#z(n);
        else {
          this.#j(o);
          const l = this.#o[o];
          if (
            (this.#g(l)
              ? l.__abortController.abort(new Error("deleted"))
              : (this.#E || this.#v) &&
                (this.#E && this.#n?.(l, t, n),
                this.#v && this.#h?.push([l, t, n])),
            this.#r.delete(t),
            (this.#c[o] = void 0),
            (this.#o[o] = void 0),
            o === this.#m)
          )
            this.#m = this.#p[o];
          else if (o === this.#d) this.#d = this.#f[o];
          else {
            const u = this.#p[o];
            this.#f[u] = this.#f[o];
            const d = this.#f[o];
            this.#p[d] = this.#p[o];
          }
          (this.#a--, this.#y.push(o));
        }
    }
    if (this.#v && this.#h?.length) {
      const o = this.#h;
      let l;
      for (; (l = o?.shift()); ) this.#s?.(...l);
    }
    return i;
  }
  clear() {
    return this.#z("delete");
  }
  #z(t) {
    for (const n of this.#O({ allowStale: !0 })) {
      const i = this.#o[n];
      if (this.#g(i)) i.__abortController.abort(new Error("deleted"));
      else {
        const o = this.#c[n];
        (this.#E && this.#n?.(i, o, t), this.#v && this.#h?.push([i, o, t]));
      }
    }
    if (
      (this.#r.clear(),
      this.#o.fill(void 0),
      this.#c.fill(void 0),
      this.#b && this.#S && (this.#b.fill(0), this.#S.fill(0)),
      this.#w && this.#w.fill(0),
      (this.#d = 0),
      (this.#m = 0),
      (this.#y.length = 0),
      (this.#u = 0),
      (this.#a = 0),
      this.#v && this.#h)
    ) {
      const n = this.#h;
      let i;
      for (; (i = n?.shift()); ) this.#s?.(...i);
    }
  }
}
var lf, $v;
function rN() {
  if ($v) return lf;
  $v = 1;
  var e = function (M) {
    return t(M) && !n(M);
  };
  function t(x) {
    return !!x && typeof x == "object";
  }
  function n(x) {
    var M = Object.prototype.toString.call(x);
    return M === "[object RegExp]" || M === "[object Date]" || l(x);
  }
  var i = typeof Symbol == "function" && Symbol.for,
    o = i ? Symbol.for("react.element") : 60103;
  function l(x) {
    return x.$$typeof === o;
  }
  function u(x) {
    return Array.isArray(x) ? [] : {};
  }
  function d(x, M) {
    return M.clone !== !1 && M.isMergeableObject(x) ? S(u(x), x, M) : x;
  }
  function f(x, M, A) {
    return x.concat(M).map(function (R) {
      return d(R, A);
    });
  }
  function m(x, M) {
    if (!M.customMerge) return S;
    var A = M.customMerge(x);
    return typeof A == "function" ? A : S;
  }
  function g(x) {
    return Object.getOwnPropertySymbols
      ? Object.getOwnPropertySymbols(x).filter(function (M) {
          return Object.propertyIsEnumerable.call(x, M);
        })
      : [];
  }
  function y(x) {
    return Object.keys(x).concat(g(x));
  }
  function v(x, M) {
    try {
      return M in x;
    } catch {
      return !1;
    }
  }
  function C(x, M) {
    return (
      v(x, M) &&
      !(
        Object.hasOwnProperty.call(x, M) &&
        Object.propertyIsEnumerable.call(x, M)
      )
    );
  }
  function E(x, M, A) {
    var R = {};
    return (
      A.isMergeableObject(x) &&
        y(x).forEach(function (P) {
          R[P] = d(x[P], A);
        }),
      y(M).forEach(function (P) {
        C(x, P) ||
          (v(x, P) && A.isMergeableObject(M[P])
            ? (R[P] = m(P, A)(x[P], M[P], A))
            : (R[P] = d(M[P], A)));
      }),
      R
    );
  }
  function S(x, M, A) {
    ((A = A || {}),
      (A.arrayMerge = A.arrayMerge || f),
      (A.isMergeableObject = A.isMergeableObject || e),
      (A.cloneUnlessOtherwiseSpecified = d));
    var R = Array.isArray(M),
      P = Array.isArray(x),
      V = R === P;
    return V ? (R ? A.arrayMerge(x, M, A) : E(x, M, A)) : d(M, A);
  }
  S.all = function (M, A) {
    if (!Array.isArray(M)) throw new Error("first argument should be an array");
    return M.reduce(function (R, P) {
      return S(R, P, A);
    }, {});
  };
  var k = S;
  return ((lf = k), lf);
}
rN();
var sN = {};
q_(sN);
var zv = (e, t) => {
    for (var n = t - 1; n >= 0; ) {
      if (e[n] === "/") return n;
      n--;
    }
    return -1;
  },
  iN = (e) => {
    var t,
      n = e.lastIndexOf(".css");
    if (n === -1) return "";
    var i = zv(e, n);
    if (((t = e.slice(i + 1, n)), i === -1)) return t;
    var o = zv(e, i - 1),
      l = e.slice(o + 1, i),
      u = t !== "index" ? t : l;
    return u;
  },
  oN = () => {
    var e = new Wh({ max: 500 });
    return (t) => {
      var n = e.get(t);
      if (n) return n;
      var i = iN(t);
      return (e.set(t, i), i);
    };
  };
oN();
function aN(e, t) {
  return Vh(e, (n, i) => {
    var o = typeof t == "function" ? t(n, i) : n,
      l = typeof o == "string" ? o.replace(/^--/, "") : null;
    if (typeof l != "string" || l !== G_(l, { isIdentifier: !0 }))
      throw new Error(
        'Invalid variable name for "'.concat(i.join("."), '": ').concat(l),
      );
    return "var(--".concat(l, ")");
  });
}
var sE = (e) => {
    throw TypeError(e);
  },
  lN = (e, t, n) => t.has(e) || sE("Cannot " + n),
  as = (e, t, n) => (
    lN(e, t, "read from private field"),
    n ? n.call(e) : t.get(e)
  ),
  ls = (e, t, n) =>
    t.has(e)
      ? sE("Cannot add the same private member more than once")
      : t instanceof WeakSet
        ? t.add(e)
        : t.set(e, n);
function iE() {
  const e = new Map();
  return {
    getItem(t) {
      return e.get(t);
    },
    setItem(t, n) {
      e.set(t, n);
    },
    removeItem(t) {
      e.delete(t);
    },
  };
}
var uN = "Sui Wallet",
  cN = typeof window < "u" && window.localStorage ? localStorage : iE(),
  dN = "sui-dapp-kit:wallet-connection-info",
  fN = ["sui:signTransaction", "sui:signTransactionBlock"],
  Hh = (e) => fN.some((t) => e.features[t]),
  oE = [uN, Q0],
  ta = {
    all: { baseScope: "wallet" },
    connectWallet: us("connect-wallet"),
    autoconnectWallet: us("autoconnect-wallet"),
    disconnectWallet: us("disconnect-wallet"),
    signPersonalMessage: us("sign-personal-message"),
    signTransaction: us("sign-transaction"),
    signAndExecuteTransaction: us("sign-and-execute-transaction"),
    switchAccount: us("switch-account"),
  };
function us(e) {
  return function (n = []) {
    return [{ ...ta.all, baseEntity: e }, ...n];
  };
}
var aE = w.createContext(null);
function xt(e) {
  const t = w.useContext(aE);
  if (!t)
    throw new Error(
      "Could not find WalletContext. Ensure that you have set up the WalletProvider.",
    );
  return rA(t, e);
}
function lE({ mutationKey: e, ...t } = {}) {
  const n = xt((o) => o.setWalletConnected),
    i = xt((o) => o.setConnectionStatus);
  return bu({
    mutationKey: ta.connectWallet(e),
    mutationFn: async ({ wallet: o, accountAddress: l, ...u }) => {
      try {
        i("connecting");
        const d = await o.features["standard:connect"].connect(u);
        let f = d.supportedIntents;
        !f &&
          o.features["sui:getCapabilities"] &&
          (f =
            (await o.features["sui:getCapabilities"].getCapabilities())
              .supportedIntents ?? []);
        const m = d.accounts.filter((y) =>
            y.chains.some((v) => v.split(":")[0] === "sui"),
          ),
          g = hN(m, l);
        return (n(o, m, g, f), { accounts: m });
      } catch (d) {
        throw (i("disconnected"), d);
      }
    },
    ...t,
  });
}
function hN(e, t) {
  return e.length === 0
    ? null
    : t
      ? (e.find((i) => i.address === t) ?? e[0])
      : e[0];
}
function uE() {
  return xt((e) => e.wallets);
}
function Fl(e, t) {
  const o = vu()
    .get()
    .filter((l) => HI(l) && (!t || t(l)));
  return [
    ...e.map((l) => o.find((u) => u.name === l)).filter(Boolean),
    ...o.filter((l) => !e.includes(l.name)),
  ];
}
function ys(e) {
  return e?.id ?? e?.name;
}
function pN(e) {
  return O.jsx("svg", {
    width: 24,
    height: 24,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...e,
    children: O.jsx("path", {
      d: "M7.57 12.262c0 .341.13.629.403.895l5.175 5.059c.204.205.45.307.751.307.609 0 1.101-.485 1.101-1.087 0-.293-.123-.574-.349-.8L10.14 12.27l4.511-4.375A1.13 1.13 0 0 0 15 7.087C15 6.485 14.508 6 13.9 6c-.295 0-.54.103-.752.308l-5.175 5.058c-.28.28-.404.56-.404.896Z",
      fill: "currentColor",
    }),
  });
}
function mN(e) {
  return O.jsx("svg", {
    width: 10,
    height: 10,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...e,
    children: O.jsx("path", {
      d: "M9.708.292a.999.999 0 0 0-1.413 0l-3.289 3.29L1.717.291A.999.999 0 0 0 .305 1.705l3.289 3.289-3.29 3.289a.999.999 0 1 0 1.413 1.412l3.29-3.289 3.288 3.29a.999.999 0 0 0 1.413-1.413l-3.29-3.29 3.29-3.288a.999.999 0 0 0 0-1.413Z",
      fill: "currentColor",
    }),
  });
}
var cE = "data-dapp-kit",
  gN = `[${cE}]`,
  yN = { [cE]: "" },
  Ho = w.forwardRef(({ children: e, ...t }, n) =>
    O.jsx(Yo, { ref: n, ...t, ...yN, children: e }),
  );
Ho.displayName = "StyleMarker";
var vN = Eh({
    defaultClassName: "Heading__1aa835k0",
    variantClassNames: {
      size: {
        sm: "Heading_headingVariants_size_sm__1aa835k1",
        md: "Heading_headingVariants_size_md__1aa835k2",
        lg: "Heading_headingVariants_size_lg__1aa835k3",
        xl: "Heading_headingVariants_size_xl__1aa835k4",
      },
      weight: {
        normal: "Heading_headingVariants_weight_normal__1aa835k5",
        bold: "Heading_headingVariants_weight_bold__1aa835k6",
      },
      truncate: { true: "Heading_headingVariants_truncate_true__1aa835k7" },
    },
    defaultVariants: { size: "lg", weight: "bold" },
    compoundVariants: [],
  }),
  Is = w.forwardRef(
    (
      {
        children: e,
        className: t,
        asChild: n = !1,
        as: i = "h1",
        size: o,
        weight: l,
        truncate: u,
        ...d
      },
      f,
    ) =>
      O.jsx(Yo, {
        ...d,
        ref: f,
        className: nr(vN({ size: o, weight: l, truncate: u }), t),
        children: n ? e : O.jsx(i, { children: e }),
      }),
  );
Is.displayName = "Heading";
var wN = "IconButton_container__s6n7bq0",
  Ff = w.forwardRef(({ className: e, asChild: t = !1, ...n }, i) => {
    const o = t ? Yo : "button";
    return O.jsx(o, { ...n, className: nr(wN, e), ref: i });
  });
Ff.displayName = "Button";
var bN = "ConnectModal_backButtonContainer__gz8z96",
  SN = "ConnectModal_closeButtonContainer__gz8z97",
  EN = "ConnectModal_content__gz8z92",
  xN = "ConnectModal_overlay__gz8z90",
  CN = "ConnectModal_selectedViewContainer__gz8z95",
  kN = "ConnectModal_title__gz8z91",
  ON = "ConnectModal_viewContainer__gz8z94",
  TN = "ConnectModal_walletListContainer__gz8z99",
  IN = "ConnectModal_walletListContainerWithViewSelected__gz8z9a",
  MN = "ConnectModal_walletListContent__gz8z98",
  AN = "ConnectModal_whatIsAWalletButton__gz8z93",
  jN = Eh({
    defaultClassName: "Button_buttonVariants__x1s81q0",
    variantClassNames: {
      variant: {
        primary: "Button_buttonVariants_variant_primary__x1s81q1",
        outline: "Button_buttonVariants_variant_outline__x1s81q2",
      },
      size: {
        md: "Button_buttonVariants_size_md__x1s81q3",
        lg: "Button_buttonVariants_size_lg__x1s81q4",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
    compoundVariants: [],
  }),
  na = w.forwardRef(
    ({ className: e, variant: t, size: n, asChild: i = !1, ...o }, l) => {
      const u = i ? Yo : "button";
      return O.jsx(u, {
        ...o,
        className: nr(jN({ variant: t, size: n }), e),
        ref: l,
      });
    },
  );
na.displayName = "Button";
var RN = Eh({
    defaultClassName: "Text__2bv1ur0",
    variantClassNames: {
      size: { sm: "Text_textVariants_size_sm__2bv1ur1" },
      weight: {
        normal: "Text_textVariants_weight_normal__2bv1ur2",
        medium: "Text_textVariants_weight_medium__2bv1ur3",
        bold: "Text_textVariants_weight_bold__2bv1ur4",
      },
      color: {
        muted: "Text_textVariants_color_muted__2bv1ur5",
        danger: "Text_textVariants_color_danger__2bv1ur6",
      },
      mono: { true: "Text_textVariants_mono_true__2bv1ur7" },
    },
    defaultVariants: { size: "sm", weight: "normal" },
    compoundVariants: [],
  }),
  ki = w.forwardRef(
    (
      {
        children: e,
        className: t,
        asChild: n = !1,
        as: i = "div",
        size: o,
        weight: l,
        color: u,
        mono: d,
        ...f
      },
      m,
    ) =>
      O.jsx(Yo, {
        ...f,
        ref: m,
        className: nr(RN({ size: o, weight: l, color: u, mono: d }), t),
        children: n ? e : O.jsx(i, { children: e }),
      }),
  );
ki.displayName = "Text";
var _N = "ConnectionStatus_connectionStatus__nckm2d3",
  NN = "ConnectionStatus_container__nckm2d0",
  PN = "ConnectionStatus_retryButtonContainer__nckm2d4",
  DN = "ConnectionStatus_title__nckm2d2",
  LN = "ConnectionStatus_walletIcon__nckm2d1";
function BN({
  selectedWallet: e,
  hadConnectionError: t,
  onRetryConnection: n,
}) {
  return O.jsxs("div", {
    className: NN,
    children: [
      e.icon &&
        O.jsx("img", { className: LN, src: e.icon, alt: `${e.name} logo` }),
      O.jsx("div", {
        className: DN,
        children: O.jsxs(Is, {
          as: "h2",
          size: "xl",
          children: ["Opening ", e.name],
        }),
      }),
      O.jsx("div", {
        className: _N,
        children: t
          ? O.jsx(ki, { color: "danger", children: "Connection failed" })
          : O.jsx(ki, {
              color: "muted",
              children: "Confirm connection in the wallet...",
            }),
      }),
      t
        ? O.jsx("div", {
            className: PN,
            children: O.jsx(na, {
              type: "button",
              variant: "outline",
              onClick: () => n(e),
              children: "Retry Connection",
            }),
          })
        : null,
    ],
  });
}
var $N = "InfoSection_container__1wtioi70";
function _o({ title: e, children: t }) {
  return O.jsxs("section", {
    className: $N,
    children: [
      O.jsx(Is, { as: "h3", size: "sm", weight: "normal", children: e }),
      O.jsx(ki, { weight: "medium", color: "muted", children: t }),
    ],
  });
}
var zN = "GettingStarted_container__1fp07e10",
  FN = "GettingStarted_content__1fp07e11",
  UN = "GettingStarted_installButtonContainer__1fp07e12";
function VN() {
  return O.jsxs("div", {
    className: zN,
    children: [
      O.jsx(Is, { as: "h2", children: "Get Started with Sui" }),
      O.jsxs("div", {
        className: FN,
        children: [
          O.jsx(_o, {
            title: "Install the Slush Extension",
            children:
              "We recommend pinning Slush to your taskbar for quicker access.",
          }),
          O.jsx(_o, {
            title: "Create or Import a Wallet",
            children:
              "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          }),
          O.jsx(_o, {
            title: "Refresh Your Browser",
            children:
              "Once you set up your wallet, refresh this window browser to load up the extension.",
          }),
          O.jsx("div", {
            className: UN,
            children: O.jsx(na, {
              variant: "outline",
              asChild: !0,
              children: O.jsx("a", {
                href: "https://chromewebstore.google.com/detail/slush-%E2%80%94-a-sui-wallet/opcgpfmipidbgpenhmajoajpbobppdi",
                target: "_blank",
                rel: "noreferrer",
                children: "Install Wallet Extension",
              }),
            }),
          }),
        ],
      }),
    ],
  });
}
var WN = "WhatIsAWallet_container__1ktpkq90",
  HN = "WhatIsAWallet_content__1ktpkq91";
function Fv() {
  return O.jsxs("div", {
    className: WN,
    children: [
      O.jsx(Is, { as: "h2", children: "What is a Wallet" }),
      O.jsxs("div", {
        className: HN,
        children: [
          O.jsx(_o, {
            title: "Easy Login",
            children:
              "No need to create new accounts and passwords for every website. Just connect your wallet and get going.",
          }),
          O.jsx(_o, {
            title: "Store your Digital Assets",
            children:
              "Send, receive, store, and display your digital assets like NFTs & coins.",
          }),
        ],
      }),
    ],
  });
}
var KN = "WalletList_container__1v2s6cz0",
  GN = "WalletListItem_container__1dqqtqs0",
  qN = "WalletListItem_selectedWalletItem__1dqqtqs2",
  QN = "WalletListItem_walletIcon__1dqqtqs3",
  YN = "WalletListItem_walletItem__1dqqtqs1";
function Uv({ name: e, icon: t, onClick: n, isSelected: i = !1 }) {
  return O.jsx("li", {
    className: GN,
    children: O.jsxs("button", {
      className: nr(YN, { [qN]: i }),
      type: "button",
      onClick: n,
      children: [
        t && typeof t == "string"
          ? O.jsx("img", { className: QN, src: t, alt: `${e} logo` })
          : t,
        O.jsx(Is, {
          size: "md",
          truncate: !0,
          asChild: !0,
          children: O.jsx("div", { children: e }),
        }),
      ],
    }),
  });
}
function XN({
  selectedWalletName: e,
  onPlaceholderClick: t,
  onSelect: n,
  wallets: i,
}) {
  return O.jsx("ul", {
    className: KN,
    children:
      i.length > 0
        ? i.map((o) =>
            O.jsx(
              Uv,
              {
                name: o.name,
                icon: o.icon,
                isSelected: ys(o) === e,
                onClick: () => n(o),
              },
              ys(o),
            ),
          )
        : O.jsx(Uv, { name: Q0, icon: Y0, onClick: t, isSelected: !0 }),
  });
}
function ZN({
  trigger: e,
  open: t,
  defaultOpen: n,
  onOpenChange: i,
  walletFilter: o = Hh,
}) {
  const [l, u] = w.useState(t ?? n),
    [d, f] = w.useState(),
    [m, g] = w.useState(),
    y = uE().filter(o),
    { mutate: v, isError: C } = lE(),
    E = () => {
      (g(void 0), f(void 0));
    },
    S = (M) => {
      (M || E(), u(M), i?.(M));
    },
    k = (M) => {
      (f("connection-status"), v({ wallet: M }, { onSuccess: () => S(!1) }));
    };
  let x;
  switch (d) {
    case "what-is-a-wallet":
      x = O.jsx(Fv, {});
      break;
    case "getting-started":
      x = O.jsx(VN, {});
      break;
    case "connection-status":
      x = O.jsx(BN, {
        selectedWallet: m,
        hadConnectionError: C,
        onRetryConnection: k,
      });
      break;
    default:
      x = O.jsx(Fv, {});
  }
  return O.jsxs(kk, {
    open: t ?? l,
    onOpenChange: S,
    children: [
      O.jsx(Ok, { asChild: !0, children: e }),
      O.jsx(Tk, {
        children: O.jsx(Ho, {
          children: O.jsx(Ik, {
            className: xN,
            children: O.jsxs(Mk, {
              className: EN,
              "aria-describedby": void 0,
              children: [
                O.jsxs("div", {
                  className: nr(TN, { [IN]: !!d }),
                  children: [
                    O.jsxs("div", {
                      className: MN,
                      children: [
                        O.jsx(Ak, {
                          className: kN,
                          asChild: !0,
                          children: O.jsx(Is, {
                            as: "h2",
                            children: "Connect a Wallet",
                          }),
                        }),
                        O.jsx(XN, {
                          wallets: y,
                          selectedWalletName: ys(m),
                          onPlaceholderClick: () => f("getting-started"),
                          onSelect: (M) => {
                            ys(m) !== ys(M) && (g(M), k(M));
                          },
                        }),
                      ],
                    }),
                    O.jsx("button", {
                      className: AN,
                      onClick: () => f("what-is-a-wallet"),
                      type: "button",
                      children: "What is a Wallet?",
                    }),
                  ],
                }),
                O.jsxs("div", {
                  className: nr(ON, { [CN]: !!d }),
                  children: [
                    O.jsx("div", {
                      className: bN,
                      children: O.jsx(Ff, {
                        type: "button",
                        "aria-label": "Back",
                        onClick: () => E(),
                        children: O.jsx(pN, {}),
                      }),
                    }),
                    x,
                  ],
                }),
                O.jsx(jk, {
                  className: SN,
                  asChild: !0,
                  children: O.jsx(Ff, {
                    type: "button",
                    "aria-label": "Close",
                    children: O.jsx(mN, {}),
                  }),
                }),
              ],
            }),
          }),
        }),
      }),
    ],
  });
}
function ju() {
  return xt((e) => e.currentAccount);
}
var dE = w.createContext(null),
  JN = { localnet: { url: Ll("localnet") } },
  eP = function (t, n) {
    return NR(n) ? n : new AS(n);
  };
function tP(e) {
  const { onNetworkChange: t, network: n, children: i } = e,
    o = e.networks ?? JN,
    l = e.createClient ?? eP,
    [u, d] = w.useState(e.network ?? e.defaultNetwork ?? Object.keys(o)[0]),
    f = e.network ?? u,
    m = w.useMemo(() => l(f, o[f]), [l, f, o]),
    g = w.useMemo(
      () => ({
        client: m,
        networks: o,
        network: f,
        config: o[f] instanceof AS ? null : o[f],
        selectNetwork: (y) => {
          f !== y && (!n && y !== u && d(y), t?.(y));
        },
      }),
      [m, o, u, f, n, t],
    );
  return O.jsx(dE.Provider, { value: g, children: i });
}
function Ru() {
  const e = w.useContext(dE);
  if (!e)
    throw new Error(
      "Could not find SuiClientContext. Ensure that you have set up the SuiClientProvider",
    );
  return e;
}
function fE() {
  return Ru().client;
}
function nP(...e) {
  const [t, n, { queryKey: i = [], ...o } = {}] = e,
    l = Ru();
  return lb({
    ...o,
    queryKey: [l.network, t, n, ...i],
    queryFn: async () => await l.client[t](n),
  });
}
function hE(e, t) {
  return nP(
    "resolveNameServiceNames",
    { address: e, limit: 1 },
    {
      ...t,
      refetchOnWindowFocus: !1,
      retry: !1,
      select: (n) => (n.data.length > 0 ? n.data[0] : null),
      enabled: !!e && t?.enabled !== !1,
    },
  );
}
function rP() {
  return xt((e) => e.accounts);
}
var Kh = class extends Error {},
  sP = class extends Error {},
  iP = class extends Error {},
  oP = class extends Error {};
function ra() {
  const e = xt((i) => i.currentWallet),
    t = xt((i) => i.connectionStatus),
    n = xt((i) => i.supportedIntents);
  switch (t) {
    case "connecting":
      return {
        connectionStatus: t,
        currentWallet: null,
        isDisconnected: !1,
        isConnecting: !0,
        isConnected: !1,
        supportedIntents: [],
      };
    case "disconnected":
      return {
        connectionStatus: t,
        currentWallet: null,
        isDisconnected: !0,
        isConnecting: !1,
        isConnected: !1,
        supportedIntents: [],
      };
    case "connected":
      return {
        connectionStatus: t,
        currentWallet: e,
        isDisconnected: !1,
        isConnecting: !1,
        isConnected: !0,
        supportedIntents: n,
      };
  }
}
function aP({ mutationKey: e, ...t } = {}) {
  const { currentWallet: n } = ra(),
    i = xt((o) => o.setWalletDisconnected);
  return bu({
    mutationKey: ta.disconnectWallet(e),
    mutationFn: async () => {
      if (!n) throw new Kh("No wallet is connected.");
      try {
        await n.features["standard:disconnect"]?.disconnect();
      } catch (o) {
        console.error(
          "Failed to disconnect the application from the current wallet.",
          o,
        );
      }
      i();
    },
    ...t,
  });
}
function lP({ mutationKey: e, ...t } = {}) {
  const { currentWallet: n } = ra(),
    i = xt((o) => o.setAccountSwitched);
  return bu({
    mutationKey: ta.switchAccount(e),
    mutationFn: async ({ account: o }) => {
      if (!n) throw new Kh("No wallet is connected.");
      const l = n.accounts.find((u) => u.address === o.address);
      if (!l)
        throw new oP(
          `No account with address ${o.address} is connected to ${n.name}.`,
        );
      i(l);
    },
    ...t,
  });
}
var uP = "AccountDropdownMenu_connectedAccount__div2ql0",
  cP = "AccountDropdownMenu_menuContainer__div2ql1",
  dP = "AccountDropdownMenu_menuContent__div2ql2",
  pE = "AccountDropdownMenu_menuItem__div2ql3",
  fP = "AccountDropdownMenu_separator__div2ql5",
  hP = "AccountDropdownMenu_switchAccountMenuItem__div2ql4";
function pP(e) {
  return O.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: 16,
    height: 16,
    fill: "none",
    ...e,
    children: O.jsx("path", {
      fill: "currentColor",
      d: "m11.726 5.048-4.73 5.156-1.722-1.879a.72.72 0 0 0-.529-.23.722.722 0 0 0-.525.24.858.858 0 0 0-.22.573.86.86 0 0 0 .211.576l2.255 2.458c.14.153.332.24.53.24.2 0 .391-.087.532-.24l5.261-5.735A.86.86 0 0 0 13 5.63a.858.858 0 0 0-.22-.572.722.722 0 0 0-.525-.24.72.72 0 0 0-.529.23Z",
    }),
  });
}
function mP(e) {
  return O.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: 16,
    height: 16,
    fill: "none",
    ...e,
    children: O.jsx("path", {
      stroke: "#A0B6C3",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 1.5,
      d: "m4 6 4 4 4-4",
    }),
  });
}
function gP({ currentAccount: e }) {
  const { mutate: t } = aP(),
    { data: n } = hE(e.label ? null : e.address),
    i = rP();
  return O.jsxs(nR, {
    modal: !1,
    children: [
      O.jsx(Ho, {
        children: O.jsx(rR, {
          asChild: !0,
          children: O.jsxs(na, {
            size: "lg",
            className: uP,
            children: [
              O.jsx(ki, {
                mono: !0,
                weight: "bold",
                children: e.label ?? n ?? _0(e.address),
              }),
              O.jsx(mP, {}),
            ],
          }),
        }),
      }),
      O.jsx(sR, {
        children: O.jsx(Ho, {
          className: cP,
          children: O.jsxs(iR, {
            className: dP,
            children: [
              i.map((o) =>
                O.jsx(
                  yP,
                  { account: o, active: e.address === o.address },
                  o.address,
                ),
              ),
              O.jsx(oR, { className: fP }),
              O.jsx(SS, {
                className: nr(pE),
                onSelect: () => t(),
                children: "Disconnect",
              }),
            ],
          }),
        }),
      }),
    ],
  });
}
function yP({ account: e, active: t }) {
  const { mutate: n } = lP(),
    { data: i } = hE(e.label ? null : e.address);
  return O.jsxs(SS, {
    className: nr(pE, hP),
    onSelect: () => n({ account: e }),
    children: [
      O.jsx(ki, { mono: !0, children: e.label ?? i ?? _0(e.address) }),
      t ? O.jsx(pP, {}) : null,
    ],
  });
}
function vP({ connectText: e = "Connect Wallet", walletFilter: t, ...n }) {
  const i = ju();
  return i
    ? O.jsx(gP, { currentAccount: i })
    : O.jsx(ZN, {
        walletFilter: t,
        trigger: O.jsx(Ho, { children: O.jsx(na, { ...n, children: e }) }),
      });
}
function wP() {
  const { mutateAsync: e } = lE(),
    t = xt((y) => y.autoConnectEnabled),
    n = xt((y) => y.lastConnectedWalletName),
    i = xt((y) => y.lastConnectedAccountAddress),
    o = uE(),
    { isConnected: l } = ra(),
    [u, d] = w.useState(!1);
  (typeof window < "u" ? w.useLayoutEffect : w.useEffect)(() => {
    d(!0);
  }, []);
  const { data: m, isError: g } = lb({
    queryKey: [
      "@mysten/dapp-kit",
      "autoconnect",
      {
        isConnected: l,
        autoConnectEnabled: t,
        lastConnectedWalletName: n,
        lastConnectedAccountAddress: i,
        walletCount: o.length,
      },
    ],
    queryFn: async () => {
      if (!t) return "disabled";
      if (!n || !i || l) return "attempted";
      const y = o.find((v) => ys(v) === n);
      return (
        y && (await e({ wallet: y, accountAddress: i, silent: !0 })),
        "attempted"
      );
    },
    enabled: t,
    persister: void 0,
    gcTime: 0,
    staleTime: 0,
    networkMode: "always",
    retry: !1,
    retryOnMount: !1,
    refetchInterval: !1,
    refetchIntervalInBackground: !1,
    refetchOnMount: !1,
    refetchOnReconnect: !1,
    refetchOnWindowFocus: !1,
  });
  return t
    ? u
      ? l || !n || g
        ? "attempted"
        : (m ?? "idle")
      : "idle"
    : "disabled";
}
function bP(e) {
  (typeof window < "u" ? w.useLayoutEffect : w.useEffect)(() => {
    if (!e?.name) return;
    let n,
      i = !0;
    try {
      const o = vM(e.name, { origin: e.origin });
      i && o ? (n = o.unregister) : o && o.unregister();
    } catch (o) {
      console.error("Failed to register Slush wallet:", o);
    }
    return () => {
      ((i = !1), n && n());
    };
  }, [e?.name, e?.origin]);
}
var Vv = "Unsafe Burner Wallet";
function SP(e) {
  const t = fE();
  w.useEffect(() => (e ? EP(t) : void 0), [e, t]);
}
function EP(e) {
  var t, n, i, o, l, u, d;
  const f = vu();
  if (f.get().find((C) => C.name === Vv)) {
    console.warn(
      "registerUnsafeBurnerWallet: Unsafe Burner Wallet already registered, skipping duplicate registration.",
    );
    return;
  }
  console.warn(
    "Your application is currently using the unsafe burner wallet. Make sure that this wallet is disabled in production.",
  );
  const g = new z_(),
    y = new wu({
      address: g.getPublicKey().toSuiAddress(),
      publicKey: g.getPublicKey().toSuiBytes(),
      chains: ["sui:unknown"],
      features: [
        "sui:signAndExecuteTransactionBlock",
        "sui:signTransactionBlock",
        "sui:signTransaction",
        "sui:signAndExecuteTransaction",
      ],
    });
  class v {
    constructor() {
      (ls(this, t, () => () => {}),
        ls(this, n, async () => ({ accounts: this.accounts })),
        ls(this, i, async (E) => {
          const { bytes: S, signature: k } = await g.signPersonalMessage(
            E.message,
          );
          return { bytes: S, signature: k };
        }),
        ls(this, o, async (E) => {
          const { bytes: S, signature: k } = await E.transactionBlock.sign({
            client: e,
            signer: g,
          });
          return { transactionBlockBytes: S, signature: k };
        }),
        ls(this, l, async (E) => {
          const { bytes: S, signature: k } = await zo
            .from(await E.transaction.toJSON())
            .sign({ client: e, signer: g });
          return (E.signal?.throwIfAborted(), { bytes: S, signature: k });
        }),
        ls(this, u, async (E) => {
          const { bytes: S, signature: k } = await E.transactionBlock.sign({
            client: e,
            signer: g,
          });
          return e.executeTransactionBlock({
            signature: k,
            transactionBlock: S,
            options: E.options,
          });
        }),
        ls(this, d, async (E) => {
          const { bytes: S, signature: k } = await zo
            .from(await E.transaction.toJSON())
            .sign({ client: e, signer: g });
          E.signal?.throwIfAborted();
          const { rawEffects: x, digest: M } = await e.executeTransactionBlock({
            signature: k,
            transactionBlock: S,
            options: { showRawEffects: !0 },
          });
          return {
            bytes: S,
            signature: k,
            digest: M,
            effects: ze(new Uint8Array(x)),
          };
        }));
    }
    get version() {
      return "1.0.0";
    }
    get name() {
      return Vv;
    }
    get icon() {
      return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAJrElEQVR42tWbe2xT1x3H7UxAyD3XrdrSbGXlUbKWsq5rWdVuVOMRSEqSOmnVRZMmJqZNYv1nf3R/jWmVmVrtRRM/YwPd1nVTNcrE3pQCoikrIRAC4VVNY0hlD9ZOo1uCfe3ra9979v0dcy3s5Pper76Oh/STE+495/4+5/c85zqe2f7HAx5vKsS+monJj/CdHi/f4/HWW4f6AwdblmXjTM0NyS+movKtw9v+j6C5gKhyTMTTpA2x15Qwy+Pz75motOGdgKep8WF5ATgVZIt5NeO2wMqD0hfVGNPh3oYaYflsjG0l63PeyLCDnqbsLpZIhaRNFI+Ox+Le5KB0RybK8gDmJOkI07U4i/FhT1NDQl8Me5rUIfaDfELOJ0NsFa/SJQHm1WLsHcDqRWiy9BCL8s0N5t6UWWFVvxplejYm60hC91cNjPtzCTZsAptCVoeLP8PDDQJNCSodap6H+LtE8ZcdkvVkkD38vwDn4/Jvy4EhBhZSvRaUHiTXn31gJJxkUPoClBKKFizM+inhVA2cYIdM4HJouPvoe9s9H+KzDhyGK6KkmIqitBhww2C11rjQL2L4kgUwFxk8yPyzauUA3Pk/353XnA6zKbKCaQ2UlMvJF6W5uF5F8yHfZWZpC9HRmBziaEpm1bpY9XvhxuWJRldC7Mt03WlZwpjnkZUNa2DMG2EaPj9MGd2l2mofd0hQ7ZSopsXckHxVCUp32fXGdD0ZktrgFUmMqwhcWFjp87RArsD+9bn585IRaSHAKgBL3SZwOTRc8BKg7yYoskp5OJDiiPmF2Sj7ox0siYJ7lJA04EqvzZ9B1xSVt6PlW0IxZgUMJdZYAJuWngLQt9IRuZXmoTEkmci8ZtTXTViUKyasA9FRun5d8z6bfw0gYWm9mmCXxZatQgxfC7I2NVpRYQOxKWppLs4mcgn5NcibgL1K40xYp8CYY5TXEpjcb3LAJ0OZyyg3+2nySm6fjEtzkEz+7VBx3RTb+60z9dma7pkvwO2QQL5HzTtAdpKF7euw/HuzfrosBHy+ZsBimzbQshjWTVMDgez53B5MbjcGbr1ZjdUJOM5O0SLXzJ2R+uOA1dMAVoLsm5zb73JSId8t8Aa1LsAJdoTCrCaw6e3NC2DdFMUXWRg173mysJNOSUNskUJ1cOlXa2LhcbgmSszXYSn9hl3KSxTDjrZ2cbbfbWDyumsh9m3e7zCG7a3ETt+gtI7fx6lEOanZKDVvuA2cjYmt5xNOd2Louz3IQ12UZ2Zo3lkb9cDlvSs6m4Vk5Yqlabs0B97wT7PUuCXQz0Bnt9QxMPTW4iwBtmUlY8hFsHJPlzcQ1xuG75CVK1kXofCUGnU9fg1aVD7kfE9MoabtYkcAvIUYS2op3Hc3TTrDQzIAeojugTVLFolWDR6wFPtY0R66n6HltwjCIawnE2ymresk9NtN+pfUUi0mX6RJLfrh9zMRaRPOqubSA8W2MNzC0mHpK7j2ruuw5mYkxl5+2+HGQeg4yNYg7vNg+xMxFsuRMuiTsRJZG3cysAl4D9n4aC4un8L9qUyVvbCyYwFXX1nGUxFf1cCiEQqy75O+TpMwYKNKSPQUqhLyyWLsRbESLctx0YnixgfphRWA8pOPc+N4F9d+eV9V4OlCX/As5w5g+wtGhJGukp5go2R3D7EW9rSDcnGL56YgJHj+8GcFND/Vy41jj/H0jxc6HU/AA2QlR01UlH3D7CmITQnJq4lVWBi1yl8XYEh278c5H++F+Iui7r7bYR8tH/gbqoJN7fVODUhLYVVxzmYCEyOxFg7RUVa0egCHZZ55eRHnp/tKgMna6s/bbMdTxZgMzl9CCcmq7k690OzDfaeSN4QcsREjsQpgXHwyWyfg9K5WE7hc6JqTWjyihObfygOFOkv6i5K5TZx8LsL1sVS4NL8ItiB7sgAcEKcWHfUCVhK3kUVnBNbfXIs4l5xAv5sJs234eTUy93L0Au2otQOw5ORMyfQ6WwexFupVSHowG6uThXfebmlhWojMS3fazmMeGxEI6S2SUti6RAo2vKohVuH3qUG5FWm/PjH8kzutgSH5g58xrVwzIbZkxHf7OFjFC+wrMDXcpOqOKX/g01U/XPvVJyxdWsiJblqYmnZoWbDxAcR56X5WPuh4ewcL5PY9JBRUYjc7fzjG6Uc3mHBWbg23X1BLaFHOSnrw4bWiNAXSEWcWRntIignXTP/oDsfKZX66mMbZAPfhviU1AyYmJLYAMZa/QXjUSeIiixpj3UUFtd884KytjN7EjdGNNMbWwtlf3FvbQ4OQtIoYSzbxqVDLXMTxP8jnnbiyKcaJLvueGLD6kXW2sKZov1tpn7hwXf3ZUvq0K2FXOM7Op/Xgb6PhxsWIErYGVuK3WGXWkkwMMZVCVl5kWtax5A6usgemvnx4DelUcYcFC0eIbcbXKzggeyBjeXIhkftaKknJKLtnuSg7KmKQsrH+1nqbmLWY6w/tBGy/8xrruR5SM99LLIjfT/4ZbNZnQEPssIVb21rKTGRIPDagNoLdFMKgcuLc/TF6Bulk6c7ovg4TU+XvS6FNw1tDfVqH9MOPmBDui0hcK6wz744FlDjNe0m3aVldJYagtI6YbF+3ZGPsQHlN1vbeh8lJofqJ+uo9Zi4wXZxKFiXKGxbHT7pNq71oNg4Qi6MviE0FpRVqjGXILYoJ4tCjdYU1rWeMdPLc/ochj3B9pGNGL4NupGPRlUl35KMVxFLNO6ZnxYlBsUPqoMkbUqAb6VhMVKQ7MVT1dYdrL8hzEAcjpmvjHKphgaFb0ZVJZw7dwVD9q5fkgPTRbBxnzmGfgRLQsMCkG+moQdcp6GzzZsL2MGyllvBNGWM9RqMCk26kI7aBK526csVShZTfzid6FEzeiNAGP92jpCPQEbrW7EW5MbZxAz/fN9lg0IbQaaxrQ83/VoKPb/HqJx67Hw+43CDQBPsX0gm6ufXNvH4vP9rZapzx7+Nn+oxZAjfo2caZ3n350c5W6FSEdQ86sNarj3c/jRV+H42AXsdGRBfPPIlnb/mUtxzWXfALn/PmRze2Gud6E/xsXwYtnlsWN8Tc5/oyxjn/jvyJrlY82xLUfWuPr/TqxzuXQZkIP9M7CXiyuP4B4WmsTnNhzinjrD+WO9bRhmdZWLXe4EKRtV5tpN3Hx3s2G+d79/MJf4qff0LnE72kfFEs4ITQvWLMab8C131dP9n9Je1Yx000Nz2jAf+UJwCBchc3NvGR1Qx71XXY2Ww1Jvx7YalzAPkX9rp5E5Z+pv+ja8bE43uN491b9dHO9Xx4lUxziLn21Nai/wXWM6t9vkvtrwAAAABJRU5ErkJggg==";
    }
    get chains() {
      return mh;
    }
    get accounts() {
      return [y];
    }
    get features() {
      return {
        "standard:connect": { version: "1.0.0", connect: as(this, n) },
        "standard:events": { version: "1.0.0", on: as(this, t) },
        "sui:signPersonalMessage": {
          version: "1.1.0",
          signPersonalMessage: as(this, i),
        },
        "sui:signTransactionBlock": {
          version: "1.0.0",
          signTransactionBlock: as(this, o),
        },
        "sui:signAndExecuteTransactionBlock": {
          version: "1.0.0",
          signAndExecuteTransactionBlock: as(this, u),
        },
        "sui:signTransaction": {
          version: "2.0.0",
          signTransaction: as(this, l),
        },
        "sui:signAndExecuteTransaction": {
          version: "2.0.0",
          signAndExecuteTransaction: as(this, d),
        },
      };
    }
  }
  return (
    (t = new WeakMap()),
    (n = new WeakMap()),
    (i = new WeakMap()),
    (o = new WeakMap()),
    (l = new WeakMap()),
    (u = new WeakMap()),
    (d = new WeakMap()),
    f.register(new v())
  );
}
function xP() {
  const { currentWallet: e } = ra(),
    t = xt((n) => n.updateWalletAccounts);
  w.useEffect(
    () =>
      e?.features["standard:events"].on("change", ({ accounts: i }) => {
        i && t(i);
      }),
    [e?.features, t],
  );
}
function CP(e, t) {
  const n = xt((o) => o.setWalletRegistered),
    i = xt((o) => o.setWalletUnregistered);
  w.useEffect(() => {
    const o = vu();
    n(Fl(e, t));
    const l = o.on("register", () => {
        n(Fl(e, t));
      }),
      u = o.on("unregister", (d) => {
        i(Fl(e, t), d);
      });
    return () => {
      (l(), u());
    };
  }, [e, t, n, i]);
}
var kP = {
  blurs: { modalOverlay: "blur(0)" },
  backgroundColors: {
    primaryButton: "#F6F7F9",
    primaryButtonHover: "#F0F2F5",
    outlineButtonHover: "#F4F4F5",
    modalOverlay: "rgba(24 36 53 / 20%)",
    modalPrimary: "white",
    modalSecondary: "#F7F8F8",
    iconButton: "transparent",
    iconButtonHover: "#F0F1F2",
    dropdownMenu: "#FFFFFF",
    dropdownMenuSeparator: "#F3F6F8",
    walletItemSelected: "white",
    walletItemHover: "#3C424226",
  },
  borderColors: { outlineButton: "#E4E4E7" },
  colors: {
    primaryButton: "#373737",
    outlineButton: "#373737",
    iconButton: "#000000",
    body: "#182435",
    bodyMuted: "#767A81",
    bodyDanger: "#FF794B",
  },
  radii: { small: "6px", medium: "8px", large: "12px", xlarge: "16px" },
  shadows: {
    primaryButton: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    walletItemSelected: "0px 2px 6px rgba(0, 0, 0, 0.05)",
  },
  fontWeights: { normal: "400", medium: "500", bold: "600" },
  fontSizes: { small: "14px", medium: "16px", large: "18px", xlarge: "20px" },
  typography: {
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    fontStyle: "normal",
    lineHeight: "1.3",
    letterSpacing: "1",
  },
};
function OP({ wallets: e, storage: t, storageKey: n, autoConnectEnabled: i }) {
  return tA()(
    U_(
      (o, l) => ({
        autoConnectEnabled: i,
        wallets: e,
        accounts: [],
        currentWallet: null,
        currentAccount: null,
        lastConnectedAccountAddress: null,
        lastConnectedWalletName: null,
        connectionStatus: "disconnected",
        supportedIntents: [],
        setConnectionStatus(u) {
          o(() => ({ connectionStatus: u }));
        },
        setWalletConnected(u, d, f, m = []) {
          o(() => ({
            accounts: d,
            currentWallet: u,
            currentAccount: f,
            lastConnectedWalletName: ys(u),
            lastConnectedAccountAddress: f?.address,
            connectionStatus: "connected",
            supportedIntents: m,
          }));
        },
        setWalletDisconnected() {
          o(() => ({
            accounts: [],
            currentWallet: null,
            currentAccount: null,
            lastConnectedWalletName: null,
            lastConnectedAccountAddress: null,
            connectionStatus: "disconnected",
            supportedIntents: [],
          }));
        },
        setAccountSwitched(u) {
          o(() => ({
            currentAccount: u,
            lastConnectedAccountAddress: u.address,
          }));
        },
        setWalletRegistered(u) {
          o(() => ({ wallets: u }));
        },
        setWalletUnregistered(u, d) {
          d === l().currentWallet
            ? o(() => ({
                wallets: u,
                accounts: [],
                currentWallet: null,
                currentAccount: null,
                lastConnectedWalletName: null,
                lastConnectedAccountAddress: null,
                connectionStatus: "disconnected",
                supportedIntents: [],
              }))
            : o(() => ({ wallets: u }));
        },
        updateWalletAccounts(u) {
          const d = l().currentAccount;
          o(() => ({
            accounts: u,
            currentAccount:
              (d && u.find(({ address: f }) => f === d.address)) || u[0],
          }));
        },
      }),
      {
        name: n,
        storage: ZS(() => t),
        partialize: ({
          lastConnectedWalletName: o,
          lastConnectedAccountAddress: l,
        }) => ({ lastConnectedWalletName: o, lastConnectedAccountAddress: l }),
      },
    ),
  );
}
var TP = {
    blurs: { modalOverlay: "" },
    backgroundColors: {
      primaryButton: "",
      primaryButtonHover: "",
      outlineButtonHover: "",
      walletItemHover: "",
      walletItemSelected: "",
      modalOverlay: "",
      modalPrimary: "",
      modalSecondary: "",
      iconButton: "",
      iconButtonHover: "",
      dropdownMenu: "",
      dropdownMenuSeparator: "",
    },
    borderColors: { outlineButton: "" },
    colors: {
      primaryButton: "",
      outlineButton: "",
      body: "",
      bodyMuted: "",
      bodyDanger: "",
      iconButton: "",
    },
    radii: { small: "", medium: "", large: "", xlarge: "" },
    shadows: { primaryButton: "", walletItemSelected: "" },
    fontWeights: { normal: "", medium: "", bold: "" },
    fontSizes: { small: "", medium: "", large: "", xlarge: "" },
    typography: {
      fontFamily: "",
      fontStyle: "",
      lineHeight: "",
      letterSpacing: "",
    },
  },
  IP = aN(TP, (e, t) => `dapp-kit-${t.join("-")}`);
function MP({ theme: e }) {
  const t = Array.isArray(e) ? AP(e) : mE(e);
  return O.jsx("style", {
    precedence: "default",
    href: "mysten-dapp-kit-theme",
    dangerouslySetInnerHTML: { __html: t },
  });
}
function AP(e) {
  return e
    .map(({ mediaQuery: t, selector: n, variables: i }) => {
      const o = mE(i),
        l = n ? `${n} ${o}` : o;
      return t ? `@media ${t}{${l}}` : l;
    })
    .join(" ");
}
function mE(e) {
  return `${gN} {${jP(e)}}`;
}
function jP(e) {
  return Object.entries(W_(IP, e))
    .map(([t, n]) => `${t}:${n};`)
    .join("");
}
function RP({
  preferredWallets: e = oE,
  walletFilter: t = Hh,
  storage: n = cN,
  storageKey: i = dN,
  enableUnsafeBurner: o = !1,
  autoConnect: l = !1,
  slushWallet: u,
  theme: d = kP,
  children: f,
}) {
  const m = w.useRef(
    OP({
      autoConnectEnabled: l,
      wallets: Fl(e, t),
      storage: n || iE(),
      storageKey: i,
    }),
  );
  return O.jsx(aE.Provider, {
    value: m.current,
    children: O.jsxs(_P, {
      preferredWallets: e,
      walletFilter: t,
      enableUnsafeBurner: o,
      slushWallet: u,
      children: [d ? O.jsx(MP, { theme: d }) : null, f],
    }),
  });
}
function _P({
  preferredWallets: e = oE,
  walletFilter: t = Hh,
  enableUnsafeBurner: n = !1,
  slushWallet: i,
  children: o,
}) {
  return (CP(e, t), xP(), bP(i), SP(n), wP(), o);
}
function NP(e) {
  function t() {
    const { config: o } = Ru();
    if (!o) throw new Error("No network config found");
    return o;
  }
  function n() {
    const { variables: o } = t();
    return o ?? {};
  }
  function i(o) {
    return n()[o];
  }
  return {
    networkConfig: e,
    useNetworkConfig: t,
    useNetworkVariables: n,
    useNetworkVariable: i,
  };
}
function PP({ mutationKey: e, execute: t, ...n } = {}) {
  const { currentWallet: i, supportedIntents: o } = ra(),
    l = ju(),
    { client: u, network: d } = Ru(),
    f =
      t ??
      (async ({ bytes: m, signature: g }) => {
        const { digest: y, rawEffects: v } = await u.executeTransactionBlock({
          transactionBlock: m,
          signature: g,
          options: { showRawEffects: !0 },
        });
        return {
          digest: y,
          rawEffects: v,
          effects: ze(new Uint8Array(v)),
          bytes: m,
          signature: g,
        };
      });
  return bu({
    mutationKey: ta.signAndExecuteTransaction(e),
    mutationFn: async ({ transaction: m, ...g }) => {
      if (!i) throw new Kh("No wallet is connected.");
      const y = g.account ?? l;
      if (!y)
        throw new sP(
          "No wallet account is selected to sign the transaction with.",
        );
      if (
        !i.features["sui:signTransaction"] &&
        !i.features["sui:signTransactionBlock"]
      )
        throw new iP(
          "This wallet doesn't support the `signTransaction` feature.",
        );
      typeof m != "string" &&
        "setSenderIfNotSet" in m &&
        m.setSenderIfNotSet(y.address);
      const v = g.chain ?? `sui:${d}`,
        { signature: C, bytes: E } = await NI(i, {
          ...g,
          transaction: {
            async toJSON() {
              return typeof m == "string"
                ? m
                : await m.toJSON({ supportedIntents: o, client: u });
            },
          },
          account: y,
          chain: v,
        });
      return await f({ bytes: E, signature: C });
    },
    ...n,
  });
}
var DP = Object.freeze({
    position: "absolute",
    border: 0,
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    wordWrap: "normal",
  }),
  LP = "VisuallyHidden",
  gE = w.forwardRef((e, t) =>
    O.jsx(Ge.span, { ...e, ref: t, style: { ...DP, ...e.style } }),
  );
gE.displayName = LP;
var yE = gE,
  [_u] = ks("Tooltip", [ku]),
  Gh = ku(),
  vE = "TooltipProvider",
  BP = 700,
  Wv = "tooltip.open",
  [$P, wE] = _u(vE),
  bE = (e) => {
    const {
        __scopeTooltip: t,
        delayDuration: n = BP,
        skipDelayDuration: i = 300,
        disableHoverableContent: o = !1,
        children: l,
      } = e,
      u = w.useRef(!0),
      d = w.useRef(!1),
      f = w.useRef(0);
    return (
      w.useEffect(() => {
        const m = f.current;
        return () => window.clearTimeout(m);
      }, []),
      O.jsx($P, {
        scope: t,
        isOpenDelayedRef: u,
        delayDuration: n,
        onOpen: w.useCallback(() => {
          (window.clearTimeout(f.current), (u.current = !1));
        }, []),
        onClose: w.useCallback(() => {
          (window.clearTimeout(f.current),
            (f.current = window.setTimeout(() => (u.current = !0), i)));
        }, [i]),
        isPointerInTransitRef: d,
        onPointerInTransitChange: w.useCallback((m) => {
          d.current = m;
        }, []),
        disableHoverableContent: o,
        children: l,
      })
    );
  };
bE.displayName = vE;
var SE = "Tooltip",
  [T3, Nu] = _u(SE),
  Uf = "TooltipTrigger",
  zP = w.forwardRef((e, t) => {
    const { __scopeTooltip: n, ...i } = e,
      o = Nu(Uf, n),
      l = wE(Uf, n),
      u = Gh(n),
      d = w.useRef(null),
      f = st(t, d, o.onTriggerChange),
      m = w.useRef(!1),
      g = w.useRef(!1),
      y = w.useCallback(() => (m.current = !1), []);
    return (
      w.useEffect(
        () => () => document.removeEventListener("pointerup", y),
        [y],
      ),
      O.jsx(Nb, {
        asChild: !0,
        ...u,
        children: O.jsx(Ge.button, {
          "aria-describedby": o.open ? o.contentId : void 0,
          "data-state": o.stateAttribute,
          ...i,
          ref: f,
          onPointerMove: we(e.onPointerMove, (v) => {
            v.pointerType !== "touch" &&
              !g.current &&
              !l.isPointerInTransitRef.current &&
              (o.onTriggerEnter(), (g.current = !0));
          }),
          onPointerLeave: we(e.onPointerLeave, () => {
            (o.onTriggerLeave(), (g.current = !1));
          }),
          onPointerDown: we(e.onPointerDown, () => {
            (o.open && o.onClose(),
              (m.current = !0),
              document.addEventListener("pointerup", y, { once: !0 }));
          }),
          onFocus: we(e.onFocus, () => {
            m.current || o.onOpen();
          }),
          onBlur: we(e.onBlur, o.onClose),
          onClick: we(e.onClick, o.onClose),
        }),
      })
    );
  });
zP.displayName = Uf;
var FP = "TooltipPortal",
  [I3, UP] = _u(FP, { forceMount: void 0 }),
  Oi = "TooltipContent",
  VP = w.forwardRef((e, t) => {
    const n = UP(Oi, e.__scopeTooltip),
      { forceMount: i = n.forceMount, side: o = "top", ...l } = e,
      u = Nu(Oi, e.__scopeTooltip);
    return O.jsx(ir, {
      present: i || u.open,
      children: u.disableHoverableContent
        ? O.jsx(EE, { side: o, ...l, ref: t })
        : O.jsx(WP, { side: o, ...l, ref: t }),
    });
  }),
  WP = w.forwardRef((e, t) => {
    const n = Nu(Oi, e.__scopeTooltip),
      i = wE(Oi, e.__scopeTooltip),
      o = w.useRef(null),
      l = st(t, o),
      [u, d] = w.useState(null),
      { trigger: f, onClose: m } = n,
      g = o.current,
      { onPointerInTransitChange: y } = i,
      v = w.useCallback(() => {
        (d(null), y(!1));
      }, [y]),
      C = w.useCallback(
        (E, S) => {
          const k = E.currentTarget,
            x = { x: E.clientX, y: E.clientY },
            M = QP(x, k.getBoundingClientRect()),
            A = YP(x, M),
            R = XP(S.getBoundingClientRect()),
            P = JP([...A, ...R]);
          (d(P), y(!0));
        },
        [y],
      );
    return (
      w.useEffect(() => () => v(), [v]),
      w.useEffect(() => {
        if (f && g) {
          const E = (k) => C(k, g),
            S = (k) => C(k, f);
          return (
            f.addEventListener("pointerleave", E),
            g.addEventListener("pointerleave", S),
            () => {
              (f.removeEventListener("pointerleave", E),
                g.removeEventListener("pointerleave", S));
            }
          );
        }
      }, [f, g, C, v]),
      w.useEffect(() => {
        if (u) {
          const E = (S) => {
            const k = S.target,
              x = { x: S.clientX, y: S.clientY },
              M = f?.contains(k) || g?.contains(k),
              A = !ZP(x, u);
            M ? v() : A && (v(), m());
          };
          return (
            document.addEventListener("pointermove", E),
            () => document.removeEventListener("pointermove", E)
          );
        }
      }, [f, g, u, m, v]),
      O.jsx(EE, { ...e, ref: l })
    );
  }),
  [HP, KP] = _u(SE, { isInside: !1 }),
  GP = oC("TooltipContent"),
  EE = w.forwardRef((e, t) => {
    const {
        __scopeTooltip: n,
        children: i,
        "aria-label": o,
        onEscapeKeyDown: l,
        onPointerDownOutside: u,
        ...d
      } = e,
      f = Nu(Oi, n),
      m = Gh(n),
      { onClose: g } = f;
    return (
      w.useEffect(
        () => (
          document.addEventListener(Wv, g),
          () => document.removeEventListener(Wv, g)
        ),
        [g],
      ),
      w.useEffect(() => {
        if (f.trigger) {
          const y = (v) => {
            v.target?.contains(f.trigger) && g();
          };
          return (
            window.addEventListener("scroll", y, { capture: !0 }),
            () => window.removeEventListener("scroll", y, { capture: !0 })
          );
        }
      }, [f.trigger, g]),
      O.jsx(uu, {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: l,
        onPointerDownOutside: u,
        onFocusOutside: (y) => y.preventDefault(),
        onDismiss: g,
        children: O.jsxs(Pb, {
          "data-state": f.stateAttribute,
          ...m,
          ...d,
          ref: t,
          style: {
            ...d.style,
            "--radix-tooltip-content-transform-origin":
              "var(--radix-popper-transform-origin)",
            "--radix-tooltip-content-available-width":
              "var(--radix-popper-available-width)",
            "--radix-tooltip-content-available-height":
              "var(--radix-popper-available-height)",
            "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
            "--radix-tooltip-trigger-height":
              "var(--radix-popper-anchor-height)",
          },
          children: [
            O.jsx(GP, { children: i }),
            O.jsx(HP, {
              scope: n,
              isInside: !0,
              children: O.jsx(yE, {
                id: f.contentId,
                role: "tooltip",
                children: o || i,
              }),
            }),
          ],
        }),
      })
    );
  });
VP.displayName = Oi;
var xE = "TooltipArrow",
  qP = w.forwardRef((e, t) => {
    const { __scopeTooltip: n, ...i } = e,
      o = Gh(n);
    return KP(xE, n).isInside ? null : O.jsx(Db, { ...o, ...i, ref: t });
  });
qP.displayName = xE;
function QP(e, t) {
  const n = Math.abs(t.top - e.y),
    i = Math.abs(t.bottom - e.y),
    o = Math.abs(t.right - e.x),
    l = Math.abs(t.left - e.x);
  switch (Math.min(n, i, o, l)) {
    case l:
      return "left";
    case o:
      return "right";
    case n:
      return "top";
    case i:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function YP(e, t, n = 5) {
  const i = [];
  switch (t) {
    case "top":
      i.push({ x: e.x - n, y: e.y + n }, { x: e.x + n, y: e.y + n });
      break;
    case "bottom":
      i.push({ x: e.x - n, y: e.y - n }, { x: e.x + n, y: e.y - n });
      break;
    case "left":
      i.push({ x: e.x + n, y: e.y - n }, { x: e.x + n, y: e.y + n });
      break;
    case "right":
      i.push({ x: e.x - n, y: e.y - n }, { x: e.x - n, y: e.y + n });
      break;
  }
  return i;
}
function XP(e) {
  const { top: t, right: n, bottom: i, left: o } = e;
  return [
    { x: o, y: t },
    { x: n, y: t },
    { x: n, y: i },
    { x: o, y: i },
  ];
}
function ZP(e, t) {
  const { x: n, y: i } = e;
  let o = !1;
  for (let l = 0, u = t.length - 1; l < t.length; u = l++) {
    const d = t[l],
      f = t[u],
      m = d.x,
      g = d.y,
      y = f.x,
      v = f.y;
    g > i != v > i && n < ((y - m) * (i - g)) / (v - g) + m && (o = !o);
  }
  return o;
}
function JP(e) {
  const t = e.slice();
  return (
    t.sort((n, i) =>
      n.x < i.x ? -1 : n.x > i.x ? 1 : n.y < i.y ? -1 : n.y > i.y ? 1 : 0,
    ),
    eD(t)
  );
}
function eD(e) {
  if (e.length <= 1) return e.slice();
  const t = [];
  for (let i = 0; i < e.length; i++) {
    const o = e[i];
    for (; t.length >= 2; ) {
      const l = t[t.length - 1],
        u = t[t.length - 2];
      if ((l.x - u.x) * (o.y - u.y) >= (l.y - u.y) * (o.x - u.x)) t.pop();
      else break;
    }
    t.push(o);
  }
  t.pop();
  const n = [];
  for (let i = e.length - 1; i >= 0; i--) {
    const o = e[i];
    for (; n.length >= 2; ) {
      const l = n[n.length - 1],
        u = n[n.length - 2];
      if ((l.x - u.x) * (o.y - u.y) >= (l.y - u.y) * (o.x - u.x)) n.pop();
      else break;
    }
    n.push(o);
  }
  return (
    n.pop(),
    t.length === 1 && n.length === 1 && t[0].x === n[0].x && t[0].y === n[0].y
      ? t
      : t.concat(n)
  );
}
var tD = bE,
  uf = { exports: {} };
var Hv;
function nD() {
  return (
    Hv ||
      ((Hv = 1),
      (function (e) {
        (function () {
          var t = {}.hasOwnProperty;
          function n() {
            for (var l = "", u = 0; u < arguments.length; u++) {
              var d = arguments[u];
              d && (l = o(l, i(d)));
            }
            return l;
          }
          function i(l) {
            if (typeof l == "string" || typeof l == "number") return l;
            if (typeof l != "object") return "";
            if (Array.isArray(l)) return n.apply(null, l);
            if (
              l.toString !== Object.prototype.toString &&
              !l.toString.toString().includes("[native code]")
            )
              return l.toString();
            var u = "";
            for (var d in l) t.call(l, d) && l[d] && (u = o(u, d));
            return u;
          }
          function o(l, u) {
            return u ? (l ? l + " " + u : l + u) : l;
          }
          e.exports
            ? ((n.default = n), (e.exports = n))
            : (window.classNames = n);
        })();
      })(uf)),
    uf.exports
  );
}
var rD = nD();
const ct = Ko(rD),
  ar = { asChild: { type: "boolean" } },
  CE = {
    width: {
      type: "string",
      className: "rt-r-w",
      customProperties: ["--width"],
      responsive: !0,
    },
    minWidth: {
      type: "string",
      className: "rt-r-min-w",
      customProperties: ["--min-width"],
      responsive: !0,
    },
    maxWidth: {
      type: "string",
      className: "rt-r-max-w",
      customProperties: ["--max-width"],
      responsive: !0,
    },
  },
  kE = {
    height: {
      type: "string",
      className: "rt-r-h",
      customProperties: ["--height"],
      responsive: !0,
    },
    minHeight: {
      type: "string",
      className: "rt-r-min-h",
      customProperties: ["--min-height"],
      responsive: !0,
    },
    maxHeight: {
      type: "string",
      className: "rt-r-max-h",
      customProperties: ["--max-height"],
      responsive: !0,
    },
  },
  OE = [
    "gray",
    "gold",
    "bronze",
    "brown",
    "yellow",
    "amber",
    "orange",
    "tomato",
    "red",
    "ruby",
    "crimson",
    "pink",
    "plum",
    "purple",
    "violet",
    "iris",
    "indigo",
    "blue",
    "cyan",
    "teal",
    "jade",
    "green",
    "grass",
    "lime",
    "mint",
    "sky",
  ],
  qh = { color: { type: "enum", values: OE, default: void 0 } },
  TE = { color: { type: "enum", values: OE, default: "" } },
  Pu = {
    highContrast: {
      type: "boolean",
      className: "rt-high-contrast",
      default: void 0,
    },
  },
  sD = ["normal", "start", "end", "both"],
  IE = {
    trim: { type: "enum", className: "rt-r-lt", values: sD, responsive: !0 },
  },
  iD = ["left", "center", "right"],
  ME = {
    align: { type: "enum", className: "rt-r-ta", values: iD, responsive: !0 },
  },
  oD = ["wrap", "nowrap", "pretty", "balance"],
  AE = {
    wrap: { type: "enum", className: "rt-r-tw", values: oD, responsive: !0 },
  },
  jE = { truncate: { type: "boolean", className: "rt-truncate" } },
  aD = ["light", "regular", "medium", "bold"],
  RE = {
    weight: {
      type: "enum",
      className: "rt-r-weight",
      values: aD,
      responsive: !0,
    },
  },
  lD = ["h1", "h2", "h3", "h4", "h5", "h6"],
  uD = ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
  cD = {
    as: { type: "enum", values: lD, default: "h1" },
    ...ar,
    size: {
      type: "enum",
      className: "rt-r-size",
      values: uD,
      default: "6",
      responsive: !0,
    },
    ...RE,
    ...ME,
    ...IE,
    ...jE,
    ...AE,
    ...qh,
    ...Pu,
  },
  dD = ["initial", "xs", "sm", "md", "lg", "xl"],
  Qh = new Set(dD);
function _E(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function No(e) {
  return (
    typeof e == "object" && e !== null && Object.keys(e).some((t) => Qh.has(t))
  );
}
function fD({ className: e, customProperties: t, ...n }) {
  const i = NE({ allowArbitraryValues: !0, className: e, ...n }),
    o = hD({ customProperties: t, ...n });
  return [i, o];
}
function NE({
  allowArbitraryValues: e,
  value: t,
  className: n,
  propValues: i,
  parseValue: o = (l) => l,
}) {
  const l = [];
  if (t) {
    if (typeof t == "string" && i.includes(t)) return Kv(n, t, o);
    if (No(t)) {
      const u = t;
      for (const d in u) {
        if (!_E(u, d) || !Qh.has(d)) continue;
        const f = u[d];
        if (f !== void 0) {
          if (i.includes(f)) {
            const m = Kv(n, f, o),
              g = d === "initial" ? m : `${d}:${m}`;
            l.push(g);
          } else if (e) {
            const m = d === "initial" ? n : `${d}:${n}`;
            l.push(m);
          }
        }
      }
      return l.join(" ");
    }
    if (e) return n;
  }
}
function Kv(e, t, n) {
  const i = e ? "-" : "",
    o = n(t),
    l = o?.startsWith("-"),
    u = l ? "-" : "",
    d = l ? o?.substring(1) : o;
  return `${u}${e}${i}${d}`;
}
function hD({
  customProperties: e,
  value: t,
  propValues: n,
  parseValue: i = (o) => o,
}) {
  let o = {};
  if (!(!t || (typeof t == "string" && n.includes(t)))) {
    if (
      (typeof t == "string" && (o = Object.fromEntries(e.map((l) => [l, t]))),
      No(t))
    ) {
      const l = t;
      for (const u in l) {
        if (!_E(l, u) || !Qh.has(u)) continue;
        const d = l[u];
        if (!n.includes(d))
          for (const f of e)
            o = { [u === "initial" ? f : `${f}-${u}`]: d, ...o };
      }
    }
    for (const l in o) {
      const u = o[l];
      u !== void 0 && (o[l] = i(u));
    }
    return o;
  }
}
function Gv(...e) {
  let t = {};
  for (const n of e) n && (t = { ...t, ...n });
  return Object.keys(t).length ? t : void 0;
}
function pD(...e) {
  return Object.assign({}, ...e);
}
function cn(e, ...t) {
  let n, i;
  const o = { ...e },
    l = pD(...t);
  for (const u in l) {
    let d = o[u];
    const f = l[u];
    if (
      (f.default !== void 0 && d === void 0 && (d = f.default),
      f.type === "enum" &&
        ![f.default, ...f.values].includes(d) &&
        !No(d) &&
        (d = f.default),
      (o[u] = d),
      "className" in f && f.className)
    ) {
      delete o[u];
      const m = "responsive" in f;
      if (!d || (No(d) && !m)) continue;
      if (
        (No(d) &&
          (f.default !== void 0 &&
            d.initial === void 0 &&
            (d.initial = f.default),
          f.type === "enum" &&
            ([f.default, ...f.values].includes(d.initial) ||
              (d.initial = f.default))),
        f.type === "enum")
      ) {
        const g = NE({
          allowArbitraryValues: !1,
          value: d,
          className: f.className,
          propValues: f.values,
          parseValue: f.parseValue,
        });
        n = ct(n, g);
        continue;
      }
      if (f.type === "string" || f.type === "enum | string") {
        const g = f.type === "string" ? [] : f.values,
          [y, v] = fD({
            className: f.className,
            customProperties: f.customProperties,
            propValues: g,
            parseValue: f.parseValue,
            value: d,
          });
        ((i = Gv(i, v)), (n = ct(n, y)));
        continue;
      }
      if (f.type === "boolean" && d) {
        n = ct(n, f.className);
        continue;
      }
    }
  }
  return ((o.className = ct(n, e.className)), (o.style = Gv(i, e.style)), o);
}
const cs = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "-1",
    "-2",
    "-3",
    "-4",
    "-5",
    "-6",
    "-7",
    "-8",
    "-9",
  ],
  On = {
    m: {
      type: "enum | string",
      values: cs,
      responsive: !0,
      className: "rt-r-m",
      customProperties: ["--m"],
    },
    mx: {
      type: "enum | string",
      values: cs,
      responsive: !0,
      className: "rt-r-mx",
      customProperties: ["--ml", "--mr"],
    },
    my: {
      type: "enum | string",
      values: cs,
      responsive: !0,
      className: "rt-r-my",
      customProperties: ["--mt", "--mb"],
    },
    mt: {
      type: "enum | string",
      values: cs,
      responsive: !0,
      className: "rt-r-mt",
      customProperties: ["--mt"],
    },
    mr: {
      type: "enum | string",
      values: cs,
      responsive: !0,
      className: "rt-r-mr",
      customProperties: ["--mr"],
    },
    mb: {
      type: "enum | string",
      values: cs,
      responsive: !0,
      className: "rt-r-mb",
      customProperties: ["--mb"],
    },
    ml: {
      type: "enum | string",
      values: cs,
      responsive: !0,
      className: "rt-r-ml",
      customProperties: ["--ml"],
    },
  },
  hs = w.forwardRef((e, t) => {
    const {
      children: n,
      className: i,
      asChild: o,
      as: l = "h1",
      color: u,
      ...d
    } = cn(e, cD, On);
    return w.createElement(
      Hr,
      { "data-accent-color": u, ...d, ref: t, className: ct("rt-Heading", i) },
      o ? n : w.createElement(l, null, n),
    );
  });
hs.displayName = "Heading";
const mD = ["span", "div", "label", "p"],
  gD = ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
  yD = {
    as: { type: "enum", values: mD, default: "span" },
    ...ar,
    size: { type: "enum", className: "rt-r-size", values: gD, responsive: !0 },
    ...RE,
    ...ME,
    ...IE,
    ...jE,
    ...AE,
    ...qh,
    ...Pu,
  },
  We = w.forwardRef((e, t) => {
    const {
      children: n,
      className: i,
      asChild: o,
      as: l = "span",
      color: u,
      ...d
    } = cn(e, yD, On);
    return w.createElement(
      Hr,
      { "data-accent-color": u, ...d, ref: t, className: ct("rt-Text", i) },
      o ? n : w.createElement(l, null, n),
    );
  });
We.displayName = "Text";
function vD(e) {
  switch (e) {
    case "tomato":
    case "red":
    case "ruby":
    case "crimson":
    case "pink":
    case "plum":
    case "purple":
    case "violet":
      return "mauve";
    case "iris":
    case "indigo":
    case "blue":
    case "sky":
    case "cyan":
      return "slate";
    case "teal":
    case "jade":
    case "mint":
    case "green":
      return "sage";
    case "grass":
    case "lime":
      return "olive";
    case "yellow":
    case "amber":
    case "orange":
    case "brown":
    case "gold":
    case "bronze":
      return "sand";
    case "gray":
      return "gray";
  }
}
const wD = ["none", "small", "medium", "large", "full"],
  PE = { radius: { type: "enum", values: wD, default: void 0 } },
  Qt = {
    hasBackground: { default: !0 },
    appearance: { default: "inherit" },
    accentColor: { default: "indigo" },
    grayColor: { default: "auto" },
    panelBackground: { default: "translucent" },
    radius: { default: "medium" },
    scaling: { default: "100%" },
  },
  li = () => {},
  Vf = w.createContext(void 0),
  DE = w.forwardRef((e, t) =>
    w.useContext(Vf) === void 0
      ? w.createElement(
          tD,
          { delayDuration: 200 },
          w.createElement(
            yA,
            { dir: "ltr" },
            w.createElement(LE, { ...e, ref: t }),
          ),
        )
      : w.createElement(Yh, { ...e, ref: t }),
  );
DE.displayName = "Theme";
const LE = w.forwardRef((e, t) => {
  const {
      appearance: n = Qt.appearance.default,
      accentColor: i = Qt.accentColor.default,
      grayColor: o = Qt.grayColor.default,
      panelBackground: l = Qt.panelBackground.default,
      radius: u = Qt.radius.default,
      scaling: d = Qt.scaling.default,
      hasBackground: f = Qt.hasBackground.default,
      ...m
    } = e,
    [g, y] = w.useState(n);
  w.useEffect(() => y(n), [n]);
  const [v, C] = w.useState(i);
  w.useEffect(() => C(i), [i]);
  const [E, S] = w.useState(o);
  w.useEffect(() => S(o), [o]);
  const [k, x] = w.useState(l);
  w.useEffect(() => x(l), [l]);
  const [M, A] = w.useState(u);
  w.useEffect(() => A(u), [u]);
  const [R, P] = w.useState(d);
  return (
    w.useEffect(() => P(d), [d]),
    w.createElement(Yh, {
      ...m,
      ref: t,
      isRoot: !0,
      hasBackground: f,
      appearance: g,
      accentColor: v,
      grayColor: E,
      panelBackground: k,
      radius: M,
      scaling: R,
      onAppearanceChange: y,
      onAccentColorChange: C,
      onGrayColorChange: S,
      onPanelBackgroundChange: x,
      onRadiusChange: A,
      onScalingChange: P,
    })
  );
});
LE.displayName = "ThemeRoot";
const Yh = w.forwardRef((e, t) => {
  const n = w.useContext(Vf),
    {
      asChild: i,
      isRoot: o,
      hasBackground: l,
      appearance: u = n?.appearance ?? Qt.appearance.default,
      accentColor: d = n?.accentColor ?? Qt.accentColor.default,
      grayColor: f = n?.resolvedGrayColor ?? Qt.grayColor.default,
      panelBackground: m = n?.panelBackground ?? Qt.panelBackground.default,
      radius: g = n?.radius ?? Qt.radius.default,
      scaling: y = n?.scaling ?? Qt.scaling.default,
      onAppearanceChange: v = li,
      onAccentColorChange: C = li,
      onGrayColorChange: E = li,
      onPanelBackgroundChange: S = li,
      onRadiusChange: k = li,
      onScalingChange: x = li,
      ...M
    } = e,
    A = i ? Hr : "div",
    R = f === "auto" ? vD(d) : f,
    P = e.appearance === "light" || e.appearance === "dark",
    V = l === void 0 ? o || P : l;
  return w.createElement(
    Vf.Provider,
    {
      value: w.useMemo(
        () => ({
          appearance: u,
          accentColor: d,
          grayColor: f,
          resolvedGrayColor: R,
          panelBackground: m,
          radius: g,
          scaling: y,
          onAppearanceChange: v,
          onAccentColorChange: C,
          onGrayColorChange: E,
          onPanelBackgroundChange: S,
          onRadiusChange: k,
          onScalingChange: x,
        }),
        [u, d, f, R, m, g, y, v, C, E, S, k, x],
      ),
    },
    w.createElement(A, {
      "data-is-root-theme": o ? "true" : "false",
      "data-accent-color": d,
      "data-gray-color": R,
      "data-has-background": V ? "true" : "false",
      "data-panel-background": m,
      "data-radius": g,
      "data-scaling": y,
      ref: t,
      ...M,
      className: ct(
        "radix-themes",
        { light: u === "light", dark: u === "dark" },
        M.className,
      ),
    }),
  );
});
Yh.displayName = "ThemeImpl";
function bD(e, t) {
  const { asChild: n, children: i } = e;
  if (!n) return typeof t == "function" ? t(i) : t;
  const o = w.Children.only(i);
  return w.cloneElement(o, {
    children: typeof t == "function" ? t(o.props.children) : t,
  });
}
const SD = ["1", "2", "3"],
  ED = ["solid", "soft", "surface", "outline"],
  xD = {
    ...ar,
    size: {
      type: "enum",
      className: "rt-r-size",
      values: SD,
      default: "1",
      responsive: !0,
    },
    variant: {
      type: "enum",
      className: "rt-variant",
      values: ED,
      default: "soft",
    },
    ...TE,
    ...Pu,
    ...PE,
  },
  fi = w.forwardRef((e, t) => {
    const {
        asChild: n,
        className: i,
        color: o,
        radius: l,
        ...u
      } = cn(e, xD, On),
      d = n ? Hr : "span";
    return w.createElement(d, {
      "data-accent-color": o,
      "data-radius": l,
      ...u,
      ref: t,
      className: ct("rt-reset", "rt-Badge", i),
    });
  });
fi.displayName = "Badge";
const Xh = Hr,
  CD = ["div", "span"],
  kD = ["none", "inline", "inline-block", "block", "contents"],
  OD = {
    as: { type: "enum", values: CD, default: "div" },
    ...ar,
    display: {
      type: "enum",
      className: "rt-r-display",
      values: kD,
      responsive: !0,
    },
  },
  ds = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  TD = {
    p: {
      type: "enum | string",
      className: "rt-r-p",
      customProperties: ["--p"],
      values: ds,
      responsive: !0,
    },
    px: {
      type: "enum | string",
      className: "rt-r-px",
      customProperties: ["--pl", "--pr"],
      values: ds,
      responsive: !0,
    },
    py: {
      type: "enum | string",
      className: "rt-r-py",
      customProperties: ["--pt", "--pb"],
      values: ds,
      responsive: !0,
    },
    pt: {
      type: "enum | string",
      className: "rt-r-pt",
      customProperties: ["--pt"],
      values: ds,
      responsive: !0,
    },
    pr: {
      type: "enum | string",
      className: "rt-r-pr",
      customProperties: ["--pr"],
      values: ds,
      responsive: !0,
    },
    pb: {
      type: "enum | string",
      className: "rt-r-pb",
      customProperties: ["--pb"],
      values: ds,
      responsive: !0,
    },
    pl: {
      type: "enum | string",
      className: "rt-r-pl",
      customProperties: ["--pl"],
      values: ds,
      responsive: !0,
    },
  },
  cf = ["visible", "hidden", "clip", "scroll", "auto"],
  ID = ["static", "relative", "absolute", "fixed", "sticky"],
  xo = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "-1",
    "-2",
    "-3",
    "-4",
    "-5",
    "-6",
    "-7",
    "-8",
    "-9",
  ],
  MD = ["0", "1"],
  AD = ["0", "1"],
  jD = ["start", "center", "end", "baseline", "stretch"],
  RD = ["start", "center", "end", "baseline", "stretch"],
  Du = {
    ...TD,
    ...CE,
    ...kE,
    position: {
      type: "enum",
      className: "rt-r-position",
      values: ID,
      responsive: !0,
    },
    inset: {
      type: "enum | string",
      className: "rt-r-inset",
      customProperties: ["--inset"],
      values: xo,
      responsive: !0,
    },
    top: {
      type: "enum | string",
      className: "rt-r-top",
      customProperties: ["--top"],
      values: xo,
      responsive: !0,
    },
    right: {
      type: "enum | string",
      className: "rt-r-right",
      customProperties: ["--right"],
      values: xo,
      responsive: !0,
    },
    bottom: {
      type: "enum | string",
      className: "rt-r-bottom",
      customProperties: ["--bottom"],
      values: xo,
      responsive: !0,
    },
    left: {
      type: "enum | string",
      className: "rt-r-left",
      customProperties: ["--left"],
      values: xo,
      responsive: !0,
    },
    overflow: {
      type: "enum",
      className: "rt-r-overflow",
      values: cf,
      responsive: !0,
    },
    overflowX: {
      type: "enum",
      className: "rt-r-ox",
      values: cf,
      responsive: !0,
    },
    overflowY: {
      type: "enum",
      className: "rt-r-oy",
      values: cf,
      responsive: !0,
    },
    flexBasis: {
      type: "string",
      className: "rt-r-fb",
      customProperties: ["--flex-basis"],
      responsive: !0,
    },
    flexShrink: {
      type: "enum | string",
      className: "rt-r-fs",
      customProperties: ["--flex-shrink"],
      values: MD,
      responsive: !0,
    },
    flexGrow: {
      type: "enum | string",
      className: "rt-r-fg",
      customProperties: ["--flex-grow"],
      values: AD,
      responsive: !0,
    },
    gridArea: {
      type: "string",
      className: "rt-r-ga",
      customProperties: ["--grid-area"],
      responsive: !0,
    },
    gridColumn: {
      type: "string",
      className: "rt-r-gc",
      customProperties: ["--grid-column"],
      responsive: !0,
    },
    gridColumnStart: {
      type: "string",
      className: "rt-r-gcs",
      customProperties: ["--grid-column-start"],
      responsive: !0,
    },
    gridColumnEnd: {
      type: "string",
      className: "rt-r-gce",
      customProperties: ["--grid-column-end"],
      responsive: !0,
    },
    gridRow: {
      type: "string",
      className: "rt-r-gr",
      customProperties: ["--grid-row"],
      responsive: !0,
    },
    gridRowStart: {
      type: "string",
      className: "rt-r-grs",
      customProperties: ["--grid-row-start"],
      responsive: !0,
    },
    gridRowEnd: {
      type: "string",
      className: "rt-r-gre",
      customProperties: ["--grid-row-end"],
      responsive: !0,
    },
    alignSelf: {
      type: "enum",
      className: "rt-r-as",
      values: jD,
      responsive: !0,
    },
    justifySelf: {
      type: "enum",
      className: "rt-r-js",
      values: RD,
      responsive: !0,
    },
  },
  mi = w.forwardRef((e, t) => {
    const { className: n, asChild: i, as: o = "div", ...l } = cn(e, OD, Du, On);
    return w.createElement(i ? Xh : o, {
      ...l,
      ref: t,
      className: ct("rt-Box", n),
    });
  });
mi.displayName = "Box";
const _D = ["1", "2", "3", "4"],
  ND = ["classic", "solid", "soft", "surface", "outline", "ghost"],
  qv = {
    ...ar,
    size: {
      type: "enum",
      className: "rt-r-size",
      values: _D,
      default: "2",
      responsive: !0,
    },
    variant: {
      type: "enum",
      className: "rt-variant",
      values: ND,
      default: "solid",
    },
    ...TE,
    ...Pu,
    ...PE,
    loading: { type: "boolean", className: "rt-loading", default: !1 },
  },
  df = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  BE = {
    gap: {
      type: "enum | string",
      className: "rt-r-gap",
      customProperties: ["--gap"],
      values: df,
      responsive: !0,
    },
    gapX: {
      type: "enum | string",
      className: "rt-r-cg",
      customProperties: ["--column-gap"],
      values: df,
      responsive: !0,
    },
    gapY: {
      type: "enum | string",
      className: "rt-r-rg",
      customProperties: ["--row-gap"],
      values: df,
      responsive: !0,
    },
  },
  PD = ["div", "span"],
  DD = ["none", "inline-flex", "flex"],
  LD = ["row", "column", "row-reverse", "column-reverse"],
  BD = ["start", "center", "end", "baseline", "stretch"],
  $D = ["start", "center", "end", "between"],
  zD = ["nowrap", "wrap", "wrap-reverse"],
  FD = {
    as: { type: "enum", values: PD, default: "div" },
    ...ar,
    display: {
      type: "enum",
      className: "rt-r-display",
      values: DD,
      responsive: !0,
    },
    direction: {
      type: "enum",
      className: "rt-r-fd",
      values: LD,
      responsive: !0,
    },
    align: { type: "enum", className: "rt-r-ai", values: BD, responsive: !0 },
    justify: {
      type: "enum",
      className: "rt-r-jc",
      values: $D,
      parseValue: UD,
      responsive: !0,
    },
    wrap: { type: "enum", className: "rt-r-fw", values: zD, responsive: !0 },
    ...BE,
  };
function UD(e) {
  return e === "between" ? "space-between" : e;
}
const ut = w.forwardRef((e, t) => {
  const { className: n, asChild: i, as: o = "div", ...l } = cn(e, FD, Du, On);
  return w.createElement(i ? Xh : o, {
    ...l,
    ref: t,
    className: ct("rt-Flex", n),
  });
});
ut.displayName = "Flex";
const VD = ["1", "2", "3"],
  WD = {
    size: {
      type: "enum",
      className: "rt-r-size",
      values: VD,
      default: "2",
      responsive: !0,
    },
    loading: { type: "boolean", default: !0 },
  },
  $E = w.forwardRef((e, t) => {
    const { className: n, children: i, loading: o, ...l } = cn(e, WD, On);
    if (!o) return i;
    const u = w.createElement(
      "span",
      { ...l, ref: t, className: ct("rt-Spinner", n) },
      w.createElement("span", { className: "rt-SpinnerLeaf" }),
      w.createElement("span", { className: "rt-SpinnerLeaf" }),
      w.createElement("span", { className: "rt-SpinnerLeaf" }),
      w.createElement("span", { className: "rt-SpinnerLeaf" }),
      w.createElement("span", { className: "rt-SpinnerLeaf" }),
      w.createElement("span", { className: "rt-SpinnerLeaf" }),
      w.createElement("span", { className: "rt-SpinnerLeaf" }),
      w.createElement("span", { className: "rt-SpinnerLeaf" }),
    );
    return i === void 0
      ? u
      : w.createElement(
          ut,
          {
            asChild: !0,
            position: "relative",
            align: "center",
            justify: "center",
          },
          w.createElement(
            "span",
            null,
            w.createElement(
              "span",
              {
                "aria-hidden": !0,
                style: { display: "contents", visibility: "hidden" },
                inert: void 0,
              },
              i,
            ),
            w.createElement(
              ut,
              {
                asChild: !0,
                align: "center",
                justify: "center",
                position: "absolute",
                inset: "0",
              },
              w.createElement("span", null, u),
            ),
          ),
        );
  });
$E.displayName = "Spinner";
const HD = yE;
function KD(e, t) {
  if (e !== void 0)
    return typeof e == "string"
      ? t(e)
      : Object.fromEntries(Object.entries(e).map(([n, i]) => [n, t(i)]));
}
function GD(e) {
  switch (e) {
    case "1":
      return "1";
    case "2":
    case "3":
      return "2";
    case "4":
      return "3";
  }
}
const zE = w.forwardRef((e, t) => {
  const { size: n = qv.size.default } = e,
    {
      className: i,
      children: o,
      asChild: l,
      color: u,
      radius: d,
      disabled: f = e.loading,
      ...m
    } = cn(e, qv, On),
    g = l ? Hr : "button";
  return w.createElement(
    g,
    {
      "data-disabled": f || void 0,
      "data-accent-color": u,
      "data-radius": d,
      ...m,
      ref: t,
      className: ct("rt-reset", "rt-BaseButton", i),
      disabled: f,
    },
    e.loading
      ? w.createElement(
          w.Fragment,
          null,
          w.createElement(
            "span",
            {
              style: { display: "contents", visibility: "hidden" },
              "aria-hidden": !0,
            },
            o,
          ),
          w.createElement(HD, null, o),
          w.createElement(
            ut,
            {
              asChild: !0,
              align: "center",
              justify: "center",
              position: "absolute",
              inset: "0",
            },
            w.createElement(
              "span",
              null,
              w.createElement($E, { size: KD(n, GD) }),
            ),
          ),
        )
      : o,
  );
});
zE.displayName = "BaseButton";
const FE = w.forwardRef(({ className: e, ...t }, n) =>
  w.createElement(zE, { ...t, ref: n, className: ct("rt-Button", e) }),
);
FE.displayName = "Button";
const qD = ["1", "2", "3", "4", "5"],
  QD = ["surface", "classic", "ghost"],
  YD = {
    ...ar,
    size: {
      type: "enum",
      className: "rt-r-size",
      values: qD,
      default: "1",
      responsive: !0,
    },
    variant: {
      type: "enum",
      className: "rt-variant",
      values: QD,
      default: "surface",
    },
  },
  _n = w.forwardRef((e, t) => {
    const { asChild: n, className: i, ...o } = cn(e, YD, On),
      l = n ? Hr : "div";
    return w.createElement(l, {
      ref: t,
      ...o,
      className: ct("rt-reset", "rt-BaseCard", "rt-Card", i),
    });
  });
_n.displayName = "Card";
const XD = ["div", "span"],
  ZD = ["none", "inline-grid", "grid"],
  JD = ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
  e3 = ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
  t3 = ["row", "column", "dense", "row-dense", "column-dense"],
  n3 = ["start", "center", "end", "baseline", "stretch"],
  r3 = ["start", "center", "end", "between"],
  s3 = [
    "start",
    "center",
    "end",
    "baseline",
    "between",
    "around",
    "evenly",
    "stretch",
  ],
  i3 = ["start", "center", "end", "baseline", "stretch"],
  UE = {
    as: { type: "enum", values: XD, default: "div" },
    ...ar,
    display: {
      type: "enum",
      className: "rt-r-display",
      values: ZD,
      responsive: !0,
    },
    areas: {
      type: "string",
      className: "rt-r-gta",
      customProperties: ["--grid-template-areas"],
      responsive: !0,
    },
    columns: {
      type: "enum | string",
      className: "rt-r-gtc",
      customProperties: ["--grid-template-columns"],
      values: JD,
      parseValue: Qv,
      responsive: !0,
    },
    rows: {
      type: "enum | string",
      className: "rt-r-gtr",
      customProperties: ["--grid-template-rows"],
      values: e3,
      parseValue: Qv,
      responsive: !0,
    },
    flow: { type: "enum", className: "rt-r-gaf", values: t3, responsive: !0 },
    align: { type: "enum", className: "rt-r-ai", values: n3, responsive: !0 },
    justify: {
      type: "enum",
      className: "rt-r-jc",
      values: r3,
      parseValue: o3,
      responsive: !0,
    },
    alignContent: {
      type: "enum",
      className: "rt-r-ac",
      values: s3,
      parseValue: a3,
      responsive: !0,
    },
    justifyItems: {
      type: "enum",
      className: "rt-r-ji",
      values: i3,
      responsive: !0,
    },
    ...BE,
  };
function Qv(e) {
  return UE.columns.values.includes(e)
    ? e
    : e?.match(/^\d+$/)
      ? `repeat(${e}, minmax(0, 1fr))`
      : e;
}
function o3(e) {
  return e === "between" ? "space-between" : e;
}
function a3(e) {
  switch (e) {
    case "between":
      return "space-between";
    case "around":
      return "space-around";
    case "evenly":
      return "space-evenly";
    default:
      return e;
  }
}
const Wf = w.forwardRef((e, t) => {
  const { className: n, asChild: i, as: o = "div", ...l } = cn(e, UE, Du, On);
  return w.createElement(i ? Xh : o, {
    ...l,
    ref: t,
    className: ct("rt-Grid", n),
  });
});
Wf.displayName = "Grid";
const l3 = ["1", "2", "3", "4"],
  u3 = ["none", "initial"],
  c3 = ["left", "center", "right"],
  d3 = {
    ...ar,
    size: {
      type: "enum",
      className: "rt-r-size",
      values: l3,
      default: "4",
      responsive: !0,
    },
    display: {
      type: "enum",
      className: "rt-r-display",
      values: u3,
      parseValue: f3,
      responsive: !0,
    },
    align: {
      type: "enum",
      className: "rt-r-ai",
      values: c3,
      parseValue: h3,
      responsive: !0,
    },
  };
function f3(e) {
  return e === "initial" ? "flex" : e;
}
function h3(e) {
  return e === "left" ? "start" : e === "right" ? "end" : e;
}
const VE = w.forwardRef(
  (
    {
      width: e,
      minWidth: t,
      maxWidth: n,
      height: i,
      minHeight: o,
      maxHeight: l,
      ...u
    },
    d,
  ) => {
    const { asChild: f, children: m, className: g, ...y } = cn(u, d3, Du, On),
      { className: v, style: C } = cn(
        {
          width: e,
          minWidth: t,
          maxWidth: n,
          height: i,
          minHeight: o,
          maxHeight: l,
        },
        CE,
        kE,
      ),
      E = f ? Hr : "div";
    return w.createElement(
      E,
      { ...y, ref: d, className: ct("rt-Container", g) },
      bD({ asChild: f, children: m }, (S) =>
        w.createElement(
          "div",
          { className: ct("rt-ContainerInner", v), style: C },
          S,
        ),
      ),
    );
  },
);
VE.displayName = "Container";
const p3 = ["horizontal", "vertical"],
  m3 = ["1", "2", "3", "4"],
  g3 = {
    orientation: {
      type: "enum",
      className: "rt-r-orientation",
      values: p3,
      default: "horizontal",
      responsive: !0,
    },
    size: {
      type: "enum",
      className: "rt-r-size",
      values: m3,
      default: "1",
      responsive: !0,
    },
    color: { ...qh.color, default: "gray" },
    decorative: { type: "boolean", default: !0 },
  },
  WE = w.forwardRef((e, t) => {
    const { className: n, color: i, decorative: o, ...l } = cn(e, g3, On);
    return w.createElement("span", {
      "data-accent-color": i,
      role: o ? void 0 : "separator",
      ...l,
      ref: t,
      className: ct("rt-Separator", n),
    });
  });
WE.displayName = "Separator";
const { networkConfig: y3, useNetworkVariable: Yv } = NP({
    devnet: {
      url: Ll("devnet"),
      network: "devnet",
      variables: { packageId: "", queueId: "" },
    },
    testnet: {
      url: Ll("testnet"),
      network: "testnet",
      variables: { packageId: "", queueId: "" },
    },
    mainnet: {
      url: Ll("mainnet"),
      network: "mainnet",
      variables: { packageId: "", queueId: "" },
    },
  }),
  v3 = [
    { name: "sit", label: "Sit" },
    { name: "stand", label: "Stand" },
    { name: "wave", label: "Wave" },
    { name: "walk_forward", label: "Walk Forward" },
    { name: "walk_backward", label: "Walk Backward" },
    { name: "turn_left", label: "Turn Left" },
    { name: "turn_right", label: "Turn Right" },
    { name: "jump", label: "Jump" },
    { name: "balance", label: "Balance" },
    { name: "push_up", label: "Push Up" },
  ];
function w3() {
  const e = ju(),
    t = fE(),
    n = Yv("packageId"),
    i = Yv("queueId"),
    [o, l] = w.useState(null),
    [u, d] = w.useState([]),
    [f, m] = w.useState([]),
    [g, y] = w.useState(!1),
    [v, C] = w.useState(!1),
    [E] = w.useState("ws://localhost:8080"),
    [S, k] = w.useState(null),
    [x, M] = w.useState(0),
    { mutate: A, isPending: R } = PP(),
    P = w.useCallback((B, H) => {
      m((ee) => [
        { type: B, message: H, timestamp: new Date() },
        ...ee.slice(0, 99),
      ]);
    }, []),
    V = w.useCallback(async () => {
      if (!(!i || !t))
        try {
          const B = await t.getObject({ id: i, options: { showContent: !0 } });
          if (B.data?.content?.dataType === "moveObject") {
            const H = B.data.content.fields;
            l({
              queueLength: Number(H.actions?.length || 0),
              uniqueUsers: Number(H.unique_users || 0),
              totalQueued: Number(H.total_queued || 0),
              totalProcessed: Number(H.total_processed || 0),
              isPaused: !!H.is_paused,
              maxPendingPerUser: Number(H.max_pending_per_user || 3),
              cooldownMs: Number(H.cooldown_ms || 3e4),
              admin: String(H.admin || ""),
              name: String(H.name || ""),
            });
          }
        } catch (B) {
          console.error("Failed to fetch queue state:", B);
        }
    }, [i, t]);
  (w.useEffect(() => {
    let B = null;
    const H = () => {
        try {
          ((B = new WebSocket(E)),
            (B.onopen = () => {
              (C(!0), P("system", "Connected to WebSocket server"));
            }),
            (B.onclose = () => {
              (C(!1), P("system", "Disconnected from WebSocket server"));
            }),
            (B.onerror = () => {
              C(!1);
            }),
            (B.onmessage = (Q) => {
              try {
                const J = JSON.parse(Q.data);
                ee(J);
              } catch {
                console.error("Failed to parse WebSocket message");
              }
            }));
        } catch {
          console.error("Failed to connect to WebSocket");
        }
      },
      ee = (Q) => {
        switch (Q.type) {
          case "welcome":
            P("system", `Server v${Q.data.serverVersion}`);
            break;
          case "queue_state":
            (l((J) => ({
              ...J,
              queueLength: Number(Q.data.queueLength || 0),
              uniqueUsers: Number(Q.data.uniqueUsers || 0),
              totalQueued: Number(Q.data.totalQueued || 0),
              totalProcessed: Number(Q.data.totalProcessed || 0),
            })),
              Q.data.pendingActions && d(Q.data.pendingActions),
              P("queue_state", `Queue: ${Q.data.queueLength} pending`));
            break;
          case "action_queued":
            (l(
              (J) =>
                J && { ...J, queueLength: Number(Q.data.queueLength || 0) },
            ),
              d((J) => [
                ...J,
                {
                  actionName: String(Q.data.actionName),
                  sender: String(Q.data.sender),
                  isPriority: !!Q.data.isPriority,
                  timestamp: Number(Q.data.timestamp),
                },
              ]),
              P(
                "action_queued",
                `${Q.data.actionName} by ${z(String(Q.data.sender))}${Q.data.isPriority ? " [PRIORITY]" : ""}`,
              ));
            break;
          case "action_processed":
            (l(
              (J) =>
                J && {
                  ...J,
                  queueLength: Number(Q.data.remainingInQueue || 0),
                },
            ),
              d((J) => J.slice(1)),
              P(
                "action_processed",
                `${Q.data.actionName} (wait: ${(Number(Q.data.waitTimeMs) / 1e3).toFixed(1)}s)`,
              ));
            break;
        }
      };
    return (
      H(),
      () => {
        B && B.close();
      }
    );
  }, [E, P]),
    w.useEffect(() => {
      V();
    }, [V]),
    w.useEffect(() => {
      if (!S) {
        M(0);
        return;
      }
      const B = () => {
        const ee = Date.now(),
          Q = Math.max(0, S - ee);
        (M(Q), Q <= 0 && k(null));
      };
      B();
      const H = setInterval(B, 100);
      return () => clearInterval(H);
    }, [S]));
  const U = async (B, H) => {
      if (!(!e || !n || !i)) {
        y(!0);
        try {
          const ee = new zo();
          (ee.moveCall({
            target: `${n}::multiplayer_queue::${H ? "queue_priority_action" : "queue_action"}`,
            arguments: [ee.object(i), ee.pure.string(B), ee.object(R0)],
          }),
            A(
              { transaction: ee },
              {
                onSuccess: (Q) => {
                  (P("success", `${B} queued! Tx: ${Q.digest.slice(0, 8)}...`),
                    V());
                  const J = o?.cooldownMs || 3e4;
                  k(Date.now() + J);
                },
                onError: (Q) => {
                  P("error", `Failed to queue: ${Q.message}`);
                },
              },
            ));
        } catch (ee) {
          P(
            "error",
            `Error: ${ee instanceof Error ? ee.message : "Unknown error"}`,
          );
        } finally {
          y(!1);
        }
      }
    },
    z = (B) => (!B || B.length < 12 ? B : `${B.slice(0, 6)}...${B.slice(-4)}`);
  return !n || !i
    ? O.jsxs(_n, {
        children: [
          O.jsx(hs, { size: "4", mb: "2", children: "Configuration Required" }),
          O.jsx(We, {
            children:
              "Please set VITE_PACKAGE_ID and VITE_QUEUE_ID in your .env file, or update networkConfig.ts with the deployed contract addresses.",
          }),
          O.jsxs(mi, {
            mt: "3",
            children: [
              O.jsx(We, {
                size: "2",
                color: "gray",
                children:
                  "1. Deploy the Move contract: cd ../move && sui client publish",
              }),
              O.jsx("br", {}),
              O.jsx(We, {
                size: "2",
                color: "gray",
                children:
                  '2. Create a queue: cd ../client && pnpm create-queue "My Queue"',
              }),
              O.jsx("br", {}),
              O.jsx(We, {
                size: "2",
                color: "gray",
                children:
                  "3. Add to .env: VITE_PACKAGE_ID=0x... VITE_QUEUE_ID=0x...",
              }),
            ],
          }),
        ],
      })
    : O.jsxs(ut, {
        direction: "column",
        gap: "4",
        children: [
          O.jsxs(ut, {
            justify: "between",
            align: "center",
            children: [
              O.jsx(hs, {
                size: "5",
                children: o?.name || "Multiplayer Queue",
              }),
              O.jsxs(ut, {
                gap: "2",
                align: "center",
                children: [
                  O.jsx(fi, {
                    color: v ? "green" : "red",
                    children: v ? "Live" : "Offline",
                  }),
                  !v &&
                    O.jsxs(We, {
                      size: "1",
                      color: "gray",
                      children: ["WS: ", E],
                    }),
                ],
              }),
            ],
          }),
          O.jsxs(Wf, {
            columns: "4",
            gap: "3",
            children: [
              O.jsx(_n, {
                children: O.jsxs(ut, {
                  direction: "column",
                  align: "center",
                  children: [
                    O.jsx(We, {
                      size: "6",
                      weight: "bold",
                      color: "crimson",
                      children: o?.queueLength || 0,
                    }),
                    O.jsx(We, {
                      size: "2",
                      color: "gray",
                      children: "In Queue",
                    }),
                  ],
                }),
              }),
              O.jsx(_n, {
                children: O.jsxs(ut, {
                  direction: "column",
                  align: "center",
                  children: [
                    O.jsx(We, {
                      size: "6",
                      weight: "bold",
                      color: "blue",
                      children: o?.uniqueUsers || 0,
                    }),
                    O.jsx(We, {
                      size: "2",
                      color: "gray",
                      children: "Unique Users",
                    }),
                  ],
                }),
              }),
              O.jsx(_n, {
                children: O.jsxs(ut, {
                  direction: "column",
                  align: "center",
                  children: [
                    O.jsx(We, {
                      size: "6",
                      weight: "bold",
                      color: "green",
                      children: o?.totalQueued || 0,
                    }),
                    O.jsx(We, {
                      size: "2",
                      color: "gray",
                      children: "Total Queued",
                    }),
                  ],
                }),
              }),
              O.jsx(_n, {
                children: O.jsxs(ut, {
                  direction: "column",
                  align: "center",
                  children: [
                    O.jsx(We, {
                      size: "6",
                      weight: "bold",
                      color: "orange",
                      children: o?.totalProcessed || 0,
                    }),
                    O.jsx(We, {
                      size: "2",
                      color: "gray",
                      children: "Processed",
                    }),
                  ],
                }),
              }),
            ],
          }),
          e
            ? O.jsxs(_n, {
                children: [
                  O.jsxs(ut, {
                    justify: "between",
                    align: "center",
                    mb: "3",
                    children: [
                      O.jsx(hs, { size: "3", children: "Queue Actions" }),
                      x > 0 &&
                        O.jsxs(fi, {
                          color: "orange",
                          size: "2",
                          children: ["Cooldown: ", (x / 1e3).toFixed(1), "s"],
                        }),
                    ],
                  }),
                  O.jsx(Wf, {
                    columns: "5",
                    gap: "2",
                    children: v3.map((B) =>
                      O.jsx(
                        FE,
                        {
                          variant: "soft",
                          disabled: g || R || x > 0,
                          onClick: () => U(B.name, !1),
                          children: B.label,
                        },
                        B.name,
                      ),
                    ),
                  }),
                  O.jsx(WE, { my: "3", size: "4" }),
                  O.jsxs(ut, {
                    justify: "between",
                    align: "center",
                    children: [
                      O.jsxs(We, {
                        size: "2",
                        color: "gray",
                        children: [
                          "Max ",
                          o?.maxPendingPerUser || 3,
                          " pending actions per user | Cooldown:",
                          " ",
                          ((o?.cooldownMs || 3e4) / 1e3).toFixed(0),
                          "s",
                        ],
                      }),
                      x > 0 &&
                        O.jsx(mi, {
                          style: {
                            width: "100px",
                            height: "4px",
                            background: "var(--gray-a5)",
                            borderRadius: "2px",
                            overflow: "hidden",
                          },
                          children: O.jsx(mi, {
                            style: {
                              width: `${(x / (o?.cooldownMs || 3e4)) * 100}%`,
                              height: "100%",
                              background: "var(--orange-9)",
                              transition: "width 0.1s linear",
                            },
                          }),
                        }),
                    ],
                  }),
                ],
              })
            : O.jsx(_n, {
                children: O.jsx(We, {
                  children: "Connect your wallet to queue actions",
                }),
              }),
          O.jsxs(_n, {
            children: [
              O.jsx(hs, { size: "3", mb: "3", children: "Current Queue" }),
              u.length === 0
                ? O.jsx(We, { color: "gray", children: "Queue is empty" })
                : O.jsx(ut, {
                    direction: "column",
                    gap: "2",
                    children: u.map((B, H) =>
                      O.jsxs(
                        ut,
                        {
                          align: "center",
                          gap: "3",
                          p: "2",
                          style: {
                            background: "var(--gray-a3)",
                            borderRadius: "var(--radius-2)",
                            borderLeft: B.isPriority
                              ? "3px solid var(--purple-9)"
                              : "none",
                          },
                          children: [
                            O.jsx(fi, { color: "crimson", children: H + 1 }),
                            O.jsx(We, {
                              weight: "bold",
                              children: B.actionName,
                            }),
                            B.isPriority &&
                              O.jsx(fi, {
                                color: "purple",
                                children: "PRIORITY",
                              }),
                            O.jsx(We, {
                              size: "2",
                              color: "gray",
                              children: z(B.sender),
                            }),
                          ],
                        },
                        `${B.sender}-${B.timestamp}-${H}`,
                      ),
                    ),
                  }),
            ],
          }),
          O.jsxs(_n, {
            children: [
              O.jsx(hs, { size: "3", mb: "3", children: "Event Log" }),
              O.jsx(mi, {
                style: {
                  maxHeight: "200px",
                  overflowY: "auto",
                  fontFamily: "monospace",
                  fontSize: "12px",
                },
                children:
                  f.length === 0
                    ? O.jsx(We, { color: "gray", children: "No events yet" })
                    : f.map((B, H) =>
                        O.jsxs(
                          ut,
                          {
                            gap: "2",
                            py: "1",
                            children: [
                              O.jsx(We, {
                                color: "gray",
                                children: B.timestamp.toLocaleTimeString(),
                              }),
                              O.jsx(fi, {
                                color:
                                  B.type === "error"
                                    ? "red"
                                    : B.type === "success"
                                      ? "green"
                                      : B.type === "action_queued"
                                        ? "blue"
                                        : B.type === "action_processed"
                                          ? "orange"
                                          : "gray",
                                children: B.type,
                              }),
                              O.jsx(We, { children: B.message }),
                            ],
                          },
                          H,
                        ),
                      ),
              }),
            ],
          }),
        ],
      });
}
function b3() {
  const e = ju();
  return O.jsxs(O.Fragment, {
    children: [
      O.jsxs(ut, {
        position: "sticky",
        px: "4",
        py: "2",
        justify: "between",
        align: "center",
        style: {
          borderBottom: "1px solid var(--gray-a2)",
          background: "var(--color-background)",
          top: 0,
          zIndex: 100,
        },
        children: [
          O.jsxs(ut, {
            align: "center",
            gap: "3",
            children: [
              O.jsx(hs, { size: "5", children: "Multiplayer Robot Queue" }),
              e &&
                O.jsxs(We, {
                  size: "2",
                  color: "gray",
                  children: [e.address.slice(0, 6), "...", e.address.slice(-4)],
                }),
            ],
          }),
          O.jsx(mi, { children: O.jsx(vP, {}) }),
        ],
      }),
      O.jsx(VE, { size: "3", p: "4", children: O.jsx(w3, {}) }),
    ],
  });
}
const S3 = new UM();
Y1.createRoot(document.getElementById("root")).render(
  O.jsx(Gt.StrictMode, {
    children: O.jsx(DE, {
      appearance: "dark",
      children: O.jsx(VM, {
        client: S3,
        children: O.jsx(tP, {
          networks: y3,
          defaultNetwork: "testnet",
          children: O.jsx(RP, { autoConnect: !0, children: O.jsx(b3, {}) }),
        }),
      }),
    }),
  }),
);
