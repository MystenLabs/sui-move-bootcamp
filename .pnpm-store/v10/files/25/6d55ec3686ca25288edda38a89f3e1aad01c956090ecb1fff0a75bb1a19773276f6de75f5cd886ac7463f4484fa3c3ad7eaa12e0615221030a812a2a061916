"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreController = void 0;
/**
 * A `ReactiveController` that subscribes a `LitElement` to a `nanostores` atom and updates the host element when the atom changes.
 *
 * @example
 * ```ts
 * import { atom } from 'nanostores';
 * import { StoreController } from '@nanostores/lit';
 * import { LitElement, html } from 'lit';
 * import { customElement } from 'lit/decorators.js';
 *
 * const count = atom(0);
 *
 * @customElement('my-element')
 * class MyElement extends LitElement {
 * private controller = new StoreController(this, count);
 *  render() {
 *   const $count = this.controller.value;
 *   return html\`Count: \${$count}\`;
 *  }
 * }
 * ```
 */
class StoreController {
    constructor(host, atom) {
        this.host = host;
        this.atom = atom;
        host.addController(this);
    }
    // Subscribe to the atom when the host connects
    hostConnected() {
        this.unsubscribe = this.atom.subscribe(() => {
            this.host.requestUpdate();
        });
    }
    // Unsubscribe from the atom when the host disconnects
    hostDisconnected() {
        var _a;
        (_a = this.unsubscribe) === null || _a === void 0 ? void 0 : _a.call(this);
    }
    /**
     * The current value of the atom.
     * @readonly
     */
    get value() {
        return this.atom.get();
    }
}
exports.StoreController = StoreController;
