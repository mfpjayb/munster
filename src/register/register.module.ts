
import { Module } from "../../framework/core/module/module.decorator";
import { RouterModule } from "../../framework/router/router.module";
import { RegisterComponent } from "./register.component";

@Module({
    components: [
        RegisterComponent
    ],
    modules: [
        RouterModule.routes([
            { path: 'register', component: RegisterComponent },
        ])
    ]
})
export class RegisterModule {
    modName = 'reg';
}