/**
 * Created by daniel.irwin on 4/18/16.
 */
var fs = require('fs');
//npm package thats basically just a txt file
var wordListPath = require('word-list');

const wordArray = fs.readFileSync(wordListPath, 'utf8').split('\n');
const SIZE = wordArray.length;
const BLACKLIST_SIZE = 100;


function rndWordIndex() {
    return Math.round(Math.random() * SIZE);
}

function generateBlackList(size) {
    var array = [];
    var indices = { aa : true };
    var rnd = 0;
    for (var i = 0 ; i < size; ++i) {
        while(indices[rnd]){
            rnd = rndWordIndex();
        }
        indices[rnd] = true;
        array.push(wordArray[rnd]);
    }
    return array;
}



var blacklist = generateBlackList(BLACKLIST_SIZE);

//console.log('blacklist', blacklist);


var basicImpl = require('./basicImpl');
var treeImpl = require('./treeImpl');

var basic = basicImpl(blacklist);
var tree = treeImpl(blacklist);

function test(impls, numberOfItterations){


    var results = {};

    //could be more optimal seeing strings are immutable, but its a testing utility function
    function generateStr(){
        var sentenceLength = Math.round((Math.random() * 10)+1);
        var sentence = '';
        for(var i = 0; i < sentenceLength; ++i) {
            sentence += ' ' + wordArray[rndWordIndex()];
        }
        return sentence;
    }

    var start;
    var end;
    for(var i = 0; i < numberOfItterations; ++i){

        var str = generateStr();

        Object.keys(impls).forEach(function imp(name){
            start = new Date().getTime();
            impls[name](str);
            end = new Date().getTime();

            if(!results[name]) {
                results[name] = {
                    time : 0,
                    count : 0
                };
            }
            results[name].time += end-start;
            results[name].count++;
        });

    }


    Object.keys(impls).forEach(function imp(name){
        results[name].avg = results[name].time / results[name].count;
    });

    return results;
}


console.log('basic & tree', test({
    tree : tree, basic : basic
}, 1000000));