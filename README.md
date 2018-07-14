lambdacalc
===

A very casual repo that contains completed [Project Euler](https://projecteuler.net/archives) problems completed using a [Lambda Calculus](https://en.wikipedia.org/wiki/Lambda_calculus) approach in JavaScript.

## Scope and Limits

This is a for-fun project that I started to get a bit of a better grasp on Lambda Calculus and patterns within Lambda Calculus. It doesn't go completely off the deep end by implementing Church numerals, but all functions and data structures should be implemented as functions.

### What I didn't implement as functions

- Primitive types: bools (`true`), numbers (`0 1 2 3`)
- Equality: `===`
- Basic numeric ops: `+`,`-`,`*`,`/`,`%`, etc
- Comparison: `<`, `>`, etc
- Boolean: `||`, `&&`

# It's functions all the way down / Arriving at [Euler 1](https://github.com/iangregor/lambdacalc/blob/master/problem-1.js)

Euler 1 starts with the following problem:

> If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.
>
> Find the sum of all the multiples of 3 or 5 below 1000.

Imperatively, this could look like

```javascript
function euler1() {
  let sum = 0;
  for (let i = 0; i < 1000; i++) {
    if (i % 3 === 0 || i % 5 === 0) {
      sum += i;
    }
  }
  return sum;
}
```

If we took a more functional approach to this...

```javascript
function euler1() {
  return Array(1000).fill()
  .map((x,i) => i)
  .filter((x) => x % 3 === 0 || x % 5 === 0)
  .reduce((acc, x) => acc + x)
}
```

but this puts a large focus on Arrays and Array ops. Since we want to do things simply, we could take another step and use a recursive function instead of basing everything on an Array.

We can model the recursive function off the reduce function which takes an `acc`umulator and a value `x`. We need to embed the `0..1000` loop logic in the function too. E.g., `i < 1000` - run / recurse, otherwise return accumulator.

```javascript
function euler1(acc, x) {
  if (x < 1000) {
    if (x % 3 === 0 || x % 5 === 0) {
      return euler1(acc + x, x + 1);
    } else {
      return euler1(acc, x + 1);
    }
  } else {
    return acc;
  }
}
// we need to call this with default values...
euler1(0,0);
```

No Array! We do have a few problems left though. 

- The recursive function is back to a very imperative style - let's change it to expressions
- It's not a lambda. It's not anonymous!
- We're calling euler1 inside itself. If we go anonymous, we need a fix for that.

First, let's quickly move to ES6 lambda/arrow function syntax now and use expressions.

```javascript
let euler1 = (acc, x) => (
  x < 1000 ? (
    x % 3 === 0 || x % 5 === 0 ?
      euler1(acc + x, x + 1) :
      euler1(acc, x + 1)
  ) : (
    acc
  )
)
// default values
euler1(0,0)
```

We've declared euler1 as a function and we reference it in the function. Since lambda calculus is all about anonymous functions, how do we do recursion without that declaration?

### We [`fix`](https://en.wikipedia.org/wiki/Fixed-point_combinator) **Y**t...

[I'm hilarious]: http://

First, lets take our function as a callback

```javascript
let euler1 = (callback, acc, x) => (
  x < 1000 ? (
    x % 3 === 0 || x % 5 === 0 ?
      callback(callback, acc + x, x + 1) :
      callback(callback, acc, x + 1)
  ) : (
    acc
  )
)
euler1(euler1, 0, 0);
```

Now `euler1` doesn't rely on its own declaration, but calling it does, so since everything is functions, let's write a function that calls a `euler1` passed to itself with its arguments. 

```javascript
// Looking at the signature of euler1, we need 3 arguments.
let euler1 = (callback, acc, x) => (/*etc*/)
// We want our function to look like how we call it inside euler1 earlier, e.g.,
callback(callback, acc, x + 1)
// which gives
let euler1Fix = (callback, acc, x) => callback(callback, acc, x)
// and is used as follows
euler1Fix(euler1, 0, 0)
```

This can be a bit confusing at first, but what we've done is, 

- We've recognised that euler1 takes a callback
- We know that callback is itself
- We wrote a function that takes a function and calls it, using that function as a callback.

Since we've extracted that into a function, we can apply it to any function that takes two arguments. E.g.,

```javascript
let deepIncludes = (callback, array, value) => (
  array.includes(value) ? 
    true :
    array.filter((item) => item instanceof Array).some((sub) => callback(callback, sub, value))
);
let twoArgFix = euler1Fix;
twoArgFix(deepIncludes,[1,[2,[3]]], 4) // > false
twoArgFix(deepIncludes,[1,[2,[3]]], 3) // > true
```
But it doesn't work with any function that takes more than two arguments. We could attempt to use partial application, 

```javascript
let partialFix = (callback) => callback.bind(null, callback)
partialFix(deepIncludes)([1,[2,[3]]], 3)
```

but since we are aiming for Lamda Calculus, we want to avoid multiple parameter functions. And by using single parameter functions, even though the syntax is a little different, we get [currying](https://en.wikipedia.org/wiki/Currying) and partial application for free! So let's change those parameters in euler1

```javascript
let euler1 = (callback) => (acc) => (x) => (
  x < 1000 ? (
    x % 3 === 0 || x % 5 === 0 ?
      callback(callback)(acc + x)(x + 1) :
      callback(callback)(acc)(x + 1)
  ) : (
    acc
  )
)
```

and now since we're getting partial application for free, we don't need to call bind in our fix function.

```javascript
let fix = (callback) => callback(callback);
// params are passed as function calls individually now
fix(euler1)(0)(0)
```

*Confession: This whole `fix = (f) => f(f)` thing didn't really click until after the 3rd or 4th problem and staring at that [fix wiki page](https://en.wikipedia.org/wiki/Fixed-point_combinator) for a long time*

### Okay cool, but we're still declaring stuff.

Well, let's turn everything into lambdas and expressions then. Since this is a pretty simple program, we could just put everything in place, as-is.

```javascript
// fix
((callback) => callback(callback))
(  // euler1
  (callback) => (acc) => (x) => (
    x < 1000 ? (
      x % 3 === 0 || x % 5 === 0 ?
        callback(callback)(acc + x)(x + 1) :
        callback(callback)(acc)(x + 1)
    ) : (
      acc
    )
  )
)
(0) // arg[0]
(0) // arg[1]
```

this is already hard to follow, but this would get even worse if we had multiple functions and multiple call sites for functions. 

We know that `euler1` relies on `fix`, so if we scope that out by passing fix to as an argument.

```javascript
((fix) => fix(
  (callback) => (acc) => (x) => (
    x < 1000 ? (
      x % 3 === 0 || x % 5 === 0 ?
        callback(callback)(acc + x)(x + 1) :
        callback(callback)(acc)(x + 1)
    ) : (
      acc
    )
  )
))
(callback => callback(callback))
(0)(0)
```

We can continue this pattern to get...

```javascript
(
  (fix) => (euler1) => fix(euler1)
)
(/* fix def */)
(/* euler1 def*/)
(0)(0)
```

Which separates our definitions out from the application.

### How come this doesn't look like the contents of [problem-1.js](https://github.com/iangregor/lambdacalc/blob/master/problem-1.js)?

Firstly, that code doesn't use fix properly. You get fix argument passing for free with single param functions but I didn't quite figure that out when I wrote problem-1.js.

Secondly, I started by implementing a generic recursive looping reducer which takes all of the body functions it needs as parameters so that they could easily be declared outside of the application of the loop.

Combining how it exists in the repo and the pattern we've just established, we get

```javascript
let euler1 = (
  (fix) => (predicate) => (incrementor) => (accumulator) => (
    fix((loop) => (i) => (r) => (
      predicate(i) ? loop(loop) (incrementor(i)) (accumulator(r)(i)) : r
    ))
  )
)
// fix
((callback) => callback(callback))
// loop functions
((n) => n < 1000)
((n) => n + 1)
((r) => (n) => n % 3 === 0 || n % 5 === 0 ? r + n : r)
// initial params
(0)(0)
```
