'use strict';
const renderGallery = () => {
    const strHTML = getImgs().map((img) => {
        return `<img onclick="onImage(${img.id})" class="gallery-image" src="${img.url}"/>`
    }).join('')
    document.querySelector('.gallery-container').innerHTML = strHTML
}