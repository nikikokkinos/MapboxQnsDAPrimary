mapboxgl.accessToken = 'pk.eyJ1IjoibmlraTEyc3RlcCIsImEiOiJjanZlNGFneWswMm0zNDRxcGYwZXYwcjl2In0.fWV3JfWN5hg9UFqDimwIZw';

var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/niki12step/cjy06zjb90m111cplccxmln9m', // my style url
})

map.on('load', function() {
  // the rest of the code will go in here
  map.getCanvas().style.cursor = 'default';
  map.fitBounds([[-74.235539,40.488127],[-73.394398,40.869824]]);

  var sourceUrl = 'https://raw.githubusercontent.com/nikikokkinos/Data/master/QueensDAPrimaryResults.geojson';

  map.addSource('QueensDAPrimaryResults', {
    type: 'geojson',
    data: sourceUrl,
  });

  map.addLayer({
    'id': 'totalVotes',
    'type': 'fill',
    'source': 'QueensDAPrimaryResults',
    'paint': {
      'fill-color': {
        'property': 'Refactored_Total_Votes_ED',
        'stops': [
          [0,  '#FFFFFF'],
          [1,  '#fee5d9'],
          [30, '#fcbba1'],
          [50, '#fc9272'],
          [70, '#fb6a4a'],
          [100, '#de2d26'],
          [125, '#a50f15'],
        ]
      }
    }
  });

  var layers = ['0', '0-30', '30-50', '50-70', '70-100', '100-125', '125+'];
  var colors = ['#FFFFFF', '#fee5d9', '#fcbba1', '#fc9272', '#fb6a4a', '#de2d26', '#a50f15'];

  for (i = 0; i < layers.length; i++) {
  var layer = layers[i];
  var color = colors[i];
  var item = document.createElement('div');
  var key = document.createElement('span');
  key.className = 'legend-key';
  key.style.backgroundColor = color;

  var value = document.createElement('span');
  value.innerHTML = layer;
  item.appendChild(key);
  item.appendChild(value);
  legend.appendChild(item);
  }

  map.on('mousemove', function(e) {
    var EDs = map.queryRenderedFeatures(e.point, {
      layers: ['totalVotes']
    });

    if (EDs.length > 0) {
      document.getElementById('pd').innerHTML = '<h3><strong>' + EDs[0].properties.ElectDist + '</strong></h3><p><strong><em>' + EDs[0].properties.Refactored_Total_Votes_ED + '</strong> votes cast</em></p>';
    } else {
      document.getElementById('pd').innerHTML = '<p>Hover over an Election District!</p>';
    }
  });

  // var layerControl =
  //
  // map.addControl(layercontrol, 'top-left');

  // mapbox geocoder
  // map.addControl(new MapboxGeocoder({
  //   accessToken: mapboxgl.accessToken,
  //   mapboxgl: mapboxgl,
  // }));

  // var mapboxgl = require('mapbox-gl');
  // var MapboxDirections = require('@mapbox/mapbox-gl-directions');
  //
  // var directions = new MapboxDirections({
  //   accessToken: 'pk.eyJ1IjoibmlraTEyc3RlcCIsImEiOiJjanZlNGFneWswMm0zNDRxcGYwZXYwcjl2In0.fWV3JfWN5hg9UFqDimwIZw',
  //   unit: 'metric',
  //   profile: 'mapbox/cycling'
  // });
  //
  // map.addControl(directions, 'top-left');

  // map.addControl( new MapboxDirections({
  //   accessToken: 'pk.eyJ1IjoibmlraTEyc3RlcCIsImEiOiJjanZlNGFneWswMm0zNDRxcGYwZXYwcjl2In0.fWV3JfWN5hg9UFqDimwIZw',
  // }), 'top-left');

});

// var map = new mapboxgl.Map({
//   container: 'map', // container id
//   style: 'mapbox://styles/niki12step/cjxxnbwac028n1cpqdezd3di8', // my style url
// })

// map.on('load', function() {
//   // the rest of the code will go in here
//   map.getCanvas().style.cursor = 'default';
//   map.fitBounds([[-74.235539,40.488127],[-73.394398,40.869824]]);
//
//   var layers = ['0-50', '50-100', '100-150', '150-200', '200-250', '250+'];
//   var colors = ['#feedde', '#fdd0a2', '#fdae6b', '#fd8d3c', '#e6550d', '#a63603'];
//
//   for (i = 0; i < layers.length; i++) {
//   var layer = layers[i];
//   var color = colors[i];
//   var item = document.createElement('div');
//   var key = document.createElement('span');
//   key.className = 'legend-key';
//   key.style.backgroundColor = color;
//
//   var value = document.createElement('span');
//   value.innerHTML = layer;
//   item.appendChild(key);
//   item.appendChild(value);
//   legend.appendChild(item);
//   }
//
//   map.on('mousemove', function(e) {
//     var EDs = map.queryRenderedFeatures(e.point, {
//       layers: ['TotalVotes']
//     });
//
//     if (EDs.length > 0) {
//       document.getElementById('pd').innerHTML = '<h3><strong>' + EDs[0].properties.ElectDist + '</strong></h3><p><strong><em>' + EDs[0].properties.Refactored_Total_Votes_ED + '</strong> votes cast</em></p>';
//     } else {
//       document.getElementById('pd').innerHTML = '<p>Hover over an Election District!</p>';
//     }
//   });
//
//   // var layerControl =
//   //
//   // map.addControl(layercontrol, 'top-left');
//
//   // mapbox geocoder
//   // map.addControl(new MapboxGeocoder({
//   //   accessToken: mapboxgl.accessToken,
//   //   mapboxgl: mapboxgl,
//   // }));
//
//   // var mapboxgl = require('mapbox-gl');
//   // var MapboxDirections = require('@mapbox/mapbox-gl-directions');
//   //
//   // var directions = new MapboxDirections({
//   //   accessToken: 'pk.eyJ1IjoibmlraTEyc3RlcCIsImEiOiJjanZlNGFneWswMm0zNDRxcGYwZXYwcjl2In0.fWV3JfWN5hg9UFqDimwIZw',
//   //   unit: 'metric',
//   //   profile: 'mapbox/cycling'
//   // });
//   //
//   // map.addControl(directions, 'top-left');
//
//   // map.addControl( new MapboxDirections({
//   //   accessToken: 'pk.eyJ1IjoibmlraTEyc3RlcCIsImEiOiJjanZlNGFneWswMm0zNDRxcGYwZXYwcjl2In0.fWV3JfWN5hg9UFqDimwIZw',
//   // }), 'top-left');
//
// });
