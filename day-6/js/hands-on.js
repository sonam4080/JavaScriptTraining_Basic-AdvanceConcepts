(function () {
    const lines = [];
    function area(length, width) {
        return length * width;
    }
    const areaArrow = (length, width) => length * width;
    lines.push("Task 1 — rectangle area");
    lines.push("Answer: area(5,3) : " + area(5, 3));
    console.log(area(5, 3));
    lines.push("Answer: area(10,4) : " + area(10, 4));
    console.log(area(10, 4));
    lines.push("Answer: area(7,7) : " + area(7, 7));
    console.log(area(7, 7));
    lines.push("Answer: bonus areaArrow(8,6) : " + areaArrow(8, 6));
    console.log(areaArrow(8, 6));

    lines.push("");
    const greet = (name = "Guest") => "Hello, " + name + "!";
    lines.push("Task 2 — greet with default");
    lines.push('Answer: greet("Priya") : ' + greet("Priya"));
    console.log(greet("Priya"));
    lines.push('Answer: greet("Aarav") : ' + greet("Aarav"));
    console.log(greet("Aarav"));
    lines.push("Answer: greet() : " + greet());
    console.log(greet());
    lines.push("Answer: greet(null) : " + greet(null) + " (default only for undefined).");
    console.log(greet(null));

    lines.push("");
    const cToF = (c) => (c * 9) / 5 + 32;
    lines.push("Task 3 — Celsius to Fahrenheit");
    [0, 100, 37, 45].forEach(function (c) {
        const f = cToF(c);
        lines.push("Answer: " + c + "°C : " + f + "°F");
        console.log(f);
    });

    lines.push("");
    lines.push("Task Bonus — pure vs impure");
    function double(n) {
        return n * 2;
    }
    let total = 0;
    function addToTotal(n) {
        total += n;
        return total;
    }
    const d3 = [double(3), double(3), double(3)];
    lines.push("Answer: double(3) x3 : " + d3.join(", "));
    console.log(d3.join(", "));
    total = 0;
    const a3 = [addToTotal(3), addToTotal(3), addToTotal(3)];
    lines.push("Answer: addToTotal(3) x3 : " + a3.join(", "));
    console.log(a3.join(", "));

    document.getElementById("out").textContent = lines.join("\n");
})();
