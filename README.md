##Interview Questions and Prep

### HackReactor Prep
Solutions to practice problems written in Javascript.

## Find the sole odd or even number.
/*
Given a string of even and odd numbers, find which is the sole even number or the sole odd number.
  
The return value should be 1-indexed, not 0-indexed.

Examples :
detectOutlierValue("2 4 7 8 10"); // => 3 - Third number is odd, while the rest of the numbers are even
detectOutlierValue("1 10 1 1");  //=> 2 - Second number is even, while the rest of the numbers are odd
*/

// input: string of numbers, only 1 sole even or odd number 
// output: an index of the sole even or odd number
// process: change string to array, check if odd or even, find where there is a sole odd or even

// need a way to identify which is the unique number
// frequency hash of with keys being odd
//   return index of valuesArray of length 



function detectOutlierValue(str) {
  var arrayFromStringInput = str.split(" ");
  var resultsArray = arrayFromStringInput.filter(function(elem, index){
    
    if (elem % 2 === 0){
      console.log(index + elem);
      return index
    }
  });
  return resultsArray;
}

detectOutlierValue("4 12 6 8");


### Udacity Technical Interviews Course
Solutions to practice problems written in Javascript.

##Binary Trees

####Types of Traversal
```bash
        B
       / \
      /   \
     /     \
    A       C
```

######All types of Traversal
-Start at bottomest left 
-Traverse left to right

*Preorder*
  B, A, C
  root, leaf, leaf 
  
*Inorder*
  A, B, C
  leaf, root, leaf 
  
*Postorder*
  A, C, B 
  leaf, leaf, root

####Implement a Binary Tree

The following is given.  (Converted it from Java to Javascript).

```javascript
// function Node(value,left=null,right=null){
  // function Node(value,left,right){
    function Node(value){
     this.value = value;
  // this.left = left;
  // this.right = right;
}

function BinaryTree(root){
  this.root = Node(root);
}

// Node.prototype.preorderSearch = function(start, find_val){
//   if(this.value === null){return false}
//   if(this.value === find_val){
//     return true;
//   } else {
//     this.preorderSearch(this.left);
//     this.preorderSearch(this.right);
//     return false;
//   }
// }



//To set up a node 
var n = new Node(1);


// # Set up tree
//tree = BinaryTree(1)
// tree.root.left = Node(2)
// tree.root.right = Node(3)
// tree.root.left.left = Node(4)
// tree.root.left.right = Node(5)

// // # Test search
// // # Should be True
// console.log(tree.search(4));
// // # Should be False
// console.log(tree.search(6));

// // # Test print_tree
// // # Should be 1-2-4-5-3
// console.log(tree.print_tree());

```
