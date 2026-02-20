import { WALLET_STANDARD_ERROR__USER__REQUEST_REJECTED, isWalletStandardError } from "@mysten/wallet-standard";
import { promiseWithResolvers } from "@mysten/utils";
import { SLUSH_WALLET_NAME } from "@mysten/slush-wallet";
import "@webcomponents/scoped-custom-element-registry";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { MultiStoreController } from "@nanostores/lit";
import { ScopedRegistryHost } from "@lit-labs/scoped-registry-mixin";
import { classMap } from "lit/directives/class-map.js";
import { formatAddress, normalizeSuiNSName } from "@mysten/sui/utils";
import { autoPlacement, autoUpdate, computePosition, flip, offset, shift } from "@floating-ui/dom";
import { when } from "lit/directives/when.js";
import { Task } from "@lit/task";

//#region src/utils/lit.ts
/**
* Property decorator that creates a property that can be assigned different dApp Kit instances.
* When a property in the internal store changes, it will automatically disconnect the old store's
* controller and create a new one for the new store.
*
* Inspired by https://github.com/nanostores/lit/issues/10#issuecomment-2781516844 :)
*/
function storeProperty() {
	return function(target, propertyKey) {
		const controllerKey = Symbol();
		const valueKey = Symbol();
		Object.defineProperty(target, propertyKey, {
			get() {
				return this[valueKey];
			},
			set(newInstance) {
				const oldInstance = this[valueKey];
				if (oldInstance === newInstance) return;
				this[valueKey] = newInstance;
				const existingController = this[controllerKey];
				if (existingController) {
					existingController.hostDisconnected();
					this.removeController(existingController);
				}
				const newController = newInstance ? new MultiStoreController(this, Object.values(newInstance.stores)) : void 0;
				this[controllerKey] = newController;
				if (existingController && !newController) this.requestUpdate(propertyKey, oldInstance);
			},
			configurable: true,
			enumerable: true
		});
	};
}

//#endregion
//#region src/web/styles/reset.ts
const resetStyles = css`
	* {
		box-sizing: border-box;
		-webkit-font-smoothing: antialiased;
		font-family: var(--dapp-kit-font-sans);
		outline-color: color-mix(in oklab, var(--dapp-kit-ring) 50%, transparent);
	}

	button {
		appearance: none;
		background-color: transparent;
		font-size: inherit;
		font-family: inherit;
		line-height: inherit;
		letter-spacing: inherit;
		color: inherit;
		border: 0;
		padding: 0;
		margin: 0;
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	p,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-size: inherit;
		font-weight: inherit;
		color: var(--dapp-kit-foreground);
		margin: 0;
	}
`;

//#endregion
//#region src/web/styles/theme.ts
const themeStyles = css`
	:host {
		/** Colors */
		--dapp-kit-background: var(--background, oklch(1 0 0));
		--dapp-kit-foreground: var(--foreground, oklch(0.145 0 0));
		--dapp-kit-primary: var(--primary, oklch(0.216 0.006 56.043));
		--dapp-kit-primary-foreground: var(--primary-foreground, oklch(0.985 0.001 106.423));
		--dapp-kit-secondary: var(--secondary, oklch(0.97 0.001 106.424));
		--dapp-kit-secondary-foreground: var(--secondary-foreground, oklch(0.216 0.006 56.043));
		--dapp-kit-border: var(--border, oklch(0.922 0 0));
		--dapp-kit-accent: var(--accent, oklch(0.97 0.001 106.424));
		--dapp-kit-accent-foreground: var(--accent-foreground, oklch(0.205 0 0));
		--dapp-kit-muted: var(--muted, oklch(0.97 0.001 106.424));
		--dapp-kit-muted-foreground: var(--muted-foreground, oklch(0.553 0.013 58.071));
		--dapp-kit-popover: var(--popover, oklch(1 0 0));
		--dapp-kit-popover-foreground: var(--popover-foreground, oklch(0.145 0 0));
		--dapp-kit-destructive: var(--destructive, oklch(0.577 0.245 27.325));
		--dapp-kit-positive: var(--positive, oklch(0.862 0.127 146.2));
		--dapp-kit-ring: var(--ring, oklch(0.708 0 0));
		--dapp-kit-input: var(--input, oklch(0.922 0 0));

		/** Radii */
		--dapp-kit-radius: var(--radius, 12px);
		--dapp-kit-radius-xs: calc(var(--dapp-kit-radius) - 4px);
		--dapp-kit-radius-sm: calc(var(--dapp-kit-radius) - 4px);
		--dapp-kit-radius-md: calc(var(--dapp-kit-radius) - 2px);
		--dapp-kit-radius-lg: var(--dapp-kit-radius);
		--dapp-kit-radius-xl: calc(var(--dapp-kit-radius) + 4px);

		/** Typography */
		--dapp-kit-font-sans: var(
			--font-sans,
			ui-sans-serif,
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			'Helvetica Neue',
			Arial,
			'Noto Sans',
			sans-serif,
			'Apple Color Emoji',
			'Segoe UI Emoji',
			'Segoe UI Symbol',
			'Noto Color Emoji'
		);
		--dapp-kit-font-weight-medium: var(--font-medium, 500);
		--dapp-kit-font-weight-semibold: var(--font-semibold, 600);
	}
`;

//#endregion
//#region src/web/styles/index.ts
const sharedStyles = [themeStyles, resetStyles];

//#endregion
//#region src/web/internal/wallet-list-item.styles.ts
const styles$5 = [sharedStyles, css`
		.wallet-button {
			transition-property: background-color;
			transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
			transition-duration: 0.15s;
			text-decoration: none;
			background-color: var(--dapp-kit-secondary);
			border-radius: var(--dapp-kit-radius-lg);
			display: flex;
			align-items: center;
			gap: 12px;
			width: 100%;
			padding: 12px;
		}

		.wallet-button:hover {
			background-color: oklab(from var(--dapp-kit-secondary) calc(l - 0.01) a b);
		}

		img {
			width: 32px;
			height: 32px;
			border-radius: var(--dapp-kit-radius-lg);
		}

		p {
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			font-weight: var(--dapp-kit-font-weight-medium);
		}
	`];

//#endregion
//#region \0@oxc-project+runtime@0.107.0/helpers/decorate.js
function __decorate(decorators, target, key, desc) {
	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
}

//#endregion
//#region src/web/internal/wallet-list-item.ts
var WalletListItem = class extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.autofocus = false;
	}
	static {
		this.styles = styles$5;
	}
	render() {
		return html`
			<li>
				<button
					type="button"
					class="wallet-button"
					@click=${this.#walletClicked}
					?autofocus=${this.autofocus}
				>
					<img src=${this.wallet.icon} alt=${`${this.wallet.name} logo`} />
					<p>${this.wallet.name}</p>
				</button>
			</li>
		`;
	}
	#walletClicked() {
		this.dispatchEvent(new CustomEvent("wallet-selected", {
			detail: { wallet: this.wallet },
			bubbles: true,
			composed: true
		}));
	}
};
__decorate([property()], WalletListItem.prototype, "wallet", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], WalletListItem.prototype, "autofocus", void 0);

//#endregion
//#region src/web/internal/wallet-list.styles.ts
const styles$4 = [sharedStyles, css`
		:host {
			display: flex;
			flex-direction: column;
			flex-grow: 1;
		}

		ul {
			display: flex;
			flex-direction: column;
			gap: 12px;
		}

		.no-wallets-container {
			display: flex;
			flex-direction: column;
			flex-grow: 1;
		}

		.no-wallets-content {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			flex-grow: 1;
			gap: 32px;
		}

		.title {
			font-weight: var(--dapp-kit-font-weight-semibold);
			text-align: center;
			font-size: 28px;
		}

		.wallet-cta {
			display: flex;
			flex-direction: column;
			width: 100%;
		}
	`];

//#endregion
//#region src/web/internal/button.styles.ts
const styles$3 = [sharedStyles, css`
		.button {
			transition-property: background-color;
			transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
			transition-duration: 0.15s;
			border-radius: var(--dapp-kit-radius-md);
			font-weight: var(--dapp-kit-font-weight-semibold);
			text-decoration: none;
			outline-style: none;
			display: inline-flex;
			justify-content: center;
			align-items: center;
			gap: 12px;
			padding-left: 16px;
			padding-right: 16px;
			padding-top: 8px;
			padding-bottom: 8px;
			height: 40px;
		}

		.button:focus-visible {
			border-color: var(--dapp-kit-ring);
			box-shadow:
				0 0 0 3px color-mix(in oklab, var(--dapp-kit-ring) 50%, transparent),
				rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
		}

		.button.primary {
			background-color: var(--dapp-kit-primary);
			color: var(--dapp-kit-primary-foreground);
		}

		.button.primary:hover:not(:disabled) {
			background-color: color-mix(in oklab, var(--dapp-kit-primary) 90%, transparent);
		}

		.button.secondary {
			background-color: var(--dapp-kit-secondary);
			color: var(--dapp-kit-secondary-foreground);
		}

		.button.secondary:hover:not(:disabled) {
			background-color: color-mix(in oklab, var(--dapp-kit-secondary) 80%, transparent);
		}
	`];

//#endregion
//#region src/web/internal/button.ts
var Button = class extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.variant = "primary";
		this.href = "";
		this.disabled = false;
	}
	static {
		this.shadowRootOptions = {
			...LitElement.shadowRootOptions,
			delegatesFocus: true
		};
	}
	static {
		this.styles = styles$3;
	}
	render() {
		return this.href ? html`
					<a
						href=${this.href}
						?disabled=${this.disabled}
						target="_blank"
						rel="noreferrer"
						class=${classMap({
			button: true,
			[this.variant]: true
		})}
					>
						<slot part="button-content"></slot>
					</a>
				` : html`
					<button
						type="button"
						?disabled=${this.disabled}
						class=${classMap({
			button: true,
			[this.variant]: true
		})}
					>
						<slot part="button-content"></slot>
					</button>
				`;
	}
};
__decorate([property({ type: String })], Button.prototype, "variant", void 0);
__decorate([property({ type: String })], Button.prototype, "href", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], Button.prototype, "disabled", void 0);

//#endregion
//#region src/web/internal/icons/download-icon.ts
const downloadIcon = html`<svg
	width="80"
	height="80"
	viewBox="0 0 80 80"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		d="M0 40C0 17.9086 17.9086 0 40 0C62.0914 0 80 17.9086 80 40C80 62.0914 62.0914 80 40 80C17.9086 80 0 62.0914 0 40Z"
		fill="currentColor"
		fill-opacity="0.08"
	/>
	<path
		fill-rule="evenodd"
		clip-rule="evenodd"
		d="M39.6881 28.8311C39.4347 28.9111 39.1675 29.1669 39.0607 29.4318L39.0041 29.572L38.9977 35.5349L38.9914 41.4978L37.8217 40.3324C36.5477 39.063 36.5486 39.0637 36.228 39.0138C35.7909 38.9458 35.3452 39.1858 35.1541 39.592C35.0986 39.7101 35.0921 39.7532 35.0921 40C35.0921 40.4608 34.9004 40.2321 37.3099 42.6471C39.1553 44.4968 39.4299 44.763 39.5579 44.8263C39.8344 44.9632 40.1614 44.9624 40.4441 44.8244C40.5705 44.7626 40.843 44.4987 42.679 42.659C45.0881 40.2451 44.9081 40.4599 44.9081 40C44.9081 39.7458 44.9027 39.7132 44.8403 39.586C44.6384 39.1748 44.2051 38.9438 43.7678 39.0142C43.4501 39.0654 43.4497 39.0657 42.1784 40.3324L41.0087 41.4978L41.0024 35.5349L40.9961 29.572L40.9395 29.4318C40.8294 29.1587 40.5615 28.9075 40.2964 28.8288C40.1444 28.7836 39.8347 28.7848 39.6881 28.8311ZM31.114 46.0981C30.9593 46.1346 30.7812 46.2398 30.647 46.374C30.4216 46.5994 30.3357 46.8708 30.3627 47.272C30.3949 47.7507 30.4603 48.0732 30.6081 48.484C31.0707 49.7693 32.1522 50.7474 33.4841 51.0852C33.9919 51.2141 33.6619 51.2078 39.9943 51.2079C46.331 51.208 46.0036 51.2142 46.5161 51.085C47.8428 50.7503 48.9303 49.7668 49.392 48.484C49.5851 47.9478 49.6896 47.2429 49.6266 46.9026C49.5428 46.4495 49.1756 46.1129 48.7285 46.0791C48.3302 46.0489 47.9715 46.2363 47.7705 46.5793C47.687 46.7218 47.6625 46.8267 47.6335 47.1663C47.5846 47.7384 47.4064 48.16 47.0574 48.5289C46.6981 48.9088 46.2476 49.1338 45.7272 49.1934C45.5791 49.2103 43.6721 49.2161 39.8441 49.2112L34.1801 49.204L33.9966 49.1516C33.5867 49.0347 33.3159 48.8845 33.0317 48.6166C32.6281 48.2363 32.4192 47.7806 32.3667 47.1663C32.3377 46.8267 32.3132 46.7218 32.2297 46.5793C32.1479 46.4397 31.9572 46.2518 31.8327 46.1882C31.6225 46.0807 31.3388 46.0451 31.114 46.0981Z"
		fill="currentColor"
	/>
</svg>`;

//#endregion
//#region src/web/internal/icons/arrow-right-up-icon.ts
const arrowRightUpIcon = html`<svg
	width="17"
	height="16"
	viewBox="0 0 17 16"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		fill-rule="evenodd"
		clip-rule="evenodd"
		d="M4.19888 1.05645C4.0026 1.08501 3.7911 1.24624 3.706 1.43215C3.62348 1.61237 3.62622 1.84103 3.71297 2.01403C3.79982 2.18722 3.99089 2.3325 4.17827 2.36781C4.23528 2.37855 5.77091 2.38405 8.71417 2.38405H13.1639L7.41745 8.13205C2.23561 13.3153 1.66614 13.8898 1.62155 13.9796C1.48908 14.2462 1.5436 14.5657 1.75579 14.7664C1.95884 14.9584 2.23582 15.003 2.50305 14.8868C2.59953 14.8449 2.8643 14.5828 8.36009 9.0896L14.1161 3.33629V7.78598C14.1161 10.7292 14.1216 12.2649 14.1323 12.3219C14.1819 12.5852 14.4093 12.8046 14.6761 12.8467C15.0449 12.9048 15.3918 12.6521 15.4446 12.2868C15.4668 12.1329 15.465 1.71239 15.4427 1.59173C15.3934 1.32528 15.1749 1.10672 14.9084 1.05746C14.7978 1.03703 4.33916 1.03603 4.19888 1.05645Z"
		fill="currentColor"
	/>
</svg> `;

//#endregion
//#region src/web/internal/wallet-list.ts
var WalletList = class extends ScopedRegistryHost(LitElement) {
	constructor(..._args) {
		super(..._args);
		this.wallets = [];
	}
	static {
		this.elementDefinitions = {
			"wallet-list-item": WalletListItem,
			"internal-button": Button
		};
	}
	static {
		this.styles = styles$4;
	}
	render() {
		return this.wallets.length === 0 ? html`<div class="no-wallets-container">
					<div class="no-wallets-content">
						${downloadIcon}
						<h2 class="title">Install a wallet to get started on Sui</h2>
					</div>
					<internal-button class="wallet-cta" href="https://sui.io/get-started">
						Select a wallet to install ${arrowRightUpIcon}
					</internal-button>
				</div>` : html`<ul class="wallet-list">
					${this.wallets.map((wallet, index) => html`<wallet-list-item
								.wallet=${wallet}
								?autofocus=${index === 0}
							></wallet-list-item>`)}
				</ul>`;
	}
};
__decorate([property({ type: Object })], WalletList.prototype, "wallets", void 0);

//#endregion
//#region src/web/internal/base-modal.ts
var BaseModal = class extends LitElement {
	#isOpen = false;
	#isOpening = false;
	#isConnected = promiseWithResolvers();
	#returnValue;
	#nextClickIsFromContent = false;
	static {
		this.shadowRootOptions = {
			...LitElement.shadowRootOptions,
			delegatesFocus: true
		};
	}
	/**
	* Opens the dialog when set to `true` and closes it when set to `false`.
	*/
	get open() {
		return this.#isOpen;
	}
	set open(open) {
		if (open === this.#isOpen) return;
		this.#isOpen = open;
		if (this.#isOpen) {
			this.setAttribute("open", "");
			this.show();
		} else {
			this.removeAttribute("open");
			this.close();
		}
	}
	/**
	* Opens the dialog and fires a cancelable `open` event. An `opened` event
	* is fired after the dialog opens.
	*
	* @returns A `Promise` that resolves after the `opened` event was fired.
	*/
	async show() {
		this.#isOpening = true;
		await this.#isConnected.promise;
		await this.updateComplete;
		if (this._dialog.open || !this.#isOpening) {
			this.#isOpening = false;
			return;
		}
		if (!this.dispatchEvent(new Event("open", { cancelable: true }))) {
			this.open = false;
			this.#isOpening = false;
			return;
		}
		this._dialog.showModal();
		this.open = true;
		this.dispatchEvent(new Event("opened"));
		this.#isOpening = false;
	}
	/**
	* Closes the dialog and fires a cancelable `close` event. After a dialog's
	* animation, a `closed` event is fired.
	*
	* @param returnValue A return value usually indicating which button was used
	*     to close a dialog. If a dialog is canceled by clicking the backdrop or
	*     pressing Escape, it will not change the return value after closing.
	* @returns A Promise that resolves after the `closed` event was fired.
	*/
	async close(returnValue = this.#returnValue) {
		this.#isOpening = false;
		if (!this.isConnected) {
			this.open = false;
			return;
		}
		await this.updateComplete;
		if (!this._dialog.open || this.#isOpening) {
			this.open = false;
			return;
		}
		const prevReturnValue = this.#returnValue;
		this.#returnValue = returnValue;
		if (!this.dispatchEvent(new Event("close", { cancelable: true }))) {
			this.#returnValue = prevReturnValue;
			return;
		}
		this._dialog.close(this.#returnValue);
		this.open = false;
		this.dispatchEvent(new Event("closed"));
	}
	connectedCallback() {
		super.connectedCallback();
		this.#isConnected.resolve();
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this.#isConnected = Promise.withResolvers();
	}
	handleContentClick() {
		this.#nextClickIsFromContent = true;
	}
	handleDialogClick() {
		if (this.#nextClickIsFromContent) {
			this.#nextClickIsFromContent = false;
			return;
		}
		if (!this.dispatchEvent(new Event("cancel", { cancelable: true }))) return;
		this.close();
	}
};
__decorate([property({ type: Boolean })], BaseModal.prototype, "open", null);
__decorate([query("dialog")], BaseModal.prototype, "_dialog", void 0);

//#endregion
//#region src/web/internal/icons/close-icon.ts
const closeIcon = html`<svg
	width="16"
	height="16"
	viewBox="0 0 16 16"
	fill="currentColor"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		fill-rule="evenodd"
		clip-rule="evenodd"
		d="M2.04841 1.59812C2.00001 1.61375 1.93695 1.63878 1.90828 1.65375C1.83709 1.69091 1.68775 1.84287 1.65047 1.91606C1.54047 2.13201 1.54381 2.37028 1.6597 2.57601C1.68564 2.62206 2.66404 3.61254 4.37417 5.32401L7.04809 8.00001L4.37417 10.676C2.67052 12.381 1.68551 13.3781 1.65959 13.424C1.49234 13.7201 1.56607 14.0843 1.83583 14.2945C2.04141 14.4547 2.34161 14.4734 2.57641 14.3408C2.62228 14.3149 3.61943 13.3299 5.32441 11.6262L8.00041 8.95233L10.6764 11.6262C12.3814 13.3299 13.3785 14.3149 13.4244 14.3408C13.6592 14.4734 13.9594 14.4547 14.165 14.2945C14.4347 14.0843 14.5085 13.7201 14.3412 13.424C14.3153 13.3781 13.3303 12.381 11.6266 10.676L8.95273 8.00001L11.6266 5.32401C13.3303 3.61903 14.3153 2.62188 14.3412 2.57601C14.4738 2.34121 14.4551 2.04102 14.2949 1.83543C14.0847 1.56567 13.7205 1.49195 13.4244 1.65919C13.3785 1.68511 12.3814 2.67012 10.6764 4.37377L8.00041 7.04769L5.32441 4.37377C3.61293 2.66364 2.62245 1.68524 2.57641 1.65931C2.41372 1.56766 2.21439 1.54457 2.04841 1.59812Z"
	/>
</svg> `;

//#endregion
//#region src/web/internal/icons/back-icon.ts
const backIcon = html`<svg
	width="15"
	height="16"
	viewBox="0 0 15 16"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		fill-rule="evenodd"
		clip-rule="evenodd"
		d="M6.90786 1.05824C6.70479 1.08877 6.91965 0.871204 3.62561 4.38197C0.943351 7.24072 0.593731 7.6189 0.554431 7.70397C0.501166 7.81932 0.480376 7.96424 0.497641 8.09997C0.525721 8.32084 0.315931 8.08477 3.59808 11.5887C5.25324 13.3557 6.6377 14.8229 6.67466 14.8493C6.76715 14.9153 6.88374 14.9481 7.01883 14.9464C7.19993 14.9441 7.32822 14.8862 7.45368 14.7503C7.6404 14.5479 7.68581 14.2362 7.56597 13.9793C7.53443 13.9117 7.06523 13.403 5.08008 11.2841L2.63307 8.67231L8.31776 8.66796C13.6185 8.66392 14.0073 8.6618 14.0739 8.63648C14.173 8.59888 14.3009 8.50512 14.3625 8.425C14.5276 8.21008 14.553 7.89213 14.4239 7.65714C14.3438 7.51138 14.1733 7.38224 14.013 7.34596C13.9549 7.33282 12.4096 7.32797 8.28312 7.32797H2.63276L5.07993 4.71597C7.0652 2.59698 7.53443 2.08824 7.56597 2.02063C7.68584 1.76365 7.6404 1.452 7.45358 1.24956C7.30854 1.09239 7.1201 1.02632 6.90786 1.05824Z"
		fill="currentColor"
	/>
</svg> `;

//#endregion
//#region src/web/internal/connection-status.styles.ts
const styles$2 = [sharedStyles, css`
		:host {
			display: flex;
			flex-direction: column;
			align-items: center;
			text-align: center;
			flex-grow: 1;
			gap: 40px;
		}

		.logo {
			width: 120px;
			height: 120px;
			border-radius: var(--dapp-kit-radius-lg);
		}

		.container {
			display: flex;
			flex-direction: column;
			flex-grow: 1;
			gap: 12px;
		}

		.title {
			font-size: 24px;
			font-weight: var(--dapp-kit-font-weight-medium);
		}

		.copy {
			color: var(--dapp-kit-muted-foreground);
		}

		::slotted(*) {
			display: flex;
			flex-direction: column;
			width: 100%;
		}
	`];

//#endregion
//#region src/web/internal/connection-status.ts
var ConnectionStatus = class extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.title = "";
		this.copy = "";
	}
	static {
		this.styles = styles$2;
	}
	render() {
		return html`
			<img class="logo" src=${this.wallet.icon} alt=${`${this.wallet.name} logo`} />
			<div class="container">
				<h3 class="title">${this.title}</h3>
				<p class="copy">${this.copy}</p>
			</div>
			<slot name="call-to-action"></slot>
		`;
	}
};
__decorate([property({ type: Object })], ConnectionStatus.prototype, "wallet", void 0);
__decorate([property({ type: String })], ConnectionStatus.prototype, "title", void 0);
__decorate([property({ type: String })], ConnectionStatus.prototype, "copy", void 0);

//#endregion
//#region src/web/dapp-kit-connect-modal.styles.ts
const styles$1 = [sharedStyles, css`
		dialog {
			width: 360px;
			height: 480px;
			border: 1px solid var(--dapp-kit-border);
			padding: 0;
			background: var(--dapp-kit-background);
			border-radius: var(--dapp-kit-radius-lg);
		}

		.content {
			display: flex;
			flex-direction: column;
			height: 100%;
			gap: 32px;
			padding: 24px;
		}

		.connect-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: 8px;
		}

		.title {
			font-size: 18px;
			font-weight: var(--dapp-kit-font-weight-semibold);
			white-space: nowrap;
		}

		.close-button {
			margin-left: auto;
		}

		.cancel-button {
			margin-top: auto;
		}
	`];

//#endregion
//#region src/web/styles/icon-button.ts
const iconButtonStyles = css`
	.icon-button {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: inherit;
		color: var(--dapp-kit-foreground);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		transition:
			background-color 200ms,
			transform 100ms;
	}

	.icon-button:hover {
		background-color: var(--dapp-kit-accent);
	}

	.icon-button:active {
		transform: scale(0.9);
	}
`;

//#endregion
//#region src/web/dapp-kit-connect-modal.ts
let DAppKitConnectModal = class DAppKitConnectModal$1 extends ScopedRegistryHost(BaseModal) {
	constructor(..._args) {
		super(..._args);
		this._state = { view: "wallet-selection" };
	}
	static {
		this.styles = [styles$1, iconButtonStyles];
	}
	static {
		this.elementDefinitions = {
			"wallet-list": WalletList,
			"internal-button": Button,
			"connection-status": ConnectionStatus
		};
	}
	#abortController;
	render() {
		const showBackButton = this._state.view === "connecting" || this._state.view === "error";
		const wallets = this.#getWallets();
		return html`<dialog @click=${this.handleDialogClick} @close=${this.#resetSelection}>
			<div class="content" @click=${this.handleContentClick}>
				<div class="connect-header">
					${showBackButton ? html`<button
								class="icon-button back-button"
								aria-label="Go back"
								@click=${this.#resetSelection}
							>
								${backIcon}
							</button>` : nothing}
					<h2 class="title">${wallets.length > 0 ? "Connect a wallet" : "No wallets installed"}</h2>
					<button
						class="icon-button close-button"
						aria-label="Close"
						@click=${() => {
			this.close("cancel");
		}}
					>
						${closeIcon}
					</button>
				</div>
				${this.#renderModalView(wallets)}
			</div>
		</dialog>`;
	}
	#renderModalView(wallets) {
		switch (this._state.view) {
			case "wallet-selection": return html`<wallet-list
					.wallets=${wallets}
					@wallet-selected=${async (event) => {
				this.#attemptConnect(event.detail.wallet);
			}}
				></wallet-list>`;
			case "connecting": return html`<connection-status
					.title=${"Awaiting connection..."}
					.copy=${`Accept the request from ${this._state.wallet.name} in order to proceed`}
					.wallet=${this._state.wallet}
				>
					<internal-button
						slot="call-to-action"
						.variant=${"secondary"}
						@click=${this.#resetSelection}
					>
						Cancel
					</internal-button>
				</connection-status>`;
			case "error":
				const { wallet, error } = this._state;
				const wasRequestCancelled = isWalletStandardError(error, WALLET_STANDARD_ERROR__USER__REQUEST_REJECTED);
				return html`<connection-status
					.title=${wasRequestCancelled ? "Request canceled" : "Connection failed"}
					.copy=${wasRequestCancelled ? `You canceled the request` : "Something went wrong. Please try again"}
					.wallet=${wallet}
				>
					<internal-button
						slot="call-to-action"
						@click=${() => {
					this.#attemptConnect(wallet);
				}}
					>
						Retry
					</internal-button>
				</connection-status>`;
			default: throw new Error(`Encountered unknown view state: ${this._state}`);
		}
	}
	async #attemptConnect(wallet) {
		let delayTimeout;
		try {
			const abortPromise = new Promise((_, reject) => {
				this.#abortController = new AbortController();
				this.#abortController.signal.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")), { once: true });
			});
			delayTimeout = setTimeout(() => {
				this._state = {
					view: "connecting",
					wallet
				};
			}, 100);
			await Promise.race([abortPromise, this.instance.connectWallet({ wallet })]);
			this.close("successful-connection");
		} catch (error) {
			if (error instanceof Error && error.name === "AbortError") this._state = { view: "wallet-selection" };
			else this._state = {
				view: "error",
				wallet,
				error
			};
		} finally {
			clearTimeout(delayTimeout);
		}
	}
	#resetSelection() {
		if (this._state.view === "connecting") this.#abortController?.abort("cancelled");
		else this._state = { view: "wallet-selection" };
	}
	#getWallets() {
		const wallets = this.instance.stores.$wallets.get();
		const filtered = this.filterFn ? wallets.filter(this.filterFn) : wallets;
		return this.sortFn ? filtered.toSorted(this.sortFn) : filtered;
	}
};
__decorate([storeProperty()], DAppKitConnectModal.prototype, "instance", void 0);
__decorate([state()], DAppKitConnectModal.prototype, "_state", void 0);
__decorate([property({ attribute: false })], DAppKitConnectModal.prototype, "filterFn", void 0);
__decorate([property({ attribute: false })], DAppKitConnectModal.prototype, "sortFn", void 0);
DAppKitConnectModal = __decorate([customElement("mysten-dapp-kit-connect-modal")], DAppKitConnectModal);

//#endregion
//#region src/web/internal/icons/unlink-icon.ts
const unlinkIcon = html`<svg
	width="17"
	height="16"
	viewBox="0 0 17 16"
	fill="currentColor"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		fill-rule="evenodd"
		clip-rule="evenodd"
		d="M11.22 0.538749C10.6265 0.598285 10.1912 0.722509 9.66001 0.983949C9.37775 1.12286 9.12319 1.28297 8.87601 1.47704C8.69228 1.62129 6.93319 3.37158 6.85697 3.48597C6.78033 3.60101 6.75383 3.69451 6.75437 3.84801C6.75508 4.04564 6.81122 4.18171 6.94887 4.31936C7.14239 4.51288 7.43207 4.56667 7.68401 4.45585C7.78109 4.41317 7.84866 4.34988 8.70001 3.50432C9.20161 3.00612 9.65881 2.56196 9.71601 2.51731C10.0519 2.25499 10.4706 2.05141 10.892 1.94537C11.2092 1.86557 11.7213 1.84326 12.0514 1.89489C12.9243 2.03139 13.651 2.49584 14.1437 3.23201C14.3077 3.47704 14.4669 3.8423 14.5477 4.15877C14.6587 4.59373 14.6616 5.18297 14.5546 5.60801C14.4471 6.03561 14.2443 6.45003 13.9762 6.79022C13.9268 6.85281 13.489 7.30361 13.0031 7.79201C12.5173 8.28041 12.1015 8.7095 12.0793 8.74557C12.0217 8.83864 11.988 8.96494 11.9882 9.08693C11.9885 9.27032 12.0513 9.42179 12.1808 9.55125C12.3159 9.68635 12.4532 9.74419 12.644 9.74638C12.7905 9.74808 12.9047 9.71592 13.016 9.64171C13.1301 9.56558 14.864 7.82219 15.0147 7.63201C15.502 7.01705 15.8117 6.30936 15.9321 5.53601C15.9672 5.31038 15.9813 4.73297 15.9576 4.48801C15.9054 3.94678 15.7771 3.48822 15.5414 3.00001C15.3126 2.52614 15.0685 2.18312 14.6927 1.80733C13.9789 1.09355 13.1035 0.668781 12.1059 0.552077C11.9206 0.530397 11.3837 0.522333 11.22 0.538749ZM5.2445 1.05827C5.0433 1.08664 4.84421 1.23966 4.75012 1.43825L4.70001 1.54401L4.69549 2.46219C4.69154 3.26985 4.69412 3.39117 4.71692 3.47019C4.76266 3.62872 4.85655 3.75208 5.00476 3.84838C5.20802 3.98045 5.48217 3.98582 5.69402 3.8619C5.77233 3.81611 5.90889 3.67566 5.94727 3.60145C6.01841 3.46387 6.01965 3.44486 6.01983 2.49262C6.02001 1.61425 6.01895 1.58238 5.98692 1.49678C5.87002 1.18435 5.57716 1.01137 5.2445 1.05827ZM2.59673 1.58549C2.4178 1.62057 2.22357 1.77176 2.14122 1.94009C2.08143 2.06232 2.05881 2.21302 2.08055 2.34425C2.11277 2.53877 2.15631 2.60016 2.52401 2.96969C2.81721 3.26435 2.87423 3.31429 2.97162 3.36169C3.07791 3.41342 3.09167 3.41601 3.25962 3.41601C3.4238 3.41601 3.44327 3.41257 3.541 3.36627C3.67756 3.30155 3.80154 3.17757 3.86626 3.04101C3.91257 2.94328 3.91601 2.9238 3.91601 2.75963C3.91601 2.59168 3.91341 2.57792 3.86169 2.47163C3.81428 2.37424 3.76434 2.31721 3.46969 2.02401C3.10991 1.66603 3.04322 1.61725 2.86836 1.58408C2.77031 1.56549 2.69684 1.56587 2.59673 1.58549ZM2.02801 4.21445C1.85482 4.26936 1.69453 4.40416 1.61634 4.56062C1.53162 4.73012 1.5306 4.97821 1.61388 5.14899C1.67375 5.27179 1.8045 5.39857 1.93497 5.46037L2.04401 5.51201L2.96401 5.51667C3.92485 5.52155 3.95385 5.51987 4.09084 5.45173C4.17271 5.41101 4.31301 5.27763 4.36189 5.19403C4.57817 4.82427 4.38473 4.33845 3.97309 4.21753C3.89789 4.19545 3.76553 4.19216 2.98909 4.19309C2.31132 4.19389 2.07636 4.19912 2.02801 4.21445ZM10.4794 5.24865C10.4373 5.25573 10.3545 5.28401 10.2954 5.3115C10.1935 5.35891 10.0767 5.47275 8.02474 7.52475C5.98373 9.56576 5.85868 9.694 5.81218 9.794C5.68556 10.0662 5.73263 10.3648 5.93393 10.5661C6.13521 10.7674 6.4338 10.8145 6.70602 10.6878C6.80602 10.6413 6.93426 10.5163 8.97527 8.47528C11.0163 6.43427 11.1413 6.30603 11.1878 6.20603C11.2829 6.00173 11.2838 5.80633 11.1907 5.61C11.1022 5.42347 10.9104 5.28238 10.6982 5.24763C10.5933 5.23045 10.5875 5.23048 10.4794 5.24865ZM4.25201 6.25709C4.13005 6.27627 4.07709 6.29624 3.98469 6.35787C3.87025 6.43421 2.13679 8.17691 1.98524 8.36801C1.7866 8.61848 1.62597 8.87236 1.48417 9.16001C1.25775 9.61931 1.14644 9.96928 1.0669 10.472C1.03255 10.6891 1.01855 11.2894 1.04242 11.5218C1.13201 12.3938 1.44233 13.1559 1.99106 13.8515C2.11753 14.0118 2.48823 14.3825 2.64853 14.509C3.34417 15.0577 4.10626 15.368 4.9782 15.4576C5.21338 15.4818 5.80996 15.4674 6.03601 15.4322C6.811 15.3113 7.51625 15.0026 8.13201 14.5147C8.32218 14.364 10.0656 12.6301 10.1417 12.516C10.2159 12.4047 10.2481 12.2905 10.2464 12.144C10.2442 11.9532 10.1863 11.8159 10.0512 11.6808C9.92178 11.5513 9.77031 11.4885 9.58692 11.4882C9.46493 11.488 9.33863 11.5217 9.24556 11.5793C9.20949 11.6015 8.78041 12.0173 8.29201 12.5031C7.80361 12.989 7.35281 13.4268 7.29021 13.4762C6.95002 13.7443 6.53561 13.9471 6.10801 14.0547C5.68297 14.1616 5.09372 14.1587 4.65876 14.0477C4.1114 13.9079 3.64604 13.6439 3.25109 13.2489C2.7846 12.7824 2.49877 12.2158 2.39489 11.5514C2.35978 11.3269 2.35981 10.8808 2.39497 10.656C2.47809 10.1242 2.69338 9.62913 3.02385 9.20981C3.07317 9.14721 3.51778 8.68921 4.01186 8.19201C4.85073 7.34785 4.91322 7.28113 4.95589 7.18401C5.06609 6.93325 5.01277 6.6423 4.82162 6.45115C4.66466 6.29419 4.45981 6.2244 4.25201 6.25709ZM13.548 10.5024C13.3666 10.56 13.2147 10.6922 13.1337 10.863C13.0874 10.9607 13.084 10.9802 13.084 11.1444C13.084 11.3106 13.0869 11.3268 13.1354 11.4252C13.2206 11.5981 13.3733 11.7304 13.5493 11.7838C13.6613 11.8178 14.8548 11.819 14.9659 11.7852C15.1861 11.7184 15.3611 11.5473 15.4232 11.3381C15.455 11.2312 15.4542 11.0513 15.4215 10.9388C15.3698 10.7611 15.1977 10.5858 15.0032 10.5131C14.919 10.4816 14.8842 10.4801 14.2634 10.4811C13.7842 10.4819 13.5951 10.4875 13.548 10.5024ZM11.4431 12.5983C11.2533 12.6712 11.1165 12.7929 11.0377 12.959L10.988 13.064L10.9834 13.7377C10.9789 14.3897 10.9798 14.4143 11.0124 14.5015C11.0858 14.6977 11.2604 14.8696 11.4388 14.9215C11.8061 15.0283 12.1748 14.8298 12.2852 14.4659C12.319 14.3548 12.3177 13.1613 12.2838 13.0494C12.2305 12.8735 12.0981 12.7206 11.9257 12.6357C11.8326 12.5899 11.8052 12.5842 11.6609 12.5806C11.5544 12.5779 11.4808 12.5839 11.4431 12.5983ZM13.5391 12.5983C13.3493 12.6712 13.2125 12.7929 13.1337 12.959C13.0874 13.0567 13.084 13.0762 13.084 13.2404C13.084 13.4083 13.0866 13.4221 13.1383 13.5284C13.1857 13.6258 13.2357 13.6828 13.5303 13.976C13.9023 14.3462 13.9559 14.3839 14.1582 14.4172C14.3748 14.453 14.5719 14.3886 14.7303 14.2303C14.8886 14.0719 14.953 13.8748 14.9172 13.6582C14.8838 13.4559 14.8462 13.4023 14.476 13.0303C14.1833 12.7362 14.1257 12.6857 14.0289 12.6386C13.9283 12.5896 13.9028 12.5842 13.7569 12.5806C13.6504 12.5779 13.5768 12.5839 13.5391 12.5983Z"
	/>
</svg>`;

//#endregion
//#region src/web/internal/connected-account-menu.styles.ts
const styles = [
	sharedStyles,
	iconButtonStyles,
	css`
		:host {
			display: block;
			width: fit-content;
		}

		.menu {
			display: none;
		}

		[aria-expanded='true'] + .menu {
			display: flex;
			flex-direction: column;
			max-width: fit-content;
			min-width: 396px;
			gap: 16px;
			padding: 16px;
			position: absolute;
			outline: none;
			background-color: var(--dapp-kit-popover);
			color: var(--dapp-kit-popover-foreground);
			border-radius: var(--dapp-kit-radius-lg);
			border: 1px solid var(--dapp-kit-border);
			box-shadow:
				0 4px 6px -1px rgba(0, 0, 0, 0.1),
				0 2px 4px -2px rgba(0, 0, 0, 0.1);
		}

		.header-container {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.header-title {
			font-size: 18px;
			font-weight: var(--dapp-kit-font-weight-semibold);
			letter-spacing: -0.18px;
		}

		img {
			width: 24px;
			height: 24px;
			border-radius: 96px;
		}

		[aria-expanded='true'] .chevron {
			transition: transform 0.3s ease;
			transform: rotate(180deg);
		}

		.chevron {
			display: flex;
		}

		.chevron svg {
			width: 12px;
			height: 12px;
		}

		.trigger-content {
			display: flex;
			align-items: center;
			font-weight: var(--dapp-kit-font-weight-semibold);
			gap: 12px;
		}

		.accounts-list {
			display: flex;
			flex-direction: column;
			gap: 12px;
			max-height: 240px;
			overflow-y: auto;
		}

		.disconnect-button {
			background-color: rgba(0, 0, 0, 0.8);
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			background-color: var(--dapp-kit-secondary);
			color: var(--dapp-kit-destructive);
			border-radius: var(--dapp-kit-radius-md);
			font-weight: var(--dapp-kit-font-weight-medium);
			height: 48px;
			padding: 16px;
			gap: 8px;
		}

		.disconnect-button:hover {
			background-color: color-mix(in oklab, var(--dapp-kit-secondary) 80%, transparent);
		}

		.container {
			padding-top: 12px;
			padding-bottom: 12px;
			padding-left: 16px;
			padding-right: 16px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 8px;
			width: 100%;
			border-radius: var(--dapp-kit-radius-sm);
		}

		.container[data-checked='true'] {
			background-color: var(--dapp-kit-accent);
		}

		.account-title {
			font-weight: var(--dapp-kit-font-weight-semibold);
		}

		.account-subtitle {
			color: var(--dapp-kit-muted-foreground);
			font-weight: var(--dapp-kit-font-weight-medium);
			font-size: 14px;
		}

		.account-info {
			display: flex;
			flex-direction: column;
			gap: 4px;
		}

		.content {
			display: flex;
			flex-grow: 1;
			gap: 12px;
		}

		.copy-address-button {
			display: inline-flex;
		}

		.copy-address-button svg {
			width: 16px;
			height: 16px;
		}

		.radio-indicator {
			width: 20px;
			height: 20px;
			border-radius: 100%;
			background-color: var(--dapp-kit-input);
			border: 1px solid var(--dapp-kit-border);
			display: inline-flex;
			justify-content: center;
			align-items: center;
		}

		.content:focus-visible .radio-indicator {
			border-color: var(--dapp-kit-ring);
			box-shadow: 0 0 0 3px var(--dapp-kit-ring) / 0.5;
			outline: none;
		}

		[data-checked='true'] .radio-indicator {
			color: var(--dapp-kit-positive);
			border-color: var(--dapp-kit-positive);
		}

		.radio-input {
			appearance: none;
			-webkit-appearance: none;
			width: 20px;
			height: 20px;
			margin: 0;
			border-radius: 50%;
			background-color: var(--dapp-kit-input);
			border: 1px solid var(--dapp-kit-input);
			cursor: pointer;
			position: relative;
			outline: none;
			transition: box-shadow 0.2s;
		}

		.radio-input::before {
			content: '';
			position: absolute;
			top: 50%;
			left: 50%;
			width: 8px;
			height: 8px;
			background-color: var(--dapp-kit-positive);
			border-radius: 100%;
			transform: translate(-50%, -50%) scale(0);
			transition: transform 0.2s ease;
		}

		.radio-input:checked {
			background-color: transparent;
			border-color: var(--dapp-kit-positive);
		}

		.radio-input:checked::before {
			transform: translate(-50%, -50%) scale(1);
		}

		.radio-input:focus-visible {
			border-color: var(--dapp-kit-ring);
			box-shadow: 0 0 0 3px var(--dapp-kit-ring);
		}
	`
];

//#endregion
//#region src/web/internal/icons/copy-icon.ts
const copyIcon = html`<svg
	width="16"
	height="16"
	viewBox="0 0 16 16"
	fill="currentColor"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		fill-rule="evenodd"
		clip-rule="evenodd"
		d="M2.57602 1.05841C1.96473 1.12213 1.42869 1.52667 1.18005 2.11198C1.1061 2.28603 1.0777 2.39982 1.05682 2.60568C1.03369 2.83379 1.03361 9.476 1.05673 9.71992C1.12471 10.4367 1.60071 11.0082 2.31202 11.227L2.45602 11.2713L3.58402 11.2796L4.71202 11.288L4.72098 12.416C4.7307 13.6405 4.7262 13.5765 4.82061 13.8331C4.95698 14.2037 5.26674 14.5566 5.62014 14.7439C5.85567 14.8688 6.02999 14.9204 6.29721 14.9443C6.5825 14.9699 13.4137 14.9564 13.544 14.9301C14.2457 14.7881 14.7885 14.2454 14.9301 13.544C14.9564 13.4135 14.9699 6.582 14.9444 6.29717C14.9204 6.02992 14.8688 5.8556 14.744 5.62009C14.5566 5.2667 14.2038 4.95694 13.8332 4.82057C13.5766 4.72616 13.6405 4.73065 12.416 4.72094L11.288 4.71198L11.2797 3.58398L11.2713 2.45598L11.227 2.31198C11.1329 2.00597 10.9791 1.74963 10.7655 1.54273C10.4634 1.25013 10.1311 1.09568 9.71996 1.05669C9.50114 1.03595 2.77607 1.03757 2.57602 1.05841ZM2.64002 2.40489C2.56149 2.42965 2.42756 2.56833 2.40348 2.64984C2.38845 2.70067 2.3841 3.50549 2.38437 6.17784C2.38473 9.62633 2.38485 9.64027 2.41732 9.71198C2.45749 9.80075 2.51625 9.86424 2.60002 9.90945C2.66343 9.94366 2.67351 9.94403 3.69159 9.94843L4.71916 9.95288L4.72359 8.03643L4.72802 6.11998L4.77265 5.97758C4.96105 5.37641 5.37855 4.9584 5.97602 4.77273L6.12002 4.72798L8.03647 4.72355L9.95292 4.71912L9.94847 3.69155C9.94407 2.67347 9.9437 2.66339 9.9095 2.59998C9.86428 2.51621 9.80079 2.45745 9.71202 2.41728C9.64026 2.3848 9.62818 2.38469 6.16802 2.38597C3.68466 2.38688 2.68007 2.39227 2.64002 2.40489ZM6.33593 6.06286C6.22594 6.09651 6.14185 6.16683 6.08585 6.27198C6.05701 6.32613 6.05602 6.44379 6.05602 9.83198V13.336L6.09108 13.4015C6.1358 13.4851 6.21761 13.5568 6.30634 13.5904C6.37039 13.6146 6.65799 13.6164 9.86402 13.6124C13.1284 13.6083 13.3553 13.6062 13.4023 13.5804C13.4667 13.5452 13.5453 13.4666 13.5805 13.4023C13.6063 13.3552 13.6083 13.1283 13.6124 9.86398C13.6164 6.65795 13.6146 6.37035 13.5904 6.3063C13.5569 6.21757 13.4851 6.13576 13.4015 6.09104L13.336 6.05598L9.85602 6.05328C7.94202 6.05181 6.35798 6.05611 6.33593 6.06286Z"
	/>
</svg> `;

//#endregion
//#region src/utils/name.ts
const cache = /* @__PURE__ */ new Map();
async function resolveNameServiceName(client, address) {
	if (cache.has(address)) return cache.get(address);
	try {
		const name = (await client.core.defaultNameServiceName?.({ address }))?.data.name;
		cache.set(address, name ? normalizeSuiNSName(name, "at") : null);
		return name;
	} catch {
		cache.set(address, null);
		return null;
	}
}

//#endregion
//#region src/web/internal/icons/circle-check-icon.ts
const circleCheckIcon = html`<svg
	xmlns="http://www.w3.org/2000/svg"
	width="24"
	height="24"
	viewBox="0 0 24 24"
	fill="none"
	stroke="var(--dapp-kit-positive)"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
>
	<circle cx="12" cy="12" r="10" />
	<path d="m9 12 2 2 4-4" />
</svg> `;

//#endregion
//#region src/web/internal/connected-account-menu-item.ts
var AccountMenuItem = class extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.selected = false;
		this._wasCopySuccessful = false;
	}
	createRenderRoot() {
		return this;
	}
	#resolveNameTask = new Task(this, {
		args: () => [this.client, this.account.address],
		task: async ([client, address]) => resolveNameServiceName(client, address)
	});
	connectedCallback() {
		super.connectedCallback();
		this.addEventListener("click", this.#accountSelected);
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this.removeEventListener("click", this.#accountSelected);
	}
	render() {
		return html`
			<div class="container" data-checked=${this.selected}>
				<input
					type="radio"
					name="wallet-address"
					tabindex="${this.selected ? "0" : "-1"}"
					value=${this.account.address}
					?checked=${this.selected}
					@change=${this.#accountSelected}
					class="radio-input"
					id=${this.account.address}
				/>
				<label class="content" for=${this.account.address}>
					${when(this.account.icon, (icon) => html`<img src=${icon} alt="" />`)}
					${this.#resolveNameTask.render({
			pending: this.#renderAccountInfo,
			complete: this.#renderAccountInfo,
			error: () => this.#renderAccountInfo()
		})}
				</label>
				<button
					class="copy-address-button"
					@click=${this.#copyAddressToClipboard}
					aria-label="Copy address"
				>
					${this._wasCopySuccessful ? circleCheckIcon : copyIcon}
				</button>
			</div>
		`;
	}
	async #copyAddressToClipboard(event) {
		event.stopPropagation();
		try {
			await navigator.clipboard.writeText(this.account.address);
			this._wasCopySuccessful = true;
			setTimeout(() => {
				this._wasCopySuccessful = false;
			}, 2e3);
		} catch {}
	}
	#renderAccountInfo = (name) => {
		const { address, label } = this.account;
		const formattedAddress = formatAddress(address);
		const title = name || label;
		return html`<div class="account-info">
			<div class="account-title">${title || formattedAddress}</div>
			${when(title, () => html`<div class="account-subtitle">${formattedAddress}</div>`)}
		</div>`;
	};
	#accountSelected() {
		this.dispatchEvent(new CustomEvent("account-selected", {
			detail: { account: this.account },
			bubbles: true,
			composed: true
		}));
	}
};
__decorate([property({ type: Object })], AccountMenuItem.prototype, "account", void 0);
__decorate([property({ type: Object })], AccountMenuItem.prototype, "client", void 0);
__decorate([property({ type: Boolean })], AccountMenuItem.prototype, "selected", void 0);
__decorate([state()], AccountMenuItem.prototype, "_wasCopySuccessful", void 0);

//#endregion
//#region src/web/internal/icons/chevron-down-icon.ts
const chevronDownIcon = html`<svg
	width="12"
	height="12"
	viewBox="0 0 12 12"
	fill="currentColor"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		fill-rule="evenodd"
		clip-rule="evenodd"
		d="M0.749783 3.16083C0.616367 3.20313 0.499715 3.30493 0.439031 3.432C0.404351 3.50463 0.401783 3.5191 0.401783 3.642C0.401783 3.8842 0.122795 3.58063 2.91474 6.3763C4.25842 7.72175 5.39718 8.85432 5.44534 8.8931C5.61112 9.02664 5.77771 9.084 5.99978 9.084C6.22186 9.084 6.38845 9.02664 6.55423 8.8931C6.60239 8.85432 7.74115 7.72175 9.08483 6.3763C11.8768 3.58063 11.5978 3.8842 11.5978 3.642C11.5978 3.5191 11.5952 3.50463 11.5605 3.432C11.512 3.33045 11.4169 3.23542 11.3163 3.18797C11.2247 3.14475 11.0777 3.13074 10.9826 3.15618C10.8399 3.19439 10.9127 3.12454 8.39678 5.63854L5.99978 8.03374L3.60278 5.6387C1.98712 4.02436 1.18712 3.23308 1.14854 3.21119C1.11707 3.19332 1.06577 3.17095 1.03454 3.16149C0.965327 3.14049 0.815051 3.14014 0.749783 3.16083Z"
	/>
</svg>`;

//#endregion
//#region src/web/internal/icons/plus-icon.ts
const plusIcon = html`<svg
	width="16"
	height="16"
	viewBox="0 0 16 16"
	fill="currentColor"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		fill-rule="evenodd"
		clip-rule="evenodd"
		d="M7.89082 1.05657C7.62439 1.0948 7.38895 1.33323 7.34347 1.61086C7.33421 1.66737 7.32818 2.80358 7.32813 4.49999L7.32803 7.296H4.4625C1.27722 7.296 1.51488 7.28764 1.34404 7.40553C1.22967 7.48444 1.11213 7.63921 1.07837 7.75534C1.04733 7.86214 1.04613 8.06073 1.07597 8.15199C1.1289 8.3138 1.2622 8.47769 1.39693 8.54657C1.55365 8.62668 1.43055 8.6236 4.47604 8.6238L7.32803 8.62399L7.32813 11.46C7.32818 13.2384 7.33408 14.3318 7.34392 14.392C7.38999 14.6737 7.62421 14.9044 7.90416 14.944C8.26109 14.9945 8.59807 14.7471 8.65615 14.392C8.66599 14.3318 8.67189 13.2384 8.67194 11.46L8.67203 8.62399L11.524 8.6238C14.5695 8.6236 14.4464 8.62668 14.6031 8.54657C14.7379 8.47769 14.8712 8.3138 14.9241 8.15199C14.9539 8.06073 14.9527 7.86214 14.9217 7.75534C14.8879 7.63921 14.7704 7.48444 14.656 7.40553C14.4852 7.28764 14.7229 7.296 11.5376 7.296H8.67203L8.67194 4.49999C8.67189 2.80358 8.66586 1.66737 8.65659 1.61086C8.6172 1.37032 8.44339 1.16228 8.21551 1.08292C8.12912 1.05284 7.99355 1.04184 7.89082 1.05657Z"
	/>
</svg>`;

//#endregion
//#region src/web/internal/connected-account-menu.ts
var ConnectedAccountMenu = class extends ScopedRegistryHost(LitElement) {
	constructor(..._args) {
		super(..._args);
		this._open = false;
	}
	static {
		this.elementDefinitions = {
			"internal-button": Button,
			"account-menu-item": AccountMenuItem
		};
	}
	static {
		this.styles = styles;
	}
	#unsubscribeFromAutoUpdate;
	#resolveNameTask = new Task(this, {
		args: () => [this.client, this.connection.account.address],
		task: async ([client, address]) => resolveNameServiceName(client, address)
	});
	connectedCallback() {
		super.connectedCallback();
		document.addEventListener("click", this.#onDocumentClick);
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this.#stopPositioning();
		document.removeEventListener("click", this.#onDocumentClick);
	}
	render() {
		return html`<internal-button
				id="menu-button"
				aria-haspopup="true"
				aria-controls="menu"
				aria-expanded="${this._open}"
				@click=${this.#toggleMenu}
			>
				<div class="trigger-content">
					<img src=${this.connection.account.icon ?? this.connection.wallet.icon} alt="" />
					${this.#resolveNameTask.render({
			pending: this.#getAccountTitle,
			complete: this.#getAccountTitle,
			error: () => this.#getAccountTitle
		})}
					<div class="chevron">${chevronDownIcon}</div>
				</div>
			</internal-button>
			<div class="menu" id="menu" tabindex="-1" aria-labelledby="menu-button">
				<div class="header-container">
					<h2 class="header-title">Connected accounts</h2>
					${when(this.connection.wallet.name.startsWith(SLUSH_WALLET_NAME), () => html`<button
								class="icon-button"
								aria-label="Add more accounts"
								@click=${this.#onManageConnectionClick}
							>
								${plusIcon}
							</button>`)}
				</div>
				<div class="accounts-container" role="radiogroup">
					<ul class="accounts-list">
						${this.connection.wallet.accounts.map((account) => html`
								<li>
									<account-menu-item
										.account=${account}
										.client=${this.client}
										.selected=${account.address === this.connection.account.address}
									></account-menu-item>
								</li>
							`)}
					</ul>
				</div>
				<button class="disconnect-button" @click=${this.#onDisconnectClick}>
					${unlinkIcon} Disconnect all
				</button>
			</div>`;
	}
	#onDisconnectClick() {
		this.dispatchEvent(new CustomEvent("disconnect-click", {
			bubbles: true,
			composed: true
		}));
	}
	#onManageConnectionClick() {
		this.dispatchEvent(new CustomEvent("manage-connection-click", {
			bubbles: true,
			composed: true
		}));
	}
	#getAccountTitle = (name) => {
		return name || this.connection.account.label || formatAddress(this.connection.account.address);
	};
	#onDocumentClick = (event) => {
		if (!this._open) return;
		if (!event.composedPath().includes(this)) this.#closeMenu();
	};
	#toggleMenu() {
		if (this._open) this.#closeMenu();
		else this.#openMenu();
	}
	async #openMenu() {
		this._open = true;
		await this.updateComplete;
		this._menu.focus();
		this.#startPositioning();
	}
	#closeMenu() {
		this._open = false;
		this.#stopPositioning();
	}
	#startPositioning() {
		this.#unsubscribeFromAutoUpdate = autoUpdate(this._trigger, this._menu, async () => {
			const result = await computePosition(this._trigger, this._menu, {
				placement: "bottom-end",
				middleware: [
					offset(12),
					flip(),
					shift({ padding: 16 }),
					autoPlacement()
				]
			});
			Object.assign(this._menu.style, {
				left: `${result.x}px`,
				top: `${result.y}px`
			});
		});
	}
	#stopPositioning() {
		if (this.#unsubscribeFromAutoUpdate) {
			this.#unsubscribeFromAutoUpdate();
			this.#unsubscribeFromAutoUpdate = void 0;
		}
	}
};
__decorate([property({ type: Object })], ConnectedAccountMenu.prototype, "connection", void 0);
__decorate([property({ type: Object })], ConnectedAccountMenu.prototype, "client", void 0);
__decorate([query("#menu-button")], ConnectedAccountMenu.prototype, "_trigger", void 0);
__decorate([query("#menu")], ConnectedAccountMenu.prototype, "_menu", void 0);
__decorate([state()], ConnectedAccountMenu.prototype, "_open", void 0);

//#endregion
//#region src/web/dapp-kit-connect-button.ts
let DAppKitConnectButton = class DAppKitConnectButton$1 extends ScopedRegistryHost(LitElement) {
	static {
		this.elementDefinitions = {
			"internal-button": Button,
			"mysten-dapp-kit-connect-modal": DAppKitConnectModal,
			"connected-account-menu": ConnectedAccountMenu
		};
	}
	static {
		this.shadowRootOptions = {
			...LitElement.shadowRootOptions,
			delegatesFocus: true
		};
	}
	static {
		this.styles = sharedStyles;
	}
	render() {
		const connection = this.instance.stores.$connection.get();
		const client = this.instance.stores.$currentClient.get();
		return connection.account ? html`<connected-account-menu
					.connection=${connection}
					.client=${client}
					@account-selected=${(event) => {
			this.instance.switchAccount({ account: event.detail.account });
		}}
					@disconnect-click=${() => {
			this.instance.disconnectWallet();
		}}
					@manage-connection-click=${() => {
			this.instance.connectWallet({ wallet: connection.wallet });
		}}
				></connected-account-menu>` : html`<internal-button @click=${this.#openModal}>
						<slot>Connect Wallet</slot>
					</internal-button>
					<mysten-dapp-kit-connect-modal
						.instance=${this.instance}
						.filterFn=${this.modalOptions?.filterFn}
						.sortFn=${this.modalOptions?.sortFn}
					></mysten-dapp-kit-connect-modal>`;
	}
	#openModal() {
		this._modal.show();
	}
};
__decorate([property({ type: Object })], DAppKitConnectButton.prototype, "modalOptions", void 0);
__decorate([storeProperty()], DAppKitConnectButton.prototype, "instance", void 0);
__decorate([query("mysten-dapp-kit-connect-modal")], DAppKitConnectButton.prototype, "_modal", void 0);
DAppKitConnectButton = __decorate([customElement("mysten-dapp-kit-connect-button")], DAppKitConnectButton);

//#endregion
export { DAppKitConnectButton, DAppKitConnectModal };
//# sourceMappingURL=index.mjs.map