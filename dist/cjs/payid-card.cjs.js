'use strict';

const index = require('./index-9e25d712.js');

index.patchBrowser().then(options => {
  return index.bootstrapLazy([["payid-card.cjs",[[1,"payid-card",{"payid":[1],"tolerant":[4],"payIDLogo":[32],"payIDClient":[32],"resolvedPayID":[32],"showCard":[32]}]]]], options);
});
