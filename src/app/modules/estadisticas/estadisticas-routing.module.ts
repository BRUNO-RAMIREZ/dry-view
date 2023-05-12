import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstadisticasRouterOutletComponent } from './pages/estadisticas-router-outlet/estadisticas-router-outlet.component';


const routes: Routes = [
  {
    path: 'estadisticas',
    component: EstadisticasRouterOutletComponent,
    children: [
      /*{path: '', component: },
      {path: '', component: },
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
