(function () {
    const lines = [];

    const titleEl = document.querySelector("#title");
    titleEl.textContent = "Hello, Student!";
    titleEl.style.color = "crimson";
    titleEl.style.fontFamily = "Georgia, serif";
    lines.push("Answer: Task 1 — #title text is now \"" + titleEl.textContent + "\" with color and font set (see page).");
    console.log(titleEl.textContent);

    document.body.classList.toggle("dark");
    document.body.classList.toggle("dark");
    lines.push(
        "Answer: Task 2 — after two toggles, body has class 'dark'? " + document.body.classList.contains("dark")
    );
    console.log(document.body.classList.contains("dark"));

    const list = document.querySelector("#names-list");
    const names = ["Priya", "Aarav", "Riya", "Kabir"];
    names.forEach(function (name, index) {
        const li = document.createElement("li");
        li.textContent = index + 1 + ". " + name;
        li.className = "name-item";
        list.appendChild(li);
    });
    lines.push("Answer: Task 3 — appended " + names.length + " list items (see #names-list).");
    console.log(names.length);

    const cards = document.querySelector("#cards");
    const product = { name: "Laptop", price: 60000, brand: "Dell" };
    const card = document.createElement("div");
    card.className = "card";
    const h3 = document.createElement("h3");
    h3.textContent = product.name;
    const p = document.createElement("p");
    p.textContent = product.brand;
    const span = document.createElement("span");
    span.textContent = "₹" + product.price;
    card.appendChild(h3);
    card.appendChild(p);
    card.appendChild(span);
    cards.appendChild(card);
    lines.push("Answer: Bonus — one product card under #cards.");
    console.log(cards.children.length);

    document.getElementById("out").textContent = lines.join("\n");
})();
