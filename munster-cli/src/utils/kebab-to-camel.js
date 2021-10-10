module.exports = function(str) {
    return str.replace(/-./g, x=>x.toUpperCase()[1]);
}
