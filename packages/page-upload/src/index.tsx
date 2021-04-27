// Copyright 2017-2021 @canvas-ui/app-upload authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AppProps as Props } from '@canvas-ui/react-components/types';
import { useAppNavigation, useHasInstantiateWithCode } from '@canvas-ui/react-hooks';
import React, { useEffect, useMemo } from 'react';
import { Route, Switch } from 'react-router';

import Success from './Success';
import Upload from './Upload';

function UploadApp ({ basePath }: Props): React.ReactElement<Props> {
  const hasInstantiateWithCode = useHasInstantiateWithCode();
  const { navigateTo } = useAppNavigation();

  useEffect(
    (): void => {
      if (hasInstantiateWithCode) {
        navigateTo.instantiate();
      }
    },
    [hasInstantiateWithCode, navigateTo]
  );

  return (
    <main className='upload--App'>
      <Switch>
        <Route path={`${basePath}/success/:id`}>
          <Success />
        </Route>
        <Route exact>
          <Upload />
        </Route>
      </Switch>
    </main>
  );
}

export default React.memo(UploadApp);
