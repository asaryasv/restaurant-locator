const db = require('./Server/db.js');


const getList = (req,res) => {
	/*const collection = db.getDbStatus().collection('restaurants')
	collection.find ({
  		location: {
     		$near: {
       		$geometry: {
          		type: "Point" ,
          		coordinates: [ parseFloat(req.params.lng),parseFloat(req.params.lat )]
       			},
       $maxDistance: 100,
       $minDistance: 0
     }
   }
}).toArray((err, docs) => {
  		if(err){
  			res.send(500,err)
  		}
    	res.send(200,docs)
  });*/
	const collection = db.getDbStatus().collection('restaurants')
  	collection.find().toArray((err, docs) => {
  		if(err){
  			res.send(500,err)
  		}
    	res.send(200,docs)
  });
 }


module.exports = {getList}