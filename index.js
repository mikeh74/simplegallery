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
    x = `<div class="simple-gallery-play-icon">
          <svg width="110" height="110" viewBox="0 0 110 110" xmlns="http://www.w3.org/2000/svg">
              <path class="simple-gallery-play-icon-circle" d="M 105 55 C 105 27.385765 82.614235 5 55 5 C 27.385763 5 5 27.385765 5 55 C 5 82.614235 27.385763 105 55 105 C 82.614235 105 105 82.614235 105 55 Z"/>
              <path class="simple-gallery-play-icon-triangle" d="M 81.5 55.122868 L 41.5 32.028854 L 41.5 78.216881 Z"/>
          </svg>
        </div>`;
  }

  return `
    <li class="simple-gallery-item" data-imagekey="${imageIndex}" ${y}>
      <figure>
        <div class="simple-gallery-image-wrapper">
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
const renderOverlay = (galleriesRendered) => {
  return `
  <div id="simple-gallery" 
    class="simple-gallery">
    ${galleriesRendered}
    <a href="#" class="simple-gallery-button simple-gallery-button-previous">
      <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path id="Path" class="simple-gallery-icon-stroke" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" d="M 66 8 L 24 50 L 66 92 L 66 92"/>
      </svg>
    </a>
    <a href="#" class="simple-gallery-button simple-gallery-button-next">
      <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path id="Path" class="simple-gallery-icon-stroke" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" d="M 34 8 L 76 50 L 34 92 L 34 92"/>
      </svg>
    </a>
    <a href="#" class="simple-gallery-button-close">
      <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path id="Path" class="simple-gallery-icon-stroke" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" d="M 20 20 L 50 50 L 20 80 L 20 80 M 80 20 L 50 50 L 80 80 L 80 80"/>
      </svg>
    </a>
    <div class="player-wrapper">
      <div class="ytplayer-embed-responsive">
        <div id="ytplayer" class="ytplayer-iframe"></div>
      </div>
    </div>
  </div>`;
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
  image.setAttribute('data-imagekey', index);
  let youtubeId = image.getAttribute('data-sg-youtubeid');

  const imgSrc = getImageSource(image);
  const caption = getImageCaption(image);

  return renderImage(index, imgSrc, image.alt, caption, youtubeId);
}

/**
 * Retrieves the caption for a given image element.
 *
 * This function checks if the image element has a 'data-sg-desc' attribute.
 * If it does, it returns the value of that attribute. Otherwise, it returns
 * the value of the image's 'alt' attribute.
 *
 * @param {HTMLImageElement} image - The image element from which to retrieve the caption.
 * @param {string} caption - A fallback caption if no 'data-sg-desc' attribute is found.
 * @returns {string} The caption for the image.
 */
function getImageCaption(image) {
  if (image.getAttribute('data-sg-desc')) {
    return image.getAttribute('data-sg-desc');
  }
  return image.alt;
}

/**
 * Retrieves the source for a given image element.
 *
 * This function checks if the image element has a 'data-sg-src' attribute.
 * If it does, it returns the value of that attribute. Otherwise, it returns
 * the value of the image's 'src' attribute.
 *
 * @param {HTMLImageElement} image - The image element from which to retrieve the source.
 * @returns {string} The source for the image.
 *
 */
function getImageSource(image) {
  if (image.getAttribute('data-sg-src')) {
    return image.getAttribute('data-sg-src');
  }
  return image.src;
}

/**
 * Setup event listeners
 */
function setup(selector) {
  const overlay = document.getElementById('simple-gallery');

  const images = document.querySelectorAll(`${selector} img`);
  let currentImage = 0;

  let currentGallery = null;
  const modalImages = overlay.querySelectorAll('.gallery-list img');
  let totalImages = 0;

  let touchstartX = 0;
  let touchendX = 0;

  images.forEach(function (image) {
    image.addEventListener('click', (e) => {
      e.preventDefault();
      resetImages();

      const el = image.closest(selector);

      currentGallery = el.id;
      const g = document.querySelectorAll('[data-gallery-id="'
        + currentGallery + '"] img');

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
      }
      else if (touchendX < touchstartX - 50) {
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
      }
      else if (touchendX < touchstartX - 50) {
        imageNext();
      }
    });
  });

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
      closeModal();
    }
  });

  document.querySelector('.simple-gallery-button-close')
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
    resetImages();
    overlay.classList.remove('gallery-active');
    document.body.style.overflow = 'auto';

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
    let player = window['player'];
    const images = overlay.querySelectorAll('.gallery-list li');
    images.forEach(function (i) {
      i.classList.remove('image-active');
      i.classList.remove('slide-in-from-right');
      i.classList.remove('slide-in-from-left');
    });

    if (typeof player !== 'undefined') {
      const playerElement = document.querySelector(
        '#simple-gallery #ytplayer');

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
  overlay.querySelector('.simple-gallery-button-previous')
    .addEventListener('click', (event) => {
      event.preventDefault();
      imagePrevious();
    });

  /**
   * Event listener for gallery next button
   */
  overlay.querySelector('.simple-gallery-button-next')
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

    const x = overlay.querySelector(
      `.gallery-list[data-gallery-id="${currentGallery}"] [data-imagekey="${i}"]`,
    );

    x.classList.add('image-active');

    if (d === 'right') {
      x.classList.add('slide-in-from-right');
    }
    else {
      x.classList.add('slide-in-from-left');
    }

    overlay.classList.add('gallery-active');
    document.body.style.overflow = 'hidden';

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
    }
    else if (i > totalImages - 1) {
      return 0;
    }
    else {
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
  const YT = window['YT'];
  const onPlayerReady = window['onPlayerReady'];
  const els = document.querySelectorAll(
    '#simple-gallery [data-youtubeid]');
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
            onReady: onPlayerReady,
          },
          playerVars: {
            rel: 0,
            autoplay: 1,
          },
        });

        const playerElement = document.querySelector(
          '#simple-gallery #ytplayer');

        playerElement.parentNode.classList.add('ytplayer-active');
        playerElement.parentNode.parentNode.classList.add('ytactive');

        e.currentTarget.classList.remove('image-active');
        e.currentTarget.classList.remove('slide-in-from-left');
        e.currentTarget.classList.remove('slide-in-from-right');
      }
    });
  });
}

/**
 * Polyfill for object-fit
 */
const objectFitPolyfill = () => {
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
};

/**
 * Setup the gallery using the passed selector
 *
 * @param {string} selector
 */
const simpleGallery = ({ selector = '.gallery' } = {}) => {
  const test = document.querySelectorAll(selector);
  if (test.length > 0) {
    initGalleries(selector);
    setup(selector);
    youtubeSetup();
    objectFitPolyfill();
  };
};

export default simpleGallery;
