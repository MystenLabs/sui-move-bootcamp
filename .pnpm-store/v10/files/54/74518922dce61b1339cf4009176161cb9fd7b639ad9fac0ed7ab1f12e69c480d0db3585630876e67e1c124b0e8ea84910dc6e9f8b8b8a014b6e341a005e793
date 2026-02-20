"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withStores = void 0;
const MultiStoreController_1 = require("./MultiStoreController");
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
const withStores = (LitElementClass, atoms) => {
    return class LitElementWithStores extends LitElementClass {
        constructor(...args) {
            super(...args);
            new MultiStoreController_1.MultiStoreController(this, atoms);
        }
    };
};
exports.withStores = withStores;
