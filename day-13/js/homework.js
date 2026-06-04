(function () {
    const lines = [];

    lines.push("Question 1 — typeof age before var age = 25");
    (function () {
        lines.push('Answer: typeof age : "' + typeof age + '" (binding exists but value is undefined).');
        console.log(typeof age);
        var age = 25;
        lines.push("Answer: after var age = 25, age : " + age);
        console.log(age);
    })();

    lines.push("");
    lines.push("Question 2 — let TDZ");
    try {
        new Function("console.log(noLetYet); let noLetYet = 1;")();
    } catch (e) {
        lines.push("Answer: " + e.name + " — " + e.message);
        console.log(e.name);
        console.log(e.message);
    }

    lines.push("");
    lines.push("Question 3 — three function forms, call before line");
    lines.push(
        "Answer: function declaration — callable before line (hoisted). var function expression — TypeError if called before assignment. const arrow — ReferenceError (TDZ) if called before line."
    );
    (function () {
        const s = sum(1, 2);
        lines.push("Answer: declaration demo sum(1,2) before line : " + s);
        console.log(s);
        function sum(a, b) {
            return a + b;
        }
    })();
    (function () {
        try {
            lines.push("Answer: var expr " + bad(1));
        } catch (e) {
            lines.push("Answer: var expr before line : " + e.name);
            console.log(e.name);
        }
        var bad = function (x) {
            return x;
        };
        lines.push("Answer: var expr after line : " + bad(2));
        console.log(bad(2));
    })();
    (function () {
        try {
            lines.push("Answer: const arrow " + arrow(1));
        } catch (e) {
            lines.push("Answer: const arrow before line : " + e.name);
            console.log(e.name);
        }
        const arrow = (x) => x + 10;
        lines.push("Answer: const arrow after line : " + arrow(1));
        console.log(arrow(1));
    })();

    lines.push("");
    lines.push("Question 4 — console.trace (open DevTools Console)");
    (function traceDemo() {
        function inner() {
            console.trace("Answer: stack trace from inner()");
        }
        inner();
    })();

    document.getElementById("out").textContent = lines.join("\n");
})();
