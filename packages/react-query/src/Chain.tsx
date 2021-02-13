// Copyright 2017-2021 @canvas-ui/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useApi } from '@canvas-ui/react-api';
import { BareProps } from '@canvas-ui/react-api/types';
import React from 'react';

interface Props extends BareProps {
  children?: React.ReactNode;
  label?: React.ReactNode;
}

function Chain({ children, className = '', label }: Props): React.ReactElement<Props> {
  const { systemChain } = useApi();

  return (
    <div className={className}>
      {label || ''}
      {systemChain}
      {children}
    </div>
  );
}

export default React.memo(Chain);
