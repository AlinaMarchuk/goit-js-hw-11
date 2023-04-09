import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getPicturesData } from './getPicturesData.js';
import { createCardMarkup } from './cardMarkup.js';
import { scrollAfterLoadMore } from './scroll.js';

const refs = {
  formEl: document.querySelector('.search-form'),
  containerEl: document.querySelector('.gallery'),
  loadMoreBtnEl: document.querySelector('.load-more'),
};

let keyWord = '';
let counterPage = 1;

refs.formEl.addEventListener('submit', onFormSubmit);
refs.loadMoreBtnEl.addEventListener('click', onLoadBtnClick);

function onFormSubmit(e) {
  e.preventDefault();
  counterPage = 1;
  refs.containerEl.innerHTML = '';
  keyWord = refs.formEl.elements.searchQuery.value;
  renderGallery();
}

function onLoadBtnClick() {
  counterPage += 1;
  renderGallery();
}

function renderGallery() {
  getPicturesData(keyWord, counterPage)
    .then(response => {
      if (response.data.hits.length === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        const filteredData = response.data.hits.map(pictureInfo => {
          return ({
            webformatURL,
            largeImageURL,
            tags,
            likes,
            views,
            comments,
            downloads,
          } = pictureInfo);
        });
        refs.containerEl.insertAdjacentHTML(
          'beforeend',
          createCardMarkup(filteredData)
        );
        const totalPages = Math.ceil(
          response.data.totalHits / response.data.hits.length
        );

        if (counterPage === totalPages) {
          refs.loadMoreBtnEl.style.display = 'none';
          Notify.warning(
            "We're sorry, but you've reached the end of search results."
          );
        } else {
          refs.loadMoreBtnEl.style.display = 'block';
        }

        new SimpleLightbox('.gallery a');
        console.log(response);

        if (counterPage === 1) {
          Notify.info(`Hooray! We found ${response.data.totalHits} images.`);
        } else {
          scrollAfterLoadMore();
        }
      }
    })
    .catch(error => {
      Notify.failure(error.message);
    });
}
