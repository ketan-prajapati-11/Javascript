#### In JavaScript, you cannot declare a const variable without a value because variables declared with const cannot be reassigned after creation, making an uninitialized constant permanently useless.
 

### let a = []   typeof a will be Object  but we have to find a is array or not so do this  a instanceof Array  if it is then it shows true
### let b= { } b instance of Object => true 
### it works only for non Primitive values .. not for the primitive datatype
     let a= 12
     a instanceof Number => false it is not working there