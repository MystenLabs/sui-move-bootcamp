import { ReactiveControllerHost } from "lit";
import { Store } from "nanostores";
/**
 * A TypeScript decorator that creates a new `MultiStoreController` for the atoms
 * @decorator `withStores(atoms)`
 * @param atoms The atoms to subscribe to.
 *
 * @example
 * ```ts
 * import { LitElement, html } from 'lit';
 * import { customElement } from 'lit/decorators.js';
 * import { atom } from 'nanostores';
 * import { useStores } from '@nanostores/lit';
 *
 * const count = atom(0);
 *
 * @customElement('my-element')
 * @useStores(count)
 * class MyElement extends LitElement {
 *  render() {
 *   return html\`Count: \${count.get()}\`;
 *   }
 * }
 * ```
 */
export declare function useStores<TAtoms extends Array<Store<unknown>>>(...atoms: TAtoms): <TConstructor extends new (...args: any[]) => ReactiveControllerHost>(constructor: TConstructor) => {
    new (...args: any[]): {
        addController(controller: import("lit").ReactiveController): void;
        removeController(controller: import("lit").ReactiveController): void;
        requestUpdate(): void;
        readonly updateComplete: Promise<boolean>;
    };
} & TConstructor;
