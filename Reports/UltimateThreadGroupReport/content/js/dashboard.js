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

    var data = {"OkPercent": 82.5717048018047, "KoPercent": 17.428295198195293};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.8246678772818503, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "02-04-Credentials&ClickonLogin-304"], "isController": false}, {"data": [0.95, 500, 1500, "01-01-EnterLandingURL"], "isController": true}, {"data": [1.0, 500, 1500, "02-04-Credentials&ClickonLogin-305"], "isController": false}, {"data": [1.0, 500, 1500, "07-07-ClickonAddtoCart"], "isController": true}, {"data": [1.0, 500, 1500, "07-11-ClickonSignOut-312-1"], "isController": false}, {"data": [1.0, 500, 1500, "07-03-ClickonSignI-303"], "isController": false}, {"data": [1.0, 500, 1500, "07-11-ClickonSignOut-312-0"], "isController": false}, {"data": [1.0, 500, 1500, "01-05-ClickFish-306"], "isController": false}, {"data": [1.0, 500, 1500, "03-05-ClickReptiles"], "isController": true}, {"data": [1.0, 500, 1500, "01-02-ClickonENtertheStore-302"], "isController": false}, {"data": [1.0, 500, 1500, "02-07-ClickonAddtoCart"], "isController": true}, {"data": [1.0, 500, 1500, "01-07-ClickonAddtoCart-308"], "isController": false}, {"data": [1.0, 500, 1500, "01-03-ClickonSignI-303"], "isController": false}, {"data": [1.0, 500, 1500, "03-06-ClickonProduct-307"], "isController": false}, {"data": [1.0, 500, 1500, "06-11-ClickonSignOut"], "isController": true}, {"data": [1.0, 500, 1500, "07-02-ClickonENtertheStore"], "isController": true}, {"data": [1.0, 500, 1500, "01-09-PaymentDetails&ClickonContinue"], "isController": true}, {"data": [0.8205668201260325, 500, 1500, "08-01-Search API"], "isController": false}, {"data": [1.0, 500, 1500, "06-02-ClickonENtertheStore-302"], "isController": false}, {"data": [1.0, 500, 1500, "01-04-Credentials&ClickonLogin"], "isController": true}, {"data": [0.95, 500, 1500, "02-01-EnterLandingURL-301"], "isController": false}, {"data": [1.0, 500, 1500, "02-03-ClickonSignI-303"], "isController": false}, {"data": [0.975, 500, 1500, "07-01-EnterLandingURL"], "isController": true}, {"data": [1.0, 500, 1500, "06-11-ClickonSignOut-313"], "isController": false}, {"data": [1.0, 500, 1500, "06-11-ClickonSignOut-312"], "isController": false}, {"data": [0.9, 500, 1500, "07-11-ClickonSignOut-313"], "isController": false}, {"data": [0.9, 500, 1500, "07-11-ClickonSignOut"], "isController": true}, {"data": [0.9, 500, 1500, "07-11-ClickonSignOut-312"], "isController": false}, {"data": [1.0, 500, 1500, "02-08-EnterQuantity&ClickonProceedtoCheckout"], "isController": true}, {"data": [0.95, 500, 1500, "06-01-EnterLandingURL-301"], "isController": false}, {"data": [1.0, 500, 1500, "07-07-ClickonAddtoCart-308"], "isController": false}, {"data": [0.9, 500, 1500, "03-01-EnterLandingURL"], "isController": true}, {"data": [1.0, 500, 1500, "01-08-EnterQuantity&ClickonProceedtoCheckout"], "isController": true}, {"data": [1.0, 500, 1500, "01-05-ClickFish"], "isController": true}, {"data": [1.0, 500, 1500, "03-06-ClickonProduct"], "isController": true}, {"data": [1.0, 500, 1500, "07-02-ClickonENtertheStore-302"], "isController": false}, {"data": [1.0, 500, 1500, "03-07-ClickonAddtoCart"], "isController": true}, {"data": [1.0, 500, 1500, "02-02-ClickonENtertheStore"], "isController": true}, {"data": [1.0, 500, 1500, "06-04-Credentials&ClickonLogin"], "isController": true}, {"data": [1.0, 500, 1500, "06-04-Credentials&ClickonLogin-305"], "isController": false}, {"data": [1.0, 500, 1500, "06-04-Credentials&ClickonLogin-304"], "isController": false}, {"data": [1.0, 500, 1500, "01-08-EnterQuantity&ClickonProceedtoCheckout-309"], "isController": false}, {"data": [0.9, 500, 1500, "03-01-EnterLandingURL-301"], "isController": false}, {"data": [1.0, 500, 1500, "03-04-Credentials&ClickonLogin"], "isController": true}, {"data": [1.0, 500, 1500, "07-06-ClickonProduct-307"], "isController": false}, {"data": [1.0, 500, 1500, "06-11-ClickonSignOut-312-1"], "isController": false}, {"data": [1.0, 500, 1500, "01-03-ClickonSignI"], "isController": true}, {"data": [1.0, 500, 1500, "06-11-ClickonSignOut-312-0"], "isController": false}, {"data": [1.0, 500, 1500, "07-03-ClickonSignI"], "isController": true}, {"data": [1.0, 500, 1500, "03-04-Credentials&ClickonLogin-304"], "isController": false}, {"data": [1.0, 500, 1500, "03-04-Credentials&ClickonLogin-305"], "isController": false}, {"data": [1.0, 500, 1500, "02-05-ClickDogs"], "isController": true}, {"data": [0.975, 500, 1500, "07-01-EnterLandingURL-301"], "isController": false}, {"data": [1.0, 500, 1500, "02-09-PaymentDetails&ClickonContinue"], "isController": true}, {"data": [1.0, 500, 1500, "03-03-ClickonSignI-303"], "isController": false}, {"data": [1.0, 500, 1500, "02-06-ClickonProduct"], "isController": true}, {"data": [1.0, 500, 1500, "07-05-ClickReptiles-306"], "isController": false}, {"data": [1.0, 500, 1500, "07-06-ClickonProduct"], "isController": true}, {"data": [1.0, 500, 1500, "06-03-ClickonSignI"], "isController": true}, {"data": [1.0, 500, 1500, "03-03-ClickonSignI"], "isController": true}, {"data": [0.95, 500, 1500, "06-01-EnterLandingURL"], "isController": true}, {"data": [1.0, 500, 1500, "07-04-Credentials&ClickonLogin-305"], "isController": false}, {"data": [1.0, 500, 1500, "07-04-Credentials&ClickonLogin-304"], "isController": false}, {"data": [1.0, 500, 1500, "07-05-ClickReptiles"], "isController": true}, {"data": [1.0, 500, 1500, "01-06-ClickonProduct"], "isController": true}, {"data": [1.0, 500, 1500, "02-02-ClickonENtertheStore-302"], "isController": false}, {"data": [1.0, 500, 1500, "03-02-ClickonENtertheStore"], "isController": true}, {"data": [1.0, 500, 1500, "02-07-ClickonAddtoCart-308"], "isController": false}, {"data": [0.95, 500, 1500, "02-01-EnterLandingURL"], "isController": true}, {"data": [1.0, 500, 1500, "03-05-ClickReptiles-306"], "isController": false}, {"data": [1.0, 500, 1500, "06-02-ClickonENtertheStore"], "isController": true}, {"data": [1.0, 500, 1500, "02-04-Credentials&ClickonLogin"], "isController": true}, {"data": [1.0, 500, 1500, "02-03-ClickonSignI"], "isController": true}, {"data": [1.0, 500, 1500, "03-02-ClickonENtertheStore-302"], "isController": false}, {"data": [1.0, 500, 1500, "02-05-ClickDogs-306"], "isController": false}, {"data": [1.0, 500, 1500, "02-08-EnterQuantity&ClickonProceedtoCheckout-309"], "isController": false}, {"data": [1.0, 500, 1500, "01-04-Credentials&ClickonLogin-305"], "isController": false}, {"data": [1.0, 500, 1500, "06-03-ClickonSignI-303"], "isController": false}, {"data": [1.0, 500, 1500, "01-06-ClickonProduct-307"], "isController": false}, {"data": [1.0, 500, 1500, "01-04-Credentials&ClickonLogin-304"], "isController": false}, {"data": [1.0, 500, 1500, "01-07-ClickonAddtoCart"], "isController": true}, {"data": [1.0, 500, 1500, "01-02-ClickonENtertheStore"], "isController": true}, {"data": [1.0, 500, 1500, "07-04-Credentials&ClickonLogin"], "isController": true}, {"data": [0.95, 500, 1500, "01-01-EnterLandingURL-301"], "isController": false}, {"data": [1.0, 500, 1500, "02-06-ClickonProduct-307"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 31030, 5408, 17.428295198195293, 277.0941991621015, 2, 246401, 113.0, 144.0, 165.0, 289.0, 70.91469211642533, 240.33420992922817, 18.3774762044128], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["02-04-Credentials&ClickonLogin-304", 10, 0, 0.0, 117.30000000000001, 99, 139, 116.0, 137.9, 139.0, 139.0, 1.1676786548341895, 2.1545039555114434, 1.0844359382297992], "isController": false}, {"data": ["01-01-EnterLandingURL", 10, 0, 0.0, 179.4, 106, 627, 125.5, 583.1000000000001, 627.0, 627.0, 1.0944511327569224, 1.1126207316405823, 2.5362622441720477], "isController": true}, {"data": ["02-04-Credentials&ClickonLogin-305", 10, 0, 0.0, 39.0, 30, 59, 35.0, 58.0, 59.0, 59.0, 1.1824524062906467, 2.127259592645146, 0.7043905935911079], "isController": false}, {"data": ["07-07-ClickonAddtoCart", 10, 0, 0.0, 39.6, 33, 51, 38.5, 50.5, 51.0, 51.0, 1.1814744801512287, 2.323835693820888, 0.7649585745510397], "isController": true}, {"data": ["07-11-ClickonSignOut-312-1", 9, 0, 0.0, 33.888888888888886, 31, 45, 32.0, 45.0, 45.0, 45.0, 1.223491027732463, 2.2997542397362696, 0.7419803986541599], "isController": false}, {"data": ["07-03-ClickonSignI-303", 10, 0, 0.0, 36.599999999999994, 30, 48, 34.0, 48.0, 48.0, 48.0, 1.1742602160638798, 2.1155031705025835, 0.6995104802724283], "isController": false}, {"data": ["07-11-ClickonSignOut-312-0", 9, 0, 0.0, 117.77777777777777, 96, 150, 113.0, 150.0, 150.0, 150.0, 1.21049092131809, 0.26834124915938135, 0.7447356254203094], "isController": false}, {"data": ["01-05-ClickFish-306", 10, 0, 0.0, 35.9, 31, 44, 35.5, 43.6, 44.0, 44.0, 1.1893434823977165, 1.8521934095504282, 0.7294020575642246], "isController": false}, {"data": ["03-05-ClickReptiles", 5, 0, 0.0, 39.0, 32, 48, 41.0, 48.0, 48.0, 48.0, 1.474491300501327, 2.26011869654969, 0.9100375995281628], "isController": true}, {"data": ["01-02-ClickonENtertheStore-302", 10, 0, 0.0, 40.5, 32, 63, 37.0, 61.300000000000004, 63.0, 63.0, 1.181753722524226, 2.281684848440085, 0.6035714813282912], "isController": false}, {"data": ["02-07-ClickonAddtoCart", 10, 0, 0.0, 37.099999999999994, 32, 48, 37.5, 47.1, 48.0, 48.0, 1.1837121212121213, 2.322110262784091, 0.7652513908617424], "isController": true}, {"data": ["01-07-ClickonAddtoCart-308", 10, 0, 0.0, 36.3, 31, 45, 35.5, 44.6, 45.0, 45.0, 1.1835720203574387, 2.3306197478991595, 0.7651608178482661], "isController": false}, {"data": ["01-03-ClickonSignI-303", 10, 0, 0.0, 35.99999999999999, 31, 42, 34.0, 41.9, 42.0, 42.0, 1.1820330969267139, 2.1316997266548463, 0.7041408096926713], "isController": false}, {"data": ["03-06-ClickonProduct-307", 5, 0, 0.0, 35.8, 34, 38, 36.0, 38.0, 38.0, 38.0, 1.4898688915375446, 2.407942397943981, 0.9602670589988082], "isController": false}, {"data": ["06-11-ClickonSignOut", 5, 0, 0.0, 112.8, 99, 121, 117.0, 121.0, 121.0, 121.0, 1.4723203769140165, 5.739173844228504, 2.6915856890459366], "isController": true}, {"data": ["07-02-ClickonENtertheStore", 20, 0, 0.0, 53.54999999999998, 30, 298, 38.5, 78.10000000000007, 287.14999999999986, 298.0, 0.12377539716430566, 0.23068277023263586, 0.06642048900565035], "isController": true}, {"data": ["01-09-PaymentDetails&ClickonContinue", 10, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, 1.188071759534276, 0.0, 0.0], "isController": true}, {"data": ["08-01-Search API", 30627, 5406, 17.651092173572337, 279.7694191399755, 2, 246401, 114.0, 144.0, 165.0, 291.0, 70.39395053783213, 240.17909152483452, 17.65994364542153], "isController": false}, {"data": ["06-02-ClickonENtertheStore-302", 5, 0, 0.0, 39.8, 36, 47, 38.0, 47.0, 47.0, 47.0, 1.461133839859731, 2.820958595119813, 0.7462626936002338], "isController": false}, {"data": ["01-04-Credentials&ClickonLogin", 10, 0, 0.0, 155.1, 139, 187, 149.5, 186.6, 187.0, 187.0, 1.1667250029168126, 4.252735423229495, 1.7825598311165558], "isController": true}, {"data": ["02-01-EnterLandingURL-301", 10, 0, 0.0, 177.5, 110, 627, 123.5, 580.7000000000002, 627.0, 627.0, 1.102049812651532, 1.1203455614943796, 2.553871294357505], "isController": false}, {"data": ["02-03-ClickonSignI-303", 10, 0, 0.0, 38.300000000000004, 33, 48, 36.5, 47.7, 48.0, 48.0, 1.179523472517103, 2.1270586370606277, 0.70264581858929], "isController": false}, {"data": ["07-01-EnterLandingURL", 20, 0, 0.0, 154.65, 99, 623, 122.0, 266.9000000000002, 605.7499999999998, 623.0, 0.12349338075479153, 0.1255435638337285, 0.289377311641721], "isController": true}, {"data": ["06-11-ClickonSignOut-313", 5, 0, 0.0, 34.6, 32, 37, 36.0, 37.0, 37.0, 37.0, 1.5183723048891589, 2.7292149066201032, 0.9208097669298512], "isController": false}, {"data": ["06-11-ClickonSignOut-312", 5, 0, 0.0, 78.2, 67, 85, 81.0, 85.0, 85.0, 85.0, 1.4961101137043686, 3.142707865798923, 1.8277673361759426], "isController": false}, {"data": ["07-11-ClickonSignOut-313", 10, 1, 10.0, 33.3, 11, 42, 35.0, 41.9, 42.0, 42.0, 1.2196609342602758, 2.2675688346139773, 0.6656918907793633], "isController": false}, {"data": ["07-11-ClickonSignOut", 10, 1, 10.0, 171.40000000000003, 23, 219, 180.0, 218.2, 219.0, 219.0, 1.185677021579322, 4.731823941783259, 1.9508092245672282], "isController": true}, {"data": ["07-11-ClickonSignOut-312", 10, 1, 10.0, 138.1, 12, 181, 144.5, 180.7, 181.0, 181.0, 1.199328376109379, 2.5565370892300314, 1.3186756041616696], "isController": false}, {"data": ["02-08-EnterQuantity&ClickonProceedtoCheckout", 10, 0, 0.0, 122.0, 105, 175, 116.5, 170.60000000000002, 175.0, 175.0, 1.1596892032935173, 2.1738510016815495, 0.7270707700336311], "isController": true}, {"data": ["06-01-EnterLandingURL-301", 10, 0, 0.0, 175.10000000000002, 101, 627, 128.0, 579.3000000000002, 627.0, 627.0, 0.09257544899092761, 0.09411234609331606, 0.216928505716534], "isController": false}, {"data": ["07-07-ClickonAddtoCart-308", 10, 0, 0.0, 39.6, 33, 51, 38.5, 50.5, 51.0, 51.0, 1.1824524062906467, 2.3257591713964763, 0.765591743526073], "isController": false}, {"data": ["03-01-EnterLandingURL", 5, 0, 0.0, 213.0, 105, 627, 111.0, 627.0, 627.0, 627.0, 1.2180267965895248, 1.2382479445797807, 2.8226343635809985], "isController": true}, {"data": ["01-08-EnterQuantity&ClickonProceedtoCheckout", 10, 0, 0.0, 119.7, 104, 156, 113.5, 154.3, 156.0, 156.0, 1.1669973159061733, 2.1890316839771264, 0.7316526140739875], "isController": true}, {"data": ["01-05-ClickFish", 10, 0, 0.0, 35.9, 31, 44, 35.5, 43.6, 44.0, 44.0, 1.1873664212776063, 1.8491144843861314, 0.7281895630491569], "isController": true}, {"data": ["03-06-ClickonProduct", 5, 0, 0.0, 35.8, 34, 38, 36.0, 38.0, 38.0, 38.0, 1.503307276007216, 2.4296616619061937, 0.9689285177390259], "isController": true}, {"data": ["07-02-ClickonENtertheStore-302", 20, 0, 0.0, 53.54999999999998, 30, 298, 38.5, 78.10000000000007, 287.14999999999986, 298.0, 0.04908445225432618, 0.09147970986793828, 0.026339752454836166], "isController": false}, {"data": ["03-07-ClickonAddtoCart", 5, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, 1.5051173991571343, 0.0, 0.0], "isController": true}, {"data": ["02-02-ClickonENtertheStore", 10, 0, 0.0, 38.4, 31, 53, 37.5, 52.2, 53.0, 53.0, 1.179523472517103, 2.2777243306204293, 0.6024323985609814], "isController": true}, {"data": ["06-04-Credentials&ClickonLogin", 5, 0, 0.0, 165.6, 132, 187, 177.0, 187.0, 187.0, 187.0, 1.405283867341203, 5.12324778667791, 2.142234489179314], "isController": true}, {"data": ["06-04-Credentials&ClickonLogin-305", 5, 0, 0.0, 36.4, 30, 44, 35.0, 44.0, 44.0, 44.0, 1.5060240963855422, 2.7087843561746987, 0.8971432605421688], "isController": false}, {"data": ["06-04-Credentials&ClickonLogin-304", 5, 0, 0.0, 129.2, 102, 147, 139.0, 147.0, 147.0, 147.0, 1.458151064450277, 2.693307542286381, 1.3542008420822398], "isController": false}, {"data": ["01-08-EnterQuantity&ClickonProceedtoCheckout-309", 10, 0, 0.0, 119.7, 104, 156, 113.5, 154.3, 156.0, 156.0, 1.1721955222131053, 2.198782381901301, 0.7349116457625131], "isController": false}, {"data": ["03-01-EnterLandingURL-301", 5, 0, 0.0, 213.0, 105, 627, 111.0, 627.0, 627.0, 627.0, 1.2330456226880395, 1.2535161066584464, 2.857438733045623], "isController": false}, {"data": ["03-04-Credentials&ClickonLogin", 5, 0, 0.0, 159.2, 132, 179, 169.0, 179.0, 179.0, 179.0, 1.4088475626937165, 5.134588968723584, 2.1531703472809243], "isController": true}, {"data": ["07-06-ClickonProduct-307", 10, 0, 0.0, 38.199999999999996, 33, 61, 35.0, 58.900000000000006, 61.0, 61.0, 1.1820330969267139, 1.9096067893026003, 0.761857269503546], "isController": false}, {"data": ["06-11-ClickonSignOut-312-1", 5, 0, 0.0, 37.2, 29, 45, 38.0, 45.0, 45.0, 45.0, 1.5142337976983646, 2.845103346456693, 0.9182999886432465], "isController": false}, {"data": ["01-03-ClickonSignI", 10, 0, 0.0, 35.99999999999999, 31, 42, 34.0, 41.9, 42.0, 42.0, 1.181893393215932, 2.131447782472521, 0.7040575877555845], "isController": true}, {"data": ["06-11-ClickonSignOut-312-0", 5, 0, 0.0, 40.2, 32, 56, 37.0, 56.0, 56.0, 56.0, 1.514692517418964, 0.3357765639200242, 0.9318909042714328], "isController": false}, {"data": ["07-03-ClickonSignI", 19, 0, 0.0, 19.26315789473684, 0, 48, 30.0, 48.0, 48.0, 48.0, 0.11845091144859231, 0.1123140632403182, 0.03713767268896038], "isController": true}, {"data": ["03-04-Credentials&ClickonLogin-304", 5, 0, 0.0, 122.8, 100, 142, 130.0, 142.0, 142.0, 142.0, 1.4330753797649756, 2.6436322191172255, 1.3365107301519061], "isController": false}, {"data": ["03-04-Credentials&ClickonLogin-305", 5, 0, 0.0, 36.4, 32, 40, 37.0, 40.0, 40.0, 40.0, 1.4762326542663124, 2.656930450989076, 0.8793964053734868], "isController": false}, {"data": ["02-05-ClickDogs", 10, 0, 0.0, 39.5, 32, 49, 39.0, 48.9, 49.0, 49.0, 1.1839924224484963, 1.8970472338977031, 0.726120352829742], "isController": true}, {"data": ["07-01-EnterLandingURL-301", 20, 0, 0.0, 154.60000000000002, 99, 623, 122.0, 266.9000000000002, 605.7499999999998, 623.0, 0.12352236372395223, 0.12557302796546316, 0.28944522632385095], "isController": false}, {"data": ["02-09-PaymentDetails&ClickonContinue", 10, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, 1.1734334663224595, 0.0, 0.0], "isController": true}, {"data": ["03-03-ClickonSignI-303", 5, 0, 0.0, 40.2, 33, 48, 40.0, 48.0, 48.0, 48.0, 1.466275659824047, 2.6424463892961874, 0.8734649926686217], "isController": false}, {"data": ["02-06-ClickonProduct", 10, 0, 0.0, 34.900000000000006, 33, 38, 34.0, 38.0, 38.0, 38.0, 1.1906179307060365, 1.9237083655792357, 0.7673904631503751], "isController": true}, {"data": ["07-05-ClickReptiles-306", 10, 0, 0.0, 39.5, 33, 49, 37.5, 48.9, 49.0, 49.0, 1.1875074219213868, 1.8205741227288923, 0.7329147369671061], "isController": false}, {"data": ["07-06-ClickonProduct", 10, 0, 0.0, 38.199999999999996, 33, 61, 35.0, 58.900000000000006, 61.0, 61.0, 1.1893434823977165, 1.9214169169243578, 0.7665690413891533], "isController": true}, {"data": ["06-03-ClickonSignI", 5, 0, 0.0, 38.6, 30, 47, 38.0, 47.0, 47.0, 47.0, 1.458151064450277, 2.628089457567804, 0.8686251458151065], "isController": true}, {"data": ["03-03-ClickonSignI", 5, 0, 0.0, 40.2, 33, 48, 40.0, 48.0, 48.0, 48.0, 1.456876456876457, 2.6255076303904428, 0.8678658581002331], "isController": true}, {"data": ["06-01-EnterLandingURL", 10, 0, 0.0, 175.10000000000002, 101, 627, 128.0, 579.3000000000002, 627.0, 627.0, 0.09256259545517656, 0.0940992791687879, 0.216898386518258], "isController": true}, {"data": ["07-04-Credentials&ClickonLogin-305", 10, 0, 0.0, 37.6, 32, 49, 35.5, 48.6, 49.0, 49.0, 1.1825922421948911, 2.1268182355723746, 0.7044738942762536], "isController": false}, {"data": ["07-04-Credentials&ClickonLogin-304", 10, 0, 0.0, 116.1, 100, 137, 112.0, 136.6, 137.0, 137.0, 1.168770453482936, 2.1575456916199163, 1.0900154131603554], "isController": false}, {"data": ["07-05-ClickReptiles", 10, 0, 0.0, 39.5, 33, 49, 37.5, 48.9, 49.0, 49.0, 1.1841326228537594, 1.81540019982238, 0.7308318531675547], "isController": true}, {"data": ["01-06-ClickonProduct", 10, 0, 0.0, 38.19999999999999, 31, 65, 34.0, 62.80000000000001, 65.0, 65.0, 1.1907597046915932, 1.9241700032745892, 0.7674818409145034], "isController": true}, {"data": ["02-02-ClickonENtertheStore-302", 10, 0, 0.0, 38.300000000000004, 31, 53, 37.5, 52.2, 53.0, 53.0, 1.1816140848398913, 2.281761417346095, 0.6035001624719367], "isController": false}, {"data": ["03-02-ClickonENtertheStore", 5, 0, 0.0, 41.8, 33, 64, 35.0, 64.0, 64.0, 64.0, 1.442169022209403, 2.783780555956158, 0.7365765611479665], "isController": true}, {"data": ["02-07-ClickonAddtoCart-308", 10, 0, 0.0, 37.099999999999994, 32, 48, 37.5, 47.1, 48.0, 48.0, 1.1768859597505001, 2.3087192538543015, 0.7608383841355773], "isController": false}, {"data": ["02-01-EnterLandingURL", 10, 0, 0.0, 177.5, 110, 627, 123.5, 580.7000000000002, 627.0, 627.0, 1.0908694229300753, 1.1089795598341878, 2.5279620513799497], "isController": true}, {"data": ["03-05-ClickReptiles-306", 5, 0, 0.0, 39.0, 32, 48, 41.0, 48.0, 48.0, 48.0, 1.5060240963855422, 2.308452560240964, 0.9294992469879518], "isController": false}, {"data": ["06-02-ClickonENtertheStore", 10, 0, 0.0, 19.9, 0, 47, 18.0, 46.300000000000004, 47.0, 47.0, 0.09312114129270768, 0.08989282047640776, 0.02378044770316705], "isController": true}, {"data": ["02-04-Credentials&ClickonLogin", 10, 0, 0.0, 156.3, 131, 184, 154.5, 183.3, 184.0, 184.0, 1.1655011655011656, 4.247250145687645, 1.7767063665501166], "isController": true}, {"data": ["02-03-ClickonSignI", 10, 0, 0.0, 38.300000000000004, 33, 48, 36.5, 47.7, 48.0, 48.0, 1.1825922421948911, 2.132592611754967, 0.7044738942762536], "isController": true}, {"data": ["03-02-ClickonENtertheStore-302", 5, 0, 0.0, 41.8, 33, 64, 35.0, 64.0, 64.0, 64.0, 1.4637002341920375, 2.8253416825234194, 0.7475734594555036], "isController": false}, {"data": ["02-05-ClickDogs-306", 10, 0, 0.0, 39.5, 32, 49, 39.0, 48.9, 49.0, 49.0, 1.1893434823977165, 1.9056209487987632, 0.7294020575642246], "isController": false}, {"data": ["02-08-EnterQuantity&ClickonProceedtoCheckout-309", 10, 0, 0.0, 122.0, 105, 175, 116.5, 170.60000000000002, 175.0, 175.0, 1.1588828369451847, 2.1723394585119946, 0.7265652161316491], "isController": false}, {"data": ["01-04-Credentials&ClickonLogin-305", 10, 0, 0.0, 39.5, 30, 60, 38.5, 58.50000000000001, 60.0, 60.0, 1.1855364552459988, 2.1316501185536456, 0.7062277711914641], "isController": false}, {"data": ["06-03-ClickonSignI-303", 5, 0, 0.0, 38.6, 30, 47, 38.0, 47.0, 47.0, 47.0, 1.4509576320371445, 2.615124419616947, 0.864339995647127], "isController": false}, {"data": ["01-06-ClickonProduct-307", 10, 0, 0.0, 38.19999999999999, 31, 65, 34.0, 62.80000000000001, 65.0, 65.0, 1.1816140848398913, 1.9093914318208676, 0.7615872031194613], "isController": false}, {"data": ["01-04-Credentials&ClickonLogin-304", 10, 0, 0.0, 115.6, 98, 140, 111.5, 138.9, 140.0, 140.0, 1.1723329425556857, 2.1652668889214537, 1.0927654235052755], "isController": false}, {"data": ["01-07-ClickonAddtoCart", 10, 0, 0.0, 36.3, 31, 45, 35.5, 44.6, 45.0, 45.0, 1.1821728336682824, 2.3278645525475827, 0.7642562655160184], "isController": true}, {"data": ["01-02-ClickonENtertheStore", 10, 0, 0.0, 40.5, 32, 63, 37.0, 61.300000000000004, 63.0, 63.0, 1.1785503830288744, 2.275499963170301, 0.6019354007071303], "isController": true}, {"data": ["07-04-Credentials&ClickonLogin", 10, 0, 0.0, 153.7, 132, 178, 154.0, 177.3, 178.0, 178.0, 1.160631383472609, 4.2298440038881155, 1.7738165186861654], "isController": true}, {"data": ["01-01-EnterLandingURL-301", 10, 0, 0.0, 179.4, 106, 627, 125.5, 583.1000000000001, 627.0, 627.0, 1.1024142872891634, 1.1207160869804873, 2.554715921618344], "isController": false}, {"data": ["02-06-ClickonProduct-307", 10, 0, 0.0, 34.900000000000006, 33, 38, 34.0, 38.0, 38.0, 38.0, 1.1837121212121213, 1.9125504927201704, 0.762939453125], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 16, 0.2958579881656805, 0.05156300354495649], "isController": false}, {"data": ["Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 5392, 99.70414201183432, 17.376732194650337], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 31030, 5408, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 5392, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 16, "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["08-01-Search API", 30627, 5406, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 5390, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 16, "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["07-11-ClickonSignOut-313", 10, 1, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["07-11-ClickonSignOut-312", 10, 1, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
