const { red, green } = require("chalk");
const { existsSync } = require('fs');
const Listr = require("listr");
const { join, resolve } = require('path');
const writeFile = require("../../../utils/write-file");
const componentTextGenerator = require("./component-text-generator");
const getFilename = require("./get-filename");

module.exports = function(filepath, appConfig) {
    const filename = getFilename(filepath);
    const componentText = componentTextGenerator(filename);
    const appFileDistination = join(appConfig.appDir, `${filepath}/${filename}.component.tsx`);
    const appFileDistinationStyle = join(appConfig.appDir, `${filepath}/${filename}.component.scss`);
    const completeFileDistination = resolve(global.process.cwd(), appFileDistination);
    const completeFileDistinationStyle = resolve(global.process.cwd(), appFileDistinationStyle);

    const tasks = new Listr([
        {
            title: 'Creating new component ...',
            task: () => {
                if (existsSync(completeFileDistination)) {
                    console.log(red(`The file ${appFileDistination} already exists. Component creation failed.`));
                } else {
                    const errorMessage = `${red('Creating component failed.')}`;
                    const successMessage = `${green('CREATE')} ${appFileDistination}`;
                    const successMessageStyle = `${green('CREATE')} ${appFileDistinationStyle}`;

                    writeFile(completeFileDistination, componentText, successMessage, errorMessage);
                    writeFile(completeFileDistinationStyle, '', successMessageStyle, errorMessage);
                }
            }
        }
    ]);
    tasks.run().catch(error => console.error(error));
}
