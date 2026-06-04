(function () {
    const lines = [];
    lines.push("Arithmetic:");
    lines.push("10 + 3 → " + (10 + 3));
    lines.push("10 % 3 → " + (10 % 3));
    lines.push("2 ** 8 → " + (2 ** 8));
    lines.push("42 % 2 === 0 → " + (42 % 2 === 0));

    let x = 10;
    x += 5;
    lines.push("x after x += 5 (start 10) → " + x);

    lines.push("");
    lines.push("Comparison:");
    lines.push('5 == "5" → ' + (5 == "5"));
    lines.push('5 === "5" → ' + (5 === "5"));
    lines.push("0 == false → " + (0 == false));
    lines.push("0 === false → " + (0 === false));
    lines.push("null == undefined → " + (null == undefined));

    lines.push("");
    lines.push("Logical:");
    lines.push("true && false → " + (true && false));
    lines.push("5 > 2 && 10 < 20 → " + (5 > 2 && 10 < 20));

    const age = 20;
    const score = 55;
    lines.push("");
    lines.push("Ternary:");
    lines.push("age >= 18 ? 'adult' : 'minor' → " + (age >= 18 ? "adult" : "minor"));
    lines.push("score >= 50 ? 'pass' : 'fail' → " + (score >= 50 ? "pass" : "fail"));

    const user = { address: { city: "Jaipur" } };
    lines.push("");
    lines.push("Optional chaining:");
    lines.push("user.address?.city → " + user.address?.city);
    let count = 0;
    lines.push("count ?? 10 → " + (count ?? 10));
    lines.push("count || 10 → " + (count || 10));

    document.getElementById("out").textContent = lines.join("\n");
    console.log(lines.join("\n"));
})();
