import { CuentaUsuarioComponent } from './../cuenta-usuario/cuenta-usuario.component';
import { TemperaturaComponent } from './temperatura/temperatura.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PacientePageRoutingModule } from './paciente-routing.module';

import { PacientePage } from './paciente.page';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PacientePageRoutingModule,
    NgCircleProgressModule.forRoot()
  ],
  declarations: [
    PacientePage,
    CuentaUsuarioComponent  
  ]
})
export class PacientePageModule {}
