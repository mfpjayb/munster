module.exports = function getFilename(filepath) {
    const pathArr = filepath.split('/');
    return pathArr[pathArr.length - 1];
}
