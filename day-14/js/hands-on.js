(function () {
    const lines = [];

    lines.push("Task 1 — makeCounter from 1, two instances");
    function makeCounter() {
        let n = 0;
        return function () {
            n += 1;
            return n;
        };
    }
    const c1 = makeCounter();
    const c2 = makeCounter();
    const c1t = [c1(), c1(), c1()];
    lines.push("Answer: c1() three times : " + c1t.join(", "));
    console.log(c1t.join(", "));
    const c2t = [c2(), c2()];
    lines.push("Answer: c2() two times : " + c2t.join(", ") + " (two independent closures).");
    console.log(c2t.join(", "));

    lines.push("");
    lines.push("Task 2 — var-in-loop (same idea as setTimeout)");
    const varFuncs = [];
    for (var iv = 1; iv <= 3; iv++) {
        varFuncs.push(function () {
            return iv;
        });
    }
    const varOut = varFuncs.map(function (f) {
        return f();
    }).join(", ");
    lines.push(
        "Answer: var — one shared iv; after loop iv is 4, so each callback reads 4 : " + varOut
    );
    console.log(varOut);
    const letFuncs = [];
    for (let il = 1; il <= 3; il++) {
        letFuncs.push(function () {
            return il;
        });
    }
    const letOut = letFuncs.map(function (f) {
        return f();
    }).join(", ");
    lines.push(
        "Answer: let — fresh il per iteration : " + letOut
    );
    console.log(letOut);
    lines.push("Answer: with setTimeout, var logs 4,4,4 and let logs 1,2,3 (same reason).");

    lines.push("");
    lines.push("Task 3 — private balance");
    function createAccount(initial) {
        let balance = initial;
        return {
            deposit: function (amount) {
                balance += amount;
                return balance;
            },
            withdraw: function (amount) {
                balance -= amount;
                return balance;
            },
            getBalance: function () {
                return balance;
            }
        };
    }
    const acc = createAccount(1000);
    acc.deposit(500);
    acc.withdraw(200);
    lines.push("Answer: getBalance() after 1000 +500 -200 : " + acc.getBalance());
    console.log(acc.getBalance());
    lines.push("Answer: acc.balance is " + acc.balance + " (undefined — private in closure).");
    console.log(acc.balance);

    lines.push("");
    lines.push("Task Bonus — memoize");
    function memoize(fn) {
        const cache = {};
        return function (n) {
            if (Object.prototype.hasOwnProperty.call(cache, n)) {
                return cache[n];
            }
            cache[n] = fn(n);
            return cache[n];
        };
    }
    const logLines = [];
    function expensiveSquare(n) {
        logLines.push("computing...");
        return n * n;
    }
    const fast = memoize(expensiveSquare);
    const f5a = fast(5);
    const f5b = fast(5);
    const f10 = fast(10);
    const f5c = fast(5);
    lines.push("Answer: fast(5) : " + f5a);
    console.log(f5a);
    lines.push("Answer: fast(5) again : " + f5b);
    console.log(f5b);
    lines.push("Answer: fast(10) : " + f10);
    console.log(f10);
    lines.push("Answer: fast(5) again : " + f5c);
    console.log(f5c);
    lines.push('Answer: "computing..." appears twice (keys 5 and 10); cache lives in memoize closure.');
    lines.push("Answer: computing log array : " + JSON.stringify(logLines));
    console.log(JSON.stringify(logLines));

    document.getElementById("out").textContent = lines.join("\n");
})();
