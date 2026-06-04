(function () {
    const lines = [];
    const demo = document.getElementById("lesson-demo");
    if (demo) {
        lines.push("before: " + demo.textContent);
        demo.textContent = "Updated from JavaScript.";
        lines.push("after: " + demo.textContent);
    }
    const ghost = document.querySelector("#does-not-exist");
    lines.push("missing element: " + ghost);
    document.getElementById("out").textContent = lines.join("\n");
    console.log(lines.join("\n"));
})();
