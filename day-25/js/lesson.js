(function () {
    "use strict";
    const lines = [];

    lines.push("Topic 1 — Pure vs impure (examples)");
    const pureAdd = (a, b) => a + b;
    lines.push("pure add(2,3) twice → " + pureAdd(2, 3) + ", " + pureAdd(2, 3));

    lines.push("");
    lines.push("Topic 2 — Pure core: map without mutating source");
    const nums = [1, 2, 3];
    const doubled = nums.map(function (x) {
        return x * 2;
    });
    lines.push("nums unchanged → " + JSON.stringify(nums) + "; doubled → " + JSON.stringify(doubled));

    lines.push("");
    lines.push("Topic 3 — Higher-order: multiplier(factor)(x)");
    function multiplier(factor) {
        return function (x) {
            return x * factor;
        };
    }
    const double = multiplier(2);
    lines.push("double(6) → " + double(6));

    lines.push("");
    lines.push("Topic 4 — pipe (left-to-right)");
    const pipe =
        function () {
            const fns = [].slice.call(arguments);
            return function (x) {
                return fns.reduce(function (acc, fn) {
                    return fn(acc);
                }, x);
            };
        };
    const trim = function (s) {
        return s.trim();
    };
    const lower = function (s) {
        return s.toLowerCase();
    };
    const splitWs = function (s) {
        return s.split(/\s+/);
    };
    const wc = function (arr) {
        return arr.length;
    };
    const countWords = pipe(trim, lower, splitWs, wc);
    lines.push('countWords("  Hello World from Jaipur  ") → ' + countWords("  Hello World from Jaipur  "));

    lines.push("");
    lines.push("Topic 5 — Currying: tax(rate)(price)");
    const tax = function (rate) {
        return function (price) {
            return price * (1 + rate / 100);
        };
    };
    const withGST = tax(18);
    lines.push("withGST(1000) → " + withGST(1000));

    lines.push("");
    lines.push("Topic 6 — Partial with bind");
    function greet(greeting, time, name) {
        return greeting + " " + time + ", " + name + "!";
    }
    const sayMorning = greet.bind(null, "Good", "morning");
    lines.push(sayMorning("Priya"));

    lines.push("");
    lines.push("Topic 7 — Order totals pipeline (mini)");
    const orders = [
        { price: 50, quantity: 2 },
        { price: 200, quantity: 1 }
    ];
    const lineTotal = function (o) {
        return o.price * o.quantity;
    };
    const sum = function (a, b) {
        return a + b;
    };
    const grand = pipe(
        function (os) {
            return os.map(lineTotal);
        },
        function (totals) {
            return totals.reduce(sum, 0);
        }
    );
    lines.push("grand pre-tax line totals → " + grand(orders));

    document.getElementById("out").textContent = lines.join("\n");
    console.log(lines.join("\n"));
})();
