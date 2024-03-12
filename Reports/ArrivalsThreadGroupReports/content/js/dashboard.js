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
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 95.07869145717167, "KoPercent": 4.921308542828325};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9407895457483049, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.998533724340176, 500, 1500, "07-11-ClickonSignOut-312-1"], "isController": false}, {"data": [0.99860529986053, 500, 1500, "07-03-ClickonSignI-303"], "isController": false}, {"data": [0.999266862170088, 500, 1500, "07-11-ClickonSignOut-312-0"], "isController": false}, {"data": [1.0, 500, 1500, "01-05-ClickFish-306"], "isController": false}, {"data": [0.9975429975429976, 500, 1500, "03-05-ClickReptiles"], "isController": true}, {"data": [0.9965719882468168, 500, 1500, "01-02-ClickonENtertheStore-302"], "isController": false}, {"data": [0.999438202247191, 500, 1500, "02-07-ClickonAddtoCart"], "isController": true}, {"data": [0.9994908350305499, 500, 1500, "01-07-ClickonAddtoCart-308"], "isController": false}, {"data": [0.9965612104539202, 500, 1500, "06-11-ClickonSignOut"], "isController": true}, {"data": [0.9965132496513249, 500, 1500, "07-02-ClickonENtertheStore"], "isController": true}, {"data": [0.9984177215189873, 500, 1500, "01-09-PaymentDetails&ClickonContinue"], "isController": true}, {"data": [0.9993429697766097, 500, 1500, "06-02-ClickonENtertheStore-302"], "isController": false}, {"data": [1.0, 500, 1500, "07-01-EnterLandingURL"], "isController": true}, {"data": [0.9993122420907841, 500, 1500, "06-11-ClickonSignOut-313"], "isController": false}, {"data": [0.9986357435197817, 500, 1500, "06-11-ClickonSignOut-312"], "isController": false}, {"data": [1.0, 500, 1500, "07-11-ClickonSignOut-313"], "isController": false}, {"data": [0.9948224852071006, 500, 1500, "07-11-ClickonSignOut"], "isController": true}, {"data": [0.9970674486803519, 500, 1500, "07-11-ClickonSignOut-312"], "isController": false}, {"data": [1.0, 500, 1500, "07-07-ClickonAddtoCart-308"], "isController": false}, {"data": [1.0, 500, 1500, "03-01-EnterLandingURL"], "isController": true}, {"data": [0.9962168978562421, 500, 1500, "03-08-EnterQuantity&ClickonProceedtoCheckout"], "isController": true}, {"data": [0.9963768115942029, 500, 1500, "01-08-EnterQuantity&ClickonProceedtoCheckout"], "isController": true}, {"data": [1.0, 500, 1500, "01-05-ClickFish"], "isController": true}, {"data": [0.0, 500, 1500, "03-10-ClickonConfirm-311"], "isController": false}, {"data": [0.9980645161290322, 500, 1500, "03-09-PaymentDetails&ClickonContinue"], "isController": true}, {"data": [0.99813200498132, 500, 1500, "03-07-ClickonAddtoCart"], "isController": true}, {"data": [0.9965612104539202, 500, 1500, "07-02-ClickonENtertheStore-302"], "isController": false}, {"data": [0.9983783783783784, 500, 1500, "02-02-ClickonENtertheStore"], "isController": true}, {"data": [1.0, 500, 1500, "01-11-ClickonSignOut-312-0"], "isController": false}, {"data": [1.0, 500, 1500, "06-04-Credentials&ClickonLogin-305"], "isController": false}, {"data": [1.0, 500, 1500, "01-11-ClickonSignOut-312-1"], "isController": false}, {"data": [1.0, 500, 1500, "06-04-Credentials&ClickonLogin-304"], "isController": false}, {"data": [0.999348109517601, 500, 1500, "03-11-ClickonSignOut-312"], "isController": false}, {"data": [1.0, 500, 1500, "03-11-ClickonSignOut-313"], "isController": false}, {"data": [1.0, 500, 1500, "03-04-Credentials&ClickonLogin"], "isController": true}, {"data": [1.0, 500, 1500, "06-11-ClickonSignOut-312-1"], "isController": false}, {"data": [1.0, 500, 1500, "01-03-ClickonSignI"], "isController": true}, {"data": [1.0, 500, 1500, "06-11-ClickonSignOut-312-0"], "isController": false}, {"data": [0.9985915492957746, 500, 1500, "07-03-ClickonSignI"], "isController": true}, {"data": [0.9962640099626401, 500, 1500, "03-08-EnterQuantity&ClickonProceedtoCheckout-309"], "isController": false}, {"data": [0.9983333333333333, 500, 1500, "02-05-ClickDogs"], "isController": true}, {"data": [0.994199535962877, 500, 1500, "02-09-PaymentDetails&ClickonContinue"], "isController": true}, {"data": [0.9992721979621543, 500, 1500, "07-06-ClickonProduct"], "isController": true}, {"data": [0.9984472049689441, 500, 1500, "01-09-PaymentDetails&ClickonContinue-310"], "isController": false}, {"data": [0.9993429697766097, 500, 1500, "03-11-ClickonSignOut"], "isController": true}, {"data": [0.9971098265895953, 500, 1500, "07-05-ClickReptiles"], "isController": true}, {"data": [0.9964200477326969, 500, 1500, "03-02-ClickonENtertheStore"], "isController": true}, {"data": [0.9976580796252927, 500, 1500, "02-11-ClickonSignOut-312"], "isController": false}, {"data": [0.9975609756097561, 500, 1500, "03-05-ClickReptiles-306"], "isController": false}, {"data": [1.0, 500, 1500, "02-11-ClickonSignOut-313"], "isController": false}, {"data": [0.9966887417218543, 500, 1500, "02-04-Credentials&ClickonLogin"], "isController": true}, {"data": [0.9956427015250545, 500, 1500, "02-03-ClickonSignI"], "isController": true}, {"data": [0.9983443708609272, 500, 1500, "02-05-ClickDogs-306"], "isController": false}, {"data": [0.0, 500, 1500, "02-10-ClickonConfirm-311"], "isController": false}, {"data": [0.9994882292732856, 500, 1500, "01-07-ClickonAddtoCart"], "isController": true}, {"data": [0.998567335243553, 500, 1500, "07-04-Credentials&ClickonLogin"], "isController": true}, {"data": [0.9938888888888889, 500, 1500, "02-06-ClickonProduct-307"], "isController": false}, {"data": [0.9994652406417113, 500, 1500, "01-11-ClickonSignOut"], "isController": true}, {"data": [0.9967320261437909, 500, 1500, "02-04-Credentials&ClickonLogin-304"], "isController": false}, {"data": [0.0, 500, 1500, "02-10-ClickonConfirm"], "isController": true}, {"data": [0.9476003917727718, 500, 1500, "01-01-EnterLandingURL"], "isController": true}, {"data": [1.0, 500, 1500, "02-04-Credentials&ClickonLogin-305"], "isController": false}, {"data": [1.0, 500, 1500, "07-07-ClickonAddtoCart"], "isController": true}, {"data": [0.9943181818181818, 500, 1500, "02-09-PaymentDetails&ClickonContinue-310"], "isController": false}, {"data": [1.0, 500, 1500, "01-03-ClickonSignI-303"], "isController": false}, {"data": [0.9975429975429976, 500, 1500, "03-06-ClickonProduct-307"], "isController": false}, {"data": [1.0, 500, 1500, "08-01-Search API"], "isController": false}, {"data": [0.9959718026183283, 500, 1500, "01-04-Credentials&ClickonLogin"], "isController": true}, {"data": [0.9956756756756757, 500, 1500, "02-03-ClickonSignI-303"], "isController": false}, {"data": [0.9886363636363636, 500, 1500, "02-08-EnterQuantity&ClickonProceedtoCheckout"], "isController": true}, {"data": [0.0, 500, 1500, "03-10-ClickonConfirm"], "isController": true}, {"data": [0.9975247524752475, 500, 1500, "03-06-ClickonProduct"], "isController": true}, {"data": [0.9981435643564357, 500, 1500, "03-07-ClickonAddtoCart-308"], "isController": false}, {"data": [0.9993178717598908, 500, 1500, "06-04-Credentials&ClickonLogin"], "isController": true}, {"data": [0.0, 500, 1500, "01-10-ClickonConfirm"], "isController": true}, {"data": [0.996417604912999, 500, 1500, "01-08-EnterQuantity&ClickonProceedtoCheckout-309"], "isController": false}, {"data": [0.9992774566473989, 500, 1500, "07-06-ClickonProduct-307"], "isController": false}, {"data": [1.0, 500, 1500, "03-04-Credentials&ClickonLogin-304"], "isController": false}, {"data": [1.0, 500, 1500, "03-04-Credentials&ClickonLogin-305"], "isController": false}, {"data": [0.9994033412887828, 500, 1500, "03-03-ClickonSignI-303"], "isController": false}, {"data": [0.993854748603352, 500, 1500, "02-06-ClickonProduct"], "isController": true}, {"data": [0.997134670487106, 500, 1500, "07-05-ClickReptiles-306"], "isController": false}, {"data": [1.0, 500, 1500, "01-11-ClickonSignOut-313"], "isController": false}, {"data": [1.0, 500, 1500, "01-11-ClickonSignOut-312"], "isController": false}, {"data": [1.0, 500, 1500, "03-11-ClickonSignOut-312-1"], "isController": false}, {"data": [0.998108448928121, 500, 1500, "03-09-PaymentDetails&ClickonContinue-310"], "isController": false}, {"data": [0.999348109517601, 500, 1500, "03-11-ClickonSignOut-312-0"], "isController": false}, {"data": [0.9993990384615384, 500, 1500, "03-03-ClickonSignI"], "isController": true}, {"data": [0.9979865771812081, 500, 1500, "06-03-ClickonSignI"], "isController": true}, {"data": [1.0, 500, 1500, "06-01-EnterLandingURL"], "isController": true}, {"data": [1.0, 500, 1500, "07-04-Credentials&ClickonLogin-305"], "isController": false}, {"data": [0.9985915492957746, 500, 1500, "07-04-Credentials&ClickonLogin-304"], "isController": false}, {"data": [0.9994908350305499, 500, 1500, "01-06-ClickonProduct"], "isController": true}, {"data": [0.9983957219251337, 500, 1500, "02-02-ClickonENtertheStore-302"], "isController": false}, {"data": [0.9994413407821229, 500, 1500, "02-07-ClickonAddtoCart-308"], "isController": false}, {"data": [1.0, 500, 1500, "02-01-EnterLandingURL"], "isController": true}, {"data": [0.9993351063829787, 500, 1500, "06-02-ClickonENtertheStore"], "isController": true}, {"data": [0.9964622641509434, 500, 1500, "03-02-ClickonENtertheStore-302"], "isController": false}, {"data": [0.9887640449438202, 500, 1500, "02-08-EnterQuantity&ClickonProceedtoCheckout-309"], "isController": false}, {"data": [1.0, 500, 1500, "01-04-Credentials&ClickonLogin-305"], "isController": false}, {"data": [0.9994934143870314, 500, 1500, "01-06-ClickonProduct-307"], "isController": false}, {"data": [0.9980053191489362, 500, 1500, "06-03-ClickonSignI-303"], "isController": false}, {"data": [0.9975124378109452, 500, 1500, "01-04-Credentials&ClickonLogin-304"], "isController": false}, {"data": [0.9965415019762845, 500, 1500, "01-02-ClickonENtertheStore"], "isController": true}, {"data": [0.9476003917727718, 500, 1500, "01-01-EnterLandingURL-301"], "isController": false}, {"data": [0.0, 500, 1500, "01-10-ClickonConfirm-311"], "isController": false}, {"data": [0.9994145199063232, 500, 1500, "02-11-ClickonSignOut-312-0"], "isController": false}, {"data": [0.9994145199063232, 500, 1500, "02-11-ClickonSignOut-312-1"], "isController": false}, {"data": [0.9970518867924528, 500, 1500, "02-11-ClickonSignOut"], "isController": true}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 52547, 2586, 4.921308542828325, 80.4681523207803, 27, 247935, 47.0, 101.0, 122.0, 189.0, 16.550601115615148, 39.313364905879816, 12.263527943431036], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["07-11-ClickonSignOut-312-1", 682, 0, 0.0, 38.97507331378302, 28, 1258, 31.5, 46.0, 64.0, 158.0, 0.3246488960271448, 0.6100606132758073, 0.19688180120396184], "isController": false}, {"data": ["07-03-ClickonSignI-303", 717, 0, 0.0, 56.87308228730829, 30, 1508, 46.0, 75.20000000000005, 100.10000000000002, 253.1200000000008, 0.3251628421862734, 0.5862694795841271, 0.19370052122424491], "isController": false}, {"data": ["07-11-ClickonSignOut-312-0", 682, 0, 0.0, 67.04838709677419, 29, 838, 47.0, 104.70000000000005, 124.85000000000002, 295.05999999999926, 0.3246485869456042, 0.07196799730141812, 0.19973497048411196], "isController": false}, {"data": ["01-05-ClickFish-306", 993, 0, 0.0, 54.66062437059415, 31, 409, 47.0, 74.0, 97.0, 190.23999999999978, 0.32729361797221, 0.5104248569038023, 0.20072303914701944], "isController": false}, {"data": ["03-05-ClickReptiles", 814, 0, 0.0, 116.38820638820634, 31, 1393, 100.0, 163.5, 204.25, 431.5500000000005, 0.32601978307268437, 0.5005155575819425, 0.2012153348651724], "isController": true}, {"data": ["01-02-ClickonENtertheStore-302", 1021, 0, 0.0, 60.56415279138102, 30, 4102, 46.0, 70.80000000000007, 94.89999999999998, 206.95999999999913, 0.3274533908103301, 0.632224417884247, 0.16724426112676039], "isController": false}, {"data": ["02-07-ClickonAddtoCart", 890, 0, 0.0, 55.10112359550565, 31, 1249, 47.0, 70.89999999999998, 95.44999999999993, 177.9800000000007, 0.3266436229989408, 0.6409467147221217, 0.21116999846220588], "isController": true}, {"data": ["01-07-ClickonAddtoCart-308", 982, 0, 0.0, 54.6720977596742, 30, 609, 47.0, 73.0, 97.84999999999991, 174.01999999999975, 0.32722698456335025, 0.6447022556210898, 0.21154713259857214], "isController": false}, {"data": ["06-11-ClickonSignOut", 727, 0, 0.0, 144.47180192572213, 86, 1175, 117.0, 206.20000000000005, 282.8000000000002, 440.2000000000003, 0.32515001849374586, 1.2678120056500966, 0.5944148775588792], "isController": true}, {"data": ["07-02-ClickonENtertheStore", 717, 0, 0.0, 105.09623430962337, 32, 1411, 96.0, 140.20000000000005, 170.20000000000005, 416.2800000000002, 0.3251478016698176, 0.5847246968574942, 0.18289563843927242], "isController": true}, {"data": ["01-09-PaymentDetails&ClickonContinue", 948, 0, 0.0, 59.62974683544308, 31, 1277, 47.5, 92.10000000000002, 114.0, 185.15999999999985, 0.32700739595524964, 0.5728207828722632, 0.404607783862599], "isController": true}, {"data": ["06-02-ClickonENtertheStore-302", 761, 0, 0.0, 63.440210249671516, 30, 920, 47.0, 110.0, 138.79999999999995, 232.27999999999997, 0.32543703071424235, 0.5852432468074243, 0.18305832977676134], "isController": false}, {"data": ["07-01-EnterLandingURL", 727, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, 0.32518579649273477, 0.0, 0.0], "isController": true}, {"data": ["06-11-ClickonSignOut-313", 727, 0, 0.0, 40.404401650618944, 28, 665, 32.0, 53.0, 67.0, 177.0400000000002, 0.32518056019619973, 0.5848011012919553, 0.1972042264471094], "isController": false}, {"data": ["06-11-ClickonSignOut-312", 733, 0, 0.0, 103.85675306957708, 58, 510, 82.0, 160.20000000000005, 207.19999999999982, 340.9199999999996, 0.3251611277634814, 0.6830951729542242, 0.3972427449532376], "isController": false}, {"data": ["07-11-ClickonSignOut-313", 676, 0, 0.0, 36.85207100591721, 28, 362, 31.0, 45.0, 61.14999999999998, 136.99000000000024, 0.32460688233816837, 0.5837863153949616, 0.19685632219922125], "isController": false}, {"data": ["07-11-ClickonSignOut", 676, 0, 0.0, 143.22928994082855, 86, 1599, 114.0, 193.0, 237.0, 494.6800000000003, 0.32458459413961555, 1.2656367450347201, 0.5933812111614847], "isController": true}, {"data": ["07-11-ClickonSignOut-312", 682, 0, 0.0, 106.15689149560099, 57, 1568, 81.0, 147.70000000000005, 187.10000000000014, 358.05999999999926, 0.3246439507931166, 0.6820182900510434, 0.3966109203537001], "isController": false}, {"data": ["07-07-ClickonAddtoCart-308", 687, 0, 0.0, 51.00582241630277, 31, 177, 47.0, 64.0, 77.0, 132.72000000000003, 0.3247967420097401, 0.6394754427719488, 0.210293203078572], "isController": false}, {"data": ["03-01-EnterLandingURL", 848, 0, 0.0, 0.0011792452830188679, 0, 1, 0.0, 0.0, 0.0, 0.0, 0.3262877496264813, 0.0, 0.0], "isController": true}, {"data": ["03-08-EnterQuantity&ClickonProceedtoCheckout", 793, 0, 0.0, 118.24590163934424, 30, 1173, 100.0, 170.60000000000002, 209.5999999999999, 383.91999999999825, 0.32578789934180985, 0.6119066670049164, 0.2042537415795331], "isController": true}, {"data": ["01-08-EnterQuantity&ClickonProceedtoCheckout", 966, 0, 0.0, 128.62732919254668, 34, 1126, 103.0, 184.60000000000014, 232.29999999999995, 427.6000000000008, 0.3271208589665487, 0.6143790882699743, 0.20508944478176197], "isController": true}, {"data": ["01-05-ClickFish", 987, 0, 0.0, 54.666666666666664, 31, 409, 47.0, 74.0, 97.0, 190.48000000000002, 0.32726353965857163, 0.5103811105358302, 0.20070459268123336], "isController": true}, {"data": ["03-10-ClickonConfirm-311", 775, 775, 100.0, 149.28645161290314, 60, 1782, 129.0, 199.39999999999998, 254.79999999999973, 532.6000000000001, 0.32545344063078335, 4.995025860819101, 0.1967340622563036], "isController": false}, {"data": ["03-09-PaymentDetails&ClickonContinue", 775, 0, 0.0, 67.68129032258065, 32, 1333, 48.0, 109.0, 138.0, 263.76000000000045, 0.3254537139727988, 0.570008640402412, 0.40268540586282814], "isController": true}, {"data": ["03-07-ClickonAddtoCart", 803, 0, 0.0, 57.96762141967616, 30, 1554, 48.0, 79.0, 98.79999999999995, 178.96000000000004, 0.3258943120281787, 0.6416408895291335, 0.2110038367916821], "isController": true}, {"data": ["07-02-ClickonENtertheStore-302", 727, 0, 0.0, 105.00137551581838, 32, 1411, 96.0, 139.20000000000005, 170.0, 415.8800000000001, 0.32516456144603856, 0.5847509267972721, 0.1829050658133967], "isController": false}, {"data": ["02-02-ClickonENtertheStore", 925, 0, 0.0, 323.94378378378394, 30, 247935, 46.0, 88.0, 115.0, 225.66000000000008, 0.326852929255952, 0.5878021352285975, 0.18385477270647302], "isController": true}, {"data": ["01-11-ClickonSignOut-312-0", 941, 0, 0.0, 52.71307120085015, 29, 443, 46.0, 71.0, 90.79999999999995, 160.9000000000002, 0.32695964706426023, 0.07248031238631551, 0.20115681411180075], "isController": false}, {"data": ["06-04-Credentials&ClickonLogin-305", 733, 0, 0.0, 37.79672578444745, 27, 500, 32.0, 47.60000000000002, 60.299999999999955, 130.27999999999975, 0.3251680515513355, 0.5847100273420639, 0.19370362445929165], "isController": false}, {"data": ["01-11-ClickonSignOut-312-1", 941, 0, 0.0, 38.2816153028693, 28, 365, 32.0, 52.0, 62.0, 135.44000000000074, 0.3269614647595652, 0.6143883023542268, 0.19828424767157227], "isController": false}, {"data": ["06-04-Credentials&ClickonLogin-304", 745, 0, 0.0, 54.852348993288565, 32, 406, 47.0, 72.39999999999998, 98.0, 187.47999999999956, 0.3253549316601792, 0.6014229924727281, 0.3021606836023735], "isController": false}, {"data": ["03-11-ClickonSignOut-312", 767, 0, 0.0, 90.83181225554115, 58, 1147, 78.0, 120.40000000000009, 158.0, 305.27999999999975, 0.3255430775832395, 0.6839058188649879, 0.39770936528968026], "isController": false}, {"data": ["03-11-ClickonSignOut-313", 761, 0, 0.0, 36.2010512483574, 27, 204, 31.0, 46.0, 61.0, 126.41999999999996, 0.3254420409535238, 0.5852814907939673, 0.19736280022669753], "isController": false}, {"data": ["03-04-Credentials&ClickonLogin", 820, 0, 0.0, 96.13536585365856, 61, 456, 82.0, 133.89999999999998, 174.94999999999993, 282.7499999999991, 0.3260635736488144, 1.189317739185525, 0.4983295827738228], "isController": true}, {"data": ["06-11-ClickonSignOut-312-1", 733, 0, 0.0, 38.589358799454324, 28, 379, 32.0, 51.0, 61.0, 150.65999999999997, 0.3251833426274548, 0.6110552999394885, 0.1972059138395014], "isController": false}, {"data": ["01-03-ClickonSignI", 1005, 0, 0.0, 52.572139303482544, 30, 410, 47.0, 70.0, 94.39999999999986, 172.87999999999988, 0.32737020097272923, 0.5906666684446723, 0.19501545175133286], "isController": true}, {"data": ["06-11-ClickonSignOut-312-0", 733, 0, 0.0, 65.16507503410641, 30, 411, 47.0, 107.0, 142.29999999999995, 277.29999999999984, 0.32516559934274847, 0.0720826084480507, 0.2000530542831363], "isController": false}, {"data": ["07-03-ClickonSignI", 710, 0, 0.0, 56.98169014084513, 30, 1508, 46.0, 75.89999999999998, 100.44999999999993, 254.23999999999978, 0.3249700089298097, 0.5859293650223337, 0.19358564985076554], "isController": true}, {"data": ["03-08-EnterQuantity&ClickonProceedtoCheckout-309", 803, 0, 0.0, 118.04981320049811, 30, 1173, 100.0, 170.0, 208.79999999999995, 381.6400000000003, 0.32587526728467986, 0.6120849763638976, 0.20430851718434032], "isController": false}, {"data": ["02-05-ClickDogs", 900, 0, 0.0, 60.02888888888884, 30, 1153, 47.0, 90.89999999999998, 118.0, 259.99, 0.3267151729793483, 0.5241084260569144, 0.20036828967874096], "isController": true}, {"data": ["02-09-PaymentDetails&ClickonContinue", 862, 0, 0.0, 123.49419953596292, 30, 1149, 101.0, 168.70000000000005, 206.0, 559.2900000000001, 0.32640276510852895, 0.5716171466671135, 0.40385967128174427], "isController": true}, {"data": ["07-06-ClickonProduct", 687, 0, 0.0, 56.19796215429406, 30, 1234, 47.0, 72.0, 107.60000000000002, 236.80000000000007, 0.3248097947882921, 0.5255696811273217, 0.2093500630471414], "isController": true}, {"data": ["01-09-PaymentDetails&ClickonContinue-310", 966, 0, 0.0, 59.43478260869569, 31, 1277, 47.0, 90.60000000000014, 114.0, 182.28000000000065, 0.3271288349167701, 0.5730207948832783, 0.4047580408589333], "isController": false}, {"data": ["03-11-ClickonSignOut", 761, 0, 0.0, 127.06044678055191, 87, 1180, 110.0, 173.4000000000002, 221.89999999999998, 350.9799999999999, 0.3254286806582468, 1.2689227082561811, 0.5949243068283575], "isController": true}, {"data": ["07-05-ClickReptiles", 692, 0, 0.0, 102.871387283237, 30, 1339, 96.0, 126.0, 184.35000000000002, 343.35000000000025, 0.32460694180388583, 0.4983521514181148, 0.20034334689458574], "isController": true}, {"data": ["03-02-ClickonENtertheStore", 838, 0, 0.0, 122.12649164677805, 32, 1171, 100.0, 189.10000000000002, 229.0999999999999, 441.61, 0.32623823566624816, 0.5866792339435701, 0.18350900756226457], "isController": true}, {"data": ["02-11-ClickonSignOut-312", 854, 0, 0.0, 96.88641686182672, 57, 1515, 80.0, 134.0, 173.0, 331.40000000000146, 0.32634805822905355, 0.6855997641523854, 0.3986927937935019], "isController": false}, {"data": ["03-05-ClickReptiles-306", 820, 0, 0.0, 116.24878048780484, 31, 1393, 100.0, 163.0, 204.0, 430.16999999999916, 0.32604814538248234, 0.5005589228144636, 0.20123283972825082], "isController": false}, {"data": ["02-11-ClickonSignOut-313", 848, 0, 0.0, 40.87264150943392, 28, 369, 32.0, 61.10000000000002, 79.0, 148.51, 0.3262838577217691, 0.5867779039792395, 0.19787331605978384], "isController": false}, {"data": ["02-04-Credentials&ClickonLogin", 906, 1, 0.11037527593818984, 97.30905077262703, 59, 1533, 80.0, 132.0, 167.64999999999998, 315.08999999999935, 0.326728324316449, 1.1908163144675374, 0.4980692522050556], "isController": true}, {"data": ["02-03-ClickonSignI", 918, 0, 0.0, 120.7712418300652, 33, 2137, 99.0, 170.10000000000002, 223.0, 443.8599999999997, 0.3268332210660032, 0.5896576394194687, 0.19469557114283395], "isController": true}, {"data": ["02-05-ClickDogs-306", 906, 0, 0.0, 60.086092715231736, 30, 1153, 47.0, 91.30000000000007, 118.64999999999998, 259.92999999999995, 0.326731387851074, 0.524130896987652, 0.20037823395554144], "isController": false}, {"data": ["02-10-ClickonConfirm-311", 862, 862, 100.0, 112.77842227378193, 59, 1513, 83.0, 204.4000000000001, 270.0, 333.81000000000006, 0.32640066400951784, 5.009585031680176, 0.19730665138856598], "isController": false}, {"data": ["01-07-ClickonAddtoCart", 977, 0, 0.0, 54.708290685772845, 30, 609, 47.0, 73.0, 98.09999999999991, 174.32000000000016, 0.32719444660267005, 0.6446399214858914, 0.211526097315398], "isController": true}, {"data": ["07-04-Credentials&ClickonLogin", 698, 0, 0.0, 112.23782234957038, 60, 1439, 83.0, 169.20000000000005, 226.0999999999999, 456.05999999999995, 0.3248374532929815, 1.1846124101345097, 0.4964556781284337], "isController": true}, {"data": ["02-06-ClickonProduct-307", 900, 0, 0.0, 125.7488888888887, 31, 1372, 100.0, 178.0, 235.0, 645.7600000000002, 0.3267055664094405, 0.5282778670092356, 0.2105719470998347], "isController": false}, {"data": ["01-11-ClickonSignOut", 935, 0, 0.0, 128.73368983957212, 87, 520, 113.0, 170.0, 211.39999999999986, 341.0, 0.3269213623005474, 1.2747010286659337, 0.5976531154556882], "isController": true}, {"data": ["02-04-Credentials&ClickonLogin-304", 918, 1, 0.10893246187363835, 59.30936819172114, 31, 1501, 48.0, 82.0, 106.0, 179.80999999999995, 0.32684532312113784, 0.6035494127020352, 0.30354482645332237], "isController": false}, {"data": ["02-10-ClickonConfirm", 854, 854, 100.0, 113.04098360655743, 59, 1513, 83.0, 205.0, 270.0, 334.8500000000006, 0.32634656170586773, 5.008755606693162, 0.19727394696868372], "isController": true}, {"data": ["01-01-EnterLandingURL", 1021, 0, 0.0, 246.35553379040203, 89, 8158, 106.0, 376.00000000000136, 1015.4999999999999, 4045.1599999999994, 0.32739007581597407, 0.33282526262151274, 0.7586881346790103], "isController": true}, {"data": ["02-04-Credentials&ClickonLogin-305", 906, 0, 0.0, 37.83222958057399, 27, 208, 32.0, 51.0, 70.0, 143.92999999999995, 0.3267348049382396, 0.5875291516597659, 0.19463694434797474], "isController": false}, {"data": ["07-07-ClickonAddtoCart", 682, 0, 0.0, 51.03812316715543, 31, 177, 47.0, 64.0, 77.0, 133.01999999999975, 0.32464163276652747, 0.6391707545371287, 0.2101927759025466], "isController": true}, {"data": ["02-09-PaymentDetails&ClickonContinue-310", 880, 0, 0.0, 123.00568181818184, 30, 1149, 101.0, 167.0, 205.89999999999986, 556.229999999999, 0.3265529075083419, 0.5718730976205797, 0.40404544317682545], "isController": false}, {"data": ["01-03-ClickonSignI-303", 1012, 0, 0.0, 52.51976284584975, 30, 410, 47.0, 70.0, 93.69999999999982, 172.74, 0.32739832211595077, 0.5907151760768882, 0.1950322036042285], "isController": false}, {"data": ["03-06-ClickonProduct-307", 814, 0, 0.0, 66.0798525798526, 29, 1870, 47.0, 101.0, 123.0, 322.0500000000012, 0.3260234392428887, 0.5276806641465935, 0.21013229482451806], "isController": false}, {"data": ["08-01-Search API", 676, 0, 0.0, 36.90236686390533, 28, 171, 31.0, 46.0, 66.0, 151.46000000000004, 0.32458708777199774, 1.1772621523292963, 0.09889762830553055], "isController": false}, {"data": ["01-04-Credentials&ClickonLogin", 993, 0, 0.0, 158.6203423967775, 65, 1258, 135.0, 212.0, 274.0999999999997, 484.71999999999935, 0.3272898423471527, 1.1932316638790998, 0.500122602367067], "isController": true}, {"data": ["02-03-ClickonSignI-303", 925, 0, 0.0, 120.84972972972957, 33, 2137, 99.0, 170.39999999999998, 223.0, 443.44000000000005, 0.3268305247696905, 0.5896654796829779, 0.19469396495069452], "isController": false}, {"data": ["02-08-EnterQuantity&ClickonProceedtoCheckout", 880, 0, 0.0, 81.52045454545471, 30, 1997, 48.0, 101.0, 138.94999999999993, 1322.929999999997, 0.3265483028023039, 0.6131032081190669, 0.20473047890535073], "isController": true}, {"data": ["03-10-ClickonConfirm", 767, 767, 100.0, 149.4367666232072, 60, 1782, 129.0, 200.0, 256.39999999999964, 533.799999999999, 0.32554515018369745, 4.996434226801619, 0.19678949996455933], "isController": true}, {"data": ["03-06-ClickonProduct", 808, 0, 0.0, 66.20544554455448, 29, 1870, 47.0, 101.0, 123.0, 325.2299999999983, 0.32596115172402385, 0.5275878410842566, 0.21009214857212477], "isController": true}, {"data": ["03-07-ClickonAddtoCart-308", 808, 0, 0.0, 57.89727722772272, 30, 1554, 48.0, 79.0, 98.54999999999995, 178.90999999999997, 0.3259604942335652, 0.6417816044265677, 0.21104668718442748], "isController": false}, {"data": ["06-04-Credentials&ClickonLogin", 733, 0, 0.0, 92.30422919508872, 60, 549, 80.0, 125.60000000000002, 153.29999999999995, 321.83999999999764, 0.3251501657023798, 1.1857334064459135, 0.495663485020913], "isController": true}, {"data": ["01-10-ClickonConfirm", 941, 941, 100.0, 188.9128586609989, 61, 1194, 135.0, 348.80000000000007, 502.9, 624.3200000000002, 0.326937381936866, 5.017806697925494, 0.19763109318253913], "isController": true}, {"data": ["01-08-EnterQuantity&ClickonProceedtoCheckout-309", 977, 0, 0.0, 128.2876151484136, 34, 1126, 102.0, 184.0, 231.19999999999982, 425.40000000000055, 0.32718096925269124, 0.6144820485815182, 0.20512713111350367], "isController": false}, {"data": ["07-06-ClickonProduct-307", 692, 0, 0.0, 56.12572254335264, 30, 1234, 47.0, 72.0, 107.35000000000002, 236.05000000000075, 0.3246212556556575, 0.5252583820421585, 0.20922854368431051], "isController": false}, {"data": ["03-04-Credentials&ClickonLogin-304", 832, 0, 0.0, 56.90745192307696, 31, 386, 48.0, 83.70000000000005, 104.39999999999964, 193.6999999999996, 0.3261680894704159, 0.6031411393419873, 0.3041899662541477], "isController": false}, {"data": ["03-04-Credentials&ClickonLogin-305", 820, 0, 0.0, 39.0878048780488, 28, 362, 32.0, 54.89999999999998, 65.94999999999993, 133.78999999999996, 0.3260664260932669, 0.586386400519917, 0.19423878898134067], "isController": false}, {"data": ["03-03-ClickonSignI-303", 838, 0, 0.0, 63.674224343675455, 30, 1251, 47.0, 105.0, 130.0, 255.5400000000002, 0.32624191889423454, 0.5886434337633524, 0.19434333059129205], "isController": false}, {"data": ["02-06-ClickonProduct", 895, 0, 0.0, 125.87932960893836, 31, 1372, 100.0, 178.39999999999998, 235.19999999999993, 647.5599999999986, 0.3266668953943253, 0.5282203128227889, 0.21054702242212373], "isController": true}, {"data": ["07-05-ClickReptiles-306", 698, 0, 0.0, 102.83381088825215, 30, 1339, 96.0, 126.0, 184.04999999999995, 343.04999999999995, 0.32481553455888373, 0.4986857702583913, 0.20047208773556108], "isController": false}, {"data": ["01-11-ClickonSignOut-313", 935, 0, 0.0, 37.55508021390375, 28, 216, 32.0, 50.0, 61.0, 135.19999999999993, 0.3269342795662229, 0.5879374046295992, 0.1982677613385004], "isController": false}, {"data": ["01-11-ClickonSignOut-312", 941, 0, 0.0, 91.10308182784281, 57, 477, 79.0, 123.0, 152.89999999999998, 291.9000000000002, 0.3269561253371192, 0.6868578008178767, 0.39943565702806266], "isController": false}, {"data": ["03-11-ClickonSignOut-312-1", 767, 0, 0.0, 37.610169491525404, 27, 379, 32.0, 49.0, 67.0, 128.91999999999962, 0.3255481900454409, 0.6117491381674056, 0.19742717384591682], "isController": false}, {"data": ["03-09-PaymentDetails&ClickonContinue-310", 793, 0, 0.0, 67.26229508196724, 32, 1333, 48.0, 107.60000000000002, 136.5999999999999, 254.93999999999733, 0.32579994568631426, 0.5706185248287907, 0.40311379998492197], "isController": false}, {"data": ["03-11-ClickonSignOut-312-0", 767, 0, 0.0, 53.11342894393741, 29, 1113, 45.0, 71.20000000000005, 90.0, 193.27999999999815, 0.3255483282223236, 0.07216745166647212, 0.20028852224615612], "isController": false}, {"data": ["03-03-ClickonSignI", 832, 0, 0.0, 63.80769230769234, 30, 1251, 47.0, 105.0, 130.0, 256.3799999999994, 0.32616540427849033, 0.5885159879606939, 0.19429775059558507], "isController": true}, {"data": ["06-03-ClickonSignI", 745, 0, 0.0, 106.90201342281878, 30, 1247, 96.0, 143.39999999999998, 191.39999999999986, 339.8599999999997, 0.32533731365704904, 0.5872051077903657, 0.1938044544246093], "isController": true}, {"data": ["06-01-EnterLandingURL", 761, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, 0.3254460770918036, 0.0, 0.0], "isController": true}, {"data": ["07-04-Credentials&ClickonLogin-305", 698, 0, 0.0, 39.16045845272201, 27, 444, 32.0, 49.0, 63.049999999999955, 161.2299999999998, 0.32483941856536397, 0.5841557624790925, 0.19350785676257032], "isController": false}, {"data": ["07-04-Credentials&ClickonLogin-304", 710, 0, 0.0, 72.63802816901416, 31, 1304, 49.0, 118.0, 164.0, 373.8099999999996, 0.3249646543726283, 0.6006920502775244, 0.30306762199791015], "isController": false}, {"data": ["01-06-ClickonProduct", 982, 0, 0.0, 55.22199592668025, 30, 648, 47.0, 75.70000000000005, 99.0, 177.33999999999992, 0.32722349531340644, 0.5291596183381112, 0.210905768463719], "isController": true}, {"data": ["02-02-ClickonENtertheStore-302", 935, 0, 0.0, 320.96256684492, 30, 247935, 46.0, 88.0, 115.0, 224.75999999999988, 0.3269340509331782, 0.5879523594804231, 0.18390040364991272], "isController": false}, {"data": ["02-07-ClickonAddtoCart-308", 895, 0, 0.0, 55.056983240223495, 31, 1249, 47.0, 70.39999999999998, 95.19999999999993, 176.8799999999992, 0.32666796847197865, 0.6409946400903721, 0.21118573743012684], "isController": false}, {"data": ["02-01-EnterLandingURL", 935, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, 0.32693793773842866, 0.0, 0.0], "isController": true}, {"data": ["06-02-ClickonENtertheStore", 752, 0, 0.0, 63.643617021276626, 30, 920, 47.0, 110.70000000000005, 140.05000000000007, 232.82000000000016, 0.3254719451406649, 0.5853057856533525, 0.183077969141624], "isController": true}, {"data": ["03-02-ClickonENtertheStore-302", 848, 0, 0.0, 121.8195754716981, 32, 1171, 99.0, 189.0, 228.54999999999995, 441.51, 0.32626728677971106, 0.5867338255541542, 0.18352534881358748], "isController": false}, {"data": ["02-08-EnterQuantity&ClickonProceedtoCheckout-309", 890, 0, 0.0, 81.13820224719117, 30, 1997, 48.0, 101.0, 138.44999999999993, 1318.2300000000014, 0.32665549186792986, 0.613321349312904, 0.20479768142501073], "isController": false}, {"data": ["01-04-Credentials&ClickonLogin-305", 993, 0, 0.0, 38.36757301107753, 28, 471, 32.0, 51.0, 68.29999999999995, 123.71999999999935, 0.32729717792705193, 0.5885875323218324, 0.19497195169482587], "isController": false}, {"data": ["01-06-ClickonProduct-307", 987, 0, 0.0, 55.16818642350558, 30, 648, 47.0, 75.20000000000005, 99.0, 177.24, 0.3272640822198784, 0.5292227739162237, 0.21093192799328098], "isController": false}, {"data": ["06-03-ClickonSignI-303", 752, 0, 0.0, 106.87898936170212, 30, 1247, 96.0, 141.80000000000018, 190.70000000000005, 339.23000000000025, 0.3254516615562389, 0.5874019411871628, 0.19387257182549383], "isController": false}, {"data": ["01-04-Credentials&ClickonLogin-304", 1005, 0, 0.0, 120.05074626865682, 35, 1196, 101.0, 154.39999999999998, 207.0999999999998, 414.93999999999994, 0.32735260663877597, 0.6047673364759727, 0.30521355441740355], "isController": false}, {"data": ["01-02-ClickonENtertheStore", 1012, 0, 0.0, 60.69960474308301, 30, 4102, 46.5, 71.0, 95.0, 209.84000000000015, 0.32739768660535834, 0.6321167470589206, 0.16721581063926017], "isController": true}, {"data": ["01-01-EnterLandingURL-301", 1021, 0, 0.0, 246.35553379040198, 89, 8158, 106.0, 376.00000000000136, 1015.4999999999999, 4045.1599999999994, 0.32739364516429004, 0.3328288912265878, 0.7586964062254494], "isController": false}, {"data": ["01-10-ClickonConfirm-311", 948, 948, 100.0, 188.45253164556956, 61, 1194, 135.0, 348.1, 502.54999999999995, 624.04, 0.3270001769526274, 5.0187698489624815, 0.19766905227898082], "isController": false}, {"data": ["02-11-ClickonSignOut-312-0", 854, 0, 0.0, 55.05971896955502, 29, 1124, 46.0, 79.0, 99.25, 224.0, 0.326352423166742, 0.07234570318247113, 0.20078322909672605], "isController": false}, {"data": ["02-11-ClickonSignOut-312-1", 854, 0, 0.0, 41.69789227166278, 28, 1238, 32.0, 57.5, 73.75, 160.25000000000023, 0.32635354559816326, 0.6132653401452312, 0.19791557794576112], "isController": false}, {"data": ["02-11-ClickonSignOut", 848, 0, 0.0, 137.89150943396245, 86, 1546, 115.0, 196.10000000000002, 244.54999999999995, 431.54999999999995, 0.3262731868464196, 1.2721998568033923, 0.5964681697036108], "isController": true}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["502/Bad Gateway", 1, 0.038669760247486466, 0.0019030582145507832], "isController": false}, {"data": ["500", 2585, 99.96133023975251, 4.919405484613774], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 52547, 2586, "500", 2585, "502/Bad Gateway", 1, "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["03-10-ClickonConfirm-311", 775, 775, "500", 775, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["02-10-ClickonConfirm-311", 862, 862, "500", 862, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["02-04-Credentials&ClickonLogin-304", 918, 1, "502/Bad Gateway", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["01-10-ClickonConfirm-311", 948, 948, "500", 948, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
