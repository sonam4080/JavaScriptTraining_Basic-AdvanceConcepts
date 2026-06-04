(function () {
    const lines = [];
    function add(a, b) {
        return a + b;
    }
    const mul = function (a, b) {
        return a * b;
    };
    const sub = (a, b) => a - b;
    lines.push("add(2,3) = " + add(2, 3));
    lines.push("mul(4,5) = " + mul(4, 5));
    lines.push("sub(10,4) = " + sub(10, 4));
    document.getElementById("out").textContent = lines.join("\n");
    console.log(lines.join("\n"));
})();
