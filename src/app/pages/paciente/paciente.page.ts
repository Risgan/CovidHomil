import { AuthService } from './../../services/auth.service';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Usuario } from './../../interface/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, NgZone, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { BLE } from '@awesome-cordova-plugins/ble/ngx';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';
import { BluetoothService } from 'src/app/services/bluetooth.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.page.html',
  styleUrls: ['./paciente.page.scss'],
})
export class PacientePage implements OnInit  {

  nombreUsuario: string;
  usuario: Usuario;
  idUsuario: string;
  porcentaje=10;
  ok="10"
  conexion: string = 'desconectado';
  decives: any[]=[];
  uid;
  deviceId;
  
  servicios;
  caracteristicas;
  datos

  valTemp: string='0';
  valSpo2: string='0';
  valHeart: string='0';


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private ble: BLE,
    private bluetoothSerial: BluetoothSerial,
    private toastController: ToastController,
    private ngZone: NgZone,
    private bluet: BluetoothService,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    this.idUsuario = this.usuarioService.idUsuario;

    (await this.usuarioService.getUsuario(this.idUsuario)).subscribe(doc=>{
      this.usuario = doc.data();
      console.log(this.nombreUsuario = doc.data().nombres + " "+ doc.data().apellidos)
    });
    // this.isOnBluetooht()
    // setTimeout(() => {
    //   this.cargarDatos()
    // }, 1000);
    
  }

  stopInterval(interval){
    window.clearInterval(interval)
  }

  temperaturaIr(){
    console.log(this.router.routerState.snapshot.url+'temperatura')
    this.router.navigate([this.router.routerState.snapshot.url+'/temperatura'])
  }
  
  gpsIr(){
    this.router.navigate([this.router.routerState.snapshot.url+'/gps'])
  }

  spo2Ir(){
    this.router.navigate([this.router.routerState.snapshot.url+'/spo2'])
    console.log("hola")
  }

  ritmoIr(){
    this.router.navigate([this.router.routerState.snapshot.url+'/ritmo'])
  }


  async conecct(){
    this.ble.disconnect(this.deviceId)
    await this.scan();
    this.decives.forEach(element => {
      if(element.name=="RN4020"){
        console.log(element)        
      }
    });
  }

  scan(){
    console.log('--------------entro al scan')
    this.ble.scan([],500).subscribe(device => this.onDeviceDiscovered(device));
    // this.ble.startScan([]).subscribe(device => this.onDeviceDiscovered(device));
  }
  

  async onDeviceDiscovered(device){
    console.log('-->',device,'<--')
    this.decives.push(device)
    if(device.name=="RN4020"){
      console.log('----->',device)
      this.deviceId=device.id
      this.ble.connect(device.id).subscribe(success=>{
        console.log('conectado',success)
        this.servicios = success.characteristics
        this.ble.stopScan();
        this.isConected(device.id);
      })      
    }
  }
  

  isConected(id){
    this.ble.isConnected(id).then(
      () => { 
        this.conexion = 'conectado'
        this.isOnBluetooht2();
      },
      () => { 
        this.conexion = 'desconectado' 
        // this.stopInterval(interval);
      });

  }
  isOnBluetooht(){

    this.ble.isEnabled().then(
      ()=>{
        console.log("Bluetooth is enabled")
        this.conecct();
      },
      ()=>{
        console.log("Bluetooth is *not* enabled")
        this.ble.enable().then(
          ()=>{
            console.log("Bluetooth is casi enabled");
            this.conecct();
          },
          ()=>{
            console.log("The user did *not* enable Bluetooth");
            this.isOnBluetooht();
          },
          )
      }
      )
  }


  isOnBluetooht2(){

  
    this.ble.startNotification(this.deviceId, this.servicios[3].service, this.servicios[3].characteristic).subscribe(
      (buffer)=>{
        var data = new Uint8Array(buffer);
        // alert("Button state changed to " + data);
        console.log(data)
        console.log('buffer',buffer)
        console.log('bufferInt',new Uint8Array(buffer))
        this.datos = buffer;
        let array8bit = new Uint8Array(this.datos[0])
        this.construido=new TextDecoder().decode(array8bit);
      },
      (buf)=>{
        alert("pailas"+buf)
        console.log(buf)
      })
    
  }
  construido
  prueba(){
    console.log('datos',this.datos)
    console.log('datos[0]',this.datos[0])
    console.log('array8',new Uint8Array(this.datos[0]))
    console.log('decoder',new TextDecoder().decode(new Uint8Array(this.datos[0])))
    let array8bit = new Uint8Array(this.datos[0])
    this.construido=new TextDecoder().decode(array8bit);

    for (let index = 0; index < this.datos.length; index++) {
      console.log(this.datos[index])      
    }
  }


  cargarDatos(){
  let interval = window.setInterval(()=>{
    if(this.construido!=undefined){
      this.bluet.setData(this.construido)    
      this.valHeart = this.bluet.valHeart;
      this.valTemp = this.bluet.valTemp;
      this.valSpo2 = this.bluet.valSpo2;
  
    }
    console.log('c',this.valTemp,'b',this.valSpo2,'a',this.valHeart)
  },2000)  
  }


  redirectCuentaUsuario(){
    this.router.navigate([this.router.routerState.snapshot.url+'/cuentaUsuario'])
  }

  logOut(){
    let logOut = this.authService.logOut();
    if(logOut){
      this.router.navigate(['login']);
    }
  }
}