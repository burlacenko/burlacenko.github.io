//
// as part of MIT xPro Full Stack Developer, Web Developer module
// this app will show actual bus position and follow it in real time (15s delays)
//

mapboxgl.accessToken = 'pk.eyJ1IjoiZGFidXIiLCJhIjoiY2t0ZGRrcnY5MmVoODJvcGxoejhqa2E3aiJ9.FjJ54plV2izjSx1m_t_93w';

var lastBusLocations = [];
//var busesAndAddresses = [];
var lastDateTime = Date;
var lastBusInfo = {busLocations: [],
      			   date: Date};
var infoDataSet = [];
var limitInfoDataSet = -1; // use -1 for no limit!
var limitCounter = 0;
var intervalTimeMS = 15000;
var allMarkers = [];
var aMarkerBeingFollowed = undefined;
var counter = 0;
var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v11',
	center: [-71.104081, 42.365554],
	zoom: 14
});
var routeMain = 1;
var currentRoute = 1;

function setMarkerHTML(aBusRef, busAndAddress) {
    
    // let markerElement = aBusRef.marker.getElement();

    // markerElement
    //   .querySelectorAll('svg g[fill="' + marker._color + '"]')[0]
    //   .setAttribute("innerHTML", text);

    // marker._color = color;

    // markerElement._popup.setHTML('<h3>Bus ' + aBusRef.busName + '</h3> <p>Current stop sequence: ' + aBusRef.marker.attributes.current_stop_sequence + '</p> <p>Address: '+ busAndAddress.address +'</p>');
    aBusRef.marker._popup.setHTML('<h3>Bus ' + aBusRef.busName + '</h3> <p>Current stop sequence: ' + busAndAddress.busAttribute.current_stop_sequence + '</p> <p>Bearing: ' + busAndAddress.busAttribute.bearing + '</p> <p>Address: '+ busAndAddress.address +'</p>');
}

function setMarkerColorBusIcon(marker, color, aBusLocation) {
    //debugger;
    // marker._element => is the same as the "markerElement" obtained by "marker.getElement()"
    // interesting: marker._element.classList;
    let markerElement = marker.getElement();
    // markerElement
    //   .querySelectorAll('svg g[fill="' + marker._color + '"]')[0]
    //   .setAttribute("fill", color);
    // marker._color = color;

    // how about this? document.getElementById('n' + String(position)).classList.toggle('on');
    // this works now that I set IDs for each marker according to busLocation id given by mapbox!
    aBusLocation.attributes.bearing;
    
    if (color === 'green') {
        document.getElementById(aBusLocation.id).classList.toggle('markerGreen');
    } else { if (color === 'red') {
             document.getElementById(aBusLocation.id).classList.toggle('markerRed');
            } else {
                document.getElementById(aBusLocation.id).classList.toggle('markerBlue');
            }
            }
}

function setRotation(busReference) { 
    // (marker, bearing)
    // (busReference.marker, aBusLocation.attributes.bearing);
    // rotate it accordingly to bearing
    //marker._rotation = bearing;
    busReference.marker._rotation = busReference.busLocation.attributes.bearing;
}

function setMarkerColorDefaultMapboxIcon(marker, color) {
    let markerElement = marker.getElement();
    markerElement
      .querySelectorAll('svg g[fill="' + marker._color + '"]')[0]
      .setAttribute("fill", color);
    marker._color = color;
}

function listBusLines(arrayOfBusLocations) {
	let labelList = [];
	arrayOfBusLocations.forEach(element => {
		return labelList.push(element.attributes.label);
	});

	labelList.sort(compareAsc);
	return labelList;
}

function listActiveBusLinesNow() {
	return listBusLines(lastBusLocations);
}

function updateTagOfHTML(componentInnerHTML, tag, newText) {
    let HTML = componentProperty;
}

function createNewMarker(aBusName, aBusLocation, lngLat) {
    if ((aBusName === '') || (typeof aBusName === 'undefined') || (lngLat === [])) {
        return;
    } else {
    let mk = document.createElement('div');
    mk.id = aBusLocation.id;
    mk.className = 'marker';        
    // let aMarker = new mapboxgl.Marker({color: 'blue', draggable: false, rotation: 0})
    let aMarker = new mapboxgl.Marker(mk)
    .setLngLat(lngLat)
    .setPopup(new mapboxgl.Popup({ offset: 25, closeOnClick: true, closeButton: true, className: 'marker-popup' })
                          .setHTML('<h3>' + 'Bus ' + aBusName + '</h3> <p>' + 'Current stop sequence: ' + '</p>'))
    .addTo(map);     
    // aMarker._element.id has the id given by mapbox    
    allMarkers.push({busName: aBusName, marker: aMarker, busLocation: aBusLocation}); 
    };
    // to change rotation: marker.setRotation(number)
}

function centerMap(coords) {
    map.flyTo({
        center: coords,
        // zoom: 9, // will not change the zoom
        // bearing: 0, // will not change the bearing
        speed: 0.2,
        curve: 1,
        easing: (t) => t,
        essential: true,
    });    
}

function displayBusMarker(aBusLocation) {
    //debugger;
    // locate maker in allMarker array
    let busReference = getMarker(aBusLocation.attributes.label);

    // update longitude, latitude
    let lngLat = [];
    lngLat.push(aBusLocation.attributes.longitude);
    lngLat.push(aBusLocation.attributes.latitude);

    if (typeof busReference !== 'undefined') {
        busReference.marker.setLngLat(lngLat);
        busReference.marker._popup.setHTML('<h3>' + 'Bus ' + aBusLocation.attributes.label + '</h3> <p>' + 'Current stop sequence: ' + aBusLocation.attributes.current_stop_sequence + '</p>')

        // update address


        // adjust color according to seats available
        // green: "MANY_SEATS_AVAILABLE"
        // red: "FEW_SEATS_AVAILABLE"
        // blue: undefined
        if (aBusLocation.attributes.occupancy_status === 'MANY_SEATS_AVAILABLE') {
            setMarkerColorBusIcon(busReference.marker, 'green', aBusLocation);
        } else { if (aBusLocation.attributes.occupancy_status === 'FEW_SEATS_AVAILABLE') {
                setMarkerColorBusIcon(busReference.marker, 'red', aBusLocation);
                } else {
                    setMarkerColorBusIcon(busReference.marker, 'blue', aBusLocation);
                }
        };

        // set rotations:
        setRotation(busReference); //(busReference.marker, aBusLocation.attributes.bearing);
    }
}

function getMarker(label) {
    //debugger;
    let busReference = allMarkers.find( aMarker => {
        return aMarker.busName === label
    });

    return busReference; 
}

function getMarkerByID(elementID) {
    debugger;
    let busElement = document.getElementById(elementID);
    let busReference = allMarkers.find( aMarker => {
        return aMarker.marker.id === elementID
    });
    return ({marker: busReference, element: busElement}); 
}

function existMarker(label) {
    //debugger;
    let busReference = undefined;
    
    busReference = allMarkers.find( aMarker => {
        return aMarker.busName === label
    });

    return (typeof busReference !== 'undefined'); 
}

async function run(){
    // get bus data    
	const busLocations = await getBusLocations();
    // const busAddress = await getAddress(busLocations[0].attributes.longitude, busLocations[0].attributes.latitude);

	lastDateTime = new Date();
	lastBusLocations = busLocations;
	lastBusInfo = {busLocations: lastBusLocations,
				   datetime: lastDateTime};
	infoDataSet.push(lastBusInfo);

	limitCounter++;

	console.log(lastDateTime);
	console.log(lastBusLocations);
	console.log(listActiveBusLinesNow());

    updateAddresses();

	// SHOULD update this markers update from here to AFTER updateAddresses:
    // display index 0
    
    //debugger;
    lastBusLocations.forEach(aBusLocation => {
        // ATTENTION: bus "id" is at aBusLocation.id, which if parallel to aBusLocation.attributes
        // look for the marker of this bus
        if(existMarker(aBusLocation.attributes.label)) {
            // update marker position
            displayBusMarker(aBusLocation);
        } else {
            // create marker
            createNewMarker(aBusLocation.attributes.label,
                            aBusLocation,
                            [aBusLocation.attributes.longitude, aBusLocation.attributes.latitude ]);
        }
    });
   
	// set timer
	if (limitCounter = -1) {
        setTimeout(run, intervalTimeMS)
    } else {
        if (limitCounter < limitInfoDataSet) {
            setTimeout(run, intervalTimeMS);
        } else {
            console.log('Ended update after ' + limitCounter + ' loops');
        }
    }
}

async function updateAddresses() {
    // const address0 = await getAddress(busLocations[0].attributes.longitude, busLocations[0].attributes.latitude);
    // const busAddress = await getAddress(busLocations[0].attributes.longitude, busLocations[0].attributes.latitude);
    // let size = busAddressForTesting.features.length;
    // console.log('test geoJson size =' + size);

    let busesAndAddresses = [];

    for (let i = 0; i < lastBusLocations.length; i++) {
        let aBusLocation = lastBusLocations[i];
        let aAddress = await getAddress(aBusLocation.attributes.longitude, aBusLocation.attributes.latitude);
        
        busesAndAddresses.push({bus: aBusLocation.attributes.label,
                                busAttribute: aBusLocation.attributes,
                                address: aAddress});
    }

    busesAndAddresses.forEach(busAndAddress => {
        console.log('Address for bus '+ busAndAddress.bus +' = ' + busAndAddress.address);
        
        // update markers, looping and matching their names
        let busReference = undefined;
        
        busReference = getMarker(busAndAddress.bus);
        if (typeof busReference !== 'undefined') {
            setMarkerHTML(busReference, busAndAddress); 
        }
    });

    //tell the map to center on the marker coordinates
    // ONLY if I am following a specific bus!!
    if (typeof aMarkerBeingFollowed !== 'undefined'){
        centerMap([aMarkerBeingFollowed.longitude, aMarkerBeingFollowed.latitude]);
    }    
}

async function getAddress(longitude, latitude){
	let result = '';
    const url = 'http://api.tiles.mapbox.com/v4/geocode/mapbox.places-v1/'+longitude+','+latitude+'.json?access_token=' + mapboxgl.accessToken;
	const response = await fetch(url);
	const json     = await response.json();
    //debugger;
    let thisAddress = json.data; // undefined !
	// return json;
    // important: this json we contain an array "json.features" and the address is at index "0"
    // json.features[0].place_name; // long address
    // json.features[0].text; // short address (street)
    // json.features[0].geometry.coordinates;
    // // comparison to confirm the right feature (we need the "address"):
    // json.features[0].place_type[0] === 'address';
    // json.features[0];
    // json.features.length;
    for (let i = 0; i < json.features.length; i++) {
        const feature = json.features[i];
        for (let f = 0; f < feature.place_type.length; f++) {
            const placeType = feature.place_type[f];
            if (placeType === 'address'){
                // short address:
                result = json.features[i].address + ' ' + json.features[i].text;
                // long address:
                result = json.features[i].place_name;
                return result;            
            }
        }
    }
}

// Request bus data from MBTA
async function getBusLocations(){
    // check for more cool possibilities:
    // https://www.mbta.com/developers/v3-api
    // https://api-v3.mbta.com/docs/swagger/index.html
    // https://github.com/google/transit/blob/master/gtfs/spec/en/reference.md#routestxt
        // future updates:
            // BASIC CALLS
            // The V3 API data model is based on GTFS and GTFS-realtime where applicable. The following calls are available:
                // alerts
                // facilities - elevators, escalators, and (coming soon) parking lots, bike racks, etc.
                // predictions - predicted arrival/departure times
                // routes
                // schedules - scheduled arrival/departure times (stop_time)
                // shapes - stops and maps for branches, including route variations
                // stops
                // trips
                // vehicles - vehicle positions

            // FILTER
            // /routes retrieves a list, in the data[] object, of all routes.
            
            // ADD subways:
                // /routes?filter[type]=0,1 retrieves only the routes with a route type of 0 or 1 (subway)
                // /routes/Orange retrieves only the route with `route_id="Orange"`
            
	// filtered route 1:
    const url = 'https://api-v3.mbta.com/vehicles?filter[route]='+routeMain+'&include=trip';
	// not filtered:
    // const url = 'https://api-v3.mbta.com/vehicles';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}

function startFollowingBus() {
    document.getElementById('startFollowingBus').innerHTML = `Have a nice ride around Boston Route ${routeMain} :)`;
    
    // addNavigation makes bus bearings crazy
    // addNavigation();

    run();
}

function addNavigation(){
    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());
}

// run();

// cool stuff:
// infoDataSet[0].busLocations[0].attributes.latitude 
// lastBusInfo.busLocations[0].attributes.label (e.g. = "1912")
// lastBusLocations[0].attributes.occupancy_status
// lastBusLocations[0].attributes.direction_id

// green: "MANY_SEATS_AVAILABLE"
// red: "FEW_SEATS_AVAILABLE"
// blue: undefined


// added:
// bus icon
// bearing of the vehicle rotates its icon
// button shadow
// button hover color
// bus color accordingly to occupancy

// to do:
// bus icon change "left" or "right" according to bearing/direction


// about bearing: https://docs.mapbox.com/help/glossary/bearing/
// A bearing is the direction you?re facing, measured clockwise as an angle from true north on a compass.
// This can also be called a heading. In this system, north is 0°, east is 90°, south is 180°, and west is 270°.
// When you are viewing a Mapbox map, the bearing rotates the map around its center the specified number of degrees.