import { injectable } from "tsyringe";
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

        Target.prototype.subModuleExports = [];
        Target.prototype.data = {};
        Target.prototype.moduleComponents = {};
        Target.prototype.getParentModule = null;
        Target.prototype.getBootstrap = function() {
            return config.bootstrap;
        }
        Target.prototype.getDirectives = function() {
            const directives = config.directives || [];
            const exportedDirectives = this.getExportedDirectives();
            return Array.from(new Set([...directives, ...exportedDirectives]));
        }

        Target.prototype.getExportedDirectives = function() {
            let directives: typeof Directive[] = [];
            this.subModuleExports.forEach(item => {
                directives.push(...(item.directives || []));
            });
            return directives;
        }

        Target.prototype.setData = function(key: string, value: any) {
            this.data[key] = value;
        }

        Target.prototype.getData = function(key: string) {
            return this.data[key];
        }

        Target.prototype.getExports = function() {
            return config.exports || {};
        }

        Target.prototype.initChildModules = function() {
            if (config.modules) {
                config.modules.forEach(Module => {
                    const module: any = initModule(Module, this);
                    this.subModuleExports.push(module.getExports());
                });
            }
        }

        Target.prototype.getSubModuleExportedComponents = function() {
            let components: any[] = [];
            this.subModuleExports.forEach(item => {
                components = [
                    ...components,
                    ...(item.components || [])
                ];
            });
            return components;
        }

        Target.prototype.declareSubModuleComponents = function() {
            const subModuleComponents = this.getSubModuleExportedComponents();
            subModuleComponents.forEach(Component => this.declareComponent(Component));
        }

        Target.prototype.declareComponents = function() {
            this.declareSubModuleComponents();
            if (config.components) {
                config.components.forEach(Component => this.declareComponent(Component));
            }
        }

        Target.prototype.declareComponent = function(Component: any) {
            defineWebComponent(Component, this);
        }

        return injectable()(Target);
    }
}
