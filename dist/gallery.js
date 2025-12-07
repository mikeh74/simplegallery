(()=>{let e=(e,t,l,a,r=null)=>{let i="",s="";return null!==r&&(i=`data-youtubeid="${r}"`,s=`<div class="simple-gallery-play-icon">
          <svg width="110" height="110" viewBox="0 0 110 110" xmlns="http://www.w3.org/2000/svg">
              <path class="simple-gallery-play-icon-circle" d="M 105 55 C 105 27.385765 82.614235 5 55 5 C 27.385763 5 5 27.385765 5 55 C 5 82.614235 27.385763 105 55 105 C 82.614235 105 105 82.614235 105 55 Z"/>
              <path class="simple-gallery-play-icon-triangle" d="M 81.5 55.122868 L 41.5 32.028854 L 41.5 78.216881 Z"/>
          </svg>
        </div>`),`
    <li class="simple-gallery-item" data-imagekey="${e}" ${i}>
      <figure>
        <div class="simple-gallery-image-wrapper">
        <img src="${t}" alt="${l}">
        ${s}
        </div>
        <figcaption>${a}</figcaption>
      </figure>
    </li>`},t=(t,l)=>{let a=[];return t.forEach((t,l)=>{a.push(function(t,l){var a,r;t.setAttribute("data-imagekey",l);let i=t.getAttribute("data-sg-youtubeid"),s=(a=t).getAttribute("data-sg-src")?a.getAttribute("data-sg-src"):a.src,o=(r=t).getAttribute("data-sg-desc")?r.getAttribute("data-sg-desc"):r.alt;return e(l,s,t.alt,o,i)}(t,l))}),`    <ul data-gallery-id="${l}" class="gallery-list">
      ${a.join("")}
    </ul>`},l=e=>`
  <div id="simple-gallery" 
    class="simple-gallery">
    ${e}
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
  </div>`,a={galleryId:"",images:[],currentImage:0,modalImages:[],totalImages:0},r=e=>{let r=document.querySelectorAll(e),i=[];r.forEach(e=>{let l=e.id,r=Object.create(a);r.images=e.querySelectorAll("img");let s=t(r.images,l);i.push(s)});let s=l(i.join(""));document.body.insertAdjacentHTML("beforeend",s)},i=null;function s(){return i||(window.YT&&window.YT.Player?Promise.resolve(window.YT):i=new Promise((e,t)=>{window.onYouTubeIframeAPIReady=()=>{e(window.YT)};let l=document.createElement("script");l.id="iframe-api",l.src="https://www.youtube.com/iframe_api",l.onerror=()=>{t(Error("Failed to load YouTube IFrame API"))};let a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(l,a)}))}var o=({selector:e=".gallery"}={})=>{document.querySelectorAll(e).length>0&&(r(e),function(e){let t=document.getElementById("simple-gallery"),l=document.querySelectorAll(`${e} img`),a=0,r=null,i=t.querySelectorAll(".gallery-list img"),s=0;function o(){c(),t.classList.remove("gallery-active"),document.body.style.overflow="auto";let e=`[data-gallery-id='${r}']`;t.querySelectorAll(e)[0].classList.remove("gallery-list--active"),r=null}function n(){u(a=g(parseInt(a,10)+1))}function d(){u(a=g(parseInt(a,10)-1),"right")}function c(){let e=window.player;if(t.querySelectorAll(".gallery-list li").forEach(function(e){e.classList.remove("image-active","slide-in-from-right","slide-in-from-left")}),void 0!==e){let t=document.querySelector("#simple-gallery #ytplayer");t.parentNode.classList.remove("ytplayer-active"),t.parentNode.parentNode.classList.remove("ytactive"),null!==e.getIframe()&&e.destroy()}}function u(e,l){l=void 0!==l?l:"left",c();let a=t.querySelector(`.gallery-list[data-gallery-id="${r}"] [data-imagekey="${e}"]`);a.classList.add("image-active"),"right"===l?a.classList.add("slide-in-from-right"):a.classList.add("slide-in-from-left"),t.classList.add("gallery-active"),document.body.style.overflow="hidden";let i=`[data-gallery-id='${r}']`;t.querySelectorAll(i)[0].classList.add("gallery-list--active")}function g(e){return e<0?s-1:e>s-1?0:e}l.forEach(function(t){t.addEventListener("click",l=>{l.preventDefault(),c(),r=t.closest(e).id,s=document.querySelectorAll(`[data-gallery-id="${r}"] img`).length;let i=t.getAttribute("data-imagekey");a=i,u(i)})}),i.forEach(e=>{var t,l,a;let r,i;t=e,l=d,a=n,r=0,i=0,t.addEventListener("mousedown",e=>{e.preventDefault(),r=e.screenX}),t.addEventListener("mouseup",e=>{(i=e.screenX)>r+50?l():i<r-50&&a()}),t.addEventListener("touchstart",e=>{r=e.changedTouches[0].screenX}),t.addEventListener("touchend",e=>{(i=e.changedTouches[0].screenX)>r+50?l():i<r-50&&a()})}),t.addEventListener("click",e=>{e.target===t&&o()}),document.querySelector(".simple-gallery-button-close").addEventListener("click",e=>{e.preventDefault(),o()}),document.addEventListener("keydown",e=>{if(t.classList.contains("gallery-active"))switch(e.key){case"Escape":case"Esc":o();break;case"ArrowRight":case"Right":n();break;case"ArrowLeft":case"Left":d()}}),t.querySelector(".simple-gallery-button-previous").addEventListener("click",e=>{e.preventDefault(),d()}),t.querySelector(".simple-gallery-button-next").addEventListener("click",e=>{e.preventDefault(),n()})}(e),s().then(()=>{!function(){let e=e=>{e.target.playVideo()};document.querySelectorAll("#simple-gallery [data-youtubeid]").forEach(function(t){t.addEventListener("click",function(t){t.preventDefault();let l=t.currentTarget.getAttribute("data-youtubeid");""!==l&&s().then(a=>{window.player=new a.Player("ytplayer",{height:"390",width:"640",videoId:l,events:{onReady:e},playerVars:{rel:0,autoplay:1}});let r=document.querySelector("#simple-gallery #ytplayer");r.parentNode.classList.add("ytplayer-active"),r.parentNode.parentNode.classList.add("ytactive"),t.currentTarget.classList.remove("image-active","slide-in-from-right","slide-in-from-left")}).catch(e=>{console.error("Failed to load YouTube player:",e)})})})}()}).catch(e=>{console.error("Failed to load YouTube API:",e)}))};o(),window.simpleGallery=o})();
//# sourceMappingURL=gallery.js.map
