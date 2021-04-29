'use strict';
import galleryItems from './gallery-items.js';
console.log(galleryItems);

const galleryContainer = document.querySelector('.js-gallery');
const galleryMarkup = createGalleryCardsMarkup(galleryItems);
galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

function createGalleryCardsMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
        <a
          class="gallery__link"
          href="${original}"
        >
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>
          `;
    })
    .join('');
}
console.log(createGalleryCardsMarkup(galleryItems));
