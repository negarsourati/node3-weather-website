const hbs = require('hbs');
const path = require('path');
const express = require('express');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(__filename)
// console.log(path.join())

const app = express();
//define paths for express configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
 

//setup handel bars engine
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => { 
    res.render('index', {
        title: 'Weather',
        name: 'Negar'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About me',
        name: 'Negar'
    })
})
app.get('/help', (req, res) => {
    res.render('help',{
        message: 'Please enter your name',
        title: 'Help page',
        name: 'Negar'
    })
})

// app.get('', (req, res) => {
//     res.send('<h1>Welcome!</h1>');
// })



// const aboutPath = path.join(__dirname, '../public/about.html')
// app.use(express.static(aboutPath))

// app.get('/about', (req, res) => {
//     res.send('<title>TITLE</title>');
// })
// const helpPath = path.join(__dirname, '../public/help.html')
// app.use(express.static(helpPath))

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'negar',
//         age: 19
//     }, {
//         name: 'Zhivar',
//         age: 23
//     }])
// })

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please enter address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    

})
app.get('/help/*' , (req, res) => {
    res.render('404', {
        title:'404', 
        name: 'Negar', 
        errorMessage: 'article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title:'404', 
        name: 'Negar', 
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})