(function () {
    "use strict";

    function range(from, to) {
        return {
            from: from,
            to: to,
            [Symbol.iterator]: function () {
                var current = this.from;
                var last = this.to;
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
    }

    /**
     * Task 2: same behaviour via generator.
     * Line-count: ~4 lines vs ~14 for manual [Symbol.iterator] on the object above.
     */
    function* rangeGen(from, to) {
        for (var i = from; i <= to; i++) {
            yield i;
        }
    }

    function* naturals() {
        var n = 1;
        while (true) {
            yield n++;
        }
    }

    function take(iterable, n) {
        var it = iterable[Symbol.iterator]();
        var out = [];
        for (var i = 0; i < n; i++) {
            var step = it.next();
            if (step.done) {
                break;
            }
            out.push(step.value);
        }
        return out;
    }

    var tree = {
        value: 1,
        children: [
            { value: 2, children: [{ value: 3, children: [] }] },
            { value: 4, children: [] }
        ]
    };

    function* walk(node) {
        yield node.value;
        for (var i = 0; i < node.children.length; i++) {
            yield* walk(node.children[i]);
        }
    }

    var lines = [];

    lines.push("Task 1 — manual iterator");
    var t1 = [];
    for (var x of range(3, 7)) {
        t1.push(x);
    }
    lines.push("Answer: for...of range(3,7) : " + t1.join(", "));
    console.log(t1.join(", "));
    var spread13 = Array.from(range(1, 3));
    lines.push("Answer: [...range(1,3)] : " + JSON.stringify(spread13));
    console.log(JSON.stringify(spread13));

    lines.push("");
    lines.push("Task 2 — generator");
    var t2 = [];
    for (var y of rangeGen(3, 7)) {
        t2.push(y);
    }
    lines.push("Answer: for...of rangeGen(3,7) : " + t2.join(", "));
    console.log(t2.join(", "));
    var spreadGen13 = Array.from(rangeGen(1, 3));
    lines.push("Answer: [...rangeGen(1,3)] : " + JSON.stringify(spreadGen13));
    console.log(JSON.stringify(spreadGen13));

    lines.push("");
    lines.push("Task 3 — take from infinite naturals()");
    var taken5 = take(naturals(), 5);
    lines.push("Answer: take(naturals(), 5) : " + JSON.stringify(taken5));
    console.log(JSON.stringify(taken5));

    lines.push("");
    lines.push("Bonus — walk(tree)");
    var walked = Array.from(walk(tree));
    lines.push("Answer: [...walk(tree)] : " + JSON.stringify(walked));
    console.log(JSON.stringify(walked));

    document.getElementById("out").textContent = lines.join("\n");
})();
