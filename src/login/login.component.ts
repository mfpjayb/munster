import { Component } from "../../framework/core/component/component.decorator";
import { childComponentHyperScript } from "../../framework/core/hyper-script/child-component-hyper-script";
import { hyperScript, IHyperScript } from "../../framework/core/hyper-script/hyper-script";

declare const e: typeof hyperScript;
declare const c: typeof childComponentHyperScript;

@Component({
    selector: 'app-login'
})
export class LoginComponent {
    $render(): IHyperScript {
        return e('div', {}, [
            e('h1', {}, ['I am the login component']),
            c('router-outlet', this)
        ]);
    }
}
