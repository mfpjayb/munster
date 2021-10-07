export function initModule(Module: any, parentModule: any): any {
    const module: any = new Module();
    module.getParentModule = () => parentModule;
    // hook
    if (module.init) {
        module.init();
    }
    return module;
}
