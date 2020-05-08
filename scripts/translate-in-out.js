/**
 * This script is used to convert json resource file into property file and vice versa.
 * convertJsonFileToPropertiesFile() method is used to convert en_US.json file into en_US.properties file.
 * convertPropertiesFileToJsonFile() method is used to convert all property files from "translated-files" folder into respective lacale folder.
 */
const fs = require('fs');
const readline = require('readline');
const path = require('path');
const chokidar = require('chokidar');
const { promisify } = require('util');
const { difference } = require('lodash');
const {name} = require('../package.json')

const { TRANSLATION } = require('../src/i18n/en');

const outputDir = `../translation-files/outbound/`;
const readdir = promisify(fs.readdir);
const paths = {
    entryJS: path.resolve(__dirname, '../src/i18n/en.js'),
    outputProperty: path.resolve(__dirname, `${outputDir}/${name}_en-US.properties`),
    entryProperties: path.resolve(__dirname, '../translation-files/inbound/'),
    outputJS: path.resolve(__dirname, '../translation-files/inbound/')
};

/* eslint-disable no-console, no-sync, no-div-regex */

// Convert .js file content into .properties file.
const convertJsToPropertiesFile = () => {
    try {
        const entries = TRANSLATION;

        const propKeys = Object.keys(entries);
        // Create stream to write property details.
        const writeStream = fs.createWriteStream(paths.outputProperty, {
            autoClose: false
        });
        // Iterate over Object Key array to create lines with key and value.
        propKeys.forEach((key) => {
            // spaces to underscore in keys
            const newKey = key.replace(/ /g, '_');
            // escape backslashes to preserve those also in the value
            let newValue = entries[key];
            newValue = newValue.replace(/\\/g, '\\');
            newValue = newValue.replace(/:/g, '\\:');
            newValue = newValue.replace(/=/g, '\\=');
            writeStream.write(newKey.concat('=').concat(newValue).concat('\n'));
        });

        // Close write stream
        writeStream.end();
        console.log(`Wrote exported strings to ${paths.outputProperty}`);
    } catch (error) {
        console.error(`Error while creating property file.`, error);
    }
};

// Convert .properties resource file into .json file.
const convertPropertiesFileToJs = async() => {
    try {
        console.log(`inbound properties files folder: ${paths.entryProperties}\n`);

        const files = await readdir(paths.entryProperties);
        files.forEach(async(file) => {

            if (file.indexOf('properties') < 0) {
                console.log(`skip ${file}, not a property file.`);
                return;
            }
            // Create output filename (ex: en_US.json)
            const outputTag = file.substring(file.indexOf('_') + 1, file.indexOf('.'));
            const outputFileName = outputTag + '.js';

            console.log(`outputFileName: ${outputFileName}`);

            const fullPath = path.resolve(paths.outputJS, outputFileName);
            console.log(`\ntranslating ${file} to: ${fullPath}`);
            const resultJSONObj = await readFileContent(file);

            const enMessageKeys = Object.keys(TRANSLATION);
            const importKeys = Object.keys(resultJSONObj);
            const newKeys = difference(enMessageKeys, importKeys);
            if (newKeys && newKeys.length > 0) {
                console.log(`***** en.js keys not in imported file ${file} *****`);
                newKeys.forEach((key) => {
                    console.log(`${key} : ${TRANSLATION[`${key}`]}`);
                    const value = TRANSLATION[`${key}`];
                    resultJSONObj[`${key}`] = value;
                });
                console.log('***** end of list *****');
            }

            await writeJSFile(fullPath, outputTag, resultJSONObj);
        });
    } catch (error) {
        console.error(`Error while converting property file content.`, error);
    }
};

// Get property file content.
const readFileContent = (fileName) => {
    return new Promise((resolve, reject) => {
        try {
            const result = {};
            const inputStream = fs.createReadStream(path.resolve(paths.entryProperties, fileName));
            const reader = readline.createInterface({
                input: inputStream
            });
            reader.on('line', (line) => {
                // Skip comments lines (lines starting with #) and empty lines
                if (!line || line.charAt(0) === '#' || line.charAt(0) === '!' || line.trim().length === 0) {
                    return;
                }
                const divider = line.indexOf('=');
                let key = line.slice(0, divider);
                key = key.replace(/_/g, ' ');
                const value = line.slice(divider + 1);
                result[key] = value;
            });

            reader.on('close', () => {
                resolve(result);
            });
        } catch (error) {
            console.error(`Error while reading ${fileName} file.`, error);
            reject(error);
        }
    });
};

// Write JSON content into respective file
const writeJSFile = (fullPath, outputTag, data) => {
    return new Promise((resolve, reject) => {
        try {
            const writeStream = fs.createWriteStream(fullPath, {
                autoClose: false
            });
            // replacing double backslash ('\\') with single backslash ('\')
            let stringified = JSON.stringify(data, null, 4).replace(/\\\\/g, '\\');
            // replacing '\:' with ':' and saving changes into file.
            stringified = stringified.replace(/\\:/g, ':');
            // replacing '\=' with '='
            stringified = stringified.replace(/\\=/g, '=');

            writeStream.write('/* eslint-disable max-lines, comma-dangle, no-useless-escape */\nconst messages = ');
            writeStream.write(stringified);
            writeStream.write(';\n/* eslint-enable max-lines, comma-dangle, no-useless-escape */\nmodule.exports = {\n    TRANSLATION: messages\n};\n');

            writeStream.end();

            writeStream.on('error', (error) => {
                console.error(`Error while writing ${fullPath} file.`, error);
                reject(error);
            });
            resolve('success');
        } catch (error) {
            console.error(`Error while writing ${fullPath} file.`, error);
            reject(error);
        }
    });
};

// Watch en_US.json file for modifications.
const enableWatchMode = process.argv.slice(3)[0] === '--watch';
if (enableWatchMode) {
    // Regenerate property file.
    console.log('Watching en.js file...');
    chokidar
        .watch([
            paths.entryJS,
        ])
        .on('change', (event) => {
            console.log('changes occurred in en.js file.');
            convertJsToPropertiesFile();
        });
}

if (process.argv.slice(2)[0] === '--genPropertyFile') {
    convertJsToPropertiesFile();
}
else {
    convertPropertiesFileToJs();
}
