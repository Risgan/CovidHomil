export interface Usuario {
    uid: string;
    email: string;
    displayName: string;
    emailVerified: boolean;

    nombres?: string;
    apellidos?: string;
    tipoDoc?: string;
    documento?: number;
    telefono?: number;
    fechaNacimiento?: Date;
    ciudad?:string;
}
