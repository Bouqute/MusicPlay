/**
 * 
 * @returns Array
 */
function parseLrc() {
    let obj = {};
    let lrcLine = lrc.split('\n');
    var result = []
    for (let i = 0; i < lrcLine.length; i++) {
        let element = lrcLine[i];
        let str = element.split(']');
        let timeStr = str[0].substring(1);
        obj = {
            time: fomateTime(timeStr),
            words: str[1]
        }
        result.push(obj)
    }
    return result
}

/**
 * 
 * @param {String} timeStr 
 * @returns 
 */
function fomateTime(timeStr) {
    var parts = timeStr.split(':')
    return +parts[0] * 60 + +parts[1]
}

var lrcData = parseLrc()

let eleObj = {
    content: document.querySelector('.conten'),
    ul: document.querySelector('ul'),
    audio: document.querySelector('audio')
}

function findIndex() {
    let currentTime = eleObj.audio.currentTime;
    for (let i = 0; i < lrcData.length; i++) {
        const element = lrcData[i];
        if (currentTime < element.time) {
            return i - 1;
        }
    }
    return lrcData.length - 1;

}


function initLrc() {
    var frag = document.createDocumentFragment()
    for (let i = 0; i < lrcData.length; i++) {
        const element = lrcData[i];
        var li = document.createElement('li');
        li.innerText = element.words;
        frag.appendChild(li)
    }
    eleObj.ul.appendChild(frag);
}
initLrc()

var contentHeight = eleObj.content.clientHeight;
var liHeight = eleObj.ul.children[0].clientHeight
var maxOffset = eleObj.ul.clientHeight - contentHeight;

function setOffset() {
    var index = findIndex();
    var offset = liHeight * index + liHeight / 2 - contentHeight / 2;
    if (offset < 0) {
        offset = 0
    }
    if (offset > maxOffset) {
        offset = maxOffset
    }
    eleObj.ul.style.transform = `translateY(-${offset}px)`
    li = eleObj.ul.querySelector('.active');
    if (li) {
        li.classList.remove('active')
    }
    li = eleObj.ul.children[index];

    if (li) {
        li.classList.add('active');
    }

}

eleObj.audio.addEventListener('timeupdate',setOffset)
