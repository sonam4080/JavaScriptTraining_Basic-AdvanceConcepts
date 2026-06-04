(function () {
    "use strict";
    const lines = [];

    document.getElementById("out").textContent = lines.join("\n");

    const fakeFetch = function (label, ms) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve(label);
            }, ms);
        });
    };
    Promise.all([fakeFetch("a", 10), fakeFetch("b", 15), fakeFetch("c", 5)]).then(function (results) {
        const joined = results.join(",");
        lines.push("Answer: Promise.all results : " + joined);
        console.log(joined);
        document.getElementById("out").textContent = lines.join("\n");
    });
})();
