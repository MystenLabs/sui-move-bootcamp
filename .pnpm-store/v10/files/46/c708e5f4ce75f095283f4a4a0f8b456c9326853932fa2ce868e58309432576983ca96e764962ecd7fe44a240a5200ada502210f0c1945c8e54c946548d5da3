/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { adoptStyles } from '@lit/reactive-element/css-tag.js';
export function ScopedRegistryHost(superclass) {
    return class ScopedRegistryMixin extends superclass {
        createRenderRoot() {
            const constructor = this.constructor;
            const { registry, elementDefinitions, shadowRootOptions } = constructor;
            if (elementDefinitions && !registry) {
                constructor.registry = new CustomElementRegistry();
                Object.entries(elementDefinitions).forEach(([tagName, klass]) => constructor.registry.define(tagName, klass));
            }
            const renderRoot = (this.renderOptions.creationScope = this.attachShadow({
                ...shadowRootOptions,
                customElements: constructor.registry,
            }));
            adoptStyles(renderRoot, this.constructor.elementStyles);
            return renderRoot;
        }
    };
}
//# sourceMappingURL=scoped-registry-mixin.js.map