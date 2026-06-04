(function () {
    const lines = [];
    lines.push("Task 1 — cart");
    const cart = ["bread", "milk", "eggs"];
    cart.push("butter");
    cart.unshift("rice");
    lines.push("Answer: after push+unshift : " + JSON.stringify(cart));
    console.log(JSON.stringify(cart));
    const removed = cart.pop();
    lines.push("Answer: popped : " + removed + ", cart : " + JSON.stringify(cart));
    console.log(removed);
    console.log(JSON.stringify(cart));
    const spliced = cart.splice(1, 1);
    lines.push("Answer: splice(1,1) removed : " + JSON.stringify(spliced) + ", cart : " + JSON.stringify(cart));
    console.log(JSON.stringify(spliced));
    console.log(JSON.stringify(cart));

    lines.push("");
    lines.push("Task 2 — scores");
    const scores = [88, 42, 75, 60, 91, 39, 55, 70];
    lines.push("Answer: filter >=60 : " + JSON.stringify(scores.filter(function (s) { return s >= 60; })));
    console.log(JSON.stringify(scores.filter(function (s) { return s >= 60; })));
    lines.push("Answer: find first fail : " + scores.find(function (s) { return s < 60; }));
    console.log(scores.find(function (s) { return s < 60; }));
    lines.push("Answer: every passing? : " + scores.every(function (s) { return s >= 60; }));
    console.log(scores.every(function (s) { return s >= 60; }));
    lines.push("Answer: some >90? : " + scores.some(function (s) { return s > 90; }));
    console.log(scores.some(function (s) { return s > 90; }));

    lines.push("");
    lines.push("Task 3 — GST map");
    const prices = [100, 250, 500, 1200, 80];
    const withGst = prices.map(function (p) { return p * 1.18; });
    lines.push("Answer: original prices : " + JSON.stringify(prices));
    console.log(JSON.stringify(prices));
    lines.push("Answer: with 18% GST : " + JSON.stringify(withGst));
    console.log(JSON.stringify(withGst));
    lines.push("Answer: bonus rounded : " + JSON.stringify(prices.map(function (p) { return Number((p * 1.18).toFixed(2)); })));
    console.log(JSON.stringify(prices.map(function (p) { return Number((p * 1.18).toFixed(2)); })));

    lines.push("");
    lines.push("Task Bonus — reduce");
    const expenses = [250, 800, 120, 50, 1500, 75];
    lines.push("Answer: total : " + expenses.reduce(function (a, x) { return a + x; }, 0));
    console.log(expenses.reduce(function (a, x) { return a + x; }, 0));
    lines.push("Answer: max : " + expenses.reduce(function (m, x) { return x > m ? x : m; }, expenses[0]));
    console.log(expenses.reduce(function (m, x) { return x > m ? x : m; }, expenses[0]));
    lines.push("Answer: sum expenses >100 : " + expenses.filter(function (x) { return x > 100; }).reduce(function (a, x) { return a + x; }, 0));
    console.log(expenses.filter(function (x) { return x > 100; }).reduce(function (a, x) { return a + x; }, 0));

    document.getElementById("out").textContent = lines.join("\n");
})();
