// accessToken
mapboxgl.accessToken = 'pk.eyJ1IjoibmlraTEyc3RlcCIsImEiOiJjanZlNGFneWswMm0zNDRxcGYwZXYwcjl2In0.fWV3JfWN5hg9UFqDimwIZw';

// adding mapbox map container
var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/niki12step/cjy06zjb90m111cplccxmln9m', // my style url
  zoom: 10.3,
  minZoom: 8,
  maxZoom: 15,
  center: [-73.832966,40.694523],
})

$('#legendCandidate').hide();

// adding zoom and panning control
var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');

// source geojson hosted on github
var sourceUrl = 'https://raw.githubusercontent.com/nikikokkinos/Data/master/QueensDAPrimaryResults.geojson';

// functions to be performed on load
map.on('load', function() {

  map.getCanvas().style.cursor = 'default';

  // tiffanyCaban style layer
  map.addLayer({
    'id': 'Caban',
    'type': 'fill',
    'source': {
      'type': 'geojson',
      'data': sourceUrl,
      },
    'paint': {
      'fill-color': {
        'property': 'Refactored_Caban_VotePrcnt',
        'stops': [
          [0,  '#FFFFFF'],
          [25,  '#fee5d9'],
          [50, '#fcbba1'],
          [75, '#fb6a4a'],
          [90, '#de2d26'],
          [95, '#a50f15'],
        ]
      }
    },
  });

  // melindaKatz style layer
  map.addLayer({
    'id': 'Katz',
    'type': 'fill',
    'source': {
      'type': 'geojson',
      'data': sourceUrl,
      },
    'paint': {
      'fill-color': {
        'property': 'Refactored_Katz_VotePrcnt',
        'stops': [
          [0,  '#FFFFFF'],
          [25,  '#fee5d9'],
          [50, '#fcbba1'],
          [75, '#fb6a4a'],
          [90, '#de2d26'],
          [95, '#a50f15'],
        ]
      }
    },
  });

  // totalVote style layer
  map.addLayer({
    'id': 'Total',
    'type': 'fill',
    'source': {
      'type': 'geojson',
      'data': sourceUrl,
      },
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
    },
  });

  // // creating variables to hold quantities & colors of Total layer
  // var layers = ['0', '0-30', '30-50', '50-70', '70-100', '100-125', '125+'];
  // var colors = ['#FFFFFF', '#fee5d9', '#fcbba1', '#fc9272', '#fb6a4a', '#de2d26', '#a50f15'];
  //
  // // creating variables to hold quantities & colors of candidate layers
  // var candidateLayers = ['0', '0-25', '25-50', '50-75', '75-90', '90-95', '95 +'];
  // var candidateColors = ['#FFFFFF', '#fee5d9', '#fcbba1', '#fb6a4a', '#de2d26', '#a50f15'];

  // // creating a loop function to create legend with layers and colors on Total layer
  // for (i = 0; i < layers.length; i++) {
  //
  //   var layer = layers[i];
  //   var color = colors[i];
  //
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
  // }
  //
  // for (i = 0; i < candidateLayers.length; i++) {
  //
  //   var candidateLayer = candidateLayers[i];
  //   var candidateColor = candidateColors[i];
  //
  //   var item2 = document.createElement('div');
  //   var key2 = document.createElement('span');
  //   key2.className = 'legend-keyCandidate';
  //   key2.style.backgroundColor = candidateColor;
  //
  //   var value2 = document.createElement('span');
  //   value2.innerHTML = candidateLayer;
  //   item2.appendChild(key2);
  //   item2.appendChild(value2);
  //   legendCandidate.appendChild(item2);
  // }

  map.on('mousemove', function () {
    if (document.getElementById('total').checked) {

      $('#legend').show();
      $('#legendCandidate').hide();

      map.on('mousemove', function totalFunction(e) {
        var EDs = map.queryRenderedFeatures(e.point, {
          layers: ['Total']
        });
        if (EDs.length > 0) {
          document.getElementById('pd').innerHTML = '<h3><strong>' + EDs[0].properties.ElectDist + '</strong></h3><p><strong><em>' + EDs[0].properties.Refactored_Total_Votes_ED + '</strong> votes cast</em></p>';
        } else {
          document.getElementById('pd').innerHTML = '<p>Hover over an Election District!</p>';
        }
      })
  }

    if (document.getElementById('tiffany').checked) {

      $('#legendCandidate').show();
      $('#legend').hide();

      map.on('mousemove', function candidateFunction(e) {
        var cabanEDs = map.queryRenderedFeatures(e.point, {
          layers: ['Caban']
        });
        if (cabanEDs.length > 0) {
          document.getElementById('pd').innerHTML = '<h3><strong>' + cabanEDs[0].properties.ElectDist + '</strong></h3><p><strong><em>' + cabanEDs[0].properties.Refactored_Caban_VotePrcnt + '</strong>% of votes cast</em></p>';
        } else {
          document.getElementById('pd').innerHTML = '<p>Hover over an Election District!</p>';
        }
      });
    }

    if (document.getElementById('melinda').checked) {

      $('#legendCandidate').show();
      $('#legend').hide();
      
      map.on('mousemove', function candidateFunction(e) {
        var katzEDs = map.queryRenderedFeatures(e.point, {
          layers: ['Katz']
        });

        if (katzEDs.length > 0) {
          document.getElementById('pd').innerHTML = '<h3><strong>' + katzEDs[0].properties.ElectDist + '</strong></h3><p><strong><em>' + katzEDs[0].properties.Refactored_Katz_VotePrcnt + '</strong>% of votes cast</em></p>';
        } else {
          document.getElementById('pd').innerHTML = '<p>Hover over an Election District!</p>';
        }
      });
    }
  })

  // creating a var that selects the radio buttons created in html
  var radioButton = $('#layerToggle')

  // creating function that changes z-index of layer based on radio button selection
  radioButton.on("click", function () {
    if (document.getElementById('total').checked) {
        map.moveLayer('Total');
    } if (document.getElementById('tiffany').checked) {
        map.moveLayer('Caban');
    } if (document.getElementById('melinda').checked) {
        map.moveLayer('Katz');
    }
  });

});
