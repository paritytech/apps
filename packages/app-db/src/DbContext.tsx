// Copyright 2017-2021 @canvas-ui/app-db authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import { DbProps } from './types';

const DbContext: React.Context<DbProps> = React.createContext({} as unknown as DbProps);
const DbConsumer: React.Consumer<DbProps> = DbContext.Consumer;
const DbProvider: React.Provider<DbProps> = DbContext.Provider;

export default DbContext;

export {
  DbConsumer,
  DbProvider
};
