export function createCardMarkup(arr) {
  return (markup = arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<a href="${largeImageURL}" class="card-link"><div class="photo-card"><div class="image-wrapper"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></div>
        <div class="info">
          <p class="info-item">
            <b>Likes </b>
            <span class="info-text">${likes}</span>
          </p>
          <p class="info-item">
            <b>Views </b>
            <span class="info-text">${views}</span>
          </p>
          <p class="info-item">
            <b>Comments </b>
            <span class="info-text">${comments}</span>
          </p>
          <p class="info-item">
            <b>Downloads </b>
            <span class="info-text">${downloads}</span>
          </p>
        </div>
      </div></a>`
    )
    .join(''));
}
