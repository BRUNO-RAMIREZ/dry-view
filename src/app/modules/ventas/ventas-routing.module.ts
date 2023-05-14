import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VentasRouterOutletComponent } from './pages/ventas-router-outlet/ventas-router-outlet.component';
import { ListadoComponent } from './pages/listado/listado.component';

const routes: Routes = [
  {
    path: 'ventas',
    component: VentasRouterOutletComponent,
    children: [
      /*{path: '', component: },
      {path: '', component: },
      {path: '', component: },
      {path: '', component: },
      {path: '**', redirectTo: 'login'}*/
      {path: 'listado', component: ListadoComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasRoutingModule { }

