"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStores = void 0;
const MultiStoreController_1 = require("./MultiStoreController");
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
function useStores(...atoms) {
    return (constructor) => {
        return class extends constructor {
            constructor(...args) {
                super(...args);
                new MultiStoreController_1.MultiStoreController(this, atoms);
            }
        };
    };
}
exports.useStores = useStores;
