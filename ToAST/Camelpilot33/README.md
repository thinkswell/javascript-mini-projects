# A program for turning a mathematical expression into a syntax tree
This is written in pure javascript, and converts a string (eg. "3/2^x") into the tree
```
    V          
    |          
 ┌ (/)——— ┐    
 |        |    
(3)    ┌ (^) ┐ 
       |     | 
      (2)   (x)
```
It implements an AST (abstract syntax tree) class, with a printing method, producing what is shown above. 
The function `tokenize(.)` takes a string and returns an array of tokens which can then be passed into the function `toast(.)`,
which converts it into an AST using the shunting-yard algorithm (array -> RPN -> AST). I have also created methods for simplifying and evaluating the AST. 
A live demo can be seen [here](https://camelpilot33.github.io/Camul-Home-Page/projects/math/).\
There are three buttons, `Evaluate` tries to evaluate the AST, `AST` prints the AST, and `Simplified AST` converts the input to and AST and then tries to simplify it (it is a bit buggy, and it will not catch all simplification rules).
All of the code is contained in `main.js`, along with a sample.
