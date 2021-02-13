// Copyright 2017-2021 @canvas-ui/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useApi } from '@canvas-ui/react-api';
import { BareProps } from '@canvas-ui/react-api/types';
import FormatBalance from '@canvas-ui/react-components/FormatBalance';
import { useCall } from '@canvas-ui/react-hooks';
import React from 'react';

interface Props extends BareProps {
  children?: React.ReactNode;
  label?: React.ReactNode;
}

function TotalIssuance ({ children, className = '', label }: Props): React.ReactElement<Props> {
  const { api } = useApi();
  const totalIssuance = useCall<string>(api.query.balances?.totalIssuance, []);

  return (
    <div className={className}>
      {label || ''}
      <FormatBalance value={totalIssuance}
        withSi />
      {children}
    </div>
  );
}

export default React.memo(TotalIssuance);
