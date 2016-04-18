/**
 * Created by daniel.irwin on 4/18/16.
 */
module.exports = function treeImpl(blacklist){

    function treeify(arrayOfStrings){
        var tree = {};
        var depth;
        arrayOfStrings.forEach(function one(str){
            depth = tree;
            var i = 0;
            for(; i < str.length; ++i){
                if(!depth[str[i]]){
                    depth[str[i]] = {};
                }
                depth = depth[str[i]];
            }
            depth.leaf = true;
        });
        return tree;
    }

    var tree = treeify(blacklist);

    //console.log('tree', JSON.stringify(tree, null, 3));

    return function isBlackListed(str){

        var state = tree;

        for(var i = 0; i < str.length; ++i){
            if(str[i] === ' '){
                state = tree;
            }
            else {
                var tmp = state[str[i]];
                if(tmp){
                    if(tmp.leaf){
                        return true;
                    }
                    state = tmp;
                }
            }
        }
        return false;
    };
};