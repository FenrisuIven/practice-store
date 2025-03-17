document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("#btn-get-details").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = Number(btn.getAttribute("data-product-id"));
      const resp = await fetch("/product", {
        method: "POST",
        body: JSON.stringify({
          productId: id,
        }),
        headers: {
          "X-CSRF-Token": document.head.querySelector("[name~=_csrf][content]")
            .content,
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
      });
      const responsObject = await resp.json();
      console.log(responsObject);
    });
  });
});
