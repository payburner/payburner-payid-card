import { a as patchEsm, b as bootstrapLazy } from './index-0f689585.js';
var defineCustomElements = function (win, options) { return patchEsm().then(function () {
    return bootstrapLazy([["payid-card", [[1, "payid-card", { "payid": [1], "tolerant": [4], "payIDLogo": [32], "payIDClient": [32], "resolvedPayID": [32], "showCard": [32] }]]]], options);
}); };
export { defineCustomElements };
