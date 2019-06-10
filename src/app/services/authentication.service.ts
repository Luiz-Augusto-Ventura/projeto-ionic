import { Injectable } from '@angular/core';
import * as flogin from 'firebase/app';
import { reject } from 'q';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  registerUser(user) {
    console.log("User: " + user.email);
    console.log("Senha: " + user.password);
    return new Promise<any>(( resolve, reject) => {
      flogin.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(
          res => resolve(res),
          err => reject(err)
        )
    });
  }

  loginUser(user) {
    return new Promise<any> ( (resolve, reject) => {
      flogin.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(
          res => resolve(res),
          err => reject(err)
        )
    });
  }

  logoutUser() {
    return new Promise<any> ( (resolve, reject ) => {
      if(flogin.auth().currentUser) {
        flogin.auth().signOut()
          .then( () => {
            console.log("Deslogado com sucesso!");
            resolve();
          })
          .catch((error) => {
            console.log("Erro ao fazer logout!");
            reject();
          })
      }
    });
  }

  getEmail() {
    return flogin.auth().
  }

  detailsUser() {
    return flogin.auth().currentUser;
  }
}
