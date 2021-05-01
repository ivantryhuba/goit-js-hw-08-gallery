'use strict';
// Импортируем галерею
import galleryList from './gallery-items.js';
console.log(galleryList);

// Находим нужные элементы в документе
const bodyEl = document.querySelector('body');
const galleryContainer = document.querySelector('.js-gallery');
const lightbox = document.querySelector('.js-lightbox');
const lightboxImg = document.querySelector('.lightbox__image');
const lightboxOverlay = document.querySelector('.lightbox__overlay');
const closeBtn = document.querySelector('[data-action="close-lightbox"]');

// Рендерим разметку
const galleryMarkup = createGalleryCardsMarkup(galleryList);
galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

// Вешаем слушатель на картинку для открытия модалки
galleryContainer.addEventListener('click', openModal);

// *Создаём разметку через шаблонную строку
function createGalleryCardsMarkup(galleryList) {
  return galleryList
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

// *Открываем модалку
function openModal(evt) {
  evt.preventDefault();

  const isGalleryImgEl = evt.target.classList.contains('gallery__image');
  if (!isGalleryImgEl) {
    return;
  }
  bodyEl.classList.add('scroll-hidden'); // Убираем скролл по открытию модалки
  lightbox.classList.add('is-open');

  lightboxImg.src = evt.target.getAttribute('data-source');
  lightboxImg.alt = evt.target.alt;

  window.addEventListener('keydown', onArrowLeft);
  window.addEventListener('keydown', onArrowRigth);
  window.addEventListener('keydown', onPressEsc);
  lightboxOverlay.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);

  console.log(evt.target.dataset.source);
}

// *Закрываем модалку
function closeModal(evt) {
  bodyEl.classList.remove('scroll-hidden'); // Восстанавливаем скролл по закрытию модалки

  lightbox.classList.remove('is-open');
  lightboxImg.src = '';
  lightboxImg.alt = '';

  lightboxOverlay.removeEventListener('click', closeModal);
  closeBtn.removeEventListener('click', closeModal);
  window.removeEventListener('keydown', onArrowLeft);
  window.removeEventListener('keydown', onArrowRigth);
  window.removeEventListener('keydown', onPressEsc);
}

// !Перелистывание по нажатию стрелок (Left-Right)
function toThePrevious() {}

function toTheNext() {}

// !Нажатие клавиш Left-Right (Для перелистывания)
function onArrowLeft(evt) {
  if (evt.code === 'ArrowLeft') {
    toThePrevious();
  }
}

function onArrowRigth(evt) {
  if (evt.code === 'ArrowRight') {
    toTheNext();
  }
}

// !Нажатие ESC (Закрытие модалки по нажатию ESC )
function onPressEsc(evt) {
  if (evt.code === 'Escape') {
    closeModal();
  }
}
