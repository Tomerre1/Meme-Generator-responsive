'use strict'
const MEMES_DB = 'meme_db'
let gMeme = {}

let gMemes = []


const initMeme = () => {
    
    gMeme.selectedImgId = -1
    gMeme.selectedLineIdx = -1
    gMeme.lines = []
    createLine()
    gMeme.id = makeId()
}
const createLine = (text = '', font = 'Impact', colorFill = '#ffffff',
    colorStroke = '#000000', fontSize = 30) => {
    const memeTxt = {
        font,
        pos: { x: 50, y: (50 * gMeme.lines.length) + 50 },
        colorFill,
        colorStroke,
        fontSize,
        text
    }
    gMeme.lines.push(memeTxt)
    gMeme.selectedLineIdx++;
}

const saveMeme = () => {
    gMemes.push(JSON.parse(JSON.stringify(gMeme)))
    saveToStorage(MEMES_DB, gMemes)
}

const getSavedMemes = () => { return loadFromStorage(MEMES_DB) }

const setTexts = txt => {
    if (!gMeme.lines.length) {
        setSelectedLineIdx(-1)
        createLine()
    }
    gMeme.lines[gMeme.selectedLineIdx].text = txt
}

const getMeme = () => { return gMeme }

const setSelectedLineIdx = ind => { gMeme.selectedLineIdx = ind }

const getSelectedLine = () => { return gMeme.selectedLineIdx }

const switchLine = () => {
    gMeme.selectedLineIdx = (gMeme.selectedLineIdx >= gMeme.lines.length - 1) ? 0 : ++gMeme.selectedLineIdx;
}

const setColorFill = (color) => {
    gMeme.lines[gMeme.selectedLineIdx].colorFill = color
}

const setColorStroke = (color) => {
    gMeme.lines[gMeme.selectedLineIdx].colorStroke = color
}

const setFont = (font) => {
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

const setFontSize = (size) => {
    gMeme.lines[gMeme.selectedLineIdx].fontSize += size
}

const setPosX = (size) => {
    gMeme.lines[gMeme.selectedLineIdx].pos.x += size
}

const setPosY = (size) => {
    gMeme.lines[gMeme.selectedLineIdx].pos.y += size
}


const deleteLine = () => {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    switchLine()
}

const setAlign = side => {
    let textLength = gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].text).width
    switch (side) {
        case 'right':
            gMeme.lines[gMeme.selectedLineIdx].pos.x = gCanvas.width - textLength - 20
            break;
        case 'left':
            gMeme.lines[gMeme.selectedLineIdx].pos.x = 20
            break;
        case 'center':
            gMeme.lines[gMeme.selectedLineIdx].pos.x = (gCanvas.width - textLength) / 2
            break;
        default:
            break;
    }
}

// const clearText = () => {
//     /*maybe id*/
//     gMeme.lines = []
//     createLine()
//     gMeme.selectedLineIdx = 0
// }



