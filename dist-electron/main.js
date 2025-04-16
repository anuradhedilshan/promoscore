var fn = Object.defineProperty;
var xn = (e, a, i) => a in e ? fn(e, a, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[a] = i;
var ae = (e, a, i) => xn(e, typeof a != "symbol" ? a + "" : a, i);
import { dialog as ka, app as Le, BrowserWindow as yi, ipcMain as Ue } from "electron";
import { fileURLToPath as hn } from "node:url";
import Y from "node:path";
import he from "fs";
import Ae from "path";
import we, { TextEncoder as vn } from "util";
import $, { Readable as bn } from "stream";
import _a from "http";
import Ea from "https";
import Ne from "url";
import gn from "assert";
import yn from "tty";
import wn from "os";
import Z from "zlib";
import { EventEmitter as kn } from "events";
const _n = [
  {
    indexName: "search-promoscore-promotions",
    params: {
      aroundLatLng: "44.4267674, 26.1025384",
      aroundRadius: 1e4,
      facets: [
        "brand",
        "category",
        "characteristics_search",
        "market",
        "origin",
        "promo_score",
        "retailer"
      ],
      favoriteKey: "id",
      filters: "NOT offer_type:coupon",
      highlightPostTag: "__/ais-highlight__",
      highlightPreTag: "__ais-highlight__",
      hitsPerPage: 30,
      maxValuesPerFacet: 20,
      page: 0,
      query: ""
    }
  }
], En = [
  {
    indexName: "search-promoscore-articles",
    params: {
      facets: ["brand", "category", "characteristics_search", "origin"],
      favoriteKey: "id",
      filters: "country:ro",
      highlightPostTag: "__/ais-highlight__",
      highlightPreTag: "__ais-highlight__",
      hitsPerPage: 30,
      maxValuesPerFacet: 20,
      page: 0,
      query: ""
    }
  }
];
class Rn {
  constructor(a, i, n) {
    ae(this, "writeStream");
    ae(this, "isOpen", !1);
    ae(this, "prev", !1);
    ae(this, "FIlename");
    ae(this, "logger");
    var o;
    he.mkdirSync(a, { recursive: !0 }), this.FIlename = Ae.join(
      a,
      `${i.replace(/[^a-zA-Z0-9]/g, "_")}.json`
    );
    const s = Ae.join(a, `.${i}`);
    this.writeStream = he.createWriteStream(s), this.writeStream.write("["), this.isOpen = !0, this.logger = n, (o = this.logger) == null || o.warn(`temp file created in ${this.writeStream.path}`);
  }
  writeHeader(a) {
    if (!this.isOpen)
      throw new Error("JSONWriter is closed. Cannot append data.");
    this.writeStream.write(`${a},
"data": [`);
  }
  appendData(a) {
    if (!this.isOpen)
      throw new Error("JSONWriter is closed. Cannot append data.");
    (Array.isArray(a) ? a : [a]).forEach((n, s) => {
      (s > 0 || this.prev) && this.writeStream.write(`,
`), this.writeStream.write(JSON.stringify(n, null, 2));
    }), this.prev = !0;
  }
  close() {
    return new Promise((a, i) => {
      if (!this.isOpen) {
        a();
        return;
      }
      this.writeStream.write(`
]`), console.log("write end"), this.writeStream.end(() => {
        const n = this.writeStream.path;
        he.copyFile(n, this.FIlename, (s) => {
          var o;
          if (s) {
            (o = this.logger) == null || o.error(`Error copying file: ${s}`), i(s);
            return;
          }
          he.unlink(n, (t) => {
            var c, d;
            if (t) {
              (c = this.logger) == null || c.error(`Error deleting temporary file: ${t}`), i(t);
              return;
            }
            (d = this.logger) == null || d.warn(
              `temp file in <br/> ${this.writeStream.path} moved to <br/> ${this.FIlename}`
            ), this.isOpen = !1, a();
          });
        });
      });
    });
  }
}
function wi(e, a) {
  return function() {
    return e.apply(a, arguments);
  };
}
const { toString: jn } = Object.prototype, { getPrototypeOf: Ra } = Object, De = /* @__PURE__ */ ((e) => (a) => {
  const i = jn.call(a);
  return e[i] || (e[i] = i.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), H = (e) => (e = e.toLowerCase(), (a) => De(a) === e), Ie = (e) => (a) => typeof a === e, { isArray: ue } = Array, ve = Ie("undefined");
function Sn(e) {
  return e !== null && !ve(e) && e.constructor !== null && !ve(e.constructor) && N(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const ki = H("ArrayBuffer");
function Cn(e) {
  let a;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? a = ArrayBuffer.isView(e) : a = e && e.buffer && ki(e.buffer), a;
}
const Tn = Ie("string"), N = Ie("function"), _i = Ie("number"), $e = (e) => e !== null && typeof e == "object", On = (e) => e === !0 || e === !1, Oe = (e) => {
  if (De(e) !== "object")
    return !1;
  const a = Ra(e);
  return (a === null || a === Object.prototype || Object.getPrototypeOf(a) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, Fn = H("Date"), Ln = H("File"), An = H("Blob"), zn = H("FileList"), qn = (e) => $e(e) && N(e.pipe), Pn = (e) => {
  let a;
  return e && (typeof FormData == "function" && e instanceof FormData || N(e.append) && ((a = De(e)) === "formdata" || // detect form-data instance
  a === "object" && N(e.toString) && e.toString() === "[object FormData]"));
}, Bn = H("URLSearchParams"), [Un, Nn, Dn, In] = ["ReadableStream", "Request", "Response", "Headers"].map(H), $n = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function ke(e, a, { allOwnKeys: i = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let n, s;
  if (typeof e != "object" && (e = [e]), ue(e))
    for (n = 0, s = e.length; n < s; n++)
      a.call(null, e[n], n, e);
  else {
    const o = i ? Object.getOwnPropertyNames(e) : Object.keys(e), t = o.length;
    let c;
    for (n = 0; n < t; n++)
      c = o[n], a.call(null, e[c], c, e);
  }
}
function Ei(e, a) {
  a = a.toLowerCase();
  const i = Object.keys(e);
  let n = i.length, s;
  for (; n-- > 0; )
    if (s = i[n], a === s.toLowerCase())
      return s;
  return null;
}
const ie = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, Ri = (e) => !ve(e) && e !== ie;
function ca() {
  const { caseless: e } = Ri(this) && this || {}, a = {}, i = (n, s) => {
    const o = e && Ei(a, s) || s;
    Oe(a[o]) && Oe(n) ? a[o] = ca(a[o], n) : Oe(n) ? a[o] = ca({}, n) : ue(n) ? a[o] = n.slice() : a[o] = n;
  };
  for (let n = 0, s = arguments.length; n < s; n++)
    arguments[n] && ke(arguments[n], i);
  return a;
}
const Mn = (e, a, i, { allOwnKeys: n } = {}) => (ke(a, (s, o) => {
  i && N(s) ? e[o] = wi(s, i) : e[o] = s;
}, { allOwnKeys: n }), e), Hn = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), Vn = (e, a, i, n) => {
  e.prototype = Object.create(a.prototype, n), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: a.prototype
  }), i && Object.assign(e.prototype, i);
}, Wn = (e, a, i, n) => {
  let s, o, t;
  const c = {};
  if (a = a || {}, e == null) return a;
  do {
    for (s = Object.getOwnPropertyNames(e), o = s.length; o-- > 0; )
      t = s[o], (!n || n(t, e, a)) && !c[t] && (a[t] = e[t], c[t] = !0);
    e = i !== !1 && Ra(e);
  } while (e && (!i || i(e, a)) && e !== Object.prototype);
  return a;
}, Jn = (e, a, i) => {
  e = String(e), (i === void 0 || i > e.length) && (i = e.length), i -= a.length;
  const n = e.indexOf(a, i);
  return n !== -1 && n === i;
}, Kn = (e) => {
  if (!e) return null;
  if (ue(e)) return e;
  let a = e.length;
  if (!_i(a)) return null;
  const i = new Array(a);
  for (; a-- > 0; )
    i[a] = e[a];
  return i;
}, Gn = /* @__PURE__ */ ((e) => (a) => e && a instanceof e)(typeof Uint8Array < "u" && Ra(Uint8Array)), Xn = (e, a) => {
  const n = (e && e[Symbol.iterator]).call(e);
  let s;
  for (; (s = n.next()) && !s.done; ) {
    const o = s.value;
    a.call(e, o[0], o[1]);
  }
}, Yn = (e, a) => {
  let i;
  const n = [];
  for (; (i = e.exec(a)) !== null; )
    n.push(i);
  return n;
}, Zn = H("HTMLFormElement"), Qn = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(i, n, s) {
    return n.toUpperCase() + s;
  }
), Ma = (({ hasOwnProperty: e }) => (a, i) => e.call(a, i))(Object.prototype), es = H("RegExp"), ji = (e, a) => {
  const i = Object.getOwnPropertyDescriptors(e), n = {};
  ke(i, (s, o) => {
    let t;
    (t = a(s, o, e)) !== !1 && (n[o] = t || s);
  }), Object.defineProperties(e, n);
}, as = (e) => {
  ji(e, (a, i) => {
    if (N(e) && ["arguments", "caller", "callee"].indexOf(i) !== -1)
      return !1;
    const n = e[i];
    if (N(n)) {
      if (a.enumerable = !1, "writable" in a) {
        a.writable = !1;
        return;
      }
      a.set || (a.set = () => {
        throw Error("Can not rewrite read-only method '" + i + "'");
      });
    }
  });
}, is = (e, a) => {
  const i = {}, n = (s) => {
    s.forEach((o) => {
      i[o] = !0;
    });
  };
  return ue(e) ? n(e) : n(String(e).split(a)), i;
}, ns = () => {
}, ss = (e, a) => e != null && Number.isFinite(e = +e) ? e : a, Ge = "abcdefghijklmnopqrstuvwxyz", Ha = "0123456789", Si = {
  DIGIT: Ha,
  ALPHA: Ge,
  ALPHA_DIGIT: Ge + Ge.toUpperCase() + Ha
}, os = (e = 16, a = Si.ALPHA_DIGIT) => {
  let i = "";
  const { length: n } = a;
  for (; e--; )
    i += a[Math.random() * n | 0];
  return i;
};
function ts(e) {
  return !!(e && N(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator]);
}
const rs = (e) => {
  const a = new Array(10), i = (n, s) => {
    if ($e(n)) {
      if (a.indexOf(n) >= 0)
        return;
      if (!("toJSON" in n)) {
        a[s] = n;
        const o = ue(n) ? [] : {};
        return ke(n, (t, c) => {
          const d = i(t, s + 1);
          !ve(d) && (o[c] = d);
        }), a[s] = void 0, o;
      }
    }
    return n;
  };
  return i(e, 0);
}, cs = H("AsyncFunction"), ps = (e) => e && ($e(e) || N(e)) && N(e.then) && N(e.catch), Ci = ((e, a) => e ? setImmediate : a ? ((i, n) => (ie.addEventListener("message", ({ source: s, data: o }) => {
  s === ie && o === i && n.length && n.shift()();
}, !1), (s) => {
  n.push(s), ie.postMessage(i, "*");
}))(`axios@${Math.random()}`, []) : (i) => setTimeout(i))(
  typeof setImmediate == "function",
  N(ie.postMessage)
), ls = typeof queueMicrotask < "u" ? queueMicrotask.bind(ie) : typeof process < "u" && process.nextTick || Ci, p = {
  isArray: ue,
  isArrayBuffer: ki,
  isBuffer: Sn,
  isFormData: Pn,
  isArrayBufferView: Cn,
  isString: Tn,
  isNumber: _i,
  isBoolean: On,
  isObject: $e,
  isPlainObject: Oe,
  isReadableStream: Un,
  isRequest: Nn,
  isResponse: Dn,
  isHeaders: In,
  isUndefined: ve,
  isDate: Fn,
  isFile: Ln,
  isBlob: An,
  isRegExp: es,
  isFunction: N,
  isStream: qn,
  isURLSearchParams: Bn,
  isTypedArray: Gn,
  isFileList: zn,
  forEach: ke,
  merge: ca,
  extend: Mn,
  trim: $n,
  stripBOM: Hn,
  inherits: Vn,
  toFlatObject: Wn,
  kindOf: De,
  kindOfTest: H,
  endsWith: Jn,
  toArray: Kn,
  forEachEntry: Xn,
  matchAll: Yn,
  isHTMLForm: Zn,
  hasOwnProperty: Ma,
  hasOwnProp: Ma,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: ji,
  freezeMethods: as,
  toObjectSet: is,
  toCamelCase: Qn,
  noop: ns,
  toFiniteNumber: ss,
  findKey: Ei,
  global: ie,
  isContextDefined: Ri,
  ALPHABET: Si,
  generateString: os,
  isSpecCompliantForm: ts,
  toJSONObject: rs,
  isAsyncFn: cs,
  isThenable: ps,
  setImmediate: Ci,
  asap: ls
};
function b(e, a, i, n, s) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", a && (this.code = a), i && (this.config = i), n && (this.request = n), s && (this.response = s, this.status = s.status ? s.status : null);
}
p.inherits(b, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: p.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const Ti = b.prototype, Oi = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((e) => {
  Oi[e] = { value: e };
});
Object.defineProperties(b, Oi);
Object.defineProperty(Ti, "isAxiosError", { value: !0 });
b.from = (e, a, i, n, s, o) => {
  const t = Object.create(Ti);
  return p.toFlatObject(e, t, function(d) {
    return d !== Error.prototype;
  }, (c) => c !== "isAxiosError"), b.call(t, e.message, a, i, n, s), t.cause = e, t.name = e.name, o && Object.assign(t, o), t;
};
function Fi(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Li = $.Stream, us = we, ds = V;
function V() {
  this.source = null, this.dataSize = 0, this.maxDataSize = 1024 * 1024, this.pauseStream = !0, this._maxDataSizeExceeded = !1, this._released = !1, this._bufferedEvents = [];
}
us.inherits(V, Li);
V.create = function(e, a) {
  var i = new this();
  a = a || {};
  for (var n in a)
    i[n] = a[n];
  i.source = e;
  var s = e.emit;
  return e.emit = function() {
    return i._handleEmit(arguments), s.apply(e, arguments);
  }, e.on("error", function() {
  }), i.pauseStream && e.pause(), i;
};
Object.defineProperty(V.prototype, "readable", {
  configurable: !0,
  enumerable: !0,
  get: function() {
    return this.source.readable;
  }
});
V.prototype.setEncoding = function() {
  return this.source.setEncoding.apply(this.source, arguments);
};
V.prototype.resume = function() {
  this._released || this.release(), this.source.resume();
};
V.prototype.pause = function() {
  this.source.pause();
};
V.prototype.release = function() {
  this._released = !0, this._bufferedEvents.forEach((function(e) {
    this.emit.apply(this, e);
  }).bind(this)), this._bufferedEvents = [];
};
V.prototype.pipe = function() {
  var e = Li.prototype.pipe.apply(this, arguments);
  return this.resume(), e;
};
V.prototype._handleEmit = function(e) {
  if (this._released) {
    this.emit.apply(this, e);
    return;
  }
  e[0] === "data" && (this.dataSize += e[1].length, this._checkIfMaxDataSizeExceeded()), this._bufferedEvents.push(e);
};
V.prototype._checkIfMaxDataSizeExceeded = function() {
  if (!this._maxDataSizeExceeded && !(this.dataSize <= this.maxDataSize)) {
    this._maxDataSizeExceeded = !0;
    var e = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
    this.emit("error", new Error(e));
  }
};
var ms = we, Ai = $.Stream, Va = ds, fs = C;
function C() {
  this.writable = !1, this.readable = !0, this.dataSize = 0, this.maxDataSize = 2 * 1024 * 1024, this.pauseStreams = !0, this._released = !1, this._streams = [], this._currentStream = null, this._insideLoop = !1, this._pendingNext = !1;
}
ms.inherits(C, Ai);
C.create = function(e) {
  var a = new this();
  e = e || {};
  for (var i in e)
    a[i] = e[i];
  return a;
};
C.isStreamLike = function(e) {
  return typeof e != "function" && typeof e != "string" && typeof e != "boolean" && typeof e != "number" && !Buffer.isBuffer(e);
};
C.prototype.append = function(e) {
  var a = C.isStreamLike(e);
  if (a) {
    if (!(e instanceof Va)) {
      var i = Va.create(e, {
        maxDataSize: 1 / 0,
        pauseStream: this.pauseStreams
      });
      e.on("data", this._checkDataSize.bind(this)), e = i;
    }
    this._handleErrors(e), this.pauseStreams && e.pause();
  }
  return this._streams.push(e), this;
};
C.prototype.pipe = function(e, a) {
  return Ai.prototype.pipe.call(this, e, a), this.resume(), e;
};
C.prototype._getNext = function() {
  if (this._currentStream = null, this._insideLoop) {
    this._pendingNext = !0;
    return;
  }
  this._insideLoop = !0;
  try {
    do
      this._pendingNext = !1, this._realGetNext();
    while (this._pendingNext);
  } finally {
    this._insideLoop = !1;
  }
};
C.prototype._realGetNext = function() {
  var e = this._streams.shift();
  if (typeof e > "u") {
    this.end();
    return;
  }
  if (typeof e != "function") {
    this._pipeNext(e);
    return;
  }
  var a = e;
  a((function(i) {
    var n = C.isStreamLike(i);
    n && (i.on("data", this._checkDataSize.bind(this)), this._handleErrors(i)), this._pipeNext(i);
  }).bind(this));
};
C.prototype._pipeNext = function(e) {
  this._currentStream = e;
  var a = C.isStreamLike(e);
  if (a) {
    e.on("end", this._getNext.bind(this)), e.pipe(this, { end: !1 });
    return;
  }
  var i = e;
  this.write(i), this._getNext();
};
C.prototype._handleErrors = function(e) {
  var a = this;
  e.on("error", function(i) {
    a._emitError(i);
  });
};
C.prototype.write = function(e) {
  this.emit("data", e);
};
C.prototype.pause = function() {
  this.pauseStreams && (this.pauseStreams && this._currentStream && typeof this._currentStream.pause == "function" && this._currentStream.pause(), this.emit("pause"));
};
C.prototype.resume = function() {
  this._released || (this._released = !0, this.writable = !0, this._getNext()), this.pauseStreams && this._currentStream && typeof this._currentStream.resume == "function" && this._currentStream.resume(), this.emit("resume");
};
C.prototype.end = function() {
  this._reset(), this.emit("end");
};
C.prototype.destroy = function() {
  this._reset(), this.emit("close");
};
C.prototype._reset = function() {
  this.writable = !1, this._streams = [], this._currentStream = null;
};
C.prototype._checkDataSize = function() {
  if (this._updateDataSize(), !(this.dataSize <= this.maxDataSize)) {
    var e = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
    this._emitError(new Error(e));
  }
};
C.prototype._updateDataSize = function() {
  this.dataSize = 0;
  var e = this;
  this._streams.forEach(function(a) {
    a.dataSize && (e.dataSize += a.dataSize);
  }), this._currentStream && this._currentStream.dataSize && (this.dataSize += this._currentStream.dataSize);
};
C.prototype._emitError = function(e) {
  this._reset(), this.emit("error", e);
};
var zi = {};
const xs = {
  "application/1d-interleaved-parityfec": {
    source: "iana"
  },
  "application/3gpdash-qoe-report+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/3gpp-ims+xml": {
    source: "iana",
    compressible: !0
  },
  "application/3gpphal+json": {
    source: "iana",
    compressible: !0
  },
  "application/3gpphalforms+json": {
    source: "iana",
    compressible: !0
  },
  "application/a2l": {
    source: "iana"
  },
  "application/ace+cbor": {
    source: "iana"
  },
  "application/activemessage": {
    source: "iana"
  },
  "application/activity+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-costmap+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-costmapfilter+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-directory+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-endpointcost+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-endpointcostparams+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-endpointprop+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-endpointpropparams+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-error+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-networkmap+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-networkmapfilter+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-updatestreamcontrol+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-updatestreamparams+json": {
    source: "iana",
    compressible: !0
  },
  "application/aml": {
    source: "iana"
  },
  "application/andrew-inset": {
    source: "iana",
    extensions: [
      "ez"
    ]
  },
  "application/applefile": {
    source: "iana"
  },
  "application/applixware": {
    source: "apache",
    extensions: [
      "aw"
    ]
  },
  "application/at+jwt": {
    source: "iana"
  },
  "application/atf": {
    source: "iana"
  },
  "application/atfx": {
    source: "iana"
  },
  "application/atom+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "atom"
    ]
  },
  "application/atomcat+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "atomcat"
    ]
  },
  "application/atomdeleted+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "atomdeleted"
    ]
  },
  "application/atomicmail": {
    source: "iana"
  },
  "application/atomsvc+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "atomsvc"
    ]
  },
  "application/atsc-dwd+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "dwd"
    ]
  },
  "application/atsc-dynamic-event-message": {
    source: "iana"
  },
  "application/atsc-held+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "held"
    ]
  },
  "application/atsc-rdt+json": {
    source: "iana",
    compressible: !0
  },
  "application/atsc-rsat+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rsat"
    ]
  },
  "application/atxml": {
    source: "iana"
  },
  "application/auth-policy+xml": {
    source: "iana",
    compressible: !0
  },
  "application/bacnet-xdd+zip": {
    source: "iana",
    compressible: !1
  },
  "application/batch-smtp": {
    source: "iana"
  },
  "application/bdoc": {
    compressible: !1,
    extensions: [
      "bdoc"
    ]
  },
  "application/beep+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/calendar+json": {
    source: "iana",
    compressible: !0
  },
  "application/calendar+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xcs"
    ]
  },
  "application/call-completion": {
    source: "iana"
  },
  "application/cals-1840": {
    source: "iana"
  },
  "application/captive+json": {
    source: "iana",
    compressible: !0
  },
  "application/cbor": {
    source: "iana"
  },
  "application/cbor-seq": {
    source: "iana"
  },
  "application/cccex": {
    source: "iana"
  },
  "application/ccmp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/ccxml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ccxml"
    ]
  },
  "application/cdfx+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "cdfx"
    ]
  },
  "application/cdmi-capability": {
    source: "iana",
    extensions: [
      "cdmia"
    ]
  },
  "application/cdmi-container": {
    source: "iana",
    extensions: [
      "cdmic"
    ]
  },
  "application/cdmi-domain": {
    source: "iana",
    extensions: [
      "cdmid"
    ]
  },
  "application/cdmi-object": {
    source: "iana",
    extensions: [
      "cdmio"
    ]
  },
  "application/cdmi-queue": {
    source: "iana",
    extensions: [
      "cdmiq"
    ]
  },
  "application/cdni": {
    source: "iana"
  },
  "application/cea": {
    source: "iana"
  },
  "application/cea-2018+xml": {
    source: "iana",
    compressible: !0
  },
  "application/cellml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/cfw": {
    source: "iana"
  },
  "application/city+json": {
    source: "iana",
    compressible: !0
  },
  "application/clr": {
    source: "iana"
  },
  "application/clue+xml": {
    source: "iana",
    compressible: !0
  },
  "application/clue_info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/cms": {
    source: "iana"
  },
  "application/cnrp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/coap-group+json": {
    source: "iana",
    compressible: !0
  },
  "application/coap-payload": {
    source: "iana"
  },
  "application/commonground": {
    source: "iana"
  },
  "application/conference-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/cose": {
    source: "iana"
  },
  "application/cose-key": {
    source: "iana"
  },
  "application/cose-key-set": {
    source: "iana"
  },
  "application/cpl+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "cpl"
    ]
  },
  "application/csrattrs": {
    source: "iana"
  },
  "application/csta+xml": {
    source: "iana",
    compressible: !0
  },
  "application/cstadata+xml": {
    source: "iana",
    compressible: !0
  },
  "application/csvm+json": {
    source: "iana",
    compressible: !0
  },
  "application/cu-seeme": {
    source: "apache",
    extensions: [
      "cu"
    ]
  },
  "application/cwt": {
    source: "iana"
  },
  "application/cybercash": {
    source: "iana"
  },
  "application/dart": {
    compressible: !0
  },
  "application/dash+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mpd"
    ]
  },
  "application/dash-patch+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mpp"
    ]
  },
  "application/dashdelta": {
    source: "iana"
  },
  "application/davmount+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "davmount"
    ]
  },
  "application/dca-rft": {
    source: "iana"
  },
  "application/dcd": {
    source: "iana"
  },
  "application/dec-dx": {
    source: "iana"
  },
  "application/dialog-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/dicom": {
    source: "iana"
  },
  "application/dicom+json": {
    source: "iana",
    compressible: !0
  },
  "application/dicom+xml": {
    source: "iana",
    compressible: !0
  },
  "application/dii": {
    source: "iana"
  },
  "application/dit": {
    source: "iana"
  },
  "application/dns": {
    source: "iana"
  },
  "application/dns+json": {
    source: "iana",
    compressible: !0
  },
  "application/dns-message": {
    source: "iana"
  },
  "application/docbook+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "dbk"
    ]
  },
  "application/dots+cbor": {
    source: "iana"
  },
  "application/dskpp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/dssc+der": {
    source: "iana",
    extensions: [
      "dssc"
    ]
  },
  "application/dssc+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xdssc"
    ]
  },
  "application/dvcs": {
    source: "iana"
  },
  "application/ecmascript": {
    source: "iana",
    compressible: !0,
    extensions: [
      "es",
      "ecma"
    ]
  },
  "application/edi-consent": {
    source: "iana"
  },
  "application/edi-x12": {
    source: "iana",
    compressible: !1
  },
  "application/edifact": {
    source: "iana",
    compressible: !1
  },
  "application/efi": {
    source: "iana"
  },
  "application/elm+json": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/elm+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.cap+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/emergencycalldata.comment+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.control+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.deviceinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.ecall.msd": {
    source: "iana"
  },
  "application/emergencycalldata.providerinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.serviceinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.subscriberinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.veds+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emma+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "emma"
    ]
  },
  "application/emotionml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "emotionml"
    ]
  },
  "application/encaprtp": {
    source: "iana"
  },
  "application/epp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/epub+zip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "epub"
    ]
  },
  "application/eshop": {
    source: "iana"
  },
  "application/exi": {
    source: "iana",
    extensions: [
      "exi"
    ]
  },
  "application/expect-ct-report+json": {
    source: "iana",
    compressible: !0
  },
  "application/express": {
    source: "iana",
    extensions: [
      "exp"
    ]
  },
  "application/fastinfoset": {
    source: "iana"
  },
  "application/fastsoap": {
    source: "iana"
  },
  "application/fdt+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "fdt"
    ]
  },
  "application/fhir+json": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/fhir+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/fido.trusted-apps+json": {
    compressible: !0
  },
  "application/fits": {
    source: "iana"
  },
  "application/flexfec": {
    source: "iana"
  },
  "application/font-sfnt": {
    source: "iana"
  },
  "application/font-tdpfr": {
    source: "iana",
    extensions: [
      "pfr"
    ]
  },
  "application/font-woff": {
    source: "iana",
    compressible: !1
  },
  "application/framework-attributes+xml": {
    source: "iana",
    compressible: !0
  },
  "application/geo+json": {
    source: "iana",
    compressible: !0,
    extensions: [
      "geojson"
    ]
  },
  "application/geo+json-seq": {
    source: "iana"
  },
  "application/geopackage+sqlite3": {
    source: "iana"
  },
  "application/geoxacml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/gltf-buffer": {
    source: "iana"
  },
  "application/gml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "gml"
    ]
  },
  "application/gpx+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "gpx"
    ]
  },
  "application/gxf": {
    source: "apache",
    extensions: [
      "gxf"
    ]
  },
  "application/gzip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "gz"
    ]
  },
  "application/h224": {
    source: "iana"
  },
  "application/held+xml": {
    source: "iana",
    compressible: !0
  },
  "application/hjson": {
    extensions: [
      "hjson"
    ]
  },
  "application/http": {
    source: "iana"
  },
  "application/hyperstudio": {
    source: "iana",
    extensions: [
      "stk"
    ]
  },
  "application/ibe-key-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/ibe-pkg-reply+xml": {
    source: "iana",
    compressible: !0
  },
  "application/ibe-pp-data": {
    source: "iana"
  },
  "application/iges": {
    source: "iana"
  },
  "application/im-iscomposing+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/index": {
    source: "iana"
  },
  "application/index.cmd": {
    source: "iana"
  },
  "application/index.obj": {
    source: "iana"
  },
  "application/index.response": {
    source: "iana"
  },
  "application/index.vnd": {
    source: "iana"
  },
  "application/inkml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ink",
      "inkml"
    ]
  },
  "application/iotp": {
    source: "iana"
  },
  "application/ipfix": {
    source: "iana",
    extensions: [
      "ipfix"
    ]
  },
  "application/ipp": {
    source: "iana"
  },
  "application/isup": {
    source: "iana"
  },
  "application/its+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "its"
    ]
  },
  "application/java-archive": {
    source: "apache",
    compressible: !1,
    extensions: [
      "jar",
      "war",
      "ear"
    ]
  },
  "application/java-serialized-object": {
    source: "apache",
    compressible: !1,
    extensions: [
      "ser"
    ]
  },
  "application/java-vm": {
    source: "apache",
    compressible: !1,
    extensions: [
      "class"
    ]
  },
  "application/javascript": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "js",
      "mjs"
    ]
  },
  "application/jf2feed+json": {
    source: "iana",
    compressible: !0
  },
  "application/jose": {
    source: "iana"
  },
  "application/jose+json": {
    source: "iana",
    compressible: !0
  },
  "application/jrd+json": {
    source: "iana",
    compressible: !0
  },
  "application/jscalendar+json": {
    source: "iana",
    compressible: !0
  },
  "application/json": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "json",
      "map"
    ]
  },
  "application/json-patch+json": {
    source: "iana",
    compressible: !0
  },
  "application/json-seq": {
    source: "iana"
  },
  "application/json5": {
    extensions: [
      "json5"
    ]
  },
  "application/jsonml+json": {
    source: "apache",
    compressible: !0,
    extensions: [
      "jsonml"
    ]
  },
  "application/jwk+json": {
    source: "iana",
    compressible: !0
  },
  "application/jwk-set+json": {
    source: "iana",
    compressible: !0
  },
  "application/jwt": {
    source: "iana"
  },
  "application/kpml-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/kpml-response+xml": {
    source: "iana",
    compressible: !0
  },
  "application/ld+json": {
    source: "iana",
    compressible: !0,
    extensions: [
      "jsonld"
    ]
  },
  "application/lgr+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "lgr"
    ]
  },
  "application/link-format": {
    source: "iana"
  },
  "application/load-control+xml": {
    source: "iana",
    compressible: !0
  },
  "application/lost+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "lostxml"
    ]
  },
  "application/lostsync+xml": {
    source: "iana",
    compressible: !0
  },
  "application/lpf+zip": {
    source: "iana",
    compressible: !1
  },
  "application/lxf": {
    source: "iana"
  },
  "application/mac-binhex40": {
    source: "iana",
    extensions: [
      "hqx"
    ]
  },
  "application/mac-compactpro": {
    source: "apache",
    extensions: [
      "cpt"
    ]
  },
  "application/macwriteii": {
    source: "iana"
  },
  "application/mads+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mads"
    ]
  },
  "application/manifest+json": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "webmanifest"
    ]
  },
  "application/marc": {
    source: "iana",
    extensions: [
      "mrc"
    ]
  },
  "application/marcxml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mrcx"
    ]
  },
  "application/mathematica": {
    source: "iana",
    extensions: [
      "ma",
      "nb",
      "mb"
    ]
  },
  "application/mathml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mathml"
    ]
  },
  "application/mathml-content+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mathml-presentation+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-associated-procedure-description+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-deregister+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-envelope+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-msk+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-msk-response+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-protection-description+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-reception-report+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-register+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-register-response+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-schedule+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-user-service-description+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbox": {
    source: "iana",
    extensions: [
      "mbox"
    ]
  },
  "application/media-policy-dataset+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mpf"
    ]
  },
  "application/media_control+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mediaservercontrol+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mscml"
    ]
  },
  "application/merge-patch+json": {
    source: "iana",
    compressible: !0
  },
  "application/metalink+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "metalink"
    ]
  },
  "application/metalink4+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "meta4"
    ]
  },
  "application/mets+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mets"
    ]
  },
  "application/mf4": {
    source: "iana"
  },
  "application/mikey": {
    source: "iana"
  },
  "application/mipc": {
    source: "iana"
  },
  "application/missing-blocks+cbor-seq": {
    source: "iana"
  },
  "application/mmt-aei+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "maei"
    ]
  },
  "application/mmt-usd+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "musd"
    ]
  },
  "application/mods+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mods"
    ]
  },
  "application/moss-keys": {
    source: "iana"
  },
  "application/moss-signature": {
    source: "iana"
  },
  "application/mosskey-data": {
    source: "iana"
  },
  "application/mosskey-request": {
    source: "iana"
  },
  "application/mp21": {
    source: "iana",
    extensions: [
      "m21",
      "mp21"
    ]
  },
  "application/mp4": {
    source: "iana",
    extensions: [
      "mp4s",
      "m4p"
    ]
  },
  "application/mpeg4-generic": {
    source: "iana"
  },
  "application/mpeg4-iod": {
    source: "iana"
  },
  "application/mpeg4-iod-xmt": {
    source: "iana"
  },
  "application/mrb-consumer+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mrb-publish+xml": {
    source: "iana",
    compressible: !0
  },
  "application/msc-ivr+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/msc-mixer+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/msword": {
    source: "iana",
    compressible: !1,
    extensions: [
      "doc",
      "dot"
    ]
  },
  "application/mud+json": {
    source: "iana",
    compressible: !0
  },
  "application/multipart-core": {
    source: "iana"
  },
  "application/mxf": {
    source: "iana",
    extensions: [
      "mxf"
    ]
  },
  "application/n-quads": {
    source: "iana",
    extensions: [
      "nq"
    ]
  },
  "application/n-triples": {
    source: "iana",
    extensions: [
      "nt"
    ]
  },
  "application/nasdata": {
    source: "iana"
  },
  "application/news-checkgroups": {
    source: "iana",
    charset: "US-ASCII"
  },
  "application/news-groupinfo": {
    source: "iana",
    charset: "US-ASCII"
  },
  "application/news-transmission": {
    source: "iana"
  },
  "application/nlsml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/node": {
    source: "iana",
    extensions: [
      "cjs"
    ]
  },
  "application/nss": {
    source: "iana"
  },
  "application/oauth-authz-req+jwt": {
    source: "iana"
  },
  "application/oblivious-dns-message": {
    source: "iana"
  },
  "application/ocsp-request": {
    source: "iana"
  },
  "application/ocsp-response": {
    source: "iana"
  },
  "application/octet-stream": {
    source: "iana",
    compressible: !1,
    extensions: [
      "bin",
      "dms",
      "lrf",
      "mar",
      "so",
      "dist",
      "distz",
      "pkg",
      "bpk",
      "dump",
      "elc",
      "deploy",
      "exe",
      "dll",
      "deb",
      "dmg",
      "iso",
      "img",
      "msi",
      "msp",
      "msm",
      "buffer"
    ]
  },
  "application/oda": {
    source: "iana",
    extensions: [
      "oda"
    ]
  },
  "application/odm+xml": {
    source: "iana",
    compressible: !0
  },
  "application/odx": {
    source: "iana"
  },
  "application/oebps-package+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "opf"
    ]
  },
  "application/ogg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "ogx"
    ]
  },
  "application/omdoc+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "omdoc"
    ]
  },
  "application/onenote": {
    source: "apache",
    extensions: [
      "onetoc",
      "onetoc2",
      "onetmp",
      "onepkg"
    ]
  },
  "application/opc-nodeset+xml": {
    source: "iana",
    compressible: !0
  },
  "application/oscore": {
    source: "iana"
  },
  "application/oxps": {
    source: "iana",
    extensions: [
      "oxps"
    ]
  },
  "application/p21": {
    source: "iana"
  },
  "application/p21+zip": {
    source: "iana",
    compressible: !1
  },
  "application/p2p-overlay+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "relo"
    ]
  },
  "application/parityfec": {
    source: "iana"
  },
  "application/passport": {
    source: "iana"
  },
  "application/patch-ops-error+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xer"
    ]
  },
  "application/pdf": {
    source: "iana",
    compressible: !1,
    extensions: [
      "pdf"
    ]
  },
  "application/pdx": {
    source: "iana"
  },
  "application/pem-certificate-chain": {
    source: "iana"
  },
  "application/pgp-encrypted": {
    source: "iana",
    compressible: !1,
    extensions: [
      "pgp"
    ]
  },
  "application/pgp-keys": {
    source: "iana",
    extensions: [
      "asc"
    ]
  },
  "application/pgp-signature": {
    source: "iana",
    extensions: [
      "asc",
      "sig"
    ]
  },
  "application/pics-rules": {
    source: "apache",
    extensions: [
      "prf"
    ]
  },
  "application/pidf+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/pidf-diff+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/pkcs10": {
    source: "iana",
    extensions: [
      "p10"
    ]
  },
  "application/pkcs12": {
    source: "iana"
  },
  "application/pkcs7-mime": {
    source: "iana",
    extensions: [
      "p7m",
      "p7c"
    ]
  },
  "application/pkcs7-signature": {
    source: "iana",
    extensions: [
      "p7s"
    ]
  },
  "application/pkcs8": {
    source: "iana",
    extensions: [
      "p8"
    ]
  },
  "application/pkcs8-encrypted": {
    source: "iana"
  },
  "application/pkix-attr-cert": {
    source: "iana",
    extensions: [
      "ac"
    ]
  },
  "application/pkix-cert": {
    source: "iana",
    extensions: [
      "cer"
    ]
  },
  "application/pkix-crl": {
    source: "iana",
    extensions: [
      "crl"
    ]
  },
  "application/pkix-pkipath": {
    source: "iana",
    extensions: [
      "pkipath"
    ]
  },
  "application/pkixcmp": {
    source: "iana",
    extensions: [
      "pki"
    ]
  },
  "application/pls+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "pls"
    ]
  },
  "application/poc-settings+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/postscript": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ai",
      "eps",
      "ps"
    ]
  },
  "application/ppsp-tracker+json": {
    source: "iana",
    compressible: !0
  },
  "application/problem+json": {
    source: "iana",
    compressible: !0
  },
  "application/problem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/provenance+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "provx"
    ]
  },
  "application/prs.alvestrand.titrax-sheet": {
    source: "iana"
  },
  "application/prs.cww": {
    source: "iana",
    extensions: [
      "cww"
    ]
  },
  "application/prs.cyn": {
    source: "iana",
    charset: "7-BIT"
  },
  "application/prs.hpub+zip": {
    source: "iana",
    compressible: !1
  },
  "application/prs.nprend": {
    source: "iana"
  },
  "application/prs.plucker": {
    source: "iana"
  },
  "application/prs.rdf-xml-crypt": {
    source: "iana"
  },
  "application/prs.xsf+xml": {
    source: "iana",
    compressible: !0
  },
  "application/pskc+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "pskcxml"
    ]
  },
  "application/pvd+json": {
    source: "iana",
    compressible: !0
  },
  "application/qsig": {
    source: "iana"
  },
  "application/raml+yaml": {
    compressible: !0,
    extensions: [
      "raml"
    ]
  },
  "application/raptorfec": {
    source: "iana"
  },
  "application/rdap+json": {
    source: "iana",
    compressible: !0
  },
  "application/rdf+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rdf",
      "owl"
    ]
  },
  "application/reginfo+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rif"
    ]
  },
  "application/relax-ng-compact-syntax": {
    source: "iana",
    extensions: [
      "rnc"
    ]
  },
  "application/remote-printing": {
    source: "iana"
  },
  "application/reputon+json": {
    source: "iana",
    compressible: !0
  },
  "application/resource-lists+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rl"
    ]
  },
  "application/resource-lists-diff+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rld"
    ]
  },
  "application/rfc+xml": {
    source: "iana",
    compressible: !0
  },
  "application/riscos": {
    source: "iana"
  },
  "application/rlmi+xml": {
    source: "iana",
    compressible: !0
  },
  "application/rls-services+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rs"
    ]
  },
  "application/route-apd+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rapd"
    ]
  },
  "application/route-s-tsid+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "sls"
    ]
  },
  "application/route-usd+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rusd"
    ]
  },
  "application/rpki-ghostbusters": {
    source: "iana",
    extensions: [
      "gbr"
    ]
  },
  "application/rpki-manifest": {
    source: "iana",
    extensions: [
      "mft"
    ]
  },
  "application/rpki-publication": {
    source: "iana"
  },
  "application/rpki-roa": {
    source: "iana",
    extensions: [
      "roa"
    ]
  },
  "application/rpki-updown": {
    source: "iana"
  },
  "application/rsd+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "rsd"
    ]
  },
  "application/rss+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "rss"
    ]
  },
  "application/rtf": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rtf"
    ]
  },
  "application/rtploopback": {
    source: "iana"
  },
  "application/rtx": {
    source: "iana"
  },
  "application/samlassertion+xml": {
    source: "iana",
    compressible: !0
  },
  "application/samlmetadata+xml": {
    source: "iana",
    compressible: !0
  },
  "application/sarif+json": {
    source: "iana",
    compressible: !0
  },
  "application/sarif-external-properties+json": {
    source: "iana",
    compressible: !0
  },
  "application/sbe": {
    source: "iana"
  },
  "application/sbml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "sbml"
    ]
  },
  "application/scaip+xml": {
    source: "iana",
    compressible: !0
  },
  "application/scim+json": {
    source: "iana",
    compressible: !0
  },
  "application/scvp-cv-request": {
    source: "iana",
    extensions: [
      "scq"
    ]
  },
  "application/scvp-cv-response": {
    source: "iana",
    extensions: [
      "scs"
    ]
  },
  "application/scvp-vp-request": {
    source: "iana",
    extensions: [
      "spq"
    ]
  },
  "application/scvp-vp-response": {
    source: "iana",
    extensions: [
      "spp"
    ]
  },
  "application/sdp": {
    source: "iana",
    extensions: [
      "sdp"
    ]
  },
  "application/secevent+jwt": {
    source: "iana"
  },
  "application/senml+cbor": {
    source: "iana"
  },
  "application/senml+json": {
    source: "iana",
    compressible: !0
  },
  "application/senml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "senmlx"
    ]
  },
  "application/senml-etch+cbor": {
    source: "iana"
  },
  "application/senml-etch+json": {
    source: "iana",
    compressible: !0
  },
  "application/senml-exi": {
    source: "iana"
  },
  "application/sensml+cbor": {
    source: "iana"
  },
  "application/sensml+json": {
    source: "iana",
    compressible: !0
  },
  "application/sensml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "sensmlx"
    ]
  },
  "application/sensml-exi": {
    source: "iana"
  },
  "application/sep+xml": {
    source: "iana",
    compressible: !0
  },
  "application/sep-exi": {
    source: "iana"
  },
  "application/session-info": {
    source: "iana"
  },
  "application/set-payment": {
    source: "iana"
  },
  "application/set-payment-initiation": {
    source: "iana",
    extensions: [
      "setpay"
    ]
  },
  "application/set-registration": {
    source: "iana"
  },
  "application/set-registration-initiation": {
    source: "iana",
    extensions: [
      "setreg"
    ]
  },
  "application/sgml": {
    source: "iana"
  },
  "application/sgml-open-catalog": {
    source: "iana"
  },
  "application/shf+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "shf"
    ]
  },
  "application/sieve": {
    source: "iana",
    extensions: [
      "siv",
      "sieve"
    ]
  },
  "application/simple-filter+xml": {
    source: "iana",
    compressible: !0
  },
  "application/simple-message-summary": {
    source: "iana"
  },
  "application/simplesymbolcontainer": {
    source: "iana"
  },
  "application/sipc": {
    source: "iana"
  },
  "application/slate": {
    source: "iana"
  },
  "application/smil": {
    source: "iana"
  },
  "application/smil+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "smi",
      "smil"
    ]
  },
  "application/smpte336m": {
    source: "iana"
  },
  "application/soap+fastinfoset": {
    source: "iana"
  },
  "application/soap+xml": {
    source: "iana",
    compressible: !0
  },
  "application/sparql-query": {
    source: "iana",
    extensions: [
      "rq"
    ]
  },
  "application/sparql-results+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "srx"
    ]
  },
  "application/spdx+json": {
    source: "iana",
    compressible: !0
  },
  "application/spirits-event+xml": {
    source: "iana",
    compressible: !0
  },
  "application/sql": {
    source: "iana"
  },
  "application/srgs": {
    source: "iana",
    extensions: [
      "gram"
    ]
  },
  "application/srgs+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "grxml"
    ]
  },
  "application/sru+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "sru"
    ]
  },
  "application/ssdl+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "ssdl"
    ]
  },
  "application/ssml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ssml"
    ]
  },
  "application/stix+json": {
    source: "iana",
    compressible: !0
  },
  "application/swid+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "swidtag"
    ]
  },
  "application/tamp-apex-update": {
    source: "iana"
  },
  "application/tamp-apex-update-confirm": {
    source: "iana"
  },
  "application/tamp-community-update": {
    source: "iana"
  },
  "application/tamp-community-update-confirm": {
    source: "iana"
  },
  "application/tamp-error": {
    source: "iana"
  },
  "application/tamp-sequence-adjust": {
    source: "iana"
  },
  "application/tamp-sequence-adjust-confirm": {
    source: "iana"
  },
  "application/tamp-status-query": {
    source: "iana"
  },
  "application/tamp-status-response": {
    source: "iana"
  },
  "application/tamp-update": {
    source: "iana"
  },
  "application/tamp-update-confirm": {
    source: "iana"
  },
  "application/tar": {
    compressible: !0
  },
  "application/taxii+json": {
    source: "iana",
    compressible: !0
  },
  "application/td+json": {
    source: "iana",
    compressible: !0
  },
  "application/tei+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "tei",
      "teicorpus"
    ]
  },
  "application/tetra_isi": {
    source: "iana"
  },
  "application/thraud+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "tfi"
    ]
  },
  "application/timestamp-query": {
    source: "iana"
  },
  "application/timestamp-reply": {
    source: "iana"
  },
  "application/timestamped-data": {
    source: "iana",
    extensions: [
      "tsd"
    ]
  },
  "application/tlsrpt+gzip": {
    source: "iana"
  },
  "application/tlsrpt+json": {
    source: "iana",
    compressible: !0
  },
  "application/tnauthlist": {
    source: "iana"
  },
  "application/token-introspection+jwt": {
    source: "iana"
  },
  "application/toml": {
    compressible: !0,
    extensions: [
      "toml"
    ]
  },
  "application/trickle-ice-sdpfrag": {
    source: "iana"
  },
  "application/trig": {
    source: "iana",
    extensions: [
      "trig"
    ]
  },
  "application/ttml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ttml"
    ]
  },
  "application/tve-trigger": {
    source: "iana"
  },
  "application/tzif": {
    source: "iana"
  },
  "application/tzif-leap": {
    source: "iana"
  },
  "application/ubjson": {
    compressible: !1,
    extensions: [
      "ubj"
    ]
  },
  "application/ulpfec": {
    source: "iana"
  },
  "application/urc-grpsheet+xml": {
    source: "iana",
    compressible: !0
  },
  "application/urc-ressheet+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rsheet"
    ]
  },
  "application/urc-targetdesc+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "td"
    ]
  },
  "application/urc-uisocketdesc+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vcard+json": {
    source: "iana",
    compressible: !0
  },
  "application/vcard+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vemmi": {
    source: "iana"
  },
  "application/vividence.scriptfile": {
    source: "apache"
  },
  "application/vnd.1000minds.decision-model+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "1km"
    ]
  },
  "application/vnd.3gpp-prose+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp-prose-pc3ch+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp-v2x-local-service-information": {
    source: "iana"
  },
  "application/vnd.3gpp.5gnas": {
    source: "iana"
  },
  "application/vnd.3gpp.access-transfer-events+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.bsf+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.gmop+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.gtpc": {
    source: "iana"
  },
  "application/vnd.3gpp.interworking-data": {
    source: "iana"
  },
  "application/vnd.3gpp.lpp": {
    source: "iana"
  },
  "application/vnd.3gpp.mc-signalling-ear": {
    source: "iana"
  },
  "application/vnd.3gpp.mcdata-affiliation-command+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcdata-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcdata-payload": {
    source: "iana"
  },
  "application/vnd.3gpp.mcdata-service-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcdata-signalling": {
    source: "iana"
  },
  "application/vnd.3gpp.mcdata-ue-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcdata-user-profile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-affiliation-command+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-floor-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-location-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-mbms-usage-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-service-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-signed+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-ue-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-ue-init-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-user-profile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-affiliation-command+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-affiliation-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-location-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-mbms-usage-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-service-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-transmission-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-ue-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-user-profile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mid-call+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.ngap": {
    source: "iana"
  },
  "application/vnd.3gpp.pfcp": {
    source: "iana"
  },
  "application/vnd.3gpp.pic-bw-large": {
    source: "iana",
    extensions: [
      "plb"
    ]
  },
  "application/vnd.3gpp.pic-bw-small": {
    source: "iana",
    extensions: [
      "psb"
    ]
  },
  "application/vnd.3gpp.pic-bw-var": {
    source: "iana",
    extensions: [
      "pvb"
    ]
  },
  "application/vnd.3gpp.s1ap": {
    source: "iana"
  },
  "application/vnd.3gpp.sms": {
    source: "iana"
  },
  "application/vnd.3gpp.sms+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.srvcc-ext+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.srvcc-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.state-and-event-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.ussd+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp2.bcmcsinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp2.sms": {
    source: "iana"
  },
  "application/vnd.3gpp2.tcap": {
    source: "iana",
    extensions: [
      "tcap"
    ]
  },
  "application/vnd.3lightssoftware.imagescal": {
    source: "iana"
  },
  "application/vnd.3m.post-it-notes": {
    source: "iana",
    extensions: [
      "pwn"
    ]
  },
  "application/vnd.accpac.simply.aso": {
    source: "iana",
    extensions: [
      "aso"
    ]
  },
  "application/vnd.accpac.simply.imp": {
    source: "iana",
    extensions: [
      "imp"
    ]
  },
  "application/vnd.acucobol": {
    source: "iana",
    extensions: [
      "acu"
    ]
  },
  "application/vnd.acucorp": {
    source: "iana",
    extensions: [
      "atc",
      "acutc"
    ]
  },
  "application/vnd.adobe.air-application-installer-package+zip": {
    source: "apache",
    compressible: !1,
    extensions: [
      "air"
    ]
  },
  "application/vnd.adobe.flash.movie": {
    source: "iana"
  },
  "application/vnd.adobe.formscentral.fcdt": {
    source: "iana",
    extensions: [
      "fcdt"
    ]
  },
  "application/vnd.adobe.fxp": {
    source: "iana",
    extensions: [
      "fxp",
      "fxpl"
    ]
  },
  "application/vnd.adobe.partial-upload": {
    source: "iana"
  },
  "application/vnd.adobe.xdp+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xdp"
    ]
  },
  "application/vnd.adobe.xfdf": {
    source: "iana",
    extensions: [
      "xfdf"
    ]
  },
  "application/vnd.aether.imp": {
    source: "iana"
  },
  "application/vnd.afpc.afplinedata": {
    source: "iana"
  },
  "application/vnd.afpc.afplinedata-pagedef": {
    source: "iana"
  },
  "application/vnd.afpc.cmoca-cmresource": {
    source: "iana"
  },
  "application/vnd.afpc.foca-charset": {
    source: "iana"
  },
  "application/vnd.afpc.foca-codedfont": {
    source: "iana"
  },
  "application/vnd.afpc.foca-codepage": {
    source: "iana"
  },
  "application/vnd.afpc.modca": {
    source: "iana"
  },
  "application/vnd.afpc.modca-cmtable": {
    source: "iana"
  },
  "application/vnd.afpc.modca-formdef": {
    source: "iana"
  },
  "application/vnd.afpc.modca-mediummap": {
    source: "iana"
  },
  "application/vnd.afpc.modca-objectcontainer": {
    source: "iana"
  },
  "application/vnd.afpc.modca-overlay": {
    source: "iana"
  },
  "application/vnd.afpc.modca-pagesegment": {
    source: "iana"
  },
  "application/vnd.age": {
    source: "iana",
    extensions: [
      "age"
    ]
  },
  "application/vnd.ah-barcode": {
    source: "iana"
  },
  "application/vnd.ahead.space": {
    source: "iana",
    extensions: [
      "ahead"
    ]
  },
  "application/vnd.airzip.filesecure.azf": {
    source: "iana",
    extensions: [
      "azf"
    ]
  },
  "application/vnd.airzip.filesecure.azs": {
    source: "iana",
    extensions: [
      "azs"
    ]
  },
  "application/vnd.amadeus+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.amazon.ebook": {
    source: "apache",
    extensions: [
      "azw"
    ]
  },
  "application/vnd.amazon.mobi8-ebook": {
    source: "iana"
  },
  "application/vnd.americandynamics.acc": {
    source: "iana",
    extensions: [
      "acc"
    ]
  },
  "application/vnd.amiga.ami": {
    source: "iana",
    extensions: [
      "ami"
    ]
  },
  "application/vnd.amundsen.maze+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.android.ota": {
    source: "iana"
  },
  "application/vnd.android.package-archive": {
    source: "apache",
    compressible: !1,
    extensions: [
      "apk"
    ]
  },
  "application/vnd.anki": {
    source: "iana"
  },
  "application/vnd.anser-web-certificate-issue-initiation": {
    source: "iana",
    extensions: [
      "cii"
    ]
  },
  "application/vnd.anser-web-funds-transfer-initiation": {
    source: "apache",
    extensions: [
      "fti"
    ]
  },
  "application/vnd.antix.game-component": {
    source: "iana",
    extensions: [
      "atx"
    ]
  },
  "application/vnd.apache.arrow.file": {
    source: "iana"
  },
  "application/vnd.apache.arrow.stream": {
    source: "iana"
  },
  "application/vnd.apache.thrift.binary": {
    source: "iana"
  },
  "application/vnd.apache.thrift.compact": {
    source: "iana"
  },
  "application/vnd.apache.thrift.json": {
    source: "iana"
  },
  "application/vnd.api+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.aplextor.warrp+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.apothekende.reservation+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.apple.installer+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mpkg"
    ]
  },
  "application/vnd.apple.keynote": {
    source: "iana",
    extensions: [
      "key"
    ]
  },
  "application/vnd.apple.mpegurl": {
    source: "iana",
    extensions: [
      "m3u8"
    ]
  },
  "application/vnd.apple.numbers": {
    source: "iana",
    extensions: [
      "numbers"
    ]
  },
  "application/vnd.apple.pages": {
    source: "iana",
    extensions: [
      "pages"
    ]
  },
  "application/vnd.apple.pkpass": {
    compressible: !1,
    extensions: [
      "pkpass"
    ]
  },
  "application/vnd.arastra.swi": {
    source: "iana"
  },
  "application/vnd.aristanetworks.swi": {
    source: "iana",
    extensions: [
      "swi"
    ]
  },
  "application/vnd.artisan+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.artsquare": {
    source: "iana"
  },
  "application/vnd.astraea-software.iota": {
    source: "iana",
    extensions: [
      "iota"
    ]
  },
  "application/vnd.audiograph": {
    source: "iana",
    extensions: [
      "aep"
    ]
  },
  "application/vnd.autopackage": {
    source: "iana"
  },
  "application/vnd.avalon+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.avistar+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.balsamiq.bmml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "bmml"
    ]
  },
  "application/vnd.balsamiq.bmpr": {
    source: "iana"
  },
  "application/vnd.banana-accounting": {
    source: "iana"
  },
  "application/vnd.bbf.usp.error": {
    source: "iana"
  },
  "application/vnd.bbf.usp.msg": {
    source: "iana"
  },
  "application/vnd.bbf.usp.msg+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.bekitzur-stech+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.bint.med-content": {
    source: "iana"
  },
  "application/vnd.biopax.rdf+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.blink-idb-value-wrapper": {
    source: "iana"
  },
  "application/vnd.blueice.multipass": {
    source: "iana",
    extensions: [
      "mpm"
    ]
  },
  "application/vnd.bluetooth.ep.oob": {
    source: "iana"
  },
  "application/vnd.bluetooth.le.oob": {
    source: "iana"
  },
  "application/vnd.bmi": {
    source: "iana",
    extensions: [
      "bmi"
    ]
  },
  "application/vnd.bpf": {
    source: "iana"
  },
  "application/vnd.bpf3": {
    source: "iana"
  },
  "application/vnd.businessobjects": {
    source: "iana",
    extensions: [
      "rep"
    ]
  },
  "application/vnd.byu.uapi+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cab-jscript": {
    source: "iana"
  },
  "application/vnd.canon-cpdl": {
    source: "iana"
  },
  "application/vnd.canon-lips": {
    source: "iana"
  },
  "application/vnd.capasystems-pg+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cendio.thinlinc.clientconf": {
    source: "iana"
  },
  "application/vnd.century-systems.tcp_stream": {
    source: "iana"
  },
  "application/vnd.chemdraw+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "cdxml"
    ]
  },
  "application/vnd.chess-pgn": {
    source: "iana"
  },
  "application/vnd.chipnuts.karaoke-mmd": {
    source: "iana",
    extensions: [
      "mmd"
    ]
  },
  "application/vnd.ciedi": {
    source: "iana"
  },
  "application/vnd.cinderella": {
    source: "iana",
    extensions: [
      "cdy"
    ]
  },
  "application/vnd.cirpack.isdn-ext": {
    source: "iana"
  },
  "application/vnd.citationstyles.style+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "csl"
    ]
  },
  "application/vnd.claymore": {
    source: "iana",
    extensions: [
      "cla"
    ]
  },
  "application/vnd.cloanto.rp9": {
    source: "iana",
    extensions: [
      "rp9"
    ]
  },
  "application/vnd.clonk.c4group": {
    source: "iana",
    extensions: [
      "c4g",
      "c4d",
      "c4f",
      "c4p",
      "c4u"
    ]
  },
  "application/vnd.cluetrust.cartomobile-config": {
    source: "iana",
    extensions: [
      "c11amc"
    ]
  },
  "application/vnd.cluetrust.cartomobile-config-pkg": {
    source: "iana",
    extensions: [
      "c11amz"
    ]
  },
  "application/vnd.coffeescript": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.document": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.document-template": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.presentation": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.presentation-template": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.spreadsheet": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.spreadsheet-template": {
    source: "iana"
  },
  "application/vnd.collection+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.collection.doc+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.collection.next+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.comicbook+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.comicbook-rar": {
    source: "iana"
  },
  "application/vnd.commerce-battelle": {
    source: "iana"
  },
  "application/vnd.commonspace": {
    source: "iana",
    extensions: [
      "csp"
    ]
  },
  "application/vnd.contact.cmsg": {
    source: "iana",
    extensions: [
      "cdbcmsg"
    ]
  },
  "application/vnd.coreos.ignition+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cosmocaller": {
    source: "iana",
    extensions: [
      "cmc"
    ]
  },
  "application/vnd.crick.clicker": {
    source: "iana",
    extensions: [
      "clkx"
    ]
  },
  "application/vnd.crick.clicker.keyboard": {
    source: "iana",
    extensions: [
      "clkk"
    ]
  },
  "application/vnd.crick.clicker.palette": {
    source: "iana",
    extensions: [
      "clkp"
    ]
  },
  "application/vnd.crick.clicker.template": {
    source: "iana",
    extensions: [
      "clkt"
    ]
  },
  "application/vnd.crick.clicker.wordbank": {
    source: "iana",
    extensions: [
      "clkw"
    ]
  },
  "application/vnd.criticaltools.wbs+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wbs"
    ]
  },
  "application/vnd.cryptii.pipe+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.crypto-shade-file": {
    source: "iana"
  },
  "application/vnd.cryptomator.encrypted": {
    source: "iana"
  },
  "application/vnd.cryptomator.vault": {
    source: "iana"
  },
  "application/vnd.ctc-posml": {
    source: "iana",
    extensions: [
      "pml"
    ]
  },
  "application/vnd.ctct.ws+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cups-pdf": {
    source: "iana"
  },
  "application/vnd.cups-postscript": {
    source: "iana"
  },
  "application/vnd.cups-ppd": {
    source: "iana",
    extensions: [
      "ppd"
    ]
  },
  "application/vnd.cups-raster": {
    source: "iana"
  },
  "application/vnd.cups-raw": {
    source: "iana"
  },
  "application/vnd.curl": {
    source: "iana"
  },
  "application/vnd.curl.car": {
    source: "apache",
    extensions: [
      "car"
    ]
  },
  "application/vnd.curl.pcurl": {
    source: "apache",
    extensions: [
      "pcurl"
    ]
  },
  "application/vnd.cyan.dean.root+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cybank": {
    source: "iana"
  },
  "application/vnd.cyclonedx+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cyclonedx+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.d2l.coursepackage1p0+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.d3m-dataset": {
    source: "iana"
  },
  "application/vnd.d3m-problem": {
    source: "iana"
  },
  "application/vnd.dart": {
    source: "iana",
    compressible: !0,
    extensions: [
      "dart"
    ]
  },
  "application/vnd.data-vision.rdz": {
    source: "iana",
    extensions: [
      "rdz"
    ]
  },
  "application/vnd.datapackage+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dataresource+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dbf": {
    source: "iana",
    extensions: [
      "dbf"
    ]
  },
  "application/vnd.debian.binary-package": {
    source: "iana"
  },
  "application/vnd.dece.data": {
    source: "iana",
    extensions: [
      "uvf",
      "uvvf",
      "uvd",
      "uvvd"
    ]
  },
  "application/vnd.dece.ttml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "uvt",
      "uvvt"
    ]
  },
  "application/vnd.dece.unspecified": {
    source: "iana",
    extensions: [
      "uvx",
      "uvvx"
    ]
  },
  "application/vnd.dece.zip": {
    source: "iana",
    extensions: [
      "uvz",
      "uvvz"
    ]
  },
  "application/vnd.denovo.fcselayout-link": {
    source: "iana",
    extensions: [
      "fe_launch"
    ]
  },
  "application/vnd.desmume.movie": {
    source: "iana"
  },
  "application/vnd.dir-bi.plate-dl-nosuffix": {
    source: "iana"
  },
  "application/vnd.dm.delegation+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dna": {
    source: "iana",
    extensions: [
      "dna"
    ]
  },
  "application/vnd.document+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dolby.mlp": {
    source: "apache",
    extensions: [
      "mlp"
    ]
  },
  "application/vnd.dolby.mobile.1": {
    source: "iana"
  },
  "application/vnd.dolby.mobile.2": {
    source: "iana"
  },
  "application/vnd.doremir.scorecloud-binary-document": {
    source: "iana"
  },
  "application/vnd.dpgraph": {
    source: "iana",
    extensions: [
      "dpg"
    ]
  },
  "application/vnd.dreamfactory": {
    source: "iana",
    extensions: [
      "dfac"
    ]
  },
  "application/vnd.drive+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ds-keypoint": {
    source: "apache",
    extensions: [
      "kpxx"
    ]
  },
  "application/vnd.dtg.local": {
    source: "iana"
  },
  "application/vnd.dtg.local.flash": {
    source: "iana"
  },
  "application/vnd.dtg.local.html": {
    source: "iana"
  },
  "application/vnd.dvb.ait": {
    source: "iana",
    extensions: [
      "ait"
    ]
  },
  "application/vnd.dvb.dvbisl+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.dvbj": {
    source: "iana"
  },
  "application/vnd.dvb.esgcontainer": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcdftnotifaccess": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcesgaccess": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcesgaccess2": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcesgpdd": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcroaming": {
    source: "iana"
  },
  "application/vnd.dvb.iptv.alfec-base": {
    source: "iana"
  },
  "application/vnd.dvb.iptv.alfec-enhancement": {
    source: "iana"
  },
  "application/vnd.dvb.notif-aggregate-root+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-container+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-generic+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-ia-msglist+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-ia-registration-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-ia-registration-response+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-init+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.pfr": {
    source: "iana"
  },
  "application/vnd.dvb.service": {
    source: "iana",
    extensions: [
      "svc"
    ]
  },
  "application/vnd.dxr": {
    source: "iana"
  },
  "application/vnd.dynageo": {
    source: "iana",
    extensions: [
      "geo"
    ]
  },
  "application/vnd.dzr": {
    source: "iana"
  },
  "application/vnd.easykaraoke.cdgdownload": {
    source: "iana"
  },
  "application/vnd.ecdis-update": {
    source: "iana"
  },
  "application/vnd.ecip.rlp": {
    source: "iana"
  },
  "application/vnd.eclipse.ditto+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ecowin.chart": {
    source: "iana",
    extensions: [
      "mag"
    ]
  },
  "application/vnd.ecowin.filerequest": {
    source: "iana"
  },
  "application/vnd.ecowin.fileupdate": {
    source: "iana"
  },
  "application/vnd.ecowin.series": {
    source: "iana"
  },
  "application/vnd.ecowin.seriesrequest": {
    source: "iana"
  },
  "application/vnd.ecowin.seriesupdate": {
    source: "iana"
  },
  "application/vnd.efi.img": {
    source: "iana"
  },
  "application/vnd.efi.iso": {
    source: "iana"
  },
  "application/vnd.emclient.accessrequest+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.enliven": {
    source: "iana",
    extensions: [
      "nml"
    ]
  },
  "application/vnd.enphase.envoy": {
    source: "iana"
  },
  "application/vnd.eprints.data+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.epson.esf": {
    source: "iana",
    extensions: [
      "esf"
    ]
  },
  "application/vnd.epson.msf": {
    source: "iana",
    extensions: [
      "msf"
    ]
  },
  "application/vnd.epson.quickanime": {
    source: "iana",
    extensions: [
      "qam"
    ]
  },
  "application/vnd.epson.salt": {
    source: "iana",
    extensions: [
      "slt"
    ]
  },
  "application/vnd.epson.ssf": {
    source: "iana",
    extensions: [
      "ssf"
    ]
  },
  "application/vnd.ericsson.quickcall": {
    source: "iana"
  },
  "application/vnd.espass-espass+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.eszigno3+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "es3",
      "et3"
    ]
  },
  "application/vnd.etsi.aoc+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.asic-e+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.etsi.asic-s+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.etsi.cug+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvcommand+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvdiscovery+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvprofile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvsad-bc+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvsad-cod+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvsad-npvr+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvservice+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvsync+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvueprofile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.mcid+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.mheg5": {
    source: "iana"
  },
  "application/vnd.etsi.overload-control-policy-dataset+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.pstn+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.sci+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.simservs+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.timestamp-token": {
    source: "iana"
  },
  "application/vnd.etsi.tsl+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.tsl.der": {
    source: "iana"
  },
  "application/vnd.eu.kasparian.car+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.eudora.data": {
    source: "iana"
  },
  "application/vnd.evolv.ecig.profile": {
    source: "iana"
  },
  "application/vnd.evolv.ecig.settings": {
    source: "iana"
  },
  "application/vnd.evolv.ecig.theme": {
    source: "iana"
  },
  "application/vnd.exstream-empower+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.exstream-package": {
    source: "iana"
  },
  "application/vnd.ezpix-album": {
    source: "iana",
    extensions: [
      "ez2"
    ]
  },
  "application/vnd.ezpix-package": {
    source: "iana",
    extensions: [
      "ez3"
    ]
  },
  "application/vnd.f-secure.mobile": {
    source: "iana"
  },
  "application/vnd.familysearch.gedcom+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.fastcopy-disk-image": {
    source: "iana"
  },
  "application/vnd.fdf": {
    source: "iana",
    extensions: [
      "fdf"
    ]
  },
  "application/vnd.fdsn.mseed": {
    source: "iana",
    extensions: [
      "mseed"
    ]
  },
  "application/vnd.fdsn.seed": {
    source: "iana",
    extensions: [
      "seed",
      "dataless"
    ]
  },
  "application/vnd.ffsns": {
    source: "iana"
  },
  "application/vnd.ficlab.flb+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.filmit.zfc": {
    source: "iana"
  },
  "application/vnd.fints": {
    source: "iana"
  },
  "application/vnd.firemonkeys.cloudcell": {
    source: "iana"
  },
  "application/vnd.flographit": {
    source: "iana",
    extensions: [
      "gph"
    ]
  },
  "application/vnd.fluxtime.clip": {
    source: "iana",
    extensions: [
      "ftc"
    ]
  },
  "application/vnd.font-fontforge-sfd": {
    source: "iana"
  },
  "application/vnd.framemaker": {
    source: "iana",
    extensions: [
      "fm",
      "frame",
      "maker",
      "book"
    ]
  },
  "application/vnd.frogans.fnc": {
    source: "iana",
    extensions: [
      "fnc"
    ]
  },
  "application/vnd.frogans.ltf": {
    source: "iana",
    extensions: [
      "ltf"
    ]
  },
  "application/vnd.fsc.weblaunch": {
    source: "iana",
    extensions: [
      "fsc"
    ]
  },
  "application/vnd.fujifilm.fb.docuworks": {
    source: "iana"
  },
  "application/vnd.fujifilm.fb.docuworks.binder": {
    source: "iana"
  },
  "application/vnd.fujifilm.fb.docuworks.container": {
    source: "iana"
  },
  "application/vnd.fujifilm.fb.jfi+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.fujitsu.oasys": {
    source: "iana",
    extensions: [
      "oas"
    ]
  },
  "application/vnd.fujitsu.oasys2": {
    source: "iana",
    extensions: [
      "oa2"
    ]
  },
  "application/vnd.fujitsu.oasys3": {
    source: "iana",
    extensions: [
      "oa3"
    ]
  },
  "application/vnd.fujitsu.oasysgp": {
    source: "iana",
    extensions: [
      "fg5"
    ]
  },
  "application/vnd.fujitsu.oasysprs": {
    source: "iana",
    extensions: [
      "bh2"
    ]
  },
  "application/vnd.fujixerox.art-ex": {
    source: "iana"
  },
  "application/vnd.fujixerox.art4": {
    source: "iana"
  },
  "application/vnd.fujixerox.ddd": {
    source: "iana",
    extensions: [
      "ddd"
    ]
  },
  "application/vnd.fujixerox.docuworks": {
    source: "iana",
    extensions: [
      "xdw"
    ]
  },
  "application/vnd.fujixerox.docuworks.binder": {
    source: "iana",
    extensions: [
      "xbd"
    ]
  },
  "application/vnd.fujixerox.docuworks.container": {
    source: "iana"
  },
  "application/vnd.fujixerox.hbpl": {
    source: "iana"
  },
  "application/vnd.fut-misnet": {
    source: "iana"
  },
  "application/vnd.futoin+cbor": {
    source: "iana"
  },
  "application/vnd.futoin+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.fuzzysheet": {
    source: "iana",
    extensions: [
      "fzs"
    ]
  },
  "application/vnd.genomatix.tuxedo": {
    source: "iana",
    extensions: [
      "txd"
    ]
  },
  "application/vnd.gentics.grd+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.geo+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.geocube+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.geogebra.file": {
    source: "iana",
    extensions: [
      "ggb"
    ]
  },
  "application/vnd.geogebra.slides": {
    source: "iana"
  },
  "application/vnd.geogebra.tool": {
    source: "iana",
    extensions: [
      "ggt"
    ]
  },
  "application/vnd.geometry-explorer": {
    source: "iana",
    extensions: [
      "gex",
      "gre"
    ]
  },
  "application/vnd.geonext": {
    source: "iana",
    extensions: [
      "gxt"
    ]
  },
  "application/vnd.geoplan": {
    source: "iana",
    extensions: [
      "g2w"
    ]
  },
  "application/vnd.geospace": {
    source: "iana",
    extensions: [
      "g3w"
    ]
  },
  "application/vnd.gerber": {
    source: "iana"
  },
  "application/vnd.globalplatform.card-content-mgt": {
    source: "iana"
  },
  "application/vnd.globalplatform.card-content-mgt-response": {
    source: "iana"
  },
  "application/vnd.gmx": {
    source: "iana",
    extensions: [
      "gmx"
    ]
  },
  "application/vnd.google-apps.document": {
    compressible: !1,
    extensions: [
      "gdoc"
    ]
  },
  "application/vnd.google-apps.presentation": {
    compressible: !1,
    extensions: [
      "gslides"
    ]
  },
  "application/vnd.google-apps.spreadsheet": {
    compressible: !1,
    extensions: [
      "gsheet"
    ]
  },
  "application/vnd.google-earth.kml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "kml"
    ]
  },
  "application/vnd.google-earth.kmz": {
    source: "iana",
    compressible: !1,
    extensions: [
      "kmz"
    ]
  },
  "application/vnd.gov.sk.e-form+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.gov.sk.e-form+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.gov.sk.xmldatacontainer+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.grafeq": {
    source: "iana",
    extensions: [
      "gqf",
      "gqs"
    ]
  },
  "application/vnd.gridmp": {
    source: "iana"
  },
  "application/vnd.groove-account": {
    source: "iana",
    extensions: [
      "gac"
    ]
  },
  "application/vnd.groove-help": {
    source: "iana",
    extensions: [
      "ghf"
    ]
  },
  "application/vnd.groove-identity-message": {
    source: "iana",
    extensions: [
      "gim"
    ]
  },
  "application/vnd.groove-injector": {
    source: "iana",
    extensions: [
      "grv"
    ]
  },
  "application/vnd.groove-tool-message": {
    source: "iana",
    extensions: [
      "gtm"
    ]
  },
  "application/vnd.groove-tool-template": {
    source: "iana",
    extensions: [
      "tpl"
    ]
  },
  "application/vnd.groove-vcard": {
    source: "iana",
    extensions: [
      "vcg"
    ]
  },
  "application/vnd.hal+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hal+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "hal"
    ]
  },
  "application/vnd.handheld-entertainment+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "zmm"
    ]
  },
  "application/vnd.hbci": {
    source: "iana",
    extensions: [
      "hbci"
    ]
  },
  "application/vnd.hc+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hcl-bireports": {
    source: "iana"
  },
  "application/vnd.hdt": {
    source: "iana"
  },
  "application/vnd.heroku+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hhe.lesson-player": {
    source: "iana",
    extensions: [
      "les"
    ]
  },
  "application/vnd.hl7cda+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.hl7v2+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.hp-hpgl": {
    source: "iana",
    extensions: [
      "hpgl"
    ]
  },
  "application/vnd.hp-hpid": {
    source: "iana",
    extensions: [
      "hpid"
    ]
  },
  "application/vnd.hp-hps": {
    source: "iana",
    extensions: [
      "hps"
    ]
  },
  "application/vnd.hp-jlyt": {
    source: "iana",
    extensions: [
      "jlt"
    ]
  },
  "application/vnd.hp-pcl": {
    source: "iana",
    extensions: [
      "pcl"
    ]
  },
  "application/vnd.hp-pclxl": {
    source: "iana",
    extensions: [
      "pclxl"
    ]
  },
  "application/vnd.httphone": {
    source: "iana"
  },
  "application/vnd.hydrostatix.sof-data": {
    source: "iana",
    extensions: [
      "sfd-hdstx"
    ]
  },
  "application/vnd.hyper+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hyper-item+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hyperdrive+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hzn-3d-crossword": {
    source: "iana"
  },
  "application/vnd.ibm.afplinedata": {
    source: "iana"
  },
  "application/vnd.ibm.electronic-media": {
    source: "iana"
  },
  "application/vnd.ibm.minipay": {
    source: "iana",
    extensions: [
      "mpy"
    ]
  },
  "application/vnd.ibm.modcap": {
    source: "iana",
    extensions: [
      "afp",
      "listafp",
      "list3820"
    ]
  },
  "application/vnd.ibm.rights-management": {
    source: "iana",
    extensions: [
      "irm"
    ]
  },
  "application/vnd.ibm.secure-container": {
    source: "iana",
    extensions: [
      "sc"
    ]
  },
  "application/vnd.iccprofile": {
    source: "iana",
    extensions: [
      "icc",
      "icm"
    ]
  },
  "application/vnd.ieee.1905": {
    source: "iana"
  },
  "application/vnd.igloader": {
    source: "iana",
    extensions: [
      "igl"
    ]
  },
  "application/vnd.imagemeter.folder+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.imagemeter.image+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.immervision-ivp": {
    source: "iana",
    extensions: [
      "ivp"
    ]
  },
  "application/vnd.immervision-ivu": {
    source: "iana",
    extensions: [
      "ivu"
    ]
  },
  "application/vnd.ims.imsccv1p1": {
    source: "iana"
  },
  "application/vnd.ims.imsccv1p2": {
    source: "iana"
  },
  "application/vnd.ims.imsccv1p3": {
    source: "iana"
  },
  "application/vnd.ims.lis.v2.result+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ims.lti.v2.toolconsumerprofile+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ims.lti.v2.toolproxy+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ims.lti.v2.toolproxy.id+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ims.lti.v2.toolsettings+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ims.lti.v2.toolsettings.simple+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.informedcontrol.rms+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.informix-visionary": {
    source: "iana"
  },
  "application/vnd.infotech.project": {
    source: "iana"
  },
  "application/vnd.infotech.project+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.innopath.wamp.notification": {
    source: "iana"
  },
  "application/vnd.insors.igm": {
    source: "iana",
    extensions: [
      "igm"
    ]
  },
  "application/vnd.intercon.formnet": {
    source: "iana",
    extensions: [
      "xpw",
      "xpx"
    ]
  },
  "application/vnd.intergeo": {
    source: "iana",
    extensions: [
      "i2g"
    ]
  },
  "application/vnd.intertrust.digibox": {
    source: "iana"
  },
  "application/vnd.intertrust.nncp": {
    source: "iana"
  },
  "application/vnd.intu.qbo": {
    source: "iana",
    extensions: [
      "qbo"
    ]
  },
  "application/vnd.intu.qfx": {
    source: "iana",
    extensions: [
      "qfx"
    ]
  },
  "application/vnd.iptc.g2.catalogitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.conceptitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.knowledgeitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.newsitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.newsmessage+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.packageitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.planningitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ipunplugged.rcprofile": {
    source: "iana",
    extensions: [
      "rcprofile"
    ]
  },
  "application/vnd.irepository.package+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "irp"
    ]
  },
  "application/vnd.is-xpr": {
    source: "iana",
    extensions: [
      "xpr"
    ]
  },
  "application/vnd.isac.fcs": {
    source: "iana",
    extensions: [
      "fcs"
    ]
  },
  "application/vnd.iso11783-10+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.jam": {
    source: "iana",
    extensions: [
      "jam"
    ]
  },
  "application/vnd.japannet-directory-service": {
    source: "iana"
  },
  "application/vnd.japannet-jpnstore-wakeup": {
    source: "iana"
  },
  "application/vnd.japannet-payment-wakeup": {
    source: "iana"
  },
  "application/vnd.japannet-registration": {
    source: "iana"
  },
  "application/vnd.japannet-registration-wakeup": {
    source: "iana"
  },
  "application/vnd.japannet-setstore-wakeup": {
    source: "iana"
  },
  "application/vnd.japannet-verification": {
    source: "iana"
  },
  "application/vnd.japannet-verification-wakeup": {
    source: "iana"
  },
  "application/vnd.jcp.javame.midlet-rms": {
    source: "iana",
    extensions: [
      "rms"
    ]
  },
  "application/vnd.jisp": {
    source: "iana",
    extensions: [
      "jisp"
    ]
  },
  "application/vnd.joost.joda-archive": {
    source: "iana",
    extensions: [
      "joda"
    ]
  },
  "application/vnd.jsk.isdn-ngn": {
    source: "iana"
  },
  "application/vnd.kahootz": {
    source: "iana",
    extensions: [
      "ktz",
      "ktr"
    ]
  },
  "application/vnd.kde.karbon": {
    source: "iana",
    extensions: [
      "karbon"
    ]
  },
  "application/vnd.kde.kchart": {
    source: "iana",
    extensions: [
      "chrt"
    ]
  },
  "application/vnd.kde.kformula": {
    source: "iana",
    extensions: [
      "kfo"
    ]
  },
  "application/vnd.kde.kivio": {
    source: "iana",
    extensions: [
      "flw"
    ]
  },
  "application/vnd.kde.kontour": {
    source: "iana",
    extensions: [
      "kon"
    ]
  },
  "application/vnd.kde.kpresenter": {
    source: "iana",
    extensions: [
      "kpr",
      "kpt"
    ]
  },
  "application/vnd.kde.kspread": {
    source: "iana",
    extensions: [
      "ksp"
    ]
  },
  "application/vnd.kde.kword": {
    source: "iana",
    extensions: [
      "kwd",
      "kwt"
    ]
  },
  "application/vnd.kenameaapp": {
    source: "iana",
    extensions: [
      "htke"
    ]
  },
  "application/vnd.kidspiration": {
    source: "iana",
    extensions: [
      "kia"
    ]
  },
  "application/vnd.kinar": {
    source: "iana",
    extensions: [
      "kne",
      "knp"
    ]
  },
  "application/vnd.koan": {
    source: "iana",
    extensions: [
      "skp",
      "skd",
      "skt",
      "skm"
    ]
  },
  "application/vnd.kodak-descriptor": {
    source: "iana",
    extensions: [
      "sse"
    ]
  },
  "application/vnd.las": {
    source: "iana"
  },
  "application/vnd.las.las+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.las.las+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "lasxml"
    ]
  },
  "application/vnd.laszip": {
    source: "iana"
  },
  "application/vnd.leap+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.liberty-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.llamagraphics.life-balance.desktop": {
    source: "iana",
    extensions: [
      "lbd"
    ]
  },
  "application/vnd.llamagraphics.life-balance.exchange+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "lbe"
    ]
  },
  "application/vnd.logipipe.circuit+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.loom": {
    source: "iana"
  },
  "application/vnd.lotus-1-2-3": {
    source: "iana",
    extensions: [
      "123"
    ]
  },
  "application/vnd.lotus-approach": {
    source: "iana",
    extensions: [
      "apr"
    ]
  },
  "application/vnd.lotus-freelance": {
    source: "iana",
    extensions: [
      "pre"
    ]
  },
  "application/vnd.lotus-notes": {
    source: "iana",
    extensions: [
      "nsf"
    ]
  },
  "application/vnd.lotus-organizer": {
    source: "iana",
    extensions: [
      "org"
    ]
  },
  "application/vnd.lotus-screencam": {
    source: "iana",
    extensions: [
      "scm"
    ]
  },
  "application/vnd.lotus-wordpro": {
    source: "iana",
    extensions: [
      "lwp"
    ]
  },
  "application/vnd.macports.portpkg": {
    source: "iana",
    extensions: [
      "portpkg"
    ]
  },
  "application/vnd.mapbox-vector-tile": {
    source: "iana",
    extensions: [
      "mvt"
    ]
  },
  "application/vnd.marlin.drm.actiontoken+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.marlin.drm.conftoken+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.marlin.drm.license+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.marlin.drm.mdcf": {
    source: "iana"
  },
  "application/vnd.mason+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.maxar.archive.3tz+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.maxmind.maxmind-db": {
    source: "iana"
  },
  "application/vnd.mcd": {
    source: "iana",
    extensions: [
      "mcd"
    ]
  },
  "application/vnd.medcalcdata": {
    source: "iana",
    extensions: [
      "mc1"
    ]
  },
  "application/vnd.mediastation.cdkey": {
    source: "iana",
    extensions: [
      "cdkey"
    ]
  },
  "application/vnd.meridian-slingshot": {
    source: "iana"
  },
  "application/vnd.mfer": {
    source: "iana",
    extensions: [
      "mwf"
    ]
  },
  "application/vnd.mfmp": {
    source: "iana",
    extensions: [
      "mfm"
    ]
  },
  "application/vnd.micro+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.micrografx.flo": {
    source: "iana",
    extensions: [
      "flo"
    ]
  },
  "application/vnd.micrografx.igx": {
    source: "iana",
    extensions: [
      "igx"
    ]
  },
  "application/vnd.microsoft.portable-executable": {
    source: "iana"
  },
  "application/vnd.microsoft.windows.thumbnail-cache": {
    source: "iana"
  },
  "application/vnd.miele+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.mif": {
    source: "iana",
    extensions: [
      "mif"
    ]
  },
  "application/vnd.minisoft-hp3000-save": {
    source: "iana"
  },
  "application/vnd.mitsubishi.misty-guard.trustweb": {
    source: "iana"
  },
  "application/vnd.mobius.daf": {
    source: "iana",
    extensions: [
      "daf"
    ]
  },
  "application/vnd.mobius.dis": {
    source: "iana",
    extensions: [
      "dis"
    ]
  },
  "application/vnd.mobius.mbk": {
    source: "iana",
    extensions: [
      "mbk"
    ]
  },
  "application/vnd.mobius.mqy": {
    source: "iana",
    extensions: [
      "mqy"
    ]
  },
  "application/vnd.mobius.msl": {
    source: "iana",
    extensions: [
      "msl"
    ]
  },
  "application/vnd.mobius.plc": {
    source: "iana",
    extensions: [
      "plc"
    ]
  },
  "application/vnd.mobius.txf": {
    source: "iana",
    extensions: [
      "txf"
    ]
  },
  "application/vnd.mophun.application": {
    source: "iana",
    extensions: [
      "mpn"
    ]
  },
  "application/vnd.mophun.certificate": {
    source: "iana",
    extensions: [
      "mpc"
    ]
  },
  "application/vnd.motorola.flexsuite": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.adsi": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.fis": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.gotap": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.kmr": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.ttc": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.wem": {
    source: "iana"
  },
  "application/vnd.motorola.iprm": {
    source: "iana"
  },
  "application/vnd.mozilla.xul+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xul"
    ]
  },
  "application/vnd.ms-3mfdocument": {
    source: "iana"
  },
  "application/vnd.ms-artgalry": {
    source: "iana",
    extensions: [
      "cil"
    ]
  },
  "application/vnd.ms-asf": {
    source: "iana"
  },
  "application/vnd.ms-cab-compressed": {
    source: "iana",
    extensions: [
      "cab"
    ]
  },
  "application/vnd.ms-color.iccprofile": {
    source: "apache"
  },
  "application/vnd.ms-excel": {
    source: "iana",
    compressible: !1,
    extensions: [
      "xls",
      "xlm",
      "xla",
      "xlc",
      "xlt",
      "xlw"
    ]
  },
  "application/vnd.ms-excel.addin.macroenabled.12": {
    source: "iana",
    extensions: [
      "xlam"
    ]
  },
  "application/vnd.ms-excel.sheet.binary.macroenabled.12": {
    source: "iana",
    extensions: [
      "xlsb"
    ]
  },
  "application/vnd.ms-excel.sheet.macroenabled.12": {
    source: "iana",
    extensions: [
      "xlsm"
    ]
  },
  "application/vnd.ms-excel.template.macroenabled.12": {
    source: "iana",
    extensions: [
      "xltm"
    ]
  },
  "application/vnd.ms-fontobject": {
    source: "iana",
    compressible: !0,
    extensions: [
      "eot"
    ]
  },
  "application/vnd.ms-htmlhelp": {
    source: "iana",
    extensions: [
      "chm"
    ]
  },
  "application/vnd.ms-ims": {
    source: "iana",
    extensions: [
      "ims"
    ]
  },
  "application/vnd.ms-lrm": {
    source: "iana",
    extensions: [
      "lrm"
    ]
  },
  "application/vnd.ms-office.activex+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ms-officetheme": {
    source: "iana",
    extensions: [
      "thmx"
    ]
  },
  "application/vnd.ms-opentype": {
    source: "apache",
    compressible: !0
  },
  "application/vnd.ms-outlook": {
    compressible: !1,
    extensions: [
      "msg"
    ]
  },
  "application/vnd.ms-package.obfuscated-opentype": {
    source: "apache"
  },
  "application/vnd.ms-pki.seccat": {
    source: "apache",
    extensions: [
      "cat"
    ]
  },
  "application/vnd.ms-pki.stl": {
    source: "apache",
    extensions: [
      "stl"
    ]
  },
  "application/vnd.ms-playready.initiator+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ms-powerpoint": {
    source: "iana",
    compressible: !1,
    extensions: [
      "ppt",
      "pps",
      "pot"
    ]
  },
  "application/vnd.ms-powerpoint.addin.macroenabled.12": {
    source: "iana",
    extensions: [
      "ppam"
    ]
  },
  "application/vnd.ms-powerpoint.presentation.macroenabled.12": {
    source: "iana",
    extensions: [
      "pptm"
    ]
  },
  "application/vnd.ms-powerpoint.slide.macroenabled.12": {
    source: "iana",
    extensions: [
      "sldm"
    ]
  },
  "application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
    source: "iana",
    extensions: [
      "ppsm"
    ]
  },
  "application/vnd.ms-powerpoint.template.macroenabled.12": {
    source: "iana",
    extensions: [
      "potm"
    ]
  },
  "application/vnd.ms-printdevicecapabilities+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ms-printing.printticket+xml": {
    source: "apache",
    compressible: !0
  },
  "application/vnd.ms-printschematicket+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ms-project": {
    source: "iana",
    extensions: [
      "mpp",
      "mpt"
    ]
  },
  "application/vnd.ms-tnef": {
    source: "iana"
  },
  "application/vnd.ms-windows.devicepairing": {
    source: "iana"
  },
  "application/vnd.ms-windows.nwprinting.oob": {
    source: "iana"
  },
  "application/vnd.ms-windows.printerpairing": {
    source: "iana"
  },
  "application/vnd.ms-windows.wsd.oob": {
    source: "iana"
  },
  "application/vnd.ms-wmdrm.lic-chlg-req": {
    source: "iana"
  },
  "application/vnd.ms-wmdrm.lic-resp": {
    source: "iana"
  },
  "application/vnd.ms-wmdrm.meter-chlg-req": {
    source: "iana"
  },
  "application/vnd.ms-wmdrm.meter-resp": {
    source: "iana"
  },
  "application/vnd.ms-word.document.macroenabled.12": {
    source: "iana",
    extensions: [
      "docm"
    ]
  },
  "application/vnd.ms-word.template.macroenabled.12": {
    source: "iana",
    extensions: [
      "dotm"
    ]
  },
  "application/vnd.ms-works": {
    source: "iana",
    extensions: [
      "wps",
      "wks",
      "wcm",
      "wdb"
    ]
  },
  "application/vnd.ms-wpl": {
    source: "iana",
    extensions: [
      "wpl"
    ]
  },
  "application/vnd.ms-xpsdocument": {
    source: "iana",
    compressible: !1,
    extensions: [
      "xps"
    ]
  },
  "application/vnd.msa-disk-image": {
    source: "iana"
  },
  "application/vnd.mseq": {
    source: "iana",
    extensions: [
      "mseq"
    ]
  },
  "application/vnd.msign": {
    source: "iana"
  },
  "application/vnd.multiad.creator": {
    source: "iana"
  },
  "application/vnd.multiad.creator.cif": {
    source: "iana"
  },
  "application/vnd.music-niff": {
    source: "iana"
  },
  "application/vnd.musician": {
    source: "iana",
    extensions: [
      "mus"
    ]
  },
  "application/vnd.muvee.style": {
    source: "iana",
    extensions: [
      "msty"
    ]
  },
  "application/vnd.mynfc": {
    source: "iana",
    extensions: [
      "taglet"
    ]
  },
  "application/vnd.nacamar.ybrid+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ncd.control": {
    source: "iana"
  },
  "application/vnd.ncd.reference": {
    source: "iana"
  },
  "application/vnd.nearst.inv+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nebumind.line": {
    source: "iana"
  },
  "application/vnd.nervana": {
    source: "iana"
  },
  "application/vnd.netfpx": {
    source: "iana"
  },
  "application/vnd.neurolanguage.nlu": {
    source: "iana",
    extensions: [
      "nlu"
    ]
  },
  "application/vnd.nimn": {
    source: "iana"
  },
  "application/vnd.nintendo.nitro.rom": {
    source: "iana"
  },
  "application/vnd.nintendo.snes.rom": {
    source: "iana"
  },
  "application/vnd.nitf": {
    source: "iana",
    extensions: [
      "ntf",
      "nitf"
    ]
  },
  "application/vnd.noblenet-directory": {
    source: "iana",
    extensions: [
      "nnd"
    ]
  },
  "application/vnd.noblenet-sealer": {
    source: "iana",
    extensions: [
      "nns"
    ]
  },
  "application/vnd.noblenet-web": {
    source: "iana",
    extensions: [
      "nnw"
    ]
  },
  "application/vnd.nokia.catalogs": {
    source: "iana"
  },
  "application/vnd.nokia.conml+wbxml": {
    source: "iana"
  },
  "application/vnd.nokia.conml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nokia.iptv.config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nokia.isds-radio-presets": {
    source: "iana"
  },
  "application/vnd.nokia.landmark+wbxml": {
    source: "iana"
  },
  "application/vnd.nokia.landmark+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nokia.landmarkcollection+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nokia.n-gage.ac+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ac"
    ]
  },
  "application/vnd.nokia.n-gage.data": {
    source: "iana",
    extensions: [
      "ngdat"
    ]
  },
  "application/vnd.nokia.n-gage.symbian.install": {
    source: "iana",
    extensions: [
      "n-gage"
    ]
  },
  "application/vnd.nokia.ncd": {
    source: "iana"
  },
  "application/vnd.nokia.pcd+wbxml": {
    source: "iana"
  },
  "application/vnd.nokia.pcd+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nokia.radio-preset": {
    source: "iana",
    extensions: [
      "rpst"
    ]
  },
  "application/vnd.nokia.radio-presets": {
    source: "iana",
    extensions: [
      "rpss"
    ]
  },
  "application/vnd.novadigm.edm": {
    source: "iana",
    extensions: [
      "edm"
    ]
  },
  "application/vnd.novadigm.edx": {
    source: "iana",
    extensions: [
      "edx"
    ]
  },
  "application/vnd.novadigm.ext": {
    source: "iana",
    extensions: [
      "ext"
    ]
  },
  "application/vnd.ntt-local.content-share": {
    source: "iana"
  },
  "application/vnd.ntt-local.file-transfer": {
    source: "iana"
  },
  "application/vnd.ntt-local.ogw_remote-access": {
    source: "iana"
  },
  "application/vnd.ntt-local.sip-ta_remote": {
    source: "iana"
  },
  "application/vnd.ntt-local.sip-ta_tcp_stream": {
    source: "iana"
  },
  "application/vnd.oasis.opendocument.chart": {
    source: "iana",
    extensions: [
      "odc"
    ]
  },
  "application/vnd.oasis.opendocument.chart-template": {
    source: "iana",
    extensions: [
      "otc"
    ]
  },
  "application/vnd.oasis.opendocument.database": {
    source: "iana",
    extensions: [
      "odb"
    ]
  },
  "application/vnd.oasis.opendocument.formula": {
    source: "iana",
    extensions: [
      "odf"
    ]
  },
  "application/vnd.oasis.opendocument.formula-template": {
    source: "iana",
    extensions: [
      "odft"
    ]
  },
  "application/vnd.oasis.opendocument.graphics": {
    source: "iana",
    compressible: !1,
    extensions: [
      "odg"
    ]
  },
  "application/vnd.oasis.opendocument.graphics-template": {
    source: "iana",
    extensions: [
      "otg"
    ]
  },
  "application/vnd.oasis.opendocument.image": {
    source: "iana",
    extensions: [
      "odi"
    ]
  },
  "application/vnd.oasis.opendocument.image-template": {
    source: "iana",
    extensions: [
      "oti"
    ]
  },
  "application/vnd.oasis.opendocument.presentation": {
    source: "iana",
    compressible: !1,
    extensions: [
      "odp"
    ]
  },
  "application/vnd.oasis.opendocument.presentation-template": {
    source: "iana",
    extensions: [
      "otp"
    ]
  },
  "application/vnd.oasis.opendocument.spreadsheet": {
    source: "iana",
    compressible: !1,
    extensions: [
      "ods"
    ]
  },
  "application/vnd.oasis.opendocument.spreadsheet-template": {
    source: "iana",
    extensions: [
      "ots"
    ]
  },
  "application/vnd.oasis.opendocument.text": {
    source: "iana",
    compressible: !1,
    extensions: [
      "odt"
    ]
  },
  "application/vnd.oasis.opendocument.text-master": {
    source: "iana",
    extensions: [
      "odm"
    ]
  },
  "application/vnd.oasis.opendocument.text-template": {
    source: "iana",
    extensions: [
      "ott"
    ]
  },
  "application/vnd.oasis.opendocument.text-web": {
    source: "iana",
    extensions: [
      "oth"
    ]
  },
  "application/vnd.obn": {
    source: "iana"
  },
  "application/vnd.ocf+cbor": {
    source: "iana"
  },
  "application/vnd.oci.image.manifest.v1+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oftn.l10n+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.contentaccessdownload+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.contentaccessstreaming+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.cspg-hexbinary": {
    source: "iana"
  },
  "application/vnd.oipf.dae.svg+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.dae.xhtml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.mippvcontrolmessage+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.pae.gem": {
    source: "iana"
  },
  "application/vnd.oipf.spdiscovery+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.spdlist+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.ueprofile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.userprofile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.olpc-sugar": {
    source: "iana",
    extensions: [
      "xo"
    ]
  },
  "application/vnd.oma-scws-config": {
    source: "iana"
  },
  "application/vnd.oma-scws-http-request": {
    source: "iana"
  },
  "application/vnd.oma-scws-http-response": {
    source: "iana"
  },
  "application/vnd.oma.bcast.associated-procedure-parameter+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.drm-trigger+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.imd+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.ltkm": {
    source: "iana"
  },
  "application/vnd.oma.bcast.notification+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.provisioningtrigger": {
    source: "iana"
  },
  "application/vnd.oma.bcast.sgboot": {
    source: "iana"
  },
  "application/vnd.oma.bcast.sgdd+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.sgdu": {
    source: "iana"
  },
  "application/vnd.oma.bcast.simple-symbol-container": {
    source: "iana"
  },
  "application/vnd.oma.bcast.smartcard-trigger+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.sprov+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.stkm": {
    source: "iana"
  },
  "application/vnd.oma.cab-address-book+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.cab-feature-handler+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.cab-pcc+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.cab-subs-invite+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.cab-user-prefs+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.dcd": {
    source: "iana"
  },
  "application/vnd.oma.dcdc": {
    source: "iana"
  },
  "application/vnd.oma.dd2+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "dd2"
    ]
  },
  "application/vnd.oma.drm.risd+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.group-usage-list+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.lwm2m+cbor": {
    source: "iana"
  },
  "application/vnd.oma.lwm2m+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.lwm2m+tlv": {
    source: "iana"
  },
  "application/vnd.oma.pal+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.poc.detailed-progress-report+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.poc.final-report+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.poc.groups+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.poc.invocation-descriptor+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.poc.optimized-progress-report+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.push": {
    source: "iana"
  },
  "application/vnd.oma.scidm.messages+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.xcap-directory+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.omads-email+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.omads-file+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.omads-folder+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.omaloc-supl-init": {
    source: "iana"
  },
  "application/vnd.onepager": {
    source: "iana"
  },
  "application/vnd.onepagertamp": {
    source: "iana"
  },
  "application/vnd.onepagertamx": {
    source: "iana"
  },
  "application/vnd.onepagertat": {
    source: "iana"
  },
  "application/vnd.onepagertatp": {
    source: "iana"
  },
  "application/vnd.onepagertatx": {
    source: "iana"
  },
  "application/vnd.openblox.game+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "obgx"
    ]
  },
  "application/vnd.openblox.game-binary": {
    source: "iana"
  },
  "application/vnd.openeye.oeb": {
    source: "iana"
  },
  "application/vnd.openofficeorg.extension": {
    source: "apache",
    extensions: [
      "oxt"
    ]
  },
  "application/vnd.openstreetmap.data+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "osm"
    ]
  },
  "application/vnd.opentimestamps.ots": {
    source: "iana"
  },
  "application/vnd.openxmlformats-officedocument.custom-properties+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawing+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.extended-properties+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
    source: "iana",
    compressible: !1,
    extensions: [
      "pptx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slide": {
    source: "iana",
    extensions: [
      "sldx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
    source: "iana",
    extensions: [
      "ppsx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.template": {
    source: "iana",
    extensions: [
      "potx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
    source: "iana",
    compressible: !1,
    extensions: [
      "xlsx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
    source: "iana",
    extensions: [
      "xltx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.theme+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.themeoverride+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.vmldrawing": {
    source: "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
    source: "iana",
    compressible: !1,
    extensions: [
      "docx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
    source: "iana",
    extensions: [
      "dotx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-package.core-properties+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-package.relationships+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oracle.resource+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.orange.indata": {
    source: "iana"
  },
  "application/vnd.osa.netdeploy": {
    source: "iana"
  },
  "application/vnd.osgeo.mapguide.package": {
    source: "iana",
    extensions: [
      "mgp"
    ]
  },
  "application/vnd.osgi.bundle": {
    source: "iana"
  },
  "application/vnd.osgi.dp": {
    source: "iana",
    extensions: [
      "dp"
    ]
  },
  "application/vnd.osgi.subsystem": {
    source: "iana",
    extensions: [
      "esa"
    ]
  },
  "application/vnd.otps.ct-kip+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oxli.countgraph": {
    source: "iana"
  },
  "application/vnd.pagerduty+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.palm": {
    source: "iana",
    extensions: [
      "pdb",
      "pqa",
      "oprc"
    ]
  },
  "application/vnd.panoply": {
    source: "iana"
  },
  "application/vnd.paos.xml": {
    source: "iana"
  },
  "application/vnd.patentdive": {
    source: "iana"
  },
  "application/vnd.patientecommsdoc": {
    source: "iana"
  },
  "application/vnd.pawaafile": {
    source: "iana",
    extensions: [
      "paw"
    ]
  },
  "application/vnd.pcos": {
    source: "iana"
  },
  "application/vnd.pg.format": {
    source: "iana",
    extensions: [
      "str"
    ]
  },
  "application/vnd.pg.osasli": {
    source: "iana",
    extensions: [
      "ei6"
    ]
  },
  "application/vnd.piaccess.application-licence": {
    source: "iana"
  },
  "application/vnd.picsel": {
    source: "iana",
    extensions: [
      "efif"
    ]
  },
  "application/vnd.pmi.widget": {
    source: "iana",
    extensions: [
      "wg"
    ]
  },
  "application/vnd.poc.group-advertisement+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.pocketlearn": {
    source: "iana",
    extensions: [
      "plf"
    ]
  },
  "application/vnd.powerbuilder6": {
    source: "iana",
    extensions: [
      "pbd"
    ]
  },
  "application/vnd.powerbuilder6-s": {
    source: "iana"
  },
  "application/vnd.powerbuilder7": {
    source: "iana"
  },
  "application/vnd.powerbuilder7-s": {
    source: "iana"
  },
  "application/vnd.powerbuilder75": {
    source: "iana"
  },
  "application/vnd.powerbuilder75-s": {
    source: "iana"
  },
  "application/vnd.preminet": {
    source: "iana"
  },
  "application/vnd.previewsystems.box": {
    source: "iana",
    extensions: [
      "box"
    ]
  },
  "application/vnd.proteus.magazine": {
    source: "iana",
    extensions: [
      "mgz"
    ]
  },
  "application/vnd.psfs": {
    source: "iana"
  },
  "application/vnd.publishare-delta-tree": {
    source: "iana",
    extensions: [
      "qps"
    ]
  },
  "application/vnd.pvi.ptid1": {
    source: "iana",
    extensions: [
      "ptid"
    ]
  },
  "application/vnd.pwg-multiplexed": {
    source: "iana"
  },
  "application/vnd.pwg-xhtml-print+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.qualcomm.brew-app-res": {
    source: "iana"
  },
  "application/vnd.quarantainenet": {
    source: "iana"
  },
  "application/vnd.quark.quarkxpress": {
    source: "iana",
    extensions: [
      "qxd",
      "qxt",
      "qwd",
      "qwt",
      "qxl",
      "qxb"
    ]
  },
  "application/vnd.quobject-quoxdocument": {
    source: "iana"
  },
  "application/vnd.radisys.moml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-audit+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-audit-conf+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-audit-conn+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-audit-dialog+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-audit-stream+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-conf+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-base+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-fax-detect+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-group+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-speech+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-transform+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.rainstor.data": {
    source: "iana"
  },
  "application/vnd.rapid": {
    source: "iana"
  },
  "application/vnd.rar": {
    source: "iana",
    extensions: [
      "rar"
    ]
  },
  "application/vnd.realvnc.bed": {
    source: "iana",
    extensions: [
      "bed"
    ]
  },
  "application/vnd.recordare.musicxml": {
    source: "iana",
    extensions: [
      "mxl"
    ]
  },
  "application/vnd.recordare.musicxml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "musicxml"
    ]
  },
  "application/vnd.renlearn.rlprint": {
    source: "iana"
  },
  "application/vnd.resilient.logic": {
    source: "iana"
  },
  "application/vnd.restful+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.rig.cryptonote": {
    source: "iana",
    extensions: [
      "cryptonote"
    ]
  },
  "application/vnd.rim.cod": {
    source: "apache",
    extensions: [
      "cod"
    ]
  },
  "application/vnd.rn-realmedia": {
    source: "apache",
    extensions: [
      "rm"
    ]
  },
  "application/vnd.rn-realmedia-vbr": {
    source: "apache",
    extensions: [
      "rmvb"
    ]
  },
  "application/vnd.route66.link66+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "link66"
    ]
  },
  "application/vnd.rs-274x": {
    source: "iana"
  },
  "application/vnd.ruckus.download": {
    source: "iana"
  },
  "application/vnd.s3sms": {
    source: "iana"
  },
  "application/vnd.sailingtracker.track": {
    source: "iana",
    extensions: [
      "st"
    ]
  },
  "application/vnd.sar": {
    source: "iana"
  },
  "application/vnd.sbm.cid": {
    source: "iana"
  },
  "application/vnd.sbm.mid2": {
    source: "iana"
  },
  "application/vnd.scribus": {
    source: "iana"
  },
  "application/vnd.sealed.3df": {
    source: "iana"
  },
  "application/vnd.sealed.csf": {
    source: "iana"
  },
  "application/vnd.sealed.doc": {
    source: "iana"
  },
  "application/vnd.sealed.eml": {
    source: "iana"
  },
  "application/vnd.sealed.mht": {
    source: "iana"
  },
  "application/vnd.sealed.net": {
    source: "iana"
  },
  "application/vnd.sealed.ppt": {
    source: "iana"
  },
  "application/vnd.sealed.tiff": {
    source: "iana"
  },
  "application/vnd.sealed.xls": {
    source: "iana"
  },
  "application/vnd.sealedmedia.softseal.html": {
    source: "iana"
  },
  "application/vnd.sealedmedia.softseal.pdf": {
    source: "iana"
  },
  "application/vnd.seemail": {
    source: "iana",
    extensions: [
      "see"
    ]
  },
  "application/vnd.seis+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.sema": {
    source: "iana",
    extensions: [
      "sema"
    ]
  },
  "application/vnd.semd": {
    source: "iana",
    extensions: [
      "semd"
    ]
  },
  "application/vnd.semf": {
    source: "iana",
    extensions: [
      "semf"
    ]
  },
  "application/vnd.shade-save-file": {
    source: "iana"
  },
  "application/vnd.shana.informed.formdata": {
    source: "iana",
    extensions: [
      "ifm"
    ]
  },
  "application/vnd.shana.informed.formtemplate": {
    source: "iana",
    extensions: [
      "itp"
    ]
  },
  "application/vnd.shana.informed.interchange": {
    source: "iana",
    extensions: [
      "iif"
    ]
  },
  "application/vnd.shana.informed.package": {
    source: "iana",
    extensions: [
      "ipk"
    ]
  },
  "application/vnd.shootproof+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.shopkick+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.shp": {
    source: "iana"
  },
  "application/vnd.shx": {
    source: "iana"
  },
  "application/vnd.sigrok.session": {
    source: "iana"
  },
  "application/vnd.simtech-mindmapper": {
    source: "iana",
    extensions: [
      "twd",
      "twds"
    ]
  },
  "application/vnd.siren+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.smaf": {
    source: "iana",
    extensions: [
      "mmf"
    ]
  },
  "application/vnd.smart.notebook": {
    source: "iana"
  },
  "application/vnd.smart.teacher": {
    source: "iana",
    extensions: [
      "teacher"
    ]
  },
  "application/vnd.snesdev-page-table": {
    source: "iana"
  },
  "application/vnd.software602.filler.form+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "fo"
    ]
  },
  "application/vnd.software602.filler.form-xml-zip": {
    source: "iana"
  },
  "application/vnd.solent.sdkm+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "sdkm",
      "sdkd"
    ]
  },
  "application/vnd.spotfire.dxp": {
    source: "iana",
    extensions: [
      "dxp"
    ]
  },
  "application/vnd.spotfire.sfs": {
    source: "iana",
    extensions: [
      "sfs"
    ]
  },
  "application/vnd.sqlite3": {
    source: "iana"
  },
  "application/vnd.sss-cod": {
    source: "iana"
  },
  "application/vnd.sss-dtf": {
    source: "iana"
  },
  "application/vnd.sss-ntf": {
    source: "iana"
  },
  "application/vnd.stardivision.calc": {
    source: "apache",
    extensions: [
      "sdc"
    ]
  },
  "application/vnd.stardivision.draw": {
    source: "apache",
    extensions: [
      "sda"
    ]
  },
  "application/vnd.stardivision.impress": {
    source: "apache",
    extensions: [
      "sdd"
    ]
  },
  "application/vnd.stardivision.math": {
    source: "apache",
    extensions: [
      "smf"
    ]
  },
  "application/vnd.stardivision.writer": {
    source: "apache",
    extensions: [
      "sdw",
      "vor"
    ]
  },
  "application/vnd.stardivision.writer-global": {
    source: "apache",
    extensions: [
      "sgl"
    ]
  },
  "application/vnd.stepmania.package": {
    source: "iana",
    extensions: [
      "smzip"
    ]
  },
  "application/vnd.stepmania.stepchart": {
    source: "iana",
    extensions: [
      "sm"
    ]
  },
  "application/vnd.street-stream": {
    source: "iana"
  },
  "application/vnd.sun.wadl+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wadl"
    ]
  },
  "application/vnd.sun.xml.calc": {
    source: "apache",
    extensions: [
      "sxc"
    ]
  },
  "application/vnd.sun.xml.calc.template": {
    source: "apache",
    extensions: [
      "stc"
    ]
  },
  "application/vnd.sun.xml.draw": {
    source: "apache",
    extensions: [
      "sxd"
    ]
  },
  "application/vnd.sun.xml.draw.template": {
    source: "apache",
    extensions: [
      "std"
    ]
  },
  "application/vnd.sun.xml.impress": {
    source: "apache",
    extensions: [
      "sxi"
    ]
  },
  "application/vnd.sun.xml.impress.template": {
    source: "apache",
    extensions: [
      "sti"
    ]
  },
  "application/vnd.sun.xml.math": {
    source: "apache",
    extensions: [
      "sxm"
    ]
  },
  "application/vnd.sun.xml.writer": {
    source: "apache",
    extensions: [
      "sxw"
    ]
  },
  "application/vnd.sun.xml.writer.global": {
    source: "apache",
    extensions: [
      "sxg"
    ]
  },
  "application/vnd.sun.xml.writer.template": {
    source: "apache",
    extensions: [
      "stw"
    ]
  },
  "application/vnd.sus-calendar": {
    source: "iana",
    extensions: [
      "sus",
      "susp"
    ]
  },
  "application/vnd.svd": {
    source: "iana",
    extensions: [
      "svd"
    ]
  },
  "application/vnd.swiftview-ics": {
    source: "iana"
  },
  "application/vnd.sycle+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.syft+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.symbian.install": {
    source: "apache",
    extensions: [
      "sis",
      "sisx"
    ]
  },
  "application/vnd.syncml+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "xsm"
    ]
  },
  "application/vnd.syncml.dm+wbxml": {
    source: "iana",
    charset: "UTF-8",
    extensions: [
      "bdm"
    ]
  },
  "application/vnd.syncml.dm+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "xdm"
    ]
  },
  "application/vnd.syncml.dm.notification": {
    source: "iana"
  },
  "application/vnd.syncml.dmddf+wbxml": {
    source: "iana"
  },
  "application/vnd.syncml.dmddf+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "ddf"
    ]
  },
  "application/vnd.syncml.dmtnds+wbxml": {
    source: "iana"
  },
  "application/vnd.syncml.dmtnds+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.syncml.ds.notification": {
    source: "iana"
  },
  "application/vnd.tableschema+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.tao.intent-module-archive": {
    source: "iana",
    extensions: [
      "tao"
    ]
  },
  "application/vnd.tcpdump.pcap": {
    source: "iana",
    extensions: [
      "pcap",
      "cap",
      "dmp"
    ]
  },
  "application/vnd.think-cell.ppttc+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.tmd.mediaflex.api+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.tml": {
    source: "iana"
  },
  "application/vnd.tmobile-livetv": {
    source: "iana",
    extensions: [
      "tmo"
    ]
  },
  "application/vnd.tri.onesource": {
    source: "iana"
  },
  "application/vnd.trid.tpt": {
    source: "iana",
    extensions: [
      "tpt"
    ]
  },
  "application/vnd.triscape.mxs": {
    source: "iana",
    extensions: [
      "mxs"
    ]
  },
  "application/vnd.trueapp": {
    source: "iana",
    extensions: [
      "tra"
    ]
  },
  "application/vnd.truedoc": {
    source: "iana"
  },
  "application/vnd.ubisoft.webplayer": {
    source: "iana"
  },
  "application/vnd.ufdl": {
    source: "iana",
    extensions: [
      "ufd",
      "ufdl"
    ]
  },
  "application/vnd.uiq.theme": {
    source: "iana",
    extensions: [
      "utz"
    ]
  },
  "application/vnd.umajin": {
    source: "iana",
    extensions: [
      "umj"
    ]
  },
  "application/vnd.unity": {
    source: "iana",
    extensions: [
      "unityweb"
    ]
  },
  "application/vnd.uoml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "uoml"
    ]
  },
  "application/vnd.uplanet.alert": {
    source: "iana"
  },
  "application/vnd.uplanet.alert-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.bearer-choice": {
    source: "iana"
  },
  "application/vnd.uplanet.bearer-choice-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.cacheop": {
    source: "iana"
  },
  "application/vnd.uplanet.cacheop-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.channel": {
    source: "iana"
  },
  "application/vnd.uplanet.channel-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.list": {
    source: "iana"
  },
  "application/vnd.uplanet.list-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.listcmd": {
    source: "iana"
  },
  "application/vnd.uplanet.listcmd-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.signal": {
    source: "iana"
  },
  "application/vnd.uri-map": {
    source: "iana"
  },
  "application/vnd.valve.source.material": {
    source: "iana"
  },
  "application/vnd.vcx": {
    source: "iana",
    extensions: [
      "vcx"
    ]
  },
  "application/vnd.vd-study": {
    source: "iana"
  },
  "application/vnd.vectorworks": {
    source: "iana"
  },
  "application/vnd.vel+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.verimatrix.vcas": {
    source: "iana"
  },
  "application/vnd.veritone.aion+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.veryant.thin": {
    source: "iana"
  },
  "application/vnd.ves.encrypted": {
    source: "iana"
  },
  "application/vnd.vidsoft.vidconference": {
    source: "iana"
  },
  "application/vnd.visio": {
    source: "iana",
    extensions: [
      "vsd",
      "vst",
      "vss",
      "vsw"
    ]
  },
  "application/vnd.visionary": {
    source: "iana",
    extensions: [
      "vis"
    ]
  },
  "application/vnd.vividence.scriptfile": {
    source: "iana"
  },
  "application/vnd.vsf": {
    source: "iana",
    extensions: [
      "vsf"
    ]
  },
  "application/vnd.wap.sic": {
    source: "iana"
  },
  "application/vnd.wap.slc": {
    source: "iana"
  },
  "application/vnd.wap.wbxml": {
    source: "iana",
    charset: "UTF-8",
    extensions: [
      "wbxml"
    ]
  },
  "application/vnd.wap.wmlc": {
    source: "iana",
    extensions: [
      "wmlc"
    ]
  },
  "application/vnd.wap.wmlscriptc": {
    source: "iana",
    extensions: [
      "wmlsc"
    ]
  },
  "application/vnd.webturbo": {
    source: "iana",
    extensions: [
      "wtb"
    ]
  },
  "application/vnd.wfa.dpp": {
    source: "iana"
  },
  "application/vnd.wfa.p2p": {
    source: "iana"
  },
  "application/vnd.wfa.wsc": {
    source: "iana"
  },
  "application/vnd.windows.devicepairing": {
    source: "iana"
  },
  "application/vnd.wmc": {
    source: "iana"
  },
  "application/vnd.wmf.bootstrap": {
    source: "iana"
  },
  "application/vnd.wolfram.mathematica": {
    source: "iana"
  },
  "application/vnd.wolfram.mathematica.package": {
    source: "iana"
  },
  "application/vnd.wolfram.player": {
    source: "iana",
    extensions: [
      "nbp"
    ]
  },
  "application/vnd.wordperfect": {
    source: "iana",
    extensions: [
      "wpd"
    ]
  },
  "application/vnd.wqd": {
    source: "iana",
    extensions: [
      "wqd"
    ]
  },
  "application/vnd.wrq-hp3000-labelled": {
    source: "iana"
  },
  "application/vnd.wt.stf": {
    source: "iana",
    extensions: [
      "stf"
    ]
  },
  "application/vnd.wv.csp+wbxml": {
    source: "iana"
  },
  "application/vnd.wv.csp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.wv.ssp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.xacml+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.xara": {
    source: "iana",
    extensions: [
      "xar"
    ]
  },
  "application/vnd.xfdl": {
    source: "iana",
    extensions: [
      "xfdl"
    ]
  },
  "application/vnd.xfdl.webform": {
    source: "iana"
  },
  "application/vnd.xmi+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.xmpie.cpkg": {
    source: "iana"
  },
  "application/vnd.xmpie.dpkg": {
    source: "iana"
  },
  "application/vnd.xmpie.plan": {
    source: "iana"
  },
  "application/vnd.xmpie.ppkg": {
    source: "iana"
  },
  "application/vnd.xmpie.xlim": {
    source: "iana"
  },
  "application/vnd.yamaha.hv-dic": {
    source: "iana",
    extensions: [
      "hvd"
    ]
  },
  "application/vnd.yamaha.hv-script": {
    source: "iana",
    extensions: [
      "hvs"
    ]
  },
  "application/vnd.yamaha.hv-voice": {
    source: "iana",
    extensions: [
      "hvp"
    ]
  },
  "application/vnd.yamaha.openscoreformat": {
    source: "iana",
    extensions: [
      "osf"
    ]
  },
  "application/vnd.yamaha.openscoreformat.osfpvg+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "osfpvg"
    ]
  },
  "application/vnd.yamaha.remote-setup": {
    source: "iana"
  },
  "application/vnd.yamaha.smaf-audio": {
    source: "iana",
    extensions: [
      "saf"
    ]
  },
  "application/vnd.yamaha.smaf-phrase": {
    source: "iana",
    extensions: [
      "spf"
    ]
  },
  "application/vnd.yamaha.through-ngn": {
    source: "iana"
  },
  "application/vnd.yamaha.tunnel-udpencap": {
    source: "iana"
  },
  "application/vnd.yaoweme": {
    source: "iana"
  },
  "application/vnd.yellowriver-custom-menu": {
    source: "iana",
    extensions: [
      "cmp"
    ]
  },
  "application/vnd.youtube.yt": {
    source: "iana"
  },
  "application/vnd.zul": {
    source: "iana",
    extensions: [
      "zir",
      "zirz"
    ]
  },
  "application/vnd.zzazz.deck+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "zaz"
    ]
  },
  "application/voicexml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "vxml"
    ]
  },
  "application/voucher-cms+json": {
    source: "iana",
    compressible: !0
  },
  "application/vq-rtcpxr": {
    source: "iana"
  },
  "application/wasm": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wasm"
    ]
  },
  "application/watcherinfo+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wif"
    ]
  },
  "application/webpush-options+json": {
    source: "iana",
    compressible: !0
  },
  "application/whoispp-query": {
    source: "iana"
  },
  "application/whoispp-response": {
    source: "iana"
  },
  "application/widget": {
    source: "iana",
    extensions: [
      "wgt"
    ]
  },
  "application/winhlp": {
    source: "apache",
    extensions: [
      "hlp"
    ]
  },
  "application/wita": {
    source: "iana"
  },
  "application/wordperfect5.1": {
    source: "iana"
  },
  "application/wsdl+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wsdl"
    ]
  },
  "application/wspolicy+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wspolicy"
    ]
  },
  "application/x-7z-compressed": {
    source: "apache",
    compressible: !1,
    extensions: [
      "7z"
    ]
  },
  "application/x-abiword": {
    source: "apache",
    extensions: [
      "abw"
    ]
  },
  "application/x-ace-compressed": {
    source: "apache",
    extensions: [
      "ace"
    ]
  },
  "application/x-amf": {
    source: "apache"
  },
  "application/x-apple-diskimage": {
    source: "apache",
    extensions: [
      "dmg"
    ]
  },
  "application/x-arj": {
    compressible: !1,
    extensions: [
      "arj"
    ]
  },
  "application/x-authorware-bin": {
    source: "apache",
    extensions: [
      "aab",
      "x32",
      "u32",
      "vox"
    ]
  },
  "application/x-authorware-map": {
    source: "apache",
    extensions: [
      "aam"
    ]
  },
  "application/x-authorware-seg": {
    source: "apache",
    extensions: [
      "aas"
    ]
  },
  "application/x-bcpio": {
    source: "apache",
    extensions: [
      "bcpio"
    ]
  },
  "application/x-bdoc": {
    compressible: !1,
    extensions: [
      "bdoc"
    ]
  },
  "application/x-bittorrent": {
    source: "apache",
    extensions: [
      "torrent"
    ]
  },
  "application/x-blorb": {
    source: "apache",
    extensions: [
      "blb",
      "blorb"
    ]
  },
  "application/x-bzip": {
    source: "apache",
    compressible: !1,
    extensions: [
      "bz"
    ]
  },
  "application/x-bzip2": {
    source: "apache",
    compressible: !1,
    extensions: [
      "bz2",
      "boz"
    ]
  },
  "application/x-cbr": {
    source: "apache",
    extensions: [
      "cbr",
      "cba",
      "cbt",
      "cbz",
      "cb7"
    ]
  },
  "application/x-cdlink": {
    source: "apache",
    extensions: [
      "vcd"
    ]
  },
  "application/x-cfs-compressed": {
    source: "apache",
    extensions: [
      "cfs"
    ]
  },
  "application/x-chat": {
    source: "apache",
    extensions: [
      "chat"
    ]
  },
  "application/x-chess-pgn": {
    source: "apache",
    extensions: [
      "pgn"
    ]
  },
  "application/x-chrome-extension": {
    extensions: [
      "crx"
    ]
  },
  "application/x-cocoa": {
    source: "nginx",
    extensions: [
      "cco"
    ]
  },
  "application/x-compress": {
    source: "apache"
  },
  "application/x-conference": {
    source: "apache",
    extensions: [
      "nsc"
    ]
  },
  "application/x-cpio": {
    source: "apache",
    extensions: [
      "cpio"
    ]
  },
  "application/x-csh": {
    source: "apache",
    extensions: [
      "csh"
    ]
  },
  "application/x-deb": {
    compressible: !1
  },
  "application/x-debian-package": {
    source: "apache",
    extensions: [
      "deb",
      "udeb"
    ]
  },
  "application/x-dgc-compressed": {
    source: "apache",
    extensions: [
      "dgc"
    ]
  },
  "application/x-director": {
    source: "apache",
    extensions: [
      "dir",
      "dcr",
      "dxr",
      "cst",
      "cct",
      "cxt",
      "w3d",
      "fgd",
      "swa"
    ]
  },
  "application/x-doom": {
    source: "apache",
    extensions: [
      "wad"
    ]
  },
  "application/x-dtbncx+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "ncx"
    ]
  },
  "application/x-dtbook+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "dtb"
    ]
  },
  "application/x-dtbresource+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "res"
    ]
  },
  "application/x-dvi": {
    source: "apache",
    compressible: !1,
    extensions: [
      "dvi"
    ]
  },
  "application/x-envoy": {
    source: "apache",
    extensions: [
      "evy"
    ]
  },
  "application/x-eva": {
    source: "apache",
    extensions: [
      "eva"
    ]
  },
  "application/x-font-bdf": {
    source: "apache",
    extensions: [
      "bdf"
    ]
  },
  "application/x-font-dos": {
    source: "apache"
  },
  "application/x-font-framemaker": {
    source: "apache"
  },
  "application/x-font-ghostscript": {
    source: "apache",
    extensions: [
      "gsf"
    ]
  },
  "application/x-font-libgrx": {
    source: "apache"
  },
  "application/x-font-linux-psf": {
    source: "apache",
    extensions: [
      "psf"
    ]
  },
  "application/x-font-pcf": {
    source: "apache",
    extensions: [
      "pcf"
    ]
  },
  "application/x-font-snf": {
    source: "apache",
    extensions: [
      "snf"
    ]
  },
  "application/x-font-speedo": {
    source: "apache"
  },
  "application/x-font-sunos-news": {
    source: "apache"
  },
  "application/x-font-type1": {
    source: "apache",
    extensions: [
      "pfa",
      "pfb",
      "pfm",
      "afm"
    ]
  },
  "application/x-font-vfont": {
    source: "apache"
  },
  "application/x-freearc": {
    source: "apache",
    extensions: [
      "arc"
    ]
  },
  "application/x-futuresplash": {
    source: "apache",
    extensions: [
      "spl"
    ]
  },
  "application/x-gca-compressed": {
    source: "apache",
    extensions: [
      "gca"
    ]
  },
  "application/x-glulx": {
    source: "apache",
    extensions: [
      "ulx"
    ]
  },
  "application/x-gnumeric": {
    source: "apache",
    extensions: [
      "gnumeric"
    ]
  },
  "application/x-gramps-xml": {
    source: "apache",
    extensions: [
      "gramps"
    ]
  },
  "application/x-gtar": {
    source: "apache",
    extensions: [
      "gtar"
    ]
  },
  "application/x-gzip": {
    source: "apache"
  },
  "application/x-hdf": {
    source: "apache",
    extensions: [
      "hdf"
    ]
  },
  "application/x-httpd-php": {
    compressible: !0,
    extensions: [
      "php"
    ]
  },
  "application/x-install-instructions": {
    source: "apache",
    extensions: [
      "install"
    ]
  },
  "application/x-iso9660-image": {
    source: "apache",
    extensions: [
      "iso"
    ]
  },
  "application/x-iwork-keynote-sffkey": {
    extensions: [
      "key"
    ]
  },
  "application/x-iwork-numbers-sffnumbers": {
    extensions: [
      "numbers"
    ]
  },
  "application/x-iwork-pages-sffpages": {
    extensions: [
      "pages"
    ]
  },
  "application/x-java-archive-diff": {
    source: "nginx",
    extensions: [
      "jardiff"
    ]
  },
  "application/x-java-jnlp-file": {
    source: "apache",
    compressible: !1,
    extensions: [
      "jnlp"
    ]
  },
  "application/x-javascript": {
    compressible: !0
  },
  "application/x-keepass2": {
    extensions: [
      "kdbx"
    ]
  },
  "application/x-latex": {
    source: "apache",
    compressible: !1,
    extensions: [
      "latex"
    ]
  },
  "application/x-lua-bytecode": {
    extensions: [
      "luac"
    ]
  },
  "application/x-lzh-compressed": {
    source: "apache",
    extensions: [
      "lzh",
      "lha"
    ]
  },
  "application/x-makeself": {
    source: "nginx",
    extensions: [
      "run"
    ]
  },
  "application/x-mie": {
    source: "apache",
    extensions: [
      "mie"
    ]
  },
  "application/x-mobipocket-ebook": {
    source: "apache",
    extensions: [
      "prc",
      "mobi"
    ]
  },
  "application/x-mpegurl": {
    compressible: !1
  },
  "application/x-ms-application": {
    source: "apache",
    extensions: [
      "application"
    ]
  },
  "application/x-ms-shortcut": {
    source: "apache",
    extensions: [
      "lnk"
    ]
  },
  "application/x-ms-wmd": {
    source: "apache",
    extensions: [
      "wmd"
    ]
  },
  "application/x-ms-wmz": {
    source: "apache",
    extensions: [
      "wmz"
    ]
  },
  "application/x-ms-xbap": {
    source: "apache",
    extensions: [
      "xbap"
    ]
  },
  "application/x-msaccess": {
    source: "apache",
    extensions: [
      "mdb"
    ]
  },
  "application/x-msbinder": {
    source: "apache",
    extensions: [
      "obd"
    ]
  },
  "application/x-mscardfile": {
    source: "apache",
    extensions: [
      "crd"
    ]
  },
  "application/x-msclip": {
    source: "apache",
    extensions: [
      "clp"
    ]
  },
  "application/x-msdos-program": {
    extensions: [
      "exe"
    ]
  },
  "application/x-msdownload": {
    source: "apache",
    extensions: [
      "exe",
      "dll",
      "com",
      "bat",
      "msi"
    ]
  },
  "application/x-msmediaview": {
    source: "apache",
    extensions: [
      "mvb",
      "m13",
      "m14"
    ]
  },
  "application/x-msmetafile": {
    source: "apache",
    extensions: [
      "wmf",
      "wmz",
      "emf",
      "emz"
    ]
  },
  "application/x-msmoney": {
    source: "apache",
    extensions: [
      "mny"
    ]
  },
  "application/x-mspublisher": {
    source: "apache",
    extensions: [
      "pub"
    ]
  },
  "application/x-msschedule": {
    source: "apache",
    extensions: [
      "scd"
    ]
  },
  "application/x-msterminal": {
    source: "apache",
    extensions: [
      "trm"
    ]
  },
  "application/x-mswrite": {
    source: "apache",
    extensions: [
      "wri"
    ]
  },
  "application/x-netcdf": {
    source: "apache",
    extensions: [
      "nc",
      "cdf"
    ]
  },
  "application/x-ns-proxy-autoconfig": {
    compressible: !0,
    extensions: [
      "pac"
    ]
  },
  "application/x-nzb": {
    source: "apache",
    extensions: [
      "nzb"
    ]
  },
  "application/x-perl": {
    source: "nginx",
    extensions: [
      "pl",
      "pm"
    ]
  },
  "application/x-pilot": {
    source: "nginx",
    extensions: [
      "prc",
      "pdb"
    ]
  },
  "application/x-pkcs12": {
    source: "apache",
    compressible: !1,
    extensions: [
      "p12",
      "pfx"
    ]
  },
  "application/x-pkcs7-certificates": {
    source: "apache",
    extensions: [
      "p7b",
      "spc"
    ]
  },
  "application/x-pkcs7-certreqresp": {
    source: "apache",
    extensions: [
      "p7r"
    ]
  },
  "application/x-pki-message": {
    source: "iana"
  },
  "application/x-rar-compressed": {
    source: "apache",
    compressible: !1,
    extensions: [
      "rar"
    ]
  },
  "application/x-redhat-package-manager": {
    source: "nginx",
    extensions: [
      "rpm"
    ]
  },
  "application/x-research-info-systems": {
    source: "apache",
    extensions: [
      "ris"
    ]
  },
  "application/x-sea": {
    source: "nginx",
    extensions: [
      "sea"
    ]
  },
  "application/x-sh": {
    source: "apache",
    compressible: !0,
    extensions: [
      "sh"
    ]
  },
  "application/x-shar": {
    source: "apache",
    extensions: [
      "shar"
    ]
  },
  "application/x-shockwave-flash": {
    source: "apache",
    compressible: !1,
    extensions: [
      "swf"
    ]
  },
  "application/x-silverlight-app": {
    source: "apache",
    extensions: [
      "xap"
    ]
  },
  "application/x-sql": {
    source: "apache",
    extensions: [
      "sql"
    ]
  },
  "application/x-stuffit": {
    source: "apache",
    compressible: !1,
    extensions: [
      "sit"
    ]
  },
  "application/x-stuffitx": {
    source: "apache",
    extensions: [
      "sitx"
    ]
  },
  "application/x-subrip": {
    source: "apache",
    extensions: [
      "srt"
    ]
  },
  "application/x-sv4cpio": {
    source: "apache",
    extensions: [
      "sv4cpio"
    ]
  },
  "application/x-sv4crc": {
    source: "apache",
    extensions: [
      "sv4crc"
    ]
  },
  "application/x-t3vm-image": {
    source: "apache",
    extensions: [
      "t3"
    ]
  },
  "application/x-tads": {
    source: "apache",
    extensions: [
      "gam"
    ]
  },
  "application/x-tar": {
    source: "apache",
    compressible: !0,
    extensions: [
      "tar"
    ]
  },
  "application/x-tcl": {
    source: "apache",
    extensions: [
      "tcl",
      "tk"
    ]
  },
  "application/x-tex": {
    source: "apache",
    extensions: [
      "tex"
    ]
  },
  "application/x-tex-tfm": {
    source: "apache",
    extensions: [
      "tfm"
    ]
  },
  "application/x-texinfo": {
    source: "apache",
    extensions: [
      "texinfo",
      "texi"
    ]
  },
  "application/x-tgif": {
    source: "apache",
    extensions: [
      "obj"
    ]
  },
  "application/x-ustar": {
    source: "apache",
    extensions: [
      "ustar"
    ]
  },
  "application/x-virtualbox-hdd": {
    compressible: !0,
    extensions: [
      "hdd"
    ]
  },
  "application/x-virtualbox-ova": {
    compressible: !0,
    extensions: [
      "ova"
    ]
  },
  "application/x-virtualbox-ovf": {
    compressible: !0,
    extensions: [
      "ovf"
    ]
  },
  "application/x-virtualbox-vbox": {
    compressible: !0,
    extensions: [
      "vbox"
    ]
  },
  "application/x-virtualbox-vbox-extpack": {
    compressible: !1,
    extensions: [
      "vbox-extpack"
    ]
  },
  "application/x-virtualbox-vdi": {
    compressible: !0,
    extensions: [
      "vdi"
    ]
  },
  "application/x-virtualbox-vhd": {
    compressible: !0,
    extensions: [
      "vhd"
    ]
  },
  "application/x-virtualbox-vmdk": {
    compressible: !0,
    extensions: [
      "vmdk"
    ]
  },
  "application/x-wais-source": {
    source: "apache",
    extensions: [
      "src"
    ]
  },
  "application/x-web-app-manifest+json": {
    compressible: !0,
    extensions: [
      "webapp"
    ]
  },
  "application/x-www-form-urlencoded": {
    source: "iana",
    compressible: !0
  },
  "application/x-x509-ca-cert": {
    source: "iana",
    extensions: [
      "der",
      "crt",
      "pem"
    ]
  },
  "application/x-x509-ca-ra-cert": {
    source: "iana"
  },
  "application/x-x509-next-ca-cert": {
    source: "iana"
  },
  "application/x-xfig": {
    source: "apache",
    extensions: [
      "fig"
    ]
  },
  "application/x-xliff+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "xlf"
    ]
  },
  "application/x-xpinstall": {
    source: "apache",
    compressible: !1,
    extensions: [
      "xpi"
    ]
  },
  "application/x-xz": {
    source: "apache",
    extensions: [
      "xz"
    ]
  },
  "application/x-zmachine": {
    source: "apache",
    extensions: [
      "z1",
      "z2",
      "z3",
      "z4",
      "z5",
      "z6",
      "z7",
      "z8"
    ]
  },
  "application/x400-bp": {
    source: "iana"
  },
  "application/xacml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xaml+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "xaml"
    ]
  },
  "application/xcap-att+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xav"
    ]
  },
  "application/xcap-caps+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xca"
    ]
  },
  "application/xcap-diff+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xdf"
    ]
  },
  "application/xcap-el+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xel"
    ]
  },
  "application/xcap-error+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xcap-ns+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xns"
    ]
  },
  "application/xcon-conference-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xcon-conference-info-diff+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xenc+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xenc"
    ]
  },
  "application/xhtml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xhtml",
      "xht"
    ]
  },
  "application/xhtml-voice+xml": {
    source: "apache",
    compressible: !0
  },
  "application/xliff+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xlf"
    ]
  },
  "application/xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xml",
      "xsl",
      "xsd",
      "rng"
    ]
  },
  "application/xml-dtd": {
    source: "iana",
    compressible: !0,
    extensions: [
      "dtd"
    ]
  },
  "application/xml-external-parsed-entity": {
    source: "iana"
  },
  "application/xml-patch+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xmpp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xop+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xop"
    ]
  },
  "application/xproc+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "xpl"
    ]
  },
  "application/xslt+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xsl",
      "xslt"
    ]
  },
  "application/xspf+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "xspf"
    ]
  },
  "application/xv+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mxml",
      "xhvml",
      "xvml",
      "xvm"
    ]
  },
  "application/yang": {
    source: "iana",
    extensions: [
      "yang"
    ]
  },
  "application/yang-data+json": {
    source: "iana",
    compressible: !0
  },
  "application/yang-data+xml": {
    source: "iana",
    compressible: !0
  },
  "application/yang-patch+json": {
    source: "iana",
    compressible: !0
  },
  "application/yang-patch+xml": {
    source: "iana",
    compressible: !0
  },
  "application/yin+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "yin"
    ]
  },
  "application/zip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "zip"
    ]
  },
  "application/zlib": {
    source: "iana"
  },
  "application/zstd": {
    source: "iana"
  },
  "audio/1d-interleaved-parityfec": {
    source: "iana"
  },
  "audio/32kadpcm": {
    source: "iana"
  },
  "audio/3gpp": {
    source: "iana",
    compressible: !1,
    extensions: [
      "3gpp"
    ]
  },
  "audio/3gpp2": {
    source: "iana"
  },
  "audio/aac": {
    source: "iana"
  },
  "audio/ac3": {
    source: "iana"
  },
  "audio/adpcm": {
    source: "apache",
    extensions: [
      "adp"
    ]
  },
  "audio/amr": {
    source: "iana",
    extensions: [
      "amr"
    ]
  },
  "audio/amr-wb": {
    source: "iana"
  },
  "audio/amr-wb+": {
    source: "iana"
  },
  "audio/aptx": {
    source: "iana"
  },
  "audio/asc": {
    source: "iana"
  },
  "audio/atrac-advanced-lossless": {
    source: "iana"
  },
  "audio/atrac-x": {
    source: "iana"
  },
  "audio/atrac3": {
    source: "iana"
  },
  "audio/basic": {
    source: "iana",
    compressible: !1,
    extensions: [
      "au",
      "snd"
    ]
  },
  "audio/bv16": {
    source: "iana"
  },
  "audio/bv32": {
    source: "iana"
  },
  "audio/clearmode": {
    source: "iana"
  },
  "audio/cn": {
    source: "iana"
  },
  "audio/dat12": {
    source: "iana"
  },
  "audio/dls": {
    source: "iana"
  },
  "audio/dsr-es201108": {
    source: "iana"
  },
  "audio/dsr-es202050": {
    source: "iana"
  },
  "audio/dsr-es202211": {
    source: "iana"
  },
  "audio/dsr-es202212": {
    source: "iana"
  },
  "audio/dv": {
    source: "iana"
  },
  "audio/dvi4": {
    source: "iana"
  },
  "audio/eac3": {
    source: "iana"
  },
  "audio/encaprtp": {
    source: "iana"
  },
  "audio/evrc": {
    source: "iana"
  },
  "audio/evrc-qcp": {
    source: "iana"
  },
  "audio/evrc0": {
    source: "iana"
  },
  "audio/evrc1": {
    source: "iana"
  },
  "audio/evrcb": {
    source: "iana"
  },
  "audio/evrcb0": {
    source: "iana"
  },
  "audio/evrcb1": {
    source: "iana"
  },
  "audio/evrcnw": {
    source: "iana"
  },
  "audio/evrcnw0": {
    source: "iana"
  },
  "audio/evrcnw1": {
    source: "iana"
  },
  "audio/evrcwb": {
    source: "iana"
  },
  "audio/evrcwb0": {
    source: "iana"
  },
  "audio/evrcwb1": {
    source: "iana"
  },
  "audio/evs": {
    source: "iana"
  },
  "audio/flexfec": {
    source: "iana"
  },
  "audio/fwdred": {
    source: "iana"
  },
  "audio/g711-0": {
    source: "iana"
  },
  "audio/g719": {
    source: "iana"
  },
  "audio/g722": {
    source: "iana"
  },
  "audio/g7221": {
    source: "iana"
  },
  "audio/g723": {
    source: "iana"
  },
  "audio/g726-16": {
    source: "iana"
  },
  "audio/g726-24": {
    source: "iana"
  },
  "audio/g726-32": {
    source: "iana"
  },
  "audio/g726-40": {
    source: "iana"
  },
  "audio/g728": {
    source: "iana"
  },
  "audio/g729": {
    source: "iana"
  },
  "audio/g7291": {
    source: "iana"
  },
  "audio/g729d": {
    source: "iana"
  },
  "audio/g729e": {
    source: "iana"
  },
  "audio/gsm": {
    source: "iana"
  },
  "audio/gsm-efr": {
    source: "iana"
  },
  "audio/gsm-hr-08": {
    source: "iana"
  },
  "audio/ilbc": {
    source: "iana"
  },
  "audio/ip-mr_v2.5": {
    source: "iana"
  },
  "audio/isac": {
    source: "apache"
  },
  "audio/l16": {
    source: "iana"
  },
  "audio/l20": {
    source: "iana"
  },
  "audio/l24": {
    source: "iana",
    compressible: !1
  },
  "audio/l8": {
    source: "iana"
  },
  "audio/lpc": {
    source: "iana"
  },
  "audio/melp": {
    source: "iana"
  },
  "audio/melp1200": {
    source: "iana"
  },
  "audio/melp2400": {
    source: "iana"
  },
  "audio/melp600": {
    source: "iana"
  },
  "audio/mhas": {
    source: "iana"
  },
  "audio/midi": {
    source: "apache",
    extensions: [
      "mid",
      "midi",
      "kar",
      "rmi"
    ]
  },
  "audio/mobile-xmf": {
    source: "iana",
    extensions: [
      "mxmf"
    ]
  },
  "audio/mp3": {
    compressible: !1,
    extensions: [
      "mp3"
    ]
  },
  "audio/mp4": {
    source: "iana",
    compressible: !1,
    extensions: [
      "m4a",
      "mp4a"
    ]
  },
  "audio/mp4a-latm": {
    source: "iana"
  },
  "audio/mpa": {
    source: "iana"
  },
  "audio/mpa-robust": {
    source: "iana"
  },
  "audio/mpeg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "mpga",
      "mp2",
      "mp2a",
      "mp3",
      "m2a",
      "m3a"
    ]
  },
  "audio/mpeg4-generic": {
    source: "iana"
  },
  "audio/musepack": {
    source: "apache"
  },
  "audio/ogg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "oga",
      "ogg",
      "spx",
      "opus"
    ]
  },
  "audio/opus": {
    source: "iana"
  },
  "audio/parityfec": {
    source: "iana"
  },
  "audio/pcma": {
    source: "iana"
  },
  "audio/pcma-wb": {
    source: "iana"
  },
  "audio/pcmu": {
    source: "iana"
  },
  "audio/pcmu-wb": {
    source: "iana"
  },
  "audio/prs.sid": {
    source: "iana"
  },
  "audio/qcelp": {
    source: "iana"
  },
  "audio/raptorfec": {
    source: "iana"
  },
  "audio/red": {
    source: "iana"
  },
  "audio/rtp-enc-aescm128": {
    source: "iana"
  },
  "audio/rtp-midi": {
    source: "iana"
  },
  "audio/rtploopback": {
    source: "iana"
  },
  "audio/rtx": {
    source: "iana"
  },
  "audio/s3m": {
    source: "apache",
    extensions: [
      "s3m"
    ]
  },
  "audio/scip": {
    source: "iana"
  },
  "audio/silk": {
    source: "apache",
    extensions: [
      "sil"
    ]
  },
  "audio/smv": {
    source: "iana"
  },
  "audio/smv-qcp": {
    source: "iana"
  },
  "audio/smv0": {
    source: "iana"
  },
  "audio/sofa": {
    source: "iana"
  },
  "audio/sp-midi": {
    source: "iana"
  },
  "audio/speex": {
    source: "iana"
  },
  "audio/t140c": {
    source: "iana"
  },
  "audio/t38": {
    source: "iana"
  },
  "audio/telephone-event": {
    source: "iana"
  },
  "audio/tetra_acelp": {
    source: "iana"
  },
  "audio/tetra_acelp_bb": {
    source: "iana"
  },
  "audio/tone": {
    source: "iana"
  },
  "audio/tsvcis": {
    source: "iana"
  },
  "audio/uemclip": {
    source: "iana"
  },
  "audio/ulpfec": {
    source: "iana"
  },
  "audio/usac": {
    source: "iana"
  },
  "audio/vdvi": {
    source: "iana"
  },
  "audio/vmr-wb": {
    source: "iana"
  },
  "audio/vnd.3gpp.iufp": {
    source: "iana"
  },
  "audio/vnd.4sb": {
    source: "iana"
  },
  "audio/vnd.audiokoz": {
    source: "iana"
  },
  "audio/vnd.celp": {
    source: "iana"
  },
  "audio/vnd.cisco.nse": {
    source: "iana"
  },
  "audio/vnd.cmles.radio-events": {
    source: "iana"
  },
  "audio/vnd.cns.anp1": {
    source: "iana"
  },
  "audio/vnd.cns.inf1": {
    source: "iana"
  },
  "audio/vnd.dece.audio": {
    source: "iana",
    extensions: [
      "uva",
      "uvva"
    ]
  },
  "audio/vnd.digital-winds": {
    source: "iana",
    extensions: [
      "eol"
    ]
  },
  "audio/vnd.dlna.adts": {
    source: "iana"
  },
  "audio/vnd.dolby.heaac.1": {
    source: "iana"
  },
  "audio/vnd.dolby.heaac.2": {
    source: "iana"
  },
  "audio/vnd.dolby.mlp": {
    source: "iana"
  },
  "audio/vnd.dolby.mps": {
    source: "iana"
  },
  "audio/vnd.dolby.pl2": {
    source: "iana"
  },
  "audio/vnd.dolby.pl2x": {
    source: "iana"
  },
  "audio/vnd.dolby.pl2z": {
    source: "iana"
  },
  "audio/vnd.dolby.pulse.1": {
    source: "iana"
  },
  "audio/vnd.dra": {
    source: "iana",
    extensions: [
      "dra"
    ]
  },
  "audio/vnd.dts": {
    source: "iana",
    extensions: [
      "dts"
    ]
  },
  "audio/vnd.dts.hd": {
    source: "iana",
    extensions: [
      "dtshd"
    ]
  },
  "audio/vnd.dts.uhd": {
    source: "iana"
  },
  "audio/vnd.dvb.file": {
    source: "iana"
  },
  "audio/vnd.everad.plj": {
    source: "iana"
  },
  "audio/vnd.hns.audio": {
    source: "iana"
  },
  "audio/vnd.lucent.voice": {
    source: "iana",
    extensions: [
      "lvp"
    ]
  },
  "audio/vnd.ms-playready.media.pya": {
    source: "iana",
    extensions: [
      "pya"
    ]
  },
  "audio/vnd.nokia.mobile-xmf": {
    source: "iana"
  },
  "audio/vnd.nortel.vbk": {
    source: "iana"
  },
  "audio/vnd.nuera.ecelp4800": {
    source: "iana",
    extensions: [
      "ecelp4800"
    ]
  },
  "audio/vnd.nuera.ecelp7470": {
    source: "iana",
    extensions: [
      "ecelp7470"
    ]
  },
  "audio/vnd.nuera.ecelp9600": {
    source: "iana",
    extensions: [
      "ecelp9600"
    ]
  },
  "audio/vnd.octel.sbc": {
    source: "iana"
  },
  "audio/vnd.presonus.multitrack": {
    source: "iana"
  },
  "audio/vnd.qcelp": {
    source: "iana"
  },
  "audio/vnd.rhetorex.32kadpcm": {
    source: "iana"
  },
  "audio/vnd.rip": {
    source: "iana",
    extensions: [
      "rip"
    ]
  },
  "audio/vnd.rn-realaudio": {
    compressible: !1
  },
  "audio/vnd.sealedmedia.softseal.mpeg": {
    source: "iana"
  },
  "audio/vnd.vmx.cvsd": {
    source: "iana"
  },
  "audio/vnd.wave": {
    compressible: !1
  },
  "audio/vorbis": {
    source: "iana",
    compressible: !1
  },
  "audio/vorbis-config": {
    source: "iana"
  },
  "audio/wav": {
    compressible: !1,
    extensions: [
      "wav"
    ]
  },
  "audio/wave": {
    compressible: !1,
    extensions: [
      "wav"
    ]
  },
  "audio/webm": {
    source: "apache",
    compressible: !1,
    extensions: [
      "weba"
    ]
  },
  "audio/x-aac": {
    source: "apache",
    compressible: !1,
    extensions: [
      "aac"
    ]
  },
  "audio/x-aiff": {
    source: "apache",
    extensions: [
      "aif",
      "aiff",
      "aifc"
    ]
  },
  "audio/x-caf": {
    source: "apache",
    compressible: !1,
    extensions: [
      "caf"
    ]
  },
  "audio/x-flac": {
    source: "apache",
    extensions: [
      "flac"
    ]
  },
  "audio/x-m4a": {
    source: "nginx",
    extensions: [
      "m4a"
    ]
  },
  "audio/x-matroska": {
    source: "apache",
    extensions: [
      "mka"
    ]
  },
  "audio/x-mpegurl": {
    source: "apache",
    extensions: [
      "m3u"
    ]
  },
  "audio/x-ms-wax": {
    source: "apache",
    extensions: [
      "wax"
    ]
  },
  "audio/x-ms-wma": {
    source: "apache",
    extensions: [
      "wma"
    ]
  },
  "audio/x-pn-realaudio": {
    source: "apache",
    extensions: [
      "ram",
      "ra"
    ]
  },
  "audio/x-pn-realaudio-plugin": {
    source: "apache",
    extensions: [
      "rmp"
    ]
  },
  "audio/x-realaudio": {
    source: "nginx",
    extensions: [
      "ra"
    ]
  },
  "audio/x-tta": {
    source: "apache"
  },
  "audio/x-wav": {
    source: "apache",
    extensions: [
      "wav"
    ]
  },
  "audio/xm": {
    source: "apache",
    extensions: [
      "xm"
    ]
  },
  "chemical/x-cdx": {
    source: "apache",
    extensions: [
      "cdx"
    ]
  },
  "chemical/x-cif": {
    source: "apache",
    extensions: [
      "cif"
    ]
  },
  "chemical/x-cmdf": {
    source: "apache",
    extensions: [
      "cmdf"
    ]
  },
  "chemical/x-cml": {
    source: "apache",
    extensions: [
      "cml"
    ]
  },
  "chemical/x-csml": {
    source: "apache",
    extensions: [
      "csml"
    ]
  },
  "chemical/x-pdb": {
    source: "apache"
  },
  "chemical/x-xyz": {
    source: "apache",
    extensions: [
      "xyz"
    ]
  },
  "font/collection": {
    source: "iana",
    extensions: [
      "ttc"
    ]
  },
  "font/otf": {
    source: "iana",
    compressible: !0,
    extensions: [
      "otf"
    ]
  },
  "font/sfnt": {
    source: "iana"
  },
  "font/ttf": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ttf"
    ]
  },
  "font/woff": {
    source: "iana",
    extensions: [
      "woff"
    ]
  },
  "font/woff2": {
    source: "iana",
    extensions: [
      "woff2"
    ]
  },
  "image/aces": {
    source: "iana",
    extensions: [
      "exr"
    ]
  },
  "image/apng": {
    compressible: !1,
    extensions: [
      "apng"
    ]
  },
  "image/avci": {
    source: "iana",
    extensions: [
      "avci"
    ]
  },
  "image/avcs": {
    source: "iana",
    extensions: [
      "avcs"
    ]
  },
  "image/avif": {
    source: "iana",
    compressible: !1,
    extensions: [
      "avif"
    ]
  },
  "image/bmp": {
    source: "iana",
    compressible: !0,
    extensions: [
      "bmp"
    ]
  },
  "image/cgm": {
    source: "iana",
    extensions: [
      "cgm"
    ]
  },
  "image/dicom-rle": {
    source: "iana",
    extensions: [
      "drle"
    ]
  },
  "image/emf": {
    source: "iana",
    extensions: [
      "emf"
    ]
  },
  "image/fits": {
    source: "iana",
    extensions: [
      "fits"
    ]
  },
  "image/g3fax": {
    source: "iana",
    extensions: [
      "g3"
    ]
  },
  "image/gif": {
    source: "iana",
    compressible: !1,
    extensions: [
      "gif"
    ]
  },
  "image/heic": {
    source: "iana",
    extensions: [
      "heic"
    ]
  },
  "image/heic-sequence": {
    source: "iana",
    extensions: [
      "heics"
    ]
  },
  "image/heif": {
    source: "iana",
    extensions: [
      "heif"
    ]
  },
  "image/heif-sequence": {
    source: "iana",
    extensions: [
      "heifs"
    ]
  },
  "image/hej2k": {
    source: "iana",
    extensions: [
      "hej2"
    ]
  },
  "image/hsj2": {
    source: "iana",
    extensions: [
      "hsj2"
    ]
  },
  "image/ief": {
    source: "iana",
    extensions: [
      "ief"
    ]
  },
  "image/jls": {
    source: "iana",
    extensions: [
      "jls"
    ]
  },
  "image/jp2": {
    source: "iana",
    compressible: !1,
    extensions: [
      "jp2",
      "jpg2"
    ]
  },
  "image/jpeg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "jpeg",
      "jpg",
      "jpe"
    ]
  },
  "image/jph": {
    source: "iana",
    extensions: [
      "jph"
    ]
  },
  "image/jphc": {
    source: "iana",
    extensions: [
      "jhc"
    ]
  },
  "image/jpm": {
    source: "iana",
    compressible: !1,
    extensions: [
      "jpm"
    ]
  },
  "image/jpx": {
    source: "iana",
    compressible: !1,
    extensions: [
      "jpx",
      "jpf"
    ]
  },
  "image/jxr": {
    source: "iana",
    extensions: [
      "jxr"
    ]
  },
  "image/jxra": {
    source: "iana",
    extensions: [
      "jxra"
    ]
  },
  "image/jxrs": {
    source: "iana",
    extensions: [
      "jxrs"
    ]
  },
  "image/jxs": {
    source: "iana",
    extensions: [
      "jxs"
    ]
  },
  "image/jxsc": {
    source: "iana",
    extensions: [
      "jxsc"
    ]
  },
  "image/jxsi": {
    source: "iana",
    extensions: [
      "jxsi"
    ]
  },
  "image/jxss": {
    source: "iana",
    extensions: [
      "jxss"
    ]
  },
  "image/ktx": {
    source: "iana",
    extensions: [
      "ktx"
    ]
  },
  "image/ktx2": {
    source: "iana",
    extensions: [
      "ktx2"
    ]
  },
  "image/naplps": {
    source: "iana"
  },
  "image/pjpeg": {
    compressible: !1
  },
  "image/png": {
    source: "iana",
    compressible: !1,
    extensions: [
      "png"
    ]
  },
  "image/prs.btif": {
    source: "iana",
    extensions: [
      "btif"
    ]
  },
  "image/prs.pti": {
    source: "iana",
    extensions: [
      "pti"
    ]
  },
  "image/pwg-raster": {
    source: "iana"
  },
  "image/sgi": {
    source: "apache",
    extensions: [
      "sgi"
    ]
  },
  "image/svg+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "svg",
      "svgz"
    ]
  },
  "image/t38": {
    source: "iana",
    extensions: [
      "t38"
    ]
  },
  "image/tiff": {
    source: "iana",
    compressible: !1,
    extensions: [
      "tif",
      "tiff"
    ]
  },
  "image/tiff-fx": {
    source: "iana",
    extensions: [
      "tfx"
    ]
  },
  "image/vnd.adobe.photoshop": {
    source: "iana",
    compressible: !0,
    extensions: [
      "psd"
    ]
  },
  "image/vnd.airzip.accelerator.azv": {
    source: "iana",
    extensions: [
      "azv"
    ]
  },
  "image/vnd.cns.inf2": {
    source: "iana"
  },
  "image/vnd.dece.graphic": {
    source: "iana",
    extensions: [
      "uvi",
      "uvvi",
      "uvg",
      "uvvg"
    ]
  },
  "image/vnd.djvu": {
    source: "iana",
    extensions: [
      "djvu",
      "djv"
    ]
  },
  "image/vnd.dvb.subtitle": {
    source: "iana",
    extensions: [
      "sub"
    ]
  },
  "image/vnd.dwg": {
    source: "iana",
    extensions: [
      "dwg"
    ]
  },
  "image/vnd.dxf": {
    source: "iana",
    extensions: [
      "dxf"
    ]
  },
  "image/vnd.fastbidsheet": {
    source: "iana",
    extensions: [
      "fbs"
    ]
  },
  "image/vnd.fpx": {
    source: "iana",
    extensions: [
      "fpx"
    ]
  },
  "image/vnd.fst": {
    source: "iana",
    extensions: [
      "fst"
    ]
  },
  "image/vnd.fujixerox.edmics-mmr": {
    source: "iana",
    extensions: [
      "mmr"
    ]
  },
  "image/vnd.fujixerox.edmics-rlc": {
    source: "iana",
    extensions: [
      "rlc"
    ]
  },
  "image/vnd.globalgraphics.pgb": {
    source: "iana"
  },
  "image/vnd.microsoft.icon": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ico"
    ]
  },
  "image/vnd.mix": {
    source: "iana"
  },
  "image/vnd.mozilla.apng": {
    source: "iana"
  },
  "image/vnd.ms-dds": {
    compressible: !0,
    extensions: [
      "dds"
    ]
  },
  "image/vnd.ms-modi": {
    source: "iana",
    extensions: [
      "mdi"
    ]
  },
  "image/vnd.ms-photo": {
    source: "apache",
    extensions: [
      "wdp"
    ]
  },
  "image/vnd.net-fpx": {
    source: "iana",
    extensions: [
      "npx"
    ]
  },
  "image/vnd.pco.b16": {
    source: "iana",
    extensions: [
      "b16"
    ]
  },
  "image/vnd.radiance": {
    source: "iana"
  },
  "image/vnd.sealed.png": {
    source: "iana"
  },
  "image/vnd.sealedmedia.softseal.gif": {
    source: "iana"
  },
  "image/vnd.sealedmedia.softseal.jpg": {
    source: "iana"
  },
  "image/vnd.svf": {
    source: "iana"
  },
  "image/vnd.tencent.tap": {
    source: "iana",
    extensions: [
      "tap"
    ]
  },
  "image/vnd.valve.source.texture": {
    source: "iana",
    extensions: [
      "vtf"
    ]
  },
  "image/vnd.wap.wbmp": {
    source: "iana",
    extensions: [
      "wbmp"
    ]
  },
  "image/vnd.xiff": {
    source: "iana",
    extensions: [
      "xif"
    ]
  },
  "image/vnd.zbrush.pcx": {
    source: "iana",
    extensions: [
      "pcx"
    ]
  },
  "image/webp": {
    source: "apache",
    extensions: [
      "webp"
    ]
  },
  "image/wmf": {
    source: "iana",
    extensions: [
      "wmf"
    ]
  },
  "image/x-3ds": {
    source: "apache",
    extensions: [
      "3ds"
    ]
  },
  "image/x-cmu-raster": {
    source: "apache",
    extensions: [
      "ras"
    ]
  },
  "image/x-cmx": {
    source: "apache",
    extensions: [
      "cmx"
    ]
  },
  "image/x-freehand": {
    source: "apache",
    extensions: [
      "fh",
      "fhc",
      "fh4",
      "fh5",
      "fh7"
    ]
  },
  "image/x-icon": {
    source: "apache",
    compressible: !0,
    extensions: [
      "ico"
    ]
  },
  "image/x-jng": {
    source: "nginx",
    extensions: [
      "jng"
    ]
  },
  "image/x-mrsid-image": {
    source: "apache",
    extensions: [
      "sid"
    ]
  },
  "image/x-ms-bmp": {
    source: "nginx",
    compressible: !0,
    extensions: [
      "bmp"
    ]
  },
  "image/x-pcx": {
    source: "apache",
    extensions: [
      "pcx"
    ]
  },
  "image/x-pict": {
    source: "apache",
    extensions: [
      "pic",
      "pct"
    ]
  },
  "image/x-portable-anymap": {
    source: "apache",
    extensions: [
      "pnm"
    ]
  },
  "image/x-portable-bitmap": {
    source: "apache",
    extensions: [
      "pbm"
    ]
  },
  "image/x-portable-graymap": {
    source: "apache",
    extensions: [
      "pgm"
    ]
  },
  "image/x-portable-pixmap": {
    source: "apache",
    extensions: [
      "ppm"
    ]
  },
  "image/x-rgb": {
    source: "apache",
    extensions: [
      "rgb"
    ]
  },
  "image/x-tga": {
    source: "apache",
    extensions: [
      "tga"
    ]
  },
  "image/x-xbitmap": {
    source: "apache",
    extensions: [
      "xbm"
    ]
  },
  "image/x-xcf": {
    compressible: !1
  },
  "image/x-xpixmap": {
    source: "apache",
    extensions: [
      "xpm"
    ]
  },
  "image/x-xwindowdump": {
    source: "apache",
    extensions: [
      "xwd"
    ]
  },
  "message/cpim": {
    source: "iana"
  },
  "message/delivery-status": {
    source: "iana"
  },
  "message/disposition-notification": {
    source: "iana",
    extensions: [
      "disposition-notification"
    ]
  },
  "message/external-body": {
    source: "iana"
  },
  "message/feedback-report": {
    source: "iana"
  },
  "message/global": {
    source: "iana",
    extensions: [
      "u8msg"
    ]
  },
  "message/global-delivery-status": {
    source: "iana",
    extensions: [
      "u8dsn"
    ]
  },
  "message/global-disposition-notification": {
    source: "iana",
    extensions: [
      "u8mdn"
    ]
  },
  "message/global-headers": {
    source: "iana",
    extensions: [
      "u8hdr"
    ]
  },
  "message/http": {
    source: "iana",
    compressible: !1
  },
  "message/imdn+xml": {
    source: "iana",
    compressible: !0
  },
  "message/news": {
    source: "iana"
  },
  "message/partial": {
    source: "iana",
    compressible: !1
  },
  "message/rfc822": {
    source: "iana",
    compressible: !0,
    extensions: [
      "eml",
      "mime"
    ]
  },
  "message/s-http": {
    source: "iana"
  },
  "message/sip": {
    source: "iana"
  },
  "message/sipfrag": {
    source: "iana"
  },
  "message/tracking-status": {
    source: "iana"
  },
  "message/vnd.si.simp": {
    source: "iana"
  },
  "message/vnd.wfa.wsc": {
    source: "iana",
    extensions: [
      "wsc"
    ]
  },
  "model/3mf": {
    source: "iana",
    extensions: [
      "3mf"
    ]
  },
  "model/e57": {
    source: "iana"
  },
  "model/gltf+json": {
    source: "iana",
    compressible: !0,
    extensions: [
      "gltf"
    ]
  },
  "model/gltf-binary": {
    source: "iana",
    compressible: !0,
    extensions: [
      "glb"
    ]
  },
  "model/iges": {
    source: "iana",
    compressible: !1,
    extensions: [
      "igs",
      "iges"
    ]
  },
  "model/mesh": {
    source: "iana",
    compressible: !1,
    extensions: [
      "msh",
      "mesh",
      "silo"
    ]
  },
  "model/mtl": {
    source: "iana",
    extensions: [
      "mtl"
    ]
  },
  "model/obj": {
    source: "iana",
    extensions: [
      "obj"
    ]
  },
  "model/step": {
    source: "iana"
  },
  "model/step+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "stpx"
    ]
  },
  "model/step+zip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "stpz"
    ]
  },
  "model/step-xml+zip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "stpxz"
    ]
  },
  "model/stl": {
    source: "iana",
    extensions: [
      "stl"
    ]
  },
  "model/vnd.collada+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "dae"
    ]
  },
  "model/vnd.dwf": {
    source: "iana",
    extensions: [
      "dwf"
    ]
  },
  "model/vnd.flatland.3dml": {
    source: "iana"
  },
  "model/vnd.gdl": {
    source: "iana",
    extensions: [
      "gdl"
    ]
  },
  "model/vnd.gs-gdl": {
    source: "apache"
  },
  "model/vnd.gs.gdl": {
    source: "iana"
  },
  "model/vnd.gtw": {
    source: "iana",
    extensions: [
      "gtw"
    ]
  },
  "model/vnd.moml+xml": {
    source: "iana",
    compressible: !0
  },
  "model/vnd.mts": {
    source: "iana",
    extensions: [
      "mts"
    ]
  },
  "model/vnd.opengex": {
    source: "iana",
    extensions: [
      "ogex"
    ]
  },
  "model/vnd.parasolid.transmit.binary": {
    source: "iana",
    extensions: [
      "x_b"
    ]
  },
  "model/vnd.parasolid.transmit.text": {
    source: "iana",
    extensions: [
      "x_t"
    ]
  },
  "model/vnd.pytha.pyox": {
    source: "iana"
  },
  "model/vnd.rosette.annotated-data-model": {
    source: "iana"
  },
  "model/vnd.sap.vds": {
    source: "iana",
    extensions: [
      "vds"
    ]
  },
  "model/vnd.usdz+zip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "usdz"
    ]
  },
  "model/vnd.valve.source.compiled-map": {
    source: "iana",
    extensions: [
      "bsp"
    ]
  },
  "model/vnd.vtu": {
    source: "iana",
    extensions: [
      "vtu"
    ]
  },
  "model/vrml": {
    source: "iana",
    compressible: !1,
    extensions: [
      "wrl",
      "vrml"
    ]
  },
  "model/x3d+binary": {
    source: "apache",
    compressible: !1,
    extensions: [
      "x3db",
      "x3dbz"
    ]
  },
  "model/x3d+fastinfoset": {
    source: "iana",
    extensions: [
      "x3db"
    ]
  },
  "model/x3d+vrml": {
    source: "apache",
    compressible: !1,
    extensions: [
      "x3dv",
      "x3dvz"
    ]
  },
  "model/x3d+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "x3d",
      "x3dz"
    ]
  },
  "model/x3d-vrml": {
    source: "iana",
    extensions: [
      "x3dv"
    ]
  },
  "multipart/alternative": {
    source: "iana",
    compressible: !1
  },
  "multipart/appledouble": {
    source: "iana"
  },
  "multipart/byteranges": {
    source: "iana"
  },
  "multipart/digest": {
    source: "iana"
  },
  "multipart/encrypted": {
    source: "iana",
    compressible: !1
  },
  "multipart/form-data": {
    source: "iana",
    compressible: !1
  },
  "multipart/header-set": {
    source: "iana"
  },
  "multipart/mixed": {
    source: "iana"
  },
  "multipart/multilingual": {
    source: "iana"
  },
  "multipart/parallel": {
    source: "iana"
  },
  "multipart/related": {
    source: "iana",
    compressible: !1
  },
  "multipart/report": {
    source: "iana"
  },
  "multipart/signed": {
    source: "iana",
    compressible: !1
  },
  "multipart/vnd.bint.med-plus": {
    source: "iana"
  },
  "multipart/voice-message": {
    source: "iana"
  },
  "multipart/x-mixed-replace": {
    source: "iana"
  },
  "text/1d-interleaved-parityfec": {
    source: "iana"
  },
  "text/cache-manifest": {
    source: "iana",
    compressible: !0,
    extensions: [
      "appcache",
      "manifest"
    ]
  },
  "text/calendar": {
    source: "iana",
    extensions: [
      "ics",
      "ifb"
    ]
  },
  "text/calender": {
    compressible: !0
  },
  "text/cmd": {
    compressible: !0
  },
  "text/coffeescript": {
    extensions: [
      "coffee",
      "litcoffee"
    ]
  },
  "text/cql": {
    source: "iana"
  },
  "text/cql-expression": {
    source: "iana"
  },
  "text/cql-identifier": {
    source: "iana"
  },
  "text/css": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "css"
    ]
  },
  "text/csv": {
    source: "iana",
    compressible: !0,
    extensions: [
      "csv"
    ]
  },
  "text/csv-schema": {
    source: "iana"
  },
  "text/directory": {
    source: "iana"
  },
  "text/dns": {
    source: "iana"
  },
  "text/ecmascript": {
    source: "iana"
  },
  "text/encaprtp": {
    source: "iana"
  },
  "text/enriched": {
    source: "iana"
  },
  "text/fhirpath": {
    source: "iana"
  },
  "text/flexfec": {
    source: "iana"
  },
  "text/fwdred": {
    source: "iana"
  },
  "text/gff3": {
    source: "iana"
  },
  "text/grammar-ref-list": {
    source: "iana"
  },
  "text/html": {
    source: "iana",
    compressible: !0,
    extensions: [
      "html",
      "htm",
      "shtml"
    ]
  },
  "text/jade": {
    extensions: [
      "jade"
    ]
  },
  "text/javascript": {
    source: "iana",
    compressible: !0
  },
  "text/jcr-cnd": {
    source: "iana"
  },
  "text/jsx": {
    compressible: !0,
    extensions: [
      "jsx"
    ]
  },
  "text/less": {
    compressible: !0,
    extensions: [
      "less"
    ]
  },
  "text/markdown": {
    source: "iana",
    compressible: !0,
    extensions: [
      "markdown",
      "md"
    ]
  },
  "text/mathml": {
    source: "nginx",
    extensions: [
      "mml"
    ]
  },
  "text/mdx": {
    compressible: !0,
    extensions: [
      "mdx"
    ]
  },
  "text/mizar": {
    source: "iana"
  },
  "text/n3": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "n3"
    ]
  },
  "text/parameters": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/parityfec": {
    source: "iana"
  },
  "text/plain": {
    source: "iana",
    compressible: !0,
    extensions: [
      "txt",
      "text",
      "conf",
      "def",
      "list",
      "log",
      "in",
      "ini"
    ]
  },
  "text/provenance-notation": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/prs.fallenstein.rst": {
    source: "iana"
  },
  "text/prs.lines.tag": {
    source: "iana",
    extensions: [
      "dsc"
    ]
  },
  "text/prs.prop.logic": {
    source: "iana"
  },
  "text/raptorfec": {
    source: "iana"
  },
  "text/red": {
    source: "iana"
  },
  "text/rfc822-headers": {
    source: "iana"
  },
  "text/richtext": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rtx"
    ]
  },
  "text/rtf": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rtf"
    ]
  },
  "text/rtp-enc-aescm128": {
    source: "iana"
  },
  "text/rtploopback": {
    source: "iana"
  },
  "text/rtx": {
    source: "iana"
  },
  "text/sgml": {
    source: "iana",
    extensions: [
      "sgml",
      "sgm"
    ]
  },
  "text/shaclc": {
    source: "iana"
  },
  "text/shex": {
    source: "iana",
    extensions: [
      "shex"
    ]
  },
  "text/slim": {
    extensions: [
      "slim",
      "slm"
    ]
  },
  "text/spdx": {
    source: "iana",
    extensions: [
      "spdx"
    ]
  },
  "text/strings": {
    source: "iana"
  },
  "text/stylus": {
    extensions: [
      "stylus",
      "styl"
    ]
  },
  "text/t140": {
    source: "iana"
  },
  "text/tab-separated-values": {
    source: "iana",
    compressible: !0,
    extensions: [
      "tsv"
    ]
  },
  "text/troff": {
    source: "iana",
    extensions: [
      "t",
      "tr",
      "roff",
      "man",
      "me",
      "ms"
    ]
  },
  "text/turtle": {
    source: "iana",
    charset: "UTF-8",
    extensions: [
      "ttl"
    ]
  },
  "text/ulpfec": {
    source: "iana"
  },
  "text/uri-list": {
    source: "iana",
    compressible: !0,
    extensions: [
      "uri",
      "uris",
      "urls"
    ]
  },
  "text/vcard": {
    source: "iana",
    compressible: !0,
    extensions: [
      "vcard"
    ]
  },
  "text/vnd.a": {
    source: "iana"
  },
  "text/vnd.abc": {
    source: "iana"
  },
  "text/vnd.ascii-art": {
    source: "iana"
  },
  "text/vnd.curl": {
    source: "iana",
    extensions: [
      "curl"
    ]
  },
  "text/vnd.curl.dcurl": {
    source: "apache",
    extensions: [
      "dcurl"
    ]
  },
  "text/vnd.curl.mcurl": {
    source: "apache",
    extensions: [
      "mcurl"
    ]
  },
  "text/vnd.curl.scurl": {
    source: "apache",
    extensions: [
      "scurl"
    ]
  },
  "text/vnd.debian.copyright": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/vnd.dmclientscript": {
    source: "iana"
  },
  "text/vnd.dvb.subtitle": {
    source: "iana",
    extensions: [
      "sub"
    ]
  },
  "text/vnd.esmertec.theme-descriptor": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/vnd.familysearch.gedcom": {
    source: "iana",
    extensions: [
      "ged"
    ]
  },
  "text/vnd.ficlab.flt": {
    source: "iana"
  },
  "text/vnd.fly": {
    source: "iana",
    extensions: [
      "fly"
    ]
  },
  "text/vnd.fmi.flexstor": {
    source: "iana",
    extensions: [
      "flx"
    ]
  },
  "text/vnd.gml": {
    source: "iana"
  },
  "text/vnd.graphviz": {
    source: "iana",
    extensions: [
      "gv"
    ]
  },
  "text/vnd.hans": {
    source: "iana"
  },
  "text/vnd.hgl": {
    source: "iana"
  },
  "text/vnd.in3d.3dml": {
    source: "iana",
    extensions: [
      "3dml"
    ]
  },
  "text/vnd.in3d.spot": {
    source: "iana",
    extensions: [
      "spot"
    ]
  },
  "text/vnd.iptc.newsml": {
    source: "iana"
  },
  "text/vnd.iptc.nitf": {
    source: "iana"
  },
  "text/vnd.latex-z": {
    source: "iana"
  },
  "text/vnd.motorola.reflex": {
    source: "iana"
  },
  "text/vnd.ms-mediapackage": {
    source: "iana"
  },
  "text/vnd.net2phone.commcenter.command": {
    source: "iana"
  },
  "text/vnd.radisys.msml-basic-layout": {
    source: "iana"
  },
  "text/vnd.senx.warpscript": {
    source: "iana"
  },
  "text/vnd.si.uricatalogue": {
    source: "iana"
  },
  "text/vnd.sosi": {
    source: "iana"
  },
  "text/vnd.sun.j2me.app-descriptor": {
    source: "iana",
    charset: "UTF-8",
    extensions: [
      "jad"
    ]
  },
  "text/vnd.trolltech.linguist": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/vnd.wap.si": {
    source: "iana"
  },
  "text/vnd.wap.sl": {
    source: "iana"
  },
  "text/vnd.wap.wml": {
    source: "iana",
    extensions: [
      "wml"
    ]
  },
  "text/vnd.wap.wmlscript": {
    source: "iana",
    extensions: [
      "wmls"
    ]
  },
  "text/vtt": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "vtt"
    ]
  },
  "text/x-asm": {
    source: "apache",
    extensions: [
      "s",
      "asm"
    ]
  },
  "text/x-c": {
    source: "apache",
    extensions: [
      "c",
      "cc",
      "cxx",
      "cpp",
      "h",
      "hh",
      "dic"
    ]
  },
  "text/x-component": {
    source: "nginx",
    extensions: [
      "htc"
    ]
  },
  "text/x-fortran": {
    source: "apache",
    extensions: [
      "f",
      "for",
      "f77",
      "f90"
    ]
  },
  "text/x-gwt-rpc": {
    compressible: !0
  },
  "text/x-handlebars-template": {
    extensions: [
      "hbs"
    ]
  },
  "text/x-java-source": {
    source: "apache",
    extensions: [
      "java"
    ]
  },
  "text/x-jquery-tmpl": {
    compressible: !0
  },
  "text/x-lua": {
    extensions: [
      "lua"
    ]
  },
  "text/x-markdown": {
    compressible: !0,
    extensions: [
      "mkd"
    ]
  },
  "text/x-nfo": {
    source: "apache",
    extensions: [
      "nfo"
    ]
  },
  "text/x-opml": {
    source: "apache",
    extensions: [
      "opml"
    ]
  },
  "text/x-org": {
    compressible: !0,
    extensions: [
      "org"
    ]
  },
  "text/x-pascal": {
    source: "apache",
    extensions: [
      "p",
      "pas"
    ]
  },
  "text/x-processing": {
    compressible: !0,
    extensions: [
      "pde"
    ]
  },
  "text/x-sass": {
    extensions: [
      "sass"
    ]
  },
  "text/x-scss": {
    extensions: [
      "scss"
    ]
  },
  "text/x-setext": {
    source: "apache",
    extensions: [
      "etx"
    ]
  },
  "text/x-sfv": {
    source: "apache",
    extensions: [
      "sfv"
    ]
  },
  "text/x-suse-ymp": {
    compressible: !0,
    extensions: [
      "ymp"
    ]
  },
  "text/x-uuencode": {
    source: "apache",
    extensions: [
      "uu"
    ]
  },
  "text/x-vcalendar": {
    source: "apache",
    extensions: [
      "vcs"
    ]
  },
  "text/x-vcard": {
    source: "apache",
    extensions: [
      "vcf"
    ]
  },
  "text/xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xml"
    ]
  },
  "text/xml-external-parsed-entity": {
    source: "iana"
  },
  "text/yaml": {
    compressible: !0,
    extensions: [
      "yaml",
      "yml"
    ]
  },
  "video/1d-interleaved-parityfec": {
    source: "iana"
  },
  "video/3gpp": {
    source: "iana",
    extensions: [
      "3gp",
      "3gpp"
    ]
  },
  "video/3gpp-tt": {
    source: "iana"
  },
  "video/3gpp2": {
    source: "iana",
    extensions: [
      "3g2"
    ]
  },
  "video/av1": {
    source: "iana"
  },
  "video/bmpeg": {
    source: "iana"
  },
  "video/bt656": {
    source: "iana"
  },
  "video/celb": {
    source: "iana"
  },
  "video/dv": {
    source: "iana"
  },
  "video/encaprtp": {
    source: "iana"
  },
  "video/ffv1": {
    source: "iana"
  },
  "video/flexfec": {
    source: "iana"
  },
  "video/h261": {
    source: "iana",
    extensions: [
      "h261"
    ]
  },
  "video/h263": {
    source: "iana",
    extensions: [
      "h263"
    ]
  },
  "video/h263-1998": {
    source: "iana"
  },
  "video/h263-2000": {
    source: "iana"
  },
  "video/h264": {
    source: "iana",
    extensions: [
      "h264"
    ]
  },
  "video/h264-rcdo": {
    source: "iana"
  },
  "video/h264-svc": {
    source: "iana"
  },
  "video/h265": {
    source: "iana"
  },
  "video/iso.segment": {
    source: "iana",
    extensions: [
      "m4s"
    ]
  },
  "video/jpeg": {
    source: "iana",
    extensions: [
      "jpgv"
    ]
  },
  "video/jpeg2000": {
    source: "iana"
  },
  "video/jpm": {
    source: "apache",
    extensions: [
      "jpm",
      "jpgm"
    ]
  },
  "video/jxsv": {
    source: "iana"
  },
  "video/mj2": {
    source: "iana",
    extensions: [
      "mj2",
      "mjp2"
    ]
  },
  "video/mp1s": {
    source: "iana"
  },
  "video/mp2p": {
    source: "iana"
  },
  "video/mp2t": {
    source: "iana",
    extensions: [
      "ts"
    ]
  },
  "video/mp4": {
    source: "iana",
    compressible: !1,
    extensions: [
      "mp4",
      "mp4v",
      "mpg4"
    ]
  },
  "video/mp4v-es": {
    source: "iana"
  },
  "video/mpeg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "mpeg",
      "mpg",
      "mpe",
      "m1v",
      "m2v"
    ]
  },
  "video/mpeg4-generic": {
    source: "iana"
  },
  "video/mpv": {
    source: "iana"
  },
  "video/nv": {
    source: "iana"
  },
  "video/ogg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "ogv"
    ]
  },
  "video/parityfec": {
    source: "iana"
  },
  "video/pointer": {
    source: "iana"
  },
  "video/quicktime": {
    source: "iana",
    compressible: !1,
    extensions: [
      "qt",
      "mov"
    ]
  },
  "video/raptorfec": {
    source: "iana"
  },
  "video/raw": {
    source: "iana"
  },
  "video/rtp-enc-aescm128": {
    source: "iana"
  },
  "video/rtploopback": {
    source: "iana"
  },
  "video/rtx": {
    source: "iana"
  },
  "video/scip": {
    source: "iana"
  },
  "video/smpte291": {
    source: "iana"
  },
  "video/smpte292m": {
    source: "iana"
  },
  "video/ulpfec": {
    source: "iana"
  },
  "video/vc1": {
    source: "iana"
  },
  "video/vc2": {
    source: "iana"
  },
  "video/vnd.cctv": {
    source: "iana"
  },
  "video/vnd.dece.hd": {
    source: "iana",
    extensions: [
      "uvh",
      "uvvh"
    ]
  },
  "video/vnd.dece.mobile": {
    source: "iana",
    extensions: [
      "uvm",
      "uvvm"
    ]
  },
  "video/vnd.dece.mp4": {
    source: "iana"
  },
  "video/vnd.dece.pd": {
    source: "iana",
    extensions: [
      "uvp",
      "uvvp"
    ]
  },
  "video/vnd.dece.sd": {
    source: "iana",
    extensions: [
      "uvs",
      "uvvs"
    ]
  },
  "video/vnd.dece.video": {
    source: "iana",
    extensions: [
      "uvv",
      "uvvv"
    ]
  },
  "video/vnd.directv.mpeg": {
    source: "iana"
  },
  "video/vnd.directv.mpeg-tts": {
    source: "iana"
  },
  "video/vnd.dlna.mpeg-tts": {
    source: "iana"
  },
  "video/vnd.dvb.file": {
    source: "iana",
    extensions: [
      "dvb"
    ]
  },
  "video/vnd.fvt": {
    source: "iana",
    extensions: [
      "fvt"
    ]
  },
  "video/vnd.hns.video": {
    source: "iana"
  },
  "video/vnd.iptvforum.1dparityfec-1010": {
    source: "iana"
  },
  "video/vnd.iptvforum.1dparityfec-2005": {
    source: "iana"
  },
  "video/vnd.iptvforum.2dparityfec-1010": {
    source: "iana"
  },
  "video/vnd.iptvforum.2dparityfec-2005": {
    source: "iana"
  },
  "video/vnd.iptvforum.ttsavc": {
    source: "iana"
  },
  "video/vnd.iptvforum.ttsmpeg2": {
    source: "iana"
  },
  "video/vnd.motorola.video": {
    source: "iana"
  },
  "video/vnd.motorola.videop": {
    source: "iana"
  },
  "video/vnd.mpegurl": {
    source: "iana",
    extensions: [
      "mxu",
      "m4u"
    ]
  },
  "video/vnd.ms-playready.media.pyv": {
    source: "iana",
    extensions: [
      "pyv"
    ]
  },
  "video/vnd.nokia.interleaved-multimedia": {
    source: "iana"
  },
  "video/vnd.nokia.mp4vr": {
    source: "iana"
  },
  "video/vnd.nokia.videovoip": {
    source: "iana"
  },
  "video/vnd.objectvideo": {
    source: "iana"
  },
  "video/vnd.radgamettools.bink": {
    source: "iana"
  },
  "video/vnd.radgamettools.smacker": {
    source: "iana"
  },
  "video/vnd.sealed.mpeg1": {
    source: "iana"
  },
  "video/vnd.sealed.mpeg4": {
    source: "iana"
  },
  "video/vnd.sealed.swf": {
    source: "iana"
  },
  "video/vnd.sealedmedia.softseal.mov": {
    source: "iana"
  },
  "video/vnd.uvvu.mp4": {
    source: "iana",
    extensions: [
      "uvu",
      "uvvu"
    ]
  },
  "video/vnd.vivo": {
    source: "iana",
    extensions: [
      "viv"
    ]
  },
  "video/vnd.youtube.yt": {
    source: "iana"
  },
  "video/vp8": {
    source: "iana"
  },
  "video/vp9": {
    source: "iana"
  },
  "video/webm": {
    source: "apache",
    compressible: !1,
    extensions: [
      "webm"
    ]
  },
  "video/x-f4v": {
    source: "apache",
    extensions: [
      "f4v"
    ]
  },
  "video/x-fli": {
    source: "apache",
    extensions: [
      "fli"
    ]
  },
  "video/x-flv": {
    source: "apache",
    compressible: !1,
    extensions: [
      "flv"
    ]
  },
  "video/x-m4v": {
    source: "apache",
    extensions: [
      "m4v"
    ]
  },
  "video/x-matroska": {
    source: "apache",
    compressible: !1,
    extensions: [
      "mkv",
      "mk3d",
      "mks"
    ]
  },
  "video/x-mng": {
    source: "apache",
    extensions: [
      "mng"
    ]
  },
  "video/x-ms-asf": {
    source: "apache",
    extensions: [
      "asf",
      "asx"
    ]
  },
  "video/x-ms-vob": {
    source: "apache",
    extensions: [
      "vob"
    ]
  },
  "video/x-ms-wm": {
    source: "apache",
    extensions: [
      "wm"
    ]
  },
  "video/x-ms-wmv": {
    source: "apache",
    compressible: !1,
    extensions: [
      "wmv"
    ]
  },
  "video/x-ms-wmx": {
    source: "apache",
    extensions: [
      "wmx"
    ]
  },
  "video/x-ms-wvx": {
    source: "apache",
    extensions: [
      "wvx"
    ]
  },
  "video/x-msvideo": {
    source: "apache",
    extensions: [
      "avi"
    ]
  },
  "video/x-sgi-movie": {
    source: "apache",
    extensions: [
      "movie"
    ]
  },
  "video/x-smv": {
    source: "apache",
    extensions: [
      "smv"
    ]
  },
  "x-conference/x-cooltalk": {
    source: "apache",
    extensions: [
      "ice"
    ]
  },
  "x-shader/x-fragment": {
    compressible: !0
  },
  "x-shader/x-vertex": {
    compressible: !0
  }
};
/*!
 * mime-db
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015-2022 Douglas Christopher Wilson
 * MIT Licensed
 */
var hs = xs;
/*!
 * mime-types
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
(function(e) {
  var a = hs, i = Ae.extname, n = /^\s*([^;\s]*)(?:;|\s|$)/, s = /^text\//i;
  e.charset = o, e.charsets = { lookup: o }, e.contentType = t, e.extension = c, e.extensions = /* @__PURE__ */ Object.create(null), e.lookup = d, e.types = /* @__PURE__ */ Object.create(null), u(e.extensions, e.types);
  function o(r) {
    if (!r || typeof r != "string")
      return !1;
    var l = n.exec(r), m = l && a[l[1].toLowerCase()];
    return m && m.charset ? m.charset : l && s.test(l[1]) ? "UTF-8" : !1;
  }
  function t(r) {
    if (!r || typeof r != "string")
      return !1;
    var l = r.indexOf("/") === -1 ? e.lookup(r) : r;
    if (!l)
      return !1;
    if (l.indexOf("charset") === -1) {
      var m = e.charset(l);
      m && (l += "; charset=" + m.toLowerCase());
    }
    return l;
  }
  function c(r) {
    if (!r || typeof r != "string")
      return !1;
    var l = n.exec(r), m = l && e.extensions[l[1].toLowerCase()];
    return !m || !m.length ? !1 : m[0];
  }
  function d(r) {
    if (!r || typeof r != "string")
      return !1;
    var l = i("x." + r).toLowerCase().substr(1);
    return l && e.types[l] || !1;
  }
  function u(r, l) {
    var m = ["nginx", "apache", void 0, "iana"];
    Object.keys(a).forEach(function(f) {
      var v = a[f], x = v.extensions;
      if (!(!x || !x.length)) {
        r[f] = x;
        for (var g = 0; g < x.length; g++) {
          var w = x[g];
          if (l[w]) {
            var y = m.indexOf(a[l[w]].source), S = m.indexOf(v.source);
            if (l[w] !== "application/octet-stream" && (y > S || y === S && l[w].substr(0, 12) === "application/"))
              continue;
          }
          l[w] = f;
        }
      }
    });
  }
})(zi);
var vs = bs;
function bs(e) {
  var a = typeof setImmediate == "function" ? setImmediate : typeof process == "object" && typeof process.nextTick == "function" ? process.nextTick : null;
  a ? a(e) : setTimeout(e, 0);
}
var Wa = vs, qi = gs;
function gs(e) {
  var a = !1;
  return Wa(function() {
    a = !0;
  }), function(n, s) {
    a ? e(n, s) : Wa(function() {
      e(n, s);
    });
  };
}
var Pi = ys;
function ys(e) {
  Object.keys(e.jobs).forEach(ws.bind(e)), e.jobs = {};
}
function ws(e) {
  typeof this.jobs[e] == "function" && this.jobs[e]();
}
var Ja = qi, ks = Pi, Bi = _s;
function _s(e, a, i, n) {
  var s = i.keyedList ? i.keyedList[i.index] : i.index;
  i.jobs[s] = Es(a, s, e[s], function(o, t) {
    s in i.jobs && (delete i.jobs[s], o ? ks(i) : i.results[s] = t, n(o, i.results));
  });
}
function Es(e, a, i, n) {
  var s;
  return e.length == 2 ? s = e(i, Ja(n)) : s = e(i, a, Ja(n)), s;
}
var Ui = Rs;
function Rs(e, a) {
  var i = !Array.isArray(e), n = {
    index: 0,
    keyedList: i || a ? Object.keys(e) : null,
    jobs: {},
    results: i ? {} : [],
    size: i ? Object.keys(e).length : e.length
  };
  return a && n.keyedList.sort(i ? a : function(s, o) {
    return a(e[s], e[o]);
  }), n;
}
var js = Pi, Ss = qi, Ni = Cs;
function Cs(e) {
  Object.keys(this.jobs).length && (this.index = this.size, js(this), Ss(e)(null, this.results));
}
var Ts = Bi, Os = Ui, Fs = Ni, Ls = As;
function As(e, a, i) {
  for (var n = Os(e); n.index < (n.keyedList || e).length; )
    Ts(e, a, n, function(s, o) {
      if (s) {
        i(s, o);
        return;
      }
      if (Object.keys(n.jobs).length === 0) {
        i(null, n.results);
        return;
      }
    }), n.index++;
  return Fs.bind(n, i);
}
var Me = { exports: {} }, Ka = Bi, zs = Ui, qs = Ni;
Me.exports = Ps;
Me.exports.ascending = Di;
Me.exports.descending = Bs;
function Ps(e, a, i, n) {
  var s = zs(e, i);
  return Ka(e, a, s, function o(t, c) {
    if (t) {
      n(t, c);
      return;
    }
    if (s.index++, s.index < (s.keyedList || e).length) {
      Ka(e, a, s, o);
      return;
    }
    n(null, s.results);
  }), qs.bind(s, n);
}
function Di(e, a) {
  return e < a ? -1 : e > a ? 1 : 0;
}
function Bs(e, a) {
  return -1 * Di(e, a);
}
var Ii = Me.exports, Us = Ii, Ns = Ds;
function Ds(e, a, i) {
  return Us(e, a, null, i);
}
var Is = {
  parallel: Ls,
  serial: Ns,
  serialOrdered: Ii
}, $s = function(e, a) {
  return Object.keys(a).forEach(function(i) {
    e[i] = e[i] || a[i];
  }), e;
}, ja = fs, $i = we, Xe = Ae, Ms = _a, Hs = Ea, Vs = Ne.parse, Ws = he, Js = $.Stream, Ye = zi, Ks = Is, pa = $s, Gs = R;
$i.inherits(R, ja);
function R(e) {
  if (!(this instanceof R))
    return new R(e);
  this._overheadLength = 0, this._valueLength = 0, this._valuesToMeasure = [], ja.call(this), e = e || {};
  for (var a in e)
    this[a] = e[a];
}
R.LINE_BREAK = `\r
`;
R.DEFAULT_CONTENT_TYPE = "application/octet-stream";
R.prototype.append = function(e, a, i) {
  i = i || {}, typeof i == "string" && (i = { filename: i });
  var n = ja.prototype.append.bind(this);
  if (typeof a == "number" && (a = "" + a), $i.isArray(a)) {
    this._error(new Error("Arrays are not supported."));
    return;
  }
  var s = this._multiPartHeader(e, a, i), o = this._multiPartFooter();
  n(s), n(a), n(o), this._trackLength(s, a, i);
};
R.prototype._trackLength = function(e, a, i) {
  var n = 0;
  i.knownLength != null ? n += +i.knownLength : Buffer.isBuffer(a) ? n = a.length : typeof a == "string" && (n = Buffer.byteLength(a)), this._valueLength += n, this._overheadLength += Buffer.byteLength(e) + R.LINE_BREAK.length, !(!a || !a.path && !(a.readable && a.hasOwnProperty("httpVersion")) && !(a instanceof Js)) && (i.knownLength || this._valuesToMeasure.push(a));
};
R.prototype._lengthRetriever = function(e, a) {
  e.hasOwnProperty("fd") ? e.end != null && e.end != 1 / 0 && e.start != null ? a(null, e.end + 1 - (e.start ? e.start : 0)) : Ws.stat(e.path, function(i, n) {
    var s;
    if (i) {
      a(i);
      return;
    }
    s = n.size - (e.start ? e.start : 0), a(null, s);
  }) : e.hasOwnProperty("httpVersion") ? a(null, +e.headers["content-length"]) : e.hasOwnProperty("httpModule") ? (e.on("response", function(i) {
    e.pause(), a(null, +i.headers["content-length"]);
  }), e.resume()) : a("Unknown stream");
};
R.prototype._multiPartHeader = function(e, a, i) {
  if (typeof i.header == "string")
    return i.header;
  var n = this._getContentDisposition(a, i), s = this._getContentType(a, i), o = "", t = {
    // add custom disposition as third element or keep it two elements if not
    "Content-Disposition": ["form-data", 'name="' + e + '"'].concat(n || []),
    // if no content type. allow it to be empty array
    "Content-Type": [].concat(s || [])
  };
  typeof i.header == "object" && pa(t, i.header);
  var c;
  for (var d in t)
    t.hasOwnProperty(d) && (c = t[d], c != null && (Array.isArray(c) || (c = [c]), c.length && (o += d + ": " + c.join("; ") + R.LINE_BREAK)));
  return "--" + this.getBoundary() + R.LINE_BREAK + o + R.LINE_BREAK;
};
R.prototype._getContentDisposition = function(e, a) {
  var i, n;
  return typeof a.filepath == "string" ? i = Xe.normalize(a.filepath).replace(/\\/g, "/") : a.filename || e.name || e.path ? i = Xe.basename(a.filename || e.name || e.path) : e.readable && e.hasOwnProperty("httpVersion") && (i = Xe.basename(e.client._httpMessage.path || "")), i && (n = 'filename="' + i + '"'), n;
};
R.prototype._getContentType = function(e, a) {
  var i = a.contentType;
  return !i && e.name && (i = Ye.lookup(e.name)), !i && e.path && (i = Ye.lookup(e.path)), !i && e.readable && e.hasOwnProperty("httpVersion") && (i = e.headers["content-type"]), !i && (a.filepath || a.filename) && (i = Ye.lookup(a.filepath || a.filename)), !i && typeof e == "object" && (i = R.DEFAULT_CONTENT_TYPE), i;
};
R.prototype._multiPartFooter = function() {
  return (function(e) {
    var a = R.LINE_BREAK, i = this._streams.length === 0;
    i && (a += this._lastBoundary()), e(a);
  }).bind(this);
};
R.prototype._lastBoundary = function() {
  return "--" + this.getBoundary() + "--" + R.LINE_BREAK;
};
R.prototype.getHeaders = function(e) {
  var a, i = {
    "content-type": "multipart/form-data; boundary=" + this.getBoundary()
  };
  for (a in e)
    e.hasOwnProperty(a) && (i[a.toLowerCase()] = e[a]);
  return i;
};
R.prototype.setBoundary = function(e) {
  this._boundary = e;
};
R.prototype.getBoundary = function() {
  return this._boundary || this._generateBoundary(), this._boundary;
};
R.prototype.getBuffer = function() {
  for (var e = new Buffer.alloc(0), a = this.getBoundary(), i = 0, n = this._streams.length; i < n; i++)
    typeof this._streams[i] != "function" && (Buffer.isBuffer(this._streams[i]) ? e = Buffer.concat([e, this._streams[i]]) : e = Buffer.concat([e, Buffer.from(this._streams[i])]), (typeof this._streams[i] != "string" || this._streams[i].substring(2, a.length + 2) !== a) && (e = Buffer.concat([e, Buffer.from(R.LINE_BREAK)])));
  return Buffer.concat([e, Buffer.from(this._lastBoundary())]);
};
R.prototype._generateBoundary = function() {
  for (var e = "--------------------------", a = 0; a < 24; a++)
    e += Math.floor(Math.random() * 10).toString(16);
  this._boundary = e;
};
R.prototype.getLengthSync = function() {
  var e = this._overheadLength + this._valueLength;
  return this._streams.length && (e += this._lastBoundary().length), this.hasKnownLength() || this._error(new Error("Cannot calculate proper length in synchronous way.")), e;
};
R.prototype.hasKnownLength = function() {
  var e = !0;
  return this._valuesToMeasure.length && (e = !1), e;
};
R.prototype.getLength = function(e) {
  var a = this._overheadLength + this._valueLength;
  if (this._streams.length && (a += this._lastBoundary().length), !this._valuesToMeasure.length) {
    process.nextTick(e.bind(this, null, a));
    return;
  }
  Ks.parallel(this._valuesToMeasure, this._lengthRetriever, function(i, n) {
    if (i) {
      e(i);
      return;
    }
    n.forEach(function(s) {
      a += s;
    }), e(null, a);
  });
};
R.prototype.submit = function(e, a) {
  var i, n, s = { method: "post" };
  return typeof e == "string" ? (e = Vs(e), n = pa({
    port: e.port,
    path: e.pathname,
    host: e.hostname,
    protocol: e.protocol
  }, s)) : (n = pa(e, s), n.port || (n.port = n.protocol == "https:" ? 443 : 80)), n.headers = this.getHeaders(e.headers), n.protocol == "https:" ? i = Hs.request(n) : i = Ms.request(n), this.getLength((function(o, t) {
    if (o && o !== "Unknown stream") {
      this._error(o);
      return;
    }
    if (t && i.setHeader("Content-Length", t), this.pipe(i), a) {
      var c, d = function(u, r) {
        return i.removeListener("error", d), i.removeListener("response", c), a.call(this, u, r);
      };
      c = d.bind(this, null), i.on("error", d), i.on("response", c);
    }
  }).bind(this)), i;
};
R.prototype._error = function(e) {
  this.error || (this.error = e, this.pause(), this.emit("error", e));
};
R.prototype.toString = function() {
  return "[object FormData]";
};
const Mi = /* @__PURE__ */ Fi(Gs);
function la(e) {
  return p.isPlainObject(e) || p.isArray(e);
}
function Hi(e) {
  return p.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function Ga(e, a, i) {
  return e ? e.concat(a).map(function(s, o) {
    return s = Hi(s), !i && o ? "[" + s + "]" : s;
  }).join(i ? "." : "") : a;
}
function Xs(e) {
  return p.isArray(e) && !e.some(la);
}
const Ys = p.toFlatObject(p, {}, null, function(a) {
  return /^is[A-Z]/.test(a);
});
function He(e, a, i) {
  if (!p.isObject(e))
    throw new TypeError("target must be an object");
  a = a || new (Mi || FormData)(), i = p.toFlatObject(i, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(v, x) {
    return !p.isUndefined(x[v]);
  });
  const n = i.metaTokens, s = i.visitor || r, o = i.dots, t = i.indexes, d = (i.Blob || typeof Blob < "u" && Blob) && p.isSpecCompliantForm(a);
  if (!p.isFunction(s))
    throw new TypeError("visitor must be a function");
  function u(f) {
    if (f === null) return "";
    if (p.isDate(f))
      return f.toISOString();
    if (!d && p.isBlob(f))
      throw new b("Blob is not supported. Use a Buffer instead.");
    return p.isArrayBuffer(f) || p.isTypedArray(f) ? d && typeof Blob == "function" ? new Blob([f]) : Buffer.from(f) : f;
  }
  function r(f, v, x) {
    let g = f;
    if (f && !x && typeof f == "object") {
      if (p.endsWith(v, "{}"))
        v = n ? v : v.slice(0, -2), f = JSON.stringify(f);
      else if (p.isArray(f) && Xs(f) || (p.isFileList(f) || p.endsWith(v, "[]")) && (g = p.toArray(f)))
        return v = Hi(v), g.forEach(function(y, S) {
          !(p.isUndefined(y) || y === null) && a.append(
            // eslint-disable-next-line no-nested-ternary
            t === !0 ? Ga([v], S, o) : t === null ? v : v + "[]",
            u(y)
          );
        }), !1;
    }
    return la(f) ? !0 : (a.append(Ga(x, v, o), u(f)), !1);
  }
  const l = [], m = Object.assign(Ys, {
    defaultVisitor: r,
    convertValue: u,
    isVisitable: la
  });
  function h(f, v) {
    if (!p.isUndefined(f)) {
      if (l.indexOf(f) !== -1)
        throw Error("Circular reference detected in " + v.join("."));
      l.push(f), p.forEach(f, function(g, w) {
        (!(p.isUndefined(g) || g === null) && s.call(
          a,
          g,
          p.isString(w) ? w.trim() : w,
          v,
          m
        )) === !0 && h(g, v ? v.concat(w) : [w]);
      }), l.pop();
    }
  }
  if (!p.isObject(e))
    throw new TypeError("data must be an object");
  return h(e), a;
}
function Xa(e) {
  const a = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(n) {
    return a[n];
  });
}
function Vi(e, a) {
  this._pairs = [], e && He(e, this, a);
}
const Wi = Vi.prototype;
Wi.append = function(a, i) {
  this._pairs.push([a, i]);
};
Wi.toString = function(a) {
  const i = a ? function(n) {
    return a.call(this, n, Xa);
  } : Xa;
  return this._pairs.map(function(s) {
    return i(s[0]) + "=" + i(s[1]);
  }, "").join("&");
};
function Zs(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function Sa(e, a, i) {
  if (!a)
    return e;
  const n = i && i.encode || Zs, s = i && i.serialize;
  let o;
  if (s ? o = s(a, i) : o = p.isURLSearchParams(a) ? a.toString() : new Vi(a, i).toString(n), o) {
    const t = e.indexOf("#");
    t !== -1 && (e = e.slice(0, t)), e += (e.indexOf("?") === -1 ? "?" : "&") + o;
  }
  return e;
}
class Ya {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(a, i, n) {
    return this.handlers.push({
      fulfilled: a,
      rejected: i,
      synchronous: n ? n.synchronous : !1,
      runWhen: n ? n.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(a) {
    this.handlers[a] && (this.handlers[a] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(a) {
    p.forEach(this.handlers, function(n) {
      n !== null && a(n);
    });
  }
}
const Ca = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Qs = Ne.URLSearchParams, eo = {
  isNode: !0,
  classes: {
    URLSearchParams: Qs,
    FormData: Mi,
    Blob: typeof Blob < "u" && Blob || null
  },
  protocols: ["http", "https", "file", "data"]
}, Ta = typeof window < "u" && typeof document < "u", ua = typeof navigator == "object" && navigator || void 0, ao = Ta && (!ua || ["ReactNative", "NativeScript", "NS"].indexOf(ua.product) < 0), io = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", no = Ta && window.location.href || "http://localhost", so = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: Ta,
  hasStandardBrowserEnv: ao,
  hasStandardBrowserWebWorkerEnv: io,
  navigator: ua,
  origin: no
}, Symbol.toStringTag, { value: "Module" })), O = {
  ...so,
  ...eo
};
function oo(e, a) {
  return He(e, new O.classes.URLSearchParams(), Object.assign({
    visitor: function(i, n, s, o) {
      return O.isNode && p.isBuffer(i) ? (this.append(n, i.toString("base64")), !1) : o.defaultVisitor.apply(this, arguments);
    }
  }, a));
}
function to(e) {
  return p.matchAll(/\w+|\[(\w*)]/g, e).map((a) => a[0] === "[]" ? "" : a[1] || a[0]);
}
function ro(e) {
  const a = {}, i = Object.keys(e);
  let n;
  const s = i.length;
  let o;
  for (n = 0; n < s; n++)
    o = i[n], a[o] = e[o];
  return a;
}
function Ji(e) {
  function a(i, n, s, o) {
    let t = i[o++];
    if (t === "__proto__") return !0;
    const c = Number.isFinite(+t), d = o >= i.length;
    return t = !t && p.isArray(s) ? s.length : t, d ? (p.hasOwnProp(s, t) ? s[t] = [s[t], n] : s[t] = n, !c) : ((!s[t] || !p.isObject(s[t])) && (s[t] = []), a(i, n, s[t], o) && p.isArray(s[t]) && (s[t] = ro(s[t])), !c);
  }
  if (p.isFormData(e) && p.isFunction(e.entries)) {
    const i = {};
    return p.forEachEntry(e, (n, s) => {
      a(to(n), s, i, 0);
    }), i;
  }
  return null;
}
function co(e, a, i) {
  if (p.isString(e))
    try {
      return (a || JSON.parse)(e), p.trim(e);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (0, JSON.stringify)(e);
}
const _e = {
  transitional: Ca,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(a, i) {
    const n = i.getContentType() || "", s = n.indexOf("application/json") > -1, o = p.isObject(a);
    if (o && p.isHTMLForm(a) && (a = new FormData(a)), p.isFormData(a))
      return s ? JSON.stringify(Ji(a)) : a;
    if (p.isArrayBuffer(a) || p.isBuffer(a) || p.isStream(a) || p.isFile(a) || p.isBlob(a) || p.isReadableStream(a))
      return a;
    if (p.isArrayBufferView(a))
      return a.buffer;
    if (p.isURLSearchParams(a))
      return i.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), a.toString();
    let c;
    if (o) {
      if (n.indexOf("application/x-www-form-urlencoded") > -1)
        return oo(a, this.formSerializer).toString();
      if ((c = p.isFileList(a)) || n.indexOf("multipart/form-data") > -1) {
        const d = this.env && this.env.FormData;
        return He(
          c ? { "files[]": a } : a,
          d && new d(),
          this.formSerializer
        );
      }
    }
    return o || s ? (i.setContentType("application/json", !1), co(a)) : a;
  }],
  transformResponse: [function(a) {
    const i = this.transitional || _e.transitional, n = i && i.forcedJSONParsing, s = this.responseType === "json";
    if (p.isResponse(a) || p.isReadableStream(a))
      return a;
    if (a && p.isString(a) && (n && !this.responseType || s)) {
      const t = !(i && i.silentJSONParsing) && s;
      try {
        return JSON.parse(a);
      } catch (c) {
        if (t)
          throw c.name === "SyntaxError" ? b.from(c, b.ERR_BAD_RESPONSE, this, null, this.response) : c;
      }
    }
    return a;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: O.classes.FormData,
    Blob: O.classes.Blob
  },
  validateStatus: function(a) {
    return a >= 200 && a < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
p.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  _e.headers[e] = {};
});
const po = p.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), lo = (e) => {
  const a = {};
  let i, n, s;
  return e && e.split(`
`).forEach(function(t) {
    s = t.indexOf(":"), i = t.substring(0, s).trim().toLowerCase(), n = t.substring(s + 1).trim(), !(!i || a[i] && po[i]) && (i === "set-cookie" ? a[i] ? a[i].push(n) : a[i] = [n] : a[i] = a[i] ? a[i] + ", " + n : n);
  }), a;
}, Za = Symbol("internals");
function me(e) {
  return e && String(e).trim().toLowerCase();
}
function Fe(e) {
  return e === !1 || e == null ? e : p.isArray(e) ? e.map(Fe) : String(e);
}
function uo(e) {
  const a = /* @__PURE__ */ Object.create(null), i = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = i.exec(e); )
    a[n[1]] = n[2];
  return a;
}
const mo = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Ze(e, a, i, n, s) {
  if (p.isFunction(n))
    return n.call(this, a, i);
  if (s && (a = i), !!p.isString(a)) {
    if (p.isString(n))
      return a.indexOf(n) !== -1;
    if (p.isRegExp(n))
      return n.test(a);
  }
}
function fo(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (a, i, n) => i.toUpperCase() + n);
}
function xo(e, a) {
  const i = p.toCamelCase(" " + a);
  ["get", "set", "has"].forEach((n) => {
    Object.defineProperty(e, n + i, {
      value: function(s, o, t) {
        return this[n].call(this, a, s, o, t);
      },
      configurable: !0
    });
  });
}
class L {
  constructor(a) {
    a && this.set(a);
  }
  set(a, i, n) {
    const s = this;
    function o(c, d, u) {
      const r = me(d);
      if (!r)
        throw new Error("header name must be a non-empty string");
      const l = p.findKey(s, r);
      (!l || s[l] === void 0 || u === !0 || u === void 0 && s[l] !== !1) && (s[l || d] = Fe(c));
    }
    const t = (c, d) => p.forEach(c, (u, r) => o(u, r, d));
    if (p.isPlainObject(a) || a instanceof this.constructor)
      t(a, i);
    else if (p.isString(a) && (a = a.trim()) && !mo(a))
      t(lo(a), i);
    else if (p.isHeaders(a))
      for (const [c, d] of a.entries())
        o(d, c, n);
    else
      a != null && o(i, a, n);
    return this;
  }
  get(a, i) {
    if (a = me(a), a) {
      const n = p.findKey(this, a);
      if (n) {
        const s = this[n];
        if (!i)
          return s;
        if (i === !0)
          return uo(s);
        if (p.isFunction(i))
          return i.call(this, s, n);
        if (p.isRegExp(i))
          return i.exec(s);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(a, i) {
    if (a = me(a), a) {
      const n = p.findKey(this, a);
      return !!(n && this[n] !== void 0 && (!i || Ze(this, this[n], n, i)));
    }
    return !1;
  }
  delete(a, i) {
    const n = this;
    let s = !1;
    function o(t) {
      if (t = me(t), t) {
        const c = p.findKey(n, t);
        c && (!i || Ze(n, n[c], c, i)) && (delete n[c], s = !0);
      }
    }
    return p.isArray(a) ? a.forEach(o) : o(a), s;
  }
  clear(a) {
    const i = Object.keys(this);
    let n = i.length, s = !1;
    for (; n--; ) {
      const o = i[n];
      (!a || Ze(this, this[o], o, a, !0)) && (delete this[o], s = !0);
    }
    return s;
  }
  normalize(a) {
    const i = this, n = {};
    return p.forEach(this, (s, o) => {
      const t = p.findKey(n, o);
      if (t) {
        i[t] = Fe(s), delete i[o];
        return;
      }
      const c = a ? fo(o) : String(o).trim();
      c !== o && delete i[o], i[c] = Fe(s), n[c] = !0;
    }), this;
  }
  concat(...a) {
    return this.constructor.concat(this, ...a);
  }
  toJSON(a) {
    const i = /* @__PURE__ */ Object.create(null);
    return p.forEach(this, (n, s) => {
      n != null && n !== !1 && (i[s] = a && p.isArray(n) ? n.join(", ") : n);
    }), i;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([a, i]) => a + ": " + i).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(a) {
    return a instanceof this ? a : new this(a);
  }
  static concat(a, ...i) {
    const n = new this(a);
    return i.forEach((s) => n.set(s)), n;
  }
  static accessor(a) {
    const n = (this[Za] = this[Za] = {
      accessors: {}
    }).accessors, s = this.prototype;
    function o(t) {
      const c = me(t);
      n[c] || (xo(s, t), n[c] = !0);
    }
    return p.isArray(a) ? a.forEach(o) : o(a), this;
  }
}
L.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
p.reduceDescriptors(L.prototype, ({ value: e }, a) => {
  let i = a[0].toUpperCase() + a.slice(1);
  return {
    get: () => e,
    set(n) {
      this[i] = n;
    }
  };
});
p.freezeMethods(L);
function Qe(e, a) {
  const i = this || _e, n = a || i, s = L.from(n.headers);
  let o = n.data;
  return p.forEach(e, function(c) {
    o = c.call(i, o, s.normalize(), a ? a.status : void 0);
  }), s.normalize(), o;
}
function Ki(e) {
  return !!(e && e.__CANCEL__);
}
function Q(e, a, i) {
  b.call(this, e ?? "canceled", b.ERR_CANCELED, a, i), this.name = "CanceledError";
}
p.inherits(Q, b, {
  __CANCEL__: !0
});
function ce(e, a, i) {
  const n = i.config.validateStatus;
  !i.status || !n || n(i.status) ? e(i) : a(new b(
    "Request failed with status code " + i.status,
    [b.ERR_BAD_REQUEST, b.ERR_BAD_RESPONSE][Math.floor(i.status / 100) - 4],
    i.config,
    i.request,
    i
  ));
}
function ho(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function vo(e, a) {
  return a ? e.replace(/\/?\/$/, "") + "/" + a.replace(/^\/+/, "") : e;
}
function Oa(e, a) {
  return e && !ho(a) ? vo(e, a) : a;
}
var bo = Ne.parse, go = {
  ftp: 21,
  gopher: 70,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
}, yo = String.prototype.endsWith || function(e) {
  return e.length <= this.length && this.indexOf(e, this.length - e.length) !== -1;
};
function wo(e) {
  var a = typeof e == "string" ? bo(e) : e || {}, i = a.protocol, n = a.host, s = a.port;
  if (typeof n != "string" || !n || typeof i != "string" || (i = i.split(":", 1)[0], n = n.replace(/:\d*$/, ""), s = parseInt(s) || go[i] || 0, !ko(n, s)))
    return "";
  var o = pe("npm_config_" + i + "_proxy") || pe(i + "_proxy") || pe("npm_config_proxy") || pe("all_proxy");
  return o && o.indexOf("://") === -1 && (o = i + "://" + o), o;
}
function ko(e, a) {
  var i = (pe("npm_config_no_proxy") || pe("no_proxy")).toLowerCase();
  return i ? i === "*" ? !1 : i.split(/[,\s]/).every(function(n) {
    if (!n)
      return !0;
    var s = n.match(/^(.+):(\d+)$/), o = s ? s[1] : n, t = s ? parseInt(s[2]) : 0;
    return t && t !== a ? !0 : /^[.*]/.test(o) ? (o.charAt(0) === "*" && (o = o.slice(1)), !yo.call(e, o)) : e !== o;
  }) : !0;
}
function pe(e) {
  return process.env[e.toLowerCase()] || process.env[e.toUpperCase()] || "";
}
var _o = wo, Fa = { exports: {} }, Se = { exports: {} }, Ce = { exports: {} }, ea, Qa;
function Eo() {
  if (Qa) return ea;
  Qa = 1;
  var e = 1e3, a = e * 60, i = a * 60, n = i * 24, s = n * 7, o = n * 365.25;
  ea = function(r, l) {
    l = l || {};
    var m = typeof r;
    if (m === "string" && r.length > 0)
      return t(r);
    if (m === "number" && isFinite(r))
      return l.long ? d(r) : c(r);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(r)
    );
  };
  function t(r) {
    if (r = String(r), !(r.length > 100)) {
      var l = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        r
      );
      if (l) {
        var m = parseFloat(l[1]), h = (l[2] || "ms").toLowerCase();
        switch (h) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return m * o;
          case "weeks":
          case "week":
          case "w":
            return m * s;
          case "days":
          case "day":
          case "d":
            return m * n;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return m * i;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return m * a;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return m * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return m;
          default:
            return;
        }
      }
    }
  }
  function c(r) {
    var l = Math.abs(r);
    return l >= n ? Math.round(r / n) + "d" : l >= i ? Math.round(r / i) + "h" : l >= a ? Math.round(r / a) + "m" : l >= e ? Math.round(r / e) + "s" : r + "ms";
  }
  function d(r) {
    var l = Math.abs(r);
    return l >= n ? u(r, l, n, "day") : l >= i ? u(r, l, i, "hour") : l >= a ? u(r, l, a, "minute") : l >= e ? u(r, l, e, "second") : r + " ms";
  }
  function u(r, l, m, h) {
    var f = l >= m * 1.5;
    return Math.round(r / m) + " " + h + (f ? "s" : "");
  }
  return ea;
}
var aa, ei;
function Gi() {
  if (ei) return aa;
  ei = 1;
  function e(a) {
    n.debug = n, n.default = n, n.coerce = u, n.disable = t, n.enable = o, n.enabled = c, n.humanize = Eo(), n.destroy = r, Object.keys(a).forEach((l) => {
      n[l] = a[l];
    }), n.names = [], n.skips = [], n.formatters = {};
    function i(l) {
      let m = 0;
      for (let h = 0; h < l.length; h++)
        m = (m << 5) - m + l.charCodeAt(h), m |= 0;
      return n.colors[Math.abs(m) % n.colors.length];
    }
    n.selectColor = i;
    function n(l) {
      let m, h = null, f, v;
      function x(...g) {
        if (!x.enabled)
          return;
        const w = x, y = Number(/* @__PURE__ */ new Date()), S = y - (m || y);
        w.diff = S, w.prev = m, w.curr = y, m = y, g[0] = n.coerce(g[0]), typeof g[0] != "string" && g.unshift("%O");
        let E = 0;
        g[0] = g[0].replace(/%([a-zA-Z%])/g, (z, M) => {
          if (z === "%%")
            return "%";
          E++;
          const W = n.formatters[M];
          if (typeof W == "function") {
            const re = g[E];
            z = W.call(w, re), g.splice(E, 1), E--;
          }
          return z;
        }), n.formatArgs.call(w, g), (w.log || n.log).apply(w, g);
      }
      return x.namespace = l, x.useColors = n.useColors(), x.color = n.selectColor(l), x.extend = s, x.destroy = n.destroy, Object.defineProperty(x, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => h !== null ? h : (f !== n.namespaces && (f = n.namespaces, v = n.enabled(l)), v),
        set: (g) => {
          h = g;
        }
      }), typeof n.init == "function" && n.init(x), x;
    }
    function s(l, m) {
      const h = n(this.namespace + (typeof m > "u" ? ":" : m) + l);
      return h.log = this.log, h;
    }
    function o(l) {
      n.save(l), n.namespaces = l, n.names = [], n.skips = [];
      let m;
      const h = (typeof l == "string" ? l : "").split(/[\s,]+/), f = h.length;
      for (m = 0; m < f; m++)
        h[m] && (l = h[m].replace(/\*/g, ".*?"), l[0] === "-" ? n.skips.push(new RegExp("^" + l.slice(1) + "$")) : n.names.push(new RegExp("^" + l + "$")));
    }
    function t() {
      const l = [
        ...n.names.map(d),
        ...n.skips.map(d).map((m) => "-" + m)
      ].join(",");
      return n.enable(""), l;
    }
    function c(l) {
      if (l[l.length - 1] === "*")
        return !0;
      let m, h;
      for (m = 0, h = n.skips.length; m < h; m++)
        if (n.skips[m].test(l))
          return !1;
      for (m = 0, h = n.names.length; m < h; m++)
        if (n.names[m].test(l))
          return !0;
      return !1;
    }
    function d(l) {
      return l.toString().substring(2, l.toString().length - 2).replace(/\.\*\?$/, "*");
    }
    function u(l) {
      return l instanceof Error ? l.stack || l.message : l;
    }
    function r() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return n.enable(n.load()), n;
  }
  return aa = e, aa;
}
var ai;
function Ro() {
  return ai || (ai = 1, function(e, a) {
    a.formatArgs = n, a.save = s, a.load = o, a.useColors = i, a.storage = t(), a.destroy = /* @__PURE__ */ (() => {
      let d = !1;
      return () => {
        d || (d = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), a.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function i() {
      if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
        return !0;
      if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
        return !1;
      let d;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (d = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(d[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function n(d) {
      if (d[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + d[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
        return;
      const u = "color: " + this.color;
      d.splice(1, 0, u, "color: inherit");
      let r = 0, l = 0;
      d[0].replace(/%[a-zA-Z%]/g, (m) => {
        m !== "%%" && (r++, m === "%c" && (l = r));
      }), d.splice(l, 0, u);
    }
    a.log = console.debug || console.log || (() => {
    });
    function s(d) {
      try {
        d ? a.storage.setItem("debug", d) : a.storage.removeItem("debug");
      } catch {
      }
    }
    function o() {
      let d;
      try {
        d = a.storage.getItem("debug");
      } catch {
      }
      return !d && typeof process < "u" && "env" in process && (d = process.env.DEBUG), d;
    }
    function t() {
      try {
        return localStorage;
      } catch {
      }
    }
    e.exports = Gi()(a);
    const { formatters: c } = e.exports;
    c.j = function(d) {
      try {
        return JSON.stringify(d);
      } catch (u) {
        return "[UnexpectedJSONParseError]: " + u.message;
      }
    };
  }(Ce, Ce.exports)), Ce.exports;
}
var Te = { exports: {} }, ia, ii;
function jo() {
  return ii || (ii = 1, ia = (e, a) => {
    a = a || process.argv;
    const i = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", n = a.indexOf(i + e), s = a.indexOf("--");
    return n !== -1 && (s === -1 ? !0 : n < s);
  }), ia;
}
var na, ni;
function So() {
  if (ni) return na;
  ni = 1;
  const e = wn, a = jo(), i = process.env;
  let n;
  a("no-color") || a("no-colors") || a("color=false") ? n = !1 : (a("color") || a("colors") || a("color=true") || a("color=always")) && (n = !0), "FORCE_COLOR" in i && (n = i.FORCE_COLOR.length === 0 || parseInt(i.FORCE_COLOR, 10) !== 0);
  function s(c) {
    return c === 0 ? !1 : {
      level: c,
      hasBasic: !0,
      has256: c >= 2,
      has16m: c >= 3
    };
  }
  function o(c) {
    if (n === !1)
      return 0;
    if (a("color=16m") || a("color=full") || a("color=truecolor"))
      return 3;
    if (a("color=256"))
      return 2;
    if (c && !c.isTTY && n !== !0)
      return 0;
    const d = n ? 1 : 0;
    if (process.platform === "win32") {
      const u = e.release().split(".");
      return Number(process.versions.node.split(".")[0]) >= 8 && Number(u[0]) >= 10 && Number(u[2]) >= 10586 ? Number(u[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in i)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI"].some((u) => u in i) || i.CI_NAME === "codeship" ? 1 : d;
    if ("TEAMCITY_VERSION" in i)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(i.TEAMCITY_VERSION) ? 1 : 0;
    if (i.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in i) {
      const u = parseInt((i.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (i.TERM_PROGRAM) {
        case "iTerm.app":
          return u >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(i.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(i.TERM) || "COLORTERM" in i ? 1 : (i.TERM === "dumb", d);
  }
  function t(c) {
    const d = o(c);
    return s(d);
  }
  return na = {
    supportsColor: t,
    stdout: t(process.stdout),
    stderr: t(process.stderr)
  }, na;
}
var si;
function Co() {
  return si || (si = 1, function(e, a) {
    const i = yn, n = we;
    a.init = r, a.log = c, a.formatArgs = o, a.save = d, a.load = u, a.useColors = s, a.destroy = n.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), a.colors = [6, 2, 3, 4, 5, 1];
    try {
      const m = So();
      m && (m.stderr || m).level >= 2 && (a.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ]);
    } catch {
    }
    a.inspectOpts = Object.keys(process.env).filter((m) => /^debug_/i.test(m)).reduce((m, h) => {
      const f = h.substring(6).toLowerCase().replace(/_([a-z])/g, (x, g) => g.toUpperCase());
      let v = process.env[h];
      return /^(yes|on|true|enabled)$/i.test(v) ? v = !0 : /^(no|off|false|disabled)$/i.test(v) ? v = !1 : v === "null" ? v = null : v = Number(v), m[f] = v, m;
    }, {});
    function s() {
      return "colors" in a.inspectOpts ? !!a.inspectOpts.colors : i.isatty(process.stderr.fd);
    }
    function o(m) {
      const { namespace: h, useColors: f } = this;
      if (f) {
        const v = this.color, x = "\x1B[3" + (v < 8 ? v : "8;5;" + v), g = `  ${x};1m${h} \x1B[0m`;
        m[0] = g + m[0].split(`
`).join(`
` + g), m.push(x + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
      } else
        m[0] = t() + h + " " + m[0];
    }
    function t() {
      return a.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function c(...m) {
      return process.stderr.write(n.formatWithOptions(a.inspectOpts, ...m) + `
`);
    }
    function d(m) {
      m ? process.env.DEBUG = m : delete process.env.DEBUG;
    }
    function u() {
      return process.env.DEBUG;
    }
    function r(m) {
      m.inspectOpts = {};
      const h = Object.keys(a.inspectOpts);
      for (let f = 0; f < h.length; f++)
        m.inspectOpts[h[f]] = a.inspectOpts[h[f]];
    }
    e.exports = Gi()(a);
    const { formatters: l } = e.exports;
    l.o = function(m) {
      return this.inspectOpts.colors = this.useColors, n.inspect(m, this.inspectOpts).split(`
`).map((h) => h.trim()).join(" ");
    }, l.O = function(m) {
      return this.inspectOpts.colors = this.useColors, n.inspect(m, this.inspectOpts);
    };
  }(Te, Te.exports)), Te.exports;
}
var oi;
function To() {
  return oi || (oi = 1, typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? Se.exports = Ro() : Se.exports = Co()), Se.exports;
}
var fe, Oo = function() {
  if (!fe) {
    try {
      fe = To()("follow-redirects");
    } catch {
    }
    typeof fe != "function" && (fe = function() {
    });
  }
  fe.apply(null, arguments);
}, Ee = Ne, be = Ee.URL, Fo = _a, Lo = Ea, La = $.Writable, Aa = gn, Xi = Oo;
(function() {
  var a = typeof process < "u", i = typeof window < "u" && typeof document < "u", n = oe(Error.captureStackTrace);
  !a && (i || !n) && console.warn("The follow-redirects package should be excluded from browser builds.");
})();
var za = !1;
try {
  Aa(new be(""));
} catch (e) {
  za = e.code === "ERR_INVALID_URL";
}
var Ao = [
  "auth",
  "host",
  "hostname",
  "href",
  "path",
  "pathname",
  "port",
  "protocol",
  "query",
  "search",
  "hash"
], qa = ["abort", "aborted", "connect", "error", "socket", "timeout"], Pa = /* @__PURE__ */ Object.create(null);
qa.forEach(function(e) {
  Pa[e] = function(a, i, n) {
    this._redirectable.emit(e, a, i, n);
  };
});
var da = Re(
  "ERR_INVALID_URL",
  "Invalid URL",
  TypeError
), ma = Re(
  "ERR_FR_REDIRECTION_FAILURE",
  "Redirected request failed"
), zo = Re(
  "ERR_FR_TOO_MANY_REDIRECTS",
  "Maximum number of redirects exceeded",
  ma
), qo = Re(
  "ERR_FR_MAX_BODY_LENGTH_EXCEEDED",
  "Request body larger than maxBodyLength limit"
), Po = Re(
  "ERR_STREAM_WRITE_AFTER_END",
  "write after end"
), Bo = La.prototype.destroy || Zi;
function B(e, a) {
  La.call(this), this._sanitizeOptions(e), this._options = e, this._ended = !1, this._ending = !1, this._redirectCount = 0, this._redirects = [], this._requestBodyLength = 0, this._requestBodyBuffers = [], a && this.on("response", a);
  var i = this;
  this._onNativeResponse = function(n) {
    try {
      i._processResponse(n);
    } catch (s) {
      i.emit("error", s instanceof ma ? s : new ma({ cause: s }));
    }
  }, this._performRequest();
}
B.prototype = Object.create(La.prototype);
B.prototype.abort = function() {
  Ua(this._currentRequest), this._currentRequest.abort(), this.emit("abort");
};
B.prototype.destroy = function(e) {
  return Ua(this._currentRequest, e), Bo.call(this, e), this;
};
B.prototype.write = function(e, a, i) {
  if (this._ending)
    throw new Po();
  if (!ne(e) && !Do(e))
    throw new TypeError("data should be a string, Buffer or Uint8Array");
  if (oe(a) && (i = a, a = null), e.length === 0) {
    i && i();
    return;
  }
  this._requestBodyLength + e.length <= this._options.maxBodyLength ? (this._requestBodyLength += e.length, this._requestBodyBuffers.push({ data: e, encoding: a }), this._currentRequest.write(e, a, i)) : (this.emit("error", new qo()), this.abort());
};
B.prototype.end = function(e, a, i) {
  if (oe(e) ? (i = e, e = a = null) : oe(a) && (i = a, a = null), !e)
    this._ended = this._ending = !0, this._currentRequest.end(null, null, i);
  else {
    var n = this, s = this._currentRequest;
    this.write(e, a, function() {
      n._ended = !0, s.end(null, null, i);
    }), this._ending = !0;
  }
};
B.prototype.setHeader = function(e, a) {
  this._options.headers[e] = a, this._currentRequest.setHeader(e, a);
};
B.prototype.removeHeader = function(e) {
  delete this._options.headers[e], this._currentRequest.removeHeader(e);
};
B.prototype.setTimeout = function(e, a) {
  var i = this;
  function n(t) {
    t.setTimeout(e), t.removeListener("timeout", t.destroy), t.addListener("timeout", t.destroy);
  }
  function s(t) {
    i._timeout && clearTimeout(i._timeout), i._timeout = setTimeout(function() {
      i.emit("timeout"), o();
    }, e), n(t);
  }
  function o() {
    i._timeout && (clearTimeout(i._timeout), i._timeout = null), i.removeListener("abort", o), i.removeListener("error", o), i.removeListener("response", o), i.removeListener("close", o), a && i.removeListener("timeout", a), i.socket || i._currentRequest.removeListener("socket", s);
  }
  return a && this.on("timeout", a), this.socket ? s(this.socket) : this._currentRequest.once("socket", s), this.on("socket", n), this.on("abort", o), this.on("error", o), this.on("response", o), this.on("close", o), this;
};
[
  "flushHeaders",
  "getHeader",
  "setNoDelay",
  "setSocketKeepAlive"
].forEach(function(e) {
  B.prototype[e] = function(a, i) {
    return this._currentRequest[e](a, i);
  };
});
["aborted", "connection", "socket"].forEach(function(e) {
  Object.defineProperty(B.prototype, e, {
    get: function() {
      return this._currentRequest[e];
    }
  });
});
B.prototype._sanitizeOptions = function(e) {
  if (e.headers || (e.headers = {}), e.host && (e.hostname || (e.hostname = e.host), delete e.host), !e.pathname && e.path) {
    var a = e.path.indexOf("?");
    a < 0 ? e.pathname = e.path : (e.pathname = e.path.substring(0, a), e.search = e.path.substring(a));
  }
};
B.prototype._performRequest = function() {
  var e = this._options.protocol, a = this._options.nativeProtocols[e];
  if (!a)
    throw new TypeError("Unsupported protocol " + e);
  if (this._options.agents) {
    var i = e.slice(0, -1);
    this._options.agent = this._options.agents[i];
  }
  var n = this._currentRequest = a.request(this._options, this._onNativeResponse);
  n._redirectable = this;
  for (var s of qa)
    n.on(s, Pa[s]);
  if (this._currentUrl = /^\//.test(this._options.path) ? Ee.format(this._options) : (
    // When making a request to a proxy, […]
    // a client MUST send the target URI in absolute-form […].
    this._options.path
  ), this._isRedirect) {
    var o = 0, t = this, c = this._requestBodyBuffers;
    (function d(u) {
      if (n === t._currentRequest)
        if (u)
          t.emit("error", u);
        else if (o < c.length) {
          var r = c[o++];
          n.finished || n.write(r.data, r.encoding, d);
        } else t._ended && n.end();
    })();
  }
};
B.prototype._processResponse = function(e) {
  var a = e.statusCode;
  this._options.trackRedirects && this._redirects.push({
    url: this._currentUrl,
    headers: e.headers,
    statusCode: a
  });
  var i = e.headers.location;
  if (!i || this._options.followRedirects === !1 || a < 300 || a >= 400) {
    e.responseUrl = this._currentUrl, e.redirects = this._redirects, this.emit("response", e), this._requestBodyBuffers = [];
    return;
  }
  if (Ua(this._currentRequest), e.destroy(), ++this._redirectCount > this._options.maxRedirects)
    throw new zo();
  var n, s = this._options.beforeRedirect;
  s && (n = Object.assign({
    // The Host header was set by nativeProtocol.request
    Host: e.req.getHeader("host")
  }, this._options.headers));
  var o = this._options.method;
  ((a === 301 || a === 302) && this._options.method === "POST" || // RFC7231§6.4.4: The 303 (See Other) status code indicates that
  // the server is redirecting the user agent to a different resource […]
  // A user agent can perform a retrieval request targeting that URI
  // (a GET or HEAD request if using HTTP) […]
  a === 303 && !/^(?:GET|HEAD)$/.test(this._options.method)) && (this._options.method = "GET", this._requestBodyBuffers = [], sa(/^content-/i, this._options.headers));
  var t = sa(/^host$/i, this._options.headers), c = Ba(this._currentUrl), d = t || c.host, u = /^\w+:/.test(i) ? this._currentUrl : Ee.format(Object.assign(c, { host: d })), r = Uo(i, u);
  if (Xi("redirecting to", r.href), this._isRedirect = !0, fa(r, this._options), (r.protocol !== c.protocol && r.protocol !== "https:" || r.host !== d && !No(r.host, d)) && sa(/^(?:(?:proxy-)?authorization|cookie)$/i, this._options.headers), oe(s)) {
    var l = {
      headers: e.headers,
      statusCode: a
    }, m = {
      url: u,
      method: o,
      headers: n
    };
    s(this._options, l, m), this._sanitizeOptions(this._options);
  }
  this._performRequest();
};
function Yi(e) {
  var a = {
    maxRedirects: 21,
    maxBodyLength: 10485760
  }, i = {};
  return Object.keys(e).forEach(function(n) {
    var s = n + ":", o = i[s] = e[n], t = a[n] = Object.create(o);
    function c(u, r, l) {
      return Io(u) ? u = fa(u) : ne(u) ? u = fa(Ba(u)) : (l = r, r = Qi(u), u = { protocol: s }), oe(r) && (l = r, r = null), r = Object.assign({
        maxRedirects: a.maxRedirects,
        maxBodyLength: a.maxBodyLength
      }, u, r), r.nativeProtocols = i, !ne(r.host) && !ne(r.hostname) && (r.hostname = "::1"), Aa.equal(r.protocol, s, "protocol mismatch"), Xi("options", r), new B(r, l);
    }
    function d(u, r, l) {
      var m = t.request(u, r, l);
      return m.end(), m;
    }
    Object.defineProperties(t, {
      request: { value: c, configurable: !0, enumerable: !0, writable: !0 },
      get: { value: d, configurable: !0, enumerable: !0, writable: !0 }
    });
  }), a;
}
function Zi() {
}
function Ba(e) {
  var a;
  if (za)
    a = new be(e);
  else if (a = Qi(Ee.parse(e)), !ne(a.protocol))
    throw new da({ input: e });
  return a;
}
function Uo(e, a) {
  return za ? new be(e, a) : Ba(Ee.resolve(a, e));
}
function Qi(e) {
  if (/^\[/.test(e.hostname) && !/^\[[:0-9a-f]+\]$/i.test(e.hostname))
    throw new da({ input: e.href || e });
  if (/^\[/.test(e.host) && !/^\[[:0-9a-f]+\](:\d+)?$/i.test(e.host))
    throw new da({ input: e.href || e });
  return e;
}
function fa(e, a) {
  var i = a || {};
  for (var n of Ao)
    i[n] = e[n];
  return i.hostname.startsWith("[") && (i.hostname = i.hostname.slice(1, -1)), i.port !== "" && (i.port = Number(i.port)), i.path = i.search ? i.pathname + i.search : i.pathname, i;
}
function sa(e, a) {
  var i;
  for (var n in a)
    e.test(n) && (i = a[n], delete a[n]);
  return i === null || typeof i > "u" ? void 0 : String(i).trim();
}
function Re(e, a, i) {
  function n(s) {
    oe(Error.captureStackTrace) && Error.captureStackTrace(this, this.constructor), Object.assign(this, s || {}), this.code = e, this.message = this.cause ? a + ": " + this.cause.message : a;
  }
  return n.prototype = new (i || Error)(), Object.defineProperties(n.prototype, {
    constructor: {
      value: n,
      enumerable: !1
    },
    name: {
      value: "Error [" + e + "]",
      enumerable: !1
    }
  }), n;
}
function Ua(e, a) {
  for (var i of qa)
    e.removeListener(i, Pa[i]);
  e.on("error", Zi), e.destroy(a);
}
function No(e, a) {
  Aa(ne(e) && ne(a));
  var i = e.length - a.length - 1;
  return i > 0 && e[i] === "." && e.endsWith(a);
}
function ne(e) {
  return typeof e == "string" || e instanceof String;
}
function oe(e) {
  return typeof e == "function";
}
function Do(e) {
  return typeof e == "object" && "length" in e;
}
function Io(e) {
  return be && e instanceof be;
}
Fa.exports = Yi({ http: Fo, https: Lo });
Fa.exports.wrap = Yi;
var $o = Fa.exports;
const Mo = /* @__PURE__ */ Fi($o), ze = "1.7.7";
function en(e) {
  const a = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return a && a[1] || "";
}
const Ho = /^(?:([^;]+);)?(?:[^;]+;)?(base64|),([\s\S]*)$/;
function Vo(e, a, i) {
  const n = i && i.Blob || O.classes.Blob, s = en(e);
  if (a === void 0 && n && (a = !0), s === "data") {
    e = s.length ? e.slice(s.length + 1) : e;
    const o = Ho.exec(e);
    if (!o)
      throw new b("Invalid URL", b.ERR_INVALID_URL);
    const t = o[1], c = o[2], d = o[3], u = Buffer.from(decodeURIComponent(d), c ? "base64" : "utf8");
    if (a) {
      if (!n)
        throw new b("Blob is not supported", b.ERR_NOT_SUPPORT);
      return new n([u], { type: t });
    }
    return u;
  }
  throw new b("Unsupported protocol " + s, b.ERR_NOT_SUPPORT);
}
const oa = Symbol("internals");
class ti extends $.Transform {
  constructor(a) {
    a = p.toFlatObject(a, {
      maxRate: 0,
      chunkSize: 64 * 1024,
      minChunkSize: 100,
      timeWindow: 500,
      ticksRate: 2,
      samplesCount: 15
    }, null, (n, s) => !p.isUndefined(s[n])), super({
      readableHighWaterMark: a.chunkSize
    });
    const i = this[oa] = {
      timeWindow: a.timeWindow,
      chunkSize: a.chunkSize,
      maxRate: a.maxRate,
      minChunkSize: a.minChunkSize,
      bytesSeen: 0,
      isCaptured: !1,
      notifiedBytesLoaded: 0,
      ts: Date.now(),
      bytes: 0,
      onReadCallback: null
    };
    this.on("newListener", (n) => {
      n === "progress" && (i.isCaptured || (i.isCaptured = !0));
    });
  }
  _read(a) {
    const i = this[oa];
    return i.onReadCallback && i.onReadCallback(), super._read(a);
  }
  _transform(a, i, n) {
    const s = this[oa], o = s.maxRate, t = this.readableHighWaterMark, c = s.timeWindow, d = 1e3 / c, u = o / d, r = s.minChunkSize !== !1 ? Math.max(s.minChunkSize, u * 0.01) : 0, l = (h, f) => {
      const v = Buffer.byteLength(h);
      s.bytesSeen += v, s.bytes += v, s.isCaptured && this.emit("progress", s.bytesSeen), this.push(h) ? process.nextTick(f) : s.onReadCallback = () => {
        s.onReadCallback = null, process.nextTick(f);
      };
    }, m = (h, f) => {
      const v = Buffer.byteLength(h);
      let x = null, g = t, w, y = 0;
      if (o) {
        const S = Date.now();
        (!s.ts || (y = S - s.ts) >= c) && (s.ts = S, w = u - s.bytes, s.bytes = w < 0 ? -w : 0, y = 0), w = u - s.bytes;
      }
      if (o) {
        if (w <= 0)
          return setTimeout(() => {
            f(null, h);
          }, c - y);
        w < g && (g = w);
      }
      g && v > g && v - g > r && (x = h.subarray(g), h = h.subarray(0, g)), l(h, x ? () => {
        process.nextTick(f, null, x);
      } : f);
    };
    m(a, function h(f, v) {
      if (f)
        return n(f);
      v ? m(v, h) : n(null);
    });
  }
}
const { asyncIterator: ri } = Symbol, an = async function* (e) {
  e.stream ? yield* e.stream() : e.arrayBuffer ? yield await e.arrayBuffer() : e[ri] ? yield* e[ri]() : yield e;
}, Wo = p.ALPHABET.ALPHA_DIGIT + "-_", ge = new vn(), X = `\r
`, Jo = ge.encode(X), Ko = 2;
class Go {
  constructor(a, i) {
    const { escapeName: n } = this.constructor, s = p.isString(i);
    let o = `Content-Disposition: form-data; name="${n(a)}"${!s && i.name ? `; filename="${n(i.name)}"` : ""}${X}`;
    s ? i = ge.encode(String(i).replace(/\r?\n|\r\n?/g, X)) : o += `Content-Type: ${i.type || "application/octet-stream"}${X}`, this.headers = ge.encode(o + X), this.contentLength = s ? i.byteLength : i.size, this.size = this.headers.byteLength + this.contentLength + Ko, this.name = a, this.value = i;
  }
  async *encode() {
    yield this.headers;
    const { value: a } = this;
    p.isTypedArray(a) ? yield a : yield* an(a), yield Jo;
  }
  static escapeName(a) {
    return String(a).replace(/[\r\n"]/g, (i) => ({
      "\r": "%0D",
      "\n": "%0A",
      '"': "%22"
    })[i]);
  }
}
const Xo = (e, a, i) => {
  const {
    tag: n = "form-data-boundary",
    size: s = 25,
    boundary: o = n + "-" + p.generateString(s, Wo)
  } = i || {};
  if (!p.isFormData(e))
    throw TypeError("FormData instance required");
  if (o.length < 1 || o.length > 70)
    throw Error("boundary must be 10-70 characters long");
  const t = ge.encode("--" + o + X), c = ge.encode("--" + o + "--" + X + X);
  let d = c.byteLength;
  const u = Array.from(e.entries()).map(([l, m]) => {
    const h = new Go(l, m);
    return d += h.size, h;
  });
  d += t.byteLength * u.length, d = p.toFiniteNumber(d);
  const r = {
    "Content-Type": `multipart/form-data; boundary=${o}`
  };
  return Number.isFinite(d) && (r["Content-Length"] = d), a && a(r), bn.from(async function* () {
    for (const l of u)
      yield t, yield* l.encode();
    yield c;
  }());
};
class Yo extends $.Transform {
  __transform(a, i, n) {
    this.push(a), n();
  }
  _transform(a, i, n) {
    if (a.length !== 0 && (this._transform = this.__transform, a[0] !== 120)) {
      const s = Buffer.alloc(2);
      s[0] = 120, s[1] = 156, this.push(s, i);
    }
    this.__transform(a, i, n);
  }
}
const Zo = (e, a) => p.isAsyncFn(e) ? function(...i) {
  const n = i.pop();
  e.apply(this, i).then((s) => {
    try {
      a ? n(null, ...a(s)) : n(null, s);
    } catch (o) {
      n(o);
    }
  }, n);
} : e;
function Qo(e, a) {
  e = e || 10;
  const i = new Array(e), n = new Array(e);
  let s = 0, o = 0, t;
  return a = a !== void 0 ? a : 1e3, function(d) {
    const u = Date.now(), r = n[o];
    t || (t = u), i[s] = d, n[s] = u;
    let l = o, m = 0;
    for (; l !== s; )
      m += i[l++], l = l % e;
    if (s = (s + 1) % e, s === o && (o = (o + 1) % e), u - t < a)
      return;
    const h = r && u - r;
    return h ? Math.round(m * 1e3 / h) : void 0;
  };
}
function et(e, a) {
  let i = 0, n = 1e3 / a, s, o;
  const t = (u, r = Date.now()) => {
    i = r, s = null, o && (clearTimeout(o), o = null), e.apply(null, u);
  };
  return [(...u) => {
    const r = Date.now(), l = r - i;
    l >= n ? t(u, r) : (s = u, o || (o = setTimeout(() => {
      o = null, t(s);
    }, n - l)));
  }, () => s && t(s)];
}
const le = (e, a, i = 3) => {
  let n = 0;
  const s = Qo(50, 250);
  return et((o) => {
    const t = o.loaded, c = o.lengthComputable ? o.total : void 0, d = t - n, u = s(d), r = t <= c;
    n = t;
    const l = {
      loaded: t,
      total: c,
      progress: c ? t / c : void 0,
      bytes: d,
      rate: u || void 0,
      estimated: u && c && r ? (c - t) / u : void 0,
      event: o,
      lengthComputable: c != null,
      [a ? "download" : "upload"]: !0
    };
    e(l);
  }, i);
}, qe = (e, a) => {
  const i = e != null;
  return [(n) => a[0]({
    lengthComputable: i,
    total: e,
    loaded: n
  }), a[1]];
}, Pe = (e) => (...a) => p.asap(() => e(...a)), ci = {
  flush: Z.constants.Z_SYNC_FLUSH,
  finishFlush: Z.constants.Z_SYNC_FLUSH
}, at = {
  flush: Z.constants.BROTLI_OPERATION_FLUSH,
  finishFlush: Z.constants.BROTLI_OPERATION_FLUSH
}, pi = p.isFunction(Z.createBrotliDecompress), { http: it, https: nt } = Mo, st = /https:?/, li = O.protocols.map((e) => e + ":"), ui = (e, [a, i]) => (e.on("end", i).on("error", i), a);
function ot(e, a) {
  e.beforeRedirects.proxy && e.beforeRedirects.proxy(e), e.beforeRedirects.config && e.beforeRedirects.config(e, a);
}
function nn(e, a, i) {
  let n = a;
  if (!n && n !== !1) {
    const s = _o(i);
    s && (n = new URL(s));
  }
  if (n) {
    if (n.username && (n.auth = (n.username || "") + ":" + (n.password || "")), n.auth) {
      (n.auth.username || n.auth.password) && (n.auth = (n.auth.username || "") + ":" + (n.auth.password || ""));
      const o = Buffer.from(n.auth, "utf8").toString("base64");
      e.headers["Proxy-Authorization"] = "Basic " + o;
    }
    e.headers.host = e.hostname + (e.port ? ":" + e.port : "");
    const s = n.hostname || n.host;
    e.hostname = s, e.host = s, e.port = n.port, e.path = i, n.protocol && (e.protocol = n.protocol.includes(":") ? n.protocol : `${n.protocol}:`);
  }
  e.beforeRedirects.proxy = function(o) {
    nn(o, a, o.href);
  };
}
const tt = typeof process < "u" && p.kindOf(process) === "process", rt = (e) => new Promise((a, i) => {
  let n, s;
  const o = (d, u) => {
    s || (s = !0, n && n(d, u));
  }, t = (d) => {
    o(d), a(d);
  }, c = (d) => {
    o(d, !0), i(d);
  };
  e(t, c, (d) => n = d).catch(c);
}), ct = ({ address: e, family: a }) => {
  if (!p.isString(e))
    throw TypeError("address must be a string");
  return {
    address: e,
    family: a || (e.indexOf(".") < 0 ? 6 : 4)
  };
}, di = (e, a) => ct(p.isObject(e) ? e : { address: e, family: a }), pt = tt && function(a) {
  return rt(async function(n, s, o) {
    let { data: t, lookup: c, family: d } = a;
    const { responseType: u, responseEncoding: r } = a, l = a.method.toUpperCase();
    let m, h = !1, f;
    if (c) {
      const _ = Zo(c, (k) => p.isArray(k) ? k : [k]);
      c = (k, A, ee) => {
        _(k, A, (F, K, Je) => {
          if (F)
            return ee(F);
          const J = p.isArray(K) ? K.map((D) => di(D)) : [di(K, Je)];
          A.all ? ee(F, J) : ee(F, J[0].address, J[0].family);
        });
      };
    }
    const v = new kn(), x = () => {
      a.cancelToken && a.cancelToken.unsubscribe(g), a.signal && a.signal.removeEventListener("abort", g), v.removeAllListeners();
    };
    o((_, k) => {
      m = !0, k && (h = !0, x());
    });
    function g(_) {
      v.emit("abort", !_ || _.type ? new Q(null, a, f) : _);
    }
    v.once("abort", s), (a.cancelToken || a.signal) && (a.cancelToken && a.cancelToken.subscribe(g), a.signal && (a.signal.aborted ? g() : a.signal.addEventListener("abort", g)));
    const w = Oa(a.baseURL, a.url), y = new URL(w, O.hasBrowserEnv ? O.origin : void 0), S = y.protocol || li[0];
    if (S === "data:") {
      let _;
      if (l !== "GET")
        return ce(n, s, {
          status: 405,
          statusText: "method not allowed",
          headers: {},
          config: a
        });
      try {
        _ = Vo(a.url, u === "blob", {
          Blob: a.env && a.env.Blob
        });
      } catch (k) {
        throw b.from(k, b.ERR_BAD_REQUEST, a);
      }
      return u === "text" ? (_ = _.toString(r), (!r || r === "utf8") && (_ = p.stripBOM(_))) : u === "stream" && (_ = $.Readable.from(_)), ce(n, s, {
        data: _,
        status: 200,
        statusText: "OK",
        headers: new L(),
        config: a
      });
    }
    if (li.indexOf(S) === -1)
      return s(new b(
        "Unsupported protocol " + S,
        b.ERR_BAD_REQUEST,
        a
      ));
    const E = L.from(a.headers).normalize();
    E.set("User-Agent", "axios/" + ze, !1);
    const { onUploadProgress: U, onDownloadProgress: z } = a, M = a.maxRate;
    let W, re;
    if (p.isSpecCompliantForm(t)) {
      const _ = E.getContentType(/boundary=([-_\w\d]{10,70})/i);
      t = Xo(t, (k) => {
        E.set(k);
      }, {
        tag: `axios-${ze}-boundary`,
        boundary: _ && _[1] || void 0
      });
    } else if (p.isFormData(t) && p.isFunction(t.getHeaders)) {
      if (E.set(t.getHeaders()), !E.hasContentLength())
        try {
          const _ = await we.promisify(t.getLength).call(t);
          Number.isFinite(_) && _ >= 0 && E.setContentLength(_);
        } catch {
        }
    } else if (p.isBlob(t))
      t.size && E.setContentType(t.type || "application/octet-stream"), E.setContentLength(t.size || 0), t = $.Readable.from(an(t));
    else if (t && !p.isStream(t)) {
      if (!Buffer.isBuffer(t)) if (p.isArrayBuffer(t))
        t = Buffer.from(new Uint8Array(t));
      else if (p.isString(t))
        t = Buffer.from(t, "utf-8");
      else
        return s(new b(
          "Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream",
          b.ERR_BAD_REQUEST,
          a
        ));
      if (E.setContentLength(t.length, !1), a.maxBodyLength > -1 && t.length > a.maxBodyLength)
        return s(new b(
          "Request body larger than maxBodyLength limit",
          b.ERR_BAD_REQUEST,
          a
        ));
    }
    const mn = p.toFiniteNumber(E.getContentLength());
    p.isArray(M) ? (W = M[0], re = M[1]) : W = re = M, t && (U || W) && (p.isStream(t) || (t = $.Readable.from(t, { objectMode: !1 })), t = $.pipeline([t, new ti({
      maxRate: p.toFiniteNumber(W)
    })], p.noop), U && t.on("progress", ui(
      t,
      qe(
        mn,
        le(Pe(U), !1, 3)
      )
    )));
    let de;
    if (a.auth) {
      const _ = a.auth.username || "", k = a.auth.password || "";
      de = _ + ":" + k;
    }
    if (!de && y.username) {
      const _ = y.username, k = y.password;
      de = _ + ":" + k;
    }
    de && E.delete("authorization");
    let Ia;
    try {
      Ia = Sa(
        y.pathname + y.search,
        a.params,
        a.paramsSerializer
      ).replace(/^\?/, "");
    } catch (_) {
      const k = new Error(_.message);
      return k.config = a, k.url = a.url, k.exists = !0, s(k);
    }
    E.set(
      "Accept-Encoding",
      "gzip, compress, deflate" + (pi ? ", br" : ""),
      !1
    );
    const P = {
      path: Ia,
      method: l,
      headers: E.toJSON(),
      agents: { http: a.httpAgent, https: a.httpsAgent },
      auth: de,
      protocol: S,
      family: d,
      beforeRedirect: ot,
      beforeRedirects: {}
    };
    !p.isUndefined(c) && (P.lookup = c), a.socketPath ? P.socketPath = a.socketPath : (P.hostname = y.hostname.startsWith("[") ? y.hostname.slice(1, -1) : y.hostname, P.port = y.port, nn(P, a.proxy, S + "//" + y.hostname + (y.port ? ":" + y.port : "") + P.path));
    let je;
    const We = st.test(P.protocol);
    if (P.agent = We ? a.httpsAgent : a.httpAgent, a.transport ? je = a.transport : a.maxRedirects === 0 ? je = We ? Ea : _a : (a.maxRedirects && (P.maxRedirects = a.maxRedirects), a.beforeRedirect && (P.beforeRedirects.config = a.beforeRedirect), je = We ? nt : it), a.maxBodyLength > -1 ? P.maxBodyLength = a.maxBodyLength : P.maxBodyLength = 1 / 0, a.insecureHTTPParser && (P.insecureHTTPParser = a.insecureHTTPParser), f = je.request(P, function(k) {
      if (f.destroyed) return;
      const A = [k], ee = +k.headers["content-length"];
      if (z || re) {
        const D = new ti({
          maxRate: p.toFiniteNumber(re)
        });
        z && D.on("progress", ui(
          D,
          qe(
            ee,
            le(Pe(z), !0, 3)
          )
        )), A.push(D);
      }
      let F = k;
      const K = k.req || f;
      if (a.decompress !== !1 && k.headers["content-encoding"])
        switch ((l === "HEAD" || k.statusCode === 204) && delete k.headers["content-encoding"], (k.headers["content-encoding"] || "").toLowerCase()) {
          case "gzip":
          case "x-gzip":
          case "compress":
          case "x-compress":
            A.push(Z.createUnzip(ci)), delete k.headers["content-encoding"];
            break;
          case "deflate":
            A.push(new Yo()), A.push(Z.createUnzip(ci)), delete k.headers["content-encoding"];
            break;
          case "br":
            pi && (A.push(Z.createBrotliDecompress(at)), delete k.headers["content-encoding"]);
        }
      F = A.length > 1 ? $.pipeline(A, p.noop) : A[0];
      const Je = $.finished(F, () => {
        Je(), x();
      }), J = {
        status: k.statusCode,
        statusText: k.statusMessage,
        headers: new L(k.headers),
        config: a,
        request: K
      };
      if (u === "stream")
        J.data = F, ce(n, s, J);
      else {
        const D = [];
        let $a = 0;
        F.on("data", function(q) {
          D.push(q), $a += q.length, a.maxContentLength > -1 && $a > a.maxContentLength && (h = !0, F.destroy(), s(new b(
            "maxContentLength size of " + a.maxContentLength + " exceeded",
            b.ERR_BAD_RESPONSE,
            a,
            K
          )));
        }), F.on("aborted", function() {
          if (h)
            return;
          const q = new b(
            "maxContentLength size of " + a.maxContentLength + " exceeded",
            b.ERR_BAD_RESPONSE,
            a,
            K
          );
          F.destroy(q), s(q);
        }), F.on("error", function(q) {
          f.destroyed || s(b.from(q, null, a, K));
        }), F.on("end", function() {
          try {
            let q = D.length === 1 ? D[0] : Buffer.concat(D);
            u !== "arraybuffer" && (q = q.toString(r), (!r || r === "utf8") && (q = p.stripBOM(q))), J.data = q;
          } catch (q) {
            return s(b.from(q, null, a, J.request, J));
          }
          ce(n, s, J);
        });
      }
      v.once("abort", (D) => {
        F.destroyed || (F.emit("error", D), F.destroy());
      });
    }), v.once("abort", (_) => {
      s(_), f.destroy(_);
    }), f.on("error", function(k) {
      s(b.from(k, null, a, f));
    }), f.on("socket", function(k) {
      k.setKeepAlive(!0, 1e3 * 60);
    }), a.timeout) {
      const _ = parseInt(a.timeout, 10);
      if (Number.isNaN(_)) {
        s(new b(
          "error trying to parse `config.timeout` to int",
          b.ERR_BAD_OPTION_VALUE,
          a,
          f
        ));
        return;
      }
      f.setTimeout(_, function() {
        if (m) return;
        let A = a.timeout ? "timeout of " + a.timeout + "ms exceeded" : "timeout exceeded";
        const ee = a.transitional || Ca;
        a.timeoutErrorMessage && (A = a.timeoutErrorMessage), s(new b(
          A,
          ee.clarifyTimeoutError ? b.ETIMEDOUT : b.ECONNABORTED,
          a,
          f
        )), g();
      });
    }
    if (p.isStream(t)) {
      let _ = !1, k = !1;
      t.on("end", () => {
        _ = !0;
      }), t.once("error", (A) => {
        k = !0, f.destroy(A);
      }), t.on("close", () => {
        !_ && !k && g(new Q("Request stream has been aborted", a, f));
      }), t.pipe(f);
    } else
      f.end(t);
  });
}, lt = O.hasStandardBrowserEnv ? (
  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function() {
    const a = O.navigator && /(msie|trident)/i.test(O.navigator.userAgent), i = document.createElement("a");
    let n;
    function s(o) {
      let t = o;
      return a && (i.setAttribute("href", t), t = i.href), i.setAttribute("href", t), {
        href: i.href,
        protocol: i.protocol ? i.protocol.replace(/:$/, "") : "",
        host: i.host,
        search: i.search ? i.search.replace(/^\?/, "") : "",
        hash: i.hash ? i.hash.replace(/^#/, "") : "",
        hostname: i.hostname,
        port: i.port,
        pathname: i.pathname.charAt(0) === "/" ? i.pathname : "/" + i.pathname
      };
    }
    return n = s(window.location.href), function(t) {
      const c = p.isString(t) ? s(t) : t;
      return c.protocol === n.protocol && c.host === n.host;
    };
  }()
) : (
  // Non standard browser envs (web workers, react-native) lack needed support.
  /* @__PURE__ */ function() {
    return function() {
      return !0;
    };
  }()
), ut = O.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, a, i, n, s, o) {
      const t = [e + "=" + encodeURIComponent(a)];
      p.isNumber(i) && t.push("expires=" + new Date(i).toGMTString()), p.isString(n) && t.push("path=" + n), p.isString(s) && t.push("domain=" + s), o === !0 && t.push("secure"), document.cookie = t.join("; ");
    },
    read(e) {
      const a = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
      return a ? decodeURIComponent(a[3]) : null;
    },
    remove(e) {
      this.write(e, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
), mi = (e) => e instanceof L ? { ...e } : e;
function te(e, a) {
  a = a || {};
  const i = {};
  function n(u, r, l) {
    return p.isPlainObject(u) && p.isPlainObject(r) ? p.merge.call({ caseless: l }, u, r) : p.isPlainObject(r) ? p.merge({}, r) : p.isArray(r) ? r.slice() : r;
  }
  function s(u, r, l) {
    if (p.isUndefined(r)) {
      if (!p.isUndefined(u))
        return n(void 0, u, l);
    } else return n(u, r, l);
  }
  function o(u, r) {
    if (!p.isUndefined(r))
      return n(void 0, r);
  }
  function t(u, r) {
    if (p.isUndefined(r)) {
      if (!p.isUndefined(u))
        return n(void 0, u);
    } else return n(void 0, r);
  }
  function c(u, r, l) {
    if (l in a)
      return n(u, r);
    if (l in e)
      return n(void 0, u);
  }
  const d = {
    url: o,
    method: o,
    data: o,
    baseURL: t,
    transformRequest: t,
    transformResponse: t,
    paramsSerializer: t,
    timeout: t,
    timeoutMessage: t,
    withCredentials: t,
    withXSRFToken: t,
    adapter: t,
    responseType: t,
    xsrfCookieName: t,
    xsrfHeaderName: t,
    onUploadProgress: t,
    onDownloadProgress: t,
    decompress: t,
    maxContentLength: t,
    maxBodyLength: t,
    beforeRedirect: t,
    transport: t,
    httpAgent: t,
    httpsAgent: t,
    cancelToken: t,
    socketPath: t,
    responseEncoding: t,
    validateStatus: c,
    headers: (u, r) => s(mi(u), mi(r), !0)
  };
  return p.forEach(Object.keys(Object.assign({}, e, a)), function(r) {
    const l = d[r] || s, m = l(e[r], a[r], r);
    p.isUndefined(m) && l !== c || (i[r] = m);
  }), i;
}
const sn = (e) => {
  const a = te({}, e);
  let { data: i, withXSRFToken: n, xsrfHeaderName: s, xsrfCookieName: o, headers: t, auth: c } = a;
  a.headers = t = L.from(t), a.url = Sa(Oa(a.baseURL, a.url), e.params, e.paramsSerializer), c && t.set(
    "Authorization",
    "Basic " + btoa((c.username || "") + ":" + (c.password ? unescape(encodeURIComponent(c.password)) : ""))
  );
  let d;
  if (p.isFormData(i)) {
    if (O.hasStandardBrowserEnv || O.hasStandardBrowserWebWorkerEnv)
      t.setContentType(void 0);
    else if ((d = t.getContentType()) !== !1) {
      const [u, ...r] = d ? d.split(";").map((l) => l.trim()).filter(Boolean) : [];
      t.setContentType([u || "multipart/form-data", ...r].join("; "));
    }
  }
  if (O.hasStandardBrowserEnv && (n && p.isFunction(n) && (n = n(a)), n || n !== !1 && lt(a.url))) {
    const u = s && o && ut.read(o);
    u && t.set(s, u);
  }
  return a;
}, dt = typeof XMLHttpRequest < "u", mt = dt && function(e) {
  return new Promise(function(i, n) {
    const s = sn(e);
    let o = s.data;
    const t = L.from(s.headers).normalize();
    let { responseType: c, onUploadProgress: d, onDownloadProgress: u } = s, r, l, m, h, f;
    function v() {
      h && h(), f && f(), s.cancelToken && s.cancelToken.unsubscribe(r), s.signal && s.signal.removeEventListener("abort", r);
    }
    let x = new XMLHttpRequest();
    x.open(s.method.toUpperCase(), s.url, !0), x.timeout = s.timeout;
    function g() {
      if (!x)
        return;
      const y = L.from(
        "getAllResponseHeaders" in x && x.getAllResponseHeaders()
      ), E = {
        data: !c || c === "text" || c === "json" ? x.responseText : x.response,
        status: x.status,
        statusText: x.statusText,
        headers: y,
        config: e,
        request: x
      };
      ce(function(z) {
        i(z), v();
      }, function(z) {
        n(z), v();
      }, E), x = null;
    }
    "onloadend" in x ? x.onloadend = g : x.onreadystatechange = function() {
      !x || x.readyState !== 4 || x.status === 0 && !(x.responseURL && x.responseURL.indexOf("file:") === 0) || setTimeout(g);
    }, x.onabort = function() {
      x && (n(new b("Request aborted", b.ECONNABORTED, e, x)), x = null);
    }, x.onerror = function() {
      n(new b("Network Error", b.ERR_NETWORK, e, x)), x = null;
    }, x.ontimeout = function() {
      let S = s.timeout ? "timeout of " + s.timeout + "ms exceeded" : "timeout exceeded";
      const E = s.transitional || Ca;
      s.timeoutErrorMessage && (S = s.timeoutErrorMessage), n(new b(
        S,
        E.clarifyTimeoutError ? b.ETIMEDOUT : b.ECONNABORTED,
        e,
        x
      )), x = null;
    }, o === void 0 && t.setContentType(null), "setRequestHeader" in x && p.forEach(t.toJSON(), function(S, E) {
      x.setRequestHeader(E, S);
    }), p.isUndefined(s.withCredentials) || (x.withCredentials = !!s.withCredentials), c && c !== "json" && (x.responseType = s.responseType), u && ([m, f] = le(u, !0), x.addEventListener("progress", m)), d && x.upload && ([l, h] = le(d), x.upload.addEventListener("progress", l), x.upload.addEventListener("loadend", h)), (s.cancelToken || s.signal) && (r = (y) => {
      x && (n(!y || y.type ? new Q(null, e, x) : y), x.abort(), x = null);
    }, s.cancelToken && s.cancelToken.subscribe(r), s.signal && (s.signal.aborted ? r() : s.signal.addEventListener("abort", r)));
    const w = en(s.url);
    if (w && O.protocols.indexOf(w) === -1) {
      n(new b("Unsupported protocol " + w + ":", b.ERR_BAD_REQUEST, e));
      return;
    }
    x.send(o || null);
  });
}, ft = (e, a) => {
  const { length: i } = e = e ? e.filter(Boolean) : [];
  if (a || i) {
    let n = new AbortController(), s;
    const o = function(u) {
      if (!s) {
        s = !0, c();
        const r = u instanceof Error ? u : this.reason;
        n.abort(r instanceof b ? r : new Q(r instanceof Error ? r.message : r));
      }
    };
    let t = a && setTimeout(() => {
      t = null, o(new b(`timeout ${a} of ms exceeded`, b.ETIMEDOUT));
    }, a);
    const c = () => {
      e && (t && clearTimeout(t), t = null, e.forEach((u) => {
        u.unsubscribe ? u.unsubscribe(o) : u.removeEventListener("abort", o);
      }), e = null);
    };
    e.forEach((u) => u.addEventListener("abort", o));
    const { signal: d } = n;
    return d.unsubscribe = () => p.asap(c), d;
  }
}, xt = function* (e, a) {
  let i = e.byteLength;
  if (i < a) {
    yield e;
    return;
  }
  let n = 0, s;
  for (; n < i; )
    s = n + a, yield e.slice(n, s), n = s;
}, ht = async function* (e, a) {
  for await (const i of vt(e))
    yield* xt(i, a);
}, vt = async function* (e) {
  if (e[Symbol.asyncIterator]) {
    yield* e;
    return;
  }
  const a = e.getReader();
  try {
    for (; ; ) {
      const { done: i, value: n } = await a.read();
      if (i)
        break;
      yield n;
    }
  } finally {
    await a.cancel();
  }
}, fi = (e, a, i, n) => {
  const s = ht(e, a);
  let o = 0, t, c = (d) => {
    t || (t = !0, n && n(d));
  };
  return new ReadableStream({
    async pull(d) {
      try {
        const { done: u, value: r } = await s.next();
        if (u) {
          c(), d.close();
          return;
        }
        let l = r.byteLength;
        if (i) {
          let m = o += l;
          i(m);
        }
        d.enqueue(new Uint8Array(r));
      } catch (u) {
        throw c(u), u;
      }
    },
    cancel(d) {
      return c(d), s.return();
    }
  }, {
    highWaterMark: 2
  });
}, Ve = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", on = Ve && typeof ReadableStream == "function", bt = Ve && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((e) => (a) => e.encode(a))(new TextEncoder()) : async (e) => new Uint8Array(await new Response(e).arrayBuffer())), tn = (e, ...a) => {
  try {
    return !!e(...a);
  } catch {
    return !1;
  }
}, gt = on && tn(() => {
  let e = !1;
  const a = new Request(O.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return e = !0, "half";
    }
  }).headers.has("Content-Type");
  return e && !a;
}), xi = 64 * 1024, xa = on && tn(() => p.isReadableStream(new Response("").body)), Be = {
  stream: xa && ((e) => e.body)
};
Ve && ((e) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((a) => {
    !Be[a] && (Be[a] = p.isFunction(e[a]) ? (i) => i[a]() : (i, n) => {
      throw new b(`Response type '${a}' is not supported`, b.ERR_NOT_SUPPORT, n);
    });
  });
})(new Response());
const yt = async (e) => {
  if (e == null)
    return 0;
  if (p.isBlob(e))
    return e.size;
  if (p.isSpecCompliantForm(e))
    return (await new Request(O.origin, {
      method: "POST",
      body: e
    }).arrayBuffer()).byteLength;
  if (p.isArrayBufferView(e) || p.isArrayBuffer(e))
    return e.byteLength;
  if (p.isURLSearchParams(e) && (e = e + ""), p.isString(e))
    return (await bt(e)).byteLength;
}, wt = async (e, a) => {
  const i = p.toFiniteNumber(e.getContentLength());
  return i ?? yt(a);
}, kt = Ve && (async (e) => {
  let {
    url: a,
    method: i,
    data: n,
    signal: s,
    cancelToken: o,
    timeout: t,
    onDownloadProgress: c,
    onUploadProgress: d,
    responseType: u,
    headers: r,
    withCredentials: l = "same-origin",
    fetchOptions: m
  } = sn(e);
  u = u ? (u + "").toLowerCase() : "text";
  let h = ft([s, o && o.toAbortSignal()], t), f;
  const v = h && h.unsubscribe && (() => {
    h.unsubscribe();
  });
  let x;
  try {
    if (d && gt && i !== "get" && i !== "head" && (x = await wt(r, n)) !== 0) {
      let E = new Request(a, {
        method: "POST",
        body: n,
        duplex: "half"
      }), U;
      if (p.isFormData(n) && (U = E.headers.get("content-type")) && r.setContentType(U), E.body) {
        const [z, M] = qe(
          x,
          le(Pe(d))
        );
        n = fi(E.body, xi, z, M);
      }
    }
    p.isString(l) || (l = l ? "include" : "omit");
    const g = "credentials" in Request.prototype;
    f = new Request(a, {
      ...m,
      signal: h,
      method: i.toUpperCase(),
      headers: r.normalize().toJSON(),
      body: n,
      duplex: "half",
      credentials: g ? l : void 0
    });
    let w = await fetch(f);
    const y = xa && (u === "stream" || u === "response");
    if (xa && (c || y && v)) {
      const E = {};
      ["status", "statusText", "headers"].forEach((W) => {
        E[W] = w[W];
      });
      const U = p.toFiniteNumber(w.headers.get("content-length")), [z, M] = c && qe(
        U,
        le(Pe(c), !0)
      ) || [];
      w = new Response(
        fi(w.body, xi, z, () => {
          M && M(), v && v();
        }),
        E
      );
    }
    u = u || "text";
    let S = await Be[p.findKey(Be, u) || "text"](w, e);
    return !y && v && v(), await new Promise((E, U) => {
      ce(E, U, {
        data: S,
        headers: L.from(w.headers),
        status: w.status,
        statusText: w.statusText,
        config: e,
        request: f
      });
    });
  } catch (g) {
    throw v && v(), g && g.name === "TypeError" && /fetch/i.test(g.message) ? Object.assign(
      new b("Network Error", b.ERR_NETWORK, e, f),
      {
        cause: g.cause || g
      }
    ) : b.from(g, g && g.code, e, f);
  }
}), ha = {
  http: pt,
  xhr: mt,
  fetch: kt
};
p.forEach(ha, (e, a) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: a });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: a });
  }
});
const hi = (e) => `- ${e}`, _t = (e) => p.isFunction(e) || e === null || e === !1, rn = {
  getAdapter: (e) => {
    e = p.isArray(e) ? e : [e];
    const { length: a } = e;
    let i, n;
    const s = {};
    for (let o = 0; o < a; o++) {
      i = e[o];
      let t;
      if (n = i, !_t(i) && (n = ha[(t = String(i)).toLowerCase()], n === void 0))
        throw new b(`Unknown adapter '${t}'`);
      if (n)
        break;
      s[t || "#" + o] = n;
    }
    if (!n) {
      const o = Object.entries(s).map(
        ([c, d]) => `adapter ${c} ` + (d === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let t = a ? o.length > 1 ? `since :
` + o.map(hi).join(`
`) : " " + hi(o[0]) : "as no adapter specified";
      throw new b(
        "There is no suitable adapter to dispatch the request " + t,
        "ERR_NOT_SUPPORT"
      );
    }
    return n;
  },
  adapters: ha
};
function ta(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new Q(null, e);
}
function vi(e) {
  return ta(e), e.headers = L.from(e.headers), e.data = Qe.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), rn.getAdapter(e.adapter || _e.adapter)(e).then(function(n) {
    return ta(e), n.data = Qe.call(
      e,
      e.transformResponse,
      n
    ), n.headers = L.from(n.headers), n;
  }, function(n) {
    return Ki(n) || (ta(e), n && n.response && (n.response.data = Qe.call(
      e,
      e.transformResponse,
      n.response
    ), n.response.headers = L.from(n.response.headers))), Promise.reject(n);
  });
}
const Na = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, a) => {
  Na[e] = function(n) {
    return typeof n === e || "a" + (a < 1 ? "n " : " ") + e;
  };
});
const bi = {};
Na.transitional = function(a, i, n) {
  function s(o, t) {
    return "[Axios v" + ze + "] Transitional option '" + o + "'" + t + (n ? ". " + n : "");
  }
  return (o, t, c) => {
    if (a === !1)
      throw new b(
        s(t, " has been removed" + (i ? " in " + i : "")),
        b.ERR_DEPRECATED
      );
    return i && !bi[t] && (bi[t] = !0, console.warn(
      s(
        t,
        " has been deprecated since v" + i + " and will be removed in the near future"
      )
    )), a ? a(o, t, c) : !0;
  };
};
function Et(e, a, i) {
  if (typeof e != "object")
    throw new b("options must be an object", b.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(e);
  let s = n.length;
  for (; s-- > 0; ) {
    const o = n[s], t = a[o];
    if (t) {
      const c = e[o], d = c === void 0 || t(c, o, e);
      if (d !== !0)
        throw new b("option " + o + " must be " + d, b.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (i !== !0)
      throw new b("Unknown option " + o, b.ERR_BAD_OPTION);
  }
}
const va = {
  assertOptions: Et,
  validators: Na
}, G = va.validators;
class se {
  constructor(a) {
    this.defaults = a, this.interceptors = {
      request: new Ya(),
      response: new Ya()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(a, i) {
    try {
      return await this._request(a, i);
    } catch (n) {
      if (n instanceof Error) {
        let s;
        Error.captureStackTrace ? Error.captureStackTrace(s = {}) : s = new Error();
        const o = s.stack ? s.stack.replace(/^.+\n/, "") : "";
        try {
          n.stack ? o && !String(n.stack).endsWith(o.replace(/^.+\n.+\n/, "")) && (n.stack += `
` + o) : n.stack = o;
        } catch {
        }
      }
      throw n;
    }
  }
  _request(a, i) {
    typeof a == "string" ? (i = i || {}, i.url = a) : i = a || {}, i = te(this.defaults, i);
    const { transitional: n, paramsSerializer: s, headers: o } = i;
    n !== void 0 && va.assertOptions(n, {
      silentJSONParsing: G.transitional(G.boolean),
      forcedJSONParsing: G.transitional(G.boolean),
      clarifyTimeoutError: G.transitional(G.boolean)
    }, !1), s != null && (p.isFunction(s) ? i.paramsSerializer = {
      serialize: s
    } : va.assertOptions(s, {
      encode: G.function,
      serialize: G.function
    }, !0)), i.method = (i.method || this.defaults.method || "get").toLowerCase();
    let t = o && p.merge(
      o.common,
      o[i.method]
    );
    o && p.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (f) => {
        delete o[f];
      }
    ), i.headers = L.concat(t, o);
    const c = [];
    let d = !0;
    this.interceptors.request.forEach(function(v) {
      typeof v.runWhen == "function" && v.runWhen(i) === !1 || (d = d && v.synchronous, c.unshift(v.fulfilled, v.rejected));
    });
    const u = [];
    this.interceptors.response.forEach(function(v) {
      u.push(v.fulfilled, v.rejected);
    });
    let r, l = 0, m;
    if (!d) {
      const f = [vi.bind(this), void 0];
      for (f.unshift.apply(f, c), f.push.apply(f, u), m = f.length, r = Promise.resolve(i); l < m; )
        r = r.then(f[l++], f[l++]);
      return r;
    }
    m = c.length;
    let h = i;
    for (l = 0; l < m; ) {
      const f = c[l++], v = c[l++];
      try {
        h = f(h);
      } catch (x) {
        v.call(this, x);
        break;
      }
    }
    try {
      r = vi.call(this, h);
    } catch (f) {
      return Promise.reject(f);
    }
    for (l = 0, m = u.length; l < m; )
      r = r.then(u[l++], u[l++]);
    return r;
  }
  getUri(a) {
    a = te(this.defaults, a);
    const i = Oa(a.baseURL, a.url);
    return Sa(i, a.params, a.paramsSerializer);
  }
}
p.forEach(["delete", "get", "head", "options"], function(a) {
  se.prototype[a] = function(i, n) {
    return this.request(te(n || {}, {
      method: a,
      url: i,
      data: (n || {}).data
    }));
  };
});
p.forEach(["post", "put", "patch"], function(a) {
  function i(n) {
    return function(o, t, c) {
      return this.request(te(c || {}, {
        method: a,
        headers: n ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: o,
        data: t
      }));
    };
  }
  se.prototype[a] = i(), se.prototype[a + "Form"] = i(!0);
});
class Da {
  constructor(a) {
    if (typeof a != "function")
      throw new TypeError("executor must be a function.");
    let i;
    this.promise = new Promise(function(o) {
      i = o;
    });
    const n = this;
    this.promise.then((s) => {
      if (!n._listeners) return;
      let o = n._listeners.length;
      for (; o-- > 0; )
        n._listeners[o](s);
      n._listeners = null;
    }), this.promise.then = (s) => {
      let o;
      const t = new Promise((c) => {
        n.subscribe(c), o = c;
      }).then(s);
      return t.cancel = function() {
        n.unsubscribe(o);
      }, t;
    }, a(function(o, t, c) {
      n.reason || (n.reason = new Q(o, t, c), i(n.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(a) {
    if (this.reason) {
      a(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(a) : this._listeners = [a];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(a) {
    if (!this._listeners)
      return;
    const i = this._listeners.indexOf(a);
    i !== -1 && this._listeners.splice(i, 1);
  }
  toAbortSignal() {
    const a = new AbortController(), i = (n) => {
      a.abort(n);
    };
    return this.subscribe(i), a.signal.unsubscribe = () => this.unsubscribe(i), a.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let a;
    return {
      token: new Da(function(s) {
        a = s;
      }),
      cancel: a
    };
  }
}
function Rt(e) {
  return function(i) {
    return e.apply(null, i);
  };
}
function jt(e) {
  return p.isObject(e) && e.isAxiosError === !0;
}
const ba = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(ba).forEach(([e, a]) => {
  ba[a] = e;
});
function cn(e) {
  const a = new se(e), i = wi(se.prototype.request, a);
  return p.extend(i, se.prototype, a, { allOwnKeys: !0 }), p.extend(i, a, null, { allOwnKeys: !0 }), i.create = function(s) {
    return cn(te(e, s));
  }, i;
}
const T = cn(_e);
T.Axios = se;
T.CanceledError = Q;
T.CancelToken = Da;
T.isCancel = Ki;
T.VERSION = ze;
T.toFormData = He;
T.AxiosError = b;
T.Cancel = T.CanceledError;
T.all = function(a) {
  return Promise.all(a);
};
T.spread = Rt;
T.isAxiosError = jt;
T.mergeConfig = te;
T.AxiosHeaders = L;
T.formToJSON = (e) => Ji(p.isHTMLForm(e) ? new FormData(e) : e);
T.getAdapter = rn.getAdapter;
T.HttpStatusCode = ba;
T.default = T;
const St = {
  Accept: "*/*",
  "Accept-Language": "en-US,en;q=0.9,si;q=0.8",
  "Content-Type": "application/json",
  DNT: "1",
  Origin: "https://promoscore.io",
  Priority: "u=1, i",
  Referer: "https://promoscore.io/offers",
  "Sec-CH-UA": '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
  "Sec-CH-UA-Mobile": "?0",
  "Sec-CH-UA-Platform": '"Linux"',
  "Sec-Fetch-Dest": "empty",
  "Sec-Fetch-Mode": "cors",
  "Sec-Fetch-Site": "same-origin",
  "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"
};
function Ct(e, a) {
  return T.post(
    `https://promoscore.io/api/search/search-promoscore-${a == "articles" ? "articles" : "promotions"}`,
    e,
    {
      headers: {
        ...St
      }
    }
  );
}
class Tt {
  constructor(a) {
    ae(this, "Callback");
    this.Callback = a;
  }
  error(a) {
    this.Callback("error", a);
  }
  log(a) {
    this.Callback("details", a);
  }
  warn(a) {
    this.Callback("warn", a);
  }
}
let j = null, ga = null;
function Ot(e) {
  return ga = e, j = new Tt(e), j;
}
function gi(e, a) {
  ga && ga(e, a);
}
async function pn(e, a) {
  j == null || j.log("searching _promoscore ....."), a || (a = e == "articles" ? En : _n);
  const { data: i } = await Ct(a, e);
  return i;
}
let ra = [];
function Ft(e, a) {
  return e.map((i) => {
    i = At(i, a);
    const n = { ...i };
    return i.mapPrice && (n.mapPrice.amount = (parseFloat(i.mapPrice.amount) / 100).toFixed(2)), i.unitPrice && (n.unitPrice.amount = (parseFloat(i.unitPrice.amount) / 100).toFixed(2)), n;
  });
}
const Lt = {
  articles: ["_index", "picture"],
  promotions: ["_geoloc", "_index", "graphee_id", "locations", "picture"]
};
function At(e, a) {
  if (!Array.isArray(e)) {
    const i = { ...e };
    return Lt[a].forEach((n) => {
      delete i[n];
    }), i;
  }
}
async function zt(e, a, i) {
  j == null || j.log("Start Engine in Main.... ");
  const n = `${e}_${Date.now()}`, s = new Rn(a, n, j);
  let o = 0, t = 1;
  i ? i[0].params.hitsPerPage = 100 : j == null || j.error("Body is Undefined");
  do
    try {
      j == null || j.log(`Fetching page ${o}`), i[0].params.page = o;
      const { results: c } = await pn(e, i);
      if (c.length > 0 && c[0].hits) {
        const { hits: u, nbPages: r } = c[0];
        console.log("Nb Page", r), ra = Ft(u, e), t = r, j == null || j.log(`Fetching page ${o} Done Out of ${t}`), s.appendData(ra);
      }
      o++;
      const d = (o / t * 100).toFixed(2);
      gi("progress", d), ra = [], o == t - 1 && gi("complete", "done");
    } catch (c) {
      c instanceof Error ? (console.error(c), j == null || j.error(`Main Loop Error: ${c.message}`)) : (console.error("Caught a non-Error value:", c), j == null || j.error("Main Loop Error: An unexpected error occurred"));
    }
  while (o < t);
  return await s.close(), {};
}
class qt {
  static async showError(a, i = "") {
    return await ka.showMessageBox({
      type: "error",
      title: "Error",
      message: a,
      detail: i || "Please try again. If the problem persists, contact support.",
      buttons: ["OK"],
      defaultId: 0,
      noLink: !0
    });
  }
  static async showDataFetchError() {
    return await this.showError(
      "Data Fetching Failed",
      "Unable to retrieve the requested data. Please check your connection and try again."
    );
  }
}
const ln = Y.dirname(hn(import.meta.url));
process.env.APP_ROOT = Y.join(ln, "..");
const ya = process.env.VITE_DEV_SERVER_URL, er = Y.join(process.env.APP_ROOT, "dist-electron"), un = Y.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = ya ? Y.join(process.env.APP_ROOT, "public") : un;
let I;
function dn() {
  I = new yi({
    width: 1e3,
    height: 800,
    resizable: !1,
    icon: Y.join(process.env.VITE_PUBLIC, "logo.png"),
    webPreferences: {
      preload: Y.join(ln, "./preload.mjs"),
      nodeIntegration: !0,
      contextIsolation: !1
    }
  }), I.webContents.on("did-finish-load", () => {
    I == null || I.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), ya ? I.loadURL(ya) : I.loadFile(Y.join(un, "index.html")), I.setMenu(null);
}
Le.on("window-all-closed", () => {
  process.platform !== "darwin" && (Le.quit(), I = null);
});
Le.on("activate", () => {
  yi.getAllWindows().length === 0 && dn();
});
Le.whenReady().then(dn);
const ye = (e, a) => {
  I && !I.isDestroyed() && I.webContents.send("event", { Type: e, message: a });
};
Ue.handle("openPathDialog", async () => await ka.showOpenDialog({
  properties: ["openDirectory"]
}));
const wa = Ot(ye), Pt = (e) => e.toFixed(2);
function Bt(e, a) {
  const i = [
    {
      timestamp: "",
      level: "table",
      message: e === "articles" ? "Product | Brand | Category | Packaging | Tendency" : "Product | Store | Price | Discount | Price/Unit"
    },
    {
      timestamp: "",
      level: "table",
      message: "-".repeat(60)
    }
  ], n = a.map((s) => {
    if (e === "articles") {
      const o = s;
      return {
        timestamp: "*",
        level: "table",
        message: `${o.name} | ${o.brand} | ${o.category} | ${o.packaging}`
      };
    } else {
      const o = s, t = o.mapPrice.amount / 100;
      return {
        timestamp: "*",
        level: "table",
        message: `${o.article.brand ? o.article.brand : "N/A"} | ${o.market} |${Pt(t)}/${o.mapPrice.currency}`
      };
    }
  });
  return [...i, ...n];
}
Ue.handle(
  "search_promoscore",
  async (e, a, i) => {
    wa.log("Searching"), console.log("seacing", i);
    const { results: n } = await pn(a, i);
    if (!n || n.length === 0)
      throw new Error("No results found");
    const { facets: s, nbHits: o, hits: t } = n[0];
    return o && ye("count", o), t && ye("data", Bt(a, t)), s;
  }
);
Ue.handle("show-file-path-error", async () => (await ka.showMessageBox({
  type: "error",
  title: "Configuration Error",
  message: "File Path Not Set",
  detail: "Please specify a valid file path in the application settings before proceeding. This is required for proper operation of the application.",
  buttons: ["Cancel"],
  defaultId: 0,
  cancelId: 1,
  noLink: !0
})).response);
let xe = !1;
Ue.on(
  "start",
  async (e, a, i, n) => {
    wa.log("Staring . . . . "), console.log(xe);
    try {
      xe || (xe = !0, await zt(a, n, i), xe = !1, ye("complete", !0));
    } catch (s) {
      console.error(s), wa.error(`Data fetching failed : ${s}`), qt.showDataFetchError(), ye("complete", !0), xe = !1;
    }
  }
);
export {
  er as MAIN_DIST,
  un as RENDERER_DIST,
  ya as VITE_DEV_SERVER_URL
};
