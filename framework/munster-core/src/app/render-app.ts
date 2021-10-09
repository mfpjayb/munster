import { IComponentHutchConfig } from "../component/component-hutch";
import { initModule } from "../module/init-module";

export function renderApp(target: HTMLElement | null, RootModule: any): void {
    const module = initModule(RootModule, null);
    const selector = module.getBootstrap().selector;
    const Root = customElements.get(selector);

    const config: IComponentHutchConfig = {
        component: module.getBootstrap(),
        selector,
        parentComponentWrapper: null,
        module
    };

    const root = new Root(config);

    target.replaceWith(root);
}
