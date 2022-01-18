import { Injectable } from '@angular/core';
// import { Firestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators'
import { Usuarios } from '../interfaces/usuario.interface';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  listado: Usuarios[]=[];

  constructor(
    private firestore: AngularFirestore,
  ) { }

  async cargarUsuarios(){
    await this.firestore.collection('usuarios')
                  .valueChanges()
                  .pipe(map( (usuarios: Array<Usuarios>) =>{
                    this.listado = usuarios;
                  })
                  ).subscribe();
                  
  }
}
