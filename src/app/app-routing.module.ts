import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioUsuarioComponent } from './modules/users/registrar/formulario-usuario/formulario-usuario.component';
import { ListaProductosComponent } from './modules/productos/listado/lista-productos/lista-productos.component';
import { RegistrarComponent } from './modules/productos/registrar/registrar.component';
import { HomeComponent } from './modules/home/home.component';

const routes: Routes = [
  {path: 'users/new', component:FormularioUsuarioComponent},
  {path: 'users/edit/:id', component:FormularioUsuarioComponent},
  {path: 'products/list', component:ListaProductosComponent},
  {path: 'product/new', component:RegistrarComponent},
  {path: 'product/edit/:id', component:RegistrarComponent},
  {path: 'home', component:HomeComponent},
  {path: '**', redirectTo:'/home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
