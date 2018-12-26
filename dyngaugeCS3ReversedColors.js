window.dyngaugeCS3ReverseColorsID = 0; 
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
 * * 11-19-2018		Shive		New.  Colors Reversed.
 * * ============================================================================
 */
        var DynamicGaugeCS3RWidget = function (settings) {
        var self = this;
        thisdyngaugeCS3ReverseColorsID = "dyngaugeCS3ReverseColors-" + window.dyngaugeCS3ReverseColorsID++;
        var titleElement = $('<h2 class="section-title"></h2>');
        var gaugeElement = $('<div id="' + thisdyngaugeCS3ReverseColorsID + '"></div>');

        var gaugeObject;
        var rendered = false;

        var currentSettings = settings;

        function createGauge() {
            if (!rendered) {
                return;
            }

            gaugeElement.empty();

            gaugeObject = new JustGage({
                id: thisdyngaugeCS3ReverseColorsID,
                value: (_.isUndefined(currentSettings.min_value) ? 0 : currentSettings.min_value),
                min: (_.isUndefined(currentSettings.min_value) ? 0 : currentSettings.min_value),
                max: (_.isUndefined(currentSettings.max_value) ? 0 : currentSettings.max_value),
                label: currentSettings.units,
                showInnerShadow: false,
                valueFontColor: currentSettings.fontColor,
                levelColors: ['#00ff00','#ffff00','#ffa500','#ffa500','#ff0000']
            });
        }

        this.render = function (element) {
            rendered = true;
            $(element).append(titleElement).append($('<div class="gauge-widget-wrapper"></div>').append(gaugeElement));
            createGauge();
        }

        this.onSettingsChanged = function (newSettings) {
            if (newSettings.min_value != currentSettings.min_value || newSettings.max_value != currentSettings.max_value || newSettings.units != currentSettings.units) {
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

    //"plugins/thirdparty/raphael.2.1.0.min.js",
    //"plugins/thirdparty/justgage.1.0.1.js"

	
    freeboard.loadWidgetPlugin({
        type_name: "dyngaugeCS3ReverseColors",
        display_name: "DynamicGaugeCS3R",
        "external_scripts" : [
            "https://tgcsnrsc.github.io/plugins/raphael-2.1.4.min.js",
            "https://tgcsnrsc.github.io/plugins/justgage.js"
        ],
        settings: [
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
            },            {
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
            newInstanceCallback(new DynamicGaugeCS3RWidget(settings));
        }
    });
    
}());