// Copyright 2017-2021 @canvas-ui/app-execute authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { store } from '@canvas-ui/page-contracts';
import Button from './Button';
import Modal from './Modal';
import { useTranslation } from './translate';
import { BareProps } from './types';
import { useToggle } from '@canvas-ui/react-hooks';
import React, { useCallback } from 'react';

// import { VoidFn } from '@canvas-ui/react-api/types';
import keyring from '@polkadot/ui-keyring';

function ResetStorageModal({ className }: BareProps): React.ReactElement<BareProps> {
  const { t } = useTranslation();
  const [isOpen, toggleIsOpen] = useToggle(true);

  const _onClose = useCallback((): void => {
    toggleIsOpen();
  }, [toggleIsOpen]);

  const _onReset = useCallback((): void => {
    const existingContractList = keyring.getContracts();

    existingContractList.forEach((existingContract) => {
      keyring.forgetContract(existingContract.address.toString());
    });

    store.forgetAll();

    _onClose();
  }, [_onClose]);

  return (
    <Modal className={className} isOpen={isOpen} onClose={_onClose}>
      <Modal.Header>{t<string>('Invalid Storage Artifacts')}</Modal.Header>
      <Modal.Content>
        <p>
          {t(
            'It appears your currently running development chain and the UI artifacts are out of sync. This can happen after purging and restarting the chain. Do you want to reset your browser storage? This will remove all previously added code bundles and deployed contracts.'
          )}
        </p>
      </Modal.Content>
      <Modal.Actions cancelLabel={t<string>('No, Continue')} onCancel={_onClose}>
        <Button isPrimary label={t<string>('Yes, Reset Storage')} onClick={_onReset} />
      </Modal.Actions>
    </Modal>
  );
}

export default ResetStorageModal;
