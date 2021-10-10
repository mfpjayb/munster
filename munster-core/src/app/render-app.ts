import { IComponentHutchConfig } from "../component/component-hutch";
import { initModule } from "../module/init-module";

export function renderApp(target: HTMLElement | null, RootModule: any): void {
    const module = initModule(RootModule, null);
    const bootstraped = module.getBootstrap();
    const Root = customElements.get(bootstraped.selector);

    const config: IComponentHutchConfig = {
        component: bootstraped,
        selector: bootstraped.selector,
        parentComponentWrapper: null,
        module
    };

    if (target) {
        target.replaceWith(new Root(config));
    }
}
