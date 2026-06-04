(function () {
    const out = document.getElementById("out");
    const lines = [];
    document.getElementById("lesson-btn").addEventListener("click", function once() {
        lines.push("click received");
        out.textContent = lines.join("\n");
        document.getElementById("lesson-btn").removeEventListener("click", once);
    });
    out.textContent = "Click the button once.";
})();
