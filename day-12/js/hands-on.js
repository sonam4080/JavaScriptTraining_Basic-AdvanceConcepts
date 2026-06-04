(function () {
    const lines = [];

    lines.push("Task 1 — safeParse");
    function safeParse(str) {
        try {
            return JSON.parse(str);
        } catch (err) {
            console.log("Invalid JSON:", err.message);
            return null;
        }
    }
    const valid = safeParse('{"name":"Priya"}');
    lines.push("Answer: valid JSON : " + JSON.stringify(valid));
    console.log(JSON.stringify(valid));
    const broken = safeParse('{"name":"Priya"');
    lines.push("Answer: broken JSON : " + String(broken));
    console.log(broken);

    lines.push("");
    lines.push("Task 2 — setAge");
    function setAge(age) {
        if (typeof age !== "number") {
            throw new Error("Age must be a number");
        }
        if (age < 0 || age > 120) {
            throw new Error("Age must be 0–120");
        }
        return age;
    }
    function trySetAge(label, age) {
        try {
            const v = setAge(age);
            lines.push("Answer: " + label + " : " + v);
            console.log(v);
        } catch (e) {
            lines.push("Answer: " + label + " : caught: " + e.message);
            console.log(e.message);
        }
    }
    trySetAge("setAge(25)", 25);
    trySetAge('setAge("twenty")', "twenty");
    trySetAge("setAge(200)", 200);

    lines.push("");
    lines.push("Task 3 — ValidationError");
    class ValidationError extends Error {
        constructor(message) {
            super(message);
            this.name = "ValidationError";
        }
    }
    function validateEmail(email) {
        if (email.indexOf("@") === -1) {
            throw new ValidationError("Invalid email");
        }
        return true;
    }
    function tryEmail(em) {
        try {
            validateEmail(em);
            lines.push("Answer: " + em + " : ok");
            console.log(true);
        } catch (err) {
            if (err instanceof ValidationError) {
                lines.push("Answer: " + em + " : ValidationError: " + err.message);
                console.log(err.message);
            } else {
                lines.push("Answer: " + em + " : " + err.message);
                console.log(err.message);
            }
        }
    }
    tryEmail("priya@example.com");
    tryEmail("priya-no-at");

    lines.push("");
    lines.push(
        "Answer: Bonus — separate module files need <script type=\"module\"> and a local server; not added here."
    );

    document.getElementById("out").textContent = lines.join("\n");
})();
