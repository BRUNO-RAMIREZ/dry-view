import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";

import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './pages/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ErrorMessageDirective} from './directives/error-message.directive';
import {RestorePasswordComponent} from './pages/restore-password/restore-password.component';
import {AuthRouterOutletComponent} from './pages/auth-router-outlet/auth-router-outlet.component';
import {FormChangePasswordComponent} from './pages/form-change-password/form-change-password.component';
import { FormRegisterComponent } from './pages/form-register/form-register.component';
import { SharedModule } from "../../shared/shared.module";

@NgModule({
    declarations: [
        LoginComponent,
        ErrorMessageDirective,
        RestorePasswordComponent,
        AuthRouterOutletComponent,
        FormChangePasswordComponent,
        FormRegisterComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule
    ]
})
export class AuthModule {
}
