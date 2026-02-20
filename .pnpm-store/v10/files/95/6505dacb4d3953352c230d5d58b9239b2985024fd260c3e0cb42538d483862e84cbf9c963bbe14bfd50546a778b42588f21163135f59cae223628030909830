import { Kind as r, parse as n } from "@0no-co/graphql.web";

var a = 0;

var e = new Set;

function initGraphQLTada() {
  function graphql(t, i) {
    var o = n(t).definitions;
    var s = new Set;
    for (var f of i || []) {
      for (var u of f.definitions) {
        if (u.kind === r.FRAGMENT_DEFINITION && !s.has(u)) {
          o.push(u);
          s.add(u);
        }
      }
    }
    var d;
    if ((d = o[0].kind === r.FRAGMENT_DEFINITION) && o[0].directives) {
      o[0].directives = o[0].directives.filter((r => "_unmask" !== r.name.value));
    }
    var c;
    return {
      kind: r.DOCUMENT,
      definitions: o,
      get loc() {
        if (!c && d) {
          var r = t + function concatLocSources(r) {
            try {
              a++;
              var n = "";
              for (var t of r) {
                if (!e.has(t)) {
                  e.add(t);
                  var {loc: i} = t;
                  if (i) {
                    n += i.source.body;
                  }
                }
              }
              return n;
            } finally {
              if (0 == --a) {
                e.clear();
              }
            }
          }(i || []);
          return {
            start: 0,
            end: r.length,
            source: {
              body: r,
              name: "GraphQLTada",
              locationOffset: {
                line: 1,
                column: 1
              }
            }
          };
        }
        return c;
      },
      set loc(r) {
        c = r;
      }
    };
  }
  graphql.scalar = function scalar(r, n) {
    return n;
  };
  graphql.persisted = function persisted(n, a) {
    return {
      kind: r.DOCUMENT,
      definitions: a ? a.definitions : [],
      documentId: n
    };
  };
  return graphql;
}

function parse(r) {
  return n(r);
}

function readFragment(...r) {
  return 2 === r.length ? r[1] : r[0];
}

function maskFragments(r, n) {
  return n;
}

function unsafe_readResult(r, n) {
  return n;
}

var t = initGraphQLTada();

export { t as graphql, initGraphQLTada, maskFragments, parse, readFragment, unsafe_readResult };
//# sourceMappingURL=gql-tada.mjs.map
