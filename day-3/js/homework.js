(function () {
    const lines = [];
    lines.push("Task — payable with -= then *= 1.18");
    const total = 100;
    const discount = 15;
    let payable = total;
    payable -= discount;
    payable *= 1.18;
    lines.push("Answer: payable : " + payable.toFixed(2));
    console.log(payable.toFixed(2));
    lines.push("Answer: null === undefined : " + (null === undefined));
    console.log(null === undefined);
    lines.push("Answer: NaN === NaN : " + (NaN === NaN));
    console.log(NaN === NaN);
    document.getElementById("out").textContent = lines.join("\n");
})();
