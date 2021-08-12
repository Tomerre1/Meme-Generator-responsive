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
    createLine()
    addEventListeners()
}

const addEventListeners = () => {
    gInput = document.querySelector('[name=meme-txt]')
    gInput.addEventListener('input', onText)
    addEventListenersGallery()
    window.addEventListener('resize', resizeCanvas)
}

const resizeCanvas = () => {
    const elContainer = document.querySelector('.canvas-container');
    if (500 < elContainer.offsetWidth) return
    const min = Math.min(elContainer.offsetWidth, elContainer.offsetHeight)
    gCanvas.width = min;
    gCanvas.height = min;
    renderCanvas()
}

const drawText = (txt) => {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = txt.colorStroke;
    gCtx.fillStyle = txt.colorFill;
    gCtx.font = txt.fontSize + 'px ' + txt.font;
    gCtx.fillText(txt.text, txt.pos.x, txt.pos.y)
    gCtx.strokeText(txt.text, txt.pos.x, txt.pos.y)

    // let line = getMeme().lines[getSelectedLine()]
  
    // let x = line.pos.x
    // let y = line.pos.y
    // let textLength = line.width
    // let textHeight = line.fontSize
    // gCtx.measureText(line.text).width
    // drawRect(x, y, textLength, textHeight)
}

const renderCanvas = () => {
    gImg = new Image();
    gImg.src = `img/${getSelectedImage()}.jpg`
    gImg.onload = () => {
        gCtx.drawImage(gImg, 0, 0, gCanvas.width, gCanvas.height)
        getMeme().lines.forEach(txt => {
            drawText(txt)
        })
        if (getMeme().lines.length) {
            let line = getMeme().lines[getSelectedLine()]
            console.log(line);
            let x = line.pos.x
            let y = line.pos.y
            let textLength = gCtx.measureText(line.txt).width
            let textHeight = line.fontSize
            // const { x, y, textLength, textHeight } = getCurrentLineMeasures()
            if (!isDownload) {
                drawRect(x, y, textLength, textHeight)
            }
        }
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
    renderCanvas();
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