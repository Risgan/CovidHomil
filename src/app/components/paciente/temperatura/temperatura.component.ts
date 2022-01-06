import { Component, OnInit } from '@angular/core';
import { CircleProgressOptions } from 'ng-circle-progress';

@Component({
  selector: 'app-temperatura',
  templateUrl: './temperatura.component.html',
  styleUrls: ['./temperatura.component.scss'],
})
export class TemperaturaComponent implements OnInit {

  celcius: number=36;
  minInTemp: number = 30;
  maxInTemp: number = 40;
  minOutTemp: number = 0;
  maxOutTemp: number = 100;
  porcentaje: number;
  ok;


  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.celcius=31
      this.changeTemp()
      setTimeout(() => {
        this.celcius=35
        this.changeTemp()
        setTimeout(() => {
          this.celcius=38
          this.changeTemp()
          setTimeout(() => {
            this.celcius=30
            this.changeTemp()
            setTimeout(() => {
              this.celcius=40
              this.changeTemp()
            }, 4000);
            
          }, 4000);
        }, 4000);
      }, 4000);
    }, 4000);
    
    
    
    
  }

  changeTemp(){
    this.porcentaje = ((this.celcius-this.minInTemp)*(this.maxOutTemp-this.minOutTemp))/((this.maxInTemp-this.minInTemp)+this.minOutTemp)
    this.ok = this.celcius.toString();
  }

}
