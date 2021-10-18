import { createWatcher, Directive } from "@munster/core";
import { navigate } from "./tools/navigate";
import { errorHandler } from "./utils/error-handler";

export const ROUTER_DIRECTIVE_DATA_KEY = 'ROUTER_DIRECTIVE_DATA_KEY';

export class RouterDirective extends Directive {

    public static namespace = 'router';

    private mapper = {
        link: this.link.bind(this),
        data: this.data.bind(this),
        // active: this.active.bind(this),
    };

    init() {
        this.getDirectives().forEach(directive => {
            if (!this.mapper[directive[0]]) {
                errorHandler(`The directive ${RouterDirective.namespace}:${directive[0]} is not defined.`);
            }
            this.mapper[directive[0]](directive);
        });
    }

    // active(directive: [string, () => any]): void {
    // }

    data(directive: [string, () => any]): void {
        const element: any = this.getElement();
        element.setData(ROUTER_DIRECTIVE_DATA_KEY, directive[1]());
    }

    link(directive: [string, () => any]): void {
        const element = this.getElement();
        const valueCaller = directive[1];
        const initialValue = valueCaller();
        element.addEventListener('click', event => {
            event.preventDefault();
            navigate(valueCaller());
        });

        if (element.localName === 'a') {
            element.setAttribute('href', initialValue);

            createWatcher(element, initialValue, valueCaller, (value: any) => {
                element.setAttribute('href', value);
            }, this.getComponent().getComponentWrapper());
        }
    }

}