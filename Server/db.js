
const  MongoClient = require('mongodb').MongoClient;
let dbStatus ={
  db:null
}
 
connect = (url, done)=>{
  if (dbStatus.db) return done()

  MongoClient.connect(url,{ useUnifiedTopology: true, useNewUrlParser: true}, (err, mongodb)=> {
    const db = mongodb.db('Restaurantslocator')

  if(err){
    return done(err)
  } else {
  dbStatus.db = db;
  done();
}
});
}

getDbStatus = ()=> {
  return dbStatus.db;
}

closeDbConnection = (done)=>{
if (dbStatus.db) {
    dbStatus.db.close((err, result) => {
      dbStatus.db = null
      dbStatus.mode = null
      done(err)
    })
  }
}

module.exports = {connect, getDbStatus, closeDbConnection}








/*var http = require('http');

var mongoose = require ("mongoose"); 


mongoose.connect('mongodb://localhost/Restaurants', function (err, res) {
      if (err) {
      console.log (err);
      } else {
      console.log ('Succeeded connected ');
      }
    });


 var locationSchema = new mongoose.Schema({
      name:String,
      address:String,
      location: {
    type: {
      type: "String",    
      default: 'Point'
    },
    coordinates: [Number]
}

    });

var Location = mongoose.model('Location', locationSchema);

 Location.find({

 	location:{$near: {
            	$geometry: {
            		type: "Point" ,
            		coordinates: [ 77.5576845 , 12.8686269 ]
            	},
            	$maxDistance:100,
            	$minDistance:0
            }
        }

 }).exec(function(err,data){
 	console.log(err)
 	console.log(data);
 });
   
var server = http.createServer();
try {
    
    server.listen(3000, function(){
      console.log('application running at 3000');
      
    });
} catch (e) {
    system.log(e);
}*/
