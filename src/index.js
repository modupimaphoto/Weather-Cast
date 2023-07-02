
const express = require('express');
const path = require('path');
const app = express()
const hbs = require('hbs');


const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

app.set('view engine', 'hbs');

const viewPath = path.join(__dirname, '../templates/views');
app.set('views', viewPath);

app.get('', (req,res) => {
	res.render('index', {
		title: 'WeatherCast'
	})
})


app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		errorMessage: 'Page not found.'
	});
});
app.listen(3000, () => {
	console.log('Server up running at port 3000');
});
