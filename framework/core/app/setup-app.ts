import { IComponentHutchConfig } from "../component/component-hutch";
import { childComponentHyperScript } from "../hyper-script/child-component-hyper-script";
import { forHyperScript } from "../hyper-script/for-hyper-script";
import { hyperScript } from "../hyper-script/hyper-script";
import { ifHyperScript } from "../hyper-script/if-hyper-script";
import { initModule } from "../module/init-module";

export function setupApp(target: string, rootModule: any): void {
    global.e = hyperScript;
    global.c = childComponentHyperScript;
    global.i = ifHyperScript;
    global.f = forHyperScript;

    const module = initModule(rootModule, null);
    const selector = module.getBootstrap().selector;
    const Root = customElements.get(selector);

    const config: IComponentHutchConfig = {
        component: module.getBootstrap(),
        selector,
        parentComponentWrapper: null,
        module
    };

    const root = new Root(config);

    document.getElementById(target).replaceWith(root);
}