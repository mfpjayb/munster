import { createWatcher, Directive } from "@munster/core";
import { RouterService } from "./router.service";
import { navigate } from "./tools/navigate";
import { errorHandler } from "./utils/error-handler";

export const ROUTER_DIRECTIVE_DATA_KEY = 'ROUTER_DIRECTIVE_DATA_KEY';

export class RouterDirective extends Directive {

    public static namespace = 'router';

    private mapper = {
        link: this.link.bind(this),
        data: this.data.bind(this),
        active: this.active.bind(this),
    };

    private $routerService: RouterService;

    private checkRouterLinkActive: any;

    constructor() {
        super();
        this.$routerService = new RouterService();
    }

    $init() {
        this.getDirectives().forEach(directive => {
            if (!this.mapper[directive[0]]) {
                errorHandler(`The directive ${RouterDirective.namespace}:${directive[0]} is not defined.`);
            }
            this.mapper[directive[0]](directive);
        });
    }

    $destroy() {
        this.$routerService.removeEvaluateItems(this.checkRouterLinkActive);
    }

    active(directive: [string, () => any]): void {
        const element = this.getElement();
        const valueCaller = directive[1];

        if (element.localName === 'a') {
            this.checkRouterLinkActive = () => {
                const { pathname } = location;
                if (element.getAttribute('href') === pathname) {
                    element.classList.add(valueCaller());
                } else {
                    element.classList.remove(valueCaller());
                }
            }

            this.$routerService.addEvaluateItem(this.checkRouterLinkActive);

            this.checkRouterLinkActive();
        }
    }

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