'use strict';
const renderGallery = () => {
    const strHTML = getImgs().map((img) => {
        // return `<img onclick="onImage(${img.id})" class="gallery-image" src="${img.url}"/>`
        return `<div class="gallery-frame">
                    <img onclick="onImage(${img.id})" class="gallery-image" src="${img.url}">
                    <div>${[...img.keywords]}</div>
                </div>`
    }).join('')
    document.querySelector('.gallery-container').innerHTML = strHTML
}

const toggleGallery = (state) => {
    const display = (state === 'none') ? 'none' : 'block'
    document.querySelector('.gallery-container').style.display = display
}

