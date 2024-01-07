
/**
 * Renders an image using a template
 *
 * @param {number} imageIndex index to identify the image by
 * @param {string} imageUrl the url for the image
 * @param {string} imageAlt the alt attribute for the image
 * @param {string} imageCaption a caption to display under the image
 * @param {string} youtubeId optional youtube id
 * @return {string}
 */
const renderImage = (
  imageIndex, imageUrl, imageAlt,
  imageCaption, youtubeId = null) => {
  let y = '';
  let x = '';

  /**
   * If the image has a youtube id then we need to add some extra
   * markup to the image
   */
  if (youtubeId !== null) {
    y = `data-youtubeid="${youtubeId}"`;
    x = `<div class="gallery-play-icon">
      <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 512 512">
      <path d="M371.7 238l-176-107c-15.8-8.8-35.7 2.5-35.7 21v208c0 18.4 19.8 
      29.8 35.7 21l176-101c16.4-9.1 16.4-32.8 0-42zM504 256C504 119 393 8 256 
      8S8 119 8 256s111 248 248 248 248-111 248-248zm-448 0c0-110.5 89.5-200 
      200-200s200 89.5 200 200-89.5 200-200 200S56 366.5 56 256z"/></svg>
      </div>`;
  }

  return `
    <li class="gallery-item" data-imagekey="${imageIndex}" ${y}>
      <figure>
        <div class="gallery-image-wrapper">
        <img src="${imageUrl}" alt="${imageAlt}">
        ${x}
        </div>
        <figcaption>${imageCaption}</figcaption>
      </figure>
    </li>`;
};

/**
 * Takes and array of images and renders out a HTML string
 *
 * @param {Array} images An array of image elements to process
 * @param {string} galleryId
 * @return {string}
 */
const renderGallery = (images, galleryId) => {
  const renderedImages = [];

  images.forEach((image, index) => {
    renderedImages.push(processImage(image, index));
  });

  return `    <ul data-gallery-id="${galleryId}" class="gallery-list">
      ${renderedImages.join('')}
    </ul>`;
};

/**
 * Render the overlay and inject the galleries into it
 *
 * @param {string} galleriesRendered
 * @param {boolean} showYoutube
 * @return {string}
 */
const renderOverlay = (galleriesRendered, showYoutube = false) => {

  /* eslint-disable */
  return `
  <div id="simple-gallery-container" 
    class="simple-gallery-container">
    ${galleriesRendered}
    <a href="#" class="gallery-button gallery-button-previous">
      <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 320 512">
        <path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 
        22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 
        9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 
        272.97c-9.37-9.37-9.37-24.57 0-33.94z"/>
      </svg>
    </a>
    <a href="#" class="gallery-button gallery-button-next">
      <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 320 512">
        <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 
        0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 
        101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 
        24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/>
      </svg>
    </a>
    <a href="#" class="gallery-button-close">
      <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 352 512">
        <path d="M242.72 256l100.07-100.07c12.28-12.28 
        12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 
        0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 
        111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 
        12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 
        0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 
        44.48 0l22.24-22.24c12.28-12.28 
        12.28-32.19 0-44.48L242.72 256z"/>
      </svg>
    </a>
    <div class="player-wrapper">
      <div class="ytplayer-embed-responsive">
        <div id="ytplayer" class="ytplayer-iframe"></div>
      </div>
    </div>
  </div>`;
  /* eslint-enable */
};

/**
 * Gallery Object Literal Template
 *
 * @todo remove not used
 */
const gallery = {
  galleryId: '',
  images: [],
  currentImage: 0,
  modalImages: [],
  totalImages: 0,
};

/**
 * Initialise galleries and inject them into the page
 */
const initGalleries = (selector) => {
  const galleries = document.querySelectorAll(selector);
  const galleriesRendered = [];

  /**
   * Loop through the galleries and pass back a list
   */
  galleries.forEach((item) => {
    const id = item.id;
    const g = Object.create(gallery);
    g.images = item.querySelectorAll('img');
    const rendered = renderGallery(g.images, id);
    galleriesRendered.push(rendered);
  });

  const galleryOverlayTemplate = renderOverlay(galleriesRendered.join(''));

  document.body.insertAdjacentHTML(
    'beforeend', galleryOverlayTemplate,
  );
};

/**
 * Process an image element and return a rendered image.
 * @param {HTMLElement} image - The image element to process.
 * @param {number} index - The index of the image element.
 * @returns {string} - Returns an HTML string.
 */
function processImage(image, index) {

  let imgSrc;
  let caption;

  image.setAttribute('data-imagekey', index);
  let youtubeId = image.getAttribute('data-youtubeid');

  if (image.getAttribute('data-src-lg')) {
    imgSrc = image.getAttribute('data-src-lg');
  } else {
    imgSrc = image.src;
  }

  if (image.getAttribute('data-description')) {
    caption = image.getAttribute('data-description');
  } else {
    caption = image.alt;
  }

  return renderImage(index, imgSrc, image.alt, caption, youtubeId);
}

/**
 * Setup event listeners
 */
function setup(selector) {
  const overlay = document.getElementById('simple-gallery-container');

  const images = document.querySelectorAll(`${selector} img`);
  let currentImage = 0;

  let currentGallery = null;
  const modalImages = overlay.querySelectorAll('.gallery-list img');
  let totalImages = 0;

  let touchstartX = 0;
  let touchendX = 0;

  images.forEach(function (image) {
    image.addEventListener('click', (e) => {
      resetImages();

      const el = image.closest(selector);

      currentGallery = el.id;
      const g = document.querySelectorAll('[data-gallery-id="' +
        currentGallery + '"] img');

      totalImages = g.length;

      const imageKey = image.getAttribute('data-imagekey');
      currentImage = imageKey;
      switchImage(imageKey);
    });
  });

  modalImages.forEach((image) => {
    image.addEventListener('mousedown', (event) => {
      event.preventDefault();
      touchstartX = event['screenX'];
    });

    image.addEventListener('mouseup', (event) => {
      touchendX = event['screenX'];

      if (touchendX > touchstartX + 50) {
        imagePrevious();
      } else if (touchendX < touchstartX - 50) {
        imageNext();
      }
    });

    image.addEventListener('touchstart', (event) => {
      touchstartX = event.changedTouches[0]['screenX'];
    });

    image.addEventListener('touchend', (event) => {
      touchendX = event.changedTouches[0]['screenX'];

      if (touchendX > touchstartX + 50) {
        imagePrevious();
      } else if (touchendX < touchstartX - 50) {
        imageNext();
      }
    });
  });

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
      closeModal();
    }
  });

  document.querySelector('.gallery-button-close')
    .addEventListener('click', (event) => {
      event.preventDefault();
      closeModal();
    });

  document.addEventListener('keydown', (event) => {
    if (overlay.classList.contains('gallery-active')) {
      switch (event.key) {
        case 'Escape':
        case 'Esc':
          closeModal();
          break;
        case 'ArrowRight':
        case 'Right':
          imageNext();
          break;
        case 'ArrowLeft':
        case 'Left':
          imagePrevious();
          break;
        default:
          break;
      }
    }
  });

  /**
   * Close the gallery modal
   */
  function closeModal() {

    console.log('closeModal');

    resetImages();
    overlay.classList.remove('gallery-active');

    let currentGallerySelector = `[data-gallery-id='${currentGallery}']`;
    overlay.querySelectorAll(currentGallerySelector)[0].classList.remove('gallery-list--active');

    currentGallery = null;
  }

  /**
   * Move to next image
   */
  function imageNext() {
    const i = parseInt(currentImage, 10) + 1;
    currentImage = checkIndex(i);
    switchImage(currentImage);
  }

  /**
   * Move to previous image
   */
  function imagePrevious() {
    const i = parseInt(currentImage, 10) - 1;
    currentImage = checkIndex(i);
    switchImage(currentImage, 'right');
  }

  /**
   * Resets the classes for all images in the gallery modal, used for
   * navigation purposes to ensure consistency of operation.
   *
   */
  function resetImages() {
    const images = overlay.querySelectorAll('.gallery-list li');
    images.forEach(function (i) {
      i.classList.remove('image-active');
      i.classList.remove('slide-in-from-right');
      i.classList.remove('slide-in-from-left');
    });

    if (typeof player !== 'undefined') {
      const playerElement = document.querySelector(
        '#simple-gallery-container #ytplayer');

      playerElement.parentNode.classList.remove('ytplayer-active');
      playerElement.parentNode.parentNode.classList.remove('ytactive');
      if (player.getIframe() !== null) {
        player.destroy();
      }
    }
  }

  /**
   * Event listener for gallery previous button
   */
  overlay.querySelector('.gallery-button-previous')
    .addEventListener('click', (event) => {
      event.preventDefault();
      imagePrevious();
    });

  /**
   * Event listener for gallery next button
   */
  overlay.querySelector('.gallery-button-next')
    .addEventListener('click', (event) => {
      event.preventDefault();
      imageNext();
    });

  /**
   * Switches the currently active image based on the
   * @param {number} i index number
   * @param {string} d direction
   */
  function switchImage(i, d) {
    d = (typeof d !== 'undefined') ? d : 'left';

    resetImages();

    const x = overlay.querySelector('.gallery-list[data-gallery-id="' +
      currentGallery + '"] [data-imagekey="' + i + '"]',
    );

    x.classList.add('image-active');

    if (d === 'right') {
      x.classList.add('slide-in-from-right');
    } else {
      x.classList.add('slide-in-from-left');
    }

    overlay.classList.add('gallery-active');

    let currentGallerySelector = `[data-gallery-id='${currentGallery}']`;
    overlay.querySelectorAll(currentGallerySelector)[0]
      .classList.add('gallery-list--active');
  }


  /**
   * Check if the index would be out of range and return either the first or
   * last index of the image set depending at which end the use is navigating
   * from.
   *
   * @return {number}
   * @param {number} i
   */
  function checkIndex(i) {
    if (i < 0) {
      return totalImages - 1;
    } else if (i > totalImages - 1) {
      return 0;
    } else {
      return i;
    }
  }
};

/**
 * Youtube player setup
 */
function youtubeSetup() {
  const tag = document.createElement('script');
  tag.id = 'iframe-api';
  tag.src = 'https://www.youtube.com/iframe_api';
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

window.onYouTubeIframeAPIReady = () => {
  addClickListeners();
};

/**
 * @param {event} event
 */
window.onPlayerReady = (event) => {
  event.target.playVideo();
};

/**
 * Add event listeners for images which has youtube id
 */
function addClickListeners() {
  const els = document.querySelectorAll(
    '#simple-gallery-container [data-youtubeid]');
  els.forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();

      const t = e.currentTarget;
      const ytId = t.getAttribute('data-youtubeid');

      if (ytId !== '') {
        window['player'] = new YT.Player('ytplayer', {
          height: '390',
          width: '640',
          videoId: ytId,
          events: {
            'onReady': onPlayerReady,
          },
          playerVars: {
            'rel': 0,
          },
        });

        const playerElement = document.querySelector(
          '#simple-gallery-container #ytplayer');

        playerElement.parentNode.classList.add('ytplayer-active');
        playerElement.parentNode.parentNode.classList.add('ytactive');

        e.currentTarget.classList.remove('image-active');
        e.currentTarget.classList.remove('slide-in-from-left');
        e.currentTarget.classList.remove('slide-in-from-right');
      }
    });
  });
}

const objectFitPolyfill = function () {
  if ('objectFit' in document.documentElement.style === false) {
    const images = document.querySelectorAll('.gallery img');
    images.forEach(function (image) {
      const imgSrc = image.src;
      const parent = image.parentNode;

      image.style.opacity = 0;
      parent.style.backgroundImage = `url("${imgSrc}")`;
      parent.style.backgroundPosition = 'center center';
      parent.style.backgroundSize = 'cover';
    });
  }
}

/**
 * Runs the functions to setup the gallery
 */
const initSimpleGallery = (selector = '.gallery') => {
  const test = document.querySelectorAll(selector);
  if (test.length > 0) {
    initGalleries(selector);
    setup(selector);
    youtubeSetup();
    objectFitPolyfill();
  };
};

export default initSimpleGallery;
