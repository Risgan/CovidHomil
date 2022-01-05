import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  isLogin: boolean=false;
  isSplash: boolean=true;

  constructor(
    private fb: FormBuilder,
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router,
  ) {
    this.formLogin = this.fb.group({
      usuario: ['',Validators.required],
      password: ['',Validators.required],
    });
   }

  ngOnInit() {
    this.splash();
  }

  splash(){
    setTimeout(() => {
      this.isSplash=false;
    }, 3000);
  }

  loguear(){
    if(this.formLogin.value.usuario=="Hola"){
      this.isLogin=true;
      setTimeout(() => {
        this.isLogin=false;
        this.router.navigate(['paciente'])
      }, 3000);
    }else{
      this.alertaNoLogin();
      this.formLogin.reset();
    }
  }

  async alertaNoLogin(){
    const alert = await this.toastController.create({
      message:'usuario y/o contraseña errados',
      duration: 700,
      position: 'top',
      color: 'danger'
    });
    alert.present();
  }
  
}
