(function () {
    "use strict";

    function delayLogPromise(msg, ms) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                console.log(msg);
                resolve(msg);
            }, ms);
        });
    }

    function fetchPrice(item, ms) {
        const prices = { pen: 50, book: 200, bag: 800 };
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve({ item: item, price: prices[item] });
            }, ms);
        });
    }

    async function run() {
        const lines = [];

        lines.push("Task 1 — Order A, C, D, B");
        const order = [];
        order.push("A");
        setTimeout(function () {
            order.push("B");
        }, 0);
        Promise.resolve().then(function () {
            order.push("D");
        });
        order.push("C");
        await Promise.resolve();
        await new Promise(function (r) {
            setTimeout(r, 15);
        });
        const orderStr = order.join(", ");
        lines.push("Actual order : " + orderStr);
        console.log(orderStr);
        lines.push("Why D before B: microtasks (promise callbacks) run before the next macrotask (setTimeout).");

        lines.push("");
        lines.push("Task 2 — delayLogPromise chain");
        await delayLogPromise("1", 300)
            .then(function () {
                return delayLogPromise("2", 200);
            })
            .then(function () {
                return delayLogPromise("3", 100);
            });
        lines.push("Chained 1 (300ms) : 2 (200ms) : 3 (100ms) — done");

        lines.push("");
        lines.push("Task 3 — Promise.all prices");
        const t0 = Date.now();
        const results = await Promise.all([
            fetchPrice("pen", 50),
            fetchPrice("book", 200),
            fetchPrice("bag", 800)
        ]);
        const elapsed = Date.now() - t0;
        const total = results.reduce(function (s, r) {
            return s + r.price;
        }, 0);
        lines.push("Total price : " + total);
        console.log(total);
        lines.push("Elapsed ms : " + elapsed + " (near max delay 800, not sum 1050)");
        console.log(elapsed);

        lines.push("");
        lines.push("Bonus — all vs allSettled");
        const trio = [Promise.resolve("ok1"), Promise.reject(new Error("fail")), Promise.resolve("ok2")];
        try {
            await Promise.all(trio);
            lines.push("Promise.all: unexpected success");
        } catch (e) {
            lines.push("Promise.all: rejects on first failure : " + e.message);
            console.log(e.message);
        }
        const st = await Promise.allSettled(trio);
        const stStr = st.map(function (x) {
            return x.status;
        }).join(", ");
        lines.push("allSettled statuses : " + stStr);
        console.log(stStr);
        lines.push("Use .all when every result is required and one fail should abort; use .allSettled when you need every outcome (e.g. dashboards).");

        document.getElementById("out").textContent = lines.join("\n");
    }

    run();
})();
