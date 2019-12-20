'use strict';

const fs = require('fs');

let rawDataVersion = fs.readFileSync('../compatibility-versions.json');
let versions = JSON.parse(rawDataVersion);
let readme = fs.readFileSync('../README.md').toString('utf8');
console.log(versions);
let lines = readme.split(/\r\n|\n|\r/);
let blockToReplace = false;
let newReadme = '';

function generateTheTable() {
    var result = `
Project version|Component A version|Component B version|Component C version|
|---|---|---|---|`
    for(let i = 0;i < versions.length;i++) {
        result += '\n|' + versions[i].projectVersion + '|' + versions[i].componentAVersion + '|' + versions[i].componentBVersion + '|' + versions[i].componentCVersion + '|';
    }
    return result;
}

for (let i=0;i < lines.length;i++) {
    if (blockToReplace) {
        if (lines[i].indexOf('#') === 0 ) {
            blockToReplace = false;

            newReadme+= '\n' + generateTheTable() + '\n' + lines[i]
        }
    } else {
        if (lines[i].indexOf('# This is the table updated by the script') === 0) {
            blockToReplace = true;
        }
        newReadme+= '\n' + lines[i]

    }
}
if (blockToReplace) {
    newReadme += '\n' + generateTheTable();
}
fs.writeFileSync('../README.md', newReadme)