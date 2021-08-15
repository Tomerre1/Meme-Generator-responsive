'use strict'
const MEMES_DB = 'meme_db'
let gMeme = { selectedImgId: 0, lines: [] }
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
        text,
        isDrag: false
    }
    gMeme.lines.push(memeTxt)
    gMeme.selectedLineIdx++;
}

const saveMeme = () => {
    gMeme.savedImg = gCanvas.toDataURL()
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

const setMeme = meme => {
    gMeme = meme
    gMeme.id = makeId()
}

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

const loadMemeById = memeId => {
    const savedMemes = loadFromStorage(MEMES_DB)
    return savedMemes.find(meme => meme.id === memeId)
}

const moveCurrLine = (dx, dy) => {
    gMeme.lines[gMeme.selectedLineIdx].pos.x += dx
    gMeme.lines[gMeme.selectedLineIdx].pos.y += dy
}

const setLineDrag = isDrag => {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

const isLineClicked = clickedPos => {
    const { pos } = gMeme.lines[gMeme.selectedLineIdx]
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    return distance <= gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].text).width
}

const shareFacebook = () => {
    const imgDataUrl = gCanvas.toDataURL("image/jpeg")
    const onSuccess = uploadedImgUrl => {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`
        window.open(url, "_blank");
    }
    doUploadImg(imgDataUrl, onSuccess);
}

async function shareOtherApps() {
    const dataUrl = gCanvas.toDataURL();
    const blob = await (await fetch(dataUrl)).blob();
    const filesArray = [
        new File(
            [blob],
            'meme.png',
            {
                type: blob.type,
                lastModified: new Date().getTime()
            }
        )
    ];
    const shareData = {
        files: filesArray,
    };
    navigator.share(shareData);
}

const doUploadImg = (imgDataUrl, onSuccess) => {
    const formData = new FormData();
    formData.append('img', imgDataUrl)
    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(res => res.text())
        .then((url) => {
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}