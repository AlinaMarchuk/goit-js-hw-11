import { getPicturesData } from './getPicturesData.js';
import { cardMarkup } from './cardMarkup.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  formEl: document.querySelector('.search-form'),
  containerEl: document.querySelector('.gallery'),
  loadMoreBtnEl: document.querySelector('.load-more'),
};

let keyWord = '';
let counterPage = 1;

refs.formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  counterPage = 1;
  refs.containerEl.innerHTML = '';
  keyWord = refs.formEl.elements.searchQuery.value;
  renderGallery();
  console.log(keyWord);
}

function renderGallery() {
  getPicturesData(keyWord, counterPage)
    .then(response => {
      if (response.data.hits.length === 0) {
        Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        const filteredData = response.data.hits.map(
          ({
            webformatURL,
            largeImageURL,
            tags,
            likes,
            views,
            comments,
            downloads,
          }) => {
            return {
              webformatURL,
              largeImageURL,
              tags,
              likes,
              views,
              comments,
              downloads,
            };
          }
        );
        console.log('filter', filteredData);
        refs.containerEl.insertAdjacentHTML(
          'beforeend',
          cardMarkup(filteredData)
        );
        const totalPages = Math.ceil(
          response.data.totalHits / response.data.hits.length
        );
        console.log(totalPages);

        if (counterPage === totalPages) {
          refs.loadMoreBtnEl.style.display = 'none';
        } else {
          refs.loadMoreBtnEl.style.display = 'block';
        }

        console.log(response);
      }
    })
    .catch(error => {
      console.log(error);
    });
}
