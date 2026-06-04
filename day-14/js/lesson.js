(function () {
    const lines = [];
    const city = "Jaipur";
    function outer() {
        const language = "Hindi";
        function inner() {
            lines.push("Answer: lexical read → " + language + " from outer, " + city + " from global");
        }
        inner();
    }
    outer();

    lines.push("");
    function makeGreeter(name) {
        return function () {
            return "Namaste, " + name + "!";
        };
    }
    lines.push("Answer: " + makeGreeter("Priya")());
    lines.push("Answer: " + makeGreeter("Aarav")());

    document.getElementById("out").textContent = lines.join("\n");
    console.log(lines.join("\n"));
})();
