
let filterBy = '';
const gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['Happy', 'Trump'] },
    { id: 2, url: 'img/2.jpg', keywords: ['Pets', 'Love'] },
    { id: 3, url: 'img/3.jpg', keywords: ['Children', 'Pets', 'Sleep'] },
    { id: 4, url: 'img/4.jpg', keywords: ['Sleep', 'Pets'] },
    { id: 5, url: 'img/5.jpg', keywords: ['Children', 'Winner'] },
    { id: 6, url: 'img/6.jpg', keywords: ['Smart'] },
    { id: 7, url: 'img/7.jpg', keywords: ['Children', 'Suprising'] },
    { id: 8, url: 'img/8.jpg', keywords: ['Happy'] },
    { id: 9, url: 'img/9.jpg', keywords: ['Happy', 'Children'] },
    { id: 10, url: 'img/10.jpg', keywords: ['Happy'] },
    { id: 11, url: 'img/11.jpg', keywords: ['Love', 'Winner'] },
    { id: 12, url: 'img/12.jpg', keywords: ['Pointing'] },
    { id: 13, url: 'img/13.jpg', keywords: ['Cool', 'Happy', 'Winner'] },
    { id: 14, url: 'img/14.jpg', keywords: ['Cool'] },
    { id: 15, url: 'img/15.jpg', keywords: ['Zero'] },
    { id: 16, url: 'img/16.jpg', keywords: ['Happy'] },
    { id: 17, url: 'img/17.jpg', keywords: ['Putin','Pointing'] },
    { id: 18, url: 'img/18.jpg', keywords: ['Happy'] },
];

const getImgs = () => {
    return gImgs
}

const setFilterBy = filter => {
    filterBy = filter
    renderGallery()
}


const filterInput = () => {
    if (!filterBy) return gImgs
    return gImgs.filter(img => {
        let categorys = img.keywords.slice()
        categorys.forEach((word, ind) => categorys[ind] = word.toLowerCase())
        const words = categorys.join(',')
        return (words.includes(filterBy.toLowerCase()))
    })
}