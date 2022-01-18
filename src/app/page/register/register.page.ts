import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private authService:AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  async onRegister(email, password){
    console.log(email,password)
    console.log(email.value,password.value)
    let usuario = await this.authService.register(email.value, password.value)
    if(usuario){
      console.log(usuario)
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
}
