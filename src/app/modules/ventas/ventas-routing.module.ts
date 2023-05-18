import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VentasRouterOutletComponent } from './pages/ventas-router-outlet/ventas-router-outlet.component';
import { ListadoComponent } from './pages/listado/listado.component';
import {RegistroComponent} from './pages/registro/registro.component';

const routes: Routes = [
  {
    path: '',
    component: VentasRouterOutletComponent,
    children: [

      {path: 'registrar', component: RegistroComponent},
     /* {path: 'listado', component: ListadoComponent},
=======
      {path: '/create', component: RegistroComponent },
      /*{path: '', component: },
      {path: '', component: },
>>>>>>> 50823df28135ce69c302503cb305f36cdaabeb03
      {path: '', component: },
      {path: '', component: },
      {path: '**', redirectTo: 'login'}*/
      {path: 'listado', component: ListadoComponent},
      {path: '**', redirectTo: 'home'}
    ]
  }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasRoutingModule { }

