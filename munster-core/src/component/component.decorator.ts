import { injectable } from "tsyringe";

interface IComponentConfig {
    selector: string;
}

export function Component(config: IComponentConfig) {
    return function(Target: any) {

        Target.selector = config.selector;
        Target.prototype.getComponentWrapper = null;

        return injectable()(Target);
    }
}