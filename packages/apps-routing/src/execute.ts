// Copyright 2017-2021 @canvas-ui/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import Component from '@canvas-ui/app-execute';

import { Route } from './types';

export default function create (t: <T = string>(key: string, text: string, options: { ns: string }) => T): Route {
  return {
    Component,
    display: {
      needsAccounts: true,
      needsApi: []
    },
    name: 'execute',
    text: t<string>('nav.execute', 'Execute', { ns: 'apps-routing' })
  };
}
