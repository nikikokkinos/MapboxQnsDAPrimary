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

// adding zoom and panning control
var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');

// source geojson hosted on github
var sourceUrl = 'https://raw.githubusercontent.com/nikikokkinos/Data/master/QueensDAPrimaryResults.geojson';

// functions to be performed on load
map.on('load', function() {

  map.getCanvas().style.cursor = 'default';
  
  // tiffanyCaban style layer
  var tiffanyLayer = map.addLayer({
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
  var melindaLayer = map.addLayer({
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
  var totalVoteLayer = map.addLayer({
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

  // var layers = ['0', '0-30', '30-50', '50-70', '70-100', '100-125', '125+'];
  // var colors = ['#FFFFFF', '#fee5d9', '#fcbba1', '#fc9272', '#fb6a4a', '#de2d26', '#a50f15'];
  //
  // for (i = 0; i < layers.length; i++) {
  // var layer = layers[i];
  // var color = colors[i];
  // var item = document.createElement('div');
  // var key = document.createElement('span');
  // key.className = 'legend-key';
  // key.style.backgroundColor = color;
  //
  // var value = document.createElement('span');
  // value.innerHTML = layer;
  // item.appendChild(key);
  // item.appendChild(value);
  // legend.appendChild(item);
  // }
  //
  // var layers = ['0%', '0%-25%', '25%-50%', '50%-75%', '75%-90%', '90%-95%', '95% +'];
  // var colors = ['#FFFFFF', '#fee5d9', '#fcbba1', '#fb6a4a', '#de2d26', '#a50f15'];
  //
  // for (i = 0; i < layers.length; i++) {
  // var layer = layers[i];
  // var color = colors[i];
  // var item = document.createElement('div');
  // var key = document.createElement('span');
  // key.className = 'legend-key';
  // key.style.backgroundColor = color;
  //
  // var value = document.createElement('span');
  // value.innerHTML = layer;
  // item.appendChild(key);
  // item.appendChild(value);
  // legend.appendChild(item);
  // }
  //
  // map.on('mousemove', function(e) {
  //   var EDs = map.queryRenderedFeatures(e.point, {
  //     layers: ['totalVotes']
  //   });
  //
  //   if (EDs.length > 0) {
  //     document.getElementById('pd').innerHTML = '<h3><strong>' + EDs[0].properties.ElectDist + '</strong></h3><p><strong><em>' + EDs[0].properties.Refactored_Total_Votes_ED + '</strong> votes cast</em></p>';
  //   } else {
  //     document.getElementById('pd').innerHTML = '<p>Hover over an Election District!</p>';
  //   }
  // });
  //
  // map.on('mousemove', function(e) {
  //   var cabanEDs = map.queryRenderedFeatures(e.point, {
  //     layers: ['cabanVotePrcnt']
  //   });
  //
  //   if (cabanEDs.length > 0) {
  //     document.getElementById('pd').innerHTML = '<h3><strong>' + EDs[0].properties.ElectDist + '</strong></h3><p><strong><em>' + EDs[0].properties.Refactored_Caban_VotePrcnt + '</strong>% of votes cast</em></p>';
  //   } else {
  //     document.getElementById('pd').innerHTML = '<p>Hover over an Election District!</p>';
  //   }
  // });

  // var radioButton = document.getElementById('layerToggle');

  var radioButton = $("layerToggle")

  radioButton.on("click", function(){
    if (radioButton.value === " Total Votes Cast " ) {
        totalVoteLayer.bringToFront();
        tiffanyLayer.bringToBack();
        melindaLayer.bringToBack();
    } if (radioButton.value === " Percentage of Vote for Tiffany Caban ") {
        tiffanyLayer.bringToFront();
        totalVoteLayer.bringToBack();
        melindaLayer.bringToBack();
    } if (radioButton.value === " Percentage of Vote for Melinda Katz ") {
        melindaLayer.bringToFront();
        totalVoteLayer.bringToBack();
        tiffanyLayer.bringToBack();
    }
  })
});
