// Copyright 2017-2021 @canvas-ui/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import getAddressMeta from '@canvas-ui/react-api/getAddressMeta';

import { KeyringItemType } from '@polkadot/ui-keyring/types';

export default function getAddressTags(
  address: string,
  type: KeyringItemType | null = null
): string[] {
  return (getAddressMeta(address, type).tags as string[]) || [];
}
