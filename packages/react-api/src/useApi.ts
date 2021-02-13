// Copyright 2017-2021 @canvas-ui/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ApiProps } from './types';

import { useContext } from 'react';

import ApiContext from './ApiContext';

export default function useApi (): ApiProps {
  return useContext(ApiContext);
}
