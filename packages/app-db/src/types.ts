// Copyright 2017-2021 @canvas-ui/app-db authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { VoidFn } from '@canvas-ui/react-util/types';
import type { PrivateKey } from '@textile/hub';
import type { ContractPromise } from '@polkadot/api-contract';
import type { AnyJson } from '@polkadot/types/types';

import { Database } from '@textile/threaddb';

export interface DbProps {
  db: Database;
  identity: PrivateKey | null;
  isDbReady: boolean;
}

interface Document {
  _id?: string;
}

export interface UserDocument extends Document {
  codeBundles: string[];
  contracts: string[];
  publicKey: string,
  email?: string,
  name?: string
}

export interface CodeDocument extends Document {
  blockOneHash?: string;
  codeHash: string;
  genesisHash: string;
  abi?: AnyJson | null
  id: string;
  name: string;
  owner?: string;
  tags?: string[];
}

export interface ContractDocument extends Document {
  abi: AnyJson;
  address: string;
  blockOneHash?: string;
  genesisHash: string;
  name: string;
  owner?: string;
  tags?: string[];
}

export interface Contract {
  document: ContractDocument,
  api: ContractPromise
}

export interface UseCodes {
  allCodes: CodeDocument[];
  hasCodes: boolean;
  isLoading: boolean;
  refreshCodes: VoidFn;
  updated: number;
}

export interface UseContracts {
  allContracts: Contract[];
  fetchContract: (_: string) => Promise<Contract | null>;
  hasContracts: boolean;
  isContract: (_: string) => Promise<boolean>;
  isLoading: boolean;
  refreshContracts: VoidFn;
  updated: number;
}
