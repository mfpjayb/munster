import { IRoute } from "../router.module";

interface IRouteMatcherResult {
    active: boolean;
}

const inactive: IRouteMatcherResult = {
    active: false
};

export async function routeMatcher(route: IRoute, parentUrl: string): Promise<IRouteMatcherResult> {
    const windowUrl = window.location.pathname;
    const path = `${parentUrl}/${route.path}`;
    // const path = `${parentUrl}/${route.formattedPath}`;
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

    const guardPassed = await processGuards(route);
    if (!guardPassed) {
        return {
            active: false
        }
    }

    return {
        active: true
    };
}

async function processGuards(route: IRoute): Promise<boolean> {
    return new Promise(mainResolve => {
        if (route.guards) {
            const promises = [];
            route.guards.forEach(Guard => {
                promises.push(new Promise(async resolve => {
                    const guard = new Guard();
                    const canActivate = await guard.canActivate();
                    resolve(canActivate);
                }));
            });

            Promise.all(promises).then(canActivates => {
                if (canActivates.indexOf(false) > -1) {
                    mainResolve(false);
                } else {
                    mainResolve(true);
                }
            });
        } else {
            mainResolve(true);
        }
    });
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