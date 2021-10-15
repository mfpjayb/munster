import { ComponentExtensions, Component, initModule } from "@munster/core";
import { navigate } from "./tools/navigate";
import { ROUTER_DIRECTIVE_DATA_KEY } from "./router.directive";
import { IRoute, MODULE_ROUTE_DATA_KEY } from "./router.module";
import { RouterService } from "./router.service";
import { routeMatcher } from "./tools/route-matcher";

declare const e: any;
declare const c: any;
declare const i: any;

const MODULE_PARENT_URL_DATA = 'routerUrl';

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
    private parentUrl: string = '';

    constructor(private routerService: RouterService) { }

    $connected() {
        this.routerService.addEvaluateItem(this.evaluate.bind(this));
        this.evaluate();
    }

    $disconnected() {
        this.routerService.removeEvaluateItems(this.evaluate.bind(this));
    }

    $init() {
        this.routes = [];
        const module = (this as any).getComponentWrapper().getModule();
        const moduleRouterData = module.getData(MODULE_ROUTE_DATA_KEY);
        if (moduleRouterData) {
            this.routes = [...moduleRouterData];
            this.parentUrl = module.getData(MODULE_PARENT_URL_DATA) || '';
            module.setData(MODULE_ROUTE_DATA_KEY, null);
        } else {
            const parentComponentRouterData = (this as any).getComponentWrapper().getParentComponentWrapper().getData(ROUTER_DIRECTIVE_DATA_KEY);
            this.routes = [...parentComponentRouterData?.children || []];
            this.parentUrl = parentComponentRouterData?.parentUrl || '';
        }
    }

    private evaluate(): void {
        const promises: Promise<any>[] = [];

        this.routes.forEach((route, index) => {
            promises.push(new Promise((resolve) => {
                const result = routeMatcher(route, this.parentUrl);
                // console.log(`${this.parentUrl}/${route.formattedPath}`, window.location.pathname, result.active);
                if (result.active && route.module) {
                    route.module().then(Module => {

                        const originalFunction = Module.prototype.initChildModules;
                        const self = this;
                        Module.prototype.initChildModules = function() {
                            const parentUrl = `${self.parentUrl}/${route.formattedPath}`;
                            this.setData(MODULE_PARENT_URL_DATA, parentUrl);
                            console.log(parentUrl);
                            originalFunction.apply(this, [...arguments]);
                        };

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
            let redirect = false;
            result.forEach(route => {
                if (!redirect) {
                    if (route.route.redirectTo && route.route.show) {
                        setTimeout(() => {
                            navigate(route.route.redirectTo);
                        });
                        redirect = true;
                    }
                    this.routes[route.index] = route.route;
                }
            });
            if (!redirect) {
                ((this as any).getComponentWrapper() as any).$apply();
            }
        });
    }

    $render(): any {
        let elements = [];

        for(let ii = 0; ii < this.routes.length; ii++) {
            if (!this.routes[ii].redirectTo) {
                const parentUrl = `${this.parentUrl}/${this.routes[ii].formattedPath}`;
                elements.push(
                    i(
                        () => this.routes[ii].show,
                        () => c(
                            this.routes[ii].component.selector,
                            {},
                            [],
                            [['router', 'data', () => ({
                                children: (this.routes[ii].children || []),
                                parentUrl
                            })]],
                            this.routes[ii].rawComponent
                        )
                    )
                );
            }
        }

        return e('fragment', {}, elements);
    }
}
