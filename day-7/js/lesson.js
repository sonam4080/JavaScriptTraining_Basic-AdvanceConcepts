(function () {
    const lines = [];
    const nums = [1, 2, 3];
    lines.push("original: " + JSON.stringify(nums));
    const doubled = nums.map(function (n) {
        return n * 2;
    });
    lines.push("map x2: " + JSON.stringify(doubled));
    lines.push("spread copy: " + JSON.stringify([...nums]));
    document.getElementById("out").textContent = lines.join("\n");
    console.log(lines.join("\n"));
})();
