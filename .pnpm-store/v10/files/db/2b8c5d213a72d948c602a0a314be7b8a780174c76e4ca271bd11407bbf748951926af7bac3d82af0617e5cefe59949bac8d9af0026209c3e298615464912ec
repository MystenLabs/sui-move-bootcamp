import { LitElement } from "lit";
import { Store } from "nanostores";
/**
 * A mixin that subscribes a LitElement to a list of atoms.
 * @mixin `withStores`
 * @param LitElementClass The LitElement class to extend.
 * @param atoms The atoms to subscribe to.
 *
 * @example
 * ```ts
 * import { LitElement, html } from 'lit';
 * import { customElement } from 'lit/decorators.js';
 * import { atom } from 'nanostores';
 * import { withStores } from '@nanostores/lit';
 *
 * const count = atom(0);
 *
 * @customElement('my-element')
 * class MyElement extends withStores(LitElement, [count]) {
 *  render() {
 *   return html\`Count: \${count.get()}\`;
 *  }
 * }
 * ```
 */
export declare const withStores: <TLitElementClass extends new (...args: any[]) => LitElement, TAtoms extends Store<unknown>[]>(LitElementClass: TLitElementClass, atoms: TAtoms) => (new (...args: any[]) => LitElement) & TLitElementClass;
