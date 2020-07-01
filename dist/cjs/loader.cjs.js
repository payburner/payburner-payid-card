'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-9e25d712.js');

const defineCustomElements = (win, options) => index.patchEsm().then(() => {
  return index.bootstrapLazy([["payid-card.cjs",[[1,"payid-card",{"payid":[1],"tolerant":[4],"payIDLogo":[32],"payIDClient":[32],"resolvedPayID":[32],"showCard":[32]}]]]], options);
});

exports.defineCustomElements = defineCustomElements;
