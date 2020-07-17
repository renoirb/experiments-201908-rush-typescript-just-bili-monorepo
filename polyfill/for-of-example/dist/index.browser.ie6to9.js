/*!
 * @renoirb/polyfill-for-of-example v1.0.0-dev.1
 *
 * Maintainer: Renoir Boulanger <contribs@renoirboulanger.com>
 *
 * UNLICENSED
 *
 * © 2003-2020 Renoir Boulanger
 */
/*!
 * @renoirb/polyfill-for-of-example v1.0.0-dev.1
 *
 * Maintainer: Renoir Boulanger <contribs@renoirboulanger.com>
 *
 * UNLICENSED
 *
 * © 2003-2020 Renoir Boulanger
 */
var ForOfExample = (function (t) {
  'use strict'
  var r = function (t) {
      try {
        return !!t()
      } catch (t) {
        return !0
      }
    },
    n = {}.toString,
    e = function (t) {
      return n.call(t).slice(8, -1)
    },
    o = ''.split,
    i = r(function () {
      return !Object('z').propertyIsEnumerable(0)
    })
      ? function (t) {
          return 'String' == e(t) ? o.call(t, '') : Object(t)
        }
      : Object,
    u = function (t) {
      if (null == t) throw TypeError("Can't call method on " + t)
      return t
    },
    c = function (t) {
      return i(u(t))
    },
    a = {},
    f =
      'undefined' != typeof globalThis
        ? globalThis
        : 'undefined' != typeof window
        ? window
        : 'undefined' != typeof global
        ? global
        : 'undefined' != typeof self
        ? self
        : {}
  function l(t, r) {
    return t((r = { exports: {} }), r.exports), r.exports
  }
  var s = function (t) {
      return t && t.Math == Math && t
    },
    p =
      s('object' == typeof globalThis && globalThis) ||
      s('object' == typeof window && window) ||
      s('object' == typeof self && self) ||
      s('object' == typeof f && f) ||
      Function('return this')(),
    y = !r(function () {
      return (
        7 !=
        Object.defineProperty({}, 1, {
          get: function () {
            return 7
          },
        })[1]
      )
    }),
    v = function (t) {
      return 'object' == typeof t ? null !== t : 'function' == typeof t
    },
    h = p.document,
    d = v(h) && v(h.createElement),
    g = function (t) {
      return d ? h.createElement(t) : {}
    },
    m =
      !y &&
      !r(function () {
        return (
          7 !=
          Object.defineProperty(g('div'), 'a', {
            get: function () {
              return 7
            },
          }).a
        )
      }),
    b = function (t) {
      if (!v(t)) throw TypeError(String(t) + ' is not an object')
      return t
    },
    S = function (t, r) {
      if (!v(t)) return t
      var n, e
      if (r && 'function' == typeof (n = t.toString) && !v((e = n.call(t))))
        return e
      if ('function' == typeof (n = t.valueOf) && !v((e = n.call(t)))) return e
      if (!r && 'function' == typeof (n = t.toString) && !v((e = n.call(t))))
        return e
      throw TypeError("Can't convert object to primitive value")
    },
    w = Object.defineProperty,
    O = {
      f: y
        ? w
        : function (t, r, n) {
            if ((b(t), (r = S(r, !0)), b(n), m))
              try {
                return w(t, r, n)
              } catch (t) {}
            if ('get' in n || 'set' in n)
              throw TypeError('Accessors not supported')
            return 'value' in n && (t[r] = n.value), t
          },
    },
    A = function (t, r) {
      return {
        enumerable: !(1 & t),
        configurable: !(2 & t),
        writable: !(4 & t),
        value: r,
      }
    },
    j = y
      ? function (t, r, n) {
          return O.f(t, r, A(1, n))
        }
      : function (t, r, n) {
          return (t[r] = n), t
        },
    P =
      p['__core-js_shared__'] ||
      (function (t, r) {
        try {
          j(p, t, r)
        } catch (n) {
          p[t] = r
        }
        return r
      })('__core-js_shared__', {}),
    T = Function.toString
  'function' != typeof P.inspectSource &&
    (P.inspectSource = function (t) {
      return T.call(t)
    })
  var E,
    L,
    x,
    I = P.inspectSource,
    k = p.WeakMap,
    M = 'function' == typeof k && /native code/.test(I(k)),
    C = {}.hasOwnProperty,
    _ = function (t, r) {
      return C.call(t, r)
    },
    N = l(function (t) {
      ;(t.exports = function (t, r) {
        return P[t] || (P[t] = void 0 !== r ? r : {})
      })('versions', []).push({
        version: '3.6.4',
        mode: 'pure',
        copyright: '© 2020 Denis Pushkarev (zloirock.ru)',
      })
    }),
    F = 0,
    R = Math.random(),
    D = function (t) {
      return (
        'Symbol(' +
        String(void 0 === t ? '' : t) +
        ')_' +
        (++F + R).toString(36)
      )
    },
    G = N('keys'),
    V = function (t) {
      return G[t] || (G[t] = D(t))
    },
    J = {},
    z = p.WeakMap
  if (M) {
    var B = new z(),
      H = B.get,
      W = B.has,
      U = B.set
    ;(E = function (t, r) {
      return U.call(B, t, r), r
    }),
      (L = function (t) {
        return H.call(B, t) || {}
      }),
      (x = function (t) {
        return W.call(B, t)
      })
  } else {
    var Y = V('state')
    ;(J[Y] = !0),
      (E = function (t, r) {
        return j(t, Y, r), r
      }),
      (L = function (t) {
        return _(t, Y) ? t[Y] : {}
      }),
      (x = function (t) {
        return _(t, Y)
      })
  }
  var q,
    Q,
    X,
    $ = {
      set: E,
      get: L,
      has: x,
      enforce: function (t) {
        return x(t) ? L(t) : E(t, {})
      },
      getterFor: function (t) {
        return function (r) {
          var n
          if (!v(r) || (n = L(r)).type !== t)
            throw TypeError('Incompatible receiver, ' + t + ' required')
          return n
        }
      },
    },
    K = {}.propertyIsEnumerable,
    Z = Object.getOwnPropertyDescriptor,
    tt = {
      f:
        Z && !K.call({ 1: 2 }, 1)
          ? function (t) {
              var r = Z(this, t)
              return !!r && r.enumerable
            }
          : K,
    },
    rt = Object.getOwnPropertyDescriptor,
    nt = {
      f: y
        ? rt
        : function (t, r) {
            if (((t = c(t)), (r = S(r, !0)), m))
              try {
                return rt(t, r)
              } catch (t) {}
            if (_(t, r)) return A(!tt.f.call(t, r), t[r])
          },
    },
    et = /#|\.prototype\./,
    ot = function (t, n) {
      var e = ut[it(t)]
      return e == at || (e != ct && ('function' == typeof n ? r(n) : !!n))
    },
    it = (ot.normalize = function (t) {
      return String(t).replace(et, '.').toLowerCase()
    }),
    ut = (ot.data = {}),
    ct = (ot.NATIVE = 'N'),
    at = (ot.POLYFILL = 'P'),
    ft = ot,
    lt = {},
    st = function (t, r, n) {
      if (
        ((function (t) {
          if ('function' != typeof t)
            throw TypeError(String(t) + ' is not a function')
        })(t),
        void 0 === r)
      )
        return t
      switch (n) {
        case 0:
          return function () {
            return t.call(r)
          }
        case 1:
          return function (n) {
            return t.call(r, n)
          }
        case 2:
          return function (n, e) {
            return t.call(r, n, e)
          }
        case 3:
          return function (n, e, o) {
            return t.call(r, n, e, o)
          }
      }
      return function () {
        return t.apply(r, arguments)
      }
    },
    pt = nt.f,
    yt = function (t) {
      var r = function (r, n, e) {
        if (this instanceof t) {
          switch (arguments.length) {
            case 0:
              return new t()
            case 1:
              return new t(r)
            case 2:
              return new t(r, n)
          }
          return new t(r, n, e)
        }
        return t.apply(this, arguments)
      }
      return (r.prototype = t.prototype), r
    },
    vt = function (t, r) {
      var n,
        e,
        o,
        i,
        u,
        c,
        a,
        f,
        l = t.target,
        s = t.global,
        y = t.stat,
        v = t.proto,
        h = s ? p : y ? p[l] : (p[l] || {}).prototype,
        d = s ? lt : lt[l] || (lt[l] = {}),
        g = d.prototype
      for (o in r)
        (n = !ft(s ? o : l + (y ? '.' : '#') + o, t.forced) && h && _(h, o)),
          (u = d[o]),
          n && (c = t.noTargetGet ? (f = pt(h, o)) && f.value : h[o]),
          (i = n && c ? c : r[o]),
          (n && typeof u == typeof i) ||
            ((a =
              t.bind && n
                ? st(i, p)
                : t.wrap && n
                ? yt(i)
                : v && 'function' == typeof i
                ? st(Function.call, i)
                : i),
            (t.sham || (i && i.sham) || (u && u.sham)) && j(a, 'sham', !0),
            (d[o] = a),
            v &&
              (_(lt, (e = l + 'Prototype')) || j(lt, e, {}),
              (lt[e][o] = i),
              t.real && g && !g[o] && j(g, o, i)))
    },
    ht = function (t) {
      return Object(u(t))
    },
    dt = !r(function () {
      function t() {}
      return (
        (t.prototype.constructor = null),
        Object.getPrototypeOf(new t()) !== t.prototype
      )
    }),
    gt = V('IE_PROTO'),
    mt = Object.prototype,
    bt = dt
      ? Object.getPrototypeOf
      : function (t) {
          return (
            (t = ht(t)),
            _(t, gt)
              ? t[gt]
              : 'function' == typeof t.constructor && t instanceof t.constructor
              ? t.constructor.prototype
              : t instanceof Object
              ? mt
              : null
          )
        },
    St =
      !!Object.getOwnPropertySymbols &&
      !r(function () {
        return !String(Symbol())
      }),
    wt = St && !Symbol.sham && 'symbol' == typeof Symbol.iterator,
    Ot = N('wks'),
    At = p.Symbol,
    jt = wt ? At : (At && At.withoutSetter) || D,
    Pt = function (t) {
      return (
        _(Ot, t) ||
          (St && _(At, t) ? (Ot[t] = At[t]) : (Ot[t] = jt('Symbol.' + t))),
        Ot[t]
      )
    },
    Tt = (Pt('iterator'), !1)
  ;[].keys &&
    ('next' in (X = [].keys())
      ? (Q = bt(bt(X))) !== Object.prototype && (q = Q)
      : (Tt = !0)),
    null == q && (q = {})
  var Et,
    Lt = { IteratorPrototype: q, BUGGY_SAFARI_ITERATORS: Tt },
    xt = Math.ceil,
    It = Math.floor,
    kt = function (t) {
      return isNaN((t = +t)) ? 0 : (t > 0 ? It : xt)(t)
    },
    Mt = Math.min,
    Ct = function (t) {
      return t > 0 ? Mt(kt(t), 9007199254740991) : 0
    },
    _t = Math.max,
    Nt = Math.min,
    Ft = function (t, r) {
      var n = kt(t)
      return n < 0 ? _t(n + r, 0) : Nt(n, r)
    },
    Rt = function (t) {
      return function (r, n, e) {
        var o,
          i = c(r),
          u = Ct(i.length),
          a = Ft(e, u)
        if (t && n != n) {
          for (; u > a; ) if ((o = i[a++]) != o) return !0
        } else
          for (; u > a; a++) if ((t || a in i) && i[a] === n) return t || a || 0
        return !t && -1
      }
    },
    Dt = { includes: Rt(!0), indexOf: Rt(!1) }.indexOf,
    Gt = function (t, r) {
      var n,
        e = c(t),
        o = 0,
        i = []
      for (n in e) !_(J, n) && _(e, n) && i.push(n)
      for (; r.length > o; ) _(e, (n = r[o++])) && (~Dt(i, n) || i.push(n))
      return i
    },
    Vt = [
      'constructor',
      'hasOwnProperty',
      'isPrototypeOf',
      'propertyIsEnumerable',
      'toLocaleString',
      'toString',
      'valueOf',
    ],
    Jt =
      Object.keys ||
      function (t) {
        return Gt(t, Vt)
      },
    zt = y
      ? Object.defineProperties
      : function (t, r) {
          b(t)
          for (var n, e = Jt(r), o = e.length, i = 0; o > i; )
            O.f(t, (n = e[i++]), r[n])
          return t
        },
    Bt = function (t) {
      return 'function' == typeof t ? t : void 0
    },
    Ht = function (t, r) {
      return arguments.length < 2
        ? Bt(lt[t]) || Bt(p[t])
        : (lt[t] && lt[t][r]) || (p[t] && p[t][r])
    },
    Wt = Ht('document', 'documentElement'),
    Ut = V('IE_PROTO'),
    Yt = function () {},
    qt = function (t) {
      return '<script>' + t + '</script>'
    },
    Qt = function () {
      try {
        Et = document.domain && new ActiveXObject('htmlfile')
      } catch (t) {}
      var t, r
      Qt = Et
        ? (function (t) {
            t.write(qt('')), t.close()
            var r = t.parentWindow.Object
            return (t = null), r
          })(Et)
        : (((r = g('iframe')).style.display = 'none'),
          Wt.appendChild(r),
          (r.src = String('javascript:')),
          (t = r.contentWindow.document).open(),
          t.write(qt('document.F=Object')),
          t.close(),
          t.F)
      for (var n = Vt.length; n--; ) delete Qt.prototype[Vt[n]]
      return Qt()
    }
  J[Ut] = !0
  var Xt =
      Object.create ||
      function (t, r) {
        var n
        return (
          null !== t
            ? ((Yt.prototype = b(t)),
              (n = new Yt()),
              (Yt.prototype = null),
              (n[Ut] = t))
            : (n = Qt()),
          void 0 === r ? n : zt(n, r)
        )
      },
    $t = {}
  $t[Pt('toStringTag')] = 'z'
  var Kt = '[object z]' === String($t),
    Zt = Pt('toStringTag'),
    tr =
      'Arguments' ==
      e(
        (function () {
          return arguments
        })(),
      ),
    rr = Kt
      ? e
      : function (t) {
          var r, n, o
          return void 0 === t
            ? 'Undefined'
            : null === t
            ? 'Null'
            : 'string' ==
              typeof (n = (function (t, r) {
                try {
                  return t[r]
                } catch (t) {}
              })((r = Object(t)), Zt))
            ? n
            : tr
            ? e(r)
            : 'Object' == (o = e(r)) && 'function' == typeof r.callee
            ? 'Arguments'
            : o
        },
    nr = Kt
      ? {}.toString
      : function () {
          return '[object ' + rr(this) + ']'
        },
    er = O.f,
    or = Pt('toStringTag'),
    ir = function (t, r, n, e) {
      if (t) {
        var o = n ? t : t.prototype
        _(o, or) || er(o, or, { configurable: !0, value: r }),
          e && !Kt && j(o, 'toString', nr)
      }
    },
    ur = Lt.IteratorPrototype,
    cr = function () {
      return this
    },
    ar =
      (Object.setPrototypeOf ||
        ('__proto__' in {} &&
          (function () {
            var t,
              r = !1,
              n = {}
            try {
              ;(t = Object.getOwnPropertyDescriptor(
                Object.prototype,
                '__proto__',
              ).set).call(n, []),
                (r = n instanceof Array)
            } catch (t) {}
          })()),
      function (t, r, n, e) {
        e && e.enumerable ? (t[r] = n) : j(t, r, n)
      }),
    fr = Lt.IteratorPrototype,
    lr = Lt.BUGGY_SAFARI_ITERATORS,
    sr = Pt('iterator'),
    pr = function () {
      return this
    },
    yr = function (t, r, n, e, o, i, u) {
      !(function (t, r, n) {
        var e = r + ' Iterator'
        ;(t.prototype = Xt(ur, { next: A(1, n) })),
          ir(t, e, !1, !0),
          (a[e] = cr)
      })(n, r, e)
      var c,
        f,
        l,
        s = function (t) {
          if (t === o && d) return d
          if (!lr && t in v) return v[t]
          switch (t) {
            case 'keys':
            case 'values':
            case 'entries':
              return function () {
                return new n(this, t)
              }
          }
          return function () {
            return new n(this)
          }
        },
        p = r + ' Iterator',
        y = !1,
        v = t.prototype,
        h = v[sr] || v['@@iterator'] || (o && v[o]),
        d = (!lr && h) || s(o),
        g = ('Array' == r && v.entries) || h
      if (
        (g &&
          ((c = bt(g.call(new t()))),
          fr !== Object.prototype && c.next && (ir(c, p, !0, !0), (a[p] = pr))),
        'values' == o &&
          h &&
          'values' !== h.name &&
          ((y = !0),
          (d = function () {
            return h.call(this)
          })),
        u && v[sr] !== d && j(v, sr, d),
        (a[r] = d),
        o)
      )
        if (
          ((f = {
            values: s('values'),
            keys: i ? d : s('keys'),
            entries: s('entries'),
          }),
          u)
        )
          for (l in f) (lr || y || !(l in v)) && ar(v, l, f[l])
        else vt({ target: r, proto: !0, forced: lr || y }, f)
      return f
    },
    vr = $.set,
    hr = $.getterFor('Array Iterator')
  yr(
    Array,
    'Array',
    function (t, r) {
      vr(this, { type: 'Array Iterator', target: c(t), index: 0, kind: r })
    },
    function () {
      var t = hr(this),
        r = t.target,
        n = t.kind,
        e = t.index++
      return !r || e >= r.length
        ? ((t.target = void 0), { value: void 0, done: !0 })
        : 'keys' == n
        ? { value: e, done: !1 }
        : 'values' == n
        ? { value: r[e], done: !1 }
        : { value: [e, r[e]], done: !1 }
    },
    'values',
  )
  a.Arguments = a.Array
  var dr = Pt('toStringTag')
  for (var gr in {
    CSSRuleList: 0,
    CSSStyleDeclaration: 0,
    CSSValueList: 0,
    ClientRectList: 0,
    DOMRectList: 0,
    DOMStringList: 0,
    DOMTokenList: 1,
    DataTransferItemList: 0,
    FileList: 0,
    HTMLAllCollection: 0,
    HTMLCollection: 0,
    HTMLFormElement: 0,
    HTMLSelectElement: 0,
    MediaList: 0,
    MimeTypeArray: 0,
    NamedNodeMap: 0,
    NodeList: 1,
    PaintRequestList: 0,
    Plugin: 0,
    PluginArray: 0,
    SVGLengthList: 0,
    SVGNumberList: 0,
    SVGPathSegList: 0,
    SVGPointList: 0,
    SVGStringList: 0,
    SVGTransformList: 0,
    SourceBufferList: 0,
    StyleSheetList: 0,
    TextTrackCueList: 0,
    TextTrackList: 0,
    TouchList: 0,
  }) {
    var mr = p[gr],
      br = mr && mr.prototype
    br && rr(br) !== dr && j(br, dr, gr), (a[gr] = a.Array)
  }
  var Sr = function (t) {
      return function (r, n) {
        var e,
          o,
          i = String(u(r)),
          c = kt(n),
          a = i.length
        return c < 0 || c >= a
          ? t
            ? ''
            : void 0
          : (e = i.charCodeAt(c)) < 55296 ||
            e > 56319 ||
            c + 1 === a ||
            (o = i.charCodeAt(c + 1)) < 56320 ||
            o > 57343
          ? t
            ? i.charAt(c)
            : e
          : t
          ? i.slice(c, c + 2)
          : o - 56320 + ((e - 55296) << 10) + 65536
      }
    },
    wr = { codeAt: Sr(!1), charAt: Sr(!0) }.charAt,
    Or = $.set,
    Ar = $.getterFor('String Iterator')
  yr(
    String,
    'String',
    function (t) {
      Or(this, { type: 'String Iterator', string: String(t), index: 0 })
    },
    function () {
      var t,
        r = Ar(this),
        n = r.string,
        e = r.index
      return e >= n.length
        ? { value: void 0, done: !0 }
        : ((t = wr(n, e)), (r.index += t.length), { value: t, done: !1 })
    },
  )
  var jr = Pt('iterator'),
    Pr = function (t) {
      if (null != t) return t[jr] || t['@@iterator'] || a[rr(t)]
    },
    Tr = function (t) {
      var r = Pr(t)
      if ('function' != typeof r)
        throw TypeError(String(t) + ' is not iterable')
      return b(r.call(t))
    },
    Er =
      Array.isArray ||
      function (t) {
        return 'Array' == e(t)
      }
  vt({ target: 'Array', stat: !0 }, { isArray: Er })
  var Lr,
    xr,
    Ir = lt.Array.isArray,
    kr = Pr,
    Mr = function (t, r, n) {
      var e = S(r)
      e in t ? O.f(t, e, A(0, n)) : (t[e] = n)
    },
    Cr = Pt('species'),
    _r = function (t, r) {
      var n
      return (
        Er(t) &&
          ('function' != typeof (n = t.constructor) ||
          (n !== Array && !Er(n.prototype))
            ? v(n) && null === (n = n[Cr]) && (n = void 0)
            : (n = void 0)),
        new (void 0 === n ? Array : n)(0 === r ? 0 : r)
      )
    },
    Nr = Ht('navigator', 'userAgent') || '',
    Fr = p.process,
    Rr = Fr && Fr.versions,
    Dr = Rr && Rr.v8
  Dr
    ? (xr = (Lr = Dr.split('.'))[0] + Lr[1])
    : Nr &&
      (!(Lr = Nr.match(/Edge\/(\d+)/)) || Lr[1] >= 74) &&
      (Lr = Nr.match(/Chrome\/(\d+)/)) &&
      (xr = Lr[1])
  var Gr = xr && +xr,
    Vr = Pt('species'),
    Jr = function (t) {
      return (
        Gr >= 51 ||
        !r(function () {
          var r = []
          return (
            ((r.constructor = {})[Vr] = function () {
              return { foo: 1 }
            }),
            1 !== r[t](Boolean).foo
          )
        })
      )
    },
    zr = Pt('isConcatSpreadable'),
    Br =
      Gr >= 51 ||
      !r(function () {
        var t = []
        return (t[zr] = !1), t.concat()[0] !== t
      }),
    Hr = Jr('concat'),
    Wr = function (t) {
      if (!v(t)) return !1
      var r = t[zr]
      return void 0 !== r ? !!r : Er(t)
    }
  vt(
    { target: 'Array', proto: !0, forced: !Br || !Hr },
    {
      concat: function (t) {
        var r,
          n,
          e,
          o,
          i,
          u = ht(this),
          c = _r(u, 0),
          a = 0
        for (r = -1, e = arguments.length; r < e; r++)
          if (Wr((i = -1 === r ? u : arguments[r]))) {
            if (a + (o = Ct(i.length)) > 9007199254740991)
              throw TypeError('Maximum allowed index exceeded')
            for (n = 0; n < o; n++, a++) n in i && Mr(c, a, i[n])
          } else {
            if (a >= 9007199254740991)
              throw TypeError('Maximum allowed index exceeded')
            Mr(c, a++, i)
          }
        return (c.length = a), c
      },
    },
  )
  var Ur = Vt.concat('length', 'prototype'),
    Yr = {
      f:
        Object.getOwnPropertyNames ||
        function (t) {
          return Gt(t, Ur)
        },
    },
    qr = Yr.f,
    Qr = {}.toString,
    Xr =
      'object' == typeof window && window && Object.getOwnPropertyNames
        ? Object.getOwnPropertyNames(window)
        : [],
    $r = {
      f: function (t) {
        return Xr && '[object Window]' == Qr.call(t)
          ? (function (t) {
              try {
                return qr(t)
              } catch (t) {
                return Xr.slice()
              }
            })(t)
          : qr(c(t))
      },
    },
    Kr = { f: Object.getOwnPropertySymbols },
    Zr = { f: Pt },
    tn = O.f,
    rn = function (t) {
      var r = lt.Symbol || (lt.Symbol = {})
      _(r, t) || tn(r, t, { value: Zr.f(t) })
    },
    nn = [].push,
    en = function (t) {
      var r = 1 == t,
        n = 2 == t,
        e = 3 == t,
        o = 4 == t,
        u = 6 == t,
        c = 5 == t || u
      return function (a, f, l, s) {
        for (
          var p,
            y,
            v = ht(a),
            h = i(v),
            d = st(f, l, 3),
            g = Ct(h.length),
            m = 0,
            b = s || _r,
            S = r ? b(a, g) : n ? b(a, 0) : void 0;
          g > m;
          m++
        )
          if ((c || m in h) && ((y = d((p = h[m]), m, v)), t))
            if (r) S[m] = y
            else if (y)
              switch (t) {
                case 3:
                  return !0
                case 5:
                  return p
                case 6:
                  return m
                case 2:
                  nn.call(S, p)
              }
            else if (o) return !1
        return u ? -1 : e || o ? o : S
      }
    },
    on = {
      forEach: en(0),
      map: en(1),
      filter: en(2),
      some: en(3),
      every: en(4),
      find: en(5),
      findIndex: en(6),
    }.forEach,
    un = V('hidden'),
    cn = Pt('toPrimitive'),
    an = $.set,
    fn = $.getterFor('Symbol'),
    ln = Object.prototype,
    sn = p.Symbol,
    pn = Ht('JSON', 'stringify'),
    yn = nt.f,
    vn = O.f,
    hn = $r.f,
    dn = tt.f,
    gn = N('symbols'),
    mn = N('op-symbols'),
    bn = N('string-to-symbol-registry'),
    Sn = N('symbol-to-string-registry'),
    wn = N('wks'),
    On = p.QObject,
    An = !On || !On.prototype || !On.prototype.findChild,
    jn =
      y &&
      r(function () {
        return (
          7 !=
          Xt(
            vn({}, 'a', {
              get: function () {
                return vn(this, 'a', { value: 7 }).a
              },
            }),
          ).a
        )
      })
        ? function (t, r, n) {
            var e = yn(ln, r)
            e && delete ln[r], vn(t, r, n), e && t !== ln && vn(ln, r, e)
          }
        : vn,
    Pn = function (t, r) {
      var n = (gn[t] = Xt(sn.prototype))
      return (
        an(n, { type: 'Symbol', tag: t, description: r }),
        y || (n.description = r),
        n
      )
    },
    Tn = wt
      ? function (t) {
          return 'symbol' == typeof t
        }
      : function (t) {
          return Object(t) instanceof sn
        },
    En = function (t, r, n) {
      t === ln && En(mn, r, n), b(t)
      var e = S(r, !0)
      return (
        b(n),
        _(gn, e)
          ? (n.enumerable
              ? (_(t, un) && t[un][e] && (t[un][e] = !1),
                (n = Xt(n, { enumerable: A(0, !1) })))
              : (_(t, un) || vn(t, un, A(1, {})), (t[un][e] = !0)),
            jn(t, e, n))
          : vn(t, e, n)
      )
    },
    Ln = function (t, r) {
      b(t)
      var n = c(r),
        e = Jt(n).concat(Mn(n))
      return (
        on(e, function (r) {
          ;(y && !xn.call(n, r)) || En(t, r, n[r])
        }),
        t
      )
    },
    xn = function (t) {
      var r = S(t, !0),
        n = dn.call(this, r)
      return (
        !(this === ln && _(gn, r) && !_(mn, r)) &&
        (!(n || !_(this, r) || !_(gn, r) || (_(this, un) && this[un][r])) || n)
      )
    },
    In = function (t, r) {
      var n = c(t),
        e = S(r, !0)
      if (n !== ln || !_(gn, e) || _(mn, e)) {
        var o = yn(n, e)
        return (
          !o || !_(gn, e) || (_(n, un) && n[un][e]) || (o.enumerable = !0), o
        )
      }
    },
    kn = function (t) {
      var r = hn(c(t)),
        n = []
      return (
        on(r, function (t) {
          _(gn, t) || _(J, t) || n.push(t)
        }),
        n
      )
    },
    Mn = function (t) {
      var r = t === ln,
        n = hn(r ? mn : c(t)),
        e = []
      return (
        on(n, function (t) {
          !_(gn, t) || (r && !_(ln, t)) || e.push(gn[t])
        }),
        e
      )
    }
  if (
    (St ||
      (ar(
        (sn = function () {
          if (this instanceof sn) throw TypeError('Symbol is not a constructor')
          var t =
              arguments.length && void 0 !== arguments[0]
                ? String(arguments[0])
                : void 0,
            r = D(t),
            n = function (t) {
              this === ln && n.call(mn, t),
                _(this, un) && _(this[un], r) && (this[un][r] = !1),
                jn(this, r, A(1, t))
            }
          return y && An && jn(ln, r, { configurable: !0, set: n }), Pn(r, t)
        }).prototype,
        'toString',
        function () {
          return fn(this).tag
        },
      ),
      ar(sn, 'withoutSetter', function (t) {
        return Pn(D(t), t)
      }),
      (tt.f = xn),
      (O.f = En),
      (nt.f = In),
      (Yr.f = $r.f = kn),
      (Kr.f = Mn),
      (Zr.f = function (t) {
        return Pn(Pt(t), t)
      }),
      y &&
        vn(sn.prototype, 'description', {
          configurable: !0,
          get: function () {
            return fn(this).description
          },
        })),
    vt({ global: !0, wrap: !0, forced: !St, sham: !St }, { Symbol: sn }),
    on(Jt(wn), function (t) {
      rn(t)
    }),
    vt(
      { target: 'Symbol', stat: !0, forced: !St },
      {
        for: function (t) {
          var r = String(t)
          if (_(bn, r)) return bn[r]
          var n = sn(r)
          return (bn[r] = n), (Sn[n] = r), n
        },
        keyFor: function (t) {
          if (!Tn(t)) throw TypeError(t + ' is not a symbol')
          if (_(Sn, t)) return Sn[t]
        },
        useSetter: function () {
          An = !0
        },
        useSimple: function () {
          An = !1
        },
      },
    ),
    vt(
      { target: 'Object', stat: !0, forced: !St, sham: !y },
      {
        create: function (t, r) {
          return void 0 === r ? Xt(t) : Ln(Xt(t), r)
        },
        defineProperty: En,
        defineProperties: Ln,
        getOwnPropertyDescriptor: In,
      },
    ),
    vt(
      { target: 'Object', stat: !0, forced: !St },
      { getOwnPropertyNames: kn, getOwnPropertySymbols: Mn },
    ),
    vt(
      {
        target: 'Object',
        stat: !0,
        forced: r(function () {
          Kr.f(1)
        }),
      },
      {
        getOwnPropertySymbols: function (t) {
          return Kr.f(ht(t))
        },
      },
    ),
    pn)
  ) {
    var Cn =
      !St ||
      r(function () {
        var t = sn()
        return (
          '[null]' != pn([t]) || '{}' != pn({ a: t }) || '{}' != pn(Object(t))
        )
      })
    vt(
      { target: 'JSON', stat: !0, forced: Cn },
      {
        stringify: function (t, r, n) {
          for (var e, o = [t], i = 1; arguments.length > i; )
            o.push(arguments[i++])
          if (((e = r), (v(r) || void 0 !== t) && !Tn(t)))
            return (
              Er(r) ||
                (r = function (t, r) {
                  if (
                    ('function' == typeof e && (r = e.call(this, t, r)), !Tn(r))
                  )
                    return r
                }),
              (o[1] = r),
              pn.apply(null, o)
            )
        },
      },
    )
  }
  sn.prototype[cn] || j(sn.prototype, cn, sn.prototype.valueOf),
    ir(sn, 'Symbol'),
    (J[un] = !0),
    rn('asyncIterator'),
    rn('hasInstance'),
    rn('isConcatSpreadable'),
    rn('iterator'),
    rn('match'),
    rn('matchAll'),
    rn('replace'),
    rn('search'),
    rn('species'),
    rn('split'),
    rn('toPrimitive'),
    rn('toStringTag'),
    rn('unscopables'),
    ir(Math, 'Math', !0),
    ir(p.JSON, 'JSON', !0)
  var _n = lt.Symbol,
    Nn = function (t, r, n, e) {
      try {
        return e ? r(b(n)[0], n[1]) : r(n)
      } catch (r) {
        var o = t.return
        throw (void 0 !== o && b(o.call(t)), r)
      }
    },
    Fn = Pt('iterator'),
    Rn = Array.prototype,
    Dn = function (t) {
      return void 0 !== t && (a.Array === t || Rn[Fn] === t)
    },
    Gn = Pt('iterator'),
    Vn = !1
  try {
    var Jn = 0,
      zn = {
        next: function () {
          return { done: !!Jn++ }
        },
        return: function () {
          Vn = !0
        },
      }
    ;(zn[Gn] = function () {
      return this
    }),
      Array.from(zn, function () {
        throw 2
      })
  } catch (t) {}
  var Bn = !(function (t, r) {
    if (!r && !Vn) return !1
    var n = !1
    try {
      var e = {}
      ;(e[Gn] = function () {
        return {
          next: function () {
            return { done: (n = !0) }
          },
        }
      }),
        t(e)
    } catch (t) {}
    return n
  })(function (t) {
    Array.from(t)
  })
  vt(
    { target: 'Array', stat: !0, forced: Bn },
    {
      from: function (t) {
        var r,
          n,
          e,
          o,
          i,
          u,
          c = ht(t),
          a = 'function' == typeof this ? this : Array,
          f = arguments.length,
          l = f > 1 ? arguments[1] : void 0,
          s = void 0 !== l,
          p = Pr(c),
          y = 0
        if (
          (s && (l = st(l, f > 2 ? arguments[2] : void 0, 2)),
          null == p || (a == Array && Dn(p)))
        )
          for (n = new a((r = Ct(c.length))); r > y; y++)
            (u = s ? l(c[y], y) : c[y]), Mr(n, y, u)
        else
          for (
            i = (o = p.call(c)).next, n = new a();
            !(e = i.call(o)).done;
            y++
          )
            (u = s ? Nn(o, l, [e.value, y], !0) : e.value), Mr(n, y, u)
        return (n.length = y), n
      },
    },
  )
  var Hn = lt.Array.from,
    Wn = Object.defineProperty,
    Un = {},
    Yn = function (t) {
      throw t
    },
    qn = Jr('slice'),
    Qn = (function (t, n) {
      if (_(Un, t)) return Un[t]
      n || (n = {})
      var e = [][t],
        o = !!_(n, 'ACCESSORS') && n.ACCESSORS,
        i = _(n, 0) ? n[0] : Yn,
        u = _(n, 1) ? n[1] : void 0
      return (Un[t] =
        !!e &&
        !r(function () {
          if (o && !y) return !0
          var t = { length: -1 }
          o ? Wn(t, 1, { enumerable: !0, get: Yn }) : (t[1] = 1),
            e.call(t, i, u)
        }))
    })('slice', { ACCESSORS: !0, 0: 0, 1: 2 }),
    Xn = Pt('species'),
    $n = [].slice,
    Kn = Math.max
  vt(
    { target: 'Array', proto: !0, forced: !qn || !Qn },
    {
      slice: function (t, r) {
        var n,
          e,
          o,
          i = c(this),
          u = Ct(i.length),
          a = Ft(t, u),
          f = Ft(void 0 === r ? u : r, u)
        if (
          Er(i) &&
          ('function' != typeof (n = i.constructor) ||
          (n !== Array && !Er(n.prototype))
            ? v(n) && null === (n = n[Xn]) && (n = void 0)
            : (n = void 0),
          n === Array || void 0 === n)
        )
          return $n.call(i, a, f)
        for (
          e = new (void 0 === n ? Array : n)(Kn(f - a, 0)), o = 0;
          a < f;
          a++, o++
        )
          a in i && Mr(e, o, i[a])
        return (e.length = o), e
      },
    },
  )
  var Zn = function (t) {
      return lt[t + 'Prototype']
    },
    te = Zn('Array').slice,
    re = Array.prototype,
    ne = function (t) {
      var r = t.slice
      return t === re || (t instanceof Array && r === re.slice) ? te : r
    },
    ee = Zn('Array').concat,
    oe = Array.prototype,
    ie = function (t) {
      var r = t.concat
      return t === oe || (t instanceof Array && r === oe.concat) ? ee : r
    }
  function ue(t, r) {
    if (!(t instanceof r))
      throw new TypeError('Cannot call a class as a function')
  }
  vt(
    { target: 'Object', stat: !0, forced: !y, sham: !y },
    { defineProperty: O.f },
  )
  var ce = l(function (t) {
    var r = lt.Object,
      n = (t.exports = function (t, n, e) {
        return r.defineProperty(t, n, e)
      })
    r.defineProperty.sham && (n.sham = !0)
  })
  function ae(t, r) {
    for (var n = 0; n < r.length; n++) {
      var e = r[n]
      ;(e.enumerable = e.enumerable || !1),
        (e.configurable = !0),
        'value' in e && (e.writable = !0),
        ce(t, e.key, e)
    }
  }
  var fe = {
      fr: 'Bonsoir, mon nom est',
      pt: 'Oi gente, meu nome é',
      en: 'Hello, my name is',
    },
    le = (function () {
      function t() {
        var r =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : 'John Doe',
          n =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : 'en'
        ue(this, t), (this.name = r), (this.lang = n), n && (this.lang = n)
      }
      var r, n, e
      return (
        (r = t),
        (n = [
          {
            key: 'talk',
            value: function (t) {
              var r,
                n = this.name
              return ie((r = ''.concat(n, ': '))).call(r, t)
            },
          },
          {
            key: 'introduction',
            value: function () {
              var t,
                r = this.name,
                n = this.lang,
                e = void 0 === n ? 'en' : n,
                o = e in fe ? fe[e] : fe.en
              return this.talk(ie((t = ''.concat(o, ' '))).call(t, r))
            },
          },
          {
            key: 'toString',
            value: function () {
              return this.introduction()
            },
          },
        ]) && ae(r.prototype, n),
        e && ae(r, e),
        t
      )
    })()
  function se(t, r) {
    var n
    if (void 0 === _n || null == kr(t)) {
      if (
        Ir(t) ||
        (n = (function (t, r) {
          var n
          if (!t) return
          if ('string' == typeof t) return pe(t, r)
          var e = ne((n = Object.prototype.toString.call(t))).call(n, 8, -1)
          'Object' === e && t.constructor && (e = t.constructor.name)
          if ('Map' === e || 'Set' === e) return Hn(t)
          if (
            'Arguments' === e ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)
          )
            return pe(t, r)
        })(t)) ||
        (r && t && 'number' == typeof t.length)
      ) {
        n && (t = n)
        var e = 0,
          o = function () {}
        return {
          s: o,
          n: function () {
            return e >= t.length ? { done: !0 } : { done: !1, value: t[e++] }
          },
          e: function (t) {
            throw t
          },
          f: o,
        }
      }
      throw new TypeError(
        'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
      )
    }
    var i,
      u = !0,
      c = !1
    return {
      s: function () {
        n = Tr(t)
      },
      n: function () {
        var t = n.next()
        return (u = t.done), t
      },
      e: function (t) {
        ;(c = !0), (i = t)
      },
      f: function () {
        try {
          u || null == n.return || n.return()
        } finally {
          if (c) throw i
        }
      },
    }
  }
  function pe(t, r) {
    ;(null == r || r > t.length) && (r = t.length)
    for (var n = 0, e = new Array(r); n < r; n++) e[n] = t[n]
    return e
  }
  return (
    (t.Person = le),
    (t.default = function () {
      var t,
        r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
        n = [],
        e = se(r)
      try {
        for (e.s(); !(t = e.n()).done; ) {
          var o = t.value,
            i = o || {},
            u = i.name,
            c = void 0 === u ? 'John Doe' : u,
            a = i.lang,
            f = new le(c, a)
          n.push(f)
        }
      } catch (t) {
        e.e(t)
      } finally {
        e.f()
      }
      return n
    }),
    t
  )
})({})
//# sourceMappingURL=index.browser.ie6to9.js.map
