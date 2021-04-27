// Copyright 2017-2021 @canvas-ui/react-store authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ApiPromise } from '@polkadot/api';
import type { Contract, ContractDocument } from './types';

import { PrivateKey } from '@textile/crypto';

import { ContractPromise } from '@polkadot/api-contract';
import { u8aToHex } from '@polkadot/util';

const USER_IDENTITY_KEY = 'user-identity';

export function publicKeyHex (identity?: PrivateKey | null): string | undefined {
  return identity ? u8aToHex(identity.pubKey) : undefined;
}

export function getPrivateKey (): PrivateKey {
  let idStr = window.localStorage.getItem(USER_IDENTITY_KEY);

  if (idStr) {
    return PrivateKey.fromString(idStr);
  } else {
    const id = PrivateKey.fromRandom();

    idStr = id.toString();
    window.localStorage.setItem(USER_IDENTITY_KEY, idStr);

    return id;
  }
}

export function createContractFromDocument (api: ApiPromise, document: ContractDocument): Contract | null {
  try {
    const contract = new ContractPromise(api, document.abi, document.address);

    return {
      api: contract,
      document
    };
  } catch (e) {
    console.error(e);

    return null;
  }
}
