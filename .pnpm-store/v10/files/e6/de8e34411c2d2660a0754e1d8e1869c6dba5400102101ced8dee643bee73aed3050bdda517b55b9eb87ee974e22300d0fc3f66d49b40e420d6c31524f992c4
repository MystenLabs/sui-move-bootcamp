import { ReactiveController, ReactiveControllerHost } from "lit";
import { Store } from "nanostores";
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
export declare class MultiStoreController<TAtoms extends [] | ReadonlyArray<Store<unknown>>> implements ReactiveController {
    private host;
    private atoms;
    private unsubscribes;
    constructor(host: ReactiveControllerHost, atoms: TAtoms);
    hostConnected(): void;
    hostDisconnected(): void;
    /**
     * The current values of the atoms.
     * @readonly
     */
    get values(): {
        [K in keyof TAtoms]: ReturnType<TAtoms[K]["get"]>;
    };
}
