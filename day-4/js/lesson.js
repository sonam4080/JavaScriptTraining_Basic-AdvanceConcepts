(function () {
    const lines = [];

    lines.push("if:");
    const age = 20;
    lines.push("age 20 → " + (age >= 18 ? "vote path" : "no vote"));

    lines.push("");
    lines.push("else if chain (marks → grade):");
    function gradeFromMarks(marks) {
        if (marks >= 90) {
            return "A";
        }
        if (marks >= 75) {
            return "B";
        }
        if (marks >= 60) {
            return "C";
        }
        return "F";
    }
    lines.push("85 → " + gradeFromMarks(85));
    lines.push("50 → " + gradeFromMarks(50));
    lines.push("95 → " + gradeFromMarks(95));

    lines.push("");
    lines.push("switch + fall-through:");
    function dayKind(day) {
        let result = "";
        switch (day) {
            case "Monday":
            case "Tuesday":
            case "Wednesday":
            case "Thursday":
            case "Friday":
                result = "Weekday";
                break;
            case "Saturday":
            case "Sunday":
                result = "Weekend";
                break;
            default:
                result = "Other";
        }
        return result;
    }
    lines.push("Tuesday → " + dayKind("Tuesday"));
    lines.push("Saturday → " + dayKind("Saturday"));

    lines.push("");
    lines.push("Truthy samples: Boolean(0)=" + Boolean(0) + ", Boolean('0')=" + Boolean("0") + ", Boolean([])=" + Boolean([]));

    document.getElementById("out").textContent = lines.join("\n");
    console.log(lines.join("\n"));
})();
