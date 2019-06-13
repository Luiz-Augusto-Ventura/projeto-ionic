import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  formRegister: FormGroup;
  log: string = '';

  constructor(
    private authService: AuthenticationService,
    private usersService: UsersService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastController: ToastController) { }

  ngOnInit() {
    this.formRegister = this.formBuilder.group({
      nome: new FormControl('', Validators.required),
      sobrenome: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      senha: new FormControl('', Validators.required)
    });
  }

  showToast(msg: string) {
    this.toastController.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
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

          this.log = '';
          this.usersService.setUser(newUser, this.authService.detailsUser().uid);
          this.router.navigateByUrl('/home');
          this.showToast('Usuário registrado com sucesso!');
        })
        
      })
      //Caso não seja possível registrar o usuário, uma menssagem de erro é emitida!
      .catch((msg) => { 
        this.log = 'E-mail inválido!';
        console.log("Erro ao registrar");
        console.log(msg); 
      });
  }

}
