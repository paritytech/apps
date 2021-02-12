// Copyright 2017-2021 @canvas-ui/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import Settings from '@canvas-ui/app-settings';

import { Route } from './types';

export default function create(
  t: <T = string>(key: string, text: string, options: { ns: string }) => T
): Route {
  return {
    Component: Settings,
    display: {},
    isIgnored: true,
    name: 'settings',
    text: t<string>('nav.settings', 'Settings', { ns: 'apps-routing' })
  };
}
