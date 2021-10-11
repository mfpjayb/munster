import { IRoute } from "../router.module";

interface IRouteMatcherResult {
    active: boolean;
}

const inactive: IRouteMatcherResult = {
    active: false
};

export function routeMatcher(route: IRoute, parentUrl: string): IRouteMatcherResult {
    const windowUrl = window.location.pathname;
    const path = `${parentUrl}/${route.formattedPath}`;
    const routePathArr: string[] = path.split('/').filter(item => !!item);
    const windowUrlArr: string[] = windowUrl.split('/').filter(item => !!item);


    // route url should not exceed window url length or auto inactive
    if (routePathArr.length > windowUrlArr.length) {
        return inactive;
    }

    // check if exact
    if (route.exact || route.redirectTo) {
        // check if the length are not equal, if yes, then auto inactive
        if (routePathArr.length !== windowUrlArr.length) {
            return inactive;
        }
    }


    if (!matchPaths(routePathArr, windowUrlArr)) {
        return inactive;
    }

    return {
        active: true
    };
}

function matchPaths(routePathArr: string[], windowUrlArr: string[]): boolean {
    let match = true;

    routePathArr.forEach((path, index) => {
        if (path.indexOf(':') === 0) {
            return;
        }
        if (path !== windowUrlArr[index]) {
            match = false;
        }
    })

    return match;
}