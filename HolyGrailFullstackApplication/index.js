var { DateTime } = require('luxon');
var port = 3005;
var express = require("express");
var app = express();

//TODO: create a redis client
var redis   = require("redis"); 
var client  = redis.createClient(); 

// serve static files from public directory
app.use(express.static("public"));

// TODO: initialize values for: header, left, right, article and footer using the redis client
client.mset('header',0,'left',0,'article',0,'right',0,'footer',0);
client.mget(['header','left','article','right','footer'], 
  function(err, value) {
    console.log(value);
});   


// Get values for holy grail layout
function data() {
  // TODO: uses Promise to get the values for header, left, right, article and footer from Redis
  return new Promise((resolve, reject) => {
    client.mget(['header','left','article','right','footer'], 
        function(err, value) {
            const data = {
                'header':  Number(value[0]),
                'left':    Number(value[1]),
                'article': Number(value[2]),
                'right':   Number(value[3]),
                'footer':  Number(value[4])
            };
            err ? reject(null) : resolve(data);
        }
    );
});    
}

// plus
app.get("/update/:key/:value/:instanceID", function (req, res) {
  // initial example/test (without db)
  // res.send('update route!');
  
  // now using db we need Promises to help us "wait" for data yo be fetched from database
  const key = req.params.key;
  let value = Number(req.params.value);
  var instance = req.params.instanceID;
  if (!instance) {
    instance = 'anonymous'
  }

  //TODO: use the redis client to update the value associated with the given key
  client.get(key, function(err, reply) {

    // update the section value
    value = Number(reply) + value;
    // and save it to our redis database
    client.set(key, value);

    // and the return "data" to client using the formatted structure that we create at data()
    data()            
        .then(data => {
            console.log(data);
            res.send(data);                
        });
  });  

});

// get key data
app.get("/data/:instanceID", function (req, res) {
  var instance = req.params.instanceID;
  if (!instance) {
    instance = 'anonymous'
  }

  data().then((data) => {
    console.log(`Instance ${instance} at ${DateTime.now().toString()}`);
    console.log(`Current server values:`);
    console.log(data);
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});

process.on("exit", function () {
  client.quit();
});
