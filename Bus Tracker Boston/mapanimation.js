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

function setMarkerHTML(aBusRef, busAndAddress) {
    
    // let markerElement = aBusRef.marker.getElement();

    // markerElement
    //   .querySelectorAll('svg g[fill="' + marker._color + '"]')[0]
    //   .setAttribute("innerHTML", text);

    // marker._color = color;

    // markerElement._popup.setHTML('<h3>Bus ' + aBusRef.busName + '</h3> <p>Current stop sequence: ' + aBusRef.marker.attributes.current_stop_sequence + '</p> <p>Address: '+ busAndAddress.address +'</p>');
    aBusRef.marker._popup.setHTML('<h3>Bus ' + aBusRef.busName + '</h3> <p>Current stop sequence: ' + busAndAddress.busAttribute.current_stop_sequence + '</p> <p>Address: '+ busAndAddress.address +'</p>');
}

function setMarkerColor(marker, color) {
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

function createNewMarker(aBusName, lngLat) {
    if ((aBusName === '') || (typeof aBusName === 'undefined') || (lngLat === [])) {
        return;
    } else {
    let aMarker = new mapboxgl.Marker({color: 'blue', draggable: false, rotation: 0})
    .setLngLat(lngLat)
    .setPopup(new mapboxgl.Popup({ offset: 25, closeOnClick: true, closeButton: true, className: 'marker-popup' })
                          .setHTML('<h3>' + 'Bus ' + aBusName + '</h3> <p>' + 'Current stop sequence: ' + '</p>'))
    .addTo(map);     

    allMarkers.push({busName: aBusName, marker: aMarker});
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

function displayBusMarker(busAttribute) {
    //debugger;
    // locate maker in allMarker array
    let marker = getMarker(busAttribute.label);

    // update longitude, latitude
    let lngLat = [];
    lngLat.push(busAttribute.longitude);
    lngLat.push(busAttribute.latitude);

    if (typeof marker !== 'undefined') {
        marker.marker.setLngLat(lngLat);
        // update current stop sequence
        // markers[0].marker._popup._content.innerHTML
        // markers[0].marker._popup._content.innerText

        // this does NOT work:
        // markers[0].marker._popup.setText = 'bus xx';
        // markers[0].marker._popup.setHTML = 'bus xx';

        // this WORKS:
        // markers[0].marker._popup._content.innerHTML = "<button class=\"mapboxgl-popup-close-button\" type=\"button\" aria-label=\"Close popup\">×</button><h3>Bus 2000</h3> <p>Current stop sequence: </p>";
        //debugger;
        marker.marker._popup.setHTML('<h3>' + 'Bus ' + busAttribute.label + '</h3> <p>' + 'Current stop sequence: ' + busAttribute.current_stop_sequence + '</p>')

        // update address


        // adjust color according to seats available
        // green: "MANY_SEATS_AVAILABLE"
        // red: "FEW_SEATS_AVAILABLE"
        // blue: undefined
        if (busAttribute.occupancy_status === 'MANY_SEATS_AVAILABLE') {
            setMarkerColor(marker.marker, 'green');
        } else { if (busAttribute.occupancy_status === 'FEW_SEATS_AVAILABLE') {
                    setMarkerColor(marker.marker, 'red');
                } else {
                        setMarkerColor(marker.marker, 'blue');
                }
        };
    }
}

function getMarker(label) {
    //debugger;
    let busReference = allMarkers.find( aMarker => {
        return aMarker.busName === label
    });

    return busReference; 
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
        // look for the marker of this bus
        if(existMarker(aBusLocation.attributes.label)) {
            // update marker position
            displayBusMarker(aBusLocation.attributes);
        } else {
            // create marker
            createNewMarker(aBusLocation.attributes.label,
                            [aBusLocation.attributes.longitude, aBusLocation.attributes.latitude ]);
        }
    });
    
    // if (allMarkers.length === 0) {
    //     createNewMarker(lastBusLocations[0].attributes.label,
    //                     [lastBusLocations[0].attributes.longitude, lastBusLocations[0].attributes.latitude ]);
    // }

    // if (allMarkers.length > 0) {
    //     displayBusMarker(allMarkers[0].marker, lastBusLocations[0].attributes);
    // }
   
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
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}

function startFollowingBus() {
    document.getElementById('startFollowingBus').innerHTML = 'Have a nice ride aroung Boston :)';
    run();
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