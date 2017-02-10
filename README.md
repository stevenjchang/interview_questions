##Interview Questions and Prep



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
