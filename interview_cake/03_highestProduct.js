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
