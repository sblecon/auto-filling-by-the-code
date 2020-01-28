'use strict';

const fs = require('fs');
const path = require('path');
const core = require('@actions/core');

// get the versions file and parse it to JSON
let versions = JSON.parse(fs.readFileSync(path.join('/github/workspace/', core.getInput('version_file_path'))));
// get the readme file
let readme = fs.readFileSync(path.join('/github/workspace/', core.getInput('readme_path'))).toString('utf8');
// parse the file to lines
let lines = readme.split(/\r\n|\n|\r/);

// generate a markdown table from the versions file
function generateTheTable() {
    // return an array containing the name of every component
    function getEveryComponent(){
        let components = []
        versions.forEach((version) => {
            // for each key in this version
            for (let key in version){
                // if this key is not in the components array, add it 
                if (!components.includes(key)){
                    components.push(key)
                }
            }
        })
        return (components);
    }
    // add the table header and a separator to 'result'
    function setHeader(components, dest){
        // init the header
        let header = '|';
        // init the separator
        let separator = '|';
        // for each component
        components.forEach((component) => {
            // add the component name to the header
            header += component + ' version|';
            // add a separator
            separator += '---|';
        })
        // push the header
        dest.push(header);
        // push the separator
        dest.push(separator);
    }
    // create a result array
    let result = [];
    // find every component
    const components = getEveryComponent();
    // add an empty line first
    result.push('');
    // add the header and the separation between the header and the data
    setHeader(components, result);
    // for each version, add the compatibility between each component
    versions.forEach((version) => {
        // init the line
        let line = '|';
        // for each known component
        components.forEach((component) => {
            // if the component is not present for this version
            if (!version[component]){
                // add a dash
                line += '-|';
            }
            else{
                // otherwise, add the component version
                line += version[component] + '|';
            }
        })
        // push the line to the result array
        result.push(line);
    })
    // return the array
    return result;
}

// find the current version table in the readme file, and replace it by the new one
function replaceCurrentTable(){
    // line used to identify the position of the table
    const tableTitle = core.getInput('section_title');
    // search the line where the compatibility table title is present
    const tableTitleIndex = lines.findIndex((l) => l.indexOf(tableTitle) >= 0);

    // if the line is not found, add at the bottom of the file
    if (tableTitleIndex < 0){
        // add the title
        readme += '\n' + core.getInput('section_title') + '\n';
        // add the table (joined by line breaks)
        readme += generateTheTable().join('\n');
        return;
    }

    // variable checking if a non-empty line has already been found
    let nonEmptyLineFound = false;
    // init the line search at the line after the title
    let i = tableTitleIndex + 1;
    // find the lines on which the table is located
    // this will search until an empty line is found (a line with content must be found first)
    for (; i < lines.length && (!nonEmptyLineFound || lines[i].length > 0); i++){
        // if a line with content if found
        if (!nonEmptyLineFound && lines[i].length > 0){
            nonEmptyLineFound = true
        }
    }
    // remove the old table
    lines.splice(tableTitleIndex + 1, i - tableTitleIndex - 1);

    // insert the new one
    lines.splice(tableTitleIndex + 1, 0, generateTheTable().join('\n'));

    // convert the array back to a string
    readme = lines.join('\n');
}

// replace the current table by a new one
replaceCurrentTable();

// display the result
console.log("result:", readme)
// Write over to the readme file
fs.writeFileSync(path.join('/github/workspace/', core.getInput('readme_path')), readme)