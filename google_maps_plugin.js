(function () {
var googleMapWidget = function (settings) {
    var self = this;
    var currentSettings = settings;
    var map;
    var marker;
    var currentPosition = {};

    this.render = function (element) {
        function initializeMap() {
            var mapOptions = {
                zoom: 8,
                //center: new google.maps.LatLng(35.8992, -78.8636),
                center: new google.maps.LatLng(currentSettings.centerLatLng),
                disableDefaultUI: true,
                draggable: true
            };
            element.style.height="800px";
            map = new google.maps.Map(element, mapOptions);
            
            google.maps.event.addDomListener(element, 'mouseenter', function (e) {
                e.cancelBubble = true;
                if (!map.hover) {
                    map.hover = true;
                    map.setOptions({zoomControl: true});
                }
            });

            google.maps.event.addDomListener(element, 'mouseleave', function (e) {
                if (map.hover) {
                    map.setOptions({zoomControl: false});
                    map.hover = false;
                }
            });
        }

        if (window.google && window.google.maps) {
            initializeMap();
        }
        else {
            window.gmap_initialize = initializeMap;
            head.js("https://maps.googleapis.com/maps/api/js?key="+currentSettings.apikey+"&callback=gmap_initialize");
        }
    }

    this.onSettingsChanged = function (newSettings) {
        currentSettings = newSettings;
    }
    this.getHeight = function () {
        return Number(currentSettings.height);
    }
    this.onCalculatedValueChanged = function (settingName, newValue) {
        for(var store in newValue) {
            store = newValue[store];
            if(store.alertState==true) {
                var marker = new google.maps.Marker({
                    position: {lat:Number.parseFloat(store.latitude),lng:Number.parseFloat(store.longitude)},
                    map: map,
                    title: "Store Number " + store
                });
                //marker.addListener('click', function(e) {
                    //alert(store);
                //    window.open('http://10.89.153.3:8080/insights/freeboard/index-dev.html#access=eyJkYXNoYm9hcmQiOiI3MDEiLCJyb2xlIjoidXNlciJ9');
                //});
            }
        }
    }

    this.onDispose = function () {
    }

    this.onSettingsChanged(settings);
};

freeboard.loadWidgetPlugin({
    type_name: "google_map_ext",
    display_name: "Google Map(CS)",
    fill_size: true,
    settings: [
        {
            name: "apikey",
            display_name: "Google API Key",
            type: "text"
        },
        {
            name: "centerLatLng",
            display_name: "Center Latitude, Longitude",
            type: "text"
        },
        {
            name: "locations",
            display_name: "Location source node",
            type: "calculated"
        },
        {
            name: "height",
            display_name: "Vertical blocks consumed",
            type: "number"
        }
    ],
    newInstance: function (settings, newInstanceCallback) {
        newInstanceCallback(new googleMapWidget(settings));
    }
});

}());
