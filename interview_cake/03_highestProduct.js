// Given an arrayOfInts, find the highestProduct you can get from three of the integers.
// The input arrayOfInts will always have at least three integers.

// #Steps----------
// #Clarifying the question
// #Generating the inputs and outputs
// #Generating test cases (have to think of edge cases)
// #Brainstorming (data structure, pseudocode)
// #Runtime analysis
// #Coding
// #Debugging


// Given an arrayOfInts, find the highestProduct you can get from three of the integers.
// The input arrayOfInts will always have at least three integers.


// #Clarifying the question
// 1 - will there be at least 3 ints in the array? Yes
// 2 - will they be three unique ints?

// #Generating the inputs and outputs
// highestProduct([1,2,3]) == 6
// highestProduct([5,8,9,11,10]) == 990

//Brainstorming
  //find the 3 highest value integers
  //find the product of the integers

  //solution #1
    //sort the array by order, return product of last 3

  //solution #2
    //store current maxes (max1, max2, max3)
    //is an if else that compares when values updated


//Runtime Analysis
//solution #1: n log n (ruby's builtin quicksort method)
//solution #2: one loop through, n


//Coding

function highestProduct(arrayofInts){
  //intialize variables for three highest maxs
  var max1 = arrayofInts[0];
  var max2;
  var max3;

  //iterate through array
  arrayofInts.forEach(function(int){
    if (int >= max1){
      max3 = max2;
      max2 = max1;
      max1 = int;
    }
    else if (int >= max2){
      max3 = max2;
      max2 = int;
    }
    else if (int >= max3){
      max3 = int;
    }
  });
  console.log("the three maxes:")
  console.log(max1, max2, max3);
  return max1 * max2 * max3;
}

//Tested with:
//highestProduct([1,2,3])// == 6
// highestProduct([5,8,9,11,10]) //== 990
 //highestProduct([5,8,-9,11,-10]) == 440
// highestProduct([5,5,5]) == 125
// highestProduct([1,2,3,4,3,2,100])



function highestProduct(arrayofInts){
  //intialize variables for three highest maxs
  var max1 = arrayofInts[0];
  var max2;
  var max3;

  var negmax1;
  // var negmax2;

  //iterate through array
  arrayofInts.forEach(function(int){
    if (int >= max1){
      max3 = max2;
      max2 = max1;
      max1 = int;
    }
    else if (int >= max2){
      max3 = max2;
      max2 = int;
    }
    else if (int >= max3){
      max3 = int;
    }
    //deal with negative numbers
    else if (int < 0){
      if (int < negmax1){
        negmax2 = negmax1;
        negmax1 = int;
      }
    }

  });
  console.log("the three maxes:")
  console.log(max1, max2, max3);
  return max1 * max2 * max3;
}

[-4,-3,1,2,3]
//even though our three highest numbers are 1,2,3 (product = 6)
//our highest product is actually -4 * -3 * 3 = 36

  var max1 = 3;
  var max2 = 2;
  var max3 = 1;

  var negmax1 = -4;
  var negmax2 = -3;

  //compare negmaxproduct to maxproduct
  if ((max2*max3) > (negmax1 * negmax2)){ // 2 > 12
    return max1 * max2 * max3;
  } else {
    return max1 * negmax1 * negmax2;  //3 * -4 * -3 = 36
  }

//interviewcake solution
[-4,-3,1,2,3]

//highestProductOf2 = 3 * 2 = 6
//lowestProductOf2 =  -4 * 3 = -12

//highestProductOf3
//-4 * -3 * 3 = 36




[-4,-3,-1,2,3]
//highest product = -4 * -3 * 3 = 36

[-3,1,2,3]
//highest product = 1 * 2 * 3 = 6


// [-5,0,2,3]
// //product from our three maxes, is 0*2*3 = 0
// //highest product is actually


//INTERVIEWCAKE SOLUTION
  function highestProductOf3(arrayOfInts) {
    if (arrayOfInts.length < 3) {
        throw new Error('Less than 3 items!');
    }

    // We're going to start at the 3rd item (at index 2)
    // so pre-populate highests and lowests based on the first 2 items.
    // we could also start these as null and check below if they're set
    // but this is arguably cleaner
    var highest = Math.max(arrayOfInts[0], arrayOfInts[1]);
    var lowest  = Math.min(arrayOfInts[0], arrayOfInts[1]);

    var highestProductOf2 = arrayOfInts[0] * arrayOfInts[1];
    var lowestProductOf2  = arrayOfInts[0] * arrayOfInts[1];

    // except this one--we pre-populate it for the first *3* items.
    // this means in our first pass it'll check against itself, which is fine.
    var highestProductOf3 = arrayOfInts[0] * arrayOfInts[1] * arrayOfInts[2];

    // walk through items, starting at index 2
    for (var i = 2; i < arrayOfInts.length; i++) {
        var current = arrayOfInts[i];

        // do we have a new highest product of 3?
        // it's either the current highest,
        // or the current times the highest product of two
        // or the current times the lowest product of two
        highestProductOf3 = Math.max(
            highestProductOf3,
            current * highestProductOf2,
            current * lowestProductOf2
        );

        // do we have a new highest product of two?
        highestProductOf2 = Math.max(
            highestProductOf2,
            current * highest,
            current * lowest
        );

        // do we have a new lowest product of two?
        lowestProductOf2 = Math.min(
            lowestProductOf2,
            current * highest,
            current * lowest
        );

        // do we have a new highest?
        highest = Math.max(highest, current);

        // do we have a new lowest?
        lowest = Math.min(lowest, current);
    }

    return highestProductOf3;
}
