import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user';
import { ComplaintsService } from 'src/app/services/complaints.service';
import { Observable } from 'rxjs';
import { Complaint } from 'src/app/models/complaint';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  email: string;
  user: User;
  complaints: Observable<Complaint[]>;

  constructor(
    private authService: AuthenticationService,
    private usersService: UsersService,
    private complaintsService: ComplaintsService,
    private router: Router
  ) {
    this.email = this.getEmail();
    this.complaints = this.complaintsService.getComplaints();
  }

  ngOnInit() {
  }

  getEmail() {
    return this.authService.detailsUser().email;
  }

  //Apagar estas funções depois
  /*
  getUser() {
    this.usersService.getUser(this.authService.detailsUser().uid)
      .subscribe(data => this.user = data);
  }

  printUser() {
    console.log(this.user);
  }
  */

  logoutUser() {
    this.authService.logoutUser()
      .then(() => this.router.navigateByUrl('/login')),
      error => console.log("Erro no logout: " + error); 
  }
}
