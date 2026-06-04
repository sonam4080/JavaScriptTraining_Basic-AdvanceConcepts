(function () {
    const lines = [];

    document.getElementById("rand-bg").addEventListener("click", function () {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        document.body.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
    });
    lines.push("Answer: Task 1 — #rand-bg sets random body background (click to test).");
    console.log(document.body.style.backgroundColor || "(default until click)");

    const lenInput = document.getElementById("len-input");
    lenInput.addEventListener("input", function () {
        lenInput.style.color = lenInput.value.length < 3 ? "red" : "green";
    });
    lines.push("Answer: Task 2 — #len-input color red if length<3 else green.");
    console.log(lenInput.value.length);

    document.getElementById("sum-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const a = Number(document.getElementById("num-a").value);
        const b = Number(document.getElementById("num-b").value);
        document.getElementById("sum-out").textContent = "Sum: " + (a + b);
    });
    lines.push("Answer: Task 3 — sum form uses preventDefault (default values 3+5 : 8).");
    console.log(Number(document.getElementById("num-a").value) + Number(document.getElementById("num-b").value));

    const delegationList = document.getElementById("delegation-list");
    delegationList.addEventListener("click", function (e) {
        if (e.target.tagName === "LI") {
            console.log("Answer: Task 4 log — clicked " + e.target.textContent);
        }
    });
    const li6 = document.createElement("li");
    li6.textContent = "Item F (dynamic)";
    delegationList.appendChild(li6);
    lines.push("Answer: Task 4 — sixth li added; delegation handles it (see console on click).");
    console.log(delegationList.querySelectorAll("li").length);

    document.getElementById("out").textContent = lines.join("\n");
})();
