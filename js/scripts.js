mapboxgl.accessToken =
  "pk.eyJ1Ijoiam9hbm5sZWUiLCJhIjoiY2t6aG5wZDJqMGlyZDJwcWhta2pldWNlYyJ9.SF7LAInpjGYwkH-_Wo_4dA";
  // Set bounds to San Francisco, California.
  const bounds = [
    [-74.325943,40.466801], // Southwest coordinates
    [-73.605995,40.934784] // Northeast coordinates
  ];
//long lat for NYC Center
var nycCenter = [-73.935242, 40.73061];

var map = new mapboxgl.Map({
  container: "mapContainer", // HTML container id
  style: "mapbox://styles/mapbox/dark-v9", // style URL
  center: nycCenter, // starting position as [lng, lat]
  zoom: 10,
  minZoom:9.5,
  maxBounds: bounds // Set the map's geographical boundaries.
});

// Statistics for accordion
var stat100 = [`
  <span style="color:#98f0fa;"><b>143,990</b></span> residents across <span style="color:#98f0fa;"><b>78</b></span> developments live in the 100-year floodplain.`

];
var stat500 = [`
  <span style="color:#98f0fa;"><b>202,130</b></span> residents across <span style="color:#98f0fa;"><b>112</b></span> developments live in the 500-year floodplain.`
];
var statMod = [`
  <span style="color:#98f0fa;"><b>171,332</b></span> residents across <span style="color:#98f0fa;"><b>93</b></span> developments live in areas that experience flooding during moderate flood events.`
];
var statExtr = [`
  <span style="color:#98f0fa;"><b>312,573</b></span> residents across <span style="color:#98f0fa;"><b>192</b></span> developments live in areas that experience flooding during extreme flood events.`
];

map.on("load", function () {
  map.addSource("500yr-floodplain", {
    type: "geojson",
    // Use a URL for the value for the `data` property.
    data: "./data/500yr-floodplain.geojson",
  });

  map.addSource("100yr-floodplain", {
    type: "geojson",
    // Use a URL for the value for the `data` property.
    data: "./data/100yr-floodplain.geojson",
  });

  map.addSource("moderate-stormwater-flood", {
    type: "geojson",
    // Use a URL for the value for the `data` property.
    data: "./data/floodmap-moderate.geojson",
  });

  map.addSource("extreme-stormwater-flood", {
    type: "geojson",
    // Use a URL for the value for the `data` property.
    data: "./data/floodmap-extreme.geojson",
  });

  map.addSource("nycha-developments", {
    type: "geojson",
    // Use a URL for the value for the `data` property.
    data: "./data/nycha_developments2.geojson",
  });

  map.addLayer({
    id: "floodplain-500",
    type: "fill",
    source: "500yr-floodplain",
    paint: {
      "fill-color": "#98f0fa",
      "fill-opacity": 0.5,
    },
    layout: {
      visibility: "none",
    },
  });

  map.addLayer({
    id: "floodplain-100",
    type: "fill",
    source: "100yr-floodplain",
    paint: {
      "fill-color": "#98f0fa",
      "fill-opacity": 0.5,
    },
  });

  map.addLayer({
    id: "stormwater-moderate",
    type: "fill",
    source: "moderate-stormwater-flood",
    paint: {
      "fill-color": "#008999",
      "fill-opacity": 0.5,
    },
  });

  map.addLayer({
    id: "stormwater-extreme",
    type: "fill",
    source: "extreme-stormwater-flood",
    paint: {
      "fill-color": "#008999",
      "fill-opacity": 0.5,
    },
    layout: {
      visibility: "none",
    },
  });

  map.addLayer({
    id: "nycha-developments-fill",
    type: "fill",
    source: "nycha-developments",
    paint: {
      "fill-color": "#ffbd24",
      "fill-opacity": 0.9,
    },
  });

/*
  //toggle code from https://docs.mapbox.com/mapbox-gl-js/example/toggle-layers/
  // After the last frame rendered before the map enters an "idle" state.
  map.on("idle", () => {
    // If these two layers were not added to the map, abort
    if (
      !map.getLayer('floodplain-100') ||
      !map.getLayer('floodplain-500') ||
      !map.getLayer('stormwater-moderate') ||
      !map.getLayer('stormwater-extreme')
    ) {
      return;
    }

    // Enumerate ids of the layers.
    //const toggleableLayerIds = ['floodplain-100', 'floodplain-500', 'stormwater-moderate', 'stormwater-extreme'];
    const toggleableLayerIds = [
      {
        id: 'floodplain-100',
        label: '100-year Floodplain'
      },
      {
        id: 'floodplain-500',
        label: '500-year Floodplain'
      },
      {
        id: 'stormwater-moderate',
        label: 'Moderate Stormwater Flood'
      },
      {
        id: 'stormwater-extreme',
        label: 'Extreme Stormwater Flood'
      },
    ];
    // Set up the corresponding toggle button for each layer.
    for (const id of toggleableLayerIds) {
      // Skip layers that already have a button set up.
      if (document.getElementById(layer.id)) {
        continue;
      }

      // Create a link.
      const link = document.createElement("a");
      link.id = id;
      link.href = "#";
      link.textContent = id;
      if (id === 'floodplain-100' || id === 'stormwater-moderate') {
        link.className = 'active';
      }

      // Show or hide layer when the toggle is clicked.
      link.onclick = function (e) {
        const clickedLayer = this.textContent;
        console.log('clickedLayer', clickedLayer)
        e.preventDefault();
        e.stopPropagation();

        const visibility = map.getLayoutProperty(clickedLayer, "visibility");

        var complementaryLayer

        if (clickedLayer === 'stormwater-moderate') {
          complementaryLayer = 'stormwater-extreme'
        }

        if (clickedLayer === 'stormwater-extreme') {
          complementaryLayer = 'stormwater-moderate'
        }

        if (clickedLayer === 'floodplain-100') {
          complementaryLayer = 'floodplain-500'
        }

        if (clickedLayer === 'floodplain-500') {
          complementaryLayer = 'floodplain-100'
        }

        // Toggle layer visibility by changing the layout object's visibility property.
        if (visibility === "none") {
          this.className = "active";
          map.setLayoutProperty(clickedLayer, "visibility", "visible");
          map.setLayoutProperty(complementaryLayer, 'visibility', 'none');
        } else {
          this.className = "";
          map.setLayoutProperty(clickedLayer, "visibility", "none");
          map.setLayoutProperty(complementaryLayer, 'visibility', 'visible')
        }

        $('500-year Floodplain').on('click', function() {
          $('#100-year Floodplain').removeClass('active')})

      };

      const layers = document.getElementById("menu");
      layers.appendChild(link);
    }
  });
  //end toggle
  */

  // Add layer toggle functionality to radio buttons
      // Source: https://hannahrosey.github.io/section8-flood-risk/
      $('.layertoggle').on('click', function(e) {
        if (this.id == '100'){
          var selectedLayer = "floodplain-100"
          var unselectedLayer = "floodplain-500"
          var unselectedId = "#500"
          $('#floodplainStat').html(stat100);

        } else if (this.id == '500'){
          var selectedLayer = "floodplain-500"
          var unselectedLayer = "floodplain-100"
          var unselectedId = "#100"
          $('#floodplainStat').html(stat500);
        }
        if (this.id == 'moderate'){
          var selectedLayer = "stormwater-moderate"
          var unselectedLayer = "stormwater-extreme"
          var unselectedId = "extreme"
          $('#stormsurgeStat').html(statMod);
        } else if (this.id == 'extreme'){
          var selectedLayer = "stormwater-extreme"
          var unselectedLayer = "stormwater-moderate"
          var unselectedId = "moderate"
          $('#stormsurgeStat').html(statExtr);
        }


        // get and toggle radio button checked status for unselected layer
        $(unselectedId).prop('checked', false);

        // get and toggle visibility on for selected layer
        var visibility = map.getLayoutProperty(
          selectedLayer,'visibility'
        );

        if (visibility == 'none'){
          map.setLayoutProperty(selectedLayer, 'visibility', 'visible');
        };

        // get and toggle visibility off for unselected layer
        var visibility = map.getLayoutProperty(
          unselectedLayer,'visibility'
        );

        if (visibility != 'none'){
          map.setLayoutProperty(unselectedLayer, 'visibility', 'none');
        };
      });










  // Create a popup, but don't add it to the map yet.
  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  });

  map.on("mouseenter", "nycha-developments-fill", function (e) {
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = "pointer";

    // Copy coordinates array.
    const coordinates = e.features[0].geometry.coordinates.slice();
    const name = e.features[0].properties.development;
    const population = e.features[0].properties.total_pop;
    const planned_projects = e.features[0].properties.planned_projects;

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    var popupContent = `
        <h6>${name}</h6>
        <p>
          <strong>Population:</strong> ${population}<br>
          <strong>Planned Resiliency Upgrades:</strong> ${planned_projects}
        </p>
      `;

    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(e.lngLat).setHTML(popupContent).addTo(map);
  });

  map.on("mouseleave", "nycha-developments-fill", function () {
    map.getCanvas().style.cursor = "";
    popup.remove();
  });
});
