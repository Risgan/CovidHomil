import { Usuario } from './../../interface/usuario';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  formRegister: FormGroup;


  constructor(
    private authService:AuthService,
    private router: Router,
    private fb: FormBuilder,
    private toastController: ToastController,
  ) {
    this.formRegister= this.fb.group({
      nombres: [null,Validators.required],
      apellidos: [null,Validators.required],
      tipoDocumento: ['Cedula de ciudadania',Validators.required],
      documento: [null,Validators.required],
      email: [null,Validators.required],
      password: [null,Validators.required],
      telefono: [null,Validators.required],
      fechaNacimiento: [null,Validators.required],
      ciudad:[null,Validators.required],
      direccion:[null,Validators.required],
    });
   }

  ngOnInit() {
    
  }

  async onRegister(){
    console.log(this.formRegister)
    // console.log(email.value,password.value)
    let usuario = await this.authService.register(this.formRegister.value.email,this.formRegister.value.password)
    if(usuario){

      usuario.nombres = this.formRegister.value.nombres
      usuario.apellidos = this.formRegister.value.apellidos
      usuario.tipoDoc = this.formRegister.value.tipoDocumento;
      usuario.documento = this.formRegister.value.documento;
      usuario.fechaNacimiento = this.formRegister.value.fechaNacimiento
      usuario.ciudad = this.formRegister.value.ciudad
      usuario.direccion = this.formRegister.value.direccion
      usuario.telefono = this.formRegister.value.telefono
      usuario.tipoUsuario = 'paciente'

      this.authService.updateUserData(usuario)

      console.log(usuario);
      // this.router.navigate(['verify-email'])
      this.router.navigate(['login'])
    }
    else{
      this.alertaNoRegister();
    }
  } 

  async alertaNoRegister(){
    const alert = await this.toastController.create({
      message:'El correo ya se encuentra registrado',
      duration: 700,
      position: 'top',
      color: 'danger'
    });
    alert.present();
  }
  

  ok(){
    console.log(this.formRegister.value)
  }

}
