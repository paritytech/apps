// Copyright 2017-2021 @canvas-ui/app-execute authors & contributors
// SPDX-License-Identifier: Apache-2.0

export interface WithBasePath {
  basePath: string;
}

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
