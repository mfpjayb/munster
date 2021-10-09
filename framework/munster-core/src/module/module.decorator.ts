import { container } from "tsyringe";
import { defineWebComponent } from "../component/define-web-component";
import { Directive } from "../directive/directive";
import { initModule } from "./init-module";

interface IModuleExports {
    components?: any[];
    directives?: typeof Directive[];
}

interface IModuleConfig {
    components?: any[];
    modules?: any[];
    directives?: typeof Directive[];
    exports?: IModuleExports;
    bootstrap?: any;
}

export function Module(config: IModuleConfig) {
    return function(Target: any): any {

        const NewClass: typeof Target = class extends Target {
            private subModuleExports: IModuleExports[] = [];
            private data: object = {};


            public moduleComponents: object = {};
            public getParentModule: () => any = null;

            constructor() {
                super();

                this.initChildModules();
                this.declareComponents();
            }

            public getBootstrap(): any {
                return config.bootstrap;
            }

            public getDirectives(): typeof Directive[] {
                const directives = config.directives || [];
                const exportedDirectives = this.getExportedDirectives();
                return Array.from(new Set([...directives, ...exportedDirectives]));
            }

            private getExportedDirectives(): typeof Directive[] {
                let directives: typeof Directive[] = [];
                this.subModuleExports.forEach(item => {
                    directives.push(...(item.directives || []));
                });
                return directives;
            }

            public setData(key: string, value: any): void {
                this.data[key] = value;
            }

            public getData(key: string): any {
                return this.data[key];
            }

            public getExports(): IModuleExports {
                return config.exports || {};
            }

            private initChildModules(): void {
                if (config.modules) {
                    config.modules.forEach(Module => {
                        const module: any = initModule(Module, this);
                        this.subModuleExports.push(module.getExports());
                    });
                }
            }

            private getSubModuleExportedComponents(): any[] {
                let components: any[] = [];
                this.subModuleExports.forEach(item => {
                    components = [
                        ...components,
                        ...(item.components || [])
                    ];
                });
                return components;
            }

            private declareSubModuleComponents(): void {
                const subModuleComponents = this.getSubModuleExportedComponents();
                subModuleComponents.forEach(Component => this.declareComponent(Component));
            }

            private declareComponents(): void {
                this.declareSubModuleComponents();
                if (config.components) {
                    config.components.forEach(Component => this.declareComponent(Component));
                }
            }

            private declareComponent(Component: any): void {
                defineWebComponent(Component, this);
            }

        };

        container.register(NewClass, { useClass: NewClass });

        return NewClass;
    }
}
