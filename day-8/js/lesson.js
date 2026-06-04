(function () {
    const lines = [];
    const user = { name: "Priya", role: "student" };
    lines.push("dot: " + user.name);
    lines.push("bracket: " + user["role"]);
    const copy = { ...user, city: "Jaipur" };
    lines.push("spread: " + JSON.stringify(copy));
    document.getElementById("out").textContent = lines.join("\n");
    console.log(lines.join("\n"));
})();
