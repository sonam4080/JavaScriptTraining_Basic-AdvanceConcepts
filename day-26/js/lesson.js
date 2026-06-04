(function () {
    "use strict";
    const lines = [];

    lines.push("Topic 2 — Module pattern (closure counter)");
    const counter = (function () {
        let n = 0;
        return {
            inc: function () {
                n++;
            },
            get: function () {
                return n;
            }
        };
    })();
    counter.inc();
    counter.inc();
    lines.push("counter.get() → " + counter.get());

    lines.push("");
    lines.push("Topic 3 — Observer (tiny emitter)");
    function createEmitter() {
        const listeners = new Map();
        return {
            on: function (event, cb) {
                if (!listeners.has(event)) {
                    listeners.set(event, new Set());
                }
                listeners.get(event).add(cb);
            },
            emit: function (event) {
                const args = [].slice.call(arguments, 1);
                const set = listeners.get(event);
                if (!set) {
                    return;
                }
                set.forEach(function (cb) {
                    cb.apply(null, args);
                });
            }
        };
    }
    const bus = createEmitter();
    let heard = "";
    bus.on("ping", function (msg) {
        heard = msg;
    });
    bus.emit("ping", "pong");
    lines.push("emit ping → " + heard);

    lines.push("");
    lines.push("Topic 4 — Factory");
    function createUser(name, role) {
        role = role === undefined ? "user" : role;
        return { name: name, role: role };
    }
    const u = createUser("Priya");
    lines.push("createUser('Priya').role → " + u.role);

    lines.push("");
    lines.push("Topic 5 — Singleton (module = one evaluation)");
    lines.push("export default instance — all importers share one object (see Day 24 cache).");

    lines.push("");
    lines.push("Topic 6 — Proxy reactive sketch");
    const log = [];
    const state = new Proxy(
        { count: 0 },
        {
            set: function (t, p, v) {
                t[p] = v;
                log.push(String(p) + "→" + v);
                return true;
            }
        }
    );
    state.count = 2;
    lines.push("proxy log → " + log.join(", "));

    document.getElementById("out").textContent = lines.join("\n");
    console.log(lines.join("\n"));
})();
