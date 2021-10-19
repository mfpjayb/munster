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

    private $routes: IExtendedRoute[] = [];
    private $parentUrl: string = '';
    private $routesBackedUp: boolean = false;
    private $routesBackup: IExtendedRoute[] = null;
    private $routerService: RouterService;

    constructor() {
        this.$routerService = new RouterService();
        this.evaluate = this.evaluate.bind(this);
    }

    $connected() {
        this.$routerService.addEvaluateItem(this.evaluate);
        this.evaluate();
    }

    $disconnected() {
        this.$routerService.removeEvaluateItems(this.evaluate);
        if (this.$routesBackedUp) {
            const module = (this as any).getComponentWrapper().getModule();
            module.setData(MODULE_ROUTE_DATA_KEY, this.$routesBackup);
        }
    }

    $init() {
        this.$routes = [];
        const module = (this as any).getComponentWrapper().getModule();
        const moduleRouterData = module.getData(MODULE_ROUTE_DATA_KEY);
        if (moduleRouterData) {
            this.$routes = [...moduleRouterData].reverse();
            this.$parentUrl = module.getData(MODULE_PARENT_URL_DATA) || '';
            module.setData(MODULE_ROUTE_DATA_KEY, null);
            this.$routesBackup = [...moduleRouterData];
            this.$routesBackedUp = true;
        } else {
            const parentComponentRouterData = (this as any).getComponentWrapper().getParentComponentWrapper().getData(ROUTER_DIRECTIVE_DATA_KEY);
            this.$routes = [...parentComponentRouterData?.children || []].reverse();
            this.$parentUrl = parentComponentRouterData?.parentUrl || '';
        }
    }

    private evaluate(): void {
        const promises: Promise<any>[] = [];

        this.$routes.forEach((route, index) => {
            promises.push(new Promise(async (resolve) => {
                const result = await routeMatcher(route, this.$parentUrl);
                if (result.active && route.module) {
                    route.module().then(Module => {

                        const originalFunction = Module.prototype.initChildModules;
                        const self = this;
                        Module.prototype.initChildModules = function() {
                            const parentUrl = `${self.$parentUrl}/${route.path}`;
                            this.setData(MODULE_PARENT_URL_DATA, parentUrl);
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
            let redirectUrl = null;
            result.forEach(route => {
                if (!redirect) {
                    if (route.route.redirectTo && route.route.show) {
                        redirectUrl = route.route.redirectTo;
                        redirect = true;
                    }
                    this.$routes[route.index] = route.route;
                }
            });
            ((this as any).getComponentWrapper() as any).$apply();
            if (redirect) {
                navigate(redirectUrl);
            }
        });
    }

    $render(): any {
        let elements = [];

        for(let ii = 0; ii < this.$routes.length; ii++) {
            if (!this.$routes[ii].redirectTo) {
                const parentUrl = `${this.$parentUrl}/${this.$routes[ii].path}`;
                elements.push(
                    i(
                        () => this.$routes[ii].show,
                        () => c(
                            this.$routes[ii].component.selector,
                            {},
                            [],
                            [['router', 'data', () => ({
                                children: (this.$routes[ii].children || []),
                                parentUrl
                            })]],
                            this.$routes[ii].rawComponent
                        )
                    )
                );
            }
        }

        return e('fragment', {}, elements);
    }
}
