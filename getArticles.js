const request = require('request');
const fs = require('fs');

const API_KEY = '352679b316324a1c87e69efa474535d0';

var months = [
    [2015, 1],
    [2015, 2],
    [2015, 3],
    [2015, 4],
    [2015, 5],
    [2015, 6],
    [2015, 7],
    [2015, 8],
    [2015, 9],
    [2015, 10],
    [2015, 11],
    [2015, 12],
    [2016, 1],
    [2016, 2],
    [2016, 3],
    [2016, 4],
    [2016, 5],
    [2016, 6],
    [2016, 7],
    [2016, 8],
    [2016, 9],
    [2016, 11],
    [2016, 12],
    [2017, 1],
    [2017, 2],
    [2017, 3],
    [2017, 4],
    [2017, 5],
    [2017, 6],
    [2017, 7],
    [2017, 8],
    [2017, 9],
    [2017, 10],
    [2017, 11],
    [2017, 12],
    [2018, 1],
    [2018, 2],
    [2018, 3],
]

var currentMonth = 0;
var data = [];

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        info = info.response;
        let month = {};
        let newDocs = [];
        // Let's throw out most of the response
        for (let i = 0; i < info.docs.length; i++) {
            let doc = info.docs[i];
            let newDoc = {
                headline: doc.headline.main,
            }
            if (doc.byline){
                newDoc.byline = doc.byline.original
            }
            if (doc.abstract){
                newDoc.abstract = doc.abstract
            }
            for (let i = 0; i < doc.keywords.length; i++){
                let kw = doc.keywords[i];
                if (kw.name === 'glocations'){
                    newDoc.location = kw.value;
                    break;
                }
            }
            newDocs.push(newDoc)
        };
        month.date = months[currentMonth];
        month.count = newDocs.length;
        month.docs = newDocs;
        data.push(month)
        fs.writeFileSync('./data/articles.json', JSON.stringify(data, null, ''))
        if (currentMonth < months.length - 1) {
            currentMonth++;
            doRequest();
        }
    }
}

var doRequest = function () {
    console.log('Pulling articles for ' + months[currentMonth][0] + '/' + months[currentMonth][1] + '...')
    let options = {
        //url: year/month
        url: 'https://api.nytimes.com/svc/archive/v1/' + months[currentMonth][0] + '/' + months[currentMonth][1] + '.json',
        qs: { "api-key": API_KEY },
    };

    request(options, callback)
}

doRequest();