import 'reflect-metadata';
import { renderApp, setupApp } from "@munster/core";
import { AppModule } from "./app/app.module";

setupApp();

renderApp(document.getElementById('app-root'), AppModule);

if ((module as any).hot) {
    (module as any).hot.accept(function () {
        location.reload();
    });
}
