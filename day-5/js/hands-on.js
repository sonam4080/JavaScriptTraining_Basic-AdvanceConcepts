(function () {
    const lines = [];
    lines.push("Task 1 — table of 7");
    for (let i = 1; i <= 10; i++) {
        const prod = 7 * i;
        lines.push("Answer: 7 x " + i + " = " + prod);
        console.log(prod);
    }
    lines.push("Task 1 bonus — even multiples of 7 only");
    for (let i = 1; i <= 10; i++) {
        if ((7 * i) % 2 !== 0) {
            continue;
        }
        const prod = 7 * i;
        lines.push("Answer: 7 x " + i + " = " + prod);
        console.log(prod);
    }

    lines.push("");
    lines.push("Task 2 — sum 1..100 with while");
    let sum = 0;
    let j = 1;
    while (j <= 100) {
        sum += j;
        j++;
    }
    lines.push("Answer: sum 1..100 : " + sum);
    console.log(sum);
    let oddSum = 0;
    let k = 1;
    while (k <= 100) {
        oddSum += k;
        k += 2;
    }
    lines.push("Answer: bonus odd 1..99 : " + oddSum);
    console.log(oddSum);

    lines.push("");
    lines.push("Task 3 — for...of names");
    const names = ["Priya", "Aarav", "Riya", "Kabir", "Anaya"];
    names.forEach(function (name) {
        lines.push("Answer: name : " + name);
        console.log(name);
    });
    let longCount = 0;
    for (const name of names) {
        if (name.length > 4) {
            longCount++;
        }
    }
    lines.push("Answer: count length > 4 : " + longCount);
    console.log(longCount);
    lines.push("Task 3 bonus — chars of Jaipur");
    for (const c of "Jaipur") {
        lines.push("Answer: char : " + c);
        console.log(c);
    }

    lines.push("");
    lines.push("Task Bonus — for...in student");
    const student = { name: "Anaya", age: 21, city: "Jaipur", course: "B.Tech" };
    let propCount = 0;
    for (const key in student) {
        lines.push("Answer: " + key + " : " + student[key]);
        console.log(student[key]);
        propCount++;
    }
    lines.push("Answer: property count : " + propCount);
    console.log(propCount);

    document.getElementById("out").textContent = lines.join("\n");
})();
