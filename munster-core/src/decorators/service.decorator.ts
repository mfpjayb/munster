import { singleton, injectable } from "tsyringe"

interface IServiceConfig {
    singleton?: boolean;
}

export function Service(config: IServiceConfig = {}) {
    return function(Target: any) {
        if (config.singleton || config.singleton === undefined) {
            return singleton()(Target);
        } else {
            return injectable()(Target);
        }
    }
}
