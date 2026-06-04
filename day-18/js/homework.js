(function () {
    "use strict";

    function wait(ms) {
        return new Promise(function (resolve) {
            setTimeout(resolve, ms);
        });
    }

    function fetchUser(id) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve({ id: id, name: "Priya" });
            }, 150);
        });
    }

    function fetchData(id) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                if (Math.random() < 0.5) {
                    resolve({ id: id, ok: true });
                } else {
                    reject(new Error("random fail " + id));
                }
            }, 20);
        });
    }

    async function run() {
        const lines = [];

        lines.push("1 — wait(500) ×2 then log 1s");
        const tChain = Date.now();
        await wait(500)
            .then(function () {
                return wait(500);
            })
            .then(function () {
                console.log("1s");
                lines.push("console.log(\"1s\") ran after ~1s");
            });
        const elapsedChain = Date.now() - tChain;
        lines.push("elapsed ms : " + elapsedChain);
        console.log(elapsedChain);

        lines.push("");
        lines.push("2 — fetchData ×3 + catch (5 trials)");
        for (let i = 0; i < 5; i += 1) {
            try {
                const r = await fetchData(1)
                    .then(function () {
                        return fetchData(2);
                    })
                    .then(function () {
                        return fetchData(3);
                    });
                lines.push("trial " + (i + 1) + " ok : step3 " + JSON.stringify(r));
                console.log(JSON.stringify(r));
            } catch (e) {
                lines.push("trial " + (i + 1) + " catch : " + e.message);
                console.log(e.message);
            }
        }

        lines.push("");
        lines.push("3 — Promise.race fetchUser vs 2s timeout");
        const raced = await Promise.race([
            fetchUser(7),
            wait(2000).then(function () {
                return Promise.reject(new Error("timeout"));
            })
        ]);
        lines.push("race winner : " + JSON.stringify(raced));
        console.log(JSON.stringify(raced));

        lines.push("");
        lines.push("4 — Promise.any flaky");
        const flaky = await Promise.any([
            wait(30).then(function () {
                return Promise.reject(new Error("flaky1"));
            }),
            wait(40).then(function () {
                return "second";
            }),
            wait(35).then(function () {
                return Promise.reject(new Error("flaky3"));
            })
        ]);
        lines.push("any first success : " + flaky);
        console.log(flaky);

        document.getElementById("out").textContent = lines.join("\n");
    }

    run();
})();
