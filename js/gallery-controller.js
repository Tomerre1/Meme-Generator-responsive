'use strict';
let gMoreState = false;

const onGallery = () => {
    setFilterBy('')
    toggleCanvas('none')
    toggleGallery('grid')
    toggleSearch('flex')
    toggleAbout('none')

    document.querySelector('.categorys').value = '';
    isDownload = false
}

const renderGallery = () => {
    const strHTML = filterInput().map((img) => {
        return `<div class="gallery-frame">
                    <img onclick="onImage(${img.id})" class="gallery-image" src="${img.url}">
                    <div>${[...img.keywords].join(' , ')}</div>
                </div>`
    }).join('')
    document.querySelector('.gallery-container').innerHTML = strHTML
}

const toggleGallery = state => {
    const display = (state === 'none') ? 'none' : 'grid'
    document.querySelector('.gallery-container').style.display = display
}
const toggleSearch = state => {
    const display = (state === 'none') ? 'none' : 'flex'
    document.querySelector('.search-container').style.display = display
}

const toggleAbout = state => {
    const display = (state === 'none') ? 'none' : 'flex'
    document.querySelector('.about').style.display = display
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

const onClickWords = (elBtn) => {
    let keywords = getKeywords()
    keywords[elBtn.value] += 5
    elBtn.style.fontSize = keywords[elBtn.value] + 'px'
    setFilterBy(elBtn.value)
    renderGallery()
}

const renderKeywords = () => {
    const keywords = getKeywords()
    let strHTML = ''
    let counter = 0
    for (let word in keywords) {
        if (!gMoreState && counter === 4) break;
        strHTML += `<button onclick="onClickWords(this)" class="btn-${word}" value="${word}">${word}</button>`
        counter++
    }
    strHTML += `<button class="btn-more" onclick="onMore()">${(gMoreState) ? 'Less' : 'More'}</button>`
    document.querySelector('.search-btns').innerHTML = strHTML
}

const onMore = () => {
    gMoreState = !gMoreState
    renderKeywords()
}



const toggleMenu = () => {
    document.body.classList.toggle('menu-open');
}

const onAbout = () => {
    toggleCanvas('none')
    toggleGallery('none')
    toggleSearch('none')
    toggleAbout('flex')
}

const onMemes = () => {
    if(!getSavedMemes()) return
    toggleCanvas('none')
    toggleGallery('grid')
    toggleSearch('none')
    toggleAbout('none')
    renderSaveMemes()
}

const renderSaveMemes = () => {
    const savedMemes = getSavedMemes()
    const strHTML = savedMemes.map((meme) => {
        return `<div class="gallery-frame">
                        <img onclick="onSavedMeme('${meme.id}')" class="gallery-image" src="${getImageById(meme.selectedImgId).url}">
                        <div>${meme.lines[meme.selectedLineIdx].text}</div>
                    </div>`
    }).join('')
    document.querySelector('.gallery-container').innerHTML = strHTML
}

const onSavedMeme = (memeId) => {
    setMeme(loadMemeById(memeId))
    setSelectedImage(getMeme().selectedImgId)
    document.querySelector('[name=meme-txt]').value = getMeme().lines[getSelectedLine()].text
    toggleCanvas('block')
    toggleGallery('none')
    toggleSearch('none')
    toggleAbout('none')
    renderCanvas()
}

const onImage = imgId => {
    document.querySelector('[name=meme-txt]').value = ''
    initMeme()
    setSelectedImage(+imgId)
    toggleCanvas('block')
    toggleGallery('none')
    toggleSearch('none')
    toggleAbout('none')
    renderCanvas()
}