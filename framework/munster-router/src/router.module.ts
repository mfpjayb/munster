import { ModuleExtensions } from "munster-core";
import { Module } from "munster-core";
import { RouterDirective } from "./router.directive";
import { RouterFragmentComponent, RouterOutletComponent } from "./router-outlet.component";
import { formatRoutePaths } from "./tools/format-route-paths";

export interface IRoute {
    path: string;
    component?: any;
    children?: IRoute[];
    exact?: boolean;
    module?: () => Promise<any>;
    formattedPath?: string;
}

export const MODULE_ROUTE_DATA_KEY = 'ROUTER_ROUTES';

@Module({
    exports: {
        components: [
            RouterOutletComponent,
            RouterFragmentComponent
        ],
        directives: [RouterDirective]
    }
})
export class RouterModule extends ModuleExtensions {

    public routes: IRoute[] = [];

    public static routes(routes: IRoute[]) {}

    public init() {
        this.routes = formatRoutePaths(this.routes, '');
        this.getParentModule().setData(MODULE_ROUTE_DATA_KEY, this.routes);
    }

}

RouterModule.routes = function (routes: IRoute[]) {

    return class extends RouterModule {
        public routes: IRoute[] = routes;
    }

}
