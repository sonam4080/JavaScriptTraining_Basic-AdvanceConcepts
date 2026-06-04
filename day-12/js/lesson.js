(function () {
    const lines = [];
    try {
        const x = JSON.parse('{"ok":true}');
        lines.push("parsed: " + JSON.stringify(x));
    } catch (err) {
        lines.push("unexpected: " + err.message);
    }
    try {
        JSON.parse("{bad");
    } catch (err2) {
        lines.push("caught: " + err2.name);
    }
    document.getElementById("out").textContent = lines.join("\n");
    console.log(lines.join("\n"));
})();
