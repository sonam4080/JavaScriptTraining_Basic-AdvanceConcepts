(function () {
    "use strict";
    const lines = [];

    function createEmitterOnce() {
        const listeners = new Map();
        const api = {
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
            once: function (event, cb) {
                function wrapped() {
                    cb.apply(null, arguments);
                    api.off(event, wrapped);
                }
                api.on(event, wrapped);
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
        return api;
    }

    lines.push("1 — createEmitter + once");
    const bus = createEmitterOnce();
    let hits = 0;
    bus.once("x", function () {
        hits++;
    });
    bus.emit("x");
    bus.emit("x");
    lines.push("Answer: once listener hit count : " + hits);
    console.log(hits);

    lines.push("");
    lines.push("2 — TTL cache");
    function createTTLCache(defaultTtlMs) {
        const store = new Map();
        return {
            set: function (key, value, ttlMs) {
                const ttl = ttlMs === undefined ? defaultTtlMs : ttlMs;
                const expires = Date.now() + ttl;
                store.set(key, { value: value, expires: expires });
            },
            get: function (key) {
                const e = store.get(key);
                if (!e) {
                    return undefined;
                }
                if (Date.now() > e.expires) {
                    store.delete(key);
                    return undefined;
                }
                return e.value;
            }
        };
    }
    const ttl = createTTLCache(50);
    ttl.set("k", "v");
    const imm = ttl.get("k");
    lines.push("Answer: get immediately : " + imm);
    console.log(imm);

    lines.push("");
    lines.push("3 — Array proxy (get/set/deleteProperty)");
    const ops = [];
    const arr = [1, 2, 3];
    const pa = new Proxy(arr, {
        get: function (t, p, r) {
            ops.push("get:" + String(p));
            return Reflect.get(t, p, r);
        },
        set: function (t, p, v, r) {
            ops.push("set:" + String(p));
            return Reflect.set(t, p, v, r);
        },
        deleteProperty: function (t, p) {
            ops.push("del:" + String(p));
            return Reflect.deleteProperty(t, p);
        }
    });
    void pa[0];
    pa[1] = 9;
    delete pa[2];
    const opStr = ops.join(", ");
    lines.push("Answer: trap sequence : " + opStr);
    console.log(opStr);

    document.getElementById("out").textContent = lines.join("\n");
})();
