import { errorHandler } from "../utils/error-handler";
import { IHyperScript } from "../hyper-script/hyper-script";
import { hyperScriptToElement } from "../hyper-script/hyper-script-to-element";
import { applyChangeDetection } from "./apply-change-detection";
import { container } from "tsyringe";

export interface IComponentHutchConfig {
    component: any;
    selector: string;
    parentComponentWrapper: any;
    module: any;
}

export interface IWatcher {
    isUpdated(): boolean;
    update(): void;
    isConnected(): boolean;
}

function generateSuperClass(Component: any): CustomElementConstructor {
    return Component.superClass || HTMLElement;
}

export function componentHutch(Component: any): CustomElementConstructor {

    return class extends generateSuperClass(Component) {

        private component: any = null;
        private watchers: IWatcher[] = [];
        private conditionWatchers: IWatcher[] = [];
        private parentComponentWrapper: any;
        private data: object = {};
        private module: any;

        constructor(componentConfig: IComponentHutchConfig) {
            super();

            if (!componentConfig.component) {
                errorHandler(`The component with selector '${componentConfig.selector}' is not defined in this module.`);
            }

            this.component = container.resolve(componentConfig.component);
            this.parentComponentWrapper = componentConfig.parentComponentWrapper;
            this.module = componentConfig.module;

            this.component.getComponentWrapper = () => this;
        }

        connectedCallback(): void {
            this.callHook('$init');
            this.buildElement();
            // apply component change detection
            applyChangeDetection(this.component, this);
            this.callHook('$connected');
            this.callHook('$afterInit');
        }

        disconnectedCallback(): void {
            this.callHook('$disconnected');
        }

        public setData(key: string, value: any) {
            this.data[key] = value;
        }

        public getData(key: string): any {
            return this.data[key];
        }

        public $apply(): void {
            this.watchers = this.watchers.filter(watcher => {
                const isConnected = watcher.isConnected();
                if (watcher.isUpdated() && isConnected) {
                    watcher.update();
                }
                return isConnected;
            });
            this.conditionWatchers.forEach(watcher => {
                if (watcher.isUpdated()) {
                    watcher.update();
                }
            });
        }

        public addWatcher(watcher: IWatcher): void {
            this.watchers.push(watcher);
        }

        public addConditionWatcher(watcher: IWatcher): void {
            this.conditionWatchers.push(watcher);
        }

        private buildElement(): void {
            const hyperScript: IHyperScript = this.component.$render();
            const element: Element = hyperScriptToElement(hyperScript, this.component);
            this.appendChild(element);
        }

        private callHook(name: string): void {
            if (this.component[name]) {
                this.component[name].bind(this.component)();
            }
        }

        public getComponent(): any {
            return this.component;
        }

        public getModule(): any {
            return this.module;
        }

        public getParentComponentWrapper(): any {
            return this.parentComponentWrapper;
        }

    }
}
