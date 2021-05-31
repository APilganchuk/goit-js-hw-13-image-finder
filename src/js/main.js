var debounce = require('lodash.debounce');
import { refs } from './get-refs.js';
import NewsApiService from './apiService';
import imageTpl from '../templates/images.hbs';

const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('input', debounce(onSearchInput, 1000));
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtn);

function onSearchInput(e) {
    newsApiService.query = e.target.value.trim();

    if (newsApiService.query === '') {
        
        console.log(alert('you have not entered anything'));
        return;
    }
    newsApiService.resetPage();
    clearPictureContainer();
    newsApiService.fetchPicture().then(data => addMarcup(data));
    setTimeout(onBtnActive,1000)
}

function onLoadMoreBtn() {
    newsApiService.fetchPicture().then(data => {
        addMarcup(data);
        onScrollImages();
        
    });
}
function addMarcup(data) {
    refs.galleryImg.insertAdjacentHTML('beforeend', imageTpl(data));
}
function clearPictureContainer() {
    refs.galleryImg.innerHTML = '';
}

function onScrollImages() {
    const body = document.querySelector('body');
    console.log(body);
    body.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
    });
}

function onBtnActive() {
    refs.loadMoreBtn.classList.add('is-active');
}
