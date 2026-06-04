(function () {
    "use strict";
    const lines = [];

    lines.push("1 — immutable leaf update with structural sharing");
    const sharedMeta = { tag: "x" };
    const root = {
        a: { b: { c: { d: { leaf: 1, meta: sharedMeta } } }, side: { x: 10 } }
    };
    const next = {
        ...root,
        a: {
            ...root.a,
            b: {
                ...root.a.b,
                c: {
                    ...root.a.b.c,
                    d: { ...root.a.b.c.d, leaf: 99 }
                }
            }
        }
    };
    lines.push("leaf " + root.a.b.c.d.leaf + " : " + next.a.b.c.d.leaf);
    console.log(next.a.b.c.d.leaf);
    lines.push("unchanged meta ref (same object) : " + (root.a.b.c.d.meta === next.a.b.c.d.meta));
    console.log(root.a.b.c.d.meta === next.a.b.c.d.meta);
    lines.push("unchanged ref a.side === : " + (root.a.side === next.a.side));
    console.log(root.a.side === next.a.side);
    lines.push("changed branch root.a !== next.a : " + (root.a !== next.a));
    console.log(root.a !== next.a);

    lines.push("");
    lines.push("2 — deepFreeze");
    function deepFreeze(obj) {
        Object.getOwnPropertyNames(obj).forEach(function (key) {
            const v = obj[key];
            if (v && typeof v === "object") {
                deepFreeze(v);
            }
        });
        return Object.freeze(obj);
    }
    const frozen = deepFreeze({ l1: { l2: { n: 1 } } });
    let threw = false;
    try {
        "use strict";
        frozen.l1.l2.n = 2;
    } catch (e) {
        threw = true;
    }
    lines.push("nested mutate strict throws : " + threw + "; value still : " + frozen.l1.l2.n);
    console.log(threw);
    console.log(frozen.l1.l2.n);

    lines.push("");
    lines.push("3 — structuredClone vs JSON (from MDN-style facts)");
    lines.push("- Preserves Date, RegExp, Map, Set, ArrayBuffer, typed arrays.");
    lines.push("- Keeps undefined in maps / arrays where JSON drops or transforms them.");
    lines.push("- Can clone circular references; JSON.stringify throws on cycles.");

    lines.push("");
    lines.push("4 — pick(obj, keys)");
    function pick(obj, keys) {
        return keys.reduce(function (acc, key) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                return { ...acc, [key]: obj[key] };
            }
            return acc;
        }, {});
    }
    const picked = JSON.stringify(pick({ a: 1, b: 2, c: 3 }, ["b", "c", "missing"]));
    lines.push(picked);
    console.log(picked);

    document.getElementById("out").textContent = lines.join("\n");
})();
