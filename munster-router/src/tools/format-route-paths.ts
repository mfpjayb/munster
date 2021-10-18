import { IRoute } from "../router.module";

export function formatRoutePaths(routes: IRoute[], parentPath: string): IRoute[] {

    return routes.map((route, index) => {
        route.formattedPath = `${parentPath}/${route.path}`;
        route.formattedPath = `${route.path}`;
        if (route.children) {
            route.children = formatRoutePaths(route.children, route.formattedPath);
        }
        return {
            ...route
        };
    });

}
