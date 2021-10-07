import { Directive } from "./directive";

export class EventDirective extends Directive {
    public static namespace: string = 'on';

    public init() {
        const directives: [string, () => any][] = this.getDirectives();
        const element: Element = this.getElement();
        const component: any = this.getComponent();
        directives.forEach(item => {
            const name: string = item[0];
            const valueCaller: () => any = item[1];
            element.addEventListener(name, event => valueCaller().bind(component)(event));
        });
    }
}
