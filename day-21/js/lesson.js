(function () {
    "use strict";
    const lines = [];

    lines.push("Topic 1 — Shallow vs deep");
    const original = {
        name: "Priya",
        address: { city: "Jaipur", pin: 302001 },
        hobbies: ["reading", "trekking"]
    };
    const shallow = { ...original };
    shallow.address.city = "Mumbai";
    lines.push("after shallow nested mutate, original.address.city → " + original.address.city);
    lines.push("shallow.address === original.address → " + (shallow.address === original.address));
    const jsonCopy = JSON.parse(JSON.stringify(original));
    jsonCopy.address.city = "Delhi";
    lines.push("JSON clone change does not affect original.city now → " + original.address.city);

    lines.push("");
    lines.push("Topic 2 — structuredClone (when available)");
    const withDate = { name: "Priya", d: new Date(2020, 0, 1), nested: { city: "Jaipur" } };
    if (typeof structuredClone === "function") {
        const sc = structuredClone(withDate);
        sc.nested.city = "Pune";
        lines.push("structuredClone: original nested city → " + withDate.nested.city);
        lines.push("copy.date is Date → " + (sc.d instanceof Date));
    } else {
        lines.push("structuredClone not in this environment");
    }

    lines.push("");
    lines.push("Follow-along — spread vs structuredClone on nested y");
    const o = { x: { y: 1 } };
    const a = { ...o };
    a.x.y = 99;
    lines.push("after shallow: o.x.y → " + o.x.y);
    if (typeof structuredClone === "function") {
        const b = structuredClone(o);
        b.x.y = 50;
        lines.push("after clone branch edit: o.x.y → " + o.x.y);
    }

    lines.push("");
    lines.push("Topic 3 — Object.freeze is shallow");
    const cfg = Object.freeze({ host: "api.example.com", port: 8080 });
    cfg.port = 9000;
    lines.push("frozen top-level reassignment ignored → port still " + cfg.port);

    function deepFreeze(obj) {
        Object.values(obj).forEach(function (v) {
            if (v && typeof v === "object") {
                deepFreeze(v);
            }
        });
        return Object.freeze(obj);
    }
    const fully = deepFreeze({ a: 1, n: { x: 2 } });
    fully.n.x = 99;
    lines.push("deepFreeze nested → fully.n.x still " + fully.n.x);

    lines.push("");
    lines.push("Topic 4 — Immutable updates");
    const user = {
        name: "Priya",
        age: 25,
        address: { city: "Jaipur", pin: 302001 },
        hobbies: ["reading", "trekking"]
    };
    const u1 = { ...user, age: 26 };
    lines.push("u1.age / user.age → " + u1.age + " / " + user.age);
    const u2 = { ...user, address: { ...user.address, city: "Mumbai" } };
    lines.push("u2 vs user address city → " + u2.address.city + " / " + user.address.city);
    const u3 = { ...user, hobbies: [...user.hobbies, "swimming"] };
    lines.push("u3 hobbies length → " + u3.hobbies.length + "; user unchanged → " + user.hobbies.length);

    lines.push("");
    lines.push("Topic 5 — Destructuring (defaults, rename, nested, rest)");
    const { name: n1, role = "user" } = { name: "Priya" };
    lines.push("default role → " + n1 + ", " + role);
    const { name: userName, role: userRole = "user" } = { name: "Aarav" };
    lines.push(userName + ", " + userRole);
    const cfg2 = { api: { host: "api.example.com", port: 8080 }, db: { host: "db", port: 5432 } };
    const {
        api: { host: apiHost, port: apiPort }
    } = cfg2;
    lines.push("nested api → " + apiHost + ":" + apiPort);
    const [first, second, ...rest] = [1, 2, 3, 4, 5];
    lines.push("rest slice → " + first + "," + second + "," + JSON.stringify(rest));

    lines.push("");
    lines.push("Topic 6 — Computed keys");
    const field = "city";
    const dyn = { [field]: "Mumbai" };
    lines.push("computed → " + JSON.stringify(dyn));
    function updateField(obj, key, value) {
        return { ...obj, [key]: value };
    }
    lines.push(JSON.stringify(updateField({ name: "Priya", age: 25 }, "age", 26)));

    lines.push("");
    lines.push("Topic 7 — ?. and ??");
    const response = { user: { name: "Priya", profile: { bio: null } } };
    const city = response?.user?.profile?.city;
    const cityOrDefault = response?.user?.profile?.city ?? "Unknown";
    lines.push("city → " + String(city) + "; ?? fallback → " + cityOrDefault);
    const upper = response?.user?.name?.toUpperCase?.();
    lines.push("safe method → " + upper);
    const firstTag = response?.user?.tags?.[0] ?? "no tags";
    lines.push("safe index → " + firstTag);

    document.getElementById("out").textContent = lines.join("\n");
    console.log(lines.join("\n"));
})();
