function E() {}
function j(e) {
    return e()
}
function S() {
    return Object.create(null)
}
function $(e) {
    e.forEach(j)
}
function C(e) {
    return typeof e == "function"
}
function fe(e, t) {
    return e != e ? t == t : e !== t || e && typeof e == "object" || typeof e == "function"
}
function q(e) {
    return Object.keys(e).length === 0
}
let x = !1;
function D() {
    x = !0
}
function G() {
    x = !1
}
function R(e, t, n, i) {
    for (; e < t; ) {
        const l = e + (t - e >> 1);
        n(l) <= i ? e = l + 1 : t = l
    }
    return e
}
function z(e) {
    if (e.hydrate_init)
        return;
    e.hydrate_init = !0;
    let t = e.childNodes;
    if (e.nodeName === "HEAD") {
        const r = [];
        for (let s = 0; s < t.length; s++) {
            const a = t[s];
            a.claim_order !== void 0 && r.push(a)
        }
        t = r
    }
    const n = new Int32Array(t.length + 1)
      , i = new Int32Array(t.length);
    n[0] = -1;
    let l = 0;
    for (let r = 0; r < t.length; r++) {
        const s = t[r].claim_order
          , a = (l > 0 && t[n[l]].claim_order <= s ? l + 1 : R(1, l, g=>t[n[g]].claim_order, s)) - 1;
        i[r] = n[a] + 1;
        const u = a + 1;
        n[u] = r,
        l = Math.max(u, l)
    }
    const o = []
      , c = [];
    let f = t.length - 1;
    for (let r = n[l] + 1; r != 0; r = i[r - 1]) {
        for (o.push(t[r - 1]); f >= r; f--)
            c.push(t[f]);
        f--
    }
    for (; f >= 0; f--)
        c.push(t[f]);
    o.reverse(),
    c.sort((r,s)=>r.claim_order - s.claim_order);
    for (let r = 0, s = 0; r < c.length; r++) {
        for (; s < o.length && c[r].claim_order >= o[s].claim_order; )
            s++;
        const a = s < o.length ? o[s] : null;
        e.insertBefore(c[r], a)
    }
}
function F(e, t) {
    if (x) {
        for (z(e),
        (e.actual_end_child === void 0 || e.actual_end_child !== null && e.actual_end_child.parentNode !== e) && (e.actual_end_child = e.firstChild); e.actual_end_child !== null && e.actual_end_child.claim_order === void 0; )
            e.actual_end_child = e.actual_end_child.nextSibling;
        t !== e.actual_end_child ? (t.claim_order !== void 0 || t.parentNode !== e) && e.insertBefore(t, e.actual_end_child) : e.actual_end_child = t.nextSibling
    } else
        (t.parentNode !== e || t.nextSibling !== null) && e.appendChild(t)
}
function U(e, t, n) {
    e.insertBefore(t, n || null)
}
function V(e, t, n) {
    x && !n ? F(e, t) : (t.parentNode !== e || t.nextSibling != n) && e.insertBefore(t, n || null)
}
function y(e) {
    e.parentNode && e.parentNode.removeChild(e)
}
function ue(e, t) {
    for (let n = 0; n < e.length; n += 1)
        e[n] && e[n].d(t)
}
function B(e) {
    return document.createElement(e)
}
function W(e) {
    return document.createElementNS("http://www.w3.org/2000/svg", e)
}
function T(e) {
    return document.createTextNode(e)
}
function ae() {
    return T(" ")
}
function de() {
    return T("")
}
function he(e, t, n, i) {
    return e.addEventListener(t, n, i),
    ()=>e.removeEventListener(t, n, i)
}
function _e(e, t, n) {
    n == null ? e.removeAttribute(t) : e.getAttribute(t) !== n && e.setAttribute(t, n)
}
function me(e) {
    return e.dataset.svelteH
}
function J(e) {
    return Array.from(e.childNodes)
}
function O(e) {
    e.claim_info === void 0 && (e.claim_info = {
        last_index: 0,
        total_claimed: 0
    })
}
function P(e, t, n, i, l=!1) {
    O(e);
    const o = (()=>{
        for (let c = e.claim_info.last_index; c < e.length; c++) {
            const f = e[c];
            if (t(f)) {
                const r = n(f);
                return r === void 0 ? e.splice(c, 1) : e[c] = r,
                l || (e.claim_info.last_index = c),
                f
            }
        }
        for (let c = e.claim_info.last_index - 1; c >= 0; c--) {
            const f = e[c];
            if (t(f)) {
                const r = n(f);
                return r === void 0 ? e.splice(c, 1) : e[c] = r,
                l ? r === void 0 && e.claim_info.last_index-- : e.claim_info.last_index = c,
                f
            }
        }
        return i()
    }
    )();
    return o.claim_order = e.claim_info.total_claimed,
    e.claim_info.total_claimed += 1,
    o
}
function K(e, t, n, i) {
    return P(e, l=>l.nodeName === t, l=>{
        const o = [];
        for (let c = 0; c < l.attributes.length; c++) {
            const f = l.attributes[c];
            n[f.name] || o.push(f.name)
        }
        o.forEach(c=>l.removeAttribute(c))
    }
    , ()=>i(t))
}
function pe(e, t, n) {
    return K(e, t, n, B)
}
function Q(e, t) {
    return P(e, n=>n.nodeType === 3, n=>{
        const i = "" + t;
        if (n.data.startsWith(i)) {
            if (n.data.length !== i.length)
                return n.splitText(i.length)
        } else
            n.data = i
    }
    , ()=>T(t), !0)
}
function ge(e) {
    return Q(e, " ")
}
function H(e, t, n) {
    for (let i = n; i < e.length; i += 1) {
        const l = e[i];
        if (l.nodeType === 8 && l.textContent.trim() === t)
            return i
    }
    return -1
}
function ye(e, t) {
    const n = H(e, "HTML_TAG_START", 0)
      , i = H(e, "HTML_TAG_END", n + 1);
    if (n === -1 || i === -1)
        return new b(t);
    O(e);
    const l = e.splice(n, i - n + 1);
    y(l[0]),
    y(l[l.length - 1]);
    const o = l.slice(1, l.length - 1);
    if (o.length === 0)
        return new b(t);
    for (const c of o)
        c.claim_order = e.claim_info.total_claimed,
        e.claim_info.total_claimed += 1;
    return new b(t,o)
}
function $e(e, t) {
    e.value = t ?? ""
}
class X {
    is_svg = !1;
    e = void 0;
    n = void 0;
    t = void 0;
    a = void 0;
    constructor(t=!1) {
        this.is_svg = t,
        this.e = this.n = null
    }
    c(t) {
        this.h(t)
    }
    m(t, n, i=null) {
        this.e || (this.is_svg ? this.e = W(n.nodeName) : this.e = B(n.nodeType === 11 ? "TEMPLATE" : n.nodeName),
        this.t = n.tagName !== "TEMPLATE" ? n : n.content,
        this.c(t)),
        this.i(i)
    }
    h(t) {
        this.e.innerHTML = t,
        this.n = Array.from(this.e.nodeName === "TEMPLATE" ? this.e.content.childNodes : this.e.childNodes)
    }
    i(t) {
        for (let n = 0; n < this.n.length; n += 1)
            U(this.t, this.n[n], t)
    }
    p(t) {
        this.d(),
        this.h(t),
        this.i(this.a)
    }
    d() {
        this.n.forEach(y)
    }
}
class b extends X {
    l = void 0;
    constructor(t=!1, n) {
        super(t),
        this.e = this.n = null,
        this.l = n
    }
    c(t) {
        this.l ? this.n = this.l : super.c(t)
    }
    i(t) {
        for (let n = 0; n < this.n.length; n += 1)
            V(this.t, this.n[n], t)
    }
}
let p;
function m(e) {
    p = e
}
function Y() {
    if (!p)
        throw new Error("Function called outside component initialization");
    return p
}
function xe(e) {
    Y().$$.on_mount.push(e)
}
const h = []
  , L = [];
let _ = [];
const M = []
  , Z = Promise.resolve();
let v = !1;
function ee() {
    v || (v = !0,
    Z.then(I))
}
function N(e) {
    _.push(e)
}
const w = new Set;
let d = 0;
function I() {
    if (d !== 0)
        return;
    const e = p;
    do {
        try {
            for (; d < h.length; ) {
                const t = h[d];
                d++,
                m(t),
                te(t.$$)
            }
        } catch (t) {
            throw h.length = 0,
            d = 0,
            t
        }
        for (m(null),
        h.length = 0,
        d = 0; L.length; )
            L.pop()();
        for (let t = 0; t < _.length; t += 1) {
            const n = _[t];
            w.has(n) || (w.add(n),
            n())
        }
        _.length = 0
    } while (h.length);
    for (; M.length; )
        M.pop()();
    v = !1,
    w.clear(),
    m(e)
}
function te(e) {
    if (e.fragment !== null) {
        e.update(),
        $(e.before_update);
        const t = e.dirty;
        e.dirty = [-1],
        e.fragment && e.fragment.p(e.ctx, t),
        e.after_update.forEach(N)
    }
}
function ne(e) {
    const t = []
      , n = [];
    _.forEach(i=>e.indexOf(i) === -1 ? t.push(i) : n.push(i)),
    n.forEach(i=>i()),
    _ = t
}
const ie = new Set;
function le(e, t) {
    e && e.i && (ie.delete(e),
    e.i(t))
}
function be(e) {
    return e?.length !== void 0 ? e : Array.from(e)
}
function re(e, t, n) {
    const {fragment: i, after_update: l} = e.$$;
    i && i.m(t, n),
    N(()=>{
        const o = e.$$.on_mount.map(j).filter(C);
        e.$$.on_destroy ? e.$$.on_destroy.push(...o) : $(o),
        e.$$.on_mount = []
    }
    ),
    l.forEach(N)
}
function ce(e, t) {
    const n = e.$$;
    n.fragment !== null && (ne(n.after_update),
    $(n.on_destroy),
    n.fragment && n.fragment.d(t),
    n.on_destroy = n.fragment = null,
    n.ctx = [])
}
function se(e, t) {
    e.$$.dirty[0] === -1 && (h.push(e),
    ee(),
    e.$$.dirty.fill(0)),
    e.$$.dirty[t / 31 | 0] |= 1 << t % 31
}
function we(e, t, n, i, l, o, c=null, f=[-1]) {
    const r = p;
    m(e);
    const s = e.$$ = {
        fragment: null,
        ctx: [],
        props: o,
        update: E,
        not_equal: l,
        bound: S(),
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(t.context || (r ? r.$$.context : [])),
        callbacks: S(),
        dirty: f,
        skip_bound: !1,
        root: t.target || r.$$.root
    };
    c && c(s.root);
    let a = !1;
    if (s.ctx = n ? n(e, t.props || {}, (u,g,...A)=>{
        const k = A.length ? A[0] : g;
        return s.ctx && l(s.ctx[u], s.ctx[u] = k) && (!s.skip_bound && s.bound[u] && s.bound[u](k),
        a && se(e, u)),
        g
    }
    ) : [],
    s.update(),
    a = !0,
    $(s.before_update),
    s.fragment = i ? i(s.ctx) : !1,
    t.target) {
        if (t.hydrate) {
            D();
            const u = J(t.target);
            s.fragment && s.fragment.l(u),
            u.forEach(y)
        } else
            s.fragment && s.fragment.c();
        t.intro && le(e.$$.fragment),
        re(e, t.target, t.anchor),
        G(),
        I()
    }
    m(r)
}
class Ee {
    $$ = void 0;
    $$set = void 0;
    $destroy() {
        ce(this, 1),
        this.$destroy = E
    }
    $on(t, n) {
        if (!C(n))
            return E;
        const i = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
        return i.push(n),
        ()=>{
            const l = i.indexOf(n);
            l !== -1 && i.splice(l, 1)
        }
    }
    $set(t) {
        this.$$set && !q(t) && (this.$$.skip_bound = !0,
        this.$$set(t),
        this.$$.skip_bound = !1)
    }
}
const oe = "4";
typeof window < "u" && (window.__svelte || (window.__svelte = {
    v: new Set
})).v.add(oe);
export {b as H, Ee as S, ae as a, J as b, pe as c, ge as d, B as e, y as f, me as g, _e as h, we as i, V as j, F as k, $e as l, he as m, E as n, xe as o, be as p, ue as q, de as r, fe as s, ye as t};
