(function () {
    "use strict";
    const lines = [];

    lines.push("Topic 1 — class User");
    class User {
        constructor(name, city) {
            this.name = name;
            this.city = city;
        }
        greet() {
            return "Hi, I'm " + this.name + " from " + this.city;
        }
    }
    const a = new User("Priya", "Jaipur");
    const b = new User("Aarav", "Mumbai");
    lines.push(a.greet());
    lines.push("typeof User → " + typeof User);
    lines.push("a.greet === b.greet → " + (a.greet === b.greet));
    lines.push("Object.getPrototypeOf(a) === User.prototype → " + (Object.getPrototypeOf(a) === User.prototype));

    lines.push("");
    lines.push("Topic 2 — getters / setters + class T");
    class Product {
        constructor(name, priceInPaise) {
            this.name = name;
            this._priceInPaise = priceInPaise;
        }
        get priceInRupees() {
            return this._priceInPaise / 100;
        }
        set priceInRupees(rupees) {
            if (rupees < 0) {
                throw new Error("Price cannot be negative");
            }
            this._priceInPaise = rupees * 100;
        }
        get priceWithGST() {
            return this.priceInRupees * 1.18;
        }
    }
    const p = new Product("Notebook", 5000);
    lines.push("priceInRupees → " + p.priceInRupees + "; priceWithGST → " + p.priceWithGST);
    p.priceInRupees = 100;
    lines.push("after set 100: priceInRupees → " + p.priceInRupees);
    class T {
        constructor(c) {
            this._c = c;
        }
        get f() {
            return (this._c * 9) / 5 + 32;
        }
    }
    lines.push("T(100).f (Celsius→Fahrenheit) → " + new T(100).f);

    lines.push("");
    lines.push("Topic 3 — extends / super");
    class Animal {
        constructor(name) {
            this.name = name;
        }
        speak() {
            return this.name + " makes a sound";
        }
    }
    class Dog extends Animal {
        constructor(name, breed) {
            super(name);
            this.breed = breed;
        }
        speak() {
            return super.speak() + " | " + this.name + " barks!";
        }
    }
    const d = new Dog("Bruno", "Labrador");
    lines.push(d.speak());
    lines.push("instanceof Dog / Animal → " + (d instanceof Dog) + " / " + (d instanceof Animal));

    lines.push("");
    lines.push("Topic 4 — static methods");
    class MathUtils {
        static gst(amount, rate) {
            const r = rate === undefined ? 18 : rate;
            return amount * (r / 100);
        }
        static format(amount) {
            return "₹" + amount.toFixed(2);
        }
    }
    lines.push("MathUtils.gst(1000) → " + MathUtils.gst(1000));
    class UserFrom {
        constructor(name) {
            this.name = name;
        }
        static fromEmail(email) {
            const name = email.split("@")[0];
            return new UserFrom(name);
        }
    }
    lines.push(UserFrom.fromEmail("priya@example.com").name);

    lines.push("");
    lines.push("Topic 5 — private fields #");
    class BankAccount {
        #balance;
        #transactions;
        constructor(initial) {
            this.#balance = initial;
            this.#transactions = [];
        }
        deposit(amt) {
            this.#balance += amt;
            this.#transactions.push({ type: "deposit", amt: amt });
        }
        withdraw(amt) {
            if (amt > this.#balance) {
                throw new Error("Insufficient funds");
            }
            this.#balance -= amt;
            this.#transactions.push({ type: "withdraw", amt: amt });
        }
        get balance() {
            return this.#balance;
        }
        get history() {
            return this.#transactions.slice();
        }
    }
    const acc = new BankAccount(1000);
    acc.deposit(500);
    acc.withdraw(200);
    lines.push("balance → " + acc.balance + "; history length → " + acc.history.length);

    lines.push("");
    lines.push("Topic 6 — custom errors");
    class AppError extends Error {
        constructor(message, code) {
            super(message);
            this.name = this.constructor.name;
            this.code = code;
        }
    }
    class ValidationErrorLesson extends AppError {
        constructor(field, message) {
            super(message, "VALIDATION_FAILED");
            this.field = field;
        }
    }
    function validateAge(age) {
        if (age < 0) {
            throw new ValidationErrorLesson("age", "Must be non-negative");
        }
    }
    try {
        validateAge(-5);
    } catch (e) {
        lines.push(e instanceof ValidationErrorLesson ? "[" + e.code + "] " + e.field + ": " + e.message : String(e));
    }

    lines.push("");
    lines.push("Topic 7 — class vs function constructor (same prototype idea)");
    lines.push("ES6 class is mainly syntax over Day 16 constructor + prototype methods.");

    document.getElementById("out").textContent = lines.join("\n");
    console.log(lines.join("\n"));
})();
