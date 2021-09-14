const basicLightbox = require('basiclightbox');
export const overlay = basicLightbox.create(
    `
    <div class="modal">
        <img class="lightbox__image" src="" alt="" />
    </div>
    <button class="btn-modal js-btn">✖</button>
`,
);
