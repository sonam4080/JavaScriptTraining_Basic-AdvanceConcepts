(function () {
    const lines = [];
    const names = ["Priya", "Aarav", "Riya"];
    lines.push("Answer: map greetings : " + JSON.stringify(names.map(function (n) { return "Hello, " + n; })));
    console.log(JSON.stringify(names.map(function (n) { return "Hello, " + n; })));
    const nums = [2, 3, 4, 5, 6, 7, 8];
    lines.push("Answer: even sum : " + nums.filter(function (n) { return n % 2 === 0; }).reduce(function (a, n) { return a + n; }, 0));
    console.log(nums.filter(function (n) { return n % 2 === 0; }).reduce(function (a, n) { return a + n; }, 0));
    const arr = [3, 1, 4, 1, 5, 9, 2, 6];
    lines.push("Answer: Math.max(...arr) : " + Math.max(...arr));
    console.log(Math.max(...arr));
    lines.push("Answer: reduce max : " + arr.reduce(function (m, x) { return x > m ? x : m; }, arr[0]));
    console.log(arr.reduce(function (m, x) { return x > m ? x : m; }, arr[0]));
    function average(list) {
        return list.reduce(function (a, x) { return a + x; }, 0) / list.length;
    }
    lines.push("Answer: average([10,20,30]) : " + average([10, 20, 30]));
    console.log(average([10, 20, 30]));
    document.getElementById("out").textContent = lines.join("\n");
})();
