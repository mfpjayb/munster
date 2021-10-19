import { singleton, injectable, container, Lifecycle } from "tsyringe"

interface IServiceConfig {
    singleton?: boolean;
}

export function Service(config: IServiceConfig = {}) {
    return function(Target: any) {
        if (config.singleton || config.singleton === undefined) {
            container.register(Target, { useClass: Target }, { lifecycle: Lifecycle.Singleton })
            // singleton()(Target);
            return Target;
        } else {
            // injectable()(Target);
            container.register(Target, { useClass: Target }, { lifecycle: Lifecycle.Transient })
            return Target;
        }
    }
}
