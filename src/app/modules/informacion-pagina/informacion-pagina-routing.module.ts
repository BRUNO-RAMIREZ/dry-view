import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InformacionPaginaRouterOutletComponent } from './pages/informacion-pagina-router-outlet/informacion-pagina-router-outlet.component';
import { ApartadoInformacionComponent } from './pages/apartado-informacion/apartado-informacion.component';

const routes: Routes = [
  {
    path: '',
    component: InformacionPaginaRouterOutletComponent,
    children: [
      {path: '', component:ApartadoInformacionComponent },
      {path: '**', redirectTo: 'usuarios/home'}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformacionPaginaRoutingModule { }


