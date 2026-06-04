import { add, multiply, divide } from "./math/index.js";
import { count, inc } from "./lessonCounter.js";

const lines = [];

lines.push("Topic 1 — Named exports via barrel (math/index.js)");
lines.push("add(2, 3) = " + add(2, 3) + "; multiply(2, 4) = " + multiply(2, 4));
lines.push("divide(9, 3) = " + divide(9, 3));

lines.push("");
lines.push("Topic 2 — Namespace-style object (like import * as u)");
const u = { a: 1, b: 2 };
lines.push("u.a + u.b = " + (u.a + u.b) + "; u.c is " + u.c + " (undefined)");

lines.push("");
lines.push("Topic 5 — Live binding (export let count)");
lines.push("count before inc → " + count);
inc();
lines.push("count after inc → " + count);

lines.push("");
lines.push("Topic 4 — Dynamic import()");
const heavy = await import("./heavy.js");
lines.push("await import('./heavy.js') → " + heavy.compute());

lines.push("");
lines.push("Topic 3 / 6 / 7 — Barrels, circular deps, bundlers: see student doc + homework.");

document.getElementById("out").textContent = lines.join("\n");
console.log(lines.join("\n"));
