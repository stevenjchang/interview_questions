//sample balanced and unbalanced
parans_false = "{{}";
parans_true = "{{{}}{}}"
p_false3 = "{{{";
p_false4 = "{}}}";


//check if balanced
function isBalanced(str){
  var stack = [];
  var check_str = str;

  //an empty string would be true
  if (check_str.length <= 0) return false;

  //for each element
  for (var i = 0; i < check_str.length; i++){
    //p element
    console.log(check_str[i]);

    //push on stack if an opening {
    if (check_str[i] === "{"){
      stack.push(check_str[i]);
    }
    //pop if a closing }
    else if (check_str[i] === "}"){
      //pop on an empty array is undefined
      if (stack.length > 0){
        stack.pop();
      } else {
        return false;
      }
    }
  }

  //return false is stack not empty
  if (stack.pop()){
    return false;
  }
  //return true if stamp empty
  return true;
}
