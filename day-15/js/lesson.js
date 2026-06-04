(function () {
    "use strict";
    const lines = [];

    lines.push("Follow along — obj.f vs detached reference");
    const obj = {
        n: 7,
        f() {
            return this.n;
        }
    };
    const g = obj.f;
    lines.push("Answer: obj.f() → implicit binding → " + obj.f());
    let gOut = "";
    try {
        gOut = String(g());
    } catch (e) {
        gOut = e.name + " (this is undefined in strict default binding)";
    }
    lines.push("Answer: g() → default binding (no object left of dot) → " + gOut);

    lines.push("");
    lines.push("Follow along — arrow method on object");
    const obj2 = {
        n: 10,
        m: () => {
            return this && this.n;
        }
    };
    lines.push("Answer: obj2.m() → arrow has no own this; outer this has no n → " + obj2.m());

    document.getElementById("out").textContent = lines.join("\n");
    console.log(lines.join("\n"));
})();
