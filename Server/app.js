const express = require('express');
const bodyParser = require('body-parser');

const restaurants = require('./routes/restaurants.js');

module.exports = () =>{
	
	const app = express();
	app.set('secretKey','ApHoneBoKSERtCwe');
	app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
	app.use('/api', restaurants);
	
	return app
}