import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RangoTemperaturaService {

  Maximo: number = 41;
  Minimo: number = 35;

  constructor() { }
}
