import { UsuarioService } from './../../services/usuario.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from './../../interface/usuario';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Usuarios } from 'src/app/interface/usuarios';
import { AuthService } from 'src/app/services/auth.service';
import { getDatabase, ref, child, get } from "firebase/database";
import { map } from 'rxjs/operators'

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
  usuario;
  tipoUsuario: string;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController,
    private firestore: AngularFirestore,
    private usuarioService: UsuarioService
  ) { 
    this.formLogin = this.fb.group({
      email: [null,Validators.required],
      password: [null,Validators.required],
    });
  }

  async ngOnInit() {
    this.usuarioService.getUsuarios();
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
      console.log(this.usuarioLogin.uid)

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
      this.alertaNoLogin()
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

  async rediectUser(isVerified: boolean){
    
    if(isVerified){

      (await this.usuarioService.getUsuario(this.usuarioLogin.uid)).subscribe(doc=>{
        
        this.tipoUsuario = doc.data().tipoUsuario;
        
        if(doc.data().tipoUsuario=='paciente'){
          this.usuarioService.sendIdUsuario(this.usuarioLogin.uid);
          // this.router.navigate(['paciente',{id:this.usuarioLogin.uid}]);
          this.router.navigate(['paciente']);
        }
        else if(doc.data().tipoUsuario=='doctor'){
          this.router.navigate(['doctor']);
        }
      });
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

}
