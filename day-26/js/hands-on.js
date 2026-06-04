(function () {
    "use strict";
    const lines = [];

    function createEmitter() {
        const listeners = new Map();
        return {
            on: function (event, cb) {
                if (!listeners.has(event)) {
                    listeners.set(event, new Set());
                }
                listeners.get(event).add(cb);
            },
            off: function (event, cb) {
                const set = listeners.get(event);
                if (set) {
                    set.delete(cb);
                }
            },
            emit: function (event) {
                const args = [].slice.call(arguments, 1);
                const set = listeners.get(event);
                if (set) {
                    set.forEach(function (cb) {
                        cb.apply(null, args);
                    });
                }
            }
        };
    }

    lines.push("Task 1 — createEmitter");
    const bus = createEmitter();
    const trace = [];
    const f1 = function () {
        trace.push("A");
    };
    const f2 = function () {
        trace.push("B");
    };
    bus.on("hello", f1);
    bus.on("hello", f2);
    bus.emit("hello");
    const afterFirst = trace.join("");
    lines.push("Answer: emit hello (both on) : " + afterFirst);
    console.log(afterFirst);
    bus.off("hello", f1);
    bus.emit("hello");
    const afterSecond = trace.join("");
    lines.push("Answer: emit hello after off f1 : " + afterSecond);
    console.log(afterSecond);

    lines.push("");
    lines.push("Task 2 — createUser factory");
    function createUser(name, role) {
        const r = role === undefined ? "user" : role;
        return {
            name: name,
            role: r,
            canEdit: function () {
                return r === "admin";
            }
        };
    }
    const u1 = createUser("Aarav");
    const u2 = createUser("Riya", "admin");
    lines.push("Answer: u1.canEdit() : " + u1.canEdit());
    console.log(u1.canEdit());
    lines.push("Answer: u2.canEdit() : " + u2.canEdit());
    console.log(u2.canEdit());

    lines.push("");
    lines.push("Task 3 — createCache factory");
    function createCache() {
        const map = new Map();
        return {
            get: function (k) {
                return map.get(k);
            },
            set: function (k, v) {
                map.set(k, v);
            },
            has: function (k) {
                return map.has(k);
            },
            get size() {
                return map.size;
            }
        };
    }
    const c1 = createCache();
    const c2 = createCache();
    c1.set("a", 1);
    c2.set("b", 2);
    c2.set("c", 3);
    lines.push("Answer: c1.size, c2.size (independent) : " + c1.size + ", " + c2.size);
    console.log(c1.size + "," + c2.size);
    lines.push("Note: default export createCache() from a module = one shared cache for all importers (singleton).");

    lines.push("");
    lines.push("Bonus — reactive(obj, onChange)");
    function reactive(obj, onChange) {
        return new Proxy(obj, {
            set: function (target, prop, value) {
                target[prop] = value;
                onChange(prop, value);
                return true;
            }
        });
    }
    const changes = [];
    const st = reactive({ count: 0 }, function (p, v) {
        changes.push(String(p) + " → " + v);
    });
    st.count = 1;
    st.count = 5;
    st.extra = "x";
    const chStr = changes.join(" | ");
    lines.push("Answer: onChange log : " + chStr);
    console.log(chStr);

    document.getElementById("out").textContent = lines.join("\n");
})();
