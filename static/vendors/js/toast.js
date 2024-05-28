import * as bootstrap from "bootstrap";
document.body.addEventListener("htmx:afterSwap", function () {
  const t = document.querySelectorAll(".toast"),
    o = { animation: !0, autohide: !0, delay: 8e3 },
    e = [...t].map((t) => new bootstrap.Toast(t, o));
  e.length > 0 &&
    e.forEach((t) => {
      setTimeout(() => {
        t.show();
      }, 500);
    });
});
