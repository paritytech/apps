// Copyright 2017-2021 @canvas-ui/app-execute authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Button, Input, InputABI, InputName } from '@canvas-ui/react-components';
import { useAbi, useApi, useAppNavigation, useCall, useFile, useNonEmptyString, useNotification } from '@canvas-ui/react-hooks';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { Option } from '@polkadot/types';
import { ContractInfo } from '@polkadot/types/interfaces';
import keyring from '@polkadot/ui-keyring';

import { useTranslation } from './translate';
import { ComponentProps as Props } from './types';

function Add ({ className, isContract }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const { navigateTo } = useAppNavigation();
  const showNotification = useNotification();
  const [address, setAddress, , , isAddressTouched] = useNonEmptyString();
  const contractInfo = useCall<Option<ContractInfo>>(api.query.contracts.contractInfoOf, [address]);
  const [name, setName, isNameValid, isNameError] = useNonEmptyString('New Contract');
  const { abi, errorText, isAbiError, isAbiSupplied, isAbiValid, onChangeAbi, onRemoveAbi } = useAbi();
  const [abiFile, setAbiFile] = useFile({ onChange: onChangeAbi, onRemove: onRemoveAbi });
  const [isAddress, setIsAddress] = useState(false);
  const [isStored, setIsStored] = useState(false);
  const [isNotAdded, setIsNotAdded] = useState(false);

  useEffect((): void => {
    try {
      keyring.decodeAddress(address || '');
      setIsAddress(true);
    } catch (error) {
      setIsAddress(false);
    } finally {
      setIsNotAdded(!isContract(address || ''));
    }
  }, [address, isContract]);

  useEffect((): void => {
    setIsStored(!!contractInfo?.isSome);
  }, [contractInfo?.isSome]);

  const [isAddressValid, status] = useMemo(
    (): [boolean, React.ReactNode | null] => {
      const isAddressValid = isAddress && isStored && isNotAdded;

      let status = null;

      if (isAddressTouched) {
        if (!isAddress) {
          status = t<string>('The value is not in a valid address format');
        } else if (!isStored) {
          status = t<string>('Unable to find instantiated contract code at the specified address');
        } else if (!isNotAdded) {
          status = t<string>('You have already added this contract address');
        } else if (isAddressValid) {
          status = t<string>('Contract code successfully found at address');
        }
      }

      return [
        isAddressValid,
        status
      ];
    },
    [isAddress, isAddressTouched, isNotAdded, isStored, t]
  );

  const isValid = useMemo(
    (): boolean => isAbiValid && isAddressValid && isNameValid,
    [isAddressValid, isAbiValid, isNameValid]
  );

  const _onAdd = useCallback(
    (): void => {
      if (!address || !abi || !name) {
        return;
      }

      try {
        const json = {
          contract: {
            abi: abi.json,
            genesisHash: api.genesisHash.toHex()
          },
          name,
          tags: []
        };

        keyring.saveContract(address, json);

        showNotification({
          account: address,
          action: 'created',
          message: t<string>('contract added'),
          status: address ? 'success' : 'error'
        });

        navigateTo.execute();
      } catch (error) {
        console.error(error);

        showNotification({
          account: address,
          action: 'created',
          message: (error as Error).message,
          status: 'error'
        });
      }
    },
    [abi, address, api, name, navigateTo, showNotification, t]
  );

  return (
    <div className={className}>
      <header>
        <h1>{t<string>('Add Existing Contract')}</h1>
        <div className='instructions'>
          {t<string>('Using the existing contract address of an instantiated contract instance you can add a contract to call to the UI.')}
        </div>
      </header>
      <section>
        <Input
          autoFocus
          isError={isAddressTouched && !isAddressValid}
          label={t<string>('Contract Address')}
          onChange={setAddress}
          status={status}
          value={address || ''}
          withStatus
        />
        <InputName
          isContract
          isError={isNameError}
          onChange={setName}
          value={name || undefined}
        />
        <InputABI
          abi={abi}
          errorText={errorText}
          file={abiFile}
          isContract
          isError={isAbiError}
          isRequired
          isSupplied={isAbiSupplied}
          isValid={isAbiValid}
          setFile={setAbiFile}
          withLabel
        />
        <Button.Group>
          <Button
            isDisabled={!isValid}
            isPrimary
            label={t<string>('Save')}
            onClick={_onAdd}
          />
          <Button
            label={t<string>('Cancel')}
            onClick={navigateTo.execute}
          />
        </Button.Group>
      </section>
    </div>
  );
}

export default styled(React.memo(Add))`
`;
