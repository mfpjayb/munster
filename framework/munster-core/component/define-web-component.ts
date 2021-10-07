import { componentHutch } from "./component-hutch";

export function storeComponentInModule(Component: any, module: any) {
    const { selector } = Component;
    module.moduleComponents[selector] = Component;
}

export function defineWebComponent(Component: any, module: any) {
    const { selector } = Component;
    const definedComponent = customElements.get(selector);
    if (!definedComponent) {
        const component = componentHutch(Component);
        customElements.define(selector, component);
    }
    storeComponentInModule(Component, module);
}
