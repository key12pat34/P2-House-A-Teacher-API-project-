
// Realtor API Node.JS provided code: https://rapidapi.com/apidojo/api/realtor?endpoint=apiendpoint_e259775d-d98e-479f-8440-206d6d4fa892  
// const request = require('request');

// const options = {
//   method: 'GET',
//   url: 'https://realtor.p.rapidapi.com/properties/v2/list-for-sale',
//   qs: {
//     city: 'Atlanta',
//     limit: '200',
//     offset: '0',
//     state_code: 'GA',
//     age_min: '1',
//     beds_min: '2',
//     price_min: '1',
//     sort: 'relevance',
//     baths_min: '2',
//     price_max: '2',
//     age_max: '2'
//   },
//   headers: {
//     'x-rapidapi-key': 'a32cef4e7fmshe42c5a1bfdbce17p135b01jsn21abc1df2bea',
//     'x-rapidapi-host': 'realtor.p.rapidapi.com',
//     useQueryString: true
//   }
// };

// request(options, function (error, response, body) {
// 	if (error) throw new Error(error);

// 	console.log(body);
// });




// Step 1: make map object
// Step 2: add base layer
// Step 3: create additional layer


// Step 1
let map = createMap();
addBaseLayer(map);
createBorough(map);


function createMap() {
    // Creating map object
    let map = L.map("map", {
      center: [33.776108, -84.397530],
      zoom: 15,
    });
    return map;
};

// Step 2
function addBaseLayer(map) {
    let baseLayer = L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY,
      }
    );
    baseLayer.addTo(map);
};


// Step 3
function createBorough(map){
    let link = "static/data/nyc.geojson";

    d3.json(link).then((data) => {
        console.log(data);

        let options = {
            style: mapStyle,
            onEachFeature: onEachFeature
        };
        let borough = L.geoJson(data, options).addTo(map);
    });
};



function mapStyle(feature) {
    return {
      color: "white",
      fillColor: color(feature.properties.borough),
      fillOpacity: 0.5,
      weight: 1.5,
    };
  }


  function color(borough) {
    switch (borough) {
      case "Brooklyn":
        return "yellow";
      case "Bronx":
        return "red";
      case "Manhattan":
        return "orange";
      case "Queens":
        return "green";
      case "Staten Island":
        return "purple";
      default:
        return "black";
    }
  }

  function onEachFeature(feature, layer) {
    console.log("feature...");
    layer.on({
      mouseover: MouseOver,
      mouseout: MouseOut,
      click: onClick,
    });

    function MouseOver(event) {
      layer = event.target;
      layer.setStyle({
        fillOpacity: 0.9,
      });
    }
    
    function MouseOut(event) {
      layer = event.target;
      layer.setStyle({
        fillOpacity: 0.5,
      });
    }
    
    function onClick(event) {
      // console.log(event);
      layer = event.target;
      map.fitBounds(layer.getBounds());
    }
    
    layer.bindPopup(
      `<h1> ${feature.properties.neighborhood} 
          </h1> <hr> <h2>
          ${feature.properties.borough} 
          </h2>
          `
    );
  }
  




