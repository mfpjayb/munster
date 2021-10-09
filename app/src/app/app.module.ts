import { CommonModule, Module } from "munster-core";
import { AppComponent } from "./app.component";
import { App2Component } from "./app2.component";

@Module({
    components: [
        AppComponent,
        App2Component
    ],
    directives: [ ],
    modules: [
        CommonModule
    ],
    bootstrap: AppComponent
})
export class AppModule { }
