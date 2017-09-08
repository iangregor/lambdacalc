let intToArray = 
((f) => (acc) => (n) => f(f) (n) (acc))
(
	(f) => (n) => (acc) => 
	n > 0 ? 
		f(f)(n/10>>>0)([n % 10, ...acc]) : 
		acc
)
([]);

let reverse = 
((f) => (acc) => (xs) => f(f) (xs) (acc))
(
	(f) => ([a, ...b]) => (acc) => 
	a === undefined ? 
		f(f) (b)([a, ...acc]) : 
		acc
)
([]);

let arrayEqual =
((f) => (ns) => f(f) (ns))
(
    (f) => ([[x,...xs],[y,...ys]]) =>
    x === undefined && y === undefined ? true :
    x===y ? f(f) ([xs,ys]) : 
    false
);

let compose = (f) => (g) => (h) => (x) => f(g(h(x)))

let euler4 = 
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
    ([n, m]) => (
        ((f0) => (f1) => (f2) => (f3) => (x) => f0(f1(f2(f3(x)))))
        // f0: not
        ((x) => !x)
        // f1: arrays equal?
        (
            // roll fp, fi into f because it's short.
            ((f) => (ns) => f(f) (ns))
            (
                (f) => ([[x, ...xs],[y, ...ys]]) =>
                x === undefined && y === undefined ? true :
                x === y ? f(f) ([xs,ys]) : 
                false
            )
        )
        // f2: reverse a copy and provide both
        (
            ((f) => (x) => [x, f(x)])
            (
                ((f) => (acc) => (xs) => f(f) (xs) (acc))
                (
                    (f) => ([a, ...b]) => (acc) => 
                    a !== undefined ? 
                        f(f) (b)([a, ...acc]) : 
                        acc
                )
                ([])
            )
        )
        // f3: int to array by push mod 10, divint 10, repeat.
        (
            // Swap (acc) and (n) to let f3 be point-free
            // e.g., point-free: f vs non: (x) => f(x)
            ((f) => (acc) => (n) => f(f) (n) (acc))
            (
                (f) => (n) => (acc) => 
                n > 0 ? f(f)(n/10|0)([n % 10, ...acc]) : acc
            )
            ([])
        )
        // x
        (n*m)
    )
)
/* fi */ 
(
    (
        (u) => ([m,n]) => 
        n + 1 > u ? [u, m-1] : [m-1, n+1]
    )
    (1000)
)
/*  i */ 
([999, 999])

// ---------------------------------------------------------------

