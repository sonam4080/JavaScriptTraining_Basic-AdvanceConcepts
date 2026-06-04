(function () {
    const lines = [];
    const p = document.getElementById("hw-text");
    p.textContent = "Plain text once";
    lines.push("Answer: Task 1 step 1 — paragraph textContent : " + JSON.stringify(p.textContent));
    console.log(JSON.stringify(p.textContent));
    p.innerHTML = "With <strong>bold</strong> inside";
    lines.push("Answer: Task 1 step 2 — innerHTML set (paragraph shows bold in DOM).");
    p.textContent = "Back to plain.";
    lines.push("Answer: Task 1 step 3 — final textContent : " + JSON.stringify(p.textContent));
    console.log(JSON.stringify(p.textContent));

    const items = document.querySelectorAll("#hw-list li");
    for (let i = 0; i < items.length; i++) {
        if (i % 2 === 0) {
            items[i].classList.add("even");
        }
    }
    lines.push("Answer: Task 2 — class 'even' on indices 0,2,4 (inspect li elements).");
    console.log(items.length);

    const btn = document.createElement("button");
    btn.type = "button";
    btn.id = "hw-dynamic-btn";
    btn.className = "hw-btn";
    btn.textContent = "Click me";
    document.querySelector("#hw-cards").before(btn);
    lines.push("Answer: Task 3 — button id hw-dynamic-btn inserted before #hw-cards.");
    console.log(btn.id);

    const products = [
        { name: "Mouse", price: 800 },
        { name: "Keyboard", price: 2500 },
        { name: "Monitor", price: 12000 }
    ];
    const host = document.getElementById("hw-cards");
    products.forEach(function (prod) {
        const c = document.createElement("div");
        c.className = "card";
        c.textContent = prod.name + " — ₹" + prod.price;
        host.appendChild(c);
    });
    lines.push("Answer: Task 4 — three cards appended: " + products.map(function (x) { return x.name; }).join(", "));
    console.log(products.map(function (x) { return x.name; }).join(", "));

    document.getElementById("out").textContent = lines.join("\n");
})();
