import { add, multiply, divide } from "./math/index.js";
import { buttonSummary } from "./buttonDemo.js";
import cache from "./cache.js";
import { writeUser } from "./userService.js";
import { writeProduct } from "./productService.js";

async function loadAndRun() {
    var mod = await import("./heavy.js");
    return mod.compute();
}

function run() {
    var lines = [];

    lines.push("Task 1 — barrel ./math/index.js");
    var a23 = add(2, 3);
    lines.push("Answer: add(2, 3) : " + a23);
    console.log(a23);
    var m45 = multiply(4, 5);
    lines.push("Answer: multiply(4, 5) : " + m45);
    console.log(m45);
    var d102 = divide(10, 2);
    lines.push("Answer: divide(10, 2) : " + d102);
    console.log(d102);

    lines.push("");
    lines.push("Task 2 — default + named via buttonDemo.js");
    var btnLine = buttonSummary();
    lines.push("Answer: " + btnLine);
    console.log(btnLine);

    lines.push("");
    lines.push("Task 3 — dynamic import()");
    return loadAndRun().then(function (msg) {
        lines.push("Answer: loadAndRun() : " + msg);
        console.log(msg);

        lines.push("");
        lines.push("Bonus — singleton Map via default export");
        writeUser(1, { name: "Priya" });
        writeProduct(42, { sku: "mug" });
        var hasUser = cache.has("user:1");
        lines.push("Answer: cache.has(user:1) : " + hasUser);
        console.log(hasUser);
        var hasProd = cache.has("product:42");
        lines.push("Answer: cache.has(product:42) : " + hasProd);
        console.log(hasProd);
        var sz = cache.size;
        lines.push("Answer: cache.size : " + sz);
        console.log(sz);

        document.getElementById("out").textContent = lines.join("\n");
    });
}

run();
