(function () {
    "use strict";

    function chunk(array, fn, chunkSize, onChunkDone) {
        return new Promise(function (resolve, reject) {
            let i = 0;
            function next() {
                if (i >= array.length) {
                    resolve();
                    return;
                }
                const end = Math.min(i + chunkSize, array.length);
                try {
                    for (; i < end; i += 1) {
                        fn(array[i], i);
                    }
                } catch (e) {
                    reject(e);
                    return;
                }
                if (onChunkDone) {
                    onChunkDone(end);
                }
                setTimeout(next, 0);
            }
            next();
        });
    }

    async function run() {
        const lines = [];

        lines.push("1 — (on paper) verify lesson + hands-on orderings in console");

        lines.push("");
        lines.push("2 — loupe: open latentflip.com/loupe and paste the Day 20 snippet");

        lines.push("");
        lines.push("3 — chunk() over 8000 items, chunkSize 2000");
        const arr = [];
        for (let j = 0; j < 8000; j += 1) {
            arr.push(j);
        }
        let sum = 0;
        const t0 = Date.now();
        let yields = 0;
        await chunk(
            arr,
            function (n) {
                sum += n;
            },
            2000,
            function () {
                yields += 1;
            }
        );
        const chunkLine = "sum(0..7999) : " + sum + "; yields : " + yields + "; wall ms : " + (Date.now() - t0);
        lines.push(chunkLine);
        console.log(sum);
        console.log(yields);
        console.log(Date.now() - t0);

        lines.push("");
        lines.push("4 — await vs setTimeout(0)");
        const ord = [];
        async function a() {
            await Promise.resolve();
            ord.push("after-await");
        }
        a();
        setTimeout(function () {
            ord.push("timer");
        }, 0);
        ord.push("sync");
        await Promise.resolve();
        await new Promise(function (r) {
            setTimeout(r, 20);
        });
        const ordStr = ord.join(", ");
        lines.push("order : " + ordStr + " (microtask before macrotask)");
        console.log(ordStr);

        document.getElementById("out").textContent = lines.join("\n");
    }

    run();
})();
