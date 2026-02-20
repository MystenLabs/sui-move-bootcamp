import * as e from "node:path";

import t, { dirname as r } from "node:path";

import { loadConfig as i, parseConfig as n, loadRef as a, outputIntrospectionFile as s, minifyIntrospection as l, load as c, readTSConfigFile as D } from "@gql.tada/internal";

import * as d from "node:fs/promises";

import f from "node:fs/promises";

import * as p from "node:readline";

import h, { emitKeypressEvents as g } from "node:readline";

import { printSchema as m } from "graphql";

import { createRequire as E } from "node:module";

import w from "typescript";

import { init as S } from "@0no-co/graphqlsp/api";

import b, { stdin as B, stdout as O } from "node:process";

import { WriteStream as k } from "node:tty";

import { Buffer as I } from "node:buffer";

import M, { ChildProcess as _ } from "node:child_process";

import U from "fs";

import G from "path";

import H from "child_process";

import { fileURLToPath as V } from "node:url";

import K, { constants as Y } from "node:os";

import { createWriteStream as z, createReadStream as J } from "node:fs";

import { setTimeout as X } from "node:timers/promises";

import Z from "stream";

import { debuglog as Q } from "node:util";

var ee;

!function(e) {
  e.StartOfInput = "\0";
  e.EndOfInput = "";
  e.EndOfPartialInput = "";
}(ee || (ee = {}));

var re;

!function(e) {
  e[e.InitialNode = 0] = "InitialNode";
  e[e.SuccessNode = 1] = "SuccessNode";
  e[e.ErrorNode = 2] = "ErrorNode";
  e[e.CustomNode = 3] = "CustomNode";
}(re || (re = {}));

var ie = -1;

var ne = /^(-h|--help)(?:=([0-9]+))?$/;

var ae = /^(--[a-z]+(?:-[a-z]+)*|-[a-zA-Z]+)$/;

var oe = /^-[a-zA-Z]{2,}$/;

var le = /^([^=]+)=([\s\S]*)$/;

var ce = "1" === process.env.DEBUG_CLI;

class UsageError extends Error {
  constructor(e) {
    super(e);
    this.clipanion = {
      type: "usage"
    };
    this.name = "UsageError";
  }
}

class UnknownSyntaxError extends Error {
  constructor(e, t) {
    super();
    this.input = e;
    this.candidates = t;
    this.clipanion = {
      type: "none"
    };
    this.name = "UnknownSyntaxError";
    if (0 === this.candidates.length) {
      this.message = "Command not found, but we're not sure what's the alternative.";
    } else if (this.candidates.every((e => null !== e.reason && e.reason === t[0].reason))) {
      var [{reason: r}] = this.candidates;
      this.message = `${r}\n\n${this.candidates.map((({usage: e}) => `$ ${e}`)).join("\n")}`;
    } else if (1 === this.candidates.length) {
      var [{usage: i}] = this.candidates;
      this.message = `Command not found; did you mean:\n\n$ ${i}\n${whileRunning(e)}`;
    } else {
      this.message = `Command not found; did you mean one of:\n\n${this.candidates.map((({usage: e}, t) => `${`${t}.`.padStart(4)} ${e}`)).join("\n")}\n\n${whileRunning(e)}`;
    }
  }
}

class AmbiguousSyntaxError extends Error {
  constructor(e, t) {
    super();
    this.input = e;
    this.usages = t;
    this.clipanion = {
      type: "none"
    };
    this.name = "AmbiguousSyntaxError";
    this.message = `Cannot find which to pick amongst the following alternatives:\n\n${this.usages.map(((e, t) => `${`${t}.`.padStart(4)} ${e}`)).join("\n")}\n\n${whileRunning(e)}`;
  }
}

var whileRunning = e => `While running ${e.filter((e => e !== ee.EndOfInput && e !== ee.EndOfPartialInput)).map((e => {
  var t = JSON.stringify(e);
  if (e.match(/\s/) || 0 === e.length || t !== `"${e}"`) {
    return t;
  } else {
    return e;
  }
})).join(" ")}`;

var De = Array(80).fill("━");

for (var de = 0; de <= 24; ++de) {
  De[De.length - de] = `[38;5;${232 + de}m━`;
}

var fe = {
  header: e => `[1m━━━ ${e}${e.length < 75 ? ` ${De.slice(e.length + 5).join("")}` : ":"}[0m`,
  bold: e => `[1m${e}[22m`,
  error: e => `[31m[1m${e}[22m[39m`,
  code: e => `[36m${e}[39m`
};

var pe = {
  header: e => e,
  bold: e => e,
  error: e => e,
  code: e => e
};

function formatMarkdownish(e, {format: t, paragraphs: r}) {
  e = function dedent(e) {
    var t = e.split("\n");
    var r = t.filter((e => e.match(/\S/)));
    var i = r.length > 0 ? r.reduce(((e, t) => Math.min(e, t.length - t.trimStart().length)), Number.MAX_VALUE) : 0;
    return t.map((e => e.slice(i).trimRight())).join("\n");
  }(e = e.replace(/\r\n?/g, "\n"));
  e = (e = (e = e.replace(/^\n+|\n+$/g, "")).replace(/^(\s*)-([^\n]*?)\n+/gm, "$1-$2\n\n")).replace(/\n(\n)?\n*/g, ((e, t) => t ? t : " "));
  if (r) {
    e = e.split(/\n/).map((e => {
      var t = e.match(/^\s*[*-][\t ]+(.*)/);
      if (!t) {
        return e.match(/(.{1,80})(?: |$)/g).join("\n");
      }
      var r = e.length - e.trimStart().length;
      return t[1].match(new RegExp(`(.{1,${78 - r}})(?: |$)`, "g")).map(((e, t) => " ".repeat(r) + (0 === t ? "- " : "  ") + e)).join("\n");
    })).join("\n\n");
  }
  return (e = (e = e.replace(/(`+)((?:.|[\n])*?)\1/g, ((e, r, i) => t.code(r + i + r)))).replace(/(\*\*)((?:.|[\n])*?)\1/g, ((e, r, i) => t.bold(r + i + r)))) ? `${e}\n` : "";
}

var he = Symbol("clipanion/isOption");

function makeCommandOption(e) {
  return {
    ...e,
    [he]: !0
  };
}

function rerouteArguments(e, t) {
  if (void 0 === e) {
    return [ e, t ];
  }
  if ("object" == typeof e && null !== e && !Array.isArray(e)) {
    return [ void 0, e ];
  } else {
    return [ e, t ];
  }
}

function cleanValidationError(e, {mergeName: t = !1} = {}) {
  var r = e.match(/^([^:]+): (.*)$/m);
  if (!r) {
    return "validation failed";
  }
  var [, i, n] = r;
  if (t) {
    n = n[0].toLowerCase() + n.slice(1);
  }
  return n = "." !== i || !t ? `${i.replace(/^\.(\[|$)/, "$1")}: ${n}` : `: ${n}`;
}

function formatError(e, t) {
  if (1 === t.length) {
    return new UsageError(`${e}${cleanValidationError(t[0], {
      mergeName: !0
    })}`);
  } else {
    return new UsageError(`${e}:\n${t.map((e => `\n- ${cleanValidationError(e)}`)).join("")}`);
  }
}

function applyValidator(e, t, r) {
  if (void 0 === r) {
    return t;
  }
  var i = [];
  var n = [];
  var coercion = e => {
    var r = t;
    t = e;
    return coercion.bind(null, r);
  };
  if (!r(t, {
    errors: i,
    coercions: n,
    coercion
  })) {
    throw formatError(`Invalid value for ${e}`, i);
  }
  for (var [, a] of n) {
    a();
  }
  return t;
}

class Command {
  constructor() {
    this.help = !1;
  }
  static Usage(e) {
    return e;
  }
  async catch(e) {
    throw e;
  }
  async validateAndExecute() {
    var e = this.constructor.schema;
    if (Array.isArray(e)) {
      var {isDict: t, isUnknown: r, applyCascade: i} = await Promise.resolve().then((function() {
        return Ue;
      }));
      var n = [];
      var a = [];
      if (!i(t(r()), e)(this, {
        errors: n,
        coercions: a
      })) {
        throw formatError("Invalid option schema", n);
      }
      for (var [, s] of a) {
        s();
      }
    } else if (null != e) {
      throw new Error("Invalid command schema");
    }
    var l = await this.execute();
    if (void 0 !== l) {
      return l;
    } else {
      return 0;
    }
  }
}

Command.isOption = he;

Command.Default = [];

function debug(e) {
  if (ce) {
    console.log(e);
  }
}

var ge = {
  candidateUsage: null,
  requiredOptions: [],
  errorMessage: null,
  ignoreOptions: !1,
  path: [],
  positionals: [],
  options: [],
  remainder: null,
  selectedIndex: ie,
  tokens: []
};

function makeStateMachine() {
  var e = {
    nodes: []
  };
  for (var t = 0; t < re.CustomNode; ++t) {
    e.nodes.push({
      dynamics: [],
      shortcuts: [],
      statics: {}
    });
  }
  return e;
}

function injectNode(e, t) {
  e.nodes.push(t);
  return e.nodes.length - 1;
}

function runMachineInternal(e, t, r = !1) {
  debug(`Running a vm on ${JSON.stringify(t)}`);
  var i = [ {
    node: re.InitialNode,
    state: {
      candidateUsage: null,
      requiredOptions: [],
      errorMessage: null,
      ignoreOptions: !1,
      options: [],
      path: [],
      positionals: [],
      remainder: null,
      selectedIndex: null,
      tokens: []
    }
  } ];
  !function debugMachine(e, {prefix: t = ""} = {}) {
    if (ce) {
      debug(`${t}Nodes are:`);
      for (var r = 0; r < e.nodes.length; ++r) {
        debug(`${t}  ${r}: ${JSON.stringify(e.nodes[r])}`);
      }
    }
  }(e, {
    prefix: "  "
  });
  var n = [ ee.StartOfInput, ...t ];
  for (var a = 0; a < n.length; ++a) {
    var s = n[a];
    var l = s === ee.EndOfInput || s === ee.EndOfPartialInput;
    var c = a - 1;
    debug(`  Processing ${JSON.stringify(s)}`);
    var D = [];
    for (var {node: d, state: f} of i) {
      debug(`    Current node is ${d}`);
      var p = e.nodes[d];
      if (d === re.ErrorNode) {
        D.push({
          node: d,
          state: f
        });
        continue;
      }
      console.assert(0 === p.shortcuts.length, "Shortcuts should have been eliminated by now");
      var h = Object.prototype.hasOwnProperty.call(p.statics, s);
      if (!r || a < n.length - 1 || h) {
        if (h) {
          var g = p.statics[s];
          for (var {to: m, reducer: E} of g) {
            D.push({
              node: m,
              state: void 0 !== E ? execute(me, E, f, s, c) : f
            });
            debug(`      Static transition to ${m} found`);
          }
        } else {
          debug("      No static transition found");
        }
      } else {
        var w = !1;
        for (var S of Object.keys(p.statics)) {
          if (!S.startsWith(s)) {
            continue;
          }
          if (s === S) {
            for (var {to: b, reducer: B} of p.statics[S]) {
              D.push({
                node: b,
                state: void 0 !== B ? execute(me, B, f, s, c) : f
              });
              debug(`      Static transition to ${b} found`);
            }
          } else {
            for (var {to: O} of p.statics[S]) {
              D.push({
                node: O,
                state: {
                  ...f,
                  remainder: S.slice(s.length)
                }
              });
              debug(`      Static transition to ${O} found (partial match)`);
            }
          }
          w = !0;
        }
        if (!w) {
          debug("      No partial static transition found");
        }
      }
      if (!l) {
        for (var [k, {to: I, reducer: M}] of p.dynamics) {
          if (execute(ve, k, f, s, c)) {
            D.push({
              node: I,
              state: void 0 !== M ? execute(me, M, f, s, c) : f
            });
            debug(`      Dynamic transition to ${I} found (via ${k})`);
          }
        }
      }
    }
    if (0 === D.length && l && 1 === t.length) {
      return [ {
        node: re.InitialNode,
        state: ge
      } ];
    }
    if (0 === D.length) {
      throw new UnknownSyntaxError(t, i.filter((({node: e}) => e !== re.ErrorNode)).map((({state: e}) => ({
        usage: e.candidateUsage,
        reason: null
      }))));
    }
    if (D.every((({node: e}) => e === re.ErrorNode))) {
      throw new UnknownSyntaxError(t, D.map((({state: e}) => ({
        usage: e.candidateUsage,
        reason: e.errorMessage
      }))));
    }
    i = trimSmallerBranches(D);
  }
  if (i.length > 0) {
    debug("  Results:");
    for (var _ of i) {
      debug(`    - ${_.node} -> ${JSON.stringify(_.state)}`);
    }
  } else {
    debug("  No results");
  }
  return i;
}

function runMachine(e, t, {endToken: r = ee.EndOfInput} = {}) {
  return function selectBestState(e, t) {
    var r = t.filter((e => null !== e.selectedIndex));
    if (0 === r.length) {
      throw new Error;
    }
    var i = r.filter((e => e.selectedIndex === ie || e.requiredOptions.every((t => t.some((t => e.options.find((e => e.name === t))))))));
    if (0 === i.length) {
      throw new UnknownSyntaxError(e, r.map((e => ({
        usage: e.candidateUsage,
        reason: null
      }))));
    }
    var n = 0;
    for (var a of i) {
      if (a.path.length > n) {
        n = a.path.length;
      }
    }
    var s = i.filter((e => e.path.length === n));
    var getPositionalCount = e => e.positionals.filter((({extra: e}) => !e)).length + e.options.length;
    var l = s.map((e => ({
      state: e,
      positionalCount: getPositionalCount(e)
    })));
    var c = 0;
    for (var {positionalCount: D} of l) {
      if (D > c) {
        c = D;
      }
    }
    var d = function aggregateHelpStates(e) {
      var t = [];
      var r = [];
      for (var i of e) {
        if (i.selectedIndex === ie) {
          r.push(i);
        } else {
          t.push(i);
        }
      }
      if (r.length > 0) {
        t.push({
          ...ge,
          path: findCommonPrefix(...r.map((e => e.path))),
          options: r.reduce(((e, t) => e.concat(t.options)), [])
        });
      }
      return t;
    }(l.filter((({positionalCount: e}) => e === c)).map((({state: e}) => e)));
    if (d.length > 1) {
      throw new AmbiguousSyntaxError(e, d.map((e => e.candidateUsage)));
    }
    return d[0];
  }(t, runMachineInternal(e, [ ...t, r ]).map((({state: e}) => e)));
}

function trimSmallerBranches(e) {
  var t = 0;
  for (var {state: r} of e) {
    if (r.path.length > t) {
      t = r.path.length;
    }
  }
  return e.filter((({state: e}) => e.path.length === t));
}

function findCommonPrefix(e, t, ...r) {
  if (void 0 === t) {
    return Array.from(e);
  }
  return findCommonPrefix(e.filter(((e, r) => e === t[r])), ...r);
}

function isTerminalNode(e) {
  return e === re.SuccessNode || e === re.ErrorNode;
}

function cloneTransition(e, t = 0) {
  return {
    to: !isTerminalNode(e.to) ? e.to >= re.CustomNode ? e.to + t - re.CustomNode + 1 : e.to + t : e.to,
    reducer: e.reducer
  };
}

function cloneNode(e, t = 0) {
  var r = {
    dynamics: [],
    shortcuts: [],
    statics: {}
  };
  for (var [i, n] of e.dynamics) {
    r.dynamics.push([ i, cloneTransition(n, t) ]);
  }
  for (var a of e.shortcuts) {
    r.shortcuts.push(cloneTransition(a, t));
  }
  for (var [s, l] of Object.entries(e.statics)) {
    r.statics[s] = l.map((e => cloneTransition(e, t)));
  }
  return r;
}

function registerDynamic(e, t, r, i, n) {
  e.nodes[t].dynamics.push([ r, {
    to: i,
    reducer: n
  } ]);
}

function registerShortcut(e, t, r, i) {
  e.nodes[t].shortcuts.push({
    to: r,
    reducer: i
  });
}

function registerStatic(e, t, r, i, n) {
  (!Object.prototype.hasOwnProperty.call(e.nodes[t].statics, r) ? e.nodes[t].statics[r] = [] : e.nodes[t].statics[r]).push({
    to: i,
    reducer: n
  });
}

function execute(e, t, r, i, n) {
  if (Array.isArray(t)) {
    var [a, ...s] = t;
    return e[a](r, i, n, ...s);
  } else {
    return e[t](r, i, n);
  }
}

var ve = {
  always: () => !0,
  isOptionLike: (e, t) => !e.ignoreOptions && "-" !== t && t.startsWith("-"),
  isNotOptionLike: (e, t) => e.ignoreOptions || "-" === t || !t.startsWith("-"),
  isOption: (e, t, r, i) => !e.ignoreOptions && t === i,
  isBatchOption: (e, t, r, i) => !e.ignoreOptions && oe.test(t) && [ ...t.slice(1) ].every((e => i.has(`-${e}`))),
  isBoundOption: (e, t, r, i, n) => {
    var a = t.match(le);
    return !e.ignoreOptions && !!a && ae.test(a[1]) && i.has(a[1]) && n.filter((e => e.nameSet.includes(a[1]))).every((e => e.allowBinding));
  },
  isNegatedOption: (e, t, r, i) => !e.ignoreOptions && t === `--no-${i.slice(2)}`,
  isHelp: (e, t) => !e.ignoreOptions && ne.test(t),
  isUnsupportedOption: (e, t, r, i) => !e.ignoreOptions && t.startsWith("-") && ae.test(t) && !i.has(t),
  isInvalidOption: (e, t) => !e.ignoreOptions && t.startsWith("-") && !ae.test(t)
};

var me = {
  setCandidateState: (e, t, r, i) => ({
    ...e,
    ...i
  }),
  setSelectedIndex: (e, t, r, i) => ({
    ...e,
    selectedIndex: i
  }),
  pushBatch: (e, t, r, i) => {
    var n = e.options.slice();
    var a = e.tokens.slice();
    for (var s = 1; s < t.length; ++s) {
      var l = i.get(`-${t[s]}`);
      var c = 1 === s ? [ 0, 2 ] : [ s, s + 1 ];
      n.push({
        name: l,
        value: !0
      });
      a.push({
        segmentIndex: r,
        type: "option",
        option: l,
        slice: c
      });
    }
    return {
      ...e,
      options: n,
      tokens: a
    };
  },
  pushBound: (e, t, r) => {
    var [, i, n] = t.match(le);
    var a = e.options.concat({
      name: i,
      value: n
    });
    var s = e.tokens.concat([ {
      segmentIndex: r,
      type: "option",
      slice: [ 0, i.length ],
      option: i
    }, {
      segmentIndex: r,
      type: "assign",
      slice: [ i.length, i.length + 1 ]
    }, {
      segmentIndex: r,
      type: "value",
      slice: [ i.length + 1, i.length + n.length + 1 ]
    } ]);
    return {
      ...e,
      options: a,
      tokens: s
    };
  },
  pushPath: (e, t, r) => {
    var i = e.path.concat(t);
    var n = e.tokens.concat({
      segmentIndex: r,
      type: "path"
    });
    return {
      ...e,
      path: i,
      tokens: n
    };
  },
  pushPositional: (e, t, r) => {
    var i = e.positionals.concat({
      value: t,
      extra: !1
    });
    var n = e.tokens.concat({
      segmentIndex: r,
      type: "positional"
    });
    return {
      ...e,
      positionals: i,
      tokens: n
    };
  },
  pushExtra: (e, t, r) => {
    var i = e.positionals.concat({
      value: t,
      extra: !0
    });
    var n = e.tokens.concat({
      segmentIndex: r,
      type: "positional"
    });
    return {
      ...e,
      positionals: i,
      tokens: n
    };
  },
  pushExtraNoLimits: (e, t, r) => {
    var i = e.positionals.concat({
      value: t,
      extra: Ce
    });
    var n = e.tokens.concat({
      segmentIndex: r,
      type: "positional"
    });
    return {
      ...e,
      positionals: i,
      tokens: n
    };
  },
  pushTrue: (e, t, r, i) => {
    var n = e.options.concat({
      name: i,
      value: !0
    });
    var a = e.tokens.concat({
      segmentIndex: r,
      type: "option",
      option: i
    });
    return {
      ...e,
      options: n,
      tokens: a
    };
  },
  pushFalse: (e, t, r, i) => {
    var n = e.options.concat({
      name: i,
      value: !1
    });
    var a = e.tokens.concat({
      segmentIndex: r,
      type: "option",
      option: i
    });
    return {
      ...e,
      options: n,
      tokens: a
    };
  },
  pushUndefined: (e, t, r, i) => {
    var n = e.options.concat({
      name: t,
      value: void 0
    });
    var a = e.tokens.concat({
      segmentIndex: r,
      type: "option",
      option: t
    });
    return {
      ...e,
      options: n,
      tokens: a
    };
  },
  pushStringValue: (e, t, r) => {
    var i;
    var n = e.options[e.options.length - 1];
    var a = e.options.slice();
    var s = e.tokens.concat({
      segmentIndex: r,
      type: "value"
    });
    n.value = (null !== (i = n.value) && void 0 !== i ? i : []).concat([ t ]);
    return {
      ...e,
      options: a,
      tokens: s
    };
  },
  setStringValue: (e, t, r) => {
    var i = e.options[e.options.length - 1];
    var n = e.options.slice();
    var a = e.tokens.concat({
      segmentIndex: r,
      type: "value"
    });
    i.value = t;
    return {
      ...e,
      options: n,
      tokens: a
    };
  },
  inhibateOptions: e => ({
    ...e,
    ignoreOptions: !0
  }),
  useHelp: (e, t, r, i) => {
    var [, , n] = t.match(ne);
    if (void 0 !== n) {
      return {
        ...e,
        options: [ {
          name: "-c",
          value: String(i)
        }, {
          name: "-i",
          value: n
        } ]
      };
    } else {
      return {
        ...e,
        options: [ {
          name: "-c",
          value: String(i)
        } ]
      };
    }
  },
  setError: (e, t, r, i) => {
    if (t === ee.EndOfInput || t === ee.EndOfPartialInput) {
      return {
        ...e,
        errorMessage: `${i}.`
      };
    } else {
      return {
        ...e,
        errorMessage: `${i} ("${t}").`
      };
    }
  },
  setOptionArityError: (e, t) => {
    var r = e.options[e.options.length - 1];
    return {
      ...e,
      errorMessage: `Not enough arguments to option ${r.name}.`
    };
  }
};

var Ce = Symbol();

class CommandBuilder {
  constructor(e, t) {
    this.allOptionNames = new Map;
    this.arity = {
      leading: [],
      trailing: [],
      extra: [],
      proxy: !1
    };
    this.options = [];
    this.paths = [];
    this.cliIndex = e;
    this.cliOpts = t;
  }
  addPath(e) {
    this.paths.push(e);
  }
  setArity({leading: e = this.arity.leading, trailing: t = this.arity.trailing, extra: r = this.arity.extra, proxy: i = this.arity.proxy}) {
    Object.assign(this.arity, {
      leading: e,
      trailing: t,
      extra: r,
      proxy: i
    });
  }
  addPositional({name: e = "arg", required: t = !0} = {}) {
    if (!t && this.arity.extra === Ce) {
      throw new Error("Optional parameters cannot be declared when using .rest() or .proxy()");
    }
    if (!t && this.arity.trailing.length > 0) {
      throw new Error("Optional parameters cannot be declared after the required trailing positional arguments");
    }
    if (!t && this.arity.extra !== Ce) {
      this.arity.extra.push(e);
    } else if (this.arity.extra !== Ce && 0 === this.arity.extra.length) {
      this.arity.leading.push(e);
    } else {
      this.arity.trailing.push(e);
    }
  }
  addRest({name: e = "arg", required: t = 0} = {}) {
    if (this.arity.extra === Ce) {
      throw new Error("Infinite lists cannot be declared multiple times in the same command");
    }
    if (this.arity.trailing.length > 0) {
      throw new Error("Infinite lists cannot be declared after the required trailing positional arguments");
    }
    for (var r = 0; r < t; ++r) {
      this.addPositional({
        name: e
      });
    }
    this.arity.extra = Ce;
  }
  addProxy({required: e = 0} = {}) {
    this.addRest({
      required: e
    });
    this.arity.proxy = !0;
  }
  addOption({names: e, description: t, arity: r = 0, hidden: i = !1, required: n = !1, allowBinding: a = !0}) {
    if (!a && r > 1) {
      throw new Error("The arity cannot be higher than 1 when the option only supports the --arg=value syntax");
    }
    if (!Number.isInteger(r)) {
      throw new Error(`The arity must be an integer, got ${r}`);
    }
    if (r < 0) {
      throw new Error(`The arity must be positive, got ${r}`);
    }
    var s = e.reduce(((e, t) => t.length > e.length ? t : e), "");
    for (var l of e) {
      this.allOptionNames.set(l, s);
    }
    this.options.push({
      preferredName: s,
      nameSet: e,
      description: t,
      arity: r,
      hidden: i,
      required: n,
      allowBinding: a
    });
  }
  setContext(e) {
    this.context = e;
  }
  usage({detailed: e = !0, inlineOptions: t = !0} = {}) {
    var r = [ this.cliOpts.binaryName ];
    var i = [];
    if (this.paths.length > 0) {
      r.push(...this.paths[0]);
    }
    if (e) {
      for (var {preferredName: n, nameSet: a, arity: s, hidden: l, description: c, required: D} of this.options) {
        if (l) {
          continue;
        }
        var d = [];
        for (var f = 0; f < s; ++f) {
          d.push(` #${f}`);
        }
        var p = `${a.join(",")}${d.join("")}`;
        if (!t && c) {
          i.push({
            preferredName: n,
            nameSet: a,
            definition: p,
            description: c,
            required: D
          });
        } else {
          r.push(D ? `<${p}>` : `[${p}]`);
        }
      }
      r.push(...this.arity.leading.map((e => `<${e}>`)));
      if (this.arity.extra === Ce) {
        r.push("...");
      } else {
        r.push(...this.arity.extra.map((e => `[${e}]`)));
      }
      r.push(...this.arity.trailing.map((e => `<${e}>`)));
    }
    return {
      usage: r.join(" "),
      options: i
    };
  }
  compile() {
    if (void 0 === this.context) {
      throw new Error("Assertion failed: No context attached");
    }
    var e = makeStateMachine();
    var t;
    var r = this.usage().usage;
    var i = this.options.filter((e => e.required)).map((e => e.nameSet));
    t = injectNode(e, {
      dynamics: [],
      shortcuts: [],
      statics: {}
    });
    registerStatic(e, re.InitialNode, ee.StartOfInput, t, [ "setCandidateState", {
      candidateUsage: r,
      requiredOptions: i
    } ]);
    var n = this.arity.proxy ? "always" : "isNotOptionLike";
    var a = this.paths.length > 0 ? this.paths : [ [] ];
    for (var s of a) {
      var l = t;
      if (s.length > 0) {
        var c = injectNode(e, {
          dynamics: [],
          shortcuts: [],
          statics: {}
        });
        registerShortcut(e, l, c);
        this.registerOptions(e, c);
        l = c;
      }
      for (var D = 0; D < s.length; ++D) {
        var d = injectNode(e, {
          dynamics: [],
          shortcuts: [],
          statics: {}
        });
        registerStatic(e, l, s[D], d, "pushPath");
        l = d;
        if (D + 1 < s.length) {
          var f = injectNode(e, {
            dynamics: [],
            shortcuts: [],
            statics: {}
          });
          registerDynamic(e, l, "isHelp", f, [ "useHelp", this.cliIndex ]);
          registerStatic(e, f, ee.EndOfInput, re.SuccessNode, [ "setSelectedIndex", ie ]);
        }
      }
      if (this.arity.leading.length > 0 || !this.arity.proxy) {
        var p = injectNode(e, {
          dynamics: [],
          shortcuts: [],
          statics: {}
        });
        registerDynamic(e, l, "isHelp", p, [ "useHelp", this.cliIndex ]);
        registerDynamic(e, p, "always", p, "pushExtra");
        registerStatic(e, p, ee.EndOfInput, re.SuccessNode, [ "setSelectedIndex", ie ]);
        this.registerOptions(e, l);
      }
      if (this.arity.leading.length > 0) {
        registerStatic(e, l, ee.EndOfInput, re.ErrorNode, [ "setError", "Not enough positional arguments" ]);
        registerStatic(e, l, ee.EndOfPartialInput, re.SuccessNode, [ "setSelectedIndex", this.cliIndex ]);
      }
      var h = l;
      for (var g = 0; g < this.arity.leading.length; ++g) {
        var m = injectNode(e, {
          dynamics: [],
          shortcuts: [],
          statics: {}
        });
        if (!this.arity.proxy || g + 1 !== this.arity.leading.length) {
          this.registerOptions(e, m);
        }
        if (this.arity.trailing.length > 0 || g + 1 !== this.arity.leading.length) {
          registerStatic(e, m, ee.EndOfInput, re.ErrorNode, [ "setError", "Not enough positional arguments" ]);
          registerStatic(e, m, ee.EndOfPartialInput, re.SuccessNode, [ "setSelectedIndex", this.cliIndex ]);
        }
        registerDynamic(e, h, "isNotOptionLike", m, "pushPositional");
        h = m;
      }
      var E = h;
      if (this.arity.extra === Ce || this.arity.extra.length > 0) {
        var w = injectNode(e, {
          dynamics: [],
          shortcuts: [],
          statics: {}
        });
        registerShortcut(e, h, w);
        if (this.arity.extra === Ce) {
          var S = injectNode(e, {
            dynamics: [],
            shortcuts: [],
            statics: {}
          });
          if (!this.arity.proxy) {
            this.registerOptions(e, S);
          }
          registerDynamic(e, h, n, S, "pushExtraNoLimits");
          registerDynamic(e, S, n, S, "pushExtraNoLimits");
          registerShortcut(e, S, w);
        } else {
          for (var b = 0; b < this.arity.extra.length; ++b) {
            var B = injectNode(e, {
              dynamics: [],
              shortcuts: [],
              statics: {}
            });
            if (!this.arity.proxy || b > 0) {
              this.registerOptions(e, B);
            }
            registerDynamic(e, E, n, B, "pushExtra");
            registerShortcut(e, B, w);
            E = B;
          }
        }
        E = w;
      }
      if (this.arity.trailing.length > 0) {
        registerStatic(e, E, ee.EndOfInput, re.ErrorNode, [ "setError", "Not enough positional arguments" ]);
        registerStatic(e, E, ee.EndOfPartialInput, re.SuccessNode, [ "setSelectedIndex", this.cliIndex ]);
      }
      var O = E;
      for (var k = 0; k < this.arity.trailing.length; ++k) {
        var I = injectNode(e, {
          dynamics: [],
          shortcuts: [],
          statics: {}
        });
        if (!this.arity.proxy) {
          this.registerOptions(e, I);
        }
        if (k + 1 < this.arity.trailing.length) {
          registerStatic(e, I, ee.EndOfInput, re.ErrorNode, [ "setError", "Not enough positional arguments" ]);
          registerStatic(e, I, ee.EndOfPartialInput, re.SuccessNode, [ "setSelectedIndex", this.cliIndex ]);
        }
        registerDynamic(e, O, "isNotOptionLike", I, "pushPositional");
        O = I;
      }
      registerDynamic(e, O, n, re.ErrorNode, [ "setError", "Extraneous positional argument" ]);
      registerStatic(e, O, ee.EndOfInput, re.SuccessNode, [ "setSelectedIndex", this.cliIndex ]);
      registerStatic(e, O, ee.EndOfPartialInput, re.SuccessNode, [ "setSelectedIndex", this.cliIndex ]);
    }
    return {
      machine: e,
      context: this.context
    };
  }
  registerOptions(e, t) {
    registerDynamic(e, t, [ "isOption", "--" ], t, "inhibateOptions");
    registerDynamic(e, t, [ "isBatchOption", this.allOptionNames ], t, [ "pushBatch", this.allOptionNames ]);
    registerDynamic(e, t, [ "isBoundOption", this.allOptionNames, this.options ], t, "pushBound");
    registerDynamic(e, t, [ "isUnsupportedOption", this.allOptionNames ], re.ErrorNode, [ "setError", "Unsupported option name" ]);
    registerDynamic(e, t, [ "isInvalidOption" ], re.ErrorNode, [ "setError", "Invalid option name" ]);
    for (var r of this.options) {
      if (0 === r.arity) {
        for (var i of r.nameSet) {
          registerDynamic(e, t, [ "isOption", i ], t, [ "pushTrue", r.preferredName ]);
          if (i.startsWith("--") && !i.startsWith("--no-")) {
            registerDynamic(e, t, [ "isNegatedOption", i ], t, [ "pushFalse", r.preferredName ]);
          }
        }
      } else {
        var n = injectNode(e, {
          dynamics: [],
          shortcuts: [],
          statics: {}
        });
        for (var a of r.nameSet) {
          registerDynamic(e, t, [ "isOption", a ], n, [ "pushUndefined", r.preferredName ]);
        }
        for (var s = 0; s < r.arity; ++s) {
          var l = injectNode(e, {
            dynamics: [],
            shortcuts: [],
            statics: {}
          });
          registerStatic(e, n, ee.EndOfInput, re.ErrorNode, "setOptionArityError");
          registerStatic(e, n, ee.EndOfPartialInput, re.ErrorNode, "setOptionArityError");
          registerDynamic(e, n, "isOptionLike", re.ErrorNode, "setOptionArityError");
          registerDynamic(e, n, "isNotOptionLike", l, 1 === r.arity ? "setStringValue" : "pushStringValue");
          n = l;
        }
        registerShortcut(e, n, t);
      }
    }
  }
}

class CliBuilder {
  constructor({binaryName: e = "..."} = {}) {
    this.builders = [];
    this.opts = {
      binaryName: e
    };
  }
  static build(e, t = {}) {
    return new CliBuilder(t).commands(e).compile();
  }
  getBuilderByIndex(e) {
    if (!(e >= 0 && e < this.builders.length)) {
      throw new Error(`Assertion failed: Out-of-bound command index (${e})`);
    }
    return this.builders[e];
  }
  commands(e) {
    for (var t of e) {
      t(this.command());
    }
    return this;
  }
  command() {
    var e = new CommandBuilder(this.builders.length, this.opts);
    this.builders.push(e);
    return e;
  }
  compile() {
    var e = [];
    var t = [];
    for (var r of this.builders) {
      var {machine: i, context: n} = r.compile();
      e.push(i);
      t.push(n);
    }
    var a = function makeAnyOfMachine(e) {
      var t = makeStateMachine();
      var r = [];
      var i = t.nodes.length;
      for (var n of e) {
        r.push(i);
        for (var a = 0; a < n.nodes.length; ++a) {
          if (!isTerminalNode(a)) {
            t.nodes.push(cloneNode(n.nodes[a], i));
          }
        }
        i += n.nodes.length - re.CustomNode + 1;
      }
      for (var s of r) {
        registerShortcut(t, re.InitialNode, s);
      }
      return t;
    }(e);
    !function simplifyMachine(e) {
      var t = new Set;
      var process = r => {
        if (t.has(r)) {
          return;
        }
        t.add(r);
        var i = e.nodes[r];
        for (var n of Object.values(i.statics)) {
          for (var {to: a} of n) {
            process(a);
          }
        }
        for (var [, {to: s}] of i.dynamics) {
          process(s);
        }
        for (var {to: l} of i.shortcuts) {
          process(l);
        }
        var c = new Set(i.shortcuts.map((({to: e}) => e)));
        while (i.shortcuts.length > 0) {
          var {to: D} = i.shortcuts.shift();
          var d = e.nodes[D];
          for (var [f, p] of Object.entries(d.statics)) {
            var h = !Object.prototype.hasOwnProperty.call(i.statics, f) ? i.statics[f] = [] : i.statics[f];
            var _loop = function(e) {
              if (!h.some((({to: t}) => e.to === t))) {
                h.push(e);
              }
            };
            for (var g of p) {
              _loop(g);
            }
          }
          var _loop2 = function(e, t) {
            if (!i.dynamics.some((([r, {to: i}]) => e === r && t.to === i))) {
              i.dynamics.push([ e, t ]);
            }
          };
          for (var [m, E] of d.dynamics) {
            _loop2(m, E);
          }
          for (var w of d.shortcuts) {
            if (!c.has(w.to)) {
              i.shortcuts.push(w);
              c.add(w.to);
            }
          }
        }
      };
      process(re.InitialNode);
    }(a);
    return {
      machine: a,
      contexts: t,
      process: (e, {partial: t} = {}) => runMachine(a, e, {
        endToken: t ? ee.EndOfPartialInput : ee.EndOfInput
      })
    };
  }
}

class HelpCommand extends Command {
  constructor(e) {
    super();
    this.contexts = e;
    this.commands = [];
  }
  static from(e, t) {
    var r = new HelpCommand(t);
    r.path = e.path;
    for (var i of e.options) {
      switch (i.name) {
       case "-c":
        r.commands.push(Number(i.value));
        break;

       case "-i":
        r.index = Number(i.value);
      }
    }
    return r;
  }
  async execute() {
    var e = this.commands;
    if (void 0 !== this.index && this.index >= 0 && this.index < e.length) {
      e = [ e[this.index] ];
    }
    if (0 === e.length) {
      this.context.stdout.write(this.cli.usage());
    } else if (1 === e.length) {
      this.context.stdout.write(this.cli.usage(this.contexts[e[0]].commandClass, {
        detailed: !0
      }));
    } else if (e.length > 1) {
      this.context.stdout.write("Multiple commands match your selection:\n");
      this.context.stdout.write("\n");
      var t = 0;
      for (var r of this.commands) {
        this.context.stdout.write(this.cli.usage(this.contexts[r].commandClass, {
          prefix: (t++ + ". ").padStart(5)
        }));
      }
      this.context.stdout.write("\n");
      this.context.stdout.write("Run again with -h=<index> to see the longer details of any of those commands.\n");
    }
  }
}

var ye = Symbol("clipanion/errorCommand");

class Cli {
  constructor({binaryLabel: e, binaryName: t = "...", binaryVersion: r, enableCapture: i = !1, enableColors: n} = {}) {
    this.registrations = new Map;
    this.builder = new CliBuilder({
      binaryName: t
    });
    this.binaryLabel = e;
    this.binaryName = t;
    this.binaryVersion = r;
    this.enableCapture = i;
    this.enableColors = n;
  }
  static from(e, t = {}) {
    var r = new Cli(t);
    var i = Array.isArray(e) ? e : [ e ];
    for (var n of i) {
      r.register(n);
    }
    return r;
  }
  register(e) {
    var t;
    var r = new Map;
    var i = new e;
    for (var n in i) {
      var a = i[n];
      if ("object" == typeof a && null !== a && a[Command.isOption]) {
        r.set(n, a);
      }
    }
    var s = this.builder.command();
    var l = s.cliIndex;
    var c = null !== (t = e.paths) && void 0 !== t ? t : i.paths;
    if (void 0 !== c) {
      for (var D of c) {
        s.addPath(D);
      }
    }
    this.registrations.set(e, {
      specs: r,
      builder: s,
      index: l
    });
    for (var [d, {definition: f}] of r.entries()) {
      f(s, d);
    }
    s.setContext({
      commandClass: e
    });
  }
  process(e, t) {
    var {input: r, context: i, partial: n} = "object" == typeof e && Array.isArray(e) ? {
      input: e,
      context: t
    } : e;
    var {contexts: a, process: s} = this.builder.compile();
    var l = s(r, {
      partial: n
    });
    var c = {
      ...Cli.defaultContext,
      ...i
    };
    if (l.selectedIndex === ie) {
      var D = HelpCommand.from(l, a);
      D.context = c;
      D.tokens = l.tokens;
      return D;
    } else {
      var {commandClass: d} = a[l.selectedIndex];
      var f = this.registrations.get(d);
      if (void 0 === f) {
        throw new Error("Assertion failed: Expected the command class to have been registered.");
      }
      var p = new d;
      p.context = c;
      p.tokens = l.tokens;
      p.path = l.path;
      try {
        for (var [h, {transformer: g}] of f.specs.entries()) {
          p[h] = g(f.builder, h, l, c);
        }
        return p;
      } catch (e) {
        e[ye] = p;
        throw e;
      }
    }
  }
  async run(e, t) {
    var r, i;
    var n;
    var a = {
      ...Cli.defaultContext,
      ...t
    };
    var s = null !== (r = this.enableColors) && void 0 !== r ? r : a.colorDepth > 1;
    if (!Array.isArray(e)) {
      n = e;
    } else {
      try {
        n = this.process(e, a);
      } catch (e) {
        a.stdout.write(this.error(e, {
          colored: s
        }));
        return 1;
      }
    }
    if (n.help) {
      a.stdout.write(this.usage(n, {
        colored: s,
        detailed: !0
      }));
      return 0;
    }
    n.context = a;
    n.cli = {
      binaryLabel: this.binaryLabel,
      binaryName: this.binaryName,
      binaryVersion: this.binaryVersion,
      enableCapture: this.enableCapture,
      enableColors: this.enableColors,
      definitions: () => this.definitions(),
      definition: e => this.definition(e),
      error: (e, t) => this.error(e, t),
      format: e => this.format(e),
      process: (e, t) => this.process(e, {
        ...a,
        ...t
      }),
      run: (e, t) => this.run(e, {
        ...a,
        ...t
      }),
      usage: (e, t) => this.usage(e, t)
    };
    var l = this.enableCapture ? null !== (i = function getCaptureActivator() {
      throw new Error("The enableCapture option cannot be used from within a browser environment");
    }()) && void 0 !== i ? i : noopCaptureActivator : noopCaptureActivator;
    var c;
    try {
      c = await l((() => n.validateAndExecute().catch((e => n.catch(e).then((() => 0))))));
    } catch (e) {
      a.stdout.write(this.error(e, {
        colored: s,
        command: n
      }));
      return 1;
    }
    return c;
  }
  async runExit(e, t) {
    process.exitCode = await this.run(e, t);
  }
  definition(e, {colored: t = !1} = {}) {
    if (!e.usage) {
      return null;
    }
    var {usage: r} = this.getUsageByRegistration(e, {
      detailed: !1
    });
    var {usage: i, options: n} = this.getUsageByRegistration(e, {
      detailed: !0,
      inlineOptions: !1
    });
    return {
      path: r,
      usage: i,
      category: void 0 !== e.usage.category ? formatMarkdownish(e.usage.category, {
        format: this.format(t),
        paragraphs: !1
      }) : void 0,
      description: void 0 !== e.usage.description ? formatMarkdownish(e.usage.description, {
        format: this.format(t),
        paragraphs: !1
      }) : void 0,
      details: void 0 !== e.usage.details ? formatMarkdownish(e.usage.details, {
        format: this.format(t),
        paragraphs: !0
      }) : void 0,
      examples: void 0 !== e.usage.examples ? e.usage.examples.map((([e, r]) => [ formatMarkdownish(e, {
        format: this.format(t),
        paragraphs: !1
      }), r.replace(/\$0/g, this.binaryName) ])) : void 0,
      options: n
    };
  }
  definitions({colored: e = !1} = {}) {
    var t = [];
    for (var r of this.registrations.keys()) {
      var i = this.definition(r, {
        colored: e
      });
      if (!i) {
        continue;
      }
      t.push(i);
    }
    return t;
  }
  usage(e = null, {colored: t, detailed: r = !1, prefix: i = "$ "} = {}) {
    var n;
    if (null === e) {
      for (var a of this.registrations.keys()) {
        var s = a.paths;
        var l = void 0 !== a.usage;
        var c = !s || 0 === s.length || 1 === s.length && 0 === s[0].length || (null !== (n = null == s ? void 0 : s.some((e => 0 === e.length))) && void 0 !== n ? n : !1);
        if (c) {
          if (e) {
            e = null;
            break;
          } else {
            e = a;
          }
        } else if (l) {
          e = null;
          continue;
        }
      }
      if (e) {
        r = !0;
      }
    }
    var D = null !== e && e instanceof Command ? e.constructor : e;
    var d = "";
    if (!D) {
      var f = new Map;
      for (var [p, {index: h}] of this.registrations.entries()) {
        if (void 0 === p.usage) {
          continue;
        }
        var g = void 0 !== p.usage.category ? formatMarkdownish(p.usage.category, {
          format: this.format(t),
          paragraphs: !1
        }) : null;
        var m = f.get(g);
        if (void 0 === m) {
          f.set(g, m = []);
        }
        var {usage: E} = this.getUsageByIndex(h);
        m.push({
          commandClass: p,
          usage: E
        });
      }
      var w = Array.from(f.keys()).sort(((e, t) => {
        if (null === e) {
          return -1;
        }
        if (null === t) {
          return 1;
        }
        return e.localeCompare(t, "en", {
          usage: "sort",
          caseFirst: "upper"
        });
      }));
      var S = void 0 !== this.binaryLabel;
      var b = void 0 !== this.binaryVersion;
      if (S || b) {
        if (S && b) {
          d += `${this.format(t).header(`${this.binaryLabel} - ${this.binaryVersion}`)}\n\n`;
        } else if (S) {
          d += `${this.format(t).header(`${this.binaryLabel}`)}\n`;
        } else {
          d += `${this.format(t).header(`${this.binaryVersion}`)}\n`;
        }
        d += `  ${this.format(t).bold(i)}${this.binaryName} <command>\n`;
      } else {
        d += `${this.format(t).bold(i)}${this.binaryName} <command>\n`;
      }
      for (var B of w) {
        var O = f.get(B).slice().sort(((e, t) => e.usage.localeCompare(t.usage, "en", {
          usage: "sort",
          caseFirst: "upper"
        })));
        var k = null !== B ? B.trim() : "General commands";
        d += "\n";
        d += `${this.format(t).header(`${k}`)}\n`;
        for (var {commandClass: I, usage: M} of O) {
          var _ = I.usage.description || "undocumented";
          d += "\n";
          d += `  ${this.format(t).bold(M)}\n`;
          d += `    ${formatMarkdownish(_, {
            format: this.format(t),
            paragraphs: !1
          })}`;
        }
      }
      d += "\n";
      d += formatMarkdownish("You can also print more details about any of these commands by calling them with the `-h,--help` flag right after the command name.", {
        format: this.format(t),
        paragraphs: !0
      });
    } else if (!r) {
      var {usage: U} = this.getUsageByRegistration(D);
      d += `${this.format(t).bold(i)}${U}\n`;
    } else {
      var {description: G = "", details: H = "", examples: V = []} = D.usage || {};
      if ("" !== G) {
        d += formatMarkdownish(G, {
          format: this.format(t),
          paragraphs: !1
        }).replace(/^./, (e => e.toUpperCase()));
        d += "\n";
      }
      if ("" !== H || V.length > 0) {
        d += `${this.format(t).header("Usage")}\n`;
        d += "\n";
      }
      var {usage: K, options: Y} = this.getUsageByRegistration(D, {
        inlineOptions: !1
      });
      d += `${this.format(t).bold(i)}${K}\n`;
      if (Y.length > 0) {
        d += "\n";
        d += `${this.format(t).header("Options")}\n`;
        var z = Y.reduce(((e, t) => Math.max(e, t.definition.length)), 0);
        d += "\n";
        for (var {definition: J, description: X} of Y) {
          d += `  ${this.format(t).bold(J.padEnd(z))}    ${formatMarkdownish(X, {
            format: this.format(t),
            paragraphs: !1
          })}`;
        }
      }
      if ("" !== H) {
        d += "\n";
        d += `${this.format(t).header("Details")}\n`;
        d += "\n";
        d += formatMarkdownish(H, {
          format: this.format(t),
          paragraphs: !0
        });
      }
      if (V.length > 0) {
        d += "\n";
        d += `${this.format(t).header("Examples")}\n`;
        for (var [Z, Q] of V) {
          d += "\n";
          d += formatMarkdownish(Z, {
            format: this.format(t),
            paragraphs: !1
          });
          d += `${Q.replace(/^/m, `  ${this.format(t).bold(i)}`).replace(/\$0/g, this.binaryName)}\n`;
        }
      }
    }
    return d;
  }
  error(e, t) {
    var r;
    var {colored: i, command: n = (null !== (r = e[ye]) && void 0 !== r ? r : null)} = void 0 === t ? {} : t;
    if (!e || "object" != typeof e || !("stack" in e)) {
      e = new Error(`Execution failed with a non-error rejection (rejected value: ${JSON.stringify(e)})`);
    }
    var a = "";
    var s = e.name.replace(/([a-z])([A-Z])/g, "$1 $2");
    if ("Error" === s) {
      s = "Internal Error";
    }
    a += `${this.format(i).error(s)}: ${e.message}\n`;
    var l = e.clipanion;
    if (void 0 !== l) {
      if ("usage" === l.type) {
        a += "\n";
        a += this.usage(n);
      }
    } else if (e.stack) {
      a += `${e.stack.replace(/^.*\n/, "")}\n`;
    }
    return a;
  }
  format(e) {
    var t;
    return (null !== (t = null != e ? e : this.enableColors) && void 0 !== t ? t : Cli.defaultContext.colorDepth > 1) ? fe : pe;
  }
  getUsageByRegistration(e, t) {
    var r = this.registrations.get(e);
    if (void 0 === r) {
      throw new Error("Assertion failed: Unregistered command");
    }
    return this.getUsageByIndex(r.index, t);
  }
  getUsageByIndex(e, t) {
    return this.builder.getBuilderByIndex(e).usage(t);
  }
}

Cli.defaultContext = {
  env: process.env,
  stdin: process.stdin,
  stdout: process.stdout,
  stderr: process.stderr,
  colorDepth: 1
};

function noopCaptureActivator(e) {
  return e();
}

function Boolean$1(e, t, r) {
  var [i, n] = rerouteArguments(t, null != r ? r : {});
  var a = e.split(",");
  var s = new Set(a);
  return makeCommandOption({
    definition(e) {
      e.addOption({
        names: a,
        allowBinding: !1,
        arity: 0,
        hidden: n.hidden,
        description: n.description,
        required: n.required
      });
    },
    transformer(e, t, r) {
      var n = i;
      for (var {name: a, value: l} of r.options) {
        if (!s.has(a)) {
          continue;
        }
        n = l;
      }
      return n;
    }
  });
}

function String$1(e, ...t) {
  if ("string" == typeof e) {
    return function StringOption(e, t, r) {
      var [i, n] = rerouteArguments(t, null != r ? r : {});
      var {arity: a = 1} = n;
      var s = e.split(",");
      var l = new Set(s);
      return makeCommandOption({
        definition(e) {
          e.addOption({
            names: s,
            arity: n.tolerateBoolean ? 0 : a,
            hidden: n.hidden,
            description: n.description,
            required: n.required
          });
        },
        transformer(e, t, r, a) {
          var s;
          var c = i;
          if (void 0 !== n.env && a.env[n.env]) {
            s = n.env;
            c = a.env[n.env];
          }
          for (var {name: D, value: d} of r.options) {
            if (!l.has(D)) {
              continue;
            }
            s = D;
            c = d;
          }
          if ("string" == typeof c) {
            return applyValidator(null != s ? s : t, c, n.validator);
          } else {
            return c;
          }
        }
      });
    }(e, ...t);
  } else {
    return function StringPositional(e = {}) {
      var {required: t = !0} = e;
      return makeCommandOption({
        definition(t, r) {
          var i;
          t.addPositional({
            name: null !== (i = e.name) && void 0 !== i ? i : r,
            required: e.required
          });
        },
        transformer(r, i, n) {
          var a;
          for (var s = 0; s < n.positionals.length; ++s) {
            if (n.positionals[s].extra === Ce) {
              continue;
            }
            if (t && !0 === n.positionals[s].extra) {
              continue;
            }
            if (!t && !1 === n.positionals[s].extra) {
              continue;
            }
            var [l] = n.positionals.splice(s, 1);
            return applyValidator(null !== (a = e.name) && void 0 !== a ? a : i, l.value, e.validator);
          }
          return;
        }
      });
    }(e);
  }
}

var Fe = function(e) {
  e[e.VUE_SUPPORT = 0] = "VUE_SUPPORT";
  e[e.SVELTE_SUPPORT = 1] = "SVELTE_SUPPORT";
  e[e.UNKNOWN_EXTERNAL_FILE = 2] = "UNKNOWN_EXTERNAL_FILE";
  return e;
}({});

class TadaError extends Error {
  static isTadaError(e) {
    return !("object" != typeof e || !e || !("name" in e) || "TadaError" !== e.name);
  }
  constructor(e, t) {
    super(t);
    this.code = e;
    this.name = "TadaError";
  }
}

var exitCode = () => {
  var {exitCode: e} = process;
  return "string" == typeof e ? parseInt(e, 10) || 0 : e;
};

var e$1 = () => {};

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

var identity$1 = e => e;

function concatMap(e) {
  return t => r => {
    var i = [];
    var n = e$1;
    var a = e$1;
    var s = !1;
    var l = !1;
    var c = !1;
    var D = !1;
    function applyInnerSource(t) {
      c = !0;
      t((t => {
        if (0 === t) {
          if (c) {
            c = !1;
            if (i.length) {
              applyInnerSource(e(i.shift()));
            } else if (D) {
              r(0);
            } else if (!s) {
              s = !0;
              n(0);
            }
          }
        } else if (0 === t.tag) {
          l = !1;
          (a = t[0])(0);
        } else if (c) {
          r(t);
          if (l) {
            l = !1;
          } else {
            a(0);
          }
        }
      }));
    }
    t((t => {
      if (D) {} else if (0 === t) {
        D = !0;
        if (!c && !i.length) {
          r(0);
        }
      } else if (0 === t.tag) {
        n = t[0];
      } else {
        s = !1;
        if (c) {
          i.push(t[0]);
        } else {
          applyInnerSource(e(t[0]));
        }
      }
    }));
    r(start((e => {
      if (1 === e) {
        if (!D) {
          D = !0;
          n(1);
        }
        if (c) {
          c = !1;
          a(1);
        }
      } else {
        if (!D && !s) {
          s = !0;
          n(0);
        }
        if (c && !l) {
          l = !0;
          a(0);
        }
      }
    })));
  };
}

function concat(e) {
  return function concatAll(e) {
    return concatMap(identity$1)(e);
  }(Ee(e));
}

function filter(e) {
  return t => r => {
    var i = e$1;
    t((t => {
      if (0 === t) {
        r(0);
      } else if (0 === t.tag) {
        i = t[0];
        r(t);
      } else if (!e(t[0])) {
        i(0);
      } else {
        r(t);
      }
    }));
  };
}

function map(e) {
  return t => r => t((t => {
    if (0 === t || 0 === t.tag) {
      r(t);
    } else {
      r(push(e(t[0])));
    }
  }));
}

function mergeAll(e) {
  return function mergeMap(e) {
    return t => r => {
      var i = [];
      var n = e$1;
      var a = !1;
      var s = !1;
      t((t => {
        if (s) {} else if (0 === t) {
          s = !0;
          if (!i.length) {
            r(0);
          }
        } else if (0 === t.tag) {
          n = t[0];
        } else {
          a = !1;
          !function applyInnerSource(e) {
            var t = e$1;
            e((e => {
              if (0 === e) {
                if (i.length) {
                  var l = i.indexOf(t);
                  if (l > -1) {
                    (i = i.slice()).splice(l, 1);
                  }
                  if (!i.length) {
                    if (s) {
                      r(0);
                    } else if (!a) {
                      a = !0;
                      n(0);
                    }
                  }
                }
              } else if (0 === e.tag) {
                i.push(t = e[0]);
                t(0);
              } else if (i.length) {
                r(e);
                t(0);
              }
            }));
          }(e(t[0]));
          if (!a) {
            a = !0;
            n(0);
          }
        }
      }));
      r(start((e => {
        if (1 === e) {
          if (!s) {
            s = !0;
            n(1);
          }
          for (var t = 0, r = i, l = i.length; t < l; t++) {
            r[t](1);
          }
          i.length = 0;
        } else {
          if (!s && !a) {
            a = !0;
            n(0);
          } else {
            a = !1;
          }
          for (var c = 0, D = i, d = i.length; c < d; c++) {
            D[c](0);
          }
        }
      })));
    };
  }(identity$1)(e);
}

function merge(e) {
  return mergeAll(Ee(e));
}

function onEnd(e) {
  return t => r => {
    var i = !1;
    t((t => {
      if (i) {} else if (0 === t) {
        i = !0;
        r(0);
        e();
      } else if (0 === t.tag) {
        var n = t[0];
        r(start((t => {
          if (1 === t) {
            i = !0;
            n(1);
            e();
          } else {
            n(t);
          }
        })));
      } else {
        r(t);
      }
    }));
  };
}

function onPush(e) {
  return t => r => {
    var i = !1;
    t((t => {
      if (i) {} else if (0 === t) {
        i = !0;
        r(0);
      } else if (0 === t.tag) {
        var n = t[0];
        r(start((e => {
          if (1 === e) {
            i = !0;
          }
          n(e);
        })));
      } else {
        e(t[0]);
        r(t);
      }
    }));
  };
}

function share(e) {
  var t = [];
  var r = e$1;
  var i = !1;
  return n => {
    t.push(n);
    if (1 === t.length) {
      e((e => {
        if (0 === e) {
          for (var n = 0, a = t, s = t.length; n < s; n++) {
            a[n](0);
          }
          t.length = 0;
        } else if (0 === e.tag) {
          r = e[0];
        } else {
          i = !1;
          for (var l = 0, c = t, D = t.length; l < D; l++) {
            c[l](e);
          }
        }
      }));
    }
    n(start((e => {
      if (1 === e) {
        var a = t.indexOf(n);
        if (a > -1) {
          (t = t.slice()).splice(a, 1);
        }
        if (!t.length) {
          r(1);
        }
      } else if (!i) {
        i = !0;
        r(0);
      }
    })));
  };
}

function takeLast(e) {
  return t => r => {
    var i = [];
    var n = e$1;
    t((t => {
      if (0 === t) {
        Ee(i)(r);
      } else if (0 === t.tag) {
        (n = t[0])(0);
      } else {
        if (i.length >= e && e) {
          i.shift();
        }
        i.push(t[0]);
        n(0);
      }
    }));
  };
}

function takeUntil(e) {
  return t => r => {
    var i = e$1;
    var n = e$1;
    var a = !1;
    t((t => {
      if (a) {} else if (0 === t) {
        a = !0;
        n(1);
        r(0);
      } else if (0 === t.tag) {
        i = t[0];
        e((e => {
          if (0 === e) {} else if (0 === e.tag) {
            (n = e[0])(0);
          } else {
            a = !0;
            n(1);
            i(1);
            r(0);
          }
        }));
      } else {
        r(t);
      }
    }));
    r(start((e => {
      if (1 === e && !a) {
        a = !0;
        i(1);
        n(1);
      } else if (!a) {
        i(0);
      }
    })));
  };
}

function fromAsyncIterable(e) {
  return t => {
    var r = e[asyncIteratorSymbol()] && e[asyncIteratorSymbol()]() || e;
    var i = !1;
    var n = !1;
    var a = !1;
    var s;
    t(start((async e => {
      if (1 === e) {
        i = !0;
        if (r.return) {
          r.return();
        }
      } else if (n) {
        a = !0;
      } else {
        for (a = n = !0; a && !i; ) {
          if ((s = await r.next()).done) {
            i = !0;
            if (r.return) {
              await r.return();
            }
            t(0);
          } else {
            try {
              a = !1;
              t(push(s.value));
            } catch (e) {
              if (r.throw) {
                if (i = !!(await r.throw(e)).done) {
                  t(0);
                }
              } else {
                throw e;
              }
            }
          }
        }
        n = !1;
      }
    })));
  };
}

var Ee = function fromIterable(e) {
  if (e[Symbol.asyncIterator]) {
    return fromAsyncIterable(e);
  }
  return t => {
    var r = e[Symbol.iterator]();
    var i = !1;
    var n = !1;
    var a = !1;
    var s;
    t(start((e => {
      if (1 === e) {
        i = !0;
        if (r.return) {
          r.return();
        }
      } else if (n) {
        a = !0;
      } else {
        for (a = n = !0; a && !i; ) {
          if ((s = r.next()).done) {
            i = !0;
            if (r.return) {
              r.return();
            }
            t(0);
          } else {
            try {
              a = !1;
              t(push(s.value));
            } catch (e) {
              if (r.throw) {
                if (i = !!r.throw(e).done) {
                  t(0);
                }
              } else {
                throw e;
              }
            }
          }
        }
        n = !1;
      }
    })));
  };
};

function fromValue(e) {
  return t => {
    var r = !1;
    t(start((i => {
      if (1 === i) {
        r = !0;
      } else if (!r) {
        r = !0;
        t(push(e));
        t(0);
      }
    })));
  };
}

function make(e) {
  return t => {
    var r = !1;
    var i = e({
      next(e) {
        if (!r) {
          t(push(e));
        }
      },
      complete() {
        if (!r) {
          r = !0;
          t(0);
        }
      }
    });
    t(start((e => {
      if (1 === e && !r) {
        r = !0;
        i();
      }
    })));
  };
}

var never = e => {
  e(start(e$1));
};

function interval(e) {
  return make((t => {
    var r = 0;
    var i = setInterval((() => t.next(r++)), e);
    return () => clearInterval(i);
  }));
}

function toPromise(e) {
  return new Promise((t => {
    var r = e$1;
    var i;
    e((e => {
      if (0 === e) {
        Promise.resolve(i).then(t);
      } else if (0 === e.tag) {
        (r = e[0])(0);
      } else {
        i = e[0];
        r(0);
      }
    }));
  }));
}

var pipe = (...e) => {
  var t = e[0];
  for (var r = 1, i = e.length; r < i; r++) {
    t = e[r](t);
  }
  return t;
};

var we = !1;

function _setColor(e) {
  we = e;
}

var Se = function(e) {
  e.InsertChars = "@";
  e.ScrollLeft = "SP@";
  e.Up = "A";
  e.ScrollRight = "SPA";
  e.Down = "B";
  e.Forward = "C";
  e.Backward = "D";
  e.NextLine = "E";
  e.PrevLine = "F";
  e.ToColumn = "G";
  e.ToPosition = "H";
  e.Tab = "I";
  e.Erase = "J";
  e.EraseLine = "K";
  e.InsertLines = "L";
  e.DeleteLines = "M";
  e.DeleteChars = "P";
  e.ScrollUp = "S";
  e.ScrollDown = "T";
  e.EraseChars = "X";
  e.TabBackwards = "Z";
  e.RepeatChar = "b";
  e.ToRow = "d";
  e.DownLine = "e";
  e.TabClear = "g";
  e.SetMode = "h";
  e.UnsetMode = "l";
  e.SetPrivateMode = "?h";
  e.UnsetPrivateMode = "?l";
  e.ResetPrivateMode = "?r";
  e.Style = "m";
  e.Reset = "!p";
  e.Protect = '"q';
  e.Cursor = "SPq";
  e.SetMargin = "r";
  e.SaveCursor = "s";
  e.RestoreCursor = "u";
  e.InsertColumns = "'}";
  e.DeleteColumns = "'~";
  return e;
}(Se || {});

var be = function(e) {
  e[e.Forward = 0] = "Forward";
  e[e.Backward = 1] = "Backward";
  e[e.All = 2] = "All";
  return e;
}(be || {});

var Be = function(e) {
  e[e.Insert = 4] = "Insert";
  e[e.AutomaticNewline = 20] = "AutomaticNewline";
  return e;
}(Be || {});

var xe = function(e) {
  e[e.AppCursorKeys = 1] = "AppCursorKeys";
  e[e.USASCII = 2] = "USASCII";
  e[e.Column132 = 3] = "Column132";
  e[e.OriginMode = 6] = "OriginMode";
  e[e.AutoWrap = 7] = "AutoWrap";
  e[e.AutoRepeat = 8] = "AutoRepeat";
  e[e.X10Mouse = 9] = "X10Mouse";
  e[e.BlinkCursor = 12] = "BlinkCursor";
  e[e.ShowCursor = 25] = "ShowCursor";
  e[e.ReverseWrapAround = 45] = "ReverseWrapAround";
  e[e.AlternativeScreenBuffer = 47] = "AlternativeScreenBuffer";
  e[e.AppKeypad = 66] = "AppKeypad";
  e[e.X11Mouse = 1e3] = "X11Mouse";
  e[e.CellMotionMouseTracking = 1002] = "CellMotionMouseTracking";
  e[e.AllMotionMouseTracking = 1003] = "AllMotionMouseTracking";
  e[e.FocusEvents = 1004] = "FocusEvents";
  e[e.Utf8Mouse = 1005] = "Utf8Mouse";
  e[e.SGRMouse = 1006] = "SGRMouse";
  e[e.UrxvtMouse = 1015] = "UrxvtMouse";
  e[e.SGRPixelsMouse = 1016] = "SGRPixelsMouse";
  e[e.SaveCursor = 1048] = "SaveCursor";
  e[e.BracketedPaste = 2004] = "BracketedPaste";
  return e;
}(xe || {});

var $e = function(e) {
  e[e.Reset = 0] = "Reset";
  e[e.Bold = 1] = "Bold";
  e[e.Faint = 2] = "Faint";
  e[e.Italic = 3] = "Italic";
  e[e.Underline = 4] = "Underline";
  e[e.Blink = 5] = "Blink";
  e[e.RapidBlink = 6] = "RapidBlink";
  e[e.Invert = 7] = "Invert";
  e[e.Invisible = 8] = "Invisible";
  e[e.Strikethrough = 9] = "Strikethrough";
  e[e.DoubleUnderlined = 21] = "DoubleUnderlined";
  e[e.Normal = 22] = "Normal";
  e[e.NoItalic = 23] = "NoItalic";
  e[e.NoUnderline = 24] = "NoUnderline";
  e[e.NoBlink = 25] = "NoBlink";
  e[e.NoInvert = 27] = "NoInvert";
  e[e.Visible = 28] = "Visible";
  e[e.NoStrikethrough = 29] = "NoStrikethrough";
  e[e.Black = 30] = "Black";
  e[e.Red = 31] = "Red";
  e[e.Green = 32] = "Green";
  e[e.Yellow = 33] = "Yellow";
  e[e.Blue = 34] = "Blue";
  e[e.Magenta = 35] = "Magenta";
  e[e.Cyan = 36] = "Cyan";
  e[e.White = 37] = "White";
  e[e.Foreground = 39] = "Foreground";
  e[e.OnBlack = 40] = "OnBlack";
  e[e.OnRed = 41] = "OnRed";
  e[e.OnGreen = 42] = "OnGreen";
  e[e.OnYellow = 43] = "OnYellow";
  e[e.OnBlue = 44] = "OnBlue";
  e[e.OnMagenta = 45] = "OnMagenta";
  e[e.OnCyan = 46] = "OnCyan";
  e[e.OnWhite = 47] = "OnWhite";
  e[e.OnBackground = 49] = "OnBackground";
  e[e.BrightBlack = 90] = "BrightBlack";
  e[e.BrightRed = 91] = "BrightRed";
  e[e.BrightGreen = 92] = "BrightGreen";
  e[e.BrightYellow = 93] = "BrightYellow";
  e[e.BrightBlue = 94] = "BrightBlue";
  e[e.BrightMagenta = 95] = "BrightMagenta";
  e[e.BrightCyan = 96] = "BrightCyan";
  e[e.BrightWhite = 97] = "BrightWhite";
  e[e.OnBrightBlack = 100] = "OnBrightBlack";
  e[e.OnBrightRed = 101] = "OnBrightRed";
  e[e.OnBrightGreen = 102] = "OnBrightGreen";
  e[e.OnBrightYellow = 103] = "OnBrightYellow";
  e[e.OnBrightBlue = 104] = "OnBrightBlue";
  e[e.OnBrightMagenta = 105] = "OnBrightMagenta";
  e[e.OnBrightCyan = 106] = "OnBrightCyan";
  e[e.OnBrightWhite = 107] = "OnBrightWhite";
  e.DoubleUnderline = "4:2";
  e.CurlyUnderline = "4:3";
  e.DottedUnderline = "4:4";
  e.DashedUnderline = "4:5";
  return e;
}($e || {});

var Ae = "[";

function cmd(e, t, r) {
  if (!we && e === Se.Style) {
    return "";
  }
  var i = Ae;
  if (e === Se.SetPrivateMode) {
    i += "?";
    e = Se.SetMode;
  } else if (e === Se.UnsetPrivateMode) {
    i += "?";
    e = Se.UnsetMode;
  }
  if (Array.isArray(t)) {
    i += t.join(";");
  } else if (null != t) {
    i += `${t}`;
  }
  return i += e;
}

var Oe = /([\x1B\x9B][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><])/g;

var stripAnsi = e => e.replace(Oe, "");

class CLIError extends Error {
  constructor(e, t) {
    super(stripAnsi(e));
    this.output = e;
    this.exit = null != t ? t : 1;
  }
  toString() {
    return this.output;
  }
}

function text(e, ...t) {
  var r = "";
  if (Array.isArray(e)) {
    var i = 0;
    for (var n = 0; n < e.length; n++) {
      r += e[n];
      if (i < t.length) {
        r += t[i++];
      }
    }
  } else if ("string" == typeof e) {
    r += e;
    for (var a of t) {
      r += a;
    }
  }
  return r;
}

function error(e, ...t) {
  return "number" == typeof e ? new CLIError(text(...t), e) : new CLIError(text(e, ...t));
}

function compose(e) {
  var t = cmd(Se.Style, [ $e.Reset, $e.NoInvert ]);
  var r = pipe(fromAsyncIterable(async function* convertError(e) {
    try {
      yield* e;
    } catch (e) {
      if (e instanceof CLIError) {
        process.exitCode = e.exit;
        yield e;
      } else {
        yield ("" + e).trim();
      }
    }
    yield "\n";
  }(e)), concatMap((e => "object" == typeof e && !(e instanceof CLIError) ? compose(e) : fromValue(e))), filter((e => null != e)), share);
  return pipe(r, concatMap((e => {
    var i = pipe("string" == typeof e || e instanceof CLIError ? fromValue(e) : merge([ e, never ]), takeUntil(r), share);
    return pipe(merge([ pipe(i, takeLast(1), map((e => "string" == typeof e && !e.endsWith("\n") ? "" : e))), i ]), function scan(e, t) {
      return r => i => {
        var n = t;
        r((t => {
          if (0 === t) {
            i(0);
          } else if (0 === t.tag) {
            i(t);
          } else {
            i(push(n = e(n, t[0])));
          }
        }));
      };
    }(((e, r) => "string" == typeof r ? function clear(e) {
      var t = 0;
      for (var r = 0; r < e.length; r++) {
        if (10 === e.charCodeAt(r)) {
          t++;
        }
      }
      if (t) {
        return cmd(Se.PrevLine, t) + cmd(Se.DeleteLines, t + 1);
      } else if (stripAnsi(e)) {
        return cmd(Se.EraseLine, be.Backward) + cmd(Se.ToColumn, 1);
      } else {
        return "";
      }
    }("string" == typeof e ? e : "") + r + t : r), ""));
  })), takeUntil(pipe(r, takeLast(1))));
}

var ke = function(e) {
  e.Bell = "";
  e.Newline = "\n";
  e.Tab = "\t";
  e.Space = " ";
  e.Ellipsis = "…";
  return e;
}({});

var Te = function(e) {
  e.TopLeft = "┏";
  e.TopRight = "┓";
  e.BottomLeft = "┗";
  e.BottomRight = "┛";
  e.Vertical = "┃";
  e.VerticalRight = "┣";
  e.VerticalLeft = "┫";
  e.Horizontal = "━";
  e.HorizontalDown = "┳";
  e.HorizontalUp = "┻";
  e.Cross = "╋";
  return e;
}({});

var Ie = function(e) {
  e.Tick = "✓";
  e.TickSwoosh = "✔";
  e.Cross = "✖";
  e.CrossSwoosh = "✘";
  e.Home = "⌂";
  e.Note = "♪";
  e.Warning = "⚠";
  e.Info = "ℹ";
  e.Star = "★";
  return e;
}({});

var Ne = [ "⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏" ];

var Pe = [ "◐", "◓", "◑", "◒" ];

var Me = !!process.env.GITHUB_ACTIONS;

var toCommandValue = e => "string" == typeof e || null == e ? e ? "" + e : "" : JSON.stringify(e);

var escapeData = e => toCommandValue(e).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");

var escapeProperty = e => toCommandValue(e).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A").replace(/:/g, "%3A").replace(/,/g, "%2C");

function githubAnnotation(e, t, r) {
  if (Me) {
    var i = `::${e}`;
    var n = "";
    if (r) {
      for (var a in r) {
        if (r) {
          n += ",";
        }
        if (r[a]) {
          n += `${a}=${escapeProperty(r[a])}`;
        }
      }
    }
    if (n) {
      i += ` ${n}`;
    }
    i += `::${escapeData(t)}\n`;
    process.stdout.write(i);
  }
}

function initTTY(e = {}) {
  var t = "dumb" !== process.env.TERM && !process.env.CI && !e.disableTTY;
  var r = null;
  var i = process.stdout;
  if (Me) {
    i = process.stderr;
  } else if (!i.isTTY && process.stderr.isTTY) {
    i = process.stderr;
    r = process.stdout;
  } else {
    t = i.isTTY;
  }
  var n = process.argv.includes("--color");
  var a = "FORCE_COLOR" in process.env || !process.env.NO_COLOR && !process.env.CI;
  _setColor(t && a || n || Me);
  var s = pipe(function fromReadStream(e) {
    return make((t => {
      function onKeypress(e, r) {
        switch (r.name) {
         case "c":
         case "d":
         case "x":
          if (r.ctrl) {
            cleanup();
          }

         case "escape":
          cleanup();

         default:
          t.next({
            ...r,
            data: e
          });
        }
      }
      function cleanup() {
        if (e.isTTY) {
          e.setRawMode(!1);
        }
        t.complete();
        e.removeListener("keypress", onKeypress);
        e.unref();
      }
      if (e.isTTY) {
        e.setRawMode(!0);
      }
      g(e);
      e.setEncoding("utf8");
      e.resume();
      e.addListener("keypress", onKeypress);
      return cleanup;
    }));
  }(process.stdin), function onStart(e) {
    return t => r => t((t => {
      if (0 === t) {
        r(0);
      } else if (0 === t.tag) {
        r(t);
        e();
      } else {
        r(t);
      }
    }));
  }((function _start() {
    _setColor(t && a || n);
    if (t) {
      i.write(cmd(Se.UnsetPrivateMode, xe.ShowCursor));
    }
  })), onEnd((function _end() {
    if (t) {
      i.write(cmd(Se.Reset) + cmd(Se.ResetPrivateMode) + cmd(Se.SetPrivateMode, xe.ShowCursor));
    }
  })), share);
  var l = pipe(concat([ pipe(s, filter((() => !1))), fromValue(null) ]), share);
  return {
    isInteractive: t,
    output: i,
    pipeTo: r,
    inputSource: s,
    cancelSource: l,
    write: function write(...e) {
      i.write(text(...e));
    },
    start: function start(t) {
      var write = e => i.write("" + e);
      if (e.disableTTY) {
        return pipe(compose(t), onPush(write), toPromise);
      } else {
        return pipe(compose(t), onPush(write), takeUntil(l), toPromise);
      }
    },
    mode: function mode(...e) {
      if (t) {
        var r = [];
        var n = [];
        for (var a of e) {
          if (a === Be.Insert || a === Be.AutomaticNewline) {
            r.push(a);
          } else {
            n.push(a);
          }
        }
        if (r.length) {
          i.write(cmd(Se.SetMode, r));
        }
        if (n.length) {
          i.write(cmd(Se.SetPrivateMode, n));
        }
      }
    },
    modeOff: function modeOff(...e) {
      if (t) {
        var r = [];
        var n = [];
        for (var a of e) {
          if (a === Be.Insert || a === Be.AutomaticNewline) {
            r.push(a);
          } else {
            n.push(a);
          }
        }
        if (r.length) {
          i.write(cmd(Se.UnsetMode, r));
        }
        if (n.length) {
          i.write(cmd(Se.UnsetPrivateMode, n));
        }
      }
    }
  };
}

function indent(e, t) {
  if (e.includes("\n")) {
    var r = e.trim().split("\n").join(text([ ke.Newline, t ]));
    return e.endsWith("\n") ? r + "\n" : r;
  } else {
    return e;
  }
}

function code(e) {
  return text`${cmd(Se.Style, $e.Underline)}${e}${cmd(Se.Style, $e.NoUnderline)}`;
}

function bold(e) {
  return text`${cmd(Se.Style, $e.Bold)}${e}${cmd(Se.Style, $e.Normal)}`;
}

function hint(e) {
  return text([ cmd(Se.Style, $e.BrightBlack), `${Te.BottomLeft} `, cmd(Se.Style, $e.BrightBlue), `${Ie.Info} `, cmd(Se.Style, $e.Blue), indent(e, "    ") ]);
}

function errorMessage$1(e) {
  return error([ "\n", cmd(Se.Style, [ $e.Red, $e.Invert ]), ` ${Ie.Warning} Error `, cmd(Se.Style, $e.NoInvert), `\n${e.trim()}\n` ]);
}

function externalError(e, t) {
  var r;
  var i;
  if (t && "object" == typeof t) {
    if ("name" in t && ("TSError" === t.name || "TadaError" === t.name || "code" in t)) {
      r = "code" in t ? "System Error" : "Error";
      i = "TadaError" === t.name ? text([ cmd(Se.Style, $e.Blue), t.message ]) : t.message.trim();
    } else if ("stack" in t && "string" == typeof t.stack) {
      r = "Unexpected Error";
      i = `${t.stack}`;
    } else if ("message" in t && "string" == typeof t.message) {
      r = "Unexpected Error";
      i = `${t.message}`;
    } else {
      r = "Unexpected Error";
      i = `${t}`;
    }
  } else {
    r = "Unexpected Error";
    i = `${t}`;
  }
  return error([ "\n", cmd(Se.Style, [ $e.Red, $e.Invert ]), ` ${Ie.Warning} ${r} `, cmd(Se.Style, $e.NoInvert), `\n${e.trim()}\n`, cmd(Se.Style, $e.BrightBlack), `${Te.BottomLeft} `, indent(!i.endsWith("\n") ? i + "\n" : i, "  ") ]);
}

function experimentMessage(e) {
  return error([ cmd(Se.Style, [ $e.Yellow, $e.Bold ]), `${Ie.Warning} Note: `, cmd(Se.Style, $e.Reset), `${e.trim()}\n\n` ]);
}

var directoryExists = async e => {
  try {
    var t = await d.stat(e);
    if (t.isDirectory()) {
      return !0;
    } else if (t.isSymbolicLink()) {
      return directoryExists(await d.realpath(e));
    } else {
      return !1;
    }
  } catch {
    return !1;
  }
};

var writeOutput = async (e, t) => {
  if (e && "object" == typeof e && "writable" in e) {
    return await new Promise(((r, i) => {
      e.write(t, (e => {
        if (e) {
          i(e);
        } else {
          r();
        }
      }));
    }));
  }
  var i = r("string" != typeof e ? await d.realpath(e) : e);
  if (!await directoryExists(i)) {
    await d.mkdir(i, {
      recursive: !0
    });
  }
  if (!await (a = e, d.stat(a).then((e => e.isFile())).catch((() => !1)))) {
    await d.writeFile(e, t);
  } else {
    var n = e + ".tmp";
    await d.writeFile(n, t);
    try {
      await d.rename(n, e);
    } catch (e) {
      await d.unlink(n);
      throw e;
    } finally {
      await (async e => {
        try {
          var t = new Date;
          await d.utimes(e, t, t);
        } catch (e) {}
      })(e);
    }
  }
  var a;
};

function summary$1(e) {
  var t = text([ cmd(Se.Style, $e.BrightGreen), `${Ie.Tick} Introspection output was generated successfully\n` ]);
  if (e) {
    t += hint(`The pipe output was generated in the ${code(".d.ts")} format.\nFor the ${code(".ts")} format, pass the ${code("--force-ts-format")} argument.\n`);
  }
  return t;
}

async function* run$6(t, r) {
  var c;
  var D;
  try {
    c = await i(r.tsconfig);
    D = n(c.pluginConfig, c.rootPath);
  } catch (e) {
    throw externalError("Failed to load configuration.", e);
  }
  var d = a(D);
  try {
    d = await d.load({
      rootPath: e.dirname(c.configPath)
    });
  } catch (e) {
    throw externalError("Failed to load schema(s).", e);
  }
  var f = e.dirname(c.configPath);
  if ("schema" in D) {
    var p = d.current;
    var h;
    if (!r.output && t.pipeTo) {
      h = t.pipeTo;
    } else if (r.output) {
      h = e.resolve(process.cwd(), r.output);
    } else if (D.tadaOutputLocation) {
      h = D.tadaOutputLocation;
    } else {
      throw errorMessage$1("No output path was specified to write the output file to.\n" + hint(`You have to either set ${code('"tadaOutputLocation"')} in your configuration,\npass an ${code("--output")} argument to this command,\nor pipe this command to an output file.`));
    }
    var g;
    try {
      g = s(l(p.introspection), {
        fileType: h && "string" == typeof h ? h : r.forceTSFormat ? ".ts" : ".d.ts",
        shouldPreprocess: !r.disablePreprocessing
      });
    } catch (e) {
      throw externalError("Could not generate introspection output", e);
    }
    try {
      await writeOutput(h, g);
    } catch (e) {
      throw externalError("Something went wrong while writing the introspection file", e);
    }
    yield summary$1(!r.forceTSFormat && "string" != typeof h);
  } else {
    if (r.output) {
      throw errorMessage$1("Output path was specified, while multiple schemas are configured.\n" + hint(`You can only output all schemas to their ${code('"tadaOutputLocation"')} options\nwhen multiple ${code("schemas")} are set up.`));
    }
    for (var m in d.multi) {
      var E = d.multi[m];
      if (!E) {
        continue;
      } else if (!E.tadaOutputLocation) {
        throw errorMessage$1(`No output path was specified to write the '${m}' schema to.\n` + hint(`You have to set ${code('"tadaOutputLocation"')} in each schema configuration.`));
      }
      var w = void 0;
      try {
        w = s(l(E.introspection), {
          fileType: E.tadaOutputLocation,
          shouldPreprocess: !r.disablePreprocessing
        });
      } catch (e) {
        throw externalError(`Could not generate any output for the '${m}' schema`, e);
      }
      try {
        await writeOutput(e.resolve(f, E.tadaOutputLocation), w);
      } catch (e) {
        throw externalError(`Something went wrong while writing the '${m}' schema's output`, e);
      }
    }
    yield summary$1();
  }
}

class GenerateOutputCommand extends Command {
  static paths=[ [ "generate-output" ], [ "generate", "output" ] ];
  forceTSFormat=Boolean$1("--force-ts-format", !1, {
    description: "Forces the `.ts` output format when the output is piped",
    hidden: !0
  });
  disablePreprocessing=Boolean$1("--disable-preprocessing", !1, {
    description: "Disables pre-processing, which is an internal introspection format generated ahead of time"
  });
  tsconfig=String$1("--tsconfig,-c", {
    description: "Specify the `tsconfig.json` used to read, unless `--output` is passed."
  });
  output=String$1("--output,-o", {
    description: "Specifies where to output the file to.\tDefault: The `tadaOutputLocation` configuration option"
  });
  async execute() {
    var e = initTTY();
    var t = await e.start(run$6(e, {
      forceTSFormat: this.forceTSFormat,
      disablePreprocessing: this.disablePreprocessing,
      output: this.output,
      tsconfig: this.tsconfig
    }));
    return exitCode() || ("object" == typeof t ? t.exit : 0);
  }
}

async function generateOutput(e) {
  var t = initTTY({
    disableTTY: !0
  });
  var r = await t.start(run$6(t, e));
  if (r instanceof Error) {
    throw r;
  }
}

var Le = process.cwd();

var je = "  ";

function warningFile$1(t) {
  var r = e.relative(Le, t);
  if (!r.startsWith("..")) {
    t = r;
  }
  return text([ cmd(Se.Style, $e.Underline), t, cmd(Se.Style, $e.NoUnderline), "\n" ]);
}

var documentSummary$1 = e => {
  var t = "";
  if ("number" != typeof e ? Object.values(e).every((e => !e)) : !e) {
    t += text([ cmd(Se.Style, $e.Blue), `${Ie.Info} No persisted documents were found `, cmd(Se.Style, $e.BrightBlack), "(Persisted manifests were not generated)\n" ]);
  } else if ("number" == typeof e) {
    t += text([ cmd(Se.Style, $e.BrightGreen), `${Ie.Tick} Persisted manifest was generated successfully `, cmd(Se.Style, $e.BrightBlack), `(${e} documents extracted)\n` ]);
  } else {
    t += text([ cmd(Se.Style, $e.BrightGreen), `${Ie.Tick} Persisted manifests were generated successfully.\n` ]);
    for (var r in e) {
      t += text([ cmd(Se.Style, $e.BrightBlack), `${Te.BottomLeft} `, cmd(Se.Style, $e.BrightBlue), `${e[r]} documents extracted for the '${r}' schema\n` ]);
    }
  }
  return t;
};

function warningSummary$1(e) {
  return error([ cmd(Se.Style, $e.Red), `${Ie.Cross} ${e} warnings\n` ]);
}

function infoSummary$2(e, t) {
  var r = "";
  if (e) {
    r += text([ cmd(Se.Style, $e.BrightYellow), Ie.Warning, ` ${e} warnings\n` ]);
  }
  return r += documentSummary$1(t);
}

function warningGithub$1(e) {
  githubAnnotation("warning", e.message, {
    file: e.file,
    line: e.line,
    col: e.col
  });
}

function runningPersisted(e, t) {
  var r = e ? t ? `(${e}/${t})` : `(${e})` : "";
  return pipe(interval(150), map((e => text([ cmd(Se.Style, $e.Magenta), Ne[e % Ne.length], " ", cmd(Se.Style, $e.Foreground), `Scanning files${ke.Ellipsis} `, cmd(Se.Style, $e.BrightBlack), r ]))));
}

async function* run$5(t, r) {
  var {runPersisted: a} = await import("./thread-chunk.mjs");
  var s;
  var l;
  try {
    s = await i(r.tsconfig);
    l = n(s.pluginConfig, s.rootPath);
  } catch (e) {
    throw externalError("Failed to load configuration.", e);
  }
  if (t.isInteractive) {
    yield runningPersisted();
  }
  var c = a({
    disableNormalization: !!r.disableNormalization,
    rootPath: s.rootPath,
    configPath: s.configPath,
    pluginConfig: l
  });
  var D = [];
  var d = 0;
  var f = 0;
  var p = 0;
  try {
    if (t.isInteractive) {
      yield runningPersisted();
    }
    for await (var h of c) {
      if ("EXTERNAL_WARNING" === h.kind) {
        yield experimentMessage(`${code(".vue")} and ${code(".svelte")} file support is experimental.`);
      } else if ("FILE_COUNT" === h.kind) {
        f = h.fileCount;
      } else {
        p++;
        D.push(...h.documents);
        d += h.warnings.length;
        if (h.warnings.length) {
          var g = warningFile$1(h.filePath);
          for (var m of h.warnings) {
            g += (E = m, text([ je, cmd(Se.Style, $e.BrightBlack), `${E.line}:${E.col}`, ke.Tab, cmd(Se.Style, $e.Foreground), indent(E.message.trim(), text([ je, ke.Tab ])), ke.Newline ]));
            warningGithub$1(m);
          }
          yield g + "\n";
        }
      }
      if (t.isInteractive) {
        yield runningPersisted(p, f);
      }
    }
  } catch (e) {
    throw externalError("Could not generate persisted manifest file", e);
  }
  var E;
  var w = e.dirname(s.configPath);
  if ("schema" in l) {
    var S;
    if (!r.output && t.pipeTo) {
      S = t.pipeTo;
    } else if (r.output) {
      S = e.resolve(process.cwd(), r.output);
    } else if (l.tadaPersistedLocation) {
      S = e.resolve(e.dirname(s.configPath), l.tadaPersistedLocation);
    } else {
      throw errorMessage$1("No output path was specified to write the persisted manifest file to.\n" + hint(`You have to either set ${code('"tadaPersistedLocation"')} in your configuration,\npass an ${code("--output")} argument to this command,\nor pipe this command to an output file.`));
    }
    if (d && r.failOnWarn) {
      throw warningSummary$1(d);
    } else if (D.length) {
      try {
        var b = {};
        for (var B of D) {
          b[B.hashKey] = B.document;
        }
        var O = JSON.stringify(b, null, 2);
        await writeOutput(S, O);
      } catch (e) {
        throw externalError("Something went wrong while writing the persisted manifest file.", e);
      }
    }
    yield infoSummary$2(d, D.length);
  } else {
    if (r.output) {
      throw errorMessage$1("Output path was specified, while multiple schemas are configured.\n" + hint(`You can only output all schemas to their ${code('"tadaPersistedLocation"')} options\nwhen multiple ${code("schemas")} are set up.`));
    }
    var k = {};
    for (var I of l.schemas) {
      var {name: M, tadaPersistedLocation: _} = I;
      if (!_) {
        throw errorMessage$1(`No output path was specified to write the '${M}' schema to.\n` + hint(`You have to set ${code('"tadaPersistedLocation"')} in each schema configuration.`));
      }
      try {
        k[M] = 0;
        var U = {};
        for (var G of D) {
          if (G.schemaName === M) {
            U[G.hashKey] = G.document;
            k[M]++;
          }
        }
        if (k[M]) {
          var H = JSON.stringify(U, null, 2);
          await writeOutput(e.resolve(w, _), H);
        }
      } catch (e) {
        throw externalError(`Something went wrong while writing the '${M}' schema's persisted manifest file.`, e);
      }
    }
    if (d && r.failOnWarn) {
      throw warningSummary$1(d);
    } else {
      yield infoSummary$2(d, k);
    }
  }
}

class GeneratePersisted extends Command {
  static paths=[ [ "generate-persisted" ], [ "generate", "persisted" ] ];
  tsconfig=String$1("--tsconfig,-c", {
    description: "Specify the `tsconfig.json` used to read, unless `--output` is passed."
  });
  disableNormalization=Boolean$1("--disable-normalization", !1, {
    description: "Disables normalizing of GraphQL documents (parsing then printing documents)"
  });
  failOnWarn=Boolean$1("--fail-on-warn", !1, {
    description: "Triggers an error and a non-zero exit code if any warnings have been reported"
  });
  output=String$1("--output,-o", {
    description: "Specifies where to output the file to.\tDefault: The `tadaPersistedLocation` configuration option"
  });
  async execute() {
    var e = initTTY();
    var t = await e.start(run$5(e, {
      disableNormalization: this.disableNormalization,
      failOnWarn: this.failOnWarn,
      output: this.output,
      tsconfig: this.tsconfig
    }));
    return exitCode() || ("object" == typeof t ? t.exit : 0);
  }
}

async function generatePersisted(e) {
  var t = initTTY({
    disableTTY: !0
  });
  var r = await t.start(run$5(t, e));
  if (r instanceof Error) {
    throw r;
  }
}

var Re = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

function getPrintable(e) {
  if (null === e) {
    return "null";
  }
  if (void 0 === e) {
    return "undefined";
  }
  if ("" === e) {
    return "an empty string";
  }
  if ("symbol" == typeof e) {
    return `<${e.toString()}>`;
  }
  if (Array.isArray(e)) {
    return "an array";
  }
  return JSON.stringify(e);
}

function computeKey(e, t) {
  var r, i, n;
  if ("number" == typeof t) {
    return `${null !== (r = null == e ? void 0 : e.p) && void 0 !== r ? r : "."}[${t}]`;
  } else if (Re.test(t)) {
    return `${null !== (i = null == e ? void 0 : e.p) && void 0 !== i ? i : ""}.${t}`;
  } else {
    return `${null !== (n = null == e ? void 0 : e.p) && void 0 !== n ? n : "."}[${JSON.stringify(t)}]`;
  }
}

function pushError({errors: e, p: t} = {}, r) {
  null == e || e.push(`${null != t ? t : "."}: ${r}`);
  return !1;
}

function makeCoercionFn(e, t) {
  return r => {
    var i = e[t];
    e[t] = r;
    return makeCoercionFn(e, t).bind(null, i);
  };
}

function isLiteral(e) {
  return makeValidator({
    test: (t, r) => {
      if (t !== e) {
        return pushError(r, `Expected ${getPrintable(e)} (got ${getPrintable(t)})`);
      }
      return !0;
    }
  });
}

function isString() {
  return makeValidator({
    test: (e, t) => {
      if ("string" != typeof e) {
        return pushError(t, `Expected a string (got ${getPrintable(e)})`);
      }
      return !0;
    }
  });
}

function isArray(e, {delimiter: t} = {}) {
  return makeValidator({
    test: (r, i) => {
      var n;
      var a = r;
      if ("string" == typeof r && void 0 !== t) {
        if (void 0 !== (null == i ? void 0 : i.coercions)) {
          if (void 0 === (null == i ? void 0 : i.coercion)) {
            return pushError(i, "Unbound coercion result");
          }
          r = r.split(t);
        }
      }
      if (!Array.isArray(r)) {
        return pushError(i, `Expected an array (got ${getPrintable(r)})`);
      }
      var s = !0;
      for (var l = 0, c = r.length; l < c; ++l) {
        if (!(s = e(r[l], Object.assign(Object.assign({}, i), {
          p: computeKey(i, l),
          coercion: makeCoercionFn(r, l)
        })) && s) && null == (null == i ? void 0 : i.errors)) {
          break;
        }
      }
      if (r !== a) {
        i.coercions.push([ null !== (n = i.p) && void 0 !== n ? n : ".", i.coercion.bind(null, r) ]);
      }
      return s;
    }
  });
}

function isTuple(e, {delimiter: t} = {}) {
  var r = hasExactLength(e.length);
  return makeValidator({
    test: (i, n) => {
      var a;
      if ("string" == typeof i && void 0 !== t) {
        if (void 0 !== (null == n ? void 0 : n.coercions)) {
          if (void 0 === (null == n ? void 0 : n.coercion)) {
            return pushError(n, "Unbound coercion result");
          }
          i = i.split(t);
          n.coercions.push([ null !== (a = n.p) && void 0 !== a ? a : ".", n.coercion.bind(null, i) ]);
        }
      }
      if (!Array.isArray(i)) {
        return pushError(n, `Expected a tuple (got ${getPrintable(i)})`);
      }
      var s = r(i, Object.assign({}, n));
      for (var l = 0, c = i.length; l < c && l < e.length; ++l) {
        if (!(s = e[l](i[l], Object.assign(Object.assign({}, n), {
          p: computeKey(n, l),
          coercion: makeCoercionFn(i, l)
        })) && s) && null == (null == n ? void 0 : n.errors)) {
          break;
        }
      }
      return s;
    }
  });
}

function isRecord(e, {keys: t = null} = {}) {
  var r = isArray(isTuple([ null != t ? t : isString(), e ]));
  return makeValidator({
    test: (i, n) => {
      var a;
      if (Array.isArray(i)) {
        if (void 0 !== (null == n ? void 0 : n.coercions)) {
          if (void 0 === (null == n ? void 0 : n.coercion)) {
            return pushError(n, "Unbound coercion result");
          }
          if (!r(i, Object.assign(Object.assign({}, n), {
            coercion: void 0
          }))) {
            return !1;
          }
          i = Object.fromEntries(i);
          n.coercions.push([ null !== (a = n.p) && void 0 !== a ? a : ".", n.coercion.bind(null, i) ]);
          return !0;
        }
      }
      if ("object" != typeof i || null === i) {
        return pushError(n, `Expected an object (got ${getPrintable(i)})`);
      }
      var s = Object.keys(i);
      var l = !0;
      for (var c = 0, D = s.length; c < D && (l || null != (null == n ? void 0 : n.errors)); ++c) {
        var d = s[c];
        var f = i[d];
        if ("__proto__" === d || "constructor" === d) {
          l = pushError(Object.assign(Object.assign({}, n), {
            p: computeKey(n, d)
          }), "Unsafe property name");
          continue;
        }
        if (null !== t && !t(d, n)) {
          l = !1;
          continue;
        }
        if (!e(f, Object.assign(Object.assign({}, n), {
          p: computeKey(n, d),
          coercion: makeCoercionFn(i, d)
        }))) {
          l = !1;
          continue;
        }
      }
      return l;
    }
  });
}

var isOneOf = (e, {exclusive: t = !1} = {}) => makeValidator({
  test: (r, i) => {
    var n, a, s;
    var l = [];
    var c = void 0 !== (null == i ? void 0 : i.errors) ? [] : void 0;
    for (var D = 0, d = e.length; D < d; ++D) {
      var f = void 0 !== (null == i ? void 0 : i.errors) ? [] : void 0;
      var p = void 0 !== (null == i ? void 0 : i.coercions) ? [] : void 0;
      if (e[D](r, Object.assign(Object.assign({}, i), {
        errors: f,
        coercions: p,
        p: `${null !== (n = null == i ? void 0 : i.p) && void 0 !== n ? n : "."}#${D + 1}`
      }))) {
        l.push([ `#${D + 1}`, p ]);
        if (!t) {
          break;
        }
      } else {
        null == c || c.push(f[0]);
      }
    }
    if (1 === l.length) {
      var [, h] = l[0];
      if (void 0 !== h) {
        null === (a = null == i ? void 0 : i.coercions) || void 0 === a || a.push(...h);
      }
      return !0;
    }
    if (l.length > 1) {
      pushError(i, `Expected to match exactly a single predicate (matched ${l.join(", ")})`);
    } else {
      null === (s = null == i ? void 0 : i.errors) || void 0 === s || s.push(...c);
    }
    return !1;
  }
});

function makeTrait(e) {
  return () => e;
}

function makeValidator({test: e}) {
  return makeTrait(e)();
}

function hasExactLength(e) {
  return makeValidator({
    test: (t, r) => {
      if (t.length !== e) {
        return pushError(r, `Expected to have a length of exactly ${e} elements (got ${t.length})`);
      }
      return !0;
    }
  });
}

function matchesRegExp(e) {
  return makeValidator({
    test: (t, r) => {
      if (!e.test(t)) {
        return pushError(r, `Expected to match the pattern ${e.toString()} (got ${getPrintable(t)})`);
      }
      return !0;
    }
  });
}

function cascade(e, ...t) {
  var r = Array.isArray(t[0]) ? t[0] : t;
  return makeValidator({
    test: (t, i) => {
      var n, a;
      var s = {
        value: t
      };
      var l = void 0 !== (null == i ? void 0 : i.coercions) ? makeCoercionFn(s, "value") : void 0;
      var c = void 0 !== (null == i ? void 0 : i.coercions) ? [] : void 0;
      if (!e(t, Object.assign(Object.assign({}, i), {
        coercion: l,
        coercions: c
      }))) {
        return !1;
      }
      var D = [];
      if (void 0 !== c) {
        for (var [, d] of c) {
          D.push(d());
        }
      }
      try {
        if (void 0 !== (null == i ? void 0 : i.coercions)) {
          if (s.value !== t) {
            if (void 0 === (null == i ? void 0 : i.coercion)) {
              return pushError(i, "Unbound coercion result");
            }
            i.coercions.push([ null !== (n = i.p) && void 0 !== n ? n : ".", i.coercion.bind(null, s.value) ]);
          }
          null === (a = null == i ? void 0 : i.coercions) || void 0 === a || a.push(...c);
        }
        return r.every((e => e(s.value, i)));
      } finally {
        for (var f of D) {
          f();
        }
      }
    }
  });
}

var _e;

!function(e) {
  e.Forbids = "Forbids";
  e.Requires = "Requires";
}(_e || (_e = {}));

var Ue = {
  __proto__: null,
  get KeyRelationship() {
    return _e;
  },
  applyCascade: function applyCascade(e, ...t) {
    return cascade(e, Array.isArray(t[0]) ? t[0] : t);
  },
  cascade,
  hasExactLength,
  isArray,
  isDict: function isDict(e, t = {}) {
    return isRecord(e, t);
  },
  isLiteral,
  isOneOf,
  isRecord,
  isString,
  isTuple,
  isUnknown: function isUnknown() {
    return makeValidator({
      test: (e, t) => !0
    });
  },
  makeTrait,
  makeValidator,
  matchesRegExp
};

async function* run$4(e, r) {
  var a = r.headers ? {
    url: r.input,
    headers: r.headers
  } : r.input;
  var s = c({
    rootPath: process.cwd(),
    origin: a
  });
  var l;
  try {
    l = (await s.load()).schema;
  } catch (e) {
    throw externalError("Failed to load schema.", e);
  }
  var D;
  if (!r.output && e.pipeTo) {
    D = e.pipeTo;
  } else if (r.output) {
    D = t.resolve(process.cwd(), r.output);
  } else {
    var d;
    var f;
    try {
      d = await i(r.tsconfig);
      f = n(d.pluginConfig, d.rootPath);
    } catch (e) {
      throw externalError("Failed to load configuration.", e);
    }
    if ("schema" in f && "string" == typeof f.schema && ".graphql" === t.extname(f.schema)) {
      D = t.resolve(t.dirname(d.configPath), f.schema);
    } else if (!("schema" in f)) {
      throw errorMessage$1(`Output path cannot be automatically determined when multiple schemas are configured,\nbecause multiple ${code("schemas")} are set up.` + hint(`You have to explicitly pass an ${code("--output")} argument to this command,\nor pipe this command to an output file.`));
    } else {
      throw errorMessage$1(`Output path cannot be automatically determined,\nbecause ${code("schema")} is not a file path.\n` + hint(`You have to either set ${code('"schema"')} in your configuration to a ${code(".graphql")} file,\npass an ${code("--output")} argument to this command,\nor pipe this command to an output file.`));
    }
  }
  try {
    await writeOutput(D, m(l));
  } catch (e) {
    throw externalError("Something went wrong while writing the introspection file", e);
  }
  yield function summary() {
    return text([ cmd(Se.Style, $e.BrightGreen), `${Ie.Tick} Schema was generated successfully\n` ]);
  }();
}

var Ge = isArray(cascade(isString(), matchesRegExp(/^[\w-]+[ ]*:[ ]*.+/i)));

var parseHeaders = e => {
  if (e && e.length) {
    return (e || []).reduce(((e, t) => {
      var r = t.indexOf(":");
      var i = t.slice(0, r);
      var n = t.slice(r + 1);
      e[i.trimEnd()] = n.trimStart();
      return e;
    }), {});
  }
};

class GenerateSchema extends Command {
  static paths=[ [ "generate-schema" ], [ "generate", "schema" ] ];
  input=String$1({
    name: "schema",
    required: !0
  });
  tsconfig=String$1("--tsconfig,-c", {
    description: "Specify the `tsconfig.json` used to read, unless `--output` is passed."
  });
  output=String$1("--output,-o", {
    description: "Specify where to output the file to.\tDefault: The `schema` configuration option, if it's a file path"
  });
  headers=function Array$1(e, t, r) {
    var [i, n] = rerouteArguments(t, {});
    var {arity: a = 1} = n;
    var s = e.split(",");
    var l = new Set(s);
    return makeCommandOption({
      definition(e) {
        e.addOption({
          names: s,
          arity: a,
          hidden: null == n ? void 0 : n.hidden,
          description: null == n ? void 0 : n.description,
          required: n.required
        });
      },
      transformer(e, t, r) {
        var a;
        var s = void 0 !== i ? [ ...i ] : void 0;
        for (var {name: c, value: D} of r.options) {
          if (!l.has(c)) {
            continue;
          }
          a = c;
          (s = null != s ? s : []).push(D);
        }
        if (void 0 !== s) {
          return applyValidator(null != a ? a : t, s, n.validator);
        } else {
          return s;
        }
      }
    });
  }("--header", {
    description: "Headers to be used when introspection a schema from a remote URL",
    validator: Ge
  });
  async execute() {
    var e = initTTY();
    var t = await e.start(run$4(e, {
      input: this.input,
      headers: parseHeaders(this.headers),
      output: this.output,
      tsconfig: this.tsconfig
    }));
    return exitCode() || ("object" == typeof t ? t.exit : 0);
  }
}

async function generateSchema(e) {
  var t = initTTY({
    disableTTY: !0
  });
  var r = await t.start(run$4(t, e));
  if (r instanceof Error) {
    throw r;
  }
}

var We = process.cwd();

var He = "  ";

function warningFile(t) {
  var r = e.relative(We, t);
  if (!r.startsWith("..")) {
    t = r;
  }
  return text([ cmd(Se.Style, $e.Underline), t, cmd(Se.Style, $e.NoUnderline), "\n" ]);
}

var documentSummary = e => {
  var t = "";
  if ("number" == typeof e) {
    t += text([ cmd(Se.Style, $e.BrightGreen), `${Ie.Tick} Type cache was generated successfully `, cmd(Se.Style, $e.BrightBlack), `(${e} document types cached)\n` ]);
  } else {
    t += text([ cmd(Se.Style, $e.BrightGreen), `${Ie.Tick} Type caches were generated successfully.\n` ]);
    for (var r in e) {
      t += text([ cmd(Se.Style, $e.BrightBlack), `${Te.BottomLeft} `, cmd(Se.Style, $e.BrightBlue), `${e[r]} document types cached for the '${r}' schema\n` ]);
    }
  }
  return t;
};

function warningSummary(e) {
  return error([ cmd(Se.Style, $e.Red), `${Ie.Cross} ${e} warnings\n` ]);
}

function infoSummary$1(e, t) {
  var r = "";
  if (e) {
    r += text([ cmd(Se.Style, $e.BrightYellow), Ie.Warning, ` ${e} warnings\n` ]);
  }
  return r += documentSummary(t);
}

function warningGithub(e) {
  githubAnnotation("warning", e.message, {
    file: e.file,
    line: e.line,
    col: e.col
  });
}

function runningTurbo(e, t) {
  var r = e ? t ? `(${e}/${t})` : `(${e})` : "";
  return pipe(interval(150), map((e => text([ cmd(Se.Style, $e.Magenta), Ne[e % Ne.length], " ", cmd(Se.Style, $e.Foreground), `Scanning files${ke.Ellipsis} `, cmd(Se.Style, $e.BrightBlack), r ]))));
}

var Ve = [ "/* eslint-disable */", "/* prettier-ignore */" ].join("\n") + "\n";

async function* run$3(t, r) {
  var {runTurbo: a} = await import("./thread-chunk2.mjs");
  var s;
  var l;
  try {
    s = await i(r.tsconfig);
    l = n(s.pluginConfig, s.rootPath);
  } catch (e) {
    throw externalError("Failed to load configuration.", e);
  }
  var c = e.dirname(s.configPath);
  var D;
  var d = [];
  if ("schema" in l) {
    if (!r.output && t.pipeTo) {
      D = t.pipeTo;
    } else if (r.output) {
      D = e.resolve(process.cwd(), r.output);
    } else if (l.tadaTurboLocation) {
      D = e.resolve(c, l.tadaTurboLocation);
    } else if (l.tadaOutputLocation) {
      D = e.resolve(c, l.tadaOutputLocation, "..", "graphql-cache.d.ts");
      yield function hintMessage$1(e) {
        return error([ cmd(Se.Style, [ $e.Yellow, $e.Bold ]), `${Ie.Warning} Note: `, cmd(Se.Style, $e.Reset), `${e.trim()}\n\n` ]);
      }(`No output location was specified.\nThe turbo cache will by default be saved as ${code('"graphql-cache.d.ts"')}.\n` + hint(`To change this, add a ${code('"tadaTurboLocation"')} in your configuration,\npass an ${code("--output")} argument to this command,\nor pipe this command to an output file.`));
    } else {
      throw errorMessage$1("No output path was specified to write the output file to.\n" + hint(`You have to either set ${code('"tadaTurboLocation"')} in your configuration,\npass an ${code("--output")} argument to this command,\nor pipe this command to an output file.`));
    }
  } else if ("schemas" in l) {
    for (var f of l.schemas) {
      if (f.tadaTurboLocation) {
        d.push({
          path: e.resolve(c, f.tadaTurboLocation),
          schemaName: f.name
        });
      }
    }
  }
  var p = a({
    rootPath: s.rootPath,
    configPath: s.configPath,
    pluginConfig: l,
    turboOutputPath: "string" == typeof D ? D : d
  });
  var h = [];
  var g = [];
  var m = 0;
  var E = 0;
  var w = 0;
  try {
    if (t.isInteractive) {
      yield runningTurbo();
    }
    for await (var S of p) {
      if ("EXTERNAL_WARNING" === S.kind) {
        yield experimentMessage(`${code(".vue")} and ${code(".svelte")} file support is experimental.`);
      } else if ("FILE_COUNT" === S.kind) {
        E = S.fileCount;
      } else if ("GRAPHQL_SOURCES" === S.kind) {
        g = S.sources;
      } else {
        w++;
        h.push(...S.documents);
        m += S.warnings.length;
        if (S.warnings.length) {
          var b = warningFile(S.filePath);
          for (var B of S.warnings) {
            b += (O = B, text([ He, cmd(Se.Style, $e.BrightBlack), `${O.line}:${O.col}`, ke.Tab, cmd(Se.Style, $e.Foreground), indent(O.message.trim(), text([ He, ke.Tab ])), ke.Newline ]));
            warningGithub(B);
          }
          yield b + "\n";
        }
      }
      if (t.isInteractive) {
        yield runningTurbo(w, E);
      }
    }
  } catch (e) {
    throw externalError("Could not build cache", e);
  }
  var O;
  if ("schema" in l) {
    if (m && r.failOnWarn) {
      throw warningSummary(m);
    }
    try {
      var k = {};
      for (var I of h) {
        k[I.argumentKey] = I.documentType;
      }
      var M = createCacheContents(k, g, D);
      await writeOutput(D, M);
    } catch (e) {
      throw externalError("Something went wrong while writing the type cache file", e);
    }
    yield infoSummary$1(m, h.length);
  } else {
    if (r.output) {
      throw errorMessage$1("Output path was specified, while multiple schemas are configured.\n" + hint(`You can only output all schemas to their ${code('"tadaTurboLocation"')} options\nwhen multiple ${code("schemas")} are set up.`));
    }
    var _ = {};
    for (var U of l.schemas) {
      var {name: G, tadaTurboLocation: H} = U;
      if (!H) {
        throw errorMessage$1(`No output path was specified to write the '${G}' type cache to.\n` + hint(`You have to set ${code('"tadaTurboLocation"')} in each schema configuration.`));
      }
      try {
        _[G] = 0;
        var V = {};
        for (var K of h) {
          if (K.schemaName === G) {
            V[K.argumentKey] = K.documentType;
            _[G]++;
          }
        }
        var Y = e.resolve(c, H);
        var z = createCacheContents(V, g, Y);
        await writeOutput(Y, z);
      } catch (e) {
        throw externalError(`Something went wrong while writing the '${G}' schema's type cache file.`, e);
      }
    }
    if (m && r.failOnWarn) {
      throw warningSummary(m);
    } else {
      yield infoSummary$1(m, _);
    }
  }
}

function createCacheContents(t, r, i) {
  var n = "";
  for (var a in t) {
    if (n) {
      n += "\n";
    }
    n += `    ${a}:\n      ${t[a]};`;
  }
  var s = "import type { TadaDocumentNode, $tada } from 'gql.tada';\n";
  var l = "string" == typeof i || i && "object" == typeof i && "toString" in i && !("writable" in i);
  var c = new Set;
  for (var D of r) {
    for (var d of D.imports) {
      if (l) {
        var f = i.toString();
        var p = e.dirname(D.absolutePath);
        if (e.resolve(p, d.specifier) === e.resolve(f) || c.has(d.specifier)) {
          continue;
        }
        c.add(d.specifier);
      }
      s += d.importClause + "\n";
    }
  }
  return Ve + s + "\ndeclare module 'gql.tada' {\n interface setupCache {\n" + n + "\n  }\n}\n";
}

class TurboCommand extends Command {
  static paths=[ [ "generate", "turbo" ], [ "turbo" ] ];
  tsconfig=String$1("--tsconfig,-c", {
    description: "Specify the `tsconfig.json` read for configuration."
  });
  failOnWarn=Boolean$1("--fail-on-warn,-w", !1, {
    description: "Triggers an error and a non-zero exit code if any warnings have been reported"
  });
  output=String$1("--output,-o", {
    description: "Specifies where to output the file to.\tDefault: The `tadaTurboLocation` configuration option"
  });
  async execute() {
    var e = initTTY();
    var t = await e.start(run$3(e, {
      failOnWarn: this.failOnWarn,
      output: this.output,
      tsconfig: this.tsconfig
    }));
    return exitCode() || ("object" == typeof t ? t.exit : 0);
  }
}

async function generateTurbo(e) {
  var t = initTTY({
    disableTTY: !0
  });
  var r = await t.start(run$3(t, e));
  if (r instanceof Error) {
    throw r;
  }
}

var qe = {
  __proto__: null,
  generateOutput,
  generatePersisted,
  generateSchema,
  generateTurbo
};

var Ke = process.cwd();

var Ye = "  ";

function diagnosticFile(t) {
  var r = e.relative(Ke, t);
  if (!r.startsWith("..")) {
    t = r;
  }
  return text([ cmd(Se.Style, $e.Underline), t, cmd(Se.Style, $e.NoUnderline), "\n" ]);
}

function diagnosticMessage(e) {
  var t = $e.Foreground;
  if ("info" === e.severity) {
    t = $e.BrightBlue;
  } else if ("warn" === e.severity) {
    t = $e.BrightYellow;
  } else if ("error" === e.severity) {
    t = $e.BrightRed;
  }
  return text([ Ye, cmd(Se.Style, $e.BrightBlack), `${e.line}:${e.col}`, ke.Tab, cmd(Se.Style, t), e.severity, ke.Tab, cmd(Se.Style, $e.Foreground), indent(e.message.trim(), text([ Ye, ke.Tab, ke.Tab ])), ke.Newline ]);
}

function diagnosticMessageGithub(e) {
  githubAnnotation("warn" === e.severity ? "warning" : "error" === e.severity ? "error" : "notice", e.message, {
    file: e.file,
    line: e.line,
    col: e.col,
    endLine: e.endLine,
    endColumn: e.endColumn
  });
}

function runningDiagnostics(e, t) {
  var r = e ? t ? `(${e}/${t})` : `(${e})` : "";
  return pipe(interval(150), map((e => text([ cmd(Se.Style, $e.Magenta), Ne[e % Ne.length], " ", cmd(Se.Style, $e.Foreground), `Checking files${ke.Ellipsis} `, cmd(Se.Style, $e.BrightBlack), r ]))));
}

var isMinSeverity = (e, t) => {
  switch (e) {
   case "info":
    return "warn" !== t && "error" !== t;

   case "warn":
    return "error" !== t;

   case "error":
    return !0;
  }
};

async function* run$2(e, t) {
  var {runDiagnostics: r} = await import("./thread-chunk3.mjs");
  var a;
  var s;
  try {
    a = await i(t.tsconfig);
    s = n(a.pluginConfig, a.rootPath);
  } catch (e) {
    throw externalError("Failed to load configuration.", e);
  }
  var l = {
    warn: 0,
    error: 0,
    info: 0
  };
  var c = t.minSeverity;
  var D = r({
    rootPath: a.rootPath,
    configPath: a.configPath,
    pluginConfig: s
  });
  var d = 0;
  var f = 0;
  try {
    if (e.isInteractive) {
      yield runningDiagnostics();
    }
    for await (var p of D) {
      if ("EXTERNAL_WARNING" === p.kind) {
        yield experimentMessage(`${code(".vue")} and ${code(".svelte")} file support is experimental.`);
      } else if ("FILE_COUNT" === p.kind) {
        d = p.fileCount;
      } else {
        f++;
        var h = "";
        for (var g of p.messages) {
          l[g.severity]++;
          if (isMinSeverity(g.severity, c)) {
            h += diagnosticMessage(g);
            diagnosticMessageGithub(g);
          }
        }
        if (h) {
          yield diagnosticFile(p.filePath) + h + "\n";
        }
      }
      if (e.isInteractive) {
        yield runningDiagnostics(f, d);
      }
    }
  } catch (e) {
    throw externalError("Could not check files", e);
  }
  if ("info" !== c) {
    l.info = 0;
  }
  if (t.failOnWarn && l.warn || l.error) {
    throw function problemsSummary(e) {
      var {info: t, error: r, warn: i} = e;
      var n = "";
      if (t) {
        n += text([ cmd(Se.Style, $e.Blue), Ie.Info, ` ${t} notices\n` ]);
      }
      return error(n += text([ cmd(Se.Style, $e.Red), Ie.Cross, ` ${r + i} problems (${r} errors, ${i} warnings)\n` ]));
    }(l);
  } else {
    yield function infoSummary(e) {
      var {info: t, error: r, warn: i} = e;
      var n = "";
      if (t) {
        n += text([ cmd(Se.Style, $e.Blue), Ie.Info, ` ${t} notices\n` ]);
      }
      if (r || i) {
        n += text([ cmd(Se.Style, $e.BrightYellow), Ie.Warning, ` ${r + i} problems (${r} errors, ${i} warnings)\n` ]);
      } else {
        n += text([ cmd(Se.Style, $e.BrightGreen), Ie.Tick, " No problems found\n" ]);
      }
      return n;
    }(l);
  }
}

class CheckCommand extends Command {
  static paths=[ [ "check" ] ];
  tsconfig=String$1("--tsconfig,-c", {
    description: "Specify the `tsconfig.json` used to read"
  });
  failOnWarn=Boolean$1("--fail-on-warn,-w", !1, {
    description: "Triggers an error and a non-zero exit code if any warnings have been reported"
  });
  minSeverity=String$1("--level,-l", {
    description: "The minimum severity of diagnostics to display (info, warn, error)",
    validator: isOneOf([ isLiteral("info"), isLiteral("warn"), isLiteral("error") ])
  }) || "info";
  async execute() {
    var e = initTTY();
    var t = await e.start(run$2(e, {
      failOnWarn: this.failOnWarn,
      minSeverity: this.minSeverity,
      tsconfig: this.tsconfig
    }));
    return exitCode() || ("object" == typeof t ? t.exit : 0);
  }
}

var ze = new Intl.Collator(0, {
  numeric: 1
}).compare;

var Je = "5.5.0", Xe = "4.1.0", Ze = "1.0.0";

var semverComply = (e, t) => {
  var r = e.match(/\d+\.\d+\.\d+/);
  return r ? function semiver(e, t, r) {
    e = e.split(".");
    t = t.split(".");
    return ze(e[0], t[0]) || ze(e[1], t[1]) || (t[2] = t.slice(2).join("."), (r = /[.-]/.test(e[2] = e.slice(2).join("."))) == /[.-]/.test(t[2]) ? ze(e[2], t[2]) : r ? -1 : 1);
  }(r[0], t) >= 0 : !1;
};

var spanToFilePosition = (e, t) => {
  var r = {
    fileName: e.fileName,
    line: 1,
    col: 1,
    endLine: void 0,
    endColumn: void 0
  };
  var i = e.getLineAndCharacterOfPosition("number" == typeof t ? t : t.start);
  r.line = i.line + 1;
  r.col = i.character + 1;
  if ("number" != typeof t && t.length > 1) {
    i = e.getLineAndCharacterOfPosition(t.start + t.length - 1);
    r.endLine = i.line + 1;
    r.endColumn = i.character + 1;
  }
  return r;
};

/**!
 * The MIT License (MIT)
 * Copyright (c) Microsoft Corporation
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
 * associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial
 * portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
 * NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @see {@link https://github.com/microsoft/TypeScript-Website/blob/7f1c6e0577a0df9f945530a876ec87145a8b1fee/packages/typescript-vfs/src/index.ts}
 */ function notImplemented(e) {
  throw new Error(`Method '${e}' is not implemented.`);
}

var defaultCompilerOptions = e => ({
  ...e.getDefaultCompilerOptions(),
  jsx: e.JsxEmit.React,
  strict: !0,
  esModuleInterop: !0,
  module: e.ModuleKind.ESNext,
  suppressOutputPathCheck: !0,
  skipLibCheck: !0,
  skipDefaultLibCheck: !0,
  moduleResolution: e.ModuleResolutionKind.NodeJs
});

function createVirtualCompilerHost(e, t, r) {
  var i = new Map;
  return {
    compilerHost: {
      ...e,
      getCanonicalFileName: e => e,
      getDefaultLibFileName: () => "/" + r.getDefaultLibFileName(t),
      getDirectories: () => [],
      getNewLine: () => e.newLine,
      getSourceFile: n => i.get(n) || (e => {
        i.set(e.fileName, e);
        return e;
      })(r.createSourceFile(n, e.readFile(n), t.target || defaultCompilerOptions(r).target, !1)),
      useCaseSensitiveFileNames: () => e.useCaseSensitiveFileNames
    },
    updateFile: t => {
      var r = i.has(t.fileName);
      e.writeFile(t.fileName, t.text);
      i.set(t.fileName, t);
      return r;
    }
  };
}

function createVirtualLanguageServiceHost(e, t, r, i, n) {
  var a = [ ...t ];
  var {compilerHost: s, updateFile: l} = createVirtualCompilerHost(e, r, i);
  var c = new Map;
  var D = 0;
  return {
    languageServiceHost: {
      ...s,
      getProjectVersion: () => D.toString(),
      getCompilationSettings: () => r,
      getCustomTransformers: () => n,
      getScriptFileNames: () => a.slice(),
      getScriptSnapshot: t => {
        var r = e.readFile(t);
        if (r) {
          return i.ScriptSnapshot.fromString(r);
        }
        return;
      },
      getScriptVersion: e => c.get(e) || "0",
      writeFile: e.writeFile
    },
    updateFile: e => {
      D++;
      c.set(e.fileName, D.toString());
      if (!a.includes(e.fileName)) {
        a.push(e.fileName);
      }
      l(e);
    }
  };
}

function getDefaultExportFromCjs(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}

var Qe = {};

var et = {};

var tt = {};

Object.defineProperty(tt, "__esModule", {
  value: !0
});

tt.binarySearch = void 0;

tt.binarySearch = function binarySearch$2(e, t) {
  var r = 0;
  var i = e.length - 1;
  while (r <= i) {
    var n = Math.floor((r + i) / 2);
    var a = e[n];
    if (a < t) {
      r = n + 1;
    } else if (a > t) {
      i = n - 1;
    } else {
      r = n;
      i = n;
      break;
    }
  }
  return Math.max(Math.min(r, i, e.length - 1), 0);
};

var rt = {};

Object.defineProperty(rt, "__esModule", {
  value: !0
});

rt.getStack = rt.track = rt.resetOffsetStack = rt.offsetStack = rt.setTracking = void 0;

var it = !0;

var nt = 0;

rt.setTracking = function setTracking(e) {
  it = e;
};

rt.offsetStack = function offsetStack() {
  nt++;
};

rt.resetOffsetStack = function resetOffsetStack() {
  nt--;
};

rt.track = function track(e, t = []) {
  return [ new Proxy(e, {
    get(e, t, r) {
      if (it) {
        if ("push" === t) {
          return push;
        }
        if ("pop" === t) {
          return pop;
        }
        if ("shift" === t) {
          return shift;
        }
        if ("unshift" === t) {
          return unshift;
        }
        if ("splice" === t) {
          return splice;
        }
        if ("sort" === t) {
          return sort;
        }
        if ("reverse" === t) {
          return reverse;
        }
      }
      return Reflect.get(e, t, r);
    }
  }), t ];
  function push(...r) {
    t.push({
      stack: getStack(),
      length: r.length
    });
    return e.push(...r);
  }
  function pop() {
    if (t.length) {
      var r = t[t.length - 1];
      if (r.length > 1) {
        r.length--;
      } else {
        t.pop();
      }
    }
    return e.pop();
  }
  function shift() {
    if (t.length) {
      var r = t[0];
      if (r.length > 1) {
        r.length--;
      } else {
        t.shift();
      }
    }
    return e.shift();
  }
  function unshift(...r) {
    t.unshift({
      stack: getStack(),
      length: r.length
    });
    return e.unshift(...r);
  }
  function splice(r, i, ...n) {
    if (void 0 === i) {
      i = e.length - r;
    }
    var a = 0;
    var s;
    for (var l = 0; l < t.length; l++) {
      var c = t[l];
      var D = a;
      a = D + c.length;
      if (r >= D) {
        s = l + 1;
        var d = c.length;
        c.length = r - D;
        t.splice(s, 0, {
          stack: c.stack,
          length: d - c.length
        });
        break;
      }
    }
    if (void 0 === s) {
      throw new Error("Invalid splice operation");
    }
    var f = i;
    for (var p = s; p < t.length; p++) {
      var h = t[p];
      while (f > 0 && h.length > 0) {
        h.length--;
        f--;
      }
      if (0 === f) {
        break;
      }
    }
    t.splice(s, 0, {
      stack: getStack(),
      length: n.length
    });
    return e.splice(r, i, ...n);
  }
  function sort(r) {
    t.splice(0, t.length, {
      stack: getStack(),
      length: e.length
    });
    return e.sort(r);
  }
  function reverse() {
    t.splice(0, t.length, {
      stack: getStack(),
      length: e.length
    });
    return e.reverse();
  }
};

function getStack() {
  var e = (new Error).stack.split("\n")[3 + nt].trim();
  if (e.endsWith(")")) {
    e = e.slice(e.lastIndexOf("(") + 1, -1);
  } else {
    e = e.slice(e.lastIndexOf(" ") + 1);
  }
  return e;
}

rt.getStack = getStack;

var at = {};

Object.defineProperty(at, "__esModule", {
  value: !0
});

!function(e) {
  var t = this && this.__createBinding || (Object.create ? function(e, t, r, i) {
    if (void 0 === i) {
      i = r;
    }
    var n = Object.getOwnPropertyDescriptor(t, r);
    if (!n || ("get" in n ? !t.__esModule : n.writable || n.configurable)) {
      n = {
        enumerable: !0,
        get: function() {
          return t[r];
        }
      };
    }
    Object.defineProperty(e, i, n);
  } : function(e, t, r, i) {
    if (void 0 === i) {
      i = r;
    }
    e[i] = t[r];
  });
  var r = this && this.__exportStar || function(e, r) {
    for (var i in e) {
      if ("default" !== i && !Object.prototype.hasOwnProperty.call(r, i)) {
        t(r, e, i);
      }
    }
  };
  Object.defineProperty(e, "__esModule", {
    value: !0
  });
  e.replaceRange = e.replaceSourceRange = e.replaceAll = e.replace = e.create = e.toString = e.getLength = void 0;
  var i = tt;
  var n = rt;
  r(at, e);
  r(rt, e);
  function getLength(e) {
    var t = 0;
    for (var r of e) {
      t += "string" == typeof r ? r.length : r[0].length;
    }
    return t;
  }
  e.getLength = getLength;
  function toString(e) {
    return e.map((e => "string" == typeof e ? e : e[0])).join("");
  }
  e.toString = toString;
  e.create = function create(e) {
    return [ [ e, void 0, 0 ] ];
  };
  e.replace = function replace(e, t, ...r) {
    var i = toString(e).match(t);
    if (i && void 0 !== i.index) {
      var a = i.index;
      var s = a + i[0].length;
      (0, n.offsetStack)();
      replaceRange(e, a, s, ...r.map((e => "function" == typeof e ? e(i[0]) : e)));
      (0, n.resetOffsetStack)();
    }
  };
  e.replaceAll = function replaceAll(e, t, ...r) {
    var i = toString(e);
    var a = i.matchAll(t);
    var s = i.length;
    var l = 0;
    var _loop = function(t) {
      if (void 0 !== t.index) {
        var i = t.index + l;
        var a = i + t[0].length;
        (0, n.offsetStack)();
        replaceRange(e, i, a, ...r.map((e => "function" == typeof e ? e(t[0]) : e)));
        (0, n.resetOffsetStack)();
        var c = getLength(e);
        l += c - s;
        s = c;
      }
    };
    for (var c of a) {
      _loop(c);
    }
  };
  e.replaceSourceRange = function replaceSourceRange(e, t, r, i, ...a) {
    for (var s of e) {
      if ("string" == typeof s) {
        continue;
      }
      if (s[1] === t) {
        var l = s[2];
        var c = s[2] + s[0].length;
        if (l <= r && c >= i) {
          var D = [];
          if (r > l) {
            D.push(trimSegmentEnd(s, r - l));
          }
          for (var d of a) {
            D.push(d);
          }
          if (i < c) {
            D.push(trimSegmentStart(s, i - c));
          }
          combineStrings(D);
          (0, n.offsetStack)();
          e.splice(e.indexOf(s), 1, ...D);
          (0, n.resetOffsetStack)();
          return !0;
        }
      }
    }
    return !1;
  };
  function replaceRange(e, t, r, ...a) {
    var s = function toOffsets(e) {
      var t = [];
      var r = 0;
      for (var i of e) {
        t.push(r);
        r += "string" == typeof i ? i.length : i[0].length;
      }
      return t;
    }(e);
    var l = (0, i.binarySearch)(s, t);
    var c = (0, i.binarySearch)(s, r);
    var D = e[c];
    var d = s[l];
    var f = s[c];
    var p = s[c] + ("string" == typeof D ? D.length : D[0].length);
    var h = [];
    if (t > d) {
      h.push(trimSegmentEnd(e[l], t - d));
    }
    for (var g of a) {
      h.push(g);
    }
    if (r < p) {
      h.push(trimSegmentStart(D, r - f));
    }
    combineStrings(h);
    (0, n.offsetStack)();
    e.splice(l, c - l + 1, ...h);
    (0, n.resetOffsetStack)();
  }
  e.replaceRange = replaceRange;
  function combineStrings(e) {
    for (var t = e.length - 1; t >= 1; t--) {
      if ("string" == typeof e[t] && "string" == typeof e[t - 1]) {
        e[t - 1] = e[t - 1] + e[t];
        (0, n.offsetStack)();
        e.splice(t, 1);
        (0, n.resetOffsetStack)();
      }
    }
  }
  function trimSegmentEnd(e, t) {
    if ("string" == typeof e) {
      return e.slice(0, t);
    }
    return [ e[0].slice(0, t), ...e.slice(1) ];
  }
  function trimSegmentStart(e, t) {
    if ("string" == typeof e) {
      return e.slice(t);
    }
    if (t < 0) {
      t += e[0].length;
    }
    return [ e[0].slice(t), e[1], e[2] + t, ...e.slice(3) ];
  }
}(et);

var ot = {};

var ut = {};

Object.defineProperty(ut, "__esModule", {
  value: !0
});

ut.binarySearch = void 0;

ut.binarySearch = function binarySearch(e, t) {
  var r = 0;
  var i = e.length - 1;
  var n;
  while (r <= i) {
    var a = Math.floor((r + i) / 2);
    var s = e[a];
    if (s < t) {
      r = a + 1;
    } else if (s > t) {
      i = a - 1;
    } else {
      r = a;
      i = a;
      n = a;
      break;
    }
  }
  return {
    low: Math.max(Math.min(r, i, e.length - 1), 0),
    high: Math.min(Math.max(r, i, 0), e.length - 1),
    match: n
  };
};

var st = {};

Object.defineProperty(st, "__esModule", {
  value: !0
});

st.translateOffset = void 0;

st.translateOffset = function translateOffset(e, t, r, i) {
  for (var n = 0; n < t.length; n++) {
    var a = t[n];
    if (e >= a && e <= a + i[n]) {
      return r[n] + e - a;
    }
  }
};

Object.defineProperty(ot, "__esModule", {
  value: !0
});

ot.SourceMap = void 0;

var lt = ut;

var ct = st;

ot.SourceMap = class SourceMap {
  constructor(e) {
    this.mappings = e;
  }
  getSourceOffset(e) {
    for (var t of this.findMatching(e, "generatedOffsets", "sourceOffsets")) {
      return t;
    }
  }
  getGeneratedOffset(e) {
    for (var t of this.findMatching(e, "sourceOffsets", "generatedOffsets")) {
      return t;
    }
  }
  getSourceOffsets(e) {
    return this.findMatching(e, "generatedOffsets", "sourceOffsets");
  }
  getGeneratedOffsets(e) {
    return this.findMatching(e, "sourceOffsets", "generatedOffsets");
  }
  * findMatching(e, t, r) {
    var i = this.getMemoBasedOnRange(t);
    if (0 === i.offsets.length) {
      return;
    }
    var {low: n, high: a} = (0, lt.binarySearch)(i.offsets, e);
    var s = new Set;
    for (var l = n; l <= a; l++) {
      for (var c of i.mappings[l]) {
        if (s.has(c)) {
          continue;
        }
        s.add(c);
        var D = (0, ct.translateOffset)(e, c[t], c[r], c.lengths);
        if (void 0 !== D) {
          yield [ D, c ];
        }
      }
    }
  }
  getMemoBasedOnRange(e) {
    return "sourceOffsets" === e ? this.sourceCodeOffsetsMemo ??= this.createMemo("sourceOffsets") : this.generatedCodeOffsetsMemo ??= this.createMemo("generatedOffsets");
  }
  createMemo(e) {
    var t = new Set;
    for (var r of this.mappings) {
      for (var i = 0; i < r[e].length; i++) {
        t.add(r[e][i]);
        t.add(r[e][i] + r.lengths[i]);
      }
    }
    var n = [ ...t ].sort(((e, t) => e - t));
    var a = n.map((() => new Set));
    for (var s of this.mappings) {
      for (var l = 0; l < s[e].length; l++) {
        var c = (0, lt.binarySearch)(n, s[e][l]).match;
        var D = (0, lt.binarySearch)(n, s[e][l] + s.lengths[l]).match;
        for (var d = c; d <= D; d++) {
          a[d].add(s);
        }
      }
    }
    return {
      offsets: n,
      mappings: a
    };
  }
};

var Dt = {};

Object.defineProperty(Dt, "__esModule", {
  value: !0
});

Dt.buildMappings = void 0;

Dt.buildMappings = function buildMappings(e) {
  var t = 0;
  var r = [];
  for (var i of e) {
    if ("string" == typeof i) {
      t += i.length;
    } else {
      r.push({
        source: i[1],
        sourceOffsets: [ i[2] ],
        generatedOffsets: [ t ],
        lengths: [ i[0].length ],
        data: i[3]
      });
      t += i[0].length;
    }
  }
  return r;
};

var dt = {};

Object.defineProperty(dt, "__esModule", {
  value: !0
});

dt.buildStacks = void 0;

dt.buildStacks = function buildStacks(e, t) {
  var r = 0;
  var i = 0;
  var n = [];
  for (var a of t) {
    var s = r;
    for (var l = 0; l < a.length; l++) {
      var c = e[i + l];
      if ("string" == typeof c) {
        r += c.length;
      } else {
        r += c[0].length;
      }
    }
    i += a.length;
    n.push({
      source: a.stack,
      range: [ s, r ]
    });
  }
  return n;
};

!function(e) {
  var t = this && this.__createBinding || (Object.create ? function(e, t, r, i) {
    if (void 0 === i) {
      i = r;
    }
    var n = Object.getOwnPropertyDescriptor(t, r);
    if (!n || ("get" in n ? !t.__esModule : n.writable || n.configurable)) {
      n = {
        enumerable: !0,
        get: function() {
          return t[r];
        }
      };
    }
    Object.defineProperty(e, i, n);
  } : function(e, t, r, i) {
    if (void 0 === i) {
      i = r;
    }
    e[i] = t[r];
  });
  var r = this && this.__exportStar || function(e, r) {
    for (var i in e) {
      if ("default" !== i && !Object.prototype.hasOwnProperty.call(r, i)) {
        t(r, e, i);
      }
    }
  };
  Object.defineProperty(e, "__esModule", {
    value: !0
  });
  r(et, e);
  r(ot, e);
  r(st, e);
  r(Dt, e);
  r(dt, e);
}(Qe);

class SourceMappedFile extends Qe.SourceMap {
  constructor(e, t) {
    super(e);
    this.sourceFile = t.sourceFile;
    this.sourceFileId = t.sourceFileId;
    this.generatedFileId = t.generatedFileId;
  }
  getSourceSpan(e) {
    var t = this.getSourceOffset("number" == typeof e ? e : e.start);
    if (null != t) {
      var r = "number" != typeof e ? this.getSourceOffset(e.start + e.length - 1) : null;
      return {
        fileName: this.sourceFileId,
        start: t[0],
        length: null != r ? r[0] - t[0] + 1 : "number" != typeof e ? e.length : 1
      };
    } else {
      return {
        fileName: this.generatedFileId,
        start: "number" != typeof e ? e.start : e,
        length: "number" != typeof e ? e.length : 1
      };
    }
  }
}

function maybeBind(e, t) {
  return t ? t.bind(e) : t;
}

var buildLanguageService = t => {
  var {virtualMap: r} = t;
  var i = w.createLanguageService(t.languageServiceHost);
  var n = maybeBind(i, i.getProgram);
  var mapFileFn = e => (t, ...n) => {
    var a = r.get(t);
    if (a && a.sourceFileId === t) {
      t = a.generatedFileId;
    }
    return e.call(i, t, ...n);
  };
  var mapFileTextSpanFn = e => (t, n, ...a) => {
    var s = r.get(t);
    if (s && s.sourceFileId === t) {
      t = s.generatedFileId;
      var l = s.getGeneratedOffset(n.start)?.[0];
      var c = s.getGeneratedOffset(n.start + n.length - 1)?.[0];
      if (null != l) {
        n = {
          start: l,
          length: n.length
        };
        if (null != c) {
          n.length = c - l + 1;
        }
      }
    }
    return e.call(i, t, n, ...a);
  };
  var mapFileTextRangeFn = e => (t, n, ...a) => {
    var s = r.get(t);
    if (s && s.sourceFileId === t) {
      t = s.generatedFileId;
      var l = s.getGeneratedOffset(n.pos)?.[0];
      var c = s.getGeneratedOffset(n.end)?.[0];
      if (null != l) {
        n = {
          pos: l,
          end: l + (n.end - n.pos)
        };
        if (null != c) {
          n.end = c;
        }
      }
    }
    return e.call(i, t, n, ...a);
  };
  var mapFilePositionFn = e => (t, n, ...a) => {
    var s = r.get(t);
    if (s && s.sourceFileId === t) {
      t = s.generatedFileId;
      n = s.getGeneratedOffset(n)?.[0] ?? n;
    }
    return e.call(i, t, n, ...a);
  };
  var mapFileStartEndFn = e => (t, n, a, ...s) => {
    var l = r.get(t);
    if (l && l.sourceFileId === t) {
      t = l.generatedFileId;
      n = l.getGeneratedOffset(n)?.[0] ?? n;
      a = l.getGeneratedOffset(a)?.[0] ?? a;
    }
    return e.call(i, t, n, a, ...s);
  };
  var a;
  return Object.assign(i, {
    getProgram() {
      if (a) {
        return a;
      } else {
        var r = n();
        return r ? a = (t => {
          var {program: r, virtualMap: i, projectRoot: n} = t;
          var a = maybeBind(r, r.isSourceFileFromExternalLibrary);
          var s = maybeBind(r, r.getModeForResolutionAtIndex);
          var l = maybeBind(r, r.getSourceFile);
          var c = maybeBind(r, r.getSourceFiles);
          var mapSourceFileFn = e => (t, ...n) => {
            var a = t && i.get(t.fileName);
            if (a && a.sourceFileId === t?.fileName) {
              t = l(a.generatedFileId) || t;
            }
            return e.call(r, t, ...n);
          };
          return Object.assign(r, {
            getSyntacticDiagnostics: mapSourceFileFn(r.getSyntacticDiagnostics),
            getSemanticDiagnostics: mapSourceFileFn(r.getSemanticDiagnostics),
            getDeclarationDiagnostics: mapSourceFileFn(r.getDeclarationDiagnostics),
            isSourceFileDefaultLibrary: mapSourceFileFn(r.isSourceFileDefaultLibrary),
            getModeForUsageLocation: mapSourceFileFn(r.getModeForUsageLocation),
            isSourceFileFromExternalLibrary(e) {
              var t = i.get(e.fileName);
              return !(!t || t.sourceFileId !== e.fileName) || a(e);
            },
            getSourceFiles() {
              var t = [];
              for (var i of c()) {
                if (!e.relative(n, i.fileName).startsWith("..") && !r.isSourceFileFromExternalLibrary(i)) {
                  t.push(i);
                }
              }
              return t;
            },
            getSourceFile(e) {
              var t = i.get(e);
              if (t && t.sourceFileId === e) {
                e = t.generatedFileId;
              }
              return l(e);
            },
            getModeForResolutionAtIndex(e, t) {
              var r = i.get(e.fileName);
              if (r && r.sourceFileId === e.fileName) {
                e = l(r.generatedFileId) || e;
                t = r.getGeneratedOffset(t)?.[0] ?? t;
              }
              return s(e, t);
            }
          });
        })({
          program: r,
          virtualMap: t.virtualMap,
          projectRoot: t.projectRoot
        }) : void 0;
      }
    },
    getReferencesAtPosition: mapFilePositionFn(i.getReferencesAtPosition),
    findReferences: mapFilePositionFn(i.findReferences),
    getDefinitionAtPosition: mapFilePositionFn(i.getDefinitionAtPosition),
    getDefinitionAndBoundSpan: mapFilePositionFn(i.getDefinitionAndBoundSpan),
    getTypeDefinitionAtPosition: mapFilePositionFn(i.getTypeDefinitionAtPosition),
    getImplementationAtPosition: mapFilePositionFn(i.getImplementationAtPosition),
    getCompletionsAtPosition: mapFilePositionFn(i.getCompletionsAtPosition),
    getCompletionEntryDetails: mapFilePositionFn(i.getCompletionEntryDetails),
    getCompletionEntrySymbol: mapFilePositionFn(i.getCompletionEntrySymbol),
    getQuickInfoAtPosition: mapFilePositionFn(i.getQuickInfoAtPosition),
    getBreakpointStatementAtPosition: mapFilePositionFn(i.getBreakpointStatementAtPosition),
    getSignatureHelpItems: mapFilePositionFn(i.getSignatureHelpItems),
    getRenameInfo: mapFilePositionFn(i.getRenameInfo),
    getSmartSelectionRange: mapFilePositionFn(i.getSmartSelectionRange),
    getDocumentHighlights: mapFilePositionFn(i.getDocumentHighlights),
    prepareCallHierarchy: mapFilePositionFn(i.prepareCallHierarchy),
    provideCallHierarchyIncomingCalls: mapFilePositionFn(i.provideCallHierarchyIncomingCalls),
    provideCallHierarchyOutgoingCalls: mapFilePositionFn(i.provideCallHierarchyOutgoingCalls),
    getBraceMatchingAtPosition: mapFilePositionFn(i.getBraceMatchingAtPosition),
    getIndentationAtPosition: mapFilePositionFn(i.getIndentationAtPosition),
    getFormattingEditsAfterKeystroke: mapFilePositionFn(i.getFormattingEditsAfterKeystroke),
    getDocCommentTemplateAtPosition: mapFilePositionFn(i.getDocCommentTemplateAtPosition),
    isValidBraceCompletionAtPosition: mapFilePositionFn(i.isValidBraceCompletionAtPosition),
    getJsxClosingTagAtPosition: mapFilePositionFn(i.getJsxClosingTagAtPosition),
    getLinkedEditingRangeAtPosition: mapFilePositionFn(i.getLinkedEditingRangeAtPosition),
    getSpanOfEnclosingComment: mapFilePositionFn(i.getSpanOfEnclosingComment),
    getSyntacticClassifications: mapFileTextSpanFn(i.getSyntacticClassifications),
    getSemanticClassifications: mapFileTextSpanFn(i.getSemanticClassifications),
    getEncodedSyntacticClassifications: mapFileTextSpanFn(i.getEncodedSyntacticClassifications),
    getEncodedSemanticClassifications: mapFileTextSpanFn(i.getEncodedSemanticClassifications),
    provideInlayHints: mapFileTextSpanFn(i.provideInlayHints),
    getNameOrDottedNameSpan: mapFileStartEndFn(i.getNameOrDottedNameSpan),
    getFormattingEditsForRange: mapFileStartEndFn(i.getFormattingEditsForRange),
    getCodeFixesAtPosition: mapFileStartEndFn(i.getCodeFixesAtPosition),
    getFileReferences: mapFileFn(i.getFileReferences),
    getNavigationBarItems: mapFileFn(i.getNavigationBarItems),
    getNavigationTree: mapFileFn(i.getNavigationTree),
    getOutliningSpans: mapFileFn(i.getOutliningSpans),
    getTodoComments: mapFileFn(i.getTodoComments),
    getFormattingEditsForDocument: mapFileFn(i.getFormattingEditsForDocument),
    getEditsForRefactor: mapFileFn(i.getEditsForRefactor),
    getEmitOutput: mapFileFn(i.getEmitOutput),
    getSuggestionDiagnostics: mapFileFn(i.getSuggestionDiagnostics),
    getSemanticDiagnostics: mapFileFn(i.getSemanticDiagnostics),
    getSyntacticDiagnostics: mapFileFn(i.getSyntacticDiagnostics),
    getSupportedCodeFixes: mapFileFn(i.getSupportedCodeFixes),
    toggleLineComment: mapFileTextRangeFn(i.toggleLineComment),
    toggleMultilineComment: mapFileTextRangeFn(i.toggleMultilineComment),
    commentSelection: mapFileTextRangeFn(i.commentSelection),
    uncommentSelection: mapFileTextRangeFn(i.uncommentSelection)
  });
};

var buildPluginInfo = e => {
  var t;
  return {
    config: e.config,
    get languageService() {
      return e.getLanguageService();
    },
    get languageServiceHost() {
      return t || (t = createVirtualLanguageServiceHost(e.system, [ ...e.rootNames ], e.options, w).languageServiceHost);
    },
    project: {
      getProjectName: () => e.projectRoot,
      projectService: {
        logger: console
      }
    },
    serverHost: {
      ...e.system,
      setImmediate,
      clearImmediate
    }
  };
};

var ft;

var pt;

var ht = [ ".svelte", ".vue" ];

var transform = async t => {
  var r = e.extname(t.fileName);
  if (".svelte" === r) {
    return (async (...e) => {
      if (!ft) {
        try {
          ft = await import("@gql.tada/svelte-support");
        } catch (e) {
          throw new TadaError(Fe.SVELTE_SUPPORT, "For Svelte support the `@gql.tada/svelte-support` package must be installed.\nInstall the package and try again.");
        }
      }
      return ft.transform(...e);
    })(t);
  } else if (".vue" === r) {
    await (async () => {
      if (!pt) {
        try {
          pt = await import("@gql.tada/vue-support");
        } catch (e) {
          throw new TadaError(Fe.VUE_SUPPORT, "For Vue support the `@gql.tada/vue-support` package must be installed.\nInstall the package and try again.");
        }
      }
      return pt.check();
    })();
    return (async (...e) => {
      if (!pt) {
        try {
          pt = await import("@gql.tada/vue-support");
        } catch (e) {
          throw new TadaError(Fe.VUE_SUPPORT, "For Vue support the `@gql.tada/vue-support` package must be installed.\nInstall the package and try again.");
        }
      }
      return pt.transform(...e);
    })(t);
  } else {
    throw new TadaError(Fe.UNKNOWN_EXTERNAL_FILE, `Tried transforming unknown file type "${r}". Supported: ${ht.join(", ")}`);
  }
};

var programFactory = t => {
  var r = new Map;
  var i = new Map;
  var n = function createFSBackedSystem(t, r, i, n) {
    var a = r + "/vfs";
    var s = i.sys;
    var l = n ?? e.dirname(require.resolve("typescript"));
    return {
      name: "fs-vfs",
      root: a,
      args: [],
      realpath: e => {
        if (s.realpath) {
          return s.realpath(e);
        }
        return e;
      },
      createDirectory: () => notImplemented("createDirectory"),
      directoryExists: e => Array.from(t.keys()).some((t => t.startsWith(e))) || s.directoryExists(e),
      exit: s.exit,
      fileExists: e => {
        if (t.has(e)) {
          return !0;
        }
        if (e.includes("tsconfig.json") || e.includes("tsconfig.json")) {
          return !1;
        }
        if (e.startsWith("/lib")) {
          var r = `${l}/${e.replace("/", "")}`;
          return s.fileExists(r);
        }
        return s.fileExists(e);
      },
      getCurrentDirectory: () => a,
      getDirectories: s.getDirectories,
      getExecutingFilePath: () => notImplemented("getExecutingFilePath"),
      readDirectory: (...e) => {
        if ("/" === e[0]) {
          return Array.from(t.keys());
        } else {
          return s.readDirectory(...e);
        }
      },
      readFile: e => {
        if (t.has(e)) {
          return t.get(e);
        }
        if (e.startsWith("/lib")) {
          var r = `${l}/${e.replace("/", "")}`;
          var i = s.readFile(r);
          if (!i) {
            var n = s.readDirectory(l);
            throw new Error(`TSVFS: A request was made for ${r} but there wasn't a file found in the file map. You likely have a mismatch in the compiler options for the CDN download vs the compiler program. Existing Libs: ${n}.`);
          }
          return i;
        }
        return s.readFile(e);
      },
      resolvePath: e => {
        if (t.has(e)) {
          return e;
        }
        return s.resolvePath(e);
      },
      newLine: "\n",
      useCaseSensitiveFileNames: !0,
      write: () => notImplemented("write"),
      writeFile: (e, r) => {
        t.set(e, r);
      }
    };
  }(r, t.rootPath, w, resolveDefaultLibsPath(t));
  var a = resolveConfig(t, n);
  var s = new Set(a.fileNames);
  var l = {
    ...w.getDefaultCompilerOptions(),
    getDefaultLibFilePath: w.getDefaultLibFilePath(a.options),
    ...a.options
  };
  var c = !1;
  if ("Bundler" in w.ModuleResolutionKind && (l.moduleResolution === w.ModuleResolutionKind.NodeNext || l.moduleResolution === w.ModuleResolutionKind.Node16)) {
    c = !0;
    l.moduleResolution = w.ModuleResolutionKind.Bundler;
  }
  var D = createVirtualCompilerHost(n, l, w);
  var d = {
    get projectPath() {
      return t.rootPath;
    },
    get wasOriginallyNodeNext() {
      return c;
    },
    get projectDirectories() {
      var r = new Set([ t.rootPath ]);
      for (var i of s) {
        r.add(e.dirname(i));
      }
      return [ ...r ];
    },
    createSourceFile: (e, t) => w.createSourceFile(e.fileId, "object" == typeof e.sourceText ? e.sourceText.getText(0, e.sourceText.getLength()) : e.sourceText, l.target || w.ScriptTarget.ESNext, !0, t || (null != e.scriptKind ? e.scriptKind : w.ScriptKind.TSX)),
    createExternalFiles(r = ht) {
      var i = [];
      var a = new Set(s);
      var l = new Set([ t.rootPath ]);
      for (var c of s) {
        l.add(e.dirname(c));
      }
      for (var D of l) {
        for (var f of n.readDirectory(D, r, [ "**/node_modules" ])) {
          if (!a.has(f)) {
            a.add(f);
            var p = n.readFile(f, "utf8");
            if (p) {
              i.push(d.createSourceFile({
                fileId: f,
                sourceText: p
              }, w.ScriptKind.External));
            }
          }
        }
      }
      return i;
    },
    addSourceFile(e) {
      var t = "fileName" in e ? e : d.createSourceFile(e, w.ScriptKind.TSX);
      D.updateFile(t);
      s.add(t.fileName);
      return d;
    },
    addMappedFile(e, t) {
      var r = "fileName" in e ? e : d.createSourceFile(e, w.ScriptKind.External);
      if (t.mappings.length) {
        s.delete(r.fileName);
      }
      var n = new SourceMappedFile(t.mappings, {
        sourceFile: r,
        sourceFileId: r.fileName,
        generatedFileId: t.fileId
      });
      i.set(n.sourceFileId, n);
      i.set(n.generatedFileId, n);
      return d;
    },
    async addVirtualFiles(e) {
      for (var t of e) {
        var r = `${t.fileName}.ts`;
        var i = await transform(t);
        if (i) {
          d.addSourceFile({
            fileId: r,
            sourceText: i.snapshot
          }).addMappedFile(t, {
            mappings: i.mappings,
            fileId: r
          });
        }
      }
      return d;
    },
    resolveModuleName(t, r, i) {
      if (!t.startsWith(".")) {
        return t;
      }
      var n = w.resolveModuleName(t, r, l, D.compilerHost);
      if (n.resolvedModule) {
        var a = n.resolvedModule.resolvedFileName;
        var s = e.dirname(i);
        var c = e.relative(s, a);
        if (!c.startsWith(".")) {
          c = "./" + c;
        }
        return c.replace(/\\/g, "/");
      }
      var d = e.dirname(r);
      var f = e.dirname(i);
      var p = e.resolve(d, t);
      var h = e.relative(f, p);
      if (!h.startsWith(".")) {
        h = "./" + h;
      }
      return h.replace(/\\/g, "/");
    },
    build() {
      (() => {
        if ("stackTraceLimit" in Error && Error.stackTraceLimit < 25) {
          Error.stackTraceLimit = 25;
        }
      })();
      S({
        typescript: w
      });
      return (e => {
        var t;
        var r;
        var i;
        var n;
        var getLanguageServiceHost = () => i || (i = createVirtualLanguageServiceHost(e.system, [ ...e.rootNames ], e.options, w).languageServiceHost);
        var getLanguageService = () => r || (r = buildLanguageService({
          system: e.system,
          rootNames: e.rootNames,
          virtualMap: e.virtualMap,
          options: e.options,
          projectRoot: e.projectRoot,
          languageServiceHost: getLanguageServiceHost()
        }));
        var getProgram = () => {
          if (!t) {
            t = getLanguageService().getProgram() || w.createProgram({
              rootNames: e.rootNames,
              options: e.options,
              host: e.compilerHost
            });
          }
          return t;
        };
        return {
          get program() {
            return getProgram();
          },
          get languageService() {
            return getLanguageService();
          },
          buildPluginInfo: t => n || (n = buildPluginInfo({
            getLanguageService,
            getLanguageServiceHost,
            projectRoot: e.projectRoot,
            rootNames: e.rootNames,
            system: e.system,
            options: e.options,
            config: t
          })),
          getSourceFile: e => getProgram().getSourceFile(e),
          getSourceFiles: () => getProgram().getSourceFiles(),
          getSourceMappedFile: t => e.virtualMap.get("string" != typeof t ? t.fileName : t),
          getSourceSpan(t, r) {
            var i = "string" != typeof t ? t.fileName : t;
            var n = e.virtualMap.get(i);
            return n ? n.getSourceSpan(r) : {
              fileName: i,
              start: "number" != typeof r ? r.start : r,
              length: "number" != typeof r ? r.length : 1
            };
          },
          getSourcePosition(t, r) {
            var i = e.virtualMap.get("string" != typeof t ? t.fileName : t);
            if (i) {
              var n = i.getSourceSpan(r);
              if (n.fileName === i.sourceFileId) {
                return spanToFilePosition(i.sourceFile, n);
              }
            }
            return spanToFilePosition("string" == typeof t ? getProgram().getSourceFile(t) : t, r);
          }
        };
      })({
        virtualMap: i,
        projectRoot: t.rootPath,
        compilerHost: D.compilerHost,
        rootNames: [ ...s ],
        options: l,
        system: n
      });
    }
  };
  return d;
};

var resolveDefaultLibsPath = t => {
  var r = w.getDefaultLibFilePath({});
  if (!w.sys.fileExists(r)) {
    var i = E(t.configPath);
    var n = "typescript/package.json";
    try {
      return e.dirname(i.resolve(n, {
        paths: [ e.join(e.dirname(t.configPath), "node_modules"), e.join(t.rootPath, "node_modules"), ...i.resolve.paths(n) || [] ]
      }));
    } catch (r) {
      return e.resolve(t.rootPath, "node_modules", "typescript", "lib");
    }
  } else {
    return e.dirname(r);
  }
};

var resolveConfig = (t, r) => {
  var i = r.readFile(t.configPath, "utf8") || "{}";
  var n = w.parseConfigFileTextToJson(t.configPath, i);
  if (null != n.error) {
    throw new Error(n.error.messageText.toString());
  }
  var a = e.dirname(t.configPath);
  return w.parseJsonConfigFileContent(n.config, r, a, w.getDefaultCompilerOptions(), t.configPath);
};

var gt = function(e) {
  e[e.File = 0] = "File";
  e[e.Directory = 1] = "Directory";
  return e;
}({});

var stat = async (e, t = gt.File) => await d.stat(e).then((e => {
  switch (t) {
   case gt.File:
    return e.isFile();

   case gt.Directory:
    return e.isDirectory();
  }
})).catch((() => !1));

var vt = /^(?:graphql\.config|\.graphqlrc)\.(?:cjs|[jt]s|json|toml|ya?ml)$/i;

var findGraphQLConfig = async t => {
  var r = process.cwd();
  var i = e.resolve(r, "/");
  while (r !== i) {
    var n = [];
    try {
      n = await d.readdir(r);
    } catch (e) {}
    var a = n.find((e => vt.test(e)));
    if (a) {
      return a;
    }
    if (await stat(e.resolve(r, ".git"), gt.Directory)) {
      break;
    } else if (await stat(e.resolve(r, ".vscode"), gt.Directory)) {
      break;
    }
    r = e.resolve(r, "..");
  }
  var s = await (async t => {
    var r = t || process.cwd();
    var i = e.resolve(r, "/");
    while (r !== i) {
      if (await stat(e.resolve(r, ".git"), gt.Directory)) {
        return r;
      } else if (await stat(e.resolve(r, ".vscode"), gt.Directory)) {
        return r;
      } else if (await stat(e.resolve(r, "pnpm-workspace.yml"))) {
        return r;
      }
      var n = e.resolve(r, "package.json");
      if (await stat(n)) {
        try {
          var a = JSON.parse(await d.readFile(n, "utf8"));
          if (a && "object" == typeof a && Array.isArray(a.workspaces)) {
            return r;
          }
        } catch (e) {}
      }
      r = e.resolve(r, "..");
    }
    return null;
  })(t);
  if (s) {
    var l = e.resolve(s, "package.json");
    if (await stat(l)) {
      try {
        var c = JSON.parse(await d.readFile(l, "utf8"));
        if (c && "object" == typeof c && "graphql" in c && c.graphql && "object" == typeof c.graphql) {
          return l;
        }
      } catch (e) {}
    }
  }
  return null;
};

var loadPnpmWorkspaceCatalogs = async () => {
  var e = await (async (e = process.cwd()) => {
    var r = e;
    var i = t.parse(r).root;
    while (r !== i) {
      var n = t.join(r, "pnpm-workspace.yaml");
      try {
        await f.access(n);
        return r;
      } catch {}
      r = t.dirname(r);
    }
    return null;
  })();
  if (!e) {
    return null;
  }
  try {
    var r = t.join(e, "pnpm-workspace.yaml");
    return (e => {
      var t = e.split("\n");
      var r = {};
      var i = null;
      var n = null;
      for (var a of t) {
        var s = a.trim();
        if (!s || s.startsWith("#")) {
          continue;
        }
        if (s.endsWith(":") && !s.includes(" ")) {
          var l = s.slice(0, -1).replace(/['"]/g, "");
          if ("packages" === l) {
            i = "packages";
            r.packages = [];
          } else if ("catalog" === l) {
            i = "catalog";
            r.catalog = {};
          } else if ("catalogs" === l) {
            i = "catalogs";
            r.catalogs = {};
          } else if ("catalogs" === i) {
            n = l;
            r.catalogs[l] = {};
          }
        } else if (s.startsWith("- ")) {
          if ("packages" === i) {
            r.packages.push(s.slice(2).replace(/['"]/g, ""));
          }
        } else if (s.includes(":")) {
          var c = s.indexOf(":");
          var D = s.slice(0, c).trim().replace(/['"]/g, "");
          var d = s.slice(c + 1).trim().replace(/['"]/g, "");
          if ("catalog" === i) {
            r.catalog[D] = d;
          } else if ("catalogs" === i && n) {
            r.catalogs[n][D] = d;
          }
        }
      }
      return r;
    })(await f.readFile(r, "utf-8"));
  } catch {
    return null;
  }
};

var loadBunWorkspaceCatalogs = async () => {
  var e = await (async (e = process.cwd()) => {
    var r = e;
    var i = t.parse(r).root;
    while (r !== i) {
      var n = t.join(r, "package.json");
      try {
        await f.access(n);
        var a = await f.readFile(n, "utf-8");
        var s = JSON.parse(a);
        if (s.workspaces && (s.workspaces.catalog || s.workspaces.catalogs)) {
          return r;
        }
      } catch {}
      r = t.dirname(r);
    }
    return null;
  })();
  if (!e) {
    return null;
  }
  try {
    var r = t.join(e, "package.json");
    var i = await f.readFile(r, "utf-8");
    var n = JSON.parse(i);
    if (!n.workspaces) {
      return null;
    }
    var a = {};
    if (n.workspaces.packages) {
      a.packages = n.workspaces.packages;
    }
    if (n.workspaces.catalog) {
      a.catalog = n.workspaces.catalog;
    }
    if (n.workspaces.catalogs) {
      a.catalogs = n.workspaces.catalogs;
    }
    return a;
  } catch {
    return null;
  }
};

var loadWorkspaceCatalogs = async () => {
  var e = await loadPnpmWorkspaceCatalogs();
  if (e) {
    return e;
  }
  var t = await loadBunWorkspaceCatalogs();
  if (t) {
    return t;
  }
  return null;
};

var resolveCatalogVersion = e => {
  if (!e.startsWith("catalog:")) {
    return null;
  }
  var t = e.slice(8);
  if (!t || "default" === t) {
    return null;
  }
  return t;
};

var getVersionFromCatalog = (e, t, r) => {
  if (t) {
    return r.catalogs?.[t]?.[e] || null;
  } else {
    return r.catalog?.[e] || null;
  }
};

var getPackageVersion = async (e, t) => {
  var r = t.devDependencies?.[e];
  if (r) {
    if (r.startsWith("catalog:")) {
      var i = await loadWorkspaceCatalogs();
      if (i) {
        var n = resolveCatalogVersion(r);
        var a = getVersionFromCatalog(e, n, i);
        if (a) {
          return a;
        }
      }
    } else {
      return r;
    }
  }
  var s = t.dependencies?.[e];
  if (s) {
    if (s.startsWith("catalog:")) {
      var l = await loadWorkspaceCatalogs();
      if (l) {
        var c = resolveCatalogVersion(s);
        var D = getVersionFromCatalog(e, c, l);
        if (D) {
          return D;
        }
      }
    } else {
      return s;
    }
  }
  return null;
};

var hasPackageSupport = async (e, t) => {
  if (await getPackageVersion(e, t)) {
    return !0;
  }
  try {
    return !!E(__dirname)(`${e}/package.json`)?.version;
  } catch (e) {
    return !1;
  }
};

var hasSvelteSupport = async e => hasPackageSupport("@gql.tada/svelte-support", e);

var hasVueSupport = async e => hasPackageSupport("@gql.tada/vue-support", e);

var jsonParse = async e => {
  var t = await d.readFile(e, "utf8");
  var r = w.parseJsonText(e, t);
  return w.convertToObject(r, []);
};

var isVSCodeInstalled = async () => {
  if (!process.env.HOME) {
    return !1;
  }
  var t = e.resolve(process.env.HOME, ".vscode");
  return !!await stat(t, gt.Directory);
};

var loadSuggestedExtensionsList = async t => {
  var r = process.cwd();
  var i = e.resolve(r, "/");
  while (r !== i) {
    if (await stat(e.resolve(r, ".git"), gt.Directory)) {
      break;
    } else if (await stat(e.resolve(r, ".vscode"), gt.Directory)) {
      break;
    }
    r = e.resolve(r, "..");
  }
  var n = e.resolve(r, ".vscode", "extensions.json");
  if (!await stat(n)) {
    return [];
  }
  var a;
  try {
    a = await jsonParse(n);
  } catch (e) {
    return [];
  }
  if (a && "object" == typeof a && "recommendations" in a) {
    return Array.isArray(a.recommendations) ? a.recommendations.filter((e => e && "string" == typeof e)).map((e => `${e}`.toLowerCase())) : [];
  } else {
    return [];
  }
};

var loadExtensionsList = async () => {
  if (!process.env.HOME) {
    return [];
  }
  var t = e.resolve(process.env.HOME, ".vscode");
  var r = e.resolve(t, "extensions", "extensions.json");
  if (!await stat(r)) {
    return [];
  }
  var i;
  try {
    i = await jsonParse(r);
  } catch (e) {
    return [];
  }
  return (Array.isArray(i) ? i : []).map((e => {
    if (!e || "object" != typeof e || !("identifier" in e)) {
      return null;
    }
    if (!e.identifier || "object" != typeof e.identifier || !("id" in e.identifier)) {
      return null;
    }
    return e.identifier.id && "string" == typeof e.identifier.id ? `${e.identifier.id}`.toLowerCase() : null;
  })).filter((e => !!e));
};

function emptyLine() {
  return text([ cmd(Se.Style, $e.BrightBlack), Te.Vertical, "\n" ]);
}

function completedTask(e, t = !1) {
  return text([ emptyLine(), cmd(Se.Style, $e.BrightBlack), t ? Te.BottomLeft : Te.VerticalRight, " ", cmd(Se.Style, $e.Green), Ie.TickSwoosh, " ", cmd(Se.Style, $e.Foreground), e, "\n" ]);
}

function failedTask(e) {
  return text([ emptyLine(), cmd(Se.Style, $e.BrightBlack), Te.BottomLeft, " ", cmd(Se.Style, $e.BrightRed), Ie.CrossSwoosh, " ", cmd(Se.Style, $e.Foreground), e, "\n" ]);
}

function warningTask(e) {
  return text([ emptyLine(), cmd(Se.Style, $e.BrightBlack), Te.VerticalRight, " ", cmd(Se.Style, $e.BrightYellow), Ie.Warning, " ", cmd(Se.Style, $e.Foreground), e, "\n" ]);
}

function hintMessage(e) {
  return text([ cmd(Se.Style, $e.BrightBlack), `${Te.VerticalRight} `, cmd(Se.Style, $e.BrightBlue), `${Ie.Info} `, cmd(Se.Style, $e.Blue), indent(e, text([ cmd(Se.Style, $e.BrightBlack), `${Te.Vertical}   `, cmd(Se.Style, $e.Blue) ])) ]);
}

function runningTask(e) {
  return pipe(interval(150), map((t => text([ emptyLine(), cmd(Se.Style, $e.Magenta), Pe[t % Pe.length], " ", cmd(Se.Style, $e.Foreground), e.trim() ]))));
}

function errorMessage(e) {
  return error([ "\n", cmd(Se.Style, [ $e.Red, $e.Invert ]), ` ${Ie.Warning} Error `, cmd(Se.Style, $e.NoInvert), `\n${e.trim()}\n` ]);
}

var delay = (e = 700) => {
  if (process.env.CI) {
    return Promise.resolve();
  } else {
    return new Promise((t => {
      setTimeout(t, e);
    }));
  }
};

var mt = function(e) {
  e.TITLE = "Doctor";
  e.DESCRIPTION = "Detects problems with your setup";
  e.CHECK_TS_VERSION = "Checking TypeScript version";
  e.CHECK_DEPENDENCIES = "Checking installed dependencies";
  e.CHECK_TSCONFIG = "Checking tsconfig.json";
  e.CHECK_EXTERNAL_FILES = "Checking external files support";
  e.CHECK_VSCODE = "Checking VSCode setup";
  e.CHECK_SCHEMA = "Checking schema";
  return e;
}(mt || {});

async function* run$1() {
  yield function title(e, t) {
    var r = text([ cmd(Se.Style, $e.BrightBlack), Te.TopLeft, " ", cmd(Se.Style, [ $e.Magenta, $e.Invert ]), ` ${e.trim()} `, cmd(Se.Style, [ $e.NoInvert ]), "\n" ]);
    if (t) {
      r += text([ cmd(Se.Style, $e.BrightBlack), Te.Vertical, ` ${t}\n` ]);
    }
    return r;
  }(mt.TITLE, mt.DESCRIPTION);
  yield runningTask(mt.CHECK_TS_VERSION);
  await delay();
  var e;
  try {
    e = await (async () => {
      var e = t.resolve(process.cwd(), "package.json");
      var r = t.resolve(e);
      return JSON.parse(await f.readFile(r, "utf-8"));
    })();
  } catch (e) {
    yield failedTask(mt.CHECK_TS_VERSION);
    throw errorMessage(`A ${code("package.json")} file was not found in the current working directory.\n` + hint("Try running the doctor command in your workspace folder."));
  }
  var r = await (async e => {
    var t = "typescript";
    var r = await getPackageVersion(t, e);
    if (r) {
      return r;
    }
    try {
      return (await import(t)).version || null;
    } catch (e) {
      return null;
    }
  })(e);
  if (!r) {
    yield failedTask(mt.CHECK_TS_VERSION);
    throw errorMessage(`A version of ${code("typescript")} was not found in your dependencies.\n` + hint(`Is ${code("typescript")} installed in this package?`));
  } else if (!semverComply(r, Xe)) {
    yield failedTask(mt.CHECK_TS_VERSION);
    throw errorMessage(`The version of ${code("typescript")} in your dependencies is out of date.\n` + hint(`${code("gql.tada")} requires at least ${bold(Xe)}`));
  }
  yield completedTask(mt.CHECK_TS_VERSION);
  yield runningTask(mt.CHECK_DEPENDENCIES);
  await delay();
  var s = semverComply(r, Je);
  if (!s) {
    var l = await (async e => {
      var t = "@0no-co/graphqlsp";
      var r = await getPackageVersion(t, e);
      if (r) {
        return r;
      }
      try {
        return E(__dirname)(`${t}/package.json`)?.version || null;
      } catch (e) {
        return null;
      }
    })(e);
    if (!l) {
      yield failedTask(mt.CHECK_DEPENDENCIES);
      throw errorMessage(`A version of ${code("@0no-co/graphqlsp")} was not found in your dependencies.\n` + hint(`Is ${code("@0no-co/graphqlsp")} installed?`));
    } else if (!semverComply(l, Ze)) {
      yield failedTask(mt.CHECK_DEPENDENCIES);
      throw errorMessage(`The version of ${code("@0no-co/graphqlsp")} in your dependencies is out of date.\n` + hint(`${code("gql.tada")} requires at least ${bold(Ze)}`));
    }
  }
  var c = await (async e => {
    var t = "gql.tada";
    var r = await getPackageVersion(t, e);
    if (r) {
      return r;
    }
    try {
      return E(process.cwd())(`${t}/package.json`)?.version || null;
    } catch (e) {
      return null;
    }
  })(e);
  if (!c) {
    yield failedTask(mt.CHECK_DEPENDENCIES);
    throw errorMessage(`A version of ${code("gql.tada")} was not found in your dependencies.\n` + hint(`Is ${code("gql.tada")} installed?`));
  } else if (!semverComply(c, "1.0.0")) {
    yield failedTask(mt.CHECK_DEPENDENCIES);
    throw errorMessage(`The version of ${code("gql.tada")} in your dependencies is out of date.\n` + hint(`It's recommended to upgrade ${code("gql.tada")} to at least ${bold(Ze)}`));
  }
  yield completedTask(mt.CHECK_DEPENDENCIES);
  yield runningTask(mt.CHECK_TSCONFIG);
  await delay();
  var D;
  try {
    D = await i();
  } catch (e) {
    yield failedTask(mt.CHECK_TSCONFIG);
    throw externalError(`A ${code("tsconfig.json")} file was not found in the current working directory.`, e);
  }
  var d;
  try {
    d = n(D.pluginConfig, D.rootPath);
  } catch (e) {
    yield failedTask(mt.CHECK_TSCONFIG);
    throw externalError(`The plugin configuration for ${code(s ? '"gql.tada/ts-plugin"' : '"@0no-co/graphqlsp"')} seems to be invalid.`, e);
  }
  yield completedTask(mt.CHECK_TSCONFIG);
  yield* async function* runExternalFilesChecks(e, r) {
    var i = [];
    try {
      i = programFactory(e).createExternalFiles();
    } catch (e) {
      return;
    }
    if (i.length) {
      yield runningTask(mt.CHECK_EXTERNAL_FILES);
      await delay();
      var n = new Set(i.map((e => t.extname(e.fileName))));
      if (n.has(".svelte") && !await hasSvelteSupport(r)) {
        yield failedTask(mt.CHECK_EXTERNAL_FILES);
        throw errorMessage(`A version of ${code("@gql.tada/svelte-support")} must be installed for Svelte file support.\n` + hint(`Have you installed ${code("@gql.tada/svelte-support")}?`));
      }
      if (n.has(".vue") && !await hasVueSupport(r)) {
        yield failedTask(mt.CHECK_EXTERNAL_FILES);
        throw errorMessage(`A version of ${code("@gql.tada/vue-support")} must be installed for Vue file support.\n` + hint(`Have you installed ${code("@gql.tada/vue-support")}?`));
      }
      yield completedTask(mt.CHECK_EXTERNAL_FILES);
    }
  }(D, e);
  yield* async function* runVSCodeChecks() {
    var e = await loadSuggestedExtensionsList();
    var r = await isVSCodeInstalled();
    if (e.length || r) {
      yield runningTask(mt.CHECK_VSCODE);
      await delay();
      var i = !1;
      var n = [];
      if (r) {
        if (!(n = await loadExtensionsList()).includes("graphql.vscode-graphql-syntax")) {
          if (!i) {
            i = !0;
            yield warningTask(mt.CHECK_VSCODE);
          }
          yield hintMessage(`We recommend you to install the ${code('"GraphQL: Syntax Highlighting"')} extension for VSCode.\nSee: https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql-syntax\n`);
        }
      }
      var a = n.includes("graphql.vscode-graphql") || e.includes("graphql.vscode-graphql");
      var s = await findGraphQLConfig();
      if (a && s) {
        if (!i) {
          i = !0;
          yield warningTask(mt.CHECK_VSCODE);
        }
        var l = t.basename(s);
        yield hintMessage(`The ${code('"GraphQL: Language Feature Support"')} VSCode extension can cause problems!\nWhen enabled it may display invalid diagnostic errors for ${code("gql.tada")} code.\nCheck whether your ${code(l)} config only targets ${code(".graphql")} documents.\n`);
      }
      if (!i) {
        yield completedTask(mt.CHECK_VSCODE);
      }
    }
  }();
  yield runningTask(mt.CHECK_SCHEMA);
  await delay();
  try {
    await a(d).load({
      rootPath: t.dirname(D.configPath)
    });
  } catch (e) {
    yield failedTask(mt.CHECK_SCHEMA);
    throw externalError("Failed to load schema.", e);
  }
  yield completedTask(mt.CHECK_SCHEMA, !0);
  await delay();
  yield function success() {
    return text([ "\n", cmd(Se.Style, [ $e.Green, $e.Invert ]), " Done ", cmd(Se.Style, $e.NoInvert), ke.Space, "You are all set and ready to go.\n" ]);
  }();
}

class DoctorCommand extends Command {
  static paths=[ [ "doctor" ] ];
  async execute() {
    var e = await initTTY().start(run$1());
    return exitCode() || ("object" == typeof e ? e.exit : 0);
  }
}

var Ct = "[";

var yt = {
  to(e, t) {
    if (!t) {
      return `${Ct}${e + 1}G`;
    }
    return `${Ct}${t + 1};${e + 1}H`;
  },
  move(e, t) {
    var r = "";
    if (e < 0) {
      r += `${Ct}${-e}D`;
    } else if (e > 0) {
      r += `${Ct}${e}C`;
    }
    if (t < 0) {
      r += `${Ct}${-t}A`;
    } else if (t > 0) {
      r += `${Ct}${t}B`;
    }
    return r;
  },
  up: (e = 1) => `${Ct}${e}A`,
  down: (e = 1) => `${Ct}${e}B`,
  forward: (e = 1) => `${Ct}${e}C`,
  backward: (e = 1) => `${Ct}${e}D`,
  nextLine: (e = 1) => `${Ct}E`.repeat(e),
  prevLine: (e = 1) => `${Ct}F`.repeat(e),
  left: `${Ct}G`,
  hide: `${Ct}?25l`,
  show: `${Ct}?25h`,
  save: "7",
  restore: "8"
};

var Ft = {
  up: (e = 1) => `${Ct}S`.repeat(e),
  down: (e = 1) => `${Ct}T`.repeat(e)
};

var Et = {
  screen: `${Ct}2J`,
  up: (e = 1) => `${Ct}1J`.repeat(e),
  down: (e = 1) => `${Ct}J`.repeat(e),
  line: `${Ct}2K`,
  lineEnd: `${Ct}K`,
  lineStart: `${Ct}1K`,
  lines(e) {
    var t = "";
    for (var r = 0; r < e; r++) {
      t += this.line + (r < e - 1 ? yt.up() : "");
    }
    if (e) {
      t += yt.left;
    }
    return t;
  }
};

var wt = {
  cursor: yt,
  scroll: Ft,
  erase: Et,
  beep: ""
};

var St = {
  exports: {}
};

var bt = String;

var create = function() {
  return {
    isColorSupported: !1,
    reset: bt,
    bold: bt,
    dim: bt,
    italic: bt,
    underline: bt,
    inverse: bt,
    hidden: bt,
    strikethrough: bt,
    black: bt,
    red: bt,
    green: bt,
    yellow: bt,
    blue: bt,
    magenta: bt,
    cyan: bt,
    white: bt,
    gray: bt,
    bgBlack: bt,
    bgRed: bt,
    bgGreen: bt,
    bgYellow: bt,
    bgBlue: bt,
    bgMagenta: bt,
    bgCyan: bt,
    bgWhite: bt
  };
};

St.exports = create();

St.exports.createColors = create;

var Bt = getDefaultExportFromCjs(St.exports);

function S$1(e) {
  if ("string" != typeof e) {
    throw new TypeError(`Expected a \`string\`, got \`${typeof e}\``);
  }
  return e.replace(function q$1({onlyFirst: e = !1} = {}) {
    var t = [ "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))" ].join("|");
    return new RegExp(t, e ? void 0 : "g");
  }(), "");
}

function j(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}

var xt = {
  exports: {}
};

!function() {
  var e = {};
  xt.exports = e, e.eastAsianWidth = function(e) {
    var t = e.charCodeAt(0), r = 2 == e.length ? e.charCodeAt(1) : 0, i = t;
    return 55296 <= t && t <= 56319 && 56320 <= r && r <= 57343 && (i = (t &= 1023) << 10 | (r &= 1023), 
    i += 65536), 12288 == i || 65281 <= i && i <= 65376 || 65504 <= i && i <= 65510 ? "F" : 8361 == i || 65377 <= i && i <= 65470 || 65474 <= i && i <= 65479 || 65482 <= i && i <= 65487 || 65490 <= i && i <= 65495 || 65498 <= i && i <= 65500 || 65512 <= i && i <= 65518 ? "H" : 4352 <= i && i <= 4447 || 4515 <= i && i <= 4519 || 4602 <= i && i <= 4607 || 9001 <= i && i <= 9002 || 11904 <= i && i <= 11929 || 11931 <= i && i <= 12019 || 12032 <= i && i <= 12245 || 12272 <= i && i <= 12283 || 12289 <= i && i <= 12350 || 12353 <= i && i <= 12438 || 12441 <= i && i <= 12543 || 12549 <= i && i <= 12589 || 12593 <= i && i <= 12686 || 12688 <= i && i <= 12730 || 12736 <= i && i <= 12771 || 12784 <= i && i <= 12830 || 12832 <= i && i <= 12871 || 12880 <= i && i <= 13054 || 13056 <= i && i <= 19903 || 19968 <= i && i <= 42124 || 42128 <= i && i <= 42182 || 43360 <= i && i <= 43388 || 44032 <= i && i <= 55203 || 55216 <= i && i <= 55238 || 55243 <= i && i <= 55291 || 63744 <= i && i <= 64255 || 65040 <= i && i <= 65049 || 65072 <= i && i <= 65106 || 65108 <= i && i <= 65126 || 65128 <= i && i <= 65131 || 110592 <= i && i <= 110593 || 127488 <= i && i <= 127490 || 127504 <= i && i <= 127546 || 127552 <= i && i <= 127560 || 127568 <= i && i <= 127569 || 131072 <= i && i <= 194367 || 177984 <= i && i <= 196605 || 196608 <= i && i <= 262141 ? "W" : 32 <= i && i <= 126 || 162 <= i && i <= 163 || 165 <= i && i <= 166 || 172 == i || 175 == i || 10214 <= i && i <= 10221 || 10629 <= i && i <= 10630 ? "Na" : 161 == i || 164 == i || 167 <= i && i <= 168 || 170 == i || 173 <= i && i <= 174 || 176 <= i && i <= 180 || 182 <= i && i <= 186 || 188 <= i && i <= 191 || 198 == i || 208 == i || 215 <= i && i <= 216 || 222 <= i && i <= 225 || 230 == i || 232 <= i && i <= 234 || 236 <= i && i <= 237 || 240 == i || 242 <= i && i <= 243 || 247 <= i && i <= 250 || 252 == i || 254 == i || 257 == i || 273 == i || 275 == i || 283 == i || 294 <= i && i <= 295 || 299 == i || 305 <= i && i <= 307 || 312 == i || 319 <= i && i <= 322 || 324 == i || 328 <= i && i <= 331 || 333 == i || 338 <= i && i <= 339 || 358 <= i && i <= 359 || 363 == i || 462 == i || 464 == i || 466 == i || 468 == i || 470 == i || 472 == i || 474 == i || 476 == i || 593 == i || 609 == i || 708 == i || 711 == i || 713 <= i && i <= 715 || 717 == i || 720 == i || 728 <= i && i <= 731 || 733 == i || 735 == i || 768 <= i && i <= 879 || 913 <= i && i <= 929 || 931 <= i && i <= 937 || 945 <= i && i <= 961 || 963 <= i && i <= 969 || 1025 == i || 1040 <= i && i <= 1103 || 1105 == i || 8208 == i || 8211 <= i && i <= 8214 || 8216 <= i && i <= 8217 || 8220 <= i && i <= 8221 || 8224 <= i && i <= 8226 || 8228 <= i && i <= 8231 || 8240 == i || 8242 <= i && i <= 8243 || 8245 == i || 8251 == i || 8254 == i || 8308 == i || 8319 == i || 8321 <= i && i <= 8324 || 8364 == i || 8451 == i || 8453 == i || 8457 == i || 8467 == i || 8470 == i || 8481 <= i && i <= 8482 || 8486 == i || 8491 == i || 8531 <= i && i <= 8532 || 8539 <= i && i <= 8542 || 8544 <= i && i <= 8555 || 8560 <= i && i <= 8569 || 8585 == i || 8592 <= i && i <= 8601 || 8632 <= i && i <= 8633 || 8658 == i || 8660 == i || 8679 == i || 8704 == i || 8706 <= i && i <= 8707 || 8711 <= i && i <= 8712 || 8715 == i || 8719 == i || 8721 == i || 8725 == i || 8730 == i || 8733 <= i && i <= 8736 || 8739 == i || 8741 == i || 8743 <= i && i <= 8748 || 8750 == i || 8756 <= i && i <= 8759 || 8764 <= i && i <= 8765 || 8776 == i || 8780 == i || 8786 == i || 8800 <= i && i <= 8801 || 8804 <= i && i <= 8807 || 8810 <= i && i <= 8811 || 8814 <= i && i <= 8815 || 8834 <= i && i <= 8835 || 8838 <= i && i <= 8839 || 8853 == i || 8857 == i || 8869 == i || 8895 == i || 8978 == i || 9312 <= i && i <= 9449 || 9451 <= i && i <= 9547 || 9552 <= i && i <= 9587 || 9600 <= i && i <= 9615 || 9618 <= i && i <= 9621 || 9632 <= i && i <= 9633 || 9635 <= i && i <= 9641 || 9650 <= i && i <= 9651 || 9654 <= i && i <= 9655 || 9660 <= i && i <= 9661 || 9664 <= i && i <= 9665 || 9670 <= i && i <= 9672 || 9675 == i || 9678 <= i && i <= 9681 || 9698 <= i && i <= 9701 || 9711 == i || 9733 <= i && i <= 9734 || 9737 == i || 9742 <= i && i <= 9743 || 9748 <= i && i <= 9749 || 9756 == i || 9758 == i || 9792 == i || 9794 == i || 9824 <= i && i <= 9825 || 9827 <= i && i <= 9829 || 9831 <= i && i <= 9834 || 9836 <= i && i <= 9837 || 9839 == i || 9886 <= i && i <= 9887 || 9918 <= i && i <= 9919 || 9924 <= i && i <= 9933 || 9935 <= i && i <= 9953 || 9955 == i || 9960 <= i && i <= 9983 || 10045 == i || 10071 == i || 10102 <= i && i <= 10111 || 11093 <= i && i <= 11097 || 12872 <= i && i <= 12879 || 57344 <= i && i <= 63743 || 65024 <= i && i <= 65039 || 65533 == i || 127232 <= i && i <= 127242 || 127248 <= i && i <= 127277 || 127280 <= i && i <= 127337 || 127344 <= i && i <= 127386 || 917760 <= i && i <= 917999 || 983040 <= i && i <= 1048573 || 1048576 <= i && i <= 1114109 ? "A" : "N";
  }, e.characterLength = function(e) {
    var t = this.eastAsianWidth(e);
    return "F" == t || "W" == t || "A" == t ? 2 : 1;
  };
  function F(e) {
    return e.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g) || [];
  }
  e.length = function(e) {
    for (var t = F(e), r = 0, i = 0; i < t.length; i++) {
      r += this.characterLength(t[i]);
    }
    return r;
  }, e.slice = function(t, r, i) {
    textLen = e.length(t), i = i || 1, (r = r || 0) < 0 && (r = textLen + r), i < 0 && (i = textLen + i);
    for (var n = "", a = 0, s = F(t), l = 0; l < s.length; l++) {
      var c = s[l], D = e.length(c);
      if (a >= r - (2 == D ? 1 : 0)) {
        if (a + D <= i) {
          n += c;
        } else {
          break;
        }
      }
      a += D;
    }
    return n;
  };
}();

var $t = j(xt.exports);

var At = j((function() {
  return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|(?:\uD83E\uDDD1\uD83C\uDFFF\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFC-\uDFFF])|\uD83D\uDC68(?:\uD83C\uDFFB(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|[\u2695\u2696\u2708]\uFE0F|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))?|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])\uFE0F|\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC)?|(?:\uD83D\uDC69(?:\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC69(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83E\uDDD1(?:\u200D(?:\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDE36\u200D\uD83C\uDF2B|\uD83C\uDFF3\uFE0F\u200D\u26A7|\uD83D\uDC3B\u200D\u2744|(?:(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\uD83C\uDFF4\u200D\u2620|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])\u200D[\u2640\u2642]|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u2600-\u2604\u260E\u2611\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26B0\u26B1\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0\u26F1\u26F4\u26F7\u26F8\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u3030\u303D\u3297\u3299]|\uD83C[\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]|\uD83D[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3])\uFE0F|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDE35\u200D\uD83D\uDCAB|\uD83D\uDE2E\u200D\uD83D\uDCA8|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83E\uDDD1(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83D\uDC69(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC08\u200D\u2B1B|\u2764\uFE0F\u200D(?:\uD83D\uDD25|\uD83E\uDE79)|\uD83D\uDC41\uFE0F|\uD83C\uDFF3\uFE0F|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|[#\*0-9]\uFE0F\u20E3|\u2764\uFE0F|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF4|(?:[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270C\u270D]|\uD83D[\uDD74\uDD90])(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC08\uDC15\uDC3B\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE2E\uDE35\uDE36\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5]|\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD]|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF]|[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0D\uDD0E\uDD10-\uDD17\uDD1D\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78\uDD7A-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCB\uDDD0\uDDE0-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6]|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26A7\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5-\uDED7\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDD77\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
}));

function A(e, t = {}) {
  if ("string" != typeof e || 0 === e.length || (t = {
    ambiguousIsNarrow: !0,
    ...t
  }, 0 === (e = S$1(e)).length)) {
    return 0;
  }
  e = e.replace(At(), "  ");
  var r = t.ambiguousIsNarrow ? 1 : 2;
  var i = 0;
  for (var n of e) {
    var a = n.codePointAt(0);
    if (a <= 31 || a >= 127 && a <= 159 || a >= 768 && a <= 879) {
      continue;
    }
    switch ($t.eastAsianWidth(n)) {
     case "F":
     case "W":
      i += 2;
      break;

     case "A":
      i += r;
      break;

     default:
      i += 1;
    }
  }
  return i;
}

var T = (e = 0) => t => `[${t + e}m`, P = (e = 0) => t => `[${38 + e};5;${t}m`, W = (e = 0) => (t, r, i) => `[${38 + e};2;${t};${r};${i}m`, Ot = {
  modifier: {
    reset: [ 0, 0 ],
    bold: [ 1, 22 ],
    dim: [ 2, 22 ],
    italic: [ 3, 23 ],
    underline: [ 4, 24 ],
    overline: [ 53, 55 ],
    inverse: [ 7, 27 ],
    hidden: [ 8, 28 ],
    strikethrough: [ 9, 29 ]
  },
  color: {
    black: [ 30, 39 ],
    red: [ 31, 39 ],
    green: [ 32, 39 ],
    yellow: [ 33, 39 ],
    blue: [ 34, 39 ],
    magenta: [ 35, 39 ],
    cyan: [ 36, 39 ],
    white: [ 37, 39 ],
    blackBright: [ 90, 39 ],
    gray: [ 90, 39 ],
    grey: [ 90, 39 ],
    redBright: [ 91, 39 ],
    greenBright: [ 92, 39 ],
    yellowBright: [ 93, 39 ],
    blueBright: [ 94, 39 ],
    magentaBright: [ 95, 39 ],
    cyanBright: [ 96, 39 ],
    whiteBright: [ 97, 39 ]
  },
  bgColor: {
    bgBlack: [ 40, 49 ],
    bgRed: [ 41, 49 ],
    bgGreen: [ 42, 49 ],
    bgYellow: [ 43, 49 ],
    bgBlue: [ 44, 49 ],
    bgMagenta: [ 45, 49 ],
    bgCyan: [ 46, 49 ],
    bgWhite: [ 47, 49 ],
    bgBlackBright: [ 100, 49 ],
    bgGray: [ 100, 49 ],
    bgGrey: [ 100, 49 ],
    bgRedBright: [ 101, 49 ],
    bgGreenBright: [ 102, 49 ],
    bgYellowBright: [ 103, 49 ],
    bgBlueBright: [ 104, 49 ],
    bgMagentaBright: [ 105, 49 ],
    bgCyanBright: [ 106, 49 ],
    bgWhiteBright: [ 107, 49 ]
  }
};

Object.keys(Ot.modifier);

Object.keys(Ot.color), Object.keys(Ot.bgColor);

var kt = function tD() {
  var e = new Map;
  for (var [t, r] of Object.entries(Ot)) {
    for (var [i, n] of Object.entries(r)) {
      Ot[i] = {
        open: `[${n[0]}m`,
        close: `[${n[1]}m`
      }, r[i] = Ot[i], e.set(n[0], n[1]);
    }
    Object.defineProperty(Ot, t, {
      value: r,
      enumerable: !1
    });
  }
  return Object.defineProperty(Ot, "codes", {
    value: e,
    enumerable: !1
  }), Ot.color.close = "[39m", Ot.bgColor.close = "[49m", Ot.color.ansi = T(), Ot.color.ansi256 = P(), 
  Ot.color.ansi16m = W(), Ot.bgColor.ansi = T(10), Ot.bgColor.ansi256 = P(10), Ot.bgColor.ansi16m = W(10), 
  Object.defineProperties(Ot, {
    rgbToAnsi256: {
      value: (e, t, r) => e === t && t === r ? e < 8 ? 16 : e > 248 ? 231 : Math.round((e - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(e / 255 * 5) + 6 * Math.round(t / 255 * 5) + Math.round(r / 255 * 5),
      enumerable: !1
    },
    hexToRgb: {
      value: e => {
        var t = /[a-f\d]{6}|[a-f\d]{3}/i.exec(e.toString(16));
        if (!t) {
          return [ 0, 0, 0 ];
        }
        var [r] = t;
        3 === r.length && (r = [ ...r ].map((e => e + e)).join(""));
        var i = Number.parseInt(r, 16);
        return [ i >> 16 & 255, i >> 8 & 255, 255 & i ];
      },
      enumerable: !1
    },
    hexToAnsi256: {
      value: e => Ot.rgbToAnsi256(...Ot.hexToRgb(e)),
      enumerable: !1
    },
    ansi256ToAnsi: {
      value: e => {
        if (e < 8) {
          return 30 + e;
        }
        if (e < 16) {
          return e - 8 + 90;
        }
        var t, r, i;
        if (e >= 232) {
          r = t = (10 * (e - 232) + 8) / 255, i = t;
        } else {
          var n = (e -= 16) % 36;
          t = Math.floor(e / 36) / 5, r = Math.floor(n / 6) / 5, i = n % 6 / 5;
        }
        var a = 2 * Math.max(t, r, i);
        if (0 === a) {
          return 30;
        }
        var s = 30 + (Math.round(i) << 2 | Math.round(r) << 1 | Math.round(t));
        return 2 === a && (s += 60), s;
      },
      enumerable: !1
    },
    rgbToAnsi: {
      value: (e, t, r) => Ot.ansi256ToAnsi(Ot.rgbToAnsi256(e, t, r)),
      enumerable: !1
    },
    hexToAnsi: {
      value: e => Ot.ansi256ToAnsi(Ot.hexToAnsi256(e)),
      enumerable: !1
    }
  }), Ot;
}(), Tt = new Set([ "", "" ]), It = "]8;;", N = e => `${Tt.values().next().value}[${e}m`, L = e => `${Tt.values().next().value}${It}${e}`, y$1 = (e, t, r) => {
  var i = [ ...t ];
  var n = !1, a = !1, s = A(S$1(e[e.length - 1]));
  for (var [l, c] of i.entries()) {
    var D = A(c);
    if (s + D <= r ? e[e.length - 1] += c : (e.push(c), s = 0), Tt.has(c) && (n = !0, 
    a = i.slice(l + 1).join("").startsWith(It)), n) {
      a ? "" === c && (n = !1, a = !1) : "m" === c && (n = !1);
      continue;
    }
    (s += D) === r && l < i.length - 1 && (e.push(""), s = 0);
  }
  !s && e[e.length - 1].length > 0 && e.length > 1 && (e[e.length - 2] += e.pop());
}, ED = (e, t, r = {}) => {
  if (!1 !== r.trim && "" === e.trim()) {
    return "";
  }
  var i, n, a = "";
  var s = (e => e.split(" ").map((e => A(e))))(e);
  var l = [ "" ];
  for (var [c, D] of e.split(" ").entries()) {
    !1 !== r.trim && (l[l.length - 1] = l[l.length - 1].trimStart());
    var d = A(l[l.length - 1]);
    if (0 !== c && (d >= t && (!1 === r.wordWrap || !1 === r.trim) && (l.push(""), d = 0), 
    (d > 0 || !1 === r.trim) && (l[l.length - 1] += " ", d++)), r.hard && s[c] > t) {
      var f = 1 + Math.floor((s[c] - (t - d) - 1) / t);
      Math.floor((s[c] - 1) / t) < f && l.push(""), y$1(l, D, t);
      continue;
    }
    if (d + s[c] > t && d > 0 && s[c] > 0) {
      if (!1 === r.wordWrap && d < t) {
        y$1(l, D, t);
        continue;
      }
      l.push("");
    }
    if (d + s[c] > t && !1 === r.wordWrap) {
      y$1(l, D, t);
      continue;
    }
    l[l.length - 1] += D;
  }
  !1 !== r.trim && (l = l.map((e => (e => {
    var t = e.split(" ");
    var r = t.length;
    for (;r > 0 && !(A(t[r - 1]) > 0); ) {
      r--;
    }
    return r === t.length ? e : t.slice(0, r).join(" ") + t.slice(r).join("");
  })(e))));
  var p = [ ...l.join("\n") ];
  for (var [h, g] of p.entries()) {
    if (a += g, Tt.has(g)) {
      var {groups: m} = new RegExp(`(?:\\[(?<code>\\d+)m|\\${It}(?<uri>.*))`).exec(p.slice(h).join("")) || {
        groups: {}
      };
      if (void 0 !== m.code) {
        var E = Number.parseFloat(m.code);
        i = 39 === E ? void 0 : E;
      } else {
        void 0 !== m.uri && (n = 0 === m.uri.length ? void 0 : m.uri);
      }
    }
    var w = kt.codes.get(Number(i));
    "\n" === p[h + 1] ? (n && (a += L("")), i && w && (a += N(w))) : "\n" === g && (i && w && (a += N(i)), 
    n && (a += L(n)));
  }
  return a;
};

function R(e, t, r) {
  return String(e).normalize().replace(/\r\n/g, "\n").split("\n").map((e => ED(e, t, r))).join("\n");
}

var Nt = Object.defineProperty, a$1 = (e, t, r) => (((e, t, r) => {
  t in e ? Nt(e, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: r
  }) : e[t] = r;
})(e, "symbol" != typeof t ? t + "" : t, r), r);

var Pt = Symbol("clack:cancel");

function hD(e) {
  return e === Pt;
}

function v(e, t) {
  e.isTTY && e.setRawMode(t);
}

var Mt = new Map([ [ "k", "up" ], [ "j", "down" ], [ "h", "left" ], [ "l", "right" ] ]), Lt = new Set([ "up", "down", "left", "right", "space", "enter" ]);

let jt = class x {
  constructor({render: e, input: t = B, output: r = O, ...i}, n = !0) {
    a$1(this, "input"), a$1(this, "output"), a$1(this, "rl"), a$1(this, "opts"), a$1(this, "_track", !1), 
    a$1(this, "_render"), a$1(this, "_cursor", 0), a$1(this, "state", "initial"), a$1(this, "value"), 
    a$1(this, "error", ""), a$1(this, "subscribers", new Map), a$1(this, "_prevFrame", ""), 
    this.opts = i, this.onKeypress = this.onKeypress.bind(this), this.close = this.close.bind(this), 
    this.render = this.render.bind(this), this._render = e.bind(this), this._track = n, 
    this.input = t, this.output = r;
  }
  prompt() {
    var e = new k(0);
    return e._write = (e, t, r) => {
      this._track && (this.value = this.rl.line.replace(/\t/g, ""), this._cursor = this.rl.cursor, 
      this.emit("value", this.value)), r();
    }, this.input.pipe(e), this.rl = h.createInterface({
      input: this.input,
      output: e,
      tabSize: 2,
      prompt: "",
      escapeCodeTimeout: 50
    }), h.emitKeypressEvents(this.input, this.rl), this.rl.prompt(), void 0 !== this.opts.initialValue && this._track && this.rl.write(this.opts.initialValue), 
    this.input.on("keypress", this.onKeypress), v(this.input, !0), this.output.on("resize", this.render), 
    this.render(), new Promise(((e, t) => {
      this.once("submit", (() => {
        this.output.write(wt.cursor.show), this.output.off("resize", this.render), v(this.input, !1), 
        e(this.value);
      })), this.once("cancel", (() => {
        this.output.write(wt.cursor.show), this.output.off("resize", this.render), v(this.input, !1), 
        e(Pt);
      }));
    }));
  }
  on(e, t) {
    var r = this.subscribers.get(e) ?? [];
    r.push({
      cb: t
    }), this.subscribers.set(e, r);
  }
  once(e, t) {
    var r = this.subscribers.get(e) ?? [];
    r.push({
      cb: t,
      once: !0
    }), this.subscribers.set(e, r);
  }
  emit(e, ...t) {
    var r = this.subscribers.get(e) ?? [], i = [];
    var _loop = function(e) {
      e.cb(...t), e.once && i.push((() => r.splice(r.indexOf(e), 1)));
    };
    for (var n of r) {
      _loop(n);
    }
    for (var a of i) {
      a();
    }
  }
  unsubscribe() {
    this.subscribers.clear();
  }
  onKeypress(e, t) {
    if ("error" === this.state && (this.state = "active"), t?.name && !this._track && Mt.has(t.name) && this.emit("cursor", Mt.get(t.name)), 
    t?.name && Lt.has(t.name) && this.emit("cursor", t.name), e && ("y" === e.toLowerCase() || "n" === e.toLowerCase()) && this.emit("confirm", "y" === e.toLowerCase()), 
    "\t" === e && this.opts.placeholder && (this.value || (this.rl.write(this.opts.placeholder), 
    this.emit("value", this.opts.placeholder))), e && this.emit("key", e.toLowerCase()), 
    "return" === t?.name) {
      if (this.opts.validate) {
        var r = this.opts.validate(this.value);
        r && (this.error = r, this.state = "error", this.rl.write(this.value));
      }
      "error" !== this.state && (this.state = "submit");
    }
    "" === e && (this.state = "cancel"), ("submit" === this.state || "cancel" === this.state) && this.emit("finalize"), 
    this.render(), ("submit" === this.state || "cancel" === this.state) && this.close();
  }
  close() {
    this.input.unpipe(), this.input.removeListener("keypress", this.onKeypress), this.output.write("\n"), 
    v(this.input, !1), this.rl.close(), this.emit(`${this.state}`, this.value), this.unsubscribe();
  }
  restoreCursor() {
    var e = R(this._prevFrame, process.stdout.columns, {
      hard: !0
    }).split("\n").length - 1;
    this.output.write(wt.cursor.move(-999, -1 * e));
  }
  render() {
    var e = R(this._render(this) ?? "", process.stdout.columns, {
      hard: !0
    });
    if (e !== this._prevFrame) {
      if ("initial" === this.state) {
        this.output.write(wt.cursor.hide);
      } else {
        var t = function aD(e, t) {
          if (e === t) {
            return;
          }
          var r = e.split("\n"), i = t.split("\n"), n = [];
          for (var a = 0; a < Math.max(r.length, i.length); a++) {
            r[a] !== i[a] && n.push(a);
          }
          return n;
        }(this._prevFrame, e);
        if (this.restoreCursor(), t && 1 === t?.length) {
          var r = t[0];
          this.output.write(wt.cursor.move(0, r)), this.output.write(wt.erase.lines(1));
          var i = e.split("\n");
          this.output.write(i[r]), this._prevFrame = e, this.output.write(wt.cursor.move(0, i.length - r - 1));
          return;
        } else if (t && t?.length > 1) {
          var n = t[0];
          this.output.write(wt.cursor.move(0, n)), this.output.write(wt.erase.down());
          var a = e.split("\n").slice(n);
          this.output.write(a.join("\n")), this._prevFrame = e;
          return;
        }
        this.output.write(wt.erase.down());
      }
      this.output.write(e), "initial" === this.state && (this.state = "active"), this._prevFrame = e;
    }
  }
};

class xD extends jt {
  get cursor() {
    return this.value ? 0 : 1;
  }
  get _value() {
    return 0 === this.cursor;
  }
  constructor(e) {
    super(e, !1), this.value = !!e.initialValue, this.on("value", (() => {
      this.value = this._value;
    })), this.on("confirm", (e => {
      this.output.write(wt.cursor.move(0, -1)), this.value = e, this.state = "submit", 
      this.close();
    })), this.on("cursor", (() => {
      this.value = !this.value;
    }));
  }
}

var Rt = Object.defineProperty, MD = (e, t, r) => (((e, t, r) => {
  t in e ? Rt(e, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: r
  }) : e[t] = r;
})(e, t + "", r), r);

class TD extends jt {
  constructor(e) {
    super(e), MD(this, "valueWithCursor", ""), this.on("finalize", (() => {
      this.value || (this.value = e.defaultValue), this.valueWithCursor = this.value;
    })), this.on("value", (() => {
      if (this.cursor >= this.value.length) {
        this.valueWithCursor = `${this.value}${Bt.inverse(Bt.hidden("_"))}`;
      } else {
        var e = this.value.slice(0, this.cursor), t = this.value.slice(this.cursor);
        this.valueWithCursor = `${e}${Bt.inverse(t[0])}${t.slice(1)}`;
      }
    }));
  }
  get cursor() {
    return this._cursor;
  }
}

var _t = globalThis.process.platform.startsWith("win");

var Ut = function q() {
  return "win32" !== b.platform ? "linux" !== b.env.TERM : Boolean(b.env.CI) || Boolean(b.env.WT_SESSION) || Boolean(b.env.TERMINUS_SUBLIME) || "{cmd::Cmder}" === b.env.ConEmuTask || "Terminus-Sublime" === b.env.TERM_PROGRAM || "vscode" === b.env.TERM_PROGRAM || "xterm-256color" === b.env.TERM || "alacritty" === b.env.TERM || "JetBrains-JediTerm" === b.env.TERMINAL_EMULATOR;
}(), o = (e, t) => Ut ? e : t, Gt = o("◆", "*"), Wt = o("■", "x"), Ht = o("▲", "x"), Vt = o("◇", "o"), qt = o("┌", "T"), Kt = o("│", "|"), Yt = o("└", "—"), zt = o("●", ">"), Jt = o("○", " "), y = e => {
  switch (e) {
   case "initial":
   case "active":
    return Bt.cyan(Gt);

   case "cancel":
    return Bt.red(Wt);

   case "error":
    return Bt.yellow(Ht);

   case "submit":
    return Bt.green(Vt);
  }
}, te = e => new TD({
  validate: e.validate,
  placeholder: e.placeholder,
  defaultValue: e.defaultValue,
  initialValue: e.initialValue,
  render() {
    var t = `${Bt.gray(Kt)}\n${y(this.state)}  ${e.message}\n`, r = e.placeholder ? Bt.inverse(e.placeholder[0]) + Bt.dim(e.placeholder.slice(1)) : Bt.inverse(Bt.hidden("_")), i = this.value ? this.valueWithCursor : r;
    switch (this.state) {
     case "error":
      return `${t.trim()}\n${Bt.yellow(Kt)}  ${i}\n${Bt.yellow(Yt)}  ${Bt.yellow(this.error)}\n`;

     case "submit":
      return `${t}${Bt.gray(Kt)}  ${Bt.dim(this.value || e.placeholder)}`;

     case "cancel":
      return `${t}${Bt.gray(Kt)}  ${Bt.strikethrough(Bt.dim(this.value ?? ""))}${this.value?.trim() ? "\n" + Bt.gray(Kt) : ""}`;

     default:
      return `${t}${Bt.cyan(Kt)}  ${i}\n${Bt.cyan(Yt)}\n`;
    }
  }
}).prompt(), se = e => {
  var t = e.active ?? "Yes", r = e.inactive ?? "No";
  return new xD({
    active: t,
    inactive: r,
    initialValue: e.initialValue ?? !0,
    render() {
      var i = `${Bt.gray(Kt)}\n${y(this.state)}  ${e.message}\n`, n = this.value ? t : r;
      switch (this.state) {
       case "submit":
        return `${i}${Bt.gray(Kt)}  ${Bt.dim(n)}`;

       case "cancel":
        return `${i}${Bt.gray(Kt)}  ${Bt.strikethrough(Bt.dim(n))}\n${Bt.gray(Kt)}`;

       default:
        return `${i}${Bt.cyan(Kt)}  ${this.value ? `${Bt.green(zt)} ${t}` : `${Bt.dim(Jt)} ${Bt.dim(t)}`} ${Bt.dim("/")} ${this.value ? `${Bt.dim(Jt)} ${Bt.dim(r)}` : `${Bt.green(zt)} ${r}`}\n${Bt.cyan(Yt)}\n`;
      }
    }
  }).prompt();
}, ue = (e = "") => {
  process.stdout.write(`${Bt.gray(Yt)}  ${Bt.red(e)}\n\n`);
};

var Xt = {
  exports: {}
};

var Zt;

var Qt;

var er;

var tr;

var rr;

if ("win32" === process.platform || global.TESTING_WINDOWS) {
  rr = function requireWindows() {
    if (Qt) {
      return Zt;
    }
    Qt = 1;
    Zt = isexe;
    isexe.sync = function sync(t, r) {
      return checkStat(e.statSync(t), t, r);
    };
    var e = U;
    function checkStat(e, t, r) {
      if (!e.isSymbolicLink() && !e.isFile()) {
        return !1;
      }
      return function checkPathExt(e, t) {
        var r = void 0 !== t.pathExt ? t.pathExt : process.env.PATHEXT;
        if (!r) {
          return !0;
        }
        if (-1 !== (r = r.split(";")).indexOf("")) {
          return !0;
        }
        for (var i = 0; i < r.length; i++) {
          var n = r[i].toLowerCase();
          if (n && e.substr(-n.length).toLowerCase() === n) {
            return !0;
          }
        }
        return !1;
      }(t, r);
    }
    function isexe(t, r, i) {
      e.stat(t, (function(e, n) {
        i(e, e ? !1 : checkStat(n, t, r));
      }));
    }
    return Zt;
  }();
} else {
  rr = function requireMode() {
    if (tr) {
      return er;
    }
    tr = 1;
    er = isexe;
    isexe.sync = function sync(t, r) {
      return checkStat(e.statSync(t), r);
    };
    var e = U;
    function isexe(t, r, i) {
      e.stat(t, (function(e, t) {
        i(e, e ? !1 : checkStat(t, r));
      }));
    }
    function checkStat(e, t) {
      return e.isFile() && function checkMode(e, t) {
        var r = e.mode;
        var i = e.uid;
        var n = e.gid;
        var a = void 0 !== t.uid ? t.uid : process.getuid && process.getuid();
        var s = void 0 !== t.gid ? t.gid : process.getgid && process.getgid();
        var l = parseInt("100", 8);
        var c = parseInt("010", 8);
        return r & parseInt("001", 8) || r & c && n === s || r & l && i === a || r & (l | c) && 0 === a;
      }(e, t);
    }
    return er;
  }();
}

var ir = isexe$1;

isexe$1.sync = function sync(e, t) {
  try {
    return rr.sync(e, t || {});
  } catch (e) {
    if (t && t.ignoreErrors || "EACCES" === e.code) {
      return !1;
    } else {
      throw e;
    }
  }
};

function isexe$1(e, t, r) {
  if ("function" == typeof t) {
    r = t;
    t = {};
  }
  if (!r) {
    if ("function" != typeof Promise) {
      throw new TypeError("callback not provided");
    }
    return new Promise((function(r, i) {
      isexe$1(e, t || {}, (function(e, t) {
        if (e) {
          i(e);
        } else {
          r(t);
        }
      }));
    }));
  }
  rr(e, t || {}, (function(e, i) {
    if (e) {
      if ("EACCES" === e.code || t && t.ignoreErrors) {
        e = null;
        i = !1;
      }
    }
    r(e, i);
  }));
}

var nr = "win32" === process.platform || "cygwin" === process.env.OSTYPE || "msys" === process.env.OSTYPE;

var ar = G;

var or = nr ? ";" : ":";

var ur = ir;

var getNotFoundError = e => Object.assign(new Error(`not found: ${e}`), {
  code: "ENOENT"
});

var getPathInfo = (e, t) => {
  var r = t.colon || or;
  var i = e.match(/\//) || nr && e.match(/\\/) ? [ "" ] : [ ...nr ? [ process.cwd() ] : [], ...(t.path || process.env.PATH || "").split(r) ];
  var n = nr ? t.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "";
  var a = nr ? n.split(r) : [ "" ];
  if (nr) {
    if (-1 !== e.indexOf(".") && "" !== a[0]) {
      a.unshift("");
    }
  }
  return {
    pathEnv: i,
    pathExt: a,
    pathExtExe: n
  };
};

var which$1 = (e, t, r) => {
  if ("function" == typeof t) {
    r = t;
    t = {};
  }
  if (!t) {
    t = {};
  }
  var {pathEnv: i, pathExt: n, pathExtExe: a} = getPathInfo(e, t);
  var s = [];
  var step = r => new Promise(((n, a) => {
    if (r === i.length) {
      return t.all && s.length ? n(s) : a(getNotFoundError(e));
    }
    var l = i[r];
    var c = /^".*"$/.test(l) ? l.slice(1, -1) : l;
    var D = ar.join(c, e);
    var d = !c && /^\.[\\\/]/.test(e) ? e.slice(0, 2) + D : D;
    n(subStep(d, r, 0));
  }));
  var subStep = (e, r, i) => new Promise(((l, c) => {
    if (i === n.length) {
      return l(step(r + 1));
    }
    var D = n[i];
    ur(e + D, {
      pathExt: a
    }, ((n, a) => {
      if (!n && a) {
        if (t.all) {
          s.push(e + D);
        } else {
          return l(e + D);
        }
      }
      return l(subStep(e, r, i + 1));
    }));
  }));
  return r ? step(0).then((e => r(null, e)), r) : step(0);
};

var sr = which$1;

which$1.sync = (e, t) => {
  t = t || {};
  var {pathEnv: r, pathExt: i, pathExtExe: n} = getPathInfo(e, t);
  var a = [];
  for (var s = 0; s < r.length; s++) {
    var l = r[s];
    var c = /^".*"$/.test(l) ? l.slice(1, -1) : l;
    var D = ar.join(c, e);
    var d = !c && /^\.[\\\/]/.test(e) ? e.slice(0, 2) + D : D;
    for (var f = 0; f < i.length; f++) {
      var p = d + i[f];
      try {
        if (ur.sync(p, {
          pathExt: n
        })) {
          if (t.all) {
            a.push(p);
          } else {
            return p;
          }
        }
      } catch (e) {}
    }
  }
  if (t.all && a.length) {
    return a;
  }
  if (t.nothrow) {
    return null;
  }
  throw getNotFoundError(e);
};

var lr = {
  exports: {}
};

var pathKey$1 = (e = {}) => {
  var t = e.env || process.env;
  if ("win32" !== (e.platform || process.platform)) {
    return "PATH";
  }
  return Object.keys(t).reverse().find((e => "PATH" === e.toUpperCase())) || "Path";
};

lr.exports = pathKey$1;

lr.exports.default = pathKey$1;

var cr = G;

var Dr = sr;

var dr = lr.exports;

function resolveCommandAttempt(e, t) {
  var r = e.options.env || process.env;
  var i = process.cwd();
  var n = null != e.options.cwd;
  var a = n && void 0 !== process.chdir && !process.chdir.disabled;
  if (a) {
    try {
      process.chdir(e.options.cwd);
    } catch (e) {}
  }
  var s;
  try {
    s = Dr.sync(e.command, {
      path: r[dr({
        env: r
      })],
      pathExt: t ? cr.delimiter : void 0
    });
  } catch (e) {} finally {
    if (a) {
      process.chdir(i);
    }
  }
  if (s) {
    s = cr.resolve(n ? e.options.cwd : "", s);
  }
  return s;
}

var fr = function resolveCommand$1(e) {
  return resolveCommandAttempt(e) || resolveCommandAttempt(e, !0);
};

var pr = {};

var hr = /([()\][%!^"`<>&|;, *?])/g;

pr.command = function escapeCommand(e) {
  return e = e.replace(hr, "^$1");
};

pr.argument = function escapeArgument(e, t) {
  e = (e = `"${e = (e = (e = `${e}`).replace(/(\\*)"/g, '$1$1\\"')).replace(/(\\*)$/, "$1$1")}"`).replace(hr, "^$1");
  if (t) {
    e = e.replace(hr, "^$1");
  }
  return e;
};

var gr = /^#!(.*)/;

var vr = U;

var shebangCommand = (e = "") => {
  var t = e.match(gr);
  if (!t) {
    return null;
  }
  var [r, i] = t[0].replace(/#! ?/, "").split(" ");
  var n = r.split("/").pop();
  if ("env" === n) {
    return i;
  }
  return i ? `${n} ${i}` : n;
};

var mr = G;

var Cr = fr;

var yr = pr;

var Fr = function readShebang$1(e) {
  var t = Buffer.alloc(150);
  var r;
  try {
    r = vr.openSync(e, "r");
    vr.readSync(r, t, 0, 150, 0);
    vr.closeSync(r);
  } catch (e) {}
  return shebangCommand(t.toString());
};

var Er = "win32" === process.platform;

var wr = /\.(?:com|exe)$/i;

var Sr = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;

function parseNonShell(e) {
  if (!Er) {
    return e;
  }
  var t = function detectShebang(e) {
    e.file = Cr(e);
    var t = e.file && Fr(e.file);
    if (t) {
      e.args.unshift(e.file);
      e.command = t;
      return Cr(e);
    }
    return e.file;
  }(e);
  var r = !wr.test(t);
  if (e.options.forceShell || r) {
    var i = Sr.test(t);
    e.command = mr.normalize(e.command);
    e.command = yr.command(e.command);
    e.args = e.args.map((e => yr.argument(e, i)));
    var n = [ e.command ].concat(e.args).join(" ");
    e.args = [ "/d", "/s", "/c", `"${n}"` ];
    e.command = process.env.comspec || "cmd.exe";
    e.options.windowsVerbatimArguments = !0;
  }
  return e;
}

var br = "win32" === process.platform;

function notFoundError(e, t) {
  return Object.assign(new Error(`${t} ${e.command} ENOENT`), {
    code: "ENOENT",
    errno: "ENOENT",
    syscall: `${t} ${e.command}`,
    path: e.command,
    spawnargs: e.args
  });
}

function verifyENOENT(e, t) {
  if (br && 1 === e && !t.file) {
    return notFoundError(t.original, "spawn");
  }
  return null;
}

var Br = {
  hookChildProcess: function hookChildProcess(e, t) {
    if (!br) {
      return;
    }
    var r = e.emit;
    e.emit = function(i, n) {
      if ("exit" === i) {
        var a = verifyENOENT(n, t);
        if (a) {
          return r.call(e, "error", a);
        }
      }
      return r.apply(e, arguments);
    };
  },
  verifyENOENT,
  verifyENOENTSync: function verifyENOENTSync(e, t) {
    if (br && 1 === e && !t.file) {
      return notFoundError(t.original, "spawnSync");
    }
    return null;
  },
  notFoundError
};

var xr = H;

var $r = function parse$1(e, t, r) {
  if (t && !Array.isArray(t)) {
    r = t;
    t = null;
  }
  var i = {
    command: e,
    args: t = t ? t.slice(0) : [],
    options: r = Object.assign({}, r),
    file: void 0,
    original: {
      command: e,
      args: t
    }
  };
  return r.shell ? i : parseNonShell(i);
};

var Ar = Br;

function spawn(e, t, r) {
  var i = $r(e, t, r);
  var n = xr.spawn(i.command, i.args, i.options);
  Ar.hookChildProcess(n, i);
  return n;
}

Xt.exports = spawn;

Xt.exports.spawn = spawn;

Xt.exports.sync = function spawnSync(e, t, r) {
  var i = $r(e, t, r);
  var n = xr.spawnSync(i.command, i.args, i.options);
  n.error = n.error || Ar.verifyENOENTSync(n.status, i);
  return n;
};

Xt.exports._parse = $r;

Xt.exports._enoent = Ar;

var Or = getDefaultExportFromCjs(Xt.exports);

function pathKey(e = {}) {
  var {env: t = process.env, platform: r = process.platform} = e;
  if ("win32" !== r) {
    return "PATH";
  }
  return Object.keys(t).reverse().find((e => "PATH" === e.toUpperCase())) || "Path";
}

var applyPreferLocal = (e, r) => {
  var i;
  while (i !== r) {
    e.push(t.join(r, "node_modules/.bin"));
    i = r;
    r = t.resolve(r, "..");
  }
};

var applyExecPath = (e, r, i) => {
  var n = r instanceof URL ? V(r) : r;
  e.push(t.resolve(i, n, ".."));
};

var npmRunPathEnv = ({env: e = b.env, ...r} = {}) => {
  var i = pathKey({
    env: e = {
      ...e
    }
  });
  r.path = e[i];
  e[i] = (({cwd: e = b.cwd(), path: r = b.env[pathKey()], preferLocal: i = !0, execPath: n = b.execPath, addExecPath: a = !0} = {}) => {
    var s = e instanceof URL ? V(e) : e;
    var l = t.resolve(s);
    var c = [];
    if (i) {
      applyPreferLocal(c, l);
    }
    if (a) {
      applyExecPath(c, n, l);
    }
    return [ ...c, r ].join(t.delimiter);
  })(r);
  return e;
};

var copyProperty = (e, t, r, i) => {
  if ("length" === r || "prototype" === r) {
    return;
  }
  if ("arguments" === r || "caller" === r) {
    return;
  }
  var n = Object.getOwnPropertyDescriptor(e, r);
  var a = Object.getOwnPropertyDescriptor(t, r);
  if (!canCopyProperty(n, a) && i) {
    return;
  }
  Object.defineProperty(e, r, a);
};

var canCopyProperty = function(e, t) {
  return void 0 === e || e.configurable || e.writable === t.writable && e.enumerable === t.enumerable && e.configurable === t.configurable && (e.writable || e.value === t.value);
};

var wrappedToString = (e, t) => `/* Wrapped ${e}*/\n${t}`;

var kr = Object.getOwnPropertyDescriptor(Function.prototype, "toString");

var Tr = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name");

function mimicFunction(e, t, {ignoreNonConfigurable: r = !1} = {}) {
  var {name: i} = e;
  for (var n of Reflect.ownKeys(t)) {
    copyProperty(e, t, n, r);
  }
  ((e, t) => {
    var r = Object.getPrototypeOf(t);
    if (r === Object.getPrototypeOf(e)) {
      return;
    }
    Object.setPrototypeOf(e, r);
  })(e, t);
  ((e, t, r) => {
    var i = "" === r ? "" : `with ${r.trim()}() `;
    var n = wrappedToString.bind(null, i, t.toString());
    Object.defineProperty(n, "name", Tr);
    Object.defineProperty(e, "toString", {
      ...kr,
      value: n
    });
  })(e, t, i);
  return e;
}

var Ir = new WeakMap;

var onetime = (e, t = {}) => {
  if ("function" != typeof e) {
    throw new TypeError("Expected a function");
  }
  var r;
  var i = 0;
  var n = e.displayName || e.name || "<anonymous>";
  var onetime = function(...a) {
    Ir.set(onetime, ++i);
    if (1 === i) {
      r = e.apply(this, a);
      e = null;
    } else if (!0 === t.throw) {
      throw new Error(`Function \`${n}\` can only be called once`);
    }
    return r;
  };
  mimicFunction(onetime, e);
  Ir.set(onetime, i);
  return onetime;
};

onetime.callCount = e => {
  if (!Ir.has(e)) {
    throw new Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`);
  }
  return Ir.get(e);
};

var getRealtimeSignal = (e, t) => ({
  name: `SIGRT${t + 1}`,
  number: Nr + t,
  action: "terminate",
  description: "Application-specific signal (realtime)",
  standard: "posix"
});

var Nr = 34;

var Pr = 64;

var Mr = [ {
  name: "SIGHUP",
  number: 1,
  action: "terminate",
  description: "Terminal closed",
  standard: "posix"
}, {
  name: "SIGINT",
  number: 2,
  action: "terminate",
  description: "User interruption with CTRL-C",
  standard: "ansi"
}, {
  name: "SIGQUIT",
  number: 3,
  action: "core",
  description: "User interruption with CTRL-\\",
  standard: "posix"
}, {
  name: "SIGILL",
  number: 4,
  action: "core",
  description: "Invalid machine instruction",
  standard: "ansi"
}, {
  name: "SIGTRAP",
  number: 5,
  action: "core",
  description: "Debugger breakpoint",
  standard: "posix"
}, {
  name: "SIGABRT",
  number: 6,
  action: "core",
  description: "Aborted",
  standard: "ansi"
}, {
  name: "SIGIOT",
  number: 6,
  action: "core",
  description: "Aborted",
  standard: "bsd"
}, {
  name: "SIGBUS",
  number: 7,
  action: "core",
  description: "Bus error due to misaligned, non-existing address or paging error",
  standard: "bsd"
}, {
  name: "SIGEMT",
  number: 7,
  action: "terminate",
  description: "Command should be emulated but is not implemented",
  standard: "other"
}, {
  name: "SIGFPE",
  number: 8,
  action: "core",
  description: "Floating point arithmetic error",
  standard: "ansi"
}, {
  name: "SIGKILL",
  number: 9,
  action: "terminate",
  description: "Forced termination",
  standard: "posix",
  forced: !0
}, {
  name: "SIGUSR1",
  number: 10,
  action: "terminate",
  description: "Application-specific signal",
  standard: "posix"
}, {
  name: "SIGSEGV",
  number: 11,
  action: "core",
  description: "Segmentation fault",
  standard: "ansi"
}, {
  name: "SIGUSR2",
  number: 12,
  action: "terminate",
  description: "Application-specific signal",
  standard: "posix"
}, {
  name: "SIGPIPE",
  number: 13,
  action: "terminate",
  description: "Broken pipe or socket",
  standard: "posix"
}, {
  name: "SIGALRM",
  number: 14,
  action: "terminate",
  description: "Timeout or timer",
  standard: "posix"
}, {
  name: "SIGTERM",
  number: 15,
  action: "terminate",
  description: "Termination",
  standard: "ansi"
}, {
  name: "SIGSTKFLT",
  number: 16,
  action: "terminate",
  description: "Stack is empty or overflowed",
  standard: "other"
}, {
  name: "SIGCHLD",
  number: 17,
  action: "ignore",
  description: "Child process terminated, paused or unpaused",
  standard: "posix"
}, {
  name: "SIGCLD",
  number: 17,
  action: "ignore",
  description: "Child process terminated, paused or unpaused",
  standard: "other"
}, {
  name: "SIGCONT",
  number: 18,
  action: "unpause",
  description: "Unpaused",
  standard: "posix",
  forced: !0
}, {
  name: "SIGSTOP",
  number: 19,
  action: "pause",
  description: "Paused",
  standard: "posix",
  forced: !0
}, {
  name: "SIGTSTP",
  number: 20,
  action: "pause",
  description: 'Paused using CTRL-Z or "suspend"',
  standard: "posix"
}, {
  name: "SIGTTIN",
  number: 21,
  action: "pause",
  description: "Background process cannot read terminal input",
  standard: "posix"
}, {
  name: "SIGBREAK",
  number: 21,
  action: "terminate",
  description: "User interruption with CTRL-BREAK",
  standard: "other"
}, {
  name: "SIGTTOU",
  number: 22,
  action: "pause",
  description: "Background process cannot write to terminal output",
  standard: "posix"
}, {
  name: "SIGURG",
  number: 23,
  action: "ignore",
  description: "Socket received out-of-band data",
  standard: "bsd"
}, {
  name: "SIGXCPU",
  number: 24,
  action: "core",
  description: "Process timed out",
  standard: "bsd"
}, {
  name: "SIGXFSZ",
  number: 25,
  action: "core",
  description: "File too big",
  standard: "bsd"
}, {
  name: "SIGVTALRM",
  number: 26,
  action: "terminate",
  description: "Timeout or timer",
  standard: "bsd"
}, {
  name: "SIGPROF",
  number: 27,
  action: "terminate",
  description: "Timeout or timer",
  standard: "bsd"
}, {
  name: "SIGWINCH",
  number: 28,
  action: "ignore",
  description: "Terminal window size changed",
  standard: "bsd"
}, {
  name: "SIGIO",
  number: 29,
  action: "terminate",
  description: "I/O is available",
  standard: "other"
}, {
  name: "SIGPOLL",
  number: 29,
  action: "terminate",
  description: "Watched event",
  standard: "other"
}, {
  name: "SIGINFO",
  number: 29,
  action: "ignore",
  description: "Request for process information",
  standard: "other"
}, {
  name: "SIGPWR",
  number: 30,
  action: "terminate",
  description: "Device running out of power",
  standard: "systemv"
}, {
  name: "SIGSYS",
  number: 31,
  action: "core",
  description: "Invalid system call",
  standard: "other"
}, {
  name: "SIGUNUSED",
  number: 31,
  action: "terminate",
  description: "Invalid system call",
  standard: "other"
} ];

var getSignals = () => {
  var e = Array.from({
    length: Pr - Nr + 1
  }, getRealtimeSignal);
  return [ ...Mr, ...e ].map(normalizeSignal);
};

var normalizeSignal = ({name: e, number: t, description: r, action: i, forced: n = !1, standard: a}) => {
  var {signals: {[e]: s}} = Y;
  var l = void 0 !== s;
  return {
    name: e,
    number: l ? s : t,
    description: r,
    supported: l,
    action: i,
    forced: n,
    standard: a
  };
};

var getSignalByName = ({name: e, number: t, description: r, supported: i, action: n, forced: a, standard: s}) => [ e, {
  name: e,
  number: t,
  description: r,
  supported: i,
  action: n,
  forced: a,
  standard: s
} ];

var Lr = (() => {
  var e = getSignals();
  return Object.fromEntries(e.map(getSignalByName));
})();

var getSignalByNumber = (e, t) => {
  var r = findSignalByNumber(e, t);
  if (void 0 === r) {
    return {};
  }
  var {name: i, description: n, supported: a, action: s, forced: l, standard: c} = r;
  return {
    [e]: {
      name: i,
      number: e,
      description: n,
      supported: a,
      action: s,
      forced: l,
      standard: c
    }
  };
};

var findSignalByNumber = (e, t) => {
  var r = t.find((({name: t}) => Y.signals[t] === e));
  if (void 0 !== r) {
    return r;
  }
  return t.find((t => t.number === e));
};

(() => {
  var e = getSignals();
  var t = Array.from({
    length: Pr + 1
  }, ((t, r) => getSignalByNumber(r, e)));
  Object.assign({}, ...t);
})();

var makeError = ({stdout: e, stderr: t, all: r, error: i, signal: n, exitCode: a, command: s, escapedCommand: l, timedOut: c, isCanceled: D, killed: d, parsed: {options: {timeout: f, cwd: p = b.cwd()}}}) => {
  var h = void 0 === (n = null === n ? void 0 : n) ? void 0 : Lr[n].description;
  var g = (({timedOut: e, timeout: t, errorCode: r, signal: i, signalDescription: n, exitCode: a, isCanceled: s}) => {
    if (e) {
      return `timed out after ${t} milliseconds`;
    }
    if (s) {
      return "was canceled";
    }
    if (void 0 !== r) {
      return `failed with ${r}`;
    }
    if (void 0 !== i) {
      return `was killed with ${i} (${n})`;
    }
    if (void 0 !== a) {
      return `failed with exit code ${a}`;
    }
    return "failed";
  })({
    timedOut: c,
    timeout: f,
    errorCode: i && i.code,
    signal: n,
    signalDescription: h,
    exitCode: a = null === a ? void 0 : a,
    isCanceled: D
  });
  var m = `Command ${g}: ${s}`;
  var E = "[object Error]" === Object.prototype.toString.call(i);
  var w = E ? `${m}\n${i.message}` : m;
  var S = [ w, t, e ].filter(Boolean).join("\n");
  if (E) {
    i.originalMessage = i.message;
    i.message = S;
  } else {
    i = new Error(S);
  }
  i.shortMessage = w;
  i.command = s;
  i.escapedCommand = l;
  i.exitCode = a;
  i.signal = n;
  i.signalDescription = h;
  i.stdout = e;
  i.stderr = t;
  i.cwd = p;
  if (void 0 !== r) {
    i.all = r;
  }
  if ("bufferedData" in i) {
    delete i.bufferedData;
  }
  i.failed = !0;
  i.timedOut = Boolean(c);
  i.isCanceled = D;
  i.killed = d && !c;
  return i;
};

var jr = [ "stdin", "stdout", "stderr" ];

var normalizeStdio = e => {
  if (!e) {
    return;
  }
  var {stdio: t} = e;
  if (void 0 === t) {
    return jr.map((t => e[t]));
  }
  if ((e => jr.some((t => void 0 !== e[t])))(e)) {
    throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${jr.map((e => `\`${e}\``)).join(", ")}`);
  }
  if ("string" == typeof t) {
    return t;
  }
  if (!Array.isArray(t)) {
    throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof t}\``);
  }
  var r = Math.max(t.length, jr.length);
  return Array.from({
    length: r
  }, ((e, r) => t[r]));
};

var Rr = [];

Rr.push("SIGHUP", "SIGINT", "SIGTERM");

if ("win32" !== process.platform) {
  Rr.push("SIGALRM", "SIGABRT", "SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT");
}

if ("linux" === process.platform) {
  Rr.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT");
}

var processOk = e => !!e && "object" == typeof e && "function" == typeof e.removeListener && "function" == typeof e.emit && "function" == typeof e.reallyExit && "function" == typeof e.listeners && "function" == typeof e.kill && "number" == typeof e.pid && "function" == typeof e.on;

var _r = Symbol.for("signal-exit emitter");

var Ur = globalThis;

var Gr = Object.defineProperty.bind(Object);

class Emitter {
  emitted={
    afterExit: !1,
    exit: !1
  };
  listeners={
    afterExit: [],
    exit: []
  };
  count=0;
  id=Math.random();
  constructor() {
    if (Ur[_r]) {
      return Ur[_r];
    }
    Gr(Ur, _r, {
      value: this,
      writable: !1,
      enumerable: !1,
      configurable: !1
    });
  }
  on(e, t) {
    this.listeners[e].push(t);
  }
  removeListener(e, t) {
    var r = this.listeners[e];
    var i = r.indexOf(t);
    if (-1 === i) {
      return;
    }
    if (0 === i && 1 === r.length) {
      r.length = 0;
    } else {
      r.splice(i, 1);
    }
  }
  emit(e, t, r) {
    if (this.emitted[e]) {
      return !1;
    }
    this.emitted[e] = !0;
    var i = !1;
    for (var n of this.listeners[e]) {
      i = !0 === n(t, r) || i;
    }
    if ("exit" === e) {
      i = this.emit("afterExit", t, r) || i;
    }
    return i;
  }
}

class SignalExitBase {}

var Wr = globalThis.process;

var {onExit: Hr} = (Vr = processOk(Wr) ? new class SignalExit extends SignalExitBase {
  #e="win32" === Wr.platform ? "SIGINT" : "SIGHUP";
  #t=new Emitter;
  #r;
  #i;
  #n;
  #a={};
  #o=!1;
  constructor(e) {
    var t;
    super();
    t = this;
    this.#r = e;
    this.#a = {};
    var _loop = function(r) {
      t.#a[r] = () => {
        var i = t.#r.listeners(r);
        var {count: n} = t.#t;
        if ("object" == typeof e.__signal_exit_emitter__ && "number" == typeof e.__signal_exit_emitter__.count) {
          n += e.__signal_exit_emitter__.count;
        }
        if (i.length === n) {
          t.unload();
          var a = t.#t.emit("exit", null, r);
          var s = "SIGHUP" === r ? t.#e : r;
          if (!a) {
            e.kill(e.pid, s);
          }
        }
      };
    };
    for (var r of Rr) {
      _loop(r);
    }
    this.#n = e.reallyExit;
    this.#i = e.emit;
  }
  onExit(e, t) {
    if (!processOk(this.#r)) {
      return () => {};
    }
    if (!1 === this.#o) {
      this.load();
    }
    var r = t?.alwaysLast ? "afterExit" : "exit";
    this.#t.on(r, e);
    return () => {
      this.#t.removeListener(r, e);
      if (0 === this.#t.listeners.exit.length && 0 === this.#t.listeners.afterExit.length) {
        this.unload();
      }
    };
  }
  load() {
    if (this.#o) {
      return;
    }
    this.#o = !0;
    this.#t.count += 1;
    for (var e of Rr) {
      try {
        var t = this.#a[e];
        if (t) {
          this.#r.on(e, t);
        }
      } catch (e) {}
    }
    this.#r.emit = (e, ...t) => this.#u(e, ...t);
    this.#r.reallyExit = e => this.#s(e);
  }
  unload() {
    if (!this.#o) {
      return;
    }
    this.#o = !1;
    Rr.forEach((e => {
      var t = this.#a[e];
      if (!t) {
        throw new Error("Listener not defined for signal: " + e);
      }
      try {
        this.#r.removeListener(e, t);
      } catch (e) {}
    }));
    this.#r.emit = this.#i;
    this.#r.reallyExit = this.#n;
    this.#t.count -= 1;
  }
  #s(e) {
    if (!processOk(this.#r)) {
      return 0;
    }
    this.#r.exitCode = e || 0;
    this.#t.emit("exit", this.#r.exitCode, null);
    return this.#n.call(this.#r, this.#r.exitCode);
  }
  #u(e, ...t) {
    var r = this.#i;
    if ("exit" === e && processOk(this.#r)) {
      if ("number" == typeof t[0]) {
        this.#r.exitCode = t[0];
      }
      var i = r.call(this.#r, e, ...t);
      this.#t.emit("exit", this.#r.exitCode, null);
      return i;
    } else {
      return r.call(this.#r, e, ...t);
    }
  }
}(Wr) : new class SignalExitFallback extends SignalExitBase {
  onExit() {
    return () => {};
  }
  load() {}
  unload() {}
}, {
  onExit: (e, t) => Vr.onExit(e, t),
  load: () => Vr.load(),
  unload: () => Vr.unload()
});

var Vr;

var spawnedKill = (e, t = "SIGTERM", r = {}) => {
  var i = e(t);
  setKillTimeout(e, t, r, i);
  return i;
};

var setKillTimeout = (e, t, r, i) => {
  if (!shouldForceKill(t, r, i)) {
    return;
  }
  var n = getForceKillAfterTimeout(r);
  var a = setTimeout((() => {
    e("SIGKILL");
  }), n);
  if (a.unref) {
    a.unref();
  }
};

var shouldForceKill = (e, {forceKillAfterTimeout: t}, r) => isSigterm(e) && !1 !== t && r;

var isSigterm = e => e === K.constants.signals.SIGTERM || "string" == typeof e && "SIGTERM" === e.toUpperCase();

var getForceKillAfterTimeout = ({forceKillAfterTimeout: e = !0}) => {
  if (!0 === e) {
    return 5e3;
  }
  if (!Number.isFinite(e) || e < 0) {
    throw new TypeError(`Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`);
  }
  return e;
};

var spawnedCancel = (e, t) => {
  if (e.kill()) {
    t.isCanceled = !0;
  }
};

var setupTimeout = (e, {timeout: t, killSignal: r = "SIGTERM"}, i) => {
  if (0 === t || void 0 === t) {
    return i;
  }
  var n;
  var a = new Promise(((i, a) => {
    n = setTimeout((() => {
      ((e, t, r) => {
        e.kill(t);
        r(Object.assign(new Error("Timed out"), {
          timedOut: !0,
          signal: t
        }));
      })(e, r, a);
    }), t);
  }));
  var s = i.finally((() => {
    clearTimeout(n);
  }));
  return Promise.race([ a, s ]);
};

var validateTimeout = ({timeout: e}) => {
  if (void 0 !== e && (!Number.isFinite(e) || e < 0)) {
    throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`);
  }
};

var setExitHandler = async (e, {cleanup: t, detached: r}, i) => {
  if (!t || r) {
    return i;
  }
  var n = Hr((() => {
    e.kill();
  }));
  return i.finally((() => {
    n();
  }));
};

function isStream(e) {
  return null !== e && "object" == typeof e && "function" == typeof e.pipe;
}

function isWritableStream(e) {
  return isStream(e) && !1 !== e.writable && "function" == typeof e._write && "object" == typeof e._writableState;
}

var pipeToTarget = (e, t, r) => {
  if ("string" == typeof r) {
    e[t].pipe(z(r));
    return e;
  }
  if (isWritableStream(r)) {
    e[t].pipe(r);
    return e;
  }
  if (!(e => e instanceof _ && "function" == typeof e.then)(r)) {
    throw new TypeError("The second argument must be a string, a stream or an Execa child process.");
  }
  if (!isWritableStream(r.stdin)) {
    throw new TypeError("The target child process's stdin must be available.");
  }
  e[t].pipe(r.stdin);
  return r;
};

var addPipeMethods = e => {
  if (null !== e.stdout) {
    e.pipeStdout = pipeToTarget.bind(void 0, e, "stdout");
  }
  if (null !== e.stderr) {
    e.pipeStderr = pipeToTarget.bind(void 0, e, "stderr");
  }
  if (void 0 !== e.all) {
    e.pipeAll = pipeToTarget.bind(void 0, e, "all");
  }
};

var getStreamContents = async (e, {init: t, convertChunk: r, getSize: i, truncateChunk: n, addChunk: a, getFinalChunk: s, finalize: l}, {maxBuffer: c = Number.POSITIVE_INFINITY} = {}) => {
  if (!isAsyncIterable(e)) {
    throw new Error("The first argument must be a Readable, a ReadableStream, or an async iterable.");
  }
  var D = t();
  D.length = 0;
  try {
    for await (var d of e) {
      var f = r[getChunkType(d)](d, D);
      appendChunk({
        convertedChunk: f,
        state: D,
        getSize: i,
        truncateChunk: n,
        addChunk: a,
        maxBuffer: c
      });
    }
    appendFinalChunk({
      state: D,
      convertChunk: r,
      getSize: i,
      truncateChunk: n,
      addChunk: a,
      getFinalChunk: s,
      maxBuffer: c
    });
    return l(D);
  } catch (e) {
    e.bufferedData = l(D);
    throw e;
  }
};

var appendFinalChunk = ({state: e, getSize: t, truncateChunk: r, addChunk: i, getFinalChunk: n, maxBuffer: a}) => {
  var s = n(e);
  if (void 0 !== s) {
    appendChunk({
      convertedChunk: s,
      state: e,
      getSize: t,
      truncateChunk: r,
      addChunk: i,
      maxBuffer: a
    });
  }
};

var appendChunk = ({convertedChunk: e, state: t, getSize: r, truncateChunk: i, addChunk: n, maxBuffer: a}) => {
  var s = r(e);
  var l = t.length + s;
  if (l <= a) {
    addNewChunk(e, t, n, l);
    return;
  }
  var c = i(e, a - t.length);
  if (void 0 !== c) {
    addNewChunk(c, t, n, a);
  }
  throw new MaxBufferError;
};

var addNewChunk = (e, t, r, i) => {
  t.contents = r(e, t, i);
  t.length = i;
};

var isAsyncIterable = e => "object" == typeof e && null !== e && "function" == typeof e[Symbol.asyncIterator];

var getChunkType = e => {
  var t = typeof e;
  if ("string" === t) {
    return "string";
  }
  if ("object" !== t || null === e) {
    return "others";
  }
  if (globalThis.Buffer?.isBuffer(e)) {
    return "buffer";
  }
  var r = qr.call(e);
  if ("[object ArrayBuffer]" === r) {
    return "arrayBuffer";
  }
  if ("[object DataView]" === r) {
    return "dataView";
  }
  if (Number.isInteger(e.byteLength) && Number.isInteger(e.byteOffset) && "[object ArrayBuffer]" === qr.call(e.buffer)) {
    return "typedArray";
  }
  return "others";
};

var {toString: qr} = Object.prototype;

class MaxBufferError extends Error {
  name="MaxBufferError";
  constructor() {
    super("maxBuffer exceeded");
  }
}

var throwObjectStream = e => {
  throw new Error(`Streams in object mode are not supported: ${String(e)}`);
};

var getLengthProp = e => e.length;

var Kr = new TextEncoder;

var useUint8Array = e => new Uint8Array(e);

var useUint8ArrayWithOffset = e => new Uint8Array(e.buffer, e.byteOffset, e.byteLength);

var resizeArrayBufferSlow = (e, t) => {
  if (t <= e.byteLength) {
    return e;
  }
  var r = new ArrayBuffer(getNewContentsLength(t));
  new Uint8Array(r).set(new Uint8Array(e), 0);
  return r;
};

var resizeArrayBuffer = (e, t) => {
  if (t <= e.maxByteLength) {
    e.resize(t);
    return e;
  }
  var r = new ArrayBuffer(t, {
    maxByteLength: getNewContentsLength(t)
  });
  new Uint8Array(r).set(new Uint8Array(e), 0);
  return r;
};

var getNewContentsLength = e => Yr ** Math.ceil(Math.log(e) / Math.log(Yr));

var Yr = 2;

var hasArrayBufferResize = () => "resize" in ArrayBuffer.prototype;

var zr = {
  init: () => ({
    contents: new ArrayBuffer(0)
  }),
  convertChunk: {
    string: e => Kr.encode(e),
    buffer: useUint8Array,
    arrayBuffer: useUint8Array,
    dataView: useUint8ArrayWithOffset,
    typedArray: useUint8ArrayWithOffset,
    others: throwObjectStream
  },
  getSize: getLengthProp,
  truncateChunk: (e, t) => e.slice(0, t),
  addChunk: (e, {contents: t, length: r}, i) => {
    var n = hasArrayBufferResize() ? resizeArrayBuffer(t, i) : resizeArrayBufferSlow(t, i);
    new Uint8Array(n).set(e, r);
    return n;
  },
  getFinalChunk: () => {},
  finalize: ({contents: e, length: t}) => hasArrayBufferResize() ? e : e.slice(0, t)
};

async function getStreamAsBuffer(e, t) {
  if (!("Buffer" in globalThis)) {
    throw new Error("getStreamAsBuffer() is only supported in Node.js");
  }
  try {
    return arrayBufferToNodeBuffer(await async function getStreamAsArrayBuffer(e, t) {
      return getStreamContents(e, zr, t);
    }(e, t));
  } catch (e) {
    if (void 0 !== e.bufferedData) {
      e.bufferedData = arrayBufferToNodeBuffer(e.bufferedData);
    }
    throw e;
  }
}

var arrayBufferToNodeBuffer = e => globalThis.Buffer.from(e);

var useTextDecoder = (e, {textDecoder: t}) => t.decode(e, {
  stream: !0
});

var Jr = {
  init: () => ({
    contents: "",
    textDecoder: new TextDecoder
  }),
  convertChunk: {
    string: e => e,
    buffer: useTextDecoder,
    arrayBuffer: useTextDecoder,
    dataView: useTextDecoder,
    typedArray: useTextDecoder,
    others: throwObjectStream
  },
  getSize: getLengthProp,
  truncateChunk: (e, t) => e.slice(0, t),
  addChunk: (e, {contents: t}) => t + e,
  getFinalChunk: ({textDecoder: e}) => {
    var t = e.decode();
    return "" === t ? void 0 : t;
  },
  finalize: ({contents: e}) => e
};

var {PassThrough: Xr} = Z;

var Zr = getDefaultExportFromCjs((function() {
  var e = [];
  var t = new Xr({
    objectMode: !0
  });
  t.setMaxListeners(0);
  t.add = add;
  t.isEmpty = function isEmpty() {
    return 0 == e.length;
  };
  t.on("unpipe", remove);
  Array.prototype.slice.call(arguments).forEach(add);
  return t;
  function add(r) {
    if (Array.isArray(r)) {
      r.forEach(add);
      return this;
    }
    e.push(r);
    r.once("end", remove.bind(null, r));
    r.once("error", t.emit.bind(t, "error"));
    r.pipe(t, {
      end: !1
    });
    return this;
  }
  function remove(r) {
    if (!(e = e.filter((function(e) {
      return e !== r;
    }))).length && t.readable) {
      t.end();
    }
  }
}));

var getInput = ({input: e, inputFile: t}) => {
  if ("string" != typeof t) {
    return e;
  }
  (e => {
    if (void 0 !== e) {
      throw new TypeError("The `input` and `inputFile` options cannot be both set.");
    }
  })(e);
  return J(t);
};

var handleInput = (e, t) => {
  var r = getInput(t);
  if (void 0 === r) {
    return;
  }
  if (isStream(r)) {
    r.pipe(e.stdin);
  } else {
    e.stdin.end(r);
  }
};

var makeAllStream = (e, {all: t}) => {
  if (!t || !e.stdout && !e.stderr) {
    return;
  }
  var r = Zr();
  if (e.stdout) {
    r.add(e.stdout);
  }
  if (e.stderr) {
    r.add(e.stderr);
  }
  return r;
};

var getBufferedData = async (e, t) => {
  if (!e || void 0 === t) {
    return;
  }
  await X(0);
  e.destroy();
  try {
    return await t;
  } catch (e) {
    return e.bufferedData;
  }
};

var getStreamPromise = (e, {encoding: t, buffer: r, maxBuffer: i}) => {
  if (!e || !r) {
    return;
  }
  if ("utf8" === t || "utf-8" === t) {
    return async function getStreamAsString(e, t) {
      return getStreamContents(e, Jr, t);
    }(e, {
      maxBuffer: i
    });
  }
  if (null === t || "buffer" === t) {
    return getStreamAsBuffer(e, {
      maxBuffer: i
    });
  }
  return applyEncoding(e, i, t);
};

var applyEncoding = async (e, t, r) => (await getStreamAsBuffer(e, {
  maxBuffer: t
})).toString(r);

var getSpawnedResult = async ({stdout: e, stderr: t, all: r}, {encoding: i, buffer: n, maxBuffer: a}, s) => {
  var l = getStreamPromise(e, {
    encoding: i,
    buffer: n,
    maxBuffer: a
  });
  var c = getStreamPromise(t, {
    encoding: i,
    buffer: n,
    maxBuffer: a
  });
  var D = getStreamPromise(r, {
    encoding: i,
    buffer: n,
    maxBuffer: 2 * a
  });
  try {
    return await Promise.all([ s, l, c, D ]);
  } catch (i) {
    return Promise.all([ {
      error: i,
      signal: i.signal,
      timedOut: i.timedOut
    }, getBufferedData(e, l), getBufferedData(t, c), getBufferedData(r, D) ]);
  }
};

var Qr = (async () => {})().constructor.prototype;

var ei = [ "then", "catch", "finally" ].map((e => [ e, Reflect.getOwnPropertyDescriptor(Qr, e) ]));

var mergePromise = (e, t) => {
  var _loop = function(i) {
    var n = "function" == typeof t ? (...e) => Reflect.apply(i.value, t(), e) : i.value.bind(t);
    Reflect.defineProperty(e, r, {
      ...i,
      value: n
    });
  };
  for (var [r, i] of ei) {
    _loop(i);
  }
};

var getSpawnedPromise = e => new Promise(((t, r) => {
  e.on("exit", ((e, r) => {
    t({
      exitCode: e,
      signal: r
    });
  }));
  e.on("error", (e => {
    r(e);
  }));
  if (e.stdin) {
    e.stdin.on("error", (e => {
      r(e);
    }));
  }
}));

var normalizeArgs = (e, t = []) => {
  if (!Array.isArray(t)) {
    return [ e ];
  }
  return [ e, ...t ];
};

var ti = /^[\w.-]+$/;

var joinCommand = (e, t) => normalizeArgs(e, t).join(" ");

var getEscapedCommand = (e, t) => normalizeArgs(e, t).map((e => (e => {
  if ("string" != typeof e || ti.test(e)) {
    return e;
  }
  return `"${e.replaceAll('"', '\\"')}"`;
})(e))).join(" ");

var ri = Q("execa").enabled;

var padField = (e, t) => String(e).padStart(t, "0");

var logCommand = (e, {verbose: t}) => {
  if (!t) {
    return;
  }
  b.stderr.write(`[${r = new Date, `${padField(r.getHours(), 2)}:${padField(r.getMinutes(), 2)}:${padField(r.getSeconds(), 2)}.${padField(r.getMilliseconds(), 3)}`}] ${e}\n`);
  var r;
};

var handleArguments = (e, r, i = {}) => {
  var n = Or._parse(e, r, i);
  e = n.command;
  r = n.args;
  (i = {
    maxBuffer: 1e8,
    buffer: !0,
    stripFinalNewline: !0,
    extendEnv: !0,
    preferLocal: !1,
    localDir: (i = n.options).cwd || b.cwd(),
    execPath: b.execPath,
    encoding: "utf8",
    reject: !0,
    cleanup: !0,
    all: !1,
    windowsHide: !0,
    verbose: ri,
    ...i
  }).env = (({env: e, extendEnv: t, preferLocal: r, localDir: i, execPath: n}) => {
    var a = t ? {
      ...b.env,
      ...e
    } : e;
    if (r) {
      return npmRunPathEnv({
        env: a,
        cwd: i,
        execPath: n
      });
    }
    return a;
  })(i);
  i.stdio = normalizeStdio(i);
  if ("win32" === b.platform && "cmd" === t.basename(e, ".exe")) {
    r.unshift("/q");
  }
  return {
    file: e,
    args: r,
    options: i,
    parsed: n
  };
};

var handleOutput = (e, t, r) => {
  if ("string" != typeof t && !I.isBuffer(t)) {
    return void 0 === r ? void 0 : "";
  }
  if (e.stripFinalNewline) {
    return function stripFinalNewline(e) {
      var t = "string" == typeof e ? "\n" : "\n".charCodeAt();
      var r = "string" == typeof e ? "\r" : "\r".charCodeAt();
      if (e[e.length - 1] === t) {
        e = e.slice(0, -1);
      }
      if (e[e.length - 1] === r) {
        e = e.slice(0, -1);
      }
      return e;
    }(t);
  }
  return t;
};

function execa(e, t, r) {
  var i = handleArguments(e, t, r);
  var n = joinCommand(e, t);
  var a = getEscapedCommand(e, t);
  logCommand(a, i.options);
  validateTimeout(i.options);
  var s;
  try {
    s = M.spawn(i.file, i.args, i.options);
  } catch (e) {
    var l = new M.ChildProcess;
    var c = Promise.reject(makeError({
      error: e,
      stdout: "",
      stderr: "",
      all: "",
      command: n,
      escapedCommand: a,
      parsed: i,
      timedOut: !1,
      isCanceled: !1,
      killed: !1
    }));
    mergePromise(l, c);
    return l;
  }
  var D = getSpawnedPromise(s);
  var d = setupTimeout(s, i.options, D);
  var f = setExitHandler(s, i.options, d);
  s.kill = spawnedKill.bind(null, s.kill.bind(s));
  s.cancel = spawnedCancel.bind(null, s, {
    isCanceled: !1
  });
  var p = onetime((async () => {
    var [{error: e, exitCode: t, signal: r, timedOut: l}, c, D, d] = await getSpawnedResult(s, i.options, f);
    var p = handleOutput(i.options, c);
    var h = handleOutput(i.options, D);
    var g = handleOutput(i.options, d);
    if (e || 0 !== t || null !== r) {
      var m = makeError({
        error: e,
        exitCode: t,
        signal: r,
        stdout: p,
        stderr: h,
        all: g,
        command: n,
        escapedCommand: a,
        parsed: i,
        timedOut: l,
        isCanceled: i.options.signal ? i.options.signal.aborted : !1,
        killed: s.killed
      });
      if (!i.options.reject) {
        return m;
      }
      throw m;
    }
    return {
      command: n,
      escapedCommand: a,
      exitCode: 0,
      stdout: p,
      stderr: h,
      all: g,
      failed: !1,
      timedOut: !1,
      isCanceled: !1,
      killed: !1
    };
  }));
  handleInput(s, i.options);
  s.all = makeAllStream(s, i.options);
  addPipeMethods(s);
  mergePromise(s, p);
  return s;
}

var ii = (() => {
  var e = Ut ? [ "◒", "◐", "◓", "◑" ] : [ "•", "o", "O", "0" ], t = Ut ? 80 : 120;
  var r, i, n = !1, a = "";
  var u = (e = "", t = 0) => {
    a = e ?? a, n = !1, clearInterval(i);
    var s = 0 === t ? Bt.green(Vt) : 1 === t ? Bt.red(Wt) : Bt.red(Ht);
    process.stdout.write(wt.cursor.move(-999, 0)), process.stdout.write(wt.erase.down(1)), 
    process.stdout.write(`${s}  ${a}\n`), r();
  }, $ = e => {
    n && u(e > 1 ? "Something went wrong" : "Canceled", e);
  };
  return process.on("uncaughtExceptionMonitor", (() => $(2))), process.on("unhandledRejection", (() => $(2))), 
  process.on("SIGINT", (() => $(1))), process.on("SIGTERM", (() => $(1))), process.on("exit", $), 
  {
    start: (s = "") => {
      n = !0, r = function WD({input: e = B, output: t = O, overwrite: r = !0, hideCursor: i = !0} = {}) {
        var n = p.createInterface({
          input: e,
          output: t,
          prompt: "",
          tabSize: 1
        });
        p.emitKeypressEvents(e, n), e.isTTY && e.setRawMode(!0);
        var C = (i, {name: n}) => {
          if ("" === String(i) && process.exit(0), !r) {
            return;
          }
          p.moveCursor(t, "return" === n ? 0 : -1, "return" === n ? -1 : 0, (() => {
            p.clearLine(t, 1, (() => {
              e.once("keypress", C);
            }));
          }));
        };
        return i && process.stdout.write(wt.cursor.hide), e.once("keypress", C), () => {
          e.off("keypress", C), i && process.stdout.write(wt.cursor.show), e.isTTY && !_t && e.setRawMode(!1), 
          n.terminal = !1, n.close();
        };
      }(), a = s.replace(/\.+$/, ""), process.stdout.write(`${Bt.gray(Kt)}\n`);
      var l = 0, c = 0;
      i = setInterval((() => {
        var t = Bt.magenta(e[l]), r = ".".repeat(Math.floor(c)).slice(0, 3);
        process.stdout.write(wt.cursor.move(-999, 0)), process.stdout.write(wt.erase.down(1)), 
        process.stdout.write(`${t}  ${a}${r}`), l = l + 1 < e.length ? l + 1 : 0, c = c < e.length ? c + .125 : 0;
      }), t);
    },
    stop: u,
    message: (e = "") => {
      a = e ?? a;
    }
  };
})();

async function run(e) {
  ((e = "") => {
    process.stdout.write(`${Bt.gray(qt)}  ${e}\n`);
  })("GQL.Tada");
  var r = await question("Where can we get your schema? Point us at an introspection JSON-file, a GraphQL schema file or an endpoint", (async r => {
    try {
      var i = new URL(r);
      ii.start("Validating the URL.");
      try {
        var n = await fetch(i.toString());
        if (!n.ok) {
          ii.stop("Validated the URL.");
          return !!await se({
            message: `Got ${n.status} from ${i.toString()}, continue anyway? You can add headers later.`
          });
        }
      } catch (e) {
        ii.stop("Validated the URL.");
        return !!await se({
          message: `Got ${e.message} from ${i.toString()}, continue anyway? You can add headers later.`
        });
      }
      ii.stop("Validated the URL.");
      return !0;
    } catch (e) {}
    if (!(r.endsWith(".json") || r.endsWith(".graphql"))) {
      return !1;
    }
    var a = t.resolve(e, r);
    var s = !!await f.readFile(a);
    if (!s) {
      console.log(`\nCould not find "${a}"`);
    }
    return s;
  }));
  var i = await question("What directory do you want us to write the tadaOutputFile to?", (async r => {
    var i = t.resolve(e, r);
    var n = !!await f.stat(i);
    if (!n) {
      console.log(`\nCould not find "${i}"`);
    }
    return n;
  }));
  if (hD(i)) {
    ue("Operation cancelled.");
    process.exit(0);
  }
  i = t.resolve(i, "graphql-env.d.ts");
  var n = await se({
    message: "Do you want us to install the dependencies?"
  });
  if (hD(n)) {
    ue("Operation cancelled.");
    process.exit(0);
  }
  var a = !1;
  var s;
  try {
    var l = t.resolve(e, "package.json");
    var c = await f.readFile(l, "utf-8");
    s = JSON.parse(c);
    var d = Object.entries({
      ...s.dependencies,
      ...s.devDependencies
    }).find((e => "typescript" === e[0]));
    if (d && "string" == typeof d[1]) {
      a = semverComply(d[1], Je);
    }
  } catch (e) {}
  if (n) {
    ii.start("Installing packages.");
    await async function installPackages(e, t, r) {
      if (r) {
        await execa(e, [ "yarn" === e ? "add" : "install", "-D", "@0no-co/graphqlsp" ], {
          stdio: "ignore",
          cwd: t
        });
      }
      await execa(e, [ "yarn" === e ? "add" : "install", "gql.tada" ], {
        stdio: "ignore",
        cwd: t
      });
    }(function getPkgManager() {
      var e = process.env.npm_config_user_agent || "";
      if (e.startsWith("yarn")) {
        return "yarn";
      }
      if (e.startsWith("pnpm")) {
        return "pnpm";
      }
      return "npm";
    }(), e, !a);
    ii.stop("Installed packages.");
  } else {
    ii.start("Writing to package.json.");
    try {
      var p = t.resolve(e, "package.json");
      var h = await f.readFile(p, "utf-8");
      if (!(s = JSON.parse(h)).dependencies) {
        s.dependencies = {};
      }
      if (!s.dependencies["gql.tada"]) {
        s.dependencies["gql.tada"] = "^1.4.3";
      }
      if (!a) {
        if (!s.devDependencies) {
          s.devDependencies = {};
        }
        if (!s.devDependencies["@0no-co/graphqlsp"]) {
          s.devDependencies["@0no-co/graphqlsp"] = "^1.8.0";
        }
      }
      await f.writeFile(p, JSON.stringify(s, null, 2));
      ii.stop("Written to package.json.");
    } catch (e) {
      ii.stop('Failed to write to package.json, you can try adding "gql.tada" and "@0no-co/graphqlsp" yourself.');
    }
  }
  ii.start("Writing to tsconfig.json.");
  try {
    var g = t.resolve(e, "tsconfig.json");
    var m = await D(g);
    var E = r.endsWith(".json") || r.endsWith(".graphql");
    m.compilerOptions = {
      ...m.compilerOptions,
      plugins: [ {
        name: a ? "gql.tada/ts-plugin" : "@0no-co/graphqlsp",
        schema: E ? t.relative(e, r) : r,
        tadaOutputLocation: t.relative(e, i)
      } ]
    };
    await f.writeFile(g, JSON.stringify(m, null, 2));
  } catch (e) {}
  ii.stop("Written to tsconfig.json.");
  ((e = "") => {
    process.stdout.write(`${Bt.gray(Kt)}\n${Bt.gray(Yt)}  ${e}\n\n`);
  })("Off to the races!");
}

var question = async (e, t, r) => {
  var i = "";
  var n = !1;
  while (!n) {
    if (hD(i = await te({
      message: e
    }))) {
      n = !0;
      ue("Operation cancelled.");
      process.exit(0);
    } else if (await t(i)) {
      n = !0;
    }
  }
  return i;
};

class InitCommand extends Command {
  static paths=[ [ "init" ] ];
  input=String$1({
    name: "dir"
  });
  async execute() {
    var t = e.resolve(process.cwd(), this.input);
    await run(t);
  }
}

var ni = Object.assign((async function _main() {
  var e = new Cli({
    binaryVersion: process.env.npm_package_version || "0.0.0",
    binaryLabel: "gql.tada CLI",
    binaryName: "gql.tada"
  });
  e.register(CheckCommand);
  e.register(DoctorCommand);
  e.register(GenerateOutputCommand);
  e.register(GeneratePersisted);
  e.register(GenerateSchema);
  e.register(InitCommand);
  e.register(TurboCommand);
  await e.runExit(process.argv.slice(2));
}), qe);

export { generatePersisted as a, generateSchema as b, generateTurbo as c, generateOutput as g, ni as m, programFactory as p };
//# sourceMappingURL=index-chunk.mjs.map
