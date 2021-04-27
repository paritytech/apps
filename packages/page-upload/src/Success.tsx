// Copyright 2017-2021 @canvas-ui/app-upload authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CodeDocument } from '@canvas-ui/app-db/types';

import useDatabase from '@canvas-ui/app-db/useDatabase';
import { Button, CodeCard, WithLoader } from '@canvas-ui/react-components';
import { useAppNavigation } from '@canvas-ui/react-hooks';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useTranslation } from './translate';

function Success (): React.ReactElement | null {
  const { id }: { id: string } = useParams();
  const { t } = useTranslation();
  const { navigateTo } = useAppNavigation();
  const { findCodeById } = useDatabase();
  const [code, setCode] = useState<CodeDocument | null>(null);
  const [isCodeValid, setIsCodeValid] = useState(true);

  useEffect(
    (): void => {
      findCodeById(id)
        .then((code): void => {
          setCode(code);
          setIsCodeValid(!!code);
        })
        .catch((e) => console.error(e));
    },
    [findCodeById, id]
  );

  useEffect(
    (): void => {
      if (!code && !isCodeValid) {
        navigateTo.upload();
      }
    },
    [code, isCodeValid, navigateTo]
  );

  return (
    <WithLoader isLoading={!code && isCodeValid}>
      <header>
        <h1>{t<string>('Code successfully put on chain')}</h1>
        <div className='instructions'>
          {t<string>('Your code bundle has been put succesfully in the chain’s storage. A unique code hash has been returned.')}
        </div>
      </header>
      <section>
        {code && <CodeCard
          code={code}
          onForget={navigateTo.upload}
        />}
        <Button.Group>
          <Button
            isPrimary
            label={t<string>('Instantiate This Code Bundle')}
            onClick={navigateTo.instantiateNew(id)}
          />
          <Button
            label={t<string>('Upload Another Code Bundle')}
            onClick={navigateTo.upload}
          />
        </Button.Group>
      </section>
    </WithLoader>
  );
}

export default React.memo(Success);
