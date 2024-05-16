import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [MessageService],
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];



  constructor(private authService: AuthService,
    private messageService: MessageService,
    private auth: AuthService,
    private rota: Router) { }

  ngOnInit(): void {
    if (this.auth.logado()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password)
    .then(res => {
      this.rota.navigate(['chamados']);
    })
    .catch(response => {
      this.messageService.add({severity:'error', summary: 'Erro de login', detail:'Usuário e/ou senha incorreto(s)'});

    });
  }

  reloadPage(): void {
    window.location.reload();
  }


}
