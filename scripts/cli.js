#!/usr/bin/env node

'use strict';

const program = require('commander');
const initFirebase = require('./initFirebase');
const initUnSplash = require('./initUnSplash');

program
    .command('init')
    .description('Initialize the project and setup .env')
    .option('-f, --force', 'Force (re)creation of the .env file.')
    .option('-v, --verbose', 'Output additional log information.')
    .option('-d, --debug', 'Output additional debug information.')
    .action(async (args) => {
        initFirebase(args);
        initUnSplash(args);
    });


program.parse(process.argv);