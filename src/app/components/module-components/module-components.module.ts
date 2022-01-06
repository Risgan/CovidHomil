import { LoginComponent } from './../login/login.component';
import { GpsComponent } from './../paciente/gps/gps.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RitmoComponent } from './../paciente/ritmo/ritmo.component';
import { Spo2Component } from './../paciente/spo2/spo2.component';
import { TemperaturaComponent } from './../paciente/temperatura/temperatura.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgCircleProgressModule } from 'ng-circle-progress';



@NgModule({
  declarations: [
    TemperaturaComponent,
    Spo2Component,
    RitmoComponent,
    GpsComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NgCircleProgressModule.forRoot()
  ],
  exports:[    
    TemperaturaComponent,
    Spo2Component,
    RitmoComponent,
    FormsModule,
    IonicModule,
    GpsComponent,
    LoginComponent
  ]
})
export class ModuleComponentsModule { }
