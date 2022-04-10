import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BluetoothService {

  valTemp: string='0'
  valSpo2: string='0'
  valHeart: string='0'


  constructor() { }

  setData(data){
    switch (data[0]) {
      case 'c':
        this.valTemp='';
        for (let index = 1; index < data.length; index++) {
          this.valTemp += data[index];           
        }        
        break;
        case 'b':
        this.valHeart='';
        for (let index = 1; index < data.length; index++) {
          this.valHeart += data[index];           
        }        
        break;
        case 'a':
        this.valSpo2='';
        for (let index = 1; index < data.length; index++) {
          this.valSpo2 += data[index];           
        }        
        break;
    
      default:
        break;
    }
  }

}
