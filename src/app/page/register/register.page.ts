import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

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
    private fb: FormBuilder
  ) { 
    this.formRegister= this.fb.group({
      nombres: [null,Validators.required],
      apellidos: [null,Validators.required],
      tipoDoc: [null,Validators.required],
      documento: [null,Validators.required],
      email: [null,Validators.required],
      password: [null,Validators.required],
      telefono: [null,Validators.required],
      fechaNacimiento: [null,Validators.required],
      ciudad:[null,Validators.required],
    });
  }

  ngOnInit() {
  }

  async onRegister(){
    // console.log(email,password)
    // console.log(email.value,password.value)
    // let usuario = await this.authService.register(email.value, password.value)
    // if(usuario){
    //   console.log(usuario)
    // }
  } 

  rediectUser(isVerified: boolean){
    if(isVerified){
      this.router.navigate(['paciente']);
    }
    else{
      this.router.navigate(['verify-email'])
    }
  }

  probe(){
    console.log(this.formRegister.value)
  }
}
