Imagine you landed a new job as a cashier...
Your quirky boss found out that you're a programmer and has a weird request about something they've been wondering for a long time.

Write a function that, given:

an amount of money
an array of coin denominations
computes the number of ways to make amount of money with coins of the available denominations.

Example: for amount=4 (4¢) and denominations=[1,2,3] (1¢, 2¢ and 3¢), your program would output 4—the number of ways to make 44¢ with those denominations:

1¢, 1¢, 1¢, 1¢
1¢, 1¢, 2¢
1¢, 3¢
2¢, 2¢
Gotchas
What if there's no way to make the amount with the denominations? Does your function have reasonable behavior?

We can do this in O(n*m)O(n∗m) time and O(n)O(n) space, where nn is the amount of money and mm is the number of denominations.

A simple recursive approach works, but you'll find that your function gets called more than once with the same inputs. We can do better.

We could avoid the duplicate function calls by memoizing ↴ , but there's a cleaner bottom-up ↴ approach.

Breakdown
We need to find some way to break this problem down into subproblems.

Here's one way: for each denomination, we can use it once, or twice, or...as many times as it takes to reach or overshoot the amount with coins of that denomination alone.

For each of those choices of how many times to include coins of each denomination, we're left with the subproblem of seeing how many ways we can get the remaining amount from the remaining denominations.

Here's that approach in pseudocode:

  function numberOfWays(amount, denominations) {
    answer = 0;
    denominations.forEach(denomination) {
        possibleNumTimesToUseDenominationWithoutOvershootingAmount.forEach(numTimesToUseDenomination) {
            answer += numberOfWays(amountRemaining, otherDenominations);
        }
    }
    return answer;
}
The answer for some of those subproblems will of course be 0. For example, there's no way to get 1¢ with only 2¢ coins.

As a recursive function, we could formalize this as:

  function changePossibilitiesTopDown(amountLeft, denominations, currentIndex) {
    currentIndex = currentIndex || 0;

    // base cases:
    // we hit the amount spot on. yes!
    if (amountLeft === 0) return 1;

    // we overshot the amount left (used too many coins)
    if (amountLeft < 0) return 0;

    // we're out of denominations
    if (currentIndex === denominations.length) return 0;

    console.log('checking ways to make ' + amountLeft + ' with ' + denominations.slice(currentIndex));

    // choose a current coin
    var currentCoin = denominations[currentIndex];

    // see how many possibilities we can get
    // for each number of times to use currentCoin
    var numPossibilities = 0;
    while (amountLeft >= 0) {
        numPossibilities += changePossibilitiesTopDown(amountLeft,
            denominations, currentIndex + 1);
        amountLeft -= currentCoin;
    }

    return numPossibilities;
}

But there's a problem—we'll often duplicate the work of checking remaining change possibilities. Note the duplicate calls with the input 4, [1,2,3]:

  ❯ changePossibilitiesTopDown(4, [1, 2, 3]);
  checking ways to make 4 with 1,2,3
  checking ways to make 4 with 2,3
  checking ways to make 4 with 3
  checking ways to make 2 with 3
  checking ways to make 3 with 2,3
  checking ways to make 3 with 3
  checking ways to make 1 with 3
  checking ways to make 2 with 2,3
  checking ways to make 2 with 3
  checking ways to make 1 with 2,3
  checking ways to make 1 with 3
❮ 4
For example, we check ways to make 2 with [3] twice.

We can do better. How do we avoid this duplicate work and bring down the time cost?

One way is to memoize ↴
Memoization ensures that a function doesn't run for the same inputs more than once by keeping a record of the results for given inputs (usually in an object).

For example, a simple recursive function for computing the nnth fibonacci number:

  function fibRecursive(n) {
    if (n === 0 || n === 1) {
        return n;
    }
    console.log('computing fibRecursive(' + n + ')');
    return fibRecursive(n - 1) + fibRecursive(n - 2);
}

Will run on the same inputs multiple times:

  ❯ fibRecursive(8)
  computing fibRecursive(8)
  computing fibRecursive(7)
  computing fibRecursive(6)
  computing fibRecursive(5)
  computing fibRecursive(4)
  computing fibRecursive(3)
  computing fibRecursive(2)
  computing fibRecursive(2)
  computing fibRecursive(3)
  computing fibRecursive(2)
  computing fibRecursive(4)
  computing fibRecursive(3)
  computing fibRecursive(2)
  computing fibRecursive(2)
  computing fibRecursive(5)
  computing fibRecursive(4)
  computing fibRecursive(3)
  computing fibRecursive(2)
  computing fibRecursive(2)
  computing fibRecursive(3)
  computing fibRecursive(2)
  computing fibRecursive(6)
  computing fibRecursive(5)
  computing fibRecursive(4)
  computing fibRecursive(3)
  computing fibRecursive(2)
  computing fibRecursive(2)
  computing fibRecursive(3)
  computing fibRecursive(2)
  computing fibRecursive(4)
  computing fibRecursive(3)
  computing fibRecursive(2)
  computing fibRecursive(2)
❮ 21
We can imagine the recursive calls of this function as a tree, where the two children of a node are the two recursive calls it makes. We can see that the tree quickly branches out of control:

A binary tree showing the recursive calls of calling fib of 5. Every fib of n call calls fib of n minus 1 and fib of n minus 2. So calling fib of 5 calls fib of 4 and fib of 3, which keep calling fib of lower numbers until reaching the base cases fib of 1 or fib of 0.
To avoid the duplicate work caused by the branching, we can wrap the function in a class that stores an instance variable, memo, that maps inputs to outputs. Then we simply:

Check memo to see if we can avoid computing the answer for any given input, and
Save the results of any calculations to memo.
  function Fibber() {
    this.memo = {};
}

Fibber.prototype.fib = function(n) {

    // edge case
    if (n < 0) {
        throw new Error('Index was negative. No such thing as a negative index in a series.');

    // base cases
    } else if (n === 0 || n === 1) {
        return n;
    }

    // see if we've already calculated this
    if (this.memo.hasOwnProperty(n)) {
        console.log('grabbing memo[' + n + ']');
        return this.memo[n];
    }

    console.log('computing fib(' + n + ')');
    var result = this.fib(n - 1) + this.fib(n - 2);

    // memoize
    this.memo[n] = result;

    return result;
}

We save a bunch of calls by checking the memo:

  ❯ Fibber().fib(8)
  computing fib(8)
  computing fib(7)
  computing fib(6)
  computing fib(5)
  computing fib(4)
  computing fib(3)
  computing fib(2)
  grabbing memo[2]
  grabbing memo[3]
  grabbing memo[4]
  grabbing memo[5]
  grabbing memo[6]
❯ 21
Now in our recurrence tree, no node appears more than twice:

A binary tree showing the memos and recursive calls of calling fib of 5. Starting with the calls for fib of n minus 1, fib of 5 calls fib of 4, which calls fib of 3, which calls fib of 2, which calls fib of 1. then, for the fib of n minus 2 calls, fib of 5 gets the memo fib of 3, fib of 4 gets the memo fib of 2, fib of 3 gets the memo fib of 1, and fib of 2 calls fib of 0.
Memoization is a common strategy for dynamic programming problems, which are problems where the solution is composed of solutions to the same problem with smaller inputs (as with the fibonacci problem, above). The other common strategy for dynamic programming problems is going bottom-up, which is usually cleaner and often more efficient.
.

Here's what the memoization might look like:

  function Change() {
    this.memo = {};
}

Change.prototype.changePossibilitiesTopDown = function(amountLeft, denominations, currentIndex) {
    currentIndex = currentIndex || 0;

    // check our memo and short-circuit if we've already solved this one
    var memoKey = String([amountLeft, currentIndex]);
    if (this.memo.hasOwnProperty(memoKey)) {
        console.log('grabbing memo[' + memoKey + ']');
        return this.memo[memoKey];
    }

    // base cases:
    // we hit the amount spot on. yes!
    if (amountLeft === 0) return 1;

    // we overshot the amount left (used too many coins)
    if (amountLeft < 0) return 0;

    // we're out of denominations
    if (currentIndex === denominations.length) return 0;

    console.log('checking ways to make ' + amountLeft + ' with ' + denominations.slice(currentIndex));

    // choose a current coin
    var currentCoin = denominations[currentIndex];

    // see how many possibilities we can get
    // for each number of times to use currentCoin
    var numPossibilities = 0;
    while (amountLeft >= 0) {
        numPossibilities += this.changePossibilitiesTopDown(amountLeft, denominations, currentIndex + 1);
        amountLeft -= currentCoin;
    }

    // save the answer in our memo so we don't compute it again
    this.memo[memoKey] = numPossibilities;
    return numPossibilities;
};

And now our checking has no duplication:

  ❯ new Change().changePossibilitiesTopDown(4, [1, 2, 3]);
  checking ways to make 4 with 1,2,3
  checking ways to make 4 with 2,3
  checking ways to make 4 with 3
  checking ways to make 2 with 3
  checking ways to make 3 with 2,3
  checking ways to make 3 with 3
  checking ways to make 1 with 3
  checking ways to make 2 with 2,3
  grabbing memo[2,2]
  checking ways to make 1 with 2,3
  grabbing memo[1,2]
❮ 4
This answer is quite good. It certainly solves our duplicate work problem. It takes O(n*m)O(n∗m) time and O(n*m)O(n∗m) space, where nn is the size of amount and m is the number of items in denominations. (Except we'd need to remove the line where we log "checking ways to make..." because making all those subarrays will take O(m^2)O(m
​2
​​ ) space!)

However, we can do better. Because our function is recursive it will build up a large call stack ↴ of size O(m)O(m). Of course, this cost is eclipsed by the memory cost of memo, which is O(n*m)O(n∗m). But it's still best to avoid building up a large stack like this, because it can cause a stack overflow (yes, that means recursion is usually better to avoid for functions that might have arbitrarily large inputs).

It turns out we can get O(n)O(n) additional space.

A great way to avoid recursion is to go bottom-up ↴
Going bottom-up is a way to avoid recursion, saving the memory cost that recursion incurs when it builds up the call stack.

Put simply, a bottom-up algorithm "starts from the beginning," while a recursive algorithm often "starts from the end and works backwards."

For example, if we wanted to multiply all the numbers in the range 1...n1...n, we could use this cute, top-down, recursive one-liner:

  function product1ToN(n) {
    // we assume n >= 1
    return (n > 1) ? (n * product1ToN(n-1)) : 1;
}

This approach has a problem: it builds up a call stack of size O(n)O(n), which makes our total memory cost O(n)O(n). This makes it vulnerable to a stack overflow error, where the call stack gets too big and runs out of space.

To avoid this, we can instead go bottom-up:

  function product1ToN(n) {
    // we assume n >= 1

    var result = 1;
    for (var num = 1; num <= n; num++) {
        result *= num;
    }

    return result;
}

This approach uses O(1)O(1) space (O(n)O(n) time).

Some compilers and interpreters will do what's called tail call optimization (TCO), where it can optimize some recursive functions to avoid building up a tall call stack. Python and Java decidedly do not use TCO. Some Ruby implementations do, but most don't. Some C implementations do, and the JavaScript spec recently allowed TCO. Scheme is one of the few languages that guarantee TCO in all implementations. In general, best not to assume your compiler/interpreter will do this work for you.

Going bottom-up is a common strategy for dynamic programming problems, which are problems where the solution is composed of solutions to the same problem with smaller inputs (as with the fibonacci problem, above). The other common strategy for dynamic programming problems is memoization.
.

Our recursive approach was top-down because it started with the final value for amount and recursively broke the problem down into subproblems with smaller values for amount. What if instead we tried to compute the answer for small values of amount first, and use those answers to iteratively compute the answer for higher values until arriving at the final amount?

We can start by making an array waysOfDoingNCents, where the index is the amount and the value at each index is the number of ways of getting that amount.

This array will take O(n)O(n) space, where nn is the size of amount.

To further simplify the problem, we can work with only the first coin in denominations, then add in the second coin, then the third, etc.

What would waysOfDoingNCents look like for just our first coin: 1¢? Let's call this waysOfDoingNCents1.

  var waysOfDoingNCents1 = [
    1,  // 0c:  no coins
    1,  // 1c:  1 1c coin
    1,  // 2c:  2 1c coins
    1,  // 3c:  3 1c coins
    1,  // 4c:  4 1c coins
    1,  // 5c:  5 1c coins
];

Now what if we add a 2¢ coin?

  var waysOfDoingNCents1And2 = [
    1,    // 0c:  no change
    1,    // 1c:  no change
    1+1,  // 2c:  new [(2)]
    1+1,  // 3c:  new [(2,1)]
    1+2,  // 4c:  new [(2,1,1), (2,2)]
    1+2,  // 5c:  new [(2,1,1,1), (2,2,1)]
];

How do we formalize this process of going from waysOfDoingNCents1 to waysOfDoingNCents1And2?

Let's suppose we're partway through already (this is a classic dynamic programming approach). Say we're trying to calculate waysOfDoingNCents1And2[5]. Because we're going bottom-up, we know we already have:

waysOfDoingNCents1And2 for amounts less than 55
a fully-populated waysOfDoingNCents1
So how many new ways should we add to waysOfDoingNCents1[5] to get waysOfDoingNCents1And2[5]?

Well, if there are any new ways to get 5¢ now that we have 2¢ coins, those new ways must involve at least one 2¢ coin. So if we presuppose that we'll use one 2¢ coin, that leaves us with 5-2=35−2=3 left to come up with. We already know how many ways we can get 3¢ with 1¢ and 2¢ coins: waysOfDoingNCents1And2[3], which is 22.

So we can see that:

  waysOfDoingNCents1And2[5] = waysOfDoingNCents1[5] + waysOfDoingNCents1And2[5-2]

Why don't we also need to check waysOfDoingNCents1And2[5 - 2 - 2] (two 2¢ coins)? Because we already checked waysOfDoingNCents1And2[1] when calulating waysOfDoingNCents1And2[3]. We'd be counting some arrangements multiple times. In other words, waysOfDoingNCents1And2[k] already includes the full count of possibilities for getting kk, including possibilities that use 2¢ any number of times. We're only interested in how many more possibilities we might get when we go from kk to k+2k+2 and thus have the ability to add one more 2¢ coin to each of the possibilities we have for kk.

Solution
We use a bottom-up ↴ algorithm to build up a table waysOfDoingNCents such that waysOfDoingNCents[k] is how many ways we can get to k cents using our denominations. We start with the base case that there's one way to create the amount zero, and progressively add each of our denominations.

The number of new ways we can make a higherAmount when we account for a new coin is simply waysOfDoingNCents[higherAmount - coin], where we know that value already includes combinations involving coin (because we went bottom-up, we know smaller values have already been calculated).

  function changePossibilitiesBottomUp(amount, denominations) {

    // intialize an array of zeros with indices up to amount
    var waysOfDoingNcents = [];
    for (var i = 0; i <= amount; i++) {
        waysOfDoingNcents[i] = 0;
    }
    waysOfDoingNcents[0] = 1;

    for (var j = 0; j < denominations.length; j++) {
        var coin = denominations[j];
        for (var higherAmount = coin; higherAmount <= amount; higherAmount++) {
            var higherAmountRemainder = higherAmount - coin;
            waysOfDoingNcents[higherAmount] += waysOfDoingNcents[higherAmountRemainder];
        }
    }

    return waysOfDoingNcents[amount];
}

Heres how waysOfDoingNCents would look in successive iterations of our function for amount=55 and denominations=[1,3,5][1,3,5].

  ===========
key:
a = higherAmount
r = higherAmountRemainder
===========

============
for coin = 1:
============
[1, 1, 0, 0, 0, 0]
 r  a

[1, 1, 1, 0, 0, 0]
    r  a

[1, 1, 1, 1, 0, 0]
       r  a

[1, 1, 1, 1, 1, 0]
          r  a

[1, 1, 1, 1, 1, 1]
             r  a

============
for coin = 3:
=============
[1, 1, 1, 2, 1, 1]
 r        a

[1, 1, 1, 2, 2, 1]
    r        a

[1, 1, 1, 2, 2, 2]
       r        a

============
for coin = 5:
=============
[1, 1, 1, 2, 2, 3]
 r              a


final answer: 3
Complexity
O(n*m)O(n∗m) time and O(n)O(n) additional space, where nn is the amount of money and mm is the number of potential denominations.

What We Learned
This question is in a broad class called "dynamic programming." We have a bunch more dynamic programming questions we'll go over later.

Dynamic programming is kind of like the next step up from greedy ↴ . You're taking that idea of "keeping track of what we need in order to update the best answer so far," and applying it to situations where the new best answer so far might not just have to do with the previous answer, but some other earlier answer as well.

So as you can see in this problem, we kept track of all of our previous answers to smaller versions of the problem (called "subproblems") in a big array called waysOfDoingNCents.

Again, same idea of keeping track of what we need in order to update the answer as we go, like we did when storing the max product of 2, min product of 2, etc in the highest product of 3 question. Except now the thing we need to keep track of is all our previous answers, which we're keeping in an array.

We built that array bottom-up, but we also talked about how we could do it top-down and memoize. Going bottom-up is cleaner and usually more efficient, but often it's easier to think of the top-down version first and try to adapt from there.

Dynamic programming is a weak point for lots of candidates. If this one was tricky for you, don't fret. We have more coming later.
