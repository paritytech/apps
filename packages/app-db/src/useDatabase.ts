// Copyright 2017-2021 @polkadot/react-hooks authors & contributors
// and @canvas-ui/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DbProps } from '@canvas-ui/app-db/types';
import type { Collection } from '@textile/threaddb';
// import { Abi } from '@polkadot/api-contract';
import type { AnyJson } from '@polkadot/types/types';
import type { CodeDocument, ContractDocument, UserDocument } from './types';

import { useApi } from '@canvas-ui/react-hooks';
import { nanoid } from 'nanoid';
import { useCallback, useContext } from 'react';

import keyring from '@polkadot/ui-keyring';
import { u8aToHex } from '@polkadot/util';

import DbContext from './DbContext';
import { getPrivateKey, publicKeyHex } from './util';

interface UseDb extends DbProps {
  // User: Collection<UserDocument>;
  addCodeForUser: (id: string) => void;
  addContractForUser: (id: string) => void;
  createCode: (newCode: CodeFields) => Promise<string>;
  createContract: (newContract: ContractFields) => Promise<string>;
  createUser: () => Promise<string>;
  findCodes: () => Promise<CodeDocument[]>;
  findCodeByHash: (codeHash: string) => Promise<CodeDocument | null>;
  findCodeById: (id: string) => Promise<CodeDocument | null>;
  findContracts: () => Promise<ContractDocument[]>;
  findContractByAddress: (address: string) => Promise<ContractDocument | null>;
  findUser: () => Promise<UserDocument | null>;
  removeCode: (id: string) => Promise<void>,
  removeCodeForUser: (id: string) => void,
  removeContract: (address: string) => Promise<void>,
  removeContractForUser: (address: string) => void;
  updateCode: (id: string, updates: CodeFields) => Promise<string>,
  updateContract: (address: string, updates: ContractFields) => Promise<string>,
}

interface ContractFields {
  abi?: AnyJson;
  address?: string;
  name?: string;
  tags?: string[];
}

interface CodeFields {
  abi?: AnyJson,
  codeHash?: string;
  name?: string;
  tags?: string[]
}

function newCodeId (): string {
  return nanoid(8);
}

export default function useDatabase (): UseDb {
  const { api, blockOneHash, isDevelopment } = useApi();
  const { db, identity, isDbReady } = useContext(DbContext);

  const Code = db.collection('Code') as Collection<CodeDocument>;
  const Contract = db.collection('Contract') as Collection<ContractDocument>;
  const User = db.collection('User') as Collection<UserDocument>;

  const findUser = useCallback(
    async (): Promise<UserDocument | null> => {
      const identity = getPrivateKey();
      const result = await User.findOne({ publicKey: publicKeyHex(identity) });

      return result || null;
    },
    [User]
  );

  const createUser = useCallback(
    async (): Promise<string> => {
      const identity = getPrivateKey();
      const existing = await findUser();

      if (identity && !existing) {
        return User.create({
          codeBundles: [],
          contracts: [],
          publicKey: u8aToHex(identity.pubKey)
        }).save();
      }

      return Promise.reject(new Error('Unable to create user'));
    },
    [User, findUser]
  );

  const findCodes = useCallback(
    async (): Promise<CodeDocument[]> => {
      const result = Code.find({ blockOneHash, owner: isDevelopment ? publicKeyHex(identity) : undefined });

      return result ? (await result.toArray()) : [];
    },
    [blockOneHash, identity, isDevelopment, Code]
  );

  const findCodeByHash = useCallback(
    async (codeHash: string): Promise<CodeDocument | null> => {
      return await Code.findOne({ blockOneHash, codeHash }) || null;
    },
    [blockOneHash, Code]
  );

  const findCodeById = useCallback(
    async (id: string): Promise<CodeDocument | null> => {
      return await Code.findOne({ id }) || null;
    },
    [Code]
  );

  const findContracts = useCallback(
    async (): Promise<ContractDocument[]> => {
      const results = await Contract.find({ blockOneHash, owner: isDevelopment ? publicKeyHex(identity) : undefined }).toArray();

      console.log(results);

      return results;
    },
    [blockOneHash, identity, isDevelopment, Contract]
  );

  const findContractByAddress = useCallback(
    async (address: string): Promise<ContractDocument | null> => {
      return await Contract.findOne({ address }) || null;
    },
    [Contract]
  );

  const addCodeForUser = useCallback(
    async (id: string): Promise<string> => {
      try {
        if (!identity) {
          return Promise.reject(new Error('No user identity'));
        }

        const user = await User.findOne({ publicKey: publicKeyHex(identity) });

        if (user) {
          user.codeBundles = [...new Set(user.codeBundles), id];

          return user.save();
        }

        return Promise.reject(new Error('Invalid user'));
      } catch (e) {
        return Promise.reject(new Error(e));
      }
    },
    [identity, User]
  );

  const removeCodeForUser = useCallback(
    async (id: string): Promise<string> => {
      try {
        if (!identity) {
          return Promise.reject(new Error('No user identity'));
        }

        const user = await User.findOne({ publicKey: publicKeyHex(identity) });

        if (user) {
          user.codeBundles = user.codeBundles.filter((anId) => id !== anId);

          console.log('after');
          console.log(user.codeBundles);

          return user.save();
        }

        return Promise.reject(new Error('Invalid user'));
      } catch (e) {
        console.error(e);

        return Promise.reject(new Error(e));
      }
    },
    [identity, User]
  );

  const addContractForUser = useCallback(
    async (id: string): Promise<string> => {
      try {
        if (!identity) {
          return Promise.reject(new Error('No user identity'));
        }

        const user = await User.findOne({ publicKey: publicKeyHex(identity) });

        if (user) {
          user.contracts = [...new Set(user.contracts), id];

          return user.save();
        }

        return Promise.reject(new Error('Invalid user'));
      } catch (e) {
        return Promise.reject(new Error(e));
      }
    },
    [identity, User]
  );

  const removeContractForUser = useCallback(
    async (id: string): Promise<string> => {
      try {
        if (!identity) {
          return Promise.reject(new Error('No user identity'));
        }

        const user = await User.findOne({ publicKey: publicKeyHex(identity) });

        if (user) {
          user.contracts = user.contracts.filter((anId) => id !== anId);

          return user.save();
        }

        return Promise.reject(new Error('Invalid user'));
      } catch (e) {
        return Promise.reject(new Error(e));
      }
    },
    [identity, User]
  );

  const createCode = useCallback(
    async ({ abi, codeHash, name, tags = [] }: CodeFields): Promise<string> => {
      try {
        if (!codeHash || !name) {
          return Promise.reject(new Error('Missing codeHash or name'));
        }

        const id = newCodeId();

        const newCode = Code.create({
          abi,
          blockOneHash,
          codeHash,
          genesisHash: api.genesisHash.toHex(),
          id,
          name,
          owner: publicKeyHex(identity),
          tags
        });

        await addCodeForUser(id);

        await newCode.save();

        return Promise.resolve(id);
      } catch (e) {
        return Promise.reject(new Error(e));
      }
    },
    [addCodeForUser, Code, api.genesisHash, blockOneHash, identity]
  );

  const updateCode = useCallback(
    async (id: string, { abi, name, tags }: CodeFields): Promise<string> => {
      try {
        const code = await Code.findOne({ id });

        if (code) {
          if (name) code.name = name;
          if (tags) code.tags = tags;
          if (abi) code.abi = abi;

          return code.save();
        }

        return Promise.reject(new Error('Code does not exist'));
      } catch (e) {
        console.error(e);

        return Promise.reject(new Error(e));
      }
    },
    [Code]
  );

  const removeCode = useCallback(
    async (id: string): Promise<void> => {
      try {
        const user = await findUser();
        const existing = await findCodeById(id);
        const isOwned = user?.publicKey === existing?.owner;

        await removeCodeForUser(id);

        console.log(isOwned);
        console.log(existing);

        if (existing && isOwned) {
          return Code.delete(existing._id as string);
        }

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(new Error(e));
      }
    },
    [Code, findCodeById, findUser, removeCodeForUser]
  );

  const createContract = useCallback(
    async ({ abi, address, name, tags = [] }: ContractFields): Promise<string> => {
      try {
        if (!address || !name) {
          return Promise.reject(new Error('Missing address or name'));
        }

        const newContract = Contract.create({
          abi,
          address,
          blockOneHash,
          genesisHash: api.genesisHash.toHex(),
          name,
          owner: publicKeyHex(identity),
          tags
        });

        keyring.saveContract(address, {
          contract: {
            abi: abi || undefined,
            genesisHash: api.genesisHash.toHex()
          },
          name,
          tags: []
        });

        await addContractForUser(address);

        await newContract.save();

        return Promise.resolve(address);
      } catch (e) {
        return Promise.reject(new Error(e));
      }
    },
    [addContractForUser, Contract, api.genesisHash, blockOneHash, identity]
  );

  const updateContract = useCallback(
    async (address: string, { name, tags }: ContractFields): Promise<string> => {
      try {
        const contract = await Contract.findOne({ address });

        if (contract) {
          if (name) contract.name = name;
          if (tags) contract.tags = tags;

          return contract.save();
        }

        return Promise.reject(new Error('Contract does not exist'));
      } catch (e) {
        return Promise.reject(new Error(e));
      }
    },
    [Contract]
  );

  const removeContract = useCallback(
    async (address: string): Promise<void> => {
      try {
        const user = await findUser();
        const existing = await findContractByAddress(address);
        const isOwned = user?.publicKey === existing?.owner;

        keyring.forgetContract(address);

        await removeContractForUser(address);

        if (isOwned) {
          return Code.delete(address);
        }

        return Promise.resolve();
      } catch (e) {
        return Promise.reject(new Error(e));
      }
    },
    [Code, findContractByAddress, findUser, removeContractForUser]
  );

  return {
    addCodeForUser,
    addContractForUser,
    createCode,
    createContract,
    createUser,
    db,
    findCodeByHash,
    findCodeById,
    findCodes,
    findContractByAddress,
    findContracts,
    findUser,
    identity,
    isDbReady,
    removeCode,
    removeCodeForUser,
    removeContract,
    removeContractForUser,
    updateCode,
    updateContract
  };
}
