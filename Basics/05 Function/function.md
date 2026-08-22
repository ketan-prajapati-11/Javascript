### If in the fuction if we not return the any value then function automaically return undefiend value
```javascript
    Function with no return
function hello() {
    console.log("Hello");
}


let x = hello();


console.log(x);
```

Output:

Hello
undefined

Why?

Because JavaScript automatically returns:

``` undefined```

when a function doesn't explicitly return a value.

### higher order of function (hof) where the fuction is accepting function in its parameter or it gives the return function

### pure vs impure function
    #### in the pure fuction is jo bahar ki value ko na badale
    in the impure fuction jo bahar ki value ko change kar sake

    ```javaScript 
    pure fuction
    fuction addc(){
        console.log("hii")
    }

    impure fuction
    let a =1
    function  inc(){
        a++
    }
    here a is changing in the our scope variable value

    ```

### clousers 

ek fuction jo return kare ek aur fuction, jisme return hone wala fuction mai parent fuction ka koi variable ho

fuction add(){
    let a=9
    return fuction(){
        console.log(a)
    }
}

### Lexical scope
 
    function ab(){
        let a =1
        function bdd(){
            let b =2
            fuction cdd(){
                let c= 3

                console.log(a)
                console.log(b)
                console.log(c)
            }
        }
    in the above example fuction in fuction the parent variable can be exicible but cofr is parent fuction scope is abaible b for its and inner fuction score is exisible . c - for its fuctional scope. b- for its and inner scope, a-for its scope and inner scope in it is exisible

### IIFE imidiataly invoke fuction expression
    (function(){
        console.log("hi")
    })() 
    here we dont we neet to do execution because it will do imidiatly execution own

### Hoisting in function
 abcd()

 function abcd(){
    console.log("as")
 }
 in the above example we can use that function before the creation and it will execute,,, function declairation 

 // if we create fuction with expression then we cannot use like that it gives the error
 abcd()
 let abcd = function(){
            console.log("as")
            }