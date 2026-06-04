(function () {
    const lines = [];
    function kmToMiles(km) {
        return km * 0.621;
    }
    function gstAmount(price, rate) {
        const r = rate === undefined ? 18 : rate;
        return (price * r) / 100;
    }
    function fullName(first, last) {
        return first + " " + last;
    }
    function isAdult(age) {
        return age >= 18;
    }
    lines.push("Answer: kmToMiles(10) : " + kmToMiles(10));
    console.log(kmToMiles(10));
    lines.push("Answer: gstAmount(1000) : " + gstAmount(1000));
    console.log(gstAmount(1000));
    lines.push("Answer: gstAmount(1000, 12) : " + gstAmount(1000, 12));
    console.log(gstAmount(1000, 12));
    lines.push('Answer: fullName("Priya","Sharma") : ' + fullName("Priya", "Sharma"));
    console.log(fullName("Priya", "Sharma"));
    lines.push("Answer: isAdult(17) : " + isAdult(17) + ", isAdult(21) : " + isAdult(21));
    console.log(isAdult(17));
    console.log(isAdult(21));
    document.getElementById("out").textContent = lines.join("\n");
})();
