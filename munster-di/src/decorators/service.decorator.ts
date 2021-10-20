import { register } from "../actions/register";

interface IServiceConfig {
    singleton?: boolean;
}

export function Service(config: IServiceConfig = {}) {
    return function(Target: any) {
        if (config?.singleton === undefined) {
            config.singleton = true;
        }

        register(Target, {
            singleton: config.singleton
        });
    };
}

