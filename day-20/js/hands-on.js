(function () {
    "use strict";

    function blockFor(ms) {
        const t0 = Date.now();
        while (Date.now() - t0 < ms) {
            /* busy */
        }
    }

    async function run() {
        const lines = [];

        lines.push("Task 1 — order 1, 4, 3, 2");
        const o1 = [];
        o1.push("1");
        setTimeout(function () {
            o1.push("2");
        }, 0);
        Promise.resolve().then(function () {
            o1.push("3");
        });
        o1.push("4");
        await Promise.resolve();
        await new Promise(function (r) {
            setTimeout(r, 20);
        });
        const o1s = o1.join(", ") + " | sync: 1,4 · micro: 3 · macro: 2";
        lines.push(o1s);
        console.log(o1s);

        lines.push("");
        lines.push("Task 2 — A, F, C, E, D, B");
        const o2 = [];
        o2.push("A");
        setTimeout(function () {
            o2.push("B");
        }, 0);
        Promise.resolve()
            .then(function () {
                o2.push("C");
            })
            .then(function () {
                o2.push("D");
            });
        queueMicrotask(function () {
            o2.push("E");
        });
        o2.push("F");
        await Promise.resolve();
        await new Promise(function (r) {
            setTimeout(r, 20);
        });
        const o2s = o2.join(", ");
        lines.push(o2s);
        console.log(o2s);

        lines.push("");
        lines.push("Task 3 — block delays timer (scaled 250ms block, 80ms timer)");
        const tTimer = Date.now();
        let firedAt = 0;
        setTimeout(function () {
            firedAt = Date.now() - tTimer;
        }, 80);
        blockFor(250);
        lines.push("after block");
        await new Promise(function (r) {
            setTimeout(r, 50);
        });
        const firedLine = "timer fired ~ms after schedule : " + firedAt + " (not ~80 while stack busy)";
        lines.push(firedLine);
        console.log(firedAt);

        lines.push("");
        lines.push("Bonus — five timers; inside timer index 2 schedule three microtasks");
        const o3 = [];
        for (let i = 0; i < 5; i += 1) {
            const idx = i;
            setTimeout(function () {
                o3.push("T" + idx);
                if (idx === 2) {
                    Promise.resolve().then(function () {
                        o3.push("P0");
                    });
                    Promise.resolve().then(function () {
                        o3.push("P1");
                    });
                    Promise.resolve().then(function () {
                        o3.push("P2");
                    });
                }
            }, 0);
        }
        await new Promise(function (r) {
            setTimeout(r, 80);
        });
        const o3s = "capture : " + o3.join(", ");
        lines.push(o3s);
        console.log(o3.join(", "));
        lines.push("Microtasks from one macrotask drain before the next macrotask runs.");

        document.getElementById("out").textContent = lines.join("\n");
    }

    run();
})();
