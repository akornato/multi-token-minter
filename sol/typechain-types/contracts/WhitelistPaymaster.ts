/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export declare namespace IPaymaster {
  export type GasAndDataLimitsStruct = {
    acceptanceBudget: PromiseOrValue<BigNumberish>;
    preRelayedCallGasLimit: PromiseOrValue<BigNumberish>;
    postRelayedCallGasLimit: PromiseOrValue<BigNumberish>;
    calldataSizeLimit: PromiseOrValue<BigNumberish>;
  };

  export type GasAndDataLimitsStructOutput = [
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber
  ] & {
    acceptanceBudget: BigNumber;
    preRelayedCallGasLimit: BigNumber;
    postRelayedCallGasLimit: BigNumber;
    calldataSizeLimit: BigNumber;
  };
}

export declare namespace GsnTypes {
  export type RelayDataStruct = {
    maxFeePerGas: PromiseOrValue<BigNumberish>;
    maxPriorityFeePerGas: PromiseOrValue<BigNumberish>;
    transactionCalldataGasUsed: PromiseOrValue<BigNumberish>;
    relayWorker: PromiseOrValue<string>;
    paymaster: PromiseOrValue<string>;
    forwarder: PromiseOrValue<string>;
    paymasterData: PromiseOrValue<BytesLike>;
    clientId: PromiseOrValue<BigNumberish>;
  };

  export type RelayDataStructOutput = [
    BigNumber,
    BigNumber,
    BigNumber,
    string,
    string,
    string,
    string,
    BigNumber
  ] & {
    maxFeePerGas: BigNumber;
    maxPriorityFeePerGas: BigNumber;
    transactionCalldataGasUsed: BigNumber;
    relayWorker: string;
    paymaster: string;
    forwarder: string;
    paymasterData: string;
    clientId: BigNumber;
  };

  export type RelayRequestStruct = {
    request: IForwarder.ForwardRequestStruct;
    relayData: GsnTypes.RelayDataStruct;
  };

  export type RelayRequestStructOutput = [
    IForwarder.ForwardRequestStructOutput,
    GsnTypes.RelayDataStructOutput
  ] & {
    request: IForwarder.ForwardRequestStructOutput;
    relayData: GsnTypes.RelayDataStructOutput;
  };
}

export declare namespace IForwarder {
  export type ForwardRequestStruct = {
    from: PromiseOrValue<string>;
    to: PromiseOrValue<string>;
    value: PromiseOrValue<BigNumberish>;
    gas: PromiseOrValue<BigNumberish>;
    nonce: PromiseOrValue<BigNumberish>;
    data: PromiseOrValue<BytesLike>;
    validUntilTime: PromiseOrValue<BigNumberish>;
  };

  export type ForwardRequestStructOutput = [
    string,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    string,
    BigNumber
  ] & {
    from: string;
    to: string;
    value: BigNumber;
    gas: BigNumber;
    nonce: BigNumber;
    data: string;
    validUntilTime: BigNumber;
  };
}

export interface WhitelistPaymasterInterface extends utils.Interface {
  functions: {
    "CALLDATA_SIZE_LIMIT()": FunctionFragment;
    "FORWARDER_HUB_OVERHEAD()": FunctionFragment;
    "PAYMASTER_ACCEPTANCE_BUDGET()": FunctionFragment;
    "POST_RELAYED_CALL_GAS_LIMIT()": FunctionFragment;
    "PRE_RELAYED_CALL_GAS_LIMIT()": FunctionFragment;
    "getGasAndDataLimits()": FunctionFragment;
    "getRelayHub()": FunctionFragment;
    "getTrustedForwarder()": FunctionFragment;
    "methodWhitelist(address,bytes4)": FunctionFragment;
    "owner()": FunctionFragment;
    "postRelayedCall(bytes,bool,uint256,(uint256,uint256,uint256,address,address,address,bytes,uint256))": FunctionFragment;
    "preRelayedCall(((address,address,uint256,uint256,uint256,bytes,uint256),(uint256,uint256,uint256,address,address,address,bytes,uint256)),bytes,bytes,uint256)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "senderWhitelist(address)": FunctionFragment;
    "setConfiguration(bool,bool,bool,bool)": FunctionFragment;
    "setRelayHub(address)": FunctionFragment;
    "setTrustedForwarder(address)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "targetWhitelist(address)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "useMethodWhitelist()": FunctionFragment;
    "useRejectOnRecipientRevert()": FunctionFragment;
    "useSenderWhitelist()": FunctionFragment;
    "useTargetWhitelist()": FunctionFragment;
    "versionPaymaster()": FunctionFragment;
    "whitelistMethod(address,bytes4,bool)": FunctionFragment;
    "whitelistSender(address,bool)": FunctionFragment;
    "whitelistTarget(address,bool)": FunctionFragment;
    "withdrawRelayHubDepositTo(uint256,address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "CALLDATA_SIZE_LIMIT"
      | "FORWARDER_HUB_OVERHEAD"
      | "PAYMASTER_ACCEPTANCE_BUDGET"
      | "POST_RELAYED_CALL_GAS_LIMIT"
      | "PRE_RELAYED_CALL_GAS_LIMIT"
      | "getGasAndDataLimits"
      | "getRelayHub"
      | "getTrustedForwarder"
      | "methodWhitelist"
      | "owner"
      | "postRelayedCall"
      | "preRelayedCall"
      | "renounceOwnership"
      | "senderWhitelist"
      | "setConfiguration"
      | "setRelayHub"
      | "setTrustedForwarder"
      | "supportsInterface"
      | "targetWhitelist"
      | "transferOwnership"
      | "useMethodWhitelist"
      | "useRejectOnRecipientRevert"
      | "useSenderWhitelist"
      | "useTargetWhitelist"
      | "versionPaymaster"
      | "whitelistMethod"
      | "whitelistSender"
      | "whitelistTarget"
      | "withdrawRelayHubDepositTo"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "CALLDATA_SIZE_LIMIT",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "FORWARDER_HUB_OVERHEAD",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "PAYMASTER_ACCEPTANCE_BUDGET",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "POST_RELAYED_CALL_GAS_LIMIT",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "PRE_RELAYED_CALL_GAS_LIMIT",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getGasAndDataLimits",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getRelayHub",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getTrustedForwarder",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "methodWhitelist",
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "postRelayedCall",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<boolean>,
      PromiseOrValue<BigNumberish>,
      GsnTypes.RelayDataStruct
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "preRelayedCall",
    values: [
      GsnTypes.RelayRequestStruct,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "senderWhitelist",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setConfiguration",
    values: [
      PromiseOrValue<boolean>,
      PromiseOrValue<boolean>,
      PromiseOrValue<boolean>,
      PromiseOrValue<boolean>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "setRelayHub",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setTrustedForwarder",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "targetWhitelist",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "useMethodWhitelist",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "useRejectOnRecipientRevert",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "useSenderWhitelist",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "useTargetWhitelist",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "versionPaymaster",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "whitelistMethod",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<boolean>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "whitelistSender",
    values: [PromiseOrValue<string>, PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "whitelistTarget",
    values: [PromiseOrValue<string>, PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawRelayHubDepositTo",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "CALLDATA_SIZE_LIMIT",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "FORWARDER_HUB_OVERHEAD",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "PAYMASTER_ACCEPTANCE_BUDGET",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "POST_RELAYED_CALL_GAS_LIMIT",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "PRE_RELAYED_CALL_GAS_LIMIT",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getGasAndDataLimits",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRelayHub",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTrustedForwarder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "methodWhitelist",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "postRelayedCall",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "preRelayedCall",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "senderWhitelist",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setConfiguration",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setRelayHub",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setTrustedForwarder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "targetWhitelist",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "useMethodWhitelist",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "useRejectOnRecipientRevert",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "useSenderWhitelist",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "useTargetWhitelist",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "versionPaymaster",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "whitelistMethod",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "whitelistSender",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "whitelistTarget",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawRelayHubDepositTo",
    data: BytesLike
  ): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface WhitelistPaymaster extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: WhitelistPaymasterInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    CALLDATA_SIZE_LIMIT(overrides?: CallOverrides): Promise<[BigNumber]>;

    FORWARDER_HUB_OVERHEAD(overrides?: CallOverrides): Promise<[BigNumber]>;

    PAYMASTER_ACCEPTANCE_BUDGET(
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    POST_RELAYED_CALL_GAS_LIMIT(
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    PRE_RELAYED_CALL_GAS_LIMIT(overrides?: CallOverrides): Promise<[BigNumber]>;

    getGasAndDataLimits(
      overrides?: CallOverrides
    ): Promise<
      [IPaymaster.GasAndDataLimitsStructOutput] & {
        limits: IPaymaster.GasAndDataLimitsStructOutput;
      }
    >;

    getRelayHub(overrides?: CallOverrides): Promise<[string]>;

    getTrustedForwarder(overrides?: CallOverrides): Promise<[string]>;

    methodWhitelist(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    postRelayedCall(
      context: PromiseOrValue<BytesLike>,
      success: PromiseOrValue<boolean>,
      gasUseWithoutPost: PromiseOrValue<BigNumberish>,
      relayData: GsnTypes.RelayDataStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    preRelayedCall(
      relayRequest: GsnTypes.RelayRequestStruct,
      signature: PromiseOrValue<BytesLike>,
      approvalData: PromiseOrValue<BytesLike>,
      maxPossibleGas: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    senderWhitelist(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    setConfiguration(
      _useSenderWhitelist: PromiseOrValue<boolean>,
      _useTargetWhitelist: PromiseOrValue<boolean>,
      _useMethodWhitelist: PromiseOrValue<boolean>,
      _useRejectOnRecipientRevert: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setRelayHub(
      hub: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setTrustedForwarder(
      forwarder: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    targetWhitelist(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    useMethodWhitelist(overrides?: CallOverrides): Promise<[boolean]>;

    useRejectOnRecipientRevert(overrides?: CallOverrides): Promise<[boolean]>;

    useSenderWhitelist(overrides?: CallOverrides): Promise<[boolean]>;

    useTargetWhitelist(overrides?: CallOverrides): Promise<[boolean]>;

    versionPaymaster(overrides?: CallOverrides): Promise<[string]>;

    whitelistMethod(
      target: PromiseOrValue<string>,
      method: PromiseOrValue<BytesLike>,
      isAllowed: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    whitelistSender(
      sender: PromiseOrValue<string>,
      isAllowed: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    whitelistTarget(
      target: PromiseOrValue<string>,
      isAllowed: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdrawRelayHubDepositTo(
      amount: PromiseOrValue<BigNumberish>,
      target: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  CALLDATA_SIZE_LIMIT(overrides?: CallOverrides): Promise<BigNumber>;

  FORWARDER_HUB_OVERHEAD(overrides?: CallOverrides): Promise<BigNumber>;

  PAYMASTER_ACCEPTANCE_BUDGET(overrides?: CallOverrides): Promise<BigNumber>;

  POST_RELAYED_CALL_GAS_LIMIT(overrides?: CallOverrides): Promise<BigNumber>;

  PRE_RELAYED_CALL_GAS_LIMIT(overrides?: CallOverrides): Promise<BigNumber>;

  getGasAndDataLimits(
    overrides?: CallOverrides
  ): Promise<IPaymaster.GasAndDataLimitsStructOutput>;

  getRelayHub(overrides?: CallOverrides): Promise<string>;

  getTrustedForwarder(overrides?: CallOverrides): Promise<string>;

  methodWhitelist(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  owner(overrides?: CallOverrides): Promise<string>;

  postRelayedCall(
    context: PromiseOrValue<BytesLike>,
    success: PromiseOrValue<boolean>,
    gasUseWithoutPost: PromiseOrValue<BigNumberish>,
    relayData: GsnTypes.RelayDataStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  preRelayedCall(
    relayRequest: GsnTypes.RelayRequestStruct,
    signature: PromiseOrValue<BytesLike>,
    approvalData: PromiseOrValue<BytesLike>,
    maxPossibleGas: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  senderWhitelist(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  setConfiguration(
    _useSenderWhitelist: PromiseOrValue<boolean>,
    _useTargetWhitelist: PromiseOrValue<boolean>,
    _useMethodWhitelist: PromiseOrValue<boolean>,
    _useRejectOnRecipientRevert: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setRelayHub(
    hub: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setTrustedForwarder(
    forwarder: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  targetWhitelist(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  useMethodWhitelist(overrides?: CallOverrides): Promise<boolean>;

  useRejectOnRecipientRevert(overrides?: CallOverrides): Promise<boolean>;

  useSenderWhitelist(overrides?: CallOverrides): Promise<boolean>;

  useTargetWhitelist(overrides?: CallOverrides): Promise<boolean>;

  versionPaymaster(overrides?: CallOverrides): Promise<string>;

  whitelistMethod(
    target: PromiseOrValue<string>,
    method: PromiseOrValue<BytesLike>,
    isAllowed: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  whitelistSender(
    sender: PromiseOrValue<string>,
    isAllowed: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  whitelistTarget(
    target: PromiseOrValue<string>,
    isAllowed: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdrawRelayHubDepositTo(
    amount: PromiseOrValue<BigNumberish>,
    target: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    CALLDATA_SIZE_LIMIT(overrides?: CallOverrides): Promise<BigNumber>;

    FORWARDER_HUB_OVERHEAD(overrides?: CallOverrides): Promise<BigNumber>;

    PAYMASTER_ACCEPTANCE_BUDGET(overrides?: CallOverrides): Promise<BigNumber>;

    POST_RELAYED_CALL_GAS_LIMIT(overrides?: CallOverrides): Promise<BigNumber>;

    PRE_RELAYED_CALL_GAS_LIMIT(overrides?: CallOverrides): Promise<BigNumber>;

    getGasAndDataLimits(
      overrides?: CallOverrides
    ): Promise<IPaymaster.GasAndDataLimitsStructOutput>;

    getRelayHub(overrides?: CallOverrides): Promise<string>;

    getTrustedForwarder(overrides?: CallOverrides): Promise<string>;

    methodWhitelist(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    owner(overrides?: CallOverrides): Promise<string>;

    postRelayedCall(
      context: PromiseOrValue<BytesLike>,
      success: PromiseOrValue<boolean>,
      gasUseWithoutPost: PromiseOrValue<BigNumberish>,
      relayData: GsnTypes.RelayDataStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    preRelayedCall(
      relayRequest: GsnTypes.RelayRequestStruct,
      signature: PromiseOrValue<BytesLike>,
      approvalData: PromiseOrValue<BytesLike>,
      maxPossibleGas: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string, boolean]>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    senderWhitelist(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    setConfiguration(
      _useSenderWhitelist: PromiseOrValue<boolean>,
      _useTargetWhitelist: PromiseOrValue<boolean>,
      _useMethodWhitelist: PromiseOrValue<boolean>,
      _useRejectOnRecipientRevert: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    setRelayHub(
      hub: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setTrustedForwarder(
      forwarder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    targetWhitelist(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    useMethodWhitelist(overrides?: CallOverrides): Promise<boolean>;

    useRejectOnRecipientRevert(overrides?: CallOverrides): Promise<boolean>;

    useSenderWhitelist(overrides?: CallOverrides): Promise<boolean>;

    useTargetWhitelist(overrides?: CallOverrides): Promise<boolean>;

    versionPaymaster(overrides?: CallOverrides): Promise<string>;

    whitelistMethod(
      target: PromiseOrValue<string>,
      method: PromiseOrValue<BytesLike>,
      isAllowed: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    whitelistSender(
      sender: PromiseOrValue<string>,
      isAllowed: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    whitelistTarget(
      target: PromiseOrValue<string>,
      isAllowed: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawRelayHubDepositTo(
      amount: PromiseOrValue<BigNumberish>,
      target: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
  };

  estimateGas: {
    CALLDATA_SIZE_LIMIT(overrides?: CallOverrides): Promise<BigNumber>;

    FORWARDER_HUB_OVERHEAD(overrides?: CallOverrides): Promise<BigNumber>;

    PAYMASTER_ACCEPTANCE_BUDGET(overrides?: CallOverrides): Promise<BigNumber>;

    POST_RELAYED_CALL_GAS_LIMIT(overrides?: CallOverrides): Promise<BigNumber>;

    PRE_RELAYED_CALL_GAS_LIMIT(overrides?: CallOverrides): Promise<BigNumber>;

    getGasAndDataLimits(overrides?: CallOverrides): Promise<BigNumber>;

    getRelayHub(overrides?: CallOverrides): Promise<BigNumber>;

    getTrustedForwarder(overrides?: CallOverrides): Promise<BigNumber>;

    methodWhitelist(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    postRelayedCall(
      context: PromiseOrValue<BytesLike>,
      success: PromiseOrValue<boolean>,
      gasUseWithoutPost: PromiseOrValue<BigNumberish>,
      relayData: GsnTypes.RelayDataStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    preRelayedCall(
      relayRequest: GsnTypes.RelayRequestStruct,
      signature: PromiseOrValue<BytesLike>,
      approvalData: PromiseOrValue<BytesLike>,
      maxPossibleGas: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    senderWhitelist(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setConfiguration(
      _useSenderWhitelist: PromiseOrValue<boolean>,
      _useTargetWhitelist: PromiseOrValue<boolean>,
      _useMethodWhitelist: PromiseOrValue<boolean>,
      _useRejectOnRecipientRevert: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setRelayHub(
      hub: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setTrustedForwarder(
      forwarder: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    targetWhitelist(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    useMethodWhitelist(overrides?: CallOverrides): Promise<BigNumber>;

    useRejectOnRecipientRevert(overrides?: CallOverrides): Promise<BigNumber>;

    useSenderWhitelist(overrides?: CallOverrides): Promise<BigNumber>;

    useTargetWhitelist(overrides?: CallOverrides): Promise<BigNumber>;

    versionPaymaster(overrides?: CallOverrides): Promise<BigNumber>;

    whitelistMethod(
      target: PromiseOrValue<string>,
      method: PromiseOrValue<BytesLike>,
      isAllowed: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    whitelistSender(
      sender: PromiseOrValue<string>,
      isAllowed: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    whitelistTarget(
      target: PromiseOrValue<string>,
      isAllowed: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdrawRelayHubDepositTo(
      amount: PromiseOrValue<BigNumberish>,
      target: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    CALLDATA_SIZE_LIMIT(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    FORWARDER_HUB_OVERHEAD(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    PAYMASTER_ACCEPTANCE_BUDGET(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    POST_RELAYED_CALL_GAS_LIMIT(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    PRE_RELAYED_CALL_GAS_LIMIT(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getGasAndDataLimits(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRelayHub(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getTrustedForwarder(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    methodWhitelist(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    postRelayedCall(
      context: PromiseOrValue<BytesLike>,
      success: PromiseOrValue<boolean>,
      gasUseWithoutPost: PromiseOrValue<BigNumberish>,
      relayData: GsnTypes.RelayDataStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    preRelayedCall(
      relayRequest: GsnTypes.RelayRequestStruct,
      signature: PromiseOrValue<BytesLike>,
      approvalData: PromiseOrValue<BytesLike>,
      maxPossibleGas: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    senderWhitelist(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setConfiguration(
      _useSenderWhitelist: PromiseOrValue<boolean>,
      _useTargetWhitelist: PromiseOrValue<boolean>,
      _useMethodWhitelist: PromiseOrValue<boolean>,
      _useRejectOnRecipientRevert: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setRelayHub(
      hub: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setTrustedForwarder(
      forwarder: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    targetWhitelist(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    useMethodWhitelist(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    useRejectOnRecipientRevert(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    useSenderWhitelist(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    useTargetWhitelist(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    versionPaymaster(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    whitelistMethod(
      target: PromiseOrValue<string>,
      method: PromiseOrValue<BytesLike>,
      isAllowed: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    whitelistSender(
      sender: PromiseOrValue<string>,
      isAllowed: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    whitelistTarget(
      target: PromiseOrValue<string>,
      isAllowed: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdrawRelayHubDepositTo(
      amount: PromiseOrValue<BigNumberish>,
      target: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
