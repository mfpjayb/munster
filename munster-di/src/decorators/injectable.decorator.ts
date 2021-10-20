import { Container } from "../container";

interface IInjectableConfig {
    singleton: boolean;
}

export function Injectable(config?: IInjectableConfig) {
    return function(Target: any) {
        const container = new Container();
        container.register(Target, {
            singleton: (config?.singleton || false)
        });
    };
}
