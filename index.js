const  express = require('express');
const bodyParser = require('body-parser');

const db = require("./dbConnection.js");
const configs = require("./config.js");

const app = express();
const PORT = configs.port;
  
// connection.end();

app.use(bodyParser.json());

app.get('/hello', (req, res) => {
    res.json({"message":"Hello blue deployment world"})
});

// app.get('/currencies/:id', controller.findOne);
app.get('/currencies' , (req, res) => {
    db.query('SELECT * FROM currencies', (err, rows, fields) => {
    if (!err)
    res.status(200).json({'data':rows});
    else
    res.status(505).send({'message':'No records'});
    })
});

app.get('/currencies/:id' , (req, res) => {
    db.query('SELECT * FROM currencies WHERE c_id = ?',[req.params.id], (err, rows, fields) => {
        if (!err)
        res.status(200).json({'id': rows[0].c_id, 'name':rows[0].name, 'min_size':rows[0].min_size});
        else
        res.status(505).send({'message':'No records'});
    })
});

app.delete('/currencies/:id' , (req, res) => {
    db.query('DELETE FROM currencies WHERE c_id = ?',[req.params.id], (err, rows, fields) => {
        if (!err)
        res.status(200).json({'message':'Deletion successful'});
        else
        res.status(505).send({'message':'Deletion unsuccessful'});
    })
});

app.post('/currencies', function (req, res) {
    console.log(req.body)
    let name = req.body.name;
    let id = req.body.c_id;
    let size = req.body.min_size;
    
    // validation
    if (!name || !id || !size)
        return res.status(400).send({ error:true, message: 'Empty fields' });

    // insert to db
    db.query("INSERT INTO currencies (c_id, name, min_size) VALUES (?, ?, ?)", [id, name, size], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false,  message: 'Currency successfully added' });
    });
});

app.put('/currencies', function (req, res) {
    let name = req.body.name;
    let id = req.body.c_id;
    let size = req.body.min_size;
    
    // validation
    if (!name || !id || !size){
        return res.status(400).send({ error: book, message: 'provide is, name and min size' });
    }
  
    db.query("UPDATE currencies SET name = ?, min_size = ? WHERE c_id = ?", [name, size, id], function (error, results, fields) {
        // if (error) throw error;

        // check data updated or not
        let message = "";
        if (results.changedRows === 0)
            message = "Currency not found or data are same";
        else
            message = "Currency successfully updateds";

        return res.send({ error: false, message: message });
    });
});

module.exports = app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`))