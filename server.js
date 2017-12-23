const express = require('express')
const xlsxtojson = require('xlsx-to-json-lc')

const app = express()

app.get('/sales', (req, res) => {
    xlsxtojson(
        {
            input: 'db.xlsx',
            output: null,
            lowerCaseHeaders:true
        },
        (err,result) => {
            if(err) {
                console.log(err)
            } 
            res.json(result[0])
        }
    );
    console.log(req.query.from)
    console.log(req.query.to)
})


app.listen(3000, console.log('started on 3000'))