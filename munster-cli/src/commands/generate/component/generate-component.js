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
    const appFileDestination = join(appConfig.appDir, `${filepath}/${filename}.component.tsx`);
    const appFileDestinationStyle = join(appConfig.appDir, `${filepath}/${filename}.component.scss`);
    const completeFileDestination = resolve(global.process.cwd(), appFileDestination);
    const completeFileDestinationStyle = resolve(global.process.cwd(), appFileDestinationStyle);

    const tasks = new Listr([
        {
            title: 'Creating new component ...',
            task: () => {
                if (existsSync(completeFileDestination)) {
                    console.log(red(`The file ${appFileDestination} already exists. Component creation failed.`));
                } else {
                    const errorMessage = `${red('Creating component failed.')}`;
                    const successMessage = `${green('CREATE')} ${appFileDestination}`;
                    const successMessageStyle = `${green('CREATE')} ${appFileDestinationStyle}`;

                    writeFile(completeFileDestination, componentText, successMessage, errorMessage);
                    writeFile(completeFileDestinationStyle, '', successMessageStyle, errorMessage);
                }
            }
        }
    ]);
    tasks.run().catch(error => console.error(error));
}
