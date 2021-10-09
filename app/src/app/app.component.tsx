import { ComponentExtensions, Component } from "munster-core";

declare const e: any;

@Component({
    selector: 'app-root'
})
export class AppComponent extends ComponentExtensions {

    private count: any = {
        count: 100
    };

    buttonClicked(): void {
        this.count.count++;
    }

    $render(): any {
        return <div>
            <h1 hello="world" id={this.count.count}>I am the app component. {this.count.count}</h1>
            <button on:click={this.buttonClicked}>Click Me</button>
            <app-app2></app-app2>
        </div>
    }

}
