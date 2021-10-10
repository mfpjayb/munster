const { ncp } = require("ncp");

module.exports = function(source, distination, callback) {
    ncp(source, distination, function(error) {
        if (error) {
            throw error;
        }
        return callback();
    });
}

// const ncp = require('ncp');

// module.exports = function(source, destination, callback = function() { return true; }) {
//   ncp(source, destination, function(error) {
//     if (error) {
//       throw new Error(error);
//     }
//     return callback();
//   });
// // }