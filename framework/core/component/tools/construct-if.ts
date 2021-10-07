import { IHyperScript } from "../../hyper-script/hyper-script";
import { hyperScriptToElement } from "../../hyper-script/hyper-script-to-element";
import { IWatcher } from "../component-hutch";

export function constructIf(valueCaller: () => any, elementCaller: () => IHyperScript, component: any): Element {
    const fragment = document.createDocumentFragment();
    const comment = document.createComment(' IF ');
    const initialValue = !!valueCaller();
    let element: Element;
    fragment.appendChild(comment);

    let value = initialValue;
    const watcher: IWatcher = {
        isUpdated: () => {
            let newValue = !!valueCaller();
            let updated = value !== newValue;
            value = newValue;
            return updated;
        },
        update() {
            if (value && !element) {
                element = hyperScriptToElement(elementCaller(), component);
                comment.after(element);
            }
            if (!value && element) {
                element.remove();
                element = null;
            }
        },
        isConnected: () => comment.isConnected
    };

    component.getComponentWrapper().addConditionWatcher(watcher);

    if (initialValue) {
        element = hyperScriptToElement(elementCaller(), component);
        fragment.appendChild(element);
    }

    return fragment as any;
}
