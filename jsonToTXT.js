const fs = require('fs')
const data = require('./data/articles.json')

var writeTXT = function (data) {
    let headlines = '';
    let bylines = '';
    let locations = '';
    let abstracts = '';

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].docs.length; j++) {
            headlines += data[i].docs[j].headline + ' '            
            if (data[i].docs[j].byline){
                bylines += data[i].docs[j].byline + ' '
            }
            if (data[i].docs[j].location){
                locations += data[i].docs[j].location + ' '
            }
            if (data[i].docs[j].abstract){
                abstracts += data[i].docs[j].abstract + ' '
            }
        }
    }
    console.log('Headlines: ' + headlines.length)
    console.log('Bylines: ' + bylines.length)
    console.log('Locations: ' + locations.length)
    console.log('Abstracts: ' + abstracts.length)
    fs.writeFileSync('./data/nyt-headlines.txt', headlines)
    fs.writeFileSync('./data/nyt-abstracts.txt', abstracts)
    fs.writeFileSync('./data/nyt-locations.txt', locations)
    fs.writeFileSync('./data/nyt-bylines.txt', bylines)
}

writeTXT(data)