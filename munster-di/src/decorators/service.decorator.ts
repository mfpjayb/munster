import { Container } from "../container";

interface IServiceConfig {
    singleton: boolean;
}

export function Service(config?: IServiceConfig) {
    return function(Target: any) {
        const container = new Container();

        if (config?.singleton === undefined) {
            config.singleton = true;
        }

        container.register(Target, {
            singleton: config.singleton
        });
    };
}

