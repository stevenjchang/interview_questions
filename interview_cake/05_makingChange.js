Imagine you landed a new job as a cashier...
Your quirky boss found out that you're a programmer and has a weird request about something they've been wondering for a long time.

Write a function that, given:

an amount of money
a list of coin denominations
computes the number of ways to make amount of money with coins of the available denominations.

Example: for amount=4 (4¢) and denominations=[1,2,3] (1¢, 2¢ and 3¢), your program would output 4—the number of ways to make 4¢ with those denominations:

1¢, 1¢, 1¢, 1¢
1¢, 1¢, 2¢
1¢, 3¢
2¢, 2¢

Input = 27
denominations = 1, 5, 10, 25
25 + 1 + 1
10 + 10 + 5 + 1 + 1
10 + 5 + 5 + 5 + 1 + 1
5 + 5 + 5 + 5 + 5 + 1 + 1
5 + 5 + 5 + 5 + 1 + 1 + 1 + 1 + 1 + 1 + 1
5 + 5 + 5 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1
5 + 5 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1
5 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1
1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1

9 ways


// #Steps----------
// #Clarifying the question

// #Generating the inputs and outputs
    // 2 inputs: money (number of cents), array of denominations
// #Generating test cases (have to think of edge cases)
    // if input amount is less than smallest denomination
    // if there cannot be exact change given
// #Brainstorming (data structure, pseudocode)
    A = input
    D1, D2, D3 = 3 sample denominations
    //

      //
// #Runtime analysis
// #Coding
// #Debugging
