import { IRoute } from "../router.module";

export function formatRoutePaths(routes: IRoute[], parentPath: string): IRoute[] {

    return routes.map((route, index) => {
        route.formattedPath = `${parentPath}/${route.path}`;
        if (route.children) {
            route.children = formatRoutePaths(route.children, route.formattedPath);
        }
        return {
            ...route
        };
    });

    // routes.forEach((route, index) => {
    //     routes[index].path = `${parentPath}/${route.path}`.replace(/\/\//g, '/');
    //     if (routes[index].children) {
    //         routes[index].children = formatRoutePaths(routes[index].children, routes[index].path);
    //     }
    // });

    // return routes;
}
