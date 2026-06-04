import cache from "./cache.js";

export function writeProduct(id, product) {
    cache.set("product:" + id, product);
}
