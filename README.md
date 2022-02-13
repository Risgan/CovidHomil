# CovidHomil

## Order de instalación

1. ionic start
2. npm install
3. npm install @capacitor/core
4. npm install @capacitor/cli --save-dev
5. npm install @capacitor/android
6. ionic build
7. npx cap init
8. npx cap add android
9. npx cap update android
10. npx cap copy
11. npx cap open
12. npx cap sync
13. ionic serve
14. npm install -g cordova-res
15. cordova-res android --skip-config --copy
16. npm install cordova-plugin-headercolor 
17. npm install @awesome-cordova-plugins/header-color 
18. ionic cap sync

## Creacion Paginas

1. ionic g page pages/login
2. ionic g page pages/register
3. ionic g page pages/verifyEmail
4. ionic g page pages/paciente
5. ionic g page pages/doctor
6. ionic g c pages/paciente/temperatura
7. ionic g c pages/paciente/spo2
8. ionic g c pages/paciente/ritmo
9. ionic g c pages/register/registerEmail
10. ionic g c pages/register/registerGoogle
11. ionic g module components
12. npm install cordova-plugin-firebase
13. npm install @awesome-cordova-plugins/firebase
14. ionic cap sync
15. npm i firebase
16. ng add @angular/fire
17. npm install -g cordova-res
18. npm install capacitor-resources

## Start

1. ionic start --capacitor
2. Use the app creation wizard? (Y/n) --> n
3. Angular
4. Covid Homil
5. blank

## Color Header

import { HeaderColor } from '@awesome-cordova-plugins/header-color/ngx';

constructor(private headerColor: HeaderColor) { }

this.headerColor.tint('#becb29');

## Cirular Progress

1. npm install ng-circle-progress --save
2. https://www.npmjs.com/package/ng-circle-progress

## Bluetooth BLE

1.  npm install cordova-plugin-ble-central 
2.  npm install @awesome-cordova-plugins/ble
3.  ionic cap sync
4.  import { BLE } from '@awesome-cordova-plugins/ble/ngx';
5.  constructor(private ble: BLE) { }
6.  https://ionicframework.com/docs/native/ble
