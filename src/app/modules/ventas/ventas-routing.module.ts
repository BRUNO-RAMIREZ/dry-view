import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VentasRouterOutletComponent } from './pages/ventas-router-outlet/ventas-router-outlet.component';
import { ListadoComponent } from './pages/listado/listado.component';

const routes: Routes = [
  {
    path: '',
    component: VentasRouterOutletComponent,
    children: [
      /*{path: '', component: },
      {path: '', component: },
      {path: '', component: },
      {path: '', component: },
      {path: '**', redirectTo: 'login'}*/
      {path: 'listado', component: ListadoComponent},
      {path: '**', redirectTo: 'home'}
    ]
  }

];
/*const routes: Routes = [
  {
    path: '',
    component: HomeRouterOutletComponent,
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'listado', component: ListadoComponent},
      {path: 'registrar', component: RegistrarComponent},
      {path: 'editar/:id', component: RegistrarComponent},
      {path: '**', redirectTo: 'home'}
    ]
  }
];*/


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasRoutingModule { }

