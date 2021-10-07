import { Injectable } from "../decorators/injectable.decorator"

interface IComponentConfig {
    selector: string;
}

export function Component(config: IComponentConfig) {
    return function(Target: any) {
        return Injectable()(class extends Target {

            public static selector: string = config.selector;
            public getComponentWrapper: () => any = null;

        });
    }
}