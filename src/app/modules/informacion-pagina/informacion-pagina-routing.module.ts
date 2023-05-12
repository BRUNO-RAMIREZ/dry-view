import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InformacionPaginaRouterOutletComponent } from './pages/informacion-pagina-router-outlet/informacion-pagina-router-outlet.component';

const routes: Routes = [
  {
    path: 'informacion',
    component: InformacionPaginaRouterOutletComponent,
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
export class InformacionPaginaRoutingModule { }


