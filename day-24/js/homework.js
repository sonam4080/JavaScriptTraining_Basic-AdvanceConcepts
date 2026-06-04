import { add, shout, version } from "./homeworkBarrel.js";

const lines = [];

lines.push("1 — Barrel: math/add via index + homeworkHelpers (export *)");
var sum141 = add(1, 40);
lines.push("Answer: add(1, 40) : " + sum141);
console.log(sum141);
var sh = shout("hi");
lines.push("Answer: shout('hi') : " + sh);
console.log(sh);
lines.push("Answer: version : " + version);
console.log(version);

lines.push("");
lines.push("2 — Dynamic import (same pattern as lesson)");
const lazy = await import("./heavy.js");
var computed = lazy.compute();
lines.push("Answer: lazy.compute() : " + computed);
console.log(computed);

lines.push("");
lines.push("3 — Circular modules (circLeft / circRight): run in devtools console if needed; typical symptom is undefined at top-level read.");
lines.push("Refactor fix: move shared constants to circShared.js, or read the other binding inside a function after modules finish evaluating.");

lines.push("");
lines.push("4 — Vite/Webpack (write your own three bullets after reading the official docs).");

lines.push("");
lines.push("5 — javascript.info modules chapters (read in browser).");

lines.push("");
lines.push("6 — Bonus: V8 blog on modules (read).");

document.getElementById("out").textContent = lines.join("\n");
