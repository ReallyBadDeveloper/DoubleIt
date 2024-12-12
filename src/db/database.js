/*

Quick rundown of the database system:
    + The database uses a .jdb extension (really just JSON, configure .jdb to JSON in your editor if you want to manually edit the database from time to time).
    + The database has two sections: "users" and "threads".
    + Objects in "threads" have this format:
    {
        "itemname": string, // The name of the item. Gets an "s" added to the end if the amount is greater than 1.
        "image": string, // The path to the thumbnail file.
        "count": integer, // The current amount of the thread. Increases by choosing to double a thread.
        "likes": integer, // The current amount of likes the thread has. Increases by clicking the heart on a thread.
        "active": boolean // Whether or not the thread was claimed by someone.
    }

I'll add more to this once people actually care, but this is the database docs for now 👍

*/

const fs = require('fs')

/**
 * Loads the database to `rawDB` and creates a new database if an existing one cannot be found.
 * @param {boolean} verbose
 * Whether or not to log events. Disable if there are many active users interacting with the database.
 */
function logMessage(message) {
    if (exports.verboseLogging) {
        console.log(`[Database @ ${new Date().toLocaleTimeString()}] ${message}`)
    }
}
exports.init = function (verbose=false) {
    exports.verboseLogging = verbose
    logMessage('Loading DB...')
    try {
        if (!fs.existsSync(__dirname + '/database.jdb')) {
            fs.writeFileSync(__dirname + '/database.jdb', `{"threads": [],"users": []}`)
        }
        exports.rawDB = JSON.parse(fs.readFileSync(__dirname + '/database.jdb'))
    } catch(err) {
        console.error(err)
    }
    logMessage('Loaded DB successfully!')
}

exports.load = () => {
    logMessage('Loading...')
    exports.rawDB = JSON.parse(fs.readFileSync(__dirname + '/database.jdb'))
    logMessage('Loaded!')
}

exports.write = () => {
    logMessage('Writing...')
    fs.writeFileSync(__dirname + '/database.jdb', JSON.stringify(exports.rawDB))
    logMessage('Written!')
    logMessage('Loading...')
    exports.rawDB = JSON.parse(fs.readFileSync(__dirname + '/database.jdb'))
    logMessage('Loaded!')
}