window.dyngaugeIDv5 = 0;
(function() {
	//Toshiba Global Solutions, Inc.
	//Cody Shive
	//DynGauge v5
	//2018.08.03
	//updated 2018.12.26
    var dynamicGaugeV5Widget = function (settings) {
        var self = this;
        var thisdyngaugeIDv5 = "dyngaugeV5-" + window.dyngaugeIDv5++;
        var titleElement = $('<h2 class="section-title"></h2>');
        var gaugeElement = $('<div id="' + thisdyngaugeIDv5 + '"></div>');
        var gaugeObjectv5;
        var rendered = false;
        var currentSettings = settings;
        var currentValues = {
            value: 0,
            min_value: 0,
            max_value: 0,
            level_colors: ['#f45b5b', '#f9c802', '#a9d70b', '#55BF3B'],
        };

        function createGaugev5() {
            if (!rendered) {
                return;
            }

            gaugeElement.empty();

            gaugeObjectv5 = new JustGage({
                id: thisdyngaugeIDv5,
                value: currentValues.value,
                min: currentValues.min_value,
                max: currentValues.max_value,
                label: currentSettings.units,
                showInnerShadow: false,
                valueFontColor: "#d3d4d4",
                levelColors: currentValues.level_colors,
            });
        }

        this.render = function (element) {
            rendered = true;
            $(element).append(titleElement).append($('<div class="gauge-widget-wrapper"></div>').append(gaugeElement));
            createGaugev5();
        }

        this.onSettingsChanged = function (newSettings) {
            if (newSettings.units != currentSettings.units) {
                currentSettings = newSettings;
                createGaugev5();
            }
            else {
                currentSettings = newSettings;
            }

            titleElement.html(newSettings.title);
        }

        this.onCalculatedValueChanged = function (settingName, newValue) {
            currentValues[settingName] = newValue;
            if (!_.isUndefined(gaugeObjectv5)) {
                if (settingName == 'value') {
                    gaugeObjectv5.refresh(Number(newValue));
                } else {
                    createGaugev5();
                }
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
        type_name: "dyngaugev5",
        display_name: "dynamicGaugeV5",
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
                name: "units",
                display_name: "Units",
                type: "text"
            },
            {
                name: "min_value",
                display_name: "Minimum",
                type: "calculated",
                default_value: 0
            },
            {
                name: "max_value",
                display_name: "Maximum",
                type: "calculated",
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
            newInstanceCallback(new dynamicGaugeV5Widget(settings));
        }
    });

}());
