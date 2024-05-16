(self.webpackChunkpython_webpack_boilerplate =
  self.webpackChunkpython_webpack_boilerplate || []).push([
  [524],
  {
    235: function (n, e, t) {
      "use strict";
      t(414), t(610), t(769);
      var o = t(891),
        r = t(899);
      const s = (window.Stimulus = o.lg.start()),
        u = t(920);
      s.load((0, r.Ux)(u));
    },
    610: function () {
      const n = document.getElementById("terminalText"),
        e = document.getElementById("cursor");
      let t = 0;
      !(function o() {
        t < 18
          ? ((n.innerHTML =
              "Code Bask Solution".substring(0, t + 1) +
              '<span id="cursor">_</span>'),
            t++,
            setTimeout(o, 150))
          : n.appendChild(e);
      })();
    },
    131: function (n, e, t) {
      "use strict";
      t.r(e);
      var o = t(891),
        r = t(484),
        s = t.n(r);
      e.default = class extends o.xI {
        connect() {
          const n = new (s())(this.element);
          setTimeout(() => n.close(), 2500);
        }
      };
    },
    769: function (n, e, t) {
      window.htmx = t(926);
    },
    920: function (n, e, t) {
      var o = { "./message_controller.js": 131 };
      function r(n) {
        var e = s(n);
        return t(e);
      }
      function s(n) {
        if (!t.o(o, n)) {
          var e = new Error("Cannot find module '" + n + "'");
          throw ((e.code = "MODULE_NOT_FOUND"), e);
        }
        return o[n];
      }
      (r.keys = function () {
        return Object.keys(o);
      }),
        (r.resolve = s),
        (n.exports = r),
        (r.id = 920);
    },
  },
  function (n) {
    n.O(0, [740], function () {
      return 235, n((n.s = 235));
    }),
      n.O();
  },
]);
//# sourceMappingURL=app.8a42a47d.js.map
