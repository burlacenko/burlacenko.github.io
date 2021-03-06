// url =
// http://api.tiles.mapbox.com/v4/geocode/mapbox.places-v1/-71.10221931,42.364646819.json?access_token=pk.xxxxxxxxxxxxxxxxxxxxxxxx

// result in carmen geojson format
// https://github.com/mapbox/carmen/blob/master/carmen-geojson.md

var busAddressForTesting = {
  type: "FeatureCollection",
  query: [-71.10221931, 42.364646819],
  features: [
    {
      id: "address.58207546381737",
      type: "Feature",
      place_type: ["address"],
      relevance: 1,
      properties: { accuracy: "point" },
      text: "State Rte 2 Alt",
      place_name:
        "547 State Rte 2 Alt, Cambridge, Massachusetts 02139, United States",
      center: [-71.10228380113196, 42.3645667345887],
      geometry: {
        type: "Point",
        coordinates: [-71.10228380113196, 42.3645667345887],
      },
      address: "547",
      context: [
        { id: "city.2138", text: "Cambridge" },
        { id: "postcode.10416928729481780", text: "02139" },
        { id: "province.6165103707799830", text: "Massachusetts" },
        {
          id: "country.12862386938302570",
          short_code: "us",
          text: "United States",
        },
      ],
    },
    {
      id: "city.2138",
      type: "Feature",
      place_type: ["place"],
      relevance: 1,
      properties: {},
      text: "Cambridge",
      place_name: "Cambridge, 02139, Massachusetts, United States",
      bbox: [
        -71.1604880093029, 42.3523969900086, -71.0640949900043, 42.404172009993,
      ],
      center: [-71.1056, 42.3751],
      geometry: { type: "Point", coordinates: [-71.1056, 42.3751] },
      context: [
        { id: "postcode.10416928729481780", text: "02139" },
        { id: "province.6165103707799830", text: "Massachusetts" },
        {
          id: "country.12862386938302570",
          short_code: "us",
          text: "United States",
        },
      ],
    },
    {
      id: "postcode.10416928729481780",
      type: "Feature",
      place_type: ["postcode"],
      relevance: 1,
      properties: {},
      text: "02139",
      place_name: "Massachusetts 02139, United States",
      bbox: [-71.117193, 42.352397, -71.086975, 42.376332],
      center: [-71.102921, 42.364547],
      geometry: { type: "Point", coordinates: [-71.102921, 42.364547] },
      context: [
        { id: "province.6165103707799830", text: "Massachusetts" },
        {
          id: "country.12862386938302570",
          short_code: "us",
          text: "United States",
        },
      ],
    },
    {
      id: "province.6165103707799830",
      type: "Feature",
      place_type: ["region"],
      relevance: 1,
      properties: {},
      text: "Massachusetts",
      place_name: "Massachusetts, United States",
      bbox: [-73.508142, 41.0873414115029, -69.759619253508, 42.88679],
      center: [-71.457543, 42.038046],
      geometry: { type: "Point", coordinates: [-71.457543, 42.038046] },
      context: [
        {
          id: "country.12862386938302570",
          short_code: "us",
          text: "United States",
        },
      ],
    },
    {
      id: "country.12862386938302570",
      type: "Feature",
      place_type: ["country"],
      relevance: 1,
      properties: { short_code: "us" },
      text: "United States",
      place_name: "United States",
      bbox: [-179.9, 18.765563302, -66.88544403, 71.540723637],
      center: [-97.922211, 39.381266],
      geometry: { type: "Point", coordinates: [-97.922211, 39.381266] },
    },
  ],
  attribution:
    "<a href='https://www.mapbox.com/about/maps/' target='_blank'>&copy; Mapbox</a>",
};
