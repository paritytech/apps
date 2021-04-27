// Copyright 2017-2021 @polkadot/react-components authors & contributors
// and @canvas-ui/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Code } from '@canvas-ui/app-db/types';
import type { BareProps } from './types';

import { useDatabase } from '@canvas-ui/app-db';
import { useNonEmptyString, useToggle } from '@canvas-ui/react-hooks';
import { truncate } from '@canvas-ui/react-util';
import { faFile } from '@fortawesome/free-regular-svg-icons';
import React, { useCallback } from 'react';
import styled from 'styled-components';

import CopyButton from './CopyButton';
import EditButton from './EditButton';
import Icon from './Icon';
import Input from './Input';
import ItemInfo from './ItemInfo';
import { useTranslation } from './translate';

interface Props extends BareProps {
  code: Code;
  isEditable?: boolean;
}

function CodeInfo ({ children, className, code: { codeHash, id, name }, isEditable }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { updateCode } = useDatabase();
  const [newName, setNewName, isNewNameValid, isNewNameError] = useNonEmptyString(name);
  const [isEditingName, toggleIsEditingName] = useToggle();

  const onSaveName = useCallback(
    (): void => {
      if (!newName || !isNewNameValid) {
        return;
      }

      updateCode(id, { name: newName })
        .then(toggleIsEditingName)
        .catch((e): void => {
          console.error(e);
        });
    },
    [id, isNewNameValid, newName, toggleIsEditingName, updateCode]
  );

  return (
    <ItemInfo
      className={className}
      icon={
        <Icon
          className='code-icon'
          icon={faFile}
          size='2x'
        />
      }
      subtitle={
        <>
          {t<string>('Code hash')}
          {': '}
          <CopyButton value={codeHash}>
            {truncate(codeHash || '', 16)}
          </CopyButton>
        </>
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
                  {name}
                </EditButton>
              )
              : name
          )
      }
    >
      {children}
    </ItemInfo>
  );
}

export default styled(React.memo(CodeInfo))`
  .svg-inline--fa.code-icon {
    color: var(--grey60);
    font-size: 1.8rem;
    margin: 0.5rem;
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
