(function () {
    "use strict";
    const lines = [];

    lines.push("Task 1 — shallow bug vs structuredClone");
    const orig = { name: "Priya", addr: { city: "Jaipur" } };
    const copy = { ...orig };
    copy.addr.city = "Mumbai";
    lines.push("after shallow mutate, orig.addr.city : " + orig.addr.city);
    console.log(orig.addr.city);
    if (typeof structuredClone === "function") {
        const orig2 = { name: "Priya", addr: { city: "Jaipur" } };
        const deep = structuredClone(orig2);
        deep.addr.city = "Mumbai";
        lines.push("structuredClone: orig2.addr.city still : " + orig2.addr.city);
        console.log(orig2.addr.city);
    }

    lines.push("");
    lines.push("Task 2 — immutable nested theme");
    const state = { user: { name: "Priya", prefs: { theme: "light", lang: "en" } } };
    const next = {
        ...state,
        user: {
            ...state.user,
            prefs: { ...state.user.prefs, theme: "dark" }
        }
    };
    lines.push("next theme : " + next.user.prefs.theme + "; state theme : " + state.user.prefs.theme);
    console.log(next.user.prefs.theme);
    console.log(state.user.prefs.theme);

    lines.push("");
    lines.push("Task 3 — toggleDone");
    const tasks = [
        { id: 1, title: "Learn JS", done: false },
        { id: 2, title: "Build app", done: false }
    ];
    function toggleDone(list, id) {
        return list.map(function (t) {
            return t.id === id ? { ...t, done: !t.done } : t;
        });
    }
    const once = toggleDone(tasks, 1);
    const twice = toggleDone(once, 1);
    lines.push("tasks[0].done still : " + tasks[0].done);
    console.log(tasks[0].done);
    lines.push("once[0].done : " + once[0].done + "; twice[0].done : " + twice[0].done);
    console.log(once[0].done);
    console.log(twice[0].done);

    lines.push("");
    lines.push("Bonus — ?. and ?? with partial / empty");
    const data = { user: { name: "Priya", profile: { city: null } } };
    const cityExpr = data?.user?.profile?.city ?? "Unknown";
    const bioLen = data?.user?.profile?.bio?.length ?? 0;
    lines.push("city expr : " + cityExpr + "; bio len : " + bioLen);
    console.log(cityExpr);
    console.log(bioLen);
    const empty = {};
    const emptyCity = empty?.user?.profile?.city ?? "Unknown";
    const emptyBio = empty?.user?.profile?.bio?.length ?? 0;
    lines.push("empty {} city : " + emptyCity);
    console.log(emptyCity);
    lines.push("empty bio len : " + emptyBio);
    console.log(emptyBio);

    document.getElementById("out").textContent = lines.join("\n");
})();
