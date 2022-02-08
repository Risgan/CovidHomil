import { Usuario } from './../../interface/usuario';
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
  usuarioLogin: Usuario;
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
    // this.splash();
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
      // let user = await this.authService.login(this.formLogin.value.email,this.formLogin.value.password)
      this.usuarioLogin = await this.authService.login(this.formLogin.value.email,this.formLogin.value.password)
      console.log(this.usuarioLogin)
      if(this.usuarioLogin){
        const isVerified = this.authService.isEmailVerified(this.usuarioLogin);
        this.rediectUser(isVerified);
        this.isLogin=false; 

      }
      else{
        console.log("no esta registrado")
        this.isLogin=false;
        this.alertaNoLogin()
      }
    } catch (error) {
      console.log(error)
      this.isLogin=false;
    }    
  } 

  async onLoginGoogle(){
    try {
      this.isLogin=true;
      this.usuarioLogin = await this.authService.loginGoogle()
      if(this.usuarioLogin){
        const isVerified = this.authService.isEmailVerified(this.usuarioLogin);
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
      console.log(this.usuarioLogin)
      this.router.navigate(['verify-email',{correo :this.usuarioLogin.email}])
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
    // this.authService.ok();
    this.usuarioLogin = await this.authService.login(this.formLogin.value.email,this.formLogin.value.password)
    console.log(this.usuarioLogin,Object.values(this.usuarioLogin),this.usuarioLogin.email)
  }

}
