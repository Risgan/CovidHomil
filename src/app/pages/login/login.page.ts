import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Usuarios } from 'src/app/interface/usuarios';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  formLogin: FormGroup;
  isLogin: boolean=false;
  isSplash: boolean=true;

  usuarios: Usuarios[];
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController,
  ) { 
    this.formLogin = this.fb.group({
      email: [null,Validators.required],
      password: [null,Validators.required],
    });
  }

  ngOnInit() {
    this.splash();
  }

  splash(){
    setTimeout(() => {
      this.isSplash=false;
      // this.usuarios = this.firebaseService.listado
      console.log(this.usuarios)
    }, 3000);
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

  async onLogin(){
    try {
      this.isLogin=true;
      let user = await this.authService.login(this.formLogin.value.email,this.formLogin.value.password)
      if(user){
        const isVerified = this.authService.isEmailVerified(user);
        this.rediectUser(isVerified);
        this.isLogin=false; 

      }
      else{
        console.log("no esta registrado")
        this.isLogin=false;
      }
    } catch (error) {
      console.log(error)
      this.isLogin=false;
    }    
  } 

  async onLoginGoogle(){
    try {
      this.isLogin=true;
      let user = await this.authService.loginGoogle()
      if(user){
        const isVerified = this.authService.isEmailVerified(user);
        this.rediectUser(isVerified);
        this.isLogin=false; 
        this.router.navigate(['paciente'])
      }
    } catch (error) {
      console.log(error)
    }    
  } 

  rediectUser(isVerified: boolean){
    if(isVerified){
      this.router.navigate(['paciente']);
    }
    else{
      this.router.navigate(['verify-email'])
    }
  }

  navRegister(){
    console.log("reg")
    this.router.navigate(['register']);
  }

  navForGotPassword(){
    console.log("forgot")
    this.router.navigate(['forgot-password']);
  }

  async ok(){
    this.authService.ok();
    let user = await this.authService.login(this.formLogin.value.email,this.formLogin.value.password)
    console.log(user)
  }

}
