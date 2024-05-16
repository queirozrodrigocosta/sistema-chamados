import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../environments/environment.prod';

const auth = new JwtHelperService();


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  obj: any;
  jwtPayload: any;

  urlApi: string = environment.api;
  url = `${this.urlApi}/oauth/token`;

  constructor(private http: HttpClient) {
    this.carregarToken();

  }

  carregarToken(){
    let token = localStorage.getItem('token');

    if(token){
      this.armazenarToken(token);
    }
  }

  login(username: string, password: string): Promise<void> {

    const body = `username=${username}&password=${password}&grant_type=password`;

    return this.http.post(this.url, body, { headers: { 'Authorization': 'Basic YW5ndWxhcjphbmd1bGFy==', 'Content-Type': 'application/x-www-form-urlencoded' }, withCredentials: true } )
      .toPromise()
      .then( res => {
        this.obj = res;
        this.armazenarToken(this.obj.access_token);

      })
      .catch(response => {
        if(response.status === 400){
          if(response.error.error === 'invalid_grant'){
            return Promise.reject("Senha incorreta!");
          }
        }
        return Promise.reject(response);
      });
  }


  private armazenarToken(token: any){
    this.jwtPayload = auth.decodeToken(token);
    localStorage.setItem('token', token);
  }

  isAcessTokenInvalid(){
    const token = localStorage.getItem('token');

    return !token || auth.isTokenExpired(token);
  }

  obterNovoAcessToken(): Promise<void>{
    const body = 'grant_type=refresh_token';

    return this.http.post(this.url, body, { headers: { 'Authorization': 'Basic YW5ndWxhcjphbmd1bGFy=='}, withCredentials: true })
      .toPromise()
      .then( res => {
        this.obj = res;
        this.armazenarToken(this.obj.access_token);
      })
      .catch(response =>{
        console.error('Erro ao renovar token.', response);
      });
  }

  limparAcessToken(){

    localStorage.removeItem('token');
    this.jwtPayload = null;

    return this.http.delete(`${this.urlApi}/token/revoke`, { withCredentials: true })
    .toPromise()
    .then(() => {
    })
    .catch((res) => {
    });
   
  }

  logado(){
    return this.jwtPayload != null;
  }

  temPermissao(permissao: string){
    return this.jwtPayload.authorities.includes(permissao);
  }

}
