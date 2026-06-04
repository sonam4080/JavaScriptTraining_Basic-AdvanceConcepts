/** Ignore extra curriculum clicks until navigation finishes (avoids overlapping loads). */
(function () {
    var outline = document.querySelector(".site-outline");
    if (!outline) {
        return;
    }

    var fallbackTimer;

    outline.addEventListener(
        "click",
        function (e) {
            if (
                e.button !== 0 ||
                e.metaKey ||
                e.ctrlKey ||
                e.shiftKey ||
                e.altKey
            ) {
                return;
            }
            var a = e.target.closest("a");
            if (!a || !a.getAttribute("href")) {
                return;
            }

            outline.setAttribute("aria-busy", "true");
            outline.style.pointerEvents = "none";
            document.documentElement.style.cursor = "wait";

            window.clearTimeout(fallbackTimer);
            fallbackTimer = window.setTimeout(function () {
                outline.removeAttribute("aria-busy");
                outline.style.pointerEvents = "";
                document.documentElement.style.cursor = "";
            }, 12000);
        },
        true
    );
})();
