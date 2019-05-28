import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  email: string;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.email = this.setEmail();
  }

  ngOnInit() {
  }

  setEmail() {
    return this.authService.detailsUser().email;
  }

  logoutUser() {
    this.authService.logoutUser()
      .then(() => this.router.navigateByUrl('/login')),
      error => console.log("Erro no logout: " + error); 
  }
}
