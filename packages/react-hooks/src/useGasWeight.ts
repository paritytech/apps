// Copyright 2017-2021 @canvas-ui/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Weight } from '@polkadot/types/interfaces';
import type { UseWeight } from './types';

import { useApi } from '@canvas-ui/react-api';
import BN from 'bn.js';
import { useCallback, useMemo, useState } from 'react';

import { BN_TEN, BN_ZERO } from '@polkadot/util';

import useBlockTime from './useBlockTime';

const BN_MILLION = new BN(1_000_000);

export default function useWeight(): UseWeight {
  const { api } = useApi();
  const [blockTime] = useBlockTime();
  const [megaGas, _setMegaGas] = useState<BN>(
    (api.consts.system.blockWeights ? api.consts.system.blockWeights.perClass.normal.maxExtrinsic : (api.consts.system.maximumBlockWeight as Weight))
      .div(BN_MILLION)
      .div(BN_TEN)
  );
  const [isEmpty, setIsEmpty] = useState(false);

  const setMegaGas = useCallback(
    (value?: BN | undefined) =>
      _setMegaGas(
        value ||
          (api.consts.system.blockWeights ? api.consts.system.blockWeights.perClass.normal.maxExtrinsic : (api.consts.system.maximumBlockWeight as Weight))
            .div(BN_MILLION)
            .div(BN_TEN)
      ),
    [api]
  );

  return useMemo((): UseWeight => {
    let executionTime = 0;
    let percentage = 0;
    let weight = BN_ZERO;
    let isValid = false;

    if (megaGas) {
      weight = megaGas.mul(BN_MILLION);
      executionTime = weight
        .muln(blockTime)
        .div(api.consts.system.blockWeights ? api.consts.system.blockWeights.perClass.normal.maxExtrinsic : (api.consts.system.maximumBlockWeight as Weight))
        .toNumber();
      percentage = (executionTime / blockTime) * 100;

      // execution is 2s of 6s blocks, i.e. 1/3
      executionTime = executionTime / 3000;
      isValid = !megaGas.isZero() && percentage < 65;
    }

    return {
      executionTime,
      isEmpty,
      isValid: isEmpty || isValid,
      megaGas: megaGas || BN_ZERO,
      percentage,
      setIsEmpty,
      setMegaGas,
      weight,
      weightToString: weight.toString()
    };
  }, [api, blockTime, isEmpty, megaGas, setIsEmpty, setMegaGas]);
}
