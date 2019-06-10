import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  formRegister: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private usersService: UsersService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formRegister = this.formBuilder.group({
      nome: new FormControl('', Validators.required),
      sobrenome: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      senha: new FormControl('', Validators.required)
    });
  }
  
  register(user) {
    let regUser = { email: user.email, password: user.senha };
    this.authService.registerUser(regUser)
      .then(() => {
        //Se houve sucesso ao registrar o usuário, eu faço login!
        this.authService.loginUser(regUser).then(() => {
          //Se eu consegui fazer o login a partir do usuário registrado, eu cadastro o usuário na coleção users!
          //código que add o documento user para a coleção de usuários
          let newUser: User = { 
            nome: user.nome, sobrenome: user.sobrenome, email: user.email
          };

          this.usersService.setUser(newUser, this.authService.detailsUser().uid);
          this.router.navigateByUrl('/home');
        })
        
      });
  }

}
