import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ListarChamadosComponent } from './pages/listar-chamados/listar-chamados.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },


  { path: 'chamados', component: ListarChamadosComponent },
  { path: '', redirectTo: 'chamados', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
