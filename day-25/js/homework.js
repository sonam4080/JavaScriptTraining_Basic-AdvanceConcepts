(function () {
    "use strict";
    const lines = [];

    const pipe = function () {
        const fns = [].slice.call(arguments);
        return function (x) {
            return fns.reduce(function (acc, fn) {
                return fn(acc);
            }, x);
        };
    };

    const compose = function () {
        const fns = [].slice.call(arguments);
        return function (x) {
            return fns.reduceRight(function (acc, fn) {
                return fn(acc);
            }, x);
        };
    };

    const addOne = function (x) {
        return x + 1;
    };
    const square = function (x) {
        return x * x;
    };
    const negate = function (x) {
        return -x;
    };

    lines.push("1 — compose vs pipe on 5");
    var pipe5 = pipe(addOne, square, negate)(5);
    lines.push("Answer: pipe(addOne, square, negate)(5) : " + pipe5);
    console.log(pipe5);
    var compose5 = compose(negate, square, addOne)(5);
    lines.push("Answer: compose(negate, square, addOne)(5) : " + compose5);
    console.log(compose5);

    lines.push("");
    lines.push("2 — Pure refactor: addLast impure vs pure");
    function addLastImpure(arr, item) {
        arr.push(item);
        return arr;
    }
    function addLastPure(arr, item) {
        return arr.concat([item]);
    }
    const base = [1, 2];
    const copy = [1, 2];
    addLastImpure(base, 3);
    const pureResult = addLastPure(copy, 3);
    lines.push("Answer: impure base after add : " + JSON.stringify(base));
    console.log(JSON.stringify(base));
    lines.push("Answer: pure copy unchanged : " + JSON.stringify(copy));
    console.log(JSON.stringify(copy));
    lines.push("Answer: pure result : " + JSON.stringify(pureResult));
    console.log(JSON.stringify(pureResult));

    lines.push("");
    lines.push("3 — curry(fn) for fixed arity");
    function curry(fn) {
        const arity = fn.length;
        return function curried() {
            const args = [].slice.call(arguments);
            if (args.length >= arity) {
                return fn.apply(null, args);
            }
            return function () {
                const next = args.concat([].slice.call(arguments));
                return curried.apply(null, next);
            };
        };
    }
    function add3(a, b, c) {
        return a + b + c;
    }
    const curriedAdd = curry(add3);
    var curriedSum = curriedAdd(1)(2)(3);
    lines.push("Answer: curry(add3)(1)(2)(3) : " + curriedSum);
    console.log(curriedSum);

    lines.push("");
    lines.push("4 — Average line total (same orders as lesson / doc shape)");
    const orders = [
        { id: 1, item: "Pen", price: 50, quantity: 2 },
        { id: 2, item: "Book", price: 200, quantity: 1 },
        { id: 3, item: "Bag", price: 800, quantity: 1 },
        { id: 4, item: "Mug", price: 150, quantity: 3 }
    ];
    const lineTotal = function (o) {
        return o.price * o.quantity;
    };
    const sum = function (a, b) {
        return a + b;
    };
    const averageLine = pipe(
        function (os) {
            return os.map(lineTotal);
        },
        function (totals) {
            const s = totals.reduce(sum, 0);
            return s / totals.length;
        }
    );
    var avg = averageLine(orders);
    lines.push("Answer: average line (ex GST) : " + avg);
    console.log(avg);

    lines.push("");
    lines.push("5 — Read javascript.info + Lodash/fp (browser).");

    lines.push("");
    lines.push("6 — Bonus: JSConf talk (optional).");

    document.getElementById("out").textContent = lines.join("\n");
})();
