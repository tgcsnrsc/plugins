//window.dyngaugeCS3ID = 0; 
(function() {    
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
 * * 11-19-2018		Shive		New.
 * * ============================================================================
 */
    var DynamicGaugeCS3Widget = function (settings) {
        var self = this;
        var currentSettings = settings;
		
        //thisdyngaugeCS3ID = "dyngaugeCS3-" + window.dyngaugeCS3ID++;
		thisdyngaugeCS3ID = currentSettings.id;
        var titleElement = $('<h2 class="section-title"></h2>');
        var gaugeElement = $('<div id="' + thisdyngaugeCS3ID + '"></div>');
		//#ff0000 -- Red
		//#ffa500 -- Orange (50%)
		//#ff4500 -- OrangeRed
		//#ffff00 -- Yellow (50%)
		//#00ff00 -- Lime
		var defaultColors = ['#ff0000', '#ff4500', '#ffa500','#ffff00', '#00ff00'];
		var reversedColors = ['#00ff00','#ffff00','#ffa500','#ff4500','#ff0000'];
		var useColors = defaultColors;

        var gaugeObject;
        var rendered = false;

        function createGauge() {
            if (!rendered) {
                return;
            }
			
			if (currentSettings.reverse_colors) {
				useColors = reversedColors;
			}

            gaugeElement.empty();

            gaugeObject = new JustGage({
                id: thisdyngaugeCS3ID,
                value: (_.isUndefined(currentSettings.min_value) ? 0 : currentSettings.min_value),
                min: (_.isUndefined(currentSettings.min_value) ? 0 : currentSettings.min_value),
                max: (_.isUndefined(currentSettings.max_value) ? 0 : currentSettings.max_value),
                label: currentSettings.units,
				labelFontColor: currentSettings.label_font_color,
				shadowOpacity: 1,
				shadowSize: 5,
				shadowVerticalOffset: 10,
				pointer: currentSettings.show_pointer,
                showInnerShadow: false,
                valueFontColor: currentSettings.fontColor,
                levelColors: useColors
            });
        }

        this.render = function (element) {
            rendered = true;
            $(element).append(titleElement).append($('<div class="gauge-widget-wrapper"></div>').append(gaugeElement));
            createGauge();
        }

        this.onSettingsChanged = function (newSettings) {
            if (newSettings.min_value != currentSettings.min_value || newSettings.max_value != currentSettings.max_value || newSettings.units != currentSettings.units || newSettings.show_pointer != currentSettings.show_pointer) {
                currentSettings = newSettings;
                createGauge();
            }
            else {
                currentSettings = newSettings;
            }

            titleElement.html(newSettings.title);
        }

        this.onCalculatedValueChanged = function (settingName, newValue) {
            if (!_.isUndefined(gaugeObject)) {
                gaugeObject.refresh(Number(newValue));
            }
        }

        this.onDispose = function () {
        }

        this.getHeight = function () {
            return 3;
        }

        this.onSettingsChanged(settings);
    };


    freeboard.loadWidgetPlugin({
        type_name: "dyngaugeCS3",
        display_name: "DynamicGaugeCS3",
        "external_scripts" : [
            "https://tgcsnrsc.github.io/plugins/raphael-2.1.4.min.js",
            "https://tgcsnrsc.github.io/plugins/justgage.js"
        ],
        settings: [
			{
				"name": "id",
				"display_name": "id",
				"default_value": "gauge1",
				"description": "DOM element id of the gauge (must be unique for multiple gauges)"
			},        		
            {
                name: "title",
                display_name: "Title",
                type: "text"
            },
            {
                name: "fontColor",
                display_name: "Font Color",
                type: "text",
				default_value: "#d3d4d4"
            },            
            {
                name: "label_font_color",
                display_name: "Label Font Color",
                type: "text",
				default_value: "#000000"
            },            
            {
				name: "show_pointer",
                display_name: "Show Pointer",
                type: "boolean"
            },            
            {
				name: "reverse_colors",
                display_name: "Use Reverse Colors",
                type: "boolean"
            },            
			{
                name: "value",
                display_name: "Value",
                type: "calculated"
            },
            {
                name: "units",
                display_name: "Units",
                type: "text"
            },
            {
                name: "min_value",
                display_name: "Minimum",
                type: "text",
                default_value: 0
            },
            {
                name: "max_value",
                display_name: "Maximum",
                type: "text",
                default_value: 100
            }
        ],
        newInstance: function (settings, newInstanceCallback) {
            newInstanceCallback(new DynamicGaugeCS3Widget(settings));
        }
    });
    
}());
