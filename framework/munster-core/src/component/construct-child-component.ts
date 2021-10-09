import { errorHandler } from "../utils/error-handler";
import { IComponentHutchConfig } from "./component-hutch";

export function constructChildComponent(selector: string, parent: any, rawComponent: any) {
    const Component         = customElements.get(selector);
    const module            = parent.getComponentWrapper().getModule();
    const moduleComponent   = module.moduleComponents[selector];
    const componentConfig: IComponentHutchConfig = {
        component: rawComponent || moduleComponent,
        selector,
        parentComponentWrapper: parent.getComponentWrapper(),
        module: rawComponent?.module || module
    };

    if (!Component) {
        errorHandler(`The component with selector '${selector}' is not defined in this module.`);
    }

    return new Component(componentConfig);
}
