(self.webpackChunkpython_webpack_boilerplate =
  self.webpackChunkpython_webpack_boilerplate || []).push([
  [524],
  {
    310: function (e, t, n) {
      "use strict";
      n(414), n(610), n(769);
      var o = n(336);
      document.body.addEventListener("htmx:afterSwap", function () {
        const e = document.querySelectorAll(".toast"),
          t = { animation: !0, autohide: !0, delay: 8e3 },
          n = [...e].map((e) => new o.y8(e, t));
        n.length > 0 &&
          n.forEach((e) => {
            setTimeout(() => {
              e.show();
            }, 500);
          });
      });
      var r = n(891),
        s = n(899);
      const u = (window.Stimulus = r.lg.start()),
        c = n(920);
      u.load((0, s.Ux)(c));
    },
    610: function () {
      const e = document.getElementById("terminalText"),
        t = document.getElementById("cursor");
      let n = 0;
      !(function o() {
        n < 18
          ? ((e.innerHTML =
              "Code Bask Solution".substring(0, n + 1) +
              '<span id="cursor">_</span>'),
            n++,
            setTimeout(o, 150))
          : e.appendChild(t);
      })();
    },
    131: function (e, t, n) {
      "use strict";
      n.r(t);
      var o = n(891),
        r = n(484),
        s = n.n(r);
      t.default = class extends o.xI {
        connect() {
          const e = new (s())(this.element);
          setTimeout(() => e.close(), 2500);
        }
      };
    },
    769: function (e, t, n) {
      window.htmx = n(926);
    },
    920: function (e, t, n) {
      var o = { "./message_controller.js": 131 };
      function r(e) {
        var t = s(e);
        return n(t);
      }
      function s(e) {
        if (!n.o(o, e)) {
          var t = new Error("Cannot find module '" + e + "'");
          throw ((t.code = "MODULE_NOT_FOUND"), t);
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
//# sourceMappingURL=app.0ef3e53a.js.map
