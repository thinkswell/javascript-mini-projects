//Palindrome Checker

function palindrome_check(){
  var string = prompt("Enter a string", "Palindrome");
  var reg = /[\W_]/g;

  var smallstring = string.toLowerCase().replace(reg, "");

  var reversed = smallstring.split("").reverse().join("");
  if (reversed === smallstring){
    return document.getElementById("prog").innerHTML = smallstring +
    " is a palindrome. ";
  }
  else{
    return document.getElementById("prog").innerHTML = smallstring +
    " is not a palindrome. ";
  }

}
