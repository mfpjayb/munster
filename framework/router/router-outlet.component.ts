import { ComponentExtensions } from "../core/component/component-extensions";
import { Component } from "../core/component/component.decorator";
import { childComponentHyperScript } from "../core/hyper-script/child-component-hyper-script";
import { hyperScript, IHyperScript } from "../core/hyper-script/hyper-script";
import { ifHyperScript } from "../core/hyper-script/if-hyper-script";
import { initModule } from "../core/module/init-module";
import { ROUTER_DIRECTIVE_DATA_KEY } from "./router.directive";
import { IRoute, MODULE_ROUTE_DATA_KEY } from "./router.module";
import { RouterService } from "./router.service";
import { routeMatcher } from "./tools/route-matcher";

declare const e: typeof hyperScript;
declare const c: typeof childComponentHyperScript;
declare const i: typeof ifHyperScript;

interface IExtendedRoute extends IRoute {
    show: boolean;
    rawComponent: any;
}
@Component({
    selector: 'router-outlet-fragment'
})
export class RouterFragmentComponent extends ComponentExtensions {
    $render(): IHyperScript {
        return e('fragment', {}, [
            c('router-outlet', this)
        ]);
    }
}

@Component({
    selector: 'router-outlet'
})
export class RouterOutletComponent extends ComponentExtensions {

    private routes: IExtendedRoute[] = [];

    constructor(private routerService: RouterService) {
        super();
    }

    $connected() {
        this.routerService.addEvaluateItem(this.evaluate.bind(this));
        this.evaluate();
    }

    $disconnected() {
        this.routerService.removeEvaluateItems(this.evaluate.bind(this));
    }

    $init() {
        this.routes = [];
        const moduleRouterData = this.getComponentWrapper().getModule().getData(MODULE_ROUTE_DATA_KEY);
        if (moduleRouterData) {
            this.routes = [...moduleRouterData];
            this.getComponentWrapper().getModule().setData(MODULE_ROUTE_DATA_KEY, null);
        } else {
            const parentComponentRouterData = this.getComponentWrapper().getParentComponentWrapper().getData(ROUTER_DIRECTIVE_DATA_KEY);
            this.routes = [...parentComponentRouterData || []];
        }
    }

    private evaluate(): void {
        const promises: Promise<any>[] = [];

        this.routes.forEach((route, index) => {
            promises.push(new Promise((resolve) => {
                const result = routeMatcher(route);
                if (result.active && route.module) {
                    route.module().then(Module => {

                        const module = initModule(Module, null);
                        const component = class extends RouterFragmentComponent {
                            public static module = module;
                        };
                        route.component = component;
                        route.rawComponent = component;
                        route.show = result.active;

                        resolve({ route, index });
                    });
                } else {
                    route.show = result.active;
                    resolve({ route, index });
                }
            }));
        });

        Promise.all(promises).then(result => {
            result.forEach(route => {
                this.routes[route.index] = route.route;
            });
            (this.getComponentWrapper() as any).$apply();
        });
    }

    $render(): IHyperScript {
        let elements = [];

        for(let ii = 0; ii < this.routes.length; ii++) {
            elements.push(
                i(
                    () => this.routes[ii].show,
                    () => c(
                        this.routes[ii].component.selector, this, {}, [['router', 'data', () => (this.routes[ii].children || [])]],
                        this.routes[ii].rawComponent
                    )
                )
            );
        }

        return e('fragment', {}, elements);
    }
}
