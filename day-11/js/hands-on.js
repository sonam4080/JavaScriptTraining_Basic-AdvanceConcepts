(function () {
    const lines = [];

    let count = 0;
    const counterBtn = document.querySelector("#counter-btn");
    const countSpan = document.querySelector("#count");
    counterBtn.addEventListener("click", function () {
        count += 1;
        countSpan.textContent = String(count);
        if (count >= 10) {
            counterBtn.textContent = "Stop clicking!";
        }
    });
    lines.push("Answer: Task 1 — counter wired (click button; after 10 clicks label changes).");
    console.log(countSpan.textContent);

    const liveInput = document.querySelector("#live-input");
    const preview = document.querySelector("#preview");
    liveInput.addEventListener("input", function () {
        const v = liveInput.value;
        preview.textContent = v.length === 0 ? "Start typing..." : v;
    });
    lines.push("Answer: Task 2 — input copies to #preview; empty shows \"Start typing...\".");
    console.log(preview.textContent);

    const form = document.querySelector("#reg-form");
    const nameField = document.querySelector("#name-field");
    const welcome = document.querySelector("#welcome");
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = nameField.value.trim();
        welcome.textContent =
            name.length === 0 ? "Please enter your name" : "Welcome, " + name + "!";
    });
    lines.push("Answer: Task 3 — submit prevented; try empty vs filled name.");
    console.log(welcome.textContent);

    const todoList = document.querySelector("#todo-list");
    todoList.addEventListener("click", function (e) {
        if (e.target.tagName === "LI") {
            e.target.classList.toggle("done");
        }
    });
    const extra = document.createElement("li");
    extra.textContent = "New task (delegation)";
    todoList.appendChild(extra);
    lines.push("Answer: Bonus — delegation toggles .done on li; extra li added.");
    console.log(todoList.querySelectorAll("li").length);

    document.getElementById("out").textContent = lines.join("\n");
})();
