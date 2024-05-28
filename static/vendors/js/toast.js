import * as bootstrap from "bootstrap";

document.body.addEventListener("htmx:afterSwap", function () {
  const toastElList = document.querySelectorAll(".toast");
  const options = { animation: true, autohide: true, delay: 8000 };
  const toastList = [...toastElList].map(
    (toastEl) => new bootstrap.Toast(toastEl, options),
  );

  if (toastList.length > 0) {
    toastList.forEach((toast) => {
      setTimeout(() => {
        toast.show();
      }, 500); // Delay 500ms to show toast
    });
  }
});
