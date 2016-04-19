/**
 * Created by daniel.irwin on 4/18/16.
 */
module.exports = function basicImpl(blacklist){
    return function isBlackListed(str){
        var blacklisted = false;
        blacklist.forEach(function (item){
            blacklisted |= str.indexOf(item) !== -1;
        });
        return blacklisted;
    };
};