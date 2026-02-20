/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import type { LitElement } from 'lit';
declare global {
    interface ShadowRootInit {
        customElements?: CustomElementRegistry;
    }
    interface ShadowRoot {
        importNode(node: Node, deep?: boolean): Node;
    }
}
type LitElementConstructor = new (...args: any[]) => LitElement;
export type ElementDefinitionsMap = {
    [key: string]: typeof HTMLElement;
};
export declare function ScopedRegistryHost<SuperClass extends LitElementConstructor>(superclass: SuperClass): SuperClass;
export {};
//# sourceMappingURL=scoped-registry-mixin.d.ts.map