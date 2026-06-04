(function () {
    const lines = [];
    lines.push("Task 1 — squares 1..8");
    for (let i = 1; i <= 8; i++) {
        const sq = i * i;
        lines.push("Answer: " + i + "² = " + sq);
        console.log(sq);
    }
    lines.push("");
    lines.push("Task 2 — countdown 5..1");
    let x = 5;
    const ticks = [];
    while (x > 0) {
        ticks.push(x);
        x--;
    }
    lines.push("Answer: sequence : " + ticks.join(", "));
    console.log(ticks.join(", "));
    document.getElementById("out").textContent = lines.join("\n");
})();
