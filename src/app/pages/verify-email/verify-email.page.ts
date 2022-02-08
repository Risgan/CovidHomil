import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from './../../interface/usuario';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {

  correo: string;

  constructor(
    private router: Router,
    private routes: ActivatedRoute,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.correo = this.routes.snapshot.paramMap.get("correo")
  }

  sendVerificacion(){
    this.auth.sendVerificationEmail();
    this.router.navigate(['login'])
  }

}
