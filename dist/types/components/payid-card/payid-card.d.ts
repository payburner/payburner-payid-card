import { PayIDClient } from "@payburner/payburner-payid-client/dist/index";
import { ResolvedPayID } from "@payburner/payburner-payid-client/dist/types/model/impl/ResolvedPayID";
import { Address } from "@payburner/payburner-payid-client/dist/types/model/interfaces/Address";
export declare class PayIDCard {
    payid: string;
    tolerant: boolean;
    payIDLogo: string;
    payIDClient: PayIDClient;
    resolvedPayID: ResolvedPayID;
    showCard: boolean;
    el: HTMLElement;
    handleClick(): void;
    componentWillLoad(): void;
    extractError(error: any): any;
    getPayId(): string;
    showModal(): void;
    hideModal(): void;
    renderAddress(address: Address): any;
    renderModal(): any;
    render(): any;
}
