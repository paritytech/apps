// Copyright 2017-2021 @polkadot/app-config authors & contributors
// and @canvas-ui/app-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

// structs need to be in order
/* eslint-disable sort-keys */

export default {
  Difficulty: 'U256',
  DifficultyAndTimestamp: {
    difficulty: 'Difficulty',
    timestamp: 'Moment'
  },
  Era: {
    genesisBlockHash: 'H256',
    finalBlockHash: 'H256',
    finalStateRoot: 'H256'
  }
};
