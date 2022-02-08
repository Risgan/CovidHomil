import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.splash();
  }

  splash(){
    setTimeout(() => {
      this.router.navigate(['login'])
      // this.isSplash=false;
      // this.usuarios = this.firebaseService.listado
      // console.log(this.usuarios)

    }, 3000);
  }

}
