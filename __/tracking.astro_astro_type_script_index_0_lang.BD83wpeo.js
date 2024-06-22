var Ce = {};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const nt = function(t) {
    const e = [];
    let n = 0;
    for (let r = 0; r < t.length; r++) {
        let i = t.charCodeAt(r);
        i < 128 ? e[n++] = i : i < 2048 ? (e[n++] = i >> 6 | 192,
        e[n++] = i & 63 | 128) : (i & 64512) === 55296 && r + 1 < t.length && (t.charCodeAt(r + 1) & 64512) === 56320 ? (i = 65536 + ((i & 1023) << 10) + (t.charCodeAt(++r) & 1023),
        e[n++] = i >> 18 | 240,
        e[n++] = i >> 12 & 63 | 128,
        e[n++] = i >> 6 & 63 | 128,
        e[n++] = i & 63 | 128) : (e[n++] = i >> 12 | 224,
        e[n++] = i >> 6 & 63 | 128,
        e[n++] = i & 63 | 128)
    }
    return e
}
  , Zt = function(t) {
    const e = [];
    let n = 0
      , r = 0;
    for (; n < t.length; ) {
        const i = t[n++];
        if (i < 128)
            e[r++] = String.fromCharCode(i);
        else if (i > 191 && i < 224) {
            const s = t[n++];
            e[r++] = String.fromCharCode((i & 31) << 6 | s & 63)
        } else if (i > 239 && i < 365) {
            const s = t[n++]
              , a = t[n++]
              , o = t[n++]
              , c = ((i & 7) << 18 | (s & 63) << 12 | (a & 63) << 6 | o & 63) - 65536;
            e[r++] = String.fromCharCode(55296 + (c >> 10)),
            e[r++] = String.fromCharCode(56320 + (c & 1023))
        } else {
            const s = t[n++]
              , a = t[n++];
            e[r++] = String.fromCharCode((i & 15) << 12 | (s & 63) << 6 | a & 63)
        }
    }
    return e.join("")
}
  , rt = {
    byteToCharMap_: null,
    charToByteMap_: null,
    byteToCharMapWebSafe_: null,
    charToByteMapWebSafe_: null,
    ENCODED_VALS_BASE: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    get ENCODED_VALS() {
        return this.ENCODED_VALS_BASE + "+/="
    },
    get ENCODED_VALS_WEBSAFE() {
        return this.ENCODED_VALS_BASE + "-_."
    },
    HAS_NATIVE_SUPPORT: typeof atob == "function",
    encodeByteArray(t, e) {
        if (!Array.isArray(t))
            throw Error("encodeByteArray takes an array as a parameter");
        this.init_();
        const n = e ? this.byteToCharMapWebSafe_ : this.byteToCharMap_
          , r = [];
        for (let i = 0; i < t.length; i += 3) {
            const s = t[i]
              , a = i + 1 < t.length
              , o = a ? t[i + 1] : 0
              , c = i + 2 < t.length
              , l = c ? t[i + 2] : 0
              , d = s >> 2
              , h = (s & 3) << 4 | o >> 4;
            let m = (o & 15) << 2 | l >> 6
              , b = l & 63;
            c || (b = 64,
            a || (m = 64)),
            r.push(n[d], n[h], n[m], n[b])
        }
        return r.join("")
    },
    encodeString(t, e) {
        return this.HAS_NATIVE_SUPPORT && !e ? btoa(t) : this.encodeByteArray(nt(t), e)
    },
    decodeString(t, e) {
        return this.HAS_NATIVE_SUPPORT && !e ? atob(t) : Zt(this.decodeStringToByteArray(t, e))
    },
    decodeStringToByteArray(t, e) {
        this.init_();
        const n = e ? this.charToByteMapWebSafe_ : this.charToByteMap_
          , r = [];
        for (let i = 0; i < t.length; ) {
            const s = n[t.charAt(i++)]
              , o = i < t.length ? n[t.charAt(i)] : 0;
            ++i;
            const l = i < t.length ? n[t.charAt(i)] : 64;
            ++i;
            const h = i < t.length ? n[t.charAt(i)] : 64;
            if (++i,
            s == null || o == null || l == null || h == null)
                throw new en;
            const m = s << 2 | o >> 4;
            if (r.push(m),
            l !== 64) {
                const b = o << 4 & 240 | l >> 2;
                if (r.push(b),
                h !== 64) {
                    const Qt = l << 6 & 192 | h;
                    r.push(Qt)
                }
            }
        }
        return r
    },
    init_() {
        if (!this.byteToCharMap_) {
            this.byteToCharMap_ = {},
            this.charToByteMap_ = {},
            this.byteToCharMapWebSafe_ = {},
            this.charToByteMapWebSafe_ = {};
            for (let t = 0; t < this.ENCODED_VALS.length; t++)
                this.byteToCharMap_[t] = this.ENCODED_VALS.charAt(t),
                this.charToByteMap_[this.byteToCharMap_[t]] = t,
                this.byteToCharMapWebSafe_[t] = this.ENCODED_VALS_WEBSAFE.charAt(t),
                this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]] = t,
                t >= this.ENCODED_VALS_BASE.length && (this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)] = t,
                this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)] = t)
        }
    }
};
class en extends Error {
    constructor() {
        super(...arguments),
        this.name = "DecodeBase64StringError"
    }
}
const tn = function(t) {
    const e = nt(t);
    return rt.encodeByteArray(e, !0)
}
  , it = function(t) {
    return tn(t).replace(/\./g, "")
}
  , nn = function(t) {
    try {
        return rt.decodeString(t, !0)
    } catch (e) {
        console.error("base64Decode failed: ", e)
    }
    return null
};
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function rn() {
    if (typeof self < "u")
        return self;
    if (typeof window < "u")
        return window;
    if (typeof global < "u")
        return global;
    throw new Error("Unable to locate global object.")
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const sn = ()=>rn().__FIREBASE_DEFAULTS__
  , an = ()=>{
    if (typeof process > "u" || typeof Ce > "u")
        return;
    const t = Ce.__FIREBASE_DEFAULTS__;
    if (t)
        return JSON.parse(t)
}
  , on = ()=>{
    if (typeof document > "u")
        return;
    let t;
    try {
        t = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)
    } catch {
        return
    }
    const e = t && nn(t[1]);
    return e && JSON.parse(e)
}
  , cn = ()=>{
    try {
        return sn() || an() || on()
    } catch (t) {
        console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);
        return
    }
}
  , st = ()=>{
    var t;
    return (t = cn()) === null || t === void 0 ? void 0 : t.config
}
;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ln {
    constructor() {
        this.reject = ()=>{}
        ,
        this.resolve = ()=>{}
        ,
        this.promise = new Promise((e,n)=>{
            this.resolve = e,
            this.reject = n
        }
        )
    }
    wrapCallback(e) {
        return (n,r)=>{
            n ? this.reject(n) : this.resolve(r),
            typeof e == "function" && (this.promise.catch(()=>{}
            ),
            e.length === 1 ? e(n) : e(n, r))
        }
    }
}
function un() {
    const t = typeof chrome == "object" ? chrome.runtime : typeof browser == "object" ? browser.runtime : void 0;
    return typeof t == "object" && t.id !== void 0
}
function ge() {
    try {
        return typeof indexedDB == "object"
    } catch {
        return !1
    }
}
function me() {
    return new Promise((t,e)=>{
        try {
            let n = !0;
            const r = "validate-browser-context-for-indexeddb-analytics-module"
              , i = self.indexedDB.open(r);
            i.onsuccess = ()=>{
                i.result.close(),
                n || self.indexedDB.deleteDatabase(r),
                t(!0)
            }
            ,
            i.onupgradeneeded = ()=>{
                n = !1
            }
            ,
            i.onerror = ()=>{
                var s;
                e(((s = i.error) === null || s === void 0 ? void 0 : s.message) || "")
            }
        } catch (n) {
            e(n)
        }
    }
    )
}
function at() {
    return !(typeof navigator > "u" || !navigator.cookieEnabled)
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const dn = "FirebaseError";
class B extends Error {
    constructor(e, n, r) {
        super(n),
        this.code = e,
        this.customData = r,
        this.name = dn,
        Object.setPrototypeOf(this, B.prototype),
        Error.captureStackTrace && Error.captureStackTrace(this, L.prototype.create)
    }
}
class L {
    constructor(e, n, r) {
        this.service = e,
        this.serviceName = n,
        this.errors = r
    }
    create(e, ...n) {
        const r = n[0] || {}
          , i = `${this.service}/${e}`
          , s = this.errors[e]
          , a = s ? fn(s, r) : "Error"
          , o = `${this.serviceName}: ${a} (${i}).`;
        return new B(i,o,r)
    }
}
function fn(t, e) {
    return t.replace(hn, (n,r)=>{
        const i = e[r];
        return i != null ? String(i) : `<${r}?>`
    }
    )
}
const hn = /\{\$([^}]+)}/g;
function x(t, e) {
    if (t === e)
        return !0;
    const n = Object.keys(t)
      , r = Object.keys(e);
    for (const i of n) {
        if (!r.includes(i))
            return !1;
        const s = t[i]
          , a = e[i];
        if (De(s) && De(a)) {
            if (!x(s, a))
                return !1
        } else if (s !== a)
            return !1
    }
    for (const i of r)
        if (!n.includes(i))
            return !1;
    return !0
}
function De(t) {
    return t !== null && typeof t == "object"
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const pn = 1e3
  , gn = 2
  , mn = 4 * 60 * 60 * 1e3
  , bn = .5;
function Me(t, e=pn, n=gn) {
    const r = e * Math.pow(n, t)
      , i = Math.round(bn * r * (Math.random() - .5) * 2);
    return Math.min(mn, r + i)
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function be(t) {
    return t && t._delegate ? t._delegate : t
}
class w {
    constructor(e, n, r) {
        this.name = e,
        this.instanceFactory = n,
        this.type = r,
        this.multipleInstances = !1,
        this.serviceProps = {},
        this.instantiationMode = "LAZY",
        this.onInstanceCreated = null
    }
    setInstantiationMode(e) {
        return this.instantiationMode = e,
        this
    }
    setMultipleInstances(e) {
        return this.multipleInstances = e,
        this
    }
    setServiceProps(e) {
        return this.serviceProps = e,
        this
    }
    setInstanceCreatedCallback(e) {
        return this.onInstanceCreated = e,
        this
    }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const C = "[DEFAULT]";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class In {
    constructor(e, n) {
        this.name = e,
        this.container = n,
        this.component = null,
        this.instances = new Map,
        this.instancesDeferred = new Map,
        this.instancesOptions = new Map,
        this.onInitCallbacks = new Map
    }
    get(e) {
        const n = this.normalizeInstanceIdentifier(e);
        if (!this.instancesDeferred.has(n)) {
            const r = new ln;
            if (this.instancesDeferred.set(n, r),
            this.isInitialized(n) || this.shouldAutoInitialize())
                try {
                    const i = this.getOrInitializeService({
                        instanceIdentifier: n
                    });
                    i && r.resolve(i)
                } catch {}
        }
        return this.instancesDeferred.get(n).promise
    }
    getImmediate(e) {
        var n;
        const r = this.normalizeInstanceIdentifier(e?.identifier)
          , i = (n = e?.optional) !== null && n !== void 0 ? n : !1;
        if (this.isInitialized(r) || this.shouldAutoInitialize())
            try {
                return this.getOrInitializeService({
                    instanceIdentifier: r
                })
            } catch (s) {
                if (i)
                    return null;
                throw s
            }
        else {
            if (i)
                return null;
            throw Error(`Service ${this.name} is not available`)
        }
    }
    getComponent() {
        return this.component
    }
    setComponent(e) {
        if (e.name !== this.name)
            throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);
        if (this.component)
            throw Error(`Component for ${this.name} has already been provided`);
        if (this.component = e,
        !!this.shouldAutoInitialize()) {
            if (En(e))
                try {
                    this.getOrInitializeService({
                        instanceIdentifier: C
                    })
                } catch {}
            for (const [n,r] of this.instancesDeferred.entries()) {
                const i = this.normalizeInstanceIdentifier(n);
                try {
                    const s = this.getOrInitializeService({
                        instanceIdentifier: i
                    });
                    r.resolve(s)
                } catch {}
            }
        }
    }
    clearInstance(e=C) {
        this.instancesDeferred.delete(e),
        this.instancesOptions.delete(e),
        this.instances.delete(e)
    }
    async delete() {
        const e = Array.from(this.instances.values());
        await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()), ...e.filter(n=>"_delete"in n).map(n=>n._delete())])
    }
    isComponentSet() {
        return this.component != null
    }
    isInitialized(e=C) {
        return this.instances.has(e)
    }
    getOptions(e=C) {
        return this.instancesOptions.get(e) || {}
    }
    initialize(e={}) {
        const {options: n={}} = e
          , r = this.normalizeInstanceIdentifier(e.instanceIdentifier);
        if (this.isInitialized(r))
            throw Error(`${this.name}(${r}) has already been initialized`);
        if (!this.isComponentSet())
            throw Error(`Component ${this.name} has not been registered yet`);
        const i = this.getOrInitializeService({
            instanceIdentifier: r,
            options: n
        });
        for (const [s,a] of this.instancesDeferred.entries()) {
            const o = this.normalizeInstanceIdentifier(s);
            r === o && a.resolve(i)
        }
        return i
    }
    onInit(e, n) {
        var r;
        const i = this.normalizeInstanceIdentifier(n)
          , s = (r = this.onInitCallbacks.get(i)) !== null && r !== void 0 ? r : new Set;
        s.add(e),
        this.onInitCallbacks.set(i, s);
        const a = this.instances.get(i);
        return a && e(a, i),
        ()=>{
            s.delete(e)
        }
    }
    invokeOnInitCallbacks(e, n) {
        const r = this.onInitCallbacks.get(n);
        if (r)
            for (const i of r)
                try {
                    i(e, n)
                } catch {}
    }
    getOrInitializeService({instanceIdentifier: e, options: n={}}) {
        let r = this.instances.get(e);
        if (!r && this.component && (r = this.component.instanceFactory(this.container, {
            instanceIdentifier: _n(e),
            options: n
        }),
        this.instances.set(e, r),
        this.instancesOptions.set(e, n),
        this.invokeOnInitCallbacks(r, e),
        this.component.onInstanceCreated))
            try {
                this.component.onInstanceCreated(this.container, e, r)
            } catch {}
        return r || null
    }
    normalizeInstanceIdentifier(e=C) {
        return this.component ? this.component.multipleInstances ? e : C : e
    }
    shouldAutoInitialize() {
        return !!this.component && this.component.instantiationMode !== "EXPLICIT"
    }
}
function _n(t) {
    return t === C ? void 0 : t
}
function En(t) {
    return t.instantiationMode === "EAGER"
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class yn {
    constructor(e) {
        this.name = e,
        this.providers = new Map
    }
    addComponent(e) {
        const n = this.getProvider(e.name);
        if (n.isComponentSet())
            throw new Error(`Component ${e.name} has already been registered with ${this.name}`);
        n.setComponent(e)
    }
    addOrOverwriteComponent(e) {
        this.getProvider(e.name).isComponentSet() && this.providers.delete(e.name),
        this.addComponent(e)
    }
    getProvider(e) {
        if (this.providers.has(e))
            return this.providers.get(e);
        const n = new In(e,this);
        return this.providers.set(e, n),
        n
    }
    getProviders() {
        return Array.from(this.providers.values())
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var u;
(function(t) {
    t[t.DEBUG = 0] = "DEBUG",
    t[t.VERBOSE = 1] = "VERBOSE",
    t[t.INFO = 2] = "INFO",
    t[t.WARN = 3] = "WARN",
    t[t.ERROR = 4] = "ERROR",
    t[t.SILENT = 5] = "SILENT"
}
)(u || (u = {}));
const Tn = {
    debug: u.DEBUG,
    verbose: u.VERBOSE,
    info: u.INFO,
    warn: u.WARN,
    error: u.ERROR,
    silent: u.SILENT
}
  , wn = u.INFO
  , vn = {
    [u.DEBUG]: "log",
    [u.VERBOSE]: "log",
    [u.INFO]: "info",
    [u.WARN]: "warn",
    [u.ERROR]: "error"
}
  , An = (t,e,...n)=>{
    if (e < t.logLevel)
        return;
    const r = new Date().toISOString()
      , i = vn[e];
    if (i)
        console[i](`[${r}]  ${t.name}:`, ...n);
    else
        throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)
}
;
class Ie {
    constructor(e) {
        this.name = e,
        this._logLevel = wn,
        this._logHandler = An,
        this._userLogHandler = null
    }
    get logLevel() {
        return this._logLevel
    }
    set logLevel(e) {
        if (!(e in u))
            throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);
        this._logLevel = e
    }
    setLogLevel(e) {
        this._logLevel = typeof e == "string" ? Tn[e] : e
    }
    get logHandler() {
        return this._logHandler
    }
    set logHandler(e) {
        if (typeof e != "function")
            throw new TypeError("Value assigned to `logHandler` must be a function");
        this._logHandler = e
    }
    get userLogHandler() {
        return this._userLogHandler
    }
    set userLogHandler(e) {
        this._userLogHandler = e
    }
    debug(...e) {
        this._userLogHandler && this._userLogHandler(this, u.DEBUG, ...e),
        this._logHandler(this, u.DEBUG, ...e)
    }
    log(...e) {
        this._userLogHandler && this._userLogHandler(this, u.VERBOSE, ...e),
        this._logHandler(this, u.VERBOSE, ...e)
    }
    info(...e) {
        this._userLogHandler && this._userLogHandler(this, u.INFO, ...e),
        this._logHandler(this, u.INFO, ...e)
    }
    warn(...e) {
        this._userLogHandler && this._userLogHandler(this, u.WARN, ...e),
        this._logHandler(this, u.WARN, ...e)
    }
    error(...e) {
        this._userLogHandler && this._userLogHandler(this, u.ERROR, ...e),
        this._logHandler(this, u.ERROR, ...e)
    }
}
const Sn = (t,e)=>e.some(n=>t instanceof n);
let Oe, Ne;
function Rn() {
    return Oe || (Oe = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction])
}
function Cn() {
    return Ne || (Ne = [IDBCursor.prototype.advance, IDBCursor.prototype.continue, IDBCursor.prototype.continuePrimaryKey])
}
const ot = new WeakMap
  , oe = new WeakMap
  , ct = new WeakMap
  , Y = new WeakMap
  , _e = new WeakMap;
function Dn(t) {
    const e = new Promise((n,r)=>{
        const i = ()=>{
            t.removeEventListener("success", s),
            t.removeEventListener("error", a)
        }
          , s = ()=>{
            n(v(t.result)),
            i()
        }
          , a = ()=>{
            r(t.error),
            i()
        }
        ;
        t.addEventListener("success", s),
        t.addEventListener("error", a)
    }
    );
    return e.then(n=>{
        n instanceof IDBCursor && ot.set(n, t)
    }
    ).catch(()=>{}
    ),
    _e.set(e, t),
    e
}
function Mn(t) {
    if (oe.has(t))
        return;
    const e = new Promise((n,r)=>{
        const i = ()=>{
            t.removeEventListener("complete", s),
            t.removeEventListener("error", a),
            t.removeEventListener("abort", a)
        }
          , s = ()=>{
            n(),
            i()
        }
          , a = ()=>{
            r(t.error || new DOMException("AbortError","AbortError")),
            i()
        }
        ;
        t.addEventListener("complete", s),
        t.addEventListener("error", a),
        t.addEventListener("abort", a)
    }
    );
    oe.set(t, e)
}
let ce = {
    get(t, e, n) {
        if (t instanceof IDBTransaction) {
            if (e === "done")
                return oe.get(t);
            if (e === "objectStoreNames")
                return t.objectStoreNames || ct.get(t);
            if (e === "store")
                return n.objectStoreNames[1] ? void 0 : n.objectStore(n.objectStoreNames[0])
        }
        return v(t[e])
    },
    set(t, e, n) {
        return t[e] = n,
        !0
    },
    has(t, e) {
        return t instanceof IDBTransaction && (e === "done" || e === "store") ? !0 : e in t
    }
};
function On(t) {
    ce = t(ce)
}
function Nn(t) {
    return t === IDBDatabase.prototype.transaction && !("objectStoreNames"in IDBTransaction.prototype) ? function(e, ...n) {
        const r = t.call(X(this), e, ...n);
        return ct.set(r, e.sort ? e.sort() : [e]),
        v(r)
    }
    : Cn().includes(t) ? function(...e) {
        return t.apply(X(this), e),
        v(ot.get(this))
    }
    : function(...e) {
        return v(t.apply(X(this), e))
    }
}
function Pn(t) {
    return typeof t == "function" ? Nn(t) : (t instanceof IDBTransaction && Mn(t),
    Sn(t, Rn()) ? new Proxy(t,ce) : t)
}
function v(t) {
    if (t instanceof IDBRequest)
        return Dn(t);
    if (Y.has(t))
        return Y.get(t);
    const e = Pn(t);
    return e !== t && (Y.set(t, e),
    _e.set(e, t)),
    e
}
const X = t=>_e.get(t);
function lt(t, e, {blocked: n, upgrade: r, blocking: i, terminated: s}={}) {
    const a = indexedDB.open(t, e)
      , o = v(a);
    return r && a.addEventListener("upgradeneeded", c=>{
        r(v(a.result), c.oldVersion, c.newVersion, v(a.transaction), c)
    }
    ),
    n && a.addEventListener("blocked", c=>n(c.oldVersion, c.newVersion, c)),
    o.then(c=>{
        s && c.addEventListener("close", ()=>s()),
        i && c.addEventListener("versionchange", l=>i(l.oldVersion, l.newVersion, l))
    }
    ).catch(()=>{}
    ),
    o
}
const Bn = ["get", "getKey", "getAll", "getAllKeys", "count"]
  , kn = ["put", "add", "delete", "clear"]
  , J = new Map;
function Pe(t, e) {
    if (!(t instanceof IDBDatabase && !(e in t) && typeof e == "string"))
        return;
    if (J.get(e))
        return J.get(e);
    const n = e.replace(/FromIndex$/, "")
      , r = e !== n
      , i = kn.includes(n);
    if (!(n in (r ? IDBIndex : IDBObjectStore).prototype) || !(i || Bn.includes(n)))
        return;
    const s = async function(a, ...o) {
        const c = this.transaction(a, i ? "readwrite" : "readonly");
        let l = c.store;
        return r && (l = l.index(o.shift())),
        (await Promise.all([l[n](...o), i && c.done]))[0]
    };
    return J.set(e, s),
    s
}
On(t=>({
    ...t,
    get: (e,n,r)=>Pe(e, n) || t.get(e, n, r),
    has: (e,n)=>!!Pe(e, n) || t.has(e, n)
}));
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Fn {
    constructor(e) {
        this.container = e
    }
    getPlatformInfoString() {
        return this.container.getProviders().map(n=>{
            if ($n(n)) {
                const r = n.getImmediate();
                return `${r.library}/${r.version}`
            } else
                return null
        }
        ).filter(n=>n).join(" ")
    }
}
function $n(t) {
    const e = t.getComponent();
    return e?.type === "VERSION"
}
const le = "@firebase/app"
  , Be = "0.10.5";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const O = new Ie("@firebase/app")
  , Ln = "@firebase/app-compat"
  , Un = "@firebase/analytics-compat"
  , jn = "@firebase/analytics"
  , xn = "@firebase/app-check-compat"
  , Vn = "@firebase/app-check"
  , Hn = "@firebase/auth"
  , zn = "@firebase/auth-compat"
  , qn = "@firebase/database"
  , Wn = "@firebase/database-compat"
  , Gn = "@firebase/functions"
  , Kn = "@firebase/functions-compat"
  , Yn = "@firebase/installations"
  , Xn = "@firebase/installations-compat"
  , Jn = "@firebase/messaging"
  , Qn = "@firebase/messaging-compat"
  , Zn = "@firebase/performance"
  , er = "@firebase/performance-compat"
  , tr = "@firebase/remote-config"
  , nr = "@firebase/remote-config-compat"
  , rr = "@firebase/storage"
  , ir = "@firebase/storage-compat"
  , sr = "@firebase/firestore"
  , ar = "@firebase/vertexai-preview"
  , or = "@firebase/firestore-compat"
  , cr = "firebase";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ue = "[DEFAULT]"
  , lr = {
    [le]: "fire-core",
    [Ln]: "fire-core-compat",
    [jn]: "fire-analytics",
    [Un]: "fire-analytics-compat",
    [Vn]: "fire-app-check",
    [xn]: "fire-app-check-compat",
    [Hn]: "fire-auth",
    [zn]: "fire-auth-compat",
    [qn]: "fire-rtdb",
    [Wn]: "fire-rtdb-compat",
    [Gn]: "fire-fn",
    [Kn]: "fire-fn-compat",
    [Yn]: "fire-iid",
    [Xn]: "fire-iid-compat",
    [Jn]: "fire-fcm",
    [Qn]: "fire-fcm-compat",
    [Zn]: "fire-perf",
    [er]: "fire-perf-compat",
    [tr]: "fire-rc",
    [nr]: "fire-rc-compat",
    [rr]: "fire-gcs",
    [ir]: "fire-gcs-compat",
    [sr]: "fire-fst",
    [or]: "fire-fst-compat",
    [ar]: "fire-vertex",
    "fire-js": "fire-js",
    [cr]: "fire-js-all"
};
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const V = new Map
  , ur = new Map
  , de = new Map;
function ke(t, e) {
    try {
        t.container.addComponent(e)
    } catch (n) {
        O.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`, n)
    }
}
function R(t) {
    const e = t.name;
    if (de.has(e))
        return O.debug(`There were multiple attempts to register component ${e}.`),
        !1;
    de.set(e, t);
    for (const n of V.values())
        ke(n, t);
    for (const n of ur.values())
        ke(n, t);
    return !0
}
function U(t, e) {
    const n = t.container.getProvider("heartbeat").getImmediate({
        optional: !0
    });
    return n && n.triggerHeartbeat(),
    t.container.getProvider(e)
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const dr = {
    "no-app": "No Firebase App '{$appName}' has been created - call initializeApp() first",
    "bad-app-name": "Illegal App name: '{$appName}'",
    "duplicate-app": "Firebase App named '{$appName}' already exists with different options or config",
    "app-deleted": "Firebase App named '{$appName}' already deleted",
    "server-app-deleted": "Firebase Server App has been deleted",
    "no-options": "Need to provide options, when not being deployed to hosting via source.",
    "invalid-app-argument": "firebase.{$appName}() takes either no argument or a Firebase App instance.",
    "invalid-log-argument": "First argument to `onLog` must be null or a function.",
    "idb-open": "Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",
    "idb-get": "Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",
    "idb-set": "Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",
    "idb-delete": "Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.",
    "finalization-registry-not-supported": "FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.",
    "invalid-server-app-environment": "FirebaseServerApp is not for use in browser environments."
}
  , A = new L("app","Firebase",dr);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class fr {
    constructor(e, n, r) {
        this._isDeleted = !1,
        this._options = Object.assign({}, e),
        this._config = Object.assign({}, n),
        this._name = n.name,
        this._automaticDataCollectionEnabled = n.automaticDataCollectionEnabled,
        this._container = r,
        this.container.addComponent(new w("app",()=>this,"PUBLIC"))
    }
    get automaticDataCollectionEnabled() {
        return this.checkDestroyed(),
        this._automaticDataCollectionEnabled
    }
    set automaticDataCollectionEnabled(e) {
        this.checkDestroyed(),
        this._automaticDataCollectionEnabled = e
    }
    get name() {
        return this.checkDestroyed(),
        this._name
    }
    get options() {
        return this.checkDestroyed(),
        this._options
    }
    get config() {
        return this.checkDestroyed(),
        this._config
    }
    get container() {
        return this._container
    }
    get isDeleted() {
        return this._isDeleted
    }
    set isDeleted(e) {
        this._isDeleted = e
    }
    checkDestroyed() {
        if (this.isDeleted)
            throw A.create("app-deleted", {
                appName: this._name
            })
    }
}
function ut(t, e={}) {
    let n = t;
    typeof e != "object" && (e = {
        name: e
    });
    const r = Object.assign({
        name: ue,
        automaticDataCollectionEnabled: !1
    }, e)
      , i = r.name;
    if (typeof i != "string" || !i)
        throw A.create("bad-app-name", {
            appName: String(i)
        });
    if (n || (n = st()),
    !n)
        throw A.create("no-options");
    const s = V.get(i);
    if (s) {
        if (x(n, s.options) && x(r, s.config))
            return s;
        throw A.create("duplicate-app", {
            appName: i
        })
    }
    const a = new yn(i);
    for (const c of de.values())
        a.addComponent(c);
    const o = new fr(n,r,a);
    return V.set(i, o),
    o
}
function dt(t=ue) {
    const e = V.get(t);
    if (!e && t === ue && st())
        return ut();
    if (!e)
        throw A.create("no-app", {
            appName: t
        });
    return e
}
function y(t, e, n) {
    var r;
    let i = (r = lr[t]) !== null && r !== void 0 ? r : t;
    n && (i += `-${n}`);
    const s = i.match(/\s|\//)
      , a = e.match(/\s|\//);
    if (s || a) {
        const o = [`Unable to register library "${i}" with version "${e}":`];
        s && o.push(`library name "${i}" contains illegal characters (whitespace or "/")`),
        s && a && o.push("and"),
        a && o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),
        O.warn(o.join(" "));
        return
    }
    R(new w(`${i}-version`,()=>({
        library: i,
        version: e
    }),"VERSION"))
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const hr = "firebase-heartbeat-database"
  , pr = 1
  , $ = "firebase-heartbeat-store";
let Q = null;
function ft() {
    return Q || (Q = lt(hr, pr, {
        upgrade: (t,e)=>{
            switch (e) {
            case 0:
                try {
                    t.createObjectStore($)
                } catch (n) {
                    console.warn(n)
                }
            }
        }
    }).catch(t=>{
        throw A.create("idb-open", {
            originalErrorMessage: t.message
        })
    }
    )),
    Q
}
async function gr(t) {
    try {
        const n = (await ft()).transaction($)
          , r = await n.objectStore($).get(ht(t));
        return await n.done,
        r
    } catch (e) {
        if (e instanceof B)
            O.warn(e.message);
        else {
            const n = A.create("idb-get", {
                originalErrorMessage: e?.message
            });
            O.warn(n.message)
        }
    }
}
async function Fe(t, e) {
    try {
        const r = (await ft()).transaction($, "readwrite");
        await r.objectStore($).put(e, ht(t)),
        await r.done
    } catch (n) {
        if (n instanceof B)
            O.warn(n.message);
        else {
            const r = A.create("idb-set", {
                originalErrorMessage: n?.message
            });
            O.warn(r.message)
        }
    }
}
function ht(t) {
    return `${t.name}!${t.options.appId}`
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const mr = 1024
  , br = 30 * 24 * 60 * 60 * 1e3;
class Ir {
    constructor(e) {
        this.container = e,
        this._heartbeatsCache = null;
        const n = this.container.getProvider("app").getImmediate();
        this._storage = new Er(n),
        this._heartbeatsCachePromise = this._storage.read().then(r=>(this._heartbeatsCache = r,
        r))
    }
    async triggerHeartbeat() {
        var e, n;
        const i = this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString()
          , s = $e();
        if (!(((e = this._heartbeatsCache) === null || e === void 0 ? void 0 : e.heartbeats) == null && (this._heartbeatsCache = await this._heartbeatsCachePromise,
        ((n = this._heartbeatsCache) === null || n === void 0 ? void 0 : n.heartbeats) == null)) && !(this._heartbeatsCache.lastSentHeartbeatDate === s || this._heartbeatsCache.heartbeats.some(a=>a.date === s)))
            return this._heartbeatsCache.heartbeats.push({
                date: s,
                agent: i
            }),
            this._heartbeatsCache.heartbeats = this._heartbeatsCache.heartbeats.filter(a=>{
                const o = new Date(a.date).valueOf();
                return Date.now() - o <= br
            }
            ),
            this._storage.overwrite(this._heartbeatsCache)
    }
    async getHeartbeatsHeader() {
        var e;
        if (this._heartbeatsCache === null && await this._heartbeatsCachePromise,
        ((e = this._heartbeatsCache) === null || e === void 0 ? void 0 : e.heartbeats) == null || this._heartbeatsCache.heartbeats.length === 0)
            return "";
        const n = $e()
          , {heartbeatsToSend: r, unsentEntries: i} = _r(this._heartbeatsCache.heartbeats)
          , s = it(JSON.stringify({
            version: 2,
            heartbeats: r
        }));
        return this._heartbeatsCache.lastSentHeartbeatDate = n,
        i.length > 0 ? (this._heartbeatsCache.heartbeats = i,
        await this._storage.overwrite(this._heartbeatsCache)) : (this._heartbeatsCache.heartbeats = [],
        this._storage.overwrite(this._heartbeatsCache)),
        s
    }
}
function $e() {
    return new Date().toISOString().substring(0, 10)
}
function _r(t, e=mr) {
    const n = [];
    let r = t.slice();
    for (const i of t) {
        const s = n.find(a=>a.agent === i.agent);
        if (s) {
            if (s.dates.push(i.date),
            Le(n) > e) {
                s.dates.pop();
                break
            }
        } else if (n.push({
            agent: i.agent,
            dates: [i.date]
        }),
        Le(n) > e) {
            n.pop();
            break
        }
        r = r.slice(1)
    }
    return {
        heartbeatsToSend: n,
        unsentEntries: r
    }
}
class Er {
    constructor(e) {
        this.app = e,
        this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck()
    }
    async runIndexedDBEnvironmentCheck() {
        return ge() ? me().then(()=>!0).catch(()=>!1) : !1
    }
    async read() {
        if (await this._canUseIndexedDBPromise) {
            const n = await gr(this.app);
            return n?.heartbeats ? n : {
                heartbeats: []
            }
        } else
            return {
                heartbeats: []
            }
    }
    async overwrite(e) {
        var n;
        if (await this._canUseIndexedDBPromise) {
            const i = await this.read();
            return Fe(this.app, {
                lastSentHeartbeatDate: (n = e.lastSentHeartbeatDate) !== null && n !== void 0 ? n : i.lastSentHeartbeatDate,
                heartbeats: e.heartbeats
            })
        } else
            return
    }
    async add(e) {
        var n;
        if (await this._canUseIndexedDBPromise) {
            const i = await this.read();
            return Fe(this.app, {
                lastSentHeartbeatDate: (n = e.lastSentHeartbeatDate) !== null && n !== void 0 ? n : i.lastSentHeartbeatDate,
                heartbeats: [...i.heartbeats, ...e.heartbeats]
            })
        } else
            return
    }
}
function Le(t) {
    return it(JSON.stringify({
        version: 2,
        heartbeats: t
    })).length
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function yr(t) {
    R(new w("platform-logger",e=>new Fn(e),"PRIVATE")),
    R(new w("heartbeat",e=>new Ir(e),"PRIVATE")),
    y(le, Be, t),
    y(le, Be, "esm2017"),
    y("fire-js", "")
}
yr("");
const pt = "@firebase/installations"
  , Ee = "0.6.7";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const gt = 1e4
  , mt = `w:${Ee}`
  , bt = "FIS_v2"
  , Tr = "https://firebaseinstallations.googleapis.com/v1"
  , wr = 60 * 60 * 1e3
  , vr = "installations"
  , Ar = "Installations";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Sr = {
    "missing-app-config-values": 'Missing App configuration value: "{$valueName}"',
    "not-registered": "Firebase Installation is not registered.",
    "installation-not-found": "Firebase Installation not found.",
    "request-failed": '{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',
    "app-offline": "Could not process request. Application offline.",
    "delete-pending-registration": "Can't delete installation while there is a pending registration request."
}
  , N = new L(vr,Ar,Sr);
function It(t) {
    return t instanceof B && t.code.includes("request-failed")
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _t({projectId: t}) {
    return `${Tr}/projects/${t}/installations`
}
function Et(t) {
    return {
        token: t.token,
        requestStatus: 2,
        expiresIn: Cr(t.expiresIn),
        creationTime: Date.now()
    }
}
async function yt(t, e) {
    const r = (await e.json()).error;
    return N.create("request-failed", {
        requestName: t,
        serverCode: r.code,
        serverMessage: r.message,
        serverStatus: r.status
    })
}
function Tt({apiKey: t}) {
    return new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-goog-api-key": t
    })
}
function Rr(t, {refreshToken: e}) {
    const n = Tt(t);
    return n.append("Authorization", Dr(e)),
    n
}
async function wt(t) {
    const e = await t();
    return e.status >= 500 && e.status < 600 ? t() : e
}
function Cr(t) {
    return Number(t.replace("s", "000"))
}
function Dr(t) {
    return `${bt} ${t}`
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Mr({appConfig: t, heartbeatServiceProvider: e}, {fid: n}) {
    const r = _t(t)
      , i = Tt(t)
      , s = e.getImmediate({
        optional: !0
    });
    if (s) {
        const l = await s.getHeartbeatsHeader();
        l && i.append("x-firebase-client", l)
    }
    const a = {
        fid: n,
        authVersion: bt,
        appId: t.appId,
        sdkVersion: mt
    }
      , o = {
        method: "POST",
        headers: i,
        body: JSON.stringify(a)
    }
      , c = await wt(()=>fetch(r, o));
    if (c.ok) {
        const l = await c.json();
        return {
            fid: l.fid || n,
            registrationStatus: 2,
            refreshToken: l.refreshToken,
            authToken: Et(l.authToken)
        }
    } else
        throw await yt("Create Installation", c)
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function vt(t) {
    return new Promise(e=>{
        setTimeout(e, t)
    }
    )
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Or(t) {
    return btoa(String.fromCharCode(...t)).replace(/\+/g, "-").replace(/\//g, "_")
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Nr = /^[cdef][\w-]{21}$/
  , fe = "";
function Pr() {
    try {
        const t = new Uint8Array(17);
        (self.crypto || self.msCrypto).getRandomValues(t),
        t[0] = 112 + t[0] % 16;
        const n = Br(t);
        return Nr.test(n) ? n : fe
    } catch {
        return fe
    }
}
function Br(t) {
    return Or(t).substr(0, 22)
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function W(t) {
    return `${t.appName}!${t.appId}`
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const At = new Map;
function St(t, e) {
    const n = W(t);
    Rt(n, e),
    kr(n, e)
}
function Rt(t, e) {
    const n = At.get(t);
    if (n)
        for (const r of n)
            r(e)
}
function kr(t, e) {
    const n = Fr();
    n && n.postMessage({
        key: t,
        fid: e
    }),
    $r()
}
let D = null;
function Fr() {
    return !D && "BroadcastChannel"in self && (D = new BroadcastChannel("[Firebase] FID Change"),
    D.onmessage = t=>{
        Rt(t.data.key, t.data.fid)
    }
    ),
    D
}
function $r() {
    At.size === 0 && D && (D.close(),
    D = null)
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Lr = "firebase-installations-database"
  , Ur = 1
  , P = "firebase-installations-store";
let Z = null;
function ye() {
    return Z || (Z = lt(Lr, Ur, {
        upgrade: (t,e)=>{
            switch (e) {
            case 0:
                t.createObjectStore(P)
            }
        }
    })),
    Z
}
async function H(t, e) {
    const n = W(t)
      , i = (await ye()).transaction(P, "readwrite")
      , s = i.objectStore(P)
      , a = await s.get(n);
    return await s.put(e, n),
    await i.done,
    (!a || a.fid !== e.fid) && St(t, e.fid),
    e
}
async function Ct(t) {
    const e = W(t)
      , r = (await ye()).transaction(P, "readwrite");
    await r.objectStore(P).delete(e),
    await r.done
}
async function G(t, e) {
    const n = W(t)
      , i = (await ye()).transaction(P, "readwrite")
      , s = i.objectStore(P)
      , a = await s.get(n)
      , o = e(a);
    return o === void 0 ? await s.delete(n) : await s.put(o, n),
    await i.done,
    o && (!a || a.fid !== o.fid) && St(t, o.fid),
    o
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Te(t) {
    let e;
    const n = await G(t.appConfig, r=>{
        const i = jr(r)
          , s = xr(t, i);
        return e = s.registrationPromise,
        s.installationEntry
    }
    );
    return n.fid === fe ? {
        installationEntry: await e
    } : {
        installationEntry: n,
        registrationPromise: e
    }
}
function jr(t) {
    const e = t || {
        fid: Pr(),
        registrationStatus: 0
    };
    return Dt(e)
}
function xr(t, e) {
    if (e.registrationStatus === 0) {
        if (!navigator.onLine) {
            const i = Promise.reject(N.create("app-offline"));
            return {
                installationEntry: e,
                registrationPromise: i
            }
        }
        const n = {
            fid: e.fid,
            registrationStatus: 1,
            registrationTime: Date.now()
        }
          , r = Vr(t, n);
        return {
            installationEntry: n,
            registrationPromise: r
        }
    } else
        return e.registrationStatus === 1 ? {
            installationEntry: e,
            registrationPromise: Hr(t)
        } : {
            installationEntry: e
        }
}
async function Vr(t, e) {
    try {
        const n = await Mr(t, e);
        return H(t.appConfig, n)
    } catch (n) {
        throw It(n) && n.customData.serverCode === 409 ? await Ct(t.appConfig) : await H(t.appConfig, {
            fid: e.fid,
            registrationStatus: 0
        }),
        n
    }
}
async function Hr(t) {
    let e = await Ue(t.appConfig);
    for (; e.registrationStatus === 1; )
        await vt(100),
        e = await Ue(t.appConfig);
    if (e.registrationStatus === 0) {
        const {installationEntry: n, registrationPromise: r} = await Te(t);
        return r || n
    }
    return e
}
function Ue(t) {
    return G(t, e=>{
        if (!e)
            throw N.create("installation-not-found");
        return Dt(e)
    }
    )
}
function Dt(t) {
    return zr(t) ? {
        fid: t.fid,
        registrationStatus: 0
    } : t
}
function zr(t) {
    return t.registrationStatus === 1 && t.registrationTime + gt < Date.now()
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function qr({appConfig: t, heartbeatServiceProvider: e}, n) {
    const r = Wr(t, n)
      , i = Rr(t, n)
      , s = e.getImmediate({
        optional: !0
    });
    if (s) {
        const l = await s.getHeartbeatsHeader();
        l && i.append("x-firebase-client", l)
    }
    const a = {
        installation: {
            sdkVersion: mt,
            appId: t.appId
        }
    }
      , o = {
        method: "POST",
        headers: i,
        body: JSON.stringify(a)
    }
      , c = await wt(()=>fetch(r, o));
    if (c.ok) {
        const l = await c.json();
        return Et(l)
    } else
        throw await yt("Generate Auth Token", c)
}
function Wr(t, {fid: e}) {
    return `${_t(t)}/${e}/authTokens:generate`
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function we(t, e=!1) {
    let n;
    const r = await G(t.appConfig, s=>{
        if (!Mt(s))
            throw N.create("not-registered");
        const a = s.authToken;
        if (!e && Yr(a))
            return s;
        if (a.requestStatus === 1)
            return n = Gr(t, e),
            s;
        {
            if (!navigator.onLine)
                throw N.create("app-offline");
            const o = Jr(s);
            return n = Kr(t, o),
            o
        }
    }
    );
    return n ? await n : r.authToken
}
async function Gr(t, e) {
    let n = await je(t.appConfig);
    for (; n.authToken.requestStatus === 1; )
        await vt(100),
        n = await je(t.appConfig);
    const r = n.authToken;
    return r.requestStatus === 0 ? we(t, e) : r
}
function je(t) {
    return G(t, e=>{
        if (!Mt(e))
            throw N.create("not-registered");
        const n = e.authToken;
        return Qr(n) ? Object.assign(Object.assign({}, e), {
            authToken: {
                requestStatus: 0
            }
        }) : e
    }
    )
}
async function Kr(t, e) {
    try {
        const n = await qr(t, e)
          , r = Object.assign(Object.assign({}, e), {
            authToken: n
        });
        return await H(t.appConfig, r),
        n
    } catch (n) {
        if (It(n) && (n.customData.serverCode === 401 || n.customData.serverCode === 404))
            await Ct(t.appConfig);
        else {
            const r = Object.assign(Object.assign({}, e), {
                authToken: {
                    requestStatus: 0
                }
            });
            await H(t.appConfig, r)
        }
        throw n
    }
}
function Mt(t) {
    return t !== void 0 && t.registrationStatus === 2
}
function Yr(t) {
    return t.requestStatus === 2 && !Xr(t)
}
function Xr(t) {
    const e = Date.now();
    return e < t.creationTime || t.creationTime + t.expiresIn < e + wr
}
function Jr(t) {
    const e = {
        requestStatus: 1,
        requestTime: Date.now()
    };
    return Object.assign(Object.assign({}, t), {
        authToken: e
    })
}
function Qr(t) {
    return t.requestStatus === 1 && t.requestTime + gt < Date.now()
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Zr(t) {
    const e = t
      , {installationEntry: n, registrationPromise: r} = await Te(e);
    return r ? r.catch(console.error) : we(e).catch(console.error),
    n.fid
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function ei(t, e=!1) {
    const n = t;
    return await ti(n),
    (await we(n, e)).token
}
async function ti(t) {
    const {registrationPromise: e} = await Te(t);
    e && await e
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function ni(t) {
    if (!t || !t.options)
        throw ee("App Configuration");
    if (!t.name)
        throw ee("App Name");
    const e = ["projectId", "apiKey", "appId"];
    for (const n of e)
        if (!t.options[n])
            throw ee(n);
    return {
        appName: t.name,
        projectId: t.options.projectId,
        apiKey: t.options.apiKey,
        appId: t.options.appId
    }
}
function ee(t) {
    return N.create("missing-app-config-values", {
        valueName: t
    })
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Ot = "installations"
  , ri = "installations-internal"
  , ii = t=>{
    const e = t.getProvider("app").getImmediate()
      , n = ni(e)
      , r = U(e, "heartbeat");
    return {
        app: e,
        appConfig: n,
        heartbeatServiceProvider: r,
        _delete: ()=>Promise.resolve()
    }
}
  , si = t=>{
    const e = t.getProvider("app").getImmediate()
      , n = U(e, Ot).getImmediate();
    return {
        getId: ()=>Zr(n),
        getToken: i=>ei(n, i)
    }
}
;
function ai() {
    R(new w(Ot,ii,"PUBLIC")),
    R(new w(ri,si,"PRIVATE"))
}
ai();
y(pt, Ee);
y(pt, Ee, "esm2017");
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const z = "analytics"
  , oi = "firebase_id"
  , ci = "origin"
  , li = 60 * 1e3
  , ui = "https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig"
  , ve = "https://www.googletagmanager.com/gtag/js";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const g = new Ie("@firebase/analytics");
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const di = {
    "already-exists": "A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.",
    "already-initialized": "initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-intialized instance.",
    "already-initialized-settings": "Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.",
    "interop-component-reg-failed": "Firebase Analytics Interop Component failed to instantiate: {$reason}",
    "invalid-analytics-context": "Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}",
    "indexeddb-unavailable": "IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}",
    "fetch-throttle": "The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.",
    "config-fetch-failed": "Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}",
    "no-api-key": 'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',
    "no-app-id": 'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',
    "no-client-id": 'The "client_id" field is empty.',
    "invalid-gtag-resource": "Trusted Types detected an invalid gtag resource: {$gtagURL}."
}
  , _ = new L("analytics","Analytics",di);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function fi(t) {
    if (!t.startsWith(ve)) {
        const e = _.create("invalid-gtag-resource", {
            gtagURL: t
        });
        return g.warn(e.message),
        ""
    }
    return t
}
function Nt(t) {
    return Promise.all(t.map(e=>e.catch(n=>n)))
}
function hi(t, e) {
    let n;
    return window.trustedTypes && (n = window.trustedTypes.createPolicy(t, e)),
    n
}
function pi(t, e) {
    const n = hi("firebase-js-sdk-policy", {
        createScriptURL: fi
    })
      , r = document.createElement("script")
      , i = `${ve}?l=${t}&id=${e}`;
    r.src = n ? n?.createScriptURL(i) : i,
    r.async = !0,
    document.head.appendChild(r)
}
function gi(t) {
    let e = [];
    return Array.isArray(window[t]) ? e = window[t] : window[t] = e,
    e
}
async function mi(t, e, n, r, i, s) {
    const a = r[i];
    try {
        if (a)
            await e[a];
        else {
            const c = (await Nt(n)).find(l=>l.measurementId === i);
            c && await e[c.appId]
        }
    } catch (o) {
        g.error(o)
    }
    t("config", i, s)
}
async function bi(t, e, n, r, i) {
    try {
        let s = [];
        if (i && i.send_to) {
            let a = i.send_to;
            Array.isArray(a) || (a = [a]);
            const o = await Nt(n);
            for (const c of a) {
                const l = o.find(h=>h.measurementId === c)
                  , d = l && e[l.appId];
                if (d)
                    s.push(d);
                else {
                    s = [];
                    break
                }
            }
        }
        s.length === 0 && (s = Object.values(e)),
        await Promise.all(s),
        t("event", r, i || {})
    } catch (s) {
        g.error(s)
    }
}
function Ii(t, e, n, r) {
    async function i(s, ...a) {
        try {
            if (s === "event") {
                const [o,c] = a;
                await bi(t, e, n, o, c)
            } else if (s === "config") {
                const [o,c] = a;
                await mi(t, e, n, r, o, c)
            } else if (s === "consent") {
                const [o,c] = a;
                t("consent", o, c)
            } else if (s === "get") {
                const [o,c,l] = a;
                t("get", o, c, l)
            } else if (s === "set") {
                const [o] = a;
                t("set", o)
            } else
                t(s, ...a)
        } catch (o) {
            g.error(o)
        }
    }
    return i
}
function _i(t, e, n, r, i) {
    let s = function(...a) {
        window[r].push(arguments)
    };
    return window[i] && typeof window[i] == "function" && (s = window[i]),
    window[i] = Ii(s, t, e, n),
    {
        gtagCore: s,
        wrappedGtag: window[i]
    }
}
function Ei(t) {
    const e = window.document.getElementsByTagName("script");
    for (const n of Object.values(e))
        if (n.src && n.src.includes(ve) && n.src.includes(t))
            return n;
    return null
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const yi = 30
  , Ti = 1e3;
class wi {
    constructor(e={}, n=Ti) {
        this.throttleMetadata = e,
        this.intervalMillis = n
    }
    getThrottleMetadata(e) {
        return this.throttleMetadata[e]
    }
    setThrottleMetadata(e, n) {
        this.throttleMetadata[e] = n
    }
    deleteThrottleMetadata(e) {
        delete this.throttleMetadata[e]
    }
}
const Pt = new wi;
function vi(t) {
    return new Headers({
        Accept: "application/json",
        "x-goog-api-key": t
    })
}
async function Ai(t) {
    var e;
    const {appId: n, apiKey: r} = t
      , i = {
        method: "GET",
        headers: vi(r)
    }
      , s = ui.replace("{app-id}", n)
      , a = await fetch(s, i);
    if (a.status !== 200 && a.status !== 304) {
        let o = "";
        try {
            const c = await a.json();
            !((e = c.error) === null || e === void 0) && e.message && (o = c.error.message)
        } catch {}
        throw _.create("config-fetch-failed", {
            httpStatus: a.status,
            responseMessage: o
        })
    }
    return a.json()
}
async function Si(t, e=Pt, n) {
    const {appId: r, apiKey: i, measurementId: s} = t.options;
    if (!r)
        throw _.create("no-app-id");
    if (!i) {
        if (s)
            return {
                measurementId: s,
                appId: r
            };
        throw _.create("no-api-key")
    }
    const a = e.getThrottleMetadata(r) || {
        backoffCount: 0,
        throttleEndTimeMillis: Date.now()
    }
      , o = new Di;
    return setTimeout(async()=>{
        o.abort()
    }
    , li),
    Bt({
        appId: r,
        apiKey: i,
        measurementId: s
    }, a, o, e)
}
async function Bt(t, {throttleEndTimeMillis: e, backoffCount: n}, r, i=Pt) {
    var s;
    const {appId: a, measurementId: o} = t;
    try {
        await Ri(r, e)
    } catch (c) {
        if (o)
            return g.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${c?.message}]`),
            {
                appId: a,
                measurementId: o
            };
        throw c
    }
    try {
        const c = await Ai(t);
        return i.deleteThrottleMetadata(a),
        c
    } catch (c) {
        const l = c;
        if (!Ci(l)) {
            if (i.deleteThrottleMetadata(a),
            o)
                return g.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${l?.message}]`),
                {
                    appId: a,
                    measurementId: o
                };
            throw c
        }
        const d = Number((s = l?.customData) === null || s === void 0 ? void 0 : s.httpStatus) === 503 ? Me(n, i.intervalMillis, yi) : Me(n, i.intervalMillis)
          , h = {
            throttleEndTimeMillis: Date.now() + d,
            backoffCount: n + 1
        };
        return i.setThrottleMetadata(a, h),
        g.debug(`Calling attemptFetch again in ${d} millis`),
        Bt(t, h, r, i)
    }
}
function Ri(t, e) {
    return new Promise((n,r)=>{
        const i = Math.max(e - Date.now(), 0)
          , s = setTimeout(n, i);
        t.addEventListener(()=>{
            clearTimeout(s),
            r(_.create("fetch-throttle", {
                throttleEndTimeMillis: e
            }))
        }
        )
    }
    )
}
function Ci(t) {
    if (!(t instanceof B) || !t.customData)
        return !1;
    const e = Number(t.customData.httpStatus);
    return e === 429 || e === 500 || e === 503 || e === 504
}
class Di {
    constructor() {
        this.listeners = []
    }
    addEventListener(e) {
        this.listeners.push(e)
    }
    abort() {
        this.listeners.forEach(e=>e())
    }
}
async function Mi(t, e, n, r, i) {
    if (i && i.global) {
        t("event", n, r);
        return
    } else {
        const s = await e
          , a = Object.assign(Object.assign({}, r), {
            send_to: s
        });
        t("event", n, a)
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Oi() {
    if (ge())
        try {
            await me()
        } catch (t) {
            return g.warn(_.create("indexeddb-unavailable", {
                errorInfo: t?.toString()
            }).message),
            !1
        }
    else
        return g.warn(_.create("indexeddb-unavailable", {
            errorInfo: "IndexedDB is not available in this environment."
        }).message),
        !1;
    return !0
}
async function Ni(t, e, n, r, i, s, a) {
    var o;
    const c = Si(t);
    c.then(b=>{
        n[b.measurementId] = b.appId,
        t.options.measurementId && b.measurementId !== t.options.measurementId && g.warn(`The measurement ID in the local Firebase config (${t.options.measurementId}) does not match the measurement ID fetched from the server (${b.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)
    }
    ).catch(b=>g.error(b)),
    e.push(c);
    const l = Oi().then(b=>{
        if (b)
            return r.getId()
    }
    )
      , [d,h] = await Promise.all([c, l]);
    Ei(s) || pi(s, d.measurementId),
    i("js", new Date);
    const m = (o = a?.config) !== null && o !== void 0 ? o : {};
    return m[ci] = "firebase",
    m.update = !0,
    h != null && (m[oi] = h),
    i("config", d.measurementId, m),
    d.measurementId
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Pi {
    constructor(e) {
        this.app = e
    }
    _delete() {
        return delete F[this.app.options.appId],
        Promise.resolve()
    }
}
let F = {}
  , xe = [];
const Ve = {};
let te = "dataLayer", Bi = "gtag", He, kt, ze = !1;
function ki() {
    const t = [];
    if (un() && t.push("This is a browser extension environment."),
    at() || t.push("Cookies are not available."),
    t.length > 0) {
        const e = t.map((r,i)=>`(${i + 1}) ${r}`).join(" ")
          , n = _.create("invalid-analytics-context", {
            errorInfo: e
        });
        g.warn(n.message)
    }
}
function Fi(t, e, n) {
    ki();
    const r = t.options.appId;
    if (!r)
        throw _.create("no-app-id");
    if (!t.options.apiKey)
        if (t.options.measurementId)
            g.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${t.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);
        else
            throw _.create("no-api-key");
    if (F[r] != null)
        throw _.create("already-exists", {
            id: r
        });
    if (!ze) {
        gi(te);
        const {wrappedGtag: s, gtagCore: a} = _i(F, xe, Ve, te, Bi);
        kt = s,
        He = a,
        ze = !0
    }
    return F[r] = Ni(t, xe, Ve, e, He, te, n),
    new Pi(t)
}
function $i(t=dt()) {
    t = be(t);
    const e = U(t, z);
    return e.isInitialized() ? e.getImmediate() : Li(t)
}
function Li(t, e={}) {
    const n = U(t, z);
    if (n.isInitialized()) {
        const i = n.getImmediate();
        if (x(e, n.getOptions()))
            return i;
        throw _.create("already-initialized")
    }
    return n.initialize({
        options: e
    })
}
function Ui(t, e, n, r) {
    t = be(t),
    Mi(kt, F[t.app.options.appId], e, n, r).catch(i=>g.error(i))
}
const qe = "@firebase/analytics"
  , We = "0.10.4";
function ji() {
    R(new w(z,(e,{options: n})=>{
        const r = e.getProvider("app").getImmediate()
          , i = e.getProvider("installations-internal").getImmediate();
        return Fi(r, i, n)
    }
    ,"PUBLIC")),
    R(new w("analytics-internal",t,"PRIVATE")),
    y(qe, We),
    y(qe, We, "esm2017");
    function t(e) {
        try {
            const n = e.getProvider(z).getImmediate();
            return {
                logEvent: (r,i,s)=>Ui(n, r, i, s)
            }
        } catch (n) {
            throw _.create("interop-component-reg-failed", {
                reason: n
            })
        }
    }
}
ji();
var xi = "firebase"
  , Vi = "10.12.2";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
y(xi, Vi, "app");
const Ge = "@firebase/performance"
  , he = "0.6.7";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Ft = he
  , Hi = "FB-PERF-TRACE-START"
  , zi = "FB-PERF-TRACE-STOP"
  , pe = "FB-PERF-TRACE-MEASURE"
  , $t = "_wt_"
  , Lt = "_fp"
  , Ut = "_fcp"
  , jt = "_fid"
  , xt = "@firebase/performance/config"
  , Vt = "@firebase/performance/configexpire"
  , qi = "performance"
  , Ht = "Performance";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Wi = {
    "trace started": "Trace {$traceName} was started before.",
    "trace stopped": "Trace {$traceName} is not running.",
    "nonpositive trace startTime": "Trace {$traceName} startTime should be positive.",
    "nonpositive trace duration": "Trace {$traceName} duration should be positive.",
    "no window": "Window is not available.",
    "no app id": "App id is not available.",
    "no project id": "Project id is not available.",
    "no api key": "Api key is not available.",
    "invalid cc log": "Attempted to queue invalid cc event",
    "FB not default": "Performance can only start when Firebase app instance is the default one.",
    "RC response not ok": "RC response is not ok",
    "invalid attribute name": "Attribute name {$attributeName} is invalid.",
    "invalid attribute value": "Attribute value {$attributeValue} is invalid.",
    "invalid custom metric name": "Custom metric name {$customMetricName} is invalid",
    "invalid String merger input": "Input for String merger is invalid, contact support team to resolve.",
    "already initialized": "initializePerformance() has already been called with different options. To avoid this error, call initializePerformance() with the same options as when it was originally called, or call getPerformance() to return the already initialized instance."
}
  , p = new L(qi,Ht,Wi);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const T = new Ie(Ht);
T.logLevel = u.INFO;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let ne, zt;
class f {
    constructor(e) {
        if (this.window = e,
        !e)
            throw p.create("no window");
        this.performance = e.performance,
        this.PerformanceObserver = e.PerformanceObserver,
        this.windowLocation = e.location,
        this.navigator = e.navigator,
        this.document = e.document,
        this.navigator && this.navigator.cookieEnabled && (this.localStorage = e.localStorage),
        e.perfMetrics && e.perfMetrics.onFirstInputDelay && (this.onFirstInputDelay = e.perfMetrics.onFirstInputDelay)
    }
    getUrl() {
        return this.windowLocation.href.split("?")[0]
    }
    mark(e) {
        !this.performance || !this.performance.mark || this.performance.mark(e)
    }
    measure(e, n, r) {
        !this.performance || !this.performance.measure || this.performance.measure(e, n, r)
    }
    getEntriesByType(e) {
        return !this.performance || !this.performance.getEntriesByType ? [] : this.performance.getEntriesByType(e)
    }
    getEntriesByName(e) {
        return !this.performance || !this.performance.getEntriesByName ? [] : this.performance.getEntriesByName(e)
    }
    getTimeOrigin() {
        return this.performance && (this.performance.timeOrigin || this.performance.timing.navigationStart)
    }
    requiredApisAvailable() {
        return !fetch || !Promise || !at() ? (T.info("Firebase Performance cannot start if browser does not support fetch and Promise or cookie is disabled."),
        !1) : ge() ? !0 : (T.info("IndexedDB is not supported by current browser"),
        !1)
    }
    setupObserver(e, n) {
        if (!this.PerformanceObserver)
            return;
        new this.PerformanceObserver(i=>{
            for (const s of i.getEntries())
                n(s)
        }
        ).observe({
            entryTypes: [e]
        })
    }
    static getInstance() {
        return ne === void 0 && (ne = new f(zt)),
        ne
    }
}
function Gi(t) {
    zt = t
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let qt;
function Ki(t) {
    const e = t.getId();
    return e.then(n=>{
        qt = n
    }
    ),
    e
}
function Ae() {
    return qt
}
function Yi(t) {
    const e = t.getToken();
    return e.then(n=>{}
    ),
    e
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Ke(t, e) {
    const n = t.length - e.length;
    if (n < 0 || n > 1)
        throw p.create("invalid String merger input");
    const r = [];
    for (let i = 0; i < t.length; i++)
        r.push(t.charAt(i)),
        e.length > i && r.push(e.charAt(i));
    return r.join("")
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let re;
class I {
    constructor() {
        this.instrumentationEnabled = !0,
        this.dataCollectionEnabled = !0,
        this.loggingEnabled = !1,
        this.tracesSamplingRate = 1,
        this.networkRequestsSamplingRate = 1,
        this.logEndPointUrl = "https://firebaselogging.googleapis.com/v0cc/log?format=json_proto",
        this.flTransportEndpointUrl = Ke("hts/frbslgigp.ogepscmv/ieo/eaylg", "tp:/ieaeogn-agolai.o/1frlglgc/o"),
        this.transportKey = Ke("AzSC8r6ReiGqFMyfvgow", "Iayx0u-XT3vksVM-pIV"),
        this.logSource = 462,
        this.logTraceAfterSampling = !1,
        this.logNetworkAfterSampling = !1,
        this.configTimeToLive = 12
    }
    getFlTransportFullUrl() {
        return this.flTransportEndpointUrl.concat("?key=", this.transportKey)
    }
    static getInstance() {
        return re === void 0 && (re = new I),
        re
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var k;
(function(t) {
    t[t.UNKNOWN = 0] = "UNKNOWN",
    t[t.VISIBLE = 1] = "VISIBLE",
    t[t.HIDDEN = 2] = "HIDDEN"
}
)(k || (k = {}));
const Xi = ["firebase_", "google_", "ga_"]
  , Ji = new RegExp("^[a-zA-Z]\\w*$")
  , Qi = 40
  , Zi = 100;
function es() {
    const t = f.getInstance().navigator;
    return t?.serviceWorker ? t.serviceWorker.controller ? 2 : 3 : 1
}
function Wt() {
    switch (f.getInstance().document.visibilityState) {
    case "visible":
        return k.VISIBLE;
    case "hidden":
        return k.HIDDEN;
    default:
        return k.UNKNOWN
    }
}
function ts() {
    const e = f.getInstance().navigator.connection;
    switch (e && e.effectiveType) {
    case "slow-2g":
        return 1;
    case "2g":
        return 2;
    case "3g":
        return 3;
    case "4g":
        return 4;
    default:
        return 0
    }
}
function ns(t) {
    return t.length === 0 || t.length > Qi ? !1 : !Xi.some(n=>t.startsWith(n)) && !!t.match(Ji)
}
function rs(t) {
    return t.length !== 0 && t.length <= Zi
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Gt(t) {
    var e;
    const n = (e = t.options) === null || e === void 0 ? void 0 : e.appId;
    if (!n)
        throw p.create("no app id");
    return n
}
function is(t) {
    var e;
    const n = (e = t.options) === null || e === void 0 ? void 0 : e.projectId;
    if (!n)
        throw p.create("no project id");
    return n
}
function ss(t) {
    var e;
    const n = (e = t.options) === null || e === void 0 ? void 0 : e.apiKey;
    if (!n)
        throw p.create("no api key");
    return n
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const as = "0.0.1"
  , E = {
    loggingEnabled: !0
}
  , os = "FIREBASE_INSTALLATIONS_AUTH";
function cs(t, e) {
    const n = ls();
    return n ? (Ye(n),
    Promise.resolve()) : fs(t, e).then(Ye).then(r=>us(r), ()=>{}
    )
}
function ls() {
    const t = f.getInstance().localStorage;
    if (!t)
        return;
    const e = t.getItem(Vt);
    if (!e || !hs(e))
        return;
    const n = t.getItem(xt);
    if (n)
        try {
            return JSON.parse(n)
        } catch {
            return
        }
}
function us(t) {
    const e = f.getInstance().localStorage;
    !t || !e || (e.setItem(xt, JSON.stringify(t)),
    e.setItem(Vt, String(Date.now() + I.getInstance().configTimeToLive * 60 * 60 * 1e3)))
}
const ds = "Could not fetch config, will use default configs";
function fs(t, e) {
    return Yi(t.installations).then(n=>{
        const r = is(t.app)
          , i = ss(t.app)
          , s = `https://firebaseremoteconfig.googleapis.com/v1/projects/${r}/namespaces/fireperf:fetch?key=${i}`
          , a = new Request(s,{
            method: "POST",
            headers: {
                Authorization: `${os} ${n}`
            },
            body: JSON.stringify({
                app_instance_id: e,
                app_instance_id_token: n,
                app_id: Gt(t.app),
                app_version: Ft,
                sdk_version: as
            })
        });
        return fetch(a).then(o=>{
            if (o.ok)
                return o.json();
            throw p.create("RC response not ok")
        }
        )
    }
    ).catch(()=>{
        T.info(ds)
    }
    )
}
function Ye(t) {
    if (!t)
        return t;
    const e = I.getInstance()
      , n = t.entries || {};
    return n.fpr_enabled !== void 0 ? e.loggingEnabled = String(n.fpr_enabled) === "true" : e.loggingEnabled = E.loggingEnabled,
    n.fpr_log_source ? e.logSource = Number(n.fpr_log_source) : E.logSource && (e.logSource = E.logSource),
    n.fpr_log_endpoint_url ? e.logEndPointUrl = n.fpr_log_endpoint_url : E.logEndPointUrl && (e.logEndPointUrl = E.logEndPointUrl),
    n.fpr_log_transport_key ? e.transportKey = n.fpr_log_transport_key : E.transportKey && (e.transportKey = E.transportKey),
    n.fpr_vc_network_request_sampling_rate !== void 0 ? e.networkRequestsSamplingRate = Number(n.fpr_vc_network_request_sampling_rate) : E.networkRequestsSamplingRate !== void 0 && (e.networkRequestsSamplingRate = E.networkRequestsSamplingRate),
    n.fpr_vc_trace_sampling_rate !== void 0 ? e.tracesSamplingRate = Number(n.fpr_vc_trace_sampling_rate) : E.tracesSamplingRate !== void 0 && (e.tracesSamplingRate = E.tracesSamplingRate),
    e.logTraceAfterSampling = Xe(e.tracesSamplingRate),
    e.logNetworkAfterSampling = Xe(e.networkRequestsSamplingRate),
    t
}
function hs(t) {
    return Number(t) > Date.now()
}
function Xe(t) {
    return Math.random() <= t
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let Se = 1, ie;
function Kt(t) {
    return Se = 2,
    ie = ie || gs(t),
    ie
}
function ps() {
    return Se === 3
}
function gs(t) {
    return ms().then(()=>Ki(t.installations)).then(e=>cs(t, e)).then(()=>Je(), ()=>Je())
}
function ms() {
    const t = f.getInstance().document;
    return new Promise(e=>{
        if (t && t.readyState !== "complete") {
            const n = ()=>{
                t.readyState === "complete" && (t.removeEventListener("readystatechange", n),
                e())
            }
            ;
            t.addEventListener("readystatechange", n)
        } else
            e()
    }
    )
}
function Je() {
    Se = 3
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Re = 10 * 1e3
  , bs = 5.5 * 1e3
  , Yt = 3
  , Is = 1e3;
let q = Yt
  , S = []
  , Qe = !1;
function _s() {
    Qe || (K(bs),
    Qe = !0)
}
function K(t) {
    setTimeout(()=>{
        if (q !== 0) {
            if (!S.length)
                return K(Re);
            Es()
        }
    }
    , t)
}
function Es() {
    const t = S.splice(0, Is)
      , e = t.map(r=>({
        source_extension_json_proto3: r.message,
        event_time_ms: String(r.eventTime)
    }))
      , n = {
        request_time_ms: String(Date.now()),
        client_info: {
            client_type: 1,
            js_client_info: {}
        },
        log_source: I.getInstance().logSource,
        log_event: e
    };
    ys(n, t).catch(()=>{
        S = [...t, ...S],
        q--,
        T.info(`Tries left: ${q}.`),
        K(Re)
    }
    )
}
function ys(t, e) {
    return Ts(t).then(n=>(n.ok || T.info("Call to Firebase backend failed."),
    n.json())).then(n=>{
        const r = Number(n.nextRequestWaitMillis);
        let i = Re;
        isNaN(r) || (i = Math.max(r, i));
        const s = n.logResponseDetails;
        Array.isArray(s) && s.length > 0 && s[0].responseAction === "RETRY_REQUEST_LATER" && (S = [...e, ...S],
        T.info("Retry transport request later.")),
        q = Yt,
        K(i)
    }
    )
}
function Ts(t) {
    const e = I.getInstance().getFlTransportFullUrl();
    return fetch(e, {
        method: "POST",
        body: JSON.stringify(t)
    })
}
function ws(t) {
    if (!t.eventTime || !t.message)
        throw p.create("invalid cc log");
    S = [...S, t]
}
function vs(t) {
    return (...e)=>{
        const n = t(...e);
        ws({
            message: n,
            eventTime: Date.now()
        })
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let se;
function Xt(t, e) {
    se || (se = vs(Ss)),
    se(t, e)
}
function j(t) {
    const e = I.getInstance();
    !e.instrumentationEnabled && t.isAuto || !e.dataCollectionEnabled && !t.isAuto || f.getInstance().requiredApisAvailable() && (t.isAuto && Wt() !== k.VISIBLE || (ps() ? ae(t) : Kt(t.performanceController).then(()=>ae(t), ()=>ae(t))))
}
function ae(t) {
    if (!Ae())
        return;
    const e = I.getInstance();
    !e.loggingEnabled || !e.logTraceAfterSampling || setTimeout(()=>Xt(t, 1), 0)
}
function As(t) {
    const e = I.getInstance();
    if (!e.instrumentationEnabled)
        return;
    const n = t.url
      , r = e.logEndPointUrl.split("?")[0]
      , i = e.flTransportEndpointUrl.split("?")[0];
    n === r || n === i || !e.loggingEnabled || !e.logNetworkAfterSampling || setTimeout(()=>Xt(t, 0), 0)
}
function Ss(t, e) {
    return e === 0 ? Rs(t) : Cs(t)
}
function Rs(t) {
    const e = {
        url: t.url,
        http_method: t.httpMethod || 0,
        http_response_code: 200,
        response_payload_bytes: t.responsePayloadBytes,
        client_start_time_us: t.startTimeUs,
        time_to_response_initiated_us: t.timeToResponseInitiatedUs,
        time_to_response_completed_us: t.timeToResponseCompletedUs
    }
      , n = {
        application_info: Jt(t.performanceController.app),
        network_request_metric: e
    };
    return JSON.stringify(n)
}
function Cs(t) {
    const e = {
        name: t.name,
        is_auto: t.isAuto,
        client_start_time_us: t.startTimeUs,
        duration_us: t.durationUs
    };
    Object.keys(t.counters).length !== 0 && (e.counters = t.counters);
    const n = t.getAttributes();
    Object.keys(n).length !== 0 && (e.custom_attributes = n);
    const r = {
        application_info: Jt(t.performanceController.app),
        trace_metric: e
    };
    return JSON.stringify(r)
}
function Jt(t) {
    return {
        google_app_id: Gt(t),
        app_instance_id: Ae(),
        web_app_info: {
            sdk_version: Ft,
            page_url: f.getInstance().getUrl(),
            service_worker_status: es(),
            visibility_state: Wt(),
            effective_connection_type: ts()
        },
        application_process_state: 0
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Ds = 100
  , Ms = "_"
  , Os = [Lt, Ut, jt];
function Ns(t, e) {
    return t.length === 0 || t.length > Ds ? !1 : e && e.startsWith($t) && Os.indexOf(t) > -1 || !t.startsWith(Ms)
}
function Ps(t) {
    const e = Math.floor(t);
    return e < t && T.info(`Metric value should be an Integer, setting the value as : ${e}.`),
    e
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class M {
    constructor(e, n, r=!1, i) {
        this.performanceController = e,
        this.name = n,
        this.isAuto = r,
        this.state = 1,
        this.customAttributes = {},
        this.counters = {},
        this.api = f.getInstance(),
        this.randomId = Math.floor(Math.random() * 1e6),
        this.isAuto || (this.traceStartMark = `${Hi}-${this.randomId}-${this.name}`,
        this.traceStopMark = `${zi}-${this.randomId}-${this.name}`,
        this.traceMeasure = i || `${pe}-${this.randomId}-${this.name}`,
        i && this.calculateTraceMetrics())
    }
    start() {
        if (this.state !== 1)
            throw p.create("trace started", {
                traceName: this.name
            });
        this.api.mark(this.traceStartMark),
        this.state = 2
    }
    stop() {
        if (this.state !== 2)
            throw p.create("trace stopped", {
                traceName: this.name
            });
        this.state = 3,
        this.api.mark(this.traceStopMark),
        this.api.measure(this.traceMeasure, this.traceStartMark, this.traceStopMark),
        this.calculateTraceMetrics(),
        j(this)
    }
    record(e, n, r) {
        if (e <= 0)
            throw p.create("nonpositive trace startTime", {
                traceName: this.name
            });
        if (n <= 0)
            throw p.create("nonpositive trace duration", {
                traceName: this.name
            });
        if (this.durationUs = Math.floor(n * 1e3),
        this.startTimeUs = Math.floor(e * 1e3),
        r && r.attributes && (this.customAttributes = Object.assign({}, r.attributes)),
        r && r.metrics)
            for (const i of Object.keys(r.metrics))
                isNaN(Number(r.metrics[i])) || (this.counters[i] = Math.floor(Number(r.metrics[i])));
        j(this)
    }
    incrementMetric(e, n=1) {
        this.counters[e] === void 0 ? this.putMetric(e, n) : this.putMetric(e, this.counters[e] + n)
    }
    putMetric(e, n) {
        if (Ns(e, this.name))
            this.counters[e] = Ps(n ?? 0);
        else
            throw p.create("invalid custom metric name", {
                customMetricName: e
            })
    }
    getMetric(e) {
        return this.counters[e] || 0
    }
    putAttribute(e, n) {
        const r = ns(e)
          , i = rs(n);
        if (r && i) {
            this.customAttributes[e] = n;
            return
        }
        if (!r)
            throw p.create("invalid attribute name", {
                attributeName: e
            });
        if (!i)
            throw p.create("invalid attribute value", {
                attributeValue: n
            })
    }
    getAttribute(e) {
        return this.customAttributes[e]
    }
    removeAttribute(e) {
        this.customAttributes[e] !== void 0 && delete this.customAttributes[e]
    }
    getAttributes() {
        return Object.assign({}, this.customAttributes)
    }
    setStartTime(e) {
        this.startTimeUs = e
    }
    setDuration(e) {
        this.durationUs = e
    }
    calculateTraceMetrics() {
        const e = this.api.getEntriesByName(this.traceMeasure)
          , n = e && e[0];
        n && (this.durationUs = Math.floor(n.duration * 1e3),
        this.startTimeUs = Math.floor((n.startTime + this.api.getTimeOrigin()) * 1e3))
    }
    static createOobTrace(e, n, r, i) {
        const s = f.getInstance().getUrl();
        if (!s)
            return;
        const a = new M(e,$t + s,!0)
          , o = Math.floor(f.getInstance().getTimeOrigin() * 1e3);
        a.setStartTime(o),
        n && n[0] && (a.setDuration(Math.floor(n[0].duration * 1e3)),
        a.putMetric("domInteractive", Math.floor(n[0].domInteractive * 1e3)),
        a.putMetric("domContentLoadedEventEnd", Math.floor(n[0].domContentLoadedEventEnd * 1e3)),
        a.putMetric("loadEventEnd", Math.floor(n[0].loadEventEnd * 1e3)));
        const c = "first-paint"
          , l = "first-contentful-paint";
        if (r) {
            const d = r.find(m=>m.name === c);
            d && d.startTime && a.putMetric(Lt, Math.floor(d.startTime * 1e3));
            const h = r.find(m=>m.name === l);
            h && h.startTime && a.putMetric(Ut, Math.floor(h.startTime * 1e3)),
            i && a.putMetric(jt, Math.floor(i * 1e3))
        }
        j(a)
    }
    static createUserTimingTrace(e, n) {
        const r = new M(e,n,!1,n);
        j(r)
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Ze(t, e) {
    const n = e;
    if (!n || n.responseStart === void 0)
        return;
    const r = f.getInstance().getTimeOrigin()
      , i = Math.floor((n.startTime + r) * 1e3)
      , s = n.responseStart ? Math.floor((n.responseStart - n.startTime) * 1e3) : void 0
      , a = Math.floor((n.responseEnd - n.startTime) * 1e3)
      , o = n.name && n.name.split("?")[0]
      , c = {
        performanceController: t,
        url: o,
        responsePayloadBytes: n.transferSize,
        startTimeUs: i,
        timeToResponseInitiatedUs: s,
        timeToResponseCompletedUs: a
    };
    As(c)
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Bs = 5e3;
function et(t) {
    Ae() && (setTimeout(()=>Fs(t), 0),
    setTimeout(()=>ks(t), 0),
    setTimeout(()=>$s(t), 0))
}
function ks(t) {
    const e = f.getInstance()
      , n = e.getEntriesByType("resource");
    for (const r of n)
        Ze(t, r);
    e.setupObserver("resource", r=>Ze(t, r))
}
function Fs(t) {
    const e = f.getInstance()
      , n = e.getEntriesByType("navigation")
      , r = e.getEntriesByType("paint");
    if (e.onFirstInputDelay) {
        let i = setTimeout(()=>{
            M.createOobTrace(t, n, r),
            i = void 0
        }
        , Bs);
        e.onFirstInputDelay(s=>{
            i && (clearTimeout(i),
            M.createOobTrace(t, n, r, s))
        }
        )
    } else
        M.createOobTrace(t, n, r)
}
function $s(t) {
    const e = f.getInstance()
      , n = e.getEntriesByType("measure");
    for (const r of n)
        tt(t, r);
    e.setupObserver("measure", r=>tt(t, r))
}
function tt(t, e) {
    const n = e.name;
    n.substring(0, pe.length) !== pe && M.createUserTimingTrace(t, n)
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ls {
    constructor(e, n) {
        this.app = e,
        this.installations = n,
        this.initialized = !1
    }
    _init(e) {
        this.initialized || (e?.dataCollectionEnabled !== void 0 && (this.dataCollectionEnabled = e.dataCollectionEnabled),
        e?.instrumentationEnabled !== void 0 && (this.instrumentationEnabled = e.instrumentationEnabled),
        f.getInstance().requiredApisAvailable() ? me().then(n=>{
            n && (_s(),
            Kt(this).then(()=>et(this), ()=>et(this)),
            this.initialized = !0)
        }
        ).catch(n=>{
            T.info(`Environment doesn't support IndexedDB: ${n}`)
        }
        ) : T.info('Firebase Performance cannot start if the browser does not support "Fetch" and "Promise", or cookies are disabled.'))
    }
    set instrumentationEnabled(e) {
        I.getInstance().instrumentationEnabled = e
    }
    get instrumentationEnabled() {
        return I.getInstance().instrumentationEnabled
    }
    set dataCollectionEnabled(e) {
        I.getInstance().dataCollectionEnabled = e
    }
    get dataCollectionEnabled() {
        return I.getInstance().dataCollectionEnabled
    }
}
const Us = "[DEFAULT]";
function js(t=dt()) {
    return t = be(t),
    U(t, "performance").getImmediate()
}
const xs = (t,{options: e})=>{
    const n = t.getProvider("app").getImmediate()
      , r = t.getProvider("installations-internal").getImmediate();
    if (n.name !== Us)
        throw p.create("FB not default");
    if (typeof window > "u")
        throw p.create("no window");
    Gi(window);
    const i = new Ls(n,r);
    return i._init(e),
    i
}
;
function Vs() {
    R(new w("performance",xs,"PUBLIC")),
    y(Ge, he),
    y(Ge, he, "esm2017")
}
Vs();
try {
    const t = "https://api.iptv-web.app/config"
      , {firebaseConfig: e, clarity: n} = await (await fetch(t)).json()
      , r = ut(e);
    $i(r),
    js(r),
    function(i, s, a, o, c, l, d) {
        i[a] = i[a] || function() {
            (i[a].q = i[a].q || []).push(arguments)
        }
        ,
        l = s.createElement(o),
        l.async = 1,
        l.src = "https://www.clarity.ms/tag/" + c,
        d = s.getElementsByTagName(o)[0],
        d.parentNode.insertBefore(l, d)
    }(window, document, "clarity", "script", n)
} catch {}
