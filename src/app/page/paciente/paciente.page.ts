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
    console.log("hola")
    this.router.navigate(['temperatura'])
  }
  // loguear(){
  //   if(this.formLogin.value.usuario=="Hola"){
  //     this.isLogin=true;
  //     setTimeout(() => {
  //       this.isLogin=false;
  //       this.router.navigate(['paciente'])
  //     }, 3000);
  //   }else{
  //     this.alertaNoLogin();
  //     this.formLogin.reset();
  //   }
  // }

}
