var debounce = require('lodash.debounce');
import { refs } from './get-refs.js';
import NewsApiService from './apiService';
import imageTpl from '../templates/images.hbs';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { overlay } from './lightBox';
const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('input', debounce(onSearchInput, 1000));
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtn);
refs.galleryImg.addEventListener('click', onShowLargeImg);
document.body.addEventListener(
    'keydown',
    e => e.key === 'Enter' && e.preventDefault(),
);

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
    newsApiService.query &&
        newsApiService
            .fetchPicture()
            .then(data => {
                if (data.length === 0) {
                    error({
                        text: 'search has not given any results',
                        delay: 1000,
                    });

                    onBtnDisabled();
                    return;
                }
                addMarcup(data);
                onBtnActive();
            })
            .catch(error => console.log(error));
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
function onBtnDisabled() {
    refs.loadMoreBtn.classList.remove('is-active');
}

function onShowLargeImg(e) {
    const target = e.target;
    if (target.classList.contains('gallary__img')) {
        overlay.show();
        const lightbox_img = document.querySelector('.lightbox__image');
        const modalCloseBtn = document.querySelector('.js-btn');

        modalCloseBtn.addEventListener('click', () => {
            overlay.close();
        });

        const largeImg = target.dataset.source;

        lightbox_img.src = largeImg;
    }
    return;
}
