(function () {
    "use strict";
    const lines = [];

    lines.push("1 — tag counter Map");
    const posts = [
        { tags: ["js", "react"] },
        { tags: ["js", "node"] },
        { tags: ["react", "css"] }
    ];
    const counts = new Map();
    posts.forEach(function (p) {
        p.tags.forEach(function (t) {
            counts.set(t, (counts.get(t) || 0) + 1);
        });
    });
    const countStr = [...counts.entries()].map(function (e) {
        return e[0] + ":" + e[1];
    }).join(", ");
    lines.push(countStr);
    console.log(countStr);

    lines.push("");
    lines.push("2 — set helpers");
    function union(a, b) {
        return [...new Set([...a, ...b])];
    }
    function intersection(a, b) {
        const bs = new Set(b);
        return [...new Set(a)].filter(function (x) {
            return bs.has(x);
        });
    }
    function difference(a, b) {
        const bs = new Set(b);
        return [...new Set(a)].filter(function (x) {
            return !bs.has(x);
        });
    }
    const u = union([1, 2], [2, 3]);
    const n = intersection([1, 2, 3], [2, 3, 4]);
    const d = difference([1, 2, 3], [2, 3, 4]);
    lines.push("∪ " + u.join(","));
    console.log(u.join(","));
    lines.push("∩ " + n.join(","));
    console.log(n.join(","));
    lines.push("− " + d.join(","));
    console.log(d.join(","));

    lines.push("");
    lines.push("3 — Map : sorted [name, age] pairs");
    const ages = new Map([
        ["Priya", 22],
        ["Aarav", 19],
        ["Riya", 25]
    ]);
    const pairs = [...ages.entries()].sort(function (a, b) {
        return a[1] - b[1];
    });
    const pairsJson = JSON.stringify(pairs);
    lines.push(pairsJson);
    console.log(pairsJson);

    lines.push("");
    lines.push("4 — WeakMap click counts (stand-in buttons)");
    const clicks = new WeakMap();
    const b1 = { label: "ok" };
    const b2 = { label: "cancel" };
    function click(btn) {
        clicks.set(btn, (clicks.get(btn) || 0) + 1);
    }
    click(b1);
    click(b1);
    click(b2);
    lines.push("b1 clicks : " + clicks.get(b1) + "; b2 : " + clicks.get(b2));
    console.log(clicks.get(b1));
    console.log(clicks.get(b2));
    lines.push("Why WeakMap: when a DOM node is dropped and unreachable, its entry can be GC'd — no leak. A Map would keep the node alive.");

    document.getElementById("out").textContent = lines.join("\n");
})();
