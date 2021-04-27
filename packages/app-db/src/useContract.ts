// Copyright 2017-2021 @canvas-ui/react-store authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Contract } from './types';

import { useApi } from '@canvas-ui/react-hooks';
import { useEffect, useState } from 'react';

import useDatabase from './useDatabase';
import { createContractFromDocument } from './util';

type UseCode = [Contract | null, boolean]

export default function useContract (address?: string): UseCode {
  const { api, isApiReady } = useApi();
  const { findContractByAddress, isDbReady } = useDatabase();
  const [isInvalid, setIsInvalid] = useState(false);
  const [contract, setContract] = useState<Contract | null>(null);

  useEffect(
    (): void => {
      if (!address) {
        setIsInvalid(true);

        return;
      }

      isApiReady && isDbReady && findContractByAddress(address)
        .then((contractDocument): void => {
          contractDocument && setContract(createContractFromDocument(api, contractDocument));
          setIsInvalid(!contractDocument);
        })
        .catch((e) => {
          console.error(e);
        });
    },
    [address, api, isApiReady, findContractByAddress, isDbReady]
  );

  return [contract, isInvalid];
}
