const colors = require('colors');
const fs = require('fs');

const extractJsonFromString = (string) => {
    const matches = string.match(/^{.*?^}$/ms);
    return JSON.parse(matches[0]);
}

const log = (args, msg, data = "") => {
    if(args.debug) {
        console.log(colors.yellow(`[DEBUG]:  ${msg} `), data)
    }
    if(args.verbose) {
        console.log(colors.yellow(`[LOG]: ${msg} `), data);
    }
    if(args.error) {
        msg = msg || "An unknown error occured";
        console.log(colors.red(`[ERROR]: ${msg} `), data);
    }
    if(args.info) {
        console.log(colors.blue(`[INFO]: ${msg} `), data);
    }
    if(args.success) {
        console.log(colors.green(`${msg} `), data);
    }
}

module.exports = {
    extractJsonFromString,
    log
}