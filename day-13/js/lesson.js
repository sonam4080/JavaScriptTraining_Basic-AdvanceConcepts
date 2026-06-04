(function () {
    const lines = [];
    lines.push("Demo: nested scopes");
    const city = "Jaipur";
    function outer() {
        const language = "Hindi";
        function inner() {
            const greeting = "Namaste";
            lines.push("Answer: inner reads → " + greeting + " " + language + " " + city);
        }
        inner();
    }
    outer();

    lines.push("");
    lines.push("Demo: printSquare(5)");
    function multiply(a, b) {
        return a * b;
    }
    function square(n) {
        return multiply(n, n);
    }
    function printSquare(n) {
        lines.push("Answer: square(" + n + ") → " + square(n));
    }
    printSquare(5);

    lines.push("");
    lines.push("Answer: Hoisting reminder — var is undefined before line; let/const throw in TDZ until initialized.");

    document.getElementById("out").textContent = lines.join("\n");
    console.log(lines.join("\n"));
})();
