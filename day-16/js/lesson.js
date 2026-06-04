(function () {
    "use strict";
    const lines = [];

    lines.push("Topic 1 — Every object has a prototype");
    const user = { name: "Priya" };
    lines.push("Object.getPrototypeOf(user) === Object.prototype → " + (Object.getPrototypeOf(user) === Object.prototype));
    lines.push("user.toString() → " + user.toString());
    lines.push("Object.prototype.hasOwnProperty('toString') → " + Object.prototype.hasOwnProperty("toString"));
    lines.push("Object.getPrototypeOf(Object.prototype) → " + String(Object.getPrototypeOf(Object.prototype)));

    lines.push("");
    lines.push("Topic 2 — Object.create follow-along");
    const animal = {
        eat() {
            return this.name + " is eating";
        },
        sleep() {
            return this.name + " is sleeping";
        }
    };
    const dogLesson = Object.create(animal);
    dogLesson.name = "Bruno";
    lines.push(dogLesson.eat());
    lines.push("Object.getPrototypeOf(dogLesson) === animal → " + (Object.getPrototypeOf(dogLesson) === animal));
    lines.push("hasOwnProperty('name') → " + dogLesson.hasOwnProperty("name") + "; hasOwnProperty('eat') → " + dogLesson.hasOwnProperty("eat"));
    const a = { x: 1 };
    const b = Object.create(a);
    b.y = 2;
    lines.push("b.x → " + b.x + "; b.y → " + b.y + "; hasOwnProperty('x') → " + b.hasOwnProperty("x"));

    lines.push("");
    lines.push("Topic 3 — Prototype chain (read walks up, write makes own)");
    const grandparent = { lastName: "Sharma" };
    const parent = Object.create(grandparent);
    parent.firstName = "Priya";
    const child = Object.create(parent);
    child.age = 5;
    lines.push("child.age → " + child.age + "; child.firstName → " + child.firstName + "; child.lastName → " + child.lastName);
    child.firstName = "Anaya";
    lines.push("after shadow: child.firstName → " + child.firstName + "; parent.firstName → " + parent.firstName);

    lines.push("");
    lines.push("Topic 4 — hasOwnProperty vs in");
    const animal2 = { eat() {} };
    const dog2 = Object.create(animal2);
    dog2.bark = function () {};
    lines.push("hasOwnProperty('bark') → " + dog2.hasOwnProperty("bark") + "; hasOwnProperty('eat') → " + dog2.hasOwnProperty("eat"));
    lines.push("'bark' in dog2 → " + ("bark" in dog2) + "; 'eat' in dog2 → " + ("eat" in dog2) + "; 'toString' in dog2 → " + ("toString" in dog2));
    lines.push("Object.hasOwn(dog2, 'eat') → " + Object.hasOwn(dog2, "eat"));

    lines.push("");
    lines.push("Topic 5 — Constructor functions");
    function User(name, city) {
        this.name = name;
        this.city = city;
    }
    User.prototype.greet = function () {
        return "Hi, I'm " + this.name + " from " + this.city;
    };
    const u1 = new User("Priya", "Jaipur");
    const u2 = new User("Aarav", "Mumbai");
    lines.push(u1.greet());
    lines.push("a.greet === b.greet → " + (u1.greet === u2.greet));
    lines.push("Object.getPrototypeOf(u1) === User.prototype → " + (Object.getPrototypeOf(u1) === User.prototype));

    function Admin(name, city, level) {
        User.call(this, name, city);
        this.level = level;
    }
    Admin.prototype = Object.create(User.prototype);
    Admin.prototype.constructor = Admin;
    Admin.prototype.power = function () {
        return this.name + " has level " + this.level;
    };
    const ad = new Admin("Riya", "Bangalore", 5);
    lines.push(ad.greet());
    lines.push(ad.power());

    lines.push("");
    lines.push("Topic 6 — Avoid mutating built-in prototypes (use a utility instead)");
    function last(arr) {
        return arr[arr.length - 1];
    }
    lines.push("last(['apple','mango']) → " + last(["apple", "mango"]));

    lines.push("");
    lines.push("Topic 7 — Mental model: read walks chain; write own property; end null");

    document.getElementById("out").textContent = lines.join("\n");
    console.log(lines.join("\n"));
})();
