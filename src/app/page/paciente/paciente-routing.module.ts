import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemperaturaComponent } from 'src/app/components/paciente/temperatura/temperatura.component';

import { PacientePage } from './paciente.page';

const routes: Routes = [
  {path: '',component: PacientePage },
  // {path: 'temperatura',loadChildren: () => import('./../../components/paciente/temperatura/temperatura.component').then( m => m.TemperaturaComponent) },
  {path: 'temperatura',component: TemperaturaComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacientePageRoutingModule {}
