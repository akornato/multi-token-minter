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
  PayableOverrides,
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
} from "../../../../common";

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

export interface IForwarderInterface extends utils.Interface {
  functions: {
    "execute((address,address,uint256,uint256,uint256,bytes,uint256),bytes32,bytes32,bytes,bytes)": FunctionFragment;
    "getNonce(address)": FunctionFragment;
    "registerDomainSeparator(string,string)": FunctionFragment;
    "registerRequestType(string,string)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "verify((address,address,uint256,uint256,uint256,bytes,uint256),bytes32,bytes32,bytes,bytes)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "execute"
      | "getNonce"
      | "registerDomainSeparator"
      | "registerRequestType"
      | "supportsInterface"
      | "verify"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "execute",
    values: [
      IForwarder.ForwardRequestStruct,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getNonce",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "registerDomainSeparator",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "registerRequestType",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "verify",
    values: [
      IForwarder.ForwardRequestStruct,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>
    ]
  ): string;

  decodeFunctionResult(functionFragment: "execute", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getNonce", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "registerDomainSeparator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerRequestType",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "verify", data: BytesLike): Result;

  events: {
    "DomainRegistered(bytes32,bytes)": EventFragment;
    "RequestTypeRegistered(bytes32,string)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "DomainRegistered"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RequestTypeRegistered"): EventFragment;
}

export interface DomainRegisteredEventObject {
  domainSeparator: string;
  domainValue: string;
}
export type DomainRegisteredEvent = TypedEvent<
  [string, string],
  DomainRegisteredEventObject
>;

export type DomainRegisteredEventFilter =
  TypedEventFilter<DomainRegisteredEvent>;

export interface RequestTypeRegisteredEventObject {
  typeHash: string;
  typeStr: string;
}
export type RequestTypeRegisteredEvent = TypedEvent<
  [string, string],
  RequestTypeRegisteredEventObject
>;

export type RequestTypeRegisteredEventFilter =
  TypedEventFilter<RequestTypeRegisteredEvent>;

export interface IForwarder extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IForwarderInterface;

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
    execute(
      forwardRequest: IForwarder.ForwardRequestStruct,
      domainSeparator: PromiseOrValue<BytesLike>,
      requestTypeHash: PromiseOrValue<BytesLike>,
      suffixData: PromiseOrValue<BytesLike>,
      signature: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getNonce(
      from: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    registerDomainSeparator(
      name: PromiseOrValue<string>,
      version: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    registerRequestType(
      typeName: PromiseOrValue<string>,
      typeSuffix: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    verify(
      forwardRequest: IForwarder.ForwardRequestStruct,
      domainSeparator: PromiseOrValue<BytesLike>,
      requestTypeHash: PromiseOrValue<BytesLike>,
      suffixData: PromiseOrValue<BytesLike>,
      signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[void]>;
  };

  execute(
    forwardRequest: IForwarder.ForwardRequestStruct,
    domainSeparator: PromiseOrValue<BytesLike>,
    requestTypeHash: PromiseOrValue<BytesLike>,
    suffixData: PromiseOrValue<BytesLike>,
    signature: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getNonce(
    from: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  registerDomainSeparator(
    name: PromiseOrValue<string>,
    version: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  registerRequestType(
    typeName: PromiseOrValue<string>,
    typeSuffix: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  verify(
    forwardRequest: IForwarder.ForwardRequestStruct,
    domainSeparator: PromiseOrValue<BytesLike>,
    requestTypeHash: PromiseOrValue<BytesLike>,
    suffixData: PromiseOrValue<BytesLike>,
    signature: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<void>;

  callStatic: {
    execute(
      forwardRequest: IForwarder.ForwardRequestStruct,
      domainSeparator: PromiseOrValue<BytesLike>,
      requestTypeHash: PromiseOrValue<BytesLike>,
      suffixData: PromiseOrValue<BytesLike>,
      signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean, string] & { success: boolean; ret: string }>;

    getNonce(
      from: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    registerDomainSeparator(
      name: PromiseOrValue<string>,
      version: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    registerRequestType(
      typeName: PromiseOrValue<string>,
      typeSuffix: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    verify(
      forwardRequest: IForwarder.ForwardRequestStruct,
      domainSeparator: PromiseOrValue<BytesLike>,
      requestTypeHash: PromiseOrValue<BytesLike>,
      suffixData: PromiseOrValue<BytesLike>,
      signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "DomainRegistered(bytes32,bytes)"(
      domainSeparator?: PromiseOrValue<BytesLike> | null,
      domainValue?: null
    ): DomainRegisteredEventFilter;
    DomainRegistered(
      domainSeparator?: PromiseOrValue<BytesLike> | null,
      domainValue?: null
    ): DomainRegisteredEventFilter;

    "RequestTypeRegistered(bytes32,string)"(
      typeHash?: PromiseOrValue<BytesLike> | null,
      typeStr?: null
    ): RequestTypeRegisteredEventFilter;
    RequestTypeRegistered(
      typeHash?: PromiseOrValue<BytesLike> | null,
      typeStr?: null
    ): RequestTypeRegisteredEventFilter;
  };

  estimateGas: {
    execute(
      forwardRequest: IForwarder.ForwardRequestStruct,
      domainSeparator: PromiseOrValue<BytesLike>,
      requestTypeHash: PromiseOrValue<BytesLike>,
      suffixData: PromiseOrValue<BytesLike>,
      signature: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getNonce(
      from: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    registerDomainSeparator(
      name: PromiseOrValue<string>,
      version: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    registerRequestType(
      typeName: PromiseOrValue<string>,
      typeSuffix: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    verify(
      forwardRequest: IForwarder.ForwardRequestStruct,
      domainSeparator: PromiseOrValue<BytesLike>,
      requestTypeHash: PromiseOrValue<BytesLike>,
      suffixData: PromiseOrValue<BytesLike>,
      signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    execute(
      forwardRequest: IForwarder.ForwardRequestStruct,
      domainSeparator: PromiseOrValue<BytesLike>,
      requestTypeHash: PromiseOrValue<BytesLike>,
      suffixData: PromiseOrValue<BytesLike>,
      signature: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getNonce(
      from: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    registerDomainSeparator(
      name: PromiseOrValue<string>,
      version: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    registerRequestType(
      typeName: PromiseOrValue<string>,
      typeSuffix: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    verify(
      forwardRequest: IForwarder.ForwardRequestStruct,
      domainSeparator: PromiseOrValue<BytesLike>,
      requestTypeHash: PromiseOrValue<BytesLike>,
      suffixData: PromiseOrValue<BytesLike>,
      signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}