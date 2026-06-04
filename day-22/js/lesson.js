(function () {
    "use strict";
    const lines = [];

    lines.push("Topic 1 — Map basics");
    const m = new Map();
    m.set("name", "Priya");
    m.set(42, "the answer");
    const userObj = { id: 1 };
    m.set(userObj, "by ref");
    lines.push("size → " + m.size + "; get(42) → " + m.get(42));

    const k1 = { id: 1 };
    const k2 = { id: 1 };
    const mKeys = new Map();
    mKeys.set(k1, "a");
    mKeys.set(k2, "b");
    lines.push("two different object keys → size " + mKeys.size);

    lines.push("");
    lines.push("Topic 2 — Object ↔ Map");
    const obj = { name: "Priya", city: "Jaipur" };
    const fromObj = new Map(Object.entries(obj));
    const back = Object.fromEntries(fromObj);
    lines.push("round-trip name → " + back.name);

    lines.push("");
    lines.push("Topic 3 — Set dedup");
    const tags = new Set(["js", "react", "js", "node", "react"]);
    lines.push("unique tags size → " + tags.size);
    const uniq = [...new Set([1, 2, 2, 3, 4, 4, 5])];
    lines.push("dedup array → " + uniq.join(","));

    lines.push("");
    lines.push("Topic 4 — union / intersection / difference");
    const a = new Set([1, 2, 3]);
    const b = new Set([2, 3, 4]);
    const union = new Set([...a, ...b]);
    const inter = new Set([...a].filter(function (x) {
        return b.has(x);
    }));
    const diff = new Set([...a].filter(function (x) {
        return !b.has(x);
    }));
    lines.push("∪ → " + [...union].join(",") + " | ∩ → " + [...inter].join(",") + " | A−B → " + [...diff].join(","));

    lines.push("");
    lines.push("Topic 5 — Map for cache by object ref (pattern)");
    const cache = new Map();
    const req = { path: "/u" };
    cache.set(req, "payload");
    lines.push("cache hit → " + cache.get(req));

    lines.push("");
    lines.push("Topic 6 — WeakMap / WeakSet (API only here; keys are objects)");
    const wm = new WeakMap();
    let holder = { id: 1 };
    wm.set(holder, { clicks: 0 });
    lines.push("weak get → " + wm.get(holder).clicks);
    const seen = new WeakSet();
    seen.add(holder);
    lines.push("weakset has → " + seen.has(holder));

    lines.push("");
    lines.push("Topic 7 — Pick Map/Set vs Object/Array from shape + iteration needs.");

    document.getElementById("out").textContent = lines.join("\n");
    console.log(lines.join("\n"));
})();
