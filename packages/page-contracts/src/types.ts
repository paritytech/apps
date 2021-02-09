// [object Object]
// SPDX-License-Identifier: Apache-2.0

import { AnyJson } from '@polkadot/types/types'

interface CodeBase {
    id: string
    codeHash: string
    name: string
    genesisHash: string
    tags: string[]
}

export interface Code extends CodeBase {
    abi?: AnyJson | null
}

export interface WithCodes {
    allCodes: Code[]
    hasCodes: boolean
    isLoading: boolean
    updated: number
}
