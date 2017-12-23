const express = require('express')
const xlsxtojson = require('xlsx-to-json-lc')

const app = express()

app.get('/sales', (req, res) => {
    return new Promise(function(resolveJson, rejectJson) {
        xlsxtojson(
            {
                input: 'db.xlsx',
                output: null,
                lowerCaseHeaders:true
            },
            (err,result) => {
                if(err) {
                    rejectJson(err)
                } 
                resolveJson(result)
            }
        )
    })
    .then((result) => {
        function toInt(str){
            return parseInt(str.replace(/-/g, ''))
        }
        const dateFrom = toInt(req.query.from)
        const dateTo = toInt(req.query.to)
        if(dateFrom > dateTo){
            res.status(422).json({error: 'Промежуток дат указан неправильно.'})
        }
        else{
            const goods = []
            let total_revenue = 0
            result.map((good) => {
                if(good['good'] !== ''){
                    let tmpSumm = 0
                    for(key in good){
                        if( (toInt(key) >= dateFrom) && (toInt(key) <= dateTo) ){
                            tmpSumm += parseFloat(good[key])
                        }
                    }
                    total_revenue += tmpSumm
                    goods.push({
                        title: good['good'],
                        revenue: tmpSumm.toFixed(2)
                    })
                }
            })
            res.status(200).json({
                from: req.query.from,
                to: req.query.to,
                goods,
                total_revenue: total_revenue.toFixed(2)
            })
        }
    })
    .catch((err) => console.log(err))
})

app.listen(3000, console.log('started on 3000'))