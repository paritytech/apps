// Copyright 2017-2021 @canvas-ui/app-execute authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AppProps as Props } from '@canvas-ui/react-components/types';
import { classes } from '@canvas-ui/react-util';
import React from 'react';
import { Route, Switch } from 'react-router';

import Add from './Add';
import Call from './Call';
import Contracts from './Contracts';

function ExecuteApp ({ basePath, className }: Props): React.ReactElement<Props> {
  // const { allAccounts, isReady: isAccountsReady } = useAccounts();

  // const componentProps = useMemo(
  //   (): ComponentProps => ({
  //     // accounts: allAccounts,
  //     basePath
  //     // contracts: allContracts,
  //     // hasContracts,
  //     // isContract
  //   }),
  //   [basePath]
  // );
  // const isLoading = useMemo(
  //   (): boolean => !isContractsReady || !isAccountsReady,
  //   [isAccountsReady, isContractsReady]
  // );

  return (
    <main className={classes(className, 'execute--App')}>
      <Switch>
        <Route path={`${basePath}/add`}>
          <Add />
        </Route>
        <Route path={`${basePath}/:address/:messageIndex?`}>
          <Call />
        </Route>
        <Route exact>
          <Contracts />
        </Route>
      </Switch>
    </main>
  );
}

export default React.memo(ExecuteApp);
