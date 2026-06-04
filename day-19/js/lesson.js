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
            }, 40);
        });
    }

    function fetchProduct(id) {
        return new Promise(function (res) {
            setTimeout(function () {
                res({ id: id, price: 100 });
            }, 80);
        });
    }

    async function run() {
        const lines = [];

        lines.push("Topic 1 — async always returns a Promise");
        async function greet() {
            return "Namaste";
        }
        const result = greet();
        lines.push("greet() is Promise → " + (result instanceof Promise));
        lines.push("await greet() → " + (await greet()));

        lines.push("");
        lines.push("Topic 2 — await pauses this async function only");
        const user = await fetchUser(7);
        lines.push("await fetchUser(7) → " + user.name);

        lines.push("");
        lines.push("Topic 3 — try / catch / finally");
        async function showUser(id) {
            let out = "";
            try {
                const u = await fetchUser(id);
                out = "got: " + u.name;
            } catch (err) {
                out = "failed: " + err.message;
            } finally {
                out += " | done";
            }
            return out;
        }
        lines.push(await showUser(7));
        lines.push(await showUser(-1));

        lines.push("");
        lines.push("Topic 4 — sequential vs parallel (scaled 80ms each × 3)");
        const tSlow = Date.now();
        await fetchProduct(1);
        await fetchProduct(2);
        await fetchProduct(3);
        lines.push("sequential total ms → " + (Date.now() - tSlow) + " (~sum)");

        const tFast = Date.now();
        await Promise.all([fetchProduct(1), fetchProduct(2), fetchProduct(3)]);
        lines.push("Promise.all total ms → " + (Date.now() - tFast) + " (~max)");

        lines.push("");
        lines.push("Topic 5 — forEach ignores returned Promises");
        const ids = [1, 2, 3];
        const bugLog = [];
        async function bugDemo() {
            bugLog.push("start");
            ids.forEach(async function (id) {
                await fetchProduct(id);
                bugLog.push("got-" + id);
            });
            bugLog.push("end");
        }
        await bugDemo();
        await new Promise(function (r) {
            setTimeout(r, 350);
        });
        lines.push("forEach async bug order → " + bugLog.join(" "));

        lines.push("");
        lines.push("Topic 6 — top-level await: only in ES modules; defer scripts use (async () => { ... })();");

        lines.push("");
        lines.push("Topic 7 — mix async with .then on caller");
        async function getUserName(id) {
            const u = await fetchUser(id);
            return u.name;
        }
        const viaThen = await getUserName(7).then(function (n) {
            return "then: " + n;
        });
        lines.push(viaThen);

        document.getElementById("out").textContent = lines.join("\n");
        console.log(lines.join("\n"));
    }

    run();
})();
