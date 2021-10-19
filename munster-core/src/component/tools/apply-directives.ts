import { errorHandler } from "../../utils/error-handler";
import { Directive } from "../../directive/directive";
import { THyperScriptDirective } from "../../hyper-script/hyper-script";

export function applyDirectives(element: Element, directives: THyperScriptDirective[], component: any): void {
    const getComponentWrapper: any = component.getComponentWrapper();
    const moduleDirectives: typeof Directive[] = getComponentWrapper.getModule().getDirectives();
    const directiveClassObj = { };
    moduleDirectives.forEach(item => {
        directiveClassObj[item.namespace] = item;
    });

    const directivesObj: {
        [key: string]: [string, () => any][]
    } = {};

    directives.forEach(directive => {
        const namespace: string = directive[0];
        const name: string = directive[1];
        const valueCaller: (() => any) = directive[2];

        if (!directivesObj[namespace]) {
            directivesObj[namespace] = [];
        }

        directivesObj[namespace].push([name, valueCaller]);
    });

    Object.keys(directivesObj).forEach(key => {
        if (!directiveClassObj[key]) {
            errorHandler(`The directive namespace ${key} is not defined in this module.`);
        }
        const directive: any = new directiveClassObj[key]();
        directive.getDirectives = () => directivesObj[key];
        directive.getElement = () => element;
        directive.getComponent = () => component;
        directive.$init();
        getComponentWrapper.addDestroyArray(directive.$destroy.bind(directive));
    });
}
