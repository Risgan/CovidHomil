import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-temperatura',
  templateUrl: './temperatura.component.html',
  styleUrls: ['./temperatura.component.scss'],
})
export class TemperaturaComponent implements OnInit {

  porcentaje = 10;
  ok="10"
  constructor() { }

  ngOnInit() {}

}
