// Copyright 2017-2021 @canvas-ui/app-contracts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useApi } from '@canvas-ui/react-api';
import { StringOrNull } from '@canvas-ui/react-api/types';
import { useMemo } from 'react';

import { ContractPromise as Contract } from '@polkadot/api-contract';
import keyring from '@polkadot/ui-keyring';

export default function useContract (address: StringOrNull): Contract | null {
  const { api } = useApi();

  return useMemo((): Contract | null => {
    if (!address) {
      return null;
    }

    try {
      const pair = keyring.getAddress(address, 'contract');

      if (!pair) {
        throw new Error();
      }

      const data = pair?.meta.contract?.abi;

      return data ? new Contract(api, data, address) : null;
    } catch (error) {
      return null;
    }
  }, [address, api]);
}
