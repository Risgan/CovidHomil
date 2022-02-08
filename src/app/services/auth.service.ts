import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, of  } from 'rxjs';
import { Usuario } from '../interface/usuario';
import { switchMap} from 'rxjs/operators';
import { GoogleAuthProvider, updateProfile, getAuth} from 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$:Observable<Usuario>

  constructor(
    private afAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,    
  ) { 
    this.user$ = afAuth.authState.pipe(
      switchMap((user)=>{
        if(user){
          return angularFirestore.doc<Usuario>(`usuarios/${user.uid}`).valueChanges();
        }
        else{
          return of(null);
        }
      })
    )
  }


  ok(){
    const auth = getAuth();
    console.log(auth);

    updateProfile(auth.currentUser, {
      displayName: "John Rueda", photoURL: "https://picsum.photos/id/1012/367/267"
    }).then(() => {
      // Profile updated!
      // ...
    })
    
  }

  async register(email: string,password: string): Promise<Usuario> {
    try {
      const {user}=await this.afAuth.createUserWithEmailAndPassword(email,password);
      await this.sendVerificationEmail();
      return user;
    } catch (error) {
      console.log("Error->",error);
    }
  }

  async login(email: string,password: string): Promise<Usuario> {
    try {
      const {user}=await this.afAuth.signInWithEmailAndPassword(email,password);
      //this.updateUserData(user);
      console.log(user)
      return user;
    } catch (error) {
      console.log("Error->",error);
    }
  }

  async loginGoogle(): Promise<Usuario> {
    try {
      const {user}=await this.afAuth.signInWithPopup(new GoogleAuthProvider());
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.log("Error->",error);
    }
  }

  async logOut(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log("Error->",error);
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email)
    } catch (error) {
      console.log("Error->",error);
    }
  }

  async sendVerificationEmail(): Promise<void> {
    try {
      return (await this.afAuth.currentUser).sendEmailVerification();
    } catch (error) {
      console.log("Error->",error);
    }
  }

  isEmailVerified(user:Usuario): boolean{
    return user.emailVerified === true ? true : false;
  }

  updateUserData(usuario:Usuario){
    const userRef: AngularFirestoreDocument<Usuario> = this.angularFirestore.doc(`usuarios/${usuario.uid}`)
    const data: Usuario = {
      uid: usuario.uid,
      email: usuario.email,
      displayName: usuario.displayName,
      emailVerified: usuario.emailVerified,
      providerId:usuario.providerId,
      photoURL:usuario.photoURL,
      phoneNumber: usuario.phoneNumber,
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      tipoDoc: usuario.tipoDoc,
      documento: usuario.documento,
      fechaNacimiento: usuario.fechaNacimiento,
      ciudad: usuario.ciudad,
      direccion: usuario.direccion,
      telefono: usuario.telefono,
      tipoUsuario: usuario.tipoUsuario
    }
    console.log(data,userRef)
    return userRef.set(data,{merge:true});

  }


}
