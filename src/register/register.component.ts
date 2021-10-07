import { Component } from "../../framework/core/component/component.decorator";
import { hyperScript, IHyperScript } from "../../framework/core/hyper-script/hyper-script";

declare const e: typeof hyperScript;

@Component({
    selector: 'app-register'
})
export class RegisterComponent {
    $render(): IHyperScript {
        return e('div', {}, [
            e('h1', {}, ['I am the register component'])
        ]);
    }
}

