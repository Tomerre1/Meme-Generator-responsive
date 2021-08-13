'use strict';
let gMoreState = false;

const onGallery = () => {
    setFilterBy('')
    toggleCanvas('none')
    toggleGallery('grid')
    toggleSearch('flex')
    toggleAbout('none')
    removeAllActiveClass()
    document.querySelector('.gallery-btn').classList.add('active')
    document.querySelector('.categorys').value = '';
}

const renderGallery = () => {
    let strHTML = (getFilterBy() === '') ? `<div class="gallery-frame"> <img onclick="onUploadPhoto()" class="gallery-image" src="img/upload.jpg"> </div>` : ''
    strHTML += filterInput().map((img) => {
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

const removeAllActiveClass = () => {
    let allNavBtns = document.querySelectorAll('.nav-btn')
    allNavBtns.forEach(btn => {
        btn.classList.remove('active')
    })
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
    removeAllActiveClass()
    document.querySelector('.about-btn').classList.add('active')
    toggleCanvas('none')
    toggleGallery('none')
    toggleSearch('none')
    toggleAbout('flex')
}

const onMemes = () => {
    removeAllActiveClass()
    document.querySelector('.memes-btn').classList.add('active')
    if (!getSavedMemes()) {
        document.querySelector('.gallery-container').innerHTML = 'Nothing saved here, Go save some memes!  😉'
        return
    }
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
                        <img onclick="onSavedMeme('${meme.id}')" class="gallery-image" src="${meme.savedImg}">
                        <button onclick="onDeleteSavedMeme('${meme.id}')" class="delete-saved">&times</button>
                    </div>`
    }).join('')
    document.querySelector('.gallery-container').innerHTML = strHTML
}

const onSavedMeme = (memeId) => {
    setMeme(loadMemeById(memeId))
    // setSelectedImage(getMeme().selectedImgId)
    document.querySelector('[name=meme-txt]').value = getMeme().lines[getSelectedLine()].text
    toggleCanvas('block')
    toggleGallery('none')
    toggleSearch('none')
    toggleAbout('none')
    renderCanvas()
    renderStickers()
}

const onDeleteSavedMeme = (memeId) => {
    deleteMeme(memeId)
    renderSaveMemes()
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
    renderStickers()
}