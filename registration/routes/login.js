var express = require('express');

var router = express.Router();

const MongoClient = require('mongodb').MongoClient;


router.post('/', function (req, res) {
    console.log(req.body);
    var username = req.body.username;
    var pwd = req.body.password;
   

    const uri = 'mongodb+srv://ahasan:Registrazione@cluster0.0pydj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        const collection = client.db("progetto").collection("users");
        collection.find({ 'username': `${username}` }).toArray((err, result) => {
            
            if (err) console.log(err.message); //Se c'è qualche errore lo stampo
            else res.send(result);
            console.log(result);
            client.close(); //Quando ho terminato la find chiudo la sessione con il db
        }); //Eseguo la query e passo una funzione di callback

    });
});


module.exports = router;