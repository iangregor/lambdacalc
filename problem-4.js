let euler4 = (
    (
        (fix) => (pipe) => (pair) => (fst) => (snd) => (not) =>
        (
            (pipeline) => (intToList) => (reverse) => (listsEqual) => (copyF) =>
            (
                (notPalindromic) => (walkDown) =>
                // generic iterator without accumulator
                // fp is our predicate to end the loop, fi increments the i value. i is our counter and output
                (max) =>
                    fix (
                        (f) => (fp) => (fi) => (i) => 
                        fp(i) ? f(f) (fp)(fi) (fi(i)) : fst(i)*snd(i)
                    )
                    /* fp: */ 
                    (notPalindromic)
                    /* fi */ 
                    (walkDown(max))
                    /*  i */ 
                    (pair(max)(max))
            )
            /* notPalindromic */
            (
                pipeline(5)
                    ((i) => fst(i)*snd(i))
                    (intToList)    
                    (copyF(reverse))                    
                    (listsEqual)
                    (not)    
                    
            )
            /* walk down */
            (
                // E.g., walk down from 999*999 through the factors in a breadth first motion.
                // This is a naive walk as it will do both 999*998 and 998*999
                (u) => (i) => 
                snd(i) > u ? 
                    pair(u) (fst(i)-1) : 
                    pair(fst(i)-1) (snd(i)+1)
            )
        )
        /* composer: takes n functions and returns them composed */
        (
            fix(
                (f) => (n) => (g) => 
                    n > 1 ? 
                    (h) => ( f(f) (n-1) (pipe(g)(h)) ) : 
                    (x) => (g(x)) 
            )
        )
        // intToList.
        (
            fix (
                (f) => (acc) => (n) => 
                n > 0 ? f(f) (pair(acc)(n % 10)) (n/10|0) : acc
            )
            (undefined)
        )
        // reverse: just pop a stack onto another stack until empty
        (
            fix (
                (f) => (acc) => (xs) => 
                xs !== undefined ? 
                    f(f) ((pair)(acc)(snd(xs))) (fst(xs)) : 
                    acc
            )
            // undefined is our empty list value
            (undefined)
        )
        // listsEqual: compares elements in two flat lists.
        (
            // roll fp, fi into f because it's short.
            fix (
                (f) => (ns) =>
                (
                    (xs) => (ys) => 
                    xs === undefined && ys === undefined ? true :
                    snd(xs) === snd(ys) ? f(f) (pair(fst(xs))(fst(ys))) : 
                    false
                )
                (fst(ns)) //xs
                (snd(ns)) //ys
            )
        )
        // copyF: 
        ((f) => (x) => pair(x)(f(x)))
    )
    // You don't need to explicitly list every param to bootstrap recursion... 
    // you can just "fix" the function and the currying will take care of it.
    /* fix */
    ((f) => f(f) )
    /* pipe: */
    ((f) => (g) => (x) => g(f(x)))
    // I felt that using arrays and array destructuring was kinda cheating...
    // so here are the building blocks of lists and trees.
    // Using undefined as {} or "empty list"
    /* pair: can create a list or tree. E.g., [[[{},1],2],3] is [1,2,3] */
    ((x) => (y) => (f) => (f)(x)(y) )
    /* first: get the first element of the tuple where the rest of the array is stored */
    ((p) => p((x) => (y) => x) )
    /* second: get the second element where the value is stored */
    ((p) => p((x) => (y) => y) )
    /* not */
    ((x) => !x)
)
// We want two 3 digit numbers, so we set max to be the biggest 3 digit number
(999)


// ---------------------------------------------------------------