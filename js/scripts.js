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

var adUrl = 'https://raw.githubusercontent.com/nikikokkinos/Data/master/QueensADs.geojson'

// functions to be performed on load
map.on('load', function() {

  map.getCanvas().style.cursor = 'default';

  map.addLayer({
    'id': 'AssemblyDistricts',
    'type': 'fill',
    'source': {
        'type': 'geojson',
        'data': adUrl,
      },
    'layout': {
      'visibility': 'none',
      },
    'paint': {
        'fill-color': 'black',
        'fill-opacity': 0.3,
        'fill-outline-color': 'black',
      },
  });

  // tiffanyCaban style layer
  map.addLayer({
    'id': 'Caban',
    'type': 'fill',
    'source': {
      'type': 'geojson',
      'data': sourceUrl,
      },
    'layout': {
      'visibility': 'none',
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
    'layout': {
      'visibility': 'none',
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
        map.setLayoutProperty('Caban', 'visibility', 'visible')
        map.moveLayer('Caban');
    } if (document.getElementById('melinda').checked) {
        map.setLayoutProperty('Katz', 'visibility', 'visible')
        map.moveLayer('Katz');
    } if (document.getElementById('ad').checked) {
      map.setLayoutProperty('AssemblyDistricts', 'visibility', 'visible')
      map.moveLayer('AssemblyDistricts')
    }
  });

});
