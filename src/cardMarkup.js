export function cardMarkup(arr) {
  const markup = arr
    .map(el => {
      return `<a href="${el.largeImageURL}" class="card-link"><div class="photo-card"><div class="image-wrapper"><img src="${el.webformatURL}" alt="" loading="lazy" /></div>
        <div class="info">
          <p class="info-item">
            <b>Likes </b>
            <span class="info-text">${el.likes}</span>
          </p>
          <p class="info-item">
            <b>Views </b>
            <span class="info-text">${el.views}</span>
          </p>
          <p class="info-item">
            <b>Comments </b>
            <span class="info-text">${el.comments}</span>
          </p>
          <p class="info-item">
            <b>Downloads </b>
            <span class="info-text">${el.downloads}</span>
          </p>
        </div>
      </div></a>`;
    })
    .join('');
  return markup;
}
