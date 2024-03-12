/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 24331.0, "series": [{"data": [[0.0, 1.0], [100.0, 9.0]], "isOverall": false, "label": "02-04-Credentials&ClickonLogin-304", "isController": false}, {"data": [[600.0, 1.0], [100.0, 9.0]], "isOverall": false, "label": "01-01-EnterLandingURL", "isController": true}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "02-04-Credentials&ClickonLogin-305", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "07-07-ClickonAddtoCart", "isController": true}, {"data": [[0.0, 9.0]], "isOverall": false, "label": "07-11-ClickonSignOut-312-1", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "07-03-ClickonSignI-303", "isController": false}, {"data": [[0.0, 2.0], [100.0, 7.0]], "isOverall": false, "label": "07-11-ClickonSignOut-312-0", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "01-05-ClickFish-306", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "03-05-ClickReptiles", "isController": true}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "01-02-ClickonENtertheStore-302", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "02-07-ClickonAddtoCart", "isController": true}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "01-07-ClickonAddtoCart-308", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "01-03-ClickonSignI-303", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "03-06-ClickonProduct-307", "isController": false}, {"data": [[0.0, 1.0], [100.0, 4.0]], "isOverall": false, "label": "06-11-ClickonSignOut", "isController": true}, {"data": [[0.0, 19.0], [200.0, 1.0]], "isOverall": false, "label": "07-02-ClickonENtertheStore", "isController": true}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "01-09-PaymentDetails&ClickonContinue", "isController": true}, {"data": [[0.0, 5451.0], [600.0, 9.0], [700.0, 1.0], [200.0, 534.0], [800.0, 1.0], [3200.0, 1.0], [900.0, 2.0], [246000.0, 2.0], [245900.0, 2.0], [246300.0, 14.0], [246400.0, 2.0], [1100.0, 90.0], [300.0, 42.0], [1200.0, 13.0], [100.0, 24331.0], [400.0, 79.0], [500.0, 53.0]], "isOverall": false, "label": "08-01-Search API", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "06-02-ClickonENtertheStore-302", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "01-04-Credentials&ClickonLogin", "isController": true}, {"data": [[600.0, 1.0], [100.0, 9.0]], "isOverall": false, "label": "02-01-EnterLandingURL-301", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "02-03-ClickonSignI-303", "isController": false}, {"data": [[0.0, 1.0], [600.0, 1.0], [100.0, 17.0], [200.0, 1.0]], "isOverall": false, "label": "07-01-EnterLandingURL", "isController": true}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "06-11-ClickonSignOut-313", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "06-11-ClickonSignOut-312", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "07-11-ClickonSignOut-313", "isController": false}, {"data": [[0.0, 1.0], [100.0, 7.0], [200.0, 2.0]], "isOverall": false, "label": "07-11-ClickonSignOut", "isController": true}, {"data": [[0.0, 1.0], [100.0, 9.0]], "isOverall": false, "label": "07-11-ClickonSignOut-312", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "02-08-EnterQuantity&ClickonProceedtoCheckout", "isController": true}, {"data": [[600.0, 1.0], [100.0, 9.0]], "isOverall": false, "label": "06-01-EnterLandingURL-301", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "07-07-ClickonAddtoCart-308", "isController": false}, {"data": [[600.0, 1.0], [100.0, 4.0]], "isOverall": false, "label": "03-01-EnterLandingURL", "isController": true}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "01-08-EnterQuantity&ClickonProceedtoCheckout", "isController": true}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "01-05-ClickFish", "isController": true}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "03-06-ClickonProduct", "isController": true}, {"data": [[0.0, 19.0], [200.0, 1.0]], "isOverall": false, "label": "07-02-ClickonENtertheStore-302", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "03-07-ClickonAddtoCart", "isController": true}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "02-02-ClickonENtertheStore", "isController": true}, {"data": [[100.0, 5.0]], "isOverall": false, "label": "06-04-Credentials&ClickonLogin", "isController": true}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "06-04-Credentials&ClickonLogin-305", "isController": false}, {"data": [[100.0, 5.0]], "isOverall": false, "label": "06-04-Credentials&ClickonLogin-304", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "01-08-EnterQuantity&ClickonProceedtoCheckout-309", "isController": false}, {"data": [[600.0, 1.0], [100.0, 4.0]], "isOverall": false, "label": "03-01-EnterLandingURL-301", "isController": false}, {"data": [[100.0, 5.0]], "isOverall": false, "label": "03-04-Credentials&ClickonLogin", "isController": true}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "07-06-ClickonProduct-307", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "06-11-ClickonSignOut-312-1", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "01-03-ClickonSignI", "isController": true}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "06-11-ClickonSignOut-312-0", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "07-03-ClickonSignI", "isController": true}, {"data": [[100.0, 5.0]], "isOverall": false, "label": "03-04-Credentials&ClickonLogin-304", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "03-04-Credentials&ClickonLogin-305", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "02-05-ClickDogs", "isController": true}, {"data": [[0.0, 1.0], [600.0, 1.0], [100.0, 17.0], [200.0, 1.0]], "isOverall": false, "label": "07-01-EnterLandingURL-301", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "02-09-PaymentDetails&ClickonContinue", "isController": true}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "03-03-ClickonSignI-303", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "02-06-ClickonProduct", "isController": true}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "07-05-ClickReptiles-306", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "07-06-ClickonProduct", "isController": true}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "06-03-ClickonSignI", "isController": true}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "03-03-ClickonSignI", "isController": true}, {"data": [[600.0, 1.0], [100.0, 9.0]], "isOverall": false, "label": "06-01-EnterLandingURL", "isController": true}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "07-04-Credentials&ClickonLogin-305", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "07-04-Credentials&ClickonLogin-304", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "07-05-ClickReptiles", "isController": true}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "01-06-ClickonProduct", "isController": true}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "02-02-ClickonENtertheStore-302", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "03-02-ClickonENtertheStore", "isController": true}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "02-07-ClickonAddtoCart-308", "isController": false}, {"data": [[600.0, 1.0], [100.0, 9.0]], "isOverall": false, "label": "02-01-EnterLandingURL", "isController": true}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "03-05-ClickReptiles-306", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "06-02-ClickonENtertheStore", "isController": true}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "02-04-Credentials&ClickonLogin", "isController": true}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "02-03-ClickonSignI", "isController": true}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "03-02-ClickonENtertheStore-302", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "02-05-ClickDogs-306", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "02-08-EnterQuantity&ClickonProceedtoCheckout-309", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "01-04-Credentials&ClickonLogin-305", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "06-03-ClickonSignI-303", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "01-06-ClickonProduct-307", "isController": false}, {"data": [[0.0, 1.0], [100.0, 9.0]], "isOverall": false, "label": "01-04-Credentials&ClickonLogin-304", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "01-07-ClickonAddtoCart", "isController": true}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "01-02-ClickonENtertheStore", "isController": true}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "07-04-Credentials&ClickonLogin", "isController": true}, {"data": [[600.0, 1.0], [100.0, 9.0]], "isOverall": false, "label": "01-01-EnterLandingURL-301", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "02-06-ClickonProduct-307", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 246400.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 5.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 25443.0, "series": [{"data": [[0.0, 25443.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 174.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 5.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 5408.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.7102502E12, "maxY": 20.0, "series": [{"data": [[1.71025038E12, 0.0], [1.71025032E12, 0.0]], "isOverall": false, "label": "", "isController": false}, {"data": [[1.71025026E12, 5.0], [1.7102502E12, 3.6666666666666665], [1.71025032E12, 4.333333333333334]], "isOverall": false, "label": "Scenario 03 Jpet Web Application", "isController": false}, {"data": [[1.71025026E12, 5.0], [1.7102502E12, 3.6666666666666665], [1.71025032E12, 3.4444444444444446]], "isOverall": false, "label": "Scenario 06 Jpet Web Application", "isController": false}, {"data": [[1.71025026E12, 10.0], [1.7102502E12, 7.0], [1.71025038E12, 5.5], [1.71025032E12, 9.5]], "isOverall": false, "label": "Scenario 02 Jpet Web Application", "isController": false}, {"data": [[1.71025062E12, 1.0], [1.71025026E12, 10.0], [1.7102502E12, 7.0], [1.71025038E12, 8.948051948051946], [1.71025032E12, 10.0]], "isOverall": false, "label": "Scenario 07 Jpet Web Application", "isController": false}, {"data": [[1.71025062E12, 12.549999999999999], [1.71025026E12, 20.0], [1.7102502E12, 18.027397260273954], [1.71025038E12, 20.0], [1.71025032E12, 20.0]], "isOverall": false, "label": "Scenario 08 Jpet API", "isController": false}, {"data": [[1.71025026E12, 10.0], [1.7102502E12, 7.0], [1.71025038E12, 5.5], [1.71025032E12, 9.5]], "isOverall": false, "label": "Scenario 01 Jpet Web Application", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71025062E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 0.0, "minX": 0.0, "maxY": 246395.66666666666, "series": [{"data": [[60.0, 117.30000000000001]], "isOverall": false, "label": "02-04-Credentials&ClickonLogin-304", "isController": false}, {"data": [[60.0, 117.30000000000001]], "isOverall": false, "label": "02-04-Credentials&ClickonLogin-304-Aggregated", "isController": false}, {"data": [[34.0, 188.0], [39.0, 116.0], [5.0, 627.0], [10.0, 108.0], [22.0, 106.0], [44.0, 123.0], [49.0, 131.0], [54.0, 161.0], [29.0, 128.0], [15.0, 106.0]], "isOverall": false, "label": "01-01-EnterLandingURL", "isController": true}, {"data": [[30.099999999999998, 179.4]], "isOverall": false, "label": "01-01-EnterLandingURL-Aggregated", "isController": true}, {"data": [[60.0, 39.0]], "isOverall": false, "label": "02-04-Credentials&ClickonLogin-305", "isController": false}, {"data": [[60.0, 39.0]], "isOverall": false, "label": "02-04-Credentials&ClickonLogin-305-Aggregated", "isController": false}, {"data": [[50.0, 39.6]], "isOverall": false, "label": "07-07-ClickonAddtoCart", "isController": true}, {"data": [[50.0, 39.6]], "isOverall": false, "label": "07-07-ClickonAddtoCart-Aggregated", "isController": true}, {"data": [[50.0, 33.888888888888886]], "isOverall": false, "label": "07-11-ClickonSignOut-312-1", "isController": false}, {"data": [[50.0, 33.888888888888886]], "isOverall": false, "label": "07-11-ClickonSignOut-312-1-Aggregated", "isController": false}, {"data": [[60.0, 36.599999999999994]], "isOverall": false, "label": "07-03-ClickonSignI-303", "isController": false}, {"data": [[60.0, 36.599999999999994]], "isOverall": false, "label": "07-03-ClickonSignI-303-Aggregated", "isController": false}, {"data": [[50.0, 117.77777777777777]], "isOverall": false, "label": "07-11-ClickonSignOut-312-0", "isController": false}, {"data": [[50.0, 117.77777777777777]], "isOverall": false, "label": "07-11-ClickonSignOut-312-0-Aggregated", "isController": false}, {"data": [[55.0, 33.6], [57.0, 40.0], [56.0, 37.0], [58.0, 37.0], [60.0, 38.5]], "isOverall": false, "label": "01-05-ClickFish-306", "isController": false}, {"data": [[56.60000000000001, 35.9]], "isOverall": false, "label": "01-05-ClickFish-306-Aggregated", "isController": false}, {"data": [[57.0, 33.0], [56.0, 41.0], [59.0, 41.0], [60.0, 40.0]], "isOverall": false, "label": "03-05-ClickReptiles", "isController": true}, {"data": [[58.4, 39.0]], "isOverall": false, "label": "03-05-ClickReptiles-Aggregated", "isController": true}, {"data": [[60.0, 40.5]], "isOverall": false, "label": "01-02-ClickonENtertheStore-302", "isController": false}, {"data": [[60.0, 40.5]], "isOverall": false, "label": "01-02-ClickonENtertheStore-302-Aggregated", "isController": false}, {"data": [[50.0, 37.099999999999994]], "isOverall": false, "label": "02-07-ClickonAddtoCart", "isController": true}, {"data": [[50.0, 37.099999999999994]], "isOverall": false, "label": "02-07-ClickonAddtoCart-Aggregated", "isController": true}, {"data": [[50.0, 36.3]], "isOverall": false, "label": "01-07-ClickonAddtoCart-308", "isController": false}, {"data": [[50.0, 36.3]], "isOverall": false, "label": "01-07-ClickonAddtoCart-308-Aggregated", "isController": false}, {"data": [[60.0, 35.99999999999999]], "isOverall": false, "label": "01-03-ClickonSignI-303", "isController": false}, {"data": [[60.0, 35.99999999999999]], "isOverall": false, "label": "01-03-ClickonSignI-303-Aggregated", "isController": false}, {"data": [[51.0, 38.0], [53.0, 36.0], [52.0, 37.0], [55.0, 34.0], [54.0, 34.0]], "isOverall": false, "label": "03-06-ClickonProduct-307", "isController": false}, {"data": [[53.0, 35.8]], "isOverall": false, "label": "03-06-ClickonProduct-307-Aggregated", "isController": false}, {"data": [[57.0, 117.0], [56.0, 109.0], [59.0, 99.0], [58.0, 118.0], [60.0, 121.0]], "isOverall": false, "label": "06-11-ClickonSignOut", "isController": true}, {"data": [[58.0, 112.8]], "isOverall": false, "label": "06-11-ClickonSignOut-Aggregated", "isController": true}, {"data": [[1.0, 298.0], [22.0, 44.0], [23.0, 30.0], [24.0, 32.0], [25.0, 39.0], [26.0, 34.0], [27.0, 34.0], [28.0, 81.0], [29.0, 39.0], [60.0, 40.199999999999996], [30.0, 38.0]], "isOverall": false, "label": "07-02-ClickonENtertheStore", "isController": true}, {"data": [[41.75000000000001, 53.54999999999998]], "isOverall": false, "label": "07-02-ClickonENtertheStore-Aggregated", "isController": true}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "01-09-PaymentDetails&ClickonContinue", "isController": true}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "01-09-PaymentDetails&ClickonContinue-Aggregated", "isController": true}, {"data": [[7.0, 246343.0], [8.0, 246358.33333333334], [9.0, 246343.0], [10.0, 246343.0], [11.0, 246346.0], [12.0, 246389.0], [14.0, 246395.66666666666], [15.0, 246388.0], [16.0, 110.0], [17.0, 246370.0], [18.0, 123059.0], [21.0, 7820.447916666666], [22.0, 149.827868852459], [23.0, 140.90751445086693], [24.0, 147.6923076923077], [25.0, 115.02185792349734], [26.0, 137.3049645390071], [27.0, 153.19658119658118], [28.0, 140.38547486033525], [29.0, 108.25641025641028], [30.0, 170.28824626865668], [31.0, 159.14285714285714], [32.0, 154.0504201680672], [33.0, 119.0], [34.0, 125.68181818181807], [35.0, 127.9047619047619], [36.0, 116.61842105263163], [38.0, 131.7105263157895], [39.0, 130.5285714285714], [40.0, 87.29054054054052], [41.0, 142.44444444444446], [43.0, 107.0], [42.0, 91.9689440993789], [44.0, 111.6036036036036], [45.0, 120.95454545454542], [46.0, 102.23834196891194], [47.0, 124.90476190476191], [48.0, 125.56818181818183], [49.0, 121.25352112676059], [50.0, 94.77567264573955], [51.0, 53.23822714681441], [53.0, 113.92737430167597], [52.0, 81.5316455696203], [54.0, 116.78761061946899], [55.0, 127.46712987707116], [56.0, 212.81118881118886], [57.0, 155.04705882352945], [58.0, 140.39766081871343], [59.0, 149.82178217821777], [60.0, 128.83210409128827]], "isOverall": false, "label": "08-01-Search API", "isController": false}, {"data": [[52.97116922976429, 279.7694191399755]], "isOverall": false, "label": "08-01-Search API-Aggregated", "isController": false}, {"data": [[60.0, 39.8]], "isOverall": false, "label": "06-02-ClickonENtertheStore-302", "isController": false}, {"data": [[60.0, 39.8]], "isOverall": false, "label": "06-02-ClickonENtertheStore-302-Aggregated", "isController": false}, {"data": [[60.0, 155.1]], "isOverall": false, "label": "01-04-Credentials&ClickonLogin", "isController": true}, {"data": [[60.0, 155.1]], "isOverall": false, "label": "01-04-Credentials&ClickonLogin-Aggregated", "isController": true}, {"data": [[34.0, 157.0], [39.0, 127.0], [5.0, 627.0], [10.0, 110.0], [22.0, 110.0], [44.0, 117.0], [49.0, 132.0], [54.0, 164.0], [29.0, 120.0], [15.0, 111.0]], "isOverall": false, "label": "02-01-EnterLandingURL-301", "isController": false}, {"data": [[30.099999999999998, 177.5]], "isOverall": false, "label": "02-01-EnterLandingURL-301-Aggregated", "isController": false}, {"data": [[60.0, 38.300000000000004]], "isOverall": false, "label": "02-03-ClickonSignI-303", "isController": false}, {"data": [[60.0, 38.300000000000004]], "isOverall": false, "label": "02-03-ClickonSignI-303-Aggregated", "isController": false}, {"data": [[34.0, 151.0], [39.0, 116.0], [5.0, 623.0], [10.0, 109.0], [22.0, 110.0], [44.0, 131.0], [49.0, 124.0], [50.0, 136.29999999999998], [54.0, 134.0], [29.0, 124.0], [15.0, 108.0]], "isOverall": false, "label": "07-01-EnterLandingURL", "isController": true}, {"data": [[40.050000000000004, 154.65]], "isOverall": false, "label": "07-01-EnterLandingURL-Aggregated", "isController": true}, {"data": [[57.0, 32.0], [56.0, 36.0], [59.0, 32.0], [58.0, 37.0], [60.0, 36.0]], "isOverall": false, "label": "06-11-ClickonSignOut-313", "isController": false}, {"data": [[58.0, 34.6]], "isOverall": false, "label": "06-11-ClickonSignOut-313-Aggregated", "isController": false}, {"data": [[57.0, 85.0], [56.0, 73.0], [59.0, 67.0], [58.0, 81.0], [60.0, 85.0]], "isOverall": false, "label": "06-11-ClickonSignOut-312", "isController": false}, {"data": [[58.0, 78.2]], "isOverall": false, "label": "06-11-ClickonSignOut-312-Aggregated", "isController": false}, {"data": [[50.0, 33.3]], "isOverall": false, "label": "07-11-ClickonSignOut-313", "isController": false}, {"data": [[50.0, 33.3]], "isOverall": false, "label": "07-11-ClickonSignOut-313-Aggregated", "isController": false}, {"data": [[50.0, 171.40000000000003]], "isOverall": false, "label": "07-11-ClickonSignOut", "isController": true}, {"data": [[50.0, 171.40000000000003]], "isOverall": false, "label": "07-11-ClickonSignOut-Aggregated", "isController": true}, {"data": [[50.0, 138.1]], "isOverall": false, "label": "07-11-ClickonSignOut-312", "isController": false}, {"data": [[50.0, 138.1]], "isOverall": false, "label": "07-11-ClickonSignOut-312-Aggregated", "isController": false}, {"data": [[33.0, 127.0], [32.0, 175.0], [35.0, 131.0], [39.0, 121.0], [38.0, 106.0], [42.0, 105.0], [45.0, 115.0], [44.0, 118.0], [47.0, 115.0], [50.0, 107.0]], "isOverall": false, "label": "02-08-EnterQuantity&ClickonProceedtoCheckout", "isController": true}, {"data": [[40.5, 122.0]], "isOverall": false, "label": "02-08-EnterQuantity&ClickonProceedtoCheckout-Aggregated", "isController": true}, {"data": [[5.0, 627.0], [10.0, 119.0], [22.0, 102.0], [57.0, 150.0], [56.0, 119.0], [29.0, 125.0], [59.0, 142.0], [58.0, 131.0], [15.0, 101.0], [60.0, 135.0]], "isOverall": false, "label": "06-01-EnterLandingURL-301", "isController": false}, {"data": [[37.1, 175.10000000000002]], "isOverall": false, "label": "06-01-EnterLandingURL-301-Aggregated", "isController": false}, {"data": [[50.0, 39.6]], "isOverall": false, "label": "07-07-ClickonAddtoCart-308", "isController": false}, {"data": [[50.0, 39.6]], "isOverall": false, "label": "07-07-ClickonAddtoCart-308-Aggregated", "isController": false}, {"data": [[5.0, 627.0], [10.0, 115.0], [22.0, 107.0], [29.0, 105.0], [15.0, 111.0]], "isOverall": false, "label": "03-01-EnterLandingURL", "isController": true}, {"data": [[16.2, 213.0]], "isOverall": false, "label": "03-01-EnterLandingURL-Aggregated", "isController": true}, {"data": [[34.0, 139.0], [36.0, 106.0], [38.0, 120.0], [41.0, 111.0], [40.0, 113.0], [43.0, 125.0], [46.0, 109.0], [49.0, 114.0], [48.0, 104.0], [31.0, 156.0]], "isOverall": false, "label": "01-08-EnterQuantity&ClickonProceedtoCheckout", "isController": true}, {"data": [[40.599999999999994, 119.7]], "isOverall": false, "label": "01-08-EnterQuantity&ClickonProceedtoCheckout-Aggregated", "isController": true}, {"data": [[55.0, 33.6], [57.0, 40.0], [56.0, 37.0], [58.0, 37.0], [60.0, 38.5]], "isOverall": false, "label": "01-05-ClickFish", "isController": true}, {"data": [[56.60000000000001, 35.9]], "isOverall": false, "label": "01-05-ClickFish-Aggregated", "isController": true}, {"data": [[51.0, 38.0], [53.0, 36.0], [52.0, 37.0], [55.0, 34.0], [54.0, 34.0]], "isOverall": false, "label": "03-06-ClickonProduct", "isController": true}, {"data": [[53.0, 35.8]], "isOverall": false, "label": "03-06-ClickonProduct-Aggregated", "isController": true}, {"data": [[1.0, 298.0], [22.0, 44.0], [23.0, 30.0], [24.0, 32.0], [25.0, 39.0], [26.0, 34.0], [27.0, 34.0], [28.0, 81.0], [29.0, 39.0], [60.0, 40.199999999999996], [30.0, 38.0]], "isOverall": false, "label": "07-02-ClickonENtertheStore-302", "isController": false}, {"data": [[41.75000000000001, 53.54999999999998]], "isOverall": false, "label": "07-02-ClickonENtertheStore-302-Aggregated", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "03-07-ClickonAddtoCart", "isController": true}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "03-07-ClickonAddtoCart-Aggregated", "isController": true}, {"data": [[60.0, 38.4]], "isOverall": false, "label": "02-02-ClickonENtertheStore", "isController": true}, {"data": [[60.0, 38.4]], "isOverall": false, "label": "02-02-ClickonENtertheStore-Aggregated", "isController": true}, {"data": [[60.0, 165.6]], "isOverall": false, "label": "06-04-Credentials&ClickonLogin", "isController": true}, {"data": [[60.0, 165.6]], "isOverall": false, "label": "06-04-Credentials&ClickonLogin-Aggregated", "isController": true}, {"data": [[60.0, 36.4]], "isOverall": false, "label": "06-04-Credentials&ClickonLogin-305", "isController": false}, {"data": [[60.0, 36.4]], "isOverall": false, "label": "06-04-Credentials&ClickonLogin-305-Aggregated", "isController": false}, {"data": [[60.0, 129.2]], "isOverall": false, "label": "06-04-Credentials&ClickonLogin-304", "isController": false}, {"data": [[60.0, 129.2]], "isOverall": false, "label": "06-04-Credentials&ClickonLogin-304-Aggregated", "isController": false}, {"data": [[34.0, 139.0], [36.0, 106.0], [38.0, 120.0], [41.0, 111.0], [40.0, 113.0], [43.0, 125.0], [46.0, 109.0], [49.0, 114.0], [48.0, 104.0], [31.0, 156.0]], "isOverall": false, "label": "01-08-EnterQuantity&ClickonProceedtoCheckout-309", "isController": false}, {"data": [[40.599999999999994, 119.7]], "isOverall": false, "label": "01-08-EnterQuantity&ClickonProceedtoCheckout-309-Aggregated", "isController": false}, {"data": [[5.0, 627.0], [10.0, 115.0], [22.0, 107.0], [29.0, 105.0], [15.0, 111.0]], "isOverall": false, "label": "03-01-EnterLandingURL-301", "isController": false}, {"data": [[16.2, 213.0]], "isOverall": false, "label": "03-01-EnterLandingURL-301-Aggregated", "isController": false}, {"data": [[60.0, 159.2]], "isOverall": false, "label": "03-04-Credentials&ClickonLogin", "isController": true}, {"data": [[60.0, 159.2]], "isOverall": false, "label": "03-04-Credentials&ClickonLogin-Aggregated", "isController": true}, {"data": [[51.0, 35.0], [50.0, 40.4], [53.0, 40.0], [52.0, 37.0], [55.0, 35.0], [54.0, 33.0]], "isOverall": false, "label": "07-06-ClickonProduct-307", "isController": false}, {"data": [[51.5, 38.199999999999996]], "isOverall": false, "label": "07-06-ClickonProduct-307-Aggregated", "isController": false}, {"data": [[57.0, 29.0], [56.0, 41.0], [59.0, 33.0], [58.0, 38.0], [60.0, 45.0]], "isOverall": false, "label": "06-11-ClickonSignOut-312-1", "isController": false}, {"data": [[58.0, 37.2]], "isOverall": false, "label": "06-11-ClickonSignOut-312-1-Aggregated", "isController": false}, {"data": [[60.0, 35.99999999999999]], "isOverall": false, "label": "01-03-ClickonSignI", "isController": true}, {"data": [[60.0, 35.99999999999999]], "isOverall": false, "label": "01-03-ClickonSignI-Aggregated", "isController": true}, {"data": [[57.0, 56.0], [56.0, 32.0], [59.0, 34.0], [58.0, 42.0], [60.0, 37.0]], "isOverall": false, "label": "06-11-ClickonSignOut-312-0", "isController": false}, {"data": [[58.0, 40.2]], "isOverall": false, "label": "06-11-ClickonSignOut-312-0-Aggregated", "isController": false}, {"data": [[0.0, 0.0], [60.0, 36.599999999999994]], "isOverall": false, "label": "07-03-ClickonSignI", "isController": true}, {"data": [[31.578947368421055, 19.26315789473684]], "isOverall": false, "label": "07-03-ClickonSignI-Aggregated", "isController": true}, {"data": [[60.0, 122.8]], "isOverall": false, "label": "03-04-Credentials&ClickonLogin-304", "isController": false}, {"data": [[60.0, 122.8]], "isOverall": false, "label": "03-04-Credentials&ClickonLogin-304-Aggregated", "isController": false}, {"data": [[60.0, 36.4]], "isOverall": false, "label": "03-04-Credentials&ClickonLogin-305", "isController": false}, {"data": [[60.0, 36.4]], "isOverall": false, "label": "03-04-Credentials&ClickonLogin-305-Aggregated", "isController": false}, {"data": [[55.0, 37.8], [57.0, 48.0], [56.0, 38.0], [58.0, 49.0], [60.0, 35.5]], "isOverall": false, "label": "02-05-ClickDogs", "isController": true}, {"data": [[56.60000000000001, 39.5]], "isOverall": false, "label": "02-05-ClickDogs-Aggregated", "isController": true}, {"data": [[34.0, 151.0], [39.0, 116.0], [5.0, 623.0], [10.0, 108.0], [22.0, 110.0], [44.0, 131.0], [49.0, 124.0], [50.0, 136.29999999999998], [54.0, 134.0], [29.0, 124.0], [15.0, 108.0]], "isOverall": false, "label": "07-01-EnterLandingURL-301", "isController": false}, {"data": [[40.050000000000004, 154.60000000000002]], "isOverall": false, "label": "07-01-EnterLandingURL-301-Aggregated", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "02-09-PaymentDetails&ClickonContinue", "isController": true}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "02-09-PaymentDetails&ClickonContinue-Aggregated", "isController": true}, {"data": [[60.0, 40.2]], "isOverall": false, "label": "03-03-ClickonSignI-303", "isController": false}, {"data": [[60.0, 40.2]], "isOverall": false, "label": "03-03-ClickonSignI-303-Aggregated", "isController": false}, {"data": [[51.0, 33.0], [50.0, 35.6], [53.0, 34.0], [52.0, 38.0], [55.0, 33.0], [54.0, 33.0]], "isOverall": false, "label": "02-06-ClickonProduct", "isController": true}, {"data": [[51.5, 34.900000000000006]], "isOverall": false, "label": "02-06-ClickonProduct-Aggregated", "isController": true}, {"data": [[55.0, 38.0], [57.0, 42.0], [58.0, 40.0], [60.0, 40.5]], "isOverall": false, "label": "07-05-ClickReptiles-306", "isController": false}, {"data": [[56.699999999999996, 39.5]], "isOverall": false, "label": "07-05-ClickReptiles-306-Aggregated", "isController": false}, {"data": [[51.0, 35.0], [50.0, 40.4], [53.0, 40.0], [52.0, 37.0], [55.0, 35.0], [54.0, 33.0]], "isOverall": false, "label": "07-06-ClickonProduct", "isController": true}, {"data": [[51.5, 38.199999999999996]], "isOverall": false, "label": "07-06-ClickonProduct-Aggregated", "isController": true}, {"data": [[60.0, 38.6]], "isOverall": false, "label": "06-03-ClickonSignI", "isController": true}, {"data": [[60.0, 38.6]], "isOverall": false, "label": "06-03-ClickonSignI-Aggregated", "isController": true}, {"data": [[60.0, 40.2]], "isOverall": false, "label": "03-03-ClickonSignI", "isController": true}, {"data": [[60.0, 40.2]], "isOverall": false, "label": "03-03-ClickonSignI-Aggregated", "isController": true}, {"data": [[5.0, 627.0], [10.0, 119.0], [22.0, 102.0], [57.0, 150.0], [56.0, 119.0], [29.0, 125.0], [59.0, 142.0], [58.0, 131.0], [15.0, 101.0], [60.0, 135.0]], "isOverall": false, "label": "06-01-EnterLandingURL", "isController": true}, {"data": [[37.1, 175.10000000000002]], "isOverall": false, "label": "06-01-EnterLandingURL-Aggregated", "isController": true}, {"data": [[60.0, 37.6]], "isOverall": false, "label": "07-04-Credentials&ClickonLogin-305", "isController": false}, {"data": [[60.0, 37.6]], "isOverall": false, "label": "07-04-Credentials&ClickonLogin-305-Aggregated", "isController": false}, {"data": [[60.0, 116.1]], "isOverall": false, "label": "07-04-Credentials&ClickonLogin-304", "isController": false}, {"data": [[60.0, 116.1]], "isOverall": false, "label": "07-04-Credentials&ClickonLogin-304-Aggregated", "isController": false}, {"data": [[55.0, 38.0], [57.0, 42.0], [58.0, 40.0], [60.0, 40.5]], "isOverall": false, "label": "07-05-ClickReptiles", "isController": true}, {"data": [[56.699999999999996, 39.5]], "isOverall": false, "label": "07-05-ClickReptiles-Aggregated", "isController": true}, {"data": [[51.0, 33.0], [50.0, 36.6], [53.0, 32.0], [52.0, 31.0], [55.0, 38.0], [54.0, 65.0]], "isOverall": false, "label": "01-06-ClickonProduct", "isController": true}, {"data": [[51.5, 38.19999999999999]], "isOverall": false, "label": "01-06-ClickonProduct-Aggregated", "isController": true}, {"data": [[60.0, 38.300000000000004]], "isOverall": false, "label": "02-02-ClickonENtertheStore-302", "isController": false}, {"data": [[60.0, 38.300000000000004]], "isOverall": false, "label": "02-02-ClickonENtertheStore-302-Aggregated", "isController": false}, {"data": [[60.0, 41.8]], "isOverall": false, "label": "03-02-ClickonENtertheStore", "isController": true}, {"data": [[60.0, 41.8]], "isOverall": false, "label": "03-02-ClickonENtertheStore-Aggregated", "isController": true}, {"data": [[50.0, 37.099999999999994]], "isOverall": false, "label": "02-07-ClickonAddtoCart-308", "isController": false}, {"data": [[50.0, 37.099999999999994]], "isOverall": false, "label": "02-07-ClickonAddtoCart-308-Aggregated", "isController": false}, {"data": [[34.0, 157.0], [39.0, 127.0], [5.0, 627.0], [10.0, 110.0], [22.0, 110.0], [44.0, 117.0], [49.0, 132.0], [54.0, 164.0], [29.0, 120.0], [15.0, 111.0]], "isOverall": false, "label": "02-01-EnterLandingURL", "isController": true}, {"data": [[30.099999999999998, 177.5]], "isOverall": false, "label": "02-01-EnterLandingURL-Aggregated", "isController": true}, {"data": [[57.0, 33.0], [56.0, 41.0], [59.0, 41.0], [60.0, 40.0]], "isOverall": false, "label": "03-05-ClickReptiles-306", "isController": false}, {"data": [[58.4, 39.0]], "isOverall": false, "label": "03-05-ClickReptiles-306-Aggregated", "isController": false}, {"data": [[0.0, 0.0], [60.0, 39.8]], "isOverall": false, "label": "06-02-ClickonENtertheStore", "isController": true}, {"data": [[30.000000000000004, 19.9]], "isOverall": false, "label": "06-02-ClickonENtertheStore-Aggregated", "isController": true}, {"data": [[60.0, 156.3]], "isOverall": false, "label": "02-04-Credentials&ClickonLogin", "isController": true}, {"data": [[60.0, 156.3]], "isOverall": false, "label": "02-04-Credentials&ClickonLogin-Aggregated", "isController": true}, {"data": [[60.0, 38.300000000000004]], "isOverall": false, "label": "02-03-ClickonSignI", "isController": true}, {"data": [[60.0, 38.300000000000004]], "isOverall": false, "label": "02-03-ClickonSignI-Aggregated", "isController": true}, {"data": [[60.0, 41.8]], "isOverall": false, "label": "03-02-ClickonENtertheStore-302", "isController": false}, {"data": [[60.0, 41.8]], "isOverall": false, "label": "03-02-ClickonENtertheStore-302-Aggregated", "isController": false}, {"data": [[55.0, 37.8], [57.0, 48.0], [56.0, 38.0], [58.0, 49.0], [60.0, 35.5]], "isOverall": false, "label": "02-05-ClickDogs-306", "isController": false}, {"data": [[56.60000000000001, 39.5]], "isOverall": false, "label": "02-05-ClickDogs-306-Aggregated", "isController": false}, {"data": [[33.0, 127.0], [32.0, 175.0], [35.0, 131.0], [39.0, 121.0], [38.0, 106.0], [42.0, 105.0], [45.0, 115.0], [44.0, 118.0], [47.0, 115.0], [50.0, 107.0]], "isOverall": false, "label": "02-08-EnterQuantity&ClickonProceedtoCheckout-309", "isController": false}, {"data": [[40.5, 122.0]], "isOverall": false, "label": "02-08-EnterQuantity&ClickonProceedtoCheckout-309-Aggregated", "isController": false}, {"data": [[60.0, 39.5]], "isOverall": false, "label": "01-04-Credentials&ClickonLogin-305", "isController": false}, {"data": [[60.0, 39.5]], "isOverall": false, "label": "01-04-Credentials&ClickonLogin-305-Aggregated", "isController": false}, {"data": [[60.0, 38.6]], "isOverall": false, "label": "06-03-ClickonSignI-303", "isController": false}, {"data": [[60.0, 38.6]], "isOverall": false, "label": "06-03-ClickonSignI-303-Aggregated", "isController": false}, {"data": [[51.0, 33.0], [50.0, 36.6], [53.0, 32.0], [52.0, 31.0], [55.0, 38.0], [54.0, 65.0]], "isOverall": false, "label": "01-06-ClickonProduct-307", "isController": false}, {"data": [[51.5, 38.19999999999999]], "isOverall": false, "label": "01-06-ClickonProduct-307-Aggregated", "isController": false}, {"data": [[60.0, 115.6]], "isOverall": false, "label": "01-04-Credentials&ClickonLogin-304", "isController": false}, {"data": [[60.0, 115.6]], "isOverall": false, "label": "01-04-Credentials&ClickonLogin-304-Aggregated", "isController": false}, {"data": [[50.0, 36.3]], "isOverall": false, "label": "01-07-ClickonAddtoCart", "isController": true}, {"data": [[50.0, 36.3]], "isOverall": false, "label": "01-07-ClickonAddtoCart-Aggregated", "isController": true}, {"data": [[60.0, 40.5]], "isOverall": false, "label": "01-02-ClickonENtertheStore", "isController": true}, {"data": [[60.0, 40.5]], "isOverall": false, "label": "01-02-ClickonENtertheStore-Aggregated", "isController": true}, {"data": [[60.0, 153.7]], "isOverall": false, "label": "07-04-Credentials&ClickonLogin", "isController": true}, {"data": [[60.0, 153.7]], "isOverall": false, "label": "07-04-Credentials&ClickonLogin-Aggregated", "isController": true}, {"data": [[34.0, 188.0], [39.0, 116.0], [5.0, 627.0], [10.0, 108.0], [22.0, 106.0], [44.0, 123.0], [49.0, 131.0], [54.0, 161.0], [29.0, 128.0], [15.0, 106.0]], "isOverall": false, "label": "01-01-EnterLandingURL-301", "isController": false}, {"data": [[30.099999999999998, 179.4]], "isOverall": false, "label": "01-01-EnterLandingURL-301-Aggregated", "isController": false}, {"data": [[51.0, 33.0], [50.0, 35.6], [53.0, 34.0], [52.0, 38.0], [55.0, 33.0], [54.0, 33.0]], "isOverall": false, "label": "02-06-ClickonProduct-307", "isController": false}, {"data": [[51.5, 34.900000000000006]], "isOverall": false, "label": "02-06-ClickonProduct-307-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 60.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 30.4, "minX": 1.7102502E12, "maxY": 615265.3, "series": [{"data": [[1.71025062E12, 1115.8333333333333], [1.71025026E12, 578590.0333333333], [1.7102502E12, 150041.43333333332], [1.71025038E12, 449761.75], [1.71025032E12, 615265.3]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.71025062E12, 30.4], [1.71025026E12, 49146.53333333333], [1.7102502E12, 14091.133333333333], [1.71025038E12, 35233.183333333334], [1.71025032E12, 38738.566666666666]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71025062E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.7102502E12, "maxY": 246293.95000000004, "series": [{"data": [[1.71025032E12, 117.30000000000001]], "isOverall": false, "label": "02-04-Credentials&ClickonLogin-304", "isController": false}, {"data": [[1.7102502E12, 179.4]], "isOverall": false, "label": "01-01-EnterLandingURL", "isController": true}, {"data": [[1.71025032E12, 39.0]], "isOverall": false, "label": "02-04-Credentials&ClickonLogin-305", "isController": false}, {"data": [[1.71025032E12, 39.6]], "isOverall": false, "label": "07-07-ClickonAddtoCart", "isController": true}, {"data": [[1.71025038E12, 33.888888888888886]], "isOverall": false, "label": "07-11-ClickonSignOut-312-1", "isController": false}, {"data": [[1.71025026E12, 36.599999999999994]], "isOverall": false, "label": "07-03-ClickonSignI-303", "isController": false}, {"data": [[1.71025038E12, 117.77777777777777]], "isOverall": false, "label": "07-11-ClickonSignOut-312-0", "isController": false}, {"data": [[1.71025032E12, 35.9]], "isOverall": false, "label": "01-05-ClickFish-306", "isController": false}, {"data": [[1.71025032E12, 39.0]], "isOverall": false, "label": "03-05-ClickReptiles", "isController": true}, {"data": [[1.71025026E12, 40.5]], "isOverall": false, "label": "01-02-ClickonENtertheStore-302", "isController": false}, {"data": [[1.71025032E12, 37.099999999999994]], "isOverall": false, "label": "02-07-ClickonAddtoCart", "isController": true}, {"data": [[1.71025032E12, 36.3]], "isOverall": false, "label": "01-07-ClickonAddtoCart-308", "isController": false}, {"data": [[1.71025026E12, 35.99999999999999]], "isOverall": false, "label": "01-03-ClickonSignI-303", "isController": false}, {"data": [[1.71025032E12, 35.8]], "isOverall": false, "label": "03-06-ClickonProduct-307", "isController": false}, {"data": [[1.71025032E12, 112.8]], "isOverall": false, "label": "06-11-ClickonSignOut", "isController": true}, {"data": [[1.7102502E12, 40.199999999999996], [1.71025038E12, 66.9]], "isOverall": false, "label": "07-02-ClickonENtertheStore", "isController": true}, {"data": [[1.71025038E12, 0.0]], "isOverall": false, "label": "01-09-PaymentDetails&ClickonContinue", "isController": true}, {"data": [[1.71025062E12, 246293.95000000004], [1.71025026E12, 128.68042123361326], [1.7102502E12, 141.17102532171012], [1.71025038E12, 121.12983243171897], [1.71025032E12, 104.92309732166507]], "isOverall": false, "label": "08-01-Search API", "isController": false}, {"data": [[1.71025026E12, 39.8]], "isOverall": false, "label": "06-02-ClickonENtertheStore-302", "isController": false}, {"data": [[1.71025026E12, 155.1]], "isOverall": false, "label": "01-04-Credentials&ClickonLogin", "isController": true}, {"data": [[1.7102502E12, 177.5]], "isOverall": false, "label": "02-01-EnterLandingURL-301", "isController": false}, {"data": [[1.71025026E12, 38.300000000000004]], "isOverall": false, "label": "02-03-ClickonSignI-303", "isController": false}, {"data": [[1.7102502E12, 173.0], [1.71025038E12, 136.29999999999998]], "isOverall": false, "label": "07-01-EnterLandingURL", "isController": true}, {"data": [[1.71025032E12, 34.6]], "isOverall": false, "label": "06-11-ClickonSignOut-313", "isController": false}, {"data": [[1.71025032E12, 78.2]], "isOverall": false, "label": "06-11-ClickonSignOut-312", "isController": false}, {"data": [[1.71025038E12, 33.3]], "isOverall": false, "label": "07-11-ClickonSignOut-313", "isController": false}, {"data": [[1.71025032E12, 171.40000000000003]], "isOverall": false, "label": "07-11-ClickonSignOut", "isController": true}, {"data": [[1.71025038E12, 138.1]], "isOverall": false, "label": "07-11-ClickonSignOut-312", "isController": false}, {"data": [[1.71025032E12, 122.0]], "isOverall": false, "label": "02-08-EnterQuantity&ClickonProceedtoCheckout", "isController": true}, {"data": [[1.7102502E12, 214.8], [1.71025032E12, 135.4]], "isOverall": false, "label": "06-01-EnterLandingURL-301", "isController": false}, {"data": [[1.71025032E12, 39.6]], "isOverall": false, "label": "07-07-ClickonAddtoCart-308", "isController": false}, {"data": [[1.7102502E12, 213.0]], "isOverall": false, "label": "03-01-EnterLandingURL", "isController": true}, {"data": [[1.71025032E12, 119.7]], "isOverall": false, "label": "01-08-EnterQuantity&ClickonProceedtoCheckout", "isController": true}, {"data": [[1.71025032E12, 35.9]], "isOverall": false, "label": "01-05-ClickFish", "isController": true}, {"data": [[1.71025032E12, 35.8]], "isOverall": false, "label": "03-06-ClickonProduct", "isController": true}, {"data": [[1.71025062E12, 298.0], [1.71025026E12, 40.199999999999996], [1.71025038E12, 41.22222222222222]], "isOverall": false, "label": "07-02-ClickonENtertheStore-302", "isController": false}, {"data": [[1.71025032E12, 0.0]], "isOverall": false, "label": "03-07-ClickonAddtoCart", "isController": true}, {"data": [[1.7102502E12, 38.4]], "isOverall": false, "label": "02-02-ClickonENtertheStore", "isController": true}, {"data": [[1.71025026E12, 165.6]], "isOverall": false, "label": "06-04-Credentials&ClickonLogin", "isController": true}, {"data": [[1.71025032E12, 36.4]], "isOverall": false, "label": "06-04-Credentials&ClickonLogin-305", "isController": false}, {"data": [[1.71025032E12, 129.2]], "isOverall": false, "label": "06-04-Credentials&ClickonLogin-304", "isController": false}, {"data": [[1.71025038E12, 119.7]], "isOverall": false, "label": "01-08-EnterQuantity&ClickonProceedtoCheckout-309", "isController": false}, {"data": [[1.7102502E12, 213.0]], "isOverall": false, "label": "03-01-EnterLandingURL-301", "isController": false}, {"data": [[1.71025026E12, 159.2]], "isOverall": false, "label": "03-04-Credentials&ClickonLogin", "isController": true}, {"data": [[1.71025032E12, 38.199999999999996]], "isOverall": false, "label": "07-06-ClickonProduct-307", "isController": false}, {"data": [[1.71025032E12, 37.2]], "isOverall": false, "label": "06-11-ClickonSignOut-312-1", "isController": false}, {"data": [[1.71025026E12, 35.99999999999999]], "isOverall": false, "label": "01-03-ClickonSignI", "isController": true}, {"data": [[1.71025032E12, 40.2]], "isOverall": false, "label": "06-11-ClickonSignOut-312-0", "isController": false}, {"data": [[1.71025026E12, 36.599999999999994], [1.71025038E12, 0.0]], "isOverall": false, "label": "07-03-ClickonSignI", "isController": true}, {"data": [[1.71025032E12, 122.8]], "isOverall": false, "label": "03-04-Credentials&ClickonLogin-304", "isController": false}, {"data": [[1.71025032E12, 36.4]], "isOverall": false, "label": "03-04-Credentials&ClickonLogin-305", "isController": false}, {"data": [[1.71025032E12, 39.5]], "isOverall": false, "label": "02-05-ClickDogs", "isController": true}, {"data": [[1.7102502E12, 172.9], [1.71025038E12, 136.29999999999998]], "isOverall": false, "label": "07-01-EnterLandingURL-301", "isController": false}, {"data": [[1.71025038E12, 0.0]], "isOverall": false, "label": "02-09-PaymentDetails&ClickonContinue", "isController": true}, {"data": [[1.71025026E12, 40.2]], "isOverall": false, "label": "03-03-ClickonSignI-303", "isController": false}, {"data": [[1.71025032E12, 34.900000000000006]], "isOverall": false, "label": "02-06-ClickonProduct", "isController": true}, {"data": [[1.71025032E12, 39.5]], "isOverall": false, "label": "07-05-ClickReptiles-306", "isController": false}, {"data": [[1.71025032E12, 38.199999999999996]], "isOverall": false, "label": "07-06-ClickonProduct", "isController": true}, {"data": [[1.71025026E12, 38.6]], "isOverall": false, "label": "06-03-ClickonSignI", "isController": true}, {"data": [[1.71025026E12, 40.2]], "isOverall": false, "label": "03-03-ClickonSignI", "isController": true}, {"data": [[1.7102502E12, 214.8], [1.71025032E12, 135.4]], "isOverall": false, "label": "06-01-EnterLandingURL", "isController": true}, {"data": [[1.71025032E12, 37.6]], "isOverall": false, "label": "07-04-Credentials&ClickonLogin-305", "isController": false}, {"data": [[1.71025032E12, 116.1]], "isOverall": false, "label": "07-04-Credentials&ClickonLogin-304", "isController": false}, {"data": [[1.71025032E12, 39.5]], "isOverall": false, "label": "07-05-ClickReptiles", "isController": true}, {"data": [[1.71025032E12, 38.19999999999999]], "isOverall": false, "label": "01-06-ClickonProduct", "isController": true}, {"data": [[1.71025026E12, 38.300000000000004]], "isOverall": false, "label": "02-02-ClickonENtertheStore-302", "isController": false}, {"data": [[1.7102502E12, 41.8]], "isOverall": false, "label": "03-02-ClickonENtertheStore", "isController": true}, {"data": [[1.71025032E12, 37.099999999999994]], "isOverall": false, "label": "02-07-ClickonAddtoCart-308", "isController": false}, {"data": [[1.7102502E12, 177.5]], "isOverall": false, "label": "02-01-EnterLandingURL", "isController": true}, {"data": [[1.71025032E12, 39.0]], "isOverall": false, "label": "03-05-ClickReptiles-306", "isController": false}, {"data": [[1.7102502E12, 39.8], [1.71025032E12, 0.0]], "isOverall": false, "label": "06-02-ClickonENtertheStore", "isController": true}, {"data": [[1.71025026E12, 156.3]], "isOverall": false, "label": "02-04-Credentials&ClickonLogin", "isController": true}, {"data": [[1.71025026E12, 38.300000000000004]], "isOverall": false, "label": "02-03-ClickonSignI", "isController": true}, {"data": [[1.71025026E12, 41.8]], "isOverall": false, "label": "03-02-ClickonENtertheStore-302", "isController": false}, {"data": [[1.71025032E12, 39.5]], "isOverall": false, "label": "02-05-ClickDogs-306", "isController": false}, {"data": [[1.71025038E12, 122.0]], "isOverall": false, "label": "02-08-EnterQuantity&ClickonProceedtoCheckout-309", "isController": false}, {"data": [[1.71025032E12, 39.5]], "isOverall": false, "label": "01-04-Credentials&ClickonLogin-305", "isController": false}, {"data": [[1.71025026E12, 38.6]], "isOverall": false, "label": "06-03-ClickonSignI-303", "isController": false}, {"data": [[1.71025032E12, 38.19999999999999]], "isOverall": false, "label": "01-06-ClickonProduct-307", "isController": false}, {"data": [[1.71025032E12, 115.6]], "isOverall": false, "label": "01-04-Credentials&ClickonLogin-304", "isController": false}, {"data": [[1.71025032E12, 36.3]], "isOverall": false, "label": "01-07-ClickonAddtoCart", "isController": true}, {"data": [[1.7102502E12, 40.5]], "isOverall": false, "label": "01-02-ClickonENtertheStore", "isController": true}, {"data": [[1.71025026E12, 153.7]], "isOverall": false, "label": "07-04-Credentials&ClickonLogin", "isController": true}, {"data": [[1.7102502E12, 179.4]], "isOverall": false, "label": "01-01-EnterLandingURL-301", "isController": false}, {"data": [[1.71025032E12, 34.900000000000006]], "isOverall": false, "label": "02-06-ClickonProduct-307", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71025062E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.7102502E12, "maxY": 49199.55000000001, "series": [{"data": [[1.71025032E12, 117.10000000000001]], "isOverall": false, "label": "02-04-Credentials&ClickonLogin-304", "isController": false}, {"data": [[1.7102502E12, 179.1]], "isOverall": false, "label": "01-01-EnterLandingURL", "isController": true}, {"data": [[1.71025032E12, 38.9]], "isOverall": false, "label": "02-04-Credentials&ClickonLogin-305", "isController": false}, {"data": [[1.71025032E12, 39.3]], "isOverall": false, "label": "07-07-ClickonAddtoCart", "isController": true}, {"data": [[1.71025038E12, 33.77777777777778]], "isOverall": false, "label": "07-11-ClickonSignOut-312-1", "isController": false}, {"data": [[1.71025026E12, 36.2]], "isOverall": false, "label": "07-03-ClickonSignI-303", "isController": false}, {"data": [[1.71025038E12, 117.77777777777777]], "isOverall": false, "label": "07-11-ClickonSignOut-312-0", "isController": false}, {"data": [[1.71025032E12, 35.9]], "isOverall": false, "label": "01-05-ClickFish-306", "isController": false}, {"data": [[1.71025032E12, 38.6]], "isOverall": false, "label": "03-05-ClickReptiles", "isController": true}, {"data": [[1.71025026E12, 40.199999999999996]], "isOverall": false, "label": "01-02-ClickonENtertheStore-302", "isController": false}, {"data": [[1.71025032E12, 37.099999999999994]], "isOverall": false, "label": "02-07-ClickonAddtoCart", "isController": true}, {"data": [[1.71025032E12, 36.0]], "isOverall": false, "label": "01-07-ClickonAddtoCart-308", "isController": false}, {"data": [[1.71025026E12, 35.99999999999999]], "isOverall": false, "label": "01-03-ClickonSignI-303", "isController": false}, {"data": [[1.71025032E12, 35.8]], "isOverall": false, "label": "03-06-ClickonProduct-307", "isController": false}, {"data": [[1.71025032E12, 74.8]], "isOverall": false, "label": "06-11-ClickonSignOut", "isController": true}, {"data": [[1.7102502E12, 39.900000000000006], [1.71025038E12, 66.80000000000001]], "isOverall": false, "label": "07-02-ClickonENtertheStore", "isController": true}, {"data": [[1.71025038E12, 0.0]], "isOverall": false, "label": "01-09-PaymentDetails&ClickonContinue", "isController": true}, {"data": [[1.71025062E12, 49199.55000000001], [1.71025026E12, 128.67042768106586], [1.7102502E12, 141.14196762141952], [1.71025038E12, 115.25755376698748], [1.71025032E12, 79.39476708211781]], "isOverall": false, "label": "08-01-Search API", "isController": false}, {"data": [[1.71025026E12, 39.4]], "isOverall": false, "label": "06-02-ClickonENtertheStore-302", "isController": false}, {"data": [[1.71025026E12, 154.8]], "isOverall": false, "label": "01-04-Credentials&ClickonLogin", "isController": true}, {"data": [[1.7102502E12, 176.9]], "isOverall": false, "label": "02-01-EnterLandingURL-301", "isController": false}, {"data": [[1.71025026E12, 38.300000000000004]], "isOverall": false, "label": "02-03-ClickonSignI-303", "isController": false}, {"data": [[1.7102502E12, 172.5], [1.71025038E12, 136.29999999999998]], "isOverall": false, "label": "07-01-EnterLandingURL", "isController": true}, {"data": [[1.71025032E12, 34.6]], "isOverall": false, "label": "06-11-ClickonSignOut-313", "isController": false}, {"data": [[1.71025032E12, 40.2]], "isOverall": false, "label": "06-11-ClickonSignOut-312", "isController": false}, {"data": [[1.71025038E12, 32.0]], "isOverall": false, "label": "07-11-ClickonSignOut-313", "isController": false}, {"data": [[1.71025032E12, 138.0]], "isOverall": false, "label": "07-11-ClickonSignOut", "isController": true}, {"data": [[1.71025038E12, 106.0]], "isOverall": false, "label": "07-11-ClickonSignOut-312", "isController": false}, {"data": [[1.71025032E12, 122.0]], "isOverall": false, "label": "02-08-EnterQuantity&ClickonProceedtoCheckout", "isController": true}, {"data": [[1.7102502E12, 214.6], [1.71025032E12, 135.4]], "isOverall": false, "label": "06-01-EnterLandingURL-301", "isController": false}, {"data": [[1.71025032E12, 39.3]], "isOverall": false, "label": "07-07-ClickonAddtoCart-308", "isController": false}, {"data": [[1.7102502E12, 212.4]], "isOverall": false, "label": "03-01-EnterLandingURL", "isController": true}, {"data": [[1.71025032E12, 119.5]], "isOverall": false, "label": "01-08-EnterQuantity&ClickonProceedtoCheckout", "isController": true}, {"data": [[1.71025032E12, 35.9]], "isOverall": false, "label": "01-05-ClickFish", "isController": true}, {"data": [[1.71025032E12, 35.8]], "isOverall": false, "label": "03-06-ClickonProduct", "isController": true}, {"data": [[1.71025062E12, 298.0], [1.71025026E12, 39.900000000000006], [1.71025038E12, 41.111111111111114]], "isOverall": false, "label": "07-02-ClickonENtertheStore-302", "isController": false}, {"data": [[1.71025032E12, 0.0]], "isOverall": false, "label": "03-07-ClickonAddtoCart", "isController": true}, {"data": [[1.7102502E12, 37.800000000000004]], "isOverall": false, "label": "02-02-ClickonENtertheStore", "isController": true}, {"data": [[1.71025026E12, 164.8]], "isOverall": false, "label": "06-04-Credentials&ClickonLogin", "isController": true}, {"data": [[1.71025032E12, 35.8]], "isOverall": false, "label": "06-04-Credentials&ClickonLogin-305", "isController": false}, {"data": [[1.71025032E12, 129.0]], "isOverall": false, "label": "06-04-Credentials&ClickonLogin-304", "isController": false}, {"data": [[1.71025038E12, 119.5]], "isOverall": false, "label": "01-08-EnterQuantity&ClickonProceedtoCheckout-309", "isController": false}, {"data": [[1.7102502E12, 212.4]], "isOverall": false, "label": "03-01-EnterLandingURL-301", "isController": false}, {"data": [[1.71025026E12, 158.0]], "isOverall": false, "label": "03-04-Credentials&ClickonLogin", "isController": true}, {"data": [[1.71025032E12, 38.0]], "isOverall": false, "label": "07-06-ClickonProduct-307", "isController": false}, {"data": [[1.71025032E12, 36.8]], "isOverall": false, "label": "06-11-ClickonSignOut-312-1", "isController": false}, {"data": [[1.71025026E12, 35.99999999999999]], "isOverall": false, "label": "01-03-ClickonSignI", "isController": true}, {"data": [[1.71025032E12, 40.2]], "isOverall": false, "label": "06-11-ClickonSignOut-312-0", "isController": false}, {"data": [[1.71025026E12, 36.2], [1.71025038E12, 0.0]], "isOverall": false, "label": "07-03-ClickonSignI", "isController": true}, {"data": [[1.71025032E12, 122.4]], "isOverall": false, "label": "03-04-Credentials&ClickonLogin-304", "isController": false}, {"data": [[1.71025032E12, 35.6]], "isOverall": false, "label": "03-04-Credentials&ClickonLogin-305", "isController": false}, {"data": [[1.71025032E12, 39.4]], "isOverall": false, "label": "02-05-ClickDogs", "isController": true}, {"data": [[1.7102502E12, 172.5], [1.71025038E12, 136.29999999999998]], "isOverall": false, "label": "07-01-EnterLandingURL-301", "isController": false}, {"data": [[1.71025038E12, 0.0]], "isOverall": false, "label": "02-09-PaymentDetails&ClickonContinue", "isController": true}, {"data": [[1.71025026E12, 40.0]], "isOverall": false, "label": "03-03-ClickonSignI-303", "isController": false}, {"data": [[1.71025032E12, 34.8]], "isOverall": false, "label": "02-06-ClickonProduct", "isController": true}, {"data": [[1.71025032E12, 39.4]], "isOverall": false, "label": "07-05-ClickReptiles-306", "isController": false}, {"data": [[1.71025032E12, 38.0]], "isOverall": false, "label": "07-06-ClickonProduct", "isController": true}, {"data": [[1.71025026E12, 38.6]], "isOverall": false, "label": "06-03-ClickonSignI", "isController": true}, {"data": [[1.71025026E12, 40.0]], "isOverall": false, "label": "03-03-ClickonSignI", "isController": true}, {"data": [[1.7102502E12, 214.6], [1.71025032E12, 135.4]], "isOverall": false, "label": "06-01-EnterLandingURL", "isController": true}, {"data": [[1.71025032E12, 37.5]], "isOverall": false, "label": "07-04-Credentials&ClickonLogin-305", "isController": false}, {"data": [[1.71025032E12, 116.0]], "isOverall": false, "label": "07-04-Credentials&ClickonLogin-304", "isController": false}, {"data": [[1.71025032E12, 39.4]], "isOverall": false, "label": "07-05-ClickReptiles", "isController": true}, {"data": [[1.71025032E12, 38.1]], "isOverall": false, "label": "01-06-ClickonProduct", "isController": true}, {"data": [[1.71025026E12, 37.800000000000004]], "isOverall": false, "label": "02-02-ClickonENtertheStore-302", "isController": false}, {"data": [[1.7102502E12, 41.6]], "isOverall": false, "label": "03-02-ClickonENtertheStore", "isController": true}, {"data": [[1.71025032E12, 37.099999999999994]], "isOverall": false, "label": "02-07-ClickonAddtoCart-308", "isController": false}, {"data": [[1.7102502E12, 176.9]], "isOverall": false, "label": "02-01-EnterLandingURL", "isController": true}, {"data": [[1.71025032E12, 38.6]], "isOverall": false, "label": "03-05-ClickReptiles-306", "isController": false}, {"data": [[1.7102502E12, 39.4], [1.71025032E12, 0.0]], "isOverall": false, "label": "06-02-ClickonENtertheStore", "isController": true}, {"data": [[1.71025026E12, 156.0]], "isOverall": false, "label": "02-04-Credentials&ClickonLogin", "isController": true}, {"data": [[1.71025026E12, 38.300000000000004]], "isOverall": false, "label": "02-03-ClickonSignI", "isController": true}, {"data": [[1.71025026E12, 41.6]], "isOverall": false, "label": "03-02-ClickonENtertheStore-302", "isController": false}, {"data": [[1.71025032E12, 39.4]], "isOverall": false, "label": "02-05-ClickDogs-306", "isController": false}, {"data": [[1.71025038E12, 122.0]], "isOverall": false, "label": "02-08-EnterQuantity&ClickonProceedtoCheckout-309", "isController": false}, {"data": [[1.71025032E12, 39.4]], "isOverall": false, "label": "01-04-Credentials&ClickonLogin-305", "isController": false}, {"data": [[1.71025026E12, 38.6]], "isOverall": false, "label": "06-03-ClickonSignI-303", "isController": false}, {"data": [[1.71025032E12, 38.1]], "isOverall": false, "label": "01-06-ClickonProduct-307", "isController": false}, {"data": [[1.71025032E12, 115.4]], "isOverall": false, "label": "01-04-Credentials&ClickonLogin-304", "isController": false}, {"data": [[1.71025032E12, 36.0]], "isOverall": false, "label": "01-07-ClickonAddtoCart", "isController": true}, {"data": [[1.7102502E12, 40.199999999999996]], "isOverall": false, "label": "01-02-ClickonENtertheStore", "isController": true}, {"data": [[1.71025026E12, 153.50000000000003]], "isOverall": false, "label": "07-04-Credentials&ClickonLogin", "isController": true}, {"data": [[1.7102502E12, 179.1]], "isOverall": false, "label": "01-01-EnterLandingURL-301", "isController": false}, {"data": [[1.71025032E12, 34.8]], "isOverall": false, "label": "02-06-ClickonProduct-307", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71025062E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.7102502E12, "maxY": 196939.19999999998, "series": [{"data": [[1.71025032E12, 78.7]], "isOverall": false, "label": "02-04-Credentials&ClickonLogin-304", "isController": false}, {"data": [[1.7102502E12, 140.9]], "isOverall": false, "label": "01-01-EnterLandingURL", "isController": true}, {"data": [[1.71025032E12, 0.0]], "isOverall": false, "label": "02-04-Credentials&ClickonLogin-305", "isController": false}, {"data": [[1.71025032E12, 0.0]], "isOverall": false, "label": "07-07-ClickonAddtoCart", "isController": true}, {"data": [[1.71025038E12, 0.0]], "isOverall": false, "label": "07-11-ClickonSignOut-312-1", "isController": false}, {"data": [[1.71025026E12, 0.0]], "isOverall": false, "label": "07-03-ClickonSignI-303", "isController": false}, {"data": [[1.71025038E12, 82.8888888888889]], "isOverall": false, "label": "07-11-ClickonSignOut-312-0", "isController": false}, {"data": [[1.71025032E12, 0.0]], "isOverall": false, "label": "01-05-ClickFish-306", "isController": false}, {"data": [[1.71025032E12, 0.0]], "isOverall": false, "label": "03-05-ClickReptiles", "isController": true}, {"data": [[1.71025026E12, 0.0]], "isOverall": false, "label": "01-02-ClickonENtertheStore-302", "isController": false}, {"data": [[1.71025032E12, 0.0]], "isOverall": false, "label": "02-07-ClickonAddtoCart", "isController": true}, {"data": [[1.71025032E12, 0.0]], "isOverall": false, "label": "01-07-ClickonAddtoCart-308", "isController": false}, {"data": [[1.71025026E12, 0.0]], "isOverall": false, "label": "01-03-ClickonSignI-303", "isController": false}, {"data": [[1.71025032E12, 0.0]], "isOverall": false, "label": "03-06-ClickonProduct-307", "isController": false}, {"data": [[1.71025032E12, 0.0]], "isOverall": false, "label": "06-11-ClickonSignOut", "isController": true}, {"data": [[1.7102502E12, 0.0], [1.71025038E12, 23.0]], "isOverall": false, "label": "07-02-ClickonENtertheStore", "isController": true}, {"data": [[1.71025038E12, 0.0]], "isOverall": false, "label": "01-09-PaymentDetails&ClickonContinue", "isController": true}, {"data": [[1.71025062E12, 196939.19999999998], [1.71025026E12, 89.59520739307975], [1.7102502E12, 97.96305520963055], [1.71025038E12, 86.44187887584147], [1.71025032E12, 81.1467338460177]], "isOverall": false, "label": "08-01-Search API", "isController": false}, {"data": [[1.71025026E12, 0.0]], "isOverall": false, "label": "06-02-ClickonENtertheStore-302", "isController": false}, {"data": [[1.71025026E12, 76.89999999999999]], "isOverall": false, "label": "01-04-Credentials&ClickonLogin", "isController": true}, {"data": [[1.7102502E12, 141.2]], "isOverall": false, "label": "02-01-EnterLandingURL-301", "isController": false}, {"data": [[1.71025026E12, 0.0]], "isOverall": false, "label": "02-03-ClickonSignI-303", "isController": false}, {"data": [[1.7102502E12, 136.69999999999996], [1.71025038E12, 82.30000000000001]], "isOverall": false, "label": "07-01-EnterLandingURL", "isController": true}, {"data": [[1.71025032E12, 0.0]], "isOverall": false, "label": "06-11-ClickonSignOut-313", "isController": false}, {"data": [[1.71025032E12, 0.0]], "isOverall": false, "label": "06-11-ClickonSignOut-312", "isController": false}, {"data": [[1.71025038E12, 1.0]], "isOverall": false, "label": "07-11-ClickonSignOut-313", "isController": false}, {"data": [[1.71025032E12, 76.80000000000001]], "isOverall": false, "label": "07-11-ClickonSignOut", "isController": true}, {"data": [[1.71025038E12, 75.80000000000001]], "isOverall": false, "label": "07-11-ClickonSignOut-312", "isController": false}, {"data": [[1.71025032E12, 84.0]], "isOverall": false, "label": "02-08-EnterQuantity&ClickonProceedtoCheckout", "isController": true}, {"data": [[1.7102502E12, 178.2], [1.71025032E12, 97.8]], "isOverall": false, "label": "06-01-EnterLandingURL-301", "isController": false}, {"data": [[1.71025032E12, 0.0]], "isOverall": false, "label": "07-07-ClickonAddtoCart-308", "isController": false}, {"data": [[1.7102502E12, 177.8]], "isOverall": false, "label": "03-01-EnterLandingURL", "isController": true}, {"data": [[1.71025032E12, 83.8]], "isOverall": false, "label": "01-08-EnterQuantity&ClickonProceedtoCheckout", "isController": true}, {"data": [[1.71025032E12, 0.0]], "isOverall": false, "label": "01-05-ClickFish", "isController": true}, {"data": [[1.71025032E12, 0.0]], "isOverall": false, "label": "03-06-ClickonProduct", "isController": true}, {"data": [[1.71025062E12, 230.0], [1.71025026E12, 0.0], [1.71025038E12, 0.0]], "isOverall": false, "label": "07-02-ClickonENtertheStore-302", "isController": false}, {"data": [[1.71025032E12, 0.0]], "isOverall": false, "label": "03-07-ClickonAddtoCart", "isController": true}, {"data": [[1.7102502E12, 0.0]], "isOverall": false, "label": "02-02-ClickonENtertheStore", "isController": true}, {"data": [[1.71025026E12, 82.4]], "isOverall": false, "label": "06-04-Credentials&ClickonLogin", "isController": true}, {"data": [[1.71025032E12, 0.0]], "isOverall": false, "label": "06-04-Credentials&ClickonLogin-305", "isController": false}, {"data": [[1.71025032E12, 82.4]], "isOverall": false, "label": "06-04-Credentials&ClickonLogin-304", "isController": false}, {"data": [[1.71025038E12, 83.8]], "isOverall": false, "label": "01-08-EnterQuantity&ClickonProceedtoCheckout-309", "isController": false}, {"data": [[1.7102502E12, 177.8]], "isOverall": false, "label": "03-01-EnterLandingURL-301", "isController": false}, {"data": [[1.71025026E12, 84.6]], "isOverall": false, "label": "03-04-Credentials&ClickonLogin", "isController": true}, {"data": [[1.71025032E12, 0.0]], "isOverall": false, "label": "07-06-ClickonProduct-307", "isController": false}, {"data": [[1.71025032E12, 0.0]], "isOverall": false, "label": "06-11-ClickonSignOut-312-1", "isController": false}, {"data": [[1.71025026E12, 0.0]], "isOverall": false, "label": "01-03-ClickonSignI", "isController": true}, {"data": [[1.71025032E12, 0.0]], "isOverall": false, "label": "06-11-ClickonSignOut-312-0", "isController": false}, {"data": [[1.71025026E12, 0.0], [1.71025038E12, 0.0]], "isOverall": false, "label": "07-03-ClickonSignI", "isController": true}, {"data": [[1.71025032E12, 84.6]], "isOverall": false, "label": "03-04-Credentials&ClickonLogin-304", "isController": false}, {"data": [[1.71025032E12, 0.0]], "isOverall": false, "label": "03-04-Credentials&ClickonLogin-305", "isController": false}, {"data": [[1.71025032E12, 0.0]], "isOverall": false, "label": "02-05-ClickDogs", "isController": true}, {"data": [[1.7102502E12, 136.69999999999996], [1.71025038E12, 82.30000000000001]], "isOverall": false, "label": "07-01-EnterLandingURL-301", "isController": false}, {"data": [[1.71025038E12, 0.0]], "isOverall": false, "label": "02-09-PaymentDetails&ClickonContinue", "isController": true}, {"data": [[1.71025026E12, 0.0]], "isOverall": false, "label": "03-03-ClickonSignI-303", "isController": false}, {"data": [[1.71025032E12, 0.0]], "isOverall": false, "label": "02-06-ClickonProduct", "isController": true}, {"data": [[1.71025032E12, 0.0]], "isOverall": false, "label": "07-05-ClickReptiles-306", "isController": false}, {"data": [[1.71025032E12, 0.0]], "isOverall": false, "label": "07-06-ClickonProduct", "isController": true}, {"data": [[1.71025026E12, 0.0]], "isOverall": false, "label": "06-03-ClickonSignI", "isController": true}, {"data": [[1.71025026E12, 0.0]], "isOverall": false, "label": "03-03-ClickonSignI", "isController": true}, {"data": [[1.7102502E12, 178.2], [1.71025032E12, 97.8]], "isOverall": false, "label": "06-01-EnterLandingURL", "isController": true}, {"data": [[1.71025032E12, 0.0]], "isOverall": false, "label": "07-04-Credentials&ClickonLogin-305", "isController": false}, {"data": [[1.71025032E12, 74.5]], "isOverall": false, "label": "07-04-Credentials&ClickonLogin-304", "isController": false}, {"data": [[1.71025032E12, 0.0]], "isOverall": false, "label": "07-05-ClickReptiles", "isController": true}, {"data": [[1.71025032E12, 0.0]], "isOverall": false, "label": "01-06-ClickonProduct", "isController": true}, {"data": [[1.71025026E12, 0.0]], "isOverall": false, "label": "02-02-ClickonENtertheStore-302", "isController": false}, {"data": [[1.7102502E12, 0.0]], "isOverall": false, "label": "03-02-ClickonENtertheStore", "isController": true}, {"data": [[1.71025032E12, 0.0]], "isOverall": false, "label": "02-07-ClickonAddtoCart-308", "isController": false}, {"data": [[1.7102502E12, 141.2]], "isOverall": false, "label": "02-01-EnterLandingURL", "isController": true}, {"data": [[1.71025032E12, 0.0]], "isOverall": false, "label": "03-05-ClickReptiles-306", "isController": false}, {"data": [[1.7102502E12, 0.0], [1.71025032E12, 0.0]], "isOverall": false, "label": "06-02-ClickonENtertheStore", "isController": true}, {"data": [[1.71025026E12, 78.7]], "isOverall": false, "label": "02-04-Credentials&ClickonLogin", "isController": true}, {"data": [[1.71025026E12, 0.0]], "isOverall": false, "label": "02-03-ClickonSignI", "isController": true}, {"data": [[1.71025026E12, 0.0]], "isOverall": false, "label": "03-02-ClickonENtertheStore-302", "isController": false}, {"data": [[1.71025032E12, 0.0]], "isOverall": false, "label": "02-05-ClickDogs-306", "isController": false}, {"data": [[1.71025038E12, 84.0]], "isOverall": false, "label": "02-08-EnterQuantity&ClickonProceedtoCheckout-309", "isController": false}, {"data": [[1.71025032E12, 0.0]], "isOverall": false, "label": "01-04-Credentials&ClickonLogin-305", "isController": false}, {"data": [[1.71025026E12, 0.0]], "isOverall": false, "label": "06-03-ClickonSignI-303", "isController": false}, {"data": [[1.71025032E12, 0.0]], "isOverall": false, "label": "01-06-ClickonProduct-307", "isController": false}, {"data": [[1.71025032E12, 76.89999999999999]], "isOverall": false, "label": "01-04-Credentials&ClickonLogin-304", "isController": false}, {"data": [[1.71025032E12, 0.0]], "isOverall": false, "label": "01-07-ClickonAddtoCart", "isController": true}, {"data": [[1.7102502E12, 0.0]], "isOverall": false, "label": "01-02-ClickonENtertheStore", "isController": true}, {"data": [[1.71025026E12, 74.5]], "isOverall": false, "label": "07-04-Credentials&ClickonLogin", "isController": true}, {"data": [[1.7102502E12, 140.9]], "isOverall": false, "label": "01-01-EnterLandingURL-301", "isController": false}, {"data": [[1.71025032E12, 0.0]], "isOverall": false, "label": "02-06-ClickonProduct-307", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71025062E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 29.0, "minX": 1.7102502E12, "maxY": 246015.0, "series": [{"data": [[1.71025062E12, 246015.0], [1.71025026E12, 1229.0], [1.7102502E12, 1258.0], [1.71025038E12, 1254.0], [1.71025032E12, 3267.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.71025062E12, 298.0], [1.71025026E12, 30.0], [1.7102502E12, 91.0], [1.71025038E12, 30.0], [1.71025032E12, 29.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.71025062E12, 246015.0], [1.71025026E12, 148.0], [1.7102502E12, 160.0], [1.71025038E12, 166.0], [1.71025032E12, 142.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.71025062E12, 246015.0], [1.71025026E12, 263.2599999999984], [1.7102502E12, 627.0], [1.71025038E12, 301.1799999999985], [1.71025032E12, 492.4200000000001]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.71025062E12, 245981.0], [1.71025026E12, 120.0], [1.7102502E12, 122.0], [1.71025038E12, 121.0], [1.71025032E12, 116.0]], "isOverall": false, "label": "Median", "isController": false}, {"data": [[1.71025062E12, 246015.0], [1.71025026E12, 167.0], [1.7102502E12, 182.5], [1.71025038E12, 206.0], [1.71025032E12, 156.0]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71025062E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 6.0, "minX": 6.0, "maxY": 246364.5, "series": [{"data": [[6.0, 109.5], [10.0, 371.0], [20.0, 110.0], [21.0, 245981.0], [32.0, 121.0], [49.0, 122.0], [59.0, 133.0], [73.0, 133.0], [79.0, 148.0], [77.0, 281.0], [82.0, 112.0], [84.0, 173.0], [87.0, 128.0], [90.0, 122.0], [89.0, 124.0], [92.0, 122.0], [100.0, 121.0], [102.0, 132.5], [101.0, 129.0], [103.0, 210.0], [106.0, 189.5], [111.0, 121.0], [108.0, 123.0], [109.0, 202.0], [118.0, 122.0], [123.0, 113.0], [122.0, 112.0], [121.0, 120.0], [127.0, 124.0], [134.0, 120.0], [135.0, 134.0], [131.0, 124.0], [129.0, 160.0], [132.0, 139.0], [133.0, 117.0], [139.0, 120.0], [137.0, 141.0], [136.0, 141.5], [143.0, 123.0], [141.0, 134.0], [140.0, 109.0], [142.0, 112.0], [148.0, 120.0], [145.0, 113.0], [149.0, 128.0], [151.0, 120.5], [150.0, 133.0], [146.0, 124.0], [154.0, 125.0], [158.0, 118.0], [156.0, 127.0], [157.0, 122.5], [152.0, 127.0], [159.0, 118.0], [155.0, 124.0], [153.0, 111.0], [163.0, 125.0], [166.0, 117.0], [162.0, 122.0], [161.0, 122.0], [165.0, 120.0], [167.0, 122.0], [164.0, 122.0], [160.0, 117.0], [168.0, 116.5], [170.0, 118.0], [173.0, 117.0], [171.0, 114.0], [169.0, 114.0], [172.0, 114.0], [175.0, 113.0], [174.0, 111.0], [177.0, 115.0], [179.0, 114.0], [178.0, 113.0], [181.0, 111.0], [182.0, 105.0], [176.0, 118.0], [183.0, 110.0], [180.0, 114.0], [189.0, 111.0], [190.0, 114.0], [184.0, 110.0], [188.0, 115.0], [192.0, 108.0], [194.0, 34.0], [197.0, 110.0], [195.0, 129.0], [210.0, 110.0], [220.0, 119.0], [223.0, 125.0], [230.0, 106.0], [254.0, 112.0], [259.0, 112.0], [262.0, 110.0], [270.0, 109.0], [258.0, 110.0], [282.0, 125.0], [285.0, 113.0], [303.0, 135.0], [298.0, 119.0], [335.0, 123.5], [328.0, 124.0], [332.0, 114.0], [338.0, 116.0], [345.0, 114.0], [366.0, 104.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[139.0, 116.0], [153.0, 123.0], [159.0, 125.0], [156.0, 14.0], [157.0, 6.0], [161.0, 103.0], [163.0, 129.0], [165.0, 122.0], [164.0, 52.0], [174.0, 121.5], [169.0, 52.5], [175.0, 7.5], [178.0, 120.0], [180.0, 121.0], [181.0, 74.0], [179.0, 35.5], [184.0, 48.5], [188.0, 9.0], [190.0, 55.0], [194.0, 119.0], [197.0, 28.5], [195.0, 47.0], [210.0, 15.0], [220.0, 43.5], [223.0, 26.0], [230.0, 16.5], [254.0, 42.0], [259.0, 35.0], [262.0, 43.0], [270.0, 46.0], [258.0, 25.0], [282.0, 57.0], [285.0, 53.0], [303.0, 57.0], [298.0, 36.0], [335.0, 56.0], [328.0, 58.0], [332.0, 57.0], [338.0, 36.0], [345.0, 42.0], [21.0, 246364.5], [366.0, 58.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 366.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 0.0, "minX": 6.0, "maxY": 245981.0, "series": [{"data": [[6.0, 109.0], [10.0, 370.5], [20.0, 110.0], [21.0, 245981.0], [32.0, 121.0], [49.0, 122.0], [59.0, 133.0], [73.0, 133.0], [79.0, 148.0], [77.0, 281.0], [82.0, 112.0], [84.0, 173.0], [87.0, 128.0], [90.0, 122.0], [89.0, 124.0], [92.0, 122.0], [100.0, 121.0], [102.0, 132.5], [101.0, 129.0], [103.0, 210.0], [106.0, 189.5], [111.0, 121.0], [108.0, 123.0], [109.0, 202.0], [118.0, 122.0], [123.0, 113.0], [122.0, 112.0], [121.0, 120.0], [127.0, 124.0], [134.0, 120.0], [135.0, 134.0], [131.0, 124.0], [129.0, 160.0], [132.0, 139.0], [133.0, 117.0], [139.0, 120.0], [137.0, 141.0], [136.0, 141.5], [143.0, 123.0], [141.0, 133.0], [140.0, 109.0], [142.0, 112.0], [148.0, 120.0], [145.0, 113.0], [149.0, 128.0], [151.0, 120.5], [150.0, 133.0], [146.0, 124.0], [154.0, 125.0], [158.0, 118.0], [156.0, 127.0], [157.0, 122.0], [152.0, 127.0], [159.0, 118.0], [155.0, 124.0], [153.0, 111.0], [163.0, 125.0], [166.0, 117.0], [162.0, 122.0], [161.0, 122.0], [165.0, 120.0], [167.0, 122.0], [164.0, 122.0], [160.0, 117.0], [168.0, 116.5], [170.0, 118.0], [173.0, 117.0], [171.0, 114.0], [169.0, 114.0], [172.0, 114.0], [175.0, 113.0], [174.0, 111.0], [177.0, 115.0], [179.0, 114.0], [178.0, 113.0], [181.0, 111.0], [182.0, 105.0], [176.0, 118.0], [183.0, 110.0], [180.0, 114.0], [189.0, 111.0], [190.0, 114.0], [184.0, 110.0], [188.0, 115.0], [192.0, 108.0], [194.0, 34.0], [197.0, 110.0], [195.0, 129.0], [210.0, 110.0], [220.0, 119.0], [223.0, 125.0], [230.0, 106.0], [254.0, 112.0], [259.0, 112.0], [262.0, 110.0], [270.0, 109.0], [258.0, 110.0], [282.0, 125.0], [285.0, 113.0], [303.0, 135.0], [298.0, 119.0], [335.0, 123.5], [328.0, 124.0], [332.0, 114.0], [338.0, 116.0], [345.0, 114.0], [366.0, 104.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[139.0, 0.0], [153.0, 0.0], [159.0, 0.0], [156.0, 0.0], [157.0, 0.0], [161.0, 0.0], [163.0, 0.0], [165.0, 0.0], [164.0, 0.0], [174.0, 0.0], [169.0, 0.0], [175.0, 0.0], [178.0, 0.0], [180.0, 0.0], [181.0, 0.0], [179.0, 0.0], [184.0, 0.0], [188.0, 0.0], [190.0, 0.0], [194.0, 0.0], [197.0, 0.0], [195.0, 0.0], [210.0, 0.0], [220.0, 0.0], [223.0, 0.0], [230.0, 0.0], [254.0, 0.0], [259.0, 0.0], [262.0, 0.0], [270.0, 0.0], [258.0, 0.0], [282.0, 0.0], [285.0, 0.0], [303.0, 0.0], [298.0, 0.0], [335.0, 0.0], [328.0, 0.0], [332.0, 0.0], [338.0, 0.0], [345.0, 0.0], [21.0, 0.0], [366.0, 0.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 366.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.7102502E12, "maxY": 191.96666666666667, "series": [{"data": [[1.71025062E12, 0.016666666666666666], [1.71025026E12, 156.43333333333334], [1.7102502E12, 41.15], [1.71025038E12, 127.6], [1.71025032E12, 191.96666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71025062E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.08333333333333333, "minX": 1.7102502E12, "maxY": 156.43333333333334, "series": [{"data": [[1.71025062E12, 0.08333333333333333], [1.71025026E12, 156.43333333333334], [1.7102502E12, 40.81666666666667], [1.71025038E12, 110.26666666666667], [1.71025032E12, 119.2]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.71025038E12, 0.15], [1.71025032E12, 0.08333333333333333]], "isOverall": false, "label": "302", "isController": false}, {"data": [[1.71025038E12, 17.183333333333334], [1.71025032E12, 72.68333333333334]], "isOverall": false, "label": "Non HTTP response code: java.net.BindException", "isController": false}, {"data": [[1.71025062E12, 0.26666666666666666]], "isOverall": false, "label": "Non HTTP response code: java.net.SocketException", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71025062E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.7102502E12, "maxY": 155.1, "series": [{"data": [[1.71025026E12, 0.16666666666666666]], "isOverall": false, "label": "01-02-ClickonENtertheStore-302-success", "isController": false}, {"data": [[1.71025026E12, 0.16666666666666666]], "isOverall": false, "label": "01-03-ClickonSignI-303-success", "isController": false}, {"data": [[1.7102502E12, 0.16666666666666666], [1.71025038E12, 0.16666666666666666]], "isOverall": false, "label": "07-01-EnterLandingURL-success", "isController": true}, {"data": [[1.71025026E12, 0.16666666666666666], [1.71025038E12, 0.15]], "isOverall": false, "label": "07-03-ClickonSignI-success", "isController": true}, {"data": [[1.71025032E12, 0.15]], "isOverall": false, "label": "07-11-ClickonSignOut-success", "isController": true}, {"data": [[1.71025032E12, 0.08333333333333333]], "isOverall": false, "label": "06-11-ClickonSignOut-312-1-success", "isController": false}, {"data": [[1.71025032E12, 0.016666666666666666]], "isOverall": false, "label": "07-11-ClickonSignOut-failure", "isController": true}, {"data": [[1.71025032E12, 0.08333333333333333]], "isOverall": false, "label": "06-04-Credentials&ClickonLogin-305-success", "isController": false}, {"data": [[1.71025032E12, 0.16666666666666666]], "isOverall": false, "label": "02-08-EnterQuantity&ClickonProceedtoCheckout-success", "isController": true}, {"data": [[1.71025062E12, 0.06666666666666667], [1.71025026E12, 155.1], [1.7102502E12, 40.15], [1.71025038E12, 109.16666666666667], [1.71025032E12, 115.86666666666666]], "isOverall": false, "label": "08-01-Search API-success", "isController": false}, {"data": [[1.71025032E12, 0.16666666666666666]], "isOverall": false, "label": "02-04-Credentials&ClickonLogin-305-success", "isController": false}, {"data": [[1.71025032E12, 0.16666666666666666]], "isOverall": false, "label": "01-06-ClickonProduct-307-success", "isController": false}, {"data": [[1.7102502E12, 0.08333333333333333], [1.71025032E12, 0.08333333333333333]], "isOverall": false, "label": "06-01-EnterLandingURL-success", "isController": true}, {"data": [[1.71025026E12, 0.16666666666666666]], "isOverall": false, "label": "02-04-Credentials&ClickonLogin-success", "isController": true}, {"data": [[1.7102502E12, 0.16666666666666666]], "isOverall": false, "label": "02-02-ClickonENtertheStore-success", "isController": true}, {"data": [[1.71025026E12, 0.16666666666666666]], "isOverall": false, "label": "01-04-Credentials&ClickonLogin-success", "isController": true}, {"data": [[1.71025032E12, 0.16666666666666666]], "isOverall": false, "label": "07-05-ClickReptiles-306-success", "isController": false}, {"data": [[1.71025038E12, 0.15]], "isOverall": false, "label": "07-11-ClickonSignOut-313-success", "isController": false}, {"data": [[1.71025038E12, 0.16666666666666666]], "isOverall": false, "label": "01-08-EnterQuantity&ClickonProceedtoCheckout-309-success", "isController": false}, {"data": [[1.71025026E12, 0.08333333333333333]], "isOverall": false, "label": "06-03-ClickonSignI-303-success", "isController": false}, {"data": [[1.71025032E12, 0.16666666666666666]], "isOverall": false, "label": "07-05-ClickReptiles-success", "isController": true}, {"data": [[1.71025032E12, 0.16666666666666666]], "isOverall": false, "label": "02-05-ClickDogs-success", "isController": true}, {"data": [[1.71025032E12, 0.16666666666666666]], "isOverall": false, "label": "01-05-ClickFish-success", "isController": true}, {"data": [[1.71025032E12, 0.16666666666666666]], "isOverall": false, "label": "01-07-ClickonAddtoCart-success", "isController": true}, {"data": [[1.7102502E12, 0.08333333333333333], [1.71025032E12, 0.08333333333333333]], "isOverall": false, "label": "06-01-EnterLandingURL-301-success", "isController": false}, {"data": [[1.71025032E12, 0.08333333333333333]], "isOverall": false, "label": "06-11-ClickonSignOut-312-success", "isController": false}, {"data": [[1.71025026E12, 0.08333333333333333]], "isOverall": false, "label": "03-03-ClickonSignI-303-success", "isController": false}, {"data": [[1.71025062E12, 0.016666666666666666], [1.71025026E12, 0.16666666666666666], [1.71025038E12, 0.15]], "isOverall": false, "label": "07-02-ClickonENtertheStore-302-success", "isController": false}, {"data": [[1.71025032E12, 0.08333333333333333]], "isOverall": false, "label": "03-04-Credentials&ClickonLogin-304-success", "isController": false}, {"data": [[1.71025032E12, 0.16666666666666666]], "isOverall": false, "label": "01-04-Credentials&ClickonLogin-305-success", "isController": false}, {"data": [[1.71025032E12, 0.16666666666666666]], "isOverall": false, "label": "07-04-Credentials&ClickonLogin-304-success", "isController": false}, {"data": [[1.71025026E12, 0.16666666666666666]], "isOverall": false, "label": "02-03-ClickonSignI-success", "isController": true}, {"data": [[1.71025032E12, 0.16666666666666666]], "isOverall": false, "label": "07-06-ClickonProduct-307-success", "isController": false}, {"data": [[1.71025026E12, 0.08333333333333333]], "isOverall": false, "label": "06-04-Credentials&ClickonLogin-success", "isController": true}, {"data": [[1.71025032E12, 0.16666666666666666]], "isOverall": false, "label": "07-07-ClickonAddtoCart-308-success", "isController": false}, {"data": [[1.71025038E12, 0.016666666666666666]], "isOverall": false, "label": "07-11-ClickonSignOut-313-failure", "isController": false}, {"data": [[1.71025026E12, 0.08333333333333333]], "isOverall": false, "label": "03-04-Credentials&ClickonLogin-success", "isController": true}, {"data": [[1.7102502E12, 0.08333333333333333], [1.71025032E12, 0.08333333333333333]], "isOverall": false, "label": "06-02-ClickonENtertheStore-success", "isController": true}, {"data": [[1.71025032E12, 0.08333333333333333]], "isOverall": false, "label": "03-06-ClickonProduct-success", "isController": true}, {"data": [[1.71025032E12, 0.08333333333333333]], "isOverall": false, "label": "03-05-ClickReptiles-success", "isController": true}, {"data": [[1.71025062E12, 0.26666666666666666], [1.71025038E12, 17.15], [1.71025032E12, 72.68333333333334]], "isOverall": false, "label": "08-01-Search API-failure", "isController": false}, {"data": [[1.71025032E12, 0.08333333333333333]], "isOverall": false, "label": "03-07-ClickonAddtoCart-success", "isController": true}, {"data": [[1.71025032E12, 0.16666666666666666]], "isOverall": false, "label": "01-05-ClickFish-306-success", "isController": false}, {"data": [[1.71025038E12, 0.15]], "isOverall": false, "label": "07-11-ClickonSignOut-312-1-success", "isController": false}, {"data": [[1.7102502E12, 0.16666666666666666], [1.71025038E12, 0.16666666666666666]], "isOverall": false, "label": "07-01-EnterLandingURL-301-success", "isController": false}, {"data": [[1.71025026E12, 0.08333333333333333]], "isOverall": false, "label": "03-03-ClickonSignI-success", "isController": true}, {"data": [[1.71025032E12, 0.08333333333333333]], "isOverall": false, "label": "06-11-ClickonSignOut-312-0-success", "isController": false}, {"data": [[1.7102502E12, 0.08333333333333333]], "isOverall": false, "label": "03-02-ClickonENtertheStore-success", "isController": true}, {"data": [[1.71025026E12, 0.08333333333333333]], "isOverall": false, "label": "06-02-ClickonENtertheStore-302-success", "isController": false}, {"data": [[1.71025032E12, 0.08333333333333333]], "isOverall": false, "label": "03-05-ClickReptiles-306-success", "isController": false}, {"data": [[1.7102502E12, 0.16666666666666666]], "isOverall": false, "label": "02-01-EnterLandingURL-success", "isController": true}, {"data": [[1.71025038E12, 0.016666666666666666]], "isOverall": false, "label": "07-11-ClickonSignOut-312-failure", "isController": false}, {"data": [[1.71025032E12, 0.16666666666666666]], "isOverall": false, "label": "02-04-Credentials&ClickonLogin-304-success", "isController": false}, {"data": [[1.71025032E12, 0.16666666666666666]], "isOverall": false, "label": "02-06-ClickonProduct-success", "isController": true}, {"data": [[1.71025032E12, 0.08333333333333333]], "isOverall": false, "label": "06-04-Credentials&ClickonLogin-304-success", "isController": false}, {"data": [[1.71025032E12, 0.16666666666666666]], "isOverall": false, "label": "01-07-ClickonAddtoCart-308-success", "isController": false}, {"data": [[1.71025026E12, 0.08333333333333333]], "isOverall": false, "label": "03-02-ClickonENtertheStore-302-success", "isController": false}, {"data": [[1.71025026E12, 0.16666666666666666]], "isOverall": false, "label": "02-03-ClickonSignI-303-success", "isController": false}, {"data": [[1.71025032E12, 0.08333333333333333]], "isOverall": false, "label": "03-06-ClickonProduct-307-success", "isController": false}, {"data": [[1.71025032E12, 0.16666666666666666]], "isOverall": false, "label": "02-05-ClickDogs-306-success", "isController": false}, {"data": [[1.71025038E12, 0.15]], "isOverall": false, "label": "07-11-ClickonSignOut-312-success", "isController": false}, {"data": [[1.71025026E12, 0.16666666666666666]], "isOverall": false, "label": "02-02-ClickonENtertheStore-302-success", "isController": false}, {"data": [[1.71025032E12, 0.16666666666666666]], "isOverall": false, "label": "01-06-ClickonProduct-success", "isController": true}, {"data": [[1.7102502E12, 0.16666666666666666]], "isOverall": false, "label": "01-01-EnterLandingURL-success", "isController": true}, {"data": [[1.7102502E12, 0.16666666666666666]], "isOverall": false, "label": "01-01-EnterLandingURL-301-success", "isController": false}, {"data": [[1.71025026E12, 0.16666666666666666]], "isOverall": false, "label": "07-04-Credentials&ClickonLogin-success", "isController": true}, {"data": [[1.71025032E12, 0.16666666666666666]], "isOverall": false, "label": "01-08-EnterQuantity&ClickonProceedtoCheckout-success", "isController": true}, {"data": [[1.71025038E12, 0.16666666666666666]], "isOverall": false, "label": "02-09-PaymentDetails&ClickonContinue-success", "isController": true}, {"data": [[1.71025038E12, 0.16666666666666666]], "isOverall": false, "label": "01-09-PaymentDetails&ClickonContinue-success", "isController": true}, {"data": [[1.71025032E12, 0.16666666666666666]], "isOverall": false, "label": "02-07-ClickonAddtoCart-308-success", "isController": false}, {"data": [[1.71025026E12, 0.16666666666666666]], "isOverall": false, "label": "01-03-ClickonSignI-success", "isController": true}, {"data": [[1.7102502E12, 0.16666666666666666], [1.71025038E12, 0.16666666666666666]], "isOverall": false, "label": "07-02-ClickonENtertheStore-success", "isController": true}, {"data": [[1.71025032E12, 0.16666666666666666]], "isOverall": false, "label": "01-04-Credentials&ClickonLogin-304-success", "isController": false}, {"data": [[1.71025026E12, 0.16666666666666666]], "isOverall": false, "label": "07-03-ClickonSignI-303-success", "isController": false}, {"data": [[1.71025032E12, 0.08333333333333333]], "isOverall": false, "label": "03-04-Credentials&ClickonLogin-305-success", "isController": false}, {"data": [[1.7102502E12, 0.16666666666666666]], "isOverall": false, "label": "02-01-EnterLandingURL-301-success", "isController": false}, {"data": [[1.71025032E12, 0.16666666666666666]], "isOverall": false, "label": "02-07-ClickonAddtoCart-success", "isController": true}, {"data": [[1.71025032E12, 0.16666666666666666]], "isOverall": false, "label": "07-07-ClickonAddtoCart-success", "isController": true}, {"data": [[1.71025026E12, 0.08333333333333333]], "isOverall": false, "label": "06-03-ClickonSignI-success", "isController": true}, {"data": [[1.71025032E12, 0.16666666666666666]], "isOverall": false, "label": "02-06-ClickonProduct-307-success", "isController": false}, {"data": [[1.71025032E12, 0.08333333333333333]], "isOverall": false, "label": "06-11-ClickonSignOut-success", "isController": true}, {"data": [[1.71025032E12, 0.16666666666666666]], "isOverall": false, "label": "07-04-Credentials&ClickonLogin-305-success", "isController": false}, {"data": [[1.71025032E12, 0.16666666666666666]], "isOverall": false, "label": "07-06-ClickonProduct-success", "isController": true}, {"data": [[1.71025038E12, 0.15]], "isOverall": false, "label": "07-11-ClickonSignOut-312-0-success", "isController": false}, {"data": [[1.7102502E12, 0.08333333333333333]], "isOverall": false, "label": "03-01-EnterLandingURL-success", "isController": true}, {"data": [[1.71025038E12, 0.16666666666666666]], "isOverall": false, "label": "02-08-EnterQuantity&ClickonProceedtoCheckout-309-success", "isController": false}, {"data": [[1.7102502E12, 0.08333333333333333]], "isOverall": false, "label": "03-01-EnterLandingURL-301-success", "isController": false}, {"data": [[1.7102502E12, 0.16666666666666666]], "isOverall": false, "label": "01-02-ClickonENtertheStore-success", "isController": true}, {"data": [[1.71025032E12, 0.08333333333333333]], "isOverall": false, "label": "06-11-ClickonSignOut-313-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71025062E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.08333333333333333, "minX": 1.7102502E12, "maxY": 157.76666666666668, "series": [{"data": [[1.71025062E12, 0.08333333333333333], [1.71025026E12, 157.76666666666668], [1.7102502E12, 42.15], [1.71025038E12, 111.23333333333333], [1.71025032E12, 121.76666666666667]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.71025062E12, 0.26666666666666666], [1.71025038E12, 17.183333333333334], [1.71025032E12, 72.7]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71025062E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
