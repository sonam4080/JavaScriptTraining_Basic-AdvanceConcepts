import Button, { ButtonStyles } from "./Button.js";

export function buttonSummary() {
    return "ButtonStyles.primary=" + ButtonStyles.primary + " | " + String(Button({ title: "OK" }));
}
