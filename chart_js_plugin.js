(function () {

  var chartJSWidget = function (settings) {

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
      //var chartDiv = '<canvas id="'+currentSettings.id + '" width="'+currentSettings.chartWidth+'" height="'+currentSettings.chartHeight+'"></canvas>';
	  var chartDiv = '<canvas id="Chart1" width="600" height="200"></canvas>';
      console.log(chartDiv);
      htmlElement = $(chartDiv);
      $(element).append(htmlElement);
    }

    this.onSettingsChanged = function (newSettings) {
      currentSettings = newSettings;
    }

    //seems to be called after render whenever a calculated value changes
    this.onCalculatedValueChanged = function (settingName, newValue) {
      var ctx = document.getElementById(currentSettings.id).getContext('2d');
      var myChart = new Chart(ctx, {
        type: 'line',
		data: {
			labels: ["January", "February", "March", "April", "May", "June", "July"],
			datasets: [
				{
				label: "Trash",
				data: [65, 59, 66, 70, 56, 55, 40],
				borderColor: "red",
				fill: false
				},
				{
				label: "Not Trash",
				data: [44, 77, 66, 88, 55, 66, 70],
				borderColor: "yellow",
				fill: false
				}				
			]
		},
		options: {
			title: {
					display: true,
					text: 'Moolah'
			},
			legend: {
					display: true,
					fontColor: "white"
			},
			gridLines: {
					display: true,
					color: "white"
			},	
			scales: {
					yAxes: [{
						ticks: {
							fontColor: "white",
							fontSize: 12,
							stepSize: 10,
							beginAtZero: true
						}
					}],
					xAxes: [{
						ticks: {
							fontColor: "white",
							fontSize: 12,
							stepSize: 10,
							beginAtZero: true
						}
					}]
			}
		}
	  });
	}
			
/*
			backgroundColor: "rgba(0,0,0,0.2)",
			fillColor: "rgba(255,255,255,0.2)",
			strokeColor: "rgba(240, 25, 29,1)",
			pointColor: "rgba(25, 240, 132,1)",
			pointStrokeColor: "yellow",
			pointHighlightFill: "red",
			pointHighlightStroke: "rgba(51, 25, 240,1)",
*/

/*
 data: {
          labels: newValue[currentSettings['dataXSeries']],
          datasets: [{ 
              data: newValue[currentSettings['plotdata']],
              borderColor: "#3e95cd",
              label: currentSettings['dataSetTitle'],
              fill: false
            }
          ]
        },
        options: {
          title: {
            display: false,
            text: 'Transactions every 15 minutes'
          }
        }
      });
    }
*/
    this.onDispose = function () {
    }

    this.getHeight = function () {
      return Number(currentSettings.height);
    }

    this.onSettingsChanged(settings);
  };

  freeboard.loadWidgetPlugin({
    "type_name": "chartJSWidget",
    "display_name": "ChartJS",    
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
        "name": "plotdata",
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
      newInstanceCallback(new chartJSWidget(settings));
    }
  });

}());