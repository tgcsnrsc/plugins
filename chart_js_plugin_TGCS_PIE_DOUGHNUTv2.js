(function () {
/* * ============================================================================
 * * Copyright (c) 1999-2019 Toshiba Global Commerce Solutions, Inc.  
 * * All Rights Reserved.
 * *  
 * * The source code for this program is not published or otherwise divested
 * * of its trade secrets, irrespective of what has been deposited with the
 * * U.S. Copyright Office.
 * * ============================================================================
 * * Author..............: Cody Shive
 * * Date Written........:
 * * Modifications
 * * When			Who			Description
 * * -------------	-----------	-------------------------------------------------
 * * 11-19-2018		Shive		New for Pie or Doughnut w/text inside hole
 * * ============================================================================
 */
		
  var chartMap = {};
  var chart_js_plugin_TGCS_PIE_DOUGHNUTv2 = function (settings) {
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
	
	function drawTotals(chart) {
		debugger;
		var width = chart.chart.width,
		height = chart.chart.height,
		ctx = chart.chart.ctx;
		ctx.restore();
		var fontSize = (height / 114).toFixed(2);
		ctx.font = fontSize + "em sans-serif";
		ctx.textBaseline = "middle";
		var text = chart.config.centerText.text,
		textX = Math.round((width - ctx.measureText(text).width) / 2),
		textY = height / 2;
		ctx.fillText(text, textX, textY);
		ctx.save();
	}
	
    //seems to be called after render whenever a calculated value changes
    this.onCalculatedValueChanged = function (settingName, newValue) {
		console.log ('Calcualted Value Changed');
		var ctx = document.getElementById(currentSettings.id).getContext('2d');
		// Catalog chart for knowing first time through
		var myChart = chartMap[currentSettings.id];
		if(myChart == null) {
		  chartMap[currentSettings.id] = new Chart(ctx, {
			plugins: [{
					beforeDraw: function(chart, options) {
				}
			}],
			beforeDraw: function(chart) {
				debugger;
				if (chart.config.centerText.display !== null &&
				typeof chart.config.centerText.display !== 'undefined' &&
				chart.config.centerText.display) {
					drawTotals(chart);
				}
			},
		  type: newValue[0].chartType,
		  data: {
			labels: newValue[0].categories,
			datasets: [
			  {
			  label: newValue[0].dataSetTitle,
			  fontColor: newValue[0].fontColor,
			  data: newValue[0].data,
			  borderColor: newValue[0].borderColor,
			  borderWidth: newValue[0].borderWidth,
			  backgroundColor: newValue[0].backgroundColor,
			  fillColor: "white",
			  fill: false
			  }	
			]
		  },
		  options: {
			responsive: false,
			  elements: {
					line: {
						tension: newValue[0].lineTensionCurvyness
					}
			},
		    centerText: {
				display: true,
				text: "280"
			},
			title: {
				display: true,
				text: newValue[0].chartTitle,
				fontColor: newValue[0].fontColor,
				fontSize: 18
			},
			legend: {
				display: newValue[0].displayLegend,
				position: 'bottom',
				labels: {
				  boxWidth: newValue[0].legendLabelBoxWidth,
				  padding: newValue[0].legendLabelPadding
				}
			},
			scales: {
				yAxes: [{
				  ticks: {
					display: newValue[0].yTicksDisplay,				  				  
					fontSize: 12,
					stepSize: newValue[0].yStepSize,
					beginAtZero: true
				  },
				  gridLines: {
					  display: newValue[0].yScaleGridLinesDisplay,
					  drawBorder: newValue[0].yDrawBorder,
					  color: newValue[0].yBorderColor
				  },
				  scaleLabel: {
					  display: newValue[0].yScaleLabelDisplay,
					  labelString: newValue[0].yScaleLabel,
					  fontColor: newValue[0].fontColor
				  }
				}],
				xAxes: [{
				  ticks: {
					display: newValue[0].xTicksDisplay,				  
					fontColor: newValue[0].fontColor,
					fontSize: 12,
					stepSize: newValue[0].xStepSize,
					beginAtZero: true
				  },
				  gridLines: {
					  display: newValue[0].xScaleGridLinesDisplay,
					  drawBorder: newValue[0].xDrawBorder,
					  color: newValue[0].yBorderColor
				  },
				  scaleLabel: {
					  display: newValue[0].xScaleLabelDisplay,
					  labelString: newValue[0].xScaleLabel,
					  fontColor: newValue[0].fontColor
				  }
				}]
			}
		  }
		});
    } else {
		  //  --- update data sets - https://www.chartjs.org/docs/latest/developers/updates.html //
			chartMap[currentSettings.id].data = 
			{
			labels: newValue[0].categories,
			datasets: [
			  {
			  label: newValue[0].dataSetTitle,
			  fontColor: newValue[0].fontColor,
			  data: newValue[0].data,
			  borderColor: newValue[0].borderColor,
			  backgroundColor: newValue[0].backgroundColor,
			  fillColor: "white",
			  fill: false
			  }	
			]
		  }
		  chartMap[currentSettings.id].update();
		}
	}
	
	Chart.Chart.pluginService.register({
		beforeDraw: function(chart) {
			if (chart.config.centerText.display !== null &&
				typeof chart.config.centerText.display !== 'undefined' &&
				chart.config.centerText.display) {
				drawTotals(chart);
			}
		}
	});
	
    this.onDispose = function () {
    }

    this.getHeight = function () {
      return Number(currentSettings.height);
    }

    this.onSettingsChanged(settings);
  };

  
  freeboard.loadWidgetPlugin({
    "type_name": "chart_js_plugin_TGCS_PIE_DOUGHNUTv2",
    "display_name": "chart_js_plugin_TGCS_PIE_DOUGHNUTv2",    
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
      newInstanceCallback(new chart_js_plugin_TGCS_PIE_DOUGHNUTv2(settings));
    }
  });

}());