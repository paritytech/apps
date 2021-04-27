// Copyright 2017-2021 @canvas-ui/app-instantiate authors & contributors
// SPDX-License-Identifier: Apache-2.0

// import type { ComponentProps as Props } from '@canvas-ui/react-components/types';

import { useContract } from '@canvas-ui/app-db';
import { Button, ContractCard, WithLoader } from '@canvas-ui/react-components';
import { useAppNavigation } from '@canvas-ui/react-hooks';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useTranslation } from './translate';

function Success (): React.ReactElement | null {
  const { t } = useTranslation();
  const { address }: { address: string } = useParams();
  const { navigateTo } = useAppNavigation();
  const [contract, isInvalid] = useContract(address);

  useEffect(
    (): void => {
      if (isInvalid) {
        navigateTo.instantiate();
      }
    },
    [isInvalid, navigateTo]
  );

  return (
    <WithLoader isLoading={!contract && !isInvalid}>
      <header>
        <h1>{t<string>('Contract successfully instantiated')}</h1>
        <div className='instructions'>
          {t<string>('Your contract has been successfully instantiated on chain.')}
        </div>
      </header>
      <section>
        {contract && <ContractCard
          contract={contract}
        />}
        <Button.Group>
          <Button
            isPrimary
            label={t<string>('Execute Contract')}
            onClick={navigateTo.executeCall(address)}
          />
          <Button
            label={t<string>('Instantiate Another Contract')}
            onClick={navigateTo.instantiate}
          />
        </Button.Group>
      </section>
    </WithLoader>
  );
}

export default React.memo(Success);
