(function () {
    "use strict";

    async function run() {
        const lines = [];

        lines.push("Topic 1 — JS is single-threaded: one call stack; async callbacks queue until stack is empty.");
        lines.push("Topic 2 — Engine + Web APIs + microtask queue + macrotask queue + event loop.");
        lines.push("Topic 3 — Loop: stack empty → drain ALL microtasks → run ONE macrotask → repeat.");

        lines.push("");
        lines.push("Topic 4 — Demo order: 1, 4, 3, 2 (sync, then microtasks, then macrotask)");
        const order = [];
        order.push("1");
        setTimeout(function () {
            order.push("2");
        }, 0);
        Promise.resolve().then(function () {
            order.push("3");
        });
        order.push("4");
        await Promise.resolve();
        await new Promise(function (r) {
            setTimeout(r, 15);
        });
        lines.push("Captured → " + order.join(", "));

        lines.push("");
        lines.push("Topic 5 — Microtasks: Promise.then/catch/finally, queueMicrotask. Macrotasks: setTimeout, I/O, …");

        lines.push("");
        lines.push("Topic 6 — Long sync work blocks timers and UI (avoid busy-wait in production).");

        lines.push("");
        lines.push("Topic 7 — Practical: microtasks run before next timer; setTimeout(0) is after sync + microtasks; await resumes as microtask.");

        document.getElementById("out").textContent = lines.join("\n");
        console.log(lines.join("\n"));
    }

    run();
})();
