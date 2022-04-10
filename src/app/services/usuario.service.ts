import { Observable } from 'rxjs';
// import { getFirestore } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { collection, getDoc, getFirestore } from 'firebase/firestore';
// import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  db = getFirestore()

  idUsuario;
  // usuario : Usuario;


  constructor(
    private firestore: AngularFirestore,

  ) { }

  async getUsuarios(): Promise<Observable<any>>{
    return this.firestore.collection('usuarios').snapshotChanges();
  }

  async getUsuario(id: string): Promise<Observable<any>>{
    return this.firestore.collection('usuarios').doc(id).get();
  }

  sendIdUsuario(uid){
    this.idUsuario = uid;
  }


}
