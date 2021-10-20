import { register } from "../actions/register";

interface IInjectableConfig {
    singleton: boolean;
}

export function Injectable(config?: IInjectableConfig) {
    return function(Target: any) {
        register(Target, {
            singleton: (config?.singleton || false)
        });
    };
}
