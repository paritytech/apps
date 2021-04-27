// Copyright 2017-2021 @canvas-ui/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Contract } from '@canvas-ui/app-db/types';
import type { BareProps } from './types';

import { useDatabase } from '@canvas-ui/app-db';
import { useNonEmptyString, useToggle } from '@canvas-ui/react-hooks';
import { truncate } from '@canvas-ui/react-util';
import React, { useCallback } from 'react';
import styled from 'styled-components';

import CopyButton from './CopyButton';
import EditButton from './EditButton';
import Input from './Input';
import ItemInfo from './ItemInfo';
import { IdentityIcon } from '.';

interface Props extends BareProps {
  contract: Contract;
  isEditable?: boolean;
}

function ContractInfo ({ children, className, contract: { document, document: { address } }, isEditable }: Props): React.ReactElement<Props> {
  const { updateContract } = useDatabase();
  const [newName, setNewName, isNewNameValid, isNewNameError] = useNonEmptyString(document.name);
  const [isEditingName, toggleIsEditingName] = useToggle();

  const onSaveName = useCallback(
    (): void => {
      newName && isNewNameValid && updateContract(address, { name: newName })
        .then((): void => toggleIsEditingName())
        .catch((e) => console.error(e));
    },
    [address, isNewNameValid, newName, toggleIsEditingName, updateContract]
  );
  // const { isEditingName, name, onSaveName, setName, toggleIsEditingName } = useAccountInfo(address, true);

  return (
    <ItemInfo
      className={className}
      icon={
        <IdentityIcon
          className='contract-icon'
          size={32}
          value={address}
        />
      }
      subtitle={
        <CopyButton
          isAddress
          value={address.toString()}
        >
          {truncate(address.toString(), 16)}
        </CopyButton>
      }
      title={
        isEditable && isEditingName
          ? (
            <Input
              autoFocus
              className='name-editor'
              isError={isNewNameError}
              onBlur={onSaveName}
              onChange={setNewName}
              onEnter
              value={newName}
              withLabel={false}
            />
          )
          : (
            isEditable
              ? (
                <EditButton onClick={toggleIsEditingName}>
                  {document.name}
                </EditButton>
              )
              : document.name
          )
      }
    >
      {children}
    </ItemInfo>
  );
}

export default styled(React.memo(ContractInfo))`
  .contract-icon {
    margin: 0.5rem 0.5rem 0 0;

    .container:before {
      box-shadow: none !important;
      background-color: var(--white);
    }
  }

  .name-editor {
    background: var(--grey15);

    .ui.input {
      margin: 0;

      > input {
        padding: 0;
      }
    }
  }
`;
