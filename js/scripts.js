mapboxgl.accessToken = 'pk.eyJ1Ijoiam9hbm5sZWUiLCJhIjoiY2t6aG5wZDJqMGlyZDJwcWhta2pldWNlYyJ9.SF7LAInpjGYwkH-_Wo_4dA';

  //long lat for NYC Center
  var nycCenter = [-73.935242, 40.730610]

  var map = new mapboxgl.Map({
    container: 'mapContainer', // HTML container id
    style: 'mapbox://styles/mapbox/dark-v9', // style URL
    center: nycCenter, // starting position as [lng, lat]
    zoom: 10
  });

  map.on('load', function() {
    map.addSource('500yr-floodplain', {
      type: 'geojson',
      // Use a URL for the value for the `data` property.
      data: './data/500yr-floodplain.geojson'
      });

    map.addSource('100yr-floodplain', {
      type: 'geojson',
      // Use a URL for the value for the `data` property.
      data: './data/100yr-floodplain.geojson'
      });

      map.addSource('nycha-developments', {
        type: 'geojson',
        // Use a URL for the value for the `data` property.
        data: './data/nycha_developments.geojson'
        });

      map.addLayer({
        'id': '500yr-floodplain-fill',
        'type': 'fill',
        'source': '500yr-floodplain',
        'paint': {
          'fill-color': '#008999',
          'fill-opacity': .3,
        }
      });

      map.addLayer({
        'id': '100yr-floodplain-fill',
        'type': 'fill',
        'source': '100yr-floodplain',
        'paint': {
          'fill-color': '#98f0fa',
          'fill-opacity': .3,
        }

      });

      map.addLayer({
        'id': 'nycha-developments-fill',
        'type': 'fill',
        'source': 'nycha-developments',
        'paint': {
          'fill-color': '#ffbd24',
          'fill-opacity': .9,
        }

      });



      // Create a popup, but don't add it to the map yet.
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });

    map.on('mouseenter', 'nycha-developments-fill', function(e) {
      // Change the cursor style as a UI indicator.
      map.getCanvas().style.cursor = 'pointer';

      // Copy coordinates array.
      const coordinates = e.features[0].geometry.coordinates.slice();
      const name = e.features[0].properties.development;
      const population = e.features[0].properties.total_pop;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      var popupContent = `
        <h3 style="color:#404040;">${name}</h3>
        <p style="color:#404040;"><strong>Population:</strong> ${population}</p>
      `

      // Populate the popup and set its coordinates
      // based on the feature found.
      popup.setLngLat(e.lngLat).setHTML(popupContent).addTo(map);
    });

    map.on('mouseleave', 'nycha-developments-fill', function() {
      map.getCanvas().style.cursor = '';
      popup.remove();
    });




})
