import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.page.html',
  styleUrls: ['./paciente.page.scss'],
})
export class PacientePage implements OnInit {

  nombreUsuario: string;

  constructor(
    private menu: MenuController
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

}
