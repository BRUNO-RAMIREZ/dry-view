import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioUsuarioComponent } from './modules/users/registrar/formulario-usuario/formulario-usuario.component';

const routes: Routes = [
  {path: 'users/new', component:FormularioUsuarioComponent},
  {path: 'users/edit/:id', component:FormularioUsuarioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
