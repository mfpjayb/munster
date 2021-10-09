const json = require('./package.json');
const path = require('path');
const fs = require('fs');

const fullMainFilePath = path.resolve(__dirname, json.main);
const fileContent = fs.readFileSync(fullMainFilePath, { encoding: 'utf-8' });
const contentWithHashBang = "#!/usr/bin/env node\n\n" + fileContent;
fs.writeFile(fullMainFilePath, contentWithHashBang, function(error) {
    if (error) {
        console.log('Writing shebang failed.');
    }
});