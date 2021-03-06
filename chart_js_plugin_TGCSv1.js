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
 * * 11-19-2018		Shive		New
 * * ============================================================================
 */
  var chartMap = {};
  var chartJSWidgetTGCSv1 = function (settings) {
    var self = this;    
    var currentSettings = settings;
    var htmlElement;
    var data;
    var options;
    var chartHeight = 300 //currentSettings.chartHeight;
    var chartWidth = 600 //currentSettings.chartWidth;
	//xxx
	function number_format(formatnumber, number, decimals, dec_point, thousands_sep) {
	// *     example: number_format(1234.56, 2, ',', ' ');
	// *     return: '1 234,56'
	//debugger;
		if (formatnumber == null) {
			return number;
		}
		if (formatnumber == false) {
			return number;
		}

		if (formatnumber == true) {
			number = (number + '').replace(',', '').replace(' ', '');
			var n = !isFinite(+number) ? 0 : +number,
					prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
					sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
					dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
					s = '',
					toFixedFix = function (n, prec) {
						var k = Math.pow(10, prec);
						return '' + Math.round(n * k) / k;
					};
			// Fix for IE parseFloat(0.55).toFixed(0) = 0;
			s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
			if (s[0].length > 3) {
				s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
			}
			if ((s[1] || '').length < prec) {
				s[1] = s[1] || '';
				s[1] += new Array(prec - s[1].length + 1).join('0');
			}
			return s.join(dec);
		}
	}
	//xxx
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
	// Catalog chart for knowing first time through
    var myChart = chartMap[currentSettings.id];
    if(myChart == null) {
      chartMap[currentSettings.id] = new Chart(ctx, {
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
                beginAtZero: true,
				//Add formatting to the Y-axis labels.
                callback: function(value, index, values) {
                   return newValue[0].ToolTipPrefix + number_format(newValue[0].yFormatNumber,value);
				}
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
        },
	    tooltips: {
			callbacks: {
				label: function(tooltipItem, myChart){
					var datasetLabel = myChart.datasets[tooltipItem.datasetIndex].label || '';
					return datasetLabel + ': ' + newValue[0].ToolTipPrefix + number_format(newValue[0].ToolTipFormatNumber,tooltipItem.yLabel, newValue[0].ToolTipFormatNumberDecimals);
				}
			}
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
    "type_name": "chartJSWidgetTGCSv1",
    "display_name": "chartJSWidgetTGCSv1",    
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
      newInstanceCallback(new chartJSWidgetTGCSv1(settings));
    }
  });

}());