import { resolve, Injectable } from "@munster/di";

export function initModule(Module: any, parentModule: any): any {
    Injectable()(Module);
    const module: any = resolve(Module);
    module.initChildModules();
    module.declareComponents();
    module.getParentModule = () => parentModule;
    // hook
    if (module.init) {
        module.init();
    }
    return module;
}
