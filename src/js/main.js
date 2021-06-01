var debounce = require('lodash.debounce');
import { refs } from './get-refs.js';
import NewsApiService from './apiService';
import imageTpl from '../templates/images.hbs';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('input', debounce(onSearchInput, 1000));
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtn);

function onSearchInput(e) {
    newsApiService.query = e.target.value.trim();

    if (newsApiService.query === '') {
        error({
            text: 'you have not entered text!',
            delay: 1000,
        });
        return;
    }
    newsApiService.resetPage();
    clearPictureContainer();
    newsApiService.fetchPicture().then(data => {
        addMarcup(data);
        if (data.length === 0 || data.length < 12) {
            return;
        }

        setTimeout(onBtnActive, 1000);
    });
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

    body.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
    });
}

function onBtnActive() {
    refs.loadMoreBtn.classList.add('is-active');
}
