// Copyright 2017-2021 @canvas-ui/app-instantiate authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useDatabase } from '@canvas-ui/app-db';
import { WithLoader } from '@canvas-ui/react-components';
import { AppProps as Props } from '@canvas-ui/react-components/types';
import { useHasInstantiateWithCode } from '@canvas-ui/react-hooks';
import React from 'react';
import { Route, Switch } from 'react-router';

import Add from './Add';
import Codes from './Codes';
import New from './New';
import NewFromCode from './NewFromCode';
import Success from './Success';

function InstantiateApp ({ basePath }: Props): React.ReactElement<Props> {
  const { isDbReady } = useDatabase();
  const hasInstantiateWithCode = useHasInstantiateWithCode();

  // const [isLoading, setIsLoading] = useState(true);
  // const [allCodes, setAllCodes] = useState<Code[]>([]);
  // const [updated, setUpdated] = useState(Date.now());

  // useEffect(
  //   (): void => {
  //     async function loadCodes (): Promise<Code[]> {
  //       const codes = await findCodes();

  //       return codes;
  //     }

  //     loadCodes()
  //       .then((codes) => {
  //         setAllCodes(codes);
  //         setIsLoading(false);
  //         setUpdated(Date.now());
  //       }).catch((e) => {
  //         setIsLoading(false);
  //         console.error(e);
  //       });
  //   },
  //   [findCodes]
  // );

  return (
    <main className='instantiate--App'>
      <WithLoader isLoading={!isDbReady}>
        <Switch>
          <Route path={`${basePath}/new/:id/:index?`}>
            <New />
          </Route>
          {hasInstantiateWithCode && (
            <Route path={`${basePath}/new`}>
              <NewFromCode />
            </Route>
          )}
          <Route path={`${basePath}/add`}>
            <Add />
          </Route>
          <Route path={`${basePath}/success/:address`}>
            <Success />
          </Route>
          <Route exact>
            <Codes />
          </Route>
        </Switch>
      </WithLoader>
    </main>
  );
}

export default React.memo(InstantiateApp);
