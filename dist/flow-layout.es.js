var e = Object.defineProperty;
var l = (o, t, s) => t in o ? e(o, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : o[t] = s;
var i = (o, t, s) => l(o, typeof t != "symbol" ? t + "" : t, s);
class c {
  constructor(t) {
    i(this, "options");
    this.options = {
      gap: 10,
      columns: 3,
      ...t
    };
  }
  layout() {
    const { container: t, items: s, gap: p = 10, columns: n = 3 } = this.options;
    t.style.display = "grid", t.style.gridTemplateColumns = `repeat(${n}, 1fr)`, t.style.gap = `${p}px`, t.innerHTML = "", s.forEach((a) => {
      t.appendChild(a);
    });
  }
  updateOptions(t) {
    this.options = { ...this.options, ...t };
  }
}
export {
  c as FlowLayout,
  c as default
};
