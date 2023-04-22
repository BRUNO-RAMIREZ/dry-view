import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RestorePasswordComponent} from "./pages/restore-password/restore-password.component";
import {AuthRouterOutletComponent} from "./pages/auth-router-outlet/auth-router-outlet.component";
import {LoginComponent} from "./pages/login/login.component";
import {FormChangePasswordComponent} from "./pages/form-change-password/form-change-password.component";


const routes: Routes = [
  {
    path: '',
    component: AuthRouterOutletComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'recuperar-contraseña', component: RestorePasswordComponent},
      {path: 'form-cambiar-contraseña', component: FormChangePasswordComponent},
      {path: '**', redirectTo: 'login'}
    ]
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
