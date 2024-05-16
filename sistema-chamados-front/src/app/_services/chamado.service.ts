
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt/src/jwthelper.service';
import { AuthService } from './auth.service';
import { environment } from '../environments/environment.prod';
import { ChamadoModel } from '../pages/listar-chamados/model';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  url: string = environment.api;

  constructor(private http: HttpClient, private auth: AuthService, private rota: Router) {
  }

  listarChamados(nome: string): Promise<any>{

    let params = new HttpParams();
    params = params.append("nome", nome);
    return this.http.get(`${this.url}/chamado/listar-chamados`, {params})
      .toPromise()
      .then(response => response )
      .catch( response => {
        return Promise.reject("Você não tem autorização para operar esse conteúdo.");
      });

  }

  finalizar(id: number): Promise<any>{

    return this.http.post(`${this.url}/chamado/finalizar/${id}`, null)
      .toPromise()
      .then(response => response )
      .catch( response => {
        return Promise.reject("Você não tem autorização para operar esse conteúdo.");
      });

  }

  avaliar(id: number, valor: number): Promise<any>{

    return this.http.post(`${this.url}/chamado/avaliar/${id}/${valor}`, null)
      .toPromise()
      .then(response => response )
      .catch( response => {
        return Promise.reject("Você não tem autorização para operar esse conteúdo.");
      });

  }

  abrir(obj: ChamadoModel): Promise<any>{
    
    return this.http.post(`${this.url}/chamado/abrir/`, obj)
      .toPromise()
      .then(response => response )
      .catch( response => {
        return Promise.reject("Você não tem autorização para operar esse conteúdo.");
      });

  }

  private buscarChamadoRequest(nome: string): Promise<any> {
    let params = new HttpParams();
    params = params.append("nome", nome);
    
    return this.http.get(`${this.url}/chamado`, {params})
      .toPromise()
      .then(response => response )
      .catch( response => {
        console.log(response);
        return Promise.reject("Você não tem autorização para operar esse conteúdo.");
      });
  }

  atualizarToken(){
    if (this.auth.isAcessTokenInvalid()){
      this.auth.obterNovoAcessToken();
    }
  }


}
