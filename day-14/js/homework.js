(function () {
    const lines = [];

    lines.push("Question 1 — multiplier(factor)");
    function multiplier(factor) {
        return function (x) {
            return x * factor;
        };
    }
    const double = multiplier(2);
    const triple = multiplier(3);
    lines.push("Answer: double(5) : " + double(5) + ", triple(5) : " + triple(5));
    console.log(double(5));
    console.log(triple(5));

    lines.push("");
    lines.push("Question 2 — for...of [10,20,30] with let + timeout pattern");
    lines.push("Answer: with let, each iteration binds its own value : timeouts log 10, 20, 30 (not three copies of the final value).");

    lines.push("");
    lines.push("Question 3 — transactionCount");
    function createAccount(initial) {
        let balance = initial;
        let transactionCount = 0;
        return {
            deposit: function (a) {
                transactionCount += 1;
                balance += a;
                return balance;
            },
            withdraw: function (a) {
                transactionCount += 1;
                balance -= a;
                return balance;
            },
            getBalance: function () {
                return balance;
            },
            getTransactionCount: function () {
                return transactionCount;
            }
        };
    }
    const a2 = createAccount(100);
    a2.deposit(10);
    a2.withdraw(5);
    lines.push("Answer: getBalance : " + a2.getBalance() + ", getTransactionCount : " + a2.getTransactionCount());
    console.log(a2.getBalance());
    console.log(a2.getTransactionCount());

    lines.push("");
    lines.push("Question 4 — once(fn)");
    function once(fn) {
        let done = false;
        let saved;
        return function () {
            if (!done) {
                saved = fn.apply(null, arguments);
                done = true;
            }
            return saved;
        };
    }
    let calls = 0;
    const greetOnce = once(function () {
        calls += 1;
        return "hi";
    });
    const g1 = greetOnce();
    const g2 = greetOnce();
    lines.push("Answer: first call : " + g1 + ", second call : " + g2 + ", fn ran times : " + calls);
    console.log(g1);
    console.log(g2);
    console.log(calls);

    document.getElementById("out").textContent = lines.join("\n");
})();
