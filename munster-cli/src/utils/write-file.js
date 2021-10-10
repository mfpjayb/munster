const { dirname } = require('path');
const { mkdirSync, writeFile } = require('fs');

module.exports = function(
    completeFileDistination,
    content,
    successMessage = null,
    writeErrorMessage = null
) {
    const completeFolderDistination = dirname(completeFileDistination);

    mkdirSync(completeFolderDistination, { recursive: true });
    wf(completeFileDistination, content, function(error) {
        if (error && writeErrorMessage) {
            console.log(writeErrorMessage);
        } else if (!error && successMessage) {
            console.log(successMessage);
        }
    });
}