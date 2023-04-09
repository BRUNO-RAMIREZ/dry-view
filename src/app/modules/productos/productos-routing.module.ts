import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {ListadoComponent} from "./pages/listado/listado.component";
import {RegistrarComponent} from "./pages/registrar/registrar.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {path: 'listado', component: ListadoComponent},
      {path: 'registrar', component: RegistrarComponent},
      {path: 'editar/:id', component: RegistrarComponent},
      {path: '**', redirectTo: ''}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule {
}
