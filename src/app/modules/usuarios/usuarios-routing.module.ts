import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeRouterOutletComponent} from "./pages/home-router-outlet/home-router-outlet.component";
import {HomeComponent} from "./pages/home/home.component";
import {RegistrarComponent} from "./pages/registrar/registrar.component";
import { ListadoComponent } from './pages/listado/listado.component';
import { InformacionCuentaComponent } from './pages/informacion-cuenta/informacion-cuenta.component';
import {AuthGuard} from "../../guards/auth.guard";
const routes: Routes = [
  {
    path: '',
    component: HomeRouterOutletComponent,
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'listado', component: ListadoComponent, canActivate: [AuthGuard]},
      {path: 'registrar', component: RegistrarComponent, canActivate: [AuthGuard]},
      {path: 'editar/:id', component: RegistrarComponent, canActivate: [AuthGuard]},
      //aumente este path de info cuenta
      {path: 'informacion-cuenta', component: InformacionCuentaComponent, canActivate: [AuthGuard]},
      {path: '**', redirectTo: 'home'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule {
}
