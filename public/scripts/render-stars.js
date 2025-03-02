document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.product-card__rating').forEach(ratingDiv => {
    const rating = Number(ratingDiv.dataset.ratingValue);

    const stars = [...ratingDiv.children].map(star => {
      const stops = star.querySelectorAll('stop');
      const path = star.querySelector('path');
      const gradient = star.querySelector('linearGradient');
      return { 
        stops: [...stops],
        path,
        gradient
      };
    });
      
    stars.forEach((star, idx) => {
      const totalFilled = (rating / 5) * 5;
      const rawFillAmount = Math.min(Math.max(totalFilled - idx, 0), 1);
      const fillAmount = (rawFillAmount * 100).toFixed(0).toString() + '%';
      
      const uuid = self.crypto.randomUUID().slice(0,6);

      star.stops[0].setAttribute('offset', fillAmount)
      star.stops[1].setAttribute('offset', fillAmount)

      star.gradient.setAttribute('id', `grad-${uuid}`);;
      star.path.setAttribute('fill', `url(#grad-${uuid})`);
    });
  })
})