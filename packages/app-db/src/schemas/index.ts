// Copyright 2017-2021 @canvas-ui/app-db authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { JSONSchema4 } from 'json-schema';

import codeSchema from './code.schema.json';
import contractSchema from './contract.schema.json';
import userSchema from './user.schema.json';

export const user = userSchema as JSONSchema4;
export const code = codeSchema as JSONSchema4;
export const contract = contractSchema as JSONSchema4;
