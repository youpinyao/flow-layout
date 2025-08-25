var x = Object.defineProperty;
var v = (a, e, o) => e in a ? x(a, e, { enumerable: !0, configurable: !0, writable: !0, value: o }) : a[e] = o;
var h = (a, e, o) => v(a, typeof e != "symbol" ? e + "" : e, o);
class T {
  constructor(e) {
    h(this, "options");
    h(this, "debounceTimeout", null);
    this.options = {
      gap: 10,
      ...e
    }, this.initialize();
  }
  getContainer() {
    const { container: e } = this.options;
    return typeof e == "string" ? document.querySelector(e) : e;
  }
  getItems() {
    const { items: e } = this.options;
    return [e].flat().map((o) => typeof o == "string" ? Array.from(
      document.querySelectorAll(o)
    ) : o).flat();
  }
  initialize() {
    const e = this.getContainer();
    e.style.position = "relative";
    const o = new ResizeObserver(() => {
      this.debounceUpdate();
    });
    new MutationObserver((s) => {
      this.debounceUpdate(), s.forEach((i) => {
        i.addedNodes.forEach((r) => {
          r instanceof HTMLElement && (o.unobserve(r), o.observe(r));
        }), i.removedNodes.forEach((r) => {
          r instanceof HTMLElement && o.unobserve(r);
        });
      });
    }).observe(e, {
      childList: !0,
      subtree: !0
    }), o.observe(e);
  }
  update() {
    const { gap: e = 10, appendToMinHeightColumn: o = !1 } = this.options, u = this.getContainer(), s = {
      x: 0
    }, i = {}, r = this.getItems(), d = (t) => (t == null ? void 0 : t.reduce((n, c) => n + c.offsetHeight + e, 0)) || 0, g = (t) => parseInt(getComputedStyle(t).paddingLeft.replace("px", "")) + parseInt(getComputedStyle(t).paddingRight.replace("px", ""));
    r.forEach((t) => {
      var c;
      const n = t.nextElementSibling;
      if (t instanceof HTMLElement && (t.style.position = "absolute", t.style.transform = `translate(${s.x}px, ${d(
        i[s.x]
      )}px)`, i[s.x] = [...i[s.x] || [], t], s.x += t.offsetWidth + e, s.x + ((n == null ? void 0 : n.offsetWidth) ?? 0) > u.clientWidth - g(u) && (s.x = 0), o && // 判断当前列是否有元素
      d(i[s.x]) !== 0)) {
        const p = Object.entries(i).map(([l, f]) => [
          parseFloat(l),
          f.reduce((b, m) => b + m.offsetHeight + e, 0)
        ]).sort((l, f) => l[1] - f[1]);
        s.x = ((c = p == null ? void 0 : p[0]) == null ? void 0 : c[0]) ?? 0;
      }
    }), u.style.height = `${Object.values(i).map(
      (t) => t.reduce((n, c) => n + c.offsetHeight + e, 0)
    ).reduce((t, n) => Math.max(t, n), 0) - e}px`;
  }
  debounceUpdate() {
    this.debounceTimeout && clearTimeout(this.debounceTimeout), this.debounceTimeout = setTimeout(() => {
      console.log(333), this.update();
    }, 50);
  }
  updateOptions(e) {
    this.options = { ...this.options, ...e }, this.debounceUpdate();
  }
}
export {
  T as FlowLayout,
  T as default
};
