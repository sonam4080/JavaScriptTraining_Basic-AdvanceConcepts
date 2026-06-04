(function () {
    const name = "Aarav";
    const lines = [];
    lines.push(`Hello, ${name}!`);
    const [a, b, ...rest] = [1, 2, 3, 4];
    lines.push("rest: " + rest.join(","));
    const { x, y } = { x: 10, y: 20 };
    lines.push("x+y=" + (x + y));
    document.getElementById("out").textContent = lines.join("\n");
    console.log(lines.join("\n"));
})();
