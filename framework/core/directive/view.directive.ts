import { Directive } from "./directive";

export class ViewDirective extends Directive {

    public static namespace = 'view';

    private mapper: object = {
        model: this.model.bind(this),
        ref: this.ref.bind(this)
    }

    init() {
        this.getDirectives().forEach(item => {
            this.mapper[item[0]](item);
        });
    }

    private ref(directive: [string, (value: any) => any]): void {
        const element = this.getElement();
        const valueCaller = directive[1];
        valueCaller(element);
    }

    private model(directive: [string, (value: any) => any]): void {
        const element = this.getElement();
        const valueCaller = directive[1];
        element.addEventListener('input', event => {
            valueCaller((event.target as any).value);
        });
    }

}
