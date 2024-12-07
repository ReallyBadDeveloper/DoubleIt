/*

Quick rundown of the database system:
    + The database uses a .jdb extension (really just JSON, configure .jdb to JSON in your editor if you want to manually edit the database from time to time).
    + The database has two sections: "users" and "database".

I'll add more to this once people actually care, but this is the database docs for now 👍

*/

const fs = require('fs')

exports.init = function () {
    console.log('Loading DB...')
    try {
        if (!fs.existsSync(__dirname + '/database.jdb')) {
            fs.writeFileSync(__dirname + '/database.jdb', `{"threads": [],"users": []}`)
        }
        exports.rawDB = JSON.parse(fs.readFileSync(__dirname + '/database.jdb'))
    } catch(err) {
        console.error(err)
    }
    console.log('Loaded DB successfully!')
}

exports.load = () => {
    console.log('Saving...')
    exports.rawDB = JSON.parse(fs.readFileSync(__dirname + '/database.jdb'))
    console.log('Saved!')
}

exports.write = () => {
    console.log('Writing...')
    fs.writeFileSync(__dirname + '/database.jdb', JSON.stringify(exports.rawDB))
    console.log('Written!')
    console.log('Saving...')
    exports.rawDB = JSON.parse(fs.readFileSync(__dirname + '/database.jdb'))
    console.log('Saved!')
}