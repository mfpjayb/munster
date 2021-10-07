const { red, green } = require("chalk");
const fs = require("fs");
const path = require('path');
const componentTextGenerator = require("./component-text-generator");
const getFilename = require("./get-filename");

module.exports = function (filepath, appConfig) {
    const currentDir = process.cwd();
    const filename = getFilename(filepath);
    const componentText = componentTextGenerator(filename);
    const appFileDistination = path.join(appConfig.appDir, `${filepath}.component.tsx`);
    const completeFileDistination = path.resolve(currentDir, appFileDistination);
    const completeFolderDistination = path.dirname(completeFileDistination);

    /**
     * Check if filename already exists, if yes don't create the file and throw an error
     */
    if (fs.existsSync(completeFileDistination)) {
        console.log(red(`The file ${appFileDistination} already exists. Component creation failed.`));
    } else {
        fs.mkdirSync(completeFolderDistination, { recursive: true });
        fs.writeFile(completeFileDistination, componentText, function(error) {
            if (error) {
                console.log(red(`Creating component failed.`));
            }
            console.log(green('CREATE'), appFileDistination);
        });
    }
}
