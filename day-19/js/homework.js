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
                resolve({ id: id, name: "User-" + id });
            }, 40);
        });
    }

    function withTimeout(promise, ms) {
        return Promise.race([
            promise,
            wait(ms).then(function () {
                return Promise.reject(new Error("timeout"));
            })
        ]);
    }

    async function run() {
        const lines = [];

        lines.push("1 — Day-18 style chain as async/await");
        try {
            const u = await fetchUser(1);
            const u2 = await fetchUser(u.id + 1);
            const namesLine = "chained users : " + u.name + ", " + u2.name;
            lines.push(namesLine);
            console.log(u.name + ", " + u2.name);
        } catch (e) {
            lines.push(String(e));
            console.log(String(e));
        }

        lines.push("");
        lines.push("2 — fetchAllUsers parallel vs sequential");
        const ids = [1, 2, 3, 4];
        const tSeq = Date.now();
        const seqOut = [];
        for (const id of ids) {
            seqOut.push(await fetchUser(id));
        }
        const seqMs = Date.now() - tSeq;
        lines.push("sequential ms : " + seqMs);
        console.log(seqMs);

        const tPar = Date.now();
        const parOut = await Promise.all(ids.map(fetchUser));
        const parMs = Date.now() - tPar;
        lines.push("parallel ms : " + parMs);
        console.log(parMs);
        const idStr = parOut.map(function (x) {
            return x.id;
        }).join(",");
        lines.push("same ids : " + idStr);
        console.log(idStr);

        lines.push("");
        lines.push("3 — withTimeout");
        try {
            await withTimeout(wait(5000), 80);
            lines.push("unexpected fast resolve");
        } catch (e) {
            lines.push("slow promise timed out : " + e.message);
            console.log(e.message);
        }
        const ok = await withTimeout(fetchUser(9), 200);
        lines.push("fetch under cap : " + ok.name);
        console.log(ok.name);

        lines.push("");
        lines.push("4 — for...of delays [300,100,200]");
        const order = [];
        const delays = [300, 100, 200];
        for (const ms of delays) {
            await wait(ms);
            order.push("done-" + ms);
        }
        const ordStr = order.join(" : ");
        lines.push(ordStr);
        console.log(ordStr);

        document.getElementById("out").textContent = lines.join("\n");
    }

    run();
})();
