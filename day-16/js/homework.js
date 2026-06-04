(function () {
    "use strict";
    const lines = [];

    lines.push("1 — tool : vehicle : car");
    const tool = {
        calibrate() {
            return "calibrate";
        }
    };
    const vehicleHw = Object.create(tool);
    vehicleHw.roll = function () {
        return "roll";
    };
    const carHw = Object.create(vehicleHw);
    carHw.honk = function () {
        return "honk";
    };
    const chain1 = [carHw.calibrate(), carHw.roll(), carHw.honk()].join(", ");
    lines.push(chain1);
    console.log(chain1);

    lines.push("");
    lines.push("2 — Shape / Circle");
    function Shape(name) {
        this.name = name;
    }
    Shape.prototype.describe = function () {
        return "shape " + this.name;
    };
    function Circle(name, radius) {
        Shape.call(this, name);
        this.radius = radius;
    }
    Circle.prototype = Object.create(Shape.prototype);
    Circle.prototype.constructor = Circle;
    Circle.prototype.area = function () {
        return Math.PI * this.radius * this.radius;
    };
    const c = new Circle("C1", 5);
    const desc = c.describe();
    lines.push(desc);
    console.log(desc);
    const ar = c.area();
    lines.push("area (r=5) : " + ar);
    console.log(ar);

    lines.push("");
    lines.push("3 — String.prototype example: padStart");
    const pad = "7".padStart(3, "0");
    lines.push('"7".padStart(3, "0") : ' + pad);
    console.log(pad);

    lines.push("");
    lines.push("4 — chainOf(obj)");
    function chainOf(obj) {
        const out = [];
        let p = Object.getPrototypeOf(obj);
        while (p !== null) {
            out.push(p);
            p = Object.getPrototypeOf(p);
        }
        return out;
    }
    const chain = chainOf([]);
    lines.push("chainOf([]) length : " + chain.length + " (Array.prototype, Object.prototype)");
    console.log(chain.length);

    document.getElementById("out").textContent = lines.join("\n");
})();
