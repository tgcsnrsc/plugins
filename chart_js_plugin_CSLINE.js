(function () {
  var chartMap = {}; // rwv //
  var chartJSWidgetBARX = function (settings) {

    var self = this;    
    var currentSettings = settings;
    var htmlElement;
    var data;
    var options;
    var chartHeight = 300 //currentSettings.chartHeight;
    var chartWidth = 600 //currentSettings.chartWidth;

    //seems to be called once (or after settings change)
    this.render = function (element) {
      console.log('render');

      //add external css
      
      //add the chart div to the dom
      var chartDiv = '<canvas id="'+currentSettings.id + '" width="'+currentSettings.chartWidth+'" height="'+currentSettings.chartHeight+'"></canvas>';
      console.log(chartDiv);
      htmlElement = $(chartDiv);
      $(element).append(htmlElement);
    }

    this.onSettingsChanged = function (newSettings) {
      currentSettings = newSettings;
    }

    //seems to be called after render whenever a calculated value changes
    this.onCalculatedValueChanged = function (settingName, newValue) {
		console.log ('Calcualted Value Changed');
		var ctx = document.getElementById(currentSettings.id).getContext('2d');
  // rwv - start // 
    var myChart = chartMap[currentSettings.id];
    if(myChart == null) {
      chartMap[currentSettings.id] = new Chart(ctx, {
          type: 'line',
      data: {
        labels: newValue[0].categories,
        datasets: [
          {
          label: currentSettings.dataSetTitle,
          fontColor: 'white',
          data: newValue[0].data,
          borderColor: "turquoise",
          backgroundColor: currentSettings.barBackgroundColor,
          fillColor: "white",
          fill: false
          }	
        ]
      },
      options: {
        responsive: false,
        title: {
            display: true,
            text: newValue[0].chartTitle,
            fontColor: 'white',
            fontSize: 18
        },
        legend: {
            display: true,
            position: 'bottom',
            labels: {
              fontColor: "white",
              boxWidth: 2,
              padding: 20
            }
        },
        scales: {
            yAxes: [{
              ticks: {
                fontColor: "white",
                fontSize: 12,
                stepSize: 25,
                beginAtZero: true
              },
              gridLines: {
                  display: true,
                  color: "gray"
              },
              scaleLabel: {
                  display: true,
                  labelString: newValue[0].yScaleLabel,
                  fontColor: "white"
              }
            }],
            xAxes: [{
              ticks: {
                fontColor: "white",
                fontSize: 12,
                stepSize: 25,
                beginAtZero: true
              },
              gridLines: {
                  display: true,
                  color: "gray"
              },
              scaleLabel: {
                  display: false,
                  labelString: 'Sales',
                  fontColor: "white"
              }
            }]
        }
      }
      });
    } else {
	  //debugger;
      //  --- update data sets - https://www.chartjs.org/docs/latest/developers/updates.html //
	    chartMap[currentSettings.id].data = 
		{
        labels: newValue[0].categories,
        datasets: [
          {
          label: currentSettings.dataSetTitle,
          fontColor: 'white',
          data: newValue[0].data,
          borderColor: "turquoise",
          backgroundColor: currentSettings.barBackgroundColor,
          fillColor: "white",
          fill: false
          }	
        ]
      }
	  chartMap[currentSettings.id].update();
    }
    // rwv - end // 
	}
			
    this.onDispose = function () {
    }

    this.getHeight = function () {
      return Number(currentSettings.height);
    }

    this.onSettingsChanged(settings);
  };

  freeboard.loadWidgetPlugin({
    "type_name": "chartJSWidgetBARX",
    "display_name": "ChartJSBarX",    
    "fill_size": true,
    "external_scripts": [
      "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.js"
    ],    
    "settings": [
      {
        "name": "id",
        "display_name": "id",
        "default_value": "chart1",
        "description": "dom element id of the chart (must be unique for multiple charts)"
      },        
      {
        "name": "plotData",
        "display_name": "Chart Data Source",
        "type": "calculated",
        "description": "The data to plot"
      },   
      {
        "name": "dataYSeries",
        "display_name": "Array of values for the Y-series",
        "description": "Array of values for the Y-series"
      },   
      {
        "name": "dataXSeries",
        "display_name": "Array of values for the X-series",	
        "description": "Array of values for the X-series"
      },   
      {
        "name": "dataSetTitle",
        "display_name": "Title of the data set",
        "description": "Title of the data set"
      },    
      {
        "name": "barBackgroundColor",
        "display_name": "Background Color for Bars",
        "description": "Background Color for Bars"
      },    
      {
        "name": "chartType",
        "display_name": "Type of chart",
        "default_value": "line",
        "description": "Type of chart to render"
      },
      {
        "name": "chartHeight",
        "display_name": "Chart Height (px)",
        "type": "number",
        "default_value": 300,
        "description": "chart height in pixels (require freeboard config reload/refresh)"
      },
      {
        "name": "chartWidth",
        "display_name": "Chart Width (px)",
        "type": "number",
        "default_value": 300,
        "description": "chart width in pixels (require freeboard config reload/refresh)"
      },      
      {
        "name": "height",
        "display_name": "Height Blocks",
        "type": "number",
        "default_value": 5,
        "description": "A height block is around 60 pixels"
      }
    ],
    newInstance: function (settings, newInstanceCallback) {
      newInstanceCallback(new chartJSWidgetBARX(settings));
    }
  });

}());