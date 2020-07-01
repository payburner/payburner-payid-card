import { Component, Element, h, Host, Prop, State } from '@stencil/core';
import { PayIDClient } from "@payburner/payburner-payid-client/dist/index";
import copy from 'copy-text-to-clipboard';
export class PayIDCard {
    constructor() {
        this.tolerant = true;
        this.payIDLogo = 'payid.png';
        this.showCard = false;
    }
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
    renderAddress(address) {
        if (address.addressDetails.address) {
            const cryptoAddressDetails = address.addressDetails;
            const last4 = (cryptoAddressDetails.address) + (typeof cryptoAddressDetails.tag !== 'undefined' ? '?dt=' + cryptoAddressDetails.tag : '');
            return h("div", { class: "credit-card selectable", onClick: () => copy(last4) },
                h("div", { class: "credit-card-last4" }, last4),
                typeof address.environment !== 'undefined' ? (h("div", { class: "payid-address-environment" }, address.environment)) : null,
                h("div", { class: "payid-address-network" }, address.paymentNetwork));
        }
        else if (address.addressDetails.accountNumber) {
            const achAddressDetails = address.addressDetails;
            const last4 = (achAddressDetails.routingNumber) + ' ' + (achAddressDetails.accountNumber);
            return h("div", { class: "credit-card selectable" },
                h("div", { class: "credit-card-last4" }, last4),
                typeof address.environment !== 'undefined' ? (h("div", { class: "payid-address-environment" }, address.environment)) : null,
                h("div", { class: "payid-address-network" }, address.paymentNetwork));
        }
        else {
            return null;
        }
    }
    renderModal() {
        const self = this;
        return h("div", { class: this.showCard ? 'modal shown' : 'modal hidden' },
            h("div", { class: "modal-content" },
                h("a", { href: "https://payid.org/" },
                    h("img", { class: "mdl-chip__contact", style: { float: 'left' }, src: 'https://unpkg.com/@payburner/payburner-payid-card@0.0.1/dist/payid-card/assets/payid.png' })),
                h("span", { class: "close", onClick: () => self.hideModal() }, "\u00D7"),
                h("div", { class: "payid-card mdl-card" },
                    h("div", { class: "mdl-card__supporting-text payid-card-title " }, self.getPayId()),
                    self.resolvedPayID.addresses.map((address) => {
                        return self.renderAddress(address);
                    }),
                    h("div", { class: "mdl-card__actions mdl-card--border" },
                        h("div", { class: "mdl-card__supporting-text ", style: { fontSize: '12px' } },
                            "This is a ",
                            h("a", { href: "https://github.com/payburner/payburner-payid-card" }, "PayID Card"),
                            " offered by ",
                            h("a", { href: "https://www.payburner.com" }, "Payburner"),
                            ".")))));
    }
    render() {
        const self = this;
        return h(Host, { payid: this.payid },
            h("span", { class: "mdl-chip mdl-chip--contact payid-chip", onClick: () => self.showModal() },
                h("img", { class: "mdl-chip__contact", src: 'https://unpkg.com/@payburner/payburner-payid-card@0.0.1/dist/payid-card/assets/payid.png' }),
                h("span", { class: "mdl-chip__text" }, self.getPayId())),
            self.showCard ? (self.renderModal()) : null);
    }
    static get is() { return "payid-card"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["payid-card.css"]
    }; }
    static get styleUrls() { return {
        "$": ["payid-card.css"]
    }; }
    static get assetsDirs() { return ["assets"]; }
    static get properties() { return {
        "payid": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "payid",
            "reflect": false
        },
        "tolerant": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "tolerant",
            "reflect": false,
            "defaultValue": "true"
        }
    }; }
    static get states() { return {
        "payIDLogo": {},
        "payIDClient": {},
        "resolvedPayID": {},
        "showCard": {}
    }; }
    static get elementRef() { return "el"; }
}
