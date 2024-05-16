import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  eventBusSub?: Subscription;

  constructor(
    private auth: AuthService,
    private rota: Router,
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.auth.logado();

    if (this.isLoggedIn) {

      this.username = this.auth.jwtPayload.user_name;
    }

  }

  logout(){
    this.auth.limparAcessToken()
      .then(() => {
        this.rota.navigate(['login']);
      })
      .catch(() => null);
  }

}
