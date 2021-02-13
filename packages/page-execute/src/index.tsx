// Copyright 2017-2021 @canvas-ui/app-execute authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { WithLoader } from '@canvas-ui/react-components';
import { AppProps as Props } from '@canvas-ui/react-components/types';
import { useAccounts, useContracts } from '@canvas-ui/react-hooks';
import { classes } from '@canvas-ui/react-util';
import React, { useMemo } from 'react';
import { Route, Switch } from 'react-router';

import Add from './Add';
import Call from './Call';
import Contracts from './Contracts';
import { ComponentProps } from './types';

function ExecuteApp ({ basePath, className, navigateTo }: Props): React.ReactElement<Props> {
  const { allAccounts, isReady: isAccountsReady } = useAccounts();
  const { allContracts, hasContracts, isContract, isReady: isContractsReady } = useContracts();

  const componentProps = useMemo(
    (): ComponentProps => ({
      accounts: allAccounts,
      basePath,
      contracts: allContracts,
      hasContracts,
      isContract,
      navigateTo
    }),
    [allAccounts, allContracts, basePath, hasContracts, isContract, navigateTo]
  );
  const isLoading = useMemo((): boolean => !isContractsReady || !isAccountsReady, [isAccountsReady, isContractsReady]);

  return (
    <main className={classes(className, 'execute--App', isLoading && 'isLoading')}>
      <WithLoader isLoading={isLoading}>
        <Switch>
          <Route path={`${basePath}/add`}>
            <Add {...componentProps} />
          </Route>
          <Route path={`${basePath}/:address/:messageIndex?`}>
            <Call {...componentProps} />
          </Route>
          <Route exact>
            <Contracts {...componentProps} />
          </Route>
        </Switch>
      </WithLoader>
    </main>
  );
}

export default React.memo(ExecuteApp);
