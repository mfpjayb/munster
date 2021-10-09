import { ComponentExtensions, Component } from "@munster/core";

@Component({
    selector: 'app-root'
})
export class AppComponent extends ComponentExtensions {
    $render(): any {
        return <h1>I am the app component.</h1>
    }
}
