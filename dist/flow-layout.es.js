var x = Object.defineProperty;
var v = (a, t, o) => t in a ? x(a, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : a[t] = o;
var h = (a, t, o) => v(a, typeof t != "symbol" ? t + "" : t, o);
class T {
  constructor(t) {
    h(this, "options");
    h(this, "debounceTimeout", null);
    this.options = {
      gap: 10,
      ...t
    }, this.initialize();
  }
  getContainer() {
    const { container: t } = this.options;
    return typeof t == "string" ? document.querySelector(t) : t;
  }
  getItems() {
    const { items: t } = this.options;
    return [t].flat().map((o) => typeof o == "string" ? Array.from(
      document.querySelectorAll(o)
    ) : o).flat();
  }
  initialize() {
    const t = this.getContainer();
    t.style.position = "relative";
    const o = new ResizeObserver(() => {
      this.debounceUpdate();
    });
    new MutationObserver((i) => {
      this.debounceUpdate(), i.forEach((s) => {
        s.addedNodes.forEach((r) => {
          r instanceof HTMLElement && (o.unobserve(r), o.observe(r));
        }), s.removedNodes.forEach((r) => {
          r instanceof HTMLElement && o.unobserve(r);
        });
      });
    }).observe(t, {
      childList: !0,
      subtree: !0
    }), o.observe(t);
  }
  update() {
    const { gap: t = 10, appendToMinHeightColumn: o = !1 } = this.options, u = this.getContainer(), i = {
      x: 0
    }, s = {}, r = this.getItems(), d = (e) => (e == null ? void 0 : e.reduce((n, c) => n + c.offsetHeight + t, 0)) || 0, b = (e) => parseInt(getComputedStyle(e).paddingLeft.replace("px", "")) + parseInt(getComputedStyle(e).paddingRight.replace("px", ""));
    r.forEach((e) => {
      var c;
      const n = e.nextElementSibling;
      if (e instanceof HTMLElement && (e.style.position = "absolute", e.style.transform = `translate(${i.x}px, ${d(
        s[i.x]
      )}px)`, s[i.x] = [...s[i.x] || [], e], i.x += e.offsetWidth + t, i.x + ((n == null ? void 0 : n.offsetWidth) ?? 0) > u.clientWidth - b(e) && (i.x = 0), o && // 判断当前列是否有元素
      d(s[i.x]) !== 0)) {
        const p = Object.entries(s).map(([l, f]) => [
          parseFloat(l),
          f.reduce((g, m) => g + m.offsetHeight + t, 0)
        ]).sort((l, f) => l[1] - f[1]);
        i.x = ((c = p == null ? void 0 : p[0]) == null ? void 0 : c[0]) ?? 0;
      }
    }), u.style.height = `${Object.values(s).map(
      (e) => e.reduce((n, c) => n + c.offsetHeight + t, 0)
    ).reduce((e, n) => Math.max(e, n), 0) - t}px`;
  }
  debounceUpdate() {
    this.debounceTimeout && clearTimeout(this.debounceTimeout), this.debounceTimeout = setTimeout(() => {
      this.update();
    }, 100);
  }
  updateOptions(t) {
    this.options = { ...this.options, ...t }, this.debounceUpdate();
  }
}
export {
  T as FlowLayout,
  T as default
};
