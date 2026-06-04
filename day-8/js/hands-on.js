(function () {
    const lines = [];
    lines.push("Task 1 — student object");
    const student = { name: "Anaya", age: 21, city: "Jaipur", course: "B.Tech", marks: [82, 88, 91] };
    lines.push("Answer: initial : " + JSON.stringify(student));
    console.log(JSON.stringify(student));
    lines.push("Answer: name, age, first mark : " + student.name + ", " + student.age + ", " + student.marks[0]);
    console.log(student.name + ", " + student.age + ", " + student.marks[0]);
    student.email = "anaya@example.com";
    student.age = 22;
    delete student.city;
    lines.push("Answer: after edits : " + JSON.stringify(student));
    console.log(JSON.stringify(student));

    lines.push("");
    lines.push("Task 2 — bankAccount");
    const bankAccount = {
        holder: "Aarav",
        balance: 5000,
        deposit: function (amount) {
            this.balance += amount;
            return this.balance;
        },
        withdraw: function (amount) {
            if (this.balance < amount) {
                return "Insufficient funds";
            }
            this.balance -= amount;
            return this.balance;
        }
    };
    const afterDeposit = bankAccount.deposit(1000);
    lines.push("Answer: deposit 1000 : " + afterDeposit);
    console.log(afterDeposit);
    const afterWithdraw2k = bankAccount.withdraw(2000);
    lines.push("Answer: withdraw 2000 : " + afterWithdraw2k);
    console.log(afterWithdraw2k);
    const afterWithdraw10k = bankAccount.withdraw(10000);
    lines.push("Answer: withdraw 10000 : " + afterWithdraw10k);
    console.log(afterWithdraw10k);

    lines.push("");
    lines.push("Task 3 — destructuring product");
    const product = { id: 101, name: "Laptop", price: 60000, brand: "Dell", stock: 5 };
    const { name: pname, price } = product;
    const { brand: make } = product;
    const { warranty = "1 year" } = product;
    lines.push("Answer: name=" + pname + ", price=" + price + ", make=" + make + ", warranty=" + warranty);
    console.log(pname, price, make, warranty);

    lines.push("");
    lines.push("Task Bonus — keys/values/entries");
    lines.push("Answer: keys : " + JSON.stringify(Object.keys(student)));
    console.log(JSON.stringify(Object.keys(student)));
    lines.push("Answer: values : " + JSON.stringify(Object.values(student)));
    console.log(JSON.stringify(Object.values(student)));
    Object.entries(student).forEach(function (kv) {
        lines.push("Answer: entry : " + kv[0] + ": " + kv[1]);
        console.log(kv[0] + ": " + kv[1]);
    });
    lines.push("Answer: property count : " + Object.keys(student).length);
    console.log(Object.keys(student).length);

    document.getElementById("out").textContent = lines.join("\n");
})();
