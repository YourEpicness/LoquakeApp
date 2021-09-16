const axios = require('axios');

const { coord, queryDetails } = require('./map.controller')

const baseQuery = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2020-01-01&endtime=2021-01-02&orderby=time&";


function getEarthquakes(req, res) {
    
    function getCurrentLatLng() {
        const latlng = "latitude=" + current.lat + "&longitude=" + current.lng
        return latlng
    }

    function getRange() {
        return current.range
    }

    const minMagnitude = () => {
        return "minmagnitude=" + current.magnitude
    }

    function makeQuery() {
        const finalQuery = baseQuery + 'maxradiuskm=' + getRange() + "&" + getCurrentLatLng() + "&" + minMagnitude();
        return finalQuery;
    }


    const current = queryDetails[queryDetails.length - 1]
    
    console.log('Retrieving information...', makeQuery());
    axios.get(makeQuery())
    .then((data) => {
        console.log(data.data.features);
        const {features} = data.data;
        
        res.status(200).json(features);

        features.forEach(element => {
        const {place} = element.properties;
        console.log(`Location: ${place}`);
        });
    })
    .catch(err => next(err));
}


module.exports = {
    getEarthquakes
}