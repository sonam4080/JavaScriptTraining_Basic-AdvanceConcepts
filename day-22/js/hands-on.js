(function () {
    "use strict";
    const lines = [];

    lines.push("Task 1 - product Map");
    const prices = new Map([
        ["pen", 50],
        ["book", 200],
        ["bag", 800]
    ]);
    const rows = [];
    for (const [item, p] of prices) {
        rows.push(item + ": ₹" + p);
    }
    lines.push(rows.join(" | "));
    lines.push("has book : " + prices.has("book") + "; get pen : " + prices.get("pen"));
    console.log(prices.has("book"));
    console.log(prices.get("pen"));
    prices.delete("pen");
    lines.push("after delete pen, size : " + prices.size);
    console.log(prices.size);
    const asObj = Object.fromEntries(prices);
    const back = new Map(Object.entries(asObj));
    lines.push("round-trip book : " + back.get("book"));
    console.log(back.get("book"));

    lines.push("");
    lines.push("Task 2 — dedup + mixed set");
    const ids = [101, 102, 103, 101, 104, 102, 105];
    const unique = [...new Set(ids)];
    lines.push("unique : " + unique.join(",") + "; count : " + unique.length);
    console.log(unique.join(","));
    console.log(unique.length);
    const mixed = new Set([1, "1", 1, true, 1n]);
    lines.push("mixed types size (predict 4) : " + mixed.size);
    console.log(mixed.size);

    lines.push("");
    lines.push("Task 3 — memoize with Map");
    const logComp = [];
    function expensiveSquare(n) {
        logComp.push("computing...");
        return n * n;
    }
    function memoize(fn) {
        const cache = new Map();
        function wrapped(arg) {
            if (cache.has(arg)) {
                return cache.get(arg);
            }
            const v = fn(arg);
            cache.set(arg, v);
            return v;
        }
        wrapped.cacheSize = function () {
            return cache.size;
        };
        return wrapped;
    }
    const memoSq = memoize(expensiveSquare);
    const m5a = memoSq(5);
    const m5b = memoSq(5);
    lines.push("5² : " + m5a + "; again : " + m5b);
    console.log(m5a);
    console.log(m5b);
    const m7 = memoSq(7);
    lines.push("7² : " + m7);
    console.log(m7);
    lines.push("compute logs : " + logComp.length + "; cache.size : " + memoSq.cacheSize());
    console.log(logComp.length);
    console.log(memoSq.cacheSize());

    lines.push("");
    lines.push("Bonus — WeakMap attach/get");
    const store = new WeakMap();
    function attach(el, data) {
        store.set(el, data);
    }
    function get(el) {
        return store.get(el);
    }
    const btnA = { id: "A" };
    const btnB = { id: "B" };
    attach(btnA, { lastClick: 111 });
    attach(btnB, { lastClick: 222 });
    const metaStr = JSON.stringify(get(btnA));
    lines.push("A meta : " + metaStr);
    console.log(metaStr);

    document.getElementById("out").textContent = lines.join("\n");
})();
