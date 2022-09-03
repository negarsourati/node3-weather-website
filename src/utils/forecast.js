const request = require('request');

const forecast = (latitude, longitude, callback) => {
    console.log(latitude, longitude);
    const url = `http://api.weatherapi.com/v1/forecast.json?key=978146f9d02e4aa7a6d120217223108&q=${latitude},${longitude}&days=1`
    request({ url, json:true }, (error, {body}) => {
        console.log(body)
        if(error) {
            callback('connection error', undefined)
        } else if (body.error) {
            callback('unable to find location', undefined)
        } else {
            callback(undefined, `${body.current.condition.text} ,its currently ${body.current.temp_c} degress out.`)
        }
    })
}
module.exports = forecast