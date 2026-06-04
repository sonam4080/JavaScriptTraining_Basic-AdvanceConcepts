(function () {
    "use strict";

    function fetchUser(id) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                if (id < 0) {
                    reject(new Error("Bad id"));
                } else {
                    resolve({ id: id, name: "Priya" });
                }
            }, 300);
        });
    }

    function fetchOrders(userId) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve([{ id: 101, userId: userId }, { id: 102, userId: userId }]);
            }, 300);
        });
    }

    function fetchPrice(id) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve({ id: id, price: 100 });
            }, 500);
        });
    }

    function fetchPriceQuick(id) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve({ id: id, price: 100 });
            }, 40);
        });
    }

    async function showOrders(id) {
        try {
            const user = await fetchUser(id);
            const orders = await fetchOrders(user.id);
            return "orders.length = " + orders.length;
        } catch (e) {
            return "error: " + e.message;
        }
    }

    async function run() {
        const lines = [];

        lines.push("Task 1 — showOrders(7) async/await");
        const so = await showOrders(7);
        lines.push(so);
        console.log(so);

        lines.push("");
        lines.push("Task 2 — slow vs fast (500ms × 3)");
        const tSlow = Date.now();
        await fetchPrice(1);
        await fetchPrice(2);
        await fetchPrice(3);
        const slowMs = Date.now() - tSlow;
        lines.push("slow ms : " + slowMs + " (expect ~1500)");
        console.log(slowMs);

        const tFast = Date.now();
        await Promise.all([fetchPrice(1), fetchPrice(2), fetchPrice(3)]);
        const fastMs = Date.now() - tFast;
        lines.push("fast ms : " + fastMs + " (expect ~500)");
        console.log(fastMs);

        lines.push("");
        lines.push("Task 3 — forEach trap then fixes (same shape, 40ms fetches for snappy demo)");
        const ids = [1, 2, 3];
        const feLog = [];
        async function feBroken() {
            feLog.push("start");
            ids.forEach(async function (id) {
                await fetchPriceQuick(id);
                feLog.push("p" + id);
            });
            feLog.push("end");
        }
        await feBroken();
        await new Promise(function (r) {
            setTimeout(r, 120);
        });
        const feStr = feLog.join(" ");
        lines.push("forEach : " + feStr);
        console.log(feStr);

        const foLog = [];
        async function foFixed() {
            foLog.push("start");
            for (const id of ids) {
                await fetchPriceQuick(id);
                foLog.push("p" + id);
            }
            foLog.push("end");
        }
        await foFixed();
        const foStr = foLog.join(" ");
        lines.push("for...of : " + foStr);
        console.log(foStr);

        const mapLog = [];
        async function mapFixed() {
            mapLog.push("start");
            const results = await Promise.all(ids.map(function (id) {
                return fetchPriceQuick(id);
            }));
            results.forEach(function (p) {
                mapLog.push("p" + p.id);
            });
            mapLog.push("end");
        }
        await mapFixed();
        const mapStr = mapLog.join(" ");
        lines.push("Promise.all+map : " + mapStr);
        console.log(mapStr);

        lines.push("");
        lines.push("Bonus — retry");
        async function retry(fn, attempts) {
            let last;
            for (let i = 0; i < attempts; i += 1) {
                try {
                    return await fn();
                } catch (e) {
                    last = e;
                }
            }
            throw last;
        }
        let calls = 0;
        async function flaky() {
            calls += 1;
            if (calls < 3) {
                throw new Error("nope");
            }
            return "ok on try " + calls;
        }
        const retryOut = await retry(flaky, 5);
        lines.push(retryOut);
        console.log(retryOut);

        document.getElementById("out").textContent = lines.join("\n");
    }

    run();
})();
