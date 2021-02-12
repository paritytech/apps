// Copyright 2017-2021 @canvas-ui/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import getAddressMeta from '@canvas-ui/react-api/getAddressMeta';

import { KeyringItemType } from '@polkadot/ui-keyring/types';

import toShortAddress from './toShortAddress';

// isName, isDefault, name
export default function getAddressName(address: string, type: KeyringItemType | null = null, defaultName?: string): [boolean, boolean, string] {
  const meta = getAddressMeta(address, type);

  return meta.name ? [false, false, meta.name.toUpperCase()] : defaultName ? [false, true, defaultName.toUpperCase()] : [true, false, toShortAddress(address)];
}
