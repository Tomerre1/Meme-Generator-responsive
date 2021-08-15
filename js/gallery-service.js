'use strict';
let gFilterBy = '';
let gKeywords = {
    Happy: 24,
    Trump: 14,
    Pets: 18,
    Sleep: 10,
    Children: 24,
    Suprising: 40,
    Love: 10,
    Pointing: 14,
    Winner: 20,
    Smart: 13,
    Cool: 19,
    Zero: 10,
    Putin: 16
}
const gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['Happy'] },
    { id: 2, url: 'img/2.jpg', keywords: ['Trump'] },
    { id: 3, url: 'img/3.jpg', keywords: ['Pets', 'Love'] },
    { id: 4, url: 'img/4.jpg', keywords: ['Sleep', 'Pets'] },
    { id: 5, url: 'img/5.jpg', keywords: ['Children', 'Winner'] },
    { id: 6, url: 'img/6.jpg', keywords: ['Pets', 'Sleep'] },
    { id: 7, url: 'img/7.jpg', keywords: ['Happy'] },
    { id: 8, url: 'img/8.jpg', keywords: ['Happy', 'Children'] },
    { id: 9, url: 'img/9.jpg', keywords: ['Smart', 'Pointing'] },
    { id: 10, url: 'img/10.jpg', keywords: ['Pointing'] },
    { id: 11, url: 'img/11.jpg', keywords: ['Smart', 'Winner'] },
    { id: 12, url: 'img/12.jpg', keywords: ['Cool'] },
    { id: 13, url: 'img/13.jpg', keywords: ['Children', 'Happy', 'Winner'] },
    { id: 14, url: 'img/14.jpg', keywords: ['Cool', 'Winner'] },
    { id: 15, url: 'img/15.jpg', keywords: ['Suprising'] },
    { id: 16, url: 'img/16.jpg', keywords: ['Pets'] },
    { id: 17, url: 'img/17.jpg', keywords: ['Happy'] },
    { id: 18, url: 'img/18.jpg', keywords: ['Happy', 'Love', 'Winner'] },
    { id: 19, url: 'img/19.jpg', keywords: ['Cool'] },
    { id: 20, url: 'img/20.jpg', keywords: ['Cool'] },
    { id: 21, url: 'img/21.jpg', keywords: ['Zero'] },
    { id: 22, url: 'img/22.jpg', keywords: ['Happy'] },
    { id: 23, url: 'img/23.jpg', keywords: ['Happy'] },
    { id: 24, url: 'img/24.jpg', keywords: ['Putin'] },
    { id: 25, url: 'img/25.jpg', keywords: ['Happy'] },
];

const getImgs = () => {
    return gImgs
}

const getKeywords = () => { return gKeywords }

const setFilterBy = filter => {
    gFilterBy = filter
    renderGallery()
}

const getFilterBy = () => { return gFilterBy }

const filterInput = () => {
    if (!gFilterBy) return gImgs
    return gImgs.filter(img => {
        let categorys = img.keywords.slice()
        categorys.forEach((word, ind) => categorys[ind] = word.toLowerCase())
        const words = categorys.join(',')
        return (words.includes(gFilterBy.toLowerCase()))
    })
}

const setSelectedImage = imgId => { gMeme.selectedImgId = imgId }

const getSelectedImage = () => { return gMeme.selectedImgId }

const getImageById = (id) => {
    return gImgs.find(img => img.id === id)
}

const deleteMeme = (memeId) => {
    gMemes = loadFromStorage(MEMES_DB)
    const ind = gMemes.findIndex(meme => meme.id === memeId)
    gMemes.splice(ind, 1)
    saveToStorage(MEMES_DB, gMemes)

}

const loadImageFromInput = (ev, onImageReady) => {
    let reader = new FileReader()

    reader.onload = function (event) {
        gUploadedPhoto = new Image()
        gUploadedPhoto.onload = onImageReady.bind(null, gUploadedPhoto)
        gUploadedPhoto.src = event.target.result
    }
    reader.readAsDataURL(ev.target.files[0])
}