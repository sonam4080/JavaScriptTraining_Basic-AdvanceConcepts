(function () {
    "use strict";

    function debounce(fn, delay) {
        let timer;
        return function () {
            const args = arguments;
            const ctx = this;
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(ctx, args);
            }, delay);
        };
    }

    function throttle(fn, delay) {
        let last = 0;
        return function () {
            const now = Date.now();
            if (now - last < delay) {
                return;
            }
            last = now;
            fn.apply(this, arguments);
        };
    }

    function safeText(html) {
        return String(html).replace(/<[^>]*>/g, "").trim();
    }

    const lines = [];

    lines.push("Task 2 — throttle (10 tight calls, delay 100ms)");
    let tCount = 0;
    const tfn = throttle(function () {
        tCount++;
    }, 100);
    for (let i = 0; i < 10; i++) {
        tfn();
    }
    lines.push("Answer: throttle fires : " + tCount);
    console.log(tCount);

    lines.push("");
    lines.push("Task 3 — memory leak labels");
    lines.push("Answer: (a) setInterval no clear on unmount : LEAK");
    console.log("LEAK");
    lines.push("Answer: (b) listener on removed btn : LEAK");
    console.log("LEAK");
    lines.push("Answer: (c) undeclared msg = ... : LEAK");
    console.log("LEAK");
    lines.push("Answer: (d) useEffect cleanup clearInterval : SAFE");
    console.log("SAFE");

    lines.push("");
    lines.push("Bonus — safeText (regex strip, no innerHTML assign)");
    const raw = '<img src=x onerror="alert(1)"> hello';
    const plain = safeText(raw);
    lines.push("Answer: safeText result : " + plain);
    console.log(plain);

    const outEl = document.getElementById("out");
    outEl.textContent = lines.join("\n");

    const searchLog = [];
    const handleSearch = debounce(function (q) {
        searchLog.push(q);
    }, 300);

    [0, 50, 100, 150, 200].forEach(function (ms, i) {
        setTimeout(function () {
            handleSearch("k" + (i + 1));
        }, ms);
    });
    setTimeout(function () {
        handleSearch("x1");
    }, 700);
    setTimeout(function () {
        handleSearch("x2");
    }, 750);

    setTimeout(function () {
        const head = [
            "Task 1 — debounce (5 keys 50ms apart, 500ms gap, 2 keys)",
            "Answer: handleSearch call count : " + searchLog.length
        ];
        console.log(searchLog.length);
        const payloadLine = "Answer: handleSearch payloads : " + JSON.stringify(searchLog);
        head.push(payloadLine);
        console.log(JSON.stringify(searchLog));
        outEl.textContent = head.concat(["", ""]).concat(lines).join("\n");
    }, 1100);
})();
