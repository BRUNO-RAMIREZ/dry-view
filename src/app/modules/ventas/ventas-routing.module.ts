import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VentasRouterOutletComponent } from './pages/ventas-router-outlet/ventas-router-outlet.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ListadoComponent } from './pages/listado/listado.component';

const routes: Routes = [
  {
    path: '',
    component: VentasRouterOutletComponent,
    children: [
      {path: 'registro', component: RegistroComponent, canActivate: [AuthGuard]},
     /* {path: 'listado', component: ListadoComponent},
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

