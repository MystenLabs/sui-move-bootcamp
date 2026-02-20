"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiStoreController = void 0;
/**
 * A `ReactiveController` that subscribes a `LitElement` to several `nanostores` atoms and updates the host element when any of the atoms changes.
 *
 * @example
 * ```ts
 * import { atom } from 'nanostores';
 * import { StoreController } from '@nanostores/lit';
 * import { LitElement, html } from 'lit';
 * import { customElement } from 'lit/decorators.js';
 *
 * const count1 = atom(0);
 * const count2 = atom(0);
 *
 * @customElement('my-element')
 * class MyElement extends LitElement {
 * private controller = new MultiStoreController(this, [count1, count2]);
 *  render() {
 *   const [$count1, $count2] = controller.values;
 *   return html\`Count 1: \${count1}\, Count 2: \${count2}\`;
 *  }
 * }
 * ```
 */
class MultiStoreController {
    constructor(host, atoms) {
        this.host = host;
        this.atoms = atoms;
        host.addController(this);
    }
    // Subscribe to the atom when the host connects
    hostConnected() {
        this.unsubscribes = this.atoms.map((atom) => atom.subscribe(() => this.host.requestUpdate()));
    }
    // Unsubscribe from the atom when the host disconnects
    hostDisconnected() {
        var _a;
        (_a = this.unsubscribes) === null || _a === void 0 ? void 0 : _a.forEach((unsubscribe) => unsubscribe());
    }
    /**
     * The current values of the atoms.
     * @readonly
     */
    get values() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return this.atoms.map((atom) => atom.get());
    }
}
exports.MultiStoreController = MultiStoreController;
