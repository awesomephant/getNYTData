const fs = require('fs')
const data = require('./articles.json')

var writeTXT = function (data) {
    let s = '';
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].docs.length; j++) {
            s += data[i].docs[j].headline + ' '
        }
    }
    console.log(s.length)
//    s = s.replace(/[^A-Z][^a-z][^0-9][^!-)][^,@# ]/g, '')
    console.log('new: ' + s.length)
    fs.writeFileSync('nyt.txt', s)
}

writeTXT(data)