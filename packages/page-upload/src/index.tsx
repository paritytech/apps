// Copyright 2017-2021 @canvas-ui/app-execute authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useCodes } from '@canvas-ui/page-contracts';
import { AppProps as Props } from '@canvas-ui/react-components/types';
import React, { useMemo } from 'react';
import { Route, Switch } from 'react-router';

import Add from './Add';
import Success from './Success';
import { ComponentProps } from './types';
import Upload from './Upload';

function UploadApp({ basePath, navigateTo }: Props): React.ReactElement<Props> {
  const useCodesHook = useCodes();
  const componentProps = useMemo((): ComponentProps => ({ ...useCodesHook, basePath, navigateTo }), [useCodesHook, basePath, navigateTo]);

  return (
    <main className="upload--App">
      <Switch>
        <Route path={`${basePath}/add`}>
          <Add {...componentProps} />
        </Route>
        <Route path={`${basePath}/success/:id`}>
          <Success {...componentProps} />
        </Route>
        <Route exact>
          <Upload {...componentProps} />
        </Route>
      </Switch>
    </main>
  );
}

export default React.memo(UploadApp);
