(function () {
    "use strict";

    var lines = [];

    lines.push("Task 1 — pure vs impure");
    lines.push("Answer: (a,b)=>a+b : PURE");
    console.log("PURE");
    lines.push("Answer: ()=>Date.now() : IMPURE (non-deterministic)");
    console.log("IMPURE");
    lines.push("Answer: (arr)=>arr.sort() : IMPURE (mutates input)");
    console.log("IMPURE");
    lines.push("Answer: (arr)=>[...arr].sort() : PURE (no input mutation)");
    console.log("PURE");
    lines.push("Answer: (x)=>{ console.log(x); return x; } : IMPURE (side effect)");
    console.log("IMPURE");

    function pipe() {
        var fns = Array.prototype.slice.call(arguments);
        return function (x) {
            return fns.reduce(function (acc, fn) {
                return fn(acc);
            }, x);
        };
    }

    var addOne = function (x) {
        return x + 1;
    };
    var square = function (x) {
        return x * x;
    };
    var negate = function (x) {
        return -x;
    };

    lines.push("");
    lines.push("Task 2 — pipe(addOne, square, negate)(5)");
    var piped = pipe(addOne, square, negate)(5);
    lines.push("Answer: result : " + piped);
    console.log(piped);

    var volume = function (l) {
        return function (w) {
            return function (h) {
                return l * w * h;
            };
        };
    };
    var lengthOf5 = volume(5);
    var lengthOf5width3 = lengthOf5(3);
    var vol = lengthOf5width3(2);

    lines.push("");
    lines.push("Task 3 — volume(5)(3)(2) via partial application");
    lines.push("Answer: volume(5)(3)(2) : " + vol);
    console.log(vol);

    var users = [
        { name: "priya", age: 25 },
        { name: "aarav", age: 17 },
        { name: "riya", age: 30 }
    ];

    var adults = function (list) {
        return list.filter(function (u) {
            return u.age >= 18;
        });
    };
    var capitaliseNames = function (list) {
        return list.map(function (u) {
            return {
                name: u.name.charAt(0).toUpperCase() + u.name.slice(1).toLowerCase(),
                age: u.age
            };
        });
    };
    var sortByAgeDesc = function (list) {
        return list.slice().sort(function (a, b) {
            return b.age - a.age;
        });
    };
    var pluckNames = function (list) {
        return list.map(function (u) {
            return u.name;
        });
    };

    lines.push("");
    lines.push("Bonus — pipe(users → adults → cap names → sort age desc → names)");
    var names = pipe(adults, capitaliseNames, sortByAgeDesc, pluckNames)(users);
    var namesJson = JSON.stringify(names);
    lines.push("Answer: names : " + namesJson);
    console.log(namesJson);

    document.getElementById("out").textContent = lines.join("\n");
})();
