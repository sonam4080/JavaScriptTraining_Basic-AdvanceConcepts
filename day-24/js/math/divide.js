export function divide(a, b) {
    if (b === 0) {
        throw new Error("divide by zero");
    }
    return a / b;
}
