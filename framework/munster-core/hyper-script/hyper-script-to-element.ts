import { constructChildComponent } from "../component/construct-child-component";
import { applyDirectives } from "../component/tools/apply-directives";
import { constructFor } from "../component/tools/construct-for";
import { constructIf } from "../component/tools/construct-if";
import { createWatcher } from "../component/tools/create-watcher";
import { setAttribute } from "../component/tools/set-attribute";
import { EHyperScriptTypes, ITypedHyperScript } from "./child-component-hyper-script";
import { IHyperScript, THyperScriptChild } from "./hyper-script";

export function hyperScriptToElement(hyperScript: THyperScriptChild, component: any): Element {

    if (typeof hyperScript === 'string' || typeof hyperScript === 'function') {
        return buildTextChild(hyperScript, component);
    }

    const typedHyperScript: ITypedHyperScript = hyperScript as any;
    const { type, name, parentComponent, valueCaller, elementCaller, rawComponent } = typedHyperScript;
    let element: any;
    if (type) {
        if (type === EHyperScriptTypes.IF) {
            return constructIf(valueCaller, elementCaller, component);
        }

        if (type === EHyperScriptTypes.FOR) {
            return constructFor(valueCaller, elementCaller, component);
        }

        if (type === EHyperScriptTypes.COMPONENT) {
            element = constructChildComponent(name, parentComponent, rawComponent);
        }
    }

    return buildElement(hyperScript as any, component, element);
}

function buildElement(hyperScript: IHyperScript, component: any, el: any): Element {
    const { name, attributes, children, directives } = hyperScript;
    let element: any = el || null;

    if (!element) {
        if (name === 'fragment') {
            element = document.createDocumentFragment();
        } else {
            element = document.createElement(name);
        }
    }

    applyAttributes(element, attributes || {}, component);
    applyChildElements(element, children || [], component);
    applyDirectives(element, directives || [], component);

    return element;
}

function applyAttributes(element: Element, attributes: object, component: any): void {
    Object.keys(attributes).forEach(key => {
        let value = attributes[key];
        if (typeof value === 'function') {
            const valueCaller = value;
            value = value();
            createWatcher(element, value, valueCaller, (newValue: any) => {
                setAttribute(element, key, newValue);
            }, component.getComponentWrapper());
        }
        setAttribute(element, key, value);
    });
}

function applyChildElements(element: Element, children: THyperScriptChild[], component: any): void {
    children.forEach(child => element.appendChild(hyperScriptToElement(child, component)));
}

function buildTextChild(text: string | (() => any), component: any): Element {
    const element: any = document.createTextNode('');
    let value: any = text;
    if (typeof value === 'function') {
        const valueCaller = value;
        value = value();
        createWatcher(element, value, valueCaller, (newValue: any) => {
            element.nodeValue = newValue;
        }, component.getComponentWrapper());
    }
    element.nodeValue = value;
    return element;
}
