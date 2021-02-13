// Copyright 2017-2021 @canvas-ui/app-extrinsics authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { registry, useApi } from '@canvas-ui/react-api';
import React, { useCallback } from 'react';

import { Props, RawParam } from '../types';
import ExtrinsicDisplay from './Extrinsic';

function ProposalDisplay ({ className = '', isDisabled, isError, label, onChange, onEnter, onEscape, withLabel }: Props): React.ReactElement<Props> {
  const { apiDefaultTxSudo } = useApi();
  const _onChange = useCallback(
    ({ isValid, value }: RawParam): void => {
      let proposal = null;

      if (isValid && value) {
        proposal = registry.createType('Proposal', value);
      }

      onChange &&
        onChange({
          isValid,
          value: proposal
        });
    },
    [onChange]
  );

  return (
    <ExtrinsicDisplay
      className={className}
      defaultValue={apiDefaultTxSudo}
      isDisabled={isDisabled}
      isError={isError}
      isPrivate
      label={label}
      onChange={_onChange}
      onEnter={onEnter}
      onEscape={onEscape}
      withLabel={withLabel}
    />
  );
}

export default React.memo(ProposalDisplay);
