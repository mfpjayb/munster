module.exports = function(filepath) {
    const pathArr = filepath.split('/');
    return pathArr[pathArr.length - 1];
}
