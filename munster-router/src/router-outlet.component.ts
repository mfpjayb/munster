import { ComponentExtensions, Component, initModule } from "@munster/core";
import { ROUTER_DIRECTIVE_DATA_KEY } from "./router.directive";
import { IRoute, MODULE_ROUTE_DATA_KEY } from "./router.module";
import { RouterService } from "./router.service";
import { routeMatcher } from "./tools/route-matcher";

declare const e: any;
declare const c: any;
declare const i: any;

interface IExtendedRoute extends IRoute {
    show: boolean;
    rawComponent: any;
}
@Component({
    selector: 'router-outlet-fragment'
})
export class RouterFragmentComponent extends ComponentExtensions {
    $render(): any {
        return e('fragment', {}, [
            c('router-outlet', this)
        ]);
    }
}

@Component({
    selector: 'router-outlet'
})
export class RouterOutletComponent {

    private routes: IExtendedRoute[] = [];

    constructor(private routerService: RouterService) { }

    $connected() {
        console.log(this);
        this.routerService.addEvaluateItem(this.evaluate.bind(this));
        this.evaluate();
    }

    $disconnected() {
        this.routerService.removeEvaluateItems(this.evaluate.bind(this));
    }

    $init() {
        this.routes = [];
        const moduleRouterData = (this as any).getComponentWrapper().getModule().getData(MODULE_ROUTE_DATA_KEY);
        if (moduleRouterData) {
            this.routes = [...moduleRouterData];
            (this as any).getComponentWrapper().getModule().setData(MODULE_ROUTE_DATA_KEY, null);
        } else {
            const parentComponentRouterData = (this as any).getComponentWrapper().getParentComponentWrapper().getData(ROUTER_DIRECTIVE_DATA_KEY);
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
            ((this as any).getComponentWrapper() as any).$apply();
        });
    }

    $render(): any {
        let elements = [];

        for(let ii = 0; ii < this.routes.length; ii++) {
            elements.push(
                i(
                    () => this.routes[ii].show,
                    () => c(
                        this.routes[ii].component.selector, {}, [], [['router', 'data', () => (this.routes[ii].children || [])]],
                        this.routes[ii].rawComponent
                    )
                )
            );
        }

        return e('fragment', {}, elements);
    }
}
