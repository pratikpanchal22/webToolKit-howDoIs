
$(document).ready(function () {
    if (!jQuery) {
        // jQuery is not loaded
        alert("Error jQuery is not loaded");
        return;
    }

    initializations();

});

function initializations() {

    staticPlot();
    realTimePlot();
    plot3();

    return;
}

function plot3() {

    tester3 = document.getElementById('plot3');
    var trace1 = {
        x: [],
        y: [],
        //mode: 'lines+markers',
        mode: 'lines+markers',
        name: 'Desk',
        connectgaps: true,
        line: { 
            shape: 'spline',
            color: 'rgb(200, 128, 191)',
            width: 1
        }
    };

    var trace2 = {
        x: [],
        y: [],
        //mode: 'lines+markers',
        mode: 'lines+markers',
        name: 'Main Door',
        connectgaps: true,
        line: { 
            shape: 'spline',
            color: 'rgb(100, 200, 191)',
            width: 1
        }
    };

    var trace3 = {
        x: [],
        y: [],
        //mode: 'lines+markers',
        mode: 'lines+markers',
        name: 'Kitchen',
        connectgaps: true,
        line: { 
            shape: 'spline',
            color: 'rgb(170, 100, 55)',
            width: 1
        }
    };

    var data = [trace1, trace2, trace3];

    var selectorOptions = {
        buttons: [{
            step: 'minute',
            stepmode: 'backward',
            count: 1,
            label: '1 Minute'
        }, {
            step: 'minute',
            stepmode: 'backward',
            count: 2,
            label: '2 Minutes'
        },{
            step: 'minute',
            stepmode: 'backward',
            count: 5,
            label: '5 Minutes'
        }, {
            step: 'minute',
            stepmode: 'backward',
            count: 15,
            label: '15 Minutes'
        }, {
            step: 'hour',
            stepmode: 'backward',
            count: 1,
            label: '1 Hour'
        }, {
            step: 'hour',
            stepmode: 'backward',
            count: 12,
            label: '12 Hours'
        }, {
            step: 'day',
            stepmode: 'backward',
            count: 1,
            label: '1 Day'
        }, {
            step: 'day',
            stepmode: 'backward',
            count: 1,
            label: '7 Day'
        },{
            step: 'month',
            stepmode: 'backward',
            count: 1,
            label: '1m'
        }, {
            step: 'month',
            stepmode: 'backward',
            count: 6,
            label: '6m'
        }, {
            step: 'year',
            stepmode: 'todate',
            count: 1,
            label: 'YTD'
        }, {
            step: 'year',
            stepmode: 'backward',
            count: 1,
            label: '1y'
        }, {
            step: 'all',
        }],
    };

    var layout = {
        title: 'Real time plot with maximum x-axis points and time series on x axis',
        showlegend: true,
        legend: {
            "orientation" : "h"
        },
        xaxis: {
            rangeselector: selectorOptions,
            rangeslider: {}
        }
    };

    Plotly.newPlot(tester3, data, layout);

    setInterval(function () {

        d = getTimeStampedDataArray();
        console.log("********************************");
        for(var i=0; i<d.length; i++){
            console.log("Data: " + "id=" + i + " >>> x=" + d[i].x + " > y=" + d[i].y + " > id=" + d[i].id);
            Plotly.extendTraces(tester3,
                {
                    x: [[d[i].x]],
                    y: [[d[i].y]]
                },
                [d[i].id],
                100);
        }        
    }, 1000)
}

function getTimeStampedDataArray() {
    numberOfDataObjects = getRandomData(1, 3);
    var data = [];
    for(var i=0; i<numberOfDataObjects; i++){
        data.push(getTimeStampedDataObj());
    }
    return data;
}

function getTimeStampedDataObj(){
    data = {
        'id': getRandomData(0, 2),
        'x': new Date(),
        'y': getRandomData(15, 35)
    }
    return data;
}

function getRandomData(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function realTimePlot() {

    tester = document.getElementById('rtPlot');
    var trace1 = {
        y: [10, 15, 13, 17, 10, 15, 13, 17, 10, 15, 13, 17],
        //mode: 'lines+markers',
        mode: 'lines',
        name: 'Trace 1',
        line: { shape: 'spline' }
    };

    var trace2 = {
        y: [10, 15, 13, 17, 10, 15, 13, 17, 10, 15, 13, 17],
        //mode: 'lines+markers',
        mode: 'lines',
        name: 'Trace 2',
        line: { shape: 'spline' }
    };

    var trace3 = {
        y: [10, 15, 13, 17, 10, 15, 13, 17, 10, 15, 13, 17],
        //mode: 'lines+markers',
        mode: 'lines',
        name: 'Trace 3',
        line: { shape: 'spline' }
    };

    var data = [trace1, trace2, trace3];

    var layout = {
        title: 'Real time plot with maximum x-axis points'
    };

    Plotly.newPlot(tester, data, layout);

    setInterval(function () {
        Plotly.extendTraces(tester,
            { y: [[getRandomData(20,35)], [getRandomData(20,35)], [getRandomData(20,35)]] },
            [0, 1, 2],
            50);
    }, 500)
}

function staticPlot() {
    TESTER = document.getElementById('tester');

    var trace1 = {
        x: [1, 2, 3, 4],
        y: [10, 15, 13, 17],
        mode: 'lines+markers',
        name: 'East bedroom desk',
        line: { shape: 'spline' }
    };

    var trace2 = {
        x: [2, 3, 4, 5],
        y: [16, 5, 11, 9],
        mode: 'lines+markers',
        name: 'Main Door',
        line: { shape: 'spline' }
    };

    var trace3 = {
        x: [1, 2, 3, 4],
        y: [12, 9, 15, 12],
        mode: 'lines+markers',
        name: 'Kitchen',
        line: { shape: 'spline' }
    };

    var data = [trace1, trace2, trace3];

    var layout = {
        title: 'Temperature Data'
    };

    Plotly.newPlot(TESTER, data, layout);
}

function getData() {
    max = 35;
    min = 15;
    return Math.floor(Math.random() * (max - min + 1) + min);
}

