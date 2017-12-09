var PieChart = function(titleText, container, series){
    var chart = new Highcharts.Chart({
        chart: {
            type: "pie",
            renderTo: container
        },
        title: {
            text: titleText
        },
        series:series
    });
};
