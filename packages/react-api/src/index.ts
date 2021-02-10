// Copyright 2017-2021 @canvas-ui/react-api authors & contributors
// SPDX-License-Identifier: Apache-2.0

import Api, { api } from './Api';
import ApiContext from './ApiContext';
import getContractAbi from './getContractAbi';
import { withApi, withCallDiv, withCalls, withMulti, withObservable } from './hoc';
import { clearLedger, getLedger, isLedger, isLedgerCapable } from './ledger';
import registry from './typeRegistry';
import useApi from './useApi';

export {
  api,
  Api,
  ApiContext,
  registry,
  withApi,
  withCalls,
  withCallDiv,
  withMulti,
  withObservable,
  clearLedger,
  getLedger,
  isLedger,
  isLedgerCapable,
  useApi,
  getContractAbi
};
