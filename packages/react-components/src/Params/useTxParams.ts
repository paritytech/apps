// Copyright 2017-2021 @canvas-ui/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { RawParams, UseTxParamsHook } from '@canvas-ui/react-components/types';
import { useEffect, useState } from 'react';

import { TypeDef } from '@polkadot/types/types';

import createValues from './values';

export default function useTxParams(source: { type: TypeDef }[]): UseTxParamsHook {
  const [params, setParams] = useState(source);
  const [values, setValues] = useState<RawParams>(createValues(params));

  useEffect((): void => {
    setParams(source);
    setValues(createValues(source));
  }, [source]);

  return [params, values, setValues];
}
