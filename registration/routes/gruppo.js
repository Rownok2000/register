var express = require('express');

var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://ahasan:Registrazione@cluster0.0pydj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

/* POST */
router.post('/', function(req, res) {
    var name = req.body.name;
    var desc = req.body.desc;
    var partecipanti = req.body.partecipanti;
    console.log(req.body)
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        var len;
        const collection = client.db("progetto").collection("groups");
        collection.find({ 'name': `${name}` }).toArray((err, result) => {
             if (err) 
            {
                console.log(err.message); //Se c'è qualche errore lo stampo
            }
            else 
            {
                console.log(result);
                if(result.length == 1)
                {
                res.send({status: "existing_group"});
               
                }
                else if (result.length != 1){
                   var myobj = { name: `${name}`, desc: `${desc}`, partecipanti: `${partecipanti}` };
                     collection.insertOne(myobj, function(err, res) {
                  if (err) throw err;
                 console.log(`gruppo ${name}registrato correttamente!`);
            });
            setTimeout(function () {
                res.send({ status: "done" });
                client.close();
            }, 500);
        }

            }
            
        }); 
     });
});

router.put('/joingroup/:group/:username', function(req, res) {
    var group = req.body.group;
    var username = req.body.username;
     const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        if (err) {
            res.send(err);
        }else{
        const collection = client.db("progetto").collection("groups");
        collection.updateOne({ 'name': `${group}`,  $push: { 'usersname': `${username}` } })
        res.send("ok");
        }
    });
});

router.get('/', function (req, res, next) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        const collection = client.db("progetto").collection("groups");
        collection.find({}).toArray((err, result) => {
            if (err) console.log(err.message);
            else { res.send(result); }
            client.close();
        });
    });
});


module.exports = router;