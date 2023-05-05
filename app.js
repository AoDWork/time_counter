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
    var fireButton = document.getElementById("fire");
    fireButton.onclick = zapusk;

    var fireButton1 = document.getElementById("fire1");
    fireButton1.onclick = zapusk1;

    var fireButton2 = document.getElementById("fire2");
    fireButton2.onclick = zapusk2;

    var zapuskButtDown = document.getElementById("zapuskButtDown");
    zapuskButtDown.onclick = onClickButtonDown;

    var zapuskButtUp = document.getElementById("zapuskButtUp");
    zapuskButtUp.onclick = onClickButtonUp;

    // bind onEnterPress on inputs fields 
    timeInput.onkeypress = onEnterPress;
    timeInput1.onkeypress = onEnterPress;
    timeInput2.onkeypress = onEnterPress;

    setZero();
    countAllResults();
};


// Clock
let intervalID = setInterval(getTime, 1000);

const addZero = (time) => {
    if (time < 10) {
        time = "0" + time
    }
    return time
}

function getTime() {
    const timeElement = document.querySelector('.time')

    let date = new Date
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()

    timeElement.innerText = addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds)
}


// Shift inputs forms to bottom
function onClickButtonDown() {
    document.querySelector('.handlers').classList.add("reverseColumn")
    document.querySelector(".forms").classList.add("formsMargins")
    document.querySelector(".messageArea").classList.add("messageMarginOnBottom")

};
function onClickButtonUp() {
    document.querySelector('.handlers').classList.remove("reverseColumn")
    document.querySelector(".forms").classList.remove("formsMargins")
    document.querySelector(".messageArea").classList.remove("messageMarginOnBottom")
};


// enter button = click
function onEnterPress(e) {
    let buttons = document.querySelectorAll(".inputButton");
    let ind = (e.target.id).slice(9)

    if (ind == 0) {
        ind = 0
    }
    if (e.keyCode === 13) {
        buttons[ind].click();
        return false;
    }
};


// check valid input
function IsValid(n) {
    if (n.length > 5 || !(!isNaN(parseFloat(n)) && isFinite(n))  ) {
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
            input = countCeloe + parseInt(countDrobnoe * 100) / 100;
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
            input = countCeloe + parseInt(countDrobnoe * 100) / 100;
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
            input = countCeloe + parseInt(countDrobnoe * 100) / 100;
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

// counter all results	
function countAllResults() {

    let c0 = document.getElementById(80).innerText;
    var c1 = document.getElementById(81).innerText;
    var c2 = document.getElementById(82).innerText;
    var c3 = document.getElementById(83).innerText;
    var c4 = document.getElementById(84).innerText;
    var c5 = document.getElementById(85).innerText;
    var c6 = document.getElementById(86).innerText;
    var c7 = document.getElementById(87).innerText;
    var c8 = document.getElementById(88).innerText;
    var c9 = document.getElementById(89).innerText;
    var c10 = document.getElementById(90).innerText;
    var c11 = document.getElementById(91).innerText;
    var c12 = document.getElementById(92).innerText;
    var c13 = document.getElementById(93).innerText;
    var c14 = document.getElementById(94).innerText;
    var c15 = document.getElementById(95).innerText;
    var c16 = document.getElementById(96).innerText;
    var c17 = document.getElementById(97).innerText;
    var c18 = document.getElementById(98).innerText;
    var c19 = document.getElementById(99).innerText;
    var c20 = document.getElementById(101).innerText;
    var c21 = document.getElementById(102).innerText;
    var c22 = document.getElementById(103).innerText;
    var c23 = document.getElementById(104).innerText;

    var h = 0, m = 0;
    var hs0 = parseInt(c0) * 3600;
    var hs1 = parseInt(c1) * 3600;
    var hs2 = parseInt(c2) * 3600;
    var hs3 = parseInt(c3) * 3600;
    var hs4 = parseInt(c4) * 3600;
    var hs5 = parseInt(c5) * 3600;
    var hs6 = parseInt(c6) * 3600;
    var hs7 = parseInt(c7) * 3600;
    var hs8 = parseInt(c8) * 3600;
    var hs9 = parseInt(c9) * 3600;
    var hs10 = parseInt(c10) * 3600;
    var hs11 = parseInt(c11) * 3600;
    var hs12 = parseInt(c12) * 3600;
    var hs13 = parseInt(c13) * 3600;
    var hs14 = parseInt(c14) * 3600;
    var hs15 = parseInt(c15) * 3600;
    var hs16 = parseInt(c16) * 3600;
    var hs17 = parseInt(c17) * 3600;
    var hs18 = parseInt(c18) * 3600;
    var hs19 = parseInt(c19) * 3600;
    var hs20 = parseInt(c20) * 3600;
    var hs21 = parseInt(c21) * 3600;
    var hs22 = parseInt(c22) * 3600;
    var hs23 = parseInt(c23) * 3600;

    var ms0 = (Math.round((c0 - parseInt(c0)) * 100)) * 60;
    var ms1 = (Math.round((c1 - parseInt(c1)) * 100)) * 60;
    var ms2 = (Math.round((c2 - parseInt(c2)) * 100)) * 60;
    var ms3 = (Math.round((c3 - parseInt(c3)) * 100)) * 60;
    var ms4 = (Math.round((c4 - parseInt(c4)) * 100)) * 60;
    var ms5 = (Math.round((c5 - parseInt(c5)) * 100)) * 60;
    var ms6 = (Math.round((c6 - parseInt(c6)) * 100)) * 60;
    var ms7 = (Math.round((c7 - parseInt(c7)) * 100)) * 60;
    var ms8 = (Math.round((c8 - parseInt(c8)) * 100)) * 60;
    var ms9 = (Math.round((c9 - parseInt(c9)) * 100)) * 60;
    var ms10 = (Math.round((c10 - parseInt(c10)) * 100)) * 60;
    var ms11 = (Math.round((c11 - parseInt(c11)) * 100)) * 60;
    var ms12 = (Math.round((c12 - parseInt(c12)) * 100)) * 60;
    var ms13 = (Math.round((c13 - parseInt(c13)) * 100)) * 60;
    var ms14 = (Math.round((c14 - parseInt(c14)) * 100)) * 60;
    var ms15 = (Math.round((c15 - parseInt(c15)) * 100)) * 60;
    var ms16 = (Math.round((c16 - parseInt(c16)) * 100)) * 60;
    var ms17 = (Math.round((c17 - parseInt(c17)) * 100)) * 60;
    var ms18 = (Math.round((c18 - parseInt(c18)) * 100)) * 60;
    var ms19 = (Math.round((c19 - parseInt(c19)) * 100)) * 60;
    var ms20 = (Math.round((c20 - parseInt(c20)) * 100)) * 60;
    var ms21 = (Math.round((c21 - parseInt(c21)) * 100)) * 60;
    var ms22 = (Math.round((c22 - parseInt(c22)) * 100)) * 60;
    var ms23 = (Math.round((c23 - parseInt(c23)) * 100)) * 60;

    var res = (hs0 + hs1 + hs2 + hs3 + hs4 + hs5 + hs6 + hs7 + hs8 + hs9 + hs10 + hs11 + hs12 + hs13 + hs14 + hs15 + hs16 + hs17 + hs18 + hs19 + hs20 + hs21 + hs22 + hs23) + (ms0 + ms1 + ms2 + ms3 + ms4 + ms5 + ms6 + ms7 + ms8 + ms9 + ms10 + ms11 + ms12 + ms13 + ms14 + ms15 + ms16 + ms17 + ms18 + ms19 + ms20 + ms21 + ms22 + ms23);

    resultMin = (res / 60);
    while (res >= 3600) {
        h++;
        res = res - 3600;
    }
    if (res < 3600) {
        m = (res / 60) / 100;
    }
    result = Math.round((h + m) * 100) / 100;
    document.getElementById('itog').innerText = result;
    document.getElementById('itogMin').innerText = resultMin;
    view();
};

// view results 
var view = function () {
    var massageArea = document.getElementById("messageArea");
    massageArea.innerText = "Hours : " + result;
    var massageAreaMin = document.getElementById("messageAreaMin");
    massageAreaMin.innerText = "Min. : " + resultMin;

}

view();

//Показ подсказки
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

document.onmouseout = function (e) {

    if (showingTooltip) {
        document.body.removeChild(showingTooltip);
        showingTooltip = null;
    }

};

const cell = (e) => {

}


// Features for integrate
//  reset button
//  clock - circle
//  change language
//  save results
//  pick cell for input by mouse

// Bugs
