Object.defineProperty(exports, "__esModule", {
  value: !0
});

var r = require("@0no-co/graphql.web");

var e = 0;

var n = new Set;

function initGraphQLTada() {
  function graphql(a, t) {
    var i = r.parse(a).definitions;
    var o = new Set;
    for (var s of t || []) {
      for (var d of s.definitions) {
        if (d.kind === r.Kind.FRAGMENT_DEFINITION && !o.has(d)) {
          i.push(d);
          o.add(d);
        }
      }
    }
    var u;
    if ((u = i[0].kind === r.Kind.FRAGMENT_DEFINITION) && i[0].directives) {
      i[0].directives = i[0].directives.filter((r => "_unmask" !== r.name.value));
    }
    var f;
    return {
      kind: r.Kind.DOCUMENT,
      definitions: i,
      get loc() {
        if (!f && u) {
          var r = a + function concatLocSources(r) {
            try {
              e++;
              var a = "";
              for (var t of r) {
                if (!n.has(t)) {
                  n.add(t);
                  var {loc: i} = t;
                  if (i) {
                    a += i.source.body;
                  }
                }
              }
              return a;
            } finally {
              if (0 == --e) {
                n.clear();
              }
            }
          }(t || []);
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
        return f;
      },
      set loc(r) {
        f = r;
      }
    };
  }
  graphql.scalar = function scalar(r, e) {
    return e;
  };
  graphql.persisted = function persisted(e, n) {
    return {
      kind: r.Kind.DOCUMENT,
      definitions: n ? n.definitions : [],
      documentId: e
    };
  };
  return graphql;
}

var a = initGraphQLTada();

exports.graphql = a;

exports.initGraphQLTada = initGraphQLTada;

exports.maskFragments = function maskFragments(r, e) {
  return e;
};

exports.parse = function parse(e) {
  return r.parse(e);
};

exports.readFragment = function readFragment(...r) {
  return 2 === r.length ? r[1] : r[0];
};

exports.unsafe_readResult = function unsafe_readResult(r, e) {
  return e;
};
//# sourceMappingURL=gql-tada.js.map
