(function () {
    "use strict";
    const lines = [];

    function take(iterable, n) {
        const it = iterable[Symbol.iterator]();
        const out = [];
        for (let i = 0; i < n; i++) {
            const step = it.next();
            if (step.done) {
                break;
            }
            out.push(step.value);
        }
        return out;
    }

    lines.push("1 — chunked(arr, size)");
    function* chunked(arr, size) {
        for (let i = 0; i < arr.length; i += size) {
            yield arr.slice(i, i + size);
        }
    }
    const ch = [...chunked([1, 2, 3, 4, 5], 2)];
    lines.push("Answer: chunked : " + JSON.stringify(ch));
    console.log(JSON.stringify(ch));

    lines.push("");
    lines.push("2 — primes() + take(primes(), 10)");
    function* primes() {
        let n = 2;
        while (true) {
            let prime = true;
            for (let d = 2; d * d <= n; d++) {
                if (n % d === 0) {
                    prime = false;
                    break;
                }
            }
            if (prime) {
                yield n;
            }
            n++;
        }
    }
    const firstPrimes = take(primes(), 10);
    lines.push("Answer: take(primes(), 10) : " + JSON.stringify(firstPrimes));
    console.log(JSON.stringify(firstPrimes));

    lines.push("");
    lines.push("3 — zip(a, b), unequal lengths");
    function* zip(a, b) {
        const ia = a[Symbol.iterator]();
        const ib = b[Symbol.iterator]();
        while (true) {
            const na = ia.next();
            const nb = ib.next();
            if (na.done || nb.done) {
                break;
            }
            yield [na.value, nb.value];
        }
    }
    const zipped = [...zip([1, 2, 3], ["a", "b"])];
    lines.push("Answer: zip : " + JSON.stringify(zipped));
    console.log(JSON.stringify(zipped));

    lines.push("");
    lines.push("4 — fibonacci + take");
    function* fib() {
        let a = 0;
        let b = 1;
        while (true) {
            yield a;
            const t = a + b;
            a = b;
            b = t;
        }
    }
    const fib10 = take(fib(), 10);
    lines.push("Answer: take(fib(), 10) : " + JSON.stringify(fib10));
    console.log(JSON.stringify(fib10));

    lines.push("");
    lines.push("5 — reading: javascript.info/iterable and javascript.info/generators (do in browser).");

    lines.push("");
    lines.push("6 — Bonus: for await...of needs async function* + timer; try in a small Node or Vite snippet.");

    document.getElementById("out").textContent = lines.join("\n");
})();
