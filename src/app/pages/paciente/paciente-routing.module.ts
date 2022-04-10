import { CuentaUsuarioComponent } from './../cuenta-usuario/cuenta-usuario.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PacientePage } from './paciente.page';
import { RitmoComponent } from './ritmo/ritmo.component';
import { Spo2Component } from './spo2/spo2.component';
import { TemperaturaComponent } from './temperatura/temperatura.component';

const routes: Routes = [
  {path: '',component: PacientePage},
  {path: 'temperatura',component: TemperaturaComponent, pathMatch: 'full' },
  {path: 'ritmo',component: RitmoComponent, pathMatch: 'full' },
  {path: 'spo2',component: Spo2Component, pathMatch: 'full' },
  {path: 'cuentaUsuario', component: CuentaUsuarioComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacientePageRoutingModule {}
