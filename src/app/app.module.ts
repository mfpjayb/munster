import { EventDirective } from "../../framework/core/directive/event.directive";
import { PreventEventDirective } from "../../framework/core/directive/prevent-event.directive";
import { ViewDirective } from "../../framework/core/directive/view.directive";
import { Module } from "../../framework/core/module/module.decorator";
import { RouterModule } from "../../framework/router/router.module";
import { AppComponent } from "./app.component";

@Module({
    components: [
        AppComponent,
    ],
    directives: [
        EventDirective,
        PreventEventDirective,
        ViewDirective
    ],
    modules: [
        RouterModule.routes([
            { path: 'login', module: () => import('../login/login.module').then(m => m.LoginModule) },
            { path: 'register', module: () => import('../register/register.module').then(m => m.RegisterModule) },
        ])
    ],
    bootstrap: AppComponent
})
export class AppModule {
    modName = 'app';
}
