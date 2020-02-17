toggleBgColorCount = 0;
autoToggleBgColorCount = 0;

function autoBgFunction() {
    var now = new Date();
    var timeoutMs = 0;
    var dayModeTime =   (((06 * 60) + 30) * 60) * 1000;
    var nightModeTime = (((21 * 60) + 00) * 60) * 1000;

    var currentMs = (((((now.getHours() * 60) + now.getMinutes()) * 60) + now.getSeconds()) * 1000) + now.getMilliseconds();
    //var currentMs = ((now.getHours() * 60) + now.getMinutes());
    var deltaDmTrig = currentMs-dayModeTime;
    var deltaNmTrig = currentMs-nightModeTime;
    console.log("currentMs: " + currentMs + "  deltaDmTrig: " + deltaDmTrig + "  deltaNmTrig: " + deltaNmTrig);

    //if(now - dayModeTime <= 0 || now - nightModeTime > 0) {
    if(deltaDmTrig < 0 || deltaNmTrig > 0) {
        console.log("Night mode detected");
        // toggleBgColorCount needs to be even
        toggleBgColorCount = 0;

        if(currentMs > dayModeTime) {
        timeoutMs = 86400000 - currentMs + dayModeTime;
        }
        else {
        timeoutMs = dayModeTime - currentMs;
        }

        // Callback should turn on Day Mode
        autoToggleBgColorCount = 1;
        autoMode = "Day Mode";
    }
    else {
        console.log("Day mode detected");
        // toggleBgColorCount needs to be odd
        toggleBgColorCount = 1;

        timeoutMs = nightModeTime - currentMs;

        // Callback should turn on Night mode
        autoToggleBgColorCount = 0;
        autoMode = "Night Mode";
    }

    toggleBackgroundColor();

    console.log("Now: " + now);
    console.log("dayModeTime: " + dayModeTime);
    console.log("nightModeTime: " + nightModeTime);
    console.log("timeoutMs: " + timeoutMs);

    toHour = Math.trunc((timeoutMs/1000)/60/60);
    toMinute = Math.trunc(((timeoutMs/1000)/60)%60);
    toSeconds = Math.trunc((timeoutMs/1000)%60);
    console.log("Triggering next display change "+"for "+autoMode+ " in: " + toHour +":"+ toMinute +":"+ toSeconds);
    writeToIframe("Triggering next display change "+"for "+autoMode+ " in: " + toHour +" hour(s), "+ toMinute +" minute(s), and "+ toSeconds + " second(s)");

    setTimeout(function(){timeoutTriggered()}, timeoutMs);
}

function timeoutTriggered() {
    console.log("Time triggered");
    //toggleBgColorCount = autoToggleBgColorCount;
    //toggleBackgroundColor();

    // Set next call back
    autoBgFunction();
}

function performInitializations() {
    // connect to server
    // window.open("https://www.w3.org/", "myIframe");
    writeToIframe("Initializing ...");

    // Set background
    autoBgFunction();

    // Set Clock
    startTime();

    var slider60 = document.getElementById("myRange60");
    var output = document.getElementById("slider60Value");
    output.innerHTML = slider60.value + "%";
    slider60.oninput = function() {
        output.innerHTML = ((this.value/255)*100).toFixed(0) + "%";
        console.log(this.value);

        var xhr = new XMLHttpRequest();
        var request = "http://192.168.1.60/set?d=5&i=2930304&s=" + this.value;
        console.log(request);
        xhr.open('GET', request, false);
        xhr.send();
    }

}

function writeToIframe(message){
    var doc = document.getElementById('loggerIframe').contentWindow.document;
    
    //console.log(document.getElementById('loggerIframe').contentWindow.document.body.innerHTML);
    var currentContent = document.getElementById('loggerIframe').contentWindow.document.body.innerHTML;
    doc.open();
    doc.write(getCurrentMs() + ": " + message + "<br>" + currentContent);
    doc.close();
}

function getCurrentMs(){
    var now = new Date();
    return (((((now.getHours() * 60) + now.getMinutes()) * 60) + now.getSeconds()) * 1000) + now.getMilliseconds();
}

function toggleBackgroundColor() {
    //static int toggleBgColorCount = 0;
    var buttonColor, onButtonColor, offButtonColor;
    var bgColor;
    var buttonText;
    var textColor;

    // Night Mode Settings
    if(toggleBgColorCount++ % 2 == 0) {
        offButtonColor = 'gray';
        onButtonColor  = '#7f4600';
        buttonColor = 'darkred';
        bgColor = 'black';
        textColor = 'white';
        buttonText = "Change display to Day Mode";
        logMsg = "Display set to NIGHT Mode";
    }
    // Day Mode Settings
    else {
        offButtonColor = '#4885ed';
        onButtonColor  = '#EF6C00';
        buttonColor = 'dimgray';
        bgColor = 'white';
        textColor = 'black';
        buttonText = "Change display to Night Mode";
        logMsg = "Display set to DAY Mode";
    }

    document.getElementById('buttonA1').style.backgroundColor = offButtonColor;          
    document.getElementById('buttonA2').style.backgroundColor = onButtonColor;

    document.body.style.background = bgColor;
    document.getElementById('displayBgButton').style.backgroundColor = buttonColor;
    document.getElementById('displayBgButton').innerHTML = buttonText;

    document.getElementById('header1').innerText = "Dark Mode using js fundamentals";
    document.getElementById('header1').style.color = textColor;

    document.getElementById('timeDisplay').style.color = textColor;

    document.getElementById('componentDiv').innerText = "Components";
    document.getElementById('componentDiv').style.color = textColor;
    
    console.log(logMsg);

    writeToIframe(logMsg);
    document.getElementById('loggerIframe').contentWindow.document.body.style.color = textColor;
    
}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);

    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    var mo = month[today.getMonth()];

    var day = new Array();
    day[0] = "Sunday";
    day[1] = "Monday";
    day[2] = "Tuesday";
    day[3] = "Wednesday";
    day[4] = "Thursday";
    day[5] = "Friday";
    day[6] = "Saturday";
    var da = day[today.getDay()];


    document.getElementById('timeDisplay').innerHTML =
    da +", " + mo + " " + today.getDate() + ", " + h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}   