import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VentasRouterOutletComponent } from './pages/ventas-router-outlet/ventas-router-outlet.component';
import {RegistroComponent} from './pages/registro/registro.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
const routes: Routes = [
  {
    path: '',
    component: VentasRouterOutletComponent,
    children: [

      {path: 'registro', component: RegistroComponent, canActivate: [AuthGuard]},
     /* {path: 'listado', component: ListadoComponent},
=======
      {path: '/create', component: RegistroComponent },
      /*{path: '', component: },
      {path: '', component: },
>>>>>>> 50823df28135ce69c302503cb305f36cdaabeb03
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

