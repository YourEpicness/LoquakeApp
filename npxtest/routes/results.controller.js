const axios = require('axios');


function getResults(req, res) {
    console.log('Getting results...');
        axios.get('http://localhost:3005/earthquakes')
        .then((info) => {
            const {data} = info;
            const results = []
            data.forEach((result) => {
                const {properties: {mag, time, place}, geometry: {coordinates}} = result;
                const [lat, lng] = coordinates
                results.push({
                    mag, time, place, lat, lng
                })
            })
            res.json(results);
        })
        .catch((err) => {
            console.log("Something went wrong...\n", err);
        })
}

module.exports = {
    getResults
}