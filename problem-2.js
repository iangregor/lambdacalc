let euler2 = (
    (f) => (fp) => (fi) => (fr) => (i) => (r) => 
    f(f) (fp)(fi)(fr) (i)(r)
)
(
    (f) => (fp) => (fi) => (fr) => (i) => (r) => 
    fp(i) ? 
        f(f) (fp)(fi)(fr) (fi(i))(fr(r)(i)) : 
        r
)

/* fp */ (([n,m]) => n < 4000000)   // predicate
/* fi */ (([n,m]) => [m, m+n])  // incrementor
/* fr */ ((r) => ([n,m]) => n % 2 === 0 ? r + n : r) // accumulator

/*  i */ ([0,1]) // initial param
/*  r */ (0);    // acc init
