import { container } from "tsyringe";

interface IComponentConfig {
    selector: string;
}

export function Component(config: IComponentConfig) {
    return function(Target: any) {
        const NewClass: typeof Target = class extends Target {

            public static selector: string = config.selector;
            public getComponentWrapper: () => any = null;

        };

        container.register(NewClass, { useClass: NewClass });

        return NewClass;
    }
}