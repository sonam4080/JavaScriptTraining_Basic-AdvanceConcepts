(function () {
    const lines = [];
    lines.push("Task — ALL_CAPS constant and camelCase variable");
    const MAX_STUDENTS = 24;
    const trainerName = "Coach";
    lines.push("Answer: MAX_STUDENTS : " + MAX_STUDENTS);
    console.log(MAX_STUDENTS);
    lines.push("Answer: trainerName : " + trainerName);
    console.log(trainerName);
    lines.push("");
    lines.push("Task — comment + greeting");
    lines.push("Answer: // Comment explains why the next line runs (greeting uses the trainer name).");
    const greeting = "Hi, " + trainerName + "!";
    lines.push("Answer: greeting : " + greeting);
    console.log(greeting);
    document.getElementById("out").textContent = lines.join("\n");
})();
