'use strict';
const renderGallery = () => {
    const strHTML = filterInput().map((img) => {
        // return `<img onclick="onImage(${img.id})" class="gallery-image" src="${img.url}"/>`
        return `<div class="gallery-frame">
                    <img onclick="onImage(${img.id})" class="gallery-image" src="${img.url}">
                    <div>${[...img.keywords].join(' , ')}</div>
                </div>`
    }).join('')
    document.querySelector('.gallery-container').innerHTML = strHTML
}

const toggleGallery = state => {
    const display = (state === 'none') ? 'none' : 'block'
    document.querySelector('.gallery-container').style.display = display
}

const addEventListenersGallery = () => {
    const categoryInput = document.querySelector('.categorys')
    let eventSource = null
    let value = ''
    categoryInput.addEventListener('keydown', (e) => {
        eventSource = e.key ? 'input' : 'list'
    });
    categoryInput.addEventListener('input', (e) => {
        value = e.target.value;
        (eventSource === 'list') ? setFilterBy(value) : setFilterBy(categoryInput.value)
    });
}

