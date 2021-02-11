// Copyright 2017-2021 @canvas-ui/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import Balance  from './BalanceParent';
import FormatBalance from './FormatBalance';
import { classes } from '@canvas-ui/react-util';
import BN from 'bn.js';
import React from 'react';

import { AccountId, AccountIndex, Address } from '@polkadot/types/interfaces';
import { BN_ZERO } from '@polkadot/util';

import { BareProps } from './types';

export interface RenderProps extends BareProps {
  className ?: string;
  label ?: React.ReactNode;
  value ?: BN | BN[];
}

export interface Props extends BareProps {
  balance ?: BN | BN[];
  label ?: React.ReactNode;
  params ?: AccountId | AccountIndex | Address | string | Uint8Array | null;
  withLabel ?: boolean;
}

export function renderProvided ({ className = '', label, value } : RenderProps) : React.ReactNode {
  let others : undefined | React.ReactNode;

  if (Array.isArray(value)) {
    const totals = value.filter((_, index) : boolean => index !== 0);
    const total = totals.reduce((total, value) : BN => total.add(value), BN_ZERO).gtn(0);

    if (total) {
      others = totals.map(
        (balance, index) : React.ReactNode => <FormatBalance key={index}
          value={balance} />
      );
    }
  }

  return (
    <FormatBalance
      className={classes('ui--Balance', className)}
      label={label}
      value={Array.isArray(value) ? value[0] : value}
    >
      {others && <span>&nbsp;(+{others})</span>}
    </FormatBalance>
  );
}

function BalanceDisplay (props : Props) : React.ReactElement<Props> | null {
  const { balance, className = '', label, params } = props;

  if (!params) {
    return null;
  }

  return balance
    ? (
      <>{renderProvided({ className, label, value: balance })}</>
    )
    : (
      <Balance className={classes('ui--Balance', className)}
        label={label}
        params={params} />
    );
}

export default React.memo(BalanceDisplay);
