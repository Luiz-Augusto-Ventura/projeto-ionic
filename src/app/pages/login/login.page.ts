import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { resolve, reject } from 'q';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formLogin: FormGroup;
  log: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.formLogin = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)  
    });
  }

  loginUser(user) {
    this.authService.loginUser(user)
      .then((resolve) => {
        this.log = "";
        this.router.navigateByUrl('/home');
      })
      .catch((msg) => {
        this.log = "Usuário ou senha inválido(s)!";
        console.log("Erro no login");
        console.log(msg);
      });
  }

  goToRegisterPage() {
    this.router.navigateByUrl('/register');
  }
}
