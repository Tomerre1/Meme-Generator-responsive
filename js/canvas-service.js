'use strict'
const MEMES_DB = 'meme_db'
let gMeme = {
    selectedImgId: 5,
    selectedLineIdx: -1,
    lines: []
}

const createLine = (text = '', font = 'Impact', colorFill = '#ffffff',
    colorStroke = '#000000', fontSize = 30, align = 'left') => {
    const memeTxt = {
        font,
        pos: { x: 50, y: (50 * gMeme.lines.length) + 50 },
        colorFill,
        colorStroke,
        fontSize,
        text,
        align
    }
    gMeme.lines.push(memeTxt)
    gMeme.selectedLineIdx++;
    saveToStorage(MEMES_DB, gMeme)
}

const getTexts = () => { return loadFromStorage(MEMES_DB) }

const setTexts = txt => {
    if (!gMeme.lines.length) {
        setSelectedLineIdx(-1)
        createLine()
    }
    gMeme.lines[gMeme.selectedLineIdx].text = txt
    saveToStorage(MEMES_DB, gMeme)
}

const getMeme = () => { return gMeme; }

const setSelectedLineIdx = ind => { gMeme.selectedLineIdx = ind }

const getSelectedLine = () => { return gMeme.selectedLineIdx }

const switchLine = () => {
    gMeme.selectedLineIdx = (gMeme.selectedLineIdx >= gMeme.lines.length - 1) ? 0 : ++gMeme.selectedLineIdx;
}

const setColorFill = (color) => {
    gMeme.lines[gMeme.selectedLineIdx].colorFill = color
    saveToStorage(MEMES_DB, gMeme)
}

const setColorStroke = (color) => {
    gMeme.lines[gMeme.selectedLineIdx].colorStroke = color
    saveToStorage(MEMES_DB, gMeme)
}

const setFont = (font) => {
    gMeme.lines[gMeme.selectedLineIdx].font = font
    saveToStorage(MEMES_DB, gMeme)
}

const setFontSize = (size) => {
    gMeme.lines[gMeme.selectedLineIdx].fontSize += size
    saveToStorage(MEMES_DB, gMeme)
}

const setPosX = (size) => {
    gMeme.lines[gMeme.selectedLineIdx].pos.x += size
    saveToStorage(MEMES_DB, gMeme)
}

const setPosY = (size) => {
    gMeme.lines[gMeme.selectedLineIdx].pos.y += size
    saveToStorage(MEMES_DB, gMeme)
}

const setSelectedImage = imgId => { gMeme.selectedImgId = imgId }

const getSelectedImage = () => { return gMeme.selectedImgId }

const deleteLine = () => {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    switchLine()
    saveToStorage(MEMES_DB, gMeme)
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
    saveToStorage(MEMES_DB, gMeme)
}

const clearText = () => {
    gMeme.lines = []
    gMeme.selectedLineIdx = -1
    saveToStorage(MEMES_DB, gMeme)
}

const getCurrentLineMeasures = () => {
    console.log(gMeme.selectedLineIdx)
    return {
        x: gMeme.lines[getSelectedLine()].pos.x,
        y: gMeme.lines[getSelectedLine()].pos.y,
        textLength: gCtx.measureText(gMeme.lines[getSelectedLine()].text).width,
        textHeight: gMeme.lines[getSelectedLine()].fontSize
    }
}

