// Your company built an in-house calendar tool called HiCal. You want to add a feature to see the times in a day when everyone is available.
// To do this, you’ll need to know when any team is having a meeting. In HiCal, a meeting is stored as objects ↴ with attributes startTime and endTime . These integers represent the number of 30-minute blocks past 9:00am.
//
// For example:
//
//   {startTime: 2, endTime: 3} // meeting from 10:00 – 10:30 am
// {startTime: 6, endTime: 9} // meeting from 12:00 – 1:30 pm
//
// Write a function mergeRanges() that takes an array of meeting time ranges and returns an array of condensed ranges.
//
// For example, given:
//
//   [
//     {startTime: 0,  endTime: 1},
//     {startTime: 3,  endTime: 5},
//     {startTime: 4,  endTime: 8},
//     {startTime: 10, endTime: 12},
//     {startTime: 9,  endTime: 10},
// ]

frequency hash => (expected)
    {0:1, 1:0, 2:0, 3:1, 4:2, 5:1, 6:1, 7:1, 8:0, 9:1, 10:2, 11:1, 12:0}
//
// your function would return:
//
//   [
//     {startTime: 0, endTime: 1},
//     {startTime: 3, endTime: 8},
//     {startTime: 9, endTime: 12},
// ]
//
// Do not assume the meetings are in order. The meeting times are coming from multiple teams.
//
// Write a solution that's efficient even when we can't put a nice upper bound on the numbers representing our time ranges. Here we've simplified our times down to the number of 30-minute slots past 9:00 am. But we want the function to work even for very large numbers, like Unix timestamps. In any case, the spirit of the challenge is to merge meetings where startTime and endTime don't have an upper bound.

// ********************************************************
// Code Below
// ********************************************************

// objective: write a function mergeRanges();
// input => array of meeting time ranges
// output => array of condensed ranges
// process => when a meeting starts, log the startTime, and only stop when there are no meetings
// process2 => create a frequency hash
      // a frequency hash of all the ranges between start and end time
//   run through the hash, whenever it starts and stops, log it

var collection =
  [
    {startTime: 0,  endTime: 1},
    {startTime: 3,  endTime: 5},
    {startTime: 4,  endTime: 8},
    {startTime: 10, endTime: 12},
    {startTime: 9,  endTime: 10},
];

var logStartEndTimeAtOneIndex = function (arr, index){
  if (arr[index] === undefined){
    arr[index] = 1;
  } else {
    arr[index] += 1;
  }
};

var createFrequencyHashArr = function (collection){
  var frequencyHash = [];

  collection.forEach(function(value,index){
    for (var i = value.startTime; i < value.endTime; i++){
      logStartEndTimeAtOneIndex(frequencyHash, i);
    }

  })
  return frequencyHash;
};

function mergeRanges(collection){
  var frequencyHash = createFrequencyHashArr(collection);
  var result = [];

  var starttime = 0;

  console.log(frequencyHash);
  for (var i = 0; i < frequencyHash.length; i++){
    var value = frequencyHash[i];
    var prev = frequencyHash[i-1];
    var next = frequencyHash[i+1];
    // console.log('index = ' + index);
    if (next === undefined){
      console.log('value ' + value);
      console.log('next ' + next);

      result.push({startTime: starttime, endTime: i});
      console.log("if");
    } else if (prev === undefined){
      console.log('else if: ' + starttime);
      starttime = i;
    } else {
      // result.push(startTime = starttime, endTime = value);
      // result.push({startTime: starttime, endTime: i});
      console.log('else');
    }

  }
  console.log(result);
  return result;
}

mergeRanges(collection);
