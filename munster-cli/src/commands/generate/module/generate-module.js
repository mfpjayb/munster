const { red, green } = require("chalk");
const { existsSync } = require("fs");
const Listr = require("listr");
const { join, resolve } = require("path");
const writeFile = require("../../../utils/write-file");
const getFilename = require("../component/get-filename");
const moduleTextGenerator = require("./module-text-generator");

module.exports = function(filepath, appConfig) {
    const filename = getFilename(filepath);
    const moduleText = moduleTextGenerator(filename);

    const appFileDistination = join(appConfig.appDir, `${filepath}.module.ts`);
    const completeFileDistination = resolve(global.process.cwd(), appFileDistination);

    const tasks = new Listr([
        {
            title: 'Creating new module ...',
            task: () => {
                if (existsSync(completeFileDistination)) {
                    console.log(red(`The file ${appFileDistination} already exists. Module creation failed.`));
                } else {
                    const successMessage = `${green('CREATE')} ${appFileDistination}`;
                    const errorMessage = `${red('Creating module failed.')}`;
                    writeFile(completeFileDistination, moduleText, successMessage, errorMessage);
                }
            }
        }
    ]);
    tasks.run().catch(error => console.error(error));
}