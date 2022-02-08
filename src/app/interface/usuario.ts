export interface Usuario {
    uid: string;
    email: string;
    displayName: string;
    emailVerified: boolean;
    providerId: string;
    photoURL:string;
    phoneNumber;
    
    nombres?:  string;
    apellidos?: string;
    tipoDoc?: string;
    documento?: number;
    fechaNacimiento?: Date;
    ciudad?: string;
    direccion?: string;
    telefono?: number;
    tipoUsuario?: string;
}
