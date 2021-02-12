// Copyright 2017-2021 @canvas-ui/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { StringOrNull } from '@canvas-ui/react-api/types';
import type { ConstructTxFn } from '@canvas-ui/react-hooks/types';
import type { Icon as IconType, IconName } from '@fortawesome/fontawesome-svg-core';
import type { SubmittableExtrinsic } from '@polkadot/api/types';

import { TypeDef } from '@polkadot/types/types';

import { ActionStatus, TxCallback, TxFailedCallback } from '@canvas-ui/react-api/Status/types';
import { VoidFn } from '@canvas-ui/react-api/types';
import { TxState } from '@canvas-ui/react-hooks/types';
import { WithTranslation } from 'react-i18next';

// import { ButtonProps as SUIButtonProps } from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import { Abi } from '@polkadot/api-contract';
import { AccountId, Index } from '@polkadot/types/interfaces';

import { ButtonProps } from './Button/types';
import { InputAddressProps } from './InputAddress/types';

export interface BareProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export type I18nProps = BareProps & WithTranslation;

export type TxTrigger = React.ComponentType<TxTriggerProps>;

export interface TxTriggerProps {
  onOpen: () => void;
}

export interface TxProps {
  extrinsic?: SubmittableExtrinsic<'promise'> | null;
  tx?: string;
  params?: any[] | ConstructTxFn;
}

export interface TxAccountProps {
  className?: string;
  filter?: string[];
  label?: React.ReactNode;
  help?: React.ReactNode;
  onChange: (value: string | null) => void;
}

export interface TxButtonProps {
  accountId?: AccountId | string | null;
  accountNonce?: Index;
  className?: string;
  extrinsic?: SubmittableExtrinsic<'promise'> | SubmittableExtrinsic<'promise'>[] | null;
  icon?: IconType | IconName;
  isBasic?: boolean;
  isBusy?: boolean;
  isDisabled?: boolean;
  isIcon?: boolean;
  isPrimary?: boolean;
  isUnsigned?: boolean;
  label?: React.ReactNode;
  onClick?: () => void;
  onFailed?: TxFailedCallback;
  onSendRef?: React.MutableRefObject<(() => void) | undefined>;
  onStart?: () => void;
  onSuccess?: TxCallback;
  onUpdate?: TxCallback;
  params?: any[] | (() => any[]);
  tooltip?: string;
  tx?: ((...args: any[]) => SubmittableExtrinsic<'promise'>) | null;
  withoutLink?: boolean;
  withSpinner?: boolean;
}

export interface TxModalProps extends I18nProps, TxState {
  accountId?: StringOrNull;
  header?: React.ReactNode;
  isDisabled?: boolean;
  isOpen?: boolean;
  isUnsigned?: boolean;
  children: React.ReactNode;
  preContent?: React.ReactNode;
  trigger?: TxTrigger;
  onSubmit?: () => void;
  onOpen?: () => void;
  onClose?: () => void;
  onSuccess?: () => void;
  onFailed?: () => void;
  modalProps?: {
    [index: string]: any;
  };
  contentClassName?: string;
  inputAddressHelp?: React.ReactNode;
  inputAddressExtra?: React.ReactNode;
  inputAddressLabel?: React.ReactNode;
  inputAddressProps?: Pick<InputAddressProps, never>;
  cancelButtonLabel?: React.ReactNode;
  cancelButtonProps?: Pick<ButtonProps, never>;
  submitButtonIcon?: string;
  submitButtonLabel?: React.ReactNode;
  submitButtonProps?: Pick<TxButtonProps, never>;
}

export type BitLength = 8 | 16 | 32 | 64 | 128 | 256;

interface ContractBase {
  abi: Abi;
}

export interface Contract extends ContractBase {
  address: null;
}

export interface ContractDeployed extends ContractBase {
  address: string;
}

export type CallContract = ContractDeployed;

export interface NullContract {
  abi: null;
  address: null;
}

export interface ThemeDef {
  bgInput: string;
  bgInputError: string;
  bgInverse: string;
  bgMenu: string;
  bgMenuHover: string;
  bgPage: string;
  bgTable: string;
  bgTabs: string;
  bgToggle: string;
  borderTable: string;
  borderTabs: string;
  color: string;
  colorCheckbox: string;
  colorError: string;
  colorLabel: string;
  colorSummary: string;
  contentHalfWidth: string;
  contentMaxWidth: string;
  fontSans: string;
  fontMono: string;
  fontWeightLight: number;
  fontWeightNormal: number;
  theme: 'dark' | 'light';
}

export interface ThemeProps {
  theme: ThemeDef;
}

/* import from /apps */

export interface AppNavigation {
  deploy: VoidFn;
  deployNew: (_: string, __?: number) => VoidFn;
  deploySuccess: (_: string) => VoidFn;
  execute: VoidFn;
  executeAdd: VoidFn;
  executeCall: (_: string, __?: number) => VoidFn;
  upload: VoidFn;
  uploadAdd: VoidFn;
  uploadSuccess: (_: string) => VoidFn;
}

interface WithAppNavigation {
  navigateTo: AppNavigation;
}

export interface WithBasePath {
  basePath: string;
}

export interface ComponentProps extends BareProps, WithBasePath, WithAppNavigation {}

export interface AppProps extends BareProps, WithBasePath, WithAppNavigation {
  onStatusChange: (status: ActionStatus) => void;
}

// from react-params/types:

export type RawParamValue = unknown | undefined;

export type RawParamValueArray = (RawParamValue | RawParamValue[])[];

export type RawParamValues = RawParamValue | RawParamValueArray;

export interface RawParam {
  isValid: boolean;
  value: RawParamValues;
}

export interface RawParamOnChangeValue {
  isValid: boolean;
  value: RawParamValues;
}

export type RawParamOnChange = (value: RawParamOnChangeValue) => void;
export type RawParamOnEnter = () => void;
export type RawParamOnEscape = () => void;

export type RawParams = RawParam[];

export interface Props {
  className?: string;
  defaultValue: RawParam;
  isDisabled?: boolean;
  isError?: boolean;
  isInOption?: boolean;
  isReadOnly?: boolean;
  isOptional?: boolean;
  label?: React.ReactNode;
  name?: string;
  onChange?: RawParamOnChange;
  onEnter?: RawParamOnEnter;
  onEscape?: RawParamOnEscape;
  // eslint-disable-next-line no-use-before-define
  overrides?: ComponentMap;
  type: TypeDef & { withOptionActive?: boolean };
  withLabel?: boolean;
}

export type Size = 'full' | 'large' | 'medium' | 'small';

export type ComponentMap = Record<string, React.ComponentType<Props>>;

export interface ParamDef {
  length?: number;
  name?: string;
  type: TypeDef;
}

export interface UseTxParams {
  params: ParamDef[];
  values: RawParams;
  onChange: React.Dispatch<RawParams>;
}

export type UseTxParamsHook = [ParamDef[], RawParams, React.Dispatch<RawParams>];
