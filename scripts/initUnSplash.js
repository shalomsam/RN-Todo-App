const { log } = require('./utils');
const firebase = require('firebase');
const config = require('./cache.json');
const execSync = require('child_process').execSync;
const fs = require('fs');

const initUnSplash = (args) => {
    log({ info: true }, "Initializing UnSplash Keys");
    const adminData = JSON.parse(execSync('firebase database:get /admin').toString());
    const key = Object.keys(adminData);
    const unsplashKeys = adminData[key]['unsplash'];
    let content = "";

    for (let apiKey in unsplashKeys) {
        content += `\nUNSPLASH_${apiKey.toUpperCase()}=${unsplashKeys[apiKey]}`
    }

    log({ debug: !!args.debug }, `content - `, content);
    fs.appendFileSync('.env', content);
    log({ success : true }, "Successfully written unsplash keys to .env!");
}

module.exports = initUnSplash;