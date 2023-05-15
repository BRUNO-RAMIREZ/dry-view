import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VentasRouterOutletComponent } from './pages/ventas-router-outlet/ventas-router-outlet.component';
import {RegistroComponent} from './pages/registro/registro.component';
const routes: Routes = [
  {
    path: 'ventas',
    component: VentasRouterOutletComponent,
    children: [
      {path: '/create', component: RegistroComponent },
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
export class VentasRoutingModule { }

