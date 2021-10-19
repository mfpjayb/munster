const { red, green } = require("chalk");
const { existsSync } = require("fs");
const Listr = require("listr");
const { join, resolve } = require("path");
const writeFile = require("../../../utils/write-file");
const getFilename = require("../component/get-filename");
const serviceTextGenerator = require("./service-text-generator");

module.exports = function(filepath, appConfig) {
    const filename = getFilename(filepath);
    const serviceText = serviceTextGenerator(filename);

    const appFileDestination = join(appConfig.appDir, `${filepath}/../${filename}.service.ts`);
    const completeFileDestination = resolve(global.process.cwd(), appFileDestination);

    const tasks = new Listr([
        {
            title: 'Creating new service ...',
            task: () => {
                if (existsSync(completeFileDestination)) {
                    console.log(red(`The file ${appFileDestination} already exists. Service creation failed.`));
                } else {
                    const successMessage = `${green('CREATE')} ${appFileDestination}`;
                    const errorMessage = `${red('Creating service failed.')}`;
                    writeFile(completeFileDestination, serviceText, successMessage, errorMessage);
                }
            }
        }
    ]);
    tasks.run().catch(error => console.error(error));
}