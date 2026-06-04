(function () {
    "use strict";
    const lines = [];

    lines.push("Topic 1 — debounce / throttle (implementations)");
    function debounce(fn, delay) {
        let timer;
        return function () {
            const args = arguments;
            const ctx = this;
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(ctx, args);
            }, delay);
        };
    }
    function throttle(fn, delay) {
        let last = 0;
        return function () {
            const now = Date.now();
            if (now - last < delay) {
                return;
            }
            last = now;
            fn.apply(this, arguments);
        };
    }
    let debCount = 0;
    const d = debounce(function () {
        debCount++;
    }, 30);
    d();
    d();
    d();
    lines.push("debounce triple immediate → count stays 0 until later");

    lines.push("");
    lines.push("Topic 4 — User Timing API (sketch)");
    if (typeof performance !== "undefined" && performance.mark) {
        performance.mark("demo-start");
        let s = 0;
        for (let i = 0; i < 1000; i++) {
            s += i;
        }
        performance.mark("demo-end");
        performance.measure("demo", "demo-start", "demo-end");
        const m = performance.getEntriesByName("demo", "measure")[0];
        lines.push("measure demo duration ms → " + (m ? m.duration.toFixed(2) : "n/a"));
    } else {
        lines.push("performance.measure not available in this context");
    }

    lines.push("");
    lines.push("Topic 5 — Security: prefer textContent over innerHTML for user strings; never eval user input; JSON.parse for JSON.");

    lines.push("");
    lines.push("Topic 6 & 7 — ESLint/Prettier on save; const by default, ===, try/catch on await, sanitise HTML.");

    document.getElementById("out").textContent = lines.join("\n");
    console.log(lines.join("\n"));
})();
