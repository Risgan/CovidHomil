import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  { path: '', component: HomePage,},
  { path:'paciente', loadChildren:()=>import('./../page/paciente/paciente.module').then(x => x.PacientePageModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
