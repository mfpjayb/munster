import { IHyperScript } from "../../hyper-script/hyper-script";
import { hyperScriptToElement } from "../../hyper-script/hyper-script-to-element";
import { IWatcher } from "../component-hutch";

function getPreviousElement(index: number, comment: any, elements: any): Element {
    const newIndex = index - 1;
    if (newIndex < 0) {
        return comment;
    }
    return elements[newIndex];
}


export function constructFor(
    valueCaller: () => any[],
    elementCaller: (index: number) => IHyperScript,
    component: any
): Element {
    const fragment = document.createDocumentFragment();
    const comment = document.createComment(' FOR ');
    const initialValue = valueCaller();
    let elements: Element[] = [];

    let value = initialValue;

    fragment.appendChild(comment);

    const watcher: IWatcher = {
        isUpdated: () => {
            let newValue = valueCaller();
            let updated = value !== newValue;
            value = newValue;
            return updated;
        },
        update: () => {
            const maxLength = Math.max(elements.length, value.length);
            for (let i = 0; i <= maxLength - 1; i++) {
                if (elements[i] === undefined) {
                    // create element
                    elements[i] = hyperScriptToElement(elementCaller(i), component);
                    getPreviousElement(i, comment, elements).after(elements[i]);
                }
                if (value[i] === undefined) {
                    // remove element
                    elements[i].remove();
                    elements[i] = null;
                }
            }
            elements = elements.filter(item => !!item);
        },
        isConnected: () => comment.isConnected
    };

    component.getComponentWrapper().addConditionWatcher(watcher);

    for(let i = 0; i <= value.length - 1; i++) {
        elements[i] = hyperScriptToElement(elementCaller(i), component);
        fragment.appendChild(elements[i]);
    }

    return fragment as any;
}
