import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstadisticasRouterOutletComponent } from './pages/estadisticas-router-outlet/estadisticas-router-outlet.component';
import {AuthGuard} from "../../guards/auth.guard";
import { HomeEstadisticasComponent } from './pages/home-estadisticas/home-estadisticas.component';

const routes: Routes = [
  {
    path: '',
    component: EstadisticasRouterOutletComponent,
    children: [
      {path: '', component: HomeEstadisticasComponent},
      /*{path: '', component: },
      {path: '', component: },
      {path: '', component: },
      {path: '**', redirectTo: 'login'}*/
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstadisticasRoutingModule { }
