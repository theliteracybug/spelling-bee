"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zip = exports.shuffle = exports.incrementDups = exports.gridify = exports.generateAnswerObjs = exports.epoch = exports.chunk = void 0;
var date_fns_1 = require("date-fns");
// generic js functions
// https://levelup.gitconnected.com/lodash-methods-that-can-be-easily-implemented-in-plain-javascript-bbe22509827e
var chunk = function (_a) {
    var arr = _a.arr, size = _a.size;
    var chunkedArr = [];
    for (var i = 0; i < arr.length; i += size) {
        chunkedArr.push(arr.slice(i, i + size));
    }
    return chunkedArr;
};
exports.chunk = chunk;
// TODO: sort alphabetically and vertically instead of horizontally?
// returns array of objects
// [{1: 'a', 2: 'b', 3:'c'}, {1:'d', 2:'e'}]
var gridify = function (_a) {
    var arr = _a.arr, size = _a.size;
    return chunk({ arr: arr, size: size }).map(function (arr) {
        var obj = {};
        arr.forEach(function (value, index) {
            obj["".concat(index + 1)] = value;
        });
        return obj;
    });
};
exports.gridify = gridify;
// allow random generator to be seeded for more predictable results of createFiles.ts
var createRandomGenerator = function (_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.seed, seed = _c === void 0 ? 1 : _c;
    // https://stackoverflow.com/a/19303725/6305204
    // produces random floats between 0 and 1.0
    var random = function () {
        var x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    };
    return random;
};
// https://stackoverflow.com/a/46545530/6305204
var shuffle = function (array, seed) {
    if (seed === void 0) { seed = 1; }
    var randomFloat = createRandomGenerator({ seed: seed });
    return array
        .map(function (value) { return ({ value: value, sort: randomFloat() }); })
        .sort(function (a, b) { return a.sort - b.sort; })
        .map(function (_a) {
        var value = _a.value;
        return value;
    });
};
exports.shuffle = shuffle;
// https://stackoverflow.com/a/22015771/6305204
var zip = function (arr1, arr2) {
    return arr1.map(function (e, i) {
        return [e, arr2[i]];
    });
};
exports.zip = zip;
var incrementDups = function (arr) {
    var encounters = new Set();
    return arr.map(function (num) {
        while (encounters.has(num)) {
            num += 1;
        }
        encounters.add(num);
        return num;
    });
};
exports.incrementDups = incrementDups;
// year game started, not released until mid-year so no issue using as epoch
var epoch = new Date("2022-01-01");
exports.epoch = epoch;
var generateAnswerObjs = function (_a) {
    var allAnswers = _a.allAnswers, gameDate = _a.gameDate;
    // use days since arbitrary epoch to ensure yesterdays answers is always 1 behind todays.
    var daysSinceEpoch = (0, date_fns_1.differenceInDays)(gameDate, epoch);
    // pick next puzzle input, % len puzzles to restart if out of index (circular)
    var todaysAnswerObj = allAnswers[daysSinceEpoch % allAnswers.length];
    var yesterdaysAnswerObj = allAnswers[(daysSinceEpoch - 1) % allAnswers.length];
    return { todaysAnswerObj: todaysAnswerObj, yesterdaysAnswerObj: yesterdaysAnswerObj };
};
exports.generateAnswerObjs = generateAnswerObjs;
