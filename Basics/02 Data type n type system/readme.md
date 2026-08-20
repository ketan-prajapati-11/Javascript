### primitive datatype of copy kar sakte hai par non premitive> referances ko directly copy nahi kroge
Premitive ko directly copy kar sakte hai and non premitive ko directly copy  nahi kar sakte
 
## Datatypes 1. Primitive 2. Referance or non primitive data type
 ### primitive 
    # Number string Boolean null undefined symbol bigInt
 
 ### non primitive or referance data type
      # Araay Object Function

## Privitive
    # number 12 12.4 and more int float .. vlaue
    #string ` ` '' "" written value between that braces called string
    #null is like we intentioanlly not given assigned initialized value that that variable
    # undefiend is like we did not initailized value of that variable
    #symbol is immutable unique value
    ### Symbol is a primitive data type in JavaScript that creates a unique value. It is commonly used as a unique property key in objects to avoid naming conflicts
    ###Symbols provide unique property keys, so they help prevent accidental property-name collisions when multiple pieces of code work with the same object."
### symbol
     Symbols are hidden from normal loops

        Consider:

        const id = Symbol("id");


        const person = {
            name: "Ketan",
            age: 24,
            [id]: 101
        };

        If you do:

        for (let key in person) {
            console.log(key);
        }

        You'll get:

        name
        age

        The Symbol property isn't included in normal for...in enumeration.

        But it is still there.

        You can retrieve Symbol keys using:

        console.log(Object.getOwnPropertySymbols(person));

### Dynamic Typing
        it is not a static typing we can change the data because we have dynamic data type..
        like
        let a= 10
            a = "Ketan" 
        it shows the dynamic typing where we are changing the number into string in a single same variable



      
  
  