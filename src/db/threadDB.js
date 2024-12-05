const { json } = require('express')
const fs = require('fs')

exports.init = function () {
    console.log('Loading DB...')
    try {
        if (!fs.existsSync(__dirname + '/threads.jdb')) {
            fs.writeFileSync(__dirname + '/threads.jdb', `[]`)
        }
        exports.rawDB = JSON.parse(fs.readFileSync(__dirname + '/threads.jdb'))
    } catch(err) {
        console.error(err)
    }
    console.log('Loaded DB successfully!')
}

exports.load = function() {
    exports.rawDB = JSON.parse(fs.readFileSync(__dirname + '/threads.jdb'))
}

exports.write = function() {
    fs.writeFileSync(__dirname + '/threads.jdb', JSON.stringify(exports.rawDB))
    exports.rawDB = JSON.parse(fs.readFileSync(__dirname + '/threads.jdb'))
}