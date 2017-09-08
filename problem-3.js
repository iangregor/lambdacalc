let euler3 = (
    (f) => (fp) => (fi) => (fr) => (i) => (r) => {
        // This is equivalent but causes a stack overflow due to no TCO in JS
        // f(f) (fp)(fi)(fr) (i)(r)
        
        // Below is an equivalent alternative to the above
        while (fp(i)) {
            i = fi(i);
            r = fr(r)(i);
        }
        return r;
    }
)
(
    (f) => (fp) => (fi) => (fr) => (i) => (r) => 
    fp(i) ? 
        f(f) (fp)(fi)(fr) (fi(i))(fr(r)(i)) : 
        r
)

/* fp */ (([n, m]) => m > 1)   // predicate
/* fi */ (([n, m]) => m % n === 0 ? [2, m/n] : [n+1, m]) // incrementor
/* fr */ ((r) => ([n, m]) => m % n === 0 ? n : r) // accumulator

/*  i */ ([2, 600851475143]) // initial param
/*  r */ (0) // acc init