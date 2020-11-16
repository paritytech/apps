// Copyright 2017-2020 @canvas-ui/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AnyJson, Codec, Registry, TypeDef, TypeDefInfo } from '@polkadot/types/types';
import { BareProps } from './types';

import React, { useMemo } from 'react';
import styled from 'styled-components';
import { registry as baseRegistry } from '@canvas-ui/react-api';
import { truncate } from '@canvas-ui/react-util';
import { createTypeUnsafe, Option } from '@polkadot/types';

import AddressSmall from './AddressMini';
import Labelled from './Labelled';

interface Props extends BareProps {
  isTrimmed?: boolean;
  registry?: Registry;
  type?: TypeDef;
  value?: Codec | null;
}

const TRUNCATE_TO = 16;

function formatData (registry: Registry, data: AnyJson, type: TypeDef | undefined): Codec {
  return createTypeUnsafe(registry, type?.type || 'Raw', [data], true);
}

function Field ({ name, value }: { name: string, value: React.ReactNode }): React.ReactElement {
  return (
    <div className='field'>
      <div className='key'>
        {name}:
      </div>
      <div className='value'>
        {value}
      </div>
    </div>
  );
}

function Data ({ className, registry = baseRegistry, type, value }: Props): React.ReactElement<Props> | null {
  const content = useMemo(
    (): React.ReactNode => {
      if (!value) {
        return '()';
      }

      if (!type || type.displayName === 'Hash') {
        return truncate(value.toHex(), TRUNCATE_TO);
      }

      if (type.type === 'AccountId') {
        return (
          <AddressSmall
            className='account-id'
            value={value.toString()}
          />
        );
      }

      if (type.info === TypeDefInfo.Option && value instanceof Option) {
        const isSome = value.isSome;
        const subType = type.sub as TypeDef;

        return (
          <div className='enum'>
            {isSome ? 'Some' : 'None'}
            {isSome && (
              <>
                {'('}
                <div className='inner'>
                  <Data
                    registry={registry}
                    type={subType}
                    value={formatData(registry, value.toString(), subType)}
                  />
                </div>
                {')'}
              </>
            )}
          </div>
        );
      }

      if (type.info === TypeDefInfo.Plain) {
        return truncate(value.toString(), TRUNCATE_TO);
      }

      if (type.info === TypeDefInfo.Struct) {
        const struct = value.toJSON() as Record<string, AnyJson>;

        return (
          <Labelled
            isIndented
            isSmall
            withLabel={false}
          >
            {
              Object.entries(struct).map(([key, field], index) => {
                const subType = (type.sub as TypeDef[])[index];

                return (
                  <Field
                    key={key}
                    name={key}
                    value={
                      <Data
                        registry={registry}
                        type={subType}
                        value={formatData(registry, field, subType)}
                      />
                    }
                  />
                );
              })
            }
          </Labelled>
        );
      }

      if (type.sub && [TypeDefInfo.Vec, TypeDefInfo.VecFixed].includes(type.info)) {
        const sub = type.sub as TypeDef;

        if (sub.type === 'u8') {
          return truncate(value.toHex(), TRUNCATE_TO);
        }

        const array = value.toJSON() as AnyJson[];

        if (!Array.isArray(array)) {
          return null;
        }

        return (
          <Labelled
            isIndented
            isSmall
            withLabel={false}
          >
            {
              array.map((element, index) => {
                return (
                  <Field
                    key={index}
                    name={`${index}`}
                    value={
                      <Data
                        registry={registry}
                        type={sub}
                        value={formatData(registry, element, sub)}
                      />
                    }
                  />
                );
              })
            }
          </Labelled>
        );
      }

      return truncate(value.toHex(), TRUNCATE_TO);
    },
    [value, registry, type]
  );

  return (
    <div className={className}>
      {content || null}
    </div>
  );
}

export default React.memo(styled(Data)`
  display: inline-block;

  .account-id {
    minWidth: auto;
  }

  .field {
    min-height: 2rem;
    display: flex;
    align-items: center;  

    .key {
      font-weight: bold;
    }
    
    .value {
      margin-left: 0.5rem;
    }
  }

  .enum {
    .inner {
      margin: 1rem 0 1rem 2rem;
    }
  }
`);