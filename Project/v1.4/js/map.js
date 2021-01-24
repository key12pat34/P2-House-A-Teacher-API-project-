// Step 1: make map object
// Step 2: add base layer
// Step 3: create additional layer


// // Step 1
let map = createMap();
addBaseLayer(map);
// createBorough(map);


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
// function createBorough(map){
//     let link = "../assets/data/nyc.geojson";

//     d3.json(link).then((data) => {
//         console.log(data);

//         let options = {
//             style: mapStyle,
//             onEachFeature: onEachFeature
//         };
//         let borough = L.geoJson(data, options).addTo(map);
//     });
// };



// function mapStyle(feature) {
//     return {
//       color: "white",
//       fillColor: color(feature.properties.borough),
//       fillOpacity: 0.5,
//       weight: 1.5,
//     };
//   }


//   function color(borough) {
//     switch (borough) {
//       case "Brooklyn":
//         return "yellow";
//       case "Bronx":
//         return "red";
//       case "Manhattan":
//         return "orange";
//       case "Queens":
//         return "green";
//       case "Staten Island":
//         return "purple";
//       default:
//         return "black";
//     }
//   }

//   function onEachFeature(feature, layer) {
//     console.log("feature...");
//     layer.on({
//       mouseover: MouseOver,
//       mouseout: MouseOut,
//       click: onClick,
//     });

//     function MouseOver(event) {
//       layer = event.target;
//       layer.setStyle({
//         fillOpacity: 0.9,
//       });
//     }
    
//     function MouseOut(event) {
//       layer = event.target;
//       layer.setStyle({
//         fillOpacity: 0.5,
//       });
//     }
    
//     function onClick(event) {
//       // console.log(event);
//       layer = event.target;
//       map.fitBounds(layer.getBounds());
//     }
    
//     layer.bindPopup(
//       `<h1> ${feature.properties.neighborhood} 
//           </h1> <hr> <h2>
//           ${feature.properties.borough} 
//           </h2>
//           `
//     );
//   }
  












// //drawing function 
// var drawingManager = new google.maps.drawing.DrawingManager();
//   drawingManager.setMap(map);
  


// // This example requires the Drawing library. Include the libraries=drawing
// // parameter when you first load the API. For example:
// // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=drawing">
// function initMap() {
//   const map = new google.maps.Map(document.getElementById("map"), {
//     center: { lat: -34.397, lng: 150.644 },
//     zoom: 8,
//   });
//   const drawingManager = new google.maps.drawing.DrawingManager({
//     drawingMode: google.maps.drawing.OverlayType.MARKER,
//     drawingControl: true,
//     drawingControlOptions: {
//       position: google.maps.ControlPosition.TOP_CENTER,
//       drawingModes: [
//         google.maps.drawing.OverlayType.MARKER,
//         google.maps.drawing.OverlayType.CIRCLE,
//         google.maps.drawing.OverlayType.POLYGON,
//         google.maps.drawing.OverlayType.POLYLINE,
//         google.maps.drawing.OverlayType.RECTANGLE,
//       ],
//     },
//     markerOptions: {
//       icon:
//         "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
//     },
//     circleOptions: {
//       fillColor: "#ffff00",
//       fillOpacity: 1,
//       strokeWeight: 5,
//       clickable: false,
//       editable: true,
//       zIndex: 1,
//     },
//   });
//   drawingManager.setMap(map);
// }

// drawingManager.setOptions({
//   drawingControlOptions: {
//     position: google.maps.ControlPosition.BOTTOM_LEFT,
//     drawingModes: ['marker']
//   }
// });

// // To hide:
// drawingManager.setOptions({
//   drawingControl: false
// });

// // To show:
// drawingManager.setOptions({
//   drawingControl: true
// });

// // drawingManager.setMap(null);

// google.maps.event.addListener(drawingManager, 'circlecomplete', function(circle) {
//   var radius = circle.getRadius();
// });

// google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
//   if (event.type == 'circle') {
//     var radius = event.overlay.getRadius();
//   }
// });


// Realtor API Query
// Realtor API jQuery Code provided code: https://rapidapi.com/apidojo/api/realtor?endpoint=apiendpoint_e259775d-d98e-479f-8440-206d6d4fa892   
var button = d3.select("#filter-btn");
button.on("click", runEnter);

function runEnter() {

  let selectedcity = d3.select("#city").property("value")
  let limit = d3.select("#limit").property("value")
  let minbed = d3.select("#minbed").property("value")
  // let sort = d3.select("#sort")
  let minbath = d3.select("#minbath").property("value")
  let maxprice = d3.select("#maxprice").property("value")
  let maxage = d3.select("#maxage").property("value")

  console.log(selectedcity)

  const settings = {
    "async": true,
    "crossDomain": true,
    // Use this URL when we have the Sort Drop Down/Radial Buttons figured out
    // "url": `https://realtor.p.rapidapi.com/properties/v2/list-for-sale?city=${selectedcity}&limit=${limit}&offset=0&state_code=GA&beds_min=${minbed}&sort=${sort}&baths_min=${minbath}&price_max=${maxprice}&age_max=${maxage}`,
    "url": `https://realtor.p.rapidapi.com/properties/v2/list-for-sale?city=${selectedcity}&limit=${limit}&offset=0&state_code=GA&beds_min=${minbed}&sort=relevance&baths_min=${minbath}&price_max=${maxprice}&age_max=${maxage}`,
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "a32cef4e7fmshe42c5a1bfdbce17p135b01jsn21abc1df2bea",
      "x-rapidapi-host": "realtor.p.rapidapi.com"
    }
  };

  $.ajax(settings).done(function (response) {
    let querydata = [response]
    let coordinates = []
    console.log(querydata)
    var propertyquery = querydata[0].properties
    for (var i = 0; i < propertyquery.length; i++) {
      var property = propertyquery[i]
      let lat = property.address.lat
      let lng = property.address.lon
      let location = [lat, lng]
      let bedcount = property.beds
      let bathcount = property.baths
      let pricecount = property.price
      let weburl = property.rdc_web_url
      let street = property.address.line
      let city = property.address.city
      let state = property.address.state
      let zip = property.address.postal_code
      coordinates.push(location)
      L.marker(location)
      .bindPopup("<h1>" + street + "</h1> <hr> <h3>" + city + "," + state + " " + zip +"</h3> <br> <h4>Beds: " + bedcount + "<br>Baths: " + bathcount + "<br>Price: " + pricecount + '<br><a href="' + weburl + '">See on Realtor.com</a>')
      .addTo(map);
    }
  });

};

let queryaddress = querydata[0][properties][i][address]
let queryprice = querydata[0][properties][i].price
let querybath = querydata[0][properties][i].baths
let querybed = querydata[0][properties][i].beds