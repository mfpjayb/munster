import { container, Lifecycle } from "tsyringe"

interface IServiceConfig {
    singleton?: boolean;
}

export function Service(config: IServiceConfig = {}) {
    return function(Target: any) {
        if (config.singleton || config.singleton === undefined) {
            container.register(Target, { useClass: Target }, { lifecycle: Lifecycle.Singleton });
            return Target;
        } else {
            container.register(Target, { useClass: Target });
            return Target;
        }
    }
}