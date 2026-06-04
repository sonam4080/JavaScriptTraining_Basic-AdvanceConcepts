(function () {
    const lines = [];
    const person = { first: "Priya", last: "Sharma", city: "Jaipur" };
    const full = `${person.first} ${person.last} from ${person.city}`;
    lines.push("Answer: template full name : " + full);
    console.log(full);
    const arr = [1, 2, 3, 4, 5, 6];
    const [head, ...tail] = arr;
    lines.push("Answer: head : " + head + ", tail : " + JSON.stringify(tail));
    console.log(head);
    console.log(JSON.stringify(tail));
    function multiply(...nums) {
        return nums.reduce(function (a, n) {
            return a * n;
        }, 1);
    }
    lines.push("Answer: multiply(2,3,4) : " + multiply(2, 3, 4));
    console.log(multiply(2, 3, 4));
    const base = { a: 1, b: 2 };
    const next = { ...base, b: 99 };
    lines.push("Answer: original b : " + base.b + ", spread copy b : " + next.b);
    console.log(base.b);
    console.log(next.b);
    document.getElementById("out").textContent = lines.join("\n");
})();
