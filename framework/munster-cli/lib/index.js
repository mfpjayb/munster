#!/usr/bin/env node

var $hBI6z$commander = require("commander");
var $hBI6z$path = require("path");
var $hBI6z$fs = require("fs");
var $hBI6z$chalk = require("chalk");

var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

var $59adbd211045405a$exports = {};
$59adbd211045405a$exports = JSON.parse("{\"name\":\"@munster/cli\",\"version\":\"0.0.0\",\"description\":\"\",\"main\":\"./lib/index.js\",\"preferGlobal\":true,\"bin\":{\"mc\":\"./lib/index.js\"},\"scripts\":{\"build\":\"parcel build ./src/index.ts && node ./shebang-script.js\"},\"keywords\":[],\"author\":\"\",\"license\":\"ISC\",\"dependencies\":{\"chalk\":\"^4.1.2\",\"commander\":\"^8.2.0\",\"fs\":\"^0.0.1-security\",\"parcel-plugin-shebang\":\"^1.3.3\",\"path\":\"^0.12.7\"},\"devDependencies\":{\"parcel\":\"^2.0.0-nightly.873\",\"typescript\":\"^4.4.3\"}}");





function $79665961c22514f4$export$544aaded68bb6ae2(errorMessage) {
    const currentDir = $parcel$global.process.cwd();
    const appJsonPath = $hBI6z$path.resolve(currentDir, 'munster-app.json');
    if (!$hBI6z$fs.existsSync(appJsonPath)) return console.log($hBI6z$chalk.red(errorMessage));
    return require(appJsonPath);
}





function $0fca9db67eeb89dc$export$fd546b5ffd1f6a92(str) {
    return str.replace(/-./g, (x)=>x.toUpperCase()[1]
    );
}


function $3d50f3fb2bc73bdf$export$41bee6f7d9cc7508(name) {
    const className = $0fca9db67eeb89dc$export$fd546b5ffd1f6a92(`-${name}`);
    return `import { Component } from "munster-core";

@Component({
    selector: 'app-${name}'
})
export class ${className}Component {

    $render(): any {
        return <h1>${className}Component Works!</h1>
    }

}
    `;
}


function $6010fa5992735a99$export$98b10a764a190f3d(filepath) {
    const pathArr = filepath.split('/');
    return pathArr[pathArr.length - 1];
}


function $bb790cd7633add39$export$bdca6652b68e98e8(filepath, appConfig) {
    const currentDir = $parcel$global.process.cwd();
    const filename = $6010fa5992735a99$export$98b10a764a190f3d(filepath);
    const componentText = $3d50f3fb2bc73bdf$export$41bee6f7d9cc7508(filename);
    const appFileDistination = $hBI6z$path.join(appConfig.appDir, `${filepath}.component.tsx`);
    const completeFileDistination = $hBI6z$path.resolve(currentDir, appFileDistination);
    const completeFolderDistination = $hBI6z$path.dirname(completeFileDistination);
    /**
     * Check if filename already exists, if yes don't create the file and throw an error
     */ if ($hBI6z$fs.existsSync(completeFileDistination)) console.log($hBI6z$chalk.red(`The file ${appFileDistination} already exists. Component creation failed.`));
    else {
        $hBI6z$fs.mkdirSync(completeFolderDistination, {
            recursive: true
        });
        $hBI6z$fs.writeFile(completeFileDistination, componentText, function(error) {
            if (error) console.log($hBI6z$chalk.red(`Creating component failed.`));
            console.log($hBI6z$chalk.green('CREATE'), appFileDistination);
        });
    }
}


function $e83e7a09693d1ebe$export$11d5b23373c10143(type, filename) {
    const appConfig = $79665961c22514f4$export$544aaded68bb6ae2(`Generate command must be run in munster project's root directory.`);
    switch(type){
        case 'component':
            $bb790cd7633add39$export$bdca6652b68e98e8(filename, appConfig);
            break;
    }
}


$hBI6z$commander.program.version((/*@__PURE__*/$parcel$interopDefault($59adbd211045405a$exports)).version).description('Munster JS CLI');
$hBI6z$commander.program.command('generate <type> <filename>').description('Generate a munster files.').action($e83e7a09693d1ebe$export$11d5b23373c10143);
$hBI6z$commander.program.parse($parcel$global.process.argv); // generate component
 // generate service


//# sourceMappingURL=index.js.map
