'use strict'
let gCanvas
let gCtx
let gInput
let gImg
let isDownload = false

const init = () => {
    gCanvas = document.getElementById('my-canvas')
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
}

const resizeCanvas = () => {
    const elContainer = document.querySelector('.canvas-container')
    const elMemeContainer = document.querySelector('.meme-container')
    if (getComputedStyle(elMemeContainer, null).display === 'none') return
    let ratio = Math.min(elContainer.offsetWidth, elContainer.offsetHeight)
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
    if (!isDownload && selectedInd === getSelectedLine()) drawRect(x, y, gCtx.measureText(text).width, fontSize)
    gCtx.save()
}

const renderCanvas = () => {
    gImg = new Image();
    gImg.src = `img/${getSelectedImage()}.jpg`
    gImg.onload = () => {
        gCtx.drawImage(gImg, 0, 0, gCanvas.width, gCanvas.height)
        getMeme().lines.forEach((txt, ind) => {
            drawText(txt.pos.x, txt.pos.y, txt.text, txt.colorStroke, txt.colorFill, txt.fontSize, txt.font, ind)
        })
    }

}

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
    isDownload = true
    renderCanvas()
    const data = gCanvas.toDataURL()
    elLink.href = data
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