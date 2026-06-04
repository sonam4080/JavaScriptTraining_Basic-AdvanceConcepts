import cache from "./cache.js";

export function writeUser(id, user) {
    cache.set("user:" + id, user);
}
