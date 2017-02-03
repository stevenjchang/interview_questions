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


// #Steps----------
// #Clarifying the question
// #Generating the inputs and outputs
// #Generating test cases (have to think of edge cases)
// #Brainstorming (data structure, pseudocode)
// #Runtime analysis
// #Coding
// #Debugging

//expected input:
  //list of start and end times

//expected output:
  //condensed list of the input

//edge cases

//Brainstorming

    //create array with all possible 30-minute blocks
      //iterate through input array

        //create an array of index boolean key value pairs

        //take the range of start to end times: create 'true' boolean at all indicies from starttime to endtime

        //iterate through new binary array, enter start time until false value, set end time, begin next starttime at next true value

 //    {startTime: 0,  endTime: 1},
//     {startTime: 3,  endTime: 5},
//     {startTime: 4,  endTime: 8},
//     {startTime: 10, endTime: 12},
//     {startTime: 9,  endTime: 10},


//final:

startTime = 0;
newArray[inputArray[startTime]] = true;
arr = [1,2,3]
arr[6] = true

[{0: true}, {1: free}, {2: busy}, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
