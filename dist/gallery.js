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
  </div>`,a={galleryId:"",images:[],currentImage:0,modalImages:[],totalImages:0},r=e=>{let r=document.querySelectorAll(e),i=[];r.forEach(e=>{let l=e.id,r=Object.create(a);r.images=e.querySelectorAll("img");let s=t(r.images,l);i.push(s)});let s=l(i.join(""));document.body.insertAdjacentHTML("beforeend",s)};window.onYouTubeIframeAPIReady=()=>{(function(){let e=window.YT,t=window.onPlayerReady;document.querySelectorAll("#simple-gallery [data-youtubeid]").forEach(function(l){l.addEventListener("click",function(l){l.preventDefault();let a=l.currentTarget.getAttribute("data-youtubeid");if(""!==a){window.player=new e.Player("ytplayer",{height:"390",width:"640",videoId:a,events:{onReady:t},playerVars:{rel:0,autoplay:1}});let r=document.querySelector("#simple-gallery #ytplayer");r.parentNode.classList.add("ytplayer-active"),r.parentNode.parentNode.classList.add("ytactive"),l.currentTarget.classList.remove("image-active"),l.currentTarget.classList.remove("slide-in-from-left"),l.currentTarget.classList.remove("slide-in-from-right")}})})})()},window.onPlayerReady=e=>{e.target.playVideo()};let i=()=>{"objectFit"in document.documentElement.style==!1&&document.querySelectorAll(".gallery img").forEach(function(e){let t=e.src,l=e.parentNode;e.style.opacity=0,l.style.backgroundImage=`url("${t}")`,l.style.backgroundPosition="center center",l.style.backgroundSize="cover"})};var s=({selector:e=".gallery"}={})=>{document.querySelectorAll(e).length>0&&(r(e),function(e){let t=document.getElementById("simple-gallery"),l=document.querySelectorAll(`${e} img`),a=0,r=null,i=t.querySelectorAll(".gallery-list img"),s=0,o=0,n=0;function c(){g(),t.classList.remove("gallery-active"),document.body.style.overflow="auto";let e=`[data-gallery-id='${r}']`;t.querySelectorAll(e)[0].classList.remove("gallery-list--active"),r=null}function d(){y(a=m(parseInt(a,10)+1))}function u(){y(a=m(parseInt(a,10)-1),"right")}function g(){let e=window.player;if(t.querySelectorAll(".gallery-list li").forEach(function(e){e.classList.remove("image-active"),e.classList.remove("slide-in-from-right"),e.classList.remove("slide-in-from-left")}),void 0!==e){let t=document.querySelector("#simple-gallery #ytplayer");t.parentNode.classList.remove("ytplayer-active"),t.parentNode.parentNode.classList.remove("ytactive"),null!==e.getIframe()&&e.destroy()}}function y(e,l){l=void 0!==l?l:"left",g();let a=t.querySelector(`.gallery-list[data-gallery-id="${r}"] [data-imagekey="${e}"]`);a.classList.add("image-active"),"right"===l?a.classList.add("slide-in-from-right"):a.classList.add("slide-in-from-left"),t.classList.add("gallery-active"),document.body.style.overflow="hidden";let i=`[data-gallery-id='${r}']`;t.querySelectorAll(i)[0].classList.add("gallery-list--active")}function m(e){return e<0?s-1:e>s-1?0:e}l.forEach(function(t){t.addEventListener("click",l=>{l.preventDefault(),g(),r=t.closest(e).id,s=document.querySelectorAll(`[data-gallery-id="${r}"] img`).length;let i=t.getAttribute("data-imagekey");a=i,y(i)})}),i.forEach(e=>{e.addEventListener("mousedown",e=>{e.preventDefault(),o=e.screenX}),e.addEventListener("mouseup",e=>{(n=e.screenX)>o+50?u():n<o-50&&d()}),e.addEventListener("touchstart",e=>{o=e.changedTouches[0].screenX}),e.addEventListener("touchend",e=>{(n=e.changedTouches[0].screenX)>o+50?u():n<o-50&&d()})}),t.addEventListener("click",e=>{e.target===t&&c()}),document.querySelector(".simple-gallery-button-close").addEventListener("click",e=>{e.preventDefault(),c()}),document.addEventListener("keydown",e=>{if(t.classList.contains("gallery-active"))switch(e.key){case"Escape":case"Esc":c();break;case"ArrowRight":case"Right":d();break;case"ArrowLeft":case"Left":u()}}),t.querySelector(".simple-gallery-button-previous").addEventListener("click",e=>{e.preventDefault(),u()}),t.querySelector(".simple-gallery-button-next").addEventListener("click",e=>{e.preventDefault(),d()})}(e),function(){let e=document.createElement("script");e.id="iframe-api",e.src="https://www.youtube.com/iframe_api";let t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}(),i())};s(),window.simpleGallery=s})();
//# sourceMappingURL=gallery.js.map
