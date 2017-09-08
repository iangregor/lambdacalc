let euler1 = (
    (f) => (fp) => (fi) => (fr) => (i) => (r) => 
    f(f) (fp)(fi)(fr) (i)(r)
)
(
    (f) => (fp) => (fi) => (fr) => (i) => (r) => 
    fp(i) ? 
        f(f) (fp)(fi)(fr) (fi(i))(fr(r)(i)) : 
        r
)

/* fp */ ((n) => n < 1000)   // predicate
/* fi */ ((n) => n + 1)  // incrementor
/* fr */ ((r) => (n) => n % 3 === 0 || n % 5 === 0 ? r + n : r) // accumulator

/*  i */ (0) // initial param
/*  r */ (0);    // acc init
