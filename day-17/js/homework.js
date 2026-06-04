(function () {
    "use strict";
    const lines = [];

    lines.push("1 — Vehicle / Car / Bike");
    class Vehicle {
        constructor(brand) {
            this.brand = brand;
        }
        start() {
            return this.brand + " starts";
        }
    }
    class Car extends Vehicle {
        constructor(brand, doors) {
            super(brand);
            this.doors = doors;
        }
        start() {
            return super.start() + " | Car-specific check (doors: " + this.doors + ")";
        }
    }
    class Bike extends Vehicle {
        start() {
            return super.start();
        }
    }
    const carS = new Car("Tata", 4).start();
    const bikeS = new Bike("RE").start();
    lines.push(carS);
    console.log(carS);
    lines.push(bikeS);
    console.log(bikeS);

    lines.push("");
    lines.push("2 — Counter with static count");
    class Counter {
        static count = 0;
        #n;
        constructor() {
            Counter.count += 1;
            this.#n = 0;
        }
        tick() {
            this.#n += 1;
            return this.#n;
        }
    }
    new Counter();
    new Counter();
    lines.push("Counter.count after 2 new : " + Counter.count);
    console.log(Counter.count);

    lines.push("");
    lines.push("3 — Temperature #celsius");
    class Temperature {
        #celsius;
        constructor(c) {
            this.celsius = c;
        }
        get celsius() {
            return this.#celsius;
        }
        set celsius(v) {
            if (v < -273.15) {
                throw new Error("Below absolute zero");
            }
            this.#celsius = v;
        }
        get fahrenheit() {
            return (this.#celsius * 9) / 5 + 32;
        }
    }
    const t = new Temperature(0);
    lines.push("0°C : °F " + t.fahrenheit);
    console.log(t.fahrenheit);
    t.celsius = 100;
    lines.push("100°C : °F " + t.fahrenheit);
    console.log(t.fahrenheit);

    lines.push("");
    lines.push("4 — ValidationError class");
    class ValidationError extends Error {
        constructor(field, message) {
            super(message);
            this.name = "ValidationError";
            this.field = field;
        }
    }
    const err = new ValidationError("email", "Invalid");
    lines.push("instanceof ValidationError : " + (err instanceof ValidationError));
    console.log(err instanceof ValidationError);

    document.getElementById("out").textContent = lines.join("\n");
})();
