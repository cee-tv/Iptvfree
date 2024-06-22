import {S as U, i as A, s as D, e as m, a as C, c as g, b as T, d as S, f as p, g as B, h, j as b, k, l as q, m as M, n as E, o as j, p as w, q as G, H as P, r as I, t as $} from "./index.kREfBf0f.js";
/* empty css                       */
function L(i, e, a) {
    const t = i.slice();
    return t[6] = e[a],
    t
}
function N(i) {
    let e, a = "X", t, l;
    return {
        c() {
            e = m("button"),
            e.textContent = a,
            this.h()
        },
        l(n) {
            e = g(n, "BUTTON", {
                id: !0,
                "aria-label": !0,
                type: !0,
                class: !0,
                "data-svelte-h": !0
            }),
            B(e) !== "svelte-1c6b637" && (e.textContent = a),
            this.h()
        },
        h() {
            h(e, "id", "close"),
            h(e, "aria-label", "close button"),
            h(e, "type", "reset"),
            h(e, "class", "svelte-1e80734")
        },
        m(n, s) {
            b(n, e, s),
            t || (l = M(e, "click", i[2]),
            t = !0)
        },
        p: E,
        d(n) {
            n && p(e),
            t = !1,
            l()
        }
    }
}
function H(i) {
    let e, a = w(i[1]), t = [];
    for (let l = 0; l < a.length; l += 1)
        t[l] = O(L(i, a, l));
    return {
        c() {
            e = m("section");
            for (let l = 0; l < t.length; l += 1)
                t[l].c();
            this.h()
        },
        l(l) {
            e = g(l, "SECTION", {
                class: !0
            });
            var n = T(e);
            for (let s = 0; s < t.length; s += 1)
                t[s].l(n);
            n.forEach(p),
            this.h()
        },
        h() {
            h(e, "class", "svelte-1e80734")
        },
        m(l, n) {
            b(l, e, n);
            for (let s = 0; s < t.length; s += 1)
                t[s] && t[s].m(e, null)
        },
        p(l, n) {
            if (n & 2) {
                a = w(l[1]);
                let s;
                for (s = 0; s < a.length; s += 1) {
                    const u = L(l, a, s);
                    t[s] ? t[s].p(u, n) : (t[s] = O(u),
                    t[s].c(),
                    t[s].m(e, null))
                }
                for (; s < t.length; s += 1)
                    t[s].d(1);
                t.length = a.length
            }
        },
        d(l) {
            l && p(e),
            G(t, l)
        }
    }
}
function O(i) {
    let e, a = document.getElementById(i[6])?.outerHTML + "", t;
    return {
        c() {
            e = new P(!1),
            t = I(),
            this.h()
        },
        l(l) {
            e = $(l, !1),
            t = I(),
            this.h()
        },
        h() {
            e.a = t
        },
        m(l, n) {
            e.m(a, l, n),
            b(l, t, n)
        },
        p(l, n) {
            n & 2 && a !== (a = document.getElementById(l[6])?.outerHTML + "") && e.p(a)
        },
        d(l) {
            l && (p(t),
            e.d())
        }
    }
}
function Q(i) {
    let e, a, t, l, n, s, u, v = "🔍", d, _, o = i[0] && N(i), c = i[1].length !== 0 && H(i);
    return {
        c() {
            e = m("dialog"),
            a = m("span"),
            t = m("input"),
            l = C(),
            o && o.c(),
            n = C(),
            c && c.c(),
            s = C(),
            u = m("button"),
            u.textContent = v,
            this.h()
        },
        l(r) {
            e = g(r, "DIALOG", {
                class: !0
            });
            var f = T(e);
            a = g(f, "SPAN", {
                class: !0
            });
            var y = T(a);
            t = g(y, "INPUT", {
                type: !0,
                placeholder: !0,
                class: !0
            }),
            l = S(y),
            o && o.l(y),
            y.forEach(p),
            n = S(f),
            c && c.l(f),
            f.forEach(p),
            s = S(r),
            u = g(r, "BUTTON", {
                type: !0,
                "aria-label": !0,
                class: !0,
                "data-svelte-h": !0
            }),
            B(u) !== "svelte-4b64kk" && (u.textContent = v),
            this.h()
        },
        h() {
            h(t, "type", "text"),
            h(t, "placeholder", "Search Countries"),
            h(t, "class", "svelte-1e80734"),
            h(a, "class", "svelte-1e80734"),
            h(e, "class", "svelte-1e80734"),
            h(u, "type", "button"),
            h(u, "aria-label", "Search countries"),
            h(u, "class", "svelte-1e80734")
        },
        m(r, f) {
            b(r, e, f),
            k(e, a),
            k(a, t),
            q(t, i[0]),
            k(a, l),
            o && o.m(a, null),
            k(e, n),
            c && c.m(e, null),
            b(r, s, f),
            b(r, u, f),
            d || (_ = M(t, "input", i[3]),
            d = !0)
        },
        p(r, [f]) {
            f & 1 && t.value !== r[0] && q(t, r[0]),
            r[0] ? o ? o.p(r, f) : (o = N(r),
            o.c(),
            o.m(a, null)) : o && (o.d(1),
            o = null),
            r[1].length !== 0 ? c ? c.p(r, f) : (c = H(r),
            c.c(),
            c.m(e, null)) : c && (c.d(1),
            c = null)
        },
        i: E,
        o: E,
        d(r) {
            r && (p(e),
            p(s),
            p(u)),
            o && o.d(),
            c && c.d(),
            d = !1,
            _()
        }
    }
}
function X(i, e, a) {
    const t = ()=>{
        document.querySelector("dialog")?.close()
    }
    ;
    j(()=>{
        const [d,_] = [document.querySelector("dialog"), document.querySelector('button[type="button"]')];
        _?.addEventListener("click", ()=>{
            d?.showModal()
        }
        ),
        d?.addEventListener("click", o=>{
            o?.target?.nodeName === "DIALOG" && d?.close()
        }
        )
    }
    );
    let l = ""
      , n = [];
    const s = "https://api.iptv-web.app"
      , u = async d=>{
        try {
            const o = await (await fetch(s + "/searchCountry?q=" + d)).json();
            o && a(1, n = o)
        } catch {}
    }
    ;
    function v() {
        l = this.value,
        a(0, l)
    }
    return i.$$.update = ()=>{
        i.$$.dirty & 1 && u(l.toUpperCase())
    }
    ,
    [l, n, t, v]
}
class J extends U {
    constructor(e) {
        super(),
        A(this, e, X, Q, D, {})
    }
}
export {J as default};
