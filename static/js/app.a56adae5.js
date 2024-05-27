(self.webpackChunkpython_webpack_boilerplate =
  self.webpackChunkpython_webpack_boilerplate || []).push([
  [524],
  {
    310: function (e, n, t) {
      "use strict";
      t(414), t(610), t(769);
      var o = t(336);
      document.body.addEventListener("htmx:afterSwap", function () {
        const e = document.querySelectorAll(".toast"),
          n = { animation: !0, autohide: !0, delay: 8e3 },
          t = [...e].map((e) => new o.y8(e, n));
        t.length > 0 && t.forEach((e) => e.show());
      });
      var r = t(891),
        s = t(899);
      const c = (window.Stimulus = r.lg.start()),
        u = t(920);
      c.load((0, s.Ux)(u));
    },
    610: function () {
      const e = document.getElementById("terminalText"),
        n = document.getElementById("cursor");
      let t = 0;
      !(function o() {
        t < 18
          ? ((e.innerHTML =
              "Code Bask Solution".substring(0, t + 1) +
              '<span id="cursor">_</span>'),
            t++,
            setTimeout(o, 150))
          : e.appendChild(n);
      })();
    },
    131: function (e, n, t) {
      "use strict";
      t.r(n);
      var o = t(891),
        r = t(484),
        s = t.n(r);
      n.default = class extends o.xI {
        connect() {
          const e = new (s())(this.element);
          setTimeout(() => e.close(), 2500);
        }
      };
    },
    769: function (e, n, t) {
      window.htmx = t(926);
    },
    920: function (e, n, t) {
      var o = { "./message_controller.js": 131 };
      function r(e) {
        var n = s(e);
        return t(n);
      }
      function s(e) {
        if (!t.o(o, e)) {
          var n = new Error("Cannot find module '" + e + "'");
          throw ((n.code = "MODULE_NOT_FOUND"), n);
        }
        return o[e];
      }
      (r.keys = function () {
        return Object.keys(o);
      }),
        (r.resolve = s),
        (e.exports = r),
        (r.id = 920);
    },
  },
  function (e) {
    e.O(0, [533], function () {
      return 310, e((e.s = 310));
    }),
      e.O();
  },
]);
//# sourceMappingURL=app.a56adae5.js.map
