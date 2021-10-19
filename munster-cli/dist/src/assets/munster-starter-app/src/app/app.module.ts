import { Module } from "@munster/core";
import { AppComponent } from "./app.component";

@Module({
    components: [
        AppComponent
    ],
    bootstrap: AppComponent
})
export class AppModule { }
