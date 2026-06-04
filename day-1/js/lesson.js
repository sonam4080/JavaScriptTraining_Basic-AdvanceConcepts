(function () {
    const lines = [];
    const push = function (label, value) {
        lines.push(label + String(value));
    };

    console.log("Hello JS!");
    push("console.log string → ", "Hello JS!");

    const name = "Priya";
    let score = 0;
    score = 10;
    push("const name → ", name);
    push("let score after +=10 style assign → ", score);

    const tax = 0.18;
    push("const tax (GST) → ", tax);

    lines.push("");
    lines.push("camelCase example: firstName, totalScore");
    document.getElementById("out").textContent = lines.join("\n");
})();
