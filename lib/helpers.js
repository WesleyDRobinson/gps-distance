const fs = require('fs')

// accepts a path to a file and parses that for json
const parseTxt = (file) => {
    return new Promise((resolve, reject) => {
        if ('string' === typeof file) {
            fs.readFile(file, 'utf8', (err, data) => {
                if (err) return reject(new Error(`could not open file`, err))

                const arr = data.split('\n')

                return resolve(arr.map(el => JSON.parse(el)))
            })
        }
    })
}

// accepts GPS lat, long coordinates
// returns distance from Intercom, Dublin office (St Stephen's Green)
const calculateDistance = (lat, long) => {
    const hqLat = 53.3381985,
        hqLong = -6.2592576,
        meanEarthRadius = 6371 // in km, ref: https://en.wikipedia.org/wiki/Great-circle_distance#Radius_for_spherical_Earth

    // convert degrees to radians
    const getRad = deg => deg * Math.PI / 180
    const customerRadLat = getRad(lat)
    const hqRadLat = getRad(hqLat)
    const theta = hqLong - long
    const radTheta = getRad(theta)

    // destructuring for legibility
    const {sin, cos, acos, round} = Math
    const dist = sin(customerRadLat) * sin(hqRadLat) + cos(customerRadLat) * cos(hqRadLat) * cos(radTheta);

    return round(meanEarthRadius * acos(dist))
}

module.exports = {
    calculateDistance,
    parseTxt
}
