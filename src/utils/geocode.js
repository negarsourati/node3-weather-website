const request = require('request')

const geocode = (address, callback) => {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${address}&appid=35ee894801be2f460ccc0b22b1f0d32a`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (!body[0]) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            const {
                lat:latitude,
                lon:longitude,
                name:location
            } = body[0] 
            callback(undefined, {
                latitude:latitude,
                longitude:longitude,
                location:location
            })
        }
    })
}

module.exports = geocode