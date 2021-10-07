import { ComponentExtensions } from "../../framework/core/component/component-extensions";
import { Component } from "../../framework/core/component/component.decorator";
import { childComponentHyperScript } from "../../framework/core/hyper-script/child-component-hyper-script";
import { forHyperScript } from "../../framework/core/hyper-script/for-hyper-script";
import { hyperScript, IHyperScript } from "../../framework/core/hyper-script/hyper-script";
import { ifHyperScript } from "../../framework/core/hyper-script/if-hyper-script";

declare const e: typeof hyperScript;
declare const c: typeof childComponentHyperScript;
declare const i: typeof ifHyperScript;
declare const f: typeof forHyperScript;

@Component({
    selector: 'app-root'
})
export class AppComponent extends ComponentExtensions {

    private toggle: boolean = true;
    private count: any = {
        count: 100
    };

    buttonClicked(): void {
        this.count.count++;
        this.toggle = !this.toggle;
    }

    $render(): IHyperScript {
        return e('div', {}, [
            e('h1', { id: () => this.count.count }, ['I am the app component', () => this.count.count]),
            e('ul', {}, [
                e('li', {}, [
                    e('a', {}, ['login'], [['router', 'link', () => '/login']]),
                ]),
                e('li', {}, [
                    e('a', {}, ['login form'], [['router', 'link', () => '/login/form']]),
                ]),
                e('li', {}, [
                    e('a', {}, ['register'], [['router', 'link', () => '/register']]),
                ]),
            ]),
            e('input', { value: () => this.count.count }, [], [['view', 'model', v => this.count.count = v]]),
            e('button', {
                style: 'color: red;'
            }, ['Clickable'], [['on', 'click', () => this.buttonClicked]]),
            c('router-outlet', this)
        ]);
    }

}
