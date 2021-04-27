// Copyright 2017-2021 @canvas-ui/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Contract } from '@canvas-ui/app-db/types';
import type { BareProps } from './types';

import { useDatabase } from '@canvas-ui/app-db';
import { useNotification, useToggle } from '@canvas-ui/react-hooks';
import React, { useCallback } from 'react';
import styled from 'styled-components';

import Button from './Button';
import ContractInfo from './ContractInfo';
import Modal from './Modal';
import { useTranslation } from './translate';

interface Props extends BareProps {
  contract: Contract;
}

function ContractForget ({ className, contract, contract: { document: { address } } }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { removeContract } = useDatabase();
  const showNotification = useNotification();
  const [isOpen, toggleIsOpen] = useToggle();

  const _onForgetSuccess = useCallback(
    (): void => {
      showNotification({
        account: address,
        action: 'forget',
        message: t<string>('contract removed'),
        status: 'success'
      });
      toggleIsOpen();
    },
    [address, showNotification, t, toggleIsOpen]
  );

  const _onForget = useCallback(
    (): void => {
      if (!address) {
        return;
      }

      try {
        removeContract(address)
          .then(_onForgetSuccess)
          .catch((e) => console.error(e));
      } catch (error) {
        showNotification({
          account: address,
          action: 'forget',
          message: (error as Error).message,
          status: 'error'
        });
      }
    },
    [_onForgetSuccess, address, removeContract, showNotification]
  );

  return (
    <>
      <Button
        isNegative
        label={t<string>('Forget')}
        onClick={toggleIsOpen}
      />
      <Modal
        className={className}
        isOpen={isOpen}
        onClose={toggleIsOpen}
      >
        <Modal.Header>{t<string>('Forget contract?')}</Modal.Header>
        <Modal.Content>
          <p>
            {t<string>('You are about to remove this contract from your list of available contracts. Once completed, should you need to access it again, you will have to manually add the contract\'s address in the Execute tab.')}
          </p>
          <p>
            {t<string>('This operation does not remove the history of the contract from the chain, nor any associated funds from its account. The forget operation only limits your access to the contract on this browser.')}
          </p>
          <ContractInfo
            className='forget-contract'
            contract={contract}
          />
        </Modal.Content>
        <Modal.Actions onCancel={toggleIsOpen}>
          <Button
            isPrimary
            label={t<string>('Forget')}
            onClick={_onForget}
          />
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default styled(React.memo(ContractForget))`
  .forget-contract {
    border-top: 1px solid var(--grey30);
    margin-top: 1.5rem;
    padding-top: 1.5rem;
  }
`;
