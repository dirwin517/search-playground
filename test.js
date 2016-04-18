/**
 * Created by daniel.irwin on 4/18/16.
 */
var blacklist = ['value', 'parser', 'tree'];

var goodSentence = 'i have a valium, in my purse, that was made from birch';

var badSentence = 'i have a value parser tree';

var treeImpl = require('./treeImpl');

var tree = treeImpl(blacklist);

console.log('good ', tree(goodSentence));

console.log('bad ', tree(badSentence));