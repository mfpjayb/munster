import { container } from "tsyringe";

export function initModule(Module: any, parentModule: any): any {
    const module: any = container.resolve(Module);
    module.getParentModule = () => parentModule;
    // hook
    if (module.init) {
        module.init();
    }
    return module;
}