window.onload = init


let firstColumnPosition = 0
let secondColumnPosition = 50
let thirdColumnPosition = 80
let c = 80
let count = 0
let result = 0
let resultMin = 0
let showingTooltip
var clientWidth


// events on initial
function init() {
    setZeroToCells()
    countAllResults()
}


// add eventListeners
document.querySelector(".inputButnFirstCol").addEventListener("click", () => {
    inputLogic("timeInput", firstColumnPosition)})
document.querySelector(".inputButnSecondCol").addEventListener("click", () => {
    inputLogic("timeInput1", secondColumnPosition)})
document.querySelector(".inputButnThirdCol").addEventListener("click", () => {
    inputLogic("timeInput2", thirdColumnPosition)})

document.getElementById("formOnBotOrTop").addEventListener("click", moveFormsBotOrTop)
document.querySelector(".reset").addEventListener("click", resetCells)
document.querySelector(".clock__switch").addEventListener("click", clockSwitch)

// bind onEnterPress on inputs fields 
document.getElementById("timeInput").addEventListener("keypress", onEnterPress)
document.getElementById("timeInput1").addEventListener("keypress", onEnterPress)
document.getElementById("timeInput2").addEventListener("keypress", onEnterPress)


// Clock
let intervalClock = setInterval(getTime, 1000)
let intervalClientwidth = setInterval(getClientWidth, 1000)

const addZero = (time) => {
    if (time < 10) {
        time = "0" + time
    }
    return time
}

function getTime() {
    const timeElement = document.querySelector('.clock')

    let date = new Date
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()

    const flatClock = addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds)
    const cirlceClock = addZero(hours) + ":" + addZero(minutes)

    let clockViewChecker = document.querySelector('.clock').classList.contains('circle')
    
    timeElement.innerText = clockViewChecker ? cirlceClock : flatClock
}

function clockSwitch() {
    let clock = document.querySelector('.clock')
    clock.classList.toggle('circle')
}


// get client width of screen
function getClientWidth() {
    console.log(`in function` )
    return clientWidth = document.documentElement.clientWidth
}

// move forms to bottom or to top 
function moveFormsBotOrTop() {
    if(clientWidth >= 550) {
        document.querySelector('.handlers').classList.toggle("reverseColumn")
        document.querySelector(".forms").classList.toggle("formsMargins")
        document.querySelector(".messageArea").classList.toggle("messageMarginOnBottom")
    } else {
        document.querySelector('.container').classList.toggle("containerReverse")
    }
}


// reset cells
function resetCells() {
    firstColumnPosition = 0
    secondColumnPosition = 50
    thirdColumnPosition = 80
    
    for (let x = 0; x < 25; x++) {
        document.getElementById(0 + x).innerText = ""
        document.getElementById(50 + x).innerText = ""
        countAllResults()
    }

    setZeroToCells()
}


// enter button = click
function onEnterPress(e) {
    let buttons = document.querySelectorAll(".inputBtns")
    let ind = (e.target.id).slice(9)

    if (ind == 0) {
        ind = 0
    }

    if (e.keyCode === 13) {
        e.preventDefault()
        buttons[ind].click()
        return false
    }
}


// check valid inputs
function IsValid(n) {
    if (n.length > 5 || !(!isNaN(parseFloat(n)) && isFinite(n))) {
        alert("Input invalid or too long. Valid - 22.10 or 35 , max. length - 5 symbols")
        return false
    } else {
        return true
    }
}


// input logic onclick
function inputLogic(inputId, cellId) {
    let inputField = document.getElementById(inputId)
    let inputValue = inputField.value

    if (IsValid(inputValue)) {

        if (inputValue < 0) {
            inputValue = inputValue * (-1)
        }

        let countCeloe = parseInt(inputValue)
        let countDrobnoe = Math.round((inputValue - countCeloe) * 100) / 100

        while (Math.round(countDrobnoe * 100) / 100 >= 0.60) {
            countCeloe++
            countDrobnoe = Math.round((countDrobnoe - 0.60) * 100) / 100
        }

        if (Math.round(countDrobnoe * 100) / 100 < 0.60) {
            inputValue = (countCeloe + parseInt(countDrobnoe * 100) / 100).toFixed(2)
        }

        document.getElementById(cellId).innerText = inputValue
        inputField.value = ""

        if (inputId === "timeInput") {
            countLogic()

            firstColumnPosition++
            thirdColumnPosition++

            if (thirdColumnPosition - 80 > firstColumnPosition) {
                thirdColumnPosition = 80 + firstColumnPosition
            }
        } else if (inputId === "timeInput1") {
            countLogic()

            secondColumnPosition++
            thirdColumnPosition++

            if ((thirdColumnPosition - 80) > (secondColumnPosition - 50)) {
                thirdColumnPosition = 80 + (secondColumnPosition - 50)
            }
        } else if (inputId === "timeInput2") {
            let inputMin = Math.round(countCeloe * 60 + countDrobnoe * 100)
            document.getElementById(30 + thirdColumnPosition).innerText = inputMin

            firstColumnPosition++
            secondColumnPosition++
            thirdColumnPosition++
    
            if (firstColumnPosition < (thirdColumnPosition - 80)) {
                firstColumnPosition = thirdColumnPosition - 80
            }
    
            if ((secondColumnPosition - 50) < (thirdColumnPosition - 80)) {
                secondColumnPosition = 50 + (thirdColumnPosition - 80)
            }
        }

        countAllResults()

    } else {
        inputField.value = ""
    }
}


// count logic
function countLogic() {
    for (let x = 0; x < 25; x++) {

        let first = document.getElementById(x).innerText
        let second = document.getElementById(50 + x).innerText
        let third = document.getElementById(80 + x).innerText

        if (third == "0") {

            let h = 0, m = 0
            let hsFirst = parseInt(first) * 3600
            let hsSecond = parseInt(second) * 3600
            let msFirst = (Math.round((first - parseInt(first)) * 100)) * 60
            let msSecond = (Math.round((second - parseInt(second)) * 100)) * 60
            let res = (hsSecond - hsFirst) + (msSecond - msFirst)

            if (isNaN(res)) {
                res = 0
            } else if (res < 0) {
                res = res * (-1)
            }

            let resultMin = (res / 60)

            while (res >= 3600) {
                h++
                res = res - 3600
            }
            if (res < 3600) {
                m = (res / 60) / 100
            }

            count = Math.round((h + m) * 100) / 100

            document.getElementById(80 + x).innerText = count
            document.getElementById(110 + x).innerText = resultMin

            countAllResults()
        }
    }
}


// set zero to 3 & 4 cells on init
function setZeroToCells() {
    for (let x = 0; x < 25; x++) {
        document.getElementById(80 + x).innerText = 0
        document.getElementById(110 + x).innerText = 0
        countAllResults()
    }
}


// count summ of results and show it
function countAllResults() {
    let arrMinutes = []
    let counterHours = 0

    for (let i = 110; i <= 134; i++) {
        arrMinutes.push(document.getElementById(i).innerText)
    }

    let summOfMinutes = arrMinutes.reduce((total, el) => {
        return total + +el
    }, 0).toFixed()

    let summOfHours = summOfMinutes

    while (summOfHours >= 60) {
        counterHours++
        summOfHours = summOfHours - 60
    }

    if (summOfHours < 10) {
        summOfHours = '0' + summOfHours
    }

    let totalHours = (counterHours + '.' + summOfHours)
    document.getElementById('itog').innerText = totalHours
    document.getElementById('itogMin').innerText = summOfMinutes

    // show results on side
    document.getElementById("messageArea").innerText = "Hrs. : " + totalHours
    document.getElementById("messageAreaMin").innerText = "Min. : " + summOfMinutes
}


// show tooltip
document.onmouseover = function (e) {
    let target = e.target

    let tooltip = target.getAttribute('data-tooltip')
    if (!tooltip) return

    let tooltipElem = document.createElement('div')
    tooltipElem.className = 'tooltip'
    tooltipElem.innerText = tooltip
    document.body.appendChild(tooltipElem)

    let coords = target.getBoundingClientRect()

    // dont cross left border of window
    let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2
    if (left < 0) left = 0

    // dont cross top border of window
    let top = coords.top - tooltipElem.offsetHeight - 5
    if (top < 0) {
        top = coords.top + target.offsetHeight + 5
    }

    tooltipElem.style.left = left + 'px'
    tooltipElem.style.top = top + 'px'

    showingTooltip = tooltipElem
}

document.onmouseout = function () {
    if (showingTooltip) {
        document.body.removeChild(showingTooltip)
        showingTooltip = null
    }
}





//todo features for integrate
// save settings of interface
// change language
// save results
// make enter in first two cell only 24 hours, than need to make cases like 23.59 - 1.00 = 1.01, in third cell inputs free


//! Bugs
