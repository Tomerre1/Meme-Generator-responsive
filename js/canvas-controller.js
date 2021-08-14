'use strict'
let gCanvas
let gCtx
let gInput
let gImg
let gIsDownload = false
let gStartPos
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
const gStickers = ['😎', '😭', '😍', '😂', '🤑', '🥳', '🤫', '🌷', '🤬']
let gStickerState = { startInd: 0, endInd: 3 }
let gUploadedPhoto

const init = () => {
    gCanvas = document.querySelector('.my-canvas')
    gCtx = gCanvas.getContext('2d')
    renderGallery()
    renderKeywords()
    addEventListeners()
}

const addEventListeners = () => {
    gInput = document.querySelector('[name=meme-txt]')
    gInput.addEventListener('input', onText)
    addEventListenersGallery()
    window.addEventListener('resize', resizeCanvas)
    addMouseListeners()
    addTouchListeners()
}

const addMouseListeners = () => {
    gCanvas.addEventListener('mousemove', onGrabMove)
    gCanvas.addEventListener('mousedown', onGrabDown)
    gCanvas.addEventListener('mouseup', onGrabUp)
}

const addTouchListeners = () => {
    gCanvas.addEventListener('touchmove', onGrabMove)
    gCanvas.addEventListener('touchstart', onGrabDown)
    gCanvas.addEventListener('touchend', onGrabUp)
}

const onGrabMove = (ev) => {
    const currLine = getMeme().lines[getSelectedLine()]
    if (currLine.isDrag) {
        const pos = getEvPos(ev)
        const dx = pos.x - currLine.pos.x
        const dy = pos.y - currLine.pos.y
        moveCurrLine(dx, dy)
        gStartPos = pos
        renderCanvas()
    }
}


const onGrabDown = (ev) => {
    const pos = getEvPos(ev)
    if (!isLineClicked(pos)) return
    setLineDrag(true)
    gStartPos = pos
    gCanvas.style.cursor = 'grabbing'

}

const onGrabUp = () => {
    setLineDrag(false)
    gCanvas.style.cursor = 'grab'
}

const getEvPos = (ev) => {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}


const resizeCanvas = () => {
    const elContainer = document.querySelector('.canvas-container')
    const elMemeContainer = document.querySelector('.meme-container')
    if (getComputedStyle(elMemeContainer, null).display === 'none') return
    let ratio = Math.min(elContainer.offsetWidth - 20, elContainer.offsetHeight)
    if (ratio >= 500) ratio = 500
    gCanvas.width = ratio
    gCanvas.height = ratio
    renderCanvas()
}

const drawText = (x, y, text, colorStroke, colorFill, fontSize, font, selectedInd) => {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = colorStroke;
    gCtx.fillStyle = colorFill;
    gCtx.font = fontSize + 'px ' + font;
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
    if (!gIsDownload && selectedInd === getSelectedLine()) drawRect(x, y, gCtx.measureText(text).width, fontSize)
    gCtx.save()
}

// const renderCanvas = () => {
//     gImg = new Image();
//     gImg.src = `img/${getSelectedImage()}.jpg`
//     gImg.onload = () => {
//         gCtx.drawImage(gImg, 0, 0, gCanvas.width, gCanvas.height)
//         getMeme().lines.forEach((txt, ind) => {
//             drawText(txt.pos.x, txt.pos.y, txt.text, txt.colorStroke, txt.colorFill, txt.fontSize, txt.font, ind)
//         })
//     }

// }

const onText = () => {
    setTexts(gInput.value)
    clearCanvas()
    renderCanvas()
}


const onSetColorFill = (color) => {
    setColorFill(color)
    clearCanvas()
    renderCanvas()
}

const onSetColorStroke = (color) => {
    setColorStroke(color)
    clearCanvas()
    renderCanvas()
}

const onPlus = () => {
    setFontSize(10)
    clearCanvas()
    renderCanvas()
}

const onMinus = () => {
    setFontSize(-10)
    clearCanvas()
    renderCanvas()
}

const onDown = () => {
    setPosY(10)
    clearCanvas()
    renderCanvas()
}

const onUp = () => {
    setPosY(-10)
    clearCanvas()
    renderCanvas()
}

const onRight = () => {
    setPosX(10)
    clearCanvas()
    renderCanvas()
}

const onLeft = () => {
    setPosX(-10)
    clearCanvas()
    renderCanvas()
}

const onSave = () => {
    saveMeme()
}

const clearCanvas = () => {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}

const onDeleteLine = () => {
    document.querySelector('[name=meme-txt]').value = ''
    deleteLine()
    clearCanvas()
    renderCanvas()

}

const onAddLine = () => {
    setSelectedLineIdx(getMeme().lines.length - 1)
    createLine()
    document.querySelector('[name=meme-txt]').value = ''
    setTexts('')
}

const onSwitchLine = () => {
    switchLine()
    renderLinePrefs()
    renderCanvas()
}

const renderLinePrefs = () => {
    const line = getMeme().lines[getSelectedLine()]
    gInput.value = line.text
    document.querySelector('[name=color-stroke]').value = line.colorStroke
    document.querySelector('[name=color-fill]').value = line.colorFill
    document.querySelector(`.meme-font [value="${line.font}"]`).selected = true;
}



const downloadCanvas = (elLink) => {
    gIsDownload = true
    gCtx.drawImage(gImg, 0, 0, gCanvas.width, gCanvas.height)
    getMeme().lines.forEach((txt, ind) => {
        drawText(txt.pos.x, txt.pos.y, txt.text, txt.colorStroke, txt.colorFill, txt.fontSize, txt.font, ind)
    })
    const data = gCanvas.toDataURL('image/jpeg', 0.5)
    elLink.href = data
    gIsDownload = false
}

const onChangeFont = (font) => {
    setFont(font)
    clearCanvas()
    renderCanvas()
}

const toggleCanvas = (state) => {
    const display = (state === 'none') ? 'none' : 'block'
    document.querySelector('.meme-container').style.display = display
}


const onAlign = side => {
    setAlign(side)
    clearCanvas()
    renderCanvas()
}

const drawRect = (x, y, textLength, txtHeight) => {
    gCtx.beginPath()
    gCtx.rect(x, y - txtHeight * 0.9, textLength * 1.05, txtHeight)
    gCtx.strokeStyle = 'gray'
    gCtx.stroke()
}

const renderStickers = () => {
    if (gStickerState.endInd >= gStickers.length) {
        gStickerState.startInd = gStickers.length - 3
        gStickerState.endInd = gStickers.length
    }

    else if (gStickerState.startInd <= 0) {
        gStickerState.startInd = 0
        gStickerState.endInd = 3
    }

    let strHTML = ''
    for (let i = gStickerState.startInd; i < gStickerState.endInd; i++) {
        strHTML += `<button class="emojis" onclick="onSticker('${gStickers[i]}')">${gStickers[i]}</button>`
    }
    document.querySelector('.stickers').innerHTML = strHTML

}

const onSticker = emoji => {
    createLine(emoji)
    renderCanvas()
}

const onRightStickers = () => {
    gStickerState.startInd += 3
    gStickerState.endInd += 3
    renderStickers()
}
const onLeftStickers = () => {
    gStickerState.startInd -= 3
    gStickerState.endInd -= 3
    renderStickers()

}

// The next 2 functions handle IMAGE UPLOADING to img tag from file system: 
function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
    var reader = new FileReader()

    reader.onload = function (event) {
        gUploadedPhoto = new Image()
        gUploadedPhoto.onload = onImageReady.bind(null, gUploadedPhoto)
        gUploadedPhoto.src = event.target.result
    }
    reader.readAsDataURL(ev.target.files[0])
}


function renderImg(gImg) {
    // gCtx.drawImage(gImg, 0, 0, gCanvas.width, gCanvas.height)
    initMeme()
    toggleCanvas('block')
    toggleGallery('none')
    toggleSearch('none')
    toggleAbout('none')
    renderStickers()
    renderCanvas()
}


const renderCanvas = () => {
    gImg = new Image()
    gImg.src = (getSelectedImage() > -1) ? `img/${getSelectedImage()}.jpg` : gUploadedPhoto.src
    gImg.onload = () => {
        gCtx.drawImage(gImg, 0, 0, gCanvas.width, gCanvas.height)
        getMeme().lines.forEach((txt, ind) => {
            drawText(txt.pos.x, txt.pos.y, txt.text, txt.colorStroke, txt.colorFill, txt.fontSize, txt.font, ind)
        })
    }

}