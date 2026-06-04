(function () {
    "use strict";
    const lines = [];

    lines.push("Topic 1 — Iterator protocol { value, done }");
    const arr = ["a", "b", "c"];
    const it = arr[Symbol.iterator]();
    lines.push("manual next: " + JSON.stringify(it.next()));
    lines.push("for...of is sugar over the same protocol");

    lines.push("");
    lines.push("Topic 2 — [Symbol.iterator] on a plain object (range)");
    const rangeObj = {
        from: 1,
        to: 3,
        [Symbol.iterator]: function () {
            let current = this.from;
            const last = this.to;
            return {
                next: function () {
                    if (current <= last) {
                        return { value: current++, done: false };
                    }
                    return { value: undefined, done: true };
                }
            };
        }
    };
    lines.push("spread [...rangeObj] → " + JSON.stringify(Array.from(rangeObj)));

    lines.push("");
    lines.push("Topic 3 — function* and yield");
    function* triple() {
        yield 1;
        yield 2;
        yield 3;
    }
    const genIt = triple();
    lines.push(
        "one iterator, three next() → " +
            [genIt.next().value, genIt.next().value, genIt.next().value].join(", ")
    );

    lines.push("");
    lines.push("Topic 4 — infinite sequence (capped here)");
    function* idGen() {
        let id = 1;
        while (true) {
            yield id++;
        }
    }
    const ids = idGen();
    lines.push("idGen x3 → " + [ids.next().value, ids.next().value, ids.next().value].join(", "));

    lines.push("");
    lines.push("Topic 5 — yield* delegation");
    function* inner() {
        yield 10;
        yield 20;
    }
    function* outer() {
        yield 0;
        yield* inner();
        yield 99;
    }
    lines.push("[...outer()] → " + JSON.stringify(Array.from(outer())));

    lines.push("");
    lines.push("Topic 6 — two-way next(value)");
    function* dialog() {
        const name = yield "What's your name?";
        const age = yield "Hi " + name + "! How old?";
        return name + ", " + age + ", recorded.";
    }
    const g = dialog();
    lines.push("1) " + String(g.next().value));
    lines.push("2) " + String(g.next("Priya").value));
    lines.push("3) " + String(g.next(25).value));

    lines.push("");
    lines.push("Topic 7 — async generator pattern (sync stand-in: pages as arrays)");
    function* paginateSync(pages) {
        let i = 0;
        while (i < pages.length) {
            const items = pages[i];
            for (let j = 0; j < items.length; j++) {
                yield items[j];
            }
            i++;
        }
    }
    const items = [["a", "b"], ["c"]];
    lines.push("flattened pages → " + JSON.stringify(Array.from(paginateSync(items))));

    document.getElementById("out").textContent = lines.join("\n");
    console.log(lines.join("\n"));
})();
