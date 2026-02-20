import { ReactiveController, ReactiveControllerHost } from "lit";
import { Store } from "nanostores";
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
export declare class StoreController<AtomType> implements ReactiveController {
    private host;
    private atom;
    private unsubscribe;
    constructor(host: ReactiveControllerHost, atom: Store<AtomType>);
    hostConnected(): void;
    hostDisconnected(): void;
    /**
     * The current value of the atom.
     * @readonly
     */
    get value(): AtomType;
}
