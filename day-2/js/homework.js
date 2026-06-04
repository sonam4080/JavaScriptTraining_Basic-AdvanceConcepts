(function () {
    const lines = [];
    const raw = "  riya  ";
    lines.push("Task — trim, upper, includes");
    lines.push("Answer: trim().toUpperCase() : " + raw.trim().toUpperCase());
    console.log(raw.trim().toUpperCase());
    lines.push("Answer: includes('iy') on trimmed : " + raw.trim().includes("iy"));
    console.log(raw.trim().includes("iy"));
    lines.push("Answer: parseFloat('3.14159') : " + parseFloat("3.14159"));
    console.log(parseFloat("3.14159"));
    lines.push('Answer: Boolean("") : ' + Boolean(""));
    console.log(Boolean(""));
    document.getElementById("out").textContent = lines.join("\n");
})();
