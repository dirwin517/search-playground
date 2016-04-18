/**
 * Created by daniel.irwin on 4/18/16.
 */
module.exports = function basicImpl(blacklist){
    return function isBlackListed(str){
        return str.indexOf(blacklist) !== -1;
    };
};