// Copyright 2017-2021 @canvas-ui/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

import createRoutes from '@canvas-ui/apps-routing';
import { Route } from '@canvas-ui/apps-routing/types';
import { useApi } from '@canvas-ui/react-api';
import StatusContext from '@canvas-ui/react-api/Status/Context';
import { ErrorBoundary, GuideModal, Icon, WithLoader } from '@canvas-ui/react-components';
import { ELEV_3_CSS } from '@canvas-ui/react-components/styles/constants';
import { classes } from '@canvas-ui/react-util';
import React, { Suspense, useCallback, useContext, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import store from 'store';
import styled from 'styled-components';

import HelpWidget from '../HelpWidget';
import { useTranslation } from '../translate';
import useAppNavigation from '../useAppNavigation';
import NotFound from './NotFound';
import Status from './Status';

interface Props {
  className?: string;
}

const sawGuideKey = 'sawGuideKey';

const NOT_FOUND: Route = {
  Component: NotFound,
  display: {
    needsApi: undefined
  },
  isIgnored: false,
  name: 'unknown',
  text: 'Unknown'
};

function Content({ className }: Props): React.ReactElement<Props> {
  const location = useLocation();
  const { t } = useTranslation();
  const { isApiConnected, isApiReady } = useApi();
  const navigateTo = useAppNavigation();
  const { queueAction, stqueue, txqueue } = useContext(StatusContext);
  const {
    Component,
    display: { needsApi },
    name
  } = useMemo((): Route => {
    const app = location.pathname.slice(1) || '';
    const found = createRoutes(t).find((route) => !!(route && app.startsWith(route.name)));

    return found || NOT_FOUND;
  }, [location, t]);

  const setSawGuide = useCallback((): void => {
    store.set(sawGuideKey, true);
  }, []);

  if (!isApiConnected && name !== 'settings') {
    return (
      <div className={className}>
        <div className="disconnected">
          <div>
            <Icon icon="warning-circle" />
            {t<string>('You are not connected to a node.')}
            <br />
            {t<string>('Ensure that your node is running and that your Websocket endpoint is reachable.')}
          </div>
        </div>
      </div>
    );
  }

  const isLoading = needsApi && !isApiReady;

  const sawGuide = !!store.get(sawGuideKey) || false;

  return (
    <div className={classes(className, isLoading && 'isLoading')}>
      <WithLoader isLoading={isLoading} text={t<string>('Initializing connection')}>
        <Suspense
          fallback={
            <WithLoader text={t<string>('Loading')}>
              <div />
            </WithLoader>
          }
        >
          <ErrorBoundary trigger={name}>
            <Component basePath={`/${name}`} location={location} navigateTo={navigateTo} onStatusChange={queueAction} />
            {!sawGuide && !isLoading && <GuideModal onClose={setSawGuide} />}
            <HelpWidget />
          </ErrorBoundary>
        </Suspense>
        <Status queueAction={queueAction} stqueue={stqueue} txqueue={txqueue} />
      </WithLoader>
    </div>
  );
}

export default React.memo(styled(Content)`
  flex-grow: 1;
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  width: 100%;

  &.isLoading {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 768px) {
    padding: 0 0.5rem;
  }

  .disconnected {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
  }

  .disconnected {
    > div {
      ${ELEV_3_CSS}
      border: 1px solid var(--red-primary);
      color: var(--grey60);
      width: 35rem;
      padding: 1.5rem;
      text-align: center;

      .svg-inline--fa {
        display: block;
        color: var(--red-primary);
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
        margin-right: 0;
        width: 100%;
        text-align: center;
      }
    }
  }
`);
