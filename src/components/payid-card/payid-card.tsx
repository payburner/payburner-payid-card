import {Component, Element, h, Host, Prop, State} from '@stencil/core';
import {PayIDClient} from "@payburner/payburner-payid-client/dist/index";
import copy from 'copy-text-to-clipboard';
import {ResolvedPayID} from "@payburner/payburner-payid-client/dist/types/model/impl/ResolvedPayID";
import {CryptoAddressDetails} from "@payburner/payburner-payid-client/dist/types/model/interfaces/CryptoAddressDetails";
import {AchAddressDetails} from "@payburner/payburner-payid-client/dist/types/model/interfaces/AchAddressDetails";
import {Address} from "@payburner/payburner-payid-client/dist/types/model/interfaces/Address";


@Component({
    tag: 'payid-card',
    styleUrl: 'payid-card.css',
    shadow: true,
    assetsDirs: ['assets']
})
export class PayIDCard {

    @Prop() payid: string;

    @Prop() tolerant: boolean = true;

    @State() payIDLogo: string = 'payid.png';

    @State() payIDClient: PayIDClient;

    @State() resolvedPayID: ResolvedPayID;

    @State() showCard: boolean = false;

    @Element() el: HTMLElement;

    handleClick() {
    }

    componentWillLoad() {
        const self = this;
        this.payIDClient = new PayIDClient(this.tolerant);
        this.payIDClient.resolvePayID(this.payid).then(function (resolvedPayID) {
            self.resolvedPayID = resolvedPayID;
        }).catch(function (error) {
            alert(self.extractError(error));
        });
    }

    extractError(error) {
        if (typeof error === 'string') {
            return error;
        }
        if (typeof error === 'object' && typeof error.error !== 'undefined') {
            return error.error;
        }
        return JSON.stringify(error);
    }
    getPayId() {
        return this.resolvedPayID !== null && typeof this.resolvedPayID !== 'undefined' ? this.resolvedPayID.payId : 'Loading';
    }
    showModal() {
       this.showCard = true;
    }

    hideModal() {
        this.showCard = false;
    }


    renderAddress( address: Address ) {
        if ((address.addressDetails as CryptoAddressDetails).address) {
            const cryptoAddressDetails = address.addressDetails as CryptoAddressDetails;
            const last4 = (cryptoAddressDetails.address)+(typeof cryptoAddressDetails.tag!=='undefined'?'?dt='+cryptoAddressDetails.tag:'');
            return <div class="credit-card selectable" onClick={()=>copy(last4)}>
                <div class="credit-card-last4">
                    {last4}
                </div>
                {typeof address.environment !== 'undefined'?(
                <div class="payid-address-environment">{address.environment}</div>):null}
                <div class="payid-address-network">{address.paymentNetwork}</div>
            </div>


        }
        else  if ((address.addressDetails as AchAddressDetails).accountNumber) {
            const achAddressDetails = address.addressDetails as AchAddressDetails;
            const last4 = (achAddressDetails.routingNumber)+' ' + (achAddressDetails.accountNumber);
            return <div class="credit-card selectable">
                <div class="credit-card-last4">
                    {last4}
                </div>
                {typeof address.environment !== 'undefined' ? (
                    <div class="payid-address-environment">{address.environment}</div>) : null}
                <div class="payid-address-network">{address.paymentNetwork}</div>
            </div>
        }
        else {
            return null;
        }
    }

    renderModal() {

        const self = this;
       return <div class={this.showCard? 'modal shown' : 'modal hidden'}>
            <div class="modal-content">
                <a href="https://payid.org/"><img class="mdl-chip__contact" style={{float: 'left'}} src={'https://unpkg.com/@payburner/payburner-payid-card@0.0.1/dist/payid-card/assets/payid.png'}></img></a>
                <span class="close" onClick={()=>self.hideModal()}>&times;</span>
                <div class="payid-card mdl-card">

                    <div class="mdl-card__supporting-text payid-card-title ">
                        {self.getPayId()}
                    </div>

                    {self.resolvedPayID.addresses.map((address)=>{
                        return self.renderAddress(address);
                    })}

                    <div class="mdl-card__actions mdl-card--border" >
                        <div class="mdl-card__supporting-text " style={{fontSize:'12px'}}>
                            This is a <a href="https://github.com/payburner/payburner-payid-card">PayID Card</a> offered by <a href="https://www.payburner.com">Payburner</a>.
                        </div>
                    </div>
                </div>
            </div>
       </div>
    }
    
    render() {
        const self = this;

            return <Host payid={this.payid} >

            <span class="mdl-chip mdl-chip--contact payid-chip" onClick={()=>self.showModal()}>
                <img class="mdl-chip__contact" src={'https://unpkg.com/@payburner/payburner-payid-card@0.0.1/dist/payid-card/assets/payid.png'}></img>
                <span class="mdl-chip__text">{self.getPayId()}</span>
            </span>

                {self.showCard?(self.renderModal()):null}

            </Host>;

    }
}
