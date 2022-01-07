import { Spo2Component } from './../../components/paciente/spo2/spo2.component';
import { RitmoComponent } from './../../components/paciente/ritmo/ritmo.component';
import { GpsComponent } from './../../components/paciente/gps/gps.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemperaturaComponent } from 'src/app/components/paciente/temperatura/temperatura.component';

import { PacientePage } from './paciente.page';

const routes: Routes = [
  {path: '',component: PacientePage},
  {path: 'temperatura',component: TemperaturaComponent, pathMatch: 'full' },
  {path: 'gps',component: GpsComponent, pathMatch: 'full' },
  {path: 'ritmo',component: RitmoComponent, pathMatch: 'full' },
  {path: 'spo2',component: Spo2Component, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacientePageRoutingModule {}
