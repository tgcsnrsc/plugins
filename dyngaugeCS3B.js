window.dyngaugeCS3BID = 0; 
(function() {    
	//Toshiba Global Solutions, Inc.
	//Cody Shive
	//DynGauge v3B
	//2018.12.26
        var DynamicGaugeCS3Widget = function (settings) {
        var self = this;
        thisdyngaugeCS3BID = "dyngaugeCS3B-" + window.dyngaugeCS3BID++;
        var titleElement = $('<h2 class="section-title"></h2>');
        var gaugeElement = $('<div id="' + thisdyngaugeCS3BID + '"></div>');

        var gaugeObject;
        var rendered = false;

        var currentSettings = settings;

        function createGauge() {
            if (!rendered) {
                return;
            }

            gaugeElement.empty();

            gaugeObject = new JustGage({
                id: thisdyngaugeCS3BID,
                value: (_.isUndefined(currentSettings.min_value) ? 0 : currentSettings.min_value),
                min: (_.isUndefined(currentSettings.min_value) ? 0 : currentSettings.min_value),
                max: (_.isUndefined(currentSettings.max_value) ? 0 : currentSettings.max_value),
                label: currentSettings.units,
                showInnerShadow: currentSettings.showInnerShadow,
				valueFontColor: currentSettings.fontcolor,
				levelColors: currentSettings.level_colors
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

    freeboard.loadWidgetPlugin({
        type_name: "dyngaugeCS3B",
        display_name: "DynamicGaugeCS3B",
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
                name: "value",
                display_name: "Value",
                type: "calculated"
            },
            {
                name: "fontcolor",
                display_name: "Font Color",
                type: "text",
				default_value: "#d3d4d4"
            },
            {
                name: "showInnerShadow",
                display_name: "Show Inner Shadow",
                type: "boolean"
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
            },
            {
                name: "level_colors",
                display_name: "Level colors",
                type: "calculated",
                default_value: "return ['#C03C3C','#de0700',  '#a9d70b', '#55BF3B']"
            }			
        ],
        newInstance: function (settings, newInstanceCallback) {
            newInstanceCallback(new DynamicGaugeCS3Widget(settings));
        }
    });
    
}());
