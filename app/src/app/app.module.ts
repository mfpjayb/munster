import { CommonModule, Module } from "@munster/core";
import { AppComponent } from "./app.component";

@Module({
    components: [
        AppComponent
    ],
    modules: [
        CommonModule
    ],
    bootstrap: AppComponent
})
export class AppModule { }
