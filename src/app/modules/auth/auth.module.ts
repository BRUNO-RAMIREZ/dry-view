import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './pages/login/login.component';
import {AuthService} from "./services/auth.service";
import {ReactiveFormsModule} from "@angular/forms";
import { ErrorMessageDirective } from './directives/error-message.directive';


@NgModule({
  declarations: [
    LoginComponent,
    ErrorMessageDirective
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule {
}
