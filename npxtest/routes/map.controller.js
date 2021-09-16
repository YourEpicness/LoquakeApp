const coord = [
    {
        lat: 10,
        lng: -20
    }
]

const queryDetails = [
    {
        lat: coord[0].lat,
        lng: coord[0].lng,
        range: 100,
        magnitude: 3
    }
]

function postCoordinates(req, res) {
    const newcoord = {
        lat: req.body.position.lat,
        lng: req.body.position.lng
 
    }
    coord.push(newcoord);
    res.json(newcoord);
}

function getCoordinates(req, res) {
    res.json(coord)
}

function getCurrentCoordinates(req, res) {
    if(!coord) {
        // Error Handling Method 1
        // throw Error("No coordinates to display")

        return res.status(404).json({
            error: "No coordinates to display"
        })
    }
    const current = coord[coord.length - 1]
    res.json(current)
}

function postQueryDetails(req, res) {
    const lastCoord = coord[coord.length - 1]
    if(!req.body.range || !req.body.magnitude) {
        return res.status(400).json({
            error: "Missing field parameters"
        })
    }
    const newquery = {
        lat: lastCoord.lat,
        lng: lastCoord.lng,
        range: req.body.range,
        magnitude: req.body.magnitude
    }

    queryDetails.push(newquery)
    res.json(queryDetails)
}

function getQueryDetails(req, res) {
    res.json(queryDetails)
}

module.exports = {
    coord,
    queryDetails,
    getCoordinates,
    postCoordinates,
    getCurrentCoordinates,
    postQueryDetails,
    getQueryDetails
}
