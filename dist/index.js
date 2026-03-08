var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i10 = decorators.length - 1, decorator; i10 >= 0; i10--)
    if (decorator = decorators[i10])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};

// node_modules/lit/node_modules/@lit/reactive-element/css-tag.js
var t = globalThis;
var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s = /* @__PURE__ */ Symbol();
var o = /* @__PURE__ */ new WeakMap();
var n = class {
  constructor(t8, e13, o14) {
    if (this._$cssResult$ = true, o14 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t8, this.t = e13;
  }
  get styleSheet() {
    let t8 = this.o;
    const s10 = this.t;
    if (e && void 0 === t8) {
      const e13 = void 0 !== s10 && 1 === s10.length;
      e13 && (t8 = o.get(s10)), void 0 === t8 && ((this.o = t8 = new CSSStyleSheet()).replaceSync(this.cssText), e13 && o.set(s10, t8));
    }
    return t8;
  }
  toString() {
    return this.cssText;
  }
};
var r = (t8) => new n("string" == typeof t8 ? t8 : t8 + "", void 0, s);
var S = (s10, o14) => {
  if (e) s10.adoptedStyleSheets = o14.map((t8) => t8 instanceof CSSStyleSheet ? t8 : t8.styleSheet);
  else for (const e13 of o14) {
    const o15 = document.createElement("style"), n14 = t.litNonce;
    void 0 !== n14 && o15.setAttribute("nonce", n14), o15.textContent = e13.cssText, s10.appendChild(o15);
  }
};
var c = e ? (t8) => t8 : (t8) => t8 instanceof CSSStyleSheet ? ((t9) => {
  let e13 = "";
  for (const s10 of t9.cssRules) e13 += s10.cssText;
  return r(e13);
})(t8) : t8;

// node_modules/lit/node_modules/@lit/reactive-element/reactive-element.js
var { is: i2, defineProperty: e2, getOwnPropertyDescriptor: h, getOwnPropertyNames: r2, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object;
var a = globalThis;
var c2 = a.trustedTypes;
var l = c2 ? c2.emptyScript : "";
var p = a.reactiveElementPolyfillSupport;
var d = (t8, s10) => t8;
var u = { toAttribute(t8, s10) {
  switch (s10) {
    case Boolean:
      t8 = t8 ? l : null;
      break;
    case Object:
    case Array:
      t8 = null == t8 ? t8 : JSON.stringify(t8);
  }
  return t8;
}, fromAttribute(t8, s10) {
  let i10 = t8;
  switch (s10) {
    case Boolean:
      i10 = null !== t8;
      break;
    case Number:
      i10 = null === t8 ? null : Number(t8);
      break;
    case Object:
    case Array:
      try {
        i10 = JSON.parse(t8);
      } catch (t9) {
        i10 = null;
      }
  }
  return i10;
} };
var f = (t8, s10) => !i2(t8, s10);
var b = { attribute: true, type: String, converter: u, reflect: false, useDefault: false, hasChanged: f };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), a.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var y = class extends HTMLElement {
  static addInitializer(t8) {
    this._$Ei(), (this.l ??= []).push(t8);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t8, s10 = b) {
    if (s10.state && (s10.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t8) && ((s10 = Object.create(s10)).wrapped = true), this.elementProperties.set(t8, s10), !s10.noAccessor) {
      const i10 = /* @__PURE__ */ Symbol(), h7 = this.getPropertyDescriptor(t8, i10, s10);
      void 0 !== h7 && e2(this.prototype, t8, h7);
    }
  }
  static getPropertyDescriptor(t8, s10, i10) {
    const { get: e13, set: r12 } = h(this.prototype, t8) ?? { get() {
      return this[s10];
    }, set(t9) {
      this[s10] = t9;
    } };
    return { get: e13, set(s11) {
      const h7 = e13?.call(this);
      r12?.call(this, s11), this.requestUpdate(t8, h7, i10);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t8) {
    return this.elementProperties.get(t8) ?? b;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d("elementProperties"))) return;
    const t8 = n2(this);
    t8.finalize(), void 0 !== t8.l && (this.l = [...t8.l]), this.elementProperties = new Map(t8.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
      const t9 = this.properties, s10 = [...r2(t9), ...o2(t9)];
      for (const i10 of s10) this.createProperty(i10, t9[i10]);
    }
    const t8 = this[Symbol.metadata];
    if (null !== t8) {
      const s10 = litPropertyMetadata.get(t8);
      if (void 0 !== s10) for (const [t9, i10] of s10) this.elementProperties.set(t9, i10);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t9, s10] of this.elementProperties) {
      const i10 = this._$Eu(t9, s10);
      void 0 !== i10 && this._$Eh.set(i10, t9);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s10) {
    const i10 = [];
    if (Array.isArray(s10)) {
      const e13 = new Set(s10.flat(1 / 0).reverse());
      for (const s11 of e13) i10.unshift(c(s11));
    } else void 0 !== s10 && i10.push(c(s10));
    return i10;
  }
  static _$Eu(t8, s10) {
    const i10 = s10.attribute;
    return false === i10 ? void 0 : "string" == typeof i10 ? i10 : "string" == typeof t8 ? t8.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t8) => this.enableUpdating = t8), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t8) => t8(this));
  }
  addController(t8) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t8), void 0 !== this.renderRoot && this.isConnected && t8.hostConnected?.();
  }
  removeController(t8) {
    this._$EO?.delete(t8);
  }
  _$E_() {
    const t8 = /* @__PURE__ */ new Map(), s10 = this.constructor.elementProperties;
    for (const i10 of s10.keys()) this.hasOwnProperty(i10) && (t8.set(i10, this[i10]), delete this[i10]);
    t8.size > 0 && (this._$Ep = t8);
  }
  createRenderRoot() {
    const t8 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S(t8, this.constructor.elementStyles), t8;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t8) => t8.hostConnected?.());
  }
  enableUpdating(t8) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t8) => t8.hostDisconnected?.());
  }
  attributeChangedCallback(t8, s10, i10) {
    this._$AK(t8, i10);
  }
  _$ET(t8, s10) {
    const i10 = this.constructor.elementProperties.get(t8), e13 = this.constructor._$Eu(t8, i10);
    if (void 0 !== e13 && true === i10.reflect) {
      const h7 = (void 0 !== i10.converter?.toAttribute ? i10.converter : u).toAttribute(s10, i10.type);
      this._$Em = t8, null == h7 ? this.removeAttribute(e13) : this.setAttribute(e13, h7), this._$Em = null;
    }
  }
  _$AK(t8, s10) {
    const i10 = this.constructor, e13 = i10._$Eh.get(t8);
    if (void 0 !== e13 && this._$Em !== e13) {
      const t9 = i10.getPropertyOptions(e13), h7 = "function" == typeof t9.converter ? { fromAttribute: t9.converter } : void 0 !== t9.converter?.fromAttribute ? t9.converter : u;
      this._$Em = e13;
      const r12 = h7.fromAttribute(s10, t9.type);
      this[e13] = r12 ?? this._$Ej?.get(e13) ?? r12, this._$Em = null;
    }
  }
  requestUpdate(t8, s10, i10, e13 = false, h7) {
    if (void 0 !== t8) {
      const r12 = this.constructor;
      if (false === e13 && (h7 = this[t8]), i10 ??= r12.getPropertyOptions(t8), !((i10.hasChanged ?? f)(h7, s10) || i10.useDefault && i10.reflect && h7 === this._$Ej?.get(t8) && !this.hasAttribute(r12._$Eu(t8, i10)))) return;
      this.C(t8, s10, i10);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t8, s10, { useDefault: i10, reflect: e13, wrapped: h7 }, r12) {
    i10 && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t8) && (this._$Ej.set(t8, r12 ?? s10 ?? this[t8]), true !== h7 || void 0 !== r12) || (this._$AL.has(t8) || (this.hasUpdated || i10 || (s10 = void 0), this._$AL.set(t8, s10)), true === e13 && this._$Em !== t8 && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t8));
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t9) {
      Promise.reject(t9);
    }
    const t8 = this.scheduleUpdate();
    return null != t8 && await t8, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [t10, s11] of this._$Ep) this[t10] = s11;
        this._$Ep = void 0;
      }
      const t9 = this.constructor.elementProperties;
      if (t9.size > 0) for (const [s11, i10] of t9) {
        const { wrapped: t10 } = i10, e13 = this[s11];
        true !== t10 || this._$AL.has(s11) || void 0 === e13 || this.C(s11, void 0, i10, e13);
      }
    }
    let t8 = false;
    const s10 = this._$AL;
    try {
      t8 = this.shouldUpdate(s10), t8 ? (this.willUpdate(s10), this._$EO?.forEach((t9) => t9.hostUpdate?.()), this.update(s10)) : this._$EM();
    } catch (s11) {
      throw t8 = false, this._$EM(), s11;
    }
    t8 && this._$AE(s10);
  }
  willUpdate(t8) {
  }
  _$AE(t8) {
    this._$EO?.forEach((t9) => t9.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t8)), this.updated(t8);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t8) {
    return true;
  }
  update(t8) {
    this._$Eq &&= this._$Eq.forEach((t9) => this._$ET(t9, this[t9])), this._$EM();
  }
  updated(t8) {
  }
  firstUpdated(t8) {
  }
};
y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[d("elementProperties")] = /* @__PURE__ */ new Map(), y[d("finalized")] = /* @__PURE__ */ new Map(), p?.({ ReactiveElement: y }), (a.reactiveElementVersions ??= []).push("2.1.2");

// node_modules/lit/node_modules/lit-html/lit-html.js
var t2 = globalThis;
var i3 = (t8) => t8;
var s2 = t2.trustedTypes;
var e3 = s2 ? s2.createPolicy("lit-html", { createHTML: (t8) => t8 }) : void 0;
var h2 = "$lit$";
var o3 = `lit$${Math.random().toFixed(9).slice(2)}$`;
var n3 = "?" + o3;
var r3 = `<${n3}>`;
var l2 = document;
var c3 = () => l2.createComment("");
var a2 = (t8) => null === t8 || "object" != typeof t8 && "function" != typeof t8;
var u2 = Array.isArray;
var d2 = (t8) => u2(t8) || "function" == typeof t8?.[Symbol.iterator];
var f2 = "[ 	\n\f\r]";
var v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var _ = /-->/g;
var m = />/g;
var p2 = RegExp(`>|${f2}(?:([^\\s"'>=/]+)(${f2}*=${f2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var g = /'/g;
var $ = /"/g;
var y2 = /^(?:script|style|textarea|title)$/i;
var x = (t8) => (i10, ...s10) => ({ _$litType$: t8, strings: i10, values: s10 });
var b2 = x(1);
var w = x(2);
var T = x(3);
var E = /* @__PURE__ */ Symbol.for("lit-noChange");
var A = /* @__PURE__ */ Symbol.for("lit-nothing");
var C = /* @__PURE__ */ new WeakMap();
var P = l2.createTreeWalker(l2, 129);
function V(t8, i10) {
  if (!u2(t8) || !t8.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e3 ? e3.createHTML(i10) : i10;
}
var N = (t8, i10) => {
  const s10 = t8.length - 1, e13 = [];
  let n14, l9 = 2 === i10 ? "<svg>" : 3 === i10 ? "<math>" : "", c9 = v;
  for (let i11 = 0; i11 < s10; i11++) {
    const s11 = t8[i11];
    let a7, u7, d7 = -1, f6 = 0;
    for (; f6 < s11.length && (c9.lastIndex = f6, u7 = c9.exec(s11), null !== u7); ) f6 = c9.lastIndex, c9 === v ? "!--" === u7[1] ? c9 = _ : void 0 !== u7[1] ? c9 = m : void 0 !== u7[2] ? (y2.test(u7[2]) && (n14 = RegExp("</" + u7[2], "g")), c9 = p2) : void 0 !== u7[3] && (c9 = p2) : c9 === p2 ? ">" === u7[0] ? (c9 = n14 ?? v, d7 = -1) : void 0 === u7[1] ? d7 = -2 : (d7 = c9.lastIndex - u7[2].length, a7 = u7[1], c9 = void 0 === u7[3] ? p2 : '"' === u7[3] ? $ : g) : c9 === $ || c9 === g ? c9 = p2 : c9 === _ || c9 === m ? c9 = v : (c9 = p2, n14 = void 0);
    const x4 = c9 === p2 && t8[i11 + 1].startsWith("/>") ? " " : "";
    l9 += c9 === v ? s11 + r3 : d7 >= 0 ? (e13.push(a7), s11.slice(0, d7) + h2 + s11.slice(d7) + o3 + x4) : s11 + o3 + (-2 === d7 ? i11 : x4);
  }
  return [V(t8, l9 + (t8[s10] || "<?>") + (2 === i10 ? "</svg>" : 3 === i10 ? "</math>" : "")), e13];
};
var S2 = class _S {
  constructor({ strings: t8, _$litType$: i10 }, e13) {
    let r12;
    this.parts = [];
    let l9 = 0, a7 = 0;
    const u7 = t8.length - 1, d7 = this.parts, [f6, v4] = N(t8, i10);
    if (this.el = _S.createElement(f6, e13), P.currentNode = this.el.content, 2 === i10 || 3 === i10) {
      const t9 = this.el.content.firstChild;
      t9.replaceWith(...t9.childNodes);
    }
    for (; null !== (r12 = P.nextNode()) && d7.length < u7; ) {
      if (1 === r12.nodeType) {
        if (r12.hasAttributes()) for (const t9 of r12.getAttributeNames()) if (t9.endsWith(h2)) {
          const i11 = v4[a7++], s10 = r12.getAttribute(t9).split(o3), e14 = /([.?@])?(.*)/.exec(i11);
          d7.push({ type: 1, index: l9, name: e14[2], strings: s10, ctor: "." === e14[1] ? I : "?" === e14[1] ? L : "@" === e14[1] ? z : H }), r12.removeAttribute(t9);
        } else t9.startsWith(o3) && (d7.push({ type: 6, index: l9 }), r12.removeAttribute(t9));
        if (y2.test(r12.tagName)) {
          const t9 = r12.textContent.split(o3), i11 = t9.length - 1;
          if (i11 > 0) {
            r12.textContent = s2 ? s2.emptyScript : "";
            for (let s10 = 0; s10 < i11; s10++) r12.append(t9[s10], c3()), P.nextNode(), d7.push({ type: 2, index: ++l9 });
            r12.append(t9[i11], c3());
          }
        }
      } else if (8 === r12.nodeType) if (r12.data === n3) d7.push({ type: 2, index: l9 });
      else {
        let t9 = -1;
        for (; -1 !== (t9 = r12.data.indexOf(o3, t9 + 1)); ) d7.push({ type: 7, index: l9 }), t9 += o3.length - 1;
      }
      l9++;
    }
  }
  static createElement(t8, i10) {
    const s10 = l2.createElement("template");
    return s10.innerHTML = t8, s10;
  }
};
function M(t8, i10, s10 = t8, e13) {
  if (i10 === E) return i10;
  let h7 = void 0 !== e13 ? s10._$Co?.[e13] : s10._$Cl;
  const o14 = a2(i10) ? void 0 : i10._$litDirective$;
  return h7?.constructor !== o14 && (h7?._$AO?.(false), void 0 === o14 ? h7 = void 0 : (h7 = new o14(t8), h7._$AT(t8, s10, e13)), void 0 !== e13 ? (s10._$Co ??= [])[e13] = h7 : s10._$Cl = h7), void 0 !== h7 && (i10 = M(t8, h7._$AS(t8, i10.values), h7, e13)), i10;
}
var R = class {
  constructor(t8, i10) {
    this._$AV = [], this._$AN = void 0, this._$AD = t8, this._$AM = i10;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t8) {
    const { el: { content: i10 }, parts: s10 } = this._$AD, e13 = (t8?.creationScope ?? l2).importNode(i10, true);
    P.currentNode = e13;
    let h7 = P.nextNode(), o14 = 0, n14 = 0, r12 = s10[0];
    for (; void 0 !== r12; ) {
      if (o14 === r12.index) {
        let i11;
        2 === r12.type ? i11 = new k(h7, h7.nextSibling, this, t8) : 1 === r12.type ? i11 = new r12.ctor(h7, r12.name, r12.strings, this, t8) : 6 === r12.type && (i11 = new Z(h7, this, t8)), this._$AV.push(i11), r12 = s10[++n14];
      }
      o14 !== r12?.index && (h7 = P.nextNode(), o14++);
    }
    return P.currentNode = l2, e13;
  }
  p(t8) {
    let i10 = 0;
    for (const s10 of this._$AV) void 0 !== s10 && (void 0 !== s10.strings ? (s10._$AI(t8, s10, i10), i10 += s10.strings.length - 2) : s10._$AI(t8[i10])), i10++;
  }
};
var k = class _k {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t8, i10, s10, e13) {
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t8, this._$AB = i10, this._$AM = s10, this.options = e13, this._$Cv = e13?.isConnected ?? true;
  }
  get parentNode() {
    let t8 = this._$AA.parentNode;
    const i10 = this._$AM;
    return void 0 !== i10 && 11 === t8?.nodeType && (t8 = i10.parentNode), t8;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t8, i10 = this) {
    t8 = M(this, t8, i10), a2(t8) ? t8 === A || null == t8 || "" === t8 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t8 !== this._$AH && t8 !== E && this._(t8) : void 0 !== t8._$litType$ ? this.$(t8) : void 0 !== t8.nodeType ? this.T(t8) : d2(t8) ? this.k(t8) : this._(t8);
  }
  O(t8) {
    return this._$AA.parentNode.insertBefore(t8, this._$AB);
  }
  T(t8) {
    this._$AH !== t8 && (this._$AR(), this._$AH = this.O(t8));
  }
  _(t8) {
    this._$AH !== A && a2(this._$AH) ? this._$AA.nextSibling.data = t8 : this.T(l2.createTextNode(t8)), this._$AH = t8;
  }
  $(t8) {
    const { values: i10, _$litType$: s10 } = t8, e13 = "number" == typeof s10 ? this._$AC(t8) : (void 0 === s10.el && (s10.el = S2.createElement(V(s10.h, s10.h[0]), this.options)), s10);
    if (this._$AH?._$AD === e13) this._$AH.p(i10);
    else {
      const t9 = new R(e13, this), s11 = t9.u(this.options);
      t9.p(i10), this.T(s11), this._$AH = t9;
    }
  }
  _$AC(t8) {
    let i10 = C.get(t8.strings);
    return void 0 === i10 && C.set(t8.strings, i10 = new S2(t8)), i10;
  }
  k(t8) {
    u2(this._$AH) || (this._$AH = [], this._$AR());
    const i10 = this._$AH;
    let s10, e13 = 0;
    for (const h7 of t8) e13 === i10.length ? i10.push(s10 = new _k(this.O(c3()), this.O(c3()), this, this.options)) : s10 = i10[e13], s10._$AI(h7), e13++;
    e13 < i10.length && (this._$AR(s10 && s10._$AB.nextSibling, e13), i10.length = e13);
  }
  _$AR(t8 = this._$AA.nextSibling, s10) {
    for (this._$AP?.(false, true, s10); t8 !== this._$AB; ) {
      const s11 = i3(t8).nextSibling;
      i3(t8).remove(), t8 = s11;
    }
  }
  setConnected(t8) {
    void 0 === this._$AM && (this._$Cv = t8, this._$AP?.(t8));
  }
};
var H = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t8, i10, s10, e13, h7) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t8, this.name = i10, this._$AM = e13, this.options = h7, s10.length > 2 || "" !== s10[0] || "" !== s10[1] ? (this._$AH = Array(s10.length - 1).fill(new String()), this.strings = s10) : this._$AH = A;
  }
  _$AI(t8, i10 = this, s10, e13) {
    const h7 = this.strings;
    let o14 = false;
    if (void 0 === h7) t8 = M(this, t8, i10, 0), o14 = !a2(t8) || t8 !== this._$AH && t8 !== E, o14 && (this._$AH = t8);
    else {
      const e14 = t8;
      let n14, r12;
      for (t8 = h7[0], n14 = 0; n14 < h7.length - 1; n14++) r12 = M(this, e14[s10 + n14], i10, n14), r12 === E && (r12 = this._$AH[n14]), o14 ||= !a2(r12) || r12 !== this._$AH[n14], r12 === A ? t8 = A : t8 !== A && (t8 += (r12 ?? "") + h7[n14 + 1]), this._$AH[n14] = r12;
    }
    o14 && !e13 && this.j(t8);
  }
  j(t8) {
    t8 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t8 ?? "");
  }
};
var I = class extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t8) {
    this.element[this.name] = t8 === A ? void 0 : t8;
  }
};
var L = class extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t8) {
    this.element.toggleAttribute(this.name, !!t8 && t8 !== A);
  }
};
var z = class extends H {
  constructor(t8, i10, s10, e13, h7) {
    super(t8, i10, s10, e13, h7), this.type = 5;
  }
  _$AI(t8, i10 = this) {
    if ((t8 = M(this, t8, i10, 0) ?? A) === E) return;
    const s10 = this._$AH, e13 = t8 === A && s10 !== A || t8.capture !== s10.capture || t8.once !== s10.once || t8.passive !== s10.passive, h7 = t8 !== A && (s10 === A || e13);
    e13 && this.element.removeEventListener(this.name, this, s10), h7 && this.element.addEventListener(this.name, this, t8), this._$AH = t8;
  }
  handleEvent(t8) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t8) : this._$AH.handleEvent(t8);
  }
};
var Z = class {
  constructor(t8, i10, s10) {
    this.element = t8, this.type = 6, this._$AN = void 0, this._$AM = i10, this.options = s10;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t8) {
    M(this, t8);
  }
};
var B = t2.litHtmlPolyfillSupport;
B?.(S2, k), (t2.litHtmlVersions ??= []).push("3.3.2");

// node_modules/lit-element/node_modules/@lit/reactive-element/css-tag.js
var t3 = globalThis;
var e4 = t3.ShadowRoot && (void 0 === t3.ShadyCSS || t3.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s3 = /* @__PURE__ */ Symbol();
var o4 = /* @__PURE__ */ new WeakMap();
var n4 = class {
  constructor(t8, e13, o14) {
    if (this._$cssResult$ = true, o14 !== s3) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t8, this.t = e13;
  }
  get styleSheet() {
    let t8 = this.o;
    const s10 = this.t;
    if (e4 && void 0 === t8) {
      const e13 = void 0 !== s10 && 1 === s10.length;
      e13 && (t8 = o4.get(s10)), void 0 === t8 && ((this.o = t8 = new CSSStyleSheet()).replaceSync(this.cssText), e13 && o4.set(s10, t8));
    }
    return t8;
  }
  toString() {
    return this.cssText;
  }
};
var r4 = (t8) => new n4("string" == typeof t8 ? t8 : t8 + "", void 0, s3);
var i4 = (t8, ...e13) => {
  const o14 = 1 === t8.length ? t8[0] : e13.reduce((e14, s10, o15) => e14 + ((t9) => {
    if (true === t9._$cssResult$) return t9.cssText;
    if ("number" == typeof t9) return t9;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t9 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s10) + t8[o15 + 1], t8[0]);
  return new n4(o14, t8, s3);
};
var S3 = (s10, o14) => {
  if (e4) s10.adoptedStyleSheets = o14.map((t8) => t8 instanceof CSSStyleSheet ? t8 : t8.styleSheet);
  else for (const e13 of o14) {
    const o15 = document.createElement("style"), n14 = t3.litNonce;
    void 0 !== n14 && o15.setAttribute("nonce", n14), o15.textContent = e13.cssText, s10.appendChild(o15);
  }
};
var c4 = e4 ? (t8) => t8 : (t8) => t8 instanceof CSSStyleSheet ? ((t9) => {
  let e13 = "";
  for (const s10 of t9.cssRules) e13 += s10.cssText;
  return r4(e13);
})(t8) : t8;

// node_modules/lit-element/node_modules/@lit/reactive-element/reactive-element.js
var { is: i5, defineProperty: e5, getOwnPropertyDescriptor: h3, getOwnPropertyNames: r5, getOwnPropertySymbols: o5, getPrototypeOf: n5 } = Object;
var a3 = globalThis;
var c5 = a3.trustedTypes;
var l3 = c5 ? c5.emptyScript : "";
var p3 = a3.reactiveElementPolyfillSupport;
var d3 = (t8, s10) => t8;
var u3 = { toAttribute(t8, s10) {
  switch (s10) {
    case Boolean:
      t8 = t8 ? l3 : null;
      break;
    case Object:
    case Array:
      t8 = null == t8 ? t8 : JSON.stringify(t8);
  }
  return t8;
}, fromAttribute(t8, s10) {
  let i10 = t8;
  switch (s10) {
    case Boolean:
      i10 = null !== t8;
      break;
    case Number:
      i10 = null === t8 ? null : Number(t8);
      break;
    case Object:
    case Array:
      try {
        i10 = JSON.parse(t8);
      } catch (t9) {
        i10 = null;
      }
  }
  return i10;
} };
var f3 = (t8, s10) => !i5(t8, s10);
var b3 = { attribute: true, type: String, converter: u3, reflect: false, useDefault: false, hasChanged: f3 };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), a3.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var y3 = class extends HTMLElement {
  static addInitializer(t8) {
    this._$Ei(), (this.l ??= []).push(t8);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t8, s10 = b3) {
    if (s10.state && (s10.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t8) && ((s10 = Object.create(s10)).wrapped = true), this.elementProperties.set(t8, s10), !s10.noAccessor) {
      const i10 = /* @__PURE__ */ Symbol(), h7 = this.getPropertyDescriptor(t8, i10, s10);
      void 0 !== h7 && e5(this.prototype, t8, h7);
    }
  }
  static getPropertyDescriptor(t8, s10, i10) {
    const { get: e13, set: r12 } = h3(this.prototype, t8) ?? { get() {
      return this[s10];
    }, set(t9) {
      this[s10] = t9;
    } };
    return { get: e13, set(s11) {
      const h7 = e13?.call(this);
      r12?.call(this, s11), this.requestUpdate(t8, h7, i10);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t8) {
    return this.elementProperties.get(t8) ?? b3;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d3("elementProperties"))) return;
    const t8 = n5(this);
    t8.finalize(), void 0 !== t8.l && (this.l = [...t8.l]), this.elementProperties = new Map(t8.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d3("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d3("properties"))) {
      const t9 = this.properties, s10 = [...r5(t9), ...o5(t9)];
      for (const i10 of s10) this.createProperty(i10, t9[i10]);
    }
    const t8 = this[Symbol.metadata];
    if (null !== t8) {
      const s10 = litPropertyMetadata.get(t8);
      if (void 0 !== s10) for (const [t9, i10] of s10) this.elementProperties.set(t9, i10);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t9, s10] of this.elementProperties) {
      const i10 = this._$Eu(t9, s10);
      void 0 !== i10 && this._$Eh.set(i10, t9);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s10) {
    const i10 = [];
    if (Array.isArray(s10)) {
      const e13 = new Set(s10.flat(1 / 0).reverse());
      for (const s11 of e13) i10.unshift(c4(s11));
    } else void 0 !== s10 && i10.push(c4(s10));
    return i10;
  }
  static _$Eu(t8, s10) {
    const i10 = s10.attribute;
    return false === i10 ? void 0 : "string" == typeof i10 ? i10 : "string" == typeof t8 ? t8.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t8) => this.enableUpdating = t8), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t8) => t8(this));
  }
  addController(t8) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t8), void 0 !== this.renderRoot && this.isConnected && t8.hostConnected?.();
  }
  removeController(t8) {
    this._$EO?.delete(t8);
  }
  _$E_() {
    const t8 = /* @__PURE__ */ new Map(), s10 = this.constructor.elementProperties;
    for (const i10 of s10.keys()) this.hasOwnProperty(i10) && (t8.set(i10, this[i10]), delete this[i10]);
    t8.size > 0 && (this._$Ep = t8);
  }
  createRenderRoot() {
    const t8 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S3(t8, this.constructor.elementStyles), t8;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t8) => t8.hostConnected?.());
  }
  enableUpdating(t8) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t8) => t8.hostDisconnected?.());
  }
  attributeChangedCallback(t8, s10, i10) {
    this._$AK(t8, i10);
  }
  _$ET(t8, s10) {
    const i10 = this.constructor.elementProperties.get(t8), e13 = this.constructor._$Eu(t8, i10);
    if (void 0 !== e13 && true === i10.reflect) {
      const h7 = (void 0 !== i10.converter?.toAttribute ? i10.converter : u3).toAttribute(s10, i10.type);
      this._$Em = t8, null == h7 ? this.removeAttribute(e13) : this.setAttribute(e13, h7), this._$Em = null;
    }
  }
  _$AK(t8, s10) {
    const i10 = this.constructor, e13 = i10._$Eh.get(t8);
    if (void 0 !== e13 && this._$Em !== e13) {
      const t9 = i10.getPropertyOptions(e13), h7 = "function" == typeof t9.converter ? { fromAttribute: t9.converter } : void 0 !== t9.converter?.fromAttribute ? t9.converter : u3;
      this._$Em = e13;
      const r12 = h7.fromAttribute(s10, t9.type);
      this[e13] = r12 ?? this._$Ej?.get(e13) ?? r12, this._$Em = null;
    }
  }
  requestUpdate(t8, s10, i10, e13 = false, h7) {
    if (void 0 !== t8) {
      const r12 = this.constructor;
      if (false === e13 && (h7 = this[t8]), i10 ??= r12.getPropertyOptions(t8), !((i10.hasChanged ?? f3)(h7, s10) || i10.useDefault && i10.reflect && h7 === this._$Ej?.get(t8) && !this.hasAttribute(r12._$Eu(t8, i10)))) return;
      this.C(t8, s10, i10);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t8, s10, { useDefault: i10, reflect: e13, wrapped: h7 }, r12) {
    i10 && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t8) && (this._$Ej.set(t8, r12 ?? s10 ?? this[t8]), true !== h7 || void 0 !== r12) || (this._$AL.has(t8) || (this.hasUpdated || i10 || (s10 = void 0), this._$AL.set(t8, s10)), true === e13 && this._$Em !== t8 && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t8));
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t9) {
      Promise.reject(t9);
    }
    const t8 = this.scheduleUpdate();
    return null != t8 && await t8, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [t10, s11] of this._$Ep) this[t10] = s11;
        this._$Ep = void 0;
      }
      const t9 = this.constructor.elementProperties;
      if (t9.size > 0) for (const [s11, i10] of t9) {
        const { wrapped: t10 } = i10, e13 = this[s11];
        true !== t10 || this._$AL.has(s11) || void 0 === e13 || this.C(s11, void 0, i10, e13);
      }
    }
    let t8 = false;
    const s10 = this._$AL;
    try {
      t8 = this.shouldUpdate(s10), t8 ? (this.willUpdate(s10), this._$EO?.forEach((t9) => t9.hostUpdate?.()), this.update(s10)) : this._$EM();
    } catch (s11) {
      throw t8 = false, this._$EM(), s11;
    }
    t8 && this._$AE(s10);
  }
  willUpdate(t8) {
  }
  _$AE(t8) {
    this._$EO?.forEach((t9) => t9.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t8)), this.updated(t8);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t8) {
    return true;
  }
  update(t8) {
    this._$Eq &&= this._$Eq.forEach((t9) => this._$ET(t9, this[t9])), this._$EM();
  }
  updated(t8) {
  }
  firstUpdated(t8) {
  }
};
y3.elementStyles = [], y3.shadowRootOptions = { mode: "open" }, y3[d3("elementProperties")] = /* @__PURE__ */ new Map(), y3[d3("finalized")] = /* @__PURE__ */ new Map(), p3?.({ ReactiveElement: y3 }), (a3.reactiveElementVersions ??= []).push("2.1.2");

// node_modules/lit-element/node_modules/lit-html/lit-html.js
var t4 = globalThis;
var i6 = (t8) => t8;
var s4 = t4.trustedTypes;
var e6 = s4 ? s4.createPolicy("lit-html", { createHTML: (t8) => t8 }) : void 0;
var h4 = "$lit$";
var o6 = `lit$${Math.random().toFixed(9).slice(2)}$`;
var n6 = "?" + o6;
var r6 = `<${n6}>`;
var l4 = document;
var c6 = () => l4.createComment("");
var a4 = (t8) => null === t8 || "object" != typeof t8 && "function" != typeof t8;
var u4 = Array.isArray;
var d4 = (t8) => u4(t8) || "function" == typeof t8?.[Symbol.iterator];
var f4 = "[ 	\n\f\r]";
var v2 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var _2 = /-->/g;
var m2 = />/g;
var p4 = RegExp(`>|${f4}(?:([^\\s"'>=/]+)(${f4}*=${f4}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var g2 = /'/g;
var $2 = /"/g;
var y4 = /^(?:script|style|textarea|title)$/i;
var x2 = (t8) => (i10, ...s10) => ({ _$litType$: t8, strings: i10, values: s10 });
var b4 = x2(1);
var w2 = x2(2);
var T2 = x2(3);
var E2 = /* @__PURE__ */ Symbol.for("lit-noChange");
var A2 = /* @__PURE__ */ Symbol.for("lit-nothing");
var C2 = /* @__PURE__ */ new WeakMap();
var P2 = l4.createTreeWalker(l4, 129);
function V2(t8, i10) {
  if (!u4(t8) || !t8.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e6 ? e6.createHTML(i10) : i10;
}
var N2 = (t8, i10) => {
  const s10 = t8.length - 1, e13 = [];
  let n14, l9 = 2 === i10 ? "<svg>" : 3 === i10 ? "<math>" : "", c9 = v2;
  for (let i11 = 0; i11 < s10; i11++) {
    const s11 = t8[i11];
    let a7, u7, d7 = -1, f6 = 0;
    for (; f6 < s11.length && (c9.lastIndex = f6, u7 = c9.exec(s11), null !== u7); ) f6 = c9.lastIndex, c9 === v2 ? "!--" === u7[1] ? c9 = _2 : void 0 !== u7[1] ? c9 = m2 : void 0 !== u7[2] ? (y4.test(u7[2]) && (n14 = RegExp("</" + u7[2], "g")), c9 = p4) : void 0 !== u7[3] && (c9 = p4) : c9 === p4 ? ">" === u7[0] ? (c9 = n14 ?? v2, d7 = -1) : void 0 === u7[1] ? d7 = -2 : (d7 = c9.lastIndex - u7[2].length, a7 = u7[1], c9 = void 0 === u7[3] ? p4 : '"' === u7[3] ? $2 : g2) : c9 === $2 || c9 === g2 ? c9 = p4 : c9 === _2 || c9 === m2 ? c9 = v2 : (c9 = p4, n14 = void 0);
    const x4 = c9 === p4 && t8[i11 + 1].startsWith("/>") ? " " : "";
    l9 += c9 === v2 ? s11 + r6 : d7 >= 0 ? (e13.push(a7), s11.slice(0, d7) + h4 + s11.slice(d7) + o6 + x4) : s11 + o6 + (-2 === d7 ? i11 : x4);
  }
  return [V2(t8, l9 + (t8[s10] || "<?>") + (2 === i10 ? "</svg>" : 3 === i10 ? "</math>" : "")), e13];
};
var S4 = class _S {
  constructor({ strings: t8, _$litType$: i10 }, e13) {
    let r12;
    this.parts = [];
    let l9 = 0, a7 = 0;
    const u7 = t8.length - 1, d7 = this.parts, [f6, v4] = N2(t8, i10);
    if (this.el = _S.createElement(f6, e13), P2.currentNode = this.el.content, 2 === i10 || 3 === i10) {
      const t9 = this.el.content.firstChild;
      t9.replaceWith(...t9.childNodes);
    }
    for (; null !== (r12 = P2.nextNode()) && d7.length < u7; ) {
      if (1 === r12.nodeType) {
        if (r12.hasAttributes()) for (const t9 of r12.getAttributeNames()) if (t9.endsWith(h4)) {
          const i11 = v4[a7++], s10 = r12.getAttribute(t9).split(o6), e14 = /([.?@])?(.*)/.exec(i11);
          d7.push({ type: 1, index: l9, name: e14[2], strings: s10, ctor: "." === e14[1] ? I2 : "?" === e14[1] ? L2 : "@" === e14[1] ? z2 : H2 }), r12.removeAttribute(t9);
        } else t9.startsWith(o6) && (d7.push({ type: 6, index: l9 }), r12.removeAttribute(t9));
        if (y4.test(r12.tagName)) {
          const t9 = r12.textContent.split(o6), i11 = t9.length - 1;
          if (i11 > 0) {
            r12.textContent = s4 ? s4.emptyScript : "";
            for (let s10 = 0; s10 < i11; s10++) r12.append(t9[s10], c6()), P2.nextNode(), d7.push({ type: 2, index: ++l9 });
            r12.append(t9[i11], c6());
          }
        }
      } else if (8 === r12.nodeType) if (r12.data === n6) d7.push({ type: 2, index: l9 });
      else {
        let t9 = -1;
        for (; -1 !== (t9 = r12.data.indexOf(o6, t9 + 1)); ) d7.push({ type: 7, index: l9 }), t9 += o6.length - 1;
      }
      l9++;
    }
  }
  static createElement(t8, i10) {
    const s10 = l4.createElement("template");
    return s10.innerHTML = t8, s10;
  }
};
function M2(t8, i10, s10 = t8, e13) {
  if (i10 === E2) return i10;
  let h7 = void 0 !== e13 ? s10._$Co?.[e13] : s10._$Cl;
  const o14 = a4(i10) ? void 0 : i10._$litDirective$;
  return h7?.constructor !== o14 && (h7?._$AO?.(false), void 0 === o14 ? h7 = void 0 : (h7 = new o14(t8), h7._$AT(t8, s10, e13)), void 0 !== e13 ? (s10._$Co ??= [])[e13] = h7 : s10._$Cl = h7), void 0 !== h7 && (i10 = M2(t8, h7._$AS(t8, i10.values), h7, e13)), i10;
}
var R2 = class {
  constructor(t8, i10) {
    this._$AV = [], this._$AN = void 0, this._$AD = t8, this._$AM = i10;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t8) {
    const { el: { content: i10 }, parts: s10 } = this._$AD, e13 = (t8?.creationScope ?? l4).importNode(i10, true);
    P2.currentNode = e13;
    let h7 = P2.nextNode(), o14 = 0, n14 = 0, r12 = s10[0];
    for (; void 0 !== r12; ) {
      if (o14 === r12.index) {
        let i11;
        2 === r12.type ? i11 = new k2(h7, h7.nextSibling, this, t8) : 1 === r12.type ? i11 = new r12.ctor(h7, r12.name, r12.strings, this, t8) : 6 === r12.type && (i11 = new Z2(h7, this, t8)), this._$AV.push(i11), r12 = s10[++n14];
      }
      o14 !== r12?.index && (h7 = P2.nextNode(), o14++);
    }
    return P2.currentNode = l4, e13;
  }
  p(t8) {
    let i10 = 0;
    for (const s10 of this._$AV) void 0 !== s10 && (void 0 !== s10.strings ? (s10._$AI(t8, s10, i10), i10 += s10.strings.length - 2) : s10._$AI(t8[i10])), i10++;
  }
};
var k2 = class _k {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t8, i10, s10, e13) {
    this.type = 2, this._$AH = A2, this._$AN = void 0, this._$AA = t8, this._$AB = i10, this._$AM = s10, this.options = e13, this._$Cv = e13?.isConnected ?? true;
  }
  get parentNode() {
    let t8 = this._$AA.parentNode;
    const i10 = this._$AM;
    return void 0 !== i10 && 11 === t8?.nodeType && (t8 = i10.parentNode), t8;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t8, i10 = this) {
    t8 = M2(this, t8, i10), a4(t8) ? t8 === A2 || null == t8 || "" === t8 ? (this._$AH !== A2 && this._$AR(), this._$AH = A2) : t8 !== this._$AH && t8 !== E2 && this._(t8) : void 0 !== t8._$litType$ ? this.$(t8) : void 0 !== t8.nodeType ? this.T(t8) : d4(t8) ? this.k(t8) : this._(t8);
  }
  O(t8) {
    return this._$AA.parentNode.insertBefore(t8, this._$AB);
  }
  T(t8) {
    this._$AH !== t8 && (this._$AR(), this._$AH = this.O(t8));
  }
  _(t8) {
    this._$AH !== A2 && a4(this._$AH) ? this._$AA.nextSibling.data = t8 : this.T(l4.createTextNode(t8)), this._$AH = t8;
  }
  $(t8) {
    const { values: i10, _$litType$: s10 } = t8, e13 = "number" == typeof s10 ? this._$AC(t8) : (void 0 === s10.el && (s10.el = S4.createElement(V2(s10.h, s10.h[0]), this.options)), s10);
    if (this._$AH?._$AD === e13) this._$AH.p(i10);
    else {
      const t9 = new R2(e13, this), s11 = t9.u(this.options);
      t9.p(i10), this.T(s11), this._$AH = t9;
    }
  }
  _$AC(t8) {
    let i10 = C2.get(t8.strings);
    return void 0 === i10 && C2.set(t8.strings, i10 = new S4(t8)), i10;
  }
  k(t8) {
    u4(this._$AH) || (this._$AH = [], this._$AR());
    const i10 = this._$AH;
    let s10, e13 = 0;
    for (const h7 of t8) e13 === i10.length ? i10.push(s10 = new _k(this.O(c6()), this.O(c6()), this, this.options)) : s10 = i10[e13], s10._$AI(h7), e13++;
    e13 < i10.length && (this._$AR(s10 && s10._$AB.nextSibling, e13), i10.length = e13);
  }
  _$AR(t8 = this._$AA.nextSibling, s10) {
    for (this._$AP?.(false, true, s10); t8 !== this._$AB; ) {
      const s11 = i6(t8).nextSibling;
      i6(t8).remove(), t8 = s11;
    }
  }
  setConnected(t8) {
    void 0 === this._$AM && (this._$Cv = t8, this._$AP?.(t8));
  }
};
var H2 = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t8, i10, s10, e13, h7) {
    this.type = 1, this._$AH = A2, this._$AN = void 0, this.element = t8, this.name = i10, this._$AM = e13, this.options = h7, s10.length > 2 || "" !== s10[0] || "" !== s10[1] ? (this._$AH = Array(s10.length - 1).fill(new String()), this.strings = s10) : this._$AH = A2;
  }
  _$AI(t8, i10 = this, s10, e13) {
    const h7 = this.strings;
    let o14 = false;
    if (void 0 === h7) t8 = M2(this, t8, i10, 0), o14 = !a4(t8) || t8 !== this._$AH && t8 !== E2, o14 && (this._$AH = t8);
    else {
      const e14 = t8;
      let n14, r12;
      for (t8 = h7[0], n14 = 0; n14 < h7.length - 1; n14++) r12 = M2(this, e14[s10 + n14], i10, n14), r12 === E2 && (r12 = this._$AH[n14]), o14 ||= !a4(r12) || r12 !== this._$AH[n14], r12 === A2 ? t8 = A2 : t8 !== A2 && (t8 += (r12 ?? "") + h7[n14 + 1]), this._$AH[n14] = r12;
    }
    o14 && !e13 && this.j(t8);
  }
  j(t8) {
    t8 === A2 ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t8 ?? "");
  }
};
var I2 = class extends H2 {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t8) {
    this.element[this.name] = t8 === A2 ? void 0 : t8;
  }
};
var L2 = class extends H2 {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t8) {
    this.element.toggleAttribute(this.name, !!t8 && t8 !== A2);
  }
};
var z2 = class extends H2 {
  constructor(t8, i10, s10, e13, h7) {
    super(t8, i10, s10, e13, h7), this.type = 5;
  }
  _$AI(t8, i10 = this) {
    if ((t8 = M2(this, t8, i10, 0) ?? A2) === E2) return;
    const s10 = this._$AH, e13 = t8 === A2 && s10 !== A2 || t8.capture !== s10.capture || t8.once !== s10.once || t8.passive !== s10.passive, h7 = t8 !== A2 && (s10 === A2 || e13);
    e13 && this.element.removeEventListener(this.name, this, s10), h7 && this.element.addEventListener(this.name, this, t8), this._$AH = t8;
  }
  handleEvent(t8) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t8) : this._$AH.handleEvent(t8);
  }
};
var Z2 = class {
  constructor(t8, i10, s10) {
    this.element = t8, this.type = 6, this._$AN = void 0, this._$AM = i10, this.options = s10;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t8) {
    M2(this, t8);
  }
};
var B2 = t4.litHtmlPolyfillSupport;
B2?.(S4, k2), (t4.litHtmlVersions ??= []).push("3.3.2");
var D = (t8, i10, s10) => {
  const e13 = s10?.renderBefore ?? i10;
  let h7 = e13._$litPart$;
  if (void 0 === h7) {
    const t9 = s10?.renderBefore ?? null;
    e13._$litPart$ = h7 = new k2(i10.insertBefore(c6(), t9), t9, void 0, s10 ?? {});
  }
  return h7._$AI(t8), h7;
};

// node_modules/lit-element/lit-element.js
var s5 = globalThis;
var i7 = class extends y3 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t8 = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t8.firstChild, t8;
  }
  update(t8) {
    const r12 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t8), this._$Do = D(r12, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(true);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(false);
  }
  render() {
    return E2;
  }
};
i7._$litElement$ = true, i7["finalized"] = true, s5.litElementHydrateSupport?.({ LitElement: i7 });
var o7 = s5.litElementPolyfillSupport;
o7?.({ LitElement: i7 });
(s5.litElementVersions ??= []).push("4.2.2");

// node_modules/lit/node_modules/@lit/reactive-element/decorators/custom-element.js
var t5 = (t8) => (e13, o14) => {
  void 0 !== o14 ? o14.addInitializer(() => {
    customElements.define(t8, e13);
  }) : customElements.define(t8, e13);
};

// node_modules/lit/node_modules/@lit/reactive-element/decorators/property.js
var o8 = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
var r7 = (t8 = o8, e13, r12) => {
  const { kind: n14, metadata: i10 } = r12;
  let s10 = globalThis.litPropertyMetadata.get(i10);
  if (void 0 === s10 && globalThis.litPropertyMetadata.set(i10, s10 = /* @__PURE__ */ new Map()), "setter" === n14 && ((t8 = Object.create(t8)).wrapped = true), s10.set(r12.name, t8), "accessor" === n14) {
    const { name: o14 } = r12;
    return { set(r13) {
      const n15 = e13.get.call(this);
      e13.set.call(this, r13), this.requestUpdate(o14, n15, t8, true, r13);
    }, init(e14) {
      return void 0 !== e14 && this.C(o14, void 0, t8, e14), e14;
    } };
  }
  if ("setter" === n14) {
    const { name: o14 } = r12;
    return function(r13) {
      const n15 = this[o14];
      e13.call(this, r13), this.requestUpdate(o14, n15, t8, true, r13);
    };
  }
  throw Error("Unsupported decorator location: " + n14);
};
function n7(t8) {
  return (e13, o14) => "object" == typeof o14 ? r7(t8, e13, o14) : ((t9, e14, o15) => {
    const r12 = e14.hasOwnProperty(o15);
    return e14.constructor.createProperty(o15, t9), r12 ? Object.getOwnPropertyDescriptor(e14, o15) : void 0;
  })(t8, e13, o14);
}

// node_modules/lit/node_modules/@lit/reactive-element/decorators/state.js
function r8(r12) {
  return n7({ ...r12, state: true, attribute: false });
}

// node_modules/hotkeys-js/dist/hotkeys-js.js
var isff = typeof navigator !== "undefined" ? navigator.userAgent.toLowerCase().indexOf("firefox") > 0 : false;
function addEvent(object, event, method, useCapture) {
  if (object.addEventListener) {
    object.addEventListener(event, method, useCapture);
  } else if (object.attachEvent) {
    object.attachEvent(`on${event}`, method);
  }
}
function removeEvent(object, event, method, useCapture) {
  if (!object) return;
  if (object.removeEventListener) {
    object.removeEventListener(event, method, useCapture);
  } else if (object.detachEvent) {
    object.detachEvent(`on${event}`, method);
  }
}
function getMods(modifier, key) {
  const modsKeys = key.slice(0, key.length - 1);
  const modsCodes = [];
  for (let i10 = 0; i10 < modsKeys.length; i10++) {
    modsCodes.push(modifier[modsKeys[i10].toLowerCase()]);
  }
  return modsCodes;
}
function getKeys(key) {
  if (typeof key !== "string") key = "";
  key = key.replace(/\s/g, "");
  const keys = key.split(",");
  let index = keys.lastIndexOf("");
  for (; index >= 0; ) {
    keys[index - 1] += ",";
    keys.splice(index, 1);
    index = keys.lastIndexOf("");
  }
  return keys;
}
function compareArray(a1, a22) {
  const arr1 = a1.length >= a22.length ? a1 : a22;
  const arr2 = a1.length >= a22.length ? a22 : a1;
  let isIndex = true;
  for (let i10 = 0; i10 < arr1.length; i10++) {
    if (arr2.indexOf(arr1[i10]) === -1) isIndex = false;
  }
  return isIndex;
}
function getLayoutIndependentKeyCode(event) {
  let key = event.keyCode || event.which || event.charCode;
  if (event.code && /^Key[A-Z]$/.test(event.code)) {
    key = event.code.charCodeAt(3);
  }
  return key;
}
var _keyMap = {
  backspace: 8,
  "\u232B": 8,
  tab: 9,
  clear: 12,
  enter: 13,
  "\u21A9": 13,
  return: 13,
  esc: 27,
  escape: 27,
  space: 32,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  /// https://w3c.github.io/uievents/#events-keyboard-key-location
  arrowup: 38,
  arrowdown: 40,
  arrowleft: 37,
  arrowright: 39,
  del: 46,
  delete: 46,
  ins: 45,
  insert: 45,
  home: 36,
  end: 35,
  pageup: 33,
  pagedown: 34,
  capslock: 20,
  num_0: 96,
  num_1: 97,
  num_2: 98,
  num_3: 99,
  num_4: 100,
  num_5: 101,
  num_6: 102,
  num_7: 103,
  num_8: 104,
  num_9: 105,
  num_multiply: 106,
  num_add: 107,
  num_enter: 108,
  num_subtract: 109,
  num_decimal: 110,
  num_divide: 111,
  "\u21EA": 20,
  ",": 188,
  ".": 190,
  "/": 191,
  "`": 192,
  "-": isff ? 173 : 189,
  "=": isff ? 61 : 187,
  ";": isff ? 59 : 186,
  "'": 222,
  "{": 219,
  "}": 221,
  "[": 219,
  "]": 221,
  "\\": 220
};
var _modifier = {
  // shiftKey
  "\u21E7": 16,
  shift: 16,
  // altKey
  "\u2325": 18,
  alt: 18,
  option: 18,
  // ctrlKey
  "\u2303": 17,
  ctrl: 17,
  control: 17,
  // metaKey
  "\u2318": 91,
  cmd: 91,
  meta: 91,
  command: 91
};
var modifierMap = {
  16: "shiftKey",
  18: "altKey",
  17: "ctrlKey",
  91: "metaKey",
  shiftKey: 16,
  ctrlKey: 17,
  altKey: 18,
  metaKey: 91
};
var _mods = {
  16: false,
  18: false,
  17: false,
  91: false
};
var _handlers = {};
for (let k4 = 1; k4 < 20; k4++) {
  _keyMap[`f${k4}`] = 111 + k4;
}
var _downKeys = [];
var winListendFocus = null;
var winListendFullscreen = null;
var _scope = "all";
var elementEventMap = /* @__PURE__ */ new Map();
var code = (x4) => _keyMap[x4.toLowerCase()] || _modifier[x4.toLowerCase()] || x4.toUpperCase().charCodeAt(0);
var getKey = (x4) => Object.keys(_keyMap).find((k4) => _keyMap[k4] === x4);
var getModifier = (x4) => Object.keys(_modifier).find((k4) => _modifier[k4] === x4);
var setScope = (scope) => {
  _scope = scope || "all";
};
var getScope = () => {
  return _scope || "all";
};
var getPressedKeyCodes = () => {
  return _downKeys.slice(0);
};
var getPressedKeyString = () => {
  return _downKeys.map(
    (c9) => getKey(c9) || getModifier(c9) || String.fromCharCode(c9)
  );
};
var getAllKeyCodes = () => {
  const result = [];
  Object.keys(_handlers).forEach((k4) => {
    _handlers[k4].forEach(({ key, scope, mods, shortcut }) => {
      result.push({
        scope,
        shortcut,
        mods,
        keys: key.split("+").map((v4) => code(v4))
      });
    });
  });
  return result;
};
var filter = (event) => {
  const target = event.target || event.srcElement;
  const { tagName } = target;
  let flag = true;
  const isInput = tagName === "INPUT" && ![
    "checkbox",
    "radio",
    "range",
    "button",
    "file",
    "reset",
    "submit",
    "color"
  ].includes(target.type);
  if (target.isContentEditable || (isInput || tagName === "TEXTAREA" || tagName === "SELECT") && !target.readOnly) {
    flag = false;
  }
  return flag;
};
var isPressed = (keyCode) => {
  if (typeof keyCode === "string") {
    keyCode = code(keyCode);
  }
  return _downKeys.indexOf(keyCode) !== -1;
};
var deleteScope = (scope, newScope) => {
  let handlers;
  let i10;
  if (!scope) scope = getScope();
  for (const key in _handlers) {
    if (Object.prototype.hasOwnProperty.call(_handlers, key)) {
      handlers = _handlers[key];
      for (i10 = 0; i10 < handlers.length; ) {
        if (handlers[i10].scope === scope) {
          const deleteItems = handlers.splice(i10, 1);
          deleteItems.forEach(({ element }) => removeKeyEvent(element));
        } else {
          i10++;
        }
      }
    }
  }
  if (getScope() === scope) setScope(newScope || "all");
};
function clearModifier(event) {
  let key = getLayoutIndependentKeyCode(event);
  if (event.key && event.key.toLowerCase() === "capslock") {
    key = code(event.key);
  }
  const i10 = _downKeys.indexOf(key);
  if (i10 >= 0) {
    _downKeys.splice(i10, 1);
  }
  if (event.key && event.key.toLowerCase() === "meta") {
    _downKeys.splice(0, _downKeys.length);
  }
  if (key === 93 || key === 224) key = 91;
  if (key in _mods) {
    _mods[key] = false;
    for (const k4 in _modifier)
      if (_modifier[k4] === key) hotkeys[k4] = false;
  }
}
var unbind = (keysInfo, ...args) => {
  if (typeof keysInfo === "undefined") {
    Object.keys(_handlers).forEach((key) => {
      if (Array.isArray(_handlers[key])) {
        _handlers[key].forEach((info) => eachUnbind(info));
      }
      delete _handlers[key];
    });
    removeKeyEvent(null);
  } else if (Array.isArray(keysInfo)) {
    keysInfo.forEach((info) => {
      if (info.key) eachUnbind(info);
    });
  } else if (typeof keysInfo === "object") {
    if (keysInfo.key) eachUnbind(keysInfo);
  } else if (typeof keysInfo === "string") {
    let [scope, method] = args;
    if (typeof scope === "function") {
      method = scope;
      scope = "";
    }
    eachUnbind({
      key: keysInfo,
      scope,
      method,
      splitKey: "+"
    });
  }
};
var eachUnbind = ({
  key,
  scope,
  method,
  splitKey = "+"
}) => {
  const multipleKeys = getKeys(key);
  multipleKeys.forEach((originKey) => {
    const unbindKeys = originKey.split(splitKey);
    const len = unbindKeys.length;
    const lastKey = unbindKeys[len - 1];
    const keyCode = lastKey === "*" ? "*" : code(lastKey);
    if (!_handlers[keyCode]) return;
    if (!scope) scope = getScope();
    const mods = len > 1 ? getMods(_modifier, unbindKeys) : [];
    const unbindElements = [];
    _handlers[keyCode] = _handlers[keyCode].filter((record) => {
      const isMatchingMethod = method ? record.method === method : true;
      const isUnbind = isMatchingMethod && record.scope === scope && compareArray(record.mods, mods);
      if (isUnbind) unbindElements.push(record.element);
      return !isUnbind;
    });
    unbindElements.forEach((element) => removeKeyEvent(element));
  });
};
function eventHandler(event, handler, scope, element) {
  if (handler.element !== element) {
    return;
  }
  let modifiersMatch;
  if (handler.scope === scope || handler.scope === "all") {
    modifiersMatch = handler.mods.length > 0;
    for (const y6 in _mods) {
      if (Object.prototype.hasOwnProperty.call(_mods, y6)) {
        if (!_mods[y6] && handler.mods.indexOf(+y6) > -1 || _mods[y6] && handler.mods.indexOf(+y6) === -1) {
          modifiersMatch = false;
        }
      }
    }
    if (handler.mods.length === 0 && !_mods[16] && !_mods[18] && !_mods[17] && !_mods[91] || modifiersMatch || handler.shortcut === "*") {
      handler.keys = [];
      handler.keys = handler.keys.concat(_downKeys);
      if (handler.method(event, handler) === false) {
        if (event.preventDefault) event.preventDefault();
        else event.returnValue = false;
        if (event.stopPropagation) event.stopPropagation();
        if (event.cancelBubble) event.cancelBubble = true;
      }
    }
  }
}
function dispatch(event, element) {
  const asterisk = _handlers["*"];
  let key = getLayoutIndependentKeyCode(event);
  if (event.key && event.key.toLowerCase() === "capslock") {
    return;
  }
  const filterFn = hotkeys.filter || filter;
  if (!filterFn.call(this, event)) return;
  if (key === 93 || key === 224) key = 91;
  if (_downKeys.indexOf(key) === -1 && key !== 229) _downKeys.push(key);
  ["metaKey", "ctrlKey", "altKey", "shiftKey"].forEach((keyName) => {
    const keyNum = modifierMap[keyName];
    if (event[keyName] && _downKeys.indexOf(keyNum) === -1) {
      _downKeys.push(keyNum);
    } else if (!event[keyName] && _downKeys.indexOf(keyNum) > -1) {
      _downKeys.splice(_downKeys.indexOf(keyNum), 1);
    } else if (keyName === "metaKey" && event[keyName]) {
      _downKeys = _downKeys.filter((k4) => k4 in modifierMap || k4 === key);
    }
  });
  if (key in _mods) {
    _mods[key] = true;
    for (const k4 in _modifier) {
      if (Object.prototype.hasOwnProperty.call(_modifier, k4)) {
        const eventKey = modifierMap[_modifier[k4]];
        hotkeys[k4] = event[eventKey];
      }
    }
    if (!asterisk) return;
  }
  for (const e13 in _mods) {
    if (Object.prototype.hasOwnProperty.call(_mods, e13)) {
      _mods[e13] = event[modifierMap[e13]];
    }
  }
  if (event.getModifierState && !(event.altKey && !event.ctrlKey) && event.getModifierState("AltGraph")) {
    if (_downKeys.indexOf(17) === -1) {
      _downKeys.push(17);
    }
    if (_downKeys.indexOf(18) === -1) {
      _downKeys.push(18);
    }
    _mods[17] = true;
    _mods[18] = true;
  }
  const scope = getScope();
  if (asterisk) {
    for (let i10 = 0; i10 < asterisk.length; i10++) {
      if (asterisk[i10].scope === scope && (event.type === "keydown" && asterisk[i10].keydown || event.type === "keyup" && asterisk[i10].keyup)) {
        eventHandler(event, asterisk[i10], scope, element);
      }
    }
  }
  if (!(key in _handlers)) return;
  const handlerKey = _handlers[key];
  const keyLen = handlerKey.length;
  for (let i10 = 0; i10 < keyLen; i10++) {
    if (event.type === "keydown" && handlerKey[i10].keydown || event.type === "keyup" && handlerKey[i10].keyup) {
      if (handlerKey[i10].key) {
        const record = handlerKey[i10];
        const { splitKey } = record;
        const keyShortcut = record.key.split(splitKey);
        const _downKeysCurrent = [];
        for (let a7 = 0; a7 < keyShortcut.length; a7++) {
          _downKeysCurrent.push(code(keyShortcut[a7]));
        }
        if (_downKeysCurrent.sort().join("") === _downKeys.sort().join("")) {
          eventHandler(event, record, scope, element);
        }
      }
    }
  }
}
var hotkeys = function hotkeys2(key, option, method) {
  _downKeys = [];
  const keys = getKeys(key);
  let mods = [];
  let scope = "all";
  let element = document;
  let i10 = 0;
  let keyup = false;
  let keydown = true;
  let splitKey = "+";
  let capture = false;
  let single = false;
  if (method === void 0 && typeof option === "function") {
    method = option;
  }
  if (Object.prototype.toString.call(option) === "[object Object]") {
    const opts = option;
    if (opts.scope) scope = opts.scope;
    if (opts.element) element = opts.element;
    if (opts.keyup) keyup = opts.keyup;
    if (opts.keydown !== void 0) keydown = opts.keydown;
    if (opts.capture !== void 0) capture = opts.capture;
    if (typeof opts.splitKey === "string") splitKey = opts.splitKey;
    if (opts.single === true) single = true;
  }
  if (typeof option === "string") scope = option;
  if (single) unbind(key, scope);
  for (; i10 < keys.length; i10++) {
    const currentKey = keys[i10].split(splitKey);
    mods = [];
    if (currentKey.length > 1) mods = getMods(_modifier, currentKey);
    let finalKey = currentKey[currentKey.length - 1];
    finalKey = finalKey === "*" ? "*" : code(finalKey);
    if (!(finalKey in _handlers)) _handlers[finalKey] = [];
    _handlers[finalKey].push({
      keyup,
      keydown,
      scope,
      mods,
      shortcut: keys[i10],
      method,
      key: keys[i10],
      splitKey,
      element
    });
  }
  if (typeof element !== "undefined" && typeof window !== "undefined") {
    if (!elementEventMap.has(element)) {
      const keydownListener = (event = window.event) => dispatch(event, element);
      const keyupListenr = (event = window.event) => {
        dispatch(event, element);
        clearModifier(event);
      };
      elementEventMap.set(element, { keydownListener, keyupListenr, capture });
      addEvent(element, "keydown", keydownListener, capture);
      addEvent(element, "keyup", keyupListenr, capture);
    }
    if (!winListendFocus) {
      const listener = () => {
        _downKeys = [];
      };
      winListendFocus = { listener, capture };
      addEvent(window, "focus", listener, capture);
    }
    if (!winListendFullscreen && typeof document !== "undefined") {
      const onFullscreenChange = () => {
        _downKeys = [];
        for (const k4 in _mods) _mods[k4] = false;
        for (const k4 in _modifier) hotkeys2[k4] = false;
      };
      const fullscreenListener = onFullscreenChange;
      const webkitListener = onFullscreenChange;
      document.addEventListener("fullscreenchange", fullscreenListener);
      document.addEventListener("webkitfullscreenchange", webkitListener);
      winListendFullscreen = { fullscreen: fullscreenListener, webkit: webkitListener };
    }
  }
};
function trigger(shortcut, scope = "all") {
  Object.keys(_handlers).forEach((key) => {
    const dataList = _handlers[key].filter(
      (item) => item.scope === scope && item.shortcut === shortcut
    );
    dataList.forEach((data) => {
      if (data && data.method) {
        data.method({}, data);
      }
    });
  });
}
function removeKeyEvent(element) {
  const values = Object.values(_handlers).flat();
  const findindex = values.findIndex(({ element: el }) => el === element);
  if (findindex < 0 && element) {
    const { keydownListener, keyupListenr, capture } = elementEventMap.get(element) || {};
    if (keydownListener && keyupListenr) {
      removeEvent(element, "keyup", keyupListenr, capture);
      removeEvent(element, "keydown", keydownListener, capture);
      elementEventMap.delete(element);
    }
  }
  if (values.length <= 0 || elementEventMap.size <= 0) {
    const eventKeys = Array.from(elementEventMap.keys());
    eventKeys.forEach((el) => {
      const { keydownListener, keyupListenr, capture } = elementEventMap.get(el) || {};
      if (keydownListener && keyupListenr) {
        removeEvent(el, "keyup", keyupListenr, capture);
        removeEvent(el, "keydown", keydownListener, capture);
        elementEventMap.delete(el);
      }
    });
    elementEventMap.clear();
    Object.keys(_handlers).forEach((key) => delete _handlers[key]);
    if (winListendFocus) {
      const { listener, capture } = winListendFocus;
      removeEvent(window, "focus", listener, capture);
      winListendFocus = null;
    }
    if (winListendFullscreen && typeof document !== "undefined") {
      document.removeEventListener("fullscreenchange", winListendFullscreen.fullscreen);
      document.removeEventListener("webkitfullscreenchange", winListendFullscreen.webkit);
      winListendFullscreen = null;
    }
  }
}
var _api = {
  getPressedKeyString,
  setScope,
  getScope,
  deleteScope,
  getPressedKeyCodes,
  getAllKeyCodes,
  isPressed,
  filter,
  trigger,
  unbind,
  keyMap: _keyMap,
  modifier: _modifier,
  modifierMap
};
for (const a7 in _api) {
  const key = a7;
  if (Object.prototype.hasOwnProperty.call(_api, key)) {
    hotkeys[key] = _api[key];
  }
}
if (typeof window !== "undefined") {
  const _hotkeys = window.hotkeys;
  hotkeys.noConflict = (deep) => {
    if (deep && window.hotkeys === hotkeys) {
      window.hotkeys = _hotkeys;
    }
    return hotkeys;
  };
  window.hotkeys = hotkeys;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = hotkeys;
  module.exports.default = hotkeys;
}

// node_modules/tslib/tslib.es6.mjs
function __decorate(decorators, target, key, desc) {
  var c9 = arguments.length, r12 = c9 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d7;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r12 = Reflect.decorate(decorators, target, key, desc);
  else for (var i10 = decorators.length - 1; i10 >= 0; i10--) if (d7 = decorators[i10]) r12 = (c9 < 3 ? d7(r12) : c9 > 3 ? d7(target, key, r12) : d7(target, key)) || r12;
  return c9 > 3 && r12 && Object.defineProperty(target, key, r12), r12;
}

// node_modules/@lit/reactive-element/css-tag.js
var t6 = window;
var e8 = t6.ShadowRoot && (void 0 === t6.ShadyCSS || t6.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s6 = /* @__PURE__ */ Symbol();
var n8 = /* @__PURE__ */ new WeakMap();
var o9 = class {
  constructor(t8, e13, n14) {
    if (this._$cssResult$ = true, n14 !== s6) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t8, this.t = e13;
  }
  get styleSheet() {
    let t8 = this.o;
    const s10 = this.t;
    if (e8 && void 0 === t8) {
      const e13 = void 0 !== s10 && 1 === s10.length;
      e13 && (t8 = n8.get(s10)), void 0 === t8 && ((this.o = t8 = new CSSStyleSheet()).replaceSync(this.cssText), e13 && n8.set(s10, t8));
    }
    return t8;
  }
  toString() {
    return this.cssText;
  }
};
var r9 = (t8) => new o9("string" == typeof t8 ? t8 : t8 + "", void 0, s6);
var i8 = (t8, ...e13) => {
  const n14 = 1 === t8.length ? t8[0] : e13.reduce(((e14, s10, n15) => e14 + ((t9) => {
    if (true === t9._$cssResult$) return t9.cssText;
    if ("number" == typeof t9) return t9;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t9 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s10) + t8[n15 + 1]), t8[0]);
  return new o9(n14, t8, s6);
};
var S5 = (s10, n14) => {
  e8 ? s10.adoptedStyleSheets = n14.map(((t8) => t8 instanceof CSSStyleSheet ? t8 : t8.styleSheet)) : n14.forEach(((e13) => {
    const n15 = document.createElement("style"), o14 = t6.litNonce;
    void 0 !== o14 && n15.setAttribute("nonce", o14), n15.textContent = e13.cssText, s10.appendChild(n15);
  }));
};
var c7 = e8 ? (t8) => t8 : (t8) => t8 instanceof CSSStyleSheet ? ((t9) => {
  let e13 = "";
  for (const s10 of t9.cssRules) e13 += s10.cssText;
  return r9(e13);
})(t8) : t8;

// node_modules/@lit/reactive-element/reactive-element.js
var s7;
var e9 = window;
var r10 = e9.trustedTypes;
var h5 = r10 ? r10.emptyScript : "";
var o10 = e9.reactiveElementPolyfillSupport;
var n9 = { toAttribute(t8, i10) {
  switch (i10) {
    case Boolean:
      t8 = t8 ? h5 : null;
      break;
    case Object:
    case Array:
      t8 = null == t8 ? t8 : JSON.stringify(t8);
  }
  return t8;
}, fromAttribute(t8, i10) {
  let s10 = t8;
  switch (i10) {
    case Boolean:
      s10 = null !== t8;
      break;
    case Number:
      s10 = null === t8 ? null : Number(t8);
      break;
    case Object:
    case Array:
      try {
        s10 = JSON.parse(t8);
      } catch (t9) {
        s10 = null;
      }
  }
  return s10;
} };
var a5 = (t8, i10) => i10 !== t8 && (i10 == i10 || t8 == t8);
var l5 = { attribute: true, type: String, converter: n9, reflect: false, hasChanged: a5 };
var d5 = "finalized";
var u5 = class extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this._$Eu();
  }
  static addInitializer(t8) {
    var i10;
    this.finalize(), (null !== (i10 = this.h) && void 0 !== i10 ? i10 : this.h = []).push(t8);
  }
  static get observedAttributes() {
    this.finalize();
    const t8 = [];
    return this.elementProperties.forEach(((i10, s10) => {
      const e13 = this._$Ep(s10, i10);
      void 0 !== e13 && (this._$Ev.set(e13, s10), t8.push(e13));
    })), t8;
  }
  static createProperty(t8, i10 = l5) {
    if (i10.state && (i10.attribute = false), this.finalize(), this.elementProperties.set(t8, i10), !i10.noAccessor && !this.prototype.hasOwnProperty(t8)) {
      const s10 = "symbol" == typeof t8 ? /* @__PURE__ */ Symbol() : "__" + t8, e13 = this.getPropertyDescriptor(t8, s10, i10);
      void 0 !== e13 && Object.defineProperty(this.prototype, t8, e13);
    }
  }
  static getPropertyDescriptor(t8, i10, s10) {
    return { get() {
      return this[i10];
    }, set(e13) {
      const r12 = this[t8];
      this[i10] = e13, this.requestUpdate(t8, r12, s10);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t8) {
    return this.elementProperties.get(t8) || l5;
  }
  static finalize() {
    if (this.hasOwnProperty(d5)) return false;
    this[d5] = true;
    const t8 = Object.getPrototypeOf(this);
    if (t8.finalize(), void 0 !== t8.h && (this.h = [...t8.h]), this.elementProperties = new Map(t8.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const t9 = this.properties, i10 = [...Object.getOwnPropertyNames(t9), ...Object.getOwnPropertySymbols(t9)];
      for (const s10 of i10) this.createProperty(s10, t9[s10]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i10) {
    const s10 = [];
    if (Array.isArray(i10)) {
      const e13 = new Set(i10.flat(1 / 0).reverse());
      for (const i11 of e13) s10.unshift(c7(i11));
    } else void 0 !== i10 && s10.push(c7(i10));
    return s10;
  }
  static _$Ep(t8, i10) {
    const s10 = i10.attribute;
    return false === s10 ? void 0 : "string" == typeof s10 ? s10 : "string" == typeof t8 ? t8.toLowerCase() : void 0;
  }
  _$Eu() {
    var t8;
    this._$E_ = new Promise(((t9) => this.enableUpdating = t9)), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), null === (t8 = this.constructor.h) || void 0 === t8 || t8.forEach(((t9) => t9(this)));
  }
  addController(t8) {
    var i10, s10;
    (null !== (i10 = this._$ES) && void 0 !== i10 ? i10 : this._$ES = []).push(t8), void 0 !== this.renderRoot && this.isConnected && (null === (s10 = t8.hostConnected) || void 0 === s10 || s10.call(t8));
  }
  removeController(t8) {
    var i10;
    null === (i10 = this._$ES) || void 0 === i10 || i10.splice(this._$ES.indexOf(t8) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach(((t8, i10) => {
      this.hasOwnProperty(i10) && (this._$Ei.set(i10, this[i10]), delete this[i10]);
    }));
  }
  createRenderRoot() {
    var t8;
    const s10 = null !== (t8 = this.shadowRoot) && void 0 !== t8 ? t8 : this.attachShadow(this.constructor.shadowRootOptions);
    return S5(s10, this.constructor.elementStyles), s10;
  }
  connectedCallback() {
    var t8;
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), null === (t8 = this._$ES) || void 0 === t8 || t8.forEach(((t9) => {
      var i10;
      return null === (i10 = t9.hostConnected) || void 0 === i10 ? void 0 : i10.call(t9);
    }));
  }
  enableUpdating(t8) {
  }
  disconnectedCallback() {
    var t8;
    null === (t8 = this._$ES) || void 0 === t8 || t8.forEach(((t9) => {
      var i10;
      return null === (i10 = t9.hostDisconnected) || void 0 === i10 ? void 0 : i10.call(t9);
    }));
  }
  attributeChangedCallback(t8, i10, s10) {
    this._$AK(t8, s10);
  }
  _$EO(t8, i10, s10 = l5) {
    var e13;
    const r12 = this.constructor._$Ep(t8, s10);
    if (void 0 !== r12 && true === s10.reflect) {
      const h7 = (void 0 !== (null === (e13 = s10.converter) || void 0 === e13 ? void 0 : e13.toAttribute) ? s10.converter : n9).toAttribute(i10, s10.type);
      this._$El = t8, null == h7 ? this.removeAttribute(r12) : this.setAttribute(r12, h7), this._$El = null;
    }
  }
  _$AK(t8, i10) {
    var s10;
    const e13 = this.constructor, r12 = e13._$Ev.get(t8);
    if (void 0 !== r12 && this._$El !== r12) {
      const t9 = e13.getPropertyOptions(r12), h7 = "function" == typeof t9.converter ? { fromAttribute: t9.converter } : void 0 !== (null === (s10 = t9.converter) || void 0 === s10 ? void 0 : s10.fromAttribute) ? t9.converter : n9;
      this._$El = r12, this[r12] = h7.fromAttribute(i10, t9.type), this._$El = null;
    }
  }
  requestUpdate(t8, i10, s10) {
    let e13 = true;
    void 0 !== t8 && (((s10 = s10 || this.constructor.getPropertyOptions(t8)).hasChanged || a5)(this[t8], i10) ? (this._$AL.has(t8) || this._$AL.set(t8, i10), true === s10.reflect && this._$El !== t8 && (void 0 === this._$EC && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t8, s10))) : e13 = false), !this.isUpdatePending && e13 && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = true;
    try {
      await this._$E_;
    } catch (t9) {
      Promise.reject(t9);
    }
    const t8 = this.scheduleUpdate();
    return null != t8 && await t8, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t8;
    if (!this.isUpdatePending) return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach(((t9, i11) => this[i11] = t9)), this._$Ei = void 0);
    let i10 = false;
    const s10 = this._$AL;
    try {
      i10 = this.shouldUpdate(s10), i10 ? (this.willUpdate(s10), null === (t8 = this._$ES) || void 0 === t8 || t8.forEach(((t9) => {
        var i11;
        return null === (i11 = t9.hostUpdate) || void 0 === i11 ? void 0 : i11.call(t9);
      })), this.update(s10)) : this._$Ek();
    } catch (t9) {
      throw i10 = false, this._$Ek(), t9;
    }
    i10 && this._$AE(s10);
  }
  willUpdate(t8) {
  }
  _$AE(t8) {
    var i10;
    null === (i10 = this._$ES) || void 0 === i10 || i10.forEach(((t9) => {
      var i11;
      return null === (i11 = t9.hostUpdated) || void 0 === i11 ? void 0 : i11.call(t9);
    })), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t8)), this.updated(t8);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t8) {
    return true;
  }
  update(t8) {
    void 0 !== this._$EC && (this._$EC.forEach(((t9, i10) => this._$EO(i10, this[i10], t9))), this._$EC = void 0), this._$Ek();
  }
  updated(t8) {
  }
  firstUpdated(t8) {
  }
};
u5[d5] = true, u5.elementProperties = /* @__PURE__ */ new Map(), u5.elementStyles = [], u5.shadowRootOptions = { mode: "open" }, null == o10 || o10({ ReactiveElement: u5 }), (null !== (s7 = e9.reactiveElementVersions) && void 0 !== s7 ? s7 : e9.reactiveElementVersions = []).push("1.6.3");

// node_modules/lit-html/lit-html.js
var t7;
var i9 = window;
var s8 = i9.trustedTypes;
var e10 = s8 ? s8.createPolicy("lit-html", { createHTML: (t8) => t8 }) : void 0;
var o11 = "$lit$";
var n10 = `lit$${(Math.random() + "").slice(9)}$`;
var l6 = "?" + n10;
var h6 = `<${l6}>`;
var r11 = document;
var u6 = () => r11.createComment("");
var d6 = (t8) => null === t8 || "object" != typeof t8 && "function" != typeof t8;
var c8 = Array.isArray;
var v3 = (t8) => c8(t8) || "function" == typeof (null == t8 ? void 0 : t8[Symbol.iterator]);
var a6 = "[ 	\n\f\r]";
var f5 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var _3 = /-->/g;
var m3 = />/g;
var p5 = RegExp(`>|${a6}(?:([^\\s"'>=/]+)(${a6}*=${a6}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var g3 = /'/g;
var $3 = /"/g;
var y5 = /^(?:script|style|textarea|title)$/i;
var w3 = (t8) => (i10, ...s10) => ({ _$litType$: t8, strings: i10, values: s10 });
var x3 = w3(1);
var b5 = w3(2);
var T3 = /* @__PURE__ */ Symbol.for("lit-noChange");
var A3 = /* @__PURE__ */ Symbol.for("lit-nothing");
var E3 = /* @__PURE__ */ new WeakMap();
var C3 = r11.createTreeWalker(r11, 129, null, false);
function P3(t8, i10) {
  if (!Array.isArray(t8) || !t8.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e10 ? e10.createHTML(i10) : i10;
}
var V3 = (t8, i10) => {
  const s10 = t8.length - 1, e13 = [];
  let l9, r12 = 2 === i10 ? "<svg>" : "", u7 = f5;
  for (let i11 = 0; i11 < s10; i11++) {
    const s11 = t8[i11];
    let d7, c9, v4 = -1, a7 = 0;
    for (; a7 < s11.length && (u7.lastIndex = a7, c9 = u7.exec(s11), null !== c9); ) a7 = u7.lastIndex, u7 === f5 ? "!--" === c9[1] ? u7 = _3 : void 0 !== c9[1] ? u7 = m3 : void 0 !== c9[2] ? (y5.test(c9[2]) && (l9 = RegExp("</" + c9[2], "g")), u7 = p5) : void 0 !== c9[3] && (u7 = p5) : u7 === p5 ? ">" === c9[0] ? (u7 = null != l9 ? l9 : f5, v4 = -1) : void 0 === c9[1] ? v4 = -2 : (v4 = u7.lastIndex - c9[2].length, d7 = c9[1], u7 = void 0 === c9[3] ? p5 : '"' === c9[3] ? $3 : g3) : u7 === $3 || u7 === g3 ? u7 = p5 : u7 === _3 || u7 === m3 ? u7 = f5 : (u7 = p5, l9 = void 0);
    const w4 = u7 === p5 && t8[i11 + 1].startsWith("/>") ? " " : "";
    r12 += u7 === f5 ? s11 + h6 : v4 >= 0 ? (e13.push(d7), s11.slice(0, v4) + o11 + s11.slice(v4) + n10 + w4) : s11 + n10 + (-2 === v4 ? (e13.push(void 0), i11) : w4);
  }
  return [P3(t8, r12 + (t8[s10] || "<?>") + (2 === i10 ? "</svg>" : "")), e13];
};
var N3 = class _N {
  constructor({ strings: t8, _$litType$: i10 }, e13) {
    let h7;
    this.parts = [];
    let r12 = 0, d7 = 0;
    const c9 = t8.length - 1, v4 = this.parts, [a7, f6] = V3(t8, i10);
    if (this.el = _N.createElement(a7, e13), C3.currentNode = this.el.content, 2 === i10) {
      const t9 = this.el.content, i11 = t9.firstChild;
      i11.remove(), t9.append(...i11.childNodes);
    }
    for (; null !== (h7 = C3.nextNode()) && v4.length < c9; ) {
      if (1 === h7.nodeType) {
        if (h7.hasAttributes()) {
          const t9 = [];
          for (const i11 of h7.getAttributeNames()) if (i11.endsWith(o11) || i11.startsWith(n10)) {
            const s10 = f6[d7++];
            if (t9.push(i11), void 0 !== s10) {
              const t10 = h7.getAttribute(s10.toLowerCase() + o11).split(n10), i12 = /([.?@])?(.*)/.exec(s10);
              v4.push({ type: 1, index: r12, name: i12[2], strings: t10, ctor: "." === i12[1] ? H3 : "?" === i12[1] ? L3 : "@" === i12[1] ? z3 : k3 });
            } else v4.push({ type: 6, index: r12 });
          }
          for (const i11 of t9) h7.removeAttribute(i11);
        }
        if (y5.test(h7.tagName)) {
          const t9 = h7.textContent.split(n10), i11 = t9.length - 1;
          if (i11 > 0) {
            h7.textContent = s8 ? s8.emptyScript : "";
            for (let s10 = 0; s10 < i11; s10++) h7.append(t9[s10], u6()), C3.nextNode(), v4.push({ type: 2, index: ++r12 });
            h7.append(t9[i11], u6());
          }
        }
      } else if (8 === h7.nodeType) if (h7.data === l6) v4.push({ type: 2, index: r12 });
      else {
        let t9 = -1;
        for (; -1 !== (t9 = h7.data.indexOf(n10, t9 + 1)); ) v4.push({ type: 7, index: r12 }), t9 += n10.length - 1;
      }
      r12++;
    }
  }
  static createElement(t8, i10) {
    const s10 = r11.createElement("template");
    return s10.innerHTML = t8, s10;
  }
};
function S6(t8, i10, s10 = t8, e13) {
  var o14, n14, l9, h7;
  if (i10 === T3) return i10;
  let r12 = void 0 !== e13 ? null === (o14 = s10._$Co) || void 0 === o14 ? void 0 : o14[e13] : s10._$Cl;
  const u7 = d6(i10) ? void 0 : i10._$litDirective$;
  return (null == r12 ? void 0 : r12.constructor) !== u7 && (null === (n14 = null == r12 ? void 0 : r12._$AO) || void 0 === n14 || n14.call(r12, false), void 0 === u7 ? r12 = void 0 : (r12 = new u7(t8), r12._$AT(t8, s10, e13)), void 0 !== e13 ? (null !== (l9 = (h7 = s10)._$Co) && void 0 !== l9 ? l9 : h7._$Co = [])[e13] = r12 : s10._$Cl = r12), void 0 !== r12 && (i10 = S6(t8, r12._$AS(t8, i10.values), r12, e13)), i10;
}
var M3 = class {
  constructor(t8, i10) {
    this._$AV = [], this._$AN = void 0, this._$AD = t8, this._$AM = i10;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t8) {
    var i10;
    const { el: { content: s10 }, parts: e13 } = this._$AD, o14 = (null !== (i10 = null == t8 ? void 0 : t8.creationScope) && void 0 !== i10 ? i10 : r11).importNode(s10, true);
    C3.currentNode = o14;
    let n14 = C3.nextNode(), l9 = 0, h7 = 0, u7 = e13[0];
    for (; void 0 !== u7; ) {
      if (l9 === u7.index) {
        let i11;
        2 === u7.type ? i11 = new R3(n14, n14.nextSibling, this, t8) : 1 === u7.type ? i11 = new u7.ctor(n14, u7.name, u7.strings, this, t8) : 6 === u7.type && (i11 = new Z3(n14, this, t8)), this._$AV.push(i11), u7 = e13[++h7];
      }
      l9 !== (null == u7 ? void 0 : u7.index) && (n14 = C3.nextNode(), l9++);
    }
    return C3.currentNode = r11, o14;
  }
  v(t8) {
    let i10 = 0;
    for (const s10 of this._$AV) void 0 !== s10 && (void 0 !== s10.strings ? (s10._$AI(t8, s10, i10), i10 += s10.strings.length - 2) : s10._$AI(t8[i10])), i10++;
  }
};
var R3 = class _R {
  constructor(t8, i10, s10, e13) {
    var o14;
    this.type = 2, this._$AH = A3, this._$AN = void 0, this._$AA = t8, this._$AB = i10, this._$AM = s10, this.options = e13, this._$Cp = null === (o14 = null == e13 ? void 0 : e13.isConnected) || void 0 === o14 || o14;
  }
  get _$AU() {
    var t8, i10;
    return null !== (i10 = null === (t8 = this._$AM) || void 0 === t8 ? void 0 : t8._$AU) && void 0 !== i10 ? i10 : this._$Cp;
  }
  get parentNode() {
    let t8 = this._$AA.parentNode;
    const i10 = this._$AM;
    return void 0 !== i10 && 11 === (null == t8 ? void 0 : t8.nodeType) && (t8 = i10.parentNode), t8;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t8, i10 = this) {
    t8 = S6(this, t8, i10), d6(t8) ? t8 === A3 || null == t8 || "" === t8 ? (this._$AH !== A3 && this._$AR(), this._$AH = A3) : t8 !== this._$AH && t8 !== T3 && this._(t8) : void 0 !== t8._$litType$ ? this.g(t8) : void 0 !== t8.nodeType ? this.$(t8) : v3(t8) ? this.T(t8) : this._(t8);
  }
  k(t8) {
    return this._$AA.parentNode.insertBefore(t8, this._$AB);
  }
  $(t8) {
    this._$AH !== t8 && (this._$AR(), this._$AH = this.k(t8));
  }
  _(t8) {
    this._$AH !== A3 && d6(this._$AH) ? this._$AA.nextSibling.data = t8 : this.$(r11.createTextNode(t8)), this._$AH = t8;
  }
  g(t8) {
    var i10;
    const { values: s10, _$litType$: e13 } = t8, o14 = "number" == typeof e13 ? this._$AC(t8) : (void 0 === e13.el && (e13.el = N3.createElement(P3(e13.h, e13.h[0]), this.options)), e13);
    if ((null === (i10 = this._$AH) || void 0 === i10 ? void 0 : i10._$AD) === o14) this._$AH.v(s10);
    else {
      const t9 = new M3(o14, this), i11 = t9.u(this.options);
      t9.v(s10), this.$(i11), this._$AH = t9;
    }
  }
  _$AC(t8) {
    let i10 = E3.get(t8.strings);
    return void 0 === i10 && E3.set(t8.strings, i10 = new N3(t8)), i10;
  }
  T(t8) {
    c8(this._$AH) || (this._$AH = [], this._$AR());
    const i10 = this._$AH;
    let s10, e13 = 0;
    for (const o14 of t8) e13 === i10.length ? i10.push(s10 = new _R(this.k(u6()), this.k(u6()), this, this.options)) : s10 = i10[e13], s10._$AI(o14), e13++;
    e13 < i10.length && (this._$AR(s10 && s10._$AB.nextSibling, e13), i10.length = e13);
  }
  _$AR(t8 = this._$AA.nextSibling, i10) {
    var s10;
    for (null === (s10 = this._$AP) || void 0 === s10 || s10.call(this, false, true, i10); t8 && t8 !== this._$AB; ) {
      const i11 = t8.nextSibling;
      t8.remove(), t8 = i11;
    }
  }
  setConnected(t8) {
    var i10;
    void 0 === this._$AM && (this._$Cp = t8, null === (i10 = this._$AP) || void 0 === i10 || i10.call(this, t8));
  }
};
var k3 = class {
  constructor(t8, i10, s10, e13, o14) {
    this.type = 1, this._$AH = A3, this._$AN = void 0, this.element = t8, this.name = i10, this._$AM = e13, this.options = o14, s10.length > 2 || "" !== s10[0] || "" !== s10[1] ? (this._$AH = Array(s10.length - 1).fill(new String()), this.strings = s10) : this._$AH = A3;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t8, i10 = this, s10, e13) {
    const o14 = this.strings;
    let n14 = false;
    if (void 0 === o14) t8 = S6(this, t8, i10, 0), n14 = !d6(t8) || t8 !== this._$AH && t8 !== T3, n14 && (this._$AH = t8);
    else {
      const e14 = t8;
      let l9, h7;
      for (t8 = o14[0], l9 = 0; l9 < o14.length - 1; l9++) h7 = S6(this, e14[s10 + l9], i10, l9), h7 === T3 && (h7 = this._$AH[l9]), n14 || (n14 = !d6(h7) || h7 !== this._$AH[l9]), h7 === A3 ? t8 = A3 : t8 !== A3 && (t8 += (null != h7 ? h7 : "") + o14[l9 + 1]), this._$AH[l9] = h7;
    }
    n14 && !e13 && this.j(t8);
  }
  j(t8) {
    t8 === A3 ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t8 ? t8 : "");
  }
};
var H3 = class extends k3 {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t8) {
    this.element[this.name] = t8 === A3 ? void 0 : t8;
  }
};
var I3 = s8 ? s8.emptyScript : "";
var L3 = class extends k3 {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t8) {
    t8 && t8 !== A3 ? this.element.setAttribute(this.name, I3) : this.element.removeAttribute(this.name);
  }
};
var z3 = class extends k3 {
  constructor(t8, i10, s10, e13, o14) {
    super(t8, i10, s10, e13, o14), this.type = 5;
  }
  _$AI(t8, i10 = this) {
    var s10;
    if ((t8 = null !== (s10 = S6(this, t8, i10, 0)) && void 0 !== s10 ? s10 : A3) === T3) return;
    const e13 = this._$AH, o14 = t8 === A3 && e13 !== A3 || t8.capture !== e13.capture || t8.once !== e13.once || t8.passive !== e13.passive, n14 = t8 !== A3 && (e13 === A3 || o14);
    o14 && this.element.removeEventListener(this.name, this, e13), n14 && this.element.addEventListener(this.name, this, t8), this._$AH = t8;
  }
  handleEvent(t8) {
    var i10, s10;
    "function" == typeof this._$AH ? this._$AH.call(null !== (s10 = null === (i10 = this.options) || void 0 === i10 ? void 0 : i10.host) && void 0 !== s10 ? s10 : this.element, t8) : this._$AH.handleEvent(t8);
  }
};
var Z3 = class {
  constructor(t8, i10, s10) {
    this.element = t8, this.type = 6, this._$AN = void 0, this._$AM = i10, this.options = s10;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t8) {
    S6(this, t8);
  }
};
var B3 = i9.litHtmlPolyfillSupport;
null == B3 || B3(N3, R3), (null !== (t7 = i9.litHtmlVersions) && void 0 !== t7 ? t7 : i9.litHtmlVersions = []).push("2.8.0");
var D2 = (t8, i10, s10) => {
  var e13, o14;
  const n14 = null !== (e13 = null == s10 ? void 0 : s10.renderBefore) && void 0 !== e13 ? e13 : i10;
  let l9 = n14._$litPart$;
  if (void 0 === l9) {
    const t9 = null !== (o14 = null == s10 ? void 0 : s10.renderBefore) && void 0 !== o14 ? o14 : null;
    n14._$litPart$ = l9 = new R3(i10.insertBefore(u6(), t9), t9, void 0, null != s10 ? s10 : {});
  }
  return l9._$AI(t8), l9;
};

// node_modules/@material/mwc-icon/node_modules/lit-element/lit-element.js
var l7;
var o12;
var s9 = class extends u5 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t8, e13;
    const i10 = super.createRenderRoot();
    return null !== (t8 = (e13 = this.renderOptions).renderBefore) && void 0 !== t8 || (e13.renderBefore = i10.firstChild), i10;
  }
  update(t8) {
    const i10 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t8), this._$Do = D2(i10, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t8;
    super.connectedCallback(), null === (t8 = this._$Do) || void 0 === t8 || t8.setConnected(true);
  }
  disconnectedCallback() {
    var t8;
    super.disconnectedCallback(), null === (t8 = this._$Do) || void 0 === t8 || t8.setConnected(false);
  }
  render() {
    return T3;
  }
};
s9.finalized = true, s9._$litElement$ = true, null === (l7 = globalThis.litElementHydrateSupport) || void 0 === l7 || l7.call(globalThis, { LitElement: s9 });
var n11 = globalThis.litElementPolyfillSupport;
null == n11 || n11({ LitElement: s9 });
(null !== (o12 = globalThis.litElementVersions) && void 0 !== o12 ? o12 : globalThis.litElementVersions = []).push("3.3.3");

// node_modules/@lit/reactive-element/decorators/custom-element.js
var e11 = (e13) => (n14) => "function" == typeof n14 ? ((e14, n15) => (customElements.define(e14, n15), n15))(e13, n14) : ((e14, n15) => {
  const { kind: t8, elements: s10 } = n15;
  return { kind: t8, elements: s10, finisher(n16) {
    customElements.define(e14, n16);
  } };
})(e13, n14);

// node_modules/@lit/reactive-element/decorators/query-assigned-elements.js
var n13;
var e12 = null != (null === (n13 = window.HTMLSlotElement) || void 0 === n13 ? void 0 : n13.prototype.assignedElements) ? (o14, n14) => o14.assignedElements(n14) : (o14, n14) => o14.assignedNodes(n14).filter(((o15) => o15.nodeType === Node.ELEMENT_NODE));

// node_modules/@material/mwc-icon/mwc-icon-host.css.js
var styles = i8`:host{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}`;

// node_modules/@material/mwc-icon/mwc-icon.js
var Icon = class Icon2 extends s9 {
  /** @soyTemplate */
  render() {
    return x3`<span><slot></slot></span>`;
  }
};
Icon.styles = [styles];
Icon = __decorate([
  e11("mwc-icon")
], Icon);

// src/index.ts
var ShortyKey = class extends i7 {
  constructor() {
    super(...arguments);
    this.hotkey = "";
  }
  render() {
    return b4`
            <div class="shorty-key">${this.hotkey}</div>
        `;
  }
};
ShortyKey.styles = i4`
        .shorty-key {
            padding: 2px 4px;

            background: var(--shorty-key-background-color);
            color: var(--shorty-key-text-color);

            border-radius: var(--shorty-key-border-radius);
            font-size: var(--shorty-key-font-size);
            text-align: center;

            font-weight: lighter;
        }
    `;
__decorateClass([
  n7()
], ShortyKey.prototype, "hotkey", 2);
ShortyKey = __decorateClass([
  t5("shorty-key")
], ShortyKey);
var ShortyAction = class extends i7 {
  constructor() {
    super(...arguments);
    this.name = "";
    this.icon = "";
    this.hotkeys = [];
    this.selected = false;
    this.hovered = false;
  }
  render() {
    return b4`
            <div class="shorty-action ${this.selected ? "action-selected" : ""}">
                <mwc-icon class="action-icon">${this.icon}</mwc-icon>
                <p class="action-name">
                    ${this.name}
                </p>
                <div class="action-hotkeys">
                    ${this.hotkeys && this.hotkeys.length > 0 ? b4`
                                ${this.hotkeys.map((hotkey) => b4`
                                    <shorty-key hotkey="${hotkey}"></shorty-key>
                                `)}
                            ` : void 0}
                </div>
            </div>
        `;
  }
};
ShortyAction.styles = i4`
        .shorty-action {
            display: flex;
            flex-direction: row;
            align-items: center;

            padding: 0 1em;
        }

        .shorty-action:hover {
            background-color: var(--shorty-selected-background);
            box-shadow: inset 2px 0 0 0 var(--shorty-secondary-color);
            cursor: pointer;
        }

        .action-selected {
            background-color: var(--shorty-selected-background);
            box-shadow: inset 2px 0 0 0 var(--shorty-secondary-color);
        }

        .action-icon {
            display: flex;
            align-items: center;

            margin-right: 1em;

            width: var(--shorty-action-icon-size);
            height: var(--shorty-action-icon-size);
            color: var(--shorty-secondary-text-color);
        }

        .action-name {
            flex-grow: 1;
            color: var(--shorty-text-color);
        }

        .action-hotkeys {
            display: flex;
            flex-direction: row;
            gap: 0.2em;
        }
    `;
__decorateClass([
  n7({ type: String })
], ShortyAction.prototype, "name", 2);
__decorateClass([
  n7({ type: String })
], ShortyAction.prototype, "icon", 2);
__decorateClass([
  n7({ type: Array })
], ShortyAction.prototype, "hotkeys", 2);
__decorateClass([
  n7({ type: Boolean })
], ShortyAction.prototype, "selected", 2);
__decorateClass([
  n7({ type: Boolean })
], ShortyAction.prototype, "hovered", 2);
ShortyAction = __decorateClass([
  t5("shorty-action")
], ShortyAction);
var ShortyHeader = class extends i7 {
  constructor() {
    super(...arguments);
    this.breadcrumbs = [];
    this.placeholder = "";
    this.search = "";
  }
  render() {
    return b4`
            <div class="shorty-header">
                <div class="breadcrumb-list">
                    ${this.breadcrumbs.map((breadcrumb) => b4`
                        <button>${breadcrumb}</button>
                    `)}
                </div>
                <div class="search-container">
                    <input
                            type="text"
                            placeholder="${this.placeholder}"
                            @input=${(e13) => {
      this.dispatchEvent(new CustomEvent("search-changed", {
        detail: e13.target.value,
        bubbles: true,
        composed: true
      }));
    }}
                </
                >
            </div>
            </div>
        `;
  }
};
ShortyHeader.styles = i4`
        .shorty-header {
            display: flex;
            flex-direction: column;
            row-gap: 1.25em;

            padding: 1.25em;
            
            background: var(--shorty-primary-color);
            
            border-top-left-radius: var(--shorty-content-border-radius);
            border-top-right-radius: var(--shorty-content-border-radius);
        }

        .breadcrumb-list {
            float: left;
            display: flex;
            flex-direction: row;
            gap: 0.5em;
        }

        .breadcrumb-list button {
            margin: 0;
            padding: 2px 4px;

            background: var(--shorty-key-background-color);
            color: var(--shorty-key-text-color);
            border: none;

            border-radius: var(--shorty-key-border-radius);
            font-size: var(--shorty-key-font-size);
            text-align: center;
        }

        .search-container {
            float: right;
        }

        .search-container input {
            border: none;
            background: none;
            outline: none;

            width: 100%;

            font-size: 1em;
            color: var(--shorty-text-color);
        }
    `;
__decorateClass([
  n7({ type: Array })
], ShortyHeader.prototype, "breadcrumbs", 2);
__decorateClass([
  n7({ type: String })
], ShortyHeader.prototype, "placeholder", 2);
__decorateClass([
  n7({ type: String })
], ShortyHeader.prototype, "search", 2);
ShortyHeader = __decorateClass([
  t5("shorty-header")
], ShortyHeader);
var ShortyFooter = class extends i7 {
  render() {
    return b4`
            <div class="shorty-footer">
              <span class="help">
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 1280">
                  <path d="M1013 376c0 73.4-.4 113.3-1.1 120.2a159.9 159.9 0 0 1-90.2 127.3c-20 9.6-36.7 14-59.2 15.5-7.1.5-121.9.9-255 1h-242l95.5-95.5 95.5-95.5-38.3-38.2-38.2-38.3-160 160c-88 88-160 160.4-160 161 0 .6 72 73 160 161l160 160 38.2-38.3 38.3-38.2-95.5-95.5-95.5-95.5h251.1c252.9 0 259.8-.1 281.4-3.6 72.1-11.8 136.9-54.1 178.5-116.4 8.6-12.9 22.6-40.5 28-55.4 4.4-12 10.7-36.1 13.1-50.6 1.6-9.6 1.8-21 2.1-132.8l.4-122.2H1013v110z"></path>
                </svg>
                to select
              </span>
                <span class="help">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0V0z" fill="none"></path>
                  <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0V0z" fill="none"></path>
                  <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"></path>
                </svg>
                to navigate
              </span>
                <span class="help">
                <shorty-key hotkey="esc"></shorty-key>
                to close
              </span>
                <span class="help">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                        d="M6.707 4.879A3 3 0 018.828 4H15a3 3 0 013 3v6a3 3 0 01-3 3H8.828a3 3 0 01-2.12-.879l-4.415-4.414a1 1 0 010-1.414l4.414-4.414zm4 2.414a1 1 0 00-1.414 1.414L10.586 10l-1.293 1.293a1 1 0 101.414 1.414L12 11.414l1.293 1.293a1 1 0 001.414-1.414L13.414 10l1.293-1.293a1 1 0 00-1.414-1.414L12 8.586l-1.293-1.293z"
                        clip-rule="evenodd"></path>
                </svg>
                move to parent
              </span>
            </div>
        `;
  }
};
ShortyFooter.styles = i4`
        .shorty-footer {
            display: flex;
            flex-direction: row;
            gap: 1em;
            background: var(--shorty-footer-background);
            margin-top: auto;
            padding: 0.5em 1em;
            border-bottom-left-radius: var(--shorty-content-border-radius);
            border-bottom-right-radius: var(--shorty-content-border-radius);
        }

        .shorty-footer svg {
            width: 1em;
            height: 1em;
            padding: 0.06em 0.25em;
            fill: var(--shorty-secondary-text-color);
            background-color: var(--shorty-secondary-background-color);
            border-radius: var(--shorty-key-border-radius);
            font-size: var(--shorty-key-font-size);
        }

        .shorty-footer .help {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 0.25em;
            text-align: center;
            font-size: var(--shorty-key-font-size);
            color: var(--shorty-secondary-text-color);
        }
    `;
ShortyFooter = __decorateClass([
  t5("shorty-footer")
], ShortyFooter);
var ShortyBody = class extends i7 {
  constructor() {
    super(...arguments);
    this.data = [];
    this.selectedIndex = 0;
  }
  render() {
    return b4`
            <div class="shorty-body">
                ${this.data.map(
      (shorty, index) => {
        return b4`
                                <shorty-action name="${shorty.name}" icon="${shorty.icon}"
                                               .hotkeys="${shorty.hotkeys}"
                                               .selected="${this.selectedIndex === index}"></shorty-action>
                            `;
      }
    )}
            </div>
        `;
  }
};
ShortyBody.styles = i4`
        .shorty-body {
            display: flex;
            flex-direction: column;
            padding: 0.5em 0;

            height: var(--shorty-actions-height);
            background-color: var(--shorty-primary-color);

            border-top: 1px solid rgb(239, 241, 244);
            border-bottom: 1px solid rgb(239, 241, 244);
        }
    `;
__decorateClass([
  n7()
], ShortyBody.prototype, "data", 2);
__decorateClass([
  n7({ type: Number })
], ShortyBody.prototype, "selectedIndex", 2);
ShortyBody = __decorateClass([
  t5("shorty-body")
], ShortyBody);
var HeyShorty = class extends i7 {
  constructor() {
    super(...arguments);
    this.data = [];
    this.breadcrumbs = [];
    this.search = "";
    this.placeholder = "Search...";
    this.hotkeys = "cmd+k,ctrl+k";
    this.navigationUpHotkey = "up";
    this.navigationDownHotkey = "down";
    this.closeShortyHotkey = "esc";
    this.navigationBackHotkey = "backspace";
    this.handleActionHotkey = "enter";
    this.visible = false;
    this._selectedIndex = 0;
    this._parentStack = [];
  }
  toggle() {
    this.visible = !this.visible;
  }
  updated(changedProperties) {
    if (changedProperties.has("visible")) {
      if (!this.visible) {
        this._selectedIndex = 0;
      }
    }
    if (changedProperties.has("data") && this.breadcrumbs.length === 0 && this.data[0]) {
      this.breadcrumbs = [this.data[0].id];
    }
  }
  connectedCallback() {
    super.connectedCallback();
    hotkeys(this.hotkeys, (keyboardEvent, hotkeysEvent) => {
      keyboardEvent.preventDefault();
      this.toggle();
    });
    hotkeys(this.closeShortyHotkey, (keyboardEvent, hotkeysEvent) => {
      keyboardEvent.preventDefault();
      this.visible = false;
    });
    hotkeys(this.navigationUpHotkey, (keyboardEvent, hotkeysEvent) => {
      keyboardEvent.preventDefault();
      if (this._selectedIndex > 0) {
        this._selectedIndex--;
      } else {
        this._selectedIndex = this.data.length - 1;
      }
    });
    hotkeys(this.navigationDownHotkey, (keyboardEvent, hotkeysEvent) => {
      keyboardEvent.preventDefault();
      if (this._selectedIndex < this.data.length - 1) {
        this._selectedIndex++;
      } else {
        this._selectedIndex = 0;
      }
    });
    hotkeys(this.navigationBackHotkey, (keyboardEvent, hotkeysEvent) => {
      if (this.search) return;
      const parent = this._parentStack.pop();
      if (parent) {
        this.data = parent;
        this.breadcrumbs = this.breadcrumbs.slice(0, -1);
        this._selectedIndex = 0;
      }
    });
    hotkeys(this.handleActionHotkey, (keyboardEvent, hotkeysEvent) => {
      keyboardEvent.preventDefault();
      const selectedAction = this.data[this._selectedIndex];
      if (selectedAction?.children?.length) {
        this._parentStack.push(this.data);
        this.breadcrumbs = [...this.breadcrumbs, selectedAction.id];
        this.data = selectedAction.children;
        this._selectedIndex = 0;
      } else {
        if (selectedAction?.handler) {
          selectedAction.handler();
        }
      }
    });
  }
  render() {
    return true ? b4`
            <div class="shorty">
                <shorty-header placeholder=${this.placeholder} .breadcrumbs=${this.breadcrumbs}
                               @search-changed=${(e13) => {
      this.search = e13.detail;
    }}></shorty-header>
                <shorty-body .data=${this.data} .selectedIndex=${this._selectedIndex}></shorty-body>
                <shorty-footer></shorty-footer>
            </div>
        ` : void 0;
  }
};
HeyShorty.styles = i4`
        :host {
            --shorty-width: 640px;
            --shorty-text-color: rgb(60, 65, 73);
            --shorty-font-size: 16px;
            --shorty-top: 20%;

            --shorty-key-border-radius: 0.25em;
            --shorty-key-background-color: rgb(239, 241, 244);
            --shorty-key-text-color: rgb(107, 111, 118);
            --shorty-key-font-size: 0.85em;

            --shorty-secondary-background-color: rgb(239, 241, 244);
            --shorty-secondary-text-color: rgb(107, 111, 118);

            --shorty-selected-background: rgb(248, 249, 251);
            
            --shorty-primary-color: #fff;
            --shorty-secondary-color: rgb(110, 94, 210);
            
            --shorty-content-shadow: rgb(0 0 0 / 50%) 0px 16px 70px;
            --shorty-content-border-radius: 0.5em;

            --shorty-actions-height: 300px;
            --shorty-footer-background: rgba(242, 242, 242, 0.4);
            --shorty-placeholder-color: #8e8e8e;
            --shorty-z-index: 99999;
            
            --shorty-action-icon-size: 1.2em;
        }

        .shorty {
            position: fixed;
            left: 50%;
            transform: translateX(-50%);
            top: var(--shorty-top);

            display: flex;
            flex-direction: column;

            min-height: 400px;
            max-width: var(--shorty-width);
            width: 600px; //TODO: remove this
            background-color: var(--shorty-primary-color);

            box-shadow: var(--shorty-content-shadow);
            border-radius: var(--shorty-content-border-radius);

            z-index: var(--shorty-z-index);
        }
    `;
__decorateClass([
  n7({
    type: Array,
    hasChanged() {
      return true;
    }
  })
], HeyShorty.prototype, "data", 2);
__decorateClass([
  n7({ type: Array })
], HeyShorty.prototype, "breadcrumbs", 2);
__decorateClass([
  r8()
], HeyShorty.prototype, "search", 2);
__decorateClass([
  n7()
], HeyShorty.prototype, "placeholder", 2);
__decorateClass([
  n7()
], HeyShorty.prototype, "hotkeys", 2);
__decorateClass([
  n7()
], HeyShorty.prototype, "navigationUpHotkey", 2);
__decorateClass([
  n7()
], HeyShorty.prototype, "navigationDownHotkey", 2);
__decorateClass([
  n7()
], HeyShorty.prototype, "closeShortyHotkey", 2);
__decorateClass([
  n7()
], HeyShorty.prototype, "navigationBackHotkey", 2);
__decorateClass([
  n7()
], HeyShorty.prototype, "handleActionHotkey", 2);
__decorateClass([
  n7({ type: Boolean })
], HeyShorty.prototype, "visible", 2);
__decorateClass([
  r8()
], HeyShorty.prototype, "_selectedIndex", 2);
HeyShorty = __decorateClass([
  t5("hey-shorty")
], HeyShorty);
export {
  HeyShorty,
  ShortyAction,
  ShortyBody,
  ShortyFooter,
  ShortyHeader,
  ShortyKey
};
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
@lit/reactive-element/css-tag.js:
@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

hotkeys-js/dist/hotkeys-js.js:
  (*!
   * hotkeys-js v4.0.2
   * A simple micro-library for defining and dispatching keyboard shortcuts. It has no dependencies.
   * 
   * @author kenny wong <wowohoo@qq.com>
   * @license MIT
   * @homepage https://jaywcjlove.github.io/hotkeys-js
   *)

@material/mwc-icon/mwc-icon-host.css.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-LIcense-Identifier: Apache-2.0
   *)

@material/mwc-icon/mwc-icon.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
