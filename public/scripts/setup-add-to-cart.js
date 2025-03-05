document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("#btn-add-to-cart").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = Number(btn.getAttribute("data-product-id"));
      const resp = await fetch("/add-to-cart", {
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
      console.log(responsObject.data);
    });
  });
});
