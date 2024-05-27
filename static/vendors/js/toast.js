import * as bootstrap from "bootstrap";
document.body.addEventListener("htmx:afterSwap", function () {
  const t = document.querySelectorAll(".toast"),
    o = { animation: !0, autohide: !0, delay: 8e3 },
    a = [...t].map((t) => new bootstrap.Toast(t, o));
  a.length > 0 && a.forEach((t) => t.show());
});
