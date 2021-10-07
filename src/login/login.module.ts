import { Module } from "../../framework/core/module/module.decorator";
import { RouterModule } from "../../framework/router/router.module";
import { LoginFormComponent } from "./login-form.component";
import { LoginComponent } from "./login.component";

@Module({
    components: [
        LoginComponent,
        LoginFormComponent
    ],
    modules: [
        RouterModule.routes([
            {
                path: 'login', component: LoginComponent,
                children: [
                    { path: 'form', component: LoginFormComponent },
                ]
            }
        ])
    ]
})
export class LoginModule { }