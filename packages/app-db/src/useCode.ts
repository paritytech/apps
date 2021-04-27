// Copyright 2017-2021 @canvas-ui/react-store authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CodeDocument } from './types';

import { useEffect, useState } from 'react';

import useDatabase from './useDatabase';

type UseCode = [CodeDocument | null, boolean]

export default function useCode (id: string): UseCode {
  const { findCodeById, isDbReady } = useDatabase();
  const [isInvalid, setIsInvalid] = useState(false);
  const [code, setCode] = useState<CodeDocument | null>(null);

  useEffect(
    (): void => {
      isDbReady && findCodeById(id)
        .then((code): void => {
          setCode(code);
          setIsInvalid(!code);
        })
        .catch((e) => {
          console.error(e);
        });
    },
    [isDbReady, id, findCodeById]
  );

  return [code, isInvalid];
}
