window.onload = init;


var firstColumnPosition = 0;
var secondColumnPosition = 50;
var thirdColumnPosition = 80;
var c = 80;
var count = 0;
var result = 0;
var resultMin = 0;
var showingTooltip;
var place = 70;


// events on clicks
function init() {
    setZero();
    countAllResults();
};


// add eventListeners
document.getElementById("fire").addEventListener("click", zapusk)
document.getElementById("fire1").addEventListener("click", zapusk1)
document.getElementById("fire2").addEventListener("click", zapusk2)

document.getElementById("formOnBotOrTop").addEventListener("click", moveFormsBotOrTop)
document.querySelector(".reset").addEventListener("click", resetCells)
document.querySelector(".clock__switch").addEventListener("click", clockSwith)

// bind onEnterPress on inputs fields 
document.getElementById("timeInput").addEventListener("keypress", onEnterPress)
document.getElementById("timeInput1").addEventListener("keypress", onEnterPress)
document.getElementById("timeInput2").addEventListener("keypress", onEnterPress)


// Clock
let intervalID = setInterval(getTime, 1000);

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

function clockSwith() {
    let clock = document.querySelector('.clock');
    clock.classList.toggle('circle')
}


// move input forms to bottom or to top 
function moveFormsBotOrTop() {
    document.querySelector('.handlers').classList.toggle("reverseColumn")
    document.querySelector(".forms").classList.toggle("formsMargins")
    document.querySelector(".messageArea").classList.toggle("messageMarginOnBottom")

};


// reset cells
function resetCells() {
    firstColumnPosition = 0
    secondColumnPosition = 50
    thirdColumnPosition = 80
    for (let x = 0; x < 25; x++) {
        document.getElementById(0 + x).innerText = "";
        document.getElementById(50 + x).innerText = "";
        countAllResults();
    }
    setZero()
}


// enter button = click
function onEnterPress(e) {
    let buttons = document.querySelectorAll(".inputButton");
    console.log(e.target.id)
    let ind = (e.target.id).slice(9)

    if (ind == 0) {
        ind = 0
    }
    if (e.keyCode === 13) {
        e.preventDefault();
        buttons[ind].click();
        return false;
    }
};


// check valid input
function IsValid(n) {
    if (n.length > 5 || !(!isNaN(parseFloat(n)) && isFinite(n))) {
        alert("Input invalid or too long. Valid - 22.10 , max. length - 5 symbols");
        return false
    } else {
        return true;
    }
};


// on click events
function zapusk() {
    var tap = document.getElementById("timeInput");
    var input = tap.value;
    if (IsValid(input)) {
        if (input < 0) {
            input = input * (-1);
        };
        var countCeloe = parseInt(input);
        var countDrobnoe = Math.round((input - countCeloe) * 100) / 100;
        while (Math.round(countDrobnoe * 100) / 100 >= 0.60) {
            countCeloe++;
            countDrobnoe = Math.round((countDrobnoe - 0.60) * 100) / 100;
        }
        if (Math.round(countDrobnoe * 100) / 100 < 0.60) {
            input = (countCeloe + parseInt(countDrobnoe * 100) / 100).toFixed(2);
        };
        document.getElementById(firstColumnPosition).innerText = input;
        tap.value = "";
        countObj();
        firstColumnPosition++;
        thirdColumnPosition++;

        if (thirdColumnPosition - 80 > firstColumnPosition) {
            thirdColumnPosition = 80 + firstColumnPosition
        }

        countAllResults();
    }
    else {
        tap.value = "";
    }
};

function zapusk1() {
    var tap = document.getElementById("timeInput1");
    var input = tap.value;
    if (IsValid(input)) {
        if (input < 0) {
            input = input * (-1);
        };
        var countCeloe = parseInt(input);
        var countDrobnoe = Math.round((input - countCeloe) * 100) / 100;
        while (Math.round(countDrobnoe * 100) / 100 >= 0.60) {
            countCeloe++;
            countDrobnoe = Math.round((countDrobnoe - 0.60) * 100) / 100;
        }
        if (Math.round(countDrobnoe * 100) / 100 < 0.60) {
            input = (countCeloe + parseInt(countDrobnoe * 100) / 100).toFixed(2);
        };
        document.getElementById(secondColumnPosition).innerText = input;
        tap.value = "";
        countObj();
        secondColumnPosition++;
        thirdColumnPosition++

        if ((thirdColumnPosition - 80) > (secondColumnPosition - 50)) {
            thirdColumnPosition = 80 + (secondColumnPosition - 50)
        }

        countAllResults();
    }
    else {
        tap.value = "";
    }
};

function zapusk2() {
    var tap = document.getElementById("timeInput2");
    var input = tap.value;

    if (IsValid(input)) {

        if (input < 0) {
            input = input * (-1);
        };
        var countCeloe = parseInt(input);
        var countDrobnoe = Math.round((input - countCeloe) * 100) / 100;

        while (Math.round(countDrobnoe * 100) / 100 >= 0.60) {
            countCeloe++;
            countDrobnoe = Math.round((countDrobnoe - 0.60) * 100) / 100;
        }

        if (Math.round(countDrobnoe * 100) / 100 < 0.60) {
            input = (countCeloe + parseInt(countDrobnoe * 100) / 100).toFixed(2);
        }

        document.getElementById(thirdColumnPosition).innerText = input;
        var inputMin = Math.round(countCeloe * 60 + countDrobnoe * 100);
        document.getElementById(30 + thirdColumnPosition).innerText = inputMin;
        tap.value = "";
        firstColumnPosition++;
        secondColumnPosition++;
        thirdColumnPosition++;

        if (firstColumnPosition < (thirdColumnPosition - 80)) {
            firstColumnPosition = thirdColumnPosition - 80
        }

        if ((secondColumnPosition - 50) < (thirdColumnPosition - 80)) {
            secondColumnPosition = 50 + (thirdColumnPosition - 80)
        }

        countAllResults();
    } else {
        tap.value = "";
    }
};


// count logic
function countObj() {
    for (let x = 0; x < 25; x++) {
        var first = document.getElementById(x).innerText;
        var second = document.getElementById(50 + x).innerText;
        var third = document.getElementById(80 + x).innerText;
        var fourth = document.getElementById(110 + x).innerText;
        if (third == "0") {
            var h = 0, m = 0;
            var hsFirst = parseInt(first) * 3600;
            var hsSecond = parseInt(second) * 3600;
            var msFirst = (Math.round((first - parseInt(first)) * 100)) * 60;
            var msSecond = (Math.round((second - parseInt(second)) * 100)) * 60;
            var res = (hsSecond - hsFirst) + (msSecond - msFirst);
            if (isNaN(res)) {
                res = 0;
            } else if (res < 0) {
                res = res * (-1);
            };
            var resultMin = (res / 60);
            while (res >= 3600) {
                h++;
                res = res - 3600;
            }
            if (res < 3600) {
                m = (res / 60) / 100;
            }
            count = Math.round((h + m) * 100) / 100;
            document.getElementById(80 + x).innerText = count;
            document.getElementById(110 + x).innerText = resultMin;
            countAllResults();
        }
    };
    if (third !== "0") {
        x++
    };
};

// set zero to 3/4 cell on init
function setZero() {
    for (let x = 0; x < 25; x++) {
        document.getElementById(80 + x).innerText = 0;
        document.getElementById(110 + x).innerText = 0;
        countAllResults();
    }
};

// count summ of results
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
        counterHours++;
        summOfHours = summOfHours - 60;
    }

    if (summOfHours < 10) {
        summOfHours = '0' + summOfHours
    }

    let totalHours = (counterHours + '.' + summOfHours)
    document.getElementById('itog').innerText = totalHours;
    document.getElementById('itogMin').innerText = summOfMinutes;

    view(totalHours, summOfMinutes);
}


// show results 
var view = function (totalHours, summOfMinutes) {
    var massageArea = document.getElementById("messageArea");
    massageArea.innerText = "Hrs. : " + totalHours;
    var massageAreaMin = document.getElementById("messageAreaMin");
    massageAreaMin.innerText = "Min. : " + summOfMinutes;

}


view();


// show tooltip
document.onmouseover = function (e) {
    var target = e.target;

    var tooltip = target.getAttribute('data-tooltip');
    if (!tooltip) return;

    var tooltipElem = document.createElement('div');
    tooltipElem.className = 'tooltip';
    tooltipElem.innerText = tooltip;
    document.body.appendChild(tooltipElem);

    var coords = target.getBoundingClientRect();

    // dont cross left border of window
    var left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
    if (left < 0) left = 0;

    // dont cross top border of window
    var top = coords.top - tooltipElem.offsetHeight - 5;
    if (top < 0) {
        top = coords.top + target.offsetHeight + 5;
    }

    tooltipElem.style.left = left + 'px';
    tooltipElem.style.top = top + 'px';

    showingTooltip = tooltipElem;
};

document.onmouseout = function () {
    if (showingTooltip) {
        document.body.removeChild(showingTooltip);
        showingTooltip = null;
    }
};




//! set background img on clock__switch

//todo Features for integrate
//  save results
//  change language


//! Bugs
