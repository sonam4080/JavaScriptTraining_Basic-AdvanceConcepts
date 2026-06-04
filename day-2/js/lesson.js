(function () {
    const lines = [];
    const name = "Priya";
    const age = 21;
    const score = 98.5;
    const isPassed = true;
    let city;
    const selected = null;
    const id = Symbol("id");
    const bigNumber = 9007199254740991n;

    lines.push("Seven primitives sample:");
    lines.push("values → " + [name, age, score, isPassed, city, selected, bigNumber].join(" | "));
    lines.push("");
    lines.push('typeof "Hello" → ' + typeof "Hello");
    lines.push("typeof 42 → " + typeof 42);
    lines.push("typeof true → " + typeof true);
    lines.push("typeof undefined → " + typeof undefined);
    lines.push("typeof null → " + typeof null);
    lines.push("typeof Symbol() → " + typeof Symbol());
    lines.push("typeof 1n → " + typeof 1n);
    lines.push("");
    lines.push("Coercion samples:");
    lines.push('5 + "3" → ' + (5 + "3"));
    lines.push('"10" - 4 → ' + ("10" - 4));
    lines.push("Number('42') → " + Number("42"));
    lines.push("Boolean('0') → " + Boolean("0"));

    const greeting = "  Hello, JavaScript!  ";
    lines.push("");
    lines.push("greeting.trim() → " + JSON.stringify(greeting.trim()));
    lines.push('"Hello JS".includes("JS") → ' + "Hello JS".includes("JS"));
    lines.push('"Hello".slice(0, 3) → ' + "Hello".slice(0, 3));

    document.getElementById("out").textContent = lines.join("\n");
    console.log(lines.join("\n"));
})();
