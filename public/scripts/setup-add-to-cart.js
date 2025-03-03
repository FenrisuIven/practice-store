document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#btn-add-to-cart').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = Number(btn.getAttribute('data-product-id'));
      const resp = await fetch('/add-to-cart', {
        method: "POST",
        body: JSON.stringify({ productId: id }),
        headers: {
          "Content-Type": "application/json",
        }
      });
      const responsObject = await resp.json();
      console.log(responsObject.data);
    })
  })
});