(function () {
    const lines = [];
    lines.push("for (let i = 0; i < 3; i++):");
    for (let i = 0; i < 3; i++) {
        lines.push("  i = " + i);
    }
    lines.push("");
    lines.push("while sum 1..4:");
    let n = 1;
    let s = 0;
    while (n <= 4) {
        s += n;
        n++;
    }
    lines.push("sum = " + s);
    lines.push("");
    lines.push("for...of over ['a','b']:");
    for (const ch of ["a", "b"]) {
        lines.push("  " + ch);
    }
    document.getElementById("out").textContent = lines.join("\n");
    console.log(lines.join("\n"));
})();
