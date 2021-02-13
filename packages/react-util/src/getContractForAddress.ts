// Copyright 2017-2021 @canvas-ui/app-contracts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { getContractAbi } from '@canvas-ui/react-api';
import { StringOrNull } from '@canvas-ui/react-api/types';

import { ApiPromise } from '@polkadot/api';
import { ContractPromise as Contract } from '@polkadot/api-contract';

export default function getContractForAddress(api: ApiPromise, address: StringOrNull): Contract | null {
  if (!address) {
    return null;
  } else {
    const abi = getContractAbi(address);

    return abi ? new Contract(api, abi, address) : null;
  }
}
