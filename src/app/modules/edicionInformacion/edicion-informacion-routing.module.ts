import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarInformacionRouterOutletComponent } from './pages/editar-informacion-router-outlet/editar-informacion-router-outlet.component';
import { EditarInformacionComponent } from './pages/editar-informacion/editar-informacion.component';

const routes: Routes = [
  {
    path: '',
    component: EditarInformacionRouterOutletComponent,
    children: [
      {path: '', component: EditarInformacionComponent},
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditarInformacionRoutingModule { }
