(function () {
    const lines = [];

    function safeDivide(a, b) {
        if (b === 0) {
            throw new Error("Division by zero");
        }
        return a / b;
    }
    lines.push("Task 1 — safeDivide");
    [function () {
        return safeDivide(10, 2);
    }, function () {
        return safeDivide(3, 0);
    }].forEach(function (fn, i) {
        try {
            const v = fn();
            lines.push("Answer: call " + i + " : " + v);
            console.log(v);
        } catch (e) {
            lines.push("Answer: call " + i + " : caught: " + e.message);
            console.log(e.message);
        }
    });

    lines.push("");
    lines.push("Task 2 — NotFoundError");
    class NotFoundError extends Error {
        constructor(message) {
            super(message);
            this.name = "NotFoundError";
        }
    }
    function getUserById(id) {
        if (id === 1 || id === 2 || id === 3) {
            return { id: id, name: "user" + id };
        }
        throw new NotFoundError("User " + id + " not found");
    }
    try {
        const u2 = getUserById(2);
        lines.push("Answer: getUserById(2) : " + JSON.stringify(u2));
        console.log(JSON.stringify(u2));
        getUserById(99);
    } catch (err) {
        if (err instanceof NotFoundError) {
            lines.push("Answer: getUserById(99) : " + err.name + ": " + err.message);
            console.log(err.name + ": " + err.message);
        } else {
            lines.push("Answer: " + err.message);
            console.log(err.message);
        }
    }

    lines.push("");
    lines.push("Task 3 — calculator namespace");
    const calc = {
        add: function (a, b) {
            return a + b;
        },
        subtract: function (a, b) {
            return a - b;
        },
        multiply: function (a, b) {
            return a * b;
        },
        divide: function (a, b) {
            return safeDivide(a, b);
        },
        calculate: function (op, a, b) {
            switch (op) {
                case "add":
                    return this.add(a, b);
                case "subtract":
                    return this.subtract(a, b);
                case "multiply":
                    return this.multiply(a, b);
                case "divide":
                    return this.divide(a, b);
                default:
                    throw new Error("Unknown op");
            }
        }
    };
    lines.push("Answer: calc.add(5,3) : " + calc.add(5, 3));
    console.log(calc.add(5, 3));
    lines.push("Answer: calc.calculate('multiply',4,5) : " + calc.calculate("multiply", 4, 5));
    console.log(calc.calculate("multiply", 4, 5));
    lines.push("Answer: split into calc.js + import would mirror this object in real modules.");

    document.getElementById("out").textContent = lines.join("\n");
})();
