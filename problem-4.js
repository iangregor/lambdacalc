let euler4 = (
    (pair) => (fst) => (snd) => 
    (    
        // bootstrap our generic iterator function to allow recursion
        ( (f) => (fp) => (fi) => (i) => f(f) (fp)(fi) (i) )
        // generic iterator without accumulator
        // fp is our predicate to end the loop, fi increments the i value. i is our counter and output
        (
            (f) => (fp) => (fi) => (i) => 
            fp(i) ? f(f) (fp)(fi) (fi(i)) : i
        )
        /* fp: false if n*m is palindromic */ 
        (
            (i) => (
                ((f0) => (f1) => (f2) => (f3) => (x) => f0(f1(f2(f3(x)))))
                // f0: not
                ((x) => !x)
                // f1: arrays equal?
                (
                    // roll fp, fi into f because it's short.
                    ((f) => (ns) => f(f) (ns))
                    (
                        (f) => (ns) =>
                        (
                            (xs) => (ys) => 
                            xs === undefined && ys === undefined ? true :
                            snd(xs) === snd(ys) ? f(f) (pair(fst(xs))(fst(ys))) : 
                            false
                        )
                        (fst(ns))
                        (snd(ns))
                    )
                )
                // f2: reverse a copy and provide both
                (
                    ((f) => (x) => pair(x)(f(x)))
                    (
                        // reverse: just pop a stack onto another stack until empty
                        ((f) => (acc) => (xs) => f(f) (xs) (acc))
                        (
                            (f) => (xs) => (acc) => 
                            xs !== undefined ? 
                                f(f) (fst(xs)) ((pair)(acc)(snd(xs))) : 
                                acc
                        )
                        // undefined is our empty list value
                        (undefined)
                    )
                )
                // f3: int to array by push mod 10, divint 10, repeat.
                (
                    // Swap (acc) and (n) to let f3 be point-free
                    // e.g., point-free: f vs non: (x) => f(x)
                    ((f) => (acc) => (n) => f(f) (n) (acc))
                    (
                        (f) => (n) => (acc) => 
                        n > 0 ? f(f) (n/10|0) (pair(acc)(n % 10)) : acc
                    )
                    (undefined)
                )
                // x
                (fst(i)*snd(i))
            )
        )
        /* fi */ 
        (
            (
                // walk down from 999*999 through the factors in a breadth first motion.
                // This is a naive walk as it will do both 999*998 and 998*999
                (u) => (i) => 
                snd(i) + 1 > u ? 
                    pair(u) (fst(i)-1) : 
                    pair(fst(i)-1) (snd(i)+1)
            )
            (1000)
        )
        /*  i */ 
        (pair(999)(999))
    )
)
// I felt that using arrays and array destructuring was kinda cheating...
// so here are the building blocks of lists and trees.
// Using undefined as {} or "empty list"
// pair: can create a list or tree. E.g., [[[{},1],2],3] is [1,2,3]
((x) => (y) => (f) => (f)(x)(y) )
// first: get the first element of the tuple where the rest of the array is stored
((p) => p((x) => (y) => x) )
// second: get the second element where the value is stored
((p) => p((x) => (y) => y) )



// ---------------------------------------------------------------