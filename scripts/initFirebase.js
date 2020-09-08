const execSync = require('child_process').execSync;
const fs = require('fs');
const { extractJsonFromString, log } = require('./utils');


const writeDotEnv = (data, fileExists, args) => {
    let contentStr = "";
    let writeOptions = fileExists ? {} : { flag: 'wx' };

    for (let prop in data) {
        contentStr += `FIREBASE_${prop.toUpperCase()}=${data[prop]}\n`;
    }

    log({ info: true }, "Writing .env file...");
    log(args, "Generated Content - \n", contentStr);

    fs.writeFileSync('.env', contentStr, writeOptions);
    log({ success: true }, "Successfully created .env file.");
}

const isLoginSuccess = (output) => 
    output.toString().trim().indexOf('Success! Logged in as') > -1 ||
    output.toString().trim().indexOf('Already logged in as') > -1

const initFirebase = (args) => {
    log(args, "Checking if .env file exists...");

    const hasEnvFile = fs.existsSync('.env');
    if (hasEnvFile && !args.force) {
        log({ error: true }, "The file .env already exists! Run with --force if you wanna override it.");
        process.exit(0);
    }

    log(args, "Checking if Firebase tools is installed...");

    let hasFirebaseTools = false;

    // Since child process exits with non-zero exit code.
    try {
        execSync('npm ls firebase-tools --json').toString();
    } catch (e) {
        hasFirebaseTools = !!JSON.parse(e.stdout.toString()).version;
        log(args, 'hasFirebaseTools - ', hasFirebaseTools);
    }

    if (!hasFirebaseTools) {
        log({ info: true }, "Firebase-tools not found. Installing...")
        execSync('npm i -g firebase-tools', {stdio: 'inherit'});
    }

    log({ info: true }, "Logging into your Firebase account...");
    let loginOutput = "";

    // Since child process exits with non-zero exit code.
    try {
        loginOutput = execSync('firebase login', {stdio: ['inherit', 'pipe', 'pipe']});
    } catch (e) {
        loginOutput = e.stdout.toString();
        log({ debug: !!args.debug }, loginOutput);
    }
    
    if (isLoginSuccess(loginOutput)) {
        log({ success: true }, loginOutput);
        
        const appConfigString = execSync('firebase apps:sdkconfig --json').toString();
        const appConfig = extractJsonFromString(appConfigString);

        log({ debug: !!args.debug }, "appConfig -", appConfig);

        if (appConfig.status !== "success") {
            log({ error: true }, "Unable to retrieve app config!");
            process.exit(1);
        }

        const sdkConfig = appConfig.result.sdkConfig

        if (sdkConfig) {

            log({ info: true }, "Writing .env file...");
            writeDotEnv(sdkConfig, hasEnvFile, args);
            
            
        } else {
            log({ error: true }, "Response missing sdkConfig property!");
            process.exit(1);
        }

    } else {
        log({ error: true }, "Login Failed!");
        process.exit(1);
    }
}


module.exports = initFirebase;