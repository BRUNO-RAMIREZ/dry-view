import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeRouterOutletComponent} from "./pages/home-router-outlet/home-router-outlet.component";
import {HomeComponent} from "./pages/home/home.component";
import {RegistrarComponent} from "./pages/registrar/registrar.component";
import { ListadoComponent } from './pages/listado/listado.component';
import { InformacionCuentaComponent } from './pages/informacion-cuenta/informacion-cuenta.component';
//aumente el import info cuenta de la linea 7
const routes: Routes = [
  {
    path: '',
    component: HomeRouterOutletComponent,
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'listado', component: ListadoComponent},
      {path: 'registrar', component: RegistrarComponent},
      {path: 'editar/:id', component: RegistrarComponent},
      //aumente este path de info cuenta
      {path: 'informacion-cuenta', component: InformacionCuentaComponent},
      {path: '**', redirectTo: 'home'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
