import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.page.html',
  styleUrls: ['./paciente.page.scss'],
})
export class PacientePage implements OnInit {

  nombreUsuario: string;

  constructor(
    private menu: MenuController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.nombreUsuario = "Erick Daleman"
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  temperaturaIr(){
    this.router.navigate([this.router.routerState.snapshot.url+'/temperatura'])
  }
  
  gpsIr(){
    this.router.navigate([this.router.routerState.snapshot.url+'/gps'])
  }

  spo2Ir(){
    this.router.navigate([this.router.routerState.snapshot.url+'/spo2'])
  }

  ritmoIr(){
    this.router.navigate([this.router.routerState.snapshot.url+'/ritmo'])
  }

}
