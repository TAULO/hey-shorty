var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};

// node_modules/@lit/reactive-element/css-tag.js
var t = globalThis;
var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s = /* @__PURE__ */ Symbol();
var o = /* @__PURE__ */ new WeakMap();
var n = class {
  constructor(t4, e5, o6) {
    if (this._$cssResult$ = true, o6 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t4, this.t = e5;
  }
  get styleSheet() {
    let t4 = this.o;
    const s4 = this.t;
    if (e && void 0 === t4) {
      const e5 = void 0 !== s4 && 1 === s4.length;
      e5 && (t4 = o.get(s4)), void 0 === t4 && ((this.o = t4 = new CSSStyleSheet()).replaceSync(this.cssText), e5 && o.set(s4, t4));
    }
    return t4;
  }
  toString() {
    return this.cssText;
  }
};
var r = (t4) => new n("string" == typeof t4 ? t4 : t4 + "", void 0, s);
var i = (t4, ...e5) => {
  const o6 = 1 === t4.length ? t4[0] : e5.reduce((e6, s4, o7) => e6 + ((t5) => {
    if (true === t5._$cssResult$) return t5.cssText;
    if ("number" == typeof t5) return t5;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t5 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s4) + t4[o7 + 1], t4[0]);
  return new n(o6, t4, s);
};
var S = (s4, o6) => {
  if (e) s4.adoptedStyleSheets = o6.map((t4) => t4 instanceof CSSStyleSheet ? t4 : t4.styleSheet);
  else for (const e5 of o6) {
    const o7 = document.createElement("style"), n5 = t.litNonce;
    void 0 !== n5 && o7.setAttribute("nonce", n5), o7.textContent = e5.cssText, s4.appendChild(o7);
  }
};
var c = e ? (t4) => t4 : (t4) => t4 instanceof CSSStyleSheet ? ((t5) => {
  let e5 = "";
  for (const s4 of t5.cssRules) e5 += s4.cssText;
  return r(e5);
})(t4) : t4;

// node_modules/@lit/reactive-element/reactive-element.js
var { is: i2, defineProperty: e2, getOwnPropertyDescriptor: h, getOwnPropertyNames: r2, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object;
var a = globalThis;
var c2 = a.trustedTypes;
var l = c2 ? c2.emptyScript : "";
var p = a.reactiveElementPolyfillSupport;
var d = (t4, s4) => t4;
var u = { toAttribute(t4, s4) {
  switch (s4) {
    case Boolean:
      t4 = t4 ? l : null;
      break;
    case Object:
    case Array:
      t4 = null == t4 ? t4 : JSON.stringify(t4);
  }
  return t4;
}, fromAttribute(t4, s4) {
  let i5 = t4;
  switch (s4) {
    case Boolean:
      i5 = null !== t4;
      break;
    case Number:
      i5 = null === t4 ? null : Number(t4);
      break;
    case Object:
    case Array:
      try {
        i5 = JSON.parse(t4);
      } catch (t5) {
        i5 = null;
      }
  }
  return i5;
} };
var f = (t4, s4) => !i2(t4, s4);
var b = { attribute: true, type: String, converter: u, reflect: false, useDefault: false, hasChanged: f };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), a.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var y = class extends HTMLElement {
  static addInitializer(t4) {
    this._$Ei(), (this.l ??= []).push(t4);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t4, s4 = b) {
    if (s4.state && (s4.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t4) && ((s4 = Object.create(s4)).wrapped = true), this.elementProperties.set(t4, s4), !s4.noAccessor) {
      const i5 = /* @__PURE__ */ Symbol(), h3 = this.getPropertyDescriptor(t4, i5, s4);
      void 0 !== h3 && e2(this.prototype, t4, h3);
    }
  }
  static getPropertyDescriptor(t4, s4, i5) {
    const { get: e5, set: r6 } = h(this.prototype, t4) ?? { get() {
      return this[s4];
    }, set(t5) {
      this[s4] = t5;
    } };
    return { get: e5, set(s5) {
      const h3 = e5?.call(this);
      r6?.call(this, s5), this.requestUpdate(t4, h3, i5);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t4) {
    return this.elementProperties.get(t4) ?? b;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d("elementProperties"))) return;
    const t4 = n2(this);
    t4.finalize(), void 0 !== t4.l && (this.l = [...t4.l]), this.elementProperties = new Map(t4.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
      const t5 = this.properties, s4 = [...r2(t5), ...o2(t5)];
      for (const i5 of s4) this.createProperty(i5, t5[i5]);
    }
    const t4 = this[Symbol.metadata];
    if (null !== t4) {
      const s4 = litPropertyMetadata.get(t4);
      if (void 0 !== s4) for (const [t5, i5] of s4) this.elementProperties.set(t5, i5);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t5, s4] of this.elementProperties) {
      const i5 = this._$Eu(t5, s4);
      void 0 !== i5 && this._$Eh.set(i5, t5);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s4) {
    const i5 = [];
    if (Array.isArray(s4)) {
      const e5 = new Set(s4.flat(1 / 0).reverse());
      for (const s5 of e5) i5.unshift(c(s5));
    } else void 0 !== s4 && i5.push(c(s4));
    return i5;
  }
  static _$Eu(t4, s4) {
    const i5 = s4.attribute;
    return false === i5 ? void 0 : "string" == typeof i5 ? i5 : "string" == typeof t4 ? t4.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t4) => this.enableUpdating = t4), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t4) => t4(this));
  }
  addController(t4) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t4), void 0 !== this.renderRoot && this.isConnected && t4.hostConnected?.();
  }
  removeController(t4) {
    this._$EO?.delete(t4);
  }
  _$E_() {
    const t4 = /* @__PURE__ */ new Map(), s4 = this.constructor.elementProperties;
    for (const i5 of s4.keys()) this.hasOwnProperty(i5) && (t4.set(i5, this[i5]), delete this[i5]);
    t4.size > 0 && (this._$Ep = t4);
  }
  createRenderRoot() {
    const t4 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S(t4, this.constructor.elementStyles), t4;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t4) => t4.hostConnected?.());
  }
  enableUpdating(t4) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t4) => t4.hostDisconnected?.());
  }
  attributeChangedCallback(t4, s4, i5) {
    this._$AK(t4, i5);
  }
  _$ET(t4, s4) {
    const i5 = this.constructor.elementProperties.get(t4), e5 = this.constructor._$Eu(t4, i5);
    if (void 0 !== e5 && true === i5.reflect) {
      const h3 = (void 0 !== i5.converter?.toAttribute ? i5.converter : u).toAttribute(s4, i5.type);
      this._$Em = t4, null == h3 ? this.removeAttribute(e5) : this.setAttribute(e5, h3), this._$Em = null;
    }
  }
  _$AK(t4, s4) {
    const i5 = this.constructor, e5 = i5._$Eh.get(t4);
    if (void 0 !== e5 && this._$Em !== e5) {
      const t5 = i5.getPropertyOptions(e5), h3 = "function" == typeof t5.converter ? { fromAttribute: t5.converter } : void 0 !== t5.converter?.fromAttribute ? t5.converter : u;
      this._$Em = e5;
      const r6 = h3.fromAttribute(s4, t5.type);
      this[e5] = r6 ?? this._$Ej?.get(e5) ?? r6, this._$Em = null;
    }
  }
  requestUpdate(t4, s4, i5, e5 = false, h3) {
    if (void 0 !== t4) {
      const r6 = this.constructor;
      if (false === e5 && (h3 = this[t4]), i5 ??= r6.getPropertyOptions(t4), !((i5.hasChanged ?? f)(h3, s4) || i5.useDefault && i5.reflect && h3 === this._$Ej?.get(t4) && !this.hasAttribute(r6._$Eu(t4, i5)))) return;
      this.C(t4, s4, i5);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t4, s4, { useDefault: i5, reflect: e5, wrapped: h3 }, r6) {
    i5 && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t4) && (this._$Ej.set(t4, r6 ?? s4 ?? this[t4]), true !== h3 || void 0 !== r6) || (this._$AL.has(t4) || (this.hasUpdated || i5 || (s4 = void 0), this._$AL.set(t4, s4)), true === e5 && this._$Em !== t4 && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t4));
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t5) {
      Promise.reject(t5);
    }
    const t4 = this.scheduleUpdate();
    return null != t4 && await t4, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [t6, s5] of this._$Ep) this[t6] = s5;
        this._$Ep = void 0;
      }
      const t5 = this.constructor.elementProperties;
      if (t5.size > 0) for (const [s5, i5] of t5) {
        const { wrapped: t6 } = i5, e5 = this[s5];
        true !== t6 || this._$AL.has(s5) || void 0 === e5 || this.C(s5, void 0, i5, e5);
      }
    }
    let t4 = false;
    const s4 = this._$AL;
    try {
      t4 = this.shouldUpdate(s4), t4 ? (this.willUpdate(s4), this._$EO?.forEach((t5) => t5.hostUpdate?.()), this.update(s4)) : this._$EM();
    } catch (s5) {
      throw t4 = false, this._$EM(), s5;
    }
    t4 && this._$AE(s4);
  }
  willUpdate(t4) {
  }
  _$AE(t4) {
    this._$EO?.forEach((t5) => t5.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t4)), this.updated(t4);
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
  shouldUpdate(t4) {
    return true;
  }
  update(t4) {
    this._$Eq &&= this._$Eq.forEach((t5) => this._$ET(t5, this[t5])), this._$EM();
  }
  updated(t4) {
  }
  firstUpdated(t4) {
  }
};
y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[d("elementProperties")] = /* @__PURE__ */ new Map(), y[d("finalized")] = /* @__PURE__ */ new Map(), p?.({ ReactiveElement: y }), (a.reactiveElementVersions ??= []).push("2.1.2");

// node_modules/lit-html/lit-html.js
var t2 = globalThis;
var i3 = (t4) => t4;
var s2 = t2.trustedTypes;
var e3 = s2 ? s2.createPolicy("lit-html", { createHTML: (t4) => t4 }) : void 0;
var h2 = "$lit$";
var o3 = `lit$${Math.random().toFixed(9).slice(2)}$`;
var n3 = "?" + o3;
var r3 = `<${n3}>`;
var l2 = document;
var c3 = () => l2.createComment("");
var a2 = (t4) => null === t4 || "object" != typeof t4 && "function" != typeof t4;
var u2 = Array.isArray;
var d2 = (t4) => u2(t4) || "function" == typeof t4?.[Symbol.iterator];
var f2 = "[ 	\n\f\r]";
var v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var _ = /-->/g;
var m = />/g;
var p2 = RegExp(`>|${f2}(?:([^\\s"'>=/]+)(${f2}*=${f2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var g = /'/g;
var $ = /"/g;
var y2 = /^(?:script|style|textarea|title)$/i;
var x = (t4) => (i5, ...s4) => ({ _$litType$: t4, strings: i5, values: s4 });
var b2 = x(1);
var w = x(2);
var T = x(3);
var E = /* @__PURE__ */ Symbol.for("lit-noChange");
var A = /* @__PURE__ */ Symbol.for("lit-nothing");
var C = /* @__PURE__ */ new WeakMap();
var P = l2.createTreeWalker(l2, 129);
function V(t4, i5) {
  if (!u2(t4) || !t4.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e3 ? e3.createHTML(i5) : i5;
}
var N = (t4, i5) => {
  const s4 = t4.length - 1, e5 = [];
  let n5, l3 = 2 === i5 ? "<svg>" : 3 === i5 ? "<math>" : "", c4 = v;
  for (let i6 = 0; i6 < s4; i6++) {
    const s5 = t4[i6];
    let a3, u3, d3 = -1, f3 = 0;
    for (; f3 < s5.length && (c4.lastIndex = f3, u3 = c4.exec(s5), null !== u3); ) f3 = c4.lastIndex, c4 === v ? "!--" === u3[1] ? c4 = _ : void 0 !== u3[1] ? c4 = m : void 0 !== u3[2] ? (y2.test(u3[2]) && (n5 = RegExp("</" + u3[2], "g")), c4 = p2) : void 0 !== u3[3] && (c4 = p2) : c4 === p2 ? ">" === u3[0] ? (c4 = n5 ?? v, d3 = -1) : void 0 === u3[1] ? d3 = -2 : (d3 = c4.lastIndex - u3[2].length, a3 = u3[1], c4 = void 0 === u3[3] ? p2 : '"' === u3[3] ? $ : g) : c4 === $ || c4 === g ? c4 = p2 : c4 === _ || c4 === m ? c4 = v : (c4 = p2, n5 = void 0);
    const x2 = c4 === p2 && t4[i6 + 1].startsWith("/>") ? " " : "";
    l3 += c4 === v ? s5 + r3 : d3 >= 0 ? (e5.push(a3), s5.slice(0, d3) + h2 + s5.slice(d3) + o3 + x2) : s5 + o3 + (-2 === d3 ? i6 : x2);
  }
  return [V(t4, l3 + (t4[s4] || "<?>") + (2 === i5 ? "</svg>" : 3 === i5 ? "</math>" : "")), e5];
};
var S2 = class _S {
  constructor({ strings: t4, _$litType$: i5 }, e5) {
    let r6;
    this.parts = [];
    let l3 = 0, a3 = 0;
    const u3 = t4.length - 1, d3 = this.parts, [f3, v2] = N(t4, i5);
    if (this.el = _S.createElement(f3, e5), P.currentNode = this.el.content, 2 === i5 || 3 === i5) {
      const t5 = this.el.content.firstChild;
      t5.replaceWith(...t5.childNodes);
    }
    for (; null !== (r6 = P.nextNode()) && d3.length < u3; ) {
      if (1 === r6.nodeType) {
        if (r6.hasAttributes()) for (const t5 of r6.getAttributeNames()) if (t5.endsWith(h2)) {
          const i6 = v2[a3++], s4 = r6.getAttribute(t5).split(o3), e6 = /([.?@])?(.*)/.exec(i6);
          d3.push({ type: 1, index: l3, name: e6[2], strings: s4, ctor: "." === e6[1] ? I : "?" === e6[1] ? L : "@" === e6[1] ? z : H }), r6.removeAttribute(t5);
        } else t5.startsWith(o3) && (d3.push({ type: 6, index: l3 }), r6.removeAttribute(t5));
        if (y2.test(r6.tagName)) {
          const t5 = r6.textContent.split(o3), i6 = t5.length - 1;
          if (i6 > 0) {
            r6.textContent = s2 ? s2.emptyScript : "";
            for (let s4 = 0; s4 < i6; s4++) r6.append(t5[s4], c3()), P.nextNode(), d3.push({ type: 2, index: ++l3 });
            r6.append(t5[i6], c3());
          }
        }
      } else if (8 === r6.nodeType) if (r6.data === n3) d3.push({ type: 2, index: l3 });
      else {
        let t5 = -1;
        for (; -1 !== (t5 = r6.data.indexOf(o3, t5 + 1)); ) d3.push({ type: 7, index: l3 }), t5 += o3.length - 1;
      }
      l3++;
    }
  }
  static createElement(t4, i5) {
    const s4 = l2.createElement("template");
    return s4.innerHTML = t4, s4;
  }
};
function M(t4, i5, s4 = t4, e5) {
  if (i5 === E) return i5;
  let h3 = void 0 !== e5 ? s4._$Co?.[e5] : s4._$Cl;
  const o6 = a2(i5) ? void 0 : i5._$litDirective$;
  return h3?.constructor !== o6 && (h3?._$AO?.(false), void 0 === o6 ? h3 = void 0 : (h3 = new o6(t4), h3._$AT(t4, s4, e5)), void 0 !== e5 ? (s4._$Co ??= [])[e5] = h3 : s4._$Cl = h3), void 0 !== h3 && (i5 = M(t4, h3._$AS(t4, i5.values), h3, e5)), i5;
}
var R = class {
  constructor(t4, i5) {
    this._$AV = [], this._$AN = void 0, this._$AD = t4, this._$AM = i5;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t4) {
    const { el: { content: i5 }, parts: s4 } = this._$AD, e5 = (t4?.creationScope ?? l2).importNode(i5, true);
    P.currentNode = e5;
    let h3 = P.nextNode(), o6 = 0, n5 = 0, r6 = s4[0];
    for (; void 0 !== r6; ) {
      if (o6 === r6.index) {
        let i6;
        2 === r6.type ? i6 = new k(h3, h3.nextSibling, this, t4) : 1 === r6.type ? i6 = new r6.ctor(h3, r6.name, r6.strings, this, t4) : 6 === r6.type && (i6 = new Z(h3, this, t4)), this._$AV.push(i6), r6 = s4[++n5];
      }
      o6 !== r6?.index && (h3 = P.nextNode(), o6++);
    }
    return P.currentNode = l2, e5;
  }
  p(t4) {
    let i5 = 0;
    for (const s4 of this._$AV) void 0 !== s4 && (void 0 !== s4.strings ? (s4._$AI(t4, s4, i5), i5 += s4.strings.length - 2) : s4._$AI(t4[i5])), i5++;
  }
};
var k = class _k {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t4, i5, s4, e5) {
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t4, this._$AB = i5, this._$AM = s4, this.options = e5, this._$Cv = e5?.isConnected ?? true;
  }
  get parentNode() {
    let t4 = this._$AA.parentNode;
    const i5 = this._$AM;
    return void 0 !== i5 && 11 === t4?.nodeType && (t4 = i5.parentNode), t4;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t4, i5 = this) {
    t4 = M(this, t4, i5), a2(t4) ? t4 === A || null == t4 || "" === t4 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t4 !== this._$AH && t4 !== E && this._(t4) : void 0 !== t4._$litType$ ? this.$(t4) : void 0 !== t4.nodeType ? this.T(t4) : d2(t4) ? this.k(t4) : this._(t4);
  }
  O(t4) {
    return this._$AA.parentNode.insertBefore(t4, this._$AB);
  }
  T(t4) {
    this._$AH !== t4 && (this._$AR(), this._$AH = this.O(t4));
  }
  _(t4) {
    this._$AH !== A && a2(this._$AH) ? this._$AA.nextSibling.data = t4 : this.T(l2.createTextNode(t4)), this._$AH = t4;
  }
  $(t4) {
    const { values: i5, _$litType$: s4 } = t4, e5 = "number" == typeof s4 ? this._$AC(t4) : (void 0 === s4.el && (s4.el = S2.createElement(V(s4.h, s4.h[0]), this.options)), s4);
    if (this._$AH?._$AD === e5) this._$AH.p(i5);
    else {
      const t5 = new R(e5, this), s5 = t5.u(this.options);
      t5.p(i5), this.T(s5), this._$AH = t5;
    }
  }
  _$AC(t4) {
    let i5 = C.get(t4.strings);
    return void 0 === i5 && C.set(t4.strings, i5 = new S2(t4)), i5;
  }
  k(t4) {
    u2(this._$AH) || (this._$AH = [], this._$AR());
    const i5 = this._$AH;
    let s4, e5 = 0;
    for (const h3 of t4) e5 === i5.length ? i5.push(s4 = new _k(this.O(c3()), this.O(c3()), this, this.options)) : s4 = i5[e5], s4._$AI(h3), e5++;
    e5 < i5.length && (this._$AR(s4 && s4._$AB.nextSibling, e5), i5.length = e5);
  }
  _$AR(t4 = this._$AA.nextSibling, s4) {
    for (this._$AP?.(false, true, s4); t4 !== this._$AB; ) {
      const s5 = i3(t4).nextSibling;
      i3(t4).remove(), t4 = s5;
    }
  }
  setConnected(t4) {
    void 0 === this._$AM && (this._$Cv = t4, this._$AP?.(t4));
  }
};
var H = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t4, i5, s4, e5, h3) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t4, this.name = i5, this._$AM = e5, this.options = h3, s4.length > 2 || "" !== s4[0] || "" !== s4[1] ? (this._$AH = Array(s4.length - 1).fill(new String()), this.strings = s4) : this._$AH = A;
  }
  _$AI(t4, i5 = this, s4, e5) {
    const h3 = this.strings;
    let o6 = false;
    if (void 0 === h3) t4 = M(this, t4, i5, 0), o6 = !a2(t4) || t4 !== this._$AH && t4 !== E, o6 && (this._$AH = t4);
    else {
      const e6 = t4;
      let n5, r6;
      for (t4 = h3[0], n5 = 0; n5 < h3.length - 1; n5++) r6 = M(this, e6[s4 + n5], i5, n5), r6 === E && (r6 = this._$AH[n5]), o6 ||= !a2(r6) || r6 !== this._$AH[n5], r6 === A ? t4 = A : t4 !== A && (t4 += (r6 ?? "") + h3[n5 + 1]), this._$AH[n5] = r6;
    }
    o6 && !e5 && this.j(t4);
  }
  j(t4) {
    t4 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t4 ?? "");
  }
};
var I = class extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t4) {
    this.element[this.name] = t4 === A ? void 0 : t4;
  }
};
var L = class extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t4) {
    this.element.toggleAttribute(this.name, !!t4 && t4 !== A);
  }
};
var z = class extends H {
  constructor(t4, i5, s4, e5, h3) {
    super(t4, i5, s4, e5, h3), this.type = 5;
  }
  _$AI(t4, i5 = this) {
    if ((t4 = M(this, t4, i5, 0) ?? A) === E) return;
    const s4 = this._$AH, e5 = t4 === A && s4 !== A || t4.capture !== s4.capture || t4.once !== s4.once || t4.passive !== s4.passive, h3 = t4 !== A && (s4 === A || e5);
    e5 && this.element.removeEventListener(this.name, this, s4), h3 && this.element.addEventListener(this.name, this, t4), this._$AH = t4;
  }
  handleEvent(t4) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t4) : this._$AH.handleEvent(t4);
  }
};
var Z = class {
  constructor(t4, i5, s4) {
    this.element = t4, this.type = 6, this._$AN = void 0, this._$AM = i5, this.options = s4;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t4) {
    M(this, t4);
  }
};
var B = t2.litHtmlPolyfillSupport;
B?.(S2, k), (t2.litHtmlVersions ??= []).push("3.3.2");
var D = (t4, i5, s4) => {
  const e5 = s4?.renderBefore ?? i5;
  let h3 = e5._$litPart$;
  if (void 0 === h3) {
    const t5 = s4?.renderBefore ?? null;
    e5._$litPart$ = h3 = new k(i5.insertBefore(c3(), t5), t5, void 0, s4 ?? {});
  }
  return h3._$AI(t4), h3;
};

// node_modules/lit-element/lit-element.js
var s3 = globalThis;
var i4 = class extends y {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t4 = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t4.firstChild, t4;
  }
  update(t4) {
    const r6 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t4), this._$Do = D(r6, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(true);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(false);
  }
  render() {
    return E;
  }
};
i4._$litElement$ = true, i4["finalized"] = true, s3.litElementHydrateSupport?.({ LitElement: i4 });
var o4 = s3.litElementPolyfillSupport;
o4?.({ LitElement: i4 });
(s3.litElementVersions ??= []).push("4.2.2");

// node_modules/@lit/reactive-element/decorators/custom-element.js
var t3 = (t4) => (e5, o6) => {
  void 0 !== o6 ? o6.addInitializer(() => {
    customElements.define(t4, e5);
  }) : customElements.define(t4, e5);
};

// node_modules/@lit/reactive-element/decorators/property.js
var o5 = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
var r4 = (t4 = o5, e5, r6) => {
  const { kind: n5, metadata: i5 } = r6;
  let s4 = globalThis.litPropertyMetadata.get(i5);
  if (void 0 === s4 && globalThis.litPropertyMetadata.set(i5, s4 = /* @__PURE__ */ new Map()), "setter" === n5 && ((t4 = Object.create(t4)).wrapped = true), s4.set(r6.name, t4), "accessor" === n5) {
    const { name: o6 } = r6;
    return { set(r7) {
      const n6 = e5.get.call(this);
      e5.set.call(this, r7), this.requestUpdate(o6, n6, t4, true, r7);
    }, init(e6) {
      return void 0 !== e6 && this.C(o6, void 0, t4, e6), e6;
    } };
  }
  if ("setter" === n5) {
    const { name: o6 } = r6;
    return function(r7) {
      const n6 = this[o6];
      e5.call(this, r7), this.requestUpdate(o6, n6, t4, true, r7);
    };
  }
  throw Error("Unsupported decorator location: " + n5);
};
function n4(t4) {
  return (e5, o6) => "object" == typeof o6 ? r4(t4, e5, o6) : ((t5, e6, o7) => {
    const r6 = e6.hasOwnProperty(o7);
    return e6.constructor.createProperty(o7, t5), r6 ? Object.getOwnPropertyDescriptor(e6, o7) : void 0;
  })(t4, e5, o6);
}

// node_modules/@lit/reactive-element/decorators/state.js
function r5(r6) {
  return n4({ ...r6, state: true, attribute: false });
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
  for (let i5 = 0; i5 < modsKeys.length; i5++) {
    modsCodes.push(modifier[modsKeys[i5].toLowerCase()]);
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
  for (let i5 = 0; i5 < arr1.length; i5++) {
    if (arr2.indexOf(arr1[i5]) === -1) isIndex = false;
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
for (let k2 = 1; k2 < 20; k2++) {
  _keyMap[`f${k2}`] = 111 + k2;
}
var _downKeys = [];
var winListendFocus = null;
var winListendFullscreen = null;
var _scope = "all";
var elementEventMap = /* @__PURE__ */ new Map();
var code = (x2) => _keyMap[x2.toLowerCase()] || _modifier[x2.toLowerCase()] || x2.toUpperCase().charCodeAt(0);
var getKey = (x2) => Object.keys(_keyMap).find((k2) => _keyMap[k2] === x2);
var getModifier = (x2) => Object.keys(_modifier).find((k2) => _modifier[k2] === x2);
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
    (c4) => getKey(c4) || getModifier(c4) || String.fromCharCode(c4)
  );
};
var getAllKeyCodes = () => {
  const result = [];
  Object.keys(_handlers).forEach((k2) => {
    _handlers[k2].forEach(({ key, scope, mods, shortcut }) => {
      result.push({
        scope,
        shortcut,
        mods,
        keys: key.split("+").map((v2) => code(v2))
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
  let i5;
  if (!scope) scope = getScope();
  for (const key in _handlers) {
    if (Object.prototype.hasOwnProperty.call(_handlers, key)) {
      handlers = _handlers[key];
      for (i5 = 0; i5 < handlers.length; ) {
        if (handlers[i5].scope === scope) {
          const deleteItems = handlers.splice(i5, 1);
          deleteItems.forEach(({ element }) => removeKeyEvent(element));
        } else {
          i5++;
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
  const i5 = _downKeys.indexOf(key);
  if (i5 >= 0) {
    _downKeys.splice(i5, 1);
  }
  if (event.key && event.key.toLowerCase() === "meta") {
    _downKeys.splice(0, _downKeys.length);
  }
  if (key === 93 || key === 224) key = 91;
  if (key in _mods) {
    _mods[key] = false;
    for (const k2 in _modifier)
      if (_modifier[k2] === key) hotkeys[k2] = false;
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
    for (const y3 in _mods) {
      if (Object.prototype.hasOwnProperty.call(_mods, y3)) {
        if (!_mods[y3] && handler.mods.indexOf(+y3) > -1 || _mods[y3] && handler.mods.indexOf(+y3) === -1) {
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
      _downKeys = _downKeys.filter((k2) => k2 in modifierMap || k2 === key);
    }
  });
  if (key in _mods) {
    _mods[key] = true;
    for (const k2 in _modifier) {
      if (Object.prototype.hasOwnProperty.call(_modifier, k2)) {
        const eventKey = modifierMap[_modifier[k2]];
        hotkeys[k2] = event[eventKey];
      }
    }
    if (!asterisk) return;
  }
  for (const e5 in _mods) {
    if (Object.prototype.hasOwnProperty.call(_mods, e5)) {
      _mods[e5] = event[modifierMap[e5]];
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
    for (let i5 = 0; i5 < asterisk.length; i5++) {
      if (asterisk[i5].scope === scope && (event.type === "keydown" && asterisk[i5].keydown || event.type === "keyup" && asterisk[i5].keyup)) {
        eventHandler(event, asterisk[i5], scope, element);
      }
    }
  }
  if (!(key in _handlers)) return;
  const handlerKey = _handlers[key];
  const keyLen = handlerKey.length;
  for (let i5 = 0; i5 < keyLen; i5++) {
    if (event.type === "keydown" && handlerKey[i5].keydown || event.type === "keyup" && handlerKey[i5].keyup) {
      if (handlerKey[i5].key) {
        const record = handlerKey[i5];
        const { splitKey } = record;
        const keyShortcut = record.key.split(splitKey);
        const _downKeysCurrent = [];
        for (let a3 = 0; a3 < keyShortcut.length; a3++) {
          _downKeysCurrent.push(code(keyShortcut[a3]));
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
  let i5 = 0;
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
  for (; i5 < keys.length; i5++) {
    const currentKey = keys[i5].split(splitKey);
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
      shortcut: keys[i5],
      method,
      key: keys[i5],
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
        for (const k2 in _mods) _mods[k2] = false;
        for (const k2 in _modifier) hotkeys2[k2] = false;
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
for (const a3 in _api) {
  const key = a3;
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

// src/index.ts
var ShortyKey = class extends i4 {
  constructor() {
    super(...arguments);
    this.hotkey = "";
  }
  render() {
    return b2`
            <div class="shorty-key">${this.hotkey}</div>
        `;
  }
};
ShortyKey.styles = i`
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
  n4()
], ShortyKey.prototype, "hotkey", 2);
ShortyKey = __decorateClass([
  t3("shorty-key")
], ShortyKey);
var ShortyAction = class extends i4 {
  constructor() {
    super(...arguments);
    this.name = "";
    this.icon = "";
    this.hotkeys = [];
    this.selected = false;
    this.hovered = false;
  }
  render() {
    return b2`
            <div class="shorty-action ${this.selected ? "action-selected" : ""}">
                <div class="action-icon"></div>
                <p class="action-name">
                    ${this.name}
                </p>
                <div class="action-hotkeys">
                    ${this.hotkeys && this.hotkeys.length > 0 ? b2`
                                ${this.hotkeys.map((hotkey) => b2`
                                    <shorty-key hotkey="${hotkey}"></shorty-key>
                                `)}
                            ` : void 0}
                </div>
            </div>
        `;
  }
};
ShortyAction.styles = i`
        .shorty-action {
            display: flex;
            flex-direction: row;
            align-items: center;

            padding: 0 1em;
        }

        .shorty-action:hover {
            background-color: var(--shorty-selected-background);
            border-left: 2px solid var(--shorty-accent-color);
            cursor: pointer;
        }

        .action-selected {
            background-color: var(--shorty-selected-background);
            border-left: 2px solid var(--shorty-accent-color);
        }

        .action-icon {
            width: 12px;
            height: 12px;
            background-color: var(--shorty-secondary-background-color);
            border-radius: 50%;
            margin-right: 1em;
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
  n4({ type: String })
], ShortyAction.prototype, "name", 2);
__decorateClass([
  n4({ type: String })
], ShortyAction.prototype, "icon", 2);
__decorateClass([
  n4({ type: Array })
], ShortyAction.prototype, "hotkeys", 2);
__decorateClass([
  n4({ type: Boolean })
], ShortyAction.prototype, "selected", 2);
__decorateClass([
  n4({ type: Boolean })
], ShortyAction.prototype, "hovered", 2);
ShortyAction = __decorateClass([
  t3("shorty-action")
], ShortyAction);
var ShortyHeader = class extends i4 {
  constructor() {
    super(...arguments);
    this.breadcrumbs = ["Home", "Library", "Data", "Reports"];
    this.placeholder = "";
  }
  render() {
    return b2`
            <div class="shorty-header">
                <div class="breadcrumb-list">
                    ${this.breadcrumbs.map((breadcrumb) => b2`
                        <button>${breadcrumb}</button>
                    `)}
                </div>
                <div class="search-container">
                    <input type="text" id="search-input" placeholder="${this.placeholder}"></input>
                </div>
            </div>
        `;
  }
};
ShortyHeader.styles = i`
        .shorty-header {
            display: flex;
            flex-direction: column;
            row-gap: 1.25em;

            padding: 1.25em;
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
  n4()
], ShortyHeader.prototype, "breadcrumbs", 2);
__decorateClass([
  n4({ type: String })
], ShortyHeader.prototype, "placeholder", 2);
ShortyHeader = __decorateClass([
  t3("shorty-header")
], ShortyHeader);
var ShortyFooter = class extends i4 {
  render() {
    return b2`
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
ShortyFooter.styles = i`
        .shorty-footer {
            display: flex;
            flex-direction: row;
            gap: 1em;
            background: var(--shorty-footer-background);
            height: 25px;
            margin-top: auto;
            padding: 0.5em 1em
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
            font-size: 0.75em;
            color: var(--shorty-secondary-text-color);
        }
    `;
ShortyFooter = __decorateClass([
  t3("shorty-footer")
], ShortyFooter);
var ShortyBody = class extends i4 {
  constructor() {
    super(...arguments);
    this.data = [];
    this.selectedIndex = 0;
  }
  updated(changedProperties) {
    console.log("updated", changedProperties);
  }
  render() {
    return b2`
            <div class="shorty-body">
                ${this.data.map(
      (shorty, index) => {
        return b2`
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
ShortyBody.styles = i`
        .shorty-body {
            display: flex;
            flex-direction: column;
            padding: 0.5em 0;

            height: var(--shorty-actions-height);

            border-top: 1px solid rgb(239, 241, 244);
            border-bottom: 1px solid rgb(239, 241, 244);
        }
    `;
__decorateClass([
  n4()
], ShortyBody.prototype, "data", 2);
__decorateClass([
  n4({ type: Number })
], ShortyBody.prototype, "selectedIndex", 2);
ShortyBody = __decorateClass([
  t3("shorty-body")
], ShortyBody);
var HeyShorty = class extends i4 {
  constructor() {
    super(...arguments);
    this.data = [];
    this.placeholder = "Search...";
    this.hotkeys = "cmd+k,ctrl+k";
    this.navigationUpHotkey = "up";
    this.navigationDownHotkey = "down";
    this.closeShortyHotkey = "esc";
    this.visible = false;
    this._selectedIndex = 0;
  }
  toggle() {
    this.visible = !this.visible;
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
      console.log("up", this._selectedIndex);
    });
    hotkeys(this.navigationDownHotkey, (keyboardEvent, hotkeysEvent) => {
      keyboardEvent.preventDefault();
      if (this._selectedIndex < this.data.length - 1) {
        this._selectedIndex++;
      } else {
        this._selectedIndex = 0;
      }
      console.log("down", this._selectedIndex);
    });
  }
  render() {
    return true ? b2`
            <div id="shorty">
                <shorty-header placeholder="${this.placeholder}"></shorty-header>
                <shorty-body .data="${this.data}" .selectedIndex="${this._selectedIndex}"></shorty-body>
                <shorty-footer></shorty-footer>
            </div>
        ` : void 0;
  }
};
HeyShorty.styles = i`
        :host {
            --shorty-width: 640px;
            --shorty-text-color: rgb(60, 65, 73);
            --shorty-font-size: 16px;
            --shorty-top: 20%;

            --shorty-key-border-radius: 0.25em;
            --shorty-key-background-color: rgb(239, 241, 244);
            --shorty-key-text-color: rgb(107, 111, 118);
            --shorty-key-font-size: 0.75em;

            --shorty-accent-color: rgb(110, 94, 210);
            --shorty-secondary-background-color: rgb(239, 241, 244);
            --shorty-secondary-text-color: rgb(107, 111, 118);

            --shorty-selected-background: rgb(248, 249, 251);

            --shorty-content-background: #fff;
            --shorty-content-shadow: rgb(0 0 0 / 50%) 0px 16px 70px;
            --shorty-content-border-radius: 0.5em;

            --shorty-actions-height: 300px;
            --shorty-group-text-color: rgb(144, 149, 157);

            --shorty-footer-background: rgba(242, 242, 242, 0.4);

            --shorty-placeholder-color: #8e8e8e;

            --shorty-z-index: 99999;
        }

        #shorty {
            position: fixed;
            left: 50%;
            transform: translateX(-50%);
            top: var(--shorty-top);

            display: flex;
            flex-direction: column;

            min-height: 400px;
            max-width: var(--shorty-width);
            min-width: 600px; //TODO: remove this
            background-color: var(--shorty-content-background);

            box-shadow: var(--shorty-content-shadow);
            border-radius: var(--shorty-content-border-radius);

            z-index: var(--shorty-z-index);
        }
    `;
__decorateClass([
  n4({
    type: Array,
    hasChanged() {
      return true;
    }
  })
], HeyShorty.prototype, "data", 2);
__decorateClass([
  n4()
], HeyShorty.prototype, "placeholder", 2);
__decorateClass([
  n4()
], HeyShorty.prototype, "hotkeys", 2);
__decorateClass([
  n4()
], HeyShorty.prototype, "navigationUpHotkey", 2);
__decorateClass([
  n4()
], HeyShorty.prototype, "navigationDownHotkey", 2);
__decorateClass([
  n4()
], HeyShorty.prototype, "closeShortyHotkey", 2);
__decorateClass([
  n4({ type: Boolean })
], HeyShorty.prototype, "visible", 2);
__decorateClass([
  r5()
], HeyShorty.prototype, "_selectedIndex", 2);
HeyShorty = __decorateClass([
  t3("hey-shorty")
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
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

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
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

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
*/
