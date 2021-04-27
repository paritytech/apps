// Copyright 2017-2021 @polkadot/apps authors & contributors
// and @canvas-ui/app authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Code } from '@canvas-ui/app-db';

import { ActionStatus } from '@canvas-ui/react-api/Status/types';
import { BareProps } from '@canvas-ui/react-components/types';
import { VoidFn } from '@canvas-ui/react-util/types';

export interface AppNavigation {
  instantiate: VoidFn;
  instantiateAdd: VoidFn;
  instantiateNew: (_?: string, __?: number) => VoidFn;
  instantiateSuccess: (_: string) => VoidFn;
  execute: VoidFn;
  executeAdd: VoidFn;
  executeCall: (_: string, __?: number) => VoidFn;
  upload: VoidFn;
  uploadSuccess: (_: string) => VoidFn;
}

export interface AppPaths {
  instantiate: string;
  instantiateAdd: string;
  instantiateNew: (_?: string, __?: number) => string;
  instantiateSuccess: (_: string) => string;
  execute: string;
  executeAdd: string;
  executeCall: (_: string, __?: number) => string;
  upload: string;
  uploadSuccess: (_: string) => string;
}

export interface WithBasePath {
  basePath: string;
}

export interface ComponentProps extends BareProps, WithBasePath {}

export interface AppProps extends BareProps, WithBasePath {
  onStatusChange: (status: ActionStatus) => void;
}

// interface CodeBase {
//   id: string;
//   codeHash: string;
//   name: string;
//   genesisHash: string;
//   tags: string[];
// }

// export interface Code extends CodeBase {
//   abi?: AnyJson | null;
// }

// export interface Code extends CodeBase {
//   abi: InkAbi | null;
// }

// export interface CodeStored {
//   id: string;
//   contractAbi?: InkAbi;
// }

export interface ContractJsonOld {
  genesisHash: string;
  abi: string;
  address: string;
  name: string;
}

export interface UseCodes {
  allCodes: Code[];
  hasCodes: boolean;
  updated: number;
}
