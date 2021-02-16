const app = require('./app.js');
const db = require('./db.js');
const port = 3001;
const dbUrl = 'mongodb://localhost:27017/Restaurantslocator';

db.connect(dbUrl,(dbErr) =>{
	if(dbErr) {
		console.log('Unable to connect to Mongo.')
	} else {
	app().listen(port,err =>{
	if(err){
		console.log(`not able to start the server because of ${err}`)
	} else {
		console.log(`Server started and listening to the Port ${port}`)
	}
});
	}
})

