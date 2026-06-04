(function () {
    "use strict";

    function delay(ms) {
        return new Promise(function (resolve) {
            setTimeout(resolve, ms);
        });
    }

    function fetchUserPromise(id) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                if (id < 0) {
                    reject(new Error("Bad id"));
                } else {
                    resolve({ id: id, name: "Priya" });
                }
            }, 30);
        });
    }

    async function run() {
        const lines = [];

        lines.push("Topic 1 — Sync vs async");
        lines.push("Sync logs in order: 1, 2, 3");
        lines.push("Async: sync runs first; setTimeout(0) runs after current stack + microtasks → order 1, 3, 2");

        lines.push("");
        lines.push("Topic 2 — Callback style (simulated)");
        function fetchUserCb(id, cb) {
            setTimeout(function () {
                cb(null, { id: id, name: "Priya" });
            }, 20);
        }
        await new Promise(function (resolve) {
            fetchUserCb(7, function (err, user) {
                lines.push(err ? "fail" : "Got user: " + JSON.stringify(user));
                resolve();
            });
        });

        lines.push("");
        lines.push("Topic 3 — Callback hell: nested callbacks + repeated error checks (Promises flatten this)");

        lines.push("");
        lines.push("Topic 4 — Promise states + delay()");
        const pFollow = new Promise(function (res) {
            setTimeout(function () {
                res(42);
            }, 20);
        });
        lines.push("Right after new Promise: pending (then handlers wait)");
        const v = await pFollow;
        lines.push("After await: settled value → " + v);
        await delay(20).then(function () {
            lines.push("delay(20).then → half tick passed (demo)");
        });

        lines.push("");
        lines.push("Topic 5 — .then / .catch / .finally chain");
        try {
            await fetchUserPromise(7)
                .then(function (user) {
                    lines.push("got user: " + user.name);
                    return user.id;
                })
                .then(function (id) {
                    return fetchUserPromise(id + 1);
                })
                .then(function (nextUser) {
                    lines.push("next user id: " + nextUser.id);
                })
                .catch(function (err) {
                    lines.push("catch: " + err.message);
                })
                .finally(function () {
                    lines.push("finally ran");
                });
        } catch (e) {
            lines.push(String(e));
        }

        lines.push("");
        lines.push("Topic 6 — Combinators (toy promises)");
        const ok = function (x, ms) {
            return delay(ms).then(function () {
                return x;
            });
        };
        const bad = function (ms) {
            return delay(ms).then(function () {
                throw new Error("fail");
            });
        };
        const allResult = await Promise.all([ok("a", 10), ok("b", 15)]).catch(function (e) {
            return e.message;
        });
        lines.push("Promise.all [ok,ok] → " + JSON.stringify(allResult));
        const settled = await Promise.allSettled([Promise.resolve("ok1"), Promise.reject(new Error("x")), Promise.resolve("ok2")]);
        lines.push("allSettled statuses → " + settled.map(function (r) {
            return r.status;
        }).join(", "));
        const raced = await Promise.race([ok("fast", 5), ok("slow", 50)]);
        lines.push("race winner → " + raced);
        try {
            const anyed = await Promise.any([
                delay(10).then(function () {
                    throw new Error("n1");
                }),
                delay(15).then(function () {
                    return "winner";
                }),
                delay(20).then(function () {
                    throw new Error("n2");
                })
            ]);
            lines.push("any first fulfill → " + anyed);
        } catch (e) {
            lines.push("any: " + String(e && e.name));
        }

        lines.push("");
        lines.push("Topic 7 — Promise.resolve / reject + cache pattern");
        const cache = { 7: { id: 7, name: "Priya" } };
        function getUser(id) {
            if (cache[id]) {
                return Promise.resolve(cache[id]);
            }
            return fetchUserPromise(id);
        }
        const cachedUser = await getUser(7);
        lines.push("getUser(7) from cache → " + cachedUser.name);
        await Promise.reject(new Error("nope")).catch(function (e) {
            lines.push("Promise.reject caught → " + e.message);
        });

        document.getElementById("out").textContent = lines.join("\n");
        console.log(lines.join("\n"));
    }

    run();
})();
