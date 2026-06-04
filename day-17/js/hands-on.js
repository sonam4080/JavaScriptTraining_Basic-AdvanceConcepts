(function () {
    "use strict";
    const lines = [];

    lines.push("Task 1 — Rectangle");
    class Rectangle {
        constructor(width, height) {
            this.width = width;
            this.height = height;
        }
        get area() {
            return this.width * this.height;
        }
        scale(factor) {
            this.width *= factor;
            this.height *= factor;
        }
    }
    const r = new Rectangle(2, 3);
    lines.push("area (2×3) : " + r.area);
    console.log(r.area);
    r.scale(2);
    lines.push("after scale 2 : " + r.area);
    console.log(r.area);

    lines.push("");
    lines.push("Task 2 — Employee / Manager");
    class Employee {
        constructor(name, salary) {
            this.name = name;
            this.salary = salary;
        }
        describe() {
            return this.name + " earns ₹" + this.salary + "/month";
        }
    }
    class Manager extends Employee {
        constructor(name, salary, team) {
            super(name, salary);
            this.team = team;
        }
        describe() {
            const base = super.describe();
            return base + " | Leads team of " + this.team.length;
        }
    }
    const m = new Manager("Riya", 80000, ["Priya", "Aarav", "Anaya"]);
    const md = m.describe();
    lines.push(md);
    console.log(md);

    lines.push("");
    lines.push("Task 3 — Counter with #count");
    class Counter {
        #count;
        constructor() {
            this.#count = 0;
        }
        inc() {
            this.#count += 1;
        }
        dec() {
            if (this.#count <= 0) {
                throw new Error("Count cannot go negative");
            }
            this.#count -= 1;
        }
        get value() {
            return this.#count;
        }
    }
    const c = new Counter();
    c.inc();
    c.inc();
    c.inc();
    c.dec();
    lines.push("after 3 inc, 1 dec : value = " + c.value);
    console.log(c.value);
    for (let i = 0; i < 4; i += 1) {
        try {
            c.dec();
            lines.push("dec ok : " + c.value);
            console.log(c.value);
        } catch (e) {
            lines.push("caught: " + e.message);
            console.log(e.message);
        }
    }

    lines.push("");
    lines.push("Bonus — ValidationError");
    class ValidationError extends Error {
        constructor(field, message) {
            super(message);
            this.name = "ValidationError";
            this.field = field;
        }
    }
    function validateUser(o) {
        if (!o || !o.name) {
            throw new ValidationError("name", "Name is required");
        }
        if (o.age < 0) {
            throw new ValidationError("age", "Age must be non-negative");
        }
    }
    try {
        validateUser({ age: 1 });
    } catch (e) {
        lines.push("bad name : field: " + e.field + ", message: " + e.message);
        console.log(e.field);
        console.log(e.message);
    }
    try {
        validateUser({ name: "X", age: -1 });
    } catch (e) {
        lines.push("bad age : field: " + e.field + ", message: " + e.message);
        console.log(e.field);
        console.log(e.message);
    }

    document.getElementById("out").textContent = lines.join("\n");
})();
